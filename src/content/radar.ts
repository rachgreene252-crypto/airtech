/**
 * Project Radar geography (2026-09-29).
 *
 * NEPAL_PATH: Nepal's national boundary from Natural Earth 1:50m admin-0
 * (public domain, naturalearthdata.com), in an equirectangular projection
 * with longitude scaled by cos(28.2°) so the country keeps its true shape.
 * Every coordinate on the radar goes through the same project() below.
 *
 * Positions are CITY-LEVEL, never building-level: the source material gives
 * each project's city or district (AIPL PROFILE - 2026.pptx slides 8-11,
 * questionnaire answers 5.x/9.5), not a site address, and the radar must
 * not imply a precision the sources don't have. City coordinates are the
 * standard published coordinates of each city centre.
 */
export const MAP_W = 1000;
export const MAP_H = 578;
const LON0 = 80.0;
const LAT1 = 30.5;
const K = 0.881303;
const SX = 137.537327;

export function project(lon: number, lat: number): [number, number] {
  return [(lon - LON0) * K * SX, (LAT1 - lat) * SX];
}

export const NEPAL_PATH =
  "M983.0,361.6 L987.9,365.4 L988.4,371.5 L987.5,378.3 L982.5,393.0 L977.9,403.3 L972.6,425.1 L967.8,463.0 L968.9,469.5 L983.2,491.2 L988.8,507.9 L989.3,519.2 L983.2,538.3 L976.3,559.8 L973.0,564.6 L969.1,566.3 L951.4,558.8 L939.3,559.9 L925.3,564.0 L910.7,563.2 L898.6,560.7 L883.3,569.4 L868.7,564.7 L859.3,559.3 L853.1,544.4 L850.5,542.5 L819.7,558.1 L812.3,559.1 L793.2,550.7 L777.5,542.4 L771.7,539.9 L756.6,536.7 L743.0,534.8 L728.2,529.6 L709.8,536.4 L702.4,535.8 L695.4,530.9 L691.8,520.9 L690.9,511.4 L684.7,504.9 L675.0,503.4 L661.4,509.3 L641.6,517.0 L635.2,515.7 L629.3,513.5 L627.2,511.4 L624.4,502.5 L621.3,500.5 L616.6,500.2 L608.5,498.1 L598.4,491.4 L567.9,475.7 L564.1,468.8 L564.2,453.4 L562.5,447.0 L558.8,440.3 L543.1,433.5 L512.7,422.5 L495.9,413.8 L487.9,417.9 L472.4,421.5 L464.1,429.4 L454.2,426.9 L430.5,418.6 L417.8,417.4 L410.2,420.2 L408.4,425.0 L398.8,430.4 L389.6,426.1 L371.4,420.2 L355.5,417.1 L331.3,410.0 L328.6,399.3 L324.5,388.8 L318.8,386.9 L297.1,389.0 L277.3,377.3 L256.0,362.4 L246.9,357.5 L240.9,355.7 L235.8,357.7 L229.9,361.1 L224.6,362.1 L213.0,355.7 L198.2,346.5 L180.1,335.3 L158.9,319.6 L150.2,310.7 L146.2,304.0 L141.7,297.8 L123.2,287.5 L108.6,279.4 L91.0,269.6 L88.0,267.7 L81.4,261.8 L71.2,254.5 L62.8,252.4 L60.1,256.4 L58.1,260.6 L50.7,259.7 L39.4,252.2 L27.5,244.4 L18.1,237.1 L8.6,229.7 L6.3,224.1 L10.3,207.1 L15.8,192.5 L20.5,189.2 L28.2,179.5 L31.0,162.6 L30.9,148.1 L38.4,127.6 L48.7,105.9 L66.5,82.5 L74.3,74.8 L82.9,69.5 L99.4,52.4 L102.8,49.5 L110.0,45.1 L117.1,44.0 L122.5,46.1 L127.9,55.2 L134.6,63.7 L142.7,63.3 L152.1,55.9 L171.8,22.3 L199.0,15.5 L224.8,18.9 L247.7,23.8 L254.4,35.1 L258.8,46.9 L261.7,52.9 L269.2,60.0 L301.4,76.8 L320.1,92.0 L346.0,112.3 L365.3,121.3 L382.5,122.0 L392.1,130.0 L406.7,145.9 L419.0,164.2 L434.4,181.1 L445.0,180.5 L459.4,175.0 L477.1,167.9 L487.5,171.4 L497.1,176.1 L500.3,184.8 L506.1,201.3 L512.6,218.4 L522.7,224.4 L534.6,233.3 L541.3,240.3 L563.7,253.1 L566.9,258.4 L571.4,261.9 L576.9,264.2 L581.4,266.8 L588.5,267.7 L614.4,260.0 L621.4,261.0 L625.3,262.4 L625.5,265.2 L620.8,277.2 L616.8,292.6 L620.9,300.4 L631.8,303.6 L655.8,305.9 L688.3,305.7 L698.1,313.5 L707.9,325.2 L717.8,345.3 L721.7,353.7 L726.6,356.2 L735.0,352.8 L736.4,344.6 L736.8,332.3 L743.9,328.1 L748.4,331.2 L753.7,340.8 L767.1,349.4 L776.8,353.7 L786.1,352.2 L789.9,348.9 L794.5,332.1 L801.8,329.7 L811.0,330.8 L814.5,334.1 L818.2,340.8 L829.4,344.0 L840.5,348.2 L850.9,353.7 L865.6,366.1 L883.7,368.3 L904.7,368.1 L915.8,368.3 L923.9,369.3 L931.2,368.4 L952.8,359.5 L961.6,358.9 L972.5,359.9 L983.0,361.6 Z";

/** 1° graticule, clipped to the map frame. */
export const GRATICULE = {
  lons: [81, 82, 83, 84, 85, 86, 87, 88],
  lats: [27, 28, 29, 30],
};

export type RadarPlace = {
  id: string;
  name: string;
  /** Sub-label under the name, e.g. the district. */
  region: string;
  lon: number;
  lat: number;
  /** Label side on the map (default right); set where cities sit close. */
  labelSide?: "left" | "right";
  /** Match against Project.location (lower-cased, substring). */
  matches: string[];
  /** Healthcare clients in this city named in AIPL PROFILE - 2026.pptx
   * slides 13-14 ("Our Clients: Hospitals"). Client names only; no project
   * scope is implied for these. */
  clients?: string[];
};

export const HQ = { name: "Head office, Thapathali", lon: 85.3206, lat: 27.6939 };

export const PLACES: RadarPlace[] = [
  {
    id: "kathmandu-valley",
    name: "Kathmandu Valley",
    region: "Kathmandu · Lalitpur",
    lon: 85.324,
    lat: 27.7172,
    matches: ["kathmandu", "lalitpur", "thamel", "naxal", "lainchaur", "gairidhara", "baneshwor", "harisiddhi"],
    clients: [
      "Blue Cross Hospital",
      "Ciwec Clinic",
      "Helios Hospital",
      "Kathmandu Medical College",
      "KIST Medical College",
      "Nepal Orthopedic Hospital",
      "Neuro Hospital, Bansbari",
      "Om Hospital",
      "Patan Hospital",
      "Teaching Hospital",
      "Vayodha Hospital",
    ],
  },
  { id: "mustang", name: "Mustang", region: "Gandaki Province", lon: 83.73, lat: 28.78, matches: ["mustang"] },
  {
    id: "bhairahawa",
    name: "Bhairahawa",
    labelSide: "left",
    region: "Rupandehi",
    lon: 83.45,
    lat: 27.505,
    matches: ["bhairahawa"],
  },
  { id: "parasi", name: "Parasi", region: "Nawalparasi West", lon: 83.667, lat: 27.532, matches: ["parasi"] },
  {
    id: "bharatpur",
    name: "Bharatpur",
    region: "Chitwan",
    lon: 84.433,
    lat: 27.683,
    matches: ["bharatpur", "chitwan"],
    clients: ["Chitwan Om Hospital", "National City Hospital"],
  },
  {
    id: "birgunj",
    name: "Birgunj",
    region: "Parsa",
    lon: 84.878,
    lat: 27.011,
    matches: ["birgunj"],
    clients: ["Narayani Vayodha Hospital"],
  },
  {
    id: "pokhara",
    name: "Pokhara",
    region: "Kaski",
    lon: 83.9856,
    lat: 28.2096,
    matches: [],
    clients: ["Charak Memorial Hospital", "Gandaki Medical College", "Manipal Teaching Hospital"],
  },
  {
    id: "nepalgunj",
    name: "Nepalgunj",
    region: "Banke",
    lon: 81.6167,
    lat: 28.05,
    matches: [],
    clients: ["Nepalgunj Medical College", "National Medical College"],
  },
  {
    id: "butwal",
    name: "Butwal",
    region: "Rupandehi",
    lon: 83.4483,
    lat: 27.7006,
    matches: [],
    clients: ["Butwal Hospital", "Devdaha Medical College"],
  },
  { id: "tansen", name: "Tansen", region: "Palpa", lon: 83.5467, lat: 27.8673, matches: [], clients: ["Lumbini Medical College"] },
  { id: "dhulikhel", name: "Dhulikhel", region: "Kavrepalanchok", lon: 85.555, lat: 27.618, matches: [], clients: ["Dhulikhel Hospital"] },
  {
    id: "lahan",
    name: "Lahan",
    region: "Siraha",
    lon: 86.4808,
    lat: 26.7197,
    matches: [],
    clients: ["Lahan Eye Hospital", "Sagarmatha Eye Hospital"],
  },
  { id: "dharan", name: "Dharan", region: "Sunsari", lon: 87.2833, lat: 26.8125, matches: [], clients: ["BP Koirala Institute of Health Sciences"] },
  { id: "biratnagar", name: "Biratnagar", region: "Morang", lon: 87.2718, lat: 26.4525, matches: [], clients: ["Nobel Medical College"] },
  { id: "birtamode", name: "Birtamode", region: "Jhapa", lon: 87.9932, lat: 26.6412, matches: [], clients: ["Mechi Eye Hospital"] },
];
