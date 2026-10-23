import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Dugu fila bɛ kulu dɔ fan fila fɛ : u cɛ yɔrɔjan tɛ se ka suman o yɔrɔnin bɛɛ. Nka ka bɔ dugu sabanan na, an bɛ yɔrɔjan fila dɔn ani sira fila cɛ ɲɛnamini. **Pɔrɔdui sikalɛri** ni Al-Kashi ka fɔrimili bɛ jaabi di, ani u bɛ kɛ baara la fana ka ɲɛnaminiw, ɔritogonalitiw ani sɛrikili ekwasiyɔnw ɲini.',
  objectives: ['ka pɔrɔdui sikalɛri jate cogo caman na ;', 'ka pɔrɔdui sikalɛri kɛ baara la ka ɔritogonaliti jira walima ka ɲɛnamini jate ;', 'ka Al-Kashi ka fɔrimili kɛ baara la ;', 'ka sɛrikili ekwasiyɔn sɛbɛn ka a dɔn ani ka tomi ni juru cɛ yɔrɔjan jate.'],
  sections: [
    {
      title: 'Pɔrɔdui sikalɛri',
      blocks: [
        { legend: ["fɔrimili filanan bɛ tiɲɛ repɛri ɔritonɔrimali kɔnɔ, ni $\\vec{u}(x\\,;y)$ ani $\\vec{v}(x'\\,;y')$"] },
        { text: 'Wɛkitɛri fila minnu tɛ 0 ye, olu ye **ɔritogonali** ye ni u ka pɔrɔdui sikalɛri ye **0** ye dɔrɔn.' },
        { label: 'Al-Kashi (tiriyangili ABC kɔnɔ)', legend: ['$a = BC$, $b = CA$, $c = AB$ ; ni $\\hat{A} = 90°$, an bɛ Pitagɔri sɔrɔ kokura'] },
        { title: 'dafɛ dɔnbali dɔ', steps: ['$a^2 = 25 + 49 - 2 \\times 5 \\times 7 \\times \\dfrac{1}{2} = 39$, o la $a = \\sqrt{39} \\approx 6{,}24$.'] },
      ],
    },
    {
      title: 'Sɛrikiliw ni yɔrɔjanw',
      blocks: [
        { label: 'Sɛrikili min cɛmancɛ ye $\\Omega(a\\,;b)$ ye, a rayɔn ye $R$' },
        { title: 'sɛrikili dɔnni', steps: ['$(x - 2)^2 - 4 + (y + 3)^2 - 9 - 12 = 0$, o ye $(x - 2)^2 + (y + 3)^2 = 25$ ye.', 'Sɛrikili min cɛmancɛ ye $(2\\,;-3)$, a rayɔn ye 5.'] },
        { label: 'Tomi $M_0$ ni juru $ax + by + c = 0$ cɛ yɔrɔjan' },
        { text: 'Juru ye sɛrikili ka **tanzanti** ye ni cɛmancɛ ni juru cɛ yɔrɔjan ye rayɔn ye.' },
        { wrong: '« $x^2 + y^2 + 2x + 10 = 0$ ye sɛrikili ye. »', why: 'An bɛ $(x + 1)^2 + y^2 = -9$ sɔrɔ : kare tɛ se ka kɛ negatifu ye, o ye kulu lankolon ye.', reflex: 'A labɛnni kɔ, a lajɛ ko fan filanan ye pozitifu ye.' },
      ],
    },
  ],
  essentials: ["$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta = xx' + yy'$ ; ɔritogonali ni a ye 0 ye.", 'Al-Kashi : $a^2 = b^2 + c^2 - 2bc\\cos\\hat{A}$.', 'Sɛrikili : $(x - a)^2 + (y - b)^2 = R^2$ ; karew dafa walasa k’a dɔn.', 'Tomi-juru yɔrɔjan : $\\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.'],
  exercises: [
    { title: 'Pɔrɔdui sikalɛri', parts: [{ label: '$\\vec{u} \\cdot \\vec{v}$ jate.', steps: ['$-12 + 12 = 0$ : $\\vec{u}$ ni $\\vec{v}$ ye ɔritogonali ye.'] }, { label: '$\\vec{u} \\cdot \\vec{w}$ jate.' }, { label: '$\\vec{u}$ ni $\\vec{w}$ cɛ ɲɛnamini, dɛrɛ la (hakɛ gɛrɛfɛla).', steps: ['$\\cos\\theta = \\dfrac{11}{5 \\times \\sqrt{5}} \\approx 0{,}984$, o la $\\theta \\approx 10{,}3°$.'] }] },
    { title: 'Sɛrikili dɔ', statement: 'An bɛ $x^2 + y^2 - 4x + 6y - 12 = 0$ jateminɛ.', parts: [{ label: 'Sɛrikili rayɔn.' }, { label: 'Cɛmancɛ ni juru $3x + 4y - 19 = 0$ cɛ yɔrɔjan.', steps: ['$\\dfrac{|6 - 12 - 19|}{5} = \\dfrac{25}{5} = 5$ : juru ye sɛrikili ka tanzanti ye.'] }] },
  ],
  quiz: [
    { question: '$\\vec{u}(2\\,;-1)$ ni $\\vec{v}(1\\,;2)$ ye :', choices: ['ɔritogonaliw', 'kolineyɛriw', 'kelen', 'ɲɔgɔn sɛgɛnninw'] },
    { question: 'Ni $\\hat{A} = 90°$, Al-Kashi ka fɔrimili bɛ kɛ :', choices: ['Pitagɔri ka teyorɛmu ye', 'sinusiw ka fɔrimili ye', 'Talɛsi ye', '$a = b + c$ ye'] },
    { question: 'Sɛrikili $(x - 1)^2 + (y + 2)^2 = 9$ cɛmancɛ ni a rayɔn ye :', choices: ['$(1\\,;-2)$ ni 3', '$(-1\\,;2)$ ni 3', '$(1\\,;-2)$ ni 9', '$(1\\,;2)$ ni 3'], explanation: 'An bɛ $a = 1$, $b = -2$, $R = \\sqrt{9}$ kalan.' },
    { question: '$\\vec{u} \\cdot \\vec{u}$ ye :' },
  ],
  applications: [
    {
      title: 'Dugu fila kulu kɔfɛ',
      tagline: 'Ka yɔrɔjan suman min tɛ se ka tigɛ',
      situation: 'Ka bɔ dugu A la, sira dɔ bɛ taa dugu B la (km 5) ani dɔ wɛrɛ bɛ taa dugu C la (km 7). Sira fila tilennenw cɛ ɲɛnamini ye 60° ye. Kulu dɔ bɛ a bali ka taa B la ka se C ma o yɔrɔnin bɛɛ.',
      model: 'An bɛ siraw jate sɛgimanw ye ; an bɛ Al-Kashi kɛ baara la.',
      questions: ['B ni C cɛ yɔrɔjan ye joli ye kɔnɔ pan na, km la ?'],
      solution: ['$BC^2 = 5^2 + 7^2 - 2 \\times 5 \\times 7 \\times \\cos 60° = 39$.', '$BC = \\sqrt{39} \\approx 6{,}24$ km.'],
      fact: 'Jɔyɔrɔ sumanikɛlaw tun bɛ tiriyangilasiyɔn kɛ o cogo la ka kartiw dilan, sani GPS ka na.',
    },
  ],
};
