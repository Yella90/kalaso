import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un grain de mil pèse quelques milligrammes ; la plante qui en sort, quelques mois plus tard, pèse des centaines de grammes. D’où vient toute cette matière ? Pas du sol, comme on l’a longtemps cru : surtout de l’air. Grâce à la lumière du soleil, la feuille transforme le dioxyde de carbone et l’eau en sucre. C’est la **photosynthèse**.',
  objectives: [
    'écrire le bilan de la photosynthèse ;',
    'mettre en évidence la production d’amidon et de dioxygène ;',
    'citer le rôle de la chlorophylle et des chloroplastes ;',
    'expliquer l’effet de la lumière, du CO₂ et de la température.',
  ],
  sections: [
    {
      title: 'Le bilan de la photosynthèse',
      blocks: [
        {
          kind: 'formula',
          tex: '6\\,\\ce{CO2} + 6\\,\\ce{H2O} \\xrightarrow{\\text{lumière, chlorophylle}} \\ce{C6H12O6} + 6\\,\\ce{O2}',
          legend: ['dioxyde de carbone + eau → glucose + dioxygène'],
        },
        {
          kind: 'list',
          items: [
            'le **CO₂** entre par les **stomates**, de petits orifices de la feuille ;',
            'l’**eau** et les sels minéraux montent des racines par la **sève brute** ;',
            'le glucose est transformé en **amidon** (réserve) ou envoyé dans toute la plante par la **sève élaborée**.',
          ],
        },
        { kind: 'photo', id: 'stomate', caption: 'Un stomate : deux cellules en forme de haricot entourent l’orifice par lequel entre le CO₂.' },
      ],
    },
    {
      title: 'Les preuves expérimentales',
      blocks: [
        {
          kind: 'example',
          title: 'l’amidon dans la feuille',
          text: 'On cache une partie d’une feuille avec un papier noir pendant 24 h au soleil, puis on la décolore à l’alcool chaud et on la plonge dans l’eau iodée.',
          steps: ['La partie éclairée devient bleu-noir : elle contient de l’amidon.', 'La partie cachée reste jaune : sans lumière, pas d’amidon.'],
        },
        {
          kind: 'example',
          title: 'le dioxygène de l’élodée',
          text: 'Une plante aquatique (élodée) éclairée dégage des bulles. Le gaz recueilli rallume une bûchette incandescente : c’est du dioxygène.',
        },
        { kind: 'photo', id: 'elodee', caption: 'Cellules d’élodée : chaque grain vert est un chloroplaste, lieu de la photosynthèse.' },
      ],
    },
    {
      title: 'Les facteurs de la photosynthèse',
      blocks: [
        {
          kind: 'text',
          text: 'Le dégagement de dioxygène augmente avec l’éclairement, la teneur en CO₂ et la température (jusqu’à environ 30 °C), puis plafonne.',
        },
        {
          kind: 'rule',
          text: 'Le **facteur limitant** est celui qui, à un moment donné, empêche la photosynthèse d’aller plus vite : augmenter les autres ne sert à rien.',
        },
        {
          kind: 'trap',
          wrong: '« Les plantes font la photosynthèse le jour et respirent la nuit. »',
          why: 'Les plantes respirent jour et nuit ; le jour, la photosynthèse produit beaucoup plus de dioxygène que la respiration n’en consomme.',
          reflex: 'Respiration : toujours ; photosynthèse : seulement à la lumière.',
        },
      ],
    },
  ],
  essentials: [
    '6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂, grâce à la lumière et à la chlorophylle.',
    'Elle a lieu dans les chloroplastes des parties vertes ; le CO₂ entre par les stomates.',
    'Preuves : amidon (eau iodée bleu-noir) et dégagement de dioxygène.',
    'Facteurs : lumière, CO₂, température ; le facteur limitant fixe la vitesse.',
  ],
  simulationTasks: [
    'augmente l’éclairement et compte les bulles de dioxygène ;',
    'mets un éclairement fort et peu de CO₂ : quel est le facteur limitant ?',
    'monte la température au-delà de 40 °C : que se passe-t-il ?',
  ],
  exercises: [
    {
      id: 'ph-bilan',
      level: 1,
      title: 'Le bilan en masse',
      statement: 'Masses molaires : CO₂ = 44 g/mol, glucose C₆H₁₂O₆ = 180 g/mol, O₂ = 32 g/mol.',
      parts: [
        {
          label: 'Masse de glucose produite à partir de 264 g de CO₂ (6 mol), en g.',
          answer: { kind: 'number', value: 180, tolerance: 1, unit: 'g' },
          steps: ['$\\dfrac{264}{44} = 6$ mol de CO₂ donnent 1 mol de glucose, soit 180 g.'],
        },
        {
          label: 'Masse de dioxygène libérée en même temps, en g.',
          answer: { kind: 'number', value: 192, tolerance: 1, unit: 'g' },
          steps: ['6 mol de O₂ : $6 \\times 32 = 192$ g.'],
        },
      ],
    },
    {
      id: 'ph-bulles',
      level: 2,
      title: 'L’élodée sous la lampe',
      statement: 'Une élodée dégage 12 bulles par minute à 20 cm d’une lampe, 30 bulles par minute à 10 cm, et encore 30 bulles par minute à 5 cm.',
      parts: [
        {
          label: 'Combien de bulles en 5 minutes à 10 cm ?',
          answer: { kind: 'number', value: 150, tolerance: 0, unit: '' },
          steps: ['$30 \\times 5 = 150$ bulles.'],
        },
        {
          label: 'Entre 10 cm et 5 cm, la lumière est-elle encore le facteur limitant ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'non', accepted: ['non'] },
          steps: ['Plus de lumière ne change plus rien : un autre facteur (CO₂, température) limite la photosynthèse.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le gaz absorbé par la feuille pour la photosynthèse est :',
      choices: ['le dioxyde de carbone', 'le dioxygène', 'le diazote', 'la vapeur d’eau'],
      answer: 0,
      explanation: 'Le CO₂ entre par les stomates.',
    },
    {
      question: 'L’eau iodée colore en bleu-noir :',
      choices: ['l’amidon', 'le glucose', 'la chlorophylle', 'les protéines'],
      answer: 0,
      explanation: 'C’est le test de l’amidon.',
    },
    {
      question: 'La photosynthèse a lieu dans :',
      choices: ['les chloroplastes', 'les mitochondries', 'le noyau', 'les racines'],
      answer: 0,
      explanation: 'Ils contiennent la chlorophylle.',
    },
    {
      question: 'La nuit, une plante :',
      choices: ['respire mais ne fait pas de photosynthèse', 'fait la photosynthèse mais ne respire pas', 'ne fait rien', 'fait les deux'],
      answer: 0,
      explanation: 'Sans lumière, pas de photosynthèse ; la respiration continue.',
    },
  ],
  applications: [
    {
      title: 'Les arbres de la Grande Muraille verte',
      tagline: 'Combien de CO₂ capte un arbre ?',
      situation:
        'Le Mali participe à la Grande Muraille verte, une bande d’arbres plantée à travers le Sahel. Un jeune arbre fixe environ 22 kg de CO₂ par an. Une commune plante 5 000 arbres.',
      model: 'Le CO₂ fixé par photosynthèse devient la matière du bois.',
      questions: ['Quelle masse de CO₂ ces arbres fixent-ils en un an, en tonnes ?', 'Pourquoi les arbres aident-ils aussi à lutter contre la désertification ?'],
      check: { value: 110, tolerance: 0.02, unit: 't' },
      solution: [
        '$5\\,000 \\times 22 = 110\\,000$ kg, soit 110 t de CO₂ par an.',
        'Leurs racines retiennent le sol contre l’érosion, leur ombre garde l’humidité et leurs feuilles mortes enrichissent la terre.',
      ],
      fact: 'Presque tout le dioxygène de l’air vient de la photosynthèse des plantes et des algues.',
    },
  ],
};
