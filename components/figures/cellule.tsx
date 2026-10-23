import { INK, Label, Svg } from './parts';

// Schémas d’ultrastructure, dessinés pour Kalanso (proportions simplifiées).

function Mitochondrie({ x, y, rot = 0, s = 1 }: { x: number; y: number; rot?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse rx="22" ry="11" fill="#f6c58f" stroke="#b06a1f" strokeWidth="1.5" />
      <path d="M-16 0 q 4 -8 8 0 t 8 0 t 8 0 t 8 0" fill="none" stroke="#b06a1f" strokeWidth="1.2" />
    </g>
  );
}

function Golgi({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="#7d5ba6" strokeWidth="3" strokeLinecap="round">
      {[0, 7, 14, 21].map((d) => (
        <path key={d} d={`M${-22 + d / 3} ${d} q 22 -10 44 0`} />
      ))}
      <circle cx="28" cy="2" r="3" fill="#cdb8ea" stroke="none" />
      <circle cx="30" cy="14" r="2.5" fill="#cdb8ea" stroke="none" />
    </g>
  );
}

function Reticulum({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 10, 20].map((d) => (
        <g key={d}>
          <path d={`M0 ${d} q 20 -8 40 0 t 40 0`} fill="none" stroke="#4a8fd6" strokeWidth="3" />
          {[6, 18, 30, 42, 54, 66, 76].map((rx) => (
            <circle key={rx} cx={rx} cy={d + (rx % 20 < 10 ? -3 : 3)} r="1.6" fill={INK} />
          ))}
        </g>
      ))}
    </g>
  );
}

export function CelluleAnimale() {
  return (
    <Svg w={500} h={300} title="Cellule animale vue au microscope électronique">
      <ellipse cx="200" cy="150" rx="170" ry="125" fill="#fdf1e4" stroke="#b9895a" strokeWidth="3" />
      <circle cx="190" cy="140" r="52" fill="#efe3f7" stroke="#7d5ba6" strokeWidth="3" strokeDasharray="10 3" />
      <circle cx="200" cy="135" r="16" fill="#9d7cc6" />
      <Reticulum x={80} y={200} />
      <Golgi x={290} y={95} />
      <Mitochondrie x={110} y={90} rot={-20} />
      <Mitochondrie x={290} y={200} rot={25} />
      <Mitochondrie x={150} y={235} rot={10} s={0.8} />
      <circle cx="320" cy="150" r="9" fill="#e9a3a3" stroke="#b55" strokeWidth="1.2" />
      <g transform="translate(255 60)" stroke={INK} strokeWidth="1.5">
        <rect x="-4" y="-9" width="8" height="18" fill="#cfd6e6" />
        <rect x="2" y="-4" width="18" height="8" fill="#cfd6e6" />
      </g>
      {[[60, 150], [70, 120], [250, 250], [330, 120]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill={INK} />
      ))}
      <Label x={330} y={60} tx={385} ty={30}>membrane plasmique</Label>
      <Label x={225} y={180} tx={385} ty={210} >noyau</Label>
      <Label x={205} y={135} tx={385} ty={120}>nucléole</Label>
      <Label x={300} y={98} tx={385} ty={90}>appareil de Golgi</Label>
      <Label x={300} y={205} tx={385} ty={245}>mitochondrie</Label>
      <Label x={320} y={150} tx={385} ty={150}>lysosome</Label>
      <Label x={262} y={60} tx={385} ty={60}>centrioles</Label>
      <Label x={82} y={215} tx={68} ty={285}>réticulum granuleux (ribosomes)</Label>
      <Label x={104} y={84} tx={98} ty={48} anchor="end">mitochondrie</Label>
    </Svg>
  );
}

export function CelluleVegetale() {
  return (
    <Svg w={500} h={310} title="Cellule végétale vue au microscope électronique">
      <rect x="40" y="25" width="300" height="250" rx="12" fill="#e8f5dc" stroke="#4d8c2a" strokeWidth="7" />
      <rect x="50" y="35" width="280" height="230" rx="8" fill="#f2fae9" stroke="#2f6b12" strokeWidth="1.5" />
      <rect x="125" y="70" width="160" height="150" rx="40" fill="#cfe8f7" stroke="#6a9fb5" strokeWidth="2" />
      <circle cx="85" cy="85" r="28" fill="#efe3f7" stroke="#7d5ba6" strokeWidth="2.5" />
      <circle cx="90" cy="82" r="9" fill="#9d7cc6" />
      {[[80, 200, 20], [100, 240, -15], [300, 60, 10], [305, 230, -25]].map(([x, y, r]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx="20" ry="11" fill="#7cc45a" stroke="#2f6b12" strokeWidth="1.5" />
          {[-9, -3, 3, 9].map((dx) => (
            <rect key={dx} x={dx - 2} y="-5" width="4" height="10" fill="#3f8a2a" />
          ))}
        </g>
      ))}
      <Mitochondrie x={300} y={150} rot={80} s={0.7} />
      <Golgi x={85} y={135} />
      <Label x={190} y={275} tx={190} ty={296} anchor="middle">paroi (cellulose)</Label>
      <Label x={330} y={110} tx={360} ty={110}>membrane plasmique</Label>
      <Label x={250} y={150} tx={360} ty={150}>vacuole</Label>
      <Label x={305} y={230} tx={360} ty={235}>chloroplaste</Label>
      <Label x={300} y={150} tx={360} ty={180}>mitochondrie</Label>
      <Label x={85} y={70} tx={360} ty={40}>noyau</Label>
      <Label x={95} y={140} tx={360} ty={70}>appareil de Golgi</Label>
    </Svg>
  );
}
