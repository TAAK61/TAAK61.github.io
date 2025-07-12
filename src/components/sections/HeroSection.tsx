'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique du composant ThreeJSScene pour éviter les erreurs SSR
const ThreeJSScene = dynamic(() => import('../three/ThreeJSScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
});

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Arrière-plan avec dégradés */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.15),transparent_50%)]"></div>

      {/* Scene Three.js en arrière-plan */}
      {mounted && (
        <div className="absolute inset-0 z-0">
          <ThreeJSScene />
        </div>
      )}

      {/* Contenu principal centré */}
      <div className="container-responsive relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge de présentation */}
          <div className="inline-flex items-center gap-2 liquid-glass px-4 py-2 rounded-full mb-8 animate-fade-in-scale">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/80">Disponible pour nouveaux projets</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-scale delay-200">
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Concepteur et Développeur
            </span>
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              de solutions IT
            </span>
          </h1>

          {/* Sous-titre descriptif */}
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-scale delay-400">
            Spécialisé dans la création d'expériences digitales innovantes,
            Ensemble transformons vos idées en solutions technologiques performantes et esthétiques.
            De la conception à la réalisation, découvrez l'art du développement moderne.
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-scale delay-600">
            <button
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              className="liquid-glass px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50 hover:border-blue-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 group"
            >
              <span className="mr-2 group-hover:scale-110 transition-transform">🚀</span>
              Découvrir mes projets
            </button>
            <button
              onClick={() => document.getElementById('collaboration')?.scrollIntoView({ behavior: 'smooth' })}
              className="liquid-glass px-8 py-4 text-white/90 hover:text-white border border-white/20 hover:border-white/40 font-semibold rounded-xl transition-all duration-300 hover:scale-105 group"
            >
              <span className="mr-2 group-hover:scale-110 transition-transform">🤝</span>
              Collaborons ensemble
            </button>
          </div>

          {/* Indicateurs de compétences */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-scale delay-800">
            {[
              { icon: '🎨', label: 'UI/UX Design', color: 'blue' },
              { icon: '⚡', label: 'Performance', color: 'yellow' },
              { icon: '🔧', label: 'Full-Stack', color: 'green' },
              { icon: '🚀', label: 'Innovation', color: 'purple' }
            ].map((skill, index) => (
              <div key={index} className="liquid-glass p-4 text-center group hover:bg-white/5 transition-all duration-300">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{skill.icon}</div>
                <div className="text-sm text-white/80 font-medium">{skill.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-xs text-white/60 mt-2">Scroll</p>
      </div>

      {/* Particules d'ambiance */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
