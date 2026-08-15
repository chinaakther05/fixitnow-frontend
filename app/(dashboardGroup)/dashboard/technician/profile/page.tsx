"use client";

import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  Award,
  Edit3,
  Wrench,
  Calendar,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTechnicianProfile } from "@/actions/technician";
import { useQuery } from "@tanstack/react-query";

export default function TechnicianProfilePage() {
  const [isAvailable, setIsAvailable] = useState(true);

  const { data: technician, isLoading, isError, error } = useQuery({
    queryKey: ["technician-profile"],
    queryFn: async () => {
      const result = await getTechnicianProfile();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return (
      <div style={{ padding: "40px", color: "red", fontFamily: "monospace" }}>
        <h2>Debug Error:</h2>
        <p>{(error as Error).message}</p>
      </div>
    );
  }

  if (!technician) return <div>Profile not found</div>;

 
  const name = technician.user?.name || "Unknown";
  const email = technician.user?.email || "N/A";
  const phone = technician.user?.phone || "N/A";
  const rating = technician.avgRating ?? 0;
  const totalReviews = technician.totalReviews ?? 0;
  const experience = technician.experience ?? 0;
  const hourlyRate = technician.hourlyRate ?? 0;
  const bio = technician.bio || "No bio added yet.";
  const skills: string[] = technician.skills || [];
  const joinedDate = technician.createdAt
    ? new Date(technician.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header / Banner Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-2xl border border-emerald-200 dark:border-emerald-800">
                  {name.substring(0, 2).toUpperCase()}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${
                    isAvailable ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                  title={isAvailable ? "Available for Work" : "Busy / On Duty"}
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">{name}</h1>
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Technician</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="flex items-center gap-1 text-xs font-semibold text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    {rating} ({totalReviews} reviews)
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground font-medium">{experience} yrs Exp.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <Edit3 className="w-4 h-4" /> Edit Profile
              </Button>

              <div className="flex items-center gap-2 p-1.5 rounded-xl bg-muted/60 border border-border/80">
                <span className="text-xs font-medium text-muted-foreground px-2">Work Status:</span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    isAvailable
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-amber-500 text-white shadow-sm"
                  }`}
                >
                  {isAvailable ? "Available" : "On Duty"}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Rating</p>
              <p className="text-base font-bold text-foreground">{rating} / 5.0</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hourly Rate</p>
              <p className="text-base font-bold text-foreground">৳{hourlyRate}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl text-emerald-600 dark:text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Experience</p>
              <p className="text-base font-bold text-foreground">{experience} yrs</p>
            </div>
          </div>
        </div>

        {/* Contact & Personal Details Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl">
              <User className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Contact Information</h2>
              <p className="text-xs text-muted-foreground">Basic contact information.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60">
              <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Email Address</p>
                <p className="font-medium text-foreground">{email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60">
              <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Phone Number</p>
                <p className="font-medium text-foreground">{phone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">Joined Platform</p>
                <p className="font-medium text-foreground">{joinedDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">About / Bio</h2>
              <p className="text-xs text-muted-foreground">Overview of expertise and service commitment.</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        </div>

        {/* Skills & Specializations */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 rounded-xl">
              <Wrench className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Skills & Specializations</h2>
              <p className="text-xs text-muted-foreground">Key technical services provided by this technician.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-muted text-foreground text-xs font-medium border border-border flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No skills added yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}