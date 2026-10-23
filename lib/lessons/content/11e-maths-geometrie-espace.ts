import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le grenier à mil traditionnel est un cylindre de terre coiffé d’un toit conique en paille. Combien de sacs de mil peut-il contenir ? Pour calculer volumes et distances dans l’espace, et décrire comment droites et plans se coupent ou sont parallèles, on étudie la **géométrie dans l’espace**.',
  objectives: [
    'connaître les positions relatives de droites et de plans ;',
    'utiliser les règles de parallélisme et d’orthogonalité ;',
    'calculer des longueurs dans un solide (diagonale d’un pavé) ;',
    'calculer les volumes des solides usuels.',
  ],
  sections: [
    {
      title: 'Positions relatives',
      blocks: [
        {
          kind: 'table',
          head: ['Objets', 'Positions possibles'],
          rows: [
            ['deux droites', 'sécantes, parallèles (coplanaires), ou **non coplanaires**'],
            ['une droite et un plan', 'droite incluse, sécante (un point commun), ou parallèle'],
            ['deux plans', 'sécants (selon une droite) ou parallèles'],
          ],
        },
        {
          kind: 'rule',
          text: 'Si une droite est parallèle à une droite d’un plan, elle est parallèle à ce plan. Une droite est orthogonale à un plan si elle est orthogonale à **deux droites sécantes** de ce plan.',
        },
        {
          kind: 'trap',
          wrong: '« Deux droites qui ne se coupent pas sont parallèles. »',
          why: 'Dans l’espace, elles peuvent être non coplanaires : une arête du haut et une arête du bas d’un cube, dans deux directions différentes.',
          reflex: 'Parallèles = coplanaires et sans point commun (ou confondues).',
        },
      ],
    },
    {
      title: 'Longueurs et volumes',
      blocks: [
        {
          kind: 'formula',
          label: 'Diagonale d’un pavé droit de dimensions $a$, $b$, $c$',
          tex: 'd = \\sqrt{a^2 + b^2 + c^2} \\qquad \\text{cube : } d = a\\sqrt{3}',
        },
        {
          kind: 'table',
          head: ['Solide', 'Volume'],
          rows: [
            ['pavé droit', '$a \\times b \\times c$'],
            ['prisme droit, cylindre', 'aire de la base × hauteur ; cylindre : $\\pi r^2 h$'],
            ['pyramide, cône', '$\\dfrac{1}{3}$ × aire de la base × hauteur ; cône : $\\dfrac{1}{3}\\pi r^2 h$'],
            ['boule', '$\\dfrac{4}{3}\\pi r^3$'],
          ],
        },
        {
          kind: 'example',
          title: 'une pyramide',
          text: 'Base carrée de 6 m de côté, hauteur 4 m.',
          steps: ['$V = \\dfrac{1}{3} \\times 36 \\times 4 = 48$ m³.'],
        },
        {
          kind: 'rule',
          text: 'Unités : 1 m³ = 1 000 L ; 1 dm³ = 1 L.',
        },
      ],
    },
  ],
  essentials: [
    'Droites : sécantes, parallèles ou non coplanaires ; droite/plan : incluse, sécante ou parallèle ; plans : sécants ou parallèles.',
    'Droite orthogonale à un plan : orthogonale à deux droites sécantes du plan.',
    'Diagonale d’un pavé : $\\sqrt{a^2 + b^2 + c^2}$.',
    'Volumes : prisme/cylindre = base × hauteur ; pyramide/cône = $\\frac{1}{3}$ base × hauteur ; boule $\\frac{4}{3}\\pi r^3$.',
  ],
  exercises: [
    {
      id: 'esp11-volumes',
      level: 1,
      title: 'Calculs de volumes',
      statement: 'Calcule les volumes demandés.',
      parts: [
        {
          label: 'Pyramide à base carrée de 6 m de côté et de 4 m de haut (en m³).',
          answer: { kind: 'number', value: 48, tolerance: 0.01, unit: 'm³' },
          steps: ['$\\dfrac{1}{3} \\times 36 \\times 4 = 48$ m³.'],
        },
        {
          label: 'Citerne cylindrique de 1 m de rayon et 2 m de haut (en L).',
          answer: { kind: 'number', value: 6283, tolerance: 5, unit: 'L' },
          steps: ['$\\pi \\times 1^2 \\times 2 \\approx 6{,}283$ m³ $= 6\\,283$ L.'],
        },
      ],
    },
    {
      id: 'esp11-diagonale',
      level: 2,
      title: 'Diagonales',
      statement: 'Calcule les diagonales (valeurs approchées).',
      parts: [
        {
          label: 'Diagonale d’un cube de 3 cm d’arête (en cm).',
          answer: { kind: 'number', value: 5.196, tolerance: 0.005, unit: 'cm' },
          steps: ['$3\\sqrt{3} \\approx 5{,}196$ cm.'],
        },
        {
          label: 'Diagonale d’un pavé de 5 m × 4 m × 3 m (en m).',
          answer: { kind: 'number', value: 7.071, tolerance: 0.005, unit: 'm' },
          steps: ['$\\sqrt{25 + 16 + 9} = \\sqrt{50} \\approx 7{,}07$ m.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Deux plans distincts non parallèles se coupent selon :',
      choices: ['une droite', 'un point', 'un plan', 'rien'],
      answer: 0,
      explanation: 'Comme deux pages d’un livre ouvert.',
    },
    {
      question: 'Le volume d’un cône est :',
      choices: ['le tiers de celui du cylindre de même base et même hauteur', 'la moitié', 'égal', 'le double'],
      answer: 0,
      explanation: '$\\frac{1}{3}\\pi r^2h$.',
    },
    {
      question: '1 m³ correspond à :',
      choices: ['1 000 L', '100 L', '10 L', '1 L'],
      answer: 0,
      explanation: '$1\\ \\text{m}^3 = 1\\,000\\ \\text{dm}^3$.',
    },
    {
      question: 'Pour qu’une droite soit orthogonale à un plan, il suffit qu’elle soit orthogonale à :',
      choices: ['deux droites sécantes du plan', 'une seule droite du plan', 'deux droites parallèles du plan', 'aucune droite'],
      answer: 0,
      explanation: 'C’est le critère d’orthogonalité.',
    },
  ],
  applications: [
    {
      title: 'Le grenier à mil',
      tagline: 'Combien de mil peut-il contenir ?',
      situation:
        'Un grenier en terre est un cylindre de 1,0 m de rayon et 2,0 m de haut, surmonté d’un toit conique de même rayon et de 1,2 m de haut. On ne remplit que la partie cylindrique.',
      model: 'On assimile le grenier à un cylindre parfait ; 1 m³ de mil en grains pèse environ 750 kg.',
      questions: ['Quel volume de mil le cylindre peut-il contenir, en m³ ?', 'Quelle masse de mil cela représente-t-il ?'],
      check: { value: 6.28, tolerance: 0.02, unit: 'm³' },
      solution: ['$V = \\pi \\times 1{,}0^2 \\times 2{,}0 \\approx 6{,}28$ m³.', 'Masse : $6{,}28 \\times 750 \\approx 4\\,700$ kg, soit près de 47 sacs de 100 kg. Le toit conique (volume $\\frac{1}{3}\\pi \\times 1 \\times 1{,}2 \\approx 1{,}26$ m³) protège de la pluie.'],
    },
  ],
};
