"use client";

import { useState, useEffect } from "react";
import {
  Calendar, Plus, Clock, ChevronRight, X, CheckCircle2,
  XCircle, AlertTriangle, FileText, Loader2
} from "lucide-react";

type LeaveBalance = { leaveType: string; totalDays: number; usedDays: number; remainingDays: number };
type LeaveRequest = {
  id: string; leaveType: string; startDate: string; endDate: string;
  totalDays: number; reason: string; status: string; reviewNote: string | null; createdAt: string;
};

const TYPE_LABELS: Record<string, string> = {
  ANNUAL: "Annual", SICK: "Sick", CASUAL: "Casual", UNPAID: "Unpaid",
  MATERNITY: "Maternity", PATERNITY: "Paternity", BEREAVEMENT: "Bereavement", COMPENSATORY: "Compensatory",
};

const STATUS_META: Record<string, { bg: string; text: string; border: string; icon: React.ElementType }> = {
  PENDING:   { bg: "bg-amber-50",   text: "text-amber-800",   border: "border-amber-200",   icon: Clock },
  APPROVED:  { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200", icon: CheckCircle2 },
  REJECTED:  { bg: "bg-red-50",     text: "text-red-800",     border: "border-red-200",     icon: XCircle },
  CANCELLED: { bg: "bg-slate-50",   text: "text-slate-600",   border: "border-slate-200",   icon: X },
};

const BALANCE_COLORS: Record<string, { bar: string; bg: string; border: string; text: string }> = {
  ANNUAL:       { bar: "bg-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800" },
  SICK:         { bar: "bg-blue-500",    bg: "bg-blue-50",    border: "border-blue-200",    text: "text-blue-800" },
  CASUAL:       { bar: "bg-violet-500",  bg: "bg-violet-50",  border: "border-violet-200",  text: "text-violet-800" },
  COMPENSATORY: { bar: "bg-amber-500",   bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-800" },
  UNPAID:       { bar: "bg-slate-400",   bg: "bg-slate-50",   border: "border-slate-200",   text: "text-slate-700" },
};

export default function LeavePage() {
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ leaveType: "ANNUAL", startDate: "", endDate: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    fetch("/api/staff/leave/balance").then(r => r.json()).then(d => { if (d.success) setBalances(d.data); }).catch(() => {});
    fetch("/api/staff/leave").then(r => r.json()).then(d => { if (d.success) setLeaves(d.data); }).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setSubmitting(true); setError(null);
    try {
      const res = await fetch("/api/staff/leave", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const d = await res.json();
      if (d.success) { setShowForm(false); setFormData({ leaveType: "ANNUAL", startDate: "", endDate: "", reason: "" }); load(); }
      else setError(d.error || "Failed to apply leave");
    } catch { setError("Network error. Please try again."); }
    setSubmitting(false);
  };

  const cancelLeave = async (id: string) => {
    if (!confirm("Cancel this leave request?")) return;
    const res = await fetch(`/api/staff/leave/${id}`, { method: "DELETE" });
    const d = await res.json();
    if (d.success) load();
  };

  const pendingCount = leaves.filter(l => l.status === "PENDING").length;
  const approvedCount = leaves.filter(l => l.status === "APPROVED").length;
  const totalDaysUsed = balances.reduce((s, b) => s + b.usedDays, 0);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">

      {/* ── Page Header ── */}
      <div className="bg-[#0B1A2D] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 mb-3">
                Leave Management
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white">Leave Requests</h1>
              <p className="text-sm text-slate-300 mt-1.5 font-medium">Apply for leave, track balances, and review approval status</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { label: "Pending", value: pendingCount, color: "text-amber-400" },
                { label: "Approved", value: approvedCount, color: "text-emerald-400" },
                { label: "Days Used", value: totalDaysUsed, color: "text-blue-300" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center min-w-[75px]">
                  <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
              <button onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-[#0B1A2D] rounded-xl text-sm font-black transition shadow-md whitespace-nowrap">
                <Plus className="w-4 h-4" /> Apply Leave
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Balance Cards ── */}
      <div>
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Leave Balances</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {balances.length === 0 ? (
            <div className="col-span-4 bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-sm">No leave balance data found.</div>
          ) : balances.map(b => {
            const s = BALANCE_COLORS[b.leaveType] || BALANCE_COLORS.UNPAID;
            const pct = b.totalDays > 0 ? Math.round((b.usedDays / b.totalDays) * 100) : 0;
            return (
              <div key={b.leaveType} className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition ${s.border}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{TYPE_LABELS[b.leaveType] || b.leaveType} Leave</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {b.usedDays} used · {b.remainingDays} remaining
                    </p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-lg text-sm font-black ${s.bg} ${s.text}`}>
                    {b.remainingDays}<span className="text-xs font-semibold opacity-70">/{b.totalDays}</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${s.bar} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">{pct}% used</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── History Table ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-800">Application History</h3>
          </div>
          <span className="text-sm text-slate-500">{leaves.length} total request{leaves.length !== 1 ? "s" : ""}</span>
        </div>
        {leaves.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold text-slate-600">No leave applications yet</p>
            <p className="text-sm text-slate-400 mt-1">Click "Apply Leave" above to submit your first request.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Leave Type", "Duration", "Days", "Reason", "Status", ""].map(h => (
                    <th key={h} className="px-4 py-3 first:pl-6 last:pr-6 text-xs font-bold uppercase tracking-wider text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leaves.map(l => {
                  const m = STATUS_META[l.status] || STATUS_META.PENDING;
                  const Icon = m.icon;
                  return (
                    <tr key={l.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3.5 pl-6 font-bold text-sm text-slate-800">{TYPE_LABELS[l.leaveType] || l.leaveType}</td>
                      <td className="px-4 py-3.5 text-sm text-slate-600">
                        {new Date(l.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 inline mx-1" />
                        {new Date(l.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-sm text-slate-700">{l.totalDays}d</td>
                      <td className="px-4 py-3.5 max-w-[200px]">
                        <p className="text-sm text-slate-600 truncate">{l.reason}</p>
                        {l.reviewNote && <p className="text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded mt-1 border border-blue-100 w-fit">Note: {l.reviewNote}</p>}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${m.bg} ${m.text} ${m.border}`}>
                          <Icon className="w-3 h-3" /> {l.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 pr-6 text-right">
                        {l.status === "PENDING" && (
                          <button onClick={() => cancelLeave(l.id)} className="text-sm font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition">
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Apply Leave Modal ── */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="bg-[#0B1A2D] px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white">Apply for Leave</h2>
                <p className="text-sm text-slate-300 mt-0.5">Submit request for admin review and approval</p>
              </div>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-800 rounded-xl text-sm font-semibold border border-red-200">
                  <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Leave Type *</label>
                <select value={formData.leaveType} onChange={e => setFormData({ ...formData, leaveType: e.target.value })}
                  className="w-full h-11 px-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white">
                  {Object.entries(TYPE_LABELS).map(([k, v]) => <option key={k} value={k}>{v} Leave</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Start Date *</label>
                  <input type="date" required value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full h-11 px-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">End Date *</label>
                  <input type="date" required value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full h-11 px-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reason *</label>
                <textarea required rows={3} value={formData.reason} onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Provide brief details about the reason for this leave…"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-[#0070F0] hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition disabled:opacity-60 flex items-center justify-center gap-2">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
                Submit Leave Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
