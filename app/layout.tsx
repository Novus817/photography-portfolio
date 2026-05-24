import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Photography Portfolio',
  description:
    'Clean, fast, high-res photography portfolio built with Next.js 15',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
