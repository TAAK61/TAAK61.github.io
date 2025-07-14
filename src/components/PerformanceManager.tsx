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

// Hook pour contrôler les animations
export const useAnimationControl = () => {
  const { settings } = usePerformance();

  const shouldAnimate = (type: 'basic' | 'complex' | 'particles') => {
    if (!settings.enableAnimations) return false;
    if (settings.reducedMotion) return false;

    switch (type) {
      case 'basic':
        return true;
      case 'complex':
        return settings.mode !== 'low';
      case 'particles':
        return settings.enableParticles && settings.mode === 'high';
      default:
        return false;
    }
  };

  return { shouldAnimate };
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

// Détection mobile
const detectMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Provider de performance
export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
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
    setIsClient(true);

    // Détecter les performances du dispositif
    const detectedMode = detectDevicePerformance();
    const detectedMobile = detectMobile();
    const detectedLowEnd = detectedMode === 'low';

    // Détecter si l'utilisateur préfère les animations réduites
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setIsMobile(detectedMobile);
    setIsLowEnd(detectedLowEnd);

    // Configuration automatique basée sur la détection
    setSettings(prev => ({
      ...prev,
      mode: detectedMode,
      reducedMotion: prefersReducedMotion,
      enableAnimations: !prefersReducedMotion,
      enableParticles: detectedMode === 'high' && !detectedMobile,
      enableBlur: detectedMode !== 'low',
      frameRate: detectedMode === 'high' ? 60 : detectedMode === 'medium' ? 30 : 24
    }));

    // Écouter les changements de préférences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSettings(prev => ({
        ...prev,
        reducedMotion: e.matches,
        enableAnimations: !e.matches
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updateSettings = (newSettings: Partial<PerformanceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Ne pas rendre le provider côté serveur
  if (!isClient) {
    return <>{children}</>;
  }

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

// Composant d'indicateur de performance (optionnel)
export const PerformanceIndicator = () => {
  const { settings, isLowEnd, isMobile } = usePerformance();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '12px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <div>Mode: {settings.mode}</div>
      <div>Mobile: {isMobile ? 'Yes' : 'No'}</div>
      <div>Low-end: {isLowEnd ? 'Yes' : 'No'}</div>
      <div>Animations: {settings.enableAnimations ? 'On' : 'Off'}</div>
      <div>Particles: {settings.enableParticles ? 'On' : 'Off'}</div>
    </div>
  );
};
