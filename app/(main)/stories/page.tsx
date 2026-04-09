import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, User, ArrowLeft, ArrowRight } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "Success Stories — Unifinders Education Pvt. Ltd.",
  description: "Read inspiring success stories of Nepali students who achieved their study abroad dreams with Unifinders.",
};

const STORIES = [
  {
    name: "Siddharth Karmacharya",
    flag: "🇦🇺",
    dest: "University of Melbourne, Australia",
    program: "Master of Information Technology",
    year: "2024",
    scholarship: "Melbourne Graduate Scholarship — AUD 20,000",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    story: "I never thought studying at one of the world's top 50 universities was possible for me. Unifinders not only helped me shortlist the right programs but also guided me through my scholarship application. The IELTS coaching pushed my score from 6.5 to 7.5 — a game changer!",
    rating: 5,
  },
  {
    name: "Nisha Tamang",
    flag: "🇬🇧",
    dest: "University of Edinburgh, UK",
    program: "MSc Data Science",
    year: "2024",
    scholarship: null,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    story: "The counseling team at Unifinders was incredibly patient and thorough. They reviewed my SOP five times until it was perfect. I received an offer within 3 weeks of applying — the fastest response I had ever imagined!",
    rating: 5,
  },
  {
    name: "Rohan Shrestha",
    flag: "🇨🇦",
    dest: "University of Toronto, Canada",
    program: "MBA",
    year: "2023",
    scholarship: "International Excellence Award — CAD 15,000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    story: "Unifinders' GMAT coaching was outstanding. I scored 720 on my first attempt, which opened doors I didn't even know existed. The Unifinders team treated my application like it was their own.",
    rating: 5,
  },
  {
    name: "Priti Mainali",
    flag: "🇳🇿",
    dest: "University of Auckland, New Zealand",
    program: "BHSc (Nursing)",
    year: "2023",
    scholarship: null,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    story: "As a nursing student, I was worried the process would be complicated. Unifinders simplified everything — from choosing the right institution to getting my skills assessed. My OET coaching sessions were incredibly helpful.",
    rating: 5,
  },
  {
    name: "Aakash Pradhan",
    flag: "🇩🇪",
    dest: "Technische Universität München, Germany",
    program: "M.Eng. Mechanical Engineering",
    year: "2024",
    scholarship: "DAAD Scholarship — Full Tuition + Stipend",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    story: "Germany was not even on my radar until Unifinders showed me the opportunities available. A fully-funded DAAD scholarship to TUM is a dream come true. I owe this milestone to the Unifinders team.",
    rating: 5,
  },
  {
    name: "Bina Lama",
    flag: "🇺🇸",
    dest: "Arizona State University, USA",
    program: "MS Computer Science",
    year: "2023",
    scholarship: "Graduate Teaching Assistantship",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    story: "The GRE preparation at Unifinders was unlike any other. The mock tests were exactly exam-level. My counselor knew ASU inside-out and helped me secure a Teaching Assistantship that covers my full tuition!",
    rating: 5,
  },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        breadcrumb={[{ label: "Success Stories" }]}
        title="Real Students."
        titleHighlight="Real Dreams."
        titleSuffix="Real Results."
        subtitle="Over 1,200 students have trusted Unifinders with their study abroad journey. Here are some of their stories."
      />

      {/* Stories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {STORIES.map(s => (
            <div key={s.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6 flex flex-col">
              {/* Quote */}
              <p className="text-sm text-slate-600 leading-relaxed italic mb-6 flex-1">&ldquo;{s.story}&rdquo;</p>
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: s.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base">★</span>
                ))}
              </div>
              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 shrink-0">
                  <Image src={s.avatar} alt={s.name} width={48} height={48} unoptimized className="object-cover w-full h-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <p className="font-extrabold text-slate-900 text-sm">{s.name}</p>
                    <span>{s.flag}</span>
                  </div>
                  <p className="text-xs text-[#1D4ED8] font-semibold">{s.program}</p>
                  <p className="text-xs text-slate-400">{s.dest} · {s.year}</p>
                  {s.scholarship && (
                    <p className="text-xs text-green-600 font-semibold mt-0.5">🎓 {s.scholarship}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl font-extrabold mb-3">Your Story Could Be Next</h2>
          <p className="text-blue-200 text-sm mb-6 max-w-md mx-auto">Join thousands of students who have achieved their international education dreams with Unifinders.</p>
          <Link href="/appointment" className="inline-block px-8 py-3 bg-white text-[#1D4ED8] font-bold rounded-xl hover:bg-blue-50 transition-all text-sm">
            Start Your Journey →
          </Link>
        </div>
      </div>
    </div>
  );
}
