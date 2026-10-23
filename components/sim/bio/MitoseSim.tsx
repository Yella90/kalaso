'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '@/lib/i18n';
import { Readout } from '../Slider';
import { usePrefersReducedMotion } from '../usePrefersReducedMotion';

type Kind = 'mitose' | 'meiose';
type PhaseId = keyof Dictionary['sims']['mitose']['phases'];

const BLUE = '#2f6fd6'; // chromosomes venus du père
const ORANGE = '#e8793a'; // chromosomes venus de la mère
const LONG = 46;
const SHORT = 28;

interface Chromo {
  x: number;
  y: number;
  len: number;
  color: string;
  chromatids: 1 | 2;
  rot?: number;
  /** Couleur de l’extrémité de chaque chromatide (crossing-over). */
  tips?: (string | undefined)[];
}

interface CellShape {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  /** Noyau visible (interphase, télophase) ou fuseau (division en cours). */
  nucleus?: boolean;
  spindle?: boolean;
  chromatin?: boolean;
  chromosomes: Chromo[];
}

interface Phase {
  id: PhaseId;
  cells: CellShape[];
  counts: { cells: number; chromosomes: string; chromatids: string; dna: string };
}

const c = (x: number, y: number, len: number, color: string, chromatids: 1 | 2, rot = 0, tips?: (string | undefined)[]): Chromo => ({
  x, y, len, color, chromatids, rot, tips,
});

const interphase: Phase = {
  id: 'interphase',
  cells: [{ cx: 170, cy: 130, rx: 150, ry: 110, nucleus: true, chromatin: true, chromosomes: [] }],
  counts: { cells: 1, chromosomes: '4', chromatids: '1 → 2', dna: 'q → 2q' },
};

const MITOSE: Phase[] = [
  interphase,
  {
    id: 'prophase',
    cells: [{
      cx: 170, cy: 130, rx: 150, ry: 110,
      chromosomes: [c(125, 100, LONG, BLUE, 2, 25), c(215, 155, LONG, ORANGE, 2, -35), c(150, 165, SHORT, BLUE, 2, 60), c(205, 95, SHORT, ORANGE, 2, -10)],
    }],
    counts: { cells: 1, chromosomes: '4', chromatids: '2', dna: '2q' },
  },
  {
    id: 'metaphase',
    cells: [{
      cx: 170, cy: 130, rx: 150, ry: 110, spindle: true,
      chromosomes: [c(170, 60, LONG, BLUE, 2), c(170, 112, LONG, ORANGE, 2), c(170, 158, SHORT, BLUE, 2), c(170, 196, SHORT, ORANGE, 2)],
    }],
    counts: { cells: 1, chromosomes: '4', chromatids: '2', dna: '2q' },
  },
  {
    id: 'anaphase',
    cells: [{
      cx: 170, cy: 130, rx: 150, ry: 110, spindle: true,
      chromosomes: [60, 112, 158, 196].flatMap((y, i) => {
        const len = i < 2 ? LONG : SHORT;
        const color = i % 2 ? ORANGE : BLUE;
        return [c(95, y, len, color, 1, 90), c(245, y, len, color, 1, 90)];
      }),
    }],
    counts: { cells: 1, chromosomes: '8', chromatids: '1', dna: '2q' },
  },
  {
    id: 'telophase',
    cells: [95, 245].map((cx) => ({
      cx, cy: 130, rx: 72, ry: 100, nucleus: true,
      chromosomes: [c(cx - 18, 105, LONG, BLUE, 1, 15), c(cx + 18, 110, LONG, ORANGE, 1, -15), c(cx - 14, 165, SHORT, BLUE, 1, -20), c(cx + 16, 165, SHORT, ORANGE, 1, 20)],
    })),
    counts: { cells: 2, chromosomes: '4', chromatids: '1', dna: 'q' },
  },
];

const MEIOSE: Phase[] = [
  interphase,
  {
    id: 'prophase1',
    cells: [{
      cx: 170, cy: 130, rx: 150, ry: 110,
      chromosomes: [
        c(118, 120, LONG, BLUE, 2, 20, [undefined, ORANGE]),
        c(138, 127, LONG, ORANGE, 2, 20, [BLUE, undefined]),
        c(210, 140, SHORT, BLUE, 2, -30),
        c(226, 131, SHORT, ORANGE, 2, -30),
      ],
    }],
    counts: { cells: 1, chromosomes: '4 (2 paires)', chromatids: '2', dna: '2q' },
  },
  {
    id: 'metaphase1',
    cells: [{
      cx: 170, cy: 130, rx: 150, ry: 110, spindle: true,
      chromosomes: [
        c(152, 85, LONG, BLUE, 2, 0, [undefined, ORANGE]),
        c(188, 85, LONG, ORANGE, 2, 0, [BLUE, undefined]),
        c(152, 175, SHORT, BLUE, 2),
        c(188, 175, SHORT, ORANGE, 2),
      ],
    }],
    counts: { cells: 1, chromosomes: '4 (2 paires)', chromatids: '2', dna: '2q' },
  },
  {
    id: 'anaphase1',
    cells: [{
      cx: 170, cy: 130, rx: 150, ry: 110, spindle: true,
      chromosomes: [
        c(85, 95, LONG, BLUE, 2, 0, [undefined, ORANGE]),
        c(255, 95, LONG, ORANGE, 2, 0, [BLUE, undefined]),
        c(85, 170, SHORT, BLUE, 2),
        c(255, 170, SHORT, ORANGE, 2),
      ],
    }],
    counts: { cells: 1, chromosomes: '4', chromatids: '2', dna: '2q' },
  },
  {
    id: 'telophase1',
    cells: [
      { cx: 95, cy: 130, rx: 72, ry: 100, nucleus: true, chromosomes: [c(80, 115, LONG, BLUE, 2, 15, [undefined, ORANGE]), c(110, 160, SHORT, BLUE, 2, -20)] },
      { cx: 245, cy: 130, rx: 72, ry: 100, nucleus: true, chromosomes: [c(230, 115, LONG, ORANGE, 2, -15, [BLUE, undefined]), c(260, 160, SHORT, ORANGE, 2, 20)] },
    ],
    counts: { cells: 2, chromosomes: '2', chromatids: '2', dna: 'q' },
  },
  {
    id: 'metaphase2',
    cells: [
      { cx: 95, cy: 130, rx: 72, ry: 100, spindle: true, chromosomes: [c(95, 100, LONG, BLUE, 2, 0, [undefined, ORANGE]), c(95, 165, SHORT, BLUE, 2)] },
      { cx: 245, cy: 130, rx: 72, ry: 100, spindle: true, chromosomes: [c(245, 100, LONG, ORANGE, 2, 0, [BLUE, undefined]), c(245, 165, SHORT, ORANGE, 2)] },
    ],
    counts: { cells: 2, chromosomes: '2', chromatids: '2', dna: 'q' },
  },
  {
    id: 'anaphase2',
    cells: [
      { cx: 95, cy: 130, rx: 72, ry: 100, spindle: true, chromosomes: [c(60, 100, LONG, BLUE, 1, 90), c(130, 100, LONG, BLUE, 1, 90, [ORANGE]), c(60, 165, SHORT, BLUE, 1, 90), c(130, 165, SHORT, BLUE, 1, 90)] },
      { cx: 245, cy: 130, rx: 72, ry: 100, spindle: true, chromosomes: [c(210, 100, LONG, ORANGE, 1, 90, [BLUE]), c(280, 100, LONG, ORANGE, 1, 90), c(210, 165, SHORT, ORANGE, 1, 90), c(280, 165, SHORT, ORANGE, 1, 90)] },
    ],
    counts: { cells: 2, chromosomes: '4', chromatids: '1', dna: 'q' },
  },
  {
    id: 'telophase2',
    cells: [
      { cx: 85, cy: 70, rx: 62, ry: 52, nucleus: true, chromosomes: [c(70, 70, LONG, BLUE, 1, 10), c(100, 72, SHORT, BLUE, 1, -10)] },
      { cx: 255, cy: 70, rx: 62, ry: 52, nucleus: true, chromosomes: [c(240, 70, LONG, BLUE, 1, 10, [ORANGE]), c(270, 72, SHORT, BLUE, 1, -10)] },
      { cx: 85, cy: 190, rx: 62, ry: 52, nucleus: true, chromosomes: [c(70, 190, LONG, ORANGE, 1, 10, [BLUE]), c(100, 192, SHORT, ORANGE, 1, -10)] },
      { cx: 255, cy: 190, rx: 62, ry: 52, nucleus: true, chromosomes: [c(240, 190, LONG, ORANGE, 1, 10), c(270, 192, SHORT, ORANGE, 1, -10)] },
    ],
    counts: { cells: 4, chromosomes: '2', chromatids: '1', dna: 'q/2' },
  },
];

function ChromosomeShape({ ch }: { ch: Chromo }) {
  const w = 7;
  const offsets = ch.chromatids === 2 ? [-4.25, 4.25] : [0];
  return (
    <g transform={`translate(${ch.x} ${ch.y}) rotate(${ch.rot ?? 0})`}>
      {offsets.map((dx, i) => (
        <g key={i}>
          <rect x={dx - w / 2} y={-ch.len / 2} width={w} height={ch.len} rx={w / 2} fill={ch.color} />
          {ch.tips?.[i] && <rect x={dx - w / 2} y={-ch.len / 2} width={w} height={ch.len * 0.35} rx={w / 2} fill={ch.tips[i]} />}
        </g>
      ))}
      <circle cx={0} cy={-ch.len * 0.1} r={ch.chromatids === 2 ? 5 : 3.5} fill="#1a2340" />
    </g>
  );
}

function CellView({ cell }: { cell: CellShape }) {
  return (
    <g>
      <ellipse cx={cell.cx} cy={cell.cy} rx={cell.rx} ry={cell.ry} fill="#fdf6e9" stroke="#8a7350" strokeWidth="3" />
      {cell.spindle && (
        <g stroke="#b9ad96" strokeWidth="1">
          {[-0.6, -0.3, 0, 0.3, 0.6].map((k) => (
            <path key={k} d={`M${cell.cx - cell.rx + 12} ${cell.cy} Q ${cell.cx} ${cell.cy + k * cell.ry * 1.6} ${cell.cx + cell.rx - 12} ${cell.cy}`} fill="none" />
          ))}
        </g>
      )}
      {cell.nucleus && (
        <ellipse cx={cell.cx} cy={cell.cy} rx={cell.rx * 0.55} ry={cell.ry * 0.5} fill="#efe3f7" stroke="#7d5ba6" strokeWidth="2" />
      )}
      {cell.chromatin && (
        <g fill="none" strokeWidth="2" strokeLinecap="round">
          <path d="M120 110 q 15 -20 30 0 t 30 0 t 30 0" stroke={BLUE} />
          <path d="M125 135 q 15 20 30 0 t 30 0 t 30 0" stroke={ORANGE} />
          <path d="M140 155 q 10 -14 20 0 t 20 0" stroke={BLUE} />
          <path d="M150 100 q 10 14 20 0 t 20 0" stroke={ORANGE} />
        </g>
      )}
      {cell.chromosomes.map((ch, i) => (
        <ChromosomeShape key={i} ch={ch} />
      ))}
    </g>
  );
}

/** Mitose et méiose d’une cellule à 2n = 4, phase par phase. */
export function MitoseSim({ t }: { t: Dictionary['sims']['mitose'] }) {
  const [kind, setKind] = useState<Kind>('mitose');
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();
  const phases = kind === 'mitose' ? MITOSE : MEIOSE;
  const phase = phases[Math.min(index, phases.length - 1)];

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setIndex((i) => {
        if (i >= phases.length - 1) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, [playing, phases.length]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div>
        <div className="rounded-2xl border border-line bg-surface p-2">
          <svg viewBox="0 0 340 260" className="w-full" role="img" aria-label={t.phases[phase.id].name}>
            {phase.cells.map((cell, i) => (
              <CellView key={i} cell={cell} />
            ))}
          </svg>
        </div>
        <p className="mt-2 text-sm text-muted">{t.legend}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          {(['mitose', 'meiose'] as Kind[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => {
                setKind(k);
                setIndex(0);
                setPlaying(false);
              }}
              className={`rounded-lg border-2 px-2 py-2 text-sm font-bold ${kind === k ? 'border-ink bg-ink text-on-ink' : 'border-line bg-surface'}`}
            >
              {t.kinds[k]}
            </button>
          ))}
        </div>
        <div>
          <p className="font-serif text-2xl font-bold">
            {index + 1}/{phases.length} · {t.phases[phase.id].name}
          </p>
          <p className="mt-1">{t.phases[phase.id].text}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))} className="rounded-full border-2 border-line px-4 py-1.5 font-bold disabled:opacity-40">
            ← {t.previous}
          </button>
          <button type="button" disabled={index >= phases.length - 1} onClick={() => setIndex((i) => Math.min(phases.length - 1, i + 1))} className="rounded-full bg-ink px-4 py-1.5 font-bold text-on-ink disabled:opacity-40">
            {t.next} →
          </button>
          {!reduced && (
            <button
              type="button"
              onClick={() => {
                if (index >= phases.length - 1) setIndex(0);
                setPlaying((p) => !p);
              }}
              className="rounded-full border-2 border-ink px-4 py-1.5 font-bold"
            >
              {playing ? t.pause : t.play}
            </button>
          )}
        </div>
        <dl className="grid grid-cols-2 gap-2">
          <Readout label={t.cells} value={String(phase.counts.cells)} strong />
          <Readout label={t.chromosomes} value={phase.counts.chromosomes} />
          <Readout label={t.chromatids} value={phase.counts.chromatids} />
          <Readout label={t.dna} value={phase.counts.dna} />
        </dl>
      </div>
    </div>
  );
}
