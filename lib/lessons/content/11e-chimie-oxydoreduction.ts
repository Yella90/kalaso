import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un clou de fer plongé dans une solution bleue de sulfate de cuivre se couvre de cuivre rouge, et la solution pâlit. Les tôles des toits rouillent, l’argent noircit, la pile de la lampe torche s’use. Toutes ces transformations ont un point commun : des **électrons** passent d’une espèce à une autre. Ce sont des réactions d’**oxydoréduction**.',
  objectives: [
    'définir oxydant, réducteur, oxydation et réduction ;',
    'écrire un couple oxydant/réducteur et sa demi-équation ;',
    'équilibrer une demi-équation en milieu acide ;',
    'écrire l’équation d’une réaction d’oxydoréduction et faire un calcul de quantité.',
  ],
  sections: [
    {
      title: 'Oxydants, réducteurs et couples',
      blocks: [
        {
          kind: 'list',
          items: [
            'un **oxydant** est une espèce capable de **capter** des électrons ; un **réducteur**, une espèce capable d’en **céder** ;',
            'une **oxydation** est une perte d’électrons ; une **réduction**, un gain d’électrons ;',
            'un oxydant et le réducteur qu’il devient forment un **couple** Ox/Red, avec la demi-équation $\\text{Ox} + n\\,e^- \\rightleftharpoons \\text{Red}$.',
          ],
        },
        {
          kind: 'example',
          title: 'le clou dans le sulfate de cuivre',
          text: 'Couples $\\ce{Cu^2+}$/$\\ce{Cu}$ et $\\ce{Fe^2+}$/$\\ce{Fe}$.',
          steps: [
            '$\\ce{Fe -> Fe^2+ + 2e-}$ : le fer est **oxydé** (c’est le réducteur).',
            '$\\ce{Cu^2+ + 2e- -> Cu}$ : les ions cuivre sont **réduits** (c’est l’oxydant).',
            'Bilan : $\\ce{Cu^2+ + Fe -> Cu + Fe^2+}$ ; les électrons n’apparaissent pas dans le bilan.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« L’oxydant est oxydé. »',
          why: 'L’oxydant **oxyde** l’autre espèce ; lui-même est **réduit** en captant des électrons.',
          reflex: 'Oxydant → réduit ; réducteur → oxydé.',
        },
      ],
    },
    {
      title: 'Équilibrer une demi-équation',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'En milieu acide',
          blocks: [
            {
              kind: 'list',
              items: [
                'équilibrer l’élément principal ;',
                'équilibrer l’oxygène avec des molécules d’eau $\\ce{H2O}$ ;',
                'équilibrer l’hydrogène avec des ions $\\ce{H+}$ ;',
                'équilibrer les charges avec des électrons.',
              ],
            },
          ],
        },
        {
          kind: 'formula',
          label: 'Exemple : couple $\\ce{MnO4-}$/$\\ce{Mn^2+}$',
          tex: '\\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}',
        },
        {
          kind: 'rule',
          text: 'Pour écrire le bilan, on multiplie chaque demi-équation pour que le nombre d’électrons cédés soit **égal** au nombre d’électrons captés, puis on additionne.',
        },
        {
          kind: 'example',
          title: 'permanganate et ions fer(II)',
          text: '$\\ce{Fe^2+ -> Fe^3+ + e-}$, à multiplier par 5.',
          steps: ['$\\ce{MnO4- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$.'],
        },
      ],
    },
  ],
  essentials: [
    'Oxydant : capte des électrons (il est réduit) ; réducteur : en cède (il est oxydé).',
    'Couple Ox/Red : $\\text{Ox} + ne^- \\rightleftharpoons \\text{Red}$.',
    'Milieu acide : équilibrer O avec $\\ce{H2O}$, H avec $\\ce{H+}$, charges avec $e^-$.',
    'Bilan : même nombre d’électrons échangés, puis addition.',
  ],
  exercises: [
    {
      id: 'redox-clou',
      level: 1,
      title: 'Le clou cuivré',
      statement: 'On plonge 2,8 g de fer dans un excès de sulfate de cuivre. $M(\\ce{Fe}) = 56$ g/mol ; $M(\\ce{Cu}) = 63{,}5$ g/mol.',
      parts: [
        {
          label: 'Quantité de fer (en mol).',
          answer: { kind: 'number', value: 0.05, tolerance: 0.0005, unit: 'mol' },
          steps: ['$n = \\dfrac{2{,}8}{56} = 0{,}050$ mol.'],
        },
        {
          label: 'Masse de cuivre déposée (en g).',
          answer: { kind: 'number', value: 3.175, tolerance: 0.02, unit: 'g' },
          steps: ['1 mol de fer donne 1 mol de cuivre : $0{,}050 \\times 63{,}5 \\approx 3{,}18$ g.'],
        },
        {
          label: 'Quelle espèce est l’oxydant ? (formule)',
          answer: { kind: 'text', display: 'Cu²⁺', accepted: ['Cu2+', 'Cu²⁺', 'cu2+', 'ion cuivre', 'ions cuivre', 'ion cuivre ii', 'ions cuivre ii'] },
          steps: ['Les ions $\\ce{Cu^2+}$ captent les électrons cédés par le fer.'],
        },
      ],
    },
    {
      id: 'redox-equilibrer',
      level: 2,
      title: 'Équilibrer',
      statement: 'On considère la demi-équation du couple $\\ce{Cr2O7^2-}$/$\\ce{Cr^3+}$ en milieu acide.',
      parts: [
        {
          label: 'Combien de molécules d’eau faut-il ?',
          answer: { kind: 'number', value: 7, tolerance: 0, unit: '' },
          steps: ['$\\ce{Cr2O7^2- -> 2Cr^3+}$ : 7 atomes O à compenser par 7 $\\ce{H2O}$.'],
        },
        {
          label: 'Combien d’ions $\\ce{H+}$ ?',
          answer: { kind: 'number', value: 14, tolerance: 0, unit: '' },
          steps: ['14 atomes H dans 7 $\\ce{H2O}$ : 14 $\\ce{H+}$.'],
        },
        {
          label: 'Combien d’électrons ?',
          answer: { kind: 'number', value: 6, tolerance: 0, unit: '' },
          steps: ['Charges : $-2 + 14 = +12$ à gauche, $+6$ à droite : 6 électrons à gauche.', '$\\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une oxydation est :',
      choices: ['une perte d’électrons', 'un gain d’électrons', 'un gain de protons', 'une réaction avec l’eau'],
      answer: 0,
      explanation: 'Le réducteur s’oxyde en cédant des électrons.',
    },
    {
      question: 'Dans $\\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$, le réducteur est :',
      choices: ['$\\ce{Zn}$', '$\\ce{Cu^2+}$', '$\\ce{Zn^2+}$', '$\\ce{Cu}$'],
      answer: 0,
      explanation: 'Le zinc cède deux électrons.',
    },
    {
      question: 'Dans la demi-équation de $\\ce{MnO4-}$/$\\ce{Mn^2+}$, le nombre d’électrons est :',
      choices: ['5', '2', '8', '4'],
      answer: 0,
      explanation: '$\\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$.',
    },
    {
      question: 'Pour écrire le bilan de deux demi-équations, on :',
      choices: ['égalise le nombre d’électrons échangés', 'additionne directement', 'garde les électrons dans le bilan', 'supprime l’eau'],
      answer: 0,
      explanation: 'Les électrons cédés sont tous captés.',
    },
  ],
  applications: [
    {
      title: 'La rouille des tôles',
      tagline: 'Pourquoi les toits rouillent-ils, et comment les protéger ?',
      situation:
        'Les tôles des toits sont en acier (surtout du fer). Avec l’humidité de la saison des pluies, le fer est oxydé par le dioxygène de l’air ; la rouille est surtout de l’oxyde de fer(III), $\\ce{4Fe + 3O2 -> 2Fe2O3}$. On considère 112 g de fer entièrement rouillé.',
      model: 'On assimile la rouille à $\\ce{Fe2O3}$ ($M = 160$ g/mol).',
      questions: ['Quelle masse de rouille se forme, en g ?', 'Pourquoi les tôles « galvanisées » rouillent-elles beaucoup moins ?'],
      check: { value: 160, tolerance: 0.02, unit: 'g' },
      solution: ['$n(\\ce{Fe}) = \\dfrac{112}{56} = 2{,}0$ mol, qui donnent 1,0 mol de $\\ce{Fe2O3}$, soit 160 g.', 'Elles sont recouvertes de zinc, un meilleur réducteur que le fer : c’est le zinc qui s’oxyde à sa place et protège le fer.'],
    },
  ],
};
