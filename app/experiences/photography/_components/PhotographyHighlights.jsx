"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import {
  Mountain,
  SunMedium,
  Sunrise,
  Sunset,
  PawPrint,
  TreePine,
  Waves,
  Moon,
  X,
  MapPin,
  Clock,
  Gauge,
  Camera,
  Aperture,
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";

/* ============================================================
   DATA — kept separate from render logic, easy to edit
   ============================================================ */

const HIGHLIGHTS = [
  {
    id: 1,
    title: "Landscape Photography",
    category: "Landscape",
    description: "Sweeping valley views layered across misty hills.",
    longDescription:
      "Frame the full drama of Yelagiri's terraced hills and lake basins. Wide, layered compositions reward patience — the best shots come together as morning mist lifts off the valley floor.",
    image: "/photography-highlights/landscape.jpg",
    icon: Mountain,
    bestTime: "6:00 AM - 8:00 AM",
    location: "Nilavoor Lake Viewpoint",
    difficulty: "Easy",
    camera: "Sony A7 IV",
    lens: "16-35mm f/2.8 GM",
    rating: 4.8,
    photoTips: [
      "Use a foreground rock or tree line to add depth.",
      "Shoot during the golden hour for warm directional light.",
      "Bracket exposures to hold detail in sky and shadow.",
    ],
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    id: 2,
    title: "Golden Hour",
    category: "Landscape",
    description: "Amber light spilling across the hills at first light.",
    longDescription:
      "The forty-five minutes after sunrise turn Yelagiri's ridgelines amber and rose. This is the most forgiving light of the day — soft, warm and directional, ideal for both landscapes and portraits.",
    image: "/photography-highlights/golden-hour.jpg",
    icon: SunMedium,
    bestTime: "5:40 PM - 6:15 PM",
    location: "Swamimalai Peak",
    difficulty: "Moderate",
    camera: "Canon EOS R6 II",
    lens: "RF 24-70mm f/2.8L",
    rating: 4.9,
    photoTips: [
      "Shoot into the light for silhouettes and lens flare.",
      "Side-light your subject to reveal texture in the hills.",
      "A lens hood helps control unwanted flare artifacts.",
    ],
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 3,
    title: "Sunrise Peaks",
    category: "Landscape",
    description: "First light breaking over cloud-wrapped summits.",
    longDescription:
      "Climb before dawn to catch the summit break through a sea of clouds. On clear mornings, the valley stays fogged in while the peak sits in full sun — a rare, dramatic contrast.",
    image: "/photography-highlights/sunrise-peaks.jpg",
    icon: Sunrise,
    bestTime: "5:30 AM - 6:30 AM",
    location: "Nature Park Viewpoint",
    difficulty: "Moderate",
    camera: "Nikon Z6 III",
    lens: "Z 14-24mm f/2.8S",
    rating: 4.9,
    photoTips: [
      "Arrive 30 minutes early to catch pre-dawn blue hour tones.",
      "A graduated ND filter balances bright sky and dark valley.",
      "Keep spare batteries warm — cold mornings drain them fast.",
    ],
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 4,
    title: "Sunset Views",
    category: "Landscape",
    description: "Warm gradients fading over the western ridgeline.",
    longDescription:
      "As the sun drops behind the western hills, the sky runs through amber, rose and deep violet. Wide aerial and ground-level compositions both work beautifully here.",
    image: "/photography-highlights/sunset-views.jpg",
    icon: Sunset,
    bestTime: "5:45 PM - 6:20 PM",
    location: "Valley View Aerial Point",
    difficulty: "Easy",
    camera: "Sony A7R V",
    lens: "FE 24-70mm f/2.8 GM II",
    rating: 4.7,
    photoTips: [
      "Underexpose slightly to saturate sunset colors.",
      "Include a silhouette subject for scale and interest.",
      "Stay 15 minutes after sunset for lingering blue hour color.",
    ],
    span: "lg:col-span-1 lg:row-span-2",
  },
  {
    id: 5,
    title: "Wildlife",
    category: "Wildlife",
    description: "Native birds and langurs across quiet forest trails.",
    longDescription:
      "Guided trails move slow and stay quiet, giving patient photographers a real shot at native birds, langurs and forest wildlife going about their morning routine.",
    image: "/photography-highlights/wildlife.jpg",
    icon: PawPrint,
    bestTime: "5:00 AM - 7:00 AM",
    location: "Yelagiri Reserve Forest",
    difficulty: "Professional",
    camera: "Sony A9 III",
    lens: "FE 200-600mm f/5.6-6.3",
    rating: 4.6,
    photoTips: [
      "Keep shutter speed above 1/1000s to freeze movement.",
      "Pre-focus on likely perches to react faster.",
      "Stay downwind and silent — patience beats gear here.",
    ],
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 6,
    title: "Forest Trails",
    category: "Travel",
    description: "Shaded canopy paths wrapped in morning mist.",
    longDescription:
      "Wander shaded pine groves and canopy trails for atmospheric, layered compositions. Light shafts break through the canopy best right after light rain.",
    image: "/photography-highlights/forest-trails.jpg",
    icon: TreePine,
    bestTime: "7:00 AM - 10:00 AM",
    location: "Reserve Forest Trail",
    difficulty: "Moderate",
    camera: "Fujifilm X-T5",
    lens: "XF 10-24mm f/4",
    rating: 4.6,
    photoTips: [
      "Look for light shafts after light rain.",
      "A polarizer cuts glare on wet leaves and boosts greens.",
      "Frame the trail leading into the shot for depth.",
    ],
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    id: 7,
    title: "Waterfalls",
    category: "Waterfall",
    description: "Silky long-exposure cascades through green ravines.",
    longDescription:
      "Jalagamparai's tallest cascade rewards a tripod and an ND filter with silky, long-exposure water and rainbow mist around midday sun.",
    image: "/photography-highlights/waterfalls.jpg",
    icon: Waves,
    bestTime: "8:00 AM - 11:00 AM",
    location: "Jalagamparai Waterfalls",
    difficulty: "Moderate",
    camera: "Canon EOS R6 II",
    lens: "RF 16-35mm f/4L + ND1000",
    rating: 4.7,
    photoTips: [
      "Attach an ND filter to slow shutter speed for silky water.",
      "Shoot near midday for a natural rainbow in the mist.",
      "Keep a microfiber cloth handy — spray coats the lens fast.",
    ],
    span: "lg:col-span-1 lg:row-span-1",
  },
  {
    id: 8,
    title: "Night Photography",
    category: "Night",
    description: "Milky Way and star trails over dark, quiet hills.",
    longDescription:
      "Far from city light pollution, Yelagiri's ridgelines open up to the Milky Way, star trails and the occasional meteor. A tripod and a fast wide lens are essential.",
    image: "/photography-highlights/night.jpg",
    icon: Moon,
    bestTime: "9:00 PM - 3:00 AM",
    location: "Mangalam Viewpoint",
    difficulty: "Professional",
    camera: "Sony A7S III",
    lens: "FE 14mm f/1.8 GM",
    rating: 4.9,
    photoTips: [
      "Use the 500 rule to avoid star trailing at your focal length.",
      "Focus manually on a bright star using live-view zoom.",
      "Bring a red-light flashlight to preserve night vision.",
    ],
    span: "lg:col-span-1 lg:row-span-1",
  },
];

const CAPTURE_TIMES = [
  { label: "Sunrise", time: "5:55 AM", icon: Sunrise },
  { label: "Sunset", time: "6:18 PM", icon: Sunset },
  { label: "Golden Hour", time: "5:40 PM", icon: SunMedium },
];

const SECTION_STATS = [
  { value: 15, suffix: "+", label: "Photography Spots" },
  { value: 2500, suffix: "+", label: "Captured Photos" },
  { value: 5, suffix: "★", label: "Rated Experience" },
  { value: 365, suffix: "", label: "Days Available" },
];

const PHOTO_CATEGORIES = [
  "Landscape",
  "Wildlife",
  "Portrait",
  "Drone",
  "Macro",
  "Night",
  "Travel",
  "Waterfall",
];

/* ============================================================
   SMALL PIECES (kept inside this file, not exported)
   ============================================================ */

function AnimatedNumber({ target, suffix = "", duration = 1.6 }) {
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

function HighlightCard({ highlight, onOpen, index }) {
  const Icon = highlight.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${highlight.title}`}
      onClick={() => onOpen(highlight)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(highlight);
        }
      }}
      className={`group relative min-h-[220px] overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl cursor-pointer transition-all duration-500 hover:border-lime-400/40 hover:shadow-[0_0_40px_rgba(163,230,53,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/70 ${highlight.span}`}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <img
          src={highlight.image}
          alt={highlight.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
      </div>

      {/* Category badge */}
      <span className="absolute top-3 left-3 z-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-lime-400">
        {highlight.category}
      </span>

      {/* Icon */}
      <span className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
        <Icon className="w-4 h-4 text-lime-400" />
      </span>

      {/* Rating */}
      <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-0.5 text-[11px] font-bold text-white">
        <Star className="w-3 h-3 fill-lime-400 text-lime-400" />
        {highlight.rating}
      </span>

      {/* Text content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-4">
        <h3 className="text-base sm:text-lg font-bold text-white leading-tight transition-colors duration-300 group-hover:text-lime-400">
          {highlight.title}
        </h3>
        <p className="mt-1 text-xs text-slate-300 leading-relaxed line-clamp-2">
          {highlight.description}
        </p>
      </div>
    </motion.div>
  );
}

function HighlightPopup({ highlight, onClose }) {
  useEffect(() => {
    if (!highlight) return;

    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [highlight, onClose]);

  if (!highlight) return null;
  const Icon = highlight.icon;

  return (
    <AnimatePresence>
      <motion.div
        key="popup-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          key="popup-card"
          role="dialog"
          aria-modal="true"
          aria-label={`${highlight.title} details`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-950 shadow-[0_0_60px_rgba(163,230,53,0.15)]"
        >
          {/* Image header */}
          <div className="relative h-64 sm:h-72">
            <img
              src={highlight.image}
              alt={highlight.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-black/20" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <span className="absolute bottom-4 left-4 rounded-full bg-lime-400/10 border border-lime-400/40 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-lime-400">
              {highlight.category}
            </span>
          </div>

          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-lime-400/10 border border-lime-400/40 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-lime-400" />
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {highlight.title}
                </h2>
              </div>
              <div className="mt-2 flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {highlight.location}
                </span>
                <span className="flex items-center gap-1 text-white font-semibold">
                  <Star className="w-3.5 h-3.5 fill-lime-400 text-lime-400" />
                  {highlight.rating}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                {highlight.longDescription}
              </p>
            </div>

            {/* Meta grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-3">
                <Clock className="w-4 h-4 text-lime-400 mb-1.5" />
                <div className="text-[11px] text-slate-400">Best Time</div>
                <div className="text-xs font-semibold text-white">
                  {highlight.bestTime}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-3">
                <Gauge className="w-4 h-4 text-lime-400 mb-1.5" />
                <div className="text-[11px] text-slate-400">Difficulty</div>
                <div className="text-xs font-semibold text-white">
                  {highlight.difficulty}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl p-3">
                <MapPin className="w-4 h-4 text-lime-400 mb-1.5" />
                <div className="text-[11px] text-slate-400">Location</div>
                <div className="text-xs font-semibold text-white truncate">
                  {highlight.location}
                </div>
              </div>
            </div>

            {/* Camera recommendation */}
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Camera Recommendation
              </span>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-lime-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Camera</div>
                    <div className="text-xs font-semibold text-white">
                      {highlight.camera}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Aperture className="w-4 h-4 text-lime-400 shrink-0" />
                  <div>
                    <div className="text-[11px] text-slate-400">Lens</div>
                    <div className="text-xs font-semibold text-white">
                      {highlight.lens}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo tips */}
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Photo Tips
                </span>
              </div>
              <ul className="space-y-2">
                {highlight.photoTips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2 text-sm text-slate-300 leading-relaxed"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-lime-400 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 py-3.5 text-sm font-bold text-slate-950 transition-transform active:scale-[0.98] hover:bg-lime-300"
            >
              Explore This Experience
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function PhotographyHighlights() {
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const openHighlight = (highlight) => setSelectedHighlight(highlight);
  const closeHighlight = () => setSelectedHighlight(null);

  return (
    <section className="relative w-full bg-slate-950 text-white py-16 sm:py-20 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-lime-400/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Floating capture-time card (top-right on desktop, stacked on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 w-full sm:w-72 lg:absolute lg:top-0 lg:right-4 lg:mb-0 lg:z-20 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Today&apos;s Best Capture Time
          </span>
          <div className="mt-3 space-y-2.5">
            {CAPTURE_TIMES.map(({ label, time, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-slate-300">
                  <Icon className="w-3.5 h-3.5 text-lime-400" />
                  {label}
                </span>
                <span className="text-xs font-bold text-white">{time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Section layout: left 40% / right 60% */}
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start lg:pt-24">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col"
          >
            <div className="inline-flex items-center gap-2 w-fit rounded-full border border-lime-400/40 bg-lime-400/10 px-4 py-1.5">
              <Camera className="w-3.5 h-3.5 text-lime-400" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-lime-400">
                Photography Highlights
              </span>
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white">
              Why Every Photographer Loves{" "}
              <span className="bg-gradient-to-r from-lime-400 to-emerald-300 bg-clip-text text-transparent">
                Stream Side
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-md">
              Discover breathtaking viewpoints, hidden waterfalls, misty
              forests, sunrise peaks and unforgettable photography moments
              across Yelagiri Hills.
            </p>

            {/* Photo categories */}
            <div className="mt-6 flex flex-wrap gap-2">
              {PHOTO_CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-3 py-1.5 text-[11px] font-semibold text-slate-300"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Quick stats preview */}
            <div className="mt-8 flex items-center gap-8">
              <div>
                <div className="text-2xl font-black text-lime-400">
                  <AnimatedNumber target={15} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Photography Spots
                </div>
              </div>
              <div className="pl-8 border-l border-white/10">
                <div className="text-2xl font-black text-lime-400">
                  <AnimatedNumber target={2500} suffix="+" />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  Captured Photos
                </div>
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="mt-8 inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-lime-300 hover:shadow-[0_0_40px_rgba(163,230,53,0.3)] active:scale-[0.98]"
            >
              Explore Photography Spots
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right column — bento grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:auto-rows-[170px] lg:grid-flow-dense">
            {HIGHLIGHTS.map((highlight, i) => (
              <HighlightCard
                key={highlight.id}
                highlight={highlight}
                index={i}
                onOpen={openHighlight}
              />
            ))}
          </div>
        </div>

        {/* Bottom stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {SECTION_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${
                  i !== 0 ? "lg:border-l lg:border-white/10" : ""
                }`}
              >
                <div className="text-2xl sm:text-3xl font-black text-lime-400">
                  <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-slate-400 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <HighlightPopup highlight={selectedHighlight} onClose={closeHighlight} />

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
