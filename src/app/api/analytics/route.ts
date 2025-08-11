import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema de validation pour les événements analytics
const analyticsEventSchema = z.object({
  sessionId: z.string(),
  event: z.object({
    action: z.string(),
    category: z.string(),
    label: z.string().optional(),
    value: z.number().optional(),
    section: z.string().optional(),
    metadata: z.record(z.any()).optional()
  }),
  userAgent: z.string(),
  timestamp: z.number()
});

const sessionReportSchema = z.object({
  sessionId: z.string(),
  duration: z.number(),
  totalInteractions: z.number(),
  categoriesUsed: z.array(z.string()),
  mostActiveSection: z.string(),
  heatmapPoints: z.number(),
  performanceScore: z.number(),
  engagementScore: z.number()
});

// Base de données simulée (remplacer par une vraie DB en production)
let analyticsData: any[] = [];
let sessionsData: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';

    // Validation des données
    const validatedData = analyticsEventSchema.parse(body);

    // Enrichissement des données
    const enrichedEvent = {
      ...validatedData,
      ip: clientIP,
      receivedAt: Date.now(),
      userCountry: request.geo?.country || 'unknown',
      userCity: request.geo?.city || 'unknown'
    };

    // Stockage (en production, utiliser une vraie base de données)
    analyticsData.push(enrichedEvent);

    // Calculs en temps réel
    const insights = calculateRealTimeInsights(enrichedEvent);

    // Log pour monitoring
    console.log(`📊 Analytics Event: ${validatedData.event.action} from ${clientIP}`);

    return NextResponse.json({
      success: true,
      insights,
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('❌ Analytics API Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid analytics data',
          errors: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Analytics processing failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '24h';
    const metric = searchParams.get('metric') || 'overview';

    // Calcul de la période
    const now = Date.now();
    const periods = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };

    const period = periods[timeframe as keyof typeof periods] || periods['24h'];
    const startTime = now - period;

    // Filtrage des données
    const filteredData = analyticsData.filter(
      event => event.receivedAt >= startTime
    );

    // Génération du rapport selon la métrique demandée
    let report;

    switch (metric) {
      case 'overview':
        report = generateOverviewReport(filteredData);
        break;
      case 'sections':
        report = generateSectionsReport(filteredData);
        break;
      case 'performance':
        report = generatePerformanceReport(filteredData);
        break;
      case 'engagement':
        report = generateEngagementReport(filteredData);
        break;
      case 'widgets':
        report = generateWidgetsReport(filteredData);
        break;
      default:
        report = generateOverviewReport(filteredData);
    }

    return NextResponse.json({
      success: true,
      timeframe,
      metric,
      period: { start: startTime, end: now },
      data: report,
      meta: {
        totalEvents: filteredData.length,
        uniqueSessions: new Set(filteredData.map(e => e.sessionId)).size,
        generatedAt: now
      }
    });

  } catch (error) {
    console.error('❌ Analytics GET Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate analytics report' },
      { status: 500 }
    );
  }
}

// Endpoint pour les rapports de session
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedSession = sessionReportSchema.parse(body);

    sessionsData.push({
      ...validatedSession,
      receivedAt: Date.now(),
      ip: request.headers.get('x-forwarded-for') || 'unknown'
    });

    console.log(`📋 Session Report: ${validatedSession.sessionId} (${validatedSession.duration}ms)`);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Session Report Error:', error);
    return NextResponse.json(
      { success: false, message: 'Session report failed' },
      { status: 500 }
    );
  }
}

// Fonctions utilitaires pour les calculs
function calculateRealTimeInsights(event: any) {
  const recentEvents = analyticsData.slice(-100); // 100 derniers événements

  return {
    popularActions: getTopActions(recentEvents),
    activeSection: getMostActiveSection(recentEvents),
    engagementTrend: calculateEngagementTrend(recentEvents),
    performanceMetrics: getPerformanceMetrics(recentEvents)
  };
}

function generateOverviewReport(data: any[]) {
  const uniqueSessions = new Set(data.map(e => e.sessionId));
  const uniqueCountries = new Set(data.map(e => e.userCountry));

  return {
    summary: {
      totalEvents: data.length,
      uniqueVisitors: uniqueSessions.size,
      countries: uniqueCountries.size,
      avgEventsPerSession: data.length / uniqueSessions.size || 0
    },
    topActions: getTopActions(data),
    topSections: getTopSections(data),
    geographicDistribution: getGeographicDistribution(data),
    timeDistribution: getTimeDistribution(data)
  };
}

function generateSectionsReport(data: any[]) {
  const sectionEvents = data.filter(e => e.event.section);

  return {
    sectionViews: getSectionViews(sectionEvents),
    sectionEngagement: getSectionEngagement(sectionEvents),
    navigationPatterns: getNavigationPatterns(sectionEvents),
    sectionPerformance: getSectionPerformance(sectionEvents)
  };
}

function generatePerformanceReport(data: any[]) {
  const perfEvents = data.filter(e => e.event.category === 'performance');

  return {
    loadTimes: getLoadTimeMetrics(perfEvents),
    coreWebVitals: getCoreWebVitals(perfEvents),
    liquidGlassPerformance: getLiquidGlassMetrics(perfEvents),
    devicePerformance: getDevicePerformance(perfEvents)
  };
}

function generateEngagementReport(data: any[]) {
  return {
    interactionRates: getInteractionRates(data),
    dwellTime: getDwellTimeMetrics(data),
    conversionFunnels: getConversionFunnels(data),
    featureUsage: getFeatureUsage(data)
  };
}

function generateWidgetsReport(data: any[]) {
  const widgetEvents = data.filter(e =>
    ['voice_command', 'chatbot_message', '3d_interaction'].includes(e.event.action)
  );

  return {
    voiceCommandsUsage: getVoiceCommandsMetrics(widgetEvents),
    chatbotEngagement: getChatbotMetrics(widgetEvents),
    threeDInteractions: get3DMetrics(widgetEvents),
    widgetPreferences: getWidgetPreferences(widgetEvents)
  };
}

// Fonctions d'analyse spécialisées
function getTopActions(data: any[]) {
  const actionCounts: Record<string, number> = {};
  data.forEach(event => {
    actionCounts[event.event.action] = (actionCounts[event.event.action] || 0) + 1;
  });

  return Object.entries(actionCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([action, count]) => ({ action, count }));
}

function getTopSections(data: any[]) {
  const sectionCounts: Record<string, number> = {};
  data.forEach(event => {
    if (event.event.section) {
      sectionCounts[event.event.section] = (sectionCounts[event.event.section] || 0) + 1;
    }
  });

  return Object.entries(sectionCounts)
    .sort(([,a], [,b]) => b - a)
    .map(([section, count]) => ({ section, count }));
}

function getMostActiveSection(data: any[]) {
  const sections = getTopSections(data);
  return sections[0]?.section || 'unknown';
}

function getGeographicDistribution(data: any[]) {
  const countryCounts: Record<string, number> = {};
  data.forEach(event => {
    if (event.userCountry !== 'unknown') {
      countryCounts[event.userCountry] = (countryCounts[event.userCountry] || 0) + 1;
    }
  });

  return Object.entries(countryCounts)
    .sort(([,a], [,b]) => b - a)
    .map(([country, count]) => ({ country, count }));
}

function getTimeDistribution(data: any[]) {
  const hourCounts: Record<number, number> = {};
  data.forEach(event => {
    const hour = new Date(event.receivedAt).getHours();
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });

  return Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => a.hour - b.hour);
}

function calculateEngagementTrend(data: any[]) {
  if (data.length < 2) return 'stable';

  const recent = data.slice(-20);
  const older = data.slice(-40, -20);

  const recentEngagement = recent.length / 20;
  const olderEngagement = older.length / 20;

  const change = (recentEngagement - olderEngagement) / olderEngagement;

  if (change > 0.1) return 'increasing';
  if (change < -0.1) return 'decreasing';
  return 'stable';
}

function getPerformanceMetrics(data: any[]) {
  const perfEvents = data.filter(e => e.event.category === 'performance');

  if (perfEvents.length === 0) return null;

  const loadTimes = perfEvents
    .filter(e => e.event.action === 'page_load_performance')
    .map(e => e.event.value)
    .filter(v => v !== undefined);

  if (loadTimes.length === 0) return null;

  return {
    avgLoadTime: loadTimes.reduce((a, b) => a + b, 0) / loadTimes.length,
    minLoadTime: Math.min(...loadTimes),
    maxLoadTime: Math.max(...loadTimes),
    samples: loadTimes.length
  };
}

// Fonctions spécialisées pour les rapports détaillés
function getSectionViews(data: any[]) {
  return getTopSections(data);
}

function getSectionEngagement(data: any[]) {
  const sectionEngagement: Record<string, any> = {};

  data.forEach(event => {
    if (!event.event.section) return;

    if (!sectionEngagement[event.event.section]) {
      sectionEngagement[event.event.section] = {
        section: event.event.section,
        totalEvents: 0,
        uniqueSessions: new Set(),
        avgTimeSpent: 0
      };
    }

    sectionEngagement[event.event.section].totalEvents++;
    sectionEngagement[event.event.section].uniqueSessions.add(event.sessionId);
  });

  return Object.values(sectionEngagement).map((section: any) => ({
    ...section,
    uniqueSessions: section.uniqueSessions.size,
    engagementRate: section.totalEvents / section.uniqueSessions
  }));
}

function getNavigationPatterns(data: any[]) {
  const patterns: Record<string, number> = {};
  const sessionPaths: Record<string, string[]> = {};

  // Grouper par session
  data.forEach(event => {
    if (!event.event.section) return;

    if (!sessionPaths[event.sessionId]) {
      sessionPaths[event.sessionId] = [];
    }
    sessionPaths[event.sessionId].push(event.event.section);
  });

  // Analyser les patterns de navigation
  Object.values(sessionPaths).forEach(path => {
    for (let i = 0; i < path.length - 1; i++) {
      const pattern = `${path[i]} → ${path[i + 1]}`;
      patterns[pattern] = (patterns[pattern] || 0) + 1;
    }
  });

  return Object.entries(patterns)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([pattern, count]) => ({ pattern, count }));
}

function getVoiceCommandsMetrics(data: any[]) {
  const voiceEvents = data.filter(e => e.event.action === 'voice_command');
  const commands: Record<string, number> = {};
  let successRate = 0;

  voiceEvents.forEach(event => {
    const command = event.event.metadata?.command || 'unknown';
    commands[command] = (commands[command] || 0) + 1;

    if (event.event.value === 1) successRate++;
  });

  return {
    totalCommands: voiceEvents.length,
    successRate: voiceEvents.length > 0 ? (successRate / voiceEvents.length) * 100 : 0,
    popularCommands: Object.entries(commands)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([command, count]) => ({ command, count }))
  };
}

function getChatbotMetrics(data: any[]) {
  const chatEvents = data.filter(e => e.event.action === 'chatbot_message');
  const userMessages = chatEvents.filter(e => e.event.label === 'user');
  const aiMessages = chatEvents.filter(e => e.event.label === 'ai');

  return {
    totalInteractions: chatEvents.length,
    userMessages: userMessages.length,
    aiResponses: aiMessages.length,
    avgResponseTime: aiMessages.reduce((sum, msg) => sum + (msg.event.value || 0), 0) / aiMessages.length || 0,
    engagementRate: userMessages.length > 0 ? (aiMessages.length / userMessages.length) * 100 : 0
  };
}

function get3DMetrics(data: any[]) {
  const threeDEvents = data.filter(e => e.event.action === '3d_interaction');
  const interactions: Record<string, number> = {};

  threeDEvents.forEach(event => {
    const object = event.event.metadata?.object || 'unknown';
    interactions[object] = (interactions[object] || 0) + 1;
  });

  return {
    totalInteractions: threeDEvents.length,
    avgDuration: threeDEvents.reduce((sum, evt) => sum + (evt.event.value || 0), 0) / threeDEvents.length || 0,
    popularObjects: Object.entries(interactions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([object, count]) => ({ object, count }))
  };
}

function getWidgetPreferences(data: any[]) {
  const widgetUsage = {
    voiceControls: data.filter(e => e.event.action === 'voice_command').length,
    chatbot: data.filter(e => e.event.action === 'chatbot_message').length,
    portfolio3D: data.filter(e => e.event.action === '3d_interaction').length
  };

  const total = Object.values(widgetUsage).reduce((a, b) => a + b, 0);

  return Object.entries(widgetUsage).map(([widget, usage]) => ({
    widget,
    usage,
    percentage: total > 0 ? (usage / total) * 100 : 0
  }));
}

// Fonctions utilitaires supplémentaires pour les métriques spécialisées
function getLoadTimeMetrics(data: any[]) {
  const loadEvents = data.filter(e => e.event.action === 'page_load_performance');
  const times = loadEvents.map(e => e.event.value).filter(v => v !== undefined);

  if (times.length === 0) return null;

  times.sort((a, b) => a - b);

  return {
    average: times.reduce((a, b) => a + b, 0) / times.length,
    median: times[Math.floor(times.length / 2)],
    p95: times[Math.floor(times.length * 0.95)],
    min: times[0],
    max: times[times.length - 1]
  };
}

function getCoreWebVitals(data: any[]) {
  const lcpEvents = data.filter(e => e.event.action === 'largest_contentful_paint');

  return {
    lcp: {
      average: lcpEvents.reduce((sum, e) => sum + (e.event.value || 0), 0) / lcpEvents.length || 0,
      samples: lcpEvents.length
    }
  };
}

function getLiquidGlassMetrics(data: any[]) {
  const glassEvents = data.filter(e => e.event.action === 'liquid_glass_effect');

  return {
    effectsTriggered: glassEvents.length,
    avgPerformanceImpact: glassEvents.reduce((sum, e) => sum + (e.event.value || 0), 0) / glassEvents.length || 0,
    supportRate: glassEvents.filter(e => e.event.metadata?.supportsBackdropFilter).length / glassEvents.length * 100 || 0
  };
}
