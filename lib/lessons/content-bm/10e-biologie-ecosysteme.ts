import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Jeliba kɔnɔna delta la, ji yɛlɛnni bɛ burugu balo, misiw bɛ min dun ; jɛgɛw bɛ plankitɔn dun ; kɔnɔ jɛmanw bɛ jɛgɛw dun ; Bozo mɔnikɛlaw bɛ ɲɛnamaya mɔni fɛ. Ni o fɛn kelen dɔ tununna, delta bɛɛ bɛ tɔɔrɔ. O fɛn ɲɛnamaw ni u sigiyɔrɔ bɛ **ekosistɛmu** dilan.',
  objectives: [
    'ka ekosistɛmu, biyotɔpu ani biyosenozi kɔrɔ fɔ ;',
    'ka dumuni juru ni dumuni ɲɔgɔnsiri dilan ;',
    'ka fanga bɔnɛ ɲɛfɔ ka bɔ hakɛ kelen na ka taa dɔ wɛrɛ la ;',
    'ka fɛnw ka taama ɲɛfɔ ani tolibagaw ka baara.',
  ],
  sections: [
    {
      title: 'Ekosistɛmu ye mun ye ?',
      blocks: [
        { legend: ['biyotɔpu : sigiyɔrɔ (dugukolo, ji, waati) ; biyosenozi : fɛn ɲɛnamaw bɛɛ'] },
        { text: 'Misaliw : dala, kungo bolo, wula, Jeliba kɔnɔna delta. Fɛn ɲɛnamaw bɛ siri ɲɔgɔn na : dumuni, ɲɔgɔn kɛlɛ, parazitisimu, ɲɔgɔndɛmɛ.' },
      ],
    },
    {
      title: 'Dumuni juruw ni ɲɔgɔnsiriw',
      blocks: [
        {
          items: [
            '**dilanbagaw** : jiri klorofilimaw, minnu bɛ u yɛrɛ ka fɛnw dilan fotosentɛzi fɛ ;',
            '**dunbaga fɔlɔw** : bin dunbagaw ;',
            '**dunbaga filananw ni sabananw** : sogo dunbagaw ;',
            '**tolibagaw** : bakiteriw, bɔgɔlɔw, tumuw, minnu bɛ suw ni nɔgɔw yɛlɛma ka kɛ kɔgɔ minɛralw ye.',
          ],
        },
        { title: 'wula dumuni juru dɔ', text: 'bin → ntonintan → kami → wulu. Taamasiyɛn bɛ a fɔ « … bɛ dun … fɛ ».' },
        { text: 'Yɛrɛyɛrɛ la, juruw bɛ ɲɔgɔn tigɛ : bagan kelen bɛ fɛn caman dun, fɛn caman b’a dun. O ye **dumuni ɲɔgɔnsiri** ye.' },
        { text: 'Hakɛ kelen-kelen bɛɛ la, fanga **90 %** ɲɔgɔn bɛ bɔnɛ (ninakili, funteni, nɔgɔw) : 10 % dɔrɔn de bɛ tɛmɛ hakɛ nata la. O de kosɔn juruw ka surun, sogo dunbaga belebelebaw ka dɔgɔ.' },
      ],
    },
    {
      title: 'Fɛnw ka taama',
      blocks: [
        { text: 'Fɛnw bɛ taama kuru la : dilanbagaw bɛ u ka fɛnw dilan ni CO₂, ji ani kɔgɔ minɛralw ye ; o bɛ tɛmɛ dunbagaw la ; tolibagaw b’a segin kɔgɔ minɛral ni CO₂ cogo la, jiriw bɛ o kɛ baara la kokura.' },
        {
          wrong: '« Fanga bɛ taama kuru la, i n’a fɔ fɛnw. »',
          why: 'Fanga bɛ don tile yeelen fɛ ka bɔ funteni cogo la : a bɛ ekosistɛmu tigɛ ka tɛmɛ, a tɛ segin.',
          reflex: 'Fɛnw : kuru ; fanga : sira kelen taama.',
        },
      ],
    },
  ],
  essentials: [
    'Ekosistɛmu = biyotɔpu (sigiyɔrɔ) + biyosenozi (fɛn ɲɛnamaw).',
    'Dilanbagaw → dunbagaw → tolibagaw ; juruw bɛ ɲɔgɔnsiriw dilan.',
    'Fanga 10 % ɲɔgɔn bɛ tɛmɛ ka bɔ dumuni hakɛ kelen na ka taa nata la.',
    'Fɛnw bɛ taama kuru la tolibagaw fɛ ; fanga bɛ tɛmɛ dɔrɔn.',
  ],
  exercises: [
    {
      title: '10 % sariya',
      statement: 'Ba dɔ la, bin bɛ fanga kJ 100 000 mara. An b’a jate ko 10 % bɛ tɛmɛ hakɛ kelen-kelen bɛɛ la.',
      parts: [
        { label: 'Fanga min bɛ se bin dunbagaw ma (kJ).', steps: ['$100\\,000 \\times 0{,}1 = 10\\,000$ kJ.'] },
        { label: 'Fanga min bɛ se sogo dunbagaw ma minnu bɛ o bin dunbagaw dun (kJ).', steps: ['$10\\,000 \\times 0{,}1 = 1\\,000$ kJ.'] },
      ],
    },
    {
      title: 'Jɔn bɛ mun kɛ ?',
      statement: 'Jaabi ni daɲɛ kelen ye faransikan na : producteur, consommateur walima décomposeur.',
      parts: [
        { label: 'Ji yɛlɛnyɔrɔw burugu.', steps: ['Jiri klorofilima don.'] },
        { label: 'Bɔgɔlɔ min bɛ falen jiri sa kan.', steps: ['A bɛ jiri sa yɛlɛma ka kɛ minɛral ye.'] },
      ],
    },
  ],
  quiz: [
    {
      question: 'Biyotɔpu kɔrɔ ye :',
      choices: ['sigiyɔrɔ', 'fɛn ɲɛnamaw', 'fɛn minnu bɛ tɔw dun', 'jiriw'],
      explanation: 'Biyosenozi ye fɛn ɲɛnamaw bɛɛ ye.',
    },
    {
      question: '« bin → ntonintan → kami » kɔnɔ, ntonintan ye :',
      choices: ['dunbaga fɔlɔ', 'dilanbaga', 'dunbaga filanan', 'tolibaga'],
      explanation: 'A bɛ dilanbaga dun a yɛrɛ ma.',
    },
    {
      question: 'Ni tolibagaw tun tɛ yen :',
      choices: ['kɔgɔ minɛralw tun tɛna segin dugukolo la', 'jiriw tun bɛna falen ka ɲɛ', 'fanga tun bɛna caya', 'foyi tun tɛna yɛlɛma'],
      explanation: 'Fɛnw ka taama tun bɛna jɔ.',
    },
    {
      question: 'Mun na waraw ka dɔgɔ wula la ?',
      choices: ['fanga bɛ dɔgɔya dumuni hakɛ kelen-kelen bɛɛ la', 'u tɛ bin caman dun', 'u ye tolibagaw ye', 'u bɛ fotosentɛzi kɛ'],
      explanation: 'Fɛn caman ka kan, o la bin caman, walasa ka sogo dunbaga kelen balo.',
    },
  ],
  applications: [
    {
      title: 'Delta jɛgɛw',
      tagline: 'Ka mɔni kɛ ka sɔrɔ ka jɛgɛ ban',
      situation: 'Delta dala dɔ la, mɔnikɛlaw bɛ jɛgɛ sogo dunbagaw (sakɔkɔw) tɔni 120 minɛ san o san. O jɛgɛw bɛ jɛgɛ fitinin bin dunbagaw dun, olu bɛ algiw ni plankitɔn dun.',
      model: 'Hakɛ kelen girinya 10 % ɲɔgɔn bɛ sɔrɔ hakɛ nata la.',
      questions: ['Jɛgɛ fitinin tɔni joli tun ka kan walasa ka sakɔkɔ tɔni 120 sɔrɔ ?', 'Mun na mɔni kɛli ni jɔ minnu dingɛw ka misɛn kojugu bɛ bali ?'],
      solution: [
        '$120 \\div 0{,}1 = 1\\,200$ t jɛgɛ fitininw.',
        'Jɔ dingɛ misɛnw bɛ jɛgɛ denw minɛ sani u ka den : u hakɛ bɛ dɔgɔya kosɛbɛ, dumuni juru bɛɛ bɛ tɔɔrɔ.',
      ],
      fact: 'Jeliba kɔnɔna delta ye Afiriki ji yɔrɔ belebelebaw dɔ ye : Erɔpu kɔnɔ miliyɔn caman bɛ nɛnɛ waati kɛ yen.',
    },
  ],
};
