-- Kalanso : comptes élèves et activation annuelle.
-- Supabase sert uniquement de base de données : pas de Supabase Auth.
-- Les tables sont préfixées « kalanso_ » : elles peuvent vivre dans un projet Supabase partagé
-- avec une autre application sans rien mélanger.
-- Toutes les tables sont protégées par RLS sans aucune politique : seul le serveur Kalanso,
-- avec la clé « service_role », peut les lire ou les écrire. Le navigateur n'y a jamais accès.

-- gen_random_uuid() est intégré à PostgreSQL depuis la version 13 : aucune extension à installer.

create table if not exists public.kalanso_users (
  id uuid primary key default gen_random_uuid(),
  -- Numéro de téléphone malien normalisé sur 8 chiffres : c'est l'identifiant de connexion.
  phone text not null unique check (phone ~ '^[0-9]{8}$'),
  name text not null check (char_length(name) between 2 and 80),
  class_id text check (class_id in ('7e', '8e', '9e', '10e', '11e', '12e')),
  -- Format « scrypt$sel$empreinte », calculé par le serveur.
  password_hash text not null,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.kalanso_sessions (
  -- Empreinte SHA-256 du jeton du cookie : le jeton lui-même n'est jamais stocké.
  token_hash text primary key,
  user_id uuid not null references public.kalanso_users (id) on delete cascade,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists kalanso_sessions_user_id_idx on public.kalanso_sessions (user_id);

create table if not exists public.kalanso_activation_codes (
  code text primary key,
  -- Année scolaire couverte, par exemple « 2026-2027 ».
  school_year text not null,
  expires_at timestamptz not null,
  max_uses integer not null default 1 check (max_uses > 0),
  uses integer not null default 0 check (uses >= 0),
  note text,
  created_by uuid references public.kalanso_users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.kalanso_activations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.kalanso_users (id) on delete cascade,
  code text not null references public.kalanso_activation_codes (code),
  activated_at timestamptz not null default now(),
  expires_at timestamptz not null,
  unique (user_id, code)
);
create index if not exists kalanso_activations_user_id_idx on public.kalanso_activations (user_id);

create table if not exists public.kalanso_progress (
  user_id uuid primary key references public.kalanso_users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Utilise un code de façon atomique : deux élèves ne peuvent pas prendre la dernière place en même temps.
create or replace function public.kalanso_redeem_activation_code(p_user_id uuid, p_code text)
returns table (expires_at timestamptz, school_year text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_code public.kalanso_activation_codes;
begin
  select * into v_code from public.kalanso_activation_codes c where c.code = p_code for update;
  if not found then
    raise exception 'code_inconnu';
  end if;
  if v_code.expires_at <= now() then
    raise exception 'code_expire';
  end if;
  if exists (select 1 from public.kalanso_activations a where a.user_id = p_user_id and a.code = p_code) then
    raise exception 'code_deja_utilise_par_vous';
  end if;
  if v_code.uses >= v_code.max_uses then
    raise exception 'code_epuise';
  end if;
  update public.kalanso_activation_codes set uses = uses + 1 where code = p_code;
  insert into public.kalanso_activations (user_id, code, expires_at) values (p_user_id, p_code, v_code.expires_at);
  return query select v_code.expires_at, v_code.school_year;
end;
$$;

revoke all on function public.kalanso_redeem_activation_code(uuid, text) from public, anon, authenticated;
grant execute on function public.kalanso_redeem_activation_code(uuid, text) to service_role;

alter table public.kalanso_users enable row level security;
alter table public.kalanso_sessions enable row level security;
alter table public.kalanso_activation_codes enable row level security;
alter table public.kalanso_activations enable row level security;
alter table public.kalanso_progress enable row level security;

-- Double protection, utile dans un projet partagé : les rôles publics n'ont aucun droit sur ces tables.
revoke all on public.kalanso_users, public.kalanso_sessions, public.kalanso_activation_codes,
  public.kalanso_activations, public.kalanso_progress from anon, authenticated;
