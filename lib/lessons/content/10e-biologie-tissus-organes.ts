import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un corps humain compte environ 37 000 milliards de cellules. Elles ne sont pas toutes pareilles : un neurone peut mesurer un mètre de long, un globule rouge n’a pas de noyau, une cellule musculaire se contracte. Comment s’organisent-elles pour former un être vivant qui marche, mange et pense ?',
  objectives: [
    'définir tissu, organe, appareil et organisme ;',
    'citer les grands types de tissus animaux et végétaux ;',
    'relier la forme d’une cellule à sa fonction ;',
    'calculer des ordres de grandeur.',
  ],
  sections: [
    {
      title: 'Les niveaux d’organisation',
      blocks: [
        {
          kind: 'list',
          items: [
            '**cellule** : unité de base ;',
            '**tissu** : ensemble de cellules semblables qui remplissent la même fonction (tissu musculaire, nerveux…) ;',
            '**organe** : association de plusieurs tissus qui forment une structure (cœur, feuille, estomac) ;',
            '**appareil** (ou système) : ensemble d’organes qui coopèrent (appareil digestif, respiratoire) ;',
            '**organisme** : l’être vivant entier.',
          ],
        },
        {
          kind: 'example',
          title: 'l’estomac',
          text: 'L’estomac est un organe : un tissu épithélial qui sécrète le suc gastrique, des tissus musculaires qui brassent les aliments, un tissu nerveux qui commande, du tissu conjonctif qui relie le tout.',
        },
      ],
    },
    {
      title: 'Les tissus animaux',
      blocks: [
        {
          kind: 'table',
          head: ['Tissu', 'Rôle', 'Exemple'],
          rows: [
            ['épithélial', 'recouvrir, protéger, sécréter', 'peau, paroi de l’intestin'],
            ['conjonctif', 'relier, soutenir, transporter', 'os, cartilage, sang'],
            ['musculaire', 'se contracter, mouvoir', 'muscles des membres, cœur'],
            ['nerveux', 'recevoir et transmettre des messages', 'cerveau, nerfs'],
          ],
        },
        { kind: 'photo', id: 'villosites', caption: 'Coupe de l’intestin : le tissu épithélial forme des replis, les villosités, qui absorbent les nutriments.' },
        { kind: 'photo', id: 'neurone-culture', caption: 'Un neurone : sa forme ramifiée lui permet de recevoir et transmettre des messages.' },
      ],
    },
    {
      title: 'Les tissus végétaux',
      blocks: [
        {
          kind: 'table',
          head: ['Tissu', 'Rôle'],
          rows: [
            ['épiderme', 'protéger ; les stomates permettent les échanges gazeux'],
            ['parenchyme chlorophyllien', 'réaliser la photosynthèse'],
            ['xylème (vaisseaux du bois)', 'conduire la sève brute des racines vers les feuilles'],
            ['phloème (tubes criblés)', 'conduire la sève élaborée des feuilles vers toute la plante'],
            ['méristème', 'produire de nouvelles cellules (croissance)'],
          ],
        },
        {
          kind: 'rule',
          text: 'Chez tous les êtres pluricellulaires, les cellules sont **spécialisées** : leur forme est adaptée à leur fonction.',
        },
      ],
    },
  ],
  essentials: [
    'Cellule → tissu → organe → appareil → organisme.',
    'Tissus animaux : épithélial, conjonctif, musculaire, nerveux.',
    'Tissus végétaux : épiderme, parenchyme, xylème, phloème, méristème.',
    'La forme d’une cellule est adaptée à sa fonction.',
  ],
  exercises: [
    {
      id: 'to-niveaux',
      level: 1,
      title: 'Ranger les niveaux',
      statement: 'Réponds par un seul mot : cellule, tissu, organe ou appareil.',
      parts: [
        {
          label: 'Le cœur est un…',
          answer: { kind: 'text', display: 'organe', accepted: ['organe', 'un organe'] },
          steps: ['Il associe des tissus musculaire, nerveux, conjonctif et épithélial.'],
        },
        {
          label: 'Le sang est un…',
          answer: { kind: 'text', display: 'tissu', accepted: ['tissu', 'un tissu'] },
          steps: ['C’est un tissu conjonctif liquide.'],
        },
      ],
    },
    {
      id: 'to-neurone',
      level: 2,
      title: 'Le plus long neurone',
      statement: 'Le corps cellulaire d’un neurone de la moelle épinière mesure 0,1 mm ; son axone, qui va jusqu’au pied, mesure 1 m.',
      parts: [
        {
          label: 'Combien de fois l’axone est-il plus long que le corps cellulaire ?',
          answer: { kind: 'number', value: 10000, tolerance: 1, unit: '' },
          steps: ['1 m = 1 000 mm.', '$\\dfrac{1\\,000}{0{,}1} = 10\\,000$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Un ensemble de cellules semblables qui remplissent la même fonction forme :',
      choices: ['un tissu', 'un organe', 'un appareil', 'un organisme'],
      answer: 0,
      explanation: 'Plusieurs tissus forment un organe.',
    },
    {
      question: 'La sève brute circule dans :',
      choices: ['le xylème', 'le phloème', 'l’épiderme', 'le méristème'],
      answer: 0,
      explanation: 'Elle monte des racines aux feuilles dans les vaisseaux du bois.',
    },
    {
      question: 'Le tissu qui transmet les messages est le tissu :',
      choices: ['nerveux', 'musculaire', 'épithélial', 'conjonctif'],
      answer: 0,
      explanation: 'Il est formé de neurones.',
    },
    {
      question: 'L’appareil digestif est formé :',
      choices: ['de plusieurs organes', 'd’un seul tissu', 'd’une seule cellule', 'uniquement de muscles'],
      answer: 0,
      explanation: 'Bouche, œsophage, estomac, intestins, foie… coopèrent.',
    },
  ],
  applications: [
    {
      title: 'La greffe de manguier',
      tagline: 'Pourquoi faut-il bien aligner l’écorce ?',
      situation:
        'À Sikasso, un pépiniériste greffe un rameau de manguier « Kent » sur un jeune pied local. Il prend soin de faire coïncider la couche verte juste sous l’écorce des deux morceaux. Sur 40 greffes, 34 reprennent.',
      model: 'Sous l’écorce se trouvent le phloème et une zone de cellules qui se divisent (cambium).',
      questions: ['Quel est le taux de réussite, en % ?', 'Pourquoi faut-il aligner la couche sous l’écorce ?'],
      check: { value: 85, tolerance: 0.01, unit: '%' },
      solution: [
        '$\\dfrac{34}{40} \\times 100 = 85$ %.',
        'Les cellules qui se divisent doivent se souder pour reconstituer des vaisseaux continus : la sève peut alors circuler du pied au greffon.',
      ],
      fact: 'La greffe permet d’obtenir rapidement des arbres qui donnent tous les mêmes fruits que l’arbre d’origine.',
    },
  ],
};
