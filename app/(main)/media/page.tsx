import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Newspaper, Tv, Radio, Globe } from "lucide-react";
import PageHero from "@/components/shared/PageHero";

export const metadata: Metadata = {
  title: "In Media — Unifinders Education Pvt. Ltd.",
  description: "Unifinders in the news — press coverage, media mentions, and press release archives.",
};

const MEDIA_FEATURES = [
  {
    outlet: "The Kathmandu Post",
    type: "Newspaper",
    date: "March 15, 2024",
    headline: "Unifinders Helps Over 1,000 Nepali Students Secure International University Admissions",
    desc: "Unifinders Education Pvt. Ltd. has crossed a significant milestone, having guided over 1,000 Nepali students to secure admissions at universities in Australia, UK, Canada, and the USA.",
    link: "#",
    logo: "📰",
  },
  {
    outlet: "Kantipur TV",
    type: "Television",
    date: "February 8, 2024",
    headline: "Study Abroad Made Easy: How Unifinders is Changing the Education Landscape in Nepal",
    desc: "A feature segment on Kantipur TV explored how Unifinders is democratizing access to international education through free counseling and scholarship matching services.",
    link: "#",
    logo: "📺",
  },
  {
    outlet: "Nagarik News",
    type: "Online Media",
    date: "January 22, 2024",
    headline: "नेपाली विद्यार्थीहरूका लागि विदेशी विश्वविद्यालयमा पहुँच सहज बनाउँदै Unifinders",
    desc: "Nagarik News featured Unifinders' work in connecting Nepali students with prestigious international universities and securing scholarships worth crores of rupees.",
    link: "#",
    logo: "🌐",
  },
  {
    outlet: "My Republica",
    type: "English Daily",
    date: "December 5, 2023",
    headline: "Unifinders Education Platform Launches Comprehensive Scholarship Database for Nepali Students",
    desc: "My Republica reported on Unifinders' launch of a comprehensive scholarship database covering 120+ partner universities across 18 countries.",
    link: "#",
    logo: "📰",
  },
  {
    outlet: "Business 360",
    type: "Business Magazine",
    date: "November 12, 2023",
    headline: "EdTech Startup Unifinders Bridges the Gap Between Nepali Students and Global Universities",
    desc: "Business 360 magazine profiled Unifinders as one of Nepal's most innovative EdTech companies transforming how students access international education.",
    link: "#",
    logo: "📊",
  },
  {
    outlet: "Radio Namaskar",
    type: "Radio",
    date: "October 30, 2023",
    headline: "Expert Panel: Navigating Study Abroad Applications with Unifinders Counselors",
    desc: "Unifinders' head counselors joined a Radio Namaskar expert panel discussing best practices for study abroad applications, IELTS preparation, and scholarship hunting.",
    link: "#",
    logo: "📻",
  },
];

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        breadcrumb={[{ label: "In Media" }]}
        title="Unifinders in the"
        titleHighlight="Media"
        subtitle="Press coverage, news features, and media mentions about Unifinders Education."
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6 mb-16">
          {MEDIA_FEATURES.map(m => (
            <div key={m.headline} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0">{m.logo}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span className="font-extrabold text-slate-900">{m.outlet}</span>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{m.type}</span>
                    <span className="text-xs text-slate-400">{m.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2 text-sm">{m.headline}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Kit */}
        <div className="bg-slate-50 rounded-3xl p-10 text-center border border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-900 mb-3">Press & Media Enquiries</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
            For interviews, press releases, or media kit requests, please contact our communications team.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href="mailto:media@myunifinders.com" className="px-6 py-3 bg-[#1D4ED8] text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all">
              Contact Press Team
            </a>
            <a href="mailto:media@myunifinders.com?subject=Press Kit Request"
              className="px-6 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] font-bold rounded-xl text-sm hover:bg-blue-50 transition-all">
              Download Press Kit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
