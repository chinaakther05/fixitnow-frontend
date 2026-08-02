"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Calendar, ArrowRight, Loader2, AlertCircle } from "lucide-react";

function SuccessPaymentContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const transactionId = searchParams.get("transactionId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!transactionId) {
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        
        const res = await fetch("http://localhost:5000/api/v1/payments/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ transactionId }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to confirm payment");
        }
      } catch (err: unknown) {
        console.error("Payment Confirmation Error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, [transactionId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-500" />
        <p className="text-sm font-medium">Confirming your payment, please wait...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 text-center relative overflow-hidden">
        
        {/* Header Icon */}
        {error ? (
          <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/60 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600 dark:text-amber-400">
            <AlertCircle className="w-12 h-12" />
          </div>
        ) : (
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        )}

        {/* Status Text */}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {error ? "Payment Received" : "Payment Successful!"}
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
          {error
            ? "Your payment went through, but we are synchronizing your booking status."
            : "Thank you for your payment. Your booking has been confirmed."}
        </p>

        {/* Details Card */}
        {(bookingId || transactionId) && (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-left mb-6 space-y-2 border border-slate-100 dark:border-slate-800">
            {bookingId && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Booking ID:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[180px]">
                  {bookingId}
                </span>
              </div>
            )}
            {transactionId && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Transaction ID:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold truncate max-w-[180px]">
                  {transactionId}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/dashboard/customer/bookings"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            <Calendar className="w-4 h-4" />
            My Bookings
          </Link>
          <Link
            href="/"
            className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3 px-4 rounded-xl transition text-sm flex items-center justify-center gap-2"
          >
            Go Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <SuccessPaymentContent />
    </Suspense>
  );
}