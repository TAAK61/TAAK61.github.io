'use client';

import { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';

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

// Configuration des projets avec positions 3D PARFAITEMENT CENTRÉES
const projects3D: Project3D[] = [
  {
    id: 'liquid-glass-portfolio',
    title: 'Portfolio Liquid Glass',
    category: 'Web Development',
    description: 'Portfolio personnel avec effets Liquid Glass et intégration 3D',
    technologies: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind'],
    status: 'En cours',
    color: 'from-blue-500 to-purple-600',
    position: { x: -180, y: -100, z: 30 }, // Centré à gauche
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
    position: { x: 180, y: -100, z: -30 }, // Centré à droite
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
    position: { x: -90, y: 0, z: 20 }, // Centre gauche
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
    position: { x: 90, y: 0, z: -20 }, // Centre droit
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
    position: { x: 0, y: 100, z: 0 }, // Centre bas
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
      className={`
        absolute w-80 h-48 p-6 rounded-2xl cursor-pointer
        bg-gradient-to-br ${project.color} 
        backdrop-blur-sm border border-white/20
        shadow-lg hover:shadow-2xl
        ${performanceMode === 'low' ? '' : 'hover:border-white/40'}
      `}
      style={cardStyle}
      onMouseEnter={() => onHover(project.id)}
      onMouseLeave={() => onHover(null)}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{categoryIcon}</span>
        <span className={`
          px-2 py-1 text-xs rounded-full 
          ${project.status === 'Terminé' ? 'bg-green-500/20 text-green-300' :
            project.status === 'En cours' ? 'bg-blue-500/20 text-blue-300' :
            project.status === 'Prototype' ? 'bg-purple-500/20 text-purple-300' :
            'bg-gray-500/20 text-gray-300'}
        `}>
          {project.status}
        </span>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 leading-tight">
        {project.title}
      </h3>

      <p className="text-white/80 text-sm mb-3 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1">
        {project.technologies.slice(0, 3).map((tech, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-white/10 rounded-lg text-white/70"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 3 && (
          <span className="text-xs px-2 py-1 bg-white/10 rounded-lg text-white/70">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>
    </div>
  );
});

Project3DCard.displayName = 'Project3DCard';

// Composant principal optimisé
export function Portfolio3DGallery() {
  // Utilisation simplifiée des hooks de performance (sans dépendances complexes pour l'instant)
  const [performanceMode] = useState<'high' | 'medium' | 'low'>('high');
  const [isAnimationEnabled] = useState(true);

  const { hoveredProject, selectedProject, handleHover, handleSelect, handleClose } = useOptimizedInteractions();

  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer pour charger uniquement quand visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            console.log('Portfolio 3D Gallery loaded');
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Animation de rotation globale (désactivée en mode basse performance)
  const [globalRotation, setGlobalRotation] = useState(0);

  useEffect(() => {
    if (!isAnimationEnabled || performanceMode === 'low' || !isVisible) return;

    const interval = setInterval(() => {
      setGlobalRotation(prev => (prev + 0.5) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, [isAnimationEnabled, performanceMode, isVisible]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden perspective-1000 flex items-center justify-center"
      style={{
        transform: `rotateY(${globalRotation * 0.1}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Point de référence central invisible */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 transform -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: 'preserve-3d' }}>
        {isVisible && projects3D.map((project) => (
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

      {/* Modal de détail du projet */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="max-w-2xl w-full mx-4 p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/20">
            {(() => {
              const project = projects3D.find(p => p.id === selectedProject);
              if (!project) return null;
              
              return (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                    <button 
                      onClick={handleClose}
                      className="text-white/60 hover:text-white text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-white/80 text-lg leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">Technologies utilisées :</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all">
                        Voir le projet
                      </button>
                      <button className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-all">
                        Code source
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
