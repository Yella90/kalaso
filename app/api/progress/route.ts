import { NextResponse, type NextRequest } from 'next/server';
import { getViewer } from '@/lib/server/auth';
import { getStore } from '@/lib/server/store';

const MAX_BYTES = 200_000;

// Progression de l'élève connecté : lue et écrite par le navigateur (voir lib/progress/sync.ts).

export async function GET() {
  const viewer = await getViewer();
  const store = getStore();
  if (!viewer || !store) return NextResponse.json({ error: 'non connecté' }, { status: 401 });
  return NextResponse.json({ data: await store.getProgress(viewer.id) });
}

export async function PUT(request: NextRequest) {
  const viewer = await getViewer();
  const store = getStore();
  if (!viewer || !store) return NextResponse.json({ error: 'non connecté' }, { status: 401 });

  const text = await request.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: 'trop volumineux' }, { status: 413 });
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
  }
  const valid =
    typeof data === 'object' &&
    data !== null &&
    ['adventures', 'quizzes', 'chapters'].every((k) => typeof (data as Record<string, unknown>)[k] === 'object');
  if (!valid) return NextResponse.json({ error: 'format inattendu' }, { status: 400 });

  await store.saveProgress(viewer.id, data);
  return NextResponse.json({ ok: true });
}
