"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  MapPin,
  Users,
  Swords,
  CheckCircle2,
  ClipboardList,
  UsersRound,
} from "lucide-react";
import {
  getCricketBookings,
  subscribeToCricketBookings,
  bookingDateKeyToDate,
} from "../_utils/cricketBookings";
import ChallengeTeamModal from "./ChallengeTeamModal";
import BookingCricketModal from "./BookingCricketModel";

/* ============================================================================
   MY TEAM CAROUSEL — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   Standalone component. Drop it anywhere (e.g. right below <CricketHero />):

     <MyTeamCarousel />

   WHAT IT SHOWS
   -------------------------------------------------------------------------
   Reads real bookings from localStorage (same source CricketHero and
   BookingCricketModal use) and shows ONLY bookingType === "single_team"
   registrations — i.e. teams that registered via "My Team" but don't have
   an opponent locked in yet. Past dates are filtered out, upcoming ones are
   sorted ascending.

   Each card has a "Challenge" button. Clicking it opens ChallengeTeamModal,
   pre-loaded with this booking's team as "Team A". The opponent fills in
   their team details there; on submit the booking is converted from
   single_team -> two_teams (confirmed match) in storage, which:
     • removes the card from THIS carousel (it's no longer single_team)
     • makes it show up in CricketHero's "Upcoming Matches" row instead
       (that row already only reads confirmed two_teams bookings)

   The list re-reads localStorage and refreshes immediately whenever a
   booking is created, updated, or challenged elsewhere — no page refresh
   needed — via subscribeToCricketBookings().
   ============================================================================ */

const ACCENT = "#B7FF00";
const VENUE_NAME = "Stream Side Cricket Ground";

function formatDateLabel(dateKey) {
  const date = bookingDateKeyToDate(dateKey);
  if (!date) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getMyTeamCards(bookings) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return bookings
    .filter((b) => b.bookingType === "single_team")
    .filter((b) => {
      const d = bookingDateKeyToDate(b.date);
      return d && d >= today;
    })
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

function TeamInitialAvatar({ name }) {
  const safeName =
    typeof name === "string" && name.trim().length > 0 ? name.trim() : "?";
  const initial = safeName.charAt(0).toUpperCase();

  return (
    <span
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-xs font-bold"
      style={{ color: ACCENT }}
      aria-label={safeName}
    >
      {initial}
    </span>
  );
}

function Sparkle({ className, size = 10 }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute select-none ${className}`}
      style={{ fontSize: size, color: ACCENT, opacity: 0.6, lineHeight: 1 }}
    >
      ✦
    </span>
  );
}

/**
 * Mirrors the "Upcoming Matches" card on CricketHero exactly (same header,
 * same two-column body + vertical separator, same footer band) so both
 * carousels feel like one design system. Only two things differ, since
 * this card represents ONE team waiting for an opponent, not a locked-in
 * two-team match:
 *   - LEFT column shows a single team (no "VS" / second team)
 *   - Footer's dot indicators are replaced with the "Challenge" button
 */
function MyTeamCard({ booking, index, onChallenge }) {
  const teamName = booking.teamA?.name || "Team";
  const captainName = booking.teamA?.captainName;
  const playerCount = booking.teamA?.playerCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: 0.04 * index }}
      className="group relative w-[340px] sm:w-[440px] shrink-0 snap-start overflow-hidden rounded-[24px] border border-white/10 bg-black backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
    >
      {/* Glow */}
      <div
        className="absolute -top-12 -left-12 h-28 w-28 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-all"
        style={{ backgroundColor: ACCENT }}
      />

      {/* Top Shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative z-10 p-4 sm:p-5">
        {/* Header: trophy icon + identification badge */}
        <div className="flex min-w-0 items-center justify-between gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <Trophy className="h-4 w-4" style={{ color: ACCENT }} />
          </div>

          <span className="min-w-0 truncate text-right text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
            One Team
          </span>
        </div>

        {/* Two-column body: team (left) | separator | match info (right) */}
        <div className="mt-4 flex items-stretch gap-3">
          {/* LEFT: single registered team, vertically centered */}
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="flex min-w-0 items-center gap-2">
              <TeamInitialAvatar name={teamName} />
              <h3 className="min-w-0 truncate text-lg font-bold leading-tight text-white sm:text-2xl">
                {teamName}
              </h3>
            </div>

            {captainName && (
              <p className="mt-1.5 truncate pl-9 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 sm:text-xs">
                Captain: {captainName}
              </p>
            )}

            <p className="mt-2 truncate pl-9 text-xs font-medium text-slate-400 sm:text-sm">
              Waiting for an opponent
            </p>
          </div>

          {/* Vertical separator */}
          <div className="w-px shrink-0 bg-white/10" />

          {/* RIGHT: format · players · venue · status, stacked */}
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 sm:text-xs">
              <Trophy className="h-3 w-3 shrink-0 text-slate-500" />
              {booking.format || "10 Overs"}
            </span>

            {playerCount && (
              <span className="inline-flex min-w-0 items-center gap-1 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-400 sm:text-xs">
                <Users className="h-3 w-3 shrink-0 text-slate-500" />
                <span className="min-w-0 truncate">{playerCount} Players</span>
              </span>
            )}

            <span className="inline-flex min-w-0 items-center gap-1 text-[10px] text-slate-400 sm:text-xs">
              <MapPin className="h-3 w-3 shrink-0 text-slate-500" />
              <span className="min-w-0 truncate">{VENUE_NAME}</span>
            </span>

            <span className="inline-flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-300 sm:text-[11px]">
              <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-slate-400" />
              Team Registered
            </span>
          </div>
        </div>

        {/* Footer: date + Challenge button (replaces the dot indicators) */}
        <div className="mt-3.5 flex min-w-0 items-center justify-between gap-2 border-t border-white/10 pt-3">
          <span className="min-w-0 truncate text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
            {formatDateLabel(booking.date)}
          </span>

          <button
            type="button"
            onClick={() => onChallenge(booking)}
            className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-slate-950 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] sm:text-sm"
            style={{
              backgroundColor: ACCENT,
              boxShadow: `0 0 18px -4px ${ACCENT}90`,
            }}
          >
            <Swords className="h-3.5 w-3.5" />
            Challenge
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MyTeamCarousel() {
  const [cricketBookings, setCricketBookings] = useState([]);
  const [challengeBooking, setChallengeBooking] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    setCricketBookings(getCricketBookings());
    const unsubscribe = subscribeToCricketBookings(setCricketBookings);
    return unsubscribe;
  }, []);

  const myTeamCards = useMemo(
    () => getMyTeamCards(cricketBookings),
    [cricketBookings],
  );

  return (
    <section className="relative w-full bg-slate-950 px-4 py-10 text-white sm:px-8 sm:py-14 lg:px-16">
      <div className="mb-8">
        {/* Section Label */}
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-[#B7FF00]" />

          <span className="text-[12px] md:text-sm font-semibold uppercase tracking-[0.2em] text-[#B7FF00]">
            CRICKET ZONE
          </span>
        </div>

        {/* Main Heading */}
        <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Challenge Matches
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
          Teams registered and waiting for an opponent. Challenge a team to lock
          in a confirmed match.
        </p>
      </div>

      {myTeamCards.length === 0 ? (
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.02] px-6 py-14 text-center backdrop-blur-xl">
          {/* Decorative sparkles around the illustration */}
          <Sparkle className="left-[28%] top-6" size={10} />
          <Sparkle className="right-[26%] top-10" size={14} />
          <Sparkle className="left-[22%] bottom-16" size={12} />
          <Sparkle className="right-[24%] bottom-20" size={9} />

          {/* Illustration: clipboard with a "Users" badge, like a team roster */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center">
            <ClipboardList
              className="h-16 w-16 text-slate-600"
              strokeWidth={1.5}
            />
            <span
              className="absolute -bottom-1 -right-2 flex h-8 w-8 items-center justify-center rounded-full border"
              style={{
                borderColor: `${ACCENT}55`,
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <UsersRound className="h-4 w-4" style={{ color: ACCENT }} />
            </span>
          </div>

          <p className="text-lg font-bold text-white sm:text-xl">
            No team registrations yet
          </p>
          <p className="mt-2 max-w-xs text-sm text-slate-400">
            You haven't registered any team yet. Register your team to book a
            ground and start playing.
          </p>

          <button
            type="button"
            onClick={() => setIsBookingOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              borderColor: `${ACCENT}55`,
              backgroundColor: `${ACCENT}14`,
              color: ACCENT,
            }}
          >
            <UsersRound className="h-4 w-4" />
            Register Your Team
          </button>
        </div>
      ) : (
        <div className="no-scrollbar flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory">
          {myTeamCards.map((booking, i) => (
            <MyTeamCard
              key={booking.id}
              booking={booking}
              index={i}
              onChallenge={setChallengeBooking}
            />
          ))}
        </div>
      )}

      <ChallengeTeamModal
        booking={challengeBooking}
        open={!!challengeBooking}
        onClose={() => setChallengeBooking(null)}
      />

      <BookingCricketModal
        open={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </section>
  );
}
