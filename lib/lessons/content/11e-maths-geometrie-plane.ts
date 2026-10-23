import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Deux villages sont séparés par une colline : impossible de mesurer directement leur distance. Mais depuis un troisième village, on connaît les deux distances et l’angle entre les deux routes. Le **produit scalaire** et la formule d’Al-Kashi donnent la réponse, et servent aussi à trouver des angles, des orthogonalités et des équations de cercles.',
  objectives: [
    'calculer un produit scalaire de plusieurs façons ;',
    'utiliser le produit scalaire pour montrer une orthogonalité ou calculer un angle ;',
    'appliquer la formule d’Al-Kashi ;',
    'écrire et reconnaître l’équation d’un cercle et calculer une distance d’un point à une droite.',
  ],
  sections: [
    {
      title: 'Le produit scalaire',
      blocks: [
        {
          kind: 'formula',
          tex: '\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\vec{u}, \\vec{v}) = xx\' + yy\'',
          legend: ['la seconde expression vaut dans un repère orthonormé, avec $\\vec{u}(x\\,;y)$ et $\\vec{v}(x\'\\,;y\')$'],
        },
        {
          kind: 'rule',
          text: 'Deux vecteurs non nuls sont **orthogonaux** si et seulement si leur produit scalaire est **nul**.',
        },
        {
          kind: 'formula',
          label: 'Al-Kashi (dans un triangle ABC)',
          tex: 'a^2 = b^2 + c^2 - 2bc\\cos\\hat{A}',
          legend: ['$a = BC$, $b = CA$, $c = AB$ ; si $\\hat{A} = 90°$, on retrouve Pythagore'],
        },
        {
          kind: 'example',
          title: 'un côté inconnu',
          text: '$b = 5$, $c = 7$ et $\\hat{A} = 60°$.',
          steps: ['$a^2 = 25 + 49 - 2 \\times 5 \\times 7 \\times \\dfrac{1}{2} = 39$, donc $a = \\sqrt{39} \\approx 6{,}24$.'],
        },
      ],
    },
    {
      title: 'Cercles et distances',
      blocks: [
        {
          kind: 'formula',
          label: 'Cercle de centre $\\Omega(a\\,;b)$ et de rayon $R$',
          tex: '(x - a)^2 + (y - b)^2 = R^2',
        },
        {
          kind: 'example',
          title: 'reconnaître un cercle',
          text: '$x^2 + y^2 - 4x + 6y - 12 = 0$.',
          steps: ['$(x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0$, soit $(x - 2)^2 + (y + 3)^2 = 25$.', 'Cercle de centre $(2\\,;-3)$ et de rayon 5.'],
        },
        {
          kind: 'formula',
          label: 'Distance du point $M_0$ à la droite $ax + by + c = 0$',
          tex: 'd = \\dfrac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}',
        },
        {
          kind: 'rule',
          text: 'Une droite est **tangente** à un cercle si la distance du centre à la droite est égale au rayon.',
        },
        {
          kind: 'trap',
          wrong: '« $x^2 + y^2 + 2x + 10 = 0$ est un cercle. »',
          why: 'On obtient $(x + 1)^2 + y^2 = -9$ : un carré ne peut pas être négatif, c’est l’ensemble vide.',
          reflex: 'Après mise en forme, vérifier que le second membre est positif.',
        },
      ],
    },
  ],
  essentials: [
    '$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta = xx\' + yy\'$ ; orthogonaux si nul.',
    'Al-Kashi : $a^2 = b^2 + c^2 - 2bc\\cos\\hat{A}$.',
    'Cercle : $(x - a)^2 + (y - b)^2 = R^2$ ; compléter les carrés pour le reconnaître.',
    'Distance point-droite : $\\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.',
  ],
  exercises: [
    {
      id: 'gp-scalaire',
      level: 1,
      title: 'Produit scalaire',
      statement: '$\\vec{u}(3\\,;4)$, $\\vec{v}(-4\\,;3)$ et $\\vec{w}(1\\,;2)$.',
      parts: [
        {
          label: 'Calcule $\\vec{u} \\cdot \\vec{v}$.',
          answer: { kind: 'number', value: 0, tolerance: 0, unit: '' },
          steps: ['$-12 + 12 = 0$ : $\\vec{u}$ et $\\vec{v}$ sont orthogonaux.'],
        },
        {
          label: 'Calcule $\\vec{u} \\cdot \\vec{w}$.',
          answer: { kind: 'number', value: 11, tolerance: 0, unit: '' },
          steps: ['$3 + 8 = 11$.'],
        },
        {
          label: 'Angle entre $\\vec{u}$ et $\\vec{w}$, en degrés (valeur approchée).',
          answer: { kind: 'number', value: 10.3, tolerance: 0.2, unit: '°' },
          steps: ['$\\cos\\theta = \\dfrac{11}{5 \\times \\sqrt{5}} \\approx 0{,}984$, donc $\\theta \\approx 10{,}3°$.'],
        },
      ],
    },
    {
      id: 'gp-cercle',
      level: 2,
      title: 'Un cercle',
      statement: 'On considère $x^2 + y^2 - 4x + 6y - 12 = 0$.',
      parts: [
        {
          label: 'Rayon du cercle.',
          answer: { kind: 'number', value: 5, tolerance: 0, unit: '' },
          steps: ['$(x - 2)^2 + (y + 3)^2 = 25$.'],
        },
        {
          label: 'Distance du centre à la droite $3x + 4y - 19 = 0$.',
          answer: { kind: 'number', value: 5, tolerance: 0.001, unit: '' },
          steps: ['$\\dfrac{|6 - 12 - 19|}{5} = \\dfrac{25}{5} = 5$ : la droite est tangente au cercle.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$\\vec{u}(2\\,;-1)$ et $\\vec{v}(1\\,;2)$ sont :',
      choices: ['orthogonaux', 'colinéaires', 'égaux', 'opposés'],
      answer: 0,
      explanation: '$2 - 2 = 0$.',
    },
    {
      question: 'Si $\\hat{A} = 90°$, la formule d’Al-Kashi devient :',
      choices: ['le théorème de Pythagore', 'la formule des sinus', 'Thalès', '$a = b + c$'],
      answer: 0,
      explanation: '$\\cos 90° = 0$.',
    },
    {
      question: 'Le cercle $(x - 1)^2 + (y + 2)^2 = 9$ a pour centre et rayon :',
      choices: ['$(1\\,;-2)$ et 3', '$(-1\\,;2)$ et 3', '$(1\\,;-2)$ et 9', '$(1\\,;2)$ et 3'],
      answer: 0,
      explanation: 'On lit $a = 1$, $b = -2$, $R = \\sqrt{9}$.',
    },
    {
      question: '$\\vec{u} \\cdot \\vec{u}$ est égal à :',
      choices: ['$\\|\\vec{u}\\|^2$', '0', '1', '$2\\|\\vec{u}\\|$'],
      answer: 0,
      explanation: '$\\cos 0 = 1$.',
    },
  ],
  applications: [
    {
      title: 'Deux villages derrière la colline',
      tagline: 'Mesurer une distance qu’on ne peut pas parcourir',
      situation:
        'Depuis le village A, une route mène au village B (5 km) et une autre au village C (7 km). Les deux routes, rectilignes, font un angle de 60°. Une colline empêche d’aller directement de B à C.',
      model: 'Les routes sont assimilées à des segments ; on applique Al-Kashi.',
      questions: ['Quelle est la distance à vol d’oiseau entre B et C, en km ?'],
      check: { value: 6.245, tolerance: 0.01, unit: 'km' },
      solution: ['$BC^2 = 5^2 + 7^2 - 2 \\times 5 \\times 7 \\times \\cos 60° = 39$.', '$BC = \\sqrt{39} \\approx 6{,}24$ km.'],
      fact: 'Les géomètres utilisaient ainsi la triangulation pour dresser les cartes, avant l’arrivée du GPS.',
    },
  ],
};
