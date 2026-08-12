"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Telescope,
  Mountain,
  Tent,
  Camera,
  Trophy,
  Flame,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  MapPin,
  Clock,
  Timer,
  Check,
  Users,
  IndianRupee,
  ArrowRight,
  Info,
} from "lucide-react";

/* ==================================================
   DATA — fully dynamic. Replace with API/CMS data
   later by passing an `activities` prop of this shape.
   ================================================== */

const defaultActivities = [
  {
    id: "stargazing",
    category: "STARGAZING",
    title: "Under Infinite Skies",
    shortDescription:
      "Crystal-clear nights, telescopes and unforgettable views of the stars.",
    description:
      "Experience the night sky through powerful telescopes and discover planets, stars and constellations with our guided stargazing experience.",
    location: "Stream Side Sky Deck",
    duration: "2–3 hrs",
    timing: "9 PM – 12 AM",
    rating: "4.8",
    price: "₹999",
    icon: Telescope,
    bookingHref: "/book",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOVV-rke_6765kZhcT_sykQgNtoGmBwfTJsYsxJLT2JhQUYjZQFEAkc0&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP9bWCCWph0eByOCp18tvjMZNxqpJbTolbt9UdyNkQR7PzE1QR_kEWeAw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQC-y50_nkwFg2ohFFUWRu6luLzsA86rqzuFTl7WYO-CqAPvFP_w0U64&s=10",
      "https://media-cdn.tripadvisor.com/media/photo-s/2b/2f/dd/7e/unveil-the-splendor-of.jpg",
    ],
    highlights: [
      "Telescope Observation",
      "Moon & Planet Viewing",
      "Constellation Guidance",
      "Night Photography",
    ],
    bestFor: ["Families", "Couples", "Friends", "Photography Lovers"],
  },
  {
    id: "trekking",
    category: "TREKKING",
    title: "Into The Wild",
    shortDescription:
      "Explore scenic trails, hidden viewpoints and refreshing forest paths.",
    description:
      "Discover scenic forest trails, viewpoints and natural landscapes through guided trekking experiences around Yelagiri.",
    location: "Reserve Forest Trailhead",
    duration: "3–4 hrs",
    timing: "6 AM – 10 AM",
    rating: "4.7",
    price: "₹799",
    icon: Mountain,
    bookingHref: "/book",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOVV-rke_6765kZhcT_sykQgNtoGmBwfTJsYsxJLT2JhQUYjZQFEAkc0&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP9bWCCWph0eByOCp18tvjMZNxqpJbTolbt9UdyNkQR7PzE1QR_kEWeAw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQC-y50_nkwFg2ohFFUWRu6luLzsA86rqzuFTl7WYO-CqAPvFP_w0U64&s=10",
      "https://media-cdn.tripadvisor.com/media/photo-s/2b/2f/dd/7e/unveil-the-splendor-of.jpg",
    ],
    highlights: [
      "Forest Trails",
      "Scenic Viewpoints",
      "Nature Exploration",
      "Guided Trek",
    ],
    bestFor: ["Adventure Lovers", "Friends", "Fitness Enthusiasts"],
  },
  {
    id: "camping",
    category: "CAMPING",
    title: "Sleep Under The Stars",
    shortDescription:
      "Campfires, peaceful nights and nature right outside your tent.",
    description:
      "Spend a peaceful night surrounded by nature with comfortable tents, campfire moments and an unforgettable outdoor atmosphere.",
    location: "Nature Park Campground",
    duration: "Overnight",
    timing: "6 PM Onwards",
    rating: "4.6",
    price: "₹1,699",
    icon: Tent,
    bookingHref: "/book",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOVV-rke_6765kZhcT_sykQgNtoGmBwfTJsYsxJLT2JhQUYjZQFEAkc0&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP9bWCCWph0eByOCp18tvjMZNxqpJbTolbt9UdyNkQR7PzE1QR_kEWeAw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQC-y50_nkwFg2ohFFUWRu6luLzsA86rqzuFTl7WYO-CqAPvFP_w0U64&s=10",
      "https://media-cdn.tripadvisor.com/media/photo-s/2b/2f/dd/7e/unveil-the-splendor-of.jpg",
    ],
    highlights: ["Premium Tents", "Campfire", "Night Sky", "Nature Stay"],
    bestFor: ["Families", "Friends", "Couples", "Adventure Groups"],
  },
  {
    id: "photography",
    category: "PHOTOGRAPHY",
    title: "Frame The Moment",
    shortDescription:
      "Capture golden sunsets, misty hills and unforgettable moments.",
    description:
      "Capture Yelagiri's landscapes, waterfalls, forests, wildlife and golden-hour moments with photography-friendly locations.",
    location: "Scenic Viewpoints",
    duration: "2–5 hrs",
    timing: "Sunrise – Sunset",
    rating: "4.9",
    price: "₹899",
    icon: Camera,
    bookingHref: "/book",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOVV-rke_6765kZhcT_sykQgNtoGmBwfTJsYsxJLT2JhQUYjZQFEAkc0&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP9bWCCWph0eByOCp18tvjMZNxqpJbTolbt9UdyNkQR7PzE1QR_kEWeAw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQC-y50_nkwFg2ohFFUWRu6luLzsA86rqzuFTl7WYO-CqAPvFP_w0U64&s=10",
      "https://media-cdn.tripadvisor.com/media/photo-s/2b/2f/dd/7e/unveil-the-splendor-of.jpg",
    ],
    highlights: [
      "Golden Hour",
      "Landscape Photography",
      "Nature Photography",
      "Guided Locations",
    ],
    bestFor: ["Photographers", "Creators", "Nature Lovers"],
  },
  {
    id: "cricket",
    category: "CRICKET",
    title: "Game Time",
    shortDescription:
      "Enjoy friendly cricket matches and outdoor moments with your community.",
    description:
      "Enjoy casual cricket matches and outdoor games with friends, family and the Stream Side community.",
    location: "Stream Side Outdoor Ground",
    duration: "2–3 hrs",
    timing: "Morning – Evening",
    rating: "4.7",
    price: "₹499",
    icon: Trophy,
    bookingHref: "/book",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOVV-rke_6765kZhcT_sykQgNtoGmBwfTJsYsxJLT2JhQUYjZQFEAkc0&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP9bWCCWph0eByOCp18tvjMZNxqpJbTolbt9UdyNkQR7PzE1QR_kEWeAw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQC-y50_nkwFg2ohFFUWRu6luLzsA86rqzuFTl7WYO-CqAPvFP_w0U64&s=10",
      "https://media-cdn.tripadvisor.com/media/photo-s/2b/2f/dd/7e/unveil-the-splendor-of.jpg",
    ],
    highlights: [
      "Outdoor Cricket",
      "Friendly Matches",
      "Team Games",
      "Community Fun",
    ],
    bestFor: ["Friends", "Families", "Sports Lovers"],
  },
  {
    id: "night-magic",
    category: "NIGHT MAGIC",
    title: "Campfire & Chill",
    shortDescription:
      "Cozy up by the campfire, enjoy BBQ treats and relax under the stars.",
    description:
      "Spend the evening around a warm campfire with music, BBQ treats, conversations and peaceful views of the night sky.",
    location: "Stream Side Campfire Zone",
    duration: "2–4 hrs",
    timing: "6 PM – 11 PM",
    rating: "4.8",
    price: "₹699",
    icon: Flame,
    bookingHref: "/book",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOVV-rke_6765kZhcT_sykQgNtoGmBwfTJsYsxJLT2JhQUYjZQFEAkc0&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaP9bWCCWph0eByOCp18tvjMZNxqpJbTolbt9UdyNkQR7PzE1QR_kEWeAw&s=10",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQC-y50_nkwFg2ohFFUWRu6luLzsA86rqzuFTl7WYO-CqAPvFP_w0U64&s=10",
      "https://media-cdn.tripadvisor.com/media/photo-s/2b/2f/dd/7e/unveil-the-splendor-of.jpg",
    ],
    highlights: ["Campfire", "BBQ", "Music", "Night Experience"],
    bestFor: ["Friends", "Couples", "Families"],
  },
];

const FILTERS = ["All", ...defaultActivities.map((a) => a.category)];

/* ==================================================
   IMAGE CAROUSEL — shared by card (compact) and
   modal (large). Owns its own image index so it never
   collides with which activity/card is active.
   ================================================== */

function useImageCarousel(length) {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % length), [length]);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + length) % length),
    [length],
  );
  const goTo = useCallback((i) => setIndex(i), []);
  return { index, next, prev, goTo, setIndex };
}

function CardImageCarousel({ images, title, index, next, prev, goTo }) {
  const touchStartX = useRef(null);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="absolute inset-0"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt={`${title} — photo ${i + 1}`}
          fill
          priority={i === 0}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
          className={`object-cover transition-all duration-700 ease-out ${
            i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } group-hover:scale-[1.05]`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white opacity-70 backdrop-blur-md transition-all duration-300 hover:bg-slate-950/80 hover:border-lime-400/50 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-950/50 text-white opacity-70 backdrop-blur-md transition-all duration-300 hover:bg-slate-950/80 hover:border-lime-400/50 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="absolute bottom-[92px] right-5 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-[150px]">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to photo ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-lime-400" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ==================================================
   ACTIVITY CARD — fixed size, full-bleed image
   carousel with overlaid info. Click opens the modal.
   ================================================== */

function ActivityCard({ activity, onOpen }) {
  const { index, next, prev, goTo } = useImageCarousel(activity.images.length);
  const Icon = activity.icon;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${activity.title}`}
      onClick={() => onOpen(activity)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(activity);
        }
      }}
      className="group relative h-[390px] w-[86vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-lime-400/40 hover:shadow-[0_0_40px_-10px_rgba(163,230,53,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 sm:w-[360px] sm:h-[410px]"
    >
      <CardImageCarousel
        images={activity.images}
        title={activity.title}
        index={index}
        next={next}
        prev={prev}
        goTo={goTo}
      />

      {/* gradient scrim for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/10 transition-opacity duration-500 group-hover:from-slate-950 group-hover:via-slate-950/60" />

      {/* top row: category + rating */}
      <div className="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-400/40 bg-slate-950/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-lime-300 backdrop-blur-md transition-shadow duration-300 group-hover:shadow-[0_0_16px_-2px_rgba(163,230,53,0.6)]">
          <Icon className="h-3 w-3" aria-hidden="true" />
          {activity.category}
        </span>
        {/* <span className="flex items-center gap-1 rounded-full bg-slate-950/50 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md">
          <Star
            className="h-3 w-3 fill-current text-lime-400"
            aria-hidden="true"
          />
          {activity.rating}
        </span> */}
      </div>

      {/* bottom: title / description / meta */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center gap-1 text-[11px] text-slate-300">
          <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="truncate">{activity.location}</span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
          {activity.title}
        </h3>

        <p className="text-xs leading-relaxed text-slate-300 line-clamp-2 sm:text-sm">
          {activity.shortDescription}
        </p>

        {/* <div className="mt-1 flex items-center gap-4 text-[11px] font-semibold text-slate-200">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-lime-400" aria-hidden="true" />
            {activity.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5 text-lime-400" aria-hidden="true" />
            {activity.timing}
          </span>
        </div> */}
      </div>
    </div>
  );
}

/* ==================================================
   MODAL IMAGE CAROUSEL — larger, with counter and
   desktop thumbnail strip.
   ================================================== */

function ModalImageCarousel({ images, title, index, next, prev, goTo }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="group/modalimg relative h-64 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900 sm:h-80 lg:h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${title} — photo ${index + 1}`}
              fill
              sizes="(max-width: 1024px) 92vw, 560px"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-colors hover:border-lime-400/50 hover:bg-slate-950/80"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-slate-950/60 text-white backdrop-blur-md transition-colors hover:border-lime-400/50 hover:bg-slate-950/80"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              aria-label={`View photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-colors ${
                i === index
                  ? "border-lime-400"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ==================================================
   ACTIVITY MODAL
   ================================================== */

function ActivityModal({ activity, onClose }) {
  const { index, next, prev, goTo, setIndex } = useImageCarousel(
    activity ? activity.images.length : 1,
  );

  useEffect(() => {
    setIndex(0);
  }, [activity, setIndex]);

  useEffect(() => {
    if (!activity) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activity, onClose, next, prev]);

  if (!activity) return null;
  const Icon = activity.icon;

  return (
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[70] bg-slate-950/80 backdrop-blur-sm"
      />
      <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
        <motion.div
          key="modal-panel"
          role="dialog"
          aria-modal="true"
          aria-label={`${activity.title} details`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-[94vw] h-[92vh] flex-col overflow-y-auto rounded-3xl border border-lime-400/20 bg-slate-950 shadow-[0_0_60px_-15px_rgba(163,230,53,0.25)] sm:h-[90vh] sm:w-[92vw] lg:h-[min(750px,90vh)] lg:w-[min(1100px,92vw)] lg:flex-row lg:overflow-hidden"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white backdrop-blur-md transition-colors hover:border-lime-400/50 hover:bg-slate-950"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* LEFT: image carousel */}
          <div className="shrink-0 p-4 pt-14 sm:p-6 sm:pt-14 lg:w-[52%] lg:overflow-y-auto lg:p-6">
            <ModalImageCarousel
              images={activity.images}
              title={activity.title}
              index={index}
              next={next}
              prev={prev}
              goTo={goTo}
            />
          </div>

          {/* RIGHT: details */}
          <div className="flex-1 px-4 pb-6 sm:px-6 sm:pb-8 lg:overflow-y-auto lg:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-lime-300">
              <Icon className="h-3 w-3" aria-hidden="true" />
              {activity.category}
            </span>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              {activity.title}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {activity.location}
              </span>
              {/* <span className="flex items-center gap-1 font-semibold text-white">
                <Star
                  className="h-3.5 w-3.5 fill-current text-lime-400"
                  aria-hidden="true"
                />
                {activity.rating}
              </span> */}
              {/* <span className="flex items-center gap-1">
                <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
                {activity.price.replace("₹", "")}
              </span> */}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {activity.description}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Clock
                  className="mb-1.5 h-4 w-4 text-lime-400"
                  aria-hidden="true"
                />
                <div className="text-[11px] text-slate-400">Duration</div>
                <div className="text-xs font-semibold text-white">
                  {activity.duration}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <Timer
                  className="mb-1.5 h-4 w-4 text-lime-400"
                  aria-hidden="true"
                />
                <div className="text-[11px] text-slate-400">Timing</div>
                <div className="text-xs font-semibold text-white">
                  {activity.timing}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Highlights
              </span>
              <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {activity.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-slate-300"
                  >
                    <Check
                      className="h-3.5 w-3.5 shrink-0 text-lime-400"
                      aria-hidden="true"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Best For
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {activity.bestFor.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-300"
                  >
                    <Users className="h-3 w-3" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* <Link
              href={activity.bookingHref || "/book"}
              className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_35px_-5px_rgba(163,230,53,0.6)] active:scale-[0.98]"
            >
              Book This Experience
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link> */}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ==================================================
   FILTERS + PAGINATION
   ================================================== */

function ActivityFilters({ active, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Filter activities by category"
      className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
    >
      {FILTERS.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 sm:text-[13px] ${
              isActive
                ? "border-lime-400/50 bg-lime-400/15 text-lime-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

function ActivityPagination({ count, activeIndex, onSelect }) {
  if (count <= 1) return null;
  return (
    <div className="mt-5 flex items-center justify-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to activity ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === activeIndex ? "w-6 bg-lime-400" : "w-1.5 bg-slate-600"
          }`}
        />
      ))}
    </div>
  );
}

/* ==================================================
   MAIN COMPONENT
   ================================================== */

export default function StreamSideActivities({
  activities: externalActivities,
}) {
  const activities = externalActivities ?? defaultActivities;

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef(null);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return activities;
    return activities.filter((a) => a.category === activeCategory);
  }, [activities, activeCategory]);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setScrollIndex(0);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    });
  }, []);

  const scrollByCard = useCallback((direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 360;
    el.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstChild?.offsetWidth || 360;
    const gap = 20;
    const idx = Math.round(el.scrollLeft / (cardWidth + gap));
    setScrollIndex(idx);
  }, []);

  const scrollToIndex = useCallback((i) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[i];
    if (card) card.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, []);

  const openActivity = useCallback(
    (activity) => setSelectedActivity(activity),
    [],
  );
  const closeActivity = useCallback(() => setSelectedActivity(null), []);

  useEffect(() => {
    document.body.style.overflow = selectedActivity ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedActivity]);

  return (
    <section
      aria-label="Activities at Stream Side"
      className="relative overflow-hidden bg-slate-950 px-4 py-10 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ============ HEADER ============ */}
        <div className="mx-auto max-w-2xl text-center">
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/5 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-300">
            Activities
          </span> */}

          <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Experience More.{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-300 bg-clip-text text-transparent">
              Do More.
            </span>{" "}
            Remember More.
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
            From outdoor adventures to peaceful nights under the stars, discover
            the experiences waiting for you at Stream Side.
          </p>
        </div>

        {/* ============ FILTERS ============ */}
        <div className="mt-8 sm:mt-10">
          <ActivityFilters
            active={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {/* ============ ACTIVITY CAROUSEL ============ */}
        <div className="relative mt-6 sm:mt-8">
          <div className="pointer-events-none absolute -left-4 top-0 bottom-0 z-20 w-10 bg-gradient-to-r from-slate-950 to-transparent sm:-left-8 sm:w-16" />
          <div className="pointer-events-none absolute -right-4 top-0 bottom-0 z-20 w-10 bg-gradient-to-l from-slate-950 to-transparent sm:-right-8 sm:w-16" />

          {/* <div className="hidden items-center justify-end gap-2 pb-3 sm:flex">
            <button
              type="button"
              aria-label="Previous activities"
              onClick={() => scrollByCard(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-lime-400/40 hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next activities"
              onClick={() => scrollByCard(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-lime-400/40 hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4 text-white" aria-hidden="true" />
            </button>
          </div> */}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory touch-pan-x -mx-4 px-4 sm:mx-0 sm:px-0"
            >
              {filtered.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onOpen={openActivity}
                />
              ))}
              {filtered.length === 0 && (
                <div className="w-full py-16 text-center text-sm text-slate-400">
                  <Info className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
                  No activities found for this filter.
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <ActivityPagination
            count={filtered.length}
            activeIndex={scrollIndex}
            onSelect={scrollToIndex}
          />
        </div>

        {/* ============ FINAL CTA ============ */}
        {/* <div className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 text-center backdrop-blur-md sm:mt-16 sm:rounded-3xl sm:p-10">
          <h3 className="mx-auto max-w-xl text-xl font-bold text-white sm:text-2xl">
            Ready to experience Stream Side?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-300 sm:text-base">
            Choose your experience and make your next visit unforgettable.
          </p>

          <Link
            href="/experiences"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-lime-300 hover:shadow-[0_0_35px_-5px_rgba(163,230,53,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400"
          >
            Explore All Experiences
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div> */}
      </div>

      <ActivityModal activity={selectedActivity} onClose={closeActivity} />

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
