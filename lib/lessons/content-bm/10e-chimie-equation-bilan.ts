import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Ni fɛnfɛn bɛ jeni furunu kɔnɔ, a bɛ tunun fɛrɛ bɛɛ. Nka foyi tɛ tunun : karibɔni atɔmuw bɛ taa fiɲɛ kɔnɔ karibɔni dioksidi cogo la. **Ekwasiyɔn-bilan** bɛ a jira min bɛ yɛlɛma ani hakɛ jumɛnw na ; a b’a to an bɛ pɔrɔdui hakɛ dɔn ka kɔn, ani reyakitifu min bɛna ban fɔlɔ.',
  objectives: ['ka ekwasiyɔn-bilan sɛbɛn ka a balansi ;', 'ka kowefisiyanw kɔrɔ fɔ fɛn hakɛw la ;', 'ka taa ɲɛ tabulo dilan ka reyakitifu danna ɲini ;', 'ka reyakitifuw ni pɔrɔduiw girinyaw jate.'],
  sections: [
    {
      title: 'Ka sɛbɛn ka balansi',
      blocks: [
        { text: 'Simi reyaksiyɔn kɔnɔ, atɔmuw bɛ labɛn kokura : **ɛlɛman** kelen-kelen bɛɛ ani **kuran sarizi** bɛ mara. An bɛ ekwasiyɔn balansi ni kowefisiyanw bilali ye fɔrimiliw ɲɛfɛ, an tɛ fɔrimiliw yɛlɛma abada.' },
        { title: 'metani jeni', text: '$\\ce{CH4 + O2 -> CO2 + H2O}$, k’a balansi.', steps: ['Karibɔni : 1 fan fila bɛɛ la.', 'Idirozɛni : 4 numanfɛ, o la $\\ce{2H2O}$ kininfɛ.', 'Oksizɛni : $2 + 2 = 4$ kininfɛ, o la $\\ce{2O2}$ numanfɛ.', '$\\ce{CH4 + 2O2 -> CO2 + 2H2O}$.'] },
        { text: 'Kowefisiyanw bɛ hakɛw di **mɔliw** la : metani mol 1 bɛ reyaksiyɔn kɛ ni dioksizɛni mol 2 ye ka karibɔni dioksidi mol 1 ani ji mol 2 di.' },
      ],
    },
    {
      title: 'Taa ɲɛ ni reyakitifu danna',
      blocks: [
        { text: '**Taa ɲɛ** $x$ (mol la) bɛ reyaksiyɔn ka taa ɲɛ suman. $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$ kama, taa ɲɛ $x$ la, metani mol $x$ ni dioksizɛni mol $2x$ tununna, ani $\\ce{CO2}$ mol $x$ ni ji mol $2x$ bɔra.' },
        { rows: [['daminɛ', '1,0', '1,5', '0', '0'], ['a kɛtuma', '$1{,}0 - x$', '$1{,}5 - 2x$', '$x$', '$2x$'], ['laban ($x_{max} = 0{,}75$)', '0,25', '0', '0,75', '1,5']] },
        { text: '**Reyakitifu danna** ye min bɛ ban fɔlɔ ye : a bɛ taa ɲɛ belebeleba $x_{max}$ sigi, hakɛ dɔgɔmanba min bɛ reyakitifu kelen-kelen bɛɛ ban. Yan : $1{,}0 - x = 0$ bɛ 1,0 di ; $1{,}5 - 2x = 0$ bɛ 0,75 di. Dioksizɛni de ye danna ye.' },
        { wrong: '« Reyakitifu danna ye min mɔli ka dɔgɔ ye. »', why: 'Kowefisiyanw ka kan ka jateminɛ : dioksizɛni (mol 1,5) ka ca ni metani (mol 1,0) ye, nka a ka kan ka caya siɲɛ fila.', reflex: '$\\frac{n}{\\text{kowefisiyan}}$ sanga ɲɔgɔn ma reyakitifu kelen-kelen bɛɛ kama.' },
      ],
    },
  ],
  essentials: ['Ɛlɛmanw ni sariziw bɛ mara ; an bɛ balansi ni kowefisiyanw ye.', 'Kowefisiyanw bɛ hakɛw di mɔliw la.', 'Taa ɲɛ tabulo ; $x_{max}$ = hakɛ dɔgɔmanba min bɛ reyakitifu dɔ ban.', 'Reyakitifu danna : $\\frac{n}{\\text{kowefisiyan}}$ dɔgɔmanba.'],
  exercises: [
    {
      title: 'Ka balansi',
      statement: '$\\ce{Fe + O2 -> Fe3O4}$ (nɛgɛ jeni) ni $\\ce{Al + O2 -> Al2O3}$ balansi.',
      parts: [{ label: '$\\ce{O2}$ kowefisiyan ekwasiyɔn fɔlɔ kɔnɔ (1 bilalen $\\ce{Fe3O4}$ ɲɛfɛ).' }, { label: '$\\ce{Al}$ kowefisiyan ekwasiyɔn filanan kɔnɔ (jateden dafalen dɔgɔmanbaw).' }],
    },
    {
      title: 'Reyakitifu danna',
      statement: 'An bɛ metani g 16 jeni ni dioksizɛni g 48 ye : $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$.',
      parts: [{ label: 'Taa ɲɛ belebeleba (mol la).', steps: ['$n(\\ce{CH4}) = 1{,}0$ mol ; $n(\\ce{O2}) = 1{,}5$ mol.', '$x_{max} = \\min(1{,}0\\,;\\dfrac{1{,}5}{2}) = 0{,}75$ mol : dioksizɛni de ye danna ye.'] }, { label: 'Karibɔni dioksidi girinya min bɔra (g la).' }],
    },
  ],
  quiz: [
    { question: 'Simi reyaksiyɔn kɔnɔ, min bɛ mara :', choices: ['simi ɛlɛmanw ni girinya bɛɛ lajɛlen', 'molekiliw', 'mɔli hakɛ bɛɛ lajɛlen', 'volime'], explanation: 'Atɔmuw bɛ labɛn kokura u tɛ tunun (Lavoisier).' },
    { question: '$\\ce{2H2 + O2 -> 2H2O}$ kɔnɔ, diidirozɛni mol 4 bɛ reyaksiyɔn kɛ ni :', choices: ['dioksizɛni mol 2', 'mol 4', 'mol 1', 'mol 8'], explanation: 'Hakɛw : 2 ni 1.' },
    { question: 'Walasa ka ekwasiyɔn balansi, an bɛ se ka :', choices: ['kowefisiyanw yɛlɛma', 'fɔrimiliw yɛlɛma', 'atɔmuw fara a kan', 'pɔrɔdui dɔ bɔ a la'], explanation: 'Fɛnw ka fɔrimiliw tɛ yɛlɛma abada.' },
    { question: 'Reyakitifu danna ye :', choices: ['min bɛ ban pewu fɔlɔ', 'min girinya ka dɔgɔ', 'pɔrɔdui dɔ', 'dioksizɛni tuma bɛɛ'], explanation: 'A bɛ reyaksiyɔn jɔ.' },
  ],
  applications: [
    {
      title: 'Furunu fɛnfɛn',
      tagline: 'Fɛnfɛn min bɛ jeni, o bɛ kɛ mun ye ?',
      situation: 'Denbaya dɔ bɛ fɛnfɛn kg 1,2 jeni don o don, an b’a jate karibɔni sɛnuman ye : $\\ce{C + O2 -> CO2}$.',
      model: 'Karibɔni jeni dafalen.',
      questions: ['Karibɔni dioksidi girinya jumɛn bɛ bɔ don o don, kg la ?'],
      solution: ['$n(\\ce{C}) = \\dfrac{1\\,200}{12} = 100$ mol, olu bɛ $\\ce{CO2}$ mol 100 di.', '$m = 100 \\times 44 = 4\\,400$ g = kg 4,4 : a ka ca ni fɛnfɛn girinya ye kosɛbɛ, bawo fiɲɛ ka dioksizɛni bɛ fara a kan.'],
      fact: 'Fɛnfɛn dilanni bɛ jiri caman tiɲɛ : furunu ɲuman kɛlenw ni gazi bɛ kungo tiɲɛni dɔgɔya.',
    },
  ],
};
