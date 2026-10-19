
"use client";

import Link from "next/link";
import {
  Wrench,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 shadow-xl shadow-emerald-950/10 dark:border-emerald-800/60 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-950">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 left-1/3 -z-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl"
          />

          <div className="grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14 xl:p-16">
            {/* Content */}
            <div className="text-center lg:col-span-8 lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-emerald-50 backdrop-blur-sm sm:text-sm">
                <Sparkles className="h-4 w-4 text-emerald-200" />
                Make Home Care Simple
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl xl:text-[3.4rem]">
                Your Home Needs Care.
                <span className="mt-2 block text-emerald-200">
                  We Make It Easier.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-emerald-50/85 sm:text-base sm:leading-8 lg:mx-0 lg:text-lg">
                From plumbing and electrical repairs to cleaning and AC
                servicing, explore home services that fit your needs.
                Getting started is just a few clicks away.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-emerald-50/90 lg:justify-start">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  Easy service discovery
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                  Convenient booking
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 sm:mx-auto sm:w-full sm:max-w-sm lg:col-span-4 lg:mx-0 lg:max-w-none">
              <Link
                href="/services"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-emerald-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800 sm:text-base"
              >
                <Wrench className="h-5 w-5 text-emerald-700 transition-transform duration-200 group-hover:rotate-12" />
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:text-base"
              >
                <ShieldCheck className="h-5 w-5 text-emerald-200" />
                Discover FixItNow
              </Link>

              <p className="text-center text-xs leading-5 text-emerald-100/70">
                Find the right service for your home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
