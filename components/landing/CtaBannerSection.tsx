/**
 * CTA BANNER SECTION — Enterprise-grade with HTML text
 *
 * Implements the Figma design using real text and buttons for accessibility
 * and SEO, rather than relying on a static image banner.
 *
 * @updated  2026-04-09  — Real text and layout
 */
"use client";

import { Star, ArrowRight, Trophy } from "lucide-react";
import Image from "next/image";
import { CTA_BANNER } from "@/lib/constants/landing";
import Link from "next/link";

export default function CtaBannerSection() {
  return (
    <section id="cta-banner" aria-label="Call to action" className="bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#F4F9FF] rounded-[32px] md:rounded-[40px] p-10 md:p-16 lg:p-20 flex flex-col md:flex-row items-center justify-between min-h-[400px]">
          
          {/* Left Text Content */}
          <div className="w-full md:w-[60%] lg:w-1/2 relative z-10 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-4">
              Are you interested in<br />
              <span className="text-[#0070F0]">Studying Abroad?</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              We'll help you find the perfect program, apply and start planning your adventure!
            </p>
            <Link
              href={CTA_BANNER.cta.href}
              className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#0070F0] text-white font-semibold text-[15px] rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-400/30 group/btn"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Image Content & Floating Badges */}
          <div className="w-full md:w-[40%] lg:w-1/2 mt-12 md:mt-0 relative flex justify-center md:block">
            {/* 
              If the actual student image exists, it'll display beautifully here. 
              We use arbitrary scaling/transform to place it exactly on the right. 
            */}
            <div className="relative w-[300px] sm:w-[350px] md:w-full md:absolute md:-bottom-24 md:-right-8 lg:-right-4 h-[400px]">
              <Image
                src="/images/hero-student.png"
                alt="Happy student studying abroad"
                fill
                className="object-contain object-bottom"
                priority
              />

              {/* Floating "Trophy" badge - Top Right */}
              <div className="absolute top-[20%] right-0 md:-right-4 bg-white rounded-xl p-3 shadow-lg flex items-center justify-center animate-bounce-slow" style={{ animationDuration: '4s' }}>
                <Trophy className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>

              {/* Floating "Happy Clients" badge - Bottom Left */}
              <div className="absolute bottom-[10%] -left-8 md:-left-16 bg-white rounded-2xl p-4 shadow-xl border border-slate-50">
                <p className="text-sm font-extrabold text-slate-900 mb-1">20k Happy Clients</p>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    ))}
                    <Star className="w-3.5 h-3.5 text-slate-200 fill-slate-200" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">4.0 of 15k</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
