"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


import { registerSchema, RegisterFormValues } from "@/lib/validations/auth.schema";
import { registerAction } from "../-actions/auth.action";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const result = await registerAction({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      phone: data.phone,
    });

    setIsSubmitting(false);

    if (result.success) {
      toast.success("Account created! Please login.");
      router.push("/login");
    } else {
      toast.error(result.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Card className="p-5 space-y-4">
        <div>
          <Input placeholder="Full name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input type="password" placeholder="Password" {...register("password")} />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div>
          <Select onValueChange={(value) => setValue("role", value as "CUSTOMER" | "TECHNICIAN")}>
            <SelectTrigger>
              <SelectValue placeholder="I am a..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
              <SelectItem value="TECHNICIAN">Technician</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && (
            <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;