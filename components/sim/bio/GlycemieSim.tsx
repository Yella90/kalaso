'use client';

import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { fmt, Readout } from '../Slider';

type Profile = 'normal' | 'type1' | 'type2';
type Meal = 'matin' | 'midi' | 'soir';

const DT = 1 / 12; // pas de 5 minutes, en heures
const MEALS: Record<Meal, { hour: number; amount: number }> = {
  matin: { hour: 7, amount: 0.7 },
  midi: { hour: 13, amount: 1.1 },
  soir: { hour: 20, amount: 0.9 },
};
const SENSITIVITY: Record<Profile, number> = { normal: 1, type1: 0.03, type2: 0.35 };

const W = 340;
const H = 180;
const G_MAX = 3;
const toX = (h: number) => 30 + (h / 24) * (W - 40);
const toY = (g: number) => 10 + (1 - g / G_MAX) * (H - 30);

/** Absorption intestinale d’un repas : profil triangulaire sur 2 h, maximum à 40 min. */
function absorption(dtHours: number): number {
  if (dtHours < 0 || dtHours > 2) return 0;
  return dtHours < 2 / 3 ? dtHours / (2 / 3) : (2 - dtHours) / (4 / 3);
}

function simulate(profile: Profile, meals: Record<Meal, boolean>, effort: boolean, injections: boolean) {
  const g: number[] = [];
  const insulin: number[] = [];
  const glucagon: number[] = [];
  let G = 0.9;
  for (let k = 0; k <= 24 / DT; k++) {
    const h = k * DT;
    let input = 0;
    let injected = 0;
    for (const m of Object.keys(MEALS) as Meal[]) {
      if (!meals[m]) continue;
      input += MEALS[m].amount * absorption(h - MEALS[m].hour);
      if (injections && profile === 'type1' && h >= MEALS[m].hour && h < MEALS[m].hour + 2.5) injected += 0.45;
    }
    const ins = SENSITIVITY[profile] * Math.max(0, G - 0.9) + injected;
    const glu = Math.max(0, 0.9 - G);
    const use = 0.05 + (effort && h >= 17 && h < 18 ? 0.3 : 0);
    const renal = G > 1.8 ? 0.6 * (G - 1.8) : 0;
    G += (input - use - 1.2 * ins * Math.min(G, 1.5) + 2 * glu - renal) * DT;
    G = Math.max(0.4, G);
    g.push(G);
    insulin.push(ins);
    glucagon.push(glu);
  }
  return { g, insulin, glucagon };
}

const line = (values: number[], scale: (v: number) => number) =>
  values.map((v, k) => `${toX(k * DT).toFixed(1)},${scale(v).toFixed(1)}`).join(' ');

/** Régulation de la glycémie sur 24 h : repas, effort, insuline et glucagon, diabète. */
export function GlycemieSim({ t }: { t: Dictionary['sims']['glycemie'] }) {
  const [profile, setProfile] = useState<Profile>('normal');
  const [meals, setMeals] = useState<Record<Meal, boolean>>({ matin: true, midi: true, soir: true });
  const [effort, setEffort] = useState(false);
  const [injections, setInjections] = useState(false);

  const { g, insulin, glucagon } = simulate(profile, meals, effort, injections);
  const max = Math.max(...g);
  const min = Math.min(...g);
  const hoursAbove = g.filter((v) => v > 1.26).length * DT;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div className="flex flex-col gap-2">
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.title}>
            <rect x="30" y={toY(1.1).toFixed(1)} width={W - 40} height={(toY(0.7) - toY(1.1)).toFixed(1)} fill="#ecfdf3" />
            <line x1="30" y1={toY(1.8).toFixed(1)} x2={W - 10} y2={toY(1.8).toFixed(1)} stroke="#e0533d" strokeDasharray="4 3" />
            <line x1="30" y1={toY(1.26).toFixed(1)} x2={W - 10} y2={toY(1.26).toFixed(1)} stroke="#e8793a" strokeDasharray="2 3" />
            {[0, 1, 2, 3].map((v) => (
              <text key={v} x="4" y={(toY(v) + 4).toFixed(1)} fontSize="10" fill="#586179">{v}</text>
            ))}
            {[0, 6, 12, 18, 24].map((h) => (
              <text key={h} x={(toX(h) - 4).toFixed(1)} y={H - 4} fontSize="10" fill="#586179">{h}h</text>
            ))}
            <line x1="30" y1={H - 20} x2={W - 10} y2={H - 20} stroke="#1a2340" />
            <polyline points={line(g, toY)} fill="none" stroke="#1a2340" strokeWidth="2.5" />
          </svg>
        </div>
        <p className="text-xs text-muted">
          <span className="mr-2 inline-block h-3 w-3 rounded-sm bg-good-soft align-middle" /> {t.normalBand} ·{' '}
          <span className="text-alert-ink">— — {t.kidney}</span>
        </p>
        <div className="rounded-2xl border border-line bg-surface p-2">
          <p className="px-1 text-xs font-bold text-muted">{t.hormones}</p>
          <svg viewBox={`0 0 ${W} 60`} className="w-full" role="img" aria-label={t.hormones}>
            <polyline points={line(insulin, (v) => 55 - Math.min(v, 1) * 50)} fill="none" stroke="#2f6fd6" strokeWidth="2" />
            <polyline points={line(glucagon, (v) => 55 - Math.min(v * 4, 1) * 50)} fill="none" stroke="#e8793a" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2" role="group" aria-label={t.profile}>
          {(['normal', 'type1', 'type2'] as Profile[]).map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={profile === p}
              onClick={() => setProfile(p)}
              className={`rounded-lg border-2 px-3 py-2 text-left text-sm font-bold ${profile === p ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
            >
              {t.profiles[p]}
            </button>
          ))}
        </div>
        <fieldset className="flex flex-col gap-1">
          <legend className="font-bold">{t.meals}</legend>
          {(Object.keys(MEALS) as Meal[]).map((m) => (
            <label key={m} className="flex items-center gap-2">
              <input type="checkbox" checked={meals[m]} onChange={(e) => setMeals({ ...meals, [m]: e.target.checked })} className="h-5 w-5" />
              {t.mealNames[m]}
            </label>
          ))}
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={effort} onChange={(e) => setEffort(e.target.checked)} className="h-5 w-5" />
            {t.effort}
          </label>
          {profile === 'type1' && (
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={injections} onChange={(e) => setInjections(e.target.checked)} className="h-5 w-5" />
              {t.insulin}
            </label>
          )}
        </fieldset>
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.max} value={fmt(max)} unit="g/L" strong />
          <Readout label={t.min} value={fmt(min)} unit="g/L" />
          <Readout label={t.above} value={fmt(hoursAbove, 1)} unit="h" />
        </dl>
      </div>
    </div>
  );
}
