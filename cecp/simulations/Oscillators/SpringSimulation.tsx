'use client';

import { useMemo, useReducer, useRef, useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import {
  rk4Step, springAcc, springPeriod, springOmega, springEnergy, springVmax, elasticEnergy, kineticEnergy,
  type State2,
} from '@/cecp/lib/physics/oscillators';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');

const X_SERIES: PlotSeries[] = [{ label: 'x(t) en m', color: '#f472b6' }];
const E_SERIES: PlotSeries[] = [
  { label: 'Énergie cinétique Ec', color: '#38bdf8' },
  { label: 'Énergie potentielle élastique Ep', color: '#f59e0b' },
  { label: 'Énergie mécanique Em', color: '#e2e8f0', dashed: true },
];

function Slider({ label, value, unit, min, max, step, digits = 2, onChange }: {
  label: string; value: number; unit: string; min: number; max: number; step: number; digits?: number; onChange: (v: number) => void;
}) {
  return (
    <label className="block space-y-1">
      <span className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-amber-400">{fr(value, digits)} {unit}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-semibold text-amber-400 mt-0.5">{value}</p>
    </div>
  );
}

const PX_PER_M = 1000;
const EQ_X = 430;
const WALL_X = 40;
const BLOCK_W = 80;

export function SpringSimulation() {
  const [m, setM] = useState(0.2);
  const [k, setK] = useState(20);
  const [Xm, setXm] = useState(0.1);
  const [h, setH] = useState(0);
  const [running, setRunning] = useState(false);
  const state = useRef<State2>({ x: 0.1, v: 0 });
  const time = useRef(0);
  const xBuf = useRef<PlotSample[]>([]);
  const eBuf = useRef<PlotSample[]>([]);
  const [, force] = useReducer((n: number) => n + 1, 0);

  const params = useMemo(() => ({ m, k, h }), [m, k, h]);

  const reset = (newXm = Xm) => {
    setRunning(false);
    state.current = { x: newXm, v: 0 };
    time.current = 0;
    xBuf.current = [];
    eBuf.current = [];
    force();
  };

  useAnimationFrame((dt) => {
    const acc = springAcc(params);
    const sub = 10;
    for (let i = 0; i < sub; i++) state.current = rk4Step(state.current, dt / sub, acc);
    time.current += dt;
    const { x, v } = state.current;
    const Ec = kineticEnergy(m, v), Ep = elasticEnergy(k, x);
    xBuf.current.push({ t: time.current, values: [x] });
    eBuf.current.push({ t: time.current, values: [Ec, Ep, Ec + Ep] });
    if (xBuf.current.length > 1200) { xBuf.current.shift(); eBuf.current.shift(); }
    force();
  }, running);

  const { x, v } = state.current;
  const blockX = EQ_X + x * PX_PER_M;
  const springEnd = blockX - BLOCK_W / 2;
  // Ressort en zigzag entre le mur et le solide
  const coils = 14;
  const pts: string[] = [`${WALL_X},120`, `${WALL_X + 15},120`];
  const L = springEnd - WALL_X - 30;
  for (let i = 0; i <= coils; i++) {
    const px = WALL_X + 15 + (L * i) / coils;
    pts.push(`${px},${i === 0 || i === coils ? 120 : i % 2 ? 100 : 140}`);
  }
  pts.push(`${springEnd},120`);

  const T0 = springPeriod(params);
  const force_ = -k * x;
  const Em0 = springEnergy(k, Xm);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 800 230" className="w-full h-auto" role="img" aria-label="Pendule élastique horizontal">
            {/* Mur et support */}
            <rect x={WALL_X - 16} y={40} width={16} height={130} fill="#334155" />
            <line x1={WALL_X - 16} y1={170} x2={790} y2={170} stroke="#475569" strokeWidth={3} />
            {/* Axe x */}
            <line x1={EQ_X} y1={30} x2={EQ_X} y2={200} stroke="#22d3ee" strokeDasharray="5 4" />
            <text x={EQ_X} y={215} fill="#22d3ee" fontSize={13} textAnchor="middle">O</text>
            {[-0.2, -0.1, 0.1, 0.2].map((g) => (
              <g key={g}>
                <line x1={EQ_X + g * PX_PER_M} y1={170} x2={EQ_X + g * PX_PER_M} y2={178} stroke="#64748b" />
                <text x={EQ_X + g * PX_PER_M} y={192} fill="#64748b" fontSize={11} textAnchor="middle">{fr(g, 1)} m</text>
              </g>
            ))}
            {/* Amplitude */}
            <line x1={EQ_X + Xm * PX_PER_M} y1={50} x2={EQ_X + Xm * PX_PER_M} y2={170} stroke="#f472b6" strokeDasharray="3 4" opacity={0.6} />
            <line x1={EQ_X - Xm * PX_PER_M} y1={50} x2={EQ_X - Xm * PX_PER_M} y2={170} stroke="#f472b6" strokeDasharray="3 4" opacity={0.6} />
            <text x={EQ_X + Xm * PX_PER_M} y={45} fill="#f472b6" fontSize={12} textAnchor="middle">+Xm</text>
            <text x={EQ_X - Xm * PX_PER_M} y={45} fill="#f472b6" fontSize={12} textAnchor="middle">−Xm</text>
            {/* Ressort */}
            <polyline points={pts.join(' ')} fill="none" stroke="#cbd5e1" strokeWidth={3} strokeLinejoin="round" />
            {/* Solide */}
            <rect x={blockX - BLOCK_W / 2} y={85} width={BLOCK_W} height={85} rx={6} fill="#f59e0b" />
            <text x={blockX} y={133} fill="#0f172a" fontSize={16} fontWeight={700} textAnchor="middle">m</text>
            {/* Force de rappel */}
            {Math.abs(force_) > 0.05 && (
              <g>
                <line x1={blockX} y1={70} x2={blockX + force_ * 25} y2={70} stroke="#10b981" strokeWidth={4} markerEnd="url(#sp-arrow)" />
                <text x={blockX + force_ * 12.5} y={62} fill="#10b981" fontSize={13} fontWeight={700} textAnchor="middle">T</text>
              </g>
            )}
            {/* Vitesse */}
            {Math.abs(v) > 0.02 && (
              <line x1={blockX} y1={185 - 30} x2={blockX + v * 120} y2={155} stroke="#f472b6" strokeWidth={3} markerEnd="url(#sp-arrow)" />
            )}
            <defs>
              <marker id="sp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="context-stroke" />
              </marker>
            </defs>
            <text x={780} y={24} fill="#94a3b8" fontSize={12} textAnchor="end" fontFamily="monospace">
              {`t = ${fr(time.current, 2)} s   x = ${fr(x * 100, 1)} cm   v = ${fr(v, 2)} m/s`}
            </text>
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <LivePlot buffer={xBuf} series={X_SERIES} yMin={-0.22} yMax={0.22} height={160} />
          <LivePlot buffer={eBuf} series={E_SERIES} yMin={0} yMax={Math.max(springEnergy(k, 0.2) * 0.25, Em0 * 1.15)} height={160} />
        </div>
      </div>

      <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-semibold text-white">Paramètres</h3>
        <Slider label="Masse m" value={m} unit="kg" min={0.05} max={2} step={0.05} onChange={(v) => { setM(v); reset(); }} />
        <Slider label="Raideur k" value={k} unit="N/m" min={5} max={200} step={1} digits={0} onChange={(v) => { setK(v); reset(); }} />
        <Slider label="Amplitude Xm" value={Xm} unit="m" min={0.01} max={0.2} step={0.01} onChange={(v) => { setXm(v); reset(v); }} />
        <Slider label="Frottement h" value={h} unit="kg/s" min={0} max={2} step={0.05} onChange={(v) => { setH(v); reset(); }} />
        <div className="flex gap-2">
          <button onClick={() => setRunning((r) => !r)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
            {running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Lâcher</>}
          </button>
          <button onClick={() => reset()} aria-label="Réinitialiser" className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200">
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Période T0" value={`${fr(T0, 3)} s`} />
          <Stat label="Fréquence f0" value={`${fr(1 / T0, 2)} Hz`} />
          <Stat label="Pulsation ω0" value={`${fr(springOmega(params), 2)} rad/s`} />
          <Stat label="Vitesse max" value={`${fr(springVmax(params, Xm), 2)} m/s`} />
          <Stat label="Énergie Em" value={`${fr(Em0 * 1000, 1)} mJ`} />
          <Stat label="Force max" value={`${fr(k * Xm, 2)} N`} />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          {h > 0
            ? 'Avec frottement, l\'énergie mécanique diminue : les oscillations sont amorties (régime pseudo-périodique).'
            : 'Sans frottement, Ec et Ep s\'échangent en permanence mais leur somme Em reste constante.'}
        </p>
      </div>
    </div>
  );
}
