'use client';

import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, RoundedBox } from '@react-three/drei';
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from 'react';
import * as THREE from 'three';

export type OrganelleId =
  | 'membrane'
  | 'noyau'
  | 'nucleole'
  | 'reticulum'
  | 'golgi'
  | 'vesicule'
  | 'mitochondrie'
  | 'lysosome'
  | 'centrioles'
  | 'chloroplaste'
  | 'vacuole'
  | 'paroi';

export type CellKind = 'animale' | 'vegetale';

export interface CelluleSceneProps {
  kind: CellKind;
  selected: OrganelleId | null;
  onSelect: (id: OrganelleId | null) => void;
  labels: boolean;
  cut: boolean;
  motion: boolean;
  names: Record<OrganelleId, string>;
}

type Vec = [number, number, number];

const COLORS: Record<OrganelleId, string> = {
  membrane: '#f3b98f',
  noyau: '#9a7bd1',
  nucleole: '#4b2a86',
  reticulum: '#4a8fd6',
  golgi: '#e3a33a',
  vesicule: '#f6cf6a',
  mitochondrie: '#f0804a',
  lysosome: '#c65a9e',
  centrioles: '#4caf73',
  chloroplaste: '#3f9b3a',
  vacuole: '#8fd0f0',
  paroi: '#7cbf4f',
};

/** Disposition des organites : proportions simplifiées pour qu’on voie tout. */
interface Layout {
  noyau: { at: Vec; r: number };
  nucleole: Vec;
  reticulum: { r: number; rot: Vec }[];
  golgi: { at: Vec; rot: Vec };
  exit: Vec;
  mitochondries: { at: Vec; rot: Vec }[];
  lysosomes: Vec[];
  centrioles?: Vec;
  labels: Partial<Record<OrganelleId, Vec>>;
}

const ANIMALE: Layout = {
  noyau: { at: [-0.6, 0.2, -0.3], r: 1.45 },
  nucleole: [-0.35, 0.4, 0.15],
  reticulum: [
    { r: 1.95, rot: [0.3, 0.2, 2.2] },
    { r: 2.3, rot: [-0.25, 0.5, 2.6] },
    { r: 2.65, rot: [0.1, -0.3, 2.9] },
  ],
  golgi: { at: [2.2, -0.5, 0.7], rot: [0.4, 0.6, -0.4] },
  exit: [4.3, -1.0, 1.4],
  mitochondries: [
    { at: [2.6, 1.6, -0.8], rot: [0.4, 0.2, 1.1] },
    { at: [-3.0, -1.2, 1.0], rot: [1.2, 0.4, 0.3] },
    { at: [1.0, -2.2, -1.6], rot: [0.2, 1.0, 1.4] },
    { at: [-2.4, 1.7, 1.3], rot: [0.9, 0.1, 0.6] },
    { at: [0.7, 2.1, 1.9], rot: [1.4, 0.5, 0.2] },
    { at: [-1.3, -1.9, -2.5], rot: [0.3, 1.3, 0.8] },
  ],
  lysosomes: [
    [3.0, 0.5, -2.0],
    [-3.3, 0.4, -1.5],
    [1.7, -1.5, 2.6],
    [-0.4, -2.6, 1.8],
  ],
  centrioles: [1.3, 1.3, -0.8],
  labels: {
    membrane: [0, 4.3, 0],
    noyau: [-0.6, 1.9, -0.3],
    nucleole: [-0.35, 0.4, 0.15],
    reticulum: [-2.7, -0.9, -0.6],
    golgi: [2.3, 0.2, 0.9],
    vesicule: [3.6, -0.8, 1.2],
    mitochondrie: [2.6, 2.2, -0.8],
    lysosome: [3.0, 1.0, -2.0],
    centrioles: [1.3, 1.8, -0.8],
  },
};

const VEGETALE: Layout = {
  noyau: { at: [3.0, 1.4, 1.2], r: 1.05 },
  nucleole: [3.1, 1.5, 1.5],
  reticulum: [
    { r: 1.4, rot: [0.4, 0.2, 3.6] },
    { r: 1.7, rot: [-0.3, 0.4, 3.9] },
  ],
  golgi: { at: [3.3, -1.7, -1.0], rot: [0.3, 1.2, 0.2] },
  exit: [4.6, -2.6, -1.6],
  mitochondries: [
    { at: [3.8, -0.4, 2.3], rot: [0.4, 0.2, 1.1] },
    { at: [-3.0, 2.45, -2.0], rot: [1.2, 0.4, 1.6] },
    { at: [-2.0, -2.45, 2.2], rot: [0.2, 1.0, 1.5] },
    { at: [1.6, 2.45, -2.4], rot: [0.9, 0.1, 1.5] },
  ],
  lysosomes: [],
  labels: {
    paroi: [-4.4, 3.9, 0],
    membrane: [4.2, -3.5, 1.5],
    noyau: [3.0, 2.6, 1.2],
    nucleole: [3.1, 1.5, 1.5],
    reticulum: [1.5, 0.9, 2.2],
    golgi: [3.3, -1.1, -1.0],
    vesicule: [3.9, -3.0, -1.8],
    mitochondrie: [4.0, -1.0, 2.4],
    chloroplaste: [-4.1, 0.2, 0.6],
    vacuole: [-0.6, 0.4, 0],
  },
};

/** Matériau qui s’allume quand l’organite est choisi et pâlit quand un autre l’est. */
function Mat({
  id,
  selected,
  opacity = 1,
  color,
  side,
  clip,
}: {
  id: OrganelleId;
  selected: OrganelleId | null;
  opacity?: number;
  color?: string;
  side?: THREE.Side;
  clip?: THREE.Plane[];
}) {
  const on = selected === id;
  const dim = selected !== null && !on && id !== 'membrane' && id !== 'paroi';
  const alpha = dim ? Math.min(opacity, 0.28) : opacity;
  const c = color ?? COLORS[id];
  return (
    <meshStandardMaterial
      color={c}
      emissive={on ? c : '#000000'}
      emissiveIntensity={on ? 0.55 : 0}
      roughness={0.55}
      metalness={0.05}
      transparent={alpha < 1}
      opacity={alpha}
      depthWrite={alpha >= 0.6}
      side={side ?? THREE.FrontSide}
      clippingPlanes={clip}
    />
  );
}

function pickHandlers(id: OrganelleId, onSelect: (id: OrganelleId) => void, setHover: (id: OrganelleId | null) => void) {
  return {
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onSelect(id);
    },
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHover(id);
      document.body.style.cursor = 'pointer';
    },
    onPointerOut: () => {
      setHover(null);
      document.body.style.cursor = '';
    },
  };
}

/** Le plan de coupe suit la caméra : on voit toujours l’intérieur de la cellule. */
function useCutPlane(cut: boolean) {
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, -1), 0.4), []);
  const { camera } = useThree();
  useFrame(() => {
    plane.normal.copy(camera.position).normalize().negate();
    plane.constant = 0.4;
  });
  return cut ? [plane] : undefined;
}

function fibonacciSphere(n: number, r: number): Vec[] {
  const pts: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    pts.push([Math.cos(th) * rad * r, y * r, Math.sin(th) * rad * r]);
  }
  return pts;
}

function Noyau({ layout, selected, pick }: { layout: Layout; selected: OrganelleId | null; pick: (id: OrganelleId) => object }) {
  const { at, r } = layout.noyau;
  const pores = useMemo(() => fibonacciSphere(26, r), [r]);
  return (
    <group>
      <group position={at} {...pick('noyau')}>
        <mesh>
          <sphereGeometry args={[r, 40, 28]} />
          <Mat id="noyau" selected={selected} opacity={0.62} />
        </mesh>
        {pores.map((p, i) => (
          <mesh key={i} position={p} onUpdate={(m) => m.lookAt(at[0] + p[0] * 2, at[1] + p[1] * 2, at[2] + p[2] * 2)}>
            <torusGeometry args={[0.075, 0.028, 6, 14]} />
            <Mat id="noyau" selected={selected} color="#5b3d99" />
          </mesh>
        ))}
        {/* Chromatine : filaments diffus dans le noyau. */}
        <Chromatine r={r * 0.82} selected={selected} />
      </group>
      <mesh position={layout.nucleole} {...pick('nucleole')}>
        <sphereGeometry args={[r * 0.33, 24, 18]} />
        <Mat id="nucleole" selected={selected} />
      </mesh>
    </group>
  );
}

function Chromatine({ r, selected }: { r: number; selected: OrganelleId | null }) {
  const geometry = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 90; i++) {
      const t = i / 89;
      pts.push(
        new THREE.Vector3(
          Math.sin(t * 23.1) * Math.cos(t * 7.3) * r,
          Math.sin(t * 17.7 + 1) * 0.8 * r,
          Math.cos(t * 19.3) * Math.sin(t * 5.1 + 0.5) * r,
        ),
      );
    }
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 260, 0.035, 5, false);
  }, [r]);
  return (
    <mesh geometry={geometry}>
      <Mat id="noyau" selected={selected} color="#3d2470" opacity={0.85} />
    </mesh>
  );
}

function Reticulum({ layout, selected, pick }: { layout: Layout; selected: OrganelleId | null; pick: (id: OrganelleId) => object }) {
  const ribosomes = useRef<THREE.InstancedMesh>(null);
  const arc = 2.3;
  const sheets = layout.reticulum;
  const count = sheets.length * 30;
  useLayoutEffect(() => {
    const mesh = ribosomes.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    let k = 0;
    for (const sheet of sheets) {
      q.setFromEuler(new THREE.Euler(...sheet.rot));
      for (let i = 0; i < 30; i++) {
        const phi = (i / 29) * arc;
        const side = i % 2 ? 1 : -1;
        const rr = sheet.r + side * 0.14;
        const zz = ((i * 7) % 5) * 0.03 - 0.06;
        const v = new THREE.Vector3(Math.cos(phi) * rr, Math.sin(phi) * rr, zz).applyQuaternion(q).add(new THREE.Vector3(...layout.noyau.at));
        m.makeTranslation(v.x, v.y, v.z);
        mesh.setMatrixAt(k++, m);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [layout, sheets]);
  return (
    <group {...pick('reticulum')}>
      {sheets.map((sheet, i) => (
        <mesh key={i} position={layout.noyau.at} rotation={sheet.rot}>
          <torusGeometry args={[sheet.r, 0.085, 10, 60, arc]} />
          <Mat id="reticulum" selected={selected} />
        </mesh>
      ))}
      <instancedMesh ref={ribosomes} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <Mat id="reticulum" selected={selected} color="#1f3f73" />
      </instancedMesh>
    </group>
  );
}

function Golgi({ layout, selected, pick }: { layout: Layout; selected: OrganelleId | null; pick: (id: OrganelleId) => object }) {
  return (
    <group position={layout.golgi.at} rotation={layout.golgi.rot} {...pick('golgi')}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[0, 0, (i - 2) * 0.24]} rotation={[0, 0, 0.75]}>
          <torusGeometry args={[0.95 - Math.abs(i - 2) * 0.08, 0.1, 10, 40, 1.7]} />
          <Mat id="golgi" selected={selected} />
        </mesh>
      ))}
    </group>
  );
}

/** Vésicules qui quittent le Golgi et libèrent leur contenu à la membrane (exocytose). */
function Vesicules({
  layout,
  selected,
  pick,
  motion,
}: {
  layout: Layout;
  selected: OrganelleId | null;
  pick: (id: OrganelleId) => object;
  motion: boolean;
}) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const t = useRef(0);
  const from = useMemo(() => new THREE.Vector3(...layout.golgi.at), [layout]);
  const to = useMemo(() => new THREE.Vector3(...layout.exit), [layout]);
  useFrame((_, dt) => {
    if (motion) t.current += dt;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const u = (t.current * 0.22 + i / 4) % 1;
      mesh.position.lerpVectors(from, to, u);
      mesh.position.y += Math.sin(u * Math.PI) * 0.35;
      const s = u > 0.88 ? Math.max(0.05, (1 - u) / 0.12) : Math.min(1, u / 0.1 + 0.2);
      mesh.scale.setScalar(s);
    });
  });
  return (
    <group {...pick('vesicule')}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }}>
          <sphereGeometry args={[0.17, 14, 10]} />
          <Mat id="vesicule" selected={selected} />
        </mesh>
      ))}
    </group>
  );
}

function Mitochondries({
  layout,
  selected,
  pick,
  motion,
}: {
  layout: Layout;
  selected: OrganelleId | null;
  pick: (id: OrganelleId) => object;
  motion: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (!motion || !group.current) return;
    t.current += dt;
    group.current.children.forEach((child, i) => {
      child.rotation.y = layout.mitochondries[i].rot[1] + Math.sin(t.current * 0.6 + i) * 0.25;
      child.position.y = layout.mitochondries[i].at[1] + Math.sin(t.current * 0.8 + i * 1.7) * 0.08;
    });
  });
  return (
    <group ref={group} {...pick('mitochondrie')}>
      {layout.mitochondries.map((m, i) => (
        <group key={i} position={m.at} rotation={m.rot}>
          <mesh>
            <capsuleGeometry args={[0.3, 0.95, 8, 16]} />
            <Mat id="mitochondrie" selected={selected} opacity={0.92} />
          </mesh>
          {/* Crêtes : replis de la membrane interne. */}
          {[-0.36, -0.12, 0.12, 0.36].map((y) => (
            <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <boxGeometry args={[0.035, 0.42, 0.5]} />
              <Mat id="mitochondrie" selected={selected} color="#a8461c" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** Chloroplastes qui tournent lentement autour de la vacuole : la cyclose. */
function Chloroplastes({
  selected,
  pick,
  motion,
}: {
  selected: OrganelleId | null;
  pick: (id: OrganelleId) => object;
  motion: boolean;
}) {
  const refs = useRef<(THREE.Group | null)[]>([]);
  const t = useRef(0);
  const items = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ base: (i / 12) * Math.PI * 2, z: [-2.5, 0.2, 2.5][i % 3], tilt: (i % 4) * 0.4 })),
    [],
  );
  useFrame((_, dt) => {
    if (motion) t.current += dt;
    refs.current.forEach((g, i) => {
      if (!g) return;
      const a = items[i].base + t.current * 0.12;
      g.position.set(Math.cos(a) * 4.15, Math.sin(a) * 2.95, items[i].z);
      g.rotation.set(items[i].tilt, 0, a + Math.PI / 2);
    });
  });
  return (
    <group {...pick('chloroplaste')}>
      {items.map((it, i) => (
        <group key={i} ref={(g) => { refs.current[i] = g; }}>
          <mesh scale={[0.62, 0.3, 0.38]}>
            <sphereGeometry args={[1, 24, 16]} />
            <Mat id="chloroplaste" selected={selected} opacity={0.88} />
          </mesh>
          {/* Grana : piles de thylakoïdes. */}
          {[-0.3, 0, 0.3].map((x) => (
            <mesh key={x} position={[x, 0, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 0.22, 10]} />
              <Mat id="chloroplaste" selected={selected} color="#1d5a1b" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Cytoplasme({ kind, motion }: { kind: CellKind; motion: boolean }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const n = 420;
    const arr = new Float32Array(n * 3);
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * 2 - 1;
    for (let i = 0; i < n; i++) {
      let x = 0;
      let y = 0;
      let z = 0;
      do {
        x = rand();
        y = rand();
        z = rand();
      } while (kind === 'animale' && x * x + y * y + z * z > 0.85);
      arr.set(kind === 'animale' ? [x * 4.6, y * 3.6, z * 4.6] : [x * 4.5, y * 3.2, z * 3.0], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, [kind]);
  useFrame((_, dt) => {
    if (motion && points.current) points.current.rotation.y += dt * 0.03;
  });
  return (
    <points ref={points} geometry={geometry} raycast={() => null}>
      <pointsMaterial size={0.045} color="#c9b48f" transparent opacity={0.55} depthWrite={false} />
    </points>
  );
}

type Anchors = RefObject<Partial<Record<OrganelleId, HTMLButtonElement | null>>>;

/** Place les étiquettes HTML sur les organites à chaque image (sans re-rendu React). */
function Projector({ layout, anchors }: { layout: Layout; anchors: Anchors }) {
  const { camera, size } = useThree();
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    for (const [id, at] of Object.entries(layout.labels) as [OrganelleId, Vec][]) {
      const el = anchors.current[id];
      if (!el) continue;
      v.set(...at).project(camera);
      const hidden = v.z > 1;
      el.style.transform = `translate(-50%, -50%) translate(${((v.x + 1) / 2) * size.width}px, ${((1 - v.y) / 2) * size.height}px)`;
      el.style.visibility = hidden ? 'hidden' : '';
    }
  });
  return null;
}

function CellContent({
  kind,
  selected,
  onSelect,
  cut,
  motion,
  setHover,
  anchors,
}: CelluleSceneProps & { setHover: (id: OrganelleId | null) => void; anchors: Anchors }) {
  const clip = useCutPlane(cut);
  const { camera } = useThree();
  useEffect(() => {
    // La cellule végétale est plus grande : on recule la caméra.
    camera.position.setLength(kind === 'animale' ? 12 : 15);
  }, [kind, camera]);
  const layout = kind === 'animale' ? ANIMALE : VEGETALE;
  const pick = (id: OrganelleId) => pickHandlers(id, onSelect, setHover);

  return (
    <group>
      {kind === 'animale' ? (
        <group scale={[1, 0.8, 1]}>
          <mesh raycast={() => null}>
            <sphereGeometry args={[5, 64, 48]} />
            <Mat id="membrane" selected={selected} opacity={cut ? 0.5 : 0.16} clip={clip} />
          </mesh>
          <mesh raycast={() => null}>
            <sphereGeometry args={[4.93, 64, 48]} />
            <Mat id="membrane" selected={selected} color="#fbe4cf" opacity={cut ? 0.35 : 0.08} side={THREE.BackSide} clip={clip} />
          </mesh>
        </group>
      ) : (
        <group>
          <RoundedBox args={[10.2, 7.6, 7.2]} radius={0.7} smoothness={4} raycast={() => null}>
            <Mat id="paroi" selected={selected} opacity={cut ? 0.7 : 0.2} side={THREE.DoubleSide} clip={clip} />
          </RoundedBox>
          <RoundedBox args={[9.5, 6.95, 6.55]} radius={0.55} smoothness={4} raycast={() => null}>
            <Mat id="membrane" selected={selected} color="#e4f3d2" opacity={cut ? 0.3 : 0.1} side={THREE.DoubleSide} clip={clip} />
          </RoundedBox>
          <mesh position={[-0.6, 0, 0]} scale={[3.3, 2.4, 2.3]} {...pick('vacuole')}>
            <sphereGeometry args={[1, 40, 28]} />
            <Mat id="vacuole" selected={selected} opacity={0.32} />
          </mesh>
          <Chloroplastes selected={selected} pick={pick} motion={motion} />
        </group>
      )}

      <Noyau layout={layout} selected={selected} pick={pick} />
      <Reticulum layout={layout} selected={selected} pick={pick} />
      <Golgi layout={layout} selected={selected} pick={pick} />
      <Vesicules layout={layout} selected={selected} pick={pick} motion={motion} />
      <Mitochondries layout={layout} selected={selected} pick={pick} motion={motion} />
      {layout.lysosomes.map((p, i) => (
        <mesh key={i} position={p} {...pick('lysosome')}>
          <sphereGeometry args={[0.32, 20, 14]} />
          <Mat id="lysosome" selected={selected} />
        </mesh>
      ))}
      {layout.centrioles && (
        <group position={layout.centrioles} {...pick('centrioles')}>
          <mesh rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.13, 0.13, 0.6, 9]} />
            <Mat id="centrioles" selected={selected} />
          </mesh>
          <mesh position={[0.3, 0.05, 0]} rotation={[Math.PI / 2, 0, 0.3]}>
            <cylinderGeometry args={[0.13, 0.13, 0.6, 9]} />
            <Mat id="centrioles" selected={selected} />
          </mesh>
        </group>
      )}
      <Cytoplasme kind={kind} motion={motion} />

      <Projector layout={layout} anchors={anchors} />
    </group>
  );
}

export default function CelluleScene(props: CelluleSceneProps) {
  const [hover, setHover] = useState<OrganelleId | null>(null);
  const anchors: Anchors = useRef({});
  const layout = props.kind === 'animale' ? ANIMALE : VEGETALE;
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 3.5, 11.5], fov: 42 }}
        dpr={[1, 1.75]}
        onCreated={({ gl }) => {
          gl.localClippingEnabled = true;
        }}
        onPointerMissed={() => props.onSelect(null)}
      >
        <color attach="background" args={['#0b1020']} />
        <ambientLight intensity={0.55} />
        <hemisphereLight args={['#e6eeff', '#2a1d3a', 0.6]} />
        <directionalLight position={[6, 9, 7]} intensity={1.4} />
        <directionalLight position={[-6, -3, -5]} intensity={0.35} color="#9fb6ff" />
        <CellContent {...props} setHover={setHover} anchors={anchors} />
        <OrbitControls
          enablePan={false}
          minDistance={6}
          maxDistance={18}
          autoRotate={props.motion && !props.selected}
          autoRotateSpeed={0.45}
          makeDefault
        />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {(Object.keys(layout.labels) as OrganelleId[]).map((id) => {
          const show = props.labels || hover === id || props.selected === id;
          return (
            <button
              key={`${props.kind}-${id}`}
              ref={(el) => {
                anchors.current[id] = el;
              }}
              type="button"
              tabIndex={show ? 0 : -1}
              onClick={() => props.onSelect(id)}
              className={`pointer-events-auto absolute left-0 top-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold shadow transition-opacity ${
                props.selected === id ? 'bg-amber-300 text-slate-950' : 'bg-slate-900/80 text-slate-100'
              } ${show ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              {props.names[id]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
