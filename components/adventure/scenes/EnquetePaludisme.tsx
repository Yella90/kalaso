import { Bubble, Cloud, Ground, Hut, Party, Person, Reveal, SceneSvg, Sky, Sun, type SceneProps } from './kit';

function Mosquito({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="k-buzz" style={{ animationDelay: `${delay}s` }}>
        <ellipse cx="0" cy="0" rx="9" ry="3" fill="#44403c" transform="rotate(-25)" />
        <ellipse cx="-2" cy="-6" rx="7" ry="3" fill="#e7e5e4" opacity="0.8" transform="rotate(-50)" className="k-blink" />
        <path d="M8 -4 l 9 -5 M-4 2 l -6 8 M0 3 l -1 9 M4 2 l 4 8" stroke="#44403c" strokeWidth="1.2" />
      </g>
    </g>
  );
}

/** Enquête à Mopti : moustiques, cas, parasites, anticorps, drépanocytose, vaccination. */
export function EnquetePaludismeScene({ step, say, celebrate }: SceneProps) {
  const protectedVillage = step >= 6;
  return (
    <SceneSvg label="Le village du delta et la campagne contre le paludisme">
      <Sky id="palu" />
      <Sun x={710} y={58} />
      <Cloud x={520} y={52} />
      <Ground y={226} color="#d6a36b" />
      {/* Le fleuve et la rizière : là où pondent les moustiques. */}
      <path d="M0 236 Q 200 222 420 240 T 800 236 V 262 Q 600 252 400 266 T 0 260 Z" fill="#4a90c2" />
      <path d="M40 248 h 60 M180 244 h 50 M480 252 h 70 M640 246 h 50" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" className="k-float" />
      <Hut x={560} y={226} />
      <Hut x={650} y={222} s={0.9} />
      <Hut x={740} y={228} s={1.05} />

      {/* Les moustiques : moins nombreux quand le village est protégé. */}
      <Mosquito x={520} y={150} />
      <Mosquito x={610} y={130} delay={0.6} />
      <Reveal on={!protectedVillage}>
        <Mosquito x={690} y={160} delay={1.2} />
        <Mosquito x={450} y={190} delay={0.3} />
      </Reveal>

      {/* Mission 2 : le registre des cas. */}
      <Reveal on={step >= 2}>
        <g transform="translate(40 50)">
          <rect width="120" height="80" rx="8" fill="#fff" stroke="#334155" />
          {[18, 30, 52, 64, 40, 22].map((h, i) => (
            <rect key={i} x={12 + i * 17} y={70 - h} width="12" height={h} rx="2" fill="#ef4444" />
          ))}
          <text x="60" y="14" fontSize="10" fontWeight="700" textAnchor="middle" fill="#334155">cas / mois</text>
        </g>
      </Reveal>
      {/* Mission 3 : la loupe sur le sang : globules rouges et parasites. */}
      <Reveal on={step >= 3}>
        <g transform="translate(230 110)">
          <circle r="58" fill="#fee2e2" stroke="#334155" strokeWidth="6" />
          <path d="M42 42 L 72 72" stroke="#334155" strokeWidth="10" strokeLinecap="round" />
          {[[-22, -18], [16, -26], [-6, 14], [26, 16]].map(([x, y], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <circle r="14" fill="#ef4444" />
              <circle r="6" fill="#dc2626" />
              {i % 2 === 0 && <circle cx="4" cy="-3" r="3.5" fill="#7c3aed" className="k-blink" />}
            </g>
          ))}
          {/* Mission 4 : les anticorps (en Y) attaquent les parasites. */}
          <Reveal on={step >= 4}>
            {[[-40, -4], [0, -44], [40, -8]].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y} v 10 M${x} ${y} l -6 -7 M${x} ${y} l 6 -7`} stroke="#2563eb" strokeWidth="3" strokeLinecap="round" className="k-bob" />
            ))}
          </Reveal>
        </g>
      </Reveal>
      {/* Mission 5 : un globule en faucille, la protection héritée. */}
      <Reveal on={step >= 5}>
        <g transform="translate(360 70)">
          <rect x="-40" y="-26" width="132" height="52" rx="10" fill="#fff" stroke="#334155" />
          <circle cx="-14" cy="0" r="14" fill="#ef4444" />
          <path d="M40 -12 Q 68 0 40 14 Q 54 0 40 -12 Z" fill="#ef4444" transform="translate(-4 0) scale(1.4) translate(-12 0)" />
          <text x="26" y="-12" fontSize="10" fontWeight="700" fill="#334155">AA</text>
          <text x="66" y="-12" fontSize="10" fontWeight="700" fill="#334155">AS</text>
        </g>
      </Reveal>
      {/* Mission 6 : la campagne : moustiquaire et vaccin. */}
      <Reveal on={protectedVillage}>
        <g transform="translate(440 226)">
          <path d="M-36 0 L -30 -56 L 30 -56 L 36 0 Z" fill="#e0f2fe" opacity="0.85" stroke="#60a5fa" />
          <path d="M-30 -56 L 0 -76 L 30 -56" fill="none" stroke="#60a5fa" />
          <path d="M-20 -6 q 20 -14 40 0" stroke="#7c4a2d" strokeWidth="8" strokeLinecap="round" fill="none" />
        </g>
        <g transform="translate(150 230) rotate(-30)">
          <rect x="-20" y="-4" width="40" height="8" rx="2" fill="#e2e8f0" stroke="#334155" />
          <rect x="20" y="-1.5" width="14" height="3" fill="#94a3b8" />
          <rect x="-28" y="-6" width="8" height="12" fill="#334155" />
        </g>
      </Reveal>

      <Person x={100} y={300} shirt="#f8fafc" skin="#6b4226" wave={step === 0 || protectedVillage} s={1.4} />
      <Bubble x={128} y={304} text={say} w={340} />
      <Party key={celebrate} n={celebrate} x={400} y={160} />
    </SceneSvg>
  );
}
