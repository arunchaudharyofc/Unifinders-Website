"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";
import {
  X, Monitor, Users, ChevronDown, ChevronRight,
  FileText, Video, BookOpen, Sun, Sunset, Moon,
  CheckCircle2, MessageCircle, Download, Star, Clock
} from "lucide-react";
import {
  COURSES, COURSE_INSTRUCTORS, ENROLL_TIME_SLOTS, INTERESTED_COUNTRIES
} from "@/lib/constants/courses";

// ── Logo Renderer ─────────────────────────────────────────────
function CourseLogoLarge({ slug, name, accentColor }: { slug: string; name: string; accentColor: string }) {
  const bg = accentColor + "15";
  return (
    <div className="w-24 h-16 rounded-xl flex items-center justify-center border-2 flex-shrink-0"
      style={{ background: bg, borderColor: accentColor + "40" }}>
      <span className="text-xl font-extrabold" style={{ color: accentColor }}>{name}</span>
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-slate-50 transition-colors">
        <span className="text-sm font-bold text-slate-900 pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#1D4ED8]" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 bg-blue-50/30">
          <p className="pt-4 text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

// ── 3-Step Enrollment Modal ───────────────────────────────────
const ALL_COURSES = [
  { name: "IELTS", logo: "IELTS", color: "#C8102E" },
  { name: "GMAT",  logo: "GMAT",  color: "#1C1C1C" },
  { name: "GRE",   logo: "GRE",   color: "#007AB8" },
  { name: "OET",   logo: "OET",   color: "#1E5C3A" },
  { name: "PTE",   logo: "PTE",   color: "#00549F" },
  { name: "SAT",   logo: "SAT",   color: "#009CDE" },
  { name: "TOEFL", logo: "TOEFL", color: "#004C8C" },
];

const TIME_SLOT_ICONS: Record<string, React.ReactNode> = {
  Morning: <Sun className="w-7 h-7 text-[#1D4ED8]" />,
  Evening: <Sunset className="w-7 h-7 text-[#1D4ED8]" />,
  Night:   <Moon className="w-7 h-7 text-[#1D4ED8]" />,
};

function EnrollModal({ open, onClose, courseName }: { open: boolean; onClose: () => void; courseName: string }) {
  const [step, setStep] = useState(1);
  const [classType, setClassType] = useState<"Online" | "Physical" | "">("");
  const [selectedCourse, setSelectedCourse] = useState(courseName);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<"Morning" | "Evening" | "Night">("Morning");
  const [selectedTime, setSelectedTime] = useState(ENROLL_TIME_SLOTS.Morning[0]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", country: "", scholarship: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { if (open) { setStep(1); setClassType(""); setSubmitted(false); } }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.firstName || !form.email) return;
    setSubmitted(true);
    setTimeout(() => { onClose(); }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-y-auto max-h-[96vh]">

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              {step === 1 ? "Enroll in Class" : step === 2 ? "Choose the class type" : "Personal Information"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Take one step closer towards your dream by filling out this quick form!</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition mt-0.5">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Step progress */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full transition-colors ${s <= step ? "bg-[#1D4ED8]" : "bg-slate-200"}`} />
            ))}
          </div>
          <p className="text-[10px] text-slate-400 text-right">Step {step} of 3</p>
        </div>

        {/* ── STEP 1: Online vs Physical ── */}
        {step === 1 && (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { type: "Online" as const, icon: <Monitor className="w-10 h-10 text-slate-600" />, label: "Online" },
                { type: "Physical" as const, icon: <Users className="w-10 h-10 text-slate-600" />, label: "Physical" },
              ].map(({ type, icon, label }) => (
                <button key={type} onClick={() => setClassType(type)}
                  className={`flex flex-col items-center justify-center gap-3 py-10 rounded-2xl border-2 transition-all font-semibold text-slate-700 ${classType === type ? "border-[#1D4ED8] bg-blue-50 text-[#1D4ED8]" : "border-slate-200 hover:border-slate-300"}`}>
                  {icon}
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Go Back</button>
              <button onClick={() => classType && setStep(2)} disabled={!classType}
                className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition-all">Next</button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Course + Time Slot ── */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            {/* Course selector */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Course Name <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2">
                {ALL_COURSES.map(c => (
                  <button key={c.name} onClick={() => setSelectedCourse(c.name)}
                    className={`py-3 px-2 rounded-xl border-2 flex items-center justify-center font-extrabold text-sm transition-all ${selectedCourse === c.name ? "border-[#1D4ED8] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}
                    style={{ color: c.color }}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot selector */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Time Slot <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {(["Morning", "Evening", "Night"] as const).map(slot => (
                  <button key={slot} onClick={() => { setSelectedTimeSlot(slot); setSelectedTime(ENROLL_TIME_SLOTS[slot][0]); }}
                    className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all relative ${selectedTimeSlot === slot ? "border-[#1D4ED8] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
                    {selectedTimeSlot === slot && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#1D4ED8] flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {TIME_SLOT_ICONS[slot]}
                    <span className={`text-xs font-bold ${selectedTimeSlot === slot ? "text-[#1D4ED8]" : "text-slate-700"}`}>{slot}</span>
                  </button>
                ))}
              </div>
              {/* Time radio options */}
              <div className="grid grid-cols-2 gap-2">
                {ENROLL_TIME_SLOTS[selectedTimeSlot].map(time => (
                  <label key={time} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="time" value={time} checked={selectedTime === time} onChange={() => setSelectedTime(time)}
                      className="accent-[#1D4ED8]" />
                    <span className="text-xs text-slate-700 font-medium">{time}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setStep(1)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Go Back</button>
              <button onClick={() => setStep(3)}
                className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">Next</button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Personal Information ── */}
        {step === 3 && !submitted && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your first name" value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your last name" value={form.lastName}
                  onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">E-mail <span className="text-red-500">*</span></label>
              <input type="email" placeholder="Enter your email here" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <div className="flex items-center gap-1.5 px-3 py-2.5 border border-r-0 border-slate-200 rounded-l-xl bg-slate-50 text-sm text-slate-700 shrink-0">
                  <span className="text-base">🇳🇵</span>
                  <span className="font-medium">+977</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <input type="tel" placeholder="Placeholder" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="flex-1 border border-slate-200 rounded-r-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Interested Country <span className="text-red-500">*</span></label>
              <div className="relative">
                <select value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                  className="w-full appearance-none border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition bg-white">
                  <option value="">Select</option>
                  {INTERESTED_COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Scholarship Name <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Enter your scholarship here" value={form.scholarship}
                onChange={e => setForm(f => ({ ...f, scholarship: e.target.value }))}
                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setStep(2)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Go Back</button>
              <button onClick={handleSubmit} disabled={!form.firstName || !form.email}
                className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition-all">Submit</button>
            </div>
          </div>
        )}

        {/* Success screen */}
        {submitted && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-green-600" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Enrollment Submitted! 🎉</h3>
            <p className="text-sm text-slate-500">Our team will contact you within 24 hours to confirm your <strong>{selectedCourse}</strong> class slot.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Tab content types ─────────────────────────────────────────
type Tab = "about" | "syllabus" | "instructors" | "resources" | "faqs";

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = COURSES.find(c => c.slug === slug);
  if (!course) notFound();

  const instructors = (course.instructors ?? [])
    .map((inst) => COURSE_INSTRUCTORS.find((i) => i.fullName === inst.fullName))
    .filter((i): i is typeof COURSE_INSTRUCTORS[number] => !!i);

  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [enrollOpen, setEnrollOpen] = useState(false);

  const TABS: { id: Tab; label: string }[] = [
    { id: "about",       label: `About ${course.name}` },
    { id: "syllabus",    label: `${course.name} Format` },
    { id: "instructors", label: "Meet Instructors" },
    { id: "resources",   label: "Resources" },
    { id: "faqs",        label: "FAQs" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} courseName={course.name} />

      {/* Sticky breadcrumb + enroll bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <nav className="text-xs text-slate-500 flex items-center gap-1.5 truncate">
            <Link href="/" className="hover:text-[#1D4ED8] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <Link href="/courses" className="hover:text-[#1D4ED8] transition-colors">My Courses</Link>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="text-slate-700 font-semibold">{course.name}</span>
          </nav>
          <button onClick={() => setEnrollOpen(true)}
            className="shrink-0 px-5 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
            Enroll Now
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <div className="flex items-start gap-5 mb-5">
            <CourseLogoLarge slug={course.slug} name={course.name} accentColor={course.accentColor ?? "#1D4ED8"} />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug mb-1">{course.name}</h1>
              <p className="text-sm text-slate-500 mb-3">{course.tagline}</p>
              <button onClick={() => setEnrollOpen(true)}
                className="px-6 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
                Enroll Now
              </button>
            </div>
          </div>

          {/* Highlights row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 border-t border-slate-100">
            {(course.highlights ?? []).map((h, idx) => (
              <div key={idx} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-2 text-lg">🎯</div>
                <p className="text-sm font-extrabold text-slate-900">{h}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs Navigation ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm mb-6 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-slate-100">
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${activeTab === tab.id ? "border-[#1D4ED8] text-[#1D4ED8] bg-blue-50/30" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"}`}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Tab: About ── */}
          {activeTab === "about" && (
            <div className="p-6 space-y-5">
              {/* Hero image */}
              <div className="w-full h-52 md:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-600 relative flex items-center justify-center">
                <span className="text-7xl">{course.icon}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold">{course.rating} Rating</span>
                    <span className="text-white/60">|</span>
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-bold">{course.students} Students</span>
                    <span className="text-white/60">|</span>
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-bold">{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Text overview */}
              <p className="text-sm text-slate-600 leading-relaxed">{course.overview ?? course.description}</p>

              {/* Key features */}
              <div className="bg-blue-50 rounded-2xl p-5">
                <h3 className="font-extrabold text-slate-900 mb-4">What&apos;s Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(course.features ?? []).map(f => (
                    <div key={f} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enroll CTA inline */}
              <div className="bg-[#1D4ED8] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-white">
                  <p className="font-extrabold text-lg mb-0.5">{course.price}</p>
                  <p className="text-xs text-blue-200">{course.priceNote}</p>
                </div>
                <button onClick={() => setEnrollOpen(true)}
                  className="px-8 py-3 bg-white text-[#1D4ED8] font-extrabold rounded-xl text-sm hover:bg-blue-50 transition-all shrink-0">
                  Enroll Now →
                </button>
              </div>
            </div>
          )}

          {/* ── Tab: Syllabus / Format ── */}
          {activeTab === "syllabus" && (
            <div className="p-6">
              <h2 className="text-base font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#1D4ED8]" /> {course.name} Study Plan
              </h2>
              <div className="space-y-3">
                {(course.syllabus ?? []).map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-[#1D4ED8] text-white text-xs font-extrabold flex items-center justify-center shrink-0">{i + 1}</div>
                    <div>
                      <p className="text-xs font-bold text-[#1D4ED8] mb-0.5">{item.week}</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{item.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab: Instructors ── */}
          {activeTab === "instructors" && (
            <div className="p-6">
              <h2 className="text-base font-extrabold text-slate-900 mb-6">Meet Your Instructors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {instructors.map(inst => (
                  <div key={inst.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                      <Image src={inst.avatar} alt={inst.name} width={64} height={64} unoptimized className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-slate-900 text-sm mb-0.5">{inst.name}</h3>
                      <p className="text-xs text-[#1D4ED8] font-semibold mb-2">{inst.role}</p>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">{inst.bio}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {inst.students.toLocaleString()} students</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {inst.rating} rating</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab: Resources ── */}
          {activeTab === "resources" && (
            <div className="p-6">
              <h2 className="text-base font-extrabold text-slate-900 mb-6">Study Resources</h2>
              <div className="space-y-3">
                {(course.resources ?? []).map((res, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-[#1D4ED8]/30 transition-all group cursor-pointer">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      res.type === "PDF" ? "bg-red-50" : res.type === "Video" ? "bg-purple-50" : "bg-green-50"
                    }`}>
                      {res.type === "PDF" ? <FileText className="w-5 h-5 text-red-600" /> :
                       res.type === "Video" ? <Video className="w-5 h-5 text-purple-600" /> :
                       <BookOpen className="w-5 h-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors">{res.title}</p>
                      <p className="text-xs text-slate-400">{res.type}</p>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-[#1D4ED8] transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab: FAQs ── */}
          {activeTab === "faqs" && (
            <div className="p-6">
              <h2 className="text-base font-extrabold text-slate-900 mb-5">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {(course.faqs ?? []).map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </div>
          )}
        </div>

        {/* Programs / Batches */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
          <h2 className="text-base font-extrabold text-slate-900 mb-5">Programs &amp; Batches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(course.programs ?? []).map((prog, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm group cursor-pointer hover:shadow-md transition-all">
                <div className="relative h-28 bg-slate-100 overflow-hidden flex items-center justify-center">
                  <span className="text-4xl">{course.icon}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-extrabold text-slate-900 mb-0.5 leading-snug">{prog.name}</h4>
                  <p className="text-[10px] text-slate-500 mb-1">{prog.format}</p>
                  <p className="text-[10px] font-semibold text-[#1D4ED8]">{prog.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Courses + Certified CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Other courses */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-base font-extrabold text-slate-900 mb-5">Other Courses You May Like</h2>
            <div className="space-y-3">
              {COURSES.filter(c => c.slug !== course.slug).slice(0, 4).map(c => (
                <Link key={c.id} href={`/courses/${c.slug}`}
                  className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-[#1D4ED8]/30 hover:shadow-sm transition-all group">
                  <div className="w-12 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: (c.accentColor ?? "#1D4ED8") + "15", border: `1.5px solid ${c.accentColor ?? "#1D4ED8"}30` }}>
                    <span className="text-xs font-extrabold" style={{ color: c.accentColor ?? "#1D4ED8" }}>{c.shortName ?? c.name}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors text-truncate">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.duration} · {c.price ? `NPR ${c.price.toLocaleString()}` : "Free"}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1D4ED8] transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Get certified CTA */}
          <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-extrabold text-white mb-2">Get Certified Information</h3>
              <p className="text-sm text-blue-200 leading-relaxed mb-4">Have questions about enrollment, batch timings, or fees? Our counselors are online now.</p>
            </div>
            <div className="space-y-2.5">
              <button onClick={() => setEnrollOpen(true)}
                className="w-full py-2.5 bg-white text-[#1D4ED8] font-extrabold rounded-xl text-sm hover:bg-blue-50 transition-all">
                Enroll Now
              </button>
              <Link href="/appointment"
                className="block w-full py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm text-center border border-white/20 transition-all">
                Chat with Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
