"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react";
import { getMyPayments } from "@/app/(dashboardGroup)/-actions/payment";


type Payment = {
  id: string;
  amount: number;
  method: string;
  provider: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
  paidAt: string | null;
  createdAt: string;
  booking?: {
    id: string;
    address: string;
  };
};

const statusConfig = {
  COMPLETED: { icon: CheckCircle2, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/40" },
  PENDING: { icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/40" },
  FAILED: { icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/40" },
};

const PaymentPage = () => {
  const { data: payments, isLoading, isError } = useQuery<Payment[]>({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const result = await getMyPayments();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-red-500">
        Failed to load payment history. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Payment History</h1>
        <p className="text-muted-foreground mt-1">
          Track all your payments for booked services.
        </p>
      </div>

      {!payments || payments.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No payments yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((payment) => {
            const config = statusConfig[payment.status];
            const StatusIcon = config.icon;

            return (
              <div
                key={payment.id}
                className="bg-card border border-border rounded-xl p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl ${config.bg}`}>
                    <StatusIcon className={`w-5 h-5 ${config.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {payment.booking?.address || "Service Payment"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      via {payment.provider} • {payment.method}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : new Date(payment.createdAt).toLocaleDateString("en-US")}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-foreground">৳{payment.amount}</p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}
                  >
                    {payment.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;