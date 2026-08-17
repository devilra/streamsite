"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  UsersRound,
  Swords,
  UserRoundPlus,
  Lock,
  ArrowRight,
  ChevronLeft,
  Check,
  Wallet,
  AlertCircle,
  Info,
  CalendarDays,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  saveCricketBooking,
  dateToBookingDateKey,
  getCricketBookingsForDate,
  isCricketDateConfirmed,
  getCricketCalendarModifierDates,
} from "../_utils/cricketBookings";

/* ============================================================================
   CRICKET BOOKING MODAL — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   Standalone, self-contained modal. Import it into CricketHero (or any page
   with a "Book Now" trigger) and control it with two props:

     <CricketBookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

   REAL-WORLD BOOKING LOGIC
   -------------------------------------------------------------------------
   This is a small local ground that always plays a fixed format — 10 Overs.
   There is no user-selectable match format and no user-selectable time —
   the ground only needs to know WHICH DATE a team wants to play.

     • Single Team  -> "Team Registration". One team registers interest for
                        a date. No opponent yet, NOT a confirmed match.
     • Two Teams    -> "Confirmed Match". Both teams are ready, so the date
                        is booked as a confirmed 10-over match.
     • Open Match   -> unchanged from the existing flow (create/join an open
                        match), still uses the fixed 10-over format and a
                        date only — no time/format selector.

   STEP FLOW (4 steps, no Format step, no Slot/Time step):
     1. Booking Type
     2. Date
     3. Team Details
     4. Summary

   DATA SOURCE (Step 2 calendar)
   -------------------------------------------------------------------------
   The calendar no longer reads a hardcoded DUMMY_BOOKINGS array. It reads
   REAL bookings saved via saveCricketBooking() (see ../_utils/cricketBookings.js):
     • getCricketCalendarModifierDates() -> { confirmed: Date[], registered: Date[] }
       feeds the calendar's lime dots.
     • getCricketBookingsForDate(date)   -> bookings on the selected day, for
       the "Activity on this date" panel.
     • isCricketDateConfirmed(date)      -> disables/blocks re-booking a date
       that already has a confirmed (two_teams) match.

   PERSISTENCE (Confirm Booking)
   -------------------------------------------------------------------------
   On the final "Confirm Booking" click, the booking is written to
   localStorage via saveCricketBooking(). That call also dispatches
   CRICKET_BOOKING_UPDATED_EVENT, which is what lets CricketHero's
   "Upcoming Matches" row refresh immediately without a page reload.
   ============================================================================ */

const ACCENT = "#B7FF00";
const VENUE_NAME = "Stream Side Cricket Ground";

/** The ground only ever plays this format — no user selection anywhere. */
const FIXED_MATCH_FORMAT = "10 Overs";

const STEP_LABELS = ["Booking Type", "Date", "Team Details", "Summary"];

const TOTAL_STEPS = STEP_LABELS.length;

const BOOKING_OPTIONS = [
  {
    id: "single_team",
    icon: UsersRound,
    title: "My Team",
    subtitle: "Register your team",
    description:
      "Register your team for a 10-over cricket match. An opponent can be arranged later.",
    features: [
      "Register one team",
      "Select match date",
      "Fixed 10 Overs",
      "Opponent not required now",
    ],
    cta: "Register My Team",
  },
  {
    id: "two_teams",
    icon: Swords,
    title: "Two Teams",
    subtitle: "Confirmed match",
    description:
      "Both teams are ready. Register the confirmed match date for your 10-over game.",
    features: [
      "Add Team A & Team B",
      "Select match date",
      "Fixed 10 Overs",
      "Confirmed match",
    ],
    cta: "Register Confirmed Match",
  },
  //   {
  //     id: "open_match",
  //     icon: UserRoundPlus,
  //     title: "Open Match",
  //     subtitle: "I want to join or find players",
  //     description:
  //       "I don't have a complete team. Create or join an open cricket match and find other players.",
  //     features: [
  //       "Create an open match",
  //       "Join existing matches",
  //       "Find other players",
  //       "Fixed 10 Overs",
  //     ],
  //     cta: "Select Open Match",
  //   },
];

/** Label shown in the Summary's "Booking Type" row. */
const BOOKING_TYPE_LABELS = {
  single_team: "Team Registration",
  two_teams: "Confirmed Match",
  open_match: "Open Match",
};

/** Status label + tone shown as the booking's identification badge. */
const BOOKING_STATUS_LABELS = {
  single_team: "Team Registered",
  two_teams: "Confirmed Match",
  open_match: "Awaiting Slot Confirmation",
};

/** status field written to localStorage — matches the shape documented in
 *  cricketBookings.js ("registered_team" | "confirmed_match" | "open_match"). */
const BOOKING_STORAGE_STATUS = {
  single_team: "registered_team",
  two_teams: "confirmed_match",
  open_match: "open_match",
};

const OPEN_MATCH_PLAYERS_REQUIRED = 11;

const STEP_ERROR_MESSAGES = {
  1: "Please select a booking type to continue.",
  2: "Please select a date to continue.",
  3: "Please complete the required team details to continue.",
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function formatDate(date) {
  if (!date) return null;
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Label used in the "Activity on this date" panel for one real booking. */
function activityLabel(booking) {
  const isTwoTeam = booking.bookingType === "two_teams";
  if (isTwoTeam) {
    const a = booking.teamA?.name || "Team A";
    const b = booking.teamB?.name || "Team B";
    return `${a} vs ${b}`;
  }
  if (booking.bookingType === "open_match") {
    return booking.openMatch?.createdBy
      ? `Open Match — by ${booking.openMatch.createdBy}`
      : "Open Match";
  }
  return booking.teamA?.name || "Team";
}

function activityStatusLabel(booking) {
  if (
    booking.status === "confirmed_match" ||
    booking.bookingType === "two_teams"
  ) {
    return "Confirmed Match";
  }
  if (booking.bookingType === "open_match") return "Open Match";
  return "Team Registered";
}

function emptyTeam() {
  return {
    name: "",
    captainName: "",
    captainPhone: "",
    playerCount: "",
    substitutes: "",
  };
}

function isTeamValid(team) {
  return !!(
    team?.name?.trim() &&
    team?.captainName?.trim() &&
    team?.captainPhone?.trim() &&
    team?.playerCount
  );
}

function emptyOpenMatch() {
  return {
    playersRequired: OPEN_MATCH_PLAYERS_REQUIRED,
    playersJoined: 0,
    createdBy: "",
    contactNumber: "",
    visibility: "public",
  };
}

function isOpenMatchValid(openMatch) {
  return !!(
    openMatch?.createdBy?.trim() &&
    openMatch?.contactNumber?.trim() &&
    openMatch?.visibility
  );
}

/* -------------------------------------------------------------------------- */
/*  ProgressSteps                                                             */
/* -------------------------------------------------------------------------- */

function ProgressSteps({ currentStep }) {
  return (
    <div className="no-scrollbar -mx-1 flex items-center overflow-x-auto px-1 pb-1">
      {STEP_LABELS.map((label, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === currentStep;
        const isDone = stepNumber < currentStep;
        const isLast = i === STEP_LABELS.length - 1;

        return (
          <div key={label} className="flex shrink-0 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-all duration-300"
                style={{
                  borderColor:
                    isActive || isDone ? ACCENT : "rgba(255,255,255,0.15)",
                  backgroundColor: isDone
                    ? ACCENT
                    : isActive
                      ? `${ACCENT}22`
                      : "rgba(255,255,255,0.05)",
                  color: isDone ? "#0a0f0d" : isActive ? ACCENT : "#64748b",
                  boxShadow: isActive ? `0 0 12px -2px ${ACCENT}90` : "none",
                }}
              >
                {isDone ? <Check className="h-3 w-3" /> : stepNumber}
              </span>
              <span
                className={`w-16 text-center text-[9px] font-semibold uppercase tracking-wide sm:w-20 ${
                  isActive ? "text-white" : "text-slate-500"
                }`}
              >
                {label}
              </span>
            </div>

            {!isLast && (
              <div
                className="mx-1.5 mb-4 h-px w-6 shrink-0 sm:w-10"
                style={{
                  backgroundColor: isDone ? ACCENT : "rgba(255,255,255,0.12)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  BookingOptionCard                                                         */
/* -------------------------------------------------------------------------- */

function BookingOptionCard({ option, isSelected, onSelect, index }) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      aria-pressed={isSelected}
      className="group relative flex h-full flex-col rounded-2xl border p-5 text-left backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:p-6"
      style={{
        borderColor: isSelected ? ACCENT : "rgba(255,255,255,0.1)",
        backgroundColor: isSelected ? `${ACCENT}14` : "rgba(255,255,255,0.03)",
        boxShadow: isSelected
          ? `0 0 0 1px ${ACCENT}55, 0 0 28px -6px ${ACCENT}70`
          : "none",
      }}
    >
      {isSelected && (
        <span
          className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: ACCENT }}
        >
          <Check className="h-3.5 w-3.5 text-slate-950" />
        </span>
      )}

      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300"
        style={{
          borderColor: isSelected ? `${ACCENT}90` : "rgba(255,255,255,0.12)",
          backgroundColor: isSelected
            ? `${ACCENT}22`
            : "rgba(255,255,255,0.05)",
        }}
      >
        <Icon className="h-5 w-5" style={{ color: ACCENT }} />
      </span>

      <h3 className="mt-4 text-base font-bold text-white sm:text-lg">
        {option.title}
      </h3>
      <p className="mt-0.5 text-xs font-medium text-slate-400">
        {option.subtitle}
      </p>

      <p className="mt-3 text-xs leading-relaxed text-slate-300/90 sm:text-sm">
        {option.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {option.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-1.5 text-xs text-slate-400"
          >
            <Check
              className="mt-0.5 h-3 w-3 shrink-0"
              style={{ color: ACCENT }}
            />
            {feature}
          </li>
        ))}
      </ul>

      <span
        className="mt-5 flex items-center gap-1.5 text-xs font-bold transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: ACCENT }}
      >
        {option.cta}
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  StepOneBookingType                                                        */
/* -------------------------------------------------------------------------- */

function StepOneBookingType({ bookingType, onSelect }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        What are you booking?
      </h2>
      <p className="mt-1.5 text-sm text-slate-400">
        Choose the option that best matches your cricket plan.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BOOKING_OPTIONS.map((option, i) => (
          <BookingOptionCard
            key={option.id}
            option={option}
            index={i}
            isSelected={bookingType === option.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  StepTwoDate — date-only selection. No time, no format.                    */
/*  Reads REAL saved bookings (localStorage) via props from the parent.       */
/* -------------------------------------------------------------------------- */

function StepTwoDate({
  bookingType,
  selectedDate,
  onSelectDate,
  calendarModifiers,
}) {
  const bookingsForDate = useMemo(
    () => getCricketBookingsForDate(selectedDate),
    [selectedDate],
  );

  const dateIsConfirmed = useMemo(
    () => isCricketDateConfirmed(selectedDate),
    [selectedDate],
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        Select your match date
      </h2>
      <p className="mt-1.5 text-sm text-slate-400">
        {bookingType === "single_team"
          ? "Pick a date to register your team. Every match at Stream Side is a fixed 10-over game."
          : "Pick a date for your match. Every match at Stream Side is a fixed 10-over game."}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[auto,1fr] lg:items-start">
        <div>
          <div className="max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onSelectDate}
              disabled={[
                { before: new Date(new Date().setHours(0, 0, 0, 0)) },
                isCricketDateConfirmed,
              ]}
              modifiers={{
                confirmed: calendarModifiers.confirmed,
                registered: calendarModifiers.registered,
              }}
              modifiersClassNames={{
                confirmed:
                  "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#B7FF00]",
                registered:
                  "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:border after:border-[#B7FF00] after:bg-transparent",
              }}
              className="w-full max-w-none text-white"
            />
          </div>
          <div className="mt-2.5 space-y-1">
            <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              Filled dot — confirmed match (unavailable)
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span
                className="h-1.5 w-1.5 rounded-full border"
                style={{ borderColor: ACCENT }}
              />
              Outline dot — team registered, opponent still open
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {bookingsForDate.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                Activity on this date
              </p>
              <div className="mt-2.5 space-y-1.5">
                {bookingsForDate.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-300">{activityLabel(b)}</span>
                    <span className="font-medium text-slate-400">
                      {activityStatusLabel(b)}
                    </span>
                  </div>
                ))}
              </div>
              {dateIsConfirmed && (
                <p className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-red-400">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  This date already has a confirmed match and can't be booked
                  again.
                </p>
              )}
            </div>
          )}

          <div
            className="flex items-center gap-2.5 rounded-xl border px-4 py-3"
            style={{
              borderColor: `${ACCENT}40`,
              backgroundColor: `${ACCENT}12`,
            }}
          >
            <CalendarDays
              className="h-4 w-4 shrink-0"
              style={{ color: ACCENT }}
            />
            <span className="text-sm text-slate-200">
              Format:{" "}
              <span className="font-semibold text-white">
                {FIXED_MATCH_FORMAT}
              </span>{" "}
              (fixed)
            </span>
          </div>

          {selectedDate && (
            <p className="text-xs text-slate-500">
              Selected date:{" "}
              <span className="font-medium text-slate-300">
                {formatDate(selectedDate)}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  StepThreeTeamDetails                                                      */
/* -------------------------------------------------------------------------- */

function TeamFormSection({ title, team, onChange }) {
  function update(field, value) {
    onChange({ ...team, [field]: value });
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
      <h3 className="text-xs font-bold uppercase tracking-wider text-lime-300">
        {title}
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label className="mb-1.5 block text-sm font-semibold text-white">
            Team Name
          </Label>
          <Input
            value={team.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Stream Strikers"
            className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60"
          />
        </div>

        <div>
          <Label className="mb-1.5 block text-sm font-semibold text-white">
            Captain Name
          </Label>
          <Input
            value={team.captainName}
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
            value={team.captainPhone}
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
            value={team.playerCount}
            onChange={(e) =>
              update("playerCount", e.target.value.replace(/[^0-9]/g, ""))
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
            value={team.substitutes}
            onChange={(e) =>
              update("substitutes", e.target.value.replace(/[^0-9]/g, ""))
            }
            placeholder="Enter number of substitutes"
            className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60 sm:w-1/2"
          />
        </div>
      </div>
    </div>
  );
}

function OpenMatchForm({ openMatch, onChange }) {
  function update(field, value) {
    onChange({ ...openMatch, [field]: value });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-lime-300">
            Open Match
          </h3>
          <Badge
            variant="outline"
            className="border-lime-400/40 bg-lime-400/10 text-lime-300"
          >
            {openMatch.playersJoined} / {openMatch.playersRequired} Players
          </Badge>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Players Required: {openMatch.playersRequired}
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label className="mb-1.5 block text-sm font-semibold text-white">
              Created By
            </Label>
            <Input
              value={openMatch.createdBy}
              onChange={(e) => update("createdBy", e.target.value)}
              placeholder="Your name"
              className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60"
            />
          </div>

          <div>
            <Label className="mb-1.5 block text-sm font-semibold text-white">
              Contact Number
            </Label>
            <Input
              type="tel"
              value={openMatch.contactNumber}
              onChange={(e) => update("contactNumber", e.target.value)}
              placeholder="10-digit mobile number"
              className="border-white/10 bg-white/[0.04] text-white placeholder:text-slate-500 focus-visible:ring-lime-400/60"
            />
          </div>
        </div>

        <div className="mt-4">
          <Label className="mb-2 block text-sm font-semibold text-white">
            Match Visibility
          </Label>
          <RadioGroup
            value={openMatch.visibility}
            onValueChange={(v) => update("visibility", v)}
            className="flex items-center gap-5"
          >
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <RadioGroupItem
                value="public"
                className="border-white/30 text-lime-400"
              />
              Public
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <RadioGroupItem
                value="private"
                className="border-white/30 text-lime-400"
              />
              Private
            </label>
          </RadioGroup>
        </div>
      </div>

      <div
        className="flex items-start gap-2.5 rounded-xl border px-4 py-3 text-xs text-slate-300"
        style={{ borderColor: `${ACCENT}30`, backgroundColor: `${ACCENT}0d` }}
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0" style={{ color: ACCENT }} />
        Your match will be listed for other players to join.
      </div>
    </div>
  );
}

function StepThreeTeamDetails({
  bookingType,
  teamA,
  teamB,
  openMatch,
  onTeamAChange,
  onTeamBChange,
  onOpenMatchChange,
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">Team Details</h2>
      <p className="mt-1.5 text-sm text-slate-400">
        {bookingType === "open_match"
          ? "Tell us a bit about you — other players will see this match."
          : bookingType === "single_team"
            ? "Add your team's details to complete your registration."
            : "Add both teams' details. Player names aren't required yet."}
      </p>

      <div className="mt-6">
        {bookingType === "single_team" && (
          <TeamFormSection
            title="Your Team"
            team={teamA}
            onChange={onTeamAChange}
          />
        )}

        {bookingType === "two_teams" && (
          <div className="space-y-4">
            <TeamFormSection
              title="Team A"
              team={teamA}
              onChange={onTeamAChange}
            />
            <div className="flex items-center gap-3">
              <Separator className="flex-1 bg-white/10" />
              <span className="text-xs font-bold text-lime-300">VS</span>
              <Separator className="flex-1 bg-white/10" />
            </div>
            <TeamFormSection
              title="Team B"
              team={teamB}
              onChange={onTeamBChange}
            />
          </div>
        )}

        {bookingType === "open_match" && (
          <OpenMatchForm openMatch={openMatch} onChange={onOpenMatchChange} />
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  StepFourSummary                                                           */
/* -------------------------------------------------------------------------- */

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-right text-sm font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function StepFourSummary({
  bookingType,
  selectedDate,
  teamA,
  teamB,
  openMatch,
}) {
  const bookingStatus = BOOKING_STATUS_LABELS[bookingType] ?? "—";
  const isConfirmedMatch = bookingType === "two_teams";

  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        Cricket Booking Summary
      </h2>
      <p className="mt-1.5 text-sm text-slate-400">
        Confirm the details below. Payment is collected at the venue.
      </p>

      <div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02]">
        <SummaryRow
          label="Booking Type"
          value={BOOKING_TYPE_LABELS[bookingType] ?? "—"}
        />
        <SummaryRow label="Date" value={formatDate(selectedDate) ?? "—"} />
        <SummaryRow label="Format" value={FIXED_MATCH_FORMAT} />
        <SummaryRow label="Venue" value={VENUE_NAME} />
        <SummaryRow label="Status" value={bookingStatus} />
      </div>

      {/* Team / open match info */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        {bookingType === "single_team" && teamA && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Team</span>
              <span className="text-sm font-semibold text-white">
                {teamA.name || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Captain</span>
              <span className="text-sm font-semibold text-white">
                {teamA.captainName || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Players</span>
              <span className="text-sm font-semibold text-white">
                {teamA.playerCount || "—"}
              </span>
            </div>
          </div>
        )}

        {bookingType === "two_teams" && teamA && teamB && (
          <div className="flex items-center justify-between gap-3 text-center">
            <div className="flex-1">
              <div className="text-sm font-bold text-white">
                {teamA.name || "Team A"}
              </div>
              <div className="text-xs text-slate-400">
                {teamA.captainName || "—"}
              </div>
            </div>
            <span className="shrink-0 text-xs font-bold text-lime-300">VS</span>
            <div className="flex-1">
              <div className="text-sm font-bold text-white">
                {teamB.name || "Team B"}
              </div>
              <div className="text-xs text-slate-400">
                {teamB.captainName || "—"}
              </div>
            </div>
          </div>
        )}

        {bookingType === "open_match" && openMatch && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Open Match</span>
              <Badge
                variant="outline"
                className="border-lime-400/40 bg-lime-400/10 text-lime-300"
              >
                {bookingStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Players</span>
              <span className="text-sm font-semibold text-white">
                {openMatch.playersJoined} / {openMatch.playersRequired}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Status</span>
              <span className="text-sm font-semibold text-white">
                Waiting for Players
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Payment */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" style={{ color: ACCENT }} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Payment
          </span>
        </div>
        <p className="mt-2 text-sm font-semibold text-white">
          No Online Payment
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Payment will be collected at the venue after booking confirmation.
        </p>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400">Payment Method</span>
          <span className="font-semibold text-white">Pay at Venue</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className="text-slate-400">Payment Status</span>
          <Badge variant="outline" className="border-white/15 text-slate-300">
            Pending
          </Badge>
        </div>
      </div>

      {/* Booking status */}
      <div
        className="mt-5 flex items-center gap-2.5 rounded-xl border px-4 py-3"
        style={{ borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}12` }}
      >
        {isConfirmedMatch ? (
          <Check className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
        ) : (
          <Lock className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
        )}
        <span className="text-sm text-slate-200">
          Booking Status:{" "}
          <span className="font-semibold text-white">
            {isConfirmedMatch
              ? `✓ ${bookingStatus.toUpperCase()}`
              : bookingStatus}
          </span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CricketBookingModal                                                       */
/* -------------------------------------------------------------------------- */

export default function BookingCricketModal({ open, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingType, setBookingType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [teamA, setTeamA] = useState(emptyTeam());
  const [teamB, setTeamB] = useState(emptyTeam());
  const [openMatch, setOpenMatch] = useState(emptyOpenMatch());
  const [stepError, setStepError] = useState(null);

  // Snapshot of real localStorage bookings -> calendar dot dates. Re-read
  // fresh every time the modal opens, so it reflects anything booked since
  // it was last opened (this tab or another).
  const [calendarModifiers, setCalendarModifiers] = useState({
    confirmed: [],
    registered: [],
  });

  // Reset the whole flow every time the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setCurrentStep(1);
      setBookingType(null);
      setSelectedDate(undefined);
      setTeamA(emptyTeam());
      setTeamB(emptyTeam());
      setOpenMatch(emptyOpenMatch());
      setStepError(null);
      setCalendarModifiers(getCricketCalendarModifierDates());
    }
  }, [open]);

  // Clear any validation message whenever the step changes.
  useEffect(() => {
    setStepError(null);
  }, [currentStep]);

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

  function isStepValid(step) {
    // Step 1 = Booking Type
    if (step === 1) return !!bookingType;

    // Step 2 = Date
    if (step === 2)
      return !!selectedDate && !isCricketDateConfirmed(selectedDate);

    // Step 3 = Team Details
    if (step === 3) {
      if (bookingType === "single_team") return isTeamValid(teamA);
      if (bookingType === "two_teams")
        return isTeamValid(teamA) && isTeamValid(teamB);
      if (bookingType === "open_match") return isOpenMatchValid(openMatch);
      return true;
    }

    return true;
  }

  /**
   * Builds the exact booking object shape documented at the top of
   * ../_utils/cricketBookings.js and persists it via saveCricketBooking().
   * saveCricketBooking() fills in id/createdAt and fires
   * CRICKET_BOOKING_UPDATED_EVENT, so CricketHero's Upcoming Matches row
   * updates immediately — no page refresh needed.
   */
  function persistBooking() {
    const booking = {
      bookingType,
      status: BOOKING_STORAGE_STATUS[bookingType] ?? "registered_team",
      date: dateToBookingDateKey(selectedDate),
      format: FIXED_MATCH_FORMAT,
      teamA:
        bookingType === "single_team" || bookingType === "two_teams"
          ? teamA
          : null,
      teamB: bookingType === "two_teams" ? teamB : null,
      openMatch: bookingType === "open_match" ? openMatch : null,
    };

    const saved = saveCricketBooking(booking);
    if (!saved) {
      // localStorage unavailable/blocked — surface it instead of silently
      // closing the modal as if the booking succeeded.
      setStepError(
        "Couldn't save your booking on this device. Please try again.",
      );
      return false;
    }
    return true;
  }

  function handleContinue() {
    if (!isStepValid(currentStep)) {
      setStepError(
        STEP_ERROR_MESSAGES[currentStep] ??
          "Please complete this step to continue.",
      );
      return;
    }

    setStepError(null);

    if (currentStep === TOTAL_STEPS) {
      // Final step — persist to localStorage, then close.
      const ok = persistBooking();
      if (!ok) return;
      onClose();
      return;
    }

    setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }

  function handleBack() {
    setStepError(null);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }

  const continueEnabled = isStepValid(currentStep);
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;

  return (
    <>
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
              aria-labelledby="cricket-booking-title"
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
              style={{
                boxShadow: `0 0 0 1px ${ACCENT}25, 0 30px 80px -20px rgba(0,0,0,0.8)`,
              }}
            >
              {/* Header */}
              <div className="shrink-0 border-b border-white/10 px-5 py-5 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1
                      id="cricket-booking-title"
                      className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl"
                    >
                      <span aria-hidden="true">🏏</span> CRICKET BOOKING
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                      Book your cricket experience
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close booking modal"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5">
                  <ProgressSteps currentStep={currentStep} />
                </div>
              </div>

              {/* Step content */}
              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
                {currentStep === 1 && (
                  <StepOneBookingType
                    bookingType={bookingType}
                    onSelect={setBookingType}
                  />
                )}

                {currentStep === 2 && (
                  <StepTwoDate
                    bookingType={bookingType}
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    calendarModifiers={calendarModifiers}
                  />
                )}

                {currentStep === 3 && (
                  <StepThreeTeamDetails
                    bookingType={bookingType}
                    teamA={teamA}
                    teamB={teamB}
                    openMatch={openMatch}
                    onTeamAChange={setTeamA}
                    onTeamBChange={setTeamB}
                    onOpenMatchChange={setOpenMatch}
                  />
                )}

                {isLastStep && (
                  <StepFourSummary
                    bookingType={bookingType}
                    selectedDate={selectedDate}
                    teamA={teamA}
                    teamB={teamB}
                    openMatch={openMatch}
                  />
                )}
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t border-white/10 px-5 py-5 sm:px-8">
                {stepError && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-xs font-medium text-red-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {stepError}
                  </div>
                )}

                {isFirstStep && (
                  <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
                    <Lock className="h-3.5 w-3.5" style={{ color: ACCENT }} />
                    <span className="font-semibold text-slate-200">
                      No Online Payment
                    </span>
                    <span className="hidden sm:inline">
                      — Booking can be confirmed first. Payment will be
                      collected at the venue.
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={isFirstStep ? onClose : handleBack}
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:border-white/30 hover:text-white"
                  >
                    {!isFirstStep && <ChevronLeft className="h-4 w-4" />}
                    {isFirstStep ? "Cancel" : "Back"}
                  </button>

                  <button
                    type="button"
                    onClick={handleContinue}
                    disabled={!continueEnabled}
                    className="flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{
                      backgroundColor: ACCENT,
                      color: "#0a0f0d",
                      boxShadow: continueEnabled
                        ? `0 0 24px -4px ${ACCENT}90`
                        : "none",
                    }}
                  >
                    {isLastStep ? "Confirm Booking" : "Continue"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }
        .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </>
  );
}
