"use server";

import { cookies } from "next/headers";

export const getCategories = async () => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to fetch categories", data: [] };
  }
};

export const createCategory = async (payload: {
  name: string;
  description?: string;
  icon?: string;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/categories`, {
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
    return { success: false, message: "Failed to create category" };
  }
};