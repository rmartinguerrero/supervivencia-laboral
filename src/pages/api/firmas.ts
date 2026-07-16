import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

// Rate limiting: track IPs with timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_MAX = 1; // 1 request per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove old timestamps
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);

  if (validTimestamps.length >= RATE_LIMIT_MAX) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

function sanitizeText(text: string): string {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

interface Firma {
  id: string;
  alias: string;
  message: string;
  category: string;
  lang: string;
  timestamp: string;
  hidden: boolean;
}

export const GET: APIRoute = async ({ url }) => {
  const lang = url.searchParams.get('lang') || 'es';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '20');

  const storeName = lang === 'it' ? 'firme' : 'firmas';
  const store = getStore({ name: storeName });

  // Get all signatures for this language
  const { blobs } = await store.list();
  const firmas: Firma[] = [];

  for (const blob of blobs) {
    try {
      const firma = await store.get(blob.key, { type: 'json' }) as Firma;
      if (firma && !firma.hidden) {
        firmas.push(firma);
      }
    } catch {
      // Skip invalid entries
    }
  }

  // Sort by timestamp descending (newest first)
  firmas.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Paginate
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedFirmas = firmas.slice(start, end);

  return new Response(JSON.stringify({
    firmas: paginatedFirmas,
    total: firmas.length,
    page,
    totalPages: Math.ceil(firmas.length / limit),
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  // Rate limiting
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({
      error: 'Has firmado demasiado rápido. Espera un poco.',
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = await request.json();
  const { alias, message, category, lang } = body;

  // Validation
  if (!alias || typeof alias !== 'string' || alias.length > 50) {
    return new Response(JSON.stringify({
      error: 'El alias es obligatorio y no puede tener más de 50 caracteres.',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!message || typeof message !== 'string' || message.length > 500) {
    return new Response(JSON.stringify({
      error: 'El mensaje es obligatorio y no puede tener más de 500 caracteres.',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!category || typeof category !== 'string') {
    return new Response(JSON.stringify({
      error: 'Debes seleccionar una categoría.',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const validLangs = ['es', 'it'];
  if (!validLangs.includes(lang)) {
    return new Response(JSON.stringify({
      error: 'Idioma no válido.',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Store signature
  const storeName = lang === 'it' ? 'firme' : 'firmas';
  const store = getStore({ name: storeName });

  const firma: Firma = {
    id: crypto.randomUUID(),
    alias: sanitizeText(alias),
    message: sanitizeText(message),
    category: sanitizeText(category),
    lang,
    timestamp: new Date().toISOString(),
    hidden: false,
  };

  await store.setJSON(firma.id, firma);

  return new Response(JSON.stringify({
    success: true,
    firma,
  }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
