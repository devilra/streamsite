"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Clock,
  Gauge,
  Sunrise,
  TreePine,
  Droplet,
  Mountain,
  Compass,
  Bird,
} from "lucide-react";

/* ==================================================
   DATA — fully dynamic. Pass a `treks` prop with this
   shape to override, or add more entries below.
   Each card is a different TYPE of trekking experience,
   not just repeats of one trail.
   ================================================== */

const defaultTreks = [
  {
    id: "sunrise-views",
    title: "Sunrise Views",
    description:
      "Witness magical sunrises that paint the hills with golden hues.",
    fullDescription:
      "Start before dawn and climb to a quiet ridge as the first light spills over the hills, turning mist and rock into gold. A guide leads the way so you reach the viewpoint right as the sky changes.",
    icon: Sunrise,
    location: "Swamimalai Ridge",
    duration: "2 Hours",
    difficulty: "Easy",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYezHInJjkV1wZFGszHY8JxwvFS_h6D-ywEb3JHGXC7g&s=10",
  },
  {
    id: "forest-trails",
    title: "Lush Forest Trails",
    description:
      "Trek through dense forests, ancient paths and untouched nature.",
    fullDescription:
      "Wind through shaded canopy trails and centuries-old paths deep in Yelagiri's reserve forest, with stops to spot birds, old-growth trees and the occasional forest stream.",
    icon: TreePine,
    location: "Reserve Forest Trail",
    duration: "3–4 Hours",
    difficulty: "Moderate",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYezHInJjkV1wZFGszHY8JxwvFS_h6D-ywEb3JHGXC7g&s=10",
  },
  {
    id: "hidden-waterfalls",
    title: "Hidden Waterfalls",
    description: "Discover crystal clear waterfalls tucked away in the wild.",
    fullDescription:
      "A quiet, less-travelled trail leads to a secluded waterfall most visitors never find — bring a change of clothes, the pool at the base is worth the walk.",
    icon: Droplet,
    location: "Jalagamparai Trailhead",
    duration: "2–3 Hours",
    difficulty: "Easy",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSbSjtYcVyvvlz9i8BiVX_d-P39ifokHHMCKEuXUqGLRZ9F1wyO-pIAADQ&s=10",
  },
  {
    id: "scenic-viewpoints",
    title: "Scenic Viewpoints",
    description: "Breathtaking 360° views that make every step worth it.",
    fullDescription:
      "A steady climb rewards you with sweeping, panoramic views across the valley — one of the best spots on the property to watch the light change over the hills.",
    icon: Mountain,
    location: "Punganoor Viewpoint",
    duration: "3 Hours",
    difficulty: "Challenging",
    image: "https://streamside.in/wp-content/uploads/2025/06/Extreme-Trek.webp",
  },
  {
    id: "wildlife-trail",
    title: "Wildlife Spotting",
    description: "Quiet trails built for patient walkers and curious eyes.",
    fullDescription:
      "Move slowly and quietly through known wildlife corridors with a naturalist guide, keeping an eye out for native birds, langurs and forest life along the way.",
    icon: Bird,
    location: "Mangalam Woods",
    duration: "2–3 Hours",
    difficulty: "Moderate",
    image: "https://streamside.in/wp-content/uploads/2025/08/2.jpg",
  },
  {
    id: "off-trail",
    title: "Off-The-Map Routes",
    description: "For explorers who want trails without the crowds.",
    fullDescription:
      "For guests who've done the popular trails already — a guide takes you off the marked paths to lesser-known routes across the hills, at a slower, more exploratory pace.",
    icon: Compass,
    location: "Varies by Season",
    duration: "4–5 Hours",
    difficulty: "Challenging",
    image: "https://streamside.in/wp-content/uploads/2025/08/6.jpg",
  },
];

/* ==================================================
   TREK CARD — fixed size, full-bleed single image,
   icon badge, title with lime underline, description.
   ================================================== */

function TrekCard({ trek, onOpen }) {
  const Icon = trek.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${trek.title}`}
      onClick={() => onOpen(trek)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(trek);
        }
      }}
      className="group relative h-[420px] w-[78vw] shrink-0 snap-center cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:shadow-[0_0_40px_-12px_rgba(163,230,53,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 sm:w-[260px] sm:h-[400px] lg:w-[280px] lg:h-[420px]"
    >
      <Image
        src={trek.image}
        alt={trek.title}
        fill
        sizes="(max-width: 640px) 78vw, 280px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      />

      {/* dark scrim for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10 transition-opacity duration-500 group-hover:from-slate-950 group-hover:via-slate-950/70" />

      {/* icon badge */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-md transition-shadow duration-300 group-hover:border-lime-400/40 group-hover:shadow-[0_0_16px_-2px_rgba(163,230,53,0.6)]">
        <Icon className="h-5 w-5 text-lime-400" aria-hidden="true" />
      </div>

      {/* bottom content */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5">
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">
            {trek.title}
          </h3>
          <span className="mt-1.5 block h-[3px] w-8 rounded-full bg-lime-400 transition-all duration-300 group-hover:w-12" />
        </div>
        <p className="text-sm leading-relaxed text-slate-300 line-clamp-2">
          {trek.description}
        </p>
      </div>
    </div>
  );
}

/* ==================================================
   TREK DETAIL MODAL — single large image + full info.
   ================================================== */

function TrekModal({ trek, onClose }) {
  useEffect(() => {
    if (!trek) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [trek, onClose]);

  if (!trek) return null;
  const Icon = trek.icon;

  return (
    <AnimatePresence>
      <motion.div
        key="trek-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
        <motion.div
          key="trek-modal-panel"
          role="dialog"
          aria-modal="true"
          aria-label={`${trek.title} details`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-[94vw] h-[92vh] flex-col overflow-y-auto rounded-3xl border border-lime-400/20 bg-slate-950 shadow-[0_0_60px_-15px_rgba(163,230,53,0.25)] sm:h-[88vh] sm:w-[90vw] lg:h-[min(680px,88vh)] lg:w-[min(980px,90vw)] lg:flex-row lg:overflow-hidden"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur-md transition-colors hover:border-lime-400/50 hover:bg-slate-950"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* image */}
          <div className="relative h-64 shrink-0 sm:h-80 lg:h-auto lg:w-[48%]">
            <Image
              src={trek.image}
              alt={trek.title}
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:bg-gradient-to-r" />
          </div>

          {/* details */}
          <div className="flex-1 p-5 sm:p-7 lg:overflow-y-auto lg:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-lime-400/40 bg-lime-400/10">
              <Icon className="h-5 w-5 text-lime-400" aria-hidden="true" />
            </div>

            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              {trek.title}
            </h2>
            <span className="mt-2 block h-[3px] w-10 rounded-full bg-lime-400" />

            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {trek.fullDescription}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {trek.location && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <MapPin
                    className="mb-1.5 h-4 w-4 text-lime-400"
                    aria-hidden="true"
                  />
                  <div className="text-[11px] text-slate-400">Location</div>
                  <div className="text-xs font-semibold text-white">
                    {trek.location}
                  </div>
                </div>
              )}
              {trek.duration && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Clock
                    className="mb-1.5 h-4 w-4 text-lime-400"
                    aria-hidden="true"
                  />
                  <div className="text-[11px] text-slate-400">Duration</div>
                  <div className="text-xs font-semibold text-white">
                    {trek.duration}
                  </div>
                </div>
              )}
              {trek.difficulty && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Gauge
                    className="mb-1.5 h-4 w-4 text-lime-400"
                    aria-hidden="true"
                  />
                  <div className="text-[11px] text-slate-400">Difficulty</div>
                  <div className="text-xs font-semibold text-white">
                    {trek.difficulty}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ==================================================
   MAIN COMPONENT
   ================================================== */

export default function ForestTrekking({ treks: externalTreks }) {
  const treks = externalTreks ?? defaultTreks;

  const [selectedTrek, setSelectedTrek] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef(null);

  const scrollByCard = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 280;
    el.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 280;
    const gap = 20;
    setScrollIndex(Math.round(el.scrollLeft / (cardWidth + gap)));
  }, []);

  const scrollToIndex = useCallback((i) => {
    const el = scrollRef.current;
    if (!el) return;
    el.children[i]?.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, []);

  const openTrek = useCallback((trek) => setSelectedTrek(trek), []);
  const closeTrek = useCallback(() => setSelectedTrek(null), []);

  useEffect(() => {
    document.body.style.overflow = selectedTrek ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedTrek]);

  return (
    <section
      aria-label="Trekking experiences at Stream Side"
      className="relative overflow-hidden bg-slate-950 px-4 py-10 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-300">
            Trekking
          </span> */}
          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Trails That{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-300 bg-clip-text text-transparent">
              Lead Somewhere.
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            Every trek around Stream Side is different — sunrise climbs, forest
            paths, hidden waterfalls and quiet viewpoints.
          </p>
        </div>

        {/* carousel */}
        <div className="relative mt-10 sm:mt-12">
          <div className="pointer-events-none absolute -left-4 top-0 bottom-0 z-20 w-10 bg-gradient-to-r from-slate-950 to-transparent sm:-left-8 sm:w-16" />
          <div className="pointer-events-none absolute -right-4 top-0 bottom-0 z-20 w-10 bg-gradient-to-l from-slate-950 to-transparent sm:-right-8 sm:w-16" />

          {/* <div className="hidden items-center justify-end gap-2 pb-3 sm:flex">
            <button
              type="button"
              aria-label="Previous treks"
              onClick={() => scrollByCard(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-lime-400/40 hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next treks"
              onClick={() => scrollByCard(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-lime-400/40 hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
          </div> */}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {treks.map((trek) => (
              <TrekCard key={trek.id} trek={trek} onOpen={openTrek} />
            ))}
          </div>

          {treks.length > 1 && (
            <div className="mt-5 flex items-center justify-center gap-1.5">
              {treks.map((trek, i) => (
                <button
                  key={trek.id}
                  type="button"
                  aria-label={`Go to ${trek.title}`}
                  onClick={() => scrollToIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === scrollIndex ? "w-6 bg-lime-400" : "w-1.5 bg-slate-600"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <TrekModal trek={selectedTrek} onClose={closeTrek} />

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
