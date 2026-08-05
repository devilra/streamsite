"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  LandPlot,
  Users,
  Trophy,
  ShieldCheck,
  Play,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

const ACCENT = "#B7FF00";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1920&q=80";

const FEATURES = [
  {
    icon: LandPlot,
    title: "Professional Cricket Ground",
    subtitle: "International quality grass pitch",
  },
  {
    icon: Users,
    title: "Team Matches",
    subtitle: "Play with friends & groups",
  },
  {
    icon: Trophy,
    title: "Weekend Tournaments",
    subtitle: "Exciting competitions",
  },
  {
    icon: ShieldCheck,
    title: "Professional Support",
    subtitle: "Equipment & match assistance",
  },
];

const STATS = [
  { icon: Users, value: "1000+", label: "Players Hosted" },
  { icon: LandPlot, value: "5+", label: "Professional Grounds" },
  { icon: Trophy, value: "50+", label: "Matches Conducted" },
  { icon: CalendarDays, value: "Year Round", label: "Cricket Experience" },
];

// ---------------------------------------------------------------------------
// MOTION VARIANTS
// ---------------------------------------------------------------------------

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const featureScale = {
  hidden: { opacity: 0, scale: 0.92, y: 15 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// ---------------------------------------------------------------------------
// BACKGROUND EFFECTS & LIGHTING
// ---------------------------------------------------------------------------

function StadiumAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {/* 1. Base Forest Stadium Photo */}
      <img
        src={BG_IMAGE}
        alt="Resort Cricket Grounds"
        className="h-full w-full object-cover object-center mix-blend-luminosity opacity-25 scale-105 transform transition-transform duration-1000"
      />

      {/* 2. Cinematic Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

      {/* 3. Sunset Light Leak & Floodlight Flares */}
      <div
        className="absolute -top-24 right-1/4 h-[550px] w-[550px] rounded-full blur-[140px] opacity-20 pointer-events-none animate-pulse"
        style={{ backgroundColor: ACCENT }}
      />
      <div className="absolute top-1/3 right-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 h-96 w-96 rounded-full bg-emerald-600/10 blur-[150px] pointer-events-none" />

      {/* 4. Conic Stadium Spotlight Rays */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
        style={{
          background:
            "conic-gradient(from 215deg at 70% 10%, rgba(183,255,0,0.25) 0deg, transparent 40deg)",
        }}
      />

      {/* 5. Floating Ambient Dust Particles */}
      <motion.div
        animate={{ y: [0, -40, 0], opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 h-2 w-2 rounded-full blur-[1px] shadow-[0_0_12px_#B7FF00]"
        style={{ backgroundColor: ACCENT }}
      />
      <motion.div
        animate={{ y: [0, -50, 0], opacity: [0.3, 0.9, 0.3] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-1/2 right-1/4 h-2.5 w-2.5 rounded-full blur-[1px] shadow-[0_0_16px_#B7FF00]"
        style={{ backgroundColor: ACCENT }}
      />

      {/* 6. Soft Fog Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent backdrop-blur-[2px]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3D EQUIPMENT SHOWCASE (RIGHT SIDE)
// ---------------------------------------------------------------------------

function EquipmentShowcase() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative flex h-[420px] w-full items-center justify-center lg:h-[560px]"
    >
      {/* Background Radial Glow Stage */}
      <div
        className="absolute h-72 w-72 rounded-full opacity-25 blur-[100px] pointer-events-none lg:h-96 lg:w-96"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="relative aspect-square w-full max-w-md flex items-center justify-center">
        {/* Dash Orbit Ring */}
        <div
          className="absolute inset-6 rounded-full border border-dashed opacity-25 animate-[spin_60s_linear_infinite]"
          style={{ borderColor: ACCENT }}
        />

        {/* 1. Professional Wooden Bat */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [22, 19, 22] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-20 flex h-72 w-16 sm:h-96 sm:w-20 flex-col items-center justify-between rounded-2xl border border-amber-300/30 bg-gradient-to-b from-amber-200 via-amber-700 to-amber-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(183,255,0,0.25)] overflow-hidden"
        >
          <div className="h-24 sm:h-32 w-full rounded-lg bg-gradient-to-b from-slate-950 via-slate-900 to-emerald-950 border-b-2 border-amber-400/50 shadow-inner" />
          <div className="absolute inset-y-28 inset-x-2 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.2)_50%,transparent_100%)] pointer-events-none" />
          <div
            className="w-full rounded bg-slate-950/80 backdrop-blur-sm border py-1.5 text-[9px] font-black tracking-widest text-center uppercase"
            style={{ borderColor: "rgba(183,255,0,0.4)", color: ACCENT }}
          >
            RESORT PRO
          </div>
        </motion.div>

        {/* 2. Premium Leather Ball */}
        <motion.div
          animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute z-30 top-4 left-6 sm:left-10 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full border border-red-400/40 bg-gradient-to-br from-red-500 via-red-700 to-red-950 shadow-[0_15px_35px_rgba(0,0,0,0.8),inset_-6px_-6px_12px_rgba(0,0,0,0.8),0_0_25px_rgba(239,68,68,0.4)]"
        >
          <div className="h-1 w-full transform rotate-45 border-b border-dashed border-white/70 shadow-sm" />
        </motion.div>

        {/* 3. Luxury Helmet */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute z-20 bottom-6 right-4 sm:right-8 flex h-32 w-40 sm:h-40 sm:w-48 flex-col justify-end rounded-t-full border border-white/15 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-3 shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(183,255,0,0.15)] overflow-hidden"
        >
          <div className="flex h-16 w-full flex-col justify-around rounded-b-xl border-2 border-slate-400/60 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent p-1">
            <div className="h-0.5 w-full bg-slate-300/80" />
            <div className="h-0.5 w-full bg-slate-300/80" />
            <div className="h-0.5 w-full bg-slate-300/80" />
          </div>
        </motion.div>

        {/* 4. Batting Gloves */}
        <motion.div
          animate={{ y: [0, 8, 0], rotate: [-12, -15, -12] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute z-10 bottom-10 left-4 sm:left-8 flex h-24 w-28 sm:h-28 sm:w-32 flex-col justify-between rounded-2xl border border-white/15 bg-slate-900/90 p-2.5 backdrop-blur-md shadow-2xl"
        >
          <div className="flex gap-1.5">
            <div
              className="h-10 flex-1 rounded bg-slate-800 border-t-2"
              style={{ borderColor: ACCENT }}
            />
            <div
              className="h-10 flex-1 rounded bg-slate-800 border-t-2"
              style={{ borderColor: ACCENT }}
            />
            <div
              className="h-10 flex-1 rounded bg-slate-800 border-t-2"
              style={{ borderColor: ACCENT }}
            />
          </div>
          <div
            className="flex h-6 w-full items-center justify-center rounded border"
            style={{
              backgroundColor: "rgba(183,255,0,0.15)",
              borderColor: "rgba(183,255,0,0.4)",
            }}
          >
            <span
              className="text-[8px] font-extrabold uppercase"
              style={{ color: ACCENT }}
            >
              STREAM SIDE
            </span>
          </div>
        </motion.div>

        {/* Ground Glow Shadow Base */}
        <div
          className="absolute -bottom-8 h-8 w-3/4 rounded-full blur-xl pointer-events-none opacity-40"
          style={{ backgroundColor: ACCENT }}
        />
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FEATURE CARDS
// ---------------------------------------------------------------------------

function FeatureBlock({ icon: Icon, title, subtitle }) {
  return (
    <motion.div
      variants={featureScale}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-md transition-all duration-300 hover:bg-slate-900/90 hover:border-white/25 overflow-hidden"
    >
      {/* Hover accent line */}
      <div
        className="absolute top-0 left-0 h-full w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: ACCENT }}
      />

      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-slate-950 transition-colors duration-300 group-hover:border-[#B7FF00]"
        style={{ "--accent": ACCENT }}
      >
        <Icon className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-[color:var(--accent)]" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-tight text-white transition-colors duration-300 group-hover:text-[#B7FF00]">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-snug text-slate-400">{subtitle}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// STATS CARD
// ---------------------------------------------------------------------------

function StatBlock({ icon: Icon, value, label }) {
  return (
    <motion.div
      variants={slideUp}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group flex flex-col items-center text-center py-2"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 mb-3 transition-colors duration-300 group-hover:border-[#B7FF00] shadow-[0_0_15px_rgba(183,255,0,0.1)]">
        <Icon className="h-5 w-5" style={{ color: ACCENT }} />
      </div>
      <div className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl drop-shadow-md">
        {value}
      </div>
      <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        <span
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        {label}
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function CricketHero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-sans text-white select-none flex flex-col justify-between pt-28 pb-10 px-4 sm:px-8 lg:px-12">
      {/* 1. ATMOSPHERIC BACKGROUND */}
      {/* <StadiumAtmosphere /> */}

      {/* 2. MAIN TWO-COLUMN CONTENT AREA */}
      <div className="relative z-10 mx-auto w-full max-w-7xl flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-6">
          {/* LEFT SIDE: ENTERPRISE COPY & CARDS */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Glowing Live Badge */}
            {/* <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-slate-900/70 px-4 py-1.5 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(183,255,0,0.12)]"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: ACCENT }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: ACCENT }}
                />
              </span>
              <span
                className="text-xs font-extrabold tracking-widest uppercase"
                style={{ color: ACCENT }}
              >
                PREMIUM CRICKET EXPERIENCE
              </span>
            </motion.div> */}

            {/* Impact Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 font-display font-black uppercase leading-[0.95] tracking-tight text-4xl lg:text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            >
              <span className="block text-white">Play</span>
              <span className="block text-lime-400 drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)]">
                The Game.
              </span>
            </motion.h1>

            {/* Paragraph Description */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-300  mb-8 drop-shadow-sm"
            >
              Play exciting cricket matches amidst lush forests and scenic hills
              of Yelagiri. Enjoy unforgettable moments with friends on premium
              natural cricket grounds.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={slideUp}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10"
            >
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 30px rgba(183,255,0,0.5)",
                }}
                whileTap={{ scale: 0.96 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-slate-950 font-extrabold text-sm tracking-wide flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_20px_rgba(183,255,0,0.3)] cursor-pointer"
                style={{ backgroundColor: ACCENT }}
              >
                <span>Book Cricket Match</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </motion.button>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.03,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-slate-900/50 text-white font-bold text-sm tracking-wide backdrop-blur-md flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer hover:border-white/40"
              >
                <Play className="h-4 w-4 fill-white text-white" />
                <span>Watch Highlights</span>
              </motion.button>
            </motion.div>

            {/* Feature Cards Grid */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl"
            >
              {FEATURES.map((f) => (
                <FeatureBlock key={f.title} {...f} />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: 3D EQUIPMENT SHOWCASE */}
          <div className="lg:col-span-5">
            <EquipmentShowcase />
          </div>
        </div>
      </div>

      {/* 3. GLASSMORPHISM BOTTOM STATS BAR */}
      {/* <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto w-full mt-8"
      >
        <div className="w-full rounded-[30px] border border-white/10 bg-slate-900/60 p-6 md:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {STATS.map((s, idx) => (
              <div key={s.label} className={idx > 0 ? "pt-4 lg:pt-0" : ""}>
                <StatBlock {...s} />
              </div>
            ))}
          </div>
        </div>
      </motion.div> */}
    </section>
  );
}
