-- Live filter/query paths called out in AIRTECH_SUPABASE_ARCHITECTURE.md §3, plus every foreign
-- key that isn't already covered by a primary key / unique constraint (unindexed FKs are the most
-- common source of slow joins and cascade-delete table scans).

-- Filter/query paths
create index projects_industry_slug_idx on public.projects (industry_slug);
create index projects_city_idx on public.projects (city);
create index projects_featured_idx on public.projects (featured) where featured = true;
create index projects_status_idx on public.projects (status);
create index enquiries_status_idx on public.enquiries (status);
create index enquiries_created_at_idx on public.enquiries (created_at desc);

-- Foreign keys
create index industries_hero_image_id_idx on public.industries (hero_image_id);
create index services_hero_image_id_idx on public.services (hero_image_id);
create index service_industries_industry_slug_idx on public.service_industries (industry_slug);
create index testimonials_document_media_id_idx on public.testimonials (document_media_id);
create index testimonials_project_id_idx on public.testimonials (project_id);
create index certifications_document_image_id_idx on public.certifications (document_image_id);
create index partners_logo_id_idx on public.partners (logo_id);
create index people_photo_id_idx on public.people (photo_id);
create index clients_logo_id_idx on public.clients (logo_id);
create index resources_file_media_id_idx on public.resources (file_media_id);
create index projects_hero_image_id_idx on public.projects (hero_image_id);
create index projects_testimonial_id_idx on public.projects (testimonial_id);
create index project_services_service_slug_idx on public.project_services (service_slug);
create index project_industries_industry_slug_idx on public.project_industries (industry_slug);
create index project_related_projects_related_project_id_idx on public.project_related_projects (related_project_id);
create index project_images_project_id_order_idx on public.project_images (project_id, display_order);
create index enquiries_attachment_media_id_idx on public.enquiries (attachment_media_id);
