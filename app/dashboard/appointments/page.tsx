"use client";

/**
 * DASHBOARD — APPOINTMENTS PAGE
 * View upcoming appointments and book new ones.
 */
import Link from "next/link";
import { Calendar, Clock, Video, Phone, MapPin, Plus, ArrowRight } from "lucide-react";

const APPOINTMENT_TYPES = [
  { icon: Video,  label: "Video Call",   desc: "Google Meet / Zoom session" },
  { icon: Phone,  label: "Phone Call",   desc: "Direct counselor call" },
  { icon: MapPin, label: "Walk-in",      desc: "Visit our Kathmandu office" },
];

export default function AppointmentsPage() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage your counseling sessions</p>
        </div>
        <Link href="/appointment" className="flex items-center gap-2 px-4 py-2 bg-[#0070F0] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" /> Book New
        </Link>
      </div>

      {/* Upcoming — Empty State */}
      <div className="bg-white rounded-2xl border border-slate-100 mb-6">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-sm">Upcoming Sessions</h2>
        </div>
        <div className="py-16 text-center">
          <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500 text-sm font-medium mb-2">No upcoming appointments</p>
          <p className="text-slate-400 text-xs mb-6">Book a free 30-min session with a counselor today</p>
          <Link href="/appointment" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0070F0] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
            Schedule Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Session Types */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {APPOINTMENT_TYPES.map(t => (
          <Link href="/appointment" key={t.label} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-blue-200 transition group text-center">
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
          <div>
            <p className="text-slate-500 text-xs">Monday – Friday</p>
            <p className="font-semibold text-slate-800">9:00 AM – 6:00 PM (NPT)</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Saturday</p>
            <p className="font-semibold text-slate-800">10:00 AM – 4:00 PM (NPT)</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">Office Address</p>
            <p className="font-semibold text-slate-800">Kathmandu, Bagmati Province, Nepal</p>
          </div>
          <div>
            <p className="text-slate-500 text-xs">WhatsApp / Viber</p>
            <p className="font-semibold text-slate-800">+977 98XX-XXXXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
}
