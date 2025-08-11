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

// Configuration des projets avec positions 3D optimisées
const projects3D: Project3D[] = [
  {
    id: 'liquid-glass-portfolio',
    title: 'Portfolio Liquid Glass',
    category: 'Web Development',
    description: 'Portfolio personnel avec effets Liquid Glass et intégration 3D',
    technologies: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind'],
    status: 'En cours',
    color: 'from-blue-500 to-purple-600',
    position: { x: -180, y: -100, z: 30 },
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
    position: { x: 180, y: -100, z: -30 },
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
    position: { x: -90, y: 0, z: 20 },
    rotation: { x: 10, y: 20, z: 5 }
  },
  {
    id: 'defi-platform',
    title: 'DeFi Platform',
    category: 'Blockchain',
    description: 'Plateforme décentralisée de finance participative',
    technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
    status: 'Concept',
    color: 'from-indigo-500 to-blue-600',
    position: { x: 0, y: 100, z: 0 },
    rotation: { x: 0, y: 0, z: 8 }
  },
  {
    id: 'metaverse-platform',
    title: 'Metaverse Platform',
    category: 'Web3',
    description: 'Plateforme metaverse pour collaboration en entreprise',
    technologies: ['WebXR', 'Blockchain', 'Three.js', 'AI'],
    status: 'Concept',
    color: 'from-green-500 to-teal-600',
    position: { x: 90, y: 0, z: -20 },
    rotation: { x: -10, y: -20, z: -5 }
  },
  {
    id: 'nft-marketplace',
    title: 'NFT Marketplace',
    category: 'Blockchain',
    description: 'Marketplace décentralisée pour les NFT artistiques',
    technologies: ['Solidity', 'React', 'IPFS', 'Web3'],
    status: 'Live',
    color: 'from-pink-500 to-red-600',
    position: { x: 0, y: -120, z: 10 },
    rotation: { x: -15, y: 0, z: 0 }
  }
];

// Composant Project Card 3D optimisé
const ProjectCard3D = memo(({ project, isHovered, onHover, onLeave }: {
  project: Project3D;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const cardStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: `calc(50% + ${project.position.x}px)`,
    top: `calc(50% + ${project.position.y}px)`,
    transform: `
      translate(-50%, -50%) 
      rotateX(${project.rotation.x}deg) 
      rotateY(${project.rotation.y}deg) 
      rotateZ(${project.rotation.z}deg)
      scale(${isHovered ? 1.1 : 1})
      translateZ(${project.position.z}px)
    `,
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    transformStyle: 'preserve-3d' as const,
    perspective: '1000px',
    zIndex: isHovered ? 20 : 10
  }), [project, isHovered]);

  return (
    <div
      style={cardStyle}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="w-64 h-40 cursor-pointer"
    >
      <div
        className={`
          w-full h-full rounded-2xl p-4
          bg-gradient-to-br ${project.color}
          shadow-2xl border border-white/20
          backdrop-blur-sm
          ${isHovered ? 'shadow-3xl' : ''}
        `}
        style={{
          background: isHovered
            ? `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(135deg, var(--tw-gradient-stops))`
            : undefined,
          boxShadow: isHovered
            ? '0 25px 50px rgba(0,0,0,0.3), 0 0 50px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.3)'
            : '0 15px 30px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
      >
        <div className="text-white">
          <h3 className="font-bold text-sm mb-1 truncate">{project.title}</h3>
          <p className="text-xs opacity-90 mb-2">{project.category}</p>
          <p className="text-xs opacity-75 mb-2 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {project.description}
          </p>
          <div className="flex justify-between items-center">
            <span className={`
              text-xs px-2 py-1 rounded-full
              ${project.status === 'Live' ? 'bg-green-500/30 text-green-200' :
                project.status === 'En cours' ? 'bg-blue-500/30 text-blue-200' :
                project.status === 'Terminé' ? 'bg-purple-500/30 text-purple-200' :
                'bg-orange-500/30 text-orange-200'}
            `}>
              {project.status}
            </span>
            <div className="text-xs opacity-75">
              {project.technologies.slice(0, 2).join(', ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard3D.displayName = 'ProjectCard3D';

// Composant principal Portfolio3DGallery
const Portfolio3DGallery = memo(() => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation d'entrée
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handlers optimisés
  const handleProjectHover = useCallback((projectId: string) => {
    setHoveredProject(projectId);
  }, []);

  const handleProjectLeave = useCallback(() => {
    setHoveredProject(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Background animé */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(255,255,255,0.05) 100%)
          `
        }}
      />

      {/* Grille de points en perspective */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(800px) rotateX(60deg) translateZ(-100px)'
        }}
      />

      {/* Conteneur 3D des projets */}
      <div
        className={`
          relative w-full h-full transition-all duration-1000
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)'
        }}
      >
        {projects3D.map((project) => (
          <ProjectCard3D
            key={project.id}
            project={project}
            isHovered={hoveredProject === project.id}
            onHover={() => handleProjectHover(project.id)}
            onLeave={handleProjectLeave}
          />
        ))}
      </div>

      {/* Info overlay */}
      {hoveredProject && (
        <div className="absolute bottom-4 left-4 right-4 z-30">
          <div
            className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white animate-fade-in"
          >
            {(() => {
              const project = projects3D.find(p => p.id === hoveredProject);
              return project ? (
                <div>
                  <h4 className="font-bold mb-1">{project.title}</h4>
                  <p className="text-sm opacity-80 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-white/20 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* Instructions d'utilisation */}
      <div className="absolute top-4 left-4 text-white/60 text-sm">
        🖱️ Survolez les cartes pour les explorer
      </div>

      {/* Compteur de projets */}
      <div className="absolute top-4 right-4 text-white/60 text-sm">
        {projects3D.length} projets
      </div>
    </div>
  );
});

Portfolio3DGallery.displayName = 'Portfolio3DGallery';

export default Portfolio3DGallery;
