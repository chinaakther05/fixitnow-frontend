"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { createBooking } from "@/actions/booking";
import toast from "react-hot-toast";
import { Calendar, MapPin, AlertCircle, Loader2, UserCheck, Wrench } from "lucide-react";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const technicianId = params.id as string;

  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [problem, setProblem] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: technician, isLoading, isError } = useQuery({
    queryKey: ["technician", technicianId],
    queryFn: async () => {
      const res = await api.get(`/technicians/${technicianId}`);
      return res.data.data;
    },
  });

  const handleBooking = async () => {
    setErrorMsg("");

    if (!date || !address) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!technician) {
      setErrorMsg("Technician data not loaded yet.");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      technicianId: technician.userId || technician.id,
      categoryId: technician.services?.[0]?.categoryId || technician.categoryId || "",
      serviceId: technician.services?.[0]?.id || technician.serviceId || "",
      scheduledDate: new Date(date).toISOString(),
      address,
      notes: problem,
      totalAmount: Number(technician.hourlyRate || 500),
    };

    try {
      const result = await createBooking(bookingData);

      if (result.success) {
        toast.success("Booking created successfully!");
        router.push("/dashboard/customer/bookings");
      } else {
        setErrorMsg(result.message || "Booking failed");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600 dark:text-blue-500" />
        <p className="text-sm font-medium">Loading technician details...</p>
      </div>
    );
  }

  if (isError || !technician) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-slate-950 px-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-950/50 rounded-full flex items-center justify-center text-red-600 dark:text-red-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Technician Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          The requested technician could not be loaded.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-950/60 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
              <UserCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Book {technician.user?.name || "Technician"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Complete your booking request below.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300">
            <Wrench className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Estimated Rate: <span className="font-semibold text-slate-900 dark:text-white">৳{technician.hourlyRate || 500}</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
          {errorMsg && (
            <div className="flex items-start gap-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm p-4 rounded-2xl mb-6">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }} className="space-y-6">
            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition text-sm"
                  required
                />
              </div>
            </div>

            {/* Service Address */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Service Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="Enter full address details..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition text-sm resize-none"
                required
              />
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Problem Description <span className="text-slate-400 text-xs font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Describe the issue you're facing..."
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-4 py-3.5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition text-sm resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 py-4 font-semibold text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-900/30 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Booking...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}