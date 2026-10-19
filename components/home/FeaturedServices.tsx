
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ArrowRight,
  ShieldCheck,
  Clock,
  CalendarCheck,
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  price: number;
  duration: string;
  badge?: string;
}

const featuredServicesData: Service[] = [
  {
    id: "1",
    title: "Complete Home Plumbing Repair & Fitting",
    category: "Plumbing",
    image:
      "https://i.ibb.co/tTH7ByCw/What-to-Look-For-in-a-Professional-Plumber-residential-plumbing-services-Ehret-Plumbing.jpg",
    rating: 4.9,
    reviewsCount: 128,
    price: 49,
    duration: "1–2 Hours",
    badge: "Popular",
  },
  {
    id: "2",
    title: "Full House AC Cleaning & Servicing",
    category: "AC Repair",
    image: "https://i.ibb.co/vx5Qv3QP/image.jpg",
    rating: 4.8,
    reviewsCount: 95,
    price: 65,
    duration: "2 Hours",
    badge: "Top Rated",
  },
  {
    id: "3",
    title: "Deep Kitchen & Bathroom Sanitization",
    category: "Cleaning",
    image: "https://i.ibb.co/Kx85t8FC/ima.jpg",
    rating: 4.9,
    reviewsCount: 210,
    price: 80,
    duration: "3–4 Hours",
    badge: "Best Value",
  },
];

export default function FeaturedServices() {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-950/50 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              Quality Home Services
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Featured Services
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              Discover reliable home services designed to make your everyday
              life easier and more comfortable.
            </p>
          </div>

          <Link
            href="/services"
            className="group inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:border-emerald-600 hover:bg-emerald-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-emerald-400 dark:hover:border-emerald-600 dark:hover:bg-emerald-600 dark:hover:text-white"
          >
            Explore All Services
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {featuredServicesData.map((service) => (
            <article
              key={service.id}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:shadow-black/20"
            >
              {/* Image */}
              <div className="relative h-52 shrink-0 overflow-hidden bg-slate-100 sm:h-56 dark:bg-slate-800">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/10" />

                {service.badge && (
                  <span className="absolute left-4 top-4 rounded-lg border border-white/20 bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                    {service.badge}
                  </span>
                )}

                <span className="absolute bottom-4 left-4 rounded-lg border border-white/20 bg-slate-950/75 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                  {service.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div
                    className="inline-flex items-center gap-1.5 text-sm"
                    aria-label={`Rating ${service.rating} out of 5, ${service.reviewsCount} reviews`}
                  >
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-900 dark:text-white">
                      {service.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      ({service.reviewsCount} reviews)
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-400">
                  {service.title}
                </h3>

                {/* Price and Actions */}
                <div className="mt-auto border-t border-slate-100 pt-5 dark:border-slate-800">
                  <div className="mb-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Starting price
                      </p>
                      <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        ${service.price}
                      </p>
                    </div>

                    <span className="mb-1 inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Professional service
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/services"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
                    >
                      View Details
                    </Link>

                    <Link
                      href="/login"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
