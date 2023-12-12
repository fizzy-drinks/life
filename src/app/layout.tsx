import './globals.css';

import type { Metadata } from 'next';

import icon from './favicon.png';

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
      <body>{children}</body>
    </html>
  );
}
