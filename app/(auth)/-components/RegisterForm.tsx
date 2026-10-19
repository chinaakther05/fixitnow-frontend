
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  registerSchema,
  RegisterFormValues,
} from "@/lib/validations/auth.schema";

import {
  registerAction,
  googleLoginAction,
} from "../-actions/auth.action";

const RegisterForm = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await registerAction({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
      });

      if (result.success) {
        toast.success("Account created! Please login.");
        router.push("/login");
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async (idToken: string) => {
    setGooglePending(true);

    try {
      await googleLoginAction(idToken);
    } catch {
      toast.error("Google registration failed. Please try again.");
    } finally {
      setGooglePending(false);
    }
  };

  return (
    <Card className="w-full space-y-4 p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-name"
            className="text-sm font-medium text-foreground"
          >
            Full Name
          </label>

          <Input
            id="register-name"
            placeholder="Enter your full name"
            autoComplete="name"
            {...register("name")}
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </label>

          <Input
            id="register-email"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            {...register("email")}
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-password"
            className="text-sm font-medium text-foreground"
          >
            Password
          </label>

          <Input
            id="register-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-confirm-password"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
          </label>

          <Input
            id="register-confirm-password"
            type="password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Account Type */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">
            Account Type
          </label>

          <Select
            onValueChange={(value) =>
              setValue(
                "role",
                value as "CUSTOMER" | "TECHNICIAN",
                { shouldValidate: true }
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your account type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="CUSTOMER">
                Customer
              </SelectItem>
              <SelectItem value="TECHNICIAN">
                Technician
              </SelectItem>
            </SelectContent>
          </Select>

          {errors.role && (
            <p className="text-sm text-red-500">
              {errors.role.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || googlePending}
          className="h-11 w-full"
        >
          {isSubmitting ? "Creating account..." : "Register"}
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />

        <span className="text-xs font-medium text-muted-foreground">
          OR
        </span>

        <div className="h-px flex-1 bg-border" />
      </div>

      {/* Google Registration */}
      <div className="flex min-h-10 w-full justify-center">
        {googlePending ? (
          <Button
            type="button"
            disabled
            className="h-10 w-full"
          >
            Signing up with Google...
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              if (response.credential) {
                void handleGoogleRegister(response.credential);
              } else {
                toast.error("Google did not return an ID token");
              }
            }}
            onError={() => {
              toast.error("Google registration failed");
            }}
            text="continue_with"
            shape="rectangular"
            size="large"
            width="320"
            logo_alignment="center"
            theme="outline"
          />
        )}
      </div>

      {/* Login Link */}
      <p className="text-center text-sm leading-6 text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-semibold text-blue-600 underline-offset-4 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          Login
        </button>
      </p>
    </Card>
  );
};

export default RegisterForm;
