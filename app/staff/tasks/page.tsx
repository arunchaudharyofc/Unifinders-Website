"use client";

import { useState, useEffect } from "react";
import { Plus, CheckSquare, Clock, Circle, AlertTriangle, Trash2, ChevronDown, X } from "lucide-react";

type Task = {
  id: string; title: string; description: string | null; status: string;
  priority: string; category: string | null; dueDate: string | null;
  completedAt: string | null; createdAt: string;
};

const STATUS_COLS = [
  { key: "TODO", label: "To Do", icon: Circle, color: "border-slate-300", bg: "bg-slate-50" },
  { key: "IN_PROGRESS", label: "In Progress", icon: Clock, color: "border-blue-300", bg: "bg-blue-50" },
  { key: "DONE", label: "Done", icon: CheckSquare, color: "border-emerald-300", bg: "bg-emerald-50" },
];

const PRIORITY_BADGE: Record<string, { bg: string; text: string }> = {
  URGENT: { bg: "bg-red-100", text: "text-red-700" },
  HIGH: { bg: "bg-orange-100", text: "text-orange-700" },
  MEDIUM: { bg: "bg-blue-100", text: "text-blue-700" },
  LOW: { bg: "bg-slate-100", text: "text-slate-600" },
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchTasks = () => {
    fetch("/api/staff/tasks").then((r) => r.json()).then((d) => { if (d.success) setTasks(d.data); }).catch(() => {});
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/staff/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      setShowForm(false);
      setFormData({ title: "", description: "", priority: "MEDIUM", dueDate: "" });
      fetchTasks();
    }
    setSubmitting(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/staff/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Delete this task?")) return;
    await fetch(`/api/staff/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const todayCompleted = tasks.filter((t) => t.status === "DONE" && t.completedAt && new Date(t.completedAt).toDateString() === new Date().toDateString()).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Tasks</h1>
          <p className="text-sm text-slate-500 mt-1">
            {todayCompleted} task{todayCompleted !== 1 ? "s" : ""} completed today · {tasks.filter((t) => t.status !== "DONE" && t.status !== "CANCELLED").length} pending
          </p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold transition shadow-sm">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {STATUS_COLS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          const ColIcon = col.icon;
          return (
            <div key={col.key} className={`rounded-2xl border ${col.color} ${col.bg} min-h-[300px]`}>
              <div className="p-4 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <ColIcon className="w-4 h-4 text-slate-500" />
                  <h3 className="text-sm font-bold text-slate-800">{col.label}</h3>
                  <span className="ml-auto text-xs font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded-full">{colTasks.length}</span>
                </div>
              </div>
              <div className="p-3 space-y-3">
                {colTasks.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-8">No tasks</p>
                ) : (
                  colTasks.map((t) => {
                    const pBadge = PRIORITY_BADGE[t.priority] || PRIORITY_BADGE.MEDIUM;
                    return (
                      <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition group">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-slate-800 flex-1">{t.title}</p>
                          <button onClick={() => deleteTask(t.id)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                        </div>
                        {t.description && <p className="text-xs text-slate-400 mb-2 line-clamp-2">{t.description}</p>}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pBadge.bg} ${pBadge.text}`}>{t.priority}</span>
                          {t.dueDate && (
                            <span className="text-[10px] text-slate-400">
                              Due: {new Date(t.dueDate).toLocaleDateString("en", { month: "short", day: "numeric" })}
                            </span>
                          )}
                        </div>
                        {/* Status Buttons */}
                        <div className="flex gap-1 mt-3">
                          {col.key !== "TODO" && (
                            <button onClick={() => updateStatus(t.id, col.key === "IN_PROGRESS" ? "TODO" : "IN_PROGRESS")}
                              className="text-[10px] px-2 py-1 rounded bg-slate-100 text-slate-500 hover:bg-slate-200 transition font-medium">
                              ← {col.key === "IN_PROGRESS" ? "Todo" : "In Progress"}
                            </button>
                          )}
                          {col.key !== "DONE" && (
                            <button onClick={() => updateStatus(t.id, col.key === "TODO" ? "IN_PROGRESS" : "DONE")}
                              className="text-[10px] px-2 py-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition font-medium">
                              {col.key === "TODO" ? "Start" : "Done"} →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Task Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">New Task</h2>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded-lg transition"><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Title</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What needs to be done?" className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description (optional)</label>
                <textarea rows={2} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add details..." className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
                  <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none">
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Due Date</label>
                  <input type="date" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none" />
                </div>
              </div>
              <button type="submit" disabled={submitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition disabled:opacity-50">
                {submitting ? "Creating..." : "Create Task"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
