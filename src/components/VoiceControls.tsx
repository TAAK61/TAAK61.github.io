'use client';

import { useState, useEffect, useCallback } from 'react';

interface VoiceControlsProps {
  onNavigate?: (section: string) => void;
  onCommand?: (command: string) => void;
}

export default function VoiceControls({ onNavigate, onCommand }: VoiceControlsProps) {
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [lastCommand, setLastCommand] = useState('');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Vérifier la disponibilité de l'API Web Speech
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
  }, []);

  const handleVoiceCommand = useCallback((command: string) => {
    setLastCommand(command);

    // Commandes de navigation
    const navigationCommands: { [key: string]: string } = {
      'accueil': 'hero',
      'home': 'hero',
      'expertise': 'expertise',
      'compétences': 'expertise',
      'portfolio': 'portfolio',
      'projets': 'portfolio',
      'collaboration': 'collaboration',
      'contact': 'collaboration'
    };

    const lowerCommand = command.toLowerCase();

    // Rechercher la commande
    for (const [voice, section] of Object.entries(navigationCommands)) {
      if (lowerCommand.includes(voice)) {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          onNavigate?.(section);
          return;
        }
      }
    }

    // Autres commandes
    if (lowerCommand.includes('stop') || lowerCommand.includes('arrêt')) {
      setIsListening(false);
    }

    onCommand?.(command);
  }, [onNavigate, onCommand]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulation de reconnaissance vocale
      setTimeout(() => {
        setLastCommand('Commande vocale simulée');
      }, 1000);
    }
  };

  if (!isSupported) {
    return null; // Masquer si non supporté
  }

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      {/* Bouton principal - toujours visible */}
      <div className="relative">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className={`w-14 h-14 rounded-full liquid-glass flex items-center justify-center text-xl transition-all duration-300 shadow-lg ${
            isListening 
              ? 'bg-red-500/20 text-red-400 border-red-400/50 animate-pulse' 
              : 'bg-blue-500/20 text-blue-400 border-blue-400/50 hover:scale-105'
          } border backdrop-blur-lg`}
          title="Commandes vocales"
        >
          {isListening ? '🎤' : '🔊'}
        </button>

        {/* Badge d'état */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold shadow-lg ${
          isListening ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'
        }`}>
          {isListening ? 'ON' : 'OFF'}
        </div>
      </div>

      {/* Panneau étendu */}
      {!isMinimized && (
        <>
          {/* Overlay pour fermer */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsMinimized(true)}
          />

          {/* Panneau principal */}
          <div className="absolute bottom-16 left-0 w-80 liquid-glass rounded-lg overflow-hidden shadow-2xl border border-white/20 z-[9999] animate-fade-in-scale backdrop-blur-lg">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white">🎤 Commandes Vocales</h3>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/60 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-white/10"
                title="Fermer"
              >
                ✕
              </button>
            </div>

            {/* Contenu */}
            <div className="p-4 space-y-4">
              {/* Contrôle d'écoute */}
              <div className="text-center">
                <button
                  onClick={toggleListening}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isListening
                      ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/50 hover:bg-blue-500/30'
                  }`}
                >
                  {isListening ? '🛑 Arrêter l\'écoute' : '🎤 Commencer l\'écoute'}
                </button>
              </div>

              {/* Dernière commande */}
              {lastCommand && (
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-xs text-white/60 mb-1">Dernière commande :</div>
                  <div className="text-sm text-white">{lastCommand}</div>
                </div>
              )}

              {/* Liste des commandes */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-white/80">Commandes disponibles :</h4>
                <div className="space-y-2 text-xs">
                  <div className="space-y-1">
                    <div className="text-white/60 font-medium">Navigation :</div>
                    <div className="grid grid-cols-2 gap-1 text-white/80">
                      <div>"Accueil"</div>
                      <div>"Expertise"</div>
                      <div>"Portfolio"</div>
                      <div>"Contact"</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-white/60 font-medium">Contrôles :</div>
                    <div className="text-white/80">
                      "Stop" • "Arrêter" • "Aide"
                    </div>
                  </div>
                </div>
              </div>

              {/* État de la reconnaissance */}
              <div className="text-center pt-3 border-t border-white/10">
                <div className={`text-xs ${isListening ? 'text-green-400' : 'text-gray-400'}`}>
                  {isListening ? '🟢 En écoute...' : '⭕ Écoute arrêtée'}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
