import { cookies } from "next/headers";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export const getCurrentUser = async (): Promise<UserProfile | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const result = await res.json();
    if (!result.success) return null;

    return {
      id: result.data.id,
      name: result.data.name,
      email: result.data.email,
      role: result.data.role,
    };
  } catch {
    return null;
  }
};