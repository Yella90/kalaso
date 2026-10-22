import { adventure as champCooperative } from './content/champ-cooperative';
import { adventure as eauDuPuits } from './content/eau-du-puits';
import { adventure as enquetePaludisme } from './content/enquete-paludisme';
import { adventure as motoElectrique } from './content/moto-electrique';
import { adventure as pompeSolaire } from './content/pompe-solaire';
import type { Adventure } from './types';

export type { Adventure, Challenge, ChapterRef, Mission } from './types';

// Rangées de la plus jeune classe à la plus avancée.
const ADVENTURES: Adventure[] = [pompeSolaire, champCooperative, enquetePaludisme, eauDuPuits, motoElectrique];

export function getAdventures(): Adventure[] {
  return ADVENTURES;
}

export function getAdventure(id: string): Adventure | undefined {
  return ADVENTURES.find((a) => a.id === id);
}

/** Aventures dont au moins une mission utilise ce chapitre. */
export function getAdventuresForChapter(classId: string, subject: string, chapterId: string): Adventure[] {
  return ADVENTURES.filter((a) =>
    a.missions.some((m) => m.notions.some((n) => n.classId === classId && n.subject === subject && n.chapterId === chapterId)),
  );
}
