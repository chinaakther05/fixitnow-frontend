
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Users,
  CalendarDays,
  Wallet,
  Wrench,
  ArrowUpRight,
  ClipboardList,
  CheckCircle2,
  Clock3,
  AlertCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { getAllBookingsAdmin, getAllUsers } from "../../-actions/admin";

interface AdminBooking {
  id?: string;
  status: string;
  totalAmount: number;
}

const ACTIVE_STATUSES = ["ACCEPTED", "PAID", "IN_PROGRESS"];

const formatCurrency = (amount: number) =>
  `৳${Number(amount || 0).toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  })}`;

const statusStyles: Record<string, string> = {
  PENDING:
    "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  ACCEPTED:
    "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  PAID:
    "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  IN_PROGRESS:
    "bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-400",
  COMPLETED:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  CANCELLED:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  FAILED:
    "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const AdminDashboardPage = () => {
  const {
    data: users,
    isLoading: loadingUsers,
    isError: usersError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const result = await getAllUsers();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });

  const {
    data: bookings,
    isLoading: loadingBookings,
    isError: bookingsError,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const result = await getAllBookingsAdmin();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });

  const isLoading = loadingUsers || loadingBookings;
  const hasError = usersError || bookingsError;

  const userList = users ?? [];
  const bookingList: AdminBooking[] = bookings ?? [];

  const totalUsers = userList.length;
  const totalBookings = bookingList.length;

  const completedBookings = bookingList.filter(
    (booking) => booking.status === "COMPLETED"
  );

  const totalRevenue = completedBookings.reduce(
    (sum, booking) => sum + Number(booking.totalAmount || 0),
    0
  );

  const activeBookings = bookingList.filter((booking) =>
    ACTIVE_STATUSES.includes(booking.status)
  ).length;

  const pendingBookings = bookingList.filter(
    (booking) => booking.status === "PENDING"
  ).length;

  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      description: "Registered platform users",
      icon: Users,
      iconColor: "text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-50 dark:bg-blue-500/10",
      accent: "from-blue-500 to-cyan-500",
    },
    {
      label: "Total Bookings",
      value: totalBookings.toLocaleString(),
      description: "All service requests",
      icon: CalendarDays,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      accent: "from-amber-500 to-orange-500",
    },
    {
      label: "Active Bookings",
      value: activeBookings.toLocaleString(),
      description: "Accepted, paid or in progress",
      icon: Wrench,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      label: "Completed Revenue",
      value: formatCurrency(totalRevenue),
      description: "From completed bookings",
      icon: Wallet,
      iconColor: "text-violet-600 dark:text-violet-400",
      iconBg: "bg-violet-50 dark:bg-violet-500/10",
      accent: "from-violet-500 to-purple-500",
    },
  ];

  const bookingStatusItems = [
    {
      label: "Pending",
      count: pendingBookings,
      color: "bg-amber-500",
      icon: Clock3,
    },
    {
      label: "Active",
      count: activeBookings,
      color: "bg-blue-500",
      icon: Wrench,
    },
    {
      label: "Completed",
      count: completedBookings.length,
      color: "bg-emerald-500",
      icon: CheckCircle2,
    },
  ];

  const handleRefresh = async () => {
    await Promise.all([refetchUsers(), refetchBookings()]);
  };

  return (
    <main className="min-w-0 space-y-8 pb-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-48 w-48 rounded-full bg-teal-300/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-50 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4" />
              Administration Center
            </div>

            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/90 sm:text-base">
              Monitor users, manage service activity, and review your
              platform&apos;s performance from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isLoading}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60 sm:self-center"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh Data
          </button>
        </div>
      </section>

      {/* Error message */}
      {hasError && (
        <section
          role="alert"
          className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/20 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <h2 className="font-semibold text-red-800 dark:text-red-300">
                Some dashboard data could not be loaded
              </h2>
              <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                Please check your connection and try refreshing the data.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900 dark:bg-slate-900 dark:text-red-300"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        </section>
      )}

      {/* Overview heading */}
      <section>
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Platform Overview
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Key metrics based on the data currently available.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Dashboard summary
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-5 h-8 w-36 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 h-3 w-40 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`}
                  />

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>

                      <p className="mt-3 break-words text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`shrink-0 rounded-2xl p-3 ${stat.iconBg} ${stat.iconColor} transition-transform group-hover:scale-105`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    {stat.description}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Booking activity */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-3">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-500/10">
              <ClipboardList className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Booking Overview
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Current distribution by status
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="mb-2 h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {bookingStatusItems.map((item) => {
                const Icon = item.icon;
                const percentage =
                  totalBookings > 0
                    ? Math.min((item.count / totalBookings) * 100, 100)
                    : 0;

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.count}
                        <span className="ml-1 text-xs font-normal text-slate-400">
                          ({percentage.toFixed(0)}%)
                        </span>
                      </span>
                    </div>

                    <div
                      className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                      role="progressbar"
                      aria-label={`${item.label} bookings`}
                      aria-valuemin={0}
                      aria-valuemax={totalBookings || 1}
                      aria-valuenow={item.count}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}

              {totalBookings === 0 && (
                <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                  No bookings are available to summarize yet.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Quick summary */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 dark:bg-blue-500/10">
              <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                At a Glance
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Quick platform summary
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Registered users
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {totalUsers}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Awaiting action
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {pendingBookings}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    Completed services
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {completedBookings.length}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboardPage;
