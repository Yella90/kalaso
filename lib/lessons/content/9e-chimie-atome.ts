import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Coupe un morceau de fil de cuivre en deux, puis encore en deux, et ainsi de suite. Peut-on continuer sans fin ? Non : au bout d’un moment, on arrive à un grain de matière impossible à couper sans changer de nature. C’est l’**atome**. Il est tellement petit qu’une tête d’épingle en contient des milliards de milliards.',
  objectives: [
    'décrire l’atome : un noyau chargé positivement entouré d’électrons ;',
    'expliquer pourquoi un atome est électriquement neutre ;',
    'utiliser le numéro atomique $Z$ ;',
    'expliquer comment un atome devient un ion.',
  ],
  sections: [
    {
      title: 'Le modèle de l’atome',
      blocks: [
        {
          kind: 'definition',
          term: 'Atome',
          text: 'très petite particule de matière, formée d’un **noyau** au centre et d’**électrons** qui se déplacent autour.',
        },
        {
          kind: 'text',
          text: 'Le noyau porte une charge électrique **positive**. Chaque électron porte une charge **négative**. Entre le noyau et les électrons, il n’y a que du vide.',
        },
        {
          kind: 'text',
          text: 'Le noyau est très petit par rapport à l’atome : environ 100 000 fois plus petit. Mais presque toute la masse de l’atome se trouve dans le noyau.',
        },
      ],
    },
    {
      title: 'Le numéro atomique',
      blocks: [
        {
          kind: 'definition',
          term: 'Numéro atomique $Z$',
          text: 'nombre de charges positives du noyau. Chaque élément a son propre numéro atomique : l’hydrogène $Z = 1$, le carbone $Z = 6$, l’oxygène $Z = 8$, le cuivre $Z = 29$.',
        },
        {
          kind: 'rule',
          text: 'Un atome est **électriquement neutre** : il possède autant d’électrons que de charges positives dans son noyau, c’est-à-dire $Z$ électrons.',
        },
        {
          kind: 'example',
          title: 'l’atome d’oxygène',
          text: '$Z = 8$ : le noyau porte 8 charges positives, et 8 électrons tournent autour. $8 - 8 = 0$ : l’atome est neutre.',
        },
      ],
    },
    {
      title: 'Les ions',
      blocks: [
        {
          kind: 'definition',
          term: 'Ion',
          text: 'atome qui a **perdu** ou **gagné** des électrons. Il n’est plus neutre.',
        },
        {
          kind: 'table',
          head: ['L’atome…', 'Il devient…', 'Exemple'],
          rows: [
            ['perd des électrons', 'un ion **positif** (cation)', '$\\ce{Cu^{2+}}$ : le cuivre a perdu 2 électrons'],
            ['gagne des électrons', 'un ion **négatif** (anion)', '$\\ce{Cl-}$ : le chlore a gagné 1 électron'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Un ion positif a gagné des charges positives. »',
          why: 'Le noyau ne change pas. C’est parce qu’il a **perdu** des électrons (négatifs) que l’ion devient positif.',
          reflex: 'Ion $+$ = électrons perdus. Ion $-$ = électrons gagnés.',
        },
      ],
    },
  ],
  essentials: [
    'Un atome = un noyau positif entouré d’électrons négatifs.',
    'Le numéro atomique $Z$ = nombre de charges positives du noyau.',
    'Un atome neutre a $Z$ électrons.',
    'Un ion positif a perdu des électrons ; un ion négatif en a gagné.',
  ],
  simulationTasks: [
    'construire un atome d’oxygène ($Z = 8$) et vérifier qu’il est neutre ;',
    'retirer 2 électrons à un atome de magnésium ($Z = 12$) : quel ion obtiens-tu ?',
  ],
  exercises: [
    {
      id: 'neutralite',
      level: 1,
      statement: 'Le noyau de l’atome d’aluminium porte 13 charges positives.',
      questions: ['Quel est le numéro atomique de l’aluminium ?', 'Combien d’électrons possède l’atome ? Pourquoi ?'],
      solution: ['$Z = 13$.', '13 électrons, car l’atome est électriquement neutre.'],
    },
    {
      id: 'ion-cuivre',
      level: 1,
      statement: 'L’ion cuivre a pour formule $\\ce{Cu^{2+}}$. Le numéro atomique du cuivre est 29.',
      questions: ['L’atome a-t-il perdu ou gagné des électrons ? Combien ?', 'Combien d’électrons possède l’ion ?'],
      solution: ['Charge $2+$ : il a perdu 2 électrons.', '$29 - 2 = 27$ électrons.'],
    },
    {
      id: 'ion-inconnu',
      level: 2,
      statement: 'Un ion possède 10 électrons et un noyau portant 8 charges positives.',
      questions: ['Quel est l’élément ?', 'Quelle est la charge de l’ion ? Écris sa formule.'],
      hints: ['Le numéro atomique se lit sur le noyau, pas sur les électrons.'],
      solution: ['$Z = 8$ : c’est l’oxygène.', 'Il a 2 électrons de plus que de charges positives : charge $2-$, formule $\\ce{O^{2-}}$.'],
    },
  ],
  quiz: [
    {
      question: 'Le noyau d’un atome est chargé :',
      choices: ['positivement', 'négativement', 'il n’a pas de charge'],
      answer: 0,
      explanation: 'Le noyau est positif, les électrons sont négatifs.',
    },
    {
      question: 'Un atome de carbone ($Z = 6$) possède :',
      choices: ['3 électrons', '6 électrons', '12 électrons'],
      answer: 1,
      explanation: 'Un atome neutre a $Z$ électrons.',
    },
    {
      question: 'L’ion $\\ce{Na+}$ s’est formé :',
      choices: ['en gagnant un électron', 'en perdant un électron', 'en gagnant une charge positive'],
      answer: 1,
      explanation: 'Perdre un électron (négatif) rend l’ion positif.',
    },
    {
      question: 'La masse d’un atome se trouve surtout :',
      choices: ['dans ses électrons', 'dans son noyau', 'dans le vide autour du noyau'],
      answer: 1,
      explanation: 'Les électrons sont très légers ; presque toute la masse est dans le noyau.',
    },
  ],
  applications: [
    {
      title: 'Le fil de cuivre de la maison',
      situation:
        'Les fils électriques de la maison sont en cuivre. Quand le cuivre est exposé longtemps à l’air humide, il se couvre d’une couche verte : le vert-de-gris. Il contient des ions $\\ce{Cu^{2+}}$.',
      questions: [
        'Combien d’électrons possède un atome de cuivre ($Z = 29$) ?',
        'Combien d’électrons possède un ion $\\ce{Cu^{2+}}$ ?',
        'Le noyau a-t-il changé entre l’atome et l’ion ?',
      ],
      solution: ['29 électrons.', '27 électrons : il en a perdu 2.', 'Non : il porte toujours 29 charges positives. C’est toujours du cuivre.'],
    },
  ],
};
