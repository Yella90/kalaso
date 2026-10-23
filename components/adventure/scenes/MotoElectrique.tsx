import { Bubble, Party, Person, Reveal, SceneSvg, Sky, type SceneProps } from './kit';

function Wheel({ x, y, spin }: { x: number; y: number; spin: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="30" fill="#111827" />
      <circle r="20" fill="#9ca3af" />
      <g className={spin ? 'k-spin' : undefined}>
        <path d="M-20 0 H 20 M0 -20 V 20 M-14 -14 L 14 14 M-14 14 L 14 -14" stroke="#4b5563" strokeWidth="3" />
      </g>
      <circle r="5" fill="#374151" />
    </g>
  );
}

/** L’atelier de Moussa : la moto électrique s’assemble, puis part dans la rue. */
export function MotoElectriqueScene({ step, total, say, celebrate }: SceneProps) {
  const done = step >= total;
  const moto = (
    <g>
      {/* Mission 1 : le plan (cadre en pointillés), puis le vrai cadre. */}
      <path d="M-70 -20 L -20 -70 L 40 -70 L 70 -20 Z" fill="none" stroke={step >= 3 ? '#0f172a' : '#2563eb'} strokeWidth={step >= 3 ? 7 : 3} strokeDasharray={step >= 3 ? undefined : '8 6'} strokeLinejoin="round" />
      {/* Mission 4 : roues et transmission. */}
      <Reveal on={step >= 4}>
        <Wheel x={-80} y={0} spin={done} />
        <Wheel x={80} y={0} spin={done} />
        <path d="M-80 0 L -10 -20 L 80 0" stroke="#78716c" strokeWidth="3" fill="none" className={done ? 'k-flow' : undefined} />
        <path d="M70 -20 L 80 0 M70 -20 L 54 -88 L 30 -94" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" fill="none" />
      </Reveal>
      {/* Mission 3 : le moteur et son rotor. */}
      <Reveal on={step >= 3}>
        <g transform="translate(-10 -22)">
          <circle r="18" fill="#64748b" />
          <g className="k-spin">
            <path d="M-12 0 H 12 M0 -12 V 12" stroke="#facc15" strokeWidth="4" />
          </g>
        </g>
      </Reveal>
      {/* Missions 5 et 6 : la batterie et les ions qui la traversent. */}
      <Reveal on={step >= 5}>
        <g transform="translate(0 -60)">
          <rect x="-30" y="-14" width="60" height="28" rx="5" fill="#16a34a" stroke="#0f172a" strokeWidth="2" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={-24 + i * 13} y="-8" width="9" height="16" rx="2" fill="#bbf7d0" className={step >= 6 ? 'k-blink' : undefined} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </g>
      </Reveal>
      {/* Selle. */}
      <path d="M-30 -80 Q 0 -92 30 -80" stroke="#1f2937" strokeWidth="9" strokeLinecap="round" fill="none" opacity={step >= 3 ? 1 : 0} />
      {/* Mission 7 : phare et feu stop. */}
      <Reveal on={step >= 7}>
        <circle cx="34" cy="-94" r="7" fill="#fde047" className="k-blink" />
        <path d="M40 -94 L 110 -110 L 110 -78 Z" fill="#fde047" opacity="0.3" />
        <rect x="-78" y="-34" width="10" height="8" rx="2" fill="#ef4444" />
      </Reveal>
    </g>
  );
  return (
    <SceneSvg label="L’atelier de Moussa">
      <Sky id="moto" />
      {/* L’atelier et la rue de Médina Coura. */}
      <rect x="0" y="40" width="430" height="220" fill="#fef3c7" />
      <rect x="0" y="40" width="430" height="20" fill="#b45309" />
      <text x="215" y="55" fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle">ATELIER MOUSSA</text>
      <g transform="translate(30 90)">
        <rect width="120" height="70" rx="6" fill="#1e3a8a" />
        <path d="M0 35 H 120 M40 0 V 70 M80 0 V 70" stroke="#60a5fa" />
      </g>
      {/* Mission 2 : la jauge de puissance. */}
      <Reveal on={step >= 2}>
        <g transform="translate(330 120)">
          <path d="M-40 0 A 40 40 0 0 1 40 0" fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <path d="M-40 0 A 40 40 0 0 1 28 -28" fill="none" stroke="#f97316" strokeWidth="10" />
          <text x="0" y="-6" fontSize="13" fontWeight="700" textAnchor="middle" fill="#0f172a">kW</text>
        </g>
      </Reveal>
      <rect x="0" y="260" width="800" height="60" fill="#57534e" />
      <path d="M0 290 H 800" stroke="#fef08a" strokeWidth="4" strokeDasharray="30 24" />

      {done ? (
        <g className="k-drive">
          <g transform="translate(0 258)">{moto}</g>
        </g>
      ) : (
        <g transform="translate(560 258)">{moto}</g>
      )}

      <Person x={250} y={290} shirt="#2563eb" wave={step === 0 || done} s={1.4} />
      <Bubble x={262} y={206} text={say} w={290} />
      <Party key={celebrate} n={celebrate} x={560} y={170} />
    </SceneSvg>
  );
}
