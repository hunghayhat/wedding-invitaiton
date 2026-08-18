# Google Sheets API cho form xác nhận tham dự

Website ghi trực tiếp xác nhận tham dự vào Google Sheet bằng service account.

## 1. Bật Google Sheets API

1. Mở [Google Cloud Console](https://console.cloud.google.com/).
2. Chọn hoặc tạo một project.
3. Vào `APIs & Services` -> `Library`.
4. Tìm `Google Sheets API`, mở kết quả và chọn `Enable`.

## 2. Tạo service account

1. Vào `IAM & Admin` -> `Service Accounts`.
2. Chọn `Create service account`.
3. Đặt tên, ví dụ `wedding-rsvp`, rồi chọn `Create and continue`.
4. Không cấp role rộng cho project; chọn `Done`.

Service account chỉ cần quyền trên đúng file Google Sheet ở bước 4.

## 3. Tạo khóa JSON

1. Mở service account vừa tạo.
2. Chọn tab `Keys` -> `Add key` -> `Create new key`.
3. Chọn `JSON` rồi tải file xuống.

Không đưa file JSON vào project, Git, tin nhắn hoặc nơi công khai. Google chỉ
cho tải khóa riêng tại thời điểm tạo. Có thể xóa khóa này sau đám cưới.

## 4. Chia sẻ Google Sheet

1. Mở file JSON bằng trình soạn thảo trên máy và tìm giá trị `client_email`.
2. Mở Google Sheet, chọn `Chia sẻ`.
3. Thêm email `client_email` với quyền `Người chỉnh sửa`.
4. Đảm bảo tab nhận dữ liệu có tên `RSVP`.
5. Tạo hàng tiêu đề đầu tiên từ cột A đến I:

```text
Thời gian | Tên khách | Khách của | Trạng thái | Sự kiện tham dự | Số người nhà gái | Số người nhà trai | Tổng số người | Lời chúc
```

Sheet không cần đặt ở chế độ công khai. Chỉ tài khoản của bạn và service
account cần có quyền truy cập.

## 5. Lấy Spreadsheet ID

Trong URL của Google Sheet:

```text
https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
```

Sao chép đoạn nằm giữa `/d/` và `/edit`.

## 6. Cấu hình local

Mở file JSON và lấy hai giá trị `client_email`, `private_key`. Thêm vào
`.env.local`:

```text
GOOGLE_SHEETS_SPREADSHEET_ID=spreadsheet-id
GOOGLE_SHEETS_SHEET_NAME=RSVP
GOOGLE_SERVICE_ACCOUNT_EMAIL=wedding-rsvp@project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Giữ `private_key` trong dấu ngoặc kép và dùng ký tự `\n` như ví dụ. Không đặt
các biến này trong file có commit lên Git. Khởi động lại website sau khi sửa
`.env.local`.

## 7. Cấu hình Vercel

Trong `Settings` -> `Environment Variables`, thêm bốn biến ở bước 6 cho môi
trường cần dùng rồi redeploy. Giá trị khóa có thể là nhiều dòng hoặc chứa
`\n`; backend hỗ trợ cả hai dạng.

## 8. Kiểm tra

1. Gửi một xác nhận thử từ website.
2. Kiểm tra tab `RSVP` có thêm đúng một dòng.
3. Xác nhận website hiện thông báo gửi thành công.

Website vẫn giới hạn tối đa 3 lần gửi trong 60 giây cho mỗi địa chỉ IP.
