
"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  loginAction,
  googleLoginAction,
} from "../-actions/auth.action";

const LoginForm = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, action, pending] = useActionState(loginAction, null);
  const [googlePending, setGooglePending] = useState(false);
  const [demoSelected, setDemoSelected] = useState(false);

  useEffect(() => {
    if (state && !state.success) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  const fillDemoCredentials = (
    role: "CUSTOMER" | "TECHNICIAN"
  ) => {
    const credentials = {
      CUSTOMER: {
        email: "papishto@gmail.com",
        password: "123456",
      },
      TECHNICIAN: {
        email: "salam@gmail.com",
        password: "123456",
      },
    };

    const form = formRef.current;
    if (!form) return;

    const emailInput = form.elements.namedItem(
      "email"
    ) as HTMLInputElement | null;

    const passwordInput = form.elements.namedItem(
      "password"
    ) as HTMLInputElement | null;

    if (emailInput && passwordInput) {
      emailInput.value = credentials[role].email;
      passwordInput.value = credentials[role].password;
      setDemoSelected(true);
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    setGooglePending(true);

    try {
      await googleLoginAction(idToken);
    } catch {
      toast.error("Google login failed. Please try again.");
    } finally {
      setGooglePending(false);
    }
  };

  return (
    <div className="space-y-4">
      <form
        ref={formRef}
        action={action}
        onChange={() => setDemoSelected(false)}
      >
        <Card className="space-y-4 p-5">
          <div className="space-y-1.5">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </label>

            <Input
              id="login-email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>

            <Input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={pending || googlePending}
            className={`h-11 w-full transition-colors ${
              demoSelected
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : ""
            }`}
          >
            {pending ? "Submitting..." : "Login"}
          </Button>

          <div className="space-y-2 border-t border-border pt-4">
            <p className="text-center text-sm font-medium text-foreground">
              Try a Demo Account
            </p>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                disabled={pending || googlePending}
                onClick={() => fillDemoCredentials("CUSTOMER")}
              >
                Demo Customer
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={pending || googlePending}
                onClick={() => fillDemoCredentials("TECHNICIAN")}
              >
                Demo Technician
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              Choose a demo account, then click the blue Login button.
            </p>
          </div>
        </Card>
      </form>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium text-muted-foreground">
          OR
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex w-full justify-center">
        {googlePending ? (
          <Button
            type="button"
            disabled
            className="h-11 w-full"
          >
            Signing in with Google...
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              if (response.credential) {
                void handleGoogleLogin(response.credential);
              } else {
                toast.error("Google did not return an ID token");
              }
            }}
            onError={() => toast.error("Google login failed")}
            text="continue_with"
            shape="rectangular"
            size="large"
            width="320"
            logo_alignment="center"
            theme="outline"
          />
        )}
      </div>

      <p className="text-center text-sm leading-6 text-muted-foreground">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="font-semibold text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
