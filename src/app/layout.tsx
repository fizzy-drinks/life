import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import icon from './favicon.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Life',
  description: "Conway's Game of Life online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href={icon.src} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
