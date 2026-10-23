import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Ɲɔ kisɛ kelen girinya ye miligaramu dama ye ; jiri min bɔra a la, kalo dama kɔfɛ, o girinya ye garamu kɛmɛ caman ye. O fɛn bɛɛ bɛ bɔ min ? Dugukolo tɛ, i n’a fɔ a tun bɛ miiri cogo min na : a fanba bɛ bɔ fiɲɛ de la. Tile yeelen fɛ, bulu bɛ karibɔni dioksidi ni ji yɛlɛma ka kɛ sukaro ye. O ye **fotosentɛzi** ye.',
  objectives: [
    'ka fotosentɛzi jateminɛ sɛbɛn ;',
    'ka amidɔn ni oksizɛni dilanni jira ;',
    'ka klorofili ni kolorɔpilasitiw ka baara fɔ ;',
    'ka yeelen, CO₂ ani funteni ka nɔ ɲɛfɔ.',
  ],
  sections: [
    {
      title: 'Fotosentɛzi jateminɛ',
      blocks: [
        { legend: ['karibɔni dioksidi + ji → sukaro (glukozi) + oksizɛni'] },
        {
          items: [
            '**CO₂** bɛ don **sitomatiw** fɛ, bulu dingɛ fitininw ;',
            '**ji** ni kɔgɔ minɛralw bɛ yɛlɛn ka bɔ lili la **sɛwu kɔrɔ** fɛ ;',
            'glukozi bɛ yɛlɛma ka kɛ **amidɔn** ye (marali) walima a bɛ ci jiri yɔrɔ bɛɛ la **sɛwu labɛnnen** fɛ.',
          ],
        },
        { caption: 'Sitomati dɔ : selili fila minnu bɛ i n’a fɔ sɔ kisɛ, olu bɛ dingɛ lamini, CO₂ bɛ don min fɛ.' },
      ],
    },
    {
      title: 'Kɔrɔbɔli minnu b’a jira',
      blocks: [
        {
          title: 'amidɔn bulu kɔnɔ',
          text: 'An bɛ bulu dɔ yɔrɔ dɔ datugu ni papiye finman ye lɛri 24 tile la, o kɔ an b’a ɲɛ bɔ ni alikɔli kalaman ye, ka a su iyodi ji la.',
          steps: ['Yɔrɔ min yeelen sɔrɔla, o bɛ kɛ bula-finman ye : amidɔn bɛ a la.', 'Yɔrɔ datugulen bɛ to nɛrɛmugu ye : ni yeelen tɛ, amidɔn tɛ.'],
        },
        { title: 'elode ka oksizɛni', text: 'Ji kɔnɔ jiri dɔ (elode) min bɛ yeelen sɔrɔ, o bɛ fununw bɔ. Gazi min minɛna, o bɛ bɔgɔ tasuma kunun : oksizɛni don.' },
        { caption: 'Elode seliliw : kisɛ binkɛnɛ kelen-kelen bɛɛ ye kolorɔpilasiti ye, fotosentɛzi bɛ kɛ yɔrɔ min na.' },
      ],
    },
    {
      title: 'Fotosentɛzi ka sababuw',
      blocks: [
        { text: 'Oksizɛni bɔli bɛ caya ni yeelen hakɛ, CO₂ hakɛ ani funteni ye (fo 30 °C ɲɔgɔn), o kɔ a bɛ jɔ.' },
        { text: '**Fɛn min bɛ a dan** ye o ye min bɛ fotosentɛzi bali ka teliya waati dɔ la : ka tɔw caya, o nafa tɛ.' },
        {
          wrong: '« Jiriw bɛ fotosentɛzi kɛ tile fɛ, u bɛ ninakili kɛ su fɛ. »',
          why: 'Jiriw bɛ ninakili kɛ tile ni su ; tile fɛ, fotosentɛzi bɛ oksizɛni dilan ka tɛmɛ ninakili ka min ta kan.',
          reflex: 'Ninakili : tuma bɛɛ ; fotosentɛzi : yeelen na dɔrɔn.',
        },
      ],
    },
  ],
  essentials: [
    '6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂, yeelen ni klorofili fɛ.',
    'A bɛ kɛ yɔrɔ binkɛnɛw ka kolorɔpilasitiw kɔnɔ ; CO₂ bɛ don sitomatiw fɛ.',
    'Taamasiyɛnw : amidɔn (iyodi ji bula-finman) ani oksizɛni bɔli.',
    'Sababuw : yeelen, CO₂, funteni ; fɛn min bɛ a dan, o bɛ teliya latigɛ.',
  ],
  simulationTasks: [
    'yeelen caya ka oksizɛni fununw jate ;',
    'yeelen barikama ni CO₂ dɔɔnin kɛ : fɛn jumɛn bɛ a dan ?',
    'funteni yɛlɛn ka tɛmɛ 40 °C kan : mun bɛ kɛ ?',
  ],
  exercises: [
    {
      title: 'Jateminɛ girinya la',
      statement: 'Mɔlɛri girinyaw : CO₂ = 44 g/mol, glukozi C₆H₁₂O₆ = 180 g/mol, O₂ = 32 g/mol.',
      parts: [
        { label: 'Glukozi hakɛ min bɛ dilan ni CO₂ g 264 (mol 6) ye, g la.', steps: ['$\\dfrac{264}{44} = 6$ mol CO₂ bɛ glukozi mol 1 di, o ye g 180 ye.'] },
        { label: 'Oksizɛni hakɛ min bɛ bɔ o waati kelen na, g la.', steps: ['O₂ mol 6 : $6 \\times 32 = 192$ g.'] },
      ],
    },
    {
      title: 'Elode lanpu kɔrɔ',
      statement: 'Elode dɔ bɛ funun 12 bɔ miniti kelen kɔnɔ lanpu cm 20 la, funun 30 cm 10 la, ani funun 30 tuguni cm 5 la.',
      parts: [
        { label: 'Funun joli miniti 5 kɔnɔ cm 10 la ?', steps: ['$30 \\times 5 = 150$ funun.'] },
        { label: 'cm 10 ni cm 5 cɛ, yeelen ye fɛn ye min bɛ a dan hali bi wa ? (« oui » walima « non »)', steps: ['Ni yeelen farala a kan, foyi tɛ yɛlɛma : fɛn wɛrɛ (CO₂, funteni) de bɛ fotosentɛzi dan.'] },
      ],
    },
  ],
  quiz: [
    {
      question: 'Gazi min bɛ don bulu kɔnɔ fotosentɛzi kama, o ye :',
      choices: ['karibɔni dioksidi', 'oksizɛni', 'azɔti', 'ji wulilen'],
      explanation: 'CO₂ bɛ don sitomatiw fɛ.',
    },
    {
      question: 'Iyodi ji bɛ nin kɛ bula-finman ye :',
      choices: ['amidɔn', 'glukozi', 'klorofili', 'porotiyiniw'],
      explanation: 'O ye amidɔn kɔrɔbɔli ye.',
    },
    {
      question: 'Fotosentɛzi bɛ kɛ :',
      choices: ['kolorɔpilasitiw kɔnɔ', 'mitɔkɔndiriw kɔnɔ', 'kɛsɛ kɔnɔ', 'liliw kɔnɔ'],
      explanation: 'Klorofili bɛ u kɔnɔ.',
    },
    {
      question: 'Su fɛ, jiri bɛ :',
      choices: ['ninakili kɛ nka a tɛ fotosentɛzi kɛ', 'fotosentɛzi kɛ nka a tɛ ninakili kɛ', 'foyi kɛ', 'u fila bɛɛ kɛ'],
      explanation: 'Ni yeelen tɛ, fotosentɛzi tɛ ; ninakili bɛ taa a fɛ.',
    },
  ],
  applications: [
    {
      title: 'Kungo kogo binkɛnɛ ka jiriw',
      tagline: 'Jiri kelen bɛ CO₂ joli minɛ ?',
      situation: 'Mali bɛ Kungo kogo binkɛnɛ la, jiri bolo min bɛ turu Sahel bɛɛ la. Jiri fitinin kelen bɛ CO₂ kilo 22 ɲɔgɔn minɛ san kelen kɔnɔ. Komini dɔ bɛ jiri 5 000 turu.',
      model: 'CO₂ min minɛna fotosentɛzi fɛ, o bɛ kɛ jiri yiri ye.',
      questions: ['O jiriw bɛ CO₂ tɔni joli minɛ san kelen kɔnɔ ?', 'Mun na jiriw bɛ dɛmɛ fana kungo lakolonni kɛlɛli la ?'],
      solution: [
        '$5\\,000 \\times 22 = 110\\,000$ kg, o ye CO₂ tɔni 110 ye san kɔnɔ.',
        'U liliw bɛ dugukolo mara ka a tanga erozyɔn ma, u sumaya bɛ nɛnɛ mara, u bulu salenw bɛ dugukolo nafa caya.',
      ],
      fact: 'Fiɲɛ kɔnɔ oksizɛni fanba bɛɛ bɔra jiriw ni algiw ka fotosentɛzi de la.',
    },
  ],
};
