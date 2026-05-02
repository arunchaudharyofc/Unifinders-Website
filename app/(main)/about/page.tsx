import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Users, Globe, Award, Heart, Target, BookOpen, TrendingUp } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "About Us — Unifinders Education Pvt. Ltd.",
  description: "Learn about Unifinders — Nepal's most trusted study abroad counseling platform helping students achieve their international education dreams since 2018.",
};

const STATS = [
  { value: "1,200+", label: "Students Helped", icon: "🎓" },
  { value: "120+",   label: "Partner Universities", icon: "🏛️" },
  { value: "18+",    label: "Destination Countries", icon: "🌍" },
  { value: "98%",    label: "Visa Success Rate", icon: "✅" },
];

const TEAM = [
  { name: "Rajesh Shrestha", role: "Founder & CEO", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", bio: "10+ years in international education consulting. Formerly at British Council Nepal." },
  { name: "Sunita Rai", role: "Head of Counseling", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", bio: "Australia & UK specialist. Helped 600+ students secure scholarships." },
  { name: "Priya Koirala", role: "Scholarship Advisor", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", bio: "GMAT & US admissions expert with 800+ successful student applications." },
  { name: "Arjun Thapa", role: "Visa Documentation Lead", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80", bio: "Specialized in UK, Canada, and Australia student visa documentation." },
];

const VALUES = [
  { icon: Heart, title: "Student-First", desc: "Every decision we make puts student success at the center." },
  { icon: Globe, title: "Global Mindset", desc: "We connect Nepali students to world-class education opportunities." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in counseling and guidance." },
  { icon: Target, title: "Transparency", desc: "Honest advice, clear fees, no hidden agendas — ever." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        breadcrumb={[{ label: "About Us" }]}
        title="Helping Nepali Students"
        titleHighlight="Dream Globally"
        subtitle="Since 2018, Unifinders Education Pvt. Ltd. has been Nepal's most trusted study abroad counseling platform — turning international education dreams into reality."
      />

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 text-center">
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-extrabold text-[#1D4ED8]">{s.value}</div>
              <div className="text-xs text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-[#1D4ED8] uppercase tracking-widest mb-2">Our Mission</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-5 leading-snug">
              Democratizing Access to Global Education
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              At Unifinders, we believe that every deserving student — regardless of their financial background — should have access to world-class international education.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              We provide free counseling, scholarship matching, visa support, SOP/LOR review, and post-arrival guidance to help Nepali students succeed at every step of their study abroad journey.
            </p>
            <Link href="/appointment" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D4ED8] text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all">
              Book Free Counseling <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden shadow-xl">
            <Image src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
              alt="Students celebrating" fill unoptimized className="object-cover" />
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-slate-50 py-16 px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-[#1D4ED8] uppercase tracking-widest mb-2">Our Values</p>
            <h2 className="text-3xl font-extrabold text-slate-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-[#1D4ED8]" />
                </div>
                <h3 className="font-extrabold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-[#1D4ED8] uppercase tracking-widest mb-2">Our Team</p>
          <h2 className="text-3xl font-extrabold text-slate-900">Meet the Experts Behind Unifinders</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map(m => (
            <div key={m.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-center p-6">
              <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 bg-slate-100">
                <Image src={m.avatar} alt={m.name} width={64} height={64} unoptimized className="object-cover w-full h-full" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">{m.name}</h3>
              <p className="text-xs text-[#1D4ED8] font-semibold mb-2">{m.role}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] py-16 px-4 text-center">
        <h2 className="text-2xl font-extrabold text-white mb-3">Ready to Start Your Journey?</h2>
        <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto">Join 1,200+ students who trusted Unifinders to guide their study abroad journey.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/appointment" className="px-7 py-3 bg-white text-[#1D4ED8] font-bold rounded-xl hover:bg-blue-50 transition-all text-sm">
            Book Free Counseling
          </Link>
          <Link href="/auth/register" className="px-7 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
