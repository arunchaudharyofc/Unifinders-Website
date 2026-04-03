import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Briefcase, MapPin, Clock, TrendingUp, Users, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers — Unifinders Education Pvt. Ltd.",
  description: "Join the Unifinders team and help shape the future of international education for Nepali students.",
};

const OPENINGS = [
  { title: "Senior Education Counselor", dept: "Counseling", location: "Kathmandu, Nepal", type: "Full-Time", desc: "Guide students through university selection, applications, and visa processes for UK, Australia, and Canada." },
  { title: "IELTS / PTE Trainer", dept: "Test Preparation", location: "Kathmandu, Nepal", type: "Full-Time / Part-Time", desc: "Deliver high-quality English language training classes to students targeting band scores of 7.0 and above." },
  { title: "Digital Marketing Executive", dept: "Marketing", location: "Kathmandu, Nepal (Hybrid)", type: "Full-Time", desc: "Drive student acquisition through SEO, social media, and paid campaigns across our digital platforms." },
  { title: "Full Stack Developer", dept: "Technology", location: "Kathmandu / Remote", type: "Full-Time", desc: "Build and scale the Unifinders web platform using Next.js, TypeScript, Prisma, and Supabase." },
  { title: "Student Support Coordinator", dept: "Operations", location: "Kathmandu, Nepal", type: "Full-Time", desc: "Manage student onboarding, document collection, and provide ongoing support throughout the application process." },
  { title: "Social Media Content Creator", dept: "Marketing", location: "Kathmandu / Remote", type: "Part-Time", desc: "Create engaging content for Facebook, Instagram, TikTok, and LinkedIn that inspires students to study abroad." },
];

const PERKS = [
  { icon: "💰", title: "Competitive Salary", desc: "Market-competitive compensation with performance bonuses." },
  { icon: "📚", title: "Learning Budget", desc: "Annual training budget for courses, certifications, and conferences." },
  { icon: "🌍", title: "Global Exposure", desc: "Work with university partners from 18+ countries worldwide." },
  { icon: "🏥", title: "Health Insurance", desc: "Medical and health coverage for you and your immediate family." },
  { icon: "⏰", title: "Flexible Hours", desc: "Flexible work schedules and hybrid work options available." },
  { icon: "🎓", title: "Study Abroad Discount", desc: "Employee discount on all Unifinders counseling services." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0C1A3E] via-[#1D4ED8] to-[#2563EB] pt-28 pb-20 px-4 text-center">
        <nav className="text-xs text-blue-300 mb-5 flex items-center justify-center gap-1.5">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" /><span className="text-blue-100">Careers</span>
        </nav>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
          Build Your Career at <br /><span className="text-blue-300">Unifinders</span>
        </h1>
        <p className="text-blue-200 text-sm max-w-xl mx-auto leading-relaxed mb-8">
          Join a passionate team dedicated to transforming international education access for Nepali students. We&apos;re hiring across multiple roles.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-2 rounded-full"><Users className="w-4 h-4" /> 25+ Team Members</div>
          <div className="flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-2 rounded-full"><TrendingUp className="w-4 h-4" /> Rapidly Growing</div>
          <div className="flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-2 rounded-full"><Heart className="w-4 h-4" /> Mission-Driven</div>
        </div>
      </div>

      {/* Perks */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Why Join Unifinders?</h2>
          <p className="text-slate-500 text-sm mt-2">We invest in our people as much as we invest in our students.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {PERKS.map(p => (
            <div key={p.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Job Openings */}
      <div className="bg-slate-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#1D4ED8] uppercase tracking-widest mb-2">Open Positions</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Current Job Openings</h2>
          </div>
          <div className="space-y-4">
            {OPENINGS.map(job => (
              <div key={job.title} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded-full">{job.dept}</span>
                      <span className="text-xs text-slate-400">{job.type}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900 mb-1 group-hover:text-[#1D4ED8] transition-colors">{job.title}</h3>
                    <p className="text-sm text-slate-500 mb-3 leading-relaxed">{job.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                    </div>
                  </div>
                  <a href="mailto:careers@myunifinders.com?subject=Application: ${job.title}"
                    className="shrink-0 px-5 py-2.5 bg-[#1D4ED8] text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all">
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Application */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-extrabold mb-3">Don&apos;t See Your Role?</h2>
          <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto">We&apos;re always looking for talented people. Send your CV and tell us how you can contribute.</p>
          <a href="mailto:careers@myunifinders.com"
            className="inline-block px-8 py-3 bg-white text-[#1D4ED8] font-bold rounded-xl hover:bg-blue-50 transition-all text-sm">
            Send Open Application →
          </a>
        </div>
      </div>
    </div>
  );
}
