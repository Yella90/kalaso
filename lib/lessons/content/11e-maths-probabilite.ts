import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au jeu de ludo, faut-il un 6 pour sortir un pion ? Quelle chance a-t-on d’obtenir au moins un 6 en lançant deux dés ? Pour la tombola de la kermesse, vaut-il mieux acheter deux billets ? Les **probabilités** mesurent les chances qu’un événement se produise, par un nombre entre 0 et 1.',
  objectives: [
    'décrire une expérience aléatoire, son univers et ses événements ;',
    'calculer une probabilité dans une situation d’équiprobabilité ;',
    'utiliser l’événement contraire ;',
    'calculer la probabilité d’une réunion d’événements.',
  ],
  sections: [
    {
      title: 'Vocabulaire',
      blocks: [
        {
          kind: 'list',
          items: [
            'une **expérience aléatoire** a plusieurs résultats possibles, qu’on ne peut prévoir avec certitude ;',
            'l’**univers** $\\Omega$ est l’ensemble des résultats (ou issues) ;',
            'un **événement** est une partie de l’univers ; $A \\cap B$ (« A et B »), $A \\cup B$ (« A ou B »), $\\bar{A}$ (contraire de A) ;',
            'deux événements sont **incompatibles** s’ils ne peuvent pas se produire en même temps.',
          ],
        },
        {
          kind: 'formula',
          label: 'Équiprobabilité',
          tex: 'P(A) = \\dfrac{\\text{nombre d’issues favorables à } A}{\\text{nombre d’issues possibles}}',
        },
      ],
    },
    {
      title: 'Règles de calcul',
      blocks: [
        {
          kind: 'formula',
          tex: 'P(\\bar{A}) = 1 - P(A) \\qquad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
          legend: ['si $A$ et $B$ sont incompatibles : $P(A \\cup B) = P(A) + P(B)$'],
        },
        {
          kind: 'example',
          title: 'deux dés',
          text: 'On lance deux dés équilibrés : $6 \\times 6 = 36$ issues équiprobables.',
          steps: ['Somme égale à 7 : (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), soit $\\dfrac{6}{36} = \\dfrac{1}{6}$.', 'Au moins un 6 : contraire « aucun 6 », $\\dfrac{25}{36}$ ; donc $1 - \\dfrac{25}{36} = \\dfrac{11}{36} \\approx 0{,}31$.'],
        },
        {
          kind: 'trap',
          wrong: '« La probabilité d’au moins un 6 avec deux dés vaut $\\frac{1}{6} + \\frac{1}{6} = \\frac{1}{3}$. »',
          why: 'Les deux événements « 6 sur le premier dé » et « 6 sur le second » ne sont pas incompatibles : le double 6 est compté deux fois.',
          reflex: 'Pour « au moins un », passer par l’événement contraire.',
        },
      ],
    },
  ],
  essentials: [
    'Univers, événements, issues ; $0 \\leq P(A) \\leq 1$.',
    'Équiprobabilité : favorables / possibles.',
    '$P(\\bar{A}) = 1 - P(A)$ ; $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.',
    '« Au moins un » : passer par le contraire.',
  ],
  exercises: [
    {
      id: 'prob-des',
      level: 1,
      title: 'Deux dés',
      statement: 'On lance deux dés équilibrés à six faces.',
      parts: [
        {
          label: 'Probabilité que la somme vaille 7 (valeur approchée).',
          answer: { kind: 'number', value: 0.1667, tolerance: 0.002, unit: '' },
          steps: ['6 issues favorables sur 36 : $\\dfrac{1}{6}$.'],
        },
        {
          label: 'Probabilité d’obtenir au moins un 6 (valeur approchée).',
          answer: { kind: 'number', value: 0.3056, tolerance: 0.002, unit: '' },
          steps: ['$1 - \\dfrac{25}{36} = \\dfrac{11}{36}$.'],
        },
      ],
    },
    {
      id: 'prob-cartes',
      level: 2,
      title: 'Un jeu de 32 cartes',
      statement: 'On tire une carte au hasard dans un jeu de 32 cartes (4 couleurs de 8 cartes : 7, 8, 9, 10, valet, dame, roi, as).',
      parts: [
        {
          label: 'Probabilité de tirer un as.',
          answer: { kind: 'number', value: 0.125, tolerance: 0.001, unit: '' },
          steps: ['$\\dfrac{4}{32} = 0{,}125$.'],
        },
        {
          label: 'Probabilité de tirer un as ou un cœur.',
          answer: { kind: 'number', value: 0.34375, tolerance: 0.001, unit: '' },
          steps: ['$P(\\text{as}) + P(\\text{cœur}) - P(\\text{as de cœur}) = \\dfrac{4 + 8 - 1}{32} = \\dfrac{11}{32}$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Si $P(A) = 0{,}3$, alors $P(\\bar{A})$ vaut :',
      choices: ['0,7', '0,3', '1,3', '0'],
      answer: 0,
      explanation: '$1 - 0{,}3$.',
    },
    {
      question: 'Deux événements incompatibles :',
      choices: ['ne peuvent pas se produire en même temps', 'ont la même probabilité', 'sont contraires', 'ont une probabilité nulle'],
      answer: 0,
      explanation: '$A \\cap B = \\emptyset$.',
    },
    {
      question: 'Avec une pièce équilibrée lancée deux fois, $P(\\text{deux piles})$ vaut :',
      choices: ['$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$', '$\\dfrac{1}{3}$', '1'],
      answer: 0,
      explanation: '4 issues équiprobables : PP, PF, FP, FF.',
    },
    {
      question: 'Une probabilité peut valoir :',
      choices: ['0,85', '−0,2', '1,5', '3'],
      answer: 0,
      explanation: 'Elle est toujours entre 0 et 1.',
    },
  ],
  applications: [
    {
      title: 'La tombola de la kermesse',
      tagline: 'Deux billets doublent-ils vraiment les chances ?',
      situation:
        'À la kermesse du lycée, 500 billets sont vendus et 10 d’entre eux sont gagnants, tirés au hasard. Awa achète 2 billets.',
      model: 'Tous les choix de 2 billets parmi 500 sont équiprobables.',
      questions: ['Quelle est la probabilité qu’Awa gagne au moins un lot ?'],
      check: { value: 0.0396, tolerance: 0.02, unit: '' },
      solution: ['Contraire : ses 2 billets sont parmi les 490 perdants : $\\dfrac{C_{490}^2}{C_{500}^2} = \\dfrac{490 \\times 489}{500 \\times 499} \\approx 0{,}9604$.', '$P \\approx 1 - 0{,}9604 = 0{,}0396$, soit environ 4 % (contre 2 % avec un seul billet).'],
    },
  ],
};
