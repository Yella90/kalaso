'use server';

import { redirect } from 'next/navigation';
import {
  endSession,
  generateActivationCode,
  getViewer,
  hashPassword,
  isAdminPhone,
  normalizeCode,
  normalizePhone,
  startSession,
  verifyPassword,
} from '@/lib/server/auth';
import { getStore } from '@/lib/server/store';
import { CLASSES } from '@/lib/curriculum';
import { hasLocale } from '@/lib/i18n';

// Chaque action renvoie une clé d'erreur (traduite à l'écran) ou redirige en cas de succès.
export type FormState = { error?: string; message?: string; codes?: string[] } | undefined;

function localeOf(formData: FormData): string {
  const lang = String(formData.get('lang') ?? 'fr');
  return hasLocale(lang) ? lang : 'fr';
}

/** N'accepte qu'un chemin interne au site, pour ne pas renvoyer l'élève ailleurs après connexion. */
function safeNext(formData: FormData, lang: string): string {
  const next = String(formData.get('next') ?? '');
  return next.startsWith(`/${lang}/`) || next === `/${lang}` ? next : `/${lang}/compte`;
}

export async function register(_: FormState, formData: FormData): Promise<FormState> {
  const store = getStore();
  if (!store) return { error: 'unavailable' };
  const lang = localeOf(formData);
  const name = String(formData.get('name') ?? '').trim();
  const phone = normalizePhone(String(formData.get('phone') ?? ''));
  const password = String(formData.get('password') ?? '');
  const classId = String(formData.get('classId') ?? '');

  if (name.length < 2 || name.length > 80) return { error: 'name' };
  if (!phone) return { error: 'phone' };
  if (password.length < 8 || password.length > 200) return { error: 'password' };
  if (await store.findUserByPhone(phone)) return { error: 'taken' };

  try {
    const user = await store.createUser({
      name,
      phone,
      class_id: CLASSES.some((c) => c.id === classId) ? classId : null,
      password_hash: await hashPassword(password),
      role: isAdminPhone(phone) ? 'admin' : 'student',
    });
    await startSession(user.id);
  } catch {
    return { error: 'server' };
  }
  redirect(safeNext(formData, lang));
}

export async function login(_: FormState, formData: FormData): Promise<FormState> {
  const store = getStore();
  if (!store) return { error: 'unavailable' };
  const lang = localeOf(formData);
  const phone = normalizePhone(String(formData.get('phone') ?? ''));
  const password = String(formData.get('password') ?? '');
  const user = phone ? await store.findUserByPhone(phone) : null;
  // Même message que le numéro soit inconnu ou le mot de passe faux : on ne dit pas quels numéros existent.
  if (!user || !(await verifyPassword(password, user.password_hash))) return { error: 'credentials' };
  try {
    await startSession(user.id);
  } catch {
    return { error: 'server' };
  }
  redirect(safeNext(formData, lang));
}

export async function logout(formData: FormData) {
  await endSession();
  redirect(`/${localeOf(formData)}`);
}

export async function activate(_: FormState, formData: FormData): Promise<FormState> {
  const store = getStore();
  const viewer = await getViewer();
  if (!store || !viewer) return { error: 'unavailable' };
  const code = normalizeCode(String(formData.get('code') ?? ''));
  try {
    const result = await store.redeemCode(viewer.id, code);
    if (!result.ok) return { error: result.error };
    return { message: result.expires_at };
  } catch {
    return { error: 'server' };
  }
}

export async function createCodes(_: FormState, formData: FormData): Promise<FormState> {
  const store = getStore();
  const viewer = await getViewer();
  if (!store || viewer?.role !== 'admin') return { error: 'forbidden' };
  const count = Math.min(200, Math.max(1, Number(formData.get('count')) || 0));
  const schoolYear = String(formData.get('schoolYear') ?? '').trim();
  const expires = new Date(String(formData.get('expiresAt') ?? ''));
  const note = String(formData.get('note') ?? '').trim() || null;
  if (!/^\d{4}-\d{4}$/.test(schoolYear) || Number.isNaN(expires.getTime()) || expires <= new Date()) return { error: 'adminForm' };

  const codes = Array.from({ length: count }, () => generateActivationCode());
  try {
    await store.createCodes(
      codes.map((code) => ({ code, school_year: schoolYear, expires_at: expires.toISOString(), max_uses: 1, note })),
      viewer.id,
    );
  } catch {
    return { error: 'server' };
  }
  return { codes };
}
