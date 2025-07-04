'use client';

import { Suspense } from 'react';

// Version temporaire sans Three.js pour éviter les erreurs de compatibilité
function SimpleAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Animation CSS simple en attendant la correction Three.js */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Particules CSS flottantes */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}

        {/* Objets flottants représentant les compétences */}
        <div
          className="absolute top-20 left-20 w-16 h-16 bg-blue-500/30 rounded-lg backdrop-blur-sm border border-white/20 animate-float"
          title="React/Next.js"
        >
          <div className="flex items-center justify-center h-full text-2xl">⚛️</div>
        </div>

        <div
          className="absolute top-40 right-32 w-16 h-16 bg-yellow-500/30 rounded-lg backdrop-blur-sm border border-white/20 animate-float-delayed"
          title="Blockchain"
        >
          <div className="flex items-center justify-center h-full text-2xl">₿</div>
        </div>

        <div
          className="absolute bottom-40 left-32 w-16 h-16 bg-purple-500/30 rounded-lg backdrop-blur-sm border border-white/20 animate-float"
          title="WebXR/AR"
        >
          <div className="flex items-center justify-center h-full text-2xl">🥽</div>
        </div>

        <div
          className="absolute bottom-60 right-20 w-16 h-16 bg-green-500/30 rounded-lg backdrop-blur-sm border border-white/20 animate-float-delayed"
          title="IA/ML"
        >
          <div className="flex items-center justify-center h-full text-2xl">🤖</div>
        </div>

        <div
          className="absolute top-60 left-1/2 w-16 h-16 bg-red-500/30 rounded-lg backdrop-blur-sm border border-white/20 animate-float"
          title="TypeScript"
        >
          <div className="flex items-center justify-center h-full text-2xl">📘</div>
        </div>

        <div
          className="absolute bottom-20 right-1/2 w-16 h-16 bg-orange-500/30 rounded-lg backdrop-blur-sm border border-white/20 animate-float-delayed"
          title="Three.js"
        >
          <div className="flex items-center justify-center h-full text-2xl">🎯</div>
        </div>
      </div>
    </div>
  );
}

export function ThreeJSScene() {
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-black/20" />}>
      <SimpleAnimation />
    </Suspense>
  );
}
