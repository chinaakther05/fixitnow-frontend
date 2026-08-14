

//import { cookies } from "next/headers";


//export const getTechnicianById = async (id: string) => {
  //try {
    //const res = await fetch(`${process.env.BACKEND_API_URL}/api/technicians/${id}`, {
     // cache: "no-store",
   // });
   // const result = await res.json();
   // return result;
  //} catch (error) {
  //  return { success: false, message: "Failed to fetch technician", data: null };
  //}
//};


"use server";

import { cookies } from "next/headers";

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

//export const getTechnicianProfile = async () => {
 // const cookieStore = await cookies();
  //const token = cookieStore.get("accessToken")?.value;

  //if (!token) {
  //  return { success: false, message: "Not authenticated", data: null };
  //}

  //try {
   // const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/profile`, {
   //   headers: { Authorization: `Bearer ${token}` },
     // cache:// "no-store",
    //});
   // const result = await res.json();
   // return result;
  //} catch (error) {
  //  return { success: false, message: "Failed to fetch profile", data: null };
  //}
//};








export const getTechnicianProfile = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Not authenticated (Token missing)", data: null };
    }

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      return {
        success: false,
        message: ".env.local ফাইলে BACKEND_API_URL সেট করা নেই!",
        data: null,
      };
    }

    const APP_URL = `${backendUrl}/api/technician/profile`;

    const res = await fetch(APP_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const rawText = await res.text();
      console.error("❌ Expected JSON but got HTML/Text Response:", rawText.substring(0, 150));
      return {
        success: false,
        message: `Server returned status ${res.status} instead of JSON.`,
        data: null,
      };
    }

    const result = await res.json();
    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch profile";
    return { success: false, message: errorMessage, data: null };
  }
};


export async function updateTechnicianProfile(payload: {
  name?: string;
  phone?: string;
  bio?: string;
  hourlyRate?: number;
  experience?: number;
  skills?: string[];
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/technician/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Failed to update profile. Try again." };
  }
}

// ২. পাসওয়ার্ড আপডেট
export async function updatePassword(payload: {
  currentPassword?: string;
  newPassword?: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: "Failed to update password." };
  }
}