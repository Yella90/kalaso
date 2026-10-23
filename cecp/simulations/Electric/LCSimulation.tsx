'use client';

import { useRef, useState } from 'react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import {
  rlcStep, lcPeriod, lcFrequency, lcMaxCurrent, lcTotalEnergy, electricEnergy, magneticEnergy,
  criticalResistance, dampingRegime, type CircuitState,
} from '@/cecp/lib/physics/electric';

const Q_SERIES: PlotSeries[] = [
  { label: 'q / Qm (charge)', color: '#f472b6' },
  { label: 'i / Im (intensité)', color: '#f59e0b' },
];
const E_SERIES: PlotSeries[] = [
  { label: 'Énergie du condensateur', color: '#f472b6' },
  { label: 'Énergie de la bobine', color: '#38bdf8' },
  { label: 'Énergie totale', color: '#e2e8f0', dashed: true },
];

/** Nombre de periodes propres affichees par seconde reelle */
const PERIODS_PER_SECOND = 0.5;

const REGIME_LABEL = {
  periodique: 'Périodique (pas de résistance)',
  'pseudo-periodique': 'Pseudo-périodique',
  critique: 'Critique',
  aperiodique: 'Apériodique',
} as const;

export function LCSimulation() {
  const [L, setL] = useState(0.5);
  const [Cmicro, setCmicro] = useState(2);
  const [U0, setU0] = useState(10);
  const [R, setR] = useState(0);
  const [running, setRunning] = useState(false);
  const C = Cmicro * 1e-6;
  const Qm = C * U0;
  const state = useRef<CircuitState>({ q: Qm, i: 0 });
  const t = useRef(0);
  const qBuf = useRef<PlotSample[]>([]);
  const eBuf = useRef<PlotSample[]>([]);
  // Valeurs affichees (copiees depuis les refs a chaque image)
  const [view, setView] = useState({ q: Qm, i: 0, t: 0 });

  const T0 = lcPeriod(L, C);
  const Im = lcMaxCurrent(L, C, Qm);
  const E0 = lcTotalEnergy(C, Qm);

  const reset = (nextQm = Qm) => {
    setRunning(false);
    state.current = { q: nextQm, i: 0 };
    t.current = 0;
    qBuf.current = [];
    eBuf.current = [];
    setView({ q: nextQm, i: 0, t: 0 });
  };

  useAnimationFrame((dt) => {
    const dtPhys = dt * PERIODS_PER_SECOND * T0;
    const sub = 60;
    for (let k = 0; k < sub; k++) state.current = rlcStep(state.current, dtPhys / sub, R, L, C);
    t.current += dtPhys;
    const { q, i } = state.current;
    const Ee = electricEnergy(C, q), Eb = magneticEnergy(L, i);
    const u = t.current / T0;
    qBuf.current.push({ t: u, values: [q / Qm, i / Im] });
    eBuf.current.push({ t: u, values: [Ee / E0, Eb / E0, (Ee + Eb) / E0] });
    if (qBuf.current.length > 1500) { qBuf.current.shift(); eBuf.current.shift(); }
    setView({ q, i, t: t.current });
  }, running);

  const { q, i } = view;
  const qr = q / Qm; // -1 .. 1
  const ir = i / Im;
  const nSigns = Math.round(Math.abs(qr) * 6);
  const topSign = qr >= 0 ? '+' : '−';
  const botSign = qr >= 0 ? '−' : '+';
  const regime = dampingRegime(R, L, C);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 800 260" className="w-full h-auto" role="img" aria-label="Circuit oscillant : condensateur et bobine">
            <rect x={200} y={40} width={400} height={180} fill="none" stroke="#475569" strokeWidth={3} />
            {/* Condensateur (a gauche) */}
            <rect x={170} y={95} width={60} height={70} fill="#020617" />
            <line x1={170} y1={118} x2={230} y2={118} stroke="#e2e8f0" strokeWidth={5} />
            <line x1={170} y1={142} x2={230} y2={142} stroke="#e2e8f0" strokeWidth={5} />
            {Array.from({ length: nSigns }, (_, k) => (
              <g key={k}>
                <text x={176 + k * 9} y={112} fill="#f472b6" fontSize={12} fontWeight={700}>{topSign}</text>
                <text x={176 + k * 9} y={158} fill="#38bdf8" fontSize={12} fontWeight={700}>{botSign}</text>
              </g>
            ))}
            <rect x={175} y={121} width={50} height={18} fill="#f472b6" opacity={0.35 * qr * qr} />
            <text x={150} y={135} fill="#f472b6" fontSize={14} textAnchor="end">C = {frNum(Cmicro, 1)} µF</text>
            {/* Bobine (a droite) */}
            <rect x={570} y={70} width={60} height={120} fill="#020617" />
            {Array.from({ length: 6 }, (_, k) => (
              <path key={k} d={`M 600 ${75 + k * 18} a 17 9 0 1 1 0 18`} fill="none" stroke="#38bdf8" strokeWidth={3} />
            ))}
            <rect x={566} y={70} width={68} height={120} rx={8} fill="#38bdf8" opacity={0.4 * ir * ir} />
            <text x={645} y={135} fill="#38bdf8" fontSize={14}>L = {frNum(L, 2)} H</text>
            {/* Resistance (en haut) */}
            {R > 0 && (
              <g>
                <rect x={350} y={28} width={100} height={24} rx={3} fill="#0f172a" stroke="#f59e0b" strokeWidth={3} />
                <text x={400} y={45} fill="#f59e0b" fontSize={12} textAnchor="middle">R = {frNum(R, 0)} Ω</text>
              </g>
            )}
            {/* Sens du courant */}
            {Math.abs(ir) > 0.05 && (
              <line x1={400 - 40 * Math.sign(ir)} y1={220} x2={400 + 40 * Math.sign(ir)} y2={220}
                stroke="#f59e0b" strokeWidth={2 + 4 * Math.abs(ir)} markerEnd="url(#lc-arrow)" />
            )}
            <defs>
              <marker id="lc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b" />
              </marker>
            </defs>
            <text x={400} y={110} fill="#f472b6" fontSize={14} fontFamily="monospace" textAnchor="middle">q = {frNum(q * 1e6, 2)} µC</text>
            <text x={400} y={135} fill="#f59e0b" fontSize={14} fontFamily="monospace" textAnchor="middle">i = {frNum(i * 1e3, 2)} mA</text>
            <text x={400} y={160} fill="#64748b" fontSize={12} fontFamily="monospace" textAnchor="middle">t = {frNum(view.t / T0, 2)} T₀</text>
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <LivePlot buffer={qBuf} series={Q_SERIES} yMin={-1.1} yMax={1.1} height={170} windowSeconds={5} xLabel="t / T₀" />
          <LivePlot buffer={eBuf} series={E_SERIES} yMin={0} yMax={1.1} height={170} windowSeconds={5} xLabel="t / T₀" />
        </div>
        <p className="text-xs text-slate-500">
          Animation ralentie : une période propre dure 2 s à l&apos;écran. Les énergies sont rapportées à l&apos;énergie initiale Qm²/(2C).
        </p>
      </div>

      <ParamPanel>
        <Slider label="Inductance L" value={L} unit="H" min={0.05} max={1} step={0.05} onChange={(v) => { setL(v); reset(); }} />
        <Slider label="Capacité C" value={Cmicro} unit="µF" min={0.5} max={20} step={0.5} digits={1}
          onChange={(v) => { setCmicro(v); reset(v * 1e-6 * U0); }} />
        <Slider label="Tension de charge U₀" value={U0} unit="V" min={1} max={12} step={0.5} digits={1}
          onChange={(v) => { setU0(v); reset(C * v); }} />
        <Slider label="Résistance R" value={R} unit="Ω" min={0} max={1500} step={10} digits={0} onChange={(v) => { setR(v); reset(); }} />
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={() => reset()} playLabel="Fermer le circuit" />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Période T₀ = 2π√(LC)" value={`${frNum(T0 * 1000, 2)} ms`} />
          <Stat label="Fréquence f₀" value={`${frNum(lcFrequency(L, C), 1)} Hz`} />
          <Stat label="Charge Qm" value={`${frNum(Qm * 1e6, 1)} µC`} />
          <Stat label="Intensité Im" value={`${frNum(Im * 1e3, 1)} mA`} />
          <Stat label="Énergie initiale" value={`${frNum(E0 * 1e6, 1)} µJ`} tone="emerald" />
          <Stat label="R critique" value={`${frNum(criticalResistance(L, C), 0)} Ω`} tone="rose" />
        </div>
        <p className="text-xs text-slate-300">
          Régime : <span className="font-semibold text-amber-400">{REGIME_LABEL[regime]}</span>
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Sans résistance, l&apos;énergie passe du condensateur à la bobine et inversement, sans perte. Ajoute une résistance :
          l&apos;énergie se dissipe par effet Joule. Au-delà de R critique, il n&apos;y a plus d&apos;oscillation.
        </p>
      </ParamPanel>
    </div>
  );
}
