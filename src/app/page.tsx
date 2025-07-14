'use client';

import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { CollaborationSection } from '@/components/sections/CollaborationSection';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import TransitionEffects from '@/components/TransitionEffects';

export default function Home() {
  return (
    <>
      {/* Contenu principal - les widgets globaux sont gérés par GlobalWidgetsProvider */}
      <main className="relative">
        {/* Effets de transition entre sections */}
        <TransitionEffects activeSection="hero" />

        {/* Section Hero */}
        <section id="hero" className="animate-fade-in-scale">
          <Suspense fallback={<LoadingSpinner />}>
            <HeroSection />
          </Suspense>
        </section>

        {/* Section Expertise */}
        <section id="expertise" className="animate-slide-in-left">
          <Suspense fallback={<LoadingSpinner />}>
            <ExpertiseSection />
          </Suspense>
        </section>

        {/* Section Portfolio */}
        <section id="portfolio" className="animate-slide-in-right">
          <Suspense fallback={<LoadingSpinner />}>
            <PortfolioSection />
          </Suspense>
        </section>

        {/* Section Collaboration */}
        <section id="collaboration" className="animate-slide-in-bottom">
          <Suspense fallback={<LoadingSpinner />}>
            <CollaborationSection />
          </Suspense>
        </section>
      </main>
    </>
  );
}
