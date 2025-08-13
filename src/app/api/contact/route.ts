import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// ——— Config ———
const EMAIL_RECIPIENT = process.env.CONTACT_RECIPIENT ?? 'tourekiame8@gmail.com';

// Rate limiting simple en mémoire (non persistant)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requêtes par minute par IP
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000)
    };
  }

  return { allowed: true };
}

// ——— Validation stricte avec Zod ———
const ContactSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Le nom contient des caractères invalides'),

  email: z.string()
    .email('Format d\'email invalide')
    .max(254, 'Email trop long'),

  company: z.string()
    .max(100, 'Nom d\'entreprise trop long')
    .optional(),

  projectType: z.enum([
    'web', 'mobile', 'vr-ar', 'ai', 'consulting', 'other'
  ], { required_error: 'Type de projet requis' }),

  budget: z.enum([
    'startup', 'small', 'medium', 'enterprise'
  ], { required_error: 'Budget requis' }),

  message: z.string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(5000, 'Le message ne peut pas dépasser 5000 caractères'),

  timeline: z.enum([
    'urgent', '1-month', '3-months', '6-months', 'flexible'
  ], { required_error: 'Timeline requise' }),
});

type ContactData = z.infer<typeof ContactSchema>;

// ——— Labels d'affichage ———
const LABELS = {
  projectType: {
    web: 'Application Web',
    mobile: 'Application Mobile',
    'vr-ar': 'VR/AR',
    ai: 'Intelligence Artificielle',
    consulting: 'Conseil Technique',
    other: 'Autre',
  },
  budget: {
    startup: 'Startup/MVP (5K - 15K €)',
    small: 'Petit projet (15K - 50K €)',
    medium: 'Projet moyen (50K - 150K €)',
    enterprise: 'Enterprise (150K+ €)',
  },
  timeline: {
    urgent: 'Urgent (< 1 mois)',
    '1-month': '1 mois',
    '3-months': '3 mois',
    '6-months': '6 mois',
    flexible: 'Flexible',
  },
} as const;

// ——— Configuration email sécurisée ———
function createTransporter() {
  if (process.env.NODE_ENV !== 'production') {
    // En développement, simulation uniquement
    return null;
  }

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.error('Variables EMAIL_USER/EMAIL_PASS manquantes en production');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });
}

export async function POST(request: NextRequest) {
  try {
    // ——— Rate limiting par IP ———
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-real-ip') ||
      'anonymous';

    const rl = rateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        {
          error: 'Trop de requêtes. Veuillez patienter avant de renvoyer un message.',
          retryAfter: rl.retryAfter
        },
        {
          status: 429,
          headers: rl.retryAfter ? { 'Retry-After': String(rl.retryAfter) } : {}
        }
      );
    }

    // ——— Validation du payload ———
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Requête JSON invalide' },
        { status: 400 }
      );
    }

    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Données invalides',
          details: parsed.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // ——— Formatage des données ———
    const formatted = {
      timestamp: new Date().toLocaleString('fr-FR', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone: 'Europe/Paris'
      }),
      contact: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        company: data.company?.trim() ?? 'Non spécifiée',
      },
      project: {
        type: LABELS.projectType[data.projectType],
        budget: LABELS.budget[data.budget],
        timeline: LABELS.timeline[data.timeline],
      },
      message: data.message.trim(),
      metadata: {
        ip: ip !== 'anonymous' ? ip.substring(0, 10) + '***' : 'anonymous', // IP partiellement masquée
        userAgent: request.headers.get('user-agent')?.substring(0, 100) || 'unknown',
      }
    };

    // ——— Génération du contenu email ———
    const subject = `🚀 Nouveau projet ${LABELS.projectType[data.projectType]} - ${formatted.contact.name}`;

    const emailText = `
Nouvelle demande de collaboration Portfolio Liquid Glass

Reçue le : ${formatted.timestamp}

=== CONTACT ===
Nom : ${formatted.contact.name}
Email : ${formatted.contact.email}
Entreprise : ${formatted.contact.company}

=== PROJET ===
Type : ${formatted.project.type}
Budget : ${formatted.project.budget}
Timeline : ${formatted.project.timeline}

=== MESSAGE ===
${formatted.message}

=== ACTIONS RECOMMANDÉES ===
- Répondre dans les 24h pour maintenir l'engagement
- Proposer un appel via Setmore : https://kiame.setmore.com
- Préparer un devis personnalisé selon le budget
${data.timeline === 'urgent' ? '\n⚠️ URGENT : Le client souhaite une réponse rapide' : ''}

---
Envoyé depuis le portfolio Liquid Glass - kiametoure.me
    `.trim();

    const emailHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de collaboration</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 24px; text-align: center; }
        .content { padding: 24px; }
        .section { background: #f8f9fa; margin: 16px 0; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; }
        .label { font-weight: 600; color: #667eea; display: inline-block; min-width: 100px; }
        .urgent { background: #fff3cd; border-left-color: #ffc107; }
        .high-budget { background: #d1ecf1; border-left-color: #17a2b8; }
        .footer { background: #f8f9fa; padding: 16px; text-align: center; font-size: 14px; color: #6c757d; }
        .cta { background: #667eea; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🚀 Nouvelle demande de collaboration</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.9;">Portfolio Liquid Glass</p>
            <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.8;">Reçue le ${formatted.timestamp}</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 style="margin-top: 0; color: #333;">👤 Contact</h2>
                <p><span class="label">Nom :</span> ${formatted.contact.name}</p>
                <p><span class="label">Email :</span> <a href="mailto:${formatted.contact.email}" style="color: #667eea;">${formatted.contact.email}</a></p>
                <p><span class="label">Entreprise :</span> ${formatted.contact.company}</p>
            </div>

            <div class="section ${data.budget === 'enterprise' ? 'high-budget' : ''}">
                <h2 style="margin-top: 0; color: #333;">💼 Projet</h2>
                <p><span class="label">Type :</span> ${formatted.project.type}</p>
                <p><span class="label">Budget :</span> ${formatted.project.budget}</p>
                <p><span class="label">Timeline :</span> ${formatted.project.timeline}</p>
            </div>

            <div class="section ${data.timeline === 'urgent' ? 'urgent' : ''}">
                <h2 style="margin-top: 0; color: #333;">💬 Message</h2>
                <div style="white-space: pre-wrap; padding: 12px; background: white; border-radius: 4px; border: 1px solid #e9ecef;">${formatted.message}</div>
                ${data.timeline === 'urgent' ? '<p style="color: #dc3545; font-weight: bold; margin-top: 16px;">⚠️ URGENT : Réponse rapide demandée</p>' : ''}
            </div>

            <div class="section">
                <h2 style="margin-top: 0; color: #333;">🎯 Actions recommandées</h2>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="mailto:${formatted.contact.email}?subject=Re: ${subject}" class="cta">Répondre par email</a>
                    <a href="https://kiame.setmore.com" class="cta" target="_blank">Planifier un appel</a>
                </div>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Répondre dans les 24h pour maintenir l'engagement</li>
                    <li>Préparer un devis personnalisé selon le budget</li>
                    <li>Proposer une démonstration des capacités Liquid Glass</li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <p style="margin: 0;">Envoyé depuis le portfolio Liquid Glass</p>
            <p style="margin: 4px 0 0 0;"><a href="https://kiametoure.me" style="color: #667eea; text-decoration: none;">kiametoure.me</a></p>
        </div>
    </div>
</body>
</html>
    `.trim();

    // ——— Tentative d'envoi email sécurisé ———
    let emailSent = false;
    try {
      const transporter = createTransporter();
      if (transporter) {
        await transporter.sendMail({
          from: `"Portfolio Liquid Glass" <${process.env.EMAIL_USER}>`,
          to: EMAIL_RECIPIENT,
          subject,
          text: emailText,
          html: emailHTML,
          replyTo: formatted.contact.email,
          headers: {
            'X-Priority': data.timeline === 'urgent' ? '1' : '3',
            'X-Portfolio-Type': data.projectType,
            'X-Budget-Range': data.budget,
          }
        });
        emailSent = true;
        console.log(`✅ Email envoyé pour ${formatted.contact.name} (${data.projectType})`);
      } else {
        console.log(`📧 Mode développement - Email simulé pour ${formatted.contact.name}`);
      }
    } catch (emailError) {
      console.error('❌ Erreur envoi email:', emailError);
      // Continue sans faire échouer la requête
    }

    // ——— Journalisation sécurisée (dev uniquement) ———
    if (process.env.NODE_ENV !== 'production') {
      try {
        const fs = await import('fs/promises');
        const path = await import('path');

        const logsDir = path.join(process.cwd(), 'logs');
        await fs.mkdir(logsDir, { recursive: true });

        const filename = `contact-${Date.now()}.json`;
        const logData = {
          ...formatted,
          emailSent,
          environment: 'development'
        };

        await fs.writeFile(
          path.join(logsDir, filename),
          JSON.stringify(logData, null, 2)
        );
        console.log(`📝 Contact sauvegardé: ${filename}`);
      } catch (logError) {
        console.warn('⚠️ Impossible de sauvegarder le log:', logError);
      }
    }

    // ——— Réponse de succès ———
    return NextResponse.json({
      success: true,
      message: emailSent
        ? 'Votre message a été envoyé avec succès ! Vous recevrez une réponse dans les 24h.'
        : 'Votre message a été reçu ! Vous recevrez une réponse dans les 24h.',
      timestamp: new Date().toISOString(),
      contact: {
        email: EMAIL_RECIPIENT,
        setmore: 'https://kiame.setmore.com'
      }
    });

  } catch (error) {
    console.error('❌ Erreur serveur API Contact:', error);

    return NextResponse.json(
      {
        error: 'Une erreur interne s\'est produite. Veuillez réessayer dans quelques minutes.',
        contact: {
          email: EMAIL_RECIPIENT,
          phones: ['+33 751256684', '+34 613817372']
        },
        ...(process.env.NODE_ENV === 'development' && {
          details: error instanceof Error ? error.message : 'Erreur inconnue'
        })
      },
      { status: 500 }
    );
  }
}

// ——— Endpoint de vérification de santé ———
export async function GET() {
  return NextResponse.json({
    status: 'operational',
    message: 'API Contact Portfolio Liquid Glass',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    features: [
      'Rate limiting',
      'Validation Zod',
      'Email sécurisé',
      'Logging dev-only'
    ]
  });
}
