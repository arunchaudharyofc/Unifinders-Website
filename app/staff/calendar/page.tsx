"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarData = {
  month: number; year: number;
  holidays: { id: string; name: string; date: string; type: string; isOptional: boolean }[];
  attendance: { date: string; status: string; checkIn: string | null; checkOut: string | null; workHours: number | null }[];
  leaves: { id: string; startDate: string; endDate: string; leaveType: string; status: string }[];
};

export default function CalendarPage() {
  const [data, setData] = useState<CalendarData | null>(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/staff/calendar?month=${month}&year=${year}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [month, year]);

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(year - 1); } else setMonth(month - 1); };
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(year + 1); } else setMonth(month + 1); };

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = new Date(year, month - 1).toLocaleString("en", { month: "long" });

  // Build lookup maps
  const holidayMap = new Map<number, string>();
  const attendanceMap = new Map<number, string>();
  const leaveMap = new Map<number, string>();

  if (data) {
    data.holidays.forEach((h) => holidayMap.set(new Date(h.date).getDate(), h.name));
    data.attendance.forEach((a) => attendanceMap.set(new Date(a.date).getDate(), a.status));
    data.leaves.forEach((l) => {
      const s = new Date(l.startDate);
      const e = new Date(l.endDate);
      const d = new Date(s);
      while (d <= e) {
        if (d.getMonth() + 1 === month && d.getFullYear() === year) {
          leaveMap.set(d.getDate(), l.leaveType);
        }
        d.setDate(d.getDate() + 1);
      }
    });
  }

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const getDayStyle = (day: number) => {
    const isToday = day === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear();
    const isSat = new Date(year, month - 1, day).getDay() === 6;
    const holiday = holidayMap.get(day);
    const attendance = attendanceMap.get(day);
    const leave = leaveMap.get(day);

    let bg = "bg-white";
    let dot = "";
    let label = "";

    if (holiday) { bg = "bg-red-50 border-red-200"; dot = "bg-red-500"; label = holiday; }
    else if (leave) { bg = "bg-blue-50 border-blue-200"; dot = "bg-blue-500"; label = "Leave"; }
    else if (attendance === "PRESENT") { bg = "bg-emerald-50 border-emerald-200"; dot = "bg-emerald-500"; }
    else if (attendance === "LATE") { bg = "bg-amber-50 border-amber-200"; dot = "bg-amber-500"; }
    else if (attendance === "ABSENT") { bg = "bg-red-50 border-red-200"; dot = "bg-red-500"; }
    else if (isSat) { bg = "bg-slate-50 border-slate-200"; dot = "bg-slate-300"; label = "Off"; }

    return { bg, dot, label, isToday, isSat };
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Calendar</h1>
        <p className="text-sm text-slate-500 mt-1">View holidays, working days, and your attendance.</p>
      </div>

      {/* Month Nav */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-lg font-bold text-slate-800">{monthName} {year}</h2>
        <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition"><ChevronRight className="w-5 h-5" /></button>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className={`text-center py-3 text-xs font-bold uppercase tracking-wider ${d === "Sat" ? "text-red-400" : "text-slate-500"}`}>{d}</div>
          ))}
        </div>

        {loading ? (
          <div className="h-96 flex items-center justify-center"><div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-7">
            {calendarDays.map((day, i) => {
              if (!day) return <div key={`e-${i}`} className="h-28 border-b border-r border-slate-100 bg-slate-50/50" />;

              const style = getDayStyle(day);
              return (
                <div
                  key={day}
                  className={`h-28 border-b border-r border-slate-100 p-2 relative transition ${style.bg} ${style.isToday ? "ring-2 ring-inset ring-emerald-400" : ""}`}
                >
                  <div className="flex items-center gap-1.5">
                    {style.dot && <div className={`w-2 h-2 rounded-full ${style.dot}`} />}
                    <span className={`text-sm font-medium ${style.isToday ? "text-emerald-700 font-bold" : style.isSat ? "text-red-400" : "text-slate-700"}`}>{day}</span>
                  </div>
                  {style.label && <p className="text-[10px] text-slate-500 mt-1 leading-tight truncate">{style.label}</p>}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Holiday List */}
      {data && data.holidays.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Holidays This Month</h3>
          <div className="space-y-2">
            {data.holidays.map((h) => (
              <div key={h.id} className="flex items-center gap-3 p-2 rounded-lg bg-red-50">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold text-red-500">{new Date(h.date).toLocaleDateString("en", { month: "short" })}</span>
                  <span className="text-sm font-bold text-red-700 leading-none">{new Date(h.date).getDate()}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800">{h.name}</p>
                  <p className="text-[10px] text-slate-400">{h.type}{h.isOptional ? " (Optional)" : ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        {[
          { color: "bg-emerald-500", label: "Present" },
          { color: "bg-amber-500", label: "Late" },
          { color: "bg-red-500", label: "Holiday / Absent" },
          { color: "bg-blue-500", label: "Leave" },
          { color: "bg-slate-300", label: "Weekend (Sat)" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${l.color}`} />
            <span className="text-xs text-slate-600">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
