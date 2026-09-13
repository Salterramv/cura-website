create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  career_id uuid not null references public.careers(id) on delete cascade,

  -- Applicant details
  full_name text not null,
  email text not null,
  phone text,
  id_number text,
  date_of_birth date,
  address text,

  -- Application information
  cover_letter text,
  education text,
  professional_qualifications text,
  years_of_experience numeric,
  current_employer text,
  current_position text,
  expected_salary text,
  notice_period text,

  -- Additional information
  linkedin_url text,
  portfolio_url text,
  additional_information text,

  -- Application management
  status text not null default 'new'
    check (status in (
      'new',
      'under_review',
      'shortlisted',
      'interview',
      'selected',
      'rejected'
    )),
  admin_notes text,

  -- Email tracking
  applicant_email_sent boolean not null default false,
  internal_email_sent boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists career_applications_career_id_idx
  on public.career_applications(career_id);

create index if not exists career_applications_status_idx
  on public.career_applications(status);

create index if not exists career_applications_created_at_idx
  on public.career_applications(created_at desc);


create table if not exists public.career_application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.career_applications(id) on delete cascade,

  document_type text not null,
  original_file_name text not null,
  storage_path text not null,
  mime_type text,
  file_size bigint,

  created_at timestamptz not null default now()
);

create index if not exists career_application_documents_application_id_idx
  on public.career_application_documents(application_id);


alter table public.career_applications enable row level security;
alter table public.career_application_documents enable row level security;


-- Applicants must NOT be able to read other applications.
-- Application creation will be performed securely through the server API.
create policy "Admins can manage career applications"
on public.career_applications
as permissive
for all
to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());


create policy "Admins can manage career application documents"
on public.career_application_documents
as permissive
for all
to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());


-- Keep updated_at current.
create or replace function public.update_career_application_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists career_applications_updated_at
on public.career_applications;

create trigger career_applications_updated_at
before update on public.career_applications
for each row
execute function public.update_career_application_updated_at();


notify pgrst;
