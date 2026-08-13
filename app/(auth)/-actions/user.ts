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

// 🔑 ১. Login Action
export const loginAction = async (
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> => {
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = { email, password };

  let result;

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

  if (!result.success) {
    return result;
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

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

// 🔑 ২. Register Action
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

// 🔑 ৩. Logout Action
export const logoutAction = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  redirect("/login?toast=logout-success");
};

// 🔑 ৪. Fetch Profile (getMe)
export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
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

// 🔑 ৫. Update Profile (updateMyProfile)
export const updateMyProfile = async (payload: {
  name?: string;
  phone?: string;
  address?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
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


// 🔑 ৬. Change Password Action
export const changePasswordAction = async (payload: {
  currentPassword?: string;
  newPassword?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
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