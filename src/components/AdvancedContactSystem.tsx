'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactData {
  name: string;
  email: string;
  company?: string;
  projectType: 'web' | 'mobile' | 'blockchain' | 'vr-ar' | 'ai' | 'consulting' | 'other';
  budget: 'startup' | 'small' | 'medium' | 'enterprise';
  message: string;
  timeline: 'urgent' | '1-month' | '3-months' | '6-months' | 'flexible';
}

interface CalendlyProps {
  isOpen: boolean;
  onClose: () => void;
}

function SetmoreWidget({ isOpen, onClose }: CalendlyProps) {
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      // Charger le script Setmore
      const script = document.createElement('script');
      script.src = 'https://storage.googleapis.com/setmore-appointments/iframe-appointments/setmore-appointments.js';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        const existingScript = document.querySelector('script[src="https://storage.googleapis.com/setmore-appointments/iframe-appointments/setmore-appointments.js"]');
        if (existingScript) {
          document.head.removeChild(existingScript);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white rounded-2xl w-full max-w-4xl h-[80vh] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600"
        >
          ✕
        </button>

        <div className="w-full h-full">
          <iframe
            src="https://kiame.setmore.com"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Planifier un rendez-vous avec Kiame Touré"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdvancedContactSystem() {
  const [formData, setFormData] = useState<ContactData>({
    name: '',
    email: '',
    company: '',
    projectType: 'web',
    budget: 'medium',
    message: '',
    timeline: 'flexible',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showCalendly, setShowCalendly] = useState(false);

  const projectTypes = [
    { id: 'web', label: 'Application Web', icon: '🌐', description: 'Sites web, PWA, dashboards' },
    { id: 'mobile', label: 'Application Mobile', icon: '📱', description: 'iOS, Android, React Native' },
    { id: 'blockchain', label: 'Blockchain/Crypto', icon: '₿', description: 'DeFi, NFT, Web3' },
    { id: 'vr-ar', label: 'VR/AR', icon: '🥽', description: 'Réalité virtuelle/augmentée' },
    { id: 'ai', label: 'Intelligence Artificielle', icon: '🤖', description: 'ML, NLP, Computer Vision' },
    { id: 'consulting', label: 'Conseil Technique', icon: '💡', description: 'Architecture, audit, formation' },
    { id: 'other', label: 'Autre', icon: '🔧', description: 'Projet spécifique' },
  ];

  const budgetRanges = [
    { id: 'startup', label: 'Startup/MVP', range: '5K - 15K €', icon: '🚀' },
    { id: 'small', label: 'Petit projet', range: '15K - 50K €', icon: '💼' },
    { id: 'medium', label: 'Projet moyen', range: '50K - 150K €', icon: '🏢' },
    { id: 'enterprise', label: 'Enterprise', range: '150K+ €', icon: '🏦' },
  ];

  const timelineOptions = [
    { id: 'urgent', label: 'Urgent (< 1 mois)', icon: '⚡' },
    { id: '1-month', label: '1 mois', icon: '📅' },
    { id: '3-months', label: '3 mois', icon: '🗓️' },
    { id: '6-months', label: '6 mois', icon: '📆' },
    { id: 'flexible', label: 'Flexible', icon: '🕒' },
  ];

  const handleInputChange = (field: keyof ContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setCurrentStep(4);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email;
      case 2:
        return formData.projectType && formData.budget;
      case 3:
        return formData.message.length > 10;
      default:
        return false;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-purple-900 rounded-3xl p-8 border border-white/10 shadow-2xl max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Discutons de votre projet
        </h2>
        <p className="text-gray-300">
          Un processus simple pour comprendre vos besoins et vous proposer la meilleure solution
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step
                  ? 'bg-purple-500 border-purple-500 text-white'
                  : 'border-gray-600 text-gray-400'
              }`}
            >
              {step}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Étape 1: Informations personnelles */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Parlons de vous</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Entreprise / Organisation
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                placeholder="Nom de votre entreprise (optionnel)"
              />
            </div>
          </motion.div>
        )}

        {/* Étape 2: Type de projet et budget */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Votre projet</h3>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-4">
                Type de projet *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleInputChange('projectType', type.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.projectType === type.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <span className="text-white font-medium">{type.label}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-4">
                Budget estimé *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => handleInputChange('budget', budget.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      formData.budget === budget.id
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{budget.label}</span>
                      <span className="text-xl">{budget.icon}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{budget.range}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-4">
                Timeline souhaitée
              </label>
              <div className="flex flex-wrap gap-3">
                {timelineOptions.map((timeline) => (
                  <button
                    key={timeline.id}
                    onClick={() => handleInputChange('timeline', timeline.id)}
                    className={`px-4 py-2 rounded-lg border transition-all flex items-center ${
                      formData.timeline === timeline.id
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40'
                    }`}
                  >
                    <span className="mr-2">{timeline.icon}</span>
                    {timeline.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Étape 3: Message détaillé */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Détails du projet</h3>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Décrivez votre projet *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 resize-none"
                placeholder="Décrivez votre projet, vos objectifs, vos contraintes techniques, et tout ce qui pourrait m'aider à mieux comprendre vos besoins..."
              />
              <div className="text-right text-sm text-gray-400 mt-2">
                {formData.message.length} caractères (minimum 10)
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">Récapitulatif</h4>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-purple-400">Contact:</span> {formData.name} ({formData.email})</p>
                {formData.company && <p><span className="text-purple-400">Entreprise:</span> {formData.company}</p>}
                <p><span className="text-purple-400">Projet:</span> {projectTypes.find(p => p.id === formData.projectType)?.label}</p>
                <p><span className="text-purple-400">Budget:</span> {budgetRanges.find(b => b.id === formData.budget)?.range}</p>
                <p><span className="text-purple-400">Timeline:</span> {timelineOptions.find(t => t.id === formData.timeline)?.label}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Étape 4: Confirmation */}
        {currentStep === 4 && submitStatus === 'success' && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-semibold text-white">Message envoyé avec succès !</h3>
            <p className="text-gray-300">
              Merci pour votre intérêt ! Je vous recontacterai dans les 24h pour discuter de votre projet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowCalendly(true)}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                📅 Planifier un appel
              </button>
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    name: '',
                    email: '',
                    company: '',
                    projectType: 'web',
                    budget: 'medium',
                    message: '',
                    timeline: 'flexible',
                  });
                  setSubmitStatus('idle');
                }}
                className="border border-purple-500 text-purple-400 px-6 py-3 rounded-lg font-semibold hover:bg-purple-500/10 transition-all duration-300"
              >
                Nouveau projet
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {currentStep <= 3 && (
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-500 transition-colors"
          >
            Précédent
          </button>

          <button
            onClick={nextStep}
            disabled={!canProceed() || isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Envoi...
              </>
            ) : currentStep === 3 ? (
              'Envoyer'
            ) : (
              'Suivant'
            )}
          </button>
        </div>
      )}

      {/* Error state */}
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300"
        >
          Une erreur s'est produite lors de l'envoi. Veuillez réessayer ou me contacter directement.
        </motion.div>
      )}

      {/* Calendly Widget */}
      <SetmoreWidget
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
      />
    </div>
  );
}
