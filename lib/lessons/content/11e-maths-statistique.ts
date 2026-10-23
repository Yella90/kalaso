import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Deux classes ont la même moyenne au devoir de maths, 12 sur 20. Pourtant, dans l’une, toutes les notes sont entre 10 et 14 ; dans l’autre, elles vont de 2 à 20. La moyenne ne dit pas tout : il faut aussi mesurer la **dispersion** des données, avec la médiane, les quartiles et l’écart-type.',
  objectives: [
    'organiser une série statistique (effectifs, fréquences) ;',
    'calculer moyenne, médiane, mode et quartiles ;',
    'calculer la variance et l’écart-type ;',
    'construire et lire un diagramme en boîte.',
  ],
  sections: [
    {
      title: 'Paramètres de position',
      blocks: [
        {
          kind: 'formula',
          label: 'Moyenne',
          tex: '\\bar{x} = \\dfrac{n_1x_1 + n_2x_2 + \\dots + n_px_p}{N} = \\sum f_i\\,x_i',
          legend: ['$n_i$ : effectifs, $N$ : effectif total, $f_i = \\frac{n_i}{N}$ : fréquences'],
        },
        {
          kind: 'list',
          items: [
            '**médiane** $Me$ : valeur qui partage la série ordonnée en deux moitiés de même effectif ;',
            '**quartiles** : $Q_1$ est la plus petite valeur telle qu’au moins 25 % des données lui soient inférieures ou égales ; $Q_3$, au moins 75 % ;',
            '**mode** : valeur la plus fréquente.',
          ],
        },
        {
          kind: 'example',
          title: 'sept notes',
          text: '8 ; 10 ; 12 ; 12 ; 14 ; 16 ; 18.',
          steps: ['Moyenne : $\\dfrac{90}{7} \\approx 12{,}86$.', 'Médiane : la 4ᵉ valeur, 12. Mode : 12.', '$Q_1$ : 2ᵉ valeur (car $\\frac{7}{4} = 1{,}75$), soit 10 ; $Q_3$ : 6ᵉ valeur ($\\frac{21}{4} = 5{,}25$), soit 16.'],
        },
      ],
    },
    {
      title: 'Paramètres de dispersion',
      blocks: [
        {
          kind: 'formula',
          tex: 'V = \\dfrac{1}{N}\\sum n_i(x_i - \\bar{x})^2 = \\dfrac{1}{N}\\sum n_i x_i^2 - \\bar{x}^2 \\qquad \\sigma = \\sqrt{V}',
          legend: ['$\\sigma$ : écart-type, dans la même unité que les données'],
        },
        {
          kind: 'list',
          items: [
            '**étendue** : plus grande valeur − plus petite ;',
            '**écart interquartile** : $Q_3 - Q_1$ ; il ne dépend pas des valeurs extrêmes ;',
            'le **diagramme en boîte** représente le minimum, $Q_1$, la médiane, $Q_3$ et le maximum.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« La médiane est la valeur du milieu de la liste, sans la ranger. »',
          why: 'La médiane se lit sur la série **ordonnée**.',
          reflex: 'Toujours ranger les valeurs par ordre croissant d’abord.',
        },
      ],
    },
  ],
  essentials: [
    'Moyenne $\\bar{x} = \\sum f_ix_i$ ; médiane et quartiles sur la série ordonnée ; mode.',
    'Variance $V = \\frac{1}{N}\\sum n_ix_i^2 - \\bar{x}^2$ ; écart-type $\\sigma = \\sqrt{V}$.',
    'Étendue, écart interquartile ; diagramme en boîte.',
  ],
  exercises: [
    {
      id: 'stat11-notes',
      level: 1,
      title: 'Les notes d’un groupe',
      statement: 'Notes : 8 ; 10 ; 12 ; 12 ; 14 ; 16 ; 18.',
      parts: [
        {
          label: 'Moyenne (valeur approchée).',
          answer: { kind: 'number', value: 12.86, tolerance: 0.01, unit: '' },
          steps: ['$\\dfrac{90}{7} \\approx 12{,}86$.'],
        },
        {
          label: 'Médiane.',
          answer: { kind: 'number', value: 12, tolerance: 0, unit: '' },
          steps: ['La 4ᵉ des 7 valeurs rangées.'],
        },
        {
          label: 'Écart-type (valeur approchée).',
          answer: { kind: 'number', value: 3.18, tolerance: 0.02, unit: '' },
          steps: ['$\\sum x_i^2 = 1\\,228$ ; $V = \\dfrac{1\\,228}{7} - 12{,}86^2 \\approx 10{,}12$.', '$\\sigma \\approx 3{,}18$.'],
        },
      ],
    },
    {
      id: 'stat11-effectifs',
      level: 2,
      title: 'Avec des effectifs',
      statement: 'Nombre d’enfants par famille dans un quartier : 0 enfant (5 familles), 1 (10), 2 (20), 3 (10), 4 (5).',
      parts: [
        {
          label: 'Nombre moyen d’enfants par famille.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$\\dfrac{0 + 10 + 40 + 30 + 20}{50} = \\dfrac{100}{50} = 2$.'],
        },
        {
          label: 'Variance.',
          answer: { kind: 'number', value: 1.2, tolerance: 0.005, unit: '' },
          steps: ['$\\sum n_ix_i^2 = 0 + 10 + 80 + 90 + 80 = 260$ ; $V = \\dfrac{260}{50} - 4 = 1{,}2$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La médiane de 3 ; 7 ; 9 ; 20 est :',
      choices: ['8', '9', '7', '9,75'],
      answer: 0,
      explanation: 'Nombre pair de valeurs : moyenne des deux valeurs centrales, $\\frac{7 + 9}{2}$.',
    },
    {
      question: 'L’écart-type mesure :',
      choices: ['la dispersion autour de la moyenne', 'la valeur la plus fréquente', 'le milieu de la série', 'le nombre de valeurs'],
      answer: 0,
      explanation: 'Plus il est grand, plus les valeurs sont dispersées.',
    },
    {
      question: 'Le paramètre le moins sensible à une valeur extrême est :',
      choices: ['la médiane', 'la moyenne', 'l’étendue', 'la variance'],
      answer: 0,
      explanation: 'Une note de 0 isolée change la moyenne mais peu la médiane.',
    },
    {
      question: 'Dans un diagramme en boîte, la boîte va de :',
      choices: ['$Q_1$ à $Q_3$', 'du minimum au maximum', 'la moyenne à la médiane', '0 à 20'],
      answer: 0,
      explanation: 'Elle contient environ la moitié centrale des données.',
    },
  ],
  applications: [
    {
      title: 'La pluie à Sikasso',
      tagline: 'Comparer des saisons des pluies',
      situation:
        'Pluies mensuelles (en mm) de mai à octobre d’une année : 60 ; 140 ; 220 ; 300 ; 200 ; 80.',
      model: 'Série de six valeurs.',
      questions: ['Quelle est la pluie mensuelle moyenne, en mm ?', 'Quelle est la médiane ?'],
      check: { value: 166.7, tolerance: 0.01, unit: 'mm' },
      solution: ['Total : 1 000 mm ; moyenne $\\dfrac{1\\,000}{6} \\approx 166{,}7$ mm.', 'Série rangée : 60 ; 80 ; 140 ; 200 ; 220 ; 300 : médiane $\\dfrac{140 + 200}{2} = 170$ mm.'],
    },
  ],
};
