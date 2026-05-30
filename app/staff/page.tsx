"use client";

import { useState, useEffect } from "react";
import {
  Clock, LogIn, LogOut, CalendarDays, CheckCircle2,
  AlertTriangle, TrendingUp, ArrowRight, Calendar,
  FileText, CheckSquare, Zap, BarChart2
} from "lucide-react";
import Link from "next/link";

type AttendanceToday = { checkIn: string | null; checkOut: string | null; status: string; workHours: number | null };
type MonthStats = { present: number; late: number; absent: number; leaves: number; totalWorkDays: number; avgHours: number; streak: number };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function StaffDashboardPage() {
  const [todayData, setTodayData] = useState<AttendanceToday | null>(null);
  const [stats, setStats] = useState<MonthStats | null>(null);
  const [holidays, setHolidays] = useState<{ name: string; date: string; type: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState("");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    fetch("/api/staff/attendance/today").then(r => r.json()).then(d => { if (d.success) setTodayData(d.data); }).catch(() => {});
    fetch("/api/staff/attendance?summary=true").then(r => r.json()).then(d => { if (d.success) setStats(d.data); }).catch(() => {});
    fetch("/api/staff/calendar?upcoming=true").then(r => r.json()).then(d => { if (d.success && d.data?.holidays) setHolidays(d.data.holidays.slice(0, 3)); }).catch(() => {});
  }, []);

  const hasCheckedIn = !!todayData?.checkIn;
  const hasCheckedOut = !!todayData?.checkOut;
  const isWorking = hasCheckedIn && !hasCheckedOut;

  useEffect(() => {
    if (!hasCheckedIn || hasCheckedOut) {
      if (hasCheckedOut && todayData?.workHours) setPct(Math.min(100, Math.round((todayData.workHours / 8) * 100)));
      return;
    }
    const update = () => {
      const diff = Date.now() - new Date(todayData!.checkIn!).getTime();
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setElapsed(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
      setPct(Math.min(100, Math.round((diff / 3600000 / 8) * 100)));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [todayData, hasCheckedIn, hasCheckedOut]);

  const handleAction = async () => {
    setLoading(true);
    try {
      const res = await fetch(hasCheckedIn ? "/api/staff/attendance/check-out" : "/api/staff/attendance/check-in", { method: "POST" });
      const d = await res.json();
      if (d.success) setTodayData(d.data);
    } catch { }
    setLoading(false);
  };

  const QUICK_ACTIONS = [
    { label: "Apply Leave", icon: Calendar, href: "/staff/leave", bg: "bg-violet-600 hover:bg-violet-700" },
    { label: "View Calendar", icon: CalendarDays, href: "/staff/calendar", bg: "bg-blue-600 hover:bg-blue-700" },
    { label: "My Tasks", icon: CheckSquare, href: "/staff/tasks", bg: "bg-emerald-600 hover:bg-emerald-700" },
    { label: "Daily Log", icon: FileText, href: "/staff/daily-log", bg: "bg-amber-600 hover:bg-amber-700" },
  ];

  return (
    <div className="max-w-[1400px] mx-auto pb-12 space-y-6">

      {/* ── Hero Banner ── */}
      <div className="bg-[#0B1A2D] rounded-2xl shadow-lg overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-white/10">
          <div className="h-full bg-blue-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Timer circle */}
            <div className="shrink-0">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="10"
                    strokeDasharray={`${264 * pct / 100} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white font-black text-base leading-none">
                    {isWorking ? elapsed.split(":").slice(0, 2).join(":") : hasCheckedOut ? (todayData?.workHours?.toFixed(1) + "h") : "--:--"}
                  </span>
                  <span className="text-slate-400 text-[10px] font-semibold mt-0.5">
                    {isWorking ? "Active" : hasCheckedOut ? "Done" : "Not In"}
                  </span>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <p className="text-slate-400 text-sm font-medium mb-1">
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h1 className="text-white text-2xl md:text-3xl font-black mb-1">{getGreeting()}! 👋</h1>
              <p className="text-slate-300 text-sm font-medium mb-5">Track attendance, manage leaves, and log your daily work — all in one place.</p>

              <div className="flex flex-wrap items-center gap-3">
                {!hasCheckedOut ? (
                  <button onClick={handleAction} disabled={loading}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition disabled:opacity-60 ${isWorking ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                  >
                    {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : isWorking ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                    {isWorking ? "Clock Out" : "Clock In Now"}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800 text-emerald-200 text-sm font-bold border border-emerald-700">
                    <CheckCircle2 className="w-4 h-4" /> Shift Complete
                  </div>
                )}
                <Link href="/staff/attendance" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition border border-white/15">
                  View Attendance
                </Link>
              </div>
            </div>

            {/* Month stat pills */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {[
                { label: "Present", value: stats?.present ?? "—", color: "text-emerald-400" },
                { label: "Late", value: stats?.late ?? "—", color: "text-amber-400" },
                { label: "Absent", value: stats?.absent ?? "—", color: "text-red-400" },
                { label: "Leaves", value: stats?.leaves ?? "—", color: "text-blue-300" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center">
                  <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-slate-300 text-xs font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map((a) => (
            <Link key={a.label} href={a.href}
              className={`group flex items-center gap-3 px-5 py-4 ${a.bg} rounded-2xl text-white font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
            >
              <a.icon className="w-5 h-5 opacity-80" />
              {a.label}
              <ArrowRight className="ml-auto w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Stats + Holidays ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Stats */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-800">This Month's Overview</h3>
            </div>
            <Link href="/staff/attendance" className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline">
              Full Report <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: "Days Present", value: stats?.present ?? 0, icon: CheckCircle2, iconBg: "bg-emerald-100", iconColor: "text-emerald-700", desc: "Confirmed clock-ins" },
              { label: "Late Arrivals", value: stats?.late ?? 0, icon: AlertTriangle, iconBg: "bg-amber-100", iconColor: "text-amber-700", desc: "After grace period" },
              { label: "Leaves Taken", value: stats?.leaves ?? 0, icon: Calendar, iconBg: "bg-blue-100", iconColor: "text-blue-700", desc: "Approved leaves" },
              { label: "Avg Work Hours", value: stats?.avgHours ? stats.avgHours.toFixed(1) + "h" : "—", icon: Clock, iconBg: "bg-violet-100", iconColor: "text-violet-700", desc: "Per working day" },
              { label: "Current Streak", value: stats?.streak ? stats.streak + " days" : "—", icon: Zap, iconBg: "bg-rose-100", iconColor: "text-rose-700", desc: "Consecutive present" },
              { label: "Work Days", value: stats?.totalWorkDays ?? 0, icon: TrendingUp, iconBg: "bg-cyan-100", iconColor: "text-cyan-700", desc: "Total in period" },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm transition">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg}`}>
                    <Icon className={`w-4 h-4 ${s.iconColor}`} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-800 leading-none">{s.value}</p>
                    <p className="text-xs font-semibold text-slate-600 mt-0.5">{s.label}</p>
                    <p className="text-xs text-slate-400">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-400" />
              <h3 className="text-sm font-bold text-slate-800">Upcoming Holidays</h3>
            </div>
            <Link href="/staff/calendar" className="text-sm text-blue-600 font-semibold hover:underline">All</Link>
          </div>
          <div className="p-4 space-y-3">
            {holidays.length === 0 ? (
              <div className="py-10 text-center text-slate-400">
                <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-semibold">No upcoming holidays</p>
              </div>
            ) : holidays.map((h, i) => {
              const d = new Date(h.date);
              return (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition">
                  <div className="w-11 h-11 rounded-xl bg-white border border-red-100 flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <span className="text-[9px] font-bold text-red-500 uppercase leading-none">{d.toLocaleDateString("en", { month: "short" })}</span>
                    <span className="text-sm font-black text-red-700 leading-none">{d.getDate()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{h.name}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">{h.type}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
