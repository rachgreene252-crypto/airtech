-- Storage buckets per AIRTECH_SUPABASE_ARCHITECTURE.md §4. Two buckets deviate from the doc's own
-- plain-English "Public read" language: `project-documents` ("Public read or signed, per document")
-- and `resources` ("Public read once published") are both set to public = false here, matching the
-- more conservative, explicit rule the doc itself states for `certifications` ("enforce via signed
-- URL generation gated on that column, not bucket-level public access, so a draft ... can't leak via
-- a guessed URL") — the same reasoning applies to unpublished technical documents/resources. If the
-- intent was actually plain bucket-level public read for these two, flip `public` to true below.
insert into storage.buckets (id, name, public) values
  ('project-images', 'project-images', true),
  ('project-documents', 'project-documents', false),
  ('team', 'team', true),
  ('certifications', 'certifications', false),
  ('resources', 'resources', false),
  ('site-media', 'site-media', true),
  ('reference-documents', 'reference-documents', false);

create policy "Public can read public bucket objects" on storage.objects
  for select to anon, authenticated
  using (bucket_id in ('project-images', 'team', 'site-media'));

-- Admin (the single trusted role at launch) manages every bucket, including the
-- private ones, where access to unpublished/gated files goes through
-- server-generated signed URLs rather than a public policy.
create policy "Admin has full access to storage objects" on storage.objects
  for all to authenticated
  using (
    bucket_id in (
      'project-images', 'project-documents', 'team', 'certifications',
      'resources', 'site-media', 'reference-documents'
    )
  )
  with check (
    bucket_id in (
      'project-images', 'project-documents', 'team', 'certifications',
      'resources', 'site-media', 'reference-documents'
    )
  );
