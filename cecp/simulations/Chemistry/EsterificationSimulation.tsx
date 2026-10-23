'use client';

import { useMemo, useRef, useState } from 'react';
import { MoleculeViewer } from '@/cecp/components/chem/MoleculeViewer';
import { Slider, Stat, ParamPanel, PlayControls, Segmented, frNum } from '@/cecp/components/sim/Controls';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { buildMolecule, formula, molarMass } from '@/cecp/lib/chemistry/molecule';
import { findMolecule } from '@/cecp/lib/chemistry/library';
import {
  esterK, equilibriumAdvance, esterificationRate, rateConstant, type AlcoholClass,
} from '@/cecp/lib/chemistry/reactions';

const ACIDS = [
  { id: 'acide-methanoique', prefix: 'méthanoate', smiles: 'C(=O)O' },
  { id: 'acide-ethanoique', prefix: 'éthanoate', smiles: 'CC(=O)O' },
  { id: 'acide-propanoique', prefix: 'propanoate', smiles: 'CCC(=O)O' },
  { id: 'acide-butanoique', prefix: 'butanoate', smiles: 'CCCC(=O)O' },
];

const ALCOHOLS: { id: string; alkyl: string; smiles: string; cls: AlcoholClass }[] = [
  { id: 'methanol', alkyl: 'méthyle', smiles: 'C', cls: 'primaire' },
  { id: 'ethanol', alkyl: 'éthyle', smiles: 'CC', cls: 'primaire' },
  { id: 'propan-1-ol', alkyl: 'propyle', smiles: 'CCC', cls: 'primaire' },
  { id: 'butan-1-ol', alkyl: 'butyle', smiles: 'CCCC', cls: 'primaire' },
  { id: 'propan-2-ol', alkyl: '1-méthyléthyle', smiles: 'C(C)C', cls: 'secondaire' },
  { id: 'butan-2-ol', alkyl: '1-méthylpropyle', smiles: 'C(C)CC', cls: 'secondaire' },
  { id: '2-methylpropan-2-ol', alkyl: '1,1-diméthyléthyle', smiles: 'C(C)(C)C', cls: 'tertiaire' },
];

type Mode = 'esterification' | 'hydrolyse';

const T_MAX = 12; // heures
const HOURS_PER_SECOND = 1.2;
const W = 520, H = 230, PAD_L = 44, PAD_B = 28, PAD_T = 12, PAD_R = 12;

function esterLabel(prefix: string, alkyl: string) {
  return `${prefix} ${/^[aeiouéè]/i.test(alkyl) ? "d'" : 'de '}${alkyl}`;
}

export function EsterificationSimulation() {
  const [acidId, setAcidId] = useState('acide-ethanoique');
  const [alcId, setAlcId] = useState('ethanol');
  const [mode, setMode] = useState<Mode>('esterification');
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [catalyst, setCatalyst] = useState(true);
  const [heated, setHeated] = useState(true);
  const [removeWater, setRemoveWater] = useState(false);
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);
  const tRef = useRef(0);

  const acid = ACIDS.find((x) => x.id === acidId)!;
  const alc = ALCOHOLS.find((x) => x.id === alcId)!;
  const K = esterK(alc.cls);
  const k = rateConstant(catalyst, heated);
  const ester = useMemo(() => buildMolecule(acid.smiles + alc.smiles), [acid, alc]);
  const esterName = esterLabel(acid.prefix, alc.alkyl);

  // Etat initial : esterification (acide a + alcool b) ou hydrolyse (ester a + eau b)
  const init = mode === 'esterification' ? { A: a, B: b, E: 0, Wa: 0 } : { A: 0, B: 0, E: a, Wa: b };
  const effectiveK = removeWater && mode === 'esterification' ? Infinity : K;

  /** Courbe n_ester(t) obtenue par integration (RK4) */
  const curve = useMemo(() => {
    const pts: { t: number; ester: number }[] = [];
    let x = 0;
    const dt = 0.02;
    const rate = (y: number) => effectiveK === Infinity
      ? k * (init.A - y) * (init.B - y)
      : esterificationRate(y, init.A, init.B, effectiveK, k, init.E, init.Wa);
    for (let s = 0; s <= T_MAX + 1e-9; s += dt) {
      pts.push({ t: s, ester: init.E + x });
      const k1 = rate(x), k2 = rate(x + (dt / 2) * k1), k3 = rate(x + (dt / 2) * k2), k4 = rate(x + dt * k3);
      x += (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    }
    return pts;
  }, [init.A, init.B, init.E, init.Wa, effectiveK, k]);

  useAnimationFrame((dt) => {
    tRef.current = Math.min(T_MAX, tRef.current + dt * HOURS_PER_SECOND);
    setT(tRef.current);
    if (tRef.current >= T_MAX) setRunning(false);
  }, running);
  const restart = () => { setRunning(false); tRef.current = 0; setT(0); };

  const nEq = effectiveK === Infinity
    ? Math.min(init.A, init.B)
    : init.E + equilibriumAdvance(init.A, init.B, K, init.E, init.Wa);
  const idx = Math.min(curve.length - 1, Math.round(t / 0.02));
  const nNow = curve[idx].ester;
  const nMax = mode === 'esterification' ? Math.min(a, b) : a;
  const yieldNow = mode === 'esterification' ? nNow / nMax : (a - nNow) / a;
  const yMax = Math.max(nMax, a) * 1.05;
  const X = (h: number) => PAD_L + (h / T_MAX) * (W - PAD_L - PAD_R);
  const Y = (n: number) => PAD_T + (1 - n / yMax) * (H - PAD_T - PAD_B);
  const pts = curve.filter((p) => p.t <= t).map((p) => `${X(p.t)},${Y(p.ester)}`).join(' ');
  const ghost = curve.map((p) => `${X(p.t)},${Y(p.ester)}`).join(' ');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Quantité d'ester en fonction du temps">
            {[0, 0.25, 0.5, 0.75, 1].map((f) => (
              <g key={f}>
                <line x1={PAD_L} y1={Y(f * yMax)} x2={W - PAD_R} y2={Y(f * yMax)} stroke="#1e293b" />
                <text x={PAD_L - 6} y={Y(f * yMax) + 4} fill="#64748b" fontSize={10} textAnchor="end">{frNum(f * yMax, 2)}</text>
              </g>
            ))}
            {[0, 2, 4, 6, 8, 10, 12].map((h) => (
              <text key={h} x={X(h)} y={H - 10} fill="#64748b" fontSize={10} textAnchor="middle">{h}</text>
            ))}
            <text x={W - PAD_R} y={H} fill="#64748b" fontSize={10} textAnchor="end">t (h)</text>
            <text x={PAD_L + 4} y={PAD_T + 10} fill="#64748b" fontSize={10}>n(ester) en mol</text>
            <line x1={PAD_L} y1={Y(nEq)} x2={W - PAD_R} y2={Y(nEq)} stroke="#10b981" strokeDasharray="4 4" />
            <text x={W - PAD_R - 4} y={Y(nEq) - 5} fill="#10b981" fontSize={10} textAnchor="end">équilibre : {frNum(nEq, 3)} mol</text>
            <polyline points={ghost} fill="none" stroke="#334155" strokeWidth={1.5} strokeDasharray="3 4" />
            <polyline points={pts} fill="none" stroke="#f472b6" strokeWidth={2.5} />
            <circle cx={X(t)} cy={Y(nNow)} r={5} fill="#f472b6" stroke="#020617" strokeWidth={2} />
          </svg>
        </div>
        <MoleculeViewer height={220} cameraDistance={11} molecules={[{ mol: ester }]}
          caption={<span>Ester : <strong className="text-pink-300">{esterName}</strong> ({formula(ester)}, {frNum(molarMass(ester), 0)} g/mol)</span>} />
      </div>

      <ParamPanel title="Estérification">
        <Segmented<Mode> value={mode} onChange={(m) => { setMode(m); restart(); }}
          options={[{ value: 'esterification', label: 'Estérification' }, { value: 'hydrolyse', label: 'Hydrolyse' }]} />
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Acide carboxylique</span>
          <select value={acidId} onChange={(e) => { setAcidId(e.target.value); restart(); }}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-200">
            {ACIDS.map((x) => <option key={x.id} value={x.id}>{findMolecule(x.id).name}</option>)}
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Alcool</span>
          <select value={alcId} onChange={(e) => { setAlcId(e.target.value); restart(); }}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-200">
            {ALCOHOLS.map((x) => <option key={x.id} value={x.id}>{findMolecule(x.id).name} ({x.cls})</option>)}
          </select>
        </label>
        <Slider label={mode === 'esterification' ? "Quantité d'acide" : "Quantité d'ester"} value={a} unit="mol" min={0.1} max={3} step={0.1} digits={1} onChange={(v) => { setA(v); restart(); }} />
        <Slider label={mode === 'esterification' ? "Quantité d'alcool" : "Quantité d'eau"} value={b} unit="mol" min={0.1} max={3} step={0.1} digits={1} onChange={(v) => { setB(v); restart(); }} />
        <div className="space-y-1 text-sm text-slate-300">
          <label className="flex items-center gap-2"><input type="checkbox" checked={catalyst} onChange={(e) => { setCatalyst(e.target.checked); restart(); }} className="accent-amber-500" /> Catalyseur (acide sulfurique)</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={heated} onChange={(e) => { setHeated(e.target.checked); restart(); }} className="accent-amber-500" /> Chauffage à reflux</label>
          {mode === 'esterification' && (
            <label className="flex items-center gap-2"><input type="checkbox" checked={removeWater} onChange={(e) => { setRemoveWater(e.target.checked); restart(); }} className="accent-amber-500" /> Éliminer l&apos;eau au fur et à mesure</label>
          )}
        </div>
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={restart} playLabel="Démarrer" />
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Temps" value={`${frNum(t, 1)} h`} />
          <Stat label="n(ester)" value={`${frNum(nNow, 3)} mol`} tone="rose" />
          <Stat label="Constante K" value={frNum(K, alc.cls === 'tertiaire' ? 4 : 2)} tone="sky" />
          <Stat label={mode === 'esterification' ? 'Rendement' : 'Ester hydrolysé'} value={`${frNum(yieldNow * 100, 0)} %`} tone="emerald" />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          L&apos;estérification est lente, limitée et athermique. Le catalyseur et la chaleur accélèrent la réaction sans changer
          l&apos;équilibre. Un excès d&apos;un réactif ou l&apos;élimination de l&apos;eau déplacent l&apos;équilibre et augmentent le rendement.
        </p>
      </ParamPanel>
    </div>
  );
}
