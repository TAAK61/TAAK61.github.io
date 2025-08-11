'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Import dynamique du composant ThreeJSScene pour éviter les erreurs SSR
const ThreeJSScene = dynamic(() => import('../three/ThreeJSScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
});

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    // Mouse tracking pour les effets de réfraction
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Background 3D Scene avec objets flottants */}
      <div className="absolute inset-0 z-0">
        <ThreeJSScene />
      </div>

      {/* Liquid Glass Background avec distorsion temps réel */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.1) 0%, 
              rgba(255,255,255,0.05) 25%, 
              transparent 50%),
            linear-gradient(135deg, 
              rgba(147, 51, 234, 0.1) 0%, 
              rgba(79, 70, 229, 0.05) 50%, 
              rgba(236, 72, 153, 0.1) 100%)
          `,
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        {/* Effet de réfraction avec SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <filter id="liquidDistortion">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="10"/>
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#liquidDistortion)" fill="rgba(255,255,255,0.02)"/>
        </svg>
      </div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Contenu principal avec Liquid Glass Cards */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">

          {/* Liquid Glass Card principale */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50, scale: isLoaded ? 1 : 0.9 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative p-12 rounded-3xl"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(255, 255, 255, 0.1) 0%, 
                  rgba(255, 255, 255, 0.05) 100%)
              `,
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                0 20px 40px rgba(0, 0, 0, 0.3),
                0 0 100px rgba(147, 51, 234, 0.2)
              `
            }}
          >
            {/* Highlights spéculaires */}
            <div
              className="absolute inset-0 rounded-3xl opacity-50"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.3) 0%, 
                    transparent 30%, 
                    transparent 70%, 
                    rgba(255, 255, 255, 0.1) 100%)
                `
              }}
            />

            {/* Titre principal avec effet cristal */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            >
              <span
                className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))',
                  textShadow: '0 0 50px rgba(255, 255, 255, 0.3)'
                }}
              >
                Kiame Touré
              </span>
            </motion.h1>

            {/* Sous-titre avec effet liquid */}
            <motion.p
              className="text-2xl md:text-4xl text-white/90 mb-6 font-light relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
              }}
            >
              Concepteur de solutions IT & Digital
            </motion.p>

            {/* Tagline avec équilibre */}
            <motion.p
              className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              Équilibre technique • business • innovation
              <br />
              Spécialisé en technologies émergentes VR/AR, IA, blockchain & entrepreneuriat
            </motion.p>

            {/* Domaines de compétences flottants */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3 }}
            >
              {[
                { icon: '🌐', label: 'Web/Mobile' },
                { icon: '🥽', label: 'VR/AR' },
                { icon: '🤖', label: 'IA' },
                { icon: '₿', label: 'Blockchain' },
                { icon: '🚀', label: 'Startup' }
              ].map((skill, index) => (
                <motion.div
                  key={skill.label}
                  className="relative p-4 rounded-2xl"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(255, 255, 255, 0.15) 0%, 
                        rgba(255, 255, 255, 0.05) 100%)
                    `,
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                  animate={{
                    y: [0, -10, 0],
                    rotateY: [0, 5, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{ scale: 1.1, rotateY: 15 }}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <div className="text-sm text-white/80">{skill.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons avec effet liquid glass */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <motion.a
                href="#collaboration"
                className="group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(147, 51, 234, 0.8) 0%, 
                      rgba(79, 70, 229, 0.8) 100%)
                  `,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: `
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    0 10px 30px rgba(147, 51, 234, 0.3)
                  `
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 text-white">Collaborer avec moi</span>
              </motion.a>

              <motion.a
                href="#portfolio"
                className="group px-8 py-4 rounded-full font-semibold text-lg text-white"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 255, 255, 0.1) 0%, 
                      rgba(255, 255, 255, 0.05) 100%)
                  `,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Découvrir mes créations
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Indicateur de scroll liquid */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.div
              className="w-6 h-10 rounded-full flex justify-center"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.2) 0%, 
                    rgba(255, 255, 255, 0.1) 100%)
                `,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
