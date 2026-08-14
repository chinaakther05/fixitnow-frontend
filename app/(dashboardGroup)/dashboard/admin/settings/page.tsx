"use client";

import React, { useState } from "react";
import {
  Lock,
  Bell,
  Moon,
  KeyRound,
  Globe,
  Save,
  AlertTriangle,
  LogOut,
  Trash2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { logoutAction } from "@/app/(auth)/-actions/auth.action";
import { changePasswordAction } from "@/app/(auth)/-actions/user";


export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Notification states
  const [emailNotif, setEmailNotif] = useState(true);
  const [bookingNotif, setBookingNotif] = useState(true);

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 🔑 Password Change Handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // ১. পাসওয়ার্ড ম্যাচিং চেক
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorMessage("New password and Confirm password do not match!");
      return;
    }

    // ২. পাসওয়ার্ডের দৈর্ঘ্য চেক
    if (passwordForm.newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await changePasswordAction({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res?.success) {
        setSuccessMessage("Password updated successfully!");
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setErrorMessage(res?.message || "Failed to update password.");
      }
    } catch (err) {
      setErrorMessage("An error occurred while updating the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Account Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your password, security preferences, and app notifications.
          </p>
        </div>

        {/* Security & Password Section */}
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

          {/* Feedback Messages */}
          {errorMessage && (
            <div className="p-3 text-xs font-medium rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 text-xs font-medium rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
              {successMessage}
            </div>
          )}

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
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 mt-2"
            >
              {loading ? (
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

        {/* Preferences Section */}
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

        {/* Notifications Section */}
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

        {/* Danger Zone Section */}
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
                onClick={() => {
                  if (confirm("Are you sure? This action cannot be undone.")) {
                    alert("Account deletion request submitted.");
                  }
                }}
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