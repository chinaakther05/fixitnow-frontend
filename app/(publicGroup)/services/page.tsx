"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import api from '@/lib/api';
import { Technician, Category, Service } from '@/types/technician';

const ServicesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

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
            tech.services?.some((s: Service) => s.category?.name === selectedCategory);
        const matchesSearch = tech.user?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loadingTech || loadingCat) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 w-48 bg-slate-200 rounded"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-48 bg-slate-200 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (errorTech) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <p className="text-red-500 font-medium">
                    Failed to load technicians. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Browse Services</h1>
            <p className="text-slate-500 mb-8">Find trusted technicians for any home service.</p>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 shrink-0 bg-white border border-slate-200 rounded-xl p-5 h-fit">
                    <h3 className="font-semibold text-slate-800 mb-4">Filters</h3>

                    <div className="mb-6">
                        <label className="text-sm font-medium text-slate-600 mb-2 block">Search</label>
                        <input
                            type="text"
                            placeholder="Search technician..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-600 mb-2 block">Category</label>
                        <div className="space-y-2">
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                    selectedCategory === 'All'
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                            >
                                All
                            </button>
                            {categories?.map((cat: Category) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        selectedCategory === cat.name
                                            ? 'bg-blue-600 text-white'
                                            : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Technician Grid */}
                <div className="flex-1">
                    <p className="text-sm text-slate-500 mb-4">
                        {filteredTechnicians?.length || 0} technicians found
                    </p>

                    {!filteredTechnicians || filteredTechnicians.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            No technicians match your filters.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTechnicians.map((tech: Technician) => (
                                <Link
                                    href={`/technicians/${tech.id}`}
                                    key={tech.id}
                                    className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-shadow block"
                                >
                                    <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg mb-4">
                                        {tech.user?.name?.charAt(0)}
                                    </div>

                                    <h3 className="font-semibold text-slate-900">{tech.user?.name}</h3>
                                    <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full mt-1 mb-3">
                                        {tech.skills?.[0] || 'General'}
                                    </span>

                                    <div className="flex items-center gap-1 text-sm text-amber-500 mb-3">
                                        <span>⭐</span>
                                        <span className="font-medium">{tech.avgRating || 0}</span>
                                        <span className="text-slate-400">({tech.totalReviews || 0} reviews)</span>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-lg font-bold text-slate-900">
                                            ৳{tech.hourlyRate || 0}
                                            <span className="text-sm font-normal text-slate-400">/hr</span>
                                        </span>
                                        <span className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg">
                                            View Profile
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;