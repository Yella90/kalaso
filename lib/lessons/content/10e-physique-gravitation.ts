import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une mangue tombe de l’arbre ; la Lune, elle, tourne autour de la Terre sans tomber. Newton a compris que c’est la même force qui agit dans les deux cas : la **gravitation**, qui attire toutes les masses entre elles.',
  objectives: [
    'énoncer la loi de gravitation universelle ;',
    'calculer la force d’attraction entre deux corps ;',
    'relier poids et masse : P = m × g ;',
    'comparer le poids sur la Terre et sur la Lune.',
  ],
  sections: [
    {
      title: 'La loi de gravitation universelle',
      blocks: [
        {
          kind: 'formula',
          tex: 'F = G\\,\\dfrac{m_A\\, m_B}{d^2}',
          legend: ['$G = 6{,}67 \\times 10^{-11}$ N·m²/kg² ; $m$ en kg ; $d$ distance entre les centres en m'],
        },
        {
          kind: 'rule',
          text: 'Deux corps s’attirent avec des forces de même valeur, dirigées l’un vers l’autre. La force est proportionnelle aux masses et inversement proportionnelle au **carré** de la distance.',
        },
        {
          kind: 'example',
          title: 'deux élèves',
          text: 'Deux élèves de 60 kg à 1 m l’un de l’autre.',
          steps: ['$F = 6{,}67 \\times 10^{-11} \\times \\dfrac{60 \\times 60}{1^2} \\approx 2{,}4 \\times 10^{-7}$ N : imperceptible.'],
        },
      ],
    },
    {
      title: 'Le poids et le champ de pesanteur',
      blocks: [
        {
          kind: 'formula',
          tex: 'P = m \\times g',
          legend: ['$P$ en N ; $m$ en kg ; $g$ intensité de la pesanteur en N/kg (9,8 N/kg sur Terre)'],
        },
        {
          kind: 'text',
          text: 'Le poids est la force d’attraction de la Terre sur un objet proche de sa surface. Il est vertical, dirigé vers le bas, appliqué au centre de gravité.',
        },
        {
          kind: 'table',
          head: ['Astre', '$g$ (N/kg)'],
          rows: [
            ['Terre', '9,8'],
            ['Lune', '1,6'],
            ['Mars', '3,7'],
            ['Jupiter', '24,8'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Sur la Lune, mon poids et ma masse sont 6 fois plus petits. »',
          why: 'La masse (quantité de matière, en kg) ne change pas ; seul le poids (force, en N) change.',
          reflex: 'Masse en kg, invariable ; poids en N, dépend de g.',
        },
      ],
    },
  ],
  essentials: [
    'F = G·mA·mB / d², avec G = 6,67 × 10⁻¹¹ N·m²/kg².',
    'P = m × g ; g = 9,8 N/kg sur Terre, 1,6 N/kg sur la Lune.',
    'La masse ne change pas d’un astre à l’autre, le poids oui.',
  ],
  exercises: [
    {
      id: 'gr-poids',
      level: 1,
      title: 'Poids sur la Terre et sur la Lune',
      statement: 'Un sac de riz a une masse de 50 kg.',
      parts: [
        {
          label: 'Son poids sur la Terre (g = 9,8 N/kg), en N.',
          answer: { kind: 'number', value: 490, tolerance: 1, unit: 'N' },
          steps: ['$P = 50 \\times 9{,}8 = 490$ N.'],
        },
        {
          label: 'Son poids sur la Lune (g = 1,6 N/kg), en N.',
          answer: { kind: 'number', value: 80, tolerance: 0.5, unit: 'N' },
          steps: ['$P = 50 \\times 1{,}6 = 80$ N. Sa masse reste 50 kg.'],
        },
      ],
    },
    {
      id: 'gr-terre-lune',
      level: 3,
      title: 'L’attraction Terre–Lune',
      statement: 'Masse de la Terre : $6{,}0 \\times 10^{24}$ kg ; masse de la Lune : $7{,}3 \\times 10^{22}$ kg ; distance : $3{,}8 \\times 10^{8}$ m.',
      parts: [
        {
          label: 'Force d’attraction, en unités de $10^{20}$ N (arrondie au dixième).',
          answer: { kind: 'number', value: 2.0, tolerance: 0.05, unit: '× 10²⁰ N' },
          steps: [
            '$F = 6{,}67 \\times 10^{-11} \\times \\dfrac{6{,}0 \\times 10^{24} \\times 7{,}3 \\times 10^{22}}{(3{,}8 \\times 10^{8})^2}$',
            '$F \\approx 2{,}0 \\times 10^{20}$ N.',
          ],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Si la distance entre deux corps double, la force de gravitation est :',
      choices: ['divisée par 4', 'divisée par 2', 'doublée', 'inchangée'],
      answer: 0,
      explanation: 'Elle varie comme 1/d².',
    },
    {
      question: 'Le poids s’exprime en :',
      choices: ['newtons', 'kilogrammes', 'grammes', 'mètres'],
      answer: 0,
      explanation: 'C’est une force.',
    },
    {
      question: 'Un astronaute de 70 kg sur la Lune a une masse de :',
      choices: ['70 kg', '11,7 kg', '112 N', '0 kg'],
      answer: 0,
      explanation: 'La masse ne dépend pas du lieu.',
    },
    {
      question: 'La force qui maintient la Lune autour de la Terre est :',
      choices: ['la gravitation', 'le frottement', 'la force électrique', 'la force magnétique'],
      answer: 0,
      explanation: 'C’est la même force qui fait tomber les objets.',
    },
  ],
  applications: [
    {
      title: 'Le satellite de télévision',
      tagline: 'Pourquoi le poids diminue en altitude',
      situation:
        'Un satellite de télévision qui arrose le Mali tourne à 36 000 km d’altitude, soit à 42 400 km du centre de la Terre (6,6 fois le rayon terrestre). À la surface, g = 9,8 N/kg.',
      model: 'g est inversement proportionnel au carré de la distance au centre de la Terre.',
      questions: ['Quelle est l’intensité de la pesanteur à cette altitude, en N/kg ?', 'Pourquoi le satellite ne tombe-t-il pas ?'],
      check: { value: 0.225, tolerance: 0.03, unit: 'N/kg' },
      solution: ['$g = \\dfrac{9{,}8}{6{,}6^2} \\approx 0{,}22$ N/kg.', 'Il tombe sans cesse vers la Terre, mais sa grande vitesse horizontale le fait « rater » la Terre : il tourne autour.'],
      fact: 'Ce satellite fait un tour en 24 h : vu du sol, il paraît immobile, et les paraboles restent fixes.',
    },
  ],
};
