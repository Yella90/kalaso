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

/** Ignore espaces, casse et accents ; « , » vaut « . » ; ² et ³ deviennent ^2 et ^3. */
export function normalizeText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase()
    .replace(/,/g, '.')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3');
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
