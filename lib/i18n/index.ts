import { bm } from './bm';
import { fr, type Dictionary } from './fr';

export type { Dictionary };

export const LOCALES = ['fr', 'bm'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

/** Code de langue pour l'attribut `lang` du HTML (ISO 639-1 : bm = bambara). */
export const HTML_LANG: Record<Locale, string> = { fr: 'fr', bm: 'bm' };

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Recouvre le dictionnaire de base par les traductions disponibles, clé par clé. */
function merge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override ?? base) as T;
  }
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    if (value !== undefined) out[key] = merge((base as Record<string, unknown>)[key], value);
  }
  return out as T;
}

const DICTIONARIES: Record<Locale, Dictionary> = {
  fr,
  bm: merge(fr, bm),
};

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Remplace les `{clé}` d'un texte par les valeurs données. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
