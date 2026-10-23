import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Plus il pleut, meilleure est la récolte de mil : chaque paysan le sait. Mais de combien ? Si l’on attend 900 mm de pluie cette année, quel rendement prévoir ? En reportant les données des années passées sur un graphique, on voit un **nuage de points** ; une droite bien choisie permet de résumer le lien et de faire des prévisions.',
  objectives: [
    'représenter une série statistique double par un nuage de points et placer le point moyen ;',
    'calculer variances, covariance et coefficient de corrélation linéaire ;',
    'déterminer la droite de régression par la méthode des moindres carrés ;',
    'utiliser un ajustement pour faire une estimation, en restant prudent.',
  ],
  sections: [
    {
      title: 'Nuage de points et point moyen',
      blocks: [
        {
          kind: 'text',
          text: 'Une **série double** associe à chaque individu deux valeurs $(x_i, y_i)$ : la pluie et le rendement d’une année, la taille et la masse d’un élève… On représente chaque couple par un point : on obtient le **nuage de points**.',
        },
        {
          kind: 'formula',
          label: 'Point moyen',
          tex: 'G(\\bar{x}\\,;\\bar{y}) \\qquad \\bar{x} = \\dfrac{1}{n}\\sum x_i \\qquad \\bar{y} = \\dfrac{1}{n}\\sum y_i',
        },
        {
          kind: 'text',
          text: 'Si le nuage est allongé autour d’une droite, on cherche un **ajustement affine** $y = ax + b$.',
        },
      ],
    },
    {
      title: 'Covariance et corrélation',
      blocks: [
        {
          kind: 'formula',
          tex: 'V(x) = \\dfrac{1}{n}\\sum x_i^2 - \\bar{x}^2 \\qquad \\text{cov}(x, y) = \\dfrac{1}{n}\\sum x_iy_i - \\bar{x}\\,\\bar{y} \\qquad r = \\dfrac{\\text{cov}(x, y)}{\\sigma_x\\,\\sigma_y}',
        },
        {
          kind: 'rule',
          text: 'Le coefficient de corrélation $r$ est compris entre $-1$ et $1$. Plus $|r|$ est proche de 1, plus les points sont proches d’une droite ; on considère souvent l’ajustement affine justifié si $|r| \\geq 0{,}87$ (soit $|r| \\geq \\frac{\\sqrt{3}}{2}$). Le signe de $r$ est celui de la pente.',
        },
      ],
    },
    {
      title: 'La droite de régression',
      blocks: [
        {
          kind: 'formula',
          label: 'Droite de régression de $y$ en $x$ (moindres carrés)',
          tex: 'y = ax + b \\qquad a = \\dfrac{\\text{cov}(x, y)}{V(x)} \\qquad b = \\bar{y} - a\\bar{x}',
          legend: ['elle passe toujours par le point moyen $G$'],
        },
        {
          kind: 'example',
          title: 'une petite série',
          text: '$x$ : 1, 2, 3, 4, 5 ; $y$ : 2, 4, 5, 4, 5.',
          steps: [
            '$\\bar{x} = 3$, $\\bar{y} = 4$ ; $V(x) = 11 - 9 = 2$.',
            '$\\text{cov}(x, y) = \\dfrac{66}{5} - 12 = 1{,}2$ ; $a = \\dfrac{1{,}2}{2} = 0{,}6$ ; $b = 4 - 0{,}6 \\times 3 = 2{,}2$.',
            'Droite : $y = 0{,}6x + 2{,}2$ ; pour $x = 6$, on estime $y \\approx 5{,}8$.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Une bonne corrélation prouve que $x$ est la cause de $y$. »',
          why: 'Deux grandeurs peuvent varier ensemble parce qu’elles dépendent d’une troisième (la saison, la richesse…).',
          reflex: 'La corrélation mesure un lien statistique, pas une cause. Et l’on ne prévoit que dans le domaine des données observées.',
        },
      ],
    },
  ],
  essentials: [
    'Point moyen $G(\\bar{x}\\,;\\bar{y})$.',
    '$\\text{cov}(x, y) = \\frac{1}{n}\\sum x_iy_i - \\bar{x}\\bar{y}$ ; $r = \\frac{\\text{cov}}{\\sigma_x\\sigma_y} \\in [-1, 1]$.',
    'Droite de $y$ en $x$ : $a = \\frac{\\text{cov}(x, y)}{V(x)}$, $b = \\bar{y} - a\\bar{x}$ ; elle passe par $G$.',
    'Corrélation n’est pas causalité ; prévoir avec prudence.',
  ],
  exercises: [
    {
      id: 'stat-droite',
      level: 1,
      title: 'Droite de régression',
      statement: 'Série : $x$ = 1, 2, 3, 4, 5 et $y$ = 2, 4, 5, 4, 5.',
      parts: [
        {
          label: 'Calcule la covariance $\\text{cov}(x, y)$.',
          answer: { kind: 'number', value: 1.2, tolerance: 0.005, unit: '' },
          steps: ['$\\sum x_iy_i = 2 + 8 + 15 + 16 + 25 = 66$.', '$\\text{cov} = \\dfrac{66}{5} - 3 \\times 4 = 1{,}2$.'],
        },
        {
          label: 'Calcule le coefficient directeur $a$ de la droite de régression de $y$ en $x$.',
          answer: { kind: 'number', value: 0.6, tolerance: 0.005, unit: '' },
          steps: ['$V(x) = \\dfrac{55}{5} - 9 = 2$ ; $a = \\dfrac{1{,}2}{2} = 0{,}6$.'],
        },
        {
          label: 'Calcule l’ordonnée à l’origine $b$.',
          answer: { kind: 'number', value: 2.2, tolerance: 0.005, unit: '' },
          steps: ['$b = 4 - 0{,}6 \\times 3 = 2{,}2$.'],
          result: 'y = 0{,}6x + 2{,}2',
        },
      ],
    },
    {
      id: 'stat-correlation',
      level: 2,
      title: 'Le coefficient de corrélation',
      statement: 'Même série : $y$ = 2, 4, 5, 4, 5.',
      parts: [
        {
          label: 'Calcule $V(y)$.',
          answer: { kind: 'number', value: 1.2, tolerance: 0.005, unit: '' },
          steps: ['$\\sum y_i^2 = 4 + 16 + 25 + 16 + 25 = 86$ ; $V(y) = \\dfrac{86}{5} - 16 = 1{,}2$.'],
        },
        {
          label: 'Calcule $r$ (valeur approchée).',
          answer: { kind: 'number', value: 0.7746, tolerance: 0.003, unit: '' },
          steps: ['$r = \\dfrac{1{,}2}{\\sqrt{2} \\times \\sqrt{1{,}2}} \\approx 0{,}775$.'],
        },
        {
          label: 'L’ajustement affine est-il justifié ici ? (« oui » ou « non »)',
          answer: { kind: 'text', display: 'non', accepted: ['non', 'non justifié', 'pas justifié'] },
          steps: ['$|r| \\approx 0{,}77 < 0{,}87$ : la corrélation est trop faible pour un ajustement affine fiable.'],
        },
      ],
    },
    {
      id: 'stat-prevision',
      level: 3,
      title: 'Faire une estimation',
      statement: 'Pour une autre série, on a trouvé $\\bar{x} = 6$, $\\bar{y} = 0{,}9$, $V(x) = 2$ et $\\text{cov}(x, y) = 0{,}26$.',
      parts: [
        {
          label: 'Coefficient directeur de la droite de régression.',
          answer: { kind: 'number', value: 0.13, tolerance: 0.001, unit: '' },
          steps: ['$a = \\dfrac{0{,}26}{2} = 0{,}13$.'],
        },
        {
          label: 'Ordonnée à l’origine.',
          answer: { kind: 'number', value: 0.12, tolerance: 0.001, unit: '' },
          steps: ['$b = 0{,}9 - 0{,}13 \\times 6 = 0{,}12$.'],
        },
        {
          label: 'Estimation de $y$ pour $x = 9$.',
          answer: { kind: 'number', value: 1.29, tolerance: 0.005, unit: '' },
          steps: ['$y \\approx 0{,}13 \\times 9 + 0{,}12 = 1{,}29$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La droite de régression de $y$ en $x$ passe toujours par :',
      choices: ['le point moyen', 'l’origine', 'le premier point', 'le point le plus haut'],
      answer: 0,
      explanation: '$b = \\bar{y} - a\\bar{x}$ : $G$ est sur la droite.',
    },
    {
      question: 'Un coefficient de corrélation de −0,95 indique :',
      choices: ['une forte corrélation, avec une droite décroissante', 'aucune corrélation', 'une erreur de calcul', 'une corrélation faible'],
      answer: 0,
      explanation: '$|r|$ proche de 1 : forte corrélation ; $r < 0$ : pente négative.',
    },
    {
      question: 'Si $\\text{cov}(x, y) = 3$ et $V(x) = 6$, la pente de la droite de $y$ en $x$ vaut :',
      choices: ['0,5', '2', '18', '3'],
      answer: 0,
      explanation: '$a = \\dfrac{3}{6}$.',
    },
    {
      question: 'Un coefficient $r$ peut valoir :',
      choices: ['0,6', '1,4', '−2', '5'],
      answer: 0,
      explanation: '$r$ est toujours compris entre −1 et 1.',
    },
  ],
  applications: [
    {
      title: 'La pluie et le mil',
      tagline: 'Prévoir la récolte d’après la pluie',
      situation:
        'Un agent agricole a relevé, sur cinq années, la pluviométrie $x$ (en centaines de mm) et le rendement du mil $y$ (en tonnes par hectare) : (4 ; 0,6), (5 ; 0,8), (6 ; 0,9), (7 ; 1,1), (8 ; 1,1).',
      model: 'Ajustement affine par la méthode des moindres carrés.',
      questions: ['Donne l’équation de la droite de régression de $y$ en $x$.', 'Quel rendement peut-on prévoir pour une année à 900 mm de pluie ?'],
      check: { value: 1.29, tolerance: 0.02, unit: 't/ha' },
      solution: [
        '$\\bar{x} = 6$, $\\bar{y} = 0{,}9$ ; $\\sum x_iy_i = 28{,}3$ ; $\\text{cov} = 5{,}66 - 5{,}4 = 0{,}26$ ; $V(x) = 38 - 36 = 2$.',
        '$a = 0{,}13$, $b = 0{,}12$ : $y = 0{,}13x + 0{,}12$.',
        'Pour 900 mm ($x = 9$) : $y \\approx 1{,}29$ t/ha. Prudence : 900 mm est en dehors des années observées.',
      ],
      fact: 'Au Sahel, la répartition des pluies pendant la saison compte autant que leur total : un mois sec au moment de la floraison peut ruiner la récolte.',
    },
  ],
};
