'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout, Slider } from './Slider';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const PLANETS = { terre: 9.8, lune: 1.6, mars: 3.7 } as const;
type Planet = keyof typeof PLANETS;

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
    time,
    range: vx * time,
    maxHeight: h0 + (vy * vy) / (2 * g),
    point: (t: number) => ({ x: vx * t, y: h0 + vy * t - (g * t * t) / 2 }),
  };
}

const W = 400;
const H = 240;
const PAD = 30;

/** Tir d'un projectile dans le champ de pesanteur, avec les traces des tirs précédents. */
export function ProjectileSim({ t }: { t: Dictionary['sims']['projectile'] }) {
  const [v0, setV0] = useState(20);
  const [angle, setAngle] = useState(45);
  const [h0, setH0] = useState(0);
  const [planet, setPlanet] = useState<Planet>('terre');
  const [history, setHistory] = useState<Launch[]>([]);
  const [progress, setProgress] = useState(1);
  const reducedMotion = usePrefersReducedMotion();
  const frame = useRef<number>(0);

  const launch: Launch = { v0, angle, h0, g: PLANETS[planet] };
  const result = solve(launch);

  // Échelle commune : la plus grande trajectoire affichée tient dans le cadre.
  const all = [...history, launch].map(solve);
  const xMax = Math.max(10, ...all.map((r) => r.range)) * 1.08;
  const yMax = Math.max(5, ...all.map((r) => r.maxHeight)) * 1.15;
  const scale = Math.min((W - 2 * PAD) / xMax, (H - 2 * PAD) / yMax);
  const sx = (x: number) => PAD + x * scale;
  const sy = (y: number) => H - PAD - y * scale;

  const path = (r: ReturnType<typeof solve>, until = 1) => {
    const steps = 60;
    return Array.from({ length: steps + 1 }, (_, k) => {
      const p = r.point((r.time * k * until) / steps);
      return `${k ? 'L' : 'M'}${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`;
    }).join(' ');
  };

  function fire() {
    setHistory((h) => [...h.slice(-2), launch]);
    if (reducedMotion) return setProgress(1);
    cancelAnimationFrame(frame.current);
    const start = performance.now();
    // L'animation dure le temps de vol réel, ralenti ou accéléré pour rester entre 1 et 3 secondes.
    const duration = Math.min(3000, Math.max(1000, result.time * 400));
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / duration);
      setProgress(k);
      if (k < 1) frame.current = requestAnimationFrame(step);
    };
    setProgress(0);
    frame.current = requestAnimationFrame(step);
  }

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const ball = result.point(result.time * progress);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="rounded-2xl bg-ink p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.title}>
          <line x1={PAD} y1={sy(0)} x2={W - 8} y2={sy(0)} stroke="#a9b2cf" strokeWidth="1.5" />
          <line x1={PAD} y1={sy(0)} x2={PAD} y2={8} stroke="#a9b2cf" strokeWidth="1.5" />
          <text x={W - 8} y={sy(0) + 18} textAnchor="end" fill="#a9b2cf" fontSize="12">x (m)</text>
          <text x={PAD + 6} y={16} fill="#a9b2cf" fontSize="12">y (m)</text>
          {history.slice(0, -1).map((h, k) => (
            <path key={k} d={path(solve(h))} fill="none" stroke="#a9b2cf" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="4 4" />
          ))}
          <path d={path(result, progress)} fill="none" stroke="var(--focus)" strokeWidth="2.5" />
          {/* Flèche : hauteur maximale */}
          <line
            x1={sx(result.vx * (result.vy / launch.g))}
            y1={sy(0)}
            x2={sx(result.vx * (result.vy / launch.g))}
            y2={sy(result.maxHeight)}
            stroke="#e8793a"
            strokeDasharray="3 3"
          />
          <circle cx={sx(ball.x)} cy={sy(ball.y)} r="6" fill="#e8793a" stroke="#eef1fa" strokeWidth="1.5" />
          {/* Vecteur vitesse initiale */}
          <line
            x1={sx(0)}
            y1={sy(h0)}
            x2={sx(0) + Math.cos((angle * Math.PI) / 180) * 40}
            y2={sy(h0) - Math.sin((angle * Math.PI) / 180) * 40}
            stroke="#eef1fa"
            strokeWidth="2"
          />
        </svg>
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
