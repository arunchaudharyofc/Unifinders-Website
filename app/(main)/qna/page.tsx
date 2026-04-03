"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ThumbsUp, MessageSquare, Eye, Share2, ChevronLeft, ChevronRight,
  Filter, X, Search, ChevronDown, Flag, GraduationCap
} from "lucide-react";
import {
  QNA_QUESTIONS, QNA_CONTRIBUTORS, QNA_CATEGORIES, QNA_COUNTRIES,
  QNA_FILTER_TAGS, QNA_SPONSORED,
} from "@/lib/constants/qna";

const ITEMS_PER_PAGE = 6;

/* ─── Filter Modal ─────────────────────────────────────────── */
function FilterModal({
  open, onClose,
  selectedCountry, setSelectedCountry,
  selectedTags, setSelectedTags,
  onApply,
}: {
  open: boolean; onClose: () => void;
  selectedCountry: string; setSelectedCountry: (c: string) => void;
  selectedTags: string[]; setSelectedTags: (t: string[]) => void;
  onApply: () => void;
}) {
  if (!open) return null;
  const toggleTag = (tag: string) => {
    if (tag === "All") { setSelectedTags(["All"]); return; }
    const next = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags.filter(t => t !== "All"), tag];
    setSelectedTags(next.length === 0 ? ["All"] : next);
  };
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
              {QNA_COUNTRIES.map(c => (
                <button key={c.name} onClick={() => setSelectedCountry(selectedCountry === c.name ? "" : c.name)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${selectedCountry === c.name ? "border-[#1D4ED8] bg-blue-50 text-[#1D4ED8]" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}>
                  <span className="text-base">{c.emoji}</span><span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-100" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Popular tags</h3>
            <div className="flex flex-wrap gap-2">
              {QNA_FILTER_TAGS.map(tag => (
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
          <button onClick={() => { onApply(); onClose(); }} className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">Apply &amp; Search</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Ask a Question Modal ──────────────────────────────────── */
function AskModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;
  const submit = () => {
    if (!text.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setText(""); onClose(); }, 2000);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Ask your Question</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition"><X className="w-5 h-5 text-slate-500" /></button>
        </div>
        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Question Submitted!</h3>
            <p className="text-slate-500 text-sm">Our experts will answer your question shortly.</p>
          </div>
        ) : (
          <>
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">Ask your question about colleges, courses, and other related topics, try to be detailed as possible.</p>
              <textarea
                value={text} onChange={e => setText(e.target.value.slice(0, 300))}
                placeholder="Type your question here..."
                rows={6}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 resize-none outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition"
              />
              <p className="text-right text-xs text-slate-400 mt-1">{text.length}/300</p>
            </div>
            <div className="px-6 pb-6">
              <button onClick={submit} disabled={!text.trim()}
                className="w-full py-3 bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition-all">
                Ask Question
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Question Card ─────────────────────────────────────────── */
function QuestionCard({ q }: { q: typeof QNA_QUESTIONS[0] }) {
  const author = QNA_CONTRIBUTORS.find(c => c.id === q.authorId);
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      {/* Author row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Link href={`/qna/contributor/${q.authorId}`}>
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow">
              {author ? (
                <Image src={author.avatar} alt={author.name} width={40} height={40} unoptimized className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm">{q.authorId[0].toUpperCase()}</div>
              )}
            </div>
          </Link>
          <div>
            <Link href={`/qna/contributor/${q.authorId}`} className="text-sm font-bold text-slate-900 hover:text-[#1D4ED8] transition-colors">{author?.name}</Link>
            <p className="text-[11px] text-slate-400">{q.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 px-2.5 py-1 rounded-full">
            {q.answersCount} Answers Available
          </span>
          <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors">
            <Flag className="w-3 h-3" /> Report
          </button>
        </div>
      </div>

      {/* Question content */}
      <Link href={`/qna/${q.slug}`}>
        <h3 className="text-sm font-bold text-slate-900 mb-2 hover:text-[#1D4ED8] transition-colors leading-snug cursor-pointer">{q.title}</h3>
      </Link>
      <p className="text-xs text-slate-600 leading-relaxed mb-1 line-clamp-2">{q.body.replace(/\n/g, " ")}</p>
      <Link href={`/qna/${q.slug}`} className="text-xs font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-0.5">
        Read More <ChevronRight className="w-3 h-3" />
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
        {q.tags.slice(0, 3).map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full font-medium">{tag}</span>
        ))}
      </div>

      {/* Stats + actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <button onClick={() => setLiked(v => !v)} className={`flex items-center gap-1.5 font-medium transition-colors ${liked ? "text-[#1D4ED8]" : "hover:text-[#1D4ED8]"}`}>
            <ThumbsUp className={`w-3.5 h-3.5 ${liked ? "fill-[#1D4ED8]" : ""}`} />
            {(q.likes + (liked ? 1 : 0)).toLocaleString()}
          </button>
          <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" />{q.comments}</span>
          <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{q.views.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-slate-500 hover:text-[#1D4ED8] flex items-center gap-1 font-medium transition-colors">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <Link href={`/qna/${q.slug}`}
            className="px-4 py-1.5 bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all">
            Answer
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Right Sidebar ─────────────────────────────────────────── */
function RightSidebar({ onAsk }: { onAsk: () => void }) {
  return (
    <div className="space-y-5">
      {/* Ask CTA */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <p className="text-sm font-bold text-slate-900 mb-3">Have a Question in mind?</p>
        <button onClick={onAsk}
          className="w-full py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
          Ask a Question
        </button>
      </div>

      {/* Top Contributors */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Top Contributors</h3>
        <div className="space-y-3">
          {QNA_CONTRIBUTORS.slice(0, 5).map(c => (
            <Link key={c.id} href={`/qna/contributor/${c.id}`} className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 ring-2 ring-slate-50">
                <Image src={c.avatar} alt={c.name} width={36} height={36} unoptimized className="object-cover w-full h-full" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors truncate">{c.name}</p>
                <p className="text-[10px] text-slate-400">Students Helped: {c.studentsHelped.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sponsored Links */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Sponsored Links</h3>
        <div className="space-y-3">
          {QNA_SPONSORED.map(s => (
            <div key={s.id} className="flex items-center gap-3 rounded-xl overflow-hidden hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <Image src={s.image} alt={s.title} width={80} height={56} unoptimized className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-900 leading-tight line-clamp-2">{s.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{s.subtitle}</p>
              </div>
              <button className="shrink-0 px-2.5 py-1 bg-[#1D4ED8] text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main QnA Page ─────────────────────────────────────────── */
export default function QnAPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);
  const [appliedCountry, setAppliedCountry] = useState("");
  const [appliedTags, setAppliedTags] = useState<string[]>(["All"]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return QNA_QUESTIONS.filter(q => {
      const matchSearch = search === "" ||
        q.title.toLowerCase().includes(search.toLowerCase()) ||
        q.body.toLowerCase().includes(search.toLowerCase());
      const matchCat = activeCategory === "All" || q.category === activeCategory;
      const matchCountry = appliedCountry === "" || q.country === appliedCountry;
      const matchTags = appliedTags.includes("All") || q.tags.some(t => appliedTags.some(at => t.toLowerCase().includes(at.toLowerCase())));
      return matchSearch && matchCat && matchCountry && matchTags;
    });
  }, [search, activeCategory, appliedCountry, appliedTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const countryFiltered = (country: string) =>
    QNA_QUESTIONS.filter(q => q.country === country).length;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Banner */}
      <div className="bg-[#0C1A3E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/40"
              style={{ width: 100 + i * 100, height: 100 + i * 100, top: "50%", right: "-50px", transform: "translateY(-50%)" }} />
          ))}
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 pb-2">
          <p className="text-xs text-blue-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-1.5">›</span>
            <span className="text-blue-100">QnA</span>
          </p>
        </div>
        <div className="relative z-10 text-center pb-8 px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">Have a Question?</h1>
          <p className="text-blue-200 text-sm mb-8">If you have any question you can ask below or enter what you are looking for!</p>
          {/* Search + filter bar */}
          <div className="flex items-center gap-3 max-w-2xl mx-auto bg-white rounded-xl p-1.5 shadow-2xl">
            <div className="flex items-center gap-2 px-3 py-2 border-r border-slate-200 shrink-0 cursor-pointer" onClick={() => setFilterOpen(true)}>
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600 hidden sm:block">Filter</span>
            </div>
            <input type="text" placeholder="Search for question..."
              value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent px-2 border-0 outline-none focus:outline-none ring-0 focus:ring-0"
              style={{ boxShadow: "none" }} />
            <button className="px-5 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shrink-0">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-1">
            {QNA_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap rounded-lg transition-all ${activeCategory === cat ? "bg-[#1D4ED8] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_260px] gap-6">

          {/* Left: Country Wise Sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sticky top-[57px]">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Country Wise</h3>
              <div className="space-y-1">
                <button onClick={() => { setAppliedCountry(""); setPage(1); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${appliedCountry === "" ? "bg-blue-50 text-[#1D4ED8] font-bold" : "text-slate-600 hover:bg-slate-50"}`}>
                  <span className="text-base">🌍</span> All Countries
                </button>
                {QNA_COUNTRIES.map(c => (
                  <button key={c.name} onClick={() => { setAppliedCountry(appliedCountry === c.name ? "" : c.name); setPage(1); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${appliedCountry === c.name ? "bg-blue-50 text-[#1D4ED8] font-bold" : "text-slate-600 hover:bg-slate-50"}`}>
                    <span className="text-base">{c.emoji}</span>
                    <span className="truncate">{c.name}</span>
                    <span className="ml-auto text-[10px] text-slate-400">{countryFiltered(c.name)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Questions Feed */}
          <div>
            {/* Results summary */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-500">
                Showing <span className="font-bold text-slate-700">{filtered.length}</span> questions
                {activeCategory !== "All" && <span className="text-[#1D4ED8] font-semibold"> in {activeCategory}</span>}
              </p>
              <button onClick={() => setAskOpen(true)}
                className="px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all">
                + Ask Question
              </button>
            </div>

            {/* Cards */}
            {paginated.length > 0 ? (
              <div className="space-y-4 mb-6">
                {paginated.map(q => <QuestionCard key={q.id} q={q} />)}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="font-bold text-slate-800 mb-1">No questions found</h3>
                <p className="text-sm text-slate-500 mb-4">Try a different search or filter</p>
                <button onClick={() => { setSearch(""); setAppliedCountry(""); setActiveCategory("All"); }}
                  className="text-[#1D4ED8] text-sm font-semibold hover:underline">Clear all filters</button>
              </div>
            )}

            {/* Pagination */}
            {filtered.length > ITEMS_PER_PAGE && (
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:border-[#1D4ED8] hover:text-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-slate-500">1 to {Math.min(ITEMS_PER_PAGE, filtered.length)} results</span>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(pg => (
                    <button key={pg} onClick={() => setPage(pg)}
                      className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${pg === page ? "bg-[#1D4ED8] text-white" : "text-slate-600 hover:bg-slate-100"}`}>{pg}</button>
                  ))}
                </div>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:border-[#1D4ED8] hover:text-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-[57px]">
              <RightSidebar onAsk={() => setAskOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 relative">
            <div className="relative z-10 max-w-md">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1">Are you interested in</h2>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1D4ED8] mb-4">Studying Abroad?</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">Get the best counseling programme and find the right opportunities for your international education journey.</p>
              <Link href="/appointment" className="inline-flex items-center gap-2 px-8 py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-lg">
                Get Started →
              </Link>
            </div>
            <div className="relative flex-shrink-0">
              <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden bg-blue-100 relative">
                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                  alt="Student" fill unoptimized className="object-cover object-top" />
              </div>
              <div className="absolute -top-3 -right-3 bg-white rounded-2xl p-2 shadow-lg text-2xl">🇺🇸</div>
              <div className="absolute -bottom-3 -left-3 bg-white rounded-2xl p-2 shadow-lg text-2xl">🇨🇦</div>
              <div className="absolute bottom-8 -right-6 bg-white rounded-xl p-3 shadow-lg">
                <p className="text-sm font-extrabold text-slate-900 leading-none">120+</p>
                <p className="text-[10px] text-slate-500">Partner Universities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <FilterModal open={filterOpen} onClose={() => setFilterOpen(false)}
        selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
        onApply={() => { setAppliedCountry(selectedCountry); setAppliedTags(selectedTags); }} />
      <AskModal open={askOpen} onClose={() => setAskOpen(false)} />
    </div>
  );
}
