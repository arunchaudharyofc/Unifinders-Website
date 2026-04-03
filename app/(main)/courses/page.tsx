"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Star, CheckCircle2, BookOpen, Monitor, Award } from "lucide-react";
import { COURSES } from "@/lib/constants/courses";

// ── Logo renderer per course ──────────────────────────────────
function CourseLogo({ course }: { course: typeof COURSES[0] }) {
  const logoStyles: Record<string, { bg: string; text: string; border: string }> = {
    ielts:  { bg: "#FEF2F2", text: "#C8102E", border: "#FECACA" },
    pte:    { bg: "#EFF6FF", text: "#00549F", border: "#BFDBFE" },
    toefl:  { bg: "#F0F4FF", text: "#004C8C", border: "#C7D2FE" },
    gmat:   { bg: "#F8FAFC", text: "#1C1C1C", border: "#E2E8F0" },
    gre:    { bg: "#F0F9FF", text: "#007AB8", border: "#BAE6FD" },
    sat:    { bg: "#F0FDFA", text: "#009CDE", border: "#99F6E4" },
    oet:    { bg: "#F0FDF4", text: "#1E5C3A", border: "#BBF7D0" },
  };
  const style = logoStyles[course.slug] ?? { bg: "#F8FAFC", text: "#1D4ED8", border: "#E2E8F0" };
  return (
    <div className="w-16 h-10 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: style.bg, border: `1.5px solid ${style.border}` }}>
      <span className="font-extrabold text-sm tracking-tight" style={{ color: style.text }}>{course.name}</span>
    </div>
  );
}

// ── Stats ─────────────────────────────────────────────────────
const STATS = [
  { value: "10K+", label: "Research Publications", icon: "📚" },
  { value: "2400+", label: "Patents Filed", icon: "📋" },
  { value: "30", label: "Industry Sponsored Advanced Labs", icon: "🔬" },
  { value: "50", label: "Departmental Research Groups", icon: "🏛️" },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0C1A3E] to-[#1D4ED8] pt-28 pb-14 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/30"
              style={{ width: 200 + i * 150, height: 200 + i * 150, top: "50%", right: "-100px", transform: "translateY(-50%)" }} />
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-xs text-blue-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-1.5">›</span>
            <span className="text-blue-100">Our Courses</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Our Test Prep <span className="text-blue-400">Courses</span>
          </h1>
          <p className="text-blue-200 max-w-xl text-base leading-relaxed">
            Industry-leading English proficiency and graduate test preparation by certified experts. Guaranteed score improvement or free retake coaching.
          </p>
        </div>
      </div>

      {/* Main Courses + Intellectual Pursuits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* Left: Course List */}
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">Available Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COURSES.map(course => (
                <Link key={course.id} href={`/courses/${course.slug}`}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-[#1D4ED8]/30 transition-all duration-200 group">
                  <CourseLogo course={course} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-extrabold text-slate-900 group-hover:text-[#1D4ED8] transition-colors">{course.name}</h3>
                      {course.isNew && (
                        <span className="text-[10px] font-bold bg-[#1D4ED8] text-white px-1.5 py-0.5 rounded-md">New!</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{course.fullName}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Users className="w-3 h-3" /> {course.students}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {course.rating}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 text-[10px] font-bold text-[#1D4ED8] opacity-0 group-hover:opacity-100 transition-opacity mt-1">View →</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Our Intellectual Pursuits */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              {/* Dark top section */}
              <div className="bg-[#0C1A3E] p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    alt="Education" fill unoptimized className="object-cover object-top mix-blend-overlay" />
                </div>
                <div className="relative z-10">
                  <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-2">Unifinders Excellence</p>
                  <h3 className="text-xl font-extrabold text-white leading-snug">Our Intellectual Pursuits</h3>
                </div>
              </div>
              {/* Stats grid */}
              <div className="bg-[#1D4ED8] grid grid-cols-2">
                {STATS.map((stat, i) => (
                  <div key={i} className={`p-5 border-[#2563EB] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""}`}>
                    <p className="text-2xl font-extrabold text-white mb-1">{stat.value}</p>
                    <p className="text-[11px] text-blue-200 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust + Stats Bar */}
      <div className="border-y border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Trusted by clients */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80",
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80",
                  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=40&q=80",
                ].map((src, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <Image src={src} alt="Student" width={36} height={36} unoptimized className="object-cover w-full h-full" />
                  </div>
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-white bg-[#1D4ED8] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">10k</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Trusted by our clients</p>
                <p className="text-xs text-slate-500">10,000+ students enrolled</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-10 w-px bg-slate-200" />

            {/* 120+ Universities */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">120+ Universities</p>
                <p className="text-xs text-slate-500">Partner institutions worldwide</p>
              </div>
            </div>

            <div className="hidden sm:block h-10 w-px bg-slate-200" />

            {/* 98% Visa */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">98% Visa Success</p>
                <p className="text-xs text-slate-500">Student visa approval rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Classes Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Why Study with Unifinders?</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">We empower students with a platform to unlock their potential and connect them to opportunities around the world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Monitor className="w-8 h-8 text-[#1D4ED8]" />,
              title: "Live Classes",
              desc: "We empower students with a platform to unlock their potential and connect them to opportunities around the world.",
            },
            {
              icon: <Users className="w-8 h-8 text-[#1D4ED8]" />,
              title: "Expert Instructors",
              desc: "Learn from certified counselors, former British Council examiners, and IIM-trained GMAT coaches with proven track records.",
            },
            {
              icon: <CheckCircle2 className="w-8 h-8 text-[#1D4ED8]" />,
              title: "Score Guarantee",
              desc: "Not happy with your score? Repeat the entire course for free — we are that confident in our teaching methodology.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all duration-200">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="mx-4 sm:mx-6 max-w-7xl lg:mx-auto mb-16">
        <div className="bg-gradient-to-r from-[#0C1A3E] to-[#1D4ED8] rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Not sure which course to take?</h2>
            <p className="text-blue-200 max-w-lg text-sm leading-relaxed">Talk to our counselors — they&apos;ll recommend the best test based on your target university, country, and timeline. 100% free consultation.</p>
          </div>
          <Link href="/appointment"
            className="shrink-0 px-8 py-3.5 bg-white text-[#1D4ED8] font-extrabold rounded-xl hover:bg-blue-50 transition-all text-sm shadow-lg">
            Book Free Counseling →
          </Link>
        </div>
      </div>
    </div>
  );
}
