import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le forage le plus profond jamais creusé n’a atteint que 12 km, alors que le centre de la Terre est à 6 370 km sous nos pieds. Personne n’y est allé. Comment sait-on pourtant que la Terre a un noyau de fer en partie liquide ? En écoutant les **séismes** : leurs ondes traversent la planète et révèlent ce qu’elle contient.',
  objectives: [
    'décrire les enveloppes de la Terre et leurs épaisseurs ;',
    'expliquer comment les ondes sismiques renseignent sur l’intérieur du globe ;',
    'distinguer croûte continentale et croûte océanique ;',
    'utiliser les données de profondeur et de température.',
  ],
  sections: [
    {
      title: 'Les enveloppes du globe',
      blocks: [
        { kind: 'figure', id: 'globe', caption: 'Les enveloppes de la Terre (épaisseurs non respectées).' },
        {
          kind: 'table',
          head: ['Enveloppe', 'Profondeur', 'État et composition'],
          rows: [
            ['croûte', '0 à 5–70 km', 'solide ; granite (continents) ou basalte (océans)'],
            ['manteau', 'jusqu’à 2 900 km', 'solide mais capable de fluer lentement ; péridotite'],
            ['noyau externe', '2 900 à 5 100 km', 'liquide ; fer et nickel'],
            ['noyau interne (graine)', '5 100 à 6 370 km', 'solide ; fer et nickel'],
          ],
        },
        {
          kind: 'definition',
          term: 'Lithosphère',
          text: 'enveloppe rigide formée de la croûte et du haut du manteau, épaisse d’environ 100 km. Elle est découpée en plaques qui glissent sur l’**asthénosphère**, plus chaude et plus déformable.',
        },
      ],
    },
    {
      title: 'Ce que disent les séismes',
      blocks: [
        {
          kind: 'list',
          items: [
            'les ondes **P** (de compression) traversent les solides et les liquides ;',
            'les ondes **S** (de cisaillement) ne traversent **pas les liquides** ;',
            'leur vitesse change brusquement à chaque limite entre deux enveloppes : on parle de **discontinuité** (Moho vers 30 km sous les continents, Gutenberg à 2 900 km).',
          ],
        },
        {
          kind: 'rule',
          text: 'Les ondes S ne traversent pas le noyau externe : c’est la preuve qu’il est liquide.',
        },
        {
          kind: 'formula',
          tex: 'v = \\dfrac{d}{t}',
          legend: ['vitesse moyenne d’une onde sismique : distance parcourue ÷ durée'],
        },
      ],
    },
    {
      title: 'La chaleur interne',
      blocks: [
        {
          kind: 'text',
          text: 'La température augmente avec la profondeur : environ 3 °C tous les 100 m dans la croûte (gradient géothermique), plus de 5 000 °C dans le noyau. Cette chaleur vient surtout de la désintégration d’éléments radioactifs ; elle anime les mouvements du manteau et des plaques.',
        },
      ],
    },
  ],
  essentials: [
    'Croûte, manteau (jusqu’à 2 900 km), noyau externe liquide, noyau interne solide.',
    'Croûte continentale : granite, épaisse ; océanique : basalte, mince.',
    'Les ondes S ne traversent pas les liquides : le noyau externe est liquide.',
    'La température augmente avec la profondeur (≈ 3 °C / 100 m dans la croûte).',
  ],
  exercises: [
    {
      id: 'gl-onde',
      level: 1,
      title: 'La vitesse d’une onde P',
      statement: 'Une onde P parcourt 1 200 km en 2 min 30 s.',
      parts: [
        {
          label: 'Durée en secondes.',
          answer: { kind: 'number', value: 150, tolerance: 0, unit: 's' },
          steps: ['$2 \\times 60 + 30 = 150$ s.'],
        },
        {
          label: 'Vitesse moyenne de l’onde, en km/s.',
          answer: { kind: 'number', value: 8, tolerance: 0.05, unit: 'km/s' },
          steps: ['$v = \\dfrac{1\\,200}{150} = 8$ km/s.'],
        },
      ],
    },
    {
      id: 'gl-forage',
      level: 2,
      title: 'La température au fond d’une mine',
      statement: 'À la surface, la température du sol est de 28 °C. Elle augmente de 3 °C tous les 100 m.',
      parts: [
        {
          label: 'Température au fond d’une galerie à 800 m de profondeur (°C).',
          answer: { kind: 'number', value: 52, tolerance: 0.5, unit: '°C' },
          steps: ['$800 \\div 100 = 8$ tranches de 100 m.', '$28 + 8 \\times 3 = 52$ °C.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Quelle enveloppe est liquide ?',
      choices: ['le noyau externe', 'le manteau', 'la croûte', 'le noyau interne'],
      answer: 0,
      explanation: 'Les ondes S ne la traversent pas.',
    },
    {
      question: 'La croûte océanique est faite surtout de :',
      choices: ['basalte', 'granite', 'calcaire', 'fer'],
      answer: 0,
      explanation: 'La croûte continentale est surtout granitique.',
    },
    {
      question: 'La lithosphère comprend :',
      choices: ['la croûte et le haut du manteau', 'seulement la croûte', 'le manteau et le noyau', 'le noyau'],
      answer: 0,
      explanation: 'Elle forme les plaques tectoniques.',
    },
    {
      question: 'Le rayon de la Terre vaut environ :',
      choices: ['6 370 km', '637 km', '63 700 km', '12 km'],
      answer: 0,
      explanation: '12 km est la profondeur du forage le plus profond.',
    },
  ],
  applications: [
    {
      title: 'Le sismographe de Bamako',
      tagline: 'À quelle distance a eu lieu le séisme ?',
      situation:
        'Un séisme se produit en Afrique du Nord. À la station de Bamako, les ondes P arrivent 3 min 20 s avant les ondes S. Les ondes P vont à 8 km/s et les ondes S à 4,5 km/s.',
      model: 'Le retard Δt entre P et S vaut d/vS − d/vP, d’où d = Δt ÷ (1/vS − 1/vP).',
      questions: ['À quelle distance de Bamako se trouve le foyer du séisme, en km ?', 'Pourquoi faut-il au moins trois stations pour le localiser ?'],
      check: { value: 2057, tolerance: 0.02, unit: 'km' },
      solution: [
        '$\\Delta t = 200$ s ; $\\dfrac{1}{4{,}5} - \\dfrac{1}{8} \\approx 0{,}0972$ s/km.',
        '$d = \\dfrac{200}{0{,}0972} \\approx 2\\,057$ km.',
        'Chaque station donne un cercle de rayon d autour d’elle ; trois cercles se coupent en un seul point, l’épicentre.',
      ],
      fact: 'Le Mali est une région de faible sismicité, mais il ressent parfois les grands séismes lointains.',
    },
  ],
};
