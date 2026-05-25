"use client";

import { useState, useEffect } from "react";
import {
  Clock, LogIn, LogOut, CalendarDays, CheckCircle2,
  AlertTriangle, TrendingUp, Timer, ChevronRight,
  ArrowRight, Zap, Calendar, FileText, CheckSquare
} from "lucide-react";
import Link from "next/link";

// ── Types ────────────────────────────────────────────────────────────────────
type AttendanceToday = {
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  workHours: number | null;
};

type MonthStats = {
  present: number;
  late: number;
  absent: number;
  leaves: number;
  totalWorkDays: number;
  avgHours: number;
  streak: number;
};

// ── Check-In / Check-Out Button ──────────────────────────────────────────────
function CheckInOutCard() {
  const [todayData, setTodayData] = useState<AttendanceToday | null>(null);
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Fetch today's attendance
  useEffect(() => {
    fetch("/api/staff/attendance/today")
      .then((r) => r.json())
      .then((d) => { if (d.success) setTodayData(d.data); })
      .catch(() => {});
  }, []);

  // Elapsed timer
  useEffect(() => {
    if (!todayData?.checkIn || todayData.checkOut) return;
    const update = () => {
      const diff = Date.now() - new Date(todayData.checkIn!).getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setElapsed(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [todayData]);

  const hasCheckedIn = !!todayData?.checkIn;
  const hasCheckedOut = !!todayData?.checkOut;
  const isWorking = hasCheckedIn && !hasCheckedOut;

  const handleAction = async () => {
    setLoading(true);
    try {
      const endpoint = hasCheckedIn
        ? "/api/staff/attendance/check-out"
        : "/api/staff/attendance/check-in";
      const res = await fetch(endpoint, { method: "POST" });
      const data = await res.json();
      if (data.success) setTodayData(data.data);
    } catch {
      // handle error
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      {/* Live time */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Current Time</p>
          <p className="text-3xl font-bold text-slate-900 tabular-nums mt-1">
            {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </p>
          <p className="text-sm text-slate-500 mt-0.5">
            {currentTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
          isWorking ? "bg-emerald-50" : hasCheckedOut ? "bg-slate-100" : "bg-blue-50"
        }`}>
          {isWorking ? (
            <Timer className="w-7 h-7 text-emerald-600 animate-pulse" />
          ) : hasCheckedOut ? (
            <CheckCircle2 className="w-7 h-7 text-slate-400" />
          ) : (
            <Clock className="w-7 h-7 text-blue-600" />
          )}
        </div>
      </div>

      {/* Elapsed / Work Hours */}
      {isWorking && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
          <p className="text-xs text-emerald-600 font-medium mb-1">Working Duration</p>
          <p className="text-2xl font-bold text-emerald-700 tabular-nums">{elapsed}</p>
        </div>
      )}
      {hasCheckedOut && todayData?.workHours && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
          <p className="text-xs text-slate-500 font-medium mb-1">Total Hours Today</p>
          <p className="text-2xl font-bold text-slate-700">{todayData.workHours.toFixed(1)} hrs</p>
        </div>
      )}

      {/* Check-in/out times */}
      <div className="flex gap-4 mb-5">
        <div className="flex-1 bg-slate-50 rounded-xl p-3 text-center">
          <LogIn className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
          <p className="text-[10px] text-slate-400 font-medium">CHECK IN</p>
          <p className="text-sm font-bold text-slate-800">
            {todayData?.checkIn
              ? new Date(todayData.checkIn).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
              : "--:--"}
          </p>
        </div>
        <div className="flex-1 bg-slate-50 rounded-xl p-3 text-center">
          <LogOut className="w-4 h-4 text-red-400 mx-auto mb-1" />
          <p className="text-[10px] text-slate-400 font-medium">CHECK OUT</p>
          <p className="text-sm font-bold text-slate-800">
            {todayData?.checkOut
              ? new Date(todayData.checkOut).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
              : "--:--"}
          </p>
        </div>
      </div>

      {/* Action Button */}
      {!hasCheckedOut && (
        <button
          onClick={handleAction}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            isWorking
              ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200"
              : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
          } disabled:opacity-50`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : isWorking ? (
            <><LogOut className="w-4 h-4" /> Check Out</>
          ) : (
            <><LogIn className="w-4 h-4" /> Check In</>
          )}
        </button>
      )}
      {hasCheckedOut && (
        <div className="w-full py-3 rounded-xl bg-slate-100 text-slate-500 font-medium text-sm text-center">
          ✅ Day completed — great work!
        </div>
      )}
    </div>
  );
}

// ── Monthly Stats Cards ──────────────────────────────────────────────────────
function MonthStatsGrid() {
  const [stats, setStats] = useState<MonthStats | null>(null);

  useEffect(() => {
    fetch("/api/staff/attendance?summary=true")
      .then((r) => r.json())
      .then((d) => { if (d.success) setStats(d.data); })
      .catch(() => {});
  }, []);

  const cards = [
    { label: "Present", value: stats?.present ?? 0, icon: CheckCircle2, color: "emerald", suffix: "days" },
    { label: "Late", value: stats?.late ?? 0, icon: AlertTriangle, color: "amber", suffix: "days" },
    { label: "Leaves", value: stats?.leaves ?? 0, icon: CalendarDays, color: "blue", suffix: "days" },
    { label: "Avg Hours", value: stats?.avgHours?.toFixed(1) ?? "0", icon: TrendingUp, color: "purple", suffix: "hrs/day" },
  ];

  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-700", icon: "text-emerald-500" },
    amber: { bg: "bg-amber-50", text: "text-amber-700", icon: "text-amber-500" },
    blue: { bg: "bg-blue-50", text: "text-blue-700", icon: "text-blue-500" },
    purple: { bg: "bg-purple-50", text: "text-purple-700", icon: "text-purple-500" },
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const clr = colorMap[c.color];
        return (
          <div key={c.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg ${clr.bg} flex items-center justify-center`}>
                <c.icon className={`w-4 h-4 ${clr.icon}`} />
              </div>
            </div>
            <p className={`text-2xl font-bold ${clr.text}`}>{c.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{c.label} · {c.suffix}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── Quick Actions ────────────────────────────────────────────────────────────
function QuickActions() {
  const actions = [
    { label: "Apply Leave", href: "/staff/leave/apply", icon: Calendar, color: "bg-blue-500" },
    { label: "View Calendar", href: "/staff/calendar", icon: CalendarDays, color: "bg-purple-500" },
    { label: "My Tasks", href: "/staff/tasks", icon: CheckSquare, color: "bg-amber-500" },
    { label: "Daily Log", href: "/staff/daily-log", icon: FileText, color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all group"
          >
            <div className={`w-9 h-9 rounded-lg ${a.color} flex items-center justify-center`}>
              <a.icon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{a.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Upcoming Holidays ────────────────────────────────────────────────────────
function UpcomingHolidays() {
  const [holidays, setHolidays] = useState<{ name: string; date: string; type: string }[]>([]);

  useEffect(() => {
    fetch("/api/staff/calendar?upcoming=true")
      .then((r) => r.json())
      .then((d) => { if (d.success && d.data?.holidays) setHolidays(d.data.holidays.slice(0, 4)); })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Upcoming Holidays</h3>
        <Link href="/staff/calendar" className="text-xs text-emerald-600 font-medium hover:underline flex items-center gap-1">
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      {holidays.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-4">No upcoming holidays</p>
      ) : (
        <div className="space-y-3">
          {holidays.map((h, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-red-500 uppercase">
                  {new Date(h.date).toLocaleDateString("en-US", { month: "short" })}
                </span>
                <span className="text-sm font-bold text-red-700 leading-none">
                  {new Date(h.date).getDate()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{h.name}</p>
                <p className="text-[10px] text-slate-400">
                  {new Date(h.date).toLocaleDateString("en-US", { weekday: "long" })} · {h.type}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Activity / Streak ────────────────────────────────────────────────────────
function StreakCard() {
  return (
    <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Zap className="w-5 h-5 text-yellow-300" />
        </div>
        <div>
          <p className="text-xs text-emerald-200 font-medium">On-Time Streak</p>
          <p className="text-2xl font-bold">🔥 Keep it up!</p>
        </div>
      </div>
      <p className="text-xs text-emerald-100">
        Arrive on time consistently to build your streak and earn recognition.
      </p>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function StaffDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Good {getGreeting()}! 👋</h1>
        <p className="text-sm text-slate-500 mt-1">Here&apos;s your attendance overview for today.</p>
      </div>

      {/* Stats Row */}
      <MonthStatsGrid />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Check-in */}
        <div className="lg:col-span-1 space-y-6">
          <CheckInOutCard />
          <StreakCard />
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <QuickActions />
          <UpcomingHolidays />
        </div>
      </div>
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Morning";
  if (h < 17) return "Afternoon";
  return "Evening";
}
