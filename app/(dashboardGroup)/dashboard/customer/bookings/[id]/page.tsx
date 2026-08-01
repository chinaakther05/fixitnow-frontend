"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { createBooking } from "@/actions/booking";

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
      setErrorMsg("Please fill all required fields");
      return;
    }

    if (!technician) {
      setErrorMsg("Technician data not loaded yet");
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      technicianId: technician.userId,
      categoryId: technician.services?.[0]?.category?.id,
      serviceId: technician.services?.[0]?.id,
      scheduledDate: new Date(date).toISOString(),
      address,
      notes: problem,
      totalAmount: technician.hourlyRate || 0,
    };

    const result = await createBooking(bookingData);

    setIsSubmitting(false);

    if (result.success) {
      alert("Booking created successfully");
      router.push("/dashboard/customer/bookings");
    } else {
      setErrorMsg(result.message || "Booking failed");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading technician...
      </div>
    );
  }

  if (isError || !technician) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Technician not found
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Book {technician.user?.name}
          </h1>
          <p className="text-slate-500 mt-2">
            Confirm your service booking details
          </p>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-5 mb-6">
          <h2 className="font-semibold text-lg">Technician Information</h2>
          <p className="mt-2">{technician.user?.name}</p>
          <p className="text-slate-500">{technician.skills?.join(", ")}</p>
          <p className="font-bold text-blue-600 mt-2">
            ৳ {technician.hourlyRate}/hr
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
            {errorMsg}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Booking Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Service Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Problem Description</label>
            <textarea
              rows={5}
              placeholder="Describe your problem"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div className="flex justify-between items-center bg-blue-50 rounded-xl p-4">
            <span>Total Amount</span>
            <span className="text-2xl font-bold text-blue-600">
              ৳ {technician.hourlyRate}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBooking}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </section>
  );
}