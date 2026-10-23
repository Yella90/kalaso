import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une coupure au doigt se referme en quelques jours : de nouvelles cellules ont remplacé celles qui ont été détruites. Un enfant grandit parce que ses cellules se multiplient. Et pour fabriquer les gamètes, les cellules se divisent autrement, en réduisant de moitié leur nombre de chromosomes. Ce sont les deux divisions cellulaires : la **mitose** et la **méiose**.',
  objectives: [
    'décrire les étapes de la mitose ;',
    'expliquer que la mitose conserve le nombre de chromosomes ;',
    'décrire les deux divisions de la méiose ;',
    'comparer mitose et méiose (rôle, nombre de cellules, chromosomes).',
  ],
  sections: [
    {
      title: 'La mitose',
      blocks: [
        { kind: 'figure', id: 'chromosome', caption: "Avant la division, chaque chromosome a deux chromatides." },
        {
          kind: 'text',
          text: 'Avant de se diviser, la cellule copie son ADN : chaque chromosome est alors formé de deux **chromatides** identiques. La mitose répartit ensuite exactement une chromatide de chaque chromosome dans chaque cellule fille.',
        },
        {
          kind: 'table',
          head: ['Étape', 'Observation'],
          rows: [
            ['prophase', 'les chromosomes deviennent visibles ; l’enveloppe du noyau disparaît'],
            ['métaphase', 'les chromosomes s’alignent au centre (plaque équatoriale)'],
            ['anaphase', 'les chromatides se séparent et migrent vers les pôles'],
            ['télophase', 'deux noyaux se forment ; la cellule se divise en deux'],
          ],
        },
        {
          kind: 'rule',
          text: 'Une cellule à $2n$ chromosomes donne par mitose **deux cellules identiques** à $2n$ chromosomes. La mitose assure la croissance, la réparation des tissus et la multiplication végétative.',
        },
        { kind: 'photo', id: 'mitose-racine' },
      ],
    },
    {
      title: 'La méiose',
      blocks: [
        {
          kind: 'text',
          text: 'La méiose a lieu dans les organes reproducteurs (testicules, ovaires, anthères, ovules). Elle comporte **deux divisions** successives.',
        },
        {
          kind: 'list',
          items: [
            '**première division** : les chromosomes homologues de chaque paire se séparent : on passe de $2n$ à $n$ chromosomes (à deux chromatides) ;',
            '**deuxième division** : les chromatides se séparent, comme dans une mitose.',
          ],
        },
        {
          kind: 'table',
          head: ['', 'Mitose', 'Méiose'],
          rows: [
            ['nombre de divisions', '1', '2'],
            ['cellules obtenues', '2, à $2n$', '4, à $n$'],
            ['cellules filles', 'identiques à la cellule mère', 'toutes différentes'],
            ['rôle', 'croissance, réparation', 'formation des gamètes'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« La méiose donne deux cellules comme la mitose. »',
          why: 'Elle enchaîne deux divisions : elle donne quatre cellules.',
          reflex: 'Mitose : 2 cellules $2n$ ; méiose : 4 cellules $n$.',
        },
      ],
    },
  ],
  essentials: [
    'Mitose : prophase, métaphase, anaphase, télophase ; 2 cellules identiques à $2n$.',
    'Méiose : 2 divisions ; 4 cellules à $n$, toutes différentes.',
    'Mitose : croissance et réparation ; méiose : gamètes.',
  ],
  simulationTasks: [
    "compare le nombre de cellules et de chromosomes à la fin d’une mitose et d’une méiose.",
  ],
  exercises: [
    {
      id: 'div-chromosomes',
      level: 1,
      title: 'Compter les chromosomes',
      statement: 'Une cellule de mil possède $2n = 14$ chromosomes.',
      parts: [
        {
          label: 'Nombre de chromosomes dans une cellule issue de mitose.',
          answer: { kind: 'number', value: 14, tolerance: 0, unit: '' },
          steps: ['La mitose conserve $2n = 14$.'],
        },
        {
          label: 'Nombre de chromosomes dans un grain de pollen (gamète).',
          answer: { kind: 'number', value: 7, tolerance: 0, unit: '' },
          steps: ['La méiose donne $n = 7$.'],
        },
        {
          label: 'Combien de cellules donne une cellule après une méiose complète ?',
          answer: { kind: 'number', value: 4, tolerance: 0, unit: '' },
          steps: ['Deux divisions successives : 4 cellules.'],
        },
      ],
    },
    {
      id: 'div-croissance',
      level: 2,
      title: 'Des mitoses successives',
      statement: 'Une cellule se divise par mitose toutes les 20 minutes (bactérie en culture).',
      parts: [
        {
          label: 'Nombre de cellules au bout de 2 heures, en partant d’une seule.',
          answer: { kind: 'number', value: 64, tolerance: 0, unit: '' },
          steps: ['6 divisions en 2 h : $2^6 = 64$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'À la métaphase, les chromosomes :',
      choices: ['s’alignent au centre de la cellule', 'se séparent', 'disparaissent', 'se copient'],
      answer: 0,
      explanation: 'Ils forment la plaque équatoriale.',
    },
    {
      question: 'La méiose produit :',
      choices: ['des gamètes à $n$ chromosomes', 'des cellules de peau', 'des cellules à $2n$', 'des cellules identiques'],
      answer: 0,
      explanation: 'Elle réduit de moitié le nombre de chromosomes.',
    },
    {
      question: 'La cicatrisation d’une plaie se fait grâce à :',
      choices: ['la mitose', 'la méiose', 'la fécondation', 'la digestion'],
      answer: 0,
      explanation: 'Les cellules voisines se multiplient pour combler la plaie.',
    },
    {
      question: 'Combien de divisions comporte la méiose ?',
      choices: ['2', '1', '3', '4'],
      answer: 0,
      explanation: 'Une division réductionnelle puis une division équationnelle.',
    },
  ],
  applications: [
    {
      title: 'La plaie qui se referme',
      tagline: 'Comment le corps répare la peau',
      situation: 'Fatou s’est coupée au doigt avec un couteau de cuisine. Une semaine plus tard, la plaie est refermée.',
      model: 'Les cellules de la peau autour de la plaie se divisent par mitose.',
      questions: ['Les nouvelles cellules ont-elles la même information génétique que les anciennes ?', 'Pourquoi faut-il garder la plaie propre ?'],
      solution: [
        'Oui : la mitose donne des cellules identiques, avec les mêmes 46 chromosomes.',
        'Une infection retarde la cicatrisation : les microbes détruisent des cellules et entretiennent l’inflammation.',
      ],
    },
  ],
};
