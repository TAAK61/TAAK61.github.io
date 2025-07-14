'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import VoiceControls from './VoiceControls';
import { IntelligentChatbot } from './IntelligentChatbot';

interface WidgetsState {
  voiceControls: {
    isVisible: boolean;
    isEnabled: boolean;
  };
  chatbot: {
    isVisible: boolean;
    isEnabled: boolean;
  };
}

interface WidgetsContextType {
  widgets: WidgetsState;
  toggleVoiceControls: () => void;
  toggleChatbot: () => void;
  showWidgetsMenu: boolean;
  setShowWidgetsMenu: (show: boolean) => void;
  resetWidgets: () => void;
}

const WidgetsContext = createContext<WidgetsContextType | undefined>(undefined);

const defaultWidgetsState: WidgetsState = {
  voiceControls: {
    isVisible: true,
    isEnabled: true,
  },
  chatbot: {
    isVisible: true,
    isEnabled: true,
  },
};

export function GlobalWidgetsProvider({ children }: { children: ReactNode }) {
  const [widgets, setWidgets] = useState<WidgetsState>(defaultWidgetsState);
  const [showWidgetsMenu, setShowWidgetsMenu] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Créer un conteneur de portail au niveau le plus élevé
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let container = document.getElementById('widgets-portal');
      if (!container) {
        container = document.createElement('div');
        container.id = 'widgets-portal';
        container.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2147483647;
        `;
        document.body.appendChild(container);
      }
      setPortalContainer(container);
      setIsMounted(true);
    }

    return () => {
      const container = document.getElementById('widgets-portal');
      if (container) {
        container.remove();
      }
    };
  }, []);

  // Charger l'état depuis localStorage
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('portfolio-widgets-state');
    if (saved) {
      try {
        const parsedState = JSON.parse(saved);
        setWidgets(parsedState);
      } catch (error) {
        console.error('Erreur lors du chargement des préférences widgets:', error);
      }
    }
  }, []);

  // Sauvegarder l'état dans localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('portfolio-widgets-state', JSON.stringify(widgets));
    }
  }, [widgets, isMounted]);

  const toggleVoiceControls = () => {
    setWidgets(prev => ({
      ...prev,
      voiceControls: {
        ...prev.voiceControls,
        isVisible: !prev.voiceControls.isVisible
      }
    }));
  };

  const toggleChatbot = () => {
    setWidgets(prev => ({
      ...prev,
      chatbot: {
        ...prev.chatbot,
        isVisible: !prev.chatbot.isVisible
      }
    }));
  };

  const resetWidgets = () => {
    setWidgets(defaultWidgetsState);
    localStorage.removeItem('portfolio-widgets-state');
  };

  const contextValue: WidgetsContextType = {
    widgets,
    toggleVoiceControls,
    toggleChatbot,
    showWidgetsMenu,
    setShowWidgetsMenu,
    resetWidgets,
  };

  if (!isMounted || !portalContainer) {
    return <>{children}</>;
  }

  const widgetsContent = (
    <>
      {/* Widgets flottants rendus dans le portail */}
      {widgets.voiceControls.isEnabled && (
        <VoiceControls
          isHidden={!widgets.voiceControls.isVisible}
          onToggleVisibility={toggleVoiceControls}
        />
      )}

      {widgets.chatbot.isEnabled && (
        <IntelligentChatbot
          isHidden={!widgets.chatbot.isVisible}
          onToggleVisibility={toggleChatbot}
        />
      )}

      {/* Menu de contrôle des widgets */}
      {showWidgetsMenu && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          style={{ zIndex: 2147483646, pointerEvents: 'auto' }}
          onClick={() => setShowWidgetsMenu(false)}
        >
          <div
            className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-96 max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Préférences Widgets</h2>
              <button
                onClick={() => setShowWidgetsMenu(false)}
                className="text-white/60 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Commandes vocales */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    🎤
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Commandes Vocales</h3>
                    <p className="text-white/60 text-sm">Navigation par la voix</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={widgets.voiceControls.isVisible}
                    onChange={toggleVoiceControls}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              {/* Chatbot */}
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Assistant IA</h3>
                    <p className="text-white/60 text-sm">Chatbot intelligent</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={widgets.chatbot.isVisible}
                    onChange={toggleChatbot}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={resetWidgets}
                className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/20"
              >
                Réinitialiser
              </button>
              <button
                onClick={() => setShowWidgetsMenu(false)}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all"
              >
                Fermer
              </button>
            </div>

            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/70 text-xs leading-relaxed">
                💡 <strong>Astuce :</strong> Vous pouvez déplacer les widgets en les faisant glisser.
                Utilisez les boutons × pour les masquer temporairement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bouton d'accès rapide aux préférences widgets */}
      <button
        onClick={() => setShowWidgetsMenu(true)}
        className="fixed top-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-all group"
        title="Préférences widgets"
        style={{
          zIndex: 2147483645,
          pointerEvents: 'auto'
        }}
      >
        <svg
          className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </>
  );

  return (
    <WidgetsContext.Provider value={contextValue}>
      {children}
      {createPortal(widgetsContent, portalContainer)}
    </WidgetsContext.Provider>
  );
}

export function useWidgets() {
  const context = useContext(WidgetsContext);
  if (context === undefined) {
    throw new Error('useWidgets must be used within a GlobalWidgetsProvider');
  }
  return context;
}
