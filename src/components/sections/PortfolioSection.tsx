'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Import dynamique du composant Portfolio3DGallery pour éviter les erreurs SSR
const Portfolio3DGallery = dynamic(() => import('../three/Portfolio3DGallery').then(mod => ({ default: mod.Portfolio3DGallery })), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl animate-pulse flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <span className="text-white/60">Chargement de la galerie 3D...</span>
      </div>
    </div>
  )
});

export function PortfolioSection() {
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  return (
    <section className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Arrière-plan cohérent */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>

      <div className="container-responsive relative z-10">
        {/* Header de section unifié */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-2xl">💼</span>
            </div>
            <h2 className="text-title bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent font-bold">
              Portfolio
            </h2>
          </div>

          <p className="text-subtitle text-white/80 max-w-3xl mx-auto leading-relaxed">
            Découvrez mes créations et projets innovants à travers une expérience 3D immersive,
            alliant technologie et créativité pour repousser les limites du possible.
          </p>

          {/* Sélecteur de vue cohérent */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setViewMode('3d')}
              className={`liquid-glass px-6 py-3 rounded-xl transition-all duration-300 ${
                viewMode === '3d' 
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-lg shadow-blue-500/20' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-2">🎮</span>
              Vue 3D Interactive
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`liquid-glass px-6 py-3 rounded-xl transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-500/20' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-2">📋</span>
              Vue Grille
            </button>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="relative">
          {viewMode === '3d' ? (
            <div className="relative">
              <Portfolio3DGallery />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Grille de projets en fallback */}
              {[
                {
                  title: 'Portfolio Liquid Glass',
                  category: 'Web Development',
                  description: 'Portfolio personnel avec effets Liquid Glass et intégration 3D',
                  technologies: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind'],
                  status: 'En cours',
                  icon: '🌐'
                },
                {
                  title: 'Crypto Tracker',
                  category: 'Blockchain',
                  description: 'Application de suivi des cryptomonnaies en temps réel',
                  technologies: ['React', 'Node.js', 'WebSocket', 'Chart.js'],
                  status: 'Terminé',
                  icon: '₿'
                },
                {
                  title: 'AR Experience',
                  category: 'VR/AR',
                  description: 'Expérience de réalité augmentée pour l\'éducation',
                  technologies: ['Unity', 'ARCore', 'C#', 'Blender'],
                  status: 'Prototype',
                  icon: '🥽'
                },
                {
                  title: 'AI Assistant',
                  category: 'Intelligence Artificielle',
                  description: 'Assistant virtuel intelligent avec NLP avancé',
                  technologies: ['Python', 'TensorFlow', 'OpenAI', 'FastAPI'],
                  status: 'En développement',
                  icon: '🤖'
                },
                {
                  title: 'DeFi Platform',
                  category: 'Blockchain',
                  description: 'Plateforme décentralisée de finance participative',
                  technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
                  status: 'Concept',
                  icon: '💎'
                }
              ].map((project, index) => (
                <div key={index} className="liquid-glass p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{project.icon}</div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      project.status === 'Terminé' ? 'bg-green-500/20 text-green-300' :
                      project.status === 'En cours' ? 'bg-blue-500/20 text-blue-300' :
                      project.status === 'En développement' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-purple-500/20 text-purple-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs px-2 py-1 bg-white/10 text-white/90 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Boutons d'action pour la vue grille */}
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                      Voir le projet
                    </button>
                    <button className="flex-1 px-4 py-2 border border-white/20 text-white text-sm rounded-lg hover:bg-white/5 transition-all">
                      Code source
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistiques de portfolio */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: '5+', label: 'Projets Actifs', icon: '🚀' },
            { number: '3+', label: 'Technologies', icon: '⚡' },
            { number: '100%', label: 'Open Source', icon: '🌟' },
            { number: '24/7', label: 'Innovation', icon: '💡' }
          ].map((stat, index) => (
            <div key={index} className="liquid-glass p-4 text-center group hover:bg-white/5 transition-all duration-300">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Effets visuels d'arrière-plan */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-3/4 right-20 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40 delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-80 delay-500"></div>

      {/* Instructions d'interaction pour la vue 3D */}
      {viewMode === '3d' && (
        <div className="mt-12 text-center">
          <div className="liquid-glass p-6 max-w-2xl mx-auto">
            <h3 className="text-white font-semibold mb-4">🎮 Comment interagir</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span>🖱️</span>
                <span>Survolez pour agrandir</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👆</span>
                <span>Cliquez pour les détails</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🎤</span>
                <span>Utilisez les commandes vocales</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
