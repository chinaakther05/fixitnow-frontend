import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

type CurrentUser = {
  userId: string;
  role: string;
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded || !decoded.userId || !decoded.role) {
      return null;
    }

    return {
      userId: decoded.userId as string,
      role: decoded.role as string,
    };
  } catch {
    return null;
  }
};