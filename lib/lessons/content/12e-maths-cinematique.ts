import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un ballon frappé par un footballeur, une pierre lancée par une fronde, un point de la roue d’une charrette : on connaît la position à chaque instant par deux fonctions du temps, $x(t)$ et $y(t)$. Le point décrit une **courbe paramétrée** ; en dérivant, on obtient sa vitesse et son accélération, exactement comme en physique.',
  objectives: [
    'représenter une courbe paramétrée $t \\mapsto (x(t), y(t))$ ;',
    'calculer les vecteurs vitesse et accélération et la vitesse scalaire ;',
    'trouver une équation cartésienne de la trajectoire en éliminant le paramètre ;',
    'étudier les tangentes horizontales et verticales.',
  ],
  sections: [
    {
      title: 'Courbes paramétrées',
      blocks: [
        {
          kind: 'definition',
          term: 'Courbe paramétrée',
          text: 'ensemble des points $M(t)$ de coordonnées $(x(t), y(t))$ quand $t$ parcourt un intervalle $I$. Le paramètre $t$ représente souvent le temps : on parle de **mouvement** du point $M$.',
        },
        {
          kind: 'example',
          title: 'éliminer le paramètre',
          text: '$x = 2t + 1$ et $y = t^2$.',
          steps: ['$t = \\dfrac{x - 1}{2}$, donc $y = \\dfrac{(x - 1)^2}{4}$ : la trajectoire est une parabole.'],
        },
        {
          kind: 'example',
          title: 'un cercle',
          text: '$x = 2\\cos t$ et $y = 2\\sin t$.',
          steps: ['$x^2 + y^2 = 4(\\cos^2 t + \\sin^2 t) = 4$ : cercle de centre $O$ et de rayon 2.'],
        },
      ],
    },
    {
      title: 'Vitesse et accélération',
      blocks: [
        {
          kind: 'formula',
          tex: '\\vec{v}(t) = \\begin{pmatrix} x\'(t) \\\\ y\'(t) \\end{pmatrix} \\qquad v(t) = \\sqrt{x\'(t)^2 + y\'(t)^2} \\qquad \\vec{a}(t) = \\begin{pmatrix} x\'\'(t) \\\\ y\'\'(t) \\end{pmatrix}',
        },
        {
          kind: 'rule',
          text: 'Si $\\vec{v}(t_0) \\neq \\vec{0}$, il dirige la **tangente** à la courbe en $M(t_0)$. Tangente horizontale : $y\'(t_0) = 0$ et $x\'(t_0) \\neq 0$ ; verticale : $x\'(t_0) = 0$ et $y\'(t_0) \\neq 0$.',
        },
        {
          kind: 'example',
          title: '$x = t^2$, $y = t^3$ à $t = 1$',
          text: '$\\vec{v} = (2t\\,;3t^2)$ et $\\vec{a} = (2\\,;6t)$.',
          steps: ['À $t = 1$ : $\\vec{v} = (2\\,;3)$, $v = \\sqrt{13} \\approx 3{,}61$.', '$\\vec{a} = (2\\,;6)$, de norme $\\sqrt{40} \\approx 6{,}32$.'],
        },
      ],
    },
    {
      title: 'Le mouvement d’un projectile',
      blocks: [
        {
          kind: 'formula',
          tex: 'x(t) = v_0\\cos\\alpha\\,t \\qquad y(t) = -\\dfrac{1}{2}gt^2 + v_0\\sin\\alpha\\,t',
        },
        {
          kind: 'list',
          items: [
            'sommet de la trajectoire : $y\'(t) = 0$, tangente horizontale ;',
            'portée : on cherche $t > 0$ tel que $y(t) = 0$ ;',
            'en éliminant $t$, on trouve une parabole : $y = -\\dfrac{g}{2v_0^2\\cos^2\\alpha}x^2 + x\\tan\\alpha$.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« La vitesse est nulle au sommet de la trajectoire. »',
          why: 'Seule la composante verticale $y\'$ s’annule ; $x\' = v_0\\cos\\alpha$ reste constante.',
          reflex: 'Au sommet, le vecteur vitesse est horizontal, pas nul.',
        },
      ],
    },
  ],
  essentials: [
    'Courbe paramétrée : $M(t) = (x(t), y(t))$ ; éliminer $t$ donne l’équation cartésienne.',
    '$\\vec{v} = (x\', y\')$ tangent à la courbe ; $v = \\sqrt{x\'^2 + y\'^2}$ ; $\\vec{a} = (x\'\', y\'\')$.',
    'Tangente horizontale si $y\' = 0$ ; verticale si $x\' = 0$.',
    'Projectile : trajectoire parabolique, sommet quand $y\' = 0$.',
  ],
  simulationTasks: [
    'choisis une vitesse et un angle, puis repère sur la trajectoire le point où la tangente est horizontale ;',
    'compare la portée pour les angles 30° et 60° : que remarques-tu ?',
  ],
  exercises: [
    {
      id: 'cin-vitesse',
      level: 1,
      title: 'Vitesse et accélération',
      statement: 'Un point se déplace selon $x(t) = t^2$, $y(t) = t^3$.',
      parts: [
        {
          label: 'Vitesse scalaire à $t = 1$ (valeur approchée).',
          answer: { kind: 'number', value: 3.606, tolerance: 0.005, unit: '' },
          steps: ['$\\vec{v} = (2t\\,;3t^2) = (2\\,;3)$ ; $v = \\sqrt{13} \\approx 3{,}61$.'],
        },
        {
          label: 'Norme de l’accélération à $t = 1$ (valeur approchée).',
          answer: { kind: 'number', value: 6.325, tolerance: 0.005, unit: '' },
          steps: ['$\\vec{a} = (2\\,;6t) = (2\\,;6)$ ; $a = \\sqrt{40} \\approx 6{,}32$.'],
        },
      ],
    },
    {
      id: 'cin-cartesienne',
      level: 2,
      title: 'Équation cartésienne',
      statement: 'On considère $x(t) = 2t + 1$, $y(t) = t^2$ pour $t \\in \\mathbb{R}$.',
      parts: [
        {
          label: 'Donne $y$ en fonction de $x$ (par exemple : (x-1)^2/4).',
          answer: { kind: 'text', display: 'y = (x − 1)²/4', accepted: ['(x-1)^2/4', 'y=(x-1)^2/4', '(x-1)²/4', 'y=(x-1)²/4', '1/4(x-1)^2', 'y=1/4(x-1)^2', '0.25(x-1)^2', 'y=0.25(x-1)^2'] },
          steps: ['$t = \\dfrac{x - 1}{2}$, d’où $y = \\left(\\dfrac{x - 1}{2}\\right)^2 = \\dfrac{(x - 1)^2}{4}$.'],
        },
        {
          label: 'En quel point (abscisse) la tangente est-elle horizontale ?',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$y\'(t) = 2t = 0$ pour $t = 0$, où $x\' = 2 \\neq 0$ : point $(1\\,;0)$, le sommet de la parabole.'],
        },
      ],
    },
    {
      id: 'cin-projectile',
      level: 3,
      title: 'Un ballon',
      statement: 'Un ballon suit $x(t) = 10t$, $y(t) = 10t - 5t^2$ (en mètres, $t$ en secondes).',
      parts: [
        {
          label: 'À quel instant atteint-il son point le plus haut (en s) ?',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: 's' },
          steps: ['$y\'(t) = 10 - 10t = 0$ pour $t = 1$ s.'],
        },
        {
          label: 'Quelle est la hauteur maximale (en m) ?',
          answer: { kind: 'number', value: 5, tolerance: 0.001, unit: 'm' },
          steps: ['$y(1) = 10 - 5 = 5$ m.'],
        },
        {
          label: 'À quelle distance retombe-t-il (en m) ?',
          answer: { kind: 'number', value: 20, tolerance: 0.001, unit: 'm' },
          steps: ['$y(t) = 5t(2 - t) = 0$ pour $t = 2$ s ; $x(2) = 20$ m.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le vecteur vitesse de $M(t) = (\\cos t, \\sin t)$ est :',
      choices: ['$(-\\sin t\\,;\\cos t)$', '$(\\sin t\\,;\\cos t)$', '$(\\cos t\\,;\\sin t)$', '$(-\\cos t\\,;-\\sin t)$'],
      answer: 0,
      explanation: 'On dérive chaque coordonnée.',
    },
    {
      question: 'La tangente en $M(t_0)$ est verticale si :',
      choices: ['$x\'(t_0) = 0$ et $y\'(t_0) \\neq 0$', '$y\'(t_0) = 0$', '$x(t_0) = 0$', '$x\'(t_0) = y\'(t_0)$'],
      answer: 0,
      explanation: 'Le vecteur vitesse $(0\\,;y\')$ est alors vertical.',
    },
    {
      question: '$x = 3\\cos t$, $y = 3\\sin t$ décrit :',
      choices: ['un cercle de rayon 3', 'une ellipse', 'une droite', 'une parabole'],
      answer: 0,
      explanation: '$x^2 + y^2 = 9$.',
    },
    {
      question: 'Au sommet de la trajectoire d’un projectile, le vecteur vitesse est :',
      choices: ['horizontal', 'nul', 'vertical', 'dirigé vers le bas'],
      answer: 0,
      explanation: '$y\' = 0$ mais $x\' \\neq 0$.',
    },
  ],
  applications: [
    {
      title: 'Le dégagement du gardien',
      tagline: 'Jusqu’où le ballon va-t-il ?',
      situation:
        'Un gardien de but dégage le ballon depuis le sol avec une vitesse de 20 m/s, à 45° au-dessus de l’horizontale. On prend $g = 10$ m/s².',
      model: 'On néglige la résistance de l’air : $x = v_0\\cos\\alpha\\,t$, $y = -5t^2 + v_0\\sin\\alpha\\,t$.',
      questions: ['À quelle distance du gardien le ballon retombe-t-il, en m ?'],
      check: { value: 40, tolerance: 0.02, unit: 'm' },
      solution: [
        '$v_0\\cos 45° = v_0\\sin 45° = 10\\sqrt{2} \\approx 14{,}14$ m/s.',
        '$y = 0$ pour $t = \\dfrac{14{,}14}{5} \\approx 2{,}83$ s ; $x = 14{,}14 \\times 2{,}83 = 40$ m.',
        'Formule directe : portée $= \\dfrac{v_0^2\\sin 2\\alpha}{g} = \\dfrac{400}{10} = 40$ m.',
      ],
      fact: 'Avec la résistance de l’air, un vrai ballon de football retombe nettement plus près, et l’angle de portée maximale est inférieur à 45°.',
    },
  ],
};
