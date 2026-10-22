/** Écriture conventionnelle d'un noyau ou d'un ion : nombre de masse et numéro atomique à gauche, charge à droite. */
export function Nuclide({ symbol, a, z, charge = 0, className = '' }: { symbol: string; a: number; z: number; charge?: number; className?: string }) {
  const chargeText = charge === 0 ? '' : `${Math.abs(charge) > 1 ? Math.abs(charge) : ''}${charge > 0 ? '+' : '−'}`;
  return (
    <span className={`inline-flex items-center font-serif ${className}`}>
      <span className="mr-0.5 inline-flex flex-col items-end text-[0.45em] leading-none">
        <span>{a}</span>
        <span className="mt-[0.35em]">{z}</span>
      </span>
      <span className="leading-none">{symbol}</span>
      {chargeText && <span className="-mt-[0.9em] ml-0.5 self-start text-[0.45em] leading-none">{chargeText}</span>}
    </span>
  );
}
