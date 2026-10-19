
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  Calendar,
  MapPin,
  AlertCircle,
  Loader2,
  UserCheck,
  Wrench,
  ArrowLeft,
  ShieldCheck,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { createBooking } from "@/actions/booking";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const technicianId = params.id as string;

  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const now = new Date();
    const localDate = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");

    setToday(localDate);
  }, []);

  const {
    data: technician,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["technician", technicianId],
    queryFn: async () => {
      const res = await api.get(`/technicians/${technicianId}`);
      return res.data.data;
    },
  });

  const handleBooking = async () => {
    setErrorMsg("");

    if (!date || !address.trim()) {
      setErrorMsg("Please select a date and enter your service address.");
      return;
    }

    if (date < today) {
      setErrorMsg("Please select today or a future date.");
      return;
    }

    if (!technician) {
      setErrorMsg("Technician data not loaded yet.");
      return;
    }

    setIsSubmitting(true);

    const categoryId = technician.services?.[0]?.category?.id;
    const serviceId = technician.services?.[0]?.id;

    const bookingData: {
      technicianId: string;
      categoryId?: string;
      serviceId?: string;
      scheduledDate: string;
      address: string;
      notes: string;
      totalAmount: number;
    } = {
      technicianId: technician.userId,
      scheduledDate: new Date(date).toISOString(),
      address: address.trim(),
      notes: typeof problem === "string" ? problem.trim() : "",
     
     //  notes: problem.trim(), 
      totalAmount: Number(technician.hourlyRate || 500),
    };

    if (categoryId) bookingData.categoryId = categoryId;
    if (serviceId) bookingData.serviceId = serviceId;

    try {
      const result = await createBooking(bookingData);

      if (result.success) {
        toast.success("Booking created successfully!");
        router.push("/dashboard/customer/bookings");
      } else {
        setErrorMsg(result.message || "Booking failed. Please try again.");
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 bg-slate-50 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
        <p className="text-sm font-medium">Loading technician details...</p>
      </div>
    );
  }

  if (isError || !technician) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Technician Not Found
        </h2>
        <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
          We could not load this technician. Please go back and try again.
        </p>
        <button
          onClick={() => router.push("/services")}
          className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Browse Technicians
        </button>
      </div>
    );
  }

  const technicianName = technician.user?.name || "Technician";
  const hourlyRate = technician.hourlyRate || 500;

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-emerald-500 dark:focus:bg-slate-900";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 transition-colors duration-200 sm:py-12 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-slate-500 transition hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
            <Calendar className="h-3.5 w-3.5" />
            BOOKING REQUEST
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Book {technicianName}
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base dark:text-slate-400">
            Tell us when and where you need help. Complete the form below to
            submit your service request.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {/* Booking Form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-7 flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white">
                  Booking Details
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Fields marked with * are required.
                </p>
              </div>
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-400"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleBooking();
              }}
              className="space-y-6"
            >
              {/* Preferred Date */}
              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Preferred Date <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-600 dark:text-emerald-400" />

                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    min={today || undefined}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setErrorMsg("");
                    }}
                    required
                    className={`${inputClass} pl-12`}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Choose today or a future date from the calendar.
                </p>
              </div>

              {/* Service Address */}
              <div>
                <label
                  htmlFor="service-address"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Service Address <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-emerald-600 dark:text-emerald-400" />

                  <textarea
                    id="service-address"
                    rows={3}
                    placeholder="House / road, area, city..."
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setErrorMsg("");
                    }}
                    required
                    className={`${inputClass} resize-y pl-12`}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Enter the complete address where the service is needed.
                </p>
              </div>

              {/* Problem Description */}
              <div>
                <label
                  htmlFor="problem-description"
                  className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Problem Description{" "}
                  <span className="font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <textarea
                  id="problem-description"
                  rows={4}
                  placeholder="Describe the issue and any details the technician should know..."
                  value={problem}
                  onChange={setProblem}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                  type="submit"
                  disabled={isSubmitting || !today}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Booking...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Confirm Booking
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Please review your date and address before confirming.
                </p>
              </div>
            </form>
          </section>

          {/* Booking Summary */}
          <aside className="space-y-5 lg:sticky lg:top-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="bg-gradient-to-br from-emerald-700 to-emerald-600 p-6 text-white">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                  <UserCheck className="h-6 w-6" />
                </div>
                <p className="text-sm text-emerald-100">
                  Your Selected Technician
                </p>
                <h2 className="mt-1 text-xl font-bold">{technicianName}</h2>
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-2 text-xs font-medium">
                  <Wrench className="h-4 w-4" />
                  Professional Service
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Estimated Rate
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    ৳{hourlyRate}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    / hour
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Final charges may depend on the service and work required.
                </p>

                <div className="my-5 border-t border-slate-100 dark:border-slate-800" />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Flexible Scheduling
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Choose a convenient service date.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Booking Summary
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                        Check your details before submitting your request.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Before You Book
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    Provide an accurate address and a clear description to help
                    the technician understand your needs.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
