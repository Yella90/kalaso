import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Pili kura V 1,5 min bɛ tɔrisi balo, o dawolo la tansiyɔn bɛ dɔgɔ ni V 1,5 ye ni tɔrisi manalen don. Vɔliti minnu dɛsɛra, olu taara min ? Pili yɛrɛ kɔnɔ : **kɔnɔ rezisitansi** fitinin dɔ b’a la, min bɛ a fanga dɔ ta.',
  objectives: ['ka kuranbɔlan ka fanga lamagalan (f.é.m.) ni a kɔnɔ rezisitansi kɔrɔ fɔ ;', 'ka kuranbɔlan ka Ohm sariya sɛbɛn : U = E − r I ;', 'ka sɔrɔbaga (motɛri, ɛlɛkitɔrɔlizɛri) ka Ohm sariya sɛbɛn : U = E′ + r′ I ;', 'ka sira dɔ ka baarakɛ tomi dɔn.'],
  sections: [
    { title: 'Kuranbɔlan', blocks: [{ legend: ['$E$ : fanga lamagalan (f.é.m.) V la ; $r$ : kɔnɔ rezisitansi Ω la'] }, { text: 'Ni foyi ma siri (I = 0), dawolo tansiyɔn ye E ye. Ni kuranbɔlan bɛ kuran caman di, a tansiyɔn bɛ jigin. Sira surun na (U = 0), a bɛ ɛntansite belebeleba di $I_{cc} = E/r$, o ye farati ye.' }] },
    { title: 'Sɔrɔbaga baarakɛla', blocks: [{ legend: ['$E\'$ : fanga lamagalan kɔsegin (f.c.é.m.) ; $r\'$ : sɔrɔbaga kɔnɔ rezisitansi'] }, { text: 'Motɛri walima ɛlɛkitɔrɔlizɛri bɛ kuran fanga dɔ yɛlɛma ka kɛ fanga wɛrɛ ye (mekaniki, simi). f.c.é.m. bɛ o nafa yɔrɔ jira.' }] },
    {
      title: 'Baarakɛ tomi',
      blocks: [
        { text: 'Sira dɔ kɔnɔ min dilannen bɛ kuranbɔlan (E, r) ni rezisitansiw (R) la ɲɔgɔn nɔfɛ, sira datugulenw ka sariya bɛ nin di : $E = (r + R)\\,I$, o la $I = \\dfrac{E}{r + R}$ (Pouillet ka sariya).' },
        { title: 'pili ni lanpu dɔ', text: 'Pili : E = 4,5 V, r = 1,5 Ω ; lanpu i n’a fɔ R = 7,5 Ω.', steps: ['$I = \\dfrac{4{,}5}{1{,}5 + 7{,}5} = 0{,}5$ A.', '$U = 4{,}5 - 1{,}5 \\times 0{,}5 = 3{,}75$ V pili dawolo la.'] },
      ],
    },
  ],
  essentials: ['Kuranbɔlan : U = E − rI ; sɔrɔbaga : U = E′ + r′I.', 'Ni foyi ma siri, U = E ; sira surun na, I = E/r.', 'Pouillet ka sariya (ɲɔgɔn nɔfɛ) : I = E / (r + R).'],
  exercises: [
    {
      title: 'Pili dawolo la tansiyɔn',
      statement: 'Pili dɔ ka f.é.m. ye V 9,0 ye, a kɔnɔ rezisitansi ye Ω 2,0 ye. A bɛ A 0,50 di.',
      parts: [
        { label: 'A dawolo la tansiyɔn, V la.', steps: ['$U = 9{,}0 - 2{,}0 \\times 0{,}50 = 8{,}0$ V.'] },
        { label: 'Sira surun ɛntansite, A la.', steps: ['$I_{cc} = \\dfrac{9{,}0}{2{,}0} = 4{,}5$ A.'] },
      ],
    },
    {
      title: 'Motɛri fitinin',
      statement: 'Motɛri dɔ (E′ = 4,0 V, r′ = 2,0 Ω) sirilen bɛ batiri dɔ kan (E = 12 V, r = 1,0 Ω).',
      parts: [{ label: 'Kuran ɛntansite, A la (sira datugulen sariya : E = E′ + (r + r′) I).', steps: ['$I = \\dfrac{12 - 4{,}0}{1{,}0 + 2{,}0} = \\dfrac{8}{3} \\approx 2{,}67$ A.'] }],
    },
  ],
  quiz: [
    { question: 'Ni foyi ma siri, kuranbɔlan dawolo la tansiyɔn ye :', choices: ['a ka f.é.m. E', '0', 'rI', 'E/r'], explanation: 'I = 0, o la U = E.' },
    { question: 'Ni kuranbɔlan bɛ kuran caman di, a tansiyɔn bɛ :', choices: ['jigin', 'yɛlɛn', 'to a cogo la', 'kɛ 0 ye tuma bɛɛ'], explanation: 'U = E − rI.' },
    { question: 'Kuran motɛri ye :', choices: ['sɔrɔbaga baarakɛla', 'kuranbɔlan', 'kunduktɛri ɔmiki', 'kuran tigɛlan'], explanation: 'A bɛ kuran fanga yɛlɛma ka kɛ mekaniki fanga ye.' },
    { question: 'Mun na batiri sira surun ye farati ye ?', choices: ['ɛntansite bɛ bon kosɛbɛ', 'tansiyɔn bɛ yɛlɛn', 'kuran bɛ jɔ', 'batiri bɛ falen'], explanation: 'I = E/r, r ka dɔgɔ : juruw bɛ kalaya ka se ka jeni.' },
  ],
  applications: [
    {
      title: 'Moto batiri',
      tagline: 'Mun na fitinɛw bɛ dɔgɔya a wuli waati',
      situation: 'Moto dɔ batiri ka f.é.m. ye V 12,6 ye, a kɔnɔ rezisitansi ye Ω 0,05 ye. A wuli waati, demarɛri bɛ A 80 sama.',
      model: 'U = E − rI.',
      questions: ['Batiri dawolo la tansiyɔn ye joli ye wuli waati ?', 'Mun na fitinɛw bɛ dɔgɔya o waati ?'],
      solution: ['$U = 12{,}6 - 0{,}05 \\times 80 = 8{,}6$ V.', 'Fitinɛw bɛ balo batiri kelen in de fɛ : u tansiyɔn bɛ jigin ka bɔ V 12,6 la ka se V 8,6 ma, u yeelen bɛ dɔgɔya.'],
      fact: 'Batiri kɔrɔlen kɔnɔ rezisitansi ka bon : moto wuli bɛ gɛlɛya.',
    },
  ],
};
