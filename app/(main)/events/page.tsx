"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { EVENTS } from "@/lib/constants/events";

type Tab = "all" | "upcoming" | "past";

const ITEMS_PER_PAGE = 9;

export default function EventsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = EVENTS.filter(e => {
    const matchTab = tab === "all" || e.status === tab;
    const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.location.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  useEffect(() => { setPage(1); }, [tab, search]);

  const HERO_IMAGES: Record<string, string> = {
    "educate-world-conference": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    "anatomical-trading-circuit": "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
    "gwas-functional-validation": "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=600&q=80",
    "mitochondrial-pathways-1": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    "inflammation-immune-regulation": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80",
    "mitochondrial-pathways-2": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80",
    "asap-collaborative-meeting": "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80",
    "ipsc-models": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80",
    "anatomical-trading-circuit-2": "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero / Header */}
      <div className="bg-gradient-to-br from-[#0C1A3E] via-[#1D4ED8] to-[#2563EB] pt-28 pb-14 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Our Events</h1>
        <p className="text-blue-200 text-sm max-w-lg mx-auto mb-8">
          Browse through various events and seminars in various universities and colleges.
        </p>
        {/* Search bar */}
        <div className="max-w-2xl mx-auto flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-lg">
          <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 border-r border-slate-200 pr-3 mr-1 shrink-0">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search for events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent py-1"
          />
          <button className="shrink-0 px-5 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex gap-1 bg-white rounded-xl p-1 w-fit shadow-sm border border-slate-100 mb-8">
          {(["all", "upcoming", "past"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${tab === t ? "bg-[#1D4ED8] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"}`}
            >
              {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-20 text-slate-400">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {paginated.map(event => (
              <Link key={event.id} href={`/events/${event.slug}`}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                {/* Card Image */}
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <Image
                    src={HERO_IMAGES[event.slug] || event.heroImage}
                    alt={event.title}
                    fill unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-[#1D4ED8] text-white rounded-xl px-3 py-2 text-center min-w-[48px]">
                    <p className="text-xl font-extrabold leading-none">{event.date.day}</p>
                    <p className="text-[10px] font-bold uppercase opacity-80">{event.date.month}</p>
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${event.status === "upcoming" ? "bg-green-500 text-white" : "bg-slate-600 text-white"}`}>
                      {event.status === "upcoming" ? "Upcoming" : "Past"}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="font-extrabold text-slate-900 mb-2 text-sm leading-snug line-clamp-2 group-hover:text-[#1D4ED8] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 line-clamp-2">{event.description}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3 h-3 text-[#1D4ED8]" /> {event.time}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3 h-3 text-[#1D4ED8]" /> {event.location}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#1D4ED8]">
                    Learn More <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between py-4 mb-8">
            <p className="text-xs text-slate-500">Showing results 1–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} total entries</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-100 transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold transition ${page === p ? "bg-[#1D4ED8] text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-100"}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center disabled:opacity-40 hover:bg-slate-100 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Studying Abroad CTA */}
      <div className="py-14 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="p-10">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                Are you interested in <br /><span className="text-[#1D4ED8]">Studying Abroad?</span>
              </h2>
              <p className="text-slate-500 text-sm mb-6 max-w-sm leading-relaxed">
                We&apos;ll help you find the perfect program, apply, and start planning your adventure!
              </p>
              <Link href="/appointment"
                className="inline-block px-7 py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
                Get Started
              </Link>
            </div>
            <div className="relative h-52 md:h-full min-h-[200px] bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center overflow-hidden">
              <div className="relative flex items-center justify-center w-full h-full p-6">
                <div className="text-6xl">🌍</div>
                <div className="absolute top-4 right-8 text-4xl">🇺🇸</div>
                <div className="absolute bottom-6 left-8 text-4xl">🇨🇦</div>
                <div className="absolute top-1/2 right-4 text-3xl">🎓</div>
                <div className="text-[80px] font-extrabold text-slate-100 absolute right-4 bottom-2 select-none">1000+</div>
                <div className="absolute right-4 bottom-2">
                  <p className="text-2xl font-extrabold text-slate-400">1000+</p>
                  <p className="text-xs text-slate-400">University Matches</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
