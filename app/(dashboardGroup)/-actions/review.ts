"use server";

import { cookies } from "next/headers";

export const createReview = async (payload: {
  bookingId: string;
  rating: number;
  comment: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Please login to continue" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to submit review" };
  }
};