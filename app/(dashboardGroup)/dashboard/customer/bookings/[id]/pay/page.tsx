"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { createPayment } from "@/app/(dashboardGroup)/-actions/payment";


export default function PaymentPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handlePayment = async () => {
    setErrorMsg("");
    setIsProcessing(true);

    const result = await createPayment(bookingId);

    if (result.success && result.data?.checkoutUrl) {
      window.location.href = result.data.checkoutUrl;
    } else {
      setErrorMsg(result.message || "Failed to start payment");
      setIsProcessing(false);
    }
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Complete Your Payment
        </h1>
        <p className="text-slate-500 mb-8">
          You'll be redirected to our secure payment provider (Stripe) to complete this transaction.
        </p>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {errorMsg}
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition disabled:opacity-50"
        >
          {isProcessing ? "Redirecting..." : "Proceed to Payment"}
        </button>
      </div>
    </section>
  );
}