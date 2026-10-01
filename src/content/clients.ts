import type { IndustrySlug } from "./types";

/**
 * Client register, by sector.
 *
 * Source: source-material/CLIENT_LIST_AND_MISSION_2026-10-01.md (the
 * client's own sector lists, supplied 2026-10-01). Names are kept as the
 * client wrote them; only "(P) Ltd"-style suffixes are dropped for
 * readability and the city split into its own field. The client's
 * combined "Banks & Corporate" list is split across the site's two
 * sectors (banks + insurers → banking-financial, the rest →
 * corporate-commercial). Ncell and Huawei appear in both the corporate and
 * telecom lists in the source; they are listed once, under telecom. The
 * source lists "Swiss Embassy" and "Embassy of Switzerland" separately;
 * they are merged.
 *
 * This list supersedes the earlier Huawei exclusion (questionnaire): the
 * client names Huawei directly in both its corporate and telecom lists.
 *
 * `logo` names a file in /public/images/clients when one was supplied.
 */
export interface Client {
  name: string;
  city?: string;
  logo?: string;
}

export interface ClientGroup {
  industrySlug: IndustrySlug;
  label: string;
  clients: Client[];
}

const c = (name: string, city?: string, logo?: string): Client => ({ name, city, logo });

export const clientGroups: ClientGroup[] = [
  {
    industrySlug: "healthcare",
    label: "Hospitals",
    clients: [
      c("Blue Cross Hospital", "Kathmandu"),
      c("BP Koirala Institute of Health Sciences", "Dharan"),
      c("Butwal Hospital", "Butwal"),
      c("Charak Memorial Hospital", "Pokhara"),
      c("Chirayu Hospital", "Kathmandu"),
      c("Chitwan Medical College", "Narayangarh"),
      c("Chitwan Om Hospital", "Chitwan"),
      c("CIWEC Clinic", "Kathmandu"),
      c("Devdaha Medical College", "Rupandehi"),
      c("Dhulikhel Hospital", "Dhulikhel"),
      c("Gandaki Medical College", "Pokhara"),
      c("Grande City Clinic", "Kathmandu"),
      c("Grande International Hospital", "Kathmandu"),
      c("Helios Hospital", "Lalitpur"),
      c("Kathmandu Medical College", "Kathmandu"),
      c("KIST Medical College", "Lalitpur"),
      c("Lahan Eye Hospital", "Lahan"),
      c("Lumbini Medical College", "Palpa"),
      c("Manipal Teaching Hospital", "Pokhara"),
      c("Manmohan Cardio Vascular and Teaching Hospital", "Kathmandu"),
      c("Mechi Eye Hospital", "Birtamode"),
      c("Narayani Vayodha Hospital", "Birgunj"),
      c("National City Hospital", "Chitwan"),
      c("National Medical College"),
      c("National Trauma Center, Bir Hospital", "Kathmandu"),
      c("Nepal Cancer Hospital", "Kathmandu"),
      c("Nepal Mediciti Hospital", "Lalitpur"),
      c("Nepal Orthopaedic Hospital", "Kathmandu"),
      c("Nepalese Army Institute of Health Sciences", "Kathmandu"),
      c("Nepalgunj Medical College", "Nepalgunj"),
      c("Neuro Hospital, Bansbari", "Kathmandu"),
      c("Nobel Medical College", "Biratnagar"),
      c("Norvic International Hospital", "Kathmandu"),
      c("Om Hospital", "Kathmandu"),
      c("Patan Hospital", "Lalitpur"),
      c("Sagarmatha Eye Hospital", "Lahan"),
      c("Teaching Hospital", "Kathmandu"),
      c("Universal College of Medical Sciences", "Bhairahawa"),
      c("Vayodha Hospital", "Kathmandu"),
    ],
  },
  {
    industrySlug: "pharmaceuticals",
    label: "Pharma & labs",
    clients: [
      c("Alive Pharmaceuticals", "Biratnagar", "alive-pharmaceutical.webp"),
      c("Apex Pharmaceuticals", "Birgunj"),
      c("Arya Pharma Lab", "Birgunj", "arya-pharmalab.webp"),
      c("Bhasker Herbaceuticals", "Birgunj"),
      c("BSL-3, National Public Health Laboratory", "Kathmandu"),
      c("CTL Laboratories", "Kathmandu"),
      c("Deurali-Janta Pharmaceuticals", "Kathmandu", "djpl.webp"),
      c("Elder Universal Pharmaceuticals", "Bhairahawa"),
      c("Everest Pharmaceuticals", "Birgunj"),
      c("Florid Laboratories", "Kathmandu", "florid.webp"),
      c("GD Laboratories", "Birgunj"),
      c("Genetica Laboratories", "Birgunj"),
      c("K-Lab", "Kathmandu", "k-lab.webp"),
      c("Live Care Pharmaceuticals", "Narayangarh"),
      c("Lomus Pharmaceuticals", "Kathmandu"),
      c("Magnus Pharmaceuticals", "Birgunj", "magnus.webp"),
      c("Medivet Pharmaceuticals", "Kathmandu"),
      c("National Health Care", "Birgunj"),
      c("Nepal Pharmaceuticals Lab", "Birgunj", "npl.webp"),
      c("Ohm Pharmaceuticals", "Kathmandu", "ohm-pharma.webp"),
      c("Panas Pharmaceuticals", "Nepalgunj", "panas.webp"),
      c("Patanjali Ayurvedic Kendra", "Birgunj"),
      c("Pharmaco Industries", "Kathmandu"),
      c("Quest Pharmaceuticals", "Birgunj", "quest-pharmaceuticals.webp"),
      c("Siddhartha Pharmaceuticals", "Bhairahawa"),
      c("Simca Lab", "Kathmandu", "simca.webp"),
      c("SR Drug Laboratories", "Kathmandu"),
      c("Sumy Pharmaceuticals", "Narayangarh"),
      c("Time Pharmaceuticals", "Narayangarh", "time-pharmaceuticals.webp"),
      c("Unique Pharmaceuticals", "Birgunj"),
      c("Vijaydeep Laboratories", "Kathmandu", "vijayadeep-laboratories.webp"),
      c("Zest Laboratories", "Kathmandu"),
    ],
  },
  {
    industrySlug: "banking-financial",
    label: "Banks & insurance",
    clients: [
      c("Everest Bank", undefined, "everest-bank.webp"),
      c("Global IME Bank"),
      c("Himalayan Bank", undefined, "himalayan-bank.webp"),
      c("Kumari Bank"),
      c("Laxmi Sunrise Bank", undefined, "laxmi-sunrise-bank.webp"),
      c("Machhapuchchhre Bank"),
      c("Mahalaxmi Bikas Bank"),
      c("Nabil Bank", undefined, "nabil-bank.webp"),
      c("Nepal Investment Mega Bank", undefined, "nepal-investment-bank.webp"),
      c("Nepal SBI Bank"),
      c("NMB Bank", undefined, "nmb-bank.webp"),
      c("Prabhu Bank", undefined, "prabhu-bank.webp"),
      c("Prime Commercial Bank", undefined, "prime-commercial-bank.webp"),
      c("Sanima Bank", undefined, "sanima-bank.webp"),
      c("Siddhartha Bank", undefined, "siddhartha-bank.webp"),
      c("Standard Chartered Bank", undefined, "standard-chartered.webp"),
      c("Alliance Insurance Company"),
      c("Everest Insurance"),
      c("Himalayan Everest Insurance"),
      c("Himalayan Reinsurance"),
      c("Lumbini General Insurance"),
      c("National Life Insurance"),
      c("Prime Life Insurance"),
    ],
  },
  {
    industrySlug: "corporate-commercial",
    label: "Corporate",
    clients: [
      c("Agni Incorporated"),
      c("APCA Nepal"),
      c("Butwal Power Company"),
      c("Cedar Gate"),
      c("Central Business Park"),
      c("CSC & Co. Chartered Accountants"),
      c("Ghorahi Cement"),
      c("Global College"),
      c("Golyan Group"),
      c("Hama Steels"),
      c("Himalayan Builders"),
      c("IME Group"),
      c("Kantipur Publications"),
      c("Kavya School"),
      c("KL Tower"),
      c("Maruti Cement"),
      c("Metro Park"),
      c("Nimbus"),
      c("Regency Watch"),
      c("Regus Business Centre"),
      c("Sanigad Hydro"),
      c("Sino Sagarmatha Hydro Power Company"),
      c("Sipradi Trading"),
      c("Sujal Group, Corporate Office"),
      c("Tele Talk"),
      c("Trans Himalayan Express"),
      c("United Distributors Nepal"),
      c("Varun Developers"),
      c("Verisk Information Technologies"),
      c("Web Search"),
    ],
  },
  {
    industrySlug: "telecom-data-centres",
    label: "Telecom & data centres",
    clients: [
      c("Huawei Technologies Nepal"),
      c("Ncell", undefined, "ncell.png"),
      c("Nepal Telecom", undefined, "nepal-telecom.png"),
      c("United Telecom Limited", undefined, "united-telecom-utl.png"),
      c("Home TV (DTH)"),
      c("Data Hub", undefined, "data-hub.png"),
      c("Cloud Himalaya", undefined, "cloud-himalaya.png"),
      c("OHM Data Center", undefined, "ohm-data-center.png"),
    ],
  },
  {
    industrySlug: "industrial",
    label: "Industries",
    clients: [
      c("Agro Thai Foods", "Kathmandu"),
      c("Asian Thai Food", "Biratnagar"),
      c("Avinash Hatcheries", "Narayangarh"),
      c("Bottlers Nepal", "Narayangarh"),
      c("Dabur Nepal", "Birgunj"),
      c("Dugar Spices & Food Products"),
      c("Gorkha Breweries", "Narayangarh"),
      c("Hama Iron & Steel Industries", "Birgunj"),
      c("Hulas Steel Industries", "Birgunj"),
      c("Jagdamba Foods", "Bhairahawa"),
      c("Jagdamba Steels", "Birgunj"),
      c("Jyoti Group", "Birgunj"),
      c("Kwality Food & Snack Industries", "Biratnagar"),
      c("Laxmi Motor Corporation", "Parasi"),
      c("Nepal Wellhope Agri-Tech", "Chitwan"),
      c("Nina Hager Grocery", "Kathmandu"),
      c("Panchakanya Group", "Bhairahawa, Kathmandu"),
      c("Probiotech Industries", "Birgunj"),
      c("Sujal Foods", "Pokhara"),
      c("Sumy Distillery", "Narayangarh"),
      c("Surya Nepal", "Biratnagar"),
      c("Varun Beverages", "Kathmandu"),
      c("Viju Poultry", "Biratnagar"),
      c("Yashoda Foods", "Butwal"),
    ],
  },
  {
    industrySlug: "auditoriums-studios",
    label: "Auditoriums & studios",
    clients: [
      c("Avenues Television"),
      c("Big Cinemas", undefined, "big-cinemas.png"),
      c("DAV School, Auditorium Hall", undefined, "dav-school.png"),
      c("F Cube Cinema", undefined, "f-cube-cinemas.png"),
      c("Indradev Chalchitra Mandir", "Chitwan"),
      c("Jai Nepal Hall"),
      c("Kantipur Television"),
      c("Kumari Hall Auditorium"),
      c("Lecture Hall, KIST Medical College"),
      c("Lecture Hall, UCMS"),
      c("Lincoln School", undefined, "lincoln-school.png"),
      c("Movies Entertainment", "Narayanghat"),
      c("Nach Ghar"),
      c("Narayani Mall", "Hetauda"),
      c("NATHM College, Auditorium Hall"),
      c("Premier School, Auditorium Hall"),
      c("QFX, Civil Mall", undefined, "jai-nepal-qfx.png"),
      c("Rato Bangla School, Auditorium Hall", undefined, "rato-bangala-school.png"),
      c("St. Mary's School, Auditorium Hall", undefined, "st-marys-school.png"),
    ],
  },
  {
    industrySlug: "embassies-ingos",
    label: "Embassies & INGOs",
    clients: [
      c("American Embassy", undefined, "us-embassy-nepal.png"),
      c("British Embassy", undefined, "british-embassy-kathmandu.png"),
      c("British Gurkhas"),
      c("DANIDA"),
      c("Danish Embassy"),
      c("Embassy of Israel"),
      c("Embassy of Saudi Arabia", undefined, "saudi-arabia-embassy.png"),
      c("Embassy of Switzerland", undefined, "embassy-of-switzerland.png"),
      c("GIZ", undefined, "giz.png"),
      c("Indian Welfare"),
      c("IOM"),
      c("JICA", undefined, "jica.png"),
      c("LI-BIRD"),
      c("Nick Simons Institute"),
      c("NSET"),
      c("Plan International", undefined, "plan-international.png"),
      c("Russian Embassy", undefined, "russian-embassy.png"),
      c("Save the Children"),
      c("UNDP"),
      c("UNFPA"),
      c("US Peace Corps"),
      c("WFO"),
      c("World Bank"),
      c("World Claim"),
      c("World Vision International"),
    ],
  },
];

export function getClientsByIndustry(slug: string) {
  return clientGroups.find((g) => g.industrySlug === slug)?.clients ?? [];
}

export const clientCount = clientGroups.reduce((n, g) => n + g.clients.length, 0);
