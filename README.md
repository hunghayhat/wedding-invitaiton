# Thiệp cưới online

Project thiệp cưới online dùng Next.js, TypeScript và Tailwind CSS. Bản đầu tiên chỉ có giao diện tĩnh, dữ liệu mẫu và RSVP placeholder. Chưa có backend, Supabase hoặc secret.

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

## Thay nội dung

Các thông tin mẫu nằm ở:

```text
data/wedding.ts
```

Có thể thay tên cô dâu, chú rể, ngày cưới, lịch trình, địa điểm và nội dung gallery tại đó.

## Ghi chú bảo mật

- Không có secret trong project.
- Không có kết nối Supabase ở bước này.
- RSVP hiện chỉ là placeholder, chưa gửi dữ liệu đi đâu.
- Khi thêm RSVP thật, nên dùng API route/server-side validation trước khi lưu dữ liệu.
