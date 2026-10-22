import type { Locale } from '@/lib/i18n';
import { ADVENTURES_BM } from './content-bm';
import { adventure as champCooperative } from './content/champ-cooperative';
import { adventure as eauDuPuits } from './content/eau-du-puits';
import { adventure as enquetePaludisme } from './content/enquete-paludisme';
import { adventure as motoElectrique } from './content/moto-electrique';
import { adventure as pompeSolaire } from './content/pompe-solaire';
import type { Adventure } from './types';

export type { Adventure, Challenge, ChapterRef, Mission } from './types';

// Rangées de la plus jeune classe à la plus avancée.
const ADVENTURES: Adventure[] = [pompeSolaire, champCooperative, enquetePaludisme, eauDuPuits, motoElectrique];

/**
 * Remplace les textes par leur traduction, mission par mission. Les nombres, réponses, tolérances
 * et références aux chapitres restent ceux de la version française : une erreur de traduction
 * ne peut pas fausser un défi.
 */
function localize(adventure: Adventure, locale: Locale): Adventure {
  const text = locale === 'bm' ? ADVENTURES_BM[adventure.id] : undefined;
  if (!text) return adventure;
  return {
    ...adventure,
    title: text.title,
    pitch: text.pitch,
    intro: text.intro,
    outro: text.outro,
    missions: adventure.missions.map((mission) => {
      const m = text.missions[mission.id];
      if (!m) return mission;
      const challenge =
        mission.challenge.kind === 'numeric'
          ? { ...mission.challenge, question: m.question, unit: m.unit ?? mission.challenge.unit }
          : { ...mission.challenge, question: m.question, choices: m.choices ?? mission.challenge.choices };
      return { ...mission, title: m.title, story: m.story, data: m.data ?? mission.data, challenge, hints: m.hints, solution: m.solution, debrief: m.debrief };
    }),
  };
}

export function getAdventures(locale: Locale = 'fr'): Adventure[] {
  return ADVENTURES.map((a) => localize(a, locale));
}

export function getAdventure(id: string, locale: Locale = 'fr'): Adventure | undefined {
  const adventure = ADVENTURES.find((a) => a.id === id);
  return adventure && localize(adventure, locale);
}

/** Aventures dont au moins une mission utilise ce chapitre. */
export function getAdventuresForChapter(classId: string, subject: string, chapterId: string, locale: Locale = 'fr'): Adventure[] {
  return getAdventures(locale).filter((a) =>
    a.missions.some((m) => m.notions.some((n) => n.classId === classId && n.subject === subject && n.chapterId === chapterId)),
  );
}
