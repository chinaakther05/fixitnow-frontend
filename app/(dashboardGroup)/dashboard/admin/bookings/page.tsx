"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

const AdminBookingPage = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data: bookings, isLoading, isError } = useQuery<AdminBooking[]>({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const result = await getAllBookingsAdmin();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  const statuses = ["ALL", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  const filteredBookings = bookings?.filter(
    (b) => statusFilter === "ALL" || b.status === statusFilter
  );

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center text-red-500">
        Failed to load bookings.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Booking Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Monitor all bookings across the platform.
        </p>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-left">
            <tr>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Technician</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {!filteredBookings || filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-slate-400">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-5 py-3 text-slate-900 dark:text-white">
                    {booking.customer?.name}
                  </td>
                  <td className="px-5 py-3 text-slate-900 dark:text-white">
                    {booking.technician?.name}
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {booking.category?.name}
                  </td>
                  <td className="px-5 py-3 text-slate-500 dark:text-slate-400">
                    {new Date(booking.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-slate-900 dark:text-white">
                    ৳{booking.totalAmount}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[booking.status]}`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookingPage;