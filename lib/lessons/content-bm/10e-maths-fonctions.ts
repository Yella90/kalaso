import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Taksi sɔngɔ bɛ bɔ yɔrɔjan na, wula funteni bɛ bɔ lɛri la, foro kare bonya bɛ bɔ a dafɛ la. Siɲɛ o siɲɛ, hakɛ dɔ bɛ bɔ hakɛ wɛrɛ la : o ye **fonksiyɔn** ye. Ka a kalan ka a lajɛ, o bɛ an dɛmɛ ka fɛnw dɔn ka kɔn.',
  objectives: ['ka ja jate ka antesedan ɲini ;', 'ka fonksiyɔn ka dɔnyɔrɔ dɔn ;', 'ka yɛlɛmali tabulo kalan ka a dilan ;', 'ka fonksiyɔn kɔrɔbaw dɔn.'],
  sections: [
    {
      title: 'Ja, antesedan, dɔnyɔrɔ',
      blocks: [
        { term: 'Fonksiyɔn', text: 'fɛɛrɛ min bɛ jateden yɛrɛ $x$ kelen-kelen bɛɛ siri $D_f$ kɔnɔ jateden yɛrɛ kelen dɔrɔn na, $f(x)$, min bɛ wele $x$ ka **ja**. Ni $f(x) = y$, an b’a fɔ ko $x$ ye $y$ ka **antesedan** ye.' },
        { items: ['tilali bɛ yen dɔrɔn ni dugumajate **tɛ 0 ye** ;', 'rasini kare bɛ yen dɔrɔn ni min bɛ a kɔrɔ, o ye **pozitifu walima 0** ye.'] },
        { title: 'dɔnyɔrɔ', steps: ['$D_f = \\mathbb R \\setminus \\{2\\}$.', '$x + 3 \\ge 0 \\iff x \\ge -3$, o la $D_g = [-3\\,;\\,+\\infty[$.'] },
      ],
    },
    {
      title: 'Yɛlɛmacogo',
      blocks: [
        { text: '$f$ bɛ **yɛlɛn** $I$ kan ni $a < b$ bɛɛ kama $I$ kɔnɔ, $f(a) \\le f(b)$ ; a bɛ **jigin** ni $f(a) \\ge f(b)$. Yɛlɛmali tabulo bɛ o kunnafoniw lajɛ ni taamasiyɛnw ye.' },
        { head: ['Fonksiyɔn', 'Yɛlɛmacogo'], rows: [['$x \\mapsto ax + b$', 'a bɛ yɛlɛn ni $a > 0$, a bɛ jigin ni $a < 0$'], ['$x \\mapsto x^2$', 'a bɛ jigin $]-\\infty\\,;\\,0]$ kan, a bɛ yɛlɛn $[0\\,;\\,+\\infty[$ kan'], ['$x \\mapsto \\dfrac1x$', 'a bɛ jigin $]-\\infty\\,;\\,0[$ kan ani $]0\\,;\\,+\\infty[$ kan'], ['$x \\mapsto \\sqrt x$', 'a bɛ yɛlɛn $[0\\,;\\,+\\infty[$ kan']] },
        { term: 'Pariti', text: '$f$ ye **pɛri** ye ni $f(-x) = f(x)$ (kurubu ye simetiri ye ordone juru kɔfɛ), **ɛnpɛri** ye ni $f(-x) = -f(x)$ (simetiri orizini kɔfɛ).' },
      ],
    },
  ],
  essentials: ['Ja : f(x) ; antesedan : f(x) = y jaabi.', 'Kɔnnafɛnw : dugumajate 0, negatifu rasini.', 'A bɛ yɛlɛn : bɛnni bɛ mara ; a bɛ jigin : a bɛ yɛlɛma.', 'Fonksiyɔn kɔrɔbaw : afini, kare, ɛnvɛrisi, rasini kare.'],
  simulationTasks: ['fonksiyɔn afini dɔ ja ka a yɛlɛma : a bɛ yɛlɛn waati jumɛn ?', 'taa dɛrɛ filanan na : sanfɛla ni rasiniw ɲini ni i bɛ a, b ani c yɛlɛma.'],
  exercises: [
    { title: 'Jaw ni antesedanw', parts: [{ label: '−2 ja.', steps: ['$f(-2) = 4 + 8 + 1 = 13$.'] }, { label: '2 ja.', steps: ['$f(2) = 4 - 8 + 1 = -3$.'] }] },
    {
      title: 'Taksi sɔngɔ',
      statement: 'Taksi bɛ FCFA 500 ta a daminɛ na ani FCFA 250 kilomɛtɛrɛ o kilomɛtɛrɛ : $p(x) = 250x + 500$.',
      parts: [{ label: 'Taama km 8 sɔngɔ, FCFA la.', steps: ['$p(8) = 2\\,000 + 500 = 2\\,500$ FCFA.'] }, { label: 'Yɔrɔjan min tigɛra FCFA 3 750 kama, km la (antesedan).', steps: ['$250x + 500 = 3\\,750 \\iff x = \\dfrac{3\\,250}{250} = 13$ km.'] }],
    },
  ],
  quiz: [
    { question: '$x \\mapsto \\dfrac{3}{x + 1}$ ka dɔnyɔrɔ ye :', explanation: 'Dugumajate bɛ kɛ 0 ye −1 la.' },
    { question: 'Kare fonksiyɔn bɛ yɛlɛn :', choices: ['$[0\\,;\\,+\\infty[$', '$\\mathbb R$', '$]-\\infty\\,;\\,0]$', 'entɛriwali si kan'], explanation: 'A bɛ jigin jateden negatifuw kan.' },
    { question: '$x \\mapsto -3x + 2$ bɛ :', choices: ['jigin', 'yɛlɛn', 'to kelen ye', 'pɛri'], explanation: 'A kowefisiyan kɔlɔnni ye negatifu ye.' },
    { question: 'Fonksiyɔn pɛri kurubu ye simetiri ye :', choices: ['ordone juru kɔfɛ', 'orizini kɔfɛ', 'abisisi juru kɔfɛ', 'juru y = x kɔfɛ'], explanation: 'f(−x) = f(x).' },
  ],
  applications: [
    {
      title: 'Foro lamini',
      tagline: 'Kare-jan ɲumanba ni sɔgɔ mɛtɛrɛ 100 ye',
      situation: 'Nakɔtigi dɔ bɛ sɔgɔ mɛtɛrɛ 100 sɔrɔ walasa ka nakɔ kare-jan lamini. Ni dafɛ kelen ye $x$ m ye, dɔ wɛrɛ ye $50 - x$ m ye ani bonya ye $A(x) = x(50 - x)$ ye.',
      model: '$A(x) = -x^2 + 50x$ ka bon kosɛbɛ parabɔli sanfɛla la, $x = 25$ la.',
      questions: ['Bonya belebeleba ye joli ye, m² la ?', 'Nakɔ cogo bɛ kɛ di o tuma ?'],
      solution: ['$A(25) = 25 \\times 25 = 625$ m².', 'Kare min dafɛ ye mɛtɛrɛ 25 ye : lamini kelen na, kare de ye kare-jan ye min bonya ka bon kosɛbɛ.'],
      fact: 'O gɛlɛya suguya, « fɛn ɲumanba ɲini », bɛ wele ɔpitimizasiyɔn.',
    },
  ],
};
