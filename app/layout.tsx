import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TODOアプリ",
  description: "シンプルで使いやすいTODOアプリ。タスクの管理と整理を簡単に。", // アプリの機能を説明
  keywords: ["TODO", "リマインダー", "タスク管理", "メモ"], //SEO対応
  viewport: "width=device-width, initial-scale=1", // モバイル対応の設定を明示的に追加
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}