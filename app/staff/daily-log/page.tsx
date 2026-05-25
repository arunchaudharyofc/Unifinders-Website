"use client";

import { useState, useEffect } from "react";
import { FileText, Send, CheckCircle2 } from "lucide-react";

type DailyLogEntry = {
  id: string; date: string; summary: string; tasksCompleted: number;
  highlights: string | null; blockers: string | null; createdAt: string;
};

export default function DailyLogPage() {
  const [logs, setLogs] = useState<DailyLogEntry[]>([]);
  const [form, setForm] = useState({ summary: "", tasksCompleted: 0, highlights: "", blockers: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/staff/daily-log?days=30")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setLogs(d.data);
          // Pre-fill if today's log exists
          const today = new Date().toDateString();
          const todayLog = d.data.find((l: DailyLogEntry) => new Date(l.date).toDateString() === today);
          if (todayLog) {
            setForm({
              summary: todayLog.summary,
              tasksCompleted: todayLog.tasksCompleted,
              highlights: todayLog.highlights || "",
              blockers: todayLog.blockers || "",
            });
            setSubmitted(true);
          }
        }
      })
      .catch(() => {});
  }, []);

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
      // Refresh logs
      const lRes = await fetch("/api/staff/daily-log?days=30").then((r) => r.json());
      if (lRes.success) setLogs(lRes.data);
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Daily Log</h1>
        <p className="text-sm text-slate-500 mt-1">Document your daily work, achievements, and blockers.</p>
      </div>

      {/* Today's Log Form */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-800">Today&apos;s Log</h2>
              <p className="text-[10px] text-slate-400">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
          </div>
          {submitted && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Submitted
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Summary *</label>
            <textarea
              required rows={4}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              placeholder="What did you work on today? Describe your activities, meetings, progress..."
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Tasks Completed</label>
            <input
              type="number" min={0} max={50}
              value={form.tasksCompleted}
              onChange={(e) => setForm({ ...form, tasksCompleted: parseInt(e.target.value) || 0 })}
              className="w-24 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Highlights (optional)</label>
            <textarea
              rows={2}
              value={form.highlights}
              onChange={(e) => setForm({ ...form, highlights: e.target.value })}
              placeholder="Any achievements, breakthroughs, or wins today?"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Blockers (optional)</label>
            <textarea
              rows={2}
              value={form.blockers}
              onChange={(e) => setForm({ ...form, blockers: e.target.value })}
              placeholder="Any issues or blockers you're facing?"
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm resize-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 outline-none"
            />
          </div>

          <button
            type="submit" disabled={submitting}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition disabled:opacity-50"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {submitted ? "Update Log" : "Submit Log"}
          </button>
        </form>
      </div>

      {/* Past Logs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Previous Logs</h3>
        </div>
        {logs.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No logs yet. Submit your first daily log above!</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {logs.map((l) => (
              <div key={l.id} className="p-4 hover:bg-slate-50 transition">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-slate-800">
                    {new Date(l.date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                  </p>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                    {l.tasksCompleted} task{l.tasksCompleted !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-sm text-slate-600 whitespace-pre-line">{l.summary}</p>
                {l.highlights && (
                  <div className="mt-2 p-2 bg-emerald-50 rounded-lg">
                    <p className="text-xs text-emerald-700">✨ {l.highlights}</p>
                  </div>
                )}
                {l.blockers && (
                  <div className="mt-2 p-2 bg-red-50 rounded-lg">
                    <p className="text-xs text-red-600">⚠️ {l.blockers}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
