import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Dugu kɔlɔn ka kan ka sen yɔrɔ jumɛn walasa kin saba bɛɛ ka ji sɔrɔ cogo kelen na ? Bɔrɔ minnu girinya tɛ kelen ye, olu bilalen dilan dɔ kan, a balansi yɔrɔ bɛ min ? Jatebɔ jɔyɔrɔw bɛ o jaabi ni juruw ekwasiyɔnw ye, **barisantiri** ani dɛrɛ-juruw.',
  objectives: ['ka juru dɔ ekwasiyɔn sɛbɛn ka yɔrɔjan jate ;', 'ka barisantiri kowɔridonew jate ;', 'ka dɛrɛ-juru nɔgɔmanw dɔn (mediyatirisi, sɛrikili) ;', 'ka ɲɛnamini ɲɛsinnenw kɛ baara la.'],
  sections: [
    {
      title: 'Juruw ni yɔrɔjanw',
      blocks: [
        { legend: ['juru dɔ ekwasiyɔn kartezini ; $\\vec u(-b\\,;\\,a)$ ye a ka wɛkitɛri ɲɛminɛbaga dɔ ye'] },
        { legend: ['tomi dɔ ni juru dɔ cɛ yɔrɔjan (repɛri ɔritonɔrimali)'] },
      ],
    },
    {
      title: 'Barisantiri',
      blocks: [
        { term: 'Barisantiri', text: 'tomi girinyalenw $(A, \\alpha)$ ni $(B, \\beta)$ ka barisantiri $G$, ni $\\alpha + \\beta \\ne 0$, o ye tomi kelen dɔrɔn ye min bɛ nin bɛn : $\\alpha\\overrightarrow{GA} + \\beta\\overrightarrow{GB} = \\vec 0$.' },
        {},
        { text: 'Ni girinyaw ye kelen ye, tomi fila ka barisantiri ye u cɛmancɛ ye ; tomi saba ta ye tiriyangili ka **girinya cɛmancɛ** ye.' },
      ],
    },
    {
      title: 'Dɛrɛ-juruw ni ɲɛnamini ɲɛsinnenw',
      blocks: [
        { items: ['tomi M minnu bɛ $MA = MB$ bɛn, olu ye [AB] ka **mediyatirisi** ye ;', 'tomi M minnu bɛ $MA = r$ bɛn, olu ye **sɛrikili** ye min cɛmancɛ ye A ye, a rayɔn ye r ye ;', 'tomi M minnu bɛ $\\overrightarrow{MA} \\cdot \\overrightarrow{MB} = 0$ bɛn, olu ye sɛrikili ye min dayamɛtiri ye [AB] ye.'] },
        { text: 'Wɛkitɛriw ka ɲɛnamini ɲɛsinnen $(\\vec u, \\vec v)$ bɛ munumunuli fan jateminɛ : a bɛ dɔn $2\\pi$ kɔnɔ, ani $(\\vec v, \\vec u) = -(\\vec u, \\vec v)$.' },
      ],
    },
  ],
  essentials: ['Juru : ax + by + c = 0 ; yɔrɔjan AB = √((Δx)² + (Δy)²).', 'Barisantiri : kowɔridonew mɔyɛni girinyalen kowefisiyanw fɛ.', 'Mediyatirisi : MA = MB ; sɛrikili : MA = r.', 'Ɲɛnamini ɲɛsinnenw bɛ dɔn 2π kɔnɔ.'],
  exercises: [
    { title: 'Barisantiri dɔ', statement: 'A(0 ; 0) ani B(6 ; 3). G ye (A ; 2) ni (B ; 1) ka barisantiri ye.', parts: [{ label: 'G abisisi.' }, { label: 'G ordone.', steps: ['$y_G = \\dfrac{0 + 3}{3} = 1$. G ka surun A la, girinya belebeleba tigi.'] }] },
    { title: 'Yɔrɔjan ka taa sira la', statement: 'Repɛri ɔritonɔrimali kɔnɔ (inite : km 1), sira tilennen dɔ ekwasiyɔn ye $3x + 4y - 12 = 0$ ye. Lakɔli dɔ bɛ E(4 ; 3) la.', parts: [{ label: 'Lakɔli ni sira cɛ yɔrɔjan, km la.' }] },
  ],
  quiz: [
    { question: '(A ; 1) ni (B ; 1) ka barisantiri ye :', choices: ['[AB] cɛmancɛ', 'tomi A', 'tomi B', 'a tɛ yen'], explanation: 'Girinyaw ye kelen ye.' },
    { question: 'Tomi minnu ka jan A ni B la cogo kelen, olu ye :', choices: ['[AB] ka mediyatirisi', 'sɛrikili min dayamɛtiri ye [AB]', 'juru (AB)', '[AB] cɛmancɛ'] },
    { question: 'Juru $2x - y + 1 = 0$ ka wɛkitɛri ɲɛminɛbaga dɔ ye :', explanation: 'a = 2, b = −1 : (−b ; a) = (1 ; 2).' },
    { question: 'A(1 ; 1) ni B(4 ; 5) cɛ yɔrɔjan ye :' },
  ],
  applications: [
    {
      title: 'Suman maralan',
      tagline: 'A jɔ yɔrɔ jumɛn walasa ka dugu saba dɛmɛ ?',
      situation: 'Dugu saba, A(0 ; 0), B(8 ; 0) ani C(2 ; 6) (km la), u mɔgɔ hakɛ ye 1 000, 2 000 ani 1 000 ye. An b’a fɛ ka suman maralan jɔ duguw ka barisantiri la, u girinyalen u mɔgɔ hakɛ fɛ.',
      model: '(A ; 1), (B ; 2), (C ; 1) ka barisantiri.',
      questions: ['Maralan abisisi ye joli ye, km la ?', 'A ordone ye joli ye ?'],
      solution: ['$x_G = \\dfrac{0 + 16 + 2}{4} = 4{,}5$ km.', '$y_G = \\dfrac{0 + 0 + 6}{4} = 1{,}5$ km : maralan bɛ sama B fɛ, dugu min mɔgɔw ka ca kosɛbɛ.'],
      fact: 'Barisantiri daɲɛ bɔra Gɛrɛki kan na « barus », o kɔrɔ ye girin : a ye girinyaw cɛmancɛ ye.',
    },
  ],
};
