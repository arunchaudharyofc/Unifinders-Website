"use client";
/**
 * ADMIN — EVENTS CMS
 */
import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit2, Loader2, Calendar, MapPin, RefreshCw } from "lucide-react";

type EventRow = { id: string; title: string; location: string | null; status: string; startDate: string; createdAt: string; };

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", location: "", startDate: "", endDate: "", imageUrl: "", status: "DRAFT" });
  const [error, setError] = useState<string | null>(null);

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/events");
      const d = await res.json();
      setEvents(d.data?.events || d.events || []);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetch_(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startDate: new Date(form.startDate).toISOString(), endDate: form.endDate ? new Date(form.endDate).toISOString() : null }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Failed to create event"); }
      else { setShowForm(false); setForm({ title: "", description: "", location: "", startDate: "", endDate: "", imageUrl: "", status: "DRAFT" }); fetch_(); }
    } catch { setError("Network error"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    fetch_();
  };

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Events CMS</h1><p className="text-sm text-slate-500 mt-0.5">Manage education fairs and workshops</p></div>
        <div className="flex gap-2">
          <button onClick={fetch_} className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /></button>
          <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition">
            <Plus className="w-4 h-4" /> Create Event
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">New Event</h2>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="International Education Fair" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Event description..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date *</label>
              <input required type="datetime-local" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">End Date</label>
              <input type="datetime-local" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="Kathmandu, Nepal" className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8]">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Cover Image URL</label>
              <input value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="https://..." className="w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8]" />
            </div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search + List */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1D4ED8]" />
          </div>
        </div>
        {loading ? (
          <div className="py-16 text-center"><Loader2 className="w-8 h-8 text-slate-200 mx-auto animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center"><Calendar className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-slate-500 text-sm">No events found</p><p className="text-slate-400 text-xs mt-1">Create your first event using the button above</p></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map(ev => (
              <div key={ev.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition">
                <div>
                  <p className="font-semibold text-sm text-slate-900">{ev.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {ev.location && <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{ev.location}</span>}
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(ev.startDate).toLocaleDateString()}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${ev.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{ev.status}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-[#1D4ED8] hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
