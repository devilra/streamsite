"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarRange, ArrowRight, LayoutGrid } from "lucide-react";
import {
  ALL_CATEGORIES_FILTER,
  EVENT_CATEGORIES,
  RECOMMENDED_FOR_YOU,
} from "../_data/Eventcategories.data";

/* -------------------------------------------------------------------------- */
/*  CategoryFilterBar                                                         */
/* -------------------------------------------------------------------------- */

function CategoryFilterBar({ categories, selectedId, onSelect }) {
  const filters = [ALL_CATEGORIES_FILTER, ...categories];

  return (
    <div
      role="tablist"
      aria-label="Filter events by category"
      className="
        -mx-4 mb-10 flex snap-x snap-mandatory gap-2.5 overflow-x-auto
        scroll-smooth px-4 pb-2
        [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        md:mx-0 md:flex-wrap md:px-0 md:pb-0
      "
    >
      {filters.map((category) => {
        const isSelected = category.id === selectedId;
        const Icon = category.icon ?? LayoutGrid;

        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(category.id)}
            className={`
              group flex shrink-0 snap-start items-center gap-2 rounded-full
              border px-4 py-2.5 text-sm font-medium
              transition-all duration-300 ease-out
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-lime-400 focus-visible:ring-offset-2
              focus-visible:ring-offset-[#0a0f0d]
              ${
                isSelected
                  ? "border-lime-400/70 bg-lime-400/10 text-white shadow-[0_0_18px_-4px_rgba(163,230,53,0.55)]"
                  : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-lime-400/30 hover:text-white"
              }
            `}
          >
            <Icon
              size={15}
              className={`transition-colors duration-300 ${
                isSelected
                  ? "text-lime-400"
                  : "text-gray-400 group-hover:text-lime-400"
              }`}
              aria-hidden="true"
            />
            {category.title}
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  CategoryCard                                                              */
/* -------------------------------------------------------------------------- */

function CategoryCard({ category, isSelected, onSelect, index }) {
  const Icon = category.icon;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      className="w-[78vw] shrink-0 snap-start sm:w-[60vw] md:w-auto md:shrink"
    >
      <button
        type="button"
        onClick={() => onSelect(category.id)}
        aria-pressed={isSelected}
        aria-label={`Explore ${category.title} events — ${category.upcomingCount} upcoming`}
        className={`
          group relative flex h-full w-full flex-col overflow-hidden rounded-2xl
          border text-left
          transition-all duration-300 ease-out
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-lime-400 focus-visible:ring-offset-2
          focus-visible:ring-offset-[#0a0f0d]
          ${
            isSelected
              ? "border-lime-400/60 shadow-[0_0_28px_-6px_rgba(163,230,53,0.45)]"
              : "border-white/10 hover:border-lime-400/40 hover:shadow-[0_0_24px_-8px_rgba(163,230,53,0.35)]"
          }
        `}
      >
        {category.featured && (
          <span
            className="
              absolute left-4 top-4 z-20 rounded-full border border-lime-400/50
              bg-[#0a0f0d]/80 px-2.5 py-1 text-[10px] font-semibold
              uppercase tracking-wider text-lime-300 backdrop-blur-sm
            "
          >
            Most Popular
          </span>
        )}

        {/* Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5 sm:aspect-[3/4]">
          <Image
            src={category.image}
            alt={`${category.title} event category`}
            fill
            sizes="(max-width: 768px) 78vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
          <div
            className="
              absolute inset-0 bg-gradient-to-t
              from-[#05080a] via-[#05080a]/55 to-transparent
              transition-opacity duration-300 group-hover:opacity-90
            "
          />

          {/* Icon badge */}
          <div
            className="
              absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center
              rounded-full border border-white/15 bg-black/40 backdrop-blur-sm
              transition-all duration-300
              group-hover:border-lime-400/60 group-hover:shadow-[0_0_14px_-2px_rgba(163,230,53,0.7)]
            "
          >
            <Icon
              size={16}
              className="text-white transition-colors duration-300 group-hover:text-lime-300"
              aria-hidden="true"
            />
          </div>

          {/* Glass content panel, anchored to the bottom of the image */}
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-white/[0.03] p-4 backdrop-blur-md sm:p-5">
            <h3 className="text-base font-semibold text-white sm:text-lg">
              {category.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-300/80 transition-colors duration-300 group-hover:text-gray-200 sm:text-sm">
              {category.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-gray-400">
                <CalendarRange
                  size={13}
                  className="text-lime-400"
                  aria-hidden="true"
                />
                {category.upcomingCount} Upcoming
              </span>

              <span className="flex items-center gap-1 text-xs font-medium text-lime-300">
                Explore
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

/* -------------------------------------------------------------------------- */
/*  RecommendedCategories                                                     */
/* -------------------------------------------------------------------------- */

function RecommendedCategories({ categories, onSelect }) {
  if (categories.length === 0) return null;

  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">
        Recommended For You
      </p>
      <p className="mt-1 text-sm text-gray-400">{RECOMMENDED_FOR_YOU.reason}</p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(category.id)}
              className="
                group flex items-center gap-2 rounded-full border border-white/10
                bg-white/[0.03] py-2 pl-3 pr-3.5 text-sm text-gray-200
                transition-all duration-300
                hover:border-lime-400/40 hover:text-white
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-lime-400 focus-visible:ring-offset-2
                focus-visible:ring-offset-[#0a0f0d]
              "
            >
              <Icon
                size={14}
                className="text-lime-400 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
              {category.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  EventCategories                                                           */
/* -------------------------------------------------------------------------- */

export default function EventCategories({ onCategoryChange }) {
  const [selectedId, setSelectedId] = useState("all");

  const totalEventTypes = EVENT_CATEGORIES.length;

  const visibleCategories = useMemo(() => {
    if (selectedId === "all") return EVENT_CATEGORIES;
    return EVENT_CATEGORIES.filter((c) => c.id === selectedId);
  }, [selectedId]);

  const recommendedCategories = useMemo(
    () =>
      RECOMMENDED_FOR_YOU.categoryIds
        .map((id) => EVENT_CATEGORIES.find((c) => c.id === id))
        .filter(Boolean),
    [],
  );

  function handleSelect(id) {
    setSelectedId(id);
    onCategoryChange?.(id === "all" ? null : id);
  }

  return (
    <section
      aria-labelledby="event-categories-heading"
      className="w-full px-4 py-16 sm:px-6 md:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-lime-400">
              <CalendarRange size={13} aria-hidden="true" />
              Explore Events
            </span>

            <h2
              id="event-categories-heading"
              className="text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl"
            >
              Find Your Next{" "}
              <span className="text-lime-400 [text-shadow:0_0_22px_rgba(163,230,53,0.35)]">
                Experience
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-400 sm:text-base">
              From stargazing nights to outdoor adventures, sports, photography
              and community gatherings — discover experiences that bring people
              together.
            </p>
          </div>

          <div className="shrink-0 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3.5 text-left md:text-right">
            <p className="text-2xl font-semibold text-white">
              {totalEventTypes}+{" "}
              <span className="text-lime-400">Event Types</span>
            </p>
            <p className="text-xs text-gray-500">Across Stream Side venues</p>
          </div>
        </div>

        {/* Filter */}
        <CategoryFilterBar
          categories={EVENT_CATEGORIES}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        {/* Cards */}
        <ul
          className="
            -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-5
            md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {visibleCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              isSelected={category.id === selectedId}
              onSelect={handleSelect}
            />
          ))}
        </ul>

        {/* Recommended */}
        {selectedId === "all" && (
          <RecommendedCategories
            categories={recommendedCategories}
            onSelect={handleSelect}
          />
        )}
      </div>
    </section>
  );
}
