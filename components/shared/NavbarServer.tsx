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
   
    user = await getCurrentUser();
  } catch (error) {
    
    console.error("NavbarServer user fetch error:", error);
  }

  return <FixItNowNavbar user={user} />;
}