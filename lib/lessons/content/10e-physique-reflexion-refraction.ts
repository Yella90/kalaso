import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une perche plongée dans le fleuve paraît cassée à la surface de l’eau. Le pêcheur qui vise un poisson doit viser plus bas que là où il le voit. Et sur la route brûlante de midi, on croit voir des flaques d’eau qui n’existent pas. La lumière change de direction en passant d’un milieu à un autre : c’est la **réfraction**.',
  objectives: [
    'énoncer les lois de la réflexion ;',
    'énoncer les lois de Snell-Descartes pour la réfraction ;',
    'calculer un angle de réfraction ;',
    'expliquer la réflexion totale et l’angle limite.',
  ],
  sections: [
    {
      title: 'La réflexion',
      blocks: [
        {
          kind: 'rule',
          text: 'Le rayon réfléchi est dans le plan d’incidence, et l’angle de réflexion est égal à l’angle d’incidence : $r = i$ (angles mesurés par rapport à la normale).',
        },
        {
          kind: 'text',
          text: 'Un miroir plan donne d’un objet une image symétrique par rapport au miroir.',
        },
      ],
    },
    {
      title: 'La réfraction',
      blocks: [
        {
          kind: 'formula',
          tex: 'n_1 \\sin i_1 = n_2 \\sin i_2',
          legend: ['$n$ : indice de réfraction du milieu (air : 1,00 ; eau : 1,33 ; verre : 1,5)'],
        },
        {
          kind: 'rule',
          text: 'En entrant dans un milieu plus réfringent ($n_2 > n_1$), le rayon se **rapproche** de la normale ; en sortant vers un milieu moins réfringent, il s’en **écarte**.',
        },
        {
          kind: 'example',
          title: 'de l’air vers l’eau',
          text: 'Un rayon arrive sur l’eau avec un angle d’incidence de 45°.',
          steps: ['$1{,}00 \\times \\sin 45° = 1{,}33 \\times \\sin i_2$', '$\\sin i_2 = \\dfrac{0{,}707}{1{,}33} \\approx 0{,}532$, donc $i_2 \\approx 32°$.'],
        },
      ],
    },
    {
      title: 'La réflexion totale',
      blocks: [
        {
          kind: 'formula',
          tex: '\\sin \\lambda = \\dfrac{n_2}{n_1}',
          legend: ['angle limite, quand la lumière passe d’un milieu plus réfringent ($n_1$) à un milieu moins réfringent ($n_2$)'],
        },
        {
          kind: 'rule',
          text: 'Si l’angle d’incidence dépasse l’angle limite, toute la lumière est réfléchie : c’est la **réflexion totale**. Elle guide la lumière dans les **fibres optiques** d’Internet.',
        },
      ],
    },
  ],
  essentials: [
    'Réflexion : r = i.',
    'Réfraction : n₁ sin i₁ = n₂ sin i₂.',
    'Vers un milieu plus réfringent, le rayon se rapproche de la normale.',
    'Réflexion totale au-delà de l’angle limite sin λ = n₂/n₁.',
  ],
  exercises: [
    {
      id: 'rr-verre',
      level: 1,
      title: 'De l’air vers le verre',
      statement: 'Un rayon passe de l’air (n = 1,00) dans du verre (n = 1,50) avec un angle d’incidence de 30°.',
      parts: [
        {
          label: 'Angle de réfraction, en degrés (arrondi au dixième).',
          answer: { kind: 'number', value: 19.5, tolerance: 0.2, unit: '°' },
          steps: ['$\\sin i_2 = \\dfrac{\\sin 30°}{1{,}50} = \\dfrac{0{,}5}{1{,}5} \\approx 0{,}333$', '$i_2 \\approx 19{,}5°$.'],
        },
      ],
    },
    {
      id: 'rr-limite',
      level: 2,
      title: 'L’angle limite de l’eau',
      statement: 'La lumière passe de l’eau (n = 1,33) vers l’air (n = 1,00).',
      parts: [
        {
          label: 'Angle limite, en degrés (arrondi à l’unité).',
          answer: { kind: 'number', value: 49, tolerance: 0.6, unit: '°' },
          steps: ['$\\sin \\lambda = \\dfrac{1{,}00}{1{,}33} \\approx 0{,}752$', '$\\lambda \\approx 48{,}8°$, soit environ 49°.'],
        },
        {
          label: 'Un rayon qui arrive sous l’eau avec un angle de 60° sort-il dans l’air ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'non', accepted: ['non'] },
          steps: ['60° > 49° : il y a réflexion totale.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Les angles d’incidence et de réfraction se mesurent par rapport :',
      choices: ['à la normale', 'à la surface', 'à l’horizontale', 'au rayon réfléchi'],
      answer: 0,
      explanation: 'La normale est perpendiculaire à la surface au point d’incidence.',
    },
    {
      question: 'En passant de l’air dans l’eau, un rayon oblique :',
      choices: ['se rapproche de la normale', 's’écarte de la normale', 'ne dévie pas', 'est toujours réfléchi'],
      answer: 0,
      explanation: 'L’eau est plus réfringente que l’air.',
    },
    {
      question: 'La réflexion totale peut se produire quand la lumière va :',
      choices: ['de l’eau vers l’air', 'de l’air vers l’eau', 'de l’air vers le verre', 'dans le vide'],
      answer: 0,
      explanation: 'Il faut aller vers un milieu moins réfringent.',
    },
    {
      question: 'Un rayon qui arrive perpendiculairement à une surface :',
      choices: ['ne dévie pas', 'est totalement réfléchi', 'dévie de 90°', 'disparaît'],
      answer: 0,
      explanation: 'i = 0 donne i₂ = 0.',
    },
  ],
  applications: [
    {
      title: 'La fibre optique de Bamako',
      tagline: 'La lumière prisonnière du verre',
      situation:
        'Internet arrive au Mali par des câbles de fibre optique. Le cœur de la fibre a un indice de 1,48 et la gaine qui l’entoure un indice de 1,46.',
      model: 'Réflexion totale à la limite cœur–gaine : sin λ = n_gaine / n_cœur.',
      questions: ['Quel est l’angle limite, en degrés ?', 'Pourquoi la lumière reste-t-elle dans la fibre sur des kilomètres ?'],
      check: { value: 80.6, tolerance: 0.01, unit: '°' },
      solution: [
        '$\\sin \\lambda = \\dfrac{1{,}46}{1{,}48} \\approx 0{,}9865$, donc $\\lambda \\approx 80{,}6°$.',
        'Les rayons presque parallèles à l’axe arrivent sur la gaine avec un angle supérieur à 80,6° : ils sont totalement réfléchis, encore et encore.',
      ],
      fact: 'Une seule fibre plus fine qu’un cheveu peut transporter des millions de conversations à la fois.',
    },
  ],
};
