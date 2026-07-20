"use client";

import React from "react";
import {
  Sparkles,
  Clock,
  Camera,
  Eye,
  Rocket,
  Telescope,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function NightSkyTimeline() {
  const timeline = [
    {
      time: "6:30 PM",
      label: "Sunset",
      title: "Sunset Views",
      description:
        "Enjoy the golden hues as the sun sets behind the Yelagiri hills.",
      tag: "Best for Photos",
      tagIcon: Camera,
      tagColor: "text-orange-400",
      image:
        "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=300&q=80",
    },
    {
      time: "7:15 PM",
      label: "Twilight",
      title: "Twilight Magic",
      description:
        "The sky turns blue and stars begin to peek through the dimming light.",
      tag: "Perfect Time",
      tagIcon: Sparkles,
      tagColor: "text-violet-400",
      image:
        "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=300&q=80",
    },
    {
      time: "8:00 PM",
      label: "Star Gazing Starts",
      title: "Stars Appear",
      description:
        "Bright stars and constellations become visible across the sky.",
      tag: "Look Up!",
      tagIcon: Eye,
      tagColor: "text-sky-400",
      image:
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=300&q=80",
    },
    {
      time: "9:30 PM",
      label: "Milky Way Rises",
      title: "Milky Way Time",
      description:
        "The Milky Way galaxy rises and paints the sky with cosmic beauty.",
      tag: "Best View",
      tagIcon: Rocket,
      tagColor: "text-violet-400",
      image:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=300&q=80",
    },
    {
      time: "11:00 PM",
      label: "Deep Sky Viewing",
      title: "Deep Sky Objects",
      description:
        "Explore galaxies, nebulae, star clusters and more with our telescopes.",
      tag: "Telescope Time",
      tagIcon: Telescope,
      tagColor: "text-sky-400",
      image:
        "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=300&q=80",
    },
    {
      time: "12:30 AM",
      label: "Night's Peak",
      title: "Peak of the Night",
      description:
        "The darkest and clearest skies for an unforgettable astronomy experience.",
      tag: "Pure Wonder",
      tagIcon: Sparkles,
      tagColor: "text-lime-400",
      image:
        "https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <section className="bg-slate-950 text-white py-14 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-3">
            <span className="w-8 sm:w-10 h-px bg-lime-400/50" />
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-[0.3em] text-lime-400 uppercase">
              <Sparkles className="w-3 h-3" />
              Night Sky Timeline
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="w-8 sm:w-10 h-px bg-lime-400/50" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.1]">
            <span className="text-white">A Perfect Night</span>
            <br />
            <span className="text-lime-400">Under the Stars</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            From sunset to the deep of night, experience the magic of the
            universe as the sky transforms hour by hour.
          </p>

          <div className="flex items-center gap-2 w-40 sm:w-56 mt-1">
            <span className="flex-1 h-px bg-linear-to-r from-transparent to-lime-400/50" />
            <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0" />
            <span className="flex-1 h-px bg-linear-to-l from-transparent to-lime-400/50" />
          </div>
        </div>

        {/* Timeline pill */}
        <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-lime-400/40 text-lime-400 text-xs font-bold uppercase tracking-widest">
          <Clock className="w-3.5 h-3.5" />
          Timeline
        </div>

        {/* Timeline — horizontal row on desktop, vertical stack on mobile */}
        <div className="relative">
          {/* Desktop connector line (behind the circles) */}
          <div className="hidden lg:block absolute top-[74px] left-[4%] right-[4%] h-px bg-linear-to-r from-lime-400/10 via-lime-400/60 to-lime-400/10" />
          {/* Mobile connector line */}
          <div className="lg:hidden absolute top-2 bottom-2 left-[27px] w-px bg-linear-to-b from-lime-400/10 via-lime-400/60 to-lime-400/10" />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
            {timeline.map((item) => {
              const TagIcon = item.tagIcon;
              return (
                <div
                  key={item.time}
                  className="relative flex flex-row lg:flex-col items-start lg:items-center gap-4 lg:gap-3 flex-1"
                >
                  {/* Time + label (desktop: above circle, mobile: not shown separately, folded into circle row) */}
                  <div className="hidden lg:flex flex-col items-center gap-0.5 absolute -top-12 left-1/2 -translate-x-1/2 w-max">
                    <span className="text-sm font-black text-lime-400">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>

                  {/* Circle image node */}
                  <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-lime-400/60 overflow-hidden shrink-0 shadow-[0_0_20px_rgba(163,230,53,0.25)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Mobile: time/label next to circle */}
                  <div className="flex lg:hidden flex-col gap-0.5 pt-1">
                    <span className="text-sm font-black text-lime-400">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="w-full lg:w-auto flex-1 lg:flex-none rounded-2xl border border-white/10 bg-slate-900/50 p-4 flex flex-col gap-2 lg:text-center lg:mt-1">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-xs font-semibold lg:justify-center mt-1",
                        item.tagColor,
                      )}
                    >
                      <TagIcon className="w-3.5 h-3.5" />
                      {item.tag}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: info strip + pro tip */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left: telescope image + notes */}
          <div className="rounded-2xl border border-white/10 bg-black/30 overflow-hidden flex items-center gap-5 p-5">
            <div className="relative w-24 sm:w-32 h-20 sm:h-24 rounded-xl overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1543722530-d2c3201371e7?auto=format&fit=crop&w=300&q=80"
                alt="Telescope"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:block w-px self-stretch bg-white/10" />
            <div className="flex flex-col gap-3">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Timings may vary slightly depending on the season and weather
                conditions.
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our guides will help you make the most of every moment.
              </p>
            </div>
          </div>

          {/* Right: Pro Tip */}
          <div className="relative rounded-2xl border border-lime-400/30 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80"
                alt="Aurora"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-slate-950/70" />
            </div>

            <div className="relative z-10 flex items-start gap-4 p-5">
              <div className="w-11 h-11 rounded-full bg-lime-400/15 border border-lime-400/30 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-lime-400" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="text-sm font-bold text-lime-400 uppercase tracking-wide">
                  Pro Tip
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Dress warmly, carry a mat or chair, and get ready to relax and
                  gaze!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
