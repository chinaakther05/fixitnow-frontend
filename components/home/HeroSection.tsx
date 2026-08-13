"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

const slides = [
  {
    image: 'https://i.ibb.co/tTH7ByCw/What-to-Look-For-in-a-Professional-Plumber-residential-plumbing-services-Ehret-Plumbing.jpg',
    badge: 'Certified & Insured Technicians',
    title: 'Expert Plumbing Solutions For Your Home',
    subtitle: 'From minor leak repairs to complex pipe installations, our top-rated plumbers deliver fast, reliable, and affordable services right at your doorstep.',
    link: '/services',
  },
  {
    image: 'https://i.ibb.co/vx5Qv3QP/image.jpg',
    badge: '24/7 Emergency Support',
    title: 'Safe & Trusted Electrical Repairs',
    subtitle: 'Ensure your safety with certified electricians. We handle complete home rewiring, appliance installation, and instant electrical troubleshooting.',
    link: '/services',
  },
  {
    image: 'https://i.ibb.co/Kx85t8FC/ima.jpg',
    badge: '100% Satisfaction Guaranteed',
    title: 'Professional Deep Home Cleaning',
    subtitle: 'Transform your living space with our eco-friendly deep cleaning. Spotless, sanitized, and refreshed home guaranteed in just one booking.',
    link: '/services',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[540px] sm:h-[600px] lg:h-[650px] overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl my-4">
      {/* Image Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover object-center scale-105 transition-transform duration-7000 ease-out"
          />

          {/* Premium Multi-layer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/20 dark:from-slate-950 dark:via-slate-950/85 dark:to-slate-950/30" />
          <div className="absolute inset-0 bg-black/20" />

          {/* Content Container */}
          <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 lg:px-20 max-w-4xl text-white z-20">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-medium w-fit mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{slide.badge}</span>
            </div>

            {/* Big & Bold Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white mb-5 drop-shadow-md">
              {slide.title}
            </h1>

            {/* Clear Subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed font-normal">
              {slide.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={slide.link}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Book Service Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="hidden sm:flex items-center gap-2 px-4 py-3 text-slate-300 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Verified Professionals</span>
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/50 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/10 transition-all duration-200 active:scale-95 hidden sm:flex shadow-xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/50 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/10 transition-all duration-200 active:scale-95 hidden sm:flex shadow-xl"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Controls: Dots & Counter */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-30 flex items-center gap-4 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10">
        <span className="text-xs font-bold tracking-widest text-slate-400">
          0{currentSlide + 1} / 0{slides.length}
        </span>
        <div className="h-3 w-[1px] bg-slate-700" />
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-emerald-500' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;