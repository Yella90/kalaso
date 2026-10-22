import type { Adventure } from '../types';

export const adventure: Adventure = {
  id: 'enquete-paludisme',
  title: 'Enquête sur le paludisme à Mopti',
  subject: 'biologie',
  classes: ['9e', '12e'],
  pitch: 'Chaque saison des pluies, le paludisme frappe les villages du delta. Mène l’enquête avec l’équipe de santé.',
  intro:
    'Le docteur Coulibaly dirige le centre de santé d’un village du delta intérieur du Niger, près de Mopti. À chaque hivernage, les cas de paludisme se multiplient. Il prépare une campagne de prévention et te prend dans son équipe : comprendre la maladie, compter les cas, expliquer la défense du corps et proposer des solutions.',
  missions: [
    {
      id: 'transmission',
      title: 'Qui transmet la maladie ?',
      story: 'Le paludisme est causé par un parasite, le Plasmodium. Il passe d’une personne malade à une personne saine par une piqûre.',
      notions: [{ classId: '9e', subject: 'biologie', chapterId: 'maladies' }],
      challenge: {
        kind: 'choice',
        question: 'Qui transmet le Plasmodium d’une personne à une autre ?',
        choices: ['la mouche domestique', 'le moustique anophèle femelle', 'le moustique anophèle mâle', 'l’eau sale bue au puits'],
        answer: 1,
      },
      hints: ['Seuls les moustiques qui se nourrissent de sang peuvent transmettre le parasite.'],
      solution: [
        'C’est l’anophèle **femelle** : elle pique pour prendre le sang dont ses œufs ont besoin. Le mâle se nourrit de jus de plantes et ne pique pas.',
      ],
      debrief: 'Les anophèles pondent dans les eaux stagnantes : les flaques et les rizières de l’hivernage sont leurs maternités.',
    },
    {
      id: 'compter',
      title: 'Compter les cas',
      story: 'Pendant la dernière saison des pluies, le centre a enregistré 360 cas de paludisme dans le village.',
      data: ['Habitants du village : 2 400', 'Cas enregistrés : 360'],
      notions: [{ classId: '9e', subject: 'maths', chapterId: 'statistiques' }],
      challenge: { kind: 'numeric', question: 'Quel pourcentage des habitants a eu le paludisme ?', answer: 15, unit: '%', tolerance: 0.01 },
      hints: ['Pourcentage = (cas ÷ habitants) × 100.'],
      solution: ['$\\dfrac{360}{2\\,400} \\times 100 = 15$ % : plus d’un habitant sur sept.'],
      debrief: 'Le docteur Coulibaly note que la moitié des cas touchent des enfants de moins de 5 ans.',
    },
    {
      id: 'multiplication',
      title: 'Le parasite dans le sang',
      story:
        'Dans le sang, le Plasmodium entre dans un globule rouge et s’y multiplie. Au bout de 48 heures, le globule éclate et libère 16 nouveaux parasites, qui entrent chacun dans un nouveau globule rouge. C’est à ce moment que le malade a une forte fièvre.',
      data: ['Un cycle dure 48 h', 'Chaque globule infecté libère 16 parasites', 'Au départ : 1 globule infecté'],
      notions: [
        { classId: '10e', subject: 'biologie', chapterId: 'cellule' },
        { classId: '9e', subject: 'biologie', chapterId: 'maladies' },
      ],
      challenge: { kind: 'numeric', question: 'Combien de globules rouges sont infectés au bout de 3 cycles (6 jours) ?', answer: 4096, unit: '', tolerance: 0.001 },
      hints: ['À chaque cycle, le nombre de globules infectés est multiplié par 16.'],
      solution: ['$16 \\times 16 \\times 16 = 16^3 = 4\\,096$ globules infectés.', 'C’est une croissance géométrique : voilà pourquoi il faut traiter vite.'],
      debrief: 'La fièvre qui revient tous les deux jours correspond à l’éclatement des globules rouges à chaque cycle.',
    },
    {
      id: 'anticorps',
      title: 'La défense du corps',
      story:
        'Les adultes du village qui ont eu souvent le paludisme font des crises moins graves. Leur système immunitaire a appris à reconnaître le parasite et fabrique des anticorps contre lui.',
      notions: [
        { classId: '9e', subject: 'biologie', chapterId: 'immunite' },
        { classId: '12e', subject: 'biologie', chapterId: 'reponse-immunitaire' },
      ],
      challenge: {
        kind: 'choice',
        question: 'Quelles cellules produisent les anticorps ?',
        choices: ['les globules rouges', 'les plaquettes', 'les plasmocytes, issus des lymphocytes B', 'les lymphocytes T cytotoxiques'],
        answer: 2,
      },
      hints: ['Les anticorps sont des molécules libérées dans le sang par des cellules issues de lymphocytes.'],
      solution: [
        'Les lymphocytes B qui reconnaissent le parasite se multiplient et se transforment en **plasmocytes**, qui sécrètent les anticorps.',
        'Les lymphocytes T cytotoxiques, eux, détruisent directement les cellules infectées.',
      ],
      debrief: 'Cette immunité se construit lentement : c’est pourquoi les jeunes enfants, qui ne l’ont pas encore, sont les plus menacés.',
    },
    {
      id: 'drepanocytose',
      title: 'Une protection héritée',
      story:
        'Une famille du village est porteuse du gène de la drépanocytose. Les personnes « AS » (un gène normal A et un gène S) sont en bonne santé et font moins de paludisme grave. Les personnes « SS » ont la drépanocytose. Les deux parents sont AS.',
      notions: [
        { classId: '12e', subject: 'biologie', chapterId: 'brassage-genetique' },
        { classId: '12e', subject: 'biologie', chapterId: 'genetique-humaine' },
      ],
      challenge: { kind: 'numeric', question: 'Quelle est la probabilité qu’un de leurs enfants soit AS ?', answer: 50, unit: '%', tolerance: 0.01 },
      hints: ['Chaque parent transmet A ou S avec la même probabilité. Fais un échiquier de croisement.'],
      solution: [
        'Gamètes de chaque parent : A (1/2) et S (1/2).',
        'Enfants possibles : AA (1/4), AS (1/4 + 1/4 = 1/2), SS (1/4).',
        'Probabilité d’être AS : 1/2, soit 50 %. Le risque d’être SS est de 25 %.',
      ],
      debrief: 'Le docteur propose aux couples un test d’électrophorèse de l’hémoglobine pour connaître leur statut avant le mariage.',
    },
    {
      id: 'vaccin',
      title: 'La campagne de vaccination',
      story:
        'Un vaccin contre le paludisme est maintenant donné aux jeunes enfants. Dans les premiers essais menés en Afrique, il a réduit d’environ 30 % le nombre de cas. Le docteur veut prévoir la saison prochaine.',
      data: ['Cas de la dernière saison : 360', 'Réduction attendue : 30 %'],
      notions: [
        { classId: '12e', subject: 'biologie', chapterId: 'aides-immunitaires' },
        { classId: '9e', subject: 'biologie', chapterId: 'immunite' },
      ],
      challenge: { kind: 'numeric', question: 'Combien de cas peut-on attendre si la réduction est de 30 % ?', answer: 252, unit: 'cas', tolerance: 0.01 },
      hints: ['Réduire de 30 %, c’est garder 70 % des cas.'],
      solution: ['$360 \\times (1 - 0{,}30) = 360 \\times 0{,}70 = 252$ cas.'],
      debrief: 'Associé aux moustiquaires imprégnées et au traitement rapide des malades, le vaccin peut faire baisser les cas bien davantage.',
    },
  ],
  outro:
    'La campagne commence : moustiquaires, vaccination des enfants, flaques asséchées autour des maisons, tests de la drépanocytose. Tu as utilisé la transmission des maladies, la cellule, l’immunité, la génétique… et un peu de mathématiques. La biologie sert à sauver des vies.',
};
