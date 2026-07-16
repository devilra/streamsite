"use client";

import React from "react";
import {
  Leaf,
  Tent,
  Flame,
  Footprints,
  Star,
  UtensilsCrossed,
  TreePine,
  Route,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Youtube,
  MessageCircle,
  ShieldCheck,
  Award,
  Heart,
  ArrowUp,
} from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { BsMailbox, BsPhone, BsShieldCheck } from "react-icons/bs";
import { BiAward, BiHeart, BiLeaf, BiMapPin } from "react-icons/bi";
import { CgLock } from "react-icons/cg";

// Lucide Facebook icon-இல் ஏற்படும் Turbopack பிழையை தவிர்க்க Inline SVG Icon பயன் படுத்தப்பட்டுள்ளது
const Facebook = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  const exploreLinks = [
    "Home",
    "Stays",
    "Adventures",
    "Gallery",
    "Offers",
    "Blog",
    "Contact Us",
  ];

  const experienceLinks = [
    { label: "Camping", icon: Tent },
    { label: "Bonfire", icon: Flame },
    { label: "Trekking", icon: Footprints },
    { label: "Stargazing", icon: Star },
    { label: "BBQ", icon: UtensilsCrossed },
    { label: "Forest Walk", icon: TreePine },
    { label: "Nature Trails", icon: Route },
  ];

  const socials = [
    { icon: FaInstagram, label: "Instagram" },
    { icon: FaFacebook, label: "Facebook" },
    { icon: FaYoutube, label: "YouTube" },
    { icon: LuMessageCircle, label: "WhatsApp" },
  ];

  const trustBadges = [
    { icon: BsShieldCheck, label: "Verified Properties" },
    { icon: BiLeaf, label: "100% Natural" },
    { icon: BiAward, label: "Best Price Guarantee" },
    { icon: BiHeart, label: "Trusted by Thousands" },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-linear-to-b from-slate-950 via-[#06140d] to-black text-white">
      {/* Glowing top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-lime-400/70 to-transparent shadow-[0_0_20px_rgba(163,230,53,0.6)]" />

      {/* Faint forest silhouette accents (decorative, ignored by screen readers) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(163,230,53,0.4), transparent 40%), radial-gradient(circle at 85% 15%, rgba(163,230,53,0.3), transparent 35%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-14 sm:pt-16 pb-8">
        {/* Brand header */}
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <svg
            viewBox="0 0 100 70"
            className="w-16 h-12 sm:w-20 sm:h-14"
            fill="none"
          >
            <path
              d="M5 55 L28 20 L45 40 L60 15 L95 55"
              stroke="#4ade80"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 55 V30 M18 30 L10 40 M18 30 L26 40"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M82 55 V32 M82 32 L74 42 M82 32 L90 42"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 58 Q 25 50, 50 58 T 98 58"
              stroke="#a3e635"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.15em] uppercase">
            <span className="text-white">Stream </span>
            <span className="text-lime-400">Side</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300">
            Escape the Noise. Discover Nature.
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 w-full max-w-xs sm:max-w-sm mt-2">
            <span className="flex-1 h-px bg-linear-to-r from-transparent to-lime-400/40" />
            <Leaf className="w-4 h-4 text-lime-400 shrink-0" />
            <span className="flex-1 h-px bg-linear-to-l from-transparent to-lime-400/40" />
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* About */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 rounded-full border border-lime-400/40 flex items-center justify-center">
              <svg viewBox="0 0 100 70" className="w-9 h-7" fill="none">
                <path
                  d="M5 55 L28 20 L45 40 L60 15 L95 55"
                  stroke="#4ade80"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 58 Q 25 50, 50 58 T 98 58"
                  stroke="#a3e635"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            <h3 className="text-sm font-bold tracking-widest text-lime-400 uppercase">
              About Stream Side
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">
              Premium forest stays, riverside camping, stargazing and
              unforgettable experiences in the heart of Yelagiri.
            </p>

            <button className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-lime-400/40 text-lime-400 text-xs font-bold hover:bg-lime-400/10 transition-colors duration-300">
              <Leaf className="w-3.5 h-3.5" />
              Live Closer to Nature
            </button>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-widest text-lime-400 uppercase">
              Explore
            </h3>
            <ul className="flex flex-col gap-2.5">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-sm text-slate-300 hover:text-lime-400 transition-colors duration-300"
                  >
                    <Leaf className="w-3.5 h-3.5 text-lime-400/70 shrink-0" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-widest text-lime-400 uppercase">
              Experiences
            </h3>
            <ul className="flex flex-col gap-2.5">
              {experienceLinks.map((exp) => {
                const Icon = exp.icon;
                return (
                  <li key={exp.label}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-sm text-slate-300 hover:text-lime-400 transition-colors duration-300"
                    >
                      <Icon className="w-3.5 h-3.5 text-lime-400/70 shrink-0" />
                      {exp.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-bold tracking-widest text-lime-400 uppercase">
              Contact Us
            </h3>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-start gap-2.5 text-sm text-slate-300">
                <BiMapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>Yelagiri Hills, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <BsPhone className="w-4 h-4 text-lime-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-300">
                <BsMailbox className="w-4 h-4 text-lime-400 shrink-0" />
                <span>hello@streamside.in</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-300">
                <CgLock className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                <span>Mon &ndash; Sun 9:00 AM &ndash; 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-bold tracking-widest text-lime-400 uppercase">
              Newsletter
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Subscribe to get the latest updates, offers and nature vibes!
            </p>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 mt-1">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
              />
            </div>

            <button className="flex items-center justify-center gap-2 rounded-xl bg-lime-400 text-slate-950 text-sm font-bold uppercase tracking-wide py-2.5 hover:bg-lime-300 transition-colors duration-300">
              Subscribe
              <Send className="w-4 h-4" />
            </button>

            <h4 className="text-sm font-bold tracking-widest text-lime-400 uppercase mt-2">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full border border-lime-400/30 flex items-center justify-center text-lime-400 hover:bg-lime-400 hover:text-slate-950 transition-colors duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust badges bar */}
        <div className="mt-14 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  {idx !== 0 && (
                    <span className="hidden sm:block h-4 w-px bg-white/15 mr-6" />
                  )}
                  <Icon className="w-4 h-4 text-lime-400 shrink-0" />
                  {badge.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-400">
          <p>
            <span className="text-lime-400">&copy;</span> 2026 Stream Side. All
            rights reserved.
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="#"
              className="hover:text-lime-400 transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <span className="text-white/20">|</span>
            <a
              href="#"
              className="hover:text-lime-400 transition-colors duration-300"
            >
              Terms &amp; Conditions
            </a>
            <span className="text-white/20">|</span>
            {/* <a
              href="#"
              className="hover:text-lime-400 transition-colors duration-300"
            >
              Refund Policy
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
