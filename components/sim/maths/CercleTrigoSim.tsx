'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout } from '../Slider';

type T = Dictionary['sims']['cercle-trigo'];

const R = 120;
const C = 160; // centre du cercle dans le dessin
const REMARKABLE = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];

/** Mesure en radians écrite avec π quand c’est un angle remarquable. */
function radLabel(deg: number) {
  const d = ((deg % 360) + 360) % 360;
  if (d === 0) return '0';
  const g = (a: number, b: number): number => (b ? g(b, a % b) : a);
  const k = g(d, 180);
  const num = d / k;
  const den = 180 / k;
  if (den > 12) return `${fmt((d * Math.PI) / 180, 3)}`;
  return `${num === 1 ? '' : num}π${den === 1 ? '' : `/${den}`}`;
}

/** Cercle trigonométrique : cosinus, sinus et tangente d’un angle qu’on fait tourner au doigt. */
export function CercleTrigoSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [deg, setDeg] = useState(30);
  const [snap, setSnap] = useState(true);
  const [showTan, setShowTan] = useState(false);
  const [turning, setTurning] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    if (!turning) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      setDeg((d) => (d + ((now - last) / 1000) * 40) % 360);
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [turning]);

  function pointTo(e: React.PointerEvent) {
    const el = svg.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 320 - C;
    const y = C - ((e.clientY - r.top) / r.height) * 320;
    let a = (Math.atan2(y, x) * 180) / Math.PI;
    if (a < 0) a += 360;
    if (snap) {
      const near = REMARKABLE.find((v) => Math.abs(v - a) < 4 || Math.abs(v + 360 - a) < 4);
      a = near ?? Math.round(a);
    }
    setDeg(a);
  }

  const a = (deg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  const tanOk = Math.abs(cos) > 1e-6;
  const tan = sin / cos;
  const mx = C + R * cos;
  const my = C - R * sin;
  const quadrant = deg < 90 ? 1 : deg < 180 ? 2 : deg < 270 ? 3 : 4;
  const clean = (v: number) => (Math.abs(v) < 1e-9 ? 0 : v);

  // Courbes de sin et cos sur un tour.
  const GW = 360;
  const GH = 160;
  const gx = (d: number) => (d / 360) * GW;
  const gy = (v: number) => GH / 2 - v * 60;
  const curve = (f: (x: number) => number) =>
    Array.from({ length: 121 }, (_, k) => `${k ? 'L' : 'M'}${gx(k * 3).toFixed(1)} ${gy(f((k * 3 * Math.PI) / 180)).toFixed(1)}`).join(' ');

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg
            ref={svg}
            viewBox="0 0 320 320"
            className="h-auto w-full touch-none select-none"
            role="img"
            aria-label={t.title}
            onPointerDown={(e) => {
              dragging.current = true;
              setTurning(false);
              (e.target as Element).setPointerCapture?.(e.pointerId);
              pointTo(e);
            }}
            onPointerMove={(e) => dragging.current && pointTo(e)}
            onPointerUp={() => (dragging.current = false)}
          >
            {/* Quadrants et axes. */}
            <line x1="10" x2="310" y1={C} y2={C} stroke="#94a3b8" />
            <line y1="10" y2="310" x1={C} x2={C} stroke="#94a3b8" />
            <text x="304" y={C - 6} fontSize="11" fill="#64748b" textAnchor="end">cos</text>
            <text x={C + 6} y="20" fontSize="11" fill="#64748b">sin</text>
            {REMARKABLE.map((v) => {
              const r = (v * Math.PI) / 180;
              return <circle key={v} cx={C + R * Math.cos(r)} cy={C - R * Math.sin(r)} r="2.5" fill="#cbd5e1" />;
            })}
            <circle cx={C} cy={C} r={R} fill="none" stroke="#1e293b" strokeWidth="2" />
            {/* Arc de l’angle. */}
            <path d={`M${C + 28} ${C} A 28 28 0 ${deg > 180 ? 1 : 0} 0 ${C + 28 * cos} ${C - 28 * sin}`} fill="none" stroke="#f59e0b" strokeWidth="3" />
            {/* Tangente : sur la droite x = 1. */}
            {showTan && tanOk && Math.abs(tan) < 2.4 && (
              <g>
                <line x1={C + R} x2={C + R} y1="10" y2="310" stroke="#16a34a" strokeDasharray="4 4" />
                <line x1={C} y1={C} x2={C + R} y2={C - R * tan} stroke="#16a34a" strokeWidth="1.5" strokeDasharray="2 3" />
                <line x1={C + R} y1={C} x2={C + R} y2={C - R * tan} stroke="#16a34a" strokeWidth="5" strokeLinecap="round" />
              </g>
            )}
            <line x1={C} y1={C} x2={mx} y2={my} stroke="#1e293b" strokeWidth="2" />
            {/* Projections : cos sur l’axe horizontal, sin sur l’axe vertical. */}
            <line x1={mx} y1={my} x2={mx} y2={C} stroke="#2563eb" strokeDasharray="3 3" />
            <line x1={mx} y1={my} x2={C} y2={my} stroke="#dc2626" strokeDasharray="3 3" />
            <line x1={C} y1={C} x2={mx} y2={C} stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
            <line x1={C} y1={C} x2={C} y2={my} stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
            <circle cx={mx} cy={my} r="11" fill="#f59e0b" stroke="#fff" strokeWidth="3" style={{ cursor: 'grab' }} />
            <text x={mx + (cos >= 0 ? 14 : -14)} y={my - 10} fontSize="13" fontWeight="700" textAnchor={cos >= 0 ? 'start' : 'end'} fill="#1e293b">
              M
            </text>
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={t.angleDeg} value={fmt(deg, 0)} unit="°" strong />
            <Readout label={t.angleRad} value={radLabel(Math.round(deg))} unit="rad" />
            <Readout label="cos x" value={fmt(clean(cos), 3)} />
            <Readout label="sin x" value={fmt(clean(sin), 3)} />
            <Readout label="tan x" value={tanOk ? fmt(clean(tan), 3) : t.undefinedTan} />
            <Readout label="cos² x + sin² x" value={fmt(cos * cos + sin * sin, 3)} />
          </dl>
          <p className="rounded-xl bg-paper px-3 py-2 text-sm">
            {t.quadrant} {quadrant} : cos {cos >= -1e-9 ? '≥ 0' : '< 0'}, sin {sin >= -1e-9 ? '≥ 0' : '< 0'}.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <label className="flex items-center gap-1.5 text-sm">
              <input type="checkbox" checked={snap} onChange={(e) => setSnap(e.target.checked)} className="h-4 w-4" />
              {t.snap}
            </label>
            <label className="flex items-center gap-1.5 text-sm">
              <input type="checkbox" checked={showTan} onChange={(e) => setShowTan(e.target.checked)} className="h-4 w-4" />
              {t.showTan}
            </label>
            <button type="button" onClick={() => setTurning((v) => !v)} className="rounded-full bg-ink px-4 py-1.5 text-sm font-bold text-on-ink">
              {turning ? t.stop : t.turn}
            </button>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-2">
            <p className="px-1 text-sm font-bold text-muted">{t.curves}</p>
            <svg viewBox={`-6 0 ${GW + 12} ${GH}`} className="h-auto w-full" role="img" aria-label={t.curves}>
              <line x1="0" x2={GW} y1={GH / 2} y2={GH / 2} stroke="#cbd5e1" />
              {[90, 180, 270, 360].map((d) => (
                <g key={d}>
                  <line x1={gx(d)} x2={gx(d)} y1="8" y2={GH - 8} stroke="#e2e8f0" />
                  <text x={gx(d)} y={GH - 1} fontSize="10" textAnchor="middle" fill="#64748b">{radLabel(d)}</text>
                </g>
              ))}
              <path d={curve(Math.cos)} fill="none" stroke="#dc2626" strokeWidth="2.5" />
              <path d={curve(Math.sin)} fill="none" stroke="#2563eb" strokeWidth="2.5" />
              <line x1={gx(deg)} x2={gx(deg)} y1="8" y2={GH - 8} stroke="#f59e0b" strokeWidth="2" />
              <circle cx={gx(deg)} cy={gy(cos)} r="4.5" fill="#dc2626" />
              <circle cx={gx(deg)} cy={gy(sin)} r="4.5" fill="#2563eb" />
            </svg>
          </div>
          <p className="text-sm text-muted">{t.hint}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((c) => ({ ...c, choices: [...c.choices] }))} t={predict} />
    </div>
  );
}
