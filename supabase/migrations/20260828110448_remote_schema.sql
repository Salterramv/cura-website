create extension if not exists "pg_cron" with schema "pg_catalog";

drop trigger if exists "education_areas_updated_at" on "public"."education_areas";

drop policy "education_areas_admin_all" on "public"."education_areas";

drop policy "education_areas_public_select" on "public"."education_areas";

revoke delete on table "public"."education_areas" from "anon";

revoke insert on table "public"."education_areas" from "anon";

revoke references on table "public"."education_areas" from "anon";

revoke select on table "public"."education_areas" from "anon";

revoke trigger on table "public"."education_areas" from "anon";

revoke truncate on table "public"."education_areas" from "anon";

revoke update on table "public"."education_areas" from "anon";

revoke delete on table "public"."education_areas" from "authenticated";

revoke insert on table "public"."education_areas" from "authenticated";

revoke references on table "public"."education_areas" from "authenticated";

revoke select on table "public"."education_areas" from "authenticated";

revoke trigger on table "public"."education_areas" from "authenticated";

revoke truncate on table "public"."education_areas" from "authenticated";

revoke update on table "public"."education_areas" from "authenticated";

revoke delete on table "public"."education_areas" from "service_role";

revoke insert on table "public"."education_areas" from "service_role";

revoke references on table "public"."education_areas" from "service_role";

revoke select on table "public"."education_areas" from "service_role";

revoke trigger on table "public"."education_areas" from "service_role";

revoke truncate on table "public"."education_areas" from "service_role";

revoke update on table "public"."education_areas" from "service_role";

drop function if exists "public"."update_education_areas_updated_at"();

alter table "public"."education_areas" drop constraint "education_areas_pkey";

drop index if exists "public"."education_areas_display_order_idx";

drop index if exists "public"."education_areas_pkey";

drop table "public"."education_areas";


  create table "public"."admin_users" (
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."admin_users" enable row level security;


  create table "public"."articles" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "title" text not null,
    "category" text not null,
    "description" text,
    "content" text not null default ''::text,
    "published_date" date,
    "published" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "author_name" text
      );


alter table "public"."articles" enable row level security;


  create table "public"."careers" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "slug" text,
    "department" text,
    "location" text,
    "employment_type" text,
    "description" text,
    "responsibilities" text,
    "qualifications" text,
    "application_instructions" text,
    "closing_date" date,
    "published" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."careers" enable row level security;


  create table "public"."case_documents" (
    "id" uuid not null default gen_random_uuid(),
    "proceeding_id" uuid not null,
    "title" text,
    "url" text,
    "source_type" text,
    "language" text,
    "document_date" date,
    "original_text" text,
    "english_translation" text,
    "cura_summary" text,
    "cura_legal_principle" text,
    "cura_implications" text,
    "processing_status" text not null default 'pending'::text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."case_documents" enable row level security;


  create table "public"."case_issues" (
    "id" uuid not null default gen_random_uuid(),
    "case_id" uuid not null,
    "issue" text not null,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."case_issues" enable row level security;


  create table "public"."case_proceedings" (
    "id" uuid not null default gen_random_uuid(),
    "case_id" uuid not null,
    "court" text not null,
    "case_number" text,
    "filed_date" date,
    "judgment_date" date,
    "status" text,
    "outcome" text,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now(),
    "source_url" text,
    "source_title" text,
    "source_type" text,
    "source_status" text not null default 'needs_verification'::text,
    "source_verified_at" timestamp with time zone,
    "source_verified_by" uuid,
    "source_notes" text,
    "official_url" text,
    "source_search_attempted_at" timestamp with time zone
      );


alter table "public"."case_proceedings" enable row level security;


  create table "public"."case_sources" (
    "id" uuid not null default gen_random_uuid(),
    "case_id" uuid not null,
    "title" text not null,
    "url" text,
    "source_type" text default 'Official Source'::text,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."case_sources" enable row level security;


  create table "public"."case_timeline" (
    "id" uuid not null default gen_random_uuid(),
    "case_id" uuid not null,
    "event_date" date,
    "year" text,
    "court" text,
    "description" text,
    "sort_order" integer default 0,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."case_timeline" enable row level security;


  create table "public"."cura_case_processing_queue" (
    "id" uuid not null default gen_random_uuid(),
    "legal_matter_id" uuid not null,
    "status" text not null default 'pending'::text,
    "priority" integer not null default 100,
    "source_url" text,
    "source_case_count" integer not null default 0,
    "has_judgment" boolean not null default false,
    "has_official_source" boolean not null default false,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "verification_status" text not null default 'pending'::text,
    "verified_by" text,
    "verified_at" timestamp with time zone
      );


alter table "public"."cura_case_processing_queue" enable row level security;


  create table "public"."education_assets" (
    "id" uuid not null default gen_random_uuid(),
    "block_id" uuid,
    "asset_type" text not null default 'image'::text,
    "url" text not null,
    "alt_text" text not null default ''::text,
    "caption" text,
    "display_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "media_alt_text" text,
    "source_note" text,
    "title" text,
    "mime_type" text,
    "file_size" bigint,
    "storage_bucket" text,
    "storage_path" text,
    "width" integer,
    "height" integer
      );


alter table "public"."education_assets" enable row level security;


  create table "public"."education_attempts" (
    "id" uuid not null default gen_random_uuid(),
    "quiz_id" uuid not null,
    "participant_name" character varying(80) not null,
    "score" integer not null,
    "total_points" integer not null,
    "percentage" numeric(5,2) not null,
    "duration_seconds" integer not null default 0,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."education_attempts" enable row level security;


  create table "public"."education_block_items" (
    "id" uuid not null default gen_random_uuid(),
    "block_id" uuid not null,
    "content" text not null,
    "item_type" text not null default 'item'::text,
    "display_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."education_block_items" enable row level security;


  create table "public"."education_content_blocks" (
    "id" uuid not null default gen_random_uuid(),
    "section_id" uuid not null,
    "block_type" text not null default 'paragraph'::text,
    "title" text,
    "content" text not null default ''::text,
    "display_order" integer not null default 0,
    "is_published" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "updated_by" uuid,
    "version" integer not null default 1,
    "presentation" jsonb not null default '{}'::jsonb,
    "editor_label" text,
    "sort_key" numeric
      );


alter table "public"."education_content_blocks" enable row level security;


  create table "public"."education_content_versions" (
    "id" uuid not null default gen_random_uuid(),
    "topic_id" uuid,
    "section_id" uuid,
    "block_id" uuid,
    "version" integer not null,
    "status" text not null default 'draft'::text,
    "snapshot" jsonb not null default '{}'::jsonb,
    "change_summary" text,
    "created_by" uuid,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."education_content_versions" enable row level security;


  create table "public"."education_interactives" (
    "id" uuid not null default gen_random_uuid(),
    "block_id" uuid not null,
    "interactive_type" text not null,
    "config" jsonb not null default '{}'::jsonb,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."education_interactives" enable row level security;


  create table "public"."education_materials" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text not null default ''::text,
    "category" text not null default 'General'::text,
    "resource_type" text not null default 'Guide'::text,
    "url" text not null,
    "is_published" boolean not null default true,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."education_materials" enable row level security;


  create table "public"."education_question_targets" (
    "subject" text not null,
    "target_questions" integer not null,
    "description" text,
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."education_question_targets" enable row level security;


  create table "public"."education_questions" (
    "id" uuid not null default gen_random_uuid(),
    "quiz_id" uuid not null,
    "question_text" text not null,
    "options" jsonb not null,
    "correct_option" integer not null,
    "explanation" text not null default ''::text,
    "source_url" text,
    "points" integer not null default 1,
    "sort_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "subject" text not null default 'Taxation'::text,
    "topic" text not null default 'General'::text,
    "difficulty" text not null default 'Intermediate'::text,
    "status" text not null default 'active'::text,
    "source_name" text,
    "source_section" text,
    "effective_from" date,
    "effective_to" date
      );


alter table "public"."education_questions" enable row level security;


  create table "public"."education_quizzes" (
    "id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "description" text not null default ''::text,
    "category" text not null default 'General'::text,
    "time_limit_seconds" integer not null default 600,
    "is_published" boolean not null default false,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."education_quizzes" enable row level security;


  create table "public"."education_sections" (
    "id" uuid not null default gen_random_uuid(),
    "topic_id" uuid not null,
    "title" text not null,
    "section_type" text not null default 'section'::text,
    "display_order" integer not null default 0,
    "is_published" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "updated_by" uuid,
    "version" integer not null default 1,
    "presentation" jsonb not null default '{}'::jsonb,
    "slug" text
      );


alter table "public"."education_sections" enable row level security;


  create table "public"."education_sources" (
    "id" uuid not null default gen_random_uuid(),
    "topic_id" uuid,
    "section_id" uuid,
    "title" text not null,
    "source_type" text not null default 'pdf'::text,
    "source_reference" text,
    "page_start" integer,
    "page_end" integer,
    "file_url" text,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."education_sources" enable row level security;


  create table "public"."education_tables" (
    "id" uuid not null default gen_random_uuid(),
    "block_id" uuid not null,
    "columns" jsonb not null default '[]'::jsonb,
    "rows" jsonb not null default '[]'::jsonb,
    "caption" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "table_style" jsonb not null default '{}'::jsonb
      );


alter table "public"."education_tables" enable row level security;


  create table "public"."education_test_sessions" (
    "id" uuid not null default gen_random_uuid(),
    "quiz_id" uuid not null,
    "participant_name" character varying(80) not null,
    "started_at" timestamp with time zone not null default now(),
    "expires_at" timestamp with time zone not null,
    "submitted_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "question_ids" uuid[],
    "answer_key" jsonb not null default '{}'::jsonb
      );


alter table "public"."education_test_sessions" enable row level security;


  create table "public"."education_topics" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "title" text not null,
    "standard" text,
    "description" text not null default ''::text,
    "category" text not null default 'Accounting'::text,
    "display_order" integer not null default 0,
    "is_published" boolean not null default true,
    "source_reference" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "status" text not null default 'published'::text,
    "updated_by" uuid,
    "published_at" timestamp with time zone,
    "version" integer not null default 1,
    "visual_theme" text not null default 'cura-professional'::text,
    "slug_editable" boolean not null default true
      );


alter table "public"."education_topics" enable row level security;


  create table "public"."exchange_rates" (
    "id" uuid not null default gen_random_uuid(),
    "rate_date" date not null,
    "mvr_per_usd" numeric(12,6) not null,
    "source" text,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "exchanger_id" uuid,
    "rate_time" time without time zone
      );


alter table "public"."exchange_rates" enable row level security;


  create table "public"."legal_case_analyses" (
    "id" uuid not null default gen_random_uuid(),
    "case_id" uuid not null,
    "version" integer not null,
    "status" text not null default 'draft'::text,
    "source_snapshot" jsonb not null default '[]'::jsonb,
    "generated_data" jsonb not null default '{}'::jsonb,
    "model" text,
    "analyzed_at" timestamp with time zone,
    "verified_at" timestamp with time zone,
    "verified_by" uuid,
    "error_message" text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."legal_case_analyses" enable row level security;


  create table "public"."legal_case_processing_queue" (
    "id" uuid not null default gen_random_uuid(),
    "case_id" uuid not null,
    "status" text not null default 'queued'::text,
    "attempts" integer not null default 0,
    "last_error" text,
    "source_count" integer not null default 0,
    "processed_at" timestamp with time zone,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."legal_case_processing_queue" enable row level security;


  create table "public"."legal_cases" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "title" text not null,
    "category" text default 'Tax Legal Case'::text,
    "description" text,
    "status" text,
    "outcome" text,
    "background" text,
    "decision" text,
    "legal_principle" text,
    "implications" text,
    "mira_url" text,
    "published" boolean default false,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone default now(),
    "mira_case_number" text,
    "filed_date" date,
    "claim" text,
    "mira_status" text,
    "mira_remarks" text,
    "legal_matter_id" uuid,
    "is_primary" boolean not null default true,
    "ai_analysis_status" text not null default 'not_analyzed'::text,
    "ai_analyzed_at" timestamp with time zone,
    "ai_analysis_version" integer not null default 0
      );


alter table "public"."legal_cases" enable row level security;


  create table "public"."legal_matter_parties" (
    "id" uuid not null default gen_random_uuid(),
    "legal_matter_id" uuid not null,
    "party_id" uuid not null,
    "role" text not null,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."legal_matter_parties" enable row level security;


  create table "public"."legal_matters" (
    "id" uuid not null default gen_random_uuid(),
    "taxpayer_id" uuid,
    "title" text not null,
    "slug" text,
    "category" text,
    "description" text,
    "background" text,
    "claim" text,
    "cura_summary" text,
    "cura_legal_principle" text,
    "cura_implications" text,
    "published" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "verification_status" text not null default 'pending'::text,
    "verified_by" text,
    "verified_at" timestamp with time zone,
    "ai_generated_at" timestamp with time zone,
    "source_document_url" text
      );


alter table "public"."legal_matters" enable row level security;


  create table "public"."mira_source_cases" (
    "id" uuid not null default gen_random_uuid(),
    "title" text,
    "filed_date" date,
    "court" text,
    "case_number" text,
    "claim" text,
    "status" text,
    "remarks" text,
    "mira_url" text,
    "source_page" integer,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."mira_source_cases" enable row level security;


  create table "public"."money_exchangers" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "active" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."money_exchangers" enable row level security;


  create table "public"."other_service_packages" (
    "id" uuid not null default gen_random_uuid(),
    "service_id" uuid not null,
    "title" text not null,
    "price" text,
    "fixed_fee" text,
    "variable_fee" text,
    "setup_fee" text,
    "inclusions" jsonb not null default '[]'::jsonb,
    "display_order" integer not null default 0,
    "published" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."other_service_packages" enable row level security;


  create table "public"."other_service_reasons" (
    "id" uuid not null default gen_random_uuid(),
    "service_id" uuid not null,
    "section" text not null,
    "title" text not null,
    "text" text,
    "display_order" integer not null default 0,
    "published" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."other_service_reasons" enable row level security;


  create table "public"."other_services" (
    "id" uuid not null default gen_random_uuid(),
    "slug" text not null,
    "name" text not null,
    "eyebrow" text,
    "hero_title" text,
    "hero_description" text,
    "overview_title" text,
    "overview_text" text,
    "why_outsource_title" text,
    "why_outsource_intro" text,
    "why_cura_title" text,
    "why_cura_intro" text,
    "packages_title" text,
    "packages_intro" text,
    "enquiry_title" text,
    "enquiry_text" text,
    "published" boolean not null default true,
    "display_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."other_services" enable row level security;


  create table "public"."parties" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "normalized_name" text,
    "party_type" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."parties" enable row level security;


  create table "public"."proceeding_relationships" (
    "id" uuid not null default gen_random_uuid(),
    "proceeding_id" uuid not null,
    "related_proceeding_id" uuid not null,
    "relationship_type" text not null,
    "confidence" text not null default 'needs_review'::text,
    "evidence" text,
    "source_case_number" text,
    "related_case_number" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "review_class" text not null default 'needs_manual_review'::text,
    "review_reason" text
      );


alter table "public"."proceeding_relationships" enable row level security;


  create table "public"."proceeding_source_records" (
    "id" uuid not null default gen_random_uuid(),
    "proceeding_id" uuid not null,
    "source_record_id" uuid not null,
    "relationship_type" text not null default 'primary'::text,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "confidence" text not null default 'needs_review'::text,
    "evidence" text
      );


alter table "public"."proceeding_source_records" enable row level security;


  create table "public"."proceedings" (
    "id" uuid not null default gen_random_uuid(),
    "legal_matter_id" uuid,
    "court" text not null,
    "case_number" text,
    "filed_date" date,
    "judgment_date" date,
    "status" text,
    "outcome" text,
    "sort_order" integer not null default 1,
    "official_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."proceedings" enable row level security;


  create table "public"."service_inquiries" (
    "id" uuid not null default gen_random_uuid(),
    "service" text not null,
    "full_name" text not null,
    "email" text not null,
    "phone" text not null,
    "business_name" text not null,
    "business_type" text not null,
    "business_location" text,
    "website" text,
    "current_circumstance" text not null,
    "assistance_required" text not null,
    "urgency" text not null default 'Not urgent'::text,
    "preferred_contact_method" text not null default 'Email'::text,
    "status" text not null default 'New'::text,
    "admin_notes" text,
    "email_sent" boolean not null default false,
    "email_message_id" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."service_inquiries" enable row level security;


  create table "public"."services" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "slug" text,
    "short_description" text,
    "description" text,
    "icon" text,
    "display_order" integer not null default 0,
    "coming_soon" boolean not null default true,
    "published" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."services" enable row level security;


  create table "public"."taxpayer_aliases" (
    "id" uuid not null default gen_random_uuid(),
    "taxpayer_id" uuid not null,
    "alias" text not null,
    "normalized_alias" text not null,
    "source" text not null default 'MIRA'::text,
    "created_at" timestamp with time zone not null default now()
      );


alter table "public"."taxpayer_aliases" enable row level security;


  create table "public"."taxpayers" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "normalized_name" text,
    "taxpayer_type" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."taxpayers" enable row level security;


  create table "public"."team_member_experience" (
    "id" uuid not null default gen_random_uuid(),
    "team_member_id" uuid not null,
    "employer" text not null,
    "position" text not null,
    "start_date" date,
    "end_date" date,
    "description" text,
    "display_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."team_member_experience" enable row level security;


  create table "public"."team_member_qualifications" (
    "id" uuid not null default gen_random_uuid(),
    "team_member_id" uuid not null,
    "qualification" text not null,
    "institution" text,
    "year" integer,
    "description" text,
    "display_order" integer not null default 0,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."team_member_qualifications" enable row level security;


  create table "public"."team_members" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "position" text not null,
    "qualifications" text,
    "biography" text,
    "expertise" text,
    "image_url" text,
    "display_order" integer not null default 0,
    "published" boolean not null default true,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "short_bio" text,
    "linkedin_url" text,
    "professional_bio" text
      );


alter table "public"."team_members" enable row level security;

CREATE UNIQUE INDEX admin_users_pkey ON public.admin_users USING btree (user_id);

CREATE INDEX articles_category_idx ON public.articles USING btree (category);

CREATE UNIQUE INDEX articles_pkey ON public.articles USING btree (id);

CREATE INDEX articles_published_date_idx ON public.articles USING btree (published_date DESC);

CREATE UNIQUE INDEX articles_slug_key ON public.articles USING btree (slug);

CREATE UNIQUE INDEX careers_pkey ON public.careers USING btree (id);

CREATE UNIQUE INDEX careers_slug_key ON public.careers USING btree (slug);

CREATE UNIQUE INDEX case_documents_pkey ON public.case_documents USING btree (id);

CREATE INDEX case_issues_case_id_idx ON public.case_issues USING btree (case_id);

CREATE UNIQUE INDEX case_issues_pkey ON public.case_issues USING btree (id);

CREATE INDEX case_proceedings_case_id_idx ON public.case_proceedings USING btree (case_id);

CREATE INDEX case_proceedings_case_number_idx ON public.case_proceedings USING btree (case_number);

CREATE UNIQUE INDEX case_proceedings_pkey ON public.case_proceedings USING btree (id);

CREATE INDEX case_sources_case_id_idx ON public.case_sources USING btree (case_id);

CREATE UNIQUE INDEX case_sources_pkey ON public.case_sources USING btree (id);

CREATE INDEX case_timeline_case_id_idx ON public.case_timeline USING btree (case_id);

CREATE UNIQUE INDEX case_timeline_pkey ON public.case_timeline USING btree (id);

CREATE UNIQUE INDEX cura_case_processing_queue_legal_matter_id_key ON public.cura_case_processing_queue USING btree (legal_matter_id);

CREATE UNIQUE INDEX cura_case_processing_queue_pkey ON public.cura_case_processing_queue USING btree (id);

CREATE UNIQUE INDEX education_assets_pkey ON public.education_assets USING btree (id);

CREATE INDEX education_attempts_leaderboard_idx ON public.education_attempts USING btree (quiz_id, percentage DESC, created_at);

CREATE UNIQUE INDEX education_attempts_pkey ON public.education_attempts USING btree (id);

CREATE UNIQUE INDEX education_block_items_pkey ON public.education_block_items USING btree (id);

CREATE INDEX education_blocks_section_order_idx ON public.education_content_blocks USING btree (section_id, display_order);

CREATE UNIQUE INDEX education_content_blocks_pkey ON public.education_content_blocks USING btree (id);

CREATE UNIQUE INDEX education_content_versions_block_id_version_key ON public.education_content_versions USING btree (block_id, version);

CREATE UNIQUE INDEX education_content_versions_pkey ON public.education_content_versions USING btree (id);

CREATE UNIQUE INDEX education_interactives_block_id_key ON public.education_interactives USING btree (block_id);

CREATE UNIQUE INDEX education_interactives_pkey ON public.education_interactives USING btree (id);

CREATE INDEX education_items_block_order_idx ON public.education_block_items USING btree (block_id, display_order);

CREATE UNIQUE INDEX education_materials_pkey ON public.education_materials USING btree (id);

CREATE UNIQUE INDEX education_question_targets_pkey ON public.education_question_targets USING btree (subject);

CREATE UNIQUE INDEX education_questions_pkey ON public.education_questions USING btree (id);

CREATE INDEX education_questions_quiz_order_idx ON public.education_questions USING btree (quiz_id, sort_order);

CREATE UNIQUE INDEX education_quizzes_pkey ON public.education_quizzes USING btree (id);

CREATE UNIQUE INDEX education_sections_pkey ON public.education_sections USING btree (id);

CREATE INDEX education_sections_topic_order_idx ON public.education_sections USING btree (topic_id, display_order);

CREATE UNIQUE INDEX education_sources_pkey ON public.education_sources USING btree (id);

CREATE INDEX education_sources_topic_idx ON public.education_sources USING btree (topic_id);

CREATE UNIQUE INDEX education_tables_block_id_key ON public.education_tables USING btree (block_id);

CREATE UNIQUE INDEX education_tables_pkey ON public.education_tables USING btree (id);

CREATE UNIQUE INDEX education_test_sessions_pkey ON public.education_test_sessions USING btree (id);

CREATE INDEX education_test_sessions_quiz_idx ON public.education_test_sessions USING btree (quiz_id, started_at DESC);

CREATE INDEX education_topics_category_order_idx ON public.education_topics USING btree (category, display_order);

CREATE UNIQUE INDEX education_topics_pkey ON public.education_topics USING btree (id);

CREATE UNIQUE INDEX education_topics_slug_key ON public.education_topics USING btree (slug);

CREATE INDEX education_versions_topic_idx ON public.education_content_versions USING btree (topic_id, created_at DESC);

CREATE INDEX exchange_rates_date_exchanger_time_idx ON public.exchange_rates USING btree (rate_date DESC, exchanger_id, rate_time DESC);

CREATE INDEX exchange_rates_exchanger_id_idx ON public.exchange_rates USING btree (exchanger_id);

CREATE UNIQUE INDEX exchange_rates_pkey ON public.exchange_rates USING btree (id);

CREATE INDEX idx_case_documents_proceeding_id ON public.case_documents USING btree (proceeding_id);

CREATE INDEX idx_case_proceedings_source_status ON public.case_proceedings USING btree (source_status);

CREATE INDEX idx_cura_case_processing_queue_status_priority ON public.cura_case_processing_queue USING btree (status, priority, created_at);

CREATE INDEX idx_cura_queue_verification_status ON public.cura_case_processing_queue USING btree (verification_status);

CREATE INDEX idx_exchange_rates_rate_date ON public.exchange_rates USING btree (rate_date DESC);

CREATE INDEX idx_legal_cases_ai_status_updated ON public.legal_cases USING btree (ai_analysis_status, updated_at);

CREATE INDEX idx_legal_matter_parties_matter ON public.legal_matter_parties USING btree (legal_matter_id);

CREATE INDEX idx_legal_matter_parties_party ON public.legal_matter_parties USING btree (party_id);

CREATE INDEX idx_legal_matters_taxpayer_id ON public.legal_matters USING btree (taxpayer_id);

CREATE INDEX idx_legal_matters_verification_status ON public.legal_matters USING btree (verification_status);

CREATE INDEX idx_mira_source_case_number ON public.mira_source_cases USING btree (case_number);

CREATE INDEX idx_mira_source_court ON public.mira_source_cases USING btree (court);

CREATE INDEX idx_mira_source_title ON public.mira_source_cases USING btree (title);

CREATE UNIQUE INDEX idx_mira_source_unique_case ON public.mira_source_cases USING btree (lower(COALESCE(title, ''::text)), lower(COALESCE(court, ''::text)), lower(COALESCE(case_number, ''::text)));

CREATE INDEX idx_parties_normalized_name ON public.parties USING btree (normalized_name);

CREATE INDEX idx_proceeding_relationships_confidence ON public.proceeding_relationships USING btree (confidence);

CREATE INDEX idx_proceeding_relationships_proceeding ON public.proceeding_relationships USING btree (proceeding_id);

CREATE INDEX idx_proceeding_relationships_proceeding_id ON public.proceeding_relationships USING btree (proceeding_id);

CREATE INDEX idx_proceeding_relationships_related ON public.proceeding_relationships USING btree (related_proceeding_id);

CREATE INDEX idx_proceeding_relationships_related_proceeding_id ON public.proceeding_relationships USING btree (related_proceeding_id);

CREATE INDEX idx_proceeding_relationships_review_class ON public.proceeding_relationships USING btree (review_class);

CREATE INDEX idx_proceeding_source_records_proceeding ON public.proceeding_source_records USING btree (proceeding_id);

CREATE INDEX idx_proceeding_source_records_source ON public.proceeding_source_records USING btree (source_record_id);

CREATE INDEX idx_proceedings_case_number ON public.proceedings USING btree (case_number);

CREATE INDEX idx_proceedings_court ON public.proceedings USING btree (court);

CREATE INDEX idx_proceedings_legal_matter_id ON public.proceedings USING btree (legal_matter_id);

CREATE INDEX idx_taxpayers_normalized_name ON public.taxpayers USING btree (normalized_name);

CREATE INDEX idx_team_member_experience_member_order ON public.team_member_experience USING btree (team_member_id, display_order, start_date);

CREATE INDEX idx_team_member_qualifications_member_order ON public.team_member_qualifications USING btree (team_member_id, display_order, year);

CREATE INDEX legal_case_analyses_case_id_idx ON public.legal_case_analyses USING btree (case_id);

CREATE UNIQUE INDEX legal_case_analyses_case_id_version_key ON public.legal_case_analyses USING btree (case_id, version);

CREATE UNIQUE INDEX legal_case_analyses_pkey ON public.legal_case_analyses USING btree (id);

CREATE UNIQUE INDEX legal_case_processing_queue_case_id_key ON public.legal_case_processing_queue USING btree (case_id);

CREATE UNIQUE INDEX legal_case_processing_queue_pkey ON public.legal_case_processing_queue USING btree (id);

CREATE INDEX legal_case_processing_queue_status_idx ON public.legal_case_processing_queue USING btree (status, updated_at);

CREATE INDEX legal_cases_ai_analysis_status_idx ON public.legal_cases USING btree (ai_analysis_status);

CREATE INDEX legal_cases_category_idx ON public.legal_cases USING btree (category);

CREATE INDEX legal_cases_legal_matter_id_idx ON public.legal_cases USING btree (legal_matter_id);

CREATE UNIQUE INDEX legal_cases_pkey ON public.legal_cases USING btree (id);

CREATE INDEX legal_cases_published_idx ON public.legal_cases USING btree (published);

CREATE INDEX legal_cases_slug_idx ON public.legal_cases USING btree (slug);

CREATE UNIQUE INDEX legal_cases_slug_key ON public.legal_cases USING btree (slug);

CREATE UNIQUE INDEX legal_matter_parties_legal_matter_id_party_id_role_key ON public.legal_matter_parties USING btree (legal_matter_id, party_id, role);

CREATE UNIQUE INDEX legal_matter_parties_pkey ON public.legal_matter_parties USING btree (id);

CREATE UNIQUE INDEX legal_matters_pkey ON public.legal_matters USING btree (id);

CREATE UNIQUE INDEX legal_matters_slug_key ON public.legal_matters USING btree (slug);

CREATE UNIQUE INDEX mira_source_cases_pkey ON public.mira_source_cases USING btree (id);

CREATE UNIQUE INDEX money_exchangers_name_key ON public.money_exchangers USING btree (name);

CREATE UNIQUE INDEX money_exchangers_pkey ON public.money_exchangers USING btree (id);

CREATE UNIQUE INDEX other_service_packages_pkey ON public.other_service_packages USING btree (id);

CREATE INDEX other_service_packages_service_idx ON public.other_service_packages USING btree (service_id, display_order);

CREATE UNIQUE INDEX other_service_reasons_pkey ON public.other_service_reasons USING btree (id);

CREATE INDEX other_service_reasons_service_idx ON public.other_service_reasons USING btree (service_id, section, display_order);

CREATE UNIQUE INDEX other_services_pkey ON public.other_services USING btree (id);

CREATE UNIQUE INDEX other_services_slug_key ON public.other_services USING btree (slug);

CREATE UNIQUE INDEX parties_pkey ON public.parties USING btree (id);

CREATE UNIQUE INDEX proceeding_relationships_pkey ON public.proceeding_relationships USING btree (id);

CREATE UNIQUE INDEX proceeding_relationships_unique ON public.proceeding_relationships USING btree (proceeding_id, related_proceeding_id, relationship_type);

CREATE UNIQUE INDEX proceeding_source_records_pkey ON public.proceeding_source_records USING btree (id);

CREATE UNIQUE INDEX proceeding_source_records_proceeding_id_source_record_id_key ON public.proceeding_source_records USING btree (proceeding_id, source_record_id);

CREATE UNIQUE INDEX proceedings_pkey ON public.proceedings USING btree (id);

CREATE INDEX service_inquiries_created_at_idx ON public.service_inquiries USING btree (created_at DESC);

CREATE UNIQUE INDEX service_inquiries_pkey ON public.service_inquiries USING btree (id);

CREATE INDEX service_inquiries_service_idx ON public.service_inquiries USING btree (service);

CREATE INDEX service_inquiries_status_idx ON public.service_inquiries USING btree (status);

CREATE UNIQUE INDEX services_pkey ON public.services USING btree (id);

CREATE UNIQUE INDEX services_slug_key ON public.services USING btree (slug);

CREATE UNIQUE INDEX taxpayer_aliases_pkey ON public.taxpayer_aliases USING btree (id);

CREATE UNIQUE INDEX taxpayer_aliases_taxpayer_id_normalized_alias_key ON public.taxpayer_aliases USING btree (taxpayer_id, normalized_alias);

CREATE UNIQUE INDEX taxpayers_pkey ON public.taxpayers USING btree (id);

CREATE UNIQUE INDEX team_member_experience_pkey ON public.team_member_experience USING btree (id);

CREATE UNIQUE INDEX team_member_qualifications_pkey ON public.team_member_qualifications USING btree (id);

CREATE INDEX team_members_display_order_idx ON public.team_members USING btree (display_order);

CREATE UNIQUE INDEX team_members_pkey ON public.team_members USING btree (id);

CREATE INDEX team_members_published_idx ON public.team_members USING btree (published);

alter table "public"."admin_users" add constraint "admin_users_pkey" PRIMARY KEY using index "admin_users_pkey";

alter table "public"."articles" add constraint "articles_pkey" PRIMARY KEY using index "articles_pkey";

alter table "public"."careers" add constraint "careers_pkey" PRIMARY KEY using index "careers_pkey";

alter table "public"."case_documents" add constraint "case_documents_pkey" PRIMARY KEY using index "case_documents_pkey";

alter table "public"."case_issues" add constraint "case_issues_pkey" PRIMARY KEY using index "case_issues_pkey";

alter table "public"."case_proceedings" add constraint "case_proceedings_pkey" PRIMARY KEY using index "case_proceedings_pkey";

alter table "public"."case_sources" add constraint "case_sources_pkey" PRIMARY KEY using index "case_sources_pkey";

alter table "public"."case_timeline" add constraint "case_timeline_pkey" PRIMARY KEY using index "case_timeline_pkey";

alter table "public"."cura_case_processing_queue" add constraint "cura_case_processing_queue_pkey" PRIMARY KEY using index "cura_case_processing_queue_pkey";

alter table "public"."education_assets" add constraint "education_assets_pkey" PRIMARY KEY using index "education_assets_pkey";

alter table "public"."education_attempts" add constraint "education_attempts_pkey" PRIMARY KEY using index "education_attempts_pkey";

alter table "public"."education_block_items" add constraint "education_block_items_pkey" PRIMARY KEY using index "education_block_items_pkey";

alter table "public"."education_content_blocks" add constraint "education_content_blocks_pkey" PRIMARY KEY using index "education_content_blocks_pkey";

alter table "public"."education_content_versions" add constraint "education_content_versions_pkey" PRIMARY KEY using index "education_content_versions_pkey";

alter table "public"."education_interactives" add constraint "education_interactives_pkey" PRIMARY KEY using index "education_interactives_pkey";

alter table "public"."education_materials" add constraint "education_materials_pkey" PRIMARY KEY using index "education_materials_pkey";

alter table "public"."education_question_targets" add constraint "education_question_targets_pkey" PRIMARY KEY using index "education_question_targets_pkey";

alter table "public"."education_questions" add constraint "education_questions_pkey" PRIMARY KEY using index "education_questions_pkey";

alter table "public"."education_quizzes" add constraint "education_quizzes_pkey" PRIMARY KEY using index "education_quizzes_pkey";

alter table "public"."education_sections" add constraint "education_sections_pkey" PRIMARY KEY using index "education_sections_pkey";

alter table "public"."education_sources" add constraint "education_sources_pkey" PRIMARY KEY using index "education_sources_pkey";

alter table "public"."education_tables" add constraint "education_tables_pkey" PRIMARY KEY using index "education_tables_pkey";

alter table "public"."education_test_sessions" add constraint "education_test_sessions_pkey" PRIMARY KEY using index "education_test_sessions_pkey";

alter table "public"."education_topics" add constraint "education_topics_pkey" PRIMARY KEY using index "education_topics_pkey";

alter table "public"."exchange_rates" add constraint "exchange_rates_pkey" PRIMARY KEY using index "exchange_rates_pkey";

alter table "public"."legal_case_analyses" add constraint "legal_case_analyses_pkey" PRIMARY KEY using index "legal_case_analyses_pkey";

alter table "public"."legal_case_processing_queue" add constraint "legal_case_processing_queue_pkey" PRIMARY KEY using index "legal_case_processing_queue_pkey";

alter table "public"."legal_cases" add constraint "legal_cases_pkey" PRIMARY KEY using index "legal_cases_pkey";

alter table "public"."legal_matter_parties" add constraint "legal_matter_parties_pkey" PRIMARY KEY using index "legal_matter_parties_pkey";

alter table "public"."legal_matters" add constraint "legal_matters_pkey" PRIMARY KEY using index "legal_matters_pkey";

alter table "public"."mira_source_cases" add constraint "mira_source_cases_pkey" PRIMARY KEY using index "mira_source_cases_pkey";

alter table "public"."money_exchangers" add constraint "money_exchangers_pkey" PRIMARY KEY using index "money_exchangers_pkey";

alter table "public"."other_service_packages" add constraint "other_service_packages_pkey" PRIMARY KEY using index "other_service_packages_pkey";

alter table "public"."other_service_reasons" add constraint "other_service_reasons_pkey" PRIMARY KEY using index "other_service_reasons_pkey";

alter table "public"."other_services" add constraint "other_services_pkey" PRIMARY KEY using index "other_services_pkey";

alter table "public"."parties" add constraint "parties_pkey" PRIMARY KEY using index "parties_pkey";

alter table "public"."proceeding_relationships" add constraint "proceeding_relationships_pkey" PRIMARY KEY using index "proceeding_relationships_pkey";

alter table "public"."proceeding_source_records" add constraint "proceeding_source_records_pkey" PRIMARY KEY using index "proceeding_source_records_pkey";

alter table "public"."proceedings" add constraint "proceedings_pkey" PRIMARY KEY using index "proceedings_pkey";

alter table "public"."service_inquiries" add constraint "service_inquiries_pkey" PRIMARY KEY using index "service_inquiries_pkey";

alter table "public"."services" add constraint "services_pkey" PRIMARY KEY using index "services_pkey";

alter table "public"."taxpayer_aliases" add constraint "taxpayer_aliases_pkey" PRIMARY KEY using index "taxpayer_aliases_pkey";

alter table "public"."taxpayers" add constraint "taxpayers_pkey" PRIMARY KEY using index "taxpayers_pkey";

alter table "public"."team_member_experience" add constraint "team_member_experience_pkey" PRIMARY KEY using index "team_member_experience_pkey";

alter table "public"."team_member_qualifications" add constraint "team_member_qualifications_pkey" PRIMARY KEY using index "team_member_qualifications_pkey";

alter table "public"."team_members" add constraint "team_members_pkey" PRIMARY KEY using index "team_members_pkey";

alter table "public"."admin_users" add constraint "admin_users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."admin_users" validate constraint "admin_users_user_id_fkey";

alter table "public"."articles" add constraint "articles_slug_key" UNIQUE using index "articles_slug_key";

alter table "public"."careers" add constraint "careers_slug_key" UNIQUE using index "careers_slug_key";

alter table "public"."case_documents" add constraint "case_documents_proceeding_id_fkey" FOREIGN KEY (proceeding_id) REFERENCES public.proceedings(id) ON DELETE CASCADE not valid;

alter table "public"."case_documents" validate constraint "case_documents_proceeding_id_fkey";

alter table "public"."case_issues" add constraint "case_issues_case_id_fkey" FOREIGN KEY (case_id) REFERENCES public.legal_cases(id) ON DELETE CASCADE not valid;

alter table "public"."case_issues" validate constraint "case_issues_case_id_fkey";

alter table "public"."case_proceedings" add constraint "case_proceedings_case_id_fkey" FOREIGN KEY (case_id) REFERENCES public.legal_cases(id) ON DELETE CASCADE not valid;

alter table "public"."case_proceedings" validate constraint "case_proceedings_case_id_fkey";

alter table "public"."case_proceedings" add constraint "case_proceedings_source_status_check" CHECK ((source_status = ANY (ARRAY['verified'::text, 'needs_verification'::text, 'unavailable'::text, 'round1_pending'::text, 'round1_searching'::text, 'round1_found'::text, 'round1_needs_second_round'::text, 'round4_searching'::text]))) not valid;

alter table "public"."case_proceedings" validate constraint "case_proceedings_source_status_check";

alter table "public"."case_sources" add constraint "case_sources_case_id_fkey" FOREIGN KEY (case_id) REFERENCES public.legal_cases(id) ON DELETE CASCADE not valid;

alter table "public"."case_sources" validate constraint "case_sources_case_id_fkey";

alter table "public"."case_timeline" add constraint "case_timeline_case_id_fkey" FOREIGN KEY (case_id) REFERENCES public.legal_cases(id) ON DELETE CASCADE not valid;

alter table "public"."case_timeline" validate constraint "case_timeline_case_id_fkey";

alter table "public"."cura_case_processing_queue" add constraint "cura_case_processing_queue_legal_matter_id_fkey" FOREIGN KEY (legal_matter_id) REFERENCES public.legal_matters(id) ON DELETE CASCADE not valid;

alter table "public"."cura_case_processing_queue" validate constraint "cura_case_processing_queue_legal_matter_id_fkey";

alter table "public"."cura_case_processing_queue" add constraint "cura_case_processing_queue_legal_matter_id_key" UNIQUE using index "cura_case_processing_queue_legal_matter_id_key";

alter table "public"."cura_case_processing_queue" add constraint "cura_case_processing_queue_status_check" CHECK ((status = ANY (ARRAY['pending'::text, 'processing'::text, 'ready_for_review'::text, 'published'::text, 'needs_source'::text, 'error'::text]))) not valid;

alter table "public"."cura_case_processing_queue" validate constraint "cura_case_processing_queue_status_check";

alter table "public"."cura_case_processing_queue" add constraint "cura_case_processing_queue_verification_status_check" CHECK ((verification_status = ANY (ARRAY['pending'::text, 'verified'::text, 'needs_correction'::text]))) not valid;

alter table "public"."cura_case_processing_queue" validate constraint "cura_case_processing_queue_verification_status_check";

alter table "public"."education_assets" add constraint "education_assets_asset_type_check" CHECK ((asset_type = ANY (ARRAY['image'::text, 'illustration'::text, 'document'::text, 'video'::text]))) not valid;

alter table "public"."education_assets" validate constraint "education_assets_asset_type_check";

alter table "public"."education_assets" add constraint "education_assets_block_id_fkey" FOREIGN KEY (block_id) REFERENCES public.education_content_blocks(id) ON DELETE CASCADE not valid;

alter table "public"."education_assets" validate constraint "education_assets_block_id_fkey";

alter table "public"."education_attempts" add constraint "education_attempts_duration_seconds_check" CHECK ((duration_seconds >= 0)) not valid;

alter table "public"."education_attempts" validate constraint "education_attempts_duration_seconds_check";

alter table "public"."education_attempts" add constraint "education_attempts_participant_name_check" CHECK (((length(TRIM(BOTH FROM participant_name)) >= 2) AND (length(TRIM(BOTH FROM participant_name)) <= 80))) not valid;

alter table "public"."education_attempts" validate constraint "education_attempts_participant_name_check";

alter table "public"."education_attempts" add constraint "education_attempts_percentage_check" CHECK (((percentage >= (0)::numeric) AND (percentage <= (100)::numeric))) not valid;

alter table "public"."education_attempts" validate constraint "education_attempts_percentage_check";

alter table "public"."education_attempts" add constraint "education_attempts_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES public.education_quizzes(id) ON DELETE CASCADE not valid;

alter table "public"."education_attempts" validate constraint "education_attempts_quiz_id_fkey";

alter table "public"."education_attempts" add constraint "education_attempts_score_check" CHECK ((score >= 0)) not valid;

alter table "public"."education_attempts" validate constraint "education_attempts_score_check";

alter table "public"."education_attempts" add constraint "education_attempts_total_points_check" CHECK ((total_points > 0)) not valid;

alter table "public"."education_attempts" validate constraint "education_attempts_total_points_check";

alter table "public"."education_block_items" add constraint "education_block_items_block_id_fkey" FOREIGN KEY (block_id) REFERENCES public.education_content_blocks(id) ON DELETE CASCADE not valid;

alter table "public"."education_block_items" validate constraint "education_block_items_block_id_fkey";

alter table "public"."education_block_items" add constraint "education_block_items_item_type_check" CHECK ((item_type = ANY (ARRAY['item'::text, 'subitem'::text, 'label'::text, 'value'::text]))) not valid;

alter table "public"."education_block_items" validate constraint "education_block_items_item_type_check";

alter table "public"."education_content_blocks" add constraint "education_content_blocks_block_type_check" CHECK ((block_type = ANY (ARRAY['paragraph'::text, 'bullet_list'::text, 'numbered_list'::text, 'formula'::text, 'example'::text, 'table'::text, 'callout'::text, 'image'::text, 'quote'::text, 'note'::text, 'interactive'::text, 'video'::text]))) not valid;

alter table "public"."education_content_blocks" validate constraint "education_content_blocks_block_type_check";

alter table "public"."education_content_blocks" add constraint "education_content_blocks_section_id_fkey" FOREIGN KEY (section_id) REFERENCES public.education_sections(id) ON DELETE CASCADE not valid;

alter table "public"."education_content_blocks" validate constraint "education_content_blocks_section_id_fkey";

alter table "public"."education_content_blocks" add constraint "education_content_blocks_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."education_content_blocks" validate constraint "education_content_blocks_updated_by_fkey";

alter table "public"."education_content_versions" add constraint "education_content_versions_block_id_fkey" FOREIGN KEY (block_id) REFERENCES public.education_content_blocks(id) ON DELETE CASCADE not valid;

alter table "public"."education_content_versions" validate constraint "education_content_versions_block_id_fkey";

alter table "public"."education_content_versions" add constraint "education_content_versions_block_id_version_key" UNIQUE using index "education_content_versions_block_id_version_key";

alter table "public"."education_content_versions" add constraint "education_content_versions_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."education_content_versions" validate constraint "education_content_versions_created_by_fkey";

alter table "public"."education_content_versions" add constraint "education_content_versions_section_id_fkey" FOREIGN KEY (section_id) REFERENCES public.education_sections(id) ON DELETE CASCADE not valid;

alter table "public"."education_content_versions" validate constraint "education_content_versions_section_id_fkey";

alter table "public"."education_content_versions" add constraint "education_content_versions_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'review'::text, 'published'::text, 'superseded'::text]))) not valid;

alter table "public"."education_content_versions" validate constraint "education_content_versions_status_check";

alter table "public"."education_content_versions" add constraint "education_content_versions_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.education_topics(id) ON DELETE CASCADE not valid;

alter table "public"."education_content_versions" validate constraint "education_content_versions_topic_id_fkey";

alter table "public"."education_interactives" add constraint "education_interactives_block_id_fkey" FOREIGN KEY (block_id) REFERENCES public.education_content_blocks(id) ON DELETE CASCADE not valid;

alter table "public"."education_interactives" validate constraint "education_interactives_block_id_fkey";

alter table "public"."education_interactives" add constraint "education_interactives_block_id_key" UNIQUE using index "education_interactives_block_id_key";

alter table "public"."education_interactives" add constraint "education_interactives_interactive_type_check" CHECK ((interactive_type = ANY (ARRAY['diagram'::text, 'flowchart'::text, 'decision_tree'::text, 'calculation'::text, 'step_by_step'::text, 'reveal'::text, 'comparison'::text, 'timeline'::text, 'hotspot'::text, 'custom'::text]))) not valid;

alter table "public"."education_interactives" validate constraint "education_interactives_interactive_type_check";

alter table "public"."education_question_targets" add constraint "education_question_targets_target_questions_check" CHECK ((target_questions > 0)) not valid;

alter table "public"."education_question_targets" validate constraint "education_question_targets_target_questions_check";

alter table "public"."education_questions" add constraint "education_questions_correct_option_check" CHECK ((correct_option >= 0)) not valid;

alter table "public"."education_questions" validate constraint "education_questions_correct_option_check";

alter table "public"."education_questions" add constraint "education_questions_points_check" CHECK ((points > 0)) not valid;

alter table "public"."education_questions" validate constraint "education_questions_points_check";

alter table "public"."education_questions" add constraint "education_questions_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES public.education_quizzes(id) ON DELETE CASCADE not valid;

alter table "public"."education_questions" validate constraint "education_questions_quiz_id_fkey";

alter table "public"."education_quizzes" add constraint "education_quizzes_time_limit_seconds_check" CHECK (((time_limit_seconds >= 60) AND (time_limit_seconds <= 3600))) not valid;

alter table "public"."education_quizzes" validate constraint "education_quizzes_time_limit_seconds_check";

alter table "public"."education_sections" add constraint "education_sections_section_type_check" CHECK ((section_type = ANY (ARRAY['section'::text, 'slide'::text, 'subsection'::text, 'example'::text, 'summary'::text, 'practice'::text]))) not valid;

alter table "public"."education_sections" validate constraint "education_sections_section_type_check";

alter table "public"."education_sections" add constraint "education_sections_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.education_topics(id) ON DELETE CASCADE not valid;

alter table "public"."education_sections" validate constraint "education_sections_topic_id_fkey";

alter table "public"."education_sections" add constraint "education_sections_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."education_sections" validate constraint "education_sections_updated_by_fkey";

alter table "public"."education_sources" add constraint "education_sources_section_id_fkey" FOREIGN KEY (section_id) REFERENCES public.education_sections(id) ON DELETE CASCADE not valid;

alter table "public"."education_sources" validate constraint "education_sources_section_id_fkey";

alter table "public"."education_sources" add constraint "education_sources_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES public.education_topics(id) ON DELETE CASCADE not valid;

alter table "public"."education_sources" validate constraint "education_sources_topic_id_fkey";

alter table "public"."education_tables" add constraint "education_tables_block_id_fkey" FOREIGN KEY (block_id) REFERENCES public.education_content_blocks(id) ON DELETE CASCADE not valid;

alter table "public"."education_tables" validate constraint "education_tables_block_id_fkey";

alter table "public"."education_tables" add constraint "education_tables_block_id_key" UNIQUE using index "education_tables_block_id_key";

alter table "public"."education_test_sessions" add constraint "education_test_sessions_participant_name_check" CHECK (((length(TRIM(BOTH FROM participant_name)) >= 2) AND (length(TRIM(BOTH FROM participant_name)) <= 80))) not valid;

alter table "public"."education_test_sessions" validate constraint "education_test_sessions_participant_name_check";

alter table "public"."education_test_sessions" add constraint "education_test_sessions_quiz_id_fkey" FOREIGN KEY (quiz_id) REFERENCES public.education_quizzes(id) ON DELETE CASCADE not valid;

alter table "public"."education_test_sessions" validate constraint "education_test_sessions_quiz_id_fkey";

alter table "public"."education_topics" add constraint "education_topics_slug_key" UNIQUE using index "education_topics_slug_key";

alter table "public"."education_topics" add constraint "education_topics_updated_by_fkey" FOREIGN KEY (updated_by) REFERENCES auth.users(id) not valid;

alter table "public"."education_topics" validate constraint "education_topics_updated_by_fkey";

alter table "public"."exchange_rates" add constraint "exchange_rates_exchanger_id_fkey" FOREIGN KEY (exchanger_id) REFERENCES public.money_exchangers(id) ON DELETE RESTRICT not valid;

alter table "public"."exchange_rates" validate constraint "exchange_rates_exchanger_id_fkey";

alter table "public"."exchange_rates" add constraint "exchange_rates_rate_positive" CHECK ((mvr_per_usd > (0)::numeric)) not valid;

alter table "public"."exchange_rates" validate constraint "exchange_rates_rate_positive";

alter table "public"."legal_case_analyses" add constraint "legal_case_analyses_case_id_fkey" FOREIGN KEY (case_id) REFERENCES public.legal_cases(id) ON DELETE CASCADE not valid;

alter table "public"."legal_case_analyses" validate constraint "legal_case_analyses_case_id_fkey";

alter table "public"."legal_case_analyses" add constraint "legal_case_analyses_case_id_version_key" UNIQUE using index "legal_case_analyses_case_id_version_key";

alter table "public"."legal_case_analyses" add constraint "legal_case_analyses_status_check" CHECK ((status = ANY (ARRAY['draft'::text, 'ready_for_review'::text, 'verified'::text, 'superseded'::text, 'error'::text]))) not valid;

alter table "public"."legal_case_analyses" validate constraint "legal_case_analyses_status_check";

alter table "public"."legal_case_analyses" add constraint "legal_case_analyses_verified_by_fkey" FOREIGN KEY (verified_by) REFERENCES auth.users(id) not valid;

alter table "public"."legal_case_analyses" validate constraint "legal_case_analyses_verified_by_fkey";

alter table "public"."legal_case_processing_queue" add constraint "legal_case_processing_queue_case_id_fkey" FOREIGN KEY (case_id) REFERENCES public.legal_cases(id) ON DELETE CASCADE not valid;

alter table "public"."legal_case_processing_queue" validate constraint "legal_case_processing_queue_case_id_fkey";

alter table "public"."legal_case_processing_queue" add constraint "legal_case_processing_queue_case_id_key" UNIQUE using index "legal_case_processing_queue_case_id_key";

alter table "public"."legal_case_processing_queue" add constraint "legal_case_processing_queue_status_check" CHECK ((status = ANY (ARRAY['queued'::text, 'processing'::text, 'ready_for_review'::text, 'needs_source'::text, 'failed'::text]))) not valid;

alter table "public"."legal_case_processing_queue" validate constraint "legal_case_processing_queue_status_check";

alter table "public"."legal_cases" add constraint "legal_cases_ai_analysis_status_check" CHECK ((ai_analysis_status = ANY (ARRAY['not_analyzed'::text, 'queued'::text, 'analyzing'::text, 'needs_source'::text, 'ready_for_review'::text, 'verified'::text, 'error'::text]))) not valid;

alter table "public"."legal_cases" validate constraint "legal_cases_ai_analysis_status_check";

alter table "public"."legal_cases" add constraint "legal_cases_slug_key" UNIQUE using index "legal_cases_slug_key";

alter table "public"."legal_matter_parties" add constraint "legal_matter_parties_legal_matter_id_fkey" FOREIGN KEY (legal_matter_id) REFERENCES public.legal_matters(id) ON DELETE CASCADE not valid;

alter table "public"."legal_matter_parties" validate constraint "legal_matter_parties_legal_matter_id_fkey";

alter table "public"."legal_matter_parties" add constraint "legal_matter_parties_legal_matter_id_party_id_role_key" UNIQUE using index "legal_matter_parties_legal_matter_id_party_id_role_key";

alter table "public"."legal_matter_parties" add constraint "legal_matter_parties_party_id_fkey" FOREIGN KEY (party_id) REFERENCES public.parties(id) ON DELETE CASCADE not valid;

alter table "public"."legal_matter_parties" validate constraint "legal_matter_parties_party_id_fkey";

alter table "public"."legal_matters" add constraint "legal_matters_slug_key" UNIQUE using index "legal_matters_slug_key";

alter table "public"."legal_matters" add constraint "legal_matters_taxpayer_id_fkey" FOREIGN KEY (taxpayer_id) REFERENCES public.taxpayers(id) ON DELETE SET NULL not valid;

alter table "public"."legal_matters" validate constraint "legal_matters_taxpayer_id_fkey";

alter table "public"."legal_matters" add constraint "legal_matters_verification_status_check" CHECK ((verification_status = ANY (ARRAY['pending'::text, 'verified'::text, 'needs_correction'::text]))) not valid;

alter table "public"."legal_matters" validate constraint "legal_matters_verification_status_check";

alter table "public"."money_exchangers" add constraint "money_exchangers_name_key" UNIQUE using index "money_exchangers_name_key";

alter table "public"."other_service_packages" add constraint "other_service_packages_service_id_fkey" FOREIGN KEY (service_id) REFERENCES public.other_services(id) ON DELETE CASCADE not valid;

alter table "public"."other_service_packages" validate constraint "other_service_packages_service_id_fkey";

alter table "public"."other_service_reasons" add constraint "other_service_reasons_section_check" CHECK ((section = ANY (ARRAY['outsource'::text, 'cura'::text]))) not valid;

alter table "public"."other_service_reasons" validate constraint "other_service_reasons_section_check";

alter table "public"."other_service_reasons" add constraint "other_service_reasons_service_id_fkey" FOREIGN KEY (service_id) REFERENCES public.other_services(id) ON DELETE CASCADE not valid;

alter table "public"."other_service_reasons" validate constraint "other_service_reasons_service_id_fkey";

alter table "public"."other_services" add constraint "other_services_slug_key" UNIQUE using index "other_services_slug_key";

alter table "public"."proceeding_relationships" add constraint "proceeding_relationships_confidence_check" CHECK ((confidence = ANY (ARRAY['confirmed'::text, 'likely'::text, 'possible'::text, 'not_related'::text, 'needs_review'::text]))) not valid;

alter table "public"."proceeding_relationships" validate constraint "proceeding_relationships_confidence_check";

alter table "public"."proceeding_relationships" add constraint "proceeding_relationships_no_self" CHECK ((proceeding_id <> related_proceeding_id)) not valid;

alter table "public"."proceeding_relationships" validate constraint "proceeding_relationships_no_self";

alter table "public"."proceeding_relationships" add constraint "proceeding_relationships_proceeding_id_fkey" FOREIGN KEY (proceeding_id) REFERENCES public.proceedings(id) ON DELETE CASCADE not valid;

alter table "public"."proceeding_relationships" validate constraint "proceeding_relationships_proceeding_id_fkey";

alter table "public"."proceeding_relationships" add constraint "proceeding_relationships_related_proceeding_id_fkey" FOREIGN KEY (related_proceeding_id) REFERENCES public.proceedings(id) ON DELETE CASCADE not valid;

alter table "public"."proceeding_relationships" validate constraint "proceeding_relationships_related_proceeding_id_fkey";

alter table "public"."proceeding_relationships" add constraint "proceeding_relationships_review_class_check" CHECK ((review_class = ANY (ARRAY['safe_to_consolidate'::text, 'related_keep_separate'::text, 'case_number_variant'::text, 'needs_manual_review'::text]))) not valid;

alter table "public"."proceeding_relationships" validate constraint "proceeding_relationships_review_class_check";

alter table "public"."proceeding_relationships" add constraint "proceeding_relationships_unique" UNIQUE using index "proceeding_relationships_unique";

alter table "public"."proceeding_source_records" add constraint "proceeding_source_records_confidence_check" CHECK ((confidence = ANY (ARRAY['confirmed'::text, 'likely'::text, 'possible'::text, 'not_related'::text, 'needs_review'::text]))) not valid;

alter table "public"."proceeding_source_records" validate constraint "proceeding_source_records_confidence_check";

alter table "public"."proceeding_source_records" add constraint "proceeding_source_records_proceeding_id_fkey" FOREIGN KEY (proceeding_id) REFERENCES public.proceedings(id) ON DELETE CASCADE not valid;

alter table "public"."proceeding_source_records" validate constraint "proceeding_source_records_proceeding_id_fkey";

alter table "public"."proceeding_source_records" add constraint "proceeding_source_records_proceeding_id_source_record_id_key" UNIQUE using index "proceeding_source_records_proceeding_id_source_record_id_key";

alter table "public"."proceeding_source_records" add constraint "proceeding_source_records_source_record_id_fkey" FOREIGN KEY (source_record_id) REFERENCES public.mira_source_cases(id) ON DELETE CASCADE not valid;

alter table "public"."proceeding_source_records" validate constraint "proceeding_source_records_source_record_id_fkey";

alter table "public"."proceedings" add constraint "proceedings_legal_matter_id_fkey" FOREIGN KEY (legal_matter_id) REFERENCES public.legal_matters(id) ON DELETE CASCADE not valid;

alter table "public"."proceedings" validate constraint "proceedings_legal_matter_id_fkey";

alter table "public"."service_inquiries" add constraint "service_inquiries_service_check" CHECK ((service = ANY (ARRAY['audit'::text, 'tax'::text, 'advisory'::text, 'legal'::text, 'bookkeeping'::text, 'payroll'::text]))) not valid;

alter table "public"."service_inquiries" validate constraint "service_inquiries_service_check";

alter table "public"."service_inquiries" add constraint "service_inquiries_status_check" CHECK ((status = ANY (ARRAY['New'::text, 'Contacted'::text, 'In Progress'::text, 'Closed'::text]))) not valid;

alter table "public"."service_inquiries" validate constraint "service_inquiries_status_check";

alter table "public"."services" add constraint "services_slug_key" UNIQUE using index "services_slug_key";

alter table "public"."taxpayer_aliases" add constraint "taxpayer_aliases_taxpayer_id_fkey" FOREIGN KEY (taxpayer_id) REFERENCES public.taxpayers(id) ON DELETE CASCADE not valid;

alter table "public"."taxpayer_aliases" validate constraint "taxpayer_aliases_taxpayer_id_fkey";

alter table "public"."taxpayer_aliases" add constraint "taxpayer_aliases_taxpayer_id_normalized_alias_key" UNIQUE using index "taxpayer_aliases_taxpayer_id_normalized_alias_key";

alter table "public"."team_member_experience" add constraint "team_member_experience_team_member_id_fkey" FOREIGN KEY (team_member_id) REFERENCES public.team_members(id) ON DELETE CASCADE not valid;

alter table "public"."team_member_experience" validate constraint "team_member_experience_team_member_id_fkey";

alter table "public"."team_member_qualifications" add constraint "team_member_qualifications_team_member_id_fkey" FOREIGN KEY (team_member_id) REFERENCES public.team_members(id) ON DELETE CASCADE not valid;

alter table "public"."team_member_qualifications" validate constraint "team_member_qualifications_team_member_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.claim_legal_case_analysis_batch(p_limit integer DEFAULT 3)
 RETURNS TABLE(id uuid)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$ with picked as (select id from public.legal_cases where ai_analysis_status in ('queued','not_analyzed') order by updated_at asc nulls first limit greatest(1, least(p_limit, 20)) for update skip locked), claimed as (update public.legal_cases c set ai_analysis_status='analyzing', updated_at=now() from picked p where c.id=p.id returning c.id) select id from claimed; $function$
;

create or replace view "public"."cura_case_families" as  SELECT lm.id AS legal_matter_id,
    lm.title,
    lm.slug,
    lm.category,
    lm.description,
    lm.background,
    lm.claim,
    lm.cura_summary,
    lm.cura_legal_principle,
    lm.cura_implications,
    lm.published,
    count(DISTINCT p.id) AS proceeding_count,
    count(DISTINCT
        CASE
            WHEN (p.court = 'Civil Court'::text) THEN p.id
            ELSE NULL::uuid
        END) AS civil_court_count,
    count(DISTINCT
        CASE
            WHEN (p.court = 'Tax Appeal Tribunal'::text) THEN p.id
            ELSE NULL::uuid
        END) AS tat_count,
    count(DISTINCT
        CASE
            WHEN (p.court = 'High Court'::text) THEN p.id
            ELSE NULL::uuid
        END) AS high_court_count,
    count(DISTINCT
        CASE
            WHEN (p.court = 'Supreme Court'::text) THEN p.id
            ELSE NULL::uuid
        END) AS supreme_court_count,
    max(COALESCE(p.judgment_date, p.filed_date)) AS latest_proceeding_date,
    jsonb_agg(DISTINCT jsonb_build_object('proceeding_id', p.id, 'court', p.court, 'case_number', p.case_number, 'filed_date', p.filed_date, 'judgment_date', p.judgment_date, 'status', p.status, 'outcome', p.outcome, 'official_url', p.official_url, 'sort_order', p.sort_order)) FILTER (WHERE (p.id IS NOT NULL)) AS proceedings,
    jsonb_agg(DISTINCT jsonb_build_object('relationship_id', r.id, 'relationship_type', r.relationship_type, 'confidence', r.confidence, 'review_class', r.review_class, 'source_case_number', r.source_case_number, 'related_case_number', r.related_case_number, 'evidence', r.evidence)) FILTER (WHERE ((r.id IS NOT NULL) AND (r.review_class = 'safe_to_consolidate'::text))) AS confirmed_relationships
   FROM ((public.legal_matters lm
     LEFT JOIN public.proceedings p ON ((p.legal_matter_id = lm.id)))
     LEFT JOIN public.proceeding_relationships r ON (((r.proceeding_id = p.id) OR (r.related_proceeding_id = p.id))))
  GROUP BY lm.id, lm.title, lm.slug, lm.category, lm.description, lm.background, lm.claim, lm.cura_summary, lm.cura_legal_principle, lm.cura_implications, lm.published;


create or replace view "public"."cura_case_family_proceedings" as  SELECT lm.id AS legal_matter_id,
    lm.title AS legal_matter_title,
    lm.slug AS legal_matter_slug,
    p.id AS proceeding_id,
    p.court,
    p.case_number,
    p.filed_date,
    p.judgment_date,
    p.status,
    p.outcome,
    p.official_url,
    p.sort_order,
        CASE
            WHEN (p.court = 'Civil Court'::text) THEN 1
            WHEN (p.court = 'Tax Appeal Tribunal'::text) THEN 2
            WHEN (p.court = 'High Court'::text) THEN 3
            WHEN (p.court = 'Supreme Court'::text) THEN 4
            ELSE 5
        END AS court_order
   FROM (public.legal_matters lm
     JOIN public.proceedings p ON ((p.legal_matter_id = lm.id)));


CREATE OR REPLACE FUNCTION public.cura_clean_analysis_text(v jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$ declare k text; x jsonb; out jsonb; s text; begin if jsonb_typeof(v) = 'string' then s := v #>> '{}'; s := regexp_replace(s, '^The supplied case data describes ', 'The case describes ', 'i'); s := regexp_replace(s, '^The supplied case data indicates that ', '', 'i'); s := regexp_replace(s, '^The supplied case record states that ', '', 'i'); s := regexp_replace(s, '^The supplied case record states ', '', 'i'); s := regexp_replace(s, '^The supplied proceeding metadata records that ', '', 'i'); s := regexp_replace(s, '^The supplied proceeding metadata records ', '', 'i'); s := regexp_replace(s, '^The supplied records indicate that ', '', 'i'); s := regexp_replace(s, '^The supplied records indicate ', '', 'i'); s := regexp_replace(s, '^The available records indicate that ', '', 'i'); s := regexp_replace(s, '^The available records indicate ', '', 'i'); s := regexp_replace(s, '^The available case record states that ', '', 'i'); s := regexp_replace(s, '^The available case record states ', '', 'i'); s := regexp_replace(s, '^The available proceeding metadata records that ', '', 'i'); s := regexp_replace(s, '^The available proceeding metadata records ', '', 'i'); s := regexp_replace(s, '^According to the supplied case record, ', '', 'i'); s := regexp_replace(s, '^According to the available case record, ', '', 'i'); s := regexp_replace(s, '^Based on the supplied case record, ', '', 'i'); s := regexp_replace(s, '^Based on the available case record, ', '', 'i'); s := regexp_replace(s, '^The supplied source material indicates that ', '', 'i'); s := regexp_replace(s, '^The supplied source material indicates ', '', 'i'); return to_jsonb(s); elsif jsonb_typeof(v) = 'array' then out := '[]'::jsonb; for x in select value from jsonb_array_elements(v) loop out := out || jsonb_build_array(public.cura_clean_analysis_text(x)); end loop; return out; elsif jsonb_typeof(v) = 'object' then out := '{}'::jsonb; for k, x in select key, value from jsonb_each(v) loop out := out || jsonb_build_object(k, public.cura_clean_analysis_text(x)); end loop; return out; end if; return v; end; $function$
;

CREATE OR REPLACE FUNCTION public.cura_polish_case_section(s text)
 RETURNS text
 LANGUAGE plpgsql
 IMMUTABLE
AS $function$ declare t text := coalesce(s,''); begin t := regexp_replace(t, '^The supplied MIRA description states only that ', '', 'i'); t := regexp_replace(t, '^The supplied MIRA description states that ', '', 'i'); t := regexp_replace(t, '^The supplied record identifies the subject matter as ', 'The case concerns ', 'i'); t := regexp_replace(t, '^The supplied record identifies ', 'The case identifies ', 'i'); t := regexp_replace(t, '^The supplied record describes ', 'The case concerns ', 'i'); t := regexp_replace(t, '^The supplied record states that ', '', 'i'); t := regexp_replace(t, '^The supplied record states ', '', 'i'); t := regexp_replace(t, '^The supplied records state that ', '', 'i'); t := regexp_replace(t, '^The supplied records indicate that ', '', 'i'); t := regexp_replace(t, '^The supplied records indicate ', '', 'i'); t := regexp_replace(t, '^The supplied proceeding record states that ', '', 'i'); t := regexp_replace(t, '^The supplied proceeding record indicates that ', '', 'i'); t := regexp_replace(t, '^The supplied case data describes ', 'The case concerns ', 'i'); t := regexp_replace(t, '^The supplied case data indicates that ', '', 'i'); t := regexp_replace(t, '^The supplied case data states that ', '', 'i'); t := regexp_replace(t, '^The supplied source material indicates that ', '', 'i'); t := regexp_replace(t, '^The available case record states that ', '', 'i'); t := regexp_replace(t, '^The available records indicate that ', '', 'i'); t := regexp_replace(t, '^According to the supplied (case )?record, ', '', 'i'); t := regexp_replace(t, '^Based on the supplied (case )?record, ', '', 'i'); t := regexp_replace(t, 'the supplied record', 'the MIRA record', 'gi'); t := regexp_replace(t, 'the supplied records', 'the MIRA record', 'gi'); t := regexp_replace(t, 'the supplied case record', 'the MIRA record', 'gi'); t := regexp_replace(t, 'the supplied case data', 'the case record', 'gi'); t := regexp_replace(t, 'the supplied MIRA description', 'the MIRA description', 'gi'); t := regexp_replace(t, 'were supplied\.', 'are available.', 'gi'); t := regexp_replace(t, 'was supplied\.', 'is available.', 'gi'); t := regexp_replace(t, 'is supplied\.', 'is available.', 'gi'); t := regexp_replace(t, 'are supplied\.', 'are available.', 'gi'); if t <> '' and substr(t,1,1) between 'a' and 'z' then t := upper(substr(t,1,1)) || substr(t,2); end if; return t; end; $function$
;

create or replace view "public"."cura_public_case_detail" as  SELECT lm.id AS legal_matter_id,
    lm.slug,
    lm.title,
    lm.category,
    lm.description,
    lm.background,
    lm.claim,
    lm.cura_summary,
    lm.cura_legal_principle,
    lm.cura_implications,
    lm.published,
    COALESCE(jsonb_agg(DISTINCT jsonb_build_object('party_id', pty.id, 'name', pty.name, 'role', lmp.role, 'party_type', pty.party_type)) FILTER (WHERE (pty.id IS NOT NULL)), '[]'::jsonb) AS parties,
    COALESCE(jsonb_agg(DISTINCT jsonb_build_object('proceeding_id', p.id, 'court', p.court, 'case_number', p.case_number, 'filed_date', p.filed_date, 'judgment_date', p.judgment_date, 'status', p.status, 'outcome', p.outcome, 'official_url', p.official_url, 'sort_order', p.sort_order)) FILTER (WHERE (p.id IS NOT NULL)), '[]'::jsonb) AS proceedings,
    count(DISTINCT p.id) AS proceeding_count,
    max(COALESCE(p.judgment_date, p.filed_date)) AS latest_date
   FROM (((public.legal_matters lm
     LEFT JOIN public.legal_matter_parties lmp ON ((lmp.legal_matter_id = lm.id)))
     LEFT JOIN public.parties pty ON ((pty.id = lmp.party_id)))
     LEFT JOIN public.proceedings p ON ((p.legal_matter_id = lm.id)))
  GROUP BY lm.id, lm.slug, lm.title, lm.category, lm.description, lm.background, lm.claim, lm.cura_summary, lm.cura_legal_principle, lm.cura_implications, lm.published;


create or replace view "public"."cura_published_case_index" as  SELECT lm.id AS legal_matter_id,
    lm.title,
    lm.slug,
    lm.category,
    lm.verification_status,
    lm.published,
    lm.updated_at,
    cf.proceeding_count,
    cf.civil_court_count,
    cf.tat_count,
    cf.high_court_count,
    cf.supreme_court_count,
    cf.latest_proceeding_date
   FROM (public.legal_matters lm
     LEFT JOIN public.cura_case_families cf ON ((cf.legal_matter_id = lm.id)))
  WHERE (lm.published = true);


CREATE OR REPLACE FUNCTION public.education_find_adjacent_duplicate_sections(p_topic_id uuid)
 RETURNS TABLE(section_id uuid, duplicate_of uuid, title text, display_order integer)
 LANGUAGE sql
 STABLE
AS $function$
  with ordered as (
    select s.id, s.title, s.display_order,
           lag(s.id) over(order by s.display_order, s.created_at) as prev_id,
           lag(s.title) over(order by s.display_order, s.created_at) as prev_title
    from public.education_sections s
    where s.topic_id = p_topic_id
      and s.is_published = false
  )
  select id, prev_id, title, display_order
  from ordered
  where prev_id is not null
    and public.education_normalize_title(title) = public.education_normalize_title(prev_title);
$function$
;

create or replace view "public"."education_leaderboard" as  SELECT a.id,
    a.quiz_id,
    q.title AS quiz_title,
    a.participant_name,
    a.score,
    a.total_points,
    a.percentage,
    a.duration_seconds,
    a.created_at
   FROM (public.education_attempts a
     JOIN public.education_quizzes q ON ((q.id = a.quiz_id)))
  WHERE (q.is_published = true);


CREATE OR REPLACE FUNCTION public.education_merge_adjacent_duplicate_sections(p_topic_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
declare
  v_merged integer := 0;
  v_prev uuid;
  v_dup uuid;
  v_max_order integer;
begin
  loop
    with ordered as (
      select s.id, s.title,
             lag(s.id) over(order by s.display_order, s.created_at) as prev_id,
             lag(s.title) over(order by s.display_order, s.created_at) as prev_title
      from public.education_sections s
      where s.topic_id = p_topic_id and s.is_published = false
    )
    select prev_id, id into v_prev, v_dup
    from ordered
    where prev_id is not null
      and public.education_normalize_title(title) = public.education_normalize_title(prev_title)
    order by id
    limit 1;

    exit when v_dup is null;

    select coalesce(max(display_order), -1) + 1 into v_max_order
    from public.education_content_blocks
    where section_id = v_prev;

    update public.education_content_blocks
    set section_id = v_prev,
        display_order = v_max_order + display_order
    where section_id = v_dup;

    update public.education_sources set section_id = v_prev where section_id = v_dup;
    update public.education_content_versions set section_id = v_prev where section_id = v_dup;

    delete from public.education_sections where id = v_dup;
    v_merged := v_merged + 1;
  end loop;

  return v_merged;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.education_normalize_title(p_title text)
 RETURNS text
 LANGUAGE sql
 IMMUTABLE
AS $function$
  select regexp_replace(lower(trim(coalesce(p_title,''))), '[^[:alnum:][:space:]]+', '', 'g');
$function$
;

create or replace view "public"."education_question_bank_progress" as  SELECT t.subject,
    t.target_questions,
    count(q.id) FILTER (WHERE ((q.status = 'active'::text) AND ((q.effective_from IS NULL) OR (q.effective_from <= CURRENT_DATE)) AND ((q.effective_to IS NULL) OR (q.effective_to >= CURRENT_DATE)))) AS active_questions,
    GREATEST((t.target_questions - count(q.id) FILTER (WHERE ((q.status = 'active'::text) AND ((q.effective_from IS NULL) OR (q.effective_from <= CURRENT_DATE)) AND ((q.effective_to IS NULL) OR (q.effective_to >= CURRENT_DATE))))), (0)::bigint) AS remaining_questions
   FROM (public.education_question_targets t
     LEFT JOIN public.education_questions q ON ((q.subject = t.subject)))
  GROUP BY t.subject, t.target_questions;


CREATE OR REPLACE FUNCTION public.education_question_bank_total()
 RETURNS jsonb
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
select jsonb_build_object(
  'target_questions', coalesce(sum(target_questions),0),
  'active_questions', coalesce((select count(*) from education_questions where status='active' and (effective_from is null or effective_from <= current_date) and (effective_to is null or effective_to >= current_date)),0),
  'remaining_questions', greatest(coalesce(sum(target_questions),0) - coalesce((select count(*) from education_questions where status='active' and (effective_from is null or effective_from <= current_date) and (effective_to is null or effective_to >= current_date)),0),0)
) from education_question_targets;
$function$
;

create or replace view "public"."education_quiz_questions" as  SELECT id,
    quiz_id,
    question_text,
    options,
    points,
    sort_order
   FROM public.education_questions;


CREATE OR REPLACE FUNCTION public.education_session_questions(p_session_id uuid)
 RETURNS TABLE(id uuid, quiz_id uuid, question_text text, options jsonb, points integer, sort_order integer)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
select q.id,q.quiz_id,q.question_text,q.options,q.points,q.sort_order from public.education_test_sessions as s join public.education_questions as q on q.id=any(s.question_ids) where s.id=p_session_id and s.submitted_at is null order by array_position(s.question_ids,q.id);
$function$
;

CREATE OR REPLACE FUNCTION public.ensure_accounting_topic_quizzes(payload jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  t jsonb; q jsonb; quizid uuid; existing_count int; qtext text; opts jsonb; ans int; inserted_count int:=0; topic_count int:=0; qidx int:=0;
begin
  for t in select value from jsonb_array_elements(payload->'topics') loop
    select id into quizid from education_quizzes where title=(t->>'title') || ' — Topic Quiz' limit 1;
    if quizid is null then
      insert into education_quizzes(title,description,category,time_limit_seconds,is_published) values((t->>'title') || ' — Topic Quiz','Source-derived knowledge check for this accounting topic.','Accounting',600,true) returning id into quizid;
    else update education_quizzes set is_published=true,category='Accounting' where id=quizid; end if;
    select count(*) into existing_count from education_questions where quiz_id=quizid;
    qidx:=0;
    if existing_count<3 then
      for q in select value from jsonb_array_elements(coalesce(t->'quiz','[]'::jsonb)) loop
        qidx:=qidx+1;
        qtext:=coalesce(q->>'question','');
        if qtext ilike 'Which statement is supported by the source material for this topic?' then qtext:='Which of the following statements is correct? [Knowledge check '||qidx||']'; end if;
        opts:=coalesce(q->'options','[]'::jsonb); ans:=coalesce((q->>'answer')::int,0);
        if not exists(select 1 from education_questions where quiz_id=quizid and question_text=qtext) then
          insert into education_questions(id,quiz_id,question_text,options,correct_option,explanation,points,sort_order,subject,topic,difficulty,status,source_name)
          values(gen_random_uuid(),quizid,qtext,opts,ans,'Source-derived knowledge check based on the CURA accounting source material.',1,(select coalesce(max(sort_order),-1)+1 from education_questions eq where eq.quiz_id=quizid),'Accounting',t->>'slug','Intermediate','active','CURA accounting source material');
          inserted_count:=inserted_count+1;
        end if;
        select count(*) into existing_count from education_questions where quiz_id=quizid;
        exit when existing_count>=3;
      end loop;
    end if;
    update education_quizzes set is_published=true where id=quizid;
    topic_count:=topic_count+1;
  end loop;
  return jsonb_build_object('topics',topic_count,'questions_added',inserted_count);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.import_accounting_source_content(payload jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  t jsonb; b jsonb; p jsonb; tid uuid; sid uuid; bid uuid; i int;
  imported_topics int := 0; imported_blocks int := 0; imported_items int := 0; imported_practice int := 0;
begin
  if payload is null or jsonb_typeof(payload->'topics') <> 'array' then raise exception 'Invalid accounting content payload'; end if;
  for t in select value from jsonb_array_elements(payload->'topics') loop
    select id into tid from education_topics where slug=t->>'slug';
    if tid is null then
      insert into education_topics(slug,title,standard,description,category,is_published,status,published_at,source_reference)
      values(t->>'slug',t->>'title',nullif(t->>'standard',''),'Structured from the CURA accounting source material.','Accounting',true,'published',now(),'CURA accounting source material') returning id into tid;
    else
      update education_topics set title=coalesce(nullif(t->>'title',''),title),standard=coalesce(nullif(t->>'standard',''),standard),category='Accounting',is_published=true,status='published',published_at=coalesce(published_at,now()),source_reference='CURA accounting source material',updated_at=now() where id=tid;
    end if;
    delete from education_content_blocks where section_id in (select id from education_sections where topic_id=tid);
    delete from education_sections where topic_id=tid;
    i:=0;
    for b in select value from jsonb_array_elements(coalesce(t->'blocks','[]'::jsonb)) loop
      insert into education_sections(topic_id,title,section_type,display_order,is_published,presentation) values(tid,coalesce(nullif(b->>'title',''),'Further detail'),'section',i,true,'{}'::jsonb) returning id into sid;
      insert into education_content_blocks(section_id,block_type,title,content,display_order,is_published,presentation)
      values(sid,case when jsonb_array_length(coalesce(b->'items','[]'::jsonb))>1 then 'bullet_list' else 'paragraph' end,coalesce(nullif(b->>'title',''),'Further detail'),coalesce((select string_agg(value,E'\n') from jsonb_array_elements_text(coalesce(b->'items','[]'::jsonb))),''),0,true,'{}'::jsonb) returning id into bid;
      insert into education_block_items(block_id,content,item_type,display_order) select bid,value,'item',ord-1 from jsonb_array_elements_text(coalesce(b->'items','[]'::jsonb)) with ordinality x(value,ord);
      imported_blocks:=imported_blocks+1; imported_items:=imported_items+jsonb_array_length(coalesce(b->'items','[]'::jsonb)); i:=i+1;
    end loop;
    for p in select value from jsonb_array_elements(coalesce(t->'practice','[]'::jsonb)) loop
      insert into education_sections(topic_id,title,section_type,display_order,is_published,presentation) values(tid,'Source practice questions','practice',i,true,'{}'::jsonb) returning id into sid;
      insert into education_content_blocks(section_id,block_type,title,content,display_order,is_published,presentation)
      values(sid,'example',coalesce(p->>'title','Practice set'),coalesce(p->>'question','') || case when coalesce(p->>'answer','')<>'' then E'\n\nAnswer / source solution:\n' || (p->>'answer') else '' end,0,true,'{}'::jsonb) returning id into bid;
      imported_practice:=imported_practice+1; i:=i+1;
    end loop;
    imported_topics:=imported_topics+1;
  end loop;
  return jsonb_build_object('topics',imported_topics,'blocks',imported_blocks,'items',imported_items,'practice_sets',imported_practice);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_cura_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.is_current_user_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$function$
;

CREATE OR REPLACE FUNCTION public.process_accounting_github_quizzes(request_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'net'
AS $function$
declare body text; payload jsonb;
begin
 select content into body from net._http_response where id=request_id and status_code=200 limit 1;
 if body is null then raise exception 'No successful GitHub response for request %',request_id; end if;
 body := substring(body from position('export const accountingTopics' in body));
 body := regexp_replace(body, '^export const accountingTopics:\s*AccountingTopic\[\]\s*=\s*', '');
 body := split_part(body, 'export const accountingTopicSlugs', 1);
 payload := jsonb_build_object('topics', body::jsonb);
 return public.ensure_accounting_topic_quizzes(payload);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.process_accounting_github_response(request_id bigint)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'net'
AS $function$
declare body text; payload jsonb;
begin
 select content into body from net._http_response where id=request_id and status_code=200 limit 1;
 if body is null then raise exception 'No successful GitHub response for request %',request_id; end if;
 body := substring(body from position('export const accountingTopics' in body));
 body := regexp_replace(body, '^export const accountingTopics:\s*AccountingTopic\[\]\s*=\s*', '');
 body := split_part(body, 'export const accountingTopicSlugs', 1);
 payload := jsonb_build_object('topics', body::jsonb);
 return public.import_accounting_source_content(payload);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.queue_case_analysis_after_source_verification()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  if new.source_status = 'verified' and (old.source_status is distinct from 'verified') then
    update public.legal_case_processing_queue q
    set status = 'queued',
        last_error = null,
        updated_at = now()
    where q.case_id in (
      select c.id
      from public.case_proceedings cp
      join public.proceedings p on p.case_number = cp.case_number
      join public.legal_matters lm on lm.id = p.legal_matter_id
      join public.legal_cases c on c.legal_matter_id = lm.id
      where cp.id = new.id
    );
  end if;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_education_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_other_services_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$ begin new.updated_at = now(); return new; end; $function$
;

CREATE OR REPLACE FUNCTION public.set_service_inquiry_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.start_education_test(p_quiz_id uuid, p_participant_name text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_quiz education_quizzes%rowtype;
  v_session education_test_sessions%rowtype;
  v_questions jsonb;
  v_answer_key jsonb;
begin
  select * into v_quiz from education_quizzes where id=p_quiz_id and is_published=true;
  if not found then raise exception 'Test is not available.'; end if;
  if length(trim(p_participant_name))<2 or length(trim(p_participant_name))>80 then raise exception 'Please enter a valid name.'; end if;

  with pools as (
    select q.*,
      row_number() over(
        partition by case
          when q.topic in ('GST','Goods and Services Tax') then 'GST'
          when q.topic in ('Income Tax','Income Tax Act') then 'INCOME'
          when q.topic in ('Tax Administration','MIRA Tax Audit Framework','Tax Audit Framework') then 'ADMIN_AUDIT'
          when q.topic in ('Transfer Pricing','Advance Pricing Arrangement') then 'TP'
          when q.topic in ('Green Tax','Airport Taxes and Fees','Airport Taxes & Fees') then 'OTHER_TAX'
          when q.subject in ('IFRS','IAS','Accounting','Accounting & Financial Reporting','Audit & Assurance') then 'ACCOUNTING'
          else 'OTHER'
        end
        order by random()
      ) as pool_rank,
      case
        when q.topic in ('GST','Goods and Services Tax') then 'GST'
        when q.topic in ('Income Tax','Income Tax Act') then 'INCOME'
        when q.topic in ('Tax Administration','MIRA Tax Audit Framework','Tax Audit Framework') then 'ADMIN_AUDIT'
        when q.topic in ('Transfer Pricing','Advance Pricing Arrangement') then 'TP'
        when q.topic in ('Green Tax','Airport Taxes and Fees','Airport Taxes & Fees') then 'OTHER_TAX'
        when q.subject in ('IFRS','IAS','Accounting','Accounting & Financial Reporting','Audit & Assurance') then 'ACCOUNTING'
        else 'OTHER'
      end as pool
    from education_questions q
    where q.quiz_id=p_quiz_id
      and q.status='active'
      and (q.effective_from is null or q.effective_from<=current_date)
      and (q.effective_to is null or q.effective_to>=current_date)
      and coalesce(q.source_name,'')<>''
      and coalesce(q.source_section,'')<>''
      and jsonb_array_length(q.options)=4
  ), selected as (
    select * from pools where pool='INCOME' and pool_rank<=2
    union all select * from pools where pool='GST' and pool_rank<=2
    union all select * from pools where pool='ADMIN_AUDIT' and pool_rank<=1
    union all select * from pools where pool='TP' and pool_rank<=1
    union all select * from pools where pool='OTHER_TAX' and pool_rank<=2
    union all select * from pools where pool='ACCOUNTING' and pool_rank<=2
  ), ordered as (
    select selected.*, row_number() over(order by random()) as question_no
    from selected
  ), finalq as (
    select ordered.*, ((question_no - 1) % 4) as target_correct_position
    from ordered
  ), formatted as (
    select id, quiz_id, question_text, points, question_no, target_correct_position,
      case target_correct_position
        when 0 then jsonb_build_array(options->correct_option, options->((correct_option+1)%4), options->((correct_option+2)%4), options->((correct_option+3)%4))
        when 1 then jsonb_build_array(options->((correct_option+3)%4), options->correct_option, options->((correct_option+1)%4), options->((correct_option+2)%4))
        when 2 then jsonb_build_array(options->((correct_option+2)%4), options->((correct_option+3)%4), options->correct_option, options->((correct_option+1)%4))
        when 3 then jsonb_build_array(options->((correct_option+1)%4), options->((correct_option+2)%4), options->((correct_option+3)%4), options->correct_option)
      end as presented_options
    from finalq
  )
  select
    jsonb_agg(jsonb_build_object('id',id,'quiz_id',quiz_id,'question_text',question_text,'options',presented_options,'points',points,'sort_order',question_no) order by question_no),
    jsonb_object_agg(id::text,target_correct_position)
  into v_questions, v_answer_key
  from formatted;

  if jsonb_array_length(coalesce(v_questions,'[]'::jsonb))<>10 then
    raise exception 'The active question bank does not yet contain enough questions across the required subject areas.';
  end if;

  insert into education_test_sessions(quiz_id,participant_name,question_ids,answer_key,started_at,expires_at)
  values(
    p_quiz_id,
    trim(p_participant_name),
    (select array_agg((x->>'id')::uuid order by (x->>'sort_order')::int) from jsonb_array_elements(v_questions) x),
    v_answer_key,
    now(),
    now()+make_interval(secs=>v_quiz.time_limit_seconds)
  ) returning * into v_session;

  return jsonb_build_object('session_id',v_session.id,'quiz_id',v_session.quiz_id,'participant_name',v_session.participant_name,'started_at',v_session.started_at,'expires_at',v_session.expires_at,'time_limit_seconds',v_quiz.time_limit_seconds,'questions',v_questions);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.submit_education_attempt(p_quiz_id uuid, p_participant_name text, p_answers jsonb, p_duration_seconds integer, p_session_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  s education_test_sessions%rowtype;
  q education_questions%rowtype;
  v_score integer:=0;
  v_total integer:=0;
  v_review jsonb:='[]'::jsonb;
  v_selected integer;
  v_correct_position integer;
  v_original_selected integer;
  v_your_answer text;
  v_correct_answer text;
begin
  select * into s from education_test_sessions where id=p_session_id and quiz_id=p_quiz_id for update;
  if not found then raise exception 'Invalid test session.'; end if;
  if s.submitted_at is not null then raise exception 'This test has already been submitted.'; end if;
  if trim(p_participant_name)<>s.participant_name then raise exception 'Participant name does not match the test session.'; end if;
  if now()>s.expires_at then p_duration_seconds:=greatest(0,extract(epoch from(s.expires_at-s.started_at))::integer); else p_duration_seconds:=greatest(0,extract(epoch from(now()-s.started_at))::integer); end if;

  for q in select * from education_questions where id=any(s.question_ids) order by array_position(s.question_ids,id) loop
    v_total:=v_total+q.points;
    v_selected:=null;
    select case when x->>'selected_option' is null then null else (x->>'selected_option')::integer end into v_selected
    from jsonb_array_elements(coalesce(p_answers,'[]'::jsonb)) x
    where x->>'question_id'=q.id::text limit 1;

    v_correct_position:=coalesce((s.answer_key->>q.id::text)::integer,q.correct_option);
    v_original_selected:=case when v_selected is null then null else (q.correct_option + v_selected - v_correct_position + 4) % 4 end;

    if v_selected is not null and v_selected=v_correct_position then
      v_score:=v_score+q.points;
    else
      v_your_answer:=case when v_selected is null then 'Not answered' else coalesce(q.options->>v_original_selected,'Invalid option') end;
      v_correct_answer:=q.options->>q.correct_option;
      v_review:=v_review||jsonb_build_object('question_id',q.id,'question',q.question_text,'your_answer',v_your_answer,'correct_answer',v_correct_answer,'reason',q.explanation,'source_url',q.source_url);
    end if;
  end loop;

  update education_test_sessions set submitted_at=now() where id=s.id;
  insert into education_attempts(quiz_id,participant_name,score,total_points,percentage,duration_seconds) values(p_quiz_id,s.participant_name,v_score,v_total,round((v_score::numeric/greatest(v_total,1))*100,2),p_duration_seconds);
  return jsonb_build_object('score',v_score,'total_points',v_total,'percentage',round((v_score::numeric/greatest(v_total,1))*100,2),'duration_seconds',p_duration_seconds,'review',v_review);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.sync_accounting_content_from_github()
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'net'
AS $function$
declare
  request_id bigint;
  body text;
  payload jsonb;
  attempt int := 0;
begin
  select net.http_get('https://raw.githubusercontent.com/Salterramv/cura-website/main/app/education/materials/accounting/data/accountingTopicsBase.ts') into request_id;
  while attempt < 30 loop
    select r.content into body from net._http_response r where r.id=request_id and r.status_code=200 order by r.created desc limit 1;
    exit when body is not null;
    perform pg_sleep(1);
    attempt := attempt + 1;
  end loop;
  if body is null then raise exception 'GitHub source fetch did not complete'; end if;
  body := substring(body from position('export const accountingTopics' in body));
  body := regexp_replace(body, '^export const accountingTopics:\s*AccountingTopic\[\]\s*=\s*', '');
  body := split_part(body, 'export const accountingTopicSlugs', 1);
  payload := jsonb_build_object('topics', body::jsonb);
  return public.import_accounting_source_content(payload);
end;
$function$
;

CREATE OR REPLACE FUNCTION public.update_team_members_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

grant delete on table "public"."admin_users" to "service_role";

grant insert on table "public"."admin_users" to "service_role";

grant references on table "public"."admin_users" to "service_role";

grant select on table "public"."admin_users" to "service_role";

grant trigger on table "public"."admin_users" to "service_role";

grant truncate on table "public"."admin_users" to "service_role";

grant update on table "public"."admin_users" to "service_role";

grant delete on table "public"."articles" to "anon";

grant insert on table "public"."articles" to "anon";

grant references on table "public"."articles" to "anon";

grant select on table "public"."articles" to "anon";

grant trigger on table "public"."articles" to "anon";

grant truncate on table "public"."articles" to "anon";

grant update on table "public"."articles" to "anon";

grant delete on table "public"."articles" to "authenticated";

grant insert on table "public"."articles" to "authenticated";

grant references on table "public"."articles" to "authenticated";

grant select on table "public"."articles" to "authenticated";

grant trigger on table "public"."articles" to "authenticated";

grant truncate on table "public"."articles" to "authenticated";

grant update on table "public"."articles" to "authenticated";

grant delete on table "public"."articles" to "service_role";

grant insert on table "public"."articles" to "service_role";

grant references on table "public"."articles" to "service_role";

grant select on table "public"."articles" to "service_role";

grant trigger on table "public"."articles" to "service_role";

grant truncate on table "public"."articles" to "service_role";

grant update on table "public"."articles" to "service_role";

grant delete on table "public"."careers" to "anon";

grant insert on table "public"."careers" to "anon";

grant references on table "public"."careers" to "anon";

grant select on table "public"."careers" to "anon";

grant trigger on table "public"."careers" to "anon";

grant truncate on table "public"."careers" to "anon";

grant update on table "public"."careers" to "anon";

grant delete on table "public"."careers" to "authenticated";

grant insert on table "public"."careers" to "authenticated";

grant references on table "public"."careers" to "authenticated";

grant select on table "public"."careers" to "authenticated";

grant trigger on table "public"."careers" to "authenticated";

grant truncate on table "public"."careers" to "authenticated";

grant update on table "public"."careers" to "authenticated";

grant delete on table "public"."careers" to "service_role";

grant insert on table "public"."careers" to "service_role";

grant references on table "public"."careers" to "service_role";

grant select on table "public"."careers" to "service_role";

grant trigger on table "public"."careers" to "service_role";

grant truncate on table "public"."careers" to "service_role";

grant update on table "public"."careers" to "service_role";

grant delete on table "public"."case_documents" to "anon";

grant insert on table "public"."case_documents" to "anon";

grant references on table "public"."case_documents" to "anon";

grant select on table "public"."case_documents" to "anon";

grant trigger on table "public"."case_documents" to "anon";

grant truncate on table "public"."case_documents" to "anon";

grant update on table "public"."case_documents" to "anon";

grant delete on table "public"."case_documents" to "authenticated";

grant insert on table "public"."case_documents" to "authenticated";

grant references on table "public"."case_documents" to "authenticated";

grant select on table "public"."case_documents" to "authenticated";

grant trigger on table "public"."case_documents" to "authenticated";

grant truncate on table "public"."case_documents" to "authenticated";

grant update on table "public"."case_documents" to "authenticated";

grant delete on table "public"."case_documents" to "service_role";

grant insert on table "public"."case_documents" to "service_role";

grant references on table "public"."case_documents" to "service_role";

grant select on table "public"."case_documents" to "service_role";

grant trigger on table "public"."case_documents" to "service_role";

grant truncate on table "public"."case_documents" to "service_role";

grant update on table "public"."case_documents" to "service_role";

grant delete on table "public"."case_issues" to "anon";

grant insert on table "public"."case_issues" to "anon";

grant references on table "public"."case_issues" to "anon";

grant select on table "public"."case_issues" to "anon";

grant trigger on table "public"."case_issues" to "anon";

grant truncate on table "public"."case_issues" to "anon";

grant update on table "public"."case_issues" to "anon";

grant delete on table "public"."case_issues" to "authenticated";

grant insert on table "public"."case_issues" to "authenticated";

grant references on table "public"."case_issues" to "authenticated";

grant select on table "public"."case_issues" to "authenticated";

grant trigger on table "public"."case_issues" to "authenticated";

grant truncate on table "public"."case_issues" to "authenticated";

grant update on table "public"."case_issues" to "authenticated";

grant delete on table "public"."case_issues" to "service_role";

grant insert on table "public"."case_issues" to "service_role";

grant references on table "public"."case_issues" to "service_role";

grant select on table "public"."case_issues" to "service_role";

grant trigger on table "public"."case_issues" to "service_role";

grant truncate on table "public"."case_issues" to "service_role";

grant update on table "public"."case_issues" to "service_role";

grant delete on table "public"."case_proceedings" to "anon";

grant insert on table "public"."case_proceedings" to "anon";

grant references on table "public"."case_proceedings" to "anon";

grant select on table "public"."case_proceedings" to "anon";

grant trigger on table "public"."case_proceedings" to "anon";

grant truncate on table "public"."case_proceedings" to "anon";

grant update on table "public"."case_proceedings" to "anon";

grant delete on table "public"."case_proceedings" to "authenticated";

grant insert on table "public"."case_proceedings" to "authenticated";

grant references on table "public"."case_proceedings" to "authenticated";

grant select on table "public"."case_proceedings" to "authenticated";

grant trigger on table "public"."case_proceedings" to "authenticated";

grant truncate on table "public"."case_proceedings" to "authenticated";

grant update on table "public"."case_proceedings" to "authenticated";

grant delete on table "public"."case_proceedings" to "service_role";

grant insert on table "public"."case_proceedings" to "service_role";

grant references on table "public"."case_proceedings" to "service_role";

grant select on table "public"."case_proceedings" to "service_role";

grant trigger on table "public"."case_proceedings" to "service_role";

grant truncate on table "public"."case_proceedings" to "service_role";

grant update on table "public"."case_proceedings" to "service_role";

grant delete on table "public"."case_sources" to "anon";

grant insert on table "public"."case_sources" to "anon";

grant references on table "public"."case_sources" to "anon";

grant select on table "public"."case_sources" to "anon";

grant trigger on table "public"."case_sources" to "anon";

grant truncate on table "public"."case_sources" to "anon";

grant update on table "public"."case_sources" to "anon";

grant delete on table "public"."case_sources" to "authenticated";

grant insert on table "public"."case_sources" to "authenticated";

grant references on table "public"."case_sources" to "authenticated";

grant select on table "public"."case_sources" to "authenticated";

grant trigger on table "public"."case_sources" to "authenticated";

grant truncate on table "public"."case_sources" to "authenticated";

grant update on table "public"."case_sources" to "authenticated";

grant delete on table "public"."case_sources" to "service_role";

grant insert on table "public"."case_sources" to "service_role";

grant references on table "public"."case_sources" to "service_role";

grant select on table "public"."case_sources" to "service_role";

grant trigger on table "public"."case_sources" to "service_role";

grant truncate on table "public"."case_sources" to "service_role";

grant update on table "public"."case_sources" to "service_role";

grant delete on table "public"."case_timeline" to "anon";

grant insert on table "public"."case_timeline" to "anon";

grant references on table "public"."case_timeline" to "anon";

grant select on table "public"."case_timeline" to "anon";

grant trigger on table "public"."case_timeline" to "anon";

grant truncate on table "public"."case_timeline" to "anon";

grant update on table "public"."case_timeline" to "anon";

grant delete on table "public"."case_timeline" to "authenticated";

grant insert on table "public"."case_timeline" to "authenticated";

grant references on table "public"."case_timeline" to "authenticated";

grant select on table "public"."case_timeline" to "authenticated";

grant trigger on table "public"."case_timeline" to "authenticated";

grant truncate on table "public"."case_timeline" to "authenticated";

grant update on table "public"."case_timeline" to "authenticated";

grant delete on table "public"."case_timeline" to "service_role";

grant insert on table "public"."case_timeline" to "service_role";

grant references on table "public"."case_timeline" to "service_role";

grant select on table "public"."case_timeline" to "service_role";

grant trigger on table "public"."case_timeline" to "service_role";

grant truncate on table "public"."case_timeline" to "service_role";

grant update on table "public"."case_timeline" to "service_role";

grant delete on table "public"."cura_case_processing_queue" to "anon";

grant insert on table "public"."cura_case_processing_queue" to "anon";

grant references on table "public"."cura_case_processing_queue" to "anon";

grant select on table "public"."cura_case_processing_queue" to "anon";

grant trigger on table "public"."cura_case_processing_queue" to "anon";

grant truncate on table "public"."cura_case_processing_queue" to "anon";

grant update on table "public"."cura_case_processing_queue" to "anon";

grant delete on table "public"."cura_case_processing_queue" to "authenticated";

grant insert on table "public"."cura_case_processing_queue" to "authenticated";

grant references on table "public"."cura_case_processing_queue" to "authenticated";

grant select on table "public"."cura_case_processing_queue" to "authenticated";

grant trigger on table "public"."cura_case_processing_queue" to "authenticated";

grant truncate on table "public"."cura_case_processing_queue" to "authenticated";

grant update on table "public"."cura_case_processing_queue" to "authenticated";

grant delete on table "public"."cura_case_processing_queue" to "service_role";

grant insert on table "public"."cura_case_processing_queue" to "service_role";

grant references on table "public"."cura_case_processing_queue" to "service_role";

grant select on table "public"."cura_case_processing_queue" to "service_role";

grant trigger on table "public"."cura_case_processing_queue" to "service_role";

grant truncate on table "public"."cura_case_processing_queue" to "service_role";

grant update on table "public"."cura_case_processing_queue" to "service_role";

grant delete on table "public"."education_assets" to "anon";

grant insert on table "public"."education_assets" to "anon";

grant references on table "public"."education_assets" to "anon";

grant select on table "public"."education_assets" to "anon";

grant trigger on table "public"."education_assets" to "anon";

grant truncate on table "public"."education_assets" to "anon";

grant update on table "public"."education_assets" to "anon";

grant delete on table "public"."education_assets" to "authenticated";

grant insert on table "public"."education_assets" to "authenticated";

grant references on table "public"."education_assets" to "authenticated";

grant select on table "public"."education_assets" to "authenticated";

grant trigger on table "public"."education_assets" to "authenticated";

grant truncate on table "public"."education_assets" to "authenticated";

grant update on table "public"."education_assets" to "authenticated";

grant delete on table "public"."education_assets" to "service_role";

grant insert on table "public"."education_assets" to "service_role";

grant references on table "public"."education_assets" to "service_role";

grant select on table "public"."education_assets" to "service_role";

grant trigger on table "public"."education_assets" to "service_role";

grant truncate on table "public"."education_assets" to "service_role";

grant update on table "public"."education_assets" to "service_role";

grant references on table "public"."education_attempts" to "anon";

grant trigger on table "public"."education_attempts" to "anon";

grant truncate on table "public"."education_attempts" to "anon";

grant references on table "public"."education_attempts" to "authenticated";

grant trigger on table "public"."education_attempts" to "authenticated";

grant truncate on table "public"."education_attempts" to "authenticated";

grant delete on table "public"."education_attempts" to "service_role";

grant insert on table "public"."education_attempts" to "service_role";

grant references on table "public"."education_attempts" to "service_role";

grant select on table "public"."education_attempts" to "service_role";

grant trigger on table "public"."education_attempts" to "service_role";

grant truncate on table "public"."education_attempts" to "service_role";

grant update on table "public"."education_attempts" to "service_role";

grant delete on table "public"."education_block_items" to "anon";

grant insert on table "public"."education_block_items" to "anon";

grant references on table "public"."education_block_items" to "anon";

grant select on table "public"."education_block_items" to "anon";

grant trigger on table "public"."education_block_items" to "anon";

grant truncate on table "public"."education_block_items" to "anon";

grant update on table "public"."education_block_items" to "anon";

grant delete on table "public"."education_block_items" to "authenticated";

grant insert on table "public"."education_block_items" to "authenticated";

grant references on table "public"."education_block_items" to "authenticated";

grant select on table "public"."education_block_items" to "authenticated";

grant trigger on table "public"."education_block_items" to "authenticated";

grant truncate on table "public"."education_block_items" to "authenticated";

grant update on table "public"."education_block_items" to "authenticated";

grant delete on table "public"."education_block_items" to "service_role";

grant insert on table "public"."education_block_items" to "service_role";

grant references on table "public"."education_block_items" to "service_role";

grant select on table "public"."education_block_items" to "service_role";

grant trigger on table "public"."education_block_items" to "service_role";

grant truncate on table "public"."education_block_items" to "service_role";

grant update on table "public"."education_block_items" to "service_role";

grant delete on table "public"."education_content_blocks" to "anon";

grant insert on table "public"."education_content_blocks" to "anon";

grant references on table "public"."education_content_blocks" to "anon";

grant select on table "public"."education_content_blocks" to "anon";

grant trigger on table "public"."education_content_blocks" to "anon";

grant truncate on table "public"."education_content_blocks" to "anon";

grant update on table "public"."education_content_blocks" to "anon";

grant delete on table "public"."education_content_blocks" to "authenticated";

grant insert on table "public"."education_content_blocks" to "authenticated";

grant references on table "public"."education_content_blocks" to "authenticated";

grant select on table "public"."education_content_blocks" to "authenticated";

grant trigger on table "public"."education_content_blocks" to "authenticated";

grant truncate on table "public"."education_content_blocks" to "authenticated";

grant update on table "public"."education_content_blocks" to "authenticated";

grant delete on table "public"."education_content_blocks" to "service_role";

grant insert on table "public"."education_content_blocks" to "service_role";

grant references on table "public"."education_content_blocks" to "service_role";

grant select on table "public"."education_content_blocks" to "service_role";

grant trigger on table "public"."education_content_blocks" to "service_role";

grant truncate on table "public"."education_content_blocks" to "service_role";

grant update on table "public"."education_content_blocks" to "service_role";

grant delete on table "public"."education_content_versions" to "anon";

grant insert on table "public"."education_content_versions" to "anon";

grant references on table "public"."education_content_versions" to "anon";

grant select on table "public"."education_content_versions" to "anon";

grant trigger on table "public"."education_content_versions" to "anon";

grant truncate on table "public"."education_content_versions" to "anon";

grant update on table "public"."education_content_versions" to "anon";

grant delete on table "public"."education_content_versions" to "authenticated";

grant insert on table "public"."education_content_versions" to "authenticated";

grant references on table "public"."education_content_versions" to "authenticated";

grant select on table "public"."education_content_versions" to "authenticated";

grant trigger on table "public"."education_content_versions" to "authenticated";

grant truncate on table "public"."education_content_versions" to "authenticated";

grant update on table "public"."education_content_versions" to "authenticated";

grant delete on table "public"."education_content_versions" to "service_role";

grant insert on table "public"."education_content_versions" to "service_role";

grant references on table "public"."education_content_versions" to "service_role";

grant select on table "public"."education_content_versions" to "service_role";

grant trigger on table "public"."education_content_versions" to "service_role";

grant truncate on table "public"."education_content_versions" to "service_role";

grant update on table "public"."education_content_versions" to "service_role";

grant delete on table "public"."education_interactives" to "anon";

grant insert on table "public"."education_interactives" to "anon";

grant references on table "public"."education_interactives" to "anon";

grant select on table "public"."education_interactives" to "anon";

grant trigger on table "public"."education_interactives" to "anon";

grant truncate on table "public"."education_interactives" to "anon";

grant update on table "public"."education_interactives" to "anon";

grant delete on table "public"."education_interactives" to "authenticated";

grant insert on table "public"."education_interactives" to "authenticated";

grant references on table "public"."education_interactives" to "authenticated";

grant select on table "public"."education_interactives" to "authenticated";

grant trigger on table "public"."education_interactives" to "authenticated";

grant truncate on table "public"."education_interactives" to "authenticated";

grant update on table "public"."education_interactives" to "authenticated";

grant delete on table "public"."education_interactives" to "service_role";

grant insert on table "public"."education_interactives" to "service_role";

grant references on table "public"."education_interactives" to "service_role";

grant select on table "public"."education_interactives" to "service_role";

grant trigger on table "public"."education_interactives" to "service_role";

grant truncate on table "public"."education_interactives" to "service_role";

grant update on table "public"."education_interactives" to "service_role";

grant references on table "public"."education_materials" to "anon";

grant select on table "public"."education_materials" to "anon";

grant trigger on table "public"."education_materials" to "anon";

grant truncate on table "public"."education_materials" to "anon";

grant references on table "public"."education_materials" to "authenticated";

grant select on table "public"."education_materials" to "authenticated";

grant trigger on table "public"."education_materials" to "authenticated";

grant truncate on table "public"."education_materials" to "authenticated";

grant delete on table "public"."education_materials" to "service_role";

grant insert on table "public"."education_materials" to "service_role";

grant references on table "public"."education_materials" to "service_role";

grant select on table "public"."education_materials" to "service_role";

grant trigger on table "public"."education_materials" to "service_role";

grant truncate on table "public"."education_materials" to "service_role";

grant update on table "public"."education_materials" to "service_role";

grant delete on table "public"."education_question_targets" to "anon";

grant insert on table "public"."education_question_targets" to "anon";

grant references on table "public"."education_question_targets" to "anon";

grant select on table "public"."education_question_targets" to "anon";

grant trigger on table "public"."education_question_targets" to "anon";

grant truncate on table "public"."education_question_targets" to "anon";

grant update on table "public"."education_question_targets" to "anon";

grant delete on table "public"."education_question_targets" to "authenticated";

grant insert on table "public"."education_question_targets" to "authenticated";

grant references on table "public"."education_question_targets" to "authenticated";

grant select on table "public"."education_question_targets" to "authenticated";

grant trigger on table "public"."education_question_targets" to "authenticated";

grant truncate on table "public"."education_question_targets" to "authenticated";

grant update on table "public"."education_question_targets" to "authenticated";

grant delete on table "public"."education_question_targets" to "service_role";

grant insert on table "public"."education_question_targets" to "service_role";

grant references on table "public"."education_question_targets" to "service_role";

grant select on table "public"."education_question_targets" to "service_role";

grant trigger on table "public"."education_question_targets" to "service_role";

grant truncate on table "public"."education_question_targets" to "service_role";

grant update on table "public"."education_question_targets" to "service_role";

grant references on table "public"."education_questions" to "anon";

grant trigger on table "public"."education_questions" to "anon";

grant truncate on table "public"."education_questions" to "anon";

grant references on table "public"."education_questions" to "authenticated";

grant trigger on table "public"."education_questions" to "authenticated";

grant truncate on table "public"."education_questions" to "authenticated";

grant delete on table "public"."education_questions" to "service_role";

grant insert on table "public"."education_questions" to "service_role";

grant references on table "public"."education_questions" to "service_role";

grant select on table "public"."education_questions" to "service_role";

grant trigger on table "public"."education_questions" to "service_role";

grant truncate on table "public"."education_questions" to "service_role";

grant update on table "public"."education_questions" to "service_role";

grant references on table "public"."education_quizzes" to "anon";

grant select on table "public"."education_quizzes" to "anon";

grant trigger on table "public"."education_quizzes" to "anon";

grant truncate on table "public"."education_quizzes" to "anon";

grant references on table "public"."education_quizzes" to "authenticated";

grant select on table "public"."education_quizzes" to "authenticated";

grant trigger on table "public"."education_quizzes" to "authenticated";

grant truncate on table "public"."education_quizzes" to "authenticated";

grant delete on table "public"."education_quizzes" to "service_role";

grant insert on table "public"."education_quizzes" to "service_role";

grant references on table "public"."education_quizzes" to "service_role";

grant select on table "public"."education_quizzes" to "service_role";

grant trigger on table "public"."education_quizzes" to "service_role";

grant truncate on table "public"."education_quizzes" to "service_role";

grant update on table "public"."education_quizzes" to "service_role";

grant delete on table "public"."education_sections" to "anon";

grant insert on table "public"."education_sections" to "anon";

grant references on table "public"."education_sections" to "anon";

grant select on table "public"."education_sections" to "anon";

grant trigger on table "public"."education_sections" to "anon";

grant truncate on table "public"."education_sections" to "anon";

grant update on table "public"."education_sections" to "anon";

grant delete on table "public"."education_sections" to "authenticated";

grant insert on table "public"."education_sections" to "authenticated";

grant references on table "public"."education_sections" to "authenticated";

grant select on table "public"."education_sections" to "authenticated";

grant trigger on table "public"."education_sections" to "authenticated";

grant truncate on table "public"."education_sections" to "authenticated";

grant update on table "public"."education_sections" to "authenticated";

grant delete on table "public"."education_sections" to "service_role";

grant insert on table "public"."education_sections" to "service_role";

grant references on table "public"."education_sections" to "service_role";

grant select on table "public"."education_sections" to "service_role";

grant trigger on table "public"."education_sections" to "service_role";

grant truncate on table "public"."education_sections" to "service_role";

grant update on table "public"."education_sections" to "service_role";

grant delete on table "public"."education_sources" to "anon";

grant insert on table "public"."education_sources" to "anon";

grant references on table "public"."education_sources" to "anon";

grant select on table "public"."education_sources" to "anon";

grant trigger on table "public"."education_sources" to "anon";

grant truncate on table "public"."education_sources" to "anon";

grant update on table "public"."education_sources" to "anon";

grant delete on table "public"."education_sources" to "authenticated";

grant insert on table "public"."education_sources" to "authenticated";

grant references on table "public"."education_sources" to "authenticated";

grant select on table "public"."education_sources" to "authenticated";

grant trigger on table "public"."education_sources" to "authenticated";

grant truncate on table "public"."education_sources" to "authenticated";

grant update on table "public"."education_sources" to "authenticated";

grant delete on table "public"."education_sources" to "service_role";

grant insert on table "public"."education_sources" to "service_role";

grant references on table "public"."education_sources" to "service_role";

grant select on table "public"."education_sources" to "service_role";

grant trigger on table "public"."education_sources" to "service_role";

grant truncate on table "public"."education_sources" to "service_role";

grant update on table "public"."education_sources" to "service_role";

grant delete on table "public"."education_tables" to "anon";

grant insert on table "public"."education_tables" to "anon";

grant references on table "public"."education_tables" to "anon";

grant select on table "public"."education_tables" to "anon";

grant trigger on table "public"."education_tables" to "anon";

grant truncate on table "public"."education_tables" to "anon";

grant update on table "public"."education_tables" to "anon";

grant delete on table "public"."education_tables" to "authenticated";

grant insert on table "public"."education_tables" to "authenticated";

grant references on table "public"."education_tables" to "authenticated";

grant select on table "public"."education_tables" to "authenticated";

grant trigger on table "public"."education_tables" to "authenticated";

grant truncate on table "public"."education_tables" to "authenticated";

grant update on table "public"."education_tables" to "authenticated";

grant delete on table "public"."education_tables" to "service_role";

grant insert on table "public"."education_tables" to "service_role";

grant references on table "public"."education_tables" to "service_role";

grant select on table "public"."education_tables" to "service_role";

grant trigger on table "public"."education_tables" to "service_role";

grant truncate on table "public"."education_tables" to "service_role";

grant update on table "public"."education_tables" to "service_role";

grant delete on table "public"."education_test_sessions" to "service_role";

grant insert on table "public"."education_test_sessions" to "service_role";

grant references on table "public"."education_test_sessions" to "service_role";

grant select on table "public"."education_test_sessions" to "service_role";

grant trigger on table "public"."education_test_sessions" to "service_role";

grant truncate on table "public"."education_test_sessions" to "service_role";

grant update on table "public"."education_test_sessions" to "service_role";

grant delete on table "public"."education_topics" to "anon";

grant insert on table "public"."education_topics" to "anon";

grant references on table "public"."education_topics" to "anon";

grant select on table "public"."education_topics" to "anon";

grant trigger on table "public"."education_topics" to "anon";

grant truncate on table "public"."education_topics" to "anon";

grant update on table "public"."education_topics" to "anon";

grant delete on table "public"."education_topics" to "authenticated";

grant insert on table "public"."education_topics" to "authenticated";

grant references on table "public"."education_topics" to "authenticated";

grant select on table "public"."education_topics" to "authenticated";

grant trigger on table "public"."education_topics" to "authenticated";

grant truncate on table "public"."education_topics" to "authenticated";

grant update on table "public"."education_topics" to "authenticated";

grant delete on table "public"."education_topics" to "service_role";

grant insert on table "public"."education_topics" to "service_role";

grant references on table "public"."education_topics" to "service_role";

grant select on table "public"."education_topics" to "service_role";

grant trigger on table "public"."education_topics" to "service_role";

grant truncate on table "public"."education_topics" to "service_role";

grant update on table "public"."education_topics" to "service_role";

grant delete on table "public"."exchange_rates" to "anon";

grant insert on table "public"."exchange_rates" to "anon";

grant references on table "public"."exchange_rates" to "anon";

grant select on table "public"."exchange_rates" to "anon";

grant trigger on table "public"."exchange_rates" to "anon";

grant truncate on table "public"."exchange_rates" to "anon";

grant update on table "public"."exchange_rates" to "anon";

grant delete on table "public"."exchange_rates" to "authenticated";

grant insert on table "public"."exchange_rates" to "authenticated";

grant references on table "public"."exchange_rates" to "authenticated";

grant select on table "public"."exchange_rates" to "authenticated";

grant trigger on table "public"."exchange_rates" to "authenticated";

grant truncate on table "public"."exchange_rates" to "authenticated";

grant update on table "public"."exchange_rates" to "authenticated";

grant delete on table "public"."exchange_rates" to "service_role";

grant insert on table "public"."exchange_rates" to "service_role";

grant references on table "public"."exchange_rates" to "service_role";

grant select on table "public"."exchange_rates" to "service_role";

grant trigger on table "public"."exchange_rates" to "service_role";

grant truncate on table "public"."exchange_rates" to "service_role";

grant update on table "public"."exchange_rates" to "service_role";

grant delete on table "public"."legal_case_analyses" to "anon";

grant insert on table "public"."legal_case_analyses" to "anon";

grant references on table "public"."legal_case_analyses" to "anon";

grant select on table "public"."legal_case_analyses" to "anon";

grant trigger on table "public"."legal_case_analyses" to "anon";

grant truncate on table "public"."legal_case_analyses" to "anon";

grant update on table "public"."legal_case_analyses" to "anon";

grant delete on table "public"."legal_case_analyses" to "authenticated";

grant insert on table "public"."legal_case_analyses" to "authenticated";

grant references on table "public"."legal_case_analyses" to "authenticated";

grant select on table "public"."legal_case_analyses" to "authenticated";

grant trigger on table "public"."legal_case_analyses" to "authenticated";

grant truncate on table "public"."legal_case_analyses" to "authenticated";

grant update on table "public"."legal_case_analyses" to "authenticated";

grant delete on table "public"."legal_case_analyses" to "service_role";

grant insert on table "public"."legal_case_analyses" to "service_role";

grant references on table "public"."legal_case_analyses" to "service_role";

grant select on table "public"."legal_case_analyses" to "service_role";

grant trigger on table "public"."legal_case_analyses" to "service_role";

grant truncate on table "public"."legal_case_analyses" to "service_role";

grant update on table "public"."legal_case_analyses" to "service_role";

grant delete on table "public"."legal_case_processing_queue" to "anon";

grant insert on table "public"."legal_case_processing_queue" to "anon";

grant references on table "public"."legal_case_processing_queue" to "anon";

grant select on table "public"."legal_case_processing_queue" to "anon";

grant trigger on table "public"."legal_case_processing_queue" to "anon";

grant truncate on table "public"."legal_case_processing_queue" to "anon";

grant update on table "public"."legal_case_processing_queue" to "anon";

grant delete on table "public"."legal_case_processing_queue" to "authenticated";

grant insert on table "public"."legal_case_processing_queue" to "authenticated";

grant references on table "public"."legal_case_processing_queue" to "authenticated";

grant select on table "public"."legal_case_processing_queue" to "authenticated";

grant trigger on table "public"."legal_case_processing_queue" to "authenticated";

grant truncate on table "public"."legal_case_processing_queue" to "authenticated";

grant update on table "public"."legal_case_processing_queue" to "authenticated";

grant delete on table "public"."legal_case_processing_queue" to "service_role";

grant insert on table "public"."legal_case_processing_queue" to "service_role";

grant references on table "public"."legal_case_processing_queue" to "service_role";

grant select on table "public"."legal_case_processing_queue" to "service_role";

grant trigger on table "public"."legal_case_processing_queue" to "service_role";

grant truncate on table "public"."legal_case_processing_queue" to "service_role";

grant update on table "public"."legal_case_processing_queue" to "service_role";

grant delete on table "public"."legal_cases" to "anon";

grant insert on table "public"."legal_cases" to "anon";

grant references on table "public"."legal_cases" to "anon";

grant select on table "public"."legal_cases" to "anon";

grant trigger on table "public"."legal_cases" to "anon";

grant truncate on table "public"."legal_cases" to "anon";

grant update on table "public"."legal_cases" to "anon";

grant delete on table "public"."legal_cases" to "authenticated";

grant insert on table "public"."legal_cases" to "authenticated";

grant references on table "public"."legal_cases" to "authenticated";

grant select on table "public"."legal_cases" to "authenticated";

grant trigger on table "public"."legal_cases" to "authenticated";

grant truncate on table "public"."legal_cases" to "authenticated";

grant update on table "public"."legal_cases" to "authenticated";

grant delete on table "public"."legal_cases" to "service_role";

grant insert on table "public"."legal_cases" to "service_role";

grant references on table "public"."legal_cases" to "service_role";

grant select on table "public"."legal_cases" to "service_role";

grant trigger on table "public"."legal_cases" to "service_role";

grant truncate on table "public"."legal_cases" to "service_role";

grant update on table "public"."legal_cases" to "service_role";

grant delete on table "public"."legal_matter_parties" to "anon";

grant insert on table "public"."legal_matter_parties" to "anon";

grant references on table "public"."legal_matter_parties" to "anon";

grant select on table "public"."legal_matter_parties" to "anon";

grant trigger on table "public"."legal_matter_parties" to "anon";

grant truncate on table "public"."legal_matter_parties" to "anon";

grant update on table "public"."legal_matter_parties" to "anon";

grant delete on table "public"."legal_matter_parties" to "authenticated";

grant insert on table "public"."legal_matter_parties" to "authenticated";

grant references on table "public"."legal_matter_parties" to "authenticated";

grant select on table "public"."legal_matter_parties" to "authenticated";

grant trigger on table "public"."legal_matter_parties" to "authenticated";

grant truncate on table "public"."legal_matter_parties" to "authenticated";

grant update on table "public"."legal_matter_parties" to "authenticated";

grant delete on table "public"."legal_matter_parties" to "service_role";

grant insert on table "public"."legal_matter_parties" to "service_role";

grant references on table "public"."legal_matter_parties" to "service_role";

grant select on table "public"."legal_matter_parties" to "service_role";

grant trigger on table "public"."legal_matter_parties" to "service_role";

grant truncate on table "public"."legal_matter_parties" to "service_role";

grant update on table "public"."legal_matter_parties" to "service_role";

grant delete on table "public"."legal_matters" to "anon";

grant insert on table "public"."legal_matters" to "anon";

grant references on table "public"."legal_matters" to "anon";

grant select on table "public"."legal_matters" to "anon";

grant trigger on table "public"."legal_matters" to "anon";

grant truncate on table "public"."legal_matters" to "anon";

grant update on table "public"."legal_matters" to "anon";

grant delete on table "public"."legal_matters" to "authenticated";

grant insert on table "public"."legal_matters" to "authenticated";

grant references on table "public"."legal_matters" to "authenticated";

grant select on table "public"."legal_matters" to "authenticated";

grant trigger on table "public"."legal_matters" to "authenticated";

grant truncate on table "public"."legal_matters" to "authenticated";

grant update on table "public"."legal_matters" to "authenticated";

grant delete on table "public"."legal_matters" to "service_role";

grant insert on table "public"."legal_matters" to "service_role";

grant references on table "public"."legal_matters" to "service_role";

grant select on table "public"."legal_matters" to "service_role";

grant trigger on table "public"."legal_matters" to "service_role";

grant truncate on table "public"."legal_matters" to "service_role";

grant update on table "public"."legal_matters" to "service_role";

grant delete on table "public"."mira_source_cases" to "anon";

grant insert on table "public"."mira_source_cases" to "anon";

grant references on table "public"."mira_source_cases" to "anon";

grant select on table "public"."mira_source_cases" to "anon";

grant trigger on table "public"."mira_source_cases" to "anon";

grant truncate on table "public"."mira_source_cases" to "anon";

grant update on table "public"."mira_source_cases" to "anon";

grant delete on table "public"."mira_source_cases" to "authenticated";

grant insert on table "public"."mira_source_cases" to "authenticated";

grant references on table "public"."mira_source_cases" to "authenticated";

grant select on table "public"."mira_source_cases" to "authenticated";

grant trigger on table "public"."mira_source_cases" to "authenticated";

grant truncate on table "public"."mira_source_cases" to "authenticated";

grant update on table "public"."mira_source_cases" to "authenticated";

grant delete on table "public"."mira_source_cases" to "service_role";

grant insert on table "public"."mira_source_cases" to "service_role";

grant references on table "public"."mira_source_cases" to "service_role";

grant select on table "public"."mira_source_cases" to "service_role";

grant trigger on table "public"."mira_source_cases" to "service_role";

grant truncate on table "public"."mira_source_cases" to "service_role";

grant update on table "public"."mira_source_cases" to "service_role";

grant delete on table "public"."money_exchangers" to "anon";

grant insert on table "public"."money_exchangers" to "anon";

grant references on table "public"."money_exchangers" to "anon";

grant select on table "public"."money_exchangers" to "anon";

grant trigger on table "public"."money_exchangers" to "anon";

grant truncate on table "public"."money_exchangers" to "anon";

grant update on table "public"."money_exchangers" to "anon";

grant delete on table "public"."money_exchangers" to "authenticated";

grant insert on table "public"."money_exchangers" to "authenticated";

grant references on table "public"."money_exchangers" to "authenticated";

grant select on table "public"."money_exchangers" to "authenticated";

grant trigger on table "public"."money_exchangers" to "authenticated";

grant truncate on table "public"."money_exchangers" to "authenticated";

grant update on table "public"."money_exchangers" to "authenticated";

grant delete on table "public"."money_exchangers" to "service_role";

grant insert on table "public"."money_exchangers" to "service_role";

grant references on table "public"."money_exchangers" to "service_role";

grant select on table "public"."money_exchangers" to "service_role";

grant trigger on table "public"."money_exchangers" to "service_role";

grant truncate on table "public"."money_exchangers" to "service_role";

grant update on table "public"."money_exchangers" to "service_role";

grant delete on table "public"."other_service_packages" to "anon";

grant insert on table "public"."other_service_packages" to "anon";

grant references on table "public"."other_service_packages" to "anon";

grant select on table "public"."other_service_packages" to "anon";

grant trigger on table "public"."other_service_packages" to "anon";

grant truncate on table "public"."other_service_packages" to "anon";

grant update on table "public"."other_service_packages" to "anon";

grant delete on table "public"."other_service_packages" to "authenticated";

grant insert on table "public"."other_service_packages" to "authenticated";

grant references on table "public"."other_service_packages" to "authenticated";

grant select on table "public"."other_service_packages" to "authenticated";

grant trigger on table "public"."other_service_packages" to "authenticated";

grant truncate on table "public"."other_service_packages" to "authenticated";

grant update on table "public"."other_service_packages" to "authenticated";

grant delete on table "public"."other_service_packages" to "service_role";

grant insert on table "public"."other_service_packages" to "service_role";

grant references on table "public"."other_service_packages" to "service_role";

grant select on table "public"."other_service_packages" to "service_role";

grant trigger on table "public"."other_service_packages" to "service_role";

grant truncate on table "public"."other_service_packages" to "service_role";

grant update on table "public"."other_service_packages" to "service_role";

grant delete on table "public"."other_service_reasons" to "anon";

grant insert on table "public"."other_service_reasons" to "anon";

grant references on table "public"."other_service_reasons" to "anon";

grant select on table "public"."other_service_reasons" to "anon";

grant trigger on table "public"."other_service_reasons" to "anon";

grant truncate on table "public"."other_service_reasons" to "anon";

grant update on table "public"."other_service_reasons" to "anon";

grant delete on table "public"."other_service_reasons" to "authenticated";

grant insert on table "public"."other_service_reasons" to "authenticated";

grant references on table "public"."other_service_reasons" to "authenticated";

grant select on table "public"."other_service_reasons" to "authenticated";

grant trigger on table "public"."other_service_reasons" to "authenticated";

grant truncate on table "public"."other_service_reasons" to "authenticated";

grant update on table "public"."other_service_reasons" to "authenticated";

grant delete on table "public"."other_service_reasons" to "service_role";

grant insert on table "public"."other_service_reasons" to "service_role";

grant references on table "public"."other_service_reasons" to "service_role";

grant select on table "public"."other_service_reasons" to "service_role";

grant trigger on table "public"."other_service_reasons" to "service_role";

grant truncate on table "public"."other_service_reasons" to "service_role";

grant update on table "public"."other_service_reasons" to "service_role";

grant delete on table "public"."other_services" to "anon";

grant insert on table "public"."other_services" to "anon";

grant references on table "public"."other_services" to "anon";

grant select on table "public"."other_services" to "anon";

grant trigger on table "public"."other_services" to "anon";

grant truncate on table "public"."other_services" to "anon";

grant update on table "public"."other_services" to "anon";

grant delete on table "public"."other_services" to "authenticated";

grant insert on table "public"."other_services" to "authenticated";

grant references on table "public"."other_services" to "authenticated";

grant select on table "public"."other_services" to "authenticated";

grant trigger on table "public"."other_services" to "authenticated";

grant truncate on table "public"."other_services" to "authenticated";

grant update on table "public"."other_services" to "authenticated";

grant delete on table "public"."other_services" to "service_role";

grant insert on table "public"."other_services" to "service_role";

grant references on table "public"."other_services" to "service_role";

grant select on table "public"."other_services" to "service_role";

grant trigger on table "public"."other_services" to "service_role";

grant truncate on table "public"."other_services" to "service_role";

grant update on table "public"."other_services" to "service_role";

grant delete on table "public"."parties" to "anon";

grant insert on table "public"."parties" to "anon";

grant references on table "public"."parties" to "anon";

grant select on table "public"."parties" to "anon";

grant trigger on table "public"."parties" to "anon";

grant truncate on table "public"."parties" to "anon";

grant update on table "public"."parties" to "anon";

grant delete on table "public"."parties" to "authenticated";

grant insert on table "public"."parties" to "authenticated";

grant references on table "public"."parties" to "authenticated";

grant select on table "public"."parties" to "authenticated";

grant trigger on table "public"."parties" to "authenticated";

grant truncate on table "public"."parties" to "authenticated";

grant update on table "public"."parties" to "authenticated";

grant delete on table "public"."parties" to "service_role";

grant insert on table "public"."parties" to "service_role";

grant references on table "public"."parties" to "service_role";

grant select on table "public"."parties" to "service_role";

grant trigger on table "public"."parties" to "service_role";

grant truncate on table "public"."parties" to "service_role";

grant update on table "public"."parties" to "service_role";

grant delete on table "public"."proceeding_relationships" to "anon";

grant insert on table "public"."proceeding_relationships" to "anon";

grant references on table "public"."proceeding_relationships" to "anon";

grant select on table "public"."proceeding_relationships" to "anon";

grant trigger on table "public"."proceeding_relationships" to "anon";

grant truncate on table "public"."proceeding_relationships" to "anon";

grant update on table "public"."proceeding_relationships" to "anon";

grant delete on table "public"."proceeding_relationships" to "authenticated";

grant insert on table "public"."proceeding_relationships" to "authenticated";

grant references on table "public"."proceeding_relationships" to "authenticated";

grant select on table "public"."proceeding_relationships" to "authenticated";

grant trigger on table "public"."proceeding_relationships" to "authenticated";

grant truncate on table "public"."proceeding_relationships" to "authenticated";

grant update on table "public"."proceeding_relationships" to "authenticated";

grant delete on table "public"."proceeding_relationships" to "service_role";

grant insert on table "public"."proceeding_relationships" to "service_role";

grant references on table "public"."proceeding_relationships" to "service_role";

grant select on table "public"."proceeding_relationships" to "service_role";

grant trigger on table "public"."proceeding_relationships" to "service_role";

grant truncate on table "public"."proceeding_relationships" to "service_role";

grant update on table "public"."proceeding_relationships" to "service_role";

grant delete on table "public"."proceeding_source_records" to "anon";

grant insert on table "public"."proceeding_source_records" to "anon";

grant references on table "public"."proceeding_source_records" to "anon";

grant select on table "public"."proceeding_source_records" to "anon";

grant trigger on table "public"."proceeding_source_records" to "anon";

grant truncate on table "public"."proceeding_source_records" to "anon";

grant update on table "public"."proceeding_source_records" to "anon";

grant delete on table "public"."proceeding_source_records" to "authenticated";

grant insert on table "public"."proceeding_source_records" to "authenticated";

grant references on table "public"."proceeding_source_records" to "authenticated";

grant select on table "public"."proceeding_source_records" to "authenticated";

grant trigger on table "public"."proceeding_source_records" to "authenticated";

grant truncate on table "public"."proceeding_source_records" to "authenticated";

grant update on table "public"."proceeding_source_records" to "authenticated";

grant delete on table "public"."proceeding_source_records" to "service_role";

grant insert on table "public"."proceeding_source_records" to "service_role";

grant references on table "public"."proceeding_source_records" to "service_role";

grant select on table "public"."proceeding_source_records" to "service_role";

grant trigger on table "public"."proceeding_source_records" to "service_role";

grant truncate on table "public"."proceeding_source_records" to "service_role";

grant update on table "public"."proceeding_source_records" to "service_role";

grant delete on table "public"."proceedings" to "anon";

grant insert on table "public"."proceedings" to "anon";

grant references on table "public"."proceedings" to "anon";

grant select on table "public"."proceedings" to "anon";

grant trigger on table "public"."proceedings" to "anon";

grant truncate on table "public"."proceedings" to "anon";

grant update on table "public"."proceedings" to "anon";

grant delete on table "public"."proceedings" to "authenticated";

grant insert on table "public"."proceedings" to "authenticated";

grant references on table "public"."proceedings" to "authenticated";

grant select on table "public"."proceedings" to "authenticated";

grant trigger on table "public"."proceedings" to "authenticated";

grant truncate on table "public"."proceedings" to "authenticated";

grant update on table "public"."proceedings" to "authenticated";

grant delete on table "public"."proceedings" to "service_role";

grant insert on table "public"."proceedings" to "service_role";

grant references on table "public"."proceedings" to "service_role";

grant select on table "public"."proceedings" to "service_role";

grant trigger on table "public"."proceedings" to "service_role";

grant truncate on table "public"."proceedings" to "service_role";

grant update on table "public"."proceedings" to "service_role";

grant select on table "public"."service_inquiries" to "authenticated";

grant update on table "public"."service_inquiries" to "authenticated";

grant delete on table "public"."service_inquiries" to "service_role";

grant insert on table "public"."service_inquiries" to "service_role";

grant references on table "public"."service_inquiries" to "service_role";

grant select on table "public"."service_inquiries" to "service_role";

grant trigger on table "public"."service_inquiries" to "service_role";

grant truncate on table "public"."service_inquiries" to "service_role";

grant update on table "public"."service_inquiries" to "service_role";

grant delete on table "public"."services" to "anon";

grant insert on table "public"."services" to "anon";

grant references on table "public"."services" to "anon";

grant select on table "public"."services" to "anon";

grant trigger on table "public"."services" to "anon";

grant truncate on table "public"."services" to "anon";

grant update on table "public"."services" to "anon";

grant delete on table "public"."services" to "authenticated";

grant insert on table "public"."services" to "authenticated";

grant references on table "public"."services" to "authenticated";

grant select on table "public"."services" to "authenticated";

grant trigger on table "public"."services" to "authenticated";

grant truncate on table "public"."services" to "authenticated";

grant update on table "public"."services" to "authenticated";

grant delete on table "public"."services" to "service_role";

grant insert on table "public"."services" to "service_role";

grant references on table "public"."services" to "service_role";

grant select on table "public"."services" to "service_role";

grant trigger on table "public"."services" to "service_role";

grant truncate on table "public"."services" to "service_role";

grant update on table "public"."services" to "service_role";

grant delete on table "public"."taxpayer_aliases" to "anon";

grant insert on table "public"."taxpayer_aliases" to "anon";

grant references on table "public"."taxpayer_aliases" to "anon";

grant select on table "public"."taxpayer_aliases" to "anon";

grant trigger on table "public"."taxpayer_aliases" to "anon";

grant truncate on table "public"."taxpayer_aliases" to "anon";

grant update on table "public"."taxpayer_aliases" to "anon";

grant delete on table "public"."taxpayer_aliases" to "authenticated";

grant insert on table "public"."taxpayer_aliases" to "authenticated";

grant references on table "public"."taxpayer_aliases" to "authenticated";

grant select on table "public"."taxpayer_aliases" to "authenticated";

grant trigger on table "public"."taxpayer_aliases" to "authenticated";

grant truncate on table "public"."taxpayer_aliases" to "authenticated";

grant update on table "public"."taxpayer_aliases" to "authenticated";

grant delete on table "public"."taxpayer_aliases" to "service_role";

grant insert on table "public"."taxpayer_aliases" to "service_role";

grant references on table "public"."taxpayer_aliases" to "service_role";

grant select on table "public"."taxpayer_aliases" to "service_role";

grant trigger on table "public"."taxpayer_aliases" to "service_role";

grant truncate on table "public"."taxpayer_aliases" to "service_role";

grant update on table "public"."taxpayer_aliases" to "service_role";

grant delete on table "public"."taxpayers" to "anon";

grant insert on table "public"."taxpayers" to "anon";

grant references on table "public"."taxpayers" to "anon";

grant select on table "public"."taxpayers" to "anon";

grant trigger on table "public"."taxpayers" to "anon";

grant truncate on table "public"."taxpayers" to "anon";

grant update on table "public"."taxpayers" to "anon";

grant delete on table "public"."taxpayers" to "authenticated";

grant insert on table "public"."taxpayers" to "authenticated";

grant references on table "public"."taxpayers" to "authenticated";

grant select on table "public"."taxpayers" to "authenticated";

grant trigger on table "public"."taxpayers" to "authenticated";

grant truncate on table "public"."taxpayers" to "authenticated";

grant update on table "public"."taxpayers" to "authenticated";

grant delete on table "public"."taxpayers" to "service_role";

grant insert on table "public"."taxpayers" to "service_role";

grant references on table "public"."taxpayers" to "service_role";

grant select on table "public"."taxpayers" to "service_role";

grant trigger on table "public"."taxpayers" to "service_role";

grant truncate on table "public"."taxpayers" to "service_role";

grant update on table "public"."taxpayers" to "service_role";

grant delete on table "public"."team_member_experience" to "anon";

grant insert on table "public"."team_member_experience" to "anon";

grant references on table "public"."team_member_experience" to "anon";

grant select on table "public"."team_member_experience" to "anon";

grant trigger on table "public"."team_member_experience" to "anon";

grant truncate on table "public"."team_member_experience" to "anon";

grant update on table "public"."team_member_experience" to "anon";

grant delete on table "public"."team_member_experience" to "authenticated";

grant insert on table "public"."team_member_experience" to "authenticated";

grant references on table "public"."team_member_experience" to "authenticated";

grant select on table "public"."team_member_experience" to "authenticated";

grant trigger on table "public"."team_member_experience" to "authenticated";

grant truncate on table "public"."team_member_experience" to "authenticated";

grant update on table "public"."team_member_experience" to "authenticated";

grant delete on table "public"."team_member_experience" to "service_role";

grant insert on table "public"."team_member_experience" to "service_role";

grant references on table "public"."team_member_experience" to "service_role";

grant select on table "public"."team_member_experience" to "service_role";

grant trigger on table "public"."team_member_experience" to "service_role";

grant truncate on table "public"."team_member_experience" to "service_role";

grant update on table "public"."team_member_experience" to "service_role";

grant delete on table "public"."team_member_qualifications" to "anon";

grant insert on table "public"."team_member_qualifications" to "anon";

grant references on table "public"."team_member_qualifications" to "anon";

grant select on table "public"."team_member_qualifications" to "anon";

grant trigger on table "public"."team_member_qualifications" to "anon";

grant truncate on table "public"."team_member_qualifications" to "anon";

grant update on table "public"."team_member_qualifications" to "anon";

grant delete on table "public"."team_member_qualifications" to "authenticated";

grant insert on table "public"."team_member_qualifications" to "authenticated";

grant references on table "public"."team_member_qualifications" to "authenticated";

grant select on table "public"."team_member_qualifications" to "authenticated";

grant trigger on table "public"."team_member_qualifications" to "authenticated";

grant truncate on table "public"."team_member_qualifications" to "authenticated";

grant update on table "public"."team_member_qualifications" to "authenticated";

grant delete on table "public"."team_member_qualifications" to "service_role";

grant insert on table "public"."team_member_qualifications" to "service_role";

grant references on table "public"."team_member_qualifications" to "service_role";

grant select on table "public"."team_member_qualifications" to "service_role";

grant trigger on table "public"."team_member_qualifications" to "service_role";

grant truncate on table "public"."team_member_qualifications" to "service_role";

grant update on table "public"."team_member_qualifications" to "service_role";

grant delete on table "public"."team_members" to "anon";

grant insert on table "public"."team_members" to "anon";

grant references on table "public"."team_members" to "anon";

grant select on table "public"."team_members" to "anon";

grant trigger on table "public"."team_members" to "anon";

grant truncate on table "public"."team_members" to "anon";

grant update on table "public"."team_members" to "anon";

grant delete on table "public"."team_members" to "authenticated";

grant insert on table "public"."team_members" to "authenticated";

grant references on table "public"."team_members" to "authenticated";

grant select on table "public"."team_members" to "authenticated";

grant trigger on table "public"."team_members" to "authenticated";

grant truncate on table "public"."team_members" to "authenticated";

grant update on table "public"."team_members" to "authenticated";

grant delete on table "public"."team_members" to "service_role";

grant insert on table "public"."team_members" to "service_role";

grant references on table "public"."team_members" to "service_role";

grant select on table "public"."team_members" to "service_role";

grant trigger on table "public"."team_members" to "service_role";

grant truncate on table "public"."team_members" to "service_role";

grant update on table "public"."team_members" to "service_role";


  create policy "Admins can read their own admin record"
  on "public"."admin_users"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Admins can manage articles"
  on "public"."articles"
  as permissive
  for all
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Public can view published articles"
  on "public"."articles"
  as permissive
  for select
  to anon, authenticated
using ((published = true));



  create policy "Admins can manage careers"
  on "public"."careers"
  as permissive
  for all
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Public can view published careers"
  on "public"."careers"
  as permissive
  for select
  to anon, authenticated
using ((published = true));



  create policy "Public can read case documents"
  on "public"."case_documents"
  as permissive
  for select
  to anon, authenticated
using ((EXISTS ( SELECT 1
   FROM (public.proceedings p
     JOIN public.legal_matters lm ON ((lm.id = p.legal_matter_id)))
  WHERE ((p.id = case_documents.proceeding_id) AND (lm.published = true)))));



  create policy "Public can view case issues"
  on "public"."case_issues"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Public can view issues of published cases"
  on "public"."case_issues"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM public.legal_cases
  WHERE ((legal_cases.id = case_issues.case_id) AND (legal_cases.published = true)))));



  create policy "Public can view case proceedings"
  on "public"."case_proceedings"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Public can view proceedings of published cases"
  on "public"."case_proceedings"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM public.legal_cases
  WHERE ((legal_cases.id = case_proceedings.case_id) AND (legal_cases.published = true)))));



  create policy "Public can view sources of published cases"
  on "public"."case_sources"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM public.legal_cases
  WHERE ((legal_cases.id = case_sources.case_id) AND (legal_cases.published = true)))));



  create policy "Public can view timelines of published cases"
  on "public"."case_timeline"
  as permissive
  for select
  to anon
using ((EXISTS ( SELECT 1
   FROM public.legal_cases
  WHERE ((legal_cases.id = case_timeline.case_id) AND (legal_cases.published = true)))));



  create policy "education_assets_admin_all"
  on "public"."education_assets"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_assets_public_select"
  on "public"."education_assets"
  as permissive
  for select
  to public
using (((block_id IS NULL) OR (EXISTS ( SELECT 1
   FROM ((public.education_content_blocks b
     JOIN public.education_sections s ON ((s.id = b.section_id)))
     JOIN public.education_topics t ON ((t.id = s.topic_id)))
  WHERE ((b.id = education_assets.block_id) AND (b.is_published = true) AND (s.is_published = true) AND (t.is_published = true)))) OR public.is_cura_admin()));



  create policy "Leaderboard is public"
  on "public"."education_attempts"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "education_items_admin_all"
  on "public"."education_block_items"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_items_public_select"
  on "public"."education_block_items"
  as permissive
  for select
  to public
using (((EXISTS ( SELECT 1
   FROM ((public.education_content_blocks b
     JOIN public.education_sections s ON ((s.id = b.section_id)))
     JOIN public.education_topics t ON ((t.id = s.topic_id)))
  WHERE ((b.id = education_block_items.block_id) AND (b.is_published = true) AND (s.is_published = true) AND (t.is_published = true)))) OR public.is_cura_admin()));



  create policy "education_blocks_admin_all"
  on "public"."education_content_blocks"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_blocks_public_select"
  on "public"."education_content_blocks"
  as permissive
  for select
  to public
using ((((is_published = true) AND (EXISTS ( SELECT 1
   FROM (public.education_sections s
     JOIN public.education_topics t ON ((t.id = s.topic_id)))
  WHERE ((s.id = education_content_blocks.section_id) AND (s.is_published = true) AND (t.is_published = true))))) OR public.is_cura_admin()));



  create policy "education_versions_admin_all"
  on "public"."education_content_versions"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_interactives_admin_all"
  on "public"."education_interactives"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_interactives_public_select"
  on "public"."education_interactives"
  as permissive
  for select
  to public
using ((public.is_cura_admin() OR (EXISTS ( SELECT 1
   FROM ((public.education_content_blocks b
     JOIN public.education_sections s ON ((s.id = b.section_id)))
     JOIN public.education_topics t ON ((t.id = s.topic_id)))
  WHERE ((b.id = education_interactives.block_id) AND (b.is_published = true) AND (s.is_published = true) AND (t.is_published = true))))));



  create policy "Published education materials are public"
  on "public"."education_materials"
  as permissive
  for select
  to anon, authenticated
using ((is_published = true));



  create policy "Admins can delete education question targets"
  on "public"."education_question_targets"
  as permissive
  for delete
  to authenticated
using (public.is_current_user_admin());



  create policy "Admins can insert education question targets"
  on "public"."education_question_targets"
  as permissive
  for insert
  to authenticated
with check (public.is_current_user_admin());



  create policy "Admins can update education question targets"
  on "public"."education_question_targets"
  as permissive
  for update
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Admins can view education question targets"
  on "public"."education_question_targets"
  as permissive
  for select
  to authenticated
using (public.is_current_user_admin());



  create policy "Published quiz questions are public"
  on "public"."education_questions"
  as permissive
  for select
  to anon, authenticated
using ((EXISTS ( SELECT 1
   FROM public.education_quizzes q
  WHERE ((q.id = education_questions.quiz_id) AND (q.is_published = true)))));



  create policy "Published quizzes are public"
  on "public"."education_quizzes"
  as permissive
  for select
  to anon, authenticated
using ((is_published = true));



  create policy "education_sections_admin_all"
  on "public"."education_sections"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_sections_public_select"
  on "public"."education_sections"
  as permissive
  for select
  to public
using ((((is_published = true) AND (EXISTS ( SELECT 1
   FROM public.education_topics t
  WHERE ((t.id = education_sections.topic_id) AND (t.is_published = true))))) OR public.is_cura_admin()));



  create policy "education_sources_admin_all"
  on "public"."education_sources"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_sources_public_select"
  on "public"."education_sources"
  as permissive
  for select
  to public
using ((public.is_cura_admin() OR ((topic_id IS NOT NULL) AND (EXISTS ( SELECT 1
   FROM public.education_topics t
  WHERE ((t.id = education_sources.topic_id) AND (t.is_published = true)))))));



  create policy "education_tables_admin_all"
  on "public"."education_tables"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_tables_public_select"
  on "public"."education_tables"
  as permissive
  for select
  to public
using (((EXISTS ( SELECT 1
   FROM ((public.education_content_blocks b
     JOIN public.education_sections s ON ((s.id = b.section_id)))
     JOIN public.education_topics t ON ((t.id = s.topic_id)))
  WHERE ((b.id = education_tables.block_id) AND (b.is_published = true) AND (s.is_published = true) AND (t.is_published = true)))) OR public.is_cura_admin()));



  create policy "education_topics_admin_all"
  on "public"."education_topics"
  as permissive
  for all
  to public
using (public.is_cura_admin())
with check (public.is_cura_admin());



  create policy "education_topics_public_select"
  on "public"."education_topics"
  as permissive
  for select
  to public
using (((is_published = true) OR public.is_cura_admin()));



  create policy "Admins can delete exchange rates"
  on "public"."exchange_rates"
  as permissive
  for delete
  to authenticated
using (public.is_admin());



  create policy "Admins can insert exchange rates"
  on "public"."exchange_rates"
  as permissive
  for insert
  to authenticated
with check (public.is_admin());



  create policy "Admins can update exchange rates"
  on "public"."exchange_rates"
  as permissive
  for update
  to authenticated
using (public.is_admin())
with check (public.is_admin());



  create policy "Public can view exchange rates"
  on "public"."exchange_rates"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "admins_manage_case_analyses"
  on "public"."legal_case_analyses"
  as permissive
  for all
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Public can view legal cases"
  on "public"."legal_cases"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Public can view published legal cases"
  on "public"."legal_cases"
  as permissive
  for select
  to anon
using ((published = true));



  create policy "Public can read legal matter parties"
  on "public"."legal_matter_parties"
  as permissive
  for select
  to anon, authenticated
using ((EXISTS ( SELECT 1
   FROM public.legal_matters lm
  WHERE ((lm.id = legal_matter_parties.legal_matter_id) AND (lm.published = true)))));



  create policy "Public can read legal matters"
  on "public"."legal_matters"
  as permissive
  for select
  to anon, authenticated
using ((published = true));



  create policy "Admins can delete money exchangers"
  on "public"."money_exchangers"
  as permissive
  for delete
  to authenticated
using (public.is_admin());



  create policy "Admins can insert money exchangers"
  on "public"."money_exchangers"
  as permissive
  for insert
  to authenticated
with check (public.is_admin());



  create policy "Admins can update money exchangers"
  on "public"."money_exchangers"
  as permissive
  for update
  to authenticated
using (public.is_admin())
with check (public.is_admin());



  create policy "Public can view money exchangers"
  on "public"."money_exchangers"
  as permissive
  for select
  to anon, authenticated
using (((active = true) OR public.is_admin()));



  create policy "admin manage other service packages"
  on "public"."other_service_packages"
  as permissive
  for all
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "public read published other service packages"
  on "public"."other_service_packages"
  as permissive
  for select
  to public
using (((published = true) AND (EXISTS ( SELECT 1
   FROM public.other_services s
  WHERE ((s.id = other_service_packages.service_id) AND (s.published = true))))));



  create policy "admin manage other service reasons"
  on "public"."other_service_reasons"
  as permissive
  for all
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "public read published other service reasons"
  on "public"."other_service_reasons"
  as permissive
  for select
  to public
using (((published = true) AND (EXISTS ( SELECT 1
   FROM public.other_services s
  WHERE ((s.id = other_service_reasons.service_id) AND (s.published = true))))));



  create policy "admin manage other services"
  on "public"."other_services"
  as permissive
  for all
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "public read published other services"
  on "public"."other_services"
  as permissive
  for select
  to public
using ((published = true));



  create policy "Public can read parties"
  on "public"."parties"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Public can read proceeding source records"
  on "public"."proceeding_source_records"
  as permissive
  for select
  to anon, authenticated
using ((EXISTS ( SELECT 1
   FROM (public.proceedings p
     JOIN public.legal_matters lm ON ((lm.id = p.legal_matter_id)))
  WHERE ((p.id = proceeding_source_records.proceeding_id) AND (lm.published = true)))));



  create policy "Public can read proceedings"
  on "public"."proceedings"
  as permissive
  for select
  to anon, authenticated
using ((EXISTS ( SELECT 1
   FROM public.legal_matters lm
  WHERE ((lm.id = proceedings.legal_matter_id) AND (lm.published = true)))));



  create policy "Admins can update service inquiries"
  on "public"."service_inquiries"
  as permissive
  for update
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Admins can view service inquiries"
  on "public"."service_inquiries"
  as permissive
  for select
  to authenticated
using (public.is_current_user_admin());



  create policy "Public can read taxpayers"
  on "public"."taxpayers"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Admins can delete team experience"
  on "public"."team_member_experience"
  as permissive
  for delete
  to authenticated
using (public.is_current_user_admin());



  create policy "Admins can insert team experience"
  on "public"."team_member_experience"
  as permissive
  for insert
  to authenticated
with check (public.is_current_user_admin());



  create policy "Admins can update team experience"
  on "public"."team_member_experience"
  as permissive
  for update
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Admins can view all team experience"
  on "public"."team_member_experience"
  as permissive
  for select
  to authenticated
using (public.is_current_user_admin());



  create policy "Public can view experience of published team members"
  on "public"."team_member_experience"
  as permissive
  for select
  to anon, authenticated
using ((EXISTS ( SELECT 1
   FROM public.team_members tm
  WHERE ((tm.id = team_member_experience.team_member_id) AND (tm.published = true)))));



  create policy "Admins can delete team qualifications"
  on "public"."team_member_qualifications"
  as permissive
  for delete
  to authenticated
using (public.is_current_user_admin());



  create policy "Admins can insert team qualifications"
  on "public"."team_member_qualifications"
  as permissive
  for insert
  to authenticated
with check (public.is_current_user_admin());



  create policy "Admins can update team qualifications"
  on "public"."team_member_qualifications"
  as permissive
  for update
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Admins can view all team qualifications"
  on "public"."team_member_qualifications"
  as permissive
  for select
  to authenticated
using (public.is_current_user_admin());



  create policy "Public can view qualifications of published team members"
  on "public"."team_member_qualifications"
  as permissive
  for select
  to anon, authenticated
using ((EXISTS ( SELECT 1
   FROM public.team_members tm
  WHERE ((tm.id = team_member_qualifications.team_member_id) AND (tm.published = true)))));



  create policy "Admins can delete team members"
  on "public"."team_members"
  as permissive
  for delete
  to authenticated
using (public.is_current_user_admin());



  create policy "Admins can insert team members"
  on "public"."team_members"
  as permissive
  for insert
  to authenticated
with check (public.is_current_user_admin());



  create policy "Admins can update team members"
  on "public"."team_members"
  as permissive
  for update
  to authenticated
using (public.is_current_user_admin())
with check (public.is_current_user_admin());



  create policy "Admins can view all team members"
  on "public"."team_members"
  as permissive
  for select
  to authenticated
using (public.is_current_user_admin());



  create policy "Public can view published team members"
  on "public"."team_members"
  as permissive
  for select
  to anon, authenticated
using ((published = true));


CREATE TRIGGER trg_queue_case_analysis_after_source_verification AFTER UPDATE OF source_status ON public.case_proceedings FOR EACH ROW EXECUTE FUNCTION public.queue_case_analysis_after_source_verification();

CREATE TRIGGER education_assets_updated_at BEFORE UPDATE ON public.education_assets FOR EACH ROW EXECUTE FUNCTION public.set_education_updated_at();

CREATE TRIGGER education_items_updated_at BEFORE UPDATE ON public.education_block_items FOR EACH ROW EXECUTE FUNCTION public.set_education_updated_at();

CREATE TRIGGER education_blocks_updated_at BEFORE UPDATE ON public.education_content_blocks FOR EACH ROW EXECUTE FUNCTION public.set_education_updated_at();

CREATE TRIGGER education_sections_updated_at BEFORE UPDATE ON public.education_sections FOR EACH ROW EXECUTE FUNCTION public.set_education_updated_at();

CREATE TRIGGER education_tables_updated_at BEFORE UPDATE ON public.education_tables FOR EACH ROW EXECUTE FUNCTION public.set_education_updated_at();

CREATE TRIGGER education_topics_updated_at BEFORE UPDATE ON public.education_topics FOR EACH ROW EXECUTE FUNCTION public.set_education_updated_at();

CREATE TRIGGER other_service_packages_updated_at BEFORE UPDATE ON public.other_service_packages FOR EACH ROW EXECUTE FUNCTION public.set_other_services_updated_at();

CREATE TRIGGER other_service_reasons_updated_at BEFORE UPDATE ON public.other_service_reasons FOR EACH ROW EXECUTE FUNCTION public.set_other_services_updated_at();

CREATE TRIGGER other_services_updated_at BEFORE UPDATE ON public.other_services FOR EACH ROW EXECUTE FUNCTION public.set_other_services_updated_at();

CREATE TRIGGER service_inquiries_updated_at BEFORE UPDATE ON public.service_inquiries FOR EACH ROW EXECUTE FUNCTION public.set_service_inquiry_updated_at();

CREATE TRIGGER team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_team_members_updated_at();


  create policy "Admins can delete team profile images"
  on "storage"."objects"
  as permissive
  for delete
  to authenticated
using (((bucket_id = 'team-profiles'::text) AND public.is_current_user_admin()));



  create policy "Admins can update team profile images"
  on "storage"."objects"
  as permissive
  for update
  to authenticated
using (((bucket_id = 'team-profiles'::text) AND public.is_current_user_admin()))
with check (((bucket_id = 'team-profiles'::text) AND public.is_current_user_admin()));



  create policy "Admins can upload team profile images"
  on "storage"."objects"
  as permissive
  for insert
  to authenticated
with check (((bucket_id = 'team-profiles'::text) AND public.is_current_user_admin()));



  create policy "Public can view team profile images"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'team-profiles'::text));



