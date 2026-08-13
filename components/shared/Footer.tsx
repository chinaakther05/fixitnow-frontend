"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  // Client-side execution to prevent Hydration Warning
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t bg-slate-50 text-slate-600 transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950 dark:text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          
          {/* Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-600 p-2.5 text-white shadow-md shadow-emerald-600/20">
                <Wrench size={20} />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                FixItNow
              </h2>
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Trusted home service platform connecting customers with skilled professionals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-2.5 text-sm font-medium">
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

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Contact
            </h3>

            <div className="space-y-3 text-sm font-medium">
              <p className="flex items-center gap-2.5">
                <MapPin size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>+880 1700-000000</span>
              </p>

              <p className="flex items-center gap-2.5">
                <Mail size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>support@fixitnow.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 border-t border-slate-200/80 pt-6 text-center text-xs text-slate-400 dark:border-slate-800/80 dark:text-slate-500">
          © {year || "2026"} FixItNow. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;