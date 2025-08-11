'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  section?: string;
  metadata?: Record<string, any>;
}

class AdvancedAnalytics {
  private sessionId: string;
  private startTime: number;
  private interactions: AnalyticsEvent[] = [];
  private heatmapData: { x: number; y: number; timestamp: number }[] = [];

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking() {
    // Track mouse movements for heatmap
    document.addEventListener('mousemove', this.trackMouseMovement.bind(this));

    // Track scroll behavior
    document.addEventListener('scroll', this.trackScrollBehavior.bind(this));

    // Track voice commands usage
    window.addEventListener('voiceCommandUsed', this.trackVoiceCommand.bind(this));

    // Track 3D interactions
    window.addEventListener('3dInteraction', this.track3DInteraction.bind(this));

    // Track performance metrics
    this.trackPerformanceMetrics();
  }

  // Événements personnalisés du portfolio
  trackSectionView(section: string, timeSpent?: number) {
    this.trackEvent({
      action: 'section_view',
      category: 'navigation',
      label: section,
      value: timeSpent,
      section,
      metadata: {
        timestamp: Date.now(),
        sessionId: this.sessionId,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        userAgent: navigator.userAgent
      }
    });
  }

  trackProjectInteraction(projectId: string, interactionType: 'view' | 'click' | '3d_rotate' | 'ar_view') {
    this.trackEvent({
      action: 'project_interaction',
      category: 'portfolio',
      label: `${projectId}_${interactionType}`,
      metadata: {
        projectId,
        interactionType,
        timestamp: Date.now()
      }
    });
  }

  trackChatbotUsage(messageType: 'user' | 'ai', content: string, responseTime?: number) {
    this.trackEvent({
      action: 'chatbot_message',
      category: 'ai_assistant',
      label: messageType,
      value: responseTime,
      metadata: {
        messageLength: content.length,
        timestamp: Date.now(),
        hasKeywords: this.detectKeywords(content)
      }
    });
  }

  trackVoiceCommand(event: CustomEvent) {
    const { command, section, success } = event.detail;
    this.trackEvent({
      action: 'voice_command',
      category: 'accessibility',
      label: command,
      value: success ? 1 : 0,
      section,
      metadata: {
        command,
        success,
        timestamp: Date.now()
      }
    });
  }

  track3DInteraction(event: CustomEvent) {
    const { object, action, duration } = event.detail;
    this.trackEvent({
      action: '3d_interaction',
      category: 'immersive',
      label: `${object}_${action}`,
      value: duration,
      metadata: {
        object,
        action,
        duration,
        timestamp: Date.now()
      }
    });
  }

  trackLiquidGlassEffect(effectType: string, performanceImpact: number) {
    this.trackEvent({
      action: 'liquid_glass_effect',
      category: 'visual_effects',
      label: effectType,
      value: performanceImpact,
      metadata: {
        effectType,
        performanceImpact,
        supportsBackdropFilter: CSS.supports('backdrop-filter', 'blur(10px)'),
        timestamp: Date.now()
      }
    });
  }

  private trackMouseMovement(event: MouseEvent) {
    // Échantillonnage pour éviter la surcharge
    if (Math.random() < 0.01) { // 1% des mouvements
      this.heatmapData.push({
        x: event.clientX,
        y: event.clientY,
        timestamp: Date.now()
      });
    }
  }

  private trackScrollBehavior() {
    const scrollPercentage = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

    this.trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: 'scroll_percentage',
      value: Math.round(scrollPercentage),
      metadata: {
        scrollY: window.scrollY,
        maxScroll: document.body.scrollHeight - window.innerHeight,
        timestamp: Date.now()
      }
    });
  }

  private trackPerformanceMetrics() {
    // Web Vitals
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.trackEvent({
            action: 'page_load_performance',
            category: 'performance',
            label: 'navigation_timing',
            value: navEntry.loadEventEnd - navEntry.fetchStart,
            metadata: {
              domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.fetchStart,
              firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
              firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
            }
          });
        }
      }
    }).observe({ type: 'navigation', buffered: true });

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];

      this.trackEvent({
        action: 'largest_contentful_paint',
        category: 'performance',
        label: 'lcp',
        value: lastEntry.startTime,
        metadata: {
          element: lastEntry.element?.tagName || 'unknown',
          timestamp: Date.now()
        }
      });
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }

  private detectKeywords(content: string): string[] {
    const keywords = [
      'projet', 'collaboration', 'blockchain', 'vr', 'ar', 'ia', 'intelligence artificielle',
      'portfolio', 'compétences', 'technologies', 'développement', 'innovation'
    ];

    return keywords.filter(keyword =>
      content.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  private trackEvent(event: AnalyticsEvent) {
    this.interactions.push(event);

    // Envoi vers Google Analytics 4 si disponible
    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameters: event.metadata
      });
    }

    // Envoi vers analytics personnalisé
    this.sendToCustomAnalytics(event);

    // Stockage local pour analyse hors ligne
    this.saveToLocalStorage(event);
  }

  private async sendToCustomAnalytics(event: AnalyticsEvent) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          event,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.warn('Analytics API unavailable:', error);
    }
  }

  private saveToLocalStorage(event: AnalyticsEvent) {
    try {
      const stored = localStorage.getItem('portfolio_analytics') || '[]';
      const analytics = JSON.parse(stored);
      analytics.push(event);

      // Limiter à 1000 événements max
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
      }

      localStorage.setItem('portfolio_analytics', JSON.stringify(analytics));
    } catch (error) {
      console.warn('Local storage unavailable for analytics');
    }
  }

  // Rapport de session
  generateSessionReport() {
    const sessionDuration = Date.now() - this.startTime;
    const uniqueCategories = [...new Set(this.interactions.map(i => i.category))];
    const mostActiveSection = this.getMostActiveSection();

    return {
      sessionId: this.sessionId,
      duration: sessionDuration,
      totalInteractions: this.interactions.length,
      categoriesUsed: uniqueCategories,
      mostActiveSection,
      heatmapPoints: this.heatmapData.length,
      performanceScore: this.calculatePerformanceScore(),
      engagementScore: this.calculateEngagementScore()
    };
  }

  private getMostActiveSection(): string {
    const sectionCounts: Record<string, number> = {};
    this.interactions.forEach(interaction => {
      if (interaction.section) {
        sectionCounts[interaction.section] = (sectionCounts[interaction.section] || 0) + 1;
      }
    });

    return Object.entries(sectionCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'unknown';
  }

  private calculatePerformanceScore(): number {
    const perfEvents = this.interactions.filter(i => i.category === 'performance');
    if (perfEvents.length === 0) return 0;

    const avgLoadTime = perfEvents.reduce((sum, event) => sum + (event.value || 0), 0) / perfEvents.length;
    return Math.max(0, 100 - (avgLoadTime / 100)); // Score sur 100
  }

  private calculateEngagementScore(): number {
    const sessionDuration = Date.now() - this.startTime;
    const interactionRate = this.interactions.length / (sessionDuration / 1000); // interactions/seconde
    const sectionsVisited = new Set(this.interactions.map(i => i.section)).size;

    return Math.min(100, (interactionRate * 50) + (sectionsVisited * 10));
  }
}

// Hook React pour utiliser l'analytics
export function useAdvancedAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const analytics = new AdvancedAnalytics();

    // Tracking automatique de la page
    analytics.trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: pathname,
      metadata: {
        referrer: document.referrer,
        timestamp: Date.now()
      }
    });

    // Nettoyage avant départ de la page
    const handleBeforeUnload = () => {
      const report = analytics.generateSessionReport();
      navigator.sendBeacon('/api/analytics/session', JSON.stringify(report));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Exposer l'analytics globalement pour les autres composants
    window.portfolioAnalytics = analytics;

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);

  const trackSectionView = useCallback((section: string, timeSpent?: number) => {
    window.portfolioAnalytics?.trackSectionView(section, timeSpent);
  }, []);

  const trackProjectInteraction = useCallback((projectId: string, type: any) => {
    window.portfolioAnalytics?.trackProjectInteraction(projectId, type);
  }, []);

  const trackChatbotUsage = useCallback((type: any, content: string, responseTime?: number) => {
    window.portfolioAnalytics?.trackChatbotUsage(type, content, responseTime);
  }, []);

  return {
    trackSectionView,
    trackProjectInteraction,
    trackChatbotUsage
  };
}

// Déclaration TypeScript pour window
declare global {
  interface Window {
    portfolioAnalytics?: AdvancedAnalytics;
    gtag?: Function;
  }
}
