
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getTechnicianById } from "@/actions/technician";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
  Star,
  UserRound,
  Wrench,
} from "lucide-react";

const TechnicianProfilePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const result = await getTechnicianById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const technician = result.data;

  const name = technician.user?.name || "Technician";
  const rating = Number(technician.avgRating || 0);
  const totalReviews = technician.totalReviews || 0;
  const reviews = technician.reviews || [];
  const skills = technician.skills || [];
  const hourlyRate = technician.hourlyRate || 0;

  const profileImage = (
    technician.user as typeof technician.user & {
      profileImage?: string | null;
    }
  )?.profileImage;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Back Navigation */}
        <Link
          href="/services"
          className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>

        {/* Profile Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm dark:border-emerald-900/40 dark:bg-slate-900">
          <div className="h-36 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 sm:h-44">
            <div className="h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.18),transparent_35%)]" />
          </div>

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-16 flex flex-col gap-5 sm:-mt-20 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                {/* Profile Image */}
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-emerald-50 text-4xl font-extrabold text-emerald-700 shadow-md dark:border-slate-900 dark:bg-emerald-950 dark:text-emerald-300 sm:h-36 sm:w-36">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={name}
                      fill
                      sizes="144px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="min-w-0 pb-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                      <Wrench className="h-3.5 w-3.5" />
                      Professional Technician
                    </span>
                  </div>

                  <h1 className="break-words text-2xl font-extrabold tracking-tight sm:text-3xl">
                    {name}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {rating.toFixed(1)}
                    </span>

                    <span className="text-slate-500 dark:text-slate-400">
                      {totalReviews} reviews
                    </span>

                    <span className="text-slate-300 dark:text-slate-700">
                      |
                    </span>

                    <span className="text-slate-500 dark:text-slate-400">
                      {skills.length} skills listed
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/30 sm:min-w-48 sm:text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hourly Rate
                </p>

                <p className="mt-1 text-3xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-400">
                  ৳{hourlyRate}
                  <span className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    /hr
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Information */}
            <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {rating.toFixed(1)} / 5.0
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Customer rating
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    {reviews.length} reviews shown
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Customer feedback
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">
                    ৳{hourlyRate} / hour
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Service rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Left Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* About */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                  <UserRound className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">About Technician</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Professional introduction
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-line text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {technician.bio || "No bio available yet."}
              </p>
            </section>

            {/* Skills */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
                  <Wrench className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold">Skills & Expertise</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Areas of specialization
                  </p>
                </div>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3.5 py-2.5 text-sm font-semibold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No skills have been added yet.
                </p>
              )}
            </section>

            {/* Reviews */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
                    <MessageSquare className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">Customer Reviews</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Feedback from customers
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {reviews.length}
                </span>
              </div>

              {reviews.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm dark:bg-slate-800">
                    <MessageSquare className="h-5 w-5" />
                  </div>

                  <h3 className="font-bold">No reviews yet</h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Customer feedback will appear here when reviews become
                    available.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map(
                    (review: {
                      id: string;
                      rating: number;
                      comment: string | null;
                      customer: { name: string };
                    }) => (
                      <article
                        key={review.id}
                        className="rounded-xl border border-slate-100 p-4 transition hover:border-emerald-100 dark:border-slate-800 dark:hover:border-emerald-900/60 sm:p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                              {review.customer?.name?.charAt(0)?.toUpperCase() ||
                                "C"}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-bold">
                                {review.customer?.name || "Customer"}
                              </p>
                              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                Customer review
                              </p>
                            </div>
                          </div>

                          <div
                            className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-sm font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"
                            aria-label={`${review.rating} out of 5 stars`}
                          >
                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            {review.rating}
                          </div>
                        </div>

                        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {review.comment || "No written comment provided."}
                        </p>
                      </article>
                    )
                  )}
                </div>
              )}
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-24">
            {/* Booking Card */}
            <section className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-emerald-900/40 dark:bg-slate-900">
              <div className="bg-gradient-to-r from-emerald-700 to-teal-600 px-5 py-5 text-white">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <h2 className="text-lg font-bold">Book This Technician</h2>

                <p className="mt-1 text-sm leading-6 text-emerald-50">
                  Get professional help for your repair and maintenance needs.
                </p>
              </div>

              <div className="p-5">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Hourly service rate
                </p>

                <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
                  ৳{hourlyRate}
                  <span className="ml-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    /hr
                  </span>
                </p>

                <div className="my-5 h-px bg-slate-100 dark:bg-slate-800" />

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>View technician details before booking</span>
                  </div>

                  <div className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span>
                      {rating.toFixed(1)} rating from {totalReviews} reviews
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span>Explore listed skills and expertise</span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Booking form coming next
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    The booking form can be added here when that feature is
                    ready.
                  </p>
                </div>

                <Link
                  href="/services"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"
                >
                  Explore More Technicians
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Trust Note */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-sm font-bold">Choose with confidence</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Review the technician&apos;s profile, skills, rates and
                    available customer feedback before making a decision.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default TechnicianProfilePage;
