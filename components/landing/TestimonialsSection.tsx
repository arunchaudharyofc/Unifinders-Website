/**
 * ============================================================================
 * TESTIMONIALS SECTION
 * ============================================================================
 * "What our Clients Say" — auto-advancing carousel with student photo,
 * quote, prev/next arrows, and pagination dots.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @updated     2026-04-01  — Auto-advance, arrow nav, smooth transitions
 * ============================================================================
 */
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants/landing";
import NextImage from "next/image";

const AUTO_ADVANCE_MS = 5000;

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = TESTIMONIALS[activeIndex];

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  return (
    <section id="testimonials" aria-label="Client testimonials" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-[#0070F0] font-bold uppercase tracking-widest text-xs mb-3">
            SUCCESS STORIES
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            What our <span className="text-[#0070F0]">Clients Say</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-5xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-[#0070F0] hover:border-[#0070F0] transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 z-20 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-[#0070F0] hover:border-[#0070F0] transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div
            key={activeIndex}
            className="grid md:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden shadow-xl border border-slate-100 animate-fade-in"
          >
            {/* Photo */}
            <div className="h-64 md:h-auto bg-slate-200 relative overflow-hidden">
              <NextImage
                src={testimonial.image}
                alt={`${testimonial.name} - student from ${testimonial.country}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Quote */}
            <div className="bg-blue-50/50 p-8 md:p-12 flex flex-col justify-center relative">
              {/* Big Quote Mark */}
              <div className="text-[#0070F0] text-6xl font-serif leading-none mb-4">&ldquo;</div>

              <blockquote className="text-slate-700 text-base md:text-lg leading-relaxed mb-8">
                {testimonial.quote}
              </blockquote>

              <div>
                <p className="font-bold text-slate-900 text-lg">{testimonial.name}</p>
                <p className="text-slate-500 text-sm">{testimonial.country}</p>
              </div>

              {/* Decorative circle */}
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-blue-100/50 rounded-full -z-10" />
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-10 bg-[#0070F0]"
                    : "w-6 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
