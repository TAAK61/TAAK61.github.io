'use client';

import { useState, useEffect, useRef } from 'react';
import { usePerformance } from './PerformanceManager';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  interactionDelay: number;
  animationQuality: string;
  deviceScore: number;
}

export const PerformanceTestSuite = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const { settings, isLowEnd, isMobile } = usePerformance();
  const dragRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    interactionDelay: 0,
    animationQuality: 'unknown',
    deviceScore: 0
  });

  // Test de performance FPS
  const measureFPS = () => {
    return new Promise<number>((resolve) => {
      let frames = 0;
      const startTime = performance.now();
      
      const countFrames = () => {
        frames++;
        if (performance.now() - startTime < 1000) {
          requestAnimationFrame(countFrames);
        } else {
          resolve(frames);
        }
      };
      
      requestAnimationFrame(countFrames);
    });
  };

  // Test de mémoire
  const measureMemory = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      };
    }
    return { used: 0, total: 0 };
  };

  // Test de temps de rendu
  const measureRenderTime = () => {
    return new Promise<number>((resolve) => {
      const start = performance.now();
      
      // Simulation d'une opération de rendu complexe
      requestAnimationFrame(() => {
        const element = document.createElement('div');
        element.innerHTML = Array(1000).fill('<span>Test</span>').join('');
        element.style.transform = 'rotate(45deg) scale(1.2)';
        document.body.appendChild(element);
        
        requestAnimationFrame(() => {
          const end = performance.now();
          document.body.removeChild(element);
          resolve(end - start);
        });
      });
    });
  };

  // Test de délai d'interaction
  const measureInteractionDelay = () => {
    return new Promise<number>((resolve) => {
      const start = performance.now();
      
      const button = document.createElement('button');
      button.textContent = 'Test';
      button.style.position = 'absolute';
      button.style.left = '-9999px';
      document.body.appendChild(button);
      
      button.addEventListener('click', () => {
        const end = performance.now();
        document.body.removeChild(button);
        resolve(end - start);
      });
      
      // Simulation d'un clic
      setTimeout(() => {
        button.click();
      }, 10);
    });
  };

  // Évaluation de la qualité d'animation
  const evaluateAnimationQuality = () => {
    if (settings.mode === 'high' && settings.enableAnimations && settings.enableParticles) {
      return 'Excellente';
    } else if (settings.mode === 'medium' && settings.enableAnimations) {
      return 'Bonne';
    } else if (settings.mode === 'low' && !settings.enableAnimations) {
      return 'Reduite';
    } else {
      return 'Adaptative';
    }
  };

  // Score global du dispositif
  const calculateDeviceScore = (fps: number, memory: number, renderTime: number) => {
    let score = 0;
    
    // Score FPS (40%)
    if (fps >= 55) score += 40;
    else if (fps >= 30) score += 30;
    else if (fps >= 15) score += 20;
    else score += 10;
    
    // Score mémoire (30%)
    if (memory < 50) score += 30;
    else if (memory < 100) score += 25;
    else if (memory < 200) score += 20;
    else score += 10;
    
    // Score temps de rendu (30%)
    if (renderTime < 5) score += 30;
    else if (renderTime < 10) score += 25;
    else if (renderTime < 20) score += 20;
    else score += 10;
    
    return score;
  };

  // Exécution de la suite de tests
  const runPerformanceTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    const results: string[] = [];
    
    try {
      results.push('Demarrage des tests de performance...');

      // Test FPS
      results.push('Test FPS en cours...');
      const fps = await measureFPS();
      results.push(`FPS: ${fps} images/seconde`);

      // Test mémoire
      results.push('Test memoire en cours...');
      const memory = measureMemory();
      results.push(`Memoire: ${memory.used}MB utilises / ${memory.total}MB total`);

      // Test temps de rendu
      results.push('Test temps de rendu...');
      const renderTime = await measureRenderTime();
      results.push(`Temps de rendu: ${renderTime.toFixed(2)}ms`);

      // Test délai d'interaction
      results.push('Test delai interaction...');
      const interactionDelay = await measureInteractionDelay();
      results.push(`Delai interaction: ${interactionDelay.toFixed(2)}ms`);

      // Évaluation qualité
      const animationQuality = evaluateAnimationQuality();
      results.push(`Qualite animation: ${animationQuality}`);

      // Score global
      const deviceScore = calculateDeviceScore(fps, memory.used, renderTime);
      results.push(`Score global: ${deviceScore}/100`);

      // Mise à jour des métriques
      const newMetrics: PerformanceMetrics = {
        fps,
        memoryUsage: memory.used,
        renderTime,
        interactionDelay,
        animationQuality,
        deviceScore
      };
      
      setMetrics(newMetrics);
      metricsRef.current = newMetrics;
      
      results.push('Tests termines avec succes !');

    } catch (error) {
      results.push(`Erreur lors des tests: ${error}`);
    }
    
    setTestResults(results);
    setIsRunning(false);
  };

  // Tests automatiques au montage
  useEffect(() => {
    const runAutoTests = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Attendre le chargement
      await runPerformanceTests();
    };
    
    runAutoTests();
  }, []);

  // Si pas visible, ne rien afficher
  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-6 z-[10000]" style={{ zIndex: 10000 }}>
      {/* Bouton principal - toujours visible */}
      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-12 h-12 rounded-full liquid-glass flex items-center justify-center text-sm transition-all duration-300 shadow-lg ${
            isRunning 
              ? 'bg-orange-500/20 text-orange-400 border-orange-400/50 animate-pulse' 
              : 'bg-purple-500/20 text-purple-400 border-purple-400/50 hover:scale-105'
          } border backdrop-blur-lg`}
          title="Tests de performance"
        >
          {isRunning ? '⚡' : '🧪'}
        </button>

        {/* Badge d'état */}
        <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold shadow-lg ${
          isRunning ? 'bg-orange-500 text-white' : 'bg-gray-500 text-white'
        }`}>
          {isRunning ? '⚡' : '📊'}
        </div>
      </div>

      {/* Panneau étendu */}
      {isExpanded && (
        <>
          {/* Overlay pour fermer */}
          <div
            className="fixed inset-0"
            style={{ zIndex: 9999 }}
            onClick={() => setIsExpanded(false)}
          />

          {/* Panneau principal */}
          <div className="absolute bottom-16 right-0 w-96 liquid-glass rounded-lg overflow-hidden shadow-2xl border border-white/20 backdrop-blur-lg" style={{ zIndex: 10001 }}>
            {/* Header avec contrôles */}
            <div className="flex items-center justify-between p-3 border-b border-white/10 bg-white/5">
              <h3 className="text-sm font-semibold text-white">🧪 Tests de Performance</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/60 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-white/10"
                  title={isMinimized ? "Développer" : "Réduire"}
                >
                  {isMinimized ? "+" : "−"}
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white/60 hover:text-white transition-colors text-sm px-2 py-1 rounded hover:bg-white/10"
                  title="Réduire"
                >
                  ◐
                </button>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-white/60 hover:text-red-400 transition-colors text-sm px-2 py-1 rounded hover:bg-red-500/10"
                  title="Fermer complètement"
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
                {/* Bouton de test principal */}
                <div className="text-center">
                  <button
                    onClick={runPerformanceTests}
                    disabled={isRunning}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                      isRunning
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 cursor-not-allowed'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/50 hover:bg-purple-500/30'
                    }`}
                  >
                    {isRunning ? '⚡ Tests en cours...' : '🚀 Lancer les tests'}
                  </button>
                </div>

                {/* Résultats des tests */}
                {testResults.length > 0 && (
                  <div className="bg-white/5 rounded-lg p-3 max-h-48 overflow-y-auto">
                    <div className="text-xs text-white/60 mb-2">Résultats des tests :</div>
                    <div className="space-y-1">
                      {testResults.map((result, index) => (
                        <div key={index} className="text-xs text-white/80">
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Métriques actuelles */}
                {metrics && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 rounded p-2">
                      <div className="text-white/60">FPS</div>
                      <div className="text-white font-semibold">{metrics.fps}</div>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <div className="text-white/60">Mémoire</div>
                      <div className="text-white font-semibold">{metrics.memoryUsage}MB</div>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <div className="text-white/60">Rendu</div>
                      <div className="text-white font-semibold">{metrics.renderTime.toFixed(1)}ms</div>
                    </div>
                    <div className="bg-white/5 rounded p-2">
                      <div className="text-white/60">Score</div>
                      <div className="text-white font-semibold">{metrics.deviceScore}/100</div>
                    </div>
                  </div>
                )}

                {/* Actions rapides */}
                <div className="pt-2 border-t border-white/10">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTestResults([])}
                      className="flex-1 py-2 px-3 text-xs bg-white/5 text-white/70 rounded hover:bg-white/10 transition-colors"
                    >
                      Effacer
                    </button>
                    <button
                      onClick={() => console.log('Export metrics:', metrics)}
                      className="flex-1 py-2 px-3 text-xs bg-white/5 text-white/70 rounded hover:bg-white/10 transition-colors"
                    >
                      Exporter
                    </button>
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
