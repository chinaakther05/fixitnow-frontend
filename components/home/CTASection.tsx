"use client";

import React from "react";
import Link from "next/link";
import { Wrench, PhoneCall, ArrowRight, ShieldCheck, Star } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-950 dark:via-emerald-900 dark:to-slate-900 border border-emerald-500/30 dark:border-emerald-800/50 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          
          {/* Background Decorative Glow Effect */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & Content */}
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-100 text-xs sm:text-sm font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Fast, Reliable & Certified Technicians</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Ready to Fix Your Home Issues Today?
              </h2>

              {/* Subtitle */}
              <p className="text-emerald-100/90 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Book top-rated professionals for plumbing, electrical work, AC servicing, and cleaning in just a few clicks. Guaranteed satisfaction with transparent pricing.
              </p>

              {/* Stats Highlights */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-xs sm:text-sm font-semibold text-emerald-100">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.9/5 Rating (2.5k+ Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Available 24/7 in Dhaka</span>
                </div>
              </div>

            </div>

            {/* Right Column: Action Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-center items-center gap-4">
              
              <Link
                href="/services"
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <Wrench className="w-5 h-5 text-emerald-600 group-hover:rotate-12 transition-transform" />
                <span>Book Service Now</span>
                <ArrowRight className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="tel:+8801700000000"
                className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold text-sm sm:text-base transition-all duration-200 active:scale-95"
              >
                <PhoneCall className="w-5 h-5 text-emerald-300" />
                <span>Call Emergency Line</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;