import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Mangoro bɛ bin ka bɔ jiri la ; Kalo, o bɛ munumunu Dugukolo lamini k’a sɔrɔ a tɛ bin. Newton y’a faamu ko fanga kelen de bɛ baara kɛ u fila la : **gravitasiyɔn**, min bɛ girinyaw bɛɛ sama ɲɔgɔn fɛ.',
  objectives: ['ka gravitasiyɔn sariya fɔ ;', 'ka fɛn fila cɛ samali fanga jate ;', 'ka girinya ni masi siri : P = m × g ;', 'ka Dugukolo ni Kalo kan girinya suma.'],
  sections: [
    {
      title: 'Gravitasiyɔn sariya',
      blocks: [
        { legend: ['$G = 6{,}67 \\times 10^{-11}$ N·m²/kg² ; $m$ kg la ; $d$ cɛmancɛw cɛ m la'] },
        { text: 'Fɛn fila bɛ ɲɔgɔn sama ni fanga hakɛ kelen ye, u ɲɛsinnen ɲɔgɔn ma. Fanga bɛ kɛɲɛ ni masiw ye, a bɛ dɔgɔya ni yɔrɔjan **kare** ye.' },
        { title: 'kalandenw fila', text: 'Kalanden fila kilo 60 kelen-kelen, u cɛ ye mɛtɛrɛ 1 ye.', steps: ['$F = 6{,}67 \\times 10^{-11} \\times \\dfrac{60 \\times 60}{1^2} \\approx 2{,}4 \\times 10^{-7}$ N : a tɛ se ka kalama.'] },
      ],
    },
    {
      title: 'Girinya ni pesantɛri foro',
      blocks: [
        { legend: ['$P$ N la ; $m$ kg la ; $g$ pesantɛri hakɛ N/kg la (Dugukolo kan N/kg 9,8)'] },
        { text: 'Girinya ye Dugukolo ka samali fanga ye fɛn dɔ kan min bɛ a gɛrɛfɛ. A jɔlen don, a ɲɛsinnen duguma, a bila yɔrɔ ye girinya cɛmancɛ ye.' },
        { head: ['Fɛn', '$g$ (N/kg)'], rows: [['Dugukolo', '9,8'], ['Kalo', '1,6'], ['Marisi', '3,7'], ['Zupitɛri', '24,8']] },
        { wrong: '« Kalo kan, n girinya ni n masi bɛ dɔgɔya siɲɛ 6. »', why: 'Masi (fɛn hakɛ, kg la) tɛ yɛlɛma ; girinya (fanga, N la) dɔrɔn de bɛ yɛlɛma.', reflex: 'Masi kg la, a tɛ yɛlɛma ; girinya N la, a bɛ bɔ g la.' },
      ],
    },
  ],
  essentials: ['F = G·mA·mB / d², G = 6,67 × 10⁻¹¹ N·m²/kg².', 'P = m × g ; g = N/kg 9,8 Dugukolo kan, N/kg 1,6 Kalo kan.', 'Masi tɛ yɛlɛma ka bɔ fɛn dɔ kan ka taa dɔ wɛrɛ kan, girinya bɛ yɛlɛma.'],
  exercises: [
    {
      title: 'Girinya Dugukolo ni Kalo kan',
      statement: 'Malo bɔrɔ dɔ masi ye kilo 50 ye.',
      parts: [
        { label: 'A girinya Dugukolo kan (g = 9,8 N/kg), N la.', steps: ['$P = 50 \\times 9{,}8 = 490$ N.'] },
        { label: 'A girinya Kalo kan (g = 1,6 N/kg), N la.', steps: ['$P = 50 \\times 1{,}6 = 80$ N. A masi bɛ to kilo 50 ye.'] },
      ],
    },
    {
      title: 'Dugukolo ni Kalo ka samali',
      statement: 'Dugukolo masi : $6{,}0 \\times 10^{24}$ kg ; Kalo masi : $7{,}3 \\times 10^{22}$ kg ; u cɛ : $3{,}8 \\times 10^{8}$ m.',
      parts: [{ label: 'Samali fanga, $10^{20}$ N hakɛ la (a dɔɔnin kɔ tan na).', steps: ['$F = 6{,}67 \\times 10^{-11} \\times \\dfrac{6{,}0 \\times 10^{24} \\times 7{,}3 \\times 10^{22}}{(3{,}8 \\times 10^{8})^2}$', '$F \\approx 2{,}0 \\times 10^{20}$ N.'] }],
    },
  ],
  quiz: [
    { question: 'Ni fɛn fila cɛ bɛ laban siɲɛ fila, gravitasiyɔn fanga bɛ :', choices: ['tila naani ye', 'tila fila ye', 'laban siɲɛ fila', 'to a cogo la'], explanation: 'A bɛ yɛlɛma i n’a fɔ 1/d².' },
    { question: 'Girinya bɛ sɛbɛn :', choices: ['newton na', 'kilogaramu na', 'garamu na', 'mɛtɛrɛ la'], explanation: 'Fanga don.' },
    { question: 'Kosimonɔti min masi ye kilo 70 ye Kalo kan, a masi ye :', choices: ['kilo 70', 'kilo 11,7', 'N 112', 'kilo 0'], explanation: 'Masi tɛ bɔ yɔrɔ la.' },
    { question: 'Fanga min bɛ Kalo mara Dugukolo lamini, o ye :', choices: ['gravitasiyɔn', 'nɔgɔnni', 'kuran fanga', 'magaɲɛti fanga'], explanation: 'O fanga kelen de bɛ fɛnw bin.' },
  ],
  applications: [
    {
      title: 'Televizɔn satelit',
      tagline: 'Mun na girinya bɛ dɔgɔya sanfɛ',
      situation: 'Televizɔn satelit dɔ min bɛ Mali sɔrɔ, o bɛ munumunu km 36 000 sanfɛ, o ye km 42 400 ye Dugukolo cɛmancɛ ma (Dugukolo rayɔn siɲɛ 6,6). Dugukolo kan, g = N/kg 9,8.',
      model: 'g bɛ dɔgɔya ni Dugukolo cɛmancɛ yɔrɔjan kare ye.',
      questions: ['Pesantɛri hakɛ ye joli ye o sanfɛ, N/kg la ?', 'Mun na satelit tɛ bin ?'],
      solution: ['$g = \\dfrac{9{,}8}{6{,}6^2} \\approx 0{,}22$ N/kg.', 'A bɛ bin Dugukolo kan tuma bɛɛ, nka a teliya belebeleba dalen bɛ a to ka Dugukolo « tɛmɛ » : a bɛ munumunu a lamini.'],
      fact: 'O satelit bɛ munumunu siɲɛ kelen lɛri 24 kɔnɔ : ka bɔ dugukolo kan, a bɛ i n’a fɔ a tɛ lamaga, parabolw bɛ to u yɔrɔ la.',
    },
  ],
};
