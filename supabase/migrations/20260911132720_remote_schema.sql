SET local check_function_bodies = off;

REVOKE ALL ON FUNCTION "public"."claim_legal_case_analysis_batch"(integer) FROM "anon";

REVOKE ALL ON FUNCTION "public"."claim_legal_case_analysis_batch"(integer) FROM "authenticated";

REVOKE ALL ON TABLE "public"."admin_users" FROM "anon";

REVOKE ALL ON TABLE "public"."admin_users" FROM "authenticated";

REVOKE ALL ON TABLE "public"."education_test_sessions" FROM "anon";

REVOKE ALL ON TABLE "public"."education_test_sessions" FROM "authenticated";

REVOKE ALL ON TABLE "public"."service_inquiries" FROM "anon";

CREATE EXTENSION "pg_net" SCHEMA "extensions";

CREATE TABLE "public"."education_areas" (
  "area_key"      text                     NOT NULL,
  "name"          text                     NOT NULL,
  "description"   text,
  "display_order" integer                  NOT NULL DEFAULT 1,
  "is_active"     boolean                  NOT NULL DEFAULT true,
  "created_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"    timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "education_areas_pkey" PRIMARY KEY (area_key)
);

ALTER TABLE "public"."education_areas"
  ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."articles"
  ADD COLUMN "image_url" text;

CREATE INDEX education_areas_display_order_idx ON public.education_areas USING btree (display_order);

CREATE POLICY "education_areas_admin_all" ON "public"."education_areas"
  FOR ALL
  TO PUBLIC
  USING (public.is_cura_admin())
  WITH CHECK (public.is_cura_admin());

CREATE POLICY "education_areas_public_select" ON "public"."education_areas"
  FOR SELECT
  TO PUBLIC
  USING (((is_active = true) OR (auth.role() = 'service_role'::text)));

CREATE POLICY "Admins can delete article images" ON "storage"."objects"
  FOR DELETE
  TO "authenticated"
  USING (((bucket_id = 'article-images'::text) AND public.is_current_user_admin()));

CREATE POLICY "Admins can update article images" ON "storage"."objects"
  FOR UPDATE
  TO "authenticated"
  USING (((bucket_id = 'article-images'::text) AND public.is_current_user_admin()))
  WITH CHECK (((bucket_id = 'article-images'::text) AND public.is_current_user_admin()));

CREATE POLICY "Admins can upload article images" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (((bucket_id = 'article-images'::text) AND public.is_current_user_admin()));

COMMENT ON COLUMN "public"."education_content_blocks"."presentation" IS 'Presentation metadata for illustrations, callouts, diagrams and responsive visual layouts.';

COMMENT ON COLUMN "public"."education_sections"."presentation" IS 'Presentation metadata for attractive learning layouts, diagrams, cards and visual treatments.';

COMMENT ON COLUMN "public"."education_topics"."visual_theme" IS 'Visual theme used by the education renderer.';

COMMENT ON EXTENSION "pg_net" IS 'Async HTTP';

COMMENT ON FUNCTION "public"."education_find_adjacent_duplicate_sections"(uuid) IS 'Validation helper for education imports: identifies consecutive sections with identical normalized headings so their content can be merged before publication.';

COMMENT ON FUNCTION "public"."education_merge_adjacent_duplicate_sections"(uuid) IS 'Merges consecutive unpublished sections with identical normalized headings into the first section, preserving all blocks, assets, tables, interactives and source/version relationships.';

REVOKE ALL ON FUNCTION "public"."claim_legal_case_analysis_batch"(integer) FROM PUBLIC;

REVOKE ALL ON FUNCTION "public"."education_session_questions"(uuid) FROM PUBLIC;

REVOKE ALL ON FUNCTION "public"."is_admin"() FROM PUBLIC;

REVOKE ALL ON FUNCTION "public"."start_education_test"(uuid, text) FROM PUBLIC;

REVOKE ALL ON FUNCTION "public"."submit_education_attempt"(uuid, text, jsonb, integer, uuid) FROM PUBLIC;

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."education_areas" TO "anon", "authenticated", "postgres", "service_role";

REVOKE ALL ON TABLE "public"."education_attempts" FROM "anon";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."education_attempts" TO "anon";

REVOKE ALL ON TABLE "public"."education_attempts" FROM "authenticated";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."education_attempts" TO "authenticated";

REVOKE ALL ON TABLE "public"."education_materials" FROM "anon";

GRANT MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE ON TABLE "public"."education_materials" TO "anon";

REVOKE ALL ON TABLE "public"."education_materials" FROM "authenticated";

GRANT MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE ON TABLE "public"."education_materials" TO "authenticated";

REVOKE ALL ON TABLE "public"."education_questions" FROM "anon";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."education_questions" TO "anon";

REVOKE ALL ON TABLE "public"."education_questions" FROM "authenticated";

GRANT MAINTAIN, REFERENCES, TRIGGER, TRUNCATE ON TABLE "public"."education_questions" TO "authenticated";

REVOKE ALL ON TABLE "public"."education_quizzes" FROM "anon";

GRANT MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE ON TABLE "public"."education_quizzes" TO "anon";

REVOKE ALL ON TABLE "public"."education_quizzes" FROM "authenticated";

GRANT MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE ON TABLE "public"."education_quizzes" TO "authenticated";

REVOKE ALL ON TABLE "public"."service_inquiries" FROM "authenticated";

GRANT SELECT, UPDATE ON TABLE "public"."service_inquiries" TO "authenticated";

SELECT
  cron.schedule_in_database('cura-exact-source-worker', '* * * * *',
  'select net.http_get(url := ''https://xvylbnbopcacnhkqfqqw.supabase.co/functions/v1/backfill-exact-proceeding-documents?limit=5'', timeout_milliseconds := 50000);',
  'postgres', NULL, true);

