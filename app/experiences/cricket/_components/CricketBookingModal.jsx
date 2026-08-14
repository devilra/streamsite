"use client";

import { useEffect, useMemo, useState, useRef } from "react";
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
  Clock2Icon,
  Timer,
  Wallet,
  AlertCircle,
  Info,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ============================================================================
   CRICKET BOOKING MODAL — Stream Side, Yelagiri Hills
   ----------------------------------------------------------------------------
   Standalone, self-contained modal. Import it into CricketHero (or any page
   with a "Book Now" trigger) and control it with two props:

     <CricketBookingModal open={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

   All six steps are now fully implemented:
     1. Booking Type   — unchanged
     2. Date            — calendar now shows a dot on dates that already have
                          bookings (dummy data), and the Start/End time picker
                          greys out + disables any time that falls inside an
                          existing booking on the selected date.
     3. Format          — interactive match-format selection
     4. Slot             — date/format-aware slot picker, auto end time
     5. Team Details    — dynamic form based on bookingType
     6. Summary          — full read-only booking summary

   NOTE: This assumes shadcn/ui's Calendar, Input, Label, Select, RadioGroup,
   Badge and Separator are already set up in the project under
   "@/components/ui/*" (as seen in your screenshot). Adjust the import paths
   if yours live elsewhere.
   ============================================================================ */

const ACCENT = "#B7FF00";
const VENUE_NAME = "Stream Side Cricket Ground";

const STEP_LABELS = [
  "Booking Type",
  "Format",
  "Date",
  "Team Details",
  "Summary",
];

const TOTAL_STEPS = STEP_LABELS.length;

const BOOKING_OPTIONS = [
  {
    id: "single_team",
    icon: UsersRound,
    title: "My Team",
    subtitle: "I already have a team",
    description:
      "We already have our team ready. Book a cricket slot for your team.",
    features: [
      "Single team booking",
      "Add team details",
      "Select preferred date & slot",
      "Pay at venue",
    ],
    cta: "Select My Team",
  },
  {
    id: "two_teams",
    icon: Swords,
    title: "Two Teams",
    subtitle: "We have both teams",
    description: "We already have two teams ready to play against each other.",
    features: [
      "Two team booking",
      "Add Team A & Team B",
      "Select preferred date & slot",
      "Pay at venue",
    ],
    cta: "Select Two Teams",
  },
  {
    id: "open_match",
    icon: UserRoundPlus,
    title: "Open Match",
    subtitle: "I want to join or find players",
    description:
      "I don't have a complete team. Create or join an open cricket match and find other players.",
    features: [
      "Create an open match",
      "Join existing matches",
      "Find other players",
      "Pay at venue",
    ],
    cta: "Select Open Match",
  },
];

const BOOKING_TYPE_LABELS = {
  single_team: "My Team",
  two_teams: "Two Teams",
  open_match: "Open Match",
};

const OPEN_MATCH_PLAYERS_REQUIRED = 11;

/* -------------------------------------------------------------------------- */
/*  Match format configuration — single source of truth, easy to reconfigure  */
/*  from an admin panel later.                                                */
/* -------------------------------------------------------------------------- */

const FORMAT_CONFIG = {
  "5_overs": {
    label: "5 Overs",
    duration: 60,
    description: "A short, high-energy match for a quick session.",
  },
  "6_overs": {
    label: "6 Overs",
    duration: 60,
    description: "A quick match with a few extra deliveries.",
  },
  "8_overs": {
    label: "8 Overs",
    duration: 75,
    description: "A balanced, mid-length match.",
  },
  "10_overs": {
    label: "10 Overs",
    duration: 90,
    description: "Perfect for a quick competitive match.",
  },
  "15_overs": {
    label: "15 Overs",
    duration: 120,
    description: "Extended play with room to build an innings.",
  },
  "20_overs": {
    label: "20 Overs",
    duration: 150,
    description: "Full-length T20 style experience.",
  },
  custom: {
    label: "Custom",
    duration: null,
    description: "Tell us your preferred format at the venue.",
  },
};

const MATCH_FORMATS = Object.entries(FORMAT_CONFIG).map(([id, config]) => ({
  id,
  ...config,
}));

const STEP_ERROR_MESSAGES = {
  1: "Please select a booking type to continue.",
  2: "Please choose a match format to continue.",
  3: "Please select a valid date and time window.",
  4: "Please complete the required team details to continue.",
};

/* -------------------------------------------------------------------------- */
/*  Dummy existing-bookings data — powers the calendar dot indicator and the  */
/*  Start/End time picker's "already booked" disabling on Step 2. Swap for a  */
/*  real availability API later; the shape (date + 24hr start/end) is what    */
/*  that endpoint should return.                                              */
/* -------------------------------------------------------------------------- */

const DUMMY_BOOKED_SLOTS = [
  {
    date: "2026-08-20",
    teamName: "Stream Strikers",
    startTime: "18:00",
    endTime: "19:30",
  },
  {
    date: "2026-08-20",
    teamName: "Hill Warriors",
    startTime: "08:00",
    endTime: "09:30",
  },
  {
    date: "2026-08-22",
    teamName: "Forest Riders",
    startTime: "06:00",
    endTime: "07:00",
  },
  {
    date: "2026-08-25",
    teamName: "Mountain Kings",
    startTime: "16:00",
    endTime: "17:30",
  },
];

function dateToKey(date) {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function keyToDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Unique Date objects for every date that has at least one booking — feeds the calendar dot modifier. */
const BOOKED_DATE_OBJECTS = DUMMY_BOOKED_SLOTS.reduce((acc, slot) => {
  if (!acc.some((d) => dateToKey(d) === slot.date)) {
    acc.push(keyToDate(slot.date));
  }
  return acc;
}, []);

function getBookedSlotsForDate(date) {
  const key = dateToKey(date);
  if (!key) return [];
  return DUMMY_BOOKED_SLOTS.filter((slot) => slot.date === key);
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

/** "HH:MM" (24hr) -> minutes since midnight. */
function timeStringToMinutes(value) {
  const [h, m] = value.split(":").map(Number);
  return h * 60 + m;
}

/** "HH:MM" + "HH:MM" -> { invalid, label } — assumes same-day, end after start. */
function getDuration(startTime, endTime) {
  if (!startTime || !endTime) return null;

  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;
  const diff = endMinutes - startMinutes;

  if (diff <= 0) return { invalid: true, label: null };

  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  const parts = [];
  if (hrs) parts.push(`${hrs} hr`);
  if (mins) parts.push(`${mins} min`);

  return { invalid: false, label: parts.join(" ") };
}

function formatDate(date) {
  if (!date) return null;
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDurationLabel(minutes) {
  if (!minutes) return "To be discussed";
  if (minutes < 60) return `${minutes} minutes`;
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hrs} hr ${mins} min` : `${hrs} hr${hrs > 1 ? "s" : ""}`;
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
/*  TimeField — Custom popup time picker, aware of existing bookings          */
/* -------------------------------------------------------------------------- */

const TIME_HOURS = Array.from({ length: 12 }, (_, i) => i + 1);

const TIME_MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function parseTimeValue(value) {
  if (!value) {
    return {
      hour: 12,
      minute: 0,
      meridiem: "AM",
    };
  }

  const [hour24, minute] = value.split(":").map(Number);

  const meridiem = hour24 >= 12 ? "PM" : "AM";

  let hour12 = hour24 % 12;

  if (hour12 === 0) {
    hour12 = 12;
  }

  return {
    hour: hour12,
    minute,
    meridiem,
  };
}

function buildTimeValue(hour12, minute, meridiem) {
  let hour24 = hour12 % 12;

  if (meridiem === "PM") {
    hour24 += 12;
  }

  return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0",
  )}`;
}

function formatTimeDisplay(value) {
  if (!value) return null;

  const { hour, minute, meridiem } = parseTimeValue(value);

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0",
  )} ${meridiem}`;
}

/** Does hour12:minute meridiem (built into a 24hr value) fall inside any booked range? */
function isMinuteBooked(hour12, minute, meridiem, bookedRanges) {
  if (!bookedRanges?.length) return false;
  const totalMinutes = timeStringToMinutes(
    buildTimeValue(hour12, minute, meridiem),
  );
  return bookedRanges.some(
    (r) => totalMinutes >= r.startMinutes && totalMinutes < r.endMinutes,
  );
}

/** True only when every 5-minute increment inside this hour is booked. */
function isHourFullyBooked(hour12, meridiem, bookedRanges) {
  if (!bookedRanges?.length) return false;
  return TIME_MINUTES.every((m) =>
    isMinuteBooked(hour12, m, meridiem, bookedRanges),
  );
}

function TimeField({ label, value, onChange, bookedRanges = [] }) {
  const [open, setOpen] = useState(false);

  const containerRef = useRef(null);

  const { hour, minute, meridiem } = parseTimeValue(value);

  /* ---------------------------------------------------------------------- */
  /* Close popup when clicking outside                                      */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  /* ---------------------------------------------------------------------- */
  /* Selection handlers                                                     */
  /* ---------------------------------------------------------------------- */

  function selectHour(selectedHour) {
    if (isHourFullyBooked(selectedHour, meridiem, bookedRanges)) return;
    onChange(buildTimeValue(selectedHour, minute, meridiem));
  }

  function selectMinute(selectedMinute) {
    if (isMinuteBooked(hour, selectedMinute, meridiem, bookedRanges)) return;
    onChange(buildTimeValue(hour, selectedMinute, meridiem));
  }

  function selectMeridiem(selectedMeridiem) {
    onChange(buildTimeValue(hour, minute, selectedMeridiem));
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Label */}
      <span className="mb-1.5 block text-sm font-semibold text-white">
        {label}
      </span>

      {/* Time trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-xl border bg-white/[0.04] px-3.5 py-2.5 text-left transition-all duration-200 focus:outline-none"
        style={{
          borderColor: open ? `${ACCENT}70` : "rgba(255,255,255,0.1)",

          boxShadow: open ? `0 0 0 3px ${ACCENT}18` : "none",
        }}
      >
        <Clock2Icon
          className="h-4 w-4 shrink-0"
          style={{
            color: open ? ACCENT : "#94a3b8",
          }}
        />

        <span
          className={`flex-1 text-sm ${
            value ? "text-white" : "text-slate-500"
          }`}
        >
          {formatTimeDisplay(value) || "Select time"}
        </span>

        <span
          className="text-[10px] font-semibold uppercase tracking-wide"
          style={{
            color: open ? ACCENT : "#64748b",
          }}
        >
          {open ? "Close" : "Select"}
        </span>
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* Popup                                                              */}
      {/* ------------------------------------------------------------------ */}

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4"
            style={{
              boxShadow: `
                0 0 0 1px ${ACCENT}18,
                0 24px 60px -12px rgba(0,0,0,0.8)
              `,
            }}
          >
            {/* Popup header */}
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Select Time
                </p>

                <p className="mt-0.5 text-sm font-semibold text-white">
                  {formatTimeDisplay(value) || "12:00 AM"}
                </p>
              </div>

              <Clock2Icon className="h-4 w-4" style={{ color: ACCENT }} />
            </div>

            {bookedRanges?.length > 0 && (
              <p className="mb-2.5 flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                <span className="h-2 w-2 rounded-full bg-slate-600" />
                Greyed out = already booked on this date
              </p>
            )}

            {/* Picker columns */}
            <div className="grid grid-cols-3 gap-2">
              {/* ---------------------------------------------------------- */}
              {/* Hour                                                       */}
              {/* ---------------------------------------------------------- */}

              <div>
                <div className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Hour
                </div>

                <div className="no-scrollbar max-h-44 space-y-1 overflow-y-auto pr-0.5">
                  {TIME_HOURS.map((h) => {
                    const selected = h === hour;
                    const hourBooked = isHourFullyBooked(
                      h,
                      meridiem,
                      bookedRanges,
                    );

                    return (
                      <button
                        key={`hour-${h}`}
                        type="button"
                        disabled={hourBooked}
                        onClick={() => selectHour(h)}
                        aria-label={
                          hourBooked
                            ? `${String(h).padStart(2, "0")} ${meridiem}, already booked`
                            : undefined
                        }
                        className="w-full rounded-lg py-2 text-center text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed"
                        style={
                          selected
                            ? {
                                backgroundColor: ACCENT,
                                color: "#0a0f0d",
                                boxShadow: `0 0 14px -4px ${ACCENT}90`,
                              }
                            : hourBooked
                              ? {
                                  color: "#64748b",
                                  textDecoration: "line-through",
                                  opacity: 0.5,
                                }
                              : {
                                  color: "#cbd5e1",
                                }
                        }
                      >
                        {String(h).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* Minute                                                     */}
              {/* ---------------------------------------------------------- */}

              <div>
                <div className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Minute
                </div>

                <div className="no-scrollbar max-h-44 space-y-1 overflow-y-auto pr-0.5">
                  {TIME_MINUTES.map((m) => {
                    const selected = m === minute;
                    const minuteBooked = isMinuteBooked(
                      hour,
                      m,
                      meridiem,
                      bookedRanges,
                    );

                    return (
                      <button
                        key={`minute-${m}`}
                        type="button"
                        disabled={minuteBooked}
                        onClick={() => selectMinute(m)}
                        aria-label={
                          minuteBooked
                            ? `${String(hour).padStart(2, "0")}:${String(
                                m,
                              ).padStart(2, "0")} ${meridiem}, already booked`
                            : undefined
                        }
                        className="w-full rounded-lg py-2 text-center text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed"
                        style={
                          selected
                            ? {
                                backgroundColor: ACCENT,
                                color: "#0a0f0d",
                                boxShadow: `0 0 14px -4px ${ACCENT}90`,
                              }
                            : minuteBooked
                              ? {
                                  color: "#64748b",
                                  textDecoration: "line-through",
                                  opacity: 0.5,
                                }
                              : {
                                  color: "#cbd5e1",
                                }
                        }
                      >
                        {String(m).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ---------------------------------------------------------- */}
              {/* AM / PM                                                    */}
              {/* ---------------------------------------------------------- */}

              <div>
                <div className="mb-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Period
                </div>

                <div className="space-y-1">
                  {["AM", "PM"].map((period) => {
                    const selected = period === meridiem;

                    return (
                      <button
                        key={`period-${period}`}
                        type="button"
                        onClick={() => selectMeridiem(period)}
                        className="w-full rounded-lg py-2 text-center text-sm font-semibold transition-all duration-150"
                        style={
                          selected
                            ? {
                                backgroundColor: ACCENT,
                                color: "#0a0f0d",
                                boxShadow: `0 0 14px -4px ${ACCENT}90`,
                              }
                            : {
                                color: "#cbd5e1",
                              }
                        }
                      >
                        {period}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-3 h-px bg-white/10" />

            {/* Done */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-full rounded-xl py-2.5 text-xs font-bold transition-all duration-200 hover:brightness-110"
              style={{
                backgroundColor: `${ACCENT}18`,
                color: ACCENT,
                border: `1px solid ${ACCENT}30`,
              }}
            >
              Done
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  StepTwoDateTime                                                           */
/* -------------------------------------------------------------------------- */

function StepTwoDateTime({
  selectedDate,
  onSelectDate,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  duration,
}) {
  const bookedSlotsForDate = useMemo(
    () => getBookedSlotsForDate(selectedDate),
    [selectedDate],
  );

  const bookedRanges = useMemo(
    () =>
      bookedSlotsForDate.map((slot) => ({
        startMinutes: timeStringToMinutes(slot.startTime),
        endMinutes: timeStringToMinutes(slot.endTime),
      })),
    [bookedSlotsForDate],
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        When would you like to play?
      </h2>
      <p className="mt-1.5 text-sm text-slate-400">
        Pick a date and your preferred time window — we'll work out the duration
        for you.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[auto,1fr] lg:items-start">
        <div>
          <div className="max-w-lg rounded-2xl border border-white/10 bg-white/[0.02] p-2 sm:p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={onSelectDate}
              disabled={{
                before: new Date(new Date().setHours(0, 0, 0, 0)),
              }}
              modifiers={{ booked: BOOKED_DATE_OBJECTS }}
              modifiersClassNames={{
                booked:
                  "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#B7FF00]",
              }}
              className="w-full max-w-none text-white"
            />
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            Dates with a dot already have bookings
          </p>
        </div>

        <div className="space-y-5">
          {bookedSlotsForDate.length > 0 && (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                Already booked on this date
              </p>
              <div className="mt-2.5 space-y-1.5">
                {bookedSlotsForDate.map((slot, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-300">{slot.teamName}</span>
                    <span className="font-medium text-slate-400">
                      {formatTimeDisplay(slot.startTime)} –{" "}
                      {formatTimeDisplay(slot.endTime)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TimeField
              label="Start Time"
              value={startTime}
              onChange={onStartTimeChange}
              bookedRanges={bookedRanges}
            />
            <TimeField
              label="End Time"
              value={endTime}
              onChange={onEndTimeChange}
              bookedRanges={bookedRanges}
            />
          </div>

          {startTime && endTime && duration?.invalid && (
            <p className="text-xs font-medium text-red-400">
              End time must be after start time.
            </p>
          )}

          {startTime && endTime && duration && !duration.invalid && (
            <div
              className="flex items-center gap-2.5 rounded-xl border px-4 py-3"
              style={{
                borderColor: `${ACCENT}40`,
                backgroundColor: `${ACCENT}12`,
              }}
            >
              <Clock2Icon
                className="h-4 w-4 shrink-0"
                style={{ color: ACCENT }}
              />
              <span className="text-sm text-slate-200">
                Total Duration:{" "}
                <span className="font-semibold text-white">
                  {duration.label}
                </span>
              </span>
            </div>
          )}

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
/*  StepThreeFormat                                                           */
/* -------------------------------------------------------------------------- */

function FormatOptionCard({ format, isSelected, onSelect, index }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(format.id)}
      aria-pressed={isSelected}
      className="group relative flex h-full flex-col rounded-2xl border p-4 text-left backdrop-blur-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:p-5"
      style={{
        borderColor: isSelected ? ACCENT : "rgba(255,255,255,0.1)",
        backgroundColor: isSelected ? `${ACCENT}14` : "rgba(255,255,255,0.03)",
        boxShadow: isSelected
          ? `0 0 0 1px ${ACCENT}55, 0 0 24px -6px ${ACCENT}70`
          : "none",
      }}
    >
      {isSelected && (
        <span
          className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full"
          style={{ backgroundColor: ACCENT }}
        >
          <Check className="h-3 w-3 text-slate-950" />
        </span>
      )}

      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300"
        style={{
          borderColor: isSelected ? `${ACCENT}90` : "rgba(255,255,255,0.12)",
          backgroundColor: isSelected
            ? `${ACCENT}22`
            : "rgba(255,255,255,0.05)",
        }}
      >
        <Timer className="h-4 w-4" style={{ color: ACCENT }} />
      </span>

      <h3 className="mt-3 text-base font-bold text-white">{format.label}</h3>
      <p className="mt-1 text-xs font-medium text-slate-400">
        Recommended duration: {formatDurationLabel(format.duration)}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-slate-300/90">
        {format.description}
      </p>
    </button>
  );
}

function StepThreeFormat({ matchFormat, onSelect }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-white sm:text-2xl">
        Choose Match Format
      </h2>
      <p className="mt-1.5 text-sm text-slate-400">
        Select the format you want to play.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {MATCH_FORMATS.map((format, i) => (
          <FormatOptionCard
            key={format.id}
            format={format}
            index={i}
            isSelected={matchFormat === format.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  StepFiveTeamDetails                                                       */
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

function StepFiveTeamDetails({
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
          : "Add your team's details. Player names aren't required yet."}
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
/*  StepSummary                                                               */
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

function StepSummary({
  bookingType,
  selectedDate,
  matchFormat,
  startTime,
  endTime,
  duration,
  teamA,
  teamB,
  openMatch,
}) {
  const formatLabel = FORMAT_CONFIG[matchFormat]?.label ?? "—";
  const bookingStatus =
    bookingType === "open_match"
      ? "Awaiting Slot Confirmation"
      : "Awaiting Confirmation";

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
        <SummaryRow label="Format" value={formatLabel} />
        <SummaryRow
          label="Start Time"
          value={formatTimeDisplay(startTime) ?? "—"}
        />
        <SummaryRow label="Duration" value={duration?.label ?? "—"} />
        <SummaryRow
          label="End Time"
          value={formatTimeDisplay(endTime) ?? "—"}
        />
        <SummaryRow label="Venue" value={VENUE_NAME} />
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
        <Lock className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
        <span className="text-sm text-slate-200">
          Booking Status:{" "}
          <span className="font-semibold text-white">{bookingStatus}</span>
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CricketBookingModal                                                       */
/* -------------------------------------------------------------------------- */

export default function CricketBookingModal({ open, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingType, setBookingType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [matchFormat, setMatchFormat] = useState(null);
  const [teamA, setTeamA] = useState(emptyTeam());
  const [teamB, setTeamB] = useState(emptyTeam());
  const [openMatch, setOpenMatch] = useState(emptyOpenMatch());
  const [stepError, setStepError] = useState(null);

  const duration = useMemo(
    () => getDuration(startTime, endTime),
    [startTime, endTime],
  );

  // Reset the whole flow every time the modal is (re)opened.
  useEffect(() => {
    if (open) {
      setCurrentStep(1);
      setBookingType(null);
      setSelectedDate(undefined);
      setStartTime("");
      setEndTime("");
      setMatchFormat(null);
      setTeamA(emptyTeam());
      setTeamB(emptyTeam());
      setOpenMatch(emptyOpenMatch());
      setStepError(null);
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
    if (step === 1) return !!bookingType;

    // Step 2 = Match Format
    if (step === 2) return !!matchFormat;

    // Step 3 = Date & Time
    if (step === 3) {
      return (
        !!selectedDate &&
        !!startTime &&
        !!endTime &&
        !!duration &&
        !duration.invalid
      );
    }

    // Step 4 = Team Details
    if (step === 4) {
      if (bookingType === "single_team") return isTeamValid(teamA);
      if (bookingType === "two_teams")
        return isTeamValid(teamA) && isTeamValid(teamB);
      if (bookingType === "open_match") return isOpenMatchValid(openMatch);
      return true;
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
      // Final step — confirm & close. Swap this for a real submit handler later.
      // bookingStatus for this booking is derived from bookingType (see StepSummary).
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
                  <StepThreeFormat
                    matchFormat={matchFormat}
                    onSelect={setMatchFormat}
                  />
                )}

                {currentStep === 3 && (
                  <StepTwoDateTime
                    selectedDate={selectedDate}
                    onSelectDate={setSelectedDate}
                    startTime={startTime}
                    endTime={endTime}
                    onStartTimeChange={setStartTime}
                    onEndTimeChange={setEndTime}
                    duration={duration}
                  />
                )}

                {currentStep === 4 && (
                  <StepFiveTeamDetails
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
                  <StepSummary
                    bookingType={bookingType}
                    selectedDate={selectedDate}
                    matchFormat={matchFormat}
                    startTime={startTime}
                    endTime={endTime}
                    duration={duration}
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
