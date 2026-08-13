//import { getCurrentUser } from "@/lib/auth";
//import FixItNowNavbar from "./Fixitnow-navbar";

//export default async function NavbarServer() {
  //const user = await getCurrentUser();
  //return <FixItNowNavbar user={user} />;
//}



import { getCurrentUser } from "@/lib/auth";
import FixItNowNavbar from "./Fixitnow-navbar";

export default async function NavbarServer() {
  let user = null;

  try {
    // ইউজার ডাটা আনার চেষ্টা করবে
    user = await getCurrentUser();
  } catch (error) {
    // এরর হলেও সাইট ক্র্যাশ করবে না, user = null ই থাকবে
    console.error("NavbarServer user fetch error:", error);
  }

  return <FixItNowNavbar user={user} />;
}