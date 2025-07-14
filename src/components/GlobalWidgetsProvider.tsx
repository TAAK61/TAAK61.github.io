'use client';

import { useEffect } from 'react';
import { ModernNavigation } from './ModernNavigation';
import { AdvancedVoiceControls } from './AdvancedVoiceControls';
import { CryptoWidget } from './CryptoWidget';
import { IntelligentChatbot } from './IntelligentChatbot';

export function GlobalWidgetsProvider({ children }: { children: React.ReactNode }) {
  // Force la visibilité des widgets au chargement et lors des changements de route
  useEffect(() => {
    const ensureWidgetsVisibility = () => {
      // Vérifier que tous les widgets sont bien visibles
      const widgets = document.querySelectorAll('[data-widget]');
      widgets.forEach(widget => {
        const element = widget as HTMLElement;
        if (element.style.display === 'none' || element.style.visibility === 'hidden') {
          element.style.display = 'block';
          element.style.visibility = 'visible';
        }
      });
    };

    // Exécuter immédiatement
    ensureWidgetsVisibility();

    // Exécuter après le rendu initial
    const timer = setTimeout(ensureWidgetsVisibility, 100);

    // Observer les changements dans le DOM
    const observer = new MutationObserver(ensureWidgetsVisibility);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {children}

      {/* Widgets avec attributs de suivi pour garantir la visibilité */}
      <div data-widget="navigation" style={{ position: 'relative', zIndex: 9999 }}>
        <ModernNavigation />
      </div>

      <div data-widget="voice" style={{ position: 'relative', zIndex: 9999 }}>
        <AdvancedVoiceControls />
      </div>

      <div data-widget="crypto" style={{ position: 'relative', zIndex: 9999 }}>
        <CryptoWidget />
      </div>

      <div data-widget="chatbot" style={{ position: 'relative', zIndex: 9999 }}>
        <IntelligentChatbot />
      </div>
    </>
  );
}
