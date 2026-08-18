# Thiệp cưới Minh Anh & Văn Tiến

Thiệp cưới online dùng Next.js, TypeScript và Tailwind CSS. Website gồm lịch
cưới, địa điểm, album, mã QR mừng cưới và form xác nhận tham dự lưu trực tiếp
vào Google Sheets.

## Chạy local

Yêu cầu Node.js 20.9 trở lên.

```bash
npm install
npm run dev
```

Sau đó mở địa chỉ được hiển thị trong terminal, thường là:

```text
http://localhost:3000
```

## Nội dung và hình ảnh

Các thông tin mẫu nằm ở:

```text
data/wedding.ts
```

Có thể thay tên cô dâu, chú rể, lịch trình, địa điểm, gallery và thông tin mừng
cưới tại đó. Ảnh đang dùng nằm trong `public/`.

## Google Sheets

Xem hướng dẫn tại `docs/google-sheets-api.md`. Các khóa chỉ được lưu trong
`.env.local` hoặc Environment Variables của Vercel, không commit vào Git.

## Kiểm tra trước khi deploy

```bash
npm run lint
npm run build
```
