"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2, XCircle, Clock, MessageSquare,
  AlertCircle, User, ChevronRight
} from "lucide-react";

type RegularizationRequest = {
  id: string; date: string; notes: string; staffName: string; staffAvatar: string | null;
  reqData: { type: string; checkIn: string; checkOut: string; reason: string; } | null;
};

export default function AdminAttendancePage() {
  const [requests, setRequests] = useState<RegularizationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchRequests = () => {
    setLoading(true);
    fetch("/api/admin/staff/attendance/regularize")
      .then((r) => r.json())
      .then((d) => { if (d.success) setRequests(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleReview = async (id: string, action: "approve" | "reject") => {
    setReviewingId(id);
    setActionError(null);
    try {
      const res = await fetch("/api/admin/staff/attendance/regularize", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, adminNote }),
      });
      const data = await res.json();
      if (data.success) { setAdminNote(""); fetchRequests(); }
      else setActionError(data.error || "Failed to submit review");
    } catch {
      setActionError("Network error during action");
    }
    setReviewingId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#1a2e50] to-[#0B3060] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 40%)" }} />
        <div className="relative z-10">
          <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-400/20">Attendance</span>
          <h1 className="text-3xl font-black text-white mt-2">Attendance Corrections</h1>
          <p className="text-sm text-blue-200/80 mt-1 font-medium">Review and approve employee requests for missing check-in/out logs.</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="h-64 flex items-center justify-center bg-white rounded-2xl border border-slate-100">
          <div className="w-10 h-10 border-2 border-blue-100 border-t-[#0070F0] rounded-full animate-spin" />
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          </div>
          <p className="text-base font-bold text-slate-700">All caught up!</p>
          <p className="text-sm text-slate-400 mt-1">No pending regularization requests at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {requests.map((r) => {
            const initials = r.staffName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div key={r.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Card Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-50 bg-amber-50/40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-amber-100 text-amber-700 border-2 border-amber-200">
                      {r.staffAvatar ? <img src={r.staffAvatar} alt={r.staffName} className="w-full h-full rounded-full object-cover" /> : initials}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{r.staffName}</h3>
                      <p className="text-[10px] text-slate-400 font-semibold">Regularization Request</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded border border-amber-200 uppercase tracking-wider">Pending Review</span>
                </div>

                <div className="p-5 flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-1 space-y-4">
                    {r.reqData && (
                      <>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                            <p className="text-sm font-bold text-slate-800">
                              {new Date(r.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                            </p>
                          </div>
                          <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                            <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Check In</p>
                            <p className="text-sm font-bold text-blue-700">{r.reqData.checkIn}</p>
                          </div>
                          <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">Check Out</p>
                            <p className="text-sm font-bold text-indigo-700">{r.reqData.checkOut}</p>
                          </div>
                        </div>
                        <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Reason</p>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">{r.reqData.reason}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action Box */}
                  <div className="md:w-60 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3 flex-shrink-0">
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
                        <MessageSquare className="w-3 h-3" /> Comment (optional)
                      </label>
                      <textarea
                        rows={2} value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
