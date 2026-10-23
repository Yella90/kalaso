import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le ventilateur, la pompe du forage, le moteur du moulin électrique, la membrane du haut-parleur : tous transforment l’électricité en mouvement grâce à une même force. Un fil parcouru par un courant, placé dans un champ magnétique, est poussé : c’est la **force de Laplace**.',
  objectives: [
    'déterminer la direction et le sens de la force de Laplace ;',
    'calculer sa valeur $F = ILB\\sin\\alpha$ ;',
    'calculer le travail de la force de Laplace ;',
    'expliquer le principe du moteur électrique et du haut-parleur.',
  ],
  sections: [
    {
      title: 'La force de Laplace',
      blocks: [
        {
          kind: 'formula',
          tex: 'F = I\\,L\\,B\\,\\sin\\alpha',
          legend: ['$I$ : intensité (A) ; $L$ : longueur du conducteur dans le champ (m) ; $B$ en T', '$\\alpha$ : angle entre le conducteur (sens du courant) et $\\vec{B}$'],
        },
        {
          kind: 'rule',
          text: 'La force est **perpendiculaire** à la fois au conducteur et au champ. Son sens se trouve avec la règle des trois doigts de la main droite : pouce = courant, index = champ, majeur = force.',
        },
        {
          kind: 'trap',
          wrong: '« La force de Laplace est dirigée comme le champ magnétique. »',
          why: 'Elle est perpendiculaire au champ ; elle est nulle si le conducteur est parallèle au champ ($\\sin 0 = 0$).',
          reflex: 'Force maximale quand le fil est perpendiculaire au champ.',
        },
      ],
    },
    {
      title: 'Les rails de Laplace et le travail',
      blocks: [
        {
          kind: 'text',
          text: 'Une tige mobile posée sur deux rails reliés à un générateur, dans un champ vertical, se met à rouler : la force de Laplace la pousse le long des rails.',
        },
        {
          kind: 'formula',
          tex: 'W = F \\times d',
          legend: ['$d$ : déplacement de la tige dans le sens de la force'],
        },
        {
          kind: 'rule',
          text: 'La force de Laplace effectue un travail moteur : l’énergie électrique fournie par le générateur est convertie en énergie mécanique. C’est le principe de tous les moteurs électriques.',
        },
      ],
    },
    {
      title: 'Moteurs et haut-parleurs',
      blocks: [
        {
          kind: 'list',
          items: [
            '**moteur à courant continu** : une bobine (rotor) placée dans le champ d’un aimant (stator) subit des forces de Laplace opposées sur ses deux côtés : elles forment un couple qui la fait tourner ; un collecteur inverse le courant chaque demi-tour pour que la rotation continue ;',
            '**haut-parleur** : une bobine collée à une membrane se trouve dans le champ d’un aimant ; le courant variable de l’amplificateur la fait vibrer et la membrane produit le son.',
          ],
        },
      ],
    },
  ],
  essentials: [
    '$F = ILB\\sin\\alpha$, perpendiculaire au conducteur et au champ ; règle des trois doigts.',
    'Nulle si le fil est parallèle à $\\vec{B}$, maximale s’il est perpendiculaire.',
    'Travail moteur : conversion électrique → mécanique (moteurs, rails de Laplace).',
    'Haut-parleur : bobine + membrane dans le champ d’un aimant.',
  ],
  exercises: [
    {
      id: 'lap-force',
      level: 1,
      title: 'Calculer une force de Laplace',
      statement: 'Une tige de 10 cm parcourue par 5,0 A est placée dans un champ de 0,10 T.',
      parts: [
        {
          label: 'Force si la tige est perpendiculaire au champ (en N).',
          answer: { kind: 'number', value: 0.05, tolerance: 0.0005, unit: 'N' },
          steps: ['$F = 5{,}0 \\times 0{,}10 \\times 0{,}10 = 0{,}050$ N.'],
        },
        {
          label: 'Force si la tige fait un angle de 30° avec le champ (en N).',
          answer: { kind: 'number', value: 0.025, tolerance: 0.0005, unit: 'N' },
          steps: ['$F = 0{,}050 \\times \\sin 30° = 0{,}025$ N.'],
        },
        {
          label: 'Travail de la force (cas perpendiculaire) si la tige se déplace de 20 cm (en J).',
          answer: { kind: 'number', value: 0.01, tolerance: 0.0002, unit: 'J' },
          steps: ['$W = 0{,}050 \\times 0{,}20 = 1{,}0 \\times 10^{-2}$ J.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La force de Laplace est :',
      choices: ['perpendiculaire au conducteur et au champ', 'parallèle au champ', 'parallèle au courant', 'toujours verticale'],
      answer: 0,
      explanation: 'On trouve son sens avec la règle des trois doigts.',
    },
    {
      question: 'Si l’on inverse le sens du courant, la force de Laplace :',
      choices: ['change de sens', 'ne change pas', 'devient nulle', 'double'],
      answer: 0,
      explanation: 'Elle change aussi de sens si l’on inverse le champ.',
    },
    {
      question: 'Un conducteur parallèle au champ magnétique subit une force :',
      choices: ['nulle', 'maximale', 'égale à $ILB$', 'verticale'],
      answer: 0,
      explanation: '$\\sin 0 = 0$.',
    },
    {
      question: 'Dans un moteur électrique, la force de Laplace :',
      choices: ['convertit l’énergie électrique en énergie mécanique', 'produit de l’électricité', 'chauffe la bobine', 'crée le champ magnétique'],
      answer: 0,
      explanation: 'Son travail est moteur.',
    },
  ],
  applications: [
    {
      title: 'Le haut-parleur de la radio',
      tagline: 'Quelle force fait vibrer la membrane ?',
      situation:
        'La bobine d’un haut-parleur contient 5,0 m de fil, placé perpendiculairement au champ radial d’un aimant de 1,0 T. À un instant donné, le courant vaut 0,20 A.',
      model: 'Toutes les portions de fil sont perpendiculaires au champ ; les forces s’additionnent.',
      questions: ['Quelle force s’exerce sur la bobine, en N ?'],
      check: { value: 1, tolerance: 0.02, unit: 'N' },
      solution: ['$F = ILB = 0{,}20 \\times 5{,}0 \\times 1{,}0 = 1{,}0$ N.', 'Le courant alterne des centaines de fois par seconde : la force change de sens au même rythme et la membrane vibre, ce qui produit le son.'],
      fact: 'Un microphone fonctionne à l’inverse : le son fait bouger la bobine dans le champ, ce qui crée un courant.',
    },
  ],
};
