import type { Dictionary } from '@/lib/i18n';
import { BogolanBand } from './BogolanBand';

export function SiteFooter({ t }: { t: Dictionary }) {
  return (
    <footer className="mt-16 bg-ink text-on-ink-muted">
      <BogolanBand />
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm sm:px-6">
        <p className="font-serif text-lg font-bold text-on-ink">Kalanso</p>
        <p className="mt-1 max-w-prose">{t.footer.text}</p>
        <p className="mt-1">{t.footer.version}</p>
      </div>
    </footer>
  );
}
