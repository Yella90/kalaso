import type { Lesson } from '../types';

// Bamanankan — BROUILLON À FAIRE RELIRE. Les formules sont celles de la version française.
export const lesson: Lesson = {
  hook:
    'Tobili kɔgɔ ye fɛn gɛlɛn ye, a kisɛ misɛnninw bɛ i n’a fɔ kibiw. Juru fila sunɔgɔ kɔgɔ jalen kɔnɔ, olu sirilen pili ni lanpu la : foyi tɛ kɛ. Kɔgɔ in bila ji la : lanpu bɛ mana. Nɛgɛ tɛ kɔgɔ kɔnɔ, o bɛɛ n’a ta, kɔgɔji bɛ kuran tɛmɛ. Mun kɛra ?',
  objectives: [
    'iyɔn atɔmu kelenmaw ka kuran dɔn, ani iyɔn atɔmu caman minnu ka ca, olu dɔn ;',
    'iyɔn siri (liaison ionique) ɲɛfɔ ka iyɔn kirisitali ɲɛfɔ ;',
    'iyɔn fɛn dɔ sɛbɛncogo sɛbɛn ka a tɔgɔ da ;',
    'iyɔn fɛn gɛlɛn dɔ yeli ekuwasiyɔn sɛbɛn ji kɔnɔ ;',
    'a ɲɛfɔ mun na iyɔn ji ɲagaminen bɛ kuran tɛmɛ.',
  ],
  sections: [
    {
      title: 'Iyɔn atɔmu kelenmaw',
      blocks: [
        {
          kind: 'text',
          text: 'Iyɔn atɔmu kelenma bɔra atɔmu kelen dɔrɔn de la, min ye ɛlɛkitɔrɔnw bɔ walima ka u sɔrɔ. Kulu 1, 2, 13, 15, 16 ani 17 ka ɛlɛmanw ma, ɔkitɛti (walima dwɛti) sariya bɛ se ka a ka kuran fɔ.',
        },
        {
          kind: 'table',
          head: ['Kasiyɔnw', 'Tɔgɔ', 'Aniyɔnw', 'Tɔgɔ'],
          rows: [
            ['$\\ce{Na+}$', 'iyɔn sodiyɔmu', '$\\ce{Cl-}$', 'iyɔn kilorir'],
            ['$\\ce{K+}$', 'iyɔn potasiyɔmu', '$\\ce{F-}$', 'iyɔn fliyorir'],
            ['$\\ce{Mg^{2+}}$', 'iyɔn maɲeziyɔmu', '$\\ce{O^{2-}}$', 'iyɔn ɔkisidi'],
            ['$\\ce{Ca^{2+}}$', 'iyɔn kalisiyɔmu', '$\\ce{S^{2-}}$', 'iyɔn sulfiri'],
            ['$\\ce{Al^{3+}}$', 'iyɔn aliminiyɔmu', '$\\ce{I-}$', 'iyɔn yodir'],
          ],
        },
        {
          kind: 'text',
          text: 'Tranzisiyɔn nɛgɛw, i n’a fɔ nɛgɛ walima sanu wulen, olu tɛ ɔkitɛti sariya bato. U ka iyɔnw ka kan ka dɔn : $\\ce{Fe^{2+}}$ (nɛgɛ II), $\\ce{Fe^{3+}}$ (nɛgɛ III), $\\ce{Cu^{2+}}$ (sanu wulen II), $\\ce{Zn^{2+}}$ (zɛngi).',
        },
      ],
    },
    {
      title: 'Iyɔn atɔmu camanw',
      blocks: [
        {
          kind: 'definition',
          term: 'Iyɔn atɔmu caman (polyatomique)',
          text: 'atɔmu caman kulu min sirilen don ɲɔgɔn na, min bɛ kuran ta a bɛɛ lajɛlen na.',
        },
        {
          kind: 'table',
          head: ['Iyɔn', 'Tɔgɔ', 'Iyɔn', 'Tɔgɔ'],
          rows: [
            ['$\\ce{NH4+}$', 'amɔniyɔmu', '$\\ce{OH-}$', 'idrɔksidi'],
            ['$\\ce{NO3-}$', 'nitirati', '$\\ce{SO4^{2-}}$', 'sulfati'],
            ['$\\ce{CO3^{2-}}$', 'karibɔnati', '$\\ce{PO4^{3-}}$', 'fosifati'],
            ['$\\ce{HCO3-}$', 'idrozenokaribɔnati', '$\\ce{MnO4-}$', 'pɛrimanganati'],
          ],
        },
        {
          kind: 'trap',
          wrong: '« Iyɔn sulfati $\\ce{SO4^{2-}}$ ye iyɔn sufiri kelen ni iyɔn ɔkisizɛni naani ye. »',
          why: 'Atɔmu 5 sirilen don ɲɔgɔn na ka iyɔn kelen dilan. Kuran $2-$ ye kulu bɛɛ lajɛlen ta ye.',
          reflex: 'Iyɔn atɔmu caman ye fɛn kelen ye : a tɛ tila sɛbɛncogo walima ekuwasiyɔn kɔnɔ abada.',
        },
      ],
    },
    {
      title: 'Iyɔn siri ni kirisitali',
      blocks: [
        {
          kind: 'definition',
          term: 'Iyɔn siri (liaison ionique)',
          text: 'iyɔn minnu ka kuran tɛ kelen ye, olu bɛ ɲɔgɔn sama. Kasiyɔnw bɛ aniyɔnw sama, aniyɔnw fana bɛ kasiyɔnw sama.',
        },
        {
          kind: 'definition',
          term: 'Iyɔn kirisitali',
          text: 'fɛn gɛlɛn min kɔnɔ iyɔnw sigilen don ɲɔgɔn kan ka bɛn fan saba bɛɛ fɛ. Iyɔn kelen-kelen bɛɛ lamini bɛ iyɔn minnu ka kuran tɛ kelen ye ni a ta ye.',
        },
        {
          kind: 'example',
          title: 'sodiyɔmu kilorir kirisitali',
          text: 'Kɔgɔ kɔnɔ, iyɔn $\\ce{Na+}$ kelen-kelen bɛɛ lamini bɛ iyɔn $\\ce{Cl-}$ 6, iyɔn $\\ce{Cl-}$ kelen-kelen bɛɛ lamini bɛ iyɔn $\\ce{Na+}$ 6. Nin sigicogo kibi cogo la bɛ ye ni ɲɛ ye : kɔgɔ kisɛw ye kibi misɛnninw ye.',
        },
        {
          kind: 'rule',
          text: 'Iyɔn kirisitali **kuran bɛnnen don**. A sɛbɛncogo, min bɛ wele **sɛbɛncogo statistiki**, bɛ iyɔnw hakɛ ɲɔgɔn cɛ jira k’a sɔrɔ kuranw ma sɛbɛn : $\\ce{NaCl}$ kɔrɔ ye « iyɔn $\\ce{Na+}$ ni iyɔn $\\ce{Cl-}$ hakɛ ye kelen ye ».',
        },
        {
          kind: 'trap',
          wrong: '« $\\ce{NaCl}$ ye molekili ye min dilannen don ni sodiyɔmu atɔmu kelen ni kilɔri atɔmu kelen ye. »',
          why: 'Molekili tɛ iyɔn kirisitali kɔnɔ : iyɔn kelen-kelen bɛɛ bɛ a kɛrɛfɛmɔgɔ minnu ka kuran tɛ kelen ye ni a ta ye, olu bɛɛ sama, kulu misɛnnin kelenma tɛ dilan.',
          reflex: 'Iyɔn fɛn ma, sɛbɛncogo bɛ iyɔnw hakɛ ɲɔgɔn cɛ de jira, a tɛ molekili ye.',
        },
      ],
    },
    {
      title: 'Iyɔn fɛn dɔ sɛbɛncogo ni a tɔgɔ',
      blocks: [
        {
          kind: 'rule',
          text: 'Kasiyɔn bɛ sɛbɛn fɔlɔ, o kɔ aniyɔn, ni jateden dɔgɔman bɛɛ ye minnu bɛ a bɛɛ lajɛlen kɛ kuran bɛnnen ye. Ni iyɔn atɔmu caman segindara, a bɛ bila parantezi kɔnɔ. Tɔgɔ dali la (simi tɔgɔw bɛ fɔ faransikan na kalanso la), aniyɔn bɛ fɔ fɔlɔ, o kɔ kasiyɔn : $\\ce{CaCO3}$ ye « carbonate **de** calcium » ye.',
        },
        {
          kind: 'example',
          title: 'kalisiyɔmu fosifati, kolow ka minɛral',
          text: 'Iyɔnw : $\\ce{Ca^{2+}}$ ni $\\ce{PO4^{3-}}$.',
          steps: [
            '2 ni 3 ka miltipli dɔgɔman bɛɛ ye 6 ye.',
            'Iyɔn $\\ce{Ca^{2+}}$ 3 bɛ $+6$ di ; iyɔn $\\ce{PO4^{3-}}$ 2 bɛ $-6$ di.',
            'Sɛbɛncogo : $\\ce{Ca3(PO4)2}$.',
          ],
        },
        {
          kind: 'table',
          head: ['Sɛbɛncogo', 'Tɔgɔ', 'A bɛ sɔrɔ min ?'],
          rows: [
            ['$\\ce{CaCO3}$', 'carbonate de calcium', 'kalikɛri, kɔnɔ fanw, lakɔli sɛbɛnni kurulen'],
            ['$\\ce{CuSO4}$', 'sulfate de cuivre II', 'sɛnɛfɛnw ni pisini furakɛli'],
            ['$\\ce{NH4NO3}$', 'nitrate d’ammonium', 'nɔgɔ'],
            ['$\\ce{NaHCO3}$', 'hydrogénocarbonate de sodium', 'tobili bikaribɔnati'],
          ],
        },
      ],
    },
    {
      title: 'Iyɔn ji ɲagaminenw',
      blocks: [
        {
          kind: 'text',
          text: 'Ni iyɔn fɛn gɛlɛn dɔ yeliyara ji la, ji bɛ kirisitali iyɔnw faran ɲɔgɔn na. U bɛ jɛnsɛn ji bɛɛ kɔnɔ ka se ka lamaga. Iyɔn min lamini bɛ ji molekiliw, o bɛ sɛbɛn $\\text{(aq)}$.',
        },
        {
          kind: 'formula',
          tex: '\\ce{NaCl(s) -> Na+(aq) + Cl-(aq)}',
          legend: ['$\\text{(s)}$ : fɛn gɛlɛn ; $\\text{(aq)}$ : yeliyalen ji kɔnɔ'],
        },
        {
          kind: 'rule',
          text: 'Yeli ekuwasiyɔn kɔnɔ, **ɛlɛmanw** ni **kuranw** bɛ mara : kininbolo fɛ kuranw faralen ye fu ye, i n’a fɔ fɛn gɛlɛn min tun bɛ yen.',
        },
        {
          kind: 'example',
          title: 'kalisiyɔmu kilorir',
          text: '$\\ce{CaCl2(s) -> Ca^{2+}(aq) + 2Cl-(aq)}$ ; kininbolo fɛ kuranw : $+2 - 2 = 0$.',
        },
        {
          kind: 'text',
          text: 'Kuran ye kuranw ka lamagali ye. Kɔgɔ jalen kɔnɔ, iyɔnw jɔlen don kirisitali kɔnɔ : kuran tɛ tɛmɛ. Kɔgɔji kɔnɔ, iyɔnw bɛ se ka lamaga : ji ɲagaminen **bɛ kuran tɛmɛ**.',
        },
      ],
    },
  ],
  essentials: [
    'Kulu 1, 2, 13 → kasiyɔnw $+1$, $+2$, $+3$ ; kulu 15, 16, 17 → aniyɔnw $-3$, $-2$, $-1$.',
    'Iyɔn atɔmu caman minnu ka kan ka dɔn : amɔniyɔmu, idrɔksidi, nitirati, sulfati, karibɔnati, fosifati.',
    'Iyɔn siri : iyɔn minnu ka kuran tɛ kelen ye, olu bɛ ɲɔgɔn sama.',
    'Iyɔn kirisitali kuran bɛnnen don ; a sɛbɛncogo statistiki bɛ iyɔnw hakɛ ɲɔgɔn cɛ jira.',
    'Tɔgɔ dali (faransikan na) : aniyɔn fɔlɔ, o kɔ kasiyɔn (« chlorure de sodium »).',
    'Yeli : $\\ce{NaCl(s) -> Na+(aq) + Cl-(aq)}$, ɛlɛmanw ni kuranw bɛ mara.',
    'Iyɔn ji ɲagaminen bɛ kuran tɛmɛ katuguni a ka iyɔnw bɛ se ka lamaga.',
  ],
  simulationTasks: [
    'maɲeziyɔmu atɔmu dilan, o kɔ ɛlɛkitɔrɔnw bɔ a la fo ka iyɔn $\\ce{Mg^{2+}}$ sɔrɔ : a ka kuciw sanga neyɔn ta ma ;',
    'kilɔri atɔmu dilan, o kɔ ɛlɛkitɔrɔn kelen fara a kan : gazi nɔbili jumɛn ka tilacogo ni $\\ce{Cl-}$ ta ye kelen ye ?',
  ],
  exercises: [
    {
      id: 'ecrire-formules',
      level: 1,
      statement: 'Nin iyɔn fɛnw sɛbɛncogo sɛbɛn :',
      questions: ['chlorure de potassium', 'fluorure de calcium', 'sulfate d’aluminium', 'phosphate d’ammonium'],
      solution: [
        '$\\ce{K+}$ ni $\\ce{Cl-}$ : $\\ce{KCl}$.',
        '$\\ce{Ca^{2+}}$ ni $\\ce{F-}$ : iyɔn fliyorir 2 ka kan, $\\ce{CaF2}$.',
        '$\\ce{Al^{3+}}$ ni $\\ce{SO4^{2-}}$ : iyɔn aliminiyɔmu 2 ($+6$) ni iyɔn sulfati 3 ($-6$), $\\ce{Al2(SO4)3}$.',
        '$\\ce{NH4+}$ ni $\\ce{PO4^{3-}}$ : iyɔn amɔniyɔmu 3, $\\ce{(NH4)3PO4}$.',
      ],
    },
    {
      id: 'nommer',
      level: 1,
      statement: 'Nin fɛnw tɔgɔ fɔ faransikan na, i n’a fɔ kalanso la :',
      questions: ['$\\ce{Na2CO3}$', '$\\ce{Mg(OH)2}$', '$\\ce{FeCl3}$', '$\\ce{KNO3}$'],
      solution: [
        'Carbonate de sodium.',
        'Hydroxyde de magnésium.',
        'Chlorure de fer III (nɛgɛ bɛ kuran $3+$ ta walasa ka iyɔn $\\ce{Cl-}$ 3 dafa).',
        'Nitrate de potassium.',
      ],
    },
    {
      id: 'dissolution',
      level: 1,
      statement: 'Nin fɛnw yeli ekuwasiyɔn sɛbɛn ji kɔnɔ :',
      questions: ['$\\ce{KNO3}$', '$\\ce{MgCl2}$', '$\\ce{Na2SO4}$', '$\\ce{Al2(SO4)3}$'],
      solution: [
        '$\\ce{KNO3(s) -> K+(aq) + NO3-(aq)}$',
        '$\\ce{MgCl2(s) -> Mg^{2+}(aq) + 2Cl-(aq)}$',
        '$\\ce{Na2SO4(s) -> 2Na+(aq) + SO4^{2-}(aq)}$',
        '$\\ce{Al2(SO4)3(s) -> 2Al^{3+}(aq) + 3SO4^{2-}(aq)}$',
      ],
    },
    {
      id: 'corriger',
      level: 2,
      statement: 'Kalanden dɔ ye a sɛbɛn ko kalisiyɔmu kilorir sɛbɛncogo ye $\\ce{CaCl}$ ye.',
      questions: ['A jira ko nin sɛbɛncogo tɛ tiɲɛ ye.', 'A latilen.'],
      hints: ['Nin sɛbɛncogo in ka iyɔnw kuranw fara ɲɔgɔn kan.'],
      solution: [
        'Ni iyɔn $\\ce{Ca^{2+}}$ kelen ni iyɔn $\\ce{Cl-}$ kelen don, kuranw faralen ye $+2 - 1 = +1$ ye : fɛn tun tɛna kɛ kuran bɛnnen ye.',
        'Iyɔn kilorir fila de ka kan : $\\ce{CaCl2}$, katuguni $+2 - 2 = 0$.',
      ],
    },
    {
      id: 'rouille',
      level: 2,
      statement: 'Nɛgɛ toli bɛ nɛgɛ ɔkisidi ta min sɛbɛncogo ye $\\ce{Fe2O3}$ ye.',
      questions: ['Iyɔn ɔkisidi ka kuran ye joli ye ?', 'O la, nɛgɛ iyɔnw ka kuran ye joli ye nin fɛn in kɔnɔ ?', 'Nin fɛn in tɔgɔ fɔ.'],
      solution: ['$\\ce{O^{2-}}$ : kuran $-2$ (kulu 16).', 'Iyɔn ɔkisidi 3 bɛ $-6$ di ; nɛgɛ iyɔn 2 ka kan ka $+6$ di, o ye $+3$ ye u kelen-kelen bɛɛ ma : $\\ce{Fe^{3+}}$.', 'Nɛgɛ III ɔkisidi.'],
    },
    {
      id: 'conductivite',
      level: 3,
      statement:
        'An bɛ a lajɛ ni pili ni lanpu ye : (A) kɔgɔ jalen, (B) ji distilen, (C) sukaroji, (D) kɔgɔji. D kɔrɔbɔli lanpu dɔrɔn de bɛ mana.',
      questions: [
        'Mun na kɔgɔ jalen tɛ kuran tɛmɛ, k’a sɔrɔ iyɔnw bɛ a la ?',
        'Mun bɛ ji ɲagaminen D kɔnɔ min tɛ B ni C kɔnɔ ?',
        'Sukaro ye iyɔn fɛn ye wa ? A ɲɛfɔ.',
      ],
      solution: [
        'Kirisitali kɔnɔ, iyɔnw jɔlen don : u tɛ se ka lamaga, o la kuran tɛ tɛmɛ.',
        'Iyɔn hɔrɔnw, $\\ce{Na+(aq)}$ ni $\\ce{Cl-(aq)}$, minnu bɛ se ka lamaga.',
        'Ayi : sukaroji tɛ kuran tɛmɛ, o la iyɔn tɛ a kɔnɔ. Sukaro dilannen don ni molekiliw ye (kovalan siri sapitiri lajɛ).',
      ],
    },
  ],
  quiz: [
    {
      question: 'Iyɔn siri ye :',
      choices: ['ɛlɛkitɔrɔnw tilali ɲɔgɔn cɛ', 'iyɔn minnu ka kuran tɛ kelen ye, olu sama ɲɔgɔn fɛ', 'kisɛ fila siri ɲɔgɔn na', 'atɔmu kuran bɛnnen fila sama ɲɔgɔn fɛ'],
      answer: 1,
      explanation: 'Kasiyɔnw ni aniyɔnw bɛ ɲɔgɔn sama katuguni u ka kuran tɛ kelen ye.',
    },
    {
      question: '$\\ce{CaCO3}$ tɔgɔ ye (faransikan na) :',
      choices: ['carbonate de calcium', 'calcium carbonate', 'carbure de calcium', 'oxyde de calcium'],
      answer: 0,
      explanation: 'Faransikan na, aniyɔn bɛ fɔ fɔlɔ : carbonate de calcium.',
    },
    {
      question: 'Sodiyɔmu sulfati sɛbɛncogo ye :',
      choices: ['$\\ce{NaSO4}$', '$\\ce{Na2SO4}$', '$\\ce{Na(SO4)2}$', '$\\ce{NaS}$'],
      answer: 1,
      explanation: 'Iyɔn $\\ce{Na+}$ 2 bɛ iyɔn $\\ce{SO4^{2-}}$ kelen dafa.',
    },
    {
      question: '$\\ce{CaCl2}$ yeli ekuwasiyɔn ye :',
      choices: ['$\\ce{CaCl2 -> Ca+ + Cl2-}$', '$\\ce{CaCl2 -> Ca^{2+} + Cl2^{2-}}$', '$\\ce{CaCl2 -> Ca^{2+} + 2Cl-}$', '$\\ce{CaCl2 -> Ca + 2Cl}$'],
      answer: 2,
      explanation: 'Kirisitali bɛ iyɔn kalisiyɔmu kelen ni iyɔn kilorir fila bɔ ; kuranw bɛ bɛn.',
    },
    {
      question: 'Kɔgɔji bɛ kuran tɛmɛ katuguni :',
      choices: ['ji ye nɛgɛ ye', 'iyɔn minnu bɛ se ka lamaga, olu bɛ a kɔnɔ', 'ɛlɛkitɔrɔn hɔrɔnw bɛ kɔgɔ la', 'kɔgɔ ye fɛn gɛlɛn ye'],
      answer: 1,
      explanation: 'Kuran ye kuranw ka lamagali ye : yan, iyɔnw de bɛ lamaga.',
    },
    {
      question: '$\\ce{Fe2O3}$ kɔnɔ, nɛgɛ iyɔnw ye :',
      choices: ['$\\ce{Fe+}$', '$\\ce{Fe^{2+}}$', '$\\ce{Fe^{3+}}$', '$\\ce{Fe^{6+}}$'],
      answer: 2,
      explanation: 'Iyɔn $\\ce{O^{2-}}$ 3 bɛ $-6$ kɛ ; nɛgɛ iyɔn 2 ka kan ka $+6$ kɛ.',
    },
  ],
  applications: [
    {
      title: 'Jɔliba ji saniyali',
      situation:
        'Ji sanuyaso dɔ kɔnɔ, Jɔliba ji nɔgɔlen don. Aliminiyɔmu sulfati bɛ fara a kan : iyɔn aliminiyɔmu bɛ bɔgɔ lajɛ ka kɛ kulu misɛnninw ye minnu bɛ jigin duguma. Ji jɛlen bɛ tɛmɛ filitiri fɛ, o kɔ a bɛ furakɛ.',
      questions: ['Aliminiyɔmu sulfati sɛbɛncogo sɛbɛn.', 'A yeli ekuwasiyɔn sɛbɛn ji kɔnɔ.', 'Iyɔn jumɛnw bɛ ji kɔnɔ a farali kɔfɛ ?'],
      solution: ['$\\ce{Al2(SO4)3}$.', '$\\ce{Al2(SO4)3(s) -> 2Al^{3+}(aq) + 3SO4^{2-}(aq)}$.', 'Iyɔn aliminiyɔmu $\\ce{Al^{3+}}$ ani iyɔn sulfati $\\ce{SO4^{2-}}$.'],
    },
    {
      title: 'Tobili kɔgɔ yodilen',
      situation:
        'Ni yodi dɛsɛra dumuni na, o bɛ kannabimbi bana lase. Walasa ka o kunbɛn, potasiyɔmu yodati dɔɔnin bɛ fara tobili kɔgɔ kan, a sɛbɛncogo ye $\\ce{KIO3}$ ye. Iyɔn atɔmu caman yodati bɛ a kɔnɔ.',
      questions: [
        'Nin fɛn in ka kasiyɔn ye jumɛn ye ? O la, iyɔn yodati ka kuran dɔn ka a sɛbɛncogo sɛbɛn.',
        'Potasiyɔmu yodati yeli ekuwasiyɔn sɛbɛn.',
        'Ni nin kɔgɔ in bilala nan kɔnɔ, sodiyɔmu ni kilɔri bɛ cogo jumɛn na ?',
      ],
      solution: [
        'Kasiyɔn ye $\\ce{K+}$ ye ; fɛn kuran bɛnnen don, o la iyɔn yodati bɛ kuran $-1$ ta : $\\ce{IO3-}$.',
        '$\\ce{KIO3(s) -> K+(aq) + IO3-(aq)}$.',
        'Iyɔn yeliyalenw cogo la : $\\ce{Na+(aq)}$ ni $\\ce{Cl-(aq)}$.',
      ],
    },
  ],
};
