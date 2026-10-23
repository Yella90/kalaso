// lib/physics/gravitation.ts
// ============================================================
//  Gravitation universelle - systeme solaire, lunes et
//  satellites artificiels. Donnees astronomiques reelles
//  (valeurs arrondies, sources : NASA / IMCCE).
//  Aucune dependance React : testable en isolation.
// ============================================================

/** Constante de gravitation universelle (N.m2.kg-2) */
export const G = 6.67e-11;
/** Unite astronomique (m) */
export const UA = 1.496e11;
export const DAY = 86400;
export const YEAR = 365.25 * DAY;

export type BodyKind = 'etoile' | 'planete' | 'lune' | 'artificiel';

export interface Body {
  id: string;
  name: string;
  kind: BodyKind;
  /** Masse (kg) - absente pour les satellites artificiels (negligeable) */
  mass?: number;
  /** Rayon (m) */
  radius: number;
  /** Corps autour duquel il tourne */
  parent?: string;
  /** Rayon de l'orbite (demi-grand axe, m), mesure depuis le centre du parent */
  orbitRadius?: number;
  /** Periode de revolution mesuree (s) - pour comparer avec Kepler */
  realPeriod?: number;
  color: string;
  /** Une phrase pour l'eleve */
  note: string;
}

export const BODIES: Body[] = [
  {
    id: 'soleil', name: 'Soleil', kind: 'etoile', mass: 1.989e30, radius: 6.96e8, color: '#fbbf24',
    note: "Étoile au centre du système solaire : elle contient 99,8 % de la masse du système.",
  },
  // ---------------- Planetes ----------------
  {
    id: 'mercure', name: 'Mercure', kind: 'planete', parent: 'soleil', mass: 3.30e23, radius: 2.44e6,
    orbitRadius: 0.387 * UA, realPeriod: 87.97 * DAY, color: '#a8a29e',
    note: 'La planète la plus proche du Soleil, et la plus rapide : 47 km/s.',
  },
  {
    id: 'venus', name: 'Vénus', kind: 'planete', parent: 'soleil', mass: 4.87e24, radius: 6.052e6,
    orbitRadius: 0.723 * UA, realPeriod: 224.7 * DAY, color: '#fcd34d',
    note: "La planète la plus chaude (environ 460 °C) à cause de l'effet de serre de son atmosphère.",
  },
  {
    id: 'terre', name: 'Terre', kind: 'planete', parent: 'soleil', mass: 5.97e24, radius: 6.371e6,
    orbitRadius: 1.0 * UA, realPeriod: 365.25 * DAY, color: '#3b82f6',
    note: "Notre planète parcourt environ 940 millions de km par an autour du Soleil.",
  },
  {
    id: 'mars', name: 'Mars', kind: 'planete', parent: 'soleil', mass: 6.42e23, radius: 3.39e6,
    orbitRadius: 1.524 * UA, realPeriod: 687.0 * DAY, color: '#ef4444',
    note: 'La planète rouge : sa couleur vient de l\'oxyde de fer (rouille) de son sol.',
  },
  {
    id: 'jupiter', name: 'Jupiter', kind: 'planete', parent: 'soleil', mass: 1.898e27, radius: 6.9911e7,
    orbitRadius: 5.203 * UA, realPeriod: 4332.6 * DAY, color: '#d6a46c',
    note: 'La plus grosse planète : plus de 300 fois la masse de la Terre.',
  },
  {
    id: 'saturne', name: 'Saturne', kind: 'planete', parent: 'soleil', mass: 5.68e26, radius: 5.8232e7,
    orbitRadius: 9.537 * UA, realPeriod: 10759 * DAY, color: '#e9d5a1',
    note: 'Ses anneaux sont faits de milliards de blocs de glace et de roche.',
  },
  {
    id: 'uranus', name: 'Uranus', kind: 'planete', parent: 'soleil', mass: 8.68e25, radius: 2.5362e7,
    orbitRadius: 19.19 * UA, realPeriod: 30687 * DAY, color: '#67e8f9',
    note: "Elle tourne « couchée » : son axe de rotation est presque dans le plan de son orbite.",
  },
  {
    id: 'neptune', name: 'Neptune', kind: 'planete', parent: 'soleil', mass: 1.02e26, radius: 2.4622e7,
    orbitRadius: 30.07 * UA, realPeriod: 60190 * DAY, color: '#6366f1',
    note: 'Découverte en 1846 par le calcul (perturbations de l\'orbite d\'Uranus) avant d\'être observée !',
  },
  // ---------------- Lunes (satellites naturels) ----------------
  {
    id: 'lune', name: 'Lune', kind: 'lune', parent: 'terre', mass: 7.35e22, radius: 1.737e6,
    orbitRadius: 3.844e8, realPeriod: 27.32 * DAY, color: '#d4d4d8',
    note: 'Elle nous montre toujours la même face : sa rotation propre dure aussi 27,3 jours.',
  },
  {
    id: 'phobos', name: 'Phobos', kind: 'lune', parent: 'mars', mass: 1.07e16, radius: 1.1e4,
    orbitRadius: 9.376e6, realPeriod: 0.3189 * DAY, color: '#a8a29e',
    note: 'Elle fait le tour de Mars en 7 h 39 min, plus vite que Mars ne tourne sur elle-même.',
  },
  {
    id: 'deimos', name: 'Deimos', kind: 'lune', parent: 'mars', mass: 1.48e15, radius: 6.2e3,
    orbitRadius: 2.346e7, realPeriod: 1.263 * DAY, color: '#d6d3d1',
    note: 'Petite lune irrégulière de 12 km de diamètre.',
  },
  {
    id: 'io', name: 'Io', kind: 'lune', parent: 'jupiter', mass: 8.93e22, radius: 1.822e6,
    orbitRadius: 4.217e8, realPeriod: 1.769 * DAY, color: '#facc15',
    note: 'Le corps le plus volcanique du système solaire.',
  },
  {
    id: 'europe', name: 'Europe', kind: 'lune', parent: 'jupiter', mass: 4.80e22, radius: 1.561e6,
    orbitRadius: 6.711e8, realPeriod: 3.551 * DAY, color: '#e7e5e4',
    note: 'Un océan d\'eau liquide se cache probablement sous sa croûte de glace.',
  },
  {
    id: 'ganymede', name: 'Ganymède', kind: 'lune', parent: 'jupiter', mass: 1.48e23, radius: 2.634e6,
    orbitRadius: 1.0704e9, realPeriod: 7.155 * DAY, color: '#a1a1aa',
    note: 'La plus grande lune du système solaire : plus grande que la planète Mercure.',
  },
  {
    id: 'callisto', name: 'Callisto', kind: 'lune', parent: 'jupiter', mass: 1.08e23, radius: 2.410e6,
    orbitRadius: 1.8827e9, realPeriod: 16.69 * DAY, color: '#78716c',
    note: 'Sa surface est la plus criblée de cratères du système solaire.',
  },
  {
    id: 'titan', name: 'Titan', kind: 'lune', parent: 'saturne', mass: 1.345e23, radius: 2.575e6,
    orbitRadius: 1.2219e9, realPeriod: 15.945 * DAY, color: '#f59e0b',
    note: 'La seule lune possédant une atmosphère épaisse (plus dense que celle de la Terre).',
  },
  // ---------------- Satellites artificiels ----------------
  {
    id: 'iss', name: 'ISS', kind: 'artificiel', parent: 'terre', radius: 50,
    orbitRadius: 6.371e6 + 4.15e5, realPeriod: 92.68 * 60, color: '#e2e8f0',
    note: 'Station spatiale habitée, à environ 415 km d\'altitude.',
  },
  {
    id: 'hubble', name: 'Hubble', kind: 'artificiel', parent: 'terre', radius: 7,
    orbitRadius: 6.371e6 + 5.35e5, realPeriod: 95.4 * 60, color: '#c4b5fd',
    note: 'Télescope spatial lancé en 1990, à environ 535 km d\'altitude.',
  },
  {
    id: 'gps', name: 'GPS', kind: 'artificiel', parent: 'terre', radius: 3,
    orbitRadius: 6.371e6 + 2.02e7, realPeriod: 11.967 * 3600, color: '#facc15',
    note: 'Constellation d\'une trentaine de satellites de navigation à 20 200 km.',
  },
  {
    id: 'geo', name: 'Sat. TV (géostationnaire)', kind: 'artificiel', parent: 'terre', radius: 3,
    orbitRadius: 4.2164e7, realPeriod: 86164, color: '#f472b6',
    note: 'À 35 786 km d\'altitude, il tourne en 23 h 56 min, comme la Terre : il paraît immobile.',
  },
];

export function body(id: string): Body {
  const b = BODIES.find((x) => x.id === id);
  if (!b) throw new Error(`Corps inconnu : ${id}`);
  return b;
}

export const PLANETS = BODIES.filter((b) => b.kind === 'planete');

/** Corps en orbite autour de `parentId` (lunes + satellites artificiels) */
export function satellitesOf(parentId: string): Body[] {
  return BODIES.filter((b) => b.parent === parentId);
}

/** Planetes possédant des satellites dans la base */
export const SYSTEMS_WITH_MOONS = PLANETS.filter((p) => satellitesOf(p.id).length > 0);

// ============================================================
//  Lois physiques
// ============================================================

/** Force de gravitation entre deux masses separees de d (N) : F = G.m1.m2 / d^2 */
export function gravitationalForce(m1: number, m2: number, d: number): number {
  return (G * m1 * m2) / (d * d);
}

/** Intensite du champ de gravitation a la distance r du centre (m/s2) : g = G.M / r^2 */
export function gravityField(M: number, r: number): number {
  return (G * M) / (r * r);
}

/** Vitesse d'un satellite en orbite circulaire de rayon r (m/s) : v = sqrt(G.M / r) */
export function orbitalSpeed(M: number, r: number): number {
  return Math.sqrt((G * M) / r);
}

/** Periode de revolution (s) : T = 2.pi.sqrt(r^3 / (G.M)) */
export function orbitalPeriodGM(M: number, r: number): number {
  return 2 * Math.PI * Math.sqrt((r * r * r) / (G * M));
}

/** Rayon de l'orbite pour une periode donnee (3e loi de Kepler inversee) */
export function orbitRadiusFromPeriod(M: number, T: number): number {
  return Math.cbrt((G * M * T * T) / (4 * Math.PI * Math.PI));
}

/** Constante de Kepler T^2 / r^3 = 4.pi^2 / (G.M) (s2.m-3) */
export function keplerRatio(M: number): number {
  return (4 * Math.PI * Math.PI) / (G * M);
}

/** Vitesse de liberation a la surface (m/s) : v_l = sqrt(2.G.M / R) */
export function escapeSpeed(M: number, R: number): number {
  return Math.sqrt((2 * G * M) / R);
}

/** Masse du corps central deduite de l'orbite d'un satellite : M = 4.pi^2.r^3 / (G.T^2) */
export function centralMassFromOrbit(r: number, T: number): number {
  return (4 * Math.PI * Math.PI * r * r * r) / (G * T * T);
}

// ============================================================
//  Grandeurs calculees pour un corps de la base
// ============================================================
export interface OrbitFacts {
  /** Periode calculee par la loi de Kepler (s) */
  keplerPeriod: number;
  /** Periode mesuree (s) */
  realPeriod?: number;
  /** Ecart relatif entre calcul et mesure */
  error?: number;
  /** Vitesse orbitale (m/s) */
  speed: number;
  /** Altitude au-dessus de la surface du parent (m) */
  altitude: number;
  /** Champ de gravitation du parent a cette distance (m/s2) */
  fieldAtOrbit: number;
}

export function orbitFacts(b: Body): OrbitFacts | null {
  if (!b.parent || !b.orbitRadius) return null;
  const parent = body(b.parent);
  const M = parent.mass as number;
  const keplerPeriod = orbitalPeriodGM(M, b.orbitRadius);
  return {
    keplerPeriod,
    realPeriod: b.realPeriod,
    error: b.realPeriod ? (keplerPeriod - b.realPeriod) / b.realPeriod : undefined,
    speed: orbitalSpeed(M, b.orbitRadius),
    altitude: b.orbitRadius - parent.radius,
    fieldAtOrbit: gravityField(M, b.orbitRadius),
  };
}

export function surfaceFacts(b: Body) {
  if (!b.mass) return null;
  return {
    g: gravityField(b.mass, b.radius),
    escape: escapeSpeed(b.mass, b.radius),
  };
}

// ============================================================
//  Formatage
// ============================================================
const frNum = (x: number, d: number) => x.toFixed(d).replace('.', ',');

/** Duree lisible : "92,7 min", "27,3 jours", "11,9 ans" */
export function formatPeriod(s: number): string {
  if (s < 2 * 3600) return `${frNum(s / 60, 1)} min`;
  if (s < 2 * DAY) return `${frNum(s / 3600, 2)} h`;
  if (s < 2 * YEAR) return `${frNum(s / DAY, 1)} jours`;
  return `${frNum(s / YEAR, 2)} ans`;
}

/** Distance lisible : "415 km", "384 400 km", "5,20 UA" */
export function formatDistance(m: number): string {
  if (m >= 0.05 * UA) return `${frNum(m / UA, 2)} UA`;
  return `${Math.round(m / 1000).toLocaleString('fr-FR')} km`;
}

/** Ecriture scientifique a la francaise : 5,97.10^24 */
export function sci(x: number, digits = 2): string {
  if (x === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(x)));
  const m = x / 10 ** e;
  return `${frNum(m, digits)}·10^${e}`;
}
