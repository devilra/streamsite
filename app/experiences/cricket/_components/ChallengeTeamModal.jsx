"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Swords, ArrowRight, AlertCircle, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { challengeCricketBooking } from "../_utils/cricketBookings";

/* ============================================================================
   CHALLENGE TEAM MODAL — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   Opened from a "My Team" card's Challenge button (see MyTeamCarousel.jsx).

     <ChallengeTeamModal booking={selectedBooking} open={isOpen} onClose={...} />

   WHAT IT DOES
   -------------------------------------------------------------------------
   Shows the registered team ("Team A", read-only, taken from the booking
   passed in) and a form for the opponent ("Team B"). On submit it calls
   challengeCricketBooking(bookingId, opponentTeam), which must:

     1. Find the existing booking by id in storage.
     2. Set bookingType: "two_teams", status: "confirmed_match".
     3. Attach teamB = opponentTeam.
     4. Persist the updated booking back to storage (in place — same id,
        NOT a new entry) and dispatch the same
        CRICKET_BOOKING_UPDATED_EVENT that saveCricketBooking() fires, so
        CricketHero's "Upcoming Matches" row and MyTeamCarousel both
        refresh immediately.

   NOTE: challengeCricketBooking is NOT part of the cricketBookings.js you
   already have — it needs to be added there (see the addon snippet shared
   alongside this component). This modal calls it as-is; wire the storage
   details to match your existing file.
   ============================================================================ */

const ACCENT = "#B7FF00";

function emptyOpponent() {
  return {
    name: "",
    captainName: "",
    captainPhone: "",
    playerCount: "",
    substitutes: "",
  };
}

function isOpponentValid(team) {
  return !!(
    team?.name?.trim() &&
    team?.captainName?.trim() &&
    team?.captainPhone?.trim() &&
    team?.playerCount
  );
}

export default function ChallengeTeamModal({ booking, open, onClose }) {
  const [opponent, setOpponent] = useState(emptyOpponent());
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setOpponent(emptyOpponent());
      setError(null);
      setSubmitting(false);
    }
  }, [open, booking?.id]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function update(field, value) {
    setOpponent((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    if (!isOpponentValid(opponent)) {
      setError("Please fill in the opponent team's details to continue.");
      return;
    }
    if (!booking?.id) {
      setError("Couldn't find the original registration. Please try again.");
      return;
    }

    setSubmitting(true);
    const updated = challengeCricketBooking(booking.id, opponent);
    setSubmitting(false);

    if (!updated) {
      setError("Couldn't confirm this match on this device. Please try again.");
      return;
    }

    onClose();
  }

  if (!booking) return null;

  const teamAName = booking.teamA?.name || "Team A";
  const teamACaptain = booking.teamA?.captainName;
  const teamAPlayers = booking.teamA?.playerCount;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="challenge-team-title"
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
            style={{
              boxShadow: `0 0 0 1px ${ACCENT}25, 0 30px 80px -20px rgba(0,0,0,0.8)`,
            }}
          >
            {/* Header */}
            <div className="shrink-0 border-b border-white/10 px-5 py-5 sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1
                    id="challenge-team-title"
                    className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl"
                  >
                    <Swords className="h-5 w-5" style={{ color: ACCENT }} />
                    Challenge {teamAName}
                  </h1>
                  <p className="mt-1 text-sm text-slate-400">
                    Add your team's details to lock in this match.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close challenge modal"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
              {/* Team A — read-only summary of the registered team */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Team A · Already Registered
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1.5">
                  <span className="text-base font-bold text-white">
                    {teamAName}
                  </span>
                  {teamACaptain && (
                    <span className="text-xs text-slate-400">
                      Captain: {teamACaptain}
                    </span>
                  )}
                  {teamAPlayers && (
                    <span className="text-xs text-slate-400">
                      {teamAPlayers} Players
                    </span>
                  )}
                </div>
              </div>

              <div className="my-5 flex items-center gap-3">
                <Separator className="flex-1 bg-white/10" />
                <span className="text-xs font-bold text-lime-300">VS</span>
                <Separator className="flex-1 bg-white/10" />
              </div>

              {/* Team B — the challenger, filled in here */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-lime-300">
                  Team B · Your Team
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label className="mb-1.5 block text-sm font-semibold text-white">
                      Team Name
                    </Label>
                    <Input
                      value={opponent.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="e.g. Valley Vipers"
                      className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-sm font-semibold text-white">
                      Captain Name
                    </Label>
                    <Input
                      value={opponent.captainName}
                      onChange={(e) => update("captainName", e.target.value)}
                      placeholder="Captain's full name"
                      className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-sm font-semibold text-white">
                      Captain Phone
                    </Label>
                    <Input
                      type="tel"
                      value={opponent.captainPhone}
                      onChange={(e) => update("captainPhone", e.target.value)}
                      placeholder="10-digit mobile number"
                      className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60"
                    />
                  </div>

                  <div>
                    <Label className="mb-1.5 block text-sm font-semibold text-white">
                      Number of Players
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="1"
                      step="1"
                      value={opponent.playerCount}
                      onChange={(e) =>
                        update(
                          "playerCount",
                          e.target.value.replace(/[^0-9]/g, ""),
                        )
                      }
                      placeholder="Enter number of players"
                      className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Label className="mb-1.5 block text-sm font-semibold text-white">
                      Substitutes
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      value={opponent.substitutes}
                      onChange={(e) =>
                        update(
                          "substitutes",
                          e.target.value.replace(/[^0-9]/g, ""),
                        )
                      }
                      placeholder="Enter number of substitutes"
                      className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60 sm:w-1/2"
                    />
                  </div>
                </div>
              </div>

              <div
                className="mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs text-slate-300"
                style={{
                  borderColor: `${ACCENT}30`,
                  backgroundColor: `${ACCENT}0d`,
                }}
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: ACCENT }}
                />
                Submitting this locks the date as a confirmed match and moves it
                to Upcoming Matches.
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-white/10 px-5 py-5 sm:px-8">
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-xs font-medium text-red-400">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    backgroundColor: ACCENT,
                    color: "#0a0f0d",
                    boxShadow: `0 0 24px -4px ${ACCENT}90`,
                  }}
                >
                  Confirm Match
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
