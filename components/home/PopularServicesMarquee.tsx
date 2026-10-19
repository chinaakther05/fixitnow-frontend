
"use client";

import {
  Wrench,
  Zap,
  Sparkles,
  Snowflake,
  PaintRoller,
  Hammer,
  Bug,
  Truck,
} from "lucide-react";

const services = [
  { name: "Plumbing", icon: Wrench },
  { name: "Electrical", icon: Zap },
  { name: "Home Cleaning", icon: Sparkles },
  { name: "AC Repair", icon: Snowflake },
  { name: "Painting", icon: PaintRoller },
  { name: "Home Repair", icon: Hammer },
  { name: "Pest Control", icon: Bug },
  { name: "Moving Service", icon: Truck },
];

export default function PopularServicesMarquee() {
  const repeatedServices = [...services, ...services];

  return (
    <section
      aria-labelledby="popular-services-heading"
      className="w-full overflow-hidden border-y border-slate-200 bg-slate-50 py-8 sm:py-10 dark:border-slate-800 dark:bg-slate-900/50"
    >
      {/* Same container alignment as Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400 sm:text-sm sm:tracking-[0.2em]">
            Explore Our Services
          </p>

          <h2
            id="popular-services-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
          >
            Everything Your Home Needs
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Find the right professionals for your everyday home needs.
          </p>
        </div>

        {/* Marquee: stays inside the Navbar container */}
        <div className="group relative w-full overflow-hidden">
          <div className="flex w-max animate-services-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {repeatedServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={`${service.name}-${index}`}
                  aria-hidden={index >= services.length}
                  className="mx-2 flex min-w-[155px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-md sm:mx-3 sm:min-w-[175px] sm:px-5 sm:py-4 dark:border-slate-700 dark:bg-slate-950"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 sm:h-11 sm:w-11">
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="whitespace-nowrap text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes services-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        :global(.animate-services-marquee) {
          animation: services-marquee 35s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.animate-services-marquee) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
