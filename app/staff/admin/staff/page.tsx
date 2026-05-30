"use client";

import { useState, useEffect } from "react";
import {
  Users, Mail, Briefcase, ShieldCheck, UserPlus, X,
  Search, Eye, EyeOff, AlertCircle, CheckCircle2,
  Building2, Calendar, Phone, GraduationCap, UserCheck,
  TrendingUp, Clock, UserX, Loader2
} from "lucide-react";

type StaffMember = {
  id: string;
  fullName: string;
  avatar: string | null;
  role: string;
  email: string;
  department: string | null;
  designation: string | null;
  joinDate: string | null;
};

type CreateForm = {
  role: "staff" | "student";
  fullName: string;
  email: string;
  password: string;
  phone: string;
  department: string;
  designation: string;
  joinDate: string;
  city: string;
  educationLevel: string;
};

const DEPARTMENTS = ["Management", "Counseling", "Marketing", "Operations", "Finance", "IT", "Academic", "General"];
const EDUCATION_LEVELS = ["High School", "Bachelor's", "Master's", "PhD", "Diploma", "Other"];

export default function AdminStaffOverviewPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [stats, setStats] = useState({ total: 0, present: 0, leave: 0, pending: 2 });
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [form, setForm] = useState<CreateForm>({
    role: "staff", fullName: "", email: "", password: "",
    phone: "", department: "General", designation: "",
    joinDate: new Date().toISOString().split("T")[0],
    city: "", educationLevel: "Bachelor's",
  });

  const fetchStaff = () => {
    setLoading(true);
    fetch("/api/admin/staff")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setStaff(d.data);
          setStats({
            total: d.data.length,
            present: Math.max(0, Math.round(d.data.length * 0.85)),
            leave: Math.round(d.data.length * 0.05),
            pending: 2,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStaff(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    try {
      const res = await fetch("/api/admin/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setCreateSuccess(`${form.role === "staff" ? "Staff" : "Student"} account created for ${form.fullName}`);
        setShowModal(false);
        setForm({ role: "staff", fullName: "", email: "", password: "", phone: "", department: "General", designation: "", joinDate: new Date().toISOString().split("T")[0], city: "", educationLevel: "Bachelor's" });
        fetchStaff();
        setTimeout(() => setCreateSuccess(null), 5000);
      } else {
        setCreateError(data.error || "Failed to create account");
      }
    } catch {
      setCreateError("Network error — please try again");
    } finally {
      setCreating(false);
    }
  };

  const filtered = staff.filter((s) =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.department || "").toLowerCase().includes(search.toLowerCase())
  );

  const STAT_CARDS = [
    { label: "Total Headcount", value: stats.total, icon: Users, color: "text-blue-600", bg: "from-blue-50 to-blue-100/50", border: "border-blue-200", dot: "bg-blue-500" },
    { label: "Active Today", value: stats.present, icon: UserCheck, color: "text-emerald-600", bg: "from-emerald-50 to-emerald-100/50", border: "border-emerald-200", dot: "bg-emerald-500" },
    { label: "On Leave", value: stats.leave, icon: Clock, color: "text-amber-600", bg: "from-amber-50 to-amber-100/50", border: "border-amber-200", dot: "bg-amber-500" },
    { label: "Pending Approvals", value: stats.pending, icon: TrendingUp, color: "text-purple-600", bg: "from-purple-50 to-purple-100/50", border: "border-purple-200", dot: "bg-purple-500" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Success Banner */}
      {createSuccess && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm font-semibold text-emerald-800">{createSuccess}</p>
          <button onClick={() => setCreateSuccess(null)} className="ml-auto text-emerald-400 hover:text-emerald-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#0D2040] to-[#0B3060] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #4f9cf9 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a78bfa 0%, transparent 40%)" }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-400/20">
                Admin Panel
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Staff Overview</h1>
            <p className="text-sm text-blue-200/80 mt-1.5 font-medium">
              Manage employees, create accounts, and monitor your team.
            </p>
          </div>
          <button
            onClick={() => { setShowModal(true); setCreateError(null); }}
            className="flex items-center gap-2.5 px-5 py-3 bg-white hover:bg-blue-50 text-[#0B1A2D] rounded-xl text-sm font-bold transition shadow-lg cursor-pointer w-fit shrink-0 group"
          >
            <UserPlus className="w-4.5 h-4.5 text-[#0070F0] group-hover:scale-110 transition-transform" />
            Create Account
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <div key={s.label} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{s.label}</span>
              <div className={`w-2 h-2 rounded-full ${s.dot} shadow-sm`} />
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-4xl font-black ${s.color}`}>{s.value}</span>
              <s.icon className={`w-5 h-5 ${s.color} mb-1 opacity-60`} />
            </div>
          </div>
        ))}
      </div>

      {/* Staff Directory Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Employee Directory</h3>
            <p className="text-xs text-slate-500 mt-0.5">All registered administrative and teaching staff.</p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, department..."
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-blue-100 border-t-[#0070F0] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <UserX className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-500">
              {search ? "No staff matching your search" : "No employees in directory yet"}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="mt-3 text-xs font-bold text-[#0070F0] hover:underline"
            >
              + Create first account
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="p-4 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Employee</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Designation</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Department</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Email</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Joined</th>
                  <th className="p-4 pr-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((s) => {
                  const initials = s.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
                  const isAdmin = s.role === "admin";
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 flex-shrink-0 ${
                            isAdmin ? "bg-red-100 text-red-700 border-red-200" : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}>
                            {s.avatar ? (
                              <img src={s.avatar} alt={s.fullName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-800 block leading-tight">{s.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">#{s.id.slice(0, 8).toUpperCase()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                          {s.designation || "Counselor"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                          {s.department || "General"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Mail className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                          {s.email}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-300 flex-shrink-0" />
                          {s.joinDate ? new Date(s.joinDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          isAdmin
                            ? "bg-red-50 text-red-700 border border-red-100"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        }`}>
                          <ShieldCheck className="w-3 h-3" />
                          {s.role}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Account Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B1A2D] to-[#0D2A5A] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Create Account</h2>
                <p className="text-xs text-blue-200 mt-0.5">Set up login credentials for a new team member or student</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1">
              <form onSubmit={handleCreate} className="p-6 space-y-5">
                {createError && (
                  <div className="flex items-start gap-2.5 p-3.5 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-100">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {createError}
                  </div>
                )}

                {/* Role toggle */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-2">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["staff", "student"] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setForm({ ...form, role: r })}
                        className={`py-2.5 rounded-xl border-2 text-sm font-bold transition flex items-center justify-center gap-2 ${
                          form.role === r
                            ? r === "staff" ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {r === "staff" ? <Briefcase className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                        {r === "staff" ? "Staff Member" : "Student"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Full Name *</label>
                    <input
                      required type="text" value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Email *</label>
                      <input
                        required type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@unifinders.com"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Phone</label>
                      <input
                        type="tel" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+977 98..."
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Password *</label>
                  <div className="relative">
                    <input
                      required type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Min 8 characters"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Role-specific fields */}
                {form.role === "staff" ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Department</label>
                      <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      >
                        {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Designation</label>
                      <input type="text" value={form.designation}
                        onChange={(e) => setForm({ ...form, designation: e.target.value })}
                        placeholder="e.g. Counselor"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Join Date</label>
                      <input type="date" value={form.joinDate}
                        onChange={(e) => setForm({ ...form, joinDate: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">City</label>
                      <input type="text" value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="e.g. Kathmandu"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Education Level</label>
                      <select value={form.educationLevel} onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                      >
                        {EDUCATION_LEVELS.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <button
                  type="submit" disabled={creating}
                  className="w-full py-3 bg-gradient-to-r from-[#0070F0] to-[#0055CC] hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
                >
                  {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                  {creating ? "Creating Account..." : `Create ${form.role === "staff" ? "Staff" : "Student"} Account`}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
