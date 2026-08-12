"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Monitor,
  User,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Compass,
  Tent,
  Users,
  Compass as EventIcon,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BiCricketBall, BiCycling } from "react-icons/bi";
import { GiCricket, GiPhotoCamera } from "react-icons/gi";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // "experiences" | "stay" | null
  const { theme, setTheme } = useTheme();

  // Prevent hydration flash for theme icon
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "Home", href: "/", hasDropdown: false },
    {
      name: "Experiences",
      href: "/experiences",
      hasDropdown: true,
      dropdownItems: [
        {
          title: "Trekking & Hiking",
          desc: "Conquer the scenic peaks of Yelagiri",
          icon: Compass,
          href: "/experiences/trekking-hiking",
        },
        {
          title: "Stargazing Nights",
          desc: "View clear skies with telescope setups",
          icon: Sun,
          href: "/experiences/stargazing-nights",
        },
        {
          title: "Running and Cycling",
          desc: "Scenic hill routes for running and cycling adventures.",
          icon: BiCycling,
          href: "/experiences/running-cycling",
        },
        {
          title: "Photography",
          desc: "Capture breathtaking landscapes, wildlife and golden moments.",
          icon: GiPhotoCamera,
          href: "/experiences/photography",
        },
        {
          title: "Cricket",
          desc: "Enjoy exciting cricket matches with your friends in nature.",
          icon: BiCricketBall,
          href: "/experiences/cricket",
        },
      ],
    },
    // {
    //   name: "Stay",
    //   href: "/stay",
    //   hasDropdown: true,
    //   dropdownItems: [
    //     {
    //       title: "Luxury Domes",
    //       desc: "Climatic controlled glass dome stays",
    //       icon: Tent,
    //       href: "/stay/luxury-domes",
    //     },
    //     {
    //       title: "Mountain Villas",
    //       desc: "Spacious private infinity pool villas",
    //       icon: Tent,
    //       href: "/stay/mountain-villas",
    //     },
    //     {
    //       title: "A-Frame Cabins",
    //       desc: "Cozy timber chalets with sunset views",
    //       icon: Tent,
    //       href: "/stay/a-frame-cabins",
    //     },
    //     {
    //       title: "Glamping Tents",
    //       desc: "Close-to-nature premium camping",
    //       icon: Tent,
    //       href: "/stay/glamping-tents",
    //     },
    //   ],
    // },
    // { name: "Communities", href: "/communities", hasDropdown: false },
    { name: "Events", href: "/events", hasDropdown: false },
    { name: "About Us", href: "/about", hasDropdown: false },
  ];

  // Determine if a nav item is active based on the current route
  const isItemActive = (item) => {
    if (item.href === "/") return pathname === "/";
    return pathname === item.href || pathname?.startsWith(item.href + "/");
  };

  // Handle closing dropdown on clicking outside
  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdown(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-2 md:px-8 max-w-7xl mx-auto">
      {/* Navbar Container */}
      <nav className="relative flex items-center justify-between px-4 py-4 md:py-4.5 lg:py-2.5  rounded-2xl border border-white/10 dark:border-white/10 light:border-black/5 bg-black/40 dark:bg-black/40 light:bg-white/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-300">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group select-none">
          {/* Custom Mountain SVG Logo */}
          <div className="relative w-10 h-10 flex items-center justify-center text-white dark:text-white light:text-slate-900">
            <svg
              viewBox="0 0 100 100"
              className="w-10 h-10 fill-none stroke-current"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Stars */}
              {/* Center Main Star */}
              <path
                d="M50,12 L52,18 L58,20 L52,22 L50,28 L48,22 L42,20 L48,18 Z"
                fill="currentColor"
                className="text-lime-400 stroke-none"
              />
              {/* Left Star */}
              <path
                d="M28,24 L29,27 L32,28 L29,29 L28,32 L27,29 L24,28 L27,27 Z"
                fill="currentColor"
                className="text-white/80 stroke-none"
              />
              {/* Right Star */}
              <path
                d="M72,24 L73,27 L76,28 L73,29 L72,32 L71,29 L68,28 L71,27 Z"
                fill="currentColor"
                className="text-white/80 stroke-none"
              />

              {/* Mountains */}
              {/* Left Peak */}
              <path d="M15,75 L42,38 L58,60" />
              {/* Right Peak */}
              <path d="M38,75 L62,45 L85,75" strokeWidth="2.5" />

              {/* Reflection / Water Lines */}
              <path d="M22,82 H78" strokeWidth="1.5" className="opacity-40" />
              <path
                d="M30,87 H70"
                strokeWidth="1.5"
                className="opacity-30"
                strokeDasharray="6 4"
              />
              <path d="M40,92 H60" strokeWidth="1.5" className="opacity-20" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="text-sm md:text-base font-bold tracking-wider text-white dark:text-white light:text-slate-900 leading-tight">
              STREAM SIDE
            </span>
            <span className="text-[9px] font-semibold tracking-[0.25em] text-lime-400 leading-none">
              YELAGIRI HILLS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const active = isItemActive(item);
            return (
              <div
                key={item.name}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                {item.hasDropdown ? (
                  <div>
                    <button
                      onClick={() =>
                        setActiveDropdown(
                          activeDropdown === item.name.toLowerCase()
                            ? null
                            : item.name.toLowerCase(),
                        )
                      }
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:text-white dark:hover:text-white light:hover:text-black",
                        active || activeDropdown === item.name.toLowerCase()
                          ? "text-lime-400"
                          : "text-slate-300 dark:text-slate-300 light:text-slate-600",
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-300",
                          activeDropdown === item.name.toLowerCase() &&
                            "rotate-180 text-lime-400",
                        )}
                      />
                    </button>

                    {/* Dropdown Menu Panel */}
                    <AnimatePresence>
                      {activeDropdown === item.name.toLowerCase() && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-[120%] left-1/2 -translate-x-1/2 w-80 p-4 rounded-xl border border-white/10 bg-black/85 dark:bg-black/90 light:bg-white/95 backdrop-blur-xl shadow-2xl z-50"
                        >
                          <div className="grid gap-2">
                            {item.dropdownItems.map((subItem) => {
                              const IconComponent = subItem.icon;
                              return (
                                <Link
                                  key={subItem.title}
                                  href={subItem.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="flex items-start gap-3 p-2.5 rounded-lg transition-colors hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5 group/item"
                                >
                                  <div className="p-1.5 rounded-md bg-lime-500/10 text-lime-400 group-hover/item:bg-lime-500 group-hover/item:text-black transition-colors">
                                    <IconComponent className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-semibold text-white dark:text-white light:text-slate-900 group-hover/item:text-lime-400 transition-colors">
                                      {subItem.title}
                                    </h4>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-500 leading-normal mt-0.5">
                                      {subItem.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setActiveDropdown(null)}
                    className={cn(
                      "relative block px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:text-white dark:hover:text-white light:hover:text-black",
                      active
                        ? "text-white dark:text-white light:text-black font-semibold"
                        : "text-slate-300 dark:text-slate-300 light:text-slate-600",
                    )}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-lime-400 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Side Action Items */}
        <div className="flex items-center  gap-2 md:gap-3">
          {/* Theme Selector */}
          {mounted && (
            <div
              className="relative hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "theme" ? null : "theme")
                }
                className="p-2.5 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-all select-none capitalize"
                aria-label={`Toggle Theme (Current: ${theme})`}
                title={`Theme: ${theme}`}
              >
                {theme === "system" && (
                  <Monitor className="w-4 h-4 text-sky-400" />
                )}
                {theme === "dark" && (
                  <Moon className="w-4 h-4 text-indigo-400" />
                )}
                {theme === "light" && <Sun className="w-4 h-4 text-lime-400" />}
              </button>

              <AnimatePresence>
                {activeDropdown === "theme" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-[120%] w-32 p-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-black/90 backdrop-blur-xl shadow-2xl z-50 flex flex-col gap-0.5"
                  >
                    {[
                      {
                        id: "light",
                        label: "Light",
                        icon: Sun,
                        color: "text-lime-500 dark:text-lime-400",
                      },
                      {
                        id: "dark",
                        label: "Dark",
                        icon: Moon,
                        color: "text-indigo-500 dark:text-indigo-400",
                      },
                      {
                        id: "system",
                        label: "System",
                        icon: Monitor,
                        color: "text-sky-500 dark:text-sky-400",
                      },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = theme === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setTheme(opt.id);
                            setActiveDropdown(null);
                          }}
                          className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-left w-full transition-colors hover:bg-slate-100 dark:hover:bg-white/5",
                            isSelected
                              ? "bg-slate-100 dark:bg-white/10 text-black dark:text-white"
                              : "text-slate-600 dark:text-slate-400",
                          )}
                        >
                          <Icon className={cn("w-3.5 h-3.5", opt.color)} />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* User Account / Profile */}
          <Link
            href="/account"
            className="p-2.5 rounded-full border border-white/10 dark:border-white/10 light:border-black/10 text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white light:text-slate-600 light:hover:text-black bg-white/5 dark:bg-white/5 light:bg-black/5 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 transition-all"
            aria-label="User Account"
          >
            <User className="w-6 md:w-4 md:h-4 lg:w-4 lg:h-4 h-6" />
          </Link>

          {/* Premium Book Now Button */}
          <Link
            href="/book"
            className="relative hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-lime-400 hover:bg-lime-300 transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.55)] active:scale-95 group/btn overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
            <Calendar className="w-6 md:w-4 md:h-4 lg:w-4 lg:h-4 h-6 stroke-[2.5]" />
            <span>Book Now</span>
          </Link>

          {/* Mobile Menu Open Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden p-2.5 rounded-full border border-white/10 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 md:w-4 md:h-4 lg:w-4 lg:h-4 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay and Content */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 xl:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[320px] bg-black/95 dark:bg-black/95 light:bg-white border-l border-white/10 dark:border-white/10 light:border-black/10 p-6 z-50 xl:hidden flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 dark:border-white/10 light:border-black/10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-wider text-white dark:text-white light:text-black">
                      STREAM SIDE
                    </span>
                    {/* <span className="text-[8px] font-bold text-lime-400 tracking-wider">
                      MENU
                    </span> */}
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full border border-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="mt-8 flex flex-col gap-1.5">
                  {navItems.map((item) => {
                    const active = isItemActive(item);
                    const isDropdownActive =
                      activeDropdown === item.name.toLowerCase();
                    return (
                      <div key={item.name} className="flex flex-col">
                        {item.hasDropdown ? (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdown((prev) =>
                                  prev === item.name.toLowerCase()
                                    ? null
                                    : item.name.toLowerCase(),
                                );
                              }}
                              className={cn(
                                "flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300",
                                isDropdownActive
                                  ? "bg-lime-400/10 border border-lime-400/30 text-lime-400"
                                  : "bg-white/5 border border-white/10 text-white",
                              )}
                            >
                              <span className="font-semibold">{item.name}</span>

                              <motion.div
                                animate={{ rotate: isDropdownActive ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                              >
                                <ChevronDown className="w-5 h-5" />
                              </motion.div>
                            </button>

                            {/* Mobile Dropdown Sub items */}
                            <AnimatePresence>
                              {isDropdownActive && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 ml-2 border-l border-lime-400/30 pl-3 space-y-2">
                                    {item.dropdownItems.map((subItem) => {
                                      const Icon = subItem.icon;

                                      return (
                                        <Link
                                          key={subItem.title}
                                          href={subItem.href}
                                          onClick={() => {
                                            setMobileMenuOpen(false);
                                            setActiveDropdown(null);
                                          }}
                                          className="flex items-start gap-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-3 transition-all duration-300"
                                        >
                                          <div className="w-10 h-10 rounded-lg bg-lime-500/10 flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5 text-lime-400" />
                                          </div>

                                          <div className="flex-1">
                                            <h4 className="text-sm font-semibold text-white">
                                              {subItem.title}
                                            </h4>

                                            <p className="mt-1 text-xs leading-relaxed text-slate-400">
                                              {subItem.desc}
                                            </p>
                                          </div>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            className={cn(
                              "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                              active
                                ? "text-black bg-lime-400 font-bold"
                                : "text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-black/5",
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Footer actions */}
              <div className="pt-6 border-t border-white/10 dark:border-white/10 light:border-black/10 flex flex-col gap-4">
                <Link
                  href="/book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-black bg-lime-400 hover:bg-lime-300 transition-colors shadow-[0_0_15px_rgba(163,230,53,0.3)]"
                >
                  <Calendar className="w-4 h-4 stroke-[2.5]" />
                  <span>Book Now</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
