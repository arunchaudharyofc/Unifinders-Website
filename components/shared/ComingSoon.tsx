import Link from "next/link";
import { Home, Search, BookOpen, ArrowLeft, Clock } from "lucide-react";

interface ComingSoonPageProps {
  title?: string;
  description?: string;
  backHref?: string;
}

export default function ComingSoonPage({ 
  title = "Coming Soon", 
  description = "We're building a dedicated space for students to manage applications, track progress, and connect with counselors.", 
  backHref = "/" 
}: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        
        {/* Animated clock visual */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[160px] font-extrabold text-slate-900/5 leading-none select-none">
            SOON
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-[#0070F0]/10 flex items-center justify-center animate-pulse">
              <Clock className="w-12 h-12 text-[#0070F0]" />
            </div>
          </div>
        </div>

        <p className="text-[#0070F0] font-bold uppercase tracking-widest text-xs mb-3">Feature in Progress</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          {title}
        </h1>
        <p className="text-slate-500 leading-relaxed mb-10">
          {description}<br/>Don't worry — our counselors are ready to help you manually in the meantime.
        </p>

        {/* Quick links identical to 404 page layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          <Link href="/"
            className="flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#0070F0]/40 hover:shadow-md transition-all group text-sm font-semibold text-slate-700 group-hover:text-[#0070F0]">
            <Home className="w-4 h-4 text-[#0070F0]" />
            Home
          </Link>
          <Link href="/courses"
            className="flex items-center justify-center gap-2 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-[#0070F0]/40 hover:shadow-md transition-all text-sm font-semibold text-slate-700">
            <BookOpen className="w-4 h-4 text-[#0070F0]" />
            Our Courses
          </Link>
          <Link href="/appointment"
            className="flex items-center justify-center gap-2 p-4 bg-[#0070F0] text-white rounded-2xl shadow-sm hover:bg-blue-700 transition-all text-sm font-bold">
            Book Consult
          </Link>
        </div>

        <Link href={backHref}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0070F0] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Go back previous page
        </Link>
      </div>
    </div>
  );
}
