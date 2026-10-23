'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer, ComposedChart, Line, Scatter, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';
import { useProjectileStore } from './ProjectileSimulation';
import {
  range, maxHeight, flightTime, timeToApex, deg2rad, sampleTimeSeries,
  type ProjectileParams,
} from '../../lib/physics/projectile';

function Info({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="p-3 rounded-md bg-slate-800/60 border border-slate-700">
      <p className="text-xs text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-mono font-semibold text-amber-400">
        {value.toFixed(2)} <span className="text-xs text-slate-500">{unit}</span>
      </p>
    </div>
  );
}

const AXIS = { stroke: '#64748b', fontSize: 11 };
const TOOLTIP_STYLE = {
  contentStyle: { background: '#0f172a', border: '1px solid #334155', fontSize: 12 },
  labelStyle: { color: '#94a3b8' },
};

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
      <h4 className="text-sm font-semibold text-slate-200 mb-3">{title}</h4>
      <div className="h-56">{children}</div>
    </div>
  );
}

const round = (v: number) => Math.round(v * 1000) / 1000;

export function GraphPanel() {
  const { v0, alphaDeg, g, h0, history } = useProjectileStore();

  const params: ProjectileParams = useMemo(
    () => ({ v0, alpha: deg2rad(alphaDeg), g, h0 }),
    [v0, alphaDeg, g, h0],
  );

  const R = range(params);
  const H = maxHeight(params);
  const T = flightTime(params);
  const tApex = timeToApex(params);

  // Courbes theoriques (60 points suffisent pour un trace lisse)
  const theory = useMemo(
    () =>
      sampleTimeSeries(params, 60).map((s) => ({
        t: round(s.t), x: round(s.x), y: round(s.y), vx: round(s.vx), vy: round(s.vy),
      })),
    [params],
  );

  // Points mesures pendant la simulation
  const measured = useMemo(
    () => history.map((s) => ({ t: round(s.t), x: round(s.x), y: round(s.y), vy: round(s.vy) })),
    [history],
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Info label="Portee" value={R} unit="m" />
        <Info label="Fleche" value={H} unit="m" />
        <Info label="Temps de vol" value={T} unit="s" />
        <Info label="Instant du sommet" value={Math.max(tApex, 0)} unit="s" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Trajectoire y = f(x)">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{ top: 5, right: 10, bottom: 15, left: 0 }}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis
                dataKey="x" type="number" domain={[0, 'auto']} {...AXIS}
                label={{ value: 'x (m)', position: 'insideBottom', offset: -8, fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis dataKey="y" type="number" domain={[0, 'auto']} {...AXIS} width={40} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line data={theory} dataKey="y" name="Theorie" stroke="#d4a017"
                strokeDasharray="5 4" dot={false} isAnimationActive={false} />
              <Scatter data={measured} dataKey="y" name="Mesures" fill="#22d3ee"
                isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Vitesses vx(t) et vy(t)">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={theory} margin={{ top: 5, right: 10, bottom: 15, left: 0 }}>
              <CartesianGrid stroke="#1e293b" />
              <XAxis
                dataKey="t" type="number" domain={[0, 'auto']} {...AXIS}
                label={{ value: 't (s)', position: 'insideBottom', offset: -8, fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis {...AXIS} width={40} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceLine y={0} stroke="#475569" />
              {tApex > 0 && (
                <ReferenceLine x={round(tApex)} stroke="#f472b6" strokeDasharray="3 3"
                  label={{ value: 'sommet', fill: '#f472b6', fontSize: 10, position: 'top' }} />
              )}
              <Line dataKey="vx" name="vx (m/s)" stroke="#a78bfa" dot={false} isAnimationActive={false} />
              <Line dataKey="vy" name="vy (m/s)" stroke="#22d3ee" dot={false} isAnimationActive={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <p className="text-xs text-slate-500">
        Points enregistres : <span className="text-amber-400 font-mono">{history.length}</span>
        {' '}— clique sur Lancer pour voir les mesures se superposer a la courbe theorique.
        vx reste constante, vy decroit lineairement et s&apos;annule au sommet.
      </p>
    </div>
  );
}
