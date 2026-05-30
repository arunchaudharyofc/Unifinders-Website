"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Globe, ChevronDown, Repeat, Box, Bell, LogOut, LayoutDashboard 
} from "lucide-react";
import { CountryGuideDropdown, NotificationDropdown, MyAccountDropdown, AppointmentModal } from "@/components/dashboard/Popups";

export default function Header({ 
  fullName, 
  initials, 
  email,
  userId,
}: { 
  fullName: string; 
  initials: string; 
  email: string;
  userId?: string;
}) {
  const pathname = usePathname();

  const titleMap: [string, string][] = [
    ["/dashboard/programs", "Explore Programs"],
    ["/dashboard/universities", "Find University"],
    ["/dashboard/events", "Events"],
    ["/dashboard/reports", "Reports"],
    ["/dashboard/profile", "My Profile"],
    ["/dashboard/applications", "My Applications"],
    ["/dashboard/bookmarks", "My Bookmarks"],
    ["/dashboard/chats", "My Chats"],
    ["/dashboard/settings", "Settings"],
    ["/dashboard/help-center", "Help Center"],
    ["/dashboard/country-guide", "Country Guide"],
    ["/dashboard/compare", "Compare Programs"],
  ];

  const currentTitle = titleMap.find(([path]) => pathname.startsWith(path))?.[1] || "Dashboard";

  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <>
      <header className="h-20 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-30 w-full">
        
        {/* Title */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#1E293B]" suppressHydrationWarning>{currentTitle}</h1>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          
          {/* Country Guide Dropdown */}
          <CountryGuideDropdown>
            <button className="hidden md:flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
              <Globe className="w-4 h-4 text-slate-400" />
              Country Guide
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </CountryGuideDropdown>

          {/* Book Appointment Button */}
          <button onClick={() => setAppointmentOpen(true)} className="hidden sm:flex items-center gap-2 bg-[#0070F0] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm">
            <CalendarIcon className="w-4 h-4" />
            Book an Appointment
          </button>

          {/* Action Icons */}
          <div className="flex items-center gap-2 border-l border-r border-slate-200 px-4 ml-2 mr-2 h-8">
            <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
              <Repeat className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors relative">
              <Box className="w-4 h-4" />
            </button>
            <NotificationDropdown>
              <button className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors relative cursor-pointer">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </NotificationDropdown>
          </div>

          {/* Profile Dropdown Trigger */}
          <MyAccountDropdown fullName={fullName} initials={initials} email={email} userId={userId}>
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-[#0070F0] flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {initials}
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
          </MyAccountDropdown>

        </div>
      </header>
      
      <AppointmentModal open={appointmentOpen} onClose={() => setAppointmentOpen(false)} />
    </>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
      <path d="M12 14h.01"/><path d="M12 18h.01"/><path d="M16 14h.01"/><path d="M16 18h.01"/><path d="M8 14h.01"/><path d="M8 18h.01"/>
    </svg>
  );
}
