import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une feuille de mil, une goutte de sang, la peau d’un oignon : à l’œil nu, rien de commun. Au microscope, on découvre partout le même motif, répété des milliers de fois : de petites unités fermées, les **cellules**. Tous les êtres vivants en sont faits, de la bactérie au baobab.',
  objectives: [
    'utiliser un microscope et calculer un grossissement ;',
    'décrire une cellule animale et une cellule végétale ;',
    'citer les différences entre les deux ;',
    'calculer la taille réelle d’une cellule à partir d’une photo.',
  ],
  sections: [
    {
      title: 'Observer au microscope',
      blocks: [
        {
          kind: 'text',
          text: 'Les cellules mesurent en général de 10 à 100 µm (1 µm = 0,001 mm) : il faut un **microscope optique** pour les voir. On place une préparation fine entre lame et lamelle, souvent colorée (eau iodée, bleu de méthylène).',
        },
        {
          kind: 'formula',
          tex: 'G = G_{\\text{objectif}} \\times G_{\\text{oculaire}}',
          legend: ['par exemple : objectif ×40 et oculaire ×10 donnent un grossissement ×400'],
        },
        { kind: 'photo', id: 'oignon-epiderme', caption: 'Épiderme d’oignon au microscope : chaque case est une cellule entourée de sa paroi.' },
        {
          kind: 'formula',
          tex: '\\text{taille réelle} = \\dfrac{\\text{taille sur l’image}}{\\text{grossissement}}',
        },
      ],
    },
    {
      title: 'Cellule animale et cellule végétale',
      blocks: [
        { kind: 'figure', id: 'cellule-animale', caption: 'Cellule animale (schéma simplifié).' },
        { kind: 'figure', id: 'cellule-vegetale', caption: 'Cellule végétale : paroi, grande vacuole, chloroplastes.' },
        {
          kind: 'list',
          items: [
            'toute cellule a une **membrane plasmique**, un **cytoplasme** et, chez les animaux et les plantes, un **noyau** qui contient l’information génétique ;',
            'la cellule végétale a en plus une **paroi** rigide en cellulose, une grande **vacuole** et, dans les parties vertes, des **chloroplastes**.',
          ],
        },
        {
          kind: 'table',
          head: ['', 'Cellule animale', 'Cellule végétale'],
          rows: [
            ['membrane, cytoplasme, noyau', 'oui', 'oui'],
            ['paroi en cellulose', 'non', 'oui'],
            ['grande vacuole', 'non', 'oui'],
            ['chloroplastes', 'non', 'oui (parties vertes)'],
            ['forme', 'variable, souple', 'souvent polygonale, fixe'],
          ],
        },
        { kind: 'photo', id: 'chloroplastes-mousse', caption: 'Cellules d’une feuille : les grains verts sont les chloroplastes.' },
        {
          kind: 'rule',
          text: 'La cellule est l’**unité de structure** (tout être vivant est fait de cellules) et l’**unité de fonctionnement** du vivant (elle se nourrit, respire, se divise).',
        },
      ],
    },
  ],
  essentials: [
    'Grossissement du microscope = grossissement de l’objectif × grossissement de l’oculaire.',
    'Taille réelle = taille sur l’image ÷ grossissement.',
    'Toute cellule : membrane, cytoplasme, noyau (sauf les bactéries).',
    'Cellule végétale en plus : paroi, grande vacuole, chloroplastes.',
  ],
  simulationTasks: [
    'fais tourner la cellule animale et touche chaque organite pour lire son rôle ;',
    'passe à la cellule végétale : quels organites apparaissent, lesquels disparaissent ?',
    'relève les défis « trouve l’organite qui… ».',
  ],
  exercises: [
    {
      id: 'cel-grossissement',
      level: 1,
      title: 'Régler le microscope',
      statement: 'L’oculaire grossit 10 fois. On utilise successivement les objectifs ×4, ×10 et ×40.',
      parts: [
        {
          label: 'Grossissement total avec l’objectif ×40.',
          answer: { kind: 'number', value: 400, tolerance: 0, unit: '' },
          steps: ['$G = 40 \\times 10 = 400$.'],
        },
        {
          label: 'Grossissement total le plus faible.',
          answer: { kind: 'number', value: 40, tolerance: 0, unit: '' },
          steps: ['$4 \\times 10 = 40$ : on commence toujours par le plus faible pour trouver la zone à observer.'],
        },
      ],
    },
    {
      id: 'cel-taille',
      level: 2,
      title: 'La taille d’une cellule d’oignon',
      statement: 'Sur une photo prise au grossissement ×400, une cellule d’oignon mesure 8 cm de long.',
      parts: [
        {
          label: 'Longueur réelle de la cellule, en mm.',
          answer: { kind: 'number', value: 0.2, tolerance: 0.005, unit: 'mm' },
          steps: ['8 cm = 80 mm.', '$\\dfrac{80}{400} = 0{,}2$ mm.'],
        },
        {
          label: 'La même longueur en µm.',
          answer: { kind: 'number', value: 200, tolerance: 1, unit: 'µm' },
          steps: ['1 mm = 1 000 µm, donc $0{,}2$ mm = 200 µm.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Quel élément trouve-t-on chez la cellule végétale mais pas chez la cellule animale ?',
      choices: ['la paroi', 'le noyau', 'la membrane', 'le cytoplasme'],
      answer: 0,
      explanation: 'La paroi en cellulose est propre aux végétaux.',
    },
    {
      question: 'L’information génétique se trouve surtout dans :',
      choices: ['le noyau', 'la vacuole', 'la paroi', 'la membrane'],
      answer: 0,
      explanation: 'Le noyau contient l’ADN.',
    },
    {
      question: 'Une cellule de racine de mil (sous terre) possède-t-elle des chloroplastes ?',
      choices: ['non', 'oui', 'seulement le jour', 'seulement la nuit'],
      answer: 0,
      explanation: 'Les chloroplastes ne se trouvent que dans les parties vertes, éclairées.',
    },
    {
      question: 'Objectif ×10 et oculaire ×15 : le grossissement est :',
      choices: ['150', '25', '1,5', '1 500'],
      answer: 0,
      explanation: 'On multiplie : 10 × 15 = 150.',
    },
  ],
  applications: [
    {
      title: 'Le sang de Moussa au laboratoire',
      tagline: 'Compter et mesurer les globules',
      situation:
        'Au laboratoire du centre de santé, le technicien observe le sang de Moussa au grossissement ×1 000. Sur l’écran, un globule rouge mesure 7,5 mm de diamètre.',
      model: 'Taille réelle = taille sur l’image ÷ grossissement.',
      questions: ['Quel est le diamètre réel d’un globule rouge, en µm ?', 'Pourquoi le globule rouge n’a-t-il pas besoin de paroi ?'],
      check: { value: 7.5, tolerance: 0.02, unit: 'µm' },
      solution: [
        '$\\dfrac{7{,}5 \\text{ mm}}{1\\,000} = 0{,}0075$ mm = 7,5 µm.',
        'C’est une cellule animale : elle vit dans le sang, un milieu liquide stable, et doit au contraire rester souple pour passer dans les capillaires.',
      ],
      fact: 'Un adulte possède environ 25 000 milliards de globules rouges.',
    },
  ],
};
