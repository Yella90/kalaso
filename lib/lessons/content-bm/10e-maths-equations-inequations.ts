import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Sugu la, malo kilo 3 ni sukaro kilo 2 sɔngɔ ye FCFA 2 900 ye ; malo kilo 1 ni sukaro kilo 4 sɔngɔ ye FCFA 2 300 ye. U kelen-kelen bɛɛ sɔngɔ ye joli ye ? Ka gɛlɛya dɔ bila **ekwasiyɔnw** na ka u jaabi, o ye jatebɔ nafamaw minɛn fɔlɔ ye.',
  objectives: ['ka ekwasiyɔn dɛrɛ filanan jaabi ni diskiriminan ye ;', 'ka tirinɔmu taamasiyɛn lajɛ ka ɛnekwasiyɔn jaabi ;', 'ka ekwasiyɔn fila sistɛmu jaabi ;', 'ka ekwasiyɔn saba sistɛmu jaabi ni Gauss ka pivo ye.'],
  sections: [
    {
      title: 'Ekwasiyɔn dɛrɛ filananw',
      blocks: [
        {},
        { head: ['$\\Delta$', 'Jaabiw'], rows: [['$\\Delta > 0$', 'fila : $x_{1,2} = \\dfrac{-b \\pm \\sqrt\\Delta}{2a}$'], ['$\\Delta = 0$', 'kelen : $x_0 = -\\dfrac{b}{2a}$'], ['$\\Delta < 0$', 'jaabi yɛrɛ si tɛ']] },
        { text: 'Tirinɔmu taamasiyɛn ye **a ta ye** rasiniw kɛnɛma, a sɛgɛnnin bɛ rasiniw cɛ (ni rasini fila bɛ yen).' },
        { title: 'ɛnekwasiyɔn dɔ', text: '$x^2 - x - 6 < 0$ jaabi.', steps: ['$\\Delta = 1 + 24 = 25$ ; rasiniw ye $-2$ ni $3$ ye.', '$a = 1 > 0$ : tirinɔmu ye negatifu ye rasiniw cɛ. $S = ]-2\\,;\\,3[$.'] },
      ],
    },
    {
      title: 'Sistɛmu linɛyɛriw',
      blocks: [
        { text: 'Sistɛmu 2 × 2 kama, an bɛ **ɲɔgɔnnɔnalali** walima **kombinɛzɔnw** kɛ (ekwasiyɔn dɔ sigiyɔrɔ jatebɔ walasa ka a dɔnbali dɔ bɔ). Sistɛmu 3 × 3 kama, **Gauss ka pivo** bɛ dɔnbaliw bɔ kelen kelen walasa ka sistɛmu tiriyangilima sɔrɔ.' },
        { title: 'malo ni sukaro', steps: ['An bɛ ekwasiyɔn filanan sigiyɔrɔ jatebɔ 3 la : $3r + 12s = 6\\,900$.', 'An bɛ fɔlɔ bɔ a la : $10s = 4\\,000$, o la $s = 400$ FCFA.', '$r = 2\\,300 - 1\\,600 = 700$ FCFA.'] },
      ],
    },
  ],
  essentials: ['Δ = b² − 4ac : jaabi fila, kelen walima si, a taamasiyɛn fɛ.', 'Tirinɔmu ye a taamasiyɛn ye rasiniw kɛnɛma.', 'Sistɛmuw : ɲɔgɔnnɔnalali, kombinɛzɔn, Gauss ka pivo.', 'Jaabi lajɛ tuma bɛɛ ekwasiyɔn fɔlɔw kɔnɔ.'],
  exercises: [
    { title: 'Ekwasiyɔn dɔ jaabi', statement: '$2x^2 - 3x - 2 = 0$ jaabi.', parts: [{ label: 'Diskiriminan $\\Delta$.', steps: ['$\\Delta = 9 + 16 = 25$.'] }, { label: 'Jaabi belebeleba.', steps: ['$x = \\dfrac{3 + 5}{4} = 2$ ; dɔ wɛrɛ ye $\\dfrac{3 - 5}{4} = -0{,}5$ ye.'] }] },
    { title: 'Gauss ka pivo', parts: [{ label: 'z hakɛ.', steps: ['$L_2 - 2L_1$ : $-3y - z = -9$ ; $L_3 - L_1$ : $y - 2z = -4$.', 'Sabanan fɛ : $y = 2z - 4$ ; filanan kɔnɔ : $-6z + 12 - z = -9$, o la $z = 3$.'] }, { label: 'x hakɛ.', steps: ['$y = 2$, o kɔ $x = 6 - 2 - 3 = 1$.'] }] },
  ],
  quiz: [
    { question: 'Ni $\\Delta < 0$, ekwasiyɔn $ax^2 + bx + c = 0$ bɛ :', choices: ['jaabi yɛrɛ si sɔrɔ', 'jaabi kelen sɔrɔ', 'jaabi fila sɔrɔ', 'jaabi caman caman sɔrɔ'], explanation: 'Negatifu rasini tɛ se ka ta.' },
    { question: '$x^2 = 9$ jaabiw ye :', choices: ['−3 ni 3', '3 dɔrɔn', '9', '81'], explanation: 'I kana jaabi negatifu ɲinɛ.' },
    { question: '$x^2 + 1 > 0$ ye tiɲɛ ye :', choices: ['jateden yɛrɛ x bɛɛ kama', 'x si kama', 'x > 0 dɔrɔn kama', 'x = 1 kama'], explanation: 'Kare ni 1 faralen ye pozitifu ye tuma bɛɛ.' },
    { question: 'Gauss ka pivo bɛ kɛ :', choices: ['ka sistɛmu linɛyɛriw jaabi', 'ka diskiriminan jate', 'ka parabɔli ja', 'ka mɔyɛni jate'], explanation: 'Dɔnbaliw bɛ bɔ kelen kelen.' },
  ],
  applications: [
    {
      title: 'Kooperatifu ka dugukolo',
      tagline: 'A bonyaw ɲini',
      situation: 'Musow ka kooperatifu dɔ bɛ dugukolo kare-jan m² 1 200 sɔrɔ. A janya bɛ tɛmɛ a bonya kan mɛtɛrɛ 10.',
      model: 'Ni x ye bonya ye : x(x + 10) = 1 200, o la x² + 10x − 1 200 = 0.',
      questions: ['Dugukolo bonya ye joli ye, m la ?', 'Mun na jaabi wɛrɛ bɛ bɔ ?'],
      solution: ['$\\Delta = 100 + 4\\,800 = 4\\,900$ ; $x = \\dfrac{-10 + 70}{2} = 30$ m (janya m 40).', 'Jaabi wɛrɛ ye −40 ye : janya tɛ se ka kɛ negatifu ye.'],
      fact: 'Babilɔni mɔgɔw tun bɛ o gɛlɛya suguya jaabi foro kama san 4 000 ni kɔ.',
    },
  ],
};
