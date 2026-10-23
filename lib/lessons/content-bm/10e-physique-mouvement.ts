import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Ibrahima sigilen bɛ Bamakɔ–Segu kar kɔnɔ : a tɛ lamaga a ka sigilan ma, nka a bɛ taa km/h 80 sira dafɛ sirabaw ma. Jɔn ka kuma ye tiɲɛ ye ? U fila bɛɛ : lamagali bɛ ɲɛfɔ tuma bɛɛ **fɛn dɔ ma**.',
  objectives: ['ka referansiyɛli sugandi ka taama sira ɲɛfɔ ;', 'ka teliya cɛmancɛ jate ka km/h yɛlɛma m/s ye ;', 'ka lamagali sabatilen, teliyali ani dɔgɔyali danfara dɔn ;', 'ka tomiw sɛbɛnni dɔ kɛ baara la.'],
  sections: [
    {
      title: 'Referansiyɛli ni taama sira',
      blocks: [
        { term: 'Referansiyɛli', text: 'fɛn min ma an bɛ lamagali dɔ lajɛ, ni repɛri ni wagati sumanikɛlan ye. Dugukolo **referansiyɛli** (dugukolo) de bɛ kɛ ka tɛmɛ.' },
        { term: 'Taama sira', text: 'tomi dɔ yɔrɔ tɛmɛnenw bɛɛ. A bɛ se ka kɛ juru tilennen, sɛrikili walima kurubu ye.' },
        { title: 'nɛgɛso wotoro walifu', text: 'Nɛgɛsotigi kama, walifu bɛ sɛrikili ja ; mɔgɔ jɔlen kama, a bɛ kuruw ja (sikloyidi).' },
      ],
    },
    {
      title: 'Teliya',
      blocks: [
        { legend: ['$v$ m/s la ; $d$ yɔrɔjan min tigɛra m la ; $\\Delta t$ waati s la'] },
        { text: 'Walasa ka km/h yɛlɛma m/s ye, an bɛ a tila 3,6 la : $1 \\text{ m/s} = 3{,}6 \\text{ km/h}$.' },
        { text: '**Teliya waati kelen** ye teliya ye waati kelen na (sumanikɛlan ta). An bɛ a jate ni teliya cɛmancɛ ye waati surun kosɛbɛ kɔnɔ.' },
        {
          head: ['Lamagali', 'Teliya', 'Kronofoto kan'],
          rows: [
            ['sabatilen', 'a tɛ yɛlɛma', 'tomiw cɛ ye kelen ye'],
            ['teliyali', 'a bɛ caya', 'tomiw cɛ bɛ ka bon'],
            ['dɔgɔyali', 'a bɛ dɔgɔya', 'tomiw bɛ ka gɛrɛ ɲɔgɔn na'],
          ],
        },
      ],
    },
  ],
  essentials: ['Lamagali bɛ bɔ referansiyɛli min sugandira o de la.', 'v = d / Δt ; m/s 1 = km/h 3,6.', 'Sabatilen : teliya tɛ yɛlɛma ; teliyali walima dɔgɔyali : a bɛ yɛlɛma.', 'Kronofoto : tomiw cɛ bɛ teliya yɛlɛmacogo jira.'],
  exercises: [
    {
      title: 'Bamakɔ–Segu kar',
      statement: 'Kar bɛ km 235 tigɛ Bamakɔ ni Segu cɛ lɛri 3 ni miniti 30 kɔnɔ.',
      parts: [
        { label: 'Kar teliya cɛmancɛ km/h la (a dɔɔnin kɔ tan na).', steps: ['lɛri 3 ni miniti 30 = lɛri 3,5.', '$v = \\dfrac{235}{3{,}5} \\approx 67{,}1$ km/h.'] },
        { label: 'O teliya m/s la (a dɔɔnin kɔ tan na).', steps: ['$\\dfrac{67{,}1}{3{,}6} \\approx 18{,}6$ m/s.'] },
      ],
    },
    {
      title: 'Kronofoto dɔ',
      statement: 'Bɔlɔnin dɔ ja bɛ ta segɔn 0,1 o segɔn 0,1. Yɔrɔ fila tugulen cɛ ye : cm 2, cm 2, cm 2, cm 2.',
      parts: [
        { label: 'Bɔlɔnin teliya m/s la.', steps: ['$v = \\dfrac{0{,}02}{0{,}1} = 0{,}2$ m/s.'] },
        { label: 'Lamagali ye sabatilen, teliyali walima dɔgɔyali ye ? (faransikan na : uniforme, accéléré, ralenti)', steps: ['Tomiw cɛ ye kelen ye : teliya tɛ yɛlɛma.'] },
      ],
    },
  ],
  quiz: [
    { question: 'km/h 90 ye :', choices: ['m/s 25', 'm/s 324', 'm/s 9', 'm/s 90'], explanation: '90 ÷ 3,6 = m/s 25.' },
    { question: 'Mɔgɔ sigilen tren dɔ kɔnɔ min bɛ taa, o tɛ lamaga nin ma :', choices: ['wagɔn', 'nɛgɛsira', 'gari', 'jiriw'], explanation: 'Lamagali bɛ bɔ referansiyɛli de la.' },
    { question: 'Kronofoto kan, tomi minnu cɛ bɛ ka bon, olu bɛ lamagali nin jira :', choices: ['teliyali', 'dɔgɔyali', 'sabatilen', 'sɛrikili'], explanation: 'Yɔrɔjan min tigɛra waati kelen-kelen bɛɛ kɔnɔ, o bɛ caya.' },
    { question: 'Kalo ka taama sira Dugukolo lamini bɛ i n’a fɔ :', choices: ['sɛrikili', 'juru tilennen', 'zigizagi', 'a jɔlen'], explanation: 'Dugukolo referansiyɛli la, Kalo bɛ munumunu Dugukolo lamini.' },
  ],
  applications: [
    {
      title: 'Kati sira radari',
      tagline: 'Bolifɛnmisɛnbolila bɛ teliya kojugu la wa ?',
      situation: 'Kati sira kan, dugu tigɛli la, teliya dan ye km/h 50 ye. Tomi fila cɛ ye mɛtɛrɛ 100 ye ; zandarimu dɔ bɛ moto dɔ waati sumanikɛ, a bɛ u tɛmɛ segɔn 6,0 kɔnɔ.',
      model: 'v = d / Δt, o kɔ a yɛlɛma km/h ye.',
      questions: ['Moto teliya ye joli ye km/h la ?', 'A bɛ sariya tiɲɛ wa ?'],
      solution: ['$v = \\dfrac{100}{6{,}0} \\approx 16{,}7$ m/s, o ye $16{,}7 \\times 3{,}6 = 60$ km/h ye.', 'Ɔwɔ : a bɛ taa km/h 60 la, ka tɛmɛ dan km/h 50 kan.'],
      fact: 'km/h 60 la, moto bɛ mɛtɛrɛ 17 ɲɔgɔn tigɛ segɔn kelen kɔnɔ min hakili tɛ a la.',
    },
  ],
};
