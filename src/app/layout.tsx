import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nuzio AI - Zero-Fluff Personalized Audio News',
  description: 'AI-generated audio news briefings tailored to your profession, interests, and schedule.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-nuzio-bg text-slate-100 min-h-screen antialiased selection:bg-sky-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
