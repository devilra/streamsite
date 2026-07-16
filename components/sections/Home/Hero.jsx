"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/common/Navbar";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  CloudMoon,
  Moon,
  Compass,
  Tent,
  Footprints,
  Dumbbell,
  Camera,
  Sprout,
  Leaf,
  Sparkles,
  Users,
  Grid,
  Telescope,
  Sun,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeInterest, setActiveInterest] = useState("Stargazer");
  const interestsRef = useRef(null);
  const [showLeftInterestScroll, setShowLeftInterestScroll] = useState(false);

  // Collapsed-by-default widget toggles — each pill is anchored to its icon
  // on the right and expands leftward to reveal its content on click.
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [moonOpen, setMoonOpen] = useState(false);
  const [tonightOpen, setTonightOpen] = useState(false);

  // Typewriter effect state
  const words = [
    "Your Way.",
    "Your Escape.",
    "Your Haven.",
    "Your Journey.",
    "Your Space.",
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Prevent hydration layout shift
  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter logic
  useEffect(() => {
    let timer;
    const activeWord = words[currentWordIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length - 1));
        setTypingSpeed(75);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeWord.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeWord) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      setTypingSpeed(200);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  // Track horizontal scroll position of the interests slider so we can
  // fade the left edge in only once the user has scrolled right.
  useEffect(() => {
    const el = interestsRef.current;
    const handleScroll = () => {
      if (el) setShowLeftInterestScroll(el.scrollLeft > 20);
    };
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const interests = [
    { id: "Stargazer", label: "Stargazer", icon: Telescope },
    { id: "Nature Lover", label: "Nature Lover", icon: Leaf },
    { id: "Adventure Seeker", label: "Adventure Seeker", icon: Compass },
    { id: "Sports Person", label: "Sports Person", icon: Dumbbell },
    { id: "Photographer", label: "Photographer", icon: Camera },
    { id: "Peace Seeker", label: "Peace Seeker", icon: Sparkles },
    { id: "Family Explorer", label: "Family Explorer", icon: Users },
  ];

  const verticalActivities = [
    { label: "Stargazing", icon: Telescope },
    { label: "Camping", icon: Tent },
    { label: "Trekking", icon: Footprints },
    { label: "Sports", icon: Dumbbell },
    { label: "Photography", icon: Camera },
    { label: "Farming", icon: Sprout },
  ];

  const planets = [
    {
      name: "Jupiter",
      desc: "Gas Giant",
      style:
        "bg-gradient-to-br from-amber-300 via-orange-500 to-amber-950 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(249,115,22,0.35)]",
    },
    {
      name: "Venus",
      desc: "Morning Star",
      style:
        "bg-gradient-to-br from-yellow-100 via-yellow-400 to-yellow-800 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(234,179,8,0.35)]",
    },
    {
      name: "Mars",
      desc: "Red Planet",
      style:
        "bg-gradient-to-br from-red-400 via-red-600 to-red-950 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(239,68,68,0.35)]",
    },
    {
      name: "Saturn",
      desc: "Ringed World",
      style:
        "bg-gradient-to-br from-amber-100 via-amber-300 to-amber-800 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(245,158,11,0.25)]",
      hasRings: true,
    },
    {
      name: "Neptune",
      desc: "Ice Giant",
      style:
        "bg-gradient-to-br from-blue-300 via-blue-600 to-blue-950 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(37,99,235,0.35)]",
    },
    {
      name: "Mercury",
      desc: "Rocky World",
      style:
        "bg-gradient-to-br from-slate-300 via-slate-500 to-slate-800 shadow-[inset_-3px_-3px_8px_rgba(0,0,0,0.8),0_4px_12px_rgba(148,163,184,0.25)]",
    },
  ];

  // Choose background based on active theme
  const getBgImage = () => {
    if (!mounted) return "/HomeThumnail/i.png";
    // We can cross-reference multiple images if available, default to i.png
    return "/HomeThumnail/i.png";
  };

  return (
    <div className="relative w-full  overflow-x-hidden overflow-y-hidden bg-slate-950 font-sans text-white select-none">
      {/* 1. Ken Burns Animated Background Image */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <motion.div
          key={theme}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            scale: {
              duration: 30,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            },
            opacity: { duration: 0.8 },
          }}
          className="absolute inset-0  bg-cover bg-position-[center_top] md:bg-center lg:bg-center"
          style={{ backgroundImage: `url('${getBgImage()}')` }}
        />

        {/* 2. Premium Themed Overlay (Cinematic dark vignettes) */}
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black via-black/30 to-black/60 pointer-events-none" />

        {/* Light Mode subtle white/translucent tint if light theme is active */}
        {mounted && theme === "light" && (
          <div className="absolute inset-0 z-10 bg-white/20 backdrop-blur-[1px] pointer-events-none transition-colors duration-500" />
        )}

        {/* 2b. Bottom Fade — blends the image seamlessly into the page's bg-slate-950 so the image's bottom edge never shows */}
        <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 z-10 bg-linear-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* 3. The Responsive Floating Navbar */}

      {/* 4. Dashboard Core Layout */}
      <div className="relative z-20 max-w-7xl mx-auto  px-4 md:px-8 flex flex-col justify-between pt-28 pb-1 md:pb-6 lg:pb-10">
        {/* Main Content & Side Cards Wrapper */}
        <div className="grid lg:grid-cols-12  items-center ">
          {/* Left Side: Headline and Taglines */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Location indicator */}
            <motion.a
              href="https://maps.app.goo.gl/MqbDGVVXiAwGeiBe8"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-lime-400/30 bg-lime-400/10 text-lime-400 text-xs font-bold mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(163,230,53,0.15)] hover:bg-lime-400/20 hover:border-lime-400 transition-all duration-300 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Stream Side, Yelagiri Hills</span>
            </motion.a>

            {/* Typography Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className=""
            >
              <h1 className="text-[39px] sm:text-6xl md:text-6xl font-display  tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]">
                Your Adventure.
              </h1>
              {/* Lime cursive subheader replica with text shadow, gradient & typewriter */}
              <h2 className="text-3xl font-display sm:text-6xl md:text-5xl text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-300 mt-2 font-extrabold drop-shadow-[0_2px_12px_rgba(163,230,53,0.45)] min-h-[80px]">
                {currentText}
                <span className="ml-1 inline-block w-1.5 h-8 sm:h-10 bg-lime-400 animate-pulse align-middle" />
              </h2>
            </motion.div>
          </div>

          {/* Right Side: Glassmorphic Widgets Grid */}
          {/* Stacked one-by-one column on ALL screen sizes (mobile, tablet, desktop) — same
              arrangement as desktop: Weather, then Moon Phase, then Tonight Visible.
              Sizing scales down on smaller screens so it fits nicely, but the layout order
              and structure stays identical across devices. */}
          <div className="w-full max-w-87.5 md:max-w-137.5 ml-auto lg:max-w-none lg:mx-0 lg:col-span-5 lg:col-start-8 flex flex-col gap-2 lg:gap-2">
            {/* Widgets: Weather, Moon Phase, Tonight Visible — all three
                collapsed to icon-only pills by default, stacked vertically
                and right-aligned. Clicking any one expands it horizontally
                (icon stays anchored on the right, content reveals to its
                left), fully independent of the other two. */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col items-end gap-2"
            >
              {/* Weather pill */}
              <motion.button
                type="button"
                onClick={() => setWeatherOpen((v) => !v)}
                initial={false}
                animate={{ width: weatherOpen ? 148 : 48 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="h-12 lg:h-13 rounded-xl md:rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-lg overflow-hidden flex items-center gap-2 px-2 shrink-0"
              >
                <AnimatePresence initial={false}>
                  {weatherOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="text-base lg:text-xl font-bold text-white whitespace-nowrap"
                    >
                      21°C
                    </motion.span>
                  )}
                </AnimatePresence>
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 shrink-0 ml-auto flex items-center justify-center">
                  <CloudMoon className="w-5 h-5 lg:w-5.5 lg:h-5.5" />
                </div>
              </motion.button>

              {/* Moon Phase pill */}
              <motion.button
                type="button"
                onClick={() => setMoonOpen((v) => !v)}
                initial={false}
                animate={{ width: moonOpen ? 172 : 48 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="h-12 lg:h-13 rounded-xl md:rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-lg overflow-hidden flex items-center gap-2 px-2 shrink-0"
              >
                <AnimatePresence initial={false}>
                  {moonOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs lg:text-sm text-slate-300 font-medium whitespace-nowrap"
                    >
                      Moon Phase
                    </motion.span>
                  )}
                </AnimatePresence>
                <div className="relative w-8 h-8 rounded-lg bg-slate-900 overflow-hidden border border-white/5 shrink-0 ml-auto flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full bg-slate-700 shadow-[inset_1rem_0_0_0_oklch(0.9_0_0)]" />
                </div>
              </motion.button>

              {/* Tonight Visible pill — expands into the infinite planet marquee */}
              <motion.div
                initial={false}
                animate={{ width: tonightOpen ? 320 : 48 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className="h-12 lg:h-13 rounded-xl md:rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-lg overflow-hidden flex items-center justify-end shrink-0 max-w-full"
              >
                <AnimatePresence initial={false}>
                  {tonightOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative flex-1 h-full min-w-0 overflow-hidden flex items-center"
                    >
                      <motion.div
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                          ease: "linear",
                          duration: 16,
                          repeat: Infinity,
                        }}
                        className="flex gap-1.5 min-w-max pl-2 pr-3"
                      >
                        {[...planets, ...planets].map((planet, idx) => (
                          <div
                            key={`${planet.name}-${idx}`}
                            className="relative flex items-center gap-1.5 px-1.5 py-1 rounded-lg border border-white/5 bg-white/5 w-[92px] select-none shrink-0"
                          >
                            {/* 3D Planet Sphere Visual */}
                            <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
                              <div
                                className={cn(
                                  "w-4 h-4 rounded-full relative z-10",
                                  planet.style,
                                )}
                              />
                              {planet.hasRings && (
                                <div className="absolute w-7 h-1 border border-amber-300/40 rounded-full skew-y-12 rotate-[-20deg] z-20 top-[40%] scale-x-125 scale-y-110 pointer-events-none" />
                              )}
                            </div>

                            {/* Name & Desc */}
                            <div className="flex flex-col text-left min-w-0">
                              <span className="text-[8px] font-bold text-white tracking-wide truncate">
                                {planet.name}
                              </span>
                              <span className="text-[7px] text-slate-400 font-medium truncate">
                                {planet.desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                      <div className="absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-black/45 to-transparent pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => setTonightOpen((v) => !v)}
                  className="h-full aspect-square flex items-center justify-center shrink-0 ml-auto px-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-300 shrink-0 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 lg:w-5.5 lg:h-5.5" />
                  </div>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar: Category selectors ("What excites you today?") */}
        <div className="w-full flex flex-col gap-3 mt-10 md:mt-11 lg:mt-3 ">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              What excites you today?
            </span>
          </div>

          {/* Slider list — width is capped on larger screens so it scrolls instead of
              stretching across the whole page; mobile keeps its natural full-width scroll.
              Left/right fade overlays only show while there's more content to scroll to. */}
          <div className="relative w-full lg:max-w-[560px] xl:max-w-[640px]">
            {/* Fade Overlays */}
            <div
              className={cn(
                "absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-slate-950 to-transparent pointer-events-none z-10 transition-opacity duration-300",
                showLeftInterestScroll ? "opacity-100" : "opacity-0",
              )}
            />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-slate-950 to-transparent pointer-events-none z-10" />

            <div
              ref={interestsRef}
              className="w-full overflow-x-auto no-scrollbar py-2"
            >
              <div className="flex items-start gap-4 min-w-max pr-4">
                {interests.map((interest) => {
                  const IconComponent = interest.icon;
                  const isActive = activeInterest === interest.id;
                  return (
                    <div
                      key={interest.id}
                      onClick={() => setActiveInterest(interest.id)}
                      className="flex flex-col items-center group cursor-pointer select-none"
                    >
                      {/* Card Container */}
                      <div
                        className={cn(
                          "w-20 h-20 rounded-2xl border flex items-center justify-center transition-all duration-300 backdrop-blur-md bg-black/35",
                          isActive
                            ? "border-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)] bg-lime-400/5"
                            : "border-white/10 hover:border-white/30 hover:bg-white/5",
                        )}
                      >
                        <IconComponent
                          className={cn(
                            "w-7 h-7 transition-colors duration-300",
                            isActive
                              ? "text-lime-400"
                              : "text-slate-300 group-hover:text-white",
                          )}
                        />
                      </div>
                      {/* Label Text */}
                      <span
                        className={cn(
                          "text-[10px] sm:text-[11px] font-semibold text-center mt-2.5 transition-colors duration-300 max-w-[85px] leading-tight select-none",
                          isActive
                            ? "text-lime-400 font-bold"
                            : "text-slate-300 group-hover:text-white",
                        )}
                      >
                        {interest.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
