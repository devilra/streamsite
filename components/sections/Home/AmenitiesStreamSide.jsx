"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Tent,
  Soup,
  Flame,
  Telescope,
  Waves,
  ShowerHead,
  BatteryCharging,
  Car,
  Music,
  Gamepad2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const POPOVER_WIDTH = 260;
const POPOVER_HEIGHT = 128;
const POPOVER_GAP = 16;

export default function AmenitiesStreamSide() {
  const amenitiesRef = useRef(null);
  const wrapperRef = useRef(null);
  const itemRefs = useRef({});
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [popoverPos, setPopoverPos] = useState(null);

  // Static array of amenities, each with preview images + a short description
  const amenities = [
    {
      label: "Luxury Tents",
      icon: Tent,
      description:
        "Spacious insulated tents with plush bedding, private decks and hill views.",
      images: [
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Indian Food",
      icon: Soup,
      description:
        "Freshly cooked regional meals served hot, from breakfast to bonfire dinners.",
      images: [
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Campfire",
      icon: Flame,
      description:
        "Evening bonfires with music and stories, right by the stream every night.",
      images: [
        "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Telescope View Point",
      icon: Telescope,
      description:
        "A dedicated dark-sky spot with guided telescope sessions for stargazers.",
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Stream Side",
      icon: Waves,
      description:
        "Wake up to a flowing stream right outside your tent, cool and calming.",
      images: [
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1445264718234-05a51e6bc0d0?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Clean Washrooms",
      icon: ShowerHead,
      description:
        "Well-maintained attached washrooms with hot water, available round the clock.",
      images: [
        "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Power Backup",
      icon: BatteryCharging,
      description:
        "Uninterrupted power backup so your stay is never affected by outages.",
      images: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Parking Space",
      icon: Car,
      description:
        "Ample secure parking right at the property for cars and two-wheelers.",
      images: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Bonfire & Music",
      icon: Music,
      description:
        "Live acoustic sessions and playlists around the fire, most weekend evenings.",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80",
      ],
    },
    {
      label: "Games & Activities",
      icon: Gamepad2,
      description:
        "Outdoor and indoor games for all ages, from carrom to lawn activities.",
      images: [
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1585504198199-20277593b94f?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1591491634026-e0f8d70e0d7c?auto=format&fit=crop&w=400&q=80",
      ],
    },
  ];

  const handleScrollDetect = (ref, setScrollState) => {
    if (ref.current) {
      setScrollState(ref.current.scrollLeft > 20);
    }
  };

  useEffect(() => {
    const el = amenitiesRef.current;
    const handleScroll = () => {
      handleScrollDetect(amenitiesRef, setShowLeftScroll);
      // Close any open popover on scroll so its position never goes stale
      setHoveredLabel(null);
      setPopoverPos(null);
    };

    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Compute the popover's position relative to the wrapper, based on the
  // hovered icon's real position on screen — avoids any overflow clipping,
  // and clamps horizontally so it never gets cut off at the screen edge.
  const VIEWPORT_MARGIN = 12;

  const updatePopoverPosition = (label) => {
    const wrapperEl = wrapperRef.current;
    const itemEl = itemRefs.current[label];
    if (!wrapperEl || !itemEl) return;

    const wrapperRect = wrapperEl.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();

    // Desired left edge in viewport coordinates (centered on the icon)
    let viewportLeft = itemRect.left + itemRect.width / 2 - POPOVER_WIDTH / 2;

    // Clamp so the popover always stays fully within the visible screen
    const maxViewportLeft = window.innerWidth - POPOVER_WIDTH - VIEWPORT_MARGIN;
    viewportLeft = Math.min(
      Math.max(viewportLeft, VIEWPORT_MARGIN),
      Math.max(maxViewportLeft, VIEWPORT_MARGIN),
    );

    const itemCenterX = itemRect.left + itemRect.width / 2;
    const arrowLeft = Math.min(
      Math.max(itemCenterX - viewportLeft, 16),
      POPOVER_WIDTH - 16,
    );

    setPopoverPos({
      left: viewportLeft - wrapperRect.left,
      top: itemRect.top - wrapperRect.top - POPOVER_GAP - POPOVER_HEIGHT,
      arrowLeft,
    });
  };

  // Auto-advance the preview image carousel while a card is hovered
  useEffect(() => {
    if (!hoveredLabel) return;
    const hoveredAmenity = amenities.find((a) => a.label === hoveredLabel);
    if (!hoveredAmenity) return;

    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % hoveredAmenity.images.length);
    }, 1400);

    return () => clearInterval(interval);
  }, [hoveredLabel]);

  const handleMouseEnter = (label) => {
    setImageIndex(0);
    setHoveredLabel(label);
    updatePopoverPosition(label);
  };

  const handleMouseLeave = () => {
    setHoveredLabel(null);
    setPopoverPos(null);
  };

  // Tap-to-toggle for touch devices (mobile has no real hover state)
  const handleItemClick = (label) => {
    if (hoveredLabel === label) {
      setHoveredLabel(null);
      setPopoverPos(null);
    } else {
      setImageIndex(0);
      setHoveredLabel(label);
      updatePopoverPosition(label);
    }
  };

  // Close the popover when tapping/clicking anywhere outside the carousel
  useEffect(() => {
    if (!hoveredLabel) return;
    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setHoveredLabel(null);
        setPopoverPos(null);
      }
    };
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [hoveredLabel]);

  return (
    <section className="bg-slate-950 text-white pt-14 pb-5 px-4 md:px-8">
      {/* Keyframes for the hover marquee effect on labels */}
      <style>{`
        @keyframes amenityLabelMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header Row */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl md:text-2xl tracking-tight text-white uppercase flex items-center gap-3">
            Amenities at Stream Side
            <span className="hidden sm:inline-block h-[2px] w-12 bg-lime-400/20 rounded-full" />
          </h2>
        </div>

        {/* Amenities Carousel wrapper */}
        <div ref={wrapperRef} className="relative w-full">
          {/* Fade Overlays */}
          <div
            className={cn(
              "absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10 transition-opacity duration-300",
              showLeftScroll ? "opacity-100" : "opacity-0",
            )}
          />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />

          {/* Horizontal Scroll list */}
          <div
            ref={amenitiesRef}
            className="w-full overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth py-2"
          >
            <div className="flex items-start gap-4 min-w-max pr-6 ">
              {amenities.map((amenity) => {
                const IconComponent = amenity.icon;
                const isHovered = hoveredLabel === amenity.label;

                return (
                  <div
                    key={amenity.label}
                    ref={(el) => (itemRefs.current[amenity.label] = el)}
                    onMouseEnter={() => handleMouseEnter(amenity.label)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleItemClick(amenity.label)}
                    className="relative flex flex-col items-center group cursor-pointer select-none shrink-0"
                  >
                    {/* Rounded Square Icon Container — matches "What excites you today?" card style */}
                    <div
                      className={cn(
                        "w-20 h-20 rounded-2xl border flex items-center justify-center transition-all duration-300 backdrop-blur-md bg-black/35",
                        isHovered
                          ? "border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)] bg-lime-400/5"
                          : "border-white/10",
                      )}
                    >
                      <IconComponent
                        className={cn(
                          "w-7 h-7 transition-colors duration-300",
                          isHovered ? "text-lime-400" : "text-slate-300",
                        )}
                      />
                    </div>

                    {/* Label — fixed width; marquees ONLY on hover/tap of THIS card */}
                    <div className="w-24 overflow-hidden mt-2.5">
                      <div
                        className={cn(
                          "flex whitespace-nowrap gap-8 w-max",
                          "[animation:amenityLabelMarquee_3.5s_linear_infinite]",
                          isHovered
                            ? "[animation-play-state:running]"
                            : "[animation-play-state:paused]",
                        )}
                      >
                        <span
                          className={cn(
                            "text-[10px] sm:text-[11px] font-semibold transition-colors duration-300",
                            isHovered ? "text-lime-400" : "text-slate-300",
                          )}
                        >
                          {amenity.label}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] sm:text-[11px] font-semibold transition-colors duration-300",
                            isHovered ? "text-lime-400" : "text-slate-300",
                          )}
                          aria-hidden="true"
                        >
                          {amenity.label}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Single floating preview popover, positioned via computed pixel
              coordinates so it is never clipped by the scroll container */}
          <AnimatePresence>
            {hoveredLabel &&
              popoverPos &&
              (() => {
                const amenity = amenities.find((a) => a.label === hoveredLabel);
                if (!amenity) return null;
                return (
                  <motion.div
                    key={hoveredLabel}
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    style={{
                      left: popoverPos.left,
                      top: popoverPos.top,
                      width: POPOVER_WIDTH,
                      height: POPOVER_HEIGHT,
                    }}
                    className="absolute rounded-2xl overflow-hidden border border-lime-400/30 bg-slate-900 shadow-[0_12px_32px_rgba(0,0,0,0.6)] z-40 flex pointer-events-none"
                  >
                    {/* Left: Image carousel */}
                    <div className="relative w-1/2 h-full shrink-0 overflow-hidden">
                      {amenity.images.map((src, idx) => (
                        <img
                          key={src}
                          src={src}
                          alt={amenity.label}
                          className={cn(
                            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out",
                            idx === imageIndex ? "opacity-100" : "opacity-0",
                          )}
                        />
                      ))}

                      {/* Image position dots */}
                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {amenity.images.map((_, idx) => (
                          <span
                            key={idx}
                            className={cn(
                              "w-1 h-1 rounded-full transition-colors duration-300",
                              idx === imageIndex
                                ? "bg-lime-400"
                                : "bg-white/40",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right: Title + description */}
                    <div className="w-1/2 h-full p-3 flex flex-col justify-center gap-1 overflow-hidden">
                      <h4 className="text-[11px] sm:text-xs font-bold text-lime-400 leading-tight">
                        {amenity.label}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] text-slate-300 leading-snug line-clamp-4">
                        {amenity.description}
                      </p>
                    </div>

                    {/* Little pointer/arrow at the bottom of the popover — aligned to the icon */}
                    <div
                      style={{ left: popoverPos.arrowLeft }}
                      className="absolute -bottom-1.5 -translate-x-1/2 w-3 h-3 rotate-45 bg-slate-900 border-r border-b border-lime-400/30"
                    />
                  </motion.div>
                );
              })()}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
