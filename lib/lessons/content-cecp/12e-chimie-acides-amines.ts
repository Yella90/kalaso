// Importé du site cecp (physique-3d, chapitre « acides-amines ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Les briques des protéines.',
  objectives: [],
  sections: [
    {
      title: 'Structure',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                'Acide α-aminé : $R-CH(NH_2)-COOH$ ; tous chiraux sauf la glycine ; série L dans le vivant.',
                'En solution : amphion $R-CH(NH_3^+)-COO^-$.',
                "Liaison peptidique $-CO-NH-$ ; une molécule d'eau éliminée par liaison.",
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: 'Un acide α-aminé possède un groupe carboxyle $-COOH$ et un groupe amine $-NH_2$ portés par le **même carbone** (le carbone α) :',
        },
        {
          kind: 'formula',
          tex: 'R-CH(NH_2)-COOH',
          legend: [
            '$R$ : chaîne latérale, qui distingue les acides aminés',
          ],
        },
        {
          kind: 'table',
          head: [
            'Nom (code)',
            'R',
            'M (g/mol)',
          ],
          rows: [
            [
              'Glycine (Gly)',
              '$-H$',
              '75',
            ],
            [
              'Alanine (Ala)',
              '$-CH_3$',
              '89',
            ],
            [
              'Valine (Val)',
              '$-CH(CH_3)_2$',
              '117',
            ],
            [
              'Leucine (Leu)',
              '$-CH_2-CH(CH_3)_2$',
              '131',
            ],
            [
              'Sérine (Ser)',
              '$-CH_2-OH$',
              '105',
            ],
            [
              'Cystéine (Cys)',
              '$-CH_2-SH$',
              '121',
            ],
          ],
        },
      ],
    },
    {
      title: 'Chiralité',
      blocks: [
        {
          kind: 'list',
          items: [
            "Sauf la glycine ($R = H$), le carbone α porte quatre groupes différents : c'est un carbone asymétrique, la molécule est **chirale**.",
            'En projection de Fischer (–COOH en haut, R en bas), le groupe $-NH_2$ est à gauche pour la configuration **L** et à droite pour la configuration **D**.',
            'Les acides aminés des protéines naturelles sont tous de la série **L**.',
          ],
        },
      ],
    },
    {
      title: "Propriétés acido-basiques : l'amphion",
      blocks: [
        {
          kind: 'text',
          text: "Le groupe $-COOH$ est acide, le groupe $-NH_2$ est basique : en solution aqueuse, l'acide aminé existe surtout sous forme d'**ion dipolaire** (amphion ou zwitterion) :",
        },
        {
          kind: 'formula',
          tex: 'R-CH(NH_3^+)-COO^-',
        },
        {
          kind: 'text',
          text: "Il est **amphotère** : il réagit avec les acides (sur $-COO^-$) comme avec les bases (sur $-NH_3^+$). Cela explique leur température de fusion élevée et leur solubilité dans l'eau.",
        },
      ],
    },
    {
      title: 'La liaison peptidique',
      blocks: [
        {
          kind: 'text',
          text: "Le groupe $-COOH$ d'un acide aminé réagit avec le groupe $-NH_2$ d'un autre en éliminant une molécule d'eau : il se forme une **liaison peptidique** $-CO-NH-$ (fonction amide).",
        },
        {
          kind: 'formula',
          tex: 'H_2N-CH(R_1)-COOH + H_2N-CH(R_2)-COOH \\rightarrow H_2N-CH(R_1)-CO-NH-CH(R_2)-COOH + H_2O',
        },
        {
          kind: 'list',
          items: [
            'Le produit est un **dipeptide**, noté Ala-Gly par exemple (extrémité $-NH_2$ à gauche). Ala-Gly et Gly-Ala sont **différents**.',
            'Un peptide de $k$ résidus contient $k - 1$ liaisons peptidiques : $M = \\sum M_i - 18(k - 1)$.',
            'Avec deux acides aminés A et B, on peut former 4 dipeptides : A-A, B-B, A-B et B-A.',
            'Pour synthétiser un seul dipeptide (A-B), on **bloque** le groupe $-NH_2$ de A et le groupe $-COOH$ de B, on **active** le groupe $-COOH$ de A, puis on **débloque**.',
            'Les protéines sont des polypeptides de plusieurs centaines de résidus.',
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'aa-alanine',
      level: 1,
      title: "L'alanine",
      statement: "L'alanine a pour formule $CH_3-CH(NH_2)-COOH$ (C = 12, H = 1, N = 14, O = 16 g/mol).",
      given: [
        {
          label: 'formule',
          value: 'C₃H₇NO₂',
        },
      ],
      parts: [
        {
          label: 'Calcule sa masse molaire (en g/mol).',
          answer: {
            kind: 'number',
            value: 89,
            tolerance: 0.1,
            unit: 'g/mol',
          },
          steps: [
            '$M = 3\\times12 + 7 + 14 + 2\\times16 = 89$ g/mol',
          ],
          result: 'M = 89\\ \\text{g/mol}',
        },
        {
          label: "Calcule le pourcentage massique d'azote (en %).",
          answer: {
            kind: 'number',
            value: 15.730337,
            tolerance: 0.05,
            unit: '%',
          },
          steps: [
            '$\\%N = \\dfrac{14}{89}\\times 100 \\approx 15{,}73$ %',
          ],
          result: '\\%N \\approx 15{,}73\\ \\%',
        },
        {
          label: 'Les acides aminés des protéines appartiennent-ils à la série D ou L ?',
          answer: {
            kind: 'text',
            display: 'L',
            accepted: [
              'L',
              'serie L',
              'série L',
              'la série L',
            ],
          },
          steps: [
            'Dans le vivant, les acides α-aminés sont de la série L : en Fischer, $-NH_2$ est à gauche.',
          ],
          result: '\\text{série L}',
        },
      ],
    },
    {
      id: 'aa-dipeptides',
      level: 2,
      title: "Les dipeptides de la glycine et de l'alanine",
      statement: "On fait réagir un mélange de glycine (Gly, M = 75 g/mol) et d'alanine (Ala, M = 89 g/mol), sans aucune précaution.",
      given: [
        {
          label: 'M(Gly) ; M(Ala)',
          value: '75 ; 89 g/mol',
        },
      ],
      parts: [
        {
          label: 'Combien de dipeptides différents peut-on obtenir ?',
          answer: {
            kind: 'number',
            value: 4,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Gly-Gly, Ala-Ala, Gly-Ala et Ala-Gly : chaque acide aminé peut réagir par son groupe $-COOH$ ou par son groupe $-NH_2$.',
          ],
          result: '2^2 = 4',
        },
        {
          label: 'Calcule la masse molaire du dipeptide Gly-Ala (en g/mol).',
          answer: {
            kind: 'number',
            value: 146,
            tolerance: 0.1,
            unit: 'g/mol',
          },
          steps: [
            "La formation de la liaison peptidique élimine une molécule d'eau.",
            '$M = 75 + 89 - 18 = 146$ g/mol',
          ],
          result: 'M = 146\\ \\text{g/mol}',
        },
        {
          label: 'Quel groupe fonctionnel forme la liaison peptidique ? (nom de la fonction)',
          answer: {
            kind: 'text',
            display: 'amide',
            accepted: [
              'amide',
              'fonction amide',
              'groupe amide',
              'une amide',
              'un amide',
            ],
          },
          steps: [
            'La liaison $-CO-NH-$ est une fonction **amide**.',
          ],
          result: '-CO-NH-\\ (\\text{amide})',
        },
      ],
    },
    {
      id: 'aa-valine',
      level: 3,
      title: 'Identifier un acide α-aminé',
      statement: "Un acide α-aminé A de formule $C_nH_{2n+1}NO_2$ (chaîne latérale R saturée et non cyclique) contient 11{,}97 % d'azote en masse.",
      given: [
        {
          label: '%N',
          value: '11,97 %',
        },
      ],
      parts: [
        {
          label: 'Détermine $n$.',
          answer: {
            kind: 'number',
            value: 5,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            '$M = 12n + 2n + 1 + 14 + 32 = 14n + 47$',
            '$\\dfrac{14}{14n + 47} = 0{,}1197 \\Rightarrow 14n + 47 = 117 \\Rightarrow n = 5$',
          ],
          result: 'n = 5 \\Rightarrow C_5H_{11}NO_2',
        },
        {
          label: 'Le carbone α porte un groupe isopropyle $-CH(CH_3)_2$. Quel est le nom de A ?',
          answer: {
            kind: 'text',
            display: 'valine',
            accepted: [
              'valine',
              'la valine',
              'Val',
            ],
          },
          steps: [
            "$(CH_3)_2CH-CH(NH_2)-COOH$ : c'est la valine (Val).",
          ],
          result: '\\text{valine}',
        },
        {
          label: 'Calcule la masse molaire du tripeptide Gly-Ala-Val (en g/mol).',
          answer: {
            kind: 'number',
            value: 245,
            tolerance: 0.1,
            unit: 'g/mol',
          },
          steps: [
            "Deux liaisons peptidiques : deux molécules d'eau éliminées.",
            '$M = 75 + 89 + 117 - 2\\times18 = 245$ g/mol',
          ],
          result: 'M = 245\\ \\text{g/mol}',
        },
        {
          label: 'Combien de tripeptides différents contiennent une fois chacun Gly, Ala et Val ?',
          answer: {
            kind: 'number',
            value: 6,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            "Il s'agit des permutations de 3 éléments : $3! = 6$ (Gly-Ala-Val, Gly-Val-Ala, Ala-Gly-Val…).",
          ],
          result: '3! = 6',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: "L'aspartame, un dipeptide sucré",
      tagline: 'Combien de molécules dans un sachet ?',
      situation: "L'aspartame, édulcorant des boissons « light », est le dérivé (ester méthylique) d'un dipeptide formé de deux acides α-aminés : l'acide aspartique et la phénylalanine. M = 294 g/mol.",
      model: "Les deux acides aminés sont reliés par une liaison peptidique $-CO-NH-$. Les deux sont de la série L ; d'autres stéréoisomères de la molécule ont un goût amer.",
      questions: [
        "Quelle quantité de matière d'aspartame contient un sachet de 40 mg (en µmol) ?",
      ],
      check: {
        value: 136.05442,
        tolerance: 0.02,
        unit: 'µmol',
      },
      solution: [
        '$n = \\dfrac{m}{M} = \\dfrac{40\\times10^{-3}}{294} \\approx 1,36\\times10^{-4}$ mol, soit 136 µmol',
      ],
      fact: "L'aspartame est environ 200 fois plus sucré que le sucre de table.",
    },
    {
      title: 'Pourquoi tant de protéines différentes ?',
      tagline: '20 briques, un nombre immense de combinaisons',
      situation: "Les protéines du blanc d'œuf, du lait ou de nos muscles sont toutes fabriquées à partir de seulement 20 acides α-aminés différents, enchaînés par des liaisons peptidiques.",
      model: "L'ordre des acides aminés (la séquence) compte : Gly-Ala et Ala-Gly sont deux molécules différentes. Avec $n$ acides aminés, on peut former $n^k$ chaînes de $k$ résidus.",
      questions: [
        'Combien de tripeptides différents peut-on former avec les 20 acides α-aminés naturels ?',
      ],
      check: {
        value: 8000,
        tolerance: 0.001,
        unit: '',
      },
      solution: [
        "Chacune des 3 positions peut être occupée par l'un des 20 acides aminés.",
        '$20^3 = 8000$ tripeptides',
      ],
      fact: 'Une protéine courante compte plusieurs centaines de résidus : le nombre de séquences possibles est astronomique.',
    },
  ],
};
