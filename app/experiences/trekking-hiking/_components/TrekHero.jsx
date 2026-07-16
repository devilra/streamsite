"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mountain,
  ArrowRight,
  Play,
  Cloud,
  Leaf,
  Clock,
  MapPin,
  Users,
  Star,
  Camera,
  Flag,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";

const TrekHero = () => {
  const stats = [
    { icon: Mountain, value: "15+", label: "Scenic Trails" },
    { icon: Users, value: "5000+", label: "Happy Trekkers" },
    { icon: Star, value: "4.9", label: "User Rating", filled: true },
    { icon: Camera, value: "50+", label: "Photo Spots" },
  ];

  const trailStatusRows = [
    {
      icon: Cloud,
      iconColor: "text-sky-400",
      iconBg: "bg-sky-500/10",
      label: "Weather",
      value: "22°C",
      valueColor: "text-white",
      sub: "Partly Cloudy",
    },
    {
      icon: Leaf,
      iconColor: "text-lime-400",
      iconBg: "bg-lime-400/10",
      label: "Trail Status",
      value: "Open",
      valueColor: "text-lime-400",
      sub: "All Clear",
    },
    {
      icon: Mountain,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-400/10",
      label: "Difficulty",
      value: "Moderate",
      valueColor: "text-white",
      meter: true,
    },
    {
      icon: Clock,
      iconColor: "text-violet-400",
      iconBg: "bg-violet-400/10",
      label: "Duration",
      value: "2 - 2.5 Hours",
      valueColor: "text-white",
      sub: "Approx",
    },
    {
      icon: MapPin,
      iconColor: "text-rose-400",
      iconBg: "bg-rose-400/10",
      label: "Distance",
      value: "5.2 KM",
      valueColor: "text-white",
      sub: "One Way",
    },
  ];

  const trailPoints = [
    { label: "Start Point", x: 4, y: 78 },
    { label: "Waterfall View", x: 27, y: 45 },
    { label: "View Point", x: 50, y: 52 },
    { label: "Peak Point", x: 74, y: 15, peak: true },
    { label: "End Point", x: 96, y: 70, end: true },
  ];

  // Build a polyline path string through the trail points
  const linePath = trailPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <section className="relative w-full min-h-screen overflow-x-hidden overflow-y-hidden bg-slate-950 font-sans text-white select-none">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-position-[center_top] md:bg-center lg:bg-center"
          style={{ backgroundImage: `url('/All-Images/trek.png')` }}
        />

        {/* 2. Premium Themed Overlay (Cinematic dark vignettes) */}
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/30 to-black/60 pointer-events-none" />

        {/* 2b. Bottom Fade — blends the image seamlessly into the page's bg-slate-950 so the image's bottom edge never shows */}
        <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 z-10 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* 3. Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center gap-10 lg:gap-8 pt-28 pb-10 md:pb-14 lg:pb-16 min-h-screen">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left column: headline, description, actions, stats */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-[11px] font-bold uppercase tracking-wider mb-5 backdrop-blur-md"
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>Yelagiri Adventure Experience</span>
            </motion.div> */}

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black uppercase leading-[0.95] tracking-tight text-5xl sm:text-6xl md:text-7xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
            >
              <span className="block uppercase text-white">TREKKING</span>

              <span className="block uppercase text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-300 drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)]">
                &amp; HIKING
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-5 max-w-md text-sm sm:text-base text-slate-300 leading-relaxed"
            >
              Explore hidden forest trails, breathtaking viewpoints and
              unforgettable sunrise adventures in the pristine hills of
              Yelagiri.
            </motion.p>

            {/* Action buttons */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 flex items-center gap-3"
            >
              <a
                href="#trails"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black bg-lime-400 hover:bg-lime-300 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.55)] active:scale-95"
              >
                Explore Trails
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white/40">
                  <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                </span>
                View Gallery
              </a>
            </motion.div> */}

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-3 md:gap-x-5 gap-y-4"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "w-4 md:w-6 md:h-6 h-4 lg:w-5 lg:h-5 shrink-0 text-lime-400",
                        stat.filled && "fill-lime-400",
                      )}
                    />
                    <div className="leading-tight">
                      <div className="text-[12px] md:text-[20px] font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right column: Trail Status + Trail Overview cards */}
          <div className="lg:col-span-5 w-full flex flex-col gap-4">
            {/* Card 1: Today's Trail Status */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 sm:px-5 py-3.5 border-b border-white/10">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
                </span>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Today&apos;s Trail Status
                </h3>
              </div>

              <div className="divide-y divide-white/5">
                {trailStatusRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center justify-between px-4 sm:px-5 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg shrink-0",
                            row.iconBg,
                            row.iconColor,
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300">
                          {row.label}
                        </span>
                      </div>

                      <div className="text-right">
                        <div
                          className={cn(
                            "text-sm sm:text-base font-bold",
                            row.valueColor,
                          )}
                        >
                          {row.value}
                        </div>
                        {row.sub && (
                          <div className="text-[10px] text-slate-500">
                            {row.sub}
                          </div>
                        )}
                        {row.meter && (
                          <div className="flex items-end justify-end gap-0.5 mt-1">
                            <span className="w-1 h-2 rounded-sm bg-lime-400" />
                            <span className="w-1 h-3 rounded-sm bg-lime-400" />
                            <span className="w-1 h-4 rounded-sm bg-white/20" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Card 2: Trail Overview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-lg overflow-hidden"
            >
              <div className="flex items-center gap-2 px-4 sm:px-5 py-3.5 border-b border-white/10">
                <Mountain className="w-4 h-4 text-lime-400" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  Trail Overview
                </h3>
              </div>

              {/* Route visualization */}
              <div className="px-4 sm:px-5 pt-6 pb-3">
                <div className="relative w-full h-24 sm:h-28">
                  {/* Dashed trail line */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#a3e635"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Points */}
                  {trailPoints.map((p) => (
                    <div
                      key={p.label}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      {p.peak ? (
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-lime-400 text-black shadow-[0_0_12px_rgba(163,230,53,0.6)]">
                          <Mountain className="w-3.5 h-3.5" />
                        </div>
                      ) : p.end ? (
                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-rose-500">
                          <Flag className="w-3 h-3 fill-rose-500" />
                        </div>
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white border-2 border-slate-900" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Labels row (below the visualization, evenly spread) */}
                <div className="relative w-full mt-1 h-8">
                  {trailPoints.map((p) => (
                    <span
                      key={p.label}
                      className="absolute -translate-x-1/2 text-[9px] sm:text-[10px] text-slate-400 whitespace-nowrap"
                      style={{ left: `${p.x}%` }}
                    >
                      {p.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* View full trail map button */}
              <div className="px-4 sm:px-5 pb-4">
                <a
                  href="#trail-map"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Map className="w-4 h-4" />
                  View Full Trail Map
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrekHero;
