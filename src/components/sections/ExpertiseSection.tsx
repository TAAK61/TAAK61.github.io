'use client';

import { useState } from 'react';

const expertiseAreas = [
  {
    id: 'development',
    title: 'Développement',
    subtitle: 'Web • Mobile • Desktop',
    description: 'Création d\'applications modernes avec les dernières technologies',
    skills: ['React/Next.js', 'TypeScript', 'Node.js', 'Python', 'Mobile Apps'],
    icon: '⚡',
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'emerging-tech',
    title: 'Technologies émergentes',
    subtitle: 'VR/AR • IA • Impression 3D',
    description: 'Innovation avec les technologies de pointe pour créer l\'avenir',
    skills: ['WebXR', 'Three.js', 'Machine Learning', 'Computer Vision', 'IoT'],
    icon: '🚀',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'crypto-blockchain',
    title: 'Finance/Crypto',
    subtitle: 'DeFi • Blockchain • Trading',
    description: 'Développement d\'applications décentralisées et solutions crypto',
    skills: ['Smart Contracts', 'Web3.js', 'DeFi Protocols', 'NFTs', 'Trading Bots'],
    icon: '₿',
    gradient: 'from-orange-500 to-yellow-600'
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneuriat',
    subtitle: 'Business • Innovation • Stratégie',
    description: 'Création et développement de projets innovants et startups',
    skills: ['Business Plan', 'Innovation', 'Leadership', 'Fundraising', 'Strategy'],
    icon: '💡',
    gradient: 'from-green-500 to-blue-600'
  }
];

export function ExpertiseSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="expertise" className="section-fullscreen bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-title font-bold text-white mb-4">
            Mon Expertise
          </h2>
          <p className="text-subtitle text-white/70 max-w-2xl mx-auto">
            Quatre domaines d'expertise pour créer des solutions complètes et innovantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {expertiseAreas.map((area) => (
            <div
              key={area.id}
              className={`morphing-card liquid-glass p-8 cursor-pointer group ${
                hoveredCard === area.id ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(area.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Icône et titre */}
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{area.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {area.title}
                  </h3>
                  <p className="text-sm text-white/60">{area.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 mb-6 leading-relaxed">
                {area.description}
              </p>

              {/* Compétences */}
              <div className="flex flex-wrap gap-2 mb-6">
                {area.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Barre de progression stylisée */}
              <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${area.gradient} transition-all duration-1000 group-hover:w-full`}
                  style={{ width: hoveredCard === area.id ? '100%' : '60%' }}
                />
              </div>

              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 bg-gradient-to-r ${area.gradient} opacity-5 rounded-2xl`} />
              </div>
            </div>
          ))}
        </div>

        {/* Bouton pour explorer davantage */}
        <div className="text-center mt-12">
          <button className="glass-button px-8 py-4 text-white font-medium group">
            <span className="flex items-center">
              Explorer mes projets
              <svg
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
