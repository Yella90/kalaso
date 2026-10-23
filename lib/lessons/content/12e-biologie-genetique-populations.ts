import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'L’allèle de la drépanocytose est rare en Europe, mais fréquent en Afrique de l’Ouest. Pourquoi un allèle qui cause une maladie grave s’est-il maintenu justement là où sévit le paludisme ? Pour répondre, on ne regarde plus un individu, mais toute une **population**, et la fréquence de ses allèles.',
  objectives: [
    'calculer des fréquences alléliques et génotypiques ;',
    'utiliser la loi de Hardy-Weinberg et connaître ses conditions ;',
    'citer les facteurs qui modifient les fréquences : mutation, sélection, dérive, migration ;',
    'expliquer la fréquence de l’allèle S en zone de paludisme.',
  ],
  sections: [
    {
      title: 'Fréquences des allèles',
      blocks: [
        {
          kind: 'definition',
          term: 'Population',
          text: 'ensemble d’individus de la même espèce, vivant dans un même lieu et pouvant se reproduire entre eux. Leurs allèles forment le **pool génétique**.',
        },
        {
          kind: 'formula',
          tex: 'p = f(A) = \\dfrac{2N_{AA} + N_{Aa}}{2N} \\qquad q = f(a) = 1 - p',
          legend: ['$N$ : nombre d’individus ; chaque individu porte deux allèles'],
        },
        {
          kind: 'example',
          title: 'un échantillon',
          text: 'Sur 1 000 personnes : 360 AA, 480 AS, 160 SS.',
          steps: ['$p = f(A) = \\dfrac{2 \\times 360 + 480}{2\\,000} = 0{,}6$ ; $q = 0{,}4$.'],
        },
      ],
    },
    {
      title: 'La loi de Hardy-Weinberg',
      blocks: [
        {
          kind: 'rule',
          text: 'Dans une population **très grande**, où les unions se font **au hasard** (panmixie), **sans mutation, sans sélection et sans migration**, les fréquences des allèles restent constantes d’une génération à l’autre, et les génotypes ont pour fréquences :',
        },
        {
          kind: 'formula',
          tex: 'f(AA) = p^2 \\qquad f(Aa) = 2pq \\qquad f(aa) = q^2 \\qquad p^2 + 2pq + q^2 = 1',
        },
        {
          kind: 'example',
          title: 'estimer le nombre de porteurs sains',
          text: 'Une maladie récessive touche 1 naissance sur 2 500.',
          steps: ['$q^2 = \\dfrac{1}{2\\,500}$, donc $q = 0{,}02$ et $p = 0{,}98$.', 'Porteurs sains : $2pq \\approx 0{,}039$, soit environ 1 personne sur 25.'],
        },
      ],
    },
    {
      title: 'Ce qui fait évoluer une population',
      blocks: [
        {
          kind: 'list',
          items: [
            '**mutation** : crée de nouveaux allèles ;',
            '**sélection naturelle** : les porteurs de certains allèles survivent ou se reproduisent mieux ;',
            '**dérive génétique** : dans une petite population, le hasard des naissances change les fréquences ;',
            '**migrations** : des allèles arrivent ou partent avec les individus.',
          ],
        },
        {
          kind: 'example',
          title: 'drépanocytose et paludisme',
          text: 'Les SS souffrent de drépanocytose ; les AA sont plus sensibles au paludisme grave ; les AS sont en bonne santé et mieux protégés contre le paludisme.',
          steps: ['En zone de paludisme, les AS survivent mieux que les AA : la sélection favorise les hétérozygotes.', 'L’allèle S se maintient à une fréquence élevée, malgré la maladie des SS.'],
        },
        {
          kind: 'trap',
          wrong: '« Un allèle dominant devient forcément plus fréquent. »',
          why: 'La dominance concerne le phénotype d’un individu, pas l’évolution des fréquences.',
          reflex: 'Sans sélection ni dérive, les fréquences restent stables (Hardy-Weinberg).',
        },
        { kind: 'photo', id: 'plasmodium', caption: 'Le parasite du paludisme vit dans les globules rouges : les porteurs AS sont mieux protégés.' },
      ],
    },
  ],
  essentials: [
    '$p + q = 1$ ; $p = \\frac{2N_{AA} + N_{Aa}}{2N}$.',
    'Hardy-Weinberg : $p^2$, $2pq$, $q^2$ dans une grande population panmictique sans mutation, sélection ni migration.',
    'Facteurs d’évolution : mutation, sélection, dérive, migration.',
    'Paludisme : l’avantage des AS maintient l’allèle S.',
  ],
  simulationTasks: [
    "règle q = 0,1 et lis la fréquence des AS ;",
    "active la sélection due au paludisme et fais passer des générations : vers quelle valeur q tend-elle ?",
  ],
  exercises: [
    {
      id: 'pop-frequences',
      level: 1,
      title: 'Calculer des fréquences',
      statement: 'Dans un village, on a déterminé les génotypes de 1 000 personnes : 360 AA, 480 AS, 160 SS.',
      parts: [
        {
          label: 'Fréquence de l’allèle A.',
          answer: { kind: 'number', value: 0.6, tolerance: 0.001, unit: '' },
          steps: ['$\\dfrac{720 + 480}{2\\,000} = 0{,}6$.'],
        },
        {
          label: 'Fréquence attendue des AS selon Hardy-Weinberg.',
          answer: { kind: 'number', value: 0.48, tolerance: 0.001, unit: '' },
          steps: ['$2pq = 2 \\times 0{,}6 \\times 0{,}4 = 0{,}48$ : c’est bien la fréquence observée, la population est à l’équilibre.'],
        },
      ],
    },
    {
      id: 'pop-porteurs',
      level: 2,
      title: 'Estimer les porteurs sains',
      statement: 'L’albinisme (récessif) touche environ 1 naissance sur 2 500 dans une population.',
      parts: [
        {
          label: 'Fréquence $q$ de l’allèle de l’albinisme.',
          answer: { kind: 'number', value: 0.02, tolerance: 0.0005, unit: '' },
          steps: ['$q = \\sqrt{\\dfrac{1}{2\\,500}} = \\dfrac{1}{50} = 0{,}02$.'],
        },
        {
          label: 'Fréquence des porteurs sains, en % (valeur approchée).',
          answer: { kind: 'number', value: 3.92, tolerance: 0.05, unit: '%' },
          steps: ['$2pq = 2 \\times 0{,}98 \\times 0{,}02 = 0{,}0392$, soit 3,9 %.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Si $p = 0{,}7$, alors $q$ vaut :',
      choices: ['0,3', '0,49', '0,7', '1,7'],
      answer: 0,
      explanation: '$p + q = 1$.',
    },
    {
      question: 'La loi de Hardy-Weinberg suppose notamment :',
      choices: ['une très grande population et des unions au hasard', 'une forte sélection', 'beaucoup de migrations', 'une petite population'],
      answer: 0,
      explanation: 'Sans sélection, mutation, migration ni dérive.',
    },
    {
      question: 'Dans une petite population isolée, le hasard modifie les fréquences : c’est :',
      choices: ['la dérive génétique', 'la sélection naturelle', 'la mutation', 'la panmixie'],
      answer: 0,
      explanation: 'Plus la population est petite, plus la dérive est forte.',
    },
    {
      question: 'En zone de paludisme, quel génotype est favorisé ?',
      choices: ['AS', 'AA', 'SS', 'aucun'],
      answer: 0,
      explanation: 'Les hétérozygotes résistent mieux au paludisme grave sans être malades.',
    },
  ],
  applications: [
    {
      title: 'La drépanocytose au Mali',
      tagline: 'Combien de porteurs AS dans une population ?',
      situation:
        'Dans une région de paludisme, la fréquence de l’allèle S est d’environ 0,10. On suppose les unions au hasard.',
      model: 'On applique les fréquences de Hardy-Weinberg à une génération de naissances (avant l’effet de la sélection).',
      questions: ['Quel pourcentage des nouveau-nés est AS ?', 'Quel pourcentage est SS ?'],
      check: { value: 18, tolerance: 0.02, unit: '%' },
      solution: ['$2pq = 2 \\times 0{,}9 \\times 0{,}1 = 0{,}18$ : 18 % de porteurs AS.', '$q^2 = 0{,}01$ : 1 % de SS, soit environ un nouveau-né sur 100.'],
      fact: 'Le dépistage de la drépanocytose à la naissance permet de prendre en charge tôt les enfants SS et de réduire fortement leur mortalité.',
    },
  ],
};
