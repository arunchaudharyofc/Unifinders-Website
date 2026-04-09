/**
 * ============================================================================
 * PARTNER UNIVERSITIES SECTION
 * ============================================================================
 * "Our Partner Universities" — FUNCTIONAL country filter tabs + logo grid
 * with prev/next navigation + "View all Universities" CTA.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @updated     2026-04-01  — Functional country filters, stagger animation
 * ============================================================================
 */
"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PARTNER_UNIVERSITIES, PARTNER_COUNTRY_FLAGS } from "@/lib/constants/landing";
import Link from "next/link";

export default function PartnerUniversitiesSection({ universities }: { universities?: any }) {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const fallbackData = universities || PARTNER_UNIVERSITIES;

  const filteredUniversities = useMemo(() => {
    if (!activeCountry) return [...fallbackData];
    return fallbackData.filter((uni: any) => uni.country === activeCountry);
  }, [activeCountry, fallbackData]);

  return (
    <section id="partners" aria-label="Partner Universities" className="py-20 md:py-28 bg-slate-50/50 relative overflow-hidden">
      {/* Subtle grid lines background like Figma */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Our Partner <span className="text-[#0070F0]">Universities</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            Explore our network of 120+ partner institutions across the globe.
            <br className="hidden md:block" />
            Click a country flag to filter by region.
          </p>
        </div>

        {/* Country Flag Tabs — now functional */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {/* "All" tab */}
          <button
            onClick={() => setActiveCountry(null)}
            className={`px-5 h-12 rounded-full flex items-center justify-center transition-all text-sm font-semibold ${
              !activeCountry
                ? "bg-[#0070F0] text-white shadow-md"
                : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300"
            }`}
          >
            All
          </button>
          {PARTNER_COUNTRY_FLAGS.map((flag) => (
            <button
              key={flag.code}
              onClick={() => setActiveCountry(activeCountry === flag.code ? null : flag.code)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                activeCountry === flag.code
                  ? "border-2 border-[#0070F0] shadow-md bg-white scale-110"
                  : "border border-slate-200 bg-white hover:border-blue-300 hover:scale-105"
              }`}
              title={flag.country}
            >
              <img
                src={`https://flagcdn.com/w40/${flag.code}.png`}
                alt={flag.country}
                className="w-7 h-5 rounded-sm object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* University Logo Grid (filtered) — 3 rows × 5 cols matching Figma */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 mb-12">
          {filteredUniversities.slice(0, 15).map((uni: any, i: number) => (
            <div
              key={uni.name}
              className="bg-white rounded-xl p-4 flex items-center justify-center h-20 shadow-sm border border-slate-100 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-300 group animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
              title={uni.name}
            >
              <img
                src={uni.logo}
                alt={uni.name}
                className="max-h-10 max-w-[140px] w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                loading="lazy"
                onError={(e) => {
                  // Fallback: hide broken image, show text name
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector("span")) {
                    const span = document.createElement("span");
                    span.className = "text-xs font-bold text-slate-500 text-center uppercase tracking-wider leading-tight";
                    span.textContent = uni.name;
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Results count */}
        {activeCountry && (
          <p className="text-center text-sm text-slate-400 mb-6 animate-fade-in">
            Showing {filteredUniversities.length} {filteredUniversities.length === 1 ? "university" : "universities"} in {PARTNER_COUNTRY_FLAGS.find(f => f.code === activeCountry)?.country || activeCountry.toUpperCase()}
          </p>
        )}

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            className="w-12 h-12 rounded-xl border border-blue-200 bg-white flex items-center justify-center hover:bg-blue-50 transition-colors text-[#0070F0]"
            aria-label="Previous universities"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <Link
            href="/study"
            className="h-12 px-8 flex items-center text-sm font-semibold text-[#0070F0] border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
          >
            View all Destinations
          </Link>
          <button
            className="w-12 h-12 rounded-xl border border-blue-200 bg-white flex items-center justify-center hover:bg-blue-50 transition-colors text-[#0070F0]"
            aria-label="Next universities"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
