"use server";

import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated", data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to fetch users", data: [] };
  }
};

export const getAllBookingsAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated", data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to fetch bookings", data: [] };
  }
};



export const updateUserStatus = async (userId: string, status: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users/${userId}`, {
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
    return { success: false, message: "Failed to update user status" };
  }
};


export const getAllServicesAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to fetch services", data: [] };
  }
};