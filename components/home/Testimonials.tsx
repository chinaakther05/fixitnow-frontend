"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  comment: string;
  rating: number;
  serviceUsed: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Tanvir Hossain",
    role: "Homeowner, Uttara",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    comment: "The AC servicing team arrived on time and did an exceptionally thorough cleaning. Extremely satisfied with their professionalism and upfront pricing!",
    rating: 5,
    serviceUsed: "AC Servicing",
  },
  {
    id: "2",
    name: "Nusrat Jahan",
    role: "Apartment Resident, Dhanmondi",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300",
    comment: "Booking a plumber via FixItNow took less than 2 minutes. The technician was respectful, skilled, and fixed my kitchen leak instantly without any hassle.",
    rating: 5,
    serviceUsed: "Plumbing Repair",
  },
  {
    id: "3",
    name: "Rafiqul Islam",
    role: "Business Owner, Gulshan",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    comment: "Used their deep cleaning service before shifting to my new office. The team transformed the entire place! Highly recommended for quality home solutions.",
    rating: 5,
    serviceUsed: "Deep Cleaning",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950/50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Trusted Reviews</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What Our Clients{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            Real feedback from thousands of homeowners who rely on FixItNow for their daily maintenance and repair needs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon & Rating */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-500/20 dark:text-emerald-400/20 group-hover:text-emerald-500/40 transition-colors" />
                </div>

                {/* Comment */}
               <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic mb-8">
  &quot;{item.comment}&quot;
</p>
              </div>

              {/* User Info & Service Badge */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/30 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-200/50 dark:border-emerald-800/40">
                  {item.serviceUsed}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;