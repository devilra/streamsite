"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Telescope,
  User,
  Mountain,
  Users,
  MapPin,
  Star,
  Eye,
  Clock,
  Thermometer,
} from "lucide-react";

export default function StargazingOverview() {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=1200&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const features = [
    {
      title: "Clear Night Skies",
      description:
        "High altitude with minimal light pollution for perfect visibility.",
      icon: Telescope,
    },
    {
      title: "Expert Guidance",
      description:
        "Learn about constellations, planets and galaxies from our astro experts.",
      icon: User,
    },
    {
      title: "Prime Locations",
      description:
        "Carefully selected viewpoints with 360\u00b0 open sky and breathtaking views.",
      icon: Mountain,
    },
    {
      title: "For Everyone",
      description:
        "Perfect for families, couples, friends and solo travelers of all ages.",
      icon: Users,
    },
  ];

  const stats = [
    { icon: MapPin, value: "1200+", label: "Altitude", sub: "Meters" },
    {
      icon: Star,
      value: "1000+",
      label: "Visible Stars",
      sub: "On Clear Nights",
    },
    {
      icon: Eye,
      value: "Oct \u2013 Mar",
      label: "Best Time",
      sub: "Every Year",
    },
    {
      icon: Clock,
      value: "2 \u2013 3 Hrs",
      label: "Duration",
      sub: "Per Session",
    },
    {
      icon: Thermometer,
      value: "15\u00b0 \u2013 22\u00b0C",
      label: "Temperature",
      sub: "Cool & Pleasant",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col gap-10 sm:gap-12">
        {/* TOP: Text + Image */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Copy & Features */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow */}
            <div className="flex items-center gap-2">
              <span className="w-8 h-px bg-lime-400" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-lime-400 uppercase">
                Overview
              </span>
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase leading-[1.1] tracking-tight">
              <span className="text-white">Explore the Universe</span>
              <br />
              <span className="text-lime-400">From Yelagiri Hills</span>
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              When the sun sets, Yelagiri reveals its magical night sky. Far
              from city lights and pollution, our high-altitude locations offer
              crystal-clear views of stars, planets, and the Milky Way. Whether
              you're a beginner or an astronomy enthusiast, our stargazing
              experiences are designed to inspire wonder and create
              unforgettable memories.
            </p>

            {/* Feature grid — 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-7 mt-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-3.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-lime-400/10 border border-lime-400/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Auto-sliding image carousel */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={images[imageIndex]}
                alt="Stargazing at Yelagiri Hills"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Slide indicator dots */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-20">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === imageIndex ? "w-6 bg-lime-400" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM: Stats band */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 sm:p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-lime-400" />
                  <span className="text-xs sm:text-sm font-medium text-white">
                    {stat.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-black text-lime-400 leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-400">
                    {stat.sub}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
