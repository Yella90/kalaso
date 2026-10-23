import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le prix d’un trajet en taxi dépend de la distance, la température de l’après-midi dépend de l’heure, l’aire d’un champ carré dépend de son côté. Chaque fois, une grandeur dépend d’une autre : c’est une **fonction**. Savoir la lire et l’étudier permet de prévoir.',
  objectives: [
    'calculer une image et chercher un antécédent ;',
    'déterminer l’ensemble de définition d’une fonction ;',
    'lire et dresser un tableau de variation ;',
    'connaître les fonctions de référence.',
  ],
  sections: [
    {
      title: 'Image, antécédent, ensemble de définition',
      blocks: [
        {
          kind: 'definition',
          term: 'Fonction',
          text: 'procédé qui, à chaque réel $x$ d’un ensemble $D_f$, associe un unique réel $f(x)$, appelé **image** de $x$. Si $f(x) = y$, on dit que $x$ est un **antécédent** de $y$.',
        },
        {
          kind: 'list',
          items: [
            'un quotient n’existe que si le dénominateur est **non nul** ;',
            'une racine carrée n’existe que si ce qui est dessous est **positif ou nul**.',
          ],
        },
        {
          kind: 'example',
          title: 'ensemble de définition',
          text: '$f(x) = \\dfrac{1}{x - 2}$ et $g(x) = \\sqrt{x + 3}$.',
          steps: ['$D_f = \\mathbb R \\setminus \\{2\\}$.', '$x + 3 \\ge 0 \\iff x \\ge -3$, donc $D_g = [-3\\,;\\,+\\infty[$.'],
        },
      ],
    },
    {
      title: 'Sens de variation',
      blocks: [
        {
          kind: 'rule',
          text: '$f$ est **croissante** sur $I$ si, pour tous $a < b$ de $I$, $f(a) \\le f(b)$ ; **décroissante** si $f(a) \\ge f(b)$. Un tableau de variation résume ces informations avec des flèches.',
        },
        {
          kind: 'table',
          head: ['Fonction', 'Variations'],
          rows: [
            ['$x \\mapsto ax + b$', 'croissante si $a > 0$, décroissante si $a < 0$'],
            ['$x \\mapsto x^2$', 'décroissante sur $]-\\infty\\,;\\,0]$, croissante sur $[0\\,;\\,+\\infty[$'],
            ['$x \\mapsto \\dfrac1x$', 'décroissante sur $]-\\infty\\,;\\,0[$ et sur $]0\\,;\\,+\\infty[$'],
            ['$x \\mapsto \\sqrt x$', 'croissante sur $[0\\,;\\,+\\infty[$'],
          ],
        },
        {
          kind: 'definition',
          term: 'Parité',
          text: '$f$ est **paire** si $f(-x) = f(x)$ (courbe symétrique par rapport à l’axe des ordonnées), **impaire** si $f(-x) = -f(x)$ (symétrique par rapport à l’origine).',
        },
      ],
    },
  ],
  essentials: [
    'Image : f(x) ; antécédent : solution de f(x) = y.',
    'Interdits : dénominateur nul, racine d’un négatif.',
    'Croissante : l’ordre est conservé ; décroissante : il est inversé.',
    'Fonctions de référence : affine, carré, inverse, racine carrée.',
  ],
  simulationTasks: [
    'trace une fonction affine et fais varier a : quand est-elle croissante ?',
    'passe au second degré : repère le sommet et les racines quand tu changes a, b et c.',
  ],
  exercises: [
    {
      id: 'fo-image',
      level: 1,
      title: 'Images et antécédents',
      statement: 'Soit $f(x) = x^2 - 4x + 1$.',
      parts: [
        {
          label: 'Image de −2.',
          answer: { kind: 'number', value: 13, tolerance: 0, unit: '' },
          steps: ['$f(-2) = 4 + 8 + 1 = 13$.'],
        },
        {
          label: 'Image de 2.',
          answer: { kind: 'number', value: -3, tolerance: 0, unit: '' },
          steps: ['$f(2) = 4 - 8 + 1 = -3$.'],
        },
      ],
    },
    {
      id: 'fo-taxi',
      level: 2,
      title: 'Le prix du taxi',
      statement: 'Un taxi demande 500 FCFA de prise en charge plus 250 FCFA par kilomètre : $p(x) = 250x + 500$.',
      parts: [
        {
          label: 'Prix d’un trajet de 8 km, en FCFA.',
          answer: { kind: 'number', value: 2500, tolerance: 0, unit: 'FCFA' },
          steps: ['$p(8) = 2\\,000 + 500 = 2\\,500$ FCFA.'],
        },
        {
          label: 'Distance parcourue pour 3 750 FCFA, en km (antécédent).',
          answer: { kind: 'number', value: 13, tolerance: 0.01, unit: 'km' },
          steps: ['$250x + 500 = 3\\,750 \\iff x = \\dfrac{3\\,250}{250} = 13$ km.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’ensemble de définition de $x \\mapsto \\dfrac{3}{x + 1}$ est :',
      choices: ['$\\mathbb R \\setminus \\{-1\\}$', '$\\mathbb R$', '$]-1\\,;\\,+\\infty[$', '$\\mathbb R \\setminus \\{1\\}$'],
      answer: 0,
      explanation: 'Le dénominateur s’annule en −1.',
    },
    {
      question: 'La fonction carré est croissante sur :',
      choices: ['$[0\\,;\\,+\\infty[$', '$\\mathbb R$', '$]-\\infty\\,;\\,0]$', 'aucun intervalle'],
      answer: 0,
      explanation: 'Elle décroît sur les négatifs.',
    },
    {
      question: '$x \\mapsto -3x + 2$ est :',
      choices: ['décroissante', 'croissante', 'constante', 'paire'],
      answer: 0,
      explanation: 'Le coefficient directeur est négatif.',
    },
    {
      question: 'Une fonction paire a une courbe symétrique par rapport :',
      choices: ['à l’axe des ordonnées', 'à l’origine', 'à l’axe des abscisses', 'à la droite y = x'],
      answer: 0,
      explanation: 'f(−x) = f(x).',
    },
  ],
  applications: [
    {
      title: 'Le champ clôturé',
      tagline: 'Le meilleur rectangle avec 100 m de grillage',
      situation:
        'Un maraîcher a 100 m de grillage pour clôturer un jardin rectangulaire. Si un côté mesure $x$ m, l’autre mesure $50 - x$ m et l’aire vaut $A(x) = x(50 - x)$.',
      model: '$A(x) = -x^2 + 50x$ est maximale au sommet de la parabole, en $x = 25$.',
      questions: ['Quelle est l’aire maximale, en m² ?', 'Quelle forme a alors le jardin ?'],
      check: { value: 625, tolerance: 0.01, unit: 'm²' },
      solution: ['$A(25) = 25 \\times 25 = 625$ m².', 'Un carré de 25 m de côté : à périmètre égal, le carré est le rectangle d’aire maximale.'],
      fact: 'Ce type de problème, « trouver le meilleur », s’appelle un problème d’optimisation.',
    },
  ],
};
