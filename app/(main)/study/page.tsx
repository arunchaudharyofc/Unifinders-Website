/**
 * STUDY DESTINATIONS PAGE — Country cards grid
 */
import Link from "next/link";
import { ArrowRight, GraduationCap, Banknote, Clock } from "lucide-react";

export const metadata = {
  title: "Study Destinations | Unifinders",
  description: "Explore top study abroad destinations — UK, Australia, USA, Canada, Germany and more. Get expert counseling from Unifinders.",
};

const DESTINATIONS = [
  {
    slug: "uk",
    name: "United Kingdom",
    emoji: "🇬🇧",
    tagline: "World-class education, rich culture",
    universities: "130+",
    tuition: "£10,000–£38,000/yr",
    duration: "1yr PG · 3yr UG",
    color: "from-blue-600 to-blue-800",
    highlights: ["Top QS universities", "Post-Study Visa (2yr)", "Diverse culture"],
  },
  {
    slug: "australia",
    name: "Australia",
    emoji: "🇦🇺",
    tagline: "Quality education & work rights",
    universities: "40+",
    tuition: "AUD 20,000–45,000/yr",
    duration: "2yr PG · 3yr UG",
    color: "from-yellow-500 to-orange-600",
    highlights: ["485 Graduate Visa", "High quality of life", "Strong job market"],
  },
  {
    slug: "usa",
    name: "United States",
    emoji: "🇺🇸",
    tagline: "Innovation & research hub",
    universities: "200+",
    tuition: "USD 20,000–60,000/yr",
    duration: "2yr PG · 4yr UG",
    color: "from-red-500 to-red-700",
    highlights: ["OPT/STEM extension", "Research opportunities", "Global brand value"],
  },
  {
    slug: "canada",
    name: "Canada",
    emoji: "🇨🇦",
    tagline: "Affordable + PR pathway",
    universities: "100+",
    tuition: "CAD 15,000–35,000/yr",
    duration: "2yr PG · 4yr UG",
    color: "from-red-600 to-rose-700",
    highlights: ["PGWP 3yr work permit", "PR via Express Entry", "Multicultural"],
  },
  {
    slug: "germany",
    name: "Germany",
    emoji: "🇩🇪",
    tagline: "Low cost, high value",
    universities: "50+",
    tuition: "€500–€5,000/yr",
    duration: "1.5yr PG · 3yr UG",
    color: "from-slate-700 to-slate-900",
    highlights: ["Near-free public unis", "Engineering excellence", "18-month job seeker visa"],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    emoji: "🇳🇿",
    tagline: "Safe, scenic, student-friendly",
    universities: "8",
    tuition: "NZD 22,000–35,000/yr",
    duration: "1yr PG · 3yr UG",
    color: "from-teal-500 to-teal-700",
    highlights: ["Post-study work visa", "Safe environment", "English speaking"],
  },
  {
    slug: "ireland",
    name: "Ireland",
    emoji: "🇮🇪",
    tagline: "Europe gateway, English-speaking",
    universities: "7",
    tuition: "€10,000–€25,000/yr",
    duration: "1yr PG · 4yr UG",
    color: "from-green-500 to-green-700",
    highlights: ["EU access", "Tech hub (FAANG offices)", "Post-study visa 2yr"],
  },
  {
    slug: "japan",
    name: "Japan",
    emoji: "🇯🇵",
    tagline: "Innovation, culture & safety",
    universities: "30+",
    tuition: "¥535,000–¥2M/yr",
    duration: "2yr PG · 4yr UG",
    color: "from-pink-500 to-rose-600",
    highlights: ["MEXT scholarship", "Tech innovation", "Part-time work allowed"],
  },
];

export default function StudyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-[72px]">

      {/* Page Hero Header */}
      <div className="bg-gradient-to-br from-[#EFF4FF] to-white border-b border-slate-200 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs text-[#0070F0] mb-3 font-semibold uppercase tracking-widest">Home › Study Destinations</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">
            Study <span className="text-[#0070F0]">Destinations</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Choose from 8 top countries. We match you with the right university based on your profile, budget, and goals.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">

        {/* Country Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {DESTINATIONS.map(d => (
            <Link
              key={d.slug}
              href={`/study/${d.slug}`}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Gradient Header */}
              <div className={`h-28 bg-gradient-to-br ${d.color} flex flex-col items-center justify-center relative`}>
                <span className="text-5xl mb-1">{d.emoji}</span>
                <span className="text-white text-xs font-medium opacity-80">{d.tagline}</span>
              </div>

              <div className="p-4">
                <h2 className="font-bold text-slate-900 mb-3 group-hover:text-[#0070F0] transition-colors">{d.name}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <GraduationCap className="w-3 h-3 text-[#0070F0]" />
                    {d.universities} Partner Universities
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Banknote className="w-3 h-3 text-[#0070F0]" />
                    {d.tuition}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3 text-[#0070F0]" />
                    {d.duration}
                  </div>
                </div>
                <div className="space-y-1">
                  {d.highlights.map(h => (
                    <div key={h} className="flex items-center gap-1 text-xs text-slate-600">
                      <span className="w-1 h-1 rounded-full bg-[#0070F0] flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0070F0] group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#0070F0] to-blue-700 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Not sure where to go?</h2>
          <p className="text-blue-100 mb-6">Take our 2-minute assessment and we&apos;ll recommend the best country for your profile.</p>
          <Link href="/appointment" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0070F0] font-bold rounded-xl hover:bg-blue-50 transition">
            Get Personalized Recommendation
          </Link>
        </div>
      </div>
    </div>
  );
}
