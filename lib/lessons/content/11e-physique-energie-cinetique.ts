import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une moto lancée à 50 km/h qui heurte un mur subit des dégâts considérables ; à 100 km/h, ce n’est pas deux fois pire, mais quatre fois. Un objet en mouvement possède une énergie qui dépend de sa masse et, surtout, du **carré** de sa vitesse : l’**énergie cinétique**. Un théorème relie ses variations au travail des forces.',
  objectives: [
    'calculer l’énergie cinétique d’un solide en translation ;',
    'énoncer et appliquer le théorème de l’énergie cinétique ;',
    'calculer une vitesse ou une distance de freinage ;',
    'expliquer pourquoi la vitesse est si dangereuse sur la route.',
  ],
  sections: [
    {
      title: 'L’énergie cinétique',
      blocks: [
        {
          kind: 'formula',
          tex: 'E_c = \\dfrac{1}{2}\\,m\\,v^2',
          legend: ['$E_c$ en joules (J), $m$ en kg, $v$ en m/s'],
        },
        {
          kind: 'example',
          title: 'une moto',
          text: 'Une moto et son pilote (150 kg) roulent à 54 km/h.',
          steps: ['$v = \\dfrac{54}{3{,}6} = 15$ m/s.', '$E_c = \\dfrac{1}{2} \\times 150 \\times 15^2 = 16\\,875$ J.'],
        },
        {
          kind: 'trap',
          wrong: '« À vitesse double, l’énergie cinétique double. »',
          why: '$E_c$ est proportionnelle au **carré** de la vitesse.',
          reflex: 'Vitesse × 2 → énergie × 4 ; vitesse × 3 → énergie × 9.',
        },
      ],
    },
    {
      title: 'Le théorème de l’énergie cinétique',
      blocks: [
        {
          kind: 'rule',
          text: 'Dans un référentiel galiléen, la variation de l’énergie cinétique d’un solide entre deux instants est égale à la somme des travaux de toutes les forces extérieures qui s’exercent sur lui : $E_{c,B} - E_{c,A} = \\sum W_{AB}(\\vec{F})$.',
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'list',
              items: [
                'préciser le système et le référentiel ;',
                'faire le bilan de **toutes** les forces (poids, réaction, frottements, traction…) ;',
                'calculer le travail de chacune, puis écrire le théorème.',
              ],
            },
          ],
        },
        {
          kind: 'example',
          title: 'chute libre',
          text: 'Une mangue tombe d’une branche à 5,0 m de haut ; on néglige l’air.',
          steps: ['Seul le poids travaille : $\\dfrac{1}{2}mv^2 - 0 = mgh$.', '$v = \\sqrt{2gh} = \\sqrt{2 \\times 9{,}8 \\times 5{,}0} \\approx 9{,}9$ m/s.'],
        },
      ],
    },
    {
      title: 'Le freinage',
      blocks: [
        {
          kind: 'text',
          text: 'Sur une route horizontale, le poids et la réaction normale ne travaillent pas. Seule la force de freinage $f$, opposée au mouvement, travaille : $0 - \\dfrac{1}{2}mv^2 = -f\\,d$, d’où $d = \\dfrac{mv^2}{2f}$.',
        },
        {
          kind: 'rule',
          text: 'La distance de freinage est proportionnelle au carré de la vitesse : à 108 km/h, il faut 4 fois plus de distance qu’à 54 km/h.',
        },
      ],
    },
  ],
  essentials: [
    '$E_c = \\frac{1}{2}mv^2$, proportionnelle au carré de la vitesse.',
    'Théorème : $\\Delta E_c = \\sum W(\\vec{F}_{ext})$ dans un référentiel galiléen.',
    'Chute libre sans vitesse initiale : $v = \\sqrt{2gh}$.',
    'Distance de freinage $d = \\frac{mv^2}{2f}$, proportionnelle à $v^2$.',
  ],
  exercises: [
    {
      id: 'ec-moto',
      level: 1,
      title: 'Énergie et freinage d’une moto',
      statement: 'Une moto et son pilote (150 kg) roulent à 54 km/h sur une route horizontale. Le pilote freine avec une force constante de 1 500 N.',
      parts: [
        {
          label: 'Énergie cinétique de la moto (en J).',
          answer: { kind: 'number', value: 16875, tolerance: 20, unit: 'J' },
          steps: ['$\\dfrac{1}{2} \\times 150 \\times 15^2 = 16\\,875$ J.'],
        },
        {
          label: 'Distance de freinage (en m).',
          answer: { kind: 'number', value: 11.25, tolerance: 0.05, unit: 'm' },
          steps: ['$f\\,d = E_c$ : $d = \\dfrac{16\\,875}{1\\,500} = 11{,}25$ m.'],
        },
        {
          label: 'Distance de freinage à 108 km/h, avec la même force (en m).',
          answer: { kind: 'number', value: 45, tolerance: 0.1, unit: 'm' },
          steps: ['Vitesse doublée : énergie et distance multipliées par 4, soit 45 m.'],
        },
      ],
    },
    {
      id: 'ec-chute',
      level: 2,
      title: 'Une mangue qui tombe',
      statement: 'Une mangue de 300 g tombe d’une branche située à 5,0 m du sol. $g = 9{,}8$ N/kg ; on néglige l’air.',
      parts: [
        {
          label: 'Travail du poids pendant la chute (en J).',
          answer: { kind: 'number', value: 14.7, tolerance: 0.05, unit: 'J' },
          steps: ['$W = mgh = 0{,}300 \\times 9{,}8 \\times 5{,}0 = 14{,}7$ J.'],
        },
        {
          label: 'Vitesse en arrivant au sol (en m/s).',
          answer: { kind: 'number', value: 9.9, tolerance: 0.05, unit: 'm/s' },
          steps: ['$\\dfrac{1}{2}mv^2 = 14{,}7$ J, donc $v = \\sqrt{2 \\times 9{,}8 \\times 5{,}0} \\approx 9{,}9$ m/s (indépendant de la masse).'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Si la vitesse d’un véhicule triple, son énergie cinétique est multipliée par :',
      choices: ['9', '3', '6', '27'],
      answer: 0,
      explanation: '$3^2 = 9$.',
    },
    {
      question: 'Le théorème de l’énergie cinétique fait intervenir :',
      choices: ['les travaux de toutes les forces extérieures', 'seulement le poids', 'seulement les frottements', 'la puissance'],
      answer: 0,
      explanation: '$\\Delta E_c = \\sum W$.',
    },
    {
      question: 'Sur une route horizontale, le travail du poids d’une voiture est :',
      choices: ['nul', 'moteur', 'résistant', 'égal à son énergie cinétique'],
      answer: 0,
      explanation: 'Le poids est perpendiculaire au déplacement.',
    },
    {
      question: '54 km/h correspondent à :',
      choices: ['15 m/s', '54 m/s', '194 m/s', '5,4 m/s'],
      answer: 0,
      explanation: 'On divise par 3,6.',
    },
  ],
  applications: [
    {
      title: 'La vitesse en ville',
      tagline: 'Pourquoi 50 km/h et pas 70 ?',
      situation:
        'Un Sotrama de 3 000 kg freine avec une force de 9 000 N. On compare sa distance de freinage à 50 km/h et à 70 km/h.',
      model: 'Freinage à force constante sur route horizontale ; on ne compte pas le temps de réaction.',
      questions: ['Quelle est la distance de freinage à 70 km/h, en m ?', 'Combien de fois plus longue qu’à 50 km/h ?'],
      check: { value: 63, tolerance: 0.02, unit: 'm' },
      solution: [
        '70 km/h ≈ 19,4 m/s : $d = \\dfrac{3\\,000 \\times 19{,}4^2}{2 \\times 9\\,000} \\approx 63$ m.',
        '50 km/h ≈ 13,9 m/s : $d \\approx 32$ m. Le rapport vaut $\\left(\\dfrac{70}{50}\\right)^2 \\approx 2$ : la distance double.',
      ],
      fact: 'Un piéton heurté à 50 km/h a beaucoup plus de chances de survivre qu’à 70 km/h : l’énergie à absorber est deux fois plus faible.',
    },
  ],
};
