'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text, Billboard } from '@react-three/drei';
import { useEffect, useRef, useReducer } from 'react';
import * as THREE from 'three';
import { create } from 'zustand';
import {
  MotionType,
  mruPosition,
  mruvPosition,
  mruvVelocity,
  mruvStoppingTime,
  mruvTimeToReach,
  mcuAngle,
  mcuLinearSpeed,
  mcuCentripetalAcceleration,
} from '../../lib/physics/kinematics';
import {
  KINEMATICS_SCENARIOS,
  fr,
  type KinematicsScenario,
} from '../../lib/real-life/scenarios';

/** Longueur de la piste affichee pour MRU / MRUV (m) */
const TRACK_LENGTH = 30;

const VEHICLE_NAME = { moto: 'La moto', bus: 'Le minibus' } as const;

export interface Outcome {
  text: string;
  tone: 'success' | 'danger' | 'info';
}

interface UIState {
  motionType: MotionType;
  // MRU
  v: number;
  // MRUV
  v0: number;
  a: number;
  // MCU
  R: number;
  omega: number;
  running: boolean;
  resetKey: number;
  /** Scenario "vie reelle" actif (null = mode libre) */
  scenarioId: string | null;
  outcome: Outcome | null;
  setMotionType: (m: MotionType) => void;
  setV: (v: number) => void;
  setV0: (v: number) => void;
  setA: (a: number) => void;
  setR: (r: number) => void;
  setOmega: (w: number) => void;
  toggleRun: () => void;
  reset: () => void;
  setOutcome: (o: Outcome) => void;
  applyScenario: (s: KinematicsScenario) => void;
  clearScenario: () => void;
}

const fresh = (st: UIState) => ({ resetKey: st.resetKey + 1, outcome: null });

export const useKinematicsStore = create<UIState>((set) => ({
  motionType: 'MRUV',
  v: 5,
  v0: 0,
  a: 2,
  R: 5,
  omega: 1.5,
  running: false,
  resetKey: 0,
  scenarioId: null,
  outcome: null,
  // Changer de type de mouvement quitte le scenario en cours
  setMotionType: (motionType) =>
    set((st) => ({ motionType, running: false, scenarioId: null, ...fresh(st) })),
  setV: (v) => set((st) => ({ v, ...fresh(st) })),
  setV0: (v0) => set((st) => ({ v0, ...fresh(st) })),
  setA: (a) => set((st) => ({ a, ...fresh(st) })),
  setR: (R) => set((st) => ({ R, ...fresh(st) })),
  setOmega: (omega) => set((st) => ({ omega, ...fresh(st) })),
  toggleRun: () => set((s) => ({ running: !s.running })),
  reset: () => set((s) => ({ running: false, ...fresh(s) })),
  setOutcome: (outcome) => set({ outcome }),
  applyScenario: (sc) =>
    set((st) => ({ ...sc.params, scenarioId: sc.id, running: false, ...fresh(st) })),
  clearScenario: () => set((st) => ({ scenarioId: null, running: false, ...fresh(st) })),
}));

export function useActiveKinematicsScenario(): KinematicsScenario | undefined {
  const id = useKinematicsStore((s) => s.scenarioId);
  return KINEMATICS_SCENARIOS.find((s) => s.id === id);
}

// ------------------------------------------------------------
//  Vehicules (scenarios vie reelle)
// ------------------------------------------------------------
/** Longueur du vehicule : l'avant est a x + length/2 */
const VEHICLE_LENGTH = { moto: 2, bus: 5 } as const;

function Wheel({ x, r, z = 0 }: { x: number; r: number; z?: number }) {
  return (
    <mesh position={[x, r, z]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[r, r, 0.15, 20]} />
      <meshStandardMaterial color="#0f172a" />
    </mesh>
  );
}

function Moto() {
  return (
    <group>
      <Wheel x={-0.7} r={0.33} />
      <Wheel x={0.7} r={0.33} />
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[1.3, 0.35, 0.3]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      {/* Conducteur */}
      <mesh position={[-0.15, 1.2, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.75, 12]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      <mesh position={[-0.05, 1.75, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>
      <Line points={[[0.55, 0.8, 0], [0.75, 1.25, 0]]} color="#94a3b8" lineWidth={3} />
    </group>
  );
}

function Sotrama() {
  return (
    <group>
      <Wheel x={-1.6} r={0.4} z={0.8} />
      <Wheel x={-1.6} r={0.4} z={-0.8} />
      <Wheel x={1.6} r={0.4} z={0.8} />
      <Wheel x={1.6} r={0.4} z={-0.8} />
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[5, 1.9, 1.9]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
      {/* Vitres */}
      <mesh position={[0.3, 1.8, 0]}>
        <boxGeometry args={[4, 0.6, 1.95]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function Obstacle({ x, label }: { x: number; label: string }) {
  return (
    <group position={[x + 1.05, 0, 0]}>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2, 0.8, 1.6]} />
        <meshStandardMaterial color="#92400e" />
      </mesh>
      <Wheel x={0} r={0.45} z={0.9} />
      <Wheel x={0} r={0.45} z={-0.9} />
      <Billboard position={[0, 2.2, 0]}>
        <Text fontSize={0.6} color="#fca5a5" anchorX="center">{label}</Text>
      </Billboard>
    </group>
  );
}

// ------------------------------------------------------------
//  MRU / MRUV : mobile en ligne droite (bille ou vehicule)
// ------------------------------------------------------------
function LinearScene() {
  const { motionType, v, v0, a, running, resetKey } = useKinematicsStore();
  const scenario = useActiveKinematicsScenario();
  const vehicle = scenario && scenario.scene.vehicle !== 'cabin' ? scenario.scene.vehicle : null;
  const obstacle = scenario?.scene.obstacle;

  const tRef = useRef(0);
  const groupRef = useRef<THREE.Group>(null!);
  const [, force] = useReducer((x: number) => x + 1, 0);

  const isMRU = motionType === 'MRU';
  const posAt = (t: number) => (isMRU ? mruPosition({ x0: 0, v }, t) : mruvPosition({ x0: 0, v0, a }, t));
  const velAt = (t: number) => (isMRU ? v : mruvVelocity({ x0: 0, v0, a }, t));
  // Un vehicule qui freine s'arrete (il ne repart pas en marche arriere)
  const tStop = !isMRU && vehicle ? mruvStoppingTime({ x0: 0, v0, a }) : null;
  // Position de reference = avant du vehicule (c'est lui qui touche l'obstacle)

  useEffect(() => {
    tRef.current = 0;
    groupRef.current?.position.set(0, 0, 0);
    force();
  }, [resetKey]);

  /** Instant exact ou le mobile atteint l'abscisse x (null si jamais) */
  const timeTo = (x: number) =>
    isMRU ? (v > 0 ? x / v : null) : mruvTimeToReach({ x0: 0, v0, a }, x);

  useFrame((_, dt) => {
    if (!running) return;
    const store = useKinematicsStore.getState();
    let t = tRef.current + Math.min(dt, 0.05);
    let outcome: Outcome | null = null;
    let stop = false;

    // Evenements possibles pendant ce pas de temps (instants exacts) :
    // collision avec l'obstacle, arret du vehicule, fin de piste.
    const tHit = obstacle ? timeTo(obstacle.x) : null;
    const tEnd = timeTo(TRACK_LENGTH);

    if (tHit !== null && t >= tHit && (tStop === null || tHit <= tStop)) {
      t = tHit;
      stop = true;
      const vImpact = Math.abs(velAt(t));
      outcome = {
        tone: 'danger',
        text: `Collision ! ${VEHICLE_NAME[vehicle ?? 'moto']} heurte l'obstacle (${obstacle!.label.toLowerCase()}) a ${fr(vImpact, 1)} m/s (${fr(vImpact * 3.6, 0)} km/h).`,
      };
    } else if (tStop !== null && t >= tStop) {
      t = tStop;
      stop = true;
      const xStop = posAt(t);
      outcome = obstacle
        ? { tone: 'success', text: `Arret a ${fr(xStop, 1)} m : ${VEHICLE_NAME[vehicle ?? 'moto'].toLowerCase()} s'arrete ${fr(obstacle.x - xStop, 1)} m avant l'obstacle (${obstacle.label.toLowerCase()}).` }
        : { tone: 'info', text: `Arret a ${fr(xStop, 1)} m.` };
    } else if (tEnd !== null && t >= tEnd) {
      t = tEnd;
      stop = true;
      const vEnd = Math.abs(velAt(t));
      outcome = {
        tone: 'info',
        text: `${TRACK_LENGTH} m parcourus en ${fr(t, 2)} s. Vitesse a l'arrivee : ${fr(vEnd, 2)} m/s (${fr(vEnd * 3.6, 0)} km/h).`,
      };
    } else if (t > 0.1 && posAt(t) < 0) {
      // Retour en arriere avant l'origine (mode libre)
      stop = true;
    }

    tRef.current = t;
    groupRef.current.position.set(Math.max(posAt(t), 0), 0, 0);
    if (stop) {
      useKinematicsStore.setState({ running: false });
      if (scenario && outcome) store.setOutcome(outcome);
    }
    force();
  });

  const t = tRef.current;
  const speed = Math.abs(velAt(t));

  return (
    <>
      {/* Route (vehicule) ou rail (bille) */}
      {vehicle ? (
        <mesh position={[TRACK_LENGTH / 2, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[TRACK_LENGTH + 8, 4]} />
          <meshStandardMaterial color="#1f2937" side={THREE.DoubleSide} />
        </mesh>
      ) : (
        <Line points={[[0, 0.5, 0], [TRACK_LENGTH, 0.5, 0]]} color="#475569" lineWidth={1} />
      )}

      {/* Marqueurs tous les 5 m */}
      {[0, 5, 10, 15, 20, 25, 30].map((m) => (
        <group key={m}>
          <Line points={[[m, 0, vehicle ? 2.05 : 0], [m, 1, vehicle ? 2.05 : 0]]} color="#334155" lineWidth={1} />
          <Billboard position={[m, -0.5, vehicle ? 2.05 : 0]}>
            <Text fontSize={0.6} color="#64748b" anchorX="center" anchorY="middle">
              {`${m}`}
            </Text>
          </Billboard>
        </group>
      ))}

      {obstacle && <Obstacle x={obstacle.x} label={obstacle.label} />}

      <group ref={groupRef}>
        {vehicle && (
          <group position={[-VEHICLE_LENGTH[vehicle] / 2, 0, 0]}>
            {vehicle === 'moto' ? <Moto /> : <Sotrama />}
          </group>
        )}
        {!vehicle && (
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.7} />
          </mesh>
        )}
        {/* Compteur de vitesse en direct */}
        {vehicle && (
          <Billboard position={[-VEHICLE_LENGTH[vehicle] / 2, vehicle === 'bus' ? 3.2 : 2.5, 0]}>
            <Text fontSize={0.55} color="#fbbf24" anchorX="center">
              {`${fr(speed * 3.6, 0)} km/h  |  t = ${fr(t, 1)} s`}
            </Text>
          </Billboard>
        )}
      </group>
    </>
  );
}

// ------------------------------------------------------------
//  MCU : point (ou nacelle de manege) qui tourne sur un cercle
// ------------------------------------------------------------
function MCUScene() {
  const { R, omega, running, resetKey } = useKinematicsStore();
  const scenario = useActiveKinematicsScenario();
  const isCabin = scenario?.scene.vehicle === 'cabin';
  const thetaRef = useRef(0);
  const meshRef = useRef<THREE.Group>(null!);
  const [, force] = useReducer((x: number) => x + 1, 0);

  // Reinitialisation : angle nul, mobile au point (R, 0)
  useEffect(() => {
    thetaRef.current = 0;
    meshRef.current?.position.set(R, 0, 0);
    force();
  }, [resetKey, R]);

  useFrame((_, dt) => {
    if (!running) return;
    const clamped = Math.min(dt, 0.05);
    thetaRef.current = mcuAngle({ R, omega, theta0: thetaRef.current }, clamped);
    const x = R * Math.cos(thetaRef.current);
    const y = R * Math.sin(thetaRef.current);
    meshRef.current.position.set(x, y, 0);
    force();
  });

  const vLin = mcuLinearSpeed({ R, omega });
  const aC = mcuCentripetalAcceleration({ R, omega });

  // Vecteur vitesse (tangent)
  const px = R * Math.cos(thetaRef.current);
  const py = R * Math.sin(thetaRef.current);
  const vScale = 0.3;
  const vx = -Math.sin(thetaRef.current) * vLin * vScale;
  const vy = Math.cos(thetaRef.current) * vLin * vScale;
  const aScale = 0.3;
  const ax = -Math.cos(thetaRef.current) * aC * aScale;
  const ay = -Math.sin(thetaRef.current) * aC * aScale;

  return (
    <>
      {/* Cercle */}
      <Line
        points={Array.from({ length: 65 }, (_, i) => {
          const th = (2 * Math.PI * i) / 64;
          return [R * Math.cos(th), R * Math.sin(th), 0] as [number, number, number];
        })}
        color="#22d3ee"
        lineWidth={1.5}
      />

      {/* Centre */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Manege : mat central, bras et nacelles fixes sur le bras tournant */}
      {isCabin && (
        <>
          <mesh position={[0, 0, -0.6]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 1, 16]} />
            <meshStandardMaterial color="#a855f7" />
          </mesh>
          <Line points={[[0, 0, 0], [px, py, 0]]} color="#e2e8f0" lineWidth={4} />
          {[1, 2, 3].map((i) => {
            const th = thetaRef.current + (i * Math.PI) / 2;
            return (
              <group key={i}>
                <Line points={[[0, 0, 0], [R * Math.cos(th), R * Math.sin(th), 0]]} color="#64748b" lineWidth={3} />
                <mesh position={[R * Math.cos(th), R * Math.sin(th), 0]}>
                  <boxGeometry args={[0.7, 0.7, 0.7]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>
              </group>
            );
          })}
        </>
      )}

      {/* Mobile (bille ou nacelle de l'enfant) */}
      <group ref={meshRef} position={[px, py, 0]}>
        {isCabin ? (
          <>
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.4} />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#7c4a2d" />
            </mesh>
          </>
        ) : (
          <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.7} />
          </mesh>
        )}
      </group>

      {/* Vecteurs */}
      {running && (
        <>
          <Line points={[[px, py, 0], [px + vx, py + vy, 0]]} color="#f472b6" lineWidth={2.5} />
          <Line points={[[px, py, 0], [px + ax, py + ay, 0]]} color="#10b981" lineWidth={2.5} />
          {isCabin && (
            <>
              <Billboard position={[px + vx * 1.15, py + vy * 1.15, 0]}>
                <Text fontSize={0.45} color="#f472b6">v</Text>
              </Billboard>
              <Billboard position={[px + ax * 1.3, py + ay * 1.3, 0]}>
                <Text fontSize={0.45} color="#10b981">a_N</Text>
              </Billboard>
            </>
          )}
        </>
      )}
    </>
  );
}

/** Recadre la camera selon le type de mouvement */
function CameraRig() {
  const motionType = useKinematicsStore((s) => s.motionType);
  const R = useKinematicsStore((s) => s.R);
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as
    | { target: THREE.Vector3; update: () => void }
    | null;

  useEffect(() => {
    const circle = motionType === 'MCU';
    const target: [number, number, number] = circle ? [0, 0, 0] : [TRACK_LENGTH / 2, 0, 0];
    if (circle) camera.position.set(0, 2, Math.max(12, R * 3));
    else camera.position.set(TRACK_LENGTH / 2 - 6, 9, 24);
    if (controls) {
      controls.target.set(...target);
      controls.update();
    } else {
      camera.lookAt(...target);
    }
    // R volontairement exclu : on ne recadre pas a chaque mouvement du curseur
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionType, camera, controls]);

  return null;
}

// ------------------------------------------------------------
//  Wrapper avec repere
// ------------------------------------------------------------
function Scene() {
  const { motionType } = useKinematicsStore();
  return (
    <>
      <Grid
        args={[100, 100]}
        cellSize={1}
        cellColor="#0f172a"
        sectionColor="#1e293b"
        infiniteGrid
        fadeDistance={80}
      />
      {motionType === 'MCU' ? <MCUScene /> : <LinearScene key={motionType} />}
      <CameraRig />
    </>
  );
}

export function KinematicsSimulation() {
  return (
    <div className="w-full h-[420px] md:h-[520px] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas camera={{ position: [TRACK_LENGTH / 2 - 6, 9, 24], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[20, 30, 15]} intensity={1} />
        <Scene />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
