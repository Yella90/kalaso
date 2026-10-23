import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le benzène, $\\ce{C6H6}$, a longtemps intrigué les chimistes : avec si peu d’hydrogène, il devrait être aussi réactif qu’un alcène, et pourtant il ne décolore pas l’eau de brome. La solution est venue d’un cycle de six carbones où les électrons sont partagés par tout l’anneau. Cette stabilité particulière définit les **composés aromatiques**, présents dans des médicaments, des colorants… et des polluants.',
  objectives: [
    'décrire la structure du benzène et la délocalisation des électrons ;',
    'expliquer pourquoi le benzène préfère la substitution à l’addition ;',
    'écrire des réactions de substitution (halogénation, nitration) ;',
    'connaître quelques dérivés aromatiques et leurs dangers.',
  ],
  sections: [
    {
      title: 'La structure du benzène',
      blocks: [
        {
          kind: 'text',
          text: 'La molécule de benzène est un **hexagone régulier plan** de six atomes de carbone, chacun lié à un atome d’hydrogène. Les six liaisons carbone-carbone ont toutes la même longueur (140 pm), intermédiaire entre une liaison simple et une liaison double.',
        },
        {
          kind: 'rule',
          text: 'On peut écrire le benzène avec trois doubles liaisons alternées (formule de Kekulé), mais en réalité six électrons sont **délocalisés** sur tout le cycle : on le représente souvent par un hexagone avec un cercle au centre. Cette délocalisation rend le cycle très stable.',
        },
      ],
    },
    {
      title: 'Réactions du benzène',
      blocks: [
        {
          kind: 'text',
          text: 'Pour garder son cycle stable, le benzène réagit surtout par **substitution** : un atome d’hydrogène est remplacé par un autre atome ou groupe, et le cycle reste intact.',
        },
        {
          kind: 'table',
          head: ['Réaction', 'Réactif et catalyseur', 'Produit'],
          rows: [
            ['bromation', '$\\ce{Br2}$, catalyseur $\\ce{FeBr3}$', 'bromobenzène $\\ce{C6H5Br}$ + $\\ce{HBr}$'],
            ['nitration', 'acide nitrique + acide sulfurique', 'nitrobenzène $\\ce{C6H5NO2}$ + $\\ce{H2O}$'],
            ['alkylation', '$\\ce{CH3Cl}$, catalyseur $\\ce{AlCl3}$', 'toluène $\\ce{C6H5CH3}$ + $\\ce{HCl}$'],
          ],
        },
        {
          kind: 'text',
          text: 'Des **additions** restent possibles, mais dans des conditions plus dures : hydrogénation (dihydrogène, catalyseur, chaleur) qui donne le cyclohexane $\\ce{C6H12}$ ; chloration à la lumière qui donne l’hexachlorocyclohexane, un ancien insecticide.',
        },
        {
          kind: 'trap',
          wrong: '« Le benzène décolore l’eau de brome comme un alcène. »',
          why: 'Ses électrons délocalisés le rendent peu réactif pour l’addition : sans catalyseur, il ne réagit pas avec le dibrome.',
          reflex: 'Alcène : addition facile ; benzène : substitution avec catalyseur.',
        },
      ],
    },
    {
      title: 'Les composés aromatiques',
      blocks: [
        {
          kind: 'list',
          items: [
            '**toluène** $\\ce{C6H5CH3}$ : solvant de peintures et de colles ;',
            '**phénol** $\\ce{C6H5OH}$ : désinfectant, fabrication de plastiques ;',
            '**aniline** $\\ce{C6H5NH2}$ : fabrication de colorants ;',
            'l’aspirine et le paracétamol contiennent un cycle aromatique.',
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Le benzène est **cancérigène**. On en trouve dans les vapeurs d’essence et dans la fumée des déchets plastiques brûlés : il faut éviter de les respirer et ne jamais siphonner l’essence à la bouche.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Benzène $\\ce{C6H6}$ : hexagone plan, six liaisons identiques, électrons délocalisés.',
    'Réactions principales : substitutions (bromation, nitration, alkylation) avec catalyseur.',
    'Additions difficiles : hydrogénation en cyclohexane, chloration à la lumière.',
    'Composés aromatiques utiles mais souvent toxiques ; benzène cancérigène.',
  ],
  exercises: [
    {
      id: 'benz-nitration',
      level: 1,
      title: 'Préparer du nitrobenzène',
      statement: 'On fait la nitration de 7,8 g de benzène. $M(\\ce{C6H6}) = 78$ g/mol ; $M(\\ce{C6H5NO2}) = 123$ g/mol.',
      parts: [
        {
          label: 'Quantité de benzène (en mol).',
          answer: { kind: 'number', value: 0.1, tolerance: 0.001, unit: 'mol' },
          steps: ['$n = \\dfrac{7{,}8}{78} = 0{,}10$ mol.'],
        },
        {
          label: 'Masse de nitrobenzène obtenue si le rendement est de 80 % (en g).',
          answer: { kind: 'number', value: 9.84, tolerance: 0.05, unit: 'g' },
          steps: ['Masse théorique : $0{,}10 \\times 123 = 12{,}3$ g.', 'Avec 80 % : $12{,}3 \\times 0{,}80 = 9{,}84$ g.'],
        },
      ],
    },
    {
      id: 'benz-hydrogenation',
      level: 2,
      title: 'Hydrogénation',
      statement: 'On hydrogène complètement le benzène.',
      parts: [
        {
          label: 'Combien de molécules de dihydrogène faut-il par molécule de benzène ?',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['$\\ce{C6H6 + 3H2 -> C6H12}$.'],
        },
        {
          label: 'Nom du produit.',
          answer: { kind: 'text', display: 'cyclohexane', accepted: ['cyclohexane', 'le cyclohexane'] },
          steps: ['Un cycle de six carbones saturé : le cyclohexane.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Dans le benzène, les six liaisons carbone-carbone sont :',
      choices: ['toutes identiques', 'trois simples et trois doubles, différentes', 'toutes simples', 'toutes doubles'],
      answer: 0,
      explanation: 'Les électrons sont délocalisés sur le cycle.',
    },
    {
      question: 'La réaction la plus typique du benzène est :',
      choices: ['la substitution', 'l’addition du dibrome à froid', 'la polymérisation', 'la combustion lente'],
      answer: 0,
      explanation: 'Elle conserve le cycle aromatique stable.',
    },
    {
      question: 'La nitration du benzène donne :',
      choices: ['du nitrobenzène et de l’eau', 'de l’aniline', 'du toluène', 'du cyclohexane'],
      answer: 0,
      explanation: '$\\ce{C6H6 + HNO3 -> C6H5NO2 + H2O}$, avec l’acide sulfurique comme catalyseur.',
    },
    {
      question: 'Le benzène est dangereux car :',
      choices: ['il est cancérigène', 'il est radioactif', 'il explose au contact de l’eau', 'il est très acide'],
      answer: 0,
      explanation: 'Une exposition répétée peut provoquer des leucémies.',
    },
  ],
  applications: [
    {
      title: 'Les vapeurs d’essence',
      tagline: 'Pourquoi ne pas siphonner l’essence à la bouche ?',
      situation:
        'Au bord de la route, des vendeurs remplissent des bouteilles d’essence en aspirant avec un tuyau à la bouche. L’essence contient environ 1 % de benzène et d’autres composés aromatiques.',
      model: 'Le benzène s’évapore facilement et passe dans le sang par les poumons.',
      questions: ['Quel risque prennent ces vendeurs à long terme ?', 'Comment s’en protéger ?'],
      solution: [
        'Respirer et avaler régulièrement de l’essence expose au benzène, cancérigène (leucémies), et peut provoquer une grave pneumonie si de l’essence passe dans les poumons.',
        'Utiliser une pompe manuelle, travailler en plein air, ne pas manger ni fumer pendant le transvasement.',
      ],
    },
  ],
};
