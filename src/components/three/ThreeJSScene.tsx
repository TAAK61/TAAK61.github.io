'use client';

import { Suspense, useState, useEffect } from 'react';

// Valeurs prédéfinies pour les particules flottantes
const FLOATING_PARTICLES = [
  { left: 31.8, top: 48.7, delay: 2.9, duration: 6.1 },
  { left: 54.3, top: 62.4, delay: 1.5, duration: 7.3 },
  { left: 84.3, top: 9.9, delay: 2.4, duration: 9.3 },
  { left: 66.4, top: 72.8, delay: 4.2, duration: 7.3 },
  { left: 8.3, top: 63.3, delay: 1.0, duration: 8.9 },
  { left: 96.2, top: 23.3, delay: 5.9, duration: 7.5 },
  { left: 44.3, top: 22.8, delay: 4.9, duration: 6.8 },
  { left: 50.0, top: 57.1, delay: 1.7, duration: 6.8 },
  { left: 15.0, top: 38.8, delay: 5.3, duration: 7.2 },
  { left: 88.8, top: 14.7, delay: 3.0, duration: 9.8 },
  { left: 61.1, top: 37.3, delay: 4.1, duration: 7.4 },
  { left: 89.1, top: 0.5, delay: 2.0, duration: 8.3 },
  { left: 99.0, top: 91.6, delay: 5.6, duration: 9.4 },
  { left: 43.0, top: 37.7, delay: 4.9, duration: 8.1 },
  { left: 13.5, top: 52.5, delay: 4.8, duration: 9.7 },
  { left: 62.5, top: 2.5, delay: 0.9, duration: 7.0 },
  { left: 90.0, top: 83.5, delay: 3.0, duration: 6.1 },
  { left: 23.7, top: 25.3, delay: 2.7, duration: 9.6 },
  { left: 57.7, top: 5.2, delay: 0.9, duration: 8.4 },
  { left: 90.9, top: 2.6, delay: 0.1, duration: 6.5 },
  { left: 82.0, top: 5.1, delay: 4.9, duration: 7.1 },
  { left: 19.0, top: 16.0, delay: 2.8, duration: 7.8 },
  { left: 36.2, top: 60.1, delay: 0.5, duration: 6.3 },
  { left: 67.7, top: 52.1, delay: 3.2, duration: 9.7 },
  { left: 70.5, top: 98.2, delay: 3.1, duration: 8.0 },
];

// Composant pour les particules avec hydratation sécurisée
function FloatingParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATING_PARTICLES.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

// Composant pour les objets 3D flottants améliorés
function Enhanced3DFloatingObjects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Cube technologique React/Next.js */}
      <div
        className="absolute top-20 left-20 w-16 h-16 animate-float-3d hidden lg:block"
        style={{ animationDelay: '0s', animationDuration: '6s' }}
      >
        <div className="relative w-full h-full preserve-3d">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-500/30 backdrop-blur-sm border border-white/20 rounded-lg transform-gpu">
            <div className="flex items-center justify-center h-full text-2xl">⚛️</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 rounded-lg transform-gpu translate-x-1 translate-y-1 -z-10"></div>
        </div>
      </div>

      {/* Pyramide Blockchain */}
      <div
        className="absolute top-40 right-32 w-20 h-20 animate-float-3d hidden lg:block"
        style={{ animationDelay: '1.5s', animationDuration: '8s' }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/30 to-orange-500/30 backdrop-blur-sm border border-white/20 transform rotate-45 rounded-lg">
            <div className="flex items-center justify-center h-full text-2xl transform -rotate-45">₿</div>
          </div>
        </div>
      </div>

      {/* Sphère WebXR */}
      <div
        className="absolute bottom-40 left-32 w-18 h-18 animate-float-3d hidden lg:block"
        style={{ animationDelay: '3s', animationDuration: '7s' }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-500/30 backdrop-blur-sm border border-white/20 rounded-full">
            <div className="flex items-center justify-center h-full text-2xl">🥽</div>
          </div>
          <div className="absolute inset-2 bg-gradient-to-tl from-purple-300/20 to-pink-400/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Hexagone IA */}
      <div
        className="absolute bottom-60 right-20 w-16 h-16 animate-float-3d hidden lg:block"
        style={{ animationDelay: '2s', animationDuration: '9s' }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-500/30 backdrop-blur-sm border border-white/20 transform rotate-12" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' }}>
            <div className="flex items-center justify-center h-full text-2xl transform -rotate-12">🤖</div>
          </div>
        </div>
      </div>

      {/* Cristaux flottants supplémentaires */}
      <div
        className="absolute top-1/3 left-1/2 w-8 h-8 animate-float-crystal hidden xl:block"
        style={{ animationDelay: '4s', animationDuration: '5s' }}
      >
        <div className="w-full h-full bg-gradient-to-br from-indigo-400/40 to-blue-500/40 backdrop-blur-sm border border-white/30 rounded transform rotate-45"></div>
      </div>

      <div
        className="absolute top-2/3 right-1/3 w-6 h-6 animate-float-crystal hidden xl:block"
        style={{ animationDelay: '6s', animationDuration: '4s' }}
      >
        <div className="w-full h-full bg-gradient-to-br from-teal-400/40 to-cyan-500/40 backdrop-blur-sm border border-white/30 rounded-full"></div>
      </div>
    </div>
  );
}

// Version améliorée du composant principal
function Enhanced3DScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full overflow-hidden">
        {/* Particules de base */}
        <FloatingParticles />

        {/* Objets 3D améliorés */}
        <Enhanced3DFloatingObjects />

        {/* Effet de profondeur avec dégradés */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default function ThreeJSScene() {
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />}>
      <Enhanced3DScene />
    </Suspense>
  );
}
