'use client';

import { useMemo, useState } from 'react';
import { MoleculeViewer } from '@/cecp/components/chem/MoleculeViewer';
import { Slider, Stat, ParamPanel, Segmented, frNum } from '@/cecp/components/sim/Controls';
import { moleculeOf, findMolecule } from '@/cecp/lib/chemistry/library';
import { stereocenters, mirror, cipLabel, withConfiguration, zeLabel, formula } from '@/cecp/lib/chemistry/molecule';
import { ethaneEnergy, butaneEnergy, conformationName } from '@/cecp/lib/chemistry/conformations';

type Tab = 'chiralite' | 'conformations' | 'ze';

const CHIRAL_CHOICES = ['butan-2-ol', 'acide-lactique', 'alanine', '2-chlorobutane', 'propan-2-ol', 'glycine'];

// ============================================================
//  Chiralite : la molecule et son image dans un miroir
// ============================================================
function ChiralityTab() {
  const [id, setId] = useState('butan-2-ol');
  const [turn, setTurn] = useState(0);
  const base = moleculeOf(id);
  const centers = stereocenters(base);
  const original = useMemo(() => (centers.length === 1 ? withConfiguration(base, centers[0], 'R') : base), [base, centers]);
  const image = useMemo(() => mirror(original), [original]);
  const chiral = centers.length > 0;
  const labelsFor = (m: typeof original) => centers.map((c) => ({ atom: c, text: `C* (${cipLabel(m, c)})` }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-2">
        <div className="relative">
          <MoleculeViewer
            height={420}
            cameraDistance={11}
            molecules={[
              { mol: original, offset: [-3, 0, 0], highlight: centers, labels: labelsFor(original) },
              { mol: image, offset: [3, 0, 0], rotationY: (turn * Math.PI) / 180, highlight: centers, labels: labelsFor(image) },
            ]}
          />
          <div className="pointer-events-none absolute inset-y-6 left-1/2 w-px bg-gradient-to-b from-transparent via-sky-300/50 to-transparent" />
          <span className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-sky-300">miroir</span>
        </div>
        <p className="text-xs text-slate-500">
          À gauche la molécule, à droite son image dans un miroir. Fais tourner la scène à la souris, et l&apos;image avec le
          curseur : essaie de les rendre identiques.
        </p>
      </div>
      <ParamPanel>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Molécule</span>
          <select value={id} onChange={(e) => { setId(e.target.value); setTurn(0); }}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-200">
            {CHIRAL_CHOICES.map((m) => <option key={m} value={m}>{findMolecule(m).name}</option>)}
          </select>
        </label>
        <Slider label="Rotation de l'image" value={turn} unit="°" min={0} max={360} step={5} digits={0} onChange={setTurn} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Formule brute" value={formula(base)} />
          <Stat label="Carbones asymétriques" value={String(centers.length)} tone="amber" />
          <Stat label="Chirale ?" value={chiral ? 'oui' : 'non'} tone={chiral ? 'rose' : 'emerald'} />
          <Stat label="Configurations" value={chiral ? 'R | S' : '—'} tone="sky" />
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {chiral
            ? "Quelle que soit la rotation, l'image n'est jamais superposable à la molécule : ce sont deux énantiomères (R et S). Le carbone asymétrique C* porte quatre groupes différents."
            : "En faisant tourner l'image (curseur et souris), on finit par la superposer à la molécule : elle est achirale. Aucun carbone ne porte quatre groupes différents."}
        </p>
        <p className="text-[11px] text-slate-500">{findMolecule(id).note}</p>
      </ParamPanel>
    </div>
  );
}

// ============================================================
//  Conformations : projection de Newman et energie
// ============================================================
function Newman({ phi, butane }: { phi: number; butane: boolean }) {
  const cx = 110, cy = 110, R = 55, L = 95;
  // Carbone avant : liaisons a 90°, 210°, 330° ; arriere : decalees de phi
  const front = [90, 210, 330];
  const back = front.map((a) => a + 180 + phi);
  const pt = (deg: number, r: number) => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
  const label = (k: number) => (butane && k === 0 ? 'CH₃' : 'H');
  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[260px] mx-auto" role="img" aria-label="Projection de Newman">
      {back.map((a, k) => {
        const [x0, y0] = pt(a, R), [x1, y1] = pt(a, L);
        const [tx, ty] = pt(a, L + 12);
        return (
          <g key={`b${k}`}>
            <line x1={x0} y1={y0} x2={x1} y2={y1} stroke="#94a3b8" strokeWidth={3} />
            <text x={tx} y={ty + 4} fill={label(k) === 'CH₃' ? '#f59e0b' : '#cbd5e1'} fontSize={12} textAnchor="middle">{label(k)}</text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={R} fill="#0f172a" stroke="#94a3b8" strokeWidth={3} />
      {front.map((a, k) => {
        const [x1, y1] = pt(a, L);
        const [tx, ty] = pt(a, L + 12);
        return (
          <g key={`f${k}`}>
            <line x1={cx} y1={cy} x2={x1} y2={y1} stroke="#e2e8f0" strokeWidth={3} />
            <text x={tx} y={ty + 4} fill={label(k) === 'CH₃' ? '#f59e0b' : '#f8fafc'} fontSize={12} fontWeight={600} textAnchor="middle">{label(k)}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ConformationsTab() {
  const [mol, setMol] = useState<'ethane' | 'butane'>('butane');
  const [phi, setPhi] = useState(180);
  const E = mol === 'ethane' ? ethaneEnergy : butaneEnergy;
  const Emax = mol === 'ethane' ? 13 : 20;
  const W = 420, H = 200, padL = 40, padB = 26, padT = 10;
  const X = (p: number) => padL + (p / 360) * (W - padL - 10);
  const Y = (e: number) => padT + (1 - e / Emax) * (H - padT - padB);
  const curve = Array.from({ length: 361 }, (_, p) => `${X(p)},${Y(E(p))}`).join(' ');
  const name = conformationName(mol, phi);
  const stable = name.startsWith('décalée');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-3 items-center rounded-lg bg-slate-950 border border-slate-800 p-3">
        <div className="md:col-span-2">
          <Newman phi={phi} butane={mol === 'butane'} />
          <p className="text-center text-xs text-slate-500">Vue selon l&apos;axe C{mol === 'butane' ? '2–C3' : '1–C2'}</p>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="md:col-span-3 w-full" role="img" aria-label="Énergie en fonction de l'angle dièdre">
          {[0, 5, 10, 15, 20].filter((e) => e <= Emax).map((e) => (
            <g key={e}>
              <line x1={padL} y1={Y(e)} x2={W - 10} y2={Y(e)} stroke="#1e293b" />
              <text x={padL - 6} y={Y(e) + 4} fill="#64748b" fontSize={10} textAnchor="end">{e}</text>
            </g>
          ))}
          {[0, 60, 120, 180, 240, 300, 360].map((p) => (
            <text key={p} x={X(p)} y={H - 8} fill="#64748b" fontSize={10} textAnchor="middle">{p}°</text>
          ))}
          <text x={padL} y={padT + 2} fill="#64748b" fontSize={10}>E (kJ/mol)</text>
          <polyline points={curve} fill="none" stroke="#f59e0b" strokeWidth={2.5} />
          <circle cx={X(phi)} cy={Y(E(phi))} r={6} fill="#38bdf8" stroke="#020617" strokeWidth={2} />
        </svg>
      </div>
      <ParamPanel>
        <Segmented<'ethane' | 'butane'> value={mol} onChange={setMol} label="Molécule"
          options={[{ value: 'ethane', label: 'Éthane' }, { value: 'butane', label: 'Butane' }]} />
        <Slider label="Angle dièdre φ" value={phi} unit="°" min={0} max={360} step={5} digits={0} onChange={setPhi} />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Conformation" value={name} tone={stable ? 'emerald' : name === 'éclipsée' ? 'rose' : 'amber'} />
          <Stat label="Énergie" value={`${frNum(E(phi), 1)} kJ/mol`} />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          La rotation autour d&apos;une liaison simple est libre à température ambiante (la barrière est faible). Les
          conformations décalées sont les plus stables ; pour le butane, la conformation anti (φ = 180°) est la plus stable.
        </p>
      </ParamPanel>
    </div>
  );
}

// ============================================================
//  Isomerie Z / E
// ============================================================
function ZETab() {
  const E = moleculeOf('e-but-2-ene');
  const Z = moleculeOf('z-but-2-ene');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2">
        <MoleculeViewer height={380} cameraDistance={11}
          molecules={[
            { mol: Z, offset: [-3, 0, 0], labels: [{ atom: 1, text: zeLabel(Z, 1, 2) ?? '' }] },
            { mol: E, offset: [3, 0, 0], labels: [{ atom: 1, text: zeLabel(E, 1, 2) ?? '' }] },
          ]} />
      </div>
      <ParamPanel title="But-2-ène">
        <div className="grid grid-cols-2 gap-2">
          <Stat label="À gauche" value="(Z)-but-2-ène" tone="sky" />
          <Stat label="À droite" value="(E)-but-2-ène" tone="amber" />
          <Stat label="Formule brute" value={formula(E)} />
          <Stat label="Rotation C=C" value="bloquée" tone="rose" />
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          La double liaison empêche la rotation : les deux groupes CH₃ restent du même côté (Z, de l&apos;allemand
          <em> zusammen</em>) ou de part et d&apos;autre (E, <em>entgegen</em>). Ce sont deux molécules différentes, qu&apos;on ne peut
          pas transformer l&apos;une en l&apos;autre sans rompre une liaison.
        </p>
      </ParamPanel>
    </div>
  );
}

export function StereoSimulation() {
  const [tab, setTab] = useState<Tab>('chiralite');
  return (
    <div className="space-y-3">
      <div className="max-w-md">
        <Segmented<Tab> value={tab} onChange={setTab}
          options={[{ value: 'chiralite', label: 'Chiralité' }, { value: 'conformations', label: 'Conformations' }, { value: 'ze', label: 'Isomérie Z/E' }]} />
      </div>
      {tab === 'chiralite' ? <ChiralityTab /> : tab === 'conformations' ? <ConformationsTab /> : <ZETab />}
    </div>
  );
}
