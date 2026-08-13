"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, ShieldCheck, Clock } from "lucide-react";

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
    image: "https://i.ibb.co/tTH7ByCw/What-to-Look-For-in-a-Professional-Plumber-residential-plumbing-services-Ehret-Plumbing.jpg",
    rating: 4.9,
    reviewsCount: 128,
    price: 49,
    duration: "1-2 Hours",
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
    duration: "3-4 Hours",
    badge: "Best Value",
  },
];

const FeaturedServices = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Guaranteed Satisfaction</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Featured Services
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-base max-w-xl">
              Explore our highest-rated home services booked by thousands of happy customers this week.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors group w-fit"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServicesData.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badge Container */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

                  {/* Badge */}
                  {service.badge && (
                    <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      {service.badge}
                    </span>
                  )}

                  {/* Category Tag */}
                  <span className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-2.5 py-1 rounded-md">
                    {service.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  {/* Rating & Duration */}
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {service.rating}
                      </span>
                      <span>({service.reviewsCount})</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-4">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer: Price & Action */}
              <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-auto flex items-center justify-between">
                <div className="mt-4">
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">Starts from</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    ${service.price}
                  </span>
                </div>

                <Link
                  href={`/services/${service.id}`}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-slate-800 hover:text-white dark:text-slate-200 dark:hover:text-white text-xs font-semibold transition-all duration-200 shadow-sm"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedServices;