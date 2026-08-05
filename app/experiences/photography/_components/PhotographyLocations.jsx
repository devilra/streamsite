"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Aperture,
  MapPin,
  Star,
  Clock,
  Gauge,
  X,
  ChevronRight,
  Compass,
  UserCheck,
  Heart,
  Maximize2,
  ArrowRight,
  Cloud,
  Wind,
  Eye,
  Sunrise,
  Sunset,
  Sparkles,
  TreePine,
  Tent,
  Moon,
  Mountain,
  Bike,
  Bird,
  Flame,
  Waves,
  Car,
  Armchair,
  Coffee,
  ShieldPlus,
  BatteryCharging,
  Info,
  Navigation,
  Thermometer,
  PawPrint,
  Trees,
  Focus,
  Timer,
  User,
  Plane,
  Phone,
  CalendarDays,
  TrendingUp,
  Ruler,
} from "lucide-react";

/* ============================================================================
   PHOTOGRAPHY LOCATIONS — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   Single, self-contained, production-ready React component. No backend — all
   data below is realistic dummy content. Design language matches the rest of
   the Stream Side site: bg-slate-950 / slate-900 / slate-800 with a lime
   (#B7FF00) accent, mirroring the interaction language of PhotographyActivities
   (animated filter chips, AnimatePresence fade on category switch, drawer UX).
   ============================================================================ */

const ACCENT = "#B7FF00";

// ---------------------------------------------------------------------------
// SHARED IMAGE POOL — dummy photography, reused across locations
// ---------------------------------------------------------------------------

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=1200&q=80",
];

function imgs(...indices) {
  return indices.map((i) => IMAGE_POOL[i % IMAGE_POOL.length]);
}

// ---------------------------------------------------------------------------
// STATIC REFERENCE DATA
// ---------------------------------------------------------------------------

const CATEGORY_FILTERS = [
  { id: "All", icon: Aperture },
  { id: "Landscape", icon: Trees },
  { id: "Sunrise", icon: Sunrise },
  { id: "Sunset", icon: Sunset },
  { id: "Waterfalls", icon: Waves },
  { id: "Forest", icon: TreePine },
  { id: "Wildlife", icon: PawPrint },
  { id: "Night Sky", icon: Moon },
  { id: "Lake", icon: Waves },
  { id: "Camping", icon: Tent },
];

const TIMELINE_SLOTS = [
  "5 AM",
  "6 AM",
  "7 AM",
  "Golden Hour",
  "Morning",
  "Evening",
  "Blue Hour",
  "Night",
];

const DIFFICULTY_LEVELS = ["Easy", "Moderate", "Professional"];

const PHOTOGRAPHY_TYPES_LIST = [
  { id: "Landscape", icon: Trees },
  { id: "Portrait", icon: User },
  { id: "Drone", icon: Plane },
  { id: "Macro", icon: Focus },
  { id: "Wildlife", icon: PawPrint },
  { id: "Astrophotography", icon: Moon },
  { id: "Long Exposure", icon: Timer },
  { id: "Forest", icon: TreePine },
];

const FACILITIES_LIST = [
  { id: "Parking", icon: Car },
  { id: "Rest Area", icon: Armchair },
  { id: "Washroom", icon: Info },
  { id: "Cafe", icon: Coffee },
  { id: "Guide", icon: UserCheck },
  { id: "Camping", icon: Tent },
  { id: "View Point", icon: Mountain },
  { id: "First Aid", icon: ShieldPlus },
  { id: "Charging Point", icon: BatteryCharging },
];

const NEARBY_EXPERIENCES_LIST = [
  { id: "Camping", icon: Tent },
  { id: "Trekking", icon: Mountain },
  { id: "Bird Watching", icon: Bird },
  { id: "Cycling", icon: Bike },
  { id: "Stargazing", icon: Moon },
  { id: "Bonfire", icon: Flame },
];

// Camera + lens recommendations per category, mirroring PhotographyActivities.
const CAMERA_DB = {
  Landscape: {
    Sony: { camera: "Sony A7 IV", lens: "16-35mm f/2.8 GM" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 15-35mm f/2.8L" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 14-24mm f/2.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 10-24mm f/4" },
    DJI: { camera: "DJI Mini 4 Pro", lens: "Built-in 24mm equiv." },
  },
  Sunrise: {
    Sony: { camera: "Sony A7R V", lens: "FE 24-70mm f/2.8 GM II" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 24-70mm f/2.8L" },
    Nikon: { camera: "Nikon Z7 II", lens: "Z 24-70mm f/2.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 16-55mm f/2.8" },
    DJI: { camera: "DJI Mini 4 Pro", lens: "Built-in 24mm equiv." },
  },
  Sunset: {
    Sony: { camera: "Sony A7R V", lens: "FE 24-70mm f/2.8 GM II" },
    Canon: { camera: "Canon EOS R5", lens: "RF 24-70mm f/2.8L" },
    Nikon: { camera: "Nikon Z7 II", lens: "Z 24-70mm f/2.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 16-55mm f/2.8" },
    DJI: { camera: "DJI Mavic 3 Pro", lens: "Built-in 70mm equiv." },
  },
  Waterfalls: {
    Sony: { camera: "Sony A7 IV", lens: "FE 16-35mm f/4 + ND1000" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 16-35mm f/4L + ND1000" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 14-30mm f/4S + ND1000" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 10-24mm f/4 + ND1000" },
    DJI: { camera: "DJI Mini 4 Pro", lens: "Built-in ND filter set" },
  },
  Forest: {
    Sony: { camera: "Sony A7 IV", lens: "FE 24-105mm f/4 G" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 24-105mm f/4L" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 24-120mm f/4S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 18-55mm f/2.8-4" },
    DJI: { camera: "DJI Air 3", lens: "Built-in 24mm equiv." },
  },
  Wildlife: {
    Sony: { camera: "Sony A9 III", lens: "FE 200-600mm f/5.6-6.3" },
    Canon: { camera: "Canon EOS R5", lens: "RF 100-500mm f/4.5-7.1L" },
    Nikon: { camera: "Nikon Z8", lens: "Z 100-400mm f/4.5-5.6" },
    Fujifilm: { camera: "Fujifilm X-H2S", lens: "XF 150-600mm f/5.6-8" },
    DJI: { camera: "DJI Air 3", lens: "Built-in 70mm equiv." },
  },
  "Night Sky": {
    Sony: { camera: "Sony A7S III", lens: "FE 14mm f/1.8 GM" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 15-35mm f/2.8L" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 20mm f/1.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 8-16mm f/2.8" },
    DJI: { camera: "DJI Mavic 3 Pro", lens: "Built-in 24mm equiv." },
  },
  Lake: {
    Sony: { camera: "Sony A7 IV", lens: "FE 16-35mm f/2.8 GM + Polarizer" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 15-35mm f/2.8L + Polarizer" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 14-24mm f/2.8S + Polarizer" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 10-24mm f/4 + Polarizer" },
    DJI: { camera: "DJI Mini 4 Pro", lens: "Built-in 24mm equiv." },
  },
  Camping: {
    Sony: { camera: "Sony A7S III", lens: "FE 20mm f/1.8G" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 16mm f/2.8" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 20mm f/1.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 16mm f/1.4" },
    DJI: { camera: "DJI Osmo Pocket 3", lens: "Built-in fixed lens" },
  },
};

// ---------------------------------------------------------------------------
// DUMMY DATA — 10 realistic Yelagiri Hills photography locations
// ---------------------------------------------------------------------------

const LOCATIONS = [
  {
    id: "swamimalai-peak",
    name: "Swamimalai Peak",
    category: "Sunrise",
    description:
      "The highest point around Yelagiri, Swamimalai Peak rewards an early climb with a sea of clouds breaking over layered hills and a temple silhouette on the ridge.",
    heroImage: IMAGE_POOL[0],
    distance: "3.2 km",
    rating: 4.9,
    difficulty: "Moderate",
    bestTime: "5:45 AM - 6:45 AM",
    timelineHighlight: "Golden Hour",
    season: "Year-round",
    elevation: "4,338 ft",
    visitingHours: "5:00 AM - 6:00 PM",
    guideAvailable: true,
    parkingAvailable: true,
    weather: {
      temperature: "16°C",
      visibility: "9 km",
      fog: "Light",
      cloudCover: "25%",
      windSpeed: "14 km/h",
    },
    facilities: ["Parking", "Guide", "View Point", "First Aid"],
    photographyTypes: ["Landscape", "Drone", "Long Exposure"],
    equipment: ["Tripod", "Wide Lens", "ND Filter"],
    cameraSettings: {
      iso: "100 - 200",
      shutter: "1/250s",
      aperture: "f/8 - f/10",
      whiteBalance: "Daylight",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "Arrive 30 minutes before sunrise to catch the pre-dawn blue hour.",
      "Use the temple silhouette as a natural focal anchor in the frame.",
      "A graduated ND filter balances the bright sky against dark hills.",
    ],
    gallery: imgs(0, 4, 8, 11, 3, 6),
    nearbyExperiences: ["Trekking", "Camping", "Stargazing"],
    photoSpots: [
      { name: "Summit Ledge", image: IMAGE_POOL[0] },
      { name: "Temple Ridge", image: IMAGE_POOL[8] },
      { name: "East Cloud Deck", image: IMAGE_POOL[11] },
    ],
    coordinates: { lat: 12.6011, lng: 78.6412 },
    popularity: 92,
    bestMonth: "November",
    avgTemperature: "19°C",
  },
  {
    id: "nilavoor-lake",
    name: "Nilavoor Lake",
    category: "Lake",
    description:
      "A calm, tree-lined lake ideal for mirror reflections at first light. Boats and drifting mist give this spot a quiet, painterly character most mornings.",
    heroImage: IMAGE_POOL[8],
    distance: "1.8 km",
    rating: 4.6,
    difficulty: "Easy",
    bestTime: "6:00 AM - 8:00 AM",
    timelineHighlight: "Morning",
    season: "Oct - Feb",
    elevation: "3,970 ft",
    visitingHours: "6:00 AM - 7:00 PM",
    guideAvailable: false,
    parkingAvailable: true,
    weather: {
      temperature: "17°C",
      visibility: "8 km",
      fog: "Moderate",
      cloudCover: "20%",
      windSpeed: "8 km/h",
    },
    facilities: ["Parking", "Rest Area", "Cafe", "Washroom"],
    photographyTypes: ["Landscape", "Long Exposure"],
    equipment: ["Tripod", "Wide Lens", "Polarizer"],
    cameraSettings: {
      iso: "100 - 200",
      shutter: "1/125s",
      aperture: "f/8 - f/11",
      whiteBalance: "Daylight",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "Shoot low to the water line to maximise the reflection.",
      "A polarizer cuts glare and deepens the water's colour.",
      "Still mornings before 8 AM give the calmest water surface.",
    ],
    gallery: imgs(8, 2, 9, 5, 1, 12),
    nearbyExperiences: ["Cycling", "Bird Watching"],
    photoSpots: [
      { name: "Boat Jetty", image: IMAGE_POOL[8] },
      { name: "North Bank", image: IMAGE_POOL[2] },
      { name: "Reflection Point", image: IMAGE_POOL[9] },
    ],
    coordinates: { lat: 12.5885, lng: 78.6291 },
    popularity: 81,
    bestMonth: "December",
    avgTemperature: "20°C",
  },
  {
    id: "punganoor-lake",
    name: "Punganoor Lake",
    category: "Lake",
    description:
      "Yelagiri's largest lake, framed by hills on every side. Wide open water makes it a favourite for long-exposure sunsets and gentle evening light.",
    heroImage: IMAGE_POOL[9],
    distance: "2.4 km",
    rating: 4.7,
    difficulty: "Easy",
    bestTime: "5:30 PM - 6:30 PM",
    timelineHighlight: "Evening",
    season: "Year-round",
    elevation: "3,900 ft",
    visitingHours: "6:00 AM - 8:00 PM",
    guideAvailable: false,
    parkingAvailable: true,
    weather: {
      temperature: "19°C",
      visibility: "10 km",
      fog: "None",
      cloudCover: "15%",
      windSpeed: "10 km/h",
    },
    facilities: ["Parking", "Cafe", "Rest Area", "Washroom", "View Point"],
    photographyTypes: ["Landscape", "Long Exposure", "Portrait"],
    equipment: ["Tripod", "Wide Lens", "ND Filter"],
    cameraSettings: {
      iso: "100",
      shutter: "1/200s",
      aperture: "f/8",
      whiteBalance: "Daylight",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "The west bank gives the cleanest sunset-over-water composition.",
      "Bring a 6-stop ND for silky long exposures during golden hour.",
      "Paddle boats add a nice human-scale subject to wide shots.",
    ],
    gallery: imgs(9, 8, 6, 3, 10, 0),
    nearbyExperiences: ["Cycling", "Bonfire", "Camping"],
    photoSpots: [
      { name: "West Bank", image: IMAGE_POOL[9] },
      { name: "Boating Deck", image: IMAGE_POOL[6] },
      { name: "Hilltop Overlook", image: IMAGE_POOL[3] },
    ],
    coordinates: { lat: 12.5851, lng: 78.6354 },
    popularity: 88,
    bestMonth: "January",
    avgTemperature: "21°C",
  },
  {
    id: "jalagamparai-waterfalls",
    name: "Jalagamparai Waterfalls",
    category: "Waterfalls",
    description:
      "Yelagiri's tallest cascade, dropping through dense rock terraces. Mist and midday rainbows make this the region's signature long-exposure location.",
    heroImage: IMAGE_POOL[3],
    distance: "22 km",
    rating: 4.8,
    difficulty: "Professional",
    bestTime: "8:00 AM - 11:00 AM",
    timelineHighlight: "Morning",
    season: "Aug - Nov",
    elevation: "3,600 ft",
    visitingHours: "8:00 AM - 5:00 PM",
    guideAvailable: true,
    parkingAvailable: true,
    weather: {
      temperature: "21°C",
      visibility: "6 km",
      fog: "Light",
      cloudCover: "35%",
      windSpeed: "6 km/h",
    },
    facilities: ["Parking", "Guide", "First Aid", "Rest Area"],
    photographyTypes: ["Long Exposure", "Landscape", "Macro"],
    equipment: ["Tripod", "ND Filter", "Wide Lens", "Microfiber Cloth"],
    cameraSettings: {
      iso: "50 - 100",
      shutter: "1/2s - 2s",
      aperture: "f/11 - f/16",
      whiteBalance: "Daylight",
      focusMode: "Manual Focus",
    },
    photoTips: [
      "Attach an ND filter to slow the shutter for silky water.",
      "Shoot around midday for a natural rainbow forming in the spray.",
      "Keep a microfiber cloth handy — mist coats the lens fast.",
    ],
    gallery: imgs(3, 7, 1, 9, 4, 12, 6),
    nearbyExperiences: ["Trekking", "Camping"],
    photoSpots: [
      { name: "Base Pool", image: IMAGE_POOL[3] },
      { name: "Upper Ridge Trail", image: IMAGE_POOL[7] },
      { name: "Mist Ledge", image: IMAGE_POOL[1] },
    ],
    coordinates: { lat: 12.6532, lng: 78.5981 },
    popularity: 95,
    bestMonth: "September",
    avgTemperature: "22°C",
  },
  {
    id: "nature-park",
    name: "Nature Park",
    category: "Camping",
    description:
      "Rolling lawns and forest edges built for overnight stays — campfire glow, tents under open sky, and quiet hillside evenings define this spot.",
    heroImage: IMAGE_POOL[6],
    distance: "1.2 km",
    rating: 4.4,
    difficulty: "Easy",
    bestTime: "6:00 PM - 10:00 PM",
    timelineHighlight: "Night",
    season: "Oct - Feb",
    elevation: "4,100 ft",
    visitingHours: "9:00 AM - 10:00 PM",
    guideAvailable: true,
    parkingAvailable: true,
    weather: {
      temperature: "14°C",
      visibility: "9 km",
      fog: "Light",
      cloudCover: "10%",
      windSpeed: "11 km/h",
    },
    facilities: [
      "Parking",
      "Camping",
      "Washroom",
      "Cafe",
      "First Aid",
      "Charging Point",
    ],
    photographyTypes: ["Astrophotography", "Portrait", "Long Exposure"],
    equipment: ["Tripod", "Wide Lens", "Flashlight", "Battery Pack"],
    cameraSettings: {
      iso: "800 - 1600",
      shutter: "1/60s - 4s",
      aperture: "f/1.8 - f/4",
      whiteBalance: "Tungsten / Daylight",
      focusMode: "Manual Focus",
    },
    photoTips: [
      "Use warm campfire light as a natural key light for portraits.",
      "Silhouette tents against a starry sky for atmosphere.",
      "A small LED panel light-paints foreground subjects nicely.",
    ],
    gallery: imgs(6, 1, 13, 2, 9, 5),
    nearbyExperiences: ["Camping", "Stargazing", "Bonfire", "Trekking"],
    photoSpots: [
      { name: "Central Lawn", image: IMAGE_POOL[6] },
      { name: "Ridge Line Site", image: IMAGE_POOL[13] },
      { name: "Valley View Camp", image: IMAGE_POOL[2] },
    ],
    coordinates: { lat: 12.5977, lng: 78.6238 },
    popularity: 84,
    bestMonth: "December",
    avgTemperature: "18°C",
  },
  {
    id: "tea-estate",
    name: "Tea Estate",
    category: "Landscape",
    description:
      "Endless rows of tea shrubs climb the hillside in soft green terraces — one of the most reliable golden-hour landscapes in the region.",
    heroImage: IMAGE_POOL[4],
    distance: "5.6 km",
    rating: 4.7,
    difficulty: "Easy",
    bestTime: "4:00 PM - 6:00 PM",
    timelineHighlight: "Evening",
    season: "Year-round",
    elevation: "4,200 ft",
    visitingHours: "7:00 AM - 6:00 PM",
    guideAvailable: true,
    parkingAvailable: true,
    weather: {
      temperature: "18°C",
      visibility: "11 km",
      fog: "None",
      cloudCover: "18%",
      windSpeed: "9 km/h",
    },
    facilities: ["Parking", "Guide", "View Point", "Rest Area"],
    photographyTypes: ["Landscape", "Portrait", "Drone"],
    equipment: ["Mirrorless", "Tele Lens", "Wide Lens"],
    cameraSettings: {
      iso: "100 - 400",
      shutter: "1/200s",
      aperture: "f/4 - f/5.6",
      whiteBalance: "Auto",
      focusMode: "Eye AF",
    },
    photoTips: [
      "Use the tea rows as leading lines toward the ridge line.",
      "Position subjects with soft backlight for a gentle rim glow.",
      "A telephoto lens compresses the rows into dense green texture.",
    ],
    gallery: imgs(4, 0, 8, 6, 12, 3),
    nearbyExperiences: ["Cycling", "Trekking"],
    photoSpots: [
      { name: "Tea Estate Ridge", image: IMAGE_POOL[4] },
      { name: "Terrace Rows", image: IMAGE_POOL[0] },
      { name: "Estate Gate", image: IMAGE_POOL[6] },
    ],
    coordinates: { lat: 12.6102, lng: 78.6187 },
    popularity: 79,
    bestMonth: "October",
    avgTemperature: "20°C",
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    category: "Sunset",
    description:
      "A fragrant garden terrace overlooking the valley, best visited as the sun drops behind the hills and warm light spills across the rose beds.",
    heroImage: IMAGE_POOL[12],
    distance: "1.5 km",
    rating: 4.3,
    difficulty: "Easy",
    bestTime: "5:15 PM - 6:15 PM",
    timelineHighlight: "Evening",
    season: "Year-round",
    elevation: "4,050 ft",
    visitingHours: "8:00 AM - 6:30 PM",
    guideAvailable: false,
    parkingAvailable: true,
    weather: {
      temperature: "19°C",
      visibility: "10 km",
      fog: "None",
      cloudCover: "20%",
      windSpeed: "7 km/h",
    },
    facilities: ["Parking", "Washroom", "Rest Area", "View Point"],
    photographyTypes: ["Macro", "Portrait", "Landscape"],
    equipment: ["Mirrorless", "Macro Lens", "Reflector"],
    cameraSettings: {
      iso: "100 - 200",
      shutter: "1/320s",
      aperture: "f/2.8 - f/4",
      whiteBalance: "Auto",
      focusMode: "Eye / Macro AF",
    },
    photoTips: [
      "Shoot wide open for a soft, separated background blur.",
      "Backlit petals glow beautifully in the last hour of light.",
      "A small reflector fills shadows on close-up macro shots.",
    ],
    gallery: imgs(12, 4, 9, 8, 5, 0),
    nearbyExperiences: ["Cycling", "Bird Watching"],
    photoSpots: [
      { name: "Rose Terrace", image: IMAGE_POOL[12] },
      { name: "Valley Overlook", image: IMAGE_POOL[9] },
      { name: "Garden Gate", image: IMAGE_POOL[4] },
    ],
    coordinates: { lat: 12.5926, lng: 78.6301 },
    popularity: 72,
    bestMonth: "February",
    avgTemperature: "21°C",
  },
  {
    id: "mangalam-viewpoint",
    name: "Mangalam Viewpoint",
    category: "Night Sky",
    description:
      "Far from any streetlight, Mangalam opens onto a genuinely dark sky — the Milky Way, star trails and the occasional meteor are all visible to the eye.",
    heroImage: IMAGE_POOL[2],
    distance: "8.4 km",
    rating: 4.9,
    difficulty: "Professional",
    bestTime: "9:00 PM - 3:00 AM",
    timelineHighlight: "Night",
    season: "Mar - Jun",
    elevation: "4,410 ft",
    visitingHours: "6:00 PM - 4:00 AM (guided only)",
    guideAvailable: true,
    parkingAvailable: true,
    weather: {
      temperature: "12°C",
      visibility: "12 km",
      fog: "None",
      cloudCover: "8%",
      windSpeed: "15 km/h",
    },
    facilities: ["Parking", "Guide", "First Aid", "View Point"],
    photographyTypes: ["Astrophotography", "Long Exposure"],
    equipment: ["Mirrorless", "Wide Lens", "Tripod", "Flashlight"],
    cameraSettings: {
      iso: "3200 - 6400",
      shutter: "15s - 25s",
      aperture: "f/1.8 - f/2.8",
      whiteBalance: "Daylight / Custom Kelvin",
      focusMode: "Manual Focus (Infinity)",
    },
    photoTips: [
      "Use the 500 rule — 500 ÷ focal length — for your max shutter speed.",
      "Focus manually on a bright star using live-view zoom.",
      "Bring a red-light flashlight to preserve your night vision.",
    ],
    gallery: imgs(2, 14, 9, 6, 3, 13),
    nearbyExperiences: ["Stargazing", "Camping", "Trekking"],
    photoSpots: [
      { name: "Dark Sky Deck", image: IMAGE_POOL[2] },
      { name: "North Ridge", image: IMAGE_POOL[14] },
      { name: "Open Meadow", image: IMAGE_POOL[9] },
    ],
    coordinates: { lat: 12.6187, lng: 78.6455 },
    popularity: 90,
    bestMonth: "April",
    avgTemperature: "14°C",
  },
  {
    id: "reserve-forest",
    name: "Reserve Forest",
    category: "Forest",
    description:
      "Shaded canopy trails and misty pine groves running deep into the reserve — a layered, atmospheric location best explored slowly on foot.",
    heroImage: IMAGE_POOL[7],
    distance: "4.7 km",
    rating: 4.6,
    difficulty: "Moderate",
    bestTime: "7:00 AM - 10:00 AM",
    timelineHighlight: "Morning",
    season: "Jul - Oct",
    elevation: "4,000 ft",
    visitingHours: "6:30 AM - 5:30 PM",
    guideAvailable: true,
    parkingAvailable: true,
    weather: {
      temperature: "17°C",
      visibility: "5 km",
      fog: "Moderate",
      cloudCover: "40%",
      windSpeed: "5 km/h",
    },
    facilities: ["Parking", "Guide", "First Aid"],
    photographyTypes: ["Forest", "Wildlife", "Macro"],
    equipment: ["Mirrorless", "Wide Lens", "Tele Lens", "Polarizer"],
    cameraSettings: {
      iso: "200 - 800",
      shutter: "1/160s",
      aperture: "f/5.6 - f/8",
      whiteBalance: "Cloudy",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "Look for light shafts breaking through canopy after light rain.",
      "A polarizer cuts glare on wet leaves and boosts greens.",
      "Frame the trail leading into the shot for natural depth.",
    ],
    gallery: imgs(7, 1, 3, 13, 6, 9),
    nearbyExperiences: ["Trekking", "Bird Watching", "Camping"],
    photoSpots: [
      { name: "Canopy Trail", image: IMAGE_POOL[7] },
      { name: "Pine Grove", image: IMAGE_POOL[1] },
      { name: "Streamside Path", image: IMAGE_POOL[3] },
    ],
    coordinates: { lat: 12.6284, lng: 78.6079 },
    popularity: 77,
    bestMonth: "August",
    avgTemperature: "19°C",
  },
  {
    id: "valley-view-point",
    name: "Valley View Point",
    category: "Wildlife",
    description:
      "A wide ledge overlooking the forested valley floor, frequently visited by langurs and native birdlife — long lenses do well here at first and last light.",
    heroImage: IMAGE_POOL[11],
    distance: "6.1 km",
    rating: 4.5,
    difficulty: "Professional",
    bestTime: "5:00 AM - 7:00 AM",
    timelineHighlight: "5 AM",
    season: "Nov - Mar",
    elevation: "4,250 ft",
    visitingHours: "5:00 AM - 6:00 PM",
    guideAvailable: true,
    parkingAvailable: false,
    weather: {
      temperature: "13°C",
      visibility: "7 km",
      fog: "Light",
      cloudCover: "22%",
      windSpeed: "13 km/h",
    },
    facilities: ["Guide", "View Point", "First Aid"],
    photographyTypes: ["Wildlife", "Landscape", "Long Exposure"],
    equipment: ["DSLR", "Tele Lens", "Battery Pack", "Memory Card"],
    cameraSettings: {
      iso: "800 - 3200",
      shutter: "1/1000s",
      aperture: "f/5.6 - f/6.3",
      whiteBalance: "Auto",
      focusMode: "Continuous AF (Animal Eye)",
    },
    photoTips: [
      "Keep shutter speed above 1/1000s to freeze sudden movement.",
      "Pre-focus on likely perches to react faster to activity.",
      "Stay quiet and downwind — patience outperforms gear here.",
    ],
    gallery: imgs(11, 7, 10, 2, 1, 9),
    nearbyExperiences: ["Bird Watching", "Trekking"],
    photoSpots: [
      { name: "Main Ledge", image: IMAGE_POOL[11] },
      { name: "Langur Perch", image: IMAGE_POOL[7] },
      { name: "Valley Floor View", image: IMAGE_POOL[10] },
    ],
    coordinates: { lat: 12.5799, lng: 78.6503 },
    popularity: 74,
    bestMonth: "December",
    avgTemperature: "17°C",
  },
];

// ---------------------------------------------------------------------------
// SMALL SHARED COMPONENTS
// ---------------------------------------------------------------------------

function AnimatedCounter({ target, suffix = "", duration = 1.2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [rounded]);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, target, duration, count]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function FilterChip({ label, active, onClick, Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
        active
          ? "border-transparent text-slate-950"
          : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="location-filter-active"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: ACCENT }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <Icon
        className={`relative z-10 h-3.5 w-3.5 ${active ? "text-slate-950" : "text-slate-500"}`}
      />
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function DifficultyBar({ level }) {
  const activeIndex = DIFFICULTY_LEVELS.indexOf(level);
  return (
    <div>
      <div className="flex items-center gap-1.5">
        {DIFFICULTY_LEVELS.map((lvl, i) => (
          <div
            key={lvl}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: i <= activeIndex ? "100%" : "0%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
        {DIFFICULTY_LEVELS.map((lvl) => (
          <span key={lvl} className={lvl === level ? "text-white" : ""}>
            {lvl}
          </span>
        ))}
      </div>
    </div>
  );
}

function WeatherCard({ weather }) {
  const rows = [
    { icon: Thermometer, label: "Temperature", value: weather.temperature },
    { icon: Eye, label: "Visibility", value: weather.visibility },
    { icon: Cloud, label: "Fog Level", value: weather.fog },
    { icon: Cloud, label: "Cloud Cover", value: weather.cloudCover },
    { icon: Wind, label: "Wind Speed", value: weather.windSpeed },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
        Live Weather
      </span>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0 text-slate-400" />
            <div className="leading-tight">
              <div className="text-[11px] text-slate-400">{label}</div>
              <div className="text-xs font-semibold text-white">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BestTimeTimeline({ highlight }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
      {TIMELINE_SLOTS.map((slot) => {
        const active = slot === highlight;
        return (
          <div
            key={slot}
            className={`shrink-0 rounded-lg border px-3 py-2 text-[11px] font-semibold transition-colors ${
              active
                ? "border-transparent text-slate-950"
                : "border-white/10 bg-white/5 text-slate-400"
            }`}
            style={active ? { backgroundColor: ACCENT } : undefined}
          >
            {slot}
          </div>
        );
      })}
    </div>
  );
}

function PhotoTipCard({ tips }) {
  const [index, setIndex] = useState(0);
  const nextTip = useCallback(() => {
    setIndex((prev) => (prev + 1) % tips.length);
  }, [tips.length]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4" style={{ color: ACCENT }} />
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Photo Tip
        </span>
      </div>
      <div className="min-h-[44px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm leading-relaxed text-slate-200"
          >
            {tips[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={nextTip}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-80"
        style={{ color: ACCENT }}
      >
        Next Tip
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function PhotoSpotCard({ spot, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-28 w-36 shrink-0 overflow-hidden rounded-xl border text-left transition-colors ${
        active ? "border-[color:var(--accent)]" : "border-white/10"
      }`}
      style={active ? { borderColor: ACCENT } : undefined}
    >
      <img
        src={spot.image}
        alt={spot.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <span className="text-[11px] font-semibold leading-tight text-white">
          {spot.name}
        </span>
      </div>
      {active && (
        <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-950">
          <MapPin
            className="h-4 w-4 drop-shadow"
            style={{ color: ACCENT }}
            fill={ACCENT}
          />
        </div>
      )}
    </button>
  );
}

function GalleryTile({ src }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-white/10">
      <img
        src={src}
        alt="Location capture"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute right-1.5 top-1.5 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          aria-label="Like photo"
          onClick={() => setLiked((v) => !v)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
        >
          <Heart
            className="h-3.5 w-3.5"
            fill={liked ? ACCENT : "transparent"}
            style={{ color: liked ? ACCENT : "#fff" }}
          />
        </button>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
          <Maximize2 className="h-3.5 w-3.5 text-white" />
        </span>
      </div>
    </div>
  );
}

function IconInfoCard({ icon: Icon, label, active = true }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-colors ${
        active
          ? "border-white/10 bg-white/5"
          : "border-white/5 bg-white/[0.02] opacity-40"
      }`}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-full border"
        style={{
          borderColor: active ? `${ACCENT}55` : "rgba(255,255,255,0.1)",
        }}
      >
        <Icon
          className="h-4 w-4"
          style={{ color: active ? ACCENT : "#64748b" }}
        />
      </span>
      <span className="text-[11px] font-semibold leading-tight text-slate-200">
        {label}
      </span>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <Icon className="mb-2 h-4 w-4" style={{ color: ACCENT }} />
      <div className="text-lg font-bold text-white sm:text-xl">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-slate-400">
        {label}
      </div>
    </div>
  );
}

function MapPreviewCard({ location }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
      <div className="relative h-44 w-full bg-[radial-gradient(circle_at_30%_30%,rgba(183,255,0,0.12),transparent_55%),linear-gradient(135deg,#0f172a,#1e293b)]">
        {/* Decorative grid lines to suggest a static map */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="mapGrid"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-slate-950 shadow-lg"
            style={{ backgroundColor: ACCENT }}
          >
            <MapPin className="h-4.5 w-4.5 text-slate-950" />
          </span>
          <span
            className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full opacity-60"
            style={{ backgroundColor: ACCENT }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Coordinates
          </p>
          <p className="mt-0.5 text-sm font-semibold text-white">
            {location.coordinates.lat.toFixed(4)}° N,{" "}
            {location.coordinates.lng.toFixed(4)}° E
          </p>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          style={{ "--accent": ACCENT }}
        >
          <Navigation className="h-3.5 w-3.5" />
          View on Map
        </button>
      </div>
    </div>
  );
}

function CameraRecommendationTabs({ category, brand, onBrandChange }) {
  const brands = ["Sony", "Canon", "Nikon", "Fujifilm", "DJI"];
  const rec = CAMERA_DB[category]?.[brand];

  return (
    <div>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => onBrandChange(b)}
            aria-pressed={brand === b}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-colors ${
              brand === b
                ? "border-transparent text-slate-950"
                : "border-white/15 bg-white/5 text-slate-300"
            }`}
            style={brand === b ? { backgroundColor: ACCENT } : undefined}
          >
            {b}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {rec && (
          <motion.div
            key={brand}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-3 grid grid-cols-2 gap-2"
          >
            <div className="col-span-2 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Camera</span>
                <span className="font-semibold text-white">{rec.camera}</span>
              </div>
              <div className="mt-1.5 flex justify-between text-xs">
                <span className="text-slate-400">Lens</span>
                <span className="font-semibold text-white">{rec.lens}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CameraSettingsGrid({ settings }) {
  const rows = [
    { label: "ISO", value: settings.iso },
    { label: "Shutter Speed", value: settings.shutter },
    { label: "Aperture", value: settings.aperture },
    { label: "White Balance", value: settings.whiteBalance },
    { label: "Focus Mode", value: settings.focusMode },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-xl border border-white/10 bg-white/5 p-3"
        >
          <div className="text-[11px] text-slate-400">{label}</div>
          <div className="mt-0.5 text-xs font-semibold text-white">{value}</div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// LOCATION CARD (left-column, horizontally laid out: thumb + info)
// ---------------------------------------------------------------------------

function LocationCard({ location, active, onSelect, onViewDetails }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={active}
      onClick={() => onSelect(location)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(location);
        }
      }}
      className={`group relative flex h-32 w-full shrink-0 cursor-pointer overflow-hidden rounded-2xl border bg-slate-900 transition-colors duration-300 sm:h-36 ${
        active
          ? "border-[color:var(--accent)]"
          : "border-white/10 hover:border-white/25"
      }`}
      style={active ? { borderColor: ACCENT } : undefined}
    >
      {active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{ boxShadow: `0 0 0 1px ${ACCENT}66, 0 0 26px 0 ${ACCENT}33` }}
        />
      )}

      {/* Thumbnail */}
      <div className="relative w-28 shrink-0 overflow-hidden sm:w-36">
        <img
          src={location.heroImage}
          alt={location.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute left-2 top-2">
          <span
            className="inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-950"
            style={{ backgroundColor: ACCENT }}
          >
            {location.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-between p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex items-center gap-1 text-[11px] text-slate-400">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">{location.distance} away</span>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-white">
            <Star className="h-3 w-3 fill-current" style={{ color: ACCENT }} />
            {location.rating}
          </span>
        </div>

        <h3 className="truncate text-sm font-bold tracking-tight text-white sm:text-base">
          {location.name}
        </h3>

        <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-300">
          <span className="flex items-center gap-1">
            <Gauge className="h-3 w-3" style={{ color: ACCENT }} />
            {location.difficulty}
          </span>
          <span className="flex min-w-0 items-center gap-1">
            <Clock className="h-3 w-3 shrink-0" style={{ color: ACCENT }} />
            <span className="truncate">{location.bestTime}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(location);
          }}
          className="mt-1 inline-flex w-fit items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-bold text-slate-200 transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
          style={{ "--accent": ACCENT }}
        >
          View Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LIVE PREVIEW PANEL (now shown on every breakpoint — updates whenever a
// card is selected)
// ---------------------------------------------------------------------------

function LivePreviewPanel({ location, onViewDetails }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900"
      >
        <div className="relative h-56 w-full sm:h-64 lg:h-80">
          <img
            src={location.heroImage}
            alt={location.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950 sm:left-5 sm:top-5"
            style={{ backgroundColor: ACCENT }}
          >
            {location.category}
          </span>
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
            <h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
              {location.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Star
                  className="h-3.5 w-3.5 fill-current"
                  style={{ color: ACCENT }}
                />
                {location.rating}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> {location.distance}
              </span>
              <span className="flex items-center gap-1">
                <Ruler className="h-3.5 w-3.5" /> {location.elevation}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-4 sm:p-5 lg:p-6">
          <p className="text-sm leading-relaxed text-slate-300">
            {location.description}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              {
                icon: CalendarDays,
                label: "Best Season",
                value: location.season,
              },
              {
                icon: Clock,
                label: "Visiting Hours",
                value: location.visitingHours,
              },
              {
                icon: UserCheck,
                label: "Guide",
                value: location.guideAvailable ? "Available" : "Self-guided",
              },
              {
                icon: Car,
                label: "Parking",
                value: location.parkingAvailable
                  ? "Available"
                  : "Not available",
              },
              { icon: Ruler, label: "Elevation", value: location.elevation },
              { icon: Gauge, label: "Difficulty", value: location.difficulty },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <Icon className="mb-1.5 h-4 w-4" style={{ color: ACCENT }} />
                <div className="text-[11px] text-slate-400">{label}</div>
                <div className="truncate text-xs font-semibold text-white">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <WeatherCard weather={location.weather} />

          <button
            type="button"
            onClick={() => onViewDetails(location)}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-slate-950 transition-transform active:scale-[0.98]"
            style={{ backgroundColor: ACCENT }}
          >
            View Full Details
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// LOCATION DRAWER
// ---------------------------------------------------------------------------
// Positioned as a right-side panel from `lg` upward, and a bottom sheet below
// that — purely via responsive Tailwind classes, so the same component powers
// both the desktop "View Details" flow and the mobile "Cards → Bottom Drawer"
// requirement without duplicating markup.

function LocationDrawer({ location, onClose }) {
  const [brand, setBrand] = useState("Sony");
  const [activeSpot, setActiveSpot] = useState(0);

  useEffect(() => {
    setBrand("Sony");
    setActiveSpot(0);
  }, [location]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!location) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="drawer-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        key="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label={`${location.name} details`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed inset-x-0 bottom-0 z-[70] flex max-h-[88vh] flex-col overflow-hidden rounded-t-3xl border-t border-white/10 bg-slate-950 text-white lg:inset-y-0 lg:right-0 lg:left-auto lg:top-0 lg:h-full lg:max-h-none lg:w-[460px] lg:rounded-t-none lg:rounded-l-3xl lg:border-l lg:border-t-0"
      >
        <div className="flex-1 overflow-y-auto">
          {/* Header image */}
          <div className="relative h-56 shrink-0">
            <img
              src={location.heroImage}
              alt={location.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/20" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-black/70"
            >
              <X className="h-4 w-4 text-white" />
            </button>
            <span
              className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950"
              style={{ backgroundColor: ACCENT }}
            >
              {location.category}
            </span>
          </div>

          <div className="space-y-6 p-5">
            {/* Title + rating */}
            <div>
              <h2 className="text-xl font-bold text-white">{location.name}</h2>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {location.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Star
                    className="h-3.5 w-3.5 fill-current"
                    style={{ color: ACCENT }}
                  />
                  {location.rating}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {location.description}
              </p>
            </div>

            {/* Difficulty */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Difficulty
              </span>
              <div className="mt-2">
                <DifficultyBar level={location.difficulty} />
              </div>
            </div>

            {/* Timeline */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Best Time
              </span>
              <div className="mt-2">
                <BestTimeTimeline highlight={location.timelineHighlight} />
              </div>
            </div>

            {/* Camera settings */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Recommended Settings
              </span>
              <div className="mt-2">
                <CameraSettingsGrid settings={location.cameraSettings} />
              </div>
            </div>

            {/* Camera recommendation */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Camera Recommendation
              </span>
              <div className="mt-2">
                <CameraRecommendationTabs
                  category={location.category}
                  brand={brand}
                  onBrandChange={setBrand}
                />
              </div>
            </div>

            {/* Equipment */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Equipment
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {location.equipment.map((eq) => (
                  <span
                    key={eq}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-200"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Facilities
              </span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {FACILITIES_LIST.map((f) => (
                  <IconInfoCard
                    key={f.id}
                    icon={f.icon}
                    label={f.id}
                    active={location.facilities.includes(f.id)}
                  />
                ))}
              </div>
            </div>

            {/* Photo tips */}
            <PhotoTipCard tips={location.photoTips} />

            {/* Photo spots */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Photo Spots
              </span>
              <div className="mt-2 flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                {location.photoSpots.map((spot, i) => (
                  <PhotoSpotCard
                    key={spot.name}
                    spot={spot}
                    active={i === activeSpot}
                    onClick={() => setActiveSpot(i)}
                  />
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Photo Gallery
              </span>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {location.gallery.map((src, i) => (
                  <GalleryTile key={`${location.id}-${i}`} src={src} />
                ))}
              </div>
            </div>

            {/* Nearby experiences */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Nearby Experiences
              </span>
              <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {location.nearbyExperiences.map((exp) => {
                  const item = NEARBY_EXPERIENCES_LIST.find(
                    (n) => n.id === exp,
                  );
                  const Icon = item?.icon || Compass;
                  return (
                    <div
                      key={exp}
                      className="flex shrink-0 flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <Icon className="h-4 w-4" style={{ color: ACCENT }} />
                      <span className="whitespace-nowrap text-[10px] font-semibold text-slate-300">
                        {exp}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Book button */}
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-slate-950 transition-transform active:scale-[0.98]"
                style={{ backgroundColor: ACCENT }}
              >
                Book This Location
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3.5 text-sm font-bold text-slate-200 transition-colors hover:border-white/30"
              >
                <Phone className="h-4 w-4" />
                Contact Guide
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function PhotographyLocations() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
  const [drawerLocation, setDrawerLocation] = useState(null);
  const [brand, setBrand] = useState("Sony");
  const [activeSpot, setActiveSpot] = useState(0);

  const filteredLocations = useMemo(() => {
    if (activeFilter === "All") return LOCATIONS;
    return LOCATIONS.filter((l) => l.category === activeFilter);
  }, [activeFilter]);

  // Keep the selected / previewed location valid whenever the filter changes.
  useEffect(() => {
    if (filteredLocations.length === 0) return;
    if (!filteredLocations.find((l) => l.id === selectedLocation.id)) {
      setSelectedLocation(filteredLocations[0]);
    }
    setBrand("Sony");
    setActiveSpot(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilter]);

  const openDrawer = useCallback((location) => {
    setSelectedLocation(location);
    setDrawerLocation(location);
  }, []);
  const closeDrawer = useCallback(() => setDrawerLocation(null), []);

  useEffect(() => {
    document.body.style.overflow = drawerLocation ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerLocation]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-8 lg:px-16">
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>

      <div className="mx-auto max-w-7xl">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION HEADER                                                   */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8" style={{ backgroundColor: ACCENT }} />
              <span
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                Frame by frame
              </span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Photography Locations
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Discover the most breathtaking photography spots across Yelagiri
              Hills. Capture unforgettable moments from sunrise viewpoints,
              misty forests, waterfalls, lakes and dark sky locations.
            </p>
          </div>

          <button
            className="group flex shrink-0 items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            style={{ "--accent": ACCENT }}
          >
            Explore All Locations
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TOP FILTERS                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORY_FILTERS.map((cat) => (
            <FilterChip
              key={cat.id}
              label={cat.id}
              Icon={cat.icon}
              active={activeFilter === cat.id}
              onClick={() => setActiveFilter(cat.id)}
            />
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* MAIN LAYOUT — cards + live preview on every breakpoint. On       */}
        {/* mobile the preview stacks below the card list (single column);   */}
        {/* on desktop it sits alongside as a sticky right-hand panel.       */}
        {/* ---------------------------------------------------------------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-8"
          >
            {filteredLocations.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 py-20 text-center">
                <Info className="mx-auto mb-3 h-6 w-6 text-slate-500" />
                <p className="text-slate-300">
                  No locations found for this category yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                {/* Left: card list */}
                <div className="flex max-h-[640px] flex-col gap-3 overflow-y-auto pr-1 no-scrollbar lg:max-h-[760px]">
                  {filteredLocations.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      active={location.id === selectedLocation.id}
                      onSelect={setSelectedLocation}
                      onViewDetails={openDrawer}
                    />
                  ))}
                </div>

                {/* Right: live preview panel — visible on mobile too, stacked below the list */}
                <div className="block">
                  <div className="lg:sticky lg:top-8">
                    <LivePreviewPanel
                      location={selectedLocation}
                      onViewDetails={openDrawer}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ---------------------------------------------------------------- */}
        {/* DEEP-DIVE SECTIONS FOR THE SELECTED LOCATION                     */}
        {/* Now rendered on every breakpoint, with grids collapsing down to  */}
        {/* mobile-friendly column counts. Mobile users still also reach a   */}
        {/* focused version of this content via the Location Drawer.        */}
        {/* ---------------------------------------------------------------- */}
        {filteredLocations.length > 0 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLocation.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 space-y-14"
            >
              {/* Best Time */}
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Best Time to Shoot
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Recommended visiting window for {selectedLocation.name}.
                </p>
                <div className="mt-4">
                  <BestTimeTimeline
                    highlight={selectedLocation.timelineHighlight}
                  />
                </div>
              </div>

              {/* Photography types */}
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Photography Types
                </h3>
                <div className="mt-4 grid grid-cols-3 gap-3 xs:grid-cols-4 sm:grid-cols-8">
                  {PHOTOGRAPHY_TYPES_LIST.map((type) => (
                    <IconInfoCard
                      key={type.id}
                      icon={type.icon}
                      label={type.id}
                      active={selectedLocation.photographyTypes.includes(
                        type.id,
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Camera recommendations */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    Camera Recommendations
                  </h3>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CameraRecommendationTabs
                      category={selectedLocation.category}
                      brand={brand}
                      onBrandChange={setBrand}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    Recommended Settings
                  </h3>
                  <div className="mt-4">
                    <CameraSettingsGrid
                      settings={selectedLocation.cameraSettings}
                    />
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Facilities
                </h3>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
                  {FACILITIES_LIST.map((f) => (
                    <IconInfoCard
                      key={f.id}
                      icon={f.icon}
                      label={f.id}
                      active={selectedLocation.facilities.includes(f.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Photo tips + Photo spots */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">
                    Photo Tips
                  </h3>
                  <PhotoTipCard tips={selectedLocation.photoTips} />
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">
                    Photo Spots
                  </h3>
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                    {selectedLocation.photoSpots.map((spot, i) => (
                      <PhotoSpotCard
                        key={spot.name}
                        spot={spot}
                        active={i === activeSpot}
                        onClick={() => setActiveSpot(i)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Mini gallery */}
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Mini Gallery
                </h3>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {selectedLocation.gallery.map((src, i) => (
                    <GalleryTile
                      key={`${selectedLocation.id}-mini-${i}`}
                      src={src}
                    />
                  ))}
                </div>
              </div>

              {/* Nearby experiences */}
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Nearby Experiences
                </h3>
                <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                  {selectedLocation.nearbyExperiences.map((exp) => {
                    const item = NEARBY_EXPERIENCES_LIST.find(
                      (n) => n.id === exp,
                    );
                    const Icon = item?.icon || Compass;
                    return (
                      <div
                        key={exp}
                        className="flex shrink-0 flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4"
                      >
                        <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                        <span className="whitespace-nowrap text-xs font-semibold text-slate-300">
                          {exp}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location facts + Map preview */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">
                    Location Facts
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <StatCard
                      icon={Ruler}
                      label="Elevation"
                      value={selectedLocation.elevation}
                    />
                    <StatCard
                      icon={MapPin}
                      label="Distance"
                      value={selectedLocation.distance}
                    />
                    <StatCard
                      icon={Thermometer}
                      label="Avg. Temperature"
                      value={selectedLocation.avgTemperature}
                    />
                    <StatCard
                      icon={CalendarDays}
                      label="Best Month"
                      value={selectedLocation.bestMonth}
                    />
                    <StatCard
                      icon={Gauge}
                      label="Difficulty"
                      value={selectedLocation.difficulty}
                    />
                    <StatCard
                      icon={TrendingUp}
                      label="Popularity"
                      value={
                        <AnimatedCounter
                          target={selectedLocation.popularity}
                          suffix="%"
                        />
                      }
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-bold text-white sm:text-xl">
                    Map Preview
                  </h3>
                  <MapPreviewCard location={selectedLocation} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* BOTTOM CTA                                                       */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 text-center sm:p-14">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
            style={{ backgroundColor: ACCENT }}
          />
          <div className="relative">
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: ACCENT }}
            >
              Stream Side Photography
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Capture This Location?
            </h3>
            <p className="mt-3 text-sm text-slate-400 sm:text-base">
              Book Your Photography Experience Today
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-slate-950 transition-transform active:scale-[0.98] sm:w-auto"
                style={{ backgroundColor: ACCENT }}
              >
                Book Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-white/40 sm:w-auto"
              >
                <Phone className="h-4 w-4" />
                Contact Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Location drawer (View Details / mobile bottom drawer) */}
      <LocationDrawer location={drawerLocation} onClose={closeDrawer} />
    </section>
  );
}
