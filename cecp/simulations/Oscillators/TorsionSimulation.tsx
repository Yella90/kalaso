'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import { useSimClock, useDerived, polyline, SimSvg, ScopeFrame, LiveText } from '@/cecp/components/sim/motion-sim';
import {
  torsionPeriod, torsionOmega, rodInertia, twoMassesInertia, torsionEnergy,
} from '@/cecp/lib/physics/torsion';

/** Tige de base : 100 g, 30 cm */
const ROD_M = 0.1, ROD_L = 0.3;
const J_ROD = rodInertia(ROD_M, ROD_L);
const WINDOW = 8; // s affichees sur le graphe theta(t)

// Vue de dessus
const TX = 380, TY = 130, TR = 105; // TR px = demi-longueur de la tige (15 cm)
const PX_PER_M = TR / (ROD_L / 2);
// Vue de cote
const SX = 130, SY = 160;

export function TorsionSimulation() {
  const [Cmilli, setCmilli] = useState(4);
  const [mg, setMg] = useState(50);
  const [dcm, setDcm] = useState(10);
  const [thetaM, setThetaM] = useState(0.8);
  const [running, setRunning] = useState(false);
  const { t, reset } = useSimClock(running, 1);

  const C = Cmilli * 1e-3;
  const m = mg / 1000, d = dcm / 100;
  const J = J_ROD + twoMassesInertia(m, d);
  const T = torsionPeriod(J, C);
  const w = torsionOmega(J, C);
  const E = torsionEnergy(C, thetaM);
  const key = `${Cmilli}-${mg}-${dcm}-${thetaM}`;

  const theta = useDerived(t, (s) => thetaM * Math.cos(w * s), key);

  // Vue de dessus : extremites de la tige et masses
  const rodX1 = useDerived(theta, (a) => TX + TR * Math.cos(a), key);
  const rodY1 = useDerived(theta, (a) => TY + TR * Math.sin(a), key);
  const rodX2 = useDerived(theta, (a) => TX - TR * Math.cos(a), key);
  const rodY2 = useDerived(theta, (a) => TY - TR * Math.sin(a), key);
  const dpx = d * PX_PER_M;
  const mX1 = useDerived(theta, (a) => TX + dpx * Math.cos(a), key);
  const mY1 = useDerived(theta, (a) => TY + dpx * Math.sin(a), key);
  const mX2 = useDerived(theta, (a) => TX - dpx * Math.cos(a), key);
  const mY2 = useDerived(theta, (a) => TY - dpx * Math.sin(a), key);
  const arc = useDerived(theta, (a) => {
    const r = 46, large = Math.abs(a) > Math.PI ? 1 : 0, sweep = a > 0 ? 1 : 0;
    return `M${TX + r},${TY} A${r},${r} 0 ${large} ${sweep} ${TX + r * Math.cos(a)},${TY + r * Math.sin(a)}`;
  }, key);

  // Vue de cote (perspective) : la tige tourne dans un plan horizontal
  const sideX1 = useDerived(theta, (a) => SX + 95 * Math.cos(a), key);
  const sideY1 = useDerived(theta, (a) => SY + 22 * Math.sin(a), key);
  const sideX2 = useDerived(theta, (a) => SX - 95 * Math.cos(a), key);
  const sideY2 = useDerived(theta, (a) => SY - 22 * Math.sin(a), key);
  const sdx = (d / (ROD_L / 2)) * 95;
  const sMX1 = useDerived(theta, (a) => SX + sdx * Math.cos(a), key);
  const sMY1 = useDerived(theta, (a) => SY + (22 * sdx / 95) * Math.sin(a), key);
  const sMX2 = useDerived(theta, (a) => SX - sdx * Math.cos(a), key);
  const sMY2 = useDerived(theta, (a) => SY - (22 * sdx / 95) * Math.sin(a), key);
  const twist = useDerived(theta, (a) => `M${SX},40 C${SX + 14 * a},80 ${SX - 14 * a},110 ${SX},${SY}`, key);

  // Energies (barres)
  const BAR_H = 150;
  const epH = useDerived(theta, (a) => BAR_H * (a * a) / (thetaM * thetaM || 1), key);
  const ecH = useDerived(theta, (a) => BAR_H * (1 - (a * a) / (thetaM * thetaM || 1)), key);
  const epY = useDerived(epH, (h) => 210 - h, key);
  const ecY = useDerived(ecH, (h) => 210 - h, key);

  // Graphe theta(t)
  const GX = 30, GY = 240, GW = 580, GH = 92;
  const graph = useDerived(t, (s) => polyline(220,
    (i) => GX + (i / 219) * GW,
    (i) => {
      const time = s - WINDOW * (1 - i / 219);
      return time < 0 ? NaN : GY + GH / 2 - (GH / 2 - 6) * (thetaM / 1.6) * Math.cos(w * time);
    }), key);

  const massR = 4 + mg / 12;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={340} label="Pendule de torsion vu de côté et de dessus, énergies et graphe de l'angle">
          {/* Vue de cote */}
          <text x={SX} y={20} textAnchor="middle" fill="#64748b" fontSize={11}>vue de côté</text>
          <rect x={SX - 60} y={30} width={120} height={10} rx={2} fill="#475569" />
          <motion.path d={twist} stroke="#cbd5e1" strokeWidth={2} fill="none" />
          <motion.line x1={sideX1} y1={sideY1} x2={sideX2} y2={sideY2} stroke="#a3e635" strokeWidth={8} strokeLinecap="round" />
          {mg > 0 && <>
            <motion.circle cx={sMX1} cy={sMY1} r={massR} fill="#f59e0b" />
            <motion.circle cx={sMX2} cy={sMY2} r={massR} fill="#f59e0b" />
          </>}
          <ellipse cx={SX} cy={SY} rx={100} ry={24} fill="none" stroke="#1e293b" strokeDasharray="4 4" />

          {/* Vue de dessus */}
          <text x={TX} y={20} textAnchor="middle" fill="#64748b" fontSize={11}>vue de dessus</text>
          <circle cx={TX} cy={TY} r={TR + 8} fill="#0b1222" stroke="#1e293b" />
          <line x1={TX - TR - 8} x2={TX + TR + 8} y1={TY} y2={TY} stroke="#334155" strokeDasharray="5 5" />
          <motion.path d={arc} stroke="#f472b6" strokeWidth={2} fill="none" />
          <motion.line x1={rodX1} y1={rodY1} x2={rodX2} y2={rodY2} stroke="#a3e635" strokeWidth={7} strokeLinecap="round" />
          {mg > 0 && <>
            <motion.circle cx={mX1} cy={mY1} r={massR} fill="#f59e0b" />
            <motion.circle cx={mX2} cy={mY2} r={massR} fill="#f59e0b" />
          </>}
          <circle cx={TX} cy={TY} r={5} fill="#e2e8f0" />
          <text x={TX + 52} y={TY - 6} fill="#f472b6" fontSize={12}>θ</text>

          {/* Energies */}
          <text x={565} y={20} textAnchor="middle" fill="#64748b" fontSize={11}>énergies</text>
          <line x1={525} x2={610} y1={210 - BAR_H} y2={210 - BAR_H} stroke="#e2e8f0" strokeDasharray="3 3" />
          <motion.rect x={530} width={30} y={ecY} height={ecH} fill="#38bdf8" rx={3} />
          <motion.rect x={572} width={30} y={epY} height={epH} fill="#f472b6" rx={3} />
          <text x={545} y={226} textAnchor="middle" fill="#38bdf8" fontSize={11}>Ec</text>
          <text x={587} y={226} textAnchor="middle" fill="#f472b6" fontSize={11}>Ep</text>

          {/* Graphe */}
          <ScopeFrame x={GX} y={GY} w={GW} h={GH} label="θ(t) sur les 8 dernières secondes" />
          <motion.path d={graph} fill="none" stroke="#f472b6" strokeWidth={2} />
        </SimSvg>
        <p className="text-sm text-slate-400">
          Angle actuel : <LiveText value={theta} format={(a) => `${frNum(a, 2)} rad`} className="font-mono text-pink-400" />
        </p>
      </div>

      <ParamPanel>
        <Slider label="Constante de torsion C" value={Cmilli} unit="×10⁻³ N·m/rad" min={1} max={10} step={0.1} digits={1} onChange={setCmilli} />
        <Slider label="Masse de chaque surcharge m" value={mg} unit="g" min={0} max={100} step={5} digits={0} onChange={setMg} />
        <Slider label="Distance à l'axe d" value={dcm} unit="cm" min={2} max={14} step={0.5} digits={1} onChange={setDcm} />
        <Slider label="Amplitude θₘ" value={thetaM} unit="rad" min={0.1} max={1.5} step={0.05} digits={2} onChange={setThetaM} />
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="J = J₀ + 2md²" value={`${frNum(J * 1e4, 2)}·10⁻⁴ kg·m²`} />
          <Stat label="T₀ = 2π√(J/C)" value={`${frNum(T, 2)} s`} tone="emerald" />
          <Stat label="ω₀ = √(C/J)" value={`${frNum(w, 2)} rad/s`} tone="sky" />
          <Stat label="E = ½Cθₘ²" value={`${frNum(E * 1e3, 2)} mJ`} tone="rose" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Tige seule : 100 g, 30 cm (J₀ = ML²/12). Éloigne les surcharges de l&apos;axe : J augmente et les oscillations ralentissent.
          La période ne dépend pas de l&apos;amplitude (isochronisme).
        </p>
      </ParamPanel>
    </div>
  );
}
