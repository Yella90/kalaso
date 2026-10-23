'use client';

import { Play, Pause, RotateCcw, Orbit, Sun, ArrowLeft } from 'lucide-react';
import { Formula } from '@/cecp/components/lesson/Formula';
import {
  PLANETS, SYSTEMS_WITH_MOONS, DAY, YEAR, body, satellitesOf, orbitFacts, surfaceFacts,
  formatPeriod, formatDistance, sci, type Body,
} from '@/cecp/lib/physics/gravitation';
import { useSolarStore, SOLAR_SPEEDS, MOON_SPEEDS } from './SolarSystemSimulation';

const KIND_LABEL: Record<Body['kind'], string> = {
  etoile: 'Étoile',
  planete: 'Planète',
  lune: 'Satellite naturel',
  artificiel: 'Satellite artificiel',
};

const fr = (x: number, d = 2) => x.toFixed(d).replace('.', ',');
/** LaTeX : 5,97 \cdot 10^{24} */
const tex = (x: number, d = 2) => sci(x, d).replace('·10^', ' \\cdot 10^{') + '}';

function elapsedLabel(t: number, solar: boolean): string {
  if (solar) {
    const days = t / DAY;
    return `${Math.floor(days).toLocaleString('fr-FR')} jours (${fr(t / YEAR, 2)} ans)`;
  }
  if (t < 2 * DAY) return `${fr(t / 3600, 1)} h`;
  return `${fr(t / DAY, 1)} jours`;
}

export function SolarSystemControls() {
  const s = useSolarStore();
  const solar = s.mode === 'solaire';
  const speeds = solar ? SOLAR_SPEEDS : MOON_SPEEDS;
  const list = solar ? PLANETS : satellitesOf(s.center);

  return (
    <div className="space-y-4 p-5 rounded-lg bg-slate-900 border border-slate-800">
      <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-slate-950 border border-slate-800">
        <button
          onClick={() => s.setMode('solaire')}
          className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-xs font-semibold ${solar ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
        >
          <Sun size={14} /> Système solaire
        </button>
        <button
          onClick={() => s.setMode('satellites')}
          className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-md text-xs font-semibold ${!solar ? 'bg-amber-500 text-slate-900' : 'text-slate-300 hover:bg-slate-800'}`}
        >
          <Orbit size={14} /> Satellites
        </button>
      </div>

      {!solar && (
        <div className="space-y-1">
          <p className="text-xs text-slate-400">Planète centrale</p>
          <div className="flex flex-wrap gap-1">
            {SYSTEMS_WITH_MOONS.map((p) => (
              <button
                key={p.id}
                onClick={() => s.showSatellitesOf(p.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold ${s.center === p.id ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-1">
        <p className="text-xs text-slate-400">Vitesse du temps</p>
        <div className="flex flex-wrap gap-1">
          {speeds.map((sp) => (
            <button
              key={sp.value}
              onClick={() => s.setTimeScale(sp.value)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono ${s.timeScale === sp.value ? 'bg-amber-500 text-slate-900 font-semibold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              {sp.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={s.toggleRun}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold"
        >
          {s.running ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Reprendre</>}
        </button>
        <button
          onClick={s.reset}
          title="Remettre le temps à zéro"
          aria-label="Remettre le temps à zéro"
          className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800">
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Temps écoulé (réel simulé)</p>
        <p className="text-sm font-mono font-semibold text-sky-400">{elapsedLabel(s.elapsed, solar)}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-slate-400">Clique sur un astre (ou choisis-le ici)</p>
        <div className="flex flex-wrap gap-1">
          {(solar ? [body('soleil'), ...list] : [body(s.center), ...list]).map((b) => (
            <button
              key={b.id}
              onClick={() => s.select(b.id)}
              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ${s.selected === b.id ? 'bg-slate-700 text-white ring-1 ring-amber-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: b.color }} />
              {b.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-mono font-semibold text-amber-400 mt-0.5">{value}</p>
      {hint && <p className="text-[10px] text-slate-500 mt-0.5">{hint}</p>}
    </div>
  );
}

/** Fiche de l'astre selectionne, avec les calculs detailles */
export function BodyInfo() {
  const selected = useSolarStore((s) => s.selected);
  const showSatellitesOf = useSolarStore((s) => s.showSatellitesOf);
  const setMode = useSolarStore((s) => s.setMode);
  const mode = useSolarStore((s) => s.mode);
  if (!selected) return null;
  const b = body(selected);
  const orbit = orbitFacts(b);
  const surface = surfaceFacts(b);
  const parent = b.parent ? body(b.parent) : null;
  const hasMoons = b.kind === 'planete' && satellitesOf(b.id).length > 0;

  return (
    <div className="p-5 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full shrink-0" style={{ background: `radial-gradient(circle at 30% 30%, #fff8, ${b.color})` }} />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500">
              {KIND_LABEL[b.kind]}{parent ? ` · autour de ${parent.id === 'soleil' ? 'du Soleil' : parent.name}` : ''}
            </p>
            <h3 className="text-xl font-bold text-white">{b.name}</h3>
          </div>
        </div>
        {hasMoons && mode === 'solaire' && (
          <button
            onClick={() => showSatellitesOf(b.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-sky-500/15 text-sky-300 border border-sky-500/40 text-xs font-semibold hover:bg-sky-500/25"
          >
            <Orbit size={14} /> Voir ses satellites
          </button>
        )}
        {mode === 'satellites' && (
          <button
            onClick={() => setMode('solaire')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
          >
            <ArrowLeft size={14} /> Système solaire
          </button>
        )}
      </header>

      <p className="text-sm text-slate-300">{b.note}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {b.mass && <Fact label="Masse" value={`${sci(b.mass)} kg`} />}
        <Fact label="Rayon" value={`${Math.round(b.radius / 1000).toLocaleString('fr-FR')} km`} />
        {surface && <Fact label="Pesanteur en surface" value={`${fr(surface.g)} m/s²`} hint={`Ton poids ×${fr(surface.g / 9.81)}`} />}
        {surface && <Fact label="Vitesse de libération" value={`${fr(surface.escape / 1000, 1)} km/s`} />}
        {orbit && parent && (
          <>
            <Fact label={parent.id === 'soleil' ? 'Distance au Soleil' : 'Rayon de l\'orbite'} value={formatDistance(b.orbitRadius!)} />
            {parent.id !== 'soleil' && <Fact label="Altitude" value={formatDistance(orbit.altitude)} />}
            <Fact label="Vitesse orbitale" value={`${fr(orbit.speed / 1000)} km/s`} hint={`${Math.round(orbit.speed * 3.6).toLocaleString('fr-FR')} km/h`} />
            <Fact label="Période (calcul Kepler)" value={formatPeriod(orbit.keplerPeriod)} />
            {orbit.realPeriod && <Fact label="Période mesurée" value={formatPeriod(orbit.realPeriod)} hint={`Écart : ${fr(Math.abs(orbit.error! * 100), 2)} %`} />}
          </>
        )}
      </div>

      {orbit && parent && (
        <details className="group rounded-md border border-slate-800 bg-slate-950/40" open>
          <summary className="cursor-pointer px-4 py-2.5 text-sm font-semibold text-slate-200">
            Le calcul détaillé
          </summary>
          <div className="px-4 pb-4 space-y-2 text-sm text-slate-300">
            <p>
              Le mouvement est circulaire uniforme : la force de gravitation de {parent.id === 'soleil' ? 'du Soleil' : `de ${parent.name}`} joue
              le rôle de force centripète.
            </p>
            <Formula block>{`G\\frac{M\\,m}{r^2} = m\\frac{v^2}{r} \\;\\Rightarrow\\; v = \\sqrt{\\frac{G M}{r}} = \\sqrt{\\frac{6{,}67 \\cdot 10^{-11} \\times ${tex(parent.mass!)}}{${tex(b.orbitRadius!)}}} \\approx ${fr(orbit.speed / 1000)}\\ \\text{km/s}`}</Formula>
            <Formula block>{`T = \\frac{2\\pi r}{v} = 2\\pi\\sqrt{\\frac{r^3}{G M}} \\approx ${tex(orbit.keplerPeriod, 3)}\\ \\text{s} \\approx \\text{${formatPeriod(orbit.keplerPeriod)}}`}</Formula>
            {orbit.realPeriod && (
              <p className="text-xs text-slate-400">
                La valeur mesurée par les astronomes est {formatPeriod(orbit.realPeriod)} : la loi de la gravitation de Newton
                prédit le mouvement à {fr(Math.abs(orbit.error! * 100), 2)} % près.
              </p>
            )}
          </div>
        </details>
      )}
    </div>
  );
}
