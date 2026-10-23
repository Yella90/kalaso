import { INK, Svg } from './parts';

const W = 480;
const toX = (day: number) => 50 + ((day - 1) / 27) * (W - 70);

/** Courbe lissée passant par des points (jour, valeur entre 0 et 1). */
function curve(points: [number, number][], top: number, height: number) {
  return points.map(([d, v], i) => `${i ? 'L' : 'M'}${toX(d).toFixed(1)} ${(top + height - v * height).toFixed(1)}`).join(' ');
}

/** Cycle sexuel de la femme : hormones hypophysaires, ovariennes et muqueuse utérine. */
export function CycleOvarien() {
  const lh: [number, number][] = [[1, 0.15], [10, 0.18], [12, 0.3], [13, 0.8], [14, 1], [15, 0.4], [17, 0.15], [28, 0.12]];
  const fsh: [number, number][] = [[1, 0.35], [5, 0.3], [12, 0.25], [14, 0.5], [15, 0.25], [24, 0.15], [28, 0.3]];
  const oestro: [number, number][] = [[1, 0.15], [8, 0.35], [12, 0.85], [14, 0.6], [16, 0.3], [21, 0.55], [26, 0.3], [28, 0.15]];
  const proge: [number, number][] = [[1, 0.05], [14, 0.08], [17, 0.5], [21, 0.95], [25, 0.5], [28, 0.08]];
  const muqueuse: [number, number][] = [[1, 0.5], [5, 0.15], [14, 0.6], [21, 1], [27, 0.9], [28, 0.5]];
  return (
    <Svg w={W} h={330} title="Le cycle sexuel de la femme">
      <text x="10" y="18" fontSize="11" fontWeight="700" fill={INK}>Hypophyse</text>
      <path d={curve(lh, 22, 70)} fill="none" stroke="#e0533d" strokeWidth="2.5" />
      <path d={curve(fsh, 22, 70)} fill="none" stroke="#8e6cc6" strokeWidth="2" strokeDasharray="5 3" />
      <text x={toX(14) + 6} y="30" fontSize="10" fill="#e0533d">pic de LH</text>
      <text x={toX(24)} y="70" fontSize="10" fill="#8e6cc6">FSH</text>
      <text x="10" y="118" fontSize="11" fontWeight="700" fill={INK}>Ovaire</text>
      <path d={curve(oestro, 122, 70)} fill="none" stroke="#e8793a" strokeWidth="2.5" />
      <path d={curve(proge, 122, 70)} fill="none" stroke="#2f6fd6" strokeWidth="2.5" />
      <text x={toX(2)} y="162" fontSize="10" fill="#e8793a">œstrogènes</text>
      <text x={toX(22) + 4} y="132" fontSize="10" fill="#2f6fd6">progestérone</text>
      <text x="10" y="218" fontSize="11" fontWeight="700" fill={INK}>Utérus</text>
      <path d={`${curve(muqueuse, 222, 60)} L ${toX(28)} 282 L ${toX(1)} 282 Z`} fill="#f5c3c3" stroke="#c0392b" />
      <line x1={toX(14)} y1="15" x2={toX(14)} y2="290" stroke={INK} strokeDasharray="3 3" />
      <text x={toX(14)} y="305" fontSize="11" fill={INK} textAnchor="middle">ovulation (J14)</text>
      {[1, 7, 14, 21, 28].map((d) => (
        <text key={d} x={toX(d)} y="322" fontSize="10" fill="#586179" textAnchor="middle">J{d}</text>
      ))}
      <text x={toX(3)} y="275" fontSize="10" fill="#c0392b" textAnchor="middle">règles</text>
      <text x={toX(7)} y="205" fontSize="10" fill={INK} textAnchor="middle">phase folliculaire</text>
      <text x={toX(21)} y="205" fontSize="10" fill={INK} textAnchor="middle">phase lutéale (corps jaune)</text>
    </Svg>
  );
}

function Box({ x, y, w, text, fill }: { x: number; y: number; w: number; text: string; fill: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="34" rx="10" fill={fill} stroke={INK} strokeWidth="1.2" />
      <text x={x + w / 2} y={y + 21} fontSize="11.5" fontWeight="700" fill={INK} textAnchor="middle">{text}</text>
    </g>
  );
}

/** Boucle de régulation de la glycémie par l’insuline et le glucagon. */
export function RegulationGlycemie() {
  return (
    <Svg w={W} h={300} title="Régulation de la glycémie">
      <defs>
        <marker id="fleche-g" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill={INK} /></marker>
      </defs>
      {/* Boucle du haut : après un repas, l’insuline ramène la glycémie vers 1 g/L. */}
      <Box x={10} y={20} w={145} text="glycémie monte" fill="#fde6df" />
      <Box x={168} y={20} w={145} text="cellules β : insuline" fill="#dbe6fb" />
      <Box x={326} y={20} w={145} text="foie, muscles stockent" fill="#dbe6fb" />
      {/* Au centre : la valeur de consigne. */}
      <Box x={160} y={128} w={160} text="glycémie ≈ 1 g/L" fill="#ecfdf3" />
      {/* Boucle du bas : à jeun ou pendant un effort, le glucagon la fait remonter. */}
      <Box x={10} y={236} w={145} text="glycémie baisse" fill="#fde6df" />
      <Box x={168} y={236} w={145} text="cellules α : glucagon" fill="#fdebd3" />
      <Box x={326} y={236} w={145} text="foie libère du glucose" fill="#fdebd3" />
      <g stroke={INK} strokeWidth="1.6" fill="none" markerEnd="url(#fleche-g)">
        <path d="M155 37 H 164" />
        <path d="M313 37 H 322" />
        <path d="M190 128 L 90 58" />
        <path d="M400 56 L 300 126" />
        <path d="M190 162 L 90 232" />
        <path d="M400 236 L 300 166" />
      </g>
      <text x="118" y="96" fontSize="10.5" fill="#586179" textAnchor="end">repas</text>
      <text x="364" y="96" fontSize="10.5" fill="#586179">elle redescend</text>
      <text x="118" y="206" fontSize="10.5" fill="#586179" textAnchor="end">jeûne, effort</text>
      <text x="364" y="206" fontSize="10.5" fill="#586179">elle remonte</text>
      <text x="240" y="292" fontSize="10.5" fill="#586179" textAnchor="middle">Chaque écart déclenche la correction inverse : c’est un rétrocontrôle négatif.</text>
    </Svg>
  );
}
