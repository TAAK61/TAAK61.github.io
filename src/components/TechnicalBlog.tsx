'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  category: 'tech' | 'blockchain' | 'vr-ar' | 'ai' | 'startup';
  featured: boolean;
  views: number;
  likes: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 'liquid-glass-revolution',
    title: 'Liquid Glass : La Révolution du Design Web',
    excerpt: 'Découvrez la technologie Liquid Glass que j\'ai développée pour créer des interfaces utilisateur révolutionnaires.',
    content: `# Liquid Glass : La Révolution du Design Web

    ## Introduction
    
    Après des mois de recherche et développement, j'ai créé la technologie **Liquid Glass** qui transforme radicalement l'expérience utilisateur sur le web.
    
    ## La Technologie
    
    Liquid Glass combine plusieurs innovations :
    
    ### 1. Transparence Dynamique
    - Adaptation en temps réel à l'arrière-plan
    - Calculs de luminosité automatiques
    - Optimisation de la lisibilité
    
    ### 2. Effets de Réfraction
    - Simulation physique de la lumière
    - Distorsions réalistes
    - Performance optimisée via GPU
    
    ### 3. Interactions Fluides
    - Morphing en temps réel
    - Transitions physiquement plausibles
    - Feedback haptique (sur appareils compatibles)
    
    ## Implémentation Technique
    
    \`\`\`css
    .liquid-glass {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    \`\`\`
    
    ## Applications Pratiques
    
    Cette technologie trouve son application dans :
    - Interfaces administratives
    - Applications mobiles haut de gamme
    - Expériences immersives
    - Dashboards analytiques
    
    ## Performance
    
    Les optimisations incluent :
    - Rendu GPU natif
    - Fallback automatique
    - Adaptive quality selon la puissance
    - Bundle size < 2KB
    
    ## Conclusion
    
    Liquid Glass représente l'avenir du design d'interface, alliant esthétique moderne et performance technique.`,
    author: 'Kiame Touré',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['CSS', 'Design', 'Innovation', 'Performance'],
    category: 'tech',
    featured: true,
    views: 1247,
    likes: 89
  },
  {
    id: 'blockchain-defi-guide',
    title: 'Guide Complet DeFi : Créer sa Première dApp',
    excerpt: 'Tutoriel détaillé pour développer une application décentralisée sur Ethereum avec Solidity et Web3.js.',
    content: `# Guide Complet DeFi : Créer sa Première dApp

    ## Vue d'ensemble
    
    Dans ce guide, nous allons créer une application DeFi complète de A à Z.
    
    ## Prérequis
    
    - Connaissance de JavaScript
    - Notions de blockchain
    - Node.js installé
    - MetaMask configuré
    
    ## Architecture
    
    Notre dApp comprendra :
    1. Smart Contract Solidity
    2. Interface Web3.js
    3. Frontend React
    4. Tests automatisés
    
    ## Smart Contract
    
    \`\`\`solidity
    pragma solidity ^0.8.0;
    
    contract LiquidStaking {
        mapping(address => uint256) public stakes;
        uint256 public totalStaked;
        
        function stake() external payable {
            require(msg.value > 0, "Must stake ETH");
            stakes[msg.sender] += msg.value;
            totalStaked += msg.value;
        }
        
        function withdraw(uint256 amount) external {
            require(stakes[msg.sender] >= amount, "Insufficient balance");
            stakes[msg.sender] -= amount;
            totalStaked -= amount;
            payable(msg.sender).transfer(amount);
        }
    }
    \`\`\`
    
    ## Interface Web3
    
    \`\`\`javascript
    import Web3 from 'web3';
    
    class DeFiConnector {
      constructor() {
        this.web3 = new Web3(window.ethereum);
        this.contract = null;
      }
      
      async connect() {
        await window.ethereum.enable();
        this.contract = new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS);
      }
      
      async stake(amount) {
        return await this.contract.methods.stake().send({
          from: this.account,
          value: this.web3.utils.toWei(amount, 'ether')
        });
      }
    }
    \`\`\`
    
    ## Sécurité
    
    Points critiques :
    - Validation des entrées
    - Protection contre la réentrance
    - Gestion des erreurs
    - Audits de code
    
    ## Déploiement
    
    1. Tests sur Hardhat
    2. Déploiement testnet
    3. Audit sécurité
    4. Mainnet deployment
    
    ## Ressources
    
    - [OpenZeppelin](https://openzeppelin.com/)
    - [Hardhat](https://hardhat.org/)
    - [Ethers.js](https://docs.ethers.io/)`,
    author: 'Kiame Touré',
    publishedAt: '2024-01-10',
    readTime: 15,
    tags: ['Blockchain', 'DeFi', 'Solidity', 'Web3'],
    category: 'blockchain',
    featured: true,
    views: 2156,
    likes: 134
  },
  {
    id: 'vr-web-development',
    title: 'Développement VR pour le Web avec WebXR',
    excerpt: 'Comment créer des expériences de réalité virtuelle immersives directement dans le navigateur.',
    content: `# Développement VR pour le Web avec WebXR

    ## L'Avenir de la VR Web
    
    WebXR révolutionne l'accès à la réalité virtuelle en éliminant le besoin d'installations lourdes.
    
    ## Technologies Clés
    
    ### WebXR API
    - Support natif des casques VR
    - Tracking 6DOF
    - Contrôleurs immersifs
    
    ### Three.js + WebXR
    \`\`\`javascript
    import * as THREE from 'three';
    import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
    
    const renderer = new THREE.WebGLRenderer();
    renderer.xr.enabled = true;
    
    const controller = renderer.xr.getController(0);
    scene.add(controller);
    
    // Animation loop VR
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
    \`\`\`
    
    ## Cas d'Usage Pratiques
    
    1. **Formation Immersive**
       - Simulation médicale
       - Training industriel
       - Éducation interactive
    
    2. **Commerce VR**
       - Showrooms virtuels
       - Essais de produits
       - Expériences d'achat
    
    3. **Collaboration**
       - Réunions VR
       - Co-working virtuel
       - Présentations immersives
    
    ## Optimisations Performance
    
    - LOD (Level of Detail)
    - Occlusion culling
    - Texture compression
    - Batching intelligent
    
    ## Compatibilité
    
    Supports :
    - Oculus Quest/Rift
    - HTC Vive
    - Windows Mixed Reality
    - Mobile VR (Cardboard)
    
    ## Défis Techniques
    
    - Latence < 20ms
    - 90fps minimum
    - Prévention motion sickness
    - Interactions naturelles
    
    ## Conclusion
    
    WebXR démocratise la VR en la rendant accessible via un simple navigateur.`,
    author: 'Kiame Touré',
    publishedAt: '2024-01-05',
    readTime: 12,
    tags: ['VR', 'WebXR', 'Three.js', 'Innovation'],
    category: 'vr-ar',
    featured: false,
    views: 892,
    likes: 67
  }
];

const categories = {
  tech: { label: 'Technologie', color: 'blue' },
  blockchain: { label: 'Blockchain', color: 'orange' },
  'vr-ar': { label: 'VR/AR', color: 'green' },
  ai: { label: 'Intelligence Artificielle', color: 'purple' },
  startup: { label: 'Startup', color: 'pink' }
};

export function TechnicalBlog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  // Analytics tracking
  const handlePostView = (post: BlogPost) => {
    setSelectedPost(post);

    if (window.portfolioAnalytics) {
      window.portfolioAnalytics.trackEvent({
        action: 'blog_post_view',
        category: 'content',
        label: post.id,
        metadata: {
          title: post.title,
          category: post.category,
          readTime: post.readTime
        }
      });
    }
  };

  const handleLike = (postId: string) => {
    // Update likes count (in real app, this would be an API call)
    const updatedPosts = blogPosts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );

    if (window.portfolioAnalytics) {
      window.portfolioAnalytics.trackEvent({
        action: 'blog_post_like',
        category: 'engagement',
        label: postId
      });
    }
  };

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Article Header */}
        <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center">
          <div className="container-responsive">
            <button
              onClick={() => setSelectedPost(null)}
              className="mb-4 text-white/80 hover:text-white flex items-center gap-2"
            >
              ← Retour au blog
            </button>
            <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
            <div className="flex items-center gap-4 text-white/80">
              <span>Par {selectedPost.author}</span>
              <span>•</span>
              <span>{new Date(selectedPost.publishedAt).toLocaleDateString('fr-FR')}</span>
              <span>•</span>
              <span>{selectedPost.readTime} min de lecture</span>
              <span>•</span>
              <span>{selectedPost.views} vues</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container-responsive py-12">
          <div className="max-w-4xl mx-auto">
            <div className="liquid-glass rounded-2xl p-8 border border-white/10">
              <div className="prose prose-invert prose-lg max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedPost.content.replace(/\n/g, '<br/>').replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
                  }}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/10">
                {selectedPost.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => handleLike(selectedPost.id)}
                  className="flex items-center gap-2 text-white/70 hover:text-red-400 transition-colors"
                >
                  ❤️ {selectedPost.likes} likes
                </button>
                <div className="flex gap-4">
                  <button className="text-white/70 hover:text-blue-400">
                    Partager
                  </button>
                  <button className="text-white/70 hover:text-green-400">
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container-responsive">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Blog Technique
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Découvrez mes dernières réflexions sur les technologies émergentes,
            le développement et l'innovation.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  !selectedCategory 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                Tous
              </button>
              {Object.entries(categories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    selectedCategory === key
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {!selectedCategory && !searchTerm && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Articles en vedette</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map(post => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="liquid-glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => handlePostView(post)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 bg-${categories[post.category].color}-500/20 text-${categories[post.category].color}-400 rounded-full text-sm`}>
                      {categories[post.category].label}
                    </span>
                    <span className="text-white/60 text-sm">⭐ Vedette</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>{post.readTime} min</span>
                    <div className="flex items-center gap-4">
                      <span>👁️ {post.views}</span>
                      <span>❤️ {post.likes}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">
            {selectedCategory ? `Articles ${categories[selectedCategory as keyof typeof categories].label}` : 'Tous les articles'}
            <span className="text-white/60 text-lg ml-2">({filteredPosts.length})</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="liquid-glass rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                onClick={() => handlePostView(post)}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 bg-${categories[post.category].color}-500/20 text-${categories[post.category].color}-400 rounded text-xs`}>
                    {categories[post.category].label}
                  </span>
                  <span className="text-white/60 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <h3 className="font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-white/70 text-sm mb-3 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{post.readTime} min</span>
                  <div className="flex items-center gap-2">
                    <span>👁️ {post.views}</span>
                    <span>❤️ {post.likes}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl text-white/70 mb-2">Aucun article trouvé</h3>
              <p className="text-white/50">
                Essayez de modifier vos filtres ou votre recherche.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
