// lib/chemistry/molecule.ts
// ============================================================
//  Molecules organiques : lecture d'une notation lineaire (sous-ensemble
//  de SMILES), construction de la geometrie 3D (VSEPR : tetraedre ou
//  triangle plan), formule brute, masse molaire, carbones asymetriques,
//  regles de Cahn-Ingold-Prelog (R/S, Z/E). Aucune dependance React.
//
//  Notation acceptee : atomes C N O S Cl (H implicites), liaisons
//  simples (rien) ou doubles (=), ramifications entre parentheses.
//  Pas de cycles. Exemples : "CCO" (ethanol), "CC(=O)O" (acide
//  ethanoique), "NC(C)C(=O)O" (alanine).
// ============================================================

export type Element = 'C' | 'H' | 'O' | 'N' | 'S' | 'Cl';
export type Vec3 = [number, number, number];

export interface Atom {
  el: Element;
  pos: Vec3;
  /** Directions des doublets non liants (vecteurs unitaires) */
  lonePairs: Vec3[];
}

export interface Bond { a: number; b: number; order: 1 | 2 }

export interface Molecule {
  atoms: Atom[];
  bonds: Bond[];
}

export const VALENCE: Record<Element, number> = { C: 4, H: 1, O: 2, N: 3, S: 2, Cl: 1 };
export const ATOMIC_NUMBER: Record<Element, number> = { H: 1, C: 6, N: 7, O: 8, S: 16, Cl: 17 };
/** Masses molaires atomiques usuelles au lycee (g/mol) */
export const ATOMIC_MASS: Record<Element, number> = { H: 1, C: 12, N: 14, O: 16, S: 32, Cl: 35.5 };
/** Doublets non liants d'un atome neutre */
const LONE_PAIRS: Record<Element, number> = { C: 0, H: 0, N: 1, O: 2, S: 2, Cl: 3 };

/** Longueurs de liaison (angstrom) pour l'affichage */
function bondLength(a: Element, b: Element, order: 1 | 2): number {
  const key = [a, b].sort().join('');
  if (order === 2) return ({ CC: 1.34, CO: 1.23, CN: 1.28 } as Record<string, number>)[key] ?? 1.3;
  return ({ CC: 1.54, CO: 1.43, CN: 1.47, CS: 1.82, CCl: 1.77, CH: 1.09, HO: 0.96, HN: 1.01, HS: 1.34 } as Record<string, number>)[key] ?? 1.4;
}

// ---------------- Vecteurs ----------------
const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: Vec3): Vec3 => scale(a, 1 / Math.hypot(a[0], a[1], a[2]));
export const distance = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
/** Angle (degres) entre deux vecteurs */
export const angleDeg = (a: Vec3, b: Vec3) => (Math.acos(Math.max(-1, Math.min(1, dot(norm(a), norm(b))))) * 180) / Math.PI;

// ============================================================
//  Lecture de la notation lineaire
// ============================================================
interface Graph { el: Element[]; bonds: Bond[] }

export function parseSmiles(smiles: string): Graph {
  const el: Element[] = [];
  const bonds: Bond[] = [];
  const stack: number[] = [];
  let prev = -1;
  let order: 1 | 2 = 1;
  for (let i = 0; i < smiles.length; i++) {
    const ch = smiles[i];
    if (ch === '(') { stack.push(prev); continue; }
    if (ch === ')') { prev = stack.pop() ?? -1; continue; }
    if (ch === '=') { order = 2; continue; }
    let e: Element;
    if (ch === 'C' && smiles[i + 1] === 'l') { e = 'Cl'; i++; }
    else if (ch === 'C' || ch === 'N' || ch === 'O' || ch === 'S') e = ch;
    else throw new Error(`Caractère non reconnu « ${ch} » dans ${smiles}`);
    el.push(e);
    const idx = el.length - 1;
    if (prev >= 0) bonds.push({ a: prev, b: idx, order });
    order = 1;
    prev = idx;
  }
  // Hydrogenes implicites
  const heavy = el.length;
  for (let i = 0; i < heavy; i++) {
    const used = bonds.filter((b) => b.a === i || b.b === i).reduce((s, b) => s + b.order, 0);
    const nH = VALENCE[el[i]] - used;
    if (nH < 0) throw new Error(`Valence dépassée pour l'atome ${i} (${el[i]}) dans ${smiles}`);
    for (let k = 0; k < nH; k++) {
      el.push('H');
      bonds.push({ a: i, b: el.length - 1, order: 1 });
    }
  }
  return { el, bonds };
}

// ============================================================
//  Geometrie 3D (VSEPR simplifie)
// ============================================================
export interface BuildOptions {
  /** Atomes dont l'ordre des substituants est inverse (ex. isomere Z au lieu de E) */
  flip?: number[];
}

/** Voisins d'un atome, avec l'ordre de liaison */
export function neighbors(m: { bonds: Bond[] }, i: number): { j: number; order: 1 | 2 }[] {
  return m.bonds.filter((b) => b.a === i || b.b === i).map((b) => ({ j: b.a === i ? b.b : b.a, order: b.order }));
}

/** Directions de liaison autour d'un atome, connaissant la direction u vers le parent */
function domainDirections(nDomains: number, u: Vec3 | null, ref: Vec3 | null): Vec3[] {
  if (!u) {
    if (nDomains >= 4) return ([[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]] as Vec3[]).map(norm);
    if (nDomains === 3) return [[1, 0, 0], [-0.5, Math.sqrt(3) / 2, 0], [-0.5, -Math.sqrt(3) / 2, 0]];
    if (nDomains === 2) return [[1, 0, 0], [-1, 0, 0]];
    return [[1, 0, 0]];
  }
  // u : direction parent -> atome. Les autres domaines font l'angle ideal avec la liaison au parent.
  const alpha = nDomains >= 4 ? (70.53 * Math.PI) / 180 : nDomains === 3 ? Math.PI / 3 : 0;
  // Reference perpendiculaire : oppose au grand-parent (chaine en zigzag, conformation decalee)
  let v: Vec3;
  if (ref) {
    const perp = sub(ref, scale(u, dot(ref, u)));
    v = Math.hypot(...perp) > 1e-6 ? scale(norm(perp), -1) : anyPerp(u);
  } else v = anyPerp(u);
  const w = cross(u, v);
  const others = nDomains - 1;
  const step = (2 * Math.PI) / Math.max(1, others);
  const dirs: Vec3[] = [];
  for (let k = 0; k < others; k++) {
    const phi = k * step;
    dirs.push(norm(add(scale(u, Math.cos(alpha)), scale(add(scale(v, Math.cos(phi)), scale(w, Math.sin(phi))), Math.sin(alpha)))));
  }
  return dirs;
}

function anyPerp(u: Vec3): Vec3 {
  const t: Vec3 = Math.abs(u[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  return norm(cross(u, t));
}

/** Construit la molecule 3D a partir de la notation lineaire */
export function buildMolecule(smiles: string, opts: BuildOptions = {}): Molecule {
  const g = parseSmiles(smiles);
  const n = g.el.length;
  const pos: (Vec3 | null)[] = Array(n).fill(null);
  const lp: Vec3[][] = Array.from({ length: n }, () => []);
  const flip = new Set(opts.flip ?? []);

  const place = (i: number, parent: number, grand: number) => {
    const nb = neighbors(g, i);
    const isSp2 = nb.some((x) => x.order === 2) && g.el[i] === 'C';
    const nLone = isSp2 ? 0 : LONE_PAIRS[g.el[i]];
    // Un O ou N double-lie est trigonal ; on ne dessine pas ses doublets
    const doubleBonded = nb.some((x) => x.order === 2);
    const nDomains = g.el[i] === 'H' ? 1 : doubleBonded ? 3 : nb.length + nLone;
    const u = parent >= 0 ? norm(sub(pos[i]!, pos[parent]!)) : null;
    const ref = parent >= 0 && grand >= 0 ? norm(sub(pos[grand]!, pos[parent]!)) : null;
    const dirs = domainDirections(nDomains, u, ref);
    // Enfants : atomes lourds (ordre d'ecriture) puis H
    let children = nb.filter((x) => x.j !== parent).sort((a, b) => {
      const ha = g.el[a.j] === 'H' ? 1 : 0, hb = g.el[b.j] === 'H' ? 1 : 0;
      return ha - hb || a.j - b.j;
    });
    if (flip.has(i)) children = [...children].reverse();
    children.forEach((c, k) => {
      const d = dirs[k];
      pos[c.j] = add(pos[i]!, scale(d, bondLength(g.el[i], g.el[c.j], c.order)));
    });
    if (!doubleBonded) {
      for (let k = children.length; k < dirs.length; k++) lp[i].push(dirs[k]);
    }
    children.forEach((c) => place(c.j, i, parent));
  };

  pos[0] = [0, 0, 0];
  place(0, -1, -1);
  // Centrage
  const c = scale(pos.reduce<Vec3>((s, p) => add(s, p!), [0, 0, 0]), 1 / n);
  return {
    atoms: g.el.map((el, i) => ({ el, pos: sub(pos[i]!, c), lonePairs: lp[i] })),
    bonds: g.bonds,
  };
}

/** Image dans un miroir (plan x = 0) : donne l'enantiomere d'une molecule chirale */
export function mirror(m: Molecule): Molecule {
  return {
    atoms: m.atoms.map((a) => ({ ...a, pos: [-a.pos[0], a.pos[1], a.pos[2]], lonePairs: a.lonePairs.map((d) => [-d[0], d[1], d[2]] as Vec3) })),
    bonds: m.bonds,
  };
}

// ============================================================
//  Formule brute et masse molaire
// ============================================================
export function atomCounts(m: { atoms?: Atom[]; el?: Element[] } | Molecule): Partial<Record<Element, number>> {
  const els = 'atoms' in m && m.atoms ? m.atoms.map((a) => a.el) : (m as { el: Element[] }).el;
  const c: Partial<Record<Element, number>> = {};
  for (const e of els) c[e] = (c[e] ?? 0) + 1;
  return c;
}

/** Formule brute dans l'ordre de Hill : C, H, puis ordre alphabetique */
export function formula(m: Molecule): string {
  const c = atomCounts(m);
  const order: Element[] = ['C', 'H', ...(['Cl', 'N', 'O', 'S'] as Element[])];
  return order.filter((e) => c[e]).map((e) => (c[e] === 1 ? e : `${e}${c[e]}`)).join('');
}

/** Masse molaire (g/mol) d'une molecule ou d'une formule brute ("C2H6O") */
export function molarMass(m: Molecule | string): number {
  if (typeof m === 'string') {
    let M = 0;
    for (const [, e, k] of m.matchAll(/(Cl|C|H|N|O|S)(\d*)/g)) M += ATOMIC_MASS[e as Element] * (k ? Number(k) : 1);
    return M;
  }
  return m.atoms.reduce((s, a) => s + ATOMIC_MASS[a.el], 0);
}

/** Pourcentage massique d'un element */
export function massPercent(m: Molecule, e: Element): number {
  return (100 * (atomCounts(m)[e] ?? 0) * ATOMIC_MASS[e]) / molarMass(m);
}

// ============================================================
//  Carbones asymetriques
// ============================================================
/** Ecriture canonique d'une ramification (pour comparer des substituants) */
function canon(m: Molecule, i: number, from: number, depth = 0): string {
  if (depth > 12) return m.atoms[i].el;
  const kids = neighbors(m, i).filter((x) => x.j !== from)
    .map((x) => `${x.order === 2 ? '=' : ''}${canon(m, x.j, i, depth + 1)}`).sort();
  return `${m.atoms[i].el}(${kids.join(',')})`;
}

/** Vrai si l'atome est un carbone tetraedrique portant quatre substituants differents */
export function isStereocenter(m: Molecule, i: number): boolean {
  if (m.atoms[i].el !== 'C') return false;
  const nb = neighbors(m, i);
  if (nb.length !== 4 || nb.some((x) => x.order !== 1)) return false;
  return new Set(nb.map((x) => canon(m, x.j, i))).size === 4;
}

export function stereocenters(m: Molecule): number[] {
  return m.atoms.map((_, i) => i).filter((i) => isStereocenter(m, i));
}

// ============================================================
//  Regles de Cahn-Ingold-Prelog
// ============================================================
interface CipNode { z: number; kids: CipNode[] }

/** Arbre hierarchique d'un substituant (atomes dupliques pour les doubles liaisons) */
function cipTree(m: Molecule, i: number, from: number, fromOrder: 1 | 2, depth: number): CipNode {
  const kids: CipNode[] = [];
  if (depth < 8) {
    for (const x of neighbors(m, i)) {
      if (x.j === from) continue;
      kids.push(cipTree(m, x.j, i, x.order, depth + 1));
      if (x.order === 2) kids.push({ z: ATOMIC_NUMBER[m.atoms[x.j].el], kids: [] });
    }
    if (from >= 0 && fromOrder === 2) kids.push({ z: ATOMIC_NUMBER[m.atoms[from].el], kids: [] });
  }
  return { z: ATOMIC_NUMBER[m.atoms[i].el], kids };
}

/** Compare deux substituants : > 0 si a est prioritaire */
function cipCompare(a: CipNode, b: CipNode): number {
  if (a.z !== b.z) return a.z - b.z;
  const ka = [...a.kids].sort((x, y) => -cipCompare(x, y));
  const kb = [...b.kids].sort((x, y) => -cipCompare(x, y));
  // 1) ensembles de numeros atomiques de la sphere suivante
  for (let k = 0; k < Math.max(ka.length, kb.length); k++) {
    const za = ka[k]?.z ?? 0, zb = kb[k]?.z ?? 0;
    if (za !== zb) return za - zb;
  }
  // 2) exploration des branches dans l'ordre de priorite
  for (let k = 0; k < Math.min(ka.length, kb.length); k++) {
    const c = cipCompare(ka[k], kb[k]);
    if (c !== 0) return c;
  }
  return 0;
}

/** Substituants d'un atome classes par priorite CIP decroissante (indices d'atomes) */
export function cipRanking(m: Molecule, center: number, exclude: number[] = []): number[] {
  const nb = neighbors(m, center).filter((x) => !exclude.includes(x.j));
  const trees = nb.map((x) => ({ j: x.j, t: cipTree(m, x.j, center, x.order, 0) }));
  return trees.sort((p, q) => -cipCompare(p.t, q.t)).map((x) => x.j);
}

/** Configuration absolue R ou S d'un carbone asymetrique */
export function cipLabel(m: Molecule, center: number): 'R' | 'S' {
  const [p1, p2, p3] = cipRanking(m, center);
  const c = m.atoms[center].pos;
  const v1 = sub(m.atoms[p1].pos, c), v2 = sub(m.atoms[p2].pos, c), v3 = sub(m.atoms[p3].pos, c);
  // Triple produit > 0 : 1 -> 2 -> 3 tourne dans le sens trigonometrique vu de face (groupe 4 en arriere) : S
  return dot(cross(v1, v2), v3) > 0 ? 'S' : 'R';
}

/** Impose la configuration voulue (par symetrie miroir) a une molecule a un seul C asymetrique */
export function withConfiguration(m: Molecule, center: number, target: 'R' | 'S'): Molecule {
  return cipLabel(m, center) === target ? m : mirror(m);
}

/** Configuration Z ou E d'une double liaison C=C entre les atomes a et b */
export function zeLabel(m: Molecule, a: number, b: number): 'Z' | 'E' | null {
  const ra = cipRanking(m, a, [b]);
  const rb = cipRanking(m, b, [a]);
  if (ra.length < 2 || rb.length < 2) return null;
  const tree = (i: number, from: number) => cipTree(m, i, from, 1, 0);
  // Deux substituants identiques sur un meme carbone : pas de stereoisomerie Z/E
  if (cipCompare(tree(ra[0], a), tree(ra[1], a)) === 0 || cipCompare(tree(rb[0], b), tree(rb[1], b)) === 0) return null;
  const axis = norm(sub(m.atoms[b].pos, m.atoms[a].pos));
  const perp = (i: number, base: number) => {
    const v = sub(m.atoms[i].pos, m.atoms[base].pos);
    return sub(v, scale(axis, dot(v, axis)));
  };
  return dot(perp(ra[0], a), perp(rb[0], b)) > 0 ? 'Z' : 'E';
}

// ============================================================
//  Classes d'alcools et d'amines
// ============================================================
const carbonNeighbors = (m: Molecule, i: number) => neighbors(m, i).filter((x) => m.atoms[x.j].el === 'C').length;

/** Classe d'un alcool : nombre d'atomes de carbone lies au carbone fonctionnel */
export function alcoholClass(m: Molecule): 'primaire' | 'secondaire' | 'tertiaire' | null {
  for (let i = 0; i < m.atoms.length; i++) {
    if (m.atoms[i].el !== 'O') continue;
    const nb = neighbors(m, i);
    const hasH = nb.some((x) => m.atoms[x.j].el === 'H');
    const c = nb.find((x) => m.atoms[x.j].el === 'C');
    if (!hasH || !c || nb.length !== 2) continue;
    // Le carbone fonctionnel ne doit pas porter de double liaison (sinon : acide carboxylique)
    if (neighbors(m, c.j).some((x) => x.order === 2)) continue;
    const k = carbonNeighbors(m, c.j);
    return k <= 1 ? 'primaire' : k === 2 ? 'secondaire' : 'tertiaire';
  }
  return null;
}

/** Classe d'une amine : nombre d'atomes de carbone lies a l'azote */
export function amineClass(m: Molecule): 'primaire' | 'secondaire' | 'tertiaire' | null {
  for (let i = 0; i < m.atoms.length; i++) {
    if (m.atoms[i].el !== 'N') continue;
    // Une amide (N lie a un C=O) n'est pas une amine
    const amide = neighbors(m, i).some((x) => m.atoms[x.j].el === 'C' && neighbors(m, x.j).some((y) => y.order === 2 && m.atoms[y.j].el === 'O'));
    if (amide) continue;
    const k = carbonNeighbors(m, i);
    if (k === 0) return null;
    return k === 1 ? 'primaire' : k === 2 ? 'secondaire' : 'tertiaire';
  }
  return null;
}
