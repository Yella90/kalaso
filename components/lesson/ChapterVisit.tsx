'use client';

import { useEffect } from 'react';
import { markChapterVisited } from '@/lib/progress/store';

/** Note la visite du chapitre dans la progression de l'élève. */
export function ChapterVisit({ chapterKey }: { chapterKey: string }) {
  useEffect(() => {
    markChapterVisited(chapterKey);
  }, [chapterKey]);
  return null;
}
