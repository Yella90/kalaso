import { Baobab, Bubble, Cloud, Ground, Hut, Party, Person, Reveal, SceneSvg, Sky, Sun, type SceneProps } from './kit';

/** Le champ de Koutiala : mesuré, semé, labouré, clôturé, vendu, puis le bilan. */
export function ChampCooperativeScene({ step, say, celebrate }: SceneProps) {
  const grown = step >= 5;
  return (
    <SceneSvg label="Le champ de la coopérative">
      <Sky id="champ" />
      <Sun x={720} y={56} />
      <Cloud x={420} y={50} />
      <Ground y={150} color="#e0b07a" />
      <Baobab x={60} y={175} s={0.7} />
      <Hut x={740} y={180} s={0.8} />

      {/* Le champ, vu en perspective. */}
      <path d="M210 175 L 590 175 L 680 300 L 120 300 Z" fill="#b7793f" />
      {/* Mission 3 : les sillons du labour. */}
      <Reveal on={step >= 3}>
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${230 + i * 42} 175 L ${150 + i * 62} 300`} stroke="#8a5528" strokeWidth="3" />
        ))}
      </Reveal>
      {/* Mission 2 puis 5 : les pousses de mil, qui grandissent. */}
      <Reveal on={step >= 2}>
        {Array.from({ length: 8 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => {
            const y = 190 + j * 30;
            const x0 = 210 - (y - 175) * 0.7;
            const x = x0 + 24 + i * ((380 + (y - 175) * 1.4) / 8);
            return (
              <g key={`${i}-${j}`} transform={`translate(${x.toFixed(0)} ${y})`}>
                <g style={{ transform: `scale(${grown ? 1.4 : 0.5})`, transition: 'transform 1.4s' }}>
                  <g className="k-sway">
                    <path d="M0 0 V -26 M0 -12 Q -10 -18 -12 -26 M0 -16 Q 10 -22 12 -30" stroke="#3f7f2a" strokeWidth="2.5" fill="none" />
                    {grown && <ellipse cx="0" cy="-30" rx="3" ry="8" fill="#c99a3b" />}
                  </g>
                </g>
              </g>
            );
          }),
        )}
      </Reveal>
      {/* Mission 1 : le mètre ruban le long de la diagonale. */}
      <Reveal on={step >= 1}>
        <path d="M210 175 L 680 300" stroke="#facc15" strokeWidth="4" strokeDasharray="10 6" />
        <g transform="translate(445 226) rotate(15)">
          <rect x="-40" y="-14" width="80" height="22" rx="6" fill="#fff" stroke="#a16207" />
          <text x="0" y="2" fontSize="12" fontWeight="700" textAnchor="middle" fill="#a16207">diagonale</text>
        </g>
      </Reveal>
      {/* Mission 3 : le tracteur traverse le champ. */}
      <Reveal on={step >= 3 && step < 5}>
        <g className="k-drive">
          <g transform="translate(0 286)">
            <rect x="-28" y="-30" width="44" height="22" rx="4" fill="#dc2626" />
            <rect x="-6" y="-48" width="20" height="20" rx="3" fill="#bae6fd" stroke="#dc2626" strokeWidth="3" />
            <circle cx="-18" cy="-6" r="12" fill="#1f2937" className="k-spin" />
            <circle cx="14" cy="-4" r="8" fill="#1f2937" />
          </g>
        </g>
      </Reveal>
      {/* Mission 4 : la clôture du jardin. */}
      <Reveal on={step >= 4}>
        <g>
          <path d="M600 175 L 690 300" stroke="#78350f" strokeWidth="3" />
          <path d="M610 188 L 700 312" stroke="#78350f" strokeWidth="3" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={597 + i * 15} y={168 + i * 21} width="6" height="26" fill="#92400e" />
          ))}
        </g>
      </Reveal>
      {/* Mission 5 : la vente au marché. */}
      <Reveal on={step >= 5}>
        <g transform="translate(700 270)">
          <rect x="-40" y="-40" width="80" height="40" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
          <path d="M-48 -40 L 0 -64 L 48 -40 Z" fill="#f97316" />
          {[-22, 0, 22].map((x) => (
            <ellipse key={x} cx={x} cy="-12" rx="10" ry="12" fill="#d6b47a" stroke="#92400e" />
          ))}
          <circle cx="30" cy="-48" r="7" fill="#facc15" className="k-bob" />
        </g>
      </Reveal>
      {/* Mission 6 : le bilan, en diagramme. */}
      <Reveal on={step >= 6}>
        <g transform="translate(40 60)">
          <rect width="130" height="86" rx="10" fill="#fff" stroke="#334155" />
          {[34, 56, 44, 70].map((h, i) => (
            <rect key={i} x={16 + i * 28} y={76 - h} width="18" height={h} rx="3" fill={['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'][i]} />
          ))}
        </g>
      </Reveal>

      <Person x={150} y={308} shirt="#7c3aed" scarf="#ec4899" wave={step === 0 || step >= 6} s={1.4} />
      <Bubble x={190} y={124} text={say} w={320} />
      <Party key={celebrate} n={celebrate} x={420} y={170} />
    </SceneSvg>
  );
}
