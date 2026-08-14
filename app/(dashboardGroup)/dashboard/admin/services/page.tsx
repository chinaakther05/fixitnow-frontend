"use client";

import { getAllServicesAdmin } from "@/app/(dashboardGroup)/-actions/admin";
import { useQuery } from "@tanstack/react-query";

import { Wrench } from "lucide-react";

interface AdminService {
  id: string;
  title: string;
  description?: string;
  price: number;
  category?: { name: string };
  technician?: { user?: { name: string } };
}

const AdminServicePage = () => {
  const { data: services, isLoading, isError } = useQuery<AdminService[]>({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const result = await getAllServicesAdmin();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center text-red-500">
        Failed to load services.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Service <span className="text-emerald-600 dark:text-emerald-400">Management</span></h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          All services offered across the platform.
        </p>
      </div>

      {!services || services.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-400">No services found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  ৳{service.price}
                </span>
              </div>

              <h3 className="font-semibold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 mb-2">
                {service.category?.name}
              </p>

              {service.description && (
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3 line-clamp-2">
                  {service.description}
                </p>
              )}

              <p className="text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                By {service.technician?.user?.name || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminServicePage;