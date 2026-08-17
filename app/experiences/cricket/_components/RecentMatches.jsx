"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";

/* ============================================================================
   RECENT MATCHES — Stream Side Cricket
   ----------------------------------------------------------------------------
   Standalone, self-contained component. The carousel mechanics (CarouselArrow
   + HorizontalSlider: horizontal snap-scroll, hidden scrollbar, edge-aware
   arrow disable state, card width breakpoints) are copied verbatim from
   GalleryVideos so behavior matches exactly — nothing there was modified.

   Per the brief, this stays lightweight on purpose: no Framer Motion, no
   card-movement animation, no auto-play, no scroll-position tracking beyond
   what the arrows need. Hover is CSS-only (border/background shift).

   Swap RECENT_MATCHES for a real matches API later — the shape below
   (teamA/teamB score+overs, winner, result, status) is what that endpoint
   should return.
   ============================================================================ */

const ACCENT = "#B7FF00";

const RECENT_MATCHES = [
  {
    id: 1,
    matchType: "Individual Match",
    venue: "Sekkarakudi, Tuticorin",
    distance: "28.94 KM",
    date: "14 Aug 2026",
    format: "10 Ov.",
    teamA: { name: "Immortal CC", score: "72/3", overs: "10.0" },
    teamB: { name: "PMK NORTH(Skd) CC", score: "73/5", overs: "7.5" },
    winner: "PMK NORTH(Skd) CC",
    result: "won by 5 wickets",
    status: "Past",
  },
  {
    id: 2,
    matchType: "Friendly Match",
    venue: "Yelagiri Hills Ground",
    distance: "3.20 KM",
    date: "10 Aug 2026",
    format: "10 Ov.",
    teamA: { name: "Forest Riders", score: "96/6", overs: "10.0" },
    teamB: { name: "Hill Strikers", score: "98/4", overs: "7.2" },
    winner: "Hill Strikers",
    result: "won by 6 wickets",
    status: "Past",
  },
  {
    id: 3,
    matchType: "League Match",
    venue: "Valley Ground, Yelagiri",
    distance: "12.60 KM",
    date: "08 Aug 2026",
    format: "10 Ov.",
    teamA: { name: "Mountain Kings", score: "142/8", overs: "10.0" },
    teamB: { name: "Nature Warriors", score: "138/9", overs: "10.0" },
    winner: "Mountain Kings",
    result: "won by 4 runs",
    status: "Past",
  },
  {
    id: 4,
    matchType: "Weekend Match",
    venue: "Forest Cricket Park",
    distance: "45.10 KM",
    date: "05 Aug 2026",
    format: "10 Ov.",
    teamA: { name: "Sunrise XI", score: "58/3", overs: "10.0" },
    teamB: { name: "Valley Smashers", score: "59/2", overs: "5.4" },
    winner: "Valley Smashers",
    result: "won by 8 wickets",
    status: "Past",
  },
  {
    id: 5,
    matchType: "Tournament Match",
    venue: "Yelagiri Cricket Arena",
    distance: "19.80 KM",
    date: "01 Aug 2026",
    format: "10 Ov.",
    teamA: { name: "Summit Strikers", score: "175/6", overs: "10.0" },
    teamB: { name: "Cloud Warriors", score: "168/9", overs: "10.0" },
    winner: "Summit Strikers",
    result: "won by 7 runs",
    status: "Past",
  },
  {
    id: 6,
    matchType: "Individual Match",
    venue: "Hillside Ground",
    distance: "7.40 KM",
    date: "29 Jul 2026",
    format: "10 Ov.",
    teamA: { name: "Highland XI", score: "88/5", overs: "10.0" },
    teamB: { name: "Lakeview Kings", score: "89/3", overs: "9.1" },
    winner: "Lakeview Kings",
    result: "won by 7 wickets",
    status: "Past",
  },
];

/* -------------------------------------------------------------------------- */
/*  CarouselArrow + HorizontalSlider — copied as-is from GalleryVideos        */
/* -------------------------------------------------------------------------- */

function CarouselArrow({ direction, onClick, disabled }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous matches" : "Next matches"}
      className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-200 backdrop-blur-sm transition-colors duration-200 hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-30 sm:flex"
      style={{ "--accent": ACCENT }}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function HorizontalSlider({ children, scrollAmount = 320 }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [update, children]);

  const scrollBy = useCallback(
    (direction) => {
      const el = trackRef.current;
      if (!el) return;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    [scrollAmount],
  );

  return (
    <div className="flex items-center gap-3">
      <CarouselArrow
        direction="left"
        onClick={() => scrollBy("left")}
        disabled={!canLeft}
      />
      <div
        ref={trackRef}
        onScroll={update}
        className="no-scrollbar flex flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {children}
      </div>
      <CarouselArrow
        direction="right"
        onClick={() => scrollBy("right")}
        disabled={!canRight}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ScoreRow                                                                  */
/* -------------------------------------------------------------------------- */

function ScoreRow({ name, score, overs, isWinner }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className={
          isWinner
            ? "truncate text-sm font-bold text-white"
            : "truncate text-sm font-medium text-slate-400"
        }
      >
        {name}
      </span>
      <span className="flex shrink-0 items-baseline gap-1.5">
        <span
          className="text-base font-bold tabular-nums"
          style={{ color: isWinner ? ACCENT : "#f1f5f9" }}
        >
          {score}
        </span>
        <span className="text-xs tabular-nums text-slate-500">({overs})</span>
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  RecentMatchCard                                                           */
/* -------------------------------------------------------------------------- */

function RecentMatchCard({ match }) {
  return (
    <article className="flex w-[85vw] shrink-0 snap-start flex-col pt-4 overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/70 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)] transition-colors duration-200 hover:border-lime-400/40 hover:bg-slate-900/90 sm:w-[46%] lg:w-[31%]">
      {/* Top row */}
      {/* <div className="flex items-center justify-between gap-3 border-b border-slate-700/50 px-5 py-3.5">
        <span className="truncate text-sm font-semibold text-white">
          {match.matchType}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-slate-400">
          <MapPin
            className="h-3.5 w-3.5"
            style={{ color: ACCENT }}
            aria-hidden="true"
          />
          {match.distance}
        </span>
      </div> */}

      {/* Match info + scores */}
      <div className="flex-1 px-5 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs leading-relaxed text-slate-400">
            {match.venue}
            <span className="mx-1.5 text-slate-600">·</span>
            {match.date}
            <span className="mx-1.5 text-slate-600">·</span>
            {match.format}
          </p>
          {/* <span className="shrink-0 rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
            {match.status}
          </span> */}
        </div>

        <div className="mt-4 space-y-2.5">
          <ScoreRow
            name={match.teamA.name}
            score={match.teamA.score}
            overs={match.teamA.overs}
            isWinner={match.winner === match.teamA.name}
          />
          <ScoreRow
            name={match.teamB.name}
            score={match.teamB.score}
            overs={match.teamB.overs}
            isWinner={match.winner === match.teamB.name}
          />
        </div>
      </div>

      {/* Result footer */}
      <div className="mt-5 lg:mt-7 bg-slate-800/60 px-5 py-3.5 ">
        <p className="text-sm text-slate-300">
          <span className="font-semibold" style={{ color: ACCENT }}>
            {match.winner}
          </span>{" "}
          {match.result}
        </p>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  RecentMatches — main component                                           */
/* -------------------------------------------------------------------------- */

export default function RecentMatches({ matches = RECENT_MATCHES }) {
  return (
    <section className="relative w-full overflow-hidden bg-slate-950 px-4 pt-2 pb-10 text-white sm:px-8 lg:px-6">
      <div className="relative">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            {/* Section Label */}
            <div className="mb-3 flex items-center gap-3 pl-0 md:pl-12">
              <span className="h-px w-10" style={{ backgroundColor: ACCENT }} />

              <span
                className="text-[12px] md:text-sm font-semibold uppercase tracking-[0.2em]"
                style={{ color: ACCENT }}
              >
                Match Day
              </span>
            </div>

            {/* Main Heading */}
            <h3 className="text-4xl pl-0 md:pl-12 font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Recent Matches
            </h3>
          </div>
        </div>

        <HorizontalSlider scrollAmount={320}>
          {matches.map((match) => (
            <RecentMatchCard key={match.id} match={match} />
          ))}
        </HorizontalSlider>
      </div>

      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
    </section>
  );
}
