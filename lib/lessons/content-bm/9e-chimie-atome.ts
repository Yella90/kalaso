import type { Lesson } from '../types';

// Bamanankan — BROUILLON À FAIRE RELIRE. Les formules sont celles de la version française.
export const lesson: Lesson = {
  hook:
    'Sanu wulen juru dɔ tigɛ fila ye, o kɔ a tigɛ fila ye tugun, o cogo la. Yala i bɛ se ka a tigɛ fo abada wa ? Ayi : waati dɔ la, i bɛ se fɛn misɛnnin dɔ ma min tɛ se ka tigɛ k’a sɔrɔ a ma yɛlɛma fɛn wɛrɛ ye. O ye **atɔmu** ye. A ka dɔgɔ kosɛbɛ : misɛli kun kelen kɔnɔ, atɔmu miliyari miliyari caman bɛ yen.',
  objectives: [
    'atɔmu ɲɛfɔ : kisɛ (noyau) min ye pozitifu ye, ɛlɛkitɔrɔnw bɛ a lamini ;',
    'a ɲɛfɔ mun na atɔmu kuran bɛnnen don (neutre) ;',
    'atɔmu jateden $Z$ (numéro atomique) nafa sɔrɔ ;',
    'a ɲɛfɔ atɔmu bɛ kɛ iyɔn ye cogo min na.',
  ],
  sections: [
    {
      title: 'Atɔmu jaa',
      blocks: [
        {
          kind: 'definition',
          term: 'Atɔmu',
          text: 'fɛn misɛnnin kosɛbɛ, **kisɛ** (noyau) bɛ a cɛmancɛ la, **ɛlɛkitɔrɔnw** bɛ taama a lamini.',
        },
        {
          kind: 'text',
          text: 'Kisɛ bɛ kuran **pozitifu** ta. Ɛlɛkitɔrɔn kelen-kelen bɛɛ bɛ kuran **negatifu** ta. Kisɛ ni ɛlɛkitɔrɔnw cɛ, fɛn si tɛ yen fo lankolon.',
        },
        {
          kind: 'text',
          text: 'Kisɛ ka dɔgɔ kosɛbɛ atɔmu yɛrɛ ma : siɲɛ 100 000 ɲɔgɔn. Nka atɔmu girinya fanba bɛ kisɛ de kɔnɔ.',
        },
      ],
    },
    {
      title: 'Atɔmu jateden (numéro atomique)',
      blocks: [
        {
          kind: 'definition',
          term: 'Atɔmu jateden $Z$',
          text: 'kuran pozitifu hakɛ min bɛ kisɛ kɔnɔ. Ɛlɛman kelen-kelen bɛɛ n’a ta jateden don : idrozɛni $Z = 1$, karbɔni $Z = 6$, ɔkisizɛni $Z = 8$, sanu wulen $Z = 29$.',
        },
        {
          kind: 'rule',
          text: 'Atɔmu **kuran bɛnnen don** (neutre) : ɛlɛkitɔrɔn hakɛ min b’a la, o ni kisɛ ka kuran pozitifu hakɛ ye kelen ye, o kɔrɔ ɛlɛkitɔrɔn $Z$.',
        },
        {
          kind: 'example',
          title: 'ɔkisizɛni atɔmu',
          text: '$Z = 8$ : kisɛ bɛ kuran pozitifu 8 ta, ɛlɛkitɔrɔn 8 bɛ a lamini. $8 - 8 = 0$ : atɔmu kuran bɛnnen don.',
        },
      ],
    },
    {
      title: 'Iyɔnw',
      blocks: [
        {
          kind: 'definition',
          term: 'Iyɔn',
          text: 'atɔmu min ye ɛlɛkitɔrɔnw **bɔ** walima ka ɛlɛkitɔrɔnw **sɔrɔ**. A kuran tɛ bɛnnen tugun.',
        },
        {
          kind: 'table',
          head: ['Ni atɔmu…', 'A bɛ kɛ…', 'Misali'],
          rows: [
            ['ye ɛlɛkitɔrɔnw bɔ', 'iyɔn **pozitifu** ye (kasiyɔn)', '$\\ce{Cu^{2+}}$ : sanu wulen ye ɛlɛkitɔrɔn 2 bɔ'],
            ['ye ɛlɛkitɔrɔnw sɔrɔ', 'iyɔn **negatifu** ye (aniyɔn)', '$\\ce{Cl-}$ : kilɔri ye ɛlɛkitɔrɔn 1 sɔrɔ'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Iyɔn pozitifu ye kuran pozitifuw sɔrɔ. »',
          why: 'Kisɛ tɛ yɛlɛma. A ye ɛlɛkitɔrɔnw (negatifu) **bɔ**, o de kosɔn iyɔn bɛ kɛ pozitifu ye.',
          reflex: 'Iyɔn $+$ = ɛlɛkitɔrɔn bɔlenw. Iyɔn $-$ = ɛlɛkitɔrɔn sɔrɔlenw.',
        },
      ],
    },
  ],
  essentials: [
    'Atɔmu = kisɛ pozitifu, ɛlɛkitɔrɔn negatifuw b’a lamini.',
    'Atɔmu jateden $Z$ = kisɛ ka kuran pozitifu hakɛ.',
    'Atɔmu kuran bɛnnen bɛ ɛlɛkitɔrɔn $Z$ ta.',
    'Iyɔn pozitifu ye ɛlɛkitɔrɔnw bɔ ; iyɔn negatifu ye ɛlɛkitɔrɔnw sɔrɔ.',
  ],
  simulationTasks: [
    'ɔkisizɛni atɔmu dilan ($Z = 8$) ka a lajɛ ko a kuran bɛnnen don ;',
    'ɛlɛkitɔrɔn 2 bɔ maɲeziyɔmu atɔmu la ($Z = 12$) : iyɔn jumɛn bɛ sɔrɔ ?',
  ],
  exercises: [
    {
      id: 'neutralite',
      level: 1,
      statement: 'Aliminiyɔmu atɔmu kisɛ bɛ kuran pozitifu 13 ta.',
      questions: ['Aliminiyɔmu ka atɔmu jateden ye joli ye ?', 'Ɛlɛkitɔrɔn joli bɛ atɔmu la ? Mun na ?'],
      solution: ['$Z = 13$.', 'Ɛlɛkitɔrɔn 13, katuguni atɔmu kuran bɛnnen don.'],
    },
    {
      id: 'ion-cuivre',
      level: 1,
      statement: 'Sanu wulen iyɔn sɛbɛncogo ye $\\ce{Cu^{2+}}$ ye. Sanu wulen ka atɔmu jateden ye 29 ye.',
      questions: ['Atɔmu ye ɛlɛkitɔrɔnw bɔ wa, walima a ye u sɔrɔ ? Joli ?', 'Ɛlɛkitɔrɔn joli bɛ iyɔn la ?'],
      solution: ['Kuran $2+$ : a ye ɛlɛkitɔrɔn 2 bɔ.', '$29 - 2 = 27$ ɛlɛkitɔrɔn.'],
    },
    {
      id: 'ion-inconnu',
      level: 2,
      statement: 'Iyɔn dɔ bɛ ɛlɛkitɔrɔn 10 ta, a kisɛ bɛ kuran pozitifu 8 ta.',
      questions: ['Ɛlɛman ye jumɛn ye ?', 'Iyɔn ka kuran ye joli ye ? A sɛbɛncogo sɛbɛn.'],
      hints: ['Atɔmu jateden bɛ kalan kisɛ de kan, a tɛ kalan ɛlɛkitɔrɔnw kan.'],
      solution: ['$Z = 8$ : ɔkisizɛni don.', 'Ɛlɛkitɔrɔn 2 bɛ a la ka tɛmɛ kuran pozitifuw kan : kuran $2-$, sɛbɛncogo $\\ce{O^{2-}}$.'],
    },
  ],
  quiz: [
    {
      question: 'Atɔmu kisɛ bɛ kuran jumɛn ta ?',
      choices: ['pozitifu', 'negatifu', 'kuran si t’a la'],
      answer: 0,
      explanation: 'Kisɛ ye pozitifu ye, ɛlɛkitɔrɔnw ye negatifu ye.',
    },
    {
      question: 'Karbɔni atɔmu ($Z = 6$) bɛ :',
      choices: ['ɛlɛkitɔrɔn 3 ta', 'ɛlɛkitɔrɔn 6 ta', 'ɛlɛkitɔrɔn 12 ta'],
      answer: 1,
      explanation: 'Atɔmu kuran bɛnnen bɛ ɛlɛkitɔrɔn $Z$ ta.',
    },
    {
      question: 'Iyɔn $\\ce{Na+}$ dilanna :',
      choices: ['ɛlɛkitɔrɔn kelen sɔrɔli fɛ', 'ɛlɛkitɔrɔn kelen bɔli fɛ', 'kuran pozitifu kelen sɔrɔli fɛ'],
      answer: 1,
      explanation: 'Ni ɛlɛkitɔrɔn kelen (negatifu) bɔra, iyɔn bɛ kɛ pozitifu ye.',
    },
    {
      question: 'Atɔmu girinya fanba bɛ :',
      choices: ['a ka ɛlɛkitɔrɔnw na', 'a kisɛ kɔnɔ', 'lankolon kɔnɔ kisɛ lamini'],
      answer: 1,
      explanation: 'Ɛlɛkitɔrɔnw ka fɔɔn kosɛbɛ ; girinya fanba bɛ kisɛ kɔnɔ.',
    },
  ],
  applications: [
    {
      title: 'So kɔnɔ kuran juru',
      situation:
        'So kɔnɔ kuran juruw dilannen don ni sanu wulen ye. Ni sanu wulen tora fiɲɛ sumalen kɔnɔ waati jan, binkɛnɛ dɔ bɛ a kunna : vɛri-de-gri. Iyɔn $\\ce{Cu^{2+}}$ bɛ o kɔnɔ.',
      questions: [
        'Sanu wulen atɔmu ($Z = 29$) bɛ ɛlɛkitɔrɔn joli ta ?',
        'Iyɔn $\\ce{Cu^{2+}}$ bɛ ɛlɛkitɔrɔn joli ta ?',
        'Kisɛ yɛlɛmana atɔmu ni iyɔn cɛ wa ?',
      ],
      solution: ['Ɛlɛkitɔrɔn 29.', 'Ɛlɛkitɔrɔn 27 : a ye 2 bɔ.', 'Ayi : a bɛ kuran pozitifu 29 ta tuma bɛɛ. A ye sanu wulen ye hali bi.'],
    },
  ],
};
