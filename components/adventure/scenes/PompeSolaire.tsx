import { Baobab, Bubble, Cloud, Ground, Party, Person, Reveal, SceneSvg, Sky, Sun, type SceneProps } from './kit';

/** Le jardin des femmes de Ségou : la pompe solaire se monte, mission après mission. */
export function PompeSolaireScene({ step, say, celebrate }: SceneProps) {
  const pumping = step >= 6;
  return (
    <SceneSvg label="Le jardin et la pompe solaire">
      <Sky id="pompe" />
      <Reveal on={step < 5}>
        <Sun />
      </Reveal>
      {/* Mission 5 : le soleil traverse le ciel, l’énergie de la journée s’accumule. */}
      <Reveal on={step >= 5}>
        <path d="M140 210 Q 420 -40 700 210" fill="none" stroke="#f59e0b" strokeDasharray="6 8" opacity="0.5" />
        <g>
          <circle r="22" fill="#facc15">
            <animateMotion dur="9s" repeatCount="indefinite" path="M140 210 Q 420 -40 700 210" />
          </circle>
        </g>
      </Reveal>
      <Cloud x={200} y={60} />
      <Cloud x={470} y={40} s={0.7} />
      <Ground y={240} />
      <Baobab x={60} y={250} s={0.9} />

      {/* Le jardin : des planches de légumes qui grandissent quand l’eau arrive. */}
      {[0, 1, 2, 3].map((r) => (
        <g key={r} transform={`translate(${430 + r * 82} 282)`}>
          <rect x="-34" y="-8" width="68" height="16" rx="5" fill="#8b5a3c" />
          {[-22, -7, 8, 23].map((dx) => (
            <g key={dx} transform={`translate(${dx} -8)`}>
              <g style={{ transform: `scale(${pumping ? 1.15 : 0.55})`, transition: 'transform 1.2s' }}>
                <g className="k-sway">
                  <path d="M0 0 Q -8 -12 -2 -22 Q 2 -12 0 0 Z M0 0 Q 8 -10 4 -20 Q 0 -10 0 0 Z" fill="#4d9a2f" />
                </g>
              </g>
            </g>
          ))}
        </g>
      ))}

      {/* Le puits et la pompe. */}
      <g transform="translate(250 250)">
        <ellipse cx="0" cy="0" rx="34" ry="10" fill="#57534e" />
        <rect x="-34" y="-30" width="68" height="30" fill="#a8a29e" />
        <ellipse cx="0" cy="-30" rx="34" ry="10" fill="#d6d3d1" />
        <rect x="-10" y="-62" width="20" height="32" rx="4" fill="#2563eb" />
        <circle cx="0" cy="-48" r="7" fill="#93c5fd" className={pumping ? 'k-spin' : undefined} />
      </g>

      {/* Mission 1 : l’interrupteur et son voyant. */}
      <Reveal on={step >= 1}>
        <g transform="translate(300 200)">
          <rect x="-12" y="-18" width="24" height="30" rx="4" fill="#f1f5f9" stroke="#334155" strokeWidth="2" />
          <rect x="-4" y="-12" width="8" height="12" rx="2" fill="#334155" />
          <circle cx="0" cy="6" r="3.5" fill="#22c55e" className="k-blink" />
        </g>
      </Reveal>

      {/* Missions 2 et 3 : un panneau, puis le champ de panneaux. */}
      {[0, 1, 2].map((k) => (
        <Reveal key={k} on={step >= (k === 0 ? 2 : 3)}>
          <g transform={`translate(${100 + k * 62} 196) skewX(-12)`}>
            <rect x="-26" y="-34" width="52" height="34" fill="#1e3a8a" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M-26 -17 H 26 M-9 -34 V 0 M9 -34 V 0" stroke="#60a5fa" strokeWidth="1" />
            <rect x="-2" y="0" width="4" height="28" fill="#64748b" />
          </g>
        </Reveal>
      ))}

      {/* Mission 4 : le long câble, parcouru par le courant. */}
      <Reveal on={step >= 4}>
        <path d="M140 224 Q 200 246 250 214" fill="none" stroke="#111827" strokeWidth="4" />
        <path d="M140 224 Q 200 246 250 214" fill="none" stroke="#facc15" strokeWidth="3" className="k-flow" />
      </Reveal>

      {/* Mission 5 : la jauge d’énergie de la journée. */}
      <Reveal on={step >= 5}>
        <g transform="translate(40 30)">
          <rect width="90" height="24" rx="6" fill="#0f172a" opacity="0.8" />
          <rect x="4" y="4" width={step >= 6 ? 82 : 60} height="16" rx="4" fill="#22c55e" />
          <text x="45" y="17" fontSize="11" fontWeight="700" fill="#fff" textAnchor="middle">kWh</text>
        </g>
      </Reveal>

      {/* Mission 6 : l’eau monte au réservoir puis arrose le jardin. */}
      <g transform="translate(350 120)">
        <path d="M-20 120 L -14 40 M20 120 L 14 40" stroke="#78716c" strokeWidth="5" />
        <rect x="-26" y="0" width="52" height="42" rx="6" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
        <rect x="-22" y={pumping ? 6 : 34} width="44" height={pumping ? 32 : 4} rx="3" fill="#38bdf8" style={{ transition: 'all 2s' }} />
      </g>
      <Reveal on={pumping}>
        <path d="M250 190 Q 300 110 330 130" fill="none" stroke="#38bdf8" strokeWidth="6" />
        <path d="M250 190 Q 300 110 330 130" fill="none" stroke="#e0f2fe" strokeWidth="3" className="k-flow" />
        <path d="M376 150 Q 420 160 430 250" fill="none" stroke="#38bdf8" strokeWidth="5" />
        <path d="M376 150 Q 420 160 430 250" fill="none" stroke="#e0f2fe" strokeWidth="2.5" className="k-flow" />
        {[460, 540, 620, 700].map((x, i) => (
          <circle key={x} cx={x} cy="246" r="4" fill="#38bdf8" className="k-drop" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </Reveal>

      <Person x={186} y={304} shirt="#16a34a" scarf="#f59e0b" wave={step === 0 || pumping} s={1.4} />
      <Bubble x={168} y={118} text={say} w={310} />
      <Party key={celebrate} n={celebrate} x={400} y={150} />
    </SceneSvg>
  );
}
