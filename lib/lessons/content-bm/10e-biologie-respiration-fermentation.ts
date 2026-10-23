import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Buru mugu bɛ funu, dolo (ɲɔ dolo) bɛ fununw bɔ, ani boli kɛla min ninakili bɛ teliya, a senw bɛ dimi : fɛn saba minnu sababu ye kelen ye. Seliliw bɛ fanga sɔrɔ glukozi la, ni oksizɛni ye (**ninakili**) walima ka sɔrɔ a tɛ (**fɛrimantasiyɔn**).',
  objectives: [
    'ka ninakili jateminɛ sɛbɛn ;',
    'ka alikɔli fɛrimantasiyɔn ni laktiki fɛrimantasiyɔn jateminɛw sɛbɛn ;',
    'ka fanga min bɛ sɔrɔ u fila la, o suma ;',
    'ka fɛrimantasiyɔn nafaw fɔ Mali la.',
  ],
  sections: [
    {
      title: 'Selili ninakili',
      blocks: [
        {},
        { text: 'A bɛ kɛ **mitɔkɔndiriw** kɔnɔ. Glukozi ɔkisidasiyɔn dafalen don : a bɛ fanga caman bɔ, kilozuli 2 860 ɲɔgɔn glukozi mol kelen o mol kelen, o dɔ bɛ mara **ATP** cogo la.' },
        { caption: 'Mitɔkɔndiri, ninakili yɔrɔ.' },
        { title: 'CO₂ jira', text: 'Fiɲɛ min bɔra ninakili la, ni o tɛmɛna kalaji kɔnɔ, a b’a ɲɛ ɲagami : karibɔni dioksidi bɛ a la.' },
      ],
    },
    {
      title: 'Fɛrimantasiyɔnw',
      blocks: [
        { label: 'alikɔli fɛrimantasiyɔn (levirw)' },
        { label: 'laktiki fɛrimantasiyɔn (bakiteriw, fasaw)' },
        {
          head: ['', 'Ninakili', 'Fɛrimantasiyɔn'],
          rows: [
            ['oksizɛni', 'a mako b’a la', 'a mako t’a la'],
            ['glukozi tiɲɛcogo', 'a dafalen (CO₂ + H₂O)', 'a ma dafa (alikɔli walima asidi laktiki)'],
            ['fanga glukozi kelen kɔnɔ', 'a ka bon (ATP 36 ɲɔgɔn)', 'a ka dɔgɔ (ATP 2)'],
            ['misaliw', 'baganw, jiriw', 'buru ni dolo levirw ; fènè bakiteriw'],
          ],
        },
        { text: 'Baara gɛlɛn waati, fasa bɛ oksizɛni dɛsɛ : a bɛ laktiki fɛrimantasiyɔn kɛ. Asidi laktiki bɛ fasa sɛgɛn dɔ fara a kan.' },
      ],
    },
  ],
  essentials: [
    'Ninakili : glukozi + O₂ → CO₂ + H₂O + fanga caman (mitɔkɔndiriw).',
    'Alikɔli fɛrimantasiyɔn : glukozi → etanɔli + CO₂ ; laktiki : glukozi → asidi laktiki.',
    'Fɛrimantasiyɔn bɛ kɛ ni oksizɛni tɛ, a fanga ka dɔgɔ kosɛbɛ.',
    'Nafaw : buru, dolo, fènè (nɔnɔ kumunin), marali.',
  ],
  exercises: [
    {
      title: 'Nafa sɔrɔlenw suma',
      statement: 'Glukozi mol kelen bɛ ATP 36 ɲɔgɔn di ninakili fɛ, ATP 2 fɛrimantasiyɔn fɛ.',
      parts: [
        { label: 'Ninakili bɛ ATP siɲɛ joli di ka tɛmɛ ?', steps: ['$\\dfrac{36}{2} = 18$.'] },
        { label: 'Levir ka kan ka glukozi mol joli fɛrimantasiyɔn kɛ walasa ka ATP hakɛ kelen sɔrɔ i n’a fɔ mol kelen ninakili ?', steps: ['Glukozi siɲɛ 18 de ka kan : o de kosɔn levirw bɛ sukaro ban joona.'] },
      ],
    },
    {
      title: 'Buru mugu ka gazi',
      statement: 'Levirw bɛ glukozi g 18 (M = 180 g/mol) fɛrimantasiyɔn kɛ mugu kɔnɔ. Fur funteni na, gazi mol kelen bɛ L 24 ɲɔgɔn ta.',
      parts: [
        { label: 'Glukozi hakɛ min fɛrimantasiyɔn kɛra, mol la.', steps: ['$n = \\dfrac{18}{180} = 0{,}1$ mol.'] },
        { label: 'CO₂ hakɛ min bɔra, L la (L/mol 24 fɛ).', steps: ['Glukozi kelen bɛ CO₂ fila di : $0{,}2$ mol.', '$0{,}2 \\times 24 = 4{,}8$ L : o gazi de bɛ mugu funu.'] },
      ],
    },
  ],
  quiz: [
    {
      question: 'Selili ninakili bɛ kɛ :',
      choices: ['mitɔkɔndiriw kɔnɔ', 'kolorɔpilasitiw kɔnɔ', 'kɛsɛ kɔnɔ', 'wakuyɔli kɔnɔ'],
      explanation: 'Mitɔkɔndiri ye selili fanga dilanyɔrɔ ye.',
    },
    {
      question: 'Dolo min bɛ fɛrimantasiyɔn kɛ, a fununw ye :',
      choices: ['karibɔni dioksidi', 'oksizɛni', 'idirozɛni', 'azɔti'],
      explanation: 'Alikɔli fɛrimantasiyɔn bɛ CO₂ ni etanɔli dilan.',
    },
    {
      question: 'Fènè (nɔnɔ kumunin) bɛ sɔrɔ :',
      choices: ['laktiki fɛrimantasiyɔn fɛ', 'alikɔli fɛrimantasiyɔn fɛ', 'ninakili fɛ', 'fotosentɛzi fɛ'],
      explanation: 'Bakiteriw bɛ laktozi yɛlɛma ka kɛ asidi laktiki ye, o bɛ nɔnɔ kumunin.',
    },
    {
      question: 'Fɛn jumɛn bɛ fanga caman bɔ glukozi molekili kelen kɔnɔ ?',
      choices: ['ninakili', 'alikɔli fɛrimantasiyɔn', 'laktiki fɛrimantasiyɔn', 'u bɛɛ ye kelen ye'],
      explanation: 'Glukozi ɔkisidasiyɔn dafalen bɛ ATP siɲɛ 18 ɲɔgɔn di.',
    },
  ],
  applications: [
    {
      title: 'Bɛnba ka fènè',
      tagline: 'Mun na nɔnɔ kumunin bɛ mara ?',
      situation: 'Umu bɛnba bɛ kunu nɔnɔ kumunin dɔɔnin fara nɔnɔ kura kan, ka file datugu ka tile kelen kɔnɔ. Nɔnɔ bɛ kɛ gɛlɛn, a kumunin. Nɔnɔ litiri kelen bɛ laktozi g 48 ɲɔgɔn sɔrɔ, laktozi g 1 bɛ asidi laktiki g 1 ɲɔgɔn di.',
      model: 'Laktiki fɛrimantasiyɔn nɔnɔ kumunin bakiteriw fɛ.',
      questions: ['Asidi laktiki hakɛ belebeleba joli bɛ se ka dilan nɔnɔ L 2 kɔnɔ ?', 'Mun na kunu nɔnɔ kumunin bɛ fara a kan ?'],
      solution: [
        '$2 \\times 48 = 96$ g laktozi, o la asidi laktiki g 96 ɲɔgɔn.',
        'A bɛ laktiki bakiteri ɲumanw lase, olu bɛ fɛrimantasiyɔn daminɛ joona. Kumuya bɛ banakisɛ juguw bali ka caya.',
      ],
      fact: 'Buru, dolo, sumbala ani fènè bɛɛ bɛ labɛn fɛrimantasiyɔnw de fɛ.',
    },
  ],
};
