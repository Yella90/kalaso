import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un plat de riz sauce arachide contient de l’amidon, des protéines et des graisses. Pourtant, ce sont de petites molécules (glucose, acides aminés, acides gras) qui arrivent dans le sang. Entre les deux, le tube digestif, long de 8 à 9 mètres, découpe les aliments grâce à des **enzymes**, puis les fait passer dans le sang à travers l’intestin.',
  objectives: [
    'décrire l’appareil digestif et ses glandes annexes ;',
    'expliquer la digestion chimique par les enzymes et leurs propriétés ;',
    'nommer les nutriments obtenus à partir de chaque aliment ;',
    'expliquer l’absorption intestinale et le rôle des villosités.',
  ],
  sections: [
    {
      title: 'L’appareil digestif',
      blocks: [
        {
          kind: 'text',
          text: 'Le **tube digestif** comprend la bouche, l’œsophage, l’estomac, l’intestin grêle et le gros intestin. Des **glandes annexes** y déversent leurs sucs : glandes salivaires, foie (bile, stockée dans la vésicule biliaire) et pancréas (suc pancréatique).',
        },
        {
          kind: 'text',
          text: 'La digestion est **mécanique** (mastication, brassage par les muscles de l’estomac) et surtout **chimique** : les enzymes découpent les grosses molécules en nutriments.',
        },
      ],
    },
    {
      title: 'Les enzymes digestives',
      blocks: [
        {
          kind: 'table',
          head: ['Lieu', 'Suc et enzyme', 'Action'],
          rows: [
            ['bouche', 'salive : **amylase**', 'amidon → maltose'],
            ['estomac (très acide, pH ≈ 2)', 'suc gastrique : **pepsine**', 'protéines → peptides'],
            ['intestin grêle', 'suc pancréatique : amylase, **lipase**, trypsine ; bile', 'amidon, lipides, protéines ; la bile émulsionne les graisses (sans enzyme)'],
            ['intestin grêle', 'enzymes intestinales', 'fin de la digestion : glucose, acides aminés, acides gras et glycérol'],
          ],
        },
        {
          kind: 'rule',
          text: 'Une enzyme est **spécifique** (elle n’agit que sur un type de molécule) et n’agit bien qu’à une **température** (37 °C chez nous) et un **pH** précis. La chaleur intense la détruit ; le froid la ralentit.',
        },
        {
          kind: 'trap',
          wrong: '« La bile est une enzyme qui digère les graisses. »',
          why: 'La bile ne contient pas d’enzyme : elle disperse les graisses en fines gouttelettes, ce qui facilite l’action de la lipase.',
          reflex: 'Bile = émulsion ; lipase = digestion des lipides.',
        },
      ],
    },
    {
      title: 'L’absorption',
      blocks: [
        {
          kind: 'text',
          text: 'Les nutriments traversent la paroi de l’**intestin grêle**. Celle-ci est plissée et couverte de millions de **villosités**, elles-mêmes couvertes de microvillosités : la surface d’échange atteint environ 200 m², la taille d’un terrain de basket.',
        },
        {
          kind: 'list',
          items: [
            'le glucose et les acides aminés passent dans le **sang** et sont conduits au foie par la veine porte ;',
            'les acides gras passent surtout dans la **lymphe** ;',
            'le gros intestin absorbe l’eau ; les fibres non digérées forment les selles.',
          ],
        },
      ],
    },
  ],
  essentials: [
    'Tube digestif + glandes annexes (glandes salivaires, foie, pancréas).',
    'Enzymes spécifiques, actives à 37 °C et au bon pH : amylase, pepsine, lipase…',
    'Nutriments : glucose, acides aminés, acides gras et glycérol.',
    'Absorption dans l’intestin grêle (villosités, ~200 m²) : sang ou lymphe.',
  ],
  exercises: [
    {
      id: 'dig-enzymes',
      level: 1,
      title: 'Les enzymes',
      statement: 'Réponds par un mot.',
      parts: [
        {
          label: 'Enzyme de la salive qui digère l’amidon.',
          answer: { kind: 'text', display: 'amylase', accepted: ['amylase', "l'amylase", 'l’amylase', 'amylase salivaire'] },
          steps: ['L’amylase salivaire transforme l’amidon en maltose.'],
        },
        {
          label: 'Nutriment obtenu par la digestion complète des protéines.',
          answer: { kind: 'text', display: 'acides aminés', accepted: ['acides aminés', 'acides amines', 'acide aminé', 'acide amine', 'les acides aminés'] },
          steps: ['Les protéines sont des chaînes d’acides aminés.'],
        },
      ],
    },
    {
      id: 'dig-experience',
      level: 2,
      title: 'Une expérience sur l’amylase',
      statement: 'On met de l’empois d’amidon avec de la salive dans trois tubes, à 0 °C, 37 °C et 100 °C (salive bouillie). Après 15 minutes, on teste l’amidon à l’eau iodée (bleu-noir s’il reste de l’amidon).',
      parts: [
        {
          label: 'Dans quel tube (température en °C) l’eau iodée ne bleuit-elle pas ?',
          answer: { kind: 'number', value: 37, tolerance: 0, unit: '°C' },
          steps: ['À 37 °C, l’amylase a digéré l’amidon.'],
        },
        {
          label: 'Après avoir réchauffé le tube à 0 °C jusqu’à 37 °C, l’amidon disparaît-il ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['Le froid ralentit l’enzyme sans la détruire ; la chaleur intense, elle, la détruit définitivement.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'L’essentiel de l’absorption des nutriments a lieu dans :',
      choices: ['l’intestin grêle', 'l’estomac', 'la bouche', 'le gros intestin'],
      answer: 0,
      explanation: 'Grâce aux villosités.',
    },
    {
      question: 'La pepsine agit dans l’estomac parce que :',
      choices: ['elle fonctionne en milieu très acide', 'elle aime le froid', 'elle digère l’amidon', 'elle n’a pas besoin d’eau'],
      answer: 0,
      explanation: 'Son pH optimal est d’environ 2.',
    },
    {
      question: 'Les villosités intestinales servent à :',
      choices: ['augmenter la surface d’absorption', 'broyer les aliments', 'produire la bile', 'stocker le glucose'],
      answer: 0,
      explanation: 'Plus la surface est grande, plus les échanges sont rapides.',
    },
    {
      question: 'L’amidon est digéré en :',
      choices: ['glucose', 'acides aminés', 'acides gras', 'vitamines'],
      answer: 0,
      explanation: 'L’amidon est une longue chaîne de glucose.',
    },
  ],
  applications: [
    {
      title: 'Le plat de riz sauce arachide',
      tagline: 'Que devient chaque partie du repas ?',
      situation: 'Un élève mange un plat de riz (amidon) avec une sauce d’arachide (graisses et protéines) et un peu de viande (protéines).',
      model: 'On suit la digestion de chaque aliment jusqu’à l’absorption.',
      questions: ['Quel nutriment provient du riz, et par où passe-t-il ?', 'Pourquoi un repas très gras « pèse-t-il » longtemps sur l’estomac ?'],
      solution: [
        'Le riz donne du glucose, absorbé dans le sang de l’intestin grêle puis conduit au foie.',
        'Les graisses sont digérées lentement : il faut d’abord la bile pour les émulsionner, puis la lipase. L’estomac se vide plus lentement après un repas gras.',
      ],
    },
  ],
};
