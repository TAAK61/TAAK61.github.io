'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { usePerformance, useAnimationControl } from './PerformanceManager';

const sections = [
  { id: 'hero', name: 'Accueil', icon: '🏠' },
  { id: 'expertise', name: 'Expertise', icon: '⚡' },
  { id: 'portfolio', name: 'Portfolio', icon: '💼' },
  { id: 'collaboration', name: 'Collaboration', icon: '🤝' },
];

// Hook optimisé pour la navigation
function useOptimizedNavigation() {
  const [activeSection, setActiveSection] = useState('hero');
  const { settings } = usePerformance();
  const { shouldAnimate } = useAnimationControl();

  const smoothScrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const scrollBehavior = shouldAnimate('basic') ? 'smooth' : 'auto';
      element.scrollIntoView({
        behavior: scrollBehavior,
        block: 'start',
      });
    }
  }, [shouldAnimate]);

  // Détection de section optimisée
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'expertise', 'portfolio', 'collaboration'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [activeSection]);

  return { activeSection, smoothScrollToSection };
}

export function Navigation() {
  const { activeSection, smoothScrollToSection } = useOptimizedNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { shouldAnimate } = useAnimationControl();

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, []);

  // Navigation au clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const numberKeys = ['1', '2', '3', '4'];
      const keyIndex = numberKeys.indexOf(e.key);
      if (keyIndex !== -1 && sections[keyIndex]) {
        smoothScrollToSection(sections[keyIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [smoothScrollToSection]);

  return (
    <>
      {/* Logo flottant en haut à gauche */}
      <div className={`fixed top-6 left-6 z-[9999] transition-all duration-300 ${
        shouldAnimate('basic') ? 'transition-all' : ''
      } ${isScrolled ? 'scale-90' : 'scale-100'}`}>
        <div
          className="liquid-glass px-4 py-2 cursor-pointer group hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-lg"
          onClick={() => smoothScrollToSection('hero')}
        >
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            TAAK61
          </span>
        </div>
      </div>

      {/* Navigation dots moderne - droite */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-[9999]">
        <div className="flex flex-col items-center gap-6">
          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            return (
              <div key={section.id} className="relative group">
                {/* Tooltip avec nom de section */}
                <div className={`absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-2 liquid-glass text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none backdrop-blur-lg ${
                  shouldAnimate('basic') ? 'transition-all' : ''
                }`}>
                  <span className="mr-2">{section.icon}</span>
                  {section.name}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-white/20 border-y-4 border-y-transparent"></div>
                </div>

                {/* Point de navigation */}
                <button
                  onClick={() => smoothScrollToSection(section.id)}
                  className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
                    shouldAnimate('basic') ? 'transition-all' : ''
                  } ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50 scale-125' 
                      : 'bg-white/30 hover:bg-white/50 hover:scale-110'
                  }`}
                  aria-label={section.name}
                  title={section.name}
                >
                  {/* Cercle intérieur animé */}
                  {isActive && (
                    <div className="absolute inset-1 bg-white rounded-full animate-pulse"></div>
                  )}

                  {/* Indicateur de progression */}
                  <div className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
                    isActive ? 'border-white/80 animate-spin' : 'border-transparent'
                  }`} style={{ animationDuration: '3s' }}></div>
                </button>

                {/* Numérotation discrète */}
                <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white/40 transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}>
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Barre de progression de scroll en haut */}
      {shouldAnimate('basic') && (
        <div className="fixed top-0 left-0 right-0 z-[9998] h-1">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-300 ease-out shadow-lg shadow-blue-500/30"
            style={{
              width: `${Math.min(100, (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%`
            }}
          />
        </div>
      )}

      {/* Navigation mobile simplifiée */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[9999] md:hidden">
        <div className="liquid-glass px-2 py-2 rounded-full backdrop-blur-lg">
          <div className="flex items-center gap-2">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => smoothScrollToSection(section.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white scale-110' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  title={section.name}
                >
                  {section.icon}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
