"use client";

import React from "react";
import {
  ShieldCheck,
  Clock,
  Award,
  CircleDollarSign,
  Headphones,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Every service provider is background-checked, skilled, and certified for your safety and peace of mind.",
  },
  {
    icon: Clock,
    title: "Fast & On-Time Service",
    description:
      "We value your time. Book a flexible slot and get our technicians at your doorstep right on schedule.",
  },
  {
    icon: CircleDollarSign,
    title: "Transparent Pricing",
    description:
      "No hidden fees or unexpected charges. Get clear upfront pricing before any job begins.",
  },
  {
    icon: Award,
    title: "100% Quality Guaranteed",
    description:
      "Not satisfied with the work? We offer re-service guarantees to ensure top-notch quality.",
  },
  {
    icon: Headphones,
    title: "24/7 Dedicated Support",
    description:
      "Our customer care team is always available to assist you with bookings, queries, or emergency issues.",
  },
  {
    icon: CheckCircle2,
    title: "Hassle-Free Booking",
    description:
      "Easy online booking process with multiple secure payment options including cards and mobile banking.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
            Why Choose FixItNow
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            We Provide the Best Home Services{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              In Town
            </span>
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Discover why thousands of homeowners trust us for their daily repair, cleaning, and maintenance needs.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-8 shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white dark:group-hover:bg-emerald-600 dark:group-hover:text-white transition-all duration-300 mb-6 shadow-sm">
                  <Icon size={26} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
              Need Urgent Home Repairing?
            </h3>
            <p className="text-emerald-100 text-sm sm:text-base max-w-xl">
              Book our expert technicians right now and get up to 15% off on your first service booking.
            </p>
          </div>

          <a
            href="/services"
            className="px-8 py-3.5 rounded-xl bg-white text-emerald-600 font-bold text-sm hover:bg-slate-100 transition-all duration-200 shadow-md shrink-0 active:scale-95"
          >
            Get Service Now
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;