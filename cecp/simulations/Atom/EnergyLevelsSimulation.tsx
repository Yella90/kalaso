'use client';

import { useState } from 'react';
import { Slider, Stat, ParamPanel, Segmented, frNum } from '@/cecp/components/sim/Controls';
import { wavelengthToCss } from '@/cecp/lib/physics/light';
import {
  hydrogenLevel, transitionWavelength, seriesName, absorbedTo, ionizationEnergyFrom, E0_HYDROGEN,
} from '@/cecp/lib/physics/quantum';

const LEVELS = [1, 2, 3, 4, 5, 6];
const W = 560, H = 360, TOP = 24, BOTTOM = 330;
/** Echelle verticale : E de -13,6 eV (bas) a 0 eV (haut) */
const Y = (E: number) => TOP + (-E / E0_HYDROGEN) * (BOTTOM - TOP);

type Mode = 'emission' | 'absorption';

interface Line { nm: number; from: number; to: number }

function domain(nm: number) {
  if (nm < 380) return 'ultraviolet';
  if (nm > 780) return 'infrarouge';
  return 'visible';
}

export function EnergyLevelsSimulation() {
  const [mode, setMode] = useState<Mode>('emission');
  const [n, setN] = useState(3); // niveau actuel de l'atome
  const [target, setTarget] = useState<number | null>(2);
  const [photonE, setPhotonE] = useState(10.2);
  const [lines, setLines] = useState<Line[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const emit = () => {
    if (target === null || target >= n) return;
    const nm = transitionWavelength(n, target) * 1e9;
    setLines((ls) => (ls.some((l) => l.from === n && l.to === target) ? ls : [...ls, { nm, from: n, to: target }]));
    setMessage(`Photon émis : ${frNum(hydrogenLevel(n) - hydrogenLevel(target), 2)} eV, λ = ${frNum(nm, 0)} nm (${domain(nm)}, série de ${seriesName(target)}).`);
    setN(target);
    setTarget(target > 1 ? target - 1 : null);
  };

  const absorb = () => {
    const res = absorbedTo(n, photonE, 0.03, 6);
    if (res === null) {
      setMessage(`Photon de ${frNum(photonE, 2)} eV NON absorbé : il ne correspond à aucune différence entre deux niveaux.`);
    } else if (res === Infinity) {
      setMessage(`Ionisation ! L'électron est arraché avec une énergie cinétique de ${frNum(photonE - ionizationEnergyFrom(n), 2)} eV.`);
      setN(1);
    } else {
      setMessage(`Photon absorbé : l'atome passe du niveau ${n} au niveau ${res}.`);
      setN(res);
    }
  };

  const tNm = target !== null && target < n ? transitionWavelength(n, target) * 1e9 : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Diagramme des niveaux d'énergie de l'atome d'hydrogène">
            {/* Ionisation */}
            <line x1={120} y1={Y(0)} x2={W - 30} y2={Y(0)} stroke="#64748b" strokeDasharray="5 4" />
            <text x={110} y={Y(0) + 4} fill="#94a3b8" fontSize={12} textAnchor="end">0 eV (n = ∞)</text>
            {LEVELS.map((k) => {
              const E = hydrogenLevel(k);
              const on = k === n;
              return (
                <g key={k} onClick={() => mode === 'emission' && k < n && setTarget(k)} className={mode === 'emission' && k < n ? 'cursor-pointer' : ''}>
                  <line x1={120} y1={Y(E)} x2={W - 30} y2={Y(E)} stroke={on ? '#f59e0b' : k === target ? '#38bdf8' : '#475569'} strokeWidth={on ? 4 : 2} />
                  {k <= 4 && (
                    <text x={110} y={Y(E) + 4} fill={on ? '#f59e0b' : '#94a3b8'} fontSize={12} textAnchor="end">
                      {frNum(E, 2)} eV (n = {k})
                    </text>
                  )}
                  {k > 4 && <text x={W - 26} y={Y(E) + 4} fill="#64748b" fontSize={10}>n = {k}</text>}
                </g>
              );
            })}
            {/* Electron */}
            <circle cx={200} cy={Y(hydrogenLevel(n))} r={9} fill="#f59e0b" />
            <text x={200} y={Y(hydrogenLevel(n)) + 4} fill="#0f172a" fontSize={11} fontWeight={700} textAnchor="middle">e⁻</text>
            {/* Transitions emises */}
            {lines.map((l, k) => (
              <line key={k} x1={260 + (k % 10) * 26} y1={Y(hydrogenLevel(l.from))} x2={260 + (k % 10) * 26} y2={Y(hydrogenLevel(l.to))}
                stroke={wavelengthToCss(l.nm)} strokeWidth={3} markerEnd="url(#el-arrow)" opacity={0.85} />
            ))}
            {/* Transition preparee */}
            {mode === 'emission' && tNm !== null && target !== null && (
              <line x1={225} y1={Y(hydrogenLevel(n)) + 10} x2={225} y2={Y(hydrogenLevel(target)) - 6}
                stroke={wavelengthToCss(tNm)} strokeWidth={2} strokeDasharray="4 3" markerEnd="url(#el-arrow)" />
            )}
            <defs>
              <marker id="el-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="context-stroke" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Spectre d'emission */}
        <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 space-y-2">
          <p className="text-xs text-slate-400">Spectre d&apos;émission obtenu (domaine visible, 380 – 780 nm)</p>
          <div className="relative h-12 rounded bg-black overflow-hidden">
            {lines.filter((l) => l.nm >= 380 && l.nm <= 780).map((l) => (
              <div key={`${l.from}-${l.to}`} className="absolute top-0 bottom-0 w-1"
                style={{ left: `${((l.nm - 380) / 400) * 100}%`, background: wavelengthToCss(l.nm) }}
                title={`${frNum(l.nm, 0)} nm`} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-slate-500"><span>380 nm</span><span>580 nm</span><span>780 nm</span></div>
          {lines.some((l) => l.nm < 380 || l.nm > 780) && (
            <p className="text-[11px] text-slate-500">
              Raies invisibles : {lines.filter((l) => l.nm < 380 || l.nm > 780).map((l) => `${frNum(l.nm, 0)} nm (${domain(l.nm)})`).join(' ; ')}
            </p>
          )}
        </div>
        {message && <p className="text-sm p-3 rounded-md bg-slate-900 border border-slate-800 text-slate-200">{message}</p>}
      </div>

      <ParamPanel title="Expérience">
        <Segmented<Mode> value={mode} onChange={(m) => { setMode(m); setMessage(null); }}
          options={[{ value: 'emission', label: 'Émission' }, { value: 'absorption', label: 'Absorption' }]} />
        <div className="space-y-1">
          <p className="text-sm text-slate-300">Niveau de départ de l&apos;atome</p>
          <div className="flex flex-wrap gap-1">
            {LEVELS.map((k) => (
              <button key={k} onClick={() => { setN(k); setTarget(k > 1 ? k - 1 : null); setMessage(null); }}
                className={`w-9 h-9 rounded-md text-sm font-semibold ${k === n ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                {k}
              </button>
            ))}
          </div>
        </div>

        {mode === 'emission' ? (
          <>
            <div className="space-y-1">
              <p className="text-sm text-slate-300">Niveau d&apos;arrivée (clique aussi sur le diagramme)</p>
              <div className="flex flex-wrap gap-1">
                {LEVELS.filter((k) => k < n).map((k) => (
                  <button key={k} onClick={() => setTarget(k)}
                    className={`w-9 h-9 rounded-md text-sm font-semibold ${k === target ? 'bg-sky-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                    {k}
                  </button>
                ))}
                {n === 1 && <p className="text-xs text-slate-500">État fondamental : l&apos;atome ne peut plus émettre.</p>}
              </div>
            </div>
            <button onClick={emit} disabled={tNm === null}
              className="w-full px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 font-semibold">
              Émettre le photon
            </button>
            {tNm !== null && target !== null && (
              <div className="grid grid-cols-2 gap-2">
                <Stat label="Énergie du photon" value={`${frNum(hydrogenLevel(n) - hydrogenLevel(target), 2)} eV`} />
                <Stat label="Longueur d'onde" value={`${frNum(tNm, 0)} nm`} tone="sky" />
                <Stat label="Série" value={seriesName(target)} tone="emerald" />
                <Stat label="Domaine" value={domain(tNm)} tone="rose" />
              </div>
            )}
          </>
        ) : (
          <>
            <Slider label="Énergie du photon incident" value={photonE} unit="eV" min={0.5} max={16} step={0.01} onChange={setPhotonE} />
            <div className="flex flex-wrap gap-1">
              {[10.2, 12.09, 12.75, 1.89, 11, 15].map((e) => (
                <button key={e} onClick={() => setPhotonE(e)} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300">
                  {frNum(e, 2)}
                </button>
              ))}
            </div>
            <button onClick={absorb} className="w-full px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
              Envoyer le photon
            </button>
            <Stat label="Énergie d'ionisation depuis ce niveau" value={`${frNum(ionizationEnergyFrom(n), 2)} eV`} />
          </>
        )}
        <button onClick={() => { setLines([]); setMessage(null); }} className="w-full px-3 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs">
          Effacer le spectre
        </button>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Fais redescendre l&apos;atome du niveau 6 vers le niveau 2 par différents chemins : tu obtiens les raies visibles de la
          série de Balmer (environ 656, 486, 434 et 410 nm).
        </p>
      </ParamPanel>
    </div>
  );
}
