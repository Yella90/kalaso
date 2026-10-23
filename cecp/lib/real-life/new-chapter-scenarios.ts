// lib/real-life/new-chapter-scenarios.ts
// ============================================================
//  Scenarios "Vie reelle" des chapitres : transformateurs, laser,
//  pendule de torsion, ondes electromagnetiques, oscillations
//  mecaniques forcees, rayons X, noyau atomique.
//  Les reponses sont CALCULEES par les moteurs physiques (lib/physics).
// ============================================================

import type { GenericScenario } from './scenarios';
import { secondaryVoltage, lineLoss } from '../physics/transformer';
import { photonsPerSecond, laserPhotonEnergy } from '../physics/laser';
import { torsionConstant, twoMassesInertia } from '../physics/torsion';
import { emWavelength, propagationTime } from '../physics/em-waves';
import { naturalFrequency } from '../physics/forced-oscillations';
import { minWavelength, transmitted } from '../physics/xrays';
import { MEV_J } from '../physics/nucleus';
import { nucleiInMass } from '../physics/nuclear';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');
const C_LIGHT = 3e8;

// ============================================================
//  Transformateurs et alternateurs
// ============================================================
const phoneCharger = (() => {
  const U1 = 220, U2 = 5, N1 = 2200;
  const N2 = (N1 * U2) / U1;
  return {
    id: 'chargeur-telephone',
    chapter: 'transformateurs',
    title: 'Le chargeur de téléphone',
    tagline: 'Comment passer de 220 V à 5 V ?',
    icon: 'spark',
    context:
      `Ton téléphone se recharge sous ${U2} V alors que la prise délivre ${U1} V. Dans un chargeur simple, un petit transformateur abaisseur fait le travail. Son primaire compte ${N1} spires.`,
    physics:
      "Pour un transformateur parfait, $U_2/U_1 = N_2/N_1$. Les chargeurs modernes utilisent en plus un circuit électronique (redresseur, découpage) pour obtenir une tension continue.",
    fact:
      "Un chargeur reste un peu tiède même branché sans téléphone : le noyau et les fils dissipent un peu d'énergie (pertes fer et cuivre). Pense à le débrancher !",
    challenge: {
      question: 'Combien de spires faut-il au secondaire pour obtenir 5 V ?',
      unit: 'spires',
      answer: N2,
      tolerance: 0.02,
      solution: [
        '$\\dfrac{N_2}{N_1} = \\dfrac{U_2}{U_1} \\Rightarrow N_2 = N_1\\dfrac{U_2}{U_1}$',
        `A.N. : $N_2 = ${N1} \\times \\dfrac{${U2}}{${U1}} = ${fr(N2, 0)}$ spires (vérification : $U_2 = ${fr(secondaryVoltage(U1, N1, N2), 1)}$ V)`,
      ],
    },
  } satisfies GenericScenario;
})();

const manantaliLine = (() => {
  const P = 100e6, R = 20, U = 225e3;
  const loss = lineLoss(P, U, R);
  return {
    id: 'ligne-manantali',
    chapter: 'transformateurs',
    title: 'La ligne haute tension de Manantali',
    tagline: 'Combien d\'énergie se perd sur la route vers Bamako ?',
    icon: 'thunder',
    context:
      "Le barrage de Manantali envoie l'électricité vers Bamako par une ligne à haute tension. Supposons qu'elle transporte $P = 100$ MW sous $U = 225$ kV, avec une résistance totale $R = 20\\ \\Omega$.",
    physics:
      "L'intensité dans la ligne vaut $I = P/U$ et les pertes par effet Joule $p = RI^2 = RP^2/U^2$. Des transformateurs élèvent la tension à la sortie du barrage puis l'abaissent près des villes.",
    fact:
      "Le barrage de Manantali, sur le Bafing, alimente le Mali, le Sénégal et la Mauritanie grâce à plus de 1 500 km de lignes haute tension.",
    challenge: {
      question: 'Calcule la puissance perdue par effet Joule dans la ligne (en MW).',
      unit: 'MW',
      answer: loss / 1e6,
      tolerance: 0.02,
      solution: [
        `$I = \\dfrac{P}{U} = \\dfrac{10^8}{2{,}25\\times10^5} \\approx ${fr(P / U, 0)}$ A`,
        `$p = RI^2 \\approx ${fr(loss / 1e6, 2)}$ MW, soit environ ${fr((loss / P) * 100, 1)} % de la puissance transportée.`,
        'Sous 22,5 kV seulement, les pertes seraient 100 fois plus grandes : plus que la puissance transportée !',
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Laser
// ============================================================
const barcode = (() => {
  const P = 1e-3, lambda = 632.8e-9;
  const N = photonsPerSecond(P, lambda);
  return {
    id: 'lecteur-codes-barres',
    chapter: 'laser',
    title: 'Le lecteur de codes-barres',
    tagline: 'Combien de photons balaient le code à chaque seconde ?',
    icon: 'laser',
    context:
      "À la caisse d'un supermarché, le lecteur balaie le code-barres avec un laser rouge hélium-néon de longueur d'onde 632,8 nm et de puissance 1 mW.",
    physics:
      "La puissance du faisceau est l'énergie transportée par seconde : $P = N \\dfrac{hc}{\\lambda}$, où $N$ est le nombre de photons émis par seconde.",
    fact:
      "Les barres noires absorbent la lumière, les espaces blancs la renvoient : le capteur lit donc une suite de flashs qui code le numéro du produit.",
    challenge: {
      question: 'Calcule le nombre de photons émis par seconde (en 10¹⁵ photons/s).',
      unit: '×10¹⁵',
      answer: N / 1e15,
      tolerance: 0.02,
      solution: [
        `$E = \\dfrac{hc}{\\lambda} \\approx ${fr(laserPhotonEnergy(lambda) / 1e-19, 2)}\\times10^{-19}$ J`,
        `$N = \\dfrac{P}{E} \\approx ${fr(N / 1e15, 2)}\\times10^{15}$ photons par seconde`,
      ],
    },
  } satisfies GenericScenario;
})();

const eyeSurgery = (() => {
  const lambda = 193e-9;
  const EeV = laserPhotonEnergy(lambda) / 1.6e-19;
  return {
    id: 'chirurgie-oeil',
    chapter: 'laser',
    title: 'Corriger la myopie au laser',
    tagline: 'Pourquoi un laser ultraviolet pour sculpter la cornée ?',
    icon: 'hospital',
    context:
      "Pour corriger la myopie, les ophtalmologues remodèlent la cornée avec un laser excimère ultraviolet de longueur d'onde 193 nm, qui enlève la matière couche par couche.",
    physics:
      "Chaque photon UV transporte assez d'énergie pour casser directement les liaisons des molécules de la cornée, sans chauffer les tissus voisins.",
    fact:
      "Chaque impulsion n'enlève qu'environ un quart de micromètre de tissu : l'opération demande des centaines d'impulsions guidées par ordinateur.",
    challenge: {
      question: "Calcule l'énergie d'un photon de ce laser (en eV).",
      unit: 'eV',
      answer: EeV,
      tolerance: 0.02,
      solution: [
        '$E = \\dfrac{hc}{\\lambda}$ puis on divise par $1{,}6\\times10^{-19}$ pour l\'avoir en eV',
        `$E = \\dfrac{6{,}63\\times10^{-34}\\times 3\\times10^8}{193\\times10^{-9}} \\approx ${fr(EeV, 2)}$ eV, trois fois plus qu'un photon rouge.`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Pendule de torsion
// ============================================================
const anniversaryClock = (() => {
  const J = 2e-4, T = 15;
  const C = torsionConstant(J, T);
  return {
    id: 'horloge-400-jours',
    chapter: 'pendule-torsion',
    title: 'L\'horloge « 400 jours »',
    tagline: 'Une horloge qu\'on ne remonte qu\'une fois par an.',
    icon: 'clock',
    context:
      "Sous le globe de verre de cette horloge, un disque tourne lentement dans un sens puis dans l'autre, suspendu à un fil de torsion très fin. Le disque a un moment d'inertie $J = 2\\times10^{-4}$ kg·m² et oscille avec une période de 15 s.",
    physics:
      "Le disque et son fil forment un pendule de torsion de période $T_0 = 2\\pi\\sqrt{J/C}$. Comme la période est longue, le mécanisme consomme très peu d'énergie.",
    fact:
      "Avec seulement 4 oscillations par minute, un seul remontage du ressort suffit pour faire marcher l'horloge plus d'un an.",
    challenge: {
      question: 'Calcule la constante de torsion C du fil (en 10⁻⁵ N·m/rad).',
      unit: '×10⁻⁵ N·m/rad',
      answer: C / 1e-5,
      tolerance: 0.02,
      solution: [
        '$T_0 = 2\\pi\\sqrt{\\dfrac{J}{C}} \\Rightarrow C = \\dfrac{4\\pi^2 J}{T_0^2}$',
        `A.N. : $C = \\dfrac{4\\pi^2 \\times 2\\times10^{-4}}{15^2} \\approx ${fr(C / 1e-5, 2)}\\times10^{-5}$ N·m/rad : un fil extrêmement souple.`,
      ],
    },
  } satisfies GenericScenario;
})();

const cavendish = (() => {
  const m = 0.73, d = 0.93, T = 420;
  const J = twoMassesInertia(m, d);
  const C = torsionConstant(J, T);
  return {
    id: 'balance-cavendish',
    chapter: 'pendule-torsion',
    title: 'Peser la Terre avec un fil',
    tagline: 'La balance de torsion de Cavendish (1798).',
    icon: 'scale',
    context:
      "Pour mesurer la constante de gravitation $G$, Cavendish suspendit à un fil une tige portant deux boules de plomb de 0,73 kg chacune, à 0,93 m de l'axe. Les oscillations libres duraient environ 7 minutes.",
    physics:
      "En mesurant la période, on connaît la constante de torsion $C$ ; on mesure ensuite le petit angle dont tourne la tige quand on approche deux grosses boules : on en déduit la force de gravitation entre les boules.",
    fact:
      "On dit que Cavendish a « pesé la Terre » : connaissant $G$, on peut calculer la masse de la Terre à partir de $g = GM_T/R_T^2$.",
    challenge: {
      question: 'Calcule la constante de torsion du fil (en 10⁻⁴ N·m/rad). On néglige la masse de la tige.',
      unit: '×10⁻⁴ N·m/rad',
      answer: C / 1e-4,
      tolerance: 0.02,
      solution: [
        `$J = 2md^2 = 2\\times0{,}73\\times0{,}93^2 \\approx ${fr(J, 3)}$ kg·m²`,
        `$C = \\dfrac{4\\pi^2 J}{T_0^2}$ avec $T_0 = 420$ s : $C \\approx ${fr(C / 1e-4, 2)}\\times10^{-4}$ N·m/rad`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Ondes electromagnetiques
// ============================================================
const phoneAntenna = (() => {
  const f = 800e6;
  const lambda = emWavelength(f);
  return {
    id: 'antenne-telephone',
    chapter: 'ondes-electromagnetiques',
    title: "L'antenne de ton téléphone",
    tagline: 'Pourquoi tient-elle dans la poche ?',
    icon: 'wifi',
    context:
      "En 4G, ton téléphone communique avec l'antenne-relais du quartier sur une fréquence d'environ 800 MHz. Son antenne interne est de type « quart d'onde ».",
    physics:
      "Les ondes du téléphone sont des ondes électromagnétiques (micro-ondes) de célérité $c = 3\\times10^8$ m/s. Une antenne efficace mesure environ $\\lambda/4$.",
    fact:
      "Les vieux téléphones des années 1990 avaient une antenne qui dépassait du boîtier ; aujourd'hui elle est repliée en zigzag sur le circuit imprimé.",
    challenge: {
      question: "Calcule la longueur d'une antenne quart d'onde (en cm).",
      unit: 'cm',
      answer: (lambda / 4) * 100,
      tolerance: 0.02,
      solution: [
        `$\\lambda = \\dfrac{c}{f} = \\dfrac{3\\times10^8}{8\\times10^8} = ${fr(lambda, 3)}$ m`,
        `$\\ell = \\dfrac{\\lambda}{4} \\approx ${fr((lambda / 4) * 100, 1)}$ cm`,
      ],
    },
  } satisfies GenericScenario;
})();

const sunlight = (() => {
  const d = 1.5e11;
  const t = propagationTime(d);
  return {
    id: 'lumiere-soleil',
    chapter: 'ondes-electromagnetiques',
    title: 'La lumière du Soleil arrive en retard',
    tagline: 'Quand tu regardes le Soleil, tu le vois dans le passé.',
    icon: 'sun',
    context:
      "La lumière, les infrarouges et les UV du Soleil traversent le vide spatial jusqu'à nous. La distance Terre-Soleil vaut environ $1{,}5\\times10^{11}$ m.",
    physics:
      "Toutes les ondes électromagnétiques se propagent dans le vide à la même célérité $c = 3\\times10^8$ m/s, quelle que soit leur longueur d'onde.",
    fact:
      "Si le Soleil s'éteignait brusquement, nous continuerions à le voir briller pendant plusieurs minutes.",
    challenge: {
      question: 'Combien de minutes la lumière met-elle pour venir du Soleil ?',
      unit: 'min',
      answer: t / 60,
      tolerance: 0.02,
      solution: [`$t = \\dfrac{d}{c} = \\dfrac{1{,}5\\times10^{11}}{3\\times10^8} = ${fr(t, 0)}$ s`, `soit ${fr(t / 60, 2)} minutes`],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Oscillations mecaniques forcees
// ============================================================
const footbridge = (() => {
  const p = { m: 5e4, k: 8e6, h: 1e4, F0: 1 };
  const N0 = naturalFrequency(p);
  return {
    id: 'passerelle-pietons',
    chapter: 'oscillations-mecaniques-forcees',
    title: 'La passerelle qui tremble',
    tagline: 'Pourquoi interdit-on aux soldats de marcher au pas sur un pont ?',
    icon: 'jump',
    context:
      "On modélise une passerelle piétonne par un oscillateur de masse effective $m = 50$ t et de raideur $k = 8\\times10^6$ N/m. Des piétons marchent dessus à environ 2 pas par seconde.",
    physics:
      "Les pas des marcheurs jouent le rôle d'excitateur. Si leur fréquence est proche de la fréquence propre de la passerelle, l'amplitude des oscillations devient très grande : c'est la résonance.",
    fact:
      "En 2000, le Millennium Bridge de Londres a dû fermer deux jours après son inauguration : il oscillait sous les pas de la foule. On l'a équipé d'amortisseurs.",
    challenge: {
      question: 'Calcule la fréquence propre N₀ de la passerelle (en Hz). Y a-t-il un risque ?',
      unit: 'Hz',
      answer: N0,
      tolerance: 0.02,
      solution: [
        '$N_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}}$',
        `$N_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{8\\times10^6}{5\\times10^4}} \\approx ${fr(N0, 2)}$ Hz`,
        'C\'est presque exactement le rythme de la marche (2 Hz) : risque de résonance, il faut ajouter des amortisseurs.',
      ],
    },
  } satisfies GenericScenario;
})();

const washingMachine = (() => {
  const p = { m: 40, k: 1.6e5, h: 100, F0: 1 };
  const N0 = naturalFrequency(p);
  return {
    id: 'machine-a-laver',
    chapter: 'oscillations-mecaniques-forcees',
    title: 'La machine à laver qui saute',
    tagline: 'Pourquoi tremble-t-elle à une certaine vitesse ?',
    icon: 'wheel',
    context:
      "Le tambour d'une machine à laver (40 kg avec le linge mouillé) est suspendu par des ressorts de raideur totale $k = 1{,}6\\times10^5$ N/m. Le linge mal réparti fait tourner un balourd qui excite la suspension.",
    physics:
      "Le balourd tourne à la vitesse du tambour : c'est un excitateur de fréquence $N = n$ (tours par seconde). Quand $N$ passe par la fréquence propre, la machine vibre très fort.",
    fact:
      "Les machines modernes accélèrent vite pour traverser rapidement la zone de résonance, et leurs amortisseurs limitent l'amplitude.",
    challenge: {
      question: 'À quelle vitesse du tambour (en tr/min) la machine entre-t-elle en résonance ?',
      unit: 'tr/min',
      answer: N0 * 60,
      tolerance: 0.02,
      solution: [
        `$N_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}} = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{1{,}6\\times10^5}{40}} \\approx ${fr(N0, 2)}$ Hz`,
        `$n = 60\\,N_0 \\approx ${fr(N0 * 60, 0)}$ tr/min`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Rayons X
// ============================================================
const dentalXray = (() => {
  const U = 60e3;
  const lm = minWavelength(U);
  return {
    id: 'radio-dentaire',
    chapter: 'rayons-x',
    title: 'La radio chez le dentiste',
    tagline: 'Voir une carie cachée sous l\'émail.',
    icon: 'bone',
    context:
      "Le petit appareil de radiographie du dentiste est un tube à rayons X qui fonctionne sous une tension de 60 kV.",
    physics:
      "Les électrons accélérés sous $U$ produisent des rayons X dont la longueur d'onde est au moins égale à $\\lambda_{min} = hc/(eU)$. Les dents, riches en calcium, absorbent plus les rayons X que les gencives.",
    fact:
      "Une radio dentaire délivre une dose très faible, comparable à celle reçue naturellement en une journée. Le tablier de plomb protège le reste du corps.",
    challenge: {
      question: "Calcule la longueur d'onde minimale des rayons X émis (en pm).",
      unit: 'pm',
      answer: lm * 1e12,
      tolerance: 0.02,
      solution: [
        '$\\lambda_{min} = \\dfrac{hc}{eU}$',
        `$\\lambda_{min} = \\dfrac{6{,}63\\times10^{-34}\\times3\\times10^8}{1{,}6\\times10^{-19}\\times6\\times10^4} \\approx ${fr(lm * 1e12, 1)}$ pm`,
      ],
    },
  } satisfies GenericScenario;
})();

const leadApron = (() => {
  const mu = 55, x = 0.05; // cm^-1, cm
  const frac = transmitted(1, mu, x);
  return {
    id: 'tablier-plomb',
    chapter: 'rayons-x',
    title: 'Le tablier de plomb',
    tagline: 'Que laisse passer 0,5 mm de plomb ?',
    icon: 'hospital',
    context:
      "En radiologie, le personnel porte un tablier contenant l'équivalent de 0,5 mm de plomb. Pour les rayons X utilisés, le coefficient d'atténuation du plomb vaut $\\mu = 55$ cm⁻¹.",
    physics:
      "Un écran d'épaisseur $x$ transmet la fraction $I/I_0 = e^{-\\mu x}$ du rayonnement. Le plomb, très dense et de numéro atomique élevé, absorbe fortement les rayons X.",
    fact:
      "C'est cette différence d'absorption qui crée l'image : les os (calcium) arrêtent les rayons X et apparaissent blancs sur la radiographie.",
    challenge: {
      question: 'Quel pourcentage des rayons X traverse le tablier ?',
      unit: '%',
      answer: frac * 100,
      tolerance: 0.03,
      solution: [`$\\dfrac{I}{I_0} = e^{-\\mu x} = e^{-55\\times0{,}05} = e^{-2{,}75}$`, `$\\dfrac{I}{I_0} \\approx ${fr(frac, 4)}$, soit environ ${fr(frac * 100, 1)} %`],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Noyau atomique
// ============================================================
const sunMassLoss = (() => {
  const P = 3.8e26;
  const dmdt = P / (C_LIGHT * C_LIGHT);
  return {
    id: 'soleil-masse',
    chapter: 'noyau-atomique',
    title: 'Le Soleil maigrit chaque seconde',
    tagline: 'La fusion transforme de la masse en lumière.',
    icon: 'sun',
    context:
      "Au cœur du Soleil, des noyaux d'hydrogène fusionnent en hélium. Le Soleil rayonne une puissance de $3{,}8\\times10^{26}$ W.",
    physics:
      "L'énergie rayonnée provient du défaut de masse des réactions de fusion : $E = \\Delta m\\,c^2$. Chaque seconde, le Soleil perd donc une masse $\\Delta m = P/c^2$.",
    fact:
      "Malgré cette perte énorme, le Soleil est si massif ($2\\times10^{30}$ kg) qu'il brillera encore environ 5 milliards d'années.",
    challenge: {
      question: 'Quelle masse le Soleil perd-il chaque seconde (en millions de tonnes) ?',
      unit: 'Mt',
      answer: dmdt / 1e9,
      tolerance: 0.02,
      solution: [
        '$\\Delta m = \\dfrac{E}{c^2}$ avec $E = 3{,}8\\times10^{26}$ J chaque seconde',
        `$\\Delta m = \\dfrac{3{,}8\\times10^{26}}{(3\\times10^8)^2} \\approx ${fr(dmdt / 1e9, 2)}\\times10^{9}$ kg, soit ${fr(dmdt / 1e9, 1)} millions de tonnes par seconde`,
      ],
    },
  } satisfies GenericScenario;
})();

const fissionGram = (() => {
  const N = nucleiInMass(1, 235);
  const E = N * 200 * MEV_J;
  return {
    id: 'fission-un-gramme',
    chapter: 'noyau-atomique',
    title: "Un gramme d'uranium",
    tagline: 'Autant d\'énergie que des tonnes de pétrole.',
    icon: 'fire',
    context:
      "Dans une centrale nucléaire, chaque fission d'un noyau d'uranium 235 libère environ 200 MeV. On fait fissionner 1 g d'uranium 235 ($M = 235$ g/mol).",
    physics:
      "Les noyaux lourds sont moins liés que les noyaux moyens produits par la fission : la différence d'énergie de liaison est libérée, surtout sous forme d'énergie cinétique des fragments, qui chauffe l'eau du réacteur.",
    fact:
      "1 g d'uranium 235 libère à peu près autant d'énergie que la combustion de 2 tonnes de pétrole.",
    challenge: {
      question: "Calcule l'énergie libérée par la fission de 1 g d'uranium 235 (en 10¹⁰ J).",
      unit: '×10¹⁰ J',
      answer: E / 1e10,
      tolerance: 0.02,
      solution: [
        `$N = \\dfrac{m}{M}N_A = \\dfrac{1}{235}\\times6{,}022\\times10^{23} \\approx ${fr(N / 1e21, 2)}\\times10^{21}$ noyaux`,
        `$E = N\\times200\\ \\text{MeV}\\times1{,}6\\times10^{-13}\\ \\text{J/MeV} \\approx ${fr(E / 1e10, 2)}\\times10^{10}$ J`,
      ],
    },
  } satisfies GenericScenario;
})();

export const NEW_CHAPTER_SCENARIOS: GenericScenario[] = [
  phoneCharger, manantaliLine, barcode, eyeSurgery, anniversaryClock, cavendish,
  phoneAntenna, sunlight, footbridge, washingMachine, dentalXray, leadApron, sunMassLoss, fissionGram,
];
