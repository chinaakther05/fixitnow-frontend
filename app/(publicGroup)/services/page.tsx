
"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { Technician } from "@/types/technician";
import {
  Search,
  Star,
  Wrench,
  RotateCcw,
  SlidersHorizontal,
  Users,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [minRating, setMinRating] = useState("0");

  const {
    data: technicians,
    isLoading: loadingTech,
    isError: errorTech,
    refetch,
  } = useQuery<Technician[]>({
    queryKey: ["technicians"],
    queryFn: async () => {
      const res = await api.get("/technicians");
      return res.data.data;
    },
  });

  const query = searchTerm.trim().toLowerCase();

  // Search and rating filtering
  const filteredTechnicians = useMemo(() => {
    return (technicians ?? []).filter((tech) => {
      const searchMatch =
        !query ||
        tech.user?.name?.toLowerCase().includes(query) ||
        tech.skills?.some((skill) =>
          skill.toLowerCase().includes(query)
        ) ||
        tech.services?.some((service) =>
          service.title?.toLowerCase().includes(query)
        );

      const ratingMatch =
        (tech.avgRating ?? 0) >= Number(minRating);

      return searchMatch && ratingMatch;
    });
  }, [technicians, query, minRating]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setMinRating("0");
  };

  if (loadingTech) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="mb-7 h-36 rounded-2xl bg-slate-200 dark:bg-slate-800" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
            <div className="h-80 rounded-2xl bg-white dark:bg-slate-900" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-80 rounded-2xl bg-white dark:bg-slate-900"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (errorTech) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-500" />

          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Unable to load technicians
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Please check your connection and try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        {/* Page Header */}
        <header className="relative mb-7 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-white via-emerald-50/70 to-teal-50/60 px-5 py-6 dark:border-emerald-900/40 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/30 sm:px-7">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-emerald-200/30 blur-3xl dark:bg-emerald-500/10" />

          <div className="relative">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              FIND YOUR PROFESSIONAL
            </p>

            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Browse Services
              <span className="text-emerald-600 dark:text-emerald-400">
                .
              </span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Find skilled technicians for your home repair and maintenance needs.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-7">
          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 md:sticky md:top-24">
            {/* Sidebar Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/60">
                  <SlidersHorizontal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>

                <h2 className="font-bold">Filters</h2>
              </div>

              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="mb-5">
              <label
                htmlFor="technician-search"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                Search Technicians
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="technician-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Name, skill or service..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div className="mb-5 h-px bg-slate-100 dark:bg-slate-800" />

            {/* All Categories */}
            <div className="mb-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Categories
              </h3>

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                  setMinRating("0");
                }}
                aria-pressed={selectedCategory === "All"}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                  selectedCategory === "All"
                    ? "bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                <span>All Categories</span>

                {selectedCategory === "All" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                )}
              </button>
            </div>

            <div className="mb-5 h-px bg-slate-100 dark:bg-slate-800" />

            {/* Rating Filter */}
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Minimum Rating
              </h3>

              <div className="space-y-1">
                {[
                  { label: "All Ratings", value: "0" },
                  { label: "4+ Stars", value: "4" },
                  { label: "3+ Stars", value: "3" },
                  { label: "2+ Stars", value: "2" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMinRating(option.value)}
                    aria-pressed={minRating === option.value}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                      minRating === option.value
                        ? "bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {option.value !== "0" && (
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      )}
                      {option.label}
                    </span>

                    {minRating === option.value && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Technician Count */}
            <div className="mt-5 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/40">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Users className="h-4 w-4" />
                <span className="text-sm font-bold">
                  {filteredTechnicians.length} Professionals
                </span>
              </div>

              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                Find the right technician for your needs.
              </p>
            </div>
          </aside>

          {/* Technician Cards */}
          <section className="min-w-0">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  EXPLORE PROFESSIONALS
                </p>

                <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                  Available Technicians
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Choose a professional for your needs.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900">
                <Users className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />

                <span className="font-bold">
                  {filteredTechnicians.length}
                </span>

                <span className="text-slate-500 dark:text-slate-400">
                  found
                </span>
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm.trim() || minRating !== "0") && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Active filters:
                </span>

                {searchTerm.trim() && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="max-w-full truncate rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  >
                    Search: {searchTerm.trim()} ×
                  </button>
                )}

                {minRating !== "0" && (
                  <button
                    onClick={() => setMinRating("0")}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300"
                  >
                    {minRating}+ Stars ×
                  </button>
                )}
              </div>
            )}

            {/* Empty State */}
            {!filteredTechnicians.length ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                <Search className="mx-auto mb-4 h-9 w-9 text-slate-400" />

                <h3 className="font-bold">No technicians found</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Try another name, skill or rating.
                </p>

                <button
                  onClick={resetFilters}
                  className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {filteredTechnicians.map((tech) => {
                  const description =
                    tech.bio ||
                    tech.user?.description ||
                    "Professional services for your home repair and maintenance needs.";

                  return (
                    <article
                      key={tech.id}
                      className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800"
                    >
                      <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300" />

                      {/* Profile Image */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                        {tech.user?.profileImage?.trim() ? (
                          <Image
                            src={tech.user.profileImage.trim()}
                            alt={tech.user?.name || "Technician"}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                            {tech.user?.name?.charAt(0)?.toUpperCase() || "T"}
                          </div>
                        )}

                        {/* Rating */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-slate-900 shadow">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          {tech.avgRating ?? 0}

                          <span className="font-normal text-slate-500">
                            ({tech.totalReviews ?? 0})
                          </span>
                        </div>
                      </div>

                      {/* Technician Details */}
                      <div className="flex flex-1 flex-col p-3">
                        <h3 className="truncate text-sm font-bold text-slate-900 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                          {tech.user?.name || "Technician"}
                        </h3>

                        <div className="my-2 h-px bg-slate-100 dark:bg-slate-800" />

                        <div className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400">
                          <Wrench className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          Specialization
                        </div>

                        <div className="mb-2 flex min-h-6 flex-wrap gap-1">
                          {tech.skills?.length ? (
                            tech.skills.slice(0, 2).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              >
                                {skill}
                              </span>
                            ))
                          ) : (
                            <span className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                              General Services
                            </span>
                          )}
                        </div>

                        <p className="mb-3 text-xs leading-5 text-slate-600 dark:text-slate-400">
                          {description.slice(0, 70)}
                          {description.length > 70 ? "..." : ""}
                        </p>

                        {/* Hourly Rate */}
                        <div className="mb-2 mt-auto flex items-center justify-between gap-1 rounded-lg bg-slate-50 px-2.5 py-2 dark:bg-slate-800/70">
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            Hourly Rate
                          </span>

                          <p className="shrink-0 text-right">
                            <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                              ৳{tech.hourlyRate ?? 0}
                            </span>

                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              /hr
                            </span>
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/technicians/${tech.id}`}
                            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-slate-200 px-1.5 py-2 text-center text-[11px] font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/50"
                          >
                            View Profile
                          </Link>

                          <Link
                            href={`/booking/${tech.id}`}
                            className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg bg-emerald-600 px-1.5 py-2 text-center text-[11px] font-semibold text-white transition hover:bg-emerald-700"
                          >
                            Book Now
                            <ArrowRight className="h-3 w-3 shrink-0" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
