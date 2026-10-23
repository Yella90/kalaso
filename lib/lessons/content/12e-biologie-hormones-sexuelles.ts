import type { Lesson } from '../types';

export const lesson: Lesson = {
  hook:
    'Pourquoi les règles reviennent-elles environ tous les 28 jours ? Comment une pilule peut-elle empêcher une grossesse, et comment un test de grossesse détecte-t-il un embryon de quelques jours ? Toutes les réponses tiennent dans un dialogue chimique entre le cerveau et les glandes sexuelles : les **hormones** et leurs **rétrocontrôles**.',
  objectives: [
    'décrire la régulation de la sécrétion de testostérone chez l’homme ;',
    'décrire les cycles ovarien et utérin et leurs hormones ;',
    'expliquer les rétrocontrôles négatif et positif ;',
    'expliquer le principe de la pilule et du test de grossesse.',
  ],
  sections: [
    {
      title: 'Chez l’homme : une sécrétion continue',
      blocks: [
        {
          kind: 'list',
          items: [
            'l’**hypothalamus** sécrète la GnRH, qui stimule l’**hypophyse** ;',
            'l’hypophyse sécrète la **LH**, qui stimule la production de **testostérone** par les cellules de Leydig des testicules, et la **FSH**, qui stimule la spermatogenèse ;',
            'la testostérone freine en retour l’hypothalamus et l’hypophyse : c’est un **rétrocontrôle négatif**, qui maintient un taux à peu près constant.',
          ],
        },
      ],
    },
    {
      title: 'Chez la femme : un fonctionnement cyclique',
      blocks: [
        { kind: 'figure', id: 'cycle-ovarien', caption: "Hormones et muqueuse utérine au cours d’un cycle de 28 jours." },
        {
          kind: 'table',
          head: ['Phase (cycle de 28 jours)', 'Ovaire', 'Hormones', 'Utérus'],
          rows: [
            ['J1 à J5', 'début de croissance des follicules', 'œstrogènes faibles', 'menstruations (règles)'],
            ['J5 à J14 (phase folliculaire)', 'un follicule mûrit', 'œstrogènes en hausse', 'la muqueuse s’épaissit'],
            ['J14', '**ovulation**', '**pic de LH**', ''],
            ['J14 à J28 (phase lutéale)', 'le follicule devient le **corps jaune**', 'progestérone et œstrogènes', 'muqueuse prête à accueillir un embryon (dentelle utérine)'],
          ],
        },
        {
          kind: 'rule',
          text: 'Les œstrogènes exercent en général un **rétrocontrôle négatif** sur l’hypothalamus et l’hypophyse. Mais en fin de phase folliculaire, leur taux très élevé exerce un **rétrocontrôle positif** : il déclenche le pic de LH, qui provoque l’ovulation.',
        },
        {
          kind: 'text',
          text: 'Sans fécondation, le corps jaune régresse vers J28 : la progestérone et les œstrogènes chutent, la muqueuse se détruit : ce sont les règles, et un nouveau cycle commence. La phase lutéale dure toujours environ 14 jours : dans un cycle de 32 jours, l’ovulation a lieu vers J18.',
        },
      ],
    },
    {
      title: 'Grossesse et contraception',
      blocks: [
        {
          kind: 'text',
          text: 'Après la nidation, l’embryon sécrète l’hormone **hCG**, qui maintient le corps jaune en activité : la progestérone reste élevée, il n’y a pas de règles. Les tests de grossesse détectent l’hCG dans l’urine.',
        },
        {
          kind: 'text',
          text: 'La **pilule** contraceptive apporte chaque jour des hormones de synthèse proches des œstrogènes et de la progestérone. Par rétrocontrôle négatif, elles bloquent la sécrétion de GnRH, LH et FSH : il n’y a pas de pic de LH, donc pas d’ovulation.',
        },
        {
          kind: 'callout',
          variant: 'attention',
          blocks: [
            {
              kind: 'text',
              text: 'La pilule ne protège pas des infections sexuellement transmissibles. Seul le préservatif protège à la fois d’une grossesse et des IST, dont le VIH.',
            },
          ],
        },
      ],
    },
  ],
  essentials: [
    'Hypothalamus (GnRH) → hypophyse (LH, FSH) → gonades (testostérone, œstrogènes, progestérone).',
    'Homme : rétrocontrôle négatif de la testostérone, taux constant.',
    'Femme : phase folliculaire (œstrogènes), pic de LH par rétrocontrôle positif → ovulation, phase lutéale (corps jaune, progestérone) de 14 jours.',
    'hCG maintient le corps jaune (test de grossesse) ; pilule : rétrocontrôle négatif, pas d’ovulation.',
  ],
  exercises: [
    {
      id: 'horm-cycle',
      level: 1,
      title: 'La date de l’ovulation',
      statement: 'La phase lutéale dure environ 14 jours quelle que soit la longueur du cycle.',
      parts: [
        {
          label: 'Dans un cycle de 32 jours, quel jour a lieu l’ovulation ?',
          answer: { kind: 'number', value: 18, tolerance: 0, unit: '' },
          steps: ['$32 - 14 = 18$ : vers le 18ᵉ jour.'],
        },
        {
          label: 'Et dans un cycle de 26 jours ?',
          answer: { kind: 'number', value: 12, tolerance: 0, unit: '' },
          steps: ['$26 - 14 = 12$.'],
        },
      ],
    },
    {
      id: 'horm-mots',
      level: 2,
      title: 'Les hormones',
      statement: 'Réponds par le nom ou le sigle de l’hormone.',
      parts: [
        {
          label: 'Hormone dont le pic déclenche l’ovulation.',
          answer: { kind: 'text', display: 'LH', accepted: ['lh', 'la lh', 'hormone lutéinisante', 'hormone luteinisante'] },
          steps: ['Le pic de LH est provoqué par le rétrocontrôle positif des œstrogènes.'],
        },
        {
          label: 'Hormone sécrétée par le corps jaune et qui prépare l’utérus à la nidation.',
          answer: { kind: 'text', display: 'progestérone', accepted: ['progestérone', 'progesterone', 'la progestérone', 'la progesterone'] },
          steps: ['Elle transforme la muqueuse en dentelle utérine.'],
        },
        {
          label: 'Hormone de l’embryon détectée par les tests de grossesse.',
          answer: { kind: 'text', display: 'hCG', accepted: ['hcg', "l'hcg", 'l’hcg', 'gonadotrophine chorionique'] },
          steps: ['L’hCG maintient le corps jaune pendant le début de la grossesse.'],
        },
      ],
    },
  ],
  quiz: [
    {
      question: 'Le corps jaune se forme :',
      choices: ['à partir du follicule après l’ovulation', 'dans l’utérus', 'dans l’hypophyse', 'au début des règles'],
      answer: 0,
      explanation: 'Il sécrète surtout de la progestérone.',
    },
    {
      question: 'Chez l’homme, la testostérone exerce sur l’hypophyse un rétrocontrôle :',
      choices: ['négatif', 'positif', 'nul', 'cyclique'],
      answer: 0,
      explanation: 'Elle freine la sécrétion de LH, ce qui stabilise son propre taux.',
    },
    {
      question: 'Les règles sont dues à :',
      choices: ['la chute de la progestérone et des œstrogènes', 'un pic de LH', 'la sécrétion d’hCG', 'la testostérone'],
      answer: 0,
      explanation: 'Le corps jaune régresse, la muqueuse n’est plus entretenue.',
    },
    {
      question: 'La pilule empêche l’ovulation car :',
      choices: ['elle bloque le pic de LH par rétrocontrôle négatif', 'elle tue les spermatozoïdes', 'elle détruit l’ovaire', 'elle augmente la FSH'],
      answer: 0,
      explanation: 'Sans pic de LH, pas d’ovulation.',
    },
  ],
  applications: [
    {
      title: 'Le test de grossesse',
      tagline: 'Pourquoi attendre le retard des règles ?',
      situation:
        'Salimata fait un test de grossesse urinaire. La notice conseille de le faire à partir du jour prévu des règles.',
      model: 'Le test détecte l’hCG, produite par l’embryon après la nidation.',
      questions: ['Pourquoi un test fait deux jours après un rapport sexuel serait-il toujours négatif ?', 'Pourquoi les règles ne viennent-elles pas en cas de grossesse ?'],
      solution: [
        'La nidation a lieu environ 7 jours après la fécondation, et l’hCG doit ensuite s’accumuler : avant, il n’y en a pas dans l’urine.',
        'L’hCG maintient le corps jaune, qui continue à sécréter de la progestérone : la muqueuse utérine n’est pas éliminée.',
      ],
    },
  ],
};
