import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Suman bondo, ji maralan, sumuni bɔrɔw piramidi, bon kurulen min kun ye kɔni ye : walasa ka a dɔn u bɛ min ta walima fɛn hakɛ min ka kan, an bɛ **volimew** ni **bonyaw** jate fɛn sanfɛlaw kɔnɔ.',
  objectives: ['ka juruw ni plɛnw sigicogo dɔn ɲɔgɔn fɛ ;', 'ka fɛn sanfɛla dɔ ja ni pɛrisipɛkitifu kavaliyɛri ye ;', 'ka fɛn sanfɛla kɔrɔbaw bonyaw ni volimew jate ;', 'ka bonyali nɔ dɔn volime kan.'],
  sections: [
    {
      title: 'Juruw ni plɛnw',
      blocks: [
        { items: ['fɛn sanfɛla kɔnɔ juru fila bɛ **ɲɔgɔn tigɛ**, u ye **paralɛli** ye, walima u **tɛ plɛn kelen kan** (u tɛ ɲɔgɔn tigɛ, u tɛ paralɛli ye) ;', 'juru ni plɛn bɛ ɲɔgɔn tigɛ, walima juru ye paralɛli ye plɛn na (a bɛ se ka kɛ a kɔnɔ) ;', 'plɛn fila ye paralɛli ye walima u bɛ ɲɔgɔn tigɛ juru kelen kan.'] },
        { text: 'Juru ye ɔritogonali ye plɛn na ni a ye ɔritogonali ye o plɛn ka **juru fila minnu bɛ ɲɔgɔn tigɛ** na.' },
      ],
    },
    {
      title: 'Bonyaw ni volimew',
      blocks: [
        { head: ['Fɛn sanfɛla', 'Volime'], rows: [['pave dirwati', '$V = L \\times \\ell \\times h$'], ['pirisimu dirwati, silindiri', '$V = \\mathcal B \\times h$ ; silindiri : $V = \\pi r^2 h$'], ['piramidi, kɔni', '$V = \\dfrac{1}{3}\\,\\mathcal B \\times h$ ; kɔni : $V = \\dfrac13 \\pi r^2 h$'], ['bulu', '$V = \\dfrac{4}{3}\\pi r^3$ ; sefɛri bonya : $4\\pi r^2$']] },
        { text: 'Bonyali min rapɔri ye $k$, janyaw bɛ sigiyɔrɔ jate $k$ la, bonyaw $k^2$ la ani volimew $k^3$ la.' },
        { title: 'ji maralan', text: 'Ji maralan silindiri dɔ rayɔn ye m 1 ye, a janya ye m 2,5 ye.', steps: ['$V = \\pi \\times 1^2 \\times 2{,}5 \\approx 7{,}85$ m³, o ye litiri 7 850 ɲɔgɔn ye.'] },
      ],
    },
  ],
  essentials: ['Fɛn sanfɛla juruw : u bɛ ɲɔgɔn tigɛ, u ye paralɛli ye walima u tɛ plɛn kelen kan.', 'Pirisimu, silindiri : B × h ; piramidi, kɔni : B × h / 3 ; bulu : 4πr³/3.', '1 m³ = litiri 1 000.', 'Bonyali rapɔri k : volimew × k³.'],
  exercises: [
    { title: 'Ɲɔ bondo', statement: 'Bondo silindiri dɔ dayamɛtiri ye m 2 ye, a janya ye m 3 ye. An bɛ π ≈ 3,14 ta.', parts: [{ label: 'Bondo volime, m³ la (kɛmɛsinna la).' }] },
    { title: 'Bon kun', statement: 'Bon kurulen dɔ kun ye kɔni ye, a rayɔn ye m 3 ye, a janya ye m 2 ye.', parts: [{ label: 'Kun kɔrɔ volime, m³ la (tannin na).' }, { label: 'Jenerasiri dɔ janya (kunkolo ka taa dalan na), m la (kɛmɛsinna la).' }] },
  ],
  quiz: [
    { question: '1 m³ bɛ bɛn :', choices: ['litiri 1 000', 'litiri 100', 'litiri 10', 'litiri 1'], explanation: '1 dm³ = litiri 1.' },
    { question: 'Kɔni volime ye … silindiri ta ye, min dugu ni a janya ye kelen ye :', choices: ['a sabanan', 'a tilancɛ', 'a ɲɔgɔn', 'a fila'], explanation: 'Faktɔri 1/3.' },
    { question: 'Ni bulu rayɔn kɛra fila ye, a volime bɛ sigiyɔrɔ jate :' },
    { question: 'Fɛn sanfɛla kɔnɔ juru fila minnu tɛ ɲɔgɔn tigɛ, olu ye :', choices: ['paralɛli walima u tɛ plɛn kelen kan', 'paralɛli tuma bɛɛ', 'pɛrɛpandikileri tuma bɛɛ', 'u bɛ ɲɔgɔn tigɛ'], explanation: 'Fɛn sanfɛla kɔnɔ, juruw bɛ yen minnu tɛ paralɛli ye, u tɛ ɲɔgɔn tigɛ.' },
  ],
  applications: [
    {
      title: 'Kin ka ji sanfɛ maralan',
      tagline: 'Tile joli ji maralen ?',
      situation: 'Sevare kin dɔ ka ji sanfɛ maralan ka bondo ye silindiri ye, a rayɔn ye m 4 ye, a janya ye m 5 ye. Kin bɛ ji m³ 60 kɛ baara la tile kelen kɔnɔ.',
      model: 'V = π r² h.',
      questions: ['Bondo falen bɛ ji hakɛ jumɛn ta, m³ la ?', 'Ni pɔnpe ma kɛ, ji maralen bɛ tile joli kɛ ?'],
      solution: ['$V = \\pi \\times 16 \\times 5 = 80\\pi \\approx 251$ m³.', '$\\dfrac{251}{60} \\approx 4{,}2$ tile.'],
      fact: 'Ji maralan bɛ sanfɛ walasa ji ka se robinɛw ma ni fanga ye, pɔnpe tɛ.',
    },
  ],
};
