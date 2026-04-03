/**
 * APPOINTMENT PAGE
 * ----------------
 * Counseling booking form with a premium split-card layout.
 * Future: POST /api/appointments → Supabase table
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar, CheckCircle2, Clock, Loader2, Mail, Phone,
  User, ChevronRight, MessageCircle, Star
} from "lucide-react";

const TIME_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
const SERVICES = [
  "University Selection",
  "Scholarship Guidance",
  "Visa Application Support",
  "SOP / LOR Review",
  "IELTS / PTE / GMAT Prep",
  "General Counseling",
];
const COUNTRIES = ["Australia", "UK", "USA", "Canada", "Germany", "New Zealand", "Ireland", "Singapore", "UAE", "Not sure yet"];

const FEATURES = [
  { icon: "🎓", text: "1,200+ Students Helped" },
  { icon: "🌍", text: "120+ Partner Universities" },
  { icon: "✅", text: "98% Visa Success Rate" },
  { icon: "⭐", text: "4.9/5 Counselor Rating" },
];

const COUNSELORS = [
  {
    name: "Sunita Rai",
    role: "UK & Australia Specialist",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
    rating: 5.0,
    sessions: 1200,
  },
  {
    name: "Rajan Sharma",
    role: "IELTS & PTE Coach",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
    rating: 4.9,
    sessions: 950,
  },
  {
    name: "Priya Koirala",
    role: "GMAT & US Admissions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
    rating: 4.8,
    sessions: 800,
  },
];

export default function AppointmentPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "",
    service: "", country: "", date: "", timeSlot: "", message: "",
  });

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.timeSlot) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSubmitted(true);
    setLoading(false);
  };

  const inputCls = "w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-[#1D4ED8] text-sm transition";

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-50 flex items-center justify-center p-4 pt-28">
        <div className="max-w-md w-full text-center bg-white rounded-3xl shadow-xl border border-slate-100 p-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Appointment Booked! 🎉</h1>
          <p className="text-slate-500 text-sm mb-1">
            Thank you, <strong>{form.fullName}</strong>! We&apos;ll confirm your session at <strong>{form.email}</strong>.
          </p>
          <p className="text-slate-400 text-xs mb-8">Our team will contact you within 2–4 hours.</p>
          <Link href="/" className="px-6 py-3 bg-[#1D4ED8] text-white font-semibold rounded-xl hover:bg-blue-700 transition text-sm inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0C1A3E] via-[#1D4ED8] to-[#2563EB] pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <nav className="text-xs text-blue-300 mb-4 flex items-center justify-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-blue-100">Book Appointment</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            Book a Free <span className="text-blue-300">Consultation</span>
          </h1>
          <p className="text-blue-200 text-sm max-w-lg mx-auto leading-relaxed">
            1-on-1 session with a certified Unifinders counselor. 100% free, no obligation. Helping students study abroad since 2018.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {FEATURES.map(f => (
              <div key={f.text} className="flex items-center gap-2 text-sm text-white bg-white/10 px-4 py-2 rounded-full">
                <span>{f.icon}</span> <span className="font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

          {/* Main Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] px-8 py-5">
              <h2 className="text-white font-extrabold text-lg">Book Your Session</h2>
              <p className="text-blue-200 text-xs">Fill in your details and we&apos;ll set up a personalized counseling session.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-[#1D4ED8]" /> Your Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name *</label>
                    <input className={inputCls} value={form.fullName} onChange={set("fullName")} placeholder="Priya Sharma" required />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email *</label>
                    <input type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@example.com" required />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number *</label>
                    <div className="flex">
                      <div className="flex items-center gap-1 px-3 bg-slate-50 border border-r-0 border-slate-200 rounded-l-xl text-sm text-slate-700 shrink-0">
                        🇳🇵 <span className="font-medium">+977</span>
                      </div>
                      <input className="flex-1 h-11 px-3 rounded-r-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-[#1D4ED8] transition"
                        value={form.phone} onChange={set("phone")} placeholder="98XXXXXXXX" required />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Service & Country */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                  <MessageCircle className="w-4 h-4 text-[#1D4ED8]" /> What do you need help with?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Service *</label>
                    <select className={inputCls} value={form.service} onChange={set("service")} required>
                      <option value="">Select a service</option>
                      {SERVICES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferred Destination</label>
                    <select className={inputCls} value={form.country} onChange={set("country")}>
                      <option value="">Select country</option>
                      {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Time Slot */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-[#1D4ED8]" /> Preferred Time
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date *</label>
                    <input type="date" className={inputCls} value={form.date} onChange={set("date")} required min={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Time Slot *</label>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map(t => (
                        <button type="button" key={t}
                          onClick={() => setForm(f => ({ ...f, timeSlot: t }))}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${form.timeSlot === t ? "bg-[#1D4ED8] text-white border-[#1D4ED8]" : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Additional Message (optional)</label>
                  <textarea className={`${inputCls} h-24 resize-none py-3`} value={form.message} onChange={set("message")}
                    placeholder="Tell us about your academic background or specific questions..." />
                </div>
              </div>

              <button type="submit" disabled={loading || !form.timeSlot}
                className="w-full h-12 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</> : "Confirm Appointment →"}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-5 lg:sticky lg:top-24">
            {/* Why book */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-900 mb-4 text-sm">Why Book with Us?</h3>
              <div className="space-y-3">
                {[
                  "100% Free — No hidden charges",
                  "Expert counselors with 5–12 years experience",
                  "Personalized university shortlist",
                  "Scholarship matching based on your profile",
                  "Visa documentation support included",
                  "Post-arrival guidance & housing tips",
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meet counselors */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-900 mb-4 text-sm">Meet Our Counselors</h3>
              <div className="space-y-4">
                {COUNSELORS.map(c => (
                  <div key={c.name} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                      <Image src={c.avatar} alt={c.name} width={40} height={40} unoptimized className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.role}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-0.5 justify-end">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-slate-700">{c.rating}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">{c.sessions}+ sessions</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] rounded-2xl p-6 text-white">
              <h3 className="font-extrabold mb-3 text-sm">Need Immediate Help?</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2 text-blue-200">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+977 01-5901222 / 01-5901234</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>info@unifinders.com</span>
                </div>
                <div className="flex items-center gap-2 text-blue-200">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>Mon–Fri 9AM – 6PM NPT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
