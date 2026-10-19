
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Testimonial {
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
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    comment:
      "The AC servicing team arrived on time and did a thorough job. The technician explained everything clearly.",
    rating: 5,
    serviceUsed: "AC Servicing",
  },
  {
    id: "2",
    name: "Nusrat Jahan",
    role: "Apartment Resident, Dhanmondi",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    comment:
      "Booking a plumber was simple and convenient. The technician was polite and helped fix the kitchen leak.",
    rating: 5,
    serviceUsed: "Plumbing",
  },
  {
    id: "3",
    name: "Rafiqul Islam",
    role: "Office Manager, Gulshan",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    comment:
      "We arranged a deep cleaning service before moving into our office. The team paid attention to the details.",
    rating: 5,
    serviceUsed: "Deep Cleaning",
  },
  {
    id: "4",
    name: "Ayesha Rahman",
    role: "Homeowner, Mirpur",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    comment:
      "The booking process was easy to understand. I could explore the service I needed without a complicated process.",
    rating: 5,
    serviceUsed: "Home Cleaning",
  },
  {
    id: "5",
    name: "Sabbir Ahmed",
    role: "Resident, Mohammadpur",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    comment:
      "I needed help with an electrical issue at home. The service options were easy to browse.",
    rating: 5,
    serviceUsed: "Electrical",
  },
  {
    id: "6",
    name: "Farzana Akter",
    role: "Homeowner, Banasree",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    comment:
      "Finding a home maintenance service was easier than I expected. I liked exploring different options in one place.",
    rating: 5,
    serviceUsed: "Home Repair",
  },
  {
    id: "7",
    name: "Imran Hossain",
    role: "Resident, Banani",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    comment:
      "The service options were easy to explore, and the booking experience was simple and convenient.",
    rating: 5,
    serviceUsed: "Electrical Repair",
  },
  {
    id: "8",
    name: "Maliha Islam",
    role: "Homeowner, Uttara",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    comment:
      "I liked how easy it was to find home cleaning options in one place. The website was simple to navigate.",
    rating: 5,
    serviceUsed: "Home Cleaning",
  },
  {
    id: "9",
    name: "Sakib Ahmed",
    role: "Resident, Mirpur",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    comment:
      "Finding a home repair service was straightforward. I could browse the available options without confusion.",
    rating: 5,
    serviceUsed: "Home Repair",
  },
];

export default function Testimonials() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  const scrollReviews = (direction: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector<HTMLElement>("[data-review-card]");
    if (!card) return;

    const styles = window.getComputedStyle(slider);
    const gap = parseFloat(styles.columnGap) || 24;
    const distance = card.offsetWidth + gap;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (direction === "right" && slider.scrollLeft >= maxScroll - 5) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === "left" && slider.scrollLeft <= 5) {
      slider.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      slider.scrollBy({
        left: direction === "right" ? distance : -distance,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = window.setInterval(() => {
      if (isHoveredRef.current) return;
      scrollReviews("right");
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="overflow-hidden bg-slate-50 py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Customer Experiences
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Experiences That
              <span className="block text-emerald-600 dark:text-emerald-400">
                Speak for Themselves
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
              Discover home service experiences and explore the services
              available through FixItNow.
            </p>
          </div>

          {/* Slider arrows */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => scrollReviews("left")}
              aria-label="Previous reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-emerald-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollReviews("right")}
              aria-label="Next reviews"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-emerald-600"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Auto-sliding review cards */}
        <div
          ref={sliderRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          onFocusCapture={() => {
            isHoveredRef.current = true;
          }}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget as Node | null
              )
            ) {
              isHoveredRef.current = false;
            }
          }}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonialsData.map((item) => (
            <article
              key={item.id}
              data-review-card
              className="group flex w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-slate-200/50 sm:w-[calc(50%-12px)] sm:p-7 lg:w-[calc(33.333%-16px)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:shadow-black/20"
            >
              <div className="mb-6 flex items-center justify-between">
                <div
                  className="flex items-center gap-1"
                  aria-label={`${item.rating} out of 5 stars`}
                >
                  {Array.from({ length: item.rating }, (_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-emerald-500/25 transition-colors group-hover:text-emerald-500/50" />
              </div>

              <p className="flex-1 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                “{item.comment}”
              </p>

              <div className="mt-6">
                <span className="inline-flex rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300">
                  {item.serviceUsed}
                </span>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-emerald-500/30 bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
