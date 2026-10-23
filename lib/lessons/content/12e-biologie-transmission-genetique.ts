import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Nous avons tous commencé par une seule cellule, l’œuf. Aujourd’hui, notre corps en compte des dizaines de milliers de milliards, et chacune contient la même information génétique. Pour cela, avant chaque division, la cellule **copie** fidèlement son ADN, puis le **partage** exactement entre les deux cellules filles : c’est la **mitose**.',
  objectives: [
    'décrire le cycle cellulaire et l’évolution de la quantité d’ADN ;',
    'décrire les phases de la mitose ;',
    'expliquer la réplication semi-conservative de l’ADN ;',
    'montrer que la mitose conserve l’information génétique.',
  ],
  sections: [
    {
      title: 'Le cycle cellulaire',
      blocks: [
        {
          kind: 'table',
          head: ['Phase', 'Ce qui se passe', 'Quantité d’ADN'],
          rows: [
            ['G1', 'croissance de la cellule', '$q$'],
            ['S', '**réplication** de l’ADN', '$q \\to 2q$'],
            ['G2', 'préparation de la division', '$2q$'],
            ['mitose', 'partage des chromosomes', '$2q \\to q$ dans chaque cellule fille'],
          ],
        },
        {
          kind: 'text',
          text: 'G1, S et G2 forment l’**interphase**, de loin la plus longue. Le graphique de la quantité d’ADN en fonction du temps a donc une forme en « marches » : une montée pendant S, une chute brutale à la fin de la mitose.',
        },
      ],
    },
    {
      title: 'Les étapes de la mitose',
      blocks: [
        {
          kind: 'table',
          head: ['Étape', 'Observation'],
          rows: [
            ['prophase', 'les chromosomes, à deux chromatides, se condensent ; l’enveloppe du noyau disparaît ; le fuseau se forme'],
            ['métaphase', 'les chromosomes s’alignent à l’équateur de la cellule : **plaque équatoriale**'],
            ['anaphase', 'les chromatides de chaque chromosome se séparent et migrent vers les pôles opposés'],
            ['télophase', 'deux lots identiques de chromosomes ; deux noyaux se reforment ; le cytoplasme se divise'],
          ],
        },
        {
          kind: 'rule',
          text: 'La mitose donne deux cellules filles qui ont le **même nombre** de chromosomes ($2n$) et la **même information génétique** que la cellule mère.',
        },
      ],
    },
    {
      title: 'La réplication de l’ADN',
      blocks: [
        {
          kind: 'text',
          text: 'Pendant la phase S, la double hélice s’ouvre. Chaque brin sert de **modèle** : l’ADN polymérase place en face de chaque base la base complémentaire (A face à T, G face à C).',
        },
        {
          kind: 'rule',
          text: 'La réplication est **semi-conservative** : chaque molécule fille contient un brin ancien et un brin nouveau (expérience de Meselson et Stahl, 1958).',
        },
        {
          kind: 'example',
          title: 'Meselson et Stahl',
          text: 'Des bactéries cultivées sur azote lourd ($^{15}$N) sont transférées sur azote léger ($^{14}$N).',
          steps: ['Après une division : tout l’ADN est « hybride » (un brin lourd, un brin léger).', 'Après deux divisions : moitié hybride, moitié léger. C’est exactement ce que prévoit le modèle semi-conservatif.'],
        },
        {
          kind: 'trap',
          wrong: '« Pendant la mitose, la cellule copie son ADN. »',
          why: 'La copie a lieu avant, en phase S de l’interphase ; la mitose ne fait que partager.',
          reflex: 'Réplication en S, partage en mitose.',
        },
      ],
    },
  ],
  essentials: [
    'Cycle : G1 ($q$), S (réplication, $q \\to 2q$), G2 ($2q$), mitose ($2q \\to q$).',
    'Mitose : prophase, métaphase (plaque équatoriale), anaphase (séparation des chromatides), télophase.',
    'Deux cellules filles identiques à la cellule mère ($2n$).',
    'Réplication semi-conservative, fondée sur la complémentarité des bases.',
  ],
  simulationTasks: [
    "suis une mitose phase par phase et compte les chromosomes et les chromatides à chaque étape ;",
    "vérifie que les deux cellules filles ont les mêmes chromosomes que la cellule mère.",
  ],
  exercises: [
    {
      id: 'mitose-adn',
      level: 1,
      title: 'Quantité d’ADN',
      statement: 'Une cellule humaine en phase G1 contient 6,6 pg d’ADN (1 pg = $10^{-12}$ g).',
      parts: [
        {
          label: 'Quelle quantité d’ADN contient-elle en G2 (en pg) ?',
          answer: { kind: 'number', value: 13.2, tolerance: 0.05, unit: 'pg' },
          steps: ['La réplication en phase S double la quantité : 13,2 pg.'],
        },
        {
          label: 'Et chaque cellule fille après la mitose (en pg) ?',
          answer: { kind: 'number', value: 6.6, tolerance: 0.05, unit: 'pg' },
          steps: ['Le partage rend la quantité initiale : 6,6 pg.'],
        },
      ],
    },
    {
      id: 'mitose-meselson',
      level: 2,
      title: 'Meselson et Stahl',
      statement: 'Des bactéries à ADN entièrement lourd ($^{15}$N) sont placées sur un milieu à $^{14}$N.',
      parts: [
        {
          label: 'Après deux générations, quel pourcentage des molécules d’ADN est hybride ?',
          answer: { kind: 'number', value: 50, tolerance: 0, unit: '%' },
          steps: ['1ʳᵉ génération : 2 molécules hybrides.', '2ᵉ génération : chaque hybride donne 1 hybride et 1 légère : 2 hybrides sur 4, soit 50 %.'],
        },
        {
          label: 'Et après trois générations ?',
          answer: { kind: 'number', value: 25, tolerance: 0, unit: '%' },
          steps: ['Toujours 2 molécules hybrides, sur 8 : 25 %.'],
        },
      ],
    },
    {
      id: 'mitose-nombre',
      level: 3,
      title: 'Des divisions successives',
      statement: 'Une cellule se divise par mitose toutes les 24 heures ; toutes les cellules filles se divisent aussi.',
      parts: [
        {
          label: 'Combien de cellules obtient-on après 10 jours ?',
          answer: { kind: 'number', value: 1024, tolerance: 0, unit: '' },
          steps: ['Le nombre double à chaque division : $2^{10} = 1\\,024$ cellules.'],
        },
        {
          label: 'Combien de chromosomes possède chacune de ces cellules humaines ?',
          answer: { kind: 'number', value: 46, tolerance: 0, unit: '' },
          steps: ['La mitose conserve le nombre de chromosomes : 46.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La réplication de l’ADN a lieu pendant :',
      choices: ['la phase S', 'la métaphase', 'l’anaphase', 'la phase G1'],
      answer: 0,
      explanation: 'S comme synthèse.',
    },
    {
      question: 'À l’anaphase de mitose :',
      choices: ['les chromatides se séparent', 'les chromosomes s’alignent à l’équateur', 'l’ADN se réplique', 'le noyau se reforme'],
      answer: 0,
      explanation: 'Chaque chromatide migre vers un pôle.',
    },
    {
      question: 'Une cellule à $2n = 46$ donne par mitose deux cellules à :',
      choices: ['46 chromosomes', '23 chromosomes', '92 chromosomes', '44 chromosomes'],
      answer: 0,
      explanation: 'La mitose conserve le nombre de chromosomes.',
    },
    {
      question: 'La réplication est dite semi-conservative car :',
      choices: ['chaque ADN fille garde un brin de l’ADN parent', 'la moitié de l’ADN est perdue', 'seule la moitié des gènes est copiée', 'elle n’a lieu qu’une fois sur deux'],
      answer: 0,
      explanation: 'Un brin ancien, un brin nouveau.',
    },
  ],
  applications: [
    {
      title: 'Les boutures de manioc',
      tagline: 'Pourquoi tous les pieds sont-ils identiques ?',
      situation:
        'Pour planter du manioc, on ne sème pas de graines : on enfonce des morceaux de tige (boutures) dans le sol. Toutes les plantes d’une même variété sont alors identiques.',
      model: 'La bouture se développe uniquement par mitoses.',
      questions: ['Pourquoi les plants issus de boutures sont-ils génétiquement identiques à la plante mère ?', 'Quel risque cela présente-t-il face à une maladie ?'],
      solution: [
        'Les mitoses produisent des cellules avec la même information génétique : chaque plant est un clone de la plante mère.',
        'Si une maladie (comme la mosaïque du manioc) touche une variété, tous les plants sont également sensibles : on peut perdre toute la récolte. D’où l’intérêt de garder plusieurs variétés.',
      ],
      fact: 'Le cancer est dû à des cellules qui se divisent par mitose sans plus obéir aux signaux qui contrôlent le cycle cellulaire.',
    },
  ],
};
