import type { Lesson } from '../types';

// La partie « Solutions tampons » complète le programme malien d'après le programme ivoirien (Terminale D).
export const lesson: Lesson = {
  hook:
    'Combien d’acide y a-t-il vraiment dans ce vinaigre ? Pour le savoir, on le fait réagir goutte à goutte avec de la soude jusqu’au virage d’un indicateur : c’est un **dosage**. Et pourquoi le pH de notre sang reste-t-il à 7,4, alors que nous mangeons du citron et des aliments très divers ? Parce que le sang est une **solution tampon**.',
  objectives: [
    'écrire l’équation d’une réaction acide-base et calculer sa constante ;',
    'exploiter le dosage d’un acide faible par une base forte (équivalence, demi-équivalence) ;',
    'choisir un indicateur coloré adapté ;',
    'définir une solution tampon, la préparer et prévoir l’effet d’un ajout d’acide ou de base.',
  ],
  sections: [
    {
      title: 'La réaction entre un acide et une base',
      blocks: [
        {
          kind: 'formula',
          label: 'Acide du couple 1 et base du couple 2',
          tex: '\\ce{A1H + A2- <=> A1- + A2H} \\qquad K = \\dfrac{K_{a1}}{K_{a2}} = 10^{\\,\\text{p}K_{a2} - \\text{p}K_{a1}}',
        },
        {
          kind: 'rule',
          text: 'La réaction est d’autant plus avancée que l’acide est fort et la base forte. Si $K > 10^4$, on la considère comme **totale**.',
        },
        {
          kind: 'example',
          title: 'acide éthanoïque et soude',
          text: '$\\ce{CH3COOH + OH- -> CH3COO- + H2O}$.',
          steps: ['Couples : $\\ce{CH3COOH}$/$\\ce{CH3COO-}$ (pKa 4,8) et $\\ce{H2O}$/$\\ce{OH-}$ (pKa 14).', '$K = 10^{14 - 4{,}8} = 10^{9{,}2}$ : réaction totale, elle convient pour un dosage.'],
        },
        {
          kind: 'example',
          title: 'ammoniac et acide chlorhydrique',
          text: '$\\ce{NH3 + H3O+ -> NH4+ + H2O}$.',
          steps: ['$K = 10^{9{,}2 - 0} = 10^{9{,}2}$ : réaction totale.'],
        },
      ],
    },
    {
      title: 'Doser un acide faible par une base forte',
      blocks: [
        {
          kind: 'formula',
          label: 'À l’équivalence',
          tex: 'C_a V_a = C_b V_{bE}',
        },
        {
          kind: 'table',
          head: ['Point de la courbe pH = f(Vb)', 'Ce qu’on y lit'],
          rows: [
            ['Début', 'pH de l’acide faible seul, supérieur à $-\\log C_a$'],
            ['Demi-équivalence ($V_b = V_{bE}/2$)', '$[\\ce{AH}] = [\\ce{A-}]$, donc **pH = pKa**'],
            ['Équivalence', 'saut de pH ; **pH > 7**, car il ne reste que la base $\\ce{A-}$'],
            ['Après l’équivalence', 'pH imposé par la soude en excès'],
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Choisir un indicateur coloré',
          blocks: [
            {
              kind: 'text',
              text: 'Sa zone de virage doit être contenue dans le saut de pH. Pour un acide faible dosé par la soude (pH d’équivalence vers 8 à 9), on prend la **phénolphtaléine** (incolore → rose, entre 8,2 et 10). Pour une base faible dosée par un acide fort (pH d’équivalence < 7), on prend le **rouge de méthyle** (4,2 à 6,2).',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« À l’équivalence, le pH vaut toujours 7. »',
          why: 'C’est vrai seulement pour un acide fort dosé par une base forte. Avec un acide faible, la solution contient sa base conjuguée, qui rend le milieu basique.',
          reflex: 'Acide faible + base forte : pH > 7 à l’équivalence ; base faible + acide fort : pH < 7.',
        },
      ],
    },
    {
      title: 'Les solutions tampons',
      blocks: [
        {
          kind: 'definition',
          term: 'Solution tampon',
          text: 'solution dont le pH varie **très peu** quand on y ajoute une petite quantité d’acide ou de base, ou quand on la dilue modérément.',
        },
        {
          kind: 'text',
          text: 'Elle contient un acide faible $\\ce{AH}$ et sa base conjuguée $\\ce{A-}$ en quantités voisines. Si l’on ajoute un acide, la base $\\ce{A-}$ le consomme ; si l’on ajoute une base, l’acide $\\ce{AH}$ la consomme. Le rapport $\\dfrac{[\\ce{A-}]}{[\\ce{AH}]}$ change peu, donc le pH aussi.',
        },
        {
          kind: 'formula',
          label: 'Tampon équimolaire',
          tex: '[\\ce{AH}] = [\\ce{A-}] \\quad \\Longrightarrow \\quad \\text{pH} = \\text{p}K_a',
        },
        {
          kind: 'list',
          items: [
            'mélanger un acide faible et un sel de sa base conjuguée en quantités égales (acide éthanoïque + éthanoate de sodium : pH 4,8) ;',
            'ou ajouter à un acide faible une base forte jusqu’à la demi-équivalence ;',
            'on choisit le couple dont le pKa est le plus proche du pH voulu.',
          ],
        },
        {
          kind: 'callout',
          variant: 'remarque',
          title: 'Complément du programme ivoirien',
          blocks: [
            {
              kind: 'text',
              text: 'Les solutions tampons sont au programme de Terminale D en Côte d’Ivoire. Elles servent à étalonner les pH-mètres (tampons de pH 4, 7 et 10), à conserver les médicaments injectables, et elles maintiennent le pH du sang entre 7,35 et 7,45.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Réaction $\\ce{A1H + A2-}$ : $K = 10^{\\text{p}K_{a2} - \\text{p}K_{a1}}$ ; totale si $K > 10^4$.',
    'Dosage : $C_aV_a = C_bV_{bE}$ ; à la demi-équivalence, pH = pKa.',
    'Acide faible / base forte : pH > 7 à l’équivalence, indicateur : phénolphtaléine.',
    'Tampon : $\\ce{AH}$ et $\\ce{A-}$ en quantités voisines ; pH ≈ pKa ; varie peu par ajout modéré d’acide, de base ou d’eau.',
  ],
  exercises: [
    {
      id: 'ab-vinaigre',
      level: 1,
      title: 'Doser un vinaigre',
      statement:
        'On dilue 10 fois un vinaigre. On dose $V_a = 10{,}0$ mL du vinaigre dilué par de la soude à $C_b = 0{,}10$ mol/L : l’équivalence est atteinte pour $V_{bE} = 10{,}0$ mL. $M(\\ce{CH3COOH}) = 60$ g/mol.',
      parts: [
        {
          label: 'Calcule la concentration du vinaigre dilué (en mol/L).',
          answer: { kind: 'number', value: 0.1, tolerance: 0.002, unit: 'mol/L' },
          steps: ['$C_a = \\dfrac{C_b V_{bE}}{V_a} = \\dfrac{0{,}10 \\times 10{,}0}{10{,}0} = 0{,}10$ mol/L.'],
          result: 'C_a = 0{,}10\\ \\text{mol/L}',
        },
        {
          label: 'Calcule la concentration du vinaigre commercial (en mol/L).',
          answer: { kind: 'number', value: 1.0, tolerance: 0.02, unit: 'mol/L' },
          steps: ['Il a été dilué 10 fois : $C_0 = 10 \\times 0{,}10 = 1{,}0$ mol/L.'],
          result: 'C_0 = 1{,}0\\ \\text{mol/L}',
        },
        {
          label: 'Calcule sa concentration massique en acide éthanoïque (en g/L).',
          answer: { kind: 'number', value: 60, tolerance: 1, unit: 'g/L' },
          steps: ['$C_m = C_0 \\times M = 1{,}0 \\times 60 = 60$ g/L (un vinaigre « à 6° » environ).'],
          result: 'C_m = 60\\ \\text{g/L}',
        },
      ],
    },
    {
      id: 'ab-demi-equivalence',
      level: 2,
      title: 'Lire un pKa sur une courbe de dosage',
      statement:
        'Lors du dosage d’un acide faible $\\ce{AH}$ par la soude, l’équivalence est obtenue pour $V_{bE} = 16{,}0$ mL. Quand on a versé 8,0 mL de soude, le pH-mètre indique 3,8.',
      parts: [
        {
          label: 'Quel est le pKa du couple ?',
          answer: { kind: 'number', value: 3.8, tolerance: 0.02, unit: '' },
          steps: ['8,0 mL est la demi-équivalence : $[\\ce{AH}] = [\\ce{A-}]$, donc pH = pKa = 3,8 (acide méthanoïque).'],
          result: '\\text{p}K_a = 3{,}8',
        },
        {
          label: 'Quel indicateur coloré choisir pour repérer l’équivalence ?',
          answer: { kind: 'text', display: 'phénolphtaléine', accepted: ['phénolphtaléine', 'phenolphtaleine', 'la phénolphtaléine', 'la phenolphtaleine', 'phénolphtaleine'] },
          steps: ['Le pH à l’équivalence est basique (vers 8) : la phénolphtaléine, qui vire entre 8,2 et 10, convient.'],
        },
      ],
    },
    {
      id: 'ab-tampon',
      level: 3,
      title: 'Un tampon résiste à l’acide',
      statement:
        'On prépare 1,0 L de solution contenant 0,10 mol d’acide éthanoïque et 0,10 mol d’éthanoate de sodium (pKa = 4,8). On y ajoute 0,010 mol d’acide chlorhydrique, sans variation de volume.',
      parts: [
        {
          label: 'Quel est le pH avant l’ajout ?',
          answer: { kind: 'number', value: 4.8, tolerance: 0.02, unit: '' },
          steps: ['Tampon équimolaire : pH = pKa = 4,8.'],
          result: '\\text{pH} = 4{,}8',
        },
        {
          label: 'Quel est le pH après l’ajout d’acide chlorhydrique ?',
          answer: { kind: 'number', value: 4.71, tolerance: 0.02, unit: '' },
          steps: [
            'Les ions $\\ce{H3O+}$ réagissent totalement avec la base : $\\ce{CH3COO- + H3O+ -> CH3COOH + H2O}$.',
            'Il reste 0,090 mol de $\\ce{CH3COO-}$ et il y a 0,11 mol de $\\ce{CH3COOH}$.',
            '$\\text{pH} = 4{,}8 + \\log\\dfrac{0{,}090}{0{,}11} \\approx 4{,}71$ : le pH n’a baissé que de 0,09.',
          ],
          result: '\\text{pH} \\approx 4{,}71',
        },
        {
          label: 'Quel serait le pH si l’on ajoutait le même acide dans 1,0 L d’eau pure ?',
          answer: { kind: 'number', value: 2, tolerance: 0.02, unit: '' },
          steps: ['$[\\ce{H3O+}] = 0{,}010$ mol/L, pH = 2 : il aurait chuté de 5 unités.'],
          result: '\\text{pH} = 2',
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'À la demi-équivalence du dosage d’un acide faible par une base forte :',
      choices: ['pH = pKa', 'pH = 7', 'pH = 14', 'pH = 0'],
      answer: 0,
      explanation: 'La moitié de l’acide a été transformée en sa base : $[\\ce{AH}] = [\\ce{A-}]$.',
    },
    {
      question: 'À l’équivalence du dosage de l’acide éthanoïque par la soude, la solution est :',
      choices: ['basique', 'neutre', 'acide', 'tampon'],
      answer: 0,
      explanation: 'Elle contient l’ion éthanoate, une base faible.',
    },
    {
      question: 'Une solution tampon :',
      choices: ['garde un pH presque constant si l’on ajoute un peu d’acide ou de base', 'a toujours un pH de 7', 'neutralise n’importe quelle quantité d’acide', 'ne contient qu’un acide fort'],
      answer: 0,
      explanation: 'Son effet est limité : une grande quantité d’acide ou de base finit par consommer tout le couple.',
    },
    {
      question: 'Pour préparer un tampon de pH 9,2, on choisit le couple :',
      choices: ['$\\ce{NH4+}$/$\\ce{NH3}$', '$\\ce{CH3COOH}$/$\\ce{CH3COO-}$', '$\\ce{HCOOH}$/$\\ce{HCOO-}$', '$\\ce{H3O+}$/$\\ce{H2O}$'],
      answer: 0,
      explanation: 'On prend le couple de pKa le plus proche du pH voulu : 9,2.',
    },
    {
      question: 'La constante de la réaction $\\ce{HCOOH + NH3 -> HCOO- + NH4+}$ (pKa 3,8 et 9,2) vaut :',
      choices: ['$10^{5{,}4}$', '$10^{-5{,}4}$', '$10^{13}$', '1'],
      answer: 0,
      explanation: '$K = 10^{\\text{p}K_{a2} - \\text{p}K_{a1}} = 10^{9{,}2 - 3{,}8} = 10^{5{,}4}$ : réaction totale.',
    },
  ],
  applications: [
    {
      title: 'Le pH du sang',
      tagline: 'Comment le corps garde-t-il son pH à 7,4 ?',
      situation:
        'Le principal tampon du sang est le couple $\\ce{CO2,H2O}$/$\\ce{HCO3-}$ (dioxyde de carbone dissous / ion hydrogénocarbonate), de pKa 6,1. Le pH du sang vaut 7,4.',
      model: '$\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\ce{HCO3-}]}{[\\ce{CO2}]}$.',
      questions: ['Calcule le rapport $\\dfrac{[\\ce{HCO3-}]}{[\\ce{CO2}]}$ dans le sang.'],
      check: { value: 20, tolerance: 0.05, unit: '' },
      solution: ['$\\log\\dfrac{[\\ce{HCO3-}]}{[\\ce{CO2}]} = 7{,}4 - 6{,}1 = 1{,}3$.', '$\\dfrac{[\\ce{HCO3-}]}{[\\ce{CO2}]} = 10^{1{,}3} \\approx 20$.'],
      fact: 'Pendant un effort, les muscles produisent de l’acide : en respirant plus vite, on rejette davantage de $\\ce{CO2}$, ce qui aide le tampon à garder le pH constant.',
    },
    {
      title: 'Étalonner le pH-mètre du laboratoire',
      tagline: 'Pourquoi utilise-t-on des solutions tampons ?',
      situation:
        'Avant chaque séance, le technicien du laboratoire plonge l’électrode du pH-mètre dans des solutions tampons de pH 7,0 puis 4,0, et règle l’appareil pour qu’il affiche ces valeurs.',
      model: 'Une solution tampon a un pH connu et stable.',
      questions: ['Pourquoi ne pas utiliser simplement de l’eau distillée pour le pH 7 ?', 'Quel couple conviendrait pour un tampon de pH 4,8 ?'],
      solution: [
        'L’eau distillée absorbe le dioxyde de carbone de l’air : son pH baisse vers 5,5 à 6. Une solution tampon, elle, garde son pH.',
        'Le couple acide éthanoïque / ion éthanoate (pKa 4,8), en mélange équimolaire.',
      ],
    },
  ],
};
