import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une bouteille de gaz qui fuit dans la cuisine est dangereuse : le butane ne monte pas, il s’accumule au ras du sol, où une étincelle peut l’enflammer. Pourquoi certains gaz « tombent » et d’autres s’envolent, comme l’hélium des ballons ? Et comment compter les molécules d’un gaz qu’on ne peut pas peser facilement ? Par son **volume**.',
  objectives: [
    'énoncer la loi d’Avogadro-Ampère ;',
    'utiliser le volume molaire pour passer d’un volume à une quantité de matière ;',
    'calculer la densité d’un gaz par rapport à l’air ;',
    'prévoir si un gaz s’accumule en bas ou en haut d’une pièce.',
  ],
  sections: [
    {
      title: 'La loi d’Avogadro-Ampère',
      blocks: [
        {
          kind: 'rule',
          text: 'Dans les mêmes conditions de température et de pression, des volumes égaux de gaz différents contiennent **le même nombre de molécules**.',
        },
        {
          kind: 'definition',
          term: 'Volume molaire $V_m$',
          text: 'volume occupé par une mole de gaz. Il est le même pour tous les gaz dans des conditions données : 22,4 L/mol à 0 °C et 24 L/mol à 20 °C, sous la pression atmosphérique normale.',
        },
        {
          kind: 'formula',
          tex: 'n = \\dfrac{V}{V_m}',
          legend: ['$n$ en mol ; $V$ en L ; $V_m$ en L/mol'],
        },
        {
          kind: 'example',
          title: 'du dioxyde de carbone',
          text: '4,8 L de $\\ce{CO2}$ à 20 °C.',
          steps: ['$n = \\dfrac{4{,}8}{24} = 0{,}20$ mol.', 'Masse : $0{,}20 \\times 44 = 8{,}8$ g.'],
        },
      ],
    },
    {
      title: 'Densité d’un gaz',
      blocks: [
        {
          kind: 'formula',
          tex: 'd = \\dfrac{M}{29}',
          legend: ['$M$ : masse molaire du gaz (g/mol) ; 29 g/mol : masse molaire moyenne de l’air'],
        },
        {
          kind: 'rule',
          text: 'Si $d > 1$, le gaz est plus lourd que l’air et s’accumule en bas ; si $d < 1$, il est plus léger et monte.',
        },
        {
          kind: 'table',
          head: ['Gaz', '$M$ (g/mol)', '$d$', 'Comportement'],
          rows: [
            ['dihydrogène $\\ce{H2}$', '2', '0,07', 'monte très vite'],
            ['méthane $\\ce{CH4}$ (gaz naturel)', '16', '0,55', 'monte'],
            ['dioxyde de carbone $\\ce{CO2}$', '44', '1,5', 's’accumule en bas'],
            ['butane $\\ce{C4H10}$', '58', '2,0', 's’accumule au ras du sol'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Une mole de butane occupe plus de place qu’une mole de dihydrogène, car ses molécules sont plus grosses. »',
          why: 'Dans un gaz, les molécules sont très éloignées les unes des autres : leur taille ne compte presque pas.',
          reflex: 'Même $V_m$ pour tous les gaz, dans les mêmes conditions.',
        },
      ],
    },
  ],
  essentials: [
    'Avogadro-Ampère : volumes égaux de gaz (même T, même P) ⇒ même nombre de molécules.',
    '$n = \\frac{V}{V_m}$ ; $V_m = 22{,}4$ L/mol à 0 °C, 24 L/mol à 20 °C.',
    'Densité par rapport à l’air : $d = \\frac{M}{29}$ ; $d > 1$ : le gaz s’accumule en bas.',
  ],
  exercises: [
    {
      id: 'gaz-quantite',
      level: 1,
      title: 'Volume et quantité de matière',
      statement: 'On recueille 4,8 L de dioxyde de carbone à 20 °C ($V_m = 24$ L/mol).',
      parts: [
        {
          label: 'Quantité de matière (en mol).',
          answer: { kind: 'number', value: 0.2, tolerance: 0.002, unit: 'mol' },
          steps: ['$\\dfrac{4{,}8}{24} = 0{,}20$ mol.'],
        },
        {
          label: 'Masse de ce gaz (en g).',
          answer: { kind: 'number', value: 8.8, tolerance: 0.05, unit: 'g' },
          steps: ['$M(\\ce{CO2}) = 44$ g/mol ; $0{,}20 \\times 44 = 8{,}8$ g.'],
        },
        {
          label: 'Combien de molécules contient-il ? (notation 1.2e23 acceptée)',
          answer: { kind: 'number', value: 1.204e23, tolerance: 0.01e23, unit: '' },
          steps: ['$N = 0{,}20 \\times 6{,}02 \\times 10^{23} \\approx 1{,}2 \\times 10^{23}$.'],
        },
      ],
    },
    {
      id: 'gaz-densite',
      level: 2,
      title: 'Plus lourd ou plus léger que l’air ?',
      statement: 'Calcule la densité par rapport à l’air (valeurs approchées).',
      parts: [
        {
          label: 'Densité du butane ($M = 58$ g/mol).',
          answer: { kind: 'number', value: 2, tolerance: 0.01, unit: '' },
          steps: ['$\\dfrac{58}{29} = 2{,}0$.'],
        },
        {
          label: 'Densité du méthane ($M = 16$ g/mol).',
          answer: { kind: 'number', value: 0.552, tolerance: 0.005, unit: '' },
          steps: ['$\\dfrac{16}{29} \\approx 0{,}55$ : le méthane monte.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'À 20 °C, une mole de dioxygène occupe :',
      choices: ['24 L', '22,4 L', '32 L', '1 L'],
      answer: 0,
      explanation: 'Le volume molaire ne dépend pas du gaz.',
    },
    {
      question: 'Un gaz de densité 0,6 :',
      choices: ['monte dans l’air', 's’accumule au sol', 'reste immobile', 'est liquide'],
      answer: 0,
      explanation: '$d < 1$ : plus léger que l’air.',
    },
    {
      question: 'Deux ballons de même volume, à la même température et pression, contiennent l’un du dihydrogène, l’autre du dioxyde de carbone. Ils contiennent :',
      choices: ['le même nombre de molécules', 'la même masse', 'plus de molécules de dihydrogène', 'plus de molécules de dioxyde de carbone'],
      answer: 0,
      explanation: 'Loi d’Avogadro-Ampère.',
    },
    {
      question: '0,5 mol de gaz à 0 °C occupe :',
      choices: ['11,2 L', '22,4 L', '12 L', '0,5 L'],
      answer: 0,
      explanation: '$0{,}5 \\times 22{,}4$.',
    },
  ],
  applications: [
    {
      title: 'La fuite de gaz dans la cuisine',
      tagline: 'Où le butane s’accumule-t-il ?',
      situation:
        'Une odeur de gaz se répand dans la cuisine : le tuyau de la bouteille de butane fuit. $M(\\ce{C4H10}) = 58$ g/mol.',
      model: 'On compare la masse molaire du butane à celle de l’air.',
      questions: ['Quelle est la densité du butane par rapport à l’air ?', 'Que faire en cas de fuite ?'],
      check: { value: 2, tolerance: 0.02, unit: '' },
      solution: ['$d = \\dfrac{58}{29} = 2$ : le butane s’accumule au ras du sol.', 'Fermer le robinet de la bouteille, ne rien allumer (ni flamme, ni interrupteur), ouvrir portes et fenêtres pour aérer au niveau du sol.'],
      fact: 'Le butane est inodore : on lui ajoute une substance qui sent fort pour qu’on puisse détecter les fuites.',
    },
  ],
};
