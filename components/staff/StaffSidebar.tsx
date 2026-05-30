"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Clock, CalendarDays, FileText,
  CheckSquare, ClipboardList, Users, Settings,
  ShieldAlert, Calendar, BarChart2, ChevronRight,
  HelpCircle, LogOut, X
} from "lucide-react";
import { useEffect } from "react";

const MAIN_ITEMS = [
  { label: "Dashboard",    href: "/staff",              icon: LayoutDashboard },
  { label: "Attendance",   href: "/staff/attendance",    icon: Clock },
  { label: "Leave",        href: "/staff/leave",         icon: FileText },
  { label: "Calendar",     href: "/staff/calendar",      icon: CalendarDays },
  { label: "My Tasks",     href: "/staff/tasks",         icon: CheckSquare },
  { label: "Daily Log",    href: "/staff/daily-log",     icon: ClipboardList },
];

const ADMIN_ITEMS = [
  { label: "Staff Overview",   href: "/staff/admin/staff",            icon: Users },
  { label: "Attendance Sheet", href: "/staff/admin/attendance",       icon: Calendar },
  { label: "Leave Approvals",  href: "/staff/admin/leaves",           icon: FileText },
  { label: "Holidays",         href: "/staff/admin/holidays",         icon: CalendarDays },
  { label: "Task Manager",     href: "/staff/admin/tasks",            icon: CheckSquare },
  { label: "Reports",          href: "/staff/admin/reports",          icon: BarChart2 },
];

interface StaffSidebarProps {
  isAdmin: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function StaffSidebar({ isAdmin, mobileOpen = false, onClose }: StaffSidebarProps) {
  const pathname = usePathname();

  // Lock body scroll on mobile when sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

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
              onClick={onClose}
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo + close button on mobile */}
      <div className="h-20 flex items-center px-6 gap-3 justify-between">
        <Link href="/staff" className="flex items-center gap-3" onClick={onClose}>
          <Image
            src="/images/logo.png" alt="Unifinders" width={140} height={36}
            className="object-contain"
          />
        </Link>
        {/* Mobile close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 transition text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Divider with portal label */}
      <div className="mx-6 mb-4 mt-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
          Staff Portal
        </p>
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
          onClick={onClose}
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
    </div>
  );

  return (
    <>
      {/* Desktop sidebar (always visible on md+) */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-100 fixed h-full z-40">
        <SidebarContent />
      </aside>

      {/* Mobile overlay + drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />
          {/* Drawer */}
          <aside className="fixed left-0 top-0 h-full w-72 max-w-[85vw] z-50 bg-white shadow-2xl md:hidden flex flex-col overflow-hidden">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
