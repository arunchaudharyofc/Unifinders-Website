"use client";

import { useState, useEffect } from "react";
import {
  BarChart2, ChevronLeft, ChevronRight, Users,
  CheckCircle2, Clock, XCircle, CalendarDays, User,
} from "lucide-react";

type StaffReport = {
  userId: string; fullName: string; avatar: string | null; role: string;
  department: string; designation: string; present: number; late: number;
  absent: number; onLeave: number; totalWorkDays: number; avgHours: number; attendancePct: number;
};
type ReportData = { month: number; year: number; totalWorkDays: number; staff: StaffReport[] };

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export default function AdminStaffReportsPage() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/staff/attendance/report?month=${month}&year=${year}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [month, year]);

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(year - 1); } else setMonth(month - 1); };
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(year + 1); } else setMonth(month + 1); };

  const totals = data?.staff.reduce(
    (acc, s) => ({ present: acc.present + s.present, late: acc.late + s.late, absent: acc.absent + s.absent, onLeave: acc.onLeave + s.onLeave }),
    { present: 0, late: 0, absent: 0, onLeave: 0 }
  ) || { present: 0, late: 0, absent: 0, onLeave: 0 };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#1a2e50] to-[#0B3060] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #4f9cf9 0%, transparent 50%)" }} />
        <div className="relative z-10">
          <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-400/20">Reports</span>
          <h1 className="text-3xl font-black text-white mt-2 tracking-tight">Attendance Reports</h1>
          <p className="text-sm text-blue-200/80 mt-1 font-medium">Monthly breakdown of attendance data for all staff members.</p>
        </div>
      </div>

      {/* Month Navigator */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between p-4">
        <button onClick={prevMonth} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-black text-slate-800">{MONTHS[month - 1]} {year}</h2>
          {data && <p className="text-xs text-slate-400 font-medium mt-0.5">{data.totalWorkDays} working days</p>}
        </div>
        <button onClick={nextMonth} className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 transition cursor-pointer">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Present", value: totals.present, icon: CheckCircle2, color: "text-emerald-700", bg: "from-emerald-50 to-emerald-100/50", border: "border-emerald-200" },
          { label: "Late Arrivals", value: totals.late, icon: Clock, color: "text-amber-700", bg: "from-amber-50 to-amber-100/50", border: "border-amber-200" },
          { label: "Absences", value: totals.absent, icon: XCircle, color: "text-red-700", bg: "from-red-50 to-red-100/50", border: "border-red-200" },
          { label: "On Leave", value: totals.onLeave, icon: CalendarDays, color: "text-blue-700", bg: "from-blue-50 to-blue-100/50", border: "border-blue-200" },
        ].map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm`}>
            <div className="flex items-center gap-2 mb-3">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{s.label}</span>
            </div>
            <span className={`text-4xl font-black ${s.color}`}>{s.value}</span>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">Total across all staff</p>
          </div>
        ))}
      </div>

      {/* Staff Detail Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Per-Staff Breakdown</h3>
            <p className="text-xs text-slate-500 mt-0.5">{data?.totalWorkDays} working days in {MONTHS[month-1]} {year} (excl. Saturdays)</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
            <Users className="w-4 h-4" /> {data?.staff.length || 0} staff members
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-blue-100 border-t-[#0070F0] rounded-full animate-spin" />
          </div>
        ) : !data || data.staff.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <BarChart2 className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-500">No attendance data for this period</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="p-4 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Staff Member</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Dept.</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Present</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Late</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Absent</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Leave</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Avg Hrs</th>
                  <th className="p-4 pr-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right min-w-[180px]">Attendance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.staff.map((s) => {
                  const pct = s.attendancePct;
                  const barColor = pct >= 90 ? "bg-emerald-500" : pct >= 75 ? "bg-amber-500" : "bg-red-500";
                  const pctColor = pct >= 90 ? "text-emerald-700" : pct >= 75 ? "text-amber-700" : "text-red-700";
                  const pillBg = pct >= 90 ? "bg-emerald-50 border-emerald-100" : pct >= 75 ? "bg-amber-50 border-amber-100" : "bg-red-50 border-red-100";
                  const initials = s.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <tr key={s.userId} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm bg-blue-100 text-blue-700 border-2 border-blue-200 flex-shrink-0">
                            {s.avatar ? <img src={s.avatar} alt={s.fullName} className="w-full h-full rounded-full object-cover" /> : initials}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-800 block">{s.fullName}</span>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${s.role === "admin" ? "text-red-500" : "text-emerald-600"}`}>{s.role}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-500 font-medium">{s.department}</td>
                      <td className="p-4 text-center"><span className="text-sm font-black text-emerald-600">{s.present}</span></td>
                      <td className="p-4 text-center"><span className="text-sm font-black text-amber-600">{s.late}</span></td>
                      <td className="p-4 text-center"><span className="text-sm font-black text-red-500">{s.absent}</span></td>
                      <td className="p-4 text-center"><span className="text-sm font-black text-blue-600">{s.onLeave}</span></td>
                      <td className="p-4 text-center"><span className="text-sm font-semibold text-slate-700">{s.avgHours}h</span></td>
                      <td className="p-4 pr-6">
                        <div className="flex items-center gap-3 justify-end">
                          <div className="flex-1 max-w-[80px] h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className={`text-xs font-black px-2 py-0.5 rounded border ${pillBg} ${pctColor}`}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-wrap items-center gap-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Legend</span>
        {[
          { label: "≥90% Excellent", color: "bg-emerald-500", textColor: "text-emerald-700" },
          { label: "75–89% Good", color: "bg-amber-500", textColor: "text-amber-700" },
          { label: "<75% Needs Attention", color: "bg-red-500", textColor: "text-red-700" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
            <span className={`text-xs font-semibold ${l.textColor}`}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
