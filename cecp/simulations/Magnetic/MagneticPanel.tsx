'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import {
  PARTICLES, ISOTOPE_PAIRS, cyclotronRadius, cyclotronPeriod, lorentzForce, spectroRadius,
  speedAfterVoltage, U_MASS, E,
} from '@/cecp/lib/physics/magnetic';
import { useMagneticStore } from './MagneticSimulation';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');
function sci(x: number, d = 2) {
  const e = Math.floor(Math.log10(Math.abs(x)));
  return `${fr(x / 10 ** e, d)}·10${superscript(e)}`;
}
function superscript(n: number) {
  const map: Record<string, string> = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  return String(n).split('').map((c) => map[c] ?? c).join('');
}

function Slider({ label, value, display, min, max, step, onChange }: {
  label: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-amber-400">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-semibold text-amber-400 mt-0.5">{value}</p>
    </div>
  );
}

export function MagneticPanel() {
  const s = useMagneticStore();
  const p = PARTICLES.find((x) => x.id === s.particleId)!;
  const pair = ISOTOPE_PAIRS.find((x) => x.id === s.pairId)!;
  const isElectron = p.id === 'electron';

  return (
    <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
      <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800">
        {(['cercle', 'spectro'] as const).map((m) => (
          <button
            key={m}
            onClick={() => s.setMode(m)}
            className={`px-2 py-2 rounded-md text-xs font-semibold ${s.mode === m ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
          >
            {m === 'cercle' ? 'Trajectoire' : 'Spectrographe'}
          </button>
        ))}
      </div>

      {s.mode === 'cercle' ? (
        <>
          <div className="space-y-1">
            <p className="text-xs text-slate-400">Particule</p>
            <div className="grid grid-cols-2 gap-1">
              {PARTICLES.map((x) => (
                <button
                  key={x.id}
                  onClick={() => s.setParticle(x.id)}
                  className={`px-2 py-1.5 rounded-md text-xs text-left ${s.particleId === x.id ? 'bg-slate-700 text-white ring-1 ring-amber-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: x.color }} />{x.name}
                </button>
              ))}
            </div>
          </div>
          <Slider
            label="Vitesse v" value={s.v / (isElectron ? 1e6 : 1e5)}
            display={`${fr(s.v / (isElectron ? 1e6 : 1e5), 1)}·10${isElectron ? '⁶' : '⁵'} m/s`}
            min={1} max={isElectron ? 30 : 50} step={0.5}
            onChange={(x) => s.setV(x * (isElectron ? 1e6 : 1e5))}
          />
          <Slider
            label="Champ B" value={s.B * 1000} display={`${fr(s.B * 1000, isElectron ? 2 : 0)} mT`}
            min={isElectron ? 0.2 : 10} max={isElectron ? 5 : 500} step={isElectron ? 0.05 : 5}
            onChange={(x) => s.setB(x / 1000)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Rayon R" value={`${fr(cyclotronRadius(p.m, p.q, s.v, s.B) * 100, 2)} cm`} />
            <Stat label="Période T" value={`${sci(cyclotronPeriod(p.m, p.q, s.B))} s`} />
            <Stat label="Force F" value={`${sci(lorentzForce(p.q, s.v, s.B))} N`} />
            <Stat label="Sens de rotation" value={p.q > 0 ? 'horaire' : 'trigonométrique'} />
          </div>
          <p className="text-[11px] text-slate-500">
            L&apos;animation est ralentie : un tour dure en réalité {sci(cyclotronPeriod(p.m, p.q, s.B))} s.
          </p>
        </>
      ) : (
        <>
          <div className="space-y-1">
            <p className="text-xs text-slate-400">Isotopes</p>
            <select
              value={s.pairId} onChange={(e) => s.setPair(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm text-white"
            >
              {ISOTOPE_PAIRS.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
          </div>
          <Slider label="Tension U" value={s.U} display={`${s.U} V`} min={100} max={5000} step={100} onChange={s.setU} />
          <Slider label="Champ B" value={s.B * 1000} display={`${fr(s.B * 1000, 0)} mT`} min={50} max={1000} step={10} onChange={(x) => s.setB(x / 1000)} />
          <div className="grid grid-cols-2 gap-2">
            <Stat label={`v (A = ${pair.A1})`} value={`${sci(speedAfterVoltage(pair.A1 * U_MASS, E, s.U))} m/s`} />
            <Stat label={`v (A = ${pair.A2})`} value={`${sci(speedAfterVoltage(pair.A2 * U_MASS, E, s.U))} m/s`} />
            <Stat label={`R (A = ${pair.A1})`} value={`${fr(spectroRadius(pair.A1, 1, s.U, s.B) * 100)} cm`} />
            <Stat label={`R (A = ${pair.A2})`} value={`${fr(spectroRadius(pair.A2, 1, s.U, s.B) * 100)} cm`} />
          </div>
          <Stat
            label="Distance entre les deux impacts"
            value={`${fr(2 * (spectroRadius(pair.A2, 1, s.U, s.B) - spectroRadius(pair.A1, 1, s.U, s.B)) * 100)} cm`}
          />
        </>
      )}

      <div className="flex gap-2">
        <button onClick={s.toggleRun} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">
          {s.running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Reprendre</>}
        </button>
        <button onClick={s.reset} aria-label="Relancer" title="Relancer" className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}
