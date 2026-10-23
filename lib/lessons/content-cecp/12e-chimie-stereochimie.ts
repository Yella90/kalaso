// Importé du site cecp (physique-3d, chapitre « stereochimie ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Deux molécules peuvent avoir la même formule… et pourtant être différentes.',
  objectives: [],
  sections: [
    {
      title: 'Isomérie de constitution',
      blocks: [
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: "La thalidomide, un médicament des années 1950, était vendue sous forme racémique : l'un des énantiomères calmait les nausées, l'autre provoquait de graves malformations. Depuis, on vérifie l'effet de chaque énantiomère.",
            },
          ],
        },
        {
          kind: 'text',
          text: 'Des **isomères** ont la même formule brute mais des formules développées différentes. Pour $C_4H_{10}O$ par exemple :',
        },
        {
          kind: 'table',
          head: [
            "Type d'isomérie",
            'Exemple',
          ],
          rows: [
            [
              'de chaîne (squelette)',
              'butan-1-ol / 2-méthylpropan-1-ol',
            ],
            [
              'de position (groupe fonctionnel)',
              'butan-1-ol / butan-2-ol',
            ],
            [
              'de fonction',
              'butan-1-ol (alcool) / éthoxyéthane (éther)',
            ],
          ],
        },
      ],
    },
    {
      title: 'Représentations spatiales',
      blocks: [
        {
          kind: 'list',
          items: [
            "**Représentation de Cram** : traits pleins dans le plan, triangle plein vers l'avant, triangle hachuré vers l'arrière.",
            "**Projection de Newman** : on regarde la molécule dans l'axe d'une liaison C–C ; le carbone avant est un point, le carbone arrière un cercle.",
            "**Projection de Fischer** : la chaîne carbonée est verticale (liaisons vers l'arrière), les liaisons horizontales pointent vers l'avant.",
          ],
        },
      ],
    },
    {
      title: 'Stéréoisomérie de conformation',
      blocks: [
        {
          kind: 'text',
          text: "La rotation autour d'une liaison simple C–C est quasi libre : une molécule passe sans cesse d'une **conformation** à l'autre. Les conformations ne sont pas des isomères séparables.",
        },
        {
          kind: 'list',
          items: [
            'Éthane : conformation **décalée** (la plus stable) et **éclipsée** (12 kJ/mol plus haut).',
            'Butane : conformation **anti** (CH₃ opposés, la plus stable), **gauche**, et éclipsées (les moins stables).',
          ],
        },
      ],
    },
    {
      title: 'Stéréoisomérie de configuration',
      blocks: [
        {
          kind: 'text',
          text: "Pour passer d'un isomère de configuration à l'autre, il faudrait **rompre une liaison** : ce sont des molécules différentes.",
        },
        {
          kind: 'callout',
          variant: 'retenir',
          title: 'Isomérie Z / E',
          blocks: [
            {
              kind: 'text',
              text: "Autour d'une double liaison C=C, la rotation est bloquée. Si chaque carbone porte deux groupes différents, il existe deux isomères : **Z** (groupes prioritaires du même côté) et **E** (de part et d'autre). Exemple : (Z)- et (E)-but-2-ène.",
            },
          ],
        },
      ],
    },
    {
      title: 'Chiralité et énantiomérie',
      blocks: [
        {
          kind: 'list',
          items: [
            "Un objet est **chiral** s'il n'est pas superposable à son image dans un miroir (comme nos mains).",
            'Un **carbone asymétrique** $C^*$ est un carbone tétraédrique lié à **quatre groupes différents**. Une molécule possédant un seul $C^*$ est chirale.',
            'Une molécule chirale et son image dans un miroir sont deux **énantiomères**. Ils ont les mêmes propriétés physiques et chimiques usuelles, mais dévient la lumière polarisée en sens opposés et ont souvent des effets biologiques différents.',
            'Un mélange équimolaire de deux énantiomères est un **mélange racémique** (optiquement inactif).',
            'Une molécule à $n$ carbones asymétriques possède au plus $2^n$ stéréoisomères.',
          ],
        },
      ],
    },
    {
      title: 'Configuration absolue R / S (règles de Cahn-Ingold-Prelog)',
      blocks: [
        {
          kind: 'list',
          items: [
            "1. Classer les quatre groupes liés à $C^*$ : le plus prioritaire est celui dont l'atome lié a le **plus grand numéro atomique** (I > Br > Cl > O > N > C > H).",
            "2. En cas d'égalité, comparer les atomes suivants (sphère suivante) ; une double liaison compte comme deux liaisons simples.",
            "3. Regarder la molécule avec le groupe de priorité 4 **vers l'arrière**.",
            "4. Si 1 → 2 → 3 tourne dans le sens des aiguilles d'une montre : configuration **R** ; sinon **S**.",
          ],
        },
        {
          kind: 'formula',
          tex: '-NH_2 > -COOH > -CH_3 > -H',
          label: 'Exemple : alanine',
          legend: [
            'La L-alanine des protéines est de configuration S',
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'stereo-butan-2-ol',
      level: 1,
      title: 'Le butan-2-ol est-il chiral ?',
      statement: 'On considère le butan-2-ol : $CH_3-CH(OH)-CH_2-CH_3$.',
      given: [
        {
          label: 'molécule',
          value: 'CH₃–CH(OH)–CH₂–CH₃',
        },
      ],
      parts: [
        {
          label: 'Combien de carbones asymétriques la molécule possède-t-elle ?',
          answer: {
            kind: 'number',
            value: 1,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Un carbone asymétrique est lié à quatre groupes différents.',
            'Le carbone 2 porte $-H$, $-OH$, $-CH_3$ et $-CH_2-CH_3$ : il est asymétrique. Les autres portent au moins deux H.',
          ],
          result: '1\\ C^*',
        },
        {
          label: 'Combien de stéréoisomères de configuration existe-t-il ?',
          answer: {
            kind: 'number',
            value: 2,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            "Avec un seul $C^*$ : $2^1 = 2$ stéréoisomères, images l'un de l'autre dans un miroir.",
          ],
          result: '2^1 = 2',
        },
        {
          label: 'Comment appelle-t-on ces deux stéréoisomères ?',
          answer: {
            kind: 'text',
            display: 'des énantiomères',
            accepted: [
              'énantiomères',
              'enantiomeres',
              'des énantiomères',
              'des enantiomeres',
              'enantiomere',
              'énantiomère',
            ],
          },
          steps: [
            "Deux molécules images l'une de l'autre dans un miroir et non superposables sont des **énantiomères**.",
          ],
          result: '\\text{énantiomères}',
        },
        {
          label: 'Quel groupe lié au $C^*$ est prioritaire (règles de Cahn-Ingold-Prelog) ? Écris sa formule.',
          answer: {
            kind: 'text',
            display: '–OH',
            accepted: [
              'OH',
              '-OH',
              '–OH',
              'le groupe OH',
              'hydroxyle',
              'le groupe hydroxyle',
            ],
          },
          steps: [
            'On compare les numéros atomiques des atomes directement liés au $C^*$ : O (8) > C (6) = C (6) > H (1).',
            "Ordre complet : $-OH > -C_2H_5 > -CH_3 > -H$ (l'éthyle l'emporte sur le méthyle à la sphère suivante : C,H,H > H,H,H).",
          ],
          result: '-OH > -C_2H_5 > -CH_3 > -H',
        },
      ],
    },
    {
      id: 'stereo-isomeres-c4h10o',
      level: 2,
      title: 'Les isomères de C₄H₁₀O',
      statement: 'Un composé A de formule brute $C_4H_{10}O$ peut être un alcool ou un éther-oxyde. On prend C = 12, H = 1, O = 16 g/mol.',
      given: [
        {
          label: 'formule',
          value: 'C₄H₁₀O',
        },
      ],
      parts: [
        {
          label: 'Calcule la masse molaire de A (en g/mol).',
          answer: {
            kind: 'number',
            value: 74,
            tolerance: 0.1,
            unit: 'g/mol',
          },
          steps: [
            '$M = 4\\times12 + 10\\times1 + 16 = 74$ g/mol',
          ],
          result: 'M = 74\\ \\text{g/mol}',
        },
        {
          label: "Combien d'alcools isomères correspondent à cette formule ?",
          answer: {
            kind: 'number',
            value: 4,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Chaîne linéaire : butan-1-ol et butan-2-ol (isomères de position).',
            'Chaîne ramifiée : 2-méthylpropan-1-ol et 2-méthylpropan-2-ol (isomères de chaîne).',
          ],
          result: '4\\ \\text{alcools}',
        },
        {
          label: "Combien d'éthers-oxydes isomères ?",
          answer: {
            kind: 'number',
            value: 3,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Éthoxyéthane $C_2H_5-O-C_2H_5$, 1-méthoxypropane $CH_3-O-CH_2-CH_2-CH_3$ et 2-méthoxypropane $CH_3-O-CH(CH_3)_2$ : isomères de fonction des alcools.',
          ],
          result: '3\\ \\text{éthers-oxydes}',
        },
        {
          label: 'Parmi ces alcools, lequel est chiral ? (donne son nom)',
          answer: {
            kind: 'text',
            display: 'butan-2-ol',
            accepted: [
              'butan-2-ol',
              'le butan-2-ol',
              'butan2ol',
              '2-butanol',
              'butanol-2',
            ],
          },
          steps: [
            'Seul le butan-2-ol possède un carbone lié à quatre groupes différents ($-H$, $-OH$, $-CH_3$, $-C_2H_5$).',
          ],
          result: '\\text{butan-2-ol}',
        },
      ],
    },
    {
      id: 'stereo-configurations',
      level: 3,
      title: 'Configurations et conformations',
      statement: "Dans les protéines, l'alanine $CH_3-CH(NH_2)-COOH$ est de la série L. En projection de Fischer, $-COOH$ est en haut, $-CH_3$ en bas, $-NH_2$ à gauche et $-H$ à droite.",
      given: [
        {
          label: 'énergie du butane',
          value: 'anti : 0 ; éclipsée syn : 19 kJ/mol',
        },
      ],
      parts: [
        {
          label: 'Quelle est la configuration absolue (R ou S) de la L-alanine ?',
          answer: {
            kind: 'text',
            display: 'S',
            accepted: [
              'S',
              '(S)',
              's',
              'configuration S',
            ],
          },
          steps: [
            'Priorités : $-NH_2$ (N) > $-COOH$ (C lié à O,O,O) > $-CH_3$ (C lié à H,H,H) > $-H$.',
            "En Fischer, H est sur une liaison horizontale (vers l'avant). Le sens 1 → 2 → 3 (gauche → haut → bas) est horaire, mais comme H pointe vers nous, on inverse : configuration **S**.",
          ],
          result: '\\text{L-alanine} = (S)\\text{-alanine}',
        },
        {
          label: 'Une molécule possède 3 carbones asymétriques. Combien de stéréoisomères peut-elle avoir au maximum ?',
          answer: {
            kind: 'number',
            value: 8,
            tolerance: 0.1,
            unit: '',
          },
          steps: [
            'Chaque $C^*$ peut être R ou S : au maximum $2^n$ stéréoisomères.',
            '$2^3 = 8$',
          ],
          result: '2^3 = 8',
        },
        {
          label: 'Quelle énergie faut-il fournir (en kJ/mol) pour passer de la conformation anti du butane à la conformation éclipsée syn ?',
          answer: {
            kind: 'number',
            value: 19,
            tolerance: 0.5,
            unit: 'kJ/mol',
          },
          steps: [
            "$\\Delta E = E_{syn} - E_{anti} = 19 - 0 = 19$ kJ/mol : c'est faible devant l'agitation thermique à température ambiante, la rotation reste possible.",
          ],
          result: '\\Delta E = 19\\ \\text{kJ/mol}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Le drame de la thalidomide',
      tagline: 'Deux énantiomères, deux effets opposés',
      situation: 'Dans les années 1950, la thalidomide était prescrite aux femmes enceintes contre les nausées. La molécule possède un carbone asymétrique et était vendue sous forme racémique.',
      model: 'Deux énantiomères ont les mêmes propriétés physiques et chimiques usuelles, mais les récepteurs du corps (eux-mêmes chiraux) les distinguent, comme une main droite ne rentre pas dans un gant gauche.',
      questions: [
        'Combien de stéréoisomères de configuration une molécule à un seul carbone asymétrique possède-t-elle ?',
      ],
      check: {
        value: 2,
        tolerance: 0.01,
        unit: '',
      },
      solution: [
        'Avec $n$ carbones asymétriques : au plus $2^n$ stéréoisomères.',
        '$n = 1$ : deux énantiomères (R et S). Le mélange 50/50 est un racémique.',
      ],
      fact: "L'un des énantiomères calmait les nausées, l'autre provoquait de graves malformations chez le fœtus. Depuis, chaque énantiomère d'un médicament est testé séparément.",
    },
    {
      title: 'Menthe ou carvi : une question de miroir',
      tagline: 'Même formule, odeurs différentes',
      situation: "La carvone ($C_{10}H_{14}O$) existe sous deux formes énantiomères : l'une sent la menthe verte, l'autre les graines de carvi (cumin des prés).",
      model: "Les récepteurs de l'odorat sont des protéines chirales : chacun des deux énantiomères s'y fixe différemment, d'où deux odeurs distinctes.",
      questions: [
        'Calcule la masse molaire de la carvone C₁₀H₁₄O (en g/mol).',
      ],
      check: {
        value: 150,
        tolerance: 0.01,
        unit: 'g/mol',
      },
      solution: [
        '$M = 10\\times12 + 14\\times1 + 16 = 150$ g/mol, la même pour les deux énantiomères.',
      ],
      fact: "Notre nez distingue donc des molécules images l'une de l'autre dans un miroir, ce que ni la balance ni le thermomètre ne savent faire.",
    },
  ],
};
