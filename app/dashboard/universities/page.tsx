"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, MapPin, Building, GraduationCap, Calendar, ArrowRight, Bookmark, BookmarkCheck, ChevronDown, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

interface University {
  id: string; name: string; country: string; city: string | null; type: string | null;
  ranking: number | null; established: number | null; coverImageUrl: string | null;
  logoUrl: string | null; intakes: string[]; tuitionRangeMin: number | null;
  tuitionRangeMax: number | null; description: string | null;
  _count: { programs: number };
}

const COUNTRIES = ["Australia", "Canada", "UK", "USA", "New Zealand"];
const LEVELS = ["Bachelors", "Masters", "PhD", "Diploma"];

function UniCard({ uni, bookmarked, onToggleBookmark }: { uni: University; bookmarked: boolean; onToggleBookmark: (id: string) => void }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow">
      <div className="h-40 bg-slate-200 relative overflow-hidden">
        <img
          src={uni.coverImageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop"}
          alt={uni.name} className="w-full h-full object-cover"
        />
        <button
          onClick={() => onToggleBookmark(uni.id)}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow z-10 hover:scale-110 transition-transform"
        >
          {bookmarked ? <BookmarkCheck className="w-4 h-4 text-blue-600" /> : <Bookmark className="w-4 h-4 text-slate-400" />}
        </button>
        {uni.ranking && (
          <div className="absolute bottom-2 right-2 bg-white px-2 py-0.5 rounded text-xs font-bold shadow-sm text-blue-600">
            Rank: #{uni.ranking}
          </div>
        )}
        <div className="absolute bg-white border border-slate-100 rounded shadow-sm flex items-center justify-center p-1.5 z-10" style={{ bottom: '-1.25rem', left: '1rem', width: '4rem', height: '2.75rem' }}>
          {uni.logoUrl ? (
            <img src={uni.logoUrl} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <div className="text-[7px] font-bold text-center leading-tight text-indigo-900">{uni.name.slice(0, 20).toUpperCase()}</div>
          )}
        </div>
      </div>
      <div className="p-5 pt-9 flex-1 flex flex-col">
        <h4 className="font-bold text-slate-900 text-base mb-3 leading-tight">{uni.name}</h4>
        <div className="space-y-2 mb-4 flex-1">
          {uni.type && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Building className="w-3.5 h-3.5 shrink-0" />
              <span>{uni.type} University</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{uni.country}{uni.city ? `, ${uni.city}` : ""}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>{uni._count.programs} Programs</span>
          </div>
          {uni.intakes.length > 0 && (
            <div className="flex items-start gap-2 text-sm text-slate-500">
              <Calendar className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {uni.intakes.map((i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-medium">{i}</span>
                ))}
              </div>
            </div>
          )}
          {uni.tuitionRangeMin && (
            <div className="text-sm text-slate-500 flex items-center gap-2">
              <span className="text-slate-400 text-xs">Tuition from</span>
              <span className="font-semibold text-slate-700">{uni.tuitionRangeMin.toLocaleString()} {uni.country === "UK" ? "GBP" : uni.country === "USA" ? "USD" : uni.country === "Canada" ? "CAD" : "AUD"}/yr</span>
            </div>
          )}
        </div>
        <div className="pt-3 border-t border-slate-50">
          <Link href={`/dashboard/universities/${uni.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-blue-600 transition">
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FindUniversityPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("");
  const [level, setLevel] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const fetchUniversities = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "9" });
      if (q) params.set("q", q);
      if (country) params.set("country", country);
      if (level) params.set("level", level);
      const res = await fetch(`/api/student/universities?${params}`);
      const json = await res.json();
      if (json.success) {
        setUniversities(json.data.data);
        setTotal(json.data.pagination.total);
        setTotalPages(json.data.pagination.totalPages);
      }
    } finally { setLoading(false); }
  }, [q, country, level, page]);

  const fetchBookmarks = useCallback(async () => {
    const res = await fetch("/api/student/bookmarks?type=university");
    const json = await res.json();
    if (json.success) setBookmarks(new Set(json.data.map((b: any) => b.entityId)));
  }, []);

  useEffect(() => { fetchUniversities(); fetchBookmarks(); }, [fetchUniversities, fetchBookmarks]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); setPage(1); fetchUniversities(); };

  const toggleBookmark = async (id: string) => {
    const isBookmarked = bookmarks.has(id);
    const next = new Set(bookmarks);
    if (isBookmarked) {
      next.delete(id);
      await fetch("/api/student/bookmarks", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entityType: "university", entityId: id }) });
    } else {
      next.add(id);
      await fetch("/api/student/bookmarks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entityType: "university", entityId: id }) });
    }
    setBookmarks(next);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-100 shadow-sm mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          Find your Dream <span className="text-blue-600">University & Courses</span>
        </h1>
        <p className="text-slate-500 text-sm mb-8">Browse universities from Australia, Canada, UK, USA, and New Zealand</p>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-end gap-3 max-w-3xl mx-auto text-left">
          <div className="flex-1 w-full">
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Search University or Program</label>
            <input
              type="text" value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="e.g. Computer Science, Melbourne..."
              className="w-full h-11 px-4 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="w-full md:w-48">
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Country</label>
            <div className="relative">
              <select value={country} onChange={(e) => setCountry(e.target.value)}
                className="w-full h-11 pl-4 pr-8 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white">
                <option value="">All Countries</option>
                {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="w-full md:w-44">
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Level</label>
            <div className="relative">
              <select value={level} onChange={(e) => setLevel(e.target.value)}
                className="w-full h-11 pl-4 pr-8 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white">
                <option value="">All Levels</option>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <button type="submit" className="h-11 px-6 bg-blue-600 text-white rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition w-full md:w-auto justify-center shrink-0 shadow-sm">
            <Search className="w-4 h-4" /> Search
          </button>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-bold text-slate-800 text-lg">
            {loading ? "Loading..." : `${total} Universities Found`}
          </h2>
          {(country || q) && (
            <p className="text-sm text-slate-500 mt-0.5">
              {q && `"${q}"`} {country && `in ${country}`}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Sorted by ranking</span>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-slate-100 h-80 animate-pulse">
              <div className="h-40 bg-slate-200 rounded-t-xl" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
                <div className="h-3 bg-slate-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : universities.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
          <Building className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-slate-600 text-lg mb-2">No universities found</h3>
          <p className="text-slate-400 text-sm">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <UniCard key={uni.id} uni={uni} bookmarked={bookmarks.has(uni.id)} onToggleBookmark={toggleBookmark} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition">
            ← Previous
          </button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const p = i + 1;
            return (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition ${page === p ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                {p}
              </button>
            );
          })}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 disabled:opacity-40 hover:bg-slate-50 transition">
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
