"use client";

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { getTechnicianBookings } from '@/actions/booking';
// TODO: আপনার প্রজেক্টের সঠিক path অনুযায়ী updateTechnicianAvailability ইম্পোর্ট করুন
// import { updateTechnicianAvailability, getTechnicianProfile } from '@/actions/technician'; 
import { Booking } from '@/types/booking';
import { statusStyles } from '@/lib/statusColors';
import { 
    LayoutDashboard, 
    CalendarCheck, 
    Clock, 
    Banknote, 
    Briefcase, 
    ArrowRight, 
    AlertCircle,
    CheckCircle2,
    Power,
    Loader2
} from 'lucide-react';

const TechnicianDashboardPage = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'upcoming' | 'completed'>('overview');
    const [isAvailable, setIsAvailable] = useState<boolean>(true); // Local availability state
    const queryClient = useQueryClient();

    // Fetch Bookings Data
    const { data: bookings, isLoading, isError } = useQuery<Booking[]>({
        queryKey: ['techniciand-bookings'],
        queryFn: async () => {
            const result = await getTechnicianBookings();
            if (!result?.success) throw new Error(result?.message || 'Failed to fetch bookings');
            return result.data || [];
        },
    });

    // Toggle Availability Mutation (Server Action Call)
    const toggleAvailabilityMutation = useMutation({
        mutationFn: async (newStatus: boolean) => {
            // Server Action Call Here
            // return await updateTechnicianAvailability(newStatus);
            return { success: true }; 
        },
        onSuccess: () => {
            // Real-time update confirm হওয়ার পর React Query cache invalidate করতে পারেন
            queryClient.invalidateQueries({ queryKey: ['technician-profile'] });
        },
        onError: () => {
            // Error হলে state রোডব্যাক করা
            setIsAvailable((prev) => !prev);
        }
    });

    const handleToggleAvailability = () => {
        const nextStatus = !isAvailable;
        setIsAvailable(nextStatus);
        toggleAvailabilityMutation.mutate(nextStatus);
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="animate-pulse flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-64 h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                            ))}
                        </div>
                        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !bookings) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full border bg-white dark:bg-slate-900 border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 rounded-2xl p-8 text-center shadow-xl">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <p className="font-bold text-lg mb-1 text-slate-900 dark:text-slate-100">Failed to load dashboard</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Could not retrieve technician data. Please try again later.</p>
                </div>
            </div>
        );
    }

    // Calculations & Safe Filtering
    const pendingRequestsList = bookings.filter((b) => b.status?.toUpperCase() === 'REQUESTED');
    const upcomingJobsList = bookings.filter((b) =>
        ['ACCEPTED', 'PAID', 'IN_PROGRESS'].includes(b.status?.toUpperCase() || '')
    );
    const completedJobsList = bookings.filter((b) => b.status?.toUpperCase() === 'COMPLETED');

    const pendingRequests = pendingRequestsList.length;
    const upcomingJobs = upcomingJobsList.length;
    const totalEarnings = completedJobsList.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

    // Active tab filtered bookings
    const getDisplayedBookings = () => {
        if (activeTab === 'pending') return pendingRequestsList;
        if (activeTab === 'upcoming') return upcomingJobsList;
        if (activeTab === 'completed') return completedJobsList;
        
        return [...bookings]
            .sort((a, b) => {
                const dateA = a.scheduledDate ? new Date(a.scheduledDate).getTime() : 0;
                const dateB = b.scheduledDate ? new Date(b.scheduledDate).getTime() : 0;
                return dateB - dateA;
            })
            .slice(0, 5);
    };

    const displayedBookings = getDisplayedBookings();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row gap-8">
                    
                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 shrink-0 border bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 h-fit shadow-sm backdrop-blur-sm">
                        
                        {/* Header & Availability Section */}
                        <div className="mb-6 px-1 space-y-3">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Technician Portal
                            </h2>

                            {/* Availability Toggle Box */}
                            <div className="p-3.5 rounded-xl border bg-slate-50 dark:bg-slate-800/50 border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                    <span className={`relative flex h-3 w-3`}>
                                        {isAvailable && (
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        )}
                                        <span className={`relative inline-flex rounded-full h-3 w-3 ${isAvailable ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold leading-none text-slate-800 dark:text-slate-200">
                                            {isAvailable ? 'Available' : 'Unavailable'}
                                        </p>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                            {isAvailable ? 'Receiving jobs' : 'Offline'}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleToggleAvailability}
                                    disabled={toggleAvailabilityMutation.isPending}
                                    className={`p-2 rounded-lg transition-all duration-200 ${
                                        isAvailable
                                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400 hover:bg-emerald-200'
                                            : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-300'
                                    }`}
                                    title="Toggle Availability Status"
                                >
                                    {toggleAvailabilityMutation.isPending ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Power className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <nav className="space-y-1.5">
                            <button
                                type="button"
                                onClick={() => setActiveTab('overview')}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === 'overview'
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-semibold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                Overview
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
                                Pending Requests
                                {pendingRequests > 0 && (
                                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold">
                                        {pendingRequests}
                                    </span>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab('upcoming')}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                    activeTab === 'upcoming'
                                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20 font-semibold'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                            >
                                <Briefcase className="w-4 h-4" />
                                Upcoming Jobs
                                <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                                    activeTab === 'upcoming' ? 'bg-emerald-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}>
                                    {upcomingJobs}
                                </span>
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
                                Completed Jobs
                            </button>
                        </nav>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <Link
                                href="/dashboard/technician/bookings"
                                className="w-full flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 text-xs font-semibold py-2.5 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                            >
                                View All Bookings
                            </Link>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                                Technician <span className="text-emerald-600 dark:text-emerald-400">Dashboard</span>
                            </h1>
                            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                                Real-time overview of your service requests, jobs, and earnings.
                            </p>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pending Requests</p>
                                    <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white mt-3">
                                    {pendingRequests}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Upcoming Jobs</p>
                                    <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                                        <Briefcase className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white mt-3">
                                    {upcomingJobs}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Total Earnings</p>
                                    <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
                                        <Banknote className="w-4 h-4" />
                                    </div>
                                </div>
                                <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-3">
                                    ৳{totalEarnings}
                                </p>
                            </div>
                        </div>

                        {/* Recent / Filtered Bookings */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {activeTab === 'overview' && 'Recent Bookings'}
                                    {activeTab === 'pending' && 'Pending Requests'}
                                    {activeTab === 'upcoming' && 'Upcoming Jobs'}
                                    {activeTab === 'completed' && 'Completed Jobs'}
                                </h2>
                                <Link
                                    href="/dashboard/technician/bookings"
                                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                                >
                                    View All <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {displayedBookings.length === 0 ? (
                                <div className="text-center py-16 bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
                                    <CalendarCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                                    <p className="text-base font-semibold text-slate-800 dark:text-slate-200">No bookings available</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">There are no records matching the selected view.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {displayedBookings.map((booking) => {
                                        const currentStatus = booking.status || 'PENDING';
                                        const badgeClass = statusStyles[currentStatus] || 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
                                        
                                        return (
                                            <div
                                                key={booking.id}
                                                className="group bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm"
                                            >
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                            {booking.customer?.name || 'Customer Request'}
                                                        </p>
                                                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                                                            {currentStatus}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                                        Date: {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                                    </p>
                                                    {booking.address && (
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                                                            Address: {booking.address}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 dark:border-slate-800">
                                                    <span className="text-base font-black text-slate-900 dark:text-slate-100">
                                                        ৳{booking.totalAmount || 0}
                                                    </span>
                                                    <Link
                                                        href="/dashboard/technician/bookings"
                                                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/60 transition-colors"
                                                    >
                                                        Manage
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TechnicianDashboardPage;