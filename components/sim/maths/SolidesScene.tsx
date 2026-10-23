'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Edges, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export type Solide = 'cube' | 'pave' | 'prisme' | 'cylindre' | 'pyramide' | 'cone' | 'boule';

export interface SolidesSceneProps {
  solide: Solide;
  a: number;
  b: number;
  h: number;
  /** Fraction du solide remplie d’eau (0 à 1). */
  fill: number;
  transparent: boolean;
}

const COLOR = '#f59e0b';

function Prism({ a, h }: { a: number; h: number }) {
  // Prisme droit à base triangle équilatéral de côté a.
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-a / 2, 0);
    shape.lineTo(a / 2, 0);
    shape.lineTo(0, (a * Math.sqrt(3)) / 2);
    shape.closePath();
    const g = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false });
    g.rotateX(-Math.PI / 2);
    g.translate(0, 0, (a * Math.sqrt(3)) / 6);
    return g;
  }, [a, h]);
  return <primitive object={geometry} attach="geometry" />;
}

function Shape({ solide, a, b, h }: { solide: Solide; a: number; b: number; h: number }) {
  switch (solide) {
    case 'cube':
      return <boxGeometry args={[a, a, a]} />;
    case 'pave':
      return <boxGeometry args={[a, h, b]} />;
    case 'cylindre':
      return <cylinderGeometry args={[a, a, h, 48]} />;
    case 'cone':
      return <coneGeometry args={[a, h, 48]} />;
    case 'pyramide':
      return <coneGeometry args={[a / Math.SQRT2, h, 4]} />;
    case 'boule':
      return <sphereGeometry args={[a, 48, 32]} />;
    case 'prisme':
      return <Prism a={a} h={h} />;
  }
}

/** Hauteur du solide affiché, pour le poser sur le sol. */
function height(s: Solide, a: number, h: number) {
  return s === 'cube' ? a : s === 'boule' ? 2 * a : h;
}

function Water({ solide, a, b, h, fill }: Omit<SolidesSceneProps, 'transparent'>) {
  // Niveau d’eau : on coupe le solide par un plan horizontal (clipping).
  const H = height(solide, a, h);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, -1, 0), 0), []);
  plane.constant = -H / 2 + fill * H;
  if (fill <= 0) return null;
  return (
    <mesh position={[0, solide === 'prisme' ? -H / 2 : 0, 0]} scale={0.985}>
      <Shape solide={solide} a={a} b={b} h={h} />
      <meshStandardMaterial color="#38bdf8" transparent opacity={0.75} clippingPlanes={[plane]} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Spin({ children }: { children: React.ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation.y += dt * 0.25;
  });
  return <group ref={g}>{children}</group>;
}

export default function SolidesScene(props: SolidesSceneProps) {
  const { solide, a, b, h, transparent } = props;
  const H = height(solide, a, h);
  return (
    <Canvas camera={{ position: [6, 5, 8], fov: 40 }} dpr={[1, 1.75]} onCreated={({ gl }) => (gl.localClippingEnabled = true)}>
      <color attach="background" args={['#f8fafc']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 6]} intensity={1.2} />
      <gridHelper args={[12, 12, '#cbd5e1', '#e2e8f0']} position={[0, -H / 2 - 0.01, 0]} />
      <Spin>
        <mesh position={[0, solide === 'prisme' ? -H / 2 : 0, 0]}>
          <Shape solide={solide} a={a} b={b} h={h} />
          <meshStandardMaterial color={COLOR} transparent={transparent} opacity={transparent ? 0.3 : 1} side={THREE.DoubleSide} depthWrite={!transparent} />
          <Edges color="#78350f" threshold={20} />
        </mesh>
        <Water {...props} />
      </Spin>
      <OrbitControls enablePan={false} minDistance={4} maxDistance={20} makeDefault />
    </Canvas>
  );
}
