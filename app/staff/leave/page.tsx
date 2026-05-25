"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, Clock, ChevronRight, X, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

type LeaveBalance = { leaveType: string; totalDays: number; usedDays: number; remainingDays: number };
type LeaveRequest = {
  id: string; leaveType: string; startDate: string; endDate: string;
  totalDays: number; reason: string; status: string; reviewNote: string | null; createdAt: string;
};

const TYPE_LABELS: Record<string, string> = {
  ANNUAL: "Annual Leave", SICK: "Sick Leave", CASUAL: "Casual Leave",
  UNPAID: "Unpaid Leave", MATERNITY: "Maternity", PATERNITY: "Paternity",
  BEREAVEMENT: "Bereavement", COMPENSATORY: "Compensatory",
};

const STATUS_BADGE: Record<string, { bg: string; text: string; icon: typeof CheckCircle2 }> = {
  PENDING: { bg: "bg-amber-100", text: "text-amber-700", icon: Clock },
  APPROVED: { bg: "bg-emerald-100", text: "text-emerald-700", icon: CheckCircle2 },
  REJECTED: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
  CANCELLED: { bg: "bg-slate-100", text: "text-slate-500", icon: X },
};

export default function LeavePage() {
  const [balances, setBalances] = useState<LeaveBalance[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ leaveType: "ANNUAL", startDate: "", endDate: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/staff/leave/balance").then((r) => r.json()).then((d) => { if (d.success) setBalances(d.data); }).catch(() => {});
    fetch("/api/staff/leave").then((r) => r.json()).then((d) => { if (d.success) setLeaves(d.data); }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/staff/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setFormData({ leaveType: "ANNUAL", startDate: "", endDate: "", reason: "" });
        // Refresh
        const [bRes, lRes] = await Promise.all([
          fetch("/api/staff/leave/balance").then((r) => r.json()),
          fetch("/api/staff/leave").then((r) => r.json()),
        ]);
        if (bRes.success) setBalances(bRes.data);
        if (lRes.success) setLeaves(lRes.data);
      } else {
        setError(data.error || "Failed to apply leave");
      }
    } catch {
      setError("Network error");
    }
    setSubmitting(false);
  };

  const cancelLeave = async (id: string) => {
    if (!confirm("Cancel this leave request?")) return;
    const res = await fetch(`/api/staff/leave/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setLeaves(leaves.map((l) => (l.id === id ? { ...l, status: "CANCELLED" } : l)));
    }
  };

  const BALANCE_COLORS = ["emerald", "blue", "purple", "amber"];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
          <p className="text-sm text-slate-500 mt-1">Apply for leave and track your balances.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Apply Leave
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {balances.map((b, i) => {
          const color = BALANCE_COLORS[i % BALANCE_COLORS.length];
          const pct = b.totalDays > 0 ? ((b.totalDays - b.remainingDays) / b.totalDays) * 100 : 0;
          return (
            <div key={b.leaveType} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-slate-800">{TYPE_LABELS[b.leaveType] || b.leaveType}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${color}-100 text-${color}-700`}>
                  {b.remainingDays}/{b.totalDays}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full bg-${color}-500 transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-400">
                <span>Used: {b.usedDays}</span>
                <span>Remaining: {b.remainingDays}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Apply Leave Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Apply for Leave</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded-lg transition"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Leave Type</label>
                <select
                  value={formData.leaveType}
                  onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
                >
                  {Object.entries(TYPE_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                  <input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date</label>
                  <input type="date" required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason</label>
                <textarea required rows={3} value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Please describe the reason for your leave..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none" />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Calendar className="w-4 h-4" /> Submit Leave Request</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Leave History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Leave History</h3>
        </div>
        {leaves.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No leave requests yet.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {leaves.map((l) => {
              const badge = STATUS_BADGE[l.status] || STATUS_BADGE.PENDING;
              const BadgeIcon = badge.icon;
              return (
                <div key={l.id} className="p-4 hover:bg-slate-50 transition flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-800">{TYPE_LABELS[l.leaveType] || l.leaveType}</p>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.text}`}>
                        <BadgeIcon className="w-3 h-3" /> {l.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {new Date(l.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} → {new Date(l.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {l.totalDays} day{l.totalDays !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">{l.reason}</p>
                    {l.reviewNote && <p className="text-xs text-blue-500 mt-0.5">Admin: {l.reviewNote}</p>}
                  </div>
                  {l.status === "PENDING" && (
                    <button onClick={() => cancelLeave(l.id)} className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg transition">
                      Cancel
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
