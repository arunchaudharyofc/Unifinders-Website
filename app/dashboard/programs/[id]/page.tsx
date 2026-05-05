"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Bookmark, Scale, GraduationCap, Clock,
  Award, Calculator, Calendar, FileText, LayoutGrid, MapPin,
  Building2, ArrowRight, ChevronRight,
} from "lucide-react";

const NAV_ITEMS = ["Program Summary", "Course Description", "Why Choose", "Tuition & Fees", "Entry Requirements", "Recommended Universities"];
const COUNTRIES_TAB = [
  { code: "AU", label: "Australia", flag: "https://flagcdn.com/w40/au.png", active: true },
  { code: "CA", label: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
  { code: "US", label: "USA", flag: "https://flagcdn.com/w40/us.png" },
  { code: "GB", label: "UK", flag: "https://flagcdn.com/w40/gb.png" },
];

export default function ProgramDetailsPage() {
  const [activeNav, setActiveNav] = useState("Program Summary");

  return (
    <div className="w-full bg-[#F8FAFC] -mx-6 -my-6 md:-mx-8 md:-my-8" style={{ minHeight: "calc(100vh - 80px)" }}>
      {/* Breadcrumb Bar */}
      <div className="bg-white border-b border-[#EAECF0] h-14 flex items-center px-6 md:px-8 gap-3 sticky top-0 z-30">
        <Link href="/dashboard/programs/search" className="flex items-center gap-2 text-[#475467] font-medium hover:text-[#0070F0] transition text-sm">
          <ArrowLeft className="w-4 h-4" /> Program Details
        </Link>
        <div className="h-5 w-px bg-[#EAECF0] mx-1" />
        <div className="text-xs text-[#475467] flex items-center gap-1">
          <span>Home</span> <ChevronRight className="w-3 h-3" />
          <span>Explore Program</span> <ChevronRight className="w-3 h-3" />
          <span className="font-semibold text-[#0070F0]">Bachelor of Advanced Computer Science (Honours)</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[380px] md:h-[420px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&auto=format&fit=crop" alt="Nursing" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A2D]/85 via-[#0B1A2D]/50 to-transparent" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-16 px-6 md:px-10 lg:px-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Bachelor of Nursing</h1>
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-white mb-3">Introduction</h3>
            <ul className="space-y-2.5">
              {[
                "A BSN, which stand for Bachelor of Science in Nursing, in undergraduate level degree for registered nurse (RNs).",
                "Introduces topics such as patient care technology, research, health promotion, safety and quality within the healthcare system.",
                "Nursing is one of the most popular courses in Australia, with more than 10 universities in the top 100 Nursing programs in the world.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-200 text-[14px] leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-[#0070F0] shrink-0 mt-0.5" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Country Tabs */}
        <div className="absolute bottom-0 left-6 md:left-10 lg:left-16 flex gap-1">
          {COUNTRIES_TAB.map(c => (
            <div key={c.code} className={`px-5 py-2.5 rounded-t-xl flex items-center gap-2 text-sm font-semibold cursor-pointer transition ${c.active ? "bg-white text-[#101828] shadow-sm" : "bg-white/80 text-[#475467] backdrop-blur-sm hover:bg-white"}`}>
              <img src={c.flag} alt="" className="w-5 h-5 rounded-full object-cover" /> {c.label}
            </div>
          ))}
          <div className="px-5 py-2.5 rounded-t-xl flex items-center gap-2 text-sm font-semibold text-[#0070F0] bg-white/80 backdrop-blur-sm cursor-pointer hover:bg-white transition">
            + Add country to compare
          </div>
        </div>
      </div>

      {/* Floating Action Card */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative">
        <div className="bg-white rounded-2xl shadow-xl border border-[#EAECF0] p-6 w-full md:w-[320px] lg:absolute right-16 -top-52 z-20 mt-6 lg:mt-0">
          <h3 className="text-lg font-bold text-[#101828] text-center mb-5">Management</h3>
          <div className="space-y-3 mb-6 text-sm">
            <div className="flex items-center gap-3"><Award className="w-4 h-4 text-[#0070F0]" /><span className="text-[#475467] w-20">Institute</span><span className="font-semibold text-[#101828]">6854</span></div>
            <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-[#0070F0]" /><span className="text-[#475467] w-20">Duration</span><span className="font-semibold text-[#101828]">1-2 Years</span></div>
            <div className="flex items-center gap-3"><GraduationCap className="w-4 h-4 text-[#0070F0]" /><span className="text-[#475467] w-20">Degree</span><span className="font-semibold text-[#101828]">Masters, Bachelors, Post-Graduate, Diploma</span></div>
          </div>
          <button className="w-full h-11 bg-[#0070F0] text-white rounded-xl font-semibold text-sm hover:bg-blue-600 transition mb-4">Talk to our Experts for Free</button>
          <div className="flex items-center justify-center gap-2 text-xs text-[#475467] mb-5">
            <div className="flex -space-x-1.5">{[1,2,3,4].map(i => <div key={i} className={`w-5 h-5 rounded-full border-2 border-white bg-slate-${i*100+100}`} />)}</div>
            +10k students viewed this
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#EAECF0]">
            <button className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#344054] hover:text-[#0070F0]"><Bookmark className="w-3.5 h-3.5" /> Add to Bookmark</button>
            <button className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#344054] hover:text-[#0070F0] border-l border-[#EAECF0]"><Scale className="w-3.5 h-3.5" /> Add to Compare</button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 flex flex-col lg:flex-row gap-10">
        {/* Side Nav */}
        <div className="w-full lg:w-56 shrink-0 space-y-1 lg:sticky lg:top-20 self-start">
          {NAV_ITEMS.map(item => (
            <button key={item} onClick={() => setActiveNav(item)} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition flex items-center justify-between ${activeNav === item ? "bg-[#0070F0] text-white shadow-sm" : "text-[#475467] hover:bg-white"}`}>
              {item} {activeNav === item && <ArrowRight className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 max-w-3xl space-y-14">
          {/* Program Summary */}
          <section>
            <h2 className="text-2xl font-bold text-[#101828] mb-6">Program Summary</h2>
            <div className="space-y-0">
              {[
                { icon: Award, label: "Level of Study", value: "Undergraduate" },
                { icon: LayoutGrid, label: "Specialization", value: "Nursing and Homecare" },
                { icon: Clock, label: "Course Duration", value: "3 Years" },
                { icon: Calculator, label: "1st Year Tuition Fees", value: "$45,125 - $48,500", suffix: "(AUD)" },
                { icon: FileText, label: "Application Fees", value: "$100", suffix: "(AUD)" },
                { icon: FileText, label: "Exam Score", value: "IELTS(6.50)    TOEFL(79.00)    PTE(58.00)" },
              ].map(({ icon: Icon, label, value, suffix }, i) => (
                <div key={i} className="grid border-b border-slate-100 py-4" style={{ gridTemplateColumns: "240px 1fr" }}>
                  <span className="flex items-center gap-3 text-[#475467] font-medium text-sm"><Icon className="w-5 h-5 text-[#0070F0]" />{label}</span>
                  <span className="font-semibold text-[#101828] text-sm">{value} {suffix && <span className="text-xs text-[#98A2B3] font-normal">{suffix}</span>}</span>
                </div>
              ))}
              {/* Intakes row */}
              <div className="grid border-b border-slate-100 py-4" style={{ gridTemplateColumns: "240px 1fr" }}>
                <span className="flex items-center gap-3 text-[#475467] font-medium text-sm"><Calendar className="w-5 h-5 text-[#0070F0]" />Intakes:</span>
                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-sm font-semibold text-[#101828]">Summer: <span className="ml-1 px-3 py-1 rounded-full bg-[#0070F0] text-white text-xs font-semibold">July, 2024</span></span>
                  <span className="text-sm font-semibold text-[#101828]">Winter: <span className="ml-1 px-3 py-1 rounded-full bg-[#0070F0] text-white text-xs font-semibold">January, 2025</span></span>
                </div>
              </div>
            </div>
          </section>

          {/* Course Descriptions */}
          <section>
            <h2 className="text-2xl font-bold text-[#101828] mb-4">Course Descriptions</h2>
            <div className="text-sm text-[#344054] leading-relaxed space-y-4">
              <p>Bachelor of Nursing in Australia is generally a 3-year degree that instills theoretical and practical concepts of Australia&apos;s health care system and the world. With an Australian Bachelor of Nursing degree in your portfolio, you can work in Australia, your home country or overseas in any healthcare setting like mental health, community health, public health, private hospitals, aged care, rural practice etc.</p>
              <p>However, to study Bachelor of Nursing or BSc Nursing in Australia, students must first demonstrate their eligibility by fulfilling the IELTS/TOEFL or Academic requirements to study in Australia.</p>
              <p>This guide will provide international students with answers to questions like:</p>
              <ul className="space-y-2 ml-1">
                {["Is a Bachelor of Nursing in Australia worth it?", "How much does a bachelor's degree in nursing cost?", "What are the requirements to study Nursing in Australia?"].map((q, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0070F0] shrink-0 mt-0.5" />{q}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Why Choose */}
          <section>
            <h2 className="text-2xl font-bold text-[#101828] mb-4">Why Choose</h2>
            <div className="text-sm text-[#344054] leading-relaxed space-y-4">
              <p>The popularity of Australia for further education among international students is increasing daily. Among other programs, nursing is even more famous in Australia thanks to the universities, program ranking, and job outlooks Australia carries for nursing students.</p>
              <ul className="space-y-2.5 ml-1">
                {[
                  "Nursing is one of the most popular courses in Australia, with more than 10 universities in the top 100 Nursing programs in the world.",
                  "Nurses are one of the most highly paid professions in Australia.",
                  "After completing a Bachelor of Nursing in Australia or BSc Nursing in Australia, students become eligible for practising nursing in hospitals and health care settings as Registered Nurses.",
                  "Bachelor of Nursing is one of the best courses in Australia from both nursing and PR point of View.",
                  "You can pick universities to study Bachelor of Nursing from various popular Australian cities like Queensland, Sydney, Melbourne, Wollongong, Adelaide and many others.",
                ].map((p, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-[#0070F0] shrink-0 mt-0.5" />{p}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Tuition & Fees */}
          <section>
            <h2 className="text-2xl font-bold text-[#101828] mb-4">Tuition & Fees</h2>
            <p className="text-sm text-[#344054] leading-relaxed mb-4">Course fees are indicative and should be viewed as an estimate. Connect with a counsellor to get an accurate figure for your course fees!</p>
            <button className="h-10 px-5 bg-[#0070F0] text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-blue-600 transition">
              <Calendar className="w-4 h-4" /> Book an Appointment
            </button>
          </section>

          {/* Eligibility Requirements */}
          <section>
            <h2 className="text-2xl font-bold text-[#101828] mb-4">Eligibility Requirements</h2>
            <p className="text-sm text-[#344054] leading-relaxed mb-6">Generally, Nursing is a revered and skilled profession in Australia. Students are granted the prestigious position of registered nurse in Australia. So, Australian universities have strict admission requirements that students must fulfil to get admission to Australia&apos;s bachelor of nursing program.</p>
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-[#EAECF0] p-5">
                <h4 className="font-bold text-[#101828] text-sm mb-3">Academic Requirements</h4>
                <ul className="space-y-2 text-sm text-[#344054]">
                  {["International Baccalaureate (IB) diploma 36", "GCE A-Levels ABB", "SAT 1380"].map((r, i) => (
                    <li key={i} className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-[#0070F0]" />{r}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-[#EAECF0] p-5">
                <h4 className="font-bold text-[#101828] text-sm mb-3">English Language Requirements</h4>
                <div className="space-y-2 text-sm text-[#344054]">
                  {[
                    { test: "IELTS (6.50)", desc: "With no band score below 6.0" },
                    { test: "TOEFL (79.00)", desc: "With a minimum of 13 in listening & reading, 18 in speaking, and 21 in writing" },
                    { test: "PTE (58.00)", desc: "With at least 50 in all subset" },
                  ].map((r, i) => (
                    <div key={i} className="flex items-start gap-2"><ArrowRight className="w-3.5 h-3.5 text-[#0070F0] shrink-0 mt-0.5" /><span><strong>{r.test}</strong> {r.desc}</span></div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-sm mb-3">Additional Requirements</h4>
                <ul className="space-y-2 text-sm text-[#344054]">
                  {["Academic transcripts", "English proficiency certificates", "Copy of passport", "Verified proof of identity"].map((r, i) => (
                    <li key={i} className="flex items-center gap-2"><ArrowRight className="w-3.5 h-3.5 text-[#0070F0]" />{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Recommended Universities */}
          <section>
            <h2 className="text-2xl font-bold text-[#101828] mb-4">Recommended Universities</h2>
            <p className="text-sm text-[#344054] leading-relaxed mb-6">The worldwide popularity of Australian nursing degrees is quite a trend. Below you will see some best Universities in Australia to study Bachelor of Nursing.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden hover:shadow-md transition">
                  <div className="relative h-44">
                    <img src={`https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop`} alt="University" className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#0070F0] text-white text-xs font-bold rounded-lg">Rank: {i * 5 + 20}</div>
                  </div>
                  <div className="p-5 space-y-2 text-sm">
                    <h4 className="font-bold text-[#101828] text-base">University of Melbourne</h4>
                    <div className="flex items-center gap-2 text-[#475467]"><Building2 className="w-3.5 h-3.5" /> Institute Type <span className="ml-auto font-semibold text-[#101828]">Public</span></div>
                    <div className="flex items-center gap-2 text-[#475467]"><MapPin className="w-3.5 h-3.5" /> Location <span className="ml-auto font-semibold text-[#101828]">Australia, Melbourne</span></div>
                    <div className="flex items-center gap-2 text-[#475467]"><Calendar className="w-3.5 h-3.5" /> Establishment <span className="ml-auto font-semibold text-[#101828]">1924</span></div>
                    <div className="flex items-center gap-2 text-[#475467]"><GraduationCap className="w-3.5 h-3.5" /> Courses <span className="ml-auto font-semibold text-[#101828]">45</span></div>
                    <div className="flex items-center gap-2 text-[#475467]"><Calendar className="w-3.5 h-3.5" /> Intakes <span className="ml-auto flex gap-1">{["Jan", "May", "Sep"].map(m => <span key={m} className="px-2 py-0.5 bg-[#F0F6FE] text-[#0070F0] text-xs font-semibold rounded">{m}</span>)}</span></div>
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#EAECF0] mt-3">
                      <button className="h-9 border border-[#D0D5DD] rounded-lg text-xs font-semibold text-[#344054] hover:bg-slate-50 transition">Compare</button>
                      <button className="h-9 bg-[#0070F0] rounded-lg text-xs font-semibold text-white hover:bg-blue-600 transition">Apply Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/universities" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0070F0] hover:gap-3 transition-all">
              View More Universities <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
