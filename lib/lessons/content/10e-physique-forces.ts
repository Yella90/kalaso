import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Quand Awa pousse la charrette au marché de Médine, la charrette avance… mais Awa sent la charrette la repousser. Quand un aimant attire un clou, le clou attire aussi l’aimant. Une force ne va jamais seule : toute action entraîne une réaction.',
  objectives: [
    'distinguer actions de contact et actions à distance ;',
    'représenter une force par un vecteur (point d’application, direction, sens, valeur) ;',
    'énoncer le principe des actions réciproques ;',
    'mesurer une force avec un dynamomètre.',
  ],
  sections: [
    {
      title: 'Actions mécaniques et forces',
      blocks: [
        {
          kind: 'list',
          items: [
            '**actions de contact** : poussée, traction d’un fil, réaction d’un support, frottement ;',
            '**actions à distance** : attraction de la Terre (poids), action d’un aimant, action électrique.',
          ],
        },
        {
          kind: 'definition',
          term: 'Force',
          text: 'grandeur qui modélise une action mécanique. Elle est représentée par un **vecteur** caractérisé par son point d’application, sa direction, son sens et sa valeur (en newtons, N).',
        },
        {
          kind: 'text',
          text: 'On mesure une force avec un **dynamomètre** : un ressort qui s’allonge proportionnellement à la force.',
        },
      ],
    },
    {
      title: 'Le principe des actions réciproques',
      blocks: [
        {
          kind: 'rule',
          text: 'Si un corps A exerce une force $\\vec F_{A/B}$ sur un corps B, alors B exerce sur A une force $\\vec F_{B/A}$ de **même direction**, de **même valeur** et de **sens opposé** : $\\vec F_{B/A} = -\\vec F_{A/B}$.',
        },
        {
          kind: 'example',
          title: 'la pirogue',
          text: 'Le piroguier pousse le fond du fleuve vers l’arrière avec sa perche ; le fond pousse la perche, donc la pirogue, vers l’avant.',
        },
        {
          kind: 'trap',
          wrong: '« Les deux forces s’annulent, donc rien ne bouge. »',
          why: 'Elles s’exercent sur deux corps différents : chacune agit sur son corps, elles ne s’ajoutent pas.',
          reflex: 'Action et réaction s’appliquent à deux objets différents.',
        },
      ],
    },
  ],
  essentials: [
    'Une force : point d’application, direction, sens, valeur en N.',
    'Actions de contact ou à distance.',
    'Actions réciproques : F(B/A) = −F(A/B), sur deux corps différents.',
    'Le dynamomètre mesure les forces.',
  ],
  exercises: [
    {
      id: 'fo-echelle',
      level: 1,
      title: 'Représenter une force',
      statement: 'On représente les forces à l’échelle 1 cm pour 5 N.',
      parts: [
        {
          label: 'Longueur du vecteur pour une force de 30 N (en cm).',
          answer: { kind: 'number', value: 6, tolerance: 0.05, unit: 'cm' },
          steps: ['$\\dfrac{30}{5} = 6$ cm.'],
        },
        {
          label: 'Valeur d’une force représentée par un vecteur de 2,5 cm (en N).',
          answer: { kind: 'number', value: 12.5, tolerance: 0.05, unit: 'N' },
          steps: ['$2{,}5 \\times 5 = 12{,}5$ N.'],
        },
      ],
    },
    {
      id: 'fo-ressort',
      level: 2,
      title: 'Étalonner un dynamomètre',
      statement: 'Un ressort s’allonge de 2 cm sous une force de 1 N. L’allongement est proportionnel à la force.',
      parts: [
        {
          label: 'Allongement sous une force de 3,5 N (en cm).',
          answer: { kind: 'number', value: 7, tolerance: 0.05, unit: 'cm' },
          steps: ['$3{,}5 \\times 2 = 7$ cm.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’attraction d’un aimant sur un clou est une action :',
      choices: ['à distance', 'de contact', 'de frottement', 'de traction'],
      answer: 0,
      explanation: 'Elle s’exerce sans contact.',
    },
    {
      question: 'L’unité de force est :',
      choices: ['le newton', 'le kilogramme', 'le joule', 'le watt'],
      answer: 0,
      explanation: 'Symbole N.',
    },
    {
      question: 'Si la Terre attire une mangue avec 3 N, la mangue attire la Terre avec :',
      choices: ['3 N', '0 N', '0,3 N', 'une force énorme'],
      answer: 0,
      explanation: 'Principe des actions réciproques : même valeur.',
    },
    {
      question: 'Pour avancer, un nageur pousse l’eau :',
      choices: ['vers l’arrière', 'vers l’avant', 'vers le haut', 'il ne pousse pas l’eau'],
      answer: 0,
      explanation: 'L’eau le pousse alors vers l’avant.',
    },
  ],
  applications: [
    {
      title: 'Le peson du marché',
      tagline: 'Peser les arachides avec un ressort',
      situation:
        'Au marché de Kayes, le commerçant pèse les sacs d’arachides avec un peson à ressort. Le ressort s’allonge de 1,2 cm par kilogramme. Pour un sac, il s’allonge de 30 cm.',
      model: 'L’allongement est proportionnel à la force, donc à la masse suspendue.',
      questions: ['Quelle est la masse du sac (en kg) ?', 'Que se passe-t-il si on dépasse la charge maximale ?'],
      check: { value: 25, tolerance: 0.02, unit: 'kg' },
      solution: ['$\\dfrac{30}{1{,}2} = 25$ kg.', 'Le ressort se déforme définitivement : l’allongement n’est plus proportionnel et le peson devient faux.'],
      fact: 'La loi de proportionnalité entre force et allongement porte le nom de loi de Hooke.',
    },
  ],
};
