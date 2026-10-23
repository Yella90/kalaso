// lib/real-life/chapter-scenarios.ts
// ============================================================
//  Scenarios "Vie reelle" des chapitres dont la simulation n'est
//  pas pilotee par un decor : mise en situation + defi.
//  Les reponses sont CALCULEES par les moteurs physiques (lib/physics).
//  Aucune dependance React : testable en isolation.
// ============================================================

import type { GenericScenario } from './scenarios';
import { findChapter } from '../curriculum';
import { springPeriod, verticalElongation, pendulumPeriod, secondsPendulumLength } from '../physics/oscillators';
import { PARTICLES, cyclotronPeriod, spectroSeparation } from '../physics/magnetic';
import { ISOTOPES, YEAR_S, ageFromRatio, remaining } from '../physics/nuclear';
import { thresholdWavelength, photonFlux, photonEnergy, toEV, transitionWavelength } from '../physics/quantum';
import { fringeSpacing } from '../physics/light';
import { C_WATER, equilibriumTemperature, mixWaterIce } from '../physics/thermal';
import { magneticEnergy, capacitanceForFrequency, bandwidth } from '../physics/electric';
import { thunderDistance, wavelength } from '../physics/waves';
import { molarMass } from '../chemistry/molecule';
import { moleculeOf } from '../chemistry/library';
import { equilibriumAdvance, soapMass } from '../chemistry/reactions';
import { WEAK_SPECIES, weakSolutionPH } from '../chemistry/acidbase';
import { sequencesWithRepetition } from '../chemistry/peptides';
import { NEW_CHAPTER_SCENARIOS } from './new-chapter-scenarios';

export const GENERIC_CHAPTERS = [
  'pendule-elastique', 'pendule-pesant', 'champ-magnetique', 'radioactivite', 'effet-photoelectrique',
  'interferences-lumineuses', 'calorimetrie', 'auto-induction', 'circuit-oscillant',
  'oscillations-electriques-forcees', 'ondes-progressives', 'interferences-mecaniques', 'niveaux-energie',
  'stereochimie', 'alcools', 'amines', 'acides-carboxyliques', 'acides-amines',
  'transformateurs', 'laser', 'pendule-torsion', 'ondes-electromagnetiques',
  'oscillations-mecaniques-forcees', 'rayons-x', 'noyau-atomique',
] as const;
export type GenericChapter = (typeof GENERIC_CHAPTERS)[number];

/** Libelles et liens des chapitres, tires du programme (lib/curriculum) */
export const GENERIC_CHAPTER_INFO = Object.fromEntries(
  GENERIC_CHAPTERS.map((slug) => {
    const c = findChapter(slug);
    return [slug, { label: c?.title ?? slug, chapterLabel: c?.partTitle ?? '', href: c?.href ?? '/cours' }];
  }),
) as Record<GenericChapter, { label: string; href: string; chapterLabel: string }>;

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');
const isotope = (id: string) => ISOTOPES.find((i) => i.id === id)!;
const proton = PARTICLES.find((p) => p.id === 'proton')!;

// ============================================================
//  Pendule elastique
// ============================================================
const suspension = (() => {
  const m = 200, k = 5e4;
  const T = springPeriod({ m, k });
  return {
    id: 'suspension-moto',
    chapter: 'pendule-elastique',
    title: "Suspension d'une moto",
    tagline: 'À quel rythme la moto rebondit-elle après un nid-de-poule ?',
    icon: 'moto',
    context:
      `Une moto chargée (pilote compris) a une masse de ${m} kg. Ses deux suspensions équivalent à un ressort unique de raideur $k = 5\\times10^4$ N/m.`,
    physics:
      "Après un choc, la moto oscille verticalement comme un pendule élastique. Les amortisseurs ajoutent un frottement fluide qui éteint vite les oscillations (régime presque apériodique).",
    fact:
      "Sans amortisseurs, la moto continuerait à rebondir plusieurs fois après chaque bosse : c'est dangereux, car la roue perd le contact avec la route.",
    challenge: {
      question: "Calcule la période propre des oscillations verticales de la moto.",
      unit: 's',
      answer: T,
      tolerance: 0.03,
      solution: [
        '$T_0 = 2\\pi\\sqrt{\\dfrac{m}{k}}$',
        `A.N. : $T_0 = 2\\pi\\sqrt{\\dfrac{${m}}{5\\times10^4}} \\approx ${fr(T, 2)}$ s`,
      ],
    },
  } satisfies GenericScenario;
})();

const marketScale = (() => {
  const m = 2, k = 500;
  const dl = verticalElongation(m, k, 9.8);
  return {
    id: 'peson-marche',
    chapter: 'pendule-elastique',
    title: 'Le peson du marché',
    tagline: 'De combien le ressort s\'allonge-t-il ?',
    icon: 'scale',
    context:
      `Au marché, une vendeuse suspend un sac de ${m} kg de tomates à un peson (balance à ressort) de raideur ${k} N/m.`,
    physics:
      "À l'équilibre, la tension du ressort compense le poids : $k\\,\\Delta\\ell = mg$. L'allongement est proportionnel à la masse : c'est ce qui permet de graduer le peson.",
    fact:
      "Le peson mesure en réalité un poids (une force). Sur la Lune, où $g$ est 6 fois plus faible, il indiquerait une masse 6 fois trop petite, alors qu'une balance Roberval resterait juste.",
    challenge: {
      question: "Calcule l'allongement du ressort à l'équilibre (en cm). On prend g = 9,8 m/s².",
      unit: 'cm',
      answer: dl * 100,
      tolerance: 0.02,
      solution: [
        '$k\\,\\Delta\\ell = m g \\Rightarrow \\Delta\\ell = \\dfrac{mg}{k}$',
        `A.N. : $\\Delta\\ell = \\dfrac{${m}\\times 9{,}8}{${k}} = ${fr(dl, 4)}$ m $\\approx ${fr(dl * 100, 1)}$ cm`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Pendule pesant / simple
// ============================================================
const clock = (() => {
  const l = secondsPendulumLength(9.8);
  return {
    id: 'horloge-balancier',
    chapter: 'pendule-pesant',
    title: 'Horloge à balancier',
    tagline: 'Quelle longueur pour battre la seconde ?',
    icon: 'clock',
    context:
      "Dans une vieille horloge, le balancier fait « tic » à chaque passage d'un côté à l'autre. On veut qu'un aller simple dure exactement 1 s (période de 2 s).",
    physics:
      "Pour de petites oscillations, le balancier se comporte comme un pendule simple de période $T_0 = 2\\pi\\sqrt{\\ell/g}$, indépendante de l'amplitude (isochronisme).",
    fact:
      "Quand il fait chaud, la tige du balancier se dilate : la période augmente et l'horloge retarde. Les horlogers ont inventé des balanciers compensés pour corriger cet effet.",
    challenge: {
      question: 'Calcule la longueur du pendule qui « bat la seconde » (T = 2 s), avec g = 9,8 m/s². Réponse en cm.',
      unit: 'cm',
      answer: l * 100,
      tolerance: 0.01,
      solution: [
        '$T_0 = 2\\pi\\sqrt{\\dfrac{\\ell}{g}} = 2$ s $\\Rightarrow \\ell = \\dfrac{g\\,T_0^2}{4\\pi^2} = \\dfrac{g}{\\pi^2}$',
        `A.N. : $\\ell = \\dfrac{9{,}8}{\\pi^2} \\approx ${fr(l, 3)}$ m, soit environ ${fr(l * 100, 1)} cm`,
      ],
    },
  } satisfies GenericScenario;
})();

const swing = (() => {
  const l = 2.5;
  const T = pendulumPeriod({ l, g: 9.8 });
  return {
    id: 'balancoire',
    chapter: 'pendule-pesant',
    title: 'La balançoire de la cour',
    tagline: 'Faut-il pousser plus vite pour un enfant plus lourd ?',
    icon: 'baby',
    context:
      `Un enfant se balance sur une balançoire dont les cordes mesurent ${fr(l, 1)} m. On assimile l'ensemble à un pendule simple (petites oscillations).`,
    physics:
      "La période d'un pendule simple ne dépend ni de la masse de l'enfant ni de l'amplitude (si elle reste faible) : seulement de la longueur $\\ell$ et de $g$.",
    fact:
      "Pour faire monter l'enfant, il faut pousser au bon rythme, une fois par période : c'est un phénomène de résonance, comme dans les oscillations forcées.",
    challenge: {
      question: 'Calcule la période des oscillations (g = 9,8 m/s²).',
      unit: 's',
      answer: T,
      tolerance: 0.02,
      solution: [
        '$T_0 = 2\\pi\\sqrt{\\dfrac{\\ell}{g}}$',
        `A.N. : $T_0 = 2\\pi\\sqrt{\\dfrac{${fr(l, 1)}}{9{,}8}} \\approx ${fr(T)}$ s, que l'enfant soit léger ou lourd.`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Champ magnetique
// ============================================================
const medicalCyclotron = (() => {
  const B = 1.5;
  const f = 1 / cyclotronPeriod(proton.m, proton.q, B);
  return {
    id: 'cyclotron-medical',
    chapter: 'champ-magnetique',
    title: "Le cyclotron de l'hôpital",
    tagline: 'À quelle fréquence accélérer les protons ?',
    icon: 'hospital',
    context:
      `Pour fabriquer le fluor 18 utilisé en imagerie médicale (TEP), les hôpitaux utilisent un cyclotron : des protons tournent dans un champ magnétique $B = ${fr(B, 1)}$ T et sont accélérés à chaque demi-tour.`,
    physics:
      "Dans le champ $\\vec{B}$, le proton décrit des demi-cercles. La période $T = \\dfrac{2\\pi m}{|q|B}$ ne dépend pas de la vitesse : on peut accélérer les protons avec une tension alternative de fréquence fixe.",
    fact:
      "Le fluor 18 a une demi-vie de moins de 2 h : il faut le produire près de l'hôpital et l'injecter au patient très rapidement.",
    challenge: {
      question: 'Calcule la fréquence de rotation des protons (en MHz). On prend m = 1,67×10⁻²⁷ kg et e = 1,6×10⁻¹⁹ C.',
      unit: 'MHz',
      answer: f / 1e6,
      tolerance: 0.02,
      solution: [
        '$f = \\dfrac{1}{T} = \\dfrac{|q|B}{2\\pi m}$',
        `A.N. : $f = \\dfrac{1{,}6\\times10^{-19}\\times ${fr(B, 1)}}{2\\pi\\times 1{,}67\\times10^{-27}} \\approx ${fr(f / 1e6, 1)}\\times10^{6}$ Hz`,
      ],
    },
  } satisfies GenericScenario;
})();

const uraniumSeparation = (() => {
  const U = 4000, B = 0.5;
  const dx = spectroSeparation(235, 238, 1, U, B);
  return {
    id: 'separation-isotopes',
    chapter: 'champ-magnetique',
    title: "Séparer les isotopes de l'uranium",
    tagline: 'De combien les deux isotopes sont-ils séparés ?',
    icon: 'magnet',
    context:
      `Dans un spectrographe de masse, des ions ²³⁵U⁺ et ²³⁸U⁺ sont accélérés sous $U = ${U}$ V puis déviés par un champ $B = ${fr(B, 1)}$ T. Ils décrivent un demi-cercle avant de frapper un détecteur.`,
    physics:
      "Le rayon $R = \\dfrac{1}{B}\\sqrt{\\dfrac{2mU}{|q|}}$ augmente avec la masse : les ions les plus lourds frappent plus loin. Les points d'impact sont séparés de $2(R_2 - R_1)$.",
    fact:
      "Les centrales nucléaires ont besoin d'uranium « enrichi » en ²³⁵U (3 à 5 % au lieu de 0,7 %). Pendant la Seconde Guerre mondiale, on a utilisé d'énormes spectrographes (les « calutrons ») pour cela.",
    challenge: {
      question: "Calcule la distance entre les points d'impact des deux isotopes (en mm). On prend u = 1,66×10⁻²⁷ kg.",
      unit: 'mm',
      answer: dx * 1000,
      tolerance: 0.03,
      solution: [
        "Vitesse à la sortie de l'accélérateur : $v = \\sqrt{\\dfrac{2|q|U}{m}}$ ; rayon $R = \\dfrac{mv}{|q|B}$",
        '$d = 2(R_{238} - R_{235})$ avec $m = A\\,u$',
        `A.N. : $d \\approx ${fr(dx * 1000, 1)}$ mm : une séparation faible, d'où la difficulté de l'enrichissement.`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Radioactivite
// ============================================================
const carbonDating = (() => {
  const c14 = isotope('c14');
  const age = ageFromRatio(4, c14.halfLife) / YEAR_S;
  return {
    id: 'datation-carbone-14',
    chapter: 'radioactivite',
    title: 'Dater un objet ancien au carbone 14',
    tagline: "Quel âge a ce morceau de bois d'un site archéologique ?",
    icon: 'bone',
    context:
      "Des archéologues trouvent un morceau de bois brûlé sur un ancien site du delta intérieur du Niger. Son activité en carbone 14 n'est plus que 25 % de celle d'un bois récent.",
    physics:
      "Un être vivant échange du carbone avec l'atmosphère : sa teneur en ¹⁴C reste constante. À sa mort, le ¹⁴C se désintègre ($T = 5730$ ans) : $A = A_0\\,e^{-\\lambda t}$.",
    fact:
      "Le site de Djenné-Djeno, près de Djenné, a été daté de cette manière : il était déjà habité il y a plus de 2 000 ans.",
    challenge: {
      question: 'Calcule l\'âge du bois (en années).',
      unit: 'ans',
      answer: age,
      tolerance: 0.02,
      solution: [
        '$\\dfrac{A}{A_0} = 0{,}25 = \\dfrac{1}{4} = \\left(\\dfrac12\\right)^2$ : deux demi-vies se sont écoulées.',
        `$t = 2T = 2\\times 5730 = ${fr(age, 0)}$ ans (ou $t = \\dfrac{T}{\\ln 2}\\ln\\dfrac{A_0}{A}$)`,
      ],
    },
  } satisfies GenericScenario;
})();

const thyroid = (() => {
  const i131 = isotope('i131');
  const left = remaining(100, i131.halfLife, 24 * 86400);
  return {
    id: 'iode-thyroide',
    chapter: 'radioactivite',
    title: "Traitement de la thyroïde à l'iode 131",
    tagline: 'Que reste-t-il du médicament après 24 jours ?',
    icon: 'hospital',
    context:
      "Pour soigner certaines maladies de la thyroïde, on fait avaler au patient une gélule d'iode 131 radioactif (demi-vie 8,02 jours), qui se fixe dans la glande.",
    physics:
      "Le nombre de noyaux restants suit la loi de décroissance $N = N_0\\,e^{-\\lambda t}$ avec $\\lambda = \\dfrac{\\ln 2}{T}$. Après chaque demi-vie, il en reste la moitié.",
    fact:
      "Le patient reste quelques jours en chambre protégée : le rayonnement β⁻ détruit les cellules malades, mais il ne faut pas exposer l'entourage.",
    challenge: {
      question: "Quel pourcentage de l'iode 131 reste-t-il au bout de 24 jours ?",
      unit: '%',
      answer: left,
      tolerance: 0.03,
      solution: [
        "24 jours $\\approx 3$ demi-vies : $\\dfrac{N}{N_0} \\approx \\left(\\dfrac12\\right)^3 = \\dfrac18$",
        `Calcul exact : $\\dfrac{N}{N_0} = e^{-\\frac{\\ln 2}{8{,}02}\\times 24} \\approx ${fr(left / 100, 3)}$, soit ${fr(left, 1)} %`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Effet photoelectrique
// ============================================================
const automaticDoor = (() => {
  const l0 = thresholdWavelength(1.9);
  return {
    id: 'porte-automatique',
    chapter: 'effet-photoelectrique',
    title: 'La cellule photoélectrique d\'une porte',
    tagline: 'Quelle lumière peut déclencher le capteur ?',
    icon: 'door',
    context:
      "Certaines portes automatiques et barrières de parking utilisent une cellule photoélectrique : un faisceau lumineux éclaire une cathode en césium ($W_0 = 1{,}9$ eV). Quand quelqu'un coupe le faisceau, le courant s'arrête.",
    physics:
      "Il n'y a émission d'électrons que si l'énergie d'un photon dépasse le travail d'extraction : $\\dfrac{hc}{\\lambda} > W_0$, soit $\\lambda < \\lambda_0 = \\dfrac{hc}{W_0}$.",
    fact:
      "Le césium est choisi car son travail d'extraction est l'un des plus faibles : presque toute la lumière visible suffit à le faire fonctionner.",
    challenge: {
      question: 'Calcule la longueur d\'onde seuil du césium (en nm).',
      unit: 'nm',
      answer: l0 * 1e9,
      tolerance: 0.02,
      solution: [
        '$\\lambda_0 = \\dfrac{hc}{W_0}$ avec $W_0 = 1{,}9\\times 1{,}6\\times10^{-19}$ J',
        `A.N. : $\\lambda_0 = \\dfrac{6{,}63\\times10^{-34}\\times 3\\times10^8}{3{,}04\\times10^{-19}} \\approx ${fr(l0 * 1e9, 0)}$ nm : toute lumière de longueur d'onde plus courte (jusqu'au rouge) convient.`,
      ],
    },
  } satisfies GenericScenario;
})();

const laserPointer = (() => {
  const P = 1e-3, lambda = 650e-9;
  const N = photonFlux(P, lambda);
  return {
    id: 'pointeur-laser',
    chapter: 'effet-photoelectrique',
    title: 'Combien de photons dans un pointeur laser ?',
    tagline: 'Des milliards de milliards de grains de lumière',
    icon: 'laser',
    context:
      "Un pointeur laser rouge de professeur émet une puissance lumineuse de 1 mW à la longueur d'onde de 650 nm.",
    physics:
      "La lumière est un flux de photons d'énergie $E = \\dfrac{hc}{\\lambda}$. La puissance est l'énergie transportée par seconde : $P = N\\,E$.",
    fact:
      "Ne jamais diriger un laser vers les yeux : même 1 mW, concentré sur un point minuscule de la rétine, peut l'abîmer.",
    challenge: {
      question: 'Calcule le nombre de photons émis par seconde, en multiples de 10¹⁵ (ex : 2,5 pour 2,5×10¹⁵).',
      unit: '×10¹⁵ /s',
      answer: N / 1e15,
      tolerance: 0.03,
      solution: [
        `Énergie d'un photon : $E = \\dfrac{hc}{\\lambda} \\approx ${fr(photonEnergy(lambda) * 1e19)}\\times10^{-19}$ J`,
        `$N = \\dfrac{P}{E} = \\dfrac{10^{-3}}{${fr(photonEnergy(lambda) * 1e19)}\\times10^{-19}} \\approx ${fr(N / 1e15)}\\times10^{15}$ photons par seconde`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Interferences lumineuses
// ============================================================
const youngLaser = (() => {
  const i = fringeSpacing(650e-9, 2, 0.25e-3);
  return {
    id: 'fentes-laser',
    chapter: 'interferences-lumineuses',
    title: 'Fentes de Young en salle de TP',
    tagline: 'Quel écart entre deux franges brillantes ?',
    icon: 'laser',
    context:
      "En TP, on éclaire deux fentes distantes de $a = 0{,}25$ mm avec un pointeur laser rouge ($\\lambda = 650$ nm). L'écran est placé à $D = 2$ m.",
    physics:
      "Les deux fentes se comportent comme deux sources cohérentes. Sur l'écran, les franges brillantes sont régulièrement espacées de l'interfrange $i = \\dfrac{\\lambda D}{a}$.",
    fact:
      "En mesurant $i$, on peut mesurer une longueur d'onde de quelques centaines de nanomètres avec une simple règle : c'est ainsi que Young a prouvé la nature ondulatoire de la lumière en 1801.",
    challenge: {
      question: "Calcule l'interfrange (en mm).",
      unit: 'mm',
      answer: i * 1000,
      tolerance: 0.02,
      solution: [
        '$i = \\dfrac{\\lambda D}{a}$',
        `A.N. : $i = \\dfrac{650\\times10^{-9}\\times 2}{0{,}25\\times10^{-3}} = ${fr(i * 1000, 1)}\\times10^{-3}$ m`,
      ],
    },
  } satisfies GenericScenario;
})();

const unknownColor = (() => {
  const i = 4.4e-3, D = 2, a = 0.25e-3;
  const lambda = (i * a) / D;
  return {
    id: 'couleur-inconnue',
    chapter: 'interferences-lumineuses',
    title: "Mesurer la longueur d'onde d'un laser vert",
    tagline: "Retrouver λ à partir des franges",
    icon: 'sun',
    context:
      "Avec le même dispositif ($a = 0{,}25$ mm, $D = 2$ m), on remplace le laser rouge par un laser vert. On mesure 11 franges brillantes consécutives sur 44 mm.",
    physics:
      "Entre 11 franges brillantes consécutives, il y a 10 interfranges : $10\\,i = 44$ mm. On en déduit $\\lambda = \\dfrac{i\\,a}{D}$.",
    fact:
      "Le vert est la couleur à laquelle l'œil humain est le plus sensible : un laser vert paraît beaucoup plus lumineux qu'un laser rouge de même puissance.",
    challenge: {
      question: "Calcule la longueur d'onde du laser vert (en nm).",
      unit: 'nm',
      answer: lambda * 1e9,
      tolerance: 0.02,
      solution: [
        '$i = \\dfrac{44}{10} = 4{,}4$ mm',
        `$\\lambda = \\dfrac{i\\,a}{D} = \\dfrac{4{,}4\\times10^{-3}\\times 0{,}25\\times10^{-3}}{2} = ${fr(lambda * 1e9, 0)}\\times10^{-9}$ m : c'est bien du vert.`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Calorimetrie
// ============================================================
const mintTea = (() => {
  const theta = equilibriumTemperature([{ C: 0.06 * C_WATER, theta: 95 }, { C: 50, theta: 30 }]);
  return {
    id: 'the-a-la-menthe',
    chapter: 'calorimetrie',
    title: 'Le thé à la menthe',
    tagline: 'Pourquoi le premier verre est-il moins chaud ?',
    icon: 'tea',
    context:
      "Pendant le grin, on verse 60 g de thé bouillant (95 °C) dans un petit verre à 30 °C. La capacité thermique du verre vaut 50 J/K. On assimile le thé à de l'eau et on néglige les pertes.",
    physics:
      "Le thé cède de la chaleur au verre jusqu'à ce que les deux soient à la même température : $\\sum Q = 0$.",
    fact:
      "Verser le thé de haut le refroidit aussi (évaporation, contact avec l'air) et fait de la mousse. Le deuxième verre, servi dans un verre déjà chaud, refroidit moins.",
    challenge: {
      question: "Calcule la température du thé une fois l'équilibre atteint avec le verre.",
      unit: '°C',
      answer: theta,
      tolerance: 0.01,
      solution: [
        '$m\\,c_{eau}(\\theta_e - 95) + C_{verre}(\\theta_e - 30) = 0$',
        `$\\theta_e = \\dfrac{0{,}06\\times 4185\\times 95 + 50\\times 30}{0{,}06\\times 4185 + 50} \\approx ${fr(theta, 1)}$ °C`,
      ],
    },
  } satisfies GenericScenario;
})();

const bissapIce = (() => {
  const r = mixWaterIce(0.3, 30, 0.04, -5);
  return {
    id: 'glacons-bissap',
    chapter: 'calorimetrie',
    title: 'Des glaçons dans le bissap',
    tagline: 'Quelle température après la fonte des glaçons ?',
    icon: 'ice',
    context:
      "On ajoute 40 g de glaçons sortis du congélateur (−5 °C) dans 300 g de jus de bissap à 30 °C. On assimile le jus à de l'eau et on néglige les échanges avec le verre et l'air.",
    physics:
      "La glace reçoit de la chaleur pour se réchauffer jusqu'à 0 °C, fondre ($L_f = 3{,}34\\times10^5$ J/kg), puis l'eau de fonte se réchauffe. Le jus, lui, se refroidit.",
    fact:
      "La fusion absorbe beaucoup d'énergie : faire fondre 1 g de glace demande autant de chaleur que chauffer 1 g d'eau de 0 à 80 °C. C'est pour cela que les glaçons rafraîchissent si bien.",
    challenge: {
      question: 'Calcule la température finale du bissap (c glace = 2100 J/(kg·K)).',
      unit: '°C',
      answer: r.theta,
      tolerance: 0.02,
      solution: [
        "Chaleur pour la glace : $Q_1 = 0{,}04\\times 2100\\times 5 + 0{,}04\\times 3{,}34\\times10^5 = 13\\,780$ J",
        'Bilan : $0{,}3\\,c_{eau}(\\theta - 30) + Q_1 + 0{,}04\\,c_{eau}(\\theta - 0) = 0$',
        `$\\theta \\approx ${fr(r.theta, 1)}$ °C (toute la glace a fondu)`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Auto-induction
// ============================================================
const ignition = (() => {
  const L = 5e-3, I = 4, dt = 1e-4;
  const e = (L * I) / dt;
  return {
    id: 'bobine-allumage',
    chapter: 'auto-induction',
    title: "La bobine d'allumage d'une moto",
    tagline: "D'où vient l'étincelle de la bougie ?",
    icon: 'spark',
    context:
      "Dans le circuit d'allumage d'une moto, un courant de 4 A traverse une bobine d'inductance 5 mH. Un dispositif électronique coupe brusquement ce courant en 0,1 ms.",
    physics:
      "Une variation très rapide de l'intensité crée une forte f.é.m. d'auto-induction : $|e| = L\\left|\\dfrac{di}{dt}\\right|$. Un second enroulement (comme un transformateur) l'amplifie encore jusqu'à des milliers de volts.",
    fact:
      "Il faut plus de 10 000 V pour qu'une étincelle traverse l'air entre les électrodes de la bougie et enflamme le mélange essence-air.",
    challenge: {
      question: "Calcule la f.é.m. d'auto-induction moyenne dans la bobine pendant la coupure (en V).",
      unit: 'V',
      answer: e,
      tolerance: 0.02,
      solution: [
        '$|e| = L\\dfrac{\\Delta i}{\\Delta t}$',
        `A.N. : $|e| = 5\\times10^{-3}\\times\\dfrac{4}{10^{-4}} = ${fr(e, 0)}$ V, à partir d'une batterie de 12 V !`,
      ],
    },
  } satisfies GenericScenario;
})();

const coilEnergy = (() => {
  const L = 5e-3, I = 4;
  const W = magneticEnergy(L, I);
  return {
    id: 'energie-etincelle',
    chapter: 'auto-induction',
    title: "L'énergie de l'étincelle",
    tagline: 'Quelle énergie la bobine libère-t-elle ?',
    icon: 'spark',
    context:
      "Reprenons la bobine d'allumage (L = 5 mH) traversée par 4 A juste avant la coupure du courant.",
    physics:
      "Une bobine parcourue par un courant stocke une énergie magnétique $E = \\tfrac12 L i^2$. À la rupture, cette énergie est libérée dans l'étincelle.",
    fact:
      "C'est aussi pour cela qu'on voit parfois une petite étincelle en débranchant un appareil qui contient un moteur ou un transformateur.",
    challenge: {
      question: 'Calcule l\'énergie stockée dans la bobine (en mJ).',
      unit: 'mJ',
      answer: W * 1000,
      tolerance: 0.02,
      solution: [
        '$E = \\tfrac12 L I^2$',
        `A.N. : $E = \\tfrac12\\times 5\\times10^{-3}\\times 4^2 = ${fr(W * 1000, 0)}\\times10^{-3}$ J`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Circuit oscillant / RLC force
// ============================================================
const fmRadio = (() => {
  const f = 96e6, L = 0.2e-6;
  const C = capacitanceForFrequency(f, L);
  return {
    id: 'radio-fm',
    chapter: 'circuit-oscillant',
    title: 'Capter une radio FM',
    tagline: 'Quel condensateur pour la station à 96 MHz ?',
    icon: 'radio',
    context:
      "Dans un poste de radio FM, le circuit d'accord comporte une petite bobine d'inductance 0,2 µH et un condensateur réglable. On veut écouter une station qui émet à 96 MHz.",
    physics:
      "Le circuit LC « répond » fortement à la fréquence égale à sa fréquence propre $f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$ (formule de Thomson). Tourner le bouton fait varier $C$.",
    fact:
      "La bande FM s'étend de 87,5 à 108 MHz. Les ondes radio sont des ondes électromagnétiques : elles voyagent à la vitesse de la lumière.",
    challenge: {
      question: 'Calcule la capacité à régler (en pF).',
      unit: 'pF',
      answer: C * 1e12,
      tolerance: 0.02,
      solution: [
        '$C = \\dfrac{1}{4\\pi^2 f^2 L}$',
        `A.N. : $C = \\dfrac{1}{4\\pi^2\\times(96\\times10^6)^2\\times 0{,}2\\times10^{-6}} \\approx ${fr(C * 1e12, 1)}\\times10^{-12}$ F`,
      ],
    },
  } satisfies GenericScenario;
})();

const selectivity = (() => {
  const R = 10, L = 250e-6;
  const df = bandwidth(R, L);
  return {
    id: 'selectivite-radio',
    chapter: 'oscillations-electriques-forcees',
    title: "Pourquoi n'entend-on qu'une seule station ?",
    tagline: 'La bande passante du circuit d\'accord',
    icon: 'radio',
    context:
      "L'antenne d'un poste radio AM reçoit en même temps toutes les stations. Le circuit d'accord est un RLC série avec R = 10 Ω et L = 250 µH.",
    physics:
      "Le circuit ne laisse passer un courant important que pour les fréquences comprises dans sa bande passante $\\Delta f = \\dfrac{R}{2\\pi L}$, autour de la résonance.",
    fact:
      "En ondes moyennes, deux stations voisines sont séparées de 9 kHz. Si la bande passante était plus large, on entendrait deux stations à la fois.",
    challenge: {
      question: 'Calcule la largeur de la bande passante (en kHz).',
      unit: 'kHz',
      answer: df / 1000,
      tolerance: 0.02,
      solution: [
        '$\\Delta f = \\dfrac{R}{2\\pi L}$',
        `A.N. : $\\Delta f = \\dfrac{10}{2\\pi\\times 250\\times10^{-6}} \\approx ${fr(df, 0)}$ Hz, soit ${fr(df / 1000, 1)} kHz : moins que l'écart entre deux stations.`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Ondes
// ============================================================
const thunder = (() => {
  const dt = 3.5;
  const d = thunderDistance(dt);
  return {
    id: 'distance-orage',
    chapter: 'ondes-progressives',
    title: "À quelle distance est l'orage ?",
    tagline: "Compter les secondes entre l'éclair et le tonnerre",
    icon: 'thunder',
    context:
      "Pendant la saison des pluies, tu vois un éclair, puis tu entends le tonnerre 3,5 s plus tard. Le son se propage dans l'air à 340 m/s.",
    physics:
      "La lumière arrive presque instantanément ($3\\times10^8$ m/s). Le son, onde mécanique longitudinale, met $\\Delta t = \\dfrac{d}{v}$ pour arriver.",
    fact:
      "Règle pratique : divise le nombre de secondes par 3 pour obtenir la distance en kilomètres. Si l'écart diminue, l'orage se rapproche : mets-toi à l'abri.",
    challenge: {
      question: "Calcule la distance de l'orage (en m).",
      unit: 'm',
      answer: d,
      tolerance: 0.02,
      solution: ['$d = v\\,\\Delta t$', `A.N. : $d = 340\\times 3{,}5 = ${fr(d, 0)}$ m, soit environ ${fr(d / 1000, 1)} km`],
    },
  } satisfies GenericScenario;
})();

const echoSounder = (() => {
  const v = 1500, t = 8e-3;
  const depth = (v * t) / 2;
  return {
    id: 'sondeur-pirogue',
    chapter: 'ondes-progressives',
    title: 'Le sondeur du pêcheur',
    tagline: 'Quelle est la profondeur du fleuve ?',
    icon: 'boat',
    context:
      "Un pêcheur du fleuve Niger a fixé un petit sondeur sous sa pirogue. L'appareil émet une impulsion ultrasonore et reçoit l'écho renvoyé par le fond 8 ms plus tard. Les ultrasons se propagent dans l'eau à 1500 m/s.",
    physics:
      "L'onde fait un aller-retour : elle parcourt deux fois la profondeur pendant la durée mesurée, $2d = v\\,\\Delta t$.",
    fact:
      "Les chauves-souris et les dauphins utilisent le même principe (l'écholocation) pour se repérer et chasser dans l'obscurité.",
    challenge: {
      question: 'Calcule la profondeur de l\'eau sous la pirogue (en m).',
      unit: 'm',
      answer: depth,
      tolerance: 0.02,
      solution: ['$2d = v\\,\\Delta t \\Rightarrow d = \\dfrac{v\\,\\Delta t}{2}$', `A.N. : $d = \\dfrac{1500\\times 8\\times10^{-3}}{2} = ${fr(depth, 0)}$ m`],
    },
  } satisfies GenericScenario;
})();

const speakers = (() => {
  const lambda = wavelength(340, 680);
  const delta = 3.75 - 3;
  return {
    id: 'haut-parleurs-silence',
    chapter: 'interferences-mecaniques',
    title: 'Le silence entre deux haut-parleurs',
    tagline: 'Pourquoi le son disparaît-il à certains endroits ?',
    icon: 'headphones',
    context:
      "Deux haut-parleurs, branchés sur le même amplificateur, émettent en phase un son pur de 680 Hz (célérité 340 m/s). Un élève est à 3 m de l'un et à 3,75 m de l'autre.",
    physics:
      "Les deux ondes sonores interfèrent comme les ondes à la surface de l'eau : l'amplitude est nulle si la différence de marche $\\delta = d_2 - d_1$ vaut un nombre impair de demi-longueurs d'onde.",
    fact:
      "Les casques à réduction de bruit utilisent ce principe : ils produisent un son en opposition de phase avec le bruit extérieur, qui s'annule dans l'oreille.",
    challenge: {
      question: 'Calcule le rapport δ / λ au point où se trouve l\'élève.',
      unit: '',
      answer: delta / lambda,
      tolerance: 0.02,
      solution: [
        `$\\lambda = \\dfrac{v}{N} = \\dfrac{340}{680} = ${fr(lambda, 1)}$ m ; $\\delta = 3{,}75 - 3 = ${fr(delta, 2)}$ m`,
        `$\\dfrac{\\delta}{\\lambda} = ${fr(delta / lambda, 1)}$ : demi-entier, les ondes arrivent en opposition de phase. L'élève est dans une zone de silence.`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Niveaux d'energie
// ============================================================
const sodiumLamp = (() => {
  const E = toEV(photonEnergy(589e-9));
  return {
    id: 'lampadaire-sodium',
    chapter: 'niveaux-energie',
    title: 'La lumière orange des lampadaires',
    tagline: "Quelle énergie pour la raie jaune du sodium ?",
    icon: 'lamp',
    context:
      "Beaucoup de lampadaires anciens contiennent de la vapeur de sodium. Ils émettent presque uniquement une lumière jaune-orangé de longueur d'onde 589 nm.",
    physics:
      "Les atomes de sodium, excités par la décharge électrique, redescendent vers leur état fondamental en émettant des photons d'énergie bien précise : $E = \\dfrac{hc}{\\lambda}$.",
    fact:
      "Sous ces lampadaires, les couleurs disparaissent (une voiture rouge paraît sombre) : la lumière ne contient qu'une seule raie, au lieu de toutes les couleurs.",
    challenge: {
      question: "Calcule l'énergie des photons émis (en eV).",
      unit: 'eV',
      answer: E,
      tolerance: 0.02,
      solution: [
        '$E = \\dfrac{hc}{\\lambda}$, puis conversion : $1$ eV $= 1{,}6\\times10^{-19}$ J',
        `A.N. : $E = \\dfrac{6{,}63\\times10^{-34}\\times 3\\times10^8}{589\\times10^{-9}} \\approx ${fr(photonEnergy(589e-9) * 1e19, 2)}\\times10^{-19}$ J $\\approx ${fr(E)}$ eV`,
      ],
    },
  } satisfies GenericScenario;
})();

const nebula = (() => {
  const l = transitionWavelength(3, 2);
  return {
    id: 'nebuleuse-rose',
    chapter: 'niveaux-energie',
    title: 'La couleur rose des nébuleuses',
    tagline: "D'où vient le rouge des nuages de gaz dans l'espace ?",
    icon: 'nebula',
    context:
      "Sur les photos de télescope, les nébuleuses où naissent les étoiles sont souvent rouge-rose. Elles contiennent surtout de l'hydrogène, excité par la lumière des jeunes étoiles.",
    physics:
      "En se désexcitant du niveau 3 vers le niveau 2, l'atome d'hydrogène ($E_n = -13{,}6/n^2$ eV) émet la raie $H_\\alpha$ de la série de Balmer.",
    fact:
      "Les astronomes utilisent des filtres « H-alpha » qui ne laissent passer que cette raie : ils peuvent ainsi cartographier l'hydrogène dans les galaxies.",
    challenge: {
      question: 'Calcule la longueur d\'onde de la raie Hα (en nm).',
      unit: 'nm',
      answer: l * 1e9,
      tolerance: 0.01,
      solution: [
        '$E = E_3 - E_2 = -\\dfrac{13{,}6}{9} + \\dfrac{13{,}6}{4} \\approx 1{,}89$ eV',
        `$\\lambda = \\dfrac{hc}{E} \\approx ${fr(l * 1e9, 0)}$ nm : du rouge.`,
      ],
    },
  } satisfies GenericScenario;
})();

// ============================================================
//  Chimie organique
// ============================================================
const thalidomide = (() => ({
  id: 'thalidomide',
  chapter: 'stereochimie',
  title: 'Le drame de la thalidomide',
  tagline: 'Deux énantiomères, deux effets opposés',
  icon: 'pill',
  context:
    "Dans les années 1950, la thalidomide était prescrite aux femmes enceintes contre les nausées. La molécule possède un carbone asymétrique et était vendue sous forme racémique.",
  physics:
    "Deux énantiomères ont les mêmes propriétés physiques et chimiques usuelles, mais les récepteurs du corps (eux-mêmes chiraux) les distinguent, comme une main droite ne rentre pas dans un gant gauche.",
  fact:
    "L'un des énantiomères calmait les nausées, l'autre provoquait de graves malformations chez le fœtus. Depuis, chaque énantiomère d'un médicament est testé séparément.",
  challenge: {
    question: 'Combien de stéréoisomères de configuration une molécule à un seul carbone asymétrique possède-t-elle ?',
    unit: '',
    answer: 2 ** 1,
    tolerance: 0.01,
    solution: ['Avec $n$ carbones asymétriques : au plus $2^n$ stéréoisomères.', '$n = 1$ : deux énantiomères (R et S). Le mélange 50/50 est un racémique.'],
  },
} satisfies GenericScenario))();

const carvone = (() => {
  const M = molarMass('C10H14O');
  return {
    id: 'carvone',
    chapter: 'stereochimie',
    title: 'Menthe ou carvi : une question de miroir',
    tagline: 'Même formule, odeurs différentes',
    icon: 'leaf',
    context:
      "La carvone ($C_{10}H_{14}O$) existe sous deux formes énantiomères : l'une sent la menthe verte, l'autre les graines de carvi (cumin des prés).",
    physics:
      "Les récepteurs de l'odorat sont des protéines chirales : chacun des deux énantiomères s'y fixe différemment, d'où deux odeurs distinctes.",
    fact:
      "Notre nez distingue donc des molécules images l'une de l'autre dans un miroir, ce que ni la balance ni le thermomètre ne savent faire.",
    challenge: {
      question: 'Calcule la masse molaire de la carvone C₁₀H₁₄O (en g/mol).',
      unit: 'g/mol',
      answer: M,
      tolerance: 0.01,
      solution: [`$M = 10\\times12 + 14\\times1 + 16 = ${fr(M, 0)}$ g/mol, la même pour les deux énantiomères.`],
    },
  } satisfies GenericScenario;
})();

const breathalyzer = (() => {
  const nDichromate = 0.1e-3;
  const nEthanol = (6 * nDichromate) / 2; // ethanol -> ethanal : 2 e- par molecule, 6 e- par ion dichromate
  const mg = nEthanol * molarMass(moleculeOf('ethanol')) * 1000;
  return {
    id: 'ethylotest',
    chapter: 'alcools',
    title: "L'éthylotest chimique",
    tagline: "Pourquoi les cristaux passent-ils de l'orange au vert ?",
    icon: 'wine',
    context:
      "Un éthylotest jetable contient des cristaux de dichromate de potassium acidifié (orange). L'éthanol de l'haleine les réduit en ions $Cr^{3+}$ (verts) en s'oxydant en éthanal.",
    physics:
      "C'est une oxydation ménagée d'un alcool primaire avec un défaut d'oxydant : $3\\,CH_3CH_2OH + Cr_2O_7^{2-} + 8H^+ \\rightarrow 3\\,CH_3CHO + 2Cr^{3+} + 7H_2O$.",
    fact:
      "L'alcool au volant multiplie le risque d'accident. La longueur de la zone devenue verte dans le tube indique la quantité d'alcool expirée.",
    challenge: {
      question: "Le tube contient 0,10 mmol d'ions dichromate. Quelle masse maximale d'éthanol (en mg) peuvent-ils oxyder ?",
      unit: 'mg',
      answer: mg,
      tolerance: 0.02,
      solution: [
        "D'après l'équation, 1 ion dichromate oxyde 3 molécules d'éthanol.",
        `$n(\\text{éthanol}) = 3\\times 0{,}10 = 0{,}30$ mmol ; $m = 0{,}30\\times 46 = ${fr(mg, 1)}$ mg`,
      ],
    },
  } satisfies GenericScenario;
})();

const dolo = (() => {
  const degree = 4, rho = 0.79;
  const m = 1000 * (degree / 100) * rho;
  return {
    id: 'dolo',
    chapter: 'alcools',
    title: 'Le dolo, bière de mil',
    tagline: "Quelle masse d'alcool dans un litre ?",
    icon: 'wine',
    context:
      `Le dolo est une bière traditionnelle obtenue par fermentation du mil ou du sorgho germé. On suppose qu'elle titre ${degree} % en volume d'éthanol (${degree} mL d'éthanol pur pour 100 mL). Masse volumique de l'éthanol : 0,79 g/mL.`,
    physics:
      "Pendant la fermentation, des levures transforment les sucres en éthanol et en dioxyde de carbone : $C_6H_{12}O_6 \\rightarrow 2\\,C_2H_5OH + 2\\,CO_2$.",
    fact:
      "Si on laisse le dolo trop longtemps à l'air, des bactéries oxydent l'éthanol en acide éthanoïque : la boisson devient aigre, comme du vinaigre.",
    challenge: {
      question: "Calcule la masse d'éthanol contenue dans 1 L de dolo (en g).",
      unit: 'g',
      answer: m,
      tolerance: 0.02,
      solution: [`Volume d'éthanol : $V = 0{,}0${degree}\\times 1000 = ${degree * 10}$ mL`, `$m = \\rho V = 0{,}79\\times ${degree * 10} = ${fr(m, 1)}$ g`],
    },
  } satisfies GenericScenario;
})();

const fishSmell = (() => {
  const sp = WEAK_SPECIES.find((x) => x.id === 'trimethylamine')!;
  const pH = weakSolutionPH(sp, 0.01);
  return {
    id: 'odeur-poisson',
    chapter: 'amines',
    title: "Le citron et l'odeur du poisson",
    tagline: "Pourquoi le citron chasse-t-il l'odeur ?",
    icon: 'fish',
    context:
      "L'odeur du poisson pas très frais vient surtout de la triméthylamine $(CH_3)_3N$, une amine volatile. On sert souvent le poisson avec du citron.",
    physics:
      "La triméthylamine est une base : l'acide citrique du citron la transforme en ion triméthylammonium $(CH_3)_3NH^+$, qui n'est pas volatil et ne sent donc plus.",
    fact:
      "Pour la même raison, on se lave les mains au jus de citron ou au vinaigre après avoir vidé du poisson.",
    challenge: {
      question: "Calcule le pH d'une solution de triméthylamine à 0,010 mol/L (pKa = 9,8).",
      unit: '',
      answer: pH,
      tolerance: 0.02,
      solution: [
        'Base faible : $pH \\approx \\tfrac12(14 + pK_a + \\log C)$',
        `$pH \\approx \\tfrac12(14 + 9{,}8 - 2) \\approx ${fr(pH, 1)}$ : la solution est nettement basique.`,
      ],
    },
  } satisfies GenericScenario;
})();

const paracetamol = (() => {
  const n = 10.9 / 109;
  const m = n * molarMass('C8H9NO2');
  return {
    id: 'paracetamol',
    chapter: 'amines',
    title: 'La synthèse du paracétamol',
    tagline: 'Une amine + un anhydride = un médicament',
    icon: 'pill',
    context:
      "Le paracétamol ($C_8H_9NO_2$) est fabriqué en faisant réagir le 4-aminophénol (une amine, M = 109 g/mol) avec l'anhydride éthanoïque. Le groupe $-NH_2$ devient un groupe amide $-NH-CO-CH_3$.",
    physics:
      "Le doublet non liant de l'azote attaque l'anhydride : c'est le caractère **nucléophile** des amines. La réaction est rapide et totale.",
    fact:
      "Le paracétamol est l'un des médicaments les plus utilisés au monde contre la douleur et la fièvre ; il ne faut pas dépasser la dose prescrite, car il est toxique pour le foie.",
    challenge: {
      question: 'Quelle masse de paracétamol (M = 151 g/mol) obtient-on à partir de 10,9 g de 4-aminophénol (en g) ?',
      unit: 'g',
      answer: m,
      tolerance: 0.02,
      solution: ["$n = \\dfrac{10{,}9}{109} = 0{,}100$ mol, une molécule de paracétamol par molécule d'amine.", `$m = 0{,}100\\times 151 = ${fr(m, 1)}$ g`],
    },
  } satisfies GenericScenario;
})();

const vinegar = (() => {
  const Cdiluted = (0.1 * 10) / 10;
  const C = 10 * Cdiluted;
  const g = C * molarMass(moleculeOf('acide-ethanoique'));
  return {
    id: 'vinaigre',
    chapter: 'acides-carboxyliques',
    title: "Le degré d'un vinaigre",
    tagline: "Combien d'acide dans la bouteille ?",
    icon: 'flask',
    context:
      "On dilue 10 fois un vinaigre, puis on dose 10 mL de la solution diluée par la soude à 0,10 mol/L en présence de phénolphtaléine. Le virage au rose a lieu après 10 mL de soude.",
    physics:
      "L'acide éthanoïque réagit totalement avec les ions hydroxyde : $CH_3COOH + HO^- \\rightarrow CH_3COO^- + H_2O$. À l'équivalence, $C_a V_a = C_b V_{bE}$.",
    fact:
      "Un vinaigre « à 6° » contient environ 6 g d'acide éthanoïque pour 100 g de vinaigre. La fermentation acétique est due à des bactéries qui oxydent l'éthanol.",
    challenge: {
      question: 'Calcule la concentration massique en acide éthanoïque du vinaigre (non dilué), en g/L.',
      unit: 'g/L',
      answer: g,
      tolerance: 0.02,
      solution: [
        `Solution diluée : $C = \\dfrac{0{,}10\\times 10}{10} = ${fr(Cdiluted, 2)}$ mol/L`,
        `Vinaigre : $C_0 = 10\\,C = ${fr(C, 1)}$ mol/L ; $C_m = C_0\\times 60 = ${fr(g, 0)}$ g/L`,
      ],
    },
  } satisfies GenericScenario;
})();

const shea = (() => {
  const m = soapMass(1000, 891, 306);
  return {
    id: 'savon-karite',
    chapter: 'acides-carboxyliques',
    title: 'Le savon au beurre de karité',
    tagline: 'Combien de savon avec 1 kg de karité ?',
    icon: 'hand',
    context:
      "Des coopératives de femmes fabriquent du savon en chauffant du beurre de karité avec de la soude. On assimile le beurre à de la stéarine (triglycéride, M = 891 g/mol) ; le savon est du stéarate de sodium (M = 306 g/mol).",
    physics:
      "C'est une **saponification**, réaction totale : un triglycéride + 3 ions hydroxyde donnent du glycérol et 3 ions carboxylates (le savon).",
    fact:
      "Le glycérol formé en même temps est un bon hydratant pour la peau : c'est pourquoi on le laisse souvent dans les savons artisanaux.",
    challenge: {
      question: 'Quelle masse de savon obtient-on au maximum avec 1,0 kg de beurre de karité (en g) ?',
      unit: 'g',
      answer: m,
      tolerance: 0.02,
      solution: ['$n(\\text{stéarine}) = \\dfrac{1000}{891}$ mol ; $n(\\text{savon}) = 3\\,n$', `$m = 3\\times\\dfrac{1000}{891}\\times 306 \\approx ${fr(m, 0)}$ g`],
    },
  } satisfies GenericScenario;
})();

const pineapple = (() => {
  const x = equilibriumAdvance(1, 1, 4);
  const m = x * molarMass(moleculeOf('butanoate-ethyle'));
  return {
    id: 'arome-ananas',
    chapter: 'acides-carboxyliques',
    title: "Fabriquer l'arôme d'ananas",
    tagline: "Quelle masse d'ester à l'équilibre ?",
    icon: 'apple',
    context:
      "L'arôme d'ananas des bonbons est du butanoate d'éthyle, préparé par estérification de l'acide butanoïque avec l'éthanol. On mélange 1,0 mol de chaque réactif ($K = 4$).",
    physics:
      "L'estérification est lente et limitée : l'équilibre est atteint quand $\\dfrac{x^2}{(1-x)^2} = 4$, soit un rendement de 67 %.",
    fact:
      "Beaucoup d'arômes de fruits sont des esters : éthanoate de 3-méthylbutyle (banane), éthanoate d'octyle (orange), méthanoate d'éthyle (rhum).",
    challenge: {
      question: "Quelle masse de butanoate d'éthyle (M = 116 g/mol) obtient-on à l'équilibre (en g) ?",
      unit: 'g',
      answer: m,
      tolerance: 0.02,
      solution: ['$\\dfrac{x}{1 - x} = 2 \\Rightarrow x = \\dfrac23$ mol', `$m = \\dfrac23\\times 116 \\approx ${fr(m, 1)}$ g`],
    },
  } satisfies GenericScenario;
})();

const sweetener = (() => {
  const M = 294, mg = 40;
  const umol = (mg / 1000 / M) * 1e6;
  return {
    id: 'aspartame',
    chapter: 'acides-amines',
    title: "L'aspartame, un dipeptide sucré",
    tagline: 'Combien de molécules dans un sachet ?',
    icon: 'pill',
    context:
      "L'aspartame, édulcorant des boissons « light », est le dérivé (ester méthylique) d'un dipeptide formé de deux acides α-aminés : l'acide aspartique et la phénylalanine. M = 294 g/mol.",
    physics:
      "Les deux acides aminés sont reliés par une liaison peptidique $-CO-NH-$. Les deux sont de la série L ; d'autres stéréoisomères de la molécule ont un goût amer.",
    fact:
      "L'aspartame est environ 200 fois plus sucré que le sucre de table.",
    challenge: {
      question: "Quelle quantité de matière d'aspartame contient un sachet de 40 mg (en µmol) ?",
      unit: 'µmol',
      answer: umol,
      tolerance: 0.02,
      solution: [`$n = \\dfrac{m}{M} = \\dfrac{40\\times10^{-3}}{294} \\approx ${fr(umol / 100, 2)}\\times10^{-4}$ mol, soit ${fr(umol, 0)} µmol`],
    },
  } satisfies GenericScenario;
})();

const proteins = (() => ({
  id: 'diversite-proteines',
  chapter: 'acides-amines',
  title: 'Pourquoi tant de protéines différentes ?',
  tagline: '20 briques, un nombre immense de combinaisons',
  icon: 'egg',
  context:
    "Les protéines du blanc d'œuf, du lait ou de nos muscles sont toutes fabriquées à partir de seulement 20 acides α-aminés différents, enchaînés par des liaisons peptidiques.",
  physics:
    "L'ordre des acides aminés (la séquence) compte : Gly-Ala et Ala-Gly sont deux molécules différentes. Avec $n$ acides aminés, on peut former $n^k$ chaînes de $k$ résidus.",
  fact:
    "Une protéine courante compte plusieurs centaines de résidus : le nombre de séquences possibles est astronomique.",
  challenge: {
    question: 'Combien de tripeptides différents peut-on former avec les 20 acides α-aminés naturels ?',
    unit: '',
    answer: sequencesWithRepetition(20, 3),
    tolerance: 0.001,
    solution: ["Chacune des 3 positions peut être occupée par l'un des 20 acides aminés.", `$20^3 = ${sequencesWithRepetition(20, 3)}$ tripeptides`],
  },
} satisfies GenericScenario))();

export const CHAPTER_SCENARIOS: GenericScenario[] = [
  thalidomide, carvone, breathalyzer, dolo, fishSmell, paracetamol, vinegar, shea, pineapple, sweetener, proteins,
  suspension, marketScale, clock, swing, medicalCyclotron, uraniumSeparation, carbonDating, thyroid,
  automaticDoor, laserPointer, youngLaser, unknownColor, mintTea, bissapIce, ignition, coilEnergy,
  fmRadio, selectivity, thunder, echoSounder, speakers, sodiumLamp, nebula,
  ...NEW_CHAPTER_SCENARIOS,
];
