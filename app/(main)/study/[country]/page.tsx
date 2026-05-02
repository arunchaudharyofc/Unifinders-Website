"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronDown, Check, Play, Plus, Minus,
  Target, BookOpen, Award, Shield, FileText, DollarSign, Search,
} from "lucide-react";
import { DESTINATIONS } from "@/lib/constants/destinations";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

/* ── Per-country hero images (loaded via next/image fill for reliable rendering) ── */
const HERO_IMAGES: Record<string, string> = {
  australia:     "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2000&q=80",
  canada:        "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2000&q=80",
  usa:           "https://images.unsplash.com/photo-1492546643260-58bd3209a7bf?auto=format&fit=crop&w=2000&q=80",
  uk:            "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
  "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=2000&q=80",
  ireland:       "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=2000&q=80",
  india:         "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=2000&q=80",
  bangladesh:    "https://images.unsplash.com/photo-1587326887550-93a8c14d9b4b?auto=format&fit=crop&w=2000&q=80",
  europe:        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80",
  dubai:         "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80",
};

/* ── University data ── */
const UNI_DATA: Record<string, { name: string; img: string; tags: string[] }[]> = {
  australia: [
    { name: "University of Melbourne",   img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=600&q=80", tags: ["Research Intensive", "QS Top 33", "Medicine & Law"] },
    { name: "University of Sydney",      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80", tags: ["Founded 1850", "QS Top 40", "Business & Engineering"] },
    { name: "ANU – Canberra",            img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80", tags: ["National Research", "QS Top 30", "Policy & Sciences"] },
    { name: "University of Queensland",  img: "https://images.unsplash.com/photo-1569428034239-f9565e32e224?auto=format&fit=crop&w=600&q=80", tags: ["Group of Eight", "QS Top 40", "Research Excellence"] },
    { name: "Monash University",         img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", tags: ["Group of Eight", "QS Top 60", "Pharmacy & Education"] },
    { name: "RMIT University",           img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", tags: ["Industry Focused", "Top Ranked", "Design & Tech"] },
  ],
  default: [
    { name: "Top Ranked University",        img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&q=80", tags: ["World Renowned", "QS Ranked", "Research"] },
    { name: "National University",          img: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80", tags: ["Government Funded", "High Quality", "Affordable"] },
    { name: "Technology Institute",         img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=600&q=80", tags: ["STEM Focus", "Industry Links", "Innovation"] },
    { name: "Business School",             img: "https://images.unsplash.com/photo-1569428034239-f9565e32e224?auto=format&fit=crop&w=600&q=80", tags: ["MBA Programs", "Finance", "Management"] },
    { name: "Medical University",           img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80", tags: ["MBBS Programs", "Research", "Healthcare"] },
    { name: "Arts & Sciences College",     img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", tags: ["Liberal Arts", "Sciences", "Humanities"] },
  ],
};

const TESTIMONIALS = [
  { name: "Priya Sharma",       role: "UoM Graduate",         avatar: "https://i.pravatar.cc/80?img=47", text: "Unifinders made my dream of studying at the University of Melbourne a reality. They guided me step-by-step through the visa and application process." },
  { name: "Rajan Thapa",        role: "UBC Student",           avatar: "https://i.pravatar.cc/80?img=12", text: "I had no idea where to start. Unifinders counselors were incredibly patient and helped me choose the right program in Canada. Best decision ever!" },
  { name: "Anisha Gurung",      role: "UCL Alumna",            avatar: "https://i.pravatar.cc/80?img=48", text: "The scholarship assistance from Unifinders saved me thousands. I am now pursuing my dream career in London thanks to their expert guidance." },
  { name: "Bijay Maharjan",     role: "Current Student",       avatar: "https://i.pravatar.cc/80?img=15", text: "What impressed me most was how organized everything was. From document checklists to mock interviews — Unifinders had it all covered." },
  { name: "Sunita KC",          role: "Permanent Resident",    avatar: "https://i.pravatar.cc/80?img=49", text: "I am now a permanent resident of Canada and it all started with a free counselling session at Unifinders. Extremely grateful!" },
  { name: "Dipesh Acharya",     role: "PhD Researcher",        avatar: "https://i.pravatar.cc/80?img=17", text: "Unifinders doesn't just help you get an offer — they prepare you for life abroad. Their comprehensive support is truly outstanding." },
];

const FAQS = [
  { q: "What is the minimum IELTS score required?",       a: "Most universities require an overall IELTS score of 6.0–6.5. Some postgraduate programs may require 6.5–7.0. We offer free IELTS guidance to help you achieve your target score." },
  { q: "How much does it cost to study abroad?",          a: "Costs vary by country and program. Australia averages AUD 20,000–45,000/year, Canada CAD 15,000–35,000/year, and the UK GBP 12,000–30,000/year. Scholarships can significantly reduce these costs." },
  { q: "How long does the visa process take?",            a: "Visa processing times vary: Australia 4–6 weeks, Canada 8–12 weeks, UK 3–4 weeks, USA 3–5 months. We recommend applying at least 3 months before your intake." },
  { q: "Can I work while studying abroad?",               a: "Yes! Most countries allow international students to work part-time. Australia allows 48 hours/fortnight, Canada allows 20 hrs/week during term, and the UK allows 20 hrs/week." },
  { q: "What support does Unifinders provide?",           a: "We offer end-to-end support: university selection, application, scholarship hunting, visa guidance, pre-departure briefing, and accommodation assistance. All from one place — for free!" },
];

const WHY_CHOOSE_US = [
  { icon: Target,     label: "1:1 Guidance & Support" },
  { icon: BookOpen,   label: "Best Online Test Prep" },
  { icon: Award,      label: "Scholarship Assistance" },
  { icon: Shield,     label: "Hassle-Free Visa Process" },
  { icon: FileText,   label: "Easy Documentation" },
  { icon: DollarSign, label: "Financial Guidance" },
  { icon: Search,     label: "Explore Your Options" },
];

/* ── Country-specific study images for "Everything" section ── */
const STUDY_IMAGES: Record<string, string> = {
  australia:     "https://images.unsplash.com/photo-1546938576-6e605b5aff92?auto=format&fit=crop&w=1200&q=80",
  canada:        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
  usa:           "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=1200&q=80",
  uk:            "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80",
  "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80",
  ireland:       "https://images.unsplash.com/photo-1564959130747-897fb406b9af?auto=format&fit=crop&w=1200&q=80",
  india:         "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
  bangladesh:    "https://images.unsplash.com/photo-1587326887550-93a8c14d9b4b?auto=format&fit=crop&w=1200&q=80",
  europe:        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
  dubai:         "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
};

export default function StudyCountryPage() {
  const params = useParams<{ country: string }>();
  const dest = DESTINATIONS[params.country];
  if (!dest) notFound();

  const [activeCity, setActiveCity] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const n = dest.name;
  const slug = params.country;
  const heroImg = HERO_IMAGES[slug] || HERO_IMAGES.australia;
  const studyImg = STUDY_IMAGES[slug] || STUDY_IMAGES.australia;
  const unis = UNI_DATA[slug] || UNI_DATA.default;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Sub-navigation ── */}
      <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-12 overflow-x-auto gap-0">
          {[`Why ${n}`, `Study in ${n}`, `Live in ${n}`, `Work in ${n}`, "Universities"].map(tab => (
            <button
              key={tab}
              className="flex items-center gap-1 px-5 h-full text-[13px] font-semibold text-slate-600 hover:text-[#1D4ED8] whitespace-nowrap border-b-2 border-transparent hover:border-[#1D4ED8] transition-all shrink-0"
            >
              {tab} <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="relative h-[380px] w-full overflow-hidden">
        <Image
          src={heroImg}
          alt={`Study in ${n}`}
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        {/* Dark overlay: dense on left, fades to semi-transparent on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex flex-col justify-center">
          <p className="text-blue-300 font-semibold text-sm mb-2 uppercase tracking-widest">
            {dest.emoji} Study Destination
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg leading-tight">
            Study Guide to <span className="text-blue-300">{n}</span>
          </h1>
          <p className="text-white/85 text-base md:text-lg mb-7 max-w-2xl leading-relaxed">
            Explore everything you need to know about studying abroad in {n}, from intake dates
            and application processes to visa applications and best student cities!
          </p>
          <Link
            href="/appointment"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1D4ED8] hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-lg text-sm shadow-xl w-fit transition-all hover:scale-105"
          >
            Book a Free Appointment →
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── About Section ── */}
        <section className="py-16 border-b border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest mb-3">Overview</p>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                About <span className="text-[#1D4ED8]">{n}</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-[15px]">{dest.overview}</p>
              <p className="text-slate-500 leading-relaxed text-[15px]">
                {n} welcomes international students with open arms, offering world-class
                institutions, globally recognized qualifications, and a safe multicultural
                environment ideal for academic and personal growth.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/appointment" className="px-6 py-2.5 bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-all">
                  Get Free Counselling
                </Link>
                <Link href="/courses" className="px-6 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg hover:border-blue-400 hover:text-[#1D4ED8] transition-all">
                  Browse Courses
                </Link>
              </div>
            </div>
            {/* Video thumbnail */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-slate-100 group cursor-pointer">
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                alt={`Students in ${n}`}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all">
                <div className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-[#1D4ED8] fill-[#1D4ED8] ml-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Study ── */}
        <section className="py-16 border-b border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest mb-3">Reasons</p>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
                Why study in <span className="text-[#1D4ED8]">{n}?</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.whyCards.map((c, i) => (
                  <div key={i} className="bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-2xl p-5 transition-all group">
                    <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center mb-3 transition-all">
                      <c.icon className="w-5 h-5 text-[#1D4ED8]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{c.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden ring-8 ring-blue-100 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&q=80"
                  alt="Graduate student"
                  width={320}
                  height={320}
                  unoptimized
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section className="py-16 border-b border-slate-100 bg-gradient-to-b from-white to-blue-50 rounded-3xl my-4 px-8">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-3">Why Choose <span className="text-[#1D4ED8]">Unifinders?</span></h2>
          <p className="text-slate-500 text-center text-sm mb-10 max-w-xl mx-auto">
            We are your one-stop solution for studying abroad — from university selection to visa approval.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {WHY_CHOOSE_US.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-28 text-center group">
                <div className="w-14 h-14 bg-white border-2 border-blue-100 group-hover:border-blue-400 rounded-2xl flex items-center justify-center shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-1">
                  <item.icon className="w-6 h-6 text-[#1D4ED8]" />
                </div>
                <span className="text-xs font-semibold text-slate-700 leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/appointment"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-300 hover:scale-105 transition-all text-sm"
            >
              Join Our Free Counselling Session →
            </Link>
          </div>
        </section>

        {/* ── Popular Places ── */}
        <section className="py-16 border-b border-slate-100">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-3">
            Popular Places to Study in <span className="text-[#1D4ED8]">{n}</span>
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8 max-w-xl mx-auto">
            Discover the best cities for international students across {n}.
          </p>
          {/* City tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {dest.city.tabs.map((city, i) => (
              <button
                key={city}
                onClick={() => setActiveCity(i)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  activeCity === i
                    ? "bg-[#1D4ED8] text-white border-[#1D4ED8] shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-[#1D4ED8]"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
          {/* City card */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-100 rounded-3xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-extrabold text-[#1D4ED8] mb-5 uppercase tracking-wide">
                  {dest.city.tabs[activeCity]}
                </h3>
                <ul className="space-y-3 mb-8">
                  {dest.city.description.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#1D4ED8] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-slate-700 text-sm leading-relaxed">{d}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md transition-all w-fit"
                >
                  Book an Appointment in {dest.city.tabs[activeCity]} →
                </Link>
              </div>
              <div className="relative min-h-[280px]">
                <Image
                  src={dest.city.image}
                  alt={dest.city.tabs[activeCity]}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Popular Universities ── */}
        <section className="py-16 border-b border-slate-100">
          <div className="text-center mb-10">
            <p className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest mb-2">Top Picks</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
              Popular Universities &amp; Colleges in {n}
            </h2>
            <p className="text-[#1D4ED8] font-semibold text-sm">Ranking, Fees &amp; Requirements</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unis.map((u, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={u.img}
                    alt={u.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">{u.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {u.tags.map(tag => (
                      <span key={tag} className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-100">{tag}</span>
                    ))}
                  </div>
                  <ul className="space-y-1.5 mb-4">
                    {["Highly research university", "Globally recognized qualification", "QS ranking in TOP 100"].map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1 text-[#1D4ED8] font-semibold text-xs hover:gap-2 transition-all"
                  >
                    View Detail →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courses" className="px-8 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] font-bold rounded-xl text-sm hover:bg-[#1D4ED8] hover:text-white transition-all">
              View All Universities →
            </Link>
          </div>
        </section>

        {/* ── Everything about Study ── */}
        <section className="py-16 border-b border-slate-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Everything about Study in <span className="text-[#1D4ED8]">{n}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-6">Key Intake & Study Information</h3>
              <ul className="space-y-4 mb-8">
                {dest.intakeText.map((line, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-6 h-6 bg-[#1D4ED8] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-slate-700 text-sm leading-relaxed">{line}</span>
                  </li>
                ))}
                {/* Additional generic info */}
                <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-6 h-6 bg-[#1D4ED8] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-700 text-sm leading-relaxed">
                    Strong post-study work rights and immigration pathways for international students.
                  </span>
                </li>
                <li className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-6 h-6 bg-[#1D4ED8] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-700 text-sm leading-relaxed">
                    Wide range of scholarships and financial aid available for Nepali students.
                  </span>
                </li>
              </ul>
              <Link
                href="/appointment"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-lg hover:shadow-blue-300 transition-all"
              >
                Get Admission Today →
              </Link>
            </div>
            <div className="relative h-[380px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={studyImg}
                alt={`Study in ${n}`}
                fill
                unoptimized
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* ── Success Stories ── */}
        <section className="py-16 border-b border-slate-100">
          <div className="text-center mb-10">
            <p className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Success Stories from Students in <span className="text-[#1D4ED8]">{n}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all relative overflow-hidden group">
                <span className="absolute -top-3 left-4 text-8xl font-serif text-blue-100 leading-none select-none group-hover:text-blue-200 transition-colors">
                  {String.fromCharCode(8220)}
                </span>
                <p className="text-slate-600 text-sm leading-relaxed mb-5 relative z-10 pt-3">{t.text}</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-100 shrink-0">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} unoptimized className="object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[#1D4ED8] font-semibold text-sm uppercase tracking-widest mb-2">FAQ</p>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
                Got Questions? <span className="text-[#1D4ED8]">We have Answers.</span>
              </h2>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Everything you need to know about studying in {n}. Can&apos;t find what you&apos;re looking for?{" "}
                <Link href="/appointment" className="text-[#1D4ED8] font-semibold hover:underline">Talk to our experts →</Link>
              </p>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-slate-200 hover:border-blue-300 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      className="w-full flex items-center justify-between p-5 text-left"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      <span className="font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                      {openFaq === i
                        ? <Minus className="w-5 h-5 text-[#1D4ED8] shrink-0" />
                        : <Plus className="w-5 h-5 text-slate-400 shrink-0" />
                      }
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* FAQ Illustration */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80"
                  alt="Students getting answers"
                  fill
                  unoptimized
                  className="object-cover rounded-3xl shadow-2xl"
                />
              </div>
              {/* CTA below illustration */}
              <div className="mt-8 text-center bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white w-full max-w-sm shadow-xl">
                <h3 className="font-bold text-lg mb-2">Still have questions?</h3>
                <p className="text-blue-100 text-sm mb-5 leading-relaxed">
                  Our expert counselors are available Mon–Sat, 9AM–6PM to help you every step of the way.
                </p>
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 transition-all shadow-md"
                >
                  Book Free Consultation →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
