"use client";

import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import {
  Users,
  Telescope,
  Footprints,
  Camera,
  Compass,
  Trophy,
  ArrowRight,
  Sparkles,
  Heart,
  MessageCircle,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommunitiesPage() {
  const clubs = [
    {
      id: "club-1",
      title: "Running Club",
      motto: "Run • Connect • Inspire",
      members: "128 Members",
      description:
        "Weekly sunrise runs through the hill trails, open to every pace from first-timers to marathoners.",
      icon: Footprints,
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "club-2",
      title: "Stargazing Club",
      motto: "Explore the Universe",
      members: "96 Members",
      description:
        "Telescope nights under Yelagiri's dark skies, with guided constellation walks every full-moon week.",
      icon: Telescope,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "club-3",
      title: "Cricket Community",
      motto: "Play • Compete • Win",
      members: "142 Members",
      description:
        "Weekend matches and seasonal tournaments for players of every skill level across the hills.",
      icon: Trophy,
      image:
        "https://images.unsplash.com/photo-1624526261967-ac4638f3e275?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "club-4",
      title: "Photography Club",
      motto: "Capture • Share • Inspire",
      members: "87 Members",
      description:
        "Golden-hour walks and long-exposure night shoots, with monthly critique sessions for all levels.",
      icon: Camera,
      image:
        "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "club-5",
      title: "Trekking Tribe",
      motto: "Trails • Views • Adventure",
      members: "110 Members",
      description:
        "Guided treks across Yelagiri's viewpoints and valleys, from easy day hikes to full-day summit trails.",
      icon: Compass,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const totalMembers = clubs.reduce(
    (sum, club) => sum + parseInt(club.members),
    0,
  );

  const whyJoin = [
    {
      title: "Find your people",
      description:
        "Meet others who share your interest, from casual hobbyists to seasoned regulars.",
      icon: Users,
    },
    {
      title: "Guided by locals",
      description:
        "Every club is run by people who know the hills, the trails, and the best time to show up.",
      icon: Sparkles,
    },
    {
      title: "No pressure to perform",
      description:
        "Come for one session or every week. Clubs flex around you, not the other way round.",
      icon: Heart,
    },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      {/* HERO / PAGE BANNER */}
      <section className="relative w-full overflow-hidden pt-28 pb-20 px-4 md:px-8">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=1600&q=80"
            alt="Stream Side communities"
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-bold backdrop-blur-md">
            <Users className="w-3.5 h-3.5" />
            <span>Stream Side Communities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] max-w-3xl">
            Communities built around{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-300">
              what you love.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
            Whether it's a sunrise run, a night under the stars, or a weekend
            trek, there's a group at Stream Side already doing it. Pick one,
            show up, and belong.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="px-4 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
              <div className="text-2xl font-black text-lime-400">
                {clubs.length}
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                Active Clubs
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
              <div className="text-2xl font-black text-lime-400">
                {totalMembers}+
              </div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                Members
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md">
              <div className="text-2xl font-black text-lime-400">Weekly</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                Meetups
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL CLUB GRID */}
      <section className="py-16 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase flex items-center gap-3">
              All Communities & Clubs
              <span className="hidden sm:inline-block h-0.5 w-12 bg-lime-400/20 rounded-full" />
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => {
              const IconComponent = club.icon;
              return (
                <div
                  key={club.id}
                  className="relative rounded-[24px] overflow-hidden border border-white/5 bg-slate-900/40 backdrop-blur-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)] group cursor-pointer select-none flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={club.image}
                      alt={club.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.65] group-hover:brightness-[0.75]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2.5 w-11 h-12 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-lime-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <span className="text-[10px] text-lime-400 font-bold tracking-wider uppercase">
                      {club.motto}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                      {club.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed flex-1">
                      {club.description}
                    </p>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
                        <Users className="w-3.5 h-3.5 text-lime-400/70" />
                        <span>{club.members}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-bold text-lime-400 group-hover:gap-2 transition-all duration-300">
                        Join
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY JOIN A COMMUNITY */}
      <section className="py-16 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight uppercase flex items-center gap-3">
              Why Join a Community
              <span className="hidden sm:inline-block h-0.5 w-12 bg-lime-400/20 rounded-full" />
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {whyJoin.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md flex flex-col gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA: START YOUR OWN COMMUNITY */}
      <section className="py-16 px-4 md:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[28px] overflow-hidden border border-lime-400/20 bg-linear-to-br from-lime-400/10 via-slate-900 to-slate-950 p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-lg">
              <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                Don't see your interest?
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Start your own community at Stream Side.
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Got an idea for a club — yoga, birdwatching, chess? Tell us and
                we'll help you get it off the ground.
              </p>
            </div>

            <a
              href="mailto:hello@streamside.in"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lime-400 text-slate-950 text-sm font-bold hover:bg-lime-300 transition-colors duration-300 shrink-0"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
