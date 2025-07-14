'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export interface VoiceControlsProps {
  onNavigate?: (section: string) => void;
  onCommand?: (command: string) => void;
  isHidden?: boolean;
  onToggleVisibility?: () => void;
}

export default function VoiceControls({ onNavigate, onCommand, isHidden, onToggleVisibility }: VoiceControlsProps) {
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [lastCommand, setLastCommand] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  // Position initiale dans la section hero (en haut à gauche)
  const [position, setPosition] = useState({ x: 24, y: window?.innerHeight ? window.innerHeight - 150 : 650 });
  const recognitionRef = useRef<any>(null);
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number }>({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  });

  const handleVoiceCommand = useCallback((command: string) => {
    setLastCommand(command);

    // Commandes de navigation
    const navigationCommands: { [key: string]: string } = {
      'accueil': 'hero',
      'home': 'hero',
      'expertise': 'expertise',
      'competences': 'expertise',
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
    if (lowerCommand.includes('stop') || lowerCommand.includes('arrêt') || lowerCommand.includes('arret')) {
      setIsListening(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }

    onCommand?.(command);
  }, [onNavigate, onCommand]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Vérifier la disponibilité de l'API Web Speech côté client uniquement
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'fr-FR';

      recognition.onresult = (event: any) => {
        const last = event.results.length - 1;
        const command = event.results[last][0].transcript.toLowerCase().trim();
        handleVoiceCommand(command);
      };

      recognition.onerror = (event: any) => {
        console.error('Erreur de reconnaissance vocale:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [isMounted, handleVoiceCommand]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - dragRef.current.offsetX;
    const newY = e.clientY - dragRef.current.offsetY;

    // Permettre le déplacement libre sur tout l'écran
    setPosition({
      x: Math.max(0, Math.min(window.innerWidth - (isMinimized ? 200 : 320), newX)),
      y: Math.max(0, Math.min(window.innerHeight - (isMinimized ? 60 : 200), newY))
    });
  }, [isDragging, isMinimized]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isMounted || isHidden) {
    return null;
  }

  if (!isSupported) {
    return (
      <div
        style={{
          position: 'fixed',
          top: `${position.y}px`,
          left: `${position.x}px`,
          zIndex: 10000,
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          color: '#ef4444',
          padding: '12px 16px',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          fontWeight: '500'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <p style={{ fontSize: '13px', margin: 0 }}>🎤 Non supporté</p>
          <button
            onClick={onToggleVisibility}
            style={{
              background: 'none',
              border: 'none',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '16px'
            }}
            title="Masquer"
          >
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex: 10000,
        width: isMinimized ? '200px' : '320px',
        height: isMinimized ? '60px' : 'auto',
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateZ(0)',
        willChange: 'transform, width, height',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.15),
          inset 0 -1px 0 rgba(0, 0, 0, 0.05)
        `,
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Widget minimisé */}
        {isMinimized ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              cursor: 'pointer',
              gap: '12px'
            }}
          >
            {/* Icône microphone */}
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: isListening
                ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative'
            }}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                viewBox="0 0 24 24"
                style={{
                  animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>

              {/* Indicateur d'écoute */}
              {isListening && (
                <div style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ef4444',
                  boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)',
                  animation: 'pulse 1s ease-in-out infinite'
                }} />
              )}
            </div>

            {/* Texte "Cliquez pour parler" */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: '1.2'
              }}>
                {isListening ? 'En écoute...' : 'Cliquez pour parler'}
              </span>
              <span style={{
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1'
              }}>
                Commandes vocales
              </span>
            </div>

            {/* Bouton masquer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility?.();
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '6px',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                fontSize: '12px',
                padding: '4px 6px'
              }}
              title="Masquer"
            >
              ×
            </button>
          </div>
        ) : (
          // Widget développé avec options
          <div>
            {/* Header avec contrôles */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0
              }}>
                Commandes Vocales
              </h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '4px 8px'
                  }}
                  title="Réduire"
                >
                  −
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility?.();
                  }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    padding: '4px 8px'
                  }}
                  title="Masquer"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Contenu développé */}
            <div style={{ padding: '20px' }}>
              {/* Bouton principal */}
              <button
                onClick={toggleListening}
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: isListening
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                  backdropFilter: 'blur(16px)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  boxShadow: `
                    0 4px 20px ${isListening ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)'},
                    inset 0 1px 0 rgba(255, 255, 255, 0.1)
                  `,
                  transform: isListening ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  {isListening ? (
                    <>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#fff',
                        animation: 'pulse 1s ease-in-out infinite'
                      }} />
                      <span>⏹️ Arrêter l'écoute</span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: '16px' }}>🎤</span>
                      <span>Commencer l'écoute</span>
                    </>
                  )}
                </div>
              </button>

              {/* Dernière commande */}
              {lastCommand && (
                <div style={{
                  marginTop: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', margin: '0 0 6px 0', fontWeight: '500' }}>
                    💬 Dernière commande :
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', margin: 0, fontWeight: '600' }}>
                    "{lastCommand}"
                  </p>
                </div>
              )}

              {/* Liste des commandes */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.8)',
                  margin: '0 0 12px 0'
                }}>
                  ⚡ Commandes disponibles :
                </h4>
                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.4' }}>
                  {[
                    { cmd: '"accueil" ou "home"', dest: '🏠 Accueil' },
                    { cmd: '"expertise"', dest: '💼 Expertise' },
                    { cmd: '"portfolio"', dest: '🎨 Portfolio' },
                    { cmd: '"collaboration"', dest: '🤝 Contact' },
                    { cmd: '"stop" ou "arrêt"', dest: '⏹️ Arrêter' }
                  ].map((item, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      padding: '4px 0'
                    }}>
                      <span style={{ fontWeight: '500' }}>{item.cmd}</span>
                      <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>{item.dest}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
