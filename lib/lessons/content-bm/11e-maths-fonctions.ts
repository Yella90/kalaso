import type { LessonText } from '../index';

// Bamanankan — brouillon à faire relire.
export const lesson: LessonText = {
  hook: 'Bagan marala dɔ bɛ sɔgɔ mɛtɛrɛ 100 sɔrɔ walasa ka bagan kɔgɔ kare-jan lamini baji da la (baji bɛ kɛ dafɛ naaninan ye). A ka kan ka bonya jumɛnw sugandi walasa a ka bakaw ka yɔrɔ belebeleba sɔrɔ ? Walasa ka o jaabi, an bɛ bonya sɛbɛn ni **fonksiyɔn** ye, ani **deriwe** b’a fɔ a ka bon kosɛbɛ yɔrɔ min na.',
  objectives: ['ka limiti nɔgɔmanw jate ka asenpitɔtiw dɔn ;', 'ka jateden deriwe ɲɛfɔ i n’a fɔ cayali taux ka limiti ;', 'ka deriwew jate ni fɔrimili kɔrɔbaw ye ka tanzanti ekwasiyɔn sɛbɛn ;', 'ka fonksiyɔn ka yɛlɛmacogo kalan ka a ka ekisitɛrɛmɔmuw ɲini.'],
  sections: [
    {
      title: 'Limitiw',
      blocks: [
        { items: ['$+\\infty$ la, polinɔmu bɛ kɛ i n’a fɔ a ka tɛrimu min dɛrɛ ka bon kosɛbɛ ;', 'firakisiyɔn rasiyonɛli bɛ kɛ i n’a fɔ tɛrimu dɛrɛ belebelebaw tilali ;', 'ni $f(x) \\to \\pm\\infty$ ni $x \\to a$, juru $x = a$ ye **asenpitɔti jɔlen** ye ; ni $f(x) \\to b$ dan tɛ yɔrɔ min na, $y = b$ ye **asenpitɔti dalen** ye.'] },
        { text: 'Danw kalan.', steps: ['$\\pm\\infty$ la : $f(x) \\to \\dfrac{2}{1} = 2$, asenpitɔti dalen $y = 2$.', 'Ni $x \\to 3$ : dugumajate bɛ taa 0 fɛ, $f(x) \\to \\pm\\infty$ : asenpitɔti jɔlen $x = 3$.'] },
      ],
    },
    {
      title: 'Jateden deriwe ni tanzanti',
      blocks: [
        { tex: "f'(a) = \\lim_{h \\to 0}\\dfrac{f(a + h) - f(a)}{h} \\qquad \\text{tanzanti : } y = f'(a)(x - a) + f(a)", legend: ["$f'(a)$ ye kurubu ka tanzanti kowefisiyan ɲɛminɛbaga ye tomi min abisisi ye $a$"] },
        { rows: [['$k$ (kɔnsitanti)', '0']] },
      ],
    },
    {
      title: 'Yɛlɛmacogo ni ekisitɛrɛmɔmuw',
      blocks: [
        { text: "Ni $f'(x) > 0$ entɛriwali dɔ kan, $f$ bɛ yɛlɛn yen ; ni $f'(x) < 0$, a bɛ jigin. Ni $f'$ bɛ kɛ 0 ye ka a taamasiyɛn yɛlɛma $a$ la, $f$ bɛ ekisitɛrɛmɔmu sɔrɔ $a$ la." },
        { text: "$f'(x) = 2x - 4$, a bɛ kɛ 0 ye $x = 2$ la.", steps: ["$f' < 0$ 2 ɲɛ, $f' > 0$ a kɔ : hakɛ dɔgɔmanba 2 la.", '$f(2) = 4 - 8 + 3 = -1$.'] },
        { blocks: [{ text: "$f$ ka **pirimitivu** ye fonksiyɔn $F$ ye min bɛ $F' = f$ bɛn. Misali la, $\\dfrac{x^3}{3}$ ye $x^2$ ka pirimitivu ye. An bɛna u kalan ka ɲɛ Tɛriminali la." }] },
        { wrong: "« $f'(a) = 0$, o la $f$ bɛ ekisitɛrɛmɔmu sɔrɔ $a$ la. »", why: "$f(x) = x^3$ kama, $f'(0) = 0$ nka $f$ bɛ yɛlɛn yɔrɔ bɛɛ : deriwe tɛ a taamasiyɛn yɛlɛma.", reflex: "$f'$ taamasiyɛn yɛlɛmali lajɛ." },
      ],
    },
  ],
  essentials: ['Asenpitɔtiw : jɔlen ni $f \\to \\pm\\infty$ $a$ la ; dalen ni $f \\to b$ dan tɛ yɔrɔ min na.', "$f'(a)$ = cayali taux limiti = tanzanti ka jiginni ; tanzanti $y = f'(a)(x - a) + f(a)$.", 'Deriwe kɔrɔbaw : $x^n \\to nx^{n-1}$, $uv$, $\\frac{u}{v}$.', "$f'$ taamasiyɛn ⇒ yɛlɛmacogo ; taamasiyɛn yɛlɛmali ⇒ ekisitɛrɛmɔmu."],
  simulationTasks: ['$f(x) = x^2 - 4x + 3$ ja ka a hakɛ dɔgɔmanba ɲini ;', 'tanzanti tomi lamaga : tanzanti bɛ da yɔrɔ jumɛn na ?'],
  exercises: [
    { title: 'Deriwew ni tanzanti', statement: 'An bɛ $f(x) = x^2$ ni $g(x) = x^2 - 4x + 3$ jateminɛ.', parts: [{ label: '$f$ kurubu ka tanzanti kowefisiyan ɲɛminɛbaga $x = 1$ la.' }, { label: 'O tanzanti ka ordone orizini la.' }, { label: '$g$ hakɛ dɔgɔmanba.', steps: ["$g'(x) = 2x - 4$ bɛ kɛ 0 ye 2 la ; $g(2) = -1$."] }] },
    { title: 'Asenpitɔtiw', parts: [{ label: 'Asenpitɔti dalen ekwasiyɔn : $y = \\dots$', steps: ['Limiti dan tɛ yɔrɔ min na : $\\dfrac{2}{1} = 2$.'] }, { label: 'Asenpitɔti jɔlen ekwasiyɔn : $x = \\dots$', steps: ['Dugumajate bɛ kɛ 0 ye 3 la (sanfɛjate ye 7 ye).'] }, { label: "$h'(4)$ jate." }] },
  ],
  quiz: [
    { question: '$x^3$ ka deriwe ye :', explanation: '$nx^{n-1}$ ni $n = 3$.' },
    { question: "Ja la, $f'(a)$ bɛ nin jira :", choices: ['tanzanti ka jiginni $a$ la', '$f$ hakɛ $a$ la', 'kurubu kɔrɔ bonya', 'asenpitɔti'], explanation: 'O ye tanzanti kowefisiyan ɲɛminɛbaga ye.' },
    { question: "Ni $f'(x) < 0$ $[1, 5]$ kan, o entɛriwali kan $f$ bɛ :", choices: ['jigin', 'yɛlɛn', 'kɛ negatifu ye', 'to kelen ye'], explanation: "$f'$ taamasiyɛn bɛ yɛlɛmacogo di." },
    { question: '$\\dfrac{1}{x}$ ka deriwe ye :', explanation: 'Fɔrimili min ka kan ka dɔn.' },
  ],
  applications: [
    {
      title: 'Bakaw kɔgɔ',
      tagline: 'Bonya belebeleba ni sɔgɔ mɛtɛrɛ 100 ye',
      situation: 'Bagan marala dɔ bɛ bagan kɔgɔ kare-jan lamini baji da la ni sɔgɔ mɛtɛrɛ 100 ye : baji bɛ kɛ dafɛ kelen ye, sɔgɔ bɛ tɔ saba kɛ. An bɛ bonya (dafɛ minnu jɔlen bɛ baji kan) sɛbɛn $x$.',
      model: 'Bonya $A(x) = x(100 - 2x)$ ni $0 < x < 50$.',
      questions: ['Bonya ka bon kosɛbɛ dafɛ janya jumɛn na ?', 'O bonya belebeleba ye joli ye, m² la ?'],
      solution: ["$A(x) = 100x - 2x^2$ ; $A'(x) = 100 - 4x$ bɛ kɛ 0 ye $x = 25$ m la (pozitifu a ɲɛ, negatifu a kɔ).", '$A(25) = 25 \\times 50 = 1\\,250$ m², ni dafɛ mɛtɛrɛ 50 ye baji da la.'],
    },
  ],
};
