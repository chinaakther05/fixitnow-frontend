"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

const ToastHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const toastType = searchParams.get("toast");

    if (toastType === "login-success") {
      toast.success("Login successful!");
    } else if (toastType === "logout-success") {
      toast.success("Logged out successfully!");
    }

    
    if (toastType) {
      router.replace(pathname);
    }
  }, [searchParams, router, pathname]);

  return null; 
};

export default ToastHandler;