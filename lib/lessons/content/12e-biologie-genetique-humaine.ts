import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Avant de se marier, Fanta et Moussa font une électrophorèse de l’hémoglobine : tous deux sont AS. Le médecin leur explique leurs risques d’avoir un enfant drépanocytaire. Chez l’homme, on ne peut pas faire de croisements expérimentaux : on étudie les **familles** avec des arbres généalogiques, les **chromosomes** avec le caryotype, et l’**ADN** directement.',
  objectives: [
    'lire un arbre généalogique et trouver le mode de transmission d’une maladie ;',
    'distinguer transmission autosomique (dominante ou récessive) et liée au chromosome X ;',
    'calculer un risque génétique simple ;',
    'expliquer une anomalie du nombre de chromosomes (trisomie 21).',
  ],
  sections: [
    {
      title: 'Lire un arbre généalogique',
      blocks: [
        {
          kind: 'text',
          text: 'Carré : homme ; rond : femme ; symbole noirci : personne atteinte ; trait horizontal : couple ; trait vertical : enfants. Chaque génération est notée en chiffres romains.',
        },
        {
          kind: 'table',
          head: ['Indice dans l’arbre', 'Conclusion'],
          rows: [
            ['deux parents sains ont un enfant atteint', 'l’allèle de la maladie est **récessif**'],
            ['tout atteint a au moins un parent atteint, sur toutes les générations', 'probablement **dominant**'],
            ['presque uniquement des garçons atteints, nés de mères saines', 'probablement **récessif lié à l’X**'],
            ['une fille atteinte d’une maladie récessive a un père sain', 'le gène n’est **pas** porté par l’X'],
          ],
        },
      ],
    },
    {
      title: 'Les modes de transmission',
      blocks: [
        {
          kind: 'list',
          items: [
            '**autosomique récessive** (drépanocytose, albinisme) : il faut deux allèles malades ; les porteurs sains (hétérozygotes) transmettent l’allèle ;',
            '**autosomique dominante** : un seul allèle suffit ; un atteint hétérozygote a un risque de 1/2 à chaque naissance ;',
            '**récessive liée à l’X** (hémophilie, daltonisme) : un garçon ($X^aY$) est atteint avec un seul allèle ; une fille doit en avoir deux.',
          ],
        },
        {
          kind: 'example',
          title: 'deux parents AS',
          text: 'Chaque parent donne A ou S avec la probabilité 1/2.',
          steps: ['Enfant SS : $\\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1}{4}$ ; AS : $\\dfrac{1}{2}$ ; AA : $\\dfrac{1}{4}$.', 'Le risque est le même à chaque grossesse, quel que soit le nombre d’enfants déjà nés.'],
        },
        {
          kind: 'trap',
          wrong: '« Ils ont déjà un enfant SS, donc les trois suivants seront sains. »',
          why: 'Chaque fécondation est indépendante des précédentes.',
          reflex: 'Le risque de 1/4 s’applique à chaque naissance.',
        },
        { kind: 'photo', id: 'drepanocytes', caption: 'Chez un malade SS, des globules rouges prennent la forme d’une faucille.' },
      ],
    },
    {
      title: 'Anomalies chromosomiques et diagnostic',
      blocks: [
        {
          kind: 'text',
          text: 'Une erreur de séparation des chromosomes pendant la méiose (**non-disjonction**) donne un gamète avec un chromosome en trop ou en moins. Exemple : la **trisomie 21** (47 chromosomes, trois chromosomes 21), dont le risque augmente avec l’âge de la mère.',
        },
        {
          kind: 'table',
          head: ['Anomalie', 'Caryotype'],
          rows: [
            ['trisomie 21', '47, XX ou XY, +21'],
            ['syndrome de Turner', '45, X'],
            ['syndrome de Klinefelter', '47, XXY'],
          ],
        },
        {
          kind: 'callout',
          variant: 'retenir',
          title: 'Le conseil génétique',
          blocks: [
            {
              kind: 'text',
              text: 'L’**électrophorèse de l’hémoglobine** sépare HbA et HbS : elle indique si une personne est AA, AS ou SS. Faite avant le mariage, elle permet aux couples de connaître leurs risques et d’être accompagnés.',
            },
          ],
        },
        { kind: 'photo', id: 'caryotype' },
      ],
    },
  ],
  essentials: [
    'Parents sains → enfant atteint : allèle récessif.',
    'Autosomique récessive : risque 1/4 pour deux parents porteurs ; liée à l’X : surtout des garçons atteints.',
    'Chaque naissance est indépendante des précédentes.',
    'Non-disjonction en méiose → trisomie 21 (47 chromosomes) ; électrophorèse de l’hémoglobine : AA, AS ou SS.',
  ],
  simulationTasks: [
    "croise deux parents hétérozygotes (Aa × Aa) : quelle proportion d’enfants est aa ?",
  ],
  exercises: [
    {
      id: 'gh-drepano',
      level: 1,
      title: 'Un couple AS',
      statement: 'Fanta et Moussa sont tous les deux AS.',
      parts: [
        {
          label: 'Probabilité qu’un enfant soit SS (en fraction décimale).',
          answer: { kind: 'number', value: 0.25, tolerance: 0.001, unit: '' },
          steps: ['$\\dfrac{1}{2} \\times \\dfrac{1}{2} = 0{,}25$.'],
        },
        {
          label: 'Probabilité qu’un enfant sain soit porteur AS (valeur approchée).',
          answer: { kind: 'number', value: 0.6667, tolerance: 0.005, unit: '' },
          steps: ['Parmi les enfants sains (AA ou AS), on a 1 AA pour 2 AS : $\\dfrac{2}{3}$.'],
        },
        {
          label: 'Probabilité que leurs deux premiers enfants soient tous deux SS (valeur décimale).',
          answer: { kind: 'number', value: 0.0625, tolerance: 0.001, unit: '' },
          steps: ['Naissances indépendantes : $\\dfrac{1}{4} \\times \\dfrac{1}{4} = \\dfrac{1}{16}$.'],
        },
      ],
    },
    {
      id: 'gh-hemophilie',
      level: 2,
      title: 'L’hémophilie',
      statement: 'Une femme conductrice ($X^HX^h$) a des enfants avec un homme sain ($X^HY$). L’hémophilie est récessive et liée à l’X.',
      parts: [
        {
          label: 'Probabilité qu’un fils soit hémophile.',
          answer: { kind: 'number', value: 0.5, tolerance: 0.001, unit: '' },
          steps: ['Un fils reçoit Y de son père et un X de sa mère : $X^h$ avec la probabilité 1/2.'],
        },
        {
          label: 'Probabilité qu’une fille soit hémophile.',
          answer: { kind: 'number', value: 0, tolerance: 0, unit: '' },
          steps: ['Elle reçoit $X^H$ de son père : au pire conductrice, jamais atteinte ici.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Deux parents sains ont un enfant atteint. L’allèle de la maladie est :',
      choices: ['récessif', 'dominant', 'porté par Y', 'impossible à déterminer'],
      answer: 0,
      explanation: 'Les parents sont porteurs sains : l’allèle est masqué chez eux.',
    },
    {
      question: 'L’électrophorèse de l’hémoglobine permet de :',
      choices: ['savoir si une personne est AA, AS ou SS', 'compter les chromosomes', 'connaître le groupe sanguin', 'mesurer la glycémie'],
      answer: 0,
      explanation: 'HbA et HbS migrent différemment dans un champ électrique.',
    },
    {
      question: 'La trisomie 21 est due à :',
      choices: ['une non-disjonction pendant la méiose', 'une mutation du gène de l’hémoglobine', 'un virus', 'le paludisme'],
      answer: 0,
      explanation: 'Un gamète reçoit deux chromosomes 21 au lieu d’un.',
    },
    {
      question: 'Une maladie récessive liée à l’X touche surtout :',
      choices: ['les garçons', 'les filles', 'les deux également', 'les personnes âgées'],
      answer: 0,
      explanation: 'Les garçons n’ont qu’un X : un seul allèle suffit.',
    },
  ],
  applications: [
    {
      title: 'Le test avant le mariage',
      tagline: 'Connaître ses risques pour décider sereinement',
      situation:
        'Awa est AA et son fiancé Ibrahim est SS (il est suivi pour une drépanocytose). Ils se demandent si leurs enfants seront malades.',
      model: 'Transmission autosomique récessive.',
      questions: ['Quelle est la probabilité qu’un de leurs enfants soit SS ?', 'Quel sera le génotype de tous leurs enfants ?'],
      check: { value: 0, tolerance: 0, unit: '' },
      solution: ['Awa ne donne que A, Ibrahim que S : tous les enfants seront AS.', 'Probabilité d’un enfant SS : 0. Les enfants seront porteurs sains et devront à leur tour connaître leur statut avant d’avoir des enfants.'],
      fact: 'Au Mali, le Centre de recherche et de lutte contre la drépanocytose, à Bamako, suit les malades et sensibilise au dépistage.',
    },
  ],
};
