"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, LogIn, LogOut, CheckCircle2,
  AlertTriangle, Plus, X, Clock, Timer
} from "lucide-react";

type AttendanceRecord = {
  id: string; date: string; checkIn: string | null; checkOut: string | null;
  status: string; workHours: number | null; notes: string | null;
};

const STATUS: Record<string, { pill: string; dot: string; label: string; cellBg: string }> = {
  PRESENT:  { pill: "bg-emerald-100 text-emerald-800 border-emerald-200", dot: "bg-emerald-500", label: "Present",   cellBg: "bg-emerald-50" },
  LATE:     { pill: "bg-amber-100 text-amber-800 border-amber-200",       dot: "bg-amber-500",   label: "Late",      cellBg: "bg-amber-50" },
  HALF_DAY: { pill: "bg-orange-100 text-orange-800 border-orange-200",    dot: "bg-orange-500",  label: "Half Day",  cellBg: "bg-orange-50" },
  ABSENT:   { pill: "bg-red-100 text-red-800 border-red-200",             dot: "bg-red-500",     label: "Absent",    cellBg: "bg-red-50" },
  ON_LEAVE: { pill: "bg-blue-100 text-blue-800 border-blue-200",          dot: "bg-blue-500",    label: "On Leave",  cellBg: "bg-blue-50" },
  HOLIDAY:  { pill: "bg-purple-100 text-purple-800 border-purple-200",    dot: "bg-purple-500",  label: "Holiday",   cellBg: "bg-purple-50" },
  WEEKEND:  { pill: "bg-slate-100 text-slate-600 border-slate-200",       dot: "bg-slate-300",   label: "Off",       cellBg: "bg-slate-50" },
};

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [regData, setRegData] = useState({ date: "", checkIn: "09:00", checkOut: "17:00", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [regMsg, setRegMsg] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const fetchAttendance = () => {
    setLoading(true);
    fetch(`/api/staff/attendance?month=${month}&year=${year}`)
      .then(r => r.json()).then(d => { if (d.success) setRecords(d.data); })
      .catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { fetchAttendance(); }, [month, year]);

  const prevMonth = () => { if (month === 1) { setMonth(12); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const nextMonth = () => { if (month === 12) { setMonth(1); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const handleReg = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setRegMsg(null);
    try {
      const res = await fetch("/api/staff/attendance/regularize", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(regData),
      });
      const d = await res.json();
      if (d.success) {
        setRegMsg({ type: "success", text: "Request submitted for admin review." });
        setRegData({ date: "", checkIn: "09:00", checkOut: "17:00", reason: "" });
        fetchAttendance();
        setTimeout(() => { setShowModal(false); setRegMsg(null); }, 1800);
      } else setRegMsg({ type: "error", text: d.error || "Failed to submit" });
    } catch { setRegMsg({ type: "error", text: "Network error. Please try again." }); }
    setSubmitting(false);
  };

  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const recordMap = new Map(records.map(r => [new Date(r.date).getDate(), r]));
  const calDays: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  const monthName = new Date(year, month - 1).toLocaleString("en", { month: "long" });

  const summary = {
    present: records.filter(r => r.status === "PRESENT").length,
    late: records.filter(r => r.status === "LATE").length,
    absent: records.filter(r => r.status === "ABSENT").length,
    totalHours: records.reduce((s, r) => s + (r.workHours || 0), 0),
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">

      {/* ── Page Header ── */}
      <div className="bg-[#0B1A2D] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Title */}
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 mb-3">
                Attendance
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">Attendance Log</h1>
              <p className="text-sm text-slate-300 mt-1.5 font-medium">Monthly clock-in/out records and regularization requests</p>
            </div>

            {/* Right: Stats + Button */}
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { label: "Present", value: summary.present, color: "text-emerald-400" },
                { label: "Late", value: summary.late, color: "text-amber-400" },
                { label: "Absent", value: summary.absent, color: "text-red-400" },
                { label: "Hours", value: summary.totalHours.toFixed(0) + "h", color: "text-blue-300" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center min-w-[70px]">
                  <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-[#0B1A2D] rounded-xl text-sm font-black transition shadow-md whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> Regularize
              </button>
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
          <p className="text-sm text-slate-500 mt-0.5">{records.length} records this month</p>
        </div>
        <button onClick={nextMonth} className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-xl border border-slate-200 transition">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Calendar ── */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Day headers */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
              className="bg-slate-50 border-b border-slate-200">
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
                  const rec = recordMap.get(day);
                  const isToday = day === new Date().getDate() && month === new Date().getMonth() + 1 && year === new Date().getFullYear();
                  const isSat = new Date(year, month - 1, day).getDay() === 6;
                  const s = rec ? STATUS[rec.status] : isSat ? STATUS.WEEKEND : null;
                  const isPending = rec?.notes?.startsWith("PENDING_REGULARIZATION:");

                  return (
                    <div key={day} className={`h-[90px] border-b border-r border-slate-100 p-2 flex flex-col gap-1 ${s?.cellBg || "bg-white"} ${isToday ? "ring-2 ring-inset ring-blue-500" : ""}`}>
                      {/* Day number */}
                      <span className={`text-sm font-bold leading-none ${isToday ? "text-blue-600" : isSat ? "text-red-500" : "text-slate-700"}`}>
                        {day}
                        {isToday && <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-blue-500 align-middle" />}
                      </span>

                      {/* Status badge */}
                      {isPending ? (
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-full w-fit leading-none">
                          Pending
                        </span>
                      ) : s && s.label !== "Off" && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full w-fit border leading-none ${s.pill}`}>
                          {s.label}
                        </span>
                      )}

                      {/* Times */}
                      {rec?.checkIn && (
                        <p className="text-[10px] text-slate-500 font-medium leading-none">
                          {new Date(rec.checkIn).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false })}
                          {rec.checkOut ? ` – ${new Date(rec.checkOut).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", hour12: false })}` : ""}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap gap-2">
            {Object.entries(STATUS).map(([, v]) => (
              <span key={v.label} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${v.pill}`}>
                <span className={`w-2 h-2 rounded-full ${v.dot}`} />{v.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Shift Log Sidebar ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-800">Shift Log</h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold">{records.filter(r => r.checkIn).length} entries</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: 480 }}>
            {records.filter(r => r.checkIn).length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-semibold">No punch entries this month</p>
              </div>
            ) : records.filter(r => r.checkIn).map(r => {
              const s = STATUS[r.status] || STATUS.PRESENT;
              return (
                <div key={r.id} className={`p-3.5 rounded-xl border ${s.pill}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${s.pill} mb-1 inline-block`}>{s.label}</span>
                      <p className="text-xs font-bold text-slate-800">
                        {new Date(r.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                        <span className="flex items-center gap-1"><LogIn className="w-3 h-3 text-emerald-600" />{new Date(r.checkIn!).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                        {r.checkOut && <span className="flex items-center gap-1"><LogOut className="w-3 h-3 text-red-500" />{new Date(r.checkOut).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>}
                      </div>
                    </div>
                    {r.workHours ? (
                      <div className="text-right shrink-0">
                        <p className="text-base font-black text-slate-700">{r.workHours.toFixed(1)}</p>
                        <p className="text-xs text-slate-400">hrs</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Regularization Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#0B1A2D] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Attendance Regularization</h2>
                <p className="text-sm text-slate-300 mt-0.5">Correct missing or incorrect punch entries</p>
              </div>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleReg} className="p-6 space-y-4">
              {regMsg && (
                <div className={`flex items-center gap-2 p-3 rounded-xl text-sm font-semibold border ${regMsg.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                  {regMsg.type === "success" ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                  {regMsg.text}
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date *</label>
                <input type="date" required value={regData.date} onChange={e => setRegData({ ...regData, date: e.target.value })}
                  className="w-full h-11 px-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expected In *</label>
                  <input type="time" required value={regData.checkIn} onChange={e => setRegData({ ...regData, checkIn: e.target.value })}
                    className="w-full h-11 px-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expected Out *</label>
                  <input type="time" required value={regData.checkOut} onChange={e => setRegData({ ...regData, checkOut: e.target.value })}
                    className="w-full h-11 px-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason *</label>
                <textarea required rows={3} value={regData.reason} onChange={e => setRegData({ ...regData, reason: e.target.value })}
                  placeholder="e.g. Forgot ID card, worked remotely, system downtime…"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-[#0070F0] hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition disabled:opacity-60 flex items-center justify-center gap-2">
                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
                Submit Regularization Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
