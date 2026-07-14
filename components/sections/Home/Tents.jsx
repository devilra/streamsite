"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Tent,
  Heart,
  Crown,
  Star,
  Gem,
  Users,
  User,
  Droplet,
  Wind,
  Clock,
  Fan,
  Sun,
  Ruler,
  Info,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tents = [
  {
    id: "tent-2p",
    tier: "PREMIUM",
    tierIcon: Crown,
    tierBadge: "bg-amber-100 text-amber-900 border border-amber-300",
    accentSolid: "bg-blue-600 hover:bg-blue-700",
    accentSoft: "bg-blue-500/10 border border-blue-500/30 text-blue-400",
    photoCount: "1/6",
    title: "Classic Dome Tent (2P)",
    tags: ["Cozy", "Comfortable", "Adventure Ready"],
    description:
      "Perfect for couples and solo adventurers. Weatherproof, easy to setup and built for nature.",
    capacity: "2 Persons",
    bestFor: [
      { icon: Users, label: "Couples" },
      { icon: User, label: "Solo Travelers" },
    ],
    waterproof: "Yes",
    windproof: "Yes",
    material: "Polyester",
    weight: "2.6 kg",
    easySetup: "5–10 mins",
    ventilation: "2 Windows",
    seasons: "3 Season",
    floorSize: "7 x 5 ft",
    image: "/tent/2p.png",
  },
  {
    id: "tent-4p",
    tier: "MOST POPULAR",
    tierIcon: Star,
    tierBadge: "bg-lime-100 text-lime-900 border border-lime-300",
    accentSolid: "bg-emerald-600 hover:bg-emerald-700",
    accentSoft:
      "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400",
    photoCount: "1/5",
    title: "Classic Dome Tent (4P)",
    tags: ["Spacious", "Comfortable", "Family Friendly"],
    description:
      "Spacious and comfortable for small families and groups. Extra room to relax and enjoy.",
    capacity: "2 Persons",
    bestFor: [
      { icon: Users, label: "Friends" },
      { icon: Users, label: "Small Families" },
    ],
    waterproof: "Yes",
    windproof: "Yes",
    material: "Polyester",
    weight: "3.6 kg",
    easySetup: "5–12 mins",
    ventilation: "2 Windows",
    seasons: "3 Season",
    floorSize: "8 x 6 ft",
    image: "/tent/4p.png",
  },
  {
    id: "tent-6p",
    tier: "BEST VALUE",
    tierIcon: Gem,
    tierBadge: "bg-violet-100 text-violet-900 border border-violet-300",
    accentSolid: "bg-violet-600 hover:bg-violet-700",
    accentSoft: "bg-violet-500/10 border border-violet-500/30 text-violet-400",
    photoCount: "1/6",
    title: "Classic Dome Tent (6P)",
    tags: ["Large Space", "Comfortable", "Group Friendly"],
    description:
      "Designed for larger families and groups. More space, more comfort, more memories.",
    capacity: "6 Persons",
    bestFor: [
      { icon: Users, label: "Large Families" },
      { icon: Users, label: "Groups" },
    ],
    waterproof: "Yes",
    windproof: "Yes",
    material: "Polyester",
    weight: "4.8 kg",
    easySetup: "10–15 mins",
    ventilation: "3 Windows",
    seasons: "3 Season",
    floorSize: "10 x 8 ft",
    image: "/tent/6p.png",
  },
];

function TentCard({ tent }) {
  const TierIcon = tent.tierIcon;
  const [expanded, setExpanded] = useState(false);

  const quickSpecs = [
    { icon: Droplet, label: "Waterproof", value: tent.waterproof },
    { icon: Wind, label: "Windproof", value: tent.windproof },
    { icon: Ruler, label: "Material", value: tent.material },
    { icon: Sun, label: "Weight", value: tent.weight },
  ];

  const highlights = [
    { icon: Clock, label: "Easy Setup", value: tent.easySetup },
    { icon: Fan, label: "Ventilation", value: tent.ventilation },
    { icon: Sun, label: "Seasons", value: tent.seasons },
    { icon: Ruler, label: "Floor Size", value: tent.floorSize },
  ];

  const accentText = tent.accentSoft.match(/text-\S+/)?.[0];

  return (
    <div className="snap-start shrink-0 w-72 sm:w-80 h-[320px] md:h-[330px] lg:h-[270px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-[0_8px_24px_rgba(0,0,0,0.45)] flex flex-col transition-colors duration-300 hover:border-slate-700">
      {/* Image */}
      <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden">
        <img
          src={tent.image}
          alt={tent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        {/* 
        <span
          className={cn(
            "absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wide",
            tent.tierBadge,
          )}
        >
          <TierIcon className="w-3 h-3" />
          {tent.tier}
        </span> */}

        {/* <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 backdrop-blur-md border border-white/30 flex items-center justify-center">
          <Heart className="w-3 h-3 text-white" />
        </button> */}

        {/* <span className="absolute bottom-2 right-2 text-[9px] font-semibold text-white/80">
          {tent.photoCount}
        </span> */}
      </div>

      {/* Scrollable content — card height stays fixed, this area scrolls internally, scrollbar hidden */}
      <div
        className={cn(
          " min-h-0 transition-all duration-500  px-3.5 py-3 flex flex-col gap-2.5",
          true ? "flex-1 overflow-y-auto no-scrollbar" : "overflow-hidden",
        )}
      >
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wide">
          <Users className="w-3 h-3 text-slate-500" />
          {tent.capacity.toUpperCase()}
        </div>

        <h3 className="text-sm font-bold text-slate-50 leading-tight -mt-1">
          {tent.title}
        </h3>

        <div className="flex flex-wrap gap-1">
          {tent.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[8px] font-semibold text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-[10px] text-slate-400 leading-relaxed">
          {tent.description}
        </p>

        {/* Quick specs row */}
        <div className="flex items-center justify-between pt-1 pb-1 border-y border-slate-800">
          {quickSpecs.map((spec) => {
            const SpecIcon = spec.icon;
            return (
              <div
                key={spec.label}
                className="flex flex-col items-center gap-1 py-1"
              >
                <SpecIcon className={cn("w-3.5 h-3.5", accentText)} />
                <span className="text-[8px] font-bold text-slate-100 leading-none">
                  {spec.value}
                </span>
                <span className="text-[7px] text-slate-500 leading-none">
                  {spec.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Capacity + Best For */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wide">
              Capacity
            </span>
            <div
              className={cn(
                "flex items-center gap-1.5 px-2 py-1.5 rounded-lg",
                tent.accentSoft,
              )}
            >
              <Users className="w-3 h-3 shrink-0" />
              <span className="text-[9px] font-bold truncate">
                {tent.capacity}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wide">
              Best For
            </span>
            <div className="flex flex-col gap-1">
              {tent.bestFor.map((b) => {
                const BestIcon = b.icon;
                return (
                  <div
                    key={b.label}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-700 bg-slate-800/60"
                  >
                    <BestIcon className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="text-[8px] font-semibold text-slate-300 truncate">
                      {b.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tent highlights */}
        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wide">
            Tent Highlights
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {highlights.map((h) => {
              const HIcon = h.icon;
              return (
                <div
                  key={h.label}
                  className="flex items-center gap-1.5 px-1.5 py-1 rounded-md border border-slate-700 bg-slate-800/60"
                >
                  <HIcon className={cn("w-3 h-3 shrink-0", accentText)} />
                  <div className="flex flex-col leading-none gap-0.5 min-w-0">
                    <span className="text-[8px] font-bold text-slate-100 truncate">
                      {h.value}
                    </span>
                    <span className="text-[7px] text-slate-500 truncate">
                      {h.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed footer — always visible */}
      {/* <div className="shrink-0 px-3.5 pb-3.5 pt-1 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-[11px] font-bold hover:bg-slate-800 transition-colors duration-300">
          <Info className="w-3.5 h-3.5" />
          View Details
        </button>
        <button
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-white text-[11px] font-bold transition-colors duration-300",
            tent.accentSolid,
          )}
        >
          More Info
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div> */}
    </div>
  );
}

export default function Tents() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();

    const cardEl = el.children[0];
    if (!cardEl) return;

    const gap = 16;
    const cardWidth = cardEl.getBoundingClientRect().width + gap;
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(index, tents.length - 1)));
  }, [updateScrollButtons]);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [updateScrollButtons]);

  return (
    <section className="relative w-full bg-slate-950 text-white py-10 px-4 md:px-8 overflow-hidden">
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
              <Tent className="w-5 h-5 md:w-6 md:h-6 text-lime-400 shrink-0" />
            </div>
            <h2 className="text-xl md:text-2xl tracking-tight text-white uppercase flex items-center gap-3">
              Camping Tents
            </h2>
            <span className="hidden sm:block w-14 md:w-16 h-px bg-white/20 ml-1" />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Edge fade masks — only visible when there's actually more content to scroll to on that side */}
          <div
            className={cn(
              "hidden lg:block absolute left-0 top-0 bottom-2 w-10 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none transition-opacity duration-300",
              canScrollLeft ? "opacity-100" : "opacity-0",
            )}
          />
          <div
            className={cn(
              "hidden lg:block absolute right-0 top-0 bottom-2 w-10 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none transition-opacity duration-300",
              canScrollRight ? "opacity-100" : "opacity-0",
            )}
          />

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {tents.map((tent) => (
              <TentCard key={tent.id} tent={tent} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
