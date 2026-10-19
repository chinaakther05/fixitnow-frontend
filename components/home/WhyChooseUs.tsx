
"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
  CircleDollarSign,
  Headset,
  CalendarCheck,
  ArrowUpRight,
  ArrowRight,
  Check,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Professionals You Can Trust",
    description:
      "Find home service professionals focused on dependable work, clear communication, and your peace of mind.",
  },
  {
    icon: Clock3,
    number: "02",
    title: "Service on Your Schedule",
    description:
      "Choose a convenient time for your home service and make everyday repairs easier to manage.",
  },
  {
    icon: CircleDollarSign,
    number: "03",
    title: "Transparent Pricing",
    description:
      "Understand the expected service cost before moving forward. No confusing pricing language.",
  },
  {
    icon: BadgeCheck,
    number: "04",
    title: "Quality Comes First",
    description:
      "Discover services designed around attention to detail and a better home care experience.",
  },
  {
    icon: Headset,
    number: "05",
    title: "Support When You Need It",
    description:
      "Get help with service information and booking questions throughout your experience.",
  },
  {
    icon: CalendarCheck,
    number: "06",
    title: "Easy Booking Experience",
    description:
      "Browse available services, find what suits your needs, and take the next step with ease.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24 dark:bg-slate-950">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-24 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl dark:bg-emerald-900/10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-0 h-72 w-72 rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/10"
      />

      {/* Same outer alignment as Navbar */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 shadow-sm dark:border-emerald-900 dark:bg-slate-900 dark:text-emerald-400 sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            The FixItNow Difference
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            Better Care for Your Home,
            <span className="mt-1 block text-emerald-600 dark:text-emerald-400">
              Every Step of the Way.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-400">
            Home maintenance should feel simple, not stressful. Explore a
            convenient way to find services for your everyday home needs.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:shadow-black/20"
              >
                {/* Top row */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white dark:bg-emerald-950/60 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-bold tabular-nums text-slate-300 dark:text-slate-700">
                    {feature.number}
                  </span>
                </div>

                {/* Card content */}
                <h3 className="mt-6 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-700 sm:text-xl dark:text-white dark:group-hover:text-emerald-400">
                  {feature.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                {/* Decorative bottom accent */}
                <div className="mt-6 flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-14" />
                  <span className="h-1 w-2 rounded-full bg-emerald-200 dark:bg-emerald-900" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Premium CTA */}
        <div className="relative mt-12 overflow-hidden rounded-3xl bg-slate-900 sm:mt-16 dark:bg-slate-900">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[40px] border-emerald-500/10"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-8 p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:p-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <Check className="h-4 w-4" />
                Your home deserves better care
              </div>

              <h3 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                What Does Your Home Need Today?
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                From plumbing and electrical work to cleaning and repairs,
                explore services that make home care easier.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:px-7"
            >
              Explore Our Services
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        
      </div>
    </section>
  );
}
