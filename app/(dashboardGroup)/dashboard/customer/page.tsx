"use client";

import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'sonner';
import { getMyBookings, cancelBooking } from '@/actions/booking';
import { Booking } from '@/types/booking';
import { statusStyles } from '@/lib/statusColors';
import { Calendar, Clock, CreditCard, LayoutDashboard, CheckCircle2, AlertCircle, Receipt } from 'lucide-react';

const CustomerDashboardPage = () => {
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

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

    const filteredBookings = bookings?.filter((b) => {
        const status = b.status?.toUpperCase();
        if (activeTab === 'pending') {
            return status === 'REQUESTED' || status === 'ACCEPTED' || status === 'PENDING';
        }
        if (activeTab === 'completed') {
            return status === 'COMPLETED';
        }
        return true;
    });

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="animate-pulse flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full border bg-white dark:bg-slate-900 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 rounded-2xl p-8 text-center shadow-xl">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="font-bold text-lg mb-1 text-slate-900 dark:text-slate-100">Failed to load bookings</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Please check your network connection and try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar navigation */}
                    <aside className="w-full md:w-64 shrink-0 border bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 h-fit shadow-sm backdrop-blur-sm">
                        <div className="mb-6 px-2">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Dashboard Menu
                            </h2>
                        </div>

                        <nav className="space-y-1.5">
                            <button
                                type="button"
                                onClick={() => setActiveTab('all')}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === 'all'
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-semibold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                All Bookings
                                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                                    activeTab === 'all' ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}>
                                    {bookings?.length || 0}
                                </span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('pending')}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === 'pending'
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-semibold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                            >
                                <Clock className="w-4 h-4" />
                                Pending Services
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('completed')}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === 'completed'
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-semibold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Completed
                            </button>

                          
                            <Link
                                href="/dashboard/customer/payments"
                                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                            >
                                <Receipt className="w-4 h-4" />
                                Payment History
                            </Link>
                        </nav>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Link
                                href="/services"
                                className="w-full flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold py-2.5 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                            >
                                Book New Service
                            </Link>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                My <span className="text-emerald-600 dark:text-emerald-400">Bookings</span>
                            </h1>
                            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                                Track and manage all your home service requests.
                            </p>
                        </div>

                        {!filteredBookings || filteredBookings.length === 0 ? (
                            <div className="text-center py-20 border rounded-2xl p-8 bg-white dark:bg-slate-900/50 border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                                <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                <p className="text-base font-semibold mb-1 text-slate-800 dark:text-slate-200">No bookings found</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">You haven't requested any services in this section yet.</p>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-500 transition-colors shadow-md shadow-emerald-600/20"
                                >
                                    Browse Services
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredBookings.map((booking) => (
                                    <div
                                        key={booking.id}
                                        className="group border rounded-2xl p-5 bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                                    >
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {booking.category?.name || 'Service Request'}
                                                </h3>
                                                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusStyles[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pt-1 text-xs text-slate-500 dark:text-slate-400">
                                                <p><span className="font-medium text-slate-700 dark:text-slate-300">Technician:</span> {booking.technician?.name || 'Assigned Expert'}</p>
                                                <p><span className="font-medium text-slate-700 dark:text-slate-300">Date:</span> {new Date(booking.scheduledDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                <p className="sm:col-span-2 line-clamp-1"><span className="font-medium text-slate-700 dark:text-slate-300">Address:</span> {booking.address}</p>
                                            </div>

                                            <p className="text-sm font-black text-slate-900 dark:text-slate-100 pt-1">
                                                ৳{booking.totalAmount}
                                            </p>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex sm:flex-col md:flex-row gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                                            {booking.status === 'ACCEPTED' && (
                                                <Link
                                                    href={`/dashboard/customer/bookings/${booking.id}/pay`}
                                                    className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-500 transition-colors shadow-sm shadow-emerald-600/20"
                                                >
                                                    <CreditCard className="w-3.5 h-3.5" />
                                                    Pay Now
                                                </Link>
                                            )}

                                            {booking.status === 'COMPLETED' && (
                                                <Link
                                                    href={`/dashboard/customer/review?bookingId=${booking.id}`}
                                                    className="inline-flex items-center justify-center bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/20"
                                                >
                                                    Leave Review
                                                </Link>
                                            )}

                                            {(booking.status === 'REQUESTED' || booking.status === 'ACCEPTED') && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleCancel(booking.id)}
                                                    className="inline-flex items-center justify-center border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/60 text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboardPage;