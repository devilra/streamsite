"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Sparkles,
  Stars,
  Tent,
  Mountain,
  Trophy,
  Camera,
  Users,
  MapPin,
  Clock,
  IndianRupee,
  X,
  CheckCircle2,
} from "lucide-react";

/* ============================================================================
   EVENT HERO — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   Same cinematic layout/interaction language as CricketHero: left-anchored
   eyebrow + huge display heading + copy + CTA over a gradient-darkened
   background photo, with a horizontal glass "fixture card" row pinned to the
   bottom of the hero and a matching highlights modal. Content is Events,
   not cricket — category chips, a featured/next event, and upcoming events.

   NOTE ON THE BACKGROUND IMAGE
   Swap DEFAULT_BG below for your real Stream Side events asset, or pass
   `<EventHero backgroundImage={yourImage} />`.
   ============================================================================ */

const ACCENT = "#B7FF00";

// TODO: replace with your real Stream Side events background image.
const DEFAULT_BG = "/All-Images/events-hero.png";

// ---------------------------------------------------------------------------
// Category chips (dynamic, drives onCategoryChange).
// ---------------------------------------------------------------------------

const DEFAULT_CATEGORIES = [
  { id: "stargazing", label: "Stargazing", icon: Stars },
  { id: "camping", label: "Camping", icon: Tent },
  { id: "trekking", label: "Trekking", icon: Mountain },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "community", label: "Community", icon: Users },
];

// ---------------------------------------------------------------------------
// Upcoming events shown in the bottom horizontal card row.
// First entry is treated as the featured / next event (highlighted card).
// ---------------------------------------------------------------------------

const UPCOMING_EVENTS = [
  {
    id: 1,
    category: "Stargazing",
    icon: Stars,
    title: "Meteor Shower Night",
    date: "25 Aug 2026",
    time: "8:00 PM",
    venue: "Telescope View Point",
    price: "₹799",
    spots: "40 Spots",
    featured: true,
  },
  {
    id: 2,
    category: "Trekking",
    icon: Mountain,
    title: "Sunrise Ridge Trek",
    date: "27 Aug 2026",
    time: "5:30 AM",
    venue: "Swamimalai Ridge",
    price: "₹599",
    spots: "25 Spots",
  },
  {
    id: 3,
    category: "Camping",
    icon: Tent,
    title: "Campfire & Chill",
    date: "29 Aug 2026",
    time: "6:00 PM",
    venue: "Nature Park Campground",
    price: "₹699",
    spots: "30 Spots",
  },
  {
    id: 4,
    category: "Sports",
    icon: Trophy,
    title: "Weekend Cricket League",
    date: "01 Sep 2026",
    time: "9:00 AM",
    venue: "Stream Side Arena",
    price: "₹499",
    spots: "22 Spots",
  },
  {
    id: 5,
    category: "Photography",
    icon: Camera,
    title: "Golden Hour Photo Walk",
    date: "03 Sep 2026",
    time: "6:00 AM",
    venue: "Scenic Viewpoints",
    price: "₹899",
    spots: "15 Spots",
  },
  {
    id: 6,
    category: "Community",
    icon: Users,
    title: "Community Potluck Night",
    date: "05 Sep 2026",
    time: "7:00 PM",
    venue: "Stream Side Common Grounds",
    price: "Free",
    spots: "Open to all",
  },
];

// ---------------------------------------------------------------------------
// Full events list shown inside the "Explore Events" modal.
// ---------------------------------------------------------------------------

const ALL_EVENTS = [
  ...UPCOMING_EVENTS,
  {
    id: 7,
    category: "Stargazing",
    icon: Stars,
    title: "Planet Watch Special",
    date: "08 Sep 2026",
    time: "9:00 PM",
    venue: "Stream Side Sky Deck",
    price: "₹899",
    spots: "35 Spots",
  },
  {
    id: 8,
    category: "Trekking",
    icon: Mountain,
    title: "Hidden Waterfalls Trail",
    date: "10 Sep 2026",
    time: "6:00 AM",
    venue: "Jalagamparai Trailhead",
    price: "₹599",
    spots: "20 Spots",
  },
  {
    id: 9,
    category: "Community",
    icon: Users,
    title: "Bonfire Music Night",
    date: "12 Sep 2026",
    time: "7:30 PM",
    venue: "Campfire Zone",
    price: "₹399",
    spots: "50 Spots",
  },
];

const HEADLINE_LINES = [
  { text: "Find Your", accent: false },
  { text: "Next Adventure", accent: true },
];

// ---------------------------------------------------------------------------
// Single event card inside the "Explore Events" modal.
// ---------------------------------------------------------------------------

function EventModalCard({ event, index, onViewEvent }) {
  const Icon = event.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.05 * index,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-[color:var(--accent)]/50"
      style={{ "--accent": ACCENT }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}55, 0 0 24px 0 ${ACCENT}25` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-300">
            <Icon className="h-3 w-3" style={{ color: ACCENT }} />
            {event.category}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <CalendarDays className="h-3 w-3" />
            {event.date}
          </span>
        </div>

        <h4 className="mt-4 text-base font-bold text-white">{event.title}</h4>

        <div className="mt-2.5 space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" style={{ color: ACCENT }} />
            {event.time}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3" style={{ color: ACCENT }} />
            {event.venue}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
          <span className="text-sm font-bold text-white">{event.price}</span>
          <button
            type="button"
            onClick={() => onViewEvent?.(event)}
            className="inline-flex items-center gap-1 text-xs font-bold transition-colors hover:opacity-80"
            style={{ color: ACCENT }}
          >
            View Event
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Explore Events modal.
// ---------------------------------------------------------------------------

function EventsModal({ open, events, onClose, onViewEvent }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Explore Events
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Every experience currently open for booking at Stream Side.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close events list"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {events.map((event, i) => (
                  <EventModalCard
                    key={event.id}
                    event={event}
                    index={i}
                    onViewEvent={onViewEvent}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Category chip row.
// ---------------------------------------------------------------------------

function CategoryChips({ categories, active, onSelect }) {
  return (
    <div
      role="tablist"
      aria-label="Event categories"
      className="flex flex-wrap gap-2"
    >
      {categories.map((cat, i) => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        return (
          <motion.button
            key={cat.id}
            type="button"
            role="tab"
            aria-pressed={isActive}
            aria-selected={isActive}
            onClick={() => onSelect(cat.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
            className="group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold backdrop-blur-sm transition-all duration-300"
            style={{
              borderColor: isActive ? `${ACCENT}90` : "rgba(255,255,255,0.15)",
              backgroundColor: isActive
                ? `${ACCENT}22`
                : "rgba(255,255,255,0.05)",
              color: isActive ? ACCENT : "#cbd5e1",
              boxShadow: isActive ? `0 0 20px -4px ${ACCENT}80` : "none",
            }}
          >
            <Icon
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
            {cat.label}
          </motion.button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function EventHero({
  backgroundImage = DEFAULT_BG,
  eventCategories = DEFAULT_CATEGORIES,
  upcomingEvents = UPCOMING_EVENTS,
  allEvents = ALL_EVENTS,
  onCategoryChange,
  onExploreEvents,
  onCreateEvent,
  onViewEvent,
}) {
  const [eventsOpen, setEventsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleSelectCategory = useCallback(
    (id) => {
      setActiveCategory((prev) => {
        const next = prev === id ? null : id;
        onCategoryChange?.(next);
        return next;
      });
    },
    [onCategoryChange],
  );

  const handleExplore = useCallback(() => {
    if (onExploreEvents) {
      onExploreEvents(activeCategory);
    } else {
      setEventsOpen(true);
    }
  }, [onExploreEvents, activeCategory]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      {/* Background photo + cinematic overlays — darker on the left, the
          photo reveals more clearly toward the right. */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Stream Side events at Yelagiri Hills"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
        <div className="absolute inset-0 bg-slate-950/15" />
      </div>

      <div className="relative z-10 flex flex-col justify-between px-4 py-10 sm:px-8 sm:py-14 lg:px-16">
        {/* -------------------------------------------------------------- */}
        {/* TOP: eyebrow + heading + description + chips + CTAs            */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-15 max-w-xl sm:mt-12">
          {/* <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-200">
              Stream Side Events · Yelagiri Hills
            </span>
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black uppercase leading-[1.05] tracking-tight text-4xl sm:leading-[0.95] sm:text-6xl md:text-7xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            {HEADLINE_LINES.map((line) =>
              line.accent ? (
                <span
                  key={line.text}
                  className="block text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-300 drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)]"
                >
                  {line.text}
                </span>
              ) : (
                <span key={line.text} className="block text-white">
                  {line.text}
                </span>
              ),
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-slate-300/95 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            From stargazing nights and forest treks to cricket tournaments,
            photography walks and community celebrations — discover experiences
            worth remembering at Stream Side.
          </motion.p>

          {/* <div className="mt-6">
            <CategoryChips
              categories={eventCategories}
              active={activeCategory}
              onSelect={handleSelectCategory}
            />
          </div> */}

          {/* <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={handleExplore}
              className="group flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(183,255,0,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_42px_rgba(183,255,0,0.5)] active:scale-[0.98]"
              style={{ backgroundColor: ACCENT }}
            >
              <CalendarDays className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Explore Events
            </button>

            <button
              type="button"
              onClick={() => onCreateEvent?.()}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-lime-400/50 hover:bg-white/10"
            >
              Create an Event
            </button>
          </motion.div> */}
        </div>

        {/* Section heading */}
        {/* <div className="mb-6 mt-14 flex items-center justify-between sm:mt-16">
          <div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-5xl">
              Upcoming Events
            </h2>
            <p className="mt-1 max-w-lg text-sm text-slate-400">
              Explore upcoming experiences and community events happening at
              Stream Side, Yelagiri Hills.
            </p>
          </div>
        </div> */}

        {/* -------------------------------------------------------------- */}
        {/* BOTTOM: horizontal glass event-card row                        */}
        {/* -------------------------------------------------------------- */}
        <div className="relative mt-7">
          <div className="pointer-events-none absolute -left-6 top-0 z-20 h-full w-15 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="pointer-events-none absolute -right-6 top-0 z-20 h-full w-15 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent" />
          <div className="no-scrollbar flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory">
            {upcomingEvents.map((event) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${event.title}`}
                  onClick={() => onViewEvent?.(event)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onViewEvent?.(event);
                    }
                  }}
                  className={`group relative w-[270px] shrink-0 cursor-pointer snap-start overflow-hidden rounded-[24px] border bg-black/35 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)] transition-colors duration-300 sm:w-[385px] ${
                    event.featured
                      ? "border-lime-400/50"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  <div
                    className="absolute -top-12 -left-12 h-28 w-28 rounded-full opacity-20 blur-3xl transition-all group-hover:opacity-40"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  <div className="relative z-10 p-5">
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Icon className="h-5 w-5" style={{ color: ACCENT }} />
                      </div>

                      {event.featured ? (
                        <span
                          className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-950"
                          style={{ backgroundColor: ACCENT }}
                        >
                          Next Event
                        </span>
                      ) : (
                        <span className="min-w-0 truncate text-right text-[10px] uppercase tracking-[0.2em] text-slate-500">
                          {event.category}
                        </span>
                      )}
                    </div>

                    <div className="mt-8 min-h-[92px]">
                      <h3 className="break-words text-xl leading-tight text-white sm:text-2xl">
                        {event.title}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-slate-400">
                        <MapPin
                          className="h-3 w-3 shrink-0"
                          style={{ color: ACCENT }}
                        />
                        <span className="truncate">{event.venue}</span>
                      </p>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-300">
                        {/* <IndianRupee
                          className="h-3 w-3 shrink-0"
                          style={{ color: ACCENT }}
                        /> */}
                        {/* {event.price}
                        <span className="text-slate-500">·</span> */}
                        {event.spots}
                      </p>
                    </div>

                    <div className="mt-8 flex min-w-0 items-center justify-between gap-2 border-t border-white/10 pt-3">
                      <span className="min-w-0 truncate text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {event.date} • {event.time}
                      </span>

                      <div className="flex shrink-0 gap-1">
                        <span className="h-2 w-2 rounded-full bg-lime-400" />
                        <span className="h-2 w-2 rounded-full bg-lime-400/60" />
                        <span className="h-2 w-2 rounded-full bg-lime-400/30" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <EventsModal
        open={eventsOpen}
        events={allEvents}
        onClose={() => setEventsOpen(false)}
        onViewEvent={onViewEvent}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </section>
  );
}
