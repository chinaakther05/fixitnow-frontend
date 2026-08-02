"use client";

import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'sonner';
import { getMyBookings, cancelBooking } from '@/actions/booking';
import { Booking } from '@/types/booking';
import { statusStyles } from '@/lib/statusColors';

const CustomerDashboardPage = () => {
    const queryClient = useQueryClient();

    const { data: bookings, isLoading, isError } = useQuery<Booking[]>({
        queryKey: ['my-bookings'],
        queryFn: async () => {
            const result = await getMyBookings();
            if (!result.success) throw new Error(result.message);
            return result.data;
        },
    });

    const handleCancel = async (bookingId: string) => {
        const confirmed = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmed) return;

        const result = await cancelBooking(bookingId);

        if (result.success) {
            toast.success("Booking cancelled successfully");
            queryClient.invalidateQueries({ queryKey: ['my-bookings'] });
        } else {
            toast.error(result.message || "Failed to cancel booking");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center text-red-500">
                Failed to load your bookings. Please try again later.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">My Bookings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Track and manage your service requests.</p>
            </div>

            {!bookings || bookings.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <p className="text-slate-400 mb-4">You have no bookings yet.</p>
                    <Link
                        href="/services"
                        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Browse Services
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                                        {booking.category?.name || 'Service'}
                                    </h3>
                                    <span
                                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[booking.status]}`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Technician: {booking.technician?.name}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Date: {new Date(booking.scheduledDate).toLocaleDateString('en-US')}
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Address: {booking.address}
                                </p>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                                    ৳{booking.totalAmount}
                                </p>
                            </div>

                            <div className="flex gap-2 flex-shrink-0">
                                {booking.status === 'ACCEPTED' && (
                                    <Link
                                        href={`/dashboard/customer/bookings/${booking.id}/pay`}
                                        className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Pay Now
                                    </Link>
                                )}

                                {booking.status === 'COMPLETED' && (
                                    <Link
                                        href={`/dashboard/customer/bookings/${booking.id}/review`}
                                        className="bg-amber-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
                                    >
                                        Leave Review
                                    </Link>
                                )}

                                {(booking.status === 'REQUESTED' || booking.status === 'ACCEPTED') && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        className="border border-red-300 text-red-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerDashboardPage;