
"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Plus,
  Tag,
  Layers3,
  ArrowUpRight,
  X,
  CheckCircle2,
  FolderOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  createCategory,
  getCategories,
} from "@/app/(dashboardGroup)/-actions/category";

type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
};

const AdminCategoriesPage = () => {
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await getCategories();

      if (!result.success) {
        throw new Error(result.message);
      }

      return result.data;
    },
  });

  const resetForm = () => {
    setName("");
    setDescription("");
    setIcon("");
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedIcon = icon.trim();

    if (!trimmedName) {
      toast.error("Category name is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createCategory({
        name: trimmedName,
        description: trimmedDescription,
        icon: trimmedIcon,
      });

      if (!result.success) {
        toast.error(result.message || "Failed to create category");
        return;
      }

      toast.success("Category created successfully");

      resetForm();
      setShowForm(false);

      await queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="h-4 w-80 max-w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
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
          <Layers3 size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          Could not load categories
        </h2>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Please refresh the page and try again.
        </p>

        <Button
          className="mt-5"
          variant="outline"
          onClick={() =>
            queryClient.invalidateQueries({
              queryKey: ["categories"],
            })
          }
        >
          Try Again
        </Button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Page heading */}
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            <Layers3 size={14} />
            SERVICE MANAGEMENT
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Service{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Categories
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Organize your services into categories and keep your platform
            structured and easy to navigate.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setShowForm((previous) => !previous)}
          className="h-11 w-full shrink-0 gap-2 rounded-xl bg-emerald-600 px-5 font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Close Form" : "Add Category"}
        </Button>
      </section>

      {/* Overview cards */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Categories
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {categories.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Tag size={23} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Categories available on your platform
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                With Description
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {categories.filter((category) => category.description?.trim()).length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <FolderOpen size={23} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            Categories with additional details
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Category Status
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                {categories.length > 0 ? "Ready to use" : "No categories"}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
              <CheckCircle2 size={23} />
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
            {categories.length > 0
              ? "Your service categories are listed below"
              : "Add a category to get started"}
          </p>
        </div>
      </section>

      {/* Create category form */}
      {showForm && (
        <section className="mb-8 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm dark:border-emerald-500/20 dark:bg-slate-900">
          <div className="border-b border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/50 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Plus size={20} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Create New Category
                </h2>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  Add a new service category to FixItNow.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleCreate} className="space-y-5 p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="min-w-0">
                <label
                  htmlFor="category-name"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Category Name <span className="text-red-500">*</span>
                </label>

                <input
                  id="category-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Plumbing"
                  maxLength={100}
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Choose a clear, easy-to-understand name.
                </p>
              </div>

              <div className="min-w-0">
                <label
                  htmlFor="category-icon"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Icon <span className="text-slate-400">(Optional)</span>
                </label>

                <input
                  id="category-icon"
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="🔧"
                  maxLength={20}
                  disabled={isSubmitting}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950"
                />

                <p className="mt-1.5 text-xs text-slate-400">
                  Use an emoji such as 🔧, 🧹, or ⚡.
                </p>
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="category-description"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Description{" "}
                  <span className="text-slate-400">(Optional)</span>
                </label>

                <textarea
                  id="category-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe the services in this category..."
                  rows={3}
                  maxLength={500}
                  disabled={isSubmitting}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:bg-slate-950"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="rounded-xl"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="gap-2 rounded-xl bg-emerald-600 px-5 text-white hover:bg-emerald-700"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Create Category
                  </>
                )}
              </Button>
            </div>
          </form>
        </section>
      )}

      {/* Category list heading */}
      <section>
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              All Categories
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Browse your service categories.
            </p>
          </div>

          <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"}
          </span>
        </div>

        {categories.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Tag size={30} />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
              No categories yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
              Create your first service category to start organizing the
              services on your platform.
            </p>

            {!showForm && (
              <Button
                onClick={() => setShowForm(true)}
                className="mt-5 gap-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
              >
                <Plus size={17} />
                Add First Category
              </Button>
            )}
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => (
              <article
                key={category.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-950/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500/40 dark:hover:shadow-black/10"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-emerald-500 transition-transform duration-200 group-hover:scale-x-100" />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-3xl transition-colors group-hover:bg-emerald-100 dark:border-emerald-500/10 dark:bg-emerald-500/10 dark:group-hover:bg-emerald-500/20">
                    {category.icon || "🔧"}
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Category
                  </span>
                </div>

                <div className="mt-5 min-w-0 flex-1">
                  <h3 className="break-words text-lg font-bold text-slate-900 dark:text-white">
                    {category.name}
                  </h3>

                  <p className="mt-2 break-words text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {category.description?.trim() ||
                      "No description has been added for this category."}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <span className="text-xs text-slate-400">
                    Service category
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-600 dark:group-hover:bg-emerald-500/10 dark:group-hover:text-emerald-400">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminCategoriesPage;
