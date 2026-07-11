create extension if not exists vector;
create extension if not exists pgcrypto;

create table if not exists public.creative_references (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  url text,
  description text not null,
  ai_summary text,
  tags text[] default '{}',
  mood text,
  style text,
  embedding vector(1536),
  created_at timestamptz not null default now()
);

alter table public.creative_references enable row level security;

drop policy if exists "Public read creative references" on public.creative_references;

create policy "Public read creative references"
  on public.creative_references
  for select
  to anon, authenticated
  using (true);

create index if not exists creative_references_embedding_idx
  on public.creative_references
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create or replace function public.match_references(
  query_embedding vector(1536),
  reference_type text,
  match_count int default 5,
  match_threshold float default 0.2
)
returns table (
  id uuid,
  title text,
  type text,
  url text,
  description text,
  ai_summary text,
  tags text[],
  mood text,
  style text,
  created_at timestamptz,
  similarity float
)
language sql
stable
as $$
  select
    r.id,
    r.title,
    r.type,
    r.url,
    r.description,
    r.ai_summary,
    r.tags,
    r.mood,
    r.style,
    r.created_at,
    1 - (r.embedding <=> query_embedding) as similarity
  from public.creative_references r
  where r.embedding is not null
    and r.type <> reference_type
    and 1 - (r.embedding <=> query_embedding) > match_threshold
  order by r.embedding <=> query_embedding
  limit match_count;
$$;
