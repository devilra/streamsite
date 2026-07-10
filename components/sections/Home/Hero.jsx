"use client";

import React, { useEffect, useState } from "react";
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
      <Navbar />

      {/* 4. Dashboard Core Layout */}
      <div className="relative z-20 max-w-7xl mx-auto  px-4 md:px-8 flex flex-col justify-between pt-28 pb-3 md:pb-6 lg:pb-10">
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
          <div className="w-full max-w-87.5 md:max-w-137.5  lg:max-w-none lg:mx-0 lg:col-span-4 lg:col-start-8 flex flex-col gap-1 lg:gap-4">
            {/* Widget 1: Weather Stargazing Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex items-center justify-between p-4 lg:p-4 rounded-xl md:rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-lg"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="p-2 lg:p-2.5 rounded-xl bg-sky-500/10 text-sky-400 shrink-0">
                  <CloudMoon className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <div>
                  <div className="text-base lg:text-xl font-bold tracking-tight text-white">
                    21°C
                  </div>
                  <div className="text-[10px] lg:text-xs text-slate-400">
                    Clear Sky
                  </div>
                </div>
              </div>
              <div className="text-left lg:text-right">
                <div className="text-[8px] lg:text-[10px] font-bold tracking-wider text-lime-400 uppercase bg-lime-400/10 px-1.5 py-0.5 lg:px-2 lg:py-0.5 rounded-md whitespace-nowrap">
                  Great Stargazing
                </div>
              </div>
            </motion.div>

            {/* Widget 2: Moon Phase details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center gap-2 lg:gap-4 p-4.5 lg:p-4 rounded-xl md:rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-lg"
            >
              <div className="relative w-9 h-9 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl bg-slate-900 overflow-hidden border border-white/5 shrink-0">
                {/* Visual custom Moon crescent rendering */}
                <div className="absolute w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-slate-700 shadow-[inset_1.5rem_0_0_0_oklch(0.9_0_0)]" />
              </div>
              <div>
                <div className="text-[10px] lg:text-xs text-slate-400 font-medium">
                  Moon Phase
                </div>
                <div className="text-xs lg:text-sm font-bold text-white mt-0.5">
                  Waning Gibbous
                </div>
              </div>
            </motion.div>

            {/* Widget 3: Planets Tonight Visible (Infinite Marquee) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="p-3 lg:p-4 rounded-xl md:rounded-2xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-lg overflow-hidden w-full"
            >
              <div className="text-[10px] lg:text-xs text-slate-400 font-semibold mb-2 lg:mb-3">
                Tonight Visible
              </div>
              <div className="relative w-full flex overflow-hidden">
                {/* Horizontal Marquee Wrapper */}
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    ease: "linear",
                    duration: 16,
                    repeat: Infinity,
                  }}
                  className="flex gap-2 lg:gap-3 min-w-max pr-3"
                >
                  {[...planets, ...planets].map((planet, idx) => (
                    <div
                      key={`${planet.name}-${idx}`}
                      className="relative flex items-center gap-2 lg:gap-3 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md w-28 lg:w-36 select-none shrink-0"
                    >
                      {/* 3D Planet Sphere Visual */}
                      <div className="relative w-7 h-7 lg:w-8 lg:h-8 shrink-0 flex items-center justify-center">
                        <div
                          className={cn(
                            "w-5 h-5 lg:w-6 lg:h-6 rounded-full relative z-10",
                            planet.style,
                          )}
                        />
                        {planet.hasRings && (
                          <div className="absolute w-9 lg:w-10 h-1.5 border border-amber-300/40 rounded-full skew-y-12 rotate-[-20deg] z-20 top-[40%] scale-x-125 scale-y-110 pointer-events-none" />
                        )}
                      </div>

                      {/* Name & Desc */}
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] lg:text-[10px] font-bold text-white tracking-wide">
                          {planet.name}
                        </span>
                        <span className="text-[7px] lg:text-[8px] text-slate-400 font-medium">
                          {planet.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Visual fade overlays on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-black/40 to-transparent pointer-events-none z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-linear-to-l from-black/40 to-transparent pointer-events-none z-10" />
              </div>
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

          {/* Slider list */}
          <div className="w-full overflow-x-auto no-scrollbar py-2">
            <div className="flex items-start gap-4 min-w-max">
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

        {/* Mouse Wheel Scroll Down indicator */}
        {/* <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <div className="w-5 h-8 rounded-full border-2 border-slate-400 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-slate-400"
            />
          </div>
        </div> */}

        {/* 5. Right Border Column: Vertical Activity Labels (Contained within Grid Space to Prevent Overlapping) */}
        <div className="absolute right-0 md:right-3 top-[55%] md:top-[50%] lg:top-[54%]  -translate-y-1/2 z-30 flex-col items-center">
          <div className="relative">
            {/* Fixed height container that overflows */}
            <div className="flex flex-col items-center justify-start gap-2 md:gap-5  pl-4 py-4 max-h-90 md:max-h-114 overflow-y-auto no-scrollbar w-20">
              {verticalActivities.map((act, idx) => {
                const Icon = act.icon;
                return (
                  <motion.div
                    key={act.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                    className="flex flex-col items-center gap-1 group cursor-pointer"
                    title={act.label}
                  >
                    <div className="p-2.5 rounded-full border border-white/5 bg-white/5 text-slate-400 group-hover:bg-lime-400 group-hover:text-black group-hover:border-lime-400 transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] md:text-[9px] text-slate-400 group-hover:text-lime-400 font-bold uppercase tracking-wider scale-90 mt-1">
                      {act.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Fading bottom overlay to indicate scroll availability */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-linear-to-t from-slate-950 to-transparent pointer-events-none z-10" />

            {/* Animated Scroll Down Arrow indicator
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-lime-400 animate-bounce flex flex-col items-center z-20">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest leading-none scale-75 mb-0.5 font-bold">
                More
              </span>
              <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
