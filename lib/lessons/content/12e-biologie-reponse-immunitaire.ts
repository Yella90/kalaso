import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une épine dans le pied : la peau rougit, chauffe, gonfle et fait mal. Quelques jours plus tard, tout est rentré dans l’ordre. Un enfant qui a eu la rougeole ne l’attrape plus jamais. Derrière ces deux histoires, il y a deux lignes de défense : une **réponse immédiate**, la même contre tous les microbes, et une **réponse adaptative**, précise et dotée de mémoire.',
  objectives: [
    'décrire la réaction inflammatoire et la phagocytose ;',
    'décrire la réponse à médiation humorale (lymphocytes B, anticorps) ;',
    'décrire la réponse à médiation cellulaire (lymphocytes T cytotoxiques) ;',
    'expliquer le rôle des lymphocytes T4 et de la mémoire immunitaire.',
  ],
  sections: [
    {
      title: 'La réponse innée',
      blocks: [
        {
          kind: 'text',
          text: 'La peau et les muqueuses (avec leurs sécrétions : larmes, mucus, acidité de l’estomac) forment une première barrière. Si un microbe la franchit, la **réaction inflammatoire** se déclenche immédiatement : rougeur, chaleur, gonflement et douleur.',
        },
        {
          kind: 'definition',
          term: 'Phagocytose',
          text: 'les **phagocytes** (granulocytes, macrophages) englobent les microbes, les digèrent dans des vésicules, puis présentent des fragments (antigènes) aux lymphocytes.',
        },
        { kind: 'photo', id: 'phagocytose' },
      ],
    },
    {
      title: 'La réponse adaptative : lymphocytes B et anticorps',
      blocks: [
        { kind: 'figure', id: 'anticorps', caption: "Un anticorps fixe deux antigènes identiques." },
        {
          kind: 'text',
          text: 'Chaque lymphocyte B porte des récepteurs qui reconnaissent un seul antigène. Le lymphocyte qui reconnaît l’antigène est **sélectionné**, se multiplie (**amplification clonale**) et se transforme en **plasmocytes**, qui sécrètent des anticorps, et en lymphocytes B **mémoire**.',
        },
        {
          kind: 'definition',
          term: 'Anticorps',
          text: 'protéine en forme de Y (deux chaînes lourdes, deux chaînes légères) possédant **deux sites** identiques de fixation de l’antigène. Il forme avec l’antigène un **complexe immun**, qui neutralise le microbe ou la toxine et facilite sa phagocytose.',
        },
      ],
    },
    {
      title: 'La réponse adaptative : lymphocytes T',
      blocks: [
        {
          kind: 'list',
          items: [
            'les **lymphocytes T8 (CD8)** reconnaissent les cellules infectées et deviennent des **lymphocytes T cytotoxiques**, qui détruisent ces cellules ;',
            'les **lymphocytes T4 (CD4)**, ou auxiliaires, sécrètent des messagers chimiques, les **interleukines**, qui stimulent la multiplication et la différenciation des lymphocytes B et T8.',
          ],
        },
        {
          kind: 'rule',
          text: 'Les lymphocytes T4 sont le **chef d’orchestre** de la réponse adaptative : sans eux, ni les B ni les T8 ne fonctionnent bien.',
        },
        {
          kind: 'text',
          text: 'Après la guérison, des lymphocytes **mémoire** persistent. Au second contact avec le même antigène, la réponse est **plus rapide, plus forte et plus durable** : c’est la base de l’immunité acquise et de la vaccination.',
        },
        {
          kind: 'trap',
          wrong: '« Les anticorps tuent les virus cachés dans nos cellules. »',
          why: 'Les anticorps agissent dans le sang et les liquides ; ils n’entrent pas dans les cellules.',
          reflex: 'Microbes et toxines libres : anticorps ; cellules infectées : lymphocytes T cytotoxiques.',
        },
        { kind: 'photo', id: 'lymphocyte-t' },
      ],
    },
  ],
  essentials: [
    'Réponse innée : barrières, inflammation, phagocytose ; immédiate et non spécifique.',
    'Lymphocytes B → plasmocytes → anticorps (deux sites) → complexes immuns.',
    'Lymphocytes T8 → T cytotoxiques qui détruisent les cellules infectées ; T4 → interleukines qui activent B et T8.',
    'Mémoire : réponse secondaire plus rapide et plus forte.',
  ],
  simulationTasks: [
    "compare la hauteur et la date des pics des réponses primaire et secondaire ;",
    "déplace le second contact : la réponse secondaire change-t-elle ?",
  ],
  exercises: [
    {
      id: 'immun-acteurs',
      level: 1,
      title: 'Qui fait quoi ?',
      statement: 'Nomme la cellule (un ou deux mots).',
      parts: [
        {
          label: 'Cellule qui sécrète les anticorps.',
          answer: { kind: 'text', display: 'plasmocyte', accepted: ['plasmocyte', 'plasmocytes', 'le plasmocyte'] },
          steps: ['Les plasmocytes proviennent de la différenciation des lymphocytes B.'],
        },
        {
          label: 'Cellule qui détruit les cellules infectées par un virus.',
          answer: { kind: 'text', display: 'lymphocyte T cytotoxique', accepted: ['lymphocyte t cytotoxique', 'ltc', 't cytotoxique', 'lymphocytes t cytotoxiques', 'lymphocyte t8', 'lt8', 'cytotoxique'] },
          steps: ['Les lymphocytes T8 activés deviennent cytotoxiques.'],
        },
        {
          label: 'Combien de sites de fixation de l’antigène possède un anticorps ?',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['Un à l’extrémité de chaque bras du Y.'],
        },
      ],
    },
    {
      id: 'immun-memoire',
      level: 2,
      title: 'Réponse primaire et réponse secondaire',
      statement: 'Lors d’un premier contact, la quantité d’anticorps atteint son maximum après 14 jours et vaut 10 unités. Au second contact, le maximum est atteint en 5 jours et vaut 500 unités.',
      parts: [
        {
          label: 'Combien de jours gagne-t-on au second contact ?',
          answer: { kind: 'number', value: 9, tolerance: 0, unit: 'jours' },
          steps: ['$14 - 5 = 9$ jours.'],
        },
        {
          label: 'Par combien la quantité maximale d’anticorps est-elle multipliée ?',
          answer: { kind: 'number', value: 50, tolerance: 0, unit: '' },
          steps: ['$\\dfrac{500}{10} = 50$ : grâce aux lymphocytes B mémoire, plus nombreux que les B naïfs du premier contact.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Les signes de l’inflammation sont :',
      choices: ['rougeur, chaleur, gonflement, douleur', 'fièvre seulement', 'pâleur et froid', 'production d’anticorps immédiate'],
      answer: 0,
      explanation: 'Ce sont les quatre signes locaux de la réaction inflammatoire.',
    },
    {
      question: 'Les interleukines sont sécrétées par :',
      choices: ['les lymphocytes T4', 'les globules rouges', 'les plasmocytes', 'les plaquettes'],
      answer: 0,
      explanation: 'Elles activent les lymphocytes B et T8.',
    },
    {
      question: 'Un complexe immun est formé :',
      choices: ['d’un anticorps lié à un antigène', 'de deux lymphocytes', 'd’un virus et d’une cellule', 'd’un macrophage et d’une bactérie'],
      answer: 0,
      explanation: 'Il neutralise l’antigène et favorise sa phagocytose.',
    },
    {
      question: 'La réponse secondaire est plus efficace grâce :',
      choices: ['aux cellules mémoire', 'à la fièvre', 'aux antibiotiques', 'aux globules rouges'],
      answer: 0,
      explanation: 'Elles reconnaissent l’antigène d’emblée et sont plus nombreuses.',
    },
  ],
  applications: [
    {
      title: 'L’épine dans le pied',
      tagline: 'Pourquoi la plaie rougit-elle et gonfle-t-elle ?',
      situation:
        'En marchant pieds nus au champ, Seydou se plante une épine. Le lendemain, la zone est rouge, chaude, gonflée et douloureuse ; un peu de pus apparaît.',
      model: 'Réaction inflammatoire et phagocytose contre les bactéries apportées par l’épine.',
      questions: ['Pourquoi la zone devient-elle rouge et chaude ?', 'Que contient le pus ?'],
      solution: [
        'Les vaisseaux se dilatent pour amener plus de sang et de phagocytes : la zone rougit et chauffe ; du plasma passe dans les tissus, d’où le gonflement.',
        'Le pus est formé de phagocytes morts, de bactéries et de débris : c’est la trace du combat. Si la rougeur s’étend ou si la fièvre monte, il faut consulter.',
      ],
      fact: 'Le tétanos peut s’attraper par une plaie souillée de terre : la vaccination antitétanique protège pendant environ dix ans.',
    },
  ],
};
