'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationIndicatorProps {
  sections: string[];
  currentSection?: string;
  onSectionChange?: (section: string) => void;
}

export function NavigationIndicator({
  sections = ['hero', 'expertise', 'portfolio', 'collaboration'],
  currentSection = 'hero',
  onSectionChange
}: NavigationIndicatorProps) {
  const [activeSection, setActiveSection] = useState(currentSection);
  const [isScrolling, setIsScrolling] = useState(false);

  // Détection automatique de la section active
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            setActiveSection(sectionId);
            onSectionChange?.(sectionId);
          }
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections, onSectionChange]);

  // Navigation avec scroll smooth
  const navigateToSection = useCallback((targetSection: string) => {
    setIsScrolling(true);
    const element = document.getElementById(targetSection);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Reset scrolling state after animation
      setTimeout(() => setIsScrolling(false), 1000);
    }
  }, []);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const currentIndex = sections.indexOf(activeSection);

      switch (event.key) {
        case 'ArrowDown':
        case 'PageDown':
          event.preventDefault();
          if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            if (nextSection) navigateToSection(nextSection);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          if (currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            if (prevSection) navigateToSection(prevSection);
          }
          break;
        case 'Home':
          event.preventDefault();
          const firstSection = sections[0];
          if (firstSection) navigateToSection(firstSection);
          break;
        case 'End':
          event.preventDefault();
          const lastSection = sections[sections.length - 1];
          if (lastSection) navigateToSection(lastSection);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeSection, sections, navigateToSection]);

  const sectionLabels = {
    hero: { label: 'Accueil', icon: '🏠' },
    expertise: { label: 'Expertise', icon: '⚡' },
    portfolio: { label: 'Portfolio', icon: '🎨' },
    collaboration: { label: 'Contact', icon: '🤝' }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[99990] flex flex-col gap-4">
      {/* Indicateurs de navigation */}
      <nav
        className="flex flex-col gap-3 p-3 liquid-glass rounded-2xl border border-white/10"
        role="navigation"
        aria-label="Navigation par sections"
      >
        {sections.map((section, index) => {
          const isActive = section === activeSection;
          const sectionData = sectionLabels[section as keyof typeof sectionLabels];

          return (
            <button
              key={section}
              onClick={() => navigateToSection(section)}
              className="group relative flex items-center gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white/10"
              aria-label={`Aller à la section ${sectionData?.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Indicateur visuel */}
              <div className="relative">
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-500 border-blue-400 scale-125' 
                      : 'bg-transparent border-white/40 group-hover:border-white/70'
                  }`}
                />

                {/* Animation de progression */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 w-3 h-3 rounded-full bg-blue-500/30 animate-pulse"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Label au survol */}
              <div className={`
                absolute left-full ml-4 px-3 py-2 bg-black/80 backdrop-blur-xl rounded-lg
                text-sm text-white whitespace-nowrap transition-all duration-300
                ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                pointer-events-none border border-white/20
              `}>
                <span className="mr-2">{sectionData?.icon}</span>
                {sectionData?.label}

                {/* Flèche */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-r-8 border-r-black/80 border-t-4 border-b-4 border-t-transparent border-b-transparent" />
              </div>
            </button>
          );
        })}
      </nav>

      {/* Barre de progression globale */}
      <div className="w-1 h-32 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"
          initial={{ height: '0%' }}
          animate={{
            height: `${((sections.indexOf(activeSection) + 1) / sections.length) * 100}%`
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Raccourcis clavier (affiché temporairement) */}
      <AnimatePresence>
        {isScrolling && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute left-full ml-4 top-0 p-3 bg-black/80 backdrop-blur-xl rounded-lg border border-white/20"
          >
            <div className="text-xs text-white/70 space-y-1">
              <div>↑↓ Navigation</div>
              <div>Home/End Début/Fin</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
