import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une tontine où chaque membre verse 2 000 F de plus que le mois précédent ; un loyer qui augmente de 5 % chaque année ; une plantation de manguiers qui double chaque saison. Pour suivre ces grandeurs mois après mois ou année après année, on les numérote : $u_0, u_1, u_2…$ C’est une **suite numérique**.',
  objectives: [
    'calculer les termes d’une suite définie explicitement ou par récurrence ;',
    'reconnaître une suite arithmétique ou géométrique et utiliser son terme général ;',
    'calculer la somme de termes consécutifs ;',
    'étudier le sens de variation d’une suite.',
  ],
  sections: [
    {
      title: 'Deux façons de définir une suite',
      blocks: [
        {
          kind: 'list',
          items: [
            '**explicitement** : $u_n = f(n)$, par exemple $u_n = 3n + 2$ ;',
            '**par récurrence** : on donne le premier terme et une relation entre un terme et le suivant, par exemple $u_0 = 1$ et $u_{n+1} = 2u_n + 1$.',
          ],
        },
        {
          kind: 'rule',
          text: 'Une suite est **croissante** si $u_{n+1} \\geq u_n$ pour tout $n$, **décroissante** si $u_{n+1} \\leq u_n$. On étudie le signe de $u_{n+1} - u_n$.',
        },
      ],
    },
    {
      title: 'Suites arithmétiques et géométriques',
      blocks: [
        {
          kind: 'table',
          head: ['', 'Arithmétique', 'Géométrique'],
          rows: [
            ['passage au suivant', 'on **ajoute** la raison $r$', 'on **multiplie** par la raison $q$'],
            ['terme général', '$u_n = u_0 + nr$', '$v_n = v_0\\,q^n$'],
            ['somme de $u_0$ à $u_n$', '$(n + 1)\\dfrac{u_0 + u_n}{2}$', '$v_0\\dfrac{1 - q^{n+1}}{1 - q}$ ($q \\neq 1$)'],
          ],
        },
        {
          kind: 'example',
          title: 'une hausse de 5 % par an',
          text: 'Un loyer de 50 000 F augmente de 5 % chaque année.',
          steps: ['Augmenter de 5 %, c’est multiplier par 1,05 : suite géométrique de raison 1,05.', 'Après 3 ans : $50\\,000 \\times 1{,}05^3 \\approx 57\\,881$ F.'],
        },
        {
          kind: 'trap',
          wrong: '« Une hausse de 5 % par an pendant 3 ans fait une hausse de 15 %. »',
          why: 'Chaque hausse s’applique au nouveau montant : $1{,}05^3 \\approx 1{,}158$, soit 15,8 %.',
          reflex: 'Des pourcentages successifs se multiplient : suite géométrique.',
        },
      ],
    },
  ],
  essentials: [
    'Suite explicite $u_n = f(n)$ ou récurrente $u_{n+1} = g(u_n)$.',
    'Arithmétique : $u_n = u_0 + nr$ ; géométrique : $v_n = v_0q^n$.',
    'Sommes : (nombre de termes) × (premier + dernier) / 2 ; $v_0\\frac{1 - q^{n+1}}{1 - q}$.',
    'Variations : signe de $u_{n+1} - u_n$.',
  ],
  exercises: [
    {
      id: 'su11-tontine',
      level: 1,
      title: 'La tontine',
      statement: 'Dans une tontine, le premier mois on verse 5 000 F, puis 2 000 F de plus chaque mois.',
      parts: [
        {
          label: 'Combien verse-t-on le 12ᵉ mois (en F) ?',
          answer: { kind: 'number', value: 27000, tolerance: 0, unit: 'F' },
          steps: ['Suite arithmétique, $u_1 = 5\\,000$, $r = 2\\,000$ : $u_{12} = 5\\,000 + 11 \\times 2\\,000 = 27\\,000$ F.'],
        },
        {
          label: 'Total versé sur les 12 mois (en F).',
          answer: { kind: 'number', value: 192000, tolerance: 0, unit: 'F' },
          steps: ['$12 \\times \\dfrac{5\\,000 + 27\\,000}{2} = 192\\,000$ F.'],
        },
      ],
    },
    {
      id: 'su11-recurrence',
      level: 2,
      title: 'Une suite récurrente',
      statement: '$u_0 = 1$ et $u_{n+1} = 2u_n + 1$.',
      parts: [
        {
          label: 'Calcule $u_3$.',
          answer: { kind: 'number', value: 15, tolerance: 0, unit: '' },
          steps: ['$u_1 = 3$, $u_2 = 7$, $u_3 = 15$.'],
        },
        {
          label: 'On pose $v_n = u_n + 1$. Quelle est la raison de la suite géométrique $(v_n)$ ?',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$v_{n+1} = 2u_n + 2 = 2(u_n + 1) = 2v_n$.', 'Donc $v_n = 2^{n+1}$ et $u_n = 2^{n+1} - 1$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La suite $u_n = 7 - 2n$ est :',
      choices: ['arithmétique de raison −2', 'géométrique de raison −2', 'arithmétique de raison 7', 'constante'],
      answer: 0,
      explanation: '$u_{n+1} - u_n = -2$.',
    },
    {
      question: 'Le terme $v_4$ d’une suite géométrique de premier terme $v_0 = 3$ et de raison 2 vaut :',
      choices: ['48', '11', '24', '96'],
      answer: 0,
      explanation: '$3 \\times 2^4$.',
    },
    {
      question: '$1 + 2 + 3 + \\dots + 100$ vaut :',
      choices: ['5 050', '10 000', '5 000', '10 100'],
      answer: 0,
      explanation: '$100 \\times \\dfrac{1 + 100}{2}$.',
    },
    {
      question: 'Une suite géométrique de raison 0,5 et de premier terme positif est :',
      choices: ['décroissante', 'croissante', 'constante', 'alternée'],
      answer: 0,
      explanation: 'Chaque terme est la moitié du précédent.',
    },
  ],
  applications: [
    {
      title: 'Le loyer de la boutique',
      tagline: 'Que paiera le commerçant dans 3 ans ?',
      situation: 'Le loyer mensuel d’une boutique au marché est de 50 000 F ; le propriétaire l’augmente de 5 % chaque année.',
      model: 'Suite géométrique de raison 1,05.',
      questions: ['Quel sera le loyer mensuel dans 3 ans ?'],
      check: { value: 57881, tolerance: 0.01, unit: 'F' },
      solution: ['$50\\,000 \\times 1{,}05^3 \\approx 57\\,881$ F.'],
    },
  ],
};
