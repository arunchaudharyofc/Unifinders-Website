"use client";
/**
 * ADMIN — UNIVERSITIES CMS
 */
import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit2, Loader2, Building, RefreshCw, Globe, MapPin, Users } from "lucide-react";

type UniRow = { id: string; name: string; country: string | null; city: string | null; rank: number | null; status: string; };

export default function AdminUniversitiesPage() {
  const [items, setItems] = useState<UniRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", country: "", city: "", rank: "", description: "", logoUrl: "", coverUrl: "", establishedYear: "", studentCount: "", internationalStudents: "", status: "DRAFT" });

  const fetch_ = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/universities"); const d = await res.json(); setItems(d.data?.universities || d.universities || []); }
    catch { } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null);
    try {
      const res = await fetch("/api/admin/universities", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rank: form.rank ? parseInt(form.rank, 10) : null }),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Failed to create university"); }
      else { setShowForm(false); setForm({ name: "", country: "", city: "", rank: "", description: "", logoUrl: "", coverUrl: "", establishedYear: "", studentCount: "", internationalStudents: "", status: "DRAFT" }); fetch_(); }
    } catch { setError("Network error"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this university?")) return;
    await fetch(`/api/admin/universities/${id}`, { method: "DELETE" });
    fetch_();
  };

  const filtered = items.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.country?.toLowerCase().includes(search.toLowerCase()));

  const inp = "w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100";

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Universities CMS</h1><p className="text-sm text-slate-500 mt-0.5">Manage partner institutions</p></div>
        <div className="flex gap-2">
          <button onClick={fetch_} className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /></button>
          <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition">
            <Plus className="w-4 h-4" /> Add University
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-slate-900 mb-4">New University</h2>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">University Name *</label>
              <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="University of Sydney" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
              <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="Australia" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">City</label>
              <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Sydney" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Global Rank</label>
              <input type="number" value={form.rank} onChange={e => setForm(f => ({ ...f, rank: e.target.value }))} placeholder="1" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Established Year</label>
              <input value={form.establishedYear} onChange={e => setForm(f => ({ ...f, establishedYear: e.target.value }))} placeholder="1850" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Total Students</label>
              <input value={form.studentCount} onChange={e => setForm(f => ({ ...f, studentCount: e.target.value }))} placeholder="70000" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Intl. Students</label>
              <input value={form.internationalStudents} onChange={e => setForm(f => ({ ...f, internationalStudents: e.target.value }))} placeholder="25000" className={inp} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">About / Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="About the university..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] resize-none" /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Logo URL</label>
              <input value={form.logoUrl} onChange={e => setForm(f => ({ ...f, logoUrl: e.target.value }))} placeholder="https://..." className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inp}>
                <option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option>
              </select></div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1D4ED8] text-white text-sm font-bold rounded-xl disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : "Add University"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search universities or countries..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1D4ED8]" /></div>
        </div>
        {loading ? (
          <div className="py-16 text-center"><Loader2 className="w-8 h-8 text-slate-200 mx-auto animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center"><Building className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-slate-500 text-sm">No universities listed yet.</p></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map(u => (
              <div key={u.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition">
                <div>
                  <p className="font-semibold text-sm text-slate-900">{u.name}</p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {u.country && <span className="text-xs text-slate-500 font-medium flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" />{u.country}</span>}
                    {u.city && <span className="text-xs text-slate-500 font-medium flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-400" />{u.city}</span>}
                    {u.rank && <span className="text-xs font-semibold text-amber-600 px-2 py-0.5 bg-amber-50 rounded-md">Rank #{u.rank}</span>}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${u.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{u.status}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-[#1D4ED8] hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(u.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
