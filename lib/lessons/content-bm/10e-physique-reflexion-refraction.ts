import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Dɔnkɔrɔ min donna baji la, o bɛ i n’a fɔ a karilen bɛ ji ɲɛ kan. Mɔnikɛla min bɛ jɛgɛ dɔ laɲini, o ka kan ka a laɲini duguma ka tɛmɛ a b’a ye yɔrɔ min. Ani tilelafana sira kalaman kan, an bɛ ji dalaw ye minnu tɛ yen. Yeelen bɛ a ɲɛsin yɛlɛma ni a bɛ bɔ fɛn kelen na ka don dɔ wɛrɛ la : o ye **refirakisiyɔn** ye.',
  objectives: ['ka refilekisiyɔn sariyaw fɔ ;', 'ka Snell-Descartes ka refirakisiyɔn sariyaw fɔ ;', 'ka refirakisiyɔn ɲɛnamini jate ;', 'ka refilekisiyɔn dafalen ni ɲɛnamini dan ɲɛfɔ.'],
  sections: [
    { title: 'Refilekisiyɔn', blocks: [{ text: 'Yeelen juru min segin, o bɛ ɲɛ kelen kan ni juru min nana, ani segin ɲɛnamini ye kelen ye ni nali ɲɛnamini ye : $r = i$ (ɲɛnaminiw sumanikɛlen nɔrimali ma).' }, { text: 'Dungare dalen bɛ fɛn dɔ ja di min ye a simetiri ye dungare kɔfɛ.' }] },
    {
      title: 'Refirakisiyɔn',
      blocks: [
        { legend: ['$n$ : fɛn ka refirakisiyɔn hakɛ (fiɲɛ : 1,00 ; ji : 1,33 ; wɛri : 1,5)'] },
        { text: 'Ni yeelen bɛ don fɛn dɔ la min refirakisiyɔn ka bon ($n_2 > n_1$), juru bɛ **gɛrɛ** nɔrimali la ; ni a bɛ bɔ ka taa fɛn dɔ la min refirakisiyɔn ka dɔgɔ, a bɛ **yɔrɔ jan** a la.' },
        { title: 'ka bɔ fiɲɛ na ka taa ji la', text: 'Yeelen juru dɔ bɛ se ji ma ni nali ɲɛnamini 45° ye.', steps: ['$1{,}00 \\times \\sin 45° = 1{,}33 \\times \\sin i_2$', '$\\sin i_2 = \\dfrac{0{,}707}{1{,}33} \\approx 0{,}532$, o la $i_2 \\approx 32°$.'] },
      ],
    },
    { title: 'Refilekisiyɔn dafalen', blocks: [{ legend: ['ɲɛnamini dan, ni yeelen bɛ bɔ fɛn dɔ la min refirakisiyɔn ka bon ($n_1$) ka taa fɛn dɔ la min ta ka dɔgɔ ($n_2$)'] }, { text: 'Ni nali ɲɛnamini tɛmɛna ɲɛnamini dan kan, yeelen bɛɛ bɛ segin : o ye **refilekisiyɔn dafalen** ye. A bɛ yeelen ɲɛminɛ Ɛntɛrinɛti **fibiri ɔpitikiw** kɔnɔ.' }] },
  ],
  essentials: ['Refilekisiyɔn : r = i.', 'Refirakisiyɔn : n₁ sin i₁ = n₂ sin i₂.', 'Ka taa fɛn dɔ la min refirakisiyɔn ka bon, juru bɛ gɛrɛ nɔrimali la.', 'Refilekisiyɔn dafalen ɲɛnamini dan sin λ = n₂/n₁ kɔfɛ.'],
  exercises: [
    { title: 'Ka bɔ fiɲɛ na ka taa wɛri la', statement: 'Yeelen juru dɔ bɛ bɔ fiɲɛ na (n = 1,00) ka don wɛri la (n = 1,50) ni nali ɲɛnamini 30° ye.', parts: [{ label: 'Refirakisiyɔn ɲɛnamini, dɛrɛ la (a dɔɔnin kɔ tan na).', steps: ['$\\sin i_2 = \\dfrac{\\sin 30°}{1{,}50} = \\dfrac{0{,}5}{1{,}5} \\approx 0{,}333$', '$i_2 \\approx 19{,}5°$.'] }] },
    {
      title: 'Ji ka ɲɛnamini dan',
      statement: 'Yeelen bɛ bɔ ji la (n = 1,33) ka taa fiɲɛ na (n = 1,00).',
      parts: [
        { label: 'Ɲɛnamini dan, dɛrɛ la (a kelen kelen).', steps: ['$\\sin \\lambda = \\dfrac{1{,}00}{1{,}33} \\approx 0{,}752$', '$\\lambda \\approx 48{,}8°$, o ye 49° ɲɔgɔn ye.'] },
        { label: 'Juru min bɛ se ji kɔnɔ ni ɲɛnamini 60° ye, o bɛ bɔ fiɲɛ na wa ? (« oui » walima « non »)', steps: ['60° > 49° : refilekisiyɔn dafalen bɛ kɛ.'] },
      ],
    },
  ],
  quiz: [
    { question: 'Nali ni refirakisiyɔn ɲɛnaminiw bɛ sumanikɛ nin ma :', choices: ['nɔrimali', 'ɲɛ kan', 'dugukolo da', 'juru seginnen'], explanation: 'Nɔrimali jɔlen bɛ ɲɛ kan yeelen nayɔrɔ la.' },
    { question: 'Ni yeelen juru jɛngɛlen bɛ bɔ fiɲɛ na ka don ji la, a bɛ :', choices: ['gɛrɛ nɔrimali la', 'yɔrɔ jan nɔrimali la', 'tilennen to', 'segin tuma bɛɛ'], explanation: 'Ji refirakisiyɔn ka bon ni fiɲɛ ta ye.' },
    { question: 'Refilekisiyɔn dafalen bɛ se ka kɛ ni yeelen bɛ taa :', choices: ['ka bɔ ji la ka taa fiɲɛ na', 'ka bɔ fiɲɛ na ka taa ji la', 'ka bɔ fiɲɛ na ka taa wɛri la', 'fu kɔnɔ'], explanation: 'A ka kan ka taa fɛn dɔ la min refirakisiyɔn ka dɔgɔ.' },
    { question: 'Juru min bɛ se ɲɛ kan tɛgɛrɛ jɔlen, o :', choices: ['tɛ ɲɛsin yɛlɛma', 'bɛ segin pewu', 'bɛ ɲɛsin yɛlɛma 90°', 'bɛ tunun'], explanation: 'i = 0 bɛ i₂ = 0 di.' },
  ],
  applications: [
    {
      title: 'Bamakɔ fibiri ɔpitiki',
      tagline: 'Yeelen minɛnen wɛri kɔnɔ',
      situation: 'Ɛntɛrinɛti bɛ se Mali ma fibiri ɔpitiki juruw fɛ. Fibiri kɔnɔ yɔrɔ refirakisiyɔn hakɛ ye 1,48 ye, a lamini wolo ta ye 1,46 ye.',
      model: 'Refilekisiyɔn dafalen kɔnɔ yɔrɔ ni wolo danyɔrɔ la : sin λ = n_wolo / n_kɔnɔ.',
      questions: ['Ɲɛnamini dan ye joli ye, dɛrɛ la ?', 'Mun na yeelen bɛ to fibiri kɔnɔ kilomɛtɛrɛ caman ?'],
      solution: ['$\\sin \\lambda = \\dfrac{1{,}46}{1{,}48} \\approx 0{,}9865$, o la $\\lambda \\approx 80{,}6°$.', 'Juru minnu bɛ i n’a fɔ u ni a cɛmancɛ juru ye ɲɔgɔn cɛ ye, olu bɛ se wolo ma ni ɲɛnamini ye min ka bon ni 80,6° ye : u bɛ segin pewu, siɲɛ ni siɲɛ.'],
      fact: 'Fibiri kelen min ka misɛn ni kunsigi ye, o bɛ se ka kumaɲɔgɔnya miliyɔn caman ta waati kelen na.',
    },
  ],
};
