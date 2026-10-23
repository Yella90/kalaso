import type { Dictionary } from '@/lib/i18n';
import { MEDIA, type MediaCredit, type MediaId } from '@/lib/media';
import { RichText } from './RichText';

/** Photo ou vidéo libre, toujours accompagnée de son auteur et de sa licence. */
export function MediaFigure({ id, caption, t }: { id: MediaId; caption?: string; t: Dictionary['lesson'] }) {
  const media: MediaCredit = MEDIA[id];
  return (
    <figure className="overflow-hidden rounded-xl border border-line bg-surface">
      {media.kind === 'video' ? (
        <video
          src={media.src}
          controls
          muted
          loop
          playsInline
          preload="none"
          aria-label={media.alt}
          className="h-auto w-full bg-ink"
          style={{ aspectRatio: `${media.width} / ${media.height}` }}
        />
      ) : (
        // Images hébergées par Wikimedia : <img> simple, chargée à la demande.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto max-h-[28rem] w-full bg-paper object-contain"
        />
      )}
      <figcaption className="px-4 py-3 text-sm">
        <span className="text-ink">{caption ? <RichText text={caption} /> : media.alt}</span>
        <span className="mt-1 block text-xs text-muted">
          {media.kind === 'video' ? t.media.video : t.media.photo} : {media.author} ·{' '}
          {media.licenseUrl ? (
            <a href={media.licenseUrl} className="underline" target="_blank" rel="noopener noreferrer">
              {media.license}
            </a>
          ) : (
            media.license
          )}{' '}
          ·{' '}
          <a href={media.page} className="underline" target="_blank" rel="noopener noreferrer">
            {t.media.via}
          </a>
        </span>
      </figcaption>
    </figure>
  );
}
