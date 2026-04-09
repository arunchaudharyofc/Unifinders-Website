import Link from "next/link";
import { Home, Search, BookOpen, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        
        {/* 404 illustration */}
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[160px] font-extrabold text-slate-900/5 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-2xl bg-[#0070F0]/10 flex items-center justify-center">
              <Search className="w-12 h-12 text-[#0070F0]" />
            </div>
          </div>
        </div>

        <p className="text-[#0070F0] font-bold uppercase tracking-widest text-xs mb-3">Page Not Found</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
          Oops! We couldn&apos;t find this page.
        </h1>
        <p className="text-slate-500 leading-relaxed mb-10">
          The page you&apos;re looking for may have been moved, renamed, or is still being built.
          Don&apos;t worry — our counselors are ready to help you find what you need.
        </p>

        {/* Quick links */}
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

        <Link href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0070F0] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
