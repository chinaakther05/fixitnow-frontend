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
  Clock,
  Package,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/app/(auth)/-actions/user";



export default function CustomerProfilePage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // Form State for editing
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

 
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
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);


  const updateMutation = useMutation({
    mutationFn: async (updatedData: typeof formData) => {
      const res = await updateMyProfile(updatedData);
      if (!res?.success) throw new Error(res?.message || "Failed to update profile");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const getInitials = (name: string) => {
    if (!name) return "CU";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        <p className="text-sm font-medium text-muted-foreground">Loading profile details...</p>
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

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">My Profile</h1>
            <p className="text-sm text-muted-foreground">
              Manage your personal information, address, and account details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isEditing && (
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="gap-1 text-xs"
                disabled={updateMutation.isPending}
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </Button>
            )}

            <Button
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setIsEditing(true);
                }
              }}
              disabled={updateMutation.isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 self-start sm:self-auto"
            >
              {updateMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isEditing ? (
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
        </div>

        {/* Profile Banner & Avatar Card */}
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 relative"></div>

          <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-12 sm:-mt-10">
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-600 text-white font-bold text-3xl flex items-center justify-center border-4 border-background shadow-md overflow-hidden">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  getInitials(user?.name)
                )}
              </div>
              <button className="absolute bottom-1 right-1 p-2 bg-background border border-border rounded-full shadow-sm hover:bg-muted transition-colors">
                <Camera className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="text-center sm:text-left space-y-1 flex-1">
              <h2 className="text-xl font-bold text-foreground">{user?.name || "Customer"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>

            <div className="shrink-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                {user?.role || "CUSTOMER"}
              </span>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
              Personal Details
            </h3>

            <div className="space-y-3">
              {/* Full Name */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <User className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full mt-1 px-2 py-1 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{user?.name || "N/A"}</p>
                  )}
                </div>
              </div>

              {/* Email Address (Read Only) */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50 opacity-80">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Email Address (Cannot change)</p>
                  <p className="text-sm font-medium text-foreground truncate">{user?.email}</p>
                </div>
              </div>

              {/* Contact Number */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Contact Number</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full mt-1 px-2 py-1 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{user?.phone || "Not provided"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Service / Delivery Location & Account Details */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-3">
              Address & Status
            </h3>

            <div className="space-y-3">
              {/* Primary Address */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Primary Address</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full mt-1 px-2 py-1 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  ) : (
                    <p className="text-sm font-medium text-foreground truncate">{user?.address || "Not provided"}</p>
                  )}
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Account Status</p>
                  <p className="text-sm font-medium text-emerald-600 truncate">
                    {user?.status || "ACTIVE"} Customer
                  </p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border/50">
                <Calendar className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium text-foreground truncate">{joinedDate}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Activity Summary Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
            <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">
              View All Bookings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
              <div className="p-3 bg-emerald-600 text-white rounded-lg">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Service Requests</p>
                <p className="text-lg font-bold text-foreground">0 Pending</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="p-3 bg-muted-foreground/10 text-muted-foreground rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed Services</p>
                <p className="text-lg font-bold text-foreground">0 Services</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}