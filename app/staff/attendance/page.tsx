"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, LogIn, LogOut, CheckCircle2, AlertTriangle, CalendarDays, XCircle } from "lucide-react";

type AttendanceRecord = {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  workHours: number | null;
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  PRESENT: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Present" },
  LATE: { bg: "bg-amber-100", text: "text-amber-700", label: "Late" },
  HALF_DAY: { bg: "bg-orange-100", text: "text-orange-700", label: "Half Day" },
  ABSENT: { bg: "bg-red-100", text: "text-red-700", label: "Absent" },
  ON_LEAVE: { bg: "bg-blue-100", text: "text-blue-700", label: "On Leave" },
  HOLIDAY: { bg: "bg-purple-100", text: "text-purple-700", label: "Holiday" },
  WEEKEND: { bg: "bg-slate-100", text: "text-slate-500", label: "Weekend" },
};

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/staff/attendance?month=${month}&year=${year}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setRecords(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [month, year]);

  const prevMonth = () => {
    if (month === 1) { setMonth(12); setYear(year - 1); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setMonth(1); setYear(year + 1); }
    else setMonth(month + 1);
  };

  // Build calendar grid
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month, 0).getDate();
  const recordMap = new Map(records.map((r) => [new Date(r.date).getDate(), r]));

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  const monthName = new Date(year, month - 1).toLocaleString("en", { month: "long" });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance Log</h1>
        <p className="text-sm text-slate-500 mt-1">Track your daily attendance and work hours.</p>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-lg transition"><ChevronLeft className="w-5 h-5" /></button>
        <h2 className="text-lg font-bold text-slate-800">{monthName} {year}</h2>
        <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-lg transition"><ChevronRight className="w-5 h-5" /></button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className={`text-center py-3 text-xs font-bold uppercase tracking-wider ${d === "Sat" ? "text-red-400" : "text-slate-500"}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Days */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-7">
            {calendarDays.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} className="h-24 border-b border-r border-slate-100 bg-slate-50/50" />;

              const record = recordMap.get(day);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear();
              const isSaturday = new Date(year, month - 1, day).getDay() === 6;
              const statusInfo = record ? STATUS_STYLES[record.status] : isSaturday ? STATUS_STYLES.WEEKEND : null;

              return (
                <div
                  key={day}
                  className={`h-24 border-b border-r border-slate-100 p-2 relative transition hover:bg-slate-50 ${
                    isToday ? "ring-2 ring-inset ring-emerald-400 bg-emerald-50/30" : ""
                  } ${isSaturday && !record ? "bg-red-50/30" : ""}`}
                >
                  <span className={`text-sm font-medium ${isToday ? "text-emerald-700 font-bold" : isSaturday ? "text-red-400" : "text-slate-700"}`}>
                    {day}
                  </span>

                  {statusInfo && (
                    <div className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${statusInfo.bg} ${statusInfo.text} inline-block`}>
                      {statusInfo.label}
                    </div>
                  )}

                  {record?.workHours && (
                    <p className="text-[10px] text-slate-400 mt-0.5">{record.workHours.toFixed(1)}h</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        {Object.entries(STATUS_STYLES).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${val.bg}`} />
            <span className="text-xs text-slate-600">{val.label}</span>
          </div>
        ))}
      </div>

      {/* Table View */}
      {records.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Detailed View</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Check In</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Check Out</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Hours</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => {
                  const s = STATUS_STYLES[r.status] || STATUS_STYLES.PRESENT;
                  return (
                    <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {new Date(r.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${s.bg} ${s.text}`}>{s.label}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {r.checkIn ? new Date(r.checkIn).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {r.checkOut ? new Date(r.checkOut).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "—"}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-700">{r.workHours ? `${r.workHours.toFixed(1)}h` : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
