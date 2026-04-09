"use client";

/**
 * DASHBOARD — APPOINTMENTS PAGE
 * Fetches real appointment data from DB and allows booking new ones.
 */
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar, Clock, Video, Phone, MapPin, Plus, ArrowRight,
  Loader2, CheckCircle2, XCircle, AlertCircle, RefreshCw
} from "lucide-react";

type Appointment = {
  id: string;
  service: string;
  preferredDate: string;
  timeSlot: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  country: string | null;
  message: string | null;
  createdAt: string;
};

const STATUS_CFG: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  PENDING:   { label: "Pending Review", cls: "bg-yellow-50 text-yellow-700 border border-yellow-200", icon: Clock },
  CONFIRMED: { label: "Confirmed ✓",   cls: "bg-green-50 text-green-700 border border-green-200",    icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled",     cls: "bg-red-50 text-red-600 border border-red-200",           icon: XCircle },
  COMPLETED: { label: "Completed",     cls: "bg-slate-50 text-slate-600 border border-slate-200",     icon: CheckCircle2 },
};

const APPOINTMENT_TYPES = [
  { icon: Video,  label: "Video Call", desc: "Google Meet / Zoom session" },
  { icon: Phone,  label: "Phone Call", desc: "Direct counselor call" },
  { icon: MapPin, label: "Walk-in",    desc: "Visit our Kathmandu office" },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      if (res.ok) {
        const d = await res.json();
        setAppointments(d.data?.appointments || []);
      }
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchAppointments(); }, []);

  const upcoming = appointments.filter(a => ["PENDING", "CONFIRMED"].includes(a.status));
  const past = appointments.filter(a => ["CANCELLED", "COMPLETED"].includes(a.status));

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your counseling sessions</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchAppointments} className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <Link href="/appointment" className="flex items-center gap-2 px-4 py-2 bg-[#0070F0] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
            <Plus className="w-4 h-4" /> Book New
          </Link>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl border border-slate-100 mb-6">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">Upcoming Sessions</h2>
          {upcoming.length > 0 && (
            <span className="text-xs font-bold bg-blue-50 text-[#0070F0] px-2.5 py-1 rounded-full">{upcoming.length}</span>
          )}
        </div>

        {loading ? (
          <div className="py-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-slate-200 animate-spin" />
          </div>
        ) : upcoming.length === 0 ? (
          <div className="py-14 text-center">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-medium mb-1">No upcoming appointments</p>
            <p className="text-slate-400 text-xs mb-5">Book a free 30-min session with a counselor</p>
            <Link href="/appointment" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0070F0] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
              Schedule Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {upcoming.map(appt => {
              const cfg = STATUS_CFG[appt.status];
              const Icon = cfg.icon;
              return (
                <div key={appt.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-bold text-slate-900 text-sm">{appt.service}</p>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${cfg.cls}`}>
                          <Icon className="w-3 h-3" /> {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />
                          {new Date(appt.preferredDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{appt.timeSlot}</span>
                        {appt.country && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{appt.country}</span>}
                      </div>
                      {appt.message && (
                        <p className="text-xs text-slate-400 italic mt-1 line-clamp-1">"{appt.message}"</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past sessions */}
      {past.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 mb-6">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-900 text-sm">Past Sessions</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {past.map(appt => {
              const cfg = STATUS_CFG[appt.status];
              const Icon = cfg.icon;
              return (
                <div key={appt.id} className="px-5 py-3 flex items-center justify-between opacity-70">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{appt.service}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(appt.preferredDate).toLocaleDateString()} · {appt.timeSlot}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${cfg.cls}`}>
                    <Icon className="w-3 h-3" /> {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Session Types */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {APPOINTMENT_TYPES.map(t => (
          <Link href="/appointment" key={t.label}
            className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-blue-200 transition group text-center">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition">
              <t.icon className="w-5 h-5 text-[#0070F0]" />
            </div>
            <p className="font-bold text-slate-900 text-sm">{t.label}</p>
            <p className="text-xs text-slate-400 mt-1">{t.desc}</p>
          </Link>
        ))}
      </div>

      {/* Office Info */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <h2 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0070F0]" /> Counseling Hours
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div><p className="text-slate-500 text-xs">Monday – Friday</p><p className="font-semibold text-slate-800">9:00 AM – 6:00 PM (NPT)</p></div>
          <div><p className="text-slate-500 text-xs">Saturday</p><p className="font-semibold text-slate-800">10:00 AM – 4:00 PM (NPT)</p></div>
          <div><p className="text-slate-500 text-xs">Office Address</p><p className="font-semibold text-slate-800">Kathmandu, Bagmati Province, Nepal</p></div>
          <div><p className="text-slate-500 text-xs">WhatsApp / Viber</p><p className="font-semibold text-slate-800">+977 98XX-XXXXXX</p></div>
        </div>
      </div>
    </div>
  );
}
