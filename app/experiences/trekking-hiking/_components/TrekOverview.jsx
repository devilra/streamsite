"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mountain,
  Footprints,
  Users,
  Camera,
  UserCheck,
  ShieldCheck,
  Leaf,
  Handshake,
  Sprout,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrekOverview() {
  const [imageIndex, setImageIndex] = useState(0);

  // Auto-sliding hero images for the right side visual
  const images = [
    "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=1200&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const stats = [
    {
      label: "Scenic Trails",
      sub: "Curated with care",
      value: "15+",
      icon: Footprints,
    },
    {
      label: "Happy Trekkers",
      sub: "Memories created",
      value: "5000+",
      icon: Users,
    },
    {
      label: "View Points",
      sub: "Breathtaking views",
      value: "30+",
      icon: Mountain,
    },
    {
      label: "Photo Spots",
      sub: "Capture the wild",
      value: "50+",
      icon: Camera,
    },
  ];

  const features = [
    {
      title: "Expert Guides",
      description:
        "Trained & experienced guides ensure your safety and comfort.",
      icon: UserCheck,
    },
    {
      title: "Safe & Secure",
      description: "First aid, safety gear and support on every trail.",
      icon: ShieldCheck,
    },
    {
      title: "Eco Friendly",
      description:
        "We follow responsible trekking practices to protect nature.",
      icon: Leaf,
    },
    {
      title: "Small Groups",
      description: "Enjoy a personalized experience in small group sizes.",
      icon: Users,
    },
    {
      title: "Local Support",
      description: "Empowering local communities and creating opportunities.",
      icon: Handshake,
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-5  px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-10 sm:gap-14">
        {/* TOP: Text + Image */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Copy & Stats */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow label */}
            <div className="flex items-center gap-2">
              <Mountain className="w-5 h-5 text-lime-400" strokeWidth={2.5} />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-lime-400 uppercase">
                About Trekking
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black leading-[1.05] tracking-tight">
              <span className="text-white">Discover Yelagiri</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-300">
                One Step at a Time
              </span>
            </h2>

            {/* Squiggle divider */}
            <svg
              width="90"
              height="12"
              viewBox="0 0 90 12"
              fill="none"
              className="text-lime-400"
            >
              <path
                d="M2 8C10 2 18 2 26 6C34 10 42 10 50 6C58 2 66 2 74 6C79 8.5 82 8.5 88 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Paragraphs */}
            <div className="flex flex-col gap-4 max-w-xl">
              <p className="text-[15px] text-slate-300 leading-relaxed">
                Yelagiri Hills is a trekker's paradise, filled with lush
                forests, rolling hills, serene lakes and breathtaking
                viewpoints.
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our trekking experiences are curated for all adventure lovers —
                whether you are a beginner or an expert, every trail brings you
                closer to nature and yourself.
              </p>
            </div>

            {/* Stats Row */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 mt-2 pt-6 border-t border-white/10">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={cn(
                      "flex flex-col gap-2 pl-0",
                      idx !== 0 && "sm:border-l sm:border-white/10 sm:pl-4",
                    )}
                  >
                    <Icon className="w-6 h-6 text-lime-400" strokeWidth={2} />
                    <div className="text-2xl sm:text-3xl font-black text-lime-400 leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {stat.label}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-400 leading-tight">
                      {stat.sub}
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>

          {/* Right: Auto-sliding Image */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={images[imageIndex]}
                alt="Trekking at Yelagiri Hills"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.85]"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

            {/* Slide indicator dots */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-20">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    idx === imageIndex
                      ? "w-6 bg-lime-400"
                      : "w-1.5 bg-white/40",
                  )}
                />
              ))}
            </div>

            {/* Overlay info card */}
            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-[62%] sm:w-56 rounded-xl sm:rounded-2xl bg-black/70 backdrop-blur-md border border-lime-400/20 p-3.5 sm:p-5 flex flex-col gap-1.5 sm:gap-2 z-20">
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
              <h4 className="text-xs sm:text-base font-bold text-white leading-tight">
                Connected with Nature
              </h4>
              <p className="text-[10px] sm:text-xs text-slate-300 leading-snug">
                Breathe pure air, walk green trails, feel the freedom.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM: Trekking Experience feature band */}
        <div className="rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-6 md:items-start lg:items-center">
          {/* Left title block */}
          <div className="flex flex-col gap-2 shrink-0 md:w-56">
            <Leaf className="w-5 h-5 text-lime-400" />
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              Trekking
              <br className="hidden md:block" /> Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-snug">
              What makes our treks unforgettable?
            </p>
          </div>

          {/* Feature cards — ATM-card style boxes.
              Mobile: 2-column grid, vertically scrollable, scrollbar hidden.
              Desktop (lg+): single row of 5 cards, no scroll needed. */}
          <div className="flex-1 md:pl-6 md:border-l md:border-white/10 w-full">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 max-h-[340px] lg:max-h-none overflow-y-auto lg:overflow-visible no-scrollbar pr-1 lg:pr-0">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-white/10 bg-white/5 hover:border-lime-400/40 hover:bg-lime-400/5 transition-colors duration-300 p-4 flex flex-col gap-2.5 h-40 sm:h-44"
                  >
                    <div className="w-8 h-8 rounded-lg bg-lime-400/10 border border-lime-400/20 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-lime-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
