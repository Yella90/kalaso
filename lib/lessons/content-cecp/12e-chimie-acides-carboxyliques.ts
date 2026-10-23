// Importé du site cecp (physique-3d, chapitre « acides-carboxyliques ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Du vinaigre aux parfums et aux savons.',
  objectives: [],
  sections: [
    {
      title: 'Les acides carboxyliques',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                'Estérification : lente, limitée, athermique ; $K = 4$ pour un alcool primaire.',
                'Saponification : totale ; produit les savons.',
                'Les esters sont souvent odorants : arômes de fruits (banane, ananas, pomme).',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Groupe carboxyle $-COOH$ en bout de chaîne. Acide saturé : $C_nH_{2n}O_2$, $M = 14n + 32$ g/mol. Nom : « acide » + nom de l'alcane avec la terminaison « oïque » (acide éthanoïque, acide 2-méthylpropanoïque).",
        },
        {
          kind: 'formula',
          tex: 'R-COOH + H_2O \\rightleftharpoons R-COO^- + H_3O^+ \\qquad pK_a \\approx 4{,}8',
          label: 'Acide faible',
          legend: [
            "Une solution d'acide éthanoïque à 0,1 mol/L a un pH ≈ 2,9",
            "Dosage par la soude : pH à l'équivalence basique ; indicateur : phénolphtaléine",
          ],
        },
      ],
    },
    {
      title: 'Les dérivés',
      blocks: [
        {
          kind: 'table',
          head: [
            'Dérivé',
            'Groupe',
            "Obtention à partir de l'acide",
          ],
          rows: [
            [
              "chlorure d'acyle",
              '$R-COCl$',
              'action de $PCl_5$ ou $SOCl_2$',
            ],
            [
              "anhydride d'acide",
              '$R-CO-O-CO-R$',
              'déshydratation (avec $P_4O_{10}$)',
            ],
            [
              'ester',
              "$R-COO-R'$",
              'estérification avec un alcool',
            ],
            [
              'amide',
              '$R-CO-NH_2$',
              "déshydratation du carboxylate d'ammonium, ou chlorure d'acyle + ammoniac",
            ],
          ],
        },
        {
          kind: 'text',
          text: "Nom d'un ester : « alcanoate d'alkyle ». Exemple : $CH_3-COO-CH_2-CH_3$ est l'éthanoate d'éthyle (acide éthanoïque + éthanol).",
        },
      ],
    },
    {
      title: 'Estérification et hydrolyse',
      blocks: [
        {
          kind: 'formula',
          tex: "R-COOH + R'-OH \\rightleftharpoons R-COO-R' + H_2O \\qquad K = \\frac{[\\text{ester}][\\text{eau}]}{[\\text{acide}][\\text{alcool}]}",
        },
        {
          kind: 'list',
          items: [
            "Réaction **lente**, **limitée** (équilibre) et **athermique**. L'hydrolyse de l'ester est la réaction inverse.",
            'Mélange équimolaire : rendement ≈ **67 %** avec un alcool primaire ($K = 4$), 60 % secondaire, 5 % tertiaire.',
            "Un catalyseur ($H^+$) et la température accélèrent la réaction mais **ne changent pas** l'équilibre.",
            "Pour améliorer le rendement : excès d'un réactif, élimination de l'eau ou de l'ester au fur et à mesure.",
            "Avec un **chlorure d'acyle** ou un **anhydride** à la place de l'acide, l'estérification est **rapide et totale**.",
          ],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: "Calculer l'équilibre",
          blocks: [
            {
              kind: 'text',
              text: "Tableau d'avancement : acide $a - x$, alcool $b - x$, ester $x$, eau $x$. À l'équilibre, $\\dfrac{x^2}{(a-x)(b-x)} = K$. On résout l'équation du second degré et on garde la racine comprise entre 0 et $\\min(a, b)$.",
            },
          ],
        },
      ],
    },
    {
      title: 'Saponification',
      blocks: [
        {
          kind: 'formula',
          tex: "R-COO-R' + HO^- \\rightarrow R-COO^- + R'-OH",
        },
        {
          kind: 'text',
          text: 'Réaction **totale** et lente (on chauffe). Les corps gras (triglycérides, comme le beurre de karité) donnent avec la soude du glycérol et des ions carboxylates à longue chaîne : le **savon**. Une mole de triglycéride donne trois moles de savon.',
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'acide-formule',
      level: 1,
      title: "Formule d'un acide carboxylique",
      statement: 'Un acide carboxylique saturé a une masse molaire de 88 g/mol (C = 12, H = 1, O = 16 g/mol).',
      given: [
        {
          label: 'M',
          value: '88 g/mol',
        },
        {
          label: 'formule générale',
          value: 'CₙH₂ₙO₂',
        },
      ],
      parts: [
        {
          label: 'Détermine $n$.',
          answer: {
            kind: 'number',
            value: 4,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            '$M = 14n + 32 = 88 \\Rightarrow n = 4$ : $C_4H_8O_2$',
          ],
          result: 'n = 4',
        },
        {
          label: "Combien d'acides carboxyliques isomères ont cette formule ?",
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Acide butanoïque $CH_3-(CH_2)_2-COOH$ et acide 2-méthylpropanoïque $(CH_3)_2CH-COOH$.',
          ],
          result: '2',
        },
        {
          label: "Un ester est isomère de ces acides. Quel est le nom de l'ester obtenu à partir de l'acide éthanoïque et de l'éthanol ?",
          answer: {
            kind: 'text',
            display: "éthanoate d'éthyle",
            accepted: [
              "éthanoate d'éthyle",
              "ethanoate d'ethyle",
              'ethanoate d ethyle',
              "l'éthanoate d'éthyle",
              "acétate d'éthyle",
            ],
          },
          steps: [
            "Nom de l'ester : « alcanoate » (de l'acide) + « d'alkyle » (de l'alcool). $CH_3-COO-C_2H_5$ a bien pour formule $C_4H_8O_2$.",
          ],
          result: "\\text{éthanoate d'éthyle}",
        },
      ],
    },
    {
      id: 'acide-esterification',
      level: 2,
      title: "Rendement d'une estérification",
      statement: "On chauffe à reflux, avec quelques gouttes d'acide sulfurique, 1,0 mol d'acide éthanoïque et 1,0 mol d'éthanol. La constante d'équilibre vaut $K = 4$.",
      given: [
        {
          label: 'acide ; alcool',
          value: '1,0 mol ; 1,0 mol',
        },
        {
          label: 'K',
          value: '4',
        },
      ],
      parts: [
        {
          label: "Quelle quantité d'ester (en mol) obtient-on à l'équilibre ?",
          answer: {
            kind: 'number',
            value: 0.66666667,
            tolerance: 0.005,
            unit: 'mol',
          },
          steps: [
            "Tableau d'avancement : acide $1 - x$, alcool $1 - x$, ester $x$, eau $x$.",
            '$\\dfrac{x^2}{(1-x)^2} = 4 \\Rightarrow \\dfrac{x}{1-x} = 2 \\Rightarrow x = \\dfrac23$',
          ],
          result: 'x_{eq} = 0{,}667\\ \\text{mol}',
        },
        {
          label: "Quelle masse d'ester (M = 88 g/mol) obtient-on (en g) ?",
          answer: {
            kind: 'number',
            value: 58.666667,
            tolerance: 0.5,
            unit: 'g',
          },
          steps: [
            '$m = 0{,}667\\times 88 \\approx 58{,}7$ g',
          ],
          result: 'm \\approx 58{,}7\\ \\text{g}',
        },
        {
          label: "Quel est le rôle de l'acide sulfurique ?",
          answer: {
            kind: 'text',
            display: 'catalyseur',
            accepted: [
              'catalyseur',
              'un catalyseur',
              'catalyser',
              'catalyse',
              'il catalyse la reaction',
              'accélérer la réaction',
              'accelerer la reaction',
            ],
          },
          steps: [
            "Il accélère la réaction (catalyseur) sans modifier l'état d'équilibre ni le rendement.",
          ],
          result: '\\text{catalyseur}',
        },
      ],
    },
    {
      id: 'acide-exces',
      level: 2,
      title: "Déplacer l'équilibre",
      statement: "On recommence l'expérience avec 1,0 mol d'acide éthanoïque et 2,0 mol d'éthanol ($K = 4$).",
      given: [
        {
          label: 'acide ; alcool',
          value: '1,0 mol ; 2,0 mol',
        },
        {
          label: 'K',
          value: '4',
        },
      ],
      parts: [
        {
          label: "Calcule l'avancement à l'équilibre (en mol).",
          answer: {
            kind: 'number',
            value: 0.84529946,
            tolerance: 0.005,
            unit: 'mol',
          },
          steps: [
            '$\\dfrac{x^2}{(1-x)(2-x)} = 4 \\Rightarrow 3x^2 - 12x + 8 = 0$',
            'On garde la racine inférieure à 1 : $x = \\dfrac{12 - \\sqrt{48}}{6} \\approx 0{,}845$ mol',
          ],
          result: 'x_{eq} \\approx 0{,}845\\ \\text{mol}',
        },
        {
          label: 'Calcule le rendement (en %).',
          answer: {
            kind: 'number',
            value: 84.529946,
            tolerance: 0.5,
            unit: '%',
          },
          steps: [
            "Le réactif limitant est l'acide (1 mol) : $r = \\dfrac{0{,}845}{1} \\approx 84{,}5$ %",
          ],
          result: 'r \\approx 84{,}5\\ \\%',
        },
      ],
    },
    {
      id: 'acide-savon',
      level: 3,
      title: 'Fabrication de savon',
      statement: "Une coopérative fabrique du savon en chauffant 1,0 kg d'oléine (triglycéride, M = 884 g/mol) avec une solution de soude à 5,0 mol/L en excès. Le savon obtenu est l'oléate de sodium (M = 304 g/mol). Une mole d'oléine donne trois moles de savon.",
      given: [
        {
          label: 'm(oléine)',
          value: '1,0 kg',
        },
        {
          label: 'M(oléine) ; M(savon)',
          value: '884 ; 304 g/mol',
        },
        {
          label: '[soude]',
          value: '5,0 mol/L',
        },
      ],
      parts: [
        {
          label: 'Quelle masse de savon obtient-on au maximum (en g) ?',
          answer: {
            kind: 'number',
            value: 1031.6742,
            tolerance: 3,
            unit: 'g',
          },
          steps: [
            '$n(\\text{oléine}) = \\dfrac{1000}{884} = 1{,}131$ mol',
            '$n(\\text{savon}) = 3\\,n = 3{,}39$ mol ; $m = 3{,}39\\times 304 \\approx 1032$ g',
          ],
          result: 'm \\approx 1032\\ \\text{g}',
        },
        {
          label: 'Quel volume minimal de soude faut-il (en mL) ?',
          answer: {
            kind: 'number',
            value: 678.73303,
            tolerance: 3,
            unit: 'mL',
          },
          steps: [
            '$n(HO^-) = 3\\,n(\\text{oléine}) = 3{,}39$ mol ; $V = \\dfrac{n}{C} = 679$ mL',
          ],
          result: 'V \\approx 679\\ \\text{mL}',
        },
        {
          label: 'Avec un rendement de 80 %, quelle masse de savon obtient-on (en g) ?',
          answer: {
            kind: 'number',
            value: 825.33937,
            tolerance: 3,
            unit: 'g',
          },
          steps: [
            '$m = 0{,}80\\times 1032 \\approx 825$ g',
          ],
          result: 'm \\approx 825\\ \\text{g}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "Le degré d'un vinaigre",
      tagline: "Combien d'acide dans la bouteille ?",
      situation: 'On dilué 10 fois un vinaigre, puis on dose 10 mL de la solution diluée par la soude à 0,10 mol/L en présence de phénolphtaléine. Le virage au rose a lieu après 10 mL de soude.',
      model: "L'acide éthanoïque réagit totalement avec les ions hydroxyde : $CH_3COOH + HO^- \\rightarrow CH_3COO^- + H_2O$. À l'équivalence, $C_a V_a = C_b V_{bE}$.",
      questions: [
        'Calcule la concentration massique en acide éthanoïque du vinaigre (non dilué), en g/L.',
      ],
      check: {
        value: 60,
        tolerance: 0.02,
        unit: 'g/L',
      },
      solution: [
        'Solution diluée : $C = \\dfrac{0{,}10\\times 10}{10} = 0,10$ mol/L',
        'Vinaigre : $C_0 = 10\\,C = 1,0$ mol/L ; $C_m = C_0\\times 60 = 60$ g/L',
      ],
      fact: "Un vinaigre « à 6° » contient environ 6 g d'acide éthanoïque pour 100 g de vinaigre. La fermentation acétique est due à des bactéries qui oxydent l'éthanol.",
    },
    {
      title: 'Le savon au beurre de karité',
      tagline: 'Combien de savon avec 1 kg de karité ?',
      situation: 'Des coopératives de femmes fabriquent du savon en chauffant du beurre de karité avec de la soude. On assimile le beurre à de la stéarine (triglycéride, M = 891 g/mol) ; le savon est du stéarate de sodium (M = 306 g/mol).',
      model: "C'est une **saponification**, réaction totale : un triglycéride + 3 ions hydroxyde donnent du glycérol et 3 ions carboxylates (le savon).",
      questions: [
        'Quelle masse de savon obtient-on au maximum avec 1,0 kg de beurre de karité (en g) ?',
      ],
      check: {
        value: 1030.303,
        tolerance: 0.02,
        unit: 'g',
      },
      solution: [
        '$n(\\text{stéarine}) = \\dfrac{1000}{891}$ mol ; $n(\\text{savon}) = 3\\,n$',
        '$m = 3\\times\\dfrac{1000}{891}\\times 306 \\approx 1030$ g',
      ],
      fact: "Le glycérol formé en même temps est un bon hydratant pour la peau : c'est pourquoi on le laisse souvent dans les savons artisanaux.",
    },
    {
      title: "Fabriquer l'arôme d'ananas",
      tagline: "Quelle masse d'ester à l'équilibre ?",
      situation: "L'arôme d'ananas des bonbons est du butanoate d'éthyle, préparé par estérification de l'acide butanoïque avec l'éthanol. On mélange 1,0 mol de chaque réactif ($K = 4$).",
      model: "L'estérification est lente et limitée : l'équilibre est atteint quand $\\dfrac{x^2}{(1-x)^2} = 4$, soit un rendement de 67 %.",
      questions: [
        "Quelle masse de butanoate d'éthyle (M = 116 g/mol) obtient-on à l'équilibre (en g) ?",
      ],
      check: {
        value: 77.333333,
        tolerance: 0.02,
        unit: 'g',
      },
      solution: [
        '$\\dfrac{x}{1 - x} = 2 \\Rightarrow x = \\dfrac23$ mol',
        '$m = \\dfrac23\\times 116 \\approx 77,3$ g',
      ],
      fact: "Beaucoup d'arômes de fruits sont des esters : éthanoate de 3-méthylbutyle (banane), éthanoate d'octyle (orange), méthanoate d'éthyle (rhum).",
    },
  ],
};
