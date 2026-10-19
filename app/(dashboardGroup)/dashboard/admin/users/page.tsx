
"use client";

import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Ban,
  CheckCircle2,
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  RefreshCw,
  UserRound,
  CalendarDays,
  Filter,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllUsers,
  updateUserStatus,
} from "@/app/(dashboardGroup)/-actions/admin";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const roleStyles: Record<string, string> = {
  ADMIN:
    "bg-purple-50 text-purple-700 ring-purple-600/20 dark:bg-purple-500/10 dark:text-purple-300 dark:ring-purple-400/20",
  CUSTOMER:
    "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-400/20",
  TECHNICIAN:
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
};

const AdminUserPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const {
    data: users,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const result = await getAllUsers();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });

  const mutation = useMutation({
    mutationFn: ({
      userId,
      status,
    }: {
      userId: string;
      status: string;
    }) => updateUserStatus(userId, status),

    onSuccess: () => {
      toast.success("User status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },

    onError: () => {
      toast.error("Failed to update user status");
    },
  });

  const handleToggleStatus = (
    userId: string,
    currentStatus: string,
  ) => {
    const newStatus =
      currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    mutation.mutate({ userId, status: newStatus });
  };

  const filteredUsers = useMemo(() => {
    return (users ?? []).filter((user) => {
      const searchTerm = search.trim().toLowerCase();

      const matchesSearch =
        user.name?.toLowerCase().includes(searchTerm) ||
        user.email?.toLowerCase().includes(searchTerm);

      const matchesRole =
        roleFilter === "ALL" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const stats = useMemo(() => {
    const allUsers = users ?? [];

    return {
      total: allUsers.length,
      active: allUsers.filter((user) => user.status === "ACTIVE").length,
      blocked: allUsers.filter((user) => user.status === "BLOCKED").length,
      technicians: allUsers.filter(
        (user) => user.role === "TECHNICIAN",
      ).length,
    };
  }, [users]);

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="h-36 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>

        <div className="h-96 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm dark:border-red-900/50 dark:bg-slate-900">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
            <UserX className="h-7 w-7" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
            Unable to load users
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Something went wrong while fetching user information. Please try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-4 py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700 p-6 text-white shadow-lg shadow-emerald-900/10 sm:p-8">
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/3 h-44 w-44 rounded-full bg-teal-300/20 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-emerald-50">
              <ShieldCheck className="h-4 w-4" />
              Administration
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              User Management
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/90 sm:text-base">
              Manage platform users, review account status, and keep your
              FixItNow community organized.
            </p>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60 sm:self-center"
          >
            <RefreshCw
              className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Users
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            All registered accounts
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Active Users
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stats.active}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Accounts currently active
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Blocked Users
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stats.blocked}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400">
              <UserX className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Accounts currently blocked
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Technicians
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {stats.technicians}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Registered service technicians
          </p>
        </div>
      </section>

      {/* User list */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-5 dark:border-slate-800 sm:p-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                All Users
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Search accounts and manage their access.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <Users className="h-3.5 w-3.5" />
              {filteredUsers.length} result
              {filteredUsers.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search users by name or email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white dark:focus:border-emerald-500 dark:focus:bg-slate-800"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative md:w-56">
              <Filter className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                aria-label="Filter users by role"
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
              >
                <option value="ALL">All Roles</option>
                <option value="CUSTOMER">Customer</option>
                <option value="TECHNICIAN">Technician</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Joined</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 text-right font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-800">
                      <Search className="h-6 w-6" />
                    </div>
                    <p className="mt-4 font-semibold text-slate-700 dark:text-slate-200">
                      No users found
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      Try another search term or change the role filter.
                    </p>
                    {(search || roleFilter !== "ALL") && (
                      <button
                        onClick={() => {
                          setSearch("");
                          setRoleFilter("ALL");
                        }}
                        className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                      >
                        Clear all filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isActive = user.status === "ACTIVE";
                  const isAdmin = user.role === "ADMIN";

                  return (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            {user.name?.trim()?.charAt(0)?.toUpperCase() || (
                              <UserRound className="h-5 w-5" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {user.name || "Unnamed User"}
                            </p>
                            <p className="mt-1 max-w-[260px] truncate text-xs text-slate-500 dark:text-slate-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                            roleStyles[user.role] ??
                            "bg-slate-100 text-slate-700 ring-slate-600/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600/30"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400">
                          <CalendarDays className="h-4 w-4 shrink-0" />
                          <span>{formatDate(user.createdAt)}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            isActive
                              ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                              : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {isAdmin ? (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Protected
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(user.id, user.status)
                            }
                            disabled={mutation.isPending}
                            className={`inline-flex min-w-[105px] items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                              isActive
                                ? "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                            }`}
                          >
                            {mutation.isPending ? (
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                            ) : isActive ? (
                              <Ban className="h-3.5 w-3.5" />
                            ) : (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            )}

                            {mutation.isPending
                              ? "Updating..."
                              : isActive
                                ? "Block User"
                                : "Unblock"}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {users?.length ?? 0}
            </span>{" "}
            users
          </p>

          <p className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Admin accounts are protected
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdminUserPage;
