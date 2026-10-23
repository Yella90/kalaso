import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Pour tirer une charrette de mil jusqu’au marché, l’âne fournit un effort ; pour remonter l’eau d’un puits profond, la pompe solaire aussi. Mais lequel « travaille » le plus, et lequel est le plus **puissant** ? En physique, ces mots ont un sens précis : le **travail** mesure l’énergie transférée par une force, la **puissance** la rapidité de ce transfert.',
  objectives: [
    'calculer le travail d’une force constante sur un déplacement rectiligne ;',
    'reconnaître un travail moteur, résistant ou nul ;',
    'calculer le travail du poids ;',
    'calculer une puissance moyenne et utiliser $P = F\\,v$.',
  ],
  sections: [
    {
      title: 'Le travail d’une force constante',
      blocks: [
        {
          kind: 'formula',
          tex: 'W_{AB}(\\vec{F}) = \\vec{F} \\cdot \\vec{AB} = F \\times AB \\times \\cos\\alpha',
          legend: ['$W$ en joules (J), $F$ en newtons (N), $AB$ en mètres (m)', '$\\alpha$ : angle entre la force et le déplacement'],
        },
        {
          kind: 'table',
          head: ['Angle $\\alpha$', 'Signe de $W$', 'Travail'],
          rows: [
            ['$0 \\leq \\alpha < 90°$', '$W > 0$', '**moteur** : la force favorise le déplacement'],
            ['$\\alpha = 90°$', '$W = 0$', '**nul** : la force est perpendiculaire au déplacement'],
            ['$90° < \\alpha \\leq 180°$', '$W < 0$', '**résistant** : la force s’oppose au déplacement'],
          ],
        },
        {
          kind: 'example',
          title: 'tirer une charrette',
          text: 'Un âne tire une charrette avec une force de 200 N inclinée de 30° sur l’horizontale, sur 50 m de route droite.',
          steps: ['$W = 200 \\times 50 \\times \\cos 30° \\approx 8\\,660$ J.'],
        },
      ],
    },
    {
      title: 'Le travail du poids',
      blocks: [
        {
          kind: 'formula',
          tex: 'W_{AB}(\\vec{P}) = m\\,g\\,(z_A - z_B)',
          legend: ['$z$ : altitude, l’axe étant orienté vers le haut ; $g \\approx 9{,}8$ N/kg'],
        },
        {
          kind: 'rule',
          text: 'Le travail du poids ne dépend **pas du chemin suivi**, seulement de la différence d’altitude : il est moteur quand l’objet descend, résistant quand il monte.',
        },
        {
          kind: 'trap',
          wrong: '« Porter un sac sur la tête en marchant à l’horizontale, c’est faire travailler son poids. »',
          why: 'Le poids est vertical et le déplacement horizontal : $\\alpha = 90°$, le travail du poids est nul.',
          reflex: 'Toujours chercher l’angle entre la force et le déplacement.',
        },
      ],
    },
    {
      title: 'La puissance',
      blocks: [
        {
          kind: 'formula',
          tex: 'P_{moy} = \\dfrac{W}{\\Delta t} \\qquad P = F \\times v \\times \\cos\\alpha',
          legend: ['$P$ en watts (W) ; 1 kW = 1 000 W', 'l’énergie électrique se compte aussi en kilowattheures : 1 kWh = 3,6 × 10⁶ J'],
        },
        {
          kind: 'example',
          title: 'la pompe du village',
          text: 'Une pompe remonte 1 000 L d’eau (1 000 kg) d’un puits de 20 m en 10 minutes.',
          steps: ['$W = mgh = 1\\,000 \\times 9{,}8 \\times 20 = 196\\,000$ J.', '$P = \\dfrac{196\\,000}{600} \\approx 327$ W.'],
        },
      ],
    },
  ],
  essentials: [
    '$W = F \\cdot AB \\cdot \\cos\\alpha$, en joules ; moteur, nul ou résistant selon $\\alpha$.',
    'Travail du poids : $W = mg(z_A - z_B)$, indépendant du chemin.',
    '$P = \\frac{W}{\\Delta t}$ ou $P = Fv\\cos\\alpha$, en watts ; 1 kWh = 3,6 MJ.',
  ],
  exercises: [
    {
      id: 'trav-charrette',
      level: 1,
      title: 'La charrette',
      statement: 'Un âne exerce sur une charrette une force de 200 N inclinée de 30° sur l’horizontale. La charrette parcourt 50 m en ligne droite en 2 minutes.',
      parts: [
        {
          label: 'Travail de la force de traction (en J).',
          answer: { kind: 'number', value: 8660, tolerance: 15, unit: 'J' },
          steps: ['$W = 200 \\times 50 \\times \\cos 30° \\approx 8\\,660$ J.'],
        },
        {
          label: 'Puissance moyenne de l’âne (en W).',
          answer: { kind: 'number', value: 72.2, tolerance: 0.5, unit: 'W' },
          steps: ['$P = \\dfrac{8\\,660}{120} \\approx 72$ W.'],
        },
      ],
    },
    {
      id: 'trav-poids',
      level: 2,
      title: 'Monter un sac',
      statement: 'On monte un sac de riz de 50 kg sur une charrette haute de 1,2 m. $g = 9{,}8$ N/kg.',
      parts: [
        {
          label: 'Travail du poids pendant la montée (en J).',
          answer: { kind: 'number', value: -588, tolerance: 2, unit: 'J' },
          steps: ['$W = mg(z_A - z_B) = 50 \\times 9{,}8 \\times (0 - 1{,}2) = -588$ J : travail résistant.'],
        },
        {
          label: 'Travail minimal que doit fournir le porteur (en J).',
          answer: { kind: 'number', value: 588, tolerance: 2, unit: 'J' },
          steps: ['À vitesse constante, sa force compense le poids : $W = +588$ J.'],
        },
      ],
    },
    {
      id: 'trav-puissance',
      level: 3,
      title: 'Puissance d’une moto',
      statement: 'Une moto roule à 72 km/h sur une route horizontale ; les frottements de l’air et de la route totalisent 150 N.',
      parts: [
        {
          label: 'Quelle force motrice faut-il pour garder la vitesse constante (en N) ?',
          answer: { kind: 'number', value: 150, tolerance: 0.5, unit: 'N' },
          steps: ['Vitesse constante en ligne droite : la force motrice compense les frottements.'],
        },
        {
          label: 'Puissance utile du moteur (en W).',
          answer: { kind: 'number', value: 3000, tolerance: 10, unit: 'W' },
          steps: ['72 km/h = 20 m/s ; $P = Fv = 150 \\times 20 = 3\\,000$ W.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le travail d’une force perpendiculaire au déplacement est :',
      choices: ['nul', 'moteur', 'résistant', 'maximal'],
      answer: 0,
      explanation: '$\\cos 90° = 0$.',
    },
    {
      question: 'Quand un objet descend, le travail de son poids est :',
      choices: ['moteur', 'résistant', 'nul', 'impossible à calculer'],
      answer: 0,
      explanation: '$z_A > z_B$ : $W = mg(z_A - z_B) > 0$.',
    },
    {
      question: 'L’unité de la puissance est :',
      choices: ['le watt', 'le joule', 'le newton', 'le kilowattheure'],
      answer: 0,
      explanation: 'Le joule et le kilowattheure mesurent une énergie.',
    },
    {
      question: 'Pour un même travail, une machine deux fois plus puissante :',
      choices: ['met deux fois moins de temps', 'met deux fois plus de temps', 'fournit deux fois plus de travail', 'consomme moins d’énergie'],
      answer: 0,
      explanation: '$\\Delta t = \\dfrac{W}{P}$.',
    },
  ],
  applications: [
    {
      title: 'La pompe solaire du village',
      tagline: 'Quelle puissance pour remplir le château d’eau ?',
      situation:
        'Une pompe solaire doit remonter chaque jour 20 m³ d’eau (20 000 kg) d’un forage, sur une hauteur totale de 40 m, pendant les 6 heures de bon ensoleillement. $g = 9{,}8$ N/kg.',
      model: 'On ne compte que le travail contre le poids de l’eau ; les pertes sont négligées.',
      questions: ['Quel travail la pompe fournit-elle par jour ?', 'Quelle puissance utile moyenne doit-elle développer, en W ?'],
      check: { value: 363, tolerance: 0.02, unit: 'W' },
      solution: ['$W = mgh = 20\\,000 \\times 9{,}8 \\times 40 = 7{,}84 \\times 10^6$ J.', '$P = \\dfrac{7{,}84 \\times 10^6}{6 \\times 3\\,600} \\approx 363$ W.', 'En réalité, il faut des panneaux plus puissants : le rendement de la pompe et du moteur est inférieur à 1.'],
    },
  ],
};
