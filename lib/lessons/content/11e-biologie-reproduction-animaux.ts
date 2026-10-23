import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une femelle d’anophèle pond environ 200 œufs à la surface d’une flaque ; dix jours plus tard, des centaines de moustiques peuvent transmettre le paludisme. Une vache ne porte qu’un veau par an. Les animaux se reproduisent de façons très différentes, et connaître ces cycles aide à élever le bétail… ou à lutter contre les moustiques.',
  objectives: [
    'distinguer fécondation externe et fécondation interne ;',
    'distinguer animaux ovipares et vivipares ;',
    'décrire un développement direct et un développement avec métamorphose ;',
    'citer des modes de reproduction asexuée.',
  ],
  sections: [
    {
      title: 'La reproduction sexuée',
      blocks: [
        {
          kind: 'table',
          head: ['', 'Fécondation externe', 'Fécondation interne'],
          rows: [
            ['où ?', 'dans l’eau, hors du corps de la femelle', 'dans les voies génitales de la femelle'],
            ['exemples', 'la plupart des poissons, les grenouilles', 'oiseaux, reptiles, mammifères, insectes'],
            ['nombre de gamètes', 'très grand (beaucoup sont perdus)', 'plus faible'],
          ],
        },
        {
          kind: 'list',
          items: [
            '**ovipares** : la femelle pond des œufs qui se développent hors de son corps (poules, crocodiles, moustiques) ;',
            '**vivipares** : l’embryon se développe dans le corps de la mère, nourri par un placenta (vache, chèvre, homme).',
          ],
        },
      ],
    },
    {
      title: 'Le développement',
      blocks: [
        {
          kind: 'text',
          text: 'Chez les mammifères et les oiseaux, le jeune ressemble à l’adulte : **développement direct**. Chez de nombreux insectes et les grenouilles, la larve est très différente de l’adulte et se transforme : c’est la **métamorphose**.',
        },
        {
          kind: 'example',
          title: 'le cycle du moustique',
          text: 'œuf → larve (aquatique) → nymphe (aquatique) → adulte (aérien).',
          steps: ['Les larves et les nymphes vivent dans les eaux stagnantes : flaques, pneus abandonnés, boîtes de conserve, bidons ouverts.', 'Le cycle dure environ 10 jours en saison chaude.'],
        },
        {
          kind: 'callout',
          variant: 'remarque',
          title: 'Reproduction asexuée',
          blocks: [
            {
              kind: 'text',
              text: 'Certains animaux se reproduisent sans gamètes : par **bourgeonnement** (l’hydre), par **fragmentation** (la planaire), ou par **parthénogenèse** (développement d’un ovule non fécondé, chez les pucerons ou les abeilles mâles).',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Tous les animaux qui pondent des œufs ont une fécondation externe. »',
          why: 'La poule pond des œufs, mais la fécondation a eu lieu à l’intérieur de son corps.',
          reflex: 'Ovipare/vivipare concerne le développement ; externe/interne concerne la fécondation.',
        },
      ],
    },
  ],
  essentials: [
    'Fécondation externe (dans l’eau) ou interne.',
    'Ovipares (pondent des œufs) et vivipares (développement dans la mère).',
    'Développement direct ou avec métamorphose (moustique : œuf, larve, nymphe, adulte).',
    'Reproduction asexuée : bourgeonnement, fragmentation, parthénogenèse.',
  ],
  exercises: [
    {
      id: 'anim-moustique',
      level: 1,
      title: 'Les pontes d’une anophèle',
      statement: 'Une femelle d’anophèle pond environ 200 œufs à chaque ponte, et pond 3 fois dans sa vie. On suppose que 10 % des œufs donnent des adultes.',
      parts: [
        {
          label: 'Nombre total d’œufs pondus.',
          answer: { kind: 'number', value: 600, tolerance: 0, unit: '' },
          steps: ['$3 \\times 200 = 600$.'],
        },
        {
          label: 'Nombre de moustiques adultes issus de cette femelle.',
          answer: { kind: 'number', value: 60, tolerance: 0, unit: '' },
          steps: ['$600 \\times 0{,}10 = 60$ : d’où l’intérêt de supprimer les gîtes larvaires.'],
        },
      ],
    },
    {
      id: 'anim-classer',
      level: 2,
      title: 'Classer',
      statement: 'Réponds « interne » ou « externe ».',
      parts: [
        {
          label: 'La fécondation chez le poisson-chat (silure) du fleuve.',
          answer: { kind: 'text', display: 'externe', accepted: ['externe', 'fécondation externe'] },
          steps: ['Les gamètes sont libérés dans l’eau.'],
        },
        {
          label: 'La fécondation chez la poule.',
          answer: { kind: 'text', display: 'interne', accepted: ['interne', 'fécondation interne'] },
          steps: ['La poule pond un œuf déjà fécondé à l’intérieur de son corps.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un animal vivipare :',
      choices: ['porte ses petits dans son corps', 'pond des œufs', 'n’a pas de fécondation', 'se reproduit par bourgeonnement'],
      answer: 0,
      explanation: 'Comme la vache, la chèvre ou l’homme.',
    },
    {
      question: 'Les larves de moustiques vivent :',
      choices: ['dans l’eau stagnante', 'dans l’air', 'dans le sang', 'dans le sol sec'],
      answer: 0,
      explanation: 'C’est là qu’il faut les combattre.',
    },
    {
      question: 'La métamorphose est :',
      choices: ['la transformation d’une larve en adulte très différent', 'la fécondation', 'la ponte', 'la mue d’un serpent'],
      answer: 0,
      explanation: 'Têtard → grenouille, larve → moustique…',
    },
    {
      question: 'Le bourgeonnement de l’hydre est une reproduction :',
      choices: ['asexuée', 'sexuée', 'interne', 'vivipare'],
      answer: 0,
      explanation: 'Sans gamètes : un nouvel individu pousse sur le parent.',
    },
  ],
  applications: [
    {
      title: 'La lutte contre les gîtes larvaires',
      tagline: 'Supprimer les moustiques avant qu’ils ne volent',
      situation:
        'Avant la saison des pluies, le comité de santé du quartier organise une journée de salubrité : on vide les récipients, on bouche les flaques, on enlève les vieux pneus.',
      model: 'Le moustique a besoin d’eau stagnante pour ses stades larvaire et nymphal.',
      questions: ['Pourquoi ces actions réduisent-elles le paludisme ?', 'Pourquoi les faire régulièrement ?'],
      solution: [
        'Sans eau stagnante, les œufs ne peuvent pas se développer : moins d’anophèles adultes, donc moins de transmission du parasite.',
        'Le cycle ne dure qu’une dizaine de jours : une flaque oubliée suffit à produire une nouvelle génération.',
      ],
      fact: 'La moustiquaire imprégnée reste la protection la plus efficace la nuit, quand les anophèles piquent.',
    },
  ],
};
