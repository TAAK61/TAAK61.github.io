'use client';

import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import Footer from '@/components/Footer';

// Chargement différé des composants lourds
const PortfolioSection = dynamic(() => import('@/components/sections/PortfolioSection'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-white text-xl">Chargement du portfolio...</div>
    </div>
  ),
});

const CollaborationSection = dynamic(() => import('@/components/sections/CollaborationSection'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900">
      <div className="text-white text-xl">Chargement des informations de contact...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ExpertiseSection />
      <PortfolioSection />
      <CollaborationSection />
      <Footer />
    </main>
  );
}
