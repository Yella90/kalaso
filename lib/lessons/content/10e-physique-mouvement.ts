import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Assis dans le car Bamako–Ségou, Ibrahim est immobile par rapport à son siège, mais il file à 80 km/h par rapport aux baobabs du bord de la route. Qui a raison ? Les deux : un mouvement se décrit toujours **par rapport à quelque chose**.',
  objectives: [
    'choisir un référentiel et décrire une trajectoire ;',
    'calculer une vitesse moyenne et convertir km/h en m/s ;',
    'distinguer mouvement uniforme, accéléré et ralenti ;',
    'exploiter un enregistrement de positions.',
  ],
  sections: [
    {
      title: 'Référentiel et trajectoire',
      blocks: [
        {
          kind: 'definition',
          term: 'Référentiel',
          text: 'objet par rapport auquel on étudie un mouvement, muni d’un repère et d’une horloge. Le référentiel **terrestre** (le sol) est le plus utilisé.',
        },
        {
          kind: 'definition',
          term: 'Trajectoire',
          text: 'ensemble des positions successives occupées par un point. Elle peut être rectiligne, circulaire ou curviligne.',
        },
        {
          kind: 'example',
          title: 'la valve de la roue de vélo',
          text: 'Pour le cycliste, la valve décrit un cercle ; pour un passant immobile, elle décrit une courbe en arches (une cycloïde).',
        },
      ],
    },
    {
      title: 'La vitesse',
      blocks: [
        {
          kind: 'formula',
          tex: 'v = \\dfrac{d}{\\Delta t}',
          legend: ['$v$ en m/s ; $d$ distance parcourue en m ; $\\Delta t$ durée en s'],
        },
        {
          kind: 'rule',
          text: 'Pour passer des km/h aux m/s, on divise par 3,6 : $1 \\text{ m/s} = 3{,}6 \\text{ km/h}$.',
        },
        {
          kind: 'text',
          text: 'La **vitesse instantanée** est la vitesse à un instant donné (celle du compteur). On l’estime par la vitesse moyenne sur un intervalle très court.',
        },
        {
          kind: 'table',
          head: ['Mouvement', 'La vitesse', 'Sur une chronophotographie'],
          rows: [
            ['uniforme', 'reste constante', 'points également espacés'],
            ['accéléré', 'augmente', 'points de plus en plus espacés'],
            ['ralenti', 'diminue', 'points de plus en plus rapprochés'],
          ],
        },
      ],
    },
  ],
  essentials: [
    'Un mouvement dépend du référentiel choisi.',
    'v = d / Δt ; 1 m/s = 3,6 km/h.',
    'Uniforme : vitesse constante ; accéléré ou ralenti : elle change.',
    'Chronophotographie : l’espacement des points montre l’évolution de la vitesse.',
  ],
  exercises: [
    {
      id: 'mv-car',
      level: 1,
      title: 'Le car Bamako–Ségou',
      statement: 'Le car parcourt les 235 km entre Bamako et Ségou en 3 h 30 min.',
      parts: [
        {
          label: 'Vitesse moyenne du car en km/h (arrondie au dixième).',
          answer: { kind: 'number', value: 67.1, tolerance: 0.1, unit: 'km/h' },
          steps: ['3 h 30 min = 3,5 h.', '$v = \\dfrac{235}{3{,}5} \\approx 67{,}1$ km/h.'],
        },
        {
          label: 'Cette vitesse en m/s (arrondie au dixième).',
          answer: { kind: 'number', value: 18.6, tolerance: 0.1, unit: 'm/s' },
          steps: ['$\\dfrac{67{,}1}{3{,}6} \\approx 18{,}6$ m/s.'],
        },
      ],
    },
    {
      id: 'mv-chrono',
      level: 2,
      title: 'Une chronophotographie',
      statement: 'Une bille est photographiée toutes les 0,1 s. Les distances entre deux positions successives sont : 2 cm, 2 cm, 2 cm, 2 cm.',
      parts: [
        {
          label: 'Vitesse de la bille en m/s.',
          answer: { kind: 'number', value: 0.2, tolerance: 0.005, unit: 'm/s' },
          steps: ['$v = \\dfrac{0{,}02}{0{,}1} = 0{,}2$ m/s.'],
        },
        {
          label: 'Le mouvement est-il uniforme, accéléré ou ralenti ?',
          answer: { kind: 'text', display: 'uniforme', accepted: ['uniforme'] },
          steps: ['Les points sont également espacés : la vitesse est constante.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '90 km/h correspondent à :',
      choices: ['25 m/s', '324 m/s', '9 m/s', '90 m/s'],
      answer: 0,
      explanation: '90 ÷ 3,6 = 25 m/s.',
    },
    {
      question: 'Un passager assis dans un train en marche est immobile par rapport :',
      choices: ['au wagon', 'aux rails', 'à la gare', 'aux arbres'],
      answer: 0,
      explanation: 'Le mouvement dépend du référentiel.',
    },
    {
      question: 'Des points de plus en plus espacés sur une chronophotographie indiquent un mouvement :',
      choices: ['accéléré', 'ralenti', 'uniforme', 'circulaire'],
      answer: 0,
      explanation: 'La distance parcourue pendant chaque intervalle augmente.',
    },
    {
      question: 'La trajectoire de la Lune autour de la Terre est à peu près :',
      choices: ['circulaire', 'rectiligne', 'en zigzag', 'immobile'],
      answer: 0,
      explanation: 'Dans le référentiel terrestre, la Lune tourne autour de la Terre.',
    },
  ],
  applications: [
    {
      title: 'Le radar de la route de Kati',
      tagline: 'Le chauffeur est-il en excès de vitesse ?',
      situation:
        'Sur la route de Kati, la vitesse est limitée à 50 km/h en traversée de village. Deux bornes sont espacées de 100 m ; un gendarme chronomètre une moto qui les passe en 6,0 s.',
      model: 'v = d / Δt, puis conversion en km/h.',
      questions: ['Quelle est la vitesse de la moto en km/h ?', 'Est-elle en infraction ?'],
      check: { value: 60, tolerance: 0.02, unit: 'km/h' },
      solution: ['$v = \\dfrac{100}{6{,}0} \\approx 16{,}7$ m/s, soit $16{,}7 \\times 3{,}6 = 60$ km/h.', 'Oui : elle roule à 60 km/h, au-dessus de la limite de 50 km/h.'],
      fact: 'À 60 km/h, une moto parcourt près de 17 m pendant une seule seconde d’inattention.',
    },
  ],
};
