"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Trophy } from "lucide-react";

/* ============================================================================
   CRICKET PLAYER STATS — Stream Side Cricket page
   ----------------------------------------------------------------------------
   Premium horizontal carousel of player cards. Visually matches the
   CommunityGallery "Video Highlights" VideoCard: image-first card, dark
   gradient overlay, lime hover border/glow, top-right metadata badge,
   center circular icon, bottom text overlay. Same dark-navy + lime visual
   language as the rest of Stream Side. Self-contained, data-driven, ready
   for API data via the `players` prop.
   ============================================================================ */

const ACCENT = "#B7FF00";

const PLAYERS = [
  {
    id: "player-1",
    name: "Arun Kumar",
    role: "All-Rounder",
    team: "Stream Strikers",
    rating: 842,
    matches: 24,
    runs: 486,
    wickets: 31,
    mvp: 8,
    form: ["W", "W", "L", "W", "W"],
    avatar: "/images/players/arun.jpg",
    coverImage: "/images/players/arun-cover.jpg",
  },
  {
    id: "player-2",
    name: "Karthik Raja",
    role: "Batsman",
    team: "Hill Warriors",
    rating: 798,
    matches: 21,
    runs: 521,
    wickets: 8,
    mvp: 5,
    form: ["W", "L", "W", "W", "W"],
    avatar: "/images/players/karthik.jpg",
    coverImage: "/images/players/karthik-cover.jpg",
  },
  {
    id: "player-3",
    name: "Vignesh S",
    role: "Bowler",
    team: "Forest Riders",
    rating: 765,
    matches: 26,
    runs: 142,
    wickets: 44,
    mvp: 6,
    form: ["W", "W", "W", "L", "W"],
    avatar: "/images/players/vignesh.jpg",
    coverImage: "/images/players/vignesh-cover.jpg",
  },
  {
    id: "player-4",
    name: "Deepak M",
    role: "Wicket Keeper",
    team: "Mountain Kings",
    rating: 731,
    matches: 19,
    runs: 398,
    wickets: 2,
    mvp: 3,
    form: ["L", "W", "W", "W", "L"],
    avatar: "/images/players/deepak.jpg",
    coverImage: "/images/players/deepak-cover.jpg",
  },
  {
    id: "player-5",
    name: "Rahul Nair",
    role: "All-Rounder",
    team: "Valley Smashers",
    rating: 810,
    matches: 23,
    runs: 455,
    wickets: 19,
    mvp: 7,
    form: ["W", "W", "W", "W", "L"],
    avatar: "/images/players/rahul.jpg",
    coverImage: "/images/players/rahul-cover.jpg",
  },
  {
    id: "player-6",
    name: "Sanjay P",
    role: "Batsman",
    team: "Free Agent",
    rating: 688,
    matches: 15,
    runs: 302,
    wickets: 0,
    mvp: 2,
    form: ["L", "L", "W", "W", "L"],
    avatar: "/images/players/sanjay.jpg",
    coverImage: "/images/players/sanjay-cover.jpg",
  },
];

/* ==================================================
   PLAYER CARD — visually matches CommunityGallery's VideoCard.
   Same dimensions, gradient overlay, hover glow, badge, center icon,
   and bottom text-overlay placement. Only the content differs.
   ================================================== */

function PlayerCard({ player, onPlayerClick }) {
  return (
    <motion.button
      type="button"
      onClick={() => onPlayerClick?.(player)}
      whileHover={{ y: -6 }}
      aria-label={`View player profile for ${player.name}`}
      className="group relative flex h-48 w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-4 text-left sm:w-80"
    >
      {/* ambient lime wash, keeps the flat card from feeling empty */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(183,255,0,0.08), transparent 65%)",
        }}
      />

      <span
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}55, 0 0 26px 0 ${ACCENT}28` }}
      />

      {/* top row: avatar + name on the left, rating badge on the right */}
      <div className="relative flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {player.avatar && (
            <img
              src={player.avatar}
              alt=""
              aria-hidden="true"
              className="h-8 w-8 shrink-0 rounded-full border border-white/40 object-cover"
            />
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">
              {player.name}
            </p>
            <p className="truncate text-xs text-slate-400">{player.role}</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
          <Star className="h-3 w-3 fill-current" style={{ color: ACCENT }} />
          {player.rating}
        </span>
      </div>

      {/* center: trophy icon, properly centered in the remaining space */}
      <div className="relative flex flex-1 items-center justify-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Trophy className="h-5 w-5" style={{ color: ACCENT }} />
        </span>
      </div>

      {/* bottom: team + compact stats line */}
      <div className="relative">
        <p className="truncate text-xs font-semibold text-slate-300">
          {player.team}
        </p>
        <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
          <span>{player.matches} Matches</span>
          <span>•</span>
          <span>{player.runs} Runs</span>
          <span>•</span>
          <span>{player.wickets} Wickets</span>
        </div>
      </div>
    </motion.button>
  );
}

/* ==================================================
   SKELETON CARD — loading state, matches new card dimensions.
   ================================================== */

function SkeletonCard() {
  return (
    <div className="h-48 w-72 shrink-0 animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 sm:w-80" />
  );
}

/* ==================================================
   MAIN COMPONENT
   ================================================== */

export default function CricketPlayerStats({
  players = PLAYERS,
  loading = false,
  onPlayerClick,
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const cardCount = useMemo(() => players.length, [players]);

  const scrollByCard = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 320;
    el.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 320;
    const gap = 20;
    setActiveIndex(Math.round(el.scrollLeft / (cardWidth + gap)));
  }, []);

  const scrollToIndex = useCallback((i) => {
    const el = scrollRef.current;
    if (!el) return;
    el.children[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  return (
    <section className="relative w-full overflow-hidden px-4 py-16 sm:px-8 sm:py-20 lg:px-16">
      {/* extremely subtle radial lime glow, does not alter page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(163,255,0,0.06), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-300">
              Cricket Community
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Player Stats{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${ACCENT}, #6ee7b7)`,
                }}
              >
                That Matter.
              </span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              Track performances, discover standout players and follow the
              players shaping the Stream Side cricket community.
            </p>
          </div>

          {!loading && players.length > 0 && (
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label="Previous players"
                onClick={() => scrollByCard(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-lime-400/50 hover:text-lime-300"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next players"
                onClick={() => scrollByCard(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-lime-400/50 hover:text-lime-300"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        {/* carousel */}
        <div className="relative mt-10">
          {loading ? (
            <div className="flex gap-5 overflow-hidden pb-2">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : cardCount === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 py-16 text-center text-sm text-slate-400">
              No player statistics available yet.
            </div>
          ) : (
            <>
              <div className="pointer-events-none absolute -left-4 top-0 bottom-0 z-20 w-10 bg-gradient-to-r from-slate-950 to-transparent sm:-left-8 sm:w-16" />
              <div className="pointer-events-none absolute -right-4 top-0 bottom-0 z-20 w-10 bg-gradient-to-l from-slate-950 to-transparent sm:-right-8 sm:w-16" />

              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
              >
                {players.map((player, i) => (
                  <motion.div
                    key={player.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: 0.05 * i }}
                    className="contents"
                  >
                    <PlayerCard player={player} onPlayerClick={onPlayerClick} />
                  </motion.div>
                ))}
              </div>

              {cardCount > 1 && (
                <div className="mt-6 flex items-center justify-center gap-1.5">
                  {players.map((player, i) => (
                    <button
                      key={player.id}
                      type="button"
                      aria-label={`Go to ${player.name}`}
                      aria-current={i === activeIndex}
                      onClick={() => scrollToIndex(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === activeIndex
                          ? "w-6 bg-lime-400"
                          : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

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
