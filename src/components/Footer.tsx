'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description: string;
  category: 'professional' | 'code' | 'content' | 'portfolio';
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/kiame-toure',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
    description: 'Profil professionnel',
    category: 'professional',
    color: '#0A66C2'
  },
  {
    name: 'Malt',
    url: 'https://malt.fr/profile/kiametoure',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/malt.svg',
    description: 'Profil freelance',
    category: 'professional',
    color: '#FC5757'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/TAAK61',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
    description: 'Code source',
    category: 'code',
    color: '#181717'
  },
  {
    name: 'Dev.to',
    url: 'https://dev.to/kiame',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/devdotto.svg',
    description: 'Articles techniques',
    category: 'content',
    color: '#0A0A0A'
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@kiametoure',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/medium.svg',
    description: 'Blog articles',
    category: 'content',
    color: '#000000'
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/kiame-toure',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stackoverflow.svg',
    description: 'Expertise technique',
    category: 'code',
    color: '#F58025'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@kiametoure-tech',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg',
    description: 'Tutoriels vidéo',
    category: 'content',
    color: '#FF0000'
  },
  {
    name: 'CodePen',
    url: 'https://codepen.io/kiame',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/codepen.svg',
    description: 'Expérimentations',
    category: 'code',
    color: '#000000'
  }
];

const legalLinks = [
  { name: 'Mentions légales', href: '#legal' },
  { name: 'Politique de confidentialité', href: '#privacy' },
  { name: 'Conditions d\'utilisation', href: '#terms' },
  { name: 'Plan du site', href: '#sitemap' }
];

const quickLinks = [
  { name: 'À propos', href: '#about' },
  { name: 'Services', href: '#expertise' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#collaboration' }
];

const categories = {
  professional: { name: 'Professionnel', icon: '💼' },
  code: { name: 'Développement', icon: '👨‍💻' },
  content: { name: 'Contenu', icon: '📝' },
  portfolio: { name: 'Portfolio', icon: '🎨' }
};

export default function Footer() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showLegalModal, setShowLegalModal] = useState(false);

  const filteredLinks = activeCategory
    ? socialLinks.filter(link => link.category === activeCategory)
    : socialLinks;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-purple-900 border-t border-white/10">
      {/* Section principale */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">

          {/* À propos */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Kiame Touré
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Développeur Full-Stack passionné par l'innovation technologique.
              Spécialisé dans les applications web modernes, la blockchain,
              la réalité virtuelle et l'intelligence artificielle.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📧 tourekiame8@gmail.com</p>
              <p>📱 +33 751256684</p>
              <p>📱 +34 613817372</p>
              <p>📅 <a href="https://kiame.setmore.com" className="text-purple-400 hover:text-purple-300 transition-colors">Prendre RDV</a></p>
            </div>
          </motion.div>

          {/* Liens rapides */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Profils sociaux */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 md:col-span-2 lg:col-span-2"
          >
            <h4 className="text-lg font-semibold text-white">Mes Profils Professionnels</h4>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1 rounded-full text-xs transition-all ${
                  !activeCategory 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                Tous
              </button>
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(activeCategory === key ? null : key)}
                  className={`px-3 py-1 rounded-full text-xs transition-all flex items-center ${
                    activeCategory === key 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Grille des profils sociaux - Version simplifiée avec logos */}
            <div className="flex flex-wrap justify-center gap-4">
              {filteredLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  title={social.name}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-6 h-6 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                    style={{ filter: `brightness(0) invert(1)` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = `none`;
                      e.currentTarget.style.color = social.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = `brightness(0) invert(1)`;
                    }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Section des compétences/technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6"
        >
          <h4 className="text-lg font-semibold text-white">Technologies & Expertises</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Rust',
              'Three.js', 'WebXR', 'Blockchain', 'Solidity', 'Web3', 'TensorFlow',
              'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Tailwind CSS'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 bg-white/10 backdrop-blur-sm text-gray-300 text-xs rounded-full hover:bg-purple-500/20 hover:text-purple-300 transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section légale */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Kiame Touré. Tous droits réservés.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Développé avec passion en France 🇫🇷 & Espagne 🇪🇸
              </p>
            </div>

            {/* Liens légaux */}
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => setShowLegalModal(true)}
                  className="text-gray-400 hover:text-purple-400 transition-colors text-xs"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal des mentions légales */}
      {showLegalModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowLegalModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-2xl max-h-[80vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLegalModal(false)}
              className="float-right w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-white mb-6">Mentions Légales</h3>

            <div className="space-y-6 text-gray-300 text-sm">
              <div>
                <h4 className="text-white font-semibold mb-2">Éditeur du site</h4>
                <p>Kiame Touré - Développeur Full-Stack Freelance</p>
                <p>Email : tourekiame8@gmail.com</p>
                <p>Téléphone : +33 751256684 / +34 613817372</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Hébergement</h4>
                <p>Ce site est hébergé par Vercel Inc.</p>
                <p>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Propriété intellectuelle</h4>
                <p>Le contenu de ce site (textes, images, code) est protégé par le droit d'auteur. Toute reproduction sans autorisation est interdite.</p>
                <p>Les projets présentés sont soumis aux droits d'auteur de leurs clients respectifs.</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Données personnelles</h4>
                <p>Les données collectées via les formulaires de contact sont utilisées uniquement pour répondre à vos demandes.</p>
                <p>Elles ne sont ni vendues, ni partagées avec des tiers.</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Cookies</h4>
                <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic de manière anonyme.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </footer>
  );
}
