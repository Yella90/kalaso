'use client';

import { useMemo, useRef, useState } from 'react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import {
  impedance, phaseShift, resonanceFrequency, qualityFactor, bandwidth, cutoffFrequencies, averagePower,
} from '@/cecp/lib/physics/electric';

const SERIES: PlotSeries[] = [
  { label: 'u(t) / Um (générateur)', color: '#38bdf8' },
  { label: 'i(t) / I₀ (intensité)', color: '#f59e0b' },
];

const U_EFF = 6; // tension efficace du GBF (V)
/** Periodes du generateur affichees par seconde reelle */
const PERIODS_PER_SECOND = 0.75;

// Courbe de resonance
const W = 520, H = 220, PAD_L = 46, PAD_B = 28, PAD_T = 12, PAD_R = 12;
const X_MAX = 2.5; // f / f0

export function ForcedRLCSimulation() {
  const [R, setR] = useState(40);
  const [L, setL] = useState(0.2);
  const [Cmicro, setCmicro] = useState(5);
  const [ratio, setRatio] = useState(0.8); // f / f0
  const [running, setRunning] = useState(false);
  const t = useRef(0); // en periodes du generateur
  const buf = useRef<PlotSample[]>([]);
  const [, setTick] = useState(0);

  const C = Cmicro * 1e-6;
  const f0 = resonanceFrequency(L, C);
  const f = ratio * f0;
  const w = 2 * Math.PI * f;
  const Z = impedance(R, L, C, w);
  const I = U_EFF / Z;
  const I0 = U_EFF / R;
  const phi = phaseShift(R, L, C, w);
  const [f1, f2] = cutoffFrequencies(R, L, C);

  const clear = () => { t.current = 0; buf.current = []; setTick(0); };

  useAnimationFrame((dt) => {
    const steps = 4;
    for (let k = 0; k < steps; k++) {
      t.current += (dt * PERIODS_PER_SECOND) / steps;
      const a = 2 * Math.PI * t.current;
      buf.current.push({ t: t.current, values: [Math.cos(a), (I / I0) * Math.cos(a - phi)] });
    }
    if (buf.current.length > 2000) buf.current.splice(0, buf.current.length - 2000);
    setTick(t.current);
  }, running);

  // Courbe I(f) / I0
  const curve = useMemo(() => {
    const pts: string[] = [];
    for (let k = 1; k <= 300; k++) {
      const x = (k / 300) * X_MAX;
      const y = (U_EFF / impedance(R, L, C, 2 * Math.PI * x * f0)) / I0;
      pts.push(`${PAD_L + (x / X_MAX) * (W - PAD_L - PAD_R)},${PAD_T + (1 - y) * (H - PAD_T - PAD_B)}`);
    }
    return pts.join(' ');
  }, [R, L, C, f0, I0]);
  const X = (x: number) => PAD_L + (x / X_MAX) * (W - PAD_L - PAD_R);
  const Y = (y: number) => PAD_T + (1 - y) * (H - PAD_T - PAD_B);
  const phiDeg = (phi * 180) / Math.PI;
  const nature = Math.abs(phiDeg) < 1 ? 'résonance' : phiDeg > 0 ? 'inductif' : 'capacitif';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-2">
          <p className="text-xs text-slate-400 px-1 pb-1">Courbe de résonance : intensité efficace I / I₀ en fonction de la fréquence</p>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Courbe de résonance de l'intensité">
            {/* Bande passante */}
            <rect x={X(f1 / f0)} y={PAD_T} width={Math.max(1, X(f2 / f0) - X(f1 / f0))} height={H - PAD_T - PAD_B} fill="#10b981" opacity={0.12} />
            {[0, 0.25, 0.5, 0.75, 1].map((y) => (
              <g key={y}>
                <line x1={PAD_L} y1={Y(y)} x2={W - PAD_R} y2={Y(y)} stroke="#1e293b" />
                <text x={PAD_L - 6} y={Y(y) + 4} fill="#64748b" fontSize={10} textAnchor="end">{frNum(y, 2)}</text>
              </g>
            ))}
            <line x1={PAD_L} y1={Y(1 / Math.SQRT2)} x2={W - PAD_R} y2={Y(1 / Math.SQRT2)} stroke="#10b981" strokeDasharray="4 4" />
            <text x={W - PAD_R - 2} y={Y(1 / Math.SQRT2) - 4} fill="#10b981" fontSize={10} textAnchor="end">I₀/√2</text>
            {[0.5, 1, 1.5, 2, 2.5].map((x) => (
              <text key={x} x={X(x)} y={H - 10} fill="#64748b" fontSize={10} textAnchor="middle">{frNum(x * f0, 0)}</text>
            ))}
            <text x={W - PAD_R} y={H - 0} fill="#64748b" fontSize={10} textAnchor="end">f (Hz)</text>
            <line x1={X(1)} y1={PAD_T} x2={X(1)} y2={H - PAD_B} stroke="#f472b6" strokeDasharray="3 4" />
            <text x={X(1) + 4} y={PAD_T + 10} fill="#f472b6" fontSize={10}>f₀</text>
            <polyline points={curve} fill="none" stroke="#f59e0b" strokeWidth={2.5} />
            {/* Point de fonctionnement */}
            <circle cx={X(ratio)} cy={Y(I / I0)} r={6} fill="#38bdf8" stroke="#020617" strokeWidth={2} />
          </svg>
        </div>
        <LivePlot buffer={buf} series={SERIES} yMin={-1.1} yMax={1.1} height={170} windowSeconds={4} xLabel="t / T" />
      </div>

      <ParamPanel>
        <Slider label="Fréquence du GBF f" value={ratio} unit="Hz" min={0.2} max={X_MAX} step={0.01}
          format={(v) => frNum(v * f0, 1)} onChange={(v) => { setRatio(v); clear(); }} />
        <Slider label="Résistance R" value={R} unit="Ω" min={5} max={300} step={5} digits={0} onChange={(v) => { setR(v); clear(); }} />
        <Slider label="Inductance L" value={L} unit="H" min={0.05} max={1} step={0.05} onChange={(v) => { setL(v); clear(); }} />
        <Slider label="Capacité C" value={Cmicro} unit="µF" min={0.5} max={20} step={0.5} digits={1} onChange={(v) => { setCmicro(v); clear(); }} />
        <button onClick={() => { setRatio(1); clear(); }} className="w-full px-3 py-2 rounded-md bg-pink-500/15 hover:bg-pink-500/25 text-pink-300 text-sm font-semibold">
          Se placer à la résonance
        </button>
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={() => { setRunning(false); clear(); }} playLabel="Oscilloscope" />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="f₀ = 1/(2π√LC)" value={`${frNum(f0, 1)} Hz`} />
          <Stat label="Impédance Z" value={`${frNum(Z, 1)} Ω`} />
          <Stat label="Intensité I" value={`${frNum(I * 1000, 1)} mA`} tone="sky" />
          <Stat label="Déphasage φ" value={`${frNum(phiDeg, 1)}°`} tone={nature === 'résonance' ? 'emerald' : 'amber'} />
          <Stat label="Facteur Q" value={frNum(qualityFactor(R, L, C), 2)} />
          <Stat label="Bande Δf" value={`${frNum(bandwidth(R, L), 1)} Hz`} tone="emerald" />
          <Stat label="Puissance P" value={`${frNum(averagePower(U_EFF, R, L, C, w) * 1000, 0)} mW`} />
          <Stat label="Circuit" value={nature} tone="rose" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Le GBF délivre U = {U_EFF} V efficaces. Diminue R : la résonance devient plus aiguë (Q augmente, la bande passante
          verte se rétrécit). À la résonance, u et i sont en phase.
        </p>
      </ParamPanel>
    </div>
  );
}
