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
  Camera,
  Aperture,
  Move,
  ZoomIn,
  Maximize,
  SunMedium,
  Flashlight,
  MemoryStick,
  BatteryFull,
  MapPin,
  Star,
  Clock,
  Gauge,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Compass,
  Calendar,
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
  Info,
} from "lucide-react";

/* ============================================================
   DUMMY DATA — keep separate from UI
   ============================================================ */

const ACCENT = "#B7FF00";

const FILTERS = [
  "All",
  "Landscape",
  "Wildlife",
  "Portrait",
  "Sunrise",
  "Sunset",
  "Macro",
  "Forest",
  "Waterfalls",
  "Camping",
  "Night Sky",
];

const EQUIPMENT_ICON_MAP = {
  DSLR: Camera,
  Mirrorless: Aperture,
  Tripod: Move,
  "Wide Lens": Maximize,
  "Tele Lens": ZoomIn,
  "ND Filter": SunMedium,
  Flashlight: Flashlight,
  "Memory Card": MemoryStick,
  "Battery Pack": BatteryFull,
};

const CAMERA_DB = {
  Landscape: {
    Sony: { camera: "Sony A7 IV", lens: "16-35mm f/2.8 GM" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 15-35mm f/2.8L" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 14-24mm f/2.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 10-24mm f/4" },
    DJI: { camera: "DJI Mini 4 Pro", lens: "Built-in 24mm equiv." },
  },
  Wildlife: {
    Sony: { camera: "Sony A9 III", lens: "FE 200-600mm f/5.6-6.3" },
    Canon: { camera: "Canon EOS R5", lens: "RF 100-500mm f/4.5-7.1L" },
    Nikon: { camera: "Nikon Z8", lens: "Z 100-400mm f/4.5-5.6" },
    Fujifilm: { camera: "Fujifilm X-H2S", lens: "XF 150-600mm f/5.6-8" },
    DJI: { camera: "DJI Air 3", lens: "Built-in 70mm equiv." },
  },
  Sunrise: {
    Sony: { camera: "Sony A7R V", lens: "FE 24-70mm f/2.8 GM II" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 24-70mm f/2.8L" },
    Nikon: { camera: "Nikon Z7 II", lens: "Z 24-70mm f/2.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 16-55mm f/2.8" },
    DJI: { camera: "DJI Mini 4 Pro", lens: "Built-in 24mm equiv." },
  },
  "Night Sky": {
    Sony: { camera: "Sony A7S III", lens: "FE 14mm f/1.8 GM" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 15-35mm f/2.8L" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 20mm f/1.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 8-16mm f/2.8" },
    DJI: { camera: "DJI Mavic 3 Pro", lens: "Built-in 24mm equiv." },
  },
  Macro: {
    Sony: { camera: "Sony A7R V", lens: "FE 90mm f/2.8 Macro" },
    Canon: { camera: "Canon EOS R7", lens: "RF 100mm f/2.8L Macro" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z MC 105mm f/2.8" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 80mm f/2.8 Macro" },
    DJI: { camera: "DJI Osmo Pocket 3", lens: "Built-in fixed lens" },
  },
  Forest: {
    Sony: { camera: "Sony A7 IV", lens: "FE 24-105mm f/4 G" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 24-105mm f/4L" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 24-120mm f/4S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 18-55mm f/2.8-4" },
    DJI: { camera: "DJI Air 3", lens: "Built-in 24mm equiv." },
  },
  Waterfalls: {
    Sony: { camera: "Sony A7 IV", lens: "FE 16-35mm f/4 + ND1000" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 16-35mm f/4L + ND1000" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 14-30mm f/4S + ND1000" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 10-24mm f/4 + ND1000" },
    DJI: { camera: "DJI Mini 4 Pro", lens: "Built-in ND filter set" },
  },
  Camping: {
    Sony: { camera: "Sony A7S III", lens: "FE 20mm f/1.8G" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 16mm f/2.8" },
    Nikon: { camera: "Nikon Z6 III", lens: "Z 20mm f/1.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 16mm f/1.4" },
    DJI: { camera: "DJI Osmo Pocket 3", lens: "Built-in fixed lens" },
  },
  Portrait: {
    Sony: { camera: "Sony A7 IV", lens: "FE 85mm f/1.4 GM" },
    Canon: { camera: "Canon EOS R6 II", lens: "RF 85mm f/1.2L" },
    Nikon: { camera: "Nikon Z8", lens: "Z 85mm f/1.2S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 56mm f/1.2" },
    DJI: { camera: "DJI Osmo Pocket 3", lens: "Built-in fixed lens" },
  },
  Sunset: {
    Sony: { camera: "Sony A7R V", lens: "FE 24-70mm f/2.8 GM II" },
    Canon: { camera: "Canon EOS R5", lens: "RF 24-70mm f/2.8L" },
    Nikon: { camera: "Nikon Z7 II", lens: "Z 24-70mm f/2.8S" },
    Fujifilm: { camera: "Fujifilm X-T5", lens: "XF 16-55mm f/2.8" },
    DJI: { camera: "DJI Mavic 3 Pro", lens: "Built-in 70mm equiv." },
  },
};

const ACTIVITIES = [
  {
    id: 1,
    title: "Landscape Photography",
    category: "Landscape",
    location: "Nilavoor Lake Viewpoint",
    description:
      "Capture sweeping valley views, layered hills and mirror-still lake reflections across Yelagiri's most photogenic viewpoints.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.8,
    difficulty: "Easy",
    duration: "2-3 hrs",
    bestTime: "6AM - 8AM",
    season: "Oct - Feb",
    guideAvailable: true,
    equipment: ["DSLR", "Mirrorless", "Tripod", "Wide Lens", "Memory Card"],
    cameraSettings: {
      iso: "100 - 200",
      shutter: "1/125s",
      aperture: "f/8 - f/11",
      whiteBalance: "Daylight",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "Use a foreground element like rocks or trees to add depth.",
      "Shoot in the golden hour for warm, soft directional light.",
      "Bracket exposures for wide dynamic range across sky and valley.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Nilavoor Lake",
        image: "/photography-activities/spots/nilavoor.jpg",
      },
      {
        name: "Punganoor Lake",
        image: "/photography-activities/spots/punganoor.jpg",
      },
      {
        name: "Swamimalai Hills",
        image: "/photography-activities/spots/swamimalai.jpg",
      },
    ],
    suitableFor: ["Beginners", "Families", "Nature Lovers"],
  },
  {
    id: 2,
    title: "Wildlife Photography",
    category: "Wildlife",
    location: "Yelagiri Reserve Forest",
    description:
      "Track native birds, langurs and forest wildlife through guided trails built for patient, long-lens photography.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.6,
    difficulty: "Professional",
    duration: "4-5 hrs",
    bestTime: "5AM - 7AM",
    season: "Nov - Mar",
    guideAvailable: true,
    equipment: [
      "DSLR",
      "Mirrorless",
      "Tele Lens",
      "Memory Card",
      "Battery Pack",
    ],
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
      "Stay silent and downwind — patience outperforms gear here.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Reserve Forest Trail",
        image: "/photography-activities/spots/reserve-trail.jpg",
      },
      {
        name: "Jalagamparai Stream",
        image: "/photography-activities/spots/jalagamparai.jpg",
      },
      {
        name: "Mangalam Woods",
        image: "/photography-activities/spots/mangalam.jpg",
      },
    ],
    suitableFor: ["Enthusiasts", "Birders", "Professionals"],
  },
  {
    id: 3,
    title: "Golden Hour Photography",
    category: "Sunrise",
    location: "Swamimalai Peak",
    description:
      "Chase the first light over the hills as fog lifts off the valley in warm amber and rose-gold tones.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.9,
    difficulty: "Moderate",
    duration: "2 hrs",
    bestTime: "5:45AM - 6:45AM",
    season: "Year-round",
    guideAvailable: true,
    equipment: ["DSLR", "Mirrorless", "Tripod", "Wide Lens", "Battery Pack"],
    cameraSettings: {
      iso: "100 - 400",
      shutter: "1/250s",
      aperture: "f/8 - f/10",
      whiteBalance: "Daylight",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "Arrive 30 minutes early to catch pre-dawn blue hour color.",
      "Shoot into the light for silhouettes, or side-lit for texture.",
      "A graduated ND filter helps balance a bright sky and dark hills.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Swamimalai Peak",
        image: "/photography-activities/spots/swamimalai.jpg",
      },
      {
        name: "Nature Park Viewpoint",
        image: "/photography-activities/spots/naturepark.jpg",
      },
      {
        name: "Tea Estate Ridge",
        image: "/photography-activities/spots/tea-estate.jpg",
      },
    ],
    suitableFor: ["Couples", "Enthusiasts", "Beginners"],
  },
  {
    id: 4,
    title: "Night Sky Photography",
    category: "Night Sky",
    location: "Mangalam Viewpoint",
    description:
      "Escape city light pollution and capture the Milky Way, star trails and meteor showers over the dark hills.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.9,
    difficulty: "Professional",
    duration: "5-6 hrs (overnight)",
    bestTime: "9PM - 3AM",
    season: "Mar - Jun",
    guideAvailable: true,
    equipment: [
      "Mirrorless",
      "Tripod",
      "Wide Lens",
      "Flashlight",
      "Battery Pack",
    ],
    cameraSettings: {
      iso: "3200 - 6400",
      shutter: "15s - 25s",
      aperture: "f/1.8 - f/2.8",
      whiteBalance: "Daylight / Custom Kelvin",
      focusMode: "Manual Focus (Infinity)",
    },
    photoTips: [
      "Use the 500 rule: 500 ÷ focal length = max shutter speed before star trails.",
      "Focus manually on a bright star using live-view zoom.",
      "Bring a red-light flashlight to preserve night vision.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Mangalam Viewpoint",
        image: "/photography-activities/spots/mangalam.jpg",
      },
      {
        name: "Jalagamparai Ridge",
        image: "/photography-activities/spots/jalagamparai.jpg",
      },
      {
        name: "Punganoor Dark Sky Zone",
        image: "/photography-activities/spots/punganoor.jpg",
      },
    ],
    suitableFor: ["Professionals", "Astro Enthusiasts"],
  },
  {
    id: 5,
    title: "Macro Photography",
    category: "Macro",
    location: "Botanical Trail, Yelagiri",
    description:
      "Get up close with dew-laden petals, insects and textures hidden in Yelagiri's forest undergrowth.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.5,
    difficulty: "Moderate",
    duration: "2-3 hrs",
    bestTime: "7AM - 9AM",
    season: "Jun - Sep",
    guideAvailable: false,
    equipment: ["Mirrorless", "Tripod", "Flashlight", "Memory Card"],
    cameraSettings: {
      iso: "100 - 400",
      shutter: "1/200s",
      aperture: "f/11 - f/16",
      whiteBalance: "Daylight",
      focusMode: "Manual Focus + Focus Stacking",
    },
    photoTips: [
      "Shoot early morning for dew droplets on leaves and petals.",
      "Use focus stacking for greater depth of field at close range.",
      "A small reflector fills harsh shadows on tiny subjects.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Botanical Trail",
        image: "/photography-activities/spots/botanical.jpg",
      },
      {
        name: "Forest Nursery",
        image: "/photography-activities/spots/nursery.jpg",
      },
      {
        name: "Streamside Undergrowth",
        image: "/photography-activities/spots/streamside.jpg",
      },
    ],
    suitableFor: ["Hobbyists", "Nature Lovers"],
  },
  {
    id: 6,
    title: "Forest Photography",
    category: "Forest",
    location: "Yelagiri Reserve Forest Trail",
    description:
      "Wander shaded canopy trails and misty pine groves for atmospheric, layered forest compositions.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.6,
    difficulty: "Moderate",
    duration: "3 hrs",
    bestTime: "7AM - 10AM",
    season: "Jul - Oct",
    guideAvailable: true,
    equipment: ["DSLR", "Mirrorless", "Tripod", "Wide Lens", "Memory Card"],
    cameraSettings: {
      iso: "200 - 800",
      shutter: "1/160s",
      aperture: "f/5.6 - f/8",
      whiteBalance: "Cloudy",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "Look for light shafts breaking through canopy after light rain.",
      "Use a polarizer to cut glare on wet leaves and boost greens.",
      "Frame trails leading into the shot for natural depth.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Reserve Forest Trail",
        image: "/photography-activities/spots/reserve-trail.jpg",
      },
      {
        name: "Pine Grove",
        image: "/photography-activities/spots/pinegrove.jpg",
      },
      {
        name: "Mangalam Woods",
        image: "/photography-activities/spots/mangalam.jpg",
      },
    ],
    suitableFor: ["Families", "Nature Lovers", "Beginners"],
  },
  {
    id: 7,
    title: "Waterfall Photography",
    category: "Waterfalls",
    location: "Jalagamparai Waterfalls",
    description:
      "Capture silky long-exposure cascades and rainbow mist at Yelagiri's tallest waterfall.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.7,
    difficulty: "Moderate",
    duration: "3-4 hrs",
    bestTime: "8AM - 11AM",
    season: "Aug - Nov",
    guideAvailable: true,
    equipment: ["DSLR", "Mirrorless", "Tripod", "ND Filter", "Wide Lens"],
    cameraSettings: {
      iso: "50 - 100",
      shutter: "1/2s - 2s",
      aperture: "f/11 - f/16",
      whiteBalance: "Daylight",
      focusMode: "Manual Focus",
    },
    photoTips: [
      "Attach an ND filter to slow shutter speed for silky water.",
      "Shoot around midday for a natural rainbow in the mist.",
      "Keep a microfiber cloth handy — spray coats the lens fast.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Jalagamparai Waterfalls",
        image: "/photography-activities/spots/jalagamparai.jpg",
      },
      {
        name: "Base Pool Viewpoint",
        image: "/photography-activities/spots/basepool.jpg",
      },
      {
        name: "Upper Ridge Trail",
        image: "/photography-activities/spots/upperridge.jpg",
      },
    ],
    suitableFor: ["Enthusiasts", "Adventure Seekers"],
  },
  {
    id: 8,
    title: "Camping Photography",
    category: "Camping",
    location: "Nature Park Campgrounds",
    description:
      "Document campfire glow, star-strung tents and quiet hillside evenings under open sky.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.4,
    difficulty: "Easy",
    duration: "Overnight",
    bestTime: "6PM - 10PM",
    season: "Oct - Feb",
    guideAvailable: true,
    equipment: [
      "Mirrorless",
      "Tripod",
      "Wide Lens",
      "Flashlight",
      "Battery Pack",
    ],
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
      "A small LED panel helps light-paint foreground subjects.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Nature Park Campgrounds",
        image: "/photography-activities/spots/naturepark.jpg",
      },
      {
        name: "Valley View Camp",
        image: "/photography-activities/spots/valleyview.jpg",
      },
      {
        name: "Ridge Line Site",
        image: "/photography-activities/spots/ridgeline.jpg",
      },
    ],
    suitableFor: ["Groups", "Friends", "Adventure Seekers"],
  },
  {
    id: 9,
    title: "Portrait Photography",
    category: "Portrait",
    location: "Tea Estate & Rose Garden",
    description:
      "Frame natural-light portraits against rolling tea estates and fragrant garden backdrops.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.7,
    difficulty: "Easy",
    duration: "2 hrs",
    bestTime: "4PM - 6PM",
    season: "Year-round",
    guideAvailable: true,
    equipment: ["DSLR", "Mirrorless", "Tele Lens", "Memory Card"],
    cameraSettings: {
      iso: "100 - 400",
      shutter: "1/200s",
      aperture: "f/1.8 - f/2.8",
      whiteBalance: "Auto",
      focusMode: "Eye AF",
    },
    photoTips: [
      "Position subjects with soft backlight for a gentle rim glow.",
      "Use the tea rows as leading lines toward your subject.",
      "Shoot wide open for a creamy, separated background blur.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Tea Estate Ridge",
        image: "/photography-activities/spots/tea-estate.jpg",
      },
      {
        name: "Rose Garden",
        image: "/photography-activities/spots/rosegarden.jpg",
      },
      {
        name: "Nature Park Lawns",
        image: "/photography-activities/spots/naturepark.jpg",
      },
    ],
    suitableFor: ["Couples", "Families", "Solo Travelers"],
  },
  {
    id: 10,
    title: "Drone Photography",
    category: "Sunset",
    location: "Valley View Aerial Point",
    description:
      "Rise above the hills for sweeping aerial sunset shots over lakes, tea rows and winding ghat roads.",
    image:
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
    rating: 4.8,
    difficulty: "Professional",
    duration: "1.5-2 hrs",
    bestTime: "5:30PM - 6:30PM",
    season: "Year-round",
    guideAvailable: true,
    equipment: ["Mirrorless", "Memory Card", "Battery Pack"],
    cameraSettings: {
      iso: "100 - 200",
      shutter: "1/500s",
      aperture: "f/4 - f/5.6",
      whiteBalance: "Auto",
      focusMode: "Single-Point AF",
    },
    photoTips: [
      "Check local drone flight regulations before takeoff.",
      "Fly during calm wind windows, typically just after sunset light peaks.",
      "Use bracketed exposures to recover both sky and shadow detail.",
    ],
    gallery: [
      "https://i0.wp.com/nightscapephotographer.com/wp-content/uploads/2018/10/holyhillprint-edit.jpg?fit=2048%2C1448&ssl=1",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdlSXEn9W5ifolWOok9Out1GHaTUoNymkX_4FqhImaZxHP75nfgddAGD7k&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtoE4YGmQBgfTZNMr6eTwBL0uQ5czuukUpdv8NeqwyAsLktcj7Ch6CeTJp&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3swTOJjEkcD-YkySQhY8uPBBfdpTSF-hzlBqS4T-KP55SyvJWCWliu-U&s=10",
    ],
    photoSpots: [
      {
        name: "Valley View Aerial Point",
        image: "/photography-activities/spots/valleyview.jpg",
      },
      {
        name: "Punganoor Lake",
        image: "/photography-activities/spots/punganoor.jpg",
      },
      {
        name: "Ghat Road Bends",
        image: "/photography-activities/spots/ghatroad.jpg",
      },
    ],
    suitableFor: ["Professionals", "Content Creators"],
  },
];

const TIMELINE_SLOTS = [
  "5AM",
  "6AM",
  "7AM",
  "8AM",
  "Golden Hour",
  "Blue Hour",
  "Night",
];

const DIFFICULTY_LEVELS = ["Easy", "Moderate", "Professional"];

const CONDITIONS = {
  fog: "Light",
  visibility: "8 km",
  clouds: "20%",
  wind: "12 km/h",
  sunrise: "6:02 AM",
  sunset: "6:18 PM",
};

const RELATED_EXPERIENCES = [
  { label: "Camping", icon: Tent },
  { label: "Stargazing", icon: Moon },
  { label: "Trekking", icon: Mountain },
  { label: "Cycling", icon: Bike },
  { label: "Bird Watching", icon: Bird },
];

/* ============================================================
   SMALL REUSABLE COMPONENTS
   ============================================================ */

function AnimatedCounter({ target, suffix = "", duration = 1.4 }) {
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

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative shrink-0 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 border ${
        active
          ? "text-slate-950 border-transparent"
          : "text-slate-300 border-white/15 bg-white/5 hover:bg-white/10 hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-chip-active"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: ACCENT }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
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
            className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: i <= activeIndex ? "100%" : "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="h-full rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-slate-400 font-medium">
        {DIFFICULTY_LEVELS.map((lvl) => (
          <span key={lvl} className={lvl === level ? "text-white" : ""}>
            {lvl}
          </span>
        ))}
      </div>
    </div>
  );
}

function EquipmentCard({ name }) {
  const Icon = EQUIPMENT_ICON_MAP[name] || Camera;
  return (
    <div className="group relative flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-center hover:border-[color:var(--accent)]/50 transition-colors">
      <span
        className="w-9 h-9 rounded-full border flex items-center justify-center"
        style={{ borderColor: `${ACCENT}55` }}
      >
        <Icon className="w-4 h-4" style={{ color: ACCENT }} />
      </span>
      <span className="text-[11px] font-semibold text-slate-200 leading-tight">
        {name}
      </span>
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 border border-white/10 px-2 py-1 text-[10px] text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
        {name}
      </span>
    </div>
  );
}

function BestTimeTimeline({ bestTime }) {
  const isMatch = (slot) =>
    bestTime?.toLowerCase().includes(slot.toLowerCase());
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {TIMELINE_SLOTS.map((slot) => {
        const active = isMatch(slot);
        return (
          <div
            key={slot}
            className={`shrink-0 rounded-lg px-3 py-2 text-[11px] font-semibold border transition-colors ${
              active
                ? "text-slate-950 border-transparent"
                : "text-slate-400 border-white/10 bg-white/5"
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

function TipCard({ tips }) {
  const [index, setIndex] = useState(0);
  const nextTip = useCallback(() => {
    setIndex((prev) => (prev + 1) % tips.length);
  }, [tips.length]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
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
            className="text-sm text-slate-200 leading-relaxed"
          >
            {tips[index]}
          </motion.p>
        </AnimatePresence>
      </div>
      <button
        type="button"
        onClick={nextTip}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold hover:opacity-80 transition-opacity"
        style={{ color: ACCENT }}
      >
        Next Tip
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function ConditionsCard() {
  const rows = [
    { icon: Cloud, label: "Fog", value: CONDITIONS.fog },
    { icon: Eye, label: "Visibility", value: CONDITIONS.visibility },
    { icon: Cloud, label: "Clouds", value: CONDITIONS.clouds },
    { icon: Wind, label: "Wind", value: CONDITIONS.wind },
    { icon: Sunrise, label: "Sunrise", value: CONDITIONS.sunrise },
    { icon: Sunset, label: "Sunset", value: CONDITIONS.sunset },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
        Today&apos;s Conditions
      </span>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-slate-400 shrink-0" />
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

function PhotoSpotCard({ spot }) {
  return (
    <div className="group relative h-28 rounded-xl overflow-hidden border border-white/10 shrink-0 w-36">
      <img
        src={spot.image}
        alt={spot.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <span className="text-[11px] font-semibold text-white leading-tight">
          {spot.name}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
        <MapPin className="w-5 h-5" style={{ color: ACCENT }} />
      </div>
    </div>
  );
}

function GalleryTile({ src }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group relative aspect-square rounded-lg overflow-hidden border border-white/10">
      <img
        src={src}
        alt="Visitor capture"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
      <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          aria-label="Like photo"
          onClick={() => setLiked((v) => !v)}
          className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart
            className="w-3.5 h-3.5"
            fill={liked ? ACCENT : "transparent"}
            style={{ color: liked ? ACCENT : "#fff" }}
          />
        </button>
        <button
          type="button"
          aria-label="View fullscreen"
          className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center"
        >
          <Maximize2 className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   ACTIVITY CARD — testimonial-style horizontal layout
   (left: auto-cycling photo strip, right: activity details)
   ============================================================ */

function ActivityCard({ activity, onOpen, index }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images =
    activity.gallery && activity.gallery.length > 0
      ? activity.gallery
      : [activity.image];

  // Auto-cycle the left-side photo strip, same pattern as the testimonials card
  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${activity.title}`}
      onClick={() => onOpen(activity)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(activity);
        }
      }}
      className="group relative snap-start shrink-0 w-80 sm:w-[22rem] h-40 sm:h-44 rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-lg flex cursor-pointer transition-colors duration-300 hover:border-[color:var(--accent)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--tw-ring-color]"
      style={{ "--tw-ring-color": ACCENT }}
    >
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}66, 0 0 24px 0 ${ACCENT}33` }}
      />

      {/* LEFT: auto-cycling photo strip */}
      <div className="relative w-28 sm:w-32 h-full shrink-0 overflow-hidden bg-slate-800">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={activity.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              i === imgIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* category chip */}
        <div className="absolute top-2 left-2">
          <span
            className="inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-950"
            style={{ backgroundColor: ACCENT }}
          >
            {activity.category}
          </span>
        </div>

        {/* bottom fade so dots stay legible */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* image position dots */}
        {images.length > 1 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={
                  i === imgIndex
                    ? { width: "12px", backgroundColor: ACCENT }
                    : { width: "4px", backgroundColor: "rgba(255,255,255,0.5)" }
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: content */}
      <div className="relative z-10 flex-1 min-w-0 p-3 flex flex-col justify-between">
        {/* Top row: location + rating */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 min-w-0">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{activity.location}</span>
          </div>
          <span className="flex items-center gap-1 shrink-0 text-[11px] font-bold text-white">
            <Star className="w-3 h-3 fill-current" style={{ color: ACCENT }} />
            {activity.rating}
          </span>
        </div>

        {/* Middle: title + description */}
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-white leading-snug line-clamp-1 tracking-tight">
            {activity.title}
          </h3>
          <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
            {activity.description}
          </p>
        </div>

        {/* Bottom row: quick stats */}
        <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-300 min-w-0">
          <span className="flex items-center gap-1 shrink-0">
            <Gauge className="w-3 h-3" style={{ color: ACCENT }} />
            {activity.difficulty}
          </span>
          <span className="flex items-center gap-1 shrink-0">
            <Clock className="w-3 h-3" style={{ color: ACCENT }} />
            {activity.duration}
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <Sunrise className="w-3 h-3 shrink-0" style={{ color: ACCENT }} />
            <span className="truncate">{activity.bestTime}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DRAWER
   ============================================================ */

function ActivityDrawer({ activity, onClose }) {
  const [brand, setBrand] = useState("Sony");
  const brands = ["Sony", "Canon", "Nikon", "Fujifilm", "DJI"];

  useEffect(() => {
    setBrand("Sony");
  }, [activity]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!activity) return null;

  const rec = CAMERA_DB[activity.category]?.[brand];

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        key="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${activity.title} details`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed top-0 right-0 z-[70] h-full w-full sm:w-[440px] lg:w-[480px] overflow-y-auto bg-slate-950 border-l border-white/10 text-white"
      >
        {/* Header image */}
        <div className="relative h-56 shrink-0">
          <img
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/20" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <span
            className="absolute bottom-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950"
            style={{ backgroundColor: ACCENT }}
          >
            {activity.category}
          </span>
        </div>

        <div className="p-5 space-y-6">
          {/* Title + rating */}
          <div>
            <h2 className="text-xl font-bold text-white">{activity.title}</h2>
            <div className="mt-1 flex items-center gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {activity.location}
              </span>
              <span className="flex items-center gap-1">
                <Star
                  className="w-3.5 h-3.5 fill-current"
                  style={{ color: ACCENT }}
                />
                {activity.rating}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {activity.description}
            </p>
          </div>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Clock, label: "Duration", value: activity.duration },
              { icon: Sunrise, label: "Best Time", value: activity.bestTime },
              { icon: Calendar, label: "Season", value: activity.season },
              {
                icon: UserCheck,
                label: "Guide",
                value: activity.guideAvailable ? "Available" : "Self-guided",
              },
              {
                icon: Compass,
                label: "Photo Spots",
                value: `${activity.photoSpots.length} Locations`,
              },
              {
                icon: Users,
                label: "Suitable For",
                value: activity.suitableFor[0],
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <Icon className="w-4 h-4 mb-1.5" style={{ color: ACCENT }} />
                <div className="text-[11px] text-slate-400">{label}</div>
                <div className="text-xs font-semibold text-white">{value}</div>
              </div>
            ))}
          </div>

          {/* Difficulty */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Difficulty
            </span>
            <div className="mt-2">
              <DifficultyBar level={activity.difficulty} />
            </div>
          </div>

          {/* Best time timeline */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Best Time
            </span>
            <div className="mt-2">
              <BestTimeTimeline bestTime={activity.bestTime} />
            </div>
          </div>

          {/* Equipment */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Equipment Needed
            </span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {activity.equipment.map((eq) => (
                <EquipmentCard key={eq} name={eq} />
              ))}
            </div>
          </div>

          {/* Camera recommendation tabs */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Camera Recommendation
            </span>
            <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              {brands.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBrand(b)}
                  aria-pressed={brand === b}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors border ${
                    brand === b
                      ? "text-slate-950 border-transparent"
                      : "text-slate-300 border-white/15 bg-white/5"
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
                  className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 space-y-1.5"
                >
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Camera</span>
                    <span className="font-semibold text-white">
                      {rec.camera}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Lens</span>
                    <span className="font-semibold text-white">{rec.lens}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Camera settings */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Recommended Settings
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[
                { label: "ISO", value: activity.cameraSettings.iso },
                {
                  label: "Shutter Speed",
                  value: activity.cameraSettings.shutter,
                },
                { label: "Aperture", value: activity.cameraSettings.aperture },
                {
                  label: "White Balance",
                  value: activity.cameraSettings.whiteBalance,
                },
                {
                  label: "Focus Mode",
                  value: activity.cameraSettings.focusMode,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="text-[11px] text-slate-400">{label}</div>
                  <div className="text-xs font-semibold text-white mt-0.5">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo tips */}
          <TipCard tips={activity.photoTips} />

          {/* Today's conditions */}
          <ConditionsCard />

          {/* Photo spots */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Photo Spots
            </span>
            <div className="mt-2 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
              {activity.photoSpots.map((spot) => (
                <PhotoSpotCard key={spot.name} spot={spot} />
              ))}
            </div>
          </div>

          {/* Visitor gallery */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Visitor Gallery
            </span>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {activity.gallery.map((src) => (
                <GalleryTile key={src} src={src} />
              ))}
            </div>
          </div>

          {/* Related experiences */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Related Experiences
            </span>
            <div className="mt-2 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {RELATED_EXPERIENCES.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="shrink-0 flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <Icon className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="text-[10px] font-semibold text-slate-300 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Book button */}
          <button
            type="button"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-slate-950 transition-transform active:scale-[0.98]"
            style={{ backgroundColor: ACCENT }}
          >
            Book Experience
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function PhotographyActivities() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const scrollRef = useRef(null);

  const filteredActivities = useMemo(() => {
    if (activeFilter === "All") return ACTIVITIES;
    return ACTIVITIES.filter((a) => a.category === activeFilter);
  }, [activeFilter]);

  const scrollByCards = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 320;
    el.scrollBy({ left: direction * (cardWidth + 16), behavior: "smooth" });
  }, []);

  const openActivity = useCallback(
    (activity) => setSelectedActivity(activity),
    [],
  );
  const closeActivity = useCallback(() => setSelectedActivity(null), []);

  useEffect(() => {
    document.body.style.overflow = selectedActivity ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedActivity]);

  return (
    <section className="relative w-full bg-slate-950 pt-15 md:pt-12 lg:pt-0 text-white  overflow-hidden">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20"
        // style={{ backgroundColor: ACCENT }}
      />

      <div className="relative  px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl  leading-[1.05] tracking-tight">
            Choose Your Photography Adventure
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
            Explore beautiful photography experiences across Yelagiri Hills,
            from sunrise landscapes to wildlife and night photography.
          </p>
        </motion.div>

        {/* Desktop counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="hidden lg:flex items-center gap-10 mt-8"
        >
          {[
            { target: 18, suffix: "+", label: "Activities" },
            { target: 2500, suffix: "+", label: "Captured Moments" },
            { target: 15, suffix: "+", label: "Photography Spots" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={i !== 0 ? "pl-10 border-l border-white/10" : ""}
            >
              <div className="text-3xl font-black" style={{ color: ACCENT }}>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter chips */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {FILTERS.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              active={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>

        {/* Carousel controls + track */}
        <div className="relative mt-6">
          {/* Left Fade */}
          <div className="pointer-events-none absolute -left-11 md:-left-10 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />

          {/* Right Fade */}
          <div className="pointer-events-none absolute -right-11 md:-right-10 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-slate-950 via-slate-950/90 to-transparent" />
          <div className="hidden sm:flex items-center justify-end gap-2 mb-3">
            {/* <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByCards(-1)}
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByCards(1)}
              className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button> */}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={scrollRef}
              className="flex gap-4 overflow-x-scroll no-scrollbar pb-4 snap-x snap-mandatory touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {filteredActivities.map((activity, i) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  index={i}
                  onOpen={openActivity}
                />
              ))}
              {filteredActivities.length === 0 && (
                <div className="w-full py-16 text-center text-slate-400 text-sm">
                  <Info className="w-5 h-5 mx-auto mb-2" />
                  No activities found for this filter.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ActivityDrawer activity={selectedActivity} onClose={closeActivity} />

      <style jsx global>{`
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .no-scrollbar::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
          background: transparent;
        }
      `}</style>
    </section>
  );
}
