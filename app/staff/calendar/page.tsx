"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin, CalendarDays } from "lucide-react";

type CalendarData = {
  month: number; year: number;
  holidays: { id: string; name: string; date: string; type: string; isOptional: boolean }[];
  attendance: { date: string; status: string; checkIn: string | null; checkOut: string | null; workHours: number | null }[];
  leaves: { id: string; startDate: string; endDate: string; leaveType: string; status: string }[];
};

type DayInfo = { calBg: string; dotColor: string; label: string; pillClass: string };

const DAY_STYLES: Record<string, DayInfo> = {
  holiday: { calBg: "bg-red-50",     dotColor: "bg-red-500",     label: "Holiday",  pillClass: "bg-red-100 text-red-800 border-red-200" },
  leave:   { calBg: "bg-blue-50",    dotColor: "bg-blue-500",    label: "Leave",    pillClass: "bg-blue-100 text-blue-800 border-blue-200" },
  PRESENT: { calBg: "bg-emerald-50", dotColor: "bg-emerald-500", label: "Present",  pillClass: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  LATE:    { calBg: "bg-amber-50",   dotColor: "bg-amber-500",   label: "Late",     pillClass: "bg-amber-100 text-amber-800 border-amber-200" },
  ABSENT:  { calBg: "bg-red-50",     dotColor: "bg-red-400",     label: "Absent",   pillClass: "bg-red-100 text-red-800 border-red-200" },
  weekend: { calBg: "bg-slate-50",   dotColor: "bg-slate-300",   label: "Off",      pillClass: "bg-slate-100 text-slate-600 border-slate-200" },
};

export default function CalendarPage() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/staff/calendar?month=${month}&year=${year}`)
      .then(r => r.json()).then(d => { if (d.success) setData(d.data); })
      .catch(() => {}).finally(() => setLoading(false));
  }, [month, year]);

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = new Date(year, month - 1).toLocaleString("en", { month: "long" });

  const holidayMap = new Map<number, string>();
  const attendanceMap = new Map<number, string>();
  const leaveMap = new Map<number, boolean>();

  if (data) {
    data.holidays.forEach(h => holidayMap.set(new Date(h.date).getDate(), h.name));
    data.attendance.forEach(a => attendanceMap.set(new Date(a.date).getDate(), a.status));
    data.leaves.forEach(l => {
      if (l.status !== "APPROVED") return;
      const s = new Date(l.startDate), e = new Date(l.endDate), cur = new Date(s);
      while (cur <= e) {
        if (cur.getMonth() + 1 === month && cur.getFullYear() === year) leaveMap.set(cur.getDate(), true);
        cur.setDate(cur.getDate() + 1);
      }
    });
  }

  const calDays: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const getDayInfo = (day: number): { style: DayInfo | null; label: string; isToday: boolean; isSat: boolean } => {
    const isToday = day === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear();
    const isSat = new Date(year, month - 1, day).getDay() === 6;
    const holiday = holidayMap.get(day);
    const att = attendanceMap.get(day);
    const isLeave = leaveMap.get(day);

    if (holiday) return { style: DAY_STYLES.holiday, label: holiday, isToday, isSat };
    if (isLeave) return { style: DAY_STYLES.leave, label: "On Leave", isToday, isSat };
    if (att && DAY_STYLES[att]) return { style: DAY_STYLES[att], label: DAY_STYLES[att].label, isToday, isSat };
    if (isSat) return { style: DAY_STYLES.weekend, label: "Off", isToday, isSat };
    return { style: null, label: "", isToday, isSat };
  };

  const holidaysThisMonth = data?.holidays || [];
  const presentCount = data?.attendance.filter(a => a.status === "PRESENT").length || 0;
  const leaveCount = data?.leaves.filter(l => l.status === "APPROVED").length || 0;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">

      {/* ── Page Header ── */}
      <div className="bg-[#0B1A2D] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 mb-3">
                Calendar
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white">Holiday & Activity Calendar</h1>
              <p className="text-sm text-slate-300 mt-1.5 font-medium">Company events, public holidays, and your approved leaves</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { label: "Holidays", value: holidaysThisMonth.length, color: "text-red-400" },
                { label: "Present", value: presentCount, color: "text-emerald-400" },
                { label: "Leaves", value: leaveCount, color: "text-blue-300" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center min-w-[75px]">
                  <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Month Nav ── */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 shadow-sm px-6 py-4">
        <button onClick={prevMonth} className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-xl border border-slate-200 transition">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-800">{monthName} {year}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{holidaysThisMonth.length} holiday{holidaysThisMonth.length !== 1 ? "s" : ""} this month</p>
        </div>
        <button onClick={nextMonth} className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-xl border border-slate-200 transition">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Calendar Grid ── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Day names */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }} className="bg-slate-50 border-b border-slate-200">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className={`text-center py-3 text-xs font-bold uppercase tracking-widest ${d === "Sat" ? "text-red-500" : "text-slate-500"}`}>{d}</div>
              ))}
            </div>

            {loading ? (
              <div className="h-72 flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}>
                {calDays.map((day, i) => {
                  if (!day) return <div key={`e-${i}`} className="h-[90px] border-b border-r border-slate-100 bg-slate-50/30" />;
                  const { style, label, isToday, isSat } = getDayInfo(day);

                  return (
                    <div key={day} className={`h-[90px] border-b border-r border-slate-100 p-2 flex flex-col gap-1 ${style?.calBg || "bg-white"} ${isToday ? "ring-2 ring-inset ring-blue-500" : ""}`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold leading-none ${isToday ? "text-blue-600" : isSat ? "text-red-500" : "text-slate-700"}`}>{day}</span>
                        {style?.dotColor && <span className={`w-1.5 h-1.5 rounded-full ${style.dotColor}`} />}
                      </div>
                      {label && label !== "Off" && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border leading-none w-fit truncate ${style?.pillClass}`}>
                          {label.length > 10 ? label.slice(0, 9) + "…" : label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-wrap gap-2">
            {[
              { dot: "bg-emerald-500", pill: "bg-emerald-100 text-emerald-800", label: "Present" },
              { dot: "bg-amber-500",   pill: "bg-amber-100 text-amber-800",     label: "Late" },
              { dot: "bg-red-500",     pill: "bg-red-100 text-red-800",         label: "Holiday / Absent" },
              { dot: "bg-blue-500",    pill: "bg-blue-100 text-blue-800",       label: "On Leave" },
              { dot: "bg-slate-300",   pill: "bg-slate-100 text-slate-600",     label: "Weekend Off" },
            ].map(l => (
              <span key={l.label} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${l.pill}`}>
                <span className={`w-2 h-2 rounded-full ${l.dot}`} />{l.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Holidays Sidebar ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-red-50">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-bold text-slate-800">Holidays in {monthName}</h3>
            </div>
            <span className="text-xs font-bold text-red-700 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full">{holidaysThisMonth.length}</span>
          </div>
          <div className="p-4 space-y-3">
            {holidaysThisMonth.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <CalendarDays className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-semibold">No holidays this month</p>
              </div>
            ) : holidaysThisMonth.map(h => {
              const d = new Date(h.date);
              return (
                <div key={h.id} className="flex items-center gap-3 p-3 rounded-xl border border-red-100 bg-red-50 hover:bg-red-100 transition">
                  <div className="w-11 h-11 rounded-xl bg-white border border-red-100 flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <span className="text-[9px] font-bold text-red-500 uppercase">{d.toLocaleDateString("en", { month: "short" })}</span>
                    <span className="text-sm font-black text-red-700 leading-none">{d.getDate()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{h.name}</p>
                    <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{h.type}{h.isOptional ? " · Optional" : ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Approved leaves this month */}
          {data && data.leaves.filter(l => l.status === "APPROVED").length > 0 && (
            <div className="p-4 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">My Approved Leaves</p>
              <div className="space-y-2">
                {data.leaves.filter(l => l.status === "APPROVED").map(l => (
                  <div key={l.id} className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-700">{l.leaveType}</span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Approved</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
