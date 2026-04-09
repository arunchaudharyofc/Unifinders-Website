"use client";

/**
 * DASHBOARD — PROFILE PAGE
 * Fetch + edit student profile information.
 */
import { useState, useEffect } from "react";
import { User, Save, Loader2, CheckCircle2, Phone, Globe, BookOpen, Calendar, Camera } from "lucide-react";

type ProfileData = {
  fullName: string;
  phone: string;
  avatarUrl: string;
  bio: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  targetCountry: string;
  studyLevel: string;
  fieldOfStudy: string;
  budgetRange: string;
  intakeYear: string;
};

const STUDY_LEVELS = ["", "Certificate", "Diploma", "Bachelor's", "Master's", "PhD", "Foundation"];
const COUNTRIES = ["", "Australia", "UK", "USA", "Canada", "New Zealand", "Ireland", "Germany", "Japan", "South Korea", "Netherlands", "France", "Switzerland"];
const INTAKE_YEARS = ["", "2025", "2026", "2027", "2028"];
const BUDGET_RANGES = ["", "Under $10,000", "$10,000–$20,000", "$20,000–$30,000", "$30,000–$50,000", "Over $50,000"];

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "", phone: "", avatarUrl: "", bio: "",
    firstName: "", lastName: "", dateOfBirth: "", nationality: "Nepali",
    targetCountry: "", studyLevel: "", fieldOfStudy: "", budgetRange: "", intakeYear: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const d = await res.json();
          const p = d.data?.profile || d.profile || {};
          const s = d.data?.student || d.student || {};
          setProfile({
            fullName: p.fullName || "",
            phone: p.phone || "",
            avatarUrl: p.avatarUrl || "",
            bio: p.bio || "",
            firstName: s.firstName || "",
            lastName: s.lastName || "",
            dateOfBirth: s.dateOfBirth ? s.dateOfBirth.split("T")[0] : "",
            nationality: s.nationality || "Nepali",
            targetCountry: s.targetCountry || "",
            studyLevel: s.studyLevel || "",
            fieldOfStudy: s.fieldOfStudy || "",
            budgetRange: s.budgetRange || "",
            intakeYear: s.intakeYear || "",
          });
        }
      } catch { } finally { setLoading(false); }
    };
    fetchProfile();
  }, []);

  const set = (k: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setProfile(p => ({ ...p, [k]: e.target.value }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(null); setSaved(false);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const d = await res.json();
      if (!res.ok) { setError(d.error || "Failed to save"); }
      else { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } catch { setError("Network error"); } finally { setSaving(false); }
  };

  const inp = "w-full h-11 px-4 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#0070F0] focus:ring-2 focus:ring-blue-100 transition";
  const sel = `${inp} bg-white`;

  const initials = (profile.firstName?.[0] || "") + (profile.lastName?.[0] || "") ||
    profile.fullName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U";

  if (loading) {
    return (
      <div className="max-w-3xl flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-slate-200 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">My Profile</h1>
        <p className="text-slate-500 text-sm mt-0.5">Update your personal and academic information</p>
      </div>

      {/* Avatar card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6 flex items-center gap-4">
        <div className="relative">
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1D4ED8] to-blue-400 flex items-center justify-center text-white font-extrabold text-xl">
              {initials}
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center">
            <Camera className="w-3.5 h-3.5 text-slate-500" />
          </div>
        </div>
        <div>
          <p className="font-bold text-slate-900">{profile.fullName || "Your Name"}</p>
          <p className="text-sm text-slate-500">{profile.studyLevel ? `${profile.studyLevel} Student` : "Student"} · {profile.targetCountry || "No target country yet"}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}
        {saved && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Profile saved successfully!
          </div>
        )}

        {/* Personal Info */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-[#0070F0]" /> Personal Information
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">First Name</label>
              <input className={inp} value={profile.firstName} onChange={set("firstName")} placeholder="Priya" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Last Name</label>
              <input className={inp} value={profile.lastName} onChange={set("lastName")} placeholder="Sharma" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Display Name</label>
              <input className={inp} value={profile.fullName} onChange={set("fullName")} placeholder="Priya Sharma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone / WhatsApp</label>
              <input className={inp} value={profile.phone} onChange={set("phone")} placeholder="+977 98XXXXXXXX" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date of Birth</label>
              <input type="date" className={inp} value={profile.dateOfBirth} onChange={set("dateOfBirth")} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nationality</label>
              <input className={inp} value={profile.nationality} onChange={set("nationality")} placeholder="Nepali" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Short Bio</label>
              <textarea rows={3} className={`${inp} h-auto py-3 resize-none`} value={profile.bio} onChange={set("bio")} placeholder="Tell us a bit about yourself..." />
            </div>
          </div>
        </section>

        {/* Academic Preferences */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-[#0070F0]" /> Academic Preferences
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Target Country</label>
              <select className={sel} value={profile.targetCountry} onChange={set("targetCountry")}>
                {COUNTRIES.map(c => <option key={c} value={c}>{c || "Select country"}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Study Level</label>
              <select className={sel} value={profile.studyLevel} onChange={set("studyLevel")}>
                {STUDY_LEVELS.map(l => <option key={l} value={l}>{l || "Select level"}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Field of Study</label>
              <input className={inp} value={profile.fieldOfStudy} onChange={set("fieldOfStudy")} placeholder="Computer Science, Business..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Target Intake Year</label>
              <select className={sel} value={profile.intakeYear} onChange={set("intakeYear")}>
                {INTAKE_YEARS.map(y => <option key={y} value={y}>{y || "Select year"}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Budget Range (USD/year)</label>
              <select className={sel} value={profile.budgetRange} onChange={set("budgetRange")}>
                {BUDGET_RANGES.map(b => <option key={b} value={b}>{b || "Select budget"}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Save */}
        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[#0070F0] hover:bg-blue-700 text-white font-bold rounded-xl transition disabled:opacity-60">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Profile</>}
          </button>
        </div>
      </form>
    </div>
  );
}
