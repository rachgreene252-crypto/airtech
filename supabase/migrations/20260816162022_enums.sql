-- Carried over unchanged from the Sanity `verificationStatusField` (src/sanity/schemaTypes/shared.ts)
-- and the shared TypeScript content model (src/content/types.ts). Controls whether a fact-bearing
-- row is safe to render as a public claim — see AIRTECH_SUPABASE_ARCHITECTURE.md §1/§5.
create type public.verification_status as enum (
  'verified',
  'client_confirmed',
  'source_only',
  'needs_verification',
  'historical',
  'do_not_publish'
);

create type public.project_status as enum ('completed', 'ongoing', 'provisional');

create type public.service_category as enum (
  'hvac',
  'electrical',
  'plumbing-public-health',
  'fire-protection',
  'elv-security',
  'bms-systems-integration',
  'engineering-advisory'
);

create type public.resource_kind as enum ('guideline', 'bulletin', 'download', 'insight');

-- Progressive enquiry flow, step 1 ("What do you need help with?").
create type public.enquiry_intent as enum ('hvac', 'electrical', 'full_mep', 'amc_service', 'other');

create type public.enquiry_status as enum ('new', 'contacted', 'qualified', 'closed');

-- AIRTECH_SUPABASE_ARCHITECTURE.md §2 testimonials note: a scanned, signed reference letter is a
-- stronger evidence category than a quoted testimonial and is treated differently in the admin/UI.
create type public.testimonial_source_type as enum ('testimonial', 'reference_letter');
