"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import { motion } from "framer-motion";
import { Compass, Tent, Sparkles, MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
  // Generate random stars only after the component mounts
  const [starsArray, setStarsArray] = useState([]);

  useEffect(() => {
    const stars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 90 + 5}%`,
      left: `${Math.random() * 96 + 2}%`,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3,
    }));

    setStarsArray(stars);
  }, []);

  const features = [
    {
      title: "Luxury Dome Stays",
      desc: "Sleep under a canopy of stars in our temperature-controlled geodesic domes.",
      icon: Tent,
      tag: "Popular",
    },
    {
      title: "Guided Peak Treks",
      desc: "Conquer the highest trails of Yelagiri Hills with certified local guides.",
      icon: Compass,
      tag: "Adventure",
    },
    {
      title: "Acoustic Campfires",
      desc: "Enjoy private barbecue nights and unplugged acoustic sets under the sky.",
      icon: Sparkles,
      tag: "Exclusive",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500 font-sans text-slate-900 dark:text-slate-100">
      {/* 1. Starry Sky Background (Only visible or styled nicely in dark mode) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5 dark:opacity-60 transition-opacity">
        {starsArray.length > 0 &&
          starsArray.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-slate-950 dark:bg-white"
              style={{
                top: star.top,
                left: star.left,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [0.2, 0.9, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {/* 2. Glowing Nebulas / Ambient Lights */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Blue/indigo top glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[150px]" />
        {/* Lime/green bottom glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-lime-500/5 dark:bg-lime-500/10 blur-[150px]" />
      </div>

      {/* 3. The Responsive Floating Navbar */}
      <Navbar />

      {/* 4. Hero Content Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-16 max-w-5xl mx-auto text-center">
        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-lime-400/20 bg-lime-400/10 text-lime-400 text-xs font-semibold mb-6 shadow-[0_0_15px_rgba(163,230,53,0.1)]"
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Yelagiri Hills, India</span>
        </motion.div>

        {/* Cinematic Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6"
        >
          Escape into the <br />
          <span className="bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
            Sanctuary of the Skies
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10"
        >
          Discover Stream Side: a luxury eco-haven nestled high in the Yelagiri
          peaks. Unwind in floating glass domes, savor rustic campfire nights,
          and gaze deep into the stellar universe.
        </motion.p>

        {/* Hero CTA Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm mb-20"
        >
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-black bg-lime-400 hover:bg-lime-300 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.25)] hover:scale-[1.02] flex items-center justify-center gap-2">
            <span>Explore Stay Options</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
            View Experiences
          </button>
        </motion.div>

        {/* Feature Grid demonstrating premium glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="grid sm:grid-cols-3 gap-6 w-full text-left"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/85 dark:bg-white/[0.02] backdrop-blur-md shadow-xl hover:border-lime-400/30 dark:hover:border-lime-400/30 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-[9px] font-bold tracking-widest text-lime-400 uppercase bg-lime-500/10 px-2 py-0.5 rounded-full">
                  {feature.tag}
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500/20 to-emerald-500/10 flex items-center justify-center text-lime-400 mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* 5. Minimalist Ambient Foothills Vector (Visual anchor) */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-40 pointer-events-none opacity-20 dark:opacity-20">
        <svg
          viewBox="0 0 1440 200"
          className="w-full h-full fill-current text-slate-200 dark:text-slate-950"
        >
          <path d="M0,150 L120,130 C240,110,480,70,720,90 C960,110,1200,190,1320,230 L1440,270 L1440,300 L1320,300 C1200,300,960,300,720,300 C480,300,240,300,120,300 L0,300 Z" />
          <path
            d="M0,180 L200,150 C400,120,800,60,1000,90 C1200,120,1300,200,1350,220 L1440,250 L1440,300 L1350,300 C1300,300,1200,300,1000,300 C800,300,400,300,200,300 L0,300 Z"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}
