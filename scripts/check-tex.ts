// Vérifie que toutes les formules des leçons passent dans KaTeX (comme RichText et TexBlock).
//   npx --yes tsx@4.19.2 scripts/check-tex.ts
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import katex from 'katex';
import 'katex/contrib/mhchem';

const DIRS = ['content', 'content-bm', 'content-cecp'].map((d) => join(__dirname, '../lib/lessons', d));
const TEX_KEYS = new Set(['tex', 'result']);
const errors: string[] = [];

function check(tex: string, where: string) {
  try {
    katex.renderToString(tex, { throwOnError: true, strict: false });
  } catch (e) {
    errors.push(`${where} : ${(e as Error).message.split('\n')[0]}\n    ${tex.slice(0, 120)}`);
  }
}

function walk(value: unknown, where: string, key = '') {
  if (typeof value === 'string') {
    if (TEX_KEYS.has(key)) return check(value, where);
    const dollars = (value.match(/\$/g) ?? []).length;
    if (dollars % 2) errors.push(`${where} : nombre impair de $\n    ${value.slice(0, 120)}`);
    for (const m of value.matchAll(/\$([^$]+)\$/g)) check(m[1], where);
  } else if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${where}[${i}]`, key));
  else if (value && typeof value === 'object') {
    // Les réponses acceptées et les schémas ne passent pas par KaTeX.
    for (const [k, v] of Object.entries(value)) if (k !== 'accepted' && k !== 'diagram') walk(v, `${where}.${k}`, k);
  }
}

async function main() {
  for (const dir of DIRS) {
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
      const mod = await import(pathToFileURL(join(dir, file)).href);
      walk(mod.lesson ?? mod.exercises, `${dir.split(/[\\/]/).at(-1)}/${file}`);
    }
  }
  console.log(errors.length ? errors.join('\n') : 'Aucune erreur de formule.');
  process.exit(errors.length ? 1 : 0);
}

main();
