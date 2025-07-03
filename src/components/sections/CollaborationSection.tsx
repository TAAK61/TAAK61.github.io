'use client';

import { useState } from 'react';

const collaborationTypes = [
  {
    id: 'investment',
    title: 'Investissement & Financement',
    description: 'Recherche d\'investisseurs pour projets innovants et startups tech',
    icon: '💰',
    features: [
      'Pitch deck professionnel',
      'Business plan détaillé',
      'Proof of concept',
      'Roadmap technique'
    ],
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'project-conception',
    title: 'Conception de projets',
    description: 'Création de solutions IT innovantes sur mesure',
    icon: '🎯',
    features: [
      'Analyse des besoins',
      'Architecture technique',
      'Prototypage rapide',
      'Accompagnement complet'
    ],
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'startup-creation',
    title: 'Création de startups',
    description: 'Développement de nouvelles entreprises tech',
    icon: '🚀',
    features: [
      'Idéation et validation',
      'Équipe technique',
      'MVP development',
      'Go-to-market strategy'
    ],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'commercial',
    title: 'Missions commerciales',
    description: 'Développement d\'applications et solutions business',
    icon: '💼',
    features: [
      'Développement sur mesure',
      'Consulting technique',
      'Formation équipes',
      'Maintenance support'
    ],
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'humanitarian',
    title: 'Projets humanitaires',
    description: 'Missions gratuites pour causes sociales et environnementales',
    icon: '🤝',
    features: [
      'Impact social positif',
      'Technologies accessibles',
      'Open source',
      'Bénévolat qualifié'
    ],
    gradient: 'from-red-500 to-orange-600'
  }
];

export function CollaborationSection() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    type: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission du formulaire
    console.log('Form submitted:', formData);
  };

  const handleSetmoreBooking = () => {
    // Ouverture Setmore dans nouvel onglet avec pré-remplissage
    const setmoreUrl = `https://my.setmore.com/kiame-toure?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`;
    window.open(setmoreUrl, '_blank');
  };

  return (
    <section id="collaboration" className="section-fullscreen bg-gradient-to-t from-black to-gray-900 relative">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-title font-bold text-white mb-4">
            Collaboration
          </h2>
          <p className="text-subtitle text-white/70 max-w-2xl mx-auto">
            Transformons vos idées en réalité avec des solutions innovantes
          </p>
        </div>

        {/* Types de collaboration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {collaborationTypes.map((type) => (
            <div
              key={type.id}
              className={`morphing-card liquid-glass p-6 cursor-pointer transition-all duration-300 ${
                selectedType === type.id ? 'ring-2 ring-white/30 scale-105' : ''
              }`}
              onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{type.icon}</div>
                <h3 className="text-lg font-bold text-white">{type.title}</h3>
              </div>

              <p className="text-white/70 mb-4 text-sm">{type.description}</p>

              <div className="space-y-2">
                {type.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-white/80">
                    <div className="w-2 h-2 bg-white/50 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              {selectedType === type.id && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className={`w-full h-1 bg-gradient-to-r ${type.gradient} rounded-full`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Formulaire de contact et booking */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de qualification */}
          <div className="liquid-glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Parlez-moi de votre projet
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom *"
                  className="glass-input w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email *"
                  className="glass-input w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <input
                type="text"
                placeholder="Entreprise"
                className="glass-input w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />

              <select
                className="glass-input w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
              >
                <option value="">Type de collaboration *</option>
                {collaborationTypes.map((type) => (
                  <option key={type.id} value={type.id} className="bg-gray-800">
                    {type.title}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Budget estimé"
                  className="glass-input w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Timeline souhaité"
                  className="glass-input w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue"
                  value={formData.timeline}
                  onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                />
              </div>

              <textarea
                placeholder="Décrivez votre projet *"
                rows={4}
                className="glass-input w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-blue resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
              />

              <button
                type="submit"
                className="glass-button w-full px-6 py-4 text-white font-medium"
              >
                Envoyer ma demande
              </button>
            </form>
          </div>

          {/* Section booking */}
          <div className="liquid-glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Réservez un créneau
            </h3>

            <div className="space-y-6">
              <div className="text-white/80">
                <p className="mb-4">
                  Discutons directement de votre projet lors d'un appel de découverte gratuit de 30 minutes.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Analyse de faisabilité</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Estimation de coûts</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Recommandations techniques</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-3">✓</span>
                    <span>Plan d'action personnalisé</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h4 className="text-white font-semibold mb-3">Créneaux disponibles :</h4>
                <div className="space-y-2 text-sm text-white/70">
                  <div>🕐 Lundi - Vendredi : 9h - 18h</div>
                  <div>🌍 Fuseau horaire : GMT+1 (Paris)</div>
                  <div>📞 Appel vidéo ou téléphonique</div>
                </div>
              </div>

              <button
                onClick={handleSetmoreBooking}
                className="glass-button w-full px-6 py-4 text-white font-medium group"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">📅</span>
                  Réserver maintenant
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </span>
              </button>

              <p className="text-xs text-white/50 text-center">
                Vous serez redirigé vers Setmore pour choisir votre créneau
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
