"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function StaffHeader({
  userName,
  userAvatar,
  userEmail,
  onMenuToggle,
}: {
  userName: string;
  userAvatar: string | null;
  userEmail: string;
  onMenuToggle?: () => void;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  useClickOutside(profileRef, () => setProfileOpen(false));
  const pathname = usePathname();

  // Title map — covers both staff portal and admin staff pages
  const titleMap: [string, string][] = [
    // Staff pages
    ["/staff/attendance", "Attendance"],
    ["/staff/leave", "Leave Management"],
    ["/staff/calendar", "Calendar & Holidays"],
    ["/staff/tasks", "My Tasks"],
    ["/staff/daily-log", "Daily Log"],
    // Admin staff pages
    ["/dashboard/admin/staff/attendance", "Attendance Sheet & Corrections"],
    ["/dashboard/admin/staff/leaves", "Leave Approvals"],
    ["/dashboard/admin/staff/holidays", "Holiday Calendar Manager"],
    ["/dashboard/admin/staff/tasks", "Task Manager"],
    ["/dashboard/admin/staff/reports", "Attendance Reports"],
    ["/dashboard/admin/staff", "Staff Overview"],
    // Fallback
    ["/staff", "Staff Dashboard"],
  ];
  
  const currentTitle = titleMap.find(
    ([path]) => pathname === path || pathname.startsWith(path + "/")
  )?.[1] || "Staff Dashboard";

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-20 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-30 w-full">
      {/* Title & Mobile Toggle */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl hover:bg-slate-200 transition text-slate-600 active:scale-95"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[#1E293B] hidden sm:block" suppressHydrationWarning>
          {currentTitle}
        </h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Date/Time — hidden on small screens */}
        <div className="hidden lg:block">
          <p className="text-sm font-medium text-slate-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-3 md:gap-4 md:border-l md:border-slate-200 md:pl-6">
          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-slate-200 transition text-slate-500">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-slate-50 rounded-full" />
          </button>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 md:gap-3 p-1.5 rounded-full hover:bg-slate-200 transition group"
            >
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover shadow-sm"
                  unoptimized
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#10B981] shadow-sm text-white flex items-center justify-center text-sm font-bold">
                  {initials}
                </div>
              )}
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute top-full mt-3 right-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <p className="text-sm font-bold text-slate-900">{userName}</p>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{userEmail}</p>
                </div>
                <div className="py-2">
                  <Link
                    href="/staff"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Dashboard
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Settings
                  </Link>
                </div>
                <div className="border-t border-slate-100 py-2">
                  <Link
                    href="/auth/logout"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
