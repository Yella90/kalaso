import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Dans la cour de la grand-mère, on compte 10 têtes et 28 pattes entre les poules et les lapins. Combien y a-t-il de chaque ? Ce vieux problème se résout en une ligne avec un **système d’équations**. Et certaines équations plus difficiles, avec des racines ou des puissances 4, se ramènent à des équations du second degré.',
  objectives: [
    'résoudre une équation bicarrée par changement d’inconnue ;',
    'résoudre une équation irrationnelle et vérifier les solutions ;',
    'résoudre une inéquation du second degré ;',
    'résoudre un système de deux ou trois équations linéaires.',
  ],
  sections: [
    {
      title: 'Se ramener au second degré',
      blocks: [
        {
          kind: 'example',
          title: 'équation bicarrée $x^4 - 5x^2 + 4 = 0$',
          text: 'On pose $X = x^2$ ($X \\geq 0$).',
          steps: ['$X^2 - 5X + 4 = 0$ donne $X = 1$ ou $X = 4$.', '$x^2 = 1$ ou $x^2 = 4$ : quatre solutions, $-2$, $-1$, $1$, $2$.'],
        },
        {
          kind: 'example',
          title: 'équation irrationnelle $\\sqrt{x + 5} = x - 1$',
          text: 'Condition : $x - 1 \\geq 0$ (une racine carrée est positive) et $x + 5 \\geq 0$.',
          steps: ['On élève au carré : $x + 5 = x^2 - 2x + 1$, soit $x^2 - 3x - 4 = 0$ : $x = 4$ ou $x = -1$.', '$x = -1$ ne vérifie pas $x \\geq 1$ ; vérification pour $x = 4$ : $\\sqrt{9} = 3 = 4 - 1$. Solution : $x = 4$.'],
        },
        {
          kind: 'trap',
          wrong: '« En élevant au carré, on garde toutes les solutions trouvées. »',
          why: 'Élever au carré peut ajouter des solutions parasites ($a^2 = b^2$ n’implique pas $a = b$).',
          reflex: 'Écrire les conditions avant, et vérifier chaque solution dans l’équation de départ.',
        },
      ],
    },
    {
      title: 'Inéquations du second degré',
      blocks: [
        {
          kind: 'rule',
          text: 'Pour résoudre $ax^2 + bx + c > 0$ (ou $< 0$), on cherche les racines du trinôme, puis on utilise son signe : signe de $a$ à l’extérieur des racines, signe contraire entre elles.',
        },
        {
          kind: 'example',
          title: '$x^2 - x - 6 < 0$',
          text: 'Racines : $-2$ et $3$ ; $a = 1 > 0$.',
          steps: ['Le trinôme est négatif entre ses racines : $S = ]-2\\,;3[$.'],
        },
      ],
    },
    {
      title: 'Systèmes linéaires',
      blocks: [
        {
          kind: 'callout',
          variant: 'methode',
          blocks: [
            {
              kind: 'list',
              items: [
                '**substitution** : exprimer une inconnue en fonction de l’autre dans une équation, puis remplacer dans l’autre ;',
                '**combinaison** : multiplier les équations pour qu’en les additionnant une inconnue disparaisse ;',
                'pour trois inconnues : éliminer une inconnue pour se ramener à un système de deux équations.',
              ],
            },
          ],
        },
        {
          kind: 'example',
          title: 'poules et lapins',
          text: '$p$ poules et $\\ell$ lapins : $p + \\ell = 10$ (têtes) et $2p + 4\\ell = 28$ (pattes).',
          steps: ['De la première : $p = 10 - \\ell$.', '$2(10 - \\ell) + 4\\ell = 28 \\Rightarrow 2\\ell = 8 \\Rightarrow \\ell = 4$, puis $p = 6$.'],
        },
      ],
    },
  ],
  essentials: [
    'Bicarrée : poser $X = x^2 \\geq 0$.',
    'Irrationnelle : conditions, élévation au carré, vérification.',
    'Inéquation du second degré : racines puis signe du trinôme.',
    'Systèmes : substitution ou combinaison.',
  ],
  exercises: [
    {
      id: 'eq-bicarree',
      level: 1,
      title: 'Bicarrée',
      statement: 'On résout $x^4 - 5x^2 + 4 = 0$.',
      parts: [
        {
          label: 'Combien l’équation a-t-elle de solutions réelles ?',
          answer: { kind: 'number', value: 4, tolerance: 0, unit: '' },
          steps: ['$x^2 = 1$ ou $x^2 = 4$ : $\\pm 1$ et $\\pm 2$.'],
        },
        {
          label: 'Quelle est la plus grande solution ?',
          answer: { kind: 'number', value: 2, tolerance: 0, unit: '' },
          steps: ['$x = 2$.'],
        },
      ],
    },
    {
      id: 'eq-irrationnelle',
      level: 2,
      title: 'Irrationnelle',
      statement: 'On résout $\\sqrt{x + 5} = x - 1$.',
      parts: [
        {
          label: 'Donne la solution.',
          answer: { kind: 'number', value: 4, tolerance: 0, unit: '' },
          steps: ['$x^2 - 3x - 4 = 0$ : 4 ou $-1$ ; seul 4 vérifie $x \\geq 1$.'],
        },
      ],
    },
    {
      id: 'eq-systeme',
      level: 3,
      title: 'Un système de trois équations',
      statement: 'Au marché, 1 kg de mil, 1 kg de riz et 1 kg de sucre coûtent ensemble 1 300 F. Le riz coûte 100 F de plus que le mil, et le sucre 200 F de plus que le riz.',
      parts: [
        {
          label: 'Prix d’un kilogramme de mil (en F).',
          answer: { kind: 'number', value: 300, tolerance: 0, unit: 'F' },
          steps: ['$m + r + s = 1\\,300$, $r = m + 100$, $s = r + 200 = m + 300$.', 'Par substitution : $3m + 400 = 1\\,300$, donc $m = 300$ F.'],
        },
        {
          label: 'Prix d’un kilogramme de sucre (en F).',
          answer: { kind: 'number', value: 600, tolerance: 0, unit: 'F' },
          steps: ['$s = m + 300 = 600$ F (et $r = 400$ F ; total : $300 + 400 + 600 = 1\\,300$ F).'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Pour résoudre $x^4 - 13x^2 + 36 = 0$, on pose :',
      choices: ['$X = x^2$', '$X = x^4$', '$X = \\sqrt{x}$', '$X = 2x$'],
      answer: 0,
      explanation: 'L’équation devient $X^2 - 13X + 36 = 0$.',
    },
    {
      question: 'L’ensemble des solutions de $x^2 - 4 > 0$ est :',
      choices: ['$]-\\infty\\,;-2[ \\cup ]2\\,;+\\infty[$', '$]-2\\,;2[$', '$]2\\,;+\\infty[$', '$\\mathbb{R}$'],
      answer: 0,
      explanation: 'Positif à l’extérieur des racines $\\pm 2$.',
    },
    {
      question: 'Pourquoi vérifier les solutions d’une équation irrationnelle ?',
      choices: ['l’élévation au carré peut ajouter des solutions fausses', 'pour éviter les erreurs de calcul seulement', 'parce que $\\Delta$ peut être négatif', 'ce n’est pas utile'],
      answer: 0,
      explanation: '$a^2 = b^2$ donne aussi $a = -b$.',
    },
    {
      question: 'La solution du système $x + y = 5$, $x - y = 1$ est :',
      choices: ['$(3\\,;2)$', '$(2\\,;3)$', '$(5\\,;0)$', '$(4\\,;1)$'],
      answer: 0,
      explanation: 'En additionnant : $2x = 6$.',
    },
  ],
  applications: [
    {
      title: 'Poules et lapins',
      tagline: 'Un vieux problème en une ligne',
      situation: 'Dans la cour, on compte 10 têtes et 28 pattes entre les poules et les lapins.',
      model: 'Une poule a 2 pattes, un lapin 4.',
      questions: ['Combien y a-t-il de lapins ?'],
      check: { value: 4, tolerance: 0, unit: 'lapins' },
      solution: ['$p + \\ell = 10$ et $2p + 4\\ell = 28$.', 'En soustrayant deux fois la première de la seconde : $2\\ell = 8$, donc 4 lapins et 6 poules.'],
    },
  ],
};
