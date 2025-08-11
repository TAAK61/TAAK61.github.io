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

interface GlobalWidgetsProviderProps {
  children: ReactNode;
}

export function GlobalWidgetsProvider({ children }: GlobalWidgetsProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);
  const [showWidgetsMenu, setShowWidgetsMenu] = useState(false);

  const [widgets, setWidgets] = useState<WidgetsState>({
    voiceControls: {
      isVisible: true,
      isEnabled: true,
    },
    chatbot: {
      isVisible: true,
      isEnabled: true,
    },
  });

  useEffect(() => {
    setMounted(true);

    // Créer le conteneur pour les widgets s'il n'existe pas
    let container = document.getElementById('widgets-portal');
    if (!container) {
      container = document.createElement('div');
      container.id = 'widgets-portal';
      container.style.position = 'fixed';
      container.style.top = '0';
      container.style.left = '0';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.pointerEvents = 'none';
      container.style.zIndex = '2147483647'; // Z-index maximum
      document.body.appendChild(container);
    }
    setPortalContainer(container);

    return () => {
      const container = document.getElementById('widgets-portal');
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  const toggleVoiceControls = () => {
    setWidgets(prev => ({
      ...prev,
      voiceControls: {
        ...prev.voiceControls,
        isVisible: !prev.voiceControls.isVisible,
      },
    }));
  };

  const toggleChatbot = () => {
    setWidgets(prev => ({
      ...prev,
      chatbot: {
        ...prev.chatbot,
        isVisible: !prev.chatbot.isVisible,
      },
    }));
  };

  const resetWidgets = () => {
    setWidgets({
      voiceControls: {
        isVisible: true,
        isEnabled: true,
      },
      chatbot: {
        isVisible: true,
        isEnabled: true,
      },
    });
  };

  const contextValue: WidgetsContextType = {
    widgets,
    toggleVoiceControls,
    toggleChatbot,
    showWidgetsMenu,
    setShowWidgetsMenu,
    resetWidgets,
  };

  // Contenu des widgets qui sera rendu dans le portal
  const widgetsContent = mounted && portalContainer ? (
    <>
      {/* VoiceControls - Position fixe en haut à droite */}
      {widgets.voiceControls.isVisible && widgets.voiceControls.isEnabled && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 2147483646,
            pointerEvents: 'auto'
          }}
        >
          <VoiceControls />
        </div>
      )}

      {/* Chatbot - Position fixe en bas à droite */}
      {widgets.chatbot.isVisible && widgets.chatbot.isEnabled && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 2147483646,
            pointerEvents: 'auto'
          }}
        >
          <IntelligentChatbot
            isHidden={false}
            onToggleVisibility={toggleChatbot}
          />
        </div>
      )}

      {/* Menu de configuration des widgets */}
      {showWidgetsMenu && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2147483647,
            pointerEvents: 'auto'
          }}
          className="bg-black/90 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-white text-lg font-semibold mb-4">Configuration des Widgets</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white">Contrôles vocaux</span>
              <button
                onClick={toggleVoiceControls}
                className={`px-3 py-1 rounded-full text-sm ${
                  widgets.voiceControls.isVisible
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {widgets.voiceControls.isVisible ? 'Actif' : 'Inactif'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white">Chatbot IA</span>
              <button
                onClick={toggleChatbot}
                className={`px-3 py-1 rounded-full text-sm ${
                  widgets.chatbot.isVisible
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {widgets.chatbot.isVisible ? 'Actif' : 'Inactif'}
              </button>
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={resetWidgets}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Réinitialiser
            </button>
            <button
              onClick={() => setShowWidgetsMenu(false)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Bouton de configuration des widgets */}
      <button
        onClick={() => setShowWidgetsMenu(!showWidgetsMenu)}
        className="fixed bottom-20 left-4 w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
        title="Préférences widgets"
        style={{
          zIndex: 2147483646,
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
  ) : null;

  if (!mounted || !portalContainer) {
    return (
      <WidgetsContext.Provider value={contextValue}>
        {children}
      </WidgetsContext.Provider>
    );
  }

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
