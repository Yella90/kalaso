import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Dugukolo ni Tile cɛ, km 150 000 000, ani wirisi dɔ bonya, m 0,000 000 1 : ka o jatew sɛbɛn pewu ka gɛlɛn, fili bɛ don a la. **10 pisansiw**, rasini karew, entɛriwaliw ani valɛri apsoliw ye ℝ kɔnɔ jatebɔ tilennen minɛn fɔlɔw ye.',
  objectives: ['ka jatebɔ kɛ ni pisansiw ni siyansi sɛbɛncogo ye ;', 'ka rasini karew nɔgɔya ;', 'ka entɛriwaliw jira ka valɛri apsoli kɛ baara la ;', 'ka dancɛ ni hakɛ gɛrɛfɛla di.'],
  sections: [
    {
      title: 'Pisansiw ni rasiniw',
      blocks: [
        {},
        { term: 'Siyansi sɛbɛncogo', text: '$a \\times 10^n$ ni $1 \\le a < 10$ ani $n$ ye jateden dafalen ye. Misali : $150\\,000\\,000 = 1{,}5 \\times 10^8$.' },
        {},
        { title: 'ka nɔgɔya', text: '$\\sqrt{72}$ nɔgɔya ani ka rasini bɔ $\\dfrac{3}{\\sqrt2}$ dugumajate la.', steps: ['$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt2$.', '$\\dfrac{3}{\\sqrt2} = \\dfrac{3\\sqrt2}{2}$.'] },
        { why: '$\\sqrt{25} = 5$ : farali rasini tɛ rasiniw faralen ye.', reflex: 'Rasini bɛ tila sigiyɔrɔ jatebɔ kan, farali kan abada.' },
      ],
    },
    {
      title: 'Entɛriwaliw ni valɛri apsoli',
      blocks: [
        { head: ['Danfara', 'Entɛriwali'] },
        { term: 'Valɛri apsoli', text: '$|x| = x$ ni $x \\ge 0$ ani $|x| = -x$ ni $x < 0$. $|x - a|$ ye $x$ ni $a$ cɛ **yɔrɔjan** ye juru kan.' },
        {},
      ],
    },
  ],
  essentials: ['Pisansi sariyaw ; siyansi sɛbɛncogo a × 10ⁿ ni 1 ≤ a < 10.', '√(ab) = √a √b, nka √(a + b) ≠ √a + √b.', '|x − a| ye x ni a cɛ yɔrɔjan ye.', '|x − a| ≤ r ⟺ x ∈ [a − r ; a + r].'],
  exercises: [
    {
      title: 'Jatebɔ ni pisansiw ye',
      statement: 'A jate k’a sɔrɔ i ma jatebɔlan kɛ.',
      parts: [{ steps: ['$2^{5 - 2 - 2} = 2^1 = 2$.'] }, { label: '$(3 \\times 10^4) \\times (5 \\times 10^{-6})$, dɛsimali sɛbɛncogo la.', steps: ['$15 \\times 10^{-2} = 0{,}15$.'] }],
    },
    {
      title: 'Valɛri apsoli ni entɛriwali',
      statement: 'An bɛ jateden x ɲini minnu $|x - 3| \\le 2$.',
      parts: [{ label: 'x hakɛ dɔgɔmanba.', steps: ['$x \\in [3 - 2\\,;\\,3 + 2] = [1\\,;\\,5]$.'] }, { label: 'x hakɛ belebeleba.', steps: ['$x \\le 5$.'] }],
    },
  ],
  quiz: [
    { question: '$\\sqrt{50}$ ye :', explanation: '50 = 25 × 2.' },
    { question: '$0{,}000\\,42$ siyansi sɛbɛncogo la :', explanation: 'Jateden kelen dɔrɔn min tɛ 0 ye, o bɛ virigili ɲɛ.' },
    { question: '$|-7|$ ye :', explanation: 'Valɛri apsoli ye yɔrɔjan ye, a ye pozitifu ye tuma bɛɛ.' },
    { question: 'x minnu $-2 < x \\le 4$, olu entɛriwali ye :', explanation: 'Kurusi dayɛlɛlen danfara dafalen tɛ kama.' },
  ],
  applications: [
    {
      title: 'Menizie ka dancɛ',
      tagline: 'Da min bɛ datugu ka ɲɛ',
      situation: 'Segu menizie dɔ bɛ da dilan minnu janya ye m 2,10 ye. Walasa da ka datugu ka ɲɛ, a janya yɛrɛ h (m la) ka kan ka nin bɛn : $|h - 2{,}10| \\le 0{,}004$.',
      model: 'Valɛri apsoli bɛ danfara belebeleba jira hakɛ dɔ lamini.',
      questions: ['Janya belebeleba min bɛ sɔn, o ye joli ye, m la ?', 'Da m 2,095 bɛ sɔn wa ?'],
      solution: ['$h \\in [2{,}096\\,;\\,2{,}104]$ : janya belebeleba ye m 2,104 ye.', '$|2{,}095 - 2{,}10| = 0{,}005 > 0{,}004$ : a tɛ sɔn.'],
      fact: 'Izini kɔnɔ, u b’a fɔ « tolérance » : o ye danfara ye ni valɛri apsoli ye yɛrɛ.',
    },
  ],
};
