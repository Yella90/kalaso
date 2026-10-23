// lib/real-life/scenarios.ts
// ============================================================
//  Scenarios "Vie reelle" : la physique du cours appliquee a des
//  situations concretes. Chaque scenario regle la simulation 3D sur
//  des valeurs realistes et propose un defi a l'eleve.
//
//  Les reponses des defis sont CALCULEES par les moteurs physiques
//  (lib/physics) : elles restent coherentes avec la simulation.
//  Aucune dependance React : testable en isolation.
// ============================================================

import {
  deg2rad, range, maxHeight, speedToHit, flightTime, G_EARTH,
} from '../physics/projectile';
import {
  mruvStoppingDistance, mruvStoppingTime, mruvTimeToReach, mcuCentripetalAcceleration, mcuPeriod, mcuLinearSpeed,
  type MotionType,
} from '../physics/kinematics';
import {
  orbitalPeriod, linearSpeed, geostationaryAltitude, gravityAt,
} from '../physics/satellite';
import { CHAPTER_SCENARIOS, GENERIC_CHAPTER_INFO, type GenericChapter } from './chapter-scenarios';

/** Chapitres dont la simulation 3D est pilotee par les scenarios */
export type SimChapter = 'projectile' | 'cinematique' | 'satellite';
export type Chapter = SimChapter | GenericChapter;

/** Icone affichee pour le scenario (correspondance faite dans l'UI). */
export type IconKey =
  | 'basket' | 'football' | 'jump' | 'helicopter' | 'water'
  | 'moto' | 'rain' | 'bus' | 'speed' | 'manege'
  | 'iss' | 'gps' | 'tv'
  | 'shotput' | 'fire' | 'archery' | 'stop' | 'traffic' | 'wheel'
  | 'satellite' | 'telescope' | 'wifi'
  | 'scale' | 'clock' | 'baby' | 'hospital' | 'bone' | 'door' | 'sun' | 'laser'
  | 'tea' | 'ice' | 'spark' | 'radio' | 'thunder' | 'boat' | 'headphones'
  | 'lamp' | 'nebula' | 'magnet'
  | 'pill' | 'leaf' | 'wine' | 'fish' | 'flask' | 'hand' | 'apple' | 'egg';

export interface Challenge {
  /** Question posee a l'eleve */
  question: string;
  /** Unite de la reponse attendue */
  unit: string;
  /** Reponse exacte (calculee) */
  answer: number;
  /** Tolerance relative acceptee (0.03 = 3 %) */
  tolerance: number;
  /** Etapes de la correction (texte + math inline entre $...$) */
  solution: string[];
}

interface BaseScenario {
  id: string;
  chapter: Chapter;
  title: string;
  /** Phrase courte pour les cartes */
  tagline: string;
  icon: IconKey;
  /** Mise en situation */
  context: string;
  /** Ce que modelise la simulation (et ses limites) */
  physics: string;
  /** "Le savais-tu ?" */
  fact: string;
  challenge: Challenge;
}

// ---------------- Projectile ----------------
export type ProjectileTarget =
  | { kind: 'hoop'; x: number; y: number; label: string }
  | { kind: 'zone'; x1: number; x2: number; label: string }
  | { kind: 'line'; x: number; label: string }
  | { kind: 'crate'; x: number; label: string };

export interface ProjectileScenario extends BaseScenario {
  chapter: 'projectile';
  params: { v0: number; alphaDeg: number; g: number; h0: number };
  scene: {
    target: ProjectileTarget;
    launcher: 'player' | 'helicopter' | 'hose' | 'none';
    /** Taille de la zone a afficher (m) : regle la camera et les axes */
    viewSize: number;
    ballColor: string;
    /** Rayon reel de l'objet lance (m) */
    ballRadius: number;
  };
}

// ---------------- Cinematique ----------------
export interface KinematicsScenario extends BaseScenario {
  chapter: 'cinematique';
  params: {
    motionType: MotionType;
    v?: number; v0?: number; a?: number; R?: number; omega?: number;
  };
  scene: {
    vehicle: 'moto' | 'bus' | 'cabin';
    obstacle?: { x: number; label: string };
  };
}

// ---------------- Satellite ----------------
export interface SatelliteScenario extends BaseScenario {
  chapter: 'satellite';
  params: { h: number; timeWarp: number };
  scene: { name: string; color: string };
}

// ---------------- Autres chapitres ----------------
/**
 * Scenario sans pilotage de la simulation : mise en situation et defi.
 * Utilise pour les chapitres dont la simulation n'a pas de decor "vie reelle".
 */
export interface GenericScenario extends BaseScenario {
  chapter: GenericChapter;
}

export type SimScenario = ProjectileScenario | KinematicsScenario | SatelliteScenario;
export type RealLifeScenario = SimScenario | GenericScenario;

/** Formate un nombre a la francaise : 7.256 -> "7,26" */
export function fr(x: number, digits = 2): string {
  return x.toFixed(digits).replace('.', ',');
}

/** Verifie la reponse d'un eleve (accepte la virgule decimale). */
export function checkAnswer(challenge: Challenge, input: string): boolean | null {
  const value = parseFloat(input.replace(',', '.').replace(/\s/g, ''));
  if (!Number.isFinite(value)) return null;
  return Math.abs(value - challenge.answer) <= Math.abs(challenge.answer) * challenge.tolerance;
}

// ============================================================
//  PROJECTILE
// ============================================================
const g = G_EARTH;

const basket = (() => {
  const alphaDeg = 52, h0 = 2.0, x = 4.2, y = 3.05;
  const v0 = speedToHit(x, y, deg2rad(alphaDeg), g, h0) as number;
  return {
    id: 'basket-lancer-franc',
    chapter: 'projectile',
    title: 'Lancer franc au basket',
    tagline: 'Quelle vitesse donner au ballon pour marquer ?',
    icon: 'basket',
    context:
      `Le joueur lache le ballon a ${fr(h0, 1)} m du sol. Le centre du panier est a ${fr(x, 1)} m devant lui et a ${fr(y)} m de hauteur (hauteur officielle). Il tire avec un angle de ${alphaDeg}°.`,
    physics:
      "Le ballon est un projectile soumis uniquement a son poids : sa trajectoire est une parabole. On neglige la resistance de l'air et la rotation du ballon.",
    fact:
      "Un tir plus « cambre » (angle eleve) arrive plus verticalement sur le cercle : vu du ballon, l'ouverture du panier parait plus grande. C'est pourquoi les bons tireurs visent entre 45° et 55°.",
    params: { v0, alphaDeg, g, h0 },
    scene: {
      target: { kind: 'hoop', x, y, label: 'Panier' },
      launcher: 'player',
      viewSize: 6,
      ballColor: '#ea580c',
      ballRadius: 0.12,
    },
    challenge: {
      question: `Avec un angle de ${alphaDeg}°, quelle vitesse initiale v0 faut-il donner au ballon pour qu'il passe par le centre du panier ?`,
      unit: 'm/s',
      answer: v0,
      tolerance: 0.03,
      solution: [
        'Equation de la trajectoire : $y = -\\dfrac{g}{2v_0^2\\cos^2\\alpha}x^2 + x\\tan\\alpha + h_0$',
        `Le ballon doit passer par le panier : $x = ${fr(x, 1)}$ m et $y = ${fr(y)}$ m.`,
        "On isole $v_0$ : $v_0 = \\sqrt{\\dfrac{g\\,x^2}{2\\cos^2\\alpha\\,(x\\tan\\alpha + h_0 - y)}}$",
        `A.N. : $v_0 \\approx ${fr(v0)}$ m/s, soit environ ${fr(v0 * 3.6, 0)} km/h.`,
        'Essaie de changer legerement v0 dans la simulation : 0,2 m/s d\'ecart suffit pour rater le panier !',
      ],
    },
  } satisfies ProjectileScenario;
})();

const football = (() => {
  const p = { v0: 25, alphaDeg: 40, g, h0: 0 };
  const R = range({ ...p, alpha: deg2rad(p.alphaDeg) });
  return {
    id: 'football-degagement',
    chapter: 'projectile',
    title: 'Degagement du gardien',
    tagline: 'Le ballon atteint-il le milieu du terrain ?',
    icon: 'football',
    context:
      `Le gardien degage le ballon depuis le sol a ${p.v0} m/s (${fr(p.v0 * 3.6, 0)} km/h) avec un angle de ${p.alphaDeg}°. Le milieu d'un terrain de 105 m se trouve a 52,5 m.`,
    physics:
      "Modele sans frottement de l'air : c'est une portee maximale theorique. En realite, un ballon de football est fortement freine par l'air et retombe plus pres.",
    fact:
      "Sans air, la portee maximale est obtenue a 45°. Avec la resistance de l'air, l'angle optimal d'un ballon de foot est plus faible, autour de 30° a 40°.",
    params: p,
    scene: {
      target: { kind: 'line', x: 52.5, label: 'Milieu de terrain' },
      launcher: 'none',
      viewSize: 70,
      ballColor: '#f8fafc',
      ballRadius: 0.11,
    },
    challenge: {
      question: 'Calcule la portee du degagement (distance a laquelle le ballon retombe au sol).',
      unit: 'm',
      answer: R,
      tolerance: 0.02,
      solution: [
        'Depart et arrivee au sol ($h_0 = 0$) : $x_P = \\dfrac{v_0^2 \\sin(2\\alpha)}{g}$',
        `A.N. : $x_P = \\dfrac{${p.v0}^2 \\times \\sin(${2 * p.alphaDeg}°)}{${fr(g)}} \\approx ${fr(R, 1)}$ m`,
        `${fr(R, 1)} m > 52,5 m : en theorie, le ballon depasse le milieu du terrain.`,
      ],
    },
  } satisfies ProjectileScenario;
})();

const longJump = (() => {
  const p = { v0: 9.5, alphaDeg: 20, g, h0: 1.0 };
  const R = range({ ...p, alpha: deg2rad(p.alphaDeg) });
  return {
    id: 'saut-en-longueur',
    chapter: 'projectile',
    title: 'Saut en longueur',
    tagline: 'Quelle distance pour un athlete de haut niveau ?',
    icon: 'jump',
    context:
      `Au moment de l'appel, le centre d'inertie de l'athlete est a ${fr(p.h0, 1)} m du sol. Il s'envole a ${fr(p.v0, 1)} m/s avec un angle de ${p.alphaDeg}°.`,
    physics:
      "On etudie le mouvement du centre d'inertie de l'athlete, qui suit une parabole (comme un simple projectile), quels que soient les mouvements des bras et des jambes.",
    fact:
      "Record du monde : 8,95 m (Mike Powell, 1991). Les sauteurs decollent avec un angle de 18° a 25° seulement : ils ne peuvent pas transformer toute leur vitesse de course en vitesse verticale.",
    params: p,
    scene: {
      target: { kind: 'zone', x1: 2, x2: 10, label: 'Fosse de sable' },
      launcher: 'none',
      viewSize: 12,
      ballColor: '#38bdf8',
      ballRadius: 0.2,
    },
    challenge: {
      question: "Calcule la distance horizontale parcourue par le centre d'inertie avant de retomber au sol.",
      unit: 'm',
      answer: R,
      tolerance: 0.03,
      solution: [
        "Equations horaires : $x = v_0\\cos\\alpha\\,t$ et $y = -\\tfrac{1}{2}g t^2 + v_0\\sin\\alpha\\,t + h_0$",
        "Au sol $y = 0$ : on resout l'equation du second degre en $t$ et on garde la solution positive.",
        `$t_{vol} = \\dfrac{v_0\\sin\\alpha + \\sqrt{(v_0\\sin\\alpha)^2 + 2 g h_0}}{g}$, puis $x = v_0\\cos\\alpha\\,t_{vol} \\approx ${fr(R)}$ m`,
        'Une vraie performance de niveau international !',
      ],
    },
  } satisfies ProjectileScenario;
})();

const helicopter = (() => {
  const p = { v0: 15, alphaDeg: 0, g, h0: 20 };
  const R = range({ ...p, alpha: 0 });
  return {
    id: 'colis-helicoptere',
    chapter: 'projectile',
    title: 'Colis largue d\'un helicoptere',
    tagline: 'Quand larguer pour toucher la zone de livraison ?',
    icon: 'helicopter',
    context:
      `Un helicoptere d'aide humanitaire vole a ${fr(p.h0, 0)} m d'altitude a ${p.v0} m/s (${fr(p.v0 * 3.6, 0)} km/h). Il doit larguer un colis de medicaments sur une zone de livraison.`,
    physics:
      "Au moment du largage, le colis a la vitesse horizontale de l'helicoptere : c'est un tir horizontal ($\\alpha = 0$) depuis la hauteur $h_0$. On neglige l'air.",
    fact:
      "Vu du sol, le colis decrit une parabole. Vu depuis l'helicoptere (qui continue a la meme vitesse), il tombe a la verticale juste en dessous !",
    params: p,
    scene: {
      target: { kind: 'crate', x: R, label: 'Zone de livraison' },
      launcher: 'helicopter',
      viewSize: 35,
      ballColor: '#a16207',
      ballRadius: 0.5,
    },
    challenge: {
      question: 'A quelle distance horizontale avant la zone de livraison le pilote doit-il larguer le colis ?',
      unit: 'm',
      answer: R,
      tolerance: 0.03,
      solution: [
        'Duree de la chute : $h_0 = \\tfrac{1}{2} g t^2 \\Rightarrow t = \\sqrt{\\dfrac{2h_0}{g}}$',
        `A.N. : $t = \\sqrt{\\dfrac{2 \\times ${p.h0}}{${fr(g)}}} \\approx ${fr(Math.sqrt((2 * p.h0) / g))}$ s`,
        `Distance horizontale : $x = v_0\\,t \\approx ${fr(R, 1)}$ m. Il faut larguer ${fr(R, 0)} m avant la cible.`,
      ],
    },
  } satisfies ProjectileScenario;
})();

const irrigation = (() => {
  const p = { v0: 9, alphaDeg: 35, g, h0: 1.0 };
  const P = { ...p, alpha: deg2rad(p.alphaDeg) };
  const H = maxHeight(P);
  const R = range(P);
  return {
    id: 'jet-arrosage',
    chapter: 'projectile',
    title: 'Arrosage d\'un jardin maraicher',
    tagline: 'Jusqu\'ou et jusqu\'a quelle hauteur monte le jet ?',
    icon: 'water',
    context:
      `Un maraicher arrose ses planches d'oignons avec un tuyau tenu a ${fr(p.h0, 0)} m du sol. L'eau sort a ${p.v0} m/s avec un angle de ${p.alphaDeg}°.`,
    physics:
      "Chaque goutte d'eau se comporte comme un projectile : le jet entier dessine la parabole. On neglige le freinage de l'air sur les gouttes.",
    fact:
      "Mettre le pouce sur l'embout reduit la section de sortie : comme le debit se conserve, l'eau sort plus vite et le jet va plus loin !",
    params: p,
    scene: {
      target: { kind: 'zone', x1: 6.5, x2: 10, label: 'Planches d\'oignons' },
      launcher: 'hose',
      viewSize: 12,
      ballColor: '#38bdf8',
      ballRadius: 0.12,
    },
    challenge: {
      question: 'Quelle hauteur maximale (fleche) atteint le jet d\'eau par rapport au sol ?',
      unit: 'm',
      answer: H,
      tolerance: 0.03,
      solution: [
        'Au sommet, la vitesse verticale s\'annule : $v_y = v_0\\sin\\alpha - g t = 0$',
        'On en deduit : $y_{max} = h_0 + \\dfrac{(v_0\\sin\\alpha)^2}{2g}$',
        `A.N. : $y_{max} \\approx ${fr(H)}$ m. Le jet retombe a $${fr(R, 1)}$ m : en plein dans les planches.`,
      ],
    },
  } satisfies ProjectileScenario;
})();

const shotPut = (() => {
  const p = { v0: 13, alphaDeg: 38, g, h0: 2.1 };
  const R = range({ ...p, alpha: deg2rad(p.alphaDeg) });
  return {
    id: 'lancer-du-poids',
    chapter: 'projectile',
    title: 'Lancer du poids (EPS)',
    tagline: 'Le poids atteint-il la zone des 18 m ?',
    icon: 'shotput',
    context:
      `Au bac d'EPS, un athlète lâche le poids (une boule de 7,26 kg) à ${fr(p.h0, 1)} m du sol, avec une vitesse de ${p.v0} m/s et un angle de ${p.alphaDeg}°. Les meilleurs lancers retombent entre 18 et 21 m.`,
    physics:
      "Le poids est lourd et compact : la résistance de l'air est vraiment négligeable. C'est l'un des cas où le modèle du projectile est le plus précis.",
    fact:
      "Comme le poids part de haut (plus de 2 m), l'angle optimal n'est pas 45° mais environ 38° à 42°. Record du monde : 23,56 m (Ryan Crouser, 2023).",
    params: p,
    scene: {
      target: { kind: 'zone', x1: 18, x2: 21, label: 'Zone 18 – 21 m' },
      launcher: 'player',
      viewSize: 24,
      ballColor: '#94a3b8',
      ballRadius: 0.06,
    },
    challenge: {
      question: 'Calcule la distance horizontale du lancer (point de chute au sol).',
      unit: 'm',
      answer: R,
      tolerance: 0.03,
      solution: [
        "Équation de la trajectoire : $y = -\\dfrac{g}{2v_0^2\\cos^2\\alpha}x^2 + x\\tan\\alpha + h_0$",
        "Au sol, $y = 0$ : on résout l'équation du second degré en $x$ et on garde la racine positive.",
        `A.N. : $x_P \\approx ${fr(R, 2)}$ m`,
      ],
    },
  } satisfies ProjectileScenario;
})();

const fireHose = (() => {
  const p = { v0: 16, alphaDeg: 30, g, h0: 1.2 };
  const P = { ...p, alpha: deg2rad(p.alphaDeg) };
  const R = range(P);
  const H = maxHeight(P);
  return {
    id: 'lance-incendie',
    chapter: 'projectile',
    title: 'La lance des sapeurs-pompiers',
    tagline: "Jusqu'où et jusqu'à quelle hauteur va le jet ?",
    icon: 'fire',
    context:
      `Un sapeur-pompier tient sa lance à ${fr(p.h0, 1)} m du sol. L'eau sort à ${p.v0} m/s (${fr(p.v0 * 3.6, 0)} km/h) avec un angle de ${p.alphaDeg}°. Le foyer est au sol, à environ ${fr(R, 0)} m.`,
    physics:
      "Chaque goutte d'eau suit une parabole. Pour un jet puissant, l'air finit par disperser l'eau en gouttelettes : la portée réelle est un peu plus faible.",
    fact:
      "Pour atteindre un foyer plus éloigné sans s'approcher, le pompier augmente la pression (donc $v_0$) : la portée varie comme $v_0^2$.",
    params: p,
    scene: {
      target: { kind: 'zone', x1: R - 1.5, x2: R + 1.5, label: 'Foyer' },
      launcher: 'hose',
      viewSize: 28,
      ballColor: '#38bdf8',
      ballRadius: 0.1,
    },
    challenge: {
      question: 'Quelle hauteur maximale atteint le jet (par rapport au sol) ?',
      unit: 'm',
      answer: H,
      tolerance: 0.03,
      solution: [
        "Au sommet, $v_y = 0$ : $t_S = \\dfrac{v_0\\sin\\alpha}{g}$",
        "$y_{max} = h_0 + \\dfrac{(v_0\\sin\\alpha)^2}{2g}$",
        `A.N. : $y_{max} = ${fr(p.h0, 1)} + \\dfrac{(${p.v0}\\times 0{,}5)^2}{2\\times ${fr(g)}} \\approx ${fr(H)}$ m. Le jet retombe à ${fr(R, 1)} m.`,
      ],
    },
  } satisfies ProjectileScenario;
})();

const archery = (() => {
  const p = { v0: 55, alphaDeg: 4, g, h0: 1.5 };
  const P = { ...p, alpha: deg2rad(p.alphaDeg) };
  const R = range(P);
  const T = flightTime(P);
  return {
    id: 'tir-a-l-arc',
    chapter: 'projectile',
    title: "Tir à l'arc",
    tagline: "Pourquoi l'archer vise-t-il au-dessus de la cible ?",
    icon: 'archery',
    context:
      `Un archer décoche une flèche à ${p.v0} m/s depuis ${fr(p.h0, 1)} m de hauteur, en visant légèrement vers le haut (${p.alphaDeg}°). La cible olympique est à 70 m.`,
    physics:
      "Dès qu'elle quitte l'arc, la flèche n'est soumise (dans notre modèle) qu'à son poids : elle tombe pendant tout son vol. Si l'archer visait droit sur la cible, la flèche passerait en dessous.",
    fact:
      "À 70 m, une flèche met environ 1,3 s pour atteindre la cible et « tombe » de plusieurs mètres par rapport à la ligne de visée : le viseur de l'arc compense cette chute.",
    params: p,
    scene: {
      target: { kind: 'line', x: 70, label: 'Cible à 70 m' },
      launcher: 'player',
      viewSize: 90,
      ballColor: '#facc15',
      ballRadius: 0.05,
    },
    challenge: {
      question: "Calcule la durée du vol de la flèche jusqu'au sol (en s).",
      unit: 's',
      answer: T,
      tolerance: 0.03,
      solution: [
        "$y(t) = -\\tfrac12 g t^2 + v_0\\sin\\alpha\\,t + h_0 = 0$",
        "On garde la racine positive : $t = \\dfrac{v_0\\sin\\alpha + \\sqrt{(v_0\\sin\\alpha)^2 + 2gh_0}}{g}$",
        `A.N. : $t \\approx ${fr(T)}$ s ; la flèche retombe à ${fr(R, 0)} m, au-delà de la cible.`,
      ],
    },
  } satisfies ProjectileScenario;
})();

export const PROJECTILE_SCENARIOS: ProjectileScenario[] = [
  basket, football, longJump, helicopter, irrigation, shotPut, fireHose, archery,
];

// ============================================================
//  CINEMATIQUE
// ============================================================
const motoDry = (() => {
  const v0 = 15, a = -5;
  const d = mruvStoppingDistance({ x0: 0, v0, a }) as number;
  return {
    id: 'moto-freinage',
    chapter: 'cinematique',
    title: 'Freinage d\'urgence a moto',
    tagline: 'La moto s\'arrete-t-elle avant la charrette ?',
    icon: 'moto',
    context:
      `Une moto roule a ${v0} m/s (${fr(v0 * 3.6, 0)} km/h). Le conducteur freine au moment ou il voit une charrette arretee a 25 m. Sur route seche, la deceleration vaut ${Math.abs(a)} m/s².`,
    physics:
      "Pendant le freinage, l'acceleration est constante et opposee a la vitesse : c'est un MRUV. On ne compte ici que la distance de freinage (pas le temps de reaction).",
    fact:
      "La distance de freinage depend de $v_0^2$ : rouler 2 fois plus vite multiplie la distance de freinage par 4 ! Il faut y ajouter la distance de reaction : environ 1 s × v, soit 15 m a 54 km/h.",
    params: { motionType: 'MRUV', v0, a },
    scene: { vehicle: 'moto', obstacle: { x: 25, label: 'Charrette' } },
    challenge: {
      question: 'Calcule la distance de freinage de la moto.',
      unit: 'm',
      answer: d,
      tolerance: 0.02,
      solution: [
        'Relation independante du temps : $v^2 - v_0^2 = 2a(x - x_0)$',
        "A l'arret $v = 0$ : $d = \\dfrac{v_0^2}{2|a|}$",
        `A.N. : $d = \\dfrac{${v0}^2}{2 \\times ${Math.abs(a)}} = ${fr(d, 1)}$ m < 25 m : la moto s'arrete a temps.`,
      ],
    },
  } satisfies KinematicsScenario;
})();

const motoWet = (() => {
  const v0 = 15, a = -3;
  const d = mruvStoppingDistance({ x0: 0, v0, a }) as number;
  const vImpact = Math.sqrt(v0 * v0 + 2 * a * 25);
  return {
    id: 'moto-route-mouillee',
    chapter: 'cinematique',
    title: 'Freinage sur route mouillee',
    tagline: 'Meme vitesse, mais pendant la saison des pluies...',
    icon: 'rain',
    context:
      `Meme situation : moto a ${v0} m/s, charrette a 25 m. Mais la route est mouillee et la deceleration n'est plus que de ${Math.abs(a)} m/s².`,
    physics:
      "Sur une route mouillee ou sablonneuse, les pneus adherent moins : la force de frottement, donc la deceleration maximale, diminue.",
    fact:
      "Par temps de pluie, il faut augmenter la distance de securite et reduire sa vitesse : c'est de la physique, pas seulement du code de la route !",
    params: { motionType: 'MRUV', v0, a },
    scene: { vehicle: 'moto', obstacle: { x: 25, label: 'Charrette' } },
    challenge: {
      question: 'Calcule la distance de freinage sur route mouillee.',
      unit: 'm',
      answer: d,
      tolerance: 0.02,
      solution: [
        `$d = \\dfrac{v_0^2}{2|a|} = \\dfrac{${v0}^2}{2 \\times ${Math.abs(a)}} = ${fr(d, 1)}$ m > 25 m : collision !`,
        `Vitesse au moment du choc : $v = \\sqrt{v_0^2 + 2a \\times 25} \\approx ${fr(vImpact, 1)}$ m/s, soit ${fr(vImpact * 3.6, 0)} km/h.`,
        'Lance la simulation pour voir la difference avec la route seche.',
      ],
    },
  } satisfies KinematicsScenario;
})();

const sotrama = (() => {
  const a = 1.5, x = 30;
  const v = Math.sqrt(2 * a * x);
  return {
    id: 'sotrama-demarrage',
    chapter: 'cinematique',
    title: 'Demarrage d\'une Sotrama',
    tagline: 'Quelle vitesse apres 30 m ?',
    icon: 'bus',
    context:
      `Une Sotrama (minibus de transport en commun) demarre d'un arret avec une acceleration constante de ${fr(a, 1)} m/s².`,
    physics:
      'Depart arrete ($v_0 = 0$) avec acceleration constante : MRUV. En realite, l\'acceleration diminue quand le chauffeur change de vitesse.',
    fact:
      "Une voiture de sport atteint 100 km/h en environ 4 s (a ≈ 7 m/s²). Une Sotrama chargee met beaucoup plus longtemps : sa masse est grande pour une force motrice modeste (2e loi de Newton : a = F/m).",
    params: { motionType: 'MRUV', v0: 0, a },
    scene: { vehicle: 'bus' },
    challenge: {
      question: `Quelle est la vitesse de la Sotrama apres ${x} m ?`,
      unit: 'm/s',
      answer: v,
      tolerance: 0.03,
      solution: [
        '$v^2 - v_0^2 = 2a(x - x_0)$ avec $v_0 = 0$',
        `$v = \\sqrt{2 a x} = \\sqrt{2 \\times ${fr(a, 1)} \\times ${x}} \\approx ${fr(v)}$ m/s`,
        `Soit environ ${fr(v * 3.6, 0)} km/h.`,
      ],
    },
  } satisfies KinematicsScenario;
})();

const speedCheck = (() => {
  const v = 12;
  return {
    id: 'moto-vitesse-constante',
    chapter: 'cinematique',
    title: 'Controle de vitesse',
    tagline: 'Cette moto respecte-t-elle la limite ?',
    icon: 'speed',
    context:
      `Un agent mesure qu'une moto parcourt 30 m en ${fr(30 / v, 1)} s a vitesse constante. Supposons que la vitesse soit limitee a 50 km/h dans cette rue.`,
    physics:
      'Vitesse constante en ligne droite : MRU, $x = v\\,t$. Les radars mesurent la vitesse de la meme facon (distance / duree) ou par effet Doppler.',
    fact:
      "Pour convertir des m/s en km/h, on multiplie par 3,6 (1 m/s = 3600 m en 1 h = 3,6 km/h).",
    params: { motionType: 'MRU', v },
    scene: { vehicle: 'moto' },
    challenge: {
      question: 'Calcule la vitesse de la moto en km/h.',
      unit: 'km/h',
      answer: v * 3.6,
      tolerance: 0.02,
      solution: [
        `$v = \\dfrac{d}{t} = \\dfrac{30}{${fr(30 / v, 1)}} = ${v}$ m/s`,
        `$v = ${v} \\times 3{,}6 = ${fr(v * 3.6, 1)}$ km/h < 50 km/h : la moto respecte la limite.`,
      ],
    },
  } satisfies KinematicsScenario;
})();

const manege = (() => {
  const R = 4, omega = 0.8;
  const aN = mcuCentripetalAcceleration({ R, omega });
  return {
    id: 'manege-foire',
    chapter: 'cinematique',
    title: 'Manege de foire',
    tagline: 'Quelle acceleration ressent un enfant ?',
    icon: 'manege',
    context:
      `Un enfant est assis dans une nacelle a ${R} m de l'axe d'un manege qui tourne a ${fr(omega, 1)} rad/s.`,
    physics:
      "Vitesse angulaire constante : MCU. La vitesse garde la meme norme mais change de direction, donc il y a une acceleration dirigee vers le centre (acceleration normale).",
    fact:
      "C'est cette acceleration vers le centre qui donne l'impression d'etre « pousse vers l'exterieur ». Les montagnes russes atteignent 4 a 5 g, les pilotes de chasse jusqu'a 9 g.",
    params: { motionType: 'MCU', R, omega },
    scene: { vehicle: 'cabin' },
    challenge: {
      question: 'Calcule l\'acceleration centripete (normale) de l\'enfant.',
      unit: 'm/s²',
      answer: aN,
      tolerance: 0.02,
      solution: [
        '$a_N = \\dfrac{v^2}{R} = R\\,\\omega^2$',
        `A.N. : $a_N = ${R} \\times ${fr(omega, 1)}^2 = ${fr(aN)}$ m/s², soit environ ${fr(aN / 9.81, 2)} g.`,
      ],
    },
  } satisfies KinematicsScenario;
})();

const busStop = (() => {
  const v0 = 10, a = -2;
  const t = mruvStoppingTime({ x0: 0, v0, a }) as number;
  const d = mruvStoppingDistance({ x0: 0, v0, a }) as number;
  return {
    id: 'sotrama-arret',
    chapter: 'cinematique',
    title: "Arrêt en douceur d'une Sotrama",
    tagline: "Combien de temps pour s'arrêter au panneau ?",
    icon: 'stop',
    context:
      `Une Sotrama roule à ${v0} m/s (${fr(v0 * 3.6, 0)} km/h). Le chauffeur freine doucement (décélération ${Math.abs(a)} m/s²) pour s'arrêter au panneau d'arrêt situé à 28 m.`,
    physics:
      "Freinage à décélération constante : MRUV avec $a < 0$. La vitesse diminue de 2 m/s chaque seconde.",
    fact:
      "Un freinage doux (environ 2 m/s²) est confortable pour les passagers debout. Un freinage d'urgence peut dépasser 8 m/s² : sans ceinture, les passagers sont projetés vers l'avant (principe d'inertie).",
    params: { motionType: 'MRUV', v0, a },
    scene: { vehicle: 'bus', obstacle: { x: 28, label: "Panneau d'arrêt" } },
    challenge: {
      question: "Calcule la durée du freinage jusqu'à l'arrêt.",
      unit: 's',
      answer: t,
      tolerance: 0.02,
      solution: [
        "$v(t) = a\\,t + v_0$ ; à l'arrêt $v = 0$",
        `$t = -\\dfrac{v_0}{a} = \\dfrac{${v0}}{${Math.abs(a)}} = ${fr(t, 1)}$ s`,
        `Distance de freinage : $d = \\dfrac{v_0^2}{2|a|} = ${fr(d, 1)}$ m, avant le panneau.`,
      ],
    },
  } satisfies KinematicsScenario;
})();

const greenLight = (() => {
  const a = 2.5, x = 30;
  const t = mruvTimeToReach({ x0: 0, v0: 0, a }, x) as number;
  return {
    id: 'moto-feu-vert',
    chapter: 'cinematique',
    title: 'Départ au feu vert',
    tagline: 'Combien de temps pour traverser le carrefour ?',
    icon: 'traffic',
    context:
      `Au feu vert, une moto démarre avec une accélération constante de ${fr(a, 1)} m/s². Le carrefour à traverser mesure ${x} m.`,
    physics:
      "Départ arrêté avec accélération constante : MRUV, $x = \\tfrac12 a t^2$.",
    fact:
      "Le feu orange dure généralement 3 à 5 s : un véhicule qui démarre doit avoir dégagé le carrefour avant que les autres voies passent au vert.",
    params: { motionType: 'MRUV', v0: 0, a },
    scene: { vehicle: 'moto' },
    challenge: {
      question: `Combien de temps la moto met-elle pour parcourir les ${x} m ?`,
      unit: 's',
      answer: t,
      tolerance: 0.02,
      solution: [
        '$x = \\tfrac12 a t^2$ car $x_0 = 0$ et $v_0 = 0$',
        `$t = \\sqrt{\\dfrac{2x}{a}} = \\sqrt{\\dfrac{2\\times ${x}}{${fr(a, 1)}}} \\approx ${fr(t)}$ s`,
        `Vitesse à la sortie : $v = a\\,t \\approx ${fr(a * t, 1)}$ m/s.`,
      ],
    },
  } satisfies KinematicsScenario;
})();

const ferrisWheel = (() => {
  const R = 10, omega = 0.5;
  const T = mcuPeriod({ R, omega });
  const v = mcuLinearSpeed({ R, omega });
  return {
    id: 'grande-roue',
    chapter: 'cinematique',
    title: 'La grande roue de la fête',
    tagline: 'Combien de temps dure un tour ?',
    icon: 'wheel',
    context:
      `Une nacelle de grande roue est à ${R} m de l'axe. La roue tourne à vitesse constante, avec une vitesse angulaire de ${fr(omega, 1)} rad/s (une roue rapide de fête foraine).`,
    physics:
      "Chaque nacelle a un mouvement circulaire uniforme autour de l'axe : $v = R\\omega$ et $T = \\dfrac{2\\pi}{\\omega}$.",
    fact:
      "Les très grandes roues tournent bien plus lentement : un tour de la roue de Londres (135 m de haut) dure 30 minutes, soit $\\omega \\approx 0{,}0035$ rad/s.",
    params: { motionType: 'MCU', R, omega },
    scene: { vehicle: 'cabin' },
    challenge: {
      question: "Calcule la durée d'un tour complet (période).",
      unit: 's',
      answer: T,
      tolerance: 0.02,
      solution: [
        '$T = \\dfrac{2\\pi}{\\omega}$',
        `$T = \\dfrac{2\\pi}{${fr(omega, 1)}} \\approx ${fr(T, 1)}$ s`,
        `Vitesse de la nacelle : $v = R\\omega = ${fr(v, 1)}$ m/s.`,
      ],
    },
  } satisfies KinematicsScenario;
})();

export const KINEMATICS_SCENARIOS: KinematicsScenario[] = [
  motoDry, motoWet, sotrama, speedCheck, manege, busStop, greenLight, ferrisWheel,
];

// ============================================================
//  SATELLITE
// ============================================================
const iss = (() => {
  const h = 400e3;
  const T = orbitalPeriod({ h });
  return {
    id: 'iss',
    chapter: 'satellite',
    title: 'Station spatiale internationale (ISS)',
    tagline: 'Combien de temps pour faire le tour de la Terre ?',
    icon: 'iss',
    context:
      "L'ISS est un laboratoire habite qui tourne autour de la Terre a environ 400 km d'altitude, avec des astronautes a son bord.",
    physics:
      "Seule la force de gravitation agit : l'ISS est en chute libre permanente autour de la Terre. C'est pour cela que les astronautes flottent (impesanteur), alors que g vaut encore 8,7 m/s² a cette altitude.",
    fact:
      "L'ISS fait environ 16 tours de la Terre par jour : les astronautes voient 16 levers de soleil en 24 h. Elle est visible a l'oeil nu depuis Bamako lors de certains passages, comme une etoile tres brillante qui se deplace.",
    params: { h, timeWarp: 500 },
    scene: { name: 'ISS', color: '#e2e8f0' },
    challenge: {
      question: "Calcule la periode de revolution de l'ISS en minutes.",
      unit: 'min',
      answer: T / 60,
      tolerance: 0.03,
      solution: [
        '$T = \\dfrac{2\\pi}{R_T}\\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$',
        `A.N. avec $R_T = 6{,}4 \\times 10^6$ m et $g_0 = 9{,}8$ m/s² : $T \\approx ${fr(T, 0)}$ s`,
        `Soit $T \\approx ${fr(T / 60, 1)}$ min : environ ${fr(86400 / T, 1)} tours par jour.`,
      ],
    },
  } satisfies SatelliteScenario;
})();

const gps = (() => {
  const h = 20200e3;
  const T = orbitalPeriod({ h });
  return {
    id: 'gps',
    chapter: 'satellite',
    title: 'Satellites GPS de ton telephone',
    tagline: 'Comment ton telephone sait ou tu es ?',
    icon: 'gps',
    context:
      "Le GPS utilise une trentaine de satellites a environ 20 200 km d'altitude. Ton telephone capte leurs signaux pour calculer ta position.",
    physics:
      "Chaque satellite GPS est un satellite en orbite circulaire : sa periode est fixee par son altitude (3e loi de Kepler).",
    fact:
      "Il faut capter au moins 4 satellites pour calculer sa position. Les horloges des satellites doivent etre corrigees des effets de la relativite d'Einstein : sans cela, l'erreur atteindrait environ 10 km par jour !",
    params: { h, timeWarp: 2000 },
    scene: { name: 'GPS', color: '#facc15' },
    challenge: {
      question: "Calcule la periode de revolution d'un satellite GPS en heures.",
      unit: 'h',
      answer: T / 3600,
      tolerance: 0.03,
      solution: [
        '$T = \\dfrac{2\\pi}{R_T}\\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$ avec $h = 2{,}02 \\times 10^7$ m',
        `A.N. : $T \\approx ${fr(T, 0)}$ s $\\approx ${fr(T / 3600, 1)}$ h`,
        'Un satellite GPS fait donc environ 2 tours de la Terre par jour.',
      ],
    },
  } satisfies SatelliteScenario;
})();

const tv = (() => {
  const h = geostationaryAltitude();
  const v = linearSpeed({ h });
  return {
    id: 'satellite-tv',
    chapter: 'satellite',
    title: 'Satellite de television (geostationnaire)',
    tagline: 'Pourquoi les paraboles ne bougent jamais ?',
    icon: 'tv',
    context:
      "Les chaines de television par satellite utilisent des satellites geostationnaires : ils tournent en 24 h, dans le meme sens que la Terre, au-dessus de l'equateur.",
    physics:
      "Sa periode est egale a celle de la rotation de la Terre : vu du sol, il parait immobile. Observe le point rouge (Bamako) : le satellite reste toujours au-dessus de la meme region.",
    fact:
      "C'est pourquoi une antenne parabolique est fixe. Au Mali (hemisphere nord), les paraboles sont orientees vers le sud, car les satellites geostationnaires sont au-dessus de l'equateur.",
    params: { h, timeWarp: 5000 },
    scene: { name: 'Sat. TV', color: '#f472b6' },
    challenge: {
      question: "Calcule la vitesse d'un satellite geostationnaire en km/s.",
      unit: 'km/s',
      answer: v / 1000,
      tolerance: 0.03,
      solution: [
        `Altitude geostationnaire (T = 24 h) : $h \\approx ${fr(h / 1e3, 0)}$ km`,
        '$v = R_T\\sqrt{\\dfrac{g_0}{R_T + h}}$',
        `A.N. : $v \\approx ${fr(v, 0)}$ m/s $\\approx ${fr(v / 1000)}$ km/s (plus de 11 000 km/h !)`,
      ],
    },
  } satisfies SatelliteScenario;
})();

const earthObservation = (() => {
  const h = 786e3;
  const T = orbitalPeriod({ h });
  return {
    id: 'observation-terre',
    chapter: 'satellite',
    title: "Satellite d'observation de la Terre",
    tagline: 'Combien de tours par jour pour photographier le Sahel ?',
    icon: 'satellite',
    context:
      "Les satellites d'observation (comme Sentinel-2, utilisé pour suivre les cultures et l'avancée du désert au Sahel) tournent à environ 786 km d'altitude.",
    physics:
      "Orbite circulaire basse : plus le satellite est bas, plus il va vite et plus sa période est courte. On utilise la même formule que pour l'ISS.",
    fact:
      "Ces satellites passent au-dessus des pôles : la Terre tourne sous leur orbite et ils photographient toute sa surface en quelques jours, toujours à la même heure locale.",
    params: { h, timeWarp: 600 },
    scene: { name: 'Sentinel', color: '#86efac' },
    challenge: {
      question: 'Calcule la période de révolution en minutes.',
      unit: 'min',
      answer: T / 60,
      tolerance: 0.03,
      solution: [
        '$T = \\dfrac{2\\pi}{R_T}\\sqrt{\\dfrac{(R_T + h)^3}{g_0}}$',
        `A.N. : $T \\approx ${fr(T, 0)}$ s $\\approx ${fr(T / 60, 1)}$ min, soit ${fr(86400 / T, 1)} tours par jour.`,
      ],
    },
  } satisfies SatelliteScenario;
})();

const starlink = (() => {
  const h = 550e3;
  const v = linearSpeed({ h });
  return {
    id: 'internet-satellite',
    chapter: 'satellite',
    title: 'Internet par satellite',
    tagline: 'À quelle vitesse filent ces satellites ?',
    icon: 'wifi',
    context:
      "Les constellations d'internet par satellite (comme Starlink) placent des milliers de petits satellites à environ 550 km d'altitude, pour apporter internet jusque dans les villages isolés.",
    physics:
      "Satellite en orbite circulaire : $v = R_T\\sqrt{\\dfrac{g_0}{R_T + h}}$. La vitesse ne dépend pas de la masse du satellite.",
    fact:
      "Plus bas qu'un satellite géostationnaire (36 000 km), le signal fait un trajet beaucoup plus court : le délai de réponse (latence) passe d'environ 600 ms à quelques dizaines de ms.",
    params: { h, timeWarp: 600 },
    scene: { name: 'Internet', color: '#c4b5fd' },
    challenge: {
      question: 'Calcule la vitesse du satellite en km/h.',
      unit: 'km/h',
      answer: v * 3.6,
      tolerance: 0.03,
      solution: [
        '$v = R_T\\sqrt{\\dfrac{g_0}{R_T + h}}$',
        `A.N. : $v \\approx ${fr(v, 0)}$ m/s, soit ${fr(v * 3.6, 0)} km/h (on multiplie par 3,6).`,
      ],
    },
  } satisfies SatelliteScenario;
})();

const hubble = (() => {
  const h = 540e3;
  const gh = gravityAt({ h });
  return {
    id: 'telescope-hubble',
    chapter: 'satellite',
    title: 'Le télescope spatial Hubble',
    tagline: 'Y a-t-il encore de la pesanteur là-haut ?',
    icon: 'telescope',
    context:
      "Le télescope Hubble observe l'Univers depuis 1990, en orbite à environ 540 km d'altitude, au-dessus de l'atmosphère qui brouille les images.",
    physics:
      "Le champ de gravitation diminue avec l'altitude : $g = g_0\\left(\\dfrac{R_T}{R_T + h}\\right)^2$. Hubble n'est pas « sans pesanteur » : il est en chute libre permanente.",
    fact:
      "Hubble a permis de préciser l'âge de l'Univers (environ 13,8 milliards d'années). Son successeur, le télescope James Webb, est placé beaucoup plus loin, à 1,5 million de km.",
    params: { h, timeWarp: 600 },
    scene: { name: 'Hubble', color: '#fde68a' },
    challenge: {
      question: "Calcule l'intensité du champ de gravitation à l'altitude de Hubble.",
      unit: 'm/s²',
      answer: gh,
      tolerance: 0.02,
      solution: [
        '$g = g_0\\left(\\dfrac{R_T}{R_T + h}\\right)^2$ avec $g_0 = 9{,}8$ m/s² et $R_T = 6{,}4\\times10^6$ m',
        `A.N. : $g \\approx ${fr(gh)}$ m/s², soit ${fr((gh / 9.8) * 100, 0)} % de sa valeur au sol.`,
      ],
    },
  } satisfies SatelliteScenario;
})();

export const SATELLITE_SCENARIOS: SatelliteScenario[] = [iss, gps, tv, earthObservation, starlink, hubble];

export const SIM_SCENARIOS: SimScenario[] = [
  ...KINEMATICS_SCENARIOS,
  ...PROJECTILE_SCENARIOS,
  ...SATELLITE_SCENARIOS,
];

export const ALL_SCENARIOS: RealLifeScenario[] = [...SIM_SCENARIOS, ...CHAPTER_SCENARIOS];

/** Scenarios d'un chapitre (dans l'ordre de definition) */
export function scenariosFor(chapter: Chapter): RealLifeScenario[] {
  return ALL_SCENARIOS.filter((s) => s.chapter === chapter);
}

export const CHAPTER_INFO: Record<Chapter, { label: string; href: string; chapterLabel: string }> = {
  cinematique: {
    label: "Mouvement du centre d'inertie",
    chapterLabel: 'Mecanique - Chapitre 1',
    href: '/lecons/physique/cinematique',
  },
  projectile: {
    label: 'Projectile dans le champ de pesanteur',
    chapterLabel: 'Mecanique - Chapitre 2',
    href: '/lecons/physique/projectile',
  },
  satellite: {
    label: 'Satellite terrestre',
    chapterLabel: 'Mecanique - Chapitre 3',
    href: '/lecons/physique/satellite',
  },
  ...GENERIC_CHAPTER_INFO,
};

export function scenarioHref(s: RealLifeScenario): string {
  return `${CHAPTER_INFO[s.chapter].href}?scenario=${s.id}#vie-reelle`;
}

export function findScenario(id: string | null | undefined): RealLifeScenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}
