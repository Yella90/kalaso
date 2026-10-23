import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Le jus de bissap est rouge vif ; ajoute une pincée de potasse ou de cendre, il vire au bleu-vert. Le citron, le vinaigre, la vitamine C sont des acides, mais beaucoup moins dangereux que l’esprit de sel à la même concentration : ce sont des **acides faibles**. Chacun forme avec sa base un **couple**, que l’on classe grâce à un nombre : le **pKa**.',
  objectives: [
    'définir un acide et une base au sens de Brønsted, et écrire un couple acide/base ;',
    'définir $K_a$ et $\\text{p}K_a$, et utiliser la relation $\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\ce{A-}]}{[\\ce{AH}]}$ ;',
    'tracer et utiliser un diagramme de prédominance ;',
    'comparer la force des acides et des bases.',
  ],
  sections: [
    {
      title: 'Acides, bases et couples',
      blocks: [
        {
          kind: 'definition',
          term: 'Acide (Brønsted)',
          text: 'espèce capable de **céder** un proton $\\ce{H+}$. Une **base** est une espèce capable d’en **capter** un.',
        },
        {
          kind: 'formula',
          label: 'Couple acide/base et demi-équation',
          tex: '\\ce{AH <=> A- + H+}',
          legend: ['$\\ce{AH}$ : l’acide ; $\\ce{A-}$ : sa base conjuguée'],
        },
        {
          kind: 'table',
          head: ['Couple', 'Acide', 'Base'],
          rows: [
            ['$\\ce{CH3COOH}$/$\\ce{CH3COO-}$', 'acide éthanoïque (vinaigre)', 'ion éthanoate'],
            ['$\\ce{NH4+}$/$\\ce{NH3}$', 'ion ammonium', 'ammoniac'],
            ['$\\ce{H3O+}$/$\\ce{H2O}$', 'ion oxonium', 'eau'],
            ['$\\ce{H2O}$/$\\ce{OH-}$', 'eau', 'ion hydroxyde'],
          ],
        },
        {
          kind: 'text',
          text: 'L’eau est acide dans un couple et base dans l’autre : c’est un **ampholyte**.',
        },
        {
          kind: 'definition',
          term: 'Acide faible',
          text: 'acide dont la réaction avec l’eau est limitée : $\\ce{AH + H2O <=> A- + H3O+}$. En solution, l’acide $\\ce{AH}$ et sa base $\\ce{A-}$ coexistent.',
        },
      ],
    },
    {
      title: 'Constante d’acidité et pKa',
      blocks: [
        {
          kind: 'formula',
          tex: 'K_a = \\dfrac{[\\ce{A-}][\\ce{H3O+}]}{[\\ce{AH}]} \\qquad \\text{p}K_a = -\\log K_a',
        },
        {
          kind: 'formula',
          label: 'Conséquence',
          tex: '\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\ce{A-}]}{[\\ce{AH}]}',
        },
        {
          kind: 'table',
          head: ['Couple', 'pKa (25 °C)'],
          rows: [
            ['$\\ce{H3O+}$/$\\ce{H2O}$', '0'],
            ['acide citrique (citron, 1ʳᵉ acidité)', '3,1'],
            ['$\\ce{HCOOH}$/$\\ce{HCOO-}$ (acide méthanoïque, fourmis)', '3,8'],
            ['acide ascorbique (vitamine C)', '4,1'],
            ['$\\ce{CH3COOH}$/$\\ce{CH3COO-}$', '4,8'],
            ['$\\ce{NH4+}$/$\\ce{NH3}$', '9,2'],
            ['$\\ce{H2O}$/$\\ce{OH-}$', '14'],
          ],
        },
        {
          kind: 'rule',
          text: 'Plus le $\\text{p}K_a$ est **petit**, plus l’acide du couple est **fort** (il cède facilement son proton). Plus le $\\text{p}K_a$ est **grand**, plus la base du couple est forte.',
        },
      ],
    },
    {
      title: 'Le diagramme de prédominance',
      blocks: [
        {
          kind: 'text',
          text: 'D’après la relation précédente : si $\\text{pH} < \\text{p}K_a$, alors $[\\ce{AH}] > [\\ce{A-}]$ ; si $\\text{pH} > \\text{p}K_a$, $[\\ce{A-}] > [\\ce{AH}]$ ; si $\\text{pH} = \\text{p}K_a$, les deux formes sont en quantités égales.',
        },
        {
          kind: 'formula',
          tex: '\\underbrace{\\quad \\ce{AH}\\ \\text{prédomine} \\quad}_{\\text{pH} < \\text{p}K_a} \\Big|_{\\ \\text{p}K_a} \\underbrace{\\quad \\ce{A-}\\ \\text{prédomine} \\quad}_{\\text{pH} > \\text{p}K_a}',
        },
        {
          kind: 'example',
          title: 'l’acide éthanoïque dans l’estomac et dans le sang',
          text: '$\\text{p}K_a = 4{,}8$.',
          steps: ['Dans l’estomac (pH ≈ 2) : pH < pKa, la forme acide $\\ce{CH3COOH}$ prédomine.', 'Dans le sang (pH ≈ 7,4) : $\\dfrac{[\\ce{A-}]}{[\\ce{AH}]} = 10^{7{,}4 - 4{,}8} = 10^{2{,}6} \\approx 400$ : presque tout est sous forme d’ion éthanoate.'],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          title: 'Les indicateurs colorés',
          blocks: [
            {
              kind: 'text',
              text: 'Un indicateur coloré est un couple acide/base $\\ce{HInd}$/$\\ce{Ind-}$ dont les deux formes n’ont pas la même couleur. Sa **zone de virage** s’étend à peu près de $\\text{p}K_a - 1$ à $\\text{p}K_a + 1$. Le bissap contient des anthocyanes, des indicateurs naturels : rouges en milieu acide, bleu-vert en milieu basique.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Acide : donneur de $\\ce{H+}$ ; base : accepteur ; couple $\\ce{AH}$/$\\ce{A-}$.',
    '$K_a = \\dfrac{[\\ce{A-}][\\ce{H3O+}]}{[\\ce{AH}]}$, $\\text{p}K_a = -\\log K_a$ et $\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\ce{A-}]}{[\\ce{AH}]}$.',
    'pH < pKa : $\\ce{AH}$ prédomine ; pH > pKa : $\\ce{A-}$ prédomine.',
    'Petit pKa : acide fort ; grand pKa : base forte. Zone de virage d’un indicateur : pKa ± 1.',
  ],
  exercises: [
    {
      id: 'couple-melange',
      level: 1,
      title: 'pH d’un mélange acide éthanoïque – éthanoate',
      statement:
        'Une solution contient $[\\ce{CH3COOH}] = 0{,}10$ mol/L et $[\\ce{CH3COO-}] = 0{,}050$ mol/L. $\\text{p}K_a = 4{,}8$.',
      parts: [
        {
          label: 'Calcule le pH de la solution.',
          answer: { kind: 'number', value: 4.5, tolerance: 0.02, unit: '' },
          steps: ['$\\text{pH} = 4{,}8 + \\log\\dfrac{0{,}050}{0{,}10} = 4{,}8 - 0{,}30 = 4{,}5$.'],
          result: '\\text{pH} = 4{,}5',
        },
        {
          label: 'Quelle forme prédomine ? (« acide » ou « base »)',
          answer: { kind: 'text', display: 'acide (CH₃COOH)', accepted: ['acide', 'la forme acide', 'forme acide', 'CH3COOH', 'acide éthanoïque', 'acide ethanoique'] },
          steps: ['pH = 4,5 < pKa = 4,8 : la forme acide $\\ce{CH3COOH}$ prédomine, comme le montrent aussi les concentrations.'],
        },
      ],
    },
    {
      id: 'couple-ka',
      level: 2,
      title: 'Trouver le pKa d’un acide',
      statement: 'Une solution d’un acide faible $\\ce{AH}$ à $1{,}0 \\times 10^{-2}$ mol/L a un pH de 3,4.',
      parts: [
        {
          label: 'Calcule $[\\ce{H3O+}]$ (en mol/L).',
          answer: { kind: 'number', value: 0.000398, tolerance: 0.000005, unit: 'mol/L' },
          steps: ['$[\\ce{H3O+}] = 10^{-3{,}4} \\approx 3{,}98 \\times 10^{-4}$ mol/L.'],
          result: '[\\ce{H3O+}] \\approx 3{,}98 \\times 10^{-4}\\ \\text{mol/L}',
        },
        {
          label: 'Calcule $K_a$.',
          answer: { kind: 'number', value: 0.0000165, tolerance: 0.0000005, unit: '' },
          steps: [
            'La réaction avec l’eau forme autant de $\\ce{A-}$ que de $\\ce{H3O+}$ : $[\\ce{A-}] = 3{,}98 \\times 10^{-4}$ mol/L.',
            '$[\\ce{AH}] = 1{,}0 \\times 10^{-2} - 3{,}98 \\times 10^{-4} \\approx 9{,}60 \\times 10^{-3}$ mol/L.',
            '$K_a = \\dfrac{(3{,}98 \\times 10^{-4})^2}{9{,}60 \\times 10^{-3}} \\approx 1{,}65 \\times 10^{-5}$.',
          ],
          result: 'K_a \\approx 1{,}65 \\times 10^{-5}',
        },
        {
          label: 'Calcule le pKa.',
          answer: { kind: 'number', value: 4.78, tolerance: 0.03, unit: '' },
          steps: ['$\\text{p}K_a = -\\log(1{,}65 \\times 10^{-5}) \\approx 4{,}78$ : c’est probablement l’acide éthanoïque.'],
          result: '\\text{p}K_a \\approx 4{,}8',
        },
      ],
    },
    {
      id: 'couple-ammonium',
      level: 3,
      title: 'L’ammoniac dans le sang',
      statement: 'Couple $\\ce{NH4+}$/$\\ce{NH3}$, $\\text{p}K_a = 9{,}2$. Le pH du sang vaut 7,4.',
      parts: [
        {
          label: 'Quelle forme prédomine dans le sang ? (écris la formule)',
          answer: { kind: 'text', display: 'NH₄⁺', accepted: ['NH4+', 'NH4⁺', 'nh4+', 'ion ammonium', 'ammonium'] },
          steps: ['pH = 7,4 < pKa = 9,2 : la forme acide, l’ion ammonium $\\ce{NH4+}$, prédomine.'],
        },
        {
          label: 'Calcule le rapport $\\dfrac{[\\ce{NH3}]}{[\\ce{NH4+}]}$.',
          answer: { kind: 'number', value: 0.0158, tolerance: 0.0005, unit: '' },
          steps: ['$\\dfrac{[\\ce{NH3}]}{[\\ce{NH4+}]} = 10^{\\text{pH} - \\text{p}K_a} = 10^{-1{,}8} \\approx 1{,}6 \\times 10^{-2}$.'],
          result: '\\dfrac{[\\ce{NH3}]}{[\\ce{NH4+}]} \\approx 1{,}6 \\times 10^{-2}',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La base conjuguée de l’acide éthanoïque $\\ce{CH3COOH}$ est :',
      choices: ['$\\ce{CH3COO-}$', '$\\ce{CH3COOH2+}$', '$\\ce{OH-}$', '$\\ce{CH3CH2OH}$'],
      answer: 0,
      explanation: 'On enlève un proton $\\ce{H+}$ à l’acide.',
    },
    {
      question: 'Parmi ces acides, le plus fort est celui de pKa :',
      choices: ['3,1', '4,8', '9,2', '14'],
      answer: 0,
      explanation: 'Plus le pKa est petit, plus l’acide cède facilement son proton.',
    },
    {
      question: 'Si pH = pKa, alors :',
      choices: ['$[\\ce{AH}] = [\\ce{A-}]$', '$[\\ce{AH}] = 0$', '$[\\ce{A-}] = 10\\,[\\ce{AH}]$', 'la solution est neutre'],
      answer: 0,
      explanation: '$\\log\\dfrac{[\\ce{A-}]}{[\\ce{AH}]} = 0$ : les deux formes sont en quantités égales.',
    },
    {
      question: 'Un indicateur de pKa 7,1 change de couleur à peu près entre :',
      choices: ['pH 6,1 et 8,1', 'pH 0 et 7,1', 'pH 7,1 et 14', 'pH 3 et 5'],
      answer: 0,
      explanation: 'Zone de virage : pKa − 1 à pKa + 1.',
    },
    {
      question: 'L’eau est un ampholyte parce qu’elle :',
      choices: ['est acide dans un couple et base dans un autre', 'est neutre', 'conduit le courant', 'dissout les ions'],
      answer: 0,
      explanation: '$\\ce{H3O+}$/$\\ce{H2O}$ (elle est base) et $\\ce{H2O}$/$\\ce{OH-}$ (elle est acide).',
    },
  ],
  applications: [
    {
      title: 'La vitamine C dans l’intestin',
      tagline: 'Sous quelle forme la vitamine C est-elle absorbée ?',
      situation:
        'La vitamine C (acide ascorbique, $\\text{p}K_a = 4{,}1$) passe de l’estomac (pH ≈ 2) à l’intestin (pH ≈ 7).',
      model: 'On ne considère que la première acidité de l’acide ascorbique.',
      questions: ['Dans l’intestin, combien de fois la forme basique (ascorbate) est-elle plus abondante que la forme acide ?'],
      check: { value: 794, tolerance: 0.05, unit: '' },
      solution: ['$\\dfrac{[\\ce{A-}]}{[\\ce{AH}]} = 10^{7 - 4{,}1} = 10^{2{,}9} \\approx 794$.', 'Dans l’estomac, c’est l’inverse : $10^{2 - 4{,}1} \\approx 0{,}008$, la forme acide prédomine.'],
      fact: 'La vitamine C se détruit à la chaleur : le jus de baobab (pain de singe) en apporte beaucoup s’il n’est pas bouilli.',
    },
    {
      title: 'Le bissap qui change de couleur',
      tagline: 'Un indicateur coloré dans la cuisine',
      situation:
        'Le jus de bissap (oseille de Guinée) est rouge. Si on y ajoute du jus de citron, il devient rouge plus vif ; avec un peu de bicarbonate de soude, il vire au violet puis au bleu-vert.',
      model: 'Les anthocyanes du bissap forment des couples acide/base de couleurs différentes.',
      questions: ['Quelle forme des anthocyanes prédomine dans le jus additionné de citron ?', 'Pourquoi le bissap peut-il servir d’indicateur coloré « maison » ?'],
      solution: [
        'Le citron abaisse le pH : la forme acide (rouge) prédomine.',
        'Sa couleur dépend du pH : en comparant avec des solutions connues, on peut savoir si un liquide est acide ou basique.',
      ],
    },
  ],
};
