'use client';

import { usePageTransitions, TransitionEffects } from '@/components/TransitionEffects';

const sections = [
  { id: 'hero', name: 'Accueil' },
  { id: 'expertise', name: 'Expertise' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'collaboration', name: 'Collaboration' },
];

export function Navigation() {
  const { activeSection, isTransitioning, smoothScrollToSection } = usePageTransitions();

  return (
    <>
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="flex flex-col space-y-4">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => smoothScrollToSection(section.id)}
              disabled={isTransitioning}
              className={`nav-dot ${activeSection === section.id ? 'active' : ''} ${
                isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label={`Aller à la section ${section.name}`}
              title={section.name}
            />
          ))}
        </div>

        {/* Labels de navigation visibles au survol */}
        <div className="absolute right-full mr-4 top-0 space-y-4 pointer-events-none">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`text-right transform transition-all duration-300 ${
                activeSection === section.id
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
              }`}
              style={{ marginTop: `${index * 2.5}rem` }}
            >
              <span className="text-sm text-white/80 bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                {section.name}
              </span>
            </div>
          ))}
        </div>
      </nav>

      {/* Effets de transition liquide */}
      <TransitionEffects activeSection={activeSection} />
    </>
  );
}
