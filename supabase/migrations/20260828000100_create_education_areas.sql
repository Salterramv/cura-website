create table if not exists public.education_areas (
  area_key text primary key,
  name text not null,
  description text,
  display_order integer not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists education_areas_display_order_idx
  on public.education_areas(display_order);

alter table public.education_areas enable row level security;

drop policy if exists education_areas_public_select
  on public.education_areas;

create policy education_areas_public_select
on public.education_areas
for select
to public
using (is_active = true or auth.role() = 'service_role');

drop policy if exists education_areas_admin_all
  on public.education_areas;

create policy education_areas_admin_all
on public.education_areas
for all
to public
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');

insert into public.education_areas
  (area_key, name, description, display_order, is_active)
values
  (
    'Accounting',
    'Accounting',
    'Financial reporting, accounting standards and accounting practice.',
    1,
    true
  ),
  (
    'Tax',
    'Tax',
    'Tax principles, legislation, interpretation and practical application.',
    2,
    true
  ),
  (
    'Audit',
    'Audit',
    'Auditing standards, audit methodology, evidence and professional practice.',
    3,
    true
  ),
  (
    'Law',
    'Law',
    'Legal principles, legislation, cases and professional legal knowledge.',
    4,
    true
  )
on conflict (area_key) do update
set
  name = excluded.name,
  description = excluded.description,
  display_order = excluded.display_order,
  updated_at = now();

create or replace function public.update_education_areas_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists education_areas_updated_at
  on public.education_areas;

create trigger education_areas_updated_at
before update on public.education_areas
for each row
execute function public.update_education_areas_updated_at();

notify pgrst;
