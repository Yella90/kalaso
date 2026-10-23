'use client';

import { useMemo, useState } from 'react';
import { motion, type MotionValue } from 'motion/react';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import { useSimClock, useDerived, polyline, SimSvg, sci } from '@/cecp/components/sim/motion-sim';
import {
  minWavelength, electronSpeed, tubePower, xrayPower, heatPower, electronsPerSecond, bremsstrahlung, keVToWavelength, TUNGSTEN,
} from '@/cecp/lib/physics/xrays';

const U_MAX = 150; // kV
const I_MAX = 50;  // mA

// Tube
const CATH_X = 72, ANODE_X = 330, BEAM_Y = 104;
const N_ELECTRONS = 18;
const N_PHOTONS = 12;

// Spectre
const SX0 = 50, SX1 = 610, SY0 = 214, SY1 = 318;
const L_MAX = 120e-12; // 120 pm
const xOfL = (l: number) => SX0 + (l / L_MAX) * (SX1 - SX0);

const r2 = (v: number) => Math.round(v * 100) / 100;

function Electron({ t, i, active, speed }: { t: MotionValue<number>; i: number; active: boolean; speed: number }) {
  const key = `${speed}-${active}`;
  const span = ANODE_X - 14 - CATH_X;
  const cx = useDerived(t, (s) => CATH_X + ((s * speed + (i * span) / N_ELECTRONS) % span), key);
  return <motion.circle cx={cx} cy={BEAM_Y + ((i * 7) % 13) - 6} r={2.6} fill="#7dd3fc" style={{ opacity: active ? 1 : 0 }} />;
}

/** Photon X emis par l'anticathode, vers le bas a travers la fenetre */
function XPhoton({ t, i, active, color }: { t: MotionValue<number>; i: number; active: boolean; color: string }) {
  const angle = (95 + (i * 23) % 50) * (Math.PI / 180); // vers le bas, eventail
  const key = `${active}`;
  const r = useDerived(t, (s) => ((s * 140 + i * 31) % 150), key);
  const cx = useDerived(r, (d) => ANODE_X - 6 + d * Math.cos(angle), key);
  const cy = useDerived(r, (d) => BEAM_Y + 8 + d * Math.sin(angle) * 0.62, key);
  const opacity = useDerived(r, (d) => (active ? Math.max(0, 1 - d / 150) : 0), key);
  return <motion.circle cx={cx} cy={cy} r={3.2} fill={color} style={{ opacity }} />;
}

export function XRayTubeSimulation() {
  const [U, setU] = useState(80);   // kV
  const [I, setI] = useState(20);   // mA
  const [running, setRunning] = useState(true);
  const { t, reset } = useSimClock(running, 1);

  const Uv = U * 1e3, Ia = I * 1e-3;
  const lmin = minWavelength(Uv);
  const v = electronSpeed(Uv);
  const P = tubePower(Uv, Ia);
  const n = electronsPerSecond(Ia);
  const lines = U > TUNGSTEN.Kedge;

  // Animation : vitesse des electrons ~ racine de U, nombre ~ I
  const speed = 60 + 260 * Math.sqrt(U / U_MAX);
  const nActive = Math.max(2, Math.round((I / I_MAX) * N_ELECTRONS));
  const nPhotons = Math.max(1, Math.round((I / I_MAX) * N_PHOTONS));
  const hardness = U / U_MAX;
  const photonColor = `hsl(${280 - 60 * hardness} 90% ${70 - 15 * hardness}%)`;

  // Spectre : forme de Kramers, hauteur proportionnelle a I.U^2 (normalisee au maximum)
  const spectrum = useMemo(() => {
    const scale = (I / I_MAX) * (U / U_MAX) ** 2;
    const H = SY1 - SY0 - 12;
    const N = 240;
    const kA = keVToWavelength(TUNGSTEN.Ka), kB = keVToWavelength(TUNGSTEN.Kb);
    const lineH = lines ? Math.min(1.6, 2.5 * (U / TUNGSTEN.Kedge - 1)) : 0;
    const y = (l: number) => {
      let val = bremsstrahlung(l, Uv) * scale;
      if (lines) {
        val += lineH * scale * Math.exp(-(((l - kA) / 0.35e-12) ** 2));
        val += 0.5 * lineH * scale * Math.exp(-(((l - kB) / 0.35e-12) ** 2));
      }
      return SY1 - Math.min(H, val * H);
    };
    return polyline(N, (i) => xOfL((i / (N - 1)) * L_MAX), (i) => y((i / (N - 1)) * L_MAX));
  }, [U, I, Uv, lines]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={340} label="Tube de Coolidge et spectre des rayons X émis">
          {/* Ampoule */}
          <ellipse cx={210} cy={BEAM_Y} rx={185} ry={62} fill="#0f172a" stroke="#64748b" strokeWidth={2} />
          {/* Cathode */}
          <rect x={CATH_X - 34} y={BEAM_Y - 22} width={26} height={44} rx={4} fill="#334155" />
          <motion.path
            d={`M${CATH_X - 8},${BEAM_Y - 12} q6,4 0,8 q-6,4 0,8 q6,4 0,8`} fill="none" stroke="#fb923c" strokeWidth={3}
            animate={{ opacity: r2(0.3 + 0.7 * (I / I_MAX)) }} transition={{ duration: 0.3 }}
          />
          <text x={CATH_X - 21} y={BEAM_Y + 42} textAnchor="middle" fill="#94a3b8" fontSize={11}>cathode −</text>
          {/* Anticathode */}
          <motion.circle cx={ANODE_X + 6} cy={BEAM_Y} r={34} fill="#ef4444" animate={{ opacity: r2(0.08 + 0.5 * (P / (U_MAX * 1e3 * I_MAX * 1e-3))) }} transition={{ duration: 0.3 }} />
          <polygon points={`${ANODE_X - 12},${BEAM_Y - 30} ${ANODE_X + 8},${BEAM_Y - 30} ${ANODE_X + 8},${BEAM_Y + 22} ${ANODE_X - 12},${BEAM_Y - 2}`} fill="#94a3b8" />
          <rect x={ANODE_X + 8} y={BEAM_Y - 12} width={70} height={16} fill="#64748b" />
          <text x={ANODE_X + 44} y={BEAM_Y - 18} textAnchor="middle" fill="#94a3b8" fontSize={11}>anticathode +</text>
          <text x={ANODE_X + 44} y={BEAM_Y + 30} textAnchor="middle" fill="#64748b" fontSize={10}>(tungstène)</text>
          {/* Fenetre */}
          <line x1={250} x2={330} y1={BEAM_Y + 60} y2={BEAM_Y + 60} stroke="#a78bfa" strokeWidth={4} />
          <text x={200} y={BEAM_Y + 78} fill="#a78bfa" fontSize={10}>fenêtre</text>
          <text x={210} y={30} textAnchor="middle" fill="#fbbf24" fontSize={12} fontWeight={600}>U = {U} kV · I = {I} mA</text>

          {Array.from({ length: N_ELECTRONS }, (_, i) => (
            <Electron key={i} t={t} i={i} active={i < nActive} speed={speed} />
          ))}
          {Array.from({ length: N_PHOTONS }, (_, i) => (
            <XPhoton key={i} t={t} i={i} active={i < nPhotons} color={photonColor} />
          ))}

          {/* Spectre */}
          <rect x={SX0 - 10} y={SY0 - 22} width={SX1 - SX0 + 20} height={SY1 - SY0 + 42} rx={6} fill="#0b1222" stroke="#1e293b" />
          <text x={SX0} y={SY0 - 8} fill="#64748b" fontSize={11}>intensité émise en fonction de λ</text>
          <line x1={SX0} x2={SX1} y1={SY1} y2={SY1} stroke="#475569" />
          {[0, 20, 40, 60, 80, 100, 120].map((pm) => (
            <text key={pm} x={xOfL(pm * 1e-12)} y={SY1 + 13} textAnchor="middle" fill="#64748b" fontSize={10}>{pm}</text>
          ))}
          <text x={SX1} y={SY1 + 13} textAnchor="end" fill="#64748b" fontSize={10}>λ (pm)</text>
          <motion.path initial={false} animate={{ d: spectrum }} transition={{ duration: 0.35 }} fill="none" stroke="#c084fc" strokeWidth={2.2} />
          <motion.g initial={false} animate={{ x: r2(xOfL(lmin)) }} transition={{ type: 'spring', stiffness: 260, damping: 28 }}>
            <line x1={0} x2={0} y1={SY0} y2={SY1} stroke="#f8fafc" strokeDasharray="3 3" />
            <text x={4} y={SY0 + 10} fill="#f8fafc" fontSize={10}>λmin</text>
          </motion.g>
          {lines && (
            <text x={xOfL(keVToWavelength(TUNGSTEN.Ka)) + 6} y={SY0 + 26} fill="#f0abfc" fontSize={10}>raies Kα, Kβ du tungstène</text>
          )}
        </SimSvg>
        <p className="text-[11px] text-slate-500">
          La tension fixe λmin (l&apos;énergie maximale des photons) ; l&apos;intensité du courant fixe le nombre de photons.
          Au-delà de 69,5 kV, les raies caractéristiques du tungstène apparaissent.
        </p>
      </div>

      <ParamPanel>
        <Slider label="Tension accélératrice U" value={U} unit="kV" min={10} max={U_MAX} step={1} digits={0} onChange={setU} />
        <Slider label="Intensité du courant I" value={I} unit="mA" min={1} max={I_MAX} step={1} digits={0} onChange={setI} />
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="λmin = hc/(eU)" value={`${frNum(lmin * 1e12, 1)} pm`} tone="rose" />
          <Stat label="Ec = eU" value={`${U} keV`} tone="sky" />
          <Stat label="v (non relativiste)" value={`${frNum(v / 1e8, 2)}·10⁸ m/s`} />
          <Stat label="Électrons / s = I/e" value={sci(n)} />
          <Stat label="P = UI" value={`${frNum(P, 0)} W`} tone="amber" />
          <Stat label="Rayons X (≈ 1 %)" value={`${frNum(xrayPower(Uv, Ia), 1)} W`} tone="emerald" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Chaleur dans l&apos;anticathode : {frNum(heatPower(Uv, Ia), 0)} W. Au-delà de 100 kV environ, la vitesse calculée sans relativité dépasse la réalité.
        </p>
      </ParamPanel>
    </div>
  );
}
