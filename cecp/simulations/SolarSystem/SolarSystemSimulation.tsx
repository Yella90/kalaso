'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Stars, Text, Billboard } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { create } from 'zustand';
import {
  BODIES, PLANETS, UA, DAY, body, satellitesOf, type Body,
} from '../../lib/physics/gravitation';

// ============================================================
//  Etat partage (scene 3D + panneaux)
// ============================================================
export type SolarMode = 'solaire' | 'satellites';

/** Vitesses de defilement du temps : secondes physiques par seconde a l'ecran */
export const SOLAR_SPEEDS = [
  { value: 2 * DAY, label: '2 j/s' },
  { value: 15 * DAY, label: '15 j/s' },
  { value: 60 * DAY, label: '2 mois/s' },
  { value: 365.25 * DAY, label: '1 an/s' },
];
export const MOON_SPEEDS = [
  { value: 60, label: '1 min/s' },
  { value: 600, label: '10 min/s' },
  { value: 3600, label: '1 h/s' },
  { value: 6 * 3600, label: '6 h/s' },
  { value: DAY, label: '1 j/s' },
];

interface SolarState {
  mode: SolarMode;
  /** Planete centrale en mode "satellites" */
  center: string;
  selected: string | null;
  running: boolean;
  timeScale: number;
  /** Temps physique ecoule (s), mis a jour ~5 fois/s pour l'affichage */
  elapsed: number;
  resetKey: number;
  setMode: (m: SolarMode) => void;
  showSatellitesOf: (planetId: string) => void;
  select: (id: string | null) => void;
  toggleRun: () => void;
  setTimeScale: (s: number) => void;
  setElapsed: (t: number) => void;
  reset: () => void;
}

export const useSolarStore = create<SolarState>((set) => ({
  mode: 'solaire',
  center: 'terre',
  selected: 'terre',
  running: true,
  timeScale: 15 * DAY,
  elapsed: 0,
  resetKey: 0,
  setMode: (mode) =>
    set((s) => ({
      mode,
      selected: mode === 'solaire' ? s.center : satellitesOf(s.center)[0]?.id ?? null,
      timeScale: mode === 'solaire' ? 15 * DAY : 600,
      elapsed: 0,
      resetKey: s.resetKey + 1,
    })),
  showSatellitesOf: (planetId) =>
    set((s) => ({
      mode: 'satellites',
      center: planetId,
      selected: satellitesOf(planetId)[0]?.id ?? null,
      timeScale: 600,
      elapsed: 0,
      resetKey: s.resetKey + 1,
    })),
  select: (selected) => set({ selected }),
  toggleRun: () => set((s) => ({ running: !s.running })),
  setTimeScale: (timeScale) => set({ timeScale }),
  setElapsed: (elapsed) => set({ elapsed }),
  reset: () => set((s) => ({ elapsed: 0, resetKey: s.resetKey + 1 })),
}));

// ============================================================
//  Echelles d'affichage (les vraies distances sont trop grandes
//  pour tenir a l'ecran : on compresse, mais les PERIODES sont
//  exactes, donc les vitesses relatives sont respectees).
// ============================================================
const SUN_RADIUS = 2.6;

function planetDisplayRadius(b: Body): number {
  return 0.25 + 0.45 * Math.log10(b.radius / 1e6 + 1);
}

function solarDistance(b: Body): number {
  return 5 + 7 * Math.sqrt((b.orbitRadius as number) / UA);
}

const CENTER_RADIUS = 2;

function moonDistance(b: Body, parent: Body): number {
  const ratio = (b.orbitRadius as number) / parent.radius;
  return CENTER_RADIUS + 0.35 + (Math.sqrt(ratio) - 1) * CENTER_RADIUS * 1.1;
}

function moonDisplayRadius(b: Body): number {
  if (b.kind === 'artificiel') return 0.12;
  return Math.max(0.12, 0.2 + 0.3 * Math.log10(b.radius / 1e6 + 1));
}

/** Inclinaison de l'orbite (degres) : valeurs reelles pour les satellites artificiels */
const INCLINATION: Record<string, number> = {
  iss: 51.6, hubble: 28.5, gps: 55, geo: 0, lune: 5.1, phobos: 1.1, deimos: 1.8,
  io: 0.05, europe: 0.47, ganymede: 0.2, callisto: 0.3, titan: 0.35,
};

/** Phase initiale (pour ne pas aligner toutes les planetes au depart) */
function phase(id: string): number {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 360;
  return (h * Math.PI) / 180;
}

// ============================================================
//  Horloge partagee par les corps de la scene
// ============================================================
type Clock = { t: number };

function ClockDriver({ clock }: { clock: Clock }) {
  const lastPush = useRef(0);
  const resetKey = useSolarStore((s) => s.resetKey);
  useEffect(() => {
    clock.t = 0;
  }, [resetKey, clock]);

  useFrame((_, dt) => {
    const { running, timeScale, setElapsed } = useSolarStore.getState();
    if (!running) return;
    clock.t += Math.min(dt, 0.05) * timeScale;
    lastPush.current += dt;
    if (lastPush.current > 0.2) {
      lastPush.current = 0;
      setElapsed(clock.t);
    }
  });
  return null;
}

// ============================================================
//  Corps en orbite (planete ou satellite)
// ============================================================
function OrbitingBody({
  b, distance, radius, clock, inclination = 0, labelSize,
}: {
  b: Body;
  distance: number;
  radius: number;
  clock: Clock;
  inclination?: number;
  labelSize: number;
}) {
  const group = useRef<THREE.Group>(null!);
  const spin = useRef<THREE.Mesh>(null!);
  const selected = useSolarStore((s) => s.selected === b.id);
  const select = useSolarStore((s) => s.select);
  const T = b.realPeriod as number;
  const phi0 = phase(b.id);

  useFrame(() => {
    const th = phi0 + (2 * Math.PI * clock.t) / T;
    group.current.position.set(distance * Math.cos(th), 0, -distance * Math.sin(th));
    if (spin.current) spin.current.rotation.y += 0.01;
  });

  const orbit = useMemo(
    () => Array.from({ length: 129 }, (_, i) => {
      const a = (2 * Math.PI * i) / 128;
      return [distance * Math.cos(a), 0, distance * Math.sin(a)] as [number, number, number];
    }),
    [distance],
  );

  return (
    <group rotation={[(inclination * Math.PI) / 180, 0, 0]}>
      <Line
        points={orbit}
        color={selected ? b.color : '#334155'}
        lineWidth={selected ? 1.8 : 1}
        transparent
        opacity={selected ? 0.9 : 0.6}
      />
      <group ref={group}>
        <mesh
          ref={spin}
          onClick={(e) => { e.stopPropagation(); select(b.id); }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = ''; }}
        >
          {b.kind === 'artificiel'
            ? <boxGeometry args={[radius * 1.6, radius * 1.6, radius * 1.6]} />
            : <sphereGeometry args={[radius, 32, 32]} />}
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={b.kind === 'artificiel' ? 0.8 : 0.15}
            roughness={0.85}
          />
        </mesh>
        {/* Zone de clic elargie pour les petits corps */}
        <mesh onClick={(e) => { e.stopPropagation(); select(b.id); }} visible={false}>
          <sphereGeometry args={[Math.max(radius * 2, 0.6), 8, 8]} />
          <meshBasicMaterial />
        </mesh>
        {b.id === 'saturne' && (
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <ringGeometry args={[radius * 1.3, radius * 2.2, 64]} />
            <meshBasicMaterial color="#d6c79a" side={THREE.DoubleSide} transparent opacity={0.6} />
          </mesh>
        )}
        {selected && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius * 1.6 + 0.15, radius * 1.6 + 0.3, 48]} />
            <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} />
          </mesh>
        )}
        <Billboard position={[0, radius + labelSize * 1.1, 0]}>
          <Text fontSize={labelSize} color={selected ? '#fbbf24' : '#cbd5e1'} anchorX="center" anchorY="middle">
            {b.name}
          </Text>
        </Billboard>
      </group>
    </group>
  );
}

// ============================================================
//  Scene "systeme solaire"
// ============================================================
function SolarScene({ clock }: { clock: Clock }) {
  const select = useSolarStore((s) => s.select);
  const sun = body('soleil');
  return (
    <>
      <pointLight position={[0, 0, 0]} intensity={2.2} decay={0} color="#fff7ed" />
      <ambientLight intensity={0.25} />
      <mesh onClick={(e) => { e.stopPropagation(); select('soleil'); }}>
        <sphereGeometry args={[SUN_RADIUS, 48, 48]} />
        <meshBasicMaterial color={sun.color} />
      </mesh>
      <mesh scale={1.25}>
        <sphereGeometry args={[SUN_RADIUS, 32, 32]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <Billboard position={[0, SUN_RADIUS + 1, 0]}>
        <Text fontSize={0.9} color="#fde68a" anchorX="center">Soleil</Text>
      </Billboard>
      {PLANETS.map((p) => (
        <OrbitingBody
          key={p.id}
          b={p}
          distance={solarDistance(p)}
          radius={planetDisplayRadius(p)}
          clock={clock}
          labelSize={0.7}
        />
      ))}
    </>
  );
}

// ============================================================
//  Scene "planete et ses satellites"
// ============================================================
function MoonScene({ clock, centerId }: { clock: Clock; centerId: string }) {
  const center = body(centerId);
  const select = useSolarStore((s) => s.select);
  const sats = satellitesOf(centerId);
  const spin = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    if (spin.current && useSolarStore.getState().running) spin.current.rotation.y += 0.004;
  });

  return (
    <>
      <directionalLight position={[30, 10, 20]} intensity={2} />
      <ambientLight intensity={0.35} />
      <mesh ref={spin} onClick={(e) => { e.stopPropagation(); select(centerId); }}>
        <sphereGeometry args={[CENTER_RADIUS, 64, 64]} />
        <meshStandardMaterial color={center.color} emissive={center.color} emissiveIntensity={0.12} roughness={0.8} />
      </mesh>
      {centerId === 'terre' && (
        <mesh scale={1.04}>
          <sphereGeometry args={[CENTER_RADIUS, 32, 32]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.12} side={THREE.BackSide} />
        </mesh>
      )}
      {centerId === 'saturne' && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[CENTER_RADIUS * 1.3, CENTER_RADIUS * 2.2, 96]} />
          <meshBasicMaterial color="#d6c79a" side={THREE.DoubleSide} transparent opacity={0.55} />
        </mesh>
      )}
      <Billboard position={[0, CENTER_RADIUS + 0.7, 0]}>
        <Text fontSize={0.55} color="#e2e8f0" anchorX="center">{center.name}</Text>
      </Billboard>
      {sats.map((s) => (
        <OrbitingBody
          key={s.id}
          b={s}
          distance={moonDistance(s, center)}
          radius={moonDisplayRadius(s)}
          clock={clock}
          inclination={INCLINATION[s.id] ?? 0}
          labelSize={0.38}
        />
      ))}
    </>
  );
}

/** Recadrage de la camera selon la scene */
function CameraRig() {
  const mode = useSolarStore((s) => s.mode);
  const center = useSolarStore((s) => s.center);
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as
    | { target: THREE.Vector3; update: () => void }
    | null;

  useEffect(() => {
    let dist: number;
    if (mode === 'solaire') {
      dist = solarDistance(body('neptune')) * 1.35;
      camera.position.set(0, dist * 0.55, dist * 0.85);
    } else {
      const parent = body(center);
      const far = Math.max(...satellitesOf(center).map((s) => moonDistance(s, parent)));
      dist = far * 1.6 + 4;
      camera.position.set(0, dist * 0.45, dist * 0.9);
    }
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
    } else {
      camera.lookAt(0, 0, 0);
    }
  }, [mode, center, camera, controls]);
  return null;
}

export function SolarSystemSimulation() {
  const mode = useSolarStore((s) => s.mode);
  const center = useSolarStore((s) => s.center);
  const clock = useMemo<Clock>(() => ({ t: 0 }), []);

  return (
    <div className="w-full h-[460px] md:h-[600px] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
      <Canvas camera={{ position: [0, 35, 55], fov: 45, far: 3000 }}>
        <color attach="background" args={['#01030c']} />
        <Stars radius={400} depth={80} count={3000} factor={4} fade />
        <ClockDriver clock={clock} />
        {mode === 'solaire' ? <SolarScene clock={clock} /> : <MoonScene clock={clock} centerId={center} />}
        <CameraRig />
        <OrbitControls makeDefault enablePan={false} maxDistance={400} minDistance={3} />
      </Canvas>
    </div>
  );
}

export { BODIES };
