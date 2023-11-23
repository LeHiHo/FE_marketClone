import { ReactNode } from 'react';
import '@/styles/globals.scss';
import Head from 'next/head';

export const metadata = {
  title: '오이마켓',
  description: '초기 당근마켓 클론',
    icons: {
    icon: "https://symbl.cc/i/webp/6e/7e745aed8655c66ddfa8d62223dd05.webp"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
