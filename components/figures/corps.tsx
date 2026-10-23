import { INK, Label, MUTED, Svg } from './parts';

const RED = '#d64541';
const BLUE = '#3a6fd6';

/** Double circulation : le cœur droit pompe vers les poumons, le cœur gauche vers les organes. */
export function Coeur() {
  return (
    <Svg w={480} h={324} title="La double circulation sanguine">
      <defs>
        <marker id="fleche-r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill={RED} /></marker>
        <marker id="fleche-b" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill={BLUE} /></marker>
      </defs>
      <rect x="170" y="20" width="140" height="50" rx="20" fill="#f8d5d5" stroke={INK} strokeWidth="1.5" />
      <text x="240" y="50" fontSize="12" textAnchor="middle" fill={INK}>poumons</text>
      <rect x="170" y="250" width="140" height="50" rx="20" fill="#f6e4c8" stroke={INK} strokeWidth="1.5" />
      <text x="240" y="280" fontSize="12" textAnchor="middle" fill={INK}>organes</text>
      {/* Cœur : côté droit (sang pauvre en O₂) à gauche du schéma, comme vu de face. */}
      <rect x="170" y="120" width="68" height="40" fill="#c9d6f5" stroke={INK} />
      <rect x="242" y="120" width="68" height="40" fill="#f5c9c9" stroke={INK} />
      <rect x="170" y="164" width="68" height="50" fill="#9fb6ee" stroke={INK} />
      <rect x="242" y="164" width="68" height="50" fill="#ee9f9f" stroke={INK} />
      <text x="204" y="145" fontSize="10" textAnchor="middle">OD</text>
      <text x="276" y="145" fontSize="10" textAnchor="middle">OG</text>
      <text x="204" y="193" fontSize="10" textAnchor="middle">VD</text>
      <text x="276" y="193" fontSize="10" textAnchor="middle">VG</text>
      {/* Circulation pulmonaire. */}
      <path d="M190 164 C 120 130, 140 80, 180 70" fill="none" stroke={BLUE} strokeWidth="4" markerEnd="url(#fleche-b)" />
      <path d="M300 70 C 340 80, 340 110, 300 125" fill="none" stroke={RED} strokeWidth="4" markerEnd="url(#fleche-r)" />
      {/* Circulation générale. */}
      <path d="M290 214 C 360 230, 350 260, 310 270" fill="none" stroke={RED} strokeWidth="4" markerEnd="url(#fleche-r)" />
      <path d="M170 270 C 110 250, 110 160, 168 140" fill="none" stroke={BLUE} strokeWidth="4" markerEnd="url(#fleche-b)" />
      <Label x={135} y={110} tx={122} ty={95} anchor="end">artère pulmonaire</Label>
      <Label x={335} y={95} tx={350} ty={80}>veines pulmonaires</Label>
      <Label x={348} y={245} tx={350} ty={225}>aorte</Label>
      <Label x={115} y={215} tx={102} ty={235} anchor="end">veines caves</Label>
      <text x="240" y="316" fontSize="10" textAnchor="middle" fill={MUTED}>OD, OG : oreillettes ; VD, VG : ventricules</text>
    </Svg>
  );
}

export function Anticorps() {
  return (
    <Svg w={420} h={260} title="Structure d’un anticorps">
      <g transform="translate(170 40)" strokeLinecap="round">
        {/* Chaînes lourdes. */}
        <path d="M0 200 V 100 L -60 20" fill="none" stroke="#3a6fd6" strokeWidth="14" />
        <path d="M14 200 V 100 L 74 20" fill="none" stroke="#3a6fd6" strokeWidth="14" />
        {/* Chaînes légères. */}
        <path d="M-30 95 L -82 30" fill="none" stroke="#7fb0f0" strokeWidth="10" />
        <path d="M44 95 L 96 30" fill="none" stroke="#7fb0f0" strokeWidth="10" />
        <polygon points="-90,0 -60,-12 -64,8" fill="#e8793a" />
        <polygon points="104,0 74,-12 78,8" fill="#e8793a" />
      </g>
      <Label x={110} y={60} tx={20} ty={20}>site de fixation de l’antigène</Label>
      <Label x={265} y={70} tx={300} ty={30}>antigène</Label>
      <Label x={177} y={200} tx={250} ty={210}>chaînes lourdes</Label>
      <Label x={110} y={100} tx={20} ty={130}>chaîne légère</Label>
    </Svg>
  );
}

export function Fleur() {
  return (
    <Svg w={460} h={300} title="Organes d’une fleur">
      <path d="M200 290 V 200" stroke="#3f7f2a" strokeWidth="6" />
      <path d="M200 205 q -60 -10 -90 -50 q 40 0 90 40" fill="#7cc45a" stroke="#2f6b12" />
      <path d="M200 205 q 60 -10 90 -50 q -40 0 -90 40" fill="#7cc45a" stroke="#2f6b12" />
      <path d="M200 190 q -110 -40 -100 -140 q 60 30 100 120" fill="#f5b7c7" stroke="#c25275" strokeWidth="1.5" />
      <path d="M200 190 q 110 -40 100 -140 q -60 30 -100 120" fill="#f5b7c7" stroke="#c25275" strokeWidth="1.5" />
      {/* Pistil. */}
      <ellipse cx="200" cy="170" rx="22" ry="20" fill="#f6d36b" stroke="#b08a1a" strokeWidth="1.5" />
      <circle cx="193" cy="168" r="4" fill="#fff" stroke="#b08a1a" />
      <circle cx="207" cy="172" r="4" fill="#fff" stroke="#b08a1a" />
      <path d="M200 150 V 75" stroke="#b08a1a" strokeWidth="5" />
      <ellipse cx="200" cy="70" rx="12" ry="6" fill="#f6d36b" stroke="#b08a1a" />
      {/* Étamines. */}
      {[-1, 1].map((s) => (
        <g key={s}>
          <path d={`M${200 + s * 14} 165 Q ${200 + s * 40} 120 ${200 + s * 46} 90`} fill="none" stroke="#8a6d3b" strokeWidth="2.5" />
          <ellipse cx={200 + s * 46} cy="84" rx="7" ry="11" fill="#e8a33a" stroke="#8a5a1a" />
        </g>
      ))}
      <Label x={200} y={68} tx={320} ty={30}>stigmate</Label>
      <Label x={200} y={110} tx={320} ty={70}>style</Label>
      <Label x={215} y={175} tx={320} ty={175}>ovaire</Label>
      <Label x={207} y={172} tx={320} ty={205}>ovule</Label>
      <Label x={246} y={84} tx={330} ty={110}>anthère (pollen)</Label>
      <Label x={238} y={130} tx={330} ty={140}>filet</Label>
      <Label x={130} y={110} tx={96} ty={92} anchor="end">pétale</Label>
      <Label x={130} y={175} tx={92} ty={200} anchor="end">sépale</Label>
    </Svg>
  );
}

export function Globe() {
  const layers = [
    { r: 130, fill: '#c9a26b', label: 'croûte (5 à 70 km)' },
    { r: 122, fill: '#e8793a', label: 'manteau (jusqu’à 2 900 km)' },
    { r: 70, fill: '#f2b134', label: 'noyau externe liquide' },
    { r: 35, fill: '#f7e27a', label: 'noyau interne solide' },
  ];
  return (
    <Svg w={480} h={300} title="Structure interne du globe terrestre">
      <g transform="translate(150 150)">
        {layers.map((l) => (
          <circle key={l.r} r={l.r} fill={l.fill} stroke={INK} strokeWidth="1" />
        ))}
        <path d="M0 0 L 130 0 A 130 130 0 0 0 0 -130 Z" fill="#fff" opacity="0.15" />
      </g>
      {layers.map((l, i) => (
        <Label key={l.r} x={150 + l.r * 0.72 - (i === 0 ? 2 : 4)} y={150 - l.r * 0.69 + (i === 0 ? 2 : 6)} tx={310} ty={50 + i * 55}>
          {l.label}
        </Label>
      ))}
      <text x="150" y="295" fontSize="11" fill={INK} textAnchor="middle">rayon : 6 370 km</text>
    </Svg>
  );
}
