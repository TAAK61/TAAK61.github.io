'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour la gestion des performances
interface PerformanceSettings {
  mode: 'high' | 'medium' | 'low';
  reducedMotion: boolean;
  enableAnimations: boolean;
  enableParticles: boolean;
  enableBlur: boolean;
  frameRate: number;
}

interface PerformanceContextType {
  settings: PerformanceSettings;
  updateSettings: (newSettings: Partial<PerformanceSettings>) => void;
  isLowEnd: boolean;
  isMobile: boolean;
}

// Contexte de performance
const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

// Hook pour utiliser le contexte de performance
export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

// Détection des performances du dispositif
const detectDevicePerformance = (): 'high' | 'medium' | 'low' => {
  if (typeof window === 'undefined') return 'medium';

  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 4;
  const connection = (navigator as any).connection;
  
  // Facteurs de performance
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  // Algorithme de détection
  if (cores >= 8 && memory >= 8 && !isMobile && !isSlowConnection) {
    return 'high';
  } else if (cores >= 4 && memory >= 4 && !isSlowConnection) {
    return 'medium';
  } else {
    return 'low';
  }
};

// Provider de performance
export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<PerformanceSettings>({
    mode: 'medium',
    reducedMotion: false,
    enableAnimations: true,
    enableParticles: false,
    enableBlur: true,
    frameRate: 60
  });

  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Détection initiale
    const detectedMode = detectDevicePerformance();
    const mobileDetected = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const reducedMotionPreferred = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setIsLowEnd(detectedMode === 'low');
    setIsMobile(mobileDetected);

    // Configuration adaptative
    const adaptiveSettings: PerformanceSettings = {
      mode: detectedMode,
      reducedMotion: reducedMotionPreferred,
      enableAnimations: !reducedMotionPreferred && detectedMode !== 'low',
      enableParticles: detectedMode === 'high' && !reducedMotionPreferred,
      enableBlur: detectedMode !== 'low',
      frameRate: detectedMode === 'high' ? 60 : detectedMode === 'medium' ? 30 : 15
    };

    setSettings(adaptiveSettings);

    // Écouter les changements de préférence de mouvement
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({
        ...prev,
        reducedMotion: e.matches,
        enableAnimations: !e.matches && prev.mode !== 'low',
        enableParticles: !e.matches && prev.mode === 'high'
      }));
    };

    mediaQuery.addEventListener('change', handleChange);

    // Monitoring des performances en temps réel
    let frameCount = 0;
    let lastTime = performance.now();
    let avgFrameTime = 0;

    const monitorPerformance = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastTime;
      lastTime = currentTime;

      frameCount++;
      avgFrameTime = (avgFrameTime * (frameCount - 1) + frameTime) / frameCount;

      // Ajustement automatique si les performances se dégradent
      if (frameCount % 60 === 0) { // Vérifier toutes les 60 frames
        const currentFPS = 1000 / avgFrameTime;
        
        if (currentFPS < 30 && settings.mode !== 'low') {
          setSettings(prev => ({
            ...prev,
            mode: prev.mode === 'high' ? 'medium' : 'low',
            enableParticles: false,
            enableBlur: prev.mode === 'high'
          }));
        }
      }

      requestAnimationFrame(monitorPerformance);
    };

    requestAnimationFrame(monitorPerformance);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const updateSettings = (newSettings: Partial<PerformanceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <PerformanceContext.Provider value={{
      settings,
      updateSettings,
      isLowEnd,
      isMobile
    }}>
      {children}
    </PerformanceContext.Provider>
  );
};

// Composant d'indicateur de performance
export const PerformanceIndicator = () => {
  const { settings, updateSettings } = usePerformance();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Bouton principal - toujours visible */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full liquid-glass flex items-center justify-center text-lg transition-all duration-300 ${
            settings.mode === 'high' ? 'text-green-400 border-green-400/50' :
            settings.mode === 'medium' ? 'text-yellow-400 border-yellow-400/50' :
            'text-red-400 border-red-400/50'
          } border ${isOpen ? 'scale-110' : 'hover:scale-105'} backdrop-blur-lg shadow-lg`}
          title="Paramètres de performance"
        >
          {isMinimized ? (
            settings.mode === 'high' ? '🚀' : settings.mode === 'medium' ? '⚡' : '🐌'
          ) : '⚙️'}
        </button>

        {/* Badge de mode visible */}
        <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs flex items-center justify-center ${
          settings.mode === 'high' ? 'bg-green-500/80' :
          settings.mode === 'medium' ? 'bg-yellow-500/80' :
          'bg-red-500/80'
        } text-white font-bold shadow-lg`}>
          {settings.mode === 'high' ? 'H' : settings.mode === 'medium' ? 'M' : 'L'}
        </div>
      </div>

      {/* Panneau étendu */}
      {isOpen && (
        <>
          {/* Overlay pour fermer */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsOpen(false)}
          />

          {/* Panneau principal */}
          <div className="absolute bottom-16 right-0 w-80 liquid-glass rounded-lg overflow-hidden shadow-2xl border border-white/20 z-[9999] animate-fade-in-scale backdrop-blur-lg">
            {/* Header avec contrôles */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white">⚙️ Performances</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/60 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-white/10"
                  title={isMinimized ? "Développer" : "Réduire"}
                >
                  {isMinimized ? "+" : "−"}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-white/10"
                  title="Fermer"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Contenu du panneau */}
            <div className={`transition-all duration-300 overflow-hidden ${
              isMinimized ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
            }`}>
              <div className="p-4 space-y-4">
                {/* Mode de performance */}
                <div>
                  <label className="block text-xs text-white/80 mb-2">Mode de performance</label>
                  <select
                    value={settings.mode}
                    onChange={(e) => updateSettings({ mode: e.target.value as any })}
                    className="w-full p-2 text-xs bg-white/10 text-white rounded border border-white/20 focus:border-white/40 outline-none"
                  >
                    <option value="high">🚀 Haute performance</option>
                    <option value="medium">⚡ Performance moyenne</option>
                    <option value="low">🐌 Performance réduite</option>
                  </select>
                </div>

                {/* Toggles compacts */}
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80">Animations</span>
                    <button
                      onClick={() => updateSettings({ enableAnimations: !settings.enableAnimations })}
                      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                        settings.enableAnimations ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                        settings.enableAnimations ? 'left-6' : 'left-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80">Particules</span>
                    <button
                      onClick={() => updateSettings({ enableParticles: !settings.enableParticles })}
                      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                        settings.enableParticles ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                        settings.enableParticles ? 'left-6' : 'left-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80">Flou (Blur)</span>
                    <button
                      onClick={() => updateSettings({ enableBlur: !settings.enableBlur })}
                      className={`w-12 h-6 rounded-full transition-all duration-300 relative ${
                        settings.enableBlur ? 'bg-green-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                        settings.enableBlur ? 'left-6' : 'left-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* FPS Slider */}
                <div>
                  <label className="block text-xs text-white/80 mb-2">
                    FPS cible: {settings.frameRate}
                  </label>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="15"
                    value={settings.frameRate}
                    onChange={(e) => updateSettings({ frameRate: parseInt(e.target.value) })}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>15</span>
                    <span>30</span>
                    <span>60</span>
                  </div>
                </div>

                {/* Infos rapides */}
                <div className="pt-2 border-t border-white/10">
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                    <div>Mode: <span className="text-white">{settings.mode}</span></div>
                    <div>Mouvement: <span className="text-white">{settings.reducedMotion ? 'Réduit' : 'Normal'}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Hook pour contrôler les animations basé sur les performances
export const useAnimationControl = () => {
  const { settings } = usePerformance();

  const shouldAnimate = (animationType: 'basic' | 'complex' | 'particles') => {
    if (settings.reducedMotion) return false;
    
    switch (animationType) {
      case 'basic':
        return settings.enableAnimations;
      case 'complex':
        return settings.enableAnimations && settings.mode !== 'low';
      case 'particles':
        return settings.enableParticles && settings.mode === 'high';
      default:
        return false;
    }
  };

  const getAnimationDuration = (baseDuration: number) => {
    if (settings.reducedMotion) return 0;
    
    switch (settings.mode) {
      case 'low':
        return baseDuration * 0.5;
      case 'medium':
        return baseDuration * 0.8;
      case 'high':
      default:
        return baseDuration;
    }
  };

  return {
    shouldAnimate,
    getAnimationDuration,
    settings
  };
};
