'use client';

import { useMemo, useState } from 'react';
import { format, type Dictionary } from '@/lib/i18n';

type T = Dictionary['sims']['caryotype'];
type Num = number | 'X' | 'Y';
type Scenario = 'garcon' | 'fille' | 'trisomie21' | 'turner' | 'klinefelter';

// Taille relative (millions de paires de bases) et position du centromère (fraction depuis le haut).
const DATA: Record<string, { size: number; ci: number }> = {
  1: { size: 248, ci: 0.48 }, 2: { size: 242, ci: 0.39 }, 3: { size: 198, ci: 0.46 }, 4: { size: 190, ci: 0.27 },
  5: { size: 181, ci: 0.27 }, 6: { size: 171, ci: 0.35 }, 7: { size: 159, ci: 0.38 }, 8: { size: 145, ci: 0.31 },
  9: { size: 138, ci: 0.32 }, 10: { size: 134, ci: 0.3 }, 11: { size: 135, ci: 0.4 }, 12: { size: 133, ci: 0.27 },
  13: { size: 114, ci: 0.14 }, 14: { size: 107, ci: 0.14 }, 15: { size: 102, ci: 0.15 }, 16: { size: 90, ci: 0.41 },
  17: { size: 83, ci: 0.29 }, 18: { size: 80, ci: 0.21 }, 19: { size: 59, ci: 0.47 }, 20: { size: 64, ci: 0.44 },
  21: { size: 47, ci: 0.25 }, 22: { size: 51, ci: 0.28 }, X: { size: 156, ci: 0.39 }, Y: { size: 57, ci: 0.18 },
};

const SLOTS: (Num | 'sexe')[] = [...Array.from({ length: 22 }, (_, i) => i + 1), 'sexe'];

function scenarioChromosomes(s: Scenario): Num[] {
  const autosomes: Num[] = Array.from({ length: 22 }, (_, i) => i + 1).flatMap((n) => [n, n]);
  if (s === 'trisomie21') autosomes.push(21);
  const sex: Num[] = { garcon: ['X', 'Y'], fille: ['X', 'X'], trisomie21: ['X', 'Y'], turner: ['X'], klinefelter: ['X', 'X', 'Y'] }[s] as Num[];
  return [...autosomes, ...sex];
}

function rng(seed: number) {
  let x = seed;
  return () => ((x = (x * 16807) % 2147483647) / 2147483647);
}

const H = (n: Num) => 14 + DATA[n].size * 0.26;

/** Un chromosome métaphasique : deux chromatides réunies au centromère, avec des bandes. */
function Chromosome({ n, x, y, rot = 0, active, dim }: { n: Num; x: number; y: number; rot?: number; active?: boolean; dim?: boolean }) {
  const h = H(n);
  const c = DATA[n].ci * h;
  const bands = useMemo(() => {
    const r = rng(typeof n === 'number' ? n * 97 : n === 'X' ? 31 : 53);
    return Array.from({ length: Math.max(2, Math.round(h / 14)) }, () => ({ at: 0.06 + r() * 0.88, w: 1.5 + r() * 3 }));
  }, [n, h]);
  const fill = active ? '#f59e0b' : '#94a3b8';
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`} opacity={dim ? 0.25 : 1}>
      {[-3.4, 3.4].map((dx) => (
        <g key={dx}>
          <path
            d={`M${dx - 3} ${-h / 2 + 3} q 3 -3 6 0 V ${-h / 2 + c - 3} q -1.5 3 0 6 V ${h / 2 - 3} q -3 3 -6 0 V ${-h / 2 + c + 3} q 1.5 -3 0 -6 Z`}
            fill={fill}
            stroke="#1e293b"
            strokeWidth="0.8"
          />
          {bands.map((b, i) => {
            const by = -h / 2 + b.at * h;
            return Math.abs(by - (-h / 2 + c)) < 3 ? null : <rect key={i} x={dx - 3} y={by} width="6" height={b.w} fill="#1e293b" opacity="0.55" />;
          })}
        </g>
      ))}
    </g>
  );
}

export function CaryotypeSim({ t }: { t: T }) {
  const [scenario, setScenario] = useState<Scenario>('garcon');
  const [seed, setSeed] = useState(3);
  const chromosomes = useMemo(() => scenarioChromosomes(scenario), [scenario]);
  const spread = useMemo(() => {
    const r = rng(seed * 7919 + chromosomes.length);
    const order = chromosomes.map((n, i) => ({ n, i, k: r() })).sort((a, b) => a.k - b.k);
    const cols = 12;
    return order.map((o, j) => ({
      ...o,
      x: 30 + (j % cols) * 52 + (r() - 0.5) * 18,
      y: 50 + Math.floor(j / cols) * 78 + (r() - 0.5) * 16,
      rot: (r() - 0.5) * 140,
    }));
  }, [chromosomes, seed]);

  const [placed, setPlaced] = useState<Record<number, boolean>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const [sex, setSex] = useState<'m' | 'f' | null>(null);
  const [anomaly, setAnomaly] = useState<Scenario | 'aucune' | null>(null);
  const [verdict, setVerdict] = useState<boolean | null>(null);

  const done = chromosomes.every((_, i) => placed[i]);
  const count = chromosomes.length;

  function reset(s: Scenario, newSeed = seed + 1) {
    setScenario(s);
    setSeed(newSeed);
    setPlaced({});
    setSelected(null);
    setMessage(null);
    setSex(null);
    setAnomaly(null);
    setVerdict(null);
  }

  function drop(slot: Num | 'sexe') {
    if (selected === null) return;
    const n = chromosomes[selected];
    const ok = slot === 'sexe' ? n === 'X' || n === 'Y' : n === slot;
    if (ok) {
      setPlaced((p) => ({ ...p, [selected]: true }));
      setMessage({ ok: true, text: format(t.right, { n: String(n) }) });
      setSelected(null);
    } else {
      const bigger = typeof slot === 'number' && DATA[slot] && DATA[n].size > DATA[slot].size;
      setMessage({ ok: false, text: slot === 'sexe' ? t.wrongSex : bigger ? t.wrongBigger : t.wrongSmaller });
    }
  }

  function autoSort() {
    setPlaced(Object.fromEntries(chromosomes.map((_, i) => [i, true])));
    setSelected(null);
    setMessage(null);
  }

  const expectedSex = scenario === 'fille' || scenario === 'turner' ? 'f' : 'm';
  const expectedAnomaly: Scenario | 'aucune' = scenario === 'garcon' || scenario === 'fille' ? 'aucune' : scenario;
  const formula = { garcon: '46,XY', fille: '46,XX', trisomie21: '47,XY,+21', turner: '45,X', klinefelter: '47,XXY' }[scenario];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-muted">{t.patient}</span>
        {(['garcon', 'fille', 'trisomie21', 'turner', 'klinefelter'] as const).map((s, i) => (
          <button
            key={s}
            type="button"
            aria-pressed={scenario === s}
            onClick={() => reset(s)}
            className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${scenario === s ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
          >
            {format(t.patientN, { n: i + 1 })}
          </button>
        ))}
        <button type="button" onClick={autoSort} className="ml-auto text-sm text-muted underline">
          {t.auto}
        </button>
      </div>

      <section className="rounded-2xl border border-line bg-[#0f172a] p-2">
        <p className="px-2 pt-1 text-sm font-bold text-slate-300">
          {t.spread} · {format(t.left, { n: count - Object.keys(placed).length })}
        </p>
        <svg viewBox="0 0 640 330" className="h-auto w-full" role="img" aria-label={t.spread}>
          <defs>
            <radialGradient id="noyau-meta" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </radialGradient>
          </defs>
          <ellipse cx="320" cy="165" rx="315" ry="160" fill="url(#noyau-meta)" />
          {spread.map((c) =>
            placed[c.i] ? null : (
              <g
                key={c.i}
                role="button"
                tabIndex={0}
                aria-label={t.chromosome}
                aria-pressed={selected === c.i}
                onClick={() => {
                  setSelected(c.i);
                  setMessage(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(c.i)}
                className="cursor-pointer outline-none"
              >
                <rect x={c.x - 24} y={c.y - 38} width="48" height="76" fill="transparent" />
                <Chromosome n={c.n} x={c.x} y={c.y} rot={c.rot} active={selected === c.i} />
              </g>
            ),
          )}
        </svg>
      </section>

      <div role="status" className="min-h-6">
        {message ? (
          <p className={`font-bold ${message.ok ? 'text-good' : 'text-alert-ink'}`}>{message.text}</p>
        ) : (
          <p className="text-muted">{selected === null ? t.pick : t.place}</p>
        )}
      </div>

      <section className="grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-12">
        {SLOTS.map((slot) => {
          const here = chromosomes.map((n, i) => ({ n, i })).filter(({ n, i }) => placed[i] && (slot === 'sexe' ? n === 'X' || n === 'Y' : n === slot));
          return (
            <button
              key={String(slot)}
              type="button"
              onClick={() => drop(slot)}
              className={`flex flex-col items-center rounded-xl border-2 bg-surface px-1 pb-1 pt-1 ${selected !== null ? 'border-dashed border-ink' : 'border-line'} ${
                slot === 'sexe' ? 'col-span-2' : ''
              }`}
            >
              <svg viewBox={`0 0 ${slot === 'sexe' ? 100 : 50} 80`} className="h-16 w-full" aria-hidden="true">
                {here.map(({ n }, k) => (
                  <Chromosome key={k} n={n} x={(slot === 'sexe' ? 30 : 9) + k * 16} y={42} />
                ))}
              </svg>
              <span className="text-xs font-bold">{slot === 'sexe' ? t.sexSlot : slot}</span>
            </button>
          );
        })}
      </section>

      {done && (
        <section className="rounded-2xl bg-ink p-4 text-on-ink">
          <p className="font-bold">{format(t.count, { n: count })}</p>
          <p className="mt-2">{t.diagnose}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(['m', 'f'] as const).map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={sex === s}
                onClick={() => {
                  setSex(s);
                  setVerdict(null);
                }}
                className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${sex === s ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-on-ink-muted'}`}
              >
                {t.sexes[s]}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(['aucune', 'trisomie21', 'turner', 'klinefelter'] as const).map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={anomaly === a}
                onClick={() => {
                  setAnomaly(a);
                  setVerdict(null);
                }}
                className={`rounded-full border-2 px-3 py-1 text-sm font-bold ${anomaly === a ? 'border-amber-300 bg-amber-300 text-slate-950' : 'border-on-ink-muted'}`}
              >
                {t.anomalies[a]}
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!sex || !anomaly}
            onClick={() => setVerdict(sex === expectedSex && anomaly === expectedAnomaly)}
            className="mt-3 rounded-full bg-amber-300 px-5 py-2 font-bold text-slate-950 disabled:opacity-50"
          >
            {t.check}
          </button>
          {verdict !== null && (
            <div className="mt-3 rounded-xl bg-white/10 p-3">
              <p className={`font-bold ${verdict ? 'text-emerald-300' : 'text-amber-200'}`}>{verdict ? t.diagnosisRight : t.diagnosisWrong}</p>
              {verdict && (
                <>
                  <p className="mt-1">
                    {t.formula} : <span className="font-mono font-bold">{formula}</span>
                  </p>
                  <p className="mt-1 text-on-ink-muted">{t.explain[scenario]}</p>
                </>
              )}
            </div>
          )}
        </section>
      )}

      <details className="rounded-xl border border-line bg-surface px-4 py-3">
        <summary className="cursor-pointer font-bold">{t.helpTitle}</summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {t.help.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </details>
    </div>
  );
}
