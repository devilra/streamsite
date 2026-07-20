"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  Crosshair,
  Locate,
  Camera,
  Eye,
  CheckCircle2,
  Star,
  Aperture,
  Orbit,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function TelescopeExperience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const features = [
    {
      icon: Crosshair,
      title: "High Precision Optics",
      description: "Advanced lenses for exceptional clarity and brightness.",
    },
    {
      icon: Locate,
      title: "Motorized Tracking",
      description: "Tracks celestial objects smoothly and accurately.",
    },
    {
      icon: Camera,
      title: "Astrophotography Ready",
      description: "Capture the cosmos with DSLR/phone compatibility.",
    },
    {
      icon: Eye,
      title: "Perfect Viewing",
      description: "Wide field of view for both planets and deep-sky objects.",
    },
  ];

  const specs = [
    { label: "Aperture", value: "203 mm (8 inch)" },
    { label: "Focal Length", value: "1200 mm" },
    { label: "Focal Ratio", value: "f/6" },
    { label: "Eyepieces", value: "10mm, 25mm" },
    { label: "Mount", value: "Equatorial (Motorized)" },
    { label: "Best For", value: "Planets, Nebulae, Galaxies" },
  ];

  const stats = [
    {
      icon: Aperture,
      value: "8\u201d",
      label: "Aperture",
      description: "More light, more detail",
    },
    {
      icon: Orbit,
      value: "2M+",
      label: "Deep Sky Objects",
      description: "Explore galaxies, nebulae & more",
    },
    {
      icon: Eye,
      value: "360\u00b0",
      label: "Viewing Experience",
      description: "Smooth tracking for stunning views",
    },
    {
      icon: Users,
      value: "All Ages",
      label: "Perfect for Everyone",
      description: "Beginners to experts, everyone loves it",
    },
  ];

  return (
    <section className="relative w-full bg-slate-950 text-white overflow-hidden py-14 sm:py-20">
      {/* Background telescope photo — full-bleed, same fade treatment as the site Hero
          so this section blends seamlessly into bg-slate-950 at the edges. */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src={
            isMobile
              ? "/All-Images/telescope-mobile.png"
              : "/All-Images/telescope.png"
          }
          alt="Telescope under the stars"
          fill
          priority
          className="w-full h-full object-cover"
        />
        {/* Left-to-right dark overlay for text legibility over the image */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/85 sm:via-slate-950/75 to-slate-950/20" />
        {/* Bottom fade — blends the image seamlessly into the page's bg-slate-950 */}
        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-56 bg-linear-to-t from-slate-950 via-slate-950/85 to-transparent pointer-events-none" />
        {/* Top fade — same treatment so the top edge blends too */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-slate-950 via-slate-950/60 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-[0.3em] text-lime-400 uppercase">
              Telescope Experience
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="flex-1 h-px bg-lime-400/30 max-w-24" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
            <span className="text-white">See the Universe</span>
            <br />
            <span className="text-lime-400">Up Close</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our high-performance telescopes bring distant planets, stars, and
            galaxies right before your eyes. Designed for crystal-clear views
            and unforgettable moments.
          </p>
        </div>

        {/* Premium equipment badge (top-right, floats over the image on desktop) */}
        <div className="hidden lg:flex absolute top-0 right-4 xl:right-10 w-32 h-32 rounded-full border border-dashed border-lime-400/50 flex-col items-center justify-center text-center gap-1 p-3">
          <Star className="w-4 h-4 text-lime-400 fill-lime-400" />
          <span className="text-[11px] font-bold text-lime-400 uppercase leading-tight">
            Premium Equipment
          </span>
          <span className="text-[9px] text-slate-300 leading-tight">
            For the best stargazing experience
          </span>
        </div>

        {/* Feature icons row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex flex-col gap-2.5">
                <div className="w-12 h-12 rounded-full border border-lime-400/30 bg-lime-400/5 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-lime-400" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Premium telescope spec card */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-md p-5 sm:p-6 flex flex-col sm:flex-row gap-5 max-w-2xl">
            <div className="flex-1 flex flex-col gap-3">
              <span className="text-xs font-bold text-lime-400 uppercase tracking-widest">
                Our Premium Telescope
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                Sky-Watcher 8&rdquo; Traditional
              </h3>

              <div className="flex flex-col gap-2 mt-1">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                    <span className="text-slate-400 w-24 shrink-0">
                      {spec.label}
                    </span>
                    <span className="text-slate-500">:</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real view moon photo */}
            <div className="flex flex-col items-center gap-2 shrink-0 self-center sm:self-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-lime-400/50 p-1.5 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&w=300&q=80"
                  alt="Real view through the telescope"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wide text-center">
                Real View
              </span>
              <span className="text-[9px] text-slate-400 text-center leading-tight">
                Through Our Telescope
              </span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-md p-4 flex flex-col gap-1.5"
                >
                  <div className="w-9 h-9 rounded-full border border-lime-400/30 bg-lime-400/5 flex items-center justify-center mb-1">
                    <Icon className="w-4 h-4 text-lime-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-white leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wide">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-slate-400 leading-snug">
                    {stat.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA bar */}
        {/* <div className="rounded-2xl border border-white/10 bg-slate-950/70 backdrop-blur-md p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="w-11 h-11 rounded-xl border border-lime-400/30 bg-lime-400/5 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-lime-400" />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="text-sm text-white">
              Experience the universe like never before.
            </p>
            <p className="text-sm font-bold text-lime-400">
              Join our next stargazing session!
            </p>
          </div>

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400 hover:bg-lime-300 text-slate-950 text-sm font-bold uppercase tracking-wide transition-colors duration-300 shrink-0">
            Book Your Spot
            <ArrowRight className="w-4 h-4" />
          </button>
        </div> */}
      </div>
    </section>
  );
}
