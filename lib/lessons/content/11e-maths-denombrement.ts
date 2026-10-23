import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Combien de matchs faut-il pour qu’en championnat de quartier chaque équipe rencontre toutes les autres ? Combien de mots de passe à 4 chiffres existe-t-il ? De combien de façons peut-on choisir 5 joueurs parmi 12 ? On ne compte pas un à un : on utilise des **méthodes de dénombrement**.',
  objectives: [
    'utiliser le principe multiplicatif et les arbres de choix ;',
    'calculer des p-listes, des arrangements et des permutations ;',
    'calculer des combinaisons et utiliser le triangle de Pascal ;',
    'choisir la bonne méthode selon que l’ordre compte ou non.',
  ],
  sections: [
    {
      title: 'Principe multiplicatif',
      blocks: [
        {
          kind: 'rule',
          text: 'Si un choix se fait en plusieurs étapes successives, avec $n_1$ possibilités pour la première, $n_2$ pour la deuxième, etc., le nombre total de choix est $n_1 \\times n_2 \\times \\dots$. Un **arbre** de choix permet de le visualiser.',
        },
        {
          kind: 'table',
          head: ['Situation', 'Nombre'],
          rows: [
            ['$p$ éléments ordonnés, répétitions permises ($p$-listes)', '$n^p$'],
            ['$p$ éléments ordonnés, distincts (arrangements)', '$A_n^p = n(n - 1)\\cdots(n - p + 1)$'],
            ['les $n$ éléments, dans un ordre (permutations)', '$n! = n \\times (n - 1) \\times \\dots \\times 1$'],
          ],
        },
        {
          kind: 'example',
          title: 'les anagrammes de MALI',
          text: 'Quatre lettres distinctes, à ranger dans un ordre.',
          steps: ['$4! = 24$ anagrammes (MALI, MAIL, LAMI…).'],
        },
      ],
    },
    {
      title: 'Combinaisons',
      blocks: [
        {
          kind: 'formula',
          tex: 'C_n^p = \\dbinom{n}{p} = \\dfrac{n!}{p!\\,(n - p)!} = \\dfrac{A_n^p}{p!}',
          legend: ['nombre de façons de choisir $p$ éléments parmi $n$, **sans tenir compte de l’ordre**'],
        },
        {
          kind: 'formula',
          label: 'Propriétés',
          tex: '\\dbinom{n}{p} = \\dbinom{n}{n - p} \\qquad \\dbinom{n}{p} = \\dbinom{n - 1}{p - 1} + \\dbinom{n - 1}{p}',
          legend: ['la seconde relation construit le **triangle de Pascal** : chaque nombre est la somme des deux au-dessus'],
        },
        {
          kind: 'table',
          head: ['$n$', 'Ligne du triangle de Pascal'],
          rows: [
            ['0', '1'],
            ['1', '1  1'],
            ['2', '1  2  1'],
            ['3', '1  3  3  1'],
            ['4', '1  4  6  4  1'],
            ['5', '1  5  10  10  5  1'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Choisir 3 délégués parmi 10 : $10 \\times 9 \\times 8 = 720$ façons. »',
          why: 'Ce calcul compte chaque groupe plusieurs fois (dans tous les ordres possibles).',
          reflex: 'Si l’ordre ne compte pas, diviser par $p!$ : $\\frac{720}{6} = 120$.',
        },
      ],
    },
  ],
  essentials: [
    'Principe multiplicatif : on multiplie les nombres de possibilités de chaque étape.',
    '$n^p$ (ordre, répétitions) ; $A_n^p$ (ordre, sans répétition) ; $n!$ (permutations).',
    '$C_n^p = \\frac{n!}{p!(n - p)!}$ quand l’ordre ne compte pas.',
    'Triangle de Pascal : $C_n^p = C_{n-1}^{p-1} + C_{n-1}^p$.',
  ],
  exercises: [
    {
      id: 'den-codes',
      level: 1,
      title: 'Codes et anagrammes',
      statement: 'Calcule les nombres suivants.',
      parts: [
        {
          label: 'Nombre de codes à 4 chiffres (0 à 9).',
          answer: { kind: 'number', value: 10000, tolerance: 0, unit: '' },
          steps: ['$10^4 = 10\\,000$.'],
        },
        {
          label: 'Nombre de codes à 4 chiffres tous différents.',
          answer: { kind: 'number', value: 5040, tolerance: 0, unit: '' },
          steps: ['$A_{10}^4 = 10 \\times 9 \\times 8 \\times 7 = 5\\,040$.'],
        },
        {
          label: 'Nombre d’anagrammes du mot MALI.',
          answer: { kind: 'number', value: 24, tolerance: 0, unit: '' },
          steps: ['$4! = 24$.'],
        },
      ],
    },
    {
      id: 'den-combinaisons',
      level: 2,
      title: 'Choisir sans ordre',
      statement: 'Calcule avec les combinaisons.',
      parts: [
        {
          label: 'Six amis se serrent tous la main deux à deux. Combien de poignées de main ?',
          answer: { kind: 'number', value: 15, tolerance: 0, unit: '' },
          steps: ['$C_6^2 = \\dfrac{6 \\times 5}{2} = 15$.'],
        },
        {
          label: 'Nombre d’équipes de 5 joueurs choisies parmi 12.',
          answer: { kind: 'number', value: 792, tolerance: 0, unit: '' },
          steps: ['$C_{12}^5 = \\dfrac{12 \\times 11 \\times 10 \\times 9 \\times 8}{120} = 792$.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: '$5!$ vaut :',
      choices: ['120', '25', '60', '20'],
      answer: 0,
      explanation: '$5 \\times 4 \\times 3 \\times 2 \\times 1$.',
    },
    {
      question: '$C_{10}^{8}$ est égal à :',
      choices: ['$C_{10}^{2} = 45$', '$80$', '$10$', '$C_{8}^{10}$'],
      answer: 0,
      explanation: '$C_n^p = C_n^{n-p}$.',
    },
    {
      question: 'Pour former un bureau (président, secrétaire, trésorier), on utilise :',
      choices: ['des arrangements', 'des combinaisons', 'des $p$-listes', 'le triangle de Pascal seul'],
      answer: 0,
      explanation: 'Les postes sont différents : l’ordre compte, pas de répétition.',
    },
    {
      question: 'Dans le triangle de Pascal, le nombre sous 4 et 6 (ligne 4) est :',
      choices: ['10', '24', '2', '46'],
      answer: 0,
      explanation: '$4 + 6 = 10$.',
    },
  ],
  applications: [
    {
      title: 'Le championnat du quartier',
      tagline: 'Combien de matchs organiser ?',
      situation:
        'Huit équipes participent au championnat de football du quartier. Chaque équipe doit rencontrer chacune des autres une seule fois.',
      model: 'Un match correspond à un choix de 2 équipes parmi 8, sans ordre.',
      questions: ['Combien de matchs faut-il organiser ?'],
      check: { value: 28, tolerance: 0, unit: 'matchs' },
      solution: ['$C_8^2 = \\dfrac{8 \\times 7}{2} = 28$ matchs.', 'Avec des matchs aller et retour, il en faudrait $A_8^2 = 56$.'],
    },
  ],
};
