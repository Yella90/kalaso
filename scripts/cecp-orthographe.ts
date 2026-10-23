// Accents manquants dans les textes de cecp. Les premiers chapitres (cinématique, projectile,
// satellite, particule chargée) ont été tapés sans accents ; quelques mots aussi ailleurs.
// Les formules ($…$) ne sont jamais modifiées.

/** Mots qui n'existent pas sans accent : on les corrige partout. */
const WORDS: Record<string, string> = {
  acceleration: 'accélération', accelere: 'accélère', acceleres: 'accélérés', accelerer: 'accélérer',
  algebrique: 'algébrique', appliquees: 'appliquées', apres: 'après', arret: 'arrêt', arrete: 'arrête',
  arretee: 'arrêtée', arrivee: 'arrivée', athlete: 'athlète', cambre: 'cambré', cartesien: 'cartésien',
  centripete: 'centripète', cesium: 'césium', chaines: 'chaînes', chargee: 'chargée', cinematique: 'cinématique',
  cinetique: 'cinétique', controle: 'contrôle', coordonnees: 'coordonnées', corrigees: 'corrigées', debit: 'débit',
  deceleration: 'décélération', decollent: 'décollent', decrit: 'décrit', deduit: 'déduit', deflection: 'déflexion',
  degage: 'dégage', degagement: 'dégagement', degre: 'degré', degres: 'degrés', demarrage: 'démarrage',
  demarre: 'démarre', denominateur: 'dénominateur', depart: 'départ', depasse: 'dépasse', depend: 'dépend',
  dephasage: 'déphasage', deplace: 'déplace', derivee: 'dérivée', derriere: 'derrière', difference: 'différence',
  dilue: 'dilué', directivite: 'directivité', dirigee: 'dirigée', divisee: 'divisée', duree: 'durée', ecart: 'écart',
  ecrire: 'écrire', ecrit: 'écrit', egale: 'égale', electrique: 'électrique', electriques: 'électriques',
  electromagnetiques: 'électromagnétiques', electron: 'électron', elastique: 'élastique', element: 'élément',
  elements: 'éléments', elevant: 'élevant', eleve: 'élevé', eliminant: 'éliminant', elimine: 'élimine',
  emission: 'émission', enantiomere: 'énantiomère', enantiomeres: 'énantiomères', energie: 'énergie',
  equateur: 'équateur', equation: 'équation', equations: 'équations', equatorial: 'équatorial',
  esterification: 'estérification', ethanamide: 'éthanamide', ethanoate: 'éthanoate', ethyl: 'éthyl',
  ethyle: 'éthyle', ethylene: 'éthylène', ethylethanamide: 'éthyléthanamide', etoile: 'étoile', etre: 'être',
  etudie: 'étudie', evolue: 'évolue', exces: 'excès', exercee: 'exercée', experiences: 'expériences',
  exterieur: 'extérieur', facon: 'façon', fixee: 'fixée', fleche: 'flèche', forcees: 'forcées',
  geocentrique: 'géocentrique', geostationnaire: 'géostationnaire', geostationnaires: 'géostationnaires',
  helicoptere: 'hélicoptère', helium: 'hélium', hemisphere: 'hémisphère', impedance: 'impédance',
  inclinee: 'inclinée', independante: 'indépendante', injecte: 'injecté', integrant: 'intégrant',
  interferences: 'interférences', ionise: 'ionisé', lache: 'lâche', largue: 'largué', legerement: 'légèrement',
  liberation: 'libération', liee: 'liée', limitee: 'limitée', lineaire: 'linéaire', lumiere: 'lumière',
  magnesium: 'magnésium', magnetique: 'magnétique', manege: 'manège', maraicher: 'maraîcher',
  materiel: 'matériel', mecaniques: 'mécaniques', medicaments: 'médicaments', melange: 'mélange', meme: 'même',
  metal: 'métal', metaux: 'métaux', methode: 'méthode', modele: 'modèle', molecules: 'molécules',
  mouillee: 'mouillée', neglige: 'néglige', negligeant: 'négligeant', nucleaires: 'nucléaires',
  numerateur: 'numérateur', occupees: 'occupées', oeil: 'œil', opposee: 'opposée', orientee: 'orientée', orientees: 'orientées',
  parait: 'paraît', parallele: 'parallèle', parametriques: 'paramétriques', periode: 'période',
  periodique: 'périodique', photoelectrique: 'photoélectrique', portee: 'portée', prebac: 'Prébac', pres: 'près',
  prevoir: 'prévoir', propanoique: 'propanoïque', pseudoperiodique: 'pseudopériodique', radioactivite: 'radioactivité',
  reaction: 'réaction', reactions: 'réactions', realite: 'réalité', reduire: 'réduire', reduit: 'réduit',
  regime: 'régime', region: 'région', relativite: 'relativité', reponds: 'réponds', resistance: 'résistance',
  resonance: 'résonance', resonateur: 'résonateur', resout: 'résout', revolution: 'révolution', seche: 'sèche',
  securite: 'sécurité', separe: 'sépare', serie: 'série', situe: 'situé', solenoide: 'solénoïde', systeme: 'système',
  telephone: 'téléphone', television: 'télévision', theorie: 'théorie', theorique: 'théorique', tres: 'très',
  troisieme: 'troisième',
};

/** Formes qui existent aussi sans accent : on ne corrige que dans ces tournures. */
const PHRASES: [RegExp, string][] = [
  [/\b([Jj])usqu'a\b/g, "$1usqu'à"],
  [/\b([Jj])usqu'ou\b/g, "$1usqu'où"],
  [/^ou\b/, 'où'],
  [/\bou(?= a (?:=|est)\b)/g, 'où'],
  [/\bdirige(?= du\b)/g, 'dirigé'],
  [/\b(moment|sait) ou\b/g, '$1 où'],
  [/\b(solide) isole\b/g, '$1 isolé'],
  [/\b(lance|freine|pousse)(?= (?:avec|par|vers)\b)/g, '$1é'],
  [/\bau carre\b/g, 'au carré'],
];

function fixWords(text: string): string {
  return text.replace(/\p{L}+/gu, (word) => {
    const fixed = WORDS[word.toLowerCase()];
    if (!fixed) return word;
    return word[0] === word[0].toUpperCase() ? fixed[0].toUpperCase() + fixed.slice(1) : fixed;
  });
}

/** « a » préposition → « à », sauf verbe (il a, Hubble a…) ou variable (a = …, a est négatif). */
function fixA(text: string): string {
  return text.replace(/(?<![\p{L}'’(-])a(?![\p{L}'’-])/gu, (m, offset: number) => {
    const before = text.slice(0, offset);
    const after = text.slice(offset + 1);
    if (/^\s*(=|≈|est\b|\(en|pour\b)/.test(after)) return m;
    if (/(?:\b(?:il|elle|on|qui|y|Hubble|nacelle|colis)|\(|:)\s*$/i.test(before)) return m;
    return 'à';
  });
}

/** Corrige un texte ; `untyped` : chapitre tapé sans accents, où « a » et « ou » sont aussi revus. */
export function fixFrench(text: string, untyped: boolean): string {
  return text
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .split(/(\$[^$]*\$)/)
    .map((part, i) => {
      if (i % 2 === 1) return part;
      let out = fixWords(part);
      if (untyped) {
        for (const [re, by] of PHRASES) out = out.replace(re, by);
        out = fixA(out);
      }
      return out;
    })
    .join('');
}
