"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTechnicianBookings, updateBookingStatus } from '@/actions/booking';
import { Booking } from '@/types/booking';
import { statusStyles } from '@/lib/statusColors';

const TechnicianBookingPage = () => {
    const queryClient = useQueryClient();

    const { data: bookings, isLoading, isError } = useQuery<Booking[]>({
        queryKey: ['technician-bookings'],
        queryFn: async () => {
            const result = await getTechnicianBookings();
            if (!result.success) throw new Error(result.message);
            return result.data;
        },
    });

    const mutation = useMutation({
        mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) =>
            updateBookingStatus(bookingId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['technician-bookings'] });
        },
    });

    const handleStatusChange = (bookingId: string, status: string) => {
        mutation.mutate({ bookingId, status });
    };

    if (isLoading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-10">
                <div className="animate-pulse space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-20 text-center text-red-500">
                Failed to load bookings.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
                Booking Requests
            </h1>

            {!bookings || bookings.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <p className="text-slate-400">No booking requests yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-left">
                            <tr>
                                <th className="px-4 py-3 font-medium">Customer</th>
                                <th className="px-4 py-3 font-medium">Date</th>
                                <th className="px-4 py-3 font-medium">Amount</th>
                                <th className="px-4 py-3 font-medium">Status</th>
                                <th className="px-4 py-3 font-medium">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="border-t border-slate-100 dark:border-slate-800"
                                >
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">
                                        {booking.customer?.name}
                                    </td>
                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                                        {new Date(booking.scheduledDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-slate-900 dark:text-white">
                                        ৳{booking.totalAmount}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[booking.status]}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2">
                                            {booking.status === 'REQUESTED' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusChange(booking.id, 'ACCEPTED')}
                                                        className="bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-green-700"
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(booking.id, 'DECLINED')}
                                                        className="bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-700"
                                                    >
                                                        Decline
                                                    </button>
                                                </>
                                            )}

                                            {booking.status === 'PAID' && (
                                                <button
                                                    onClick={() => handleStatusChange(booking.id, 'IN_PROGRESS')}
                                                    className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700"
                                                >
                                                    Start Job
                                                </button>
                                            )}

                                            {booking.status === 'IN_PROGRESS' && (
                                                <button
                                                    onClick={() => handleStatusChange(booking.id, 'COMPLETED')}
                                                    className="bg-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-800"
                                                >
                                                    Complete
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TechnicianBookingPage;