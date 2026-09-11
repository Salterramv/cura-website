-- CURA SITE CONTENT CMS - DESIGN / DEFAULTS / FLEXIBLE FOOTER UPGRADE

alter table public.site_content
  add column if not exists default_value text,
  add column if not exists default_url text,
  add column if not exists default_image_url text,
  add column if not exists default_visible boolean,
  add column if not exists default_sort_order integer,
  add column if not exists is_custom boolean not null default false;

-- Preserve the current CURA version as the default wherever a default
-- has not already been recorded.
update public.site_content
set
  default_value = coalesce(default_value, value),
  default_url = coalesce(default_url, url),
  default_image_url = coalesce(default_image_url, image_url),
  default_visible = coalesce(default_visible, visible),
  default_sort_order = coalesce(default_sort_order, sort_order)
where
  default_value is null
   or default_url is null
   or default_image_url is null
   or default_visible is null
   or default_sort_order is null;

-- Helpful indexes for flexible CMS structures.
create index if not exists site_content_custom_idx
  on public.site_content(area, is_custom);

create index if not exists site_content_item_type_idx
  on public.site_content(area, item_type);

notify pgrst;
