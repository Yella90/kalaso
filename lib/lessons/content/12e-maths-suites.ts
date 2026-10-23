import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Une tontine où chacun verse 5 000 F de plus chaque mois, un compte d’épargne qui rapporte 4 % par an, un troupeau qui grandit chaque saison : on suit ces grandeurs mois après mois, année après année. Une liste de nombres ainsi numérotés s’appelle une **suite**. On veut prévoir leur valeur dans 10 ans, ou savoir vers quoi elles se stabilisent.',
  objectives: [
    'reconnaître et utiliser les suites arithmétiques et géométriques (terme général, somme) ;',
    'étudier le sens de variation d’une suite ;',
    'démontrer une propriété par récurrence ;',
    'étudier la convergence d’une suite définie par récurrence.',
  ],
  sections: [
    {
      title: 'Suites arithmétiques et géométriques',
      blocks: [
        {
          kind: 'table',
          head: ['', 'Arithmétique (raison $r$)', 'Géométrique (raison $q$)'],
          rows: [
            ['Récurrence', '$u_{n+1} = u_n + r$', '$v_{n+1} = q\\,v_n$'],
            ['Terme général', '$u_n = u_0 + nr$', '$v_n = v_0\\,q^n$'],
            ['Somme de $u_0$ à $u_n$', '$(n + 1)\\dfrac{u_0 + u_n}{2}$', '$v_0\\,\\dfrac{1 - q^{n+1}}{1 - q}$ ($q \\neq 1$)'],
          ],
        },
        {
          kind: 'rule',
          text: 'Limite de $q^n$ : 0 si $-1 < q < 1$ ; $+\\infty$ si $q > 1$ ; 1 si $q = 1$ ; pas de limite si $q \\leq -1$.',
        },
        {
          kind: 'example',
          title: 'épargne à intérêts composés',
          text: '500 000 F placés à 4 % par an.',
          steps: ['Chaque année, le capital est multiplié par 1,04 : suite géométrique de raison 1,04.', 'Après 10 ans : $500\\,000 \\times 1{,}04^{10} \\approx 740\\,122$ F.'],
        },
      ],
    },
    {
      title: 'Variations et raisonnement par récurrence',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          title: 'Étudier le sens de variation',
          blocks: [
            {
              kind: 'list',
              items: [
                'étudier le signe de $u_{n+1} - u_n$ ;',
                'ou, si tous les termes sont positifs, comparer $\\dfrac{u_{n+1}}{u_n}$ à 1 ;',
                'ou, si $u_n = f(n)$, étudier les variations de $f$ sur $[0, +\\infty[$.',
              ],
            },
          ],
        },
        {
          kind: 'rule',
          text: '**Raisonnement par récurrence** : pour montrer qu’une propriété $P(n)$ est vraie pour tout $n \\geq n_0$, on montre qu’elle est vraie pour $n_0$ (**initialisation**), puis que si elle est vraie pour un rang $n$, elle l’est au rang $n + 1$ (**hérédité**).',
        },
        {
          kind: 'example',
          title: 'une majoration',
          text: '$u_0 = 0$ et $u_{n+1} = \\dfrac{1}{2}u_n + 4$. Montrons que $u_n \\leq 8$ pour tout $n$.',
          steps: ['Initialisation : $u_0 = 0 \\leq 8$.', 'Hérédité : si $u_n \\leq 8$, alors $\\dfrac{1}{2}u_n + 4 \\leq 4 + 4 = 8$, donc $u_{n+1} \\leq 8$.'],
        },
      ],
    },
    {
      title: 'Convergence',
      blocks: [
        {
          kind: 'rule',
          text: 'Une suite **croissante et majorée** converge ; une suite **décroissante et minorée** converge. Si $u_{n+1} = f(u_n)$ avec $f$ continue et si $(u_n)$ converge vers $\\ell$, alors $\\ell = f(\\ell)$.',
        },
        {
          kind: 'example',
          title: 'suite arithmético-géométrique',
          text: 'Avec la suite précédente, on pose $w_n = u_n - 8$.',
          steps: ['$w_{n+1} = \\dfrac{1}{2}u_n + 4 - 8 = \\dfrac{1}{2}(u_n - 8) = \\dfrac{1}{2}w_n$ : $(w_n)$ est géométrique de raison $\\dfrac{1}{2}$.', '$w_n = -8\\left(\\dfrac{1}{2}\\right)^n \\to 0$, donc $u_n = 8 - 8\\left(\\dfrac{1}{2}\\right)^n \\to 8$.'],
        },
        {
          kind: 'trap',
          wrong: '« La suite est croissante et majorée par 8, donc sa limite est 8. »',
          why: 'Le théorème dit qu’elle converge, pas que sa limite est le majorant trouvé.',
          reflex: 'Chercher la limite avec $\\ell = f(\\ell)$ ou avec une suite auxiliaire.',
        },
      ],
    },
  ],
  essentials: [
    'Arithmétique : $u_n = u_0 + nr$ ; somme $=$ nombre de termes $\\times \\frac{\\text{premier} + \\text{dernier}}{2}$.',
    'Géométrique : $v_n = v_0q^n$ ; somme $= v_0\\frac{1 - q^{n+1}}{1 - q}$ ; $q^n \\to 0$ si $|q| < 1$.',
    'Récurrence : initialisation puis hérédité.',
    'Croissante et majorée ⇒ convergente ; si $u_{n+1} = f(u_n)$, la limite vérifie $\\ell = f(\\ell)$.',
  ],
  exercises: [
    {
      id: 'suites-arith',
      level: 1,
      title: 'Une suite arithmétique',
      statement: '$(u_n)$ est arithmétique, de premier terme $u_0 = 5$ et de raison 3.',
      parts: [
        {
          label: 'Calcule $u_{20}$.',
          answer: { kind: 'number', value: 65, tolerance: 0, unit: '' },
          steps: ['$u_{20} = 5 + 20 \\times 3 = 65$.'],
        },
        {
          label: 'Calcule $S = u_0 + u_1 + \\dots + u_{20}$.',
          answer: { kind: 'number', value: 735, tolerance: 0, unit: '' },
          steps: ['21 termes : $S = 21 \\times \\dfrac{5 + 65}{2} = 735$.'],
        },
      ],
    },
    {
      id: 'suites-geo',
      level: 2,
      title: 'Une suite géométrique',
      statement: '$(v_n)$ est géométrique, avec $v_0 = 2$ et $q = 3$.',
      parts: [
        {
          label: 'Calcule $v_5$.',
          answer: { kind: 'number', value: 486, tolerance: 0, unit: '' },
          steps: ['$v_5 = 2 \\times 3^5 = 486$.'],
        },
        {
          label: 'Calcule $v_0 + v_1 + \\dots + v_5$.',
          answer: { kind: 'number', value: 728, tolerance: 0, unit: '' },
          steps: ['$2 \\times \\dfrac{1 - 3^6}{1 - 3} = 2 \\times \\dfrac{728}{2} = 728$.'],
        },
      ],
    },
    {
      id: 'suites-recurrente',
      level: 3,
      title: 'Une suite définie par récurrence',
      statement: '$u_0 = 0$ et $u_{n+1} = \\dfrac{1}{2}u_n + 4$.',
      parts: [
        {
          label: 'Calcule $u_3$.',
          answer: { kind: 'number', value: 7, tolerance: 0.001, unit: '' },
          steps: ['$u_1 = 4$, $u_2 = 6$, $u_3 = 7$.'],
        },
        {
          label: 'Vers quelle limite la suite converge-t-elle ?',
          answer: { kind: 'number', value: 8, tolerance: 0.001, unit: '' },
          steps: ['$\\ell = \\dfrac{1}{2}\\ell + 4 \\Rightarrow \\ell = 8$ ; la suite auxiliaire $w_n = u_n - 8$ est géométrique de raison $\\dfrac{1}{2}$.'],
          result: 'u_n = 8 - 8\\left(\\tfrac{1}{2}\\right)^n \\to 8',
        },
        {
          label: 'À partir de quel rang $n$ a-t-on $u_n > 7{,}99$ ?',
          answer: { kind: 'number', value: 10, tolerance: 0, unit: '' },
          steps: ['$8\\left(\\dfrac{1}{2}\\right)^n < 0{,}01 \\iff 2^n > 800 \\iff n \\geq 10$ ($2^{10} = 1\\,024$).'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La suite $u_n = 3n - 2$ est :',
      choices: ['arithmétique de raison 3', 'géométrique de raison 3', 'arithmétique de raison −2', 'ni l’une ni l’autre'],
      answer: 0,
      explanation: '$u_{n+1} - u_n = 3$.',
    },
    {
      question: '$\\lim\\limits_{n \\to +\\infty} 0{,}9^n$ vaut :',
      choices: ['0', '1', '$+\\infty$', '0,9'],
      answer: 0,
      explanation: '$-1 < 0{,}9 < 1$.',
    },
    {
      question: 'Dans un raisonnement par récurrence, l’hérédité consiste à montrer que :',
      choices: ['si $P(n)$ est vraie, alors $P(n + 1)$ est vraie', '$P(0)$ est vraie', '$P(n)$ est vraie pour tout $n$', '$P(n + 1)$ implique $P(n)$'],
      answer: 0,
      explanation: 'On suppose $P(n)$ vraie (hypothèse de récurrence) et on en déduit $P(n + 1)$.',
    },
    {
      question: 'Une suite croissante et majorée :',
      choices: ['converge', 'tend vers $+\\infty$', 'est constante', 'n’a pas de limite'],
      answer: 0,
      explanation: 'C’est le théorème de convergence monotone.',
    },
  ],
  applications: [
    {
      title: 'L’épargne du commerçant',
      tagline: 'Combien rapporte un placement en 10 ans ?',
      situation:
        'Un commerçant place 500 000 F CFA sur un compte d’épargne qui rapporte 4 % par an ; les intérêts restent sur le compte.',
      model: 'Intérêts composés : le capital est multiplié par 1,04 chaque année.',
      questions: ['De combien dispose-t-il après 10 ans, en F CFA ?'],
      check: { value: 740122, tolerance: 0.01, unit: 'F CFA' },
      solution: ['$C_n = 500\\,000 \\times 1{,}04^n$ ; $C_{10} = 500\\,000 \\times 1{,}04^{10} \\approx 740\\,122$ F CFA.'],
      fact: 'Avec des intérêts simples (4 % du capital de départ chaque année), il n’aurait que 700 000 F : les intérêts composés rapportent des intérêts sur les intérêts.',
    },
  ],
};
