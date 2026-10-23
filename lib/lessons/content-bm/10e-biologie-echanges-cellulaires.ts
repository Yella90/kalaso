import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Walasa ka Jeliba jɛgɛ mara, Mɔpti musow bɛ kɔgɔ kɛ a la ka a ja tile la. Mun na kɔgɔ bɛ jɛgɛ tanga tolili ma ? Ani mun na salati bulu minnu ɲara, olu bɛ gɛlɛya kokura ji kɔnɔ ? A bɛɛ bɛ kɛ seliliw ka manbaranu de la : ji b’a tigɛ ka tɛmɛ.',
  objectives: [
    'ka fɛn wulilen dɔ ka jɛnsɛnni (difizi) ɲɛfɔ ;',
    'ka ozimɔzi kɔrɔ fɔ ka ji taacogo dɔn ka kɔn ;',
    'ka turizesansi ni plazmoliz danfara dɔn ;',
    'ka dumunifɛnw marali ɲɛfɔ ni kɔgɔ walima sukaro ye.',
  ],
  sections: [
    {
      title: 'Difizi (jɛnsɛnni)',
      blocks: [
        { term: 'Difizi', text: 'fɛn wulilen dɔ bɛ taa a yɛrɛ ma ka bɔ yɔrɔ la a **ka ca** yɔrɔ min na ka taa yɔrɔ la a **ka dɔgɔ** yɔrɔ min na, fo a hakɛ ka kɛ kelen ye yɔrɔ fila bɛɛ la.' },
        { title: 'sukaro te kɔnɔ', text: 'Ni sukaro kuru dɔ bilara te weri duguma, a bɛ te bɛɛ timiya, hali ni i m’a ɲɛgɛn : sukaro molekiliw bɛ jɛnsɛn.' },
        { text: 'Oksizɛni bɛ tɛmɛ o cogo la ka bɔ fɔgɔnfɔgɔn kɔnɔ fiɲɛ na ka taa joli la, karibɔni dioksidi bɛ bɔ joli la ka taa fiɲɛ na.' },
      ],
    },
    {
      title: 'Ozimɔzi',
      blocks: [
        { term: 'Ozimɔzi', text: '**ji** tɛmɛni manbaranu fɛ, ka bɔ ji la fɛn wulilenw **ka dɔgɔ** min kɔnɔ (hipotoniki) ka taa ji la u **ka ca** min kɔnɔ (hipɛritoniki).' },
        {
          head: ['Kɛnɛma ji', 'Ji taacogo', 'Jiri selili', 'Joli kisɛ bilenman'],
          rows: [
            ['hipotoniki (ji gansan)', 'a bɛ don selili kɔnɔ', 'a falen ka gɛlɛya (turizesansi)', 'a bɛ funu ka fɛrɛ (hemoliz)'],
            ['izotoniki (kɔgɔ g/L 9)', 'a bɛ don ka bɔ hakɛ kelen', 'a ɲɛ', 'a ɲɛ'],
            ['hipɛritoniki (ji kɔgɔma kosɛbɛ)', 'a bɛ bɔ selili kɔnɔ', 'plazmoliz (wakuyɔli bɛ dɔgɔya)', 'a bɛ ŋunuma'],
          ],
        },
        { caption: 'Jaba bilenman seliliw ka plazmoliz ji kɔgɔma kɔnɔ, a filmulen teliya la.' },
        {
          wrong: '« Ji kɔgɔma kɔnɔ, kɔgɔ bɛ don selili kɔnɔ. »',
          why: 'Manbaranu bɛ ji bila ka tɛmɛ ka nɔgɔya ni kɔgɔ ye : ji de bɛ bɔ.',
          reflex: 'Ji bɛ taa tuma bɛɛ yɔrɔ la fɛnw ka ca yɔrɔ min na.',
        },
      ],
    },
    {
      title: 'Dumunifɛnw marali',
      blocks: [
        { text: 'Jɛgɛ kɔgɔma, kɔnfitiri walima nɔnɔ sukaroma kɔnɔ, ji ye hipɛritoniki ye kosɛbɛ : bakiteriw ni bɔgɔlɔw bɛ u ka ji bɔnɛ ozimɔzi fɛ, u tɛ se ka caya tuguni.' },
        { text: 'Serɔmu fizyolozi (ji kɔgɔma g/L 9) ye **izotoniki** ye ni joli ye : a bɛ se ka boloci ka sɔrɔ joli kisɛ bilenmanw ma tiɲɛ.' },
      ],
    },
  ],
  essentials: [
    'Difizi : fɛn wulilen bɛ taa a ka ca yɔrɔ la ka taa a ka dɔgɔ yɔrɔ la.',
    'Ozimɔzi : ji bɛ manbaranu tigɛ ka taa yɔrɔ la fɛnw ka ca yɔrɔ min na.',
    'Hipotoniki : turizesansi (walima hemoliz) ; hipɛritoniki : plazmoliz.',
    'Kɔgɔ ni sukaro bɛ dumunifɛnw mara ka banakisɛw ka ji bɔ u la.',
  ],
  simulationTasks: [
    'joli kisɛ bilenman bila ji gansan na, o kɔ ji g/L 9 la, o kɔ g/L 20 la ;',
    'o kelen kɛ jiri selili la : mun na a tɛ fɛrɛ ji gansan na ?',
  ],
  exercises: [
    {
      title: 'Serɔmu fizyolozi labɛn',
      statement: 'Serɔmu fizyolozi bɛ kɔgɔ g 9 sɔrɔ litiri kelen kɔnɔ.',
      parts: [
        { label: 'Kɔgɔ hakɛ min bɛ serɔmu mL 250 dilan (g la).', steps: ['mL 250 = L 0,25.', '$9 \\times 0{,}25 = 2{,}25$ g.'] },
        { label: 'Ji g/L 30 ye hipotoniki ye walima hipɛritoniki ye joli kisɛ bilenman kama ?', steps: ['g/L 30 ka ca ni joli kisɛ kɔnɔ ta ye (g/L 9) : ji ye hipɛritoniki ye, ji bɛ bɔ.'] },
      ],
    },
    {
      title: 'Pɔmu dɛtɛri frit',
      statement: 'Pɔmu dɛtɛri frit kelen girinya ye g 10,0 ye. A to ji kɔgɔma kosɛbɛ kɔnɔ lɛri kelen kɔfɛ, a girinya ye g 8,6 ye.',
      parts: [
        { label: 'Girinya bɔnɛ pourcentage la.', steps: ['Bɔnɛ : $10{,}0 - 8{,}6 = 1{,}4$ g.', '$\\dfrac{1{,}4}{10{,}0} \\times 100 = 14$ %.'] },
        { label: 'Fɛn jumɛn bɔra frit kɔnɔ ? (daɲɛ kelen faransikan na : « eau »)', steps: ['Ji bɔra seliliw kɔnɔ ozimɔzi fɛ : plazmoliz kɛra u la, frit bɛ nɔgɔya.'] },
      ],
    },
  ],
  quiz: [
    {
      question: 'Ozimɔzi waati, fɛn min bɛ manbaranu tigɛ ka tɛmɛ, o ye :',
      choices: ['ji', 'kɔgɔ', 'sukaro', 'porotiyiniw'],
      explanation: 'Manbaranu bɛ ji bila ka tɛmɛ.',
    },
    {
      question: 'Jiri selili ji gansan kɔnɔ bɛ kɛ :',
      choices: ['turizesansi', 'plazmoliz', 'a fɛrɛlen', 'a salen'],
      explanation: 'Ji bɛ don, wakuyɔli bɛ funu ; parwa b’a bali ka fɛrɛ.',
    },
    {
      question: 'Mun na jɛgɛ kɔgɔma bɛ mara ?',
      choices: ['banakisɛw bɛ u ka ji bɔnɛ', 'kɔgɔ bɛ banakisɛw jeni', 'kɔgɔ bɛ dingɛw datugu', 'kɔgɔ bɛ jɛgɛ sumaya'],
      explanation: 'Ji kɔgɔma kosɛbɛ bɛ banakisɛw ka ji bɔ ozimɔzi fɛ.',
    },
    {
      question: 'Fɛn wulilen ka difizi bɛ kɛ :',
      choices: ['ka bɔ a ka ca yɔrɔ la ka taa a ka dɔgɔ yɔrɔ la', 'ka bɔ a ka dɔgɔ yɔrɔ la ka taa a ka ca yɔrɔ la', 'kunnasɔrɔ la, ɲɛsin tɛ', 'fiɲɛ dɔrɔn na'],
      explanation: 'A bɛ jɔ ni hakɛw kɛra kelen ye.',
    },
  ],
  applications: [
    {
      title: 'Baginda tomati jalenw',
      tagline: 'Kɔgɔ kɛ walasa ka mara',
      situation: 'Walasa ka a ka tomatiw feere u waati tɛmɛnen kɔ, Kadiyatu bɛ u tila fila ye, ka kɔgɔ kɛ u la ka u ja tile la. Tomati kura kilo 5, ji bɛ min na 94 %, bɛ tomati jalen kilo 0,5 di laban na.',
      model: 'Kɔgɔ bɛ ji sama ka bɔ seliliw kɔnɔ ozimɔzi fɛ, o kɔ tile b’a ja.',
      questions: ['Ji hakɛ joli bɔra (kilo la) ?', 'Mun na bɔgɔlɔw tɛ falen tuguni ?'],
      solution: [
        '$5 - 0{,}5 = 4{,}5$ kg ji bɔra.',
        'Yɔrɔ kɛra hipɛritoniki ye kosɛbɛ, a jalen don : bɔgɔlɔw bɛ u ka ji bɔnɛ yen, u tɛ se ka caya.',
      ],
      fact: 'Hakili kelen in de bɛ kɛ fènè sukaroma, mangoro kɔnfitiri walima delta jɛgɛ jalen-kɔgɔma kama.',
    },
  ],
};
