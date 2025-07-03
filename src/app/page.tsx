'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { CollaborationSection } from '@/components/sections/CollaborationSection';
import { Navigation } from '@/components/Navigation';
import { VoiceControls } from '@/components/VoiceControls';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function Home() {
  return (
    <main className="relative">
      {/* Navigation dots */}
      <Navigation />

      {/* Commandes vocales */}
      <VoiceControls />

      {/* Section Hero */}
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>

      {/* Section Expertise */}
      <Suspense fallback={<LoadingSpinner />}>
        <ExpertiseSection />
      </Suspense>

      {/* Section Portfolio */}
      <Suspense fallback={<LoadingSpinner />}>
        <PortfolioSection />
      </Suspense>

      {/* Section Collaboration */}
      <Suspense fallback={<LoadingSpinner />}>
        <CollaborationSection />
      </Suspense>
    </main>
  );
}
