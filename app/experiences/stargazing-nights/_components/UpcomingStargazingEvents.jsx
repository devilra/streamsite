"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Star,
  Flame,
  Eye,
  Moon,
  Zap,
  Orbit,
  Globe2,
  MapPin,
  Telescope,
  UserCheck,
  Coffee,
  Bell,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function UpcomingStargazingEvents() {
  const eventsRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);

  const events = [
    {
      id: "full-moon",
      badge: "FEATURED",
      badgeIcon: Star,
      badgeColor: "bg-lime-400/90 text-slate-950",
      accent: "text-lime-400",
      accentBg: "bg-lime-400/10 border-lime-400/30",
      buttonBg: "bg-lime-400 hover:bg-lime-300 text-slate-950",
      icon: Moon,
      title: "Full Moon Night",
      date: "12 Aug 2026 (Tue)",
      time: "7:00 PM \u2013 12:00 AM",
      description:
        "Experience the magic of a bright full moon with stunning lunar views.",
      seats: "20 Seats Left",
      image:
        "https://images.unsplash.com/photo-1518082593638-63cbdd7ca77e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "perseid",
      badge: "POPULAR",
      badgeIcon: Flame,
      badgeColor: "bg-violet-500 text-white",
      accent: "text-violet-400",
      accentBg: "bg-violet-500/10 border-violet-500/30",
      buttonBg: "bg-violet-600 hover:bg-violet-500 text-white",
      icon: Zap,
      title: "Perseid Meteor Shower",
      date: "13 \u2013 14 Aug 2026",
      time: "9:30 PM \u2013 1:30 AM",
      description: "Watch the spectacular Perseid meteor shower at its peak.",
      seats: "5 Seats Left",
      image:
        "https://images.unsplash.com/photo-1445369996206-9eb964335931?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "milky-way",
      badge: "BEST VIEW",
      badgeIcon: Eye,
      badgeColor: "bg-teal-500 text-white",
      accent: "text-teal-400",
      accentBg: "bg-teal-500/10 border-teal-500/30",
      buttonBg: "bg-teal-600 hover:bg-teal-500 text-white",
      icon: Orbit,
      title: "Milky Way Night",
      date: "18 Aug 2026 (Mon)",
      time: "8:00 PM \u2013 1:00 AM",
      description:
        "Perfect night to witness the breathtaking Milky Way in all its glory.",
      seats: "12 Seats Left",
      image:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "saturn",
      badge: "NEW",
      badgeIcon: Sparkles,
      badgeColor: "bg-orange-500 text-white",
      accent: "text-orange-400",
      accentBg: "bg-orange-500/10 border-orange-500/30",
      buttonBg: "bg-orange-600 hover:bg-orange-500 text-white",
      icon: Globe2,
      title: "Saturn Observation",
      date: "25 Aug 2026 (Mon)",
      time: "7:30 PM \u2013 11:30 PM",
      description:
        "Get a close look at Saturn and its rings through our premium telescopes.",
      seats: "15 Seats Left",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const bottomFeatures = [
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "High altitude spots with zero light pollution",
    },
    {
      icon: Telescope,
      title: "Premium Telescopes",
      description: "High performance telescopes for clear views",
    },
    {
      icon: UserCheck,
      title: "Expert Guides",
      description: "Learn from passionate astronomy experts",
    },
    {
      icon: Coffee,
      title: "Warm & Cozy",
      description: "Campfire, hot drinks & comfortable seating",
    },
  ];

  const handleScrollDetect = () => {
    if (eventsRef.current) {
      setShowLeftScroll(eventsRef.current.scrollLeft > 20);
    }
  };

  useEffect(() => {
    const el = eventsRef.current;
    if (el) el.addEventListener("scroll", handleScrollDetect);
    return () => {
      if (el) el.removeEventListener("scroll", handleScrollDetect);
    };
  }, []);

  return (
    <section className="bg-slate-950 text-white py-5 px-4 sm:px-6 md:px-8">
      <div className=" flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div className="flex-1 flex flex-col items-center text-center gap-2 sm:mx-auto">
            <div className="flex items-center gap-3">
              <span className="w-8 sm:w-10 h-px bg-lime-400/50" />
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold tracking-[0.3em] text-lime-400 uppercase">
                <Sparkles className="w-3 h-3" />
                Upcoming
                <Sparkles className="w-3 h-3" />
              </span>
              <span className="w-8 sm:w-10 h-px bg-lime-400/50" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.05]">
              <span className="text-white">Stargazing </span>
              <span className="text-lime-400">Events</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl">
              Join our upcoming nights under the stars. Limited seats,
              unforgettable experiences.
            </p>

            {/* Decorative divider */}
            <div className="flex items-center gap-2 w-40 sm:w-56 mt-1">
              <span className="flex-1 h-px bg-linear-to-r from-transparent to-lime-400/50" />
              <Sparkles className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span className="flex-1 h-px bg-linear-to-l from-transparent to-lime-400/50" />
            </div>
          </div>
          {/* 
          <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-black/30 text-sm font-semibold text-white hover:bg-white/5 transition-colors duration-300 shrink-0 self-start">
            <Calendar className="w-4 h-4 text-lime-400" />
            View Calendar
          </button> */}
        </div>

        {/* Cards carousel */}
        <div className="relative w-full">
          {/* Fade overlays */}
          <div
            className={cn(
              "hidden lg:block absolute left-0 top-0 bottom-2 w-10 bg-linear-to-r from-slate-950 to-transparent pointer-events-none z-10 transition-opacity duration-300",
              showLeftScroll ? "opacity-100" : "opacity-0",
            )}
          />
          <div className="hidden lg:block absolute right-0 top-0 bottom-2 w-10 bg-linear-to-l from-slate-950 to-transparent pointer-events-none z-10" />

          <div
            ref={eventsRef}
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2"
          >
            {events.map((event) => {
              const BadgeIcon = event.badgeIcon;
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className="snap-start shrink-0 w-72 sm:w-76 lg:w-[280px] rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-44 sm:h-48 shrink-0 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />

                    <span
                      className={cn(
                        "absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        event.badgeColor,
                      )}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      {event.badge}
                    </span>

                    {/* Overlapping circular icon */}
                    <div
                      className={cn(
                        "absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border flex items-center justify-center bg-slate-900",
                        event.accentBg,
                      )}
                    >
                      <Icon className={cn("w-5 h-5", event.accent)} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col gap-2.5 px-4 pt-8 pb-4 text-center">
                    <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                      {event.title}
                    </h3>

                    <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-lime-400" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-lime-400" />
                        {event.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="border-t border-white/10 mt-1 pt-3 flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "flex items-center gap-1.5 text-[11px] font-semibold",
                          event.accent,
                        )}
                      >
                        <Users className="w-3.5 h-3.5" />
                        {event.seats}
                      </span>

                      <button
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors duration-300",
                          event.buttonBg,
                        )}
                      >
                        Book Now
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom band: features + newsletter */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl p-5 sm:p-7 flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Feature list */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
            {bottomFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col items-center text-center gap-2"
                >
                  <Icon className="w-6 h-6 text-lime-400" />
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

          {/* Newsletter box */}
          <div className="flex items-center gap-4 rounded-2xl border border-dashed border-lime-400/40 bg-lime-400/5 p-4 sm:p-5 lg:w-[380px] shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-lime-400/15 border border-lime-400/30 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5 text-lime-400" />
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-lime-400 uppercase tracking-wide leading-tight">
                Don&apos;t Miss the Next Big Night!
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-snug">
                Subscribe and get notified about special astronomy events and
                offers.
              </p>

              <div className="flex items-center gap-2 mt-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none focus:border-lime-400/50"
                />
                <button className="shrink-0 w-9 h-9 rounded-lg bg-lime-400 hover:bg-lime-300 flex items-center justify-center transition-colors duration-300">
                  <Send className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
