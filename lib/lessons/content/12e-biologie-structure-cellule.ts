import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une feuille de baobab, un muscle de la cuisse, la bactérie du choléra : tous sont faits de **cellules**, des unités si petites qu’il en faudrait une centaine côte à côte pour faire un millimètre. Au microscope électronique, chacune se révèle être une véritable usine, avec ses ateliers spécialisés : les **organites**.',
  objectives: [
    'décrire l’ultrastructure d’une cellule animale et d’une cellule végétale ;',
    'associer chaque organite à sa fonction ;',
    'distinguer cellule eucaryote et cellule procaryote ;',
    'calculer une taille réelle à partir d’un grossissement.',
  ],
  sections: [
    {
      title: 'Observer les cellules',
      blocks: [
        {
          kind: 'text',
          text: 'Le **microscope optique** grossit jusqu’à environ 1 000 fois : on y voit le noyau, le cytoplasme, la membrane, les chloroplastes. Le **microscope électronique** grossit jusqu’à plus de 100 000 fois : il révèle l’**ultrastructure**, c’est-à-dire le détail des organites.',
        },
        {
          kind: 'formula',
          tex: '\\text{taille réelle} = \\dfrac{\\text{taille sur l’image}}{\\text{grossissement}} \\qquad G_{microscope} = G_{objectif} \\times G_{oculaire}',
        },
        {
          kind: 'table',
          head: ['Objet', 'Taille'],
          rows: [
            ['cellule animale', '10 à 30 µm'],
            ['cellule végétale', '20 à 100 µm'],
            ['bactérie', '1 à 5 µm'],
            ['mitochondrie', 'environ 1 à 2 µm'],
            ['ribosome', 'environ 25 nm'],
          ],
        },
        { kind: 'photo', id: 'oignon-epiderme', caption: 'Au microscope optique, on distingue la paroi et le noyau de chaque cellule d’oignon.' },
        { kind: 'photo', id: 'chloroplastes-mousse', caption: 'Les grains verts sont des chloroplastes : ces cellules font la photosynthèse.' },
      ],
    },
    {
      title: 'Les organites et leurs fonctions',
      blocks: [
        { kind: 'figure', id: 'cellule-animale', caption: "Cellule animale (ultrastructure simplifiée)." },
        { kind: 'figure', id: 'cellule-vegetale', caption: "Cellule végétale : paroi, grande vacuole et chloroplastes en plus." },
        {
          kind: 'table',
          head: ['Organite', 'Structure', 'Fonction'],
          rows: [
            ['membrane plasmique', 'bicouche de phospholipides avec des protéines (mosaïque fluide)', 'limite la cellule, contrôle les échanges'],
            ['noyau', 'double enveloppe percée de pores ; chromatine ; nucléole', 'contient l’ADN, dirige la cellule'],
            ['mitochondrie', 'double membrane, l’interne forme des crêtes ; matrice', 'respiration cellulaire, production d’ATP'],
            ['chloroplaste (végétaux)', 'double membrane ; thylakoïdes empilés dans le stroma', 'photosynthèse'],
            ['réticulum endoplasmique granuleux', 'sacs aplatis couverts de ribosomes', 'synthèse des protéines'],
            ['appareil de Golgi', 'pile de saccules et vésicules', 'maturation et sécrétion des protéines'],
            ['ribosomes', 'petits grains, libres ou fixés', 'assemblage des protéines'],
            ['vacuole (végétaux)', 'grande poche limitée par une membrane', 'réserve d’eau, turgescence'],
            ['paroi (végétaux)', 'cellulose et pectine', 'protège et soutient la cellule'],
          ],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'text',
              text: 'Seules les cellules végétales ont une **paroi**, des **chloroplastes** et une grande **vacuole**. Les deux types possèdent mitochondries, noyau, réticulum, Golgi et ribosomes.',
            },
          ],
        },
        { kind: 'photo', id: 'mitochondrie-meb', caption: 'Au microscope électronique, on voit les crêtes de la membrane interne de la mitochondrie.' },
        { kind: 'photo', id: 'chloroplaste-met', caption: 'Les empilements de membranes (thylakoïdes) portent la chlorophylle.' },
      ],
    },
    {
      title: 'Eucaryotes et procaryotes',
      blocks: [
        {
          kind: 'definition',
          term: 'Cellule eucaryote',
          text: 'cellule dont l’ADN est enfermé dans un **noyau** et qui possède des organites limités par des membranes (animaux, végétaux, champignons).',
        },
        {
          kind: 'definition',
          term: 'Cellule procaryote',
          text: 'cellule **sans noyau** ni organites membranaires : son ADN est libre dans le cytoplasme (les bactéries).',
        },
        {
          kind: 'trap',
          wrong: '« Les virus sont de très petites cellules. »',
          why: 'Un virus n’a ni cytoplasme ni ribosomes : il ne peut se multiplier qu’à l’intérieur d’une cellule.',
          reflex: 'Bactérie = cellule procaryote ; virus = particule non cellulaire.',
        },
      ],
    },
  ],
  essentials: [
    'La cellule est l’unité du vivant ; le microscope électronique révèle son ultrastructure.',
    'Noyau : ADN ; mitochondrie : respiration ; chloroplaste : photosynthèse ; REG et ribosomes : protéines ; Golgi : sécrétion.',
    'Cellule végétale : paroi, chloroplastes, grande vacuole en plus.',
    'Eucaryote : noyau ; procaryote (bactérie) : pas de noyau.',
  ],
  exercises: [
    {
      id: 'cell-taille',
      level: 1,
      title: 'Mesurer sur une photographie',
      statement: 'Sur une électronographie au grossissement × 2 000, une cellule du foie mesure 4,0 cm.',
      parts: [
        {
          label: 'Quelle est sa taille réelle (en µm) ?',
          answer: { kind: 'number', value: 20, tolerance: 0.2, unit: 'µm' },
          steps: ['4,0 cm = 40 000 µm.', '$\\dfrac{40\\,000}{2\\,000} = 20$ µm.'],
        },
        {
          label: 'Un microscope optique a un objectif × 40 et un oculaire × 10. Quel est son grossissement ?',
          answer: { kind: 'number', value: 400, tolerance: 0, unit: '' },
          steps: ['$40 \\times 10 = 400$.'],
        },
      ],
    },
    {
      id: 'cell-organites',
      level: 2,
      title: 'Reconnaître les organites',
      statement: 'Nomme l’organite décrit (un ou deux mots).',
      parts: [
        {
          label: 'Organite à double membrane dont la membrane interne forme des crêtes.',
          answer: { kind: 'text', display: 'mitochondrie', accepted: ['mitochondrie', 'la mitochondrie', 'mitochondries'] },
          steps: ['C’est la mitochondrie, siège de la respiration cellulaire.'],
        },
        {
          label: 'Organite contenant des thylakoïdes, présent dans les cellules des feuilles.',
          answer: { kind: 'text', display: 'chloroplaste', accepted: ['chloroplaste', 'le chloroplaste', 'chloroplastes'] },
          steps: ['Le chloroplaste réalise la photosynthèse.'],
        },
        {
          label: 'Pile de saccules qui emballe les protéines dans des vésicules de sécrétion.',
          answer: { kind: 'text', display: 'appareil de Golgi', accepted: ['appareil de golgi', 'golgi', 'l’appareil de golgi', "l'appareil de golgi", 'dictyosome'] },
          steps: ['L’appareil de Golgi assure la maturation et l’exportation des protéines.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Quel organite est absent des cellules animales ?',
      choices: ['le chloroplaste', 'la mitochondrie', 'le noyau', 'le ribosome'],
      answer: 0,
      explanation: 'Seuls les végétaux (et les algues) font la photosynthèse.',
    },
    {
      question: 'Une bactérie est une cellule :',
      choices: ['procaryote', 'eucaryote', 'végétale', 'sans ADN'],
      answer: 0,
      explanation: 'Son ADN n’est pas enfermé dans un noyau.',
    },
    {
      question: 'La membrane plasmique est surtout formée :',
      choices: ['d’une bicouche de phospholipides et de protéines', 'de cellulose', 'd’ADN', 'd’amidon'],
      answer: 0,
      explanation: 'C’est le modèle de la mosaïque fluide ; la cellulose forme la paroi des végétaux.',
    },
    {
      question: 'Les protéines destinées à être exportées sont fabriquées par :',
      choices: ['les ribosomes du réticulum granuleux', 'la mitochondrie', 'la vacuole', 'le nucléole seul'],
      answer: 0,
      explanation: 'Puis elles passent par l’appareil de Golgi avant d’être sécrétées.',
    },
    {
      question: '1 µm vaut :',
      choices: ['0,001 mm', '0,01 mm', '0,1 mm', '1 nm'],
      answer: 0,
      explanation: '1 mm = 1 000 µm.',
    },
  ],
  applications: [
    {
      title: 'Pourquoi un antibiotique ne guérit pas le rhume',
      tagline: 'Bactéries, virus et cellules humaines',
      situation:
        'Au centre de santé, l’infirmier explique qu’un antibiotique soigne une angine bactérienne, mais pas un rhume causé par un virus. Beaucoup d’antibiotiques bloquent les ribosomes ou la paroi des bactéries.',
      model: 'On compare l’organisation d’une bactérie, d’un virus et d’une cellule humaine.',
      questions: ['Pourquoi un antibiotique qui attaque la paroi bactérienne n’abîme-t-il pas nos cellules ?', 'Pourquoi n’agit-il pas sur un virus ?'],
      solution: [
        'Nos cellules n’ont pas de paroi, et leurs ribosomes sont différents de ceux des bactéries : l’antibiotique ne les touche pas.',
        'Un virus n’a ni paroi ni ribosomes : il n’y a rien à bloquer. Prendre un antibiotique sans raison favorise en plus l’apparition de bactéries résistantes.',
      ],
    },
  ],
};
