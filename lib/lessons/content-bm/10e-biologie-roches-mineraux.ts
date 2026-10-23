import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook:
    'Jenne sow dilannen bɛ banko la, Bandiagara falaise dilannen bɛ gresi la, musow ka nɔrɔkabaw ye granit ye, ani Kayi ni Sikaso sanu dogolen bɛ kuwartizi kɔnɔ. Kaba kelen-kelen bɛɛ b’a fɔ a dilanna cogo min : magma dɔ sumana, a jigira ji duguma, walima a yɛlɛmana funteni ni digili fɛ.',
  objectives: [
    'ka kaba ni minɛral danfara dɔn ;',
    'ka kaba denbaya saba dɔn ;',
    'ka kaba ni a bɔyɔrɔ siri ɲɔgɔn na ;',
    'ka kaba dansite kɛ baara la.',
  ],
  sections: [
    {
      title: 'Kabaw ni minɛralw',
      blocks: [
        { term: 'Minɛral', text: 'fɛn gɛlɛn danma min dilancogo simi la latigɛlen don, a ye kirisitali ye tuma caman : kuwartizi, fɛlidisipati, mika, kalisiti.' },
        { term: 'Kaba', text: 'minɛral kelen walima caman faralen ɲɔgɔn kan. Granit bɛ kuwartizi, fɛlidisipati ani mika sɔrɔ.' },
      ],
    },
    {
      title: 'Kaba denbaya saba',
      blocks: [
        {
          head: ['Denbaya', 'A dilancogo', 'Misaliw Mali la'],
          rows: [
            ['magmatikiw', 'magma sumali : dɔɔnin-dɔɔnin dugu jukɔrɔ (kisɛma : granit), joona dugukolo kan (tasumakulu : bazalti)', 'Kati granit, Dogo jamana dolerititw'],
            ['sedimantɛriw', 'fɛn tigɛlenw walima fɛn wulilenw bɛ jigin ji duguma, o kɔ u bɛ digi ka kɛ kuluw ye', 'Bandiagara gresi, kalikɛriw, bɔgɔw, Tilemsi fɔsifatiw'],
            ['metamɔrifikiw', 'kaba dɔ yɛlɛmali a gɛlɛnnen na funteni ni digili fɛ', 'Kayi sisiti ni kuwartizitiw'],
          ],
        },
        { caption: 'Bandiagara falaise gresi kuluw : kaba sedimantɛri.' },
        { text: 'Kaba sedimantɛriw labɛnnen bɛ **kuluw** la, **fosiliw** bɛ u dɔw la ; kaba magmatiki kisɛmaw bɛ **kirisitaliw** jira minnu bɛ ye.' },
      ],
    },
    {
      title: 'Kabaw ka taama',
      blocks: [
        { text: 'Erozyɔn (sanji, fiɲɛ, harmatan) bɛ kabaw tiɲɛ ; bajiw bɛ u tigɛlenw ta ka u bila ; u bɛ kɛ kaba sedimantɛriw ye ; ni u dogora, u bɛ kɛ kaba metamɔrifikiw ye, o kɔ u bɛ se ka wuli ka magma di kokura.' },
        { legend: ['kaba dansite ; an bɛ V sumanikɛ ka a su ji kɔnɔ epruvɛti la'] },
      ],
    },
  ],
  essentials: [
    'Kaba ye minɛralw faralen ɲɔgɔn kan ye.',
    'Magmatikiw (granit, bazalti) : magma sumali.',
    'Sedimantɛriw (gresi, kalikɛri, bɔgɔ) : jiginniw kuluw la, fosiliw tuma dɔw.',
    'Metamɔrifikiw (sisiti, kuwartiziti) : yɛlɛmali a gɛlɛnnen na.',
  ],
  exercises: [
    {
      title: 'Kabakurun dɔ dansite',
      statement: 'Granit kurun dɔ girinya ye g 135 ye. Ni a donna epruvɛti la, ji bɛ yɛlɛn ka bɔ mL 200 la ka se mL 250 ma.',
      parts: [
        { label: 'Kabakurun bonya, cm³ la.', steps: ['$250 - 200 = 50$ mL = cm³ 50.'] },
        { label: 'Granit dansite.', steps: ['$\\rho = \\dfrac{135}{50} = 2{,}7$ g/cm³, o la $d = 2{,}7$.'] },
      ],
    },
    {
      title: 'Kaba dɔ dɔn',
      statement: 'Jaabi faransikan na : magmatique, sédimentaire walima métamorphique.',
      parts: [
        { label: 'Kaba min labɛnnen bɛ kuluw la, kɔnɔ fosiliw bɛ a la.', steps: ['Kuluw ni fosiliw : jiginni ji duguma.'] },
        { label: 'Kaba kuwartizi, fɛlidisipati ani mika kirisitali belebelew bɛ min na.', steps: ['Granit don : magma min sumana dɔɔnin-dɔɔnin dugu jukɔrɔ.'] },
      ],
    },
  ],
  quiz: [
    {
      question: 'Bandiagara gresi ye kaba ye min ye :',
      choices: ['sedimantɛri', 'magmatiki', 'metamɔrifiki', 'tasumakulu ta'],
      explanation: 'Cɛncɛn sirilen don, a jiginna kuluw la.',
    },
    {
      question: 'Magma min sumana dɔɔnin-dɔɔnin dugu jukɔrɔ, o bɛ nin di :',
      choices: ['kaba kisɛma i n’a fɔ granit', 'bazalti', 'kalikɛri', 'bɔgɔ'],
      explanation: 'Kirisitaliw bɛ waati sɔrɔ ka bonya.',
    },
    {
      question: 'Kuwartizi ye :',
      choices: ['minɛral', 'kaba', 'fosili', 'magma'],
      explanation: 'A bɛ kaba caman dilan.',
    },
    {
      question: 'Kaba metamɔrifiki bɛ dilan :',
      choices: ['kaba dɔ yɛlɛmali fɛ funteni ni digili kɔrɔ', 'jiginni fɛ dala duguma', 'lafa sumali fɛ', 'ji jalenni fɛ'],
      explanation: 'A bɛ to gɛlɛn a yɛlɛmali waati.',
    },
  ],
  applications: [
    {
      title: 'Jenne banko',
      tagline: 'Kaba dɔ ka so jɔ',
      situation: 'Jenne misiri belebele jɔlen bɛ banko la : baji bɔgɔ ni bin ɲagamilen, a dilannen biriki ye ka ja tile la. San o san, dugumɔgɔw bɛ wolo kura kɛ kogow kan. Biriki min bonya ye cm 40 × cm 20 × cm 10, a girinya ye kilo 12 ye.',
      model: 'Bɔgɔ ye kaba sedimantɛri finman ye kosɛbɛ, a bɛ nɔgɔya ni ji ye.',
      questions: ['Biriki dansite ye joli ye, g/cm³ la ?', 'Mun na kogow ka kan ka mugu san o san ?'],
      solution: [
        '$V = 40 \\times 20 \\times 10 = 8\\,000$ cm³ ; $\\rho = \\dfrac{12\\,000}{8\\,000} = 1{,}5$ g/cm³.',
        'Sanjiw bɛ bɔgɔ tiɲɛ, i n’a fɔ u bɛ falaise kabaw tiɲɛ cogo min na : mugu kura bɛ wolo min tara, o nɔ ta.',
      ],
      fact: 'Jenne misiri belebele sɛbɛnnen bɛ UNESCO ka diɲɛ ciyɛn na ; o ye dugukolo gansan so belebeleba ye diɲɛ kɔnɔ.',
    },
  ],
};
