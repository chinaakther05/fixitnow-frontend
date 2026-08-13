"use client";

import { useQuery } from "@tanstack/react-query";
import { Users, Calendar, DollarSign, Wrench } from "lucide-react";
import { getAllBookingsAdmin, getAllUsers } from "../../-actions/admin";

interface AdminBooking {
  status: string;
  totalAmount: number;
}

const AdminDashboardPage = () => {
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const result = await getAllUsers();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  const { data: bookings, isLoading: loadingBookings } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const result = await getAllBookingsAdmin();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  const isLoading = loadingUsers || loadingBookings;

  const totalUsers = users?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalRevenue =
    bookings
      ?.filter((b: AdminBooking) => b.status === "COMPLETED")
      .reduce((sum: number, b: AdminBooking) => sum + b.totalAmount, 0) || 0;
  const activeBookings =
    bookings?.filter((b: AdminBooking) =>
      ["ACCEPTED", "PAID", "IN_PROGRESS"].includes(b.status)
    ).length || 0;

  const stats = [
    { 
      label: "Total Users", 
      value: totalUsers, 
      icon: Users, 
      bg: "bg-blue-50 dark:bg-blue-950/50",
      text: "text-blue-600 dark:text-blue-400",
      isRevenue: false
    },
    { 
      label: "Total Bookings", 
      value: totalBookings, 
      icon: Calendar, 
      bg: "bg-amber-50 dark:bg-amber-950/50",
      text: "text-amber-600 dark:text-amber-400",
      isRevenue: false
    },
    { 
      label: "Active Bookings", 
      value: activeBookings, 
      icon: Wrench, 
      bg: "bg-emerald-50 dark:bg-emerald-950/50",
      text: "text-emerald-600 dark:text-emerald-400",
      isRevenue: false
    },
    { 
      label: "Total Revenue", 
      value: `৳${totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      bg: "bg-purple-50 dark:bg-purple-950/50",
      text: "text-purple-600 dark:text-purple-400",
      isRevenue: true
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Admin <span className="text-emerald-600 dark:text-emerald-400">Dashboard</span>
        </h1>
        <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
          Platform overview, real-time analytics and management.
        </p>
      </div>

      {/* Stats Cards Section */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {stat.label}
                  </p>
                  <div className={`p-2 rounded-xl ${stat.bg} ${stat.text}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <p className={`text-3xl font-black mt-3 ${stat.isRevenue ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'}`}>
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;