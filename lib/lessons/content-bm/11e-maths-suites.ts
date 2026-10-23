import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Tɔn dɔ min kɔnɔ mɔgɔ kelen-kelen bɛɛ bɛ F 2 000 fara a kalo tɛmɛnen ta kan ; sow sara min bɛ caya 5 % san o san ; mangoro foro min bɛ fila ye samiyɛ o samiyɛ. Walasa ka o hakɛw kɔlɔsi kalo o kalo walima san o san, an b’u nimɔrɔ : $u_0, u_1, u_2…$ O ye **jateden tugunin** ye.',
  objectives: ['ka tugunin tɛrimuw jate ni a ɲɛfɔlen don pewu walima ni segin-ka-kɛ ye ;', 'ka tugunin aritimetiki walima jeyometiriki dɔn ka a tɛrimu jumanba kɛ baara la ;', 'ka tɛrimu tugununnenw farali jate ;', 'ka tugunin yɛlɛmacogo kalan.'],
  sections: [
    {
      title: 'Tugunin ɲɛfɔcogo fila',
      blocks: [
        { items: ['**pewu** : $u_n = f(n)$, misali la $u_n = 3n + 2$ ;', '**segin-ka-kɛ fɛ** : an bɛ tɛrimu fɔlɔ di ani sariya min bɛ tɛrimu dɔ ni a nɔfɛmɔgɔ siri ɲɔgɔn na, misali la $u_0 = 1$ ani $u_{n+1} = 2u_n + 1$.'] },
        { text: 'Tugunin bɛ **yɛlɛn** ni $u_{n+1} \\geq u_n$ $n$ bɛɛ kama, a bɛ **jigin** ni $u_{n+1} \\leq u_n$. An bɛ $u_{n+1} - u_n$ taamasiyɛn lajɛ.' },
      ],
    },
    {
      title: 'Tugunin aritimetikiw ni jeyometirikiw',
      blocks: [
        { head: ['', 'Aritimetiki', 'Jeyometiriki'], rows: [['ka taa nɔfɛmɔgɔ la', 'an bɛ rezɔn $r$ **fara** a kan', 'an b’a **sigiyɔrɔ jate** rezɔn $q$ la'], ['tɛrimu jumanba'], ['$u_0$ ka se $u_n$ ma farali']] },
        { title: 'cayali 5 % san o san', text: 'Sow sara F 50 000 bɛ caya 5 % san o san.', steps: ['Ka caya 5 %, o ye ka sigiyɔrɔ jate 1,05 la : tugunin jeyometiriki rezɔn 1,05.', 'San 3 kɔfɛ : $50\\,000 \\times 1{,}05^3 \\approx 57\\,881$ F.'] },
        { wrong: '« Cayali 5 % san o san san 3 kɔnɔ ye cayali 15 % ye. »', why: 'Cayali kelen-kelen bɛɛ bɛ kɛ hakɛ kura kan : $1{,}05^3 \\approx 1{,}158$, o ye 15,8 % ye.', reflex: 'Pursantiw ɲɔgɔn kɔ bɛ sigiyɔrɔ jate ɲɔgɔn na : tugunin jeyometiriki.' },
      ],
    },
  ],
  essentials: ['Tugunin pewu $u_n = f(n)$ walima segin-ka-kɛ $u_{n+1} = g(u_n)$.', 'Aritimetiki : $u_n = u_0 + nr$ ; jeyometiriki : $v_n = v_0q^n$.', 'Faraliw : (tɛrimu hakɛ) × (fɔlɔ + laban) / 2 ; $v_0\\frac{1 - q^{n+1}}{1 - q}$.', 'Yɛlɛmacogo : $u_{n+1} - u_n$ taamasiyɛn.'],
  exercises: [
    { title: 'Tɔn', statement: 'Tɔn dɔ kɔnɔ, kalo fɔlɔ la an bɛ F 5 000 di, o kɔ F 2 000 bɛ fara a kan kalo o kalo.', parts: [{ label: 'Kalo 12nan na an bɛ joli di (F la) ?', steps: ['Tugunin aritimetiki, $u_1 = 5\\,000$, $r = 2\\,000$ : $u_{12} = 5\\,000 + 11 \\times 2\\,000 = 27\\,000$ F.'] }, { label: 'Kalo 12 kɔnɔ wari dilen bɛɛ lajɛlen (F la).' }] },
    { title: 'Tugunin segin-ka-kɛ dɔ', parts: [{ label: '$u_3$ jate.' }, { label: 'An bɛ $v_n = u_n + 1$ sigi. Tugunin jeyometiriki $(v_n)$ rezɔn ye joli ye ?', steps: ['$v_{n+1} = 2u_n + 2 = 2(u_n + 1) = 2v_n$.', 'O la $v_n = 2^{n+1}$ ani $u_n = 2^{n+1} - 1$.'] }] },
  ],
  quiz: [
    { question: 'Tugunin $u_n = 7 - 2n$ ye :', choices: ['aritimetiki rezɔn −2', 'jeyometiriki rezɔn −2', 'aritimetiki rezɔn 7', 'a tɛ yɛlɛma'] },
    { question: 'Tugunin jeyometiriki min tɛrimu fɔlɔ ye $v_0 = 3$, a rezɔn ye 2, o tɛrimu $v_4$ ye :' },
    { question: '$1 + 2 + 3 + \\dots + 100$ ye :' },
    { question: 'Tugunin jeyometiriki rezɔn 0,5 ani tɛrimu fɔlɔ pozitifu ye :', choices: ['a bɛ jigin', 'a bɛ yɛlɛn', 'a tɛ yɛlɛma', 'a bɛ yɛlɛma-yɛlɛma'], explanation: 'Tɛrimu kelen-kelen bɛɛ ye a ɲɛfɛmɔgɔ tilancɛ ye.' },
  ],
  applications: [
    {
      title: 'Butiki sara',
      tagline: 'Jago tigi bɛna joli sara san 3 kɔfɛ ?',
      situation: 'Sugu kɔnɔ butiki dɔ kalo sara ye F 50 000 ye ; a tigi b’a caya 5 % san o san.',
      model: 'Tugunin jeyometiriki rezɔn 1,05.',
      questions: ['San 3 kɔfɛ, kalo sara bɛna kɛ joli ye ?'],
    },
  ],
};
