import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le kit solaire de la maison charge une batterie le jour et allume les lampes la nuit. La batterie chauffe un peu, le moteur du ventilateur aussi : une partie de l’énergie est perdue. Combien faut-il de panneaux, quelle batterie choisir ? Pour répondre, on fait le **bilan énergétique** du circuit.',
  objectives: [
    'calculer une puissance et une énergie électriques ;',
    'appliquer la loi de Joule ;',
    'faire le bilan de puissance d’un générateur et d’un moteur ;',
    'calculer un rendement.',
  ],
  sections: [
    {
      title: 'Puissance et énergie électriques',
      blocks: [
        {
          kind: 'formula',
          tex: 'P = U\\,I \\qquad W = P\\,\\Delta t = U\\,I\\,\\Delta t',
          legend: ['$P$ en W ; $W$ en J (ou en Wh, kWh) ; 1 kWh = 3,6 × 10⁶ J'],
        },
        {
          kind: 'formula',
          label: 'Effet Joule dans une résistance',
          tex: 'P_J = R\\,I^2 = \\dfrac{U^2}{R}',
        },
        {
          kind: 'text',
          text: 'Dans un conducteur ohmique (fer à repasser, bouilloire, résistance chauffante), toute l’énergie reçue est transformée en chaleur.',
        },
      ],
    },
    {
      title: 'Générateurs et récepteurs',
      blocks: [
        {
          kind: 'table',
          head: ['Dipôle', 'Tension', 'Bilan de puissance'],
          rows: [
            ['générateur (pile, batterie) : f.é.m. $E$, résistance interne $r$', '$U = E - rI$', '$EI$ (produite) $= UI$ (fournie au circuit) $+ rI^2$ (pertes)'],
            ['moteur : f.c.é.m. $E\'$, résistance interne $r\'$', '$U = E\' + r\'I$', '$UI$ (reçue) $= E\'I$ (utile, mécanique) $+ r\'I^2$ (pertes)'],
          ],
        },
        {
          kind: 'formula',
          label: 'Rendement',
          tex: '\\eta = \\dfrac{P_{utile}}{P_{reçue}} \\qquad 0 < \\eta < 1',
        },
        {
          kind: 'example',
          title: 'une batterie',
          text: 'Batterie : $E = 12$ V, $r = 0{,}5$ Ω, qui débite 4,0 A.',
          steps: ['$U = 12 - 0{,}5 \\times 4 = 10$ V.', 'Puissance produite : 48 W ; fournie : 40 W ; pertes : 8 W. Rendement : $\\dfrac{40}{48} \\approx 83$ %.'],
        },
        {
          kind: 'trap',
          wrong: '« Un moteur transforme toute l’énergie électrique en mouvement. »',
          why: 'Une partie chauffe ses bobinages (effet Joule) et se perd en frottements.',
          reflex: 'Toujours $\\eta < 1$ ; les pertes sont égales à la puissance reçue moins la puissance utile.',
        },
      ],
    },
  ],
  essentials: [
    '$P = UI$ ; $W = UI\\Delta t$ ; 1 kWh = 3,6 MJ.',
    'Effet Joule : $P = RI^2$.',
    'Générateur : $U = E - rI$ ; moteur : $U = E\' + r\'I$.',
    'Rendement $\\eta = \\frac{P_{utile}}{P_{reçue}} < 1$.',
  ],
  exercises: [
    {
      id: 'bilan-batterie',
      level: 1,
      title: 'Une batterie',
      statement: 'Une batterie de f.é.m. 12 V et de résistance interne 0,50 Ω débite un courant de 4,0 A.',
      parts: [
        {
          label: 'Tension aux bornes de la batterie (en V).',
          answer: { kind: 'number', value: 10, tolerance: 0.01, unit: 'V' },
          steps: ['$U = E - rI = 12 - 2 = 10$ V.'],
        },
        {
          label: 'Rendement de la batterie (en %).',
          answer: { kind: 'number', value: 83.3, tolerance: 0.2, unit: '%' },
          steps: ['$\\eta = \\dfrac{UI}{EI} = \\dfrac{10}{12} \\approx 83{,}3$ %.'],
        },
      ],
    },
    {
      id: 'bilan-moteur',
      level: 2,
      title: 'Un moteur de ventilateur',
      statement: 'Un moteur de f.c.é.m. 9,0 V et de résistance interne 1,0 Ω est traversé par 2,0 A.',
      parts: [
        {
          label: 'Tension aux bornes du moteur (en V).',
          answer: { kind: 'number', value: 11, tolerance: 0.01, unit: 'V' },
          steps: ['$U = 9{,}0 + 1{,}0 \\times 2{,}0 = 11$ V.'],
        },
        {
          label: 'Puissance mécanique utile (en W).',
          answer: { kind: 'number', value: 18, tolerance: 0.05, unit: 'W' },
          steps: ['$E\'I = 9{,}0 \\times 2{,}0 = 18$ W.'],
        },
        {
          label: 'Rendement du moteur (en %).',
          answer: { kind: 'number', value: 81.8, tolerance: 0.2, unit: '%' },
          steps: ['Puissance reçue : $UI = 22$ W ; $\\eta = \\dfrac{18}{22} \\approx 81{,}8$ %.'],
        },
      ],
    },
    {
      id: 'bilan-cout',
      level: 3,
      title: 'Le coût de la bouilloire',
      statement: 'Une bouilloire électrique de 2 000 W fonctionne 5 minutes par jour. Le kilowattheure coûte 100 F CFA.',
      parts: [
        {
          label: 'Énergie consommée par jour (en kWh).',
          answer: { kind: 'number', value: 0.1667, tolerance: 0.001, unit: 'kWh' },
          steps: ['$2 \\text{ kW} \\times \\dfrac{5}{60}\\text{ h} \\approx 0{,}167$ kWh.'],
        },
        {
          label: 'Coût sur 30 jours (en F CFA).',
          answer: { kind: 'number', value: 500, tolerance: 2, unit: 'F CFA' },
          steps: ['$0{,}1667 \\times 30 \\times 100 = 500$ F CFA.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La puissance dissipée par effet Joule vaut :',
      choices: ['$RI^2$', '$RI$', '$UI^2$', '$\\dfrac{R}{I}$'],
      answer: 0,
      explanation: 'Ou $\\frac{U^2}{R}$ pour un conducteur ohmique.',
    },
    {
      question: 'La tension aux bornes d’un générateur qui débite :',
      choices: ['est inférieure à sa f.é.m.', 'est égale à sa f.é.m.', 'est supérieure à sa f.é.m.', 'est nulle'],
      answer: 0,
      explanation: '$U = E - rI$.',
    },
    {
      question: '1 kWh correspond à :',
      choices: ['3,6 × 10⁶ J', '1 000 J', '3 600 J', '1 J'],
      answer: 0,
      explanation: '$1\\,000 \\text{ W} \\times 3\\,600 \\text{ s}$.',
    },
    {
      question: 'Un rendement de 80 % signifie que :',
      choices: ['80 % de l’énergie reçue est utile', '80 % est perdue', 'le dipôle consomme 80 W', 'la tension vaut 80 V'],
      answer: 0,
      explanation: 'Les 20 % restants sont perdus (chaleur…).',
    },
  ],
  applications: [
    {
      title: 'Le kit solaire de la maison',
      tagline: 'Quelle batterie pour éclairer toute la nuit ?',
      situation:
        'Une famille utilise trois lampes de 10 W chacune, allumées 6 heures par nuit, sur une batterie de 12 V chargée par un panneau solaire.',
      model: 'On néglige les pertes ; la capacité d’une batterie s’exprime en ampères-heures (Ah) : énergie = tension × capacité.',
      questions: ['Quelle énergie les lampes consomment-elles par nuit, en Wh ?', 'Quelle capacité minimale doit avoir la batterie, en Ah ?'],
      check: { value: 15, tolerance: 0.02, unit: 'Ah' },
      solution: ['Énergie : $3 \\times 10 \\times 6 = 180$ Wh.', 'Capacité : $\\dfrac{180}{12} = 15$ Ah.', 'En pratique, on prend une batterie au moins deux fois plus grande, pour ne jamais la décharger complètement, ce qui l’userait vite.'],
      fact: 'Les lampes LED consomment environ 5 fois moins que les anciennes ampoules à incandescence pour la même lumière.',
    },
  ],
};
