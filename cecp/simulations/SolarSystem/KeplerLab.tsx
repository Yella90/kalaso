'use client';

import { useMemo, useState } from 'react';
import {
  ResponsiveContainer, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Line, ComposedChart,
} from 'recharts';
import { Formula } from '@/cecp/components/lesson/Formula';
import {
  PLANETS, BODIES, UA, YEAR, G, body, orbitalPeriodGM, orbitalSpeed, orbitRadiusFromPeriod,
  gravityField, formatPeriod, formatDistance, sci,
} from '@/cecp/lib/physics/gravitation';

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');

/** Graphique log-log T = f(a) et tableau T^2/a^3 pour les planetes */
export function KeplerLab() {
  const rows = PLANETS.map((p) => {
    const a = p.orbitRadius! / UA;
    const T = p.realPeriod! / YEAR;
    return { name: p.name, color: p.color, a, T, ratio: (T * T) / (a * a * a) };
  });

  // Droite theorique T = a^(3/2) (en annees et UA)
  const line = Array.from({ length: 40 }, (_, i) => {
    const a = 0.3 * Math.pow(40 / 0.3, i / 39);
    return { a, T: Math.pow(a, 1.5) };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
        <h4 className="text-sm font-semibold text-slate-200 mb-1">Période T en fonction de la distance a</h4>
        <p className="text-xs text-slate-500 mb-3">Échelles logarithmiques : les 8 planètes sont alignées sur la droite T = a<sup>3/2</sup>.</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{ top: 10, right: 16, bottom: 20, left: 4 }}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis
                dataKey="a" type="number" scale="log" domain={[0.3, 40]} ticks={[0.5, 1, 2, 5, 10, 20, 40]}
                stroke="#64748b" fontSize={11}
                label={{ value: 'a (UA)', position: 'insideBottom', offset: -10, fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                dataKey="T" type="number" scale="log" domain={[0.15, 250]} ticks={[0.2, 0.5, 1, 2, 5, 10, 30, 100, 200]}
                stroke="#64748b" fontSize={11} width={44}
                label={{ value: 'T (ans)', angle: -90, position: 'insideLeft', fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid #334155', fontSize: 12 }}
                formatter={(v) => fr(Number(v), 3)}
              />
              <Line data={line} dataKey="T" stroke="#f59e0b" strokeDasharray="5 4" dot={false} isAnimationActive={false} name="Kepler" />
              <Scatter data={rows} dataKey="T" fill="#38bdf8" isAnimationActive={false} name="Planètes" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 overflow-x-auto">
        <h4 className="text-sm font-semibold text-slate-200 mb-1">3e loi de Kepler : T²/a³ = constante</h4>
        <p className="text-xs text-slate-500 mb-3">Avec T en années et a en unités astronomiques, le rapport vaut 1 pour toutes les planètes.</p>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-slate-500 text-left">
              <th className="py-1.5 pr-2 font-semibold">Planète</th>
              <th className="py-1.5 pr-2 font-semibold text-right">a (UA)</th>
              <th className="py-1.5 pr-2 font-semibold text-right">T (ans)</th>
              <th className="py-1.5 font-semibold text-right">T²/a³</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-800">
                <td className="py-1.5 pr-2 font-sans text-slate-200">
                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: r.color }} />{r.name}
                </td>
                <td className="py-1.5 pr-2 text-right text-slate-300">{fr(r.a, 3)}</td>
                <td className="py-1.5 pr-2 text-right text-slate-300">{fr(r.T, 3)}</td>
                <td className="py-1.5 text-right text-amber-400 font-semibold">{fr(r.ratio, 3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-xs text-slate-400">
          <Formula block>{`\\frac{T^2}{a^3} = \\frac{4\\pi^2}{G\\,M_S} \\approx ${sci(4 * Math.PI ** 2 / (G * body('soleil').mass!), 2).replace('·10^', ' \\cdot 10^{')}}\\ \\text{s}^2\\cdot\\text{m}^{-3}`}</Formula>
        </div>
      </div>
    </div>
  );
}

const CENTRAL = BODIES.filter((b) => b.mass && ['soleil', 'terre', 'lune', 'mars', 'jupiter', 'saturne'].includes(b.id));

/** Calculatrice : astre central + altitude (ou periode) -> grandeurs de l'orbite */
export function OrbitCalculator() {
  const [centerId, setCenterId] = useState('terre');
  const [mode, setMode] = useState<'altitude' | 'periode'>('altitude');
  const [altKm, setAltKm] = useState('400');
  const [periodH, setPeriodH] = useState('24');

  const c = body(centerId);
  const M = c.mass!;

  const result = useMemo(() => {
    let r: number;
    if (mode === 'altitude') {
      const h = parseFloat(altKm.replace(',', '.')) * 1000;
      if (!Number.isFinite(h) || h < 0) return null;
      r = c.radius + h;
    } else {
      const T = parseFloat(periodH.replace(',', '.')) * 3600;
      if (!Number.isFinite(T) || T <= 0) return null;
      r = orbitRadiusFromPeriod(M, T);
    }
    return {
      r,
      h: r - c.radius,
      T: orbitalPeriodGM(M, r),
      v: orbitalSpeed(M, r),
      g: gravityField(M, r),
    };
  }, [mode, altKm, periodH, c, M]);

  const field = 'w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-amber-500';

  return (
    <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="space-y-1">
          <span className="text-xs text-slate-400">Astre central</span>
          <select value={centerId} onChange={(e) => setCenterId(e.target.value)} className={field}>
            {CENTRAL.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs text-slate-400">Je connais</span>
          <select value={mode} onChange={(e) => setMode(e.target.value as 'altitude' | 'periode')} className={field}>
            <option value="altitude">l&apos;altitude h</option>
            <option value="periode">la période T</option>
          </select>
        </label>
        {mode === 'altitude' ? (
          <label className="space-y-1">
            <span className="text-xs text-slate-400">Altitude h (km)</span>
            <input inputMode="decimal" value={altKm} onChange={(e) => setAltKm(e.target.value)} className={field} />
          </label>
        ) : (
          <label className="space-y-1">
            <span className="text-xs text-slate-400">Période T (heures)</span>
            <input inputMode="decimal" value={periodH} onChange={(e) => setPeriodH(e.target.value)} className={field} />
          </label>
        )}
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              ['Rayon de l\'orbite', formatDistance(result.r)],
              ['Altitude', formatDistance(result.h)],
              ['Vitesse', `${fr(result.v / 1000)} km/s`],
              ['Période', formatPeriod(result.T)],
              ['Champ g à cette altitude', `${fr(result.g, 3)} m/s²`],
            ].map(([k, v]) => (
              <div key={k} className="p-3 rounded-md bg-slate-950/60 border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{k}</p>
                <p className="text-sm font-mono font-semibold text-amber-400 mt-0.5">{v}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Formules : <Formula>{'r = R + h,\\quad v = \\sqrt{GM/r},\\quad T = 2\\pi\\sqrt{r^3/(GM)},\\quad g = GM/r^2'}</Formula>
            {mode === 'periode' && <> et <Formula>{'r = \\sqrt[3]{GMT^2/(4\\pi^2)}'}</Formula></>}.
            {result.h < 0 && <span className="text-rose-400"> Attention : cette orbite passerait sous la surface !</span>}
          </p>
        </>
      ) : (
        <p className="text-sm text-slate-500">Entre une valeur positive.</p>
      )}
    </div>
  );
}

