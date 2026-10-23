'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import { useChargedStore } from './ChargedParticleSimulation';
import {
  electronExitY, maxVoltageForExit, electricFieldMagnitude,
  protonMaxHeight, protonRange,
} from '../../lib/physics/charged-particle';

function Slider({ label, unit, value, min, max, step, onChange, format }: {
  label: string; unit: string; value: number;
  min: number; max: number; step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-amber-400">{format ? format(value) : value.toFixed(2)} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-semibold text-amber-400 mt-1">
        {value} <span className="text-[10px] text-slate-500">{unit}</span>
      </p>
    </div>
  );
}

export function ChargedParticleParameterPanel() {
  const s = useChargedStore();
  const paramsE = { U: s.U, d: s.d, l: s.l, v0: s.v0e };
  const paramsP = { U: s.U, d: s.d, v0: s.v0p, alpha: (s.alpha * Math.PI) / 180 };

  return (
    <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-semibold text-white">Paramètres</h3>

      <div className="flex gap-2">
        <button onClick={() => s.setMode('electron')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold ${s.mode === 'electron' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}>
          Électron
        </button>
        <button onClick={() => s.setMode('proton')}
          className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold ${s.mode === 'proton' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300'}`}>
          Proton
        </button>
      </div>

      <Slider label="Tension U" unit="V" value={s.U} min={10} max={1000} step={10} onChange={s.setU} />
      <Slider label="Distance d" unit="cm" value={s.d * 100} min={1} max={10} step={0.5}
        onChange={(v) => s.setD(v / 100)} format={(v) => v.toFixed(1)} />

      {s.mode === 'electron' ? (
        <>
          <Slider label="Longueur l" unit="cm" value={s.l * 100} min={1} max={10} step={0.5}
            onChange={(v) => s.setL(v / 100)} format={(v) => v.toFixed(1)} />
          <Slider label="Vitesse v0" unit="10^6 m/s" value={s.v0e / 1e6} min={1} max={30} step={0.5}
            onChange={(v) => s.setV0e(v * 1e6)} format={(v) => v.toFixed(1)} />
        </>
      ) : (
        <>
          <Slider label="Vitesse v0" unit="10^5 m/s" value={s.v0p / 1e5} min={1} max={20} step={0.5}
            onChange={(v) => s.setV0p(v * 1e5)} format={(v) => v.toFixed(1)} />
          <Slider label="Angle alpha" unit="deg" value={s.alpha} min={5} max={85} step={1} onChange={s.setAlpha} />
        </>
      )}

      <div className="flex gap-2">
        <button onClick={s.toggleRun}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
          {s.running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Lancer</>}
        </button>
        <button onClick={s.reset}
          className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200">
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Stat label="Champ E" value={electricFieldMagnitude({ U: s.U, d: s.d }).toExponential(2)} unit="V/m" />
        {s.mode === 'electron' && (
          <>
            <Stat label="Deflection" value={(electronExitY(paramsE) * 1000).toFixed(2)} unit="mm" />
            <Stat label="U max" value={maxVoltageForExit(paramsE).toFixed(0)} unit="V" />
          </>
        )}
        {s.mode === 'proton' && (
          <>
            <Stat label="Hauteur max" value={(protonMaxHeight(paramsP) * 100).toFixed(2)} unit="cm" />
            <Stat label="Portee" value={(protonRange(paramsP) * 100).toFixed(1)} unit="cm" />
          </>
        )}
      </div>
    </div>
  );
}