// Slug translation mapping ES <-> IT
// Maps URL slugs between languages so language switching works correctly

const slugMap: Record<string, Record<string, string>> = {
  // ES -> IT
  es: {
    'cuanto-falta-cobrar': 'quanto-mancano-stipendio',
    'cuanto-falta-viernes': 'quanto-mancano-venerdi',
    'calculadora-vida': 'calcolatrice-vita',
    'calculadora-jubilacion': 'calcolatrice-pensione',
    'libro-firmas': 'libro-firme',
    'pega-al-jefe': 'colpisci-il-boss',
  },
  // IT -> ES
  it: {
    'quanto-mancano-stipendio': 'cuanto-falta-cobrar',
    'quanto-mancano-venerdi': 'cuanto-falta-viernes',
    'calcolatrice-vita': 'calculadora-vida',
    'calcolatrice-pensione': 'calculadora-jubilacion',
    'libro-firme': 'libro-firmas',
    'colpisci-il-boss': 'pega-al-jefe',
  },
};

/**
 * Given a current path and a target language, return the equivalent path.
 * Examples:
 *   /es/cuanto-falta-cobrar -> /it/quanto-mancano-stipendio
 *   /it/libro-firme -> /es/libro-firmas
 *   /es -> /it
 *   /it -> /es
 */
export function translatePath(currentPath: string, targetLang: string): string {
  // Strip leading slash and language prefix
  const parts = currentPath.replace(/^\//, '').split('/');
  const currentLang = parts[0];

  if (currentLang !== 'es' && currentLang !== 'it') {
    // No language prefix found, just prepend target
    return `/${targetLang}`;
  }

  const slug = parts[1] || '';

  // Home page
  if (!slug) {
    return `/${targetLang}`;
  }

  // Translate the slug
  const mapping = slugMap[currentLang];
  const translatedSlug = mapping?.[slug] || slug;

  return `/${targetLang}/${translatedSlug}`;
}
