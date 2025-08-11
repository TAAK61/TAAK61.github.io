'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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

interface IntelligentChatbotProps {
  isHidden?: boolean;
  onToggleVisibility?: () => void;
}

export function IntelligentChatbot({ isHidden, onToggleVisibility }: IntelligentChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Position fixe en bas à droite, visible sur tout le site
  const [position, setPosition] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth - 100 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - 100 : 0
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; offsetX: number; offsetY: number }>({
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0
  });

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

  // Initialisation des messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages(welcomeMessages);
    }
  }, []);

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mise à jour de la position lors du redimensionnement
  useEffect(() => {
    const handleResize = () => {
      if (!isDragging) {
        setPosition(prev => ({
          x: Math.min(prev.x, window.innerWidth - 80),
          y: Math.min(prev.y, window.innerHeight - 80)
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDragging]);

  // Gestion du drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragRef.current.offsetX;
      const newY = e.clientY - dragRef.current.offsetY;

      // Contraintes pour garder le widget dans l'écran
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const getSuggestions = (category: string): string[] => {
    const suggestions = {
      expertise: ['Quelles technologies utilises-tu ?', 'Peux-tu développer en blockchain ?'],
      projects: ['Montre-moi le portfolio 3D', 'Parle-moi du crypto tracker'],
      contact: ['Comment puis-je te contacter ?', 'Quel est ton tarif ?'],
      experience: ['Quel est ton parcours ?', 'Depuis quand codes-tu ?']
    };
    return suggestions[category as keyof typeof suggestions] || [];
  };

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
        suggestions: ['Voir ses projets', 'Ses technologies', 'Le contacter']
      };
    }

    // Réponse par défaut
    return {
      text: "Intéressant ! 🤔 Je peux vous parler des compétences de Kiame, ses projets, ou comment le contacter. Que préférez-vous ?",
      suggestions: ['Ses compétences', 'Ses projets', 'Le contacter']
    };
  };

  const sendMessage = (text: string) => {
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return; // Ne permettre le drag que quand fermé
    setIsDragging(true);
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-bold text-purple-300 mb-1">
            {line.slice(2, -2)}
          </div>
        );
      }
      if (line.startsWith('•')) {
        return (
          <div key={index} className="ml-4 mb-1">
            <span className="text-purple-400">•</span>
            <span className="ml-2">{line.slice(1).trim()}</span>
          </div>
        );
      }
      return line && (
        <div key={index} className="mb-1">
          {line}
        </div>
      );
    });
  };

  if (isHidden) return null;

  return (
    <motion.div
      className="fixed z-[9999]"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        pointerEvents: 'auto'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Widget principal */}
      <div
        className="fixed z-[9999]"
        onMouseDown={handleMouseDown}
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          cursor: isDragging ? 'grabbing' : (!isOpen ? 'grab' : 'default'),
          pointerEvents: 'auto'
        }}
      >
        {/* Bouton principal du chatbot */}
        <motion.div
          onClick={toggleChat}
          className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-2xl border-2 border-white/20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Assistant IA Portfolio"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                className="text-white text-2xl"
              >
                ✕
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                className="text-white text-2xl"
              >
                💬
              </motion.div>
            )}
          </AnimatePresence>

          {/* Badge de notification */}
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </motion.div>

        {/* Bouton de masquage séparé */}
        {onToggleVisibility && (
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility();
            }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center cursor-pointer text-white text-xs"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Masquer le chatbot"
          >
            ✕
          </motion.div>
        )}

        {/* Interface de chat */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 w-80 h-96 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
                <h3 className="font-bold">Assistant IA Portfolio</h3>
                <p className="text-sm opacity-90">Posez-moi vos questions sur Kiame !</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                          : 'bg-white/10 backdrop-blur-sm text-gray-100'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {formatMessage(message.text)}
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Indicateur de frappe */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/10 backdrop-blur-sm text-gray-100 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Votre message..."
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <button
                    onClick={() => sendMessage(inputValue)}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ➤
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
