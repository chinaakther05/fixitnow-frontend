"use client";

import React, { useState, useEffect } from "react";
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
  Loader2,
  AlertCircle,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, updateMyProfile } from "@/app/(auth)/-actions/user";


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

const ProfilePage = ({ user: initialUser }: ProfilePageProps) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Editable Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  
  const {
    data: fetchedUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await getMe();
      if (!res?.success) throw new Error(res?.message || "Failed to load profile");
      return res.data;
    },
    initialData: initialUser,
  });

  
  const currentUser = {
    name: fetchedUser?.name || "System Admin",
    email: fetchedUser?.email || "admin@fixitnow.com",
    role: fetchedUser?.role || "ADMIN",
    phone: fetchedUser?.phone || "Not provided",
    address: fetchedUser?.address || "Dhaka, Bangladesh",
    image: fetchedUser?.image || null,
    createdAt: fetchedUser?.createdAt
      ? new Date(fetchedUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : "August 2026",
  };

 
  useEffect(() => {
    if (fetchedUser) {
      setFormData({
        name: fetchedUser.name || "",
        phone: fetchedUser.phone || "",
        address: fetchedUser.address || "",
      });
    }
  }, [fetchedUser]);

 
  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData: { name?: string; phone?: string; address?: string }) => {
      const res = await updateMyProfile(updatedData);
      if (!res?.success) throw new Error(res?.message || "Failed to update profile");
      return res.data;
    },
    onSuccess: () => {
      alert("Profile updated successfully!");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
    onError: (err: Error) => {
      alert(err.message || "Failed to update profile!");
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-sm text-muted-foreground">Loading profile...</p>
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
        <h3 className="text-base font-bold text-foreground">Failed to Load Profile</h3>
        <p className="text-xs text-muted-foreground">{(error as Error).message}</p>
      </div>
    );
  }

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

          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="gap-2"
                >
                  <X className="w-4 h-4" /> Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={updateProfileMutation.isPending}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                >
                  {updateProfileMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header Banner & Avatar Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Cover Header */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-700 relative"></div>

          {/* Profile Info Summary */}
          <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-12 sm:-mt-10">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-600 text-white font-bold text-3xl flex items-center justify-center border-4 border-background shadow-md overflow-hidden">
                {currentUser.image ? (
                  <img src={currentUser.image} alt={currentUser.name} className="w-full h-full object-cover" />
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
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
              Personal Information
            </h3>

            <div className="space-y-3">
              {/* Full Name */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <User className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full text-sm font-medium bg-background border border-border rounded-lg px-2 py-1 mt-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{currentUser.name}</p>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentUser.email}</p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full text-sm font-medium bg-background border border-border rounded-lg px-2 py-1 mt-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{currentUser.phone}</p>
                  )}
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
              {/* Role */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Current Role</p>
                  <p className="text-sm font-medium text-foreground uppercase truncate">{currentUser.role}</p>
                </div>
              </div>

              {/* Address / Location */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Location</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full text-sm font-medium bg-background border border-border rounded-lg px-2 py-1 mt-1 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{currentUser.address}</p>
                  )}
                </div>
              </div>

              {/* Joined Date */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium text-foreground truncate">{currentUser.createdAt}</p>
                </div>
              </div>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};

export default ProfilePage;