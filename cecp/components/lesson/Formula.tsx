'use client';

import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FormulaProps {
  children: string;
  block?: boolean;
}

export function Formula({ children, block = false }: FormulaProps) {
  const html = katex.renderToString(children, {
    displayMode: block,
    throwOnError: false,
    strict: false,
  });

  if (block) {
    return (
      <div
        className="my-4 overflow-x-auto py-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className="inline-block align-middle"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}