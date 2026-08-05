"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Heart,
  Eye,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Upload,
  Sparkles,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  ArrowRight,
  Tent,
  Moon,
  Mountain,
  Bike,
  PartyPopper,
  PawPrint,
  Trees,
  Aperture,
  ShieldCheck,
} from "lucide-react";

/* ============================================================================
   COMMUNITY GALLERY — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   A single, self-contained, production-ready React component. No backend —
   every interaction (upload, approval, likes) is simulated on local state so
   the component can be dropped into the existing site and wired up later.

   Design language: bg-slate-950 / slate-900 / slate-800 with a lime (#B7FF00)
   accent, matching the rest of the Stream Side site. The signature motif here
   is a "developing photograph" reveal — cards fade up from grain the way a
   print emerges in a darkroom tray, which ties the motion language back to
   the idea of a physical photo gallery rather than a generic fade/slide.
   ============================================================================ */

// ---------------------------------------------------------------------------
// DUMMY DATA
// ---------------------------------------------------------------------------
// A realistic mixed set of admin (Stream Side team) and approved user photos.
// `ratio` drives the masonry card height so the grid doesn't feel uniform.

const CATEGORIES = [
  { id: "all", label: "All", icon: Aperture },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "camping", label: "Camping", icon: Tent },
  { id: "stargazing", label: "Stargazing", icon: Moon },
  { id: "trekking", label: "Trekking", icon: Mountain },
  { id: "cycling", label: "Cycling", icon: Bike },
  { id: "events", label: "Events", icon: PartyPopper },
  { id: "wildlife", label: "Wildlife", icon: PawPrint },
  { id: "landscape", label: "Landscape", icon: Trees },
];

const DUMMY_PHOTOS = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80",
    category: "landscape",
    location: "Swamimalai Viewpoint",
    photographer: "Stream Side Team",
    uploadType: "admin",
    likes: 482,
    views: 3210,
    date: "2026-06-14",
    caption: "Mist rolling over the hills just after sunrise.",
    featured: true,
    ratio: 1.25,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=900&q=80",
    category: "camping",
    location: "Stream Side Meadow Camp",
    photographer: "Ritika Menon",
    uploadType: "user",
    likes: 231,
    views: 1180,
    date: "2026-07-02",
    caption: "First night under canvas, fire still going at midnight.",
    featured: false,
    ratio: 0.8,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80",
    category: "stargazing",
    location: "North Ridge Deck",
    photographer: "Stream Side Team",
    uploadType: "admin",
    likes: 610,
    views: 4021,
    date: "2026-05-28",
    caption: "The Milky Way, no light pollution, no filter.",
    featured: true,
    ratio: 1.4,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
    category: "trekking",
    location: "Jalagamparai Trail",
    photographer: "Arvind Prakash",
    uploadType: "user",
    likes: 178,
    views: 902,
    date: "2026-06-30",
    caption: "Made it to the waterfall by noon — worth every step.",
    featured: false,
    ratio: 1.1,
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80",
    category: "photography",
    location: "Stream Side Orchard",
    photographer: "Stream Side Team",
    uploadType: "admin",
    likes: 355,
    views: 2210,
    date: "2026-04-19",
    caption: "Golden hour through the coffee plantation.",
    featured: false,
    ratio: 0.7,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
    category: "cycling",
    location: "Yelagiri Ghat Road",
    photographer: "Divya Suresh",
    uploadType: "user",
    likes: 142,
    views: 760,
    date: "2026-07-10",
    caption: "14 hairpin bends and not one regret.",
    featured: false,
    ratio: 1.3,
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=900&q=80",
    category: "wildlife",
    location: "Nature Trail, East Slope",
    photographer: "Stream Side Team",
    uploadType: "admin",
    likes: 296,
    views: 1540,
    date: "2026-03-22",
    caption: "A resident Malabar hornbill, spotted at dawn.",
    featured: false,
    ratio: 1.0,
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
    category: "events",
    location: "Stream Side Bonfire Deck",
    photographer: "Kavya Iyer",
    uploadType: "user",
    likes: 204,
    views: 1330,
    date: "2026-06-21",
    caption: "Weekend bonfire nights are the whole reason we came back.",
    featured: false,
    ratio: 0.85,
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=900&q=80",
    category: "landscape",
    location: "Punganoor Lake",
    photographer: "Stream Side Team",
    uploadType: "admin",
    likes: 388,
    views: 2670,
    date: "2026-02-11",
    caption: "Still water, first light.",
    featured: true,
    ratio: 1.2,
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=900&q=80",
    category: "camping",
    location: "Stream Side Meadow Camp",
    photographer: "Nikhil Rao",
    uploadType: "user",
    likes: 165,
    views: 845,
    date: "2026-07-18",
    caption: "Coffee tastes better at 4,300 ft.",
    featured: false,
    ratio: 1.15,
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?auto=format&fit=crop&w=900&q=80",
    category: "trekking",
    location: "Summit Point",
    photographer: "Stream Side Team",
    uploadType: "admin",
    likes: 421,
    views: 2985,
    date: "2026-01-30",
    caption: "Above the clouds, quite literally.",
    featured: false,
    ratio: 0.75,
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=900&q=80",
    category: "photography",
    location: "Stream Side Deck",
    photographer: "Meera Balan",
    uploadType: "user",
    likes: 193,
    views: 1102,
    date: "2026-06-05",
    caption: "Every guest becomes a photographer here eventually.",
    featured: false,
    ratio: 1.35,
  },
];

// ---------------------------------------------------------------------------
// SMALL UTILITIES
// ---------------------------------------------------------------------------

const EXPERIENCE_TYPES = [
  "Photography",
  "Camping",
  "Stargazing",
  "Trekking",
  "Cycling",
  "Events",
  "Wildlife",
  "Landscape",
];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${n}`;
}

// Animated count-up, used by the community stats row.
function useCountUp(target, durationMs = 1600, start = false) {
  const [value, setValue] = useState(0);
  const frameRef = useRef();

  useEffect(() => {
    if (!start) return undefined;
    const startTime = performance.now();
    const from = 0;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, target, durationMs]);

  return value;
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS (kept in this same file — no external imports)
// ---------------------------------------------------------------------------

function FilterPill({ active, label, Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? "border-[#B7FF00] bg-[#B7FF00] text-slate-950"
          : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white"
      }`}
    >
      <Icon
        className={`h-3.5 w-3.5 transition-colors ${
          active
            ? "text-slate-950"
            : "text-slate-500 group-hover:text-[#B7FF00]"
        }`}
      />
      {label}
    </button>
  );
}

function SkeletonCard({ ratio }) {
  return (
    <div
      className="mb-4 w-full animate-pulse overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 break-inside-avoid"
      style={{ aspectRatio: ratio }}
    >
      <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800" />
    </div>
  );
}

function Badge({ children, tone = "default" }) {
  const tones = {
    default: "bg-slate-950/70 text-slate-200 border-slate-700/70",
    lime: "bg-[#B7FF00] text-slate-950 border-[#B7FF00]",
    admin: "bg-slate-950/70 text-[#B7FF00] border-[#B7FF00]/50",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function PhotoCard({ photo, index, onOpen, onLike, liked }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
    >
      <button
        onClick={() => onOpen(photo)}
        className="relative block w-full overflow-hidden"
        style={{ aspectRatio: photo.ratio }}
        aria-label={`Open photo: ${photo.caption}`}
      >
        <img
          src={photo.src}
          alt={photo.caption}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
        />

        {/* Dark gradient + hover controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />

        <div className="absolute right-3 top-3 flex flex-col items-end gap-2">
          {photo.featured && (
            <Badge tone="lime">
              <Sparkles className="h-3 w-3" /> Featured
            </Badge>
          )}
          <Badge>
            {CATEGORIES.find((c) => c.id === photo.category)?.label ??
              photo.category}
          </Badge>
        </div>

        <div className="absolute right-3 top-14 flex translate-x-2 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onLike(photo.id);
            }}
            role="button"
            aria-label="Like photo"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 backdrop-blur-sm transition-colors hover:border-[#B7FF00] hover:text-[#B7FF00]"
          >
            <Heart
              className={`h-4 w-4 ${liked ? "fill-[#B7FF00] text-[#B7FF00]" : "text-white"}`}
            />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 backdrop-blur-sm transition-colors hover:border-[#B7FF00] hover:text-[#B7FF00]">
            <Maximize2 className="h-4 w-4 text-white" />
          </span>
        </div>

        {/* Bottom meta, revealed on hover */}
        <figcaption className="absolute inset-x-0 bottom-0 p-4 text-left">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <MapPin className="h-3 w-3 text-[#B7FF00]" />
            {photo.location}
          </div>
          <div className="mt-1 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">
                {photo.photographer}
              </p>
              <p className="text-[11px] text-slate-400">
                {photo.uploadType === "admin"
                  ? "Stream Side Team"
                  : "Community Member"}{" "}
                · {formatDate(photo.date)}
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="flex items-center gap-1">
                <Heart className="h-3 w-3" /> {formatCount(photo.likes)}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" /> {formatCount(photo.views)}
              </span>
            </div>
          </div>
        </figcaption>
      </button>
    </motion.figure>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 py-24 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-slate-800 bg-slate-950">
        <ImageIcon className="h-7 w-7 text-slate-600" />
      </div>
      <p className="text-lg font-medium text-white">No photos available</p>
      <p className="mt-1 max-w-xs text-sm text-slate-500">
        Nothing shared in this category yet — be the first to add a memory here.
      </p>
    </div>
  );
}

function StatItem({ icon: Icon, label, value, suffix = "", start }) {
  const count = useCountUp(value, 1600, start);
  return (
    <div className="flex flex-1 items-center gap-4 px-6 py-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-[#B7FF00]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {formatCount(count)}
          {suffix}
        </p>
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// UPLOAD MODAL (UI only — no submission logic beyond local simulated state)
// ---------------------------------------------------------------------------

function UploadModal({ open, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!open) {
      // reset when modal fully closes
      const t = setTimeout(() => {
        setSubmitted(false);
        setAgreed(false);
        setFileName("");
      }, 300);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/50"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition-colors hover:border-slate-600 hover:text-white"
              aria-label="Close upload form"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#B7FF00]">
                  Community Gallery
                </p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                  Share Your Moment
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Every submission is reviewed by our team before it goes live.
                </p>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ananya Reddy"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-[#B7FF00]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Location
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Where was this taken?"
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-[#B7FF00]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Experience Type
                    </label>
                    <select
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white outline-none transition-colors focus:border-[#B7FF00]"
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {EXPERIENCE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Photo
                    </label>
                    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-700 bg-slate-950 px-4 py-6 text-center transition-colors hover:border-[#B7FF00]">
                      <Upload className="h-5 w-5 text-slate-500" />
                      <span className="text-xs text-slate-400">
                        {fileName || "Click to choose a photo (JPG, PNG)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        required
                        className="hidden"
                        onChange={(e) =>
                          setFileName(e.target.files?.[0]?.name || "")
                        }
                      />
                    </label>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-400">
                      Caption
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about this moment..."
                      className="w-full resize-none rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-[#B7FF00]"
                    />
                  </div>

                  <label className="flex cursor-pointer items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-700 bg-slate-950 text-[#B7FF00] accent-[#B7FF00]"
                    />
                    <span className="text-xs leading-relaxed text-slate-400">
                      I agree that this photo may be reviewed and featured on
                      the Stream Side Community Gallery.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!agreed}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#B7FF00] px-4 py-3 text-sm font-semibold text-slate-950 transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit Photo <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center px-8 py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 14,
                  }}
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#B7FF00]/10 text-[#B7FF00]"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">
                  Photo Submitted Successfully
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Waiting for Admin Approval.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// PREVIEW MODAL (fullscreen lightbox with prev/next)
// ---------------------------------------------------------------------------

function PreviewModal({ photo, onClose, onPrev, onNext, onLike, liked }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    if (photo) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [photo, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/95 p-3 backdrop-blur-md sm:p-8"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-[#B7FF00] hover:text-[#B7FF00]"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-[#B7FF00] hover:text-[#B7FF00] sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 transition-colors hover:border-[#B7FF00] hover:text-[#B7FF00] sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          >
            <div className="relative flex max-h-[65vh] items-center justify-center bg-slate-950 sm:max-h-[70vh]">
              <img
                src={photo.src}
                alt={photo.caption}
                className="max-h-[65vh] w-full object-contain sm:max-h-[70vh]"
              />
              {photo.featured && (
                <div className="absolute left-4 top-4">
                  <Badge tone="lime">
                    <Sparkles className="h-3 w-3" /> Featured
                  </Badge>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-base font-semibold text-white">
                  {photo.photographer}
                </p>
                <p className="mt-0.5 text-sm text-slate-400">{photo.caption}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#B7FF00]" />{" "}
                    {photo.location}
                  </span>
                  <span>{formatDate(photo.date)}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {formatCount(photo.views)} views
                  </span>
                </div>
              </div>

              <button
                onClick={() => onLike(photo.id)}
                className={`flex shrink-0 items-center gap-2 self-start rounded-full border px-4 py-2 text-sm font-medium transition-colors sm:self-auto ${
                  liked
                    ? "border-[#B7FF00] bg-[#B7FF00] text-slate-950"
                    : "border-slate-700 text-slate-300 hover:border-[#B7FF00] hover:text-[#B7FF00]"
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-slate-950" : ""}`} />
                {formatCount(photo.likes + (liked ? 1 : 0))}
              </button>
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
  const [isLoading, setIsLoading] = useState(true);
  const [likedIds, setLikedIds] = useState(() => new Set());
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);

  // Simulate an initial fetch so the skeleton state has something to do.
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Trigger the stat counters once the row scrolls into view.
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredPhotos = useMemo(() => {
    const base =
      activeFilter === "all"
        ? DUMMY_PHOTOS
        : DUMMY_PHOTOS.filter((p) => p.category === activeFilter);
    // Featured photos surface first, newest-first otherwise.
    return [...base].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.date) - new Date(a.date);
    });
  }, [activeFilter]);

  const toggleLike = useCallback((id) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const openPreview = useCallback((photo) => setPreviewPhoto(photo), []);
  const closePreview = useCallback(() => setPreviewPhoto(null), []);

  const stepPreview = useCallback(
    (dir) => {
      if (!previewPhoto) return;
      const idx = filteredPhotos.findIndex((p) => p.id === previewPhoto.id);
      const nextIdx =
        (idx + dir + filteredPhotos.length) % filteredPhotos.length;
      setPreviewPhoto(filteredPhotos[nextIdx]);
    },
    [previewPhoto, filteredPhotos],
  );

  const totalLikes = useMemo(
    () =>
      DUMMY_PHOTOS.reduce(
        (sum, p) => sum + p.likes + (likedIds.has(p.id) ? 1 : 0),
        0,
      ),
    [likedIds],
  );
  const featuredCount = useMemo(
    () => DUMMY_PHOTOS.filter((p) => p.featured).length,
    [],
  );

  return (
    <section className="relative w-full bg-slate-950 px-4 py-20 sm:px-8 lg:px-16">
      {/* Local styles: hides scrollbars on horizontal filter row without a Tailwind plugin */}
      <style>{`
        .csg-noscroll::-webkit-scrollbar { display: none; }
        .csg-noscroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div className="mx-auto max-w-7xl">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION HEADER                                                   */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-8 bg-[#B7FF00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B7FF00]">
                Shared by our guests
              </span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Community Gallery
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              See unforgettable memories shared by our visitors and the Stream
              Side team.
            </p>
          </div>

          <button className="group flex shrink-0 items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-[#B7FF00] hover:text-[#B7FF00]">
            Explore Gallery
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* TOP FILTERS                                                      */}
        {/* ---------------------------------------------------------------- */}
        <div className="csg-noscroll mt-10 flex gap-2.5 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <FilterPill
              key={cat.id}
              label={cat.label}
              Icon={cat.icon}
              active={activeFilter === cat.id}
              onClick={() => setActiveFilter(cat.id)}
            />
          ))}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* UPLOAD CTA                                                       */}
        {/* ---------------------------------------------------------------- */}
        <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900/60 p-6 sm:p-8">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{ background: "#B7FF00" }}
          />
          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#B7FF00]/40 bg-[#B7FF00]/10 text-[#B7FF00]">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white sm:text-xl">
                  Share Your Moment
                </h3>
                <p className="mt-1 max-w-md text-sm text-slate-400">
                  Captured something beautiful? Upload your memory to inspire
                  others.
                </p>
              </div>
            </div>
            <button
              onClick={() => setUploadOpen(true)}
              className="flex shrink-0 items-center gap-2 rounded-full bg-[#B7FF00] px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-300 hover:scale-[1.03]"
            >
              <Upload className="h-4 w-4" /> Upload Photo
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* PHOTO GRID (masonry)                                             */}
        {/* Category switching mirrors PhotographyActivities: the previous   */}
        {/* filter's grid fades out, then the newly filtered grid fades in,  */}
        {/* keyed on activeFilter so AnimatePresence treats it as a swap.    */}
        {/* ---------------------------------------------------------------- */}
        {isLoading ? (
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} ratio={[0.8, 1.2, 1, 1.35][i % 4]} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {filteredPhotos.length === 0 ? (
                <div className="mt-10 grid grid-cols-1">
                  <EmptyState />
                </div>
              ) : (
                <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-4">
                  {filteredPhotos.map((photo, i) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      index={i}
                      onOpen={openPreview}
                      onLike={toggleLike}
                      liked={likedIds.has(photo.id)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* COMMUNITY STATS                                                  */}
        {/* ---------------------------------------------------------------- */}
        <div
          ref={statsRef}
          className="mt-16 flex flex-col divide-y divide-slate-800 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 sm:flex-row sm:divide-x sm:divide-y-0"
        >
          <StatItem
            icon={ImageIcon}
            label="Photos Shared"
            value={DUMMY_PHOTOS.length * 47}
            start={statsInView}
          />
          <StatItem
            icon={Users}
            label="Community Members"
            value={2840}
            start={statsInView}
          />
          <StatItem
            icon={Sparkles}
            label="Featured Photos"
            value={featuredCount * 6}
            start={statsInView}
          />
          <StatItem
            icon={Heart}
            label="Total Likes"
            value={totalLikes}
            start={statsInView}
          />
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="h-3.5 w-3.5" />
          Every guest upload is reviewed by our team before it appears here.
        </div>
      </div>

      {/* Modals */}
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <PreviewModal
        photo={previewPhoto}
        onClose={closePreview}
        onPrev={() => stepPreview(-1)}
        onNext={() => stepPreview(1)}
        onLike={toggleLike}
        liked={previewPhoto ? likedIds.has(previewPhoto.id) : false}
      />
    </section>
  );
}
