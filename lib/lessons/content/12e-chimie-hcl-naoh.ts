import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'L’esprit de sel qui détartre les toilettes est de l’acide chlorhydrique ; la soude caustique des savonnières de karité est de l’hydroxyde de sodium. Ce sont l’**acide fort** et la **base forte** les plus utilisés, et ils sont dangereux. Pour les manipuler, il faut savoir mesurer leur force avec un seul nombre : le **pH**.',
  objectives: [
    'définir le pH et calculer $[\\ce{H3O+}]$ ou le pH ;',
    'utiliser le produit ionique de l’eau $K_e$ ;',
    'calculer le pH d’une solution d’acide fort ou de base forte, et l’effet d’une dilution ;',
    'exploiter le dosage d’un acide fort par une base forte.',
  ],
  sections: [
    {
      title: 'Le pH et l’eau pure',
      blocks: [
        {
          kind: 'formula',
          tex: '\\text{pH} = -\\log[\\ce{H3O+}] \\qquad [\\ce{H3O+}] = 10^{-\\text{pH}}',
          legend: ['$[\\ce{H3O+}]$ en mol/L ; le pH n’a pas d’unité ; on le mesure au pH-mètre ou au papier pH'],
        },
        {
          kind: 'text',
          text: 'Même pure, l’eau contient quelques ions : deux molécules d’eau échangent un proton. C’est l’**autoprotolyse** de l’eau : $\\ce{2H2O <=> H3O+ + OH-}$.',
        },
        {
          kind: 'formula',
          label: 'Produit ionique de l’eau',
          tex: 'K_e = [\\ce{H3O+}][\\ce{OH-}] = 1{,}0 \\times 10^{-14} \\quad (25\\ ^\\circ\\text{C}) \\qquad \\text{p}K_e = 14',
        },
        {
          kind: 'table',
          head: ['Solution (25 °C)', 'Comparaison', 'pH'],
          rows: [
            ['acide', '$[\\ce{H3O+}] > [\\ce{OH-}]$', 'pH < 7'],
            ['neutre (eau pure)', '$[\\ce{H3O+}] = [\\ce{OH-}] = 10^{-7}$ mol/L', 'pH = 7'],
            ['basique', '$[\\ce{H3O+}] < [\\ce{OH-}]$', 'pH > 7'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Quand le pH passe de 3 à 2, l’acidité augmente un peu. »',
          why: 'Le pH est un logarithme : une unité de pH en moins, c’est 10 fois plus d’ions $\\ce{H3O+}$.',
          reflex: 'Une variation de 1 du pH correspond à un facteur 10 sur $[\\ce{H3O+}]$.',
        },
      ],
    },
    {
      title: 'Acide chlorhydrique : un acide fort',
      blocks: [
        {
          kind: 'text',
          text: 'Le chlorure d’hydrogène $\\ce{HCl}$ est un gaz très soluble dans l’eau. Sa réaction avec l’eau est **totale** : il n’en reste aucune molécule. La solution obtenue est l’acide chlorhydrique.',
        },
        {
          kind: 'formula',
          tex: '\\ce{HCl + H2O -> H3O+ + Cl-} \\qquad [\\ce{H3O+}] = C \\qquad \\text{pH} = -\\log C',
          legend: ['valable pour $10^{-6} < C < 10^{-1}$ mol/L environ'],
        },
        {
          kind: 'definition',
          term: 'Acide fort',
          text: 'acide dont la réaction avec l’eau est totale.',
        },
        {
          kind: 'example',
          title: 'dilution',
          text: 'On dilue 10 fois une solution d’acide chlorhydrique de pH 2.',
          steps: ['$C$ est divisée par 10 : $[\\ce{H3O+}]$ passe de $10^{-2}$ à $10^{-3}$ mol/L.', 'Le pH passe de 2 à 3. Diluer un acide fait **monter** son pH vers 7, sans jamais le dépasser.'],
        },
      ],
    },
    {
      title: 'Hydroxyde de sodium : une base forte',
      blocks: [
        {
          kind: 'text',
          text: 'L’hydroxyde de sodium (soude) est un solide ionique. En se dissolvant, il libère tous ses ions hydroxyde : $\\ce{NaOH(s) -> Na+ + OH-}$. C’est une **base forte**.',
        },
        {
          kind: 'formula',
          tex: '[\\ce{OH-}] = C \\qquad [\\ce{H3O+}] = \\dfrac{K_e}{C} \\qquad \\text{pH} = 14 + \\log C',
        },
        {
          kind: 'example',
          title: 'soude à 0,010 mol/L',
          text: '$[\\ce{OH-}] = 10^{-2}$ mol/L.',
          steps: ['$[\\ce{H3O+}] = \\dfrac{10^{-14}}{10^{-2}} = 10^{-12}$ mol/L.', '$\\text{pH} = 12$. Diluée 10 fois, la solution aurait un pH de 11.'],
        },
        {
          kind: 'callout',
          variant: 'attention',
          title: 'Sécurité',
          blocks: [
            {
              kind: 'text',
              text: 'La soude et l’acide chlorhydrique concentrés brûlent la peau et les yeux. Gants et lunettes ; on verse toujours l’acide ou la soude **dans l’eau**, jamais l’inverse, car la dissolution dégage beaucoup de chaleur.',
            },
          ],
        },
      ],
    },
    {
      title: 'Réaction et dosage acide fort – base forte',
      blocks: [
        {
          kind: 'formula',
          label: 'Réaction totale et exothermique',
          tex: '\\ce{H3O+ + OH- -> 2H2O}',
        },
        {
          kind: 'definition',
          term: 'Équivalence',
          text: 'moment du dosage où les réactifs ont été mélangés dans les proportions de l’équation : ni l’un ni l’autre n’est en excès.',
        },
        {
          kind: 'formula',
          label: 'À l’équivalence',
          tex: 'C_a V_a = C_b V_{bE} \\qquad \\text{pH}_E = 7',
        },
        {
          kind: 'text',
          text: 'La courbe pH $= f(V_b)$ monte lentement, présente un **saut de pH** autour de l’équivalence, puis se stabilise. On repère l’équivalence par la **méthode des tangentes** (point d’inflexion), ou par un indicateur coloré qui change de couleur dans le saut, comme le bleu de bromothymol (jaune → bleu, vers pH 6 à 7,6).',
        },
      ],
    },
  ],
  essentials: [
    '$\\text{pH} = -\\log[\\ce{H3O+}]$ ; $K_e = [\\ce{H3O+}][\\ce{OH-}] = 10^{-14}$ à 25 °C.',
    'Acide fort : réaction totale avec l’eau ; $\\text{pH} = -\\log C$.',
    'Base forte : $[\\ce{OH-}] = C$ ; $\\text{pH} = 14 + \\log C$.',
    'Dosage acide fort / base forte : $C_aV_a = C_bV_{bE}$ et pH = 7 à l’équivalence.',
  ],
  exercises: [
    {
      id: 'hcl-ph',
      level: 1,
      title: 'pH d’un acide chlorhydrique',
      statement: 'On prépare une solution d’acide chlorhydrique à $C = 2{,}0 \\times 10^{-2}$ mol/L.',
      parts: [
        {
          label: 'Calcule son pH.',
          answer: { kind: 'number', value: 1.7, tolerance: 0.02, unit: '' },
          steps: ['Acide fort : $[\\ce{H3O+}] = C = 2{,}0 \\times 10^{-2}$ mol/L.', '$\\text{pH} = -\\log(2{,}0 \\times 10^{-2}) \\approx 1{,}70$.'],
          result: '\\text{pH} \\approx 1{,}70',
        },
        {
          label: 'Calcule $[\\ce{OH-}]$ dans cette solution (en mol/L).',
          answer: { kind: 'number', value: 5e-13, tolerance: 2e-14, unit: 'mol/L' },
          steps: ['$[\\ce{OH-}] = \\dfrac{K_e}{[\\ce{H3O+}]} = \\dfrac{10^{-14}}{2{,}0 \\times 10^{-2}} = 5{,}0 \\times 10^{-13}$ mol/L.'],
          result: '[\\ce{OH-}] = 5{,}0 \\times 10^{-13}\\ \\text{mol/L}',
        },
      ],
    },
    {
      id: 'naoh-dilution',
      level: 2,
      title: 'Diluer de la soude',
      statement: 'On dispose de 10,0 mL de soude à $1{,}0 \\times 10^{-2}$ mol/L, que l’on complète à 1,00 L avec de l’eau distillée.',
      parts: [
        {
          label: 'Quel est le pH de la solution de départ ?',
          answer: { kind: 'number', value: 12, tolerance: 0.02, unit: '' },
          steps: ['$\\text{pH} = 14 + \\log(10^{-2}) = 12$.'],
          result: '\\text{pH} = 12',
        },
        {
          label: 'Par combien la solution est-elle diluée ?',
          answer: { kind: 'number', value: 100, tolerance: 0.5, unit: '' },
          steps: ['Facteur de dilution : $\\dfrac{1\\,000\\ \\text{mL}}{10{,}0\\ \\text{mL}} = 100$.'],
        },
        {
          label: 'Quel est le pH de la solution diluée ?',
          answer: { kind: 'number', value: 10, tolerance: 0.02, unit: '' },
          steps: ['$C = 10^{-4}$ mol/L ; $\\text{pH} = 14 + \\log(10^{-4}) = 10$ : deux unités de moins.'],
          result: '\\text{pH} = 10',
        },
      ],
    },
    {
      id: 'dosage-fort',
      level: 3,
      title: 'Doser l’esprit de sel',
      statement:
        'On dilue l’esprit de sel, puis on dose $V_a = 20{,}0$ mL de la solution diluée par de la soude à $C_b = 0{,}100$ mol/L. L’équivalence est obtenue pour $V_{bE} = 12{,}5$ mL.',
      parts: [
        {
          label: 'Calcule la concentration $C_a$ de la solution dosée (en mol/L).',
          answer: { kind: 'number', value: 0.0625, tolerance: 0.0005, unit: 'mol/L' },
          steps: ['$C_a = \\dfrac{C_b V_{bE}}{V_a} = \\dfrac{0{,}100 \\times 12{,}5}{20{,}0} = 6{,}25 \\times 10^{-2}$ mol/L.'],
          result: 'C_a = 6{,}25 \\times 10^{-2}\\ \\text{mol/L}',
        },
        {
          label: 'Calcule le pH initial de la solution dosée.',
          answer: { kind: 'number', value: 1.2, tolerance: 0.02, unit: '' },
          steps: ['$\\text{pH} = -\\log(6{,}25 \\times 10^{-2}) \\approx 1{,}20$.'],
          result: '\\text{pH} \\approx 1{,}20',
        },
        {
          label: 'Calcule le pH quand on a versé 25,0 mL de soude.',
          answer: { kind: 'number', value: 12.44, tolerance: 0.03, unit: '' },
          steps: [
            'Soude versée : $2{,}50 \\times 10^{-3}$ mol ; acide initial : $1{,}25 \\times 10^{-3}$ mol.',
            'Excès d’ions $\\ce{OH-}$ : $1{,}25 \\times 10^{-3}$ mol dans 45,0 mL, soit $[\\ce{OH-}] \\approx 2{,}78 \\times 10^{-2}$ mol/L.',
            '$\\text{pH} = 14 + \\log(2{,}78 \\times 10^{-2}) \\approx 12{,}4$.',
          ],
          result: '\\text{pH} \\approx 12{,}4',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une solution de pH 3 contient, par rapport à une solution de pH 5 :',
      choices: ['100 fois plus d’ions $\\ce{H3O+}$', '2 fois plus d’ions $\\ce{H3O+}$', '100 fois moins d’ions $\\ce{H3O+}$', 'autant d’ions $\\ce{H3O+}$'],
      answer: 0,
      explanation: 'Deux unités de pH en moins : $10^2 = 100$ fois plus de $\\ce{H3O+}$.',
    },
    {
      question: 'Le pH d’une solution d’hydroxyde de sodium à $10^{-3}$ mol/L vaut :',
      choices: ['11', '3', '7', '14'],
      answer: 0,
      explanation: '$\\text{pH} = 14 + \\log(10^{-3}) = 11$.',
    },
    {
      question: 'On dilue beaucoup un acide fort. Son pH :',
      choices: ['augmente et tend vers 7', 'diminue', 'reste le même', 'dépasse 7'],
      answer: 0,
      explanation: 'La solution se rapproche de l’eau pure, de pH 7.',
    },
    {
      question: 'À l’équivalence du dosage d’un acide fort par une base forte, le pH vaut :',
      choices: ['7', '0', '14', 'le pKa de l’acide'],
      answer: 0,
      explanation: 'La solution ne contient plus que de l’eau et des ions spectateurs ($\\ce{Na+}$, $\\ce{Cl-}$) : elle est neutre.',
    },
    {
      question: 'Pour préparer une solution d’acide à partir d’un acide concentré, on verse :',
      choices: ['l’acide dans l’eau', 'l’eau dans l’acide', 'les deux en même temps très vite', 'peu importe'],
      answer: 0,
      explanation: 'La dissolution dégage beaucoup de chaleur : verser l’eau dans l’acide peut le faire bouillir et projeter.',
    },
  ],
  applications: [
    {
      title: 'La soude des savonnières',
      tagline: 'Pourquoi faut-il des gants pour faire le savon de karité ?',
      situation:
        'Pour fabriquer du savon, une coopérative de femmes dissout 40 g d’hydroxyde de sodium dans de l’eau et complète à 1,0 L. Na = 23, O = 16, H = 1 g/mol.',
      model: 'L’hydroxyde de sodium est une base forte, entièrement dissociée.',
      questions: ['Calcule le pH de cette solution.'],
      check: { value: 14, tolerance: 0.01, unit: '' },
      solution: ['$M(\\ce{NaOH}) = 40$ g/mol : $C = 1{,}0$ mol/L.', '$\\text{pH} = 14 + \\log 1{,}0 = 14$ : c’est une solution extrêmement basique, qui attaque la peau.'],
      fact: 'Dans le savon bien préparé, toute la soude a réagi avec le beurre de karité : il ne reste plus de base forte (c’est la saponification).',
    },
    {
      title: 'Détartrer avec l’esprit de sel',
      tagline: 'Comment préparer une solution moins dangereuse ?',
      situation:
        'L’esprit de sel du commerce est un acide chlorhydrique à environ 10 mol/L. Pour détartrer une bouilloire, on veut préparer 1,0 L d’acide à 0,50 mol/L.',
      model: 'Dilution : la quantité d’acide prélevée se retrouve dans la solution diluée.',
      questions: ['Quel volume d’esprit de sel faut-il prélever, en mL ?'],
      check: { value: 50, tolerance: 0.03, unit: 'mL' },
      solution: ['$C_0 V_0 = C_1 V_1$ : $V_0 = \\dfrac{0{,}50 \\times 1{,}0}{10} = 0{,}050$ L, soit 50 mL.', 'On verse ces 50 mL dans environ 0,5 L d’eau, puis on complète à 1,0 L.'],
      fact: 'Le tartre est du calcaire (carbonate de calcium) : l’acide le dissout en dégageant du dioxyde de carbone, d’où l’effervescence.',
    },
  ],
};
