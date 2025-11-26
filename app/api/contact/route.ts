import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import validator from 'validator';

// Map pour rate limiting simple (en mémoire)
const requestCounts = new Map<string, { count: number; timestamp: number }>();

// Fonction de rate limiting
function checkRateLimit(ip: string): { allowed: boolean; remaining?: number } {
  const now = Date.now();
  const windowMs = 3600000; // 1 heure
  const maxRequests = 5; // 5 requêtes max par heure

  const record = requestCounts.get(ip);

  // Nettoyer les anciennes entrées (plus de 1h)
  if (record && now - record.timestamp > windowMs) {
    requestCounts.delete(ip);
  }

  const currentRecord = requestCounts.get(ip);

  if (!currentRecord) {
    requestCounts.set(ip, { count: 1, timestamp: now });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (currentRecord.count >= maxRequests) {
    return { allowed: false };
  }

  currentRecord.count++;
  return { allowed: true, remaining: maxRequests - currentRecord.count };
}

export async function POST(request: Request) {
  try {
    // Rate limiting basé sur l'IP
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimitResult = checkRateLimit(ip);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Trop de requêtes. Veuillez réessayer dans une heure.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'Retry-After': '3600'
          }
        }
      );
    }

    const { name, email, message } = await request.json();

    // Validation basique des champs requis
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Validation stricte de l'email
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Validation de la longueur des champs
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Le nom ne peut pas dépasser 100 caractères' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Le message ne peut pas dépasser 2000 caractères' },
        { status: 400 }
      );
    }

    // Sanitization des inputs pour prévenir XSS
    const sanitizedName = validator.escape(validator.trim(name));
    const sanitizedEmail = validator.normalizeEmail(email) || email.trim().toLowerCase();
    const sanitizedMessage = validator.escape(validator.trim(message));

    // Vérifier que les variables d'environnement sont définies
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non définie');
      return NextResponse.json(
        { error: 'Configuration serveur incomplète' },
        { status: 500 }
      );
    }

    // Initialiser Resend ici pour éviter les erreurs au build
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Envoyer l'email via Resend avec les données sanitizées
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: `Nouveau message de contact - VraiÂge`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedMessage.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: sanitizedEmail,
    });

    return NextResponse.json(
      { message: 'Email envoyé avec succès', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    );
  }
}
