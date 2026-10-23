import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Ntolatan bɔlɔ ka pan, foro dɔ bonya, butiki dɔ ka tɔnɔ : ko caman bɛ ɲɛfɔ ni **polinɔmuw** ye. Ka u sɛbɛn cogo ɲuman na (a jɛnsɛnnen, a faktɔrizelen, a kanoniki), o b’a to an bɛ sanfɛla walima zerow kalan o yɔrɔnin bɛɛ.',
  objectives: ['ka polinɔmu ni a dɛrɛ dɔn ;', 'ka tirinɔmu sɛbɛn a cogo kanoniki la ;', 'ka polinɔmu faktɔrize ni a rasini dɔ dɔnnen don (tilali, Hörner ka fɛɛrɛ) ;', 'ka fonksiyɔn rasiyonɛli nɔgɔman dɔ taamasiyɛn lajɛ.'],
  sections: [
    {
      title: 'Polinɔmuw ni cogo kanoniki',
      blocks: [
        { term: 'Polinɔmu', text: 'fonksiyɔn min cogo ye $P(x) = a_n x^n + \\dots + a_1 x + a_0$ ye ; ni $a_n \\ne 0$, $n$ ye a **dɛrɛ** ye. Polinɔmu dɛrɛ 2 ye **tirinɔmu** ye.' },
        { legend: ['cogo kanoniki ; parabɔli sanfɛla kowɔridone ye $\\left(-\\dfrac{b}{2a}\\,;\\,-\\dfrac{\\Delta}{4a}\\right)$ ye'] },
        { title: 'cogo kanoniki', steps: ['$x^2 - 6x + 5 = (x - 3)^2 - 9 + 5 = (x - 3)^2 - 4$.', 'Sanfɛla $(3\\,;\\,-4)$ ; ani $(x - 3)^2 - 4 = (x - 1)(x - 5)$.'] },
      ],
    },
    {
      title: 'Ka faktɔrize ni rasini dɔ ye',
      blocks: [
        { text: 'Ni $P(\\alpha) = 0$, $P(x)$ bɛ tila $(x - \\alpha)$ la : $P(x) = (x - \\alpha)\\,Q(x)$, $Q$ dɛrɛ ka dɔgɔ ni kelen ye.' },
        { title: 'Hörner ka fɛɛrɛ', text: '$P(x) = x^3 - 2x^2 - 5x + 6$. An bɛ a ye ko $P(1) = 0$.', steps: ['Kowefisiyanw : 1, −2, −5, 6. An bɛ 1 jigin ; $1 \\times 1 - 2 = -1$ ; $-1 \\times 1 - 5 = -6$ ; $-6 \\times 1 + 6 = 0$.', '$Q(x) = x^2 - x - 6 = (x - 3)(x + 2)$, o la $P(x) = (x - 1)(x - 3)(x + 2)$.'] },
      ],
    },
    { title: 'Fonksiyɔn rasiyonɛliw', blocks: [{ text: 'Fonksiyɔn rasiyonɛli ye polinɔmu fila tilali ye $\\dfrac{P(x)}{Q(x)}$, a bɛ yen yɔrɔ minnu na $Q(x) \\ne 0$. An b’a taamasiyɛn lajɛ **taamasiyɛn tabulo** kɔnɔ : faktɔri kelen-kelen bɛɛ bɛ taamasiyɛn yɛlɛma a rasini la.' }] },
  ],
  essentials: ['Δ = b² − 4ac ; cogo kanoniki a(x + b/2a)² − Δ/4a.', 'Ni P(α) = 0, P(x) = (x − α) Q(x).', 'Hörner ka fɛɛrɛ bɛ Q di joona.', 'Tilali taamasiyɛn : taamasiyɛn tabulo, hakɛ minnu kɔnna, olu bɔlen.'],
  simulationTasks: ['dɛrɛ filanan na, a = 1, b = −6, c = 5 labɛn : sanfɛla ni rasiniw kalan ;', 'a taamasiyɛn yɛlɛma : parabɔli bɛ kɛ mun ye ?'],
  exercises: [
    { title: 'Parabɔli sanfɛla', parts: [{ label: 'Sanfɛla abisisi.', steps: ['$-\\dfrac{b}{2a} = \\dfrac{8}{4} = 2$.'] }, { label: 'Sanfɛla ordone (P hakɛ dɔgɔmanba).', steps: ['$P(2) = 8 - 16 + 3 = -5$.'] }] },
    { title: 'Polinɔmu dɛrɛ 3 faktɔrize', statement: '$P(x) = x^3 + 2x^2 - x - 2$. An b’a lajɛ ko $P(1) = 0$ ka $P(x) = (x - 1)(x^2 + bx + c)$ sɛbɛn.', parts: [{ label: 'b hakɛ.', steps: ['Hörner : 1 ; $1 + 2 = 3$ ; $3 - 1 = 2$ ; $2 - 2 = 0$. O la $Q(x) = x^2 + 3x + 2$.'] }, { label: 'c hakɛ.', steps: ['$Q(x) = x^2 + 3x + 2 = (x + 1)(x + 2)$, o la $P(x) = (x - 1)(x + 1)(x + 2)$.'] }] },
  ],
  quiz: [
    { question: '$3x^4 - x + 7$ dɛrɛ ye :', explanation: 'x pisansi belebeleba de don.' },
    { question: 'Ni $P(2) = 0$, P bɛ tila nin na :', explanation: '2 ye P ka rasini ye.' },
    { question: '$x^2 + 4x$ cogo kanoniki ye :', explanation: '(x + 2)² = x² + 4x + 4.' },
    { question: 'Ni $a < 0$, parabɔli $y = ax^2 + bx + c$ ɲɛsinnen bɛ :', choices: ['duguma', 'sanfɛ', 'kini fɛ', 'a bɛ bɔ c la'], explanation: 'Sanfɛla ye hakɛ belebeleba ye o tuma.' },
  ],
  applications: [
    {
      title: 'Bissap ji butiki ka tɔnɔ',
      tagline: 'Bissap ji ka feere sɔngɔ jumɛn na ?',
      situation: 'Musoden baarakɛla dɔ bɛ bissap ji feere. Ni a bɛ butɛli feere FCFA kɛmɛ x la, a ka tile kelen tɔnɔ, FCFA waa la, ye $B(x) = -2x^2 + 16x - 14$ ye.',
      model: 'Tɔnɔ ka bon kosɛbɛ parabɔli sanfɛla la, $x = -\\dfrac{b}{2a}$ la.',
      questions: ['Sɔngɔ jumɛn na (FCFA la) tɔnɔ ka bon kosɛbɛ ?', 'O tɔnɔ belebeleba ye joli ye, FCFA waa la ?'],
      solution: ['$x = \\dfrac{-16}{-4} = 4$ kɛmɛ, o ye FCFA 400 ye.', '$B(4) = -32 + 64 - 14 = 18$ FCFA waa.'],
      fact: 'Ni a sɔngɔ ka gɛlɛn kojugu, a tɛ feere caman ; ni a ka nɔgɔn kojugu, tɔnɔ ka dɔgɔ butɛli kelen-kelen bɛɛ la : parabɔli sanfɛla bɛ sɔngɔ ɲuman di.',
    },
  ],
};
