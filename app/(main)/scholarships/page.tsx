"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search, Filter, X, ChevronLeft, ChevronRight,
  Heart, BookOpen, MapPin, Calendar, GraduationCap, ChevronDown
} from "lucide-react";
import {
  SCHOLARSHIPS,
  SCHOLARSHIP_COUNTRIES,
  SCHOLARSHIP_FILTER_TAGS,
  SCHOLARSHIP_FAQS,
} from "@/lib/constants/scholarships";
import PageHero from "@/components/shared/PageHero";

const ITEMS_PER_PAGE = 9;

/* ─────────────────────────────── */
/* Filter Modal                     */
/* ─────────────────────────────── */
function FilterModal({
  open,
  onClose,
  selectedCountry,
  setSelectedCountry,
  selectedTags,
  setSelectedTags,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  selectedCountry: string;
  setSelectedCountry: (c: string) => void;
  selectedTags: string[];
  setSelectedTags: (t: string[]) => void;
  onApply: () => void;
}) {
  if (!open) return null;
  const toggleTag = (tag: string) => {
    if (tag === "All") { setSelectedTags(["All"]); return; }
    const next = selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag) : [...selectedTags.filter(t => t !== "All"), tag];
    setSelectedTags(next.length === 0 ? ["All"] : next);
  };
  const reset = () => { setSelectedCountry(""); setSelectedTags(["All"]); };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Filter</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
            <X className="w-5 h-5 text-slate-500" />
          </button>
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
          <button onClick={reset} className="text-red-500 font-semibold text-sm hover:text-red-700 transition">Reset all</button>
          <button onClick={() => { onApply(); onClose(); }} className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
            Apply &amp; Search
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* Scholarship Card                 */
/* ─────────────────────────────── */
function ScholarshipCard({ s }: { s: typeof SCHOLARSHIPS[0] }) {
  const [saved, setSaved] = useState(false);
  const statusColor = s.status === "Open" ? "text-green-600 bg-green-50 border-green-200" : s.status === "Closing Soon" ? "text-amber-600 bg-amber-50 border-amber-200" : "text-red-600 bg-red-50 border-red-200";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden">
      {/* University logo banner */}
      <div className="relative bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] h-32 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center p-2 shadow-lg">
          <Image src={s.universityLogo} alt={s.university} width={64} height={64} unoptimized className="object-contain w-full h-full" />
        </div>
        {/* save button */}
        <button onClick={() => setSaved(v => !v)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow transition-transform hover:scale-110">
          <Heart className={`w-4 h-4 transition-colors ${saved ? "fill-red-500 text-red-500" : "text-slate-400"}`} />
        </button>
        {/* status badge */}
        <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
          {s.status}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/scholarships/${s.slug}`}>
          <h3 className="font-bold text-slate-900 text-[13px] leading-snug mb-0.5 group-hover:text-[#1D4ED8] transition-colors line-clamp-2">
            {s.name}
          </h3>
        </Link>
        <p className="text-xs text-[#1D4ED8] font-semibold mb-3">{s.university}</p>

        <div className="space-y-1.5 text-xs text-slate-600 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Amount of Source: <span className="font-semibold text-slate-800">{s.amount}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Status: <span className={`font-semibold ${s.status === "Open" ? "text-green-600" : s.status === "Closing Soon" ? "text-amber-600" : "text-red-600"}`}>{s.status}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Level: <span className="font-semibold text-slate-800">{s.level}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Deadline: <span className="font-semibold text-slate-800">{s.deadline}</span></span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link href={`/scholarships/${s.slug}`}
            className="text-xs font-bold text-[#1D4ED8] hover:underline">
            Learn More →
          </Link>
          <Link href={`/scholarships/${s.slug}`}
            className="text-xs px-3 py-1.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg transition-all">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────── */
/* FAQ Accordion                    */
/* ─────────────────────────────── */
function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {SCHOLARSHIP_FAQS.map((faq, i) => (
        <div key={i} className={`rounded-xl border transition-all ${openIdx === i ? "border-[#1D4ED8] bg-blue-50" : "border-slate-200 bg-white"}`}>
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left">
            <span className={`text-sm font-semibold ${openIdx === i ? "text-[#1D4ED8]" : "text-slate-900"}`}>{faq.q}</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-3 transition-all ${openIdx === i ? "bg-[#1D4ED8] rotate-180" : "bg-slate-100"}`}>
              <ChevronDown className={`w-4 h-4 ${openIdx === i ? "text-white" : "text-slate-500"}`} />
            </div>
          </button>
          {openIdx === i && (
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────── */
/* Scholarships Listing Page        */
/* ─────────────────────────────── */
export default function ScholarshipsPage() {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);
  const [appliedCountry, setAppliedCountry] = useState("");
  const [appliedTags, setAppliedTags] = useState<string[]>(["All"]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("Ending Soonest");

  const filtered = useMemo(() => {
    let list = SCHOLARSHIPS.filter(s => {
      const matchSearch = search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.university.toLowerCase().includes(search.toLowerCase());
      const matchCountry = appliedCountry === "" || s.country === appliedCountry;
      const matchTags = appliedTags.includes("All") || s.tags.some(t => appliedTags.some(at => t.toLowerCase().includes(at.toLowerCase())));
      return matchSearch && matchCountry && matchTags;
    });
    if (sortBy === "Ending Soonest") list = list.sort((a, b) => a.status === "Closing Soon" ? -1 : 1);
    return list;
  }, [search, appliedCountry, appliedTags, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-50">

      <PageHero
        breadcrumb={[{ label: "Scholarships" }]}
        title="Find Scholarship that"
        titleHighlight="suits you the best"
        subtitle="Over 50+ scholarships available. Our counselors help you identify the right funding and start your journey."
      >
        <div className="flex items-center gap-3 max-w-2xl bg-white rounded-xl p-1.5 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-2 border-r border-slate-200 shrink-0 cursor-pointer" onClick={() => setFilterOpen(true)}>
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600 hidden sm:block">Filter</span>
          </div>
          <input type="text" placeholder="Search for scholarship..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none focus:outline-none bg-transparent px-2 border-none ring-0 focus:ring-0 search-bar-input" />
          <button className="px-5 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shrink-0">
            Search
          </button>
        </div>
      </PageHero>

      {/* All Programs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-extrabold text-slate-900">All Programs</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 bg-white outline-none focus:border-[#1D4ED8] cursor-pointer">
              <option>Ending Soonest</option>
              <option>Newest First</option>
              <option>Amount: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {paginated.map(s => <ScholarshipCard key={s.id} s={s} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No scholarships found</h3>
            <p className="text-slate-500 text-sm mb-6">Try adjusting your search or filter.</p>
            <button onClick={() => { setSearch(""); setAppliedCountry(""); setAppliedTags(["All"]); }}
              className="px-6 py-2.5 bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm">Clear all filters</button>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 mb-14">
            <p className="text-sm text-slate-500">
              Displaying results: <span className="font-semibold text-slate-700">{(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)}</span> of{" "}
              <span className="font-semibold text-slate-700">{filtered.length}</span> entries
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(pg => (
                <button key={pg} onClick={() => setPage(pg)}
                  className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${pg === page ? "bg-[#1D4ED8] text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}>{pg}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <div>
            <p className="text-sm font-bold text-[#1D4ED8] mb-1">Got Question?</p>
            <h2 className="text-xl font-extrabold text-slate-900 mb-6">
              <span className="text-[#1D4ED8]">Find answers here.</span>
            </h2>
            <FaqAccordion />
          </div>
          {/* CTA panel */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-50 to-amber-50 p-8 relative overflow-hidden min-h-[160px] flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto">
                    <div className="w-full h-full rounded-full bg-amber-100 overflow-hidden">
                      <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                        alt="Student" fill unoptimized className="object-cover object-top" />
                    </div>
                  </div>
                </div>
                {/* floating flags */}
                <div className="absolute top-4 right-4 bg-white rounded-2xl p-2 shadow-md text-xl">🇺🇸</div>
                <div className="absolute bottom-4 left-4 bg-white rounded-2xl p-2 shadow-md text-xl">🇨🇦</div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">Are you interested in</h3>
                <h3 className="text-xl font-extrabold text-[#1D4ED8] mb-3">Studying Abroad?</h3>
                <p className="text-slate-500 text-sm mb-5 leading-relaxed">We help you find the perfect program, apply and start planning your adventure.</p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-2 text-sm bg-slate-50 rounded-xl px-3 py-2">
                    <GraduationCap className="w-4 h-4 text-[#1D4ED8]" />
                    <div><p className="font-extrabold text-slate-900 text-base leading-none">120+</p><p className="text-[10px] text-slate-500">College Profiles</p></div>
                  </div>
                </div>
                <Link href="/appointment" className="w-full block text-center py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)}
        selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
        onApply={() => { setAppliedCountry(selectedCountry); setAppliedTags(selectedTags); }} />
    </div>
  );
}
