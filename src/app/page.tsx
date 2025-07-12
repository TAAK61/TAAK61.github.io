'use client';

import { Suspense, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExpertiseSection } from '@/components/sections/ExpertiseSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { CollaborationSection } from '@/components/sections/CollaborationSection';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import TransitionEffects from '@/components/TransitionEffects';
import VoiceControls from '@/components/VoiceControls';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  // Gestion de la navigation depuis les commandes vocales
  const handleVoiceNavigation = (section: string) => {
    setActiveSection(section);
  };

  // Gestion des commandes vocales
  const handleVoiceCommand = (command: string) => {
    console.log('Commande vocale reçue:', command);
  };

  return (
    <main className="relative">
      {/* Navigation avec dots Liquid Glass */}
      <Navigation />

      {/* Effets de transition entre sections */}
      <TransitionEffects activeSection={activeSection} />

      {/* Commandes vocales Web Speech API */}
      <VoiceControls
        onNavigate={handleVoiceNavigation}
        onCommand={handleVoiceCommand}
      />

      {/* Section Hero avec Three.js et objets 3D flottants améliorés */}
      <section id="hero" className="animate-fade-in-scale">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
        </Suspense>
      </section>

      {/* Section Expertise avec 4 cards morphing */}
      <section id="expertise" className="animate-slide-in-left">
        <Suspense fallback={<LoadingSpinner />}>
          <ExpertiseSection />
        </Suspense>
      </section>

      {/* Section Portfolio avec galerie 3D */}
      <section id="portfolio" className="animate-slide-in-right">
        <Suspense fallback={<LoadingSpinner />}>
          <PortfolioSection />
        </Suspense>
      </section>

      {/* Section Collaboration avec booking Setmore */}
      <section id="collaboration" className="animate-slide-in-bottom">
        <Suspense fallback={<LoadingSpinner />}>
          <CollaborationSection />
        </Suspense>
      </section>
    </main>
  );
}
