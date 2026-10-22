import type { Lesson } from '../types';

// Bamanankan — BROUILLON À FAIRE RELIRE. Les formules sont celles de la version française.
export const lesson: Lesson = {
  hook:
    'Kuran juruw ka sanu wulen, sanu min bɔ Sadiola, ɔkisizɛni min bɛ i ninakili la : fɛn bɛɛ dilannen don ni atɔmuw ye. Atɔmu ka dɔgɔ kosɛbɛ fo u **miliyɔn 10** ɲɔgɔn ka kan ka bila ɲɔgɔn kɛrɛfɛ walasa ka **milimɛtɛrɛ 1** fa. Mɔgɔ bɛ se ka a dɔn cogo di min bɛ u kɔnɔ ?',
  objectives: [
    'atɔmu ɲɛfɔ : kisɛ (prɔtɔnw ni nɛtrɔnw), ɛlɛkitɔrɔnw b’a lamini ;',
    'sɛbɛncogo $\\ce{^{A}_{Z}X}$ kalan ka a sɛbɛn, ka partikili kelen-kelen bɛɛ hakɛ dɔn ;',
    'a ɲɛfɔ mun na atɔmu kuran bɛnnen don ani iyɔn ye mun ye ;',
    'izotɔpuw dɔn ;',
    'atɔmu girinya jate ;',
    'ɛlɛkitɔrɔnw tila kuci K, L, M kan.',
  ],
  sections: [
    {
      title: 'Kisɛ misɛnnin ni ɛlɛkitɔrɔnw',
      blocks: [
        {
          kind: 'definition',
          term: 'Atɔmu',
          text: 'ɛlɛman dɔ ka yɔrɔ misɛnman bɛɛ. **Kisɛ** (noyau) bɛ a cɛmancɛ la, **ɛlɛkitɔrɔnw** bɛ taama o kisɛ lamini.',
        },
        {
          kind: 'text',
          text: 'Kisɛ ka dɔgɔ ni atɔmu ye siɲɛ **100 000** ɲɔgɔn : kisɛ diyamɛtiri ye $10^{-15}$ m ɲɔgɔn ye, atɔmu ta ye $10^{-10}$ m ɲɔgɔn ye. Ni kisɛ tun bonya ye ɲɔ kisɛ kelen ye (1 mm) min bilalen bɛ ntolatan foro cɛmancɛ la, ɛlɛkitɔrɔnw tun bɛna kɛ mɛtɛrɛ 50 ɲɔgɔn na a la, bi yɔrɔw la. U cɛ, fɛn si tɛ yen fo lankolon : o kɔrɔ ko fɛnw dilannen don ni lankolon caman ye.',
        },
        {
          kind: 'definition',
          term: 'Kisɛ (noyau)',
          text: 'atɔmu cɛmancɛ yɔrɔ, dilannen ni **prɔtɔnw** (pozitifu) ni **nɛtrɔnw** (kuran t’u la) ye. Prɔtɔnw ni nɛtrɔnw bɛ wele **nikleyɔnw**.',
        },
      ],
    },
    {
      title: 'Atɔmu ka partikili sabaw',
      blocks: [
        {
          kind: 'table',
          head: ['Partikili', 'A bɛ min ?', 'Kuran', 'Girinya'],
          rows: [
            ['Prɔtɔn', 'kisɛ kɔnɔ', '$+e$', '$m_p = 1{,}673 \\times 10^{-27}$ kg'],
            ['Nɛtrɔn', 'kisɛ kɔnɔ', '$0$', '$m_n = 1{,}675 \\times 10^{-27}$ kg'],
            ['Ɛlɛkitɔrɔn', 'kisɛ lamini', '$-e$', '$m_e = 9{,}1 \\times 10^{-31}$ kg'],
          ],
        },
        {
          kind: 'formula',
          tex: 'e = 1{,}6 \\times 10^{-19}\\ \\text{C}',
          legend: ['$e$ : kuran misɛnman bɛɛ (charge élémentaire), kulɔmu (C) la.'],
        },
        {
          kind: 'text',
          text: 'Prɔtɔn ka girin ni ɛlɛkitɔrɔn ye siɲɛ **1 836** ɲɔgɔn. O la, atɔmu girinya fanba bɛ kisɛ kɔnɔ.',
        },
      ],
    },
    {
      title: 'Atɔmu jateden Z ni girinya jateden A',
      blocks: [
        {
          kind: 'definition',
          term: 'Atɔmu jateden $Z$',
          text: 'prɔtɔn hakɛ min bɛ kisɛ kɔnɔ. O de bɛ ɛlɛman jira : sodiyɔmu atɔmuw bɛɛ bɛ prɔtɔn 11 ta, atɔmu o atɔmu bɛ prɔtɔn 11 ta, o ye sodiyɔmu ye.',
        },
        {
          kind: 'definition',
          term: 'Girinya jateden $A$',
          text: 'nikleyɔn hakɛ min bɛ kisɛ kɔnɔ (prɔtɔnw + nɛtrɔnw).',
        },
        {
          kind: 'formula',
          tex: '\\ce{^{A}_{Z}X} \\qquad N = A - Z',
          legend: ['$X$ : ɛlɛman taamasiyɛn', '$N$ : nɛtrɔn hakɛ'],
        },
        {
          kind: 'example',
          title: 'sodiyɔmu atɔmu $\\ce{^{23}_{11}Na}$',
          text: 'An bɛ $Z = 11$ ani $A = 23$ kalan.',
          steps: [
            'Prɔtɔnw : $Z = 11$.',
            'Nɛtrɔnw : $N = A - Z = 23 - 11 = 12$.',
            'Ɛlɛkitɔrɔnw : atɔmu kuran bɛnnen don, ɛlɛkitɔrɔn hakɛ ni prɔtɔn hakɛ ye kelen ye, o ye 11 ye.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« $A$ ye atɔmu ka partikili bɛɛ hakɛ ye. »',
          why: '$A$ bɛ **kisɛ** kɔnɔ partikiliw dɔrɔn de jate. Ɛlɛkitɔrɔnw tɛ jate $A$ kɔnɔ.',
          reflex: '$A$ = prɔtɔnw + nɛtrɔnw. Ɛlɛkitɔrɔnw bɛ dɔn $Z$ ni kuran de fɛ.',
        },
      ],
    },
    {
      title: 'Atɔmu kuran bɛnnen ni iyɔnw',
      blocks: [
        {
          kind: 'rule',
          text: 'Atɔmu **kuran bɛnnen don** (neutre) : ɛlɛkitɔrɔn hakɛ ni prɔtɔn hakɛ ye kelen ye, o ye ɛlɛkitɔrɔn $Z$ ye. Kisɛ ka kuran ($+Ze$) bɛ ɛlɛkitɔrɔnw ta ($-Ze$) dafa ka ɲɛ.',
        },
        {
          kind: 'definition',
          term: 'Iyɔn',
          text: 'atɔmu (walima atɔmu kulu) min ye ɛlɛkitɔrɔn kelen walima caman **bɔ** walima ka u **sɔrɔ**. Iyɔn pozitifu ye **kasiyɔn** ye, iyɔn negatifu ye **aniyɔn** ye.',
        },
        {
          kind: 'example',
          title: 'tobili kɔgɔ',
          text: 'Kɔgɔ dilannen don ni iyɔn sodiyɔmu $\\ce{Na+}$ ni iyɔn kilorir $\\ce{Cl-}$ ye.',
          steps: [
            '$\\ce{Na+}$ : prɔtɔn 11 ni ɛlɛkitɔrɔn 10 ; sodiyɔmu atɔmu ye ɛlɛkitɔrɔn kelen **bɔ**.',
            '$\\ce{Cl-}$ : prɔtɔn 17 ni ɛlɛkitɔrɔn 18 ; kilɔri atɔmu ye ɛlɛkitɔrɔn kelen **sɔrɔ**.',
          ],
        },
        {
          kind: 'trap',
          wrong: '« Iyɔn $\\ce{Na+}$ ye prɔtɔn kelen sɔrɔ. »',
          why: 'Kisɛ tɛ yɛlɛma simi reaksiyɔn kɔnɔ abada. Ni prɔtɔn hakɛ yɛlɛmana, a tɛna kɛ sodiyɔmu ye tugun.',
          reflex: 'Iyɔn bɛ dilan tuma bɛɛ **ɛlɛkitɔrɔnw bɔli walima u sɔrɔli** fɛ. Kuran $+$ : ɛlɛkitɔrɔnw bɔra ; kuran $-$ : ɛlɛkitɔrɔnw sɔrɔla.',
        },
      ],
    },
    {
      title: 'Izotɔpuw',
      blocks: [
        {
          kind: 'definition',
          term: 'Izotɔpuw',
          text: 'atɔmu minnu ka **atɔmu jateden** $Z$ ye kelen ye nka u ka **girinya jateden** $A$ tɛ kelen ye. Prɔtɔn hakɛ ye kelen ye, nka nɛtrɔn hakɛ tɛ kelen ye.',
        },
        {
          kind: 'example',
          title: 'karbɔni',
          text: 'Karbɔni ka cogoya caman ye $\\ce{^{12}_{6}C}$ ye (nɛtrɔn 6), nka $\\ce{^{13}_{6}C}$ (nɛtrɔn 7) ni $\\ce{^{14}_{6}C}$ (nɛtrɔn 8) fana bɛ yen. Karbɔni 14 ye radiyoaktifu ye : o de bɛ kɔrɔfɛn minnu sɔrɔla Jenne-Jenno, olu waati dɔn.',
        },
        {
          kind: 'example',
          title: 'mun na kilɔri ka mɔli girinya ye 35,5 ye',
          text: 'Kilɔri naturɛli kɔnɔ, $\\ce{^{35}Cl}$ ye 75 % ye ani $\\ce{^{37}Cl}$ ye 25 % ye. Cɛmancɛ ye :',
          steps: ['$0{,}75 \\times 35 + 0{,}25 \\times 37 = 26{,}25 + 9{,}25 = 35{,}5$'],
        },
      ],
    },
    {
      title: 'Atɔmu girinya',
      blocks: [
        {
          kind: 'text',
          text: 'Ɛlɛkitɔrɔnw girinya tɛ foyi ye kisɛ ta kɛrɛfɛ, prɔtɔn ni nɛtrɔn girinya fana bɛ ɲɔgɔn bɔ. O la an b’a fɔ :',
        },
        {
          kind: 'formula',
          tex: 'm_{\\text{atome}} \\approx A \\times m_{\\text{nucléon}} \\qquad m_{\\text{nucléon}} \\approx 1{,}67 \\times 10^{-27}\\ \\text{kg}',
        },
        {
          kind: 'example',
          title: 'aliminiyɔmu atɔmu $\\ce{^{27}_{13}Al}$',
          text: '$m \\approx 27 \\times 1{,}67 \\times 10^{-27} = 4{,}51 \\times 10^{-26}$ kg.',
        },
      ],
    },
    {
      title: 'Ɛlɛkitɔrɔnw bɛ sigi kuciw kan',
      blocks: [
        {
          kind: 'text',
          text: 'Ɛlɛkitɔrɔnw bɛ tila **kuciw** kan, minnu tɔgɔ ye K, L, M, N… ye, ka bɔ kisɛ gɛrɛfɛ ka taa yɔrɔjan. Kuci kelen-kelen bɛɛ ka ɛlɛkitɔrɔn hakɛ dan bɛ yen.',
        },
        {
          kind: 'table',
          head: ['Kuci', 'K', 'L', 'M'],
          rows: [['Ɛlɛkitɔrɔn hakɛ belebele', '2', '8', '18 (8 ɛlɛman 20 fɔlɔw ma)']],
        },
        {
          kind: 'rule',
          text: 'Kuciw bɛ fa K fɔlɔ, o kɔ L, o kɔ M : i tɛ tɛmɛ kuci nata ma ni kuci tɛmɛnen ma fa. Kuci laban min bɛ ɛlɛkitɔrɔnw ta, o ye **kuci kɔkan** ye ; a ka ɛlɛkitɔrɔnw ye **valansi ɛlɛkitɔrɔnw** ye.',
        },
        {
          kind: 'example',
          title: 'kilɔri atɔmu ($Z = 17$)',
          text: 'Ɛlɛkitɔrɔn 17 ka kan ka bila : 2 K kan, 8 L kan, 7 bɛ to M kan. An bɛ a sɛbɛn $(K)^2(L)^8(M)^7$ : kilɔri bɛ **valansi ɛlɛkitɔrɔn 7** ta.',
        },
        {
          kind: 'trap',
          wrong: '« Litiyɔmu ($Z = 3$) bɛ sɛbɛn $(K)^3$. »',
          why: 'Kuci K tɛ se ka ɛlɛkitɔrɔn 2 tɛmɛ.',
          reflex: 'Kuci kelen-kelen bɛɛ ka dan lajɛ tuma bɛɛ : litiyɔmu ye $(K)^2(L)^1$ ye.',
        },
      ],
    },
  ],
  essentials: [
    'Atɔmu = kisɛ (prɔtɔnw + nɛtrɔnw), ɛlɛkitɔrɔnw b’a lamini. A girinya fanba bɛ kisɛ kɔnɔ.',
    'Prɔtɔn ka kuran : $+e$ ; ɛlɛkitɔrɔn ta : $-e$ ; kuran tɛ nɛtrɔn la. $e = 1{,}6 \\times 10^{-19}$ C.',
    '$\\ce{^{A}_{Z}X}$ kɔnɔ : prɔtɔn $Z$, nɛtrɔn $A - Z$, ani ɛlɛkitɔrɔn $Z$ ni atɔmu kuran bɛnnen don.',
    'Iyɔn bɛ dilan ɛlɛkitɔrɔnw bɔli (kasiyɔn) walima u sɔrɔli (aniyɔn) fɛ ; kisɛ tɛ yɛlɛma.',
    'Izotɔpuw ka $Z$ ye kelen ye, u ka $A$ tɛ kelen ye.',
    '$m_{\\text{atome}} \\approx A \\times 1{,}67 \\times 10^{-27}$ kg.',
    'Kuciw : K (2 a dan ye), L (8), M ; u bɛ fa nɔ o nɔ.',
  ],
  simulationTasks: [
    'karbɔni 12 atɔmu dilan, o kɔ karbɔni 14 : mun de yɛlɛmana, mun de ma yɛlɛma ?',
    'sodiyɔmu atɔmu dilan, o kɔ ɛlɛkitɔrɔn kelen bɔ a la : iyɔn jumɛn bɛ sɔrɔ ?',
    'ɛlɛman min bɛ ɛlɛkitɔrɔn 8 ta a ka kuci L kan ani ɛlɛkitɔrɔn 1 a ka kuci M kan, o ɲini.',
  ],
  exercises: [
    {
      id: 'tableau-particules',
      level: 1,
      statement: 'Nin atɔmuw kelen-kelen bɛɛ ka prɔtɔn, nɛtrɔn ani ɛlɛkitɔrɔn hakɛ di :',
      questions: ['$\\ce{^{16}_{8}O}$', '$\\ce{^{27}_{13}Al}$', '$\\ce{^{56}_{26}Fe}$'],
      solution: [
        'Ɔkisizɛni : prɔtɔn 8, nɛtrɔn $16 - 8 = 8$, ɛlɛkitɔrɔn 8.',
        'Aliminiyɔmu : prɔtɔn 13, nɛtrɔn $27 - 13 = 14$, ɛlɛkitɔrɔn 13.',
        'Nɛgɛ : prɔtɔn 26, nɛtrɔn $56 - 26 = 30$, ɛlɛkitɔrɔn 26.',
      ],
    },
    {
      id: 'identifier',
      level: 1,
      statement: 'Atɔmu kuran bɛnnen dɔ bɛ ɛlɛkitɔrɔn 17 ni nɛtrɔn 18 ta.',
      questions: ['A ka atɔmu jateden ye joli ye ?', 'A ka girinya jateden ye joli ye ?', 'A sɛbɛncogo sɛbɛn.'],
      hints: ['Atɔmu kuran bɛnnen kɔnɔ, ɛlɛkitɔrɔn hakɛ = prɔtɔn hakɛ.'],
      solution: ['$Z = 17$ (prɔtɔn hakɛ ni ɛlɛkitɔrɔn hakɛ ye kelen ye).', '$A = Z + N = 17 + 18 = 35$.', 'Ɛlɛman min jateden ye 17 ye, o ye kilɔri ye : $\\ce{^{35}_{17}Cl}$.'],
    },
    {
      id: 'ion-magnesium',
      level: 2,
      statement: 'Maɲeziyɔmu iyɔn sɛbɛncogo ye $\\ce{Mg^{2+}}$ ye. Maɲeziyɔmu ka atɔmu jateden ye $Z = 12$ ye.',
      questions: ['Ɛlɛkitɔrɔn joli bɛ nin iyɔn in na ?', 'A ka ɛlɛkitɔrɔnw tilacogo sɛbɛn.', 'Gazi nɔbili jumɛn ka tilacogo ni nin ta ye kelen ye ?'],
      solution: [
        'Kuran $2+$ kɔrɔ ye ko atɔmu ye ɛlɛkitɔrɔn 2 bɔ : $12 - 2 = 10$ ɛlɛkitɔrɔn.',
        '$(K)^2(L)^8$.',
        'Neyɔn ($Z = 10$) fana ye $(K)^2(L)^8$ ye : iyɔn ka kuci kɔkan falen don, i n’a fɔ gazi nɔbili.',
      ],
    },
    {
      id: 'couche-m',
      level: 2,
      statement: 'Atɔmu dɔ bɛ ɛlɛkitɔrɔn 3 ta a ka kuci M kan, o ye a ka kuci kɔkan ye.',
      questions: ['A ka atɔmu jateden ye joli ye ?', 'Ɛlɛman dɔn ni ɛlɛmanw tabulo ye.'],
      hints: ['Ni M bɛ ɛlɛkitɔrɔnw ta, K ni L falen don tuma bɛɛ.'],
      solution: ['K ni L falen don : $Z = 2 + 8 + 3 = 13$.', 'O ye aliminiyɔmu ye, Al.'],
    },
    {
      id: 'masse-sodium',
      level: 2,
      statement: 'An bɛ sodiyɔmu atɔmu $\\ce{^{23}_{11}Na}$ lajɛ. $m_{\\text{nucléon}} = 1{,}67 \\times 10^{-27}$ kg.',
      questions: ['Sodiyɔmu atɔmu kelen girinya jate.', 'Atɔmu joli bɛ sodiyɔmu garamu 1 kɔnɔ ?'],
      solution: [
        '$m = 23 \\times 1{,}67 \\times 10^{-27} = 3{,}84 \\times 10^{-26}$ kg, o ye $3{,}84 \\times 10^{-23}$ g ye.',
        '$N = \\dfrac{1}{3{,}84 \\times 10^{-23}} \\approx 2{,}6 \\times 10^{22}$ atɔmu.',
      ],
    },
    {
      id: 'isotopes-cuivre',
      level: 3,
      statement: 'Sanu wulen naturɛli ye izotɔpu fila ɲagaminen ye : $\\ce{^{63}Cu}$ (69 %) ani $\\ce{^{65}Cu}$ (31 %). Sanu wulen ka atɔmu jateden ye 29 ye.',
      questions: [
        'Mun bɛ nin izotɔpu fila bɛɛ la ? U danfara ye mun ye ?',
        'Sanu wulen naturɛli ka mɔli girinya cɛmancɛ jate, ka izotɔpu kelen-kelen bɛɛ girinya jate a ka girinya jateden ye (g/mol la).',
        'Sanu wulen atɔmu kisɛ ka kuran jate.',
      ],
      solution: [
        'Prɔtɔn hakɛ (29) ni ɛlɛkitɔrɔn hakɛ ye kelen ye ; $\\ce{^{63}Cu}$ bɛ nɛtrɔn 34 ta, $\\ce{^{65}Cu}$ bɛ nɛtrɔn 36 ta.',
        '$M = 0{,}69 \\times 63 + 0{,}31 \\times 65 = 43{,}47 + 20{,}15 = 63{,}62 \\approx 63{,}6$ g/mol (tabulow bɛ 63,55 g/mol di).',
        '$q = Z \\times e = 29 \\times 1{,}6 \\times 10^{-19} = 4{,}64 \\times 10^{-18}$ C.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Atɔmu kisɛ dilannen don ni :',
      choices: ['prɔtɔnw ni ɛlɛkitɔrɔnw ye', 'prɔtɔnw ni nɛtrɔnw ye', 'nɛtrɔnw ni ɛlɛkitɔrɔnw ye', 'prɔtɔnw dɔrɔn ye'],
      answer: 1,
      explanation: 'Kisɛ dilannen don ni nikleyɔnw ye : prɔtɔnw ni nɛtrɔnw. Ɛlɛkitɔrɔnw bɛ kisɛ lamini.',
    },
    {
      question: 'Atɔmu jateden $Z$ ye :',
      choices: ['nɛtrɔn hakɛ ye', 'nikleyɔn hakɛ ye', 'prɔtɔn hakɛ ye', 'atɔmu girinya ye'],
      answer: 2,
      explanation: '$Z$ bɛ prɔtɔnw jate. O de bɛ ɛlɛman jira.',
    },
    {
      question: 'Nɛtrɔn joli bɛ $\\ce{^{37}_{17}Cl}$ la ?',
      choices: ['17', '20', '37', '54'],
      answer: 1,
      explanation: '$N = A - Z = 37 - 17 = 20$.',
    },
    {
      question: 'Iyɔn kilorir $\\ce{Cl-}$ dilanna :',
      choices: ['ɛlɛkitɔrɔn kelen bɔli fɛ', 'ɛlɛkitɔrɔn kelen sɔrɔli fɛ', 'prɔtɔn kelen sɔrɔli fɛ', 'nɛtrɔn kelen bɔli fɛ'],
      answer: 1,
      explanation: 'Kuran negatifu bɛ bɔ ɛlɛkitɔrɔn sɔrɔlen de la. Kisɛ tɛ yɛlɛma.',
    },
    {
      question: 'Ɛlɛman kelen ka izotɔpu fila ka :',
      choices: ['$A$ ye kelen ye', 'nɛtrɔn hakɛ ye kelen ye', '$Z$ ye kelen ye', 'taamasiyɛn tɛ kelen ye'],
      answer: 2,
      explanation: 'Prɔtɔn hakɛ ye kelen ye ($Z$ kelen), nɛtrɔn hakɛ tɛ kelen ye.',
    },
    {
      question: 'Sodiyɔmu ($Z = 11$) ka ɛlɛkitɔrɔnw tilacogo ye :',
      choices: ['$(K)^2(L)^9$', '$(K)^2(L)^8(M)^1$', '$(K)^3(L)^8$', '$(K)^1(L)^8(M)^2$'],
      answer: 1,
      explanation: 'K bɛ ɛlɛkitɔrɔn 2 ta, L bɛ 8 ta, a laban bɛ taa M kan.',
    },
    {
      question: 'Atɔmu girinya fanba bɛ :',
      choices: ['a ka ɛlɛkitɔrɔnw na', 'a kisɛ kɔnɔ', 'a yɔrɔ bɛɛ la ka bɛn', 'kisɛ ni ɛlɛkitɔrɔnw cɛ lankolon kɔnɔ'],
      answer: 1,
      explanation: 'Nikleyɔn kelen ka girin ni ɛlɛkitɔrɔn ye siɲɛ 1 836 ɲɔgɔn.',
    },
  ],
  applications: [
    {
      title: 'Sadiola sanu',
      situation:
        'Mali ye Afiriki sanu bɔbaga fɔlɔw dɔ ye, Sadiola ni Lolo sanu dingɛw kosɔn. Sanu bɛ yen izotɔpu $\\ce{^{197}_{79}Au}$ cogoya la. Sanu sanuman bolokɔnɔnin dɔ girinya ye garamu 4 ye.',
      questions: [
        'Prɔtɔn, nɛtrɔn ani ɛlɛkitɔrɔn joli bɛ sanu atɔmu kelen na ?',
        'Sanu atɔmu kelen girinya jate ($m_{\\text{nucléon}} = 1{,}67 \\times 10^{-27}$ kg).',
        'Sanu atɔmu joli bɛ bolokɔnɔnin kɔnɔ ?',
      ],
      solution: [
        'Prɔtɔn 79, nɛtrɔn $197 - 79 = 118$, ani ɛlɛkitɔrɔn 79.',
        '$m = 197 \\times 1{,}67 \\times 10^{-27} = 3{,}29 \\times 10^{-25}$ kg, o ye $3{,}29 \\times 10^{-22}$ g ye.',
        '$N = \\dfrac{4}{3{,}29 \\times 10^{-22}} \\approx 1{,}2 \\times 10^{22}$ atɔmu : miliyari miliyari ba tan ni fila.',
      ],
    },
    {
      title: 'Jenne-Jenno daga kɔrɔw waati dɔnni',
      situation:
        'Dugukolo kɔrɔw sɛgɛsɛgɛbagaw ye Jenne-Jenno dugu kɔrɔ waati dɔn karbɔni 14 fɛ min tun bɛ jiri kalan ni suman tolenw kɔnɔ. Ɲɛnamafɛnw ka karbɔni ye $\\ce{^{12}_{6}C}$ ye a fanba la, $\\ce{^{14}_{6}C}$ dɔɔnin kosɛbɛ bɛ yen.',
      questions: ['Nin atɔmu fila kisɛw dilancogo sanga ɲɔgɔn ma.', 'Mun na u bɛ wele izotɔpuw ?', 'U ka simi jogo ye kelen ye wa ? A ɲɛfɔ.'],
      solution: [
        '$\\ce{^{12}C}$ : prɔtɔn 6 ni nɛtrɔn 6 ; $\\ce{^{14}C}$ : prɔtɔn 6 ni nɛtrɔn 8.',
        'U ka atɔmu jateden ye kelen ye ($Z = 6$), u ka girinya jateden tɛ kelen ye.',
        'Ɔwɔ : u ka ɛlɛkitɔrɔn hakɛ ye kelen ye, u sigilen don cogo kelen na, $(K)^2(L)^4$. Ɛlɛkitɔrɔnw de bɛ simi jogo latigɛ. Karbɔni 14 kisɛ dɔrɔn de tɛ kelen ye : a ye radiyoaktifu ye, o de bɛ waati dɔnni kɛ.',
      ],
    },
  ],
};
