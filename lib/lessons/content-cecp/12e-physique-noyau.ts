// Importé du site cecp (physique-3d, chapitre « noyau-atomique ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Composition, cohésion et énergie de liaison.',
  objectives: [],
  sections: [
    {
      title: 'Composition du noyau',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                '$A = Z + N$',
                '$\\Delta m = Zm_p + Nm_n - m$',
                '$E_\\ell = \\Delta m\\,c^2$, 1 u ↔ 931,5 MeV',
                'Le fer 56 est le plus stable',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Le noyau d'un atome est formé de **nucléons** : $Z$ protons (charge $+e$) et $N$ neutrons (non chargés). On le note $^{A}_{Z}\\text{X}$ avec $A = Z + N$ le nombre de masse. Des **isotopes** ont le même $Z$ mais des $A$ différents (carbone 12 et carbone 14).",
        },
        {
          kind: 'text',
          text: "Le noyau est minuscule : son rayon vaut $R \\approx 1{,}2\\cdot10^{-15}\\,A^{1/3}$ m, environ 100 000 fois moins que l'atome. Pourtant il contient presque toute la masse.",
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: "Les protons se repoussent (force électrique). La cohésion du noyau est assurée par l'**interaction forte**, attractive, très intense mais de très courte portée (≈ 1 fm).",
            },
          ],
        },
      ],
    },
    {
      title: 'Le défaut de masse',
      blocks: [
        {
          kind: 'text',
          text: "La masse d'un noyau est **inférieure** à la somme des masses de ses nucléons séparés. Cette différence est le défaut de masse :",
        },
        {
          kind: 'formula',
          tex: '\\Delta m = Z m_p + (A - Z) m_n - m(^{A}_{Z}\\text{X}) > 0',
          legend: [
            '$m_p = 1{,}00728$ u',
            '$m_n = 1{,}00866$ u',
            '$1\\ \\text{u} = 1{,}66054\\cdot10^{-27}$ kg',
          ],
        },
      ],
    },
    {
      title: 'Énergie de liaison',
      blocks: [
        {
          kind: 'text',
          text: "D'après Einstein, masse et énergie sont équivalentes ($E = mc^2$). L'énergie de liaison $E_\\ell$ est l'énergie qu'il faut fournir pour séparer tous les nucléons du noyau :",
        },
        {
          kind: 'formula',
          tex: 'E_\\ell = \\Delta m\\,c^2 \\qquad 1\\ \\text{u} \\cdot c^2 = 931{,}5\\ \\text{MeV}',
          label: 'Énergie de liaison',
          legend: [
            '1 MeV = $1{,}6\\cdot10^{-13}$ J',
          ],
        },
        {
          kind: 'text',
          text: "Pour comparer la stabilité des noyaux, on calcule l'énergie de liaison **par nucléon** $E_\\ell/A$ : plus elle est grande, plus le noyau est stable.",
        },
        {
          kind: 'table',
          head: [
            'Noyau',
            '$E_\\ell$ (MeV)',
            '$E_\\ell/A$ (MeV/nucléon)',
          ],
          rows: [
            [
              '$^{2}_{1}\\text{H}$',
              '2,2',
              '1,1',
            ],
            [
              '$^{4}_{2}\\text{He}$',
              '28,3',
              '7,1',
            ],
            [
              '$^{12}_{6}\\text{C}$',
              '92,2',
              '7,7',
            ],
            [
              '$^{56}_{26}\\text{Fe}$',
              '492',
              '8,8',
            ],
            [
              '$^{235}_{92}\\text{U}$',
              '1 784',
              '7,6',
            ],
          ],
        },
      ],
    },
    {
      title: "La courbe d'Aston",
      blocks: [
        {
          kind: 'text',
          text: "La courbe $E_\\ell/A$ en fonction de $A$ (courbe d'Aston) présente un maximum vers $A \\approx 56$ (fer) : ce sont les noyaux les plus stables.",
        },
        {
          kind: 'list',
          items: [
            "Noyaux **légers** : ils peuvent s'assembler (**fusion**) pour former un noyau plus lié — énergie du Soleil et des bombes H",
            'Noyaux **lourds** : ils peuvent se casser (**fission**) en deux noyaux moyens plus liés — centrales nucléaires',
          ],
        },
        {
          kind: 'formula',
          tex: 'E = (m_{\\text{réactifs}} - m_{\\text{produits}})\\,c^2',
          label: 'Énergie libérée par une réaction',
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'noy-helium',
      level: 1,
      title: 'La particule α est très soudée',
      statement: "Le noyau d'hélium 4 ($^4_2\\text{He}$) a une masse $m = 4{,}00151$ u. On donne $m_p = 1{,}00728$ u, $m_n = 1{,}00866$ u et $1\\ \\text{u} = 931{,}5$ MeV/c².",
      given: [
        {
          label: 'm(He)',
          value: '4,00151 u',
        },
        {
          label: 'mp',
          value: '1,00728 u',
        },
        {
          label: 'mn',
          value: '1,00866 u',
        },
        {
          label: '1 u',
          value: '931,5 MeV/c²',
        },
      ],
      parts: [
        {
          label: 'Calcule le défaut de masse $\\Delta m$ (en u, 5 décimales).',
          answer: {
            kind: 'number',
            value: 0.03037,
            tolerance: 0.00002,
            unit: 'u',
          },
          steps: [
            '$\\Delta m = Z m_p + (A - Z) m_n - m(\\text{noyau})$',
            '$\\Delta m = 2 \\times 1{,}00728 + 2 \\times 1{,}00866 - 4{,}00151 = 0{,}03037$ u',
          ],
          result: '\\Delta m = 0{,}03037\\ \\text{u}',
        },
        {
          label: "Calcule l'énergie de liaison $E_\\ell$ du noyau (en MeV).",
          answer: {
            kind: 'number',
            value: 28.289655,
            tolerance: 0.05,
            unit: 'MeV',
          },
          steps: [
            '$E_\\ell = \\Delta m\\,c^2 = 0{,}03037 \\times 931{,}5 \\approx 28{,}29$ MeV',
          ],
          result: 'E_\\ell = \\Delta m\\,c^2 \\approx 28{,}3\\ \\text{MeV}',
        },
        {
          label: "Calcule l'énergie de liaison par nucléon (en MeV/nucléon).",
          answer: {
            kind: 'number',
            value: 7.0724137,
            tolerance: 0.02,
            unit: 'MeV/nucléon',
          },
          steps: [
            '$\\dfrac{E_\\ell}{A} = \\dfrac{28{,}29}{4} \\approx 7{,}07$ MeV/nucléon',
          ],
          result: '\\frac{E_\\ell}{A} \\approx 7{,}07\\ \\text{MeV/nucléon}',
        },
      ],
    },
    {
      id: 'noy-fer',
      level: 2,
      title: 'Le fer, noyau le plus stable',
      statement: "Le noyau de fer 56 ($^{56}_{26}\\text{Fe}$) a une masse $m = 55{,}92067$ u. Mêmes données que l'exercice 1.",
      given: [
        {
          label: 'm(Fe)',
          value: '55,92067 u',
        },
        {
          label: 'mp',
          value: '1,00728 u',
        },
        {
          label: 'mn',
          value: '1,00866 u',
        },
      ],
      parts: [
        {
          label: 'Calcule son énergie de liaison par nucléon (MeV/nucléon).',
          answer: {
            kind: 'number',
            value: 8.7895342,
            tolerance: 0.02,
            unit: 'MeV/nucléon',
          },
          steps: [
            '$N = A - Z = 30$ neutrons',
            '$\\Delta m = 26 \\times 1{,}00728 + 30 \\times 1{,}00866 - 55{,}92067 \\approx 0{,}52841$ u',
            '$E_\\ell = \\Delta m \\times 931{,}5 \\approx 492{,}2$ MeV, soit 8{,}79 MeV/nucléon',
          ],
          result: '\\frac{E_\\ell}{A} \\approx 8{,}79\\ \\text{MeV/nucléon}',
        },
        {
          label: "Le fer peut-il libérer de l'énergie par fusion ou par fission ? (réponds « non » ou « oui »)",
          answer: {
            kind: 'text',
            display: 'non',
            accepted: [
              'non',
              'non aucune',
              'aucune',
            ],
          },
          steps: [
            "Le fer est au sommet de la courbe d'Aston : toute transformation donnerait des noyaux moins liés. Seuls les noyaux légers (fusion) et lourds (fission) peuvent libérer de l'énergie.",
          ],
          result: "\\text{sommet de la courbe d'Aston}",
        },
      ],
    },
    {
      id: 'noy-fusion',
      level: 3,
      title: 'La fusion deutérium-tritium',
      source: 'Type concours',
      statement: 'Dans le projet ITER, on veut réaliser la fusion : $^2_1\\text{H} + {}^3_1\\text{H} \\rightarrow {}^4_2\\text{He} + {}^1_0\\text{n}$. Masses : $m(^2\\text{H}) = 2{,}01355$ u, $m(^3\\text{H}) = 3{,}01550$ u, $m(^4\\text{He}) = 4{,}00151$ u, $m_n = 1{,}00866$ u.',
      given: [
        {
          label: 'm(²H)',
          value: '2,01355 u',
        },
        {
          label: 'm(³H)',
          value: '3,01550 u',
        },
        {
          label: 'm(⁴He)',
          value: '4,00151 u',
        },
        {
          label: 'mn',
          value: '1,00866 u',
        },
      ],
      parts: [
        {
          label: "Calcule l'énergie libérée par une réaction (en MeV).",
          answer: {
            kind: 'number',
            value: 17.58672,
            tolerance: 0.05,
            unit: 'MeV',
          },
          steps: [
            '$\\Delta m = m_{\\text{réactifs}} - m_{\\text{produits}}$',
            '$\\Delta m = (2{,}01355 + 3{,}01550) - (4{,}00151 + 1{,}00866) = 0{,}01888$ u',
            '$E = \\Delta m \\times 931{,}5 \\approx 17{,}6$ MeV',
          ],
          result: 'E = \\Delta m\\,c^2 \\approx 17{,}6\\ \\text{MeV}',
        },
        {
          label: "Calcule l'énergie libérée par nucléon de combustible (MeV/nucléon).",
          answer: {
            kind: 'number',
            value: 3.517344,
            tolerance: 0.02,
            unit: 'MeV/nucléon',
          },
          steps: [
            "5 nucléons participent : $\\dfrac{17{,}6}{5} \\approx 3{,}52$ MeV/nucléon, environ 4 fois plus que la fission de l'uranium (≈ 0,85 MeV/nucléon).",
          ],
          result: '\\frac{E}{5} \\approx 3{,}52\\ \\text{MeV/nucléon}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Le Soleil maigrit chaque seconde',
      tagline: 'La fusion transforme de la masse en lumière.',
      situation: "Au cœur du Soleil, des noyaux d'hydrogène fusionnent en hélium. Le Soleil rayonne une puissance de $3{,}8\\times10^{26}$ W.",
      model: "L'énergie rayonnée provient du défaut de masse des réactions de fusion : $E = \\Delta m\\,c^2$. Chaque seconde, le Soleil perd donc une masse $\\Delta m = P/c^2$.",
      questions: [
        'Quelle masse le Soleil perd-il chaque seconde (en millions de tonnes) ?',
      ],
      check: {
        value: 4.2222222,
        tolerance: 0.02,
        unit: 'Mt',
      },
      solution: [
        '$\\Delta m = \\dfrac{E}{c^2}$ avec $E = 3{,}8\\times10^{26}$ J chaque seconde',
        '$\\Delta m = \\dfrac{3{,}8\\times10^{26}}{(3\\times10^8)^2} \\approx 4,22\\times10^{9}$ kg, soit 4,2 millions de tonnes par seconde',
      ],
      fact: "Malgré cette perte énorme, le Soleil est si massif ($2\\times10^{30}$ kg) qu'il brillera encore environ 5 milliards d'années.",
    },
    {
      title: "Un gramme d'uranium",
      tagline: "Autant d'énergie que des tonnes de pétrole.",
      situation: "Dans une centrale nucléaire, chaque fission d'un noyau d'uranium 235 libère environ 200 MeV. On fait fissionner 1 g d'uranium 235 ($M = 235$ g/mol).",
      model: "Les noyaux lourds sont moins liés que les noyaux moyens produits par la fission : la différence d'énergie de liaison est libérée, surtout sous forme d'énergie cinétique des fragments, qui chauffe l'eau du réacteur.",
      questions: [
        "Calcule l'énergie libérée par la fission de 1 g d'uranium 235 (en 10¹⁰ J).",
      ],
      check: {
        value: 8.2104204,
        tolerance: 0.02,
        unit: '×10¹⁰ J',
      },
      solution: [
        '$N = \\dfrac{m}{M}N_A = \\dfrac{1}{235}\\times6{,}022\\times10^{23} \\approx 2,56\\times10^{21}$ noyaux',
        '$E = N\\times200\\ \\text{MeV}\\times1{,}6\\times10^{-13}\\ \\text{J/MeV} \\approx 8,21\\times10^{10}$ J',
      ],
      fact: "1 g d'uranium 235 libère à peu près autant d'énergie que la combustion de 2 tonnes de pétrole.",
    },
  ],
};
