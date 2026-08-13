"use client";

import React, { useState } from "react";
import { User, Mail, Shield, Phone, MapPin, Calendar, Edit3, Camera, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfilePageProps {
  user?: {
    name?: string;
    email?: string;
    role?: string;
    phone?: string;
    address?: string;
    image?: string;
    createdAt?: string;
  };
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // যদি প্যারেন্ট থেকে ইউজার ডাটা না আসে, তবে এডমিনের আসল ডিফল্ট ডাটা বসবে
  const currentUser = {
    name: user?.name || "System Admin",
    email: user?.email || "admin@fixitnow.com",
    role: user?.role || "ADMIN",
    phone: user?.phone || "Not provided",
    address: user?.address || "Dhaka, Bangladesh",
    joinedDate: user?.createdAt || "August 2026",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground">
              Manage your personal details and account settings.
            </p>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 self-start sm:self-auto"
          >
            {isEditing ? (
              <>
                <Check className="w-4 h-4" /> Save Changes
              </>
            ) : (
              <>
                <Edit3 className="w-4 h-4" /> Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Header Banner & Avatar Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Cover Header */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-700 relative"></div>

          {/* Profile Info Summary */}
          <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-12 sm:-mt-10">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-600 text-white font-bold text-3xl flex items-center justify-center border-4 border-background shadow-md overflow-hidden">
                {user?.image ? (
                  <img src={user.image} alt={currentUser.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(currentUser.name)
                )}
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-background border border-border rounded-full shadow-sm hover:bg-muted transition-colors">
                <Camera className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="text-center sm:text-left space-y-1 flex-1">
              <h2 className="text-xl font-bold text-foreground">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
              Personal Information
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <User className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentUser.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentUser.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details & Location */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
              Account Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Current Role</p>
                  <p className="text-sm font-medium text-foreground uppercase truncate">{currentUser.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentUser.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Account Type</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentUser.role} Account</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;