// Importe les cours, exercices corrigés et situations réelles du site cecp (projet physique-3d)
// dans les leçons de 12e de Kalanso : lib/lessons/content-cecp/.
//
// Lancement, depuis le dossier physique-3d (pour ses alias « @/ ») :
//   npx --yes tsx@4.19.2 ../kalanso/scripts/import-cecp.ts
//
// Les cours de cecp sont des composants React sans état : on les appelle, puis on parcourt
// l'arbre d'éléments obtenu, dont les textes sont déjà évalués.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import Module from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Block, Diagram, Exercise, Lesson, LessonSection } from '../lib/lessons/types';
import { fixFrench } from './cecp-orthographe';

// Les composants de cecp importent la feuille de style de KaTeX : Node ne sait pas la lire.
// tsx les charge en CommonJS (physique-3d n'est pas un paquet « module ») : on ignore les .css.
(Module as unknown as { _extensions: Record<string, () => void> })._extensions['.css'] = () => {};

const KALANSO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CECP = resolve(process.argv[2] ?? process.cwd());
const OUT = join(KALANSO, 'lib/lessons/content-cecp');

/** Chapitre cecp → chapitre de 12e dans Kalanso. */
const CHAPTERS: { slug: string; subject: 'physique' | 'chimie'; id: string }[] = [
  { slug: 'cinematique', subject: 'physique', id: 'centre-inertie' },
  { slug: 'projectile', subject: 'physique', id: 'projectile' },
  { slug: 'systeme-solaire', subject: 'physique', id: 'gravitation' },
  { slug: 'satellite', subject: 'physique', id: 'satellite' },
  { slug: 'particule-chargee', subject: 'physique', id: 'particule-champ-electrique' },
  { slug: 'champ-magnetique', subject: 'physique', id: 'particule-champ-magnetique' },
  { slug: 'calorimetrie', subject: 'physique', id: 'calorimetrie' },
  { slug: 'auto-induction', subject: 'physique', id: 'auto-induction' },
  { slug: 'transformateurs', subject: 'physique', id: 'transformateurs-alternateurs' },
  { slug: 'ondes-progressives', subject: 'physique', id: 'ondes-progressives' },
  { slug: 'interferences-mecaniques', subject: 'physique', id: 'interferences-mecaniques' },
  { slug: 'interferences-lumineuses', subject: 'physique', id: 'interferences-lumineuses' },
  { slug: 'laser', subject: 'physique', id: 'laser' },
  { slug: 'pendule-elastique', subject: 'physique', id: 'pendule-elastique' },
  { slug: 'pendule-torsion', subject: 'physique', id: 'pendule-torsion' },
  { slug: 'pendule-pesant', subject: 'physique', id: 'pendule-pesant' },
  { slug: 'circuit-oscillant', subject: 'physique', id: 'circuit-oscillant' },
  { slug: 'ondes-electromagnetiques', subject: 'physique', id: 'ondes-electromagnetiques' },
  { slug: 'oscillations-mecaniques-forcees', subject: 'physique', id: 'oscillations-mecaniques-forcees' },
  { slug: 'oscillations-electriques-forcees', subject: 'physique', id: 'oscillations-electriques-forcees' },
  { slug: 'effet-photoelectrique', subject: 'physique', id: 'effet-photoelectrique' },
  { slug: 'niveaux-energie', subject: 'physique', id: 'niveaux-energie' },
  { slug: 'rayons-x', subject: 'physique', id: 'rayons-x' },
  { slug: 'noyau-atomique', subject: 'physique', id: 'noyau' },
  { slug: 'radioactivite', subject: 'physique', id: 'reactions-nucleaires' },
  { slug: 'stereochimie', subject: 'chimie', id: 'stereochimie' },
  { slug: 'alcools', subject: 'chimie', id: 'alcools' },
  { slug: 'amines', subject: 'chimie', id: 'amines' },
  { slug: 'acides-carboxyliques', subject: 'chimie', id: 'acides-carboxyliques' },
  { slug: 'acides-amines', subject: 'chimie', id: 'acides-amines' },
];

const load = (path: string) => import(pathToFileURL(join(CECP, path)).href);

// ---------------------------------------------------------------------------
//  Arbre d'éléments React → blocs Kalanso
// ---------------------------------------------------------------------------

interface El {
  type: unknown;
  props: Record<string, unknown> & { children?: unknown };
}
const isEl = (x: unknown): x is El => typeof x === 'object' && x !== null && 'type' in x && 'props' in x;
const nameOf = (el: El) => (typeof el.type === 'function' ? el.type.name : typeof el.type === 'string' ? el.type : '');

let TB: Record<string, unknown> = {};
let FormulaFn: unknown;
let InlineMathFn: unknown;
const warnings: string[] = [];

/** KaTeX refuse « · » dans \text{…} : on sort le point de la boîte de texte. */
function texDot(tex: string): string {
  return tex
    .replace(/\\text\{([^{}]*)\}/g, (_m, inner: string) => `\\text{${inner.split('·').join('}\\cdot\\text{')}}`)
    .replace(/·/g, '\\cdot ');
}

/** Dans un texte JSX, « \\dfrac » s'écrit avec deux barres : on n'en garde qu'une devant une commande. */
function fixTex(text: string): string {
  return text.replace(/\$[^$]+\$/g, (m) => texDot(m.replace(/\\\\(?=[a-zA-Z])/g, '\\')));
}

/** Chapitres de cecp tapés sans accents. */
const UNTYPED = new Set(['cinematique', 'projectile', 'satellite', 'particule-chargee']);
let untyped = false;
const fr = (s: string) => fixFrench(s, untyped);

const clean = (s: string) => fr(fixTex(s.replace(/\s+/g, ' ').trim()));

/** Texte en ligne : **gras** et $formules$, comme RichText. */
function inline(node: unknown): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(inline).join('');
  if (!isEl(node)) return '';
  const { type, props } = node;
  if (type === FormulaFn) return `$${String(props.children).trim()}$`;
  if (type === InlineMathFn) return String(props.children);
  switch (type) {
    case 'strong':
    case 'b': {
      const inner = inline(props.children).replace(/\*\*/g, '');
      return inner.trim() ? `**${inner}**` : inner;
    }
    case 'sub':
      return `$_{${inline(props.children)}}$`;
    case 'sup':
      return `$^{${inline(props.children)}}$`;
    case 'br':
      return ' ';
  }
  if (typeof type === 'function' && !Object.values(TB).includes(type)) return inline(expand(node));
  return inline(props.children);
}

function expand(el: El): unknown {
  try {
    return (el.type as (p: unknown) => unknown)(el.props);
  } catch (e) {
    warnings.push(`composant ${nameOf(el)} non lu : ${(e as Error).message}`);
    return null;
  }
}

const INLINE_TAGS = new Set(['strong', 'b', 'em', 'i', 'span', 'sub', 'sup', 'br', 'a', 'code']);
const isInline = (n: unknown) =>
  typeof n === 'string' ||
  typeof n === 'number' ||
  (isEl(n) && ((typeof n.type === 'string' && INLINE_TAGS.has(n.type)) || (n.type === FormulaFn && !n.props.block) || n.type === InlineMathFn));

const CALLOUT_VARIANTS = { success: 'retenir', warn: 'attention', default: 'remarque' } as const;

function blocks(node: unknown): Block[] {
  if (node == null || typeof node === 'boolean') return [];
  if (typeof node === 'string' || typeof node === 'number') {
    const text = clean(String(node));
    return text ? [{ kind: 'text', text }] : [];
  }
  if (Array.isArray(node)) {
    // Une phrase coupée par du JSX (texte, <strong>, formule en ligne) reste un seul paragraphe.
    const out: Block[] = [];
    let run: unknown[] = [];
    const flush = () => {
      const text = clean(inline(run));
      if (text) out.push({ kind: 'text', text });
      run = [];
    };
    for (const c of children(node)) {
      if (isInline(c)) run.push(c);
      else {
        flush();
        out.push(...blocks(c));
      }
    }
    flush();
    return out;
  }
  if (!isEl(node)) return [];
  const { type, props } = node;

  if (type === TB.P) return [{ kind: 'text', text: clean(inline(props.children)) }];
  if (type === TB.Bullets) return [{ kind: 'list', items: (props.items as string[]).map(clean) }];
  if (type === TB.KeyFormula) {
    return [
      {
        kind: 'formula',
        tex: texDot(String(props.tex)),
        ...(props.label ? { label: clean(String(props.label)) } : {}),
        ...(props.legend ? { legend: (props.legend as string[]).map(clean) } : {}),
      },
    ];
  }
  if (type === TB.DataTable) {
    return [
      {
        kind: 'table',
        head: (props.head as string[]).map(clean),
        rows: (props.rows as (string | number)[][]).map((r) => r.map((c) => clean(String(c)))),
      },
    ];
  }
  if (type === FormulaFn) {
    const tex = texDot(String(props.children).trim());
    return props.block ? [{ kind: 'formula', tex }] : [{ kind: 'text', text: `$${tex}$` }];
  }
  if (type === InlineMathFn) return [{ kind: 'text', text: clean(String(props.children)) }];
  // Encadré : celui de TheoryBlocks (kind) ou ceux, locaux, des premiers cours (variant).
  if (nameOf(node) === 'Callout') {
    const variant =
      (props.kind as 'retenir' | 'attention' | 'methode' | undefined) ??
      CALLOUT_VARIANTS[(props.variant as keyof typeof CALLOUT_VARIANTS) ?? 'default'];
    return [
      {
        kind: 'callout',
        variant,
        ...(props.title ? { title: clean(String(props.title)) } : {}),
        blocks: blocks(props.children),
      },
    ];
  }

  switch (type) {
    case 'p':
    case 'span':
    case 'strong':
    case 'em': {
      const text = clean(inline(node));
      return text ? [{ kind: 'text', text }] : [];
    }
    case 'h3':
    case 'h4':
    case 'h5':
      return [{ kind: 'text', text: `**${clean(inline(props.children)).replace(/\*\*/g, '')}**` }];
    case 'ul':
    case 'ol':
      return [{ kind: 'list', items: children(props.children).map((li) => clean(inline(isEl(li) ? li.props.children : li))).filter(Boolean) }];
    case 'table':
      return [readTable(node)];
  }
  if (typeof type === 'function') return blocks(expand(node));
  return blocks(props.children);
}

function children(node: unknown): unknown[] {
  if (Array.isArray(node)) return node.flatMap(children);
  if (node == null || typeof node === 'boolean') return [];
  if (isEl(node) && typeof node.type === 'symbol') return children(node.props.children);
  return [node];
}

function readTable(table: El): Block {
  const rows: string[][] = [];
  let head: string[] = [];
  const walk = (n: unknown) => {
    for (const c of children(n)) {
      if (!isEl(c)) continue;
      if (c.type === 'tr') {
        const cells = children(c.props.children).filter(isEl);
        const texts = cells.map((cell) => clean(inline(cell.props.children)));
        if (cells.every((cell) => cell.type === 'th') && head.length === 0) head = texts;
        else rows.push(texts);
      } else walk(c.props.children);
    }
  };
  walk(table.props.children);
  return { kind: 'table', head, rows };
}

/** Cours : en-tête (titre, sous-titre) puis sections numérotées. */
function readTheory(root: unknown): { hook: string; sections: LessonSection[] } {
  let hook = '';
  const sections: LessonSection[] = [];
  const loose: Block[] = [];

  const visit = (node: unknown) => {
    for (const c of children(node)) {
      if (!isEl(c)) continue;
      const name = nameOf(c);
      if (c.type === TB.TheoryArticle) {
        hook = clean(String(c.props.subtitle ?? ''));
        visit(c.props.children);
      } else if (c.type === TB.TheorySection || name === 'Section') {
        const title = clean(String(c.props.title)).replace(/^\d+\s*[.)–-]\s*/, '');
        sections.push({ title, blocks: blocks(c.props.children) });
      } else if (c.type === 'header') {
        // Premiers cours : « Cours théorique », titre, puis sous-titre.
        const ps = children(c.props.children).filter((x): x is El => isEl(x) && x.type === 'p');
        hook = clean(inline(ps.at(-1)?.props.children));
      } else if (c.type === 'article' || c.type === 'div' || typeof c.type === 'symbol') {
        visit(c.props.children);
      } else if (typeof c.type === 'function' && !Object.values(TB).includes(c.type)) {
        visit(expand(c));
      } else {
        loose.push(...blocks(c));
      }
    }
  };
  visit(root);
  if (loose.length) {
    if (sections.length) sections[0].blocks.unshift(...loose);
    else sections.push({ title: 'Cours', blocks: loose });
  }
  return { hook, sections };
}

// ---------------------------------------------------------------------------
//  Exercices et situations réelles
// ---------------------------------------------------------------------------

const round = (v: number) => (Number.isFinite(v) ? Number(v.toPrecision(8)) : v);
const roundPt = (p: { x: number; y: number }) => ({ x: round(p.x), y: round(p.y) });

interface CecpQuestion {
  kind?: 'numeric' | 'text';
  label: string;
  unit?: string;
  expected?: number;
  tolerance?: number;
  expectedDisplay?: string;
  acceptedAnswers?: string[];
  steps: string[];
  finalFormula: string;
}
interface CecpExercise {
  id: string;
  title: string;
  source?: string;
  statement: string;
  given: { label: string; value: string }[];
  diagram?: Record<string, unknown>;
  level?: 1 | 2 | 3;
  questions: CecpQuestion[];
}

/** Schéma générique de cecp ; l'animation (une fonction) est échantillonnée. */
function convertDiagram(d: Record<string, unknown> | undefined): Diagram | undefined {
  if (!d || !Array.isArray(d.elements)) return undefined;
  const anim = d.animation as
    | { duration: number; getPosition: (t: number) => { x: number; y: number }; color?: string; radius?: number; trail?: { x: number; y: number }[] }
    | undefined;
  const diagram: Diagram = {
    width: d.width as number,
    height: d.height as number,
    ...(d.groundLevel ? { groundLevel: d.groundLevel as number } : {}),
    elements: JSON.parse(JSON.stringify(d.elements), (k, v) =>
      typeof v === 'number' ? round(v) : (k === 'label' || k === 'text') && typeof v === 'string' ? fr(v) : v,
    ),
  };
  if (anim) {
    const n = 90;
    diagram.animation = {
      duration: anim.duration,
      frames: Array.from({ length: n + 1 }, (_, i) => roundPt(anim.getPosition((anim.duration * i) / n))),
      ...(anim.color ? { color: anim.color } : {}),
      ...(anim.radius ? { radius: anim.radius } : {}),
      ...(anim.trail ? { trail: anim.trail.map(roundPt) } : {}),
    };
  }
  return diagram;
}

function convertExercise(e: CecpExercise): Exercise {
  const diagram = convertDiagram(e.diagram);
  return {
    id: e.id,
    level: e.level ?? 2,
    title: fr(e.title.replace(/^Exercice\s*\d+\s*[-–:]\s*/i, '')),
    ...(e.source ? { source: e.source } : {}),
    statement: fr(fixTex(e.statement)),
    ...(e.given.length ? { given: e.given.map((g) => ({ label: g.label, value: fr(g.value) })) } : {}),
    ...(diagram ? { diagram } : {}),
    parts: e.questions.map((q) => ({
      label: fr(fixTex(q.label)),
      answer:
        q.kind === 'text'
          ? { kind: 'text' as const, display: q.expectedDisplay!, accepted: q.acceptedAnswers! }
          : { kind: 'number' as const, value: round(q.expected!), tolerance: round(q.tolerance!), unit: q.unit ?? '' },
      steps: q.steps.map((step) => fr(fixTex(step))),
      ...(q.finalFormula ? { result: texDot(q.finalFormula) } : {}),
    })),
  };
}

interface CecpScenario {
  chapter: string;
  title: string;
  tagline: string;
  context: string;
  physics: string;
  fact: string;
  challenge: { question: string; unit: string; answer: number; tolerance: number; solution: string[] };
}

const convertScenario = (s: CecpScenario) => ({
  title: fr(s.title),
  tagline: fr(s.tagline),
  situation: fr(s.context),
  model: fr(s.physics),
  questions: [fr(s.challenge.question)],
  check: { value: round(s.challenge.answer), tolerance: s.challenge.tolerance, unit: s.challenge.unit },
  solution: s.challenge.solution.map(fr),
  fact: fr(s.fact),
});

// ---------------------------------------------------------------------------
//  Écriture des fichiers
// ---------------------------------------------------------------------------

/** Littéral TypeScript lisible : clés sans guillemets quand c'est possible. */
function literal(value: unknown, indent = ''): string {
  const next = indent + '  ';
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    if (value.every((v) => typeof v === 'number')) return `[${value.join(', ')}]`;
    return `[\n${value.map((v) => next + literal(v, next)).join(',\n')},\n${indent}]`;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return '{}';
    const flat = entries.every(([, v]) => typeof v === 'number');
    const parts = entries.map(([k, v]) => `${/^[a-zA-Z_]\w*$/.test(k) ? k : JSON.stringify(k)}: ${literal(v, next)}`);
    return flat ? `{ ${parts.join(', ')} }` : `{\n${parts.map((p) => next + p).join(',\n')},\n${indent}}`;
  }
  if (typeof value === 'string') {
    const single = `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
    return value.includes("'") && !value.includes('"') ? JSON.stringify(value) : single;
  }
  return String(value);
}

async function main() {
  TB = await load('components/lesson/TheoryBlocks.tsx');
  FormulaFn = (await load('components/lesson/Formula.tsx')).Formula;
  InlineMathFn = (await load('components/lesson/InlineMath.tsx')).InlineMath;
  const { EXERCISES_BY_CHAPTER } = await load('lib/exercises/registry.ts');
  const { PROJECTILE_EXERCISES } = await load('lib/exercises/projectile-exercises.ts');
  const { ALL_SCENARIOS } = await load('lib/real-life/scenarios.ts');
  const exercises: Record<string, CecpExercise[]> = { ...EXERCISES_BY_CHAPTER, projectile: PROJECTILE_EXERCISES };

  mkdirSync(OUT, { recursive: true });
  const index: string[] = [];

  for (const { slug, subject, id } of CHAPTERS) {
    untyped = UNTYPED.has(slug);
    const page = readFileSync(join(CECP, `app/lecons/${subject}/${slug}/page.tsx`), 'utf8');
    const theoryName = page.match(/\b([A-Z]\w*Theory|TheoryPane)\b/)?.[1];
    if (!theoryName) throw new Error(`${slug} : aucun cours trouvé`);
    const theoryModule = await load(`components/lesson/${theoryName}.tsx`);
    const { hook, sections } = readTheory((theoryModule[theoryName] as () => unknown)());

    const lesson: Lesson = {
      hook,
      objectives: [],
      sections,
      essentials: [],
      exercises: (exercises[slug] ?? []).map(convertExercise),
      quiz: [],
      applications: (ALL_SCENARIOS as CecpScenario[]).filter((s) => s.chapter === slug).map(convertScenario),
    };

    const file = `12e-${subject}-${id}`;
    writeFileSync(
      join(OUT, `${file}.ts`),
      `// Importé du site cecp (physique-3d, chapitre « ${slug} ») par scripts/import-cecp.ts.\n` +
        `// Une nouvelle importation remplace ce fichier.\n` +
        `import type { Lesson } from '../types';\n\n` +
        `export const lesson: Lesson = ${literal(lesson)};\n`,
    );
    index.push(`  '12e/${subject}/${id}': ${camel(file)},`);
    console.log(
      `${slug} → 12e/${subject}/${id} : ${sections.length} sections, ${lesson.exercises.length} exercices, ${lesson.applications.length} situations`,
    );
  }

  writeFileSync(
    join(OUT, 'index.ts'),
    `// Généré par scripts/import-cecp.ts.\n` +
      `import type { Lesson } from '../types';\n` +
      CHAPTERS.map(({ subject, id }) => `import { lesson as ${camel(`12e-${subject}-${id}`)} } from './12e-${subject}-${id}';\n`).join('') +
      `\nexport const CECP_LESSONS: Record<string, Lesson> = {\n${index.join('\n')}\n};\n`,
  );
  for (const w of warnings) console.warn('Attention :', w);
}

const camel = (s: string) => 'l' + s.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
