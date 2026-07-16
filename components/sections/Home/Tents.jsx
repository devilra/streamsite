"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
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
    easySetup: "5\u201310 mins",
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
    capacity: "4 Persons",
    bestFor: [
      { icon: Users, label: "Friends" },
      { icon: Users, label: "Small Families" },
    ],
    waterproof: "Yes",
    windproof: "Yes",
    material: "Polyester",
    weight: "3.6 kg",
    easySetup: "5\u201312 mins",
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
    easySetup: "10\u201315 mins",
    ventilation: "3 Windows",
    seasons: "3 Season",
    floorSize: "10 x 8 ft",
    image: "/tent/4p.png",
  },
];

// Compact preview card — shown in the horizontal carousel.
// Just the image + capacity + title. No scroll, no extra details.
// Clicking it opens the full detail modal.
function TentCard({ tent, onSelect }) {
  return (
    <button
      onClick={() => onSelect(tent)}
      className="group
snap-start
shrink-0
w-80
rounded-2xl
overflow-hidden
border
border-slate-800
bg-slate-900
shadow-[0_8px_24px_rgba(0,0,0,0.45)]
flex
flex-col
text-left
transition-all
duration-300
hover:border-lime-400
hover:bg-lime-400/5
hover:shadow-[0_0_18px_rgba(163,230,53,0.25)]
"
    >
      {/* Image */}
      <div className="relative h-40 sm:h-44 shrink-0 overflow-hidden">
        <img
          src={tent.image}
          alt={tent.title}
          className=" w-full
    h-full
    object-cover
    transition-transform
    duration-500
    group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
        {/* <span className="absolute bottom-2 right-2 text-[9px] font-semibold text-white/80">
          {tent.photoCount}
        </span> */}
      </div>

      {/* Just capacity + title */}
      <div className="px-3.5 py-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wide">
          <Users className="w-3 h-3 text-lime-400" />
          {tent.capacity.toUpperCase()}
        </div>
        <h3 className="text-sm font-bold text-slate-50 leading-tight">
          {tent.title}
        </h3>
      </div>
    </button>
  );
}

// Full detail modal — opens with framer-motion when a tent card is clicked.
function TentModal({ tent, onClose }) {
  return (
    <AnimatePresence>
      {tent && <TentModalContent tent={tent} onClose={onClose} />}
    </AnimatePresence>
  );
}

// Split into its own component so tent.* is only ever accessed once tent is
// guaranteed non-null (AnimatePresence still gets to run the exit animation
// on TentModalContent before it unmounts).
function TentModalContent({ tent, onClose }) {
  const TierIcon = tent.tierIcon;
  const accentText = tent.accentSoft.match(/text-\S+/)?.[0];

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:w-[440px] lg:w-[520px] max-h-[92vh] overflow-y-auto no-scrollbar rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl"
      >
        {/* Image */}
        <div className="relative h-52 sm:h-60 shrink-0 overflow-hidden">
          <img
            src={tent.image}
            alt={tent.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

          <span
            className={cn(
              "absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wide",
              tent.tierBadge,
            )}
          >
            <TierIcon className="w-3.5 h-3.5" />
            {tent.tier}
          </span>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <span className="absolute bottom-3 right-3 text-[10px] font-semibold text-white/80">
            {tent.photoCount}
          </span>
        </div>

        {/* Content */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            {tent.capacity.toUpperCase()}
          </div>

          <h3 className="text-xl font-bold text-slate-50 leading-tight -mt-1">
            {tent.title}
          </h3>

          <div className="flex flex-wrap gap-1.5">
            {tent.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            {tent.description}
          </p>

          {/* Quick specs row */}
          <div className="flex items-center justify-between pt-2 pb-2 border-y border-slate-800">
            {quickSpecs.map((spec) => {
              const SpecIcon = spec.icon;
              return (
                <div
                  key={spec.label}
                  className="flex flex-col items-center gap-1 py-1"
                >
                  <SpecIcon className={cn("w-4 h-4", accentText)} />
                  <span className="text-[11px] font-bold text-slate-100 leading-none">
                    {spec.value}
                  </span>
                  <span className="text-[9px] text-slate-500 leading-none">
                    {spec.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Capacity + Best For */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                Capacity
              </span>
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg",
                  tent.accentSoft,
                )}
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span className="text-xs font-bold truncate">
                  {tent.capacity}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
                Best For
              </span>
              <div className="flex flex-col gap-1.5">
                {tent.bestFor.map((b) => {
                  const BestIcon = b.icon;
                  return (
                    <div
                      key={b.label}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60"
                    >
                      <BestIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[10px] font-semibold text-slate-300 truncate">
                        {b.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tent highlights */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">
              Tent Highlights
            </span>
            <div className="grid grid-cols-2 gap-2">
              {highlights.map((h) => {
                const HIcon = h.icon;
                return (
                  <div
                    key={h.label}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-md border border-slate-700 bg-slate-800/60"
                  >
                    <HIcon className={cn("w-3.5 h-3.5 shrink-0", accentText)} />
                    <div className="flex flex-col leading-none gap-0.5 min-w-0">
                      <span className="text-[10px] font-bold text-slate-100 truncate">
                        {h.value}
                      </span>
                      <span className="text-[9px] text-slate-500 truncate">
                        {h.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          {/* <div className="flex gap-2 pt-1">
            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-100 text-xs font-bold hover:bg-slate-800 transition-colors duration-300">
              <Info className="w-4 h-4" />
              View Details
            </button>
            <button
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-xs font-bold transition-colors duration-300",
                tent.accentSolid,
              )}
            >
              More Info
              <ArrowRight className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Tents() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedTent, setSelectedTent] = useState(null);

  useEffect(() => {
    if (selectedTent) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [selectedTent]);

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
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-2  px-4 md:mx-0 md:px-0"
          >
            {tents.map((tent) => (
              <TentCard key={tent.id} tent={tent} onSelect={setSelectedTent} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail modal */}
      <TentModal tent={selectedTent} onClose={() => setSelectedTent(null)} />
    </section>
  );
}
