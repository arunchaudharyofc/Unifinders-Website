"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Check,
  BookOpen,
  Monitor,
  HardHat,
  Briefcase,
  Coffee,
  Users,
  Cpu,
  GraduationCap,
  HeartPulse,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════════════
   DATA — move to API / Supabase in Phase 2
   ═══════════════════════════════════════════════════════════════════════════ */

const COUNTRIES = [
  { id: "au", label: "Australia",      flag: "https://flagcdn.com/w40/au.png" },
  { id: "ca", label: "Canada",         flag: "https://flagcdn.com/w40/ca.png" },
  { id: "us", label: "United States",  flag: "https://flagcdn.com/w40/us.png" },
  { id: "in", label: "India",          flag: "https://flagcdn.com/w40/in.png" },
  { id: "gb", label: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { id: "de", label: "Germany",        flag: "https://flagcdn.com/w40/de.png" },
  { id: "nz", label: "New Zealand",    flag: "https://flagcdn.com/w40/nz.png" },
];

const INTAKE_GROUPS = [
  { label: "Apr - Jul 2024", months: ["Apr 2024", "May 2024", "Jun 2024", "Jul 2024"] },
  { label: "Aug - Nov 2024", months: ["Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024"] },
  { label: "Dec - Mar 2025", months: ["Dec 2024", "Jan 2025", "Feb 2025", "Mar 2025"] },
];

const FIELD_IMAGES: Record<string, string> = {
  "Computer and Information":    "https://cdn-icons-png.flaticon.com/512/2721/2721304.png",
  "Engineering":                 "https://cdn-icons-png.flaticon.com/512/2942/2942243.png",
  "Management":                  "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
  "Hospitality Management":      "https://cdn-icons-png.flaticon.com/512/3531/3531806.png",
  "Humanities and Social Services": "https://cdn-icons-png.flaticon.com/512/3997/3997872.png",
  "Science and Technology":      "https://cdn-icons-png.flaticon.com/512/2942/2942909.png",
  "Education":                   "https://cdn-icons-png.flaticon.com/512/3135/3135810.png",
  "Health Professional Education": "https://cdn-icons-png.flaticon.com/512/2913/2913465.png",
};

const FIELDS = [
  { title: "Computer and Information", programs: 156 },
  { title: "Engineering", programs: 156 },
  { title: "Management", programs: 156 },
  { title: "Hospitality Management", programs: 156 },
  { title: "Humanities and Social Services", programs: 156 },
  { title: "Science and Technology", programs: 156 },
  { title: "Education", programs: 156 },
  { title: "Health Professional Education", programs: 156 },
];

/* ═══════════════════════════════════════════════════════════════════════════
   REUSABLE DROPDOWN
   ═══════════════════════════════════════════════════════════════════════════ */
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

/* ── Country Dropdown (with search & flags) ─────────────────────────────── */
function CountryDropdown({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const filtered = COUNTRIES.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
  const toggle = (id: string) => onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block text-sm font-medium text-[#344054] mb-2">Destination Country</label>
      <div onClick={() => setOpen(!open)} className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl text-sm bg-white flex items-center justify-between cursor-pointer hover:border-[#98A2B3] transition">
        <span className={selected.length ? "text-[#101828] font-medium" : "text-[#98A2B3]"}>
          {selected.length ? `${selected.length} Selected` : "Select"}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#667085] transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-full min-w-[260px] bg-white rounded-xl shadow-xl border border-[#EAECF0] z-50 overflow-hidden">
          <div className="p-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[#98A2B3]" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-10 pl-9 pr-3 border border-[#0070F0] rounded-lg text-sm focus:outline-none"
              />
            </div>
          </div>
          <div className="max-h-[240px] overflow-y-auto px-2 pb-2">
            {filtered.map(c => {
              const active = selected.includes(c.id);
              return (
                <div key={c.id} onClick={() => toggle(c.id)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${active ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD]"}`}>
                    {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <img src={c.flag} alt="" className="w-6 h-6 rounded-full object-cover shadow-sm" />
                  <span className="text-[14px] font-medium text-[#101828]">{c.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Intake Dropdown (grouped months with checkboxes) ───────────────────── */
function IntakeDropdown({ selected, onChange }: { selected: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const toggle = (m: string) => onChange(selected.includes(m) ? selected.filter(s => s !== m) : [...selected, m]);

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block text-sm font-medium text-[#344054] mb-2">Intakes</label>
      <div onClick={() => setOpen(!open)} className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl text-sm bg-white flex items-center justify-between cursor-pointer hover:border-[#98A2B3] transition">
        <span className={selected.length ? "text-[#101828] font-medium" : "text-[#98A2B3]"}>
          {selected.length ? `${selected.length} Selected` : "Select"}
        </span>
        <ChevronDown className={`w-4 h-4 text-[#667085] transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-full min-w-[260px] bg-white rounded-xl shadow-xl border border-[#EAECF0] z-50 overflow-hidden">
          <div className="max-h-[300px] overflow-y-auto p-2">
            {INTAKE_GROUPS.map(group => (
              <div key={group.label}>
                <p className="px-3 py-2 text-[13px] font-bold text-[#101828]">{group.label}</p>
                {group.months.map(m => {
                  const active = selected.includes(m);
                  return (
                    <div key={m} onClick={() => toggle(m)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50 transition">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${active ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD]"}`}>
                        {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-[14px] font-medium text-[#101828]">{m}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STUDY FIELD CARD
   ═══════════════════════════════════════════════════════════════════════════ */
function StudyFieldCard({ title, programs }: { title: string; programs: number }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/dashboard/programs/search?field=${encodeURIComponent(title)}`)}
      className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm flex flex-col cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200"
    >
      <div className="flex-1 flex items-center justify-center py-8 px-4" style={{ minHeight: "160px" }}>
        <img
          src={FIELD_IMAGES[title] || "https://cdn-icons-png.flaticon.com/512/2721/2721304.png"}
          alt={title}
          className="w-24 h-24 object-contain"
        />
      </div>
      <div className="px-5 pb-5">
        <h4 className="font-bold text-[16px] text-[#101828] leading-tight mb-3">{title}</h4>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold bg-[#F0F6FE] text-[#0070F0]">
          <BookOpen className="w-4 h-4" />
          {programs} programs available
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ExploreProgramsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedIntakes, setSelectedIntakes] = useState<string[]>([]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCountries.length) params.set("countries", selectedCountries.join(","));
    if (selectedIntakes.length) params.set("intakes", selectedIntakes.join(","));
    router.push(`/dashboard/programs/search?${params.toString()}`);
  };

  return (
    <div className="max-w-[1152px] mx-auto pt-4 pb-16">
      
      {/* ── Hero Search Card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 sm:p-10 text-center">
        <h3 className="text-[28px] font-bold text-[#0B1A2D] mb-3">
          Find your Dream <span className="text-[#0070F0]">Program</span>
        </h3>
        <p className="text-base text-[#475467] mb-10">
          Know about different courses and programs according to your preferences
        </p>

        <div className="w-full text-left grid grid-cols-1 lg:grid-cols-[1fr_220px_220px_140px] gap-4 items-end">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-[#344054] mb-2">Search Programs</label>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSearch()}
              placeholder="Search programs"
              className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl text-sm focus:outline-none focus:border-[#0070F0] placeholder-[#98A2B3] transition"
            />
          </div>

          {/* Intakes */}
          <IntakeDropdown selected={selectedIntakes} onChange={setSelectedIntakes} />

          {/* Destination Country */}
          <CountryDropdown selected={selectedCountries} onChange={setSelectedCountries} />

          {/* Search Button */}
          <div>
            <label className="block text-sm font-medium text-transparent mb-2 select-none">_</label>
            <button
              onClick={handleSearch}
              className="w-full h-12 bg-[#0070F0] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition shadow-sm"
            >
              <Search className="w-5 h-5" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* ── Field of Study Section ───────────────────────────────────── */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-[#0B1A2D] mb-2">Field of Study</h2>
        <p className="text-sm text-[#475467] leading-relaxed max-w-[800px] mb-8">
          According to the form you filled, these Universities are recommended for you based on stream, Educational level, and Entry requirements from university itself.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIELDS.map(f => (
            <StudyFieldCard key={f.title} title={f.title} programs={f.programs} />
          ))}
        </div>
      </div>
    </div>
  );
}
