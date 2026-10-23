import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un paysan sème 10 graines de mil dont chacune germe 9 fois sur 10 : quelle chance a-t-il que toutes lèvent ? Combien de codes différents peut-on former pour un téléphone ? Un test médical positif signifie-t-il qu’on est malade ? Pour répondre sans se tromper, il faut savoir **compter** les cas et **calculer des probabilités**.',
  objectives: [
    'dénombrer avec les listes, les arrangements, les permutations et les combinaisons ;',
    'calculer une probabilité dans une situation d’équiprobabilité ;',
    'utiliser les probabilités conditionnelles et la formule des probabilités totales ;',
    'étudier une variable aléatoire (loi, espérance, variance) et la loi binomiale.',
  ],
  sections: [
    {
      title: 'Dénombrer',
      blocks: [
        {
          kind: 'table',
          head: ['On choisit $p$ éléments parmi $n$…', 'Nombre de choix'],
          rows: [
            ['avec ordre et répétitions (p-listes)', '$n^p$'],
            ['avec ordre, sans répétition (arrangements)', '$A_n^p = \\dfrac{n!}{(n - p)!}$'],
            ['tous les $n$, dans un ordre (permutations)', '$n!$'],
            ['sans ordre, sans répétition (combinaisons)', '$C_n^p = \\dbinom{n}{p} = \\dfrac{n!}{p!\\,(n - p)!}$'],
          ],
        },
        {
          kind: 'example',
          title: 'trois situations',
          text: 'On compte des choix possibles.',
          steps: ['Codes à 4 chiffres : $10^4 = 10\\,000$.', 'Président, trésorier et secrétaire parmi 10 élèves : $A_{10}^3 = 10 \\times 9 \\times 8 = 720$.', 'Délégation de 3 élèves parmi 10 : $C_{10}^3 = \\dfrac{720}{3!} = 120$.'],
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: 'Deux questions à se poser : l’**ordre** compte-t-il ? Un élément peut-il être **répété** ? Un tirage « simultané » est sans ordre (combinaisons) ; « successif avec remise », avec ordre et répétitions.',
            },
          ],
        },
      ],
    },
    {
      title: 'Probabilités et probabilités conditionnelles',
      blocks: [
        {
          kind: 'formula',
          label: 'Équiprobabilité',
          tex: 'P(A) = \\dfrac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}} \\qquad P(\\bar{A}) = 1 - P(A) \\qquad P(A \\cup B) = P(A) + P(B) - P(A \\cap B)',
        },
        {
          kind: 'formula',
          label: 'Probabilité de $B$ sachant $A$',
          tex: 'P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} \\qquad P(A \\cap B) = P(A)\\,P_A(B)',
        },
        {
          kind: 'rule',
          text: '**Probabilités totales** : si $A_1, \\dots, A_k$ partagent l’univers, $P(B) = P(A_1 \\cap B) + \\dots + P(A_k \\cap B)$. Sur un arbre : on multiplie le long d’un chemin, on additionne les chemins.',
        },
        {
          kind: 'definition',
          term: 'Événements indépendants',
          text: '$A$ et $B$ sont indépendants si $P(A \\cap B) = P(A)\\,P(B)$ : savoir que $A$ est réalisé ne change pas la probabilité de $B$.',
        },
      ],
    },
    {
      title: 'Variables aléatoires et loi binomiale',
      blocks: [
        {
          kind: 'formula',
          label: 'Espérance, variance, écart-type',
          tex: 'E(X) = \\sum x_i\\,p_i \\qquad V(X) = \\sum x_i^2\\,p_i - E(X)^2 \\qquad \\sigma(X) = \\sqrt{V(X)}',
        },
        {
          kind: 'definition',
          term: 'Loi binomiale $\\mathcal{B}(n, p)$',
          text: 'loi du nombre $X$ de succès quand on répète $n$ fois, de façon indépendante, une épreuve qui réussit avec la probabilité $p$.',
        },
        {
          kind: 'formula',
          tex: 'P(X = k) = \\dbinom{n}{k}p^k(1 - p)^{n-k} \\qquad E(X) = np \\qquad V(X) = np(1 - p)',
        },
        {
          kind: 'trap',
          wrong: '« La probabilité d’au moins un succès en 3 essais à $p = 0{,}2$ vaut $3 \\times 0{,}2 = 0{,}6$. »',
          why: 'On compte plusieurs fois les cas où il y a deux ou trois succès.',
          reflex: 'Passer par le contraire : $P(X \\geq 1) = 1 - P(X = 0) = 1 - 0{,}8^3 = 0{,}488$.',
        },
      ],
    },
  ],
  essentials: [
    '$n^p$ (ordre, répétitions) ; $A_n^p$ (ordre, sans répétition) ; $n!$ ; $C_n^p$ (sans ordre).',
    '$P_A(B) = \\frac{P(A \\cap B)}{P(A)}$ ; arbre : multiplier sur un chemin, additionner les chemins.',
    'Indépendance : $P(A \\cap B) = P(A)P(B)$.',
    'Binomiale : $P(X = k) = C_n^kp^k(1 - p)^{n-k}$ ; $E = np$ ; $V = np(1 - p)$.',
  ],
  exercises: [
    {
      id: 'proba-denombrement',
      level: 1,
      title: 'Compter',
      statement: 'Une classe compte 10 élèves.',
      parts: [
        {
          label: 'Combien de délégations de 3 élèves peut-on former ?',
          answer: { kind: 'number', value: 120, tolerance: 0, unit: '' },
          steps: ['Sans ordre : $C_{10}^3 = \\dfrac{10 \\times 9 \\times 8}{6} = 120$.'],
        },
        {
          label: 'Combien de façons de choisir un président, un trésorier et un secrétaire ?',
          answer: { kind: 'number', value: 720, tolerance: 0, unit: '' },
          steps: ['Avec ordre : $A_{10}^3 = 720$.'],
        },
      ],
    },
    {
      id: 'proba-urne',
      level: 2,
      title: 'Tirage dans une urne',
      statement: 'Une urne contient 3 boules rouges et 5 blanches. On tire simultanément 2 boules.',
      parts: [
        {
          label: 'Combien y a-t-il de tirages possibles ?',
          answer: { kind: 'number', value: 28, tolerance: 0, unit: '' },
          steps: ['$C_8^2 = 28$.'],
        },
        {
          label: 'Probabilité de tirer 2 boules rouges (valeur approchée).',
          answer: { kind: 'number', value: 0.1071, tolerance: 0.002, unit: '' },
          steps: ['$\\dfrac{C_3^2}{C_8^2} = \\dfrac{3}{28} \\approx 0{,}107$.'],
        },
        {
          label: 'Probabilité de tirer au moins une boule rouge (valeur approchée).',
          answer: { kind: 'number', value: 0.6429, tolerance: 0.002, unit: '' },
          steps: ['Contraire : 2 blanches, $\\dfrac{C_5^2}{28} = \\dfrac{10}{28}$.', '$1 - \\dfrac{10}{28} = \\dfrac{18}{28} \\approx 0{,}643$.'],
        },
      ],
    },
    {
      id: 'proba-binomiale',
      level: 3,
      title: 'Une loi binomiale',
      statement: 'Un tireur atteint la cible avec la probabilité 0,2 à chaque tir, indépendamment. Il tire 5 fois ; $X$ est le nombre de tirs réussis.',
      parts: [
        {
          label: 'Calcule $P(X = 2)$.',
          answer: { kind: 'number', value: 0.2048, tolerance: 0.001, unit: '' },
          steps: ['$X$ suit $\\mathcal{B}(5\\,;0{,}2)$.', '$P(X = 2) = C_5^2 \\times 0{,}2^2 \\times 0{,}8^3 = 10 \\times 0{,}04 \\times 0{,}512 = 0{,}2048$.'],
        },
        {
          label: 'Calcule $P(X \\geq 1)$ (valeur approchée).',
          answer: { kind: 'number', value: 0.6723, tolerance: 0.001, unit: '' },
          steps: ['$1 - P(X = 0) = 1 - 0{,}8^5 = 1 - 0{,}32768 \\approx 0{,}672$.'],
        },
        {
          label: 'Calcule l’espérance de $X$.',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$E(X) = np = 5 \\times 0{,}2 = 1$ : en moyenne, un tir réussi sur cinq.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$C_5^2$ vaut :',
      choices: ['10', '20', '25', '5'],
      answer: 0,
      explanation: '$\\dfrac{5 \\times 4}{2} = 10$.',
    },
    {
      question: 'On lance deux fois une pièce équilibrée. La probabilité d’obtenir deux fois « pile » est :',
      choices: ['$\\dfrac{1}{4}$', '$\\dfrac{1}{2}$', '$\\dfrac{1}{3}$', '1'],
      answer: 0,
      explanation: 'Lancers indépendants : $\\dfrac{1}{2} \\times \\dfrac{1}{2}$.',
    },
    {
      question: 'Si $P(A) = 0{,}5$, $P(B) = 0{,}4$ et $P(A \\cap B) = 0{,}2$, alors $A$ et $B$ sont :',
      choices: ['indépendants', 'incompatibles', 'contraires', 'égaux'],
      answer: 0,
      explanation: '$P(A)P(B) = 0{,}2 = P(A \\cap B)$.',
    },
    {
      question: 'L’espérance d’une loi $\\mathcal{B}(20\\,;0{,}3)$ vaut :',
      choices: ['6', '0,3', '20', '4,2'],
      answer: 0,
      explanation: '$np = 20 \\times 0{,}3 = 6$ ; 4,2 est la variance.',
    },
  ],
  applications: [
    {
      title: 'Les semences de mil',
      tagline: 'Toutes les graines vont-elles germer ?',
      situation:
        'Un paysan sème 10 graines de mil améliorées. D’après le fournisseur, chaque graine germe avec la probabilité 0,9, indépendamment des autres.',
      model: 'Le nombre de graines qui germent suit la loi binomiale $\\mathcal{B}(10\\,;0{,}9)$.',
      questions: ['Quelle est la probabilité que les 10 graines germent ?', 'Combien de graines germent en moyenne ?'],
      check: { value: 0.3487, tolerance: 0.01, unit: '' },
      solution: ['$P(X = 10) = 0{,}9^{10} \\approx 0{,}349$ : même avec de bonnes semences, il y a environ 65 % de chances qu’au moins une ne lève pas.', '$E(X) = 10 \\times 0{,}9 = 9$ graines en moyenne.'],
      fact: 'C’est pourquoi les paysans sèment souvent plusieurs graines par poquet, puis éclaircissent après la levée.',
    },
  ],
};
