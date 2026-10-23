import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'La solution de réhydratation orale (SRO) qui sauve les enfants de la diarrhée doit être préparée avec précision : trop salée, elle aggrave la déshydratation ; pas assez, elle est inefficace. Le sérum, le thé sucré, l’eau de javel diluée : tous sont des **solutions**, et leur effet dépend de leur **concentration**.',
  objectives: [
    'identifier soluté, solvant et solution ;',
    'calculer une concentration molaire et une concentration massique ;',
    'passer de l’une à l’autre avec la masse molaire ;',
    'préparer une solution par dissolution et par dilution.',
  ],
  sections: [
    {
      title: 'Solutions et concentrations',
      blocks: [
        {
          kind: 'definition',
          term: 'Solution',
          text: 'mélange homogène obtenu en dissolvant un **soluté** (solide, liquide ou gaz) dans un **solvant**. Si le solvant est l’eau, c’est une solution **aqueuse**.',
        },
        {
          kind: 'formula',
          tex: 'C = \\dfrac{n}{V} \\qquad C_m = \\dfrac{m}{V} \\qquad C_m = C \\times M',
          legend: ['$C$ : concentration molaire (mol/L) ; $C_m$ : concentration massique (g/L) ; $V$ : volume de la solution (L)'],
        },
        {
          kind: 'text',
          text: 'On ne peut pas dissoudre une quantité illimitée de soluté : au-delà de la **solubilité**, le soluté ne se dissout plus, la solution est **saturée**.',
        },
      ],
    },
    {
      title: 'Préparer une solution',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Par dissolution',
          blocks: [
            {
              kind: 'list',
              items: [
                'calculer la masse à peser : $m = C \\times V \\times M$ ;',
                'peser le soluté, l’introduire dans une fiole jaugée avec un peu d’eau, agiter pour dissoudre ;',
                'compléter avec de l’eau jusqu’au trait de jauge, puis homogénéiser.',
              ],
            },
          ],
        },
        {
          kind: 'formula',
          label: 'Dilution',
          tex: 'C_0\\,V_0 = C_1\\,V_1 \\qquad F = \\dfrac{C_0}{C_1} = \\dfrac{V_1}{V_0}',
          legend: ['la quantité de soluté prélevée ne change pas : elle est seulement répartie dans plus d’eau ; $F$ : facteur de dilution'],
        },
        {
          kind: 'example',
          title: 'diluer 10 fois',
          text: 'On veut 100 mL de solution à 0,020 mol/L à partir d’une solution à 0,20 mol/L.',
          steps: ['$V_0 = \\dfrac{0{,}020 \\times 100}{0{,}20} = 10$ mL : on prélève 10 mL à la pipette, puis on complète à 100 mL en fiole jaugée.'],
        },
        {
          kind: 'trap',
          wrong: '« Pour 1 L de solution, on dissout le soluté dans 1 L d’eau. »',
          why: 'Le volume final serait un peu supérieur à 1 L : la concentration se calcule avec le volume de la **solution**.',
          reflex: 'Dissoudre dans moins d’eau, puis compléter jusqu’au volume voulu.',
        },
      ],
    },
  ],
  essentials: [
    'Soluté + solvant = solution ; saturation au-delà de la solubilité.',
    '$C = \\frac{n}{V}$ (mol/L) ; $C_m = \\frac{m}{V}$ (g/L) ; $C_m = C \\times M$.',
    'Dilution : $C_0V_0 = C_1V_1$ ; facteur de dilution $F = \\frac{C_0}{C_1}$.',
  ],
  exercises: [
    {
      id: 'sol-nacl',
      level: 1,
      title: 'Une solution d’eau salée',
      statement: 'On dissout 5,85 g de chlorure de sodium pour obtenir 500 mL de solution. $M(\\ce{NaCl}) = 58{,}5$ g/mol.',
      parts: [
        {
          label: 'Concentration massique (en g/L).',
          answer: { kind: 'number', value: 11.7, tolerance: 0.05, unit: 'g/L' },
          steps: ['$C_m = \\dfrac{5{,}85}{0{,}500} = 11{,}7$ g/L.'],
        },
        {
          label: 'Concentration molaire (en mol/L).',
          answer: { kind: 'number', value: 0.2, tolerance: 0.002, unit: 'mol/L' },
          steps: ['$n = 0{,}100$ mol ; $C = \\dfrac{0{,}100}{0{,}500} = 0{,}200$ mol/L.'],
        },
      ],
    },
    {
      id: 'sol-dilution',
      level: 2,
      title: 'Une dilution',
      statement: 'On prélève 10,0 mL de la solution à 0,200 mol/L et on complète à 100,0 mL.',
      parts: [
        {
          label: 'Concentration de la solution diluée (en mol/L).',
          answer: { kind: 'number', value: 0.02, tolerance: 0.0002, unit: 'mol/L' },
          steps: ['$C_1 = \\dfrac{0{,}200 \\times 10{,}0}{100{,}0} = 0{,}0200$ mol/L.'],
        },
        {
          label: 'Facteur de dilution.',
          answer: { kind: 'number', value: 10, tolerance: 0, unit: '' },
          steps: ['$F = \\dfrac{100}{10} = 10$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans l’eau sucrée, le sucre est :',
      choices: ['le soluté', 'le solvant', 'la solution', 'le précipité'],
      answer: 0,
      explanation: 'L’eau est le solvant.',
    },
    {
      question: 'La concentration massique s’exprime en :',
      choices: ['g/L', 'mol/L', 'g/mol', 'L/mol'],
      answer: 0,
      explanation: '$C_m = \\frac{m}{V}$.',
    },
    {
      question: 'Quand on dilue une solution, la quantité de soluté :',
      choices: ['ne change pas', 'augmente', 'diminue', 'devient nulle'],
      answer: 0,
      explanation: 'On ajoute seulement du solvant.',
    },
    {
      question: 'Pour préparer 200 mL d’une solution à 0,1 mol/L, il faut :',
      choices: ['0,02 mol de soluté', '0,1 mol', '20 mol', '2 mol'],
      answer: 0,
      explanation: '$n = C \\times V = 0{,}1 \\times 0{,}2$.',
    },
  ],
  applications: [
    {
      title: 'La solution de réhydratation orale',
      tagline: 'Une concentration qui sauve des vies',
      situation:
        'La SRO recommandée par l’OMS contient, par litre, 13,5 g de glucose ($M = 180$ g/mol) et 2,6 g de chlorure de sodium, en plus d’autres sels.',
      model: 'On calcule la concentration molaire du glucose dans 1,0 L de solution.',
      questions: ['Quelle est la concentration molaire du glucose, en mol/L ?'],
      check: { value: 0.075, tolerance: 0.02, unit: 'mol/L' },
      solution: ['$n = \\dfrac{13{,}5}{180} = 0{,}075$ mol dans 1,0 L : $C = 0{,}075$ mol/L.', 'Il faut respecter le volume d’eau indiqué sur le sachet : une solution trop concentrée aggraverait la diarrhée.'],
      fact: 'Depuis son adoption dans les années 1970, la SRO a évité des dizaines de millions de décès d’enfants dans le monde.',
    },
  ],
};
