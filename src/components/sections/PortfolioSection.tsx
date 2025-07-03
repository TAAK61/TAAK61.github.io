'use client';

import { useState, useRef } from 'react';

const portfolioCategories = [
  {
    id: 'web-mobile',
    title: 'Web & Mobile',
    projects: [
      {
        id: 'portfolio-liquid',
        title: 'Portfolio Liquid Glass',
        description: 'Portfolio révolutionnaire avec effets Liquid Glass et Three.js',
        tech: ['Next.js', 'Three.js', 'TypeScript', 'WebXR'],
        status: 'En cours',
        image: '/projects/portfolio-liquid.jpg'
      },
      {
        id: 'crypto-tracker',
        title: 'Crypto Tracker DeFi',
        description: 'Application de suivi portfolio crypto avec intégration DeFi',
        tech: ['React', 'Web3.js', 'Node.js', 'MongoDB'],
        status: 'Terminé',
        image: '/projects/crypto-tracker.jpg'
      },
      {
        id: 'ar-showcase',
        title: 'AR Product Showcase',
        description: 'Vitrine produits en réalité augmentée pour e-commerce',
        tech: ['WebXR', 'Three.js', 'AR.js', 'Progressive Web App'],
        status: 'Concept',
        image: '/projects/ar-showcase.jpg'
      }
    ]
  },
  {
    id: 'blockchain',
    title: 'Blockchain & Crypto',
    projects: [
      {
        id: 'defi-protocol',
        title: 'DeFi Lending Protocol',
        description: 'Protocole de prêt décentralisé avec yield farming',
        tech: ['Solidity', 'Hardhat', 'React', 'Web3.js'],
        status: 'Terminé',
        image: '/projects/defi-protocol.jpg'
      },
      {
        id: 'nft-marketplace',
        title: 'NFT Marketplace',
        description: 'Marketplace NFT avec enchères et royalties automatiques',
        tech: ['Solidity', 'IPFS', 'Next.js', 'OpenSea API'],
        status: 'En cours',
        image: '/projects/nft-marketplace.jpg'
      },
      {
        id: 'dao-governance',
        title: 'DAO Governance Platform',
        description: 'Plateforme de gouvernance décentralisée avec vote token',
        tech: ['Solidity', 'Snapshot', 'TypeScript', 'GraphQL'],
        status: 'Concept',
        image: '/projects/dao-governance.jpg'
      }
    ]
  },
  {
    id: 'emerging-tech',
    title: 'Technologies émergentes',
    projects: [
      {
        id: 'vr-training',
        title: 'VR Training Platform',
        description: 'Plateforme de formation professionnelle en réalité virtuelle',
        tech: ['Unity', 'C#', 'Oculus SDK', 'WebXR'],
        status: 'Terminé',
        image: '/projects/vr-training.jpg'
      },
      {
        id: 'ai-chatbot',
        title: 'AI Business Chatbot',
        description: 'Chatbot IA spécialisé pour conseil business et stratégie',
        tech: ['Python', 'TensorFlow', 'OpenAI API', 'FastAPI'],
        status: 'En cours',
        image: '/projects/ai-chatbot.jpg'
      },
      {
        id: 'iot-dashboard',
        title: 'IoT Analytics Dashboard',
        description: 'Dashboard temps réel pour monitoring objets connectés',
        tech: ['React', 'D3.js', 'Node.js', 'InfluxDB'],
        status: 'Concept',
        image: '/projects/iot-dashboard.jpg'
      }
    ]
  }
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('web-mobile');
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé': return 'text-green-400 bg-green-400/20';
      case 'En cours': return 'text-blue-400 bg-blue-400/20';
      case 'Concept': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <section id="portfolio" className="section-fullscreen bg-gradient-to-b from-black to-gray-900 relative">
      {/* Canvas 3D pour le background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{ zIndex: 1 }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-title font-bold text-white mb-4">
            Portfolio
          </h2>
          <p className="text-subtitle text-white/70 max-w-2xl mx-auto">
            Découvrez mes projets réalisés et concepts innovants
          </p>
        </div>

        {/* Sélecteur de catégorie */}
        <div className="flex justify-center mb-12">
          <div className="glass-morphism p-2 rounded-2xl">
            <div className="flex space-x-2">
              {portfolioCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioCategories
            .find(cat => cat.id === activeCategory)
            ?.projects.map((project) => (
              <div
                key={project.id}
                className="morphing-card liquid-glass p-6 cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image du projet */}
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50">🚀</div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Informations du projet */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-white/70 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 glass-button px-4 py-2 text-sm text-white">
                    Voir détails
                  </button>
                  {project.status === 'Terminé' && (
                    <button className="glass-button px-4 py-2 text-sm text-white">
                      🔗 Demo
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="liquid-glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Prêt à collaborer ?
            </h3>
            <p className="text-white/70 mb-6">
              Discutons de votre projet et créons ensemble quelque chose d'exceptionnel
            </p>
            <button className="glass-button px-8 py-4 text-white font-medium">
              Démarrer une collaboration
            </button>
          </div>
        </div>
      </div>

      {/* Particules flottantes */}
      <div className="absolute top-20 left-20 floating-particles animate-float" />
      <div className="absolute top-60 right-32 floating-particles animate-float-delayed" />
      <div className="absolute bottom-40 left-32 floating-particles animate-float" />
      <div className="absolute bottom-20 right-20 floating-particles animate-float-delayed" />
    </section>
  );
}
