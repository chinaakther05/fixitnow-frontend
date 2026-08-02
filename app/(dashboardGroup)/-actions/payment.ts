"use server";

import { cookies } from "next/headers";

export const createPayment = async (bookingId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Please login to make a payment" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingId }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to create payment session" };
  }
};