/**
 * CTA BANNER SECTION — Enterprise-grade with coded fallback
 *
 * Primary: Uses the Figma-exported `cta-student.png` as a full section visual.
 * Fallback: If image fails, shows a rich gradient-coded CTA section.
 * The interactive "Get Started" button and stats are always live+accessible.
 *
 * @updated  2026-04-01  — Coded fallback, stats, gradient design
 */
"use client";

import { useState } from "react";
import { Star, ArrowRight, Users } from "lucide-react";
import NextImage from "next/image";
import { CTA_BANNER } from "@/lib/constants/landing";
import Link from "next/link";

export default function CtaBannerSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="cta-banner" aria-label="Call to action" className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Image-based CTA (primary) ── */}
        {!imgFailed ? (
          <div className="relative rounded-[28px] overflow-hidden shadow-lg group">
            {/* Background design image */}
            <NextImage
              src="/images/cta-student.png"
              alt="Happy student studying abroad"
              width={1200}
              height={400}
              className="w-full h-auto object-contain transform translate-y-4 hover:translate-y-0 transition-transform duration-700"
              loading="lazy"
              aria-hidden="true"
              onError={() => setImgFailed(true)}
            />

            {/* Interactive overlay — live clickable button */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-1/2 pl-10 md:pl-16 lg:pl-20 flex flex-col items-start gap-4">
                <div className="flex-1" />
                <Link
                  href={CTA_BANNER.cta.href}
                  className="inline-flex items-center gap-2 h-12 px-8 bg-[#0070F0] text-white font-semibold text-[15px] rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-400/30 hover:-translate-y-0.5 group/btn"
                  style={{ marginTop: "58%" }}
                >
                  {CTA_BANNER.cta.text}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <div className="flex-1" />
              </div>
            </div>
          </div>
        ) : (
          /* ── Coded Fallback CTA ── */
          <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0070F0] via-[#0060D0] to-[#004AAD] p-10 md:p-16 lg:p-20">
            {/* Decorative blobs */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
              {/* Text side */}
              <div className="max-w-lg text-white">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                  {CTA_BANNER.headline}{" "}
                  <span className="text-[#FFD700]">{CTA_BANNER.highlightedText}</span>
                </h2>
                <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed">
                  {CTA_BANNER.description}
                </p>
                <Link
                  href={CTA_BANNER.cta.href}
                  className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#0070F0] font-bold text-base rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-0.5 group/btn"
                >
                  {CTA_BANNER.cta.text}
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Stats side */}
              <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 min-w-[200px]">
                <Users className="w-8 h-8 text-white mb-3" />
                <p className="text-4xl font-extrabold text-white">{CTA_BANNER.stats.value}</p>
                <p className="text-blue-200 text-sm font-medium mt-1">{CTA_BANNER.stats.label}</p>
                <div className="flex items-center gap-1 mt-3">
                  {[1, 2, 3, 4].map((s) => (
                    <Star key={s} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <Star className="w-4 h-4 text-yellow-400/50" />
                </div>
                <p className="text-blue-200 text-xs mt-1">{CTA_BANNER.stats.rating}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
