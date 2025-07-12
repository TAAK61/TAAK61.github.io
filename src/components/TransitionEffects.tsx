'use client';

import { useEffect, useState } from 'react';

// Valeurs prédéfinies pour les particules de transition
const TRANSITION_PARTICLES = [
  { left: 15.2, top: 25.8, delay: 0.1, duration: 1.0 },
  { left: 45.7, top: 67.3, delay: 0.3, duration: 0.9 },
  { left: 78.1, top: 12.9, delay: 0.2, duration: 1.1 },
  { left: 32.5, top: 89.4, delay: 0.4, duration: 0.8 },
  { left: 91.8, top: 34.6, delay: 0.0, duration: 1.2 },
  { left: 23.4, top: 56.2, delay: 0.5, duration: 0.9 },
  { left: 67.9, top: 78.1, delay: 0.1, duration: 1.0 },
  { left: 56.3, top: 23.7, delay: 0.3, duration: 0.8 },
  { left: 12.7, top: 91.5, delay: 0.2, duration: 1.1 },
  { left: 84.2, top: 45.8, delay: 0.4, duration: 0.9 },
  { left: 38.9, top: 67.2, delay: 0.0, duration: 1.0 },
  { left: 72.6, top: 19.4, delay: 0.5, duration: 0.8 },
  { left: 29.1, top: 83.7, delay: 0.1, duration: 1.2 },
  { left: 95.4, top: 56.3, delay: 0.3, duration: 0.9 },
  { left: 41.8, top: 28.9, delay: 0.2, duration: 1.0 },
  { left: 63.5, top: 94.1, delay: 0.4, duration: 0.8 },
  { left: 17.2, top: 42.6, delay: 0.0, duration: 1.1 },
  { left: 86.7, top: 71.8, delay: 0.5, duration: 0.9 },
  { left: 52.3, top: 37.4, delay: 0.1, duration: 1.0 },
  { left: 74.9, top: 85.2, delay: 0.3, duration: 0.8 },
];

interface TransitionEffectsProps {
  activeSection: string;
}

// Composant pour les particules de transition améliorées
function EnhancedTransitionParticles({ isTransitioning }: { isTransitioning: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isTransitioning) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {TRANSITION_PARTICLES.map((particle, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Onde de transition */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent transform -skew-x-12 animate-sweep"></div>
    </div>
  );
}

// Hook pour gérer les transitions entre sections
function useTransitions(activeSection: string) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState(activeSection);

  useEffect(() => {
    if (activeSection !== previousSection) {
      setIsTransitioning(true);

      // Fin de la transition après 800ms
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPreviousSection(activeSection);
      }, 800);

      return () => clearTimeout(timer);
    }

    // Retourner undefined explicitement si la condition n'est pas remplie
    return undefined;
  }, [activeSection, previousSection]);

  return { isTransitioning, previousSection };
}

// Composant principal avec transitions améliorées
export default function TransitionEffects({ activeSection }: TransitionEffectsProps) {
  const { isTransitioning } = useTransitions(activeSection);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Particules de transition */}
      <EnhancedTransitionParticles isTransitioning={isTransitioning} />

      {/* Overlay de transition avec effet liquide */}
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-indigo-900/20 animate-pulse"></div>

          {/* Effet de vague liquide */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-10 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12 animate-sweep-wave"></div>
          </div>
        </div>
      )}

      {/* Indicateur de section active */}
      <div className="fixed top-4 right-4 z-40 pointer-events-none">
        <div className="liquid-glass px-3 py-1 text-xs text-white/80 font-medium">
          {activeSection}
        </div>
      </div>
    </>
  );
}

// Hook pour gérer les transitions fluides
export function usePageTransitions() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const smoothScrollToSection = (sectionId: string) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setActiveSection(sectionId);

    // Transition avec easing personnalisé
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Reset transition state after scroll
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }
  };

  return {
    activeSection,
    isTransitioning,
    smoothScrollToSection,
  };
}
