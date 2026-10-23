import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Bɛnba ka nɛgɛɲɛ, mɔntɛrɛ labɛnna ka lupu, telefɔni ka ja talan, ɲɛ yɛrɛ : u bɛɛ bɛ **lantiyiw** kɛ baara la, wɛri walima pilasitiki kuncɛlenw minnu bɛ yeelen ɲɛsin yɛlɛma ka jaw dilan.',
  objectives: ['ka lantiyi kɔnvɛrizanti ni divɛrizanti danfara dɔn ;', 'ka foyɛriw, distansi fokali ani vɛrizansi dɔn ;', 'ka fɛn dɔ ja dilan ni yeelen juru kɛrɛnkɛrɛnnenw ye ;', 'ka kɔnzigezɔn bɛnni ni bonyali kɛ baara la.'],
  sections: [
    {
      title: 'Lantiyi suguya fila',
      blocks: [
        {
          head: ['', 'Kɔnvɛrizanti', 'Divɛrizanti'],
          rows: [
            ['a cogo', 'a daw finman, a cɛmancɛ dunman', 'a daw dunman, a cɛmancɛ finman'],
            ['yeelen jurukulu ɲɔgɔn cɛ', 'a bɛ ɲɔgɔn sɔrɔ tomi kelen na (foyɛri ja F′)', 'a bɛ jɛnsɛn'],
            ['nafaw', 'lupu, ja talan, ipɛrimetirɔpu ka nɛgɛɲɛ', 'miyopu ka nɛgɛɲɛ'],
          ],
        },
        { legend: ['vɛrizansi diyopitiri (δ) la ; $f\'$ distansi fokali m la (pozitifu lantiyi kɔnvɛrizanti kama)'] },
      ],
    },
    {
      title: 'Ja dilan',
      blocks: [
        { items: ['juru min bɛ tɛmɛ **cɛmancɛ ɔpitiki O** fɛ, o tɛ ɲɛsin yɛlɛma ;', 'juru min ni **sira kunba ye ɲɔgɔn cɛ ye**, o bɛ bɔ ka tɛmɛ foyɛri ja **F′** fɛ ;', 'juru min bɛ tɛmɛ foyɛri fɛn **F** fɛ, o bɛ bɔ **ka kɛ sira kunba ɲɔgɔn cɛ ye**.'] },
        { label: 'kɔnzigezɔn bɛnni' },
        { label: 'bonyali' },
        { title: 'ja ɛkiran kan', text: 'Fɛn dɔ bilalen bɛ lantiyi kɔnvɛrizanti dɔ ɲɛ cm 30 la, a distansi fokali ye cm 10 ye : $\\overline{OA} = -30$ cm.', steps: ['$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{10} - \\dfrac{1}{30} = \\dfrac{2}{30}$, o la $\\overline{OA\'} = 15$ cm.', '$\\gamma = \\dfrac{15}{-30} = -0{,}5$ : ja yɛlɛmalen don, a ka dɔgɔ siɲɛ fila.'] },
        { text: 'Fɛn min bilalen bɛ foyɛri F ni lantiyi cɛ, o bɛ ja di min jɔlen don, a bonyalen, a tɛ ye ɛkiran kan : o ye **lupu** baarakɛcogo ye.' },
      ],
    },
  ],
  essentials: ['Lantiyi kɔnvɛrizanti : a daw finman ; divɛrizanti : a daw dunman.', 'Vɛrizansi C = 1/f′ diyopitiri la.', 'Yeelen juru kɛrɛnkɛrɛnnen saba ja dilanni kama.', '1/OA′ − 1/OA = 1/f′ ; γ = OA′/OA (hakɛ taamasiyɛnmaw).'],
  exercises: [
    { title: 'Lupu ka vɛrizansi', statement: 'Lupu dɔ distansi fokali ye cm 5 ye.', parts: [{ label: 'A vɛrizansi, diyopitiri la.', steps: ['$C = \\dfrac{1}{0{,}05} = 20$ δ.'] }] },
    {
      title: 'Ja bila ɛkiran kan',
      statement: 'Fɛn cm 2 dɔ bilalen bɛ lantiyi kɔnvɛrizanti dɔ ɲɛ cm 20 la, a distansi fokali ye cm 15 ye.',
      parts: [
        { label: 'Lantiyi ni ja cɛ $\\overline{OA\'}$, cm la.', steps: ['$\\dfrac{1}{\\overline{OA\'}} = \\dfrac{1}{15} - \\dfrac{1}{20} = \\dfrac{1}{60}$', '$\\overline{OA\'} = 60$ cm.'] },
        { label: 'Ja bonya, cm la (taamasiyɛn tɛ).', steps: ['$\\gamma = \\dfrac{60}{-20} = -3$ : ja yɛlɛmalen don, $|A\'B\'| = 3 \\times 2 = 6$ cm.'] },
      ],
    },
  ],
  quiz: [
    { question: 'Lantiyi min daw finman, o ye :', choices: ['kɔnvɛrizanti', 'divɛrizanti', 'dalen', 'dungare'], explanation: 'A bɛ yeelen jurukulu ɲɔgɔn cɛ lajɛ tomi kelen na.' },
    { question: 'Juru min bɛ tɛmɛ cɛmancɛ ɔpitiki fɛ :', choices: ['tɛ ɲɛsin yɛlɛma', 'bɛ tɛmɛ F′ fɛ', 'bɛ bɔ ka kɛ sira kunba ɲɔgɔn cɛ ye', 'bɛ segin'], explanation: 'O ye juru kɛrɛnkɛrɛnnen saba dɔ ye.' },
    { question: 'Miyopu ka nɛgɛɲɛ wɛriw ye :', choices: ['divɛrizantiw', 'kɔnvɛrizantiw', 'dalenw', 'ɲɛ bɛ minnu na'], explanation: 'Miyopu ka ɲɛ ka kɔnvɛrizanti kojugu.' },
    { question: 'Vɛrizansi 4 δ distansi fokali ye :', choices: ['cm 25', 'cm 4', 'cm 40', 'cm 2,5'], explanation: 'f′ = 1/4 = m 0,25.' },
  ],
  applications: [
    {
      title: 'Tumutu tile tobilan',
      tagline: 'Ka tile yeelen lajɛ',
      situation: 'Jiraliba dɔ kama, an bɛ tile yeelen lajɛ ni lupu belebele dɔ ye min distansi fokali ye cm 40 ye. Bawo tile ka jan kosɛbɛ, a ja bɛ kɛ foyɛri la.',
      model: 'Yeelen jurukulu ɲɔgɔn cɛ bɛ ɲɔgɔn sɔrɔ foyɛri ja F′ la, f′ la lantiyi ma.',
      questions: ['Papiye ka kan ka bila lantiyi la yɔrɔjan joli la walasa a ka mana ?', 'O lupu vɛrizansi ye joli ye ?'],
      solution: ['Foyɛri la, cm 40 la lantiyi ma : fanga bɛɛ lajɛlen bɛ yen tomi fitinin kan.', '$C = \\dfrac{1}{0{,}40} = 2{,}5$ δ.'],
      fact: 'Tile tobilanw bɛ dungarew kɛ baara la ka tɛmɛ, nka sariya ye kelen ye : ka yeelen lajɛ tomi kelen na.',
    },
  ],
};
