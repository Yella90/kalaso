// Lecture et vérification des réponses tapées par l'élève. Sans React.

/** Lit « 12,5 », « 12.5 », « 1 000 », « 1,2e-3 », « 1,2×10^-3 » ou « 1,2.10^-3 ». */
export function parseNumber(value: string): number | null {
  const cleaned = value
    .replace(/\s/g, '')
    .replace(',', '.')
    .replace(/[x×*]10\^?/i, 'e')
    .replace(/\.10\^/, 'e');
  if (!/^[-+]?(\d+(\.\d*)?|\.\d+)(e[-+]?\d+)?$/i.test(cleaned)) return null;
  return Number(cleaned);
}

/**
 * Forme comparable d'une réponse écrite : sans espaces, casse ni accents ; ² et ³ deviennent ^2 et ^3 ;
 * θ, α, β, π et √ s'écrivent aussi theta, alpha, beta, pi et racine (ou sqrt) ;
 * les points de multiplication, les virgules et les parenthèses sont ignorés.
 */
export function normalizeText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s+/g, '')
    .toLowerCase()
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/θ/g, 'theta')
    .replace(/α/g, 'alpha')
    .replace(/β/g, 'beta')
    .replace(/π/g, 'pi')
    .replace(/√|sqrt/g, 'racine')
    .replace(/[.*·×,()]/g, '');
}

export type Verdict = 'correct' | 'wrong' | 'invalid';

/** Tolérance absolue (exercices) ou relative (situations de la vie réelle, 0,03 = 3 %). */
export function checkNumber(input: string, expected: number, tolerance: number, relative = false): Verdict {
  const n = parseNumber(input);
  if (n === null) return 'invalid';
  const margin = relative ? Math.abs(expected) * tolerance : tolerance;
  return Math.abs(n - expected) <= margin ? 'correct' : 'wrong';
}

export function checkText(input: string, accepted: string[]): Verdict {
  if (!input.trim()) return 'invalid';
  const u = normalizeText(input);
  return accepted.some((a) => normalizeText(a) === u) ? 'correct' : 'wrong';
}
