'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text, Billboard } from '@react-three/drei';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import { create } from 'zustand';
import {
  PARTICLES, ISOTOPE_PAIRS, cyclotronRadius, cyclotronOmega, positionInB, spectroRadius,
} from '../../lib/physics/magnetic';

export type MagneticMode = 'cercle' | 'spectro';

interface MagState {
  mode: MagneticMode;
  particleId: string;
  /** vitesse (m/s) */
  v: number;
  /** champ (T) */
  B: number;
  /** tension d'acceleration du spectrographe (V) */
  U: number;
  pairId: string;
  running: boolean;
  resetKey: number;
  setMode: (m: MagneticMode) => void;
  setParticle: (id: string) => void;
  setV: (v: number) => void;
  setB: (b: number) => void;
  setU: (u: number) => void;
  setPair: (id: string) => void;
  toggleRun: () => void;
  reset: () => void;
}

const DEFAULT_SPEED: Record<string, number> = { electron: 1e7, proton: 1e6, alpha: 1e6, deuton: 1e6 };
const DEFAULT_B: Record<string, number> = { electron: 1e-3, proton: 0.1, alpha: 0.2, deuton: 0.1 };

export const useMagneticStore = create<MagState>((set) => ({
  mode: 'cercle',
  particleId: 'proton',
  v: 1e6,
  B: 0.1,
  U: 1000,
  pairId: 'li',
  running: true,
  resetKey: 0,
  setMode: (mode) =>
    set((s) => ({
      mode,
      running: true,
      resetKey: s.resetKey + 1,
      // Valeurs adaptees a chaque mode
      ...(mode === 'spectro'
        ? { B: Math.min(1, Math.max(0.05, s.B)) }
        : { v: DEFAULT_SPEED[s.particleId], B: DEFAULT_B[s.particleId] }),
    })),
  setParticle: (particleId) =>
    set((s) => ({
      particleId, v: DEFAULT_SPEED[particleId], B: DEFAULT_B[particleId], resetKey: s.resetKey + 1,
    })),
  setV: (v) => set((s) => ({ v, resetKey: s.resetKey + 1 })),
  setB: (B) => set((s) => ({ B, resetKey: s.resetKey + 1 })),
  setU: (U) => set((s) => ({ U, resetKey: s.resetKey + 1 })),
  setPair: (pairId) => set((s) => ({ pairId, resetKey: s.resetKey + 1 })),
  toggleRun: () => set((s) => ({ running: !s.running })),
  reset: () => set((s) => ({ running: true, resetKey: s.resetKey + 1 })),
}));

const frc = (x: number, d = 1) => x.toFixed(d).replace('.', ',');

/** Champ B sortant de l'ecran : grille de petites fleches selon +z */
function BField({ x0, x1, y0, y1, step }: { x0: number; x1: number; y0: number; y1: number; step: number }) {
  const pts: [number, number][] = [];
  for (let x = x0; x <= x1 + 1e-6; x += step) for (let y = y0; y <= y1 + 1e-6; y += step) pts.push([x, y]);
  return (
    <group>
      {pts.map(([x, y]) => (
        <group key={`${x}-${y}`} position={[x, y, 0]}>
          <Line points={[[0, 0, -0.5], [0, 0, 0.4]]} color="#3b82f6" lineWidth={1} transparent opacity={0.45} />
          <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.1, 0.25, 8]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.55} />
          </mesh>
        </group>
      ))}
      <Billboard position={[x1 + 0.6, y1, 0.6]}>
        <Text fontSize={0.6} color="#60a5fa">B (sortant)</Text>
      </Billboard>
    </group>
  );
}

function Arrow({ from, vec, color, label }: { from: [number, number]; vec: [number, number]; color: string; label: string }) {
  const len = Math.hypot(vec[0], vec[1]);
  if (len < 0.05) return null;
  const end: [number, number, number] = [from[0] + vec[0], from[1] + vec[1], 0];
  const angle = Math.atan2(vec[1], vec[0]) - Math.PI / 2;
  return (
    <group>
      <Line points={[[from[0], from[1], 0], end]} color={color} lineWidth={2.5} />
      <mesh position={end} rotation={[0, 0, angle]}>
        <coneGeometry args={[0.15, 0.4, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <Billboard position={[end[0] + 0.3, end[1] + 0.3, 0]}>
        <Text fontSize={0.45} color={color}>{label}</Text>
      </Billboard>
    </group>
  );
}

// ------------------------------------------------------------
//  Mode 1 : trajectoire circulaire
// ------------------------------------------------------------
const R_DISPLAY = 5;
const TURN_SECONDS = 4;

function CircleScene() {
  const { particleId, v, B, running, resetKey } = useMagneticStore();
  const p = PARTICLES.find((x) => x.id === particleId)!;
  const R = cyclotronRadius(p.m, p.q, v, B);
  const w = cyclotronOmega(p.m, p.q, B);
  const k = R_DISPLAY / R; // metres -> unites 3D
  const phiRef = useRef(0);
  const [, force] = useReducer((n: number) => n + 1, 0);

  useEffect(() => { phiRef.current = 0; force(); }, [resetKey]);

  useFrame((_, dt) => {
    if (!running) return;
    phiRef.current = Math.min(phiRef.current + (2 * Math.PI * Math.min(dt, 0.05)) / TURN_SECONDS, 2 * Math.PI * 50);
    force();
  });

  const t = phiRef.current / w;
  const s = positionInB(p.m, p.q, v, B, t);
  const pos: [number, number] = [s.x * k - R_DISPLAY, s.y * k];
  const cy = (p.q > 0 ? -1 : 1) * R_DISPLAY;
  const center: [number, number] = [-R_DISPLAY, cy];

  const circle = useMemo(
    () => Array.from({ length: 97 }, (_, i) => {
      const a = (2 * Math.PI * i) / 96;
      return [center[0] + R_DISPLAY * Math.cos(a), center[1] + R_DISPLAY * Math.sin(a), 0] as [number, number, number];
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cy],
  );
  const traveled = Math.min(phiRef.current, 2 * Math.PI);
  const trail = useMemo(() => {
    const n = Math.max(2, Math.ceil((traveled / (2 * Math.PI)) * 96));
    return Array.from({ length: n + 1 }, (_, i) => {
      const tt = ((traveled * i) / n) / w;
      const q = positionInB(p.m, p.q, v, B, tt);
      return [q.x * k - R_DISPLAY, q.y * k, 0] as [number, number, number];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [traveled, p, v, B]);

  const vLen = 2.2;
  const vdir: [number, number] = [s.vx / v, s.vy / v];
  const fdir: [number, number] = [(center[0] - pos[0]) / R_DISPLAY, (center[1] - pos[1]) / R_DISPLAY];

  return (
    <>
      <BField x0={-11} x1={1} y0={-11} y1={11} step={2} />
      <Line points={circle} color="#334155" lineWidth={1} dashed dashSize={0.3} gapSize={0.2} />
      <Line points={trail} color={p.color} lineWidth={3} />
      {/* Entree de la particule */}
      <Line points={[[-11, 0, 0], [-R_DISPLAY, 0, 0]]} color="#475569" lineWidth={1.5} dashed dashSize={0.3} gapSize={0.2} />
      <Billboard position={[-10, 0.6, 0]}><Text fontSize={0.45} color="#94a3b8">entrée O</Text></Billboard>
      {/* Rayon */}
      <Line points={[[center[0], center[1], 0], [pos[0], pos[1], 0]]} color="#64748b" lineWidth={1} dashed dashSize={0.2} gapSize={0.15} />
      <mesh position={[center[0], center[1], 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#64748b" />
      </mesh>
      <Billboard position={[center[0] + 0.4, center[1] + 0.5, 0]}>
        <Text fontSize={0.45} color="#cbd5e1">{`R = ${frc(R * 100, R < 0.1 ? 2 : 1)} cm`}</Text>
      </Billboard>
      <mesh position={[pos[0], pos[1], 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.7} />
      </mesh>
      <Arrow from={pos} vec={[vdir[0] * vLen, vdir[1] * vLen]} color="#f472b6" label="v" />
      <Arrow from={pos} vec={[fdir[0] * 1.8, fdir[1] * 1.8]} color="#10b981" label="F" />
    </>
  );
}

// ------------------------------------------------------------
//  Mode 2 : spectrographe de masse
// ------------------------------------------------------------
function SpectroScene() {
  const { U, B, pairId, running, resetKey } = useMagneticStore();
  const pair = ISOTOPE_PAIRS.find((x) => x.id === pairId)!;
  const sign = 'negative' in pair && pair.negative ? -1 : 1;
  const R1 = spectroRadius(pair.A1, 1, U, B);
  const R2 = spectroRadius(pair.A2, 1, U, B);
  const k = 8 / R2; // le plus lourd fait le plus grand cercle
  const tRef = useRef(0);
  const [, force] = useReducer((n: number) => n + 1, 0);

  useEffect(() => { tRef.current = 0; force(); }, [resetKey]);
  useFrame((_, dt) => {
    if (!running) return;
    tRef.current += Math.min(dt, 0.05);
    force();
  });

  // Duree du demi-tour proportionnelle a la masse (T = 2 pi m / qB)
  const HALF1 = 2.5;
  const ions = [
    { A: pair.A1, R: R1, color: '#38bdf8', half: HALF1 },
    { A: pair.A2, R: R2, color: '#f97316', half: (HALF1 * pair.A2) / pair.A1 },
  ];
  const acc = 1.2; // duree de la phase d'acceleration (s)
  const t = tRef.current;

  return (
    <>
      {/* Zone de champ : demi-plan y > 0 */}
      <mesh position={[0, 5, -0.6]}>
        <planeGeometry args={[22, 10]} />
        <meshBasicMaterial color="#1e3a8a" transparent opacity={0.18} />
      </mesh>
      <BField x0={-10} x1={10} y0={1} y1={9} step={2} />
      {/* Plaque detectrice (y = 0) */}
      <Line points={[[-11, 0, 0], [11, 0, 0]]} color="#e2e8f0" lineWidth={3} />
      <Billboard position={[sign * 9, -0.6, 0]}><Text fontSize={0.45} color="#e2e8f0">plaque photographique</Text></Billboard>
      {/* Plaques accélératrices sous la fente O */}
      <Line points={[[-1.5, -4, 0], [1.5, -4, 0]]} color="#ef4444" lineWidth={4} />
      <Line points={[[-1.5, -0.8, 0], [-0.25, -0.8, 0]]} color="#3b82f6" lineWidth={4} />
      <Line points={[[0.25, -0.8, 0], [1.5, -0.8, 0]]} color="#3b82f6" lineWidth={4} />
      <Billboard position={[2.6, -2.4, 0]}><Text fontSize={0.45} color="#fca5a5">{`U = ${U} V`}</Text></Billboard>
      <Billboard position={[-0.6, 0.4, 0]}><Text fontSize={0.45} color="#94a3b8">O</Text></Billboard>

      {ions.map((ion) => {
        const Rd = ion.R * k;
        // Phase 1 : acceleration (de y=-4 a y=0), phase 2 : demi-cercle
        let x = 0, y = -4;
        const trail: [number, number, number][] = [[0, -4, 0]];
        if (t < acc) {
          y = -4 + 4 * (t / acc) ** 2;
          trail.push([0, y, 0]);
        } else {
          trail.push([0, 0, 0]);
          const th = Math.min(Math.PI, (Math.PI * (t - acc)) / ion.half);
          const n = Math.max(2, Math.ceil((th / Math.PI) * 48));
          for (let i = 1; i <= n; i++) {
            const a = (th * i) / n;
            trail.push([sign * (Rd - Rd * Math.cos(a)), Rd * Math.sin(a), 0]);
          }
          x = sign * (Rd - Rd * Math.cos(th));
          y = Rd * Math.sin(th);
        }
        const landed = t >= acc + ion.half;
        return (
          <group key={ion.A}>
            <Line points={trail} color={ion.color} lineWidth={2.5} />
            <mesh position={[x, y, 0]}>
              <sphereGeometry args={[0.28, 16, 16]} />
              <meshStandardMaterial color={ion.color} emissive={ion.color} emissiveIntensity={0.8} />
            </mesh>
            {landed && (
              <Billboard position={[sign * 2 * Rd, -1.1 - (ion.A === pair.A2 ? 0.7 : 0), 0]}>
                <Text fontSize={0.42} color={ion.color}>{`A = ${ion.A} : ${frc(2 * ion.R * 100)} cm`}</Text>
              </Billboard>
            )}
          </group>
        );
      })}
    </>
  );
}

export function MagneticSimulation() {
  const mode = useMagneticStore((s) => s.mode);
  return (
    <div className="w-full h-[420px] md:h-[520px] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas camera={{ position: mode === 'cercle' ? [-5, -2, 24] : [0, 3, 24], fov: 45 }} key={mode}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 10]} intensity={1} />
        {mode === 'cercle' ? <CircleScene /> : <SpectroScene />}
        <OrbitControls makeDefault target={mode === 'cercle' ? [-5, -2, 0] : [0, 3, 0]} />
      </Canvas>
    </div>
  );
}

