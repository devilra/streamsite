"use client";

import React, { useRef, useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UpcomingEvents() {
  const eventsRef = useRef(null);
  const [showLeftEventScroll, setShowLeftEventScroll] = useState(false);

  const events = [
    {
      id: "event-1",
      title: "Meteor Shower Night",
      category: "Stargazing Special",
      month: "MAY",
      day: "25",
      time: "25 May, 8:00 PM Onwards",
      image:
        "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event-2",
      title: "Sky Lantern Festival",
      category: "Lantern Festival",
      month: "JUN",
      day: "01",
      time: "01 Jun, 7:00 PM Onwards",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event-3",
      title: "Cricket Tournament Season 2",
      category: "Sports Special",
      month: "JUN",
      day: "08",
      time: "08 Jun, 7:30 AM Onwards",
      image:
        "https://images.unsplash.com/photo-1531415080290-bc98545ab3ef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event-4",
      title: "Sunrise Trek Yelagiri Hills",
      category: "Adventure Special",
      month: "JUN",
      day: "15",
      time: "15 Jun, 7:30 AM Onwards",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event-5",
      title: "Photography Walk",
      category: "Creative Walk",
      month: "JUN",
      day: "22",
      time: "22 Jun, 6:00 AM Onwards",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event-6",
      title: "Photography Walk",
      category: "Creative Walk",
      month: "JUN",
      day: "22",
      time: "22 Jun, 6:00 AM Onwards",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event-7",
      title: "Photography Walk",
      category: "Creative Walk",
      month: "JUN",
      day: "22",
      time: "22 Jun, 6:00 AM Onwards",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "event-8",
      title: "Photography Walk",
      category: "Creative Walk",
      month: "JUN",
      day: "22",
      time: "22 Jun, 6:00 AM Onwards",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleScrollDetect = (ref, setScrollState) => {
    if (ref.current) {
      setScrollState(ref.current.scrollLeft > 20);
    }
  };

  useEffect(() => {
    const ev = eventsRef.current;
    const handleEvScroll = () =>
      handleScrollDetect(eventsRef, setShowLeftEventScroll);

    if (ev) ev.addEventListener("scroll", handleEvScroll);
    return () => {
      if (ev) ev.removeEventListener("scroll", handleEvScroll);
    };
  }, []);

  return (
    <section className="bg-slate-950 text-white py-5  px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl  tracking-tight text-white uppercase flex items-center gap-3">
              Upcoming Events
              <span className="hidden sm:inline-block h-0.5 w-12 bg-lime-400/20 rounded-full" />
            </h2>
          </div>
          {/* <a
            href="#events"
            className="text-xs font-bold text-lime-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group/btn select-none"
          >
            View All Events
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </a> */}
        </div>

        {/* Event Cards Carousel wrapper */}
        <div className="relative w-full">
          {/* Fade Overlays */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-slate-950 to-transparent pointer-events-none z-10 transition-opacity duration-300",
              showLeftEventScroll ? "opacity-100" : "opacity-0",
            )}
          />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-slate-950 to-transparent pointer-events-none z-10" />

          {/* Horizontal Scroll list */}
          <div
            ref={eventsRef}
            className="flex gap-2 md:gap-2 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pr-4"
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="w-42.5 sm:w-50 h-57.5 sm:h-65 rounded-[12px] overflow-hidden relative flex flex-col justify-between p-4 border border-white/5 bg-slate-900/40 backdrop-blur-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)] shrink-0 group cursor-pointer select-none snap-start"
              >
                {/* Event BG Image with Zoom scale */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.7] group-hover:brightness-[0.8]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>

                {/* Top section: Date Badge */}
                <div className="relative z-10 flex justify-start">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2 w-11 h-12 flex flex-col items-center justify-center">
                    <span className="text-[8px] text-lime-400 font-black tracking-widest uppercase leading-none">
                      {event.month}
                    </span>
                    <span className="text-base text-white/80 font-black leading-none mt-1">
                      {event.day}
                    </span>
                  </div>
                </div>

                {/* Bottom section: Metadata & Title */}
                <div className="relative z-10 flex flex-col items-start text-left">
                  <span className="text-[9px] text-lime-400 font-bold tracking-wider uppercase mb-1">
                    {event.category}
                  </span>
                  <h3 className="text-sm sm:text-base  text-white font-semibold leading-tight group-hover:text-lime-400 transition-colors duration-300">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-300 font-medium">
                    <Clock className="w-3 h-3 text-lime-400" />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
