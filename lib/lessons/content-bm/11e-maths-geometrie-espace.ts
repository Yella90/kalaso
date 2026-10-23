import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Ɲɔ bondo kɔrɔ ye bɔgɔ silindiri ye, min kun ye bin kɔni ye. Ɲɔ bɔrɔ joli bɛ se ka don a kɔnɔ ? Walasa ka volimew ni yɔrɔjanw jate fɛn sanfɛla kɔnɔ, ani ka a jira juruw ni plɛnw bɛ ɲɔgɔn tigɛ cogo min na walima u bɛ paralɛli ye, an bɛ **fɛn sanfɛla jɔyɔrɔ jatebɔ** kalan.',
  objectives: ['ka juruw ni plɛnw sigicogo dɔn ɲɔgɔn fɛ ;', 'ka paralɛliya ni ɔritogonaliti sariyaw kɛ baara la ;', 'ka janyaw jate fɛn sanfɛla kɔnɔ (pave dayagonali) ;', 'ka fɛn sanfɛla kɔrɔbaw volimew jate.'],
  sections: [
    {
      title: 'Sigicogo ɲɔgɔn fɛ',
      blocks: [
        { head: ['Fɛnw', 'Sigicogo minnu bɛ se ka kɛ'], rows: [['juru fila', 'u bɛ ɲɔgɔn tigɛ, u ye paralɛli ye (plɛn kelen kan), walima u **tɛ plɛn kelen kan**'], ['juru ni plɛn', 'juru bɛ plɛn kɔnɔ, u bɛ ɲɔgɔn tigɛ (tomi kelen), walima u ye paralɛli ye'], ['plɛn fila', 'u bɛ ɲɔgɔn tigɛ (juru kelen kan) walima u ye paralɛli ye']] },
        { text: 'Ni juru ye paralɛli ye plɛn dɔ ka juru dɔ la, a ye paralɛli ye o plɛn na. Juru ye ɔritogonali ye plɛn na ni a ye ɔritogonali ye o plɛn ka **juru fila minnu bɛ ɲɔgɔn tigɛ** na.' },
        { wrong: '« Juru fila minnu tɛ ɲɔgɔn tigɛ, olu ye paralɛli ye. »', why: 'Fɛn sanfɛla kɔnɔ, u bɛ se ka kɛ plɛn kelen kan tɛ : kibu sanfɛ dafɛ ni a duguma dafɛ, fan fila danfaralenw na.', reflex: 'Paralɛli = plɛn kelen kan ani tomi kelen tɛ u cɛ (walima u ye kelen ye).' },
      ],
    },
    {
      title: 'Janyaw ni volimew',
      blocks: [
        { label: 'Pave dirwati dayagonali, a bonyaw ye $a$, $b$, $c$', tex: 'd = \\sqrt{a^2 + b^2 + c^2} \\qquad \\text{kibu : } d = a\\sqrt{3}' },
        { head: ['Fɛn sanfɛla', 'Volime'], rows: [['pave dirwati', '$a \\times b \\times c$'], ['pirisimu dirwati, silindiri', 'dugu bonya × janya ; silindiri : $\\pi r^2 h$'], ['piramidi, kɔni', '$\\dfrac{1}{3}$ × dugu bonya × janya ; kɔni : $\\dfrac{1}{3}\\pi r^2 h$'], ['bulu', '$\\dfrac{4}{3}\\pi r^3$']] },
        { title: 'piramidi dɔ', text: 'Dugu kare min dafɛ ye m 6 ye, janya m 4.' },
        { text: 'Inite : 1 m³ = litiri 1 000 ; 1 dm³ = litiri 1.' },
      ],
    },
  ],
  essentials: ['Juruw : u bɛ ɲɔgɔn tigɛ, u ye paralɛli ye walima u tɛ plɛn kelen kan ; juru/plɛn : a bɛ a kɔnɔ, u bɛ ɲɔgɔn tigɛ walima u ye paralɛli ye ; plɛnw : u bɛ ɲɔgɔn tigɛ walima u ye paralɛli ye.', 'Juru ɔritogonali plɛn na : a ye ɔritogonali ye plɛn ka juru fila minnu bɛ ɲɔgɔn tigɛ na.', 'Pave dayagonali : $\\sqrt{a^2 + b^2 + c^2}$.', 'Volimew : pirisimu/silindiri = dugu × janya ; piramidi/kɔni = $\\frac{1}{3}$ dugu × janya ; bulu $\\frac{4}{3}\\pi r^3$.'],
  exercises: [
    { title: 'Volimew jatebɔ', statement: 'Volime minnu ɲininen don, olu jate.', parts: [{ label: 'Piramidi min dugu ye kare ye, a dafɛ m 6, a janya m 4 (m³ la).' }, { label: 'Ji maralan silindiri min rayɔn ye m 1, a janya m 2 (litiri la).' }] },
    { title: 'Dayagonaliw', statement: 'Dayagonaliw jate (hakɛ gɛrɛfɛlaw).', parts: [{ label: 'Kibu min dafɛ ye cm 3 ye, o dayagonali (cm la).' }, { label: 'Pave m 5 × m 4 × m 3 dayagonali (m la).' }] },
  ],
  quiz: [
    { question: 'Plɛn fila danfaralenw minnu tɛ paralɛli ye, u bɛ ɲɔgɔn tigɛ :', choices: ['juru kelen kan', 'tomi kelen na', 'plɛn kelen kan', 'u tɛ ɲɔgɔn tigɛ'], explanation: 'I n’a fɔ gafe dayɛlɛlen ka ɲɛ fila.' },
    { question: 'Kɔni volime ye :', choices: ['silindiri min dugu ni a janya ye kelen ye, o ta sabanan', 'a tilancɛ', 'a ɲɔgɔn', 'a fila'] },
    { question: '1 m³ bɛ bɛn :', choices: ['litiri 1 000', 'litiri 100', 'litiri 10', 'litiri 1'] },
    { question: 'Walasa juru ka kɛ ɔritogonali ye plɛn na, a bɛ se ni a ye ɔritogonali ye :', choices: ['plɛn ka juru fila minnu bɛ ɲɔgɔn tigɛ na', 'plɛn ka juru kelen dɔrɔn na', 'plɛn ka juru paralɛli fila na', 'juru si tɛ'], explanation: 'O ye ɔritogonaliti sariya ye.' },
  ],
  applications: [
    {
      title: 'Ɲɔ bondo',
      tagline: 'Ɲɔ hakɛ jumɛn bɛ se ka don a kɔnɔ ?',
      situation: 'Bɔgɔ bondo dɔ ye silindiri ye min rayɔn ye m 1,0 ye, a janya m 2,0, kun kɔni rayɔn kelen ni janya m 1,2 b’a sanfɛ. Silindiri yɔrɔ dɔrɔn de bɛ fa.',
      model: 'An bɛ bondo jate silindiri dafalen ye ; ɲɔ kisɛ m³ 1 girinya ye kg 750 ɲɔgɔn ye.',
      questions: ['Silindiri bɛ se ka ɲɔ volime jumɛn ta, m³ la ?', 'O ye ɲɔ girinya jumɛn ye ?'],
      solution: ['$V = \\pi \\times 1{,}0^2 \\times 2{,}0 \\approx 6{,}28$ m³.', 'Girinya : $6{,}28 \\times 750 \\approx 4\\,700$ kg, o ye bɔrɔ kg 100 47 ɲɔgɔn ye. Kun kɔni (volime $\\frac{1}{3}\\pi \\times 1 \\times 1{,}2 \\approx 1{,}26$ m³) b’a tanga sanji ma.'],
    },
  ],
};
