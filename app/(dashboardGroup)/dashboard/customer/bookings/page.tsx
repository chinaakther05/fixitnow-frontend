"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyBookings } from "@/actions/booking";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Loader2, RefreshCw, CheckCircle2, Clock, Wrench } from "lucide-react";

interface Booking {
  id: string;
  status: "REQUESTED" | "ACCEPTED" | "PAID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DECLINED";
  scheduledDate: string;
  address: string;
  notes?: string;
  totalAmount: number;
  technician?: {
    name: string;
    email: string;
    phone?: string;
  };
  category?: {
    name: string;
  };
}

export default function BookingPage() {
  const queryClient = useQueryClient();
  const [payingBookingId, setPayingBookingId] = useState<string | null>(null);
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const {
    data: bookings,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<Booking[]>({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const result = await getMyBookings();
      if (!result?.success) throw new Error(result?.message || "Failed to fetch bookings");
      return result.data;
    },
    staleTime: 0, // 🎯 ক্যাশ ডাটা পুরানো হওয়া প্রতিরোধ করবে
    refetchOnWindowFocus: true, // 🎯 অন্য ট্যাব থেকে আবার পেজে এলে অটো আপডেট হবে
  });

  // 💳 Handle Payment Request
  const handlePayment = async (bookingId: string) => {
    try {
      setPayingBookingId(bookingId);
      
      const res = await api.post("/payments/create", { bookingId });
      
      if (res.data?.data?.checkoutUrl) {
        window.location.assign(res.data.data.checkoutUrl);
      } else {
        toast.error("Failed to get payment checkout URL");
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || "Payment initiation failed");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Payment initiation failed");
      }
    } finally {
      setPayingBookingId(null);
    }
  };

  // ❌ Handle Cancel Booking Request
  const handleCancel = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setCancellingBookingId(bookingId);
      const res = await api.patch(`/bookings/${bookingId}/cancel`);

      if (res.data?.success || res.status === 200) {
        toast.success("Booking cancelled successfully");
        // 🎯 রিফ্রেচ এবং ক্যাশ ইনভ্যালিডেট একসাথে
        queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
        refetch();
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || "Cancellation failed");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Cancellation failed");
      }
    } finally {
      setCancellingBookingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center font-medium text-slate-600 flex justify-center items-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
        Loading bookings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-red-500 font-medium space-y-3">
        <p>Failed to load bookings</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-xl text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-slate-500 text-sm mt-1">Track and manage your service requests.</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 rounded-xl transition disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {!bookings || bookings.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          No bookings found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const isPaid = booking.status === "PAID";
            const isAccepted = booking.status === "ACCEPTED";
            const isRequested = booking.status === "REQUESTED";
            const isInProgress = booking.status === "IN_PROGRESS";
            const isCompleted = booking.status === "COMPLETED";
            const isCancelled = booking.status === "CANCELLED" || booking.status === "DECLINED";

            return (
              <div
                key={booking.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                      {booking.category?.name || "Service"}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        isCompleted || isPaid
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                          : isInProgress
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400"
                          : isAccepted
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                          : isRequested
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Technician:
                    <span className="font-medium text-slate-900 dark:text-slate-100 ml-1">
                      {booking.technician?.name || "Not assigned"}
                    </span>
                  </p>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Date:{" "}
                    {booking.scheduledDate
                      ? new Date(booking.scheduledDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    Address: {booking.address}
                  </p>

                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400 mt-4">
                    ৳ {booking.totalAmount}
                  </p>
                </div>

                {/* 🎯 Action Buttons */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  {/* Status: ACCEPTED */}
                  {isAccepted && (
                    <>
                      <button
                        onClick={() => handlePayment(booking.id)}
                        disabled={payingBookingId === booking.id}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-xl text-sm transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 disabled:opacity-50"
                      >
                        {payingBookingId === booking.id ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Redirecting...
                          </>
                        ) : (
                          "Pay Now"
                        )}
                      </button>

                      <button
                        onClick={() => handleCancel(booking.id)}
                        disabled={cancellingBookingId === booking.id}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 font-medium py-2.5 px-4 rounded-xl text-sm transition disabled:opacity-50"
                      >
                        {cancellingBookingId === booking.id ? "Cancelling..." : "Cancel"}
                      </button>
                    </>
                  )}

                  {/* Status: REQUESTED */}
                  {isRequested && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingBookingId === booking.id}
                      className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 font-medium py-2.5 px-4 rounded-xl text-sm transition disabled:opacity-50"
                    >
                      {cancellingBookingId === booking.id ? "Cancelling..." : "Cancel Request"}
                    </button>
                  )}

                  {/* Status: PAID */}
                  {isPaid && (
                    <div className="w-full flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 py-2.5 px-4 rounded-xl text-sm font-semibold border border-emerald-200 dark:border-emerald-800/50">
                      <CheckCircle2 className="w-4 h-4" /> Payment Completed
                    </div>
                  )}

                  {/* Status: IN_PROGRESS */}
                  {isInProgress && (
                    <div className="w-full flex items-center justify-center gap-2 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 py-2.5 px-4 rounded-xl text-sm font-semibold border border-purple-200 dark:border-purple-800/50">
                      <Wrench className="w-4 h-4 animate-bounce" /> Technician is Working
                    </div>
                  )}

                  {/* Status: COMPLETED */}
                  {isCompleted && (
                    <div className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 py-2.5 px-4 rounded-xl text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Service Completed
                    </div>
                  )}

                  {/* Status: CANCELLED / DECLINED */}
                  {isCancelled && (
                    <div className="w-full text-center bg-slate-50 dark:bg-slate-800/50 text-slate-400 py-2.5 px-4 rounded-xl text-sm font-medium">
                      Booking Cancelled / Declined
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}