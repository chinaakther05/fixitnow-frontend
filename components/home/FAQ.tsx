
"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
} from "lucide-react";

const faqItems = [
  {
    question: "What services does FixItNow offer?",
    answer:
      "FixItNow helps you explore home services such as cleaning, plumbing, electrical repairs, and other home maintenance solutions, depending on the services available on the platform.",
  },
  {
    question: "How can I find the right service?",
    answer:
      "Browse the available services, review their details, and choose the option that best matches your home care needs.",
  },
  {
    question: "How do I book a service?",
    answer:
      "Visit the services page, select your preferred service, and follow the booking instructions available on the platform.",
  },
  {
    question: "Can I cancel or change a booking?",
    answer:
      "Cancellation and rescheduling options depend on the booking features and policies available on FixItNow. Check your booking details for the available options.",
  },
  {
    question: "How can I get help with a problem?",
    answer:
      "If you need assistance, visit the contact section or use the support options provided on the FixItNow website.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Content */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <HelpCircle className="h-4 w-4 shrink-0" />
              Frequently Asked Questions
            </div>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              Got Questions?
              <span className="mt-2 block text-emerald-600 dark:text-emerald-400">
                We have Got Answers.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
              Everything you need to know about FixItNow, our home services,
              and how to get started. Find quick answers to the questions
              people ask most often.
            </p>

            <div className="mt-8 flex max-w-xl items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <MessageCircle className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Still have questions?
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Visit our contact section to explore the available ways to
                  reach us.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - FAQ Accordion */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-slate-200 border-y border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={item.question} className="py-2">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="group flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                    >
                      <span className="text-base font-semibold leading-7 text-slate-800 transition-colors group-hover:text-emerald-700 sm:text-lg dark:text-slate-100 dark:group-hover:text-emerald-400">
                        {item.question}
                      </span>

                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen
                            ? "rotate-180 border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-200 text-slate-500 group-hover:border-emerald-500 group-hover:text-emerald-600 dark:border-slate-700 dark:text-slate-400"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-5 pr-4 text-sm leading-7 text-slate-600 sm:pb-6 sm:text-base dark:text-slate-400">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 text-xs leading-6 text-slate-500 dark:text-slate-500">
              Service availability and booking options depend on the features
              implemented on the platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
