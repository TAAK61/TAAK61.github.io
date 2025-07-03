'use client';

import { Suspense } from 'react';
import { ThreeJSScene } from '@/components/three/ThreeJSScene';

export function HeroSection() {
  return (
    <section id="hero" className="section-fullscreen relative">
      {/* Scène Three.js avec objets 3D flottants */}
      <Suspense fallback={<div className="absolute inset-0 bg-black/20" />}>
        <ThreeJSScene />
      </Suspense>

      {/* Overlay gradient */}
      <div className="gradient-overlay" />

      {/* Contenu principal */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="liquid-glass p-8 md:p-12 lg:p-16">
          <h1 className="text-hero font-bold mb-6 text-gradient">
            Concepteur de solutions
            <br />
            <span className="text-white">IT & Digital</span>
          </h1>

          <p className="text-subtitle text-white/80 mb-8 max-w-3xl mx-auto">
            Équilibre technique-business-innovation dans les technologies émergentes
            <br />
            <span className="text-accent-blue">VR/AR • IA • Blockchain • Entrepreneuriat</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="glass-button px-8 py-4 text-white font-medium"
              onClick={() => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir mon expertise
            </button>
            <button
              className="glass-button px-8 py-4 text-white font-medium"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Voir mes projets
            </button>
          </div>
        </div>

        {/* Instructions d'interaction 3D */}
        <div className="absolute bottom-20 left-6 glass-morphism p-4 rounded-lg max-w-xs">
          <p className="text-sm text-white/70 mb-2">
            💡 <strong>Interaction 3D</strong>
          </p>
          <p className="text-xs text-white/60">
            Survolez les objets flottants pour découvrir mes compétences
          </p>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glass-morphism p-3 rounded-full">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
