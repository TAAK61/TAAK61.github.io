'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsLoaded(true);

    // Mouse tracking optimisé avec throttling
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden">
      {/* Liquid Glass Background avec CSS pur - Performance optimisée */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(255,255,255,0.08) 0%, 
              rgba(255,255,255,0.03) 30%, 
              transparent 60%),
            linear-gradient(135deg, 
              rgba(147, 51, 234, 0.08) 0%, 
              rgba(79, 70, 229, 0.04) 50%, 
              rgba(236, 72, 153, 0.08) 100%),
            radial-gradient(ellipse 800px 600px at 50% 0%, 
              rgba(59, 130, 246, 0.05) 0%, 
              transparent 70%)
          `,
          backdropFilter: 'blur(15px) saturate(120%)',
          WebkitBackdropFilter: 'blur(15px) saturate(120%)',
        }}
      >
        {/* Effet de distorsion liquide avec CSS */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 animate-pulse"
            style={{
              filter: 'blur(1px)',
              animation: 'liquidFloat 8s ease-in-out infinite'
            }}
          />
        </div>

        {/* Particules CSS simples remplaçant Three.js */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${20 + (i * 8)}%`,
                animation: `floatParticle ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Titre principal avec effet Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50, scale: isLoaded ? 1 : 0.9 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="mb-8"
          >
            <div
              className="inline-block p-8 rounded-3xl mb-6"
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
                  0 0 60px rgba(147, 51, 234, 0.2)
                `
              }}
            >
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
                style={{
                  textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
                }}
              >
                Kiame Touré
              </h1>
            </div>
          </motion.div>

          {/* Sous-titre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl md:text-4xl font-light text-white/90 mb-4">
              Développeur Full-Stack & Expert Technologies Émergentes
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Création d'expériences digitales innovantes avec VR/AR, IA et développement web moderne
            </p>
          </motion.div>

          {/* Boutons d'action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => {
                const collaborationSection = document.getElementById('collaboration');
                collaborationSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(147, 51, 234, 0.8) 0%, 
                    rgba(79, 70, 229, 0.8) 100%)
                `,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(147, 51, 234, 0.3)'
              }}
            >
              <span className="relative z-10 text-white font-semibold text-lg">
                Collaborer avec moi
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <button
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio');
                portfolioSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="text-white font-semibold text-lg group-hover:text-purple-300 transition-colors">
                Voir mes projets
              </span>
            </button>
          </motion.div>

          {/* Indicateur de scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center text-white/60">
              <span className="text-sm mb-2">Découvrir</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes liquidFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        
        @keyframes floatParticle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px); 
            opacity: 0.2; 
          }
          50% { 
            transform: translateY(-20px) translateX(5px); 
            opacity: 0.6; 
          }
        }
      `}</style>
    </section>
  );
}
