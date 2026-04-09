"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { COURSES } from "@/lib/constants/courses";
import { PARTNER_UNIVERSITIES } from "@/lib/constants/landing";

// ── Suggestion datasets ────────────────────────────────────────────
const DESTINATIONS = [
  { country: "Australia", flag: "🇦🇺", href: "/study/australia", unis: "40+ Universities" },
  { country: "UK",        flag: "🇬🇧", href: "/study/uk",        unis: "60+ Universities" },
  { country: "Canada",    flag: "🇨🇦", href: "/study/canada",    unis: "35+ Universities" },
  { country: "USA",       flag: "🇺🇸", href: "/study/usa",       unis: "50+ Universities" },
  { country: "New Zealand",flag: "🇳🇿",href: "/study/new-zealand",unis: "20+ Universities"},
  { country: "Ireland",   flag: "🇮🇪", href: "/study/ireland",   unis: "15+ Universities" },
];

function SearchResults() {
  const params = useSearchParams();
  const q   = params.get("q")?.toLowerCase()   || "";
  const loc = params.get("loc")?.toLowerCase() || "";

  const hasQuery = q || loc;

  // Filter courses by q
  const matchedCourses = q
    ? COURSES.filter(c =>
        c.name.toLowerCase().includes(q) ||
        (c.description ?? "").toLowerCase().includes(q)
      ).slice(0, 6)
    : COURSES.slice(0, 6);

  // Filter destinations by loc or q
  const matchedDest = loc
    ? DESTINATIONS.filter(d => d.country.toLowerCase().includes(loc))
    : q
    ? DESTINATIONS.filter(d => d.country.toLowerCase().includes(q))
    : DESTINATIONS;

  // Filter universities
  const matchedUnis = q || loc
    ? PARTNER_UNIVERSITIES.filter(u =>
        u.name.toLowerCase().includes(q || loc)
      ).slice(0, 6)
    : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        {hasQuery ? (
          <>
            <p className="text-sm text-slate-500 mb-1">Showing results for:</p>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {q && <span className="text-[#0070F0]">&ldquo;{params.get("q")}&rdquo;</span>}
              {q && loc && <span className="text-slate-400"> in </span>}
              {loc && <span className="text-[#0070F0]">{params.get("loc")}</span>}
            </h1>
          </>
        ) : (
          <h1 className="text-3xl font-extrabold text-slate-900">Explore Everything</h1>
        )}
      </div>

      {/* Destinations */}
      {matchedDest.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-5 h-5 text-[#0070F0]" />
            <h2 className="text-lg font-bold text-slate-800">Study Destinations</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {matchedDest.map(d => (
              <Link key={d.country} href={d.href}
                className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-[#0070F0]/40 hover:shadow-md transition-all group">
                <span className="text-3xl">{d.flag}</span>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-[#0070F0] transition-colors">{d.country}</p>
                  <p className="text-xs text-slate-400">{d.unis}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0070F0] ml-auto transition-colors" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Courses */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-5 h-5 text-[#0070F0]" />
          <h2 className="text-lg font-bold text-slate-800">Test Preparation Courses</h2>
        </div>
        {matchedCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchedCourses.map(c => (
              <Link key={c.id} href={`/courses/${c.slug}`}
                className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-[#0070F0]/40 hover:shadow-md transition-all group">
                <div
                  className="w-14 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0"
                  style={{ background: (c.accentColor ?? "#0070F0") + "15", color: c.accentColor ?? "#0070F0", border: `1.5px solid ${c.accentColor ?? "#0070F0"}30` }}>
                  {c.name}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-900 group-hover:text-[#0070F0] transition-colors">{c.name}</p>
                  <p className="text-xs text-slate-400 truncate">{c.tagline}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0070F0] transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No courses matched your search.</p>
        )}
      </section>

      {/* Partner Universities */}
      {matchedUnis.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="w-5 h-5 text-[#0070F0]" />
            <h2 className="text-lg font-bold text-slate-800">Partner Universities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {matchedUnis.map(u => (
              <div key={u.name}
                className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.logo} alt={u.name} className="w-8 h-8 object-contain"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-snug">{u.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No results fallback */}
      {hasQuery && matchedCourses.length === 0 && matchedDest.length === 0 && matchedUnis.length === 0 && (
        <div className="text-center py-20">
          <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">No results found</h2>
          <p className="text-slate-400 mb-6">Try a different keyword or explore our courses and destinations below.</p>
          <Link href="/courses" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0070F0] text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all">
            Browse All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={
        <div className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-4 border-[#0070F0] border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}
