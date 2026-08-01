"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getTechnicianBookings } from '@/actions/booking';
import { Booking } from '@/types/booking';
import { statusStyles } from '@/lib/statusColors';

const TechnicianDashboardPage = () => {
    const { data: bookings, isLoading, isError } = useQuery<Booking[]>({
        queryKey: ['technician-bookings'],
        queryFn: async () => {
            const result = await getTechnicianBookings();
            if (!result.success) throw new Error(result.message);
            return result.data;
        },
    });

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="animate-pulse grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-28 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError || !bookings) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center text-red-500">
                Failed to load dashboard data.
            </div>
        );
    }

    const pendingRequests = bookings.filter((b) => b.status === 'REQUESTED').length;
    const upcomingJobs = bookings.filter((b) =>
        ['ACCEPTED', 'PAID', 'IN_PROGRESS'].includes(b.status)
    ).length;
    const totalEarnings = bookings
        .filter((b) => b.status === 'COMPLETED')
        .reduce((sum, b) => sum + b.totalAmount, 0);

    const recentBookings = [...bookings]
        .sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime())
        .slice(0, 5);

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Overview of your jobs and earnings.
                </p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                    <p className="text-sm text-slate-400 dark:text-slate-500">Pending Requests</p>
                    <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                        {pendingRequests}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                    <p className="text-sm text-slate-400 dark:text-slate-500">Upcoming Jobs</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                        {upcomingJobs}
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
                    <p className="text-sm text-slate-400 dark:text-slate-500">Total Earnings</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                        ৳{totalEarnings}
                    </p>
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Recent Bookings
                </h2>
                <Link
                    href="/dashboard/technician/bookings"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                    View All →
                </Link>
            </div>

            {recentBookings.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <p className="text-slate-400">No bookings yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {recentBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between"
                        >
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {booking.customer?.name}
                                </p>
                                <p className="text-sm text-slate-400 dark:text-slate-500">
                                    {new Date(booking.scheduledDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="font-medium text-slate-900 dark:text-white">
                                    ৳{booking.totalAmount}
                                </span>
                                <span
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[booking.status]}`}
                                >
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TechnicianDashboardPage;