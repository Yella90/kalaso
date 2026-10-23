'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text, Billboard } from '@react-three/drei';
import { useEffect, useMemo, useRef, useReducer } from 'react';
import * as THREE from 'three';
import { create } from 'zustand';
import {
  electronY, electronHitX,
  protonTrajectory, protonAcceleration, protonHitTime,
} from '../../lib/physics/charged-particle';

const SCALE = 1000;

interface UIState {
  mode: 'electron' | 'proton';
  U: number;
  d: number;
  l: number;
  v0e: number;
  v0p: number;
  alpha: number;
  running: boolean;
  resetKey: number;
  setMode: (m: 'electron' | 'proton') => void;
  setU: (v: number) => void;
  setD: (v: number) => void;
  setL: (v: number) => void;
  setV0e: (v: number) => void;
  setV0p: (v: number) => void;
  setAlpha: (v: number) => void;
  toggleRun: () => void;
  reset: () => void;
}

export const useChargedStore = create<UIState>((set) => ({
  mode: 'electron',
  U: 100,
  d: 0.02,
  l: 0.04,
  v0e: 1e7,
  v0p: 4e5,
  alpha: 30,
  running: false,
  resetKey: 0,
  setMode: (mode) => set((st) => ({ mode, resetKey: st.resetKey + 1 })),
  setU: (U) => set((st) => ({ U, resetKey: st.resetKey + 1 })),
  setD: (d) => set((st) => ({ d, resetKey: st.resetKey + 1 })),
  setL: (l) => set((st) => ({ l, resetKey: st.resetKey + 1 })),
  setV0e: (v0e) => set((st) => ({ v0e, resetKey: st.resetKey + 1 })),
  setV0p: (v0p) => set((st) => ({ v0p, resetKey: st.resetKey + 1 })),
  setAlpha: (alpha) => set((st) => ({ alpha, resetKey: st.resetKey + 1 })),
  toggleRun: () => set((s) => ({ running: !s.running })),
  reset: () => set((s) => ({ running: false, resetKey: s.resetKey + 1 })),
}));

function Plates() {
  const { d, l } = useChargedStore();
  const dU = d * SCALE;
  const lU = l * SCALE;
  return (
    <group>
      <mesh position={[lU / 2, dU / 2, 0]}>
        <boxGeometry args={[lU, 0.5, 6]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.4} />
      </mesh>
      <Billboard position={[lU + 3, dU / 2, 0]}>
        <Text fontSize={2} color="#ef4444">+</Text>
      </Billboard>

      <mesh position={[lU / 2, -dU / 2, 0]}>
        <boxGeometry args={[lU, 0.5, 6]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} />
      </mesh>
      <Billboard position={[lU + 3, -dU / 2, 0]}>
        <Text fontSize={2} color="#3b82f6">-</Text>
      </Billboard>

      {[0.15, 0.5, 0.85].map((frac) => (
        <group key={frac}>
          <Line
            points={[[lU * frac, dU / 2 - 1, 0], [lU * frac, -dU / 2 + 1, 0]]}
            color="#a78bfa"
            lineWidth={1.5}
          />
          <Billboard position={[lU * frac + 1.5, 0, 0]}>
            <Text fontSize={1.5} color="#a78bfa">E</Text>
          </Billboard>
        </group>
      ))}
    </group>
  );
}

function ElectronParticle() {
  const { U, d, l, v0e, running, resetKey } = useChargedStore();
  const params = useMemo(() => ({ U, d, l, v0: v0e }), [U, d, l, v0e]);
  const progressRef = useRef(0);
  const meshRef = useRef<THREE.Mesh>(null!);
  const [, force] = useReducer((x: number) => x + 1, 0);

  const DUREE = 4;

  // Si U est trop grande, l'electron heurte la plaque positive avant la sortie
  const hitX = electronHitX(params);
  const xEnd = hitX ?? l;

  useEffect(() => {
    progressRef.current = 0;
    meshRef.current?.position.set(0, 0, 0);
    force();
  }, [resetKey]);

  useFrame((_, dt) => {
    if (!running) return;
    progressRef.current = Math.min(progressRef.current + dt / DUREE, 1);
    const x = progressRef.current * xEnd;
    const y = electronY(params, x);
    meshRef.current.position.set(x * SCALE, y * SCALE, 0);
    if (progressRef.current >= 1) useChargedStore.setState({ running: false });
    force();
  });

  const trailPoints = useMemo(() => {
    const N = Math.max(2, Math.floor(progressRef.current * 100));
    const out: [number, number, number][] = [];
    for (let i = 0; i <= N; i++) {
      const x = (xEnd * i) / 100;
      out.push([x * SCALE, electronY(params, x) * SCALE, 0]);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressRef.current, params, xEnd]);

  const xNow = progressRef.current * xEnd;
  const yNow = electronY(params, xNow);
  const finished = progressRef.current >= 1;

  return (
    <>
      <Line points={trailPoints} color="#f59e0b" lineWidth={2.5} />
      <mesh ref={meshRef} position={[xNow * SCALE, yNow * SCALE, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} />
      </mesh>
      {running && (
        <>
          <Line
            points={[[xNow * SCALE, yNow * SCALE, 0], [xNow * SCALE, yNow * SCALE + 6, 0]]}
            color="#10b981"
            lineWidth={2.5}
          />
          <Billboard position={[xNow * SCALE + 2, yNow * SCALE + 6, 0]}>
            <Text fontSize={2} color="#10b981">F</Text>
          </Billboard>
        </>
      )}
      {finished && hitX !== null && (
        <Billboard position={[xNow * SCALE, yNow * SCALE + 5, 0]}>
          <Text fontSize={1.8} color="#ef4444" anchorX="center">
            Impact sur la plaque !
          </Text>
        </Billboard>
      )}
    </>
  );
}

function ProtonParticle() {
  const { U, d, l, v0p, alpha, running, resetKey } = useChargedStore();
  const params = useMemo(
    () => ({ U, d, v0: v0p, alpha: (alpha * Math.PI) / 180 }),
    [U, d, v0p, alpha],
  );
  const progressRef = useRef(0);
  const meshRef = useRef<THREE.Mesh>(null!);
  const [, force] = useReducer((x: number) => x + 1, 0);

  const a = protonAcceleration(params);
  const tApex = (v0p * Math.sin(params.alpha)) / a;
  const tLeave = Math.min(2 * tApex, l / (v0p * Math.cos(params.alpha)));
  // Si la fleche depasse d/2, le proton heurte la plaque superieure avant
  const tHit = protonHitTime(params);
  const hit = tHit !== null && tHit < tLeave;
  const tExit = hit ? (tHit as number) : tLeave;
  const DUREE = 4;

  useEffect(() => {
    progressRef.current = 0;
    meshRef.current?.position.set(0, 0, 0);
    force();
  }, [resetKey]);

  useFrame((_, dt) => {
    if (!running) return;
    progressRef.current = Math.min(progressRef.current + dt / DUREE, 1);
    const t = progressRef.current * tExit;
    const pos = protonTrajectory(params, t);
    meshRef.current.position.set(pos.x * SCALE, pos.y * SCALE, 0);
    if (progressRef.current >= 1) useChargedStore.setState({ running: false });
    force();
  });

  const trailPoints = useMemo(() => {
    const N = Math.max(2, Math.floor(progressRef.current * 100));
    const out: [number, number, number][] = [];
    for (let i = 0; i <= N; i++) {
      const t = (tExit * i) / 100;
      const p = protonTrajectory(params, t);
      out.push([p.x * SCALE, p.y * SCALE, 0]);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressRef.current, params, tExit]);

  const posNow = protonTrajectory(params, progressRef.current * tExit);

  return (
    <>
      <Line points={trailPoints} color="#f59e0b" lineWidth={2.5} />
      <mesh ref={meshRef} position={[posNow.x * SCALE, posNow.y * SCALE, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.8} />
      </mesh>
      {progressRef.current >= 1 && hit && (
        <Billboard position={[posNow.x * SCALE, posNow.y * SCALE + 5, 0]}>
          <Text fontSize={1.8} color="#ef4444" anchorX="center">
            Impact sur la plaque !
          </Text>
        </Billboard>
      )}
    </>
  );
}

function Scene() {
  const { mode } = useChargedStore();
  return (
    <>
      <Grid
        args={[300, 300]}
        cellSize={5}
        cellColor="#0f172a"
        sectionColor="#1e293b"
        infiniteGrid
        fadeDistance={200}
      />
      <Plates />
      {mode === 'electron' ? <ElectronParticle /> : <ProtonParticle />}
    </>
  );
}

export function ChargedParticleSimulation() {
  return (
    <div className="w-full h-[420px] md:h-[520px] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas camera={{ position: [30, 15, 60], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 30, 15]} intensity={1} />
        <Scene />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}