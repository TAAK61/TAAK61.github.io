import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PerformanceProvider } from '@/components/PerformanceManager';
import { GlobalWidgetsProvider } from '@/components/GlobalWidgetsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kiame Touré - Portfolio Liquid Glass',
  description: 'Portfolio professionnel avec technologie Liquid Glass révolutionnaire',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
      </head>
      <body
        className={`${inter.className} antialiased bg-black text-white overflow-x-hidden`}
        suppressHydrationWarning={true}
      >
        <PerformanceProvider>
          <GlobalWidgetsProvider>
            {children}
          </GlobalWidgetsProvider>
        </PerformanceProvider>
      </body>
    </html>
  );
}
