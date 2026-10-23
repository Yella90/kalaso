import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Les motifs d’un bogolan se répètent par glissements, rotations et retournements, sans jamais changer de taille. Sur une carte, la ville est réduite et tournée, mais garde sa forme. Les premières transformations conservent les distances : ce sont les **isométries**. Les secondes conservent les formes et les angles : ce sont les **similitudes**. Les nombres complexes les décrivent en une ligne.',
  objectives: [
    'reconnaître et classer les isométries du plan (déplacements et antidéplacements) ;',
    'écrire l’expression complexe d’une translation, d’une rotation, d’une homothétie ;',
    'reconnaître une similitude directe $z\' = az + b$ et trouver ses éléments (rapport, angle, centre) ;',
    'composer des similitudes.',
  ],
  sections: [
    {
      title: 'Les isométries du plan',
      blocks: [
        {
          kind: 'definition',
          term: 'Isométrie',
          text: 'transformation du plan qui conserve les distances : $M\'N\' = MN$ pour tous points $M$, $N$. Elle conserve aussi les angles géométriques, les aires et le parallélisme.',
        },
        {
          kind: 'table',
          head: ['Type', 'Conserve les angles orientés ?', 'Exemples'],
          rows: [
            ['**déplacement**', 'oui', 'translations, rotations'],
            ['**antidéplacement**', 'non (il les change en leurs opposés)', 'symétries axiales (réflexions), symétries glissées'],
          ],
        },
        {
          kind: 'rule',
          text: 'Toute isométrie est la composée d’au plus trois réflexions. La composée de deux réflexions d’axes parallèles est une translation ; d’axes sécants en $O$ formant un angle $\\theta$, c’est une rotation de centre $O$ et d’angle $2\\theta$.',
        },
      ],
    },
    {
      title: 'Écriture complexe',
      blocks: [
        {
          kind: 'table',
          head: ['Transformation', 'Écriture complexe'],
          rows: [
            ['translation de vecteur d’affixe $b$', '$z\' = z + b$'],
            ['rotation de centre $\\omega$, d’angle $\\theta$', '$z\' - \\omega = e^{i\\theta}(z - \\omega)$'],
            ['homothétie de centre $\\omega$, de rapport $k$ réel', '$z\' - \\omega = k(z - \\omega)$'],
            ['réflexion d’axe $(Ox)$', '$z\' = \\bar{z}$'],
          ],
        },
        {
          kind: 'example',
          title: 'rotation d’un quart de tour',
          text: 'La rotation de centre $O$ et d’angle $\\dfrac{\\pi}{2}$ s’écrit $z\' = iz$.',
          steps: ['Image de $z = 3 + i$ : $z\' = i(3 + i) = -1 + 3i$.'],
        },
      ],
    },
    {
      title: 'Similitudes directes',
      blocks: [
        {
          kind: 'definition',
          term: 'Similitude directe',
          text: 'transformation d’écriture complexe $z\' = az + b$ avec $a \\neq 0$. Elle multiplie les distances par $|a|$ et conserve les angles orientés.',
        },
        {
          kind: 'list',
          items: [
            '**rapport** $k = |a|$ ; **angle** $\\theta = \\arg a$ ;',
            'si $a = 1$ : translation ;',
            'si $a \\neq 1$ : un seul point invariant, le **centre** $\\omega = \\dfrac{b}{1 - a}$, et $z\' - \\omega = a(z - \\omega)$ ;',
            'c’est alors la composée de la rotation $(\\omega, \\theta)$ et de l’homothétie $(\\omega, k)$.',
          ],
        },
        {
          kind: 'example',
          title: '$z\' = (1 + i)z + 2$',
          text: '$a = 1 + i = \\sqrt{2}\\,e^{i\\pi/4}$.',
          steps: ['Rapport $\\sqrt{2}$, angle $\\dfrac{\\pi}{4}$.', 'Centre : $\\omega = \\dfrac{2}{1 - (1 + i)} = \\dfrac{2}{-i} = 2i$.'],
        },
        {
          kind: 'text',
          text: 'Une **similitude indirecte** s’écrit $z\' = a\\bar{z} + b$ : elle change les angles orientés en leurs opposés, comme une réflexion.',
        },
        {
          kind: 'trap',
          wrong: '« Le centre de $z\' = az + b$ est le point d’affixe $b$. »',
          why: '$b$ est l’image de l’origine, pas le point invariant.',
          reflex: 'Résoudre $\\omega = a\\omega + b$, soit $\\omega = \\frac{b}{1 - a}$.',
        },
      ],
    },
  ],
  essentials: [
    'Isométrie : conserve les distances ; déplacements (translations, rotations) et antidéplacements (réflexions, symétries glissées).',
    'Rotation $(\\omega, \\theta)$ : $z\' - \\omega = e^{i\\theta}(z - \\omega)$.',
    'Similitude directe $z\' = az + b$ : rapport $|a|$, angle $\\arg a$, centre $\\frac{b}{1 - a}$ si $a \\neq 1$.',
    'Composer : multiplier les rapports, ajouter les angles.',
  ],
  exercises: [
    {
      id: 'sim-elements',
      level: 1,
      title: 'Éléments d’une similitude',
      statement: 'On considère la similitude directe $s$ : $z\' = (1 + i)z + 2$.',
      parts: [
        {
          label: 'Rapport de $s$ (valeur approchée).',
          answer: { kind: 'number', value: 1.4142, tolerance: 0.002, unit: '' },
          steps: ['$|1 + i| = \\sqrt{2} \\approx 1{,}414$.'],
        },
        {
          label: 'Angle de $s$, en degrés.',
          answer: { kind: 'number', value: 45, tolerance: 0.5, unit: '°' },
          steps: ['$\\arg(1 + i) = \\dfrac{\\pi}{4}$, soit 45°.'],
        },
        {
          label: 'Partie imaginaire du centre $\\omega$.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$\\omega = \\dfrac{2}{-i} = 2i$.'],
        },
      ],
    },
    {
      id: 'sim-rotation',
      level: 2,
      title: 'Une rotation de centre quelconque',
      statement: '$r$ est la rotation de centre $\\Omega(1\\,;1)$ et d’angle $\\dfrac{\\pi}{2}$. On cherche l’image de $A(3\\,;1)$.',
      parts: [
        {
          label: 'Partie réelle de l’affixe de $A\'$.',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$z\' - (1 + i) = i\\,[(3 + i) - (1 + i)] = 2i$.', '$z\' = 1 + 3i$.'],
        },
        {
          label: 'Partie imaginaire de l’affixe de $A\'$.',
          answer: { kind: 'number', value: 3, tolerance: 0.001, unit: '' },
          steps: ['$A\'(1\\,;3)$ : on vérifie que $\\Omega A\' = \\Omega A = 2$.'],
        },
      ],
    },
    {
      id: 'sim-composee',
      level: 3,
      title: 'Composer deux similitudes',
      statement: '$s_1$ : $z\' = 2iz$ et $s_2$ : $z\' = (1 - i)z + 1$.',
      parts: [
        {
          label: 'La composée $s_2 \\circ s_1$ s’écrit $z\' = az + b$ : donne la partie réelle de $a$.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$s_2(s_1(z)) = (1 - i)(2iz) + 1 = (2i + 2)z + 1$ : $a = 2 + 2i$.'],
        },
        {
          label: 'Rapport de $s_2 \\circ s_1$ (valeur approchée).',
          answer: { kind: 'number', value: 2.8284, tolerance: 0.003, unit: '' },
          steps: ['$|a| = \\sqrt{8} = 2\\sqrt{2} \\approx 2{,}83$, c’est aussi $2 \\times \\sqrt{2}$, le produit des rapports.'],
        },
        {
          label: 'Angle de $s_2 \\circ s_1$, en degrés.',
          answer: { kind: 'number', value: 45, tolerance: 0.5, unit: '°' },
          steps: ['$\\arg(2 + 2i) = 45°$, c’est-à-dire $90° + (-45°)$ : les angles s’ajoutent.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une rotation est :',
      choices: ['un déplacement', 'un antidéplacement', 'une homothétie', 'une projection'],
      answer: 0,
      explanation: 'Elle conserve les distances et les angles orientés.',
    },
    {
      question: '$z\' = \\bar{z}$ est l’écriture de :',
      choices: ['la réflexion d’axe $(Ox)$', 'la rotation d’angle $\\pi$', 'la symétrie de centre $O$', 'l’identité'],
      answer: 0,
      explanation: '$x + iy \\mapsto x - iy$ : on change le signe de l’ordonnée.',
    },
    {
      question: 'La similitude $z\' = 3iz$ a pour rapport et angle :',
      choices: ['3 et $\\dfrac{\\pi}{2}$', '3 et 0', '$3i$ et $\\dfrac{\\pi}{2}$', '1 et $\\dfrac{\\pi}{2}$'],
      answer: 0,
      explanation: '$|3i| = 3$ et $\\arg(3i) = \\dfrac{\\pi}{2}$.',
    },
    {
      question: 'La composée de deux réflexions d’axes parallèles est :',
      choices: ['une translation', 'une rotation', 'une réflexion', 'une homothétie'],
      answer: 0,
      explanation: 'Son vecteur est le double du vecteur qui joint les deux axes perpendiculairement.',
    },
  ],
  applications: [
    {
      title: 'Agrandir un motif de bogolan',
      tagline: 'Tourner et agrandir d’un seul calcul',
      situation:
        'Une artiste dessine un motif sur ordinateur. Pour la bordure, le logiciel applique au motif la transformation $z\' = 2iz$ (centre : l’origine). Un point du motif a pour affixe $2 + i$ (unités : cm).',
      model: 'Le logiciel applique une similitude directe de rapport 2 et d’angle 90°.',
      questions: ['Quelle est l’affixe de l’image de ce point ?', 'À quelle distance de l’origine se trouve l’image, en cm ?'],
      check: { value: 4.472, tolerance: 0.01, unit: 'cm' },
      solution: ['$z\' = 2i(2 + i) = -2 + 4i$.', '$|z\'| = \\sqrt{4 + 16} = \\sqrt{20} \\approx 4{,}47$ cm, soit le double de $|2 + i| = \\sqrt{5}$.'],
      fact: 'Les logiciels de dessin et de jeux vidéo calculent ainsi des milliers de rotations et d’agrandissements par seconde.',
    },
  ],
};
