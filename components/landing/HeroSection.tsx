/**
 * HERO SECTION — Pixel-perfect Figma match
 * Light blue gradient bg, headline, search bar, trust row.
 * Right side: hero student PNG (composite with flags + 120+ card baked in)
 * Full viewport, no overflow into page 2.
 *
 * @updated  2026-04-01  — Entrance animations, focus rings, flag float
 */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Search, MapPin } from "lucide-react";
import NextImage from "next/image";
import { HERO_CONTENT } from "@/lib/constants/landing";

export default function HeroSection() {
  const router = useRouter();
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    if (!course.trim() && !location.trim()) return;
    const params = new URLSearchParams();
    if (course.trim()) params.append("q", course.trim());
    if (location.trim()) params.append("loc", location.trim());
    router.push(`/search?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <section
      id="hero"
      aria-label="Hero section"
      className="relative pt-[72px] overflow-hidden bg-[#D9EBFF]"
      style={{ minHeight: "calc(100vh - 0px)", maxHeight: "100vh" }}
    >
      {/* Subtle wave bg */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
        style={{ minHeight: "calc(100vh - 72px)" }}
      >
        <div className="flex flex-col lg:flex-row w-full justify-between items-center py-8 lg:py-0">

          {/* ── Left: Content ── */}
          <div className="max-w-[560px] lg:w-[48%] shrink-0">

            {/* Tagline */}
            <p className="text-[#0070F0] font-bold tracking-[0.12em] text-[13px] uppercase mb-4 animate-fade-up">
              {HERO_CONTENT.tagline}
            </p>

            {/* Headline */}
            <h1 className="font-extrabold text-[#111827] tracking-[-0.02em] leading-[1.08] mb-6 animate-fade-up delay-100"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {HERO_CONTENT.headlinePart1}{" "}
              <span className="text-[#DE2B2B]">{HERO_CONTENT.headlineHighlight}</span>
              <br />
              <span>at your{" "}</span>
              <span className="relative inline-block">
                fingertips
                <span className="absolute left-0 bottom-[4px] w-full h-[6px] bg-[#FFD700] rounded-sm z-[-1]" />
              </span>
            </h1>

            {/* Checkpoints */}
            <div className="space-y-3 mb-8 animate-fade-up delay-200">
              {HERO_CONTENT.checkpoints.map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0070F0] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-white w-4 h-4" />
                  </div>
                  <span className="text-[15px] font-medium text-[#111827]">{text}</span>
                </div>
              ))}
            </div>

            {/* ── Search Bar ── */}
            <div className="bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row items-stretch w-full max-w-[580px] border border-white/80 mb-8 overflow-hidden animate-fade-up delay-300 focus-within:ring-2 focus-within:ring-[#0070F0]/50 transition-all">
              <div className="flex-1 px-5 py-4 flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={HERO_CONTENT.searchPlaceholders.course}
                  className="w-full bg-transparent focus:outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium"
                />
              </div>
              {/* Divider */}
              <div className="hidden sm:block w-px bg-slate-200 my-3" />
              <div className="flex-1 px-5 py-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={HERO_CONTENT.searchPlaceholders.location}
                  className="w-full bg-transparent focus:outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium"
                />
              </div>
              <button 
                onClick={handleSearch}
                className="bg-[#0070F0] text-white px-8 py-4 font-bold text-[15px] hover:bg-blue-700 transition-colors whitespace-nowrap active:bg-blue-800"
              >
                Search
              </button>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 animate-fade-up delay-400">
              <div className="flex">
                {[11, 12, 13, 14].map((id, index) => (
                  <NextImage
                    key={id}
                    src={`https://i.pravatar.cc/80?img=${id}`}
                    alt="Student avatar"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover -ml-2 first:ml-0"
                    style={{ zIndex: 10 - index }}
                  />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0070F0] flex items-center justify-center text-[10px] font-bold text-white -ml-2">
                  {HERO_CONTENT.trustBadge.count}
                </div>
              </div>
              <p className="text-[13px] font-semibold text-slate-800">
                {HERO_CONTENT.trustBadge.label}
              </p>
            </div>
          </div>

          {/* ── Right: Hero Composite Image (has flags + 120+ card baked in) ── */}
          <div className="relative flex justify-center lg:justify-end items-end w-full lg:w-[52%] mt-10 lg:mt-0 shrink-0 self-end lg:self-auto animate-fade-up delay-200">
            <NextImage
              src="/images/hero-student.png"
              alt="Graduate student ready to study abroad — with 120+ universities badge"
              width={700}
              height={700}
              priority
              className="w-full max-w-[520px] lg:max-w-none h-auto object-contain"
              style={{ maxHeight: "calc(100vh - 120px)" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
