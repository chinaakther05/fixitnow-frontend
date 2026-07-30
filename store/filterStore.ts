import { create } from "zustand";

type FilterState = {
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  setCategory: (category: string | null) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  category: null,
  minPrice: null,
  maxPrice: null,
  setCategory: (category) => set({ category }),
  setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
  resetFilters: () => set({ category: null, minPrice: null, maxPrice: null }),
}));