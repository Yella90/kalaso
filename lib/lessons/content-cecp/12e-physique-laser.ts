// Importé du site cecp (physique-3d, chapitre « laser ») par scripts/import-cecp.ts.
// Une nouvelle importation remplace ce fichier.
import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook: 'Light Amplification by Stimulated Émission of Radiation.',
  objectives: [],
  sections: [
    {
      title: 'Absorption et émission spontanée',
      blocks: [
        {
          kind: 'callout',
          variant: 'retenir',
          blocks: [
            {
              kind: 'list',
              items: [
                'Émission stimulée : photons identiques',
                'Inversion de population + pompage + cavité',
                '$N = P\\lambda/(hc)$ photons par seconde',
                'Monochromatique, directif, cohérent',
              ],
            },
          ],
        },
        {
          kind: 'text',
          text: "Un atome ne peut avoir que certaines énergies (niveaux $E_1 < E_2 < \\dots$). Il peut passer de $E_1$ à $E_2$ en **absorbant** un photon d'énergie $h\\nu = E_2 - E_1$. Laissé à lui-même, il redescend au bout d'un temps aléatoire en émettant un photon dans une direction quelconque : c'est l'**émission spontanée** (lampes, Soleil).",
        },
        {
          kind: 'formula',
          tex: 'h\\nu = \\frac{hc}{\\lambda} = E_2 - E_1',
          legend: [
            '$h = 6{,}63\\cdot10^{-34}$ J·s',
            '$c = 3\\cdot10^8$ m/s',
          ],
        },
      ],
    },
    {
      title: "L'émission stimulée",
      blocks: [
        {
          kind: 'text',
          text: "Un photon d'énergie $h\\nu = E_2 - E_1$ qui rencontre un atome **déjà excité** peut provoquer sa désexcitation : l'atome émet un second photon **identique** au premier (même fréquence, même direction, même phase). Un photon en donne deux, puis quatre… : la lumière est **amplifiée**.",
        },
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'text',
              text: "Pour que l'émission stimulée l'emporte sur l'absorption, il faut plus d'atomes excités que d'atomes au repos : c'est l'**inversion de population**, obtenue par **pompage** (décharge électrique, lampe flash, autre laser).",
            },
          ],
        },
      ],
    },
    {
      title: 'La cavité laser',
      blocks: [
        {
          kind: 'text',
          text: "Le milieu amplificateur est placé entre deux miroirs parallèles : un miroir totalement réfléchissant et un miroir partiellement transparent (≈ 99 %). Les photons font de nombreux allers-retours et sont amplifiés à chaque passage ; une petite partie sort par le miroir semi-transparent : c'est le **faisceau laser**.",
        },
      ],
    },
    {
      title: 'Propriétés et applications',
      blocks: [
        {
          kind: 'table',
          head: [
            'Propriété',
            'Conséquence',
            'Application',
          ],
          rows: [
            [
              'monochromatique',
              "une seule longueur d'onde",
              'spectroscopie, fibres optiques',
            ],
            [
              'directif',
              'divergence très faible',
              'télémétrie Terre-Lune, alignement',
            ],
            [
              'cohérent',
              'ondes en phase',
              'holographie, interférences',
            ],
            [
              "concentration d'énergie",
              'éclairement énorme',
              "découpe, soudure, chirurgie de l'œil",
            ],
          ],
        },
        {
          kind: 'formula',
          tex: 'P = N\\,\\frac{hc}{\\lambda} \\qquad \\mathcal{E} = \\frac{P}{S}',
          label: 'Puissance et photons',
          legend: [
            '$N$ : nombre de photons émis par seconde',
            '$\\mathcal{E}$ : éclairement (W/m²)',
          ],
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Même un pointeur de 1 mW concentre sur 1 mm² un éclairement comparable à celui du Soleil : **ne jamais diriger un laser vers les yeux**.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [],
  exercises: [
    {
      id: 'laser-hene',
      level: 1,
      title: 'Le laser hélium-néon du laboratoire',
      statement: "Un laser He-Ne émet une lumière rouge de longueur d'onde $\\lambda = 632{,}8$ nm avec une puissance $P = 1$ mW. On donne $h = 6{,}63\\cdot10^{-34}$ J·s et $c = 3\\cdot10^8$ m/s.",
      given: [
        {
          label: 'λ',
          value: '632,8 nm',
        },
        {
          label: 'P',
          value: '1 mW',
        },
        {
          label: 'h',
          value: '6,63·10⁻³⁴ J·s',
        },
        {
          label: 'c',
          value: '3·10⁸ m/s',
        },
      ],
      parts: [
        {
          label: "Calcule l'énergie d'un photon (en $10^{-19}$ J).",
          answer: {
            kind: 'number',
            value: 3.1431732,
            tolerance: 0.01,
            unit: '×10⁻¹⁹ J',
          },
          steps: [
            '$E = \\dfrac{hc}{\\lambda} = \\dfrac{6{,}63\\cdot10^{-34} \\times 3\\cdot10^8}{632{,}8\\cdot10^{-9}} \\approx 3{,}143\\cdot10^{-19}$ J',
          ],
          result: 'E = \\frac{hc}{\\lambda} \\approx 3{,}143\\cdot10^{-19}\\ \\text{J}',
        },
        {
          label: 'Combien de photons le laser émet-il par seconde (en $10^{15}$) ?',
          answer: {
            kind: 'number',
            value: 3.1814982,
            tolerance: 0.02,
            unit: '×10¹⁵ /s',
          },
          steps: [
            "La puissance est l'énergie émise par seconde : $P = N \\times E$",
            '$N = \\dfrac{P}{E} = \\dfrac{10^{-3}}{3{,}143\\cdot10^{-19}} \\approx 3{,}18\\cdot10^{15}$ photons/s',
          ],
          result: 'N = \\frac{P\\lambda}{hc} \\approx 3{,}18\\cdot10^{15}\\ \\text{s}^{-1}',
        },
      ],
    },
    {
      id: 'laser-faisceau',
      level: 2,
      title: 'Un faisceau très directif',
      statement: "Le faisceau d'un pointeur laser de puissance $P = 1$ mW a un diamètre $d_0 = 1$ mm à la sortie. Sa divergence (angle total d'ouverture) vaut $\\theta = 0{,}5$ mrad.",
      given: [
        {
          label: 'P',
          value: '1 mW',
        },
        {
          label: 'd0',
          value: '1 mm',
        },
        {
          label: 'θ',
          value: '0,5 mrad',
        },
      ],
      parts: [
        {
          label: "Calcule l'éclairement (puissance par unité de surface) à la sortie du laser, en W/m².",
          answer: {
            kind: 'number',
            value: 1273.2395,
            tolerance: 5,
            unit: 'W/m²',
          },
          steps: [
            '$S = \\pi d_0^2 / 4 = \\pi \\times (10^{-3})^2 / 4 \\approx 7{,}85\\cdot10^{-7}$ m²',
            '$\\mathcal{E} = \\dfrac{P}{S} \\approx 1273$ W/m²',
            "C'est environ le même éclairement que le Soleil en plein midi (1 000 W/m²) concentré sur 1 mm : ne jamais regarder un laser !",
          ],
          result: '\\mathcal{E} = \\frac{4P}{\\pi d_0^2} \\approx 1273\\ \\text{W/m}^2',
        },
        {
          label: 'Quel est le diamètre de la tache sur un mur situé à 50 m (en cm) ?',
          answer: {
            kind: 'number',
            value: 2.6000001,
            tolerance: 0.1,
            unit: 'cm',
          },
          steps: [
            "Le faisceau s'élargit de $L \\tan(\\theta/2)$ de chaque côté",
            '$d = d_0 + 2L\\tan(\\theta/2) \\approx 10^{-3} + 50 \\times 0{,}5\\cdot10^{-3} = 0{,}0260$ m',
          ],
          result: 'd \\approx 2{,}6\\ \\text{cm}',
        },
      ],
    },
    {
      id: 'laser-lune',
      level: 2,
      title: 'Mesurer la distance Terre-Lune au laser',
      source: 'Culture scientifique',
      statement: "Des astronomes envoient une impulsion laser vers un réflecteur déposé sur la Lune par les missions Apollo. L'écho revient au bout de $\\Delta t = 2{,}56$ s. On prend $c = 3\\cdot10^8$ m/s.",
      given: [
        {
          label: 'Δt',
          value: '2,56 s',
        },
        {
          label: 'c',
          value: '3·10⁸ m/s',
        },
      ],
      parts: [
        {
          label: 'Calcule la distance Terre-Lune (en milliers de km).',
          answer: {
            kind: 'number',
            value: 384,
            tolerance: 1,
            unit: '×10³ km',
          },
          steps: [
            "La lumière fait l'aller et le retour : $2d = c\\,\\Delta t$",
            '$d = \\dfrac{c\\,\\Delta t}{2} = \\dfrac{3\\cdot10^8 \\times 2{,}56}{2} = 384\\cdot10^{6}$ m',
          ],
          result: 'd = \\frac{c\\,\\Delta t}{2} = 384\\,000\\ \\text{km}',
        },
        {
          label: 'Quelle propriété du laser rend cette mesure possible ?',
          answer: {
            kind: 'text',
            display: 'directivité',
            accepted: [
              'directivite',
              'la directivite',
              'directif',
              'faisceau directif',
              'faible divergence',
            ],
          },
          steps: [
            "Le faisceau laser diverge très peu : il reste concentré sur des centaines de milliers de km et l'écho reste détectable.",
          ],
          result: '\\text{faisceau très directif}',
        },
      ],
    },
  ],
  quiz: [],
  applications: [
    {
      title: 'Le lecteur de codes-barres',
      tagline: 'Combien de photons balaient le code à chaque seconde ?',
      situation: "À la caisse d'un supermarché, le lecteur balaie le code-barres avec un laser rouge hélium-néon de longueur d'onde 632,8 nm et de puissance 1 mW.",
      model: "La puissance du faisceau est l'énergie transportée par seconde : $P = N \\dfrac{hc}{\\lambda}$, où $N$ est le nombre de photons émis par seconde.",
      questions: [
        'Calcule le nombre de photons émis par seconde (en 10¹⁵ photons/s).',
      ],
      check: {
        value: 3.1814982,
        tolerance: 0.02,
        unit: '×10¹⁵',
      },
      solution: [
        '$E = \\dfrac{hc}{\\lambda} \\approx 3,14\\times10^{-19}$ J',
        '$N = \\dfrac{P}{E} \\approx 3,18\\times10^{15}$ photons par seconde',
      ],
      fact: 'Les barres noires absorbent la lumière, les espaces blancs la renvoient : le capteur lit donc une suite de flashs qui code le numéro du produit.',
    },
    {
      title: 'Corriger la myopie au laser',
      tagline: 'Pourquoi un laser ultraviolet pour sculpter la cornée ?',
      situation: "Pour corriger la myopie, les ophtalmologues remodèlent la cornée avec un laser excimère ultraviolet de longueur d'onde 193 nm, qui enlève la matière couche par couche.",
      model: "Chaque photon UV transporte assez d'énergie pour casser directement les liaisons des molécules de la cornée, sans chauffer les tissus voisins.",
      questions: [
        "Calcule l'énergie d'un photon de ce laser (en eV).",
      ],
      check: {
        value: 6.4410622,
        tolerance: 0.02,
        unit: 'eV',
      },
      solution: [
        "$E = \\dfrac{hc}{\\lambda}$ puis on divise par $1{,}6\\times10^{-19}$ pour l'avoir en eV",
        "$E = \\dfrac{6{,}63\\times10^{-34}\\times 3\\times10^8}{193\\times10^{-9}} \\approx 6,44$ eV, trois fois plus qu'un photon rouge.",
      ],
      fact: "Chaque impulsion n'enlève qu'environ un quart de micromètre de tissu : l'opération demande des centaines d'impulsions guidées par ordinateur.",
    },
  ],
};
