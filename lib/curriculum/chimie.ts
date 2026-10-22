import type { SubjectProgram } from './types';

const PREBAC = 'Prébac Sciences Physiques TSE et TSExp, D. L. Diarra (conforme au programme APC)';
const ANTICIPE = 'Programme anticipé à partir des programmes de la sous-région, à valider';

export const CHIMIE: SubjectProgram[] = [
  {
    classId: '7e',
    subject: 'chimie',
    status: 'anticipe',
    source: ANTICIPE,
    chapters: [
      { id: 'melanges-corps-purs', title: 'Mélanges et corps purs', notions: ['Mélange homogène et hétérogène'] },
      { id: 'separation', title: 'Séparer les constituants d’un mélange', notions: ['Décantation', 'Filtration', 'Distillation'] },
      { id: 'eau', title: 'L’eau', notions: ['Eau potable', 'Traitement de l’eau', 'Tests de reconnaissance'] },
      { id: 'air', title: 'L’air qui nous entoure', notions: ['Composition de l’air', 'Pression'] },
    ],
  },
  {
    classId: '8e',
    subject: 'chimie',
    status: 'anticipe',
    source: ANTICIPE,
    chapters: [
      { id: 'combustions', title: 'Les combustions', notions: ['Combustion du carbone et du butane', 'Dangers du monoxyde de carbone'] },
      { id: 'metaux', title: 'Les métaux usuels et la corrosion', notions: ['Fer, cuivre, aluminium, zinc', 'La rouille'] },
      { id: 'atomes-molecules', title: 'Atomes et molécules', notions: ['Modèle moléculaire', 'Formules chimiques'] },
      { id: 'reactions', title: 'La réaction chimique', notions: ['Réactifs et produits', 'Conservation de la masse'] },
    ],
  },
  {
    classId: '9e',
    subject: 'chimie',
    status: 'anticipe',
    source: ANTICIPE,
    chapters: [
      { id: 'atome', title: 'Structure de l’atome', notions: ['Noyau et électrons', 'Neutralité électrique'], simulation: 'atome' },
      { id: 'ions', title: 'Les ions et les solutions ioniques', notions: ['Cations et anions', 'Tests d’identification'] },
      { id: 'acides-bases', title: 'Acides, bases et pH', notions: ['Échelle de pH', 'Papier pH', 'Neutralisation'] },
      { id: 'acides-metaux', title: 'Réaction des acides sur les métaux' },
      { id: 'hydrocarbures', title: 'Les hydrocarbures', notions: ['Pétrole et gaz', 'Combustion des alcanes'] },
    ],
  },
  {
    classId: '10e',
    subject: 'chimie',
    status: 'anticipe',
    source: ANTICIPE,
    chapters: [
      { id: 'atome', title: 'Constitution de l’atome', notions: ['Protons, neutrons, électrons', 'Isotopes', 'Répartition électronique K, L, M'], simulation: 'atome' },
      { id: 'classification', title: 'Classification périodique des éléments', notions: ['Périodes et familles', 'Règles du duet et de l’octet'], simulation: 'tableau-periodique' },
      { id: 'ions-liaison-ionique', title: 'Les ions et la liaison ionique' },
      { id: 'liaison-covalente', title: 'La liaison covalente et les molécules', notions: ['Schéma de Lewis', 'Géométrie des molécules'] },
      { id: 'mole', title: 'La mole et les quantités de matière', notions: ['Masse molaire', 'n = m / M'] },
      { id: 'gaz', title: 'Les gaz : volume molaire', notions: ['Loi d’Avogadro-Ampère'] },
      { id: 'solutions', title: 'Les solutions aqueuses', notions: ['Concentration molaire et massique', 'Dilution'] },
      { id: 'equation-bilan', title: 'L’équation-bilan d’une réaction', notions: ['Équilibrer une équation', 'Réactif limitant'] },
    ],
  },
  {
    classId: '11e',
    subject: 'chimie',
    status: 'anticipe',
    source: ANTICIPE,
    chapters: [
      { id: 'alcanes', title: 'Les alcanes', domain: 'Chimie organique', notions: ['Nomenclature', 'Isomérie', 'Combustion'] },
      { id: 'alcenes-alcynes', title: 'Les alcènes et les alcynes', domain: 'Chimie organique', notions: ['Réactions d’addition', 'Polymérisation'] },
      { id: 'benzene', title: 'Le benzène et les composés aromatiques', domain: 'Chimie organique' },
      { id: 'petrole', title: 'Le pétrole et le gaz naturel', domain: 'Chimie organique' },
      { id: 'oxydoreduction', title: 'Oxydoréduction : couples redox', domain: 'Oxydoréduction' },
      { id: 'classification-metaux', title: 'Classification électrochimique des métaux', domain: 'Oxydoréduction' },
      { id: 'piles', title: 'Les piles électrochimiques', domain: 'Oxydoréduction', notions: ['Pile Daniell', 'Batteries'] },
      { id: 'electrolyse', title: 'L’électrolyse', domain: 'Oxydoréduction' },
      { id: 'dosages-redox', title: 'Dosages d’oxydoréduction', domain: 'Oxydoréduction' },
    ],
  },
  {
    classId: '12e',
    subject: 'chimie',
    status: 'officiel',
    source: PREBAC,
    chapters: [
      { id: 'stereochimie', title: 'Stéréochimie', domain: 'Chimie organique', notions: ['Carbone asymétrique', 'Isomérie Z/E'] },
      { id: 'alcools', title: 'Les alcools', domain: 'Chimie organique', notions: ['Classes d’alcools', 'Oxydation ménagée'] },
      { id: 'amines', title: 'Les amines', domain: 'Chimie organique' },
      { id: 'acides-carboxyliques', title: 'Les acides carboxyliques et leurs dérivés', domain: 'Chimie organique', notions: ['Estérification', 'Saponification'] },
      { id: 'acides-amines', title: 'Les acides α-aminés', domain: 'Chimie organique', notions: ['Liaison peptidique'] },
      { id: 'glucose', title: 'Le glucose', domain: 'Chimie organique' },
      { id: 'polymeres', title: 'Les polymères synthétiques', domain: 'Chimie organique' },
      { id: 'vitesse-reactions', title: 'Vitesses des réactions chimiques', domain: 'Cinétique chimique', notions: ['Facteurs cinétiques', 'Temps de demi-réaction'] },
      { id: 'catalyse', title: 'Mécanisme réactionnel et catalyse', domain: 'Cinétique chimique' },
      { id: 'equilibre-qualitatif', title: 'Étude qualitative de l’équilibre', domain: 'Équilibres chimiques', notions: ['Principe de Le Chatelier'] },
      { id: 'equilibre-quantitatif', title: 'Étude quantitative de l’équilibre', domain: 'Équilibres chimiques', notions: ['Constante d’équilibre'] },
      { id: 'hcl-naoh', title: 'Solutions de chlorure d’hydrogène et d’hydroxyde de sodium', domain: 'Acides et bases en solution aqueuse', notions: ['pH', 'Acide fort, base forte'] },
      { id: 'couples-acide-base', title: 'Les couples acide/base', domain: 'Acides et bases en solution aqueuse', notions: ['pKa', 'Diagramme de prédominance'] },
      { id: 'reactions-acido-basiques', title: 'Les réactions acido-basiques', domain: 'Acides et bases en solution aqueuse', notions: ['Dosages', 'Indicateurs colorés', 'Solutions tampons'] },
    ],
  },
];
