import type { Metadata } from "next";
import { Great_Vibes, Lora, Nunito_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-display",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-body",
});

const greatVibes = Great_Vibes({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script",
});

const siteUrl = new URL("https://wedding-invitation-ruddy-three.vercel.app");
const title = "Thiệp cưới Minh Anh & Văn Tiến";
const description =
  "Trân trọng kính mời quý khách chung vui trong ngày thành hôn của Minh Anh và Văn Tiến.";
const shareImage = {
  url: "/images/wedding-share.jpg",
  width: 1200,
  height: 630,
  alt: "Minh Anh và Văn Tiến",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: title,
    title,
    description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage.url],
  },
  icons: {
    icon: [{ url: "/logo/wedding-favicon.png", type: "image/png" }],
    shortcut: "/logo/wedding-favicon.png",
    apple: "/logo/wedding-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${lora.variable} ${nunitoSans.variable} ${greatVibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
