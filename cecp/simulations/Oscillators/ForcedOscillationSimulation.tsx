'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import { useSimClock, useDerived, polyline, SimSvg, ScopeFrame } from '@/cecp/components/sim/motion-sim';
import { rk4Step, type State2 } from '@/cecp/lib/physics/oscillators';
import {
  naturalFrequency, forcedAmplitude, forcedPhase, resonanceOmega, mechQualityFactor, staticAmplitude, type ForcedParams,
} from '@/cecp/lib/physics/forced-oscillations';

const K = 25;      // N/m
const F0 = 0.4;    // N  (l'excitateur deplace le haut du ressort de a = F0/k = 1,6 cm)
const F_MAX = 4;   // Hz (axe de la courbe de resonance)
const WINDOW = 6;  // s affichees sur le graphe

// Mecanique (colonne de gauche)
const WX = 120, WY = 52, WR = 26;      // roue de l'excitateur
const REST_TOP = 112;                   // haut du ressort au repos
const REST_MASS = 230;                  // haut de la masse au repos

// Courbe de resonance
const CX0 = 270, CX1 = 620, CY0 = 34, CY1 = 178;
// Graphe temporel
const GX = 270, GY = 206, GW = 350, GH = 128;

const r2 = (v: number) => Math.round(v * 100) / 100;

interface Sample { t: number; x: number; e: number }

/** Ressort en zig-zag entre deux ordonnees (centre en WX) */
function springPath(yTop: number, yBottom: number): string {
  const n = 12, w = 14;
  const h = (yBottom - yTop - 16) / n;
  let d = `M${WX},${yTop} l0,8`;
  for (let i = 0; i < n; i++) {
    const dx = i === 0 ? w : i === n - 1 ? -w : (i % 2 ? -2 * w : 2 * w);
    d += ` l${dx},${h.toFixed(2)}`;
  }
  return `${d} L${WX},${yBottom.toFixed(1)}`;
}

export function ForcedOscillationSimulation() {
  const [fEx, setFEx] = useState(1.2);
  const [h, setH] = useState(0.5);
  const [m, setM] = useState(0.25);
  const [running, setRunning] = useState(false);

  const p: ForcedParams = { m, k: K, h, F0 };
  const w = 2 * Math.PI * fEx;
  const N0 = naturalFrequency(p);
  const X = forcedAmplitude(p, w);
  const phi = forcedPhase(p, w);
  const wr = resonanceOmega(p);
  const Q = mechQualityFactor(p);

  // Echelle verticale : la plus grande amplitude possible (sur la courbe) tient dans 90 px
  const curve = useMemo(() => {
    const pts: [number, number][] = [];
    for (let i = 1; i <= 240; i++) {
      const f = (i / 240) * F_MAX;
      pts.push([f, forcedAmplitude({ m, k: K, h, F0 }, 2 * Math.PI * f)]);
    }
    const Xmax = Math.max(...pts.map((q) => q[1]));
    return { pts, Xmax };
  }, [m, h]);
  const pxPerM = Math.min(1500, 90 / curve.Xmax);
  const cxOf = (f: number) => CX0 + (f / F_MAX) * (CX1 - CX0);
  const cyOf = (x: number) => CY1 - (x / curve.Xmax) * (CY1 - CY0 - 10);
  const curvePath = polyline(curve.pts.length, (i) => cxOf(curve.pts[i][0]), (i) => cyOf(curve.pts[i][1]));

  // Integration numerique (RK4) : m x'' + h x' + k x = F0 cos(w t)
  const st = useRef<State2>({ x: 0, v: 0 });
  const buf = useRef<Sample[]>([]);
  const xMV = useMotionValue(0);
  const params = useRef({ m, h, w });
  params.current = { m, h, w };

  const { t, reset } = useSimClock(running, 1, (dt, t0) => {
    const { m: mm, h: hh, w: ww } = params.current;
    const sub = 8, step = dt / sub;
    let s = st.current;
    for (let i = 0; i < sub; i++) {
      const time = t0 + i * step;
      s = rk4Step(s, step, (x, v) => (F0 * Math.cos(ww * time) - hh * v - K * x) / mm);
    }
    st.current = s;
    xMV.set(s.x);
    buf.current.push({ t: t0 + dt, x: s.x, e: Math.cos(ww * (t0 + dt)) });
    if (buf.current.length > 800) buf.current.splice(0, buf.current.length - 800);
  });

  const restart = () => { st.current = { x: 0, v: 0 }; buf.current = []; xMV.set(0); reset(); };

  const key = `${fEx}-${h}-${m}-${pxPerM}`;
  const aPx = (F0 / K) * pxPerM; // deplacement impose au haut du ressort (px)

  // Excitateur
  const pinX = useDerived(t, (s) => WX + (WR - 6) * Math.sin(w * s), key);
  const pinY = useDerived(t, (s) => WY - (WR - 6) * Math.cos(w * s), key);
  const topY = useDerived(t, (s) => REST_TOP + aPx * Math.cos(w * s), key);
  // Resonateur
  const massY = useDerived(xMV, (x) => REST_MASS + x * pxPerM, key);
  const spring = useDerived(massY, (y) => springPath(topY.get(), y), key);

  // Graphe x(t) et excitation
  const graphX = useDerived(t, (s) => {
    const data = buf.current;
    return polyline(data.length, (i) => GX + GW - ((s - data[i].t) / WINDOW) * GW, (i) => GY + GH / 2 - data[i].x * pxPerM * 0.6);
  }, key);
  const graphE = useDerived(t, (s) => {
    const data = buf.current;
    return polyline(data.length, (i) => GX + GW - ((s - data[i].t) / WINDOW) * GW, (i) => GY + GH / 2 - data[i].e * aPx * 0.6);
  }, key);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={350} label="Excitateur, ressort et masse, courbe de résonance et graphe temporel">
          <defs>
            <clipPath id="forced-graph"><rect x={GX} y={GY} width={GW} height={GH} /></clipPath>
          </defs>
          {/* Excitateur */}
          <circle cx={WX} cy={WY} r={WR} fill="#1e293b" stroke="#818cf8" strokeWidth={3} />
          <motion.line x1={WX} y1={WY} x2={pinX} y2={pinY} stroke="#818cf8" strokeWidth={3} />
          <motion.line x1={pinX} y1={pinY} x2={WX} y2={topY} stroke="#a5b4fc" strokeWidth={2} />
          <motion.circle cx={pinX} cy={pinY} r={5} fill="#c7d2fe" />
          <text x={WX + WR + 8} y={WY + 4} fill="#a5b4fc" fontSize={11}>excitateur</text>
          {/* Ressort + masse */}
          <motion.path d={spring} fill="none" stroke="#cbd5e1" strokeWidth={2} />
          <rect x={WX - 60} y={REST_MASS - 70} width={120} height={150} rx={8} fill="#0ea5e9" opacity={Math.min(0.35, h / 6)} />
          <motion.rect x={WX - 28} y={massY} width={56} height={34} rx={6} fill="#f59e0b" />
          <line x1={WX - 70} x2={WX + 70} y1={REST_MASS} y2={REST_MASS} stroke="#475569" strokeDasharray="4 4" />
          <text x={WX - 70} y={REST_MASS - 6} fill="#64748b" fontSize={10}>équilibre</text>
          <text x={WX} y={340} textAnchor="middle" fill="#64748b" fontSize={10}>liquide : frottement h = {frNum(h, 2)} kg/s</text>

          {/* Courbe de resonance */}
          <rect x={CX0} y={CY0 - 14} width={CX1 - CX0} height={CY1 - CY0 + 14} rx={6} fill="#0b1222" stroke="#1e293b" />
          <text x={CX0 + 8} y={CY0} fill="#64748b" fontSize={11}>amplitude X en fonction de la fréquence N</text>
          <line x1={cxOf(N0)} x2={cxOf(N0)} y1={CY0 + 4} y2={CY1} stroke="#475569" strokeDasharray="3 4" />
          <text x={cxOf(N0) + 4} y={CY1 - 4} fill="#64748b" fontSize={10}>N₀</text>
          <path d={curvePath} fill="none" stroke="#34d399" strokeWidth={2.2} />
          {[1, 2, 3, 4].map((f) => (
            <text key={f} x={cxOf(f)} y={CY1 + 12} textAnchor="middle" fill="#64748b" fontSize={10}>{f} Hz</text>
          ))}
          <motion.circle
            r={7} fill="#f59e0b" stroke="#0f172a" strokeWidth={2}
            initial={false}
            animate={{ cx: r2(cxOf(fEx)), cy: r2(cyOf(X)) }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />

          {/* Graphe temporel */}
          <ScopeFrame x={GX} y={GY} w={GW} h={GH} label="x(t) en orange, excitateur en violet" />
          <g clipPath="url(#forced-graph)">
            <motion.path d={graphE} fill="none" stroke="#818cf8" strokeWidth={1.5} strokeDasharray="4 3" />
            <motion.path d={graphX} fill="none" stroke="#f59e0b" strokeWidth={2} />
          </g>
        </SimSvg>
        <p className="text-[11px] text-slate-500">
          Au démarrage on observe un régime transitoire, puis la masse oscille à la fréquence de l&apos;excitateur.
          Règle N près de N₀ : c&apos;est la résonance.
        </p>
      </div>

      <ParamPanel>
        <Slider label="Fréquence de l'excitateur N" value={fEx} unit="Hz" min={0.2} max={F_MAX} step={0.02} digits={2} onChange={setFEx} />
        <Slider label="Frottement h" value={h} unit="kg/s" min={0.1} max={3} step={0.05} digits={2} onChange={setH} />
        <Slider label="Masse m" value={m} unit="kg" min={0.1} max={1} step={0.01} digits={2} onChange={setM} />
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={restart} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="N₀ = √(k/m)/2π" value={`${frNum(N0, 2)} Hz`} tone="emerald" />
          <Stat label="Nᵣ (résonance)" value={wr ? `${frNum(wr / (2 * Math.PI), 2)} Hz` : 'aucune'} tone="emerald" />
          <Stat label="Amplitude X" value={`${frNum(X * 100, 2)} cm`} />
          <Stat label="X / X₀ (X₀ = F₀/k)" value={frNum(X / staticAmplitude(p), 2)} />
          <Stat label="Retard φ" value={`${frNum((phi * 180) / Math.PI, 0)}°`} tone="sky" />
          <Stat label="Q = mω₀/h" value={frNum(Q, 1)} tone="rose" />
        </div>
        <p className="text-[11px] text-slate-500">k = 25 N/m, F₀ = 0,4 N.</p>
      </ParamPanel>
    </div>
  );
}
