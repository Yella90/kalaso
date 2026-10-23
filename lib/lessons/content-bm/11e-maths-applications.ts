import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Lise la, kalanden kelen-kelen bɛɛ bɛ matirikili nimɔrɔ sɔrɔ : kalanden fila tɛ nimɔrɔ kelen sɔrɔ abada. Kalanden bɛɛ ka bange don bɛ yen, nka mɔgɔ caman bɛ se ka bange don kelen na. O fɛnw siricogo fila ye **aplikasiyɔnw** ye, ani u jogow (ɛnzɛkitifu, sirizɛkitifu, bizɛkitifu) bɛ kɛ baara la jatebɔ yɔrɔ bɛɛ.',
  objectives: ['ka aplikasiyɔn, ja ani antesedan ɲɛfɔ ;', 'ka aplikasiyɔn ɛnzɛkitifu, sirizɛkitifu, bizɛkitifu dɔn ;', 'ka bizɛkisiyɔn ka resiporoki ɲini ;', 'ka aplikasiyɔn fila kɔnpoze ani ka aplikasiyɔnw jate.'],
  sections: [
    {
      title: 'Aplikasiyɔnw',
      blocks: [
        { term: 'Aplikasiyɔn', text: 'aplikasiyɔn $f$ min bɛ bɔ kulu $E$ la ka taa kulu $F$ la, o bɛ $F$ ka fɛn **kelen dɔrɔn** $f(x)$ siri $E$ ka fɛn $x$ **kelen-kelen bɛɛ** la, o ye a **ja** ye. Ni $f(x) = y$, $x$ ye $y$ ka **antesedan** dɔ ye.' },
        { head: ['Jogo', 'A kɔrɔ', 'Baara la'], rows: [['ɛnzɛkitifu', 'fɛn fila danfaralenw ka jaw ye danfara ye', '$y$ bɛɛ bɛ antesedan **kelen walima si** sɔrɔ'], ['sirizɛkitifu', '$F$ ka fɛn bɛɛ ye fɛn kelen walima caman ka ja ye', '$y$ bɛɛ bɛ antesedan **kelen ni kɔ** sɔrɔ'], ['bizɛkitifu', 'ɛnzɛkitifu ani sirizɛkitifu', '$y$ bɛɛ bɛ antesedan **kelen tigitigi** sɔrɔ']] },
        { title: '$f : \\mathbb{R} \\to \\mathbb{R}$ kalan', blocks: [{ text: 'An bɛ $f(x) = y$ jaabi $y$ o $y$ kama : ni jaabi kelen dɔrɔn bɛ yen tuma bɛɛ, $f$ ye bizɛkitifu ye, ani o jaabi bɛ resiporoki $f^{-1}(y)$ di.' }] },
        { text: 'An bɛ $2x + 3 = y$ jaabi.', steps: ['$x = \\dfrac{y - 3}{2}$ : jaabi kelen dɔrɔn jateden yɛrɛ $y$ bɛɛ kama.', '$f$ ye bizɛkitifu ye ani $f^{-1}(y) = \\dfrac{y - 3}{2}$.'] },
      ],
    },
    {
      title: 'Kɔnpozisiyɔn ni jatebɔ',
      blocks: [
        { legend: ['an bɛ $f$ kɛ fɔlɔ, o kɔ $g$'] },
        { text: 'Ni $E$ bɛ fɛn $p$ ta ani $F$ bɛ fɛn $n$ ta : aplikasiyɔn $n^p$ bɛ yen ka bɔ $E$ la ka taa $F$ la, ani ɛnzɛkisiyɔn $n(n - 1)\\cdots(n - p + 1) = A_n^p$ (ni $p \\leq n$).' },
        { wrong: '« $x \\mapsto x^2$ ye bizɛkitifu ye ka bɔ $\\mathbb{R}$ la ka taa $\\mathbb{R}$ la. »', why: '$-2$ ni $2$ ja ye kelen ye (a tɛ ɛnzɛkitifu ye), ani antesedan si tɛ $-1$ fɛ (a tɛ sirizɛkitifu ye).', reflex: 'Bɔyɔrɔ ni seyɔrɔ kuluw fɔ : $x \\mapsto x^2$ ye bizɛkitifu ye ka bɔ $[0, +\\infty[$ la ka taa $[0, +\\infty[$ la.' },
      ],
    },
  ],
  essentials: ['Aplikasiyɔn : $E$ ka fɛn bɛɛ bɛ ja kelen dɔrɔn sɔrɔ.', 'Ɛnzɛkitifu : antesedan kelen walima si ; sirizɛkitifu : kelen ni kɔ ; bizɛkitifu : kelen tigitigi.', 'Bizɛkisiyɔn : an bɛ $f(x) = y$ jaabi walasa ka $f^{-1}$ sɔrɔ.', 'Aplikasiyɔn $n^p$ ani ɛnzɛkisiyɔn $A_n^p$ ka bɔ kulu min bɛ fɛn $p$ ta la ka taa kulu min bɛ fɛn $n$ ta la.'],
  exercises: [
    { title: 'Bizɛkisiyɔn dɔ', parts: [{ label: '11 ka antesedan.' }, { label: '$(f \\circ f)(1)$ jate.', steps: ['$f(1) = 5$, o kɔ $f(5) = 13$.'] }] },
    { title: 'Aplikasiyɔnw jate', statement: '$E$ bɛ fɛn 3 ta ani $F$ bɛ fɛn 5 ta.', parts: [{ label: 'Aplikasiyɔn hakɛ ka bɔ $E$ la ka taa $F$ la.' }, { label: 'Ɛnzɛkisiyɔn hakɛ ka bɔ $E$ la ka taa $F$ la.' }] },
  ],
  quiz: [
    { question: 'Aplikasiyɔn ye sirizɛkitifu ye ni :', choices: ['seyɔrɔ kulu ka fɛn bɛɛ bɛ antesedan kelen ni kɔ sɔrɔ', 'fɛn fila ka jaw ye danfara ye tuma bɛɛ', 'a bɛ yɛlɛn', 'resiporoki b’a fɛ'], explanation: 'Seyɔrɔ kulu bɛɛ « sɔrɔla ».' },
    { question: '$x \\mapsto x^2$ ka bɔ $\\mathbb{R}$ la ka taa $\\mathbb{R}$ la ye :', choices: ['a tɛ ɛnzɛkitifu ye, a tɛ sirizɛkitifu ye', 'bizɛkitifu', 'ɛnzɛkitifu dɔrɔn', 'sirizɛkitifu dɔrɔn'], explanation: '$f(-2) = f(2)$ ani antesedan si tɛ $-1$ fɛ.' },
    { question: '$x \\mapsto 3x - 6$ ka resiporoki ye :' },
    { question: '$(g \\circ f)(x)$ kɔrɔ ye :', choices: ['ka $f$ kɛ ka sɔrɔ ka $g$ kɛ', 'ka $g$ kɛ ka sɔrɔ ka $f$ kɛ', 'ka $f$ ni $g$ sigiyɔrɔ jate', 'ka $f$ ni $g$ fara ɲɔgɔn kan'] },
  ],
  applications: [
    {
      title: 'Kɛnɛkɛnɛ sɔrɔw',
      tagline: 'Sɔrɔ saba bɛ se ka tila cogo joli la ?',
      situation: 'Lise bɛ sɔrɔ saba danfaralenw di (1nan, 2nan, 3nan), minnu bɛ sugandi jatebɔ kɛnɛkɛnɛ laban kalanden 5 cɛma ; kalanden kelen tɛ se ka sɔrɔ kelen ni kɔ ta.',
      model: 'Tilali kelen ye ɛnzɛkisiyɔn ye ka bɔ sɔrɔ 3 kulu la ka taa kalanden 5 kulu la.',
      questions: ['Sɔrɔ tilacogo joli bɛ se ka kɛ ?'],
      solution: ['Sugandili 5 sɔrɔ 1nan kama, o kɔ 4 sɔrɔ 2nan kama, o kɔ 3 sɔrɔ 3nan kama : $5 \\times 4 \\times 3 = 60$.'],
    },
  ],
};
