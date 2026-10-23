import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Chaque être humain commence par la rencontre de deux cellules : un spermatozoïde, 300 fois plus petit qu’un grain de mil, et un ovule, à peine visible à l’œil nu. Comment ces cellules sont-elles fabriquées, où se rencontrent-elles, et comment l’œuf devient-il un bébé en neuf mois ?',
  objectives: [
    'décrire la formation des spermatozoïdes et des ovules ;',
    'situer la fécondation et décrire les premières étapes du développement ;',
    'expliquer le rôle du placenta ;',
    'calculer des dates importantes du cycle et de la grossesse.',
  ],
  sections: [
    {
      title: 'La formation des gamètes',
      blocks: [
        {
          kind: 'table',
          head: ['', 'Spermatogenèse (homme)', 'Ovogenèse (femme)'],
          rows: [
            ['lieu', 'tubes séminifères des testicules', 'follicules des ovaires'],
            ['période', 'en continu de la puberté à la vieillesse', 'commence avant la naissance ; un ovocyte libéré par cycle, de la puberté à la ménopause'],
            ['produit d’une cellule mère', '4 spermatozoïdes', '1 ovocyte (et des globules polaires qui dégénèrent)'],
            ['nombre de chromosomes', '$n = 23$ (22 + X ou 22 + Y)', '$n = 23$ (22 + X)'],
          ],
        },
        {
          kind: 'text',
          text: 'La division qui fabrique les gamètes est la **méiose** : elle divise par deux le nombre de chromosomes ($2n \\to n$). Ainsi, la fécondation reconstitue $2n = 46$.',
        },
      ],
    },
    {
      title: 'Fécondation et début de la grossesse',
      blocks: [
        {
          kind: 'list',
          items: [
            '**ovulation** : vers le 14ᵉ jour d’un cycle de 28 jours, l’ovocyte est expulsé de l’ovaire ;',
            '**fécondation** : dans le tiers supérieur de la trompe, un seul spermatozoïde entre dans l’ovocyte ; les deux noyaux s’unissent : c’est la **cellule-œuf** (zygote), à $2n = 46$ ;',
            '**segmentation** : l’œuf se divise par mitoses en descendant la trompe ;',
            '**nidation** : vers le 7ᵉ jour, l’embryon s’implante dans la muqueuse de l’utérus.',
          ],
        },
        {
          kind: 'rule',
          text: 'Le sexe de l’enfant est déterminé par le spermatozoïde : X donne une fille (XX), Y donne un garçon (XY).',
        },
        { kind: 'photo', id: 'fecondation' },
      ],
    },
    {
      title: 'Le placenta',
      blocks: [
        {
          kind: 'text',
          text: 'Le **placenta** relie l’embryon (puis le fœtus) à la mère par le cordon ombilical. Les sangs de la mère et du fœtus ne se mélangent pas, mais échangent à travers une fine barrière : dioxygène et nutriments vers le fœtus ; dioxyde de carbone et déchets vers la mère. Le placenta produit aussi des hormones qui maintiennent la grossesse.',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'Le placenta laisse aussi passer l’alcool, de nombreux médicaments et certains microbes (VIH, parasite du paludisme). Les consultations prénatales et la prévention du paludisme pendant la grossesse protègent la mère et l’enfant.',
            },
          ],
        },
        {
          kind: 'trap',
          wrong: '« Le fœtus respire par ses poumons dans le ventre de sa mère. »',
          why: 'Ses poumons sont remplis de liquide ; il reçoit son dioxygène par le placenta.',
          reflex: 'Avant la naissance, tous les échanges passent par le placenta.',
        },
      ],
    },
  ],
  essentials: [
    'Méiose : gamètes à $n = 23$ ; spermatogenèse continue (4 spermatozoïdes par cellule), ovogenèse cyclique (1 ovocyte).',
    'Ovulation vers J14 ; fécondation dans la trompe ; nidation vers le 7ᵉ jour.',
    'Le spermatozoïde (X ou Y) détermine le sexe.',
    'Placenta : échanges entre la mère et le fœtus sans mélange des sangs ; production d’hormones.',
  ],
  exercises: [
    {
      id: 'repro-gametes',
      level: 1,
      title: 'Compter les gamètes',
      statement: 'On compare la spermatogenèse et l’ovogenèse.',
      parts: [
        {
          label: 'Combien de spermatozoïdes donne une cellule qui entre en méiose ?',
          answer: { kind: 'number', value: 4, tolerance: 0, unit: '' },
          steps: ['Les deux divisions de la méiose donnent 4 cellules, qui deviennent toutes des spermatozoïdes.'],
        },
        {
          label: 'Combien de chromosomes possède la cellule-œuf ?',
          answer: { kind: 'number', value: 46, tolerance: 0, unit: '' },
          steps: ['$23 + 23 = 46$.'],
        },
      ],
    },
    {
      id: 'repro-dates',
      level: 2,
      title: 'Le calendrier du cycle',
      statement: 'Une femme a des cycles réguliers de 28 jours ; ses dernières règles ont commencé le 1ᵉʳ mars.',
      parts: [
        {
          label: 'À quel jour de mars a probablement lieu l’ovulation ?',
          answer: { kind: 'number', value: 14, tolerance: 0, unit: '' },
          steps: ['L’ovulation a lieu vers le 14ᵉ jour du cycle : vers le 14 mars.'],
        },
        {
          label: 'Une grossesse dure en moyenne 280 jours depuis le premier jour des dernières règles. Combien de semaines cela fait-il ?',
          answer: { kind: 'number', value: 40, tolerance: 0, unit: 'semaines' },
          steps: ['$280 / 7 = 40$ semaines d’aménorrhée, soit environ 38 semaines depuis la fécondation.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'La fécondation a lieu normalement :',
      choices: ['dans la trompe', 'dans l’utérus', 'dans l’ovaire', 'dans le vagin'],
      answer: 0,
      explanation: 'Dans le tiers supérieur de la trompe ; l’œuf descend ensuite vers l’utérus.',
    },
    {
      question: 'Le sexe de l’enfant dépend :',
      choices: ['du chromosome sexuel du spermatozoïde', 'de l’ovule', 'de l’alimentation de la mère', 'du jour de la fécondation'],
      answer: 0,
      explanation: 'L’ovule porte toujours un X ; le spermatozoïde porte X ou Y.',
    },
    {
      question: 'Les sangs de la mère et du fœtus :',
      choices: ['ne se mélangent pas', 'se mélangent dans le placenta', 'sont toujours du même groupe', 'circulent dans les mêmes vaisseaux'],
      answer: 0,
      explanation: 'Les échanges se font à travers la barrière placentaire.',
    },
    {
      question: 'La nidation a lieu environ :',
      choices: ['7 jours après la fécondation', '1 heure après', '3 mois après', 'le jour de l’ovulation'],
      answer: 0,
      explanation: 'Le temps que l’embryon descende la trompe et atteigne l’utérus.',
    },
  ],
  applications: [
    {
      title: 'La consultation prénatale',
      tagline: 'Calculer la date prévue de l’accouchement',
      situation:
        'À la maternité, la sage-femme calcule la date prévue de l’accouchement : 280 jours après le premier jour des dernières règles. Pour Mariam, ce premier jour était le 10 janvier.',
      model: 'Grossesse de durée moyenne ; un accouchement entre 37 et 41 semaines est normal.',
      questions: ['Combien de mois complets de 30 jours environ cela représente-t-il ?', 'Pourquoi conseille-t-on à Mariam de dormir sous une moustiquaire imprégnée ?'],
      check: { value: 9, tolerance: 0, unit: 'mois' },
      solution: [
        '280 jours font environ 9 mois et 10 jours : l’accouchement est prévu vers le 17 octobre.',
        'Le paludisme pendant la grossesse provoque une anémie chez la mère et peut atteindre le placenta : bébé de petit poids, accouchement prématuré.',
      ],
    },
  ],
};
