'use client';

import { useRef, useState } from 'react';
import { Power } from 'lucide-react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import { Slider, Stat, ParamPanel, frNum } from '@/cecp/components/sim/Controls';
import { rlTimeConstant, rlSteadyCurrent, magneticEnergy } from '@/cecp/lib/physics/electric';

const SERIES: PlotSeries[] = [
  { label: 'i / I₀ (intensité)', color: '#f59e0b' },
  { label: 'u_L / E (tension de la bobine)', color: '#38bdf8' },
];

/** Vitesse de l'animation : nombre de constantes de temps par seconde reelle */
const TAU_PER_SECOND = 0.8;

/** Chemin du circuit (rectangle) parcouru par les charges */
const LOOP = { x1: 90, y1: 50, x2: 710, y2: 250 };
const PERIM = 2 * (LOOP.x2 - LOOP.x1 + LOOP.y2 - LOOP.y1);
function pointOnLoop(s: number) {
  const w = LOOP.x2 - LOOP.x1, h = LOOP.y2 - LOOP.y1;
  let d = ((s % PERIM) + PERIM) % PERIM;
  if (d < w) return { x: LOOP.x1 + d, y: LOOP.y1 };
  d -= w;
  if (d < h) return { x: LOOP.x2, y: LOOP.y1 + d };
  d -= h;
  if (d < w) return { x: LOOP.x2 - d, y: LOOP.y2 };
  d -= w;
  return { x: LOOP.x1, y: LOOP.y2 - d };
}

export function RLSimulation() {
  const [E, setE] = useState(6);
  const [R, setR] = useState(50);
  const [L, setL] = useState(0.5);
  const [closed, setClosed] = useState(false);
  const [running, setRunning] = useState(false);
  const i = useRef(0);
  const u = useRef(0); // temps reduit t / tau
  const drift = useRef(0); // position des charges le long du circuit
  const buf = useRef<PlotSample[]>([]);
  // Valeurs affichees (copiees depuis les refs a chaque image)
  const [view, setView] = useState({ i: 0, u: 0, drift: 0 });

  const tau = rlTimeConstant(L, R);
  const I0 = rlSteadyCurrent(E, R);

  const reset = () => {
    setRunning(false);
    setClosed(false);
    i.current = 0;
    u.current = 0;
    buf.current = [];
    drift.current = 0;
    setView({ i: 0, u: 0, drift: 0 });
  };

  const toggleSwitch = () => {
    setClosed((c) => !c);
    setRunning(true);
  };

  useAnimationFrame((dt) => {
    const du = dt * TAU_PER_SECOND;
    const target = closed ? I0 : 0;
    // Solution exacte de L di/dt + R i = E (ou 0) sur l'intervalle du
    i.current = target + (i.current - target) * Math.exp(-du);
    u.current += du;
    drift.current += (i.current / Math.max(I0, 1e-9)) * dt * 120;
    const uL = closed ? E - R * i.current : -R * i.current;
    buf.current.push({ t: u.current, values: [i.current / I0, uL / E] });
    if (buf.current.length > 1500) buf.current.shift();
    setView({ i: i.current, u: u.current, drift: drift.current });
  }, running);

  const ratio = Math.min(1, view.i / I0);
  const uL = closed ? E - R * view.i : -R * view.i;
  const dots = Array.from({ length: 24 }, (_, k) => pointOnLoop(view.drift + (k * PERIM) / 24));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 800 300" className="w-full h-auto" role="img" aria-label="Circuit RL : générateur, interrupteur, résistance et bobine">
            {/* Fils */}
            <rect x={LOOP.x1} y={LOOP.y1} width={LOOP.x2 - LOOP.x1} height={LOOP.y2 - LOOP.y1} fill="none" stroke="#475569" strokeWidth={3} />
            {/* Generateur */}
            <rect x={LOOP.x1 - 22} y={120} width={44} height={60} fill="#0f172a" stroke="#475569" strokeWidth={3} />
            <line x1={LOOP.x1 - 14} y1={140} x2={LOOP.x1 + 14} y2={140} stroke="#f87171" strokeWidth={4} />
            <line x1={LOOP.x1 - 8} y1={160} x2={LOOP.x1 + 8} y2={160} stroke="#94a3b8" strokeWidth={4} />
            <text x={LOOP.x1 - 34} y={155} fill="#e2e8f0" fontSize={14} textAnchor="end">E = {frNum(E, 1)} V</text>
            {/* Interrupteur */}
            <rect x={230} y={LOOP.y1 - 14} width={80} height={28} fill="#020617" />
            <circle cx={235} cy={LOOP.y1} r={5} fill="#cbd5e1" />
            <circle cx={305} cy={LOOP.y1} r={5} fill="#cbd5e1" />
            <line x1={235} y1={LOOP.y1} x2={closed ? 305 : 295} y2={closed ? LOOP.y1 : LOOP.y1 - 30} stroke="#cbd5e1" strokeWidth={4} strokeLinecap="round" />
            <text x={270} y={LOOP.y1 - 22} fill="#94a3b8" fontSize={13} textAnchor="middle">K</text>
            {/* Resistance */}
            <rect x={430} y={LOOP.y1 - 14} width={110} height={28} rx={3} fill="#0f172a" stroke="#f59e0b" strokeWidth={3} />
            <text x={485} y={LOOP.y1 + 5} fill="#f59e0b" fontSize={13} textAnchor="middle">R = {frNum(R, 0)} Ω</text>
            {/* Bobine */}
            <rect x={LOOP.x2 - 30} y={95} width={60} height={110} fill="#020617" />
            {Array.from({ length: 6 }, (_, k) => (
              <path key={k} d={`M ${LOOP.x2} ${100 + k * 17} a 16 9 0 1 1 0 17`} fill="none" stroke="#38bdf8" strokeWidth={3}
                opacity={0.5 + 0.5 * ratio} />
            ))}
            <rect x={LOOP.x2 - 34} y={95} width={68} height={110} rx={8} fill="#38bdf8" opacity={0.12 * ratio * ratio} />
            <text x={LOOP.x2 + 42} y={155} fill="#38bdf8" fontSize={14}>L = {frNum(L, 2)} H</text>
            {/* Charges en mouvement */}
            {running && dots.map((p, k) => (
              <circle key={k} cx={p.x} cy={p.y} r={3.5} fill="#fde68a" opacity={0.25 + 0.75 * ratio} />
            ))}
            {/* Mesures */}
            <text x={400} y={150} fill="#f59e0b" fontSize={16} fontFamily="monospace" textAnchor="middle">
              i = {frNum(view.i * 1000, 1)} mA
            </text>
            <text x={400} y={175} fill="#38bdf8" fontSize={14} fontFamily="monospace" textAnchor="middle">
              u_L = {frNum(uL, 2)} V
            </text>
            <text x={400} y={200} fill="#64748b" fontSize={12} fontFamily="monospace" textAnchor="middle">
              t = {frNum(view.u, 2)} τ
            </text>
          </svg>
        </div>
        <LivePlot buffer={buf} series={SERIES} yMin={-1.1} yMax={1.1} height={190} windowSeconds={8} xLabel="t / τ" />
        <p className="text-xs text-slate-500">
          L&apos;animation est ralentie : une constante de temps τ dure environ 1,25 s à l&apos;écran. À l&apos;ouverture,
          le courant s&apos;éteint progressivement à travers une diode de roue libre (montée en parallèle sur la bobine).
        </p>
      </div>

      <ParamPanel>
        <Slider label="Tension E" value={E} unit="V" min={1} max={12} step={0.5} digits={1} onChange={(v) => { setE(v); reset(); }} />
        <Slider label="Résistance totale R" value={R} unit="Ω" min={10} max={200} step={5} digits={0} onChange={(v) => { setR(v); reset(); }} />
        <Slider label="Inductance L" value={L} unit="H" min={0.05} max={2} step={0.05} onChange={(v) => { setL(v); reset(); }} />
        <div className="flex gap-2">
          <button
            onClick={toggleSwitch}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-semibold ${
              closed ? 'bg-rose-500 hover:bg-rose-400 text-white' : 'bg-amber-500 hover:bg-amber-400 text-slate-900'
            }`}
          >
            <Power size={16} /> {closed ? 'Ouvrir K' : 'Fermer K'}
          </button>
          <button onClick={reset} className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm">
            Réinitialiser
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Constante τ = L/R" value={`${frNum(tau * 1000, 1)} ms`} />
          <Stat label="I₀ = E/R" value={`${frNum(I0 * 1000, 0)} mA`} />
          <Stat label="i / I₀" value={`${frNum(ratio * 100, 0)} %`} tone="sky" />
          <Stat label="Énergie ½Li²" value={`${frNum(magneticEnergy(L, view.i) * 1000, 2)} mJ`} tone="emerald" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Ferme l&apos;interrupteur : la bobine s&apos;oppose à l&apos;augmentation du courant (u_L = E au départ). Au bout de τ,
          i atteint 63 % de I₀. Double L ou divise R par deux : τ double.
        </p>
      </ParamPanel>
    </div>
  );
}
