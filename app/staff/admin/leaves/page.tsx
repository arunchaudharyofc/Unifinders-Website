"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2, XCircle, Clock, MessageSquare,
  AlertCircle, User, ChevronRight
} from "lucide-react";

type LeaveRequest = {
  id: string; staffUserId: string; staffName: string; staffAvatar: string | null;
  leaveType: string; startDate: string; endDate: string; totalDays: number;
  reason: string; status: string; createdAt: string;
};

const TYPE_META: Record<string, { label: string; bg: string; text: string; border: string }> = {
  ANNUAL:       { label: "Annual",       bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-100" },
  SICK:         { label: "Sick",         bg: "bg-red-50",    text: "text-red-700",    border: "border-red-100" },
  CASUAL:       { label: "Casual",       bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-100" },
  UNPAID:       { label: "Unpaid",       bg: "bg-slate-50",  text: "text-slate-600",  border: "border-slate-200" },
  MATERNITY:    { label: "Maternity",    bg: "bg-pink-50",   text: "text-pink-700",   border: "border-pink-100" },
  PATERNITY:    { label: "Paternity",    bg: "bg-cyan-50",   text: "text-cyan-700",   border: "border-cyan-100" },
  BEREAVEMENT:  { label: "Bereavement",  bg: "bg-gray-100",  text: "text-gray-700",   border: "border-gray-200" },
  COMPENSATORY: { label: "Compensatory", bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-100" },
};

export default function AdminLeavesPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchRequests = () => {
    setLoading(true);
    fetch(`/api/admin/staff/leave-requests?status=${statusFilter}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setRequests(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, [statusFilter]);

  const handleReview = async (id: string, action: "approve" | "reject") => {
    setReviewingId(id);
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/staff/leave-requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, note: reviewNote }),
      });
      const data = await res.json();
      if (data.success) { setReviewNote(""); fetchRequests(); }
      else setActionError(data.error || "Failed to submit review");
    } catch {
      setActionError("Network error during action");
    }
    setReviewingId(null);
  };

  const TABS = [
    { key: "PENDING", label: "Pending", color: "text-amber-600 border-amber-500" },
    { key: "APPROVED", label: "Approved", color: "text-emerald-600 border-emerald-500" },
    { key: "REJECTED", label: "Rejected", color: "text-red-600 border-red-500" },
  ] as const;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#1a2e50] to-[#0B3060] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, #a78bfa 0%, transparent 50%)" }} />
        <div className="relative z-10">
          <span className="px-2.5 py-1 bg-violet-500/20 text-violet-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-violet-400/20">Leave Management</span>
          <h1 className="text-3xl font-black text-white mt-2">Leave Approvals</h1>
          <p className="text-sm text-blue-200/80 mt-1 font-medium">Review and approve or reject employee leave applications.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white rounded-2xl border border-slate-100 p-1.5 shadow-sm w-fit">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setStatusFilter(t.key)}
            className={`px-5 py-2.5 text-sm font-bold rounded-xl transition cursor-pointer ${
              statusFilter === t.key ? `bg-slate-900 text-white shadow-sm` : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      {loading ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-slate-100">
          <div className="w-10 h-10 border-2 border-blue-100 border-t-[#0070F0] rounded-full animate-spin" />
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-emerald-300" />
          </div>
          <p className="text-sm font-bold text-slate-500">No {statusFilter.toLowerCase()} leave requests</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((r) => {
            const meta = TYPE_META[r.leaveType] || { label: r.leaveType, bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" };
            const initials = r.staffName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div key={r.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Card Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-50 bg-slate-50/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-blue-100 text-blue-700 border-2 border-blue-200">
                      {r.staffAvatar ? <img src={r.staffAvatar} alt={r.staffName} className="w-full h-full rounded-full object-cover" /> : initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{r.staffName}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Applied {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded border ${meta.bg} ${meta.text} ${meta.border}`}>{meta.label}</span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Duration Info */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">From</p>
                        <p className="text-sm font-bold text-slate-800">{new Date(r.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">To</p>
                        <p className="text-sm font-bold text-slate-800">{new Date(r.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Days</p>
                        <p className="text-sm font-black text-blue-700">{r.totalDays}d</p>
                      </div>
                    </div>
                    {/* Reason */}
                    <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Reason</p>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{r.reason}</p>
                    </div>
                  </div>

                  {/* Action Box */}
                  {statusFilter === "PENDING" && (
                    <div className="md:w-60 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 flex-shrink-0">
                      <div>
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                          <MessageSquare className="w-3 h-3" /> Comment (optional)
                        </label>
                        <textarea
                          rows={2} value={reviewNote}
                          onChange={(e) => setReviewNote(e.target.value)}
                          placeholder="Add a note..."
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs resize-none focus:border-blue-400 outline-none transition bg-white"
                        />
                      </div>
                      {actionError && (
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 bg-red-50 p-2 rounded-lg border border-red-100">
                          <AlertCircle className="w-3.5 h-3.5" /> {actionError}
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleReview(r.id, "reject")} disabled={!!reviewingId}
                          className="py-2 bg-white border border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" /> Reject
                        </button>
                        <button
                          onClick={() => handleReview(r.id, "approve")} disabled={!!reviewingId}
                          className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
