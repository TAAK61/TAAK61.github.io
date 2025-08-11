import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://kiametoure.me'; // Remplacez par votre vraie URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kiame Touré - Portfolio Liquid Glass | Développeur Full-Stack & Expert Technologies Émergentes',
    template: '%s | Kiame Touré - Portfolio Liquid Glass'
  },
  description: 'Portfolio professionnel révolutionnaire avec technologie Liquid Glass. Spécialisé en développement web/mobile, blockchain, VR/AR, IA et entrepreneuriat. Créateur de solutions innovantes.',
  applicationName: 'Portfolio Liquid Glass',
  authors: [
    {
      name: 'Kiame Touré',
      url: siteUrl
    }
  ],
  creator: 'Kiame Touré',
  publisher: 'Kiame Touré',
  generator: 'Next.js 15',
  keywords: [
    'Portfolio Liquid Glass',
    'Kiame Touré',
    'Développeur Full-Stack',
    'Technologies Émergentes',
    'Next.js',
    'Three.js',
    'TypeScript',
    'Blockchain',
    'Crypto',
    'DeFi',
    'VR',
    'AR',
    'Intelligence Artificielle',
    'IA',
    'WebXR',
    'React',
    'Node.js',
    'Entrepreneuriat',
    'Startup',
    'CTO as a Service',
    'Freelance',
    'Développement web',
    'Application mobile',
    'Solutions business',
    'Innovation',
    'Portfolio interactif',
    'Expérience immersive'
  ],
  referrer: 'origin-when-cross-origin',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#667eea' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' }
  ],
  colorScheme: 'dark light',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName: 'Portfolio Liquid Glass - Kiame Touré',
    title: 'Kiame Touré - Portfolio Liquid Glass | Expert Technologies Émergentes',
    description: 'Portfolio professionnel révolutionnaire avec technologie Liquid Glass. Expert en développement web/mobile, blockchain, VR/AR, IA et entrepreneuriat.',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Portfolio Liquid Glass - Kiame Touré',
        type: 'image/jpeg',
      },
      {
        url: `${siteUrl}/og-image-square.jpg`,
        width: 1200,
        height: 1200,
        alt: 'Portfolio Liquid Glass - Logo',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kiame_toure', // Remplacez par votre handle Twitter
    creator: '@kiame_toure',
    title: 'Kiame Touré - Portfolio Liquid Glass | Expert Technologies Émergentes',
    description: 'Portfolio révolutionnaire avec technologie Liquid Glass. Expert en blockchain, VR/AR, IA et développement web/mobile.',
    images: {
      url: `${siteUrl}/og-image.jpg`,
      alt: 'Portfolio Liquid Glass - Kiame Touré',
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'fr-FR': siteUrl,
      'en-US': `${siteUrl}/en`, // Si vous avez une version anglaise
    },
  },
  category: 'technology',
  classification: 'Portfolio professionnel',
  other: {
    'msapplication-TileColor': '#667eea',
    'theme-color': '#667eea',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'format-detection': 'telephone=no',
  },
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
        {children}
      </body>
    </html>
  );
}
