import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un enfant ressemble à ses parents, une graine de mangue donne un manguier et jamais un baobab. L’information qui fait chaque être vivant se transmet donc d’une génération à l’autre. Où se trouve-t-elle ? Il a fallu près d’un siècle d’expériences pour le prouver : dans une longue molécule en double hélice, l’**ADN**.',
  objectives: [
    'expliquer les expériences qui montrent que l’ADN porte l’information génétique ;',
    'décrire la structure de l’ADN et la complémentarité des bases ;',
    'relier ADN, chromatine, chromosomes et gènes ;',
    'lire un caryotype humain.',
  ],
  sections: [
    {
      title: 'L’ADN, molécule de l’hérédité',
      blocks: [
        {
          kind: 'list',
          items: [
            '**Griffith (1928)** : des pneumocoques inoffensifs (souche R), mélangés à des pneumocoques virulents (S) tués par la chaleur, deviennent virulents : un « principe transformant » est passé des bactéries mortes aux vivantes.',
            '**Avery (1944)** : ce principe transformant est détruit par une enzyme qui dégrade l’ADN, pas par celles qui dégradent les protéines : c’est l’**ADN**.',
            '**Hershey et Chase (1952)** : quand un virus infecte une bactérie, c’est son ADN (marqué au phosphore radioactif) qui entre, et non ses protéines.',
          ],
        },
        {
          kind: 'rule',
          text: 'Chez tous les êtres vivants, l’information génétique est portée par l’ADN (acide désoxyribonucléique).',
        },
      ],
    },
    {
      title: 'La structure de l’ADN',
      blocks: [
        { kind: 'figure', id: 'adn', caption: "La molécule d’ADN : deux brins reliés par des bases complémentaires." },
        {
          kind: 'definition',
          term: 'Nucléotide',
          text: 'unité de l’ADN, formée d’un **phosphate**, d’un sucre (le **désoxyribose**) et d’une **base azotée** : adénine (A), thymine (T), guanine (G) ou cytosine (C).',
        },
        {
          kind: 'text',
          text: 'L’ADN est formé de deux chaînes de nucléotides enroulées en **double hélice** (Watson et Crick, 1953). Les bases des deux chaînes se font face et s’associent toujours de la même façon : c’est la **complémentarité**.',
        },
        {
          kind: 'formula',
          tex: '\\text{A} \\leftrightarrow \\text{T} \\qquad \\text{G} \\leftrightarrow \\text{C} \\qquad \\%\\text{A} = \\%\\text{T},\\ \\%\\text{G} = \\%\\text{C}',
          legend: ['règle de Chargaff : dans un ADN double brin, A = T et G = C'],
        },
        {
          kind: 'example',
          title: 'écrire le brin complémentaire',
          text: 'Brin : ATG CCA TTG.',
          steps: ['A ↔ T et G ↔ C : brin complémentaire TAC GGT AAC.'],
        },
        {
          kind: 'text',
          text: 'L’information est dans l’**ordre** des bases (la séquence), comme le sens d’un message est dans l’ordre des lettres.',
        },
      ],
    },
    {
      title: 'Chromosomes et gènes',
      blocks: [
        { kind: 'figure', id: 'chromosome', caption: "Un chromosome après la réplication : deux chromatides identiques." },
        {
          kind: 'text',
          text: 'Dans le noyau, l’ADN est associé à des protéines : c’est la **chromatine**. Au moment de la division, elle se condense en **chromosomes** visibles au microscope. Après la réplication, un chromosome est formé de deux **chromatides** identiques reliées par le centromère.',
        },
        {
          kind: 'definition',
          term: 'Gène',
          text: 'portion d’ADN qui porte l’information d’un caractère (souvent, la fabrication d’une protéine). Il occupe une place précise, le **locus**, sur un chromosome. Ses différentes versions sont les **allèles**.',
        },
        {
          kind: 'definition',
          term: 'Caryotype',
          text: 'photographie des chromosomes d’une cellule, classés par paires. L’espèce humaine a **46 chromosomes** ($2n = 46$) : 22 paires d’autosomes et une paire de chromosomes sexuels, XX chez la femme, XY chez l’homme.',
        },
        {
          kind: 'trap',
          wrong: '« Un gène est une protéine. »',
          why: 'Le gène est un morceau d’ADN ; il contient l’information pour **fabriquer** une protéine.',
          reflex: 'ADN (gène) → information ; protéine → réalise le caractère.',
        },
      ],
    },
  ],
  essentials: [
    'Griffith, Avery, Hershey et Chase : l’ADN est le support de l’information génétique.',
    'ADN : double hélice de nucléotides ; A–T et G–C ; l’information est la séquence des bases.',
    'Chromatine → chromosomes (deux chromatides après réplication) ; gène = portion d’ADN à un locus ; allèles = versions d’un gène.',
    'Caryotype humain : $2n = 46$, XX ou XY.',
  ],
  exercises: [
    {
      id: 'adn-chargaff',
      level: 1,
      title: 'La règle de Chargaff',
      statement: 'Un ADN double brin contient 30 % d’adénine.',
      parts: [
        {
          label: 'Pourcentage de thymine.',
          answer: { kind: 'number', value: 30, tolerance: 0, unit: '%' },
          steps: ['A = T : 30 %.'],
        },
        {
          label: 'Pourcentage de guanine.',
          answer: { kind: 'number', value: 20, tolerance: 0, unit: '%' },
          steps: ['G + C = 100 − 60 = 40 %, et G = C : 20 %.'],
        },
      ],
    },
    {
      id: 'adn-complementaire',
      level: 2,
      title: 'Brin complémentaire et caryotype',
      statement: 'Un brin d’ADN a pour séquence ATG CCA TTG.',
      parts: [
        {
          label: 'Écris la séquence du brin complémentaire (sans espaces).',
          answer: { kind: 'text', display: 'TACGGTAAC', accepted: ['TACGGTAAC', 'TAC GGT AAC', 'tacggtaac'] },
          steps: ['A ↔ T, T ↔ A, G ↔ C, C ↔ G.'],
        },
        {
          label: 'Combien de chromosomes contient un spermatozoïde humain ?',
          answer: { kind: 'number', value: 23, tolerance: 0, unit: '' },
          steps: ['Les gamètes ont un seul chromosome de chaque paire : $n = 23$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans l’ADN, la guanine s’associe à :',
      choices: ['la cytosine', 'la thymine', 'l’adénine', 'l’uracile'],
      answer: 0,
      explanation: 'G–C et A–T.',
    },
    {
      question: 'L’expérience d’Avery a montré que le principe transformant est :',
      choices: ['l’ADN', 'une protéine', 'un sucre', 'un lipide'],
      answer: 0,
      explanation: 'Il est détruit par l’enzyme qui dégrade l’ADN.',
    },
    {
      question: 'Le sucre de l’ADN est :',
      choices: ['le désoxyribose', 'le glucose', 'le ribose', 'le saccharose'],
      answer: 0,
      explanation: 'L’ARN contient du ribose.',
    },
    {
      question: 'Le caryotype d’un homme comporte :',
      choices: ['44 autosomes, X et Y', '46 autosomes', '22 chromosomes, X et Y', '44 autosomes et deux X'],
      answer: 0,
      explanation: '22 paires d’autosomes + XY.',
    },
  ],
  applications: [
    {
      title: 'Identifier une personne par son ADN',
      tagline: 'Comment l’ADN aide la justice et les familles',
      situation:
        'Après un accident, des enquêteurs comparent l’ADN retrouvé avec celui des familles de disparus. Ils comparent des régions de l’ADN dont la longueur varie beaucoup d’une personne à l’autre.',
      model: 'Chaque personne a un ADN unique (sauf les vrais jumeaux) ; un enfant reçoit la moitié de son ADN de chaque parent.',
      questions: ['Pourquoi peut-on relier un enfant à ses parents par l’ADN ?', 'Pourquoi deux vrais jumeaux ne peuvent-ils pas être distingués ainsi ?'],
      solution: [
        'Chaque chromosome d’une paire vient d’un parent : on retrouve chez l’enfant, pour chaque région étudiée, une version venant de la mère et une venant du père.',
        'Ils proviennent du même œuf : ils ont exactement le même ADN.',
      ],
    },
  ],
};
