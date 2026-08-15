"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  KeyRound,
  Globe,
  Save,
  Bell,
  Moon,
  LogOut,
  Trash2,
  AlertTriangle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordAction, getMe, updateMyProfile } from "@/app/(auth)/-actions/user";
import { logoutAction } from "@/app/(auth)/-actions/auth.action";




export default function CustomerSettingsPage() {
  const queryClient = useQueryClient();

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification States
  const [emailNotif, setEmailNotif] = useState(true);
  const [bookingNotif, setBookingNotif] = useState(true);

  
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await getMe();
      if (!res?.success) throw new Error(res?.message || "Failed to load user profile");
      return res.data;
    },
  });

  
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  
  const profileMutation = useMutation({
    mutationFn: async (updatedData: { name?: string; phone?: string; address?: string }) => {
      const res = await updateMyProfile(updatedData);
      if (!res?.success) throw new Error(res?.message || "Failed to update profile");
      return res.data;
    },
    onSuccess: () => {
      alert("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: (err: Error) => {
      alert(err.message || "Something went wrong!");
    },
  });

  
  const passwordMutation = useMutation({
    mutationFn: async (passData: typeof passwordForm) => {
      const res = await changePasswordAction({
        currentPassword: passData.currentPassword,
        newPassword: passData.newPassword,
      });
      if (!res?.success) throw new Error(res?.message || "Failed to change password");
      return res.data;
    },
    onSuccess: () => {
      alert("Password updated successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (err: Error) => {
      alert(err.message || "Failed to change password!");
    },
  });

  // Profile Save Handler
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    profileMutation.mutate({
      name: profileForm.name,
      phone: profileForm.phone,
      address: profileForm.address,
    });
  };

  // Password Save Handler
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    passwordMutation.mutate(passwordForm);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-sm font-medium text-muted-foreground">Loading settings...</p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="p-8 text-center space-y-3">
        <div className="inline-flex p-3 bg-red-100 dark:bg-red-950/80 rounded-2xl text-red-600">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-foreground">Failed to Load Settings</h3>
        <p className="text-xs text-muted-foreground">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customer Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your personal profile, password, security preferences, and app notifications.
          </p>
        </div>

        {/* 1. Personal Information Section */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl">
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Personal Information</h2>
              <p className="text-xs text-muted-foreground">Update your personal profile details and default address.</p>
            </div>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={profileForm.email}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-muted/50 text-muted-foreground cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Phone Number</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Service Address</label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                  placeholder="Your address"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={profileMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 mt-2"
            >
              {profileMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Profile Details
                </>
              )}
            </Button>
          </form>
        </div>

        {/* 2. Security & Password Section */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl">
              <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Change Password</h2>
              <p className="text-xs text-muted-foreground">Ensure your account uses a strong password.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-lg">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={passwordMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 mt-2"
            >
              {passwordMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Updating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Update Password
                </>
              )}
            </Button>
          </form>
        </div>

        {/* 3. Preferences Section */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl">
              <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">App Preferences</h2>
              <p className="text-xs text-muted-foreground">Customize your viewing experience.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border/60">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Theme Preference</p>
                  <p className="text-xs text-muted-foreground">Switch between Light and Dark mode</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* 4. Notifications Section */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl">
              <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Notifications</h2>
              <p className="text-xs text-muted-foreground">Control how you receive system alerts.</p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border/60 cursor-pointer hover:bg-muted/60 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive important account & security updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotif}
                onChange={() => setEmailNotif(!emailNotif)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-muted/40 border border-border/60 cursor-pointer hover:bg-muted/60 transition-colors">
              <div>
                <p className="text-sm font-medium text-foreground">Booking Updates</p>
                <p className="text-xs text-muted-foreground">Get instant alerts when a booking status changes</p>
              </div>
              <input
                type="checkbox"
                checked={bookingNotif}
                onChange={() => setBookingNotif(!bookingNotif)}
                className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* 5. DANGER ZONE SECTION */}
        <div className="bg-card border border-red-200 dark:border-red-900/50 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-red-100 dark:border-red-900/40 pb-4">
            <div className="p-2 bg-red-100 dark:bg-red-950/80 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
              <p className="text-xs text-muted-foreground">Actions here can log you out or affect your account permanently.</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Logout Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
              <div>
                <p className="text-sm font-semibold text-foreground">Log Out of Your Account</p>
                <p className="text-xs text-muted-foreground">End your current session safely from this device.</p>
              </div>
              <Button
                type="button"
                onClick={() => logoutAction()}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white gap-2 shrink-0 self-start sm:self-auto"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </Button>
            </div>

            {/* Delete Account Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
              <div>
                <p className="text-sm font-semibold text-foreground">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently remove your account and all associated data.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-100 dark:border-red-800 dark:hover:bg-red-950/60 gap-2 shrink-0 self-start sm:self-auto"
                onClick={() => alert("Are you sure? This action cannot be undone.")}
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}