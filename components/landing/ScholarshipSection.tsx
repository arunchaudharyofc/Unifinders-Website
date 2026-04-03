/**
 * ============================================================================
 * SCHOLARSHIPS SECTION
 * ============================================================================
 * Blue full-width section with scholarship headline + animated student cards
 * grid using actual student images from constants data.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @updated     2026-04-01  — Real student photos, stagger animation, hover fx
 * ============================================================================
 */
"use client";

import { ArrowRight, Star } from "lucide-react";
import NextImage from "next/image";
import { SCHOLARSHIP_CONTENT } from "@/lib/constants/landing";
import Link from "next/link";

export default function ScholarshipSection() {
  return (
    <section id="scholarships" aria-label="Scholarships" className="bg-[#0070F0] py-20 md:py-28 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/5 rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-xl text-white">
            <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-4">
              {SCHOLARSHIP_CONTENT.tagline}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              {SCHOLARSHIP_CONTENT.headline}
            </h2>
            <p className="text-blue-100 text-base md:text-lg mb-10 leading-relaxed">
              {SCHOLARSHIP_CONTENT.description}
            </p>
            <Link
              href={SCHOLARSHIP_CONTENT.cta.href}
              className="inline-flex items-center gap-2 h-12 px-7 bg-white text-[#0070F0] font-semibold rounded-xl hover:bg-blue-50 transition-all group shadow-lg shadow-black/10 hover:-translate-y-0.5"
            >
              {SCHOLARSHIP_CONTENT.cta.text}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right: Student Cards Grid with actual photos */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {SCHOLARSHIP_CONTENT.students.map((student, i) => (
              <div
                key={student.name}
                className={`rounded-2xl overflow-hidden shadow-xl relative group animate-fade-up ${
                  i % 2 !== 0 ? "mt-8" : ""
                }`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Student Photo with colored background fallback */}
                <div className={`${student.bgColor} h-52 relative overflow-hidden`}>
                  <NextImage
                    src={student.image}
                    alt={`${student.name} — scholarship recipient from ${student.country}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>

                {/* Name Card */}
                <div className="bg-white p-3.5 text-center">
                  <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                  <p className="text-xs text-slate-500">{student.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
