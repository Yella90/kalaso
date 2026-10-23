import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Kin ka ntolatan ɲɔgɔndan na, ɲɔgɔnkunbɛn joli ka kan walasa ekipu kelen-kelen bɛɛ ka tɔ bɛɛ kunbɛn ? Gundo daɲɛ joli bɛ yen minnu ye jateden 4 ye ? Ntolatannaw 5 bɛ se ka sugandi 12 cɛma cogo joli la ? An tɛ u jate kelen kelen : an bɛ **jatebɔ fɛɛrɛw** kɛ.',
  objectives: ['ka sigiyɔrɔ jatebɔ sariya ni sugandili jiriw kɛ baara la ;', 'ka p-lisiw, aranzimanw ani pɛrimitasiyɔnw jate ;', 'ka kɔnbinezɔnw jate ka Pasikali ka tiriyangili kɛ baara la ;', 'ka fɛɛrɛ bɛnnen sugandi ni bɛnnicogo nafa bɛ a la walima a tɛ.'],
  sections: [
    {
      title: 'Sigiyɔrɔ jatebɔ sariya',
      blocks: [
        { text: 'Ni sugandili bɛ kɛ ni taabolo caman ye ɲɔgɔn kɔ, sira $n_1$ fɔlɔ kama, $n_2$ filanan kama, a ɲɔgɔnnaw, sugandili hakɛ bɛɛ lajɛlen ye $n_1 \\times n_2 \\times \\dots$ ye. Sugandili **jiri** b’a to an bɛ o ye.' },
        { head: ['Cogoya', 'Hakɛ'], rows: [['fɛn $p$ bɛnnicogo la, seginni bɛ sɔn ($p$-lisiw)', '$n^p$'], ['fɛn $p$ bɛnnicogo la, danfaralenw (aranzimanw)', '$A_n^p = n(n - 1)\\cdots(n - p + 1)$'], ['fɛn $n$ bɛɛ, bɛnnicogo dɔ la (pɛrimitasiyɔnw)', '$n! = n \\times (n - 1) \\times \\dots \\times 1$']] },
        { title: 'MALI ka anagaramuw', text: 'Sɛbɛnden naani danfaralenw, k’u bila bɛnnicogo dɔ la.', steps: ['$4! = 24$ anagaramu (MALI, MAIL, LAMI…).'] },
      ],
    },
    {
      title: 'Kɔnbinezɔnw',
      blocks: [
        { legend: ['fɛn $p$ sugandicogo hakɛ fɛn $n$ cɛma, **bɛnnicogo jateminɛbali**'] },
        { label: 'Jogow', legend: ['sariya filanan bɛ **Pasikali ka tiriyangili** jɔ : jateden kelen-kelen bɛɛ ye a sanfɛ fila faralen ye'] },
        { head: ['$n$', 'Pasikali ka tiriyangili ka sira'] },
        { wrong: '« Delege 3 sugandili 10 cɛma : cogo $10 \\times 9 \\times 8 = 720$. »', why: 'O jatebɔ bɛ kulu kelen-kelen bɛɛ jate siɲɛ caman (bɛnnicogo bɛɛ la).', reflex: 'Ni bɛnnicogo nafa tɛ, a tila $p!$ la : $\\frac{720}{6} = 120$.' },
      ],
    },
  ],
  essentials: ['Sigiyɔrɔ jatebɔ sariya : an bɛ taabolo kelen-kelen bɛɛ sira hakɛw sigiyɔrɔ jate.', '$n^p$ (bɛnnicogo, seginni) ; $A_n^p$ (bɛnnicogo, seginni tɛ) ; $n!$ (pɛrimitasiyɔnw).', '$C_n^p = \\frac{n!}{p!(n - p)!}$ ni bɛnnicogo nafa tɛ.', 'Pasikali ka tiriyangili : $C_n^p = C_{n-1}^{p-1} + C_{n-1}^p$.'],
  exercises: [
    { title: 'Kɔdiw ni anagaramuw', statement: 'Nin hakɛw jate.', parts: [{ label: 'Kɔdi hakɛ minnu ye jateden 4 ye (0 ka se 9 ma).' }, { label: 'Kɔdi hakɛ minnu jateden 4 bɛɛ ye danfara ye.' }, { label: 'MALI daɲɛ ka anagaramu hakɛ.' }] },
    { title: 'Sugandili bɛnnicogo kɔ', statement: 'A jate ni kɔnbinezɔnw ye.', parts: [{ label: 'Teri wɔɔrɔ bɛ ɲɔgɔn bolo minɛ fila fila. Bolominɛ joli ?' }, { label: 'Ntolatanna 5 ekipu hakɛ minnu bɛ sugandi 12 cɛma.' }] },
  ],
  quiz: [
    { question: '$5!$ ye :' },
    { question: '$C_{10}^{8}$ ye :' },
    { question: 'Walasa ka biro sigi (peresidan, sekereteri, warimara), an bɛ nin kɛ :', choices: ['aranzimanw', 'kɔnbinezɔnw', '$p$-lisiw', 'Pasikali ka tiriyangili dɔrɔn'], explanation: 'Jɔyɔrɔw ye danfara ye : bɛnnicogo nafa bɛ a la, seginni tɛ.' },
    { question: 'Pasikali ka tiriyangili kɔnɔ, jateden min bɛ 4 ni 6 kɔrɔ (sira 4), o ye :' },
  ],
  applications: [
    {
      title: 'Kin ka ɲɔgɔndan',
      tagline: 'Ɲɔgɔnkunbɛn joli ka kan ka labɛn ?',
      situation: 'Ekipu segin bɛ kin ka ntolatan ɲɔgɔndan na. Ekipu kelen-kelen bɛɛ ka kan ka tɔ kelen-kelen bɛɛ kunbɛn siɲɛ kelen dɔrɔn.',
      model: 'Ɲɔgɔnkunbɛn kelen ye ekipu 2 sugandili ye 8 cɛma, bɛnnicogo kɔ.',
      questions: ['Ɲɔgɔnkunbɛn joli ka kan ka labɛn ?'],
      solution: ['$C_8^2 = \\dfrac{8 \\times 7}{2} = 28$ ɲɔgɔnkunbɛn.', 'Ni taali ni seginni bɛ yen, a tun bɛna kɛ $A_8^2 = 56$ ye.'],
    },
  ],
};
