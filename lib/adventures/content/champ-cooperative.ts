import type { Adventure } from '../types';

export const adventure: Adventure = {
  id: 'champ-cooperative',
  title: 'Le champ de la coopérative',
  subject: 'maths',
  classes: ['9e', '10e'],
  pitch: 'La coopérative des jeunes de Koutiala lance sa première saison. Il faut tout calculer, du terrain à la vente.',
  intro:
    'Fatoumata préside la coopérative des jeunes agriculteurs de Koutiala. Le chef de village leur prête un champ pour la saison. Elle sait cultiver, mais elle te demande de faire les calculs : mesurer le terrain, acheter les semences, louer le tracteur, clôturer le jardin et faire le bilan de la récolte.',
  missions: [
    {
      id: 'diagonale',
      title: 'Mesurer le champ',
      story: 'Le champ est un rectangle. Pour poser le cordeau qui guidera les semis, Fatoumata veut connaître la longueur de la diagonale.',
      data: ['Longueur : 120 m', 'Largeur : 50 m'],
      notions: [{ classId: '9e', subject: 'maths', chapterId: 'pythagore' }],
      challenge: { kind: 'numeric', question: 'Quelle est la longueur de la diagonale du champ ?', answer: 130, unit: 'm', tolerance: 0.01 },
      hints: ['La diagonale est l’hypoténuse d’un triangle rectangle.'],
      solution: ['$d^2 = 120^2 + 50^2 = 14\\,400 + 2\\,500 = 16\\,900$, donc $d = \\sqrt{16\\,900} = 130$ m.'],
      debrief: 'Astuce de terrain : un triangle de côtés 5, 12 et 13 (comme 50, 120, 130) donne toujours un angle droit. C’est ainsi qu’on trace des coins bien carrés.',
    },
    {
      id: 'semences',
      title: 'Acheter les semences',
      story: 'Le technicien de la CMDT conseille 25 kg de semences de coton par hectare.',
      data: ['Champ de 120 m sur 50 m', '1 hectare = 10 000 m²', 'Dose : 25 kg par hectare'],
      notions: [{ classId: '7e', subject: 'maths', chapterId: 'proportionnalite' }],
      challenge: { kind: 'numeric', question: 'Quelle masse de semences faut-il acheter ?', answer: 15, unit: 'kg', tolerance: 0.02 },
      hints: ['Calcule l’aire du champ en m², puis convertis-la en hectares.'],
      solution: ['Aire : $120 \\times 50 = 6\\,000$ m², soit 0,6 ha.', 'Semences : $0{,}6 \\times 25 = 15$ kg.'],
      debrief: 'Fatoumata achète 15 kg de semences, sans gaspillage.',
    },
    {
      id: 'tracteur',
      title: 'Louer le tracteur',
      story:
        'Deux propriétaires proposent un tracteur pour le labour. Le premier demande un forfait de déplacement, puis un prix par heure. Le second ne prend pas de forfait, mais l’heure est plus chère.',
      data: ['Offre A : 15 000 FCFA de forfait + 5 000 FCFA par heure', 'Offre B : 8 000 FCFA par heure'],
      notions: [
        { classId: '9e', subject: 'maths', chapterId: 'applications-affines' },
        { classId: '9e', subject: 'maths', chapterId: 'equations-inequations' },
      ],
      challenge: { kind: 'numeric', question: 'Pour combien d’heures de labour les deux offres coûtent-elles le même prix ?', answer: 5, unit: 'h', tolerance: 0.01 },
      hints: ['Écris le prix de chaque offre en fonction du nombre d’heures $x$ : $A(x)$ et $B(x)$.', 'Résous $A(x) = B(x)$.'],
      solution: [
        '$A(x) = 15\\,000 + 5\\,000x$ et $B(x) = 8\\,000x$.',
        '$15\\,000 + 5\\,000x = 8\\,000x \\iff 3\\,000x = 15\\,000 \\iff x = 5$ heures.',
        'Au-delà de 5 heures, l’offre A est moins chère. Le labour prendra 7 heures : la coopérative choisit l’offre A.',
      ],
      debrief: 'Pour 7 heures, l’offre A coûte 50 000 FCFA et l’offre B 56 000 FCFA : 6 000 FCFA d’économie.',
    },
    {
      id: 'cloture',
      title: 'Clôturer le jardin',
      story:
        'Au bord du marigot, la coopérative veut un jardin de légumes rectangulaire, protégé des chèvres. Le côté le long du marigot n’a pas besoin de grillage. Il reste 200 m de grillage.',
      data: ['Grillage disponible : 200 m', 'Le jardin a 2 côtés de largeur $x$ et 1 côté de longueur $200 - 2x$'],
      notions: [
        { classId: '10e', subject: 'maths', chapterId: 'polynomes' },
        { classId: '10e', subject: 'maths', chapterId: 'fonctions' },
      ],
      challenge: { kind: 'numeric', question: 'Quelle est la plus grande aire possible du jardin ?', answer: 5000, unit: 'm²', tolerance: 0.01 },
      hints: [
        'L’aire vaut $A(x) = x(200 - 2x)$.',
        'Écris $A(x)$ sous forme canonique : $A(x) = -2(x - 50)^2 + \\ldots$',
      ],
      solution: [
        '$A(x) = 200x - 2x^2 = -2(x^2 - 100x) = -2(x - 50)^2 + 5\\,000$.',
        'Un carré est toujours positif ou nul : $A(x) \\le 5\\,000$, avec égalité pour $x = 50$ m.',
        'Le jardin mesure 50 m sur 100 m, pour une aire de 5 000 m².',
      ],
      debrief: 'Avec le même grillage, un jardin carré de 66 m de côté n’aurait fait qu’environ 4 440 m². La forme canonique a fait gagner plus de 500 m².',
    },
    {
      id: 'vente',
      title: 'La vente',
      story:
        'À la fin de la saison, la coopérative a vendu 3 tonnes de récolte, en coton et en sésame, pour 1 050 000 FCFA. Fatoumata a perdu le détail mais se souvient des prix.',
      data: ['Coton : 300 FCFA le kg', 'Sésame : 450 FCFA le kg', 'Total : 3 000 kg pour 1 050 000 FCFA'],
      notions: [{ classId: '9e', subject: 'maths', chapterId: 'systemes' }],
      challenge: { kind: 'numeric', question: 'Combien de kilogrammes de sésame ont été vendus ?', answer: 1000, unit: 'kg', tolerance: 0.01 },
      hints: ['Appelle $x$ la masse de coton et $y$ celle de sésame ; écris deux équations.'],
      solution: [
        '$x + y = 3\\,000$ et $300x + 450y = 1\\,050\\,000$.',
        'Avec $x = 3\\,000 - y$ : $900\\,000 - 300y + 450y = 1\\,050\\,000$, donc $150y = 150\\,000$ et $y = 1\\,000$ kg.',
        'La coopérative a vendu 1 000 kg de sésame et 2 000 kg de coton.',
      ],
      debrief: 'Le sésame rapporte plus par kilo : la coopérative pense à lui donner plus de place l’an prochain.',
    },
    {
      id: 'bilan',
      title: 'Le bilan des parcelles',
      story: 'Pour l’assemblée générale, Fatoumata présente le rendement des 5 parcelles de la coopérative.',
      data: ['Récoltes des parcelles (en kg) : 1 200 ; 950 ; 1 100 ; 1 300 ; 1 450'],
      notions: [
        { classId: '9e', subject: 'maths', chapterId: 'statistiques' },
        { classId: '10e', subject: 'maths', chapterId: 'statistique' },
      ],
      challenge: { kind: 'numeric', question: 'Quelle est la récolte moyenne par parcelle ?', answer: 1200, unit: 'kg', tolerance: 0.01 },
      hints: ['Moyenne = somme des valeurs ÷ nombre de valeurs.'],
      solution: [
        'Somme : $1\\,200 + 950 + 1\\,100 + 1\\,300 + 1\\,450 = 6\\,000$ kg.',
        'Moyenne : $\\dfrac{6\\,000}{5} = 1\\,200$ kg. La médiane vaut aussi 1 200 kg.',
      ],
      debrief: 'La parcelle à 950 kg est loin de la moyenne : l’an prochain, on vérifiera son sol et son arrosage.',
    },
  ],
  outro:
    'Première saison réussie pour la coopérative. Pythagore pour tracer le champ, la proportionnalité pour les semences, les fonctions affines pour le tracteur, la forme canonique pour le jardin, un système pour retrouver les ventes et les statistiques pour le bilan : les maths ont servi à chaque étape.',
};
