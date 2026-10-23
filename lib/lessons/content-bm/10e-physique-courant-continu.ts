import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Kalaban Kura so dɔ kɔnɔ, an bɛ salɔn lanpu mana : gaa lanpu bɛ to a manalen. Su fɛ, butiki guirilandi ampuli kelen dɔrɔn bɛ jeni, guirilandi bɛɛ bɛ faga. Siri fila in tɛ kelen ye : so kɔnɔ u sirilen bɛ **ɲɔgɔn kɛrɛfɛ**, guirilandi kɔnɔ **ɲɔgɔn nɔfɛ**.',
  objectives: ['ka ɛntansite sumanikɛ ni ampɛrimɛtiri ye ani tansiyɔn ni vɔlitimɛtiri ye ;', 'ka nɔgɔw ka sariya kɛ baara la ;', 'ka sira datugulenw ka sariya kɛ baara la (tansiyɔnw farali) ;', 'ka ɲɔgɔn nɔfɛ ni ɲɔgɔn kɛrɛfɛ siri danfara dɔn.'],
  sections: [
    {
      title: 'Ɛntansite ni tansiyɔn',
      blocks: [
        { term: 'Ɛntansite I', text: 'kuran sarizi minnu bɛ tɛmɛ juru kɔnɔ, olu caya, anperi (A) la. An b’a sumanikɛ ni **ampɛrimɛtiri** ye min sirilen bɛ **ɲɔgɔn nɔfɛ**.' },
        { term: 'Tansiyɔn U', text: 'kuran danfara tomi fila cɛ, vɔliti (V) la. An b’a sumanikɛ ni **vɔlitimɛtiri** ye min sirilen bɛ **ɲɔgɔn kɛrɛfɛ** fɛn in dawolo fila la.' },
        { text: 'Laadala, kuran bɛ bɔ kuranbɔlan + fɛ ka don − fɛ. Ɛlɛkitɔrɔnw bɛ taa fan dɔ wɛrɛ fɛ.' },
      ],
    },
    {
      title: 'Kuran siraw ka sariyaw',
      blocks: [
        { text: '**Nɔgɔw ka sariya** : ɛntansite minnu bɛ se nɔgɔ dɔ ma, olu faralen ye ɛntansite minnu bɛ bɔ a la, olu faralen ye.' },
        { text: '**Sira datugulenw ka sariya** : sira datugulen dɔ kɔnɔ, tansiyɔnw faralen fan kelen fɛ ye 0 ye. Ɲɔgɔn nɔfɛ : $U_{\\text{générateur}} = U_1 + U_2$.' },
        {
          head: ['', 'Ɲɔgɔn nɔfɛ', 'Ɲɔgɔn kɛrɛfɛ'],
          rows: [
            ['ɛntansite', 'a ye kelen ye yɔrɔ bɛɛ', 'a bɛ tila : $I = I_1 + I_2$'],
            ['tansiyɔn', 'a bɛ tila : $U = U_1 + U_2$', 'a ye kelen ye bolo kelen-kelen bɛɛ dawolo la'],
            ['ni fɛn kelen bɔra', 'fɛn bɛɛ bɛ jɔ', 'bolo tɔw bɛ baara kɛ'],
          ],
        },
      ],
    },
  ],
  essentials: ['Ampɛrimɛtiri ɲɔgɔn nɔfɛ, vɔlitimɛtiri ɲɔgɔn kɛrɛfɛ.', 'Nɔgɔw ka sariya : Σ I minnu bɛ don = Σ I minnu bɛ bɔ.', 'Sira datugulenw ka sariya : ɲɔgɔn nɔfɛ, tansiyɔnw bɛ fara ɲɔgɔn kan.', 'Ɲɔgɔn kɛrɛfɛ, bolo kelen-kelen bɛɛ ka tansiyɔn ye kelen ye, a bɛ baara kɛ a kelen.'],
  simulationTasks: ['lanpu fila siri ɲɔgɔn nɔfɛ, o kɔ L1 bɔ : L2 bɛ mun kɛ ?', 'ɲɔgɔn kɛrɛfɛ siri : sira kunba ɛntansite ni bolow ta suma ;', 'lanpu kelen-kelen bɛɛ dawolo la tansiyɔnw sɛbɛn siri fila bɛɛ la.'],
  exercises: [
    {
      title: 'Nɔgɔw ka sariya',
      statement: 'Sira kunba bɛ A 0,80 sɔrɔ. A bɛ tila bolo fila ye ; bolo kelen bɛ A 0,35 sɔrɔ.',
      parts: [{ label: 'Bolo tɔ kelen ka ɛntansite, A la.', steps: ['$I_2 = 0{,}80 - 0{,}35 = 0{,}45$ A.'] }],
    },
    {
      title: 'Lanpuw ɲɔgɔn nɔfɛ',
      statement: 'Kuranbɔlan V 12 bɛ lanpu saba balo ɲɔgɔn nɔfɛ. L1 dawolo la tansiyɔn ye V 3,5 ye, L2 ta ye V 4,0 ye.',
      parts: [
        { label: 'L3 dawolo la tansiyɔn, V la.', steps: ['$U_3 = 12 - 3{,}5 - 4{,}0 = 4{,}5$ V.'] },
        { label: 'Ni L1 jenina, tansiyɔn joli bɛ kalan L2 dawolo la ? (V la)', steps: ['Sira tigɛlen don : kuran tɛ tɛmɛ tuguni, o la $U_2 = R \\times 0 = 0$ V.'] },
      ],
    },
  ],
  quiz: [
    { question: 'Vɔlitimɛtiri bɛ siri :', choices: ['ɲɔgɔn kɛrɛfɛ', 'ɲɔgɔn nɔfɛ', 'cogo bɛɛ', 'kuranbɔlan nɔ na'], explanation: 'A bɛ tansiyɔn sumanikɛ tomi fila cɛ.' },
    { question: 'Sira ɲɔgɔn nɔfɛ kɔnɔ, ɛntansite ye :', choices: ['kelen ye yɔrɔ bɛɛ', 'a ka bon kuranbɔlan gɛrɛfɛ', '0', 'a tɛ kelen ye lanpu kelen-kelen bɛɛ la'], explanation: 'Sira kelen dɔrɔn de bɛ yen.' },
    { question: 'So kɔnɔ kuran pirisiw sirilen bɛ :', choices: ['ɲɔgɔn kɛrɛfɛ', 'ɲɔgɔn nɔfɛ', 'sira surun na', 'juru tɛ'], explanation: 'Minɛn kelen-kelen bɛɛ bɛ V 220 sɔrɔ, a bɛ baara kɛ a kelen.' },
    { question: 'Kuran laadala bɛ bɔ kuranbɔlan na nin fɛ :', choices: ['+ fɛ', '− fɛ', 'u fila bɛɛ', 'u si'], explanation: 'Ɛlɛkitɔrɔnw, olu bɛ bɔ − fɛ.' },
  ],
  applications: [
    {
      title: 'Bugu ka tile panno',
      tagline: 'Ampuli joli bɛ batiri kelen kan ?',
      situation: 'Kulikɔrɔ gɛrɛfɛ dugu dɔ la, denbaya dɔ bɛ LED ampuli 4 V 12 balo ɲɔgɔn kɛrɛfɛ batiri V 12 kan. Ampuli kelen-kelen bɛɛ bɛ A 0,25 sɔrɔ.',
      model: 'Ɲɔgɔn kɛrɛfɛ siri : I = I₁ + I₂ + I₃ + I₄.',
      questions: ['Ɛntansite joli bɛ bɔ batiri la ?', 'Mun na ɲɔgɔn kɛrɛfɛ siri sugandira ?'],
      solution: ['$4 \\times 0{,}25 = 1{,}0$ A.', 'Ampuli kelen-kelen bɛɛ bɛ V 12 sɔrɔ, a bɛ se ka mana walima ka faga a kelen ; ni kelen jenina, tɔw bɛ to u manalen.'],
      fact: 'Denbaya tile kuran minɛnw bɛ Mali so waa caman yeelen bi, minnu ma siri kuran sira kunba la.',
    },
  ],
};
