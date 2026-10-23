import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Un atelier de couture de Bamako veut savoir combien de boubous fabriquer par semaine pour gagner le plus possible. Un ingénieur veut savoir si une équation a une solution, et où la chercher. Pour répondre, on **étudie une fonction** : ses limites, sa continuité, ses variations et l’allure de sa courbe.',
  objectives: [
    'calculer des limites et lever les formes indéterminées simples ;',
    'utiliser la continuité et le théorème des valeurs intermédiaires ;',
    'étudier les variations d’une fonction avec sa dérivée ;',
    'reconnaître les asymptotes et branches infinies d’une courbe.',
  ],
  sections: [
    {
      title: 'Limites',
      blocks: [
        {
          kind: 'text',
          text: 'Les limites des sommes, produits et quotients se déduisent de celles des fonctions qui les composent, sauf dans quatre cas, les **formes indéterminées** : $\\infty - \\infty$, $0 \\times \\infty$, $\\dfrac{\\infty}{\\infty}$ et $\\dfrac{0}{0}$.',
        },
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Lever une indétermination',
          blocks: [
            {
              kind: 'list',
              items: [
                'en l’infini, pour un polynôme ou une fraction rationnelle : factoriser par le terme de plus haut degré ;',
                'avec des racines carrées : multiplier par l’expression conjuguée ;',
                'en un point $a$ avec $\\frac{0}{0}$ : factoriser par $(x - a)$ ou reconnaître un taux d’accroissement.',
              ],
            },
          ],
        },
        {
          kind: 'example',
          title: '$\\lim\\limits_{x \\to +\\infty} \\dfrac{2x^2 + 1}{x^2 - 3}$',
          text: 'Forme $\\dfrac{\\infty}{\\infty}$.',
          steps: ['$\\dfrac{2x^2 + 1}{x^2 - 3} = \\dfrac{x^2(2 + 1/x^2)}{x^2(1 - 3/x^2)} = \\dfrac{2 + 1/x^2}{1 - 3/x^2}$.', 'La limite vaut $\\dfrac{2}{1} = 2$.'],
        },
      ],
    },
    {
      title: 'Continuité et valeurs intermédiaires',
      blocks: [
        {
          kind: 'definition',
          term: 'Fonction continue en $a$',
          text: '$f$ est définie en $a$ et $\\lim\\limits_{x \\to a} f(x) = f(a)$ : sa courbe se trace « sans lever le crayon ». Les polynômes, fractions rationnelles, racines, sinus, cosinus, ln et exp sont continus sur leurs ensembles de définition.',
        },
        {
          kind: 'rule',
          text: '**Théorème des valeurs intermédiaires** : si $f$ est continue et **strictement monotone** sur $[a, b]$, alors pour tout $k$ compris entre $f(a)$ et $f(b)$, l’équation $f(x) = k$ a **une seule** solution dans $[a, b]$.',
        },
        {
          kind: 'example',
          title: '$x^3 + x - 1 = 0$',
          text: '$f(x) = x^3 + x - 1$ est continue et strictement croissante ($f\'(x) = 3x^2 + 1 > 0$).',
          steps: ['$f(0) = -1 < 0$ et $f(1) = 1 > 0$ : l’équation a une seule solution $\\alpha$ dans $[0, 1]$.', '$f(0{,}6) \\approx -0{,}18$ et $f(0{,}7) \\approx 0{,}04$ : $0{,}6 < \\alpha < 0{,}7$ (on peut continuer par dichotomie).'],
        },
      ],
    },
    {
      title: 'Dérivée et variations',
      blocks: [
        {
          kind: 'table',
          head: ['$f(x)$', '$f\'(x)$'],
          rows: [
            ['$x^n$', '$nx^{n-1}$'],
            ['$\\sqrt{x}$', '$\\dfrac{1}{2\\sqrt{x}}$'],
            ['$u^n$', '$nu\'u^{n-1}$'],
            ['$\\dfrac{u}{v}$', '$\\dfrac{u\'v - uv\'}{v^2}$'],
            ['$u \\circ v$', '$v\' \\times (u\' \\circ v)$'],
          ],
        },
        {
          kind: 'rule',
          text: 'Sur un intervalle : si $f\' > 0$ (sauf en des points isolés), $f$ est strictement croissante ; si $f\' < 0$, strictement décroissante. Si $f\'$ s’annule en changeant de signe en $a$, $f$ a un **extremum** en $a$.',
        },
        {
          kind: 'rule',
          text: '**Inégalité des accroissements finis** : si $m \\leq f\'(x) \\leq M$ sur $[a, b]$, alors $m(b - a) \\leq f(b) - f(a) \\leq M(b - a)$.',
        },
      ],
    },
    {
      title: 'Branches infinies',
      blocks: [
        {
          kind: 'table',
          head: ['Situation', 'Conclusion'],
          rows: [
            ['$\\lim\\limits_{x \\to a} f(x) = \\pm\\infty$', 'asymptote verticale $x = a$'],
            ['$\\lim\\limits_{x \\to \\pm\\infty} f(x) = b$', 'asymptote horizontale $y = b$'],
            ['$\\lim\\limits_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$', 'asymptote oblique $y = ax + b$'],
            ['$\\dfrac{f(x)}{x} \\to \\pm\\infty$', 'branche parabolique de direction $(Oy)$'],
          ],
        },
        {
          kind: 'example',
          title: '$f(x) = \\dfrac{x^2 + 1}{x - 1}$',
          text: 'On divise : $f(x) = x + 1 + \\dfrac{2}{x - 1}$.',
          steps: ['$\\dfrac{2}{x - 1} \\to 0$ en $\\pm\\infty$ : la droite $y = x + 1$ est asymptote oblique.', 'En $x = 1$, $f(x) \\to \\pm\\infty$ : la droite $x = 1$ est asymptote verticale.'],
        },
      ],
    },
  ],
  essentials: [
    'Formes indéterminées : $\\infty - \\infty$, $0 \\times \\infty$, $\\frac{\\infty}{\\infty}$, $\\frac{0}{0}$ ; factoriser par le terme dominant.',
    'TVI : $f$ continue et strictement monotone sur $[a, b]$ ⇒ $f(x) = k$ a une seule solution pour $k$ entre $f(a)$ et $f(b)$.',
    'Signe de $f\'$ ⇒ variations ; $f\'$ s’annule en changeant de signe ⇒ extremum.',
    'Asymptotes : verticale, horizontale, oblique ($f(x) - (ax + b) \\to 0$).',
  ],
  exercises: [
    {
      id: 'fct-limites',
      level: 1,
      title: 'Calculs de limites',
      statement: 'Calcule les limites suivantes.',
      parts: [
        {
          label: '$\\lim\\limits_{x \\to +\\infty} \\dfrac{2x^2 + 1}{x^2 - 3}$',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['On factorise par $x^2$ : la limite vaut $\\dfrac{2}{1} = 2$.'],
        },
        {
          label: '$\\lim\\limits_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}$',
          answer: { kind: 'number', value: 4, tolerance: 0.001, unit: '' },
          steps: ['$\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2$ pour $x \\neq 2$ : la limite vaut 4.'],
        },
        {
          label: '$\\lim\\limits_{x \\to +\\infty} \\left(\\sqrt{x^2 + 6x} - x\\right)$',
          answer: { kind: 'number', value: 3, tolerance: 0.001, unit: '' },
          steps: ['Forme $\\infty - \\infty$ : on multiplie par la quantité conjuguée.', '$\\dfrac{x^2 + 6x - x^2}{\\sqrt{x^2 + 6x} + x} = \\dfrac{6x}{x(\\sqrt{1 + 6/x} + 1)} \\to \\dfrac{6}{2} = 3$.'],
        },
      ],
    },
    {
      id: 'fct-etude',
      level: 2,
      title: 'Étude d’une fonction cubique',
      statement: 'On étudie $f(x) = x^3 - 3x + 1$ sur $\\mathbb{R}$.',
      parts: [
        {
          label: 'En quelle valeur positive de $x$ la dérivée s’annule-t-elle ?',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$f\'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$ : elle s’annule en $-1$ et en $1$.'],
        },
        {
          label: 'Calcule le maximum local de $f$.',
          answer: { kind: 'number', value: 3, tolerance: 0.001, unit: '' },
          steps: ['$f\' > 0$ avant $-1$ et $f\' < 0$ entre $-1$ et $1$ : maximum en $-1$, $f(-1) = -1 + 3 + 1 = 3$.', 'Minimum local en 1 : $f(1) = -1$.'],
        },
        {
          label: 'Combien de solutions l’équation $f(x) = 0$ a-t-elle ?',
          answer: { kind: 'number', value: 3, tolerance: 0, unit: '' },
          steps: ['Sur $]-\\infty, -1]$, $f$ croît de $-\\infty$ à 3 : une solution.', 'Sur $[-1, 1]$, $f$ décroît de 3 à $-1$ : une solution. Sur $[1, +\\infty[$, $f$ croît de $-1$ à $+\\infty$ : une solution.', 'Total : 3 solutions (TVI sur chaque intervalle).'],
        },
      ],
    },
    {
      id: 'fct-asymptote',
      level: 3,
      title: 'Asymptote oblique',
      statement: 'Soit $f(x) = \\dfrac{x^2 + 1}{x - 1}$ pour $x \\neq 1$. On cherche des réels $a$, $b$, $c$ tels que $f(x) = ax + b + \\dfrac{c}{x - 1}$.',
      parts: [
        {
          label: 'Donne la valeur de $b$.',
          answer: { kind: 'number', value: 1, tolerance: 0.001, unit: '' },
          steps: ['$(ax + b)(x - 1) + c = ax^2 + (b - a)x + (c - b)$ ; on identifie avec $x^2 + 1$ : $a = 1$, $b - a = 0$, $c - b = 1$.', 'Donc $a = 1$, $b = 1$, $c = 2$.'],
          result: 'f(x) = x + 1 + \\dfrac{2}{x - 1}',
        },
        {
          label: 'Donne la valeur de $c$.',
          answer: { kind: 'number', value: 2, tolerance: 0.001, unit: '' },
          steps: ['$c = b + 1 = 2$.'],
        },
        {
          label: 'Pour $x > 1$, la courbe est-elle au-dessus ou au-dessous de l’asymptote ? (« dessus » ou « dessous »)',
          answer: { kind: 'text', display: 'au-dessus', accepted: ['dessus', 'au-dessus', 'au dessus', 'audessus'] },
          steps: ['$f(x) - (x + 1) = \\dfrac{2}{x - 1} > 0$ pour $x > 1$ : la courbe est au-dessus de l’asymptote $y = x + 1$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Laquelle de ces formes est indéterminée ?',
      choices: ['$\\dfrac{\\infty}{\\infty}$', '$\\infty + \\infty$', '$\\dfrac{1}{\\infty}$', '$2 \\times \\infty$'],
      answer: 0,
      explanation: 'Les trois autres donnent respectivement $+\\infty$, 0 et $\\infty$.',
    },
    {
      question: 'Si $f\'(x) > 0$ sur $[a, b]$, alors $f$ est :',
      choices: ['strictement croissante sur $[a, b]$', 'positive sur $[a, b]$', 'constante', 'décroissante'],
      answer: 0,
      explanation: 'Le signe de la dérivée donne les variations, pas le signe de $f$.',
    },
    {
      question: 'La dérivée de $(2x + 1)^3$ est :',
      choices: ['$6(2x + 1)^2$', '$3(2x + 1)^2$', '$(2x + 1)^2$', '$2(2x + 1)^3$'],
      answer: 0,
      explanation: '$(u^3)\' = 3u\'u^2$ avec $u\' = 2$.',
    },
    {
      question: 'Si $\\lim\\limits_{x \\to +\\infty} f(x) = 5$, la courbe de $f$ admet :',
      choices: ['l’asymptote horizontale $y = 5$', 'l’asymptote verticale $x = 5$', 'une branche parabolique', 'aucune asymptote'],
      answer: 0,
      explanation: 'Limite finie en l’infini : asymptote horizontale.',
    },
  ],
  applications: [
    {
      title: 'L’atelier de couture',
      tagline: 'Combien de boubous fabriquer pour gagner le plus ?',
      situation:
        'Un atelier de couture estime son bénéfice hebdomadaire, en milliers de francs CFA, par $B(x) = -x^2 + 40x - 300$, où $x$ est le nombre de boubous fabriqués ($0 \\leq x \\leq 35$).',
      model: 'Le bénéfice est modélisé par une fonction du second degré ; $x$ est traité comme un réel.',
      questions: ['Combien de boubous faut-il fabriquer pour que le bénéfice soit maximal ?', 'Quel est ce bénéfice maximal ?'],
      check: { value: 20, tolerance: 0, unit: 'boubous' },
      solution: ['$B\'(x) = -2x + 40$ s’annule en $x = 20$, positive avant, négative après : maximum.', '$B(20) = -400 + 800 - 300 = 100$, soit 100 000 F CFA par semaine.'],
      fact: 'Au-delà de 20 boubous, le bénéfice baisse : il faut payer des heures supplémentaires et vendre moins cher pour écouler la production.',
    },
  ],
};
