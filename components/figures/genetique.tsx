import { INK, Label, Svg } from './parts';

const BASE_COLORS: Record<string, string> = { A: '#e0533d', T: '#f2b134', G: '#3a7bd5', C: '#4caf73' };
const PAIRS = ['AT', 'GC', 'TA', 'CG', 'AT', 'GC', 'GC', 'TA', 'AT', 'CG'];

/** Double hélice d’ADN, représentée « déroulée » à gauche et enroulée à droite. */
export function Adn() {
  const rows = PAIRS.map((pair, i) => ({ pair, y: 30 + i * 24 }));
  return (
    <Svg w={480} h={290} title="Structure de la molécule d’ADN">
      {/* Échelle déroulée : deux brins sucre-phosphate et les paires de bases. */}
      <line x1="40" y1="20" x2="40" y2="270" stroke={INK} strokeWidth="5" />
      <line x1="200" y1="20" x2="200" y2="270" stroke={INK} strokeWidth="5" />
      {rows.map(({ pair, y }) => (
        <g key={y}>
          <rect x="44" y={y - 7} width="74" height="14" rx="3" fill={BASE_COLORS[pair[0]]} />
          <rect x="122" y={y - 7} width="74" height="14" rx="3" fill={BASE_COLORS[pair[1]]} />
          <text x="81" y={y + 4} fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">{pair[0]}</text>
          <text x="159" y={y + 4} fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">{pair[1]}</text>
          <circle cx="40" cy={y} r="4" fill="#f4f1ea" stroke={INK} />
          <circle cx="200" cy={y} r="4" fill="#f4f1ea" stroke={INK} />
        </g>
      ))}
      {/* Double hélice. */}
      <g transform="translate(330 20)">
        {Array.from({ length: 25 }, (_, k) => {
          const y = k * 10;
          const x = 50 * Math.sin((k / 25) * 4 * Math.PI);
          return <line key={k} x1={Math.round(-x)} y1={y} x2={Math.round(x)} y2={y} stroke={BASE_COLORS['ATGC'[k % 4]]} strokeWidth="3" />;
        })}
        <path d={Array.from({ length: 51 }, (_, k) => `${k ? 'L' : 'M'}${Math.round(50 * Math.sin((k / 50) * 4 * Math.PI))} ${k * 5}`).join(' ')} fill="none" stroke={INK} strokeWidth="4" />
        <path d={Array.from({ length: 51 }, (_, k) => `${k ? 'L' : 'M'}${Math.round(-50 * Math.sin((k / 50) * 4 * Math.PI))} ${k * 5}`).join(' ')} fill="none" stroke="#7d5ba6" strokeWidth="4" />
      </g>
      <Label x={40} y={138} tx={30} ty={138} anchor="end">brin</Label>
      <Label x={120} y={30} tx={225} ty={8}>A – T et G – C : bases complémentaires</Label>
      <Label x={200} y={258} tx={212} ty={281}>sucre + phosphate</Label>
      <text x="380" y="285" fontSize="11" fill={INK} textAnchor="middle">double hélice</text>
    </Svg>
  );
}

/** Chromosome à deux chromatides, après la réplication. */
export function Chromosome() {
  return (
    <Svg w={420} h={240} title="Un chromosome à deux chromatides">
      <g transform="translate(150 20)">
        <rect x="-26" y="0" width="22" height="200" rx="11" fill="#4a8fd6" stroke={INK} strokeWidth="1.5" />
        <rect x="4" y="0" width="22" height="200" rx="11" fill="#4a8fd6" stroke={INK} strokeWidth="1.5" />
        <rect x="-30" y="66" width="60" height="16" rx="8" fill="#1a2340" />
        {[20, 40, 110, 140, 170].map((y) => (
          <g key={y}>
            <rect x="-24" y={y} width="18" height="6" fill="#2b5f9e" />
            <rect x="6" y={y} width="18" height="6" fill="#2b5f9e" />
          </g>
        ))}
      </g>
      <Label x={124} y={150} tx={100} ty={200} anchor="end">chromatide</Label>
      <Label x={176} y={150} tx={250} ty={200}>chromatide (copie identique)</Label>
      <Label x={180} y={94} tx={250} ty={94}>centromère</Label>
      <Label x={160} y={45} tx={250} ty={40}>bras court</Label>
      <Label x={160} y={190} tx={250} ty={160}>bras long</Label>
      <Label x={130} y={122} tx={110} ty={122} anchor="end">gène (locus)</Label>
    </Svg>
  );
}
