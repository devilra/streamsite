"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  CalendarDays,
  MapPin,
  PlayCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Zap,
  Target,
  Star,
  Clock3,
  Image as ImageIcon,
  Maximize2,
  Award,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Aperture,
  Flame,
  Users,
  Gauge,
} from "lucide-react";

/* ============================================================================
   MATCH HIGHLIGHTS — Stream Side Cricket, Yelagiri Hills
   ----------------------------------------------------------------------------
   Single, self-contained, production-ready component. No backend — every
   match, stat, and gallery image below is realistic dummy content. Sits right
   after the Upcoming Matches section and mirrors the same design system:
   bg-slate-950 / glassmorphism cards / #B7FF00 accent, with the same animated
   filter-tab language used across PhotographyActivities and PhotographyLocations.

   NOTE ON THE CARD LAYOUT
   The match cards render as a single horizontal, snap-scrolling carousel on
   every breakpoint (mobile, tablet, desktop) — no grid switch at `sm`/`lg` —
   so the browsing experience is identical everywhere. On pointer/desktop
   devices, two arrow buttons appear to scroll the carousel; on touch devices
   people can just swipe.
   ============================================================================ */

const ACCENT = "#B7FF00";

// ---------------------------------------------------------------------------
// SHARED IMAGE POOL — dummy match photography
// ---------------------------------------------------------------------------

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1624526261967-ac4638f3e275?auto=format&fit=crop&w=1200&q=80",
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
];

function imgs(...indices) {
  return indices.map((i) => IMAGE_POOL[i % IMAGE_POOL.length]);
}

// ---------------------------------------------------------------------------
// STATIC REFERENCE DATA
// ---------------------------------------------------------------------------

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Friendly Matches", value: "friendly" },
  { label: "Tournament", value: "tournament" },
  { label: "Weekend League", value: "weekend" },
  { label: "Practice Match", value: "practice" },
  { label: "Final Match", value: "final" },
];

const BADGE_LABEL = {
  friendly: "Friendly Match",
  tournament: "Tournament Match",
  weekend: "Weekend League",
  practice: "Practice Match",
  final: "Final Match",
};

const GALLERY_LABELS = [
  "Winning Moment",
  "Crowd",
  "Celebration",
  "Six",
  "Wicket",
  "Awards",
];

// ---------------------------------------------------------------------------
// DUMMY DATA — 8 realistic match highlights
// ---------------------------------------------------------------------------

const MATCHES = [
  {
    id: "m1",
    category: "friendly",
    thumbnail: IMAGE_POOL[0],
    date: "28 Jul 2026",
    ground: "Stream Side Arena",
    teamA: "Forest Riders",
    teamB: "Hill Strikers",
    winner: "Hill Strikers",
    result: "Won by 4 Wickets",
    summary:
      "A tight run-chase settled in the final over, with Hill Strikers holding their nerve under lights.",
    stats: { runs: 293, wickets: 14, motm: "R. Suresh", duration: "3h 10m" },
    modal: {
      banner: IMAGE_POOL[0],
      finalScore: { teamA: "145 / 8", teamB: "148 / 6" },
      timeline: [
        { over: "Over 3", event: "First Boundary" },
        { over: "Over 9", event: "First Wicket" },
        { over: "Over 16", event: "50-Run Partnership" },
        { over: "Over 19", event: "Winning Shot" },
      ],
      playerOfMatch: {
        name: "R. Suresh",
        image: IMAGE_POOL[2],
        runs: 62,
        wickets: 2,
        strikeRate: "148.8",
        achievement: "Anchored the chase with a composed 62 off 42 balls.",
      },
      gallery: imgs(0, 2, 8, 5, 11, 3),
      scorecard: {
        teamA: { name: "Forest Riders", runs: 145, wickets: 8, overs: "20.0" },
        teamB: { name: "Hill Strikers", runs: 148, wickets: 6, overs: "19.4" },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "92m" },
        { icon: Gauge, label: "Fastest Ball", value: "128 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "62 (Suresh)" },
        { icon: Target, label: "Most Wickets", value: "3 (Ravi)" },
        { icon: Star, label: "Best Catch", value: "Long-on, Over 17" },
      ],
    },
  },
  {
    id: "m2",
    category: "tournament",
    thumbnail: IMAGE_POOL[1],
    date: "14 Jun 2026",
    ground: "Valley Ground",
    teamA: "Nature Warriors",
    teamB: "Mountain Kings",
    winner: "Nature Warriors",
    result: "Won by 6 Runs",
    summary:
      "A high-scoring tournament opener decided by a single over of disciplined death bowling.",
    stats: { runs: 366, wickets: 14, motm: "A. Kumar", duration: "3h 25m" },
    modal: {
      banner: IMAGE_POOL[1],
      finalScore: { teamA: "186 / 5", teamB: "180 / 9" },
      timeline: [
        { over: "Over 2", event: "First Boundary" },
        { over: "Over 7", event: "First Wicket" },
        { over: "Over 15", event: "Hat-trick" },
        { over: "Over 20", event: "Winning Shot" },
      ],
      playerOfMatch: {
        name: "A. Kumar",
        image: IMAGE_POOL[6],
        runs: 88,
        wickets: 1,
        strikeRate: "162.9",
        achievement: "Blistering 88 off 54 balls set up the total.",
      },
      gallery: imgs(1, 4, 9, 7, 12, 2),
      scorecard: {
        teamA: {
          name: "Nature Warriors",
          runs: 186,
          wickets: 5,
          overs: "20.0",
        },
        teamB: { name: "Mountain Kings", runs: 180, wickets: 9, overs: "20.0" },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "101m" },
        { icon: Gauge, label: "Fastest Ball", value: "132 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "88 (Kumar)" },
        { icon: Target, label: "Most Wickets", value: "4 (Prakash)" },
        { icon: Star, label: "Best Catch", value: "Cover, Over 18" },
      ],
    },
  },
  {
    id: "m3",
    category: "weekend",
    thumbnail: IMAGE_POOL[3],
    date: "05 Jul 2026",
    ground: "Forest Cricket Park",
    teamA: "Sunrise XI",
    teamB: "Valley Smashers",
    winner: "Valley Smashers",
    result: "Won by 6 Wickets",
    summary:
      "Valley Smashers cruised home with two overs to spare after a disciplined bowling display.",
    stats: { runs: 245, wickets: 11, motm: "D. Iyer", duration: "2h 55m" },
    modal: {
      banner: IMAGE_POOL[3],
      finalScore: { teamA: "122 / 10", teamB: "123 / 4" },
      timeline: [
        { over: "Over 4", event: "First Boundary" },
        { over: "Over 6", event: "First Wicket" },
        { over: "Over 11", event: "Middle-order Collapse" },
        { over: "Over 18", event: "Winning Shot" },
      ],
      playerOfMatch: {
        name: "D. Iyer",
        image: IMAGE_POOL[10],
        runs: 54,
        wickets: 3,
        strikeRate: "135.0",
        achievement: "Match-winning all-round display, 54 runs and 3 wickets.",
      },
      gallery: imgs(3, 5, 9, 1, 8, 6),
      scorecard: {
        teamA: { name: "Sunrise XI", runs: 122, wickets: 10, overs: "19.3" },
        teamB: {
          name: "Valley Smashers",
          runs: 123,
          wickets: 4,
          overs: "18.0",
        },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "84m" },
        { icon: Gauge, label: "Fastest Ball", value: "124 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "54 (Iyer)" },
        { icon: Target, label: "Most Wickets", value: "3 (Iyer)" },
        { icon: Star, label: "Best Catch", value: "Slip, Over 9" },
      ],
    },
  },
  {
    id: "m4",
    category: "practice",
    thumbnail: IMAGE_POOL[5],
    date: "22 Jun 2026",
    ground: "Hillside Ground",
    teamA: "Ridge Riders",
    teamB: "Meadow Strikers",
    winner: "Ridge Riders",
    result: "Won by 4 Runs",
    summary:
      "A closely fought practice fixture, useful form-check for both sides ahead of the league.",
    stats: { runs: 308, wickets: 16, motm: "K. Bala", duration: "3h 05m" },
    modal: {
      banner: IMAGE_POOL[5],
      finalScore: { teamA: "156 / 7", teamB: "152 / 9" },
      timeline: [
        { over: "Over 3", event: "First Boundary" },
        { over: "Over 8", event: "First Wicket" },
        { over: "Over 14", event: "50-Run Partnership" },
        { over: "Over 20", event: "Final Over Drama" },
      ],
      playerOfMatch: {
        name: "K. Bala",
        image: IMAGE_POOL[9],
        runs: 71,
        wickets: 1,
        strikeRate: "142.0",
        achievement: "Set the platform with a fluent 71 at the top.",
      },
      gallery: imgs(5, 0, 7, 3, 10, 4),
      scorecard: {
        teamA: { name: "Ridge Riders", runs: 156, wickets: 7, overs: "20.0" },
        teamB: {
          name: "Meadow Strikers",
          runs: 152,
          wickets: 9,
          overs: "20.0",
        },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "88m" },
        { icon: Gauge, label: "Fastest Ball", value: "121 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "71 (Bala)" },
        { icon: Target, label: "Most Wickets", value: "3 (Anand)" },
        { icon: Star, label: "Best Catch", value: "Deep Mid-wicket, Over 20" },
      ],
    },
  },
  {
    id: "m5",
    category: "friendly",
    thumbnail: IMAGE_POOL[7],
    date: "09 Aug 2026",
    ground: "Nature Cricket Ground",
    teamA: "Camp Eagles",
    teamB: "Trail Blazers",
    winner: "Trail Blazers",
    result: "Won by 5 Wickets",
    summary:
      "Trail Blazers chased down a modest target with plenty of six-hitting late in the innings.",
    stats: { runs: 271, wickets: 12, motm: "N. Vasan", duration: "2h 48m" },
    modal: {
      banner: IMAGE_POOL[7],
      finalScore: { teamA: "134 / 6", teamB: "137 / 5" },
      timeline: [
        { over: "Over 2", event: "First Boundary" },
        { over: "Over 10", event: "First Wicket" },
        { over: "Over 16", event: "Back-to-back Sixes" },
        { over: "Over 18", event: "Winning Shot" },
      ],
      playerOfMatch: {
        name: "N. Vasan",
        image: IMAGE_POOL[13],
        runs: 47,
        wickets: 2,
        strikeRate: "170.9",
        achievement:
          "Finished the chase in style with three sixes in the 18th over.",
      },
      gallery: imgs(7, 1, 4, 9, 2, 11),
      scorecard: {
        teamA: { name: "Camp Eagles", runs: 134, wickets: 6, overs: "20.0" },
        teamB: { name: "Trail Blazers", runs: 137, wickets: 5, overs: "18.2" },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "96m" },
        { icon: Gauge, label: "Fastest Ball", value: "119 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "47 (Vasan)" },
        { icon: Target, label: "Most Wickets", value: "2 (Vasan)" },
        { icon: Star, label: "Best Catch", value: "Boundary Line, Over 14" },
      ],
    },
  },
  {
    id: "m6",
    category: "final",
    thumbnail: IMAGE_POOL[9],
    date: "02 Aug 2026",
    ground: "Lakeview Ground",
    teamA: "Highland XI",
    teamB: "Lakeview Kings",
    winner: "Highland XI",
    result: "Won by 3 Runs",
    summary:
      "The season final came down to the last ball, with Highland XI defending a modest total to lift the trophy.",
    stats: { runs: 333, wickets: 15, motm: "S. Manoj", duration: "3h 40m" },
    modal: {
      banner: IMAGE_POOL[9],
      finalScore: { teamA: "168 / 4", teamB: "165 / 8" },
      timeline: [
        { over: "Over 1", event: "First Boundary" },
        { over: "Over 12", event: "First Wicket" },
        { over: "Over 15", event: "Hat-trick" },
        { over: "Over 20", event: "Last-ball Finish" },
      ],
      playerOfMatch: {
        name: "S. Manoj",
        image: IMAGE_POOL[8],
        runs: 12,
        wickets: 4,
        strikeRate: "80.0",
        achievement:
          "Match-winning 4-wicket haul in the final, including a hat-trick.",
      },
      gallery: imgs(9, 6, 0, 13, 5, 8),
      scorecard: {
        teamA: { name: "Highland XI", runs: 168, wickets: 4, overs: "20.0" },
        teamB: { name: "Lakeview Kings", runs: 165, wickets: 8, overs: "20.0" },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "98m" },
        { icon: Gauge, label: "Fastest Ball", value: "134 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "58 (Ramesh)" },
        { icon: Target, label: "Most Wickets", value: "4 (Manoj)" },
        { icon: Star, label: "Best Catch", value: "Final Ball, Over 20" },
      ],
    },
  },
  {
    id: "m7",
    category: "tournament",
    thumbnail: IMAGE_POOL[4],
    date: "18 May 2026",
    ground: "Nature Cricket Ground",
    teamA: "Tea Estate Titans",
    teamB: "Pine Grove Panthers",
    winner: "Pine Grove Panthers",
    result: "Won by 7 Wickets",
    summary:
      "Pine Grove Panthers chased down the target comfortably behind a composed opening stand.",
    stats: { runs: 283, wickets: 12, motm: "V. Karthik", duration: "3h 02m" },
    modal: {
      banner: IMAGE_POOL[4],
      finalScore: { teamA: "141 / 9", teamB: "142 / 3" },
      timeline: [
        { over: "Over 2", event: "First Boundary" },
        { over: "Over 9", event: "First Wicket" },
        { over: "Over 13", event: "100-Run Partnership" },
        { over: "Over 17", event: "Winning Shot" },
      ],
      playerOfMatch: {
        name: "V. Karthik",
        image: IMAGE_POOL[11],
        runs: 76,
        wickets: 0,
        strikeRate: "158.3",
        achievement: "Unbeaten 76 to seal the chase with overs in hand.",
      },
      gallery: imgs(4, 11, 2, 9, 6, 0),
      scorecard: {
        teamA: {
          name: "Tea Estate Titans",
          runs: 141,
          wickets: 9,
          overs: "20.0",
        },
        teamB: {
          name: "Pine Grove Panthers",
          runs: 142,
          wickets: 3,
          overs: "17.4",
        },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "90m" },
        { icon: Gauge, label: "Fastest Ball", value: "122 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "76 (Karthik)" },
        { icon: Target, label: "Most Wickets", value: "3 (Dinesh)" },
        { icon: Star, label: "Best Catch", value: "Point, Over 6" },
      ],
    },
  },
  {
    id: "m8",
    category: "weekend",
    thumbnail: IMAGE_POOL[12],
    date: "26 Jul 2026",
    ground: "Yelagiri Cricket Arena",
    teamA: "Summit Strikers",
    teamB: "Valley Vipers",
    winner: "Summit Strikers",
    result: "Won by 4 Runs",
    summary:
      "Summit Strikers held on in a see-saw finish, defending a small total in the final over.",
    stats: { runs: 346, wickets: 14, motm: "P. Aravind", duration: "3h 15m" },
    modal: {
      banner: IMAGE_POOL[12],
      finalScore: { teamA: "175 / 6", teamB: "171 / 8" },
      timeline: [
        { over: "Over 3", event: "First Boundary" },
        { over: "Over 8", event: "First Wicket" },
        { over: "Over 16", event: "Momentum Swing" },
        { over: "Over 20", event: "Winning Shot" },
      ],
      playerOfMatch: {
        name: "P. Aravind",
        image: IMAGE_POOL[1],
        runs: 68,
        wickets: 2,
        strikeRate: "151.1",
        achievement: "68 with the bat, then closed out the game with the ball.",
      },
      gallery: imgs(12, 1, 3, 8, 5, 10),
      scorecard: {
        teamA: {
          name: "Summit Strikers",
          runs: 175,
          wickets: 6,
          overs: "20.0",
        },
        teamB: { name: "Valley Vipers", runs: 171, wickets: 8, overs: "20.0" },
      },
      facts: [
        { icon: Zap, label: "Longest Six", value: "94m" },
        { icon: Gauge, label: "Fastest Ball", value: "126 km/h" },
        { icon: TrendingUp, label: "Most Runs", value: "68 (Aravind)" },
        { icon: Target, label: "Most Wickets", value: "3 (Vipers - Suresh)" },
        { icon: Star, label: "Best Catch", value: "Long-off, Over 20" },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// SMALL SHARED COMPONENTS
// ---------------------------------------------------------------------------

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
        active
          ? "border-transparent text-slate-950"
          : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {active && (
        <motion.span
          layoutId="highlights-filter-active"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: ACCENT }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function StatPill({ icon: Icon, value }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
      <Icon className="h-3.5 w-3.5" style={{ color: ACCENT }} />
      {value}
    </span>
  );
}

// ---------------------------------------------------------------------------
// MATCH HIGHLIGHT CARD (horizontal: thumbnail + info) — fixed width so it
// behaves identically inside the carousel on every breakpoint.
// ---------------------------------------------------------------------------

function MatchHighlightCard({ match, index, onWatch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 4) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative w-[300px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-[color:var(--accent)]/40 sm:w-[320px]"
      style={{ "--accent": ACCENT }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}44, 0 0 30px 0 ${ACCENT}22` }}
      />

      {/* Thumbnail */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={match.thumbnail}
          alt={`${match.teamA} vs ${match.teamB}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-950"
          style={{ backgroundColor: ACCENT }}
        >
          {BADGE_LABEL[match.category]}
        </span>
        <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[11px] text-slate-200">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" /> {match.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {match.ground}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center justify-center gap-3 text-center">
          <span className="min-w-0 flex-1 truncate text-base font-bold text-white">
            {match.teamA}
          </span>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            vs
          </span>
          <span className="min-w-0 flex-1 truncate text-base font-bold text-white">
            {match.teamB}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3.5 py-2.5">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Winner
            </p>
            <p className="truncate text-sm font-bold" style={{ color: ACCENT }}>
              {match.winner}
            </p>
          </div>
          <Trophy className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
        </div>

        <p className="mt-3 text-xs font-medium text-slate-400">
          {match.result}
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {match.summary}
        </p>

        {/* Highlight stats */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-3">
          <StatPill icon={Zap} value={`${match.stats.runs} Runs`} />
          <StatPill icon={Target} value={`${match.stats.wickets} Wickets`} />
          <StatPill icon={Star} value={match.stats.motm} />
          <StatPill icon={Clock3} value={match.stats.duration} />
        </div>

        <button
          type="button"
          onClick={() => onWatch(match)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold text-slate-950 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
        >
          <PlayCircle className="h-4 w-4" />
          Watch Highlights
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// CAROUSEL ARROW BUTTON — desktop/pointer-only scroll control
// ---------------------------------------------------------------------------

function CarouselArrow({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 backdrop-blur-sm transition-colors duration-200 hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
      style={{ "--accent": ACCENT }}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

// ---------------------------------------------------------------------------
// LIGHTBOX (fullscreen gallery viewer, used inside the modal)
// ---------------------------------------------------------------------------

function Lightbox({ image, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (image) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [image, onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-white/30"
          >
            <X className="h-4 w-4" />
          </button>
          <motion.img
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25 }}
            src={image.src}
            alt={image.label}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
          />
          <span className="absolute bottom-8 rounded-full border border-white/15 bg-black/50 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-sm">
            {image.label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// MATCH HIGHLIGHTS MODAL
// ---------------------------------------------------------------------------

function HighlightsModal({ match, onClose }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    setLightboxImage(null);
  }, [match]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape" && !lightboxImage) onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, lightboxImage]);

  useEffect(() => {
    document.body.style.overflow = match ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [match]);

  if (!match) return null;
  const m = match.modal;

  return (
    <>
      <AnimatePresence>
        {match && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/85 p-3 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)]"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close highlights"
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/30"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex-1 overflow-y-auto">
                {/* Banner */}
                <div className="relative h-56 w-full sm:h-72">
                  <img
                    src={m.banner}
                    alt={`${match.teamA} vs ${match.teamB}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  <span
                    className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-950"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <Trophy className="h-3.5 w-3.5" />
                    {match.winner} Won
                  </span>
                  <div className="absolute bottom-5 left-5 right-16">
                    <h3 className="text-xl font-bold text-white sm:text-2xl">
                      {match.teamA} <span className="text-slate-400">vs</span>{" "}
                      {match.teamB}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                      <span className="font-bold" style={{ color: ACCENT }}>
                        {m.finalScore.teamA}
                      </span>
                      <span className="text-slate-500">—</span>
                      <span className="font-bold" style={{ color: ACCENT }}>
                        {m.finalScore.teamB}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 p-5 sm:p-8">
                  {/* Match Timeline */}
                  <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">
                      Match Timeline
                    </h4>
                    <div className="relative space-y-5 border-l border-white/10 pl-6">
                      {m.timeline.map((t, i) => (
                        <motion.div
                          key={t.over}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="relative"
                        >
                          <span
                            className="absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-slate-950"
                            style={{ backgroundColor: ACCENT }}
                          />
                          <p
                            className="text-xs font-bold uppercase tracking-wide"
                            style={{ color: ACCENT }}
                          >
                            {t.over}
                          </p>
                          <p className="text-sm font-semibold text-white">
                            {t.event}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Player of the Match */}
                  <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">
                      Player of the Match
                    </h4>
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                      <img
                        src={m.playerOfMatch.image}
                        alt={m.playerOfMatch.name}
                        className="h-16 w-16 shrink-0 rounded-full border-2 object-cover sm:h-20 sm:w-20"
                        style={{ borderColor: ACCENT }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <Award
                            className="h-4 w-4"
                            style={{ color: ACCENT }}
                          />
                          <p className="truncate text-base font-bold text-white">
                            {m.playerOfMatch.name}
                          </p>
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {m.playerOfMatch.achievement}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs font-semibold text-slate-300">
                          <span>Runs: {m.playerOfMatch.runs}</span>
                          <span>Wickets: {m.playerOfMatch.wickets}</span>
                          <span>SR: {m.playerOfMatch.strikeRate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Gallery */}
                  <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">
                      Match Gallery
                    </h4>
                    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
                      {m.gallery.map((src, i) => {
                        const label = GALLERY_LABELS[i % GALLERY_LABELS.length];
                        return (
                          <button
                            key={`${match.id}-gallery-${i}`}
                            type="button"
                            onClick={() => setLightboxImage({ src, label })}
                            className="group relative h-28 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10"
                          >
                            <img
                              src={src}
                              alt={label}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                            <span className="absolute bottom-2 left-2 text-[11px] font-semibold text-white">
                              {label}
                            </span>
                            <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                              <Maximize2 className="h-3 w-3 text-white" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Match Scorecard */}
                  <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">
                      Match Scorecard
                    </h4>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      {[m.scorecard.teamA, m.scorecard.teamB].map((team, i) => (
                        <div
                          key={team.name}
                          className={`flex items-center justify-between px-5 py-4 ${
                            i === 0 ? "border-b border-white/10" : ""
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="min-w-0 truncate text-sm font-bold text-white">
                              {team.name}
                            </span>
                            {match.winner === team.name && (
                              <Trophy
                                className="h-3.5 w-3.5 shrink-0"
                                style={{ color: ACCENT }}
                              />
                            )}
                          </div>
                          <div className="flex shrink-0 items-center gap-4 text-xs text-slate-300">
                            <span className="font-bold text-white">
                              {team.runs}/{team.wickets}
                            </span>
                            <span className="text-slate-500">
                              {team.overs} overs
                            </span>
                          </div>
                        </div>
                      ))}
                      <div
                        className="flex items-center justify-center gap-2 border-t border-white/10 px-5 py-3 text-xs font-semibold"
                        style={{ color: ACCENT }}
                      >
                        <Trophy className="h-3.5 w-3.5" />
                        {match.winner} — {match.result}
                      </div>
                    </div>
                  </div>

                  {/* Match Facts */}
                  <div>
                    <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-300">
                      Match Facts
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                      {m.facts.map((fact) => (
                        <div
                          key={fact.label}
                          className="rounded-xl border border-white/10 bg-white/5 p-3.5"
                        >
                          <fact.icon
                            className="mb-2 h-4 w-4"
                            style={{ color: ACCENT }}
                          />
                          <p className="text-sm font-bold text-white">
                            {fact.value}
                          </p>
                          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                            {fact.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function MatchHighlights() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const filteredMatches = useMemo(() => {
    if (activeFilter === "all") return MATCHES;
    return MATCHES.filter((m) => m.category === activeFilter);
  }, [activeFilter]);

  const openHighlights = useCallback((match) => setSelectedMatch(match), []);
  const closeHighlights = useCallback(() => setSelectedMatch(null), []);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    // Reset scroll position whenever the filtered set changes so the arrow
    // state matches the new track.
    const el = trackRef.current;
    if (el) el.scrollTo({ left: 0 });
    const id = requestAnimationFrame(updateScrollState);
    return () => cancelAnimationFrame(id);
  }, [activeFilter, updateScrollState]);

  const scrollByCard = useCallback((direction) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = 320 + 20; // card width + gap, matches card sizing below
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-8 lg:px-16">
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-10 blur-[120px]"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* -------------------------------------------------------------- */}
        {/* SECTION HEADER                                                   */}
        {/* -------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-200 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            Match Highlights
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Relive Every Cricket Moment
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            Watch the best moments, winning shots, wickets, celebrations, and
            unforgettable memories from previous matches played at Stream Side,
            Yelagiri Hills.
          </p>
        </motion.div>

        {/* -------------------------------------------------------------- */}
        {/* TOP FILTER TABS                                                  */}
        {/* -------------------------------------------------------------- */}
        <div className="no-scrollbar mt-10 flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.value}
              label={f.label}
              active={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
            />
          ))}
        </div>

        {/* -------------------------------------------------------------- */}
        {/* MATCH HIGHLIGHT CARDS — one horizontal carousel on every        */}
        {/* breakpoint. Arrow buttons appear on sm+ for pointer devices;    */}
        {/* touch devices swipe the track directly.                        */}
        {/* -------------------------------------------------------------- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-10"
          >
            {filteredMatches.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 py-20 text-center">
                <Aperture className="mx-auto mb-3 h-6 w-6 text-slate-500" />
                <p className="text-slate-300">
                  No highlights in this category yet.
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <CarouselArrow
                  direction="left"
                  onClick={() => scrollByCard("left")}
                  disabled={!canScrollLeft}
                />

                <div
                  ref={trackRef}
                  onScroll={updateScrollState}
                  className="no-scrollbar flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
                >
                  {filteredMatches.map((match, i) => (
                    <MatchHighlightCard
                      key={match.id}
                      match={match}
                      index={i}
                      onWatch={openHighlights}
                    />
                  ))}
                </div>

                <CarouselArrow
                  direction="right"
                  onClick={() => scrollByCard("right")}
                  disabled={!canScrollRight}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <HighlightsModal match={selectedMatch} onClose={closeHighlights} />
    </section>
  );
}
