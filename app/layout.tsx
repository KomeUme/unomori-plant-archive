import type { Metadata } from 'next';
import './globals.css';
import { ImageProtection } from './image-protection';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '鵜ノ森｜植物の成長記録',
  description: '一株ごとの成長過程、親株の特徴、日々の栽培方法を管理番号とともに記録する植物アーカイブ。',
  openGraph: {
    title: '鵜ノ森｜植物の成長記録',
    description: '一株ずつ、育ちの履歴を。植物の成長・親株・栽培方法の記録アーカイブ。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '鵜ノ森 PLANT ARCHIVE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '鵜ノ森｜植物の成長記録',
    description: '一株ずつ、育ちの履歴を。植物の成長・親株・栽培方法の記録アーカイブ。',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body><ImageProtection />{children}</body>
    </html>
  );
}
