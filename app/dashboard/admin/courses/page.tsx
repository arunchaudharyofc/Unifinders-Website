"use client";
/**
 * ADMIN — COURSES CMS
 */
import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Edit2, Loader2, GraduationCap, RefreshCw, Globe, Clock, Banknotes } from "lucide-react";

type CourseRow = { id: string; title: string; degree: string | null; university: string | null; country: string | null; duration: string | null; fee: string | null; status: string; };

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", degree: "", university: "", country: "", duration: "", fee: "", intake: "", description: "", imageUrl: "", applyUrl: "", status: "DRAFT" });

  const fetch_ = async () => {
    setLoading(true);
    try { const res = await fetch("/api/admin/courses"); const d = await res.json(); setCourses(d.data?.courses || d.courses || []); }
    catch { } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true); setError(null);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Failed to create course"); }
      else { setShowForm(false); setForm({ title: "", degree: "", university: "", country: "", duration: "", fee: "", intake: "", description: "", imageUrl: "", applyUrl: "", status: "DRAFT" }); fetch_(); }
    } catch { setError("Network error"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
    fetch_();
  };

  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.university?.toLowerCase().includes(search.toLowerCase()));

  const inp = "w-full h-10 px-3 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100";

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold text-slate-900">Courses CMS</h1><p className="text-sm text-slate-500 mt-0.5">Manage study programs and degrees</p></div>
        <div className="flex gap-2">
          <button onClick={fetch_} className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /></button>
          <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 px-4 py-2 bg-[#1D4ED8] hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition">
            <Plus className="w-4 h-4" /> Add Course
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="font-bold text-slate-900 mb-4">New Course</h2>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handleCreate} className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Course Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="MSc Computer Science" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Degree Level</label>
              <input value={form.degree} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} placeholder="Master's" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">University *</label>
              <input required value={form.university} onChange={e => setForm(f => ({ ...f, university: e.target.value }))} placeholder="University of Sydney" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Country</label>
              <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} placeholder="Australia" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Duration</label>
              <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} placeholder="2 Years" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Tuition Fee (Approx)</label>
              <input value={form.fee} onChange={e => setForm(f => ({ ...f, fee: e.target.value }))} placeholder="$35,000 / year" className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Intake Months</label>
              <input value={form.intake} onChange={e => setForm(f => ({ ...f, intake: e.target.value }))} placeholder="Feb, July" className={inp} /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Program overview..." className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-[#1D4ED8] resize-none" /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Apply URL</label>
              <input value={form.applyUrl} onChange={e => setForm(f => ({ ...f, applyUrl: e.target.value }))} placeholder="https://..." className={inp} /></div>
            <div><label className="block text-xs font-semibold text-slate-600 mb-1">Status</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className={inp}>
                <option value="DRAFT">Draft</option><option value="PUBLISHED">Published</option>
              </select></div>
            <div className="sm:col-span-2 flex gap-3 justify-end">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50">Cancel</button>
              <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-[#1D4ED8] text-white text-sm font-bold rounded-xl disabled:opacity-60">
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : "Add Course"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search courses or universities..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1D4ED8]" /></div>
        </div>
        {loading ? (
          <div className="py-16 text-center"><Loader2 className="w-8 h-8 text-slate-200 mx-auto animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center"><GraduationCap className="w-10 h-10 text-slate-200 mx-auto mb-3" /><p className="text-slate-500 text-sm">No courses yet. Add your first program!</p></div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map(c => (
              <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition">
                <div>
                  <p className="font-semibold text-sm text-slate-900">{c.title}</p>
                  <p className="text-xs font-medium text-[#1D4ED8] mt-0.5">{c.university}</p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {c.degree && <span className="text-xs text-slate-500 font-medium px-2 py-0.5 bg-slate-100 rounded-md">{c.degree}</span>}
                    {c.country && <span className="text-xs text-slate-400 flex items-center gap-1"><Globe className="w-3 h-3" />{c.country}</span>}
                    {c.duration && <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{c.duration}</span>}
                    {c.fee && <span className="text-xs text-slate-400 flex items-center gap-1">💰 {c.fee}</span>}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${c.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>{c.status}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-slate-400 hover:text-[#1D4ED8] hover:bg-blue-50 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(c.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
