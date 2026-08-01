"use server";

export const getTechnicianById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/${id}`, {
      cache: "no-store",
    });
    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Failed to fetch technician", data: null };
  }
};