"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";

type LoginState = {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
  };
} | null;

export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = { email, password };

  let result;

  // শুধু নেটওয়ার্ক/fetch-সংক্রান্ত এরর এখানে ধরা হচ্ছে
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    result = await res.json();
  } catch (error) {
    return {
      success: false,
      message: "Could not connect to server. Please try again.",
    };
  }

  // Login ব্যর্থ হলে সরাসরি রিটার্ন (try-catch এর বাইরে)
  if (!result.success) {
    return result;
  }

  // Login সফল — cookie সেট করা
  const cookieStore = await cookies();
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

  // redirect() এখন try-catch এর বাইরে — তাই এটা ঠিকমতো কাজ করবে
  // ?toast=login-success যোগ করা হয়েছে, যাতে dashboard পেজে গিয়ে toast দেখানো যায়
  switch (decodedToken.role) {
    case "CUSTOMER":
      redirect("/dashboard/customer?toast=login-success");

    case "TECHNICIAN":
      redirect("/dashboard/technician?toast=login-success");

    case "ADMIN":
      redirect("/dashboard/admin?toast=login-success");

    default:
      redirect("/");
  }
};

export const registerAction = async (payload: {
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
}) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Could not connect to server. Please try again.",
    };
  }
};

export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login?toast=logout-success");
};