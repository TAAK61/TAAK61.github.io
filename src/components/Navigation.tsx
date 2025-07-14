'use client';

import { useState, useEffect, useCallback } from 'react';

const sections = [
  { id: 'hero', name: 'Accueil', icon: '🏠' },
  { id: 'expertise', name: 'Expertise', icon: '⚡' },
  { id: 'portfolio', name: 'Portfolio', icon: '💼' },
  { id: 'collaboration', name: 'Collaboration', icon: '🤝' },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero');

  const smoothScrollToSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  // Détection de section active au scroll
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

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Détecter la section initiale
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [activeSection]);

  return (
    <nav
      style={{
        position: 'fixed',
        left: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50, // Z-index relatif, le GlobalWidgetsProvider gère le z-index global
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        padding: '16px',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.15)
        `
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => smoothScrollToSection(section.id)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: isActive
                  ? 'radial-gradient(circle, #3b82f6 0%, #1d4ed8 100%)'
                  : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isActive ? 'scale(1.2)' : 'scale(1)',
                boxShadow: isActive
                  ? '0 0 20px rgba(59, 130, 246, 0.6), 0 0 40px rgba(59, 130, 246, 0.3)'
                  : '0 2px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.2) 100%)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)';
                }
              }}
              title={section.name}
              aria-label={`Aller à la section ${section.name}`}
            >
              {/* Effet de ripple au clic */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    left: '-4px',
                    right: '-4px',
                    bottom: '-4px',
                    borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.2)',
                    animation: 'ripple 2s ease-out infinite'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </nav>
  );
}
