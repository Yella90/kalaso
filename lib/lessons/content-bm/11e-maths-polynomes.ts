import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Menizie dɔ bɛ kare tigɛ kɛrɛnkɛrɛnnen kaliti dilan dɔ nugu naani na walasa ka bwati dilan min datugulan tɛ : a volime bɛ bɔ kare bonya la ni sɛbɛncogo dɛrɛ sabanan ye. Walasa ka bonya minnu bɛ volime ɲininen di sɔrɔ, ekwasiyɔn polinɔmiyali ka kan ka jaabi, o la ka a dɔn ka polinɔmu **faktɔrize**.',
  objectives: ['ka polinɔmu, a dɛrɛ ani a kowefisiyanw dɔn ;', 'ka polinɔmu faktɔrize ni a rasini dɔ dɔnnen don ;', 'ka polinɔmuw tilali ewiklidiyɛni kɛ ;', 'ka polinɔmu taamasiyɛn ni firakisiyɔn rasiyonɛli dɔnyɔrɔ kalan.'],
  sections: [
    {
      title: 'Polinɔmuw ni rasiniw',
      blocks: [
        { term: 'Polinɔmu', text: 'fonksiyɔn min cogo ye $P(x) = a_nx^n + a_{n-1}x^{n-1} + \\dots + a_1x + a_0$ ye ni $a_n \\neq 0$ ; $n$ ye a **dɛrɛ** ye. Jateden yɛrɛ $a$ min bɛ $P(a) = 0$ bɛn, o ye $P$ ka **rasini** (walima zero) ye.' },
        { text: 'Ni $a$ ye $P$ ka rasini ye, $P(x)$ bɛ faktɔrize ni $(x - a)$ ye : $P(x) = (x - a)\\,Q(x)$, $Q$ dɛrɛ ye $n - 1$ ye.' },
        { text: '$P(1) = 1 - 6 + 11 - 6 = 0$ : 1 ye rasini ye.', steps: ['An bɛ $Q(x) = x^2 + bx + c$ ɲini min bɛ $P(x) = (x - 1)(x^2 + bx + c)$ bɛn ; idantifikasiyɔn fɛ, $Q(x) = x^2 - 5x + 6$.', '$Q$ rasiniw ye 2 ni 3 ye : $P(x) = (x - 1)(x - 2)(x - 3)$.'] },
      ],
    },
    {
      title: 'Tilali ewiklidiyɛni ni tirinɔmu',
      blocks: [
        { text: 'Polinɔmu fila $A$ ni $B$ kama ($B \\neq 0$), fila kelen dɔrɔn $(Q, R)$ bɛ yen min bɛ $A = BQ + R$ bɛn, ni $R = 0$ walima $\\deg R < \\deg B$. An b’a sɔrɔ ni tilali sigili ye i n’a fɔ jatew ta.' },
        { label: 'Tirinɔmu $ax^2 + bx + c$' },
        { text: 'Tirinɔmu taamasiyɛn ye $a$ ta ye a rasiniw kɛnɛma, a sɛgɛnnin bɛ a rasiniw cɛ. Polinɔmu faktɔrizelen kama, an bɛ **taamasiyɛn tabulo** dilan.' },
        { wrong: '« Firakisiyɔn $\\dfrac{x^2 - 1}{x - 1}$ ye $x + 1$ ye yɔrɔ bɛɛ. »', why: 'A tɛ yen $x = 1$ la.', reflex: 'Tuma bɛɛ, dɔnyɔrɔ di ka kɔn firakisiyɔn rasiyonɛli nɔgɔyali ɲɛ.' },
      ],
    },
  ],
  essentials: ['Rasini $a$ ⇒ $P(x) = (x - a)Q(x)$.', 'Tilali ewiklidiyɛni : $A = BQ + R$ ni $\\deg R < \\deg B$.', 'Tirinɔmu : $\\Delta$, rasiniw, faktɔrizasiyɔn ; $a$ taamasiyɛn rasiniw kɛnɛma.', 'Firakisiyɔn rasiyonɛli : hakɛ minnu bɛ dugumajate kɛ 0 ye, olu bɔ.'],
  exercises: [
    { title: 'Ka faktɔrize', parts: [{ label: '$P(2)$ jate.', steps: ['$8 - 24 + 22 - 6 = 0$ : 2 fana ye rasini ye.'] }, { label: '$P$ ka rasini belebeleba ye jumɛn ye ?' }, { label: '$x$ jateden dafalen joli 0 ni 4 cɛ (u fila bɛ a la) bɛ $P(x) = 0$ bɛn ?' }] },
    { title: 'Tirinɔmu dɔ', parts: [{ label: 'Diskiriminan jate.' }, { label: 'Rasini negatifu di.', steps: ['$x = \\dfrac{3 \\pm 5}{4}$ : $2$ ni $-\\dfrac{1}{2}$.'] }] },
  ],
  quiz: [
    { question: '$3x^4 - x + 7$ dɛrɛ ye :', explanation: '$x$ pisansi belebeleba.' },
    { question: 'Ni $P(-2) = 0$, $P(x)$ bɛ tila nin na :' },
    { question: '$x^2 - 5x + 6$ ye negatifu ye ni :', choices: ['$2 < x < 3$', '$x < 2$', '$x > 3$', '$x$ si tɛ'], explanation: '$a > 0$ : negatifu rasiniw 2 ni 3 cɛ.' },
    { question: 'Firakisiyɔn $\\dfrac{x + 1}{x^2 - 4}$ tɛ yen :', choices: ['$-2$ ni $2$ la', '$-1$ la', '$4$ la', '$0$ la'], explanation: '$x^2 - 4 = 0$ ni $x = \\pm 2$.' },
  ],
  applications: [
    {
      title: 'Kaliti bwati',
      tagline: 'Volime jumɛn tigɛcogo fɛ ?',
      situation: 'Kaliti dilan cm 30 ni cm 20 kɔnɔ, an bɛ kare min dafɛ ye $x$ cm tigɛ nugu kelen-kelen bɛɛ la, o kɔ ka daw kɔrɔta walasa ka bwati dilan min datugulan tɛ.',
      model: 'Volime ye $V(x) = x(30 - 2x)(20 - 2x)$ ye, ni $0 < x < 10$.',
      questions: ['Ni $x = 3$ cm, bwati volime ye joli ye, cm³ la ?'],
      solution: ['$V(3) = 3 \\times 24 \\times 14 = 1\\,008$ cm³, o ye litiri 1 ɲɔgɔn ye.', 'Ni an y’a jɛnsɛn, $V(x) = 4x^3 - 100x^2 + 600x$ : polinɔmu dɛrɛ 3.'],
    },
  ],
};
