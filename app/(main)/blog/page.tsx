"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, X, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  BLOG_FILTER_TAGS,
  BLOG_COUNTRIES,
} from "@/lib/constants/blogs";

const POSTS_PER_PAGE = 9;

/* ────────────────────────────────────────────────── */
/* Filter Modal                                        */
/* ────────────────────────────────────────────────── */
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
    const next = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags.filter(t => t !== "All"), tag];
    setSelectedTags(next.length === 0 ? ["All"] : next);
  };
  const reset = () => { setSelectedCountry(""); setSelectedTags(["All"]); };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Filter</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Country */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Country</h3>
            <div className="grid grid-cols-3 gap-3">
              {BLOG_COUNTRIES.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCountry(selectedCountry === c.name ? "" : c.name)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    selectedCountry === c.name
                      ? "border-[#1D4ED8] bg-blue-50 text-[#1D4ED8]"
                      : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{c.emoji}</span>
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-100" />

          {/* Popular Tags */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Popular tags</h3>
            <div className="flex flex-wrap gap-2">
              {BLOG_FILTER_TAGS.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? "border-[#1D4ED8] bg-blue-50 text-[#1D4ED8]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-100">
          <button onClick={reset} className="text-red-500 font-semibold text-sm hover:text-red-700 transition">
            Reset all
          </button>
          <button
            onClick={() => { onApply(); onClose(); }}
            className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all"
          >
            Apply &amp; Search
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────── */
/* Blog Card                                           */
/* ────────────────────────────────────────────────── */
function BlogCard({ post }: { post: typeof BLOG_POSTS[0] }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block relative h-48 overflow-hidden bg-slate-100 shrink-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold text-[#1D4ED8] px-2.5 py-1 rounded-full">
          {post.category}
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>{post.date}</span>
          <span>·</span>
          <span className="font-medium text-slate-600">{post.author.name}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-bold text-slate-900 text-[15px] mb-2 group-hover:text-[#1D4ED8] transition-colors leading-snug line-clamp-2">
            {post.title}
          </h2>
        </Link>
        <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed flex-1">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#1D4ED8] hover:gap-2 transition-all"
        >
          Learn More <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────────── */
/* Blog Listing Page                                   */
/* ────────────────────────────────────────────────── */
export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["All"]);
  const [page, setPage] = useState(1);
  const [appliedCountry, setAppliedCountry] = useState("");
  const [appliedTags, setAppliedTags] = useState<string[]>(["All"]);

  const filtered = useMemo(() => {
    return BLOG_POSTS.filter(p => {
      const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchCountry = appliedCountry === "" || p.country === appliedCountry;
      const matchTags = appliedTags.includes("All") || p.tags.some(t => appliedTags.some(at => t.toLowerCase().includes(at.toLowerCase())));
      const matchCat = activeCategory === "All" || p.category.toLowerCase().includes(activeCategory.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase()));
      return matchSearch && matchCountry && matchTags && matchCat;
    });
  }, [search, appliedCountry, appliedTags, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  useEffect(() => { setPage(1); }, [search, appliedCountry, appliedTags, activeCategory]);

  const handleSearch = () => {/* search is already reactive */};

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
        <p className="text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1D4ED8] transition-colors">Home</Link>
          <span className="mx-1.5">›</span>
          <span className="text-slate-700 font-medium">Blogs</span>
        </p>
      </div>

      {/* Hero Banner */}
      <div className="mx-4 sm:mx-6 mt-4 rounded-3xl overflow-hidden relative bg-[#0C1A3E]" style={{ minHeight: 180 }}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/30"
              style={{ width: 200 + i * 80, height: 200 + i * 80, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          ))}
        </div>
        <div className="relative z-10 text-center py-12 px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Our Blogs</h1>
          <p className="text-blue-200 text-sm mb-8">The latest industry news, interviews, universities, and resources.</p>
          {/* Search bar */}
          <div className="flex items-center gap-3 max-w-2xl mx-auto bg-white rounded-xl p-1.5 shadow-2xl">
            <div className="flex items-center gap-2 px-3 py-2 border-r border-slate-200 shrink-0 cursor-pointer" onClick={() => setFilterOpen(true)}>
              <Filter className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600 hidden sm:block">Filter</span>
            </div>
            <input
              type="text"
              placeholder="Search for blog..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              className="flex-1 text-sm text-slate-700 placeholder-slate-400 bg-transparent px-2 border-0 outline-none focus:outline-none ring-0 focus:ring-0"
              style={{ boxShadow: 'none' }}
            />
            <button
              onClick={handleSearch}
              className="px-5 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shrink-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {BLOG_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all shrink-0 border ${
                activeCategory === cat
                  ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-md shadow-blue-200"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-[#1D4ED8]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {paginated.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginated.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No articles found</h3>
            <p className="text-slate-500 text-sm mb-6">Try adjusting your search or filter to find what you&apos;re looking for.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); setAppliedCountry(""); setAppliedTags(["All"]); }}
              className="px-6 py-2.5 bg-[#1D4ED8] text-white font-semibold rounded-xl text-sm">
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Displaying results: <span className="font-semibold text-slate-700">{(page - 1) * POSTS_PER_PAGE + 1}–{Math.min(page * POSTS_PER_PAGE, filtered.length)}</span> of{" "}
              <span className="font-semibold text-slate-700">{filtered.length}</span> entries
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = i + Math.max(1, Math.min(page - 2, totalPages - 4));
                return (
                  <button key={pg} onClick={() => setPage(pg)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${pg === page ? "bg-[#1D4ED8] text-white shadow-md" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {pg}
                  </button>
                );
              })}
              {totalPages > 5 && <span className="px-1 text-slate-400">...</span>}
              {totalPages > 5 && (
                <button onClick={() => setPage(totalPages)} className={`w-8 h-8 rounded-lg text-sm font-semibold ${page === totalPages ? "bg-[#1D4ED8] text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-[#1D4ED8] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section — Are you interested in Studying Abroad? */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[220px]">
            {/* Left text */}
            <div className="p-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-1 leading-tight">
                Are you interested in
              </h2>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#1D4ED8] mb-4 leading-tight">
                Studying Abroad?
              </h2>
              <p className="text-slate-500 text-sm mb-7 max-w-sm leading-relaxed">
                We help you find the perfect program, apply and start planning your next adventure.
              </p>
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-lg hover:shadow-blue-200 transition-all"
              >
                Get Started →
              </Link>
            </div>
            {/* Right — student illustration */}
            <div className="relative flex items-center justify-center lg:justify-end p-8 bg-gradient-to-br from-slate-50 to-amber-50 min-h-[220px]">
              {/* Country flag bubbles */}
              <div className="absolute top-8 left-10 bg-white rounded-2xl p-2.5 shadow-lg flex items-center gap-2 text-sm font-semibold">
                <span className="text-xl">🇺🇸</span>
                <span className="text-slate-700 hidden sm:block">USA</span>
              </div>
              <div className="absolute top-16 right-8 bg-white rounded-2xl p-2.5 shadow-lg flex items-center gap-2 text-sm font-semibold">
                <span className="text-xl">🇳🇿</span>
                <span className="text-slate-700 hidden sm:block">NZ</span>
              </div>
              <div className="absolute bottom-16 left-6 bg-white rounded-2xl p-2.5 shadow-lg flex items-center gap-2 text-sm font-semibold">
                <span className="text-xl">🇬🇧</span>
                <span className="text-slate-700 hidden sm:block">UK</span>
              </div>
              <div className="absolute bottom-8 right-12 bg-white rounded-2xl p-2.5 shadow-lg flex items-center gap-2 text-sm font-semibold">
                <span className="text-xl">🇨🇦</span>
                <span className="text-slate-700 hidden sm:block">Canada</span>
              </div>
              {/* Student illustration */}
              <div className="relative w-52 h-52 md:w-64 md:h-64">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-100 to-amber-200 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                    alt="Student studying abroad"
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
              </div>
              {/* 1000+ badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
                <span className="text-lg">🎓</span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900 leading-none">1000+</p>
                  <p className="text-[10px] text-slate-500">College Profiles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      <FilterModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        onApply={() => { setAppliedCountry(selectedCountry); setAppliedTags(selectedTags); }}
      />
    </div>
  );
}
