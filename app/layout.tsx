import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thiệp cưới Minh Anh & Văn Tiến",
  description: "Thiệp cưới online đơn giản, riêng tư và dễ thay đổi nội dung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
