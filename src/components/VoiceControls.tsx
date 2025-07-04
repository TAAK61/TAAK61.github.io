'use client';

import { useState, useEffect, useCallback } from 'react';

interface VoiceCommand {
  command: string;
  action: () => void;
  description: string;
}

export function VoiceControls() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const commands: VoiceCommand[] = [
    {
      command: 'accueil',
      action: () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' }),
      description: 'Aller à la section accueil'
    },
    {
      command: 'expertise',
      action: () => document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' }),
      description: 'Aller à la section expertise'
    },
    {
      command: 'portfolio',
      action: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }),
      description: 'Aller à la section portfolio'
    },
    {
      command: 'projets',
      action: () => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }),
      description: 'Aller aux projets'
    },
    {
      command: 'collaboration',
      action: () => document.getElementById('collaboration')?.scrollIntoView({ behavior: 'smooth' }),
      description: 'Aller à la section collaboration'
    },
    {
      command: 'contact',
      action: () => document.getElementById('collaboration')?.scrollIntoView({ behavior: 'smooth' }),
      description: 'Aller au contact'
    },
    {
      command: 'réserver',
      action: () => {
        const setmoreUrl = 'https://my.setmore.com/kiame-toure';
        window.open(setmoreUrl, '_blank');
      },
      description: 'Ouvrir la réservation'
    }
  ];

  const processCommand = useCallback((spokenText: string) => {
    const text = spokenText.toLowerCase().trim();
    console.log('Commande vocale détectée:', text);
    
    const matchedCommand = commands.find(cmd => 
      text.includes(cmd.command) || 
      text.includes(`aller à ${cmd.command}`) ||
      text.includes(`go to ${cmd.command}`)
    );

    if (matchedCommand) {
      matchedCommand.action();
      setTranscript(`✅ ${matchedCommand.description}`);
      
      // Feedback visuel
      setTimeout(() => setTranscript(''), 3000);
    } else {
      setTranscript(`❌ Commande non reconnue: "${text}"`);
      setTimeout(() => setTranscript(''), 3000);
    }
  }, [commands]);

  useEffect(() => {
    // Vérification du support Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
        
        const speechRecognition = new SpeechRecognition();
        speechRecognition.continuous = false;
        speechRecognition.interimResults = false;
        speechRecognition.lang = 'fr-FR';
        speechRecognition.maxAlternatives = 1;

        speechRecognition.onstart = () => {
          setIsListening(true);
          setTranscript('🎤 Écoute en cours...');
        };

        speechRecognition.onend = () => {
          setIsListening(false);
        };

        speechRecognition.onresult = (event) => {
          const lastResult = event.results[event.results.length - 1];
          if (lastResult.isFinal) {
            const spokenText = lastResult[0].transcript;
            processCommand(spokenText);
          }
        };

        speechRecognition.onerror = (event) => {
          console.error('Erreur reconnaissance vocale:', event.error);
          setIsListening(false);
          setTranscript(`❌ Erreur: ${event.error}`);
          setTimeout(() => setTranscript(''), 3000);
        };

        setRecognition(speechRecognition);
      }
    }
  }, [processCommand, commands]);

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Erreur démarrage reconnaissance:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  if (!isSupported) {
    return null; // Pas d'affichage si non supporté
  }

  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="glass-morphism p-4 rounded-2xl max-w-sm">
        {/* Bouton d'activation */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`glass-button p-3 rounded-full transition-all duration-300 ${
              isListening 
                ? 'bg-red-500/30 border-red-400 animate-pulse' 
                : 'bg-blue-500/30 border-blue-400'
            }`}
            title={isListening ? 'Arrêter l\'écoute' : 'Commande vocale'}
          >
            {isListening ? (
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          
          <div>
            <h3 className="text-sm font-semibold text-white">Commandes vocales</h3>
            <p className="text-xs text-white/60">
              {isListening ? 'En écoute...' : 'Cliquez pour activer'}
            </p>
          </div>
        </div>

        {/* Transcript en temps réel */}
        {transcript && (
          <div className="p-3 bg-white/10 rounded-lg mb-3">
            <p className="text-sm text-white">{transcript}</p>
          </div>
        )}

        {/* Liste des commandes disponibles */}
        <details className="group">
          <summary className="text-xs text-white/70 cursor-pointer hover:text-white transition-colors">
            📝 Commandes disponibles
          </summary>
          <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
            {commands.map((cmd, index) => (
              <div key={index} className="text-xs text-white/60 flex justify-between">
                <span>"{cmd.command}"</span>
                <span className="text-white/40">→ {cmd.description}</span>
              </div>
            ))}
          </div>
        </details>

        {/* Indicateur de statut */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/20">
          <div className={`w-2 h-2 rounded-full ${
            isSupported 
              ? (isListening ? 'bg-red-400 animate-pulse' : 'bg-green-400') 
              : 'bg-gray-400'
          }`} />
          <span className="text-xs text-white/60">
            {isSupported 
              ? (isListening ? 'En écoute' : 'Prêt') 
              : 'Non supporté'
            }
          </span>
        </div>
      </div>
    </div>
  );
}
