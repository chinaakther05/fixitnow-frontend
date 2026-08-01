"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { Technician, Category, Service } from '@/types/technician';

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

    if (loadingTech || loadingCat) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 w-48 bg-slate-200 rounded-lg"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-80 bg-slate-200 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (errorTech) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-6 max-w-md mx-auto">
                    <p className="font-semibold text-lg mb-1">Failed to load technicians</p>
                    <p className="text-sm text-red-500">Please check your network connection and try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Browse Services</h1>
                <p className="text-slate-500 mt-1 text-sm md:text-base">Find trusted technicians for any home service.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 shrink-0 bg-white border border-slate-200 rounded-2xl p-5 h-fit shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-900 text-base">Filters</h3>
                        {(selectedCategory !== 'All' || searchTerm) && (
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                className="text-xs text-blue-600 font-medium hover:underline"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Search Field */}
                    <div className="mb-6">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search technician or skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-slate-300 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>

                    {/* Category List */}
                    <div>
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">
                            Category
                        </label>
                        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                    selectedCategory === 'All'
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                All Categories
                            </button>
                            {categories?.map((cat: Category) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                                        selectedCategory.toLowerCase() === cat.name.toLowerCase()
                                            ? 'bg-blue-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content / Technician Grid */}
                <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-4">
                        Showing <span className="font-bold text-slate-800">{filteredTechnicians?.length || 0}</span> technicians found
                    </p>

                    {!filteredTechnicians || filteredTechnicians.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl text-slate-400 p-6">
                            <p className="text-base font-medium text-slate-600 mb-1">No technicians match your filters.</p>
                            <p className="text-xs text-slate-400 mb-4">Try clearing your filters or search terms.</p>
                            <button
                                onClick={() => { setSelectedCategory('All'); setSearchTerm(''); }}
                                className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-colors"
                            >
                                Show All
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTechnicians.map((tech: Technician) => (
                                <div
                                    key={tech.id}
                                    className="bg-white border border-slate-200/80 rounded-2xl p-5 hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
                                >
                                    <div>
                                        {/* Top Info Header */}
                                        <div className="flex items-center gap-3.5 mb-3.5">
                                            {/* Profile Image */}
                                            <div className="relative shrink-0">
                                                {tech.user?.profileImage ? (
                                                    <Image
                                                        src={tech.user.profileImage}
                                                        alt={tech.user?.name || 'Technician'}
                                                        width={52}
                                                        height={52}
                                                        className="w-13 h-13 rounded-full object-cover border-2 border-slate-100 group-hover:border-blue-500 transition-colors shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                                                        {tech.user?.name?.charAt(0) || 'T'}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Name & Rating Row */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-slate-900 text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                                                    {tech.user?.name}
                                                </h3>

                                                {/* Rating & Reviews Badge */}
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs font-semibold border border-amber-200/60">
                                                        <span>★</span>
                                                        <span>{tech.avgRating || 0}</span>
                                                    </div>
                                                    <span className="text-xs text-slate-400 font-medium">
                                                        ({tech.totalReviews || 0} reviews)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Primary Skill / Specialty Badge */}
                                        <div className="mb-3">
                                            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-lg border border-blue-100">
                                                🛠️ {tech.skills?.[0] || 'General Expert'}
                                            </span>
                                        </div>

                                        {/* Short Bio / Description */}
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100/80">
                                            {tech.bio || tech.user?.description || 'Experienced professional providing top-quality repair and maintenance services.'}
                                        </p>
                                    </div>

                                    {/* Card Footer Section */}
                                    <div>
                                        {/* Pricing */}
                                        <div className="flex items-center justify-between py-2.5 border-t border-slate-100 mb-3">
                                            <span className="text-xs font-medium text-slate-400">Hourly Rate</span>
                                            <div className="text-right">
                                                <span className="text-base font-extrabold text-slate-900">৳{tech.hourlyRate || 0}</span>
                                                <span className="text-xs text-slate-400"> / hr</span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <Link
                                                href={`/technicians/${tech.id}`}
                                                className="w-full text-center text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-xl transition-all border border-slate-200/60 active:scale-95"
                                            >
                                                View Profile
                                            </Link>

                                            <Link
                                                href={`/technicians/${tech.id}?book=true`}
                                                className="w-full text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl transition-all shadow-md hover:shadow-blue-200 active:scale-95"
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
    );
};

export default ServicesPage;