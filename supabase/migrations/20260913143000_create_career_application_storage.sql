insert into storage.buckets (id, name, public)
values ('career-applications', 'career-applications', false)
on conflict (id) do update
set public = false;

create policy "Admins can view career application files"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'career-applications'
  and public.is_current_user_admin()
);

create policy "Admins can manage career application files"
on storage.objects
for all
to authenticated
using (
  bucket_id = 'career-applications'
  and public.is_current_user_admin()
)
with check (
  bucket_id = 'career-applications'
  and public.is_current_user_admin()
);
