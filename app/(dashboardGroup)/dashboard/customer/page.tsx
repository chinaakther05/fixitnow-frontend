
"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import {
  getMyBookings,
  cancelBooking,
} from "@/actions/booking";
import { Booking } from "@/types/booking";
import { statusStyles } from "@/lib/statusColors";
import {
  Calendar,
  Clock,
  CreditCard,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Wrench,
  ArrowRight,
  LoaderCircle,
  UserRound,
  Home,
  RefreshCw,
} from "lucide-react";

type Tab = "all" | "pending" | "completed";

const PENDING_STATUSES = [
  "REQUESTED",
  "ACCEPTED",
  "PENDING",
  "PAID",
  "IN_PROGRESS",
];

const CustomerDashboardPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<Booking[]>({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const result = await getMyBookings();

      if (!result.success) {
        throw new Error(result.message || "Failed to load bookings");
      }

      return result.data ?? [];
    },
  });

  const pendingBookings = bookings.filter((booking) =>
    PENDING_STATUSES.includes(booking.status?.toUpperCase())
  );

  const completedBookings = bookings.filter(
    (booking) => booking.status?.toUpperCase() === "COMPLETED"
  );

  const filteredBookings = bookings.filter((booking) => {
    const status = booking.status?.toUpperCase();

    if (activeTab === "pending") {
      return PENDING_STATUSES.includes(status);
    }

    if (activeTab === "completed") {
      return status === "COMPLETED";
    }

    return true;
  });

  const handleCancel = async (bookingId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(bookingId);

      const result = await cancelBooking(bookingId);

      if (!result.success) {
        toast.error(result.message || "Failed to cancel booking");
        return;
      }

      toast.success("Booking cancelled successfully");

      await queryClient.invalidateQueries({
        queryKey: ["my-bookings"],
      });
    } catch {
      toast.error("Unable to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const navItems = [
    {
      id: "all" as const,
      label: "My Bookings",
      icon: Calendar,
      count: bookings.length,
    },
    {
      id: "pending" as const,
      label: "Pending Services",
      icon: Clock,
      count: pendingBookings.length,
    },
    {
      id: "completed" as const,
      label: "Completed",
      icon: CheckCircle2,
      count: completedBookings.length,
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-9 w-64 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
            <div className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="space-y-4">
              <div className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800" />
              <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center dark:border-red-900/50 dark:bg-slate-900">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />

          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Failed to load bookings
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your session may have expired, or the server may be unavailable.
            Please try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            <LayoutDashboard className="h-4 w-4" />
            Customer Dashboard
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            My{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Dashboard
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Manage your bookings, track service progress, and review your
            completed services.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-8">
          {/* Sidebar */}
          <aside className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-100 p-5 dark:border-slate-800">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <Wrench className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-extrabold">FixItNow</h2>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Customer Panel
                  </p>
                </div>
              </Link>
            </div>

            <nav
              aria-label="Customer dashboard navigation"
              className="space-y-1.5 p-3"
            >
              <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Dashboard
              </p>

              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-emerald-600 font-semibold text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />

                    <span className="flex-1">{item.label}</span>

                    <span
                      className={`min-w-7 rounded-lg px-2 py-1 text-center text-xs font-bold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}

              <div className="my-3 border-t border-slate-100 dark:border-slate-800" />

              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Account
              </p>

              <Link
                href="/dashboard/customer/payments"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Receipt className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1">Payment History</span>
                <ArrowRight className="h-4 w-4 opacity-50" />
              </Link>

              <Link
                href="/dashboard/customer/profile"
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <UserRound className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1">My Profile</span>
                <ArrowRight className="h-4 w-4 opacity-50" />
              </Link>
            </nav>

            <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-800">
              <Link
                href="/services"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                <Wrench className="h-4 w-4" />
                Book New Service
              </Link>

              <Link
                href="/"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <main className="min-w-0">
            {/* Overview */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold">Overview</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  A summary of your service bookings.
                </p>
              </div>

              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 sm:self-auto"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            </div>

            {/* Summary cards */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 ${
                  activeTab === "all"
                    ? "border-emerald-400 dark:border-emerald-700"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    My Bookings
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <Calendar className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold">
                  {bookings.length}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  All your service requests
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pending")}
                className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 ${
                  activeTab === "pending"
                    ? "border-amber-400 dark:border-amber-700"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Pending Services
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                    <Clock className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold">
                  {pendingBookings.length}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Awaiting or in progress
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("completed")}
                className={`rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900 ${
                  activeTab === "completed"
                    ? "border-emerald-400 dark:border-emerald-700"
                    : "border-slate-200 dark:border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Completed
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold">
                  {completedBookings.length}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Successfully completed
                </p>
              </button>
            </div>

            {/* Booking list heading */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold">
                  {activeTab === "all"
                    ? "My Bookings"
                    : activeTab === "pending"
                      ? "Pending Services"
                      : "Completed Services"}
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Showing {filteredBookings.length} of {bookings.length}{" "}
                  bookings
                </p>
              </div>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                Book a Service
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Empty state */}
            {filteredBookings.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  {activeTab === "completed" ? (
                    <CheckCircle2 className="h-7 w-7" />
                  ) : (
                    <Calendar className="h-7 w-7" />
                  )}
                </div>

                <h3 className="text-base font-bold">No bookings found</h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {activeTab === "all"
                    ? "You haven't booked a service yet. Browse our services to make your first booking."
                    : activeTab === "pending"
                      ? "You don't have any pending or in-progress services."
                      : "You don't have any completed services yet."}
                </p>

                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
                >
                  Browse Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              /* Booking cards */
              <div className="space-y-4">
                {filteredBookings.map((booking) => {
                  const status = booking.status?.toUpperCase() ?? "";
                  const canCancel = status === "REQUESTED";
                  const isCancelling = cancellingId === booking.id;

                  return (
                    <article
                      key={booking.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h3 className="text-base font-bold">
                              {booking.category?.name || "Service Request"}
                            </h3>

                            <span
                              className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                                statusStyles[booking.status] ||
                                "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                              }`}
                            >
                              {status.replaceAll("_", " ")}
                            </span>
                          </div>

                          {booking.service?.name && (
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                              {booking.service.name}
                            </p>
                          )}

                          <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                            <div>
                              <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Wrench className="h-3.5 w-3.5" />
                                Technician
                              </p>
                              <p className="mt-1.5 font-medium">
                                {booking.technician?.name ||
                                  "Awaiting assignment"}
                              </p>
                            </div>

                            <div>
                              <p className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                <Calendar className="h-3.5 w-3.5" />
                                Scheduled Date
                              </p>
                              <p className="mt-1.5 font-medium">
                                {booking.scheduledDate
                                  ? new Date(
                                      booking.scheduledDate
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "Not scheduled"}
                              </p>
                            </div>

                            <div className="sm:col-span-2">
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                Service Address
                              </p>
                              <p className="mt-1.5 break-words font-medium">
                                {booking.address || "Address not available"}
                              </p>
                            </div>
                          </div>

                          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Total Amount
                            </p>
                            <p className="mt-1 text-xl font-extrabold">
                              ৳
                              {Number(booking.totalAmount || 0).toLocaleString(
                                "en-BD"
                              )}
                            </p>
                          </div>
                        </div>

                        {/* Booking actions */}
                        <div className="flex flex-wrap gap-2 sm:max-w-44 sm:justify-end">
                          {status === "ACCEPTED" && (
                            <Link
                              href={`/dashboard/customer/bookings/${booking.id}/pay`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
                            >
                              <CreditCard className="h-4 w-4" />
                              Pay Now
                            </Link>
                          )}

                          {status === "COMPLETED" && (
                            <Link
                              href={`/dashboard/customer/review?bookingId=${booking.id}`}
                              className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-amber-600"
                            >
                              Leave Review
                            </Link>
                          )}

                          {canCancel && (
                            <button
                              type="button"
                              disabled={isCancelling}
                              onClick={() => handleCancel(booking.id)}
                              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40"
                            >
                              {isCancelling && (
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                              )}
                              {isCancelling
                                ? "Cancelling..."
                                : "Cancel Request"}
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardPage;
