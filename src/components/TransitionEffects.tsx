'use client';

import { useEffect, useState } from 'react';

interface TransitionEffectsProps {
  activeSection: string;
}

export function TransitionEffects({ activeSection }: TransitionEffectsProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousSection, setPreviousSection] = useState('');

  useEffect(() => {
    if (previousSection && previousSection !== activeSection) {
      setIsTransitioning(true);

      // Animation de transition
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);

      return () => clearTimeout(timer); // Fix: return correct cleanup function
    }
    setPreviousSection(activeSection);
  }, [activeSection, previousSection]);

  if (!isTransitioning) return null;

  return (
    <>
      {/* Effet de vague liquide entre sections */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <svg className="w-full h-full">
          <defs>
            <filter id="liquidTransition">
              <feTurbulence
                baseFrequency="0.02"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="50"
              />
            </filter>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="50%" stopColor="rgba(0,122,255,0.2)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#liquidGradient)"
            filter="url(#liquidTransition)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Particules de transition */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${0.8 + Math.random() * 0.4}s`,
            }}
          />
        ))}
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
        block: 'start'
      });

      // Reset de l'état après la transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }
  };

  // Observer les sections visibles
  useEffect(() => {
    const sections = ['hero', 'expertise', 'portfolio', 'collaboration'];
    const observerOptions = {
      threshold: 0.6,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      if (!isTransitioning) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }
    }, observerOptions);

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [isTransitioning]);

  return {
    activeSection,
    isTransitioning,
    smoothScrollToSection
  };
}
