'use client';

import { useState } from 'react';
import { FlaskConical, TestTubes } from 'lucide-react';
import { MoleculeViewer } from '@/cecp/components/chem/MoleculeViewer';
import { Slider, Stat, ParamPanel, Segmented, frNum } from '@/cecp/components/sim/Controls';
import { moleculeOf, findMolecule } from '@/cecp/lib/chemistry/library';
import { alcoholClass, formula, molarMass } from '@/cecp/lib/chemistry/molecule';
import { OXIDATION, oxidationProduct, characteristicTests, dichromateNeeded, electronsPerAlcohol } from '@/cecp/lib/chemistry/reactions';

const ALCOHOLS = Object.keys(OXIDATION);

type Oxidant = 'defaut' | 'exces';

/** Un tube a essai stylise */
function Tube({ label, color, precipitate, mirror: silver, done }: {
  label: string; color: string; precipitate?: string; mirror?: boolean; done: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 40 110" className="w-10 h-28" aria-hidden>
        <path d="M8 4 L8 92 Q20 108 32 92 L32 4" fill="#0f172a" stroke="#64748b" strokeWidth={2} />
        <path d="M9.5 40 L9.5 92 Q20 106 30.5 92 L30.5 40 Z" fill={color} opacity={0.85} />
        {done && precipitate && <ellipse cx={20} cy={94} rx={9} ry={6} fill={precipitate} />}
        {done && silver && <path d="M9.5 40 L9.5 92 Q20 106 30.5 92 L30.5 40" fill="none" stroke="#e5e7eb" strokeWidth={3} />}
      </svg>
      <span className="text-[10px] text-slate-400 text-center leading-tight w-16">{label}</span>
    </div>
  );
}

export function OxidationLab() {
  const [alcohol, setAlcohol] = useState('ethanol');
  const [oxidant, setOxidant] = useState<Oxidant>('defaut');
  const [reacted, setReacted] = useState(false);
  const [tested, setTested] = useState(false);
  const [mass, setMass] = useState(4.6);

  const excess = oxidant === 'exces';
  const alc = moleculeOf(alcohol);
  const cls = alcoholClass(alc);
  const productId = oxidationProduct(alcohol, excess);
  const product = productId ? moleculeOf(productId) : null;
  const family = productId ? findMolecule(productId).family : null;
  const tests = characteristicTests(reacted ? family : null);
  const M = molarMass(alc);
  const n = mass / M;
  const nDichromate = dichromateNeeded(alcohol, n, excess);

  const reset = () => { setReacted(false); setTested(false); };
  const solutionColor = !reacted || !productId ? '#f97316' : '#16a34a';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <MoleculeViewer
          height={300}
          cameraDistance={10}
          molecules={product && reacted
            ? [{ mol: alc, offset: [-2.8, 0, 0], opacity: 0.55 }, { mol: product, offset: [2.8, 0, 0] }]
            : [{ mol: alc }]}
          caption={reacted && product
            ? <span>{findMolecule(alcohol).name} → <strong className="text-emerald-400">{findMolecule(productId!).name}</strong></span>
            : <span>{findMolecule(alcohol).name} ({cls})</span>}
        />
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 flex flex-wrap items-end justify-around gap-3">
          <div className="flex flex-col items-center gap-1">
            <Tube label="Mélange réactionnel" color={solutionColor} done={false} />
            <span className="text-[10px] text-slate-500">{reacted ? (productId ? 'Cr³⁺ vert' : 'pas de réaction') : 'Cr₂O₇²⁻ orange'}</span>
          </div>
          <div className="h-24 w-px bg-slate-800" />
          <Tube label="DNPH" color="#fde68a" precipitate="#f97316" done={tested && tests.dnph} />
          <Tube label="Fehling (chauffé)" color="#3b82f6" precipitate="#b91c1c" done={tested && tests.fehling} />
          <Tube label="Tollens" color="#e2e8f0" mirror done={tested && tests.tollens} />
          <Tube label="Schiff" color={tested && tests.schiff ? '#ec4899' : '#f1f5f9'} done={tested} />
          <Tube label="BBT" color={tested && tests.bbtAcid ? '#facc15' : '#16a34a'} done={tested} />
        </div>
        {tested && (
          <p className="text-sm p-3 rounded-md bg-slate-900 border border-slate-800 text-slate-200">
            {!productId
              ? "Aucun test positif : l'alcool tertiaire n'est pas oxydé, la solution reste orange."
              : family === 'aldéhyde'
                ? 'DNPH positive (précipité jaune-orangé) et Fehling, Tollens, Schiff positifs : le produit est un aldéhyde.'
                : family === 'cétone'
                  ? 'DNPH positive mais Fehling, Tollens et Schiff négatifs : le produit est une cétone.'
                  : 'DNPH négative et BBT jaune : le produit est un acide carboxylique.'}
          </p>
        )}
      </div>

      <ParamPanel title="Oxydation ménagée">
        <label className="block space-y-1">
          <span className="text-sm text-slate-300">Alcool</span>
          <select value={alcohol} onChange={(e) => { setAlcohol(e.target.value); reset(); }}
            className="w-full rounded-md bg-slate-950 border border-slate-700 px-3 py-2 text-sm text-slate-200">
            {ALCOHOLS.map((a) => <option key={a} value={a}>{findMolecule(a).name}</option>)}
          </select>
        </label>
        <Segmented<Oxidant> label="Dichromate de potassium acidifié" value={oxidant} onChange={(o) => { setOxidant(o); reset(); }}
          options={[{ value: 'defaut', label: 'En défaut' }, { value: 'exces', label: 'En excès' }]} />
        <div className="flex gap-2">
          <button onClick={() => { setReacted(true); setTested(false); }}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm">
            <FlaskConical size={16} /> Oxyder
          </button>
          <button onClick={() => setTested(true)} disabled={!reacted}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-md bg-sky-500/20 hover:bg-sky-500/30 disabled:opacity-40 text-sky-200 font-semibold text-sm">
            <TestTubes size={16} /> Tests
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Classe" value={cls ?? '—'} tone="sky" />
          <Stat label="Formule" value={formula(alc)} />
          <Stat label="Produit" value={reacted ? (productId ? findMolecule(productId).name : 'aucun') : '?'} tone="emerald" />
          <Stat label="Électrons cédés" value={reacted ? String(electronsPerAlcohol(alcohol, excess)) : '?'} />
        </div>
        <Slider label="Masse d'alcool oxydée" value={mass} unit="g" min={0.5} max={20} step={0.1} digits={1} onChange={setMass} />
        <p className="text-xs text-slate-300 font-mono">
          n = m / M = {frNum(mass, 1)} / {frNum(M, 0)} = {frNum(n, 3)} mol<br />
          n(Cr₂O₇²⁻) nécessaire = {cls === 'tertiaire' ? '0 (pas de réaction)' : `${frNum(nDichromate, 4)} mol`}
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Cr₂O₇²⁻ + 14 H⁺ + 6 e⁻ → 2 Cr³⁺ + 7 H₂O. Un alcool primaire donne un aldéhyde (2 e⁻) puis, si l&apos;oxydant est en
          excès, un acide carboxylique (4 e⁻ au total). Un alcool secondaire donne une cétone. Un alcool tertiaire ne réagit pas.
        </p>
      </ParamPanel>
    </div>
  );
}
