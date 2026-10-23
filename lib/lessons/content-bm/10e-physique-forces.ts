import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Ni Awa bɛ wotoro digi Medina sugu la, wotoro bɛ taa ɲɛ… nka Awa bɛ a kalama wotoro b’a digi kɔ fɛ. Ni magaɲɛti bɛ pɔnpɛ sama, pɔnpɛ fana bɛ magaɲɛti sama. Fanga tɛ taa a kelen : kɛwale bɛɛ bɛ jaabi sɔrɔ.',
  objectives: ['ka maganni fangaw ni yɔrɔjan fangaw danfara dɔn ;', 'ka fanga jira ni wɛkitɛri ye (a bila yɔrɔ, a ɲɛsin, a fan, a hakɛ) ;', 'ka ɲɔgɔn kɛwaleli sariya fɔ ;', 'ka fanga sumanikɛ ni dinamomɛtiri ye.'],
  sections: [
    {
      title: 'Mekaniki kɛwaleliw ni fangaw',
      blocks: [
        { items: ['**maganni kɛwaleliw** : digili, juru samali, fɛn sigiyɔrɔ jaabi, nɔgɔnni ;', '**yɔrɔjan kɛwaleliw** : Dugukolo ka samali (girinya), magaɲɛti ka kɛwale, kuran ka kɛwale.'] },
        { term: 'Fanga', text: 'hakɛ min bɛ mekaniki kɛwale dɔ jira. A bɛ jira ni **wɛkitɛri** ye min bila yɔrɔ, a ɲɛsin, a fan ani a hakɛ (newton la, N) bɛ dɔn.' },
        { text: 'An bɛ fanga sumanikɛ ni **dinamomɛtiri** ye : ressɔri min bɛ jan ka kɛɲɛ ni fanga ye.' },
      ],
    },
    {
      title: 'Ɲɔgɔn kɛwaleli sariya',
      blocks: [
        { text: 'Ni fɛn A bɛ fanga $\\vec F_{A/B}$ kɛ fɛn B kan, B bɛ fanga $\\vec F_{B/A}$ kɛ A kan, u **ɲɛsin kelen**, u **hakɛ kelen**, u **fan tɛ kelen ye** : $\\vec F_{B/A} = -\\vec F_{A/B}$.' },
        { title: 'kurun', text: 'Kurunbolila bɛ baji duguma digi kɔ fɛ ni a ka dɔnkɔrɔ ye ; baji duguma bɛ dɔnkɔrɔ, o la kurun, digi ɲɛ fɛ.' },
        { wrong: '« Fanga fila bɛ ɲɔgɔn ban, o la foyi tɛ lamaga. »', why: 'U bɛ kɛ fɛn fila danfaralenw kan : kelen-kelen bɛɛ bɛ a ta fɛn kan, u tɛ fara ɲɔgɔn kan.', reflex: 'Kɛwale ni jaabi bɛ kɛ fɛn fila danfaralenw kan.' },
      ],
    },
  ],
  essentials: ['Fanga : a bila yɔrɔ, a ɲɛsin, a fan, a hakɛ N la.', 'Maganni walima yɔrɔjan kɛwaleliw.', 'Ɲɔgɔn kɛwaleli : F(B/A) = −F(A/B), fɛn fila danfaralenw kan.', 'Dinamomɛtiri bɛ fangaw sumanikɛ.'],
  exercises: [
    {
      title: 'Fanga jira',
      statement: 'An bɛ fangaw ja bɛnni cm 1 ni N 5 fɛ.',
      parts: [
        { label: 'Wɛkitɛri janya fanga N 30 kama (cm la).', steps: ['$\\dfrac{30}{5} = 6$ cm.'] },
        { label: 'Fanga hakɛ min jiralen bɛ wɛkitɛri cm 2,5 fɛ (N la).', steps: ['$2{,}5 \\times 5 = 12{,}5$ N.'] },
      ],
    },
    {
      title: 'Dinamomɛtiri labɛn',
      statement: 'Ressɔri dɔ bɛ jan cm 2 fanga N 1 kɔrɔ. A janyali bɛ kɛɲɛ ni fanga ye.',
      parts: [{ label: 'A janyali fanga N 3,5 kɔrɔ (cm la).', steps: ['$3{,}5 \\times 2 = 7$ cm.'] }],
    },
  ],
  quiz: [
    { question: 'Magaɲɛti ka samali pɔnpɛ kan ye kɛwale ye min ye :', choices: ['yɔrɔjan ta', 'maganni ta', 'nɔgɔnni ta', 'samali ta'], explanation: 'A bɛ kɛ ka sɔrɔ u ma maga ɲɔgɔn na.' },
    { question: 'Fanga hakɛ ye :', choices: ['newton', 'kilogaramu', 'zuli', 'wati'], explanation: 'A taamasiyɛn ye N ye.' },
    { question: 'Ni Dugukolo bɛ mangoro sama ni N 3 ye, mangoro bɛ Dugukolo sama ni :', choices: ['N 3', 'N 0', 'N 0,3', 'fanga belebeleba'], explanation: 'Ɲɔgɔn kɛwaleli sariya : hakɛ kelen.' },
    { question: 'Walasa ka taa ɲɛ, nɔnnikɛla bɛ ji digi :', choices: ['kɔ fɛ', 'ɲɛ fɛ', 'sanfɛ', 'a tɛ ji digi'], explanation: 'Ji b’a digi ɲɛ fɛ o tuma.' },
  ],
  applications: [
    {
      title: 'Sugu peson',
      tagline: 'Tiga suman ni ressɔri ye',
      situation: 'Kayi sugu la, jagokɛla bɛ tiga bɔrɔw suman ni peson ressɔrima ye. Ressɔri bɛ jan cm 1,2 kilo o kilo. Bɔrɔ dɔ kama, a bɛ jan cm 30.',
      model: 'Janyali bɛ kɛɲɛ ni fanga ye, o la ni girinya ye min bɛ a la.',
      questions: ['Bɔrɔ girinya ye joli ye (kilo la) ?', 'Mun bɛ kɛ ni a tɛmɛna a girinya danba kan ?'],
      solution: ['$\\dfrac{30}{1{,}2} = 25$ kg.', 'Ressɔri bɛ tiɲɛ pewu : janyali tɛ kɛɲɛ tuguni, peson bɛ kɛ nkalon ye.'],
      fact: 'Fanga ni janyali cɛ bɛnni sariya tɔgɔ ye Hooke ka sariya ye.',
    },
  ],
};
