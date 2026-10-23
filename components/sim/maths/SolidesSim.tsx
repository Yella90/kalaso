'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { PredictChallenges } from '../PredictChallenges';
import { fmt, Readout, Slider } from '../Slider';
import type { Solide } from './SolidesScene';

const SolidesScene = dynamic(() => import('./SolidesScene'), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-muted">…</div>,
});

type T = Dictionary['sims']['solides'];
const LIST: Solide[] = ['cube', 'pave', 'prisme', 'cylindre', 'pyramide', 'cone', 'boule'];

/** Volume et aire totale ; a, b, h en cm. */
function measures(s: Solide, a: number, b: number, h: number) {
  const pi = Math.PI;
  switch (s) {
    case 'cube':
      return { v: a ** 3, aire: 6 * a * a, formula: 'V = a³' };
    case 'pave':
      return { v: a * b * h, aire: 2 * (a * b + a * h + b * h), formula: 'V = L × ℓ × h' };
    case 'prisme': {
      const base = (Math.sqrt(3) / 4) * a * a;
      return { v: base * h, aire: 2 * base + 3 * a * h, formula: 'V = 𝓑 × h' };
    }
    case 'cylindre':
      return { v: pi * a * a * h, aire: 2 * pi * a * a + 2 * pi * a * h, formula: 'V = π r² h' };
    case 'pyramide': {
      const apo = Math.sqrt(h * h + (a / 2) ** 2);
      return { v: (a * a * h) / 3, aire: a * a + 2 * a * apo, formula: 'V = 𝓑 × h ÷ 3' };
    }
    case 'cone': {
      const g = Math.sqrt(h * h + a * a);
      return { v: (pi * a * a * h) / 3, aire: pi * a * a + pi * a * g, formula: 'V = π r² h ÷ 3' };
    }
    case 'boule':
      return { v: (4 / 3) * pi * a ** 3, aire: 4 * pi * a * a, formula: 'V = 4/3 π r³' };
  }
}

/** Solides de l’espace en 3D : dimensions réglables, volume, aire, remplissage d’eau. */
export function SolidesSim({ t, predict }: { t: T; predict: Dictionary['lesson']['predict'] }) {
  const [solide, setSolide] = useState<Solide>('cylindre');
  const [a, setA] = useState(1.5);
  const [b, setB] = useState(2);
  const [h, setH] = useState(3);
  const [fill, setFill] = useState(0.5);
  const [transparent, setTransparent] = useState(true);
  const m = measures(solide, a, b, h);
  const round = solide === 'cylindre' || solide === 'cone' || solide === 'boule';

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {LIST.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={solide === s}
            onClick={() => setSolide(s)}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${solide === s ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {t.solids[s]}
          </button>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="h-[22rem] overflow-hidden rounded-2xl border border-line sm:h-[26rem]">
          <SolidesScene solide={solide} a={a} b={b} h={h} fill={fill} transparent={transparent} />
        </div>
        <div className="flex flex-col gap-3">
          <Slider label={round ? t.radius : solide === 'pave' ? t.length : t.side} value={a} min={0.5} max={3} step={0.1} unit="cm" onChange={setA} />
          {solide === 'pave' && <Slider label={t.width} value={b} min={0.5} max={4} step={0.1} unit="cm" onChange={setB} />}
          {solide !== 'cube' && solide !== 'boule' && <Slider label={t.height} value={h} min={0.5} max={5} step={0.1} unit="cm" onChange={setH} />}
          <Slider label={t.water} value={fill} min={0} max={1} step={0.05} onChange={setFill} />
          <label className="flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} className="h-4 w-4" />
            {t.transparent}
          </label>
          <dl className="grid grid-cols-2 gap-2">
            <Readout label={t.volume} value={fmt(m.v, 2)} unit="cm³" strong />
            <Readout label={t.area} value={fmt(m.aire, 2)} unit="cm²" />
          </dl>
          <p className="rounded-xl bg-paper px-3 py-2 font-serif text-lg">{m.formula}</p>
          <p className="text-sm text-muted">{t.hint}</p>
        </div>
      </div>
      <PredictChallenges challenges={t.challenges.map((c) => ({ ...c, choices: [...c.choices] }))} t={predict} />
    </div>
  );
}
