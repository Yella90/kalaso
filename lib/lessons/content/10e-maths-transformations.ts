import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les motifs des pagnes bogolan et des tissus wax se répètent par glissements, symétries et rotations ; une photo agrandie garde les mêmes formes en changeant de taille. Ces déplacements et agrandissements sont des **transformations du plan**.',
  objectives: [
    'connaître translation, symétries, rotation et homothétie ;',
    'construire l’image d’une figure ;',
    'savoir ce que conserve chaque transformation ;',
    'utiliser le rapport d’une homothétie sur les longueurs et les aires.',
  ],
  sections: [
    {
      title: 'Les isométries',
      blocks: [
        {
          kind: 'table',
          head: ['Transformation', 'Définie par', 'Image M′ de M'],
          rows: [
            ['translation', 'un vecteur $\\vec u$', '$\\overrightarrow{MM\'} = \\vec u$'],
            ['symétrie centrale', 'un centre O', 'O milieu de [MM′]'],
            ['symétrie axiale', 'une droite $\\Delta$', '$\\Delta$ médiatrice de [MM′]'],
            ['rotation', 'un centre O et un angle $\\theta$', '$OM\' = OM$ et $(\\overrightarrow{OM}, \\overrightarrow{OM\'}) = \\theta$'],
          ],
        },
        {
          kind: 'rule',
          text: 'Les **isométries** conservent les distances, donc les angles, les aires, le parallélisme et l’alignement.',
        },
      ],
    },
    {
      title: 'L’homothétie',
      blocks: [
        {
          kind: 'formula',
          tex: '\\overrightarrow{OM\'} = k\\,\\overrightarrow{OM}',
          legend: ['homothétie de centre O et de rapport $k \\ne 0$'],
        },
        {
          kind: 'rule',
          text: 'Une homothétie de rapport $k$ multiplie les longueurs par $|k|$ et les aires par $k^2$ ; elle conserve les angles, l’alignement et le parallélisme. Si $|k| > 1$, c’est un agrandissement ; si $|k| < 1$, une réduction.',
        },
        {
          kind: 'definition',
          term: 'Figures semblables',
          text: 'deux figures sont semblables si l’une est l’image de l’autre par une composée d’isométries et d’homothéties : mêmes angles, longueurs proportionnelles.',
        },
        {
          kind: 'example',
          title: 'agrandir une photo',
          text: 'Une photo de 10 cm × 15 cm est agrandie avec un rapport 3.',
          steps: ['Nouvelles dimensions : 30 cm × 45 cm.', 'Aire : $150 \\times 3^2 = 1\\,350$ cm², neuf fois plus.'],
        },
      ],
    },
  ],
  essentials: [
    'Translation, symétries, rotation : isométries (distances conservées).',
    'Homothétie de rapport k : longueurs × |k|, aires × k².',
    'Figures semblables : mêmes angles, longueurs proportionnelles.',
  ],
  exercises: [
    {
      id: 'tf-homothetie',
      level: 1,
      title: 'Agrandir un logo',
      statement: 'Un logo triangulaire a une aire de 12 cm². On l’agrandit par une homothétie de rapport 2,5.',
      parts: [
        {
          label: 'Un côté de 4 cm devient (en cm) :',
          answer: { kind: 'number', value: 10, tolerance: 0.01, unit: 'cm' },
          steps: ['$4 \\times 2{,}5 = 10$ cm.'],
        },
        {
          label: 'Aire du nouveau logo, en cm².',
          answer: { kind: 'number', value: 75, tolerance: 0.1, unit: 'cm²' },
          steps: ['$12 \\times 2{,}5^2 = 12 \\times 6{,}25 = 75$ cm².'],
        },
      ],
    },
    {
      id: 'tf-coordonnees',
      level: 2,
      title: 'Images par des transformations',
      statement: 'Dans un repère, M(3 ; −1).',
      parts: [
        {
          label: 'Abscisse de l’image de M par la translation de vecteur $\\vec u(-5\\,;\\,2)$.',
          answer: { kind: 'number', value: -2, tolerance: 0, unit: '' },
          steps: ['$3 - 5 = -2$ (et l’ordonnée vaut $-1 + 2 = 1$).'],
        },
        {
          label: 'Ordonnée de l’image de M par l’homothétie de centre O et de rapport −2.',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$M\'(-6\\,;\\,2)$ : on multiplie les coordonnées par −2.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une isométrie conserve :',
      choices: ['les distances', 'seulement les angles', 'seulement l’alignement', 'rien'],
      answer: 0,
      explanation: 'Iso-métrie : même mesure.',
    },
    {
      question: 'Une homothétie de rapport 3 multiplie les aires par :',
      choices: ['9', '3', '6', '27'],
      answer: 0,
      explanation: 'Par k² = 9.',
    },
    {
      question: 'La symétrie centrale de centre O est la rotation de centre O et d’angle :',
      choices: ['π (180°)', 'π/2', '2π', 'π/4'],
      answer: 0,
      explanation: 'Un demi-tour.',
    },
    {
      question: 'Une homothétie de rapport −1 est :',
      choices: ['une symétrie centrale', 'une translation', 'une symétrie axiale', 'l’identité'],
      answer: 0,
      explanation: 'OM′ = −OM.',
    },
  ],
  applications: [
    {
      title: 'La carte du Mali',
      tagline: 'Lire une échelle',
      situation:
        'Sur une carte au 1/5 000 000, la distance Bamako–Mopti mesure 9,2 cm. Une carte murale est une homothétie de cette carte de rapport 4.',
      model: 'Une échelle est un rapport d’homothétie ; les distances réelles = distances sur la carte × 5 000 000.',
      questions: ['Quelle est la distance réelle à vol d’oiseau Bamako–Mopti, en km ?', 'Quelle est l’échelle de la carte murale ?'],
      check: { value: 460, tolerance: 0.01, unit: 'km' },
      solution: ['$9{,}2 \\times 5\\,000\\,000 = 46\\,000\\,000$ cm = 460 km.', 'Les longueurs sont 4 fois plus grandes : échelle 4/5 000 000 = 1/1 250 000.'],
      fact: 'La superficie du Mali est d’environ 1 240 000 km² : sur la carte murale, elle est 16 fois plus grande que sur la petite carte.',
    },
  ],
};
