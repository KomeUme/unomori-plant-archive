import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://hagukumu-plants-archive.komeume1121.chatgpt.site'),
  title: 'HAGUKUMU PLANTS｜植物の成長記録',
  description: '一株ごとの成長過程、親株の特徴、日々の栽培方法を管理番号とともに記録する植物アーカイブ。',
  openGraph: {
    title: 'HAGUKUMU PLANTS｜植物の成長記録',
    description: '一株ずつ、育ちの履歴を。植物の成長・親株・栽培方法の記録アーカイブ。',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'HAGUKUMU PLANTS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAGUKUMU PLANTS｜植物の成長記録',
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
      <body>{children}</body>
    </html>
  );
}
