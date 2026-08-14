"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/app/(dashboardGroup)/-actions/category";



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

  const { data: categories, isLoading, isError } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await getCategories();
      if (!result.success) throw new Error(result.message);
      return result.data;
    },
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsSubmitting(true);

    const result = await createCategory({ name, description, icon });

    setIsSubmitting(false);

    if (result.success) {
      toast.success("Category created successfully");
      setName("");
      setDescription("");
      setIcon("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } else {
      toast.error(result.message || "Failed to create category");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="animate-pulse grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center text-red-500">
        Failed to load categories.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage service categories.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-4"
        >
          <h2 className="font-semibold text-foreground">New Category</h2>

          <div>
            <label className="text-sm font-medium text-foreground">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Plumbing"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Icon (emoji)</label>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="🔧"
              className="w-full mt-1 border border-border rounded-lg px-3 py-2 text-sm bg-background text-foreground"
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Category"}
          </Button>
        </form>
      )}

      {!categories || categories.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <Tag className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No categories yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-card border border-border rounded-xl p-5 flex items-start gap-3"
            >
              <div className="text-2xl">{category.icon || "🔧"}</div>
              <div>
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;