"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Clock, CalendarDays, FileText,
  CheckSquare, ClipboardList, Users, Settings,
  ShieldAlert, Calendar, BarChart2, ChevronRight,
  HelpCircle, LogOut
} from "lucide-react";

const MAIN_ITEMS = [
  { label: "Dashboard",    href: "/staff",              icon: LayoutDashboard },
  { label: "Attendance",   href: "/staff/attendance",    icon: Clock },
  { label: "Leave",        href: "/staff/leave",         icon: FileText },
  { label: "Calendar",     href: "/staff/calendar",      icon: CalendarDays },
  { label: "My Tasks",     href: "/staff/tasks",         icon: CheckSquare },
  { label: "Daily Log",    href: "/staff/daily-log",     icon: ClipboardList },
];

const ADMIN_ITEMS = [
  { label: "Staff Overview",   href: "/dashboard/admin/staff",            icon: Users },
  { label: "Attendance Sheet", href: "/dashboard/admin/staff/attendance", icon: Calendar },
  { label: "Leave Approvals",  href: "/dashboard/admin/staff/leaves",     icon: FileText },
  { label: "Holidays",         href: "/dashboard/admin/staff/holidays",   icon: CalendarDays },
  { label: "Task Manager",     href: "/dashboard/admin/staff/tasks",      icon: CheckSquare },
  { label: "Reports",          href: "/dashboard/admin/staff/reports",    icon: BarChart2 },
];

export default function StaffSidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const renderLinks = (items: typeof MAIN_ITEMS) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive =
          item.href === "/staff"
            ? pathname === "/staff"
            : pathname.startsWith(item.href);
        return (
          <li key={item.href} className="relative">
            {isActive && (
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 w-[3px] h-8 bg-[#10B981] rounded-l-full" />
            )}
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon
                className={`w-4 h-4 flex-shrink-0 ${
                  isActive ? "text-emerald-600" : "text-slate-500"
                }`}
              />
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
      <div className="h-20 flex items-center px-6 gap-3">
        <Link href="/staff" className="flex items-center gap-3">
          <Image
            src="/images/logo.png" alt="Unifinders" width={140} height={36}
            className="object-contain"
          />
        </Link>
      </div>

      {/* Divider with portal label */}
      <div className="mx-4 mb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-emerald-700 tracking-wide uppercase">Staff Portal</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar flex flex-col gap-6">
        <div>
          <p className="px-4 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Menu</p>
          {renderLinks(MAIN_ITEMS)}
        </div>

        {isAdmin && (
          <div>
            <div className="px-4 flex items-center gap-2 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Admin</p>
            </div>
            {renderLinks(ADMIN_ITEMS)}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 pt-2 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center justify-between bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors p-3 rounded-xl group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Student Portal</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link
          href="/auth/logout"
          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
