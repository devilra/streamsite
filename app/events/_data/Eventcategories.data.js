import {
  Telescope,
  Tent,
  Mountain,
  Trophy,
  Camera,
  Leaf,
  Users,
  PartyPopper,
  HeartPulse,
  Briefcase,
} from "lucide-react";

/**
 * Single source of truth for event categories.
 *
 * This is intentionally shaped like an API resource (id / title / description /
 * eventCount / upcomingCount / featured) so that swapping this static array for
 * a `fetch("/api/categories")` call later is a drop-in change — no JSX needs to
 * be touched.
 *
 * `icon` holds a component reference (not a string) so consumers can render it
 * directly as <category.icon />. If this ever comes from a real API, map the
 * returned icon *key* (e.g. "telescope") to a component via ICON_MAP below.
 */
export const EVENT_CATEGORIES = [
  {
    id: "stargazing",
    title: "Stargazing",
    tagline: "Yelagiri Hills, after dark",
    description:
      "Meteor showers, moon nights and guided telescope sessions far from city light.",
    icon: Telescope,
    image: "/images/categories/stargazing.jpg",
    eventCount: 12,
    upcomingCount: 8,
    featured: true,
  },
  {
    id: "camping",
    title: "Camping",
    tagline: "Nights under canvas",
    description:
      "Campfire evenings and overnight stays tucked into the hillside forest line.",
    icon: Tent,
    image: "/images/categories/camping.jpg",
    eventCount: 9,
    upcomingCount: 5,
    featured: false,
  },
  {
    id: "trekking",
    title: "Trekking",
    tagline: "Trails for every pace",
    description:
      "Sunrise summit hikes and easy forest trails guided by local trek leads.",
    icon: Mountain,
    image: "/images/categories/trekking.jpg",
    eventCount: 14,
    upcomingCount: 6,
    featured: false,
  },
  {
    id: "sports",
    title: "Sports",
    tagline: "Get the heart rate up",
    description:
      "Trail runs, cycling loops and pickup games for the competitive at heart.",
    icon: Trophy,
    image: "/images/categories/sports.jpg",
    eventCount: 7,
    upcomingCount: 3,
    featured: false,
  },
  {
    id: "photography",
    title: "Photography",
    tagline: "Golden hour, every time",
    description:
      "Landscape and astrophotography walks led by working photographers.",
    icon: Camera,
    image: "/images/categories/photography.jpg",
    eventCount: 6,
    upcomingCount: 4,
    featured: false,
  },
  {
    id: "eco-farming",
    title: "Eco & Farming",
    tagline: "Hands in the soil",
    description:
      "Farm-to-table mornings and sustainable living workshops on working farms.",
    icon: Leaf,
    image: "/images/categories/eco-farming.jpg",
    eventCount: 5,
    upcomingCount: 2,
    featured: false,
  },
  {
    id: "community",
    title: "Community",
    tagline: "Made for meeting people",
    description:
      "Potlucks, meetups and skill-shares built around the local outdoor crowd.",
    icon: Users,
    image: "/images/categories/community.jpg",
    eventCount: 10,
    upcomingCount: 5,
    featured: false,
  },
  {
    id: "festivals",
    title: "Festivals",
    tagline: "Bigger, louder, together",
    description:
      "Seasonal gatherings, music evenings and multi-day outdoor festivals.",
    icon: PartyPopper,
    image: "/images/categories/festivals.jpg",
    eventCount: 4,
    upcomingCount: 1,
    featured: false,
  },
  {
    id: "wellness",
    title: "Wellness",
    tagline: "Slow down on purpose",
    description:
      "Sunrise yoga, sound baths and breathwork sessions set in open air.",
    icon: HeartPulse,
    image: "/images/categories/wellness.jpg",
    eventCount: 8,
    upcomingCount: 4,
    featured: false,
  },
  {
    id: "corporate-schools",
    title: "Corporate & Schools",
    tagline: "Offsites that don't feel like offsites",
    description:
      "Team-building days and school outdoor-education programs, fully organised.",
    icon: Briefcase,
    image: "/images/categories/corporate-schools.jpg",
    eventCount: 6,
    upcomingCount: 3,
    featured: false,
  },
];

/** Virtual "All" entry used only by the filter bar — not a real category card. */
export const ALL_CATEGORIES_FILTER = {
  id: "all",
  title: "All",
};

/**
 * Mock recommendation payload. In production this would come from a
 * recommendation endpoint keyed off user interests / booking history /
 * viewed events — the shape below is deliberately what that response
 * would look like, so the component doesn't need to change when it's wired up.
 */
export const RECOMMENDED_FOR_YOU = {
  reason: "Because you enjoy outdoor adventures",
  categoryIds: ["trekking", "stargazing", "camping"],
};
