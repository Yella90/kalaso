import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Bɔgɔlan ni wax fani masirilanw bɛ segin ni sɛrɛnni, simetiriw ani munumunuliw ye ; ja dɔ bonyalen bɛ cogo kelenw mara k’a bonya yɛlɛma. O lamaw ni bonyaliw ye **fɛnsɛnfɛn yɛlɛmaliw** ye.',
  objectives: ['ka taranisilasiyɔn, simetiriw, rotasiyɔn ani omotesi dɔn ;', 'ka ja dɔ ka ja dilan ;', 'ka a dɔn yɛlɛmali kelen-kelen bɛɛ bɛ min mara ;', 'ka omotesi ka rapɔri kɛ baara la janyaw ni bonyaw kan.'],
  sections: [
    {
      title: 'Izometiriw',
      blocks: [
        { head: ['Yɛlɛmali', 'A bɛ dɔn ni', 'M ka ja M′'], rows: [['taranisilasiyɔn', 'wɛkitɛri $\\vec u$', "$\\overrightarrow{MM'} = \\vec u$"], ['simetiri sɛntirali', 'cɛmancɛ O', 'O ye [MM′] cɛmancɛ ye'], ['simetiri aksiyali', 'juru $\\Delta$', '$\\Delta$ ye [MM′] ka mediyatirisi ye'], ['rotasiyɔn', 'cɛmancɛ O ni ɲɛnamini $\\theta$', "$OM' = OM$ ani $(\\overrightarrow{OM}, \\overrightarrow{OM'}) = \\theta$"]] },
        { text: '**Izometiriw** bɛ yɔrɔjanw mara, o la ɲɛnaminiw, bonyaw, paralɛliya ani juru kelen kan sigili.' },
      ],
    },
    {
      title: 'Omotesi',
      blocks: [
        { legend: ['omotesi min cɛmancɛ ye O ye, a rapɔri ye $k \\ne 0$'] },
        { text: 'Omotesi min rapɔri ye $k$, o bɛ janyaw sigiyɔrɔ jate $|k|$ la ani bonyaw $k^2$ la ; a bɛ ɲɛnaminiw, juru kelen kan sigili ani paralɛliya mara. Ni $|k| > 1$, o ye bonyali ye ; ni $|k| < 1$, o ye dɔgɔyali ye.' },
        { term: 'Ja ɲɔgɔnmaw', text: 'ja fila ye ɲɔgɔnma ye ni kelen ye tɔ kelen ka ja ye izometiriw ni omotesiw fɛ : ɲɛnamini kelenw, janyaw bɛ taa ɲɔgɔn fɛ.' },
        { title: 'ja dɔ bonyali', text: 'Ja cm 10 × cm 15 bonyara ni rapɔri 3 ye.', steps: ['Bonya kuraw : cm 30 × cm 45.', 'Bonya : $150 \\times 3^2 = 1\\,350$ cm², siɲɛ kɔnɔntɔn.'] },
      ],
    },
  ],
  essentials: ['Taranisilasiyɔn, simetiriw, rotasiyɔn : izometiriw (yɔrɔjanw maralen).', 'Omotesi rapɔri k : janyaw × |k|, bonyaw × k².', 'Ja ɲɔgɔnmaw : ɲɛnamini kelenw, janyaw bɛ taa ɲɔgɔn fɛ.'],
  exercises: [
    { title: 'Logo dɔ bonyali', statement: 'Logo tiriyangili dɔ bonya ye cm² 12 ye. An b’a bonya ni omotesi rapɔri 2,5 ye.', parts: [{ label: 'Dafɛ cm 4 bɛ kɛ (cm la) :' }, { label: 'Logo kura bonya, cm² la.' }] },
    { title: 'Yɛlɛmaliw kɔnɔ jaw', statement: 'Repɛri dɔ kɔnɔ, M(3 ; −1).', parts: [{ label: 'M ka ja abisisi taranisilasiyɔn wɛkitɛri $\\vec u(-5\\,;\\,2)$ fɛ.', steps: ['$3 - 5 = -2$ (ani ordone ye $-1 + 2 = 1$ ye).'] }, { label: 'M ka ja ordone omotesi fɛ min cɛmancɛ ye O, a rapɔri ye −2.', steps: ["$M'(-6\\,;\\,2)$ : an bɛ kowɔridonew sigiyɔrɔ jate −2 la."] }] },
  ],
  quiz: [
    { question: 'Izometiri bɛ nin mara :', choices: ['yɔrɔjanw', 'ɲɛnaminiw dɔrɔn', 'juru kelen kan sigili dɔrɔn', 'foyi'], explanation: 'Izo-metiri : sumani kelen.' },
    { question: 'Omotesi rapɔri 3 bɛ bonyaw sigiyɔrɔ jate :', explanation: 'k² = 9 la.' },
    { question: 'Simetiri sɛntirali cɛmancɛ O ye rotasiyɔn ye min cɛmancɛ ye O, a ɲɛnamini ye :', explanation: 'Tilancɛ munumunuli.' },
    { question: 'Omotesi rapɔri −1 ye :', choices: ['simetiri sɛntirali', 'taranisilasiyɔn', 'simetiri aksiyali', 'idantite'] },
  ],
  applications: [
    {
      title: 'Mali karti',
      tagline: 'Esikɛli kalan',
      situation: 'Karti 1/5 000 000 kan, Bamakɔ–Mɔpti yɔrɔjan ye cm 9,2 ye. Kogo karti ye o karti ka omotesi ye min rapɔri ye 4.',
      model: 'Esikɛli ye omotesi rapɔri ye ; yɔrɔjan yɛrɛw = karti kan yɔrɔjanw × 5 000 000.',
      questions: ['Bamakɔ–Mɔpti yɔrɔjan yɛrɛ ye joli ye kɔnɔ pan na, km la ?', 'Kogo karti esikɛli ye joli ye ?'],
      solution: ['$9{,}2 \\times 5\\,000\\,000 = 46\\,000\\,000$ cm = km 460.', 'Janyaw ka bon siɲɛ 4 : esikɛli 4/5 000 000 = 1/1 250 000.'],
      fact: 'Mali bonya ye km² 1 240 000 ɲɔgɔn ye : kogo karti kan, a ka bon siɲɛ 16 ni karti fitinin ye.',
    },
  ],
};
