"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  BookOpen, MapPin, Calendar, GraduationCap, ChevronLeft, ChevronRight,
  Share2, Heart, CheckCircle, Filter, X, ChevronDown
} from "lucide-react";
import { SCHOLARSHIPS, SCHOLARSHIP_COUNTRIES, SCHOLARSHIP_FILTER_TAGS } from "@/lib/constants/scholarships";

/* ─────────────────────────────── */
/* Filter Modal (reused from list)  */
/* ─────────────────────────────── */
function FilterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);
  if (!open) return null;
  const toggleTag = (tag: string) => {
    if (tag === "All") { setSelectedTags(["All"]); return; }
    const next = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags.filter(t => t !== "All"), tag];
    setSelectedTags(next.length === 0 ? ["All"] : next);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Filter</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"><X className="w-5 h-5 text-slate-500" /></button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Country</h3>
            <div className="grid grid-cols-3 gap-3">
              {SCHOLARSHIP_COUNTRIES.map(c => (
                <button key={c.name} onClick={() => setSelectedCountry(selectedCountry === c.name ? "" : c.name)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${selectedCountry === c.name ? "border-[#1D4ED8] bg-blue-50 text-[#1D4ED8]" : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}>
                  <span className="text-base">{c.emoji}</span><span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Popular tags</h3>
            <div className="flex flex-wrap gap-2">
              {SCHOLARSHIP_FILTER_TAGS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${selectedTags.includes(tag) ? "border-[#1D4ED8] bg-blue-50 text-[#1D4ED8]" : "border-slate-200 text-slate-600 hover:border-slate-300"}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-6 border-t border-slate-100">
          <button onClick={() => { setSelectedCountry(""); setSelectedTags(["All"]); }} className="text-red-500 font-semibold text-sm hover:text-red-700 transition">Reset all</button>
          <button onClick={onClose} className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">Apply &amp; Search</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* Section Accordion               */
/* ─────────────────────────────── */
function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-extrabold text-slate-900 mb-4 pb-2 border-b border-slate-100">{title}</h2>
      {children}
    </div>
  );
}

/* ─────────────────────────────── */
/* "You May Also Like" Card        */
/* ─────────────────────────────── */
function AlsoLikeCard({ s }: { s: typeof SCHOLARSHIPS[0] }) {
  const statusColor = s.status === "Open" ? "text-green-600 bg-green-50" : s.status === "Closing Soon" ? "text-amber-600 bg-amber-50" : "text-red-600 bg-red-50";
  return (
    <div className="min-w-[260px] max-w-[260px] bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group shrink-0 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] h-24 flex items-center justify-center relative">
        <div className="w-14 h-14 rounded-full bg-white p-1.5 flex items-center justify-center">
          <Image src={s.universityLogo} alt={s.university} width={48} height={48} unoptimized className="object-contain w-full h-full" />
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/scholarships/${s.slug}`}>
          <h3 className="font-bold text-slate-900 text-xs line-clamp-2 mb-0.5 group-hover:text-[#1D4ED8] transition-colors leading-snug">{s.name}</h3>
        </Link>
        <p className="text-[10px] text-[#1D4ED8] font-semibold mb-2">{s.university}</p>
        <div className="space-y-1 text-[10px] text-slate-600 mb-3">
          <div className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-slate-400" /><span>Amount: <span className="font-bold text-slate-800">{s.amount}</span></span></div>
          <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" /></div>
          <div className="flex items-center gap-1"><GraduationCap className="w-3 h-3 text-slate-400" /><span>Status: <span className={`font-bold text-xs px-1.5 py-0.5 rounded-full ${statusColor}`}>{s.status}</span></span></div>
          <div className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-400" /><span>Deadline: <span className="font-bold text-slate-800">{s.deadline}</span></span></div>
        </div>
        <Link href={`/scholarships/${s.slug}`} className="mt-auto text-center py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-all">
          Apply Now
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* Scholarship Detail Page          */
/* ─────────────────────────────── */
export default function ScholarshipDetailPage() {
  const params = useParams<{ slug: string }>();
  const scholarship = SCHOLARSHIPS.find(s => s.slug === params.slug);
  if (!scholarship) notFound();

  const [filterOpen, setFilterOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const related = SCHOLARSHIPS.filter(s => s.slug !== scholarship.slug && (s.country === scholarship.country || s.level === scholarship.level)).slice(0, 4);
  const alsoLikeScrollRef = useState<HTMLDivElement | null>(null);

  const scrollRelated = (dir: "left" | "right", ref: HTMLDivElement | null) => {
    if (ref) ref.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  let relatedRef: HTMLDivElement | null = null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Breadcrumb + Action bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500 truncate">
            <Link href="/" className="hover:text-[#1D4ED8] transition-colors">Home</Link>
            <span className="mx-1.5">›</span>
            <Link href="/scholarships" className="hover:text-[#1D4ED8] transition-colors">Scholarship</Link>
            <span className="mx-1.5">›</span>
            <span className="text-slate-700 font-medium truncate">{scholarship.name}</span>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => setFilterOpen(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button onClick={() => setSaved(v => !v)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium transition-all ${saved ? "border-red-300 bg-red-50 text-red-500" : "border-slate-200 text-slate-600 hover:border-red-200 hover:text-red-400"}`}>
              <Heart className={`w-4 h-4 ${saved ? "fill-red-500" : ""}`} /> {saved ? "Saved" : "Save"}
            </button>
            <Link href="/appointment"
              className="px-5 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
              Apply for Scholarship
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-16">

        {/* Title + Hero */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-6">{scholarship.name}</h1>

          {/* University image banner */}
          <div className="relative h-52 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] shadow-xl mb-6 flex items-center justify-center">
            <Image src={scholarship.image} alt={scholarship.name} fill unoptimized priority className="object-cover opacity-50" />
            <div className="relative z-10 w-28 h-28 rounded-full bg-white p-3 flex items-center justify-center shadow-xl">
              <Image src={scholarship.universityLogo} alt={scholarship.university} width={80} height={80} unoptimized className="object-contain w-full h-full" />
            </div>
          </div>

          {/* Stat pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <GraduationCap className="w-5 h-5 text-slate-400" />, label: "Institute", value: scholarship.university },
              { icon: <BookOpen className="w-5 h-5 text-slate-400" />, label: "Country of Source", value: scholarship.country },
              { icon: <Calendar className="w-5 h-5 text-slate-400" />, label: "Deadline", value: scholarship.deadline, highlight: true },
              { icon: <GraduationCap className="w-5 h-5 text-slate-400" />, label: "Level of Study", value: scholarship.level },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <p className="text-[10px] text-slate-400 font-medium mb-1">{stat.label}</p>
                <p className={`text-xs font-bold leading-snug ${stat.highlight ? "text-[#1D4ED8]" : "text-slate-800"}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary text */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          {scholarship.description.map((para, i) => (
            <p key={i} className="text-slate-700 text-sm leading-relaxed mb-4 last:mb-0">{para}</p>
          ))}
        </div>

        {/* Scholarship Summary Table */}
        <SectionBlock title="Scholarship Summary">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {Object.entries({
              "Level of Study": scholarship.summary_table.levelOfStudy,
              "Jurisdiction": scholarship.summary_table.jurisdiction,
              "Courses Offered": scholarship.summary_table.coursesOffered,
              "Amount": scholarship.amount,
              "Deadline": scholarship.deadline,
              "Program Period": scholarship.summary_table.programPeriod,
            }).map(([key, val], i) => (
              <div key={key} className={`flex items-start px-5 py-3.5 text-sm gap-4 ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                <span className="w-36 shrink-0 text-slate-500 font-medium">{key}</span>
                <span className="text-slate-800 font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Scholarship Coverage */}
        <SectionBlock title="Scholarship Coverage">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <ul className="space-y-3">
              {scholarship.coverage.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        {/* Inline CTA */}
        <div className="bg-gradient-to-r from-[#0C1A3E] to-[#1D4ED8] rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute rounded-full border border-white" style={{ width: 150 + i * 80, height: 150 + i * 80, top: "50%", right: "-30px", transform: "translateY(-50%)" }} />
            ))}
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-extrabold text-white mb-1">Are you interested in</h3>
            <h3 className="text-lg font-extrabold text-blue-200 mb-2">Studying Abroad?</h3>
            <p className="text-blue-100 text-sm">Getting you the right program. Apply and start planning your adventure.</p>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2 shrink-0">
            <div className="flex gap-2 mb-2">
              {["🇺🇸", "🇨🇦", "🇬🇧", "🇦🇺"].map(flag => (
                <div key={flag} className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-lg backdrop-blur">{flag}</div>
              ))}
            </div>
            <Link href="/appointment" className="px-7 py-2 bg-white hover:bg-slate-50 text-[#1D4ED8] font-bold rounded-xl text-sm shadow-lg transition-all">
              Get Started →
            </Link>
            <p className="text-blue-200 text-xs">120+ Partner Universities</p>
          </div>
        </div>

        {/* Eligibility Criteria */}
        <SectionBlock title="Eligibility Criteria">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-3">
            <div className={`rounded-xl border p-4 mb-3 ${scholarship.status === "Open" ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}`}>
              <p className="text-sm font-bold text-slate-800 mb-0.5">
                {scholarship.status === "Open" ? "✅ Applications are currently OPEN" : "⚠️ Applications are Closing Soon"}
              </p>
              <p className="text-xs text-slate-600">Deadline: {scholarship.deadline}</p>
            </div>
            <div className="mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Required Language</span>
              <p className="text-sm text-slate-800 font-semibold mt-1">{scholarship.requiredLanguage}</p>
            </div>
            <div className="mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Eligible Countries</span>
              <p className="text-sm text-slate-800 font-semibold mt-1">{scholarship.eligibleCountries}</p>
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 block">Criteria</span>
              <ul className="space-y-2.5">
                {scholarship.eligibilityCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1D4ED8] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionBlock>

        {/* Application Process */}
        <SectionBlock title="Application Process">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="space-y-4">
              {scholarship.applicationProcess.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#1D4ED8] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-md">{i + 1}</div>
                  <div className="pt-0.5">
                    <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link href="/appointment"
                className="inline-flex items-center justify-center w-full py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg">
                Book Free Scholarship Consultation →
              </Link>
            </div>
          </div>
        </SectionBlock>

        {/* Share bar */}
        <div className="flex items-center gap-3 mb-8">
          <Share2 className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500 font-medium">Share this scholarship:</span>
          {[{ color: "#1877F2", icon: "f", label: "Facebook" }, { color: "#000", icon: "𝕏", label: "Twitter" }, { color: "#0A66C2", icon: "in", label: "LinkedIn" }, { color: "#25D366", icon: "W", label: "WhatsApp" }].map(s => (
            <a key={s.label} href="#" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
              style={{ backgroundColor: s.color }}>
              {s.icon}
            </a>
          ))}
        </div>

        {/* You may also like */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-extrabold text-slate-900">You may also like</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => scrollRelated("left", relatedRef)}
                  className="w-8 h-8 border border-slate-200 rounded-xl flex items-center justify-center hover:border-[#1D4ED8] transition-all">
                  <ChevronLeft className="w-4 h-4 text-slate-500" />
                </button>
                <button onClick={() => scrollRelated("right", relatedRef)}
                  className="w-8 h-8 border border-slate-200 rounded-xl flex items-center justify-center hover:border-[#1D4ED8] transition-all">
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>
            <div ref={el => { relatedRef = el; }} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {related.map(r => <AlsoLikeCard key={r.id} s={r} />)}
            </div>
          </section>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
}
