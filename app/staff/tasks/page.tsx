"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Plus, CheckSquare, Clock, Circle, Trash2, 
  ChevronDown, X, Play, CheckCircle2, Info, Calendar,
  GripVertical, RotateCcw
} from "lucide-react";

type Task = {
  id: string; 
  title: string; 
  description: string | null; 
  status: string;
  priority: string; 
  category: string | null; 
  dueDate: string | null;
  completedAt: string | null; 
  createdAt: string;
};

const STATUS_COLS = [
  { 
    key: "TODO", 
    label: "To Do", 
    icon: Circle, 
    color: "border-slate-200", 
    headerBg: "bg-slate-50", 
    badgeBg: "bg-slate-100 text-slate-600",
    dropRing: "ring-slate-300",
    dropBg: "bg-slate-50/60",
  },
  { 
    key: "IN_PROGRESS", 
    label: "In Progress", 
    icon: Clock, 
    color: "border-blue-200", 
    headerBg: "bg-blue-50/50", 
    badgeBg: "bg-blue-100 text-blue-700",
    dropRing: "ring-blue-300",
    dropBg: "bg-blue-50/40",
  },
  { 
    key: "DONE", 
    label: "Done", 
    icon: CheckCircle2, 
    color: "border-emerald-200", 
    headerBg: "bg-emerald-50/50", 
    badgeBg: "bg-emerald-100 text-emerald-700",
    dropRing: "ring-emerald-300",
    dropBg: "bg-emerald-50/40",
  },
];

const PRIORITY_BADGE: Record<string, { bg: string; text: string; border: string }> = {
  URGENT: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  HIGH:   { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  MEDIUM: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  LOW:    { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", priority: "MEDIUM", dueDate: "" });
  const [submitting, setSubmitting] = useState(false);
  // Drag-and-drop state
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  // Ref to track if drop already handled (prevents dragEnd from interfering)
  const dropHandledRef = useRef(false);

  const fetchTasks = () => {
    fetch("/api/staff/tasks")
      .then((r) => r.json())
      .then((d) => { if (d.success) setTasks(d.data); })
      .catch(() => {});
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

  // Optimistic status update — moves card immediately, reverts if API fails
  const updateStatus = async (id: string, newStatus: string) => {
    setLoadingId(id);
    // Optimistically update local state
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: newStatus, completedAt: newStatus === "DONE" ? new Date().toISOString() : null }
          : t
      )
    );
    try {
      const res = await fetch(`/api/staff/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        // Revert on failure
        fetchTasks();
      }
    } catch {
      fetchTasks(); // revert
    } finally {
      setLoadingId(null);
    }
  };

  const deleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    // Optimistically remove
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/staff/tasks/${id}`, { method: "DELETE" });
  };

  // ── Drag & Drop Handlers ──────────────────────────────────────────
  const handleDragStart = (e: React.DragEvent, id: string) => {
    dropHandledRef.current = false;
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    // Small delay so the drag ghost renders before we change opacity
    setTimeout(() => {
      const el = document.getElementById(`task-card-${id}`);
      if (el) el.style.opacity = "0.4";
    }, 0);
  };

  const handleDragEnd = (id: string) => {
    // Only reset state if drop handler didn't already take over
    const el = document.getElementById(`task-card-${id}`);
    if (el) el.style.opacity = "1";
    if (!dropHandledRef.current) {
      setDraggedId(null);
      setDragOverCol(null);
    }
    dropHandledRef.current = false;
  };

  const handleDragOver = (e: React.DragEvent, colKey: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(colKey);
  };

  const handleDrop = async (e: React.DragEvent, colKey: string) => {
    e.preventDefault();
    // Capture synchronously before ANY async or state changes
    const capturedId = draggedId;
    dropHandledRef.current = true;
    setDragOverCol(null);
    setDraggedId(null);
    if (!capturedId) return;
    const task = tasks.find((t) => t.id === capturedId);
    if (!task || task.status === colKey) return;
    await updateStatus(capturedId, colKey);
  };

  const todayCompleted = tasks.filter(
    (t) => t.status === "DONE" && t.completedAt &&
      new Date(t.completedAt).toDateString() === new Date().toDateString()
  ).length;

  const pendingCount = tasks.filter(
    (t) => t.status !== "DONE" && t.status !== "CANCELLED"
  ).length;

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">

      {/* ── Page Header ── */}
      <div className="bg-[#0B1A2D] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 mb-3">Task Manager</span>
              <h1 className="text-2xl md:text-3xl font-black text-white">My Tasks</h1>
              <p className="text-sm text-slate-300 mt-1.5 font-medium">Drag cards between columns · changes save instantly</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { label: "To Do", value: tasks.filter(t => t.status === "TODO").length, color: "text-slate-200" },
                { label: "In Progress", value: tasks.filter(t => t.status === "IN_PROGRESS").length, color: "text-blue-300" },
                { label: "Done Today", value: todayCompleted, color: "text-emerald-400" },
              ].map(s => (
                <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-center min-w-[75px]">
                  <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">{s.label}</p>
                </div>
              ))}
              <button onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-[#0B1A2D] rounded-xl text-sm font-black transition shadow-md whitespace-nowrap">
                <Plus className="w-4 h-4" /> Create Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {STATUS_COLS.map((col) => {
          const colTasks = tasks.filter((t) => t.status === col.key);
          const ColIcon = col.icon;
          const isDropTarget = dragOverCol === col.key && draggedId !== null;
          const draggedTask = tasks.find((t) => t.id === draggedId);
          const isDragSourceCol = draggedTask?.status === col.key;

          return (
            <div
              key={col.key}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col min-h-[450px] transition-all duration-200 ${
                isDropTarget && !isDragSourceCol
                  ? `border-2 ${col.dropRing} ring-2 ring-offset-0 shadow-lg`
                  : "border-slate-100"
              }`}
              onDragOver={(e) => handleDragOver(e, col.key)}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, col.key)}
            >
              {/* Column Header */}
              <div className={`p-4 border-b border-slate-100 ${col.headerBg} flex items-center justify-between`}>
                <div className="flex items-center gap-2.5">
                  <ColIcon className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-extrabold text-slate-800">{col.label}</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${col.badgeBg}`}>
                  {colTasks.length}
                </span>
              </div>

              {/* Drop Zone Indicator */}
              {isDropTarget && !isDragSourceCol && (
                <div className={`mx-4 mt-3 h-1.5 rounded-full ${col.dropBg} border-2 border-dashed ${col.dropRing} animate-pulse`} />
              )}

              {/* Task Cards */}
              <div className={`p-4 space-y-4 flex-1 overflow-y-auto max-h-[600px] transition-colors duration-150 ${
                isDropTarget && !isDragSourceCol ? col.dropBg : "bg-slate-50/20"
              }`}>
                {colTasks.length === 0 ? (
                  <div className={`text-center py-16 rounded-xl border-2 border-dashed transition-colors duration-150 ${
                    isDropTarget && !isDragSourceCol
                      ? `${col.dropBg} border-current opacity-70`
                      : "border-slate-100 text-slate-400"
                  }`}>
                    <CheckSquare className="w-8 h-8 mx-auto opacity-25 mb-2" />
                    <p className="text-xs font-semibold">
                      {isDropTarget && !isDragSourceCol ? `Drop here → ${col.label}` : `No tasks in ${col.label}`}
                    </p>
                  </div>
                ) : (
                  colTasks.map((t) => {
                    const p = PRIORITY_BADGE[t.priority] || PRIORITY_BADGE.MEDIUM;
                    const isLoading = loadingId === t.id;
                    const isDragging = draggedId === t.id;

                    return (
                      <div
                        id={`task-card-${t.id}`}
                        key={t.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, t.id)}
                        onDragEnd={() => handleDragEnd(t.id)}
                        className={`bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 group flex flex-col justify-between cursor-grab active:cursor-grabbing select-none ${
                          isDragging ? "opacity-40 scale-95 shadow-none" : ""
                        } ${isLoading ? "opacity-70 pointer-events-none" : ""}`}
                      >
                        {/* Loading overlay */}
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-xl z-10">
                            <div className="w-5 h-5 border-2 border-blue-200 border-t-[#0070F0] rounded-full animate-spin" />
                          </div>
                        )}

                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <div className="flex items-start gap-2 flex-1 min-w-0">
                              <GripVertical className="w-3.5 h-3.5 text-slate-300 mt-0.5 flex-shrink-0 group-hover:text-slate-400 transition" />
                              <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition duration-150 leading-snug">
                                {t.title}
                              </h4>
                            </div>
                            <button 
                              onClick={() => deleteTask(t.id)} 
                              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-50 hover:text-red-600 text-slate-400 rounded-lg transition flex-shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {t.description && (
                            <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed pl-5">
                              {t.description}
                            </p>
                          )}
                        </div>

                        <div>
                          {/* Priority and Due Date */}
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded border ${p.bg} ${p.text} ${p.border}`}>
                              {t.priority}
                            </span>
                            {t.dueDate && (
                              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                                <Calendar className="w-3 h-3" />
                                {new Date(t.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                              </span>
                            )}
                          </div>

                          {/* Action buttons */}
                          <div className="flex items-center gap-2 border-t border-slate-50 pt-3">
                            {col.key !== "TODO" && (
                              <button 
                                onClick={() => updateStatus(t.id, col.key === "IN_PROGRESS" ? "TODO" : "IN_PROGRESS")}
                                disabled={isLoading}
                                className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 transition cursor-pointer flex items-center gap-1 disabled:opacity-50"
                              >
                                <RotateCcw className="w-2.5 h-2.5" />
                                {col.key === "IN_PROGRESS" ? "Back to Todo" : "Reopen"}
                              </button>
                            )}
                            {col.key !== "DONE" && (
                              <button 
                                onClick={() => updateStatus(t.id, col.key === "TODO" ? "IN_PROGRESS" : "DONE")}
                                disabled={isLoading}
                                className="text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0070F0] ml-auto transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
                              >
                                {isLoading ? (
                                  <div className="w-3 h-3 border border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                                ) : col.key === "TODO" ? (
                                  <>
                                    <Play className="w-2.5 h-2.5" /> Start Task
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle2 className="w-2.5 h-2.5" /> Mark Done
                                  </>
                                )}
                              </button>
                            )}
                          </div>
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

      {/* Create Task Modal */}
      {showForm && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
          onClick={() => setShowForm(false)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Create New Task</h2>
                <p className="text-xs text-slate-500 mt-0.5">Define team or personal deliverables</p>
              </div>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-slate-200 rounded-full transition cursor-pointer">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Task Title</label>
                <input 
                  type="text" required 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Prepare counseling syllabus update" 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Description (optional)</label>
                <textarea 
                  rows={3} 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add context, checklist, or requirements..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Priority</label>
                  <select 
                    value={formData.priority} 
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition bg-white"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">Due Date</label>
                  <input 
                    type="date" 
                    value={formData.dueDate} 
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="w-full py-3.5 bg-[#0070F0] hover:bg-blue-600 text-white font-bold rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-2"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Create Task"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
