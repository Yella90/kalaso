'use client';

import { Play, Pause, RotateCcw } from 'lucide-react';
import { useKinematicsStore } from './KinematicsSimulation';
import {
  mcuLinearSpeed,
  mcuPeriod,
  mcuCentripetalAcceleration,
} from '../../lib/physics/kinematics';

function Slider({
  label, unit, value, min, max, step, onChange,
}: {
  label: string; unit: string; value: number;
  min: number; max: number; step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="font-mono text-amber-400">
          {value.toFixed(2)} {unit}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
      />
    </div>
  );
}

function TabButton({
  active, onClick, children,
}: {
  active: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold transition-colors ${
        active
          ? 'bg-amber-500 text-slate-900'
          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
      }`}
    >
      {children}
    </button>
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

export function KinematicsParameterPanel() {
  const s = useKinematicsStore();

  const vMCU = mcuLinearSpeed({ R: s.R, omega: s.omega });
  const TMCU = mcuPeriod({ R: s.R, omega: s.omega });
  const aMCU = mcuCentripetalAcceleration({ R: s.R, omega: s.omega });

  return (
    <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
      <h3 className="text-lg font-semibold text-white">Paramètres</h3>

      <div className="flex gap-2">
        <TabButton active={s.motionType === 'MRU'} onClick={() => s.setMotionType('MRU')}>
          MRU
        </TabButton>
        <TabButton active={s.motionType === 'MRUV'} onClick={() => s.setMotionType('MRUV')}>
          MRUV
        </TabButton>
        <TabButton active={s.motionType === 'MCU'} onClick={() => s.setMotionType('MCU')}>
          MCU
        </TabButton>
      </div>

      {s.motionType === 'MRU' && (
        <Slider label="Vitesse v" unit="m/s" value={s.v} min={1} max={15} step={0.5} onChange={s.setV} />
      )}

      {s.motionType === 'MRUV' && (
        <>
          <Slider label="Vitesse initiale v0" unit="m/s" value={s.v0} min={-5} max={15} step={0.5} onChange={s.setV0} />
          <Slider label="Accélération a" unit="m/s²" value={s.a} min={-5} max={5} step={0.1} onChange={s.setA} />
        </>
      )}

      {s.motionType === 'MCU' && (
        <>
          <Slider label="Rayon R" unit="m" value={s.R} min={1} max={10} step={0.5} onChange={s.setR} />
          <Slider label="Vitesse angulaire omega" unit="rad/s" value={s.omega} min={0.5} max={5} step={0.1} onChange={s.setOmega} />
        </>
      )}

      <div className="flex gap-2 pt-2">
        <button
          onClick={s.toggleRun}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold transition-colors"
        >
          {s.running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Lancer</>}
        </button>
        <button
          onClick={s.reset}
          className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {s.motionType === 'MCU' && (
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Stat label="Vitesse v" value={vMCU.toFixed(2)} unit="m/s" />
          <Stat label="Période T" value={TMCU.toFixed(2)} unit="s" />
          <Stat label="Fréquence f" value={(1 / TMCU).toFixed(2)} unit="Hz" />
          <Stat label="Accel. a_N" value={aMCU.toFixed(2)} unit="m/s²" />
        </div>
      )}
    </div>
  );
}