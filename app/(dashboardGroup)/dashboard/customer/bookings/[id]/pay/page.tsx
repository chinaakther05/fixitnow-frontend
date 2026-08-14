"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { createPayment } from "@/app/(dashboardGroup)/-actions/payment";
import { Loader2 } from "lucide-react";

export default function PaymentPage() {
  const params = useParams();
  const bookingId = params?.id as string;

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePayment = async () => {
    
    if (!bookingId) {
      setErrorMsg("Invalid Booking ID. Please refresh or try again.");
      return;
    }

    setErrorMsg("");
    setIsProcessing(true);

    try {
      const result = await createPayment(bookingId);

      if (result?.success && result?.data?.checkoutUrl) {
        
        window.location.assign(result.data.checkoutUrl);
      } else {
        setErrorMsg(result?.message || "Failed to start payment processing");
        setIsProcessing(false);
      }
    } catch (error: unknown) {
      setErrorMsg(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setIsProcessing(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Complete Your Payment
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
          You will be redirected to our secure payment provider to complete this transaction.
        </p>

        {errorMsg && (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing || !bookingId}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Redirecting to Gateway...
            </>
          ) : (
            "Proceed to Payment"
          )}
        </button>
      </div>
    </section>
  );
}