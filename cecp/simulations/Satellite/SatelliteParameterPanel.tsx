'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import { useSatelliteStore } from './SatelliteSimulation';
import {
  linearSpeed,
  angularSpeed,
  orbitalPeriod,
  gravityAt,
  toKm,
  formatDuration,
} from '../../lib/physics/satellite';

function Stat({ label, value, unit }: { label: string; value: string | number; unit: string }) {
  return (
    <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm md:text-base font-mono font-semibold text-amber-400 mt-1">
        {value} <span className="text-[10px] text-slate-500">{unit}</span>
      </p>
    </div>
  );
}

const WARPS = [100, 500, 2000, 5000];

export function SatelliteParameterPanel() {
  const { h, running, setH, toggleRun, reset, timeWarp, setTimeWarp, simTime } = useSatelliteStore();
  const params = { h };

  const v = linearSpeed(params);
  const T = orbitalPeriod(params);
  const g = gravityAt(params);

  return (
    <div className="space-y-5 p-5 rounded-lg bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-semibold text-white">Paramètres du satellite</h3>

      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Altitude h</span>
          <span className="font-mono text-amber-400">
            {toKm(h).toFixed(0)} km
          </span>
        </div>
        <input
          type="range"
          min={200}
          max={50000}
          step={100}
          value={h / 1000}
          onChange={(e) => setH(parseFloat(e.target.value) * 1000)}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggleRun}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-900 font-semibold transition-colors"
        >
          {running ? (
            <>
              <Pause size={16} /> Pause
            </>
          ) : (
            <>
              <Play size={16} /> Lancer
            </>
          )}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Acceleration du temps */}
      <div className="space-y-1">
        <p className="text-sm text-slate-300">Accélération du temps</p>
        <div className="flex gap-1">
          {WARPS.map((w) => (
            <button
              key={w}
              onClick={() => setTimeWarp(w)}
              aria-pressed={timeWarp === w}
              className={`flex-1 px-2 py-1.5 rounded text-xs font-mono font-semibold transition-colors ${
                timeWarp === w ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              ×{w}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-500">
          1 s a l&apos;ecran = {formatDuration(timeWarp)} dans la realite
        </p>
      </div>

      {/* Chronometre : permet de verifier la periode calculee */}
      <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Temps réel simule</p>
          <p className="text-sm font-mono font-semibold text-sky-400">{formatDuration(simTime)}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Tours effectues</p>
          <p className="text-sm font-mono font-semibold text-sky-400">{(simTime / T).toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Stat label="Vitesse" value={(v / 1000).toFixed(2)} unit="km/s" />
        <Stat label="Periode" value={formatDuration(T)} unit="" />
        <Stat label="Gravité g" value={g.toFixed(3)} unit="m/s2" />
        <Stat label="Omega" value={angularSpeed(params).toExponential(2)} unit="rad/s" />
      </div>
    </div>
  );
}