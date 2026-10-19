
"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
  ReceiptText,
  Wallet,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

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

const CUSTOMER_DASHBOARD_URL = "/dashboard/customer";

const statusConfig = {
  COMPLETED: {
    icon: CheckCircle2,
    label: "Completed",
    color: "text-emerald-700 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
  PENDING: {
    icon: Clock,
    label: "Pending",
    color: "text-amber-700 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  FAILED: {
    icon: XCircle,
    label: "Failed",
    color: "text-red-700 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-500/10",
    border: "border-red-200 dark:border-red-500/20",
  },
};

const formatAmount = (amount: number) =>
  `৳${Number(amount || 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (date: string | null) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function BackToDashboard() {
  return (
    <Link
      href={CUSTOMER_DASHBOARD_URL}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:text-emerald-400"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Dashboard
    </Link>
  );
}

const PaymentPage = () => {
  const {
    data: payments,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<Payment[]>({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const result = await getMyPayments();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });

  const paymentList = payments ?? [];

  const completedPayments = paymentList.filter(
    (payment) => payment.status === "COMPLETED"
  );

  const pendingPayments = paymentList.filter(
    (payment) => payment.status === "PENDING"
  );

  const totalPaid = completedPayments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  if (isLoading) {
    return (
      <main className="mx-auto w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-8 w-56 rounded-lg bg-slate-200 dark:bg-slate-800" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <BackToDashboard />
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-500/20 dark:bg-red-500/5">
          <XCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />

          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Unable to load payment history
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Something went wrong while fetching your payments. Please try
            again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-6">
        <BackToDashboard />
      </div>

      <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <CreditCard className="h-4 w-4" />
            Customer Dashboard
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Payment History
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
            Review your service payments, transaction dates, and payment
            statuses in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:text-emerald-400"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </section>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Transactions
              </p>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {paymentList.length}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                All recorded payments
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
              <ReceiptText className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Paid
              </p>
              <p className="mt-3 break-words text-2xl font-bold text-slate-900 dark:text-white">
                {formatAmount(totalPaid)}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Completed transactions only
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3 dark:bg-blue-500/10">
              <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Pending Payments
              </p>
              <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                {pendingPayments.length}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Awaiting completion
              </p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 dark:bg-amber-500/10">
              <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
            Recent Transactions
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {paymentList.length}{" "}
            {paymentList.length === 1 ? "transaction" : "transactions"} found
          </p>
        </div>

        {paymentList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center dark:border-slate-700 dark:bg-slate-900/60">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
              <CreditCard className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              No payments yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              Your service payment records will appear here once payments are
              created for your bookings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2">
            {paymentList.map((payment) => {
              const config = statusConfig[payment.status];
              const StatusIcon = config.icon;

              return (
                <article
                  key={payment.id}
                  className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="shrink-0 rounded-xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
                        <CreditCard className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="break-words font-semibold leading-6 text-slate-900 dark:text-white">
                          {payment.booking?.address || "Service Payment"}
                        </p>
                        <p className="mt-1 break-all text-xs text-slate-500 dark:text-slate-400">
                          Transaction ID: {payment.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.color} ${config.border}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {config.label}
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Payment Amount
                    </p>
                    <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                      {formatAmount(Number(payment.amount))}
                    </p>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Payment Method
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-200">
                        {payment.method || "Not specified"}
                      </p>
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Payment Provider
                      </p>
                      <p className="mt-1 break-words text-sm font-medium text-slate-800 dark:text-slate-200">
                        {payment.provider || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {payment.paidAt ? "Paid on" : "Created on"}
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {formatDate(payment.paidAt || payment.createdAt)}
                      </p>
                    </div>

                    {payment.booking?.id && (
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        Booking linked
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
};

export default PaymentPage;
