import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Mamamuso ka du kɔnɔ, kunkolo 10 ni sen 28 bɛ jate sisɛw ni zanw cɛ. U kelen-kelen bɛɛ ye joli ye ? O gɛlɛya kɔrɔ bɛ jaabi sira kelen kɔnɔ ni **ekwasiyɔn sistɛmu** ye. Ani ekwasiyɔn gɛlɛn dɔw, minnu bɛ rasiniw walima pisansi 4 ta, olu bɛ se ka segin ekwasiyɔn dɛrɛ filanan na.',
  objectives: ['ka ekwasiyɔn bikare jaabi ni dɔnbali yɛlɛmali ye ;', 'ka ekwasiyɔn irasiyonɛli jaabi ka jaabiw lajɛ ;', 'ka ɛnekwasiyɔn dɛrɛ filanan jaabi ;', 'ka ekwasiyɔn linɛyɛri fila walima saba sistɛmu jaabi.'],
  sections: [
    {
      title: 'Ka segin dɛrɛ filanan na',
      blocks: [
        { title: 'ekwasiyɔn bikare $x^4 - 5x^2 + 4 = 0$', text: 'An bɛ $X = x^2$ sigi ($X \\geq 0$).', steps: ['$X^2 - 5X + 4 = 0$ bɛ $X = 1$ walima $X = 4$ di.', '$x^2 = 1$ walima $x^2 = 4$ : jaabi naani, $-2$, $-1$, $1$, $2$.'] },
        { title: 'ekwasiyɔn irasiyonɛli $\\sqrt{x + 5} = x - 1$', text: 'Sharati : $x - 1 \\geq 0$ (rasini kare ye pozitifu ye) ani $x + 5 \\geq 0$.', steps: ['An b’a kɛ kare ye : $x + 5 = x^2 - 2x + 1$, o ye $x^2 - 3x - 4 = 0$ ye : $x = 4$ walima $x = -1$.', '$x = -1$ tɛ $x \\geq 1$ bɛn ; $x = 4$ lajɛli : $\\sqrt{9} = 3 = 4 - 1$. Jaabi : $x = 4$.'] },
        { wrong: '« Ni an y’a kɛ kare ye, an bɛ jaabi sɔrɔlen bɛɛ mara. »', why: 'Kare kɛli bɛ se ka jaabi nanbaraw fara a kan ($a^2 = b^2$ tɛ $a = b$ di tuma bɛɛ).', reflex: 'Sharatiw sɛbɛn ka kɔn, ka jaabi kelen-kelen bɛɛ lajɛ ekwasiyɔn fɔlɔ kɔnɔ.' },
      ],
    },
    {
      title: 'Ɛnekwasiyɔn dɛrɛ filananw',
      blocks: [
        { text: 'Walasa ka $ax^2 + bx + c > 0$ (walima $< 0$) jaabi, an bɛ tirinɔmu rasiniw ɲini, o kɔ k’a taamasiyɛn kɛ baara la : $a$ taamasiyɛn rasiniw kɛnɛma, a sɛgɛnnin u cɛ.' },
        { text: 'Rasiniw : $-2$ ni $3$ ; $a = 1 > 0$.', steps: ['Tirinɔmu ye negatifu ye a rasiniw cɛ : $S = ]-2\\,;3[$.'] },
      ],
    },
    {
      title: 'Sistɛmu linɛyɛriw',
      blocks: [
        { blocks: [{ items: ['**ɲɔgɔnnɔnalali** : dɔnbali kelen sɛbɛn dɔ wɛrɛ fɛ ekwasiyɔn kelen kɔnɔ, o kɔ k’a bila dɔ wɛrɛ kɔnɔ ;', '**kɔnbinezɔn** : ekwasiyɔnw sigiyɔrɔ jate walasa u farali kɔ dɔnbali kelen ka bɔ ;', 'dɔnbali saba kama : dɔnbali kelen bɔ walasa ka segin ekwasiyɔn fila sistɛmu na.'] }] },
        { title: 'sisɛw ni zanw', text: 'Sisɛ $p$ ni zan $\\ell$ : $p + \\ell = 10$ (kunkolow) ani $2p + 4\\ell = 28$ (senw).', steps: ['Fɔlɔ fɛ : $p = 10 - \\ell$.', '$2(10 - \\ell) + 4\\ell = 28 \\Rightarrow 2\\ell = 8 \\Rightarrow \\ell = 4$, o kɔ $p = 6$.'] },
      ],
    },
  ],
  essentials: ['Bikare : $X = x^2 \\geq 0$ sigi.', 'Irasiyonɛli : sharatiw, kare kɛli, lajɛli.', 'Ɛnekwasiyɔn dɛrɛ filanan : rasiniw, o kɔ tirinɔmu taamasiyɛn.', 'Sistɛmuw : ɲɔgɔnnɔnalali walima kɔnbinezɔn.'],
  exercises: [
    { title: 'Bikare', statement: 'An bɛ $x^4 - 5x^2 + 4 = 0$ jaabi.', parts: [{ label: 'Ekwasiyɔn bɛ jaabi yɛrɛ joli sɔrɔ ?', steps: ['$x^2 = 1$ walima $x^2 = 4$ : $\\pm 1$ ani $\\pm 2$.'] }, { label: 'Jaabi belebeleba ye jumɛn ye ?' }] },
    { title: 'Irasiyonɛli', statement: 'An bɛ $\\sqrt{x + 5} = x - 1$ jaabi.', parts: [{ label: 'Jaabi di.', steps: ['$x^2 - 3x - 4 = 0$ : 4 walima $-1$ ; 4 dɔrɔn de bɛ $x \\geq 1$ bɛn.'] }] },
    { title: 'Ekwasiyɔn saba sistɛmu', statement: 'Sugu la, ɲɔ kilo 1, malo kilo 1 ani sukaro kilo 1 sɔngɔ ye F 1 300 ye u bɛɛ lajɛlen. Malo sɔngɔ bɛ tɛmɛ ɲɔ ta kan F 100, sukaro ta bɛ tɛmɛ malo ta kan F 200.', parts: [{ label: 'Ɲɔ kilo kelen sɔngɔ (F la).', steps: ['$m + r + s = 1\\,300$, $r = m + 100$, $s = r + 200 = m + 300$.', 'Ɲɔgɔnnɔnalali fɛ : $3m + 400 = 1\\,300$, o la $m = 300$ F.'] }, { label: 'Sukaro kilo kelen sɔngɔ (F la).', steps: ['$s = m + 300 = 600$ F (ani $r = 400$ F ; a bɛɛ lajɛlen : $300 + 400 + 600 = 1\\,300$ F).'] }] },
  ],
  quiz: [
    { question: 'Walasa ka $x^4 - 13x^2 + 36 = 0$ jaabi, an bɛ nin sigi :', explanation: 'Ekwasiyɔn bɛ kɛ $X^2 - 13X + 36 = 0$ ye.' },
    { question: '$x^2 - 4 > 0$ jaabiw kulu ye :', explanation: 'A ye pozitifu ye rasiniw $\\pm 2$ kɛnɛma.' },
    { question: 'Mun na ekwasiyɔn irasiyonɛli jaabiw ka kan ka lajɛ ?', choices: ['kare kɛli bɛ se ka jaabi nanbaraw fara a kan', 'walasa ka jatebɔ filiw dɔrɔn bali', 'bawo $\\Delta$ bɛ se ka kɛ negatifu ye', 'a nafa tɛ'], explanation: '$a^2 = b^2$ bɛ $a = -b$ fana di.' },
    { question: 'Sistɛmu $x + y = 5$, $x - y = 1$ jaabi ye :', explanation: 'Ni an y’u fara ɲɔgɔn kan : $2x = 6$.' },
  ],
  applications: [
    {
      title: 'Sisɛw ni zanw',
      tagline: 'Gɛlɛya kɔrɔ dɔ sira kelen kɔnɔ',
      situation: 'Du kɔnɔ, kunkolo 10 ni sen 28 bɛ jate sisɛw ni zanw cɛ.',
      model: 'Sisɛ bɛ sen 2 ta, zan bɛ sen 4 ta.',
      questions: ['Zan joli bɛ yen ?'],
      solution: ['$p + \\ell = 10$ ani $2p + 4\\ell = 28$.', 'Ni an ye fɔlɔ siɲɛ fila bɔ filanan na : $2\\ell = 8$, o la zan 4 ani sisɛ 6.'],
    },
  ],
};
