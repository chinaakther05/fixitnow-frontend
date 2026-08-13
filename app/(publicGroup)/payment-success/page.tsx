"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { confirmPayment } from "@/app/(dashboardGroup)/-actions/payment";
import { CheckCircle2, Loader2, AlertCircle, Calendar } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirm = async () => {
      if (!transactionId) {
        setLoading(false);
        return;
      }

      const result = await confirmPayment(transactionId);

      if (result.success) {
        setLoading(false);
      } else {
        setError(result.message || "Failed to confirm payment");
        setLoading(false);
      }
    };

    confirm();
  }, [transactionId]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-600">Confirming your payment, please wait...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 text-center">
        {error ? (
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12" />
          </div>
        ) : (
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        )}

        <h1 className="text-2xl font-bold mb-2">{error ? "Payment Sync Failed" : "Payment Successful!"}</h1>
        <p className="text-slate-500 text-sm mb-6">
          {error ? error : "Thank you for your payment. Your booking status has been updated to PAID."}
        </p>

        <div className="flex gap-3">
          <Link
            href="/dashboard/customer/bookings"
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" /> My Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin mx-auto my-20 text-blue-600" />}>
      <SuccessContent />
    </Suspense>
  );
}