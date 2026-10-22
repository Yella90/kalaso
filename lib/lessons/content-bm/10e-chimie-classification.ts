import type { Lesson } from '../types';

// Bamanankan — BROUILLON À FAIRE RELIRE. Les formules sont celles de la version française.
export const lesson: Lesson = {
  hook:
    'San 1869, simi dɔnnikɛla Dimitiri Mendeleyɛfu ye ɛlɛman 63 minnu tun dɔnna o waati la, olu sigi tabulo dɔ kɔnɔ… ka yɔrɔ lankolonw to. A y’a fɔ ko ɛlɛman dɔnbaliw bɛna na ka o yɔrɔw fa, a ye u jogo fana fɔ. San damadɔ kɔfɛ, galiyɔmu (1875) ni zɛrimaniyɔmu (1886) sɔrɔla, i n’a fɔ a y’a fɔ cogo min na. Sigicogo dɔrɔn bɛ se ka siniko fɔ cogo di ?',
  objectives: [
    'a ɲɛfɔ ɛlɛmanw sigilen don tabulo kɔnɔ cogo min na ;',
    'ɛlɛman dɔ ka periyɔdi ni a ka kulu (groupe) dɔn ka bɔ a ka ɛlɛkitɔrɔnw tilacogo la, ani a kɔfɛ ;',
    'denbaya belebelew dɔn : alikalinw, alikalino-tɛrɔw, alozɛnw, gazi nɔbiliw ;',
    'dwɛti ni ɔkitɛti sariyaw nafa sɔrɔ walasa ka atɔmu ka iyɔn dɔn ;',
    'iyɔn fɛn dɔ sɛbɛncogo sɛbɛn.',
  ],
  sections: [
    {
      title: 'Sigicogo sariya',
      blocks: [
        {
          kind: 'rule',
          text: 'Ɛlɛmanw sigilen don ka bɛn **atɔmu jateden $Z$ yɛlɛli** ma. Siɲɛ o siɲɛ ni kuci kura dɔ bɛ daminɛ ka fa, an bɛ taa sira nata la.',
        },
        {
          kind: 'definition',
          term: 'Periyɔdi',
          text: 'tabulo sira (ligne). Periyɔdi kelen ka ɛlɛmanw bɛɛ ka **kuci falen hakɛ ye kelen ye**. Periyɔdi jateden ye kuci kɔkan jateden ye (K = 1, L = 2, M = 3…).',
        },
        {
          kind: 'definition',
          term: 'Kulu (groupe, kolɔn)',
          text: 'tabulo kolɔn (colonne). Kulu kelen ka ɛlɛmanw bɛɛ bɛ **ɛlɛkitɔrɔn hakɛ kelen ta u ka kuci kɔkan kan** : u ka simi jogo bɛ ɲɔgɔn bɔ, u ye **denbaya** kelen ye.',
        },
        {
          kind: 'table',
          head: ['Kulu', '1', '2', '13', '14', '15', '16', '17', '18'],
          rows: [['Valansi ɛlɛkitɔrɔnw', '1', '2', '3', '4', '5', '6', '7', '8 (2 He ma)']],
        },
        {
          kind: 'text',
          text: 'Ɛlɛman 18 fɔlɔw kama, kitabu caman bɛ tabulo nɔgɔman dɔ kɛ min **kolɔn ye 8 ye** (I fo VIII) : kolɔn jateden ye valansi ɛlɛkitɔrɔn hakɛ yɛrɛ ye.',
        },
        {
          kind: 'example',
          title: 'sufiri ($Z = 16$) bilacogo',
          text: 'Tilacogo : $(K)^2(L)^8(M)^6$.',
          steps: ['Kuci kɔkan ye M ye, kuci 3nan : **periyɔdi 3nan**.', 'Valansi ɛlɛkitɔrɔn 6 : **kulu 16** (tabulo nɔgɔman kolɔn VI).'],
        },
      ],
    },
    {
      title: 'Denbaya belebelew',
      blocks: [
        {
          kind: 'table',
          head: ['Denbaya', 'Kulu', 'Misaliw', 'U taamasiyɛn'],
          rows: [
            ['Alikalinw', '1', 'Li, Na, K', 'Nɛgɛ nɔgɔmanw, u bɛ reaksiyɔn kɛ joona : sodiyɔmu bɛ ji jɛni ni fanga ye.'],
            ['Alikalino-tɛrɔw', '2', 'Be, Mg, Ca', 'Nɛgɛ minnu bɛ reaksiyɔn kɛ ; kalisiyɔmu bɛ kolow ni kalikɛri kɔnɔ.'],
            ['Alozɛnw', '17', 'F, Cl, Br, I', 'Nɛgɛ tɛ minnu ye, u bɛ reaksiyɔn kɛ joona ; kilɔri bɛ ji saniya (ji sanuyalan).'],
            ['Gazi nɔbiliw', '18', 'He, Ne, Ar', 'Gazi minnu tɛ reaksiyɔn kɛ ka caya : u ka kuci kɔkan falen don.'],
          ],
        },
        {
          kind: 'text',
          text: '**Nɛgɛw** bɛ tabulo numanbolo fɛ ani a cɛmancɛ la, **nɛgɛ tɛ minnu ye** olu bɛ kininbolo fɛ. Sɛgɛn sira dɔ bɛ u faran ɲɔgɔn na, metaloyidiw (bɔri, silisiyɔmu, zɛrimaniyɔmu…) kɛrɛfɛ.',
        },
      ],
    },
    {
      title: 'Dwɛti ni ɔkitɛti sariyaw',
      blocks: [
        {
          kind: 'text',
          text: 'Gazi nɔbiliw sabatilen don katuguni u ka kuci kɔkan falen don : ɛlɛkitɔrɔn 2 eliyɔmu ma, 8 tɔw ma. Atɔmu tɔw bɛ a ɲini ka o cogoya kelen sɔrɔ.',
        },
        {
          kind: 'rule',
          text: '**Dwɛti sariya** : atɔmu minnu bɛ eliyɔmu gɛrɛfɛ ($Z \\le 4$ ɲɔgɔn), olu b’a ɲini ka ɛlɛkitɔrɔn 2 sɔrɔ u ka kuci kɔkan kan. **Ɔkitɛti sariya** : tɔw b’a ɲini ka 8 sɔrɔ. O kama, u bɛ ɛlɛkitɔrɔn hakɛ **dɔgɔman bɛɛ** bɔ walima ka o sɔrɔ.',
        },
        {
          kind: 'example',
          title: 'sodiyɔmu ni kilɔri',
          text: 'Sodiyɔmu $(K)^2(L)^8(M)^1$ bɛ ɛlɛkitɔrɔn **1** bɔ ka kɛ $\\ce{Na+}$ $(K)^2(L)^8$ ye, i n’a fɔ neyɔn. Kilɔri $(K)^2(L)^8(M)^7$ bɛ ɛlɛkitɔrɔn **1** sɔrɔ ka kɛ $\\ce{Cl-}$ $(K)^2(L)^8(M)^8$ ye, i n’a fɔ arigɔn.',
        },
        {
          kind: 'table',
          head: ['Kulu', '1', '2', '13', '15', '16', '17'],
          rows: [['Iyɔn min bɛ dilan', '$\\ce{X+}$', '$\\ce{X^{2+}}$', '$\\ce{X^{3+}}$', '$\\ce{X^{3-}}$', '$\\ce{X^{2-}}$', '$\\ce{X-}$']],
        },
        {
          kind: 'trap',
          wrong: '« Sodiyɔmu bɛ ɛlɛkitɔrɔn 7 sɔrɔ walasa ka a ka kuci M fa. »',
          why: 'Ɛlɛkitɔrɔn 7 sɔrɔli bɛ fanga caman ɲini. Ɛlɛkitɔrɔn kelen dɔrɔn bɔli bɛ se ka kuci kɔkan falen sɔrɔ (kuci L).',
          reflex: 'A sanga : ɛlɛkitɔrɔn joli ka kan ka **bɔ** ? Joli ka kan ka **sɔrɔ** ? Atɔmu bɛ hakɛ dɔgɔman bɛɛ sugandi. Ni valansi ɛlɛkitɔrɔnw ye 1, 2 walima 3 ye, a bɛ u bɔ ; ni u ye 5, 6 walima 7 ye, a bɛ 3, 2 walima 1 sɔrɔ.',
        },
      ],
    },
    {
      title: 'Iyɔn fɛn dɔ sɛbɛncogo',
      blocks: [
        {
          kind: 'rule',
          text: 'Iyɔn fɛn **kuran bɛnnen don** : kuran pozitifuw bɛ kuran negatifuw dafa ka ɲɛ.',
        },
        {
          kind: 'example',
          title: 'aliminiyɔmu ɔkisidi (alimini, min bɛ bɔ boksiti la)',
          text: 'Aliminiyɔmu bɛ $\\ce{Al^{3+}}$ di, ɔkisizɛni bɛ $\\ce{O^{2-}}$ di.',
          steps: [
            'Kuran $+$ ni kuran $-$ hakɛ ka kan ka kɛ kelen ye : 3 ni 2 ka miltipli dɔgɔman bɛɛ ye 6 ye.',
            'Iyɔn $\\ce{Al^{3+}}$ 2 bɛ $+6$ di ; iyɔn $\\ce{O^{2-}}$ 3 bɛ $-6$ di.',
            'Sɛbɛncogo : $\\ce{Al2O3}$.',
          ],
        },
      ],
    },
  ],
  essentials: [
    'Ɛlɛmanw sigilen don ka bɛn $Z$ yɛlɛli ma.',
    'Periyɔdi = kuci falen hakɛ ; kulu = valansi ɛlɛkitɔrɔn hakɛ (kulu 1, 2 ani 13 fo 18 kɔnɔ).',
    'Kulu kelen = denbaya kelen = simi jogo minnu bɛ ɲɔgɔn bɔ.',
    'Alikalinw (kulu 1), alikalino-tɛrɔw (2), alozɛnw (17), gazi nɔbiliw (18).',
    'Dwɛti ni ɔkitɛti : atɔmu bɛ ɛlɛkitɔrɔn hakɛ dɔgɔman bɛɛ bɔ walima ka o sɔrɔ walasa ka gazi nɔbili min ka surun a la, ka o bɔ.',
    'Kulu 1, 2, 13 → iyɔnw $+1$, $+2$, $+3$ ; kulu 15, 16, 17 → iyɔnw $-3$, $-2$, $-1$.',
    'Iyɔn fɛn kuran bɛnnen don : $\\ce{NaCl}$, $\\ce{MgCl2}$, $\\ce{Al2O3}$.',
  ],
  simulationTasks: [
    'alozɛnw denbaya dɔrɔn jira : mun bɛ u ka kuci laban na ?',
    'litiyɔmu, sodiyɔmu ani potasiyɔmu sanga ɲɔgɔn ma : mun bɛ u bɛɛ la ?',
    'periyɔdi 3nan ka ɛlɛmanw bɛɛ ɲini ka u ka kuciw jate.',
  ],
  exercises: [
    {
      id: 'placer-elements',
      level: 1,
      statement: 'Ɛlɛman kelen-kelen bɛɛ ka ɛlɛkitɔrɔnw tilacogo sɛbɛn, o kɔ a ka periyɔdi ni a ka kulu di :',
      questions: ['karbɔni ($Z = 6$)', 'fosifɔri ($Z = 15$)', 'arigɔn ($Z = 18$)'],
      solution: [
        'Karbɔni : $(K)^2(L)^4$ → periyɔdi 2nan, kulu 14.',
        'Fosifɔri : $(K)^2(L)^8(M)^5$ → periyɔdi 3nan, kulu 15.',
        'Arigɔn : $(K)^2(L)^8(M)^8$ → periyɔdi 3nan, kulu 18 (gazi nɔbili).',
      ],
    },
    {
      id: 'retrouver-element',
      level: 1,
      statement: 'Ɛlɛman dɔ bɛ periyɔdi 3nan ni kulu 2 la.',
      questions: ['A ka ɛlɛkitɔrɔnw tilacogo sɛbɛn.', 'A ka atɔmu jateden ye joli ye ? A dɔn.', 'A bɛ iyɔn jumɛn dilan ?'],
      solution: [
        'Periyɔdi 3nan : kuci kɔkan ye M ye ; kulu 2 : ɛlɛkitɔrɔn 2 bɛ M kan. O la $(K)^2(L)^8(M)^2$.',
        '$Z = 12$ : maɲeziyɔmu don.',
        'A bɛ a ka valansi ɛlɛkitɔrɔn 2 bɔ : $\\ce{Mg^{2+}}$.',
      ],
    },
    {
      id: 'prevoir-ions',
      level: 2,
      statement: 'Nin atɔmuw kelen-kelen bɛɛ bɛ iyɔn min dilan, o fɔ ka a ɲɛfɔ ni dwɛti walima ɔkitɛti sariya ye :',
      questions: ['litiyɔmu ($Z = 3$)', 'fliyɔri ($Z = 9$)', 'aliminiyɔmu ($Z = 13$)', 'ɔkisizɛni ($Z = 8$)'],
      solution: [
        'Li : $(K)^2(L)^1$, a bɛ ɛlɛkitɔrɔn 1 bɔ → $\\ce{Li+}$ $(K)^2$ (dwɛti sariya, i n’a fɔ eliyɔmu).',
        'F : $(K)^2(L)^7$, a bɛ ɛlɛkitɔrɔn 1 sɔrɔ → $\\ce{F-}$ $(K)^2(L)^8$.',
        'Al : $(K)^2(L)^8(M)^3$, a bɛ ɛlɛkitɔrɔn 3 bɔ → $\\ce{Al^{3+}}$ $(K)^2(L)^8$.',
        'O : $(K)^2(L)^6$, a bɛ ɛlɛkitɔrɔn 2 sɔrɔ → $\\ce{O^{2-}}$ $(K)^2(L)^8$.',
      ],
    },
    {
      id: 'potassium',
      level: 2,
      statement: 'Ɛlɛman X dɔ ka atɔmu ka ɛlɛkitɔrɔnw tilacogo ye $(K)^2(L)^8(M)^8(N)^1$ ye.',
      questions: ['A ka atɔmu jateden ye joli ye ?', 'A bɛ periyɔdi jumɛn ni kulu jumɛn na ?', 'A bɛ denbaya jumɛn na ? Nin denbaya in ka ɛlɛman wɛrɛ dɔ fɔ.'],
      solution: ['$Z = 2 + 8 + 8 + 1 = 19$ : potasiyɔmu don, K.', 'Periyɔdi 4nan (kuci kɔkan N), kulu 1.', 'Alikalinw denbaya, i n’a fɔ sodiyɔmu walima litiyɔmu.'],
    },
    {
      id: 'formules-ioniques',
      level: 2,
      statement: 'Iyɔn fɛn minnu bɛ dilan nin iyɔnw fɛ, olu sɛbɛncogo sɛbɛn :',
      questions: ['iyɔn maɲeziyɔmu ni kilorir ;', 'iyɔn kalisiyɔmu ($Z = 20$) ni ɔkisidi ;', 'iyɔn sodiyɔmu ni sulfiri ($\\ce{S^{2-}}$).'],
      solution: [
        '$\\ce{Mg^{2+}}$ ni $\\ce{Cl-}$ : iyɔn kilorir 2 ka kan → $\\ce{MgCl2}$.',
        '$\\ce{Ca^{2+}}$ ni $\\ce{O^{2-}}$ : kuran hakɛ ye kelen ye → $\\ce{CaO}$ (kalikɛri tobilen).',
        '$\\ce{Na+}$ ni $\\ce{S^{2-}}$ : iyɔn sodiyɔmu 2 ka kan → $\\ce{Na2S}$.',
      ],
    },
    {
      id: 'gaz-nobles',
      level: 3,
      statement: 'Arigɔn bɛ bila lanpu dɔw kɔnɔ, eliyɔmu bɛ bila sankolo kɔlɔsili ballɔnw kɔnɔ.',
      questions: [
        'Eliyɔmu ($Z = 2$) ni arigɔn ($Z = 18$) ka ɛlɛkitɔrɔnw tilacogo sɛbɛn.',
        'A ɲɛfɔ mun na nin gaziw tɛ iyɔnw walima molekiliw dilan ka caya.',
        'Mun na arigɔn bɛ bila lanpu kɔnɔ fiɲɛ nɔ na, lanpu min juru bɛ kalaya kosɛbɛ ?',
      ],
      solution: [
        'He : $(K)^2$ ; Ar : $(K)^2(L)^8(M)^8$.',
        'U ka kuci kɔkan falen don kaban (dwɛti He ma, ɔkitɛti Ar ma) : nafa si t’u ye ka ɛlɛkitɔrɔnw bɔ walima ka u sɔrɔ.',
        'Fiɲɛ bɛ ɔkisizɛni ta, o tun bɛna reaksiyɔn kɛ ni juru kalayalen ye k’a jeni. Arigɔn tɛ reaksiyɔn kɛ.',
      ],
    },
  ],
  quiz: [
    {
      question: 'Ɛlɛmanw tabulo kɔnɔ, ɛlɛmanw sigilen don ka bɛn :',
      choices: ['girinya yɛlɛli ma', 'nɛtrɔn hakɛ ma', 'atɔmu jateden yɛlɛli ma', 'abece ma'],
      answer: 2,
      explanation: 'U sigilen don ka bɛn $Z$ yɛlɛli ma.',
    },
    {
      question: 'Kulu kelen ka ɛlɛmanw ka … hakɛ ye kelen ye :',
      choices: ['kuciw', 'valansi ɛlɛkitɔrɔnw', 'nɛtrɔnw', 'nikleyɔnw'],
      answer: 1,
      explanation: 'Kulu kelen = ɛlɛkitɔrɔn hakɛ kelen kuci kɔkan kan. Periyɔdi kelen = kuci hakɛ kelen.',
    },
    {
      question: 'Kilɔri $(K)^2(L)^8(M)^7$ bɛ denbaya jumɛn na ?',
      choices: ['alikalinw', 'gazi nɔbiliw', 'alikalino-tɛrɔw', 'alozɛnw'],
      answer: 3,
      explanation: 'Valansi ɛlɛkitɔrɔn 7 : kulu 17, alozɛnw.',
    },
    {
      question: 'Maɲeziyɔmu atɔmu ($Z = 12$) bɛ iyɔn jumɛn dilan ?',
      choices: ['$\\ce{Mg+}$', '$\\ce{Mg^{2+}}$', '$\\ce{Mg^{2-}}$', '$\\ce{Mg^{6-}}$'],
      answer: 1,
      explanation: '$(K)^2(L)^8(M)^2$ : ɛlɛkitɔrɔn 2 bɔli ka nɔgɔ ni 6 sɔrɔli ye.',
    },
    {
      question: 'Periyɔdi 2nan ka ɛlɛman bɛ :',
      choices: ['valansi ɛlɛkitɔrɔn 2 ta', 'kuci falen 2 ta', 'prɔtɔn 2 ta', 'nɛtrɔn 2 ta'],
      answer: 1,
      explanation: 'Periyɔdi jateden ye kuci falen hakɛ ye (yan K ni L).',
    },
    {
      question: '$\\ce{Al^{3+}}$ ni $\\ce{O^{2-}}$ bɛ fɛn min dilan, o sɛbɛncogo ye :',
      choices: ['$\\ce{AlO}$', '$\\ce{Al3O2}$', '$\\ce{Al2O3}$', '$\\ce{AlO2}$'],
      answer: 2,
      explanation: '$2 \\times (+3) + 3 \\times (-2) = 0$ : $\\ce{Al2O3}$ kuran bɛnnen don.',
    },
  ],
  applications: [
    {
      title: 'Kɔori forow ka NPK nɔgɔ',
      situation:
        'Kucala ni Sikaso mara kɔori sɛnɛbagaw bɛ nɔgɔ dɔ kɛ min tɔgɔ ye « NPK ». A bɛ azɔti (N, $Z = 7$), fosifɔri (P, $Z = 15$) ani potasiyɔmu (K, $Z = 19$) di jiriw ma.',
      questions: [
        'Nin atɔmu saba kelen-kelen bɛɛ ka ɛlɛkitɔrɔnw tilacogo sɛbɛn.',
        'U kelen-kelen bɛɛ bila tabulo kɔnɔ (periyɔdi ni kulu).',
        'U la fila bɛ denbaya kelen na : jumɛnw ? O kɔrɔ ye mun ye ?',
        'Nɔgɔ kɔnɔ, potasiyɔmu bɛ iyɔn cogoya la. Iyɔn jumɛn ?',
      ],
      solution: [
        'N : $(K)^2(L)^5$ ; P : $(K)^2(L)^8(M)^5$ ; K : $(K)^2(L)^8(M)^8(N)^1$.',
        'N : periyɔdi 2nan, kulu 15 ; P : periyɔdi 3nan, kulu 15 ; K : periyɔdi 4nan, kulu 1.',
        'Azɔti ni fosifɔri bɛ kulu 15 kɔnɔ : u bɛ valansi ɛlɛkitɔrɔn 5 ta, u ka simi jogo bɛ ɲɔgɔn bɔ.',
        'Potasiyɔmu ye alikalin ye : a bɛ a ka valansi ɛlɛkitɔrɔn bɔ ka $\\ce{K+}$ di.',
      ],
    },
    {
      title: 'Tawudeni kɔgɔ',
      situation:
        'Kabini sankɛmɛ caman, kɔgɔ bɛ bɔ Tawudeni ka taa n’a ye Tumutu. Nin kɔgɔ ye sodiyɔmu kilorir de ye a fanba la.',
      questions: [
        'Iyɔn jumɛnw bɛ sodiyɔmu kilorir dilan ? U ka kuran ɲɛfɔ ni ɔkitɛti sariya ye.',
        'Sodiyɔmu kilorir sɛbɛncogo sɛbɛn.',
        'Kɔgɔ min ma saniya, maɲeziyɔmu kilorir dɔɔnin bɛ se ka kɛ a kɔnɔ. A sɛbɛncogo sɛbɛn.',
      ],
      solution: [
        'Sodiyɔmu (kulu 1) bɛ ɛlɛkitɔrɔn kelen bɔ → $\\ce{Na+}$ ; kilɔri (kulu 17) bɛ kelen sɔrɔ → $\\ce{Cl-}$. U fila bɛɛ bɛ kuci kɔkan sɔrɔ min ɛlɛkitɔrɔnw ye 8 ye.',
        'Kuran $+$ kelen kuran $-$ kelen ma : $\\ce{NaCl}$.',
        '$\\ce{Mg^{2+}}$ ni $\\ce{Cl-}$ 2 : $\\ce{MgCl2}$.',
      ],
    },
  ],
};
