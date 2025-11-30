import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "会社情報検索 - AI powered",
  description: "AIが会社の情報をわかりやすく教えます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
