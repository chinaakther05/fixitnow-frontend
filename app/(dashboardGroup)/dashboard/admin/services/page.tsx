
"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Wrench,
  Search,
  Layers3,
  CircleDollarSign,
  Users,
  ArrowUpRight,
  RefreshCw,
  PackageSearch,
} from "lucide-react";

import { getAllServicesAdmin } from "@/app/(dashboardGroup)/-actions/admin";

interface AdminService {
  id: string;
  title: string;
  description?: string;
  price: number;
  category?: { name: string };
  technician?: { user?: { name: string } };
}

const AdminServicePage = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: services = [],
    isLoading,
    isError,
  } = useQuery<AdminService[]>({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const result = await getAllServicesAdmin();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });

  const filteredServices = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    if (!search) return services;

    return services.filter((service) => {
      return (
        service.title.toLowerCase().includes(search) ||
        service.description?.toLowerCase().includes(search) ||
        service.category?.name.toLowerCase().includes(search) ||
        service.technician?.user?.name?.toLowerCase().includes(search)
      );
    });
  }, [services, searchTerm]);

  const formatPrice = (price: number) =>
    `৳${Number(price || 0).toLocaleString("en-BD")}`;

  const averagePrice =
    services.length > 0
      ? services.reduce((total, service) => total + Number(service.price || 0), 0) /
        services.length
      : 0;

  const categoryCount = new Set(
    services
      .map((service) => service.category?.name)
      .filter((name): name is string => Boolean(name))
  ).size;

  const technicianCount = new Set(
    services
      .map((service) => service.technician?.user?.name)
      .filter((name): name is string => Boolean(name))
  ).size;

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-9 w-72 max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-48 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
            />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-500 dark:bg-red-500/10">
          <Wrench size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          Could not load services
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Please try loading the services again.
        </p>

        <button
          type="button"
          onClick={() =>
            queryClient.invalidateQueries({
              queryKey: ["admin-services"],
            })
          }
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Page heading */}
      <section className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Layers3 size={14} />
          PLATFORM MANAGEMENT
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Service{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            Management
          </span>
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
          View all services offered across FixItNow, explore categories,
          check pricing, and see which technicians provide each service.
        </p>
      </section>

      {/* Statistics */}
      <section className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              Total Services
            </p>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Wrench size={20} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {services.length}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Listed on the platform
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              Categories
            </p>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Layers3 size={20} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {categoryCount}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Categories represented
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              Technicians
            </p>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <Users size={20} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {technicianCount}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Providing listed services
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
              Average Price
            </p>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
              <CircleDollarSign size={20} />
            </div>
          </div>
          <p className="mt-3 break-words text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            {formatPrice(averagePrice)}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Average listed service price
          </p>
        </div>
      </section>

      {/* Search and listing */}
      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 sm:p-5">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              All Services
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "service" : "services"} found
            </p>
          </div>

          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search services, category..."
              aria-label="Search services"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-16 text-center dark:border-slate-700">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <PackageSearch size={27} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
              {services.length === 0
                ? "No services available"
                : "No matching services"}
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {services.length === 0
                ? "Services will appear here once they are added to the platform."
                : "Try a different service name, category, or technician."}
            </p>

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40 dark:hover:shadow-black/10"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-emerald-500 transition-transform duration-200 group-hover:scale-x-100" />

                {/* Icon and price */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-hover:bg-emerald-500/20">
                    <Wrench size={23} />
                  </div>

                  <div className="min-w-0 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Service price
                    </p>
                    <p className="mt-1 break-words text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {formatPrice(service.price)}
                    </p>
                  </div>
                </div>

                {/* Service details */}
                <div className="mt-5 min-w-0 flex-1">
                  <h3 className="break-words text-lg font-bold text-slate-900 dark:text-white">
                    {service.title}
                  </h3>

                  <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Layers3 size={13} className="shrink-0" />
                    <span className="break-words">
                      {service.category?.name || "Uncategorized"}
                    </span>
                  </div>

                  <p className="mt-3 min-h-[3rem] break-words text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {service.description?.trim() ||
                      "No description has been provided for this service."}
                  </p>
                </div>

                {/* Technician */}
                <div className="mt-5 flex min-w-0 items-center gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Users size={17} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Provided by
                    </p>
                    <p className="mt-0.5 break-words text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {service.technician?.user?.name || "Unknown technician"}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-slate-400 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminServicePage;
