import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'L’antenne parabolique sur le toit concentre les ondes du satellite en un seul point. La Terre tourne autour du Soleil sur une ellipse. Le jet d’eau du tuyau dessine une parabole. Ces courbes, connues depuis l’Antiquité, s’obtiennent en coupant un cône par un plan : ce sont les **coniques**.',
  objectives: [
    'définir une conique par foyer, directrice et excentricité ;',
    'reconnaître l’équation réduite d’une parabole, d’une ellipse et d’une hyperbole ;',
    'déterminer les éléments caractéristiques (foyers, sommets, excentricité, asymptotes) ;',
    'utiliser la propriété du foyer d’une parabole.',
  ],
  sections: [
    {
      title: 'Définition par foyer et directrice',
      blocks: [
        {
          kind: 'definition',
          term: 'Conique',
          text: 'ensemble des points $M$ tels que $\\dfrac{MF}{MH} = e$, où $F$ est un point (le **foyer**), $H$ le projeté orthogonal de $M$ sur une droite $\\mathcal{D}$ (la **directrice**) et $e > 0$ l’**excentricité**.',
        },
        {
          kind: 'table',
          head: ['Excentricité', 'Conique'],
          rows: [
            ['$e = 1$', 'parabole'],
            ['$0 < e < 1$', 'ellipse'],
            ['$e > 1$', 'hyperbole'],
          ],
        },
      ],
    },
    {
      title: 'Équations réduites',
      blocks: [
        {
          kind: 'formula',
          label: 'Parabole',
          tex: 'y^2 = 2px \\qquad F\\left(\\dfrac{p}{2}\\,;0\\right) \\qquad \\mathcal{D} : x = -\\dfrac{p}{2}',
          legend: ['$p > 0$ : paramètre ; le sommet est l’origine'],
        },
        {
          kind: 'formula',
          label: 'Ellipse ($a > b > 0$)',
          tex: '\\dfrac{x^2}{a^2} + \\dfrac{y^2}{b^2} = 1 \\qquad c^2 = a^2 - b^2 \\qquad F(\\pm c\\,;0) \\qquad e = \\dfrac{c}{a}',
          legend: ['sommets $(\\pm a\\,;0)$ et $(0\\,;\\pm b)$ ; pour tout point, $MF + MF\' = 2a$'],
        },
        {
          kind: 'formula',
          label: 'Hyperbole',
          tex: '\\dfrac{x^2}{a^2} - \\dfrac{y^2}{b^2} = 1 \\qquad c^2 = a^2 + b^2 \\qquad F(\\pm c\\,;0) \\qquad e = \\dfrac{c}{a}',
          legend: ['asymptotes $y = \\pm\\dfrac{b}{a}x$ ; pour tout point, $|MF - MF\'| = 2a$'],
        },
        {
          kind: 'example',
          title: 'l’ellipse $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$',
          text: '$a = 5$ et $b = 3$.',
          steps: ['$c = \\sqrt{25 - 9} = 4$ : foyers $(\\pm 4\\,;0)$.', '$e = \\dfrac{4}{5} = 0{,}8$.'],
        },
        {
          kind: 'trap',
          wrong: '« Pour une hyperbole aussi, $c^2 = a^2 - b^2$. »',
          why: 'Pour l’hyperbole, $c > a$ : $c^2 = a^2 + b^2$.',
          reflex: 'Ellipse : $c^2 = a^2 - b^2$ ($e < 1$) ; hyperbole : $c^2 = a^2 + b^2$ ($e > 1$).',
        },
      ],
    },
    {
      title: 'La propriété du foyer',
      blocks: [
        {
          kind: 'rule',
          text: 'Tout rayon parallèle à l’axe d’une parabole se réfléchit sur la parabole en passant par son **foyer**. Inversement, une source placée au foyer donne un faisceau parallèle.',
        },
        {
          kind: 'text',
          text: 'C’est le principe des antennes paraboliques, des fours solaires et des phares de voiture. Pour l’ellipse, un rayon issu d’un foyer se réfléchit vers l’autre foyer.',
        },
      ],
    },
  ],
  essentials: [
    'Conique : $\\frac{MF}{MH} = e$ ; parabole $e = 1$, ellipse $e < 1$, hyperbole $e > 1$.',
    'Parabole $y^2 = 2px$ : foyer $(\\frac{p}{2}, 0)$, directrice $x = -\\frac{p}{2}$.',
    'Ellipse $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ : $c^2 = a^2 - b^2$, $e = \\frac{c}{a}$.',
    'Hyperbole $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$ : $c^2 = a^2 + b^2$, asymptotes $y = \\pm\\frac{b}{a}x$.',
  ],
  exercises: [
    {
      id: 'con-ellipse',
      level: 1,
      title: 'Une ellipse',
      statement: 'On considère l’ellipse $\\dfrac{x^2}{25} + \\dfrac{y^2}{9} = 1$.',
      parts: [
        {
          label: 'Calcule $c$.',
          answer: { kind: 'number', value: 4, tolerance: 0.001, unit: '' },
          steps: ['$c = \\sqrt{25 - 9} = 4$.'],
        },
        {
          label: 'Calcule l’excentricité.',
          answer: { kind: 'number', value: 0.8, tolerance: 0.001, unit: '' },
          steps: ['$e = \\dfrac{4}{5} = 0{,}8$.'],
        },
      ],
    },
    {
      id: 'con-parabole',
      level: 2,
      title: 'Une parabole',
      statement: 'On considère la parabole $y^2 = 8x$.',
      parts: [
        {
          label: 'Abscisse du foyer.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$2p = 8$, donc $p = 4$ et $F(2\\,;0)$.'],
        },
        {
          label: 'Équation de la directrice : $x = \\dots$',
          answer: { kind: 'number', value: -2, tolerance: 0.001, unit: '' },
          steps: ['$x = -\\dfrac{p}{2} = -2$.'],
        },
        {
          label: 'Le point $M(2\\,;4)$ est sur la parabole. Calcule $MF$.',
          answer: { kind: 'number', value: 4, tolerance: 0.001, unit: '' },
          steps: ['$4^2 = 8 \\times 2$ : $M$ est bien sur la parabole.', '$MF = 4$ et la distance de $M$ à la directrice vaut $2 - (-2) = 4$ : on vérifie $e = 1$.'],
        },
      ],
    },
    {
      id: 'con-hyperbole',
      level: 3,
      title: 'Une hyperbole',
      statement: 'On considère l’hyperbole $\\dfrac{x^2}{16} - \\dfrac{y^2}{9} = 1$.',
      parts: [
        {
          label: 'Calcule $c$.',
          answer: { kind: 'number', value: 5, tolerance: 0.001, unit: '' },
          steps: ['$c = \\sqrt{16 + 9} = 5$.'],
        },
        {
          label: 'Calcule l’excentricité.',
          answer: { kind: 'number', value: 1.25, tolerance: 0.001, unit: '' },
          steps: ['$e = \\dfrac{5}{4} = 1{,}25$.'],
        },
        {
          label: 'Pente positive des asymptotes.',
          answer: { kind: 'number', value: 0.75, tolerance: 0.001, unit: '' },
          steps: ['$y = \\pm\\dfrac{3}{4}x$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Une conique d’excentricité 0,5 est :',
      choices: ['une ellipse', 'une parabole', 'une hyperbole', 'un cercle'],
      answer: 0,
      explanation: '$0 < e < 1$. (Le cercle correspond à la limite $e = 0$.)',
    },
    {
      question: 'Le foyer de $y^2 = 4x$ est :',
      choices: ['$(1\\,;0)$', '$(4\\,;0)$', '$(2\\,;0)$', '$(0\\,;1)$'],
      answer: 0,
      explanation: '$2p = 4$, $p = 2$, foyer $\\left(\\frac{p}{2}\\,;0\\right)$.',
    },
    {
      question: 'Pour une ellipse, la somme $MF + MF\'$ vaut :',
      choices: ['$2a$', '$2b$', '$2c$', '$a + b$'],
      answer: 0,
      explanation: 'C’est la définition « du jardinier » : une corde de longueur $2a$ attachée aux deux foyers.',
    },
    {
      question: 'Les asymptotes de $\\dfrac{x^2}{4} - y^2 = 1$ ont pour équations :',
      choices: ['$y = \\pm\\dfrac{1}{2}x$', '$y = \\pm 2x$', '$y = \\pm 4x$', '$y = \\pm x$'],
      answer: 0,
      explanation: '$a = 2$, $b = 1$ : $y = \\pm\\dfrac{b}{a}x$.',
    },
  ],
  applications: [
    {
      title: 'L’antenne parabolique',
      tagline: 'Où placer le récepteur ?',
      situation:
        'Une antenne parabolique a 80 cm de diamètre et 10 cm de profondeur. Sa coupe est une parabole d’équation $y = \\dfrac{x^2}{4f}$, où $f$ est la distance du sommet au foyer (axe vertical, sommet à l’origine).',
      model: 'Le bord de l’antenne est au point $(40\\,;10)$, en cm ; le récepteur doit être placé au foyer.',
      questions: ['À quelle distance du fond de l’antenne faut-il placer le récepteur, en cm ?'],
      check: { value: 40, tolerance: 0.02, unit: 'cm' },
      solution: ['$10 = \\dfrac{40^2}{4f} \\Rightarrow f = \\dfrac{1\\,600}{40} = 40$ cm.', 'Le récepteur est à 40 cm du fond, sur l’axe de l’antenne.'],
      fact: 'Les fours solaires paraboliques, utilisés dans certains villages du Sahel, concentrent la lumière au foyer et peuvent dépasser 200 °C.',
    },
  ],
};
