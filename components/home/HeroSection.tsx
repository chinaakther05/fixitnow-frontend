"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
    {
        image: 'https://i.ibb.co/tTH7ByCw/What-to-Look-For-in-a-Professional-Plumber-residential-plumbing-services-Ehret-Plumbing.jpg',
        title: 'Expert Plumbing Services',
        subtitle: 'Fix leaks, install fixtures, and more — all at your doorstep.',
    },
    {
        image: 'https://i.ibb.co/vx5Qv3QP/image.jpg',
        title: 'Trusted Electrical Work',
        subtitle: 'Certified electricians for safe and reliable repairs.',
    },
    {
        image: 'https://i.ibb.co/Kx85t8FC/ima.jpg',
        title: 'Deep Home Cleaning',
        subtitle: 'A spotless home is just one booking away.',
    },
];

const categories = ['Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Carpentry', 'AC Repair'];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-[500px] flex overflow-hidden rounded-b-2xl">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900/95 text-white p-6 z-20">
                <h3 className="text-lg font-semibold mb-4 text-cyan-300">Categories</h3>
                <ul className="space-y-3">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <button className="text-sm text-slate-200 hover:text-cyan-300 transition-colors">
                                {cat}
                            </button>
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Image Slider */}
            <div className="relative flex-1 h-full">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            priority={index === 0}
                            className="object-cover"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Text content */}
                        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 text-white">
                            <span className="bg-cyan-500/90 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                FixItNow
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-lg">
                                {slide.title}
                            </h1>
                            <p className="text-base md:text-lg text-slate-100 max-w-md mb-6">
                                {slide.subtitle}
                            </p>
                            <button className="bg-white text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors">
                                Book Now
                            </button>
                        </div>
                    </div>
                ))}

                {/* Slide indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all ${
                                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;