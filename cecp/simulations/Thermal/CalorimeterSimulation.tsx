'use client';

import { useRef, useState } from 'react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { LivePlot, type PlotSample, type PlotSeries } from '@/cecp/components/sim/LivePlot';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import {
  C_WATER, C_ALUMINIUM, C_IRON, C_COPPER, equilibriumTemperature, mixWaterIce, heat,
} from '@/cecp/lib/physics/thermal';

type Material = 'eau' | 'aluminium' | 'fer' | 'cuivre' | 'glace';

const MATERIALS: Record<Material, { label: string; c: number; color: string }> = {
  eau: { label: 'Eau chaude', c: C_WATER, color: '#f87171' },
  aluminium: { label: 'Aluminium', c: C_ALUMINIUM, color: '#cbd5e1' },
  fer: { label: 'Fer', c: C_IRON, color: '#78716c' },
  cuivre: { label: 'Cuivre', c: C_COPPER, color: '#d97706' },
  glace: { label: 'Glace', c: 2100, color: '#bae6fd' },
};

const SERIES: PlotSeries[] = [
  { label: 'θ eau du calorimètre (°C)', color: '#38bdf8' },
  { label: 'θ corps ajouté (°C)', color: '#f87171' },
];

/** Constante de temps de l'animation (s reelles) : animation schematique */
const TAU = 1.6;

function Thermometer({ x, theta, label, color }: { x: number; theta: number; label: string; color: string }) {
  const y = (th: number) => 200 - ((th + 20) / 120) * 170; // -20 .. 100 °C
  return (
    <g>
      <rect x={x - 7} y={25} width={14} height={180} rx={7} fill="#0f172a" stroke="#475569" />
      <rect x={x - 4} y={y(theta)} width={8} height={Math.max(0, 205 - y(theta))} fill={color} />
      <circle cx={x} cy={210} r={12} fill={color} />
      {[-20, 0, 20, 40, 60, 80, 100].map((g) => (
        <g key={g}>
          <line x1={x + 8} y1={y(g)} x2={x + 14} y2={y(g)} stroke="#64748b" />
          <text x={x + 17} y={y(g) + 3} fill="#64748b" fontSize={9}>{g}</text>
        </g>
      ))}
      <text x={x} y={240} fill={color} fontSize={12} textAnchor="middle" fontWeight={600}>{label}</text>
      <text x={x} y={255} fill="#e2e8f0" fontSize={12} textAnchor="middle" fontFamily="monospace">{frNum(theta, 1)} °C</text>
    </g>
  );
}

export function CalorimeterSimulation() {
  const [m1, setM1] = useState(200); // g
  const [th1, setTh1] = useState(20);
  const [Ccal, setCcal] = useState(100);
  const [mat, setMat] = useState<Material>('fer');
  const [m2, setM2] = useState(150);
  const [th2, setTh2] = useState(98);
  const [running, setRunning] = useState(false);
  const t = useRef(0);
  const buf = useRef<PlotSample[]>([]);
  const [time, setTime] = useState(0); // copie de t pour le rendu

  const isIce = mat === 'glace';
  const c2 = MATERIALS[mat].c;
  const iceRes = isIce ? mixWaterIce(m1 / 1000, th1, m2 / 1000, th2, Ccal) : null;
  const thetaF = iceRes
    ? iceRes.theta
    : equilibriumTemperature([{ C: (m1 / 1000) * C_WATER + Ccal, theta: th1 }, { C: (m2 / 1000) * c2, theta: th2 }]);

  const reset = () => { setRunning(false); t.current = 0; buf.current = []; setTime(0); };

  const temps = (time: number) => {
    const p = 1 - Math.exp(-time / TAU);
    const water = th1 + (thetaF - th1) * p;
    if (!isIce) return { water, body: th2 + (thetaF - th2) * p, melted: 0 };
    // Glace : rechauffement jusqu'a 0 °C, fusion a 0 °C, puis rechauffement de l'eau de fonte
    let body: number;
    if (p < 0.2) body = th2 + (0 - th2) * (p / 0.2);
    else if (p < 0.7) body = 0;
    else body = thetaF * ((p - 0.7) / 0.3);
    if (thetaF < 0) body = th2 + (thetaF - th2) * p;
    const melted = Math.max(0, iceRes?.meltedIce ?? 0) * Math.min(1, Math.max(0, (p - 0.2) / 0.5));
    return { water, body, melted };
  };

  useAnimationFrame((dt) => {
    t.current += dt;
    const s = temps(t.current);
    buf.current.push({ t: t.current, values: [s.water, s.body] });
    if (buf.current.length > 1500) buf.current.shift();
    if (t.current > 10 * TAU) setRunning(false);
    setTime(t.current);
  }, running);

  const now = temps(time);
  const Q1 = heat(m1 / 1000, C_WATER, th1, thetaF) + Ccal * (thetaF - th1);
  const iceLeft = isIce ? m2 - now.melted * 1000 : 0;

  const changeMat = (m: Material) => {
    setMat(m);
    if (m === 'glace') { setTh2(-10); setM2(50); setTh1(40); }
    else if (th2 < 30) setTh2(m === 'eau' ? 80 : 98);
    reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 800 270" className="w-full h-auto" role="img" aria-label="Calorimètre et thermomètres">
            {/* Calorimetre */}
            <rect x={300} y={60} width={220} height={170} rx={12} fill="#1e293b" stroke="#64748b" strokeWidth={4} />
            <rect x={315} y={75} width={190} height={145} rx={8} fill="#020617" />
            <rect x={315} y={120} width={190} height={100} rx={6} fill="#0ea5e9" opacity={0.25 + 0.4 * Math.min(1, Math.max(0, now.water / 100))} />
            {/* Corps ajoute */}
            {running || time > 0 ? (
              isIce
                ? iceLeft > 0.5 && <rect x={395 - Math.sqrt(iceLeft) * 3} y={125} width={Math.sqrt(iceLeft) * 6} height={Math.sqrt(iceLeft) * 6} rx={4} fill="#e0f2fe" opacity={0.9} />
                : <rect x={380} y={170} width={60} height={40} rx={4} fill={MATERIALS[mat].color} />
            ) : (
              <rect x={380} y={10} width={60} height={isIce ? 40 : 40} rx={4} fill={MATERIALS[mat].color} />
            )}
            <text x={410} y={252} fill="#94a3b8" fontSize={12} textAnchor="middle">Calorimètre (C = {frNum(Ccal, 0)} J/K)</text>
            <text x={410} y={110} fill="#bae6fd" fontSize={12} textAnchor="middle">{frNum(m1, 0)} g d&apos;eau</text>
            <Thermometer x={120} theta={now.water} label="Eau" color="#38bdf8" />
            <Thermometer x={680} theta={now.body} label={MATERIALS[mat].label} color={MATERIALS[mat].color} />
          </svg>
        </div>
        <LivePlot buffer={buf} series={SERIES} yMin={-25} yMax={105} height={170} windowSeconds={12} xLabel="t (animation)" />
        <p className="text-xs text-slate-500">
          L&apos;évolution des températures est schématique (la durée réelle dépend de l&apos;agitation et du calorimètre) ;
          la température finale, elle, est calculée exactement par le bilan Σ Q = 0.
        </p>
      </div>

      <ParamPanel>
        <Slider label="Masse d'eau m₁" value={m1} unit="g" min={50} max={500} step={10} digits={0} onChange={(v) => { setM1(v); reset(); }} />
        <Slider label="Température de l'eau θ₁" value={th1} unit="°C" min={0} max={60} step={1} digits={0} onChange={(v) => { setTh1(v); reset(); }} />
        <Slider label="Capacité du calorimètre C" value={Ccal} unit="J/K" min={0} max={400} step={10} digits={0} onChange={(v) => { setCcal(v); reset(); }} />
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Corps ajouté</span>
          <select value={mat} onChange={(e) => changeMat(e.target.value as Material)}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-200">
            {(Object.keys(MATERIALS) as Material[]).map((k) => (
              <option key={k} value={k}>{MATERIALS[k].label} (c = {MATERIALS[k].c})</option>
            ))}
          </select>
        </label>
        <Slider label="Masse m₂" value={m2} unit="g" min={10} max={400} step={10} digits={0} onChange={(v) => { setM2(v); reset(); }} />
        <Slider label="Température θ₂" value={th2} unit="°C" min={isIce ? -30 : 30} max={isIce ? 0 : 100} step={1} digits={0} onChange={(v) => { setTh2(v); reset(); }} />
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} playLabel="Mélanger" />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Température finale" value={`${frNum(thetaF, 1)} °C`} tone="emerald" />
          <Stat label="Chaleur reçue eau + calo" value={`${frNum(Q1 / 1000, 2)} kJ`} tone="sky" />
          {isIce && iceRes && (
            <>
              <Stat label={iceRes.meltedIce >= 0 ? 'Glace fondue' : 'Eau gelée'} value={`${frNum(Math.abs(iceRes.meltedIce) * 1000, 0)} g`} />
              <Stat label="Toute la glace fond ?" value={iceRes.allMelted ? 'oui' : 'non (0 °C)'} tone="rose" />
            </>
          )}
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Compare un bloc de fer et un bloc d&apos;aluminium de même masse : l&apos;aluminium, de plus grande capacité thermique
          massique, réchauffe davantage l&apos;eau.
        </p>
      </ParamPanel>
    </div>
  );
}
