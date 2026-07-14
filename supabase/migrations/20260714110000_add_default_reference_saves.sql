alter table public.creative_references
  add column if not exists source text not null default 'uploaded',
  add column if not exists default_reference_id text,
  add column if not exists user_id uuid references auth.users(id) on delete cascade;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'creative_references_source_check'
  ) then
    alter table public.creative_references
      add constraint creative_references_source_check
      check (source in ('uploaded', 'default'));
  end if;
end $$;

create unique index if not exists creative_references_default_reference_id_key
  on public.creative_references(default_reference_id)
  where default_reference_id is not null;

create table if not exists public.user_default_references (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  default_reference_id text not null,
  creative_reference_id uuid references public.creative_references(id) on delete set null,
  collection_id text not null default 'uncategorized',
  saved_at timestamptz not null default now(),
  unique (user_id, default_reference_id)
);

alter table public.user_default_references enable row level security;

drop policy if exists "Users can read their saved default references"
  on public.user_default_references;
drop policy if exists "Users can save default references"
  on public.user_default_references;
drop policy if exists "Users can delete their saved default references"
  on public.user_default_references;

create policy "Users can read their saved default references"
  on public.user_default_references
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can save default references"
  on public.user_default_references
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete their saved default references"
  on public.user_default_references
  for delete
  to authenticated
  using (auth.uid() = user_id);

create index if not exists user_default_references_user_id_idx
  on public.user_default_references(user_id);

create index if not exists creative_references_user_id_idx
  on public.creative_references(user_id);

create or replace function public.get_user_reference_collection()
returns table (
  collection_entry_id uuid,
  reference_id uuid,
  source text,
  default_reference_id text,
  title text,
  type text,
  url text,
  description text,
  ai_summary text,
  tags text[],
  mood text,
  style text,
  created_at timestamptz,
  saved_at timestamptz
)
language sql
stable
security invoker
as $$
  select
    null::uuid as collection_entry_id,
    r.id as reference_id,
    r.source,
    r.default_reference_id,
    r.title,
    r.type,
    r.url,
    r.description,
    r.ai_summary,
    r.tags,
    r.mood,
    r.style,
    r.created_at,
    r.created_at as saved_at
  from public.creative_references r
  where r.source = 'uploaded'
    and (r.user_id = auth.uid() or r.user_id is null)

  union all

  select
    udr.id as collection_entry_id,
    r.id as reference_id,
    r.source,
    udr.default_reference_id,
    r.title,
    r.type,
    r.url,
    r.description,
    r.ai_summary,
    r.tags,
    r.mood,
    r.style,
    r.created_at,
    udr.saved_at
  from public.user_default_references udr
  join public.creative_references r
    on r.id = udr.creative_reference_id
  where udr.user_id = auth.uid()
  order by saved_at desc;
$$;
