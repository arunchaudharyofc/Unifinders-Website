"use client";

import { useState, useEffect } from "react";
import {
  Plus, CheckSquare, Trash2, X, AlertTriangle, User,
  ListTodo, Circle, Clock, CheckCircle2, Calendar
} from "lucide-react";

type StaffMember = { id: string; fullName: string; avatar: string | null };
type Task = {
  id: string; title: string; description: string | null; status: string;
  priority: string; dueDate: string | null; staffName: string;
  staffAvatar: string | null; staffUserId: string;
};

const PRIORITY_META: Record<string, { bg: string; text: string; border: string }> = {
  URGENT: { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-100" },
  HIGH:   { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-100" },
  MEDIUM: { bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-100" },
  LOW:    { bg: "bg-slate-50",  text: "text-slate-600",  border: "border-slate-100" },
};

const STATUS_META: Record<string, { bg: string; text: string; border: string; label: string; icon: React.ElementType }> = {
  TODO:        { bg: "bg-slate-50",   text: "text-slate-600",   border: "border-slate-200",   label: "To Do",      icon: Circle },
  IN_PROGRESS: { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    label: "In Progress", icon: Clock },
  DONE:        { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Done",        icon: CheckCircle2 },
  CANCELLED:   { bg: "bg-slate-100",  text: "text-slate-500",   border: "border-slate-200",   label: "Cancelled",   icon: X },
};

export default function AdminTaskManagerPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "", staffUserId: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");

  const fetchAllData = () => {
    setLoading(true);
    fetch("/api/admin/staff").then((r) => r.json()).then((d) => { if (d.success) setStaff(d.data); }).catch(() => {});
    fetch("/api/admin/staff/tasks").then((r) => r.json()).then((d) => { if (d.success) setTasks(d.data); }).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAllData(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/admin/staff/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setFormData({ title: "", description: "", priority: "MEDIUM", dueDate: "", staffUserId: "" });
        fetchAllData();
      } else setSubmitError(data.error || "Failed to assign task");
    } catch { setSubmitError("Network error. Please try again."); }
    setSubmitting(false);
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`/api/staff/tasks/${id}`, { method: "DELETE" });
    fetchAllData();
  };

  const TABS = [
    { key: "ALL",         label: "All",         count: tasks.length },
    { key: "TODO",        label: "To Do",        count: tasks.filter((t) => t.status === "TODO").length },
    { key: "IN_PROGRESS", label: "In Progress",  count: tasks.filter((t) => t.status === "IN_PROGRESS").length },
    { key: "DONE",        label: "Done",         count: tasks.filter((t) => t.status === "DONE").length },
  ];
  const filtered = filterStatus === "ALL" ? tasks : tasks.filter((t) => t.status === filterStatus);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#1a2e50] to-[#0B3060] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 60% 30%, #818cf8 0%, transparent 40%)" }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-400/20">Team Tasks</span>
            <h1 className="text-3xl font-black text-white mt-2">Task Manager</h1>
            <p className="text-sm text-blue-200/80 mt-1 font-medium">Assign tasks, monitor workflow progression, and manage team deliverables.</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setSubmitError(null); }}
            className="flex items-center gap-2.5 px-5 py-3 bg-white hover:bg-indigo-50 text-[#0B1A2D] rounded-xl text-sm font-bold transition shadow-lg cursor-pointer w-fit shrink-0 group"
          >
            <Plus className="w-4.5 h-4.5 text-indigo-600 group-hover:scale-110 transition-transform" />
            Assign Task
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
              filterStatus === tab.key
                ? "bg-[#0B1A2D] text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            {tab.label}
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
              filterStatus === tab.key ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
            }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Task Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">Active Task Deliverables</h3>
          <p className="text-xs text-slate-500 mt-0.5">Live progression of assigned deliverables across your team.</p>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-blue-100 border-t-[#0070F0] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <ListTodo className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-500">No tasks found for this filter</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="p-4 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Deliverable</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Assignee</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Due Date</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Priority</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="p-4 pr-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((t) => {
                  const p = PRIORITY_META[t.priority] || PRIORITY_META.MEDIUM;
                  const s = STATUS_META[t.status] || STATUS_META.TODO;
                  const initials = t.staffName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 pl-6">
                        <span className="text-sm font-bold text-slate-800 block">{t.title}</span>
                        {t.description && <span className="text-xs text-slate-400 mt-0.5 block max-w-xs truncate">{t.description}</span>}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-blue-100 text-blue-700 border border-blue-200 flex-shrink-0">
                            {t.staffAvatar ? <img src={t.staffAvatar} alt={t.staffName} className="w-full h-full rounded-full object-cover" /> : initials}
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{t.staffName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        {t.dueDate ? (
                          <span className="flex items-center gap-1.5 text-sm text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-slate-300" />
                            {new Date(t.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        ) : <span className="text-slate-300 text-xs italic">No deadline</span>}
                      </td>
                      <td className="p-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${p.bg} ${p.text} ${p.border}`}>{t.priority}</span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                          <s.icon className="w-3 h-3" /> {s.label}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button onClick={() => deleteTask(t.id)} className="p-1.5 hover:bg-red-50 hover:text-red-600 text-slate-300 rounded-lg transition cursor-pointer" title="Delete task">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Assign Task Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#0B1A2D] to-[#1a2e50] p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Assign New Task</h2>
                <p className="text-xs text-blue-200 mt-0.5">Delegate a deliverable to a staff member</p>
              </div>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              {submitError && (
                <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-100">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" /> {submitError}
                </div>
              )}
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Assign To *</label>
                <select required value={formData.staffUserId} onChange={(e) => setFormData({ ...formData, staffUserId: e.target.value })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                >
                  <option value="">Select Staff Assignee...</option>
                  {staff.map((s) => <option key={s.id} value={s.id}>{s.fullName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Task Title *</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Schedule university admissions call"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Description</label>
                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add checklists or guidelines..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Priority</label>
                  <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-400 outline-none transition"
                  >
                    <option value="LOW">Low</option><option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option><option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Due Date</label>
                  <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-blue-400 outline-none transition"
                  />
                </div>
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-[#0070F0] to-[#0055CC] text-white font-bold rounded-xl text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm"
              >
                {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckSquare className="w-4 h-4" />}
                {submitting ? "Assigning..." : "Delegate Work Deliverable"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
