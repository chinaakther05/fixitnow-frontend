import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
};