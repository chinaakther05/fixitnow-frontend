import { getCurrentUser } from "@/lib/auth";
import FixItNowNavbar from "./Fixitnow-navbar";

export default async function NavbarServer() {
  const user = await getCurrentUser();
  return <FixItNowNavbar user={user} />;
}