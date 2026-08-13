"use client";

import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTechnicianBookings, updateBookingStatus } from '@/actions/booking';
import { Booking } from '@/types/booking';
import { statusStyles } from '@/lib/statusColors';
import { RefreshCw } from 'lucide-react';

const TechnicianBookingPage = () => {
  const queryClient = useQueryClient();

  const { data: bookings, isLoading, isError, refetch, isFetching } = useQuery<Booking[]>({
    queryKey: ['techniciand-bookings'],
    queryFn: async () => {
      const result = await getTechnicianBookings();
      if (!result?.success) throw new Error(result?.message || 'Failed to fetch');
      return result.data ;
    },
    staleTime: 0, 
    refetchOnWindowFocus: true, 
  });

 
  const mutation = useMutation({
    mutationFn: ({ bookingId, status }: { bookingId: string; status: string }) =>
      updateBookingStatus(bookingId, status),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['techniciand-bookings'] });
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
            <div key={i} className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-red-500">
        <p className="font-semibold text-lg mb-3">Failed to load bookings.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Booking Requests
        </h1>
        {/* Instant Manual Refetch Button */}
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-secondary hover:bg-secondary/80 border border-border text-foreground rounded-xl transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          {isFetching ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

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
                    {booking.customer?.name || 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3 text-slate-900 dark:text-white">
                    ৳{booking.totalAmount || 0}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        statusStyles[booking.status] || 'bg-slate-100 text-slate-700'
                      }`}
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
                            disabled={mutation.isPending}
                            className="bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-green-700 disabled:opacity-50"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusChange(booking.id, 'DECLINED')}
                            disabled={mutation.isPending}
                            className="bg-red-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-red-700 disabled:opacity-50"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {booking.status === 'PAID' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'IN_PROGRESS')}
                          disabled={mutation.isPending}
                          className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          Start Job
                        </button>
                      )}

                      {booking.status === 'IN_PROGRESS' && (
                        <button
                          onClick={() => handleStatusChange(booking.id, 'COMPLETED')}
                          disabled={mutation.isPending}
                          className="bg-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-50"
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