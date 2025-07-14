'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import VoiceControls from './VoiceControls';
import type { VoiceControlsProps } from './VoiceControls';

export function ClientVoiceControls(props: VoiceControlsProps) {
  const [isClient, setIsClient] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setIsClient(true);

    // Créer ou récupérer le conteneur de portail
    let container = document.getElementById('voice-controls-portal');
    if (!container) {
      container = document.createElement('div');
      container.id = 'voice-controls-portal';
      container.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 2147483647 !important;
      `;
      document.body.appendChild(container);
    }
    setPortalRoot(container);

    // Cleanup
    return () => {
      if (container && container.children.length === 0) {
        document.body.removeChild(container);
      }
    };
  }, []);

  // Ne rendre que côté client avec portail
  if (!isClient || !portalRoot) {
    return null;
  }

  // Rendre l'icône directement dans le body via un portail
  return createPortal(<VoiceControls {...props} />, portalRoot);
}
