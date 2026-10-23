import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une pile neuve de 1,5 V qui alimente une torche affiche moins de 1,5 V à ses bornes quand la torche est allumée. Où sont passés les volts manquants ? Dans la pile elle-même : elle possède une petite **résistance interne**, qui consomme une partie de son énergie.',
  objectives: [
    'définir la force électromotrice et la résistance interne d’un générateur ;',
    'écrire la loi d’Ohm pour un générateur : U = E − r I ;',
    'écrire la loi d’Ohm pour un récepteur (moteur, électrolyseur) : U = E′ + r′ I ;',
    'déterminer le point de fonctionnement d’un circuit.',
  ],
  sections: [
    {
      title: 'Le générateur',
      blocks: [
        {
          kind: 'formula',
          tex: 'U_{PN} = E - r\\,I',
          legend: ['$E$ : force électromotrice (f.é.m.) en V ; $r$ : résistance interne en Ω'],
        },
        {
          kind: 'text',
          text: 'À vide (I = 0), la tension aux bornes vaut E. Plus le générateur débite, plus sa tension baisse. En court-circuit (U = 0), il débite l’intensité maximale $I_{cc} = E/r$, dangereuse.',
        },
      ],
    },
    {
      title: 'Le récepteur actif',
      blocks: [
        {
          kind: 'formula',
          tex: 'U_{AB} = E\' + r\'\\,I',
          legend: ['$E\'$ : force contre-électromotrice (f.c.é.m.) ; $r\'$ : résistance interne du récepteur'],
        },
        {
          kind: 'text',
          text: 'Un moteur ou un électrolyseur convertit une partie de l’énergie électrique en une autre forme (mécanique, chimique). La f.c.é.m. représente cette part utile.',
        },
      ],
    },
    {
      title: 'Le point de fonctionnement',
      blocks: [
        {
          kind: 'rule',
          text: 'Dans un circuit formé d’un générateur (E, r) et de résistances (R) en série, la loi des mailles donne : $E = (r + R)\\,I$, soit $I = \\dfrac{E}{r + R}$ (loi de Pouillet).',
        },
        {
          kind: 'example',
          title: 'une pile et une lampe',
          text: 'Pile : E = 4,5 V, r = 1,5 Ω ; lampe assimilée à R = 7,5 Ω.',
          steps: ['$I = \\dfrac{4{,}5}{1{,}5 + 7{,}5} = 0{,}5$ A.', '$U = 4{,}5 - 1{,}5 \\times 0{,}5 = 3{,}75$ V aux bornes de la pile.'],
        },
      ],
    },
  ],
  essentials: [
    'Générateur : U = E − rI ; récepteur : U = E′ + r′I.',
    'À vide, U = E ; en court-circuit, I = E/r.',
    'Loi de Pouillet (série) : I = E / (r + R).',
  ],
  exercises: [
    {
      id: 'da-pile',
      level: 1,
      title: 'La tension aux bornes d’une pile',
      statement: 'Une pile a une f.é.m. de 9,0 V et une résistance interne de 2,0 Ω. Elle débite 0,50 A.',
      parts: [
        {
          label: 'Tension à ses bornes, en V.',
          answer: { kind: 'number', value: 8, tolerance: 0.02, unit: 'V' },
          steps: ['$U = 9{,}0 - 2{,}0 \\times 0{,}50 = 8{,}0$ V.'],
        },
        {
          label: 'Intensité de court-circuit, en A.',
          answer: { kind: 'number', value: 4.5, tolerance: 0.02, unit: 'A' },
          steps: ['$I_{cc} = \\dfrac{9{,}0}{2{,}0} = 4{,}5$ A.'],
        },
      ],
    },
    {
      id: 'da-moteur',
      level: 2,
      title: 'Le petit moteur',
      statement: 'Un moteur (E′ = 4,0 V, r′ = 2,0 Ω) est branché sur une batterie (E = 12 V, r = 1,0 Ω).',
      parts: [
        {
          label: 'Intensité du courant, en A (loi des mailles : E = E′ + (r + r′) I).',
          answer: { kind: 'number', value: 2.67, tolerance: 0.02, unit: 'A' },
          steps: ['$I = \\dfrac{12 - 4{,}0}{1{,}0 + 2{,}0} = \\dfrac{8}{3} \\approx 2{,}67$ A.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'À vide, la tension aux bornes d’un générateur est égale à :',
      choices: ['sa f.é.m. E', '0', 'rI', 'E/r'],
      answer: 0,
      explanation: 'I = 0, donc U = E.',
    },
    {
      question: 'Quand un générateur débite plus de courant, sa tension :',
      choices: ['diminue', 'augmente', 'ne change pas', 's’annule toujours'],
      answer: 0,
      explanation: 'U = E − rI.',
    },
    {
      question: 'Un moteur électrique est :',
      choices: ['un récepteur actif', 'un générateur', 'un conducteur ohmique', 'un interrupteur'],
      answer: 0,
      explanation: 'Il convertit l’énergie électrique en énergie mécanique.',
    },
    {
      question: 'Pourquoi le court-circuit d’une batterie est-il dangereux ?',
      choices: ['l’intensité devient très grande', 'la tension augmente', 'le courant s’arrête', 'la batterie se recharge'],
      answer: 0,
      explanation: 'I = E/r, avec r petit : les fils chauffent et peuvent brûler.',
    },
  ],
  applications: [
    {
      title: 'La batterie de la moto',
      tagline: 'Pourquoi les phares baissent au démarrage',
      situation:
        'La batterie d’une moto a une f.é.m. de 12,6 V et une résistance interne de 0,05 Ω. Au démarrage, le démarreur appelle 80 A.',
      model: 'U = E − rI.',
      questions: ['Quelle est la tension aux bornes de la batterie pendant le démarrage ?', 'Pourquoi les phares faiblissent-ils à ce moment ?'],
      check: { value: 8.6, tolerance: 0.02, unit: 'V' },
      solution: ['$U = 12{,}6 - 0{,}05 \\times 80 = 8{,}6$ V.', 'Les phares sont alimentés par la même batterie : leur tension chute de 12,6 V à 8,6 V, ils éclairent moins.'],
      fact: 'Une batterie usée a une résistance interne plus grande : la moto a du mal à démarrer.',
    },
  ],
};
