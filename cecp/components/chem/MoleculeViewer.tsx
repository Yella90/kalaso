'use client';

import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';
import type { Element, Molecule, Vec3 } from '@/cecp/lib/chemistry/molecule';

/** Couleurs CPK (adaptees au fond sombre) */
export const ELEMENT_COLOR: Record<Element, string> = {
  C: '#64748b', H: '#f1f5f9', O: '#ef4444', N: '#3b82f6', S: '#facc15', Cl: '#22c55e',
};
const RADIUS: Record<Element, number> = { C: 0.36, H: 0.24, O: 0.34, N: 0.35, S: 0.45, Cl: 0.44 };

export interface SceneMolecule {
  mol: Molecule;
  /** Decalage dans la scene (pour afficher deux molecules cote a cote) */
  offset?: Vec3;
  /** Rotation autour de l'axe vertical (radians) */
  rotationY?: number;
  /** Atomes mis en evidence (anneau dore) */
  highlight?: number[];
  /** Etiquettes au-dessus de certains atomes */
  labels?: { atom: number; text: string; color?: string }[];
  /** Opacite globale (0 a 1) */
  opacity?: number;
}

const UP = new THREE.Vector3(0, 1, 0);

function Bond({ from, to, order, colorA, colorB, opacity }: {
  from: Vec3; to: Vec3; order: 1 | 2; colorA: string; colorB: string; opacity: number;
}) {
  const { mid, quat, len, perp } = useMemo(() => {
    const a = new THREE.Vector3(...from), b = new THREE.Vector3(...to);
    const dir = b.clone().sub(a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize());
    const p = new THREE.Vector3().crossVectors(dir, Math.abs(dir.y) < 0.9 * len ? UP : new THREE.Vector3(1, 0, 0)).normalize();
    return { mid: a.clone().add(b).multiplyScalar(0.5), quat: q, len, perp: p };
  }, [from, to]);
  const offsets = order === 2 ? [0.09, -0.09] : [0];
  const r = order === 2 ? 0.055 : 0.08;
  return (
    <>
      {offsets.map((o) => {
        const base = mid.clone().add(perp.clone().multiplyScalar(o));
        const half = quat.clone();
        const axis = new THREE.Vector3(0, 1, 0).applyQuaternion(half);
        return (
          <group key={o}>
            {/* Chaque moitie prend la couleur de son atome */}
            <mesh position={base.clone().sub(axis.clone().multiplyScalar(len / 4))} quaternion={half}>
              <cylinderGeometry args={[r, r, len / 2, 12]} />
              <meshStandardMaterial color={colorA} transparent={opacity < 1} opacity={opacity} />
            </mesh>
            <mesh position={base.clone().add(axis.clone().multiplyScalar(len / 4))} quaternion={half}>
              <cylinderGeometry args={[r, r, len / 2, 12]} />
              <meshStandardMaterial color={colorB} transparent={opacity < 1} opacity={opacity} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function MoleculeMesh({ sm, showLonePairs }: { sm: SceneMolecule; showLonePairs: boolean }) {
  const { mol, offset = [0, 0, 0], rotationY = 0, highlight = [], labels = [], opacity = 1 } = sm;
  return (
    <group position={offset} rotation={[0, rotationY, 0]}>
      {mol.bonds.map((b, k) => (
        <Bond key={k} from={mol.atoms[b.a].pos} to={mol.atoms[b.b].pos} order={b.order}
          colorA={ELEMENT_COLOR[mol.atoms[b.a].el]} colorB={ELEMENT_COLOR[mol.atoms[b.b].el]} opacity={opacity} />
      ))}
      {mol.atoms.map((a, i) => (
        <group key={i} position={a.pos}>
          <mesh>
            <sphereGeometry args={[RADIUS[a.el], 24, 24]} />
            <meshStandardMaterial color={ELEMENT_COLOR[a.el]} roughness={0.35} metalness={0.05} transparent={opacity < 1} opacity={opacity} />
          </mesh>
          {highlight.includes(i) && (
            <mesh>
              <sphereGeometry args={[RADIUS[a.el] + 0.16, 24, 24]} />
              <meshBasicMaterial color="#fbbf24" transparent opacity={0.35} depthWrite={false} />
            </mesh>
          )}
          {showLonePairs && a.lonePairs.map((d, k) => (
            <mesh key={k} position={[d[0] * 0.55, d[1] * 0.55, d[2] * 0.55]}
              quaternion={new THREE.Quaternion().setFromUnitVectors(UP, new THREE.Vector3(...d))}>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color="#a78bfa" transparent opacity={0.45} />
            </mesh>
          ))}
        </group>
      ))}
      {labels.map((l) => {
        const p = mol.atoms[l.atom].pos;
        return (
          <Billboard key={`${l.atom}-${l.text}`} position={[p[0], p[1] + 1.1, p[2]]}>
            {/* Toujours visible, meme derriere d'autres atomes */}
            <Text fontSize={0.5} color={l.color ?? '#fbbf24'} outlineWidth={0.04} outlineColor="#020617"
              renderOrder={10} material-depthTest={false}>
              {l.text}
            </Text>
          </Billboard>
        );
      })}
    </group>
  );
}

/**
 * Vue 3D de une ou plusieurs molecules (boules et batonnets), a faire
 * tourner a la souris ou au doigt.
 */
export function MoleculeViewer({
  molecules, showLonePairs = false, autoRotate = false, height = 380, cameraDistance = 9, caption,
}: {
  molecules: SceneMolecule[];
  showLonePairs?: boolean;
  autoRotate?: boolean;
  height?: number;
  cameraDistance?: number;
  caption?: React.ReactNode;
}) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-slate-950 border border-slate-800" style={{ height }}>
      <Canvas camera={{ position: [0, 1.5, cameraDistance], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 6]} intensity={1.1} />
        <directionalLight position={[-6, -3, -4]} intensity={0.35} />
        {molecules.map((sm, k) => <MoleculeMesh key={k} sm={sm} showLonePairs={showLonePairs} />)}
        <OrbitControls makeDefault enablePan={false} minDistance={3} maxDistance={25} autoRotate={autoRotate} autoRotateSpeed={1.2} />
      </Canvas>
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 text-[10px] text-slate-400 pointer-events-none">
        {(['C', 'H', 'O', 'N', 'S', 'Cl'] as Element[])
          .filter((e) => molecules.some((m) => m.mol.atoms.some((a) => a.el === e)))
          .map((e) => (
            <span key={e} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900/80">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: ELEMENT_COLOR[e] }} />{e}
            </span>
          ))}
        {showLonePairs && molecules.some((m) => m.mol.atoms.some((a) => a.lonePairs.length)) && (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-900/80">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400/60" />doublet non liant
          </span>
        )}
      </div>
      {caption && <div className="absolute top-2 left-2 text-xs text-slate-300 pointer-events-none">{caption}</div>}
    </div>
  );
}
