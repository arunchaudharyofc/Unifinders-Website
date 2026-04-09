"use client";

/**
 * ADMIN — APPOINTMENTS MANAGEMENT
 * View, confirm, cancel all appointment bookings.
 */
import { useState, useEffect } from "react";
import { Calendar, CheckCircle2, XCircle, Clock, Phone, Mail, Globe, Loader2, RefreshCw } from "lucide-react";

type Appointment = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  country: string | null;
  preferredDate: string;
  timeSlot: string;
  message: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
};

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  PENDING:   { label: "Pending",   cls: "bg-yellow-100 text-yellow-700" },
  CONFIRMED: { label: "Confirmed", cls: "bg-green-100 text-green-700" },
  CANCELLED: { label: "Cancelled", cls: "bg-red-100 text-red-600" },
  COMPLETED: { label: "Completed", cls: "bg-slate-100 text-slate-600" },
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/appointments");
      const data = await res.json();
      if (res.ok) {
        setAppointments(data.data?.appointments || []);
      } else {
        setError(data.error || "Failed to load appointments");
      }
    } catch {
      setError("Network error. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const updateStatus = async (id: string, status: string) => {
    setActionId(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: status as Appointment["status"] } : a));
      }
    } finally {
      setActionId(null);
    }
  };

  const filtered = filter === "ALL" ? appointments : appointments.filter(a => a.status === filter);
  const counts = {
    ALL: appointments.length,
    PENDING: appointments.filter(a => a.status === "PENDING").length,
    CONFIRMED: appointments.filter(a => a.status === "CONFIRMED").length,
    CANCELLED: appointments.filter(a => a.status === "CANCELLED").length,
  };

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">Review and manage counseling requests</p>
        </div>
        <button onClick={fetchAppointments} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {Object.entries(counts).map(([key, count]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 ${
              filter === key ? "bg-[#0070F0] text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:border-[#0070F0]"
            }`}>
            {key === "ALL" ? "All" : STATUS_STYLES[key].label}
            <span className={`text-xs rounded-full px-2 py-0.5 ${filter === key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>
      )}

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-slate-300 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-20 text-center">
          <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">No appointments found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(appt => {
            const s = STATUS_STYLES[appt.status];
            return (
              <div key={appt.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">{appt.fullName}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.cls}`}>{s.label}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-1 text-sm text-slate-500">
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{appt.email}</span>
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{appt.phone}</span>
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />
                        {new Date(appt.preferredDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {appt.timeSlot}
                      </span>
                      {appt.country && <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />{appt.country}</span>}
                    </div>
                    <p className="text-xs font-semibold text-[#0070F0] mt-1">{appt.service}</p>
                    {appt.message && (
                      <p className="text-xs text-slate-400 mt-1 italic line-clamp-1">"{appt.message}"</p>
                    )}
                  </div>

                  {/* Actions */}
                  {appt.status === "PENDING" && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => updateStatus(appt.id, "CONFIRMED")} disabled={actionId === appt.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-xs rounded-lg transition">
                        {actionId === appt.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        Confirm
                      </button>
                      <button onClick={() => updateStatus(appt.id, "CANCELLED")} disabled={actionId === appt.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-lg transition">
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  )}
                  {appt.status === "CONFIRMED" && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => updateStatus(appt.id, "COMPLETED")} disabled={actionId === appt.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg transition">
                        <Clock className="w-3.5 h-3.5" /> Mark Complete
                      </button>
                      <button onClick={() => updateStatus(appt.id, "CANCELLED")} disabled={actionId === appt.id}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-xs rounded-lg transition">
                        <XCircle className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-3">
                  Received {new Date(appt.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
