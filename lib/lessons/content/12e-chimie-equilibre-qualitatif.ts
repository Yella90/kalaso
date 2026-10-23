import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Quand on mélange de l’acide éthanoïque (le vinaigre) et de l’éthanol, il se forme un ester au parfum fruité. Mais on a beau attendre des jours : un tiers des réactifs reste toujours là. Ce n’est pas que la réaction s’arrête ; c’est qu’une autre réaction, en sens inverse, défait l’ester au même rythme. Le mélange a atteint un **équilibre**.',
  objectives: [
    'distinguer une réaction totale et une réaction limitée ;',
    'décrire un état d’équilibre chimique comme un état dynamique ;',
    'calculer un taux d’avancement final ;',
    'prévoir le sens de déplacement d’un équilibre avec la loi de modération (Le Chatelier).',
  ],
  sections: [
    {
      title: 'Réactions totales et réactions limitées',
      blocks: [
        {
          kind: 'text',
          text: 'Une réaction est **totale** si elle s’arrête quand un réactif, le réactif limitant, a complètement disparu : l’avancement final $x_f$ est égal à l’avancement maximal $x_{max}$. Elle est **limitée** si elle s’arrête avant : $x_f < x_{max}$, tous les réactifs restent présents.',
        },
        {
          kind: 'formula',
          label: 'Taux d’avancement final',
          tex: '\\tau = \\dfrac{x_f}{x_{max}} \\qquad 0 < \\tau \\leq 1',
          legend: ['$\\tau = 1$ : réaction totale', '$\\tau < 1$ : réaction limitée'],
        },
        {
          kind: 'example',
          title: 'l’estérification',
          text: 'On chauffe 1,0 mol d’acide éthanoïque et 1,0 mol d’éthanol : $\\ce{CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O}$.',
          steps: [
            'Quelle que soit la durée, on obtient au plus 0,67 mol d’ester.',
            '$x_{max} = 1{,}0$ mol et $x_f = 0{,}67$ mol : $\\tau = 0{,}67$. La réaction est limitée.',
          ],
        },
      ],
    },
    {
      title: 'L’état d’équilibre, un état dynamique',
      blocks: [
        {
          kind: 'text',
          text: 'Partons cette fois de 1,0 mol d’ester et de 1,0 mol d’eau : l’**hydrolyse** de l’ester est elle aussi limitée, et l’on obtient exactement le même mélange final, avec 0,67 mol d’ester. Les deux réactions sont inverses l’une de l’autre.',
        },
        {
          kind: 'rule',
          text: 'À l’équilibre, les deux réactions inverses continuent de se produire, **à la même vitesse** : la composition du mélange ne change plus. On écrit l’équation avec une double flèche $\\rightleftharpoons$.',
        },
        {
          kind: 'callout',
          variant: 'remarque',
          blocks: [
            {
              kind: 'text',
              text: 'Image : au marché, autant de clients entrent dans une allée qu’il en sort. Le nombre de personnes dans l’allée reste constant, pourtant personne n’est immobile.',
            },
          ],
        },
        {
          kind: 'text',
          text: 'Un catalyseur accélère les deux réactions inverses de la même façon : l’équilibre est atteint plus vite, mais sa composition ne change pas.',
        },
      ],
    },
    {
      title: 'Déplacer un équilibre',
      blocks: [
        {
          kind: 'rule',
          text: '**Loi de modération (Le Chatelier)** : si l’on modifie un facteur d’un système à l’équilibre, le système évolue dans le sens qui s’oppose à cette modification, jusqu’à un nouvel état d’équilibre.',
        },
        {
          kind: 'table',
          head: ['On…', 'L’équilibre se déplace dans le sens…'],
          rows: [
            ['ajoute un réactif', 'direct (il consomme ce réactif)'],
            ['retire un produit (distillation, précipité, gaz qui s’échappe)', 'direct (il reforme ce produit)'],
            ['augmente la température', 'endothermique (qui absorbe la chaleur)'],
            ['augmente la pression d’un mélange gazeux', 'qui diminue le nombre de moles de gaz'],
          ],
        },
        {
          kind: 'example',
          title: 'améliorer un rendement',
          text: 'Pour obtenir plus d’ester, on peut :',
          steps: ['utiliser un excès d’alcool (moins cher que l’acide) ;', 'éliminer l’ester par distillation au fur et à mesure qu’il se forme, ou piéger l’eau formée.'],
        },
        {
          kind: 'example',
          title: 'le dioxyde d’azote',
          text: '$\\ce{2NO2 <=> N2O4}$ : $\\ce{NO2}$ est brun, $\\ce{N2O4}$ incolore ; le sens direct est exothermique.',
          steps: ['Dans de l’eau glacée, le gaz pâlit : le refroidissement favorise le sens exothermique (direct).', 'Dans l’eau chaude, il brunit : le sens inverse, endothermique, est favorisé.'],
        },
        {
          kind: 'trap',
          wrong: '« Ajouter un catalyseur déplace l’équilibre vers les produits. »',
          why: 'Le catalyseur accélère autant la réaction directe que la réaction inverse.',
          reflex: 'Seuls la concentration, la température et la pression (gaz) déplacent un équilibre.',
        },
      ],
    },
  ],
  essentials: [
    'Réaction limitée : $x_f < x_{max}$ ; taux d’avancement final $\\tau = \\dfrac{x_f}{x_{max}}$.',
    'Équilibre dynamique : les deux réactions inverses ont la même vitesse ; la composition est constante.',
    'Estérification et hydrolyse : limitées, lentes, conduisent au même équilibre ($\\tau = 0{,}67$ en partant d’un mélange équimolaire).',
    'Le Chatelier : le système s’oppose à la modification ; le catalyseur ne déplace pas l’équilibre.',
  ],
  exercises: [
    {
      id: 'equilibre-ester',
      level: 1,
      title: 'Taux d’avancement d’une estérification',
      statement:
        'On mélange 0,50 mol d’acide éthanoïque et 0,50 mol d’éthanol, avec quelques gouttes d’acide sulfurique. À l’équilibre, il reste 0,17 mol d’acide.',
      parts: [
        {
          label: 'Calcule l’avancement final $x_f$ (en mol).',
          answer: { kind: 'number', value: 0.33, tolerance: 0.005, unit: 'mol' },
          steps: ['$n(\\text{acide}) = 0{,}50 - x_f = 0{,}17$, donc $x_f = 0{,}33$ mol.'],
          result: 'x_f = 0{,}33\\ \\text{mol}',
        },
        {
          label: 'Calcule le taux d’avancement final.',
          answer: { kind: 'number', value: 0.66, tolerance: 0.015, unit: '' },
          steps: ['$x_{max} = 0{,}50$ mol ; $\\tau = \\dfrac{0{,}33}{0{,}50} = 0{,}66$.'],
          result: '\\tau \\approx 0{,}66',
        },
        {
          label: 'Quel rôle joue l’acide sulfurique ? (un mot)',
          answer: { kind: 'text', display: 'catalyseur', accepted: ['catalyseur', 'un catalyseur', 'catalyse', 'catalyseur homogène'] },
          steps: ['Il accélère la réaction sans changer l’état d’équilibre : c’est un catalyseur.'],
        },
      ],
    },
    {
      id: 'equilibre-chatelier',
      level: 2,
      title: 'Prévoir un déplacement',
      statement:
        'Pour chaque modification, indique le sens dans lequel l’équilibre se déplace. Réponds « direct » ou « inverse ».',
      parts: [
        {
          label: 'Estérification à l’équilibre : on ajoute de l’eau.',
          answer: { kind: 'text', display: 'inverse', accepted: ['inverse', 'sens inverse'] },
          steps: ['L’eau est un produit : le système le consomme en évoluant dans le sens inverse (hydrolyse).'],
        },
        {
          label: 'Estérification : on distille l’ester au fur et à mesure.',
          answer: { kind: 'text', display: 'direct', accepted: ['direct', 'sens direct'] },
          steps: ['On retire un produit : le système en reforme, sens direct.'],
        },
        {
          label: '$\\ce{N2 + 3H2 <=> 2NH3}$ (gaz) : on augmente la pression.',
          answer: { kind: 'text', display: 'direct', accepted: ['direct', 'sens direct'] },
          steps: ['À gauche, 4 moles de gaz ; à droite, 2. Le système diminue le nombre de moles de gaz : sens direct.'],
        },
      ],
    },
    {
      id: 'equilibre-haber',
      level: 3,
      title: 'La synthèse de l’ammoniac',
      statement:
        'Dans un réacteur, on introduit 1,0 mol de diazote et 3,0 mol de dihydrogène : $\\ce{N2 + 3H2 <=> 2NH3}$. À l’équilibre, l’avancement vaut 0,40 mol.',
      parts: [
        {
          label: 'Quelle quantité d’ammoniac contient le mélange à l’équilibre (en mol) ?',
          answer: { kind: 'number', value: 0.8, tolerance: 0.01, unit: 'mol' },
          steps: ['$n(\\ce{NH3}) = 2x_f = 0{,}80$ mol.'],
          result: 'n(\\ce{NH3}) = 0{,}80\\ \\text{mol}',
        },
        {
          label: 'Calcule le taux d’avancement final.',
          answer: { kind: 'number', value: 0.4, tolerance: 0.01, unit: '' },
          steps: ['Le mélange est stœchiométrique : $x_{max} = 1{,}0$ mol.', '$\\tau = \\dfrac{0{,}40}{1{,}0} = 0{,}40$.'],
          result: '\\tau = 0{,}40',
        },
        {
          label: 'Quel est le pourcentage d’ammoniac (en moles) dans le gaz à l’équilibre ?',
          answer: { kind: 'number', value: 25, tolerance: 0.5, unit: '%' },
          steps: ['Total : $(1 - 0{,}40) + (3 - 1{,}20) + 0{,}80 = 3{,}2$ mol.', '$\\dfrac{0{,}80}{3{,}2} = 0{,}25$, soit 25 %.'],
          result: '25\\ \\%',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'À l’état d’équilibre chimique :',
      choices: ['les réactions directe et inverse ont la même vitesse', 'toutes les réactions sont arrêtées', 'les réactifs ont disparu', 'la réaction inverse est impossible'],
      answer: 0,
      explanation: 'C’est un équilibre dynamique : la composition ne change plus, mais les deux réactions continuent.',
    },
    {
      question: 'Pour une réaction limitée :',
      choices: ['$\\tau < 1$', '$\\tau = 1$', '$\\tau > 1$', '$x_f = x_{max}$'],
      answer: 0,
      explanation: 'L’avancement final reste inférieur à l’avancement maximal.',
    },
    {
      question: 'On chauffe un équilibre dont le sens direct est exothermique. Il se déplace :',
      choices: ['dans le sens inverse', 'dans le sens direct', 'il ne bouge pas', 'il devient total'],
      answer: 0,
      explanation: 'Une élévation de température favorise le sens endothermique, ici le sens inverse.',
    },
    {
      question: 'Pour augmenter le rendement d’une estérification, on peut :',
      choices: ['mettre un excès d’alcool', 'ajouter de l’eau', 'ajouter un catalyseur', 'diluer le mélange avec de l’eau'],
      answer: 0,
      explanation: 'Un excès de réactif déplace l’équilibre dans le sens direct ; le catalyseur ne fait que l’atteindre plus vite.',
    },
    {
      question: 'Le mélange initial « 1 mol d’ester + 1 mol d’eau » conduit à :',
      choices: ['le même équilibre que « 1 mol d’acide + 1 mol d’alcool »', 'l’hydrolyse totale de l’ester', 'aucune réaction', 'un mélange sans acide'],
      answer: 0,
      explanation: 'Ces deux mélanges ont la même composition en atomes : ils aboutissent au même état d’équilibre.',
    },
  ],
  applications: [
    {
      title: 'La boisson gazeuse',
      tagline: 'Pourquoi les bulles apparaissent-elles à l’ouverture ?',
      situation:
        'Une bouteille fermée de boisson gazeuse contient du dioxyde de carbone dissous en équilibre avec le gaz au-dessus du liquide : $\\ce{CO2(g) <=> CO2(aq)}$. La pression dans la bouteille est élevée.',
      model: 'On applique la loi de modération à l’équilibre de dissolution du gaz.',
      questions: [
        'Quand on ouvre la bouteille, la pression baisse. Dans quel sens se déplace l’équilibre ?',
        'Pourquoi la boisson perd-elle plus vite ses bulles au soleil ?',
      ],
      solution: [
        'Le système s’oppose à la baisse de pression en produisant du gaz : sens inverse, le $\\ce{CO2}$ dissous s’échappe en bulles.',
        'La dissolution d’un gaz est exothermique : en chauffant, on favorise le sens endothermique, la libération du gaz.',
      ],
      fact: 'Les pêcheurs savent que l’eau chaude des mares contient moins de dioxygène dissous : les poissons y remontent respirer en surface.',
    },
    {
      title: 'Des engrais pour les champs',
      tagline: 'Comment fabrique-t-on l’ammoniac des engrais azotés ?',
      situation:
        'L’urée et les engrais azotés utilisés dans les champs de coton sont fabriqués à partir d’ammoniac : $\\ce{N2 + 3H2 <=> 2NH3}$, réaction exothermique dans le sens direct.',
      model: 'Équilibre en phase gazeuse ; on raisonne avec la loi de modération.',
      questions: [
        'Pourquoi les usines travaillent-elles sous une pression très élevée (environ 200 fois la pression atmosphérique) ?',
        'Une basse température favoriserait l’ammoniac. Pourquoi travaille-t-on pourtant vers 450 °C, avec un catalyseur au fer ?',
      ],
      solution: [
        'Le sens direct diminue le nombre de moles de gaz (4 → 2) : une forte pression déplace l’équilibre vers l’ammoniac.',
        'À basse température, la réaction serait beaucoup trop lente. On accepte un équilibre un peu moins favorable pour aller plus vite ; le catalyseur accélère encore la réaction.',
      ],
    },
  ],
};
