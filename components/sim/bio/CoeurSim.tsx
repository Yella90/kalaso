'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { format, type Dictionary } from '@/lib/i18n';
import { Slider } from '../Slider';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

type T = Dictionary['sims']['coeur'];
type Phase = 'auriculaire' | 'isoContraction' | 'ejection' | 'isoRelaxation' | 'remplissage';

// Découpage d’un cycle (fractions de la période), pour un cœur au repos.
const PHASES: { id: Phase; end: number }[] = [
  { id: 'auriculaire', end: 0.12 },
  { id: 'isoContraction', end: 0.17 },
  { id: 'ejection', end: 0.45 },
  { id: 'isoRelaxation', end: 0.52 },
  { id: 'remplissage', end: 1 },
];

function phaseOf(f: number): Phase {
  return PHASES.find((p) => f < p.end)!.id;
}

function smooth(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const gauss = (x: number, mu: number, s: number) => Math.exp(-((x - mu) ** 2) / (2 * s * s));

/** Pressions (mmHg) dans le ventricule gauche, l’aorte et l’oreillette gauche. */
function pressures(f: number) {
  let vg: number;
  if (f < 0.12) vg = 6 + 6 * (f / 0.12);
  else if (f < 0.17) vg = 12 + 68 * smooth(0.12, 0.17, f);
  else if (f < 0.45) vg = 80 + 40 * Math.sin((Math.PI * (f - 0.17)) / 0.32);
  else if (f < 0.52) vg = 95 - 89 * smooth(0.45, 0.52, f);
  else vg = 4 + 2 * smooth(0.52, 1, f);
  const decay = (x: number) => 80 + 18 * Math.exp(-(x - 0.47) / 0.35);
  let ao: number;
  if (f < 0.17) ao = decay(f + 1);
  else if (f < 0.45) ao = Math.max(vg - 2, decay(1.17));
  else if (f < 0.47) {
    // Incisure : la valvule aortique se ferme, la pression marque un petit creux.
    const u = (f - 0.45) / 0.02;
    ao = 93 + 5 * u - 5 * Math.sin(Math.PI * u);
  }
  else ao = decay(f);
  const og = 7 + 4 * gauss(f, 0.06, 0.03) + 2 * gauss(f, 0.15, 0.015) + 5 * gauss(f, 0.5, 0.05);
  return { vg, ao, og };
}

function ecg(f: number) {
  return 0.15 * gauss(f, 0.05, 0.018) - 0.12 * gauss(f, 0.125, 0.005) + 1 * gauss(f, 0.14, 0.006) - 0.28 * gauss(f, 0.155, 0.006) + 0.3 * gauss(f, 0.37, 0.035);
}

/** Valvules ouvertes selon la phase. */
function valves(p: Phase) {
  return {
    av: p === 'auriculaire' || p === 'remplissage',
    sig: p === 'ejection',
  };
}

/* ---------------------------- Dessin du cœur ---------------------------- */

const BLUE = '#3a6fd6';
const RED = '#d64541';

function Scaled({ cx, cy, s, children }: { cx: number; cy: number; s: number; children: React.ReactNode }) {
  return <g transform={`translate(${cx} ${cy}) scale(${s.toFixed(3)}) translate(${-cx} ${-cy})`}>{children}</g>;
}

/** Valvule : deux feuillets qui pivotent autour de leurs attaches. */
function Valve({ x1, y1, x2, y2, open, dir }: { x1: number; y1: number; x2: number; y2: number; open: boolean; dir: 1 | -1 }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const a = open ? 70 : 8;
  const len1 = Math.hypot(mx - x1, my - y1) * 0.95;
  const base = (Math.atan2(my - y1, mx - x1) * 180) / Math.PI;
  return (
    <g stroke="#f8fafc" strokeWidth="4" strokeLinecap="round">
      <line x1={x1} y1={y1} x2={x1 + len1} y2={y1} transform={`rotate(${base + dir * a} ${x1} ${y1})`} />
      <line x1={x2} y1={y2} x2={x2 - len1} y2={y2} transform={`rotate(${base - dir * a} ${x2} ${y2})`} />
    </g>
  );
}

function Flow({ d, color, active, t }: { d: string; color: string; active: boolean; t: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="2 12"
      strokeDashoffset={(-t * 60) % 14}
      opacity={active ? 0.95 : 0.12}
    />
  );
}

function Heart({ f, t, labels }: { f: number; t: number; labels: T['parts'] }) {
  const p = phaseOf(f);
  const v = valves(p);
  const atria = p === 'auriculaire' ? 1 - 0.12 * Math.sin((Math.PI * f) / 0.12) : 1;
  const squeeze = p === 'ejection' ? Math.sin((Math.PI * (f - 0.17)) / 0.32) : 0;
  const vent = 1 - 0.2 * squeeze;
  const filling = p === 'remplissage' || p === 'auriculaire';
  return (
    <svg viewBox="0 0 420 440" className="h-auto w-full" role="img" aria-label={labels.title}>
      <defs>
        <linearGradient id="muscle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0b2a8" />
          <stop offset="100%" stopColor="#d7766c" />
        </linearGradient>
      </defs>
      {/* Gros vaisseaux, en arrière du muscle. */}
      <path d="M110 8 V 150" stroke={BLUE} strokeWidth="28" strokeLinecap="round" fill="none" />
      <path d="M58 436 Q 70 300 100 200" stroke={BLUE} strokeWidth="28" strokeLinecap="round" fill="none" />
      <path d="M200 200 V 62 Q 200 46 184 46 H 40" stroke={BLUE} strokeWidth="24" fill="none" strokeLinecap="round" />
      <path d="M200 62 Q 200 46 216 46 H 228" stroke={BLUE} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M233 200 V 64 Q 233 20 282 20 Q 336 20 336 66 V 112" stroke={RED} strokeWidth="26" fill="none" strokeLinecap="round" />
      <path d="M414 142 H 330" stroke={RED} strokeWidth="18" strokeLinecap="round" />
      <path d="M414 182 H 330" stroke={RED} strokeWidth="18" strokeLinecap="round" />
      {/* Muscle cardiaque (myocarde). */}
      <Scaled cx={215} cy={290} s={1 - 0.035 * squeeze}>
        <path
          d="M66 172 Q 66 110 135 106 Q 196 104 214 126 Q 232 104 292 106 Q 362 110 360 176 Q 366 300 302 362 Q 258 408 226 412 Q 160 404 110 344 Q 68 292 66 222 Z"
          fill="url(#muscle)"
          stroke="#9b3b36"
          strokeWidth="3"
        />
      </Scaled>
      {/* Cavités : les oreillettes en haut, les ventricules en bas. */}
      <Scaled cx={132} cy={164} s={atria}>
        <rect x="82" y="122" width="102" height="84" rx="34" fill="#93b3ee" stroke="#1e3a8a" strokeWidth="2" />
      </Scaled>
      <Scaled cx={297} cy={164} s={atria}>
        <rect x="250" y="122" width="96" height="84" rx="34" fill="#f2a6a3" stroke="#7f1d1d" strokeWidth="2" />
      </Scaled>
      <Scaled cx={142} cy={280} s={vent}>
        <path d="M88 218 H 190 V 318 Q 190 360 162 364 Q 118 356 98 304 Q 86 268 88 218 Z" fill="#7d9ce6" stroke="#1e3a8a" strokeWidth="2" />
      </Scaled>
      <Scaled cx={282} cy={290} s={vent}>
        <path d="M232 218 H 334 Q 338 290 300 336 Q 270 370 240 376 Q 232 310 232 218 Z" fill="#e57f7b" stroke="#7f1d1d" strokeWidth="2" />
      </Scaled>
      {/* Valvules : auriculo-ventriculaires (entre oreillette et ventricule) et sigmoïdes (à la base des artères). */}
      <Valve x1={96} y1={212} x2={178} y2={212} open={v.av} dir={1} />
      <Valve x1={256} y1={212} x2={334} y2={212} open={v.av} dir={1} />
      <Valve x1={189} y1={118} x2={211} y2={118} open={v.sig} dir={-1} />
      <Valve x1={222} y1={118} x2={244} y2={118} open={v.sig} dir={-1} />
      {/* Circulation du sang. */}
      <Flow d="M110 10 V 160" color="#dbeafe" active={p !== 'auriculaire'} t={t} />
      <Flow d="M60 432 Q 72 300 104 190" color="#dbeafe" active={p !== 'auriculaire'} t={t} />
      <Flow d="M132 170 V 300" color="#dbeafe" active={filling} t={t} />
      <Flow d="M150 320 Q 196 260 200 200 V 62 Q 200 46 184 46 H 42" color="#dbeafe" active={p === 'ejection'} t={t} />
      <Flow d="M412 142 H 300" color="#fee2e2" active={p !== 'auriculaire'} t={t} />
      <Flow d="M412 182 H 320" color="#fee2e2" active={p !== 'auriculaire'} t={t} />
      <Flow d="M297 170 V 300" color="#fee2e2" active={filling} t={t} />
      <Flow d="M280 330 Q 236 270 233 200 V 64 Q 233 20 282 20 Q 336 20 336 66 V 108" color="#fee2e2" active={p === 'ejection'} t={t} />
      {/* Légendes. */}
      <g fontSize="13" fontWeight="700" fill="#0f172a" textAnchor="middle">
        <text x="132" y="196">{labels.od}</text>
        <text x="297" y="196">{labels.og}</text>
        <text x="140" y="345">{labels.vd}</text>
        <text x="272" y="350">{labels.vg}</text>
      </g>
      <g fontSize="11" fill="#475569">
        <text x="128" y="16">{labels.vcs}</text>
        <text x="72" y="430">{labels.vci}</text>
        <text x="40" y="30">{labels.ap}</text>
        <text x="290" y="54">{labels.ao}</text>
        <text x="414" y="128" textAnchor="end">{labels.vp}</text>
      </g>
    </svg>
  );
}

/* ------------------------------ Courbes ------------------------------ */

const GW = 320;
const GH = 150;

function Curves({ f, t }: { f: number; t: T }) {
  const paths = useMemo(() => {
    const n = 200;
    const pts = { vg: [] as string[], ao: [] as string[], og: [] as string[], ecg: [] as string[] };
    for (let i = 0; i <= n; i++) {
      const x = i / n;
      const p = pressures(x);
      const X = (x * GW).toFixed(1);
      pts.vg.push(`${X},${(GH - (p.vg / 130) * GH).toFixed(1)}`);
      pts.ao.push(`${X},${(GH - (p.ao / 130) * GH).toFixed(1)}`);
      pts.og.push(`${X},${(GH - (p.og / 130) * GH).toFixed(1)}`);
      pts.ecg.push(`${X},${(48 - ecg(x) * 38).toFixed(1)}`);
    }
    return pts;
  }, []);
  const x = f * GW;
  const p = pressures(f);
  return (
    <div className="flex flex-col gap-2">
      <svg viewBox={`-34 -8 ${GW + 44} ${GH + 26}`} className="h-auto w-full" role="img" aria-label={t.pressureTitle}>
        {[0, 40, 80, 120].map((v) => (
          <g key={v}>
            <line x1="0" x2={GW} y1={GH - (v / 130) * GH} y2={GH - (v / 130) * GH} stroke="#e2e8f0" />
            <text x="-6" y={GH - (v / 130) * GH + 4} fontSize="10" textAnchor="end" fill="#64748b">{v}</text>
          </g>
        ))}
        {PHASES.slice(0, 4).map((ph) => (
          <line key={ph.id} x1={ph.end * GW} x2={ph.end * GW} y1="0" y2={GH} stroke="#cbd5e1" strokeDasharray="3 3" />
        ))}
        <polyline points={paths.ao.join(' ')} fill="none" stroke="#b91c1c" strokeWidth="2.5" />
        <polyline points={paths.vg.join(' ')} fill="none" stroke="#f97316" strokeWidth="2.5" />
        <polyline points={paths.og.join(' ')} fill="none" stroke="#7c3aed" strokeWidth="2" />
        <line x1={x} x2={x} y1="0" y2={GH} stroke="#0f172a" strokeWidth="1.5" />
        <text x={GW} y={GH + 16} fontSize="10" textAnchor="end" fill="#64748b">{t.oneCycle}</text>
        <text x="-30" y="-1" fontSize="10" fill="#64748b">mmHg</text>
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        <span><span className="mr-1 inline-block h-2 w-4 rounded bg-[#b91c1c]" />{t.curves.ao} : {Math.round(p.ao)} mmHg</span>
        <span><span className="mr-1 inline-block h-2 w-4 rounded bg-[#f97316]" />{t.curves.vg} : {Math.round(p.vg)} mmHg</span>
        <span><span className="mr-1 inline-block h-2 w-4 rounded bg-[#7c3aed]" />{t.curves.og} : {Math.round(p.og)} mmHg</span>
      </div>
      <svg viewBox={`-34 0 ${GW + 44} 66`} className="h-auto w-full" role="img" aria-label={t.ecg}>
        <polyline points={paths.ecg.join(' ')} fill="none" stroke="#059669" strokeWidth="2" />
        <line x1={x} x2={x} y1="0" y2="66" stroke="#0f172a" strokeWidth="1.5" />
        <text x="-30" y="14" fontSize="10" fill="#64748b">{t.ecgShort}</text>
        {[
          ['P', 0.05, 30],
          ['QRS', 0.14, 8],
          ['T', 0.37, 28],
        ].map(([l, at, y]) => (
          <text key={l as string} x={(at as number) * GW} y={y as number} fontSize="10" textAnchor="middle" fill="#059669">
            {l}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* ----------------------------- Simulation ----------------------------- */

const CHALLENGES: Phase[][] = [['auriculaire'], ['ejection'], ['isoContraction', 'isoRelaxation'], ['remplissage']];

export function CoeurSim({ t }: { t: T }) {
  const reduced = usePrefersReducedMotion();
  const [bpm, setBpm] = useState(70);
  const [ves, setVes] = useState(70);
  const [slow, setSlow] = useState(false);
  // Sans animation demandée par le système, le cœur attend que l’élève appuie sur « Lancer ».
  const [userRunning, setRunning] = useState<boolean | null>(null);
  const running = userRunning ?? !reduced;
  const [state, setState] = useState({ f: 0.6, t: 0 });
  const phaseRef = useRef(0.6);
  const [challenge, setChallenge] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<'right' | 'wrong' | null>(null);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const period = 60 / bpm;
      phaseRef.current = (phaseRef.current + (dt / period) * (slow ? 0.2 : 1)) % 1;
      setState((s) => ({ f: phaseRef.current, t: s.t + dt * (slow ? 0.3 : 1) }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, bpm, slow]);

  const p = phaseOf(state.f);
  const v = valves(p);
  const debit = (bpm * ves) / 1000;

  function togglePause() {
    const pausing = running;
    setRunning(!running);
    if (pausing && challenge !== null) setVerdict(CHALLENGES[challenge].includes(p) ? 'right' : 'wrong');
    if (!pausing) setVerdict(null);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border border-line bg-[#f8fafc] p-2">
          <Heart f={state.f} t={state.t} labels={t.parts} />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={togglePause} className="rounded-full bg-ink px-5 py-2 font-bold text-on-ink">
            {running ? t.pause : t.play}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} className="h-4 w-4" />
            {t.slow}
          </label>
        </div>
        <Slider label={t.bpm} value={bpm} min={40} max={180} step={1} unit="bpm" onChange={setBpm} />
        <Slider label={t.ves} value={ves} min={40} max={110} step={1} unit="mL" onChange={setVes} />
      </div>

      <div className="flex flex-col gap-3">
        <section className="rounded-2xl bg-ink p-4 text-on-ink">
          <p className="text-sm font-bold text-on-ink-muted">{t.phase}</p>
          <p className="font-serif text-2xl font-bold">{t.phases[p].name}</p>
          <p className="mt-1 text-on-ink-muted">{t.phases[p].text}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <p>
              {t.valveAv} : <span className="font-bold">{v.av ? t.open : t.closed}</span>
            </p>
            <p>
              {t.valveSig} : <span className="font-bold">{v.sig ? t.open : t.closed}</span>
            </p>
          </div>
        </section>
        <section className="rounded-2xl border border-line bg-surface p-3">
          <p className="text-sm font-bold text-muted">{t.pressureTitle}</p>
          <Curves f={state.f} t={t} />
        </section>
        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-paper px-3 py-2">
            <p className="text-xs text-muted">{t.period}</p>
            <p className="font-serif text-xl font-bold">{(60 / bpm).toFixed(2).replace('.', ',')} s</p>
          </div>
          <div className="rounded-xl bg-paper px-3 py-2">
            <p className="text-xs text-muted">{t.output}</p>
            <p className="font-serif text-xl font-bold">{debit.toFixed(1).replace('.', ',')} L/min</p>
          </div>
        </section>
        <section className="rounded-2xl border-2 border-dashed border-line p-4">
          <p className="text-sm font-bold text-muted">{t.challenge}</p>
          {challenge === null ? (
            <button type="button" onClick={() => { setChallenge(0); setVerdict(null); setRunning(true); }} className="mt-2 rounded-full bg-ink px-4 py-2 font-bold text-on-ink">
              {t.challengeStart}
            </button>
          ) : challenge >= CHALLENGES.length ? (
            <>
              <p className="mt-1 font-bold text-good">{t.challengeDone}</p>
              <button type="button" onClick={() => { setChallenge(0); setVerdict(null); setRunning(true); }} className="mt-2 underline">
                {t.challengeAgain}
              </button>
            </>
          ) : (
            <>
              <p className="mt-1 text-xs text-muted">{format(t.challengeN, { n: challenge + 1, total: CHALLENGES.length })}</p>
              <p className="mt-1 font-bold">{t.challenges[challenge]}</p>
              <div role="status" className="mt-2">
                {verdict === 'right' && <p className="font-bold text-good">{t.challengeRight}</p>}
                {verdict === 'wrong' && <p className="font-bold text-alert-ink">{format(t.challengeWrong, { phase: t.phases[p].name })}</p>}
              </div>
              {verdict === 'right' && (
                <button
                  type="button"
                  onClick={() => {
                    setChallenge(challenge + 1);
                    setVerdict(null);
                    setRunning(true);
                  }}
                  className="mt-2 rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-on-ink"
                >
                  {t.next}
                </button>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
