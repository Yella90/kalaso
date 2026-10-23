import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un verre de thé à la menthe brûlant refroidit vite au début, puis de plus en plus lentement. Un ressort lâché oscille. Dans ces deux situations, on ne connaît pas directement la grandeur qui varie, mais on connaît la loi qui relie cette grandeur à sa **vitesse de variation** : c’est une **équation différentielle**.',
  objectives: [
    'résoudre $y\' = ay$ et $y\' = ay + b$ ;',
    'résoudre $y\'\' + \\omega^2 y = 0$ ;',
    'trouver la solution qui vérifie une condition initiale ;',
    'modéliser un refroidissement, une décharge ou une oscillation.',
  ],
  sections: [
    {
      title: 'Les équations $y\' = ay$ et $y\' = ay + b$',
      blocks: [
        {
          kind: 'definition',
          term: 'Équation différentielle',
          text: 'équation dont l’inconnue est une **fonction** $y$, et qui relie $y$ à ses dérivées. La résoudre, c’est trouver toutes les fonctions qui la vérifient.',
        },
        {
          kind: 'formula',
          tex: 'y\' = ay \\iff y(x) = C\\,e^{ax} \\qquad y\' = ay + b\\ (a \\neq 0) \\iff y(x) = C\\,e^{ax} - \\dfrac{b}{a}',
          legend: ['$C$ : constante réelle quelconque'],
        },
        {
          kind: 'rule',
          text: 'Une **condition initiale** $y(x_0) = y_0$ fixe la constante : il existe une seule solution qui la vérifie.',
        },
        {
          kind: 'example',
          title: '$y\' + 2y = 6$, $y(0) = 0$',
          text: 'On écrit $y\' = -2y + 6$ : $a = -2$, $b = 6$.',
          steps: ['$y = Ce^{-2x} + 3$.', '$y(0) = C + 3 = 0 \\Rightarrow C = -3$ : $y(x) = 3(1 - e^{-2x})$.', 'Quand $x \\to +\\infty$, $y \\to 3$ : c’est la solution constante, vers laquelle tendent toutes les autres.'],
        },
      ],
    },
    {
      title: 'L’équation $y\'\' + \\omega^2 y = 0$',
      blocks: [
        {
          kind: 'formula',
          tex: 'y\'\' + \\omega^2 y = 0 \\iff y(x) = A\\cos(\\omega x) + B\\sin(\\omega x) = R\\cos(\\omega x + \\varphi)',
          legend: ['$A$, $B$ (ou $R$, $\\varphi$) : constantes ; il faut deux conditions, par exemple $y(0)$ et $y\'(0)$'],
        },
        {
          kind: 'text',
          text: 'Les solutions sont périodiques, de période $T = \\dfrac{2\\pi}{\\omega}$. En physique, c’est l’équation de l’oscillateur harmonique : pendule élastique $\\ddot{x} + \\dfrac{k}{m}x = 0$, circuit LC $\\ddot{q} + \\dfrac{1}{LC}q = 0$.',
        },
        {
          kind: 'example',
          title: '$y\'\' + 4y = 0$, $y(0) = 1$, $y\'(0) = 0$',
          text: '$\\omega = 2$ : $y = A\\cos 2x + B\\sin 2x$.',
          steps: ['$y(0) = A = 1$ ; $y\'(x) = -2A\\sin 2x + 2B\\cos 2x$, donc $y\'(0) = 2B = 0$.', '$y(x) = \\cos 2x$, de période $\\pi$.'],
        },
      ],
    },
    {
      title: 'Modéliser',
      blocks: [
        {
          kind: 'table',
          head: ['Situation', 'Équation', 'Solution'],
          rows: [
            ['Refroidissement (loi de Newton)', '$T\' = -k(T - T_a)$', '$T = T_a + (T_0 - T_a)e^{-kt}$'],
            ['Décharge d’un condensateur', '$u\' = -\\dfrac{1}{RC}u$', '$u = U_0e^{-t/RC}$'],
            ['Désintégration radioactive', '$N\' = -\\lambda N$', '$N = N_0e^{-\\lambda t}$'],
            ['Oscillateur harmonique', '$x\'\' + \\omega^2x = 0$', '$x = X_m\\cos(\\omega t + \\varphi)$'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« La solution de $y\' = 3y$ est $y = e^{3x}$. »',
          why: 'C’est **une** solution ; il y en a une infinité, $y = Ce^{3x}$.',
          reflex: 'Toujours écrire la constante, puis la déterminer avec la condition initiale.',
        },
      ],
    },
  ],
  essentials: [
    '$y\' = ay \\iff y = Ce^{ax}$.',
    '$y\' = ay + b \\iff y = Ce^{ax} - \\frac{b}{a}$.',
    '$y\'\' + \\omega^2y = 0 \\iff y = A\\cos\\omega x + B\\sin\\omega x$ ; période $\\frac{2\\pi}{\\omega}$.',
    'Une condition initiale (ou deux pour l’ordre 2) donne une solution unique.',
  ],
  exercises: [
    {
      id: 'ed-ordre1',
      level: 1,
      title: 'Une décroissance exponentielle',
      statement: 'On résout $y\' = -0{,}5\\,y$ avec $y(0) = 4$.',
      parts: [
        {
          label: 'Donne la valeur de la constante $C$ dans $y = Ce^{-0{,}5x}$.',
          answer: { kind: 'number', value: 4, tolerance: 0.001, unit: '' },
          steps: ['$y(0) = C = 4$.'],
        },
        {
          label: 'Calcule $y(2)$ (valeur approchée).',
          answer: { kind: 'number', value: 1.4715, tolerance: 0.005, unit: '' },
          steps: ['$y(2) = 4e^{-1} \\approx 1{,}47$.'],
          result: 'y(2) = 4e^{-1}',
        },
      ],
    },
    {
      id: 'ed-second-membre',
      level: 2,
      title: 'Avec un second membre',
      statement: 'On résout $y\' + 2y = 6$ avec $y(0) = 0$.',
      parts: [
        {
          label: 'Quelle est la limite de la solution en $+\\infty$ ?',
          answer: { kind: 'number', value: 3, tolerance: 0.001, unit: '' },
          steps: ['$y = Ce^{-2x} + 3$ ; $e^{-2x} \\to 0$, donc $y \\to 3$.'],
        },
        {
          label: 'Calcule $y(1)$ (valeur approchée).',
          answer: { kind: 'number', value: 2.594, tolerance: 0.005, unit: '' },
          steps: ['$C = -3$ : $y(1) = 3(1 - e^{-2}) \\approx 2{,}594$.'],
          result: 'y(x) = 3(1 - e^{-2x})',
        },
      ],
    },
    {
      id: 'ed-ordre2',
      level: 3,
      title: 'Une oscillation',
      statement: 'On résout $y\'\' + 9y = 0$ avec $y(0) = 2$ et $y\'(0) = 3$.',
      parts: [
        {
          label: 'Donne la valeur de $A$ dans $y = A\\cos 3x + B\\sin 3x$.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$y(0) = A = 2$.'],
        },
        {
          label: 'Donne la valeur de $B$.',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$y\'(x) = -3A\\sin 3x + 3B\\cos 3x$ ; $y\'(0) = 3B = 3$, donc $B = 1$.'],
          result: 'y(x) = 2\\cos 3x + \\sin 3x',
        },
        {
          label: 'Quelle est l’amplitude $R$ de cette oscillation (valeur approchée) ?',
          answer: { kind: 'number', value: 2.236, tolerance: 0.005, unit: '' },
          steps: ['$R = \\sqrt{A^2 + B^2} = \\sqrt{5} \\approx 2{,}24$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Les solutions de $y\' = 2y$ sont les fonctions :',
      choices: ['$x \\mapsto Ce^{2x}$', '$x \\mapsto e^{2x} + C$', '$x \\mapsto 2e^x$', '$x \\mapsto Cx^2$'],
      answer: 0,
      explanation: 'Forme $y = Ce^{ax}$ avec $a = 2$.',
    },
    {
      question: 'La solution constante de $y\' = -3y + 12$ est :',
      choices: ['$y = 4$', '$y = -4$', '$y = 12$', '$y = 36$'],
      answer: 0,
      explanation: '$y\' = 0 \\Rightarrow -3y + 12 = 0 \\Rightarrow y = 4$.',
    },
    {
      question: 'Les solutions de $y\'\' + 25y = 0$ ont pour période :',
      choices: ['$\\dfrac{2\\pi}{5}$', '$\\dfrac{2\\pi}{25}$', '$5$', '$10\\pi$'],
      answer: 0,
      explanation: '$\\omega = 5$, $T = \\dfrac{2\\pi}{\\omega}$.',
    },
    {
      question: 'Pour une équation du second ordre, combien de conditions faut-il pour avoir une solution unique ?',
      choices: ['2', '1', '0', '3'],
      answer: 0,
      explanation: 'Deux constantes à déterminer, par exemple $y(0)$ et $y\'(0)$.',
    },
  ],
  applications: [
    {
      title: 'Le thé qui refroidit',
      tagline: 'À quelle température sera le deuxième verre ?',
      situation:
        'Le thé est servi à 90 °C dans une pièce à 30 °C. Sa température $T(t)$, en °C ($t$ en minutes), vérifie $T\' = -0{,}05\\,(T - 30)$.',
      model: 'Loi de refroidissement de Newton ; on suppose la pièce à température constante.',
      questions: ['Quelle est la température du thé au bout de 20 minutes ?'],
      check: { value: 52.07, tolerance: 0.01, unit: '°C' },
      solution: [
        'On pose $u = T - 30$ : $u\' = -0{,}05u$, donc $u = Ce^{-0{,}05t}$ avec $u(0) = 60$.',
        '$T(t) = 30 + 60e^{-0{,}05t}$ ; $T(20) = 30 + 60e^{-1} \\approx 52{,}1$ °C.',
      ],
      fact: 'Verser le thé de haut, d’un verre à l’autre, le refroidit plus vite : la surface d’échange avec l’air est plus grande, ce qui augmente le coefficient $k$.',
    },
  ],
};
