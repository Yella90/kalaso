'use client';

import { useEffect, useRef, useState } from 'react';
import { format, type Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from './Slider';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const PLANETS = { terre: 9.8, lune: 1.6, mars: 3.7 } as const;
type Planet = keyof typeof PLANETS;
type T = Dictionary['sims']['projectile'];

interface Launch {
  v0: number;
  angle: number;
  h0: number;
  g: number;
}

/** Grandeurs du tir : y(t) = h0 + v0 sin(α) t − g t² / 2, x(t) = v0 cos(α) t. */
function solve({ v0, angle, h0, g }: Launch) {
  const a = (angle * Math.PI) / 180;
  const vx = v0 * Math.cos(a);
  const vy = v0 * Math.sin(a);
  const time = (vy + Math.sqrt(vy * vy + 2 * g * h0)) / g;
  return {
    vx,
    vy,
    g,
    time,
    range: vx * time,
    maxHeight: h0 + (vy * vy) / (2 * g),
    point: (t: number) => ({ x: vx * t, y: h0 + vy * t - (g * t * t) / 2 }),
  };
}
type Result = ReturnType<typeof solve>;

const W = 640;
const H = 340;
const PAD = 36;
const RING = 1.2; // rayon de la cible (m)

/** Plus petite distance entre la trajectoire descendante et le centre de la cible. */
function miss(r: Result, tx: number, ty: number) {
  let best = Infinity;
  let signed = 0;
  for (let k = 0; k <= 400; k++) {
    const t = (r.time * k) / 400;
    const p = r.point(t);
    const d = Math.hypot(p.x - tx, p.y - ty);
    if (d < best) {
      best = d;
      signed = p.x - tx;
    }
  }
  // Au niveau de la cible : la balle passe-t-elle avant (trop court) ou après (trop long) ?
  const tAt = r.vx > 0 ? tx / r.vx : 0;
  const yAt = r.point(Math.min(tAt, r.time)).y;
  const short = tAt > r.time || yAt < ty - RING;
  return { hit: best <= RING, short, gap: Math.abs(signed) };
}

function newTarget(seed: number) {
  const r = (n: number) => {
    const x = Math.sin(seed * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return { x: Math.round(12 + r(1) * 30), y: Math.round(r(2) * 8) };
}

export function ProjectileSim({ t }: { t: T }) {
  const [v0, setV0] = useState(20);
  const [angle, setAngle] = useState(45);
  const [h0, setH0] = useState(0);
  const [planet, setPlanet] = useState<Planet>('terre');
  const [history, setHistory] = useState<Launch[]>([]);
  const [progress, setProgress] = useState(1);
  const [vectors, setVectors] = useState(true);
  const [chrono, setChrono] = useState(false);
  const [game, setGame] = useState(false);
  const [seed, setSeed] = useState(1);
  const [score, setScore] = useState({ hits: 0, tries: 0 });
  const [verdict, setVerdict] = useState<{ hit: boolean; short: boolean; gap: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const frame = useRef<number>(0);

  const launch: Launch = { v0, angle, h0, g: PLANETS[planet] };
  const result = solve(launch);
  const target = newTarget(seed);

  // Échelle commune : les trajectoires (et la cible) tiennent dans le cadre.
  const all = [...history, launch].map(solve);
  const xMax = Math.max(20, game ? target.x + 6 : 0, ...all.map((r) => r.range)) * 1.06;
  const yMax = Math.max(8, game ? target.y + 4 : 0, h0 + 3, ...all.map((r) => r.maxHeight)) * 1.12;
  const scale = Math.min((W - 2 * PAD) / xMax, (H - 2 * PAD) / yMax);
  const sx = (x: number) => PAD + x * scale;
  const sy = (y: number) => H - PAD - y * scale;

  const path = (r: Result, until = 1) => {
    const steps = 80;
    return Array.from({ length: steps + 1 }, (_, k) => {
      const p = r.point((r.time * k * until) / steps);
      return `${k ? 'L' : 'M'}${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`;
    }).join(' ');
  };

  function fire() {
    setHistory((h) => [...h.slice(-2), launch]);
    setVerdict(null);
    const done = () => {
      if (!game) return;
      const m = miss(result, target.x, target.y);
      setVerdict(m);
      setScore((s) => ({ hits: s.hits + (m.hit ? 1 : 0), tries: s.tries + 1 }));
    };
    if (reducedMotion) {
      setProgress(1);
      done();
      return;
    }
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    // Durée réelle du vol, ramenée entre 1,2 et 4 secondes pour rester lisible.
    const duration = Math.min(4000, Math.max(1200, result.time * 500));
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      setProgress(k);
      if (k < 1) frame.current = requestAnimationFrame(step);
      else done();
    };
    setProgress(0);
    frame.current = requestAnimationFrame(step);
  }

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const tNow = result.time * progress;
  const ball = result.point(tNow);
  const vyNow = result.vy - result.g * tNow;
  const vscale = 3.6; // px par m/s
  const bx = sx(ball.x);
  const by = sy(ball.y);
  const sky = planet === 'terre' ? ['#7dd3fc', '#e0f2fe'] : planet === 'mars' ? ['#7c2d12', '#fdba74'] : ['#020617', '#334155'];
  const ground = planet === 'terre' ? '#a16207' : planet === 'mars' ? '#9a3412' : '#64748b';

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-2xl border border-line">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={t.title}>
            <defs>
              <linearGradient id="proj-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={sky[0]} />
                <stop offset="100%" stopColor={sky[1]} />
              </linearGradient>
              <marker id="fl-v" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#fff" /></marker>
              <marker id="fl-x" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#ef4444" /></marker>
              <marker id="fl-y" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#22c55e" /></marker>
            </defs>
            <rect width={W} height={H} fill="url(#proj-sky)" />
            <rect x="0" y={sy(0)} width={W} height={H - sy(0)} fill={ground} />
            {/* Graduations. */}
            {Array.from({ length: 6 }, (_, k) => {
              const step = Math.max(5, Math.ceil(xMax / 6 / 5) * 5);
              const x = k * step;
              return x <= xMax ? (
                <g key={k}>
                  <line x1={sx(x)} x2={sx(x)} y1={sy(0)} y2={sy(0) + 6} stroke="#fff" />
                  <text x={sx(x)} y={sy(0) + 20} textAnchor="middle" fontSize="11" fill="#fff">{x} m</text>
                </g>
              ) : null;
            })}
            {/* Le lanceur, sur son estrade. */}
            {h0 > 0 && <rect x={sx(0) - 14} y={sy(h0)} width="28" height={sy(0) - sy(h0)} fill="#78716c" />}
            <g transform={`translate(${sx(0) - 10} ${sy(h0)})`}>
              <path d="M-4 0 L -2 -16 M4 0 L 2 -16" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
              <path d="M0 -16 V -32" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" />
              <path d="M0 -28 L 12 -36" stroke="#7c4a2d" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="0" cy="-40" r="6" fill="#7c4a2d" />
            </g>
            {/* La cible du jeu. */}
            {game && (
              <g>
                <line x1={sx(target.x)} x2={sx(target.x)} y1={sy(target.y) + RING * scale} y2={sy(0)} stroke="#475569" strokeWidth="4" />
                <circle cx={sx(target.x)} cy={sy(target.y)} r={RING * scale} fill="#fff" stroke="#dc2626" strokeWidth="4" />
                <circle cx={sx(target.x)} cy={sy(target.y)} r={RING * scale * 0.45} fill="#dc2626" />
              </g>
            )}
            {history.slice(0, -1).map((h, k) => (
              <path key={k} d={path(solve(h))} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="4 5" />
            ))}
            <path d={path(result, progress)} fill="none" stroke="#f59e0b" strokeWidth="3" />
            {/* Chronophotographie : positions à intervalles de temps égaux. */}
            {chrono &&
              Array.from({ length: 13 }, (_, k) => {
                const tk = (result.time * k) / 12;
                if (tk > tNow + 1e-9) return null;
                const p = result.point(tk);
                return <circle key={k} cx={sx(p.x)} cy={sy(p.y)} r="4" fill="#fff" stroke="#f59e0b" strokeWidth="2" />;
              })}
            {/* Flèche de la hauteur maximale. */}
            {progress >= 1 && (
              <line x1={sx(result.vx * (result.vy / result.g))} y1={sy(0)} x2={sx(result.vx * (result.vy / result.g))} y2={sy(result.maxHeight)} stroke="#fff" strokeDasharray="3 4" />
            )}
            {/* Vecteurs vitesse : vₓ reste constante, v_y diminue puis change de sens. */}
            {vectors && progress < 1 && (
              <g strokeWidth="3">
                <line x1={bx} y1={by} x2={bx + result.vx * vscale} y2={by} stroke="#ef4444" markerEnd="url(#fl-x)" />
                <line x1={bx} y1={by} x2={bx} y2={by - vyNow * vscale} stroke="#22c55e" markerEnd="url(#fl-y)" />
                <line x1={bx} y1={by} x2={bx + result.vx * vscale} y2={by - vyNow * vscale} stroke="#fff" markerEnd="url(#fl-v)" />
              </g>
            )}
            <circle cx={bx} cy={by} r="8" fill="#f97316" stroke="#fff" strokeWidth="2" />
            {vectors && (
              <g fontSize="12" fontWeight="700">
                <text x={W - 150} y="22" fill="#ef4444">→ vₓ = {fmt(result.vx, 1)} m/s</text>
                <text x={W - 150} y="40" fill="#16a34a">↑ v_y = {fmt(vyNow, 1)} m/s</text>
              </g>
            )}
            {verdict && (
              <g>
                <rect x={W / 2 - 130} y="14" width="260" height="32" rx="10" fill={verdict.hit ? '#166534' : '#7f1d1d'} opacity="0.92" />
                <text x={W / 2} y="35" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff">
                  {verdict.hit ? t.hit : verdict.short ? t.tooShort : t.tooLong}
                </text>
              </g>
            )}
          </svg>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={vectors} onChange={(e) => setVectors(e.target.checked)} className="h-4 w-4" />
            {t.vectors}
          </label>
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={chrono} onChange={(e) => setChrono(e.target.checked)} className="h-4 w-4" />
            {t.chrono}
          </label>
        </div>
        <section className="rounded-2xl bg-ink p-4 text-on-ink">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-bold">{t.game}</p>
            <button
              type="button"
              onClick={() => {
                setGame((g) => !g);
                setVerdict(null);
                setHistory([]);
              }}
              className="rounded-full bg-amber-300 px-4 py-1.5 text-sm font-bold text-slate-950"
            >
              {game ? t.gameStop : t.gameStart}
            </button>
            {game && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setSeed((s) => s + 1);
                    setVerdict(null);
                    setHistory([]);
                  }}
                  className="text-sm underline"
                >
                  {t.newTarget}
                </button>
                <span className="ml-auto text-sm">{format(t.score, { hits: score.hits, tries: score.tries })}</span>
              </>
            )}
          </div>
          {game && <p className="mt-2 text-sm text-on-ink-muted">{format(t.targetAt, { x: target.x, y: target.y })}</p>}
        </section>
      </div>

      <div className="flex flex-col gap-4">
        <Slider label={t.speed} value={v0} min={2} max={40} step={1} unit="m/s" onChange={setV0} />
        <Slider label={t.angle} value={angle} min={5} max={85} step={1} unit="°" onChange={setAngle} />
        <Slider label={t.height} value={h0} min={0} max={20} step={0.5} unit="m" onChange={setH0} />
        <fieldset>
          <legend className="font-bold">{t.gravity}</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(Object.keys(PLANETS) as Planet[]).map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={planet === p}
                onClick={() => setPlanet(p)}
                className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${planet === p ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
              >
                {t.planets[p]}
                <span className="block text-xs font-normal">g = {fmt(PLANETS[p], 1)}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <button type="button" onClick={fire} className="rounded-full bg-focus px-5 py-3 font-bold text-ink">
          {t.fire}
        </button>
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.range} value={fmt(result.range, 1)} unit="m" strong />
          <Readout label={t.maxHeight} value={fmt(result.maxHeight, 1)} unit="m" />
          <Readout label={t.time} value={fmt(result.time)} unit="s" />
          <Readout label={t.components} value={`${fmt(result.vx, 1)} ; ${fmt(result.vy, 1)}`} unit="m/s" />
        </dl>
        <p className="text-sm text-muted">{t.hint}</p>
      </div>
    </div>
  );
}
