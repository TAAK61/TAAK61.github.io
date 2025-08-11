'use client';

import Head from 'next/head';
import { useEffect, useState } from 'react';

interface SEOOptimizerProps {
  currentSection?: string;
  isLoading?: boolean;
}

export function SEOOptimizer({ currentSection = 'hero', isLoading }: SEOOptimizerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Données SEO dynamiques selon la section
  const seoData = {
    hero: {
      title: 'Kiame Touré - Concepteur Solutions IT & Digital | Portfolio Liquid Glass',
      description: 'Concepteur et développeur de solutions IT innovantes. Expertise en VR/AR, IA, blockchain, crypto et technologies émergentes. Portfolio interactif avec Liquid Glass.',
      keywords: 'concepteur solutions IT, développeur VR AR, expert blockchain crypto, portfolio liquid glass, kiame touré',
      canonical: 'https://kiametoure.me'
    },
    expertise: {
      title: 'Expertise Technologique - Kiame Touré | VR/AR, IA, Blockchain',
      description: 'Découvrez mes compétences en technologies émergentes : développement VR/AR, intelligence artificielle, blockchain/crypto, Three.js, WebXR.',
      keywords: 'expertise VR AR, développement IA, blockchain développeur, three.js expert, webxr spécialiste',
      canonical: 'https://kiametoure.me#expertise'
    },
    portfolio: {
      title: 'Portfolio Projets - Kiame Touré | Réalisations IT & Digital',
      description: 'Explorez mes projets innovants : applications VR/AR, plateformes blockchain, solutions IA, expériences 3D immersives.',
      keywords: 'projets VR AR, applications blockchain, portfolio développeur, solutions IA, projets three.js',
      canonical: 'https://kiametoure.me#portfolio'
    },
    collaboration: {
      title: 'Collaboration & Contact - Kiame Touré | Devis et Partenariats',
      description: 'Contactez-moi pour vos projets IT innovants. Disponible pour collaborations, conseil technologique et développement sur mesure.',
      keywords: 'contact développeur, collaboration IT, conseil technologique, devis développement, partenariat tech',
      canonical: 'https://kiametoure.me#collaboration'
    }
  };

  const currentSEO = seoData[currentSection as keyof typeof seoData] || seoData.hero;

  if (!mounted) return null;

  return (
    <Head>
      {/* Meta tags principaux */}
      <title>{currentSEO.title}</title>
      <meta name="description" content={currentSEO.description} />
      <meta name="keywords" content={currentSEO.keywords} />
      <link rel="canonical" href={currentSEO.canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={currentSEO.title} />
      <meta property="og:description" content={currentSEO.description} />
      <meta property="og:url" content={currentSEO.canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://kiametoure.me/og-image.jpg" />
      <meta property="og:site_name" content="Kiame Touré Portfolio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentSEO.title} />
      <meta name="twitter:description" content={currentSEO.description} />
      <meta name="twitter:image" content="https://kiametoure.me/twitter-image.jpg" />

      {/* Technical SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="fr-FR" />
      <meta name="geo.region" content="FR" />

      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://api.github.com" />

      {/* PWA */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kiame Touré",
            "url": "https://kiametoure.me",
            "image": "https://kiametoure.me/profile-image.jpg",
            "sameAs": [
              "https://linkedin.com/in/kiame-toure",
              "https://github.com/kiame-toure"
            ],
            "jobTitle": "Concepteur de Solutions IT & Digital",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "knowsAbout": [
              "Développement VR/AR",
              "Intelligence Artificielle",
              "Blockchain",
              "Cryptomonnaies",
              "Three.js",
              "WebXR",
              "Technologies Immersives"
            ],
            "description": "Concepteur et développeur de solutions IT innovantes spécialisé en technologies émergentes"
          })
        }}
      />

      {/* Loading state */}
      {isLoading && (
        <meta name="preload" content="true" />
      )}
    </Head>
  );
}
