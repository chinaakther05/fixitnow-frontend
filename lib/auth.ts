



import { cookies } from "next/headers";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    // API URL চেক - env variable না থাকলে fallback বা null হ্যান্ডলিং
    const baseUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;
    
    if (!baseUrl) {
      console.error("getCurrentUser: API Base URL is missing in process.env");
      return null;
    }

    const res = await fetch(`${baseUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const result = await res.json();

    // Data Structure Safety Check
    const userData = result?.data || result?.user || result;

    if (!userData) return null;

    return {
      id: userData.id || userData._id || "",
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "USER",
    };
  } catch (error) {
    console.error("getCurrentUser unexpected error:", error);
    return null;
  }
};