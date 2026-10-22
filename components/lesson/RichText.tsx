import katex from 'katex';
import 'katex/contrib/mhchem';
import { Fragment } from 'react';

/** Rendu KaTeX côté serveur : aucune bibliothèque de formules n'est envoyée au téléphone. */
export function renderTex(tex: string, displayMode = false): string {
  return katex.renderToString(tex, { throwOnError: false, displayMode, strict: false });
}

const TOKEN = /(\$[^$]+\$|\*\*[^*]+\*\*)/g;

/** Texte avec **gras** et $formules$. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          return <span key={i} dangerouslySetInnerHTML={{ __html: renderTex(part.slice(1, -1)) }} />;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={i}>
              <RichText text={part.slice(2, -2)} />
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export function TexBlock({ tex }: { tex: string }) {
  return <div className="overflow-x-auto py-1" dangerouslySetInnerHTML={{ __html: renderTex(tex, true) }} />;
}
