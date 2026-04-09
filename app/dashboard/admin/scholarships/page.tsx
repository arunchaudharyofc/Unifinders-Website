"use client";
/**
 * ADMIN — SCHOLARSHIPS CMS
 */
import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit2, Loader2, Bookmark, DollarSign, RefreshCw, Globe } from "lucide-react";

type ScholarRow = { id: string; title: string; provider: string; country: string | null; amount: string | null; status: string; deadline: string | null; };

export default function AdminScholarshipsPage() {
  const [items, setItems] = useState<ScholarRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", provider: "", country: "", amount: "", deadline: "", description: "", eligibility: "", coverageDetails: "", applyUrl: "", status: "DRAFT" });

  const fetch_ = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/scholarships"); const d = await res.json(); setItems(d.data?.scholarships || d.scholarships || []); }
    catch { } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null);
    try {
      const res = await fetch("/api/admin/scholarships", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, deadline: form.deadline ? new Date(form.deadline).toISOString() : null }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Failed to create"); }
      else { setShowForm(false); setForm({ title: "", provider: "", country: "", amount: "", deadline: "", description: "", eligibility: "", coverageDetails: "", applyUrl: "", status: "DRAFT" }); fetch_(); }
    } catch { setError("Network error"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this scholarship?")) return;
    await fetch(`/api/admin/scholarships/${id}`, { method: "DELETE" });
    fetch_();
  };

  const filtered = items.filter(s => s.title.toLowerCase().includes(search.toLowerCase()) || s.provider?.toLowerCase().includes(search.toLowerCase()));

  const inp = "w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100";

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Scholarships CMS</h1><p className="text-sm text-slate-500 mt-0.5">Manage scholarship listings</p></div>
        <div className="flex gap-2">
          <button onClick={fetch_} className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /></button>
          <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition">
            <Plus className="w-4 h-4" /> Add Scholarship
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">New Scholarship</h2>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Chevening Scholarship 2026" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Provider *</label>
              <input required value={form.provider} onChange={e => setForm(f => ({ ...f, provider: e.target.value }))} placeholder="UK Government" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
              <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="United Kingdom" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Amount / Coverage</label>
              <input value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} placeholder="Full tuition + living" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Deadline</label>
              <input type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} className={inp} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Scholarship overview..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] resize-none" /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Apply URL</label>
              <input value={form.applyUrl} onChange={e => setForm(f => ({ ...f, applyUrl: e.target.value }))} placeholder="https://..." className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inp}>
                <option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option>
              </select></div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1D4ED8] text-white text-sm font-bold rounded-xl disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : "Add Scholarship"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search scholarships..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1D4ED8]" /></div>
        </div>
        {loading ? (
          <div className="py-16 text-center"><Loader2 className="w-8 h-8 text-slate-200 mx-auto animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center"><Bookmark className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-slate-500 text-sm">No scholarships yet. Add your first one!</p></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map(s => (
              <div key={s.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition">
                <div>
                  <p className="font-semibold text-sm text-slate-900">{s.title}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-slate-400">{s.provider}</span>
                    {s.country && <span className="text-xs text-slate-400 flex items-center gap-1"><Globe className="w-3 h-3" />{s.country}</span>}
                    {s.amount && <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1"><DollarSign className="w-3 h-3" />{s.amount}</span>}
                    {s.deadline && <span className="text-xs text-orange-500">{new Date(s.deadline).toLocaleDateString()}</span>}
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${s.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{s.status}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-[#1D4ED8] hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
