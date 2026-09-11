-- CURA SITE CONTENT CMS

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  area text not null
    check (area in ('homepage', 'header', 'footer', 'global')),
  section_key text not null,
  item_key text not null,
  item_type text not null
    check (
      item_type in (
        'text',
        'rich_text',
        'button',
        'link',
        'image',
        'toggle',
        'menu',
        'dropdown_item',
        'number',
        'contact'
      )
    ),
  label text not null,
  value text,
  url text,
  image_url text,
  visible boolean not null default true,
  sort_order integer not null default 0,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint site_content_area_section_item_unique
    unique (area, section_key, item_key)
);

create index if not exists site_content_area_idx
  on public.site_content(area);

create index if not exists site_content_area_section_idx
  on public.site_content(area, section_key);

create index if not exists site_content_visible_idx
  on public.site_content(area, visible);

create index if not exists site_content_sort_order_idx
  on public.site_content(area, section_key, sort_order);

create or replace function public.update_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_updated_at
  on public.site_content;

create trigger site_content_updated_at
before update on public.site_content
for each row
execute function public.update_site_content_updated_at();

alter table public.site_content enable row level security;

drop policy if exists site_content_public_select
  on public.site_content;

create policy site_content_public_select
on public.site_content
for select
to anon, authenticated
using (visible = true);

drop policy if exists site_content_admin_select
  on public.site_content;

create policy site_content_admin_select
on public.site_content
for select
to authenticated
using (public.is_current_user_admin());

drop policy if exists site_content_admin_insert
  on public.site_content;

create policy site_content_admin_insert
on public.site_content
for insert
to authenticated
with check (public.is_current_user_admin());

drop policy if exists site_content_admin_update
  on public.site_content;

create policy site_content_admin_update
on public.site_content
for update
to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());

drop policy if exists site_content_admin_delete
  on public.site_content;

create policy site_content_admin_delete
on public.site_content
for delete
to authenticated
using (public.is_current_user_admin());

grant select on public.site_content to anon, authenticated;
grant insert, update, delete on public.site_content to authenticated;

notify pgrst;
