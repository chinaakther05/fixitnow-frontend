"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { Technician, Category, Service } from '@/types/technician';
import { Search, Star, Wrench, RotateCcw } from 'lucide-react';

const ServicesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { data: technicians, isLoading: loadingTech, isError: errorTech } = useQuery<Technician[]>({
    queryKey: ['technicians'],
    queryFn: async () => {
      const res = await api.get('/technicians');
      return res.data.data;
    },
  });

  const { data: categories, isLoading: loadingCat } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data.data;
    },
  });

  const filteredTechnicians = technicians?.filter((tech: Technician) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      tech.services?.some(
        (s: Service) => s.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
      );

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      tech.user?.name?.toLowerCase().includes(searchLower) ||
      tech.skills?.some((skill: string) => skill.toLowerCase().includes(searchLower)) ||
      tech.services?.some((s: Service) => s.title?.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  // Skeleton Loader State
  if (loadingTech || loadingCat) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10">
          <div className="animate-pulse space-y-6">
            <div className="h-9 w-56 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (errorTech) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300 px-4">
        <div className="max-w-md w-full border bg-white dark:bg-slate-900 border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 rounded-2xl p-8 text-center shadow-lg">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">!</div>
          <p className="font-bold text-lg mb-1 text-slate-900 dark:text-slate-100">Failed to load technicians</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Please check your network connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Browse Services
          </h1>
          <p className="mt-1.5 text-sm md:text-base text-slate-600 dark:text-slate-400">
            Find trusted, verified technicians for all your home repair needs.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl p-5 h-fit shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Filters</h3>
              {(selectedCategory !== 'All' || searchTerm) && (
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                  className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                Search
              </label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input
                  type="text"
                  placeholder="Search technician..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded-xl pl-9 pr-3.5 py-2.5 text-sm outline-none transition-all bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:border-emerald-600 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Category List */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">
                Category
              </label>
              <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === 'All'
                      ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All Categories
                </button>
                {categories?.map((cat: Category) => {
                  const isActive = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content / Technician Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Showing <span className="font-bold text-slate-900 dark:text-slate-100">{filteredTechnicians?.length || 0}</span> technicians
              </p>
            </div>

            {!filteredTechnicians || filteredTechnicians.length === 0 ? (
              <div className="text-center py-20 border rounded-2xl p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <p className="text-base font-semibold mb-1 text-slate-900 dark:text-slate-100">No technicians match your filters.</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Try resetting your search terms or selecting another category.</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
                  className="inline-flex items-center px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60 rounded-xl text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTechnicians.map((tech: Technician) => (
                  <div
                    key={tech.id}
                    className="group relative border rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md"
                  >
                    <div>
                      {/* Profile Header */}
                      <div className="flex items-start gap-3.5 mb-4">
                        <div className="relative shrink-0 w-13 h-13">
                          {tech.user?.profileImage ? (
                            <Image
                              src={tech.user.profileImage}
                              alt={tech.user?.name || 'Technician'}
                              fill
                              sizes="60px"
                              className="rounded-full object-cover border border-slate-200 dark:border-slate-700 group-hover:border-emerald-500/50 transition-all shadow-sm"
                            />
                          ) : (
                            <div className="w-13 h-13 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                              {tech.user?.name?.charAt(0) || 'T'}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base line-clamp-1 transition-colors text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {tech.user?.name}
                          </h3>

                          {/* Rating Badge */}
                          <div className="flex items-center gap-1.5 mt-1">
                            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{tech.avgRating || 0}</span>
                            </div>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                              ({tech.totalReviews || 0})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Primary Skill Tag */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
                          <Wrench className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          {tech.skills?.[0] || 'General Expert'}
                        </span>
                      </div>

                      {/* Short Bio */}
                      <p className="text-xs line-clamp-2 leading-relaxed mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                        {tech.bio || tech.user?.description || 'Experienced professional providing top-quality repair and maintenance services.'}
                      </p>
                    </div>

                    {/* Footer / Pricing & Actions */}
                    <div>
                      <div className="flex items-center justify-between py-2.5 border-t border-slate-100 dark:border-slate-800 mb-3">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Hourly Rate</span>
                        <div className="text-right">
                          <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">৳{tech.hourlyRate || 0}</span>
                          <span className="text-xs text-slate-500 dark:text-slate-400"> / hr</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/technicians/${tech.id}`}
                          className="w-full text-center text-xs font-semibold py-2.5 rounded-xl transition-all border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 active:scale-[0.98]"
                        >
                          View Profile
                        </Link>

                        <Link
                          href={`/booking/${tech.id}`}
                          className="w-full text-center text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 py-2.5 rounded-xl transition-all shadow-sm active:scale-[0.98]"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;