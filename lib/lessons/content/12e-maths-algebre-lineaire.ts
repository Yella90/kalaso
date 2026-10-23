import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Au marché, 2 kg de riz et 1 kg de sucre coûtent 1 300 F ; 1 kg de riz et 3 kg de sucre coûtent 1 900 F. Quel est le prix de chaque produit ? Avec deux inconnues, on s’en sort ; avec cinquante, comme dans les calculs d’un ingénieur ou d’un économiste, il faut une méthode : les **matrices** et l’**algèbre linéaire**.',
  objectives: [
    'résoudre un système linéaire par la méthode du pivot de Gauss ;',
    'calculer avec des matrices (somme, produit) ;',
    'calculer un déterminant 2×2 et 3×3 ;',
    'inverser une matrice 2×2 et résoudre $AX = B$.',
  ],
  sections: [
    {
      title: 'Systèmes linéaires et pivot de Gauss',
      blocks: [
        {
          kind: 'text',
          text: 'Un système linéaire se résout en éliminant les inconnues une à une : on remplace une équation par une combinaison d’elle-même et d’une autre, sans changer les solutions, jusqu’à obtenir un système **triangulaire**.',
        },
        {
          kind: 'example',
          title: 'un système 3×3',
          text: '$x + y + z = 6$ (1) ; $x - y + z = 2$ (2) ; $2x + y - z = 1$ (3).',
          steps: [
            '(1) − (2) : $2y = 4$, donc $y = 2$.',
            'Il reste $x + z = 4$ et $2x - z = -1$ ; en additionnant : $3x = 3$, donc $x = 1$, puis $z = 3$.',
            'Solution : $(1\\,;2\\,;3)$. On vérifie dans les trois équations.',
          ],
        },
      ],
    },
    {
      title: 'Matrices',
      blocks: [
        {
          kind: 'definition',
          term: 'Matrice',
          text: 'tableau de nombres à $n$ lignes et $p$ colonnes. Un système s’écrit $AX = B$ : $A$ contient les coefficients, $X$ les inconnues, $B$ les seconds membres.',
        },
        {
          kind: 'formula',
          label: 'Produit de deux matrices 2×2',
          tex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae + bg & af + bh \\\\ ce + dg & cf + dh \\end{pmatrix}',
          legend: ['chaque coefficient : ligne de la première × colonne de la seconde'],
        },
        {
          kind: 'trap',
          wrong: '« $AB = BA$ comme pour les nombres. »',
          why: 'Le produit de matrices n’est en général pas commutatif.',
          reflex: 'Garder l’ordre des facteurs dans tous les calculs.',
        },
      ],
    },
    {
      title: 'Déterminant et inverse',
      blocks: [
        {
          kind: 'formula',
          label: 'Déterminant 2×2 et inverse',
          tex: '\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc \\qquad A^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
        },
        {
          kind: 'rule',
          text: '$A$ est inversible si et seulement si $\\det A \\neq 0$. Le système $AX = B$ a alors une solution unique : $X = A^{-1}B$.',
        },
        {
          kind: 'formula',
          label: 'Déterminant 3×3 (règle de Sarrus)',
          tex: '\\det\\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix} = aei + bfg + cdh - ceg - afh - bdi',
        },
        {
          kind: 'example',
          title: 'résoudre avec l’inverse',
          text: '$2x + y = 4$ et $5x + 3y = 11$ : $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$.',
          steps: ['$\\det A = 6 - 5 = 1$ ; $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$.', '$X = A^{-1}\\begin{pmatrix} 4 \\\\ 11 \\end{pmatrix} = \\begin{pmatrix} 12 - 11 \\\\ -20 + 22 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}$.'],
        },
      ],
    },
  ],
  essentials: [
    'Pivot de Gauss : éliminer les inconnues pour obtenir un système triangulaire.',
    'Produit : ligne × colonne ; en général $AB \\neq BA$.',
    '$\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$ ; inversible si $\\det \\neq 0$.',
    '$AX = B \\Rightarrow X = A^{-1}B$.',
  ],
  exercises: [
    {
      id: 'alg-det',
      level: 1,
      title: 'Déterminant et inverse',
      statement: 'Soit $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$.',
      parts: [
        {
          label: 'Calcule $\\det A$.',
          answer: { kind: 'number', value: 1, tolerance: 0, unit: '' },
          steps: ['$2 \\times 3 - 1 \\times 5 = 1$.'],
        },
        {
          label: 'Le coefficient en bas à gauche de $A^{-1}$ vaut :',
          answer: { kind: 'number', value: -5, tolerance: 0, unit: '' },
          steps: ['$A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$.'],
        },
      ],
    },
    {
      id: 'alg-gauss',
      level: 2,
      title: 'Pivot de Gauss',
      statement: 'Résous : $x + y + z = 6$ ; $x - y + z = 2$ ; $2x + y - z = 1$.',
      parts: [
        {
          label: 'Valeur de $y$.',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['(1) − (2) : $2y = 4$.'],
        },
        {
          label: 'Valeur de $x$.',
          answer: { kind: 'number', value: 1, tolerance: 0, unit: '' },
          steps: ['$x + z = 4$ et $2x - z = -1$, d’où $3x = 3$.'],
        },
        {
          label: 'Valeur de $z$.',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['$z = 4 - x = 3$.'],
        },
      ],
    },
    {
      id: 'alg-sarrus',
      level: 3,
      title: 'Un déterminant 3×3',
      statement: 'Soit $M = \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & -1 & 1 \\\\ 2 & 1 & -1 \\end{pmatrix}$, la matrice du système précédent.',
      parts: [
        {
          label: 'Calcule $\\det M$ avec la règle de Sarrus.',
          answer: { kind: 'number', value: 6, tolerance: 0, unit: '' },
          steps: ['$aei + bfg + cdh = (1)(-1)(-1) + (1)(1)(2) + (1)(1)(1) = 1 + 2 + 1 = 4$.', '$ceg + afh + bdi = (1)(-1)(2) + (1)(1)(1) + (1)(1)(-1) = -2 + 1 - 1 = -2$.', '$\\det M = 4 - (-2) = 6$.'],
        },
        {
          label: 'Le système a-t-il une solution unique ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'oui', accepted: ['oui'] },
          steps: ['$\\det M = 6 \\neq 0$ : $M$ est inversible, la solution $(1\\,;2\\,;3)$ est unique.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$\\det\\begin{pmatrix} 4 & 2 \\\\ 6 & 3 \\end{pmatrix}$ vaut :',
      choices: ['0', '24', '12', '−24'],
      answer: 0,
      explanation: '$12 - 12 = 0$ : la matrice n’est pas inversible.',
    },
    {
      question: 'Si $\\det A = 0$, le système $AX = B$ :',
      choices: ['n’a pas de solution unique', 'a toujours une solution unique', 'a pour solution $X = 0$', 'a pour solution $X = B$'],
      answer: 0,
      explanation: 'Il a soit aucune solution, soit une infinité.',
    },
    {
      question: '$\\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$ vaut :',
      choices: ['$\\begin{pmatrix} 11 \\\\ 4 \\end{pmatrix}$', '$\\begin{pmatrix} 3 \\\\ 4 \\end{pmatrix}$', '$\\begin{pmatrix} 3 \\\\ 8 \\end{pmatrix}$', '$\\begin{pmatrix} 7 \\\\ 4 \\end{pmatrix}$'],
      answer: 0,
      explanation: '$1 \\times 3 + 2 \\times 4 = 11$ ; $0 \\times 3 + 1 \\times 4 = 4$.',
    },
    {
      question: 'Le produit de matrices est :',
      choices: ['non commutatif en général', 'toujours commutatif', 'impossible pour des matrices carrées', 'égal à la somme'],
      answer: 0,
      explanation: 'En général $AB \\neq BA$.',
    },
  ],
  applications: [
    {
      title: 'Les prix au marché',
      tagline: 'Retrouver deux prix à partir de deux achats',
      situation:
        'Awa paie 1 300 F pour 2 kg de riz et 1 kg de sucre. Son voisin paie 1 900 F pour 1 kg de riz et 3 kg de sucre, chez le même commerçant.',
      model: '$2r + s = 1\\,300$ et $r + 3s = 1\\,900$, où $r$ et $s$ sont les prix au kilogramme.',
      questions: ['Quel est le prix d’un kilogramme de riz, en F ?', 'Et d’un kilogramme de sucre ?'],
      check: { value: 400, tolerance: 0.01, unit: 'F/kg' },
      solution: ['$\\det = 2 \\times 3 - 1 \\times 1 = 5$.', '$r = \\dfrac{3 \\times 1\\,300 - 1 \\times 1\\,900}{5} = 400$ F ; $s = 1\\,300 - 2 \\times 400 = 500$ F.'],
      fact: 'Les prévisions météo, les réseaux électriques ou les classements des moteurs de recherche reposent sur la résolution de systèmes de millions d’équations.',
    },
  ],
};
