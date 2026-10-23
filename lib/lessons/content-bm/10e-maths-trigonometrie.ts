import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Cogo di an bɛ se ka lu kɔnɔ bana jiri belebele janya dɔn k’a sɔrɔ an ma yɛlɛn a kan ? A bɛ se ni an ye a ni an cɛ sumanikɛ ani an bɛ a kunkolo ye ɲɛnamini min kɔnɔ. **Trigonometiri** bɛ tiriyangili ɲɛnamini jɔlenma ɲɛnaminiw ni janyaw siri ɲɔgɔn na.',
  objectives: ['ka kozinusi, sinusi ani tanzanti kɛ baara la tiriyangili ɲɛnamini jɔlenma kɔnɔ ;', 'ka ɲɛnamini kɔrɔbaw hakɛw dɔn ;', 'ka dɛrɛ yɛlɛma radiyan ye ani a sɛgɛnnin ;', 'ka bɛnni cos² x + sin² x = 1 kɛ baara la.'],
  sections: [
    { title: 'Trigonometiri bɛnniw', blocks: [{}, {}, { title: 'jiri janya', text: 'An bɛ jɔ jiri juru la mɛtɛrɛ 20 la, ka a kunkolo ye ɲɛnamini 35° kɔnɔ (ɲɛw bɛ dugukolo kan mɛtɛrɛ 1,6 la).', steps: ['$h = 20 \\times \\tan 35° \\approx 20 \\times 0{,}700 = 14{,}0$ m ɲɛw sanfɛ.', 'Jiri janya : $14{,}0 + 1{,}6 = 15{,}6$ m.'] }] },
    { title: 'Ɲɛnamini kɔrɔbaw', blocks: [{}] },
    {
      title: 'Dɛrɛ ni radiyan',
      blocks: [
        {},
        { text: 'Radiyan ye ɲɛnamini ye min bɛ arki dɔ minɛ sɛrikili rayɔn $R$ kan, min janya ye $R$ ye. Arki min ɲɛnamini ye $\\alpha$ ye (rad la), o janya ye $\\ell = R\\,\\alpha$ ye.' },
        { wrong: '« sin 30 = 0,5 » jatebɔlan kan min labɛnnen don radiyan na.', why: 'Radiyan na, sin 30 bɛ rad 30 ka sinusi jate, o ye −0,99 ɲɔgɔn ye.', reflex: 'I ka jatebɔlan labɛncogo DEG walima RAD lajɛ tuma bɛɛ.' },
      ],
    },
  ],
  essentials: ['cos = dafɛ gɛrɛfɛla/ipotenizi ; sin = ɲɛfɛla/ipotenizi ; tan = ɲɛfɛla/dafɛ gɛrɛfɛla.', 'cos² x + sin² x = 1.', 'π rad = 180° ; arki ℓ = Rα (α rad la).', 'Ka 30°, 45° ni 60° hakɛw mara hakili la.'],
  exercises: [
    {
      title: 'A yɛlɛma',
      statement: 'Ɲɛnamini sumanikɛliw yɛlɛma.',
      parts: [
        { label: '135° radiyan na (a dɔɔnin kɔ kɛmɛ na).', steps: ['$135 \\times \\dfrac{\\pi}{180} = \\dfrac{3\\pi}{4} \\approx 2{,}36$ rad.'] },
        { label: '$\\dfrac{5\\pi}{6}$ rad dɛrɛ la.', steps: ['$\\dfrac{5 \\times 180}{6} = 150°$.'] },
      ],
    },
    {
      title: 'Kozinusi ɲini',
      statement: 'x ye ɲɛnamini dɔgɔman ye min $\\sin x = 0{,}6$.',
      parts: [
        { label: '$\\cos x$ hakɛ.', steps: ['$\\cos^2 x = 1 - 0{,}36 = 0{,}64$ ; x ye ɲɛnamini dɔgɔman ye o la $\\cos x = 0{,}8$.'] },
        { label: '$\\tan x$ hakɛ.', steps: ['$\\tan x = \\dfrac{0{,}6}{0{,}8} = 0{,}75$.'] },
      ],
    },
  ],
  quiz: [
    { question: '$\\cos 60°$ ye :', explanation: 'Ani sin 60° = √3/2.' },
    { question: '$\\pi$ radiyan ye :', choices: ['180°', '90°', '360°', '3,14°'], explanation: 'Munumununi tilancɛ.' },
    { question: 'Tiriyangili ɲɛnamini jɔlenma kɔnɔ, ɲɛnamini dɔ ka tanzanti ye :', choices: ['ɲɛfɛla ÷ dafɛ gɛrɛfɛla', 'dafɛ gɛrɛfɛla ÷ ipotenizi', 'ɲɛfɛla ÷ ipotenizi', 'ipotenizi ÷ ɲɛfɛla'], explanation: 'tan = sin/cos.' },
    { question: 'x o x kama, $\\cos^2 x + \\sin^2 x$ ye :', choices: ['1', '0', '2', 'a bɛ bɔ x la'], explanation: 'O ye Pitagɔri ka teyoremu ye trigonometiri sɛrikili kan.' },
  ],
  applications: [
    {
      title: 'Lakɔli rampu',
      tagline: 'Rampu dilan fɛnmisɛnnin sigilan kama',
      situation: 'Lakɔli b’a fɛ ka rampu dilan walasa ka tɛmɛ dakun mɛtɛrɛ 0,50 kan. Sigilan wotoroma kama, rampu jɛngɛli man kan ka tɛmɛ ɲɛnamini 5° kan.',
      model: 'Tiriyangili ɲɛnamini jɔlenma kɔnɔ : tan 5° = sanfɛla ÷ janya dalen.',
      questions: ['Janya dalen dɔgɔmanba joli ka kan, m la ?', 'Rampu yɛrɛ janya bɛ kɛ joli ye o tuma ?'],
      solution: ['$d = \\dfrac{0{,}50}{\\tan 5°} = \\dfrac{0{,}50}{0{,}0875} \\approx 5{,}71$ m.', 'Rampu janya : $\\dfrac{0{,}50}{\\sin 5°} \\approx 5{,}74$ m.'],
      fact: 'Daɲɛ « trigonométrie » bɔra gɛrɛki kan na : « tiriyangiliw sumanikɛli ».',
    },
  ],
};
