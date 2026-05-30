"use client";

import { useState } from "react";
import { Edit2, HelpCircle, Plus, X, ChevronDown, Save, Loader2 } from "lucide-react";

type Props = {
  userId: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  city: string;
  address: string;
};

function Field({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-[#667085] mb-1">{label}</p>
      <p className={`font-semibold text-[15px] break-words ${isLink ? "text-[#0070F0]" : "text-[#101828]"}`}>
        {value || <span className="text-slate-300 font-normal italic text-sm">Not provided</span>}
      </p>
    </div>
  );
}

export default function ProfilePersonalClient(props: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    phone: props.phone,
    gender: props.gender,
    dateOfBirth: props.dateOfBirth,
    nationality: props.nationality,
    city: props.city,
    address: props.address,
  });

  // Display values: merge form (editable) with static email
  const displayName = [form.firstName, form.lastName].filter(Boolean).join(" ") || props.fullName || "—";
  const displayGender = form.gender || "—";
  const displayDob = form.dateOfBirth
    ? new Date(form.dateOfBirth).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })
    : "—";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/profile/personal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          gender: form.gender,
          dateOfBirth: form.dateOfBirth || null,
          nationality: form.nationality,
          city: form.city,
          address: form.address,
        }),
      });
      setSaved(true);
      setEditOpen(false);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      // handle silently
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
          <Save className="w-4 h-4" /> Profile updated successfully!
        </div>
      )}

      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] mb-0.5">Personal Details</h1>
          <p className="text-[13px] text-[#667085]">Your registered personal information. Click Edit to update.</p>
        </div>
        <button
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl bg-white text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm shrink-0"
        >
          <Edit2 className="w-3.5 h-3.5 text-[#0070F0]" /> Edit Details
        </button>
      </div>

      {/* ─── Personal Information Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Personal Information <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Name" value={displayName} />
          <Field label="Gender" value={displayGender} />
          <Field label="Email Address" value={props.email} isLink />
          <Field label="Contact" value={form.phone} />
          <Field label="Country of Citizenship" value={form.nationality} />
          <Field label="Date of Birth" value={displayDob} />
          <Field label="City" value={form.city} />
        </div>
      </div>

      {/* ─── Address Details Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Address Details <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Country" value={form.nationality} />
          <Field label="City" value={form.city} />
          <Field label="Address" value={form.address} />
        </div>
      </div>

      {/* ─── Edit Personal Details Modal ─── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[650px] max-h-[90vh] flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
              <h2 className="text-[18px] font-bold text-[#101828]">Edit Personal Details</h2>
              <button onClick={() => setEditOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">

              <h3 className="text-[15px] font-bold text-[#101828] flex items-center gap-2">
                Personal Information <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
              </h3>

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">First Name <span className="text-red-500">*</span></label>
                  <input
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Last Name <span className="text-red-500">*</span></label>
                  <input
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]"
                  />
                </div>
              </div>

              {/* Email & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Email</label>
                  <input
                    value={props.email}
                    readOnly
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] bg-slate-50 text-slate-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Contact</label>
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+977 98..."
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]"
                  />
                </div>
              </div>

              {/* Country, DOB, Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Nationality</label>
                  <input
                    value={form.nationality}
                    onChange={(e) => setForm({ ...form, nationality: e.target.value })}
                    placeholder="e.g. Nepal"
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] focus:outline-none focus:border-[#0070F0]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Gender</label>
                  <div className="relative">
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value })}
                      className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]"
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* City & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">City</label>
                  <input
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="e.g. Kathmandu"
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Address</label>
                  <input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Street address"
                    className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#EAECF0]">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="px-5 py-2.5 border border-[#D0D5DD] rounded-xl text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-[#0070F0] rounded-xl text-[13px] font-semibold text-white hover:bg-blue-600 transition flex items-center gap-2 disabled:opacity-60"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
