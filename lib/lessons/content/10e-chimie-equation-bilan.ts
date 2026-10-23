import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Quand le charbon de bois brûle dans le fourneau, il disparaît presque entièrement. Pourtant, rien ne se perd : les atomes de carbone partent dans l’air sous forme de dioxyde de carbone. Une **équation-bilan** décrit ce qui se transforme et en quelles proportions ; elle permet de prévoir combien de produit on obtient, et quel réactif s’épuisera le premier.',
  objectives: [
    'écrire et équilibrer une équation-bilan ;',
    'interpréter les coefficients en quantités de matière ;',
    'dresser un tableau d’avancement et trouver le réactif limitant ;',
    'calculer les masses de réactifs et de produits.',
  ],
  sections: [
    {
      title: 'Écrire et équilibrer',
      blocks: [
        {
          kind: 'rule',
          text: 'Au cours d’une réaction chimique, les atomes se réarrangent : chaque **élément** et la **charge électrique** se conservent. On équilibre l’équation en plaçant des coefficients devant les formules, jamais en modifiant les formules.',
        },
        {
          kind: 'example',
          title: 'la combustion du méthane',
          text: '$\\ce{CH4 + O2 -> CO2 + H2O}$, à équilibrer.',
          steps: ['Carbone : 1 de chaque côté.', 'Hydrogène : 4 à gauche, donc $\\ce{2H2O}$ à droite.', 'Oxygène : $2 + 2 = 4$ à droite, donc $\\ce{2O2}$ à gauche.', '$\\ce{CH4 + 2O2 -> CO2 + 2H2O}$.'],
        },
        {
          kind: 'rule',
          text: 'Les coefficients donnent les proportions en **moles** : 1 mol de méthane réagit avec 2 mol de dioxygène et donne 1 mol de dioxyde de carbone et 2 mol d’eau.',
        },
      ],
    },
    {
      title: 'Avancement et réactif limitant',
      blocks: [
        {
          kind: 'text',
          text: 'L’**avancement** $x$ (en mol) mesure le progrès de la réaction. Pour $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$, à l’avancement $x$, il a disparu $x$ mol de méthane et $2x$ mol de dioxygène, et il est apparu $x$ mol de $\\ce{CO2}$ et $2x$ mol d’eau.',
        },
        {
          kind: 'table',
          head: ['', '$\\ce{CH4}$', '$\\ce{O2}$', '$\\ce{CO2}$', '$\\ce{H2O}$'],
          rows: [
            ['état initial', '1,0', '1,5', '0', '0'],
            ['en cours', '$1{,}0 - x$', '$1{,}5 - 2x$', '$x$', '$2x$'],
            ['état final ($x_{max} = 0{,}75$)', '0,25', '0', '0,75', '1,5'],
          ],
        },
        {
          kind: 'rule',
          text: 'Le **réactif limitant** est celui qui disparaît le premier : il fixe l’avancement maximal $x_{max}$, plus petite des valeurs qui annulent chaque réactif. Ici : $1{,}0 - x = 0$ donne 1,0 ; $1{,}5 - 2x = 0$ donne 0,75. Le dioxygène est limitant.',
        },
        {
          kind: 'trap',
          wrong: '« Le réactif limitant est celui dont on a le moins de moles. »',
          why: 'Il faut tenir compte des coefficients : on a plus de dioxygène (1,5 mol) que de méthane (1,0 mol), mais il en faut deux fois plus.',
          reflex: 'Comparer $\\frac{n}{\\text{coefficient}}$ pour chaque réactif.',
        },
      ],
    },
  ],
  essentials: [
    'Conservation des éléments et des charges ; on équilibre avec des coefficients.',
    'Les coefficients donnent les proportions en moles.',
    'Tableau d’avancement ; $x_{max}$ = plus petite valeur qui annule un réactif.',
    'Réactif limitant : le plus petit rapport $\\frac{n}{\\text{coefficient}}$.',
  ],
  exercises: [
    {
      id: 'eqb-equilibrer',
      level: 1,
      title: 'Équilibrer',
      statement: 'Équilibre $\\ce{Fe + O2 -> Fe3O4}$ (combustion du fer) et $\\ce{Al + O2 -> Al2O3}$.',
      parts: [
        {
          label: 'Coefficient de $\\ce{O2}$ dans la première équation (avec 1 devant $\\ce{Fe3O4}$).',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$\\ce{3Fe + 2O2 -> Fe3O4}$.'],
        },
        {
          label: 'Coefficient de $\\ce{Al}$ dans la seconde équation (coefficients entiers les plus petits).',
          answer: { kind: 'number', value: 4, tolerance: 0, unit: '' },
          steps: ['$\\ce{4Al + 3O2 -> 2Al2O3}$.'],
        },
      ],
    },
    {
      id: 'eqb-limitant',
      level: 2,
      title: 'Réactif limitant',
      statement: 'On fait brûler 16 g de méthane avec 48 g de dioxygène : $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$.',
      parts: [
        {
          label: 'Avancement maximal (en mol).',
          answer: { kind: 'number', value: 0.75, tolerance: 0.005, unit: 'mol' },
          steps: ['$n(\\ce{CH4}) = 1{,}0$ mol ; $n(\\ce{O2}) = 1{,}5$ mol.', '$x_{max} = \\min(1{,}0\\,;\\dfrac{1{,}5}{2}) = 0{,}75$ mol : le dioxygène est limitant.'],
        },
        {
          label: 'Masse de dioxyde de carbone formée (en g).',
          answer: { kind: 'number', value: 33, tolerance: 0.1, unit: 'g' },
          steps: ['$0{,}75 \\times 44 = 33$ g.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Lors d’une réaction chimique, ce qui se conserve :',
      choices: ['les éléments chimiques et la masse totale', 'les molécules', 'le nombre de moles total', 'le volume'],
      answer: 0,
      explanation: 'Les atomes se réarrangent sans disparaître (Lavoisier).',
    },
    {
      question: 'Dans $\\ce{2H2 + O2 -> 2H2O}$, 4 mol de dihydrogène réagissent avec :',
      choices: ['2 mol de dioxygène', '4 mol', '1 mol', '8 mol'],
      answer: 0,
      explanation: 'Proportions 2 pour 1.',
    },
    {
      question: 'Pour équilibrer une équation, on peut :',
      choices: ['changer les coefficients', 'changer les formules', 'ajouter des atomes', 'supprimer un produit'],
      answer: 0,
      explanation: 'Les formules des espèces ne se modifient jamais.',
    },
    {
      question: 'Le réactif limitant est :',
      choices: ['celui qui est entièrement consommé en premier', 'celui dont la masse est la plus petite', 'un produit', 'toujours le dioxygène'],
      answer: 0,
      explanation: 'Il arrête la réaction.',
    },
  ],
  applications: [
    {
      title: 'Le charbon du fourneau',
      tagline: 'Que devient le charbon de bois qui brûle ?',
      situation:
        'Une famille brûle 1,2 kg de charbon de bois par jour, que l’on assimile à du carbone pur : $\\ce{C + O2 -> CO2}$.',
      model: 'Combustion complète du carbone.',
      questions: ['Quelle masse de dioxyde de carbone est rejetée par jour, en kg ?'],
      check: { value: 4.4, tolerance: 0.02, unit: 'kg' },
      solution: ['$n(\\ce{C}) = \\dfrac{1\\,200}{12} = 100$ mol, qui donnent 100 mol de $\\ce{CO2}$.', '$m = 100 \\times 44 = 4\\,400$ g = 4,4 kg : bien plus que la masse de charbon, car le dioxygène de l’air s’y ajoute.'],
      fact: 'La fabrication du charbon de bois consomme beaucoup d’arbres : les foyers améliorés et le gaz réduisent la déforestation.',
    },
  ],
};
