"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, ArrowDown } from "lucide-react";

/* ============================================================================
   ABOUT HERO — Stream Side
   ----------------------------------------------------------------------------
   First section of the About Us page. Cinematic, full-bleed, dark — matches
   the existing homepage design language (slate-950, lime-400 / emerald-300
   accents, glassmorphism, rounded-3xl, subtle glow). No new libraries, no
   changes to globals.css, navbar, or footer. Uses the existing `font-display`
   utility for the main heading.

   Swap the placeholder image path below for the real asset when it's ready —
   the next/image usage (fill + sizes + object-cover) doesn't need to change.
   ============================================================================ */

const DESKTOP_HERO_IMAGE = "/All-Images/about-hero-desktop.png";
const MOBILE_TABLET_HERO_IMAGE = "/All-Images/about-hero-mobile.png";

const MICRO_STATS = [
  { index: "01", label: "Adventure" },
  { index: "02", label: "Nature" },
  { index: "03", label: "Community" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function AboutHero() {
  return (
    <section
      aria-label="About Stream Side introduction"
      className="relative flex min-h-[90svh] w-full items-center overflow-hidden bg-slate-950 sm:min-h-screen"
    >
      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND IMAGE + SLOW BREATHING SCALE                            */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: [1.05, 1, 1.015, 1] }}
        transition={{
          duration: 18,
          times: [0, 0.1, 0.55, 1],
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        {/* Mobile + Tablet */}
        <Image
          src={MOBILE_TABLET_HERO_IMAGE}
          alt="Stream Side, Yelagiri"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 0px"
          className="object-cover object-center lg:hidden"
        />

        {/* Desktop */}
        <Image
          src={DESKTOP_HERO_IMAGE}
          alt="Stream Side, Yelagiri"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 0px"
          className="hidden object-cover object-center lg:block"
        />
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* CINEMATIC OVERLAYS                                                  */}
      {/* ------------------------------------------------------------------ */}
      {/* <div className="pointer-events-none absolute inset-0 bg-black/40" /> */}
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" /> */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
      {/* Subtle atmospheric glow */}
      {/* <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-lime-400/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-[360px] w-[360px] rounded-full bg-emerald-300/10 blur-[110px]" /> */}

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                             */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10  flex w-full  flex-col items-center px-5 pb-28 pt-24 text-center sm:px-8 sm:pb-0 sm:pt-20 sm:text-left lg:items-start lg:px-16">
        <div className="flex max-w-2xl flex-col items-center sm:items-start">
          {/* Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lime-400">
              About Stream Side
            </span>
          </motion.div> */}

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
            className="font-display text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">More Than A Stay.</span>
            <span className="block">
              It&apos;s A Way To{" "}
              <span className="bg-gradient-to-r from-lime-400 to-emerald-300 bg-clip-text text-transparent">
                Explore
              </span>
              .
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.36, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Stream Side is a nature-driven experience platform built around
            adventure, exploration, community and unforgettable moments in the
            hills of Yelagiri.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-9 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <a
              href="#experiences"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_0_0_rgba(163,230,53,0)] transition-all duration-300 hover:shadow-[0_0_36px_4px_rgba(163,230,53,0.35)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Experiences
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#discover"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-lime-400/40 hover:bg-white/10 hover:text-white"
            >
              Discover Stream Side
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          {/* Micro stats — brand keywords, not business metrics */}
          {/* <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62, ease: EASE }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start"
          >
            {MICRO_STATS.map((stat, i) => (
              <span
                key={stat.label}
                className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.15em] text-slate-400"
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-lime-400/80">{stat.index}</span>
                  {stat.label}
                </span>
                {i < MICRO_STATS.length - 1 && (
                  <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:inline-block" />
                )}
              </span>
            ))}
          </motion.div> */}

          {/* Floating info card — mobile inline version */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72, ease: EASE }}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-md sm:hidden"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30">
              <MapPin className="h-4 w-4 text-lime-400" aria-hidden="true" />
            </span>
            <div className="text-left">
              <p className="text-xs font-bold uppercase tracking-wide text-white">
                Yelagiri Hills
              </p>
              <p className="text-[11px] text-slate-400">
                Nature &bull; Adventure &bull; Community
              </p>
            </div>
          </motion.div> */}
        </div>
      </div>

      {/* Floating info card — desktop / tablet, opposite side of the content */}
      {/* <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
        className="group absolute bottom-12 right-8 z-10 hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md transition-colors duration-300 hover:border-lime-400/30 sm:flex lg:right-16"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/30">
          <MapPin className="h-4 w-4 text-lime-400" aria-hidden="true" />
        </span>
        <div className="text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-white">
            Yelagiri Hills
          </p>
          <p className="text-[11px] text-slate-400">
            Nature &bull; Adventure &bull; Community
          </p>
        </div>
      </motion.div> */}
    </section>
  );
}
