import type { Lesson } from '../types';

// Bamanankan — BROUILLON À FAIRE RELIRE. Les formules sont celles de la version française.
export const lesson: Lesson = {
  hook:
    'Sugu la, malo kisɛw tɛ jate kelen kelen : u bɛ feere kilo la. Shɛfanw bɛ feere plato la, alimɛtiw bɛ feere bwatiw la. Simi dɔnnikɛlaw ka gɛlɛya ye o kelen ye ni atɔmuw ye, nka a ka bon kosɛbɛ : ji minni kelen dɔrɔn (18 g) kɔnɔ, molekili $6 \\times 10^{23}$ ɲɔgɔn bɛ yen. Ni i tun bɛ molekili kelen jate segɔn kelen kɔnɔ, a tun bɛna san miliyɔn miliyari 20 ɲɔgɔn ta. O la, « pake » kɛrɛnkɛrɛnnen dɔ ka kan u ma : **mɔli**.',
  objectives: [
    'mɔli ɲɛfɔ ka Avogadoro ka kɔnsitanti nafa sɔrɔ ;',
    'atɔmu ni molekili ka mɔli girinya jate ;',
    'ka bɔ girinya la ka taa fɛn hakɛ la, ani a kɔfɛ, ni $n = \\dfrac{m}{M}$ ye ;',
    'atɔmu walima molekili hakɛ jate ka bɔ girinya dɔ la.',
  ],
  sections: [
    {
      title: 'Mɔli, fɛnw pake',
      blocks: [
        {
          kind: 'definition',
          term: 'Mɔli (mol)',
          text: '**fɛn hakɛ** sumanikɛlan. Mɔli kelen bɛ fɛn bɔɲɔgɔnnaw (atɔmuw, molekiliw walima iyɔnw) $6{,}022\\,140\\,76 \\times 10^{23}$ ta tigitigi.',
        },
        {
          kind: 'formula',
          tex: 'n = \\dfrac{N}{N_A} \\qquad N_A = 6{,}02 \\times 10^{23}\\ \\text{mol}^{-1}',
          legend: ['$n$ : fɛn hakɛ, mɔli la', '$N$ : fɛnw hakɛ (sumanikɛlan t’a la)', '$N_A$ : Avogadoro ka kɔnsitanti'],
        },
        {
          kind: 'example',
          title: 'nɛgɛ atɔmuw jatebɔ',
          text: 'Pɔnti kelen bɛ nɛgɛ atɔmu $1{,}2 \\times 10^{23}$ ta.',
          steps: ['$n = \\dfrac{1{,}2 \\times 10^{23}}{6{,}02 \\times 10^{23}} \\approx 0{,}20$ mol.'],
        },
      ],
    },
    {
      title: 'Mɔli girinya',
      blocks: [
        {
          kind: 'definition',
          term: 'Atɔmu ka mɔli girinya $M$',
          text: 'ɛlɛman dɔ ka atɔmu mɔli kelen girinya, g/mol la. A sɛbɛnnen bɛ ɛlɛmanw tabulo kɔnɔ.',
        },
        {
          kind: 'table',
          head: ['Ɛlɛman', 'H', 'C', 'N', 'O', 'Na', 'Mg', 'Al', 'S', 'Cl', 'Ca', 'Fe', 'Cu'],
          rows: [['$M$ (g/mol)', '1', '12', '14', '16', '23', '24', '27', '32', '35,5', '40', '56', '63,5']],
        },
        {
          kind: 'definition',
          term: 'Molekili ka mɔli girinya',
          text: 'molekili mɔli kelen girinya. O ye sɛbɛncogo kɔnɔ atɔmuw bɛɛ ka mɔli girinyaw faralen ye.',
        },
        {
          kind: 'example',
          title: 'mɔli girinya dɔw',
          text: 'Atɔmu kelen-kelen bɛɛ ka mɔli girinya sigi a hakɛ la, o kɔ u fara ɲɔgɔn kan.',
          steps: [
            '$M(\\ce{H2O}) = 2 \\times 1 + 16 = 18$ g/mol',
            '$M(\\ce{CO2}) = 12 + 2 \\times 16 = 44$ g/mol',
            '$M(\\ce{NaCl}) = 23 + 35{,}5 = 58{,}5$ g/mol',
            '$M(\\ce{C12H22O11}) = 12 \\times 12 + 22 \\times 1 + 11 \\times 16 = 342$ g/mol (sukaro)',
          ],
        },
        {
          kind: 'trap',
          wrong: '« $M(\\ce{Ca3(PO4)2}) = 3 \\times 40 + 31 + 4 \\times 16 = 215$ g/mol. »',
          why: 'Jateden 2 min bɛ parantezi kɔfɛ, o bɛ kulu $\\ce{PO4}$ **bɛɛ** sigi : fosifɔri atɔmu 2 ani ɔkisizɛni atɔmu 8 bɛ yen.',
          reflex: 'Fɔlɔ sɛbɛncogo labonya : $\\ce{Ca3(PO4)2}$ = Ca 3, P 2, O 8. O la $M = 120 + 62 + 128 = 310$ g/mol.',
        },
      ],
    },
    {
      title: 'Ka bɔ girinya la ka taa fɛn hakɛ la',
      blocks: [
        {
          kind: 'formula',
          tex: 'n = \\dfrac{m}{M} \\qquad \\Longleftrightarrow \\qquad m = n \\times M',
          legend: ['$m$ : fɛn dɔɔnin girinya, garamu (g) la', '$M$ : mɔli girinya, g/mol la', '$n$ : fɛn hakɛ, mɔli la'],
        },
        {
          kind: 'example',
          title: 'ji wɛrɛ kelen',
          text: 'Wɛrɛ kelen bɛ ji garamu 180 ta.',
          steps: ['$n = \\dfrac{180}{18} = 10$ mol ji molekiliw.', '$N = n \\times N_A = 10 \\times 6{,}02 \\times 10^{23} = 6{,}02 \\times 10^{24}$ molekili.'],
        },
        {
          kind: 'rule',
          text: 'Jatebɔ o jatebɔ, sumanikɛlanw lajɛ : girinya **garamu** la, mɔli girinya **g/mol** la, jaabi **mɔli** la.',
        },
        {
          kind: 'trap',
          wrong: '« Sukaro kilo 1, o ye $n = \\dfrac{1}{342}$ mol ye. »',
          why: 'Mɔli girinya ye g/mol ye : girinya ka kan ka kɛ garamu ye, a tɛ kilo ye.',
          reflex: 'A yɛlɛma fɔlɔ : 1 kg = 1 000 g, o la $n = \\dfrac{1000}{342} \\approx 2{,}92$ mol.',
        },
      ],
    },
    {
      title: 'A ni atɔmu girinya cɛ',
      blocks: [
        {
          kind: 'text',
          text: 'Mɔli kelen girinya ye atɔmu kelen girinya ye, min sigilen bɛ atɔmu hakɛ la min bɛ mɔli kelen kɔnɔ :',
        },
        {
          kind: 'formula',
          tex: 'M = N_A \\times m_{\\text{atome}}',
        },
        {
          kind: 'example',
          title: 'a lajɛ ni sodiyɔmu ye',
          text: 'Atɔmu sapitiri kɔnɔ, an ye $m(\\ce{Na}) \\approx 3{,}84 \\times 10^{-23}$ g sɔrɔ.',
          steps: ['$M = 6{,}02 \\times 10^{23} \\times 3{,}84 \\times 10^{-23} \\approx 23{,}1$ g/mol : o ye tabulo ka valɛri yɛrɛ ye.'],
        },
      ],
    },
  ],
  essentials: [
    'Mɔli ye fɛn hakɛ sumanikɛlan ye : mɔli 1 = fɛn $6{,}02 \\times 10^{23}$.',
    '$n = \\dfrac{N}{N_A}$, ni $N_A = 6{,}02 \\times 10^{23}$ mol⁻¹.',
    'Mɔli girinya $M$ ye mɔli kelen girinya ye, g/mol la.',
    'Molekili ka mɔli girinya : a ka atɔmuw ka mɔli girinyaw faralen (parantezi lajɛ).',
    '$n = \\dfrac{m}{M}$ ani $m = n \\times M$, ni $m$ ye garamu ye.',
    '$M = N_A \\times m_{\\text{atome}}$.',
  ],
  exercises: [
    {
      id: 'masses-molaires',
      level: 1,
      statement: 'Nin fɛnw ka mɔli girinya jate :',
      questions: ['amonyaki $\\ce{NH3}$', 'asidi sulfiriki $\\ce{H2SO4}$', 'kalisiyɔmu karibɔnati $\\ce{CaCO3}$', 'aliminiyɔmu sulfati $\\ce{Al2(SO4)3}$'],
      solution: [
        '$14 + 3 \\times 1 = 17$ g/mol.',
        '$2 \\times 1 + 32 + 4 \\times 16 = 98$ g/mol.',
        '$40 + 12 + 3 \\times 16 = 100$ g/mol.',
        '$2 \\times 27 + 3 \\times (32 + 4 \\times 16) = 54 + 288 = 342$ g/mol.',
      ],
    },
    {
      id: 'masse-vers-n',
      level: 1,
      statement: 'Fɛn hakɛ min bɛ nin kɔnɔ, o jate :',
      questions: ['nɛgɛ garamu 5,6', 'karbɔni diyɔkisidi garamu 4,4', 'kalisiyɔmu karibɔnati garamu 100'],
      solution: ['$n = \\dfrac{5{,}6}{56} = 0{,}10$ mol.', '$n = \\dfrac{4{,}4}{44} = 0{,}10$ mol.', '$n = \\dfrac{100}{100} = 1{,}0$ mol.'],
    },
    {
      id: 'n-vers-masse',
      level: 1,
      statement: 'Girinya joli ka kan ka suman walasa ka nin sɔrɔ :',
      questions: ['sodiyɔmu kilorir mɔli 0,25 ?', 'ji mɔli 2,0 ?'],
      solution: ['$m = 0{,}25 \\times 58{,}5 \\approx 14{,}6$ g.', '$m = 2{,}0 \\times 18 = 36$ g.'],
    },
    {
      id: 'litre-eau',
      level: 2,
      statement: 'Ji litiri kelen girinya ye garamu 1 000 ye.',
      questions: ['Ji hakɛ joli bɛ a kɔnɔ mɔli la ?', 'Ji molekili joli bɛ a kɔnɔ ?', 'Idrozɛni atɔmu joli ?'],
      solution: [
        '$n = \\dfrac{1000}{18} \\approx 55{,}6$ mol.',
        '$N = 55{,}6 \\times 6{,}02 \\times 10^{23} \\approx 3{,}34 \\times 10^{25}$ molekili.',
        'Molekili kelen-kelen bɛɛ bɛ atɔmu H 2 ta : idrozɛni atɔmu $6{,}69 \\times 10^{25}$.',
      ],
    },
    {
      id: 'comparer-metaux',
      level: 2,
      statement: 'Aliminiyɔmu garamu 10 ani sanu wulen garamu 10 bɛ an bolo.',
      questions: ['Jumɛn bɛ atɔmu caman ta ka tɛmɛ tɔ kan ?', 'Siɲɛ joli ?'],
      hints: ['Girinya kelen kɔrɔ tɛ ko atɔmu hakɛ ye kelen ye : fɛn hakɛw sanga ɲɔgɔn ma.'],
      solution: [
        '$n(\\ce{Al}) = \\dfrac{10}{27} \\approx 0{,}370$ mol ; $n(\\ce{Cu}) = \\dfrac{10}{63{,}5} \\approx 0{,}157$ mol. Aliminiyɔmu de bɛ atɔmu caman ta.',
        '$\\dfrac{0{,}370}{0{,}157} \\approx 2{,}4$ : siɲɛ 2,4 ɲɔgɔn, katuguni aliminiyɔmu atɔmu ka fɔɔn ni sanu wulen atɔmu ye.',
      ],
    },
    {
      id: 'bague-or',
      level: 3,
      statement:
        'Atɔmu sapitiri kɔnɔ, an ye sanu bolokɔnɔnin garamu 4 ka atɔmuw jate ka bɔ atɔmu kelen girinya la. An bɛ o jatebɔ kɛ kokura ni mɔli ye. $M(\\ce{Au}) = 197$ g/mol.',
      questions: [
        'Sanu hakɛ min bɛ bolokɔnɔnin kɔnɔ, o jate.',
        'O la, sanu atɔmu hakɛ dɔn.',
        'A sanga atɔmu sapitiri ka jaabi ma (atɔmu $1{,}2 \\times 10^{22}$). Laban kuma fɔ.',
      ],
      solution: [
        '$n = \\dfrac{4}{197} \\approx 2{,}03 \\times 10^{-2}$ mol.',
        '$N = 2{,}03 \\times 10^{-2} \\times 6{,}02 \\times 10^{23} \\approx 1{,}22 \\times 10^{22}$ atɔmu.',
        'An bɛ jaabi kelen sɔrɔ : fɛɛrɛ fila bɛ bɛn, katuguni $M = N_A \\times m_{\\text{atome}}$.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Mɔli kelen bɛ :',
      choices: ['fɛn $6{,}02 \\times 10^{23}$ ta', 'fɛn 1 000 ta', 'fɛn $6{,}02 \\times 10^{-23}$ ta', 'fɛn hakɛ min ni a girinya ye kelen ye garamu la'],
      answer: 0,
      explanation: 'O ye Avogadoro ka kɔnsitanti ye, $N_A = 6{,}02 \\times 10^{23}$ mol⁻¹.',
    },
    {
      question: '$\\ce{CO2}$ ka mɔli girinya ye :',
      choices: ['28 g/mol', '32 g/mol', '44 g/mol', '60 g/mol'],
      answer: 2,
      explanation: '$12 + 2 \\times 16 = 44$ g/mol.',
    },
    {
      question: 'Fɛn hakɛ joli bɛ ji garamu 36 kɔnɔ ?',
      choices: ['0,5 mol', '1 mol', '2 mol', '36 mol'],
      answer: 2,
      explanation: '$n = \\dfrac{36}{18} = 2$ mol.',
    },
    {
      question: '$\\ce{NaCl}$ mɔli 0,5 girinya ye joli ye ?',
      choices: ['29,25 g', '58,5 g', '117 g', '0,5 g'],
      answer: 0,
      explanation: '$m = 0{,}5 \\times 58{,}5 = 29{,}25$ g.',
    },
    {
      question: '$\\ce{Al2(SO4)3}$ kɔnɔ, ɔkisizɛni atɔmu joli bɛ yen ?',
      choices: ['4', '7', '12', '3'],
      answer: 2,
      explanation: '3 bɛ kulu $\\ce{SO4}$ bɛɛ sigi : ɔkisizɛni atɔmu $3 \\times 4 = 12$.',
    },
    {
      question: 'Nɛgɛ garamu 10 ani sufiri garamu 10 bɛ :',
      choices: ['atɔmu hakɛ kelen ta', 'nɛgɛ atɔmu caman ta', 'sufiri atɔmu caman ta', 'an tɛ se k’a dɔn'],
      answer: 2,
      explanation: '$M(\\ce{S}) = 32 < M(\\ce{Fe}) = 56$ : ni girinya ye kelen ye, sufiri atɔmuw ka ca.',
    },
  ],
  applications: [
    {
      title: 'Te sukaro',
      situation:
        'Te labɛnni na, sukaro kurun 2 bɛ bila wɛrɛ 3 kelen-kelen bɛɛ kɔnɔ. Sukaro kurun kelen girinya ye garamu 5 ye. Sukaro ye sakarozi ye, $\\ce{C12H22O11}$ ($M = 342$ g/mol).',
      questions: [
        'Sakarozi hakɛ joli bɛ sukaro kurun kelen kɔnɔ ?',
        'Sakarozi molekili joli bɛ sukaro kurun kelen kɔnɔ ?',
        'Sukaro hakɛ joli bɛ baara kɛ wɛrɛ 3 kama ?',
      ],
      solution: [
        '$n = \\dfrac{5}{342} \\approx 1{,}46 \\times 10^{-2}$ mol.',
        '$N = 1{,}46 \\times 10^{-2} \\times 6{,}02 \\times 10^{23} \\approx 8{,}8 \\times 10^{21}$ molekili.',
        'Kurun 6, o ye garamu 30 ye : $n = \\dfrac{30}{342} \\approx 8{,}8 \\times 10^{-2}$ mol.',
      ],
    },
    {
      title: 'Ofisi di Nizɛri malo forow ka ire',
      situation:
        'Malo sɛnɛbagaw bɛ ire (urée) jɛnsɛn, azɔti nɔgɔ dɔ min sɛbɛncogo ye $\\ce{CO(NH2)2}$ ye. A bɛ feere bɔrɛ kilo 50 la. $M(\\ce{C}) = 12$, $M(\\ce{O}) = 16$, $M(\\ce{N}) = 14$ ani $M(\\ce{H}) = 1$ g/mol.',
      questions: [
        'Ire ka mɔli girinya jate.',
        'Ire hakɛ joli bɛ bɔrɛ kelen kɔnɔ ?',
        'Ire molekili kelen bɛ azɔti atɔmu 2 ta. Bɔrɛ kelen bɛ azɔti girinya joli di foro ma ?',
        'Azɔti ye ire girinya kɛmɛ o kɛmɛ joli ye (pourcentage) ?',
      ],
      solution: [
        '$M = 12 + 16 + 2 \\times (14 + 2 \\times 1) = 60$ g/mol.',
        '$n = \\dfrac{50\\,000}{60} \\approx 833$ mol.',
        '$n(\\ce{N}) = 2 \\times 833 = 1\\,667$ mol ; $m(\\ce{N}) = 1\\,667 \\times 14 \\approx 23\\,300$ g, o ye kilo 23,3 ɲɔgɔn ye.',
        '$\\dfrac{2 \\times 14}{60} \\approx 0{,}467$, o ye azɔti 46,7 % ye : o de kosɔn ire ye nɔgɔ barikama ye.',
      ],
    },
  ],
};
