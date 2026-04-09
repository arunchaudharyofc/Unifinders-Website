"use client";
/**
 * ADMIN — STUDENTS MANAGEMENT
 * View all registered students and their progress.
 */
import { useState, useEffect } from "react";
import { Search, Loader2, Users, Mail, Phone, Globe, CheckCircle2, Clock, RefreshCw } from "lucide-react";

type StudentRow = {
  id: string; userId: string; firstName: string; lastName: string; email: string;
  phone: string | null; targetCountry: string | null; studyLevel: string | null;
  onboardingComplete: boolean; createdAt: string; role: string;
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetch_ = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch("/api/admin/students");
      const d = await res.json();
      if (res.ok) setStudents(d.data?.students || d.students || []);
      else setError(d.error || "Failed to load students");
    } catch { setError("Network error"); } finally { setLoading(false); }
  };
  useEffect(() => { fetch_(); }, []);

  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    return `${s.firstName} ${s.lastName} ${s.email}`.toLowerCase().includes(q);
  });

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`)) return;
    try {
      const res = await fetch(`/api/admin/students/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) await fetch_();
      else alert("Failed to change role");
    } catch {
      alert("Network error updating role");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Students</h1>
          <p className="text-slate-500 text-sm mt-0.5">All registered students — {students.length} total</p>
        </div>
        <button onClick={fetch_} disabled={loading} className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative"><Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1D4ED8]" /></div>
        </div>

        {loading ? (
          <div className="py-20 text-center"><Loader2 className="w-8 h-8 text-slate-200 mx-auto animate-spin" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Users className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">{search ? "No students match your search" : "No students registered yet"}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Target</th>
                  <th className="px-5 py-3">Level</th>
                  <th className="px-5 py-3">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-[#1D4ED8] shrink-0">
                          {s.firstName?.[0]}{s.lastName?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-slate-900">{s.firstName} {s.lastName}</p>
                          <p className="text-xs text-slate-400">{s.userId.slice(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <select 
                        value={s.role} 
                        onChange={(e) => handleRoleChange(s.userId, e.target.value)}
                        className={`text-xs font-bold rounded-lg border py-1 px-2 outline-none transition ${
                          s.role === "admin" ? "bg-purple-50 text-purple-700 border-purple-200" :
                          s.role === "staff" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          s.role === "counselor" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                          "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        <option value="student">Student</option>
                        <option value="counselor">Counselor</option>
                        <option value="staff">Staff</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-xs text-slate-600 flex items-center gap-1"><Mail className="w-3 h-3" />{s.email}</p>
                      {s.phone && <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" />{s.phone}</p>}
                    </td>
                    <td className="px-5 py-3">
                      {s.targetCountry ? (
                        <span className="text-xs font-semibold text-slate-700 flex items-center gap-1"><Globe className="w-3 h-3 text-slate-400" />{s.targetCountry}</span>
                      ) : <span className="text-xs text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs text-slate-600">{s.studyLevel || "—"}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs text-slate-400">{new Date(s.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
