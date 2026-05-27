import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'yaya-test',
  description: 'Built with prompt-scaffold — AI-ready from day one',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
