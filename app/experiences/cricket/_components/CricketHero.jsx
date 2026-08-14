"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  ArrowRight,
  Trophy,
  PlayCircle,
  X,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import CricketBookingModal from "./CricketBookingModal";

/* ============================================================================
   CRICKET HERO — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   Single, self-contained component. No backend, no TypeScript.
   Layout mirrors the reference: left-anchored eyebrow + huge heading + copy +
   one CTA over a cinematic, gradient-darkened background photo, with a
   floating glass stats bar pinned to the bottom of the hero.

   NOTE ON THE BACKGROUND IMAGE
   I don't have access to your actual Yelagiri cricket-ground asset from this
   conversation, so the background is exposed as a `backgroundImage` prop
   (defaulting to a placeholder). Swap the default below for your real image
   import/URL, or just pass `<CricketHero backgroundImage={yourImage} />`.
   ============================================================================ */

const ACCENT = "#B7FF00";

// TODO: replace with your existing Yelagiri cricket ground image (local import or CDN URL).
const DEFAULT_BG =
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=2000&q=80";

// ---------------------------------------------------------------------------
// Upcoming fixtures shown in the bottom card row (replaces the old stats).
// ---------------------------------------------------------------------------

const UPCOMING_MATCHES = [
  {
    id: 1,
    matchType: "Friendly Match",
    teamA: "Forest Riders",
    teamB: "Hill Strikers",
    date: "10 Aug 2026",
    time: "09:00 AM",
    venue: "Stream Side Arena",
  },
  {
    id: 2,
    matchType: "Weekend League",
    teamA: "Mountain Kings",
    teamB: "Nature Warriors",
    date: "12 Aug 2026",
    time: "04:30 PM",
    venue: "Valley Ground",
  },
  {
    id: 3,
    matchType: "Morning Match",
    teamA: "Sunrise XI",
    teamB: "Valley Smashers",
    date: "15 Aug 2026",
    time: "10:00 AM",
    venue: "Forest Cricket Park",
  },
  {
    id: 4,
    matchType: "Evening Match",
    teamA: "Highland XI",
    teamB: "Lakeview Kings",
    date: "18 Aug 2026",
    time: "05:00 PM",
    venue: "Hillside Ground",
  },
  {
    id: 5,
    matchType: "Friendly Match",
    teamA: "Tea Estate Titans",
    teamB: "Pine Grove Panthers",
    date: "20 Aug 2026",
    time: "08:30 AM",
    venue: "Nature Cricket Ground",
  },
  {
    id: 6,
    matchType: "Weekend Match",
    teamA: "Summit Strikers",
    teamB: "Cloud Warriors",
    date: "22 Aug 2026",
    time: "03:30 PM",
    venue: "Yelagiri Cricket Arena",
  },
];

const HEADLINE_LINES = [
  { text: "Play", accent: false },
  { text: "Cricket", accent: false },
  { text: "In Nature", accent: true },
];

// ---------------------------------------------------------------------------
// Sample scorecards shown inside the "Live Match Highlights" modal.
// ---------------------------------------------------------------------------

const MATCHES = [
  {
    id: 1,
    teamA: { name: "Forest Riders", score: "145 / 8" },
    teamB: { name: "Hill Strikers", score: "148 / 6" },
    result: "Hill Strikers won by 4 wickets",
    date: "Yesterday",
  },
  {
    id: 2,
    teamA: { name: "Nature Warriors", score: "186 / 5" },
    teamB: { name: "Mountain Kings", score: "180 / 9" },
    result: "Nature Warriors won by 6 runs",
    date: "Last Weekend",
  },
  {
    id: 3,
    teamA: { name: "Sunrise XI", score: "122 / 10" },
    teamB: { name: "Valley Smashers", score: "123 / 4" },
    result: "Valley Smashers won by 6 wickets",
    date: "2 Days Ago",
  },
  {
    id: 4,
    teamA: { name: "Ridge Riders", score: "156 / 7" },
    teamB: { name: "Meadow Strikers", score: "152 / 9" },
    result: "Ridge Riders won by 4 runs",
    date: "3 Days Ago",
  },
  {
    id: 5,
    teamA: { name: "Camp Eagles", score: "134 / 6" },
    teamB: { name: "Trail Blazers", score: "137 / 5" },
    result: "Trail Blazers won by 5 wickets",
    date: "5 Days Ago",
  },
  {
    id: 6,
    teamA: { name: "Highland XI", score: "168 / 4" },
    teamB: { name: "Lakeview Kings", score: "165 / 8" },
    result: "Highland XI won by 3 runs",
    date: "1 Week Ago",
  },
  {
    id: 7,
    teamA: { name: "Tea Estate Titans", score: "141 / 9" },
    teamB: { name: "Pine Grove Panthers", score: "142 / 3" },
    result: "Pine Grove Panthers won by 7 wickets",
    date: "1 Week Ago",
  },
  {
    id: 8,
    teamA: { name: "Summit Strikers", score: "175 / 6" },
    teamB: { name: "Valley Vipers", score: "171 / 8" },
    result: "Summit Strikers won by 4 runs",
    date: "2 Weeks Ago",
  },
  {
    id: 9,
    teamA: { name: "Misty Hills XI", score: "129 / 8" },
    teamB: { name: "Cloud Nine CC", score: "130 / 5" },
    result: "Cloud Nine CC won by 5 wickets",
    date: "2 Weeks Ago",
  },
];

// ---------------------------------------------------------------------------
// Animated count-up used inside each stat card.
// ---------------------------------------------------------------------------

function AnimatedCounter({ target, suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const unsub = count.on("change", (v) =>
      setDisplay(Math.round(v).toLocaleString()),
    );
    return () => unsub();
  }, [count]);

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

// ---------------------------------------------------------------------------
// Single stat inside the floating glass bar.
// ---------------------------------------------------------------------------

function StatItem({ icon: Icon, value, suffix, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group flex w-32 shrink-0 flex-col items-center gap-2 px-4 py-2 text-center sm:w-auto sm:flex-1 sm:px-2"
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:shadow-[0_0_18px_rgba(183,255,0,0.35)]"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <Icon className="h-4 w-4" style={{ color: ACCENT }} />
      </span>
      <div className="text-xl font-extrabold text-white sm:text-2xl">
        <AnimatedCounter target={value} suffix={suffix} />
      </div>
      <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-[11px]">
        {label}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Single scorecard inside the Live Match Highlights modal.
// ---------------------------------------------------------------------------

function MatchScoreRow({ name, score }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="truncate text-sm font-semibold text-white">{name}</span>
      <span className="shrink-0 text-sm font-bold tabular-nums text-slate-200">
        {score}
      </span>
    </div>
  );
}

function MatchCard({ match, index }) {
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
            <CheckCircle2 className="h-3 w-3" style={{ color: ACCENT }} />
            Completed
          </span>
          <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
            <CalendarDays className="h-3 w-3" />
            {match.date}
          </span>
        </div>

        <div className="mt-4 space-y-2.5">
          <MatchScoreRow name={match.teamA.name} score={match.teamA.score} />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              vs
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <MatchScoreRow name={match.teamB.name} score={match.teamB.score} />
        </div>

        <div className="mt-4 border-t border-white/10 pt-3">
          <p className="text-xs font-semibold" style={{ color: ACCENT }}>
            {match.result}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Live Match Highlights modal.
// ---------------------------------------------------------------------------

function MatchHighlightsModal({ open, onClose }) {
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
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
              <div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  Cricket Highlights
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Recent friendly matches played at Stream Side, Yelagiri.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close highlights"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Match cards */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {MATCHES.map((match, i) => (
                  <MatchCard key={match.id} match={match} index={i} />
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
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function CricketHero({ backgroundImage = DEFAULT_BG }) {
  const [highlightsOpen, setHighlightsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      {/* Background photo + cinematic overlays: darker on the left, the
          photo reveals more clearly toward the right — matching the
          reference's light distribution. */}
      <div className="absolute inset-0">
        <img
          src="/All-Images/cricket.png"
          alt="Cricket ground at Stream Side, Yelagiri Hills"
          className="h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/10" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" /> */}
        <div className="absolute inset-0 bg-slate-950/15" />
      </div>

      <div className="relative z-10  flex  flex-col justify-between px-4 py-10 sm:px-8 sm:py-14 lg:px-16">
        {/* -------------------------------------------------------------- */}
        {/* TOP: eyebrow + heading + description + CTA                     */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-15 max-w-xl sm:mt-12">
          <motion.div
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
              Stream Side Cricket · Yelagiri Hills
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-black uppercase leading-[1.05] sm:leading-[0.95] tracking-tight text-4xl sm:text-6xl md:text-7xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            <span className="block  text-white">PLAY</span>
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-300 drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)]">
              CRICKET
              <span className="text-[15px] tracking-wider"> IN NATURE</span>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-slate-300/95 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            Experience cricket like never before amidst Yelagiri's breathtaking
            landscapes, where nature and the spirit of the game come together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => setHighlightsOpen(true)}
              className="group flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(183,255,0,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_42px_rgba(183,255,0,0.5)] active:scale-[0.98]"
              style={{ backgroundColor: ACCENT }}
            >
              <PlayCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Cricket Highlights
            </button>
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="group flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(183,255,0,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_42px_rgba(183,255,0,0.5)] active:scale-[0.98]"
              style={{ backgroundColor: "white", cursor: "pointer" }}
            >
              <PlayCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Book Now
            </button>
          </motion.div>
        </div>

        {/* Section Heading */}
        <div className="mb-6 flex items-center mt-14 sm:mt-16 justify-between">
          <div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-5xl">
              Upcoming Matches
            </h2>

            <p className="mt-1 max-w-lg text-sm text-slate-400">
              Explore upcoming cricket matches and exciting events happening at
              Stream Side, Yelagiri Hills.
            </p>
          </div>
        </div>
        {/* -------------------------------------------------------------- */}
        {/* BOTTOM: floating glass statistics card                         */}
        {/* -------------------------------------------------------------- */}
        <div className="relative ">
          {/* Left Fade */}
          {/* <div
            className="
      pointer-events-none
      absolute -left-6 top-0 z-20
      h-full w-16
      bg-gradient-to-r
      from-black/55
      via-black/20
      to-transparent
    "
          /> */}

          {/* Right Fade */}
          {/* <div
            className="
      pointer-events-none
      absolute -right-6 top-0 z-20
      h-full w-16
      bg-gradient-to-l
      from-black/55
      via-black/20
      to-transparent
    "
          /> */}
          <div className="no-scrollbar flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory">
            {UPCOMING_MATCHES.map((match) => (
              <div
                key={match.id}
                className="group relative w-[270px] sm:w-[350px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-white/10 bg-black backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
              >
                {/* Glow */}
                <div
                  className="absolute -top-12 -left-12 h-28 w-28 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-all"
                  style={{ backgroundColor: ACCENT }}
                />

                {/* Top Shine */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                <div className="relative z-10 p-5">
                  <div className="flex min-w-0 items-center justify-between gap-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Trophy className="h-5 w-5" style={{ color: ACCENT }} />
                    </div>

                    <span className="min-w-0 truncate text-right text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      {match.matchType}
                    </span>
                  </div>

                  <div className="mt-8 min-h-[92px]">
                    <h3 className="break-words text-2xl leading-tight text-white">
                      {match.teamA}
                    </h3>

                    <p className="mt-1.5 pl-10 break-words text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                      VS
                    </p>
                    <p className="mt-1.5 break-words text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                      {match.teamB}
                    </p>
                  </div>

                  <div className="mt-8 flex min-w-0 items-center justify-between gap-2 border-t border-white/10 pt-3">
                    <span className="min-w-0 truncate text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      {match.date} • {match.time}
                    </span>

                    <div className="flex shrink-0 gap-1">
                      <span className="h-2 w-2 rounded-full bg-lime-400" />
                      <span className="h-2 w-2 rounded-full bg-lime-400/60" />
                      <span className="h-2 w-2 rounded-full bg-lime-400/30" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MatchHighlightsModal
        open={highlightsOpen}
        onClose={() => setHighlightsOpen(false)}
      />

      <CricketBookingModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </section>
  );
}
