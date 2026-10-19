
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
              aria-label="FixItNow home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-900/10 transition-transform duration-300 group-hover:-translate-y-0.5">
                <Wrench size={20} />
              </span>

              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                FixIt<span className="text-emerald-600 dark:text-emerald-400">Now</span>
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
              Making home care simpler with convenient solutions for your
              everyday maintenance needs.
            </p>

            <Link
              href="/services"
              className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition-colors hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
            >
              Explore Services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-emerald-600 dark:hover:text-emerald-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h3 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-slate-900 dark:text-white">
              Contact
            </h3>

            <div className="space-y-3 text-sm">
              <p className="flex items-center gap-2.5">
                <MapPin size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>Dhaka, Bangladesh</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>+880 1700-000000</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="break-all">support@fixitnow.com</span>
              </p>
            </div>
          </div>
        </div>

       {/* Copyright */}
<div className="mt-7 border-t border-slate-200 pt-4 text-center dark:border-slate-800">
  <p className="text-xs text-slate-500 dark:text-slate-500">
    © {year ?? 2026} FixItNow. All rights reserved.
  </p>
</div>
        
      </div>
    </footer>
  );
};

export default Footer;
