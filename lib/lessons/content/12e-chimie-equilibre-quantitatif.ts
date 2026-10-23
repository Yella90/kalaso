import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le chimiste qui fabrique un arôme de banane veut savoir à l’avance combien d’ester il obtiendra, et comment en obtenir davantage. Pour cela, il lui faut un nombre qui résume l’état d’équilibre : la **constante d’équilibre**. Avec elle, on calcule une composition finale et on prévoit dans quel sens un mélange va évoluer.',
  objectives: [
    'écrire le quotient de réaction $Q_r$ d’une équation ;',
    'utiliser la constante d’équilibre $K$ pour calculer une composition à l’équilibre ;',
    'prévoir le sens d’évolution d’un mélange en comparant $Q_r$ et $K$ ;',
    'calculer le pH et le taux d’avancement d’une solution d’acide faible.',
  ],
  sections: [
    {
      title: 'Quotient de réaction et constante d’équilibre',
      blocks: [
        {
          kind: 'formula',
          label: 'Pour $a\\,\\ce{A} + b\\,\\ce{B} \\rightleftharpoons c\\,\\ce{C} + d\\,\\ce{D}$',
          tex: 'Q_r = \\dfrac{[\\ce{C}]^c\\,[\\ce{D}]^d}{[\\ce{A}]^a\\,[\\ce{B}]^b}',
          legend: ['concentrations en mol/L, sans unité dans le calcul', 'l’eau solvant et les solides ne figurent pas dans $Q_r$'],
        },
        {
          kind: 'rule',
          text: 'À l’équilibre, le quotient de réaction prend une valeur qui ne dépend que de la température : la **constante d’équilibre** $K$. Donc $Q_{r,eq} = K$, quelle que soit la composition de départ.',
        },
        {
          kind: 'text',
          text: 'Pour l’estérification, les quatre espèces sont dans le même volume ; celui-ci se simplifie et l’on peut écrire $K$ avec les quantités de matière : $K = \\dfrac{n(\\text{ester})\\,n(\\text{eau})}{n(\\text{acide})\\,n(\\text{alcool})} \\approx 4$.',
        },
      ],
    },
    {
      title: 'Calculer une composition à l’équilibre',
      blocks: [
        {
          kind: 'example',
          title: 'mélange équimolaire',
          text: '1,0 mol d’acide éthanoïque et 1,0 mol d’éthanol, $K = 4$.',
          steps: [
            'À l’équilibre : ester et eau $x$ ; acide et alcool $1 - x$.',
            '$\\dfrac{x^2}{(1 - x)^2} = 4$, donc $\\dfrac{x}{1 - x} = 2$ et $x = \\dfrac{2}{3} \\approx 0{,}67$ mol.',
          ],
        },
        {
          kind: 'example',
          title: 'excès d’alcool',
          text: '1,0 mol d’acide et 2,0 mol d’éthanol.',
          steps: [
            '$\\dfrac{x^2}{(1 - x)(2 - x)} = 4$, soit $3x^2 - 12x + 8 = 0$.',
            'La seule racine possible ($x < 1$) : $x = \\dfrac{12 - \\sqrt{48}}{6} \\approx 0{,}85$ mol.',
            'Le rendement passe de 67 % à 85 % : l’excès d’un réactif déplace l’équilibre.',
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'list',
              items: [
                'dresser le tableau d’avancement et exprimer chaque quantité à l’équilibre en fonction de $x$ ;',
                'écrire $Q_{r,eq} = K$ et résoudre l’équation ;',
                'garder la racine compatible avec les quantités initiales (aucune quantité négative).',
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Prévoir le sens d’évolution',
      blocks: [
        {
          kind: 'rule',
          text: 'On calcule $Q_{r,i}$ avec la composition initiale. Si $Q_{r,i} < K$, le système évolue dans le **sens direct** ; si $Q_{r,i} > K$, dans le **sens inverse** ; si $Q_{r,i} = K$, il est déjà à l’équilibre.',
        },
        {
          kind: 'example',
          title: 'un mélange de quatre espèces',
          text: 'On mélange 1 mol d’acide, 1 mol d’alcool, 1 mol d’ester et 3 mol d’eau.',
          steps: ['$Q_{r,i} = \\dfrac{1 \\times 3}{1 \\times 1} = 3 < 4$.', 'Le système évolue dans le sens direct : il se forme encore un peu d’ester.'],
        },
      ],
    },
    {
      title: 'Un acide faible dans l’eau',
      blocks: [
        {
          kind: 'formula',
          tex: '\\ce{CH3COOH + H2O <=> CH3COO- + H3O+} \\qquad K_a = \\dfrac{[\\ce{CH3COO-}][\\ce{H3O+}]}{[\\ce{CH3COOH}]} = 1{,}8 \\times 10^{-5}',
          legend: ['$K_a$ : constante d’acidité, à 25 °C'],
        },
        {
          kind: 'example',
          title: 'vinaigre dilué à 0,10 mol/L',
          text: 'On note $h = [\\ce{H3O+}] = [\\ce{CH3COO-}]$ ; alors $[\\ce{CH3COOH}] = 0{,}10 - h$.',
          steps: [
            '$\\dfrac{h^2}{0{,}10 - h} = 1{,}8 \\times 10^{-5}$ ; $h$ est petit devant 0,10 : $h \\approx \\sqrt{1{,}8 \\times 10^{-6}} \\approx 1{,}3 \\times 10^{-3}$ mol/L.',
            '$\\text{pH} = -\\log h \\approx 2{,}9$ et $\\tau = \\dfrac{1{,}3 \\times 10^{-3}}{0{,}10} \\approx 1{,}3$ % : l’acide est très peu dissocié.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Pour un acide à 0,10 mol/L, le pH vaut toujours 1. »',
          why: 'C’est vrai pour un acide fort (réaction totale avec l’eau), pas pour un acide faible dont la réaction est limitée.',
          reflex: 'Acide faible : utiliser $K_a$ ; le pH est plus grand que $-\\log C$.',
        },
      ],
    },
  ],
  essentials: [
    '$Q_r = \\dfrac{[\\ce{C}]^c[\\ce{D}]^d}{[\\ce{A}]^a[\\ce{B}]^b}$ ; à l’équilibre $Q_{r,eq} = K$, qui ne dépend que de la température.',
    'Estérification : $K \\approx 4$ ; mélange équimolaire → 67 % ; excès d’un réactif → rendement plus grand.',
    '$Q_{r,i} < K$ : sens direct ; $Q_{r,i} > K$ : sens inverse.',
    'Acide faible : $K_a = \\dfrac{[\\ce{A-}][\\ce{H3O+}]}{[\\ce{AH}]}$ ; pH > $-\\log C$ et $\\tau < 1$.',
  ],
  exercises: [
    {
      id: 'eq-quotient',
      level: 1,
      title: 'Dans quel sens ?',
      statement:
        'On mélange 1,0 mol d’acide éthanoïque, 1,0 mol d’éthanol, 1,0 mol d’éthanoate d’éthyle et 2,0 mol d’eau. $K = 4$.',
      parts: [
        {
          label: 'Calcule le quotient de réaction initial.',
          answer: { kind: 'number', value: 2, tolerance: 0.01, unit: '' },
          steps: ['$Q_{r,i} = \\dfrac{n(\\text{ester})\\,n(\\text{eau})}{n(\\text{acide})\\,n(\\text{alcool})} = \\dfrac{1{,}0 \\times 2{,}0}{1{,}0 \\times 1{,}0} = 2{,}0$.'],
          result: 'Q_{r,i} = 2{,}0',
        },
        {
          label: 'Dans quel sens le système évolue-t-il ? (« direct » ou « inverse »)',
          answer: { kind: 'text', display: 'direct', accepted: ['direct', 'sens direct'] },
          steps: ['$Q_{r,i} = 2 < K = 4$ : sens direct, formation d’ester.'],
        },
      ],
    },
    {
      id: 'eq-exces',
      level: 2,
      title: 'Un excès d’alcool',
      statement: 'On mélange 1,0 mol d’acide éthanoïque et 2,0 mol d’éthanol. $K = 4$.',
      parts: [
        {
          label: 'Calcule l’avancement final (en mol).',
          answer: { kind: 'number', value: 0.845, tolerance: 0.01, unit: 'mol' },
          steps: ['$\\dfrac{x^2}{(1 - x)(2 - x)} = 4 \\Rightarrow 3x^2 - 12x + 8 = 0$.', '$x = \\dfrac{12 - \\sqrt{48}}{6} \\approx 0{,}845$ mol (l’autre racine, 3,15 mol, est impossible).'],
          result: 'x_f \\approx 0{,}845\\ \\text{mol}',
        },
        {
          label: 'Quel est le rendement de la synthèse (en %) ?',
          answer: { kind: 'number', value: 84.5, tolerance: 1, unit: '%' },
          steps: ['L’acide est limitant : $x_{max} = 1{,}0$ mol ; rendement $= \\dfrac{0{,}845}{1{,}0} = 84{,}5$ %.'],
          result: '\\eta \\approx 84{,}5\\ \\%',
        },
      ],
    },
    {
      id: 'eq-acide-faible',
      level: 3,
      title: 'pH d’une solution d’acide éthanoïque',
      statement: 'Solution d’acide éthanoïque à $C = 0{,}10$ mol/L ; $K_a = 1{,}8 \\times 10^{-5}$. On ne fait pas d’approximation.',
      parts: [
        {
          label: 'Calcule $[\\ce{H3O+}]$ à l’équilibre (en mol/L).',
          answer: { kind: 'number', value: 0.001333, tolerance: 0.00003, unit: 'mol/L' },
          steps: ['$h^2 + K_a h - K_a C = 0$, soit $h^2 + 1{,}8 \\times 10^{-5}h - 1{,}8 \\times 10^{-6} = 0$.', 'Racine positive : $h \\approx 1{,}33 \\times 10^{-3}$ mol/L.'],
          result: '[\\ce{H3O+}] \\approx 1{,}33 \\times 10^{-3}\\ \\text{mol/L}',
        },
        {
          label: 'Calcule le pH.',
          answer: { kind: 'number', value: 2.88, tolerance: 0.02, unit: '' },
          steps: ['$\\text{pH} = -\\log(1{,}33 \\times 10^{-3}) \\approx 2{,}88$.'],
          result: '\\text{pH} \\approx 2{,}88',
        },
        {
          label: 'Calcule le taux d’avancement final (en %).',
          answer: { kind: 'number', value: 1.33, tolerance: 0.05, unit: '%' },
          steps: ['$\\tau = \\dfrac{h}{C} = \\dfrac{1{,}33 \\times 10^{-3}}{0{,}10} \\approx 1{,}3$ %.'],
          result: '\\tau \\approx 1{,}3\\ \\%',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La constante d’équilibre $K$ dépend :',
      choices: ['seulement de la température', 'des quantités initiales', 'du catalyseur', 'du volume du récipient'],
      answer: 0,
      explanation: 'Pour une équation donnée, $K$ ne dépend que de la température.',
    },
    {
      question: 'Si $Q_{r,i} > K$, le système évolue :',
      choices: ['dans le sens inverse', 'dans le sens direct', 'il ne change pas', 'jusqu’à disparition des produits'],
      answer: 0,
      explanation: '$Q_r$ doit diminuer jusqu’à $K$ : les produits sont consommés.',
    },
    {
      question: 'Dans le quotient de réaction d’une réaction en solution aqueuse, l’eau solvant :',
      choices: ['n’apparaît pas', 'apparaît avec la concentration 55,5 mol/L', 'apparaît au numérateur', 'apparaît au dénominateur'],
      answer: 0,
      explanation: 'Par convention, le solvant (et les solides) ne figurent pas dans $Q_r$.',
    },
    {
      question: 'Un mélange équimolaire acide + alcool ($K = 4$) donne un rendement de :',
      choices: ['67 %', '100 %', '50 %', '33 %'],
      answer: 0,
      explanation: '$\\dfrac{x}{1 - x} = 2$ donne $x = \\dfrac{2}{3}$.',
    },
    {
      question: 'Pour un acide faible de concentration $C$, le pH est :',
      choices: ['plus grand que $-\\log C$', 'égal à $-\\log C$', 'plus petit que $-\\log C$', 'toujours égal à 7'],
      answer: 0,
      explanation: 'Sa réaction avec l’eau est limitée : $[\\ce{H3O+}] < C$, donc pH $> -\\log C$.',
    },
  ],
  applications: [
    {
      title: 'Le vinaigre de cuisine',
      tagline: 'Quel est le pH d’un vinaigre ?',
      situation: 'Un vinaigre de table contient environ 1,0 mol/L d’acide éthanoïque ($K_a = 1{,}8 \\times 10^{-5}$).',
      model: 'On ne tient compte que de l’acide éthanoïque, et l’on suppose $[\\ce{H3O+}]$ petit devant $C$.',
      questions: ['Calcule le pH de ce vinaigre.'],
      check: { value: 2.37, tolerance: 0.02, unit: '' },
      solution: ['$h \\approx \\sqrt{K_a C} = \\sqrt{1{,}8 \\times 10^{-5}} \\approx 4{,}2 \\times 10^{-3}$ mol/L.', '$\\text{pH} = -\\log(4{,}2 \\times 10^{-3}) \\approx 2{,}4$.'],
      fact: 'Le vinaigre conserve les légumes : à ce pH, la plupart des bactéries ne peuvent plus se multiplier.',
    },
    {
      title: 'L’arôme de banane',
      tagline: 'Combien d’ester une petite usine peut-elle produire ?',
      situation:
        'L’éthanoate d’isoamyle ($M = 130$ g/mol) donne l’odeur de banane des bonbons. On le prépare à partir de 0,50 mol d’alcool isoamylique et de 1,0 mol d’acide éthanoïque, moins cher, mis en excès. $K = 4$.',
      model: 'L’équilibre est atteint ; on raisonne avec les quantités de matière.',
      questions: ['Quelle masse d’ester obtient-on, en g ?'],
      check: { value: 54.9, tolerance: 0.03, unit: 'g' },
      solution: [
        '$\\dfrac{x^2}{(0{,}5 - x)(1 - x)} = 4 \\Rightarrow 3x^2 - 6x + 2 = 0$.',
        '$x = \\dfrac{6 - \\sqrt{12}}{6} \\approx 0{,}423$ mol.',
        '$m = 0{,}423 \\times 130 \\approx 55$ g, soit un rendement de 85 % par rapport à l’alcool.',
      ],
      fact: 'Le même ester est produit naturellement par la banane mûre.',
    },
  ],
};
