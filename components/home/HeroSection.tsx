
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const slides = [
  {
    image:
      "https://i.ibb.co/tTH7ByCw/What-to-Look-For-in-a-Professional-Plumber-residential-plumbing-services-Ehret-Plumbing.jpg",
    badge: "Certified & Insured Technicians",
    title: "Expert Plumbing Solutions for Your Home",
    subtitle:
      "From minor leak repairs to complex pipe installations, find reliable plumbing services to keep your home running smoothly.",
    link: "/services",
    category: "Plumbing Services",
  },
  {
    image: "https://i.ibb.co/vx5Qv3QP/image.jpg",
    badge: "24/7 Emergency Support",
    title: "Safe & Trusted Electrical Repairs",
    subtitle:
      "From appliance installation to electrical troubleshooting, discover professional services designed with your home's safety in mind.",
    link: "/services",
    category: "Electrical Services",
  },
  {
    image: "https://i.ibb.co/Kx85t8FC/ima.jpg",
    badge: "Quality Home Care",
    title: "A Cleaner Home, A Happier Life",
    subtitle:
      "Make everyday living easier with home cleaning services that help keep your space fresh, comfortable, and welcoming.",
    link: "/services",
    category: "Home Cleaning",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((previous) => (previous + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (previous) => (previous - 1 + slides.length) % slides.length
    );
  };

  const slide = slides[currentSlide];

  return (
    <section className="w-full py-4 sm:py-6">
      {/* Same container width and horizontal padding as Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:rounded-3xl">
          <div className="grid min-h-[540px] grid-cols-1 lg:min-h-[570px] lg:grid-cols-2">
            {/* Left: Text Content */}
            <div className="relative z-10 flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-10 xl:px-12">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 sm:text-sm">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{slide.badge}</span>
              </div>

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                {slide.category}
              </p>

              <h1
                key={slide.title}
                className="max-w-xl text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl xl:text-5xl"
              >
                {slide.title}
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base sm:leading-8">
                {slide.subtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={slide.link}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:px-6 sm:text-base"
                >
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="inline-flex items-center gap-2 px-1 py-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>Trusted Home Care</span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="mt-9 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {slides.map((item, index) => (
                    <button
                      key={item.category}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      aria-label={`Show ${item.category}`}
                      aria-pressed={currentSlide === index}
                      className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${
                        currentSlide === index
                          ? "w-8 bg-emerald-600"
                          : "w-2 bg-slate-300 hover:bg-emerald-400 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-emerald-950/50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-emerald-950/50"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Changing Image */}
            <div className="relative min-h-[280px] overflow-hidden bg-slate-100 dark:bg-slate-800 sm:min-h-[360px] lg:min-h-full">
              {slides.map((item, index) => (
                <div
                  key={item.image}
                  aria-hidden={index !== currentSlide}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.category}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                </div>
              ))}

              {/* Image Contrast and Detail Label */}
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/5" />

              <div className="absolute bottom-5 left-5 right-5 z-30 flex items-center justify-between gap-3 sm:bottom-7 sm:left-7 sm:right-7">
                <div className="rounded-xl border border-white/20 bg-slate-950/65 px-4 py-3 text-white shadow-lg backdrop-blur-md">
                  <p className="text-xs text-slate-300">Discover</p>
                  <p className="mt-0.5 text-sm font-bold sm:text-base">
                    {slide.category}
                  </p>
                </div>

                <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {String(currentSlide + 1).padStart(2, "0")} of{" "}
                  {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
