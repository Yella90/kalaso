import { exercises } from '../content-cecp/td-cinematique-point';
import type { Lesson } from '../types';

// Complément du programme ivoirien (Terminale D) : la cinématique y forme un chapitre à part.
// Exercices : TD 01 de cecp (dont trois sujets du concours ENI-ABT).
export const lesson: Lesson = {
  hook:
    'Au feu vert de l’avenue de l’Indépendance, une moto-taxi démarre, prend le rond-point, puis file tout droit. Pour décrire ce trajet sans parler des forces, il suffit de trois vecteurs : où est la moto (**position**), à quelle allure elle avance (**vitesse**) et comment cette allure change (**accélération**). C’est la cinématique.',
  objectives: [
    'écrire le vecteur position et les équations horaires d’un point, puis l’équation de sa trajectoire ;',
    'calculer les vecteurs vitesse et accélération en dérivant les équations horaires ;',
    'décomposer l’accélération dans le repère de Frenet ($a_t$ et $a_n$) ;',
    'reconnaître et décrire un mouvement rectiligne uniforme, uniformément varié, sinusoïdal ou circulaire uniforme.',
  ],
  sections: [
    {
      title: 'Repérer un point qui bouge',
      blocks: [
        {
          kind: 'definition',
          term: 'Référentiel',
          text: 'objet de référence par rapport auquel on décrit le mouvement, muni d’un repère d’espace $(O, \\vec{i}, \\vec{j}, \\vec{k})$ et d’une horloge. Le même passager est immobile dans le Sotrama, mais en mouvement pour le vendeur au bord de la route.',
        },
        {
          kind: 'formula',
          label: 'Vecteur position',
          tex: '\\vec{OM} = x(t)\\,\\vec{i} + y(t)\\,\\vec{j} + z(t)\\,\\vec{k}',
          legend: ['$x(t)$, $y(t)$, $z(t)$ : **équations horaires** du mouvement, en mètres'],
        },
        {
          kind: 'text',
          text: 'La **trajectoire** est l’ensemble des positions successives du point. Son équation (dite cartésienne) s’obtient en éliminant le temps $t$ entre les équations horaires.',
        },
        {
          kind: 'example',
          title: 'trouver la trajectoire',
          text: 'Un point a pour équations horaires $x = 2t$ et $y = 4t^2$ (en mètres et secondes).',
          steps: ['De $x = 2t$, on tire $t = \\dfrac{x}{2}$.', 'On remplace : $y = 4\\left(\\dfrac{x}{2}\\right)^2 = x^2$.', 'La trajectoire est la parabole $y = x^2$ (pour $x \\geq 0$).'],
        },
        {
          kind: 'text',
          text: 'Sur une trajectoire connue (une route, un cercle), on peut aussi repérer le point par son **abscisse curviligne** $s(t)$ : la longueur mesurée le long de la trajectoire depuis une origine choisie.',
        },
      ],
    },
    {
      title: 'Le vecteur vitesse',
      blocks: [
        {
          kind: 'formula',
          tex: '\\vec{v} = \\dfrac{\\mathrm{d}\\vec{OM}}{\\mathrm{d}t} \\qquad v_x = \\dfrac{\\mathrm{d}x}{\\mathrm{d}t},\\ v_y = \\dfrac{\\mathrm{d}y}{\\mathrm{d}t} \\qquad v = \\sqrt{v_x^2 + v_y^2}',
          legend: ['$v$ : valeur de la vitesse, en m/s'],
        },
        {
          kind: 'rule',
          text: 'Le vecteur vitesse est toujours **tangent à la trajectoire** et orienté dans le sens du mouvement.',
        },
        {
          kind: 'example',
          title: 'vitesse à un instant donné',
          text: 'Pour $x = 2t$ et $y = 4t^2$ : $v_x = 2$ m/s et $v_y = 8t$.',
          steps: ['À $t = 0{,}5$ s : $v_x = 2$ m/s et $v_y = 4$ m/s.', '$v = \\sqrt{2^2 + 4^2} = \\sqrt{20} \\approx 4{,}5$ m/s.'],
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Vitesse à partir d’un enregistrement',
          blocks: [
            {
              kind: 'text',
              text: 'Sur une chronophotographie de positions $M_0, M_1, M_2…$ prises toutes les $\\tau$ secondes, la vitesse au point $M_i$ est proche de la vitesse moyenne entre les points voisins : $v_i \\approx \\dfrac{M_{i-1}M_{i+1}}{2\\tau}$.',
            },
          ],
        },
      ],
    },
    {
      title: 'Le vecteur accélération',
      blocks: [
        {
          kind: 'formula',
          tex: '\\vec{a} = \\dfrac{\\mathrm{d}\\vec{v}}{\\mathrm{d}t} = \\dfrac{\\mathrm{d}^2\\vec{OM}}{\\mathrm{d}t^2} \\qquad a_x = \\dfrac{\\mathrm{d}v_x}{\\mathrm{d}t},\\ a_y = \\dfrac{\\mathrm{d}v_y}{\\mathrm{d}t}',
          legend: ['$a$ : en m/s²'],
        },
        {
          kind: 'text',
          text: 'Le **repère de Frenet** est attaché au point mobile : $\\vec{u}_t$ est tangent à la trajectoire (sens du mouvement), $\\vec{u}_n$ lui est perpendiculaire et pointe vers l’intérieur de la courbe. L’accélération s’y décompose en deux parties.',
        },
        {
          kind: 'formula',
          label: 'Accélération dans le repère de Frenet',
          tex: '\\vec{a} = \\dfrac{\\mathrm{d}v}{\\mathrm{d}t}\\,\\vec{u}_t + \\dfrac{v^2}{R}\\,\\vec{u}_n',
          legend: ['$a_t = \\dfrac{\\mathrm{d}v}{\\mathrm{d}t}$ : accélération tangentielle, elle change la valeur de la vitesse', '$a_n = \\dfrac{v^2}{R}$ : accélération normale, elle change la direction ; $R$ : rayon de courbure, en m'],
        },
        {
          kind: 'rule',
          text: 'Le mouvement est **accéléré** si $\\vec{a} \\cdot \\vec{v} > 0$, **retardé** (freinage) si $\\vec{a} \\cdot \\vec{v} < 0$, **uniforme** (vitesse de valeur constante) si $\\vec{a} \\cdot \\vec{v} = 0$.',
        },
        {
          kind: 'example',
          title: 'le rond-point',
          text: 'La moto-taxi tourne à vitesse constante, 36 km/h, sur un rond-point de rayon 20 m.',
          steps: ['$v = 10$ m/s constante, donc $a_t = 0$.', '$a_n = \\dfrac{v^2}{R} = \\dfrac{100}{20} = 5$ m/s², dirigée vers le centre du rond-point.'],
        },
      ],
    },
    {
      title: 'Les mouvements rectilignes',
      blocks: [
        {
          kind: 'table',
          head: ['Mouvement', 'Accélération', 'Équations horaires'],
          rows: [
            ['Rectiligne uniforme (MRU)', '$a = 0$', '$v = v_0$ ; $x = v_0 t + x_0$'],
            ['Rectiligne uniformément varié (MRUV)', '$a$ constante', '$v = at + v_0$ ; $x = \\frac{1}{2}at^2 + v_0 t + x_0$'],
            ['Rectiligne sinusoïdal', '$a = -\\omega^2 x$', '$x = X_m\\cos(\\omega t + \\varphi)$'],
          ],
        },
        {
          kind: 'formula',
          label: 'MRUV : relation sans le temps',
          tex: 'v^2 - v_0^2 = 2a\\,(x - x_0)',
        },
        {
          kind: 'example',
          title: 'démarrage au feu vert',
          text: 'La moto part du repos avec $a = 2$ m/s² pendant 5 s.',
          steps: ['$v = 2 \\times 5 = 10$ m/s, soit 36 km/h.', '$x = \\frac{1}{2} \\times 2 \\times 5^2 = 25$ m parcourus.'],
        },
        {
          kind: 'text',
          text: 'Pour le mouvement sinusoïdal $x = X_m\\cos(\\omega t + \\varphi)$ : $v = -X_m\\omega\\sin(\\omega t + \\varphi)$, donc la vitesse maximale vaut $X_m\\omega$ et l’accélération maximale $X_m\\omega^2$. La période est $T = \\dfrac{2\\pi}{\\omega}$.',
        },
        {
          kind: 'trap',
          wrong: '« $a$ est négative, donc le mouvement est retardé. »',
          why: 'Le signe de $a$ seul ne suffit pas : une voiture qui recule ($v < 0$) en prenant de la vitesse a aussi $a < 0$.',
          reflex: 'Comparer les signes de $a$ et de $v$ : mêmes signes, mouvement accéléré ; signes contraires, mouvement retardé.',
        },
      ],
    },
    {
      title: 'Les mouvements circulaires',
      blocks: [
        {
          kind: 'text',
          text: 'Sur un cercle de rayon $R$, on repère le point par son **abscisse angulaire** $\\theta(t)$, en radians. L’abscisse curviligne vaut $s = R\\theta$.',
        },
        {
          kind: 'formula',
          tex: '\\omega = \\dfrac{\\mathrm{d}\\theta}{\\mathrm{d}t} \\qquad v = R\\,\\omega',
          legend: ['$\\omega$ : vitesse angulaire, en rad/s', '$v$ : vitesse, en m/s'],
        },
        {
          kind: 'definition',
          term: 'Mouvement circulaire uniforme (MCU)',
          text: '$\\omega$ est constante : $\\theta = \\omega t + \\theta_0$. L’accélération tangentielle est nulle et l’accélération est **centripète** (dirigée vers le centre).',
        },
        {
          kind: 'formula',
          label: 'MCU',
          tex: 'a = a_n = \\dfrac{v^2}{R} = R\\,\\omega^2 \\qquad T = \\dfrac{2\\pi}{\\omega} \\qquad N = \\dfrac{1}{T}',
          legend: ['$T$ : période, en s ; $N$ : fréquence, en Hz (tours par seconde)'],
        },
        {
          kind: 'text',
          text: 'Si $\\omega$ varie de façon régulière (mouvement circulaire uniformément varié), l’accélération angulaire $\\ddot{\\theta}$ est constante et l’accélération tangentielle vaut $a_t = R\\,\\ddot{\\theta}$.',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Les vitesses en tours par minute se convertissent avant tout calcul : $\\omega = \\dfrac{2\\pi N}{60}$ rad/s si $N$ est en tr/min.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Équations horaires $x(t)$, $y(t)$ ; trajectoire : on élimine $t$.',
    '$\\vec{v} = \\dfrac{\\mathrm{d}\\vec{OM}}{\\mathrm{d}t}$ est tangent à la trajectoire ; $\\vec{a} = \\dfrac{\\mathrm{d}\\vec{v}}{\\mathrm{d}t}$.',
    'Repère de Frenet : $a_t = \\dfrac{\\mathrm{d}v}{\\mathrm{d}t}$ et $a_n = \\dfrac{v^2}{R}$.',
    'MRUV : $v = at + v_0$, $x = \\frac{1}{2}at^2 + v_0t + x_0$ et $v^2 - v_0^2 = 2a(x - x_0)$.',
    'MCU : $v = R\\omega$, $a = \\dfrac{v^2}{R} = R\\omega^2$, vers le centre ; $T = \\dfrac{2\\pi}{\\omega}$.',
  ],
  simulationTasks: [
    'compare les vecteurs vitesse et accélération dans un mouvement uniforme, uniformément varié, puis circulaire ;',
    'trouve un réglage où l’accélération est perpendiculaire à la vitesse : que devient la valeur de la vitesse ?',
  ],
  exercises,
  quiz: [
    {
      question: 'Le vecteur vitesse d’un point est toujours :',
      choices: ['tangent à la trajectoire', 'perpendiculaire à la trajectoire', 'dirigé vers le centre de courbure', 'nul dans un mouvement rectiligne'],
      answer: 0,
      explanation: 'Il est porté par la tangente à la trajectoire, dans le sens du mouvement.',
    },
    {
      question: 'Dans un mouvement circulaire uniforme, l’accélération est :',
      choices: ['nulle', 'tangente à la trajectoire', 'dirigée vers le centre', 'dirigée vers l’extérieur'],
      answer: 2,
      explanation: 'La valeur de la vitesse ne change pas ($a_t = 0$) ; il reste $a_n = \\dfrac{v^2}{R}$, vers le centre : l’accélération est centripète.',
    },
    {
      question: 'Sur un axe, un mobile a $v = 3$ m/s et $a = -2$ m/s². Son mouvement est :',
      choices: ['accéléré', 'retardé', 'uniforme', 'impossible'],
      answer: 1,
      explanation: '$a$ et $v$ ont des signes contraires : la vitesse diminue, le mouvement est retardé.',
    },
    {
      question: 'Si $x(t) = 3t^2 - 2t + 1$ (SI), l’accélération vaut :',
      choices: ['3 m/s²', '6 m/s²', '−2 m/s²', '1 m/s²'],
      answer: 1,
      explanation: '$v = 6t - 2$, puis $a = 6$ m/s² : c’est un MRUV.',
    },
    {
      question: 'Une roue de rayon 0,3 m tourne à 10 rad/s. Un point de la jante va à :',
      choices: ['3 m/s', '30 m/s', '0,03 m/s', '33 m/s'],
      answer: 0,
      explanation: '$v = R\\omega = 0{,}3 \\times 10 = 3$ m/s.',
    },
    {
      question: 'Quelle équation horaire décrit un mouvement rectiligne uniforme ?',
      choices: ['$x = v_0 t + x_0$', '$x = \\frac{1}{2}at^2$', '$v = at + v_0$', '$x = X_m\\cos(\\omega t)$'],
      answer: 0,
      explanation: 'Vitesse constante, accélération nulle : $x$ varie linéairement avec le temps.',
    },
  ],
  applications: [
    {
      title: 'Le Sotrama et le feu rouge',
      tagline: 'Sur quelle distance un minibus peut-il s’arrêter ?',
      situation:
        'Un Sotrama roule à 36 km/h sur une route droite. Le chauffeur voit le feu passer au rouge et freine : le minibus s’arrête en 25 m, avec une décélération constante.',
      model: 'Le minibus est un point en mouvement rectiligne uniformément retardé ; on ne tient pas compte du temps de réaction du chauffeur.',
      questions: ['Quelle est la valeur de la décélération du Sotrama, en m/s² ?'],
      check: { value: 2, tolerance: 0.03, unit: 'm/s²' },
      solution: [
        '$v_0 = 36$ km/h $= 10$ m/s et la vitesse finale est nulle.',
        '$0 - v_0^2 = 2a\\,d$, donc $a = -\\dfrac{v_0^2}{2d} = -\\dfrac{100}{50} = -2$ m/s².',
        'La décélération vaut 2 m/s². Le freinage dure $t = \\dfrac{v_0}{2} = 5$ s.',
      ],
      fact: 'Si la vitesse double, la distance de freinage est multipliée par quatre, car elle dépend de $v_0^2$.',
    },
    {
      title: 'La décortiqueuse du village',
      tagline: 'Pourquoi le disque d’un moulin est-il si dangereux ?',
      situation:
        'Le disque d’une décortiqueuse à mil a un rayon de 10 cm et tourne à 1 500 tours par minute, à vitesse constante.',
      model: 'Un point du bord du disque a un mouvement circulaire uniforme.',
      questions: ['Quelle est la vitesse d’un point du bord du disque, en m/s ?', 'Quelle est son accélération ?'],
      check: { value: 15.708, tolerance: 0.03, unit: 'm/s' },
      solution: [
        '$\\omega = \\dfrac{2\\pi \\times 1500}{60} \\approx 157$ rad/s.',
        '$v = R\\omega = 0{,}10 \\times 157 \\approx 15{,}7$ m/s, soit environ 57 km/h.',
        '$a = R\\omega^2 = 0{,}10 \\times 157^2 \\approx 2\\,470$ m/s², environ 250 fois l’accélération de la pesanteur.',
      ],
      fact: 'Les centrifugeuses des laboratoires d’analyses médicales utilisent ces très grandes accélérations pour séparer le sang en quelques minutes.',
    },
  ],
};
