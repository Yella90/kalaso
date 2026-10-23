import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Aucun nombre réel n’a un carré égal à −1. Au XVIᵉ siècle, des mathématiciens ont osé en inventer un, noté $i$, pour résoudre des équations. Ces nombres « imaginaires » se sont révélés très concrets : les électriciens s’en servent pour calculer les courants alternatifs, et ils décrivent parfaitement les rotations du plan.',
  objectives: [
    'calculer avec la forme algébrique $a + ib$ : somme, produit, quotient, conjugué, module ;',
    'passer de la forme algébrique à la forme trigonométrique ou exponentielle ;',
    'utiliser les formules de Moivre et d’Euler ;',
    'résoudre dans $\\mathbb{C}$ une équation du second degré à coefficients réels ;',
    'interpréter module et argument en géométrie.',
  ],
  sections: [
    {
      title: 'La forme algébrique',
      blocks: [
        {
          kind: 'definition',
          term: 'Nombre complexe',
          text: 'nombre $z = a + ib$ avec $a$, $b$ réels et $i^2 = -1$. $a = \\text{Re}(z)$ est la partie réelle, $b = \\text{Im}(z)$ la partie imaginaire. L’ensemble des nombres complexes est noté $\\mathbb{C}$.',
        },
        {
          kind: 'formula',
          tex: '\\bar{z} = a - ib \\qquad |z| = \\sqrt{a^2 + b^2} \\qquad z\\,\\bar{z} = |z|^2',
          legend: ['$\\bar{z}$ : conjugué de $z$ ; $|z|$ : module de $z$'],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Calculer un quotient',
          blocks: [
            {
              kind: 'text',
              text: 'On multiplie le numérateur et le dénominateur par le conjugué du dénominateur : $\\dfrac{3 + 4i}{1 - 2i} = \\dfrac{(3 + 4i)(1 + 2i)}{(1 - 2i)(1 + 2i)} = \\dfrac{-5 + 10i}{5} = -1 + 2i$.',
            },
          ],
        },
        {
          kind: 'text',
          text: 'Dans un repère orthonormé, le point $M(a\\,;b)$ a pour **affixe** $z = a + ib$. Le module $|z|$ est la distance $OM$, et $|z_B - z_A| = AB$.',
        },
      ],
    },
    {
      title: 'Forme trigonométrique et forme exponentielle',
      blocks: [
        {
          kind: 'formula',
          tex: 'z = r(\\cos\\theta + i\\sin\\theta) = r\\,e^{i\\theta} \\qquad r = |z|,\\ \\cos\\theta = \\dfrac{a}{r},\\ \\sin\\theta = \\dfrac{b}{r}',
          legend: ['$\\theta = \\arg(z)$ : un argument de $z$, défini à $2k\\pi$ près ; c’est l’angle $(\\vec{u}, \\vec{OM})$'],
        },
        {
          kind: 'example',
          title: 'écrire $z = 1 + i\\sqrt{3}$ sous forme exponentielle',
          text: '$r = \\sqrt{1 + 3} = 2$.',
          steps: ['$\\cos\\theta = \\dfrac{1}{2}$ et $\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$, donc $\\theta = \\dfrac{\\pi}{3}$.', '$z = 2\\,e^{i\\pi/3}$.'],
        },
        {
          kind: 'rule',
          text: 'Pour un produit, les modules se **multiplient** et les arguments s’**ajoutent** : $r e^{i\\theta} \\times r\'e^{i\\theta\'} = rr\'e^{i(\\theta + \\theta\')}$. Pour un quotient, on divise les modules et on soustrait les arguments.',
        },
        {
          kind: 'formula',
          label: 'Moivre et Euler',
          tex: '(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta \\qquad \\cos\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2},\\ \\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}',
        },
        {
          kind: 'text',
          text: 'Moivre sert à exprimer $\\cos 2\\theta$, $\\cos 3\\theta$… en fonction de $\\cos\\theta$ ; Euler sert à **linéariser** $\\cos^2\\theta$, $\\sin^3\\theta$…, par exemple pour calculer une primitive.',
        },
      ],
    },
    {
      title: 'Équations du second degré dans ℂ',
      blocks: [
        {
          kind: 'rule',
          text: 'Pour $az^2 + bz + c = 0$ ($a$, $b$, $c$ réels, $a \\neq 0$) avec $\\Delta = b^2 - 4ac < 0$ : deux solutions complexes conjuguées $z = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.',
        },
        {
          kind: 'example',
          title: '$z^2 - 4z + 13 = 0$',
          text: '$\\Delta = 16 - 52 = -36 = (6i)^2$.',
          steps: ['$z_1 = \\dfrac{4 + 6i}{2} = 2 + 3i$ et $z_2 = 2 - 3i$.'],
        },
        {
          kind: 'trap',
          wrong: '« $\\sqrt{-36} = -6$ » ou « l’équation n’a pas de solution ».',
          why: 'Dans $\\mathbb{R}$, il n’y a pas de solution ; dans $\\mathbb{C}$, $-36 = (6i)^2$.',
          reflex: 'Si $\\Delta < 0$, écrire $\\Delta = (i\\sqrt{-\\Delta})^2$ et garder les deux solutions conjuguées.',
        },
      ],
    },
  ],
  essentials: [
    '$z = a + ib$ ; $\\bar{z} = a - ib$ ; $|z| = \\sqrt{a^2 + b^2}$ ; pour un quotient, multiplier par le conjugué du dénominateur.',
    '$z = re^{i\\theta}$ : modules multipliés et arguments ajoutés pour un produit.',
    'Moivre : $(e^{i\\theta})^n = e^{in\\theta}$ ; Euler : $\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2}$.',
    '$\\Delta < 0$ : $z = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}$.',
    '$|z_B - z_A| = AB$ ; $\\arg\\dfrac{z_C - z_A}{z_B - z_A} = (\\vec{AB}, \\vec{AC})$.',
  ],
  exercises: [
    {
      id: 'cplx-calculs',
      level: 1,
      title: 'Calculs algébriques',
      statement: 'On pose $z_1 = 3 + 4i$ et $z_2 = 1 - 2i$.',
      parts: [
        {
          label: 'Calcule $|z_1|$.',
          answer: { kind: 'number', value: 5, tolerance: 0.01, unit: '' },
          steps: ['$|z_1| = \\sqrt{9 + 16} = 5$.'],
          result: '|z_1| = 5',
        },
        {
          label: 'Calcule la partie réelle de $z_1 z_2$.',
          answer: { kind: 'number', value: 11, tolerance: 0.01, unit: '' },
          steps: ['$z_1 z_2 = 3 - 6i + 4i - 8i^2 = 3 - 2i + 8 = 11 - 2i$.'],
          result: 'z_1 z_2 = 11 - 2i',
        },
        {
          label: 'Calcule la partie imaginaire de $\\dfrac{z_1}{z_2}$.',
          answer: { kind: 'number', value: 2, tolerance: 0.01, unit: '' },
          steps: ['$\\dfrac{z_1}{z_2} = \\dfrac{(3 + 4i)(1 + 2i)}{5} = \\dfrac{-5 + 10i}{5} = -1 + 2i$.'],
          result: '\\dfrac{z_1}{z_2} = -1 + 2i',
        },
      ],
    },
    {
      id: 'cplx-moivre',
      level: 2,
      title: 'Une puissance avec Moivre',
      statement: 'On pose $z = 1 + i\\sqrt{3}$.',
      parts: [
        {
          label: 'Calcule le module de $z$.',
          answer: { kind: 'number', value: 2, tolerance: 0.01, unit: '' },
          steps: ['$|z| = \\sqrt{1 + 3} = 2$.'],
        },
        {
          label: 'Donne un argument de $z$, en degrés.',
          answer: { kind: 'number', value: 60, tolerance: 0.5, unit: '°' },
          steps: ['$\\cos\\theta = \\dfrac{1}{2}$, $\\sin\\theta = \\dfrac{\\sqrt{3}}{2}$ : $\\theta = \\dfrac{\\pi}{3}$, soit 60°.'],
          result: 'z = 2\\,e^{i\\pi/3}',
        },
        {
          label: 'Calcule $z^6$.',
          answer: { kind: 'number', value: 64, tolerance: 0.01, unit: '' },
          steps: ['$z^6 = 2^6\\,e^{i \\cdot 6\\pi/3} = 64\\,e^{2i\\pi} = 64$ : un nombre réel !'],
          result: 'z^6 = 64',
        },
      ],
    },
    {
      id: 'cplx-equation',
      level: 3,
      title: 'Équation et géométrie',
      statement: 'On résout $z^2 - 4z + 13 = 0$ dans $\\mathbb{C}$ ; on note $A$ et $B$ les points images des solutions.',
      parts: [
        {
          label: 'Calcule le discriminant.',
          answer: { kind: 'number', value: -36, tolerance: 0.01, unit: '' },
          steps: ['$\\Delta = (-4)^2 - 4 \\times 13 = -36$.'],
        },
        {
          label: 'Écris les deux solutions (par exemple : 1+2i et 1-2i).',
          answer: { kind: 'text', display: '2 + 3i et 2 − 3i', accepted: ['2+3i et 2-3i', '2-3i et 2+3i', '2+3i;2-3i', '2-3i;2+3i', '2+3i, 2-3i', '2±3i', '2+-3i'] },
          steps: ['$z = \\dfrac{4 \\pm 6i}{2} = 2 \\pm 3i$.'],
        },
        {
          label: 'Calcule la distance $AB$.',
          answer: { kind: 'number', value: 6, tolerance: 0.01, unit: '' },
          steps: ['$AB = |z_B - z_A| = |(2 - 3i) - (2 + 3i)| = |-6i| = 6$.'],
          result: 'AB = 6',
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$i^2$ vaut :',
      choices: ['$-1$', '$1$', '$i$', '$-i$'],
      answer: 0,
      explanation: 'C’est la définition du nombre $i$.',
    },
    {
      question: 'Le conjugué de $5 - 2i$ est :',
      choices: ['$5 + 2i$', '$-5 + 2i$', '$-5 - 2i$', '$2 - 5i$'],
      answer: 0,
      explanation: 'On change le signe de la partie imaginaire.',
    },
    {
      question: 'Le module de $-3i$ vaut :',
      choices: ['3', '−3', '9', '$\\sqrt{3}$'],
      answer: 0,
      explanation: '$|-3i| = \\sqrt{0^2 + (-3)^2} = 3$ ; un module est toujours positif.',
    },
    {
      question: '$e^{i\\pi}$ vaut :',
      choices: ['$-1$', '$1$', '$i$', '0'],
      answer: 0,
      explanation: '$\\cos\\pi + i\\sin\\pi = -1$.',
    },
    {
      question: 'Si $|z| = 2$ et $\\arg z = \\dfrac{\\pi}{4}$, alors $z^2$ a pour module et argument :',
      choices: ['4 et $\\dfrac{\\pi}{2}$', '4 et $\\dfrac{\\pi}{8}$', '2 et $\\dfrac{\\pi}{2}$', '4 et $\\dfrac{\\pi}{16}$'],
      answer: 0,
      explanation: 'Modules multipliés : $2 \\times 2 = 4$ ; arguments ajoutés : $\\dfrac{\\pi}{4} + \\dfrac{\\pi}{4}$.',
    },
  ],
  applications: [
    {
      title: 'Le ventilateur sur le secteur',
      tagline: 'Les électriciens calculent avec des nombres complexes',
      situation:
        'Un ventilateur branché sur le secteur (220 V, 50 Hz) se comporte comme une résistance $R = 30$ Ω en série avec une bobine. Les électriciens représentent ce dipôle par son impédance complexe $Z = R + iX$, avec ici $X = 40$ Ω. L’intensité efficace vaut $I = \\dfrac{U}{|Z|}$.',
      model: 'Régime sinusoïdal ; on ne considère que les valeurs efficaces.',
      questions: ['Calcule l’intensité efficace du courant dans le ventilateur.'],
      check: { value: 4.4, tolerance: 0.02, unit: 'A' },
      solution: ['$|Z| = \\sqrt{30^2 + 40^2} = 50$ Ω.', '$I = \\dfrac{220}{50} = 4{,}4$ A.', 'L’argument de $Z$ ($\\approx 53°$) est le déphasage entre la tension et le courant.'],
      fact: 'Les électriciens notent souvent $j$ au lieu de $i$, pour ne pas confondre avec l’intensité $i$ du courant.',
    },
  ],
};
