import { INK, Label, Svg } from './parts';

export function Neurone() {
  return (
    <Svg w={500} h={200} title="Un neurone">
      {/* Dendrites et corps cellulaire. */}
      <g stroke="#7d5ba6" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M70 90 l -30 -40 m 18 24 l -22 -6" />
        <path d="M60 110 l -40 10 m 22 -5 l -10 22" />
        <path d="M80 125 l -10 45 m 4 -20 l 18 14" />
        <path d="M90 75 l 5 -45 m -2 20 l -16 -12" />
      </g>
      <circle cx="85" cy="100" r="28" fill="#e6d9f5" stroke="#7d5ba6" strokeWidth="2.5" />
      <circle cx="85" cy="100" r="9" fill="#7d5ba6" />
      {/* Axone et gaine de myéline. */}
      <line x1="113" y1="100" x2="420" y2="100" stroke="#7d5ba6" strokeWidth="3" />
      {[135, 195, 255, 315, 375].map((x) => (
        <rect key={x} x={x} y="90" width="50" height="20" rx="10" fill="#fbe7a1" stroke="#c79a1e" strokeWidth="1.5" />
      ))}
      {/* Arborisation terminale. */}
      <g stroke="#7d5ba6" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M420 100 l 30 -30 m -30 30 l 34 0 m -34 0 l 30 30" />
      </g>
      {[[452, 68], [456, 100], [452, 132]].map(([cx, cy]) => (
        <circle key={cx + cy} cx={cx} cy={cy} r="6" fill="#cdb8ea" stroke="#7d5ba6" />
      ))}
      <Label x={45} y={55} tx={10} ty={20}>dendrites</Label>
      <Label x={85} y={100} tx={60} ty={190}>noyau</Label>
      <Label x={105} y={80} tx={130} ty={30}>corps cellulaire</Label>
      <Label x={250} y={92} tx={235} ty={40}>gaine de myéline</Label>
      <Label x={252} y={100} tx={280} ty={160}>nœud de Ranvier</Label>
      <Label x={330} y={100} tx={330} ty={190}>axone</Label>
      <Label x={456} y={100} tx={430} ty={30} anchor="middle">terminaisons (synapses)</Label>
      <path d="M150 140 h 220" stroke="#e0533d" strokeWidth="2" markerEnd="url(#fleche-neurone)" />
      <defs>
        <marker id="fleche-neurone" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="#e0533d" />
        </marker>
      </defs>
      <text x="260" y="134" fontSize="11" fill="#e0533d" textAnchor="middle">sens du message nerveux</text>
    </Svg>
  );
}

export function Synapse() {
  return (
    <Svg w={460} h={260} title="Une synapse chimique">
      <path d="M60 20 h 120 v 110 q -60 50 -120 0 z" fill="#e6d9f5" stroke="#7d5ba6" strokeWidth="2.5" />
      {[[95, 70], [125, 60], [150, 85], [110, 100], [140, 115]].map(([cx, cy]) => (
        <g key={cx + cy}>
          <circle cx={cx} cy={cy} r="12" fill="#fff" stroke="#7d5ba6" />
          {[-4, 0, 4].map((d) => (
            <circle key={d} cx={cx + d} cy={cy + (d ? 2 : -3)} r="2" fill="#e0533d" />
          ))}
        </g>
      ))}
      <rect x="50" y="170" width="150" height="70" rx="8" fill="#fde6df" stroke="#c0392b" strokeWidth="2.5" />
      {[75, 100, 125, 150, 175].map((x) => (
        <path key={x} d={`M${x - 6} 170 v -6 h 12 v 6`} fill="#f2a08d" stroke="#c0392b" />
      ))}
      {[[105, 152], [130, 158], [150, 150], [90, 160]].map(([cx, cy]) => (
        <circle key={cx + cy} cx={cx} cy={cy} r="2.5" fill="#e0533d" />
      ))}
      <Label x={120} y={30} tx={240} ty={30}>neurone présynaptique</Label>
      <Label x={150} y={85} tx={240} ty={80}>vésicules de neurotransmetteur</Label>
      <Label x={130} y={158} tx={240} ty={150}>fente synaptique</Label>
      <Label x={150} y={166} tx={240} ty={180}>récepteurs</Label>
      <Label x={180} y={220} tx={240} ty={225}>cellule postsynaptique</Label>
    </Svg>
  );
}

export function ArcReflexe() {
  return (
    <Svg w={500} h={292} title="Arc réflexe">
      {/* Coupe de la moelle épinière. */}
      <ellipse cx="370" cy="120" rx="80" ry="70" fill="#f4f1ea" stroke={INK} strokeWidth="2" />
      <path d="M330 80 q 40 30 80 0 q -20 40 0 80 q -40 -30 -80 0 q 20 -40 0 -80 z" fill="#c7c1d8" stroke="#7d5ba6" />
      <circle cx="270" cy="70" r="14" fill="#fbe7a1" stroke="#c79a1e" strokeWidth="2" />
      {/* Neurone sensitif (bleu) : peau → ganglion → moelle. */}
      <path d="M40 220 C 120 200, 200 120, 256 76 M 284 70 C 310 66, 330 80, 355 105" fill="none" stroke="#2f6fd6" strokeWidth="3" />
      <circle cx="270" cy="70" r="6" fill="#2f6fd6" />
      {/* Neurone moteur (rouge) : moelle → muscle. */}
      <circle cx="360" cy="150" r="7" fill="#e0533d" />
      <path d="M360 150 C 300 190, 220 230, 120 250" fill="none" stroke="#e0533d" strokeWidth="3" />
      <ellipse cx="95" cy="250" rx="40" ry="16" fill="#f2a08d" stroke="#c0392b" strokeWidth="2" />
      <circle cx="40" cy="220" r="7" fill="#2f6fd6" />
      <Label x={40} y={220} tx={10} ty={172}>récepteur (peau)</Label>
      <Label x={160} y={170} tx={110} ty={130} anchor="end">neurone sensitif</Label>
      <Label x={270} y={60} tx={230} ty={20} anchor="end">ganglion spinal</Label>
      <Label x={370} y={115} tx={497} ty={30} anchor="end">substance grise</Label>
      <Label x={360} y={150} tx={497} ty={235} anchor="end">motoneurone</Label>
      <Label x={250} y={215} tx={260} ty={270}>neurone moteur</Label>
      <text x="95" y="284" fontSize="11" fill={INK} textAnchor="middle">muscle (effecteur)</text>
    </Svg>
  );
}

function SarcomereRow({ y, half, title }: { y: number; half: number; title: string }) {
  // half : demi-longueur du sarcomère ; les filaments gardent leur longueur.
  const cx = 240;
  return (
    <g>
      <text x="20" y={y - 34} fontSize="12" fontWeight="700" fill={INK}>{title}</text>
      {[cx - half, cx + half].map((x) => (
        <line key={x} x1={x} y1={y - 28} x2={x} y2={y + 28} stroke={INK} strokeWidth="4" />
      ))}
      {[-18, -6, 6, 18].map((dy) => (
        <g key={dy}>
          <line x1={cx - half} y1={y + dy} x2={cx - half + 100} y2={y + dy} stroke="#4a8fd6" strokeWidth="2.5" />
          <line x1={cx + half} y1={y + dy} x2={cx + half - 100} y2={y + dy} stroke="#4a8fd6" strokeWidth="2.5" />
        </g>
      ))}
      {[-12, 0, 12].map((dy) => (
        <line key={dy} x1={cx - 70} y1={y + dy} x2={cx + 70} y2={y + dy} stroke="#c0392b" strokeWidth="6" strokeLinecap="round" />
      ))}
    </g>
  );
}

export function Sarcomere() {
  return (
    <Svg w={480} h={260} title="Sarcomère relâché et contracté">
      <SarcomereRow y={70} half={130} title="Relâché" />
      <SarcomereRow y={195} half={100} title="Contracté" />
      <Label x={110} y={70} tx={20} ty={120}>strie Z</Label>
      <Label x={130} y={52} tx={330} ty={14}>actine (filament fin)</Label>
      <Label x={240} y={70} tx={300} ty={122}>myosine (filament épais)</Label>
      <text x="240" y="250" fontSize="11" fill={INK} textAnchor="middle">La bande A (longueur de la myosine) ne change pas ; les bandes I et la zone H raccourcissent.</text>
    </Svg>
  );
}
