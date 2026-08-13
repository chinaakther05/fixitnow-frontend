import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, CheckCircle, ShieldCheck, Users, ArrowRight } from "lucide-react";

const AboutPage = () => {
  const stats = [
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Award, value: "500+", label: "Expert Technicians" },
    { icon: ShieldCheck, value: "100%", label: "Verified Professionals" },
    { icon: CheckCircle, value: "4.9★", label: "Average Rating" },
  ];

  const highlights = [
    "Verified & Experienced Professionals",
    "Affordable & Transparent Pricing",
    "Fast Booking & Secure Payments",
    "Customer Satisfaction Guaranteed",
  ];

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-emerald-500/10 via-slate-50 to-slate-50 dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block rounded-full bg-emerald-100 dark:bg-emerald-950/80 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
            About FixItNow
          </span>

          <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Your Trusted Partner for <br className="hidden sm:inline" />
            <span className="text-emerald-600 dark:text-emerald-400">
              Every Home Service
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            FixItNow connects customers with skilled and verified professionals for reliable home services. From plumbing and electrical work to AC repair and home cleaning, we make booking trusted technicians simple, fast, and hassle-free.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {/* Who We Are Section */}
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-35 transition duration-500"></div>
            <div className="relative overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-900 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
                alt="About FixItNow"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover rounded-2xl transform group-hover:scale-105 transition duration-700 ease-out"
              />
            </div>
          </div>

          <div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-xs">
              Who We Are
            </span>

            <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
              Making Home Services Easy, Fast & Transparent
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Our goal is to simplify home maintenance by connecting customers with trusted technicians. Whether you need urgent repairs or regular maintenance, FixItNow ensures top-quality service and peace of mind.
            </p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3.5">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-sm hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-xs sm:text-sm font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mission & Vision */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 md:p-10 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Our Mission</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
              To provide every customer with instant access to verified home service professionals through a transparent, efficient, and user-friendly digital marketplace.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 md:p-10 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Our Vision</h3>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400">
              To become the most reliable and trusted home service ecosystem where everyday maintenance needs are solved seamlessly with safety and precision.
            </p>
          </div>
        </div>

        {/* Call To Action Banner */}
        <div className="mt-20 relative overflow-hidden rounded-3xl bg-emerald-600 dark:bg-emerald-700 p-8 sm:p-14 text-center text-white shadow-xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
              Ready to Experience Seamless Home Services?
            </h2>

            <p className="mt-3 text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
              Join thousands of satisfied homeowners who rely on FixItNow for professional and hassle-free repair solutions.
            </p>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 mt-6 rounded-xl bg-white text-emerald-700 hover:bg-slate-100 font-bold px-7 py-3 text-sm shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              Explore Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;