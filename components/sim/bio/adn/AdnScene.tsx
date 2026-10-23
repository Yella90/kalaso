'use client';

import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';

export type AdnMode = 'structure' | 'replication' | 'compaction';
export type Base = 'A' | 'T' | 'G' | 'C';

export const BASE_COLOR: Record<Base, string> = { A: '#e0533d', T: '#f2b134', G: '#3a7bd5', C: '#4caf73' };
export const PAIR: Record<Base, Base> = { A: 'T', T: 'A', G: 'C', C: 'G' };

const OLD = '#60a5fa';
const NEW = '#fb923c';
const BACKBONE = '#e2e8f0';
const PHOSPHATE = '#f59e0b';

const R = 1;
const RISE = 0.42;
const TWIST = (36 * Math.PI) / 180;
/** Décalage angulaire entre les deux brins : il crée le grand et le petit sillon. */
const GROOVE = (150 * Math.PI) / 180;
const UP = new THREE.Vector3(0, 1, 0);

export interface AdnSceneProps {
  mode: AdnMode;
  sequence: Base[];
  /** Avancement de la réplication, de 0 à 1 (lu à chaque image). */
  progress: RefObject<number>;
  level: number;
  selected: number | null;
  onSelect: (i: number | null) => void;
  motion: boolean;
}

function smoothstep(a: number, b: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/** Place un cylindre entre deux points. */
function setSegment(mesh: THREE.Object3D, a: THREE.Vector3, b: THREE.Vector3) {
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  mesh.position.copy(a).addScaledVector(dir, 0.5);
  mesh.quaternion.setFromUnitVectors(UP, len > 1e-6 ? dir.normalize() : UP);
  mesh.scale.set(1, Math.max(len, 1e-4), 1);
}

/* ------------------------------------------------------------------ */
/* Structure : double hélice détaillée, paires de bases cliquables.     */
/* ------------------------------------------------------------------ */

function Structure({ sequence, selected, onSelect }: { sequence: Base[]; selected: number | null; onSelect: (i: number | null) => void }) {
  const n = sequence.length;
  const top = ((n - 1) * RISE) / 2;
  const data = useMemo(() => {
    const strands = [0, 1].map((s) =>
      sequence.map((_, i) => {
        const a = i * TWIST + s * GROOVE;
        return new THREE.Vector3(R * Math.cos(a), top - i * RISE, R * Math.sin(a));
      }),
    );
    const tubes = strands.map((pts) => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), n * 8, 0.07, 6, false));
    return { strands, tubes };
  }, [sequence, n, top]);

  return (
    <group>
      {data.tubes.map((g, s) => (
        <mesh key={s} geometry={g}>
          <meshStandardMaterial color={BACKBONE} roughness={0.5} />
        </mesh>
      ))}
      {sequence.map((b, i) => {
        const a = data.strands[0][i];
        const c = data.strands[1][i];
        const mid = a.clone().lerp(c, 0.5);
        const gapA = a.clone().lerp(c, 0.47);
        const gapC = a.clone().lerp(c, 0.53);
        const on = selected === i;
        const partner = PAIR[b];
        const bonds = b === 'A' || b === 'T' ? 2 : 3;
        const pick = (e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect(i);
        };
        return (
          <group key={i} onClick={pick}>
            <Segment from={a} to={gapA} color={BASE_COLOR[b]} radius={on ? 0.15 : 0.12} glow={on} />
            <Segment from={gapC} to={c} color={BASE_COLOR[partner]} radius={on ? 0.15 : 0.12} glow={on} />
            {/* Liaisons hydrogène : 2 pour A–T, 3 pour G–C. */}
            {Array.from({ length: bonds }, (_, k) => (
              <mesh key={k} position={[mid.x, mid.y + (k - (bonds - 1) / 2) * 0.07, mid.z]}>
                <sphereGeometry args={[0.025, 6, 6]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            ))}
            {[a, c].map((p, s) => (
              <group key={s}>
                {/* Désoxyribose (sucre) et phosphate. */}
                <mesh position={p}>
                  <dodecahedronGeometry args={[0.13, 0]} />
                  <meshStandardMaterial color="#cbd5e1" emissive={on ? '#ffffff' : '#000000'} emissiveIntensity={on ? 0.3 : 0} />
                </mesh>
                <mesh position={[p.x * 1.08, p.y + (s ? 1 : -1) * RISE * 0.5, p.z * 1.08]}>
                  <sphereGeometry args={[0.09, 10, 8]} />
                  <meshStandardMaterial color={PHOSPHATE} />
                </mesh>
              </group>
            ))}
          </group>
        );
      })}
    </group>
  );
}

function Segment({ from, to, color, radius, glow }: { from: THREE.Vector3; to: THREE.Vector3; color: string; radius: number; glow?: boolean }) {
  return (
    <mesh ref={(m) => { if (m) setSegment(m, from, to); }}>
      <cylinderGeometry args={[radius, radius, 1, 10]} />
      <meshStandardMaterial color={color} emissive={glow ? color : '#000000'} emissiveIntensity={glow ? 0.5 : 0} roughness={0.45} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Réplication : la fourche descend, chaque brin ancien reçoit un brin  */
/* nouveau. Positions recalculées à chaque image (sans re-rendu React). */
/* ------------------------------------------------------------------ */

function Replication({ sequence, progress, motion }: { sequence: Base[]; progress: RefObject<number>; motion: boolean }) {
  const n = sequence.length;
  const top = ((n - 1) * RISE) / 2;
  // Pour chaque paire i et chaque brin ancien s : sucre ancien, demi-base ancienne, sucre nouveau, demi-base nouvelle.
  const sugars = useRef<(THREE.Mesh | null)[]>([]);
  const bases = useRef<(THREE.Mesh | null)[]>([]);
  const links = useRef<(THREE.Mesh | null)[]>([]);
  const helicase = useRef<THREE.Mesh>(null);
  const polymerases = useRef<(THREE.Mesh | null)[]>([]);
  const free = useRef<THREE.Group>(null);
  const spin = useRef(0);

  const freeBases = useMemo(
    () =>
      Array.from({ length: 26 }, (_, k) => ({
        base: (['A', 'T', 'G', 'C'] as Base[])[k % 4],
        p: new THREE.Vector3(Math.sin(k * 2.1) * 4.2, Math.cos(k * 1.3) * top * 1.1, Math.sin(k * 0.7 + 1) * 2.4),
      })),
    [top],
  );

  useFrame((_, dt) => {
    if (motion) spin.current += dt;
    const f = progress.current * (n + 2);
    const pos = (i: number, s: number, isNew: boolean, u: number) => {
      const sep = 2.3 * smoothstep(0, 4, u);
      const cx = (s ? 1 : -1) * sep;
      const a = i * TWIST + s * GROOVE + (isNew ? (s ? -GROOVE : GROOVE) : 0);
      return new THREE.Vector3(cx + R * Math.cos(a), top - i * RISE, R * Math.sin(a));
    };
    for (let i = 0; i < n; i++) {
      const u = Math.max(0, f - i);
      const show = smoothstep(0.8, 2.0, u);
      for (let s = 0; s < 2; s++) {
        const old = pos(i, s, false, u);
        const neu = pos(i, s, true, u);
        // Le nucléotide nouveau arrive du milieu environnant.
        const from = neu.clone().add(new THREE.Vector3((s ? 1 : -1) * 2.5, 0.6, 1.8));
        const arrived = from.lerp(neu, show);
        const k = i * 2 + s;
        const so = sugars.current[k * 2];
        const sn = sugars.current[k * 2 + 1];
        if (so) so.position.copy(old);
        if (sn) {
          sn.position.copy(arrived);
          sn.scale.setScalar(Math.max(show, 0.001));
        }
        const bo = bases.current[k * 2];
        const bn = bases.current[k * 2 + 1];
        if (bo) setSegment(bo, old, old.clone().lerp(neu, 0.47));
        if (bn) {
          setSegment(bn, arrived.clone().lerp(old, 0.47 * show), arrived);
          bn.visible = show > 0.02;
        }
        // Liaisons du squelette avec le nucléotide précédent du même brin.
        if (i > 0) {
          const up = Math.max(0, f - (i - 1));
          const lo = links.current[k * 2];
          const ln = links.current[k * 2 + 1];
          if (lo) setSegment(lo, pos(i - 1, s, false, up), old);
          if (ln) {
            const both = Math.min(show, smoothstep(0.8, 2.0, up));
            setSegment(ln, pos(i - 1, s, true, up), neu);
            ln.visible = both > 0.98;
          }
        }
      }
    }
    const yf = top - Math.min(f, n - 0.5) * RISE;
    if (helicase.current) {
      helicase.current.position.set(0, yf, 0);
      helicase.current.rotation.z = spin.current * 3;
      helicase.current.visible = f > 0.05 && f < n + 0.5;
    }
    polymerases.current.forEach((m, s) => {
      if (!m) return;
      const i = Math.max(0, Math.min(n - 1, Math.floor(f - 1.6)));
      const p = pos(i, s, true, f - i);
      m.position.set(p.x * 0.6 + (s ? 1 : -1) * 0.6, p.y, p.z);
      m.visible = f > 1.6 && f < n + 1.5;
    });
    if (free.current && motion) {
      free.current.children.forEach((c, k) => {
        c.position.y += Math.sin(spin.current * 0.8 + k) * dt * 0.15;
        c.rotation.x += dt * 0.7;
      });
    }
  });

  return (
    <group>
      {sequence.map((b, i) =>
        [0, 1].map((s) => {
          const k = i * 2 + s;
          const oldBase = s ? PAIR[b] : b;
          const newBase = PAIR[oldBase];
          return (
            <group key={k}>
              <mesh ref={(m) => { sugars.current[k * 2] = m; }}>
                <dodecahedronGeometry args={[0.14, 0]} />
                <meshStandardMaterial color={OLD} />
              </mesh>
              <mesh ref={(m) => { sugars.current[k * 2 + 1] = m; }}>
                <dodecahedronGeometry args={[0.14, 0]} />
                <meshStandardMaterial color={NEW} />
              </mesh>
              <mesh ref={(m) => { bases.current[k * 2] = m; }}>
                <cylinderGeometry args={[0.12, 0.12, 1, 10]} />
                <meshStandardMaterial color={BASE_COLOR[oldBase]} />
              </mesh>
              <mesh ref={(m) => { bases.current[k * 2 + 1] = m; }}>
                <cylinderGeometry args={[0.12, 0.12, 1, 10]} />
                <meshStandardMaterial color={BASE_COLOR[newBase]} />
              </mesh>
              {i > 0 && (
                <>
                  <mesh ref={(m) => { links.current[k * 2] = m; }}>
                    <cylinderGeometry args={[0.06, 0.06, 1, 6]} />
                    <meshStandardMaterial color={OLD} />
                  </mesh>
                  <mesh ref={(m) => { links.current[k * 2 + 1] = m; }}>
                    <cylinderGeometry args={[0.06, 0.06, 1, 6]} />
                    <meshStandardMaterial color={NEW} />
                  </mesh>
                </>
              )}
            </group>
          );
        }),
      )}
      <mesh ref={helicase} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.16, 10, 6]} />
        <meshStandardMaterial color="#facc15" emissive="#a16207" emissiveIntensity={0.3} flatShading />
      </mesh>
      {[0, 1].map((s) => (
        <mesh key={s} ref={(m) => { polymerases.current[s] = m; }}>
          <icosahedronGeometry args={[0.45, 1]} />
          <meshStandardMaterial color="#34d399" transparent opacity={0.75} flatShading />
        </mesh>
      ))}
      <group ref={free}>
        {freeBases.map((fb, k) => (
          <mesh key={k} position={fb.p}>
            <capsuleGeometry args={[0.07, 0.3, 4, 8]} />
            <meshStandardMaterial color={BASE_COLOR[fb.base]} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Compaction : de la double hélice au chromosome.                     */
/* ------------------------------------------------------------------ */

function coil(path: THREE.Curve<THREE.Vector3>, radius: number, turns: number, samples: number) {
  const pts: THREE.Vector3[] = [];
  const frames = path.computeFrenetFrames(samples, false);
  for (let k = 0; k <= samples; k++) {
    const t = k / samples;
    const p = path.getPointAt(t);
    const a = t * turns * Math.PI * 2;
    pts.push(p.clone().addScaledVector(frames.normals[k], Math.cos(a) * radius).addScaledVector(frames.binormals[k], Math.sin(a) * radius));
  }
  return new THREE.CatmullRomCurve3(pts);
}

function Nucleosomes() {
  const { tube, cores } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const cores: THREE.Vector3[] = [];
    const count = 5;
    for (let c = 0; c < count; c++) {
      const cx = (c - (count - 1) / 2) * 2.3;
      const cy = c % 2 ? 0.35 : -0.35;
      cores.push(new THREE.Vector3(cx, cy, 0));
      // 1,7 tour d’ADN autour de chaque octamère d’histones.
      for (let k = 0; k <= 40; k++) {
        const a = (k / 40) * 1.7 * Math.PI * 2 - Math.PI / 2;
        pts.push(new THREE.Vector3(cx + Math.cos(a) * 0.72, cy + Math.sin(a) * 0.72, (k / 40 - 0.5) * 0.55));
      }
    }
    return { tube: new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 600, 0.09, 6, false), cores };
  }, []);
  return (
    <group>
      <mesh geometry={tube}>
        <meshStandardMaterial color={OLD} />
      </mesh>
      {cores.map((c, k) => (
        <mesh key={k} position={c} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.55, 20]} />
          <meshStandardMaterial color="#f3c86a" />
        </mesh>
      ))}
    </group>
  );
}

function Fibre() {
  const items = useMemo(
    () =>
      Array.from({ length: 30 }, (_, k) => {
        const a = (k / 6) * Math.PI * 2;
        return { p: new THREE.Vector3(Math.cos(a) * 1.25, (k - 15) * 0.2, Math.sin(a) * 1.25), a };
      }),
    [],
  );
  const link = useMemo(() => new THREE.TubeGeometry(new THREE.CatmullRomCurve3(items.map((i) => i.p)), 300, 0.05, 5, false), [items]);
  return (
    <group>
      <mesh geometry={link}>
        <meshStandardMaterial color={OLD} />
      </mesh>
      {items.map((it, k) => (
        <mesh key={k} position={it.p} rotation={[0, -it.a, Math.PI / 2]}>
          <cylinderGeometry args={[0.42, 0.42, 0.3, 16]} />
          <meshStandardMaterial color="#f3c86a" />
        </mesh>
      ))}
    </group>
  );
}

function Chromosome() {
  const geometries = useMemo(() => {
    const arm = (side: number) =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(side * 1.7, 3.1, 0),
        new THREE.Vector3(side * 0.95, 1.7, 0),
        new THREE.Vector3(side * 0.42, 0.4, 0),
        new THREE.Vector3(side * 1.0, -1.4, 0),
        new THREE.Vector3(side * 1.9, -3.4, 0),
      ]);
    return [-1, 1].map((side) => new THREE.TubeGeometry(coil(arm(side), 0.42, 46, 900), 1800, 0.13, 6, false));
  }, []);
  return (
    <group>
      {geometries.map((g, k) => (
        <mesh key={k} geometry={g}>
          <meshStandardMaterial color={k ? '#818cf8' : OLD} roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 0.4, 0]} scale={[1.1, 0.45, 0.6]}>
        <sphereGeometry args={[0.6, 20, 14]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

function Compaction({ level, sequence }: { level: number; sequence: Base[] }) {
  return (
    <group>
      {level === 0 && <Structure sequence={sequence} selected={null} onSelect={() => {}} />}
      {level === 1 && (
        <group scale={0.8}>
          <Nucleosomes />
        </group>
      )}
      {level === 2 && <Fibre />}
      {level === 3 && <Chromosome />}
    </group>
  );
}

/** Tourne lentement l’objet ; « swing » le balance seulement, pour garder sa face visible. */
function Spinner({ motion, swing, children }: { motion: boolean; swing?: boolean; children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (!motion || !g.current) return;
    t.current += dt;
    if (swing) g.current.rotation.y = Math.sin(t.current * 0.5) * 0.7;
    else g.current.rotation.y += dt * 0.25;
  });
  return <group ref={g}>{children}</group>;
}

export default function AdnScene({ mode, sequence, progress, level, selected, onSelect, motion }: AdnSceneProps) {
  return (
    <Canvas camera={{ position: [0, 0, 8.2], fov: 45 }} dpr={[1, 1.75]} onPointerMissed={() => onSelect(null)}>
      <color attach="background" args={['#0b1020']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 6]} intensity={1.3} />
      <directionalLight position={[-6, -4, -4]} intensity={0.4} color="#9fb6ff" />
      {mode === 'structure' && (
        <Spinner motion={motion && selected === null}>
          <Structure sequence={sequence} selected={selected} onSelect={onSelect} />
        </Spinner>
      )}
      {mode === 'replication' && <Replication sequence={sequence} progress={progress} motion={motion} />}
      {mode === 'compaction' && (
        <Spinner motion={motion} swing={level === 3}>
          <Compaction level={level} sequence={sequence} />
        </Spinner>
      )}
      <OrbitControls enablePan={false} minDistance={4} maxDistance={20} makeDefault />
    </Canvas>
  );
}
