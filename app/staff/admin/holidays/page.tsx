"use client";

import { useState, useEffect } from "react";
import { Calendar, Plus, X, AlertCircle, Trash2 } from "lucide-react";

type Holiday = { id: string; name: string; date: string; type: string; isOptional: boolean };

const TYPE_META: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  PUBLIC:     { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-100",    dot: "bg-red-500" },
  RELIGIOUS:  { bg: "bg-amber-50",  text: "text-amber-700",  border: "border-amber-100",  dot: "bg-amber-500" },
  COMPANY:    { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-100",   dot: "bg-blue-500" },
  RESTRICTED: { bg: "bg-slate-100", text: "text-slate-600",  border: "border-slate-200",  dot: "bg-slate-500" },
};

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminHolidaysPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", type: "PUBLIC", isOptional: false });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHolidays = () => {
    setLoading(true);
    fetch("/api/staff/calendar")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.holidays) setHolidays(d.data.holidays);
        else setHolidays([
          { id: "1", name: "New Year Celebration", date: "2026-01-01", type: "PUBLIC", isOptional: false },
          { id: "2", name: "Labor Day", date: "2026-05-01", type: "PUBLIC", isOptional: false },
          { id: "3", name: "Buddha Jayanti", date: "2026-05-25", type: "RELIGIOUS", isOptional: false },
        ]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchHolidays(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/staff/holidays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setFormData({ name: "", date: "", type: "PUBLIC", isOptional: false });
        fetchHolidays();
      } else setError(data.error || "Failed to create holiday");
    } catch { setError("Network error"); }
    setSubmitting(false);
  };

  // Group holidays by month
  const grouped = holidays.reduce<Record<string, Holiday[]>>((acc, h) => {
    const d = new Date(h.date);
    const key = `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(h);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#1a2e50] to-[#0B3060] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #f59e0b 0%, transparent 40%), radial-gradient(circle at 80% 20%, #ef4444 0%, transparent 40%)" }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 bg-red-500/20 text-red-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-400/20">Holiday Calendar</span>
            <h1 className="text-3xl font-black text-white mt-2">Holiday Manager</h1>
            <p className="text-sm text-blue-200/80 mt-1 font-medium">Declare official public, company, and optional holidays for all staff.</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setError(null); }}
            className="flex items-center gap-2.5 px-5 py-3 bg-white hover:bg-red-50 text-[#0B1A2D] rounded-xl text-sm font-bold transition shadow-lg cursor-pointer w-fit shrink-0 group"
          >
            <Plus className="w-4.5 h-4.5 text-red-500 group-hover:scale-110 transition-transform" />
            Declare Holiday
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(TYPE_META).map(([type, meta]) => {
          const count = holidays.filter((h) => h.type === type).length;
          return (
            <div key={type} className={`${meta.bg} border ${meta.border} rounded-2xl p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-2 h-2 rounded-full ${meta.dot}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest ${meta.text}`}>{type}</span>
              </div>
              <span className={`text-3xl font-black ${meta.text}`}>{count}</span>
            </div>
          );
        })}
      </div>

      {/* Holiday Calendar Grid */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Registered Holidays</h3>
            <p className="text-xs text-slate-500 mt-0.5">{holidays.length} holidays declared this year</p>
          </div>
        </div>

        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-blue-100 border-t-[#0070F0] rounded-full animate-spin" />
          </div>
        ) : holidays.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-500">No holidays declared yet</p>
          </div>
        ) : (
          <div className="p-5 space-y-6">
            {Object.entries(grouped).sort(([a], [b]) => {
              const parse = (k: string) => new Date(k);
              return parse(a).getTime() - parse(b).getTime();
            }).map(([monthKey, hs]) => (
              <div key={monthKey}>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {monthKey}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((h) => {
                    const d = new Date(h.date);
                    const meta = TYPE_META[h.type] || TYPE_META.PUBLIC;
                    return (
                      <div key={h.id} className={`flex items-center gap-4 p-4 rounded-xl border ${meta.border} ${meta.bg} hover:shadow-sm transition-shadow`}>
                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center border-2 ${meta.border} bg-white flex-shrink-0 shadow-sm`}>
                          <span className={`text-[8px] font-black uppercase ${meta.text}`}>{MONTH_NAMES[d.getMonth()]}</span>
                          <span className={`text-xl font-black leading-none ${meta.text}`}>{d.getDate()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-slate-800 truncate">{h.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded ${meta.bg} ${meta.text} border ${meta.border}`}>
                              {h.type}
                            </span>
                            {h.isOptional && (
                              <span className="text-[9px] font-bold text-slate-400 italic">Optional</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Declare Holiday Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#0B1A2D] to-[#0D2A5A] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Declare Holiday</h2>
                <p className="text-xs text-blue-200 mt-0.5">Declare a day off for all staff members</p>
              </div>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-100">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Holiday Name *</label>
                <input required type="text" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Buddha Jayanti, Dashain Festival"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Date *</label>
                <input required type="date" value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-400 outline-none transition"
                  >
                    <option value="PUBLIC">Public</option>
                    <option value="RELIGIOUS">Religious</option>
                    <option value="COMPANY">Company</option>
                    <option value="RESTRICTED">Restricted</option>
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer py-2">
                    <input type="checkbox" checked={formData.isOptional}
                      onChange={(e) => setFormData({ ...formData, isOptional: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-400 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-700">Optional Holiday</span>
                  </label>
                </div>
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-[#0070F0] to-[#0055CC] text-white font-bold rounded-xl text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
              >
                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Calendar className="w-4 h-4" />}
                {submitting ? "Declaring..." : "Declare Holiday"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
