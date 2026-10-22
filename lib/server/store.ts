import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Accès aux données des comptes. En production : Supabase (clé service_role, côté serveur uniquement).
// En développement sans variables d'environnement : une base en mémoire, pour tester les écrans.

export type Role = 'student' | 'teacher' | 'admin';

/** Tables préfixées : la base peut être partagée avec une autre application (voir supabase/migrations). */
const T = {
  users: 'kalanso_users',
  sessions: 'kalanso_sessions',
  activation_codes: 'kalanso_activation_codes',
  activations: 'kalanso_activations',
  progress: 'kalanso_progress',
} as const;

export interface UserRow {
  id: string;
  phone: string;
  name: string;
  class_id: string | null;
  password_hash: string;
  role: Role;
  created_at: string;
}

export interface CodeRow {
  code: string;
  school_year: string;
  expires_at: string;
  max_uses: number;
  uses: number;
  note: string | null;
  created_at: string;
}

export interface ActivationRow {
  code: string;
  activated_at: string;
  expires_at: string;
}

export type RedeemError = 'code_inconnu' | 'code_expire' | 'code_deja_utilise_par_vous' | 'code_epuise';

export interface Store {
  findUserByPhone(phone: string): Promise<UserRow | null>;
  findUserById(id: string): Promise<UserRow | null>;
  createUser(user: Omit<UserRow, 'id' | 'created_at'>): Promise<UserRow>;
  createSession(tokenHash: string, userId: string, expiresAt: Date): Promise<void>;
  findSession(tokenHash: string): Promise<{ user_id: string; expires_at: string } | null>;
  deleteSession(tokenHash: string): Promise<void>;
  createCodes(codes: Omit<CodeRow, 'uses' | 'created_at'>[], createdBy: string): Promise<void>;
  listCodes(limit: number): Promise<CodeRow[]>;
  redeemCode(userId: string, code: string): Promise<{ ok: true; expires_at: string } | { ok: false; error: RedeemError }>;
  listActivations(userId: string): Promise<ActivationRow[]>;
  getProgress(userId: string): Promise<unknown>;
  saveProgress(userId: string, data: unknown): Promise<void>;
}

class SupabaseStore implements Store {
  constructor(private db: SupabaseClient) {}

  private async one<T>(query: PromiseLike<{ data: T | null; error: { message: string } | null }>): Promise<T | null> {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }

  findUserByPhone(phone: string) {
    return this.one<UserRow>(this.db.from(T.users).select('*').eq('phone', phone).maybeSingle());
  }

  findUserById(id: string) {
    return this.one<UserRow>(this.db.from(T.users).select('*').eq('id', id).maybeSingle());
  }

  async createUser(user: Omit<UserRow, 'id' | 'created_at'>) {
    return (await this.one<UserRow>(this.db.from(T.users).insert(user).select('*').single()))!;
  }

  async createSession(tokenHash: string, userId: string, expiresAt: Date) {
    await this.one(this.db.from(T.sessions).insert({ token_hash: tokenHash, user_id: userId, expires_at: expiresAt.toISOString() }));
  }

  findSession(tokenHash: string) {
    return this.one<{ user_id: string; expires_at: string }>(
      this.db.from(T.sessions).select('user_id, expires_at').eq('token_hash', tokenHash).maybeSingle(),
    );
  }

  async deleteSession(tokenHash: string) {
    await this.one(this.db.from(T.sessions).delete().eq('token_hash', tokenHash));
  }

  async createCodes(codes: Omit<CodeRow, 'uses' | 'created_at'>[], createdBy: string) {
    await this.one(this.db.from(T.activation_codes).insert(codes.map((c) => ({ ...c, created_by: createdBy }))));
  }

  async listCodes(limit: number) {
    return (await this.one<CodeRow[]>(this.db.from(T.activation_codes).select('*').order('created_at', { ascending: false }).limit(limit))) ?? [];
  }

  async redeemCode(userId: string, code: string) {
    const { data, error } = await this.db.rpc('kalanso_redeem_activation_code', { p_user_id: userId, p_code: code });
    if (error) {
      const known: RedeemError[] = ['code_inconnu', 'code_expire', 'code_deja_utilise_par_vous', 'code_epuise'];
      const match = known.find((k) => error.message.includes(k));
      if (match) return { ok: false as const, error: match };
      throw new Error(error.message);
    }
    const row = (data as { expires_at: string }[])[0];
    return { ok: true as const, expires_at: row.expires_at };
  }

  async listActivations(userId: string) {
    return (
      (await this.one<ActivationRow[]>(
        this.db.from(T.activations).select('code, activated_at, expires_at').eq('user_id', userId).order('expires_at', { ascending: false }),
      )) ?? []
    );
  }

  async getProgress(userId: string) {
    const row = await this.one<{ data: unknown }>(this.db.from(T.progress).select('data').eq('user_id', userId).maybeSingle());
    return row?.data ?? null;
  }

  async saveProgress(userId: string, data: unknown) {
    await this.one(this.db.from(T.progress).upsert({ user_id: userId, data, updated_at: new Date().toISOString() }));
  }
}

/** Base en mémoire pour le développement local : tout est perdu au redémarrage du serveur. */
class MemoryStore implements Store {
  users = new Map<string, UserRow>();
  sessions = new Map<string, { user_id: string; expires_at: string }>();
  codes = new Map<string, CodeRow>();
  activations: (ActivationRow & { user_id: string })[] = [];
  progress = new Map<string, unknown>();

  async findUserByPhone(phone: string) {
    return [...this.users.values()].find((u) => u.phone === phone) ?? null;
  }
  async findUserById(id: string) {
    return this.users.get(id) ?? null;
  }
  async createUser(user: Omit<UserRow, 'id' | 'created_at'>) {
    if (await this.findUserByPhone(user.phone)) throw new Error('duplicate key value violates unique constraint');
    const row = { ...user, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    this.users.set(row.id, row);
    return row;
  }
  async createSession(tokenHash: string, userId: string, expiresAt: Date) {
    this.sessions.set(tokenHash, { user_id: userId, expires_at: expiresAt.toISOString() });
  }
  async findSession(tokenHash: string) {
    return this.sessions.get(tokenHash) ?? null;
  }
  async deleteSession(tokenHash: string) {
    this.sessions.delete(tokenHash);
  }
  async createCodes(codes: Omit<CodeRow, 'uses' | 'created_at'>[]) {
    for (const c of codes) this.codes.set(c.code, { ...c, uses: 0, created_at: new Date().toISOString() });
  }
  async listCodes(limit: number) {
    return [...this.codes.values()].reverse().slice(0, limit);
  }
  async redeemCode(userId: string, code: string) {
    const c = this.codes.get(code);
    if (!c) return { ok: false as const, error: 'code_inconnu' as const };
    if (new Date(c.expires_at) <= new Date()) return { ok: false as const, error: 'code_expire' as const };
    if (this.activations.some((a) => a.user_id === userId && a.code === code))
      return { ok: false as const, error: 'code_deja_utilise_par_vous' as const };
    if (c.uses >= c.max_uses) return { ok: false as const, error: 'code_epuise' as const };
    c.uses += 1;
    this.activations.push({ user_id: userId, code, activated_at: new Date().toISOString(), expires_at: c.expires_at });
    return { ok: true as const, expires_at: c.expires_at };
  }
  async listActivations(userId: string) {
    return this.activations.filter((a) => a.user_id === userId);
  }
  async getProgress(userId: string) {
    return this.progress.get(userId) ?? null;
  }
  async saveProgress(userId: string, data: unknown) {
    this.progress.set(userId, data);
  }
}

const globalStore = globalThis as unknown as { kalansoStore?: Store | null };

/** Renvoie la base, ou `null` si les comptes ne sont pas configurés sur ce serveur. */
export function getStore(): Store | null {
  if (globalStore.kalansoStore !== undefined) return globalStore.kalansoStore;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (url && key) {
    globalStore.kalansoStore = new SupabaseStore(createClient(url, key, { auth: { persistSession: false } }));
  } else if (process.env.NODE_ENV !== 'production') {
    globalStore.kalansoStore = new MemoryStore();
  } else {
    globalStore.kalansoStore = null;
  }
  return globalStore.kalansoStore;
}
