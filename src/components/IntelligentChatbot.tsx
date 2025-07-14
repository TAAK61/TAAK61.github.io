'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types pour le chatbot
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

interface AIResponse {
  text: string;
  suggestions?: string[];
}

export function IntelligentChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Base de connaissances sur Kiame Touré
  const knowledgeBase = {
    expertise: {
      keywords: ['compétences', 'expertise', 'technologies', 'stack', 'langages'],
      response: "Je maîtrise plusieurs domaines :\n\n💻 **Développement** : React, Next.js, TypeScript, Node.js, Python, Rust\n\n🚀 **Technologies Émergentes** : Three.js, WebXR, IA, TensorFlow\n\n₿ **Blockchain** : Solidity, Web3.js, DeFi, NFT\n\n📈 **Entrepreneuriat** : Strategy, MVP, Growth, Leadership"
    },
    projects: {
      keywords: ['projets', 'portfolio', 'réalisations', 'travaux'],
      response: "Voici mes projets phares :\n\n🌐 **Portfolio Liquid Glass** - Site immersif avec Three.js\n₿ **Crypto Tracker** - App de suivi crypto temps réel\n🥽 **AR Experience** - Réalité augmentée éducative\n🤖 **AI Assistant** - IA avec NLP avancé\n💎 **DeFi Platform** - Finance décentralisée\n\nVoulez-vous en savoir plus sur un projet en particulier ?"
    },
    contact: {
      keywords: ['contact', 'collaboration', 'embauche', 'projet', 'travailler'],
      response: "Je suis disponible pour de nouveaux projets ! 🚀\n\n📧 **Email** : contact@kiametoure.me\n💼 **Collaboration** : Rendez-vous via Setmore\n🌐 **LinkedIn** : Connectons-nous\n\nJe peux vous aider avec :\n• Développement web/mobile\n• Solutions blockchain\n• Applications 3D/VR\n• Conseil tech"
    },
    experience: {
      keywords: ['expérience', 'parcours', 'formation', 'background'],
      response: "Mon parcours technique :\n\n🎓 **Formation** : Autodidacte passionné + formations continues\n💼 **Expérience** : 5+ ans en développement innovant\n🏆 **Spécialités** :\n• Applications full-stack modernes\n• Intégration blockchain et crypto\n• Expériences immersives 3D/VR\n• Solutions d'intelligence artificielle"
    }
  };

  // Messages de démarrage
  const welcomeMessages: Message[] = [
    {
      id: '1',
      text: "Salut ! 👋 Je suis l'assistant IA de Kiame. Je peux répondre à vos questions sur ses compétences, projets et expérience !",
      sender: 'ai',
      timestamp: new Date()
    }
  ];

  // Intelligence artificielle simulée
  const processAIResponse = (userMessage: string): AIResponse => {
    const message = userMessage.toLowerCase();

    // Recherche dans la base de connaissances
    for (const [category, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        return {
          text: data.response,
          suggestions: getSuggestions(category)
        };
      }
    }

    // Réponses contextuelles
    if (message.includes('salut') || message.includes('bonjour') || message.includes('hello')) {
      return {
        text: "Salut ! 😊 Je suis ravi de vous parler de Kiame et de son travail. Que souhaitez-vous savoir ?",
        suggestions: ['Ses compétences', 'Ses projets', 'Comment le contacter']
      };
    }

    if (message.includes('merci')) {
      return {
        text: "De rien ! 🙏 N'hésitez pas si vous avez d'autres questions sur le travail de Kiame.",
        suggestions: ['Voir le portfolio', 'Planifier un call', 'Ses technologies']
      };
    }

    // Réponse par défaut intelligente
    return {
      text: "Interessant ! 🤔 Je peux vous parler des compétences de Kiame, de ses projets innovants, ou vous aider à entrer en contact avec lui. Que vous intéresse le plus ?",
      suggestions: ['Ses expertises', 'Ses réalisations', 'Collaborer ensemble']
    };
  };

  const getSuggestions = (category: string): string[] => {
    const suggestions = {
      expertise: ['Technologies 3D', 'Blockchain & DeFi', 'IA et Machine Learning'],
      projects: ['Portfolio interactif', 'Apps crypto', 'Expériences VR/AR'],
      contact: ['Planifier un appel', 'Voir ses disponibilités', 'Discuter d\'un projet'],
      experience: ['Ses formations', 'Ses réalisations', 'Son approche']
    };
    return suggestions[category as keyof typeof suggestions] || [];
  };

  // Initialisation
  useEffect(() => {
    if (messages.length === 0) {
      setMessages(welcomeMessages);
    }
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulation du délai de traitement IA
    setTimeout(() => {
      const aiResponse = processAIResponse(text);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Increment unread if chat is closed
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <>
      {/* Bouton du chatbot */}
      <motion.div
        className="fixed bottom-6 left-6 z-[9999]"
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0 }} // Apparition immédiate
      >
        <motion.button
          onClick={toggleChat}
          className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25 border-2 border-purple-400/30 backdrop-blur-xl"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Assistant IA Portfolio"
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? '💬' : '🤖'}
          </motion.div>

          {/* Badge de messages non lus */}
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
            >
              {unreadCount}
            </motion.div>
          )}

          {/* Animation de pulsation */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400"
            animate={{ scale: [1, 1.2], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      {/* Interface du chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-6 z-40 w-96 h-[500px] bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <h3 className="text-white font-semibold">Assistant IA</h3>
                  <p className="text-white/60 text-xs">Portfolio de Kiame</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white/60 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-white/60 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions rapides */}
            <div className="p-2 border-t border-white/10">
              <div className="flex flex-wrap gap-2 mb-2">
                {['Ses compétences', 'Ses projets', 'Le contacter'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 text-white/80 rounded-full transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                  placeholder="Posez votre question..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white placeholder-white/60 text-sm focus:outline-none focus:border-blue-400"
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  disabled={!inputValue.trim()}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:opacity-50 text-white rounded-xl transition-all"
                >
                  ↗
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
