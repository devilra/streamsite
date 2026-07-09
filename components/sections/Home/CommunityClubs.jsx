"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Users,
  Telescope,
  Footprints,
  Camera,
  Compass,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommunityClubs() {
  const clubsRef = useRef(null);
  const [showLeftClubScroll, setShowLeftClubScroll] = useState(false);

  const clubs = [
    {
      id: "club-1",
      title: "Running Club",
      motto: "Run • Connect • Inspire",
      members: "128 Members",
      icon: Footprints,
      image:
        "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "club-2",
      title: "Stargazing Club",
      motto: "Explore the Universe",
      members: "96 Members",
      icon: Telescope,
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "club-3",
      title: "Cricket Community",
      motto: "Play • Compete • Win",
      members: "142 Members",
      icon: Trophy,
      image:
        "https://images.unsplash.com/photo-1624526261967-ac4638f3e275?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "club-4",
      title: "Photography Club",
      motto: "Capture • Share • Inspire",
      members: "87 Members",
      icon: Camera,
      image:
        "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "club-5",
      title: "Trekking Tribe",
      motto: "Trails • Views • Adventure",
      members: "110 Members",
      icon: Compass,
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const handleScrollDetect = (ref, setScrollState) => {
    if (ref.current) {
      setScrollState(ref.current.scrollLeft > 20);
    }
  };

  useEffect(() => {
    const cl = clubsRef.current;
    const handleClScroll = () =>
      handleScrollDetect(clubsRef, setShowLeftClubScroll);

    if (cl) cl.addEventListener("scroll", handleClScroll);
    return () => {
      if (cl) cl.removeEventListener("scroll", handleClScroll);
    };
  }, []);

  return (
    <section className="bg-slate-950 text-white py-5 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl md:text-2xl  tracking-tight text-white uppercase flex items-center gap-3">
              Our Communities & Clubs
              <span className="hidden sm:inline-block h-0.5 w-12 bg-lime-400/20 rounded-full" />
            </h2>
          </div>
          {/* <a
            href="#communities"
            className="text-xs font-bold text-lime-400 hover:text-white transition-colors duration-300 flex items-center gap-1 group/btn select-none"
          >
            Explore All Communities
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </a> */}
        </div>

        {/* Club Cards Carousel wrapper */}
        <div className="relative w-full">
          {/* Fade Overlays */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-slate-950 to-transparent pointer-events-none z-10 transition-opacity duration-300",
              showLeftClubScroll ? "opacity-100" : "opacity-0",
            )}
          />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-slate-950 to-transparent pointer-events-none z-10" />

          {/* Horizontal Scroll list */}
          <div
            ref={clubsRef}
            className="flex gap-2 md:gap-2 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth snap-x snap-mandatory pb-2 pr-4"
          >
            {clubs.map((club) => {
              const IconComponent = club.icon;
              return (
                <div
                  key={club.id}
                  className="w-42.5 sm:w-50 h-57.5 sm:h-65 rounded-[12px] overflow-hidden relative flex flex-col justify-between p-4 border border-white/5 bg-slate-900/40 backdrop-blur-xs shadow-[0_8px_32px_rgba(0,0,0,0.5)] shrink-0 group cursor-pointer select-none snap-start"
                >
                  {/* Club BG Image with Zoom scale */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={club.image}
                      alt={club.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.6] group-hover:brightness-[0.7]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>

                  {/* Top section: Icon Badge */}
                  <div className="relative z-10 flex justify-start">
                    <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-2 w-11 h-12 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-lime-400" />
                    </div>
                  </div>

                  {/* Bottom section: Metadata & Title */}
                  <div className="relative z-10 flex flex-col items-start text-left">
                    <span className="text-[9px] text-lime-400 font-bold tracking-wider uppercase mb-1">
                      {club.motto}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight group-hover:text-lime-400 transition-colors duration-300">
                      {club.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-3 text-[10px] text-slate-300 font-medium">
                      <Users className="w-3 h-3 text-lime-400" />
                      <span>{club.members}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
