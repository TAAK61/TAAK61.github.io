'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdvancedContactSystem from '../AdvancedContactSystem';

const collaborationTypes = [
  {
    id: 'freelance',
    title: 'Missions freelance',
    description: 'Projets ponctuels et développements spécialisés',
    icon: '🎯',
    features: [
      'Développement full-stack',
      'Applications 3D/VR',
      'Solutions blockchain',
      'Conseil technique',
    ],
    gradient: 'from-blue-500 to-purple-600',
    cta: 'Voir mes services',
  },
  {
    id: 'startup',
    title: 'Accompagnement startup',
    description: 'De l\'idée au produit fini, construction ensemble',
    icon: '🚀',
    features: [
      'CTO as a Service',
      'Architecture technique',
      'MVP development',
      'Go-to-market strategy',
    ],
    gradient: 'from-green-500 to-teal-600',
    cta: 'Lancer ma startup',
  },
  {
    id: 'commercial',
    title: 'Missions commerciales',
    description: 'Développement d\'applications et solutions business',
    icon: '💼',
    features: [
      'Applications web/mobile',
      'Solutions blockchain',
      'Intégrations IA',
      'Maintenance évolutive',
    ],
    gradient: 'from-purple-500 to-pink-600',
    cta: 'Commander une solution',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Martinez',
    role: 'CEO, TechStart',
    content: 'Travail exceptionnel sur notre application blockchain. Expertise technique remarquable.',
    rating: 5,
    project: 'DeFi Platform',
    avatar: '👩‍💼'
  },
  {
    id: 2,
    name: 'Marc Dubois',
    role: 'CTO, InnovCorp',
    content: 'Solutions 3D impressionnantes et livraison dans les délais. Très professionnel.',
    rating: 5,
    project: 'VR Showroom',
    avatar: '👨‍💻'
  },
  {
    id: 3,
    name: 'Lisa Chen',
    role: 'Founder, AIFlow',
    content: 'Accompagnement startup parfait. De l\'idée au MVP en temps record.',
    rating: 5,
    project: 'AI Analytics Tool',
    avatar: '👩‍🚀'
  }
];

export default function CollaborationSection() {
  const [selectedType, setSelectedType] = useState('freelance');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="collaboration" className="py-20 bg-gradient-to-br from-gray-900 via-black to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Collaborons Ensemble
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Que vous soyez une startup, une entreprise ou un entrepreneur,
            trouvons la formule de collaboration qui vous convient.
          </p>
        </motion.div>

        {/* Collaboration Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {collaborationTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative group cursor-pointer transition-all duration-500 ${
                selectedType === type.id ? 'scale-105' : 'hover:scale-105'
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className={`bg-gradient-to-br ${type.gradient} p-1 rounded-2xl`}>
                <div className="bg-black/90 backdrop-blur-sm rounded-2xl p-8 h-full">
                  <div className="text-4xl mb-4">{type.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{type.title}</h3>
                  <p className="text-gray-300 mb-6">{type.description}</p>

                  <ul className="space-y-2 mb-8">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowContactForm(true);
                    }}
                    className={`w-full bg-gradient-to-r ${type.gradient} text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                  >
                    {type.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Ce que disent mes clients
          </h3>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                {testimonials[currentTestimonial] && (
                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">
                        {testimonials[currentTestimonial].avatar}
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-1">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-400 mb-1">
                        {testimonials[currentTestimonial].role}
                      </p>
                      <p className="text-blue-400 text-sm mb-6">
                        Projet: {testimonials[currentTestimonial].project}
                      </p>

                      <blockquote className="text-lg text-gray-300 mb-6 italic">
                        "{testimonials[currentTestimonial].content}"
                      </blockquote>

                      <div className="flex justify-center space-x-1">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Testimonial indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-purple-500 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Prêt à démarrer votre projet ?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Discutons de vos besoins et trouvons la solution parfaite ensemble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Commencer maintenant
              </button>
              <button
                onClick={() => {
                  const portfolioSection = document.getElementById('portfolio');
                  portfolioSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-purple-500 text-purple-400 px-8 py-4 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                Voir mes réalisations
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowContactForm(false)}
              className="absolute top-4 right-4 z-60 w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
            >
              ✕
            </button>
            <AdvancedContactSystem />
          </div>
        </div>
      )}
    </section>
  );
}
