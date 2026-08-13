"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Wrench,
  KeyRound,
  Save,
  Loader2,
  CheckCircle2,
  X,
  Plus,
  Lock,
  DollarSign,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTechnicianProfile,
  updateTechnicianProfile,
  updatePassword,
} from "@/actions/technician";

export default function SettingsPage() {
  const queryClient = useQueryClient();

  // Alert State
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Profile Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState<number | "">("");
  const [experience, setExperience] = useState<number | "">("");
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Password States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fetch technician profile data
  const {
    data: technician,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["technician-profile"],
    queryFn: async () => {
      const result = await getTechnicianProfile();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  // Populate form values when data is loaded
  useEffect(() => {
    if (technician) {
      setName(technician.user?.name || "");
      setPhone(technician.user?.phone || "");
      setBio(technician.bio || "");
      setHourlyRate(technician.hourlyRate ?? "");
      setExperience(technician.experience ?? "");
      setSkills(technician.skills || []);
    }
  }, [technician]);

  // Mutation for Profile Update
  const profileMutation = useMutation({
    mutationFn: updateTechnicianProfile,
    onSuccess: (data) => {
      if (data.success) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        queryClient.invalidateQueries({ queryKey: ["technician-profile"] });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to update profile.",
        });
      }
    },
    onError: () => {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    },
  });

  // Mutation for Password Update
  const passwordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      if (data.success) {
        setMessage({
          type: "success",
          text: "Password changed successfully!",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to change password.",
        });
      }
    },
    onError: () => {
      setMessage({ type: "error", text: "Failed to update password." });
    },
  });

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    profileMutation.mutate({
      name,
      phone,
      bio,
      hourlyRate: Number(hourlyRate),
      experience: Number(experience),
      skills,
    });
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({
        type: "error",
        text: "New password and confirm password do not match!",
      });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters long.",
      });
      return;
    }

    passwordMutation.mutate({ currentPassword, newPassword });
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-sm text-muted-foreground font-medium">
          Loading settings...
        </p>
      </div>
    );
  }

  if (isError || !technician) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Failed to load settings data. Please check your network connection.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Account Settings
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your profile details, service rates, skills, and account
            security.
          </p>
        </div>

        {/* Notification Banner */}
        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-medium flex items-center justify-between border ${
              message.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                : "bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message.text}</span>
            </div>
            <button onClick={() => setMessage(null)}>
              <X className="w-4 h-4 opacity-70 hover:opacity-100" />
            </button>
          </div>
        )}

        {/* 1. Basic Info & Professional Details Form */}
        <form
          onSubmit={handleSaveProfile}
          className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl text-emerald-600 dark:text-emerald-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Personal & Service Details
              </h2>
              <p className="text-xs text-muted-foreground">
                Update your public profile info and pricing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Email (Read Only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address (Read-only)
              </label>
              <input
                type="email"
                value={technician.user?.email || ""}
                disabled
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-muted/50 text-muted-foreground text-sm cursor-not-allowed"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-muted-foreground" /> Phone
                Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +8801700000000"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Hourly Rate */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                Hourly Rate (৳)
              </label>
              <input
                type="number"
                value={hourlyRate}
                onChange={(e) =>
                  setHourlyRate(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                placeholder="e.g. 500"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Experience */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                Experience (Years)
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) =>
                  setExperience(
                    e.target.value ? Number(e.target.value) : ""
                  )
                }
                placeholder="e.g. 5"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Bio / About */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-muted-foreground" /> About
              / Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your expertise and experience..."
              className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
            />
          </div>

          {/* Skills Management */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-muted-foreground" /> Skills &
              Specializations
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. AC Repair, Wiring)"
                className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                variant="outline"
                className="rounded-xl border-border gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </Button>
            </div>

            {/* Render Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-medium flex items-center gap-1.5"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Save Profile Button */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={profileMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 shadow-sm"
            >
              {profileMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </Button>
          </div>
        </form>

        {/* 2. Security / Change Password Form */}
        <form
          onSubmit={handleSavePassword}
          className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6"
        >
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-950/80 rounded-xl text-amber-600 dark:text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Security Settings
              </h2>
              <p className="text-xs text-muted-foreground">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" /> Current
                Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" /> New
                Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" /> Confirm
                New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={passwordMutation.isPending}
              className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl gap-2 shadow-sm"
            >
              {passwordMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <KeyRound className="w-4 h-4" />
              )}
              Update Password
            </Button>
          </div>
        </form>

        {/* 3. Danger Zone / Account Actions */}
        <div className="bg-card border border-red-200 dark:border-red-900/60 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-red-100 dark:border-red-900/40 pb-4">
            <div className="p-2.5 bg-red-100 dark:bg-red-950/80 rounded-xl text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-red-600 dark:text-red-400">
                Danger Zone
              </h2>
              <p className="text-xs text-muted-foreground">
                Irreversible and destructive account actions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Deactivate Account */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Deactivate Profile
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Temporarily hide your profile from search results and clients.
                  You can reactivate anytime.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to deactivate your technician profile?"
                    )
                  ) {
                    // handle deactivation logic here
                  }
                }}
                className="border-red-200 dark:border-red-800 text-red-600 hover:bg-red-100 dark:hover:bg-red-950 text-xs rounded-xl shrink-0"
              >
                Deactivate
              </Button>
            </div>

            {/* Delete Account */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
              <div>
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Delete Account
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Permanently remove your technician profile, reviews, and
                  history. This action cannot be undone.
                </p>
              </div>
              <Button
                type="button"
                onClick={() => {
                  if (
                    confirm(
                      "DANGER: This will permanently delete your account! Are you absolutely sure?"
                    )
                  ) {
                    // handle account deletion logic here
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white text-xs rounded-xl shrink-0 shadow-sm"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}