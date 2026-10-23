'use client';

import { useMemo, useReducer, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import {
  rk4Step, pendulumAcc, pendulumPeriod, pendulumPeriodExact, type State2,
} from '@/cecp/lib/physics/oscillators';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');
const DEG = Math.PI / 180;

const PLANETS = [
  { id: 'terre', name: 'Terre', g: 9.81 },
  { id: 'lune', name: 'Lune', g: 1.62 },
  { id: 'mars', name: 'Mars', g: 3.71 },
  { id: 'jupiter', name: 'Jupiter', g: 24.8 },
];

const SERIES: PlotSeries[] = [
  { label: 'θ(t) réel (en °)', color: '#f59e0b' },
  { label: 'θ(t) approximation petits angles', color: '#38bdf8', dashed: true },
];

function Slider({ label, value, display, min, max, step, onChange }: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-amber-400">{display}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
    </label>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="p-2.5 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-semibold text-amber-400 mt-0.5">{value}</p>
      {hint && <p className="text-[10px] text-slate-500">{hint}</p>}
    </div>
  );
}

const PIVOT = { x: 400, y: 36 };
const PX_PER_M = 150;

export function PendulumSimulation() {
  const [l, setL] = useState(1);
  const [theta0Deg, setTheta0Deg] = useState(30);
  const [planet, setPlanet] = useState('terre');
  const [gamma, setGamma] = useState(0);
  const [showLinear, setShowLinear] = useState(true);
  const [running, setRunning] = useState(false);
  const g = PLANETS.find((p) => p.id === planet)!.g;

  const real = useRef<State2>({ x: theta0Deg * DEG, v: 0 });
  const lin = useRef<State2>({ x: theta0Deg * DEG, v: 0 });
  const time = useRef(0);
  const buf = useRef<PlotSample[]>([]);
  const trail = useRef<{ x: number; y: number }[]>([]);
  const [, force] = useReducer((n: number) => n + 1, 0);

  const params = useMemo(() => ({ l, g, gamma }), [l, g, gamma]);
  const series = useMemo(() => (showLinear ? SERIES : SERIES.slice(0, 1)), [showLinear]);
  const T0 = pendulumPeriod(params);
  const Texact = useMemo(() => pendulumPeriodExact({ l, g }, theta0Deg * DEG, 2e-4), [l, g, theta0Deg]);

  const reset = (th = theta0Deg) => {
    setRunning(false);
    real.current = { x: th * DEG, v: 0 };
    lin.current = { x: th * DEG, v: 0 };
    time.current = 0;
    buf.current = [];
    trail.current = [];
    force();
  };

  useAnimationFrame((dt) => {
    const sub = 20;
    const accR = pendulumAcc(params), accL = pendulumAcc(params, true);
    for (let i = 0; i < sub; i++) {
      real.current = rk4Step(real.current, dt / sub, accR);
      lin.current = rk4Step(lin.current, dt / sub, accL);
    }
    time.current += dt;
    buf.current.push({ t: time.current, values: [real.current.x / DEG, lin.current.x / DEG] });
    if (buf.current.length > 1500) buf.current.shift();
    const th = real.current.x;
    trail.current.push({ x: PIVOT.x + l * PX_PER_M * Math.sin(th), y: PIVOT.y + l * PX_PER_M * Math.cos(th) });
    if (trail.current.length > 90) trail.current.shift();
    force();
  }, running);

  const L = l * PX_PER_M;
  const bob = (th: number) => ({ x: PIVOT.x + L * Math.sin(th), y: PIVOT.y + L * Math.cos(th) });
  const b = bob(real.current.x);
  const bl = bob(lin.current.x);
  const vmax = Math.sqrt(2 * g * l * (1 - Math.cos(theta0Deg * DEG)));
  const ecart = ((Texact - T0) / T0) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 800 380" className="w-full h-auto" role="img" aria-label="Pendule simple">
            <rect x={PIVOT.x - 80} y={PIVOT.y - 14} width={160} height={14} fill="#334155" />
            <line x1={PIVOT.x} y1={PIVOT.y} x2={PIVOT.x} y2={PIVOT.y + L + 30} stroke="#334155" strokeDasharray="5 4" />
            {/* Arc d'amplitude */}
            <path
              d={`M ${bob(-theta0Deg * DEG).x} ${bob(-theta0Deg * DEG).y} A ${L} ${L} 0 0 0 ${bob(theta0Deg * DEG).x} ${bob(theta0Deg * DEG).y}`}
              fill="none" stroke="#1e293b" strokeWidth={2}
            />
            {/* Trace */}
            {trail.current.length > 1 && (
              <polyline points={trail.current.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="#f59e0b" strokeOpacity={0.35} strokeWidth={2} />
            )}
            {/* Pendule "petits angles" (fantome) */}
            {showLinear && (
              <g opacity={0.55}>
                <line x1={PIVOT.x} y1={PIVOT.y} x2={bl.x} y2={bl.y} stroke="#38bdf8" strokeWidth={1.5} strokeDasharray="5 4" />
                <circle cx={bl.x} cy={bl.y} r={14} fill="none" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 3" />
              </g>
            )}
            {/* Pendule reel */}
            <line x1={PIVOT.x} y1={PIVOT.y} x2={b.x} y2={b.y} stroke="#e2e8f0" strokeWidth={2} />
            <circle cx={b.x} cy={b.y} r={15} fill="#f59e0b" />
            <circle cx={PIVOT.x} cy={PIVOT.y} r={4} fill="#e2e8f0" />
            {/* Poids */}
            <line x1={b.x} y1={b.y} x2={b.x} y2={b.y + 45} stroke="#10b981" strokeWidth={3} markerEnd="url(#pd-arrow)" />
            <text x={b.x + 10} y={b.y + 45} fill="#10b981" fontSize={13} fontWeight={700}>P</text>
            <defs>
              <marker id="pd-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="context-stroke" />
              </marker>
            </defs>
            <text x={16} y={24} fill="#94a3b8" fontSize={12} fontFamily="monospace">
              {`t = ${fr(time.current, 2)} s   θ = ${fr(real.current.x / DEG, 1)}°`}
            </text>
            <text x={784} y={24} fill="#94a3b8" fontSize={12} textAnchor="end">{`ℓ = ${fr(l, 2)} m · g = ${fr(g, 2)} m/s²`}</text>
          </svg>
        </div>
        <LivePlot buffer={buf} series={series} yMin={-95} yMax={95} height={170} windowSeconds={Math.max(6, 2.5 * T0)} />
      </div>

      <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-semibold text-white">Paramètres</h3>
        <div className="space-y-1">
          <p className="text-xs text-slate-400">Où se trouve le pendule ?</p>
          <div className="grid grid-cols-4 gap-1">
            {PLANETS.map((p) => (
              <button key={p.id} onClick={() => { setPlanet(p.id); reset(); }}
                className={`px-1 py-1.5 rounded-md text-xs ${planet === p.id ? 'bg-amber-500 text-slate-900 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <Slider label="Longueur ℓ" value={l} display={`${fr(l, 2)} m`} min={0.2} max={2} step={0.05} onChange={(v) => { setL(v); reset(); }} />
        <Slider label="Angle de lâcher θ0" value={theta0Deg} display={`${theta0Deg}°`} min={5} max={90} step={1} onChange={(v) => { setTheta0Deg(v); reset(v); }} />
        <Slider label="Amortissement γ" value={gamma} display={`${fr(gamma, 2)} s⁻¹`} min={0} max={0.5} step={0.01} onChange={(v) => { setGamma(v); reset(); }} />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={showLinear} onChange={(e) => setShowLinear(e.target.checked)} className="accent-sky-500" />
          Comparer avec l&apos;approximation des petits angles
        </label>
        <div className="flex gap-2">
          <button onClick={() => setRunning((r) => !r)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
            {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Lâcher</>}
          </button>
          <button onClick={() => reset()} aria-label="Réinitialiser" className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200">
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="T0 = 2π√(ℓ/g)" value={`${fr(T0, 3)} s`} hint="petits angles" />
          <Stat label="Période réelle" value={`${fr(Texact, 3)} s`} hint={`écart : +${fr(ecart, 1)} %`} />
          <Stat label="Fréquence" value={`${fr(1 / Texact, 3)} Hz`} />
          <Stat label="Vitesse au point bas" value={`${fr(vmax, 2)} m/s`} />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {theta0Deg <= 15
            ? 'Pour θ0 ≤ 15°, l\'écart est inférieur à 0,5 % : les oscillations sont pratiquement isochrones.'
            : 'Aux grands angles, la période augmente : le pendule réel prend du retard sur le modèle des petits angles.'}
        </p>
      </div>
    </div>
  );
}
