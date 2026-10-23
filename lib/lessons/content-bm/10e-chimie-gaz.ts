import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Gazi butɛli min bɛ bɔn gwa kɔnɔ, o ye farati ye : butani tɛ yɛlɛn, a bɛ lajɛ duguma, yɔrɔ min na tasuma mɔmɔni dɔ bɛ se k’a mana. Mun na gazi dɔw bɛ « ben » ani dɔ wɛrɛw bɛ pan, i n’a fɔ ballɔn kɔnɔ eliyɔmu ? Ani gazi molekiliw bɛ jate cogo di, ni a tɛ se ka girinya sɔrɔ nɔgɔya la ? A **bonya** (volime) fɛ.',
  objectives: ['ka Avogadoro-Ampɛri ka sariya fɔ ;', 'ka mɔli volime kɛ baara la ka bɔ volime la ka taa fɛn hakɛ la ;', 'ka gazi dɔ ka dansite jate fiɲɛ fɛ ;', 'ka a dɔn ni gazi bɛ lajɛ bon dugumana walima a sanfɛla la.'],
  sections: [
    {
      title: 'Avogadoro-Ampɛri ka sariya',
      blocks: [
        { text: 'Funteni ni digili kelen kɔnɔ, gazi danfaralenw volime kelenw bɛ **molekili hakɛ kelen** ta.' },
        { term: 'Mɔli volime $V_m$', text: 'gazi mɔli kelen bɛ yɔrɔ min ta. A ye kelen ye gazi bɛɛ kama cogo kelen kɔnɔ : L/mol 22,4 0 °C la ani L/mol 24 20 °C la, fiɲɛ digili kɔrɔba kɔrɔ.' },
        { legend: ['$n$ mol la ; $V$ L la ; $V_m$ L/mol la'] },
        { title: 'karibɔni dioksidi', text: '$\\ce{CO2}$ L 4,8 20 °C la.', steps: ['$n = \\dfrac{4{,}8}{24} = 0{,}20$ mol.', 'Girinya : $0{,}20 \\times 44 = 8{,}8$ g.'] },
      ],
    },
    {
      title: 'Gazi dansite',
      blocks: [
        { legend: ['$M$ : gazi ka mɔli girinya (g/mol) ; g/mol 29 : fiɲɛ ka mɔli girinya mɔyɛni'] },
        { text: 'Ni $d > 1$, gazi ka girin ni fiɲɛ ye, a bɛ lajɛ duguma ; ni $d < 1$, a ka fɔɔn, a bɛ yɛlɛn.' },
        { head: ['Gazi', '$M$ (g/mol)', '$d$', 'A kɛcogo'], rows: [['diidirozɛni $\\ce{H2}$', '2', '0,07', 'a bɛ yɛlɛn joona kosɛbɛ'], ['metani $\\ce{CH4}$ (gazi sabatilen)', '16', '0,55', 'a bɛ yɛlɛn'], ['karibɔni dioksidi $\\ce{CO2}$', '44', '1,5', 'a bɛ lajɛ duguma'], ['butani $\\ce{C4H10}$', '58', '2,0', 'a bɛ lajɛ dugukolo da la']] },
        { wrong: '« Butani mɔli kelen bɛ yɔrɔ ta ka tɛmɛ diidirozɛni mɔli kelen kan, bawo a molekiliw ka bon. »', why: 'Gazi kɔnɔ, molekiliw ka jan ɲɔgɔn na kosɛbɛ : u bonya tɛ fɛn ye ka caya.', reflex: '$V_m$ ye kelen ye gazi bɛɛ kama, cogo kelen kɔnɔ.' },
      ],
    },
  ],
  essentials: ['Avogadoro-Ampɛri : gazi volime kelenw (T kelen, P kelen) ⇒ molekili hakɛ kelen.', '$n = \\frac{V}{V_m}$ ; $V_m = 22{,}4$ L/mol 0 °C la, L/mol 24 20 °C la.', 'Dansite fiɲɛ fɛ : $d = \\frac{M}{29}$ ; $d > 1$ : gazi bɛ lajɛ duguma.'],
  exercises: [
    {
      title: 'Volime ni fɛn hakɛ',
      statement: 'An bɛ karibɔni dioksidi L 4,8 lajɛ 20 °C la ($V_m = 24$ L/mol).',
      parts: [{ label: 'Fɛn hakɛ (mol la).' }, { label: 'O gazi girinya (g la).' }, { label: 'Molekili joli b’a kɔnɔ ? (sɛbɛncogo 1.2e23 bɛ sɔn)' }],
    },
    {
      title: 'A ka girin walima a ka fɔɔn ni fiɲɛ ye ?',
      statement: 'Dansite jate fiɲɛ fɛ (hakɛ gɛrɛfɛlaw).',
      parts: [{ label: 'Butani dansite ($M = 58$ g/mol).' }, { label: 'Metani dansite ($M = 16$ g/mol).', steps: ['$\\dfrac{16}{29} \\approx 0{,}55$ : metani bɛ yɛlɛn.'] }],
    },
  ],
  quiz: [
    { question: '20 °C la, dioksizɛni mɔli kelen bɛ yɔrɔ min ta :', explanation: 'Mɔli volime tɛ bɔ gazi suguya la.' },
    { question: 'Gazi min dansite ye 0,6 ye :', choices: ['a bɛ yɛlɛn fiɲɛ kɔnɔ', 'a bɛ lajɛ duguma', 'a bɛ to a nɔ na', 'a ye ji ye'], explanation: '$d < 1$ : a ka fɔɔn ni fiɲɛ ye.' },
    { question: 'Ballɔn fila volime kelen, funteni ni digili kelen kɔnɔ, kelen bɛ diidirozɛni ta, dɔ wɛrɛ bɛ karibɔni dioksidi ta. U bɛ :', choices: ['molekili hakɛ kelen ta', 'girinya kelen ta', 'diidirozɛni molekili caman ta', 'karibɔni dioksidi molekili caman ta'], explanation: 'Avogadoro-Ampɛri ka sariya.' },
    { question: 'Gazi mɔli 0,5 0 °C la bɛ yɔrɔ min ta :' },
  ],
  applications: [
    {
      title: 'Gwa kɔnɔ gazi bɔnni',
      tagline: 'Butani bɛ lajɛ yɔrɔ jumɛn ?',
      situation: 'Gazi kasa bɛ jɛnsɛn gwa kɔnɔ : butani butɛli tuyo bɛ bɔn. $M(\\ce{C4H10}) = 58$ g/mol.',
      model: 'An bɛ butani ka mɔli girinya ni fiɲɛ ta sanga ɲɔgɔn ma.',
      questions: ['Butani dansite ye joli ye fiɲɛ fɛ ?', 'Ni gazi bɛ bɔn, mun ka kan ka kɛ ?'],
      solution: ['$d = \\dfrac{58}{29} = 2$ : butani bɛ lajɛ dugukolo da la.', 'Butɛli robinɛ datugu, foyi kana mana (tasuma tɛ, kuran sɔgɔlan tɛ), daw ni finɛtiriw dayɛlɛ walasa fiɲɛ ka don dugumana.'],
      fact: 'Butani kasa tɛ : fɛn dɔ kasa ka gɛlɛn bɛ fara a kan walasa bɔnni ka se ka dɔn.',
    },
  ],
};
