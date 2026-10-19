
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Shield,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Camera,
  Check,
  Package,
  Loader2,
  AlertCircle,
  X,
  ArrowLeft,
  RefreshCw,
  Save,
  CheckCircle2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { getMe, updateMyProfile } from "@/app/(auth)/-actions/user";

const CUSTOMER_DASHBOARD_URL = "/dashboard/customer";
const CUSTOMER_BOOKINGS_URL = "/dashboard/customer/bookings";

type ProfileFormData = {
  name: string;
  phone: string;
  address: string;
};

export default function CustomerProfilePage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    phone: "",
    address: "",
  });

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await getMe();

      if (!res?.success) {
        throw new Error(res?.message || "Failed to load user profile");
      }

      return res.data;
    },
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData: ProfileFormData) => {
      const res = await updateMyProfile(updatedData);

      if (!res?.success) {
        throw new Error(res?.message || "Failed to update profile");
      }

      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      setIsEditing(false);
    },
  });

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
    updateMutation.reset();
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      return;
    }

    updateMutation.mutate({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    });
  };

  const getInitials = (name?: string | null) => {
    if (!name?.trim()) return "CU";

    return name
      .trim()
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Recently";

  const updateField = (field: keyof ProfileFormData, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const inputClassName =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

  if (isLoading) {
    return (
      <main className="min-h-[70vh] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-10 w-48 rounded-xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-48 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !user) {
    return (
      <main className="min-h-[70vh] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href={CUSTOMER_DASHBOARD_URL}
            className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <AlertCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Unable to Load Profile
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading your profile."}
            </p>
            <Button
              onClick={() => refetch()}
              className="mt-5 gap-2 bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70 px-4 py-6 dark:bg-slate-950 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Back button and page heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href={CUSTOMER_DASHBOARD_URL}
              className="mb-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              My Profile
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Manage your personal information and account details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={updateMutation.isPending}
                className="gap-2 rounded-xl"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            )}

            <Button
              type="button"
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  updateMutation.reset();
                  setIsEditing(true);
                }
              }}
              disabled={updateMutation.isPending}
              className="gap-2 rounded-xl bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
            >
              {updateMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isEditing ? (
                <Save className="h-4 w-4" />
              ) : (
                <Edit3 className="h-4 w-4" />
              )}
              {updateMutation.isPending
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Save feedback */}
        {updateMutation.isSuccess && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            Profile updated successfully.
          </div>
        )}

        {updateMutation.isError && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {updateMutation.error instanceof Error
                ? updateMutation.error.message
                : "Failed to update your profile. Please try again."}
            </span>
          </div>
        )}

        {/* Profile banner */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="relative h-36 overflow-hidden bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-700 sm:h-44">
            <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-[30px] border-white/10" />
            <div className="absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute bottom-5 left-6 text-sm font-semibold tracking-[0.2em] text-white/80 sm:left-8">
              FIXITNOW · CUSTOMER
            </div>
          </div>

          <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:px-8">
            <div className="-mt-12 flex shrink-0 justify-center sm:-mt-14">
              <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-emerald-600 text-2xl font-bold text-white shadow-lg dark:border-slate-900 sm:h-28 sm:w-28 sm:text-3xl">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={`${user.name || "Customer"} profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user.name)
                )}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
              </div>
            </div>

            <div className="min-w-0 flex-1 text-center sm:pb-1 sm:text-left">
              <h2 className="break-words text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                {user.name || "Customer"}
              </h2>
              <p className="mt-1 break-all text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>
            </div>

            <div className="flex justify-center sm:pb-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Shield className="h-4 w-4" />
                {user.role || "CUSTOMER"}
              </span>
            </div>
          </div>
        </section>

        {/* Information cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Personal details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-500/10">
                <User className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Personal Details
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Your contact information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <User className="h-4 w-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={inputClassName}
                    required
                  />
                ) : (
                  <p className="mt-2 break-words text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name || "Not provided"}
                  </p>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <p className="mt-2 break-all text-sm font-semibold text-slate-900 dark:text-white">
                  {user.email || "Not provided"}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Email address cannot be changed here.
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4" />
                  Contact Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    className={inputClassName}
                  />
                ) : (
                  <p className="mt-2 break-words text-sm font-semibold text-slate-900 dark:text-white">
                    {user.phone || "Not provided"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Address and account details */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
            <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="rounded-xl bg-blue-50 p-2.5 dark:bg-blue-500/10">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Address & Account
                </h3>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Location and membership information
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <MapPin className="h-4 w-4" />
                  Primary Address
                </label>
                {isEditing ? (
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="Enter your service address"
                    rows={3}
                    autoComplete="street-address"
                    className={`${inputClassName} resize-y`}
                  />
                ) : (
                  <p className="mt-2 whitespace-pre-wrap break-words text-sm font-semibold text-slate-900 dark:text-white">
                    {user.address || "Not provided"}
                  </p>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <Shield className="h-4 w-4" />
                  Account Status
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.status || "ACTIVE"}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </label>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                  {joinedDate}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Booking shortcut */}
        <section className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-5 dark:border-emerald-900/50 dark:from-emerald-950/30 dark:to-teal-950/20 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-emerald-600 p-3 text-white shadow-sm">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">
                Your Service Bookings
              </h3>
              <p className="mt-1 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400">
                Check your service requests and review your booking details.
              </p>
            </div>
          </div>

          <Link
            href={CUSTOMER_BOOKINGS_URL}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            View Bookings
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </Link>
        </section>
      </div>
    </main>
  );
}
