"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronDown, Bookmark, MapPin, Building, GraduationCap, Calendar, ArrowRight, BookmarkCheck } from "lucide-react";
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

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
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

  // Dropdown states
  const [countryOpen, setCountryOpen] = useState(false);
  const countryRef = useRef<HTMLDivElement>(null);
  useClickOutside(countryRef, () => setCountryOpen(false));

  const [levelOpen, setLevelOpen] = useState(false);
  const levelRef = useRef<HTMLDivElement>(null);
  useClickOutside(levelRef, () => setLevelOpen(false));

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
    <div className="w-full">
      
      {/* Hero Banner Area */}
      <div className="bg-white rounded-2xl p-10 text-center border shadow-sm mb-12" style={{ borderColor: '#EAECF0' }}>
        <h1 className="text-[28px] font-bold text-[#101828] mb-2">Find your Dream <span className="text-[#0070F0]">University & Courses</span></h1>
        <p className="text-[14px] text-[#475467] mb-8">Know about different courses and programs according to your preferences</p>
        
        <form onSubmit={handleSearch} className="flex items-end gap-4 max-w-4xl mx-auto text-left">
          <div className="flex-1">
            <label className="block text-[13px] font-medium text-[#475467] mb-2 whitespace-nowrap">Search Programs</label>
            <input 
              type="text" 
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search programs" 
              className="w-full h-11 px-4 border rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" 
              style={{ borderColor: '#D0D5DD' }} 
            />
          </div>
          <div className="w-[200px] relative shrink-0" ref={countryRef}>
            <label className="block text-[13px] font-medium text-[#475467] mb-2 whitespace-nowrap">Destination Country</label>
            <div 
              onClick={() => setCountryOpen(!countryOpen)}
              className="h-11 px-4 border rounded-xl flex items-center justify-between bg-white cursor-pointer" 
              style={{ borderColor: '#D0D5DD' }}
            >
              <span className={`text-[14px] truncate ${country ? 'text-[#101828]' : 'text-[#98A2B3]'}`}>
                {country || "Select"}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
            </div>
            {countryOpen && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white border rounded-xl shadow-lg z-50 overflow-hidden" style={{ borderColor: '#EAECF0' }}>
                <div onClick={() => { setCountry(""); setCountryOpen(false); }} className="px-4 py-2 text-[14px] hover:bg-slate-50 cursor-pointer">All Countries</div>
                {COUNTRIES.map(c => (
                  <div key={c} onClick={() => { setCountry(c); setCountryOpen(false); }} className="px-4 py-2 text-[14px] hover:bg-slate-50 cursor-pointer">{c}</div>
                ))}
              </div>
            )}
          </div>
          <div className="w-[200px] relative shrink-0" ref={levelRef}>
            <label className="block text-[13px] font-medium text-[#475467] mb-2 whitespace-nowrap">Level</label>
            <div 
              onClick={() => setLevelOpen(!levelOpen)}
              className="h-11 px-4 border rounded-xl flex items-center justify-between bg-white cursor-pointer" 
              style={{ borderColor: '#D0D5DD' }}
            >
              <span className={`text-[14px] truncate ${level ? 'text-[#101828]' : 'text-[#98A2B3]'}`}>
                {level || "Select"}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
            </div>
            {levelOpen && (
              <div className="absolute top-full mt-1 left-0 w-full bg-white border rounded-xl shadow-lg z-50 overflow-hidden" style={{ borderColor: '#EAECF0' }}>
                <div onClick={() => { setLevel(""); setLevelOpen(false); }} className="px-4 py-2 text-[14px] hover:bg-slate-50 cursor-pointer">All Levels</div>
                {LEVELS.map(l => (
                  <div key={l} onClick={() => { setLevel(l); setLevelOpen(false); }} className="px-4 py-2 text-[14px] hover:bg-slate-50 cursor-pointer">{l}</div>
                ))}
              </div>
            )}
          </div>
          <button type="submit" className="h-11 px-6 bg-[#0070F0] text-white rounded-xl text-[14px] font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition shadow-sm shrink-0">
            <Search className="w-4 h-4" /> Search
          </button>
        </form>
      </div>

      {/* Recommended Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-bold text-[#101828]">
          {loading ? "Loading..." : `${total} Universities Found`}
        </h2>
      </div>
      <p className="text-[14px] text-[#475467] mb-8 max-w-3xl">According to the form you filled, these Universities are recommended for you based on stream, Educational level, and Entry requirements from university itself.</p>

      {/* University Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border rounded-2xl overflow-hidden shadow-sm h-96 animate-pulse" style={{ borderColor: '#EAECF0' }}>
              <div className="h-[180px] bg-slate-200"></div>
              <div className="p-6 pt-12 space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                <div className="h-3 bg-slate-100 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : universities.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border" style={{ borderColor: '#EAECF0' }}>
          <Building className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="font-bold text-[#101828] text-lg mb-2">No universities found</h3>
          <p className="text-[#475467] text-sm">Try adjusting your search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni) => (
            <div key={uni.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col" style={{ borderColor: '#EAECF0' }}>
              
              {/* Header Image */}
              <div className="relative flex-none bg-slate-100 w-full" style={{ height: '180px', minHeight: '180px', maxHeight: '180px' }}>
                <img src={uni.coverImageUrl || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop"} alt={uni.name} className="w-full h-full object-cover" />
                <button onClick={() => toggleBookmark(uni.id)} className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-600 transition-transform hover:scale-105">
                  {bookmarks.has(uni.id) ? <BookmarkCheck className="w-4 h-4 text-[#0070F0]" /> : <Bookmark className="w-4 h-4" />}
                </button>
                <div className="absolute left-6 w-[100px] h-16 rounded-xl flex items-center justify-center p-2 shadow-sm border-2 border-white z-10" style={{ bottom: '-32px', backgroundColor: '#0B1A2D' }}>
                  {uni.logoUrl ? (
                    <img src={uni.logoUrl} className="max-h-full max-w-full object-contain filter invert opacity-90" />
                  ) : (
                    <div className="text-[10px] font-bold text-white text-center leading-tight">{uni.name.slice(0,15).toUpperCase()}</div>
                  )}
                </div>
                {uni.ranking && (
                  <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow-sm text-[12px] font-bold text-[#101828]">
                    Rank: <span className="text-[#0070F0]">{uni.ranking}</span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 pt-12 flex-1 flex flex-col">
                <h3 className="text-[18px] font-bold text-[#101828] mb-6">{uni.name}</h3>
                
                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-4 mb-6">
                  <Building className="w-4 h-4 text-[#0070F0] mt-0.5" />
                  <div className="flex flex-col text-[13px]">
                    <span className="text-slate-500">Institute Type</span>
                    <span className="font-semibold text-[#101828]">{uni.type || "Public"}</span>
                  </div>
                  
                  <MapPin className="w-4 h-4 text-[#0070F0] mt-0.5" />
                  <div className="flex flex-col text-[13px]">
                    <span className="text-slate-500">Location</span>
                    <span className="font-semibold text-[#101828]">{uni.country}{uni.city ? `, ${uni.city}` : ""}</span>
                  </div>
                  
                  <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                  <div className="flex flex-col text-[13px]">
                    <span className="text-slate-500">Establishment</span>
                    <span className="font-semibold text-[#101828]">{uni.established || "N/A"}</span>
                  </div>

                  <GraduationCap className="w-4 h-4 text-[#0070F0] mt-0.5" />
                  <div className="flex flex-col text-[13px]">
                    <span className="text-slate-500">Courses</span>
                    <span className="font-semibold text-[#101828]">{uni._count?.programs ?? 0}</span>
                  </div>

                  {uni.intakes.length > 0 && (
                    <>
                      <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                      <div className="flex flex-col text-[13px]">
                        <span className="text-slate-500 mb-1">Intakes</span>
                        <div className="flex flex-wrap gap-2">
                          {uni.intakes.map(intake => (
                            <span key={intake} className="px-2 py-0.5 bg-[#0070F0] text-white rounded-full text-[11px] font-medium">{intake}</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t" style={{ borderColor: '#EAECF0' }}>
                  <Link href={`/dashboard/universities/${uni.id}`} className="text-[#344054] text-[14px] font-semibold flex items-center gap-2 hover:text-[#0070F0] transition">
                    View Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
            className="px-4 py-2 rounded-lg border text-[13px] font-medium text-[#344054] disabled:opacity-40 hover:bg-slate-50 transition" style={{ borderColor: '#D0D5DD' }}>
            ← Previous
          </button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            const p = i + 1;
            return (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg text-[14px] font-medium transition border ${page === p ? "bg-[#0070F0] text-white border-[#0070F0]" : "border-[#D0D5DD] text-[#344054] hover:bg-slate-50"}`}>
                {p}
              </button>
            );
          })}
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border text-[13px] font-medium text-[#344054] disabled:opacity-40 hover:bg-slate-50 transition" style={{ borderColor: '#D0D5DD' }}>
            Next →
          </button>
        </div>
      )}

    </div>
  );
}
