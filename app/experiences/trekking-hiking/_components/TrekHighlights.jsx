"use client";

import React from "react";
import {
  Mountain,
  Sun,
  TreePine,
  Droplet,
  ShieldCheck,
  Wind,
  Sprout,
  Recycle,
  Handshake,
  MapPin,
  Clock,
  Gauge,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrekHighlights() {
  // Section 1: Highlight cards (4 cards)
  const highlights = [
    {
      title: "Sunrise Views",
      description:
        "Witness magical sunrises that paint the hills with golden hues.",
      icon: Sun,
      image:
        "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Lush Forest Trails",
      description:
        "Trek through dense forests, ancient paths and untouched nature.",
      icon: TreePine,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Hidden Waterfalls",
      description: "Discover crystal clear waterfalls tucked away in the wild.",
      icon: Droplet,
      image:
        "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Scenic Viewpoints",
      description:
        "Breathtaking 360\u00b0 views that make every step worth it.",
      icon: Mountain,
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Section 2: Trek Types
  const trekTypes = [
    {
      number: "01",
      tag: "EASY",
      tagColor: "bg-emerald-500 text-emerald-950",
      title: "Easy Treks",
      description:
        "Perfect for beginners and families. Short duration with beautiful views.",
      distance: "1 - 3 KM",
      duration: "1 - 2 Hrs",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "02",
      tag: "MODERATE",
      tagColor: "bg-amber-400 text-amber-950",
      title: "Moderate Treks",
      description:
        "For adventure lovers looking for a balanced challenge and rewards.",
      distance: "3 - 7 KM",
      duration: "2 - 4 Hrs",
      level: "Moderate",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "03",
      tag: "HARD",
      tagColor: "bg-orange-500 text-orange-950",
      title: "Difficult Treks",
      description:
        "Challenging trails for experienced trekkers seeking adventure.",
      distance: "7 - 12 KM",
      duration: "4 - 8 Hrs",
      level: "Advanced",
      image:
        "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=800&q=80",
    },
    {
      number: "04",
      tag: "SPECIAL",
      tagColor: "bg-violet-500 text-violet-950",
      title: "Special Treks",
      description:
        "Unique experiences like night treks, camping, and waterfall treks.",
      distance: "Varies",
      duration: "Varies",
      level: "All Levels",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  // Section 3: Why Trek in Yelagiri
  const whyTrekFeatures = [
    {
      title: "Pure & Fresh Air",
      description: "Breathe in the cleanest air",
      icon: Wind,
    },
    {
      title: "Rich Biodiversity",
      description: "Home to diverse flora and fauna",
      icon: Sprout,
    },
    {
      title: "Safe & Guided",
      description: "Expert guides ensure your safety",
      icon: ShieldCheck,
    },
    {
      title: "Eco Friendly",
      description: "We follow responsible trekking practices",
      icon: Recycle,
    },
    {
      title: "Support Local",
      description: "Empower local communities with every trek",
      icon: Handshake,
    },
  ];

  // Small reusable stat box used inside each Trek Type card.
  // Sized to fit its own content (inline-flex, whitespace-nowrap) instead of
  // being squeezed into equal grid columns — that's what was cutting off
  // "Beginner" -> "Beginne" / "Advanced" -> "Advance" before. The row wraps
  // naturally to a new line if a box doesn't fit, on both mobile & desktop.
  const StatBox = ({ icon: Icon, value, label }) => (
    <div className="inline-flex flex-row items-center gap-1 md:gap-2 rounded-sm border border-white/10 bg-white/5 px-1 py-1.5 whitespace-nowrap">
      <Icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-lime-400 shrink-0" />
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="text-[5.5px] md:text-[11px] lg:text-[6px]  text-white leading-none whitespace-nowrap">
          {value}
        </span>
        <span className="text-[5.5px] md:text-[10px] lg:text-[7px] text-slate-500 leading-none whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );

  return (
    <section className="bg-slate-950 text-white py-8 sm:py-12 px-2 sm:px-6 md:px-5 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 sm:gap-10">
        {/* Header */}
        <div className="flex flex-col items-start text-left gap-3 max-w-2xl">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Mountain className="w-3.5 h-3.5" />
            <span>Experience the Best of Yelagiri</span>
          </div> */}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05]">
            Trek Highlights
          </h2>

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

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Yelagiri offers diverse trekking experiences for every kind of
            adventurer. Explore breathtaking views, lush forests, hidden
            waterfalls and peaceful trails.
          </p>
        </div>

        {/* SECTION 1: Highlight Cards (4 cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="col-span-1 group relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.5)] cursor-pointer select-none"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.65] group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent" />
                </div>

                <div className="relative z-10 p-3 sm:p-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center">
                    <Icon className="w-4 h-4 text-lime-400" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4 flex flex-col gap-1.5">
                  <h3 className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <span className="h-0.5 w-6 bg-lime-400 rounded-full" />
                  <p className="hidden sm:block text-[10px] lg:text-xs text-slate-300 leading-snug">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECTION 2: Trek Types */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 sm:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left title block */}
          <div className="flex flex-col gap-2 shrink-0 lg:w-56">
            <div className="flex items-center gap-2">
              <Footprints01 />
              <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                Trek Types
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-snug">
              Choose the adventure that fits your spirit
            </p>
          </div>

          {/* Trek type cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-2 flex-1">
            {trekTypes.map((type) => (
              <div
                key={type.number}
                className="col-span-1 rounded-2xl border border-white/10 bg-white/5 overflow-hidden flex flex-col"
              >
                {/* Image with badges */}
                <div className="relative h-24 sm:h-28 overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover brightness-[0.7]"
                  />
                  <span className="absolute top-2 left-2 w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center">
                    {type.number}
                  </span>
                  <span
                    className={cn(
                      "absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] font-bold uppercase tracking-wide",
                      type.tagColor,
                    )}
                  >
                    {type.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 flex flex-col gap-1.5 flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {type.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed flex-1">
                    {type.description}
                  </p>

                  {/* Stats row: each stat box sizes itself to its own
                      content and simply wraps to a new line if it doesn't
                      fit — same behaviour on mobile and desktop, no forced
                      equal columns squeezing the text. */}
                  <div className="flex flex-row flex-wrap gap-1 pt-2 mt-1 border-t border-white/10">
                    <StatBox
                      icon={MapPin}
                      value={type.distance}
                      label="Distance"
                    />
                    <StatBox
                      icon={Clock}
                      value={type.duration}
                      label="Duration"
                    />
                    <StatBox icon={Gauge} value={type.level} label="Level" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Why Trek in Yelagiri footer bar */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 sm:p-8 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
          {/* Left title + arrow */}
          <div className="flex items-center justify-between lg:justify-start gap-4 shrink-0 lg:w-64">
            <div className="flex items-center gap-2">
              <Leaf01 />
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight leading-tight">
                Why Trek in
                <br className="hidden sm:block" /> Yelagiri?
              </h3>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6 flex-1 lg:pl-6 lg:border-l lg:border-white/10">
            {whyTrekFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex flex-col gap-1.5">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-lime-400" />
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {feature.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 leading-snug">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Small leaf icon used next to the "Why Trek in Yelagiri?" heading
function Leaf01() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-lime-400 shrink-0"
    >
      <path d="M11 20A7 7 0 0 1 4 13V8a1 1 0 0 1 1-1h5a7 7 0 0 1 7 7v0a7 7 0 0 1-6 6z" />
      <path d="M4 8s1.5 6 8 10" />
    </svg>
  );
}

// Small footprints icon used next to "Trek Types" heading
function Footprints01() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-lime-400 shrink-0"
    >
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 9c.03-1.9 1.05-3.5 3-3.5 2 0 2.5 3.5 4 3.5" />
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-4.62-.03-1.9-1.05-3.5-3-3.5-2 0-2.5 3.5-4 3.5" />
      <path d="M16 17c0 1.1-.9 2-2 2s-2-.9-2-2 .5-1.5.5-2.5c0-.4-.4-1-1-1s-1 .6-1 1c0 1-.5 1.5-.5 2.5 0 1.1-.9 2-2 2s-2-.9-2-2" />
    </svg>
  );
}
