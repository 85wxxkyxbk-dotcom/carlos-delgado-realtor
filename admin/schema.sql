-- ════════════════════════════════════════════════════════════════
--  Carlos Delgado Realty · Panel /admin · Esquema completo
--  Proyecto Supabase: carlos-delgado-realty-admin (alrspggdnsghnltiioaj)
--  Ya está aplicado en la base. Este archivo es para tus registros /
--  para reconstruir el esquema en otro proyecto si hiciera falta.
-- ════════════════════════════════════════════════════════════════

-- ── ADMIN USERS (perfil ligado a auth.users) ──
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text, full_name text, role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ── LISTA BLANCA de correos autorizados a ser admin ──
create table if not exists public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

-- ── PROPERTIES ──
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  city text, state text default 'FL', zip text,
  property_type text default 'casa',   -- casa, condo, townhouse, multifamily, terreno, comercial, otro
  status text not null default 'activa',-- activa, pendiente, bajo_contrato, vendida, rentada, archivada
  deal_nature text not null default 'realtor', -- realtor (solo comisión) | investment (inversión propia)
  purchase_price numeric, list_price numeric, sold_price numeric,
  list_date date, close_date date,
  repair_costs numeric default 0, closing_costs numeric default 0, other_costs numeric default 0,
  commission_pct numeric, commission_amount numeric,
  deal_source text, internal_notes text, photos text, public_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- COLUMNAS CALCULADAS AUTOMÁTICAS
  estimated_profit numeric generated always as (
    sold_price - coalesce(purchase_price,0) - coalesce(repair_costs,0)
    - coalesce(closing_costs,0) - coalesce(other_costs,0)) stored,
  days_on_market integer generated always as (close_date - list_date) stored,
  price_diff numeric generated always as (sold_price - list_price) stored,
  commission_calc numeric generated always as (
    coalesce(commission_amount, (commission_pct/100.0) * sold_price)) stored
);

-- ── LEADS ──
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text, phone text,
  property_id uuid references public.properties(id) on delete set null,
  source text default 'website',  -- website, instagram, facebook, google, referido, zillow, realtor.com, llamada, otro
  status text not null default 'nuevo', -- nuevo, contactado, interesado, cliente_activo, cerrado, perdido
  budget numeric, interest_type text,   -- comprar, vender, rentar, invertir
  next_followup date, internal_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ── ACTIVITY LOGS ──
create table if not exists public.activity_logs (
  id bigint generated always as identity primary key,
  actor_email text, action text, entity text, entity_id text,
  details jsonb, created_at timestamptz not null default now()
);

create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_property on public.leads(property_id);
create index if not exists idx_properties_status on public.properties(status);

-- ── TRIGGERS ──
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at = now(); return new; end; $$;
create trigger trg_props_updated before update on public.properties
  for each row execute function public.set_updated_at();
create trigger trg_leads_updated before update on public.leads
  for each row execute function public.set_updated_at();

-- Concede admin SOLO a correos de la lista blanca al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from public.admin_allowlist w where w.email = new.email) then
    insert into public.admin_users (id, email, full_name)
    values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email))
    on conflict (id) do nothing;
  end if;
  return new;
end; $$;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── RLS (Row Level Security) ──
alter table public.admin_users    enable row level security;
alter table public.admin_allowlist enable row level security;
alter table public.properties     enable row level security;
alter table public.leads          enable row level security;
alter table public.activity_logs  enable row level security;

create policy "admin reads own row" on public.admin_users
  for select to authenticated using (id = auth.uid());
create policy "admins read allowlist" on public.admin_allowlist
  for select to authenticated using (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "admins manage properties" on public.properties
  for all to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "admins manage leads" on public.leads
  for all to authenticated
  using (exists (select 1 from public.admin_users a where a.id = auth.uid()))
  with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "admins read activity" on public.activity_logs
  for select to authenticated using (exists (select 1 from public.admin_users a where a.id = auth.uid()));
create policy "admins write activity" on public.activity_logs
  for insert to authenticated with check (exists (select 1 from public.admin_users a where a.id = auth.uid()));
-- El formulario público (anónimo) SOLO puede insertar leads
create policy "public insert leads" on public.leads
  for insert to anon with check (true);
