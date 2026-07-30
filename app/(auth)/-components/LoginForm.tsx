"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { loginAction } from "../-actions/auth.action";


const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, null);

  useEffect(() => {
    if (!state) return;

    // Login সফল হলে server action নিজেই redirect করে দেয়,
    // তাই এখানে শুধু failure-এর ক্ষেত্রে toast দেখানো হচ্ছে
    if (!state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="email" type="email" placeholder="Enter your email" required />
        <Input name="password" type="password" placeholder="Enter your password" required />
        <Button type="submit">
          {pending ? "Submitting..." : "Login"}
        </Button>
      </Card>
    </form>
  );
};

export default LoginForm;