import 'server-only';
import { createHash, randomBytes, randomInt, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { getStore, type Role } from './store';

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export const SESSION_COOKIE = 'kalanso_session';
const SESSION_DAYS = 90;

// ---------- Mots de passe ----------

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString('base64')}$${hash.toString('base64')}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [scheme, saltB64, hashB64] = stored.split('$');
  if (scheme !== 'scrypt' || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, 'base64');
  const actual = await scrypt(password, Buffer.from(saltB64, 'base64'), expected.length);
  return timingSafeEqual(actual, expected);
}

// ---------- Numéros de téléphone ----------

/** Garde les 8 chiffres d'un numéro malien : « +223 76 01 61 95 » → « 76016195 ». */
export function normalizePhone(input: string): string | null {
  let digits = input.replace(/\D/g, '');
  if (digits.startsWith('00223')) digits = digits.slice(5);
  else if (digits.startsWith('223') && digits.length === 11) digits = digits.slice(3);
  return /^[0-9]{8}$/.test(digits) ? digits : null;
}

/** Numéros déclarés administrateurs dans la configuration du serveur. */
export function isAdminPhone(phone: string): boolean {
  return (process.env.ADMIN_PHONES ?? '')
    .split(',')
    .map((p) => normalizePhone(p))
    .includes(phone);
}

// ---------- Sessions ----------

function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/** À appeler dans une Server Action : crée la session et pose le cookie. */
export async function startSession(userId: string) {
  const store = getStore();
  if (!store) throw new Error('Comptes non configurés');
  const token = randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 3600 * 1000);
  await store.createSession(hashToken(token), userId, expires);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  });
}

/** À appeler dans une Server Action : supprime la session et le cookie. */
export async function endSession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await getStore()?.deleteSession(hashToken(token));
  jar.delete(SESSION_COOKIE);
}

export interface Viewer {
  id: string;
  name: string;
  phone: string;
  classId: string | null;
  role: Role;
  /** Fin de l'abonnement en cours, ou `null` si l'élève n'a pas d'activation valide. */
  activeUntil: string | null;
}

/** L'utilisateur connecté, lu une seule fois par requête. */
export const getViewer = cache(async (): Promise<Viewer | null> => {
  // On lit le cookie en premier, même sans base configurée : la page est ainsi toujours rendue
  // à la demande, et un contenu réservé ne peut pas être figé au moment de la compilation.
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const store = getStore();
  if (!store) return null;
  if (!token) return null;
  const session = await store.findSession(hashToken(token));
  if (!session || new Date(session.expires_at) <= new Date()) return null;
  const user = await store.findUserById(session.user_id);
  if (!user) return null;
  const now = new Date();
  const active = (await store.listActivations(user.id)).find((a) => new Date(a.expires_at) > now);
  return {
    id: user.id,
    name: user.name,
    phone: user.phone,
    classId: user.class_id,
    role: user.role,
    // Les enseignants et administrateurs ont accès à tout, sans code.
    activeUntil: user.role !== 'student' ? '9999-12-31T00:00:00Z' : (active?.expires_at ?? null),
  };
});

/** Les comptes sont-ils configurés sur ce serveur ? Sinon, tout le contenu reste ouvert. */
export function accountsEnabled(): boolean {
  return getStore() !== null;
}

export function hasFullAccess(viewer: Viewer | null): boolean {
  return !accountsEnabled() || Boolean(viewer?.activeUntil);
}

// ---------- Codes d'activation ----------

// Sans 0/O ni 1/I/L, pour éviter les erreurs de lecture sur un reçu ou au téléphone.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateActivationCode(): string {
  const chars = Array.from({ length: 8 }, () => ALPHABET[randomInt(ALPHABET.length)]);
  return `KLS-${chars.slice(0, 4).join('')}-${chars.slice(4).join('')}`;
}

export function normalizeCode(input: string): string {
  const raw = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const body = raw.startsWith('KLS') ? raw.slice(3) : raw;
  return body.length === 8 ? `KLS-${body.slice(0, 4)}-${body.slice(4)}` : input.trim().toUpperCase();
}
