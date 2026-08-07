"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Video,
  Heart,
  MessageCircle,
  Share2,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Trophy,
  Award,
  Sparkles,
  UploadCloud,
  ShieldCheck,
  BadgeCheck,
  MapPin,
  CalendarDays,
  Info,
  Aperture,
  Sunrise,
  Sunset,
  TreePine,
  Compass,
  Star,
  Eye,
} from "lucide-react";

/* ============================================================================
   COMMUNITY GALLERY — Stream Side Cricket
   ----------------------------------------------------------------------------
   Single, self-contained, production-ready component. No backend — every
   photo, video, user, and stat below is realistic dummy content. Sits after
   Cricket Guide / Facilities and before Cricket FAQ. Mirrors the site's
   established language: bg-slate-950 / glassmorphism / #B7FF00 accent /
   animated filter chips / horizontal snap sliders with arrow controls, the
   same conventions used across PhotographyActivities, PhotographyLocations,
   and MatchHighlights.
   ============================================================================ */

const ACCENT = "#B7FF00";

// ---------------------------------------------------------------------------
// SHARED IMAGE POOL — dummy community photography
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
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
];

function img(i) {
  return IMAGE_POOL[i % IMAGE_POOL.length];
}

function avatar(seed) {
  return `https://i.pravatar.cc/100?img=${seed}`;
}

// ---------------------------------------------------------------------------
// STATIC REFERENCE DATA
// ---------------------------------------------------------------------------

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Match Moments", value: "match" },
  { label: "Practice", value: "practice" },
  { label: "Tournament", value: "tournament" },
  { label: "Team Photos", value: "team" },
  { label: "Ground Views", value: "ground" },
  { label: "Videos", value: "video" },
  { label: "Community Uploads", value: "community" },
  { label: "Top Picks", value: "top" },
];

const SOURCE_LABEL = {
  official: "Official Upload",
  community: "Community Upload",
  team: "Team Upload",
  tournament: "Tournament",
  admin: "Admin Upload",
};

const SOURCE_ICON = {
  official: BadgeCheck,
  community: Users,
  team: ShieldCheck,
  tournament: Trophy,
  admin: Sparkles,
};

// Main masonry gallery — mixed photos + videos, every filter category represented.
const GALLERY_ITEMS = [
  {
    id: "g1",
    type: "photo",
    category: "match",
    source: "official",
    image: img(0),
    aspect: "aspect-[4/5]",
    user: "Stream Side Team",
    avatar: avatar(12),
    date: "2 days ago",
    match: "Forest Riders vs Hill Strikers",
    ground: "Stream Side Arena",
    likes: 482,
    comments: 36,
  },
  {
    id: "g2",
    type: "photo",
    category: "practice",
    source: "community",
    image: img(6),
    aspect: "aspect-square",
    user: "Arun K.",
    avatar: avatar(23),
    date: "5 days ago",
    match: "Morning Nets",
    ground: "Hillside Ground",
    likes: 96,
    comments: 8,
  },
  {
    id: "g3",
    type: "video",
    category: "video",
    source: "official",
    image: img(1),
    aspect: "aspect-video",
    duration: "1:24",
    user: "Stream Side Team",
    avatar: avatar(12),
    date: "1 week ago",
    match: "Nature Warriors vs Mountain Kings",
    ground: "Valley Ground",
    likes: 640,
    comments: 54,
  },
  {
    id: "g4",
    type: "photo",
    category: "team",
    source: "team",
    image: img(4),
    aspect: "aspect-[3/4]",
    user: "Hill Strikers CC",
    avatar: avatar(31),
    date: "1 week ago",
    match: "Squad Photo",
    ground: "Stream Side Arena",
    likes: 214,
    comments: 19,
  },
  {
    id: "g5",
    type: "photo",
    category: "ground",
    source: "official",
    image: img(2),
    aspect: "aspect-[4/5]",
    user: "Stream Side Team",
    avatar: avatar(12),
    date: "2 weeks ago",
    match: "Drone View",
    ground: "Forest Cricket Ground",
    likes: 351,
    comments: 22,
  },
  {
    id: "g6",
    type: "photo",
    category: "tournament",
    source: "tournament",
    image: img(9),
    aspect: "aspect-square",
    user: "Yelagiri Cup",
    avatar: avatar(45),
    date: "2 weeks ago",
    match: "Summit Strikers vs Valley Vipers",
    ground: "Yelagiri Cricket Arena",
    likes: 305,
    comments: 27,
  },
  {
    id: "g7",
    type: "photo",
    category: "community",
    source: "community",
    image: img(11),
    aspect: "aspect-[3/4]",
    user: "Divya R.",
    avatar: avatar(47),
    date: "3 weeks ago",
    match: "Weekend Friendly",
    ground: "Nature Cricket Ground",
    likes: 128,
    comments: 11,
  },
  {
    id: "g8",
    type: "photo",
    category: "match",
    source: "admin",
    image: img(3),
    aspect: "aspect-square",
    user: "Stream Side Admin",
    avatar: avatar(5),
    date: "3 weeks ago",
    match: "Sunrise XI vs Valley Smashers",
    ground: "Forest Cricket Park",
    likes: 388,
    comments: 30,
  },
  {
    id: "g9",
    type: "photo",
    category: "top",
    source: "community",
    image: img(7),
    aspect: "aspect-[4/5]",
    user: "Karthik M.",
    avatar: avatar(52),
    date: "1 month ago",
    match: "Last-ball Finish",
    ground: "Lakeview Ground",
    likes: 902,
    comments: 71,
  },
  {
    id: "g10",
    type: "video",
    category: "video",
    source: "team",
    image: img(5),
    aspect: "aspect-video",
    duration: "0:48",
    user: "Ridge Riders",
    avatar: avatar(18),
    date: "1 month ago",
    match: "Winning Six",
    ground: "Hillside Ground",
    likes: 512,
    comments: 44,
  },
  {
    id: "g11",
    type: "photo",
    category: "practice",
    source: "community",
    image: img(13),
    aspect: "aspect-square",
    user: "Naveen S.",
    avatar: avatar(60),
    date: "1 month ago",
    match: "Evening Practice",
    ground: "Tea Estate Ground",
    likes: 74,
    comments: 6,
  },
  {
    id: "g12",
    type: "photo",
    category: "ground",
    source: "official",
    image: img(14),
    aspect: "aspect-[3/4]",
    user: "Stream Side Team",
    avatar: avatar(12),
    date: "5 weeks ago",
    match: "Sunset over the Pitch",
    ground: "Forest Cricket Ground",
    likes: 421,
    comments: 33,
  },
  {
    id: "g13",
    type: "photo",
    category: "team",
    source: "team",
    image: img(8),
    aspect: "aspect-square",
    user: "Pine Grove Panthers",
    avatar: avatar(29),
    date: "6 weeks ago",
    match: "Trophy Celebration",
    ground: "Nature Cricket Ground",
    likes: 276,
    comments: 25,
  },
  {
    id: "g14",
    type: "photo",
    category: "top",
    source: "admin",
    image: img(10),
    aspect: "aspect-[4/5]",
    user: "Stream Side Admin",
    avatar: avatar(5),
    date: "6 weeks ago",
    match: "Golden Hour Wicket",
    ground: "Valley Ground",
    likes: 764,
    comments: 58,
  },
];

// Top Picks — most-liked community uploads, shown as a featured slider.
const TOP_PICKS = [...GALLERY_ITEMS]
  .sort((a, b) => b.likes - a.likes)
  .slice(0, 6);

// Dedicated Video Highlights slider.
const VIDEO_HIGHLIGHTS = [
  {
    id: "v1",
    image: img(1),
    duration: "1:24",
    title: "Last Over Thriller",
    user: "Stream Side Team",
  },
  {
    id: "v2",
    image: img(5),
    duration: "0:48",
    title: "Winning Six",
    user: "Ridge Riders",
  },
  {
    id: "v3",
    image: img(9),
    duration: "2:10",
    title: "Tournament Final Recap",
    user: "Yelagiri Cup",
  },
  {
    id: "v4",
    image: img(2),
    duration: "1:05",
    title: "Hat-trick Highlights",
    user: "Highland XI",
  },
  {
    id: "v5",
    image: img(6),
    duration: "0:36",
    title: "Best Catch of the Season",
    user: "Community Upload",
  },
];

// Team Memories.
const TEAM_MEMORIES = [
  { id: "t1", label: "Winning Team", image: img(4), icon: Trophy },
  { id: "t2", label: "Runner-up Team", image: img(8), icon: Award },
  { id: "t3", label: "Group Photos", image: img(13), icon: Users },
  { id: "t4", label: "Celebration", image: img(9), icon: Sparkles },
  { id: "t5", label: "Award Ceremony", image: img(3), icon: BadgeCheck },
  { id: "t6", label: "Captain Moments", image: img(11), icon: ShieldCheck },
];

// Ground Gallery.
const GROUND_GALLERY = [
  { id: "gr1", label: "Drone Views", image: img(2), icon: Compass },
  { id: "gr2", label: "Sunrise Ground", image: img(0), icon: Sunrise },
  { id: "gr3", label: "Sunset Matches", image: img(14), icon: Sunset },
  { id: "gr4", label: "Forest Cricket Ground", image: img(7), icon: TreePine },
  { id: "gr5", label: "Nature Views", image: img(10), icon: Aperture },
];

// Community Stats.
const COMMUNITY_STATS = [
  { icon: Camera, value: "1500+", label: "Photos Shared" },
  { icon: Video, value: "250+", label: "Videos Uploaded" },
  { icon: Heart, value: "25K+", label: "Likes" },
  { icon: Users, value: "800+", label: "Community Members" },
  { icon: Trophy, value: "300+", label: "Matches Captured" },
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
          layoutId="community-filter-active"
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: ACCENT }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function SourceBadge({ source }) {
  const Icon = SOURCE_ICON[source] || Users;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
      <Icon className="h-3 w-3" style={{ color: ACCENT }} />
      {SOURCE_LABEL[source] || "Community Upload"}
    </span>
  );
}

function SectionHeader({ badge, title, description, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-xl text-left"
      }
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-200 backdrop-blur-sm">
        {badge}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}

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

// Generic horizontal snap-scroll slider with edge-aware arrow controls.
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

function AnimatedLike({ liked, count, onToggle, light = false }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
        light ? "text-white" : "text-slate-300"
      }`}
    >
      <motion.span whileTap={{ scale: 1.3 }} className="flex items-center">
        <Heart
          className="h-3.5 w-3.5"
          fill={liked ? ACCENT : "transparent"}
          style={{ color: liked ? ACCENT : "currentColor" }}
        />
      </motion.span>
      {count.toLocaleString()}
    </button>
  );
}

// ---------------------------------------------------------------------------
// MASONRY GALLERY CARD
// ---------------------------------------------------------------------------

function GalleryCard({ item, index, onOpen }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likes);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 6) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-[color:var(--accent)]/40"
      style={{ "--accent": ACCENT }}
    >
      <div
        className="pointer-events-none absolute -inset-px z-20 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}44, 0 0 28px 0 ${ACCENT}22` }}
      />

      <button
        type="button"
        onClick={() => onOpen(item)}
        className={`relative block w-full overflow-hidden ${item.aspect}`}
      >
        <img
          src={item.image}
          alt={item.match}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10 opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

        {/* Top row: source badge + type */}
        <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
          <SourceBadge source={item.source} />
          {item.type === "video" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/70 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
              <Video className="h-3 w-3" style={{ color: ACCENT }} />
              {item.duration}
            </span>
          )}
        </div>

        {/* Video play icon */}
        {item.type === "video" && (
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 opacity-90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
          </span>
        )}

        {/* Bottom info */}
        <div className="absolute inset-x-3 bottom-3 text-left">
          <div className="mb-2 flex items-center gap-2">
            <img
              src={item.avatar}
              alt={item.user}
              className="h-6 w-6 rounded-full border border-white/40 object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-white">
                {item.user}
              </p>
              <p className="text-[10px] text-slate-300">{item.date}</p>
            </div>
          </div>
          <p className="truncate text-[11px] font-semibold text-slate-100">
            {item.match}
          </p>
          <p className="flex items-center gap-1 truncate text-[10px] text-slate-400">
            <MapPin className="h-2.5 w-2.5 shrink-0" />
            {item.ground}
          </p>
        </div>

        {/* Action buttons — fade in on hover */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span
            role="button"
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              setLiked((v) => !v);
              setLikeCount((c) => c + (liked ? -1 : 1));
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
          >
            <Heart
              className="h-3.5 w-3.5"
              fill={liked ? ACCENT : "transparent"}
              style={{ color: liked ? ACCENT : "#fff" }}
            />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
            <MessageCircle className="h-3.5 w-3.5 text-white" />
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
            <Share2 className="h-3.5 w-3.5 text-white" />
          </span>
        </div>
      </button>

      {/* Static footer stats row (always visible, below the image) */}
      <div className="flex items-center justify-between px-3.5 py-2.5">
        <AnimatedLike
          liked={liked}
          count={likeCount}
          onToggle={() => {
            setLiked((v) => !v);
            setLikeCount((c) => c + (liked ? -1 : 1));
          }}
        />
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <MessageCircle className="h-3.5 w-3.5" />
          {item.comments}
        </span>
        <button
          type="button"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// TOP PICKS — featured horizontal slider
// ---------------------------------------------------------------------------

function TopPickCard({ item, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item)}
      whileHover={{ y: -6 }}
      className="group relative h-80 w-72 shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] sm:w-80"
    >
      <img
        src={item.image}
        alt={item.match}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1.5px ${ACCENT}66, 0 0 34px 0 ${ACCENT}33` }}
      />
      <span
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-950"
        style={{ backgroundColor: ACCENT }}
      >
        <Star className="h-3 w-3 fill-current" />
        Top Pick
      </span>
      <div className="absolute inset-x-4 bottom-4">
        <div className="mb-2 flex items-center gap-2">
          <img
            src={item.avatar}
            alt={item.user}
            className="h-7 w-7 rounded-full border border-white/40 object-cover"
          />
          <p className="truncate text-sm font-bold text-white">{item.user}</p>
        </div>
        <p className="truncate text-sm font-semibold text-slate-100">
          {item.match}
        </p>
        <div className="mt-2 flex items-center gap-4 text-xs text-slate-300">
          <span className="flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" style={{ color: ACCENT }} />
            {item.likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            {item.comments}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// VIDEO HIGHLIGHTS — horizontal slider
// ---------------------------------------------------------------------------

function VideoCard({ video, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(video)}
      whileHover={{ y: -6 }}
      className="group relative h-48 w-72 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 text-left sm:w-80"
    >
      <img
        src={video.image}
        alt={video.title}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <span
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}55, 0 0 26px 0 ${ACCENT}28` }}
      />
      <span className="absolute right-3 top-3 rounded-full bg-black/65 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
        {video.duration}
      </span>
      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
        <Play className="ml-0.5 h-5 w-5 fill-white text-white" />
      </span>
      <div className="absolute inset-x-3 bottom-3">
        <p className="truncate text-sm font-bold text-white">{video.title}</p>
        <p className="truncate text-xs text-slate-300">{video.user}</p>
      </div>
    </motion.button>
  );
}

// ---------------------------------------------------------------------------
// TEAM MEMORIES
// ---------------------------------------------------------------------------

function TeamMemoryCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      className="group relative h-48 w-[46vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 sm:w-56"
    >
      <img
        src={item.image}
        alt={item.label}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border"
          style={{
            borderColor: `${ACCENT}55`,
            backgroundColor: "rgba(2,6,23,0.5)",
          }}
        >
          <Icon className="h-4 w-4" style={{ color: ACCENT }} />
        </span>
        <p className="text-sm font-bold text-white">{item.label}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// GROUND GALLERY
// ---------------------------------------------------------------------------

function GroundCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      className="group relative h-56 w-[46vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 sm:w-64"
    >
      <img
        src={item.image}
        alt={item.label}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color: ACCENT }} />
        <p className="text-sm font-bold text-white">{item.label}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// COMMUNITY STATS
// ---------------------------------------------------------------------------

function StatGlassCard({ icon: Icon, value, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -5 }}
      className="group relative flex h-[168px] flex-col items-center justify-center gap-2.5 overflow-hidden rounded-[22px] border border-white/10 bg-black/35 px-4 text-center shadow-[0_12px_34px_-14px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-colors duration-300 hover:border-[color:var(--accent)]/40"
      style={{ "--accent": ACCENT }}
    >
      <div
        className="pointer-events-none absolute -bottom-8 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-30"
        style={{ backgroundColor: ACCENT }}
      />
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
        <Icon className="h-4.5 w-4.5" style={{ color: ACCENT }} />
      </span>
      <div className="text-2xl font-extrabold text-white sm:text-[26px]">
        {value}
      </div>
      <div className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-slate-400 sm:text-[11px]">
        {label}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// LIGHTBOX — fullscreen image viewer with prev/next/download/share/like/details
// ---------------------------------------------------------------------------

function Lightbox({ items, activeId, onClose, onNavigate }) {
  const index = items.findIndex((i) => i.id === activeId);
  const item = index >= 0 ? items[index] : null;
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item?.likes || 0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setLiked(false);
    setLikeCount(item?.likes || 0);
    setShowDetails(false);
  }, [activeId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    function handleKey(e) {
      if (!item) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate(-1);
      if (e.key === "ArrowRight") onNavigate(1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [item, onClose, onNavigate]);

  useEffect(() => {
    document.body.style.overflow = item ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [item]);

  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/92 p-3 backdrop-blur-md sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/30"
        >
          <X className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(-1);
          }}
          aria-label="Previous"
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/30 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(1);
          }}
          aria-label="Next"
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/30 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] lg:flex-row"
        >
          <div className="relative flex max-h-[50vh] w-full items-center justify-center bg-black lg:max-h-[90vh] lg:w-2/3">
            <img
              src={item.image}
              alt={item.match}
              className="max-h-[50vh] w-full object-contain lg:max-h-[90vh]"
            />
          </div>

          <div className="flex w-full flex-col lg:w-1/3">
            <div className="flex items-center gap-3 border-b border-white/10 p-5">
              <img
                src={item.avatar}
                alt={item.user}
                className="h-10 w-10 rounded-full border border-white/15 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white">
                  {item.user}
                </p>
                <p className="text-[11px] text-slate-400">{item.date}</p>
              </div>
              <SourceBadge source={item.source} />
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <div>
                <p className="text-sm font-semibold text-white">{item.match}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.ground}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowDetails((v) => !v)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white"
              >
                <Info className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                {showDetails ? "Hide details" : "Image details"}
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300"
                  >
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Uploaded by</span>
                      <span className="font-semibold text-white">
                        {item.user}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Upload type</span>
                      <span className="font-semibold text-white">
                        {SOURCE_LABEL[item.source]}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Ground</span>
                      <span className="font-semibold text-white">
                        {item.ground}
                      </span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">Posted</span>
                      <span className="font-semibold text-white">
                        {item.date}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 p-5">
              <AnimatedLike
                liked={liked}
                count={likeCount}
                light
                onToggle={() => {
                  setLiked((v) => !v);
                  setLikeCount((c) => c + (liked ? -1 : 1));
                }}
              />
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <MessageCircle className="h-3.5 w-3.5" />
                {item.comments}
              </span>
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition-colors hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-slate-950"
                style={{ backgroundColor: ACCENT }}
              >
                <Download className="h-3.5 w-3.5" />
                Save
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// VIDEO MODAL
// ---------------------------------------------------------------------------

function VideoModal({ video, onClose }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (video) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [video, onClose]);

  useEffect(() => {
    document.body.style.overflow = video ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [video]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-white/30"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Player stage */}
            <div className="relative flex aspect-video w-full items-center justify-center bg-black">
              <img
                src={video.image}
                alt={video.title}
                className="h-full w-full object-cover opacity-70"
              />
              <span className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                <Play className="ml-1 h-6 w-6 fill-white text-white" />
              </span>
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <h3 className="text-lg font-bold text-white">{video.title}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Uploaded by {video.user}
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CalendarDays
                    className="h-3.5 w-3.5"
                    style={{ color: ACCENT }}
                  />
                  This week
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  4.2K views
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                  512
                </span>
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

export default function CommunityGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxItemId, setLightboxItemId] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return GALLERY_ITEMS;
    if (activeFilter === "video")
      return GALLERY_ITEMS.filter((i) => i.type === "video");
    return GALLERY_ITEMS.filter((i) => i.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback((item) => setLightboxItemId(item.id), []);
  const closeLightbox = useCallback(() => setLightboxItemId(null), []);
  const navigateLightbox = useCallback(
    (direction) => {
      const items = filteredItems.filter((i) => i.type === "photo");
      const currentIndex = items.findIndex((i) => i.id === lightboxItemId);
      if (currentIndex === -1) return;
      const nextIndex =
        (currentIndex + direction + items.length) % items.length;
      setLightboxItemId(items[nextIndex].id);
    },
    [filteredItems, lightboxItemId],
  );

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-8 lg:px-16">
      <style>{`
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-10 blur-[130px]"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* -------------------------------------------------------------- */}
        {/* SECTION HEADER                                                   */}
        {/* -------------------------------------------------------------- */}
        <SectionHeader
          badge={
            <>
              <Camera className="h-3.5 w-3.5" style={{ color: ACCENT }} />
              Community Gallery
            </>
          }
          title="Cricket Memories Shared by Our Community"
          description="Explore unforgettable cricket moments captured by our visitors, teams, and the Stream Side community. From thrilling matches to beautiful nature-filled cricket experiences, every memory tells a story."
        />

        {/* -------------------------------------------------------------- */}
        {/* FILTER TABS                                                      */}
        {/* -------------------------------------------------------------- */}
        <div className="no-scrollbar mt-10 flex items-center justify-center gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-x-visible sm:pb-0">
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
        {/* MAIN MASONRY GALLERY                                             */}
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
            {filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 py-20 text-center">
                <Aperture className="mx-auto mb-3 h-6 w-6 text-slate-500" />
                <p className="text-slate-300">
                  No uploads in this category yet.
                </p>
              </div>
            ) : (
              <>
                {/* Mobile: horizontal carousel */}
                <div className="sm:hidden">
                  <HorizontalSlider scrollAmount={260}>
                    {filteredItems.map((item, i) => (
                      <div
                        key={item.id}
                        className="w-[70vw] shrink-0 snap-start"
                      >
                        <GalleryCard
                          item={item}
                          index={i}
                          onOpen={
                            item.type === "video"
                              ? (it) =>
                                  setActiveVideo({
                                    id: it.id,
                                    image: it.image,
                                    duration: it.duration,
                                    title: it.match,
                                    user: it.user,
                                  })
                              : openLightbox
                          }
                        />
                      </div>
                    ))}
                  </HorizontalSlider>
                </div>

                {/* Tablet/Desktop: masonry grid */}
                <div className="hidden sm:columns-2 sm:gap-4 lg:columns-3 xl:columns-4">
                  {filteredItems.map((item, i) => (
                    <GalleryCard
                      key={item.id}
                      item={item}
                      index={i}
                      onOpen={
                        item.type === "video"
                          ? (it) =>
                              setActiveVideo({
                                id: it.id,
                                image: it.image,
                                duration: it.duration,
                                title: it.match,
                                user: it.user,
                              })
                          : openLightbox
                      }
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* -------------------------------------------------------------- */}
        {/* TOP PICKS                                                        */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <span
                className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: ACCENT }}
              >
                <Star className="h-3.5 w-3.5 fill-current" />
                Top Picks
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Most Loved by the Community
              </h3>
            </div>
          </div>
          <HorizontalSlider scrollAmount={300}>
            {TOP_PICKS.map((item) => (
              <TopPickCard key={item.id} item={item} onOpen={openLightbox} />
            ))}
          </HorizontalSlider>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* VIDEO HIGHLIGHTS                                                 */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-20">
          <div className="mb-6">
            <span
              className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: ACCENT }}
            >
              <Video className="h-3.5 w-3.5" />
              Video Highlights
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Watch the Best Moments
            </h3>
          </div>
          <HorizontalSlider scrollAmount={300}>
            {VIDEO_HIGHLIGHTS.map((video) => (
              <VideoCard key={video.id} video={video} onOpen={setActiveVideo} />
            ))}
          </HorizontalSlider>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* TEAM MEMORIES                                                    */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-20">
          <div className="mb-6">
            <span
              className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: ACCENT }}
            >
              <Users className="h-3.5 w-3.5" />
              Team Memories
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Squads, Trophies & Celebrations
            </h3>
          </div>
          <HorizontalSlider scrollAmount={220}>
            {TEAM_MEMORIES.map((item, i) => (
              <TeamMemoryCard key={item.id} item={item} index={i} />
            ))}
          </HorizontalSlider>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* GROUND GALLERY                                                   */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-20">
          <div className="mb-6">
            <span
              className="mb-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: ACCENT }}
            >
              <TreePine className="h-3.5 w-3.5" />
              Ground Gallery
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              The Ground, From Every Angle
            </h3>
          </div>
          <HorizontalSlider scrollAmount={260}>
            {GROUND_GALLERY.map((item, i) => (
              <GroundCard key={item.id} item={item} index={i} />
            ))}
          </HorizontalSlider>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* COMMUNITY STATS                                                  */}
        {/* -------------------------------------------------------------- */}
        {/* <div className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COMMUNITY_STATS.map((stat, i) => (
            <StatGlassCard key={stat.label} {...stat} index={i} />
          ))}
        </div> */}

        {/* -------------------------------------------------------------- */}
        {/* UPLOAD CTA                                                       */}
        {/* -------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl sm:p-14"
        >
          <div
            className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-20 blur-[100px]"
            style={{ backgroundColor: ACCENT }}
          />
          <div className="relative">
            <UploadCloud
              className="mx-auto mb-3 h-6 w-6"
              style={{ color: ACCENT }}
            />
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Share Your Cricket Memories
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400 sm:text-base">
              Captured an unforgettable cricket moment at Stream Side? Upload
              your photos and videos to become part of our growing cricket
              community.
            </p>
            <button
              type="button"
              className="mx-auto mt-8 flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-slate-950 transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
              style={{ backgroundColor: ACCENT }}
            >
              <UploadCloud className="h-4 w-4" />
              Upload Your Memories
            </button>
          </div>
        </motion.div>
      </div>

      <Lightbox
        items={filteredItems.filter((i) => i.type === "photo")}
        activeId={lightboxItemId}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
}
