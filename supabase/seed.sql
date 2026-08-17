-- Airtech seed data. Transcribed 1:1 from src/content/*.ts (itself sourced per the file-header
-- comments in each of those files — see AIRTECH_CONTENT_AUDIT.md for full citations). Nothing here
-- is invented: fields with no supplied source content are left NULL/empty, matching the local
-- content layer's own "honest empty state" discipline.
--
-- Deliberately NOT seeded, matching src/content/*.ts precedent of leaving genuinely unsourced data
-- empty rather than populating it early:
--   * testimonials  — no testimonial/reference-letter text has been publication-approved yet
--                      (AIRTECH_CONTENT_AUDIT.md §2b; AIRTECH_IMPLEMENTATION_PLAN.md Stage 3 step 8
--                      schedules this as a future, approval-gated content pass, not schema work).
--   * clients       — the extended sector client lists (AIRTECH_CONTENT_AUDIT.md §2e) are pending
--                      the same publication gate (AIRTECH_OPEN_DECISIONS.md #5) and have a known
--                      data-quality issue in the source slide itself (banks/telecom section).
--   * resources     — none supplied (src/content/resources.ts is empty).

-- ---------------------------------------------------------------------------
-- industries
-- ---------------------------------------------------------------------------
insert into public.industries (slug, name, overview, operational_challenges, technical_requirements, airtech_capabilities, proof_points, status, display_order) values
('healthcare', $t$Healthcare & Hospitals$t$,
 $t$Airtech has designed and executed HVAC systems for a large number of hospitals in Nepal, including the supply and installation of operation-theatre air-conditioning with laminar airflow, and remains a partner in maintaining indoor air quality across clinical environments.$t$,
 ARRAY[$t$Patient rooms, consulting rooms and OPDs require reliable general comfort air-conditioning$t$, $t$ICU, operation theatres and post-operative recovery rooms carry stringent demands on airflow pattern, cross-contamination control and a germ-free environment$t$, $t$Diagnostic equipment areas (MRI, CATH-LAB, CT) need air-conditioning that ensures smooth, hassle-free operation of high-end, life-saving equipment$t$, $t$Air-conditioning in a hospital runs on a 24×7 basis, so reliability is non-negotiable$t$]::text[],
 ARRAY[$t$Laminar airflow operation-theatre air-conditioning$t$, $t$High-filtration systems to maintain air quality and prevent release of in-born pollutants$t$, $t$Contamination control across treatment areas$t$]::text[],
 ARRAY[$t$HVAC design, supply, installation, testing and commissioning for hospital environments$t$, $t$Operation-theatre air-conditioning with laminar airflow pattern$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 1),
('hospitality', $t$Hospitality$t$,
 $t$Airtech designs zone-specific HVAC for hotels and resorts — guest rooms, restaurants, lobbies, health clubs and banquet halls each carry distinct load and comfort requirements, and the system is designed around the precise needs of each area.$t$,
 ARRAY[$t$Partial load due to varying occupancy rates$t$, $t$Higher load at more heavily occupied zones such as banquet halls and restaurants$t$, $t$Frequent door openings in reception areas$t$, $t$Ventilation to utility areas such as kitchens, toilets and car parks$t$, $t$Low noise levels required in guest rooms$t$]::text[],
 ARRAY[$t$Zone-specific load design$t$, $t$High energy efficiency$t$, $t$Aesthetic integration with interior design$t$]::text[],
 ARRAY[$t$Zone-specific HVAC design across guest rooms, restaurants, lobbies, health clubs and banquet halls$t$, $t$Integrated electrical, plumbing and fire-protection delivery for hotel and resort projects$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 2),
('pharmaceuticals', $t$Pharmaceuticals & Laboratories$t$,
 $t$Airtech has worked with a large number of pharmaceutical companies in Nepal, helping maintain critical process parameters across the manufacture of tablets, ointments, capsules, liquids and sterile products in facilities conforming to WHO GMP standards.$t$,
 ARRAY[$t$Maintaining varied temperature, relative humidity and air-change rates across preparation, manufacturing, packing and storage areas$t$, $t$Handling peak load at the time of batch production and dropping to lower levels once a batch is complete$t$]::text[],
 ARRAY[$t$Precise control of temperature, relative humidity, pressure gradients, air changes, air filtration and air direction$t$, $t$High levels of filtration, including HEPA filtration, to maintain required air quality$t$, $t$Conformance to WHO GMP validation parameters$t$]::text[],
 ARRAY[$t$HVAC systems designed to fulfil precise air-conditioning requirements for different classes of pharmaceutical cleanliness$t$, $t$Awareness of validation parameters to support client conformance with WHO GMP standards$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 3),
('industrial', $t$Industrial & Manufacturing$t$,
 $t$Industrial air-conditioning needs vary from simple comfort cooling for a manager's office to process chilling for sensitive production requirements. Airtech designs around the actual production process, working from feedback provided by production managers.$t$,
 ARRAY[$t$Cooling sensitive panel boards that dissipate heat during operation$t$, $t$Fresh-air and exhaust systems for warehousing to prevent microbial growth$t$, $t$Some warehoused products degrade in adverse climate and require air-conditioning$t$, $t$Extreme outside conditions can shorten the working life of air-cooled outdoor units$t$]::text[],
 ARRAY[$t$System design informed by the specific production process, not generic comfort cooling$t$, $t$Water-cooled package units considered in extreme outside conditions to extend equipment life versus air-cooled alternatives$t$]::text[],
 ARRAY[$t$Process-informed HVAC design incorporating production-manager feedback$t$, $t$Panel and warehouse cooling for manufacturing environments$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 4),
('corporate-commercial', $t$Corporate & Commercial$t$,
 $t$Airtech is associated with Nepal's leading commercial banks, financial institutions and corporate offices, designing for optimum performance, energy efficiency and the aesthetic expectations of architects and interior designers.$t$,
 ARRAY[$t$Air-conditioning systems typically run every working day, so energy efficiency matters$t$, $t$Some offices need partial air-conditioning during extended working hours and holidays$t$, $t$Many AC units run on generator (DG) power during outages and must be selected to operate correctly on DG supply$t$, $t$Faster air circulation and temperature control needed in customer-facing service areas$t$, $t$Server rooms need high sensible cooling and can require standby capacity for continuous operation$t$]::text[],
 ARRAY[$t$Equipment compatible with generator (DG) power and local voltage conditions$t$, $t$VRF/VRV systems for high-end corporate buildings, offering long piping runs, multiple indoor units per outdoor unit and low sound pressure$t$, $t$Standby cooling capacity for server rooms$t$]::text[],
 ARRAY[$t$HVAC systems selected for compatibility with DG power and site voltage conditions$t$, $t$VRF/VRV design for high-end corporate fit-outs$t$, $t$Integrated electrical distribution for banks and corporate offices$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 5),
('telecom-data-centres', $t$Telecom & Data Centres$t$,
 $t$Data centres and server rooms operate 24×7, 365 days a year, and Airtech has provided cost-effective, energy-efficient cooling solutions to leading telecom operators and data centres in Nepal.$t$,
 ARRAY[$t$Telecom equipment needs cooling year-round and carries a high sensible heat load, unlike comfort air-conditioning$t$, $t$Zero-failure tolerance for continuous operation$t$]::text[],
 ARRAY[$t$Precision-type air-conditioning of correct capacity, with an additional standby unit at sensitive installations$t$, $t$HVAC equipment with higher sensible-load capacity suited to telecom equipment heat output$t$, $t$Understanding of heat dissipation from servers to size temperature and relative-humidity control correctly$t$]::text[],
 ARRAY[$t$Green telecom shelters for BTS sites$t$, $t$Telecom air-conditioning with direct free cooling for BTS sites$t$, $t$Precision-type air-conditioners for data centres and server rooms, with and without indirect free cooling$t$, $t$Modular access flooring$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 6),
('banking-financial', $t$Banks & Financial Institutions$t$,
 $t$Airtech is associated with Nepal's leading commercial banks and financial institutions, delivering HVAC and electrical systems built for daily operation, customer-facing service areas and site power conditions.$t$,
 ARRAY[$t$Daily operating hours demand consistently energy-efficient systems$t$, $t$Customer service areas require fast air circulation and stable temperature control$t$, $t$Site power conditions and generator compatibility must be accounted for in equipment selection$t$]::text[],
 ARRAY[$t$Equipment selected for compatibility with available power and DG backup$t$, $t$Aesthetic integration with architect and interior-designer expectations$t$]::text[],
 ARRAY[$t$HVAC and electrical systems for bank branches and financial-institution offices$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 7),
('auditoriums-studios', $t$Auditoriums, Halls, Theatres & Studios$t$,
 $t$Airtech designs for the specific requirements of auditoriums, halls, theatres, recording studios, FM studios and lecture halls, where acoustic performance and peak-load handling are as important as comfort.$t$,
 ARRAY[$t$Auditoriums carry a specific peak load for a short duration that the installed HVAC system must handle$t$, $t$Noise control is critical, particularly for recording studios, lecture halls and theatres$t$, $t$Fresh air and proper exhaust are essential for large halls$t$, $t$Equipment and lighting loads in specialised studios add to the cooling load$t$]::text[],
 ARRAY[$t$Duct design with suitable acoustic insulation to meet stringent noise-level requirements$t$, $t$Fresh-air and exhaust provisioning sized to hall occupancy$t$, $t$Air distribution designed alongside the space's interior aesthetics$t$]::text[],
 ARRAY[$t$Acoustic-conscious duct design for recording studios, lecture halls and theatres$t$, $t$Peak-load HVAC design for auditoriums and cinema halls$t$]::text[],
 ARRAY[]::text[], 'client_confirmed', 8),
('embassies-ingos', $t$Embassies & INGOs$t$,
 $t$Airtech has provided heating, ventilation and air-conditioning services to a number of embassies, INGOs and foreign offices operating in Nepal.$t$,
 ARRAY[]::text[], ARRAY[]::text[],
 ARRAY[$t$HVAC services for diplomatic and international-organisation offices$t$]::text[],
 ARRAY[]::text[], 'source_only', 9),
('education-institutional', $t$Education & Institutional$t$,
 $t$Airtech's MEP capability extends to educational and institutional facilities, delivering the same integrated HVAC, electrical, plumbing and fire-protection systems used across its commercial and healthcare work.$t$,
 ARRAY[]::text[], ARRAY[]::text[],
 ARRAY[$t$Integrated HVAC, electrical, plumbing and fire-protection delivery for educational and institutional buildings$t$]::text[],
 ARRAY[]::text[], 'source_only', 10);

update public.industries set seo_title = $t$Healthcare & Hospital HVAC / MEP$t$, seo_description = $t$HVAC and MEP engineering for hospitals and healthcare facilities — operation theatres, ICUs, diagnostic areas and 24×7 clinical environments.$t$ where slug = 'healthcare';
update public.industries set seo_title = $t$Hospitality HVAC & MEP Engineering$t$, seo_description = $t$Zone-specific HVAC, electrical, plumbing and fire-protection engineering for hotels and resorts — from guest rooms to banquet halls.$t$ where slug = 'hospitality';
update public.industries set seo_title = $t$Pharmaceutical & Laboratory HVAC Engineering$t$, seo_description = $t$Precision HVAC for pharmaceutical manufacturing and laboratories — temperature, humidity, pressure gradients, air changes and HEPA filtration to WHO GMP context.$t$ where slug = 'pharmaceuticals';
update public.industries set seo_title = $t$Industrial & Manufacturing HVAC / MEP$t$, seo_description = $t$Process-informed HVAC and MEP engineering for manufacturing facilities — panel cooling, warehouse ventilation and production-specific design.$t$ where slug = 'industrial';
update public.industries set seo_title = $t$Corporate & Commercial HVAC / MEP$t$, seo_description = $t$HVAC, electrical and BMS engineering for banks, financial institutions and corporate offices — DG-compatible systems, VRF/VRV design and server-room cooling.$t$ where slug = 'corporate-commercial';
update public.industries set seo_title = $t$Telecom & Data Centre Cooling$t$, seo_description = $t$Precision cooling for telecom BTS sites, server rooms and data centres — designed for 24×7 operation, high sensible loads and zero-failure reliability.$t$ where slug = 'telecom-data-centres';
update public.industries set seo_title = $t$Banking & Financial Institution HVAC / Electrical$t$, seo_description = $t$HVAC and electrical engineering for bank branches and financial institutions across Nepal.$t$ where slug = 'banking-financial';
update public.industries set seo_title = $t$Auditorium, Theatre & Studio HVAC$t$, seo_description = $t$Acoustic-conscious HVAC design for auditoriums, theatres, cinema halls, recording studios and lecture halls.$t$ where slug = 'auditoriums-studios';
update public.industries set seo_title = $t$Embassy & INGO HVAC Services$t$, seo_description = $t$HVAC services for embassies, INGOs and foreign offices operating in Nepal.$t$ where slug = 'embassies-ingos';
update public.industries set seo_title = $t$Education & Institutional MEP$t$, seo_description = $t$Integrated HVAC, electrical, plumbing and fire-protection engineering for schools, colleges and institutional facilities.$t$ where slug = 'education-institutional';

-- ---------------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------------
insert into public.services (slug, name, category, discipline_code, short_description, detailed_description, capabilities, sub_services, systems, applications, seo_title, seo_description, status, display_order) values
('hvac', $t$HVAC$t$, 'hvac', $t$M$t$,
 $t$Design, equipment selection, procurement, installation, testing and commissioning of air-conditioning and ventilation systems — from single-room comfort cooling to large commercial chiller plant and specialised process cooling.$t$,
 $t$Airtech's HVAC capability spans the full delivery chain: system design and equipment selection, supply and procurement, installation, and testing and commissioning. The practice covers chillers, VRF/VRV systems, commercial air-conditioning, industrial and process cooling, ventilation, precision air-conditioning for telecom and data-centre environments, and energy-efficient HVAC solutions, extending from small-capacity room air-conditioning to large commercial chiller plant and specialised applications such as pharmaceutical and healthcare environments.$t$,
 ARRAY[$t$HVAC system design$t$, $t$Equipment selection$t$, $t$Supply and procurement$t$, $t$Installation$t$, $t$Testing and commissioning$t$, $t$After-sales service and maintenance$t$]::text[],
 ARRAY[$t$Chiller systems$t$, $t$VRF / VRV systems$t$, $t$Commercial air-conditioning$t$, $t$Industrial / process cooling$t$, $t$Ventilation$t$, $t$Precision air-conditioning$t$, $t$Telecom / data-centre cooling$t$, $t$Energy-efficient HVAC solutions$t$]::text[],
 ARRAY[$t$Chillers$t$, $t$VRF/VRV$t$, $t$Packaged units$t$, $t$Precision AC$t$, $t$Ventilation systems$t$]::text[],
 ARRAY[$t$Commercial buildings$t$, $t$Hospitals and healthcare facilities$t$, $t$Pharmaceutical and laboratory environments$t$, $t$Hospitality$t$, $t$Telecom sites and data centres$t$, $t$Industrial process cooling$t$]::text[],
 $t$HVAC Engineering & Installation$t$, $t$Airtech's HVAC capability: design, equipment selection, procurement, installation, testing and commissioning across commercial, healthcare, pharmaceutical, hospitality and industrial environments.$t$,
 'client_confirmed', 1),
('electrical', $t$Electrical$t$, 'electrical', $t$E$t$,
 $t$Internal and external electrification — HT/LT feeders and panels, distribution boards, schematics, transformers, lightning protection and earthing.$t$,
 $t$Airtech's electrical team executes both internal and external electrification works, covering the schematic and working-drawing preparation through to complete installation of panels, transformers, distribution boards and protective systems for hotels, resorts, hospitals, malls, industries and other institutional clients.$t$,
 ARRAY[$t$Execution of HT and LT feeders and cables$t$, $t$Execution of HT and LT panels, distribution boards$t$, $t$Preparation of schematic and working drawings$t$, $t$Complete installation of internal and external equipment$t$, $t$Lightning protection and complete earthing systems$t$, $t$Intelligent and external lighting$t$]::text[],
 ARRAY[$t$HT/LT feeders and cables$t$, $t$HT/LT panels and distribution boards$t$, $t$Transformers and metering panels$t$, $t$ACB / VCB panels$t$, $t$Internal and external electrification$t$, $t$Lightning protection and earthing$t$, $t$Intelligent and external lighting$t$]::text[],
 ARRAY[$t$HT/LT panels$t$, $t$Distribution boards$t$, $t$Transformers$t$, $t$ACB/VCB panels$t$]::text[],
 ARRAY[$t$Hotels and resorts$t$, $t$Hospitals$t$, $t$Malls$t$, $t$Industries$t$, $t$Institutional buildings$t$]::text[],
 $t$Electrical Engineering & Installation$t$, $t$Internal and external electrification: HT/LT feeders, panels and distribution boards, transformers, lightning protection and earthing systems.$t$,
 'client_confirmed', 2),
('plumbing-public-health', $t$Plumbing & Public Health$t$, 'plumbing-public-health', $t$PHE$t$,
 $t$Internal and external plumbing and sanitary systems, domestic water supply, drainage, rainwater harvesting, and sewage and water treatment plants.$t$,
 $t$Public Health Engineering at Airtech takes a whole-building approach across water efficiency, energy and pollution-related systems — from domestic water supply and drainage through to sewage treatment plants (STP), water treatment plants (WTP) and rainwater harvesting.$t$,
 ARRAY[$t$Internal and external plumbing/sanitary systems$t$, $t$Domestic water supply systems$t$, $t$Internal and external drainage systems$t$, $t$Rain water / storm water recharge wells$t$, $t$Sewerage Treatment Plants (STP), Water Treatment Plants (WTP), Effluent Treatment Plants (ETP)$t$, $t$Pump room equipment (hot and cold water supply)$t$, $t$Modern sanitary fixtures$t$, $t$Rainwater harvesting$t$]::text[],
 ARRAY[$t$Domestic water supply$t$, $t$Drainage systems$t$, $t$Sewage treatment plants$t$, $t$Water treatment plants$t$, $t$Hot water systems$t$, $t$Hydro-pneumatic systems$t$, $t$Rainwater harvesting$t$]::text[],
 ARRAY[$t$STP$t$, $t$WTP$t$, $t$ETP$t$, $t$Pump rooms$t$, $t$Hydro-pneumatic systems$t$]::text[],
 ARRAY[$t$Hospitality$t$, $t$Healthcare$t$, $t$Industrial$t$, $t$Corporate/commercial$t$]::text[],
 $t$Plumbing & Public Health Engineering$t$, $t$Internal and external plumbing, sanitary works, domestic water supply, drainage, sewage/water treatment plants and rainwater harvesting.$t$,
 'client_confirmed', 3),
('fire-protection', $t$Fire Protection & Fire Alarm$t$, 'fire-protection', $t$FP$t$,
 $t$Wet and dry firefighting systems, fire hydrants and pumps, and intelligent fire alarm and detection systems.$t$,
 $t$Airtech designs and installs fire protection and suppression systems for commercial properties, covering wet and dry firefighting, internal and external hydrants, fire pumps and equipment, and intelligent fire alarm systems with automatic smoke and heat detection.$t$,
 ARRAY[$t$Wet and dry firefighting systems$t$, $t$Internal and external fire hydrants$t$, $t$Fire pumps and fire equipment$t$, $t$Intelligent fire alarm systems$t$, $t$Automatic smoke and heat detection$t$, $t$Annunciation and repeater panels$t$, $t$Kitchen hood suppression system$t$]::text[],
 ARRAY[$t$Conventional fire alarm systems$t$, $t$Addressable fire alarm systems$t$, $t$Wireless fire alarm systems$t$, $t$Integrated fire alarm systems$t$, $t$FAS installation, maintenance and inspection, monitoring, system upgrades$t$]::text[],
 ARRAY[$t$Wet/dry firefighting$t$, $t$Fire hydrants$t$, $t$Fire pumps$t$, $t$Intelligent fire alarm panels$t$]::text[],
 ARRAY[$t$Hospitality$t$, $t$Healthcare$t$, $t$Commercial$t$, $t$Industrial$t$, $t$Auditoriums and studios$t$]::text[],
 $t$Fire Protection & Fire Alarm Systems$t$, $t$Wet/dry firefighting, fire hydrants and pumps, and intelligent fire alarm and detection systems for commercial and institutional buildings.$t$,
 'client_confirmed', 4),
('elv-security', $t$ELV / Security / IT$t$, 'elv-security', $t$ELV$t$,
 $t$Extra-low-voltage systems: access control, CCTV, telephone and networking, IPTV and nurse call.$t$,
 $t$A dedicated team of electronics and electrical engineers, supervisors and technicians delivers comprehensive ELV solutions, including OEM-trained execution of national and international security and communication systems.$t$,
 ARRAY[$t$FAS and PA system$t$, $t$Access control system$t$, $t$CCTV system$t$, $t$Telephone system$t$, $t$Networking system$t$, $t$IPTV and nurse call system$t$]::text[],
 ARRAY[$t$Access control$t$, $t$CCTV$t$, $t$Telephone / networking$t$, $t$IPTV$t$, $t$Nurse call systems$t$, $t$MATV$t$]::text[],
 ARRAY[$t$Access control$t$, $t$CCTV$t$, $t$Structured cabling / networking$t$, $t$Nurse call$t$]::text[],
 ARRAY[$t$Hospitality$t$, $t$Healthcare$t$, $t$Corporate/commercial$t$, $t$Institutional$t$]::text[],
 $t$ELV, Security & IT Systems$t$, $t$Access control, CCTV, telephone and networking, IPTV and nurse call systems delivered by a dedicated ELV engineering team.$t$,
 'client_confirmed', 5),
('bms-systems-integration', $t$BMS / Systems Integration$t$, 'bms-systems-integration', $t$BMS$t$,
 $t$Building Management Systems for real-time monitoring, control and integration of a building's mechanical, electrical, security and life-safety systems.$t$,
 $t$Airtech's Building Management System (BMS) offering provides real-time monitoring of a building's day-to-day operation from a centralised control room — early detection of emerging issues, reduced field-supervision costs, reduced downtime, and interfacing between individual smart-building applications.$t$,
 ARRAY[$t$Enterprise systems integration$t$, $t$HVAC maintenance monitoring$t$, $t$Fire detection and alarm integration$t$, $t$Security and access control integration$t$, $t$Water management$t$, $t$Indoor air quality monitoring$t$, $t$Light control and retrofit$t$]::text[],
 ARRAY[$t$Digital video management$t$, $t$Intrusion detection$t$, $t$Mechanical maintenance monitoring$t$, $t$On-site technical service$t$]::text[],
 ARRAY[$t$Centralised BMS control room$t$, $t$Smart building integration platforms$t$]::text[],
 ARRAY[$t$Corporate/commercial$t$, $t$Industrial$t$, $t$Telecom/data centres$t$, $t$Healthcare$t$]::text[],
 $t$Building Management Systems (BMS)$t$, $t$Real-time monitoring, control and enterprise systems integration for a building's mechanical, electrical, security and life-safety systems.$t$,
 'client_confirmed', 6),
('engineering-advisory', $t$Engineering / Advisory$t$, 'engineering-advisory', $t$ADV$t$,
 $t$MEP audit, design peer review, energy audit, commissioning checks, installation audits, site supervision, due diligence and project cost optimisation.$t$,
 $t$Beyond conventional MEP contracting, Airtech provides advisory services tailored to the unique needs of each project — auditing, peer review and optimisation across the MEP lifecycle.$t$,
 ARRAY[$t$MEP audit$t$, $t$MEP design peer review$t$, $t$Energy audit$t$, $t$MEP commissioning checks$t$, $t$MEP installation audits$t$, $t$MEP site supervision$t$, $t$MEP due diligence$t$, $t$Project cost optimisation services$t$]::text[],
 ARRAY[]::text[], ARRAY[]::text[],
 ARRAY[$t$Any sector requiring independent MEP verification or optimisation$t$]::text[],
 $t$MEP Engineering & Advisory Services$t$, $t$MEP audit, design peer review, energy audit, commissioning checks, installation audits, site supervision, due diligence and cost optimisation.$t$,
 'client_confirmed', 7);

-- ---------------------------------------------------------------------------
-- service_industries — union of services.relatedIndustrySlugs and
-- industries.relatedServiceSlugs from src/content/*.ts; the two mirrored array
-- fields were not perfectly symmetric in the source, so nothing declared on
-- either side is dropped.
-- ---------------------------------------------------------------------------
insert into public.service_industries (service_slug, industry_slug) values
('hvac','healthcare'), ('electrical','healthcare'), ('plumbing-public-health','healthcare'), ('elv-security','healthcare'), ('fire-protection','healthcare'), ('bms-systems-integration','healthcare'),
('hvac','hospitality'), ('electrical','hospitality'), ('plumbing-public-health','hospitality'), ('fire-protection','hospitality'), ('elv-security','hospitality'),
('hvac','pharmaceuticals'), ('engineering-advisory','pharmaceuticals'),
('hvac','industrial'), ('electrical','industrial'), ('bms-systems-integration','industrial'), ('plumbing-public-health','industrial'),
('hvac','corporate-commercial'), ('electrical','corporate-commercial'), ('bms-systems-integration','corporate-commercial'), ('fire-protection','corporate-commercial'), ('elv-security','corporate-commercial'),
('hvac','telecom-data-centres'), ('electrical','telecom-data-centres'), ('bms-systems-integration','telecom-data-centres'),
('hvac','banking-financial'), ('electrical','banking-financial'),
('hvac','auditoriums-studios'), ('electrical','auditoriums-studios'), ('fire-protection','auditoriums-studios'),
('hvac','embassies-ingos'), ('electrical','embassies-ingos'),
('hvac','education-institutional'), ('electrical','education-institutional'), ('plumbing-public-health','education-institutional'), ('fire-protection','education-institutional'), ('elv-security','education-institutional');

-- ---------------------------------------------------------------------------
-- certifications / partners — badges printed on the brochure but not yet
-- confirmed current by management; status stays source_only /
-- client_confirmed exactly as in src/content/certifications.ts, which keeps
-- them out of live rendering until certificate copies are supplied.
-- ---------------------------------------------------------------------------
insert into public.certifications (id, name, issuing_body, status) values
('iso-9001', $t$ISO 9001:2015$t$, $t$URS (UKAS-accredited)$t$, 'source_only'),
('iso-14001', $t$ISO 14001:2015$t$, $t$URS (UKAS-accredited)$t$, 'source_only'),
('iso-45001', $t$ISO 45001:2018$t$, $t$URS (UKAS-accredited)$t$, 'source_only');

insert into public.partners (id, name, relationship_note, status) values
('mitsubishi-electric', $t$Mitsubishi Electric$t$, $t$Equipment used in Airtech installations$t$, 'client_confirmed'),
('midea', $t$Midea$t$, $t$Equipment used in Airtech installations$t$, 'client_confirmed');

-- ---------------------------------------------------------------------------
-- people — questionnaire names a Managing Director and one member of senior
-- management "at minimum"; no bios/photos supplied.
-- ---------------------------------------------------------------------------
insert into public.people (id, name, role, status, display_order) values
('manoj-bhansali', $t$Manoj Bhansali$t$, $t$Managing Director$t$, 'client_confirmed', 1),
('ashok-ji', $t$Ashok Ji$t$, $t$Senior Management$t$, 'client_confirmed', 2);

-- ---------------------------------------------------------------------------
-- site_settings — Master Source of Truth §2. Phone/whatsapp stay NULL: the
-- questionnaire and brochure give conflicting numbers (docs/OPEN_DECISIONS.md #1).
-- ---------------------------------------------------------------------------
insert into public.site_settings (id, company_name, brand_name, tagline, established_year, head_office, primary_email, lead_notification_email) values
(true, $t$Airtech Industries Pvt. Ltd.$t$, $t$AIRTECH$t$, $t$Reliability Matters$t$, $t$2000$t$, $t$1st Floor, Sharada Complex, Panchyan Marg, Thapathali, Kathmandu, Nepal$t$, $t$info@airtech.com.np$t$, $t$info@airtech.com.np$t$);

-- ---------------------------------------------------------------------------
-- projects — 13 records from src/content/projects.ts. `city` is mechanically
-- parsed from the existing `location` string (not new information). No
-- challenge/approach/outcome narrative is invented for the "lighter portfolio"
-- entries, matching the source file's own discipline.
-- ---------------------------------------------------------------------------
insert into public.projects (slug, name, client, client_display_approved, location, city, industry_slug, project_type, project_status, airtech_role, featured, seo_title, seo_description, status, display_order) values
('ncell-corporate-office', $t$Ncell Corporate Office$t$, $t$Ncell$t$, true, $t$Lainchaur, Kathmandu$t$, $t$Kathmandu$t$, 'telecom-data-centres', $t$Corporate office$t$, 'provisional', $t$HVAC and MEP works for the new corporate office.$t$, true, $t$Ncell Corporate Office — HVAC & MEP$t$, $t$HVAC and MEP works delivered for the Ncell corporate office in Lainchaur, Kathmandu.$t$, 'source_only', 1),
('sipradi-trading', $t$Sipradi Trading Corporate Office$t$, $t$Sipradi Trading Pvt. Ltd.$t$, true, $t$Gairidhara, Kathmandu$t$, $t$Kathmandu$t$, 'corporate-commercial', $t$Corporate office$t$, 'provisional', $t$Complete MEP and HVAC works for the new office building.$t$, true, $t$Sipradi Trading Corporate Office — Complete MEP$t$, $t$Complete MEP and HVAC works delivered for the Sipradi Trading office building in Gairidhara, Kathmandu.$t$, 'source_only', 2),
('new-airport-commercial-office-parking', $t$New Airport Commercial Office & Parking Lot$t$, null, true, $t$Kathmandu$t$, $t$Kathmandu$t$, 'corporate-commercial', $t$Infrastructure / commercial$t$, 'provisional', $t$MEP works for the commercial office and parking facility.$t$, false, $t$New Airport Commercial Office & Parking — MEP$t$, $t$MEP works for the new airport commercial office and parking lot facility in Kathmandu.$t$, 'needs_verification', 3),
('nobel-college-health-education', $t$Nobel College of Health and Education Foundation$t$, $t$Nobel College of Health and Education Foundation$t$, true, $t$Baneshwor, Kathmandu$t$, $t$Kathmandu$t$, 'education-institutional', $t$Healthcare / education$t$, 'provisional', $t$MEP works including supply, delivery, installation, testing and commissioning.$t$, true, $t$Nobel College of Health and Education Foundation — MEP$t$, $t$MEP works including supply, delivery, installation, testing and commissioning at Nobel College, Baneshwor, Kathmandu.$t$, 'source_only', 4),
('nepal-mediciti', $t$Nepal Mediciti / Ashwin's Medical College & Hospital$t$, $t$Nepal Mediciti / Ashwin's Medical College & Hospital$t$, true, $t$Lalitpur, Nepal$t$, $t$Lalitpur$t$, 'healthcare', $t$Hospital$t$, 'provisional', $t$HVAC/MEP engineering and execution.$t$, true, $t$Nepal Mediciti Hospital — HVAC & MEP$t$, $t$HVAC/MEP engineering and execution at Nepal Mediciti / Ashwin's Medical College & Hospital.$t$, 'needs_verification', 5),
('norvic-international-hospital', $t$Norvic International Hospital$t$, $t$Norvic International Hospital$t$, true, $t$Kathmandu$t$, $t$Kathmandu$t$, 'healthcare', $t$Hospital$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$Norvic International Hospital$t$, $t$Norvic International Hospital, Kathmandu — featured in Airtech's project portfolio.$t$, 'source_only', 6),
('grande-international-hospital', $t$Grande International Hospital$t$, $t$Grande International Hospital$t$, true, $t$Kathmandu$t$, $t$Kathmandu$t$, 'healthcare', $t$Hospital$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$Grande International Hospital$t$, $t$Grande International Hospital, Kathmandu — featured in Airtech's project portfolio.$t$, 'source_only', 7),
('the-soaltee', $t$The Soaltee$t$, $t$Soaltee$t$, true, $t$Kathmandu$t$, $t$Kathmandu$t$, 'hospitality', $t$Hotel$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$The Soaltee, Kathmandu$t$, $t$The Soaltee, Kathmandu — featured in Airtech's project portfolio.$t$, 'source_only', 8),
('radisson-hotel-kathmandu', $t$Radisson Hotel Kathmandu$t$, $t$Hotel Radisson$t$, true, $t$Kathmandu$t$, $t$Kathmandu$t$, 'hospitality', $t$Hotel$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$Radisson Hotel Kathmandu$t$, $t$Radisson Hotel, Kathmandu — featured in Airtech's project portfolio.$t$, 'source_only', 9),
('universal-college-medical-sciences', $t$Universal College of Medical Sciences$t$, $t$Universal College of Medical Sciences$t$, true, $t$Bhairahawa$t$, $t$Bhairahawa$t$, 'education-institutional', $t$Educational / medical college$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$Universal College of Medical Sciences$t$, $t$Universal College of Medical Sciences, Bhairahawa — featured in Airtech's project portfolio.$t$, 'source_only', 10),
('shanker-group-corporate-office', $t$Shanker Group Corporate Office$t$, $t$Shanker Group$t$, true, $t$Kathmandu$t$, $t$Kathmandu$t$, 'corporate-commercial', $t$Corporate office$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$Shanker Group Corporate Office$t$, $t$Shanker Group Corporate Office, Kathmandu — featured in Airtech's project portfolio.$t$, 'source_only', 11),
('caan-civil-aviation-authority', $t$Civil Aviation Authority of Nepal (CAAN)$t$, $t$Civil Aviation Authority of Nepal$t$, true, $t$Kathmandu$t$, $t$Kathmandu$t$, 'corporate-commercial', $t$Infrastructure / institutional$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$Civil Aviation Authority of Nepal (CAAN)$t$, $t$Civil Aviation Authority of Nepal (CAAN), Kathmandu — featured in Airtech's project portfolio.$t$, 'source_only', 12),
('laxmi-motor-corporation', $t$Laxmi Motor Corporation$t$, $t$Laxmi Motor Corporation$t$, true, $t$Parasi, Nepal$t$, $t$Parasi$t$, 'industrial', $t$Industrial facility$t$, 'provisional', $t$Featured in Airtech's project portfolio.$t$, false, $t$Laxmi Motor Corporation$t$, $t$Laxmi Motor Corporation, Parasi — featured in Airtech's project portfolio.$t$, 'source_only', 13);

-- project_services — serviceSlugsDelivered / relatedServiceSlugs were identical
-- arrays for every project in the source (verified while designing the schema).
insert into public.project_services (project_id, service_slug)
select p.id, s.service_slug from public.projects p
cross join lateral unnest(case p.slug
  when 'ncell-corporate-office' then ARRAY['hvac','electrical','plumbing-public-health']
  when 'sipradi-trading' then ARRAY['hvac','electrical','plumbing-public-health','fire-protection']
  when 'new-airport-commercial-office-parking' then ARRAY['hvac','electrical','plumbing-public-health']
  when 'nobel-college-health-education' then ARRAY['hvac','electrical','plumbing-public-health','fire-protection']
  when 'nepal-mediciti' then ARRAY['hvac','electrical','plumbing-public-health','fire-protection']
  else ARRAY['hvac']
end) as s(service_slug)
where p.slug in (
  'ncell-corporate-office','sipradi-trading','new-airport-commercial-office-parking',
  'nobel-college-health-education','nepal-mediciti','norvic-international-hospital',
  'grande-international-hospital','the-soaltee','radisson-hotel-kathmandu',
  'universal-college-medical-sciences','shanker-group-corporate-office',
  'caan-civil-aviation-authority','laxmi-motor-corporation'
);

-- project_industries — populated from industries.relatedProjectSlugs (the only
-- two non-empty entries in the source).
insert into public.project_industries (project_id, industry_slug)
select p.id, 'telecom-data-centres' from public.projects p where p.slug = 'ncell-corporate-office'
union all
select p.id, 'education-institutional' from public.projects p where p.slug = 'nobel-college-health-education';

-- project_related_projects — exactly as declared per project in the source
-- (asymmetric where the source itself is asymmetric, e.g. CAAN -> new-airport
-- is declared but not the reverse).
insert into public.project_related_projects (project_id, related_project_id)
select p1.id, p2.id from public.projects p1, public.projects p2 where p1.slug = 'ncell-corporate-office' and p2.slug = 'sipradi-trading'
union all
select p1.id, p2.id from public.projects p1, public.projects p2 where p1.slug = 'sipradi-trading' and p2.slug = 'ncell-corporate-office'
union all
select p1.id, p2.id from public.projects p1, public.projects p2 where p1.slug = 'nobel-college-health-education' and p2.slug = 'nepal-mediciti'
union all
select p1.id, p2.id from public.projects p1, public.projects p2 where p1.slug = 'nepal-mediciti' and p2.slug = 'nobel-college-health-education'
union all
select p1.id, p2.id from public.projects p1, public.projects p2 where p1.slug = 'the-soaltee' and p2.slug = 'radisson-hotel-kathmandu'
union all
select p1.id, p2.id from public.projects p1, public.projects p2 where p1.slug = 'radisson-hotel-kathmandu' and p2.slug = 'the-soaltee'
union all
select p1.id, p2.id from public.projects p1, public.projects p2 where p1.slug = 'caan-civil-aviation-authority' and p2.slug = 'new-airport-commercial-office-parking';
