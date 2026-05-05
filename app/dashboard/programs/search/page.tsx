"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search, ChevronDown, ChevronLeft, ChevronRight, Check, X,
  LayoutGrid, List as ListIcon, Filter, Bookmark,
  Building2, GraduationCap, Clock, ArrowRight,
} from "lucide-react";

/* ── Click-outside hook ──────────────────────────────────────────────────── */
function useClickOutside(ref: React.RefObject<HTMLElement | null>, fn: () => void) {
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) fn(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, fn]);
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const COURSES = [
  { id: 1, title: "Bachelor of Nursing", institutes: "6854", degrees: "Masters, Bachelors, Post-Graduate, Diploma", duration: "1-2 Years" },
  { id: 2, title: "Masters of Nursing", institutes: "6854", degrees: "Masters, Bachelors, Post-Graduate, Diploma", duration: "1-2 Years" },
  { id: 3, title: "Nursing - Diploma", institutes: "6854", degrees: "Masters, Bachelors, Post-Graduate, Diploma", duration: "1-2 Years" },
  { id: 4, title: "Nursing - After 12th Class", institutes: "6854", degrees: "Masters, Bachelors, Post-Graduate, Diploma", duration: "1-2 Years" },
];

const STUDY_AREAS = ["Agriculture, Forestry a...", "Science", "Engineering and Tech...", "English", "Arts", "Computer Science"];
const PROGRAM_LEVELS = ["1 year post secondary certif...", "2 year post secondary certi...", "3 year post secondary certi...", "3 year bachelor's degree", "4 year bachelor's degree"];
const SORT_OPTIONS = ["Best Match", "Tuition Cost (low to high)", "Tuition Cost (high to low)", "Application fee (low to high)", "Application fee (high to low)"];
const DURATION_OPTIONS = ["0-1 Years", "1-2 Years", "2-3 Years", "3-4 Years", "4 Years and Above"];
const ADV_STUDY_AREAS = ["Agriculture, Forestry and Fishery", "Architecture and Building", "Arts", "Commerce, Business and Administration", "Computer Science and Information Technology", "Education", "Environmental Science", "Health and Humanities", "Journalism and Information", "Law"];

const ICON = "https://cdn-icons-png.flaticon.com/512/2913/2913465.png";

/* ── Dropdown Wrapper ─────────────────────────────────────────────────────── */
function Dropdown({ label, children, open, setOpen }: { label: string; children: React.ReactNode; open: boolean; setOpen: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="h-10 pl-4 pr-3 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] bg-white hover:bg-slate-50 flex items-center gap-2 transition">
        {label} <ChevronDown className={`w-4 h-4 text-[#667085] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full mt-2 left-0 min-w-[280px] bg-white rounded-xl shadow-xl border border-[#EAECF0] z-50 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Study Area Popup ─────────────────────────────────────────────────────── */
function StudyAreaDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (v: string) => setSel(sel.includes(v) ? sel.filter(s => s !== v) : [...sel, v]);

  return (
    <Dropdown label="Study Area" open={open} setOpen={setOpen}>
      <div className="p-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#98A2B3]" />
          <input value={query} onChange={e => setQuery(e.target.value)} className="w-full h-10 pl-9 pr-3 border border-[#0070F0] rounded-lg text-sm focus:outline-none" />
        </div>
      </div>
      <div className="max-h-[220px] overflow-y-auto px-2 pb-1">
        {STUDY_AREAS.filter(a => a.toLowerCase().includes(query.toLowerCase())).map(a => (
          <div key={a} onClick={() => toggle(a)} className="flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${sel.includes(a) ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD]"}`}>
                {sel.includes(a) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              <span className="text-[14px] text-[#101828]">{a}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#667085]" />
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-[#EAECF0] flex gap-3">
        <button onClick={() => setSel([])} className="flex-1 h-10 bg-[#F2F4F7] rounded-lg text-[13px] font-semibold text-[#344054]">Reset All</button>
        <button onClick={() => setOpen(false)} className="flex-1 h-10 bg-[#0070F0] rounded-lg text-[13px] font-semibold text-white">Apply</button>
      </div>
    </Dropdown>
  );
}

/* ── Program Level Popup ──────────────────────────────────────────────────── */
function ProgramLevelDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState<string[]>([]);
  const toggle = (v: string) => setSel(sel.includes(v) ? sel.filter(s => s !== v) : [...sel, v]);

  return (
    <Dropdown label="Program Level" open={open} setOpen={setOpen}>
      <div className="p-3 font-semibold text-[14px] text-[#101828]">Undergraduate</div>
      <div className="p-3 pt-0">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#98A2B3]" />
          <input value={query} onChange={e => setQuery(e.target.value)} className="w-full h-10 pl-9 pr-3 border border-[#0070F0] rounded-lg text-sm focus:outline-none" />
        </div>
      </div>
      <div className="max-h-[200px] overflow-y-auto px-2 pb-1">
        {PROGRAM_LEVELS.filter(p => p.toLowerCase().includes(query.toLowerCase())).map(p => (
          <div key={p} onClick={() => toggle(p)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-slate-50">
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${sel.includes(p) ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD]"}`}>
              {sel.includes(p) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
            </div>
            <span className="text-[14px] text-[#101828] truncate">{p}</span>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-[#EAECF0] flex gap-3">
        <button onClick={() => setSel([])} className="flex-1 h-10 bg-[#F2F4F7] rounded-lg text-[13px] font-semibold text-[#344054]">Reset All</button>
        <button onClick={() => setOpen(false)} className="flex-1 h-10 bg-[#0070F0] rounded-lg text-[13px] font-semibold text-white">Apply</button>
      </div>
    </Dropdown>
  );
}

/* ── Sort By Popup ────────────────────────────────────────────────────────── */
function SortByDropdown() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState("Best Match");

  return (
    <Dropdown label={`Sort by`} open={open} setOpen={setOpen}>
      <div className="py-2">
        {SORT_OPTIONS.map(o => (
          <div key={o} onClick={() => { setSel(o); setOpen(false); }} className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50 ${sel === o ? "bg-blue-50" : ""}`}>
            <span className="text-[14px] text-[#101828] font-medium">{o}</span>
            {sel === o && <Check className="w-5 h-5 text-[#0070F0]" />}
          </div>
        ))}
      </div>
    </Dropdown>
  );
}

/* ── Advanced Filters Sidebar ─────────────────────────────────────────────── */
function AdvancedFilters({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [duration, setDuration] = useState("1-2 Years");
  const [studyAreas, setStudyAreas] = useState<string[]>(["Agriculture, Forestry and Fishery", "Arts"]);
  const toggleArea = (a: string) => setStudyAreas(studyAreas.includes(a) ? studyAreas.filter(s => s !== a) : [...studyAreas, a]);
  const [showMore, setShowMore] = useState(false);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#101828]/40 backdrop-blur-sm">
      <div className="w-full max-w-[480px] bg-white h-full flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-[#EAECF0] shrink-0">
          <h2 className="text-xl font-bold text-[#101828]">Filters</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Applied Filters */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#101828]">Applied Filters</h3>
              <button className="text-[13px] font-semibold text-[#0070F0] flex items-center gap-1">Reset All ↻</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Postgraduate", "United states", "Australia", "Information Technology", "1-2 Years", "IELTS", "GRE", "PTE"].map(f => (
                <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#101828] text-white rounded-lg text-[13px] font-medium">
                  {f} <X className="w-3 h-3 cursor-pointer hover:text-red-300" />
                </span>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="border-t border-[#EAECF0] pt-6">
            <h3 className="text-[15px] font-bold text-[#101828] mb-4">Duration</h3>
            <div className="flex flex-wrap gap-3">
              {DURATION_OPTIONS.map(d => (
                <label key={d} className="flex items-center gap-2 cursor-pointer">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${duration === d ? "border-[#0070F0]" : "border-[#D0D5DD]"}`}>
                    {duration === d && <div className="w-2.5 h-2.5 rounded-full bg-[#0070F0]" />}
                  </div>
                  <span className="text-[14px] text-[#344054]">{d}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Study Area */}
          <div className="border-t border-[#EAECF0] pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[15px] font-bold text-[#101828]">Study Area</h3>
              <div className="relative w-40">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#98A2B3]" />
                <input className="w-full h-8 pl-8 pr-3 border border-[#D0D5DD] rounded-lg text-xs focus:outline-none focus:border-[#0070F0]" placeholder="Search" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(showMore ? ADV_STUDY_AREAS : ADV_STUDY_AREAS.slice(0, 8)).map(a => (
                <label key={a} className="flex items-center gap-2.5 cursor-pointer">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${studyAreas.includes(a) ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD]"}`} onClick={() => toggleArea(a)}>
                    {studyAreas.includes(a) && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-[14px] text-[#344054] leading-tight">{a}</span>
                </label>
              ))}
            </div>
            <button onClick={() => setShowMore(!showMore)} className="mt-3 text-[13px] font-semibold text-[#0070F0] flex items-center gap-1">
              {showMore ? "Show less" : "Show more options"} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMore ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Discipline Area placeholder */}
          <div className="border-t border-[#EAECF0] pt-6">
            <h3 className="text-[15px] font-bold text-[#101828] mb-4">Discipline Area</h3>
            <p className="text-sm text-[#667085]">Select study area first to see discipline options.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#EAECF0] flex gap-3 shrink-0 bg-white">
          <button className="flex-1 h-12 text-[14px] font-semibold text-red-500 flex items-center justify-center gap-2 hover:bg-red-50 rounded-xl transition">↻ Reset All</button>
          <button onClick={onClose} className="flex-1 h-12 bg-[#0070F0] text-white rounded-xl text-[14px] font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2">
            Apply & Search <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Course Card (Grid View) ──────────────────────────────────────────────── */
function CourseCard({ course }: { course: typeof COURSES[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm flex flex-col hover:shadow-md transition">
      <div className="h-44 bg-[#F8FAFC] relative flex items-center justify-center border-b border-[#EAECF0]">
        <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#EAECF0] hover:bg-slate-50">
          <Bookmark className="w-4 h-4 text-[#667085]" />
        </button>
        <div className="w-24 h-24 rounded-full bg-[#E0F2FE] flex items-center justify-center shadow-sm">
          <img src={ICON} alt="" className="w-14 h-14 object-contain" />
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h4 className="font-bold text-[#101828] text-[17px] mb-5">{course.title}</h4>
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-start gap-6"><span className="flex items-center gap-2 text-[#475467] shrink-0 w-[150px]"><Building2 className="w-4 h-4" /> Institute Available</span><span className="font-semibold text-[#101828]">{course.institutes}</span></div>
          <div className="flex items-start gap-6"><span className="flex items-center gap-2 text-[#475467] shrink-0 w-[150px]"><GraduationCap className="w-4 h-4" /> Degree Offered</span><span className="font-semibold text-[#101828]">{course.degrees}</span></div>
          <div className="flex items-start gap-6"><span className="flex items-center gap-2 text-[#475467] shrink-0 w-[150px]"><Clock className="w-4 h-4" /> Duration</span><span className="font-semibold text-[#101828]">{course.duration}</span></div>
        </div>
        <div className="mt-auto">
          <Link href={`/dashboard/programs/${course.id}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0070F0] hover:gap-3 transition-all">
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Course Row (List View) ───────────────────────────────────────────────── */
function CourseRow({ course }: { course: typeof COURSES[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 rounded-full bg-[#E0F2FE] flex items-center justify-center shrink-0 shadow-sm">
          <img src={ICON} alt="" className="w-12 h-12 object-contain" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <h4 className="font-bold text-[#101828] text-[17px]">{course.title}</h4>
            <button className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg shrink-0"><Bookmark className="w-4 h-4" /></button>
          </div>
          <div className="border-t border-[#EAECF0] pt-4 grid grid-cols-[1fr_1fr_1.5fr_auto] gap-4 items-end text-sm">
            <div><p className="text-[#475467] mb-0.5">Institute Available</p><p className="font-semibold text-[#101828]">{course.institutes}</p></div>
            <div><p className="text-[#475467] mb-0.5">Study In</p><p className="font-semibold text-[#101828]">{course.duration}</p></div>
            <div><p className="text-[#475467] mb-0.5">Degree Offered</p><p className="font-semibold text-[#101828]">{course.degrees}</p></div>
            <div>
              <Link href={`/dashboard/programs/${course.id}`} className="h-10 px-5 bg-[#0070F0] text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-600 transition whitespace-nowrap">
                View Details <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN SEARCH PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function SearchResultsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(2);

  return (
    <div className="max-w-6xl mx-auto pb-16">
      {/* Search Bar */}
      <div className="flex gap-4">
        <input defaultValue="Bachelor of Advanced Computer Science (Honours)" className="flex-1 h-12 px-4 border border-[#D0D5DD] rounded-xl text-sm font-medium text-[#101828] focus:outline-none focus:border-[#0070F0]" />
        <button className="h-12 px-8 bg-[#0070F0] text-white rounded-xl font-medium flex items-center gap-2 hover:bg-blue-600 transition shrink-0 shadow-sm">
          <Search className="w-5 h-5" /> Search
        </button>
      </div>

      {/* Filter Chips & Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 mt-4">
        <span className="inline-flex items-center gap-2 px-3 py-2 bg-[#101828] text-white rounded-lg text-sm font-medium">Australia <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-300" /></span>
        <span className="inline-flex items-center gap-2 px-3 py-2 bg-[#101828] text-white rounded-lg text-sm font-medium">2024 + 1 more <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-300" /></span>
        <StudyAreaDropdown />
        <ProgramLevelDropdown />
        <button onClick={() => setFiltersOpen(true)} className="h-10 px-4 border border-[#D0D5DD] rounded-lg text-sm font-medium text-[#344054] flex items-center gap-2 bg-white hover:bg-slate-50">
          <Filter className="w-4 h-4" /> Advance filters
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-end justify-between mt-8 mb-6 border-b border-[#EAECF0] pb-4">
        <div>
          <h2 className="text-lg text-[#0B1A2D]"><span className="font-bold text-[#0070F0]">12 courses found</span> for search term</h2>
          <p className="text-[#101828] font-medium mt-1 text-sm">Bachelor of Advanced Computer Science (Honours)</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white border border-[#D0D5DD] rounded-lg overflow-hidden h-10">
            <button onClick={() => setView("grid")} className={`px-3 flex items-center justify-center transition ${view === "grid" ? "bg-slate-100 text-[#344054]" : "text-[#98A2B3] hover:text-[#344054]"}`}>
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button onClick={() => setView("list")} className={`px-3 flex items-center justify-center border-l border-[#D0D5DD] transition ${view === "list" ? "bg-slate-100 text-[#344054]" : "text-[#98A2B3] hover:text-[#344054]"}`}>
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
          <SortByDropdown />
        </div>
      </div>

      {/* Results */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      ) : (
        <div className="space-y-4">
          {COURSES.map(c => <CourseRow key={c.id} course={c} />)}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#EAECF0]">
        <div className="flex items-center gap-3 text-sm text-[#344054] font-medium">
          Displaying results:
          <select className="h-9 px-3 border border-[#D0D5DD] rounded-lg outline-none bg-white cursor-pointer text-sm"><option>10</option><option>25</option><option>50</option></select>
          of 156 entries
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage(Math.max(1, page - 1))} className="px-3 h-9 flex items-center gap-1 rounded-lg border border-[#D0D5DD] text-sm font-medium text-[#344054] bg-white hover:bg-slate-50 mr-1">
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          {[1, 2, 3].map(p => (
            <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium ${page === p ? "bg-[#0070F0] text-white" : "border border-[#D0D5DD] text-[#344054] bg-white hover:bg-slate-50"}`}>{p}</button>
          ))}
          <span className="w-9 h-9 flex items-center justify-center text-[#98A2B3]">...</span>
          <button onClick={() => setPage(20)} className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium ${page === 20 ? "bg-[#0070F0] text-white" : "border border-[#D0D5DD] text-[#344054] bg-white hover:bg-slate-50"}`}>20</button>
          <button onClick={() => setPage(Math.min(20, page + 1))} className="px-3 h-9 flex items-center gap-1 rounded-lg border border-[#D0D5DD] text-sm font-medium text-[#344054] bg-white hover:bg-slate-50 ml-1">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Advanced Filters Sidebar */}
      <AdvancedFilters open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </div>
  );
}
