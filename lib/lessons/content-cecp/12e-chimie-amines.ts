// Importé du site cecp (physique-3d, chapitre « amines ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: "Des dérivés de l'ammoniac, à la fois bases et nucléophiles.",
  objectives: [],
  sections: [
    {
      title: 'Structure et classes',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                "Doublet non liant de l'azote : à l'origine des caractères **basique** et **nucléophile**.",
                "Classe d'une amine = nombre de carbones liés à l'azote.",
                'Les amines de faible masse ont une odeur de poisson (triméthylamine) ; un acide (jus de citron) les transforme en ions ammonium sans odeur.',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "On obtient une amine en remplaçant un ou plusieurs atomes d'hydrogène de l'ammoniac $NH_3$ par des groupes carbonés. L'azote, tétraédrique, garde un **doublet non liant**.",
        },
        {
          kind: 'table',
          head: [
            'Classe',
            'Formule',
            'Exemple',
          ],
          rows: [
            [
              'primaire',
              '$R-NH_2$',
              'éthylamine (éthanamine) $CH_3-CH_2-NH_2$',
            ],
            [
              'secondaire',
              "$R-NH-R'$",
              'N-méthylméthanamine $(CH_3)_2NH$',
            ],
            [
              'tertiaire',
              "$R-N(R')-R''$",
              'N,N-diméthylméthanamine $(CH_3)_3N$',
            ],
          ],
        },
        {
          kind: 'formula',
          tex: 'C_nH_{2n+3}N \\qquad M = 14n + 17\\ \\text{g/mol}',
          label: 'Amine saturée',
        },
        {
          kind: 'text',
          text: "Nomenclature : on ajoute « amine » au nom de l'alcane (éthanamine) ; les groupes portés par l'azote sont précédés de N- (N-méthyléthanamine).",
        },
      ],
    },
    {
      title: 'Caractère basique',
      blocks: [
        {
          kind: 'text',
          text: "Grâce au doublet non liant de l'azote, une amine capte un proton : c'est une **base faible** (au sens de Brønsted).",
        },
        {
          kind: 'formula',
          tex: 'R-NH_2 + H_2O \\rightleftharpoons R-NH_3^+ + HO^- \\qquad pK_a(R-NH_3^+/R-NH_2) \\approx 10{,}5',
        },
        {
          kind: 'list',
          items: [
            "Une solution d'amine est **basique** (BBT bleu, pH ≈ 11 à 12 pour 0,1 mol/L).",
            'Avec un acide fort, la réaction est totale : $R-NH_2 + H_3O^+ \\rightarrow R-NH_3^+ + H_2O$.',
            "On peut doser une amine par l'acide chlorhydrique : à l'équivalence, $C_b V_b = C_a V_{aE}$ ; le pH à l'équivalence est acide (≈ 6).",
            'À la demi-équivalence, $pH = pK_a$.',
          ],
        },
      ],
    },
    {
      title: 'Caractère nucléophile',
      blocks: [
        {
          kind: 'text',
          text: "Le doublet de l'azote peut aussi attaquer un carbone déficitaire en électrons : l'amine est **nucléophile**.",
        },
        {
          kind: 'list',
          items: [
            "**Alkylation** (réaction d'Hofmann) avec un iodoalcane : amine I → amine II → amine III → ion ammonium quaternaire $R_4N^+$.",
            "**Acylation** avec un chlorure d'acyle ou un anhydride : on obtient un **amide** (liaison $-CO-NH-$), réaction totale et rapide. Exemple : $CH_3COCl + 2\\,CH_3NH_2 \\rightarrow CH_3CONHCH_3 + CH_3NH_3^+ + Cl^-$.",
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'amine-isomeres',
      level: 1,
      title: 'Les amines de formule C₃H₉N',
      statement: 'Une monoamine saturée a pour masse molaire 59 g/mol (C = 12, H = 1, N = 14 g/mol).',
      given: [
        {
          label: 'M',
          value: '59 g/mol',
        },
        {
          label: 'formule générale',
          value: 'CₙH₂ₙ₊₃N',
        },
      ],
      parts: [
        {
          label: 'Détermine $n$.',
          answer: {
            kind: 'number',
            value: 3,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            '$M = 14n + 17 = 59 \\Rightarrow n = 3$ : $C_3H_9N$',
          ],
          result: 'n = 3',
        },
        {
          label: "Combien d'amines isomères ont cette formule ?",
          answer: {
            kind: 'number',
            value: 4,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Primaires : propan-1-amine et propan-2-amine.',
            'Secondaire : N-méthyléthanamine. Tertiaire : N,N-diméthylméthanamine (triméthylamine).',
          ],
          result: '4\\ \\text{isomères}',
        },
        {
          label: 'Quelle est la classe de la triméthylamine ?',
          answer: {
            kind: 'text',
            display: 'tertiaire',
            accepted: [
              'tertiaire',
              'III',
              'amine tertiaire',
              'classe III',
            ],
          },
          steps: [
            "L'azote est lié à trois atomes de carbone.",
          ],
          result: '\\text{tertiaire}',
        },
      ],
    },
    {
      id: 'amine-dosage',
      level: 2,
      title: "Dosage d'une amine",
      statement: "On dissout 1,18 g d'une monoamine saturée B dans de l'eau pour obtenir 250 mL de solution. On dose 20 mL de cette solution par l'acide chlorhydrique à 0,10 mol/L ; l'équivalence est obtenue pour 16 mL. À la demi-équivalence, le pH vaut 10,7.",
      given: [
        {
          label: 'm(B)',
          value: '1,18 g dans 250 mL',
        },
        {
          label: 'Ca',
          value: '0,10 mol/L',
        },
        {
          label: 'Vb ; VaE',
          value: '20 mL ; 16 mL',
        },
      ],
      parts: [
        {
          label: "Calcule la concentration de la solution d'amine (en mol/L).",
          answer: {
            kind: 'number',
            value: 0.08,
            tolerance: 0.002,
            unit: 'mol/L',
          },
          steps: [
            "À l'équivalence : $C_b V_b = C_a V_{aE}$",
            '$C_b = \\dfrac{0{,}10\\times 16}{20} = 0{,}08$ mol/L',
          ],
          result: 'C_b = 0{,}08\\ \\text{mol/L}',
        },
        {
          label: 'Calcule la masse molaire de B (en g/mol).',
          answer: {
            kind: 'number',
            value: 59,
            tolerance: 0.5,
            unit: 'g/mol',
          },
          steps: [
            '$n = C_b\\times V = 0{,}08\\times 0{,}250 = 0{,}020$ mol',
            '$M = \\dfrac{1{,}18}{0{,}020} = 59$ g/mol',
          ],
          result: 'M = 59\\ \\text{g/mol}',
        },
        {
          label: 'Quelle est la valeur du pKa du couple $BH^+/B$ ?',
          answer: {
            kind: 'number',
            value: 10.7,
            tolerance: 0.05,
            unit: '',
          },
          steps: [
            'À la demi-équivalence, $[B] = [BH^+]$ donc $pH = pK_a$.',
          ],
          result: 'pK_a = 10{,}7',
        },
      ],
    },
    {
      id: 'amine-amide',
      level: 3,
      title: "Synthèse d'un amide",
      statement: "On fait réagir 4,5 g d'éthylamine $C_2H_5NH_2$ avec un excès de chlorure d'éthanoyle $CH_3COCl$. Deux molécules d'amine sont consommées par molécule d'amide formée : $CH_3COCl + 2\\,C_2H_5NH_2 \\rightarrow CH_3CONHC_2H_5 + C_2H_5NH_3^+ + Cl^-$.",
      given: [
        {
          label: 'm(éthylamine)',
          value: '4,5 g',
        },
      ],
      parts: [
        {
          label: "Quel est le nom de l'amide formé ?",
          answer: {
            kind: 'text',
            display: 'N-éthyléthanamide',
            accepted: [
              'N-éthyléthanamide',
              'N-ethylethanamide',
              'n-éthyléthanamide',
              'N-ethyl ethanamide',
            ],
          },
          steps: [
            "L'azote porte un groupe éthyle : préfixe N-éthyl ; la partie acyle vient de l'acide éthanoïque : éthanamide.",
          ],
          result: '\\text{N-éthyléthanamide}',
        },
        {
          label: "Calcule la masse molaire de l'amide $C_4H_9NO$ (en g/mol).",
          answer: {
            kind: 'number',
            value: 87,
            tolerance: 0.1,
            unit: 'g/mol',
          },
          steps: [
            '$M = 4\\times12 + 9 + 14 + 16 = 87$ g/mol',
          ],
          result: 'M = 87\\ \\text{g/mol}',
        },
        {
          label: "Quelle masse d'amide obtient-on au maximum (en g) ?",
          answer: {
            kind: 'number',
            value: 4.35,
            tolerance: 0.05,
            unit: 'g',
          },
          steps: [
            '$n(\\text{amine}) = \\dfrac{4{,}5}{45} = 0{,}10$ mol',
            "Il faut 2 amines par amide : $n(\\text{amide}) = 0{,}050$ mol (la moitié de l'amine sert de base et capte HCl).",
            '$m = 0{,}050\\times 87 = 4{,}35$ g',
          ],
          result: 'm = 4{,}35\\ \\text{g}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "Le citron et l'odeur du poisson",
      tagline: "Pourquoi le citron chasse-t-il l'odeur ?",
      situation: "L'odeur du poisson pas très frais vient surtout de la triméthylamine $(CH_3)_3N$, une amine volatile. On sert souvent le poisson avec du citron.",
      model: "La triméthylamine est une base : l'acide citrique du citron la transforme en ion triméthylammonium $(CH_3)_3NH^+$, qui n'est pas volatil et ne sent donc plus.",
      questions: [
        "Calcule le pH d'une solution de triméthylamine à 0,010 mol/L (pKa = 9,8).",
      ],
      check: {
        value: 10.882756,
        tolerance: 0.02,
        unit: '',
      },
      solution: [
        'Base faible : $pH \\approx \\tfrac12(14 + pK_a + \\log C)$',
        '$pH \\approx \\tfrac12(14 + 9{,}8 - 2) \\approx 10,9$ : la solution est nettement basique.',
      ],
      fact: 'Pour la même raison, on se lave les mains au jus de citron ou au vinaigre après avoir vidé du poisson.',
    },
    {
      title: 'La synthèse du paracétamol',
      tagline: 'Une amine + un anhydride = un médicament',
      situation: "Le paracétamol ($C_8H_9NO_2$) est fabriqué en faisant réagir le 4-aminophénol (une amine, M = 109 g/mol) avec l'anhydride éthanoïque. Le groupe $-NH_2$ devient un groupe amide $-NH-CO-CH_3$.",
      model: "Le doublet non liant de l'azote attaque l'anhydride : c'est le caractère **nucléophile** des amines. La réaction est rapide et totale.",
      questions: [
        'Quelle masse de paracétamol (M = 151 g/mol) obtient-on à partir de 10,9 g de 4-aminophénol (en g) ?',
      ],
      check: {
        value: 15.1,
        tolerance: 0.02,
        unit: 'g',
      },
      solution: [
        "$n = \\dfrac{10{,}9}{109} = 0{,}100$ mol, une molécule de paracétamol par molécule d'amine.",
        '$m = 0{,}100\\times 151 = 15,1$ g',
      ],
      fact: "Le paracétamol est l'un des médicaments les plus utilisés au monde contre la douleur et la fièvre ; il ne faut pas dépasser la dose prescrite, car il est toxique pour le foie.",
    },
  ],
};
