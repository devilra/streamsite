"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Replace these avatar/photo paths with your real assets
// (same convention as /HomeThumnail/i.png used in Hero)
const testimonials = [
  {
    name: "Aravindh S",
    location: "Chennai",
    rating: 5,
    review:
      "The stargazing session was mind-blowing! Best campsite experience in Yelagiri.",
    avatar: "/testimonials/a.webp",
    images: [
      "/testimonials/a2.webp",
      "/testimonials/a3.webp",
      "/testimonials/a4.webp",
    ],
  },
  {
    name: "Priya R",
    location: "Bangalore",
    rating: 5,
    review:
      "Perfect weekend getaway with friends. Food, vibe and ambience super!",
    avatar: "/testimonials/a5.webp",
    images: [
      "/testimonials/a6.webp",
      "/testimonials/a7.webp",
      "/testimonials/a8.webp",
    ],
  },
  {
    name: "Karthik Kumar",
    location: "Coimbatore",
    rating: 5,
    review:
      "Cricket tournament was so well organized. Can't wait for the next one!",
    avatar: "/testimonials/a9.webp",
    images: [
      "/testimonials/a10.webp",
      "/testimonials/a11.webp",
      "/testimonials/a12.webp",
    ],
  },
  {
    name: "Nandhini M",
    location: "Salem",
    rating: 5,
    review:
      "Peaceful place, beautiful views and friendly hosts. We'll definitely come again.",
    avatar: "/testimonials/a13.webp",
    images: [
      "/testimonials/a14.webp",
      "/testimonials/a15.webp",
      "/testimonials/a16.webp",
    ],
  },
  {
    name: "Divya K",
    location: "Madurai",
    rating: 5,
    review:
      "Loved the bonfire nights and the trekking trail. Truly a haven to unwind.",
    avatar: "/testimonials/adivya.jpg",
    images: [
      "/testimonials/divya-1.jpg",
      "/testimonials/divya-2.jpg",
      "/testimonials/divya-3.jpg",
    ],
  },
  {
    name: "Rahul V",
    location: "Trichy",
    rating: 5,
    review:
      "Great for families too. Kids loved the farm walk and the clear night sky.",
    avatar: "/testimonials/arahul.jpg",
    images: [
      "/testimonials/rahul-1.jpg",
      "/testimonials/rahul-2.jpg",
      "/testimonials/rahul-3.jpg",
    ],
  },
];

function TestimonialCard({ t }) {
  const [imgIndex, setImgIndex] = useState(0);

  // Auto-cycle the left-side photo carousel (plain CSS crossfade, no framer-motion)
  useEffect(() => {
    if (t.images.length < 2) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % t.images.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [t.images.length]);

  return (
    <div className="relative snap-start shrink-0 w-80 sm:w-[22rem] h-40 sm:h-44 rounded-2xl overflow-hidden border border-white/15 bg-slate-900 shadow-lg flex transition-colors duration-300 hover:border-lime-400/50">
      {/* LEFT: Photo carousel */}
      <div className="relative w-28 sm:w-32 h-full shrink-0 overflow-hidden bg-slate-800">
        {t.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={t.name}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out",
              i === imgIndex ? "opacity-100" : "opacity-0",
            )}
          />
        ))}

        {/* subtle bottom fade so dots stay legible */}
        <div className="absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-black/60 to-transparent pointer-events-none" />

        {/* image position dots */}
        {t.images.length > 1 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {t.images.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  i === imgIndex ? "w-3 bg-lime-400" : "w-1 bg-white/50",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* RIGHT: Content */}
      <div className="relative z-10 flex-1 min-w-0 p-3 flex flex-col justify-between">
        {/* Top row: chip + rating */}
        <div className="flex items-start justify-between">
          {/* <div className="relative w-6 h-4.5 rounded-lg bg-linear-to-br from-yellow-200 via-yellow-400 to-yellow-600 shadow-inner shrink-0">
            <div className="absolute inset-x-0 top-1/2 h-px bg-yellow-800/40" />
            <div className="absolute inset-y-0 left-1/3 w-px bg-yellow-800/40" />
            <div className="absolute inset-y-0 left-2/3 w-px bg-yellow-800/40" />
          </div> */}
          <div className="flex gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-2.5 h-2.5",
                  i < t.rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-transparent text-white/25",
                )}
              />
            ))}
          </div>
        </div>

        {/* Middle: review */}
        <p className="text-xs sm:text-sm font-medium text-white leading-snug line-clamp-3 tracking-tight">
          {t.review}
        </p>

        {/* Bottom row: cardholder name + brand mark */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/40 shrink-0 bg-slate-800">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-white uppercase tracking-wider truncate">
              {t.name}
            </div>
            <div className="text-[9px] text-slate-400 truncate">
              {t.location}
            </div>
          </div>
          <Heart className="w-3.5 h-3.5 text-lime-400 fill-lime-400/40 shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default function LovedByExplorers() {
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
    setActiveIndex(Math.max(0, Math.min(index, testimonials.length - 1)));
  }, [updateScrollButtons]);

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, [updateScrollButtons]);

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index];
    if (card) {
      const left =
        card.offsetLeft - (el.clientWidth - card.clientWidth) / 2 > 0 &&
        index !== 0
          ? card.offsetLeft - 16
          : card.offsetLeft;
      el.scrollTo({ left, behavior: "smooth" });
    }
  };

  const scrollByCard = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardEl = el.children[0];
    const cardWidth = (cardEl?.getBoundingClientRect().width || 300) + 16;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

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
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-lime-400 fill-lime-400/20 shrink-0" />
            </div>
            <h2 className="text-xl md:text-2xl tracking-tight text-white uppercase flex items-center gap-3">
              Loved by Explorers
            </h2>
            <span className="hidden sm:block w-14 md:w-16 h-px bg-white/20 ml-1" />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Edge fade masks (desktop) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-6 w-10 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="hidden lg:block absolute right-0 top-0 bottom-6 w-10 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          >
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
        </div>

        {/* Dot pagination */}
        {/* <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === idx
                  ? "w-6 bg-lime-400"
                  : "w-1.5 bg-white/20 hover:bg-white/40",
              )}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
