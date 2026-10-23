'use client';

import { useReducer, useRef, useState } from 'react';
import { useAnimationFrame } from '@/cecp/components/sim/useAnimationFrame';
import { wavelengthToCss } from '@/cecp/lib/physics/light';
import {
  METALS, H, EV, photonEnergy, toEV, frequency, thresholdWavelength, thresholdFrequency,
  maxKineticEnergy, maxElectronSpeed, emits,
} from '@/cecp/lib/physics/quantum';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');

interface Photon { x: number; y: number; id: number }
interface Electron { x: number; y: number; vx: number; vy: number; id: number }

const PLATE_X = 430;
const LAMP = { x: 70, y: 150 };

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="p-2.5 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className={`text-sm font-mono font-semibold mt-0.5 ${tone ?? 'text-amber-400'}`}>{value}</p>
    </div>
  );
}

/** Graphique Ec,max = h.nu - W0 pour tous les metaux */
function EinsteinGraph({ metalId, lambdaNm }: { metalId: string; lambdaNm: number }) {
  const Wg = 360, Hg = 230, pl = 40, pb = 30, pt = 12, pr = 12;
  const nuMax = 20; // en 10^14 Hz
  const ecMax = 6;  // eV
  const X = (nu: number) => pl + (nu / nuMax) * (Wg - pl - pr);
  const Y = (ec: number) => Hg - pb - (ec / ecMax) * (Hg - pb - pt);
  const nu = frequency(lambdaNm * 1e-9) / 1e14;
  const metal = METALS.find((m) => m.id === metalId)!;
  const ec = toEV(maxKineticEnergy(lambdaNm * 1e-9, metal.W0));

  return (
    <svg viewBox={`0 0 ${Wg} ${Hg}`} className="w-full h-auto" role="img" aria-label="Énergie cinétique maximale en fonction de la fréquence">
      {[0, 5, 10, 15, 20].map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={pt} x2={X(v)} y2={Hg - pb} stroke="#1e293b" />
          <text x={X(v)} y={Hg - pb + 14} fill="#64748b" fontSize={10} textAnchor="middle">{v}</text>
        </g>
      ))}
      {[0, 2, 4, 6].map((v) => (
        <g key={v}>
          <line x1={pl} y1={Y(v)} x2={Wg - pr} y2={Y(v)} stroke="#1e293b" />
          <text x={pl - 6} y={Y(v) + 3} fill="#64748b" fontSize={10} textAnchor="end">{v}</text>
        </g>
      ))}
      <text x={Wg - pr} y={Hg - 4} fill="#94a3b8" fontSize={10} textAnchor="end">ν (10¹⁴ Hz)</text>
      <text x={pl + 4} y={pt + 10} fill="#94a3b8" fontSize={10}>Ec max (eV)</text>
      {METALS.map((m) => {
        const nu0 = thresholdFrequency(m.W0) / 1e14;
        const ecEnd = (H * nuMax * 1e14) / EV - m.W0;
        const active = m.id === metalId;
        return (
          <g key={m.id} opacity={active ? 1 : 0.3}>
            <line x1={X(nu0)} y1={Y(0)} x2={X(nuMax)} y2={Y(Math.min(ecEnd, ecMax * 1.2))} stroke={active ? '#fbbf24' : '#94a3b8'} strokeWidth={active ? 2.5 : 1.2} />
            {active && <text x={X(nu0)} y={Y(0) - 6} fill="#fbbf24" fontSize={10} textAnchor="middle">ν₀</text>}
          </g>
        );
      })}
      {nu <= nuMax && (
        <circle cx={X(nu)} cy={Y(Math.min(ec, ecMax))} r={5} fill={ec > 0 ? '#22d3ee' : '#ef4444'} stroke="#0f172a" strokeWidth={1.5} />
      )}
    </svg>
  );
}

export function PhotoelectricSimulation() {
  const [lambdaNm, setLambdaNm] = useState(450);
  const [intensity, setIntensity] = useState(5);
  const [metalId, setMetalId] = useState('cs');
  const photons = useRef<Photon[]>([]);
  const electrons = useRef<Electron[]>([]);
  const spawn = useRef(0);
  const nextId = useRef(0);
  const emitted = useRef<number[]>([]);
  const clock = useRef(0);
  const [, force] = useReducer((n: number) => n + 1, 0);

  const metal = METALS.find((m) => m.id === metalId)!;
  const lambda = lambdaNm * 1e-9;
  const ok = emits(lambda, metal.W0);
  const vmax = maxElectronSpeed(lambda, metal.W0);
  const color = wavelengthToCss(lambdaNm);
  const isUV = lambdaNm < 380;

  useAnimationFrame((dt) => {
    clock.current += dt;
    // Emission de photons : le nombre depend de l'intensite, pas leur energie
    spawn.current += dt * intensity * 6;
    while (spawn.current >= 1) {
      spawn.current -= 1;
      photons.current.push({ x: LAMP.x + 22, y: LAMP.y + (Math.random() - 0.5) * 60, id: nextId.current++ });
    }
    const speedPh = 420;
    const nextPhotons: Photon[] = [];
    for (const p of photons.current) {
      p.x += speedPh * dt;
      if (p.x >= PLATE_X - 6) {
        if (ok) {
          // electron arrache avec une energie cinetique au plus egale a Ec,max
          const v = (0.4 + 0.6 * Math.random()) * (60 + Math.min(1, vmax / 1.2e6) * 260);
          const ang = (Math.random() - 0.5) * 1.1;
          electrons.current.push({ x: PLATE_X + 6, y: p.y, vx: v * Math.cos(ang), vy: v * Math.sin(ang), id: nextId.current++ });
          emitted.current.push(clock.current);
        }
      } else nextPhotons.push(p);
    }
    photons.current = nextPhotons;
    electrons.current = electrons.current.filter((e) => {
      e.x += e.vx * dt; e.y += e.vy * dt;
      return e.x < 790 && e.y > 0 && e.y < 300;
    });
    emitted.current = emitted.current.filter((t) => clock.current - t < 1);
    force();
  }, true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
      <div className="lg:col-span-2 space-y-3">
        <div className="rounded-lg bg-slate-950 border border-slate-800 overflow-hidden">
          <svg viewBox="0 0 800 300" className="w-full h-auto" role="img" aria-label="Effet photoélectrique">
            {/* Ampoule sous vide */}
            <rect x={400} y={20} width={380} height={260} rx={30} fill="none" stroke="#334155" strokeDasharray="6 5" />
            <text x={590} y={292} fill="#475569" fontSize={11} textAnchor="middle">ampoule sous vide</text>
            {/* Lampe */}
            <circle cx={LAMP.x} cy={LAMP.y} r={24} fill={isUV ? '#4c1d95' : color} opacity={0.9} />
            <circle cx={LAMP.x} cy={LAMP.y} r={34} fill={isUV ? '#7c3aed' : color} opacity={0.15} />
            <text x={LAMP.x} y={LAMP.y + 56} fill="#94a3b8" fontSize={12} textAnchor="middle">{isUV ? `UV ${lambdaNm} nm` : `${lambdaNm} nm`}</text>
            {/* Photons */}
            {photons.current.map((p) => (
              <path
                key={p.id}
                d={`M ${p.x - 12} ${p.y} q 3 -5 6 0 t 6 0`}
                stroke={isUV ? '#a78bfa' : color}
                strokeWidth={2}
                fill="none"
              />
            ))}
            {/* Cathode (metal) */}
            <rect x={PLATE_X - 6} y={60} width={12} height={180} fill={metal.color} />
            <text x={PLATE_X} y={52} fill="#e2e8f0" fontSize={12} textAnchor="middle">{metal.name}</text>
            {/* Anode */}
            <rect x={740} y={60} width={8} height={180} fill="#475569" />
            <text x={744} y={52} fill="#94a3b8" fontSize={12} textAnchor="middle">anode</text>
            {/* Electrons */}
            {electrons.current.map((e) => (
              <g key={e.id}>
                <circle cx={e.x} cy={e.y} r={4} fill="#22d3ee" />
                <text x={e.x} y={e.y + 3} fill="#0f172a" fontSize={7} textAnchor="middle" fontWeight={700}>−</text>
              </g>
            ))}
            {!ok && (
              <text x={PLATE_X + 160} y={155} fill="#f87171" fontSize={14} textAnchor="middle" fontWeight={600}>
                Aucun électron émis : λ &gt; λ₀
              </text>
            )}
            <text x={16} y={24} fill="#94a3b8" fontSize={12} fontFamily="monospace">
              {`électrons émis : ~${emitted.current.length} /s (affichage)`}
            </text>
          </svg>
        </div>
        <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
          <p className="text-sm font-semibold text-slate-200 mb-1">Relation d&apos;Einstein : Ec,max = hν − W₀</p>
          <p className="text-xs text-slate-500 mb-2">Une droite par métal, toutes de même pente h (constante de Planck). Le point montre ta lumière.</p>
          <EinsteinGraph metalId={metalId} lambdaNm={lambdaNm} />
        </div>
      </div>

      <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
        <h3 className="text-lg font-semibold text-white">Paramètres</h3>
        <label className="block space-y-1">
          <span className="flex justify-between text-sm">
            <span className="text-slate-300">Longueur d&apos;onde λ</span>
            <span className="font-mono" style={{ color: isUV ? '#a78bfa' : color }}>{lambdaNm} nm{isUV ? ' (UV)' : ''}</span>
          </span>
          <input type="range" min={150} max={800} step={5} value={lambdaNm}
            onChange={(e) => setLambdaNm(parseFloat(e.target.value))}
            className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-amber-500"
            style={{ background: 'linear-gradient(to right, #4c1d95 0%, #7c3aed 35%, #6366f1 38%, #22d3ee 48%, #22c55e 57%, #facc15 66%, #f97316 74%, #ef4444 85%, #7f1d1d 100%)' }} />
        </label>
        <label className="block space-y-1">
          <span className="flex justify-between text-sm">
            <span className="text-slate-300">Intensité lumineuse</span>
            <span className="font-mono text-amber-400">{intensity}</span>
          </span>
          <input type="range" min={1} max={10} step={1} value={intensity}
            onChange={(e) => setIntensity(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
        </label>
        <div className="space-y-1">
          <p className="text-xs text-slate-400">Métal de la cathode</p>
          <div className="grid grid-cols-3 gap-1">
            {METALS.map((m) => (
              <button key={m.id} onClick={() => setMetalId(m.id)}
                className={`px-1 py-1.5 rounded-md text-xs ${metalId === m.id ? 'bg-amber-500 text-slate-900 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                {m.name}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Énergie du photon" value={`${fr(toEV(photonEnergy(lambda)))} eV`} />
          <Stat label="Travail d'extraction W₀" value={`${fr(metal.W0)} eV`} />
          <Stat label="Seuil λ₀ = hc/W₀" value={`${fr(thresholdWavelength(metal.W0) * 1e9, 0)} nm`} />
          <Stat label="Ec max" value={ok ? `${fr(toEV(maxKineticEnergy(lambda, metal.W0)))} eV` : '0 (pas d\'émission)'} tone={ok ? undefined : 'text-rose-400'} />
          <Stat label="Vitesse max" value={ok ? `${fr(vmax / 1000, 0)} km/s` : '—'} />
          <Stat label="Potentiel d'arrêt U₀" value={ok ? `${fr(toEV(maxKineticEnergy(lambda, metal.W0)))} V` : '—'} />
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Augmente l&apos;intensité sous le seuil : toujours aucun électron ! C&apos;est l&apos;énergie de <em>chaque</em> photon
          (donc sa fréquence) qui compte, pas la quantité de lumière. Ce résultat, expliqué par Einstein en 1905, montre que la lumière est
          faite de grains d&apos;énergie : les photons.
        </p>
      </div>
    </div>
  );
}
