/**
 * HIGHLIGHTS / FEATURES SECTION — Figma-accurate
 * Three alternating image+text blocks with relevant photos.
 * Images use reliable URLs with proper object-cover display.
 */
"use client";

import { useState } from "react";
import NextImage from "next/image";
import {
  Users, GraduationCap, Users2, ArrowRight,
  CheckCircle2, MessageSquare, Landmark, Globe,
} from "lucide-react";
import { FEATURE_TABS, FEATURE_BLOCKS } from "@/lib/constants/landing";
import Link from "next/link";

const TAB_ICONS: Record<string, React.ElementType> = {
  Users,
  GraduationCap,
  Users2,
};

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  Landmark,
  Globe,
  Users2,
};

// Reliable, relevant images (no CORS issues, directly accessible photos)
const BLOCK_IMAGES: Record<string, string> = {
  counselling:
    "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "explore-courses":
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "admission-visa":
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

export default function HighlightsSection() {
  const [activeTab, setActiveTab] = useState<string>(FEATURE_TABS[0].id);

  return (
    <section id="features" aria-label="Platform features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Heading ── */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Connecting Universities{" "}
            <br className="hidden md:block" />
            with <span className="text-[#0070F0]">Students</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Unifinders works hand-in-hand for partner institutions. We support
            marketing, brand building, student diversity and international student
            recruitment.
          </p>
        </div>

        {/* ── Tab Pills ── */}
        <div className="flex justify-center mb-16">
          <div className="bg-slate-50 border border-slate-200 p-1.5 rounded-full inline-flex items-center gap-1 shadow-sm">
            {FEATURE_TABS.map((tab) => {
              const Icon = TAB_ICONS[tab.icon];
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white text-[#0070F0] shadow font-semibold"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                  aria-selected={isActive}
                  role="tab"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Feature Blocks ── */}
        <div className="space-y-24 md:space-y-32">
          {FEATURE_BLOCKS.filter((block) => block.tabId === activeTab).map((block, index) => {
            const isImageLeft = block.imagePosition === "left";
            const imgSrc = BLOCK_IMAGES[block.id] ?? block.image;
            const FeatureIcon = ICON_MAP[block.icon];

            return (
              <div
                key={block.id}
                className={`flex flex-col gap-12 lg:gap-16 items-center ${
                  isImageLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                }`}
              >
                {/* ── Image Side ── */}
                <div className="w-full lg:w-1/2 relative group flex-shrink-0">
                  <div className="rounded-3xl overflow-hidden shadow-lg relative h-[300px] sm:h-[380px] md:h-[440px] bg-slate-100">
                    {/* Actual photo */}
                    <NextImage
                      src={imgSrc}
                      alt={`${block.titleHighlight} image`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      onError={(e) => {
                        // Fallback if image fails
                        e.currentTarget.srcset = "";
                        e.currentTarget.src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200";
                      }}
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

                    {/* Floating badge — shown only for Counselling block (index 0) */}
                    {index === 0 && (
                      <div className="absolute bottom-5 right-5 bg-white px-4 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-3 min-w-[200px]">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Status</p>
                          <p className="text-[14px] font-bold text-slate-900">Application Approved</p>
                        </div>
                      </div>
                    )}

                    {/* Progress badge for Admission block (index 2) */}
                    {index === 2 && (
                      <div className="absolute bottom-5 right-5 bg-white px-4 py-3 rounded-2xl shadow-xl z-20 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                          <Globe className="w-5 h-5 text-[#0070F0]" />
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Visa Status</p>
                          <p className="text-[14px] font-bold text-slate-900">In Progress</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Text Side ── */}
                <div className="w-full lg:w-1/2 max-w-lg">
                  {/* Icon box */}
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                    {FeatureIcon
                      ? <FeatureIcon className="text-red-500 w-6 h-6" />
                      : <span className="text-xl">{block.icon}</span>
                    }
                  </div>

                  <h2 className="text-3xl sm:text-[36px] font-bold text-slate-900 leading-[1.2] mb-4 tracking-tight">
                    {block.title}{" "}
                    <span className="text-[#0070F0]">{block.titleHighlight}</span>
                    {block.titleSuffix && (
                      <span className="font-normal text-slate-900"> {block.titleSuffix}</span>
                    )}
                  </h2>

                  <p className="text-slate-500 text-base md:text-[17px] mb-8 leading-relaxed">
                    {block.description}
                  </p>

                  <Link
                    href={block.cta.href}
                    className="inline-flex items-center gap-2 h-12 px-7 bg-[#0070F0] text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-500/25 hover:-translate-y-0.5 group"
                  >
                    {block.cta.text}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
