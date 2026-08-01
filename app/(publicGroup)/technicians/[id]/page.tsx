import React from 'react';
import { getTechnicianById } from '@/actions/technician';
import { notFound } from 'next/navigation';

const TechnicianProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const result = await getTechnicianById(id);

    if (!result.success || !result.data) {
        notFound();
    }

    const technician = result.data;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            {/* Profile Header */}
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-6 flex flex-col sm:flex-row gap-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-3xl shrink-0">
                    {technician.user?.name?.charAt(0)}
                </div>

                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {technician.user?.name}
                    </h1>
                    <div className="flex items-center gap-1 text-amber-500 mt-1">
                        <span>⭐</span>
                        <span className="font-medium">{technician.avgRating || 0}</span>
                        <span className="text-slate-400 dark:text-slate-500">
                            ({technician.totalReviews || 0} reviews)
                        </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-3">
                        {technician.bio || "No bio available."}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {technician.skills?.map((skill: string) => (
                            <span
                                key={skill}
                                className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-3 py-1 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        ৳{technician.hourlyRate || 0}
                        <span className="text-sm font-normal text-slate-400">/hr</span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left: Reviews */}
                <div className="lg:col-span-2">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Reviews ({technician.reviews?.length || 0})
                    </h2>

                    {!technician.reviews || technician.reviews.length === 0 ? (
                        <p className="text-slate-400">No reviews yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {technician.reviews.map((review: { id: string; rating: number; comment: string | null; customer: { name: string } }) => (
                                <div
                                    key={review.id}
                                    className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-slate-900 dark:text-white">
                                            {review.customer?.name}
                                        </span>
                                        <span className="text-amber-500 text-sm">
                                            {"⭐".repeat(review.rating)}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Booking Card Placeholder */}
                <div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sticky top-6">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                            Book This Technician
                        </h3>
                        <p className="text-sm text-slate-400">Booking form coming next...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechnicianProfilePage;