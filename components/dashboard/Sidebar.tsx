"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Compass, Building, Calendar,
  BarChart2, User, FileText, Bookmark, MessageSquare,
  ShieldAlert, BookOpen, Presentation, Users, ChevronRight, HelpCircle
} from "lucide-react";

const HOME_ITEMS = [
  { label: "Dashboard",       href: "/dashboard",              icon: LayoutDashboard },
  { label: "Explore Programs",href: "/dashboard/programs",     icon: Compass },
  { label: "Find University", href: "/dashboard/universities", icon: Building },
  { label: "Events",          href: "/dashboard/events",       icon: Calendar },
  { label: "Reports",         href: "/dashboard/reports",      icon: BarChart2 },
];

const ACCOUNT_ITEMS = [
  { label: "My Profile",      href: "/dashboard/profile",      icon: User },
  { label: "My Applications", href: "/dashboard/applications", icon: FileText },
  { label: "My Bookmarks",    href: "/dashboard/bookmarks",    icon: Bookmark },
  { label: "My Chats",        href: "/dashboard/chats",        icon: MessageSquare },
];

const ADMIN_ITEMS = [
  { label: "Appointments",  href: "/dashboard/admin/appointments",  icon: Calendar },
  { label: "Students",      href: "/dashboard/admin/students",      icon: Users },
  { label: "Blog CMS",      href: "/dashboard/admin/blog",          icon: BookOpen },
  { label: "Events CMS",    href: "/dashboard/admin/events",        icon: Presentation },
  { label: "Scholarships",  href: "/dashboard/admin/scholarships",  icon: Bookmark },
  { label: "Courses",       href: "/dashboard/admin/courses",       icon: Compass },
  { label: "Universities",  href: "/dashboard/admin/universities",  icon: Building },
];

export default function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const renderLinks = (items: typeof HOME_ITEMS) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = item.href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(item.href);
        return (
          <li key={item.href} className="relative" suppressHydrationWarning>
            {isActive && <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-[3px] h-8 bg-[#0070F0] rounded-l-full" />}
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-[#F0F6FE] text-[#0070F0]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              suppressHydrationWarning
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#0070F0]" : "text-slate-500"}`} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-100 fixed h-full z-40">
      {/* Logo */}
      <div className="h-20 flex items-center px-6">
        <Link href="/">
          <Image
            src="/images/logo.png" alt="Unifinders" width={140} height={36}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        
        <div>
          <p className="px-4 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Home</p>
          {renderLinks(HOME_ITEMS)}
        </div>

        <div>
          <p className="px-4 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Account</p>
          {renderLinks(ACCOUNT_ITEMS)}
        </div>

        {isAdmin && (
          <div>
            <div className="px-4 flex items-center gap-2 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin</p>
            </div>
            {renderLinks(ADMIN_ITEMS)}

            {/* Staff Portal Link */}
            <div className="mt-3 px-2">
              <Link
                href="/staff"
                className="flex items-center justify-between bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors p-3 rounded-xl group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Staff Portal</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* Download App Widget */}
        <div className="mt-4 bg-[#F8FAFC] rounded-xl p-4 border border-slate-100 relative">
          <div className="flex gap-3">
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800 leading-tight">Download App</p>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">Download our app to easily access your profile.</p>
              
              <div className="mt-3 space-y-1.5">
                <Link href="#" className="block">
                  <Image src="/images/dashboard/app_store_badge_1777829541453.png" alt="App Store" width={80} height={24} className="h-6 w-auto rounded" />
                </Link>
                <Link href="#" className="block">
                  <Image src="/images/dashboard/google_play_badge_1777829556186.png" alt="Google Play" width={80} height={24} className="h-6 w-auto rounded" />
                </Link>
              </div>
            </div>
            <div className="w-14 h-14 bg-white rounded-lg p-1 border border-slate-200 shadow-sm flex-shrink-0">
              <Image src="/images/dashboard/qr_code_1777829526232.png" alt="QR Code" width={48} height={48} className="w-full h-full" />
            </div>
          </div>
        </div>

      </nav>

      {/* Help Center */}
      <div className="p-4 pt-2">
        <Link href="/dashboard/help-center" className="flex items-center justify-between bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors p-3 rounded-xl group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0070F0] flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Help Center</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
