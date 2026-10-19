
"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyBookings, cancelBooking } from "@/actions/booking";
import api from "@/lib/api";
import toast from "react-hot-toast";
import {
  CalendarDays,
  MapPin,
  CreditCard,
  RefreshCw,
  CheckCircle2,
  Clock3,
  Wrench,
  XCircle,
  Loader2,
  ClipboardList,
  AlertCircle,
  UserRound,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface Booking {
  id: string;
  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED"
    | "DECLINED";
  scheduledDate: string;
  address: string;
  notes?: string | null;
  totalAmount: number;
  technician?: {
    name: string;
    email?: string;
    phone?: string | null;
  } | null;
  category?: { name: string } | null;
  service?: { name?: string } | null;
}

const statusStyles: Record<string, string> = {
  REQUESTED:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
  ACCEPTED:
    "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/20",
  PAID:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  IN_PROGRESS:
    "bg-violet-50 text-violet-700 ring-violet-200 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/20",
  COMPLETED:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
  CANCELLED:
    "bg-slate-100 text-slate-600 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700",
  DECLINED:
    "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20",
};

const statusLabels: Record<string, string> = {
  REQUESTED: "Pending approval",
  ACCEPTED: "Accepted",
  PAID: "Paid",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  DECLINED: "Declined",
};

export default function BookingPage() {
  const queryClient = useQueryClient();

  const [payingBookingId, setPayingBookingId] = useState<string | null>(null);
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(
    null
  );

  const {
    data: bookings = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery<Booking[]>({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const result = await getMyBookings();

      if (!result?.success) {
        throw new Error(result?.message || "Failed to load your bookings");
      }

      return Array.isArray(result.data) ? result.data : [];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const handleCancel = async (booking: Booking) => {
    if (booking.status !== "REQUESTED") {
      toast.error("Only pending booking requests can be cancelled.");
      return;
    }

    if (
      !window.confirm(
        "Are you sure you want to cancel this booking request?"
      )
    ) {
      return;
    }

    try {
      setCancellingBookingId(booking.id);

      const result = await cancelBooking(booking.id);

      if (!result?.success) {
        toast.error(result?.message || "Failed to cancel booking");
        return;
      }

      toast.success("Booking cancelled successfully");

      await queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });
    } catch (error: unknown) {
      console.error("Cancel booking error:", error);
      toast.error(
        error instanceof Error ? error.message : "Cancellation failed"
      );
    } finally {
      setCancellingBookingId(null);
    }
  };

  const handlePayment = async (booking: Booking) => {
    if (booking.status !== "ACCEPTED") {
      toast.error("This booking is not ready for payment.");
      return;
    }

    try {
      setPayingBookingId(booking.id);

      const response = await api.post("/payments/create", {
        bookingId: booking.id,
      });

      const checkoutUrl = response.data?.data?.checkoutUrl;

      if (!checkoutUrl) {
        toast.error("Payment checkout link was not provided.");
        return;
      }

      window.location.assign(checkoutUrl);
    } catch (error: unknown) {
      console.error("Payment initiation error:", error);

      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };

        toast.error(
          apiError.response?.data?.message || "Payment initiation failed"
        );
      } else {
        toast.error(
          error instanceof Error ? error.message : "Payment initiation failed"
        );
      }
    } finally {
      setPayingBookingId(null);
    }
  };

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "Date unavailable";

    return new Intl.DateTimeFormat("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  const requestedCount = bookings.filter(
    (booking) => booking.status === "REQUESTED"
  ).length;

  const activeCount = bookings.filter((booking) =>
    ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(booking.status)
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  if (isLoading) {
    return (
      <div className="flex min-h-[55vh] flex-col items-center justify-center gap-4 bg-slate-50 px-4 dark:bg-slate-950">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-emerald-900/50 dark:bg-slate-900">
          <Loader2 className="h-7 w-7 animate-spin text-emerald-600" />
        </div>
        <div className="text-center">
          <p className="font-bold text-slate-900 dark:text-white">
            Loading your bookings
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Getting your service details ready...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <section className="min-h-[60vh] bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-xl rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-sm dark:border-rose-900/50 dark:bg-slate-900">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-500/10">
            <AlertCircle className="h-7 w-7 text-rose-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Could not load bookings
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading your bookings."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Page heading */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-12 -top-16 h-52 w-52 rounded-full bg-emerald-100/70 blur-3xl dark:bg-emerald-500/10" />
          <div className="pointer-events-none absolute -bottom-20 right-1/4 h-40 w-40 rounded-full bg-teal-100/60 blur-3xl dark:bg-teal-500/10" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-500/10 dark:text-emerald-300">
                <ClipboardList className="h-4 w-4" />
                Customer dashboard
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl lg:text-5xl">
                My <span className="text-emerald-600 dark:text-emerald-400">Bookings</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Manage your service requests, track progress, and keep your
                upcoming appointments organized in one place.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Your service dashboard
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />
                <span>{bookings.length} total bookings</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-emerald-700 dark:hover:bg-emerald-500/10 md:self-center"
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
              />
              {isFetching ? "Refreshing..." : "Refresh bookings"}
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Total bookings
                </p>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {bookings.length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
                <ClipboardList className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-full rounded-full bg-slate-400" />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Your complete booking history
            </p>
          </div>

          <div className="group rounded-2xl border border-amber-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-amber-900/40 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Pending requests
                </p>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {requestedCount}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-amber-50 dark:bg-slate-800">
              <div className="h-full w-1/2 rounded-full bg-amber-400" />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Waiting for technician approval
            </p>
          </div>

          <div className="group rounded-2xl border border-emerald-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-emerald-900/40 dark:bg-slate-900 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Active & completed
                </p>
                <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {activeCount + completedCount}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-emerald-50 dark:bg-slate-800">
              <div className="h-full w-2/3 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              {activeCount} active · {completedCount} completed
            </p>
          </div>
        </div>

        {/* List heading */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
              Booking management
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Your service requests
            </h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Review the details and current status of each booking.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <ClipboardList className="h-4 w-4 text-emerald-600" />
            {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}
          </span>
        </div>

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
              <CalendarDays className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
              No bookings yet
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              Once you request a service, you will be able to track it here.
            </p>
            <a
              href="/services"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Explore services
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {bookings.map((booking) => {
              const isRequested = booking.status === "REQUESTED";
              const isAccepted = booking.status === "ACCEPTED";
              const isPaid = booking.status === "PAID";
              const isInProgress = booking.status === "IN_PROGRESS";
              const isCompleted = booking.status === "COMPLETED";
              const isCancelled = ["CANCELLED", "DECLINED"].includes(
                booking.status
              );

              const isCancelling = cancellingBookingId === booking.id;
              const isPaying = payingBookingId === booking.id;

              return (
                <article
                  key={booking.id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:shadow-none"
                >
                  <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-300" />

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Card title and status */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <Wrench className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 pt-0.5">
                          <h3 className="break-words text-lg font-bold leading-snug text-slate-900 dark:text-white">
                            {booking.service?.name ||
                              booking.category?.name ||
                              "Service booking"}
                          </h3>
                          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                            Booking ID · {booking.id.slice(0, 8)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1.5 text-[10px] font-bold ring-1 sm:text-xs ${
                          statusStyles[booking.status] || statusStyles.REQUESTED
                        }`}
                      >
                        {statusLabels[booking.status] || booking.status}
                      </span>
                    </div>

                    {/* Booking details */}
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                        <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Scheduled date
                          </p>
                          <p className="mt-1.5 text-sm font-bold text-slate-800 dark:text-slate-200">
                            {formatDate(booking.scheduledDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
                        <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Technician
                          </p>
                          <p className="mt-1.5 break-words text-sm font-bold text-slate-800 dark:text-slate-200">
                            {booking.technician?.name || "Not assigned yet"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 sm:col-span-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            Service address
                          </p>
                          <p className="mt-1.5 break-words text-sm leading-5 text-slate-700 dark:text-slate-300">
                            {booking.address || "Address not provided"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          Booking notes
                        </p>
                        <p className="mt-1.5 break-words text-sm leading-6 text-slate-700 dark:text-slate-300">
                          {booking.notes}
                        </p>
                      </div>
                    )}

                    {/* Amount */}
                    <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 dark:border-emerald-900/40 dark:bg-emerald-500/5">
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          Total amount
                        </p>
                        <p className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                          <span className="mr-1 text-lg font-bold text-emerald-700 dark:text-emerald-400">
                            ৳
                          </span>
                          {formatAmount(booking.totalAmount)}
                        </p>
                      </div>

                      {isPaid && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-emerald-700 shadow-sm dark:bg-slate-800 dark:text-emerald-300">
                          <CheckCircle2 className="h-4 w-4" />
                          Paid
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto pt-5">
                      {isRequested && (
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <div className="flex flex-1 items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3 text-xs font-medium leading-5 text-amber-800 dark:border-amber-900/40 dark:bg-amber-500/10 dark:text-amber-300">
                            <Clock3 className="h-4 w-4 shrink-0" />
                            Waiting for technician approval
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCancel(booking)}
                            disabled={isCancelling}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm font-bold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-900/60 dark:bg-slate-900 dark:text-rose-400 dark:hover:bg-rose-500/10"
                          >
                            {isCancelling ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {isCancelling ? "Cancelling..." : "Cancel request"}
                          </button>
                        </div>
                      )}

                      {isAccepted && (
                        <button
                          type="button"
                          onClick={() => handlePayment(booking)}
                          disabled={isPaying || payingBookingId !== null}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-bold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isPaying ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <CreditCard className="h-4 w-4" />
                          )}
                          {isPaying ? "Preparing payment..." : "Continue to payment"}
                          {!isPaying && <ArrowRight className="h-4 w-4" />}
                        </button>
                      )}

                      {isPaid && (
                        <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5 text-sm font-bold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <CheckCircle2 className="h-4 w-4" />
                          Payment successful
                        </div>
                      )}

                      {isInProgress && (
                        <div className="flex items-center justify-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3.5 text-sm font-bold text-violet-700 dark:border-violet-900/40 dark:bg-violet-500/10 dark:text-violet-300">
                          <Wrench className="h-4 w-4" />
                          Your service is in progress
                        </div>
                      )}

                      {isCompleted && (
                        <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3.5 text-sm font-bold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <CheckCircle2 className="h-4 w-4" />
                          Service completed
                        </div>
                      )}

                      {isCancelled && (
                        <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3.5 text-sm font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          <XCircle className="h-4 w-4" />
                          {booking.status === "DECLINED"
                            ? "Request declined"
                            : "Booking cancelled"}
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Support footer */}
        <div className="mt-8 flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-5 text-center dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help with a booking?{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              Contact the FixItNow support team.
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
