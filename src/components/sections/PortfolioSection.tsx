'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import dynamique de la galerie 3D avec typage correct
const Portfolio3DGallery = dynamic(
  () => import('../three/Portfolio3DGallery').then((mod) => ({ default: mod.default })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white/60 text-center">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-2"></div>
          <p>Chargement de la galerie 3D...</p>
        </div>
      </div>
    )
  }
);

// 3 projets par catégorie selon le cahier des charges
const portfolioData = [
  // Projets Réalisés
  {
    id: 'liquid-portfolio',
    title: 'Portfolio Liquid Glass',
    category: 'Réalisé',
    type: 'Web Immersif',
    description: 'Portfolio révolutionnaire avec effets Liquid Glass, distorsion temps réel et navigation 3D',
    technologies: ['Next.js', 'Three.js', 'Liquid Glass CSS', 'WebXR', 'Framer Motion'],
    status: 'Live',
    year: '2024',
    isVREnabled: true,
    isNFT: false,
    cryptoIntegration: false
  },
  {
    id: 'defi-tracker',
    title: 'DeFi Portfolio Tracker',
    category: 'Réalisé',
    type: 'Blockchain/DeFi',
    description: 'Tracking temps réel de portefeuille DeFi avec analyse multi-chaînes et yield farming',
    technologies: ['React', 'Web3.js', 'Ethereum', 'Polygon', 'Chart.js'],
    status: 'Live',
    year: '2024',
    isVREnabled: false,
    isNFT: false,
    cryptoIntegration: true
  },
  {
    id: 'vr-showroom',
    title: 'VR Immersive Showroom',
    category: 'Réalisé',
    type: 'VR/AR',
    description: 'Showroom virtuel immersif pour présentation produits avec interactions naturelles',
    technologies: ['WebXR', 'Three.js', 'A-Frame', 'Spatial Audio', 'Unity'],
    status: 'Live',
    year: '2023',
    isVREnabled: true,
    isNFT: false,
    cryptoIntegration: false
  },
  // Projets Conceptuels
  {
    id: 'metaverse-platform',
    title: 'Metaverse Business Platform',
    category: 'Conceptuel',
    type: 'Metaverse/Web3',
    description: 'Plateforme metaverse pour réunions business avec économie NFT intégrée',
    technologies: ['WebXR', 'Blockchain', 'NFT', 'Spatial Computing', 'AI'],
    status: 'Concept',
    year: '2024',
    isVREnabled: true,
    isNFT: true,
    cryptoIntegration: true
  },
  {
    id: 'ai-crypto-advisor',
    title: 'AI Crypto Investment Advisor',
    category: 'Conceptuel',
    type: 'IA/Blockchain',
    description: 'Conseiller IA pour investissements crypto avec prédictions avancées',
    technologies: ['TensorFlow', 'Blockchain Analysis', 'NLP', 'Predictive AI', 'DeFi'],
    status: 'Concept',
    year: '2024',
    isVREnabled: false,
    isNFT: false,
    cryptoIntegration: true
  },
  {
    id: 'sustainable-nft',
    title: 'Sustainable NFT Marketplace',
    category: 'Conceptuel',
    type: 'Green Tech/NFT',
    description: 'Marketplace NFT écologique avec compensation carbone automatique',
    technologies: ['Sustainable Blockchain', 'Carbon Credits', 'Green NFT', 'Impact Tracking'],
    status: 'Concept',
    year: '2024',
    isVREnabled: false,
    isNFT: true,
    cryptoIntegration: true
  }
];

const categories = ['Tous', 'Réalisé', 'Conceptuel'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [show3DGallery, setShow3DGallery] = useState(true);

  const filteredProjects = activeCategory === 'Tous'
    ? portfolioData
    : portfolioData.filter(project => project.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('portfolio');
    if (section) observer.observe(section);

    // Mouse tracking pour les effets de réfraction
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="portfolio" className="min-h-screen py-20 relative overflow-hidden">
      {/* Liquid Glass Background avec effet cristal */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(147, 51, 234, 0.08) 0%, 
              rgba(79, 70, 229, 0.04) 30%, 
              transparent 60%),
            linear-gradient(180deg, 
              rgba(20, 20, 40, 0.95) 0%, 
              rgba(0, 0, 0, 0.9) 50%, 
              rgba(30, 20, 50, 0.95) 100%)
          `,
          backdropFilter: 'blur(25px) saturate(180%)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)',
        }}
      >
        {/* Effet cristal crypto avec SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-15">
          <defs>
            <filter id="portfolioDistortion">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="20"/>
            </filter>
            <filter id="cryptoGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#portfolioDistortion)" fill="rgba(236, 72, 153, 0.03)"/>
          <circle cx="20%" cy="30%" r="100" fill="rgba(245, 158, 11, 0.1)" filter="url(#cryptoGlow)"/>
          <circle cx="80%" cy="70%" r="150" fill="rgba(147, 51, 234, 0.1)" filter="url(#cryptoGlow)"/>
        </svg>
      </div>

      {/* Particules crypto flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.8, 0.5],
              rotateZ: [0, 360, 720]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-2 h-2 bg-yellow-400/30 rounded-full" />
            ) : i % 3 === 1 ? (
              <div className="w-1 h-1 bg-purple-400/40 rounded-full" />
            ) : (
              <div className="w-1.5 h-1.5 bg-blue-400/30 rounded-full" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header avec showcase NFT */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block p-8 rounded-3xl mb-8"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.12) 0%, 
                  rgba(255, 255, 255, 0.06) 100%)
              `,
              backdropFilter: 'blur(25px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                0 25px 50px rgba(0, 0, 0, 0.3),
                0 0 100px rgba(147, 51, 234, 0.2)
              `
            }}
          >
            <h2
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent mb-4"
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
              }}
            >
              Portfolio Immersif
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-6">
              Galerie 3D • Portails VR/AR • Showcase NFT dynamique
            </p>

            {/* Toggle 3D Gallery */}
            <motion.button
              onClick={() => setShow3DGallery(!show3DGallery)}
              className="px-6 py-3 rounded-full font-semibold text-white"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(147, 51, 234, 0.8) 0%, 
                    rgba(79, 70, 229, 0.8) 100%)
                `,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {show3DGallery ? '📱 Vue Liste' : '🎮 Navigation 3D'}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Galerie 3D Immersive */}
        <AnimatePresence>
          {show3DGallery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
              className="relative h-96 mb-16 rounded-3xl overflow-hidden"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.08) 0%, 
                    rgba(255, 255, 255, 0.04) 100%)
                `,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  0 20px 40px rgba(0, 0, 0, 0.3)
                `
              }}
            >
              <Portfolio3DGallery />

              {/* Overlay avec contrôles VR */}
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  className="px-4 py-2 rounded-lg text-white text-sm"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.15) 0%, 
                        rgba(255, 255, 255, 0.08) 100%)
                    `,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  🥽 Mode VR
                </motion.button>
                <motion.button
                  className="px-4 py-2 rounded-lg text-white text-sm"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.15) 0%, 
                        rgba(255, 255, 255, 0.08) 100%)
                    `,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  📱 Mode AR
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filtres de catégorie avec effet liquid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-8 py-4 rounded-full font-semibold transition-all duration-300"
              style={{
                background: activeCategory === category
                  ? `linear-gradient(135deg, rgba(147, 51, 234, 0.8) 0%, rgba(79, 70, 229, 0.8) 100%)`
                  : `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${activeCategory === category ? 'rgba(147, 51, 234, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                boxShadow: activeCategory === category
                  ? 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 10px 30px rgba(147, 51, 234, 0.3)'
                  : 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                color: 'white'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Grille de projets avec portails VR/AR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setSelectedProject(project.id)}
              onMouseLeave={() => setSelectedProject(null)}
            >
              {/* Card Liquid Glass avec effet cristal par type */}
              <motion.div
                className="relative p-6 rounded-3xl h-full"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.12) 0%, 
                      rgba(255, 255, 255, 0.06) 50%,
                      rgba(255, 255, 255, 0.08) 100%)
                  `,
                  backdropFilter: 'blur(25px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.4),
                    0 20px 40px rgba(0, 0, 0, 0.3),
                    0 0 60px ${project.cryptoIntegration ? 'rgba(245, 158, 11, 0.3)' : 'rgba(147, 51, 234, 0.2)'}
                  `
                }}
                whileHover={{
                  scale: 1.02,
                  y: -10,
                  rotateY: 5,
                  boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.5),
                    0 30px 60px rgba(0, 0, 0, 0.4),
                    0 0 100px ${project.cryptoIntegration ? 'rgba(245, 158, 11, 0.4)' : 'rgba(147, 51, 234, 0.3)'}
                  `
                }}
              >
                {/* Badges de statut */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-2">
                    {project.isVREnabled && (
                      <motion.span
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8) 0%, rgba(79, 70, 229, 0.8) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        🥽 VR/AR
                      </motion.span>
                    )}
                    {project.isNFT && (
                      <motion.span
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.8) 0%, rgba(251, 191, 36, 0.8) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        💎 NFT
                      </motion.span>
                    )}
                    {project.cryptoIntegration && (
                      <motion.span
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.8) 0%, rgba(22, 163, 74, 0.8) 100%)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white'
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        ₿ Crypto
                      </motion.span>
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Live' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Contenu du projet */}
                <div className="space-y-4">
                  <div>
                    <h3
                      className="text-xl font-bold text-white mb-1"
                      style={{ textShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-purple-300 text-sm font-medium">{project.type}</p>
                    <span className="text-white/50 text-xs">{project.year}</span>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
                          backdropFilter: 'blur(5px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: 'rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-white/50 text-xs px-2 py-1">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Portails d'accès */}
                <div className="flex gap-2 mt-6">
                  <motion.button
                    className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold text-white"
                    style={{
                      background: `
                        linear-gradient(135deg, 
                          rgba(147, 51, 234, 0.8) 0%, 
                          rgba(79, 70, 229, 0.8) 100%)
                      `,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {project.isVREnabled ? '🥽 Explorer VR' : '👁️ Voir détails'}
                  </motion.button>

                  {project.status === 'Live' && (
                    <motion.button
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            rgba(255, 255, 255, 0.1) 0%, 
                            rgba(255, 255, 255, 0.05) 100%)
                        `,
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🚀 Live
                    </motion.button>
                  )}
                </div>

                {/* Effet de hover liquide */}
                <AnimatePresence>
                  {selectedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: `
                          linear-gradient(135deg, 
                            ${project.cryptoIntegration ? 'rgba(245, 158, 11, 0.1)' : 'rgba(147, 51, 234, 0.1)'} 0%, 
                            rgba(255, 255, 255, 0.05) 50%,
                            ${project.cryptoIntegration ? 'rgba(245, 158, 11, 0.1)' : 'rgba(147, 51, 234, 0.1)'} 100%)
                        `,
                        border: `2px solid ${project.cryptoIntegration ? 'rgba(245, 158, 11, 0.4)' : 'rgba(147, 51, 234, 0.4)'}`
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Portfolio crypto temps réel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 relative p-8 rounded-3xl"
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(245, 158, 11, 0.08) 0%, 
                rgba(255, 255, 255, 0.04) 100%)
            `,
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            boxShadow: `
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              0 20px 40px rgba(0, 0, 0, 0.2),
              0 0 60px rgba(245, 158, 11, 0.2)
            `
          }}
        >
          <div className="text-center mb-8">
            <h3
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent mb-4"
              style={{
                textShadow: '0 0 30px rgba(245, 158, 11, 0.4)'
              }}
            >
              🚀 Innovation Showcase
            </h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explorez mes projets blockchain et metaverse qui repoussent les limites de l'innovation technologique
            </p>
          </div>

          {/* Statistiques crypto en temps réel */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="text-center p-6 rounded-2xl"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(34, 197, 94, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 100%)
                `,
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold text-green-400 mb-2">6</div>
              <div className="text-white/70 text-sm">Projets Blockchain</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(147, 51, 234, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 100%)
                `,
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(147, 51, 234, 0.3)'
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
              <div className="text-white/70 text-sm">Expériences VR/AR</div>
            </motion.div>

            <motion.div
              className="text-center p-6 rounded-2xl"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(245, 158, 11, 0.1) 0%, 
                    rgba(255, 255, 255, 0.05) 100%)
                `,
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(245, 158, 11, 0.3)'
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl font-bold text-yellow-400 mb-2">2</div>
              <div className="text-white/70 text-sm">Marketplaces NFT</div>
            </motion.div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <motion.button
              className="px-8 py-4 rounded-full font-semibold text-white"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(245, 158, 11, 0.9) 0%, 
                    rgba(251, 191, 36, 0.9) 100%)
                `,
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.3),
                  0 15px 35px rgba(245, 158, 11, 0.3)
                `
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.4),
                  0 20px 40px rgba(245, 158, 11, 0.4)
                `
              }}
              whileTap={{ scale: 0.95 }}
            >
              💼 Collaborer sur votre projet
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
