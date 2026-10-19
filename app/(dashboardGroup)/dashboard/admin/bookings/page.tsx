"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  ClipboardList,
  Search,
  Users,
  Wrench,
} from "lucide-react";

import { statusStyles } from "@/lib/statusColors";
import { getAllBookingsAdmin } from "@/app/(dashboardGroup)/-actions/admin";

interface AdminBooking {
  id: string;
  status: string;
  scheduledDate: string;
  totalAmount: number;
  customer?: { name: string };
  technician?: { name: string };
  category?: { name: string };
}

const statuses = [
  "ALL",
  "REQUESTED",
  "ACCEPTED",
  "PAID",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

const AdminBookingPage = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: bookings = [],
    isLoading,
    isError,
  } = useQuery<AdminBooking[]>({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const result = await getAllBookingsAdmin();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });

  const filteredBookings = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "ALL" || booking.status === statusFilter;

      const matchesSearch =
        !search ||
        booking.customer?.name?.toLowerCase().includes(search) ||
        booking.technician?.name?.toLowerCase().includes(search) ||
        booking.category?.name?.toLowerCase().includes(search) ||
        booking.status.toLowerCase().includes(search);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, statusFilter, searchTerm]);

  const stats = useMemo(
    () => [
      {
        label: "Total Bookings",
        value: bookings.length,
        icon: ClipboardList,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-500/10",
      },
      {
        label: "Requested",
        value: bookings.filter((b) => b.status === "REQUESTED").length,
        icon: CalendarDays,
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 dark:bg-amber-500/10",
      },
      {
        label: "In Progress",
        value: bookings.filter((b) => b.status === "IN_PROGRESS").length,
        icon: Wrench,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-500/10",
      },
      {
        label: "Completed",
        value: bookings.filter((b) => b.status === "COMPLETED").length,
        icon: Users,
        color: "text-purple-600 dark:text-purple-400",
        bg: "bg-purple-50 dark:bg-purple-500/10",
      },
    ],
    [bookings]
  );

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number) =>
    `৳${Number(amount || 0).toLocaleString("en-BD")}`;

  const getStatusClass = (status: string) =>
    statusStyles[status] ??
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-3 py-6 sm:px-5 lg:px-8">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
            />
          ))}
        </div>

        <div className="h-80 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
          <ClipboardList size={26} />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
          Unable to load bookings
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] min-w-0 px-3 py-5 sm:px-5 sm:py-7 lg:px-8">
      {/* Page heading */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Administration
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Booking{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Management
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor and manage bookings across your platform.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          <ClipboardList
            size={16}
            className="text-emerald-600 dark:text-emerald-400"
          />
          <span>
            Showing{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {filteredBookings.length}
            </span>{" "}
            of {bookings.length}
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-900 sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                  {stat.label}
                </p>

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
                >
                  <Icon size={18} />
                </div>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Search and filters */}
      <section className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search customer, technician, category..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Filter by status
            </p>

            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => {
                const isActive = statusFilter === status;

                const count =
                  status === "ALL"
                    ? bookings.length
                    : bookings.filter((b) => b.status === status).length;

                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    aria-pressed={isActive}
                    className={`inline-flex max-w-full items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-emerald-700 dark:hover:text-emerald-400"
                    }`}
                  >
                    <span className="break-words">{status.replaceAll("_", " ")}</span>

                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop/tablet table: all columns fit within available width */}
        <div className="mt-5 hidden w-full min-w-0 md:block">
          <table className="w-full table-fixed border-collapse text-left text-xs lg:text-sm">
            <colgroup>
              <col className="w-[18%]" />
              <col className="w-[18%]" />
              <col className="w-[17%]" />
              <col className="w-[17%]" />
              <col className="w-[14%]" />
              <col className="w-[16%]" />
            </colgroup>

            <thead>
              <tr className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/70">
                {[
                  "Customer",
                  "Technician",
                  "Category",
                  "Date",
                  "Amount",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-2 py-3 font-semibold text-slate-500 dark:text-slate-400 lg:px-3"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-14 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    <ClipboardList
                      size={28}
                      className="mx-auto mb-3 opacity-50"
                    />
                    No bookings found.
                    <p className="mt-1 text-xs">
                      Try changing the search or status filter.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/80 dark:border-slate-800/80 dark:hover:bg-slate-800/30"
                  >
                    <td className="min-w-0 px-2 py-4 font-medium text-slate-900 dark:text-white lg:px-3">
                      <span className="block break-words">
                        {booking.customer?.name || "—"}
                      </span>
                    </td>

                    <td className="min-w-0 px-2 py-4 text-slate-700 dark:text-slate-300 lg:px-3">
                      <span className="block break-words">
                        {booking.technician?.name || "Not assigned"}
                      </span>
                    </td>

                    <td className="min-w-0 px-2 py-4 text-slate-600 dark:text-slate-400 lg:px-3">
                      <span className="block break-words">
                        {booking.category?.name || "—"}
                      </span>
                    </td>

                    <td className="px-2 py-4 text-slate-600 dark:text-slate-400 lg:px-3">
                      <span className="block break-words">
                        {formatDate(booking.scheduledDate)}
                      </span>
                    </td>

                    <td className="px-2 py-4 font-semibold text-slate-900 dark:text-white lg:px-3">
                      <span className="block break-words">
                        {formatAmount(booking.totalAmount)}
                      </span>
                    </td>

                    <td className="px-2 py-4 lg:px-3">
                      <span
                        className={`inline-block max-w-full break-words rounded-full px-2 py-1 text-[10px] font-semibold leading-4 lg:px-2.5 lg:text-xs ${getStatusClass(
                          booking.status
                        )}`}
                      >
                        {booking.status.replaceAll("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile layout: cards instead of horizontal scrolling */}
        <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 md:hidden">
          {filteredBookings.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
              <ClipboardList size={28} className="mx-auto mb-3 opacity-50" />
              No bookings found.
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <article
                key={booking.id}
                className="min-w-0 rounded-xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-slate-900 dark:text-white">
                      {booking.customer?.name || "Unknown customer"}
                    </p>

                    <p className="mt-1 break-words text-xs text-slate-500 dark:text-slate-400">
                      {booking.category?.name || "Uncategorized"}
                    </p>
                  </div>

                  <span
                    className={`max-w-[48%] shrink-0 break-words rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {booking.status.replaceAll("_", " ")}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Technician
                    </p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-200">
                      {booking.technician?.name || "Not assigned"}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Scheduled date
                    </p>
                    <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-200">
                      {formatDate(booking.scheduledDate)}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Total amount
                    </p>
                    <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
                      {formatAmount(booking.totalAmount)}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminBookingPage;