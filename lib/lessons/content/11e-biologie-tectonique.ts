import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Sur une carte, la côte de l’Afrique de l’Ouest semble s’emboîter dans celle de l’Amérique du Sud, comme deux pièces d’un puzzle. Ce n’est pas un hasard : il y a 200 millions d’années, ces continents étaient soudés. Depuis, ils s’éloignent de quelques centimètres par an. La surface de la Terre est faite de **plaques** qui bougent.',
  objectives: [
    'décrire la structure interne du globe terrestre ;',
    'citer les arguments en faveur de la dérive des continents ;',
    'décrire les trois types de limites de plaques ;',
    'calculer une vitesse de déplacement de plaque ou l’âge d’un fond océanique.',
  ],
  sections: [
    {
      title: 'La structure du globe',
      blocks: [
        { kind: 'figure', id: 'globe', caption: "Les enveloppes de la Terre." },
        {
          kind: 'table',
          head: ['Enveloppe', 'Profondeur', 'Caractéristique'],
          rows: [
            ['croûte', '5 à 70 km', 'continentale (granite) ou océanique (basalte)'],
            ['manteau', 'jusqu’à 2 900 km', 'roches chaudes, solides mais capables de se déformer lentement'],
            ['noyau', 'jusqu’au centre (6 370 km)', 'fer et nickel ; externe liquide, interne solide'],
          ],
        },
        {
          kind: 'text',
          text: 'La **lithosphère** (croûte + partie supérieure du manteau, environ 100 km) est rigide et découpée en une douzaine de **plaques**. Elles se déplacent sur l’**asthénosphère**, plus déformable.',
        },
      ],
    },
    {
      title: 'Les preuves de la mobilité',
      blocks: [
        {
          kind: 'list',
          items: [
            'la forme des côtes de part et d’autre de l’Atlantique (Wegener, 1912) ;',
            'les mêmes fossiles et les mêmes roches anciennes de chaque côté de l’océan ;',
            'l’âge des fonds océaniques, qui augmente quand on s’éloigne des dorsales ;',
            'les mesures par satellite (GPS) : quelques centimètres par an.',
          ],
        },
      ],
    },
    {
      title: 'Les limites de plaques',
      blocks: [
        {
          kind: 'table',
          head: ['Limite', 'Mouvement', 'Phénomènes', 'Exemple'],
          rows: [
            ['divergente', 'les plaques s’écartent', 'dorsale océanique, volcanisme, création de croûte', 'dorsale atlantique, rift est-africain'],
            ['convergente', 'les plaques se rapprochent', 'subduction (volcans, séismes) ou collision (montagnes)', 'Andes, Himalaya'],
            ['transformante', 'les plaques coulissent', 'séismes', 'faille de San Andreas'],
          ],
        },
        {
          kind: 'formula',
          tex: 'v = \\dfrac{d}{t} \\qquad 1\\ \\text{cm/an} = 10\\ \\text{km par million d’années}',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Le Mali est situé au cœur d’une plaque, sur un très vieux socle stable (le craton ouest-africain) : les séismes et les volcans y sont presque inexistants.',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Les plaques flottent sur un océan de lave liquide. »',
          why: 'Le manteau est presque entièrement solide ; il se déforme très lentement, comme une pâte.',
          reflex: 'Seules de petites zones fondent, sous les dorsales et les zones de subduction.',
        },
      ],
    },
  ],
  essentials: [
    'Croûte, manteau, noyau ; lithosphère rigide découpée en plaques sur l’asthénosphère.',
    'Preuves : puzzle des continents, fossiles, âge des fonds océaniques, GPS.',
    'Limites : divergentes (dorsales), convergentes (subduction, collision), transformantes.',
    'Vitesses de quelques cm/an ; 1 cm/an = 10 km par million d’années.',
  ],
  exercises: [
    {
      id: 'tecto-atlantique',
      level: 1,
      title: 'L’ouverture de l’Atlantique',
      statement: 'L’Afrique et l’Amérique du Sud s’éloignent à environ 3 cm par an.',
      parts: [
        {
          label: 'De combien de kilomètres s’éloignent-elles en 1 million d’années ?',
          answer: { kind: 'number', value: 30, tolerance: 0.1, unit: 'km' },
          steps: ['$3\\ \\text{cm} \\times 10^6 = 3 \\times 10^6$ cm $= 30$ km.'],
        },
        {
          label: 'Combien de kilomètres en 100 millions d’années ?',
          answer: { kind: 'number', value: 3000, tolerance: 5, unit: 'km' },
          steps: ['$30 \\times 100 = 3\\,000$ km : l’ordre de grandeur de la largeur de l’Atlantique Sud.'],
        },
      ],
    },
    {
      id: 'tecto-age',
      level: 2,
      title: 'L’âge d’un fond océanique',
      statement: 'Une roche du fond océanique est à 1 000 km de la dorsale. De ce côté, la plaque s’éloigne de la dorsale à 2 cm par an.',
      parts: [
        {
          label: 'Âge de cette roche (en millions d’années).',
          answer: { kind: 'number', value: 50, tolerance: 0.5, unit: 'Ma' },
          steps: ['2 cm/an = 20 km par million d’années.', '$\\dfrac{1\\,000}{20} = 50$ millions d’années.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Au niveau d’une dorsale océanique, les plaques :',
      choices: ['s’écartent', 'se rapprochent', 'coulissent', 'sont immobiles'],
      answer: 0,
      explanation: 'De la nouvelle croûte s’y forme.',
    },
    {
      question: 'L’Himalaya résulte :',
      choices: ['d’une collision entre deux plaques', 'd’une dorsale', 'd’un volcan isolé', 'de l’érosion'],
      answer: 0,
      explanation: 'L’Inde est entrée en collision avec l’Asie.',
    },
    {
      question: 'Le noyau terrestre est surtout composé de :',
      choices: ['fer et nickel', 'granite', 'basalte', 'eau'],
      answer: 0,
      explanation: 'C’est la partie la plus dense de la Terre.',
    },
    {
      question: 'Pourquoi y a-t-il très peu de séismes au Mali ?',
      choices: ['il est au cœur d’une plaque, sur un socle stable', 'il n’a pas de montagnes', 'il pleut peu', 'il est proche de l’équateur'],
      answer: 0,
      explanation: 'Les séismes se concentrent aux limites de plaques.',
    },
  ],
  applications: [
    {
      title: 'Le puzzle des continents',
      tagline: 'Quand l’Afrique touchait l’Amérique',
      situation:
        'On trouve au Brésil et en Afrique de l’Ouest les mêmes roches très anciennes et les fossiles d’un même petit reptile d’eau douce, le Mesosaurus, qui ne pouvait pas traverser un océan.',
      model: 'Les deux continents faisaient partie d’un même supercontinent, la Pangée.',
      questions: ['Comment expliquer la présence du Mesosaurus des deux côtés de l’Atlantique ?'],
      solution: ['Les deux régions étaient soudées quand ce reptile vivait (il y a environ 280 millions d’années). Elles se sont séparées ensuite, avec l’ouverture de l’Atlantique.'],
    },
  ],
};
