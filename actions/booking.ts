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



export const getTechnicianBookings = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated", data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to fetch bookings", data: [] };
  }
};

export const updateBookingStatus = async (bookingId: string, status: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/bookings/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to update booking status" };
  }
};