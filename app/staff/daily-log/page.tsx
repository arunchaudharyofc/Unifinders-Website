"use client";

import { useState, useEffect, useCallback } from "react";
import {
  FileText, Send, CheckCircle2, Award, AlertOctagon,
  ChevronDown, ChevronUp, CalendarDays, Sparkles, Target,
  TrendingUp, Clock, Zap, BookOpen, X
} from "lucide-react";

type DailyLogEntry = {
  id: string; date: string; summary: string;
  tasksCompleted: number; highlights: string | null;
  blockers: string | null; createdAt: string;
};

type MonthGroup = {
  key: string; year: number; month: number;
  logs: DailyLogEntry[]; totalTasks: number;
};

function groupByMonth(logs: DailyLogEntry[]): MonthGroup[] {
  const map = new Map<string, MonthGroup>();
  for (const log of logs) {
    const d = new Date(log.date);
    const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!map.has(key)) map.set(key, { key, year: d.getFullYear(), month: d.getMonth(), logs: [], totalTasks: 0 });
    const g = map.get(key)!;
    g.logs.push(log);
    g.totalTasks += log.tasksCompleted;
  }
  return Array.from(map.values());
}

export default function DailyLogPage() {
  const [logs, setLogs] = useState<DailyLogEntry[]>([]);
  const [form, setForm] = useState({ summary: "", tasksCompleted: 0, highlights: "", blockers: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const fetchLogs = useCallback(() => {
    fetch("/api/staff/daily-log?days=90")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setLogs(d.data);
          if (d.data.length > 0) {
            const first = new Date(d.data[0].date);
            const firstKey = first.toLocaleDateString("en-US", { month: "long", year: "numeric" });
            setExpandedMonths(new Set([firstKey]));
          }
          const todayLog = d.data.find(
            (l: DailyLogEntry) => new Date(l.date).toDateString() === new Date().toDateString()
          );
          if (todayLog) {
            setForm({ summary: todayLog.summary, tasksCompleted: todayLog.tasksCompleted, highlights: todayLog.highlights || "", blockers: todayLog.blockers || "" });
            setSubmitted(true);
          }
        }
      }).catch(() => {});
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await fetch("/api/staff/daily-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
      fetchLogs();
    }
    setSubmitting(false);
  };

  const toggleMonth = (key: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const monthGroups = groupByMonth(logs);
  const totalTasksAllTime = logs.reduce((sum, l) => sum + l.tasksCompleted, 0);
  const thisMonthLogs = monthGroups[0]?.logs.length || 0;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-12">

      {/* Dark Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#152844] to-[#0d3470] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, #34d399 0%, transparent 40%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 40%)" }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-400/20">Daily Work Log</span>
            <h1 className="text-3xl font-black text-white mt-2">What did you accomplish today?</h1>
            <p className="text-sm text-blue-200/70 mt-1.5 font-medium">{today}</p>
          </div>
          {/* Quick Stats */}
          <div className="flex gap-4 shrink-0">
            <div className="bg-white/10 rounded-xl p-4 text-center min-w-[80px] border border-white/10">
              <p className="text-2xl font-black text-white">{logs.length}</p>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider mt-0.5">Total Logs</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center min-w-[80px] border border-white/10">
              <p className="text-2xl font-black text-white">{totalTasksAllTime}</p>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider mt-0.5">Tasks Done</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center min-w-[80px] border border-white/10">
              <p className="text-2xl font-black text-white">{thisMonthLogs}</p>
              <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider mt-0.5">This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-sm">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-emerald-800">Work log submitted! 🎉</p>
            <p className="text-xs text-emerald-600 mt-0.5">Your team can now see your progress for today.</p>
          </div>
          <button onClick={() => setSuccessMsg(false)} className="text-emerald-400 hover:text-emerald-600 text-xs font-bold px-2 py-1 rounded transition">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* ── Submit Form ── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

            {/* Form Header */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${submitted ? "bg-emerald-50 border-emerald-100" : "bg-blue-50 border-blue-100"}`}>
                  {submitted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <BookOpen className="w-5 h-5 text-blue-600" />}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-800">
                    {submitted ? "Today's Log Submitted" : "Submit Today's Work Log"}
                  </h2>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
                    {submitted ? "Tap edit to make changes" : "Document your progress"}
                  </p>
                </div>
              </div>
              {submitted && (
                <span className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" /> Logged
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">

              {/* Summary */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase tracking-widest mb-2">
                  <Target className="w-3.5 h-3.5 text-blue-500" />
                  What did you work on today? *
                </label>
                <textarea
                  required rows={5}
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Summarize your tasks, meetings, achievements, or project milestones. Be specific about what you completed..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition leading-relaxed"
                />
              </div>

              {/* Tasks Completed */}
              <div>
                <label className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase tracking-widest mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  Tasks Completed Today
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                    <button type="button" onClick={() => setForm({ ...form, tasksCompleted: Math.max(0, form.tasksCompleted - 1) })}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition font-bold text-lg">−</button>
                    <span className="w-12 text-center text-lg font-black text-slate-800">{form.tasksCompleted}</span>
                    <button type="button" onClick={() => setForm({ ...form, tasksCompleted: Math.min(50, form.tasksCompleted + 1) })}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition font-bold text-lg">+</button>
                  </div>
                  <span className="text-sm text-slate-400 font-medium">task{form.tasksCompleted !== 1 ? "s" : ""} completed</span>
                </div>
              </div>

              {/* Highlights & Blockers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase tracking-widest mb-2">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Key Highlights
                  </label>
                  <textarea rows={3} value={form.highlights}
                    onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                    placeholder="Major wins, successful merges, happy clients..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-black text-slate-600 uppercase tracking-widest mb-2">
                    <AlertOctagon className="w-3.5 h-3.5 text-red-400" />
                    Blockers
                  </label>
                  <textarea rows={3} value={form.blockers}
                    onChange={(e) => setForm({ ...form, blockers: e.target.value })}
                    placeholder="Open questions, blocking dependencies..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition"
                  />
                </div>
              </div>

              <button type="submit" disabled={submitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#0070F0] to-[#0055CC] text-white font-black rounded-xl text-sm transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                {submitted ? "Update Today's Log" : "Submit Work Log"}
              </button>
            </form>
          </div>
        </div>

        {/* ── History Sidebar ── */}
        <div className="space-y-4">

          {/* Activity streak card */}
          <div className="bg-gradient-to-br from-[#0B1A2D] to-[#0d2a5a] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-200">Activity</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Logs", value: logs.length },
                { label: "Tasks", value: totalTasksAllTime },
                { label: "This Mo.", value: thisMonthLogs },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                  <p className="text-xl font-black text-white">{stat.value}</p>
                  <p className="text-[9px] text-blue-200 font-bold uppercase tracking-wider mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Month accordion */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-800">Work Log History</h3>
              <span className="ml-auto text-[10px] text-slate-400 font-semibold">Last 90 days</span>
            </div>

            {monthGroups.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                <FileText className="w-8 h-8 mx-auto opacity-20 mb-2" />
                <p className="text-xs font-semibold">No logs submitted yet</p>
                <p className="text-[11px] text-slate-400 mt-1">Submit your first work log above.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {monthGroups.map((group) => {
                  const isExpanded = expandedMonths.has(group.key);
                  return (
                    <div key={group.key}>
                      <button onClick={() => toggleMonth(group.key)}
                        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-slate-50 transition text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                            <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-extrabold text-slate-800">{group.key}</p>
                            <p className="text-[10px] text-slate-400 font-semibold">
                              {group.logs.length} log{group.logs.length !== 1 ? "s" : ""} · {group.totalTasks} tasks
                            </p>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 space-y-2.5 bg-slate-50/40">
                          {group.logs.map((l) => {
                            const d = new Date(l.date);
                            const dayLabel = d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
                            const isOpen = expandedLog === l.id;
                            return (
                              <div key={l.id} className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-sm transition">
                                <button onClick={() => setExpandedLog(isOpen ? null : l.id)}
                                  className="w-full flex items-center justify-between p-3.5 text-left"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0">
                                      <span className="text-[8px] font-black text-slate-400 uppercase leading-none">{dayLabel.split(" ")[0]}</span>
                                      <span className="text-sm font-black text-slate-700 leading-none">{d.getDate()}</span>
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-slate-700 line-clamp-1">{l.summary.substring(0, 40)}{l.summary.length > 40 ? "..." : ""}</p>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[9px] text-slate-400 font-semibold">{l.tasksCompleted} tasks</span>
                                        {l.highlights && <span className="text-[9px] text-emerald-600 font-bold flex items-center gap-0.5"><Award className="w-2.5 h-2.5" /> Highlight</span>}
                                        {l.blockers && <span className="text-[9px] text-red-500 font-bold flex items-center gap-0.5"><AlertOctagon className="w-2.5 h-2.5" /> Blocker</span>}
                                      </div>
                                    </div>
                                  </div>
                                  {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-300 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
                                </button>

                                {isOpen && (
                                  <div className="px-4 pb-4 space-y-2.5 border-t border-slate-50">
                                    <p className="text-xs text-slate-600 leading-relaxed mt-3">{l.summary}</p>
                                    {l.highlights && (
                                      <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100 flex items-start gap-2">
                                        <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-emerald-800 font-medium leading-normal">{l.highlights}</p>
                                      </div>
                                    )}
                                    {l.blockers && (
                                      <div className="p-2.5 bg-red-50 rounded-lg border border-red-100 flex items-start gap-2">
                                        <AlertOctagon className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                                        <p className="text-[11px] text-red-800 font-medium leading-normal">{l.blockers}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
