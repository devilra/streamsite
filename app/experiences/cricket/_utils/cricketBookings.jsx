"use client";

/* ============================================================================
   CRICKET BOOKINGS — localStorage data layer
   ----------------------------------------------------------------------------
   Temporary storage for Stream Side Cricket bookings. Every booking created
   through CricketBookingModal is written here as a flat array under ONE key.

   Shape of a stored booking (kept API-response-shaped on purpose, so this
   can be swapped for a real backend later without touching the UI):

     {
       id: "CRK-20260820-A1B2C",
       bookingType: "single_team" | "two_teams" | "open_match",
       status: "registered_team" | "confirmed_match" | "open_match",
       date: "2026-08-20",          // YYYY-MM-DD
       format: "10 Overs",
       teamA: { name, captainName, captainPhone, playerCount, substitutes } | null,
       teamB: { ... } | null,
       openMatch: { ... } | null,
       createdAt: "2026-08-17T10:30:00.000Z"
     }

   Other components (Calendar inside the modal, Upcoming Matches on
   CricketHero, MyTeamCarousel, future Recent Matches, etc.) should all read
   through getCricketBookings() and listen for CRICKET_BOOKING_UPDATED_EVENT
   so they stay in sync without a page refresh.
   ============================================================================ */

export const CRICKET_BOOKINGS_STORAGE_KEY = "streamside_cricket_bookings";

/** Dispatched on window right after a booking is saved. Listen for this to
 *  refresh any component reading cricket bookings within the same tab. */
export const CRICKET_BOOKING_UPDATED_EVENT =
  "streamside-cricket-booking-updated";

/**
 * Safely reads all cricket bookings from localStorage.
 * Never throws — returns [] for SSR, missing data, or corrupt JSON.
 */
export function getCricketBookings() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(CRICKET_BOOKINGS_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Generates a collision-safe booking ID, e.g. "CRK-20260820-A1B2C".
 * Not sequential/array-index based.
 */
export function generateBookingId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `CRK-${y}${m}${d}-${random}`;
}

/**
 * Persists ONE completed booking to localStorage, appending to the existing
 * list, then dispatches CRICKET_BOOKING_UPDATED_EVENT so other mounted
 * components (Calendar, Upcoming Matches, MyTeamCarousel, ...) can refresh
 * immediately.
 *
 * Returns the saved booking object (with id/createdAt filled in), or null if
 * saving failed (e.g. localStorage unavailable/blocked).
 */
export function saveCricketBooking(booking) {
  if (typeof window === "undefined") return null;

  try {
    const existing = getCricketBookings();

    const newBooking = {
      id: booking.id || generateBookingId(),
      createdAt: booking.createdAt || new Date().toISOString(),
      ...booking,
    };

    const updated = [...existing, newBooking];

    window.localStorage.setItem(
      CRICKET_BOOKINGS_STORAGE_KEY,
      JSON.stringify(updated),
    );

    window.dispatchEvent(new CustomEvent(CRICKET_BOOKING_UPDATED_EVENT));

    return newBooking;
  } catch {
    return null;
  }
}

/**
 * Converts an EXISTING "single_team" booking into a confirmed "two_teams"
 * match, IN PLACE (same id, same date, same createdAt) — used when someone
 * clicks "Challenge" on a My Team card and submits the opponent's details.
 *
 *   • bookingType: "single_team" -> "two_teams"
 *   • status:      "registered_team" -> "confirmed_match"
 *   • teamB is attached from the opponent's form data
 *
 * Re-saves the full bookings list and dispatches
 * CRICKET_BOOKING_UPDATED_EVENT, exactly like saveCricketBooking(), so
 * CricketHero's Upcoming Matches row and MyTeamCarousel both refresh
 * immediately — the booking disappears from MyTeamCarousel (no longer
 * single_team) and appears in Upcoming Matches (now two_teams).
 *
 * Returns the updated booking object, or null if:
 *   - localStorage is unavailable,
 *   - no booking with that id exists, or
 *   - the booking isn't a single_team registration (e.g. already matched).
 */
export function challengeCricketBooking(bookingId, opponentTeam) {
  if (typeof window === "undefined") return null;

  try {
    const existing = getCricketBookings();
    const index = existing.findIndex((b) => b.id === bookingId);
    if (index === -1) return null;

    const target = existing[index];
    if (target.bookingType !== "single_team") return null;

    const updatedBooking = {
      ...target,
      bookingType: "two_teams",
      status: "confirmed_match",
      teamB: {
        name: opponentTeam?.name || "",
        captainName: opponentTeam?.captainName || "",
        captainPhone: opponentTeam?.captainPhone || "",
        playerCount: opponentTeam?.playerCount || "",
        substitutes: opponentTeam?.substitutes || "",
      },
    };

    const updated = [...existing];
    updated[index] = updatedBooking;

    window.localStorage.setItem(
      CRICKET_BOOKINGS_STORAGE_KEY,
      JSON.stringify(updated),
    );

    window.dispatchEvent(new CustomEvent(CRICKET_BOOKING_UPDATED_EVENT));

    return updatedBooking;
  } catch {
    return null;
  }
}

/**
 * Convenience hook-free subscriber: call `unsubscribe = subscribeToCricketBookings(cb)`
 * to be notified whenever bookings change in this tab (custom event) or
 * another tab (native "storage" event). Always call the returned cleanup
 * function on unmount.
 */
export function subscribeToCricketBookings(callback) {
  if (typeof window === "undefined") return () => {};

  function handleUpdate() {
    callback(getCricketBookings());
  }

  window.addEventListener(CRICKET_BOOKING_UPDATED_EVENT, handleUpdate);
  window.addEventListener("storage", handleUpdate);

  return () => {
    window.removeEventListener(CRICKET_BOOKING_UPDATED_EVENT, handleUpdate);
    window.removeEventListener("storage", handleUpdate);
  };
}

/** "YYYY-MM-DD" -> local Date object at midnight. */
export function bookingDateKeyToDate(key) {
  if (!key) return null;
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Date object -> "YYYY-MM-DD" (local, not UTC — avoids timezone off-by-one). */
export function dateToBookingDateKey(date) {
  if (!date) return null;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/* -------------------------------------------------------------------------- */
/*  Date-lookup helpers                                                       */
/*  Added so the booking modal's Step 2 calendar can check REAL saved         */
/*  bookings (instead of a hardcoded dummy array) to grey out/disable dates   */
/*  that already have a confirmed match, and show what's already registered  */
/*  on a given day.                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Returns every saved booking that falls on the given date.
 * Accepts either a Date object or an already-formatted "YYYY-MM-DD" key.
 */
export function getCricketBookingsForDate(dateOrKey) {
  const key =
    dateOrKey instanceof Date ? dateToBookingDateKey(dateOrKey) : dateOrKey;

  if (!key) return [];

  return getCricketBookings().filter((b) => b.date === key);
}

/**
 * true if the given date already has a CONFIRMED match saved
 * (bookingType === "two_teams" / status === "confirmed_match").
 * Used to disable that date in the calendar so it can't be double-booked.
 */
export function isCricketDateConfirmed(dateOrKey) {
  return getCricketBookingsForDate(dateOrKey).some(
    (b) => b.status === "confirmed_match" || b.bookingType === "two_teams",
  );
}

/**
 * true if the given date has at least one single-team registration
 * (status === "registered_team") and is NOT already confirmed.
 * Used to draw the "outline dot" (opponent still open) in the calendar.
 */
export function isCricketDateRegisteredOnly(dateOrKey) {
  const bookings = getCricketBookingsForDate(dateOrKey);
  if (bookings.length === 0) return false;
  const hasConfirmed = bookings.some(
    (b) => b.status === "confirmed_match" || b.bookingType === "two_teams",
  );
  if (hasConfirmed) return false;
  return bookings.some((b) => b.status === "registered_team");
}

/**
 * All saved booking dates as Date objects, split into "confirmed" and
 * "registered only" buckets — ready to feed straight into the Calendar's
 * `modifiers` prop (confirmed: [...], registered: [...]).
 */
export function getCricketCalendarModifierDates() {
  const bookings = getCricketBookings();

  const confirmedKeys = new Set();
  const registeredKeys = new Set();

  for (const b of bookings) {
    if (!b.date) continue;
    const isConfirmed =
      b.status === "confirmed_match" || b.bookingType === "two_teams";
    if (isConfirmed) {
      confirmedKeys.add(b.date);
    } else if (b.status === "registered_team") {
      registeredKeys.add(b.date);
    }
  }

  // A date can only show one dot — confirmed takes visual priority, so drop
  // it from the registered-only bucket if it's also confirmed elsewhere.
  for (const key of confirmedKeys) {
    registeredKeys.delete(key);
  }

  return {
    confirmed: Array.from(confirmedKeys).map(bookingDateKeyToDate),
    registered: Array.from(registeredKeys).map(bookingDateKeyToDate),
  };
}
