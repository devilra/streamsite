"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WiStars } from "react-icons/wi";
import { CiLocationOn } from "react-icons/ci";
import { GoTelescope } from "react-icons/go";
import { SlCalender as SlCalendarIcon } from "react-icons/sl";

const StargazingHero = () => {
  const stats = [
    { icon: WiStars, value: "2000+", label: "Happy Stargazers" },
    { icon: CiLocationOn, value: "6+", label: "Prime Locations" },
    { icon: GoTelescope, value: "5+", label: "Telescopes", filled: true },
    { icon: SlCalendarIcon, value: "Year Round", label: "Stargazing" },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-950 font-sans text-white select-none flex items-center justify-center">
      {/* 1. Background Image Container */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url('/stargazing/star.png')` }}
        />
        {/* Subtle dark tint gradient overlay to improve text readability on mobile background */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/50 via-transparent to-slate-950/90 pointer-events-none" />

        {/* Bottom Smooth Blend */}
        <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* 2. Main Center Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-24 pb-12 flex flex-col justify-center min-h-screen">
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          {/* Main Copy/Stats Column - Centered properly when standalone on small layouts */}
          <div className="lg:col-span-8 flex flex-col items-start text-left max-w-2xl lg:max-w-none">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-black uppercase leading-[1.05] sm:leading-[0.95] tracking-tight text-4xl sm:text-6xl md:text-7xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            >
              <span className="block text-white">STARGAZING</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-300 drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)]">
                &amp; NIGHTS
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base text-slate-300/95 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              Explore hidden forest trails, breathtaking viewpoints and
              unforgettable sunrise adventures in the pristine hills of
              Yelagiri.
            </motion.p>

            {/* Stats Responsive Box Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 sm:mt-12 grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-5 w-full sm:w-auto"
            >
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center gap-3 bg-black/20 backdrop-blur-xs p-2 rounded-xl sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
                  >
                    <Icon
                      className={cn(
                        "w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-lime-400",
                        stat.filled && "fill-lime-400",
                      )}
                    />
                    <div className="leading-tight">
                      <div className="text-[14px] sm:text-[20px] font-bold text-white tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-400 font-medium whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Hidden Layout Placeholder Column - Prevents sizing jumps on larger devices */}
          <div className="hidden lg:block lg:col-span-4" />
        </div>
      </div>
    </section>
  );
};

export default StargazingHero;
