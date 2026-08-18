import { JWT } from "google-auth-library";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RsvpPayload = {
  name?: unknown;
  guestSide?: unknown;
  attending?: unknown;
  events?: unknown;
  brideMealCount?: unknown;
  groomMealCount?: unknown;
  message?: unknown;
  website?: unknown;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type StoredRsvp = {
  createdAt: string;
  name: string;
  guestSide: string;
  attending: string;
  events: string;
  brideMealCount: number;
  groomMealCount: number;
  totalMealCount: number;
  message: string;
};

type SheetsApiConfig = {
  spreadsheetId: string;
  sheetName: string;
  serviceAccountEmail: string;
  privateKey: string;
};

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";
const rsvpRateLimits = new Map<string, RateLimitEntry>();
let sheetsAuth: JWT | null = null;

const guestSideLabels = {
  groom: "Nhà trai",
  bride: "Nhà gái",
  shared: "Bạn chung",
} as const;

const attendingLabels = {
  yes: "Có tham dự",
  maybe: "Chưa chắc",
  no: "Không tham dự",
} as const;

const eventLabels = {
  brideCeremony: "Lễ nạp tài",
  brideParty: "Tiệc nhà gái",
  groomCeremony: "Hôn lễ nhà trai",
  groomParty: "Tiệc nhà trai",
} as const;

function toText(value: unknown, maxLength: number) {
  return String(value ?? "")
    .trim()
    .slice(0, maxLength);
}

function toCount(value: unknown) {
  return Math.min(Math.max(Math.floor(Number(value) || 0), 0), 20);
}

function formatSubmittedAt(date: Date) {
  const parts = new Intl.DateTimeFormat("vi-VN", {
    timeZone: VIETNAM_TIME_ZONE,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.day}/${values.month}/${values.year} ${values.hour}:${values.minute}`;
}

function toKnownKey<T extends Record<string, string>>(
  value: unknown,
  labels: T,
  fallback: keyof T,
) {
  const key = String(value ?? "");
  return key in labels ? (key as keyof T) : fallback;
}

function toEventLabels(value: unknown) {
  const values = Array.isArray(value) ? value : [];

  return values
    .map((item) => String(item))
    .filter((item): item is keyof typeof eventLabels => item in eventLabels)
    .map((item) => eventLabels[item]);
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRateLimited(clientIp: string) {
  const now = Date.now();
  const current = rsvpRateLimits.get(clientIp);

  if (!current || current.resetAt <= now) {
    rsvpRateLimits.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;

  if (rsvpRateLimits.size > 500) {
    for (const [ip, entry] of rsvpRateLimits) {
      if (entry.resetAt <= now) {
        rsvpRateLimits.delete(ip);
      }
    }
  }

  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function rateLimitResponse() {
  return NextResponse.json(
    { message: "Bạn gửi xác nhận quá nhanh. Vui lòng thử lại sau một phút." },
    {
      status: 429,
      headers: { "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000) },
    },
  );
}

function getSheetsApiConfig() {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() ?? "";
  const serviceAccountEmail =
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim() ?? "";
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "";
  const configuredValues = [
    spreadsheetId,
    serviceAccountEmail,
    privateKey,
  ];

  if (configuredValues.some((value) => !value)) {
    return null;
  }

  return {
    spreadsheetId,
    sheetName: process.env.GOOGLE_SHEETS_SHEET_NAME?.trim() || "RSVP",
    serviceAccountEmail,
    privateKey: privateKey.replace(/\\n/g, "\n"),
  } satisfies SheetsApiConfig;
}

function getSheetsAuth(config: SheetsApiConfig) {
  if (!sheetsAuth) {
    sheetsAuth = new JWT({
      email: config.serviceAccountEmail,
      key: config.privateKey,
      scopes: [SHEETS_SCOPE],
    });
  }

  return sheetsAuth;
}

async function appendWithSheetsApi(
  config: SheetsApiConfig,
  rsvp: StoredRsvp,
) {
  const escapedSheetName = config.sheetName.replace(/'/g, "''");
  // Anchor table detection to the timestamp column so blank optional fields
  // cannot make Sheets append the row beside an existing data region.
  const range = `'${escapedSheetName}'!A:A`;
  const endpoint =
    `https://sheets.googleapis.com/v4/spreadsheets/` +
    `${encodeURIComponent(config.spreadsheetId)}/values/` +
    `${encodeURIComponent(range)}:append` +
    "?valueInputOption=RAW&insertDataOption=INSERT_ROWS";

  try {
    await getSheetsAuth(config).request({
      url: endpoint,
      method: "POST",
      data: {
        majorDimension: "ROWS",
        values: [
          [
            rsvp.createdAt,
            rsvp.name,
            rsvp.guestSide,
            rsvp.attending,
            rsvp.events,
            rsvp.brideMealCount,
            rsvp.groomMealCount,
            rsvp.totalMealCount,
            rsvp.message,
          ],
        ],
      },
      timeout: 10000,
    });

    return true;
  } catch (error) {
    console.error(
      "Google Sheets API append failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return false;
  }
}

export async function POST(request: Request) {
  let body: RsvpPayload;

  try {
    body = (await request.json()) as RsvpPayload;
  } catch {
    return NextResponse.json(
      { message: "Dữ liệu xác nhận không hợp lệ." },
      { status: 400 },
    );
  }

  if (toText(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return rateLimitResponse();
  }

  const name = toText(body.name, 100);
  const guestSide = toKnownKey(body.guestSide, guestSideLabels, "groom");
  const attending = toKnownKey(body.attending, attendingLabels, "yes");
  const isNotAttending = attending === "no";
  const selectedEvents = isNotAttending ? [] : toEventLabels(body.events);
  const brideMealCount = isNotAttending ? 0 : toCount(body.brideMealCount);
  const groomMealCount = isNotAttending ? 0 : toCount(body.groomMealCount);
  const message = toText(body.message, 500);

  if (name.length < 2) {
    return NextResponse.json(
      { message: "Bạn nhập tên khách mời giúp mình nhé." },
      { status: 400 },
    );
  }

  const storedRsvp: StoredRsvp = {
    name,
    guestSide: guestSideLabels[guestSide],
    attending: attendingLabels[attending],
    events: selectedEvents.join(", "),
    brideMealCount,
    groomMealCount,
    totalMealCount: brideMealCount + groomMealCount,
    message,
    createdAt: formatSubmittedAt(new Date()),
  };
  const sheetsApiConfig = getSheetsApiConfig();

  if (!sheetsApiConfig) {
    return NextResponse.json(
      { message: "Cấu hình Google Sheets API đang thiếu thông tin." },
      { status: 503 },
    );
  }

  const didAppend = await appendWithSheetsApi(sheetsApiConfig, storedRsvp);

  if (!didAppend) {
    return NextResponse.json(
      { message: "Chưa lưu được vào Google Sheets, bạn thử lại nhé." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
