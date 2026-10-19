
"use client";

import Link from "next/link";
import {
  Search,
  CalendarDays,
  CheckCircle2,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    title: "Find the Right Service",
    description:
      "Browse available home services and choose the one that matches your needs.",
    icon: Search,
    label: "Explore",
  },
  {
    title: "Arrange Your Booking",
    description:
      "Review the service details and follow the available booking options.",
    icon: CalendarDays,
    label: "Get started",
  },
  {
    title: "Enjoy Easier Home Care",
    description:
      "Take the next step toward a more comfortable and well-maintained home.",
    icon: CheckCircle2,
    label: "You're ready",
  },
];

export default function HowItWorks() {
  return (
    <section className="overflow-hidden bg-slate-100 py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left content */}
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              How It Works
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Home Care,
              <span className="block text-emerald-600 dark:text-emerald-400">
                Without the Hassle.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-400">
              Taking care of your home should dont feel complicated. FixItNow
              helps you explore home services and find a convenient way to get
              started.
            </p>

            <Link
              href="/services"
              className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              Explore Our Services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <div className="mt-8 hidden items-center gap-3 border-t border-slate-200 pt-6 sm:flex dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                <span className="block font-semibold text-slate-900 dark:text-white">
                  A simpler way to get started
                </span>
                Explore your options in one place.
              </p>
            </div>
          </div>

          {/* Right-side steps */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className={`group relative flex gap-5 p-6 transition-colors duration-300 hover:bg-emerald-50/70 sm:gap-6 sm:p-8 dark:hover:bg-emerald-950/20 ${
                      index !== steps.length - 1
                        ? "border-b border-slate-100 dark:border-slate-800"
                        : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white sm:h-14 sm:w-14 dark:bg-slate-900 dark:text-slate-300 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                      <Icon className="h-6 w-6" strokeWidth={1.8} />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                        {step.label}
                      </span>

                      <h3 className="mt-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-700 sm:text-xl dark:text-white dark:group-hover:text-emerald-400">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="hidden h-9 w-9 shrink-0 items-center justify-center self-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-emerald-500 group-hover:bg-emerald-600 group-hover:text-white sm:flex dark:border-slate-700">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                );
              })}
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
}
