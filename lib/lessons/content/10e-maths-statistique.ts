import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Quelle classe a le mieux réussi au DEF ? Combien de pluie tombe en moyenne à Kayes en août ? Les statistiques résument une longue liste de données en quelques nombres — la moyenne, la médiane, l’étendue — et en un graphique.',
  objectives: [
    'organiser des données en tableau d’effectifs et de fréquences ;',
    'calculer une moyenne, une médiane et un mode ;',
    'calculer une étendue et un écart type ;',
    'choisir et lire un graphique adapté.',
  ],
  sections: [
    {
      title: 'Effectifs et fréquences',
      blocks: [
        {
          kind: 'formula',
          tex: 'f_i = \\dfrac{n_i}{N}',
          legend: ['fréquence de la valeur $x_i$ : son effectif $n_i$ divisé par l’effectif total $N$'],
        },
        {
          kind: 'text',
          text: 'Pour des données nombreuses et continues (tailles, masses), on les regroupe en **classes** $[a\\,;\\,b[$ et on représente un **histogramme**. Les effectifs cumulés permettent de lire la médiane.',
        },
      ],
    },
    {
      title: 'Paramètres de position et de dispersion',
      blocks: [
        {
          kind: 'formula',
          tex: '\\bar x = \\dfrac{n_1 x_1 + n_2 x_2 + \\dots + n_p x_p}{N}',
        },
        {
          kind: 'list',
          items: [
            '**médiane** : valeur qui partage la série ordonnée en deux moitiés de même effectif ;',
            '**mode** : valeur la plus fréquente ;',
            '**étendue** : plus grande valeur moins plus petite valeur ;',
            '**variance et écart type** : $V = \\dfrac{1}{N}\\sum n_i (x_i - \\bar x)^2$, $\\sigma = \\sqrt V$ ; plus l’écart type est grand, plus les valeurs sont dispersées.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« La moyenne représente toujours bien la série. »',
          why: 'Une seule valeur extrême la déplace beaucoup, alors que la médiane ne bouge presque pas.',
          reflex: 'Avec des valeurs extrêmes, regarde aussi la médiane.',
        },
      ],
    },
  ],
  essentials: [
    'Fréquence = effectif ÷ effectif total.',
    'Moyenne pondérée par les effectifs ; médiane : milieu de la série ordonnée.',
    'Étendue = max − min ; écart type = √variance.',
    'La médiane résiste aux valeurs extrêmes, pas la moyenne.',
  ],
  exercises: [
    {
      id: 'st-notes',
      level: 1,
      title: 'Les notes du devoir',
      statement: 'Notes de 9 élèves : 8, 12, 10, 15, 9, 12, 14, 11, 7.',
      parts: [
        {
          label: 'Moyenne de la série (arrondie au dixième).',
          answer: { kind: 'number', value: 10.9, tolerance: 0.05, unit: '' },
          steps: ['Somme : 98 ; $\\dfrac{98}{9} \\approx 10{,}9$.'],
        },
        {
          label: 'Médiane.',
          answer: { kind: 'number', value: 11, tolerance: 0, unit: '' },
          steps: ['Série ordonnée : 7, 8, 9, 10, **11**, 12, 12, 14, 15 ; la 5e valeur est 11.'],
        },
        {
          label: 'Étendue.',
          answer: { kind: 'number', value: 8, tolerance: 0, unit: '' },
          steps: ['$15 - 7 = 8$.'],
        },
      ],
    },
    {
      id: 'st-ecart',
      level: 2,
      title: 'Un écart type',
      statement: 'Série : 4, 6, 8, 10, 12.',
      parts: [
        {
          label: 'Variance.',
          answer: { kind: 'number', value: 8, tolerance: 0.01, unit: '' },
          steps: ['$\\bar x = 8$ ; écarts au carré : 16, 4, 0, 4, 16 ; somme 40 ; $V = \\dfrac{40}{5} = 8$.'],
        },
        {
          label: 'Écart type (arrondi au centième).',
          answer: { kind: 'number', value: 2.83, tolerance: 0.01, unit: '' },
          steps: ['$\\sigma = \\sqrt8 \\approx 2{,}83$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans la série 2, 3, 3, 5, 9, le mode est :',
      choices: ['3', '5', '4,4', '9'],
      answer: 0,
      explanation: '3 apparaît deux fois.',
    },
    {
      question: 'La moyenne de 2, 3, 3, 5, 9 est :',
      choices: ['4,4', '3', '5', '22'],
      answer: 0,
      explanation: '22 ÷ 5 = 4,4.',
    },
    {
      question: 'Si on remplace la plus grande valeur 9 par 90 :',
      choices: ['la moyenne change beaucoup, la médiane non', 'les deux changent beaucoup', 'aucune ne change', 'la médiane change beaucoup, la moyenne non'],
      answer: 0,
      explanation: 'La médiane reste 3 ; la moyenne passe à 20,6.',
    },
    {
      question: 'Un écart type nul signifie que :',
      choices: ['toutes les valeurs sont égales', 'la moyenne est nulle', 'la série est vide', 'les valeurs sont très dispersées'],
      answer: 0,
      explanation: 'Il n’y a aucun écart à la moyenne.',
    },
  ],
  applications: [
    {
      title: 'La pluie de l’hivernage à Kayes',
      tagline: 'Comparer deux saisons',
      situation:
        'Pluie mensuelle à Kayes (en mm), de juin à octobre : année 1 : 80, 160, 220, 140, 40 ; année 2 : 30, 190, 330, 90, 20.',
      model: 'Comparer la moyenne (quantité) et l’étendue ou l’écart type (régularité).',
      questions: ['Quelle est la pluie moyenne mensuelle de l’année 1, en mm ?', 'Quelle année a eu les pluies les plus irrégulières ?'],
      check: { value: 128, tolerance: 0.01, unit: 'mm' },
      solution: ['Année 1 : $\\dfrac{640}{5} = 128$ mm ; année 2 : $\\dfrac{660}{5} = 132$ mm.', 'Étendues : 180 mm et 310 mm : l’année 2 est bien plus irrégulière, ce qui est risqué pour les semis malgré une moyenne voisine.'],
      fact: 'Les agronomes conseillent les semis d’après la régularité des pluies autant que d’après leur total.',
    },
  ],
};
