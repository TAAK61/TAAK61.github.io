import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kiame Touré - Concepteur de solutions IT & Digital',
  description: 'Portfolio professionnel avec technologie Liquid Glass. Spécialisé en VR/AR, IA, blockchain et entrepreneuriat.',
  keywords: ['portfolio', 'concepteur', 'IT', 'digital', 'VR', 'AR', 'blockchain', 'IA', 'entrepreneuriat'],
  authors: [{ name: 'Kiame Touré', url: 'https://kiametoure.me' }],
  openGraph: {
    title: 'Kiame Touré - Concepteur de solutions IT & Digital',
    description: 'Portfolio professionnel avec technologie Liquid Glass révolutionnaire',
    url: 'https://kiametoure.me',
    siteName: 'Portfolio Liquid Glass',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portfolio Liquid Glass - Kiame Touré'
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kiame Touré - Portfolio Liquid Glass',
    description: 'Concepteur de solutions IT & Digital avec technologie révolutionnaire',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://kiametoure.me',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
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
        <div id="root" className="relative min-h-screen">
          {children}
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}
