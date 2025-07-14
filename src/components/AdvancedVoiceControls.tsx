'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types pour les commandes vocales
interface VoiceCommand {
  command: string;
  variations: string[];
  action: () => void;
  description: string;
}

export function AdvancedVoiceControls() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [lastCommand, setLastCommand] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Fonction pour faire défiler vers une section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setLastCommand(`Navigation vers ${sectionId}`);
    }
  }, []);

  // Afficher l'aide
  const showHelp = useCallback(() => {
    setIsVisible(true);
    setLastCommand('Aide affichée');
    setTimeout(() => setIsVisible(false), 5000);
  }, []);

  // Commandes vocales disponibles
  const voiceCommands: VoiceCommand[] = [
    {
      command: 'accueil',
      variations: ['aller à l\'accueil', 'retour accueil', 'home', 'début'],
      action: () => scrollToSection('hero'),
      description: 'Aller à la section d\'accueil'
    },
    {
      command: 'expertise',
      variations: ['mes compétences', 'voir expertise', 'compétences'],
      action: () => scrollToSection('expertise'),
      description: 'Voir mes expertises'
    },
    {
      command: 'portfolio',
      variations: ['mes projets', 'voir portfolio', 'projets'],
      action: () => scrollToSection('portfolio'),
      description: 'Découvrir mes projets'
    },
    {
      command: 'contact',
      variations: ['collaboration', 'contacter', 'travailler ensemble'],
      action: () => scrollToSection('collaboration'),
      description: 'Me contacter'
    },
    {
      command: 'aide',
      variations: ['help', 'commandes', 'que peux-tu faire'],
      action: () => showHelp(),
      description: 'Afficher l\'aide vocale'
    }
  ];

  // Traitement des commandes vocales
  const processVoiceCommand = useCallback((text: string) => {
    const normalizedText = text.toLowerCase().trim();

    // Recherche de correspondance avec les commandes
    const matchedCommand = voiceCommands.find(cmd => {
      return cmd.variations.some(variation =>
        normalizedText.includes(variation.toLowerCase()) ||
        normalizedText.includes(cmd.command.toLowerCase())
      );
    });

    if (matchedCommand) {
      matchedCommand.action();
      return true;
    }

    return false;
  }, [voiceCommands]);

  // Initialisation de la reconnaissance vocale
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        setIsSupported(true);

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'fr-FR';
        recognition.maxAlternatives = 3;

        recognition.onstart = () => {
          setIsListening(true);
          setTranscript('');
        };

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const transcript = result[0].transcript;
            const confidence = result[0].confidence;

            if (result.isFinal) {
              finalTranscript += transcript;
              setConfidence(confidence);

              // Traiter la commande si elle est finale
              if (processVoiceCommand(transcript)) {
                recognition.stop();
              }
            } else {
              interimTranscript += transcript;
            }
          }

          setTranscript(finalTranscript || interimTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error('Erreur de reconnaissance vocale:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          setTranscript('');
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [processVoiceCommand]);

  // Démarrer/arrêter l'écoute
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();

      // Auto-stop après 10 secondes
      timeoutRef.current = setTimeout(() => {
        if (recognitionRef.current && isListening) {
          recognitionRef.current.stop();
        }
      }, 10000);
    }
  }, [isListening]);

  // Nettoyage
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isSupported) {
    return null; // Ne pas afficher si non supporté
  }

  return (
    <>
      {/* Bouton de contrôle vocal */}
      <motion.div
        className="fixed bottom-6 right-6 z-[9999]"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0 }} // Apparition immédiate
      >
        <motion.button
          onClick={toggleListening}
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center
            backdrop-blur-xl border-2 transition-all duration-300
            ${isListening 
              ? 'bg-red-500/20 border-red-400 shadow-lg shadow-red-500/25' 
              : 'bg-blue-500/20 border-blue-400 hover:bg-blue-500/30 shadow-lg shadow-blue-500/25'
            }
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={isListening ? 'Arrêter l\'écoute' : 'Commandes vocales'}
        >
          <motion.div
            animate={isListening ? { scale: [1, 1.2, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
          >
            🎤
          </motion.div>

          {/* Indicateur d'écoute */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{ scale: [1, 1.5], opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Transcript en temps réel */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 right-0 max-w-xs p-3 bg-black/80 backdrop-blur-xl rounded-xl border border-white/20"
            >
              <p className="text-white text-sm">{transcript}</p>
              {confidence > 0 && (
                <div className="mt-2 w-full bg-gray-700 rounded-full h-1">
                  <div
                    className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${confidence * 100}%` }}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation de commande */}
        <AnimatePresence>
          {lastCommand && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-20 right-0 p-3 bg-green-500/20 backdrop-blur-xl rounded-xl border border-green-400/30"
              onAnimationComplete={() => {
                setTimeout(() => setLastCommand(''), 2000);
              }}
            >
              <p className="text-green-300 text-sm">✓ {lastCommand}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Panel d'aide vocale */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 p-8 max-w-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">🎤</span>
                <h3 className="text-white text-xl font-bold">Commandes Vocales</h3>
              </div>

              <div className="space-y-3">
                {voiceCommands.map((cmd, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-blue-400 font-mono text-sm">"{cmd.command}"</span>
                    <span className="text-white/70 text-sm">{cmd.description}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsVisible(false)}
                className="mt-6 w-full py-2 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-300 hover:bg-blue-500/30 transition-all"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
