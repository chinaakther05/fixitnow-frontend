"use server";

import { cookies } from "next/headers";

export const getMyBookings = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated", data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to fetch bookings", data: [] };
  }
};



export const cancelBooking = async (bookingId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/bookings/${bookingId}/cancel`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      console.error("Cancel booking API error:", res.status, result);
      return {
        success: false,
        message: result.message || "Failed to cancel booking",
      };
    }

    return result;
  } catch (error) {
    console.error("Cancel booking error:", error);
    return { success: false, message: "Failed to cancel booking" };
  }
};
