'use client';

import dynamic from 'next/dynamic';

// Charger VoiceControls uniquement côté client pour éviter les erreurs d'hydratation
const VoiceControls = dynamic(() => import('./VoiceControls'), {
  ssr: false
});

export function ClientVoiceControls() {
  return <VoiceControls />;
}
