'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Stat, ParamPanel, frNum } from '@/cecp/components/sim/Controls';
import { polyline, SimSvg } from '@/cecp/components/sim/motion-sim';
import {
  NUCLEI, massDefect, nucleusBinding, nucleusBindingPerNucleon, neutrons, nuclearRadius, astonCurve, M_PROTON, M_NEUTRON,
} from '@/cecp/lib/physics/nucleus';

// Zone des nucleons
const NX = 170, NY = 150, R_MAX = 112;
const ZONE = { x0: 24, x1: 316, y0: 34, y1: 286 };
// Courbe d'Aston
const AX0 = 372, AX1 = 620, AY0 = 40, AY1 = 270;
const A_MAX = 240, B_MAX = 9.5;
const axOf = (A: number) => AX0 + (A / A_MAX) * (AX1 - AX0);
const ayOf = (b: number) => AY1 - (b / B_MAX) * (AY1 - AY0);

const r2 = (v: number) => Math.round(v * 100) / 100;

interface Nucleon { proton: boolean; bx: number; by: number; sx: number; sy: number }

/** Positions des nucleons : noyau compact (spirale de Fibonacci) ou nucleons disperses */
function layout(Z: number, A: number): { list: Nucleon[]; r: number; R: number } {
  const r = Math.max(3.2, Math.min(15, R_MAX / Math.sqrt(A / 0.82)));
  const R = r * Math.sqrt(A / 0.82);
  const cols = Math.ceil(Math.sqrt(A * ((ZONE.x1 - ZONE.x0) / (ZONE.y1 - ZONE.y0))));
  const rows = Math.ceil(A / cols);
  const dx = (ZONE.x1 - ZONE.x0) / cols, dy = (ZONE.y1 - ZONE.y0) / rows;
  const list: Nucleon[] = [];
  for (let k = 0; k < A; k++) {
    const rad = R * Math.sqrt((k + 0.5) / A), th = k * 2.39996;
    const jx = (((k * 7919) % 97) / 97 - 0.5) * dx * 0.5;
    const jy = (((k * 104729) % 89) / 89 - 0.5) * dy * 0.5;
    list.push({
      proton: Math.floor(((k + 1) * Z) / A) > Math.floor((k * Z) / A),
      bx: r2(NX + rad * Math.cos(th)),
      by: r2(NY + rad * Math.sin(th)),
      sx: r2(ZONE.x0 + dx * ((k % cols) + 0.5) + jx),
      sy: r2(ZONE.y0 + dy * (Math.floor(k / cols) + 0.5) + jy),
    });
  }
  return { list, r: r2(r), R: r2(R) };
}

export function NucleusSimulation() {
  const [id, setId] = useState('he4');
  const [bound, setBound] = useState(true);
  const [flash, setFlash] = useState(0);

  const nuc = NUCLEI.find((n) => n.id === id)!;
  const N = neutrons(nuc.Z, nuc.A);
  const dm = massDefect(nuc.Z, nuc.A, nuc.mass);
  const El = nucleusBinding(nuc);
  const b = nucleusBindingPerNucleon(nuc);
  const { list, r, R } = useMemo(() => layout(nuc.Z, nuc.A), [nuc.Z, nuc.A]);
  const stagger = Math.min(0.006, 0.5 / nuc.A);

  const aston = useMemo(() => polyline(200, (i) => axOf(2 + (i / 199) * (A_MAX - 2)), (i) => ayOf(astonCurve(2 + (i / 199) * (A_MAX - 2)))), []);

  const choose = (nid: string) => { setId(nid); setBound(true); setFlash((f) => f + 1); };
  const toggle = () => {
    if (!bound) setFlash((f) => f + 1);
    setBound((v) => !v);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={320} label="Nucléons du noyau et courbe d'Aston">
          <rect x={ZONE.x0 - 8} y={ZONE.y0 - 14} width={ZONE.x1 - ZONE.x0 + 16} height={ZONE.y1 - ZONE.y0 + 30} rx={8} fill="#0b1222" stroke="#1e293b" />
          <text x={ZONE.x0} y={ZONE.y0 - 2} fill="#64748b" fontSize={11}>
            {bound ? `noyau ${nuc.name} : ${nuc.Z} protons, ${N} neutrons` : `${nuc.A} nucléons séparés`}
          </text>

          {/* Eclair d'energie liberee a l'assemblage */}
          <AnimatePresence>
            {bound && (
              <motion.circle
                key={`flash-${flash}`}
                cx={NX} cy={NY} fill="none" stroke="#fde047" strokeWidth={3}
                initial={{ r: R, opacity: 0 }}
                animate={{ r: R + 70, opacity: [0, 0.9, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
              />
            )}
          </AnimatePresence>

          {list.map((n, k) => (
            <motion.circle
              key={`${id}-${k}`}
              r={r}
              fill={n.proton ? '#ef4444' : '#94a3b8'}
              stroke="#0f172a"
              strokeWidth={r > 6 ? 1.5 : 0.8}
              initial={{ cx: n.sx, cy: n.sy }}
              animate={bound ? { cx: n.bx, cy: n.by } : { cx: n.sx, cy: n.sy }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: k * stagger }}
            />
          ))}

          <AnimatePresence>
            {bound && (
              <motion.g key={`txt-${flash}`} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 2.4, delay: 0.4, times: [0, 0.15, 0.8, 1] }}>
                <text x={NX} y={ZONE.y1 + 10} textAnchor="middle" fill="#fde047" fontSize={12} fontWeight={700}>
                  énergie libérée : Eℓ = {frNum(El, El > 100 ? 0 : 1)} MeV
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Courbe d'Aston */}
          <rect x={AX0 - 30} y={AY0 - 26} width={AX1 - AX0 + 40} height={AY1 - AY0 + 52} rx={8} fill="#0b1222" stroke="#1e293b" />
          <text x={AX0 - 22} y={AY0 - 10} fill="#64748b" fontSize={11}>Eℓ/A (MeV/nucléon) – courbe d&apos;Aston</text>
          <line x1={AX0} x2={AX1} y1={AY1} y2={AY1} stroke="#475569" />
          <line x1={AX0} x2={AX0} y1={AY0} y2={AY1} stroke="#475569" />
          {[0, 3, 6, 9].map((v) => (
            <text key={v} x={AX0 - 6} y={ayOf(v) + 4} textAnchor="end" fill="#64748b" fontSize={10}>{v}</text>
          ))}
          {[50, 100, 150, 200].map((A) => (
            <text key={A} x={axOf(A)} y={AY1 + 13} textAnchor="middle" fill="#64748b" fontSize={10}>{A}</text>
          ))}
          <text x={AX1} y={AY1 + 24} textAnchor="end" fill="#64748b" fontSize={10}>A</text>
          <path d={aston} fill="none" stroke="#34d399" strokeWidth={2} opacity={0.7} />
          <text x={axOf(8)} y={ayOf(4.2)} fill="#38bdf8" fontSize={10}>← fusion</text>
          <text x={axOf(170)} y={ayOf(6.4)} fill="#f97316" fontSize={10}>fission →</text>
          {NUCLEI.map((n) => (
            <circle key={n.id} cx={axOf(n.A)} cy={ayOf(nucleusBindingPerNucleon(n))} r={3.5} fill="#64748b" />
          ))}
          <motion.g initial={false} animate={{ x: r2(axOf(nuc.A)), y: r2(ayOf(b)) }} transition={{ type: 'spring', stiffness: 220, damping: 24 }}>
            <circle r={8} fill="#f59e0b" stroke="#0f172a" strokeWidth={2} />
            <text x={10} y={-10} fill="#fbbf24" fontSize={11} fontWeight={700}>{`${nuc.symbol}-${nuc.A}`}</text>
          </motion.g>
        </SimSvg>
        <div className="flex gap-4 text-[11px] text-slate-400">
          <span><span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 mr-1" />proton</span>
          <span><span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-400 mr-1" />neutron</span>
        </div>
      </div>

      <ParamPanel title="Noyau">
        <div className="grid grid-cols-2 gap-1.5">
          {NUCLEI.map((n) => (
            <button key={n.id} onClick={() => choose(n.id)} aria-pressed={n.id === id}
              className={`px-2 py-1.5 rounded-md text-xs font-semibold transition-colors ${n.id === id ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}`}>
              {n.name}
            </button>
          ))}
        </div>
        <button onClick={toggle} className="w-full px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
          {bound ? 'Séparer les nucléons' : 'Assembler le noyau'}
        </button>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Z, N, A" value={`${nuc.Z}, ${N}, ${nuc.A}`} />
          <Stat label="m(noyau)" value={`${frNum(nuc.mass, 5)} u`} />
          <Stat label="Z·mp + N·mn" value={`${frNum(nuc.Z * M_PROTON + N * M_NEUTRON, 5)} u`} />
          <Stat label="Δm" value={`${frNum(dm, 5)} u`} tone="rose" />
          <Stat label="Eℓ = Δm·c²" value={`${frNum(El, 1)} MeV`} tone="amber" />
          <Stat label="Eℓ / A" value={`${frNum(b, 2)} MeV`} tone="emerald" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Rayon du noyau ≈ {frNum(nuclearRadius(nuc.A) * 1e15, 1)} fm (1 fm = 10⁻¹⁵ m). La masse du noyau est plus petite que celle des
          nucléons séparés : la différence Δm correspond à l&apos;énergie de liaison (1 u ↔ 931,5 MeV).
        </p>
      </ParamPanel>
    </div>
  );
}
