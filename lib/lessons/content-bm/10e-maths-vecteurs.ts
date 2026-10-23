import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Kurunbolila bɛ baji tigɛ ka kurun gɛn tilennen ka taa fan dɔ wɛrɛ fɛ, nka ji woyo b’a ta ka taa duguma fɛ. A bɛ se yɔrɔ jumɛn ? A ka kan ka taama fila fara ɲɔgɔn kan, minnu kelen-kelen bɛɛ ɲɛsin, fan ani janya bɛ yen : **wɛkitɛri** fila.',
  objectives: ['ka jatebɔ kɛ ni wɛkitɛriw kowɔridonew ye bazi dɔ kɔnɔ ;', 'ka wɛkitɛri fila kolineyɛriw dɔn ni determinan ye ;', 'ka pɔrɔdui sikalɛri ni nɔrimu jate ;', 'ka pɔrɔdui sikalɛri kɛ baara la ka ɔritogonaliti jira.'],
  sections: [
    { title: 'Kowɔridonew ni kolineyɛriti', blocks: [{ text: 'Bazi $(\\vec i, \\vec j)$ kɔnɔ, wɛkitɛri bɛɛ bɛ sɛbɛn $\\vec u = x\\vec i + y\\vec j$ : an b’a sɛbɛn $\\vec u\\,(x\\,;\\,y)$. Ni $A(x_A\\,;\\,y_A)$ ani $B(x_B\\,;\\,y_B)$, $\\overrightarrow{AB}\\,(x_B - x_A\\,;\\,y_B - y_A)$.' }, {}, { text: '$\\vec u$ ni $\\vec v$ ye **kolineyɛri** ye ni $\\det(\\vec u, \\vec v) = 0$ dɔrɔn. Tomi saba A, B, C bɛ juru kelen kan ni $\\overrightarrow{AB}$ ni $\\overrightarrow{AC}$ ye kolineyɛri ye.' }] },
    {
      title: 'Pɔrɔdui sikalɛri',
      blocks: [
        { legend: ['bazi ɔritonɔrimali kɔnɔ'] },
        {},
        { text: '$\\vec u$ ni $\\vec v$ ye **ɔritogonali** ye ni $\\vec u \\cdot \\vec v = 0$ dɔrɔn.' },
        { title: 'wɛkitɛri fila cɛ ɲɛnamini' },
      ],
    },
  ],
  essentials: ['AB(x_B − x_A ; y_B − y_A).', 'Kolineyɛri ⟺ det = xy′ − x′y = 0.', 'Bazi ɔritonɔrimali : u·v = xx′ + yy′ ; ‖u‖ = √(x² + y²).', 'Ɔritogonali ⟺ u·v = 0.'],
  exercises: [
    { title: 'Tomiw bɛ juru kelen kan wa ?', parts: [{ label: '$\\overrightarrow{AB}$ ni $\\overrightarrow{AC}$ ka determinan.', steps: ['$\\overrightarrow{AB}(2\\,;\\,4)$, $\\overrightarrow{AC}(4\\,;\\,8)$.', '$2 \\times 8 - 4 \\times 4 = 0$ : tomiw bɛ juru kelen kan.'] }] },
    { title: 'Tiriyangili ɲɛnamini jɔlenma ?', statement: 'Repɛri ɔritonɔrimali kɔnɔ : A(0 ; 0), B(4 ; 2), C(1 ; 5).', parts: [{ label: 'Pɔrɔdui sikalɛri $\\overrightarrow{BA} \\cdot \\overrightarrow{BC}$.' }, { label: 'Pɔrɔdui sikalɛri $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$.', steps: ['$\\overrightarrow{AB}(4\\,;\\,2)$, $\\overrightarrow{AC}(1\\,;\\,5)$ : $4 + 10 = 14$. Tiriyangili ɲɛnamini jɔlen tɛ A la, a tɛ B la.'] }] },
  ],
  quiz: [
    { question: 'Ni A(2 ; 3) ani B(5 ; −1), $\\overrightarrow{AB}$ kowɔridonew ye :', explanation: 'Se yɔrɔ bɔ bɔyɔrɔ la.' },
    { question: '$\\vec u(2\\,;\\,3)$ ni $\\vec v(4\\,;\\,6)$ ye :', choices: ['kolineyɛriw', 'ɔritogonaliw', 'kelen', 'ɲɔgɔn sɛgɛnninw'], explanation: '$\\vec v = 2\\vec u$.' },
    { question: '$\\vec u(3\\,;\\,4)$ nɔrimu ye :', explanation: '√(9 + 16) = 5.' },
    { question: 'Wɛkitɛri fila minnu tɛ 0 ye, ni u ka pɔrɔdui sikalɛri ye 0 ye, u ye :', choices: ['ɔritogonaliw', 'kolineyɛriw', 'kelen', 'nɔrimu kelen'], explanation: 'cos 90° = 0.' },
  ],
  applications: [
    {
      title: 'Baji tigɛli',
      tagline: 'Ji woyo bɛ kurun ta',
      situation: 'Kurunbolila bɛ kurun gɛn Jeliba ɲɛ tɛgɛrɛ jɔlen m/s 1,2 la ; ji woyo b’a digi duguma fɛ m/s 0,5 la. Baji bonya ye mɛtɛrɛ 480 ye.',
      model: 'Teliya yɛrɛ = teliya wɛkitɛri fila faralen (tɛgɛrɛ jɔlen ɲɔgɔn na).',
      questions: ['Kurun teliya yɛrɛ ye joli ye, m/s la ?', 'A bɛ ta ka taa duguma mɛtɛrɛ joli ni a sera fan dɔ wɛrɛ fɛ ?'],
      solution: ['$\\|\\vec v\\| = \\sqrt{1{,}2^2 + 0{,}5^2} = \\sqrt{1{,}69} = 1{,}3$ m/s.', 'Tigɛli waati : $\\dfrac{480}{1{,}2} = 400$ s ; tali : $0{,}5 \\times 400 = 200$ m duguma fɛ.'],
      fact: 'Walasa ka se a ɲɛ yɛrɛ la, kurunbolila ka kan ka a gɛn dɔɔnin sanfɛ fɛ.',
    },
  ],
};
