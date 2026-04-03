"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { use } from "react";
import {
  X, Calendar, Clock, MapPin, Share2, ChevronRight,
  ChevronDown, CheckCircle2, ChevronLeft
} from "lucide-react";
import { EVENTS } from "@/lib/constants/events";

// ── Register Modal ────────────────────────────────────────────
function RegisterModal({ open, onClose, eventTitle }: { open: boolean; onClose: () => void; eventTitle: string }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.firstName || !form.email) return;
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">Register for Event</h2>
            <p className="text-xs text-slate-500 mt-0.5">Take one step closer towards your dream by filling out this quick form!</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {!submitted ? (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your first name" value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  className="w-full border-b border-slate-300 pb-2 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] transition bg-transparent" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your last name" value={form.lastName}
                  onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  className="w-full border-b border-slate-300 pb-2 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] transition bg-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">E-mail <span className="text-red-500">*</span></label>
              <input type="email" placeholder="Enter your email here" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full border-b border-slate-300 pb-2 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-[#1D4ED8] transition bg-transparent" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-2 border-b border-slate-300 pb-2">
                <div className="flex items-center gap-1 text-sm text-slate-700 shrink-0">
                  <span>🇳🇵</span>
                  <span className="font-medium">+977</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <input type="tel" placeholder="Placeholder" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="flex-1 text-sm text-slate-700 placeholder-slate-400 outline-none bg-transparent" />
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button onClick={handleSubmit} disabled={!form.firstName || !form.email}
                className="px-8 py-3 bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition-all">
                Register Now
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Registered! 🎉</h3>
            <p className="text-sm text-slate-500">You&apos;re confirmed for <strong>{eventTitle}</strong>. Check your email for details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── FAQ Item ──────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left py-4 gap-4 hover:text-[#1D4ED8] transition-colors">
        <span className="text-sm font-semibold text-slate-800">{q}</span>
        <span className={`text-[#1D4ED8] font-extrabold text-lg shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <p className="text-sm text-slate-600 pb-4 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const event = EVENTS.find(e => e.slug === slug);
  if (!event) notFound();

  const [registerOpen, setRegisterOpen] = useState(false);
  const related = EVENTS.filter(e => e.slug !== slug).slice(0, 3);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://unifinders.com/events/${slug}`)}`,
    twitter:  `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://unifinders.com/events/${slug}`)}&text=${encodeURIComponent(event.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://unifinders.com/events/${slug}`)}`,
    instagram: "https://www.instagram.com/unifinders/",
  };

  return (
    <div className="min-h-screen bg-white">
      <RegisterModal open={registerOpen} onClose={() => setRegisterOpen(false)} eventTitle={event.title} />

      {/* Breadcrumb + Title + Share */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-4">
        <nav className="text-xs text-slate-500 flex items-center gap-1.5 mb-4">
          <Link href="/" className="hover:text-[#1D4ED8] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link href="/events" className="hover:text-[#1D4ED8] transition-colors">Events</Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-700 font-semibold line-clamp-1">{event.title}</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug max-w-2xl">{event.title}</h1>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-medium text-slate-600">Share:</span>
            <a href={shareUrls.facebook} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-80 transition">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={shareUrls.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-80 transition">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href={shareUrls.twitter} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:opacity-80 transition">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href={shareUrls.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 flex items-center justify-center hover:opacity-80 transition">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <button className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition">
              <Share2 className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full h-64 md:h-[420px] rounded-2xl overflow-hidden bg-slate-100 relative mb-6">
          <Image src={event.heroImage} alt={event.title} fill unoptimized className="object-cover" />
        </div>

        {/* Event Meta Row */}
        <div className="border border-slate-100 rounded-2xl bg-white shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-8">
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Date & Time</p>
                <p className="text-sm font-extrabold text-slate-900">{event.date.full}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Time</p>
                <p className="text-sm font-extrabold text-slate-900">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#1D4ED8]" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">Location</p>
                <p className="text-sm font-extrabold text-slate-900">{event.location}</p>
              </div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Add to Calendar
            </button>
            {event.status === "upcoming" && (
              <button onClick={() => setRegisterOpen(true)}
                className="px-6 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">
                Register Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* Left: Description */}
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">Description</h2>
            <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed space-y-4 mb-8">
              {event.fullDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-8">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-semibold bg-blue-50 text-[#1D4ED8] rounded-full border border-blue-100">{tag}</span>
                ))}
              </div>
            </div>

            {/* Sponsors */}
            <div className="mb-8">
              <h3 className="text-sm font-extrabold text-slate-900 mb-5 text-center">Thank you to our sponsors</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {event.sponsors.map(s => (
                  <div key={s.name} className="border border-slate-100 rounded-xl px-3 py-3 flex items-center justify-center bg-white hover:shadow-sm transition">
                    <span className="text-xs font-extrabold text-slate-600">{s.logo}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-extrabold text-slate-900 mb-1 text-base">Got Question? <span className="text-[#1D4ED8]">Find answers here.</span></h3>
              <div className="mt-4">
                {event.faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
              </div>
            </div>
          </div>

          {/* Right: Map + Register */}
          <div className="space-y-5">
            {/* Map */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-sm">Event Location</h3>
              </div>
              {/* Map embed */}
              <div className="h-48 bg-slate-100 relative">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=85.3082%2C27.7072%2C85.3282%2C27.7272&layer=mapnik&marker=27.7172%2C85.3182"
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Event location map"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold text-slate-900 mb-1">{event.location}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{event.locationAddress}</p>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(event.locationAddress)}`}
                  target="_blank" rel="noreferrer"
                  className="text-xs text-[#1D4ED8] font-semibold hover:underline mt-2 inline-block">
                  View Map →
                </a>
              </div>
            </div>

            {/* Tags panel */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <p className="text-sm font-extrabold text-slate-900 mb-3">Tags</p>
              <div className="flex flex-wrap gap-2">
                {event.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>
            </div>

            {/* Register CTA card */}
            {event.status === "upcoming" && (
              <div className="bg-[#1D4ED8] rounded-2xl p-6 text-white">
                <h3 className="font-extrabold text-lg mb-2">Secure Your Spot</h3>
                <p className="text-sm text-blue-200 mb-4">Limited seats available. Register now — it&apos;s 100% free!</p>
                <button onClick={() => setRegisterOpen(true)}
                  className="w-full py-3 bg-white text-[#1D4ED8] font-extrabold rounded-xl hover:bg-blue-50 transition-all text-sm">
                  Register Now →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Other Events */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-extrabold text-slate-900 text-lg">Other events you may like</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(rel => (
              <Link key={rel.id} href={`/events/${rel.slug}`}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                <div className="relative h-32 bg-slate-100 overflow-hidden">
                  <Image src={rel.heroImage} alt={rel.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 left-2 bg-[#1D4ED8] text-white rounded-lg px-2 py-1.5 text-center">
                    <p className="text-sm font-extrabold leading-none">{rel.date.day}</p>
                    <p className="text-[9px] font-bold uppercase">{rel.date.month}</p>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-extrabold text-slate-900 mb-1 line-clamp-2 group-hover:text-[#1D4ED8] transition-colors">{rel.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mb-2">{rel.description}</p>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-slate-400"><Clock className="w-2.5 h-2.5" /> {rel.time}</div>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400"><MapPin className="w-2.5 h-2.5" /> {rel.location}</div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-[#1D4ED8]">Learn More <ChevronRight className="w-2.5 h-2.5" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
