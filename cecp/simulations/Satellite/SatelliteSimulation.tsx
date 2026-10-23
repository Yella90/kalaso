'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Stars, Text, Billboard } from '@react-three/drei';
import { useEffect, useMemo, useRef, useReducer } from 'react';
import * as THREE from 'three';
import { create } from 'zustand';
import {
  R_TERRE,
  T_GEOSTATIONNAIRE,
  linearSpeed,
  angularSpeed,
  orbitalRadius,
  sampleOrbit,
  gravityAt,
  G_0,
} from '../../lib/physics/satellite';
import {
  SATELLITE_SCENARIOS,
  type SatelliteScenario,
} from '../../lib/real-life/scenarios';

// Echelle d'affichage : 1 unite Three = 1000 km
const SCALE = 1 / 1e6;
/** Acceleration du temps par defaut (sinon une orbite durerait ~1h30 en temps reel) */
export const DEFAULT_TIME_WARP = 500;
/** Vitesse angulaire de rotation de la Terre (rad/s), coherente avec T = 24 h */
const OMEGA_TERRE = (2 * Math.PI) / T_GEOSTATIONNAIRE;
/** Latitude de Bamako (rad) */
const LAT_BAMAKO = (12.65 * Math.PI) / 180;

interface UIState {
  h: number;              // altitude (m)
  running: boolean;
  resetKey: number;
  /** Facteur d'acceleration du temps */
  timeWarp: number;
  /** Temps physique simule depuis le lancement (s) */
  simTime: number;
  scenarioId: string | null;
  setH: (h: number) => void;
  setTimeWarp: (w: number) => void;
  toggleRun: () => void;
  reset: () => void;
  setSimTime: (t: number) => void;
  applyScenario: (s: SatelliteScenario) => void;
  clearScenario: () => void;
}

export const useSatelliteStore = create<UIState>((set) => ({
  h: 400e3,               // defaut : altitude ISS ~ 400 km
  running: false,
  resetKey: 0,
  timeWarp: DEFAULT_TIME_WARP,
  simTime: 0,
  scenarioId: null,
  setH: (h) => set((st) => ({ h, resetKey: st.resetKey + 1, simTime: 0 })),
  setTimeWarp: (timeWarp) => set({ timeWarp }),
  toggleRun: () => set((s) => ({ running: !s.running })),
  reset: () => set((s) => ({ running: false, resetKey: s.resetKey + 1, simTime: 0 })),
  setSimTime: (simTime) => set({ simTime }),
  applyScenario: (sc) =>
    set((st) => ({
      ...sc.params, scenarioId: sc.id, running: false, resetKey: st.resetKey + 1, simTime: 0,
    })),
  clearScenario: () =>
    set((st) => ({
      scenarioId: null, timeWarp: DEFAULT_TIME_WARP, running: false, resetKey: st.resetKey + 1, simTime: 0,
    })),
}));

export function useActiveSatelliteScenario(): SatelliteScenario | undefined {
  const id = useSatelliteStore((s) => s.scenarioId);
  return SATELLITE_SCENARIOS.find((s) => s.id === id);
}

/** Position de Bamako a la surface de la Terre pour un angle de rotation phi */
function bamakoPosition(phi: number, r: number): [number, number, number] {
  return [
    r * Math.cos(LAT_BAMAKO) * Math.cos(phi),
    r * Math.cos(LAT_BAMAKO) * Math.sin(phi),
    r * Math.sin(LAT_BAMAKO),
  ];
}

// ------------------------------------------------------------
//  Terre (sphere bleue) : axe des poles = axe z, l'orbite est
//  dans le plan de l'equateur (plan xy).
// ------------------------------------------------------------
function Terre({ phi }: { phi: number }) {
  const r = R_TERRE * SCALE;
  return (
    <group>
      <group rotation={[0, 0, phi]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[r, 64, 64]} />
          <meshStandardMaterial
            color="#1e40af"
            emissive="#1e3a8a"
            emissiveIntensity={0.3}
            roughness={0.8}
          />
        </mesh>
        {/* Meridiens et paralleles : on voit la Terre tourner */}
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.005}>
          <sphereGeometry args={[r, 12, 8]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.25} />
        </mesh>
      </group>
      {/* Atmosphere lumineuse */}
      <mesh scale={1.02}>
        <sphereGeometry args={[r, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Bamako */}
      <mesh position={bamakoPosition(phi, r * 1.01)}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <Billboard position={bamakoPosition(phi, r * 1.25)}>
        <Text fontSize={0.45} color="#fca5a5" anchorX="center">Bamako</Text>
      </Billboard>
    </group>
  );
}

// ------------------------------------------------------------
//  Satellite + orbite + vecteurs (+ rotation de la Terre)
// ------------------------------------------------------------
function Satellite() {
  const { h, running, resetKey, timeWarp } = useSatelliteStore();
  const scenario = useActiveSatelliteScenario();
  const radius = orbitalRadius({ h });
  const vLin = linearSpeed({ h });
  const omega = angularSpeed({ h });

  const thetaRef = useRef(0);
  const timeRef = useRef(0);
  const lastPushRef = useRef(0);
  const satRef = useRef<THREE.Group>(null!);
  const [, forceRender] = useReducer((x: number) => x + 1, 0);

  // Reset a chaque changement d'altitude ou reset manuel :
  // le satellite revient au point (r, 0) de son orbite, au-dessus de Bamako
  useEffect(() => {
    thetaRef.current = 0;
    timeRef.current = 0;
    lastPushRef.current = 0;
    satRef.current?.position.set(radius * SCALE, 0, 0);
    forceRender();
  }, [resetKey, radius]);

  useFrame((_, dt) => {
    if (!running) return;
    const clamped = Math.min(dt, 0.05);
    const dtPhys = clamped * timeWarp; // temps physique ecoule (s)
    timeRef.current += dtPhys;
    thetaRef.current = (thetaRef.current + omega * dtPhys) % (2 * Math.PI);

    const r = radius * SCALE;
    satRef.current.position.set(
      r * Math.cos(thetaRef.current),
      r * Math.sin(thetaRef.current),
      0,
    );
    // Temps simule envoye au panneau ~10 fois par seconde
    lastPushRef.current += clamped;
    if (lastPushRef.current > 0.1) {
      lastPushRef.current = 0;
      useSatelliteStore.getState().setSimTime(timeRef.current);
    }
    // Re-render pour que les vecteurs v et F suivent la rotation
    forceRender();
  });

  const r = radius * SCALE;
  const phiTerre = (OMEGA_TERRE * timeRef.current) % (2 * Math.PI);

  // Longueurs d'affichage (unites 3D) : proportionnelles aux grandeurs
  // physiques, normalisees par leur valeur au ras du sol.
  // v / v1 (v1 ~ 7,9 km/s = 1re vitesse cosmique) et g(h) / g0.
  const V_REF = linearSpeed({ h: 0 });
  const vLen = 2.5 * (vLin / V_REF);
  const fLen = 2.5 * (gravityAt({ h }) / G_0);

  // Vecteur vitesse (tangent a l'orbite)
  const vx = -Math.sin(thetaRef.current) * vLen;
  const vy = Math.cos(thetaRef.current) * vLen;

  // Vecteur force gravitationnelle (dirige vers le centre de la Terre)
  const fx = -Math.cos(thetaRef.current) * fLen;
  const fy = -Math.sin(thetaRef.current) * fLen;

  const orbitPoints = useMemo(() => {
    return sampleOrbit({ h }, 200).map(
      (p) => [p.x * SCALE, p.y * SCALE, 0] as [number, number, number],
    );
  }, [h]);

  const satPos: [number, number, number] = [
    r * Math.cos(thetaRef.current), r * Math.sin(thetaRef.current), 0,
  ];
  const color = scenario?.scene.color ?? '#f59e0b';
  const isTV = scenario?.id === 'satellite-tv';

  return (
    <>
      <Terre phi={phiTerre} />

      {/* Orbite */}
      <Line
        points={orbitPoints}
        color="#22d3ee"
        lineWidth={1.5}
        dashed
        dashSize={0.5}
        gapSize={0.3}
      />

      {/* Visee de la parabole de Bamako vers le satellite TV */}
      {isTV && (
        <Line
          points={[bamakoPosition(phiTerre, R_TERRE * SCALE), satPos]}
          color="#f472b6"
          lineWidth={1}
          dashed
          dashSize={0.6}
          gapSize={0.4}
        />
      )}

      {/* Groupe satellite */}
      <group ref={satRef} position={satPos}>
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} />
        </mesh>
        {/* Panneaux solaires */}
        <mesh>
          <boxGeometry args={[0.05, 1.1, 0.25]} />
          <meshStandardMaterial color="#1d4ed8" emissive="#1e3a8a" emissiveIntensity={0.4} />
        </mesh>
        {scenario && (
          <Billboard position={[0, 0.9, 0]}>
            <Text fontSize={0.5} color={color} anchorX="center">{scenario.scene.name}</Text>
          </Billboard>
        )}

        {running && (
          <>
            {/* Vecteur vitesse - rose */}
            <Line
              points={[[0, 0, 0], [vx, vy, 0]]}
              color="#f472b6"
              lineWidth={2}
            />
            <Billboard position={[vx * 1.1, vy * 1.1, 0]}>
              <Text fontSize={0.5} color="#f472b6" anchorX="center" anchorY="middle">v</Text>
            </Billboard>
            {/* Vecteur force - vert */}
            <Line
              points={[[0, 0, 0], [fx, fy, 0]]}
              color="#10b981"
              lineWidth={2}
            />
            <Billboard position={[fx * 1.15, fy * 1.15, 0]}>
              <Text fontSize={0.5} color="#10b981" anchorX="center" anchorY="middle">F</Text>
            </Billboard>
          </>
        )}
      </group>
    </>
  );
}

// ------------------------------------------------------------
//  Repere : petit axe X et Y
// ------------------------------------------------------------
function Repere() {
  const L = 8;
  return (
    <group>
      <Line points={[[0, 0, 0], [L, 0, 0]]} color="#22d3ee" lineWidth={1} />
      <Line points={[[0, 0, 0], [0, L, 0]]} color="#f59e0b" lineWidth={1} />
    </group>
  );
}

/** Recule la camera pour que toute l'orbite soit visible */
function CameraRig() {
  const h = useSatelliteStore((s) => s.h);
  const scenarioId = useSatelliteStore((s) => s.scenarioId);
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as
    | { target: THREE.Vector3; update: () => void }
    | null;
  // Palier de taille : on ne recadre que si l'orbite change nettement
  const bucket = Math.ceil(orbitalRadius({ h }) * SCALE / 8);

  useEffect(() => {
    const dist = Math.max(22, bucket * 8 * 2.3);
    const dir = new THREE.Vector3(12, 8, 15).normalize();
    camera.position.copy(dir.multiplyScalar(dist));
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    } else {
      camera.lookAt(0, 0, 0);
    }
  }, [bucket, scenarioId, camera, controls]);

  return null;
}

export function SatelliteSimulation() {
  return (
    <div className="w-full h-[420px] md:h-[520px] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas camera={{ position: [12, 8, 15], fov: 45, far: 2000 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[20, 30, 15]} intensity={1.2} />
        <pointLight position={[0, 0, 0]} intensity={1} color="#3b82f6" />

        <Stars radius={300} depth={60} count={1500} factor={3} fade />

        <Repere />
        <Satellite />
        <CameraRig />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
