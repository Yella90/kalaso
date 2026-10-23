'use client';

import { useMemo, useState } from 'react';
import { motion, type MotionValue } from 'motion/react';
import { Slider, Stat, ParamPanel, PlayControls, Segmented, frNum } from '@/cecp/components/sim/Controls';
import { useSimClock, useDerived, polyline, SimSvg, ScopeFrame } from '@/cecp/components/sim/motion-sim';
import {
  secondaryVoltage, primaryCurrent, transformerKind, alternatorFrequency, alternatorPeakEmf, peakFromRms,
} from '@/cecp/lib/physics/transformer';

type Mode = 'transfo' | 'alternateur';

/** Le temps simule defile 50 fois moins vite : 50 Hz -> 1 oscillation par seconde a l'ecran */
const SLOW = 0.02;
const F_GRID = 50;
const SCOPE_WINDOW = 0.04; // s simulees affichees sur l'oscilloscope (2 periodes a 50 Hz)

const KIND_LABEL = { elevateur: 'élévateur', abaisseur: 'abaisseur', isolement: "d'isolement" } as const;

export function TransformerSimulation() {
  const [mode, setMode] = useState<Mode>('transfo');
  const [running, setRunning] = useState(true);
  const { t, reset } = useSimClock(running, SLOW);

  return (
    <div className="space-y-3">
      <Segmented<Mode>
        value={mode}
        onChange={setMode}
        options={[
          { value: 'transfo', label: 'Transformateur' },
          { value: 'alternateur', label: 'Alternateur' },
        ]}
      />
      {mode === 'transfo'
        ? <TransformerView t={t} running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} />
        : <AlternatorView t={t} running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} />}
    </div>
  );
}

interface ViewProps {
  t: MotionValue<number>;
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
}

// ============================================================
//  Transformateur
// ============================================================

type Pt = [number, number];

/** Point a l'abscisse curviligne u (0..1) le long d'une ligne brisee fermee */
function pointOnLoop(pts: Pt[], u: number): Pt {
  const seg = pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length];
    return Math.hypot(q[0] - p[0], q[1] - p[1]);
  });
  const total = seg.reduce((a, b) => a + b, 0);
  let d = (((u % 1) + 1) % 1) * total;
  for (let i = 0; i < pts.length; i++) {
    if (d <= seg[i]) {
      const p = pts[i], q = pts[(i + 1) % pts.length], k = seg[i] ? d / seg[i] : 0;
      return [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k];
    }
    d -= seg[i];
  }
  return pts[0];
}

const LOOP_1: Pt[] = [[196, 78], [80, 78], [80, 182], [196, 182]];
const LOOP_2: Pt[] = [[444, 78], [560, 78], [560, 182], [444, 182]];

/** Charges qui oscillent le long d'un circuit (courant alternatif) */
function CurrentDot({ t, loop, u0, amp, color }: { t: MotionValue<number>; loop: Pt[]; u0: number; amp: number; color: string }) {
  const key = `${amp}`;
  const cx = useDerived(t, (s) => pointOnLoop(loop, u0 + amp * Math.sin(2 * Math.PI * F_GRID * s))[0], key);
  const cy = useDerived(t, (s) => pointOnLoop(loop, u0 + amp * Math.sin(2 * Math.PI * F_GRID * s))[1], key);
  return <motion.circle cx={cx} cy={cy} r={3.2} fill={color} />;
}

function Coil({ x, turns, color }: { x: number; turns: number; color: string }) {
  const n = Math.max(2, Math.min(28, turns));
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const y = 84 + (i * 92) / (n - 1);
        return <line key={i} x1={x - 8} y1={y} x2={x + 34} y2={y + 4} stroke={color} strokeWidth={3} strokeLinecap="round" />;
      })}
    </g>
  );
}

function TransformerView({ t, running, onToggle, onReset }: ViewProps) {
  const [N1, setN1] = useState(1100);
  const [N2, setN2] = useState(60);
  const [U1, setU1] = useState(220);
  const [R, setR] = useState(10);

  const U2 = secondaryVoltage(U1, N1, N2);
  const I2 = U2 / R;
  const I1 = primaryCurrent(I2, N1, N2);
  const P2 = U2 * I2;
  const kind = transformerKind(N1, N2);
  const key = `${N1}-${N2}-${U1}-${R}`;

  // Amplitudes visuelles du deplacement des charges (proportionnelles aux intensites)
  const Imax = Math.max(I1, I2, 1e-9);
  const amp1 = 0.07 * (I1 / Imax), amp2 = 0.07 * (I2 / Imax);

  // Flux magnetique dans le noyau : pointilles qui vont et viennent
  const fluxOffset = useDerived(t, (s) => 24 * Math.sin(2 * Math.PI * F_GRID * s), 'flux');
  const fluxOpacity = useDerived(t, (s) => 0.25 + 0.75 * Math.abs(Math.cos(2 * Math.PI * F_GRID * s)), 'flux');

  // Oscilloscope : u1 et u2 sur 2 periodes
  const SX = 40, SY = 238, SW = 560, SH = 112;
  const Umax = peakFromRms(Math.max(U1, U2));
  const trace = (Ueff: number) => (s: number) => polyline(160,
    (i) => SX + (i / 159) * SW,
    (i) => {
      const time = s - SCOPE_WINDOW * (1 - i / 159);
      return SY + SH / 2 - (SH / 2 - 8) * (peakFromRms(Ueff) / Umax) * Math.sin(2 * Math.PI * F_GRID * time);
    });
  const u1Path = useDerived(t, trace(U1), key);
  const u2Path = useDerived(t, trace(U2), key);

  // Eclat de la lampe : proportionnel a la puissance (sature a 60 W)
  const glow = Math.round(Math.min(1, P2 / 60) * 100) / 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={360} label="Transformateur : primaire, noyau de fer, secondaire et oscilloscope">
          {/* Noyau de fer feuillete */}
          <path d="M200,40 H440 V220 H200 Z M226,66 V194 H414 V66 Z" fill="#334155" fillRule="evenodd" stroke="#475569" />
          <motion.rect
            x={213} y={53} width={214} height={154} rx={4} fill="none" stroke="#a78bfa" strokeWidth={2}
            strokeDasharray="10 14" style={{ strokeDashoffset: fluxOffset, opacity: fluxOpacity }}
          />
          <text x={320} y={34} textAnchor="middle" fill="#a78bfa" fontSize={11}>flux magnétique Φ (alternatif)</text>

          {/* Circuits */}
          <polyline points={LOOP_1.map((p) => p.join(',')).join(' ')} fill="none" stroke="#64748b" strokeWidth={2} />
          <polyline points={LOOP_2.map((p) => p.join(',')).join(' ')} fill="none" stroke="#64748b" strokeWidth={2} />
          <Coil x={196} turns={Math.round(N1 / 100)} color="#f59e0b" />
          <Coil x={410} turns={Math.round(N2 / 100)} color="#38bdf8" />

          {Array.from({ length: 10 }, (_, i) => (
            <CurrentDot key={`a${i}`} t={t} loop={LOOP_1} u0={i / 10} amp={amp1} color="#fbbf24" />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <CurrentDot key={`b${i}`} t={t} loop={LOOP_2} u0={i / 10} amp={amp2} color="#7dd3fc" />
          ))}

          {/* Generateur alternatif */}
          <circle cx={80} cy={130} r={22} fill="#0f172a" stroke="#f59e0b" strokeWidth={2} />
          <path d="M66,130 q7,-12 14,0 t14,0" fill="none" stroke="#f59e0b" strokeWidth={2} />
          <text x={80} y={170} textAnchor="middle" fill="#fbbf24" fontSize={11} fontWeight={600}>{U1} V</text>
          <text x={150} y={72} textAnchor="middle" fill="#fbbf24" fontSize={11}>N₁ = {N1}</text>

          {/* Lampe (charge) */}
          <motion.circle cx={560} cy={130} r={30} fill="#fde68a" animate={{ opacity: glow * 0.45 }} transition={{ duration: 0.4 }} />
          <circle cx={560} cy={130} r={17} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} />
          <motion.circle cx={560} cy={130} r={10} fill="#fde047" animate={{ opacity: 0.15 + 0.85 * glow }} transition={{ duration: 0.4 }} />
          <text x={560} y={170} textAnchor="middle" fill="#7dd3fc" fontSize={11} fontWeight={600}>{frNum(U2, 1)} V</text>
          <text x={490} y={72} textAnchor="middle" fill="#7dd3fc" fontSize={11}>N₂ = {N2}</text>

          {/* Oscilloscope */}
          <ScopeFrame x={SX} y={SY} w={SW} h={SH} label="Oscilloscope : u₁(t) en orange, u₂(t) en bleu (même échelle)" />
          <motion.path d={u1Path} fill="none" stroke="#f59e0b" strokeWidth={2} />
          <motion.path d={u2Path} fill="none" stroke="#38bdf8" strokeWidth={2} />
        </SimSvg>
        <p className="text-[11px] text-slate-500">Animation ralentie 50 fois : le courant du secteur (50 Hz) change de sens 100 fois par seconde.</p>
      </div>

      <ParamPanel>
        <Slider label="Spires au primaire N₁" value={N1} unit="" min={100} max={2000} step={50} digits={0} onChange={setN1} />
        <Slider label="Spires au secondaire N₂" value={N2} unit="" min={20} max={4000} step={20} digits={0} onChange={setN2} />
        <Slider label="Tension primaire U₁" value={U1} unit="V" min={12} max={240} step={1} digits={0} onChange={setU1} />
        <Slider label="Résistance de la charge R" value={R} unit="Ω" min={2} max={500} step={1} digits={0} onChange={setR} />
        <PlayControls running={running} onToggle={onToggle} onReset={onReset} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="m = N₂/N₁" value={frNum(N2 / N1, 3)} />
          <Stat label="Type" value={KIND_LABEL[kind]} tone={kind === 'elevateur' ? 'rose' : 'sky'} />
          <Stat label="U₂" value={`${frNum(U2, 1)} V`} tone="sky" />
          <Stat label="I₂ = U₂/R" value={`${frNum(I2, 2)} A`} tone="sky" />
          <Stat label="I₁ = m·I₂" value={`${frNum(I1, 3)} A`} />
          <Stat label="P = U₁I₁ = U₂I₂" value={`${frNum(P2, 1)} W`} tone="emerald" />
        </div>
      </ParamPanel>
    </div>
  );
}

// ============================================================
//  Alternateur
// ============================================================

const CX = 200, CY = 160;

function Pole({ angle, k, pairs }: { angle: MotionValue<number>; k: number; pairs: number }) {
  const offset = (k * Math.PI) / pairs;
  const key = `${k}-${pairs}`;
  const cx = useDerived(angle, (a) => CX + 52 * Math.cos(a + offset), key);
  const cy = useDerived(angle, (a) => CY + 52 * Math.sin(a + offset), key);
  const north = k % 2 === 0;
  return (
    <g>
      <motion.circle cx={cx} cy={cy} r={pairs > 2 ? 13 : 17} fill={north ? '#ef4444' : '#3b82f6'} stroke="#0f172a" strokeWidth={2} />
    </g>
  );
}

function AlternatorView({ t, running, onToggle, onReset }: ViewProps) {
  const [pairs, setPairs] = useState(1);
  const [rpm, setRpm] = useState(3000);

  const n = rpm / 60;
  const f = alternatorFrequency(pairs, n);
  const omega = 2 * Math.PI * f;
  const Em = alternatorPeakEmf(200, 0.15, 40e-4, omega);
  const key = `${pairs}-${rpm}`;

  // Angle du rotor (rad) : 2 pi n t
  const angle = useDerived(t, (s) => 2 * Math.PI * n * s - Math.PI / 2, key);

  // Oscilloscope : e(t) normalisee a la valeur maximale possible (3 paires, 3000 tr/min)
  const SX = 360, SY = 60, SW = 260, SH = 200;
  const EmMax = alternatorPeakEmf(200, 0.15, 40e-4, 2 * Math.PI * 150);
  const ePath = useDerived(t, (s) => polyline(200,
    (i) => SX + (i / 199) * SW,
    (i) => {
      const time = s - SCOPE_WINDOW * (1 - i / 199);
      return SY + SH / 2 - (SH / 2 - 10) * (Em / EmMax) * Math.sin(omega * time);
    }), key);

  // Intensite du champ vue par la bobine du haut (lueur)
  const coilGlow = useDerived(t, (s) => 0.2 + 0.8 * Math.abs(Math.sin(omega * s)), key);

  const poles = useMemo(() => Array.from({ length: 2 * pairs }, (_, k) => k), [pairs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <SimSvg width={640} height={320} label="Alternateur : rotor aimanté tournant devant des bobines">
          {/* Stator */}
          <circle cx={CX} cy={CY} r={112} fill="none" stroke="#334155" strokeWidth={14} />
          {[0, 90, 180, 270].map((deg) => (
            <g key={deg} transform={`rotate(${deg} ${CX} ${CY})`}>
              <motion.rect x={CX - 18} y={CY - 112} width={36} height={30} rx={4} fill="#b45309" stroke="#f59e0b" style={{ opacity: coilGlow }} />
            </g>
          ))}
          {/* Rotor */}
          <circle cx={CX} cy={CY} r={72} fill="#1e293b" stroke="#475569" />
          {poles.map((k) => <Pole key={`${pairs}-${k}`} angle={angle} k={k} pairs={pairs} />)}
          <circle cx={CX} cy={CY} r={8} fill="#94a3b8" />
          <text x={CX} y={300} textAnchor="middle" fill="#94a3b8" fontSize={11}>
            rotor : {pairs} paire{pairs > 1 ? 's' : ''} de pôles (rouge = N, bleu = S)
          </text>

          <ScopeFrame x={SX} y={SY} w={SW} h={SH} label="f.é.m. e(t) aux bornes d'une bobine" />
          <motion.path d={ePath} fill="none" stroke="#f59e0b" strokeWidth={2.2} />
          <text x={SX + SW / 2} y={SY + SH + 18} textAnchor="middle" fill="#64748b" fontSize={11}>fenêtre de 40 ms (2 périodes à 50 Hz)</text>
        </SimSvg>
        <p className="text-[11px] text-slate-500">Animation ralentie 50 fois. Bobine modèle : 200 spires, 40 cm², B = 0,15 T.</p>
      </div>

      <ParamPanel>
        <Segmented<string>
          label="Paires de pôles p"
          value={String(pairs)}
          onChange={(v) => setPairs(Number(v))}
          options={[{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }]}
        />
        <Slider label="Vitesse de rotation n" value={rpm} unit="tr/min" min={300} max={3000} step={50} digits={0} onChange={setRpm} />
        <PlayControls running={running} onToggle={onToggle} onReset={onReset} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="n (tr/s)" value={frNum(n, 1)} />
          <Stat label="f = p·n" value={`${frNum(f, 1)} Hz`} tone={Math.abs(f - 50) < 0.5 ? 'emerald' : 'amber'} />
          <Stat label="ω = 2πf" value={`${frNum(omega, 0)} rad/s`} />
          <Stat label="Eₘ = NBSω" value={`${frNum(Em, 1)} V`} tone="sky" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Objectif : produire du 50 Hz comme le réseau. Avec 1 paire de pôles il faut 3 000 tr/min ; avec 2 paires, 1 500 tr/min suffisent.
        </p>
      </ParamPanel>
    </div>
  );
}
