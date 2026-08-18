# RSVP Google Sheets

## 1. Tao Google Sheet

Tao mot Google Sheet moi, dat ten sheet la `RSVP`.

Hang dau tien co the de trong, script se tu tao header:

```text
Thoi gian | Ten khach | Khach cua | Trang thai | Su kien tham du | Suat tiec nha gai | Suat tiec nha trai | Tong suat tiec | Loi chuc | User agent
```

## 2. Tao Apps Script

Trong Google Sheet, vao `Extensions` -> `Apps Script`, dan code nay:

```javascript
const SHEET_NAME = "RSVP";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet =
      spreadsheet.getSheetByName(SHEET_NAME) ||
      spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thoi gian",
        "Ten khach",
        "Khach cua",
        "Trang thai",
        "Su kien tham du",
        "Suat tiec nha gai",
        "Suat tiec nha trai",
        "Tong suat tiec",
        "Loi chuc",
        "User agent",
      ]);
    }

    const data = JSON.parse((e.postData && e.postData.contents) || "{}");

    sheet.appendRow([
      data.createdAt || new Date().toISOString(),
      data.name || "",
      data.guestSide || "",
      data.attending || "",
      data.events || "",
      Number(data.brideMealCount || 0),
      Number(data.groomMealCount || 0),
      Number(data.totalMealCount || 0),
      data.message || "",
      data.userAgent || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, message: String(error) }),
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. Deploy Apps Script

Chon `Deploy` -> `New deployment`.

- Type: `Web app`
- Execute as: `Me`
- Who has access: `Anyone`

Sau khi deploy, copy `Web app URL`.

## 4. Them bien moi truong

Tao file `.env.local`:

```text
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/xxx/exec
```

Sau do restart dev server hoac deploy lai tren Vercel.

## 5. Cau hinh tren Vercel

Vao project tren Vercel:

`Settings` -> `Environment Variables`

Them bien:

```text
GOOGLE_SHEETS_WEBHOOK_URL
```

Value la `Web app URL` cua Apps Script.
