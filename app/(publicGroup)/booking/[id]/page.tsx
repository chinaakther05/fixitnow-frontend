"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { createBooking } from "@/actions/booking";
import toast from 'react-hot-toast';

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
      toast.success("Booking created successfully!");
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border p-8">
        <h1 className="text-3xl font-bold mb-2">Book {technician.user?.name}</h1>
        <p className="text-slate-500 mb-8">Complete your booking request below.</p>

        {errorMsg && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {errorMsg}
          </div>
        )}

        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea
              rows={4}
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Problem Description</label>
            <textarea
              rows={3}
              placeholder="Describe your problem..."
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          <button
            type="button"
            onClick={handleBooking}
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </section>
  );
}