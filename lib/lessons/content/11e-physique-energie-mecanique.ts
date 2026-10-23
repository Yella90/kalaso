import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au barrage de Manantali, l’eau retenue en hauteur fait tourner des turbines et alimente des villes entières. Un enfant sur un toboggan prend de la vitesse en descendant. Dans les deux cas, une énergie liée à la **hauteur** se transforme en énergie liée à la **vitesse**. Leur somme, l’**énergie mécanique**, se conserve… quand il n’y a pas de frottements.',
  objectives: [
    'calculer l’énergie potentielle de pesanteur (et élastique) ;',
    'définir l’énergie mécanique ;',
    'utiliser la conservation de l’énergie mécanique en l’absence de frottements ;',
    'calculer l’énergie perdue par frottements.',
  ],
  sections: [
    {
      title: 'Énergie potentielle',
      blocks: [
        {
          kind: 'formula',
          label: 'Énergie potentielle de pesanteur',
          tex: 'E_{pp} = m\\,g\\,z',
          legend: ['$z$ : altitude, axe vers le haut, à partir d’un niveau de référence choisi ($E_{pp} = 0$ en $z = 0$)'],
        },
        {
          kind: 'formula',
          label: 'Énergie potentielle élastique d’un ressort',
          tex: 'E_{pe} = \\dfrac{1}{2}\\,k\\,x^2',
          legend: ['$k$ : raideur (N/m) ; $x$ : allongement ou compression (m)'],
        },
        {
          kind: 'rule',
          text: 'La variation d’énergie potentielle de pesanteur est l’opposé du travail du poids : $\\Delta E_{pp} = -W(\\vec{P})$. Elle ne dépend pas du niveau de référence choisi.',
        },
      ],
    },
    {
      title: 'Énergie mécanique et conservation',
      blocks: [
        {
          kind: 'formula',
          tex: 'E_m = E_c + E_p',
        },
        {
          kind: 'rule',
          text: 'Si les frottements sont négligeables (seul le poids, ou une force qui ne travaille pas, agit), l’**énergie mécanique se conserve** : ce que gagne l’énergie cinétique est perdu par l’énergie potentielle, et inversement.',
        },
        {
          kind: 'example',
          title: 'le ballon lancé vers le haut',
          text: 'Un ballon est lancé verticalement à 12 m/s ; on néglige l’air.',
          steps: ['Au sommet, $v = 0$ : $\\dfrac{1}{2}mv_0^2 = mgh$.', '$h = \\dfrac{v_0^2}{2g} = \\dfrac{144}{19{,}6} \\approx 7{,}3$ m.'],
        },
      ],
    },
    {
      title: 'Avec des frottements',
      blocks: [
        {
          kind: 'rule',
          text: 'S’il y a des frottements, l’énergie mécanique **diminue** : $\\Delta E_m = W(\\vec{f}) < 0$. L’énergie « perdue » n’a pas disparu : elle a chauffé les surfaces en contact et l’air.',
        },
        {
          kind: 'example',
          title: 'le toboggan',
          text: 'Un enfant de 30 kg part sans vitesse du haut d’un toboggan de 3,0 m et arrive en bas à 6,0 m/s.',
          steps: ['Sans frottements, il arriverait à $\\sqrt{2 \\times 9{,}8 \\times 3} \\approx 7{,}7$ m/s.', 'Énergie perdue : $mgh - \\dfrac{1}{2}mv^2 = 882 - 540 = 342$ J.'],
        },
        {
          kind: 'trap',
          wrong: '« Une bille plus lourde arrive plus vite en bas du toboggan. »',
          why: 'Sans frottements, $\\frac{1}{2}mv^2 = mgh$ : la masse se simplifie.',
          reflex: '$v = \\sqrt{2gh}$ ne dépend pas de la masse.',
        },
      ],
    },
  ],
  essentials: [
    '$E_{pp} = mgz$ ; $E_{pe} = \\frac{1}{2}kx^2$ ; $E_m = E_c + E_p$.',
    'Sans frottements, $E_m$ se conserve ; sinon, $\\Delta E_m = W(\\vec{f}) < 0$ (chaleur).',
    'Chute ou montée sans frottements : $\\frac{1}{2}mv^2 = mgh$, indépendant de la masse.',
  ],
  exercises: [
    {
      id: 'em-ballon',
      level: 1,
      title: 'Le ballon lancé vers le haut',
      statement: 'Un ballon de 400 g est lancé verticalement vers le haut à 12 m/s depuis le sol. $g = 9{,}8$ N/kg ; on néglige l’air.',
      parts: [
        {
          label: 'Énergie mécanique au départ (en J), avec $E_{pp} = 0$ au sol.',
          answer: { kind: 'number', value: 28.8, tolerance: 0.1, unit: 'J' },
          steps: ['$E_m = \\dfrac{1}{2} \\times 0{,}400 \\times 12^2 = 28{,}8$ J.'],
        },
        {
          label: 'Hauteur maximale atteinte (en m).',
          answer: { kind: 'number', value: 7.35, tolerance: 0.05, unit: 'm' },
          steps: ['$mgh = 28{,}8$ J : $h = \\dfrac{28{,}8}{0{,}400 \\times 9{,}8} \\approx 7{,}35$ m.'],
        },
      ],
    },
    {
      id: 'em-toboggan',
      level: 2,
      title: 'Le toboggan',
      statement: 'Un enfant de 30 kg part sans vitesse du haut d’un toboggan de 3,0 m et arrive en bas à 6,0 m/s. $g = 9{,}8$ N/kg.',
      parts: [
        {
          label: 'Vitesse qu’il aurait sans frottements (en m/s).',
          answer: { kind: 'number', value: 7.67, tolerance: 0.05, unit: 'm/s' },
          steps: ['$v = \\sqrt{2gh} = \\sqrt{58{,}8} \\approx 7{,}67$ m/s.'],
        },
        {
          label: 'Énergie dissipée par les frottements (en J).',
          answer: { kind: 'number', value: 342, tolerance: 2, unit: 'J' },
          steps: ['$882 - 540 = 342$ J.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’énergie mécanique est la somme :',
      choices: ['de l’énergie cinétique et de l’énergie potentielle', 'du travail et de la puissance', 'de l’énergie cinétique et de la chaleur', 'des forces'],
      answer: 0,
      explanation: '$E_m = E_c + E_p$.',
    },
    {
      question: 'Sans frottements, quand un objet descend :',
      choices: ['son $E_c$ augmente autant que son $E_p$ diminue', 'son $E_m$ augmente', 'son $E_c$ diminue', 'rien ne change'],
      answer: 0,
      explanation: '$E_m$ constante.',
    },
    {
      question: 'Avec des frottements, l’énergie mécanique :',
      choices: ['diminue', 'augmente', 'reste constante', 'devient nulle immédiatement'],
      answer: 0,
      explanation: 'Une partie est transformée en chaleur.',
    },
    {
      question: 'L’énergie potentielle de pesanteur d’un objet de 2 kg à 10 m (avec $g = 10$) vaut :',
      choices: ['200 J', '20 J', '2 J', '100 J'],
      answer: 0,
      explanation: '$mgz = 2 \\times 10 \\times 10$.',
    },
  ],
  applications: [
    {
      title: 'Un barrage hydroélectrique',
      tagline: 'Combien de puissance l’eau peut-elle fournir ?',
      situation:
        'Dans un barrage comme ceux de Manantali ou de Sélingué, l’eau tombe d’une hauteur de 40 m sur les turbines. Le débit est de 100 m³ par seconde (100 000 kg/s). $g = 9{,}8$ N/kg.',
      model: 'On calcule la puissance maximale : toute l’énergie potentielle perdue par l’eau est récupérée.',
      questions: ['Quelle énergie potentielle perd chaque seconde l’eau qui tombe ?', 'Quelle est la puissance maximale disponible, en MW ?'],
      check: { value: 39.2, tolerance: 0.02, unit: 'MW' },
      solution: ['Chaque seconde : $mgh = 100\\,000 \\times 9{,}8 \\times 40 = 3{,}92 \\times 10^7$ J.', '$P = 3{,}92 \\times 10^7$ W, soit 39,2 MW. Les turbines et alternateurs en récupèrent environ 85 à 90 %.'],
      fact: 'L’hydroélectricité est une énergie renouvelable : c’est le Soleil qui, en évaporant l’eau, la remonte en altitude sous forme de pluie.',
    },
  ],
};
