'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text, Billboard } from '@react-three/drei';
import { useEffect, useMemo, useRef, useReducer } from 'react';
import * as THREE from 'three';
import { create } from 'zustand';
import {
  initialState,
  stateAt,
  flightTime,
  range,
  sampleTrajectory,
  type ProjectileState,
} from '../../lib/physics/projectile';
import {
  PROJECTILE_SCENARIOS,
  fr,
  type ProjectileScenario,
} from '../../lib/real-life/scenarios';

export interface SamplePoint {
  t: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface Outcome {
  text: string;
  tone: 'success' | 'danger' | 'info';
}

interface UIState {
  v0: number;
  alphaDeg: number;
  g: number;
  h0: number;
  running: boolean;
  /** true quand le projectile a touche le sol (fin du tir) */
  landed: boolean;
  resetKey: number;
  history: SamplePoint[];
  /** Scenario "vie reelle" actif (null = mode libre) */
  scenarioId: string | null;
  /** Resultat du tir par rapport a la cible du scenario */
  outcome: Outcome | null;
  setV0: (v: number) => void;
  setAlpha: (a: number) => void;
  setG: (g: number) => void;
  setH0: (h: number) => void;
  toggleRun: () => void;
  reset: () => void;
  pushSample: (s: SamplePoint) => void;
  land: () => void;
  setOutcome: (o: Outcome) => void;
  applyScenario: (s: ProjectileScenario) => void;
  clearScenario: () => void;
}

export const useProjectileStore = create<UIState>((set) => ({
  v0: 20,
  alphaDeg: 45,
  g: 9.81,
  h0: 0,
  running: false,
  landed: false,
  resetKey: 0,
  history: [],
  scenarioId: null,
  outcome: null,
  // Changer un parametre relance un tir propre (le scenario reste actif :
  // l'eleve peut chercher lui-meme les bons reglages pour toucher la cible)
  setV0: (v0) => set((s) => ({ v0, ...cleared(s) })),
  setAlpha: (alphaDeg) => set((s) => ({ alphaDeg, ...cleared(s) })),
  setG: (g) => set((s) => ({ g, ...cleared(s) })),
  setH0: (h0) => set((s) => ({ h0, ...cleared(s) })),
  // Apres un atterrissage, "Lancer" recommence un nouveau tir
  toggleRun: () =>
    set((s) =>
      s.landed
        ? { ...cleared(s), running: true }
        : { running: !s.running },
    ),
  reset: () => set((s) => cleared(s)),
  pushSample: (sample) => set((s) => ({ history: [...s.history, sample] })),
  land: () => set({ running: false, landed: true }),
  setOutcome: (outcome) => set({ outcome }),
  applyScenario: (sc) => set((s) => ({ ...sc.params, scenarioId: sc.id, ...cleared(s) })),
  clearScenario: () => set((s) => ({ scenarioId: null, ...cleared(s) })),
}));

function cleared(s: UIState) {
  return {
    running: false,
    landed: false,
    resetKey: s.resetKey + 1,
    history: [] as SamplePoint[],
    outcome: null,
  };
}

/** Scenario actif (ou undefined en mode libre) */
export function useActiveProjectileScenario(): ProjectileScenario | undefined {
  const id = useProjectileStore((s) => s.scenarioId);
  return PROJECTILE_SCENARIOS.find((s) => s.id === id);
}

// ------------------------------------------------------------
//  Echelle d'affichage : le mode libre montre 60 m ; un scenario
//  peut montrer 6 m (basket) ou 70 m (football).
// ------------------------------------------------------------
const DEFAULT_VIEW = 60;

function niceStep(view: number): number {
  if (view <= 8) return 1;
  if (view <= 15) return 2;
  if (view <= 40) return 5;
  return 10;
}

function Axes({ view }: { view: number }) {
  const k = view / DEFAULT_VIEW;
  const stepTick = niceStep(view);
  const ticks = Array.from({ length: Math.floor(view / stepTick) }, (_, i) => (i + 1) * stepTick);
  return (
    <group>
      <Line points={[[0, 0, 0], [view, 0, 0]]} color="#22d3ee" lineWidth={1.5} />
      <Billboard position={[view + 3 * k, 0, 0]}>
        <Text fontSize={2 * k} color="#22d3ee" anchorX="center" anchorY="middle">x (m)</Text>
      </Billboard>

      <Line points={[[0, 0, 0], [0, view, 0]]} color="#f59e0b" lineWidth={1.5} />
      <Billboard position={[0, view + 3 * k, 0]}>
        <Text fontSize={2 * k} color="#f59e0b" anchorX="center" anchorY="middle">y (m)</Text>
      </Billboard>

      {ticks.map((v) => (
        <group key={`gx-${v}`}>
          <Line points={[[v, -0.6 * k, 0], [v, 0.6 * k, 0]]} color="#64748b" lineWidth={1} />
          <Billboard position={[v, -2 * k, 0]}>
            <Text fontSize={1.3 * k} color="#94a3b8" anchorX="center" anchorY="middle">{v}</Text>
          </Billboard>
        </group>
      ))}

      {ticks.map((v) => (
        <group key={`gy-${v}`}>
          <Line points={[[-0.6 * k, v, 0], [0.6 * k, v, 0]]} color="#64748b" lineWidth={1} />
          <Billboard position={[-2.2 * k, v, 0]}>
            <Text fontSize={1.3 * k} color="#94a3b8" anchorX="center" anchorY="middle">{v}</Text>
          </Billboard>
        </group>
      ))}
    </group>
  );
}

function VectorArrow({
  origin, vector, color, label, scale = 1, size = 1,
}: {
  origin: [number, number, number];
  vector: [number, number, number];
  color: string;
  label: string;
  scale?: number;
  /** Facteur de taille de la pointe et du texte */
  size?: number;
}) {
  const length = Math.sqrt(vector[0] ** 2 + vector[1] ** 2 + vector[2] ** 2) * scale;
  if (length < 0.2 * size) return null;

  const end: [number, number, number] = [
    origin[0] + vector[0] * scale,
    origin[1] + vector[1] * scale,
    origin[2] + vector[2] * scale,
  ];

  const dir = new THREE.Vector3(vector[0], vector[1], vector[2]).normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir,
  );
  const euler = new THREE.Euler().setFromQuaternion(quat);

  return (
    <group>
      <Line points={[origin, end]} color={color} lineWidth={2.5} />
      <mesh position={end} rotation={euler}>
        <coneGeometry args={[0.5 * size, 1.4 * size, 12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Billboard position={[end[0] + size, end[1] + size, end[2]]}>
        <Text fontSize={1.8 * size} color={color} anchorX="left" anchorY="middle">{label}</Text>
      </Billboard>
    </group>
  );
}

// ------------------------------------------------------------
//  Decors des scenarios "vie reelle"
// ------------------------------------------------------------
function Label({ position, text, size, color = '#e2e8f0' }: {
  position: [number, number, number]; text: string; size: number; color?: string;
}) {
  return (
    <Billboard position={position}>
      <Text fontSize={size} color={color} anchorX="center" anchorY="middle">{text}</Text>
    </Billboard>
  );
}

function TargetProp({ scenario }: { scenario: ProjectileScenario }) {
  const t = scenario.scene.target;
  const k = scenario.scene.viewSize / DEFAULT_VIEW;
  const labelSize = 1.6 * k;

  switch (t.kind) {
    case 'hoop':
      return (
        <group>
          {/* Cercle (diametre 45 cm) */}
          <mesh position={[t.x, t.y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.23, 0.02, 12, 48]} />
            <meshStandardMaterial color="#ea580c" emissive="#ea580c" emissiveIntensity={0.4} />
          </mesh>
          {/* Planche */}
          <mesh position={[t.x + 0.38, t.y + 0.45, 0]}>
            <boxGeometry args={[0.04, 1.05, 1.8]} />
            <meshStandardMaterial color="#e2e8f0" transparent opacity={0.75} />
          </mesh>
          {/* Poteau */}
          <mesh position={[t.x + 1.0, (t.y + 0.6) / 2, 0]}>
            <cylinderGeometry args={[0.06, 0.06, t.y + 0.6, 12]} />
            <meshStandardMaterial color="#475569" />
          </mesh>
          <Label position={[t.x, t.y + 1.3, 0]} text={`${t.label} (${fr(t.y)} m)`} size={labelSize} />
        </group>
      );
    case 'zone':
      return (
        <group>
          <mesh position={[(t.x1 + t.x2) / 2, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[t.x2 - t.x1, Math.max(2, (t.x2 - t.x1) * 0.4)]} />
            <meshStandardMaterial color="#c8a165" side={THREE.DoubleSide} />
          </mesh>
          <Label position={[(t.x1 + t.x2) / 2, 1.5 * k * 2, 0]} text={t.label} size={labelSize} />
        </group>
      );
    case 'line':
      return (
        <group>
          <mesh position={[t.x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.4, 40]} />
            <meshBasicMaterial color="#f8fafc" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[t.x / 2, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[t.x * 1.6, 40]} />
            <meshStandardMaterial color="#166534" side={THREE.DoubleSide} />
          </mesh>
          <Label position={[t.x, 4 * k * 2, 0]} text={t.label} size={labelSize} />
        </group>
      );
    case 'crate':
      return (
        <group>
          <mesh position={[t.x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 2, 32]} />
            <meshBasicMaterial color="#ef4444" side={THREE.DoubleSide} />
          </mesh>
          <Label position={[t.x, 3, 0]} text={t.label} size={labelSize} color="#fca5a5" />
        </group>
      );
  }
}

/** Joueur stylise (basket) : le ballon part de sa main levee */
function Player({ h0 }: { h0: number }) {
  return (
    <group position={[-0.25, 0, 0]}>
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 1.1, 12]} />
        <meshStandardMaterial color="#1d4ed8" />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.18, 0.16, 0.5, 12]} />
        <meshStandardMaterial color="#facc15" />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial color="#7c4a2d" />
      </mesh>
      {/* Bras leve vers le point de lacher */}
      <Line points={[[0, 1.45, 0], [0.22, h0 - 0.05, 0]]} color="#7c4a2d" lineWidth={4} />
    </group>
  );
}

/** Helicoptere : il avance a la meme vitesse horizontale que le colis */
function HelicopterProp({ x, h0, spinning }: { x: number; h0: number; spinning: boolean }) {
  const rotor = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    if (spinning && rotor.current) rotor.current.rotation.y += dt * 25;
  });
  return (
    <group position={[x, h0 + 1.3, 0]}>
      <mesh scale={[2.2, 1, 1]}>
        <sphereGeometry args={[0.8, 24, 16]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
      <mesh position={[-2.6, 0.2, 0]}>
        <boxGeometry args={[3, 0.25, 0.25]} />
        <meshStandardMaterial color="#15803d" />
      </mesh>
      <mesh ref={rotor} position={[0, 1, 0]}>
        <boxGeometry args={[6, 0.06, 0.3]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[2.4, 0.08, 1.2]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </group>
  );
}

function Hose({ h0, alpha }: { h0: number; alpha: number }) {
  return (
    <group>
      <Line points={[[-1.2, 0, 0], [-0.4, 0.3, 0], [0 - 0.25 * Math.cos(alpha), h0 - 0.25 * Math.sin(alpha), 0]]}
        color="#16a34a" lineWidth={5} />
      <Line points={[[-0.25 * Math.cos(alpha), h0 - 0.25 * Math.sin(alpha), 0], [0, h0, 0]]}
        color="#94a3b8" lineWidth={7} />
    </group>
  );
}

// ------------------------------------------------------------
//  Detection du resultat par rapport a la cible
// ------------------------------------------------------------
function landingOutcome(sc: ProjectileScenario, xLand: number): Outcome | null {
  const t = sc.scene.target;
  switch (t.kind) {
    case 'zone':
      return xLand >= t.x1 && xLand <= t.x2
        ? { tone: 'success', text: `Reussi : retombe a ${fr(xLand)} m, dans la zone « ${t.label} ».` }
        : { tone: 'danger', text: `Rate : retombe a ${fr(xLand)} m, hors de la zone (${fr(t.x1, 1)} a ${fr(t.x2, 1)} m).` };
    case 'line':
      return xLand >= t.x
        ? { tone: 'success', text: `Le projectile retombe a ${fr(xLand, 1)} m : il depasse la ligne « ${t.label} » (${fr(t.x, 1)} m).` }
        : { tone: 'danger', text: `Le projectile retombe a ${fr(xLand, 1)} m : il n'atteint pas la ligne « ${t.label} » (${fr(t.x, 1)} m).` };
    case 'crate': {
      const miss = xLand - t.x;
      return Math.abs(miss) <= 2
        ? { tone: 'success', text: `Colis livre ! Il touche le sol a ${fr(Math.abs(miss), 1)} m du centre de la zone.` }
        : { tone: 'danger', text: `Rate de ${fr(Math.abs(miss), 1)} m : le colis tombe ${miss > 0 ? 'apres' : 'avant'} la zone.` };
    }
    case 'hoop':
      return null; // gere au passage a la hauteur du panier
  }
}

function Ball() {
  const { v0, alphaDeg, g, h0, running, landed, resetKey } = useProjectileStore();
  const scenario = useActiveProjectileScenario();
  const params = useMemo(
    () => ({ v0, alpha: (alphaDeg * Math.PI) / 180, g, h0 }),
    [v0, alphaDeg, g, h0],
  );
  const stateRef = useRef<ProjectileState>(initialState(params));
  const meshRef = useRef<THREE.Mesh>(null!);
  const accRef = useRef(0);
  const hoopCheckedRef = useRef(false);
  const [, forceRender] = useReducer((x: number) => x + 1, 0);

  const T = flightTime(params);
  const view = scenario?.scene.viewSize ?? DEFAULT_VIEW;
  const k = view / DEFAULT_VIEW;
  const ballRadius = scenario ? Math.max(scenario.scene.ballRadius, view * 0.008) : 0.4;
  // Fleche vitesse : environ 15 % de la zone affichee pour v0
  const vecScale = scenario ? (0.15 * view) / Math.max(scenario.params.v0, 1) : 0.4;

  // Nouveau tir : retour au point de depart
  useEffect(() => {
    stateRef.current = initialState(params);
    accRef.current = 0;
    hoopCheckedRef.current = false;
    meshRef.current?.position.set(0, params.h0, 0);
    forceRender();
  }, [resetKey, params]);

  useFrame((_, dt) => {
    if (!running) return;
    const store = useProjectileStore.getState();
    // Petites scenes (basket) : on ralentit pour bien voir le mouvement
    const slowMo = view < 15 ? 0.5 : 1;
    const clamped = Math.min(dt, 0.05) * slowMo;
    const prev = stateRef.current;
    const t = prev.t + clamped;

    // Passage du ballon a la hauteur du panier, en descendant
    if (scenario?.scene.target.kind === 'hoop' && !hoopCheckedRef.current) {
      const hoop = scenario.scene.target;
      const next = stateAt(params, Math.min(t, T));
      if (prev.y >= hoop.y && next.y < hoop.y && next.vy < 0) {
        hoopCheckedRef.current = true;
        const f = (prev.y - hoop.y) / (prev.y - next.y);
        const xCross = prev.x + f * (next.x - prev.x);
        const gap = xCross - hoop.x;
        store.setOutcome(
          Math.abs(gap) <= 0.23 - 0.12
            ? { tone: 'success', text: 'Panier ! Le ballon passe dans le cercle.' }
            : { tone: 'danger', text: `Rate : le ballon passe ${fr(Math.abs(gap) * 100, 0)} cm ${gap > 0 ? 'trop loin' : 'trop court'}.` },
        );
      }
    }

    // Atterrissage : on place la bille exactement au point d'impact
    if (t >= T) {
      const impact = stateAt(params, T);
      stateRef.current = { ...impact, y: 0 };
      meshRef.current.position.set(impact.x, 0, 0);
      store.pushSample({ ...impact, y: 0 });
      if (scenario) {
        const o = landingOutcome(scenario, impact.x);
        if (o) store.setOutcome(o);
        else if (scenario.scene.target.kind === 'hoop' && !hoopCheckedRef.current) {
          store.setOutcome({ tone: 'danger', text: 'Rate : le ballon ne monte pas jusqu\'au panier.' });
        }
      }
      store.land();
      forceRender();
      return;
    }

    // Solution analytique exacte (pas d'erreur d'integration numerique) :
    // la bille suit parfaitement la parabole theorique en pointilles.
    const next = stateAt(params, t);
    stateRef.current = next;
    meshRef.current.position.set(next.x, next.y, 0);

    accRef.current += clamped;
    if (accRef.current >= 0.05 * slowMo) {
      accRef.current = 0;
      store.pushSample({
        t: next.t, x: next.x, y: next.y, vx: next.vx, vy: next.vy,
      });
    }
    forceRender();
  });

  const trajectoryPoints = useMemo(() => {
    return sampleTrajectory(params, 200).map(
      (p) => [p.x, p.y, 0] as [number, number, number],
    );
  }, [params]);

  const pos: [number, number, number] = [stateRef.current.x, stateRef.current.y, 0];
  const vx = stateRef.current.vx;
  const vy = stateRef.current.vy;
  const R = range(params);
  const showVectors = running || stateRef.current.t > 0;
  const launcher = scenario?.scene.launcher;
  const isWater = launcher === 'hose';

  // Jet d'eau : on dessine la partie deja parcourue en trait plein
  const jetPoints = useMemo(() => {
    if (!isWater || stateRef.current.t <= 0) return [];
    const n = 40;
    return Array.from({ length: n + 1 }, (_, i) => {
      const s = stateAt(params, (stateRef.current.t * i) / n);
      return [s.x, Math.max(s.y, 0), 0] as [number, number, number];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWater, params, stateRef.current.t]);

  return (
    <>
      {trajectoryPoints.length > 1 && (
        <Line
          points={trajectoryPoints}
          color="#d4a017"
          lineWidth={2}
          dashed
          dashSize={0.6 * k}
          gapSize={0.4 * k}
        />
      )}
      {jetPoints.length > 1 && (
        <Line points={jetPoints} color="#38bdf8" lineWidth={5} transparent opacity={0.8} />
      )}

      {/* Plateforme de depart si h0 > 0 (mode libre) */}
      {!scenario && h0 > 0 && (
        <mesh position={[-1, h0 / 2, 0]}>
          <boxGeometry args={[2, h0, 2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      )}

      {scenario && <TargetProp scenario={scenario} />}
      {launcher === 'player' && <Player h0={h0} />}
      {launcher === 'hose' && <Hose h0={h0} alpha={params.alpha} />}
      {launcher === 'helicopter' && (
        <HelicopterProp x={stateRef.current.x} h0={h0} spinning />
      )}

      <mesh ref={meshRef} position={pos}>
        {launcher === 'helicopter' ? (
          <boxGeometry args={[ballRadius * 2, ballRadius * 2, ballRadius * 2]} />
        ) : (
          <sphereGeometry args={[ballRadius, 32, 32]} />
        )}
        <meshStandardMaterial
          color={scenario?.scene.ballColor ?? '#f59e0b'}
          emissive={scenario?.scene.ballColor ?? '#f59e0b'}
          emissiveIntensity={scenario ? 0.25 : 0.6}
        />
      </mesh>

      {/* Point d'impact theorique (portee) */}
      <mesh position={[R, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6 * k, 0.9 * k, 32]} />
        <meshBasicMaterial color={landed ? '#ef4444' : '#64748b'} side={THREE.DoubleSide} />
      </mesh>
      {landed && (
        <Billboard position={[R, 3 * k + 0.3, 0]}>
          <Text fontSize={1.6 * k} color="#ef4444" anchorX="center" anchorY="middle">
            {`Impact : x = ${R.toFixed(2)} m`}
          </Text>
        </Billboard>
      )}

      {showVectors && !landed && (
        <>
          <VectorArrow origin={pos} vector={[vx, vy, 0]} color="#f472b6" label="v" scale={vecScale} size={k} />
          <VectorArrow origin={pos} vector={[vx, 0, 0]} color="#a78bfa" label="vx" scale={vecScale} size={k} />
          <VectorArrow origin={pos} vector={[0, vy, 0]} color="#22d3ee" label="vy" scale={vecScale} size={k} />
        </>
      )}
    </>
  );
}

/** Recadre la camera quand on change de scenario */
function CameraRig({ view }: { view: number }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as
    | { target: THREE.Vector3; update: () => void }
    | null;

  useEffect(() => {
    const cx = view === DEFAULT_VIEW ? 0 : view * 0.45;
    const cy = view === DEFAULT_VIEW ? 0 : view * 0.25;
    if (view === DEFAULT_VIEW) camera.position.set(40, 30, 60);
    else camera.position.set(cx - view * 0.15, cy + view * 0.25, view * 1.25);
    if (controls) {
      controls.target.set(cx, cy, 0);
      controls.update();
    } else {
      camera.lookAt(cx, cy, 0);
    }
  }, [view, camera, controls]);

  return null;
}

function Scene() {
  const scenario = useActiveProjectileScenario();
  const view = scenario?.scene.viewSize ?? DEFAULT_VIEW;
  const cell = niceStep(view) / 2;
  return (
    <>
      <Grid
        args={[200, 200]}
        cellSize={cell}
        sectionSize={cell * 5}
        cellColor="#1e293b"
        sectionColor="#334155"
        infiniteGrid
        fadeDistance={view * 3.5}
      />
      <Axes view={view} />
      <Ball />
      <CameraRig view={view} />
    </>
  );
}

export function ProjectileSimulation() {
  return (
    <div className="w-full h-[420px] md:h-[520px] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas camera={{ position: [40, 30, 60], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[15, 30, 15]} intensity={1} />
        <Scene />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}
