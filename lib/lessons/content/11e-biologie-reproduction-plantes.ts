import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le manguier en fleurs bourdonne d’abeilles en février ; quelques mois plus tard, les branches ploient sous les mangues. Mais pour avoir les mêmes mangues que l’arbre parent, le pépiniériste ne sème pas les noyaux : il **greffe**. Les plantes se reproduisent de deux façons : par les fleurs (reproduction sexuée) et sans elles (multiplication végétative).',
  objectives: [
    'décrire les organes d’une fleur ;',
    'expliquer la pollinisation et la fécondation ;',
    'expliquer la formation du fruit et de la graine, et la germination ;',
    'décrire la multiplication végétative (bouture, greffe, tubercule).',
  ],
  sections: [
    {
      title: 'La fleur',
      blocks: [
        { kind: 'figure', id: 'fleur', caption: "Coupe d’une fleur." },
        {
          kind: 'table',
          head: ['Organe', 'Rôle'],
          rows: [
            ['sépales et pétales', 'protection ; les pétales colorés attirent les insectes'],
            ['étamines (filet + anthère)', 'organes mâles : l’anthère produit le **pollen**'],
            ['pistil (stigmate, style, ovaire)', 'organe femelle : l’ovaire contient les **ovules**'],
          ],
        },
      ],
    },
    {
      title: 'De la fleur au fruit',
      blocks: [
        {
          kind: 'list',
          items: [
            '**pollinisation** : transport du pollen de l’anthère au stigmate, par le vent ou par les animaux (abeilles, papillons, chauves-souris) ; elle peut être directe (même fleur) ou croisée (autre plante) ;',
            '**fécondation** : le grain de pollen germe sur le stigmate et forme un tube pollinique qui conduit les cellules mâles jusqu’à l’ovule ;',
            'après la fécondation, l’**ovule devient la graine** et l’**ovaire devient le fruit** ; les pétales tombent.',
          ],
        },
        {
          kind: 'rule',
          text: 'La germination d’une graine demande de l’**eau**, une **température** convenable et du **dioxygène**. La jeune plante utilise d’abord les réserves de la graine.',
        },
        {
          kind: 'trap',
          wrong: '« Le fruit provient de la fleur entière. »',
          why: 'C’est l’ovaire qui grossit pour devenir le fruit ; les ovules qu’il contient deviennent les graines.',
          reflex: 'Ovaire → fruit ; ovule → graine.',
        },
        { kind: 'photo', id: 'pollen', caption: 'Chaque espèce a des grains de pollen de forme différente.' },
      ],
    },
    {
      title: 'La multiplication végétative',
      blocks: [
        {
          kind: 'table',
          head: ['Technique', 'Principe', 'Exemples'],
          rows: [
            ['bouturage', 'un morceau de tige planté produit des racines', 'manioc, canne à sucre'],
            ['marcottage', 'une branche enterrée s’enracine avant d’être séparée', 'vigne, figuier'],
            ['greffage', 'un rameau (greffon) est fixé sur un porte-greffe enraciné', 'manguiers, agrumes'],
            ['organes de réserve', 'tubercules, bulbes, rhizomes donnent de nouvelles plantes', 'igname, pomme de terre, oignon'],
          ],
        },
        {
          kind: 'rule',
          text: 'La multiplication végétative donne des plantes **identiques** à la plante mère (des clones) : elle conserve les qualités d’une variété, mais pas la diversité.',
        },
      ],
    },
  ],
  essentials: [
    'Fleur : étamines (pollen) et pistil (ovaire, ovules).',
    'Pollinisation (vent, animaux) puis fécondation par le tube pollinique.',
    'Ovaire → fruit ; ovule → graine ; germination : eau, température, dioxygène.',
    'Multiplication végétative : bouture, marcotte, greffe, tubercule ; clones.',
  ],
  exercises: [
    {
      id: 'plante-organes',
      level: 1,
      title: 'Les organes de la fleur',
      statement: 'Réponds par un mot.',
      parts: [
        {
          label: 'Quel organe de la fleur devient le fruit ?',
          answer: { kind: 'text', display: 'ovaire', accepted: ['ovaire', "l'ovaire", 'l’ovaire'] },
          steps: ['L’ovaire grossit après la fécondation.'],
        },
        {
          label: 'Quelle partie de l’étamine produit le pollen ?',
          answer: { kind: 'text', display: 'anthère', accepted: ['anthère', 'anthere', "l'anthère", 'l’anthère'] },
          steps: ['L’anthère, au sommet du filet.'],
        },
      ],
    },
    {
      id: 'plante-germination',
      level: 2,
      title: 'Un test de germination',
      statement: 'Avant les semis, un paysan met 50 graines de niébé sur un coton humide : 45 germent.',
      parts: [
        {
          label: 'Taux de germination (en %).',
          answer: { kind: 'number', value: 90, tolerance: 0.1, unit: '%' },
          steps: ['$\\dfrac{45}{50} = 90$ %.'],
        },
        {
          label: 'Combien de graines doit-il semer pour espérer 900 plants ?',
          answer: { kind: 'number', value: 1000, tolerance: 0, unit: '' },
          steps: ['$\\dfrac{900}{0{,}90} = 1\\,000$ graines.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La pollinisation est :',
      choices: ['le transport du pollen jusqu’au stigmate', 'la germination de la graine', 'la chute des pétales', 'la formation du fruit'],
      answer: 0,
      explanation: 'Elle précède la fécondation.',
    },
    {
      question: 'La graine provient :',
      choices: ['de l’ovule', 'de l’ovaire', 'du pétale', 'de l’étamine'],
      answer: 0,
      explanation: 'L’ovaire, lui, donne le fruit.',
    },
    {
      question: 'Pour garder exactement les qualités d’un manguier, on :',
      choices: ['le greffe', 'sème son noyau', 'le taille', 'l’arrose davantage'],
      answer: 0,
      explanation: 'Le greffon donne des fruits identiques à ceux de l’arbre d’origine.',
    },
    {
      question: 'Une graine ne germe pas si elle manque :',
      choices: ['d’eau', 'de lumière forcément', 'de pétales', 'de pollen'],
      answer: 0,
      explanation: 'Eau, température convenable et dioxygène sont nécessaires.',
    },
  ],
  applications: [
    {
      title: 'Le verger de manguiers greffés',
      tagline: 'Pourquoi greffer plutôt que semer ?',
      situation:
        'Un pépiniériste de Sikasso greffe des rameaux de la variété Kent sur de jeunes manguiers issus de noyaux locaux, robustes.',
      model: 'Le porte-greffe apporte les racines ; le greffon détermine les fruits.',
      questions: ['Pourquoi les fruits seront-ils tous de la variété Kent ?', 'Quel est l’intérêt d’un porte-greffe local ?'],
      solution: [
        'Le greffon est un morceau de l’arbre Kent : ses cellules ont la même information génétique, les fruits seront identiques.',
        'Ses racines sont adaptées au sol et au climat locaux et résistent mieux à la sécheresse. De plus, un arbre greffé fructifie plus tôt qu’un arbre semé.',
      ],
      fact: 'Le Mali exporte des mangues greffées (Kent, Keitt, Amélie) vers l’Europe et les pays voisins.',
    },
  ],
};
