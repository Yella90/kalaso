'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

/**
 * Cadre commun des simulations : bouton plein ecran (utile au tableau /
 * videoprojecteur pour le professeur) et legende optionnelle.
 */
export function SimulationFrame({
  children, caption, className = '',
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement === ref.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    else el.requestFullscreen?.().catch(() => {});
  };

  return (
    <figure className={`space-y-2 ${className}`}>
      <div
        ref={ref}
        className={`relative group ${full ? 'bg-slate-950 flex flex-col justify-center p-4 [&>*:first-child]:!h-full' : ''}`}
      >
        {children}
        <button
          onClick={toggle}
          className="absolute top-2 right-2 z-10 p-2 rounded-md bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 opacity-80 group-hover:opacity-100 print:hidden"
          aria-label={full ? 'Quitter le plein écran' : 'Plein écran'}
          title={full ? 'Quitter le plein écran' : 'Plein écran (idéal pour projeter en classe)'}
        >
          {full ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
      {caption && <figcaption className="text-xs text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
