'use client';

import { useRef, useState } from 'react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import { elongation, wavelength, phaseRelation, apparentFrequency } from '@/cecp/lib/physics/waves';

const SERIES: PlotSeries[] = [
  { label: 'y_S(t) source', color: '#f59e0b' },
  { label: 'y_M(t) point M', color: '#38bdf8' },
];

const ROPE_LEN = 1; // m
const X0 = 50, X1 = 770, Y0 = 130;
const PX_PER_M = (X1 - X0) / ROPE_LEN;
const PX_PER_CM_Y = 14; // exageration verticale
/** Periodes par seconde reelle en mode ralenti */
const SLOW_PERIODS_PER_SECOND = 0.6;

export function RopeWaveSimulation() {
  const [N, setN] = useState(50);
  const [v, setV] = useState(10);
  const [aCm, setACm] = useState(2);
  const [xM, setXM] = useState(0.5);
  const [strobe, setStrobe] = useState(false);
  const [Ne, setNe] = useState(49);
  const [running, setRunning] = useState(false);
  const t = useRef(0); // temps physique (s)
  const buf = useRef<PlotSample[]>([]);
  const [time, setTime] = useState(0); // copie de t pour le rendu

  const lambda = wavelength(v, N);
  const a = aCm / 100;

  const reset = () => { setRunning(false); t.current = 0; buf.current = []; setTime(0); };

  useAnimationFrame((dt) => {
    if (strobe) {
      t.current += dt; // temps reel : on observe sous eclairage stroboscopique
    } else {
      t.current += (dt * SLOW_PERIODS_PER_SECOND) / N;
      buf.current.push({ t: t.current * N, values: [elongation(a, N, v, 0, t.current) * 100, elongation(a, N, v, xM, t.current) * 100] });
      if (buf.current.length > 1500) buf.current.shift();
    }
    setTime(t.current);
  }, running);

  // En mode stroboscopique, on ne "voit" la corde qu'aux instants des eclairs
  const tView = strobe ? Math.floor(time * Ne) / Ne : time;
  const pts: string[] = [];
  for (let k = 0; k <= 400; k++) {
    const x = (k / 400) * ROPE_LEN;
    pts.push(`${X0 + x * PX_PER_M},${Y0 - elongation(a, N, v, x, tView) * 100 * PX_PER_CM_Y}`);
  }
  const yM = elongation(a, N, v, xM, tView);
  const front = Math.min(ROPE_LEN, v * tView);
  const relation = phaseRelation(xM, lambda, 0.02);
  const fa = apparentFrequency(N, Ne);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 800 260" className="w-full h-auto" role="img" aria-label="Onde progressive le long d'une corde">
            <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="#1e293b" strokeDasharray="4 4" />
            {/* Graduations */}
            {Array.from({ length: 11 }, (_, k) => (
              <g key={k}>
                <line x1={X0 + k * 0.1 * PX_PER_M} y1={225} x2={X0 + k * 0.1 * PX_PER_M} y2={232} stroke="#475569" />
                <text x={X0 + k * 0.1 * PX_PER_M} y={246} fill="#64748b" fontSize={10} textAnchor="middle">{k * 10}</text>
              </g>
            ))}
            <text x={X1} y={258} fill="#64748b" fontSize={10} textAnchor="end">x (cm)</text>
            {/* Longueur d'onde */}
            {lambda < ROPE_LEN && (
              <g>
                <line x1={X0} y1={215} x2={X0 + lambda * PX_PER_M} y2={215} stroke="#10b981" strokeWidth={2} />
                <text x={X0 + (lambda * PX_PER_M) / 2} y={210} fill="#10b981" fontSize={12} textAnchor="middle">λ = {frNum(lambda * 100, 1)} cm</text>
              </g>
            )}
            {/* Front de l'onde */}
            {front < ROPE_LEN && running && !strobe && (
              <line x1={X0 + front * PX_PER_M} y1={40} x2={X0 + front * PX_PER_M} y2={220} stroke="#f472b6" strokeDasharray="3 4" opacity={0.6} />
            )}
            {/* Vibreur */}
            <rect x={X0 - 40} y={Y0 - 30} width={30} height={60} rx={4} fill="#334155" />
            <polyline points={pts.join(' ')} fill="none" stroke={strobe ? '#e9d5ff' : '#e2e8f0'} strokeWidth={3} strokeLinejoin="round" />
            <circle cx={X0} cy={Y0 - elongation(a, N, v, 0, tView) * 100 * PX_PER_CM_Y} r={6} fill="#f59e0b" />
            <text x={X0} y={30} fill="#f59e0b" fontSize={13} textAnchor="middle">S</text>
            {/* Point M */}
            <line x1={X0 + xM * PX_PER_M} y1={40} x2={X0 + xM * PX_PER_M} y2={220} stroke="#38bdf8" strokeDasharray="2 5" opacity={0.5} />
            <circle cx={X0 + xM * PX_PER_M} cy={Y0 - yM * 100 * PX_PER_CM_Y} r={7} fill="#38bdf8" />
            <text x={X0 + xM * PX_PER_M} y={30} fill="#38bdf8" fontSize={13} textAnchor="middle">M</text>
            {strobe && <text x={X1} y={24} fill="#c084fc" fontSize={12} textAnchor="end">Éclairage stroboscopique : {frNum(Ne, 1)} Hz</text>}
          </svg>
        </div>
        {!strobe && <LivePlot buffer={buf} series={SERIES} yMin={-aCm * 1.2} yMax={aCm * 1.2} height={160} windowSeconds={4} xLabel="t / T" yLabel="y (cm)" />}
        <p className="text-xs text-slate-500">
          {strobe
            ? 'Mode stroboscope : la corde vibre à sa vraie fréquence, mais tu ne la vois qu\'au moment des éclairs.'
            : 'Mode ralenti : une période dure environ 1,7 s à l\'écran. L\'amplitude verticale est exagérée.'}
        </p>
      </div>

      <ParamPanel>
        <Slider label="Fréquence N" value={N} unit="Hz" min={10} max={100} step={1} digits={0} onChange={(x) => { setN(x); setNe(x - 1); reset(); }} />
        <Slider label="Célérité v" value={v} unit="m/s" min={2} max={30} step={0.5} digits={1} onChange={(x) => { setV(x); reset(); }} />
        <Slider label="Amplitude a" value={aCm} unit="cm" min={0.5} max={4} step={0.5} digits={1} onChange={setACm} />
        <Slider label="Position de M (SM)" value={xM} unit="cm" min={0.02} max={1} step={0.01} format={(x) => frNum(x * 100, 0)} onChange={setXM} />
        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" checked={strobe} onChange={(e) => { setStrobe(e.target.checked); setRunning(true); }} className="accent-violet-500" />
          Stroboscope
        </label>
        {strobe && (
          <Slider label="Fréquence des éclairs Nₑ" value={Ne} unit="Hz" min={Math.max(1, N / 2 - 5)} max={N + 5} step={0.5} digits={1} onChange={setNe} />
        )}
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} playLabel="Lancer le vibreur" />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="λ = v / N" value={`${frNum(lambda * 100, 1)} cm`} tone="emerald" />
          <Stat label="Période T" value={`${frNum(1000 / N, 1)} ms`} />
          <Stat label="Retard de M" value={`${frNum((xM / v) * 1000, 1)} ms`} />
          <Stat label="SM / λ" value={frNum(xM / lambda, 2)} tone="sky" />
        </div>
        <p className="text-xs text-slate-300">
          M et S vibrent : <span className="font-semibold text-amber-400">{relation}</span>
        </p>
        {strobe && (
          <p className="text-xs text-violet-300">
            {Math.abs(fa) < 1e-6
              ? 'Immobilité apparente : N est un multiple de Nₑ.'
              : `Mouvement apparent ralenti (${frNum(Math.abs(fa), 1)} Hz), ${fa > 0 ? 'dans le sens réel' : 'en sens inverse'}.`}
          </p>
        )}
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Place M à un multiple de λ : M et S sont en phase. À λ/2 près : opposition de phase.
        </p>
      </ParamPanel>
    </div>
  );
}
