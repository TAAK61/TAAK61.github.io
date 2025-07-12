'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { usePerformance, useAnimationControl } from '../PerformanceManager';

// Types pour les projets 3D
interface Project3D {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: string;
  color: string;
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

// Configuration des projets avec positions 3D OPTIMISÉES
const projects3D: Project3D[] = [
  {
    id: 'liquid-glass-portfolio',
    title: 'Portfolio Liquid Glass',
    category: 'Web Development',
    description: 'Portfolio personnel avec effets Liquid Glass et intégration 3D',
    technologies: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind'],
    status: 'En cours',
    color: 'from-blue-500 to-purple-600',
    position: { x: -200, y: 0, z: 50 },
    rotation: { x: 5, y: 15, z: 2 }
  },
  {
    id: 'crypto-tracker',
    title: 'Crypto Tracker',
    category: 'Blockchain',
    description: 'Application de suivi des cryptomonnaies en temps réel',
    technologies: ['React', 'Node.js', 'WebSocket', 'Chart.js'],
    status: 'Terminé',
    color: 'from-yellow-500 to-orange-600',
    position: { x: 200, y: 0, z: -50 },
    rotation: { x: -5, y: -15, z: -2 }
  },
  {
    id: 'ar-experience',
    title: 'AR Experience',
    category: 'VR/AR',
    description: 'Expérience de réalité augmentée pour l\'éducation',
    technologies: ['Unity', 'ARCore', 'C#', 'Blender'],
    status: 'Prototype',
    color: 'from-purple-500 to-pink-600',
    position: { x: -100, y: -120, z: 0 },
    rotation: { x: 10, y: 20, z: 5 }
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    category: 'Intelligence Artificielle',
    description: 'Assistant virtuel intelligent avec NLP avancé',
    technologies: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
    status: 'En développement',
    color: 'from-green-500 to-teal-600',
    position: { x: 100, y: -120, z: 20 },
    rotation: { x: -10, y: -20, z: -5 }
  },
  {
    id: 'defi-platform',
    title: 'DeFi Platform',
    category: 'Blockchain',
    description: 'Plateforme décentralisée de finance participative',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    status: 'Concept',
    color: 'from-indigo-500 to-blue-600',
    position: { x: 0, y: 150, z: -30 },
    rotation: { x: 0, y: 0, z: 8 }
  }
];

// Hook optimisé pour les interactions
const useOptimizedInteractions = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const lastInteraction = useRef(0);

  // Debouncing pour les interactions de survol
  const handleHover = useCallback((projectId: string | null) => {
    const now = Date.now();
    if (now - lastInteraction.current > 50) { // 50ms de debounce
      setHoveredProject(projectId);
      lastInteraction.current = now;
    }
  }, []);

  const handleSelect = useCallback((projectId: string) => {
    setSelectedProject(projectId);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return { hoveredProject, selectedProject, handleHover, handleSelect, handleClose };
};

// Composant de carte 3D ultra-optimisé
const Project3DCard = memo(({
  project,
  isHovered,
  onHover,
  onClick,
  performanceMode
}: {
  project: Project3D;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: () => void;
  performanceMode: 'high' | 'medium' | 'low';
}) => {
  // Calculs de style mémorisés
  const cardTransform = useMemo(() => {
    const scale = isHovered && performanceMode !== 'low' ? 1.05 : 1;
    const rotationMultiplier = performanceMode === 'low' ? 0.5 : 1;

    return `
      translate3d(${project.position.x}px, ${project.position.y}px, ${project.position.z}px)
      rotateX(${project.rotation.x * rotationMultiplier}deg)
      rotateY(${project.rotation.y * rotationMultiplier}deg)
      rotateZ(${project.rotation.z * rotationMultiplier}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `;
  }, [project, isHovered, performanceMode]);

  const cardStyle = useMemo(() => ({
    transform: cardTransform,
    transition: performanceMode === 'low' ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: isHovered ? 'transform' : 'auto',
    backfaceVisibility: 'hidden' as const,
  }), [cardTransform, isHovered, performanceMode]);

  // Icône de catégorie mémorisée
  const categoryIcon = useMemo(() => {
    const icons = {
      'Web Development': '🌐',
      'Blockchain': '₿',
      'VR/AR': '🥽',
      'Intelligence Artificielle': '🤖',
      'IoT': '📡'
    };
    return icons[project.category as keyof typeof icons] || '💼';
  }, [project.category]);

  return (
    <div
      className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      style={cardStyle}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <div className="liquid-glass w-72 h-48 p-5 cursor-pointer group hover:shadow-2xl transition-shadow duration-300">
        {/* Header compact */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl">{categoryIcon}</div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            project.status === 'Terminé' ? 'bg-green-500/20 text-green-300' :
            project.status === 'En cours' ? 'bg-blue-500/20 text-blue-300' :
            project.status === 'En développement' ? 'bg-yellow-500/20 text-yellow-300' :
            'bg-purple-500/20 text-purple-300'
          }`}>
            {project.status}
          </span>
        </div>

        {/* Contenu principal */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{project.title}</h3>
        <p className="text-sm text-white/80 mb-3 line-clamp-2">{project.description}</p>

        {/* Technologies (compact) */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 2).map((tech, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-white/10 text-white/90 rounded">
              {tech}
            </span>
          ))}
          {project.technologies.length > 2 && (
            <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded">
              +{project.technologies.length - 2}
            </span>
          )}
        </div>

        {/* Effet de brillance optimisé */}
        {isHovered && performanceMode !== 'low' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl animate-pulse pointer-events-none" />
        )}
      </div>
    </div>
  );
});

Project3DCard.displayName = 'Project3DCard';

// Composant principal de la galerie 3D - ULTRA OPTIMISÉ
export default function Portfolio3DGallery() {
  const { hoveredProject, selectedProject, handleHover, handleSelect, handleClose } = useOptimizedInteractions();
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();

  const { settings, isMobile } = usePerformance();
  const { shouldAnimate } = useAnimationControl();

  // Mode de performance adaptatif
  const performanceMode = useMemo(() => {
    return settings.mode;
  }, [settings.mode]);

  // Auto-rotation optimisée avec RAF
  useEffect(() => {
    if (!autoRotate || performanceMode === 'low') {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      return;
    }

    let lastTime = 0;
    const rotationSpeed = performanceMode === 'medium' ? 0.2 : 0.5;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= 50) { // 20 FPS max
        setRotationY(prev => (prev + rotationSpeed) % 360);
        lastTime = currentTime;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [autoRotate, performanceMode]);

  // Gestion des touches
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'r':
        case 'R':
          setAutoRotate(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleClose]);

  // Style du container 3D
  const containerStyle = useMemo(() => ({
    transform: `rotateY(${rotationY}deg)`,
    transformStyle: 'preserve-3d' as const,
    transition: autoRotate ? 'none' : 'transform 0.5s ease-out',
  }), [rotationY, autoRotate]);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-gray-900/30 to-black/30 rounded-2xl">
      {/* Instructions compactes */}
      <div className="absolute top-4 left-4 z-20 liquid-glass p-3 text-sm">
        <p className="text-white/80 mb-2">🎮 <strong>Galerie 3D Interactive</strong></p>
        <p className="text-xs text-white/60 mb-2">Survolez les projets • R: rotation • Échap: fermer</p>
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            autoRotate ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
          }`}
          disabled={performanceMode === 'low'}
        >
          {autoRotate ? '⚡ Auto-rotation ON' : '⏸️ Auto-rotation OFF'}
        </button>
      </div>

      {/* Compteur de projets */}
      <div className="absolute top-4 right-4 z-20 liquid-glass p-3 text-center">
        <p className="text-sm text-white/80 font-semibold">{projects3D.length}</p>
        <p className="text-xs text-white/60">Projets</p>
      </div>

      {/* Container 3D avec perspective */}
      <div
        className="relative w-full h-full"
        style={{
          perspective: isMobile ? '800px' : '1200px',
          perspectiveOrigin: 'center center'
        }}
      >
        <div
          ref={containerRef}
          className="relative w-full h-full"
          style={containerStyle}
        >
          {/* Rendu des cartes 3D */}
          {projects3D.map((project) => (
            <Project3DCard
              key={project.id}
              project={project}
              isHovered={hoveredProject === project.id}
              onHover={handleHover}
              onClick={() => handleSelect(project.id)}
              performanceMode={performanceMode}
            />
          ))}
        </div>
      </div>

      {/* Modal de détail optimisé */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="liquid-glass max-w-2xl w-full p-6 animate-fade-in-scale">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
            
            {(() => {
              const project = projects3D.find(p => p.id === selectedProject);
              if (!project) return null;
              
              return (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-white/90 mb-6">{project.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">📋 Détails</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Catégorie:</span>
                          <span className="text-white">{project.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Statut:</span>
                          <span className={
                            project.status === 'Terminé' ? 'text-green-400' :
                            project.status === 'En cours' ? 'text-blue-400' :
                            project.status === 'En développement' ? 'text-yellow-400' :
                            'text-purple-400'
                          }>
                            {project.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">🛠️ Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
