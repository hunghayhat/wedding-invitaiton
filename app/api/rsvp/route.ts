import { NextResponse } from "next/server";

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
  return Math.min(Math.max(Number(value) || 0, 0), 20);
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

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const body = (await request.json()) as RsvpPayload;

  if (toText(body.website, 200)) {
    return NextResponse.json({ ok: true });
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

  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Chưa cấu hình Google Sheets webhook." },
      { status: 503 },
    );
  }

  const sheetPayload = {
    name,
    guestSide: guestSideLabels[guestSide],
    attending: attendingLabels[attending],
    events: selectedEvents.join(", "),
    brideMealCount,
    groomMealCount,
    totalMealCount: brideMealCount + groomMealCount,
    message,
    createdAt: new Date().toISOString(),
    userAgent: request.headers.get("user-agent") ?? "",
  };

  const sheetResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sheetPayload),
  });

  if (!sheetResponse.ok) {
    return NextResponse.json(
      { message: "Chưa lưu được vào Google Sheets, bạn thử lại nhé." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
