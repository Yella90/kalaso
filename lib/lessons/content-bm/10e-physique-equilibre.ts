import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Ji daga min bɛ muso dɔ kun na min bɛ taama tilennen, lanpu min dulonnen bɛ sanfɛ, kurun min bɛ ji kan : o fɛnw bɛɛ bɛ fanga caman sɔrɔ, nka u bɛ to bɛnnen. Fangaw bɛ ɲɔgɔn « ban » cogo jumɛn na ?',
  objectives: ['ka fanga minnu bɛ fɛn gɛlɛn dɔ kan, olu jate ;', 'ka fɛn gɛlɛn min bɛ fanga fila sɔrɔ, o bɛnni sariyaw fɔ, o kɔ fanga saba ta ;', 'ka sigiyɔrɔ jaabi ni juru samali kɛ baara la ;', 'ka bɛnni gɛlɛya dɔ ɲɛ ni jatebɔ walima ja ye.'],
  sections: [
    {
      title: 'Fɛn gɛlɛn min bɛ fanga fila sɔrɔ',
      blocks: [
        { text: 'Fɛn gɛlɛn min bɛ fanga fila sɔrɔ, o bɛnnen don ni o fangaw **sira kelen** kan, u **hakɛ kelen**, u **fan tɛ kelen ye** : $\\vec F_1 + \\vec F_2 = \\vec 0$.' },
        { title: 'lanpu dulonnen', text: 'Lanpu bɛ a girinya $\\vec P$ (duguma) ni juru samali $\\vec T$ (sanfɛ) sɔrɔ.', steps: ['Bɛnni na : $T = P = m g$.', 'Lanpu kilo 0,5 kama : $T = 0{,}5 \\times 9{,}8 = 4{,}9$ N.'] },
        { term: 'Sigiyɔrɔ jaabi', text: 'fanga $\\vec R$ min bɛ kɛ dugukolo walima fɛn sigiyɔrɔ fɛ fɛn sigilen kan. Ni nɔgɔnni tɛ, a jɔlen bɛ sigiyɔrɔ kan.' },
      ],
    },
    {
      title: 'Fɛn gɛlɛn min bɛ fanga saba sɔrɔ',
      blocks: [
        { text: 'Fɛn gɛlɛn min bɛ fanga saba sɔrɔ minnu tɛ ɲɔgɔn cɛ ye, o bɛnnen don ni : u siraw bɛ **ɲɛ kelen kan** ani u bɛ **ɲɔgɔn tigɛ** tomi kelen na ; u **wɛkitɛri faralen** ye 0 ye : $\\vec F_1 + \\vec F_2 + \\vec F_3 = \\vec 0$.' },
        { text: 'Ja la, ni wɛkitɛri saba bilala ɲɔgɔn nɔfɛ, u bɛ **tiriyangili datugulen** dilan. An bɛ se ka u bila juru fila kan fana : juru kelen-kelen bɛɛ kan, u yɔrɔw faralen ye 0 ye.' },
        { title: 'kɛsu kulu kan', text: 'Kɛsu dɔ girinya ye $P = 200$ N ye, juru dɔ b’a mina kulu kan min jɛngɛlen don 30°, nɔgɔnni tɛ.', steps: ['Kulu ɲɛsin kan : $T = P \\sin 30° = 200 \\times 0{,}5 = 100$ N.', 'Tɛgɛrɛ jɔlen kan : $R = P \\cos 30° \\approx 173$ N.'] },
      ],
    },
  ],
  essentials: ['Fanga fila bɛnnen : sira kelen, hakɛ kelen, fan danfaralenw.', 'Fanga saba : ɲɛ kelen kan, u bɛ ɲɔgɔn tigɛ, u wɛkitɛri faralen ye 0 ye (tiriyangili datugulen).', 'An bɛ a ɲɛ ka u bila juru fila tɛgɛrɛ jɔlenw kan.'],
  exercises: [
    {
      title: 'Juru samali',
      statement: 'Banana kilo 12 dulonnen bɛ juru dɔ la. g = N/kg 9,8.',
      parts: [{ label: 'Juru samali, N la.', steps: ['Bɛnni na, $T = P = 12 \\times 9{,}8 = 117{,}6$ N.'] }],
    },
    {
      title: 'Moto rampu kan',
      statement: 'Moto kilo 100 minɛnen bɛ juru dɔ fɛ rampu kan min jɛngɛlen don 20°. Nɔgɔnni tɛ ; g = N/kg 9,8.',
      parts: [
        { label: 'Juru samali, N la.', steps: ['$P = 980$ N.', '$T = P \\sin 20° = 980 \\times 0{,}342 \\approx 335$ N.'] },
        { label: 'Rampu jaabi, N la.', steps: ['$R = P \\cos 20° = 980 \\times 0{,}940 \\approx 921$ N.'] },
      ],
    },
  ],
  quiz: [
    { question: 'Gafe min bilalen bɛ tabali kan, o bɛ nin sɔrɔ :', choices: ['a girinya ni tabali jaabi', 'a girinya dɔrɔn', 'fanga si tɛ', 'jaabi dɔrɔn'], explanation: 'Fanga fila bɛ ɲɔgɔn ban.' },
    { question: 'Fanga saba bɛnnenw siraw bɛ :', choices: ['ɲɔgɔn tigɛ tomi kelen na', 'ɲɔgɔn cɛ, fan kelen', 'tɛgɛrɛ jɔlen ɲɔgɔn na', 'cogo bɛɛ'], explanation: 'U bɛ ɲɔgɔn tigɛ tomi kelen na.' },
    { question: 'Ni wɛkitɛri fanga saba bɛnnenw bilala ɲɔgɔn nɔfɛ, u bɛ nin dilan :', choices: ['tiriyangili datugulen', 'juru tilennen', 'kare', 'sɛrikili'], explanation: 'U wɛkitɛri faralen ye 0 ye.' },
    { question: 'Ni nɔgɔnni tɛ, sigiyɔrɔ jaabi bɛ :', choices: ['jɔ sigiyɔrɔ kan', 'da sigiyɔrɔ kan', 'jɔ tuma bɛɛ', 'kɛ 0 ye'], explanation: 'Ni nɔgɔnni bɛ yen, a bɛ jɛngɛ.' },
  ],
  applications: [
    {
      title: 'Nakɔ hamaki',
      tagline: 'Mun na a man kan ka samali kojugu ?',
      situation: 'Seyidu (kilo 60) bɛ da hamaki cɛmancɛ la. Juru fila kelen-kelen bɛɛ bɛ ɲɛnamini 10° kɛ dugukolo da ma. g = N/kg 9,8.',
      model: 'Fanga saba : girinya ni samali fila. Jɔlen na : 2 T sin 10° = P.',
      questions: ['Juru kelen-kelen bɛɛ samali ye joli ye, N la ?', 'Mun bɛ kɛ ni hamaki samana fo a kɛra dalen ye ?'],
      solution: ['$P = 588$ N ; $T = \\dfrac{588}{2 \\sin 10°} = \\dfrac{588}{0{,}347} \\approx 1\\,693$ N.', 'Ni ɲɛnamini bɛ taa 0 fɛ, sin bɛ taa 0 fɛ, samali bɛ kɛ belebeleba ye : juru walima nɛgɛ minɛnw bɛ kari.'],
      fact: 'Juru kelen-kelen bɛɛ bɛ Seyidu girinya siɲɛ saba ɲɔgɔn ta !',
    },
  ],
};
