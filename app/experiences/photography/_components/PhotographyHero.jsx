"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PiCameraFill, PiMountainsFill } from "react-icons/pi";
import {
  LuUsers,
  LuMapPin,
  LuCalendarDays,
  LuArrowRight,
  LuPlay,
} from "react-icons/lu";

const PhotographyHero = () => {
  const features = [
    {
      icon: PiMountainsFill,
      label: "Epic Locations",
      sub: "Scenic & Hidden Gems",
    },
    {
      icon: PiCameraFill,
      label: "Perfect Lights",
      sub: "Sunrise to Night Skies",
    },
    { icon: LuUsers, label: "Expert Guides", sub: "Photographers & Mentors" },
    { icon: PiCameraFill, label: "Pro Support", sub: "Gear & Technique Help" },
  ];

  const stats = [
    { icon: LuUsers, value: "2000+", label: "Happy Photographers" },
    { icon: LuMapPin, value: "15+", label: "Scenic Locations" },
    { icon: PiCameraFill, value: "5+", label: "Photography Styles" },
    {
      icon: LuCalendarDays,
      value: "Year Round",
      label: "Best Time to Capture",
    },
  ];

  const thumbnails = [
    "/photography/thumb-waterfall.jpg",
    "/photography/thumb-sunset.jpg",
    "/photography/thumb-night.jpg",
  ];

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 font-sans text-white select-none">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-[position:25%_center] lg:bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: `url('/All-Images/photo-gallery.png')`,
          }}
        />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/40 via-transparent to-slate-950 pointer-events-none" />
      </div>

      {/* 2. Main Content */}
      <div className="relative z-20 w-full px-4 md:px-8 pt-32 ">
        <div className="max-w-2xl">
          {/* Eyebrow Badge */}
          {/* <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-xs border border-lime-400/40 rounded-full px-4 py-1.5"
          >
            <PiCameraFill className="w-3.5 h-3.5 text-lime-400 shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] text-lime-400 uppercase whitespace-nowrap">
              Photography Experience
            </span>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 font-display font-black uppercase leading-[0.95] tracking-tight text-4xl lg:text-6xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
          >
            <span className="block text-white">Capture</span>
            <span className="block text-lime-400 drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)]">
              The Moments.
            </span>
          </motion.h1>

          {/* Divider */}
          {/* <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 flex items-center gap-3 origin-left"
          >
            <div className="h-px w-16 bg-lime-400/60" />
            <span className="w-1.5 h-1.5 rotate-45 bg-lime-400 shrink-0" />
          </motion.div> */}

          {/* Description */}
          {/* <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-5 text-sm sm:text-base text-slate-300/95 leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
          >
            From golden sunrises to misty mountains, every frame tells a story.
            Explore breathtaking locations and create memories that last
            forever.
          </motion.p> */}

          {/* Feature Icon Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 grid grid-cols-2 lg:flex lg:flex-wrap items-start gap-3 lg:gap-x-6 lg:gap-y-5"
          >
            {features.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-auto bg-black/30 backdrop-blur-xs border border-white/10 rounded-xl p-3 lg:p-0 lg:bg-transparent lg:border-none lg:backdrop-blur-none"
              >
                <div className="w-11 h-11 rounded-full border border-lime-400/50 flex items-center justify-center mb-2 shrink-0">
                  <Icon className="w-4.5 h-4.5 text-lime-400" />
                </div>
                <span className="text-sm font-bold text-white leading-tight">
                  {label}
                </span>
                <span className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  {sub}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-10 lg:mt-8 flex flex-col lg:flex-row lg:flex-wrap items-stretch lg:items-center gap-3 lg:gap-4 pb-4 lg:pb-0"
          >
            <a
              href="#photography"
              className="inline-flex items-center justify-center gap-2 bg-lime-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-lg hover:bg-lime-300 transition-colors duration-200"
            >
              <PiCameraFill className="w-4 h-4" />
              Explore Photography
              <LuArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#reel"
              className="inline-flex items-center justify-center gap-2 border border-white/25 text-white font-semibold text-sm px-6 py-3 rounded-lg bg-black/20 backdrop-blur-xs hover:bg-white/10 transition-colors duration-200"
            >
              <LuPlay className="w-4 h-4" />
              Watch Reel
            </a>
          </motion.div>
        </div>
      </div>

      {/* 3. Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
            <div className="grid grid-cols-2 gap-3 w-full lg:flex lg:flex-wrap lg:items-center lg:gap-x-8 lg:gap-y-5 lg:w-auto">
              {stats.map(({ icon: Icon, value, label }, idx) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-3 text-white bg-white/5 border border-white/10 rounded-xl p-3 lg:bg-transparent lg:border-none lg:rounded-none lg:p-0",
                    idx !== 0 && "lg:border-l lg:border-white/15 lg:pl-8",
                  )}
                >
                  <span className="w-10 h-10 rounded-full border border-lime-400/50 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-lime-400" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-lg lg:text-xl font-bold text-white tracking-tight">
                      {value}
                    </div>
                    <div className="text-xs text-slate-400 font-medium whitespace-nowrap">
                      {label}
                    </div>
                    <div className="mt-1 h-0.5 w-5 bg-lime-400" />
                  </div>
                </div>
              ))}
            </div>

            {/* Thumbnail Stack */}
            {/* <div className="hidden lg:flex items-center -space-x-6">
              {thumbnails.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="Photography highlight"
                  className="w-16 h-20 object-cover rounded-lg border-2 border-white/80 shadow-lg"
                  style={{ transform: `rotate(${(i - 1) * 6}deg)`, zIndex: i }}
                />
              ))}
            </div> */}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PhotographyHero;
