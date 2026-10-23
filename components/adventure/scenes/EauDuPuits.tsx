import { Baobab, Bubble, Cloud, Ground, Hut, Party, Person, Reveal, SceneSvg, Sky, Sun, type SceneProps } from './kit';

/** L’eau du puits : analyse, dilution, chloration, pH, tartre. L’eau devient claire. */
export function EauDuPuitsScene({ step, say, celebrate }: SceneProps) {
  const clean = step >= 4;
  const water = clean ? '#7dd3fc' : '#a3a37a';
  return (
    <SceneSvg label="Le puits du village">
      <Sky id="puits" />
      <Sun x={90} y={60} />
      <Cloud x={300} y={56} />
      <Ground y={235} />
      <Baobab x={740} y={250} s={0.9} />
      <Hut x={640} y={252} />

      {/* Le puits et le seau qui monte et descend. */}
      <g transform="translate(140 252)">
        <ellipse cx="0" cy="0" rx="46" ry="12" fill="#57534e" />
        <rect x="-46" y="-36" width="92" height="36" fill="#a8a29e" />
        <ellipse cx="0" cy="-36" rx="46" ry="12" fill={water} style={{ transition: 'fill 1.5s' }} />
        <path d="M-40 -36 V -96 M40 -36 V -96 M-46 -96 H 46" stroke="#78350f" strokeWidth="6" />
        <line x1="0" y1="-96" x2="0" y2="-60" stroke="#57534e" strokeWidth="2" />
        <g className="k-float">
          <path d="M-10 -62 h 20 l -3 16 h -14 Z" fill="#64748b" />
        </g>
      </g>

      {/* Le canari (jarre d’eau) : l’eau s’éclaircit avec le traitement. */}
      <g transform="translate(330 270)">
        <path d="M-40 0 Q -54 -46 -24 -70 L 24 -70 Q 54 -46 40 0 Z" fill="#b45309" />
        <ellipse cx="0" cy="-70" rx="24" ry="7" fill={water} style={{ transition: 'fill 1.5s' }} />
        {/* Microbes, qui disparaissent après la chloration (mission 4). */}
        <Reveal on={!clean}>
          {[[-12, -40], [10, -30], [0, -52]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <g className="k-buzz" style={{ animationDelay: `${i * 0.4}s` }}>
                <ellipse rx="6" ry="4" fill="#84cc16" />
                <path d="M6 0 q 4 -3 7 0" stroke="#84cc16" strokeWidth="1.5" fill="none" />
              </g>
            </g>
          ))}
        </Reveal>
      </g>

      {/* Mission 1 : le tube à essai de l’analyse, avec ses ions. */}
      <Reveal on={step >= 1}>
        <g transform="translate(450 120)">
          <rect x="-14" y="-60" width="28" height="80" rx="12" fill="#e0f2fe" stroke="#0f172a" strokeWidth="2" />
          <rect x="-11" y="-20" width="22" height="37" rx="9" fill="#a3a37a" />
          {['Na⁺', 'NO₃⁻', 'Ca²⁺'].map((ion, i) => (
            <text key={ion} x={22} y={-40 + i * 22} fontSize="12" fontWeight="700" fill="#0f172a" className="k-float" style={{ animationDelay: `${i * 0.3}s` }}>
              {ion}
            </text>
          ))}
        </g>
      </Reveal>
      {/* Mission 2 : le compteur de nitrates. */}
      <Reveal on={step >= 2}>
        <g transform="translate(540 70)">
          <rect width="96" height="44" rx="8" fill="#0f172a" />
          <text x="48" y="20" fontSize="11" fill="#94a3b8" textAnchor="middle">nitrates</text>
          <text x="48" y="37" fontSize="15" fontWeight="700" fill={step >= 3 ? '#4ade80' : '#f87171'} textAnchor="middle">
            {step >= 3 ? '≤ 50 mg/L' : '> 50 mg/L'}
          </text>
        </g>
      </Reveal>
      {/* Mission 3 : l’eau de pluie versée dans le canari. */}
      <Reveal on={step >= 3}>
        <g transform="translate(400 180)">
          <path d="M0 0 h 36 v 34 h -36 Z" fill="#60a5fa" opacity="0.8" transform="rotate(-30)" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={-48 + i * 4} cy={10} r="3.5" fill="#38bdf8" className="k-drop" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </g>
      </Reveal>
      {/* Mission 4 : quelques gouttes de chlore. */}
      <Reveal on={step >= 4}>
        <g transform="translate(330 150)">
          <rect x="-8" y="-30" width="16" height="26" rx="4" fill="#fef9c3" stroke="#a16207" />
          <circle cx="0" cy="8" r="3" fill="#fde047" className="k-drop" />
        </g>
      </Reveal>
      {/* Mission 5 : la bandelette de pH. */}
      <Reveal on={step >= 5}>
        <g transform="translate(250 150)">
          <rect x="-4" y="-40" width="8" height="46" fill="#fff" stroke="#334155" />
          <rect x="-4" y="-6" width="8" height="12" fill="#22c55e" className="k-blink" />
          <text x="10" y="4" fontSize="12" fontWeight="700" fill="#166534">pH 7</text>
        </g>
      </Reveal>
      {/* Mission 6 : la bouilloire et son dépôt de tartre. */}
      <Reveal on={step >= 6}>
        <g transform="translate(520 260)">
          <path d="M-30 0 Q -34 -40 0 -44 Q 34 -40 30 0 Z" fill="#94a3b8" />
          <path d="M30 -26 Q 48 -30 52 -44" stroke="#94a3b8" strokeWidth="6" fill="none" />
          <path d="M-26 -6 H 26" stroke="#f8fafc" strokeWidth="5" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${-10 + i * 10} -50 q 6 -10 0 -20`} stroke="#fff" strokeWidth="3" fill="none" className="k-float" style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </g>
      </Reveal>

      <Person x={240} y={300} shirt="#0ea5e9" scarf="#f8fafc" wave={step === 0 || step >= 6} s={1.4} />
      <Bubble x={160} y={118} text={say} w={270} />
      <Party key={celebrate} n={celebrate} x={380} y={170} />
    </SceneSvg>
  );
}
