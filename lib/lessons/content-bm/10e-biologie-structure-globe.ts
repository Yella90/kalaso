import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Dingɛ dunmanba min sɔrɔla fɔlɔ, o ma tɛmɛ km 12 kan, k’a sɔrɔ Dugukolo cɛmancɛ bɛ an sen kɔrɔ km 6 370 na. Mɔgɔ si ma se yen. An bɛ a dɔn cogo di ko nɛgɛ kɛsɛ bɛ Dugukolo la min yɔrɔ dɔ ye ji ye ? Ka **dugukolo yɛrɛyɛrɛw** lamɛn : u ka ondw bɛ dugukolo tigɛ ka a kɔnɔfɛnw jira.',
  objectives: [
    'ka Dugukolo wolow n’u bonyaw ɲɛfɔ ;',
    'ka ɲɛfɔ dugukolo yɛrɛyɛrɛ ondw bɛ kunnafoni di cogo min dugukolo kɔnɔ ko la ;',
    'ka jamana wolo ni kɔgɔji wolo danfara dɔn ;',
    'ka dunya ni funteni kunnafoniw kɛ baara la.',
  ],
  sections: [
    {
      title: 'Dugukolo wolow',
      blocks: [
        { caption: 'Dugukolo wolow (bonyaw ma bɛn).' },
        {
          head: ['Wolo', 'Dunya', 'A cogo ni a dilannen'],
          rows: [
            ['wolo (croûte)', '0 ka se km 5–70 ma', 'gɛlɛn ; granit (jamanaw) walima bazalti (kɔgɔjiw)'],
            ['mantɔ', 'fo km 2 900', 'gɛlɛn nka a bɛ se ka woyo dɔɔnin-dɔɔnin ; peridotiti'],
            ['kɛsɛ kɛnɛmala', 'km 2 900 ka se 5 100 ma', 'ji ; nɛgɛ ni nikɛli'],
            ['kɛsɛ kɔnɔmala', 'km 5 100 ka se 6 370 ma', 'gɛlɛn ; nɛgɛ ni nikɛli'],
          ],
        },
        { term: 'Litosifɛri', text: 'wolo gɛlɛn min dilannen bɛ wolo ni mantɔ sanfɛla la, a dunya ye km 100 ɲɔgɔn ye. A tigɛlen bɛ ka kɛ pilakiw ye minnu bɛ cɛrɛn **asitenosifɛri** kan, min ka kalan ka nɔgɔn.' },
      ],
    },
    {
      title: 'Dugukolo yɛrɛyɛrɛw bɛ mun fɔ',
      blocks: [
        {
          items: [
            'ondw **P** (digili) bɛ fɛn gɛlɛnw ni jiw bɛɛ tigɛ ;',
            'ondw **S** (cɛrɛnni) **tɛ ji tigɛ** ;',
            'u teliya bɛ yɛlɛma joona wolo fila danyɔrɔ kelen-kelen bɛɛ la : **dancɛ** (Moho jamanaw jukɔrɔ km 30 ɲɔgɔn na, Gutenberg km 2 900 na).',
          ],
        },
        { text: 'Ondw S tɛ kɛsɛ kɛnɛmala tigɛ : o de ye a seere ye ko ji don.' },
        { legend: ['dugukolo yɛrɛyɛrɛ ond teliya : yɔrɔjan min tigɛra ÷ waati'] },
      ],
    },
    {
      title: 'Kɔnɔ funteni',
      blocks: [
        { text: 'Funteni bɛ caya ni dunya ye : °C 3 ɲɔgɔn mɛtɛrɛ 100 o mɛtɛrɛ 100 wolo kɔnɔ (zewotɛrimi gradiyan), ka tɛmɛ °C 5 000 kan kɛsɛ kɔnɔ. O funteni bɛ bɔ fɛn radiyoaktifuw ka tiɲɛni de la ; a bɛ mantɔ ni pilakiw lamaga.' },
      ],
    },
  ],
  essentials: [
    'Wolo, mantɔ (fo km 2 900), kɛsɛ kɛnɛmala ji, kɛsɛ kɔnɔmala gɛlɛn.',
    'Jamana wolo : granit, a dunman ; kɔgɔji wolo : bazalti, a finman.',
    'Ondw S tɛ ji tigɛ : kɛsɛ kɛnɛmala ye ji ye.',
    'Funteni bɛ caya ni dunya ye (≈ °C 3 / m 100 wolo kɔnɔ).',
  ],
  exercises: [
    {
      title: 'Ond P teliya',
      statement: 'Ond P dɔ bɛ km 1 200 tigɛ miniti 2 ni segɔn 30 kɔnɔ.',
      parts: [
        { label: 'Waati segɔn na.', steps: ['$2 \\times 60 + 30 = 150$ s.'] },
        { label: 'Ond teliya, km/s la.', steps: ['$v = \\dfrac{1\\,200}{150} = 8$ km/s.'] },
      ],
    },
    {
      title: 'Funteni sanu dingɛ dɔ duguma',
      statement: 'Dugukolo kan, funteni ye °C 28 ye. A bɛ caya °C 3 mɛtɛrɛ 100 o mɛtɛrɛ 100.',
      parts: [{ label: 'Funteni dingɛ dɔ duguma min dunya ye mɛtɛrɛ 800 (°C).', steps: ['$800 \\div 100 = 8$ tilayɔrɔ.', '$28 + 8 \\times 3 = 52$ °C.'] }],
    },
  ],
  quiz: [
    {
      question: 'Wolo jumɛn ye ji ye ?',
      choices: ['kɛsɛ kɛnɛmala', 'mantɔ', 'wolo', 'kɛsɛ kɔnɔmala'],
      explanation: 'Ondw S t’a tigɛ.',
    },
    {
      question: 'Kɔgɔji wolo dilannen bɛ ka tɛmɛ :',
      choices: ['bazalti la', 'granit la', 'kalikɛri la', 'nɛgɛ la'],
      explanation: 'Jamana wolo fanba ye granit ye.',
    },
    {
      question: 'Litosifɛri bɛ nin sɔrɔ :',
      choices: ['wolo ni mantɔ sanfɛla', 'wolo dɔrɔn', 'mantɔ ni kɛsɛ', 'kɛsɛ'],
      explanation: 'O de bɛ tɛkitoniki pilakiw dilan.',
    },
    {
      question: 'Dugukolo rayɔn ye :',
      choices: ['km 6 370', 'km 637', 'km 63 700', 'km 12'],
      explanation: 'km 12 ye dingɛ dunmanba dunya ye.',
    },
  ],
  applications: [
    {
      title: 'Bamakɔ sisimogarafu',
      tagline: 'Dugukolo yɛrɛyɛrɛ kɛra yɔrɔ jan joli ?',
      situation: 'Dugukolo yɛrɛyɛrɛ dɔ bɛ kɛ Afiriki Kɔgɔdugu la. Bamakɔ sitasiyɔn na, ondw P bɛ se ondw S ɲɛ miniti 3 ni segɔn 20. Ondw P bɛ taa km/s 8 la, ondw S km/s 4,5 la.',
      model: 'P ni S cɛ waati Δt ye d/vS − d/vP ye, o la d = Δt ÷ (1/vS − 1/vP).',
      questions: ['Dugukolo yɛrɛyɛrɛ bɔyɔrɔ bɛ Bamakɔ la yɔrɔ jan km joli ?', 'Mun na sitasiyɔn saba ka kan k’a yɔrɔ dɔn ?'],
      solution: [
        '$\\Delta t = 200$ s ; $\\dfrac{1}{4{,}5} - \\dfrac{1}{8} \\approx 0{,}0972$ s/km.',
        '$d = \\dfrac{200}{0{,}0972} \\approx 2\\,057$ km.',
        'Sitasiyɔn kelen-kelen bɛɛ bɛ sɛrikili dɔ di min rayɔn ye d ye ; sɛrikili saba bɛ ɲɔgɔn tigɛ tomi kelen dɔrɔn na, episantiri.',
      ],
      fact: 'Mali ye jamana ye dugukolo yɛrɛyɛrɛ ka dɔgɔ yɔrɔ min na, nka a bɛ yɛrɛyɛrɛ belebeleba janw dɔw kalama tuma dɔw la.',
    },
  ],
};
