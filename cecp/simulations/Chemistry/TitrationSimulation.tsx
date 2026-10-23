'use client';

import { useRef, useState } from 'react';
import { Droplets } from 'lucide-react';
import { MoleculeViewer } from '@/cecp/components/chem/MoleculeViewer';
import { Slider, Stat, ParamPanel, PlayControls, frNum } from '@/cecp/components/sim/Controls';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import {
  WEAK_SPECIES, INDICATORS, titrationPH, equivalenceVolume, indicatorColor, indicatorSuits,
} from '@/cecp/lib/chemistry/acidbase';
import { moleculeOf, MOLECULES } from '@/cecp/lib/chemistry/library';
import { amineClass } from '@/cecp/lib/chemistry/molecule';

const V_SAMPLE = 20; // mL de solution dosee
const V_MAX = 40; // mL de burette
const W = 520, H = 260, PAD_L = 40, PAD_B = 28, PAD_T = 12, PAD_R = 12;
const X = (v: number) => PAD_L + (v / V_MAX) * (W - PAD_L - PAD_R);
const Y = (p: number) => PAD_T + (1 - p / 14) * (H - PAD_T - PAD_B);

/**
 * Dosage pH-metrique d'une espece faible :
 * - kind = 'base' : amine (ou ammoniac) dosee par l'acide chlorhydrique ;
 * - kind = 'acide' : acide carboxylique dose par la soude.
 */
export function TitrationSimulation({ kind }: { kind: 'acide' | 'base' }) {
  const choices = WEAK_SPECIES.filter((s) => s.kind === kind);
  const [speciesId, setSpeciesId] = useState(choices[0].id);
  const [C, setC] = useState(0.1);
  const [Ct, setCt] = useState(0.1);
  const [Vt, setVt] = useState(0);
  const [indicator, setIndicator] = useState(kind === 'base' ? 'Rouge de méthyle' : 'Phénolphtaléine');
  const [running, setRunning] = useState(false);
  const vRef = useRef(0);

  const species = choices.find((s) => s.id === speciesId)!;
  const VE = equivalenceVolume(C, V_SAMPLE, Ct);
  const pH = titrationPH(species, C, V_SAMPLE, Ct, Vt);
  const pHeq = titrationPH(species, C, V_SAMPLE, Ct, VE);
  const ind = INDICATORS.find((i) => i.name === indicator)!;
  const color = indicatorColor(ind, pH);
  const titrant = kind === 'base' ? 'acide chlorhydrique (H₃O⁺ + Cl⁻)' : 'soude (Na⁺ + HO⁻)';

  useAnimationFrame((dt) => {
    vRef.current = Math.min(V_MAX, vRef.current + dt * 1.5);
    setVt(vRef.current);
    if (vRef.current >= V_MAX) setRunning(false);
  }, running);

  // Courbe complete (pointilles) et partie deja tracee (400 points au plus : calcul leger)
  const curve = (vMax: number) => {
    const pts: string[] = [];
    for (let v = 0; v <= vMax + 1e-9; v += 0.1) pts.push(`${X(v)},${Y(titrationPH(species, C, V_SAMPLE, Ct, v))}`);
    return pts.join(' ');
  };
  const full = curve(V_MAX);
  const done = curve(Vt);

  const setVolume = (v: number) => { vRef.current = v; setVt(v); };
  const reset = () => { setRunning(false); setVolume(0); };
  const molId = MOLECULES.some((m) => m.id === speciesId) ? speciesId : null;
  const mol = molId ? moleculeOf(molId) : null;
  const beaker = color === 'mix' ? `linear-gradient(180deg, ${ind.acidColor}, ${ind.baseColor})` : color;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Courbe de dosage pH = f(V)">
            {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((p) => (
              <g key={p}>
                <line x1={PAD_L} y1={Y(p)} x2={W - PAD_R} y2={Y(p)} stroke={p === 7 ? '#334155' : '#1e293b'} />
                <text x={PAD_L - 6} y={Y(p) + 4} fill="#64748b" fontSize={10} textAnchor="end">{p}</text>
              </g>
            ))}
            {[0, 10, 20, 30, 40].map((v) => (
              <text key={v} x={X(v)} y={H - 10} fill="#64748b" fontSize={10} textAnchor="middle">{v}</text>
            ))}
            <text x={W - PAD_R} y={H - 0} fill="#64748b" fontSize={10} textAnchor="end">V versé (mL)</text>
            <text x={PAD_L + 4} y={PAD_T + 10} fill="#64748b" fontSize={10}>pH</text>
            {/* Zone de virage de l'indicateur */}
            <rect x={PAD_L} y={Y(ind.high)} width={W - PAD_L - PAD_R} height={Y(ind.low) - Y(ind.high)} fill="#a78bfa" opacity={0.1} />
            <polyline points={full} fill="none" stroke="#475569" strokeWidth={1.5} strokeDasharray="4 4" />
            <polyline points={done} fill="none" stroke="#f59e0b" strokeWidth={2.5} />
            {VE <= V_MAX && (
              <g>
                <line x1={X(VE)} y1={PAD_T} x2={X(VE)} y2={H - PAD_B} stroke="#10b981" strokeDasharray="3 4" />
                <text x={X(VE) + 4} y={PAD_T + 22} fill="#10b981" fontSize={10}>E (V = {frNum(VE, 1)} mL)</text>
                <line x1={X(VE / 2)} y1={Y(species.pKa)} x2={PAD_L} y2={Y(species.pKa)} stroke="#38bdf8" strokeDasharray="3 4" />
                <text x={PAD_L + 4} y={Y(species.pKa) - 4} fill="#38bdf8" fontSize={10}>pKa = {frNum(species.pKa, 1)}</text>
              </g>
            )}
            <circle cx={X(Vt)} cy={Y(pH)} r={5} fill="#38bdf8" stroke="#020617" strokeWidth={2} />
          </svg>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 flex items-center gap-4">
            <div className="w-20 h-24 rounded-b-xl border-2 border-t-0 border-slate-500 overflow-hidden flex items-end" aria-hidden>
              <div className="w-full h-3/4 transition-colors" style={{ background: beaker, opacity: 0.85 }} />
            </div>
            <div className="text-sm space-y-1">
              <p className="font-mono text-2xl text-amber-400">pH = {frNum(pH, 2)}</p>
              <p className="text-slate-400 text-xs">{indicator} : {color === 'mix' ? 'teinte sensible (virage)' : pH <= ind.low ? 'teinte acide' : 'teinte basique'}</p>
            </div>
          </div>
          {mol && (
            <MoleculeViewer height={150} cameraDistance={7} showLonePairs autoRotate molecules={[{ mol }]}
              caption={kind === 'base' ? <span>Amine {amineClass(mol)} : doublet de l&apos;azote</span> : undefined} />
          )}
        </div>
      </div>

      <ParamPanel title="Dosage pH-métrique">
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">{kind === 'base' ? 'Base dosée (20 mL)' : 'Acide dosé (20 mL)'}</span>
          <select value={speciesId} onChange={(e) => { setSpeciesId(e.target.value); reset(); }}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-200">
            {choices.map((s) => <option key={s.id} value={s.id}>{s.name} (pKa {frNum(s.pKa, 1)})</option>)}
          </select>
        </label>
        <Slider label="Concentration dosée C" value={C} unit="mol/L" min={0.01} max={0.2} step={0.01} onChange={(v) => { setC(v); reset(); }} />
        <Slider label={`Concentration du titrant`} value={Ct} unit="mol/L" min={0.05} max={0.2} step={0.01} onChange={(v) => { setCt(v); reset(); }} />
        <Slider label="Volume versé" value={Vt} unit="mL" min={0} max={V_MAX} step={0.1} digits={1} onChange={(v) => { setRunning(false); setVolume(v); }} />
        <PlayControls running={running} onToggle={() => setRunning((r) => !r)} onReset={reset} playLabel="Verser" />
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Indicateur coloré</span>
          <select value={indicator} onChange={(e) => setIndicator(e.target.value)}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-200">
            {INDICATORS.map((i) => <option key={i.name} value={i.name}>{i.name} ({frNum(i.low, 1)} – {frNum(i.high, 1)})</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Volume équivalent" value={`${frNum(VE, 1)} mL`} tone="emerald" />
          <Stat label="pH à l'équivalence" value={frNum(pHeq, 2)} />
          <Stat label="pH à la demi-équivalence" value={frNum(titrationPH(species, C, V_SAMPLE, Ct, VE / 2), 2)} tone="sky" />
          <Stat label="Indicateur adapté ?" value={indicatorSuits(ind, pHeq) ? 'oui' : 'non'} tone={indicatorSuits(ind, pHeq) ? 'emerald' : 'rose'} />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed flex gap-2">
          <Droplets size={14} className="shrink-0 text-sky-400 mt-0.5" />
          <span>
            Titrant : {titrant}. À l&apos;équivalence, C·V = C<sub>t</sub>·V<sub>E</sub>. À la demi-équivalence, pH = pKa :
            c&apos;est ainsi qu&apos;on mesure le pKa. Le pH à l&apos;équivalence est {kind === 'base' ? 'acide' : 'basique'} : choisis un
            indicateur dont la zone de virage le contient.
          </span>
        </p>
      </ParamPanel>
    </div>
  );
}
