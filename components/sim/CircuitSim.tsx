'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from './Slider';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type T = Dictionary['sims']['circuit'];
type Mode = 'seule' | 'serie' | 'derivation';
type Kind = 'lampe' | 'resistance';
type Pt = [number, number];

// Lampe de 6 V – 0,5 A : on la modélise par une résistance de 12 Ω qui brille selon sa puissance.
const R_LAMP = 12;
const P_NOM = 3;
const P_BURN = 2.2 * P_NOM;
const R_GEN_SHORT = 0.3;

interface Dipole {
  u: number;
  i: number;
  p: number;
}

interface Solution {
  i: number;
  req: number;
  d: [Dipole, Dipole];
  short: boolean;
  ishunt: number;
}

const ZERO: Dipole = { u: 0, i: 0, p: 0 };

/** Résout le circuit : générateur idéal (sauf en court-circuit), interrupteur, une ou deux dipôles. */
function solve(mode: Mode, u: number, r: [number, number], closed: boolean, out: [boolean, boolean], shunt: boolean): Solution {
  const none: Solution = { i: 0, req: Infinity, d: [ZERO, ZERO], short: false, ishunt: 0 };
  if (!closed) return none;
  if (mode === 'seule') {
    if (out[0]) return none;
    const i = u / r[0];
    return { i, req: r[0], d: [{ u, i, p: u * i }, ZERO], short: false, ishunt: 0 };
  }
  if (mode === 'serie') {
    // Le fil de court-circuit contourne L2 (qu’elle soit vissée ou non).
    if (out[0] || (out[1] && !shunt)) return none;
    const r2 = shunt ? 0 : r[1];
    const req = r[0] + r2;
    const i = u / req;
    return {
      i,
      req,
      d: [{ u: i * r[0], i, p: i * i * r[0] }, shunt ? ZERO : { u: i * r2, i, p: i * i * r2 }],
      short: false,
      ishunt: shunt ? i : 0,
    };
  }
  // Dérivation : un fil sur L2 met le générateur en court-circuit.
  if (shunt) {
    const i = u / R_GEN_SHORT;
    return { i, req: 0, d: [ZERO, ZERO], short: true, ishunt: i };
  }
  const i1 = out[0] ? 0 : u / r[0];
  const i2 = out[1] ? 0 : u / r[1];
  const i = i1 + i2;
  return {
    i,
    req: i > 0 ? u / i : Infinity,
    d: [out[0] ? ZERO : { u, i: i1, p: u * i1 }, out[1] ? ZERO : { u, i: i2, p: u * i2 }],
    short: false,
    ishunt: 0,
  };
}

function polyLength(pts: Pt[]) {
  let l = 0;
  for (let k = 1; k < pts.length; k++) l += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
  return l;
}

const toD = (pts: Pt[]) => pts.map((p, k) => `${k ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');

/** Charges qui avancent le long d’un fil, d’autant plus vite que l’intensité est grande. */
function Flow({ id, pts, i }: { id: string; pts: Pt[]; i: number }) {
  if (i < 0.005) return null;
  const len = polyLength(pts);
  const speed = Math.min(220, 18 + 70 * i);
  const dur = len / speed;
  const n = Math.max(2, Math.round(len / 26));
  const d = toD(pts);
  return (
    <g>
      <path id={id} d={d} fill="none" stroke="none" />
      {Array.from({ length: n }, (_, k) => (
        <circle key={`${k}-${dur.toFixed(2)}`} r="3.5" fill="#fde047">
          <animateMotion dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`-${((k * dur) / n).toFixed(2)}s`}>
            <mpath href={`#${id}`} />
          </animateMotion>
        </circle>
      ))}
    </g>
  );
}

function Lamp({ x, y, p, out, burnt, label, onClick, t }: { x: number; y: number; p: number; out: boolean; burnt: boolean; label: string; onClick: () => void; t: T }) {
  const b = burnt || out ? 0 : Math.min(1.25, Math.pow(p / P_NOM, 0.7));
  const lift = out ? -30 : 0;
  return (
    <g role="button" tabIndex={0} aria-label={`${label} : ${out ? t.unscrewed : burnt ? t.burnt : t.clickLamp}`} onClick={onClick} onKeyDown={(e) => e.key === 'Enter' && onClick()} style={{ cursor: 'pointer' }}>
      <circle cx={x} cy={y} r="44" fill="url(#halo)" opacity={b * 0.95} />
      {/* Lampe dévissée : le circuit est ouvert à cet endroit. */}
      {out && <rect x={x - 16} y={y - 5} width="32" height="10" fill="#0b1020" />}
      <g transform={`translate(${x} ${y + lift})`} opacity={out ? 0.75 : 1}>
        <circle r="17" fill={burnt ? '#334155' : `rgb(${Math.round(226 + 29 * Math.min(1, b))}, ${Math.round(232 + 3 * b)}, ${Math.round(240 - 200 * Math.min(1, b))})`} stroke="#e2e8f0" strokeWidth="2.5" />
        <path d="M-12 -12 L 12 12 M12 -12 L -12 12" stroke={burnt ? '#64748b' : b > 0.05 ? '#f97316' : '#94a3b8'} strokeWidth="2.5" />
        {burnt && <path d="M-6 -24 q 4 -8 0 -14 M6 -24 q -4 -8 0 -14" stroke="#94a3b8" strokeWidth="2" fill="none" />}
      </g>
      <text x={x} y={y + 36} textAnchor="middle" fontSize="13" fontWeight="700" fill="#e2e8f0">
        {label}
      </text>
      {(out || burnt) && (
        <text x={x} y={y - 50} textAnchor="middle" fontSize="11" fill={burnt ? '#fca5a5' : '#cbd5e1'}>
          {burnt ? t.burnt : t.unscrewed}
        </text>
      )}
    </g>
  );
}

function Resistor({ x, y, p, label }: { x: number; y: number; p: number; label: string }) {
  const heat = Math.min(1, p / 12);
  return (
    <g>
      <rect x={x - 24} y={y - 9} width="48" height="18" rx="3" fill={`rgb(${Math.round(232 + 23 * heat)}, ${Math.round(121 - 60 * heat)}, ${Math.round(58 - 40 * heat)})`} stroke="#e2e8f0" strokeWidth="1.5" />
      <text x={x} y={y + 30} textAnchor="middle" fontSize="13" fontWeight="700" fill="#e2e8f0">
        {label}
      </text>
    </g>
  );
}

function Meter({ x, y, letter, value }: { x: number; y: number; letter: 'A' | 'V'; value: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="15" fill="#0f172a" stroke={letter === 'A' ? '#fde047' : '#7dd3fc'} strokeWidth="2.5" />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={letter === 'A' ? '#fde047' : '#7dd3fc'}>
        {letter}
      </text>
      <rect x={x - 38} y={y + 18} width="76" height="20" rx="5" fill="#0f172a" opacity="0.9" />
      <text x={x} y={y + 32} textAnchor="middle" fontSize="12" fontWeight="700" fill={letter === 'A' ? '#fde047' : '#7dd3fc'} className="tabular-nums">
        {value}
      </text>
    </g>
  );
}

interface Setup {
  mode: Mode;
  u: number;
  out: [boolean, boolean];
  shunt: boolean;
}

const CHALLENGES: { setup: Setup; answer: number }[] = [
  { setup: { mode: 'serie', u: 12, out: [true, false], shunt: false }, answer: 0 },
  { setup: { mode: 'derivation', u: 6, out: [true, false], shunt: false }, answer: 1 },
  { setup: { mode: 'serie', u: 12, out: [false, false], shunt: true }, answer: 2 },
  { setup: { mode: 'serie', u: 6, out: [false, false], shunt: false }, answer: 0 },
  { setup: { mode: 'derivation', u: 6, out: [false, false], shunt: false }, answer: 2 },
  { setup: { mode: 'seule', u: 18, out: [false, false], shunt: false }, answer: 1 },
];

export function CircuitSim({ t }: { t: T }) {
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode>('serie');
  const [kind, setKind] = useState<Kind>('lampe');
  const [u, setU] = useState(6);
  const [r1, setR1] = useState(20);
  const [r2, setR2] = useState(30);
  const [closed, setClosed] = useState(true);
  const [out, setOut] = useState<[boolean, boolean]>([false, false]);
  const [shunt, setShunt] = useState(false);
  const [burnt, setBurnt] = useState<[boolean, boolean]>([false, false]);
  const [voltmeters, setVoltmeters] = useState(true);

  const r: [number, number] = kind === 'lampe' ? [R_LAMP, R_LAMP] : [r1, r2];
  const missing: [boolean, boolean] = [out[0] || (kind === 'lampe' && burnt[0]), out[1] || (kind === 'lampe' && burnt[1])];
  const s = solve(mode, u, r, closed, missing, shunt && mode !== 'seule');
  // Ce que lit un voltmètre : aux bornes d’une lampe dévissée ou grillée (circuit ouvert à cet endroit),
  // on retrouve la tension du générateur ; en dérivation, chaque branche est sous la tension du générateur.
  const vm: [number, number] = [0, 1].map((k) => {
    if (!closed || s.short) return s.d[k].u;
    if (mode === 'derivation') return u;
    if (missing[k] && !(k === 1 && shunt && mode === 'serie') && !missing[1 - k]) return u;
    return s.d[k].u;
  }) as [number, number];

  // Une lampe trop alimentée grille, et reste grillée jusqu’à ce qu’on la change.
  const burnNow: [boolean, boolean] = [kind === 'lampe' && s.d[0].p > P_BURN, kind === 'lampe' && s.d[1].p > P_BURN];
  useEffect(() => {
    if (burnNow[0] || burnNow[1]) setBurnt((b) => [b[0] || burnNow[0], b[1] || burnNow[1]]);
  }, [burnNow[0], burnNow[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  function clickDipole(k: 0 | 1) {
    if (kind === 'lampe' && burnt[k]) {
      setBurnt((b) => (k === 0 ? [false, b[1]] : [b[0], false]));
      return;
    }
    setOut((o) => (k === 0 ? [!o[0], o[1]] : [o[0], !o[1]]));
  }

  function choose(m: Mode) {
    setMode(m);
    setOut([false, false]);
    setShunt(false);
  }

  // Positions des dipôles et chemins du courant (sens conventionnel : de la borne + vers la borne −).
  const L: Record<Mode, Pt[]> = { seule: [[260, 60], [0, 0]], serie: [[200, 60], [340, 60]], derivation: [[280, 60], [280, 170]] };
  const pos = L[mode];
  const segs: { id: string; pts: Pt[]; i: number }[] = [];
  if (mode === 'derivation') {
    segs.push({ id: 'm', pts: [[390, 60], [470, 60], [470, 280], [50, 280], [50, 60], [170, 60]], i: s.i });
    if (s.short) segs.push({ id: 'b2', pts: [[170, 60], [170, 130], [390, 130], [390, 60]], i: s.ishunt });
    else {
      segs.push({ id: 'b1', pts: [[170, 60], [390, 60]], i: s.d[0].i });
      segs.push({ id: 'b2', pts: [[170, 60], [170, 170], [390, 170], [390, 60]], i: s.d[1].i });
    }
  } else if (mode === 'serie' && shunt) {
    segs.push({ id: 'a', pts: [[50, 280], [50, 60], [310, 60]], i: s.i });
    segs.push({ id: 'sh', pts: [[310, 60], [310, 28], [370, 28], [370, 60]], i: s.ishunt });
    segs.push({ id: 'b', pts: [[370, 60], [470, 60], [470, 280], [50, 280]], i: s.i });
  } else {
    segs.push({ id: 'loop', pts: [[50, 280], [50, 60], [470, 60], [470, 280], [50, 280]], i: s.i });
  }

  const label = (k: 0 | 1) => (kind === 'lampe' ? `L${k + 1}` : `R${k ? '₂' : '₁'}`);
  const energy = u * s.i; // W, donc Wh en une heure

  // Défis.
  const [ci, setCi] = useState<number | null>(null);
  const [picked, setPicked] = useState<number | null>(null);
  function setup(k: number) {
    const c = CHALLENGES[k].setup;
    setKind('lampe');
    setMode(c.mode);
    setU(c.u);
    setOut(c.out);
    setShunt(c.shunt);
    setClosed(true);
    setBurnt([false, false]);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {(['seule', 'serie', 'derivation'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => choose(m)}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${mode === m ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.modes[m]}
          </button>
        ))}
        <span className="mx-1 h-6 w-px bg-line" aria-hidden="true" />
        {(['lampe', 'resistance'] as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => {
              setKind(k);
              setBurnt([false, false]);
            }}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${kind === k ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.kinds[k]}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="flex flex-col gap-3">
          <div className="rounded-2xl bg-[#0b1020] p-2">
            <svg viewBox="0 0 520 330" className="h-auto w-full select-none" role="img" aria-label={t.title}>
              <defs>
                <radialGradient id="halo">
                  <stop offset="0%" stopColor="#fde047" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
                </radialGradient>
              </defs>
              {/* Fils. */}
              <g stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinejoin="round">
                <path d="M50 60 H 470 V 280 H 210" />
                <path d="M120 280 H 50 V 60" />
                {mode === 'derivation' && <path d="M170 60 V 170 H 390 V 60" />}
                {mode !== 'seule' && shunt && (mode === 'serie' ? <path d="M310 60 V 28 H 370 V 60" stroke="#f87171" /> : <path d="M170 60 V 130 H 390 V 60" stroke="#f87171" />)}
              </g>
              {/* Interrupteur K : on clique pour l’ouvrir ou le fermer. */}
              <g role="button" tabIndex={0} aria-label={closed ? t.switchOpen : t.switchClose} onClick={() => setClosed((c) => !c)} onKeyDown={(e) => e.key === 'Enter' && setClosed((c) => !c)} style={{ cursor: 'pointer' }}>
                <rect x="112" y="250" width="106" height="52" fill="transparent" />
                <circle cx="124" cy="280" r="5" fill="#e2e8f0" />
                <circle cx="206" cy="280" r="5" fill="#e2e8f0" />
                <line x1="124" y1="280" x2={closed ? 206 : 196} y2={closed ? 280 : 246} stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
                <text x="165" y="312" textAnchor="middle" fontSize="12" fill="#cbd5e1">
                  K ({closed ? t.closed : t.open})
                </text>
              </g>
              {/* Générateur : borne + en haut. */}
              <g>
                <rect x="30" y="140" width="40" height="60" fill="#0b1020" />
                <line x1="30" y1="158" x2="70" y2="158" stroke="#e2e8f0" strokeWidth="4" />
                <line x1="40" y1="176" x2="60" y2="176" stroke="#e2e8f0" strokeWidth="7" />
                <text x="80" y="150" fontSize="13" fill="#fca5a5" fontWeight="700">+</text>
                <text x="80" y="190" fontSize="13" fill="#93c5fd" fontWeight="700">−</text>
                <text x="80" y="172" fontSize="15" fill="#e2e8f0" fontWeight="700">{fmt(u, 1)} V</text>
              </g>
              {!reduced && segs.map((g) => <Flow key={g.id} {...g} />)}
              {/* Dipôles. */}
              {([0, 1] as const).map((k) =>
                k === 1 && mode === 'seule' ? null : kind === 'lampe' ? (
                  <Lamp key={k} x={pos[k][0]} y={pos[k][1]} p={s.d[k].p} out={out[k]} burnt={burnt[k]} label={label(k)} onClick={() => clickDipole(k)} t={t} />
                ) : (
                  <g key={k} onClick={() => clickDipole(k)} style={{ cursor: 'pointer' }}>
                    <Resistor x={pos[k][0]} y={pos[k][1] + (out[k] ? -26 : 0)} p={s.d[k].p} label={label(k)} />
                  </g>
                ),
              )}
              {/* Ampèremètre du circuit principal et voltmètres. */}
              <Meter x={330} y={280} letter="A" value={s.short ? '!!' : `${fmt(s.i, 2)} A`} />
              {voltmeters &&
                ([0, 1] as const).map((k) =>
                  k === 1 && mode === 'seule' ? null : (
                    <g key={k}>
                      {(() => {
                        const mx = mode === 'derivation' ? 228 : pos[k][0];
                        const my = mode === 'derivation' ? (k ? 228 : 106) : 146;
                        const [x, y] = pos[k];
                        // Le voltmètre se branche aux deux bornes du dipôle.
                        return (
                          <>
                            <path d={`M${x - 22} ${y} Q ${mx - 30} ${(y + my) / 2} ${mx - 12} ${my - 9} M${x + 22} ${y} Q ${mx + 30} ${(y + my) / 2} ${mx + 12} ${my - 9}`} stroke="#7dd3fc" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
                            <Meter x={mx} y={my} letter="V" value={`${fmt(vm[k], 2)} V`} />
                          </>
                        );
                      })()}
                    </g>
                  ),
                )}
              {s.short && (
                <g>
                  <rect x="140" y="196" width="240" height="30" rx="8" fill="#7f1d1d" />
                  <text x="260" y="216" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fecaca">
                    {t.shortWarning}
                  </text>
                </g>
              )}
            </svg>
          </div>
          <p className="text-sm text-muted">{t.help}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {mode !== 'seule' && (
              <label className="flex items-center gap-1.5 text-sm">
                <input type="checkbox" checked={shunt} onChange={(e) => setShunt(e.target.checked)} className="h-4 w-4" />
                {kind === 'lampe' ? t.shuntL2 : t.shuntR2}
              </label>
            )}
            <label className="flex items-center gap-1.5 text-sm">
              <input type="checkbox" checked={voltmeters} onChange={(e) => setVoltmeters(e.target.checked)} className="h-4 w-4" />
              {t.voltmeters}
            </label>
          </div>
          <Slider label={t.voltage} value={u} min={0} max={24} step={0.5} unit="V" onChange={setU} />
          {kind === 'resistance' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <Slider label="R₁" value={r1} min={1} max={100} step={1} unit="Ω" onChange={setR1} />
              {mode !== 'seule' && <Slider label="R₂" value={r2} min={1} max={100} step={1} unit="Ω" onChange={setR2} />}
            </div>
          )}
          {kind === 'lampe' && <p className="text-sm text-muted">{t.lampSpec}</p>}
        </div>

        <div className="flex flex-col gap-3">
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={t.current} value={s.short ? '> 20' : fmt(s.i, 2)} unit="A" strong />
            <Readout label={t.equivalent} value={Number.isFinite(s.req) ? fmt(s.req, 1) : '∞'} unit="Ω" />
            {([0, 1] as const).map((k) =>
              k === 1 && mode === 'seule' ? null : (
                <div key={k} className="col-span-2 rounded-xl bg-paper px-3 py-2 text-sm">
                  <span className="font-bold">{label(k)}</span> : U = {fmt(s.d[k].u, 2)} V · I = {fmt(s.d[k].i, 2)} A · P = {fmt(s.d[k].p, 2)} W
                </div>
              ),
            )}
            <Readout label={t.power} value={fmt(s.short ? 0 : energy, 1)} unit="W" />
            <Readout label={t.energyHour} value={fmt(s.short ? 0 : energy, 1)} unit="Wh" />
          </dl>
          <p className="text-sm text-muted">{t.formulas[mode]}</p>

          <section className="rounded-2xl bg-ink p-4 text-on-ink">
            <p className="text-sm font-bold text-on-ink-muted">{t.challenge}</p>
            {ci === null ? (
              <button type="button" onClick={() => { setCi(0); setPicked(null); }} className="mt-2 rounded-full bg-amber-300 px-4 py-2 font-bold text-slate-950">
                {t.challengeStart}
              </button>
            ) : ci >= CHALLENGES.length ? (
              <>
                <p className="mt-1 font-bold">{t.challengeDone}</p>
                <button type="button" onClick={() => { setCi(0); setPicked(null); }} className="mt-2 underline">
                  {t.challengeAgain}
                </button>
              </>
            ) : (
              <>
                <p className="mt-1">{t.challenges[ci].q}</p>
                <div className="mt-2 grid gap-1.5">
                  {t.challenges[ci].choices.map((c, j) => (
                    <button
                      key={c}
                      type="button"
                      disabled={picked !== null}
                      onClick={() => {
                        setPicked(j);
                        setup(ci);
                      }}
                      className={`rounded-lg border-2 px-3 py-1.5 text-left text-sm ${
                        picked === null
                          ? 'border-on-ink-muted hover:border-amber-300'
                          : j === CHALLENGES[ci].answer
                            ? 'border-emerald-300 bg-emerald-300/20'
                            : picked === j
                              ? 'border-amber-200 bg-amber-200/10'
                              : 'border-transparent opacity-60'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                {picked !== null && (
                  <>
                    <p className={`mt-2 font-bold ${picked === CHALLENGES[ci].answer ? 'text-emerald-300' : 'text-amber-200'}`}>
                      {picked === CHALLENGES[ci].answer ? t.predictRight : t.predictWrong}
                    </p>
                    <p className="mt-1 text-sm text-on-ink-muted">{t.challenges[ci].why}</p>
                    <button type="button" onClick={() => { setCi(ci + 1); setPicked(null); }} className="mt-2 rounded-full bg-amber-300 px-4 py-1.5 text-sm font-bold text-slate-950">
                      {t.next}
                    </button>
                  </>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
