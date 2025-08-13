'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Projets simplifiés et optimisés - sans blockchain
const portfolioData = [
  // Projets Réalisés
  {
    id: 'liquid-portfolio',
    title: 'Portfolio Liquid Glass',
    category: 'Réalisé',
    type: 'Web Immersif',
    description: 'Portfolio révolutionnaire avec effets Liquid Glass et animations fluides',
    technologies: ['Next.js', 'CSS Liquid Glass', 'Framer Motion', 'TypeScript'],
    status: 'Live',
    year: '2024',
    image: '/portfolio-1.jpg',
    link: 'https://kiametoure.me'
  },
  {
    id: 'vr-showroom',
    title: 'VR Showroom',
    category: 'Réalisé',
    type: 'VR/AR',
    description: 'Showroom virtuel immersif pour présentation de produits en réalité virtuelle',
    technologies: ['Unity', 'WebXR', 'Three.js', 'C#'],
    status: 'Live',
    year: '2024',
    image: '/portfolio-2.jpg',
    link: '#'
  },
  {
    id: 'ai-assistant',
    title: 'Assistant IA Personnalisé',
    category: 'Réalisé',
    type: 'Intelligence Artificielle',
    description: 'Chatbot intelligent avec traitement du langage naturel et apprentissage adaptatif',
    technologies: ['Python', 'OpenAI', 'TensorFlow', 'React'],
    status: 'Live',
    year: '2024',
    image: '/portfolio-3.jpg',
    link: '#'
  },
  // Projets En Cours
  {
    id: 'metaverse-platform',
    title: 'Plateforme Métaverse',
    category: 'En cours',
    type: 'VR/AR',
    description: 'Plateforme collaborative en réalité virtuelle pour événements professionnels',
    technologies: ['Unity', 'WebXR', 'Node.js', 'Socket.io'],
    status: 'Beta',
    year: '2024',
    image: '/portfolio-4.jpg',
    link: '#'
  },
  {
    id: 'startup-platform',
    title: 'Plateforme Startup',
    category: 'En cours',
    type: 'SaaS',
    description: 'Plateforme tout-en-un pour accompagner les startups de l\'idée au financement',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'],
    status: 'MVP',
    year: '2024',
    image: '/portfolio-5.jpg',
    link: '#'
  },
  {
    id: 'mobile-ar',
    title: 'App Mobile AR',
    category: 'En cours',
    type: 'Mobile',
    description: 'Application mobile de réalité augmentée pour visualisation de meubles',
    technologies: ['React Native', 'ARKit', 'ARCore', 'Three.js'],
    status: 'Dev',
    year: '2024',
    image: '/portfolio-6.jpg',
    link: '#'
  },
  // Projets Concepts
  {
    id: 'neural-interface',
    title: 'Interface Neuronale',
    category: 'Concept',
    type: 'IA/Recherche',
    description: 'Interface cerveau-ordinateur pour contrôle d\'applications par la pensée',
    technologies: ['Python', 'TensorFlow', 'OpenBCI', 'WebGL'],
    status: 'Research',
    year: '2025',
    image: '/portfolio-7.jpg',
    link: '#'
  },
  {
    id: 'quantum-app',
    title: 'App Quantique',
    category: 'Concept',
    type: 'Quantum',
    description: 'Application exploitant l\'informatique quantique pour résolution de problèmes complexes',
    technologies: ['Qiskit', 'Python', 'React', 'D3.js'],
    status: 'Concept',
    year: '2025',
    image: '/portfolio-8.jpg',
    link: '#'
  },
  {
    id: 'space-platform',
    title: 'Plateforme Spatiale',
    category: 'Concept',
    type: 'IoT/Space',
    description: 'Système de gestion pour stations spatiales avec IA prédictive',
    technologies: ['Rust', 'WebAssembly', 'React', 'IoT'],
    status: 'Vision',
    year: '2025',
    image: '/portfolio-9.jpg',
    link: '#'
  }
];

const categories = ['Tous', 'Réalisé', 'En cours', 'Concept'];

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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

    return () => observer.disconnect();
  }, []);

  const filteredProjects = selectedCategory === 'Tous'
    ? portfolioData
    : portfolioData.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-black relative overflow-hidden">
      {/* Background Liquid Glass */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div
            className="inline-block p-8 rounded-3xl mb-8"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 100%)
              `,
              backdropFilter: 'blur(20px) saturate(150%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                0 20px 40px rgba(0, 0, 0, 0.2),
                0 0 60px rgba(79, 70, 229, 0.2)
              `
            }}
          >
            <h2
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent"
              style={{ textShadow: '0 0 30px rgba(255, 255, 255, 0.3)' }}
            >
              Portfolio
            </h2>
            <p className="text-xl text-white/80 mt-4 max-w-2xl mx-auto">
              9 projets • Innovation constante • Excellence technique
            </p>
          </div>
        </motion.div>

        {/* Filtres de catégories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Grille de projets - Remplace la galerie 3D */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className="relative p-6 rounded-2xl h-full transition-all duration-500 hover:scale-105"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.08) 0%, 
                        rgba(255, 255, 255, 0.04) 100%)
                    `,
                    backdropFilter: 'blur(20px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: `
                      inset 0 1px 0 rgba(255, 255, 255, 0.2),
                      0 20px 40px rgba(0, 0, 0, 0.3)
                    `
                  }}
                >
                  {/* Statut et année */}
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'Beta' || project.status === 'MVP' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {project.status}
                    </span>
                    <span className="text-white/50 text-sm">{project.year}</span>
                  </div>

                  {/* Titre et type */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-purple-400 text-sm font-medium mb-3">{project.type}</p>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-white/10 text-white/80 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-white/5 text-white/60 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal de détail de projet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black/90 backdrop-blur-xl rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.5)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                    <p className="text-purple-400 font-medium">{selectedProject.type}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-white/60 hover:text-white transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-white/80 mb-6 leading-relaxed">{selectedProject.description}</p>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-purple-600/20 text-purple-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Informations</h4>
                    <p className="text-white/70 text-sm">Statut: {selectedProject.status}</p>
                    <p className="text-white/70 text-sm">Année: {selectedProject.year}</p>
                    <p className="text-white/70 text-sm">Catégorie: {selectedProject.category}</p>
                  </div>
                </div>

                {selectedProject.link !== '#' && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                  >
                    Voir le projet
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="text-3xl font-bold text-purple-400 mb-2">9+</div>
            <div className="text-white/70">Projets réalisés</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
            <div className="text-white/70">Technologies maîtrisées</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-white/70">Satisfaction client</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
