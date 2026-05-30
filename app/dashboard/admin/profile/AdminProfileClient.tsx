"use client";

import { useState } from "react";
import {
  User, Briefcase, Phone, Globe, Edit2, Save, Loader2, X,
  ChevronDown, Building2, MapPin, Calendar, Shield, Key
} from "lucide-react";

type Props = {
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  initials: string;
};

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "security", label: "Security", icon: Shield },
];

export default function AdminProfileClient({ userId, fullName, email, phone, initials }: Props) {
  const [activeTab, setActiveTab] = useState("profile");
  const [editOpen, setEditOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    fullName,
    phone,
    title: "Super Admin",
    department: "Executive",
    location: "Kathmandu, Nepal",
    bio: "Responsible for strategic leadership and operations of Unifinders Education Pvt. Ltd.",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/profile/personal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: form.fullName.split(" ")[0], lastName: form.fullName.split(" ").slice(1).join(" "), phone: form.phone }),
      });
      setSaved(true);
      setEditOpen(false);
      setTimeout(() => setSaved(false), 3000);
    } catch { } finally { setSaving(false); }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Tabs */}
      <div className="px-6 lg:px-8 border-b border-[#EAECF0] bg-white sticky top-0 z-10">
        <div className="flex items-center gap-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {TABS.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 border-b-2 text-[14px] whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? "border-[#0070F0] text-[#0070F0] font-semibold"
                  : "border-transparent text-[#475467] hover:text-[#101828] font-medium"}`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 lg:p-8 space-y-6">

        {saved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold px-4 py-3 rounded-xl flex items-center gap-2">
            <Save className="w-4 h-4" /> Profile updated successfully!
          </div>
        )}

        {activeTab === "profile" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#101828]">Personal Information</h2>
                <p className="text-sm text-[#667085] mt-0.5">Your executive profile and contact details.</p>
              </div>
              <button onClick={() => setEditOpen(true)} className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl bg-white text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm">
                <Edit2 className="w-3.5 h-3.5 text-[#0070F0]" /> Edit Profile
              </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Identity</h3>
                <InfoRow icon={User} label="Full Name" value={form.fullName} />
                <InfoRow icon={Briefcase} label="Title" value={form.title} />
                <InfoRow icon={Building2} label="Department" value={form.department} />
                <InfoRow icon={Calendar} label="Role" value="Super Administrator" />
              </div>

              <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Contact</h3>
                <InfoRow icon={Phone} label="Phone" value={form.phone || "Not provided"} empty={!form.phone} />
                <InfoRow icon={Globe} label="Email" value={email} isLink />
                <InfoRow icon={MapPin} label="Location" value={form.location} />
              </div>

              <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 md:col-span-2">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">About / Bio</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{form.bio}</p>
              </div>
            </div>
          </>
        )}

        {activeTab === "organization" && (
          <>
            <div>
              <h2 className="text-lg font-bold text-[#101828]">Organization Details</h2>
              <p className="text-sm text-[#667085] mt-0.5">Company-wide configuration and admin access levels.</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Unifinders Education Pvt. Ltd.</h3>
                  <p className="text-sm text-slate-500">Study Abroad Consultancy · Nepal</p>
                </div>
              </div>
              <InfoRow icon={Globe} label="Website" value="www.unifinders.com" isLink />
              <InfoRow icon={MapPin} label="Headquarters" value="Kathmandu, Nepal" />
              <InfoRow icon={User} label="Total Staff" value="3 registered members" />
              <InfoRow icon={Briefcase} label="Industry" value="Education / EdTech" />
            </div>
          </>
        )}

        {activeTab === "security" && (
          <>
            <div>
              <h2 className="text-lg font-bold text-[#101828]">Security Settings</h2>
              <p className="text-sm text-[#667085] mt-0.5">Manage password, 2FA, and session access.</p>
            </div>
            <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Password</p>
                    <p className="text-xs text-slate-500 mt-0.5">Last changed: Unknown</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:underline">Change</button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-500 mt-0.5">Add extra security to your account</p>
                  </div>
                </div>
                <span className="text-[10px] font-black px-2 py-1 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">Not enabled</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[550px] max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
              <h2 className="text-[18px] font-bold text-[#101828]">Edit Profile</h2>
              <button onClick={() => setEditOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Full Name</label>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+977 98..."
                  className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
              </div>
              <div>
                <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={3}
                  className="w-full px-3 py-2.5 border border-[#D0D5DD] rounded-xl text-[14px] resize-none focus:outline-none focus:border-[#0070F0]" />
              </div>
              <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setEditOpen(false)} className="px-5 py-2.5 border border-[#D0D5DD] rounded-xl text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition">
                  Discard
                </button>
                <button type="submit" disabled={saving} className="px-5 py-2.5 bg-[#0070F0] rounded-xl text-[13px] font-semibold text-white hover:bg-blue-600 transition flex items-center gap-2 disabled:opacity-60">
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

function InfoRow({ icon: Icon, label, value, isLink, empty }: { icon: React.ElementType; label: string; value: string; isLink?: boolean; empty?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-slate-400 shrink-0" />
      <div className="min-w-0">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">{label}</span>
        <span className={`text-sm font-semibold break-words ${isLink ? "text-[#0070F0]" : empty ? "text-slate-300 italic" : "text-slate-800"}`}>{value}</span>
      </div>
    </div>
  );
}
