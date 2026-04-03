"use client";

/**
 * STUDENT ONBOARDING WIZARD
 * -------------------------
 * 4-step form to capture student profile data.
 * Step 1: Personal Info → Step 2: Academic Background → Step 3: English Tests → Step 4: Study Preferences
 * On complete → saves to DB via server action, redirects to /dashboard.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { CheckCircle2, ArrowRight, ArrowLeft, Loader2, GraduationCap, User, BookOpen, Globe } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type FormData = {
  firstName: string; lastName: string; phone: string; gender: string;
  city: string; district: string;
  educationLevel: string; institutionName: string; graduationYear: string;
  gpaOrPercentage: string; stream: string;
  englishTest: string; englishScore: string;
  preferredCountries: string[]; preferredLevel: string; preferredField: string;
  targetIntake: string; budgetRange: string;
};

const STEPS = [
  { label: "Personal Info",  icon: User },
  { label: "Academic",       icon: GraduationCap },
  { label: "English Test",   icon: BookOpen },
  { label: "Study Goals",    icon: Globe },
];

const COUNTRIES = ["UK", "Australia", "USA", "Canada", "Germany", "New Zealand", "Ireland", "Japan"];
const INTAKES   = ["September 2025", "January 2026", "May 2026", "September 2026"];

// ── Reusable Input ─────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition";
const selectCls = `${inputCls} cursor-pointer`;

// ── Main Component ─────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep]   = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", phone: "", gender: "", city: "", district: "",
    educationLevel: "", institutionName: "", graduationYear: "", gpaOrPercentage: "", stream: "",
    englishTest: "", englishScore: "",
    preferredCountries: [], preferredLevel: "", preferredField: "", targetIntake: "", budgetRange: "",
  });

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const toggleCountry = (c: string) =>
    setForm(f => ({
      ...f,
      preferredCountries: f.preferredCountries.includes(c)
        ? f.preferredCountries.filter(x => x !== c)
        : [...f.preferredCountries, c],
    }));

  const handleFinish = async () => {
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/auth/login"); return; }

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: user.id, email: user.email }),
      });
      if (!res.ok) throw new Error(await res.text());
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ── Step Panels ──────────────────────────────────────────────────────────
  const steps = [
    // Step 1 — Personal
    <div key="personal" className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="First Name *">
          <input className={inputCls} value={form.firstName} onChange={set("firstName")} placeholder="Priya" required />
        </Field>
        <Field label="Last Name *">
          <input className={inputCls} value={form.lastName} onChange={set("lastName")} placeholder="Sharma" required />
        </Field>
      </div>
      <Field label="Phone Number">
        <input className={inputCls} value={form.phone} onChange={set("phone")} placeholder="+977 98XXXXXXXX" />
      </Field>
      <Field label="Gender">
        <select className={selectCls} value={form.gender} onChange={set("gender")}>
          <option value="">Select gender</option>
          <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
        </select>
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="City">
          <input className={inputCls} value={form.city} onChange={set("city")} placeholder="Kathmandu" />
        </Field>
        <Field label="District">
          <input className={inputCls} value={form.district} onChange={set("district")} placeholder="Bagmati" />
        </Field>
      </div>
    </div>,

    // Step 2 — Academic
    <div key="academic" className="space-y-4">
      <Field label="Highest Education Level *">
        <select className={selectCls} value={form.educationLevel} onChange={set("educationLevel")}>
          <option value="">Select level</option>
          <option>SLC / SEE</option><option>+2 (Class 12)</option><option>Bachelor&apos;s</option><option>Master&apos;s</option>
        </select>
      </Field>
      <Field label="Institution Name">
        <input className={inputCls} value={form.institutionName} onChange={set("institutionName")} placeholder="Tribhuvan University" />
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Graduation Year">
          <input className={inputCls} type="number" value={form.graduationYear} onChange={set("graduationYear")} placeholder="2023" min="2000" max="2030" />
        </Field>
        <Field label="GPA / Percentage">
          <input className={inputCls} value={form.gpaOrPercentage} onChange={set("gpaOrPercentage")} placeholder="3.5 or 75%" />
        </Field>
      </div>
      <Field label="Stream / Faculty">
        <select className={selectCls} value={form.stream} onChange={set("stream")}>
          <option value="">Select stream</option>
          <option>Science</option><option>Commerce</option><option>Management</option><option>Humanities</option><option>IT / Engineering</option>
        </select>
      </Field>
    </div>,

    // Step 3 — English Test
    <div key="english" className="space-y-4">
      <Field label="English Proficiency Test">
        <select className={selectCls} value={form.englishTest} onChange={set("englishTest")}>
          <option value="">Select test</option>
          <option>IELTS</option><option>TOEFL</option><option>PTE</option><option>Duolingo</option><option>None (Not taken yet)</option>
        </select>
      </Field>
      {form.englishTest && form.englishTest !== "None (Not taken yet)" && (
        <Field label="Score">
          <input className={inputCls} value={form.englishScore} onChange={set("englishScore")} placeholder={form.englishTest === "IELTS" ? "e.g. 6.5" : form.englishTest === "TOEFL" ? "e.g. 90" : "Score"} />
        </Field>
      )}
      {(form.englishTest === "None (Not taken yet)" || !form.englishTest) && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          💡 Don&apos;t worry — our counselors will help you plan your English test preparation!
        </div>
      )}
    </div>,

    // Step 4 — Study Goals
    <div key="goals" className="space-y-5">
      <Field label="Preferred Countries (select all that apply)">
        <div className="flex flex-wrap gap-2 mt-1">
          {COUNTRIES.map(c => (
            <button
              key={c} type="button"
              onClick={() => toggleCountry(c)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
                form.preferredCountries.includes(c)
                  ? "bg-[#0070F0] text-white border-[#0070F0]"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Field>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Level of Study">
          <select className={selectCls} value={form.preferredLevel} onChange={set("preferredLevel")}>
            <option value="">Select</option>
            <option>Undergraduate (UG)</option><option>Postgraduate (PG)</option><option>PhD</option><option>Diploma / Foundation</option>
          </select>
        </Field>
        <Field label="Field of Interest">
          <input className={inputCls} value={form.preferredField} onChange={set("preferredField")} placeholder="e.g. Computer Science" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Target Intake">
          <select className={selectCls} value={form.targetIntake} onChange={set("targetIntake")}>
            <option value="">Select intake</option>
            {INTAKES.map(i => <option key={i}>{i}</option>)}
          </select>
        </Field>
        <Field label="Annual Budget (USD)">
          <select className={selectCls} value={form.budgetRange} onChange={set("budgetRange")}>
            <option value="">Select budget</option>
            <option>Under $10,000</option><option>$10,000–$20,000</option><option>$20,000–$35,000</option><option>Above $35,000</option>
          </select>
        </Field>
      </div>
    </div>,
  ];

  const isFirst = step === 0;
  const isLast  = step === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Tell us about yourself</h1>
          <p className="text-slate-500 text-sm mt-1">We&apos;ll match you with the best universities and counselors</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <button
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 ${i <= step ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step  ? "bg-green-500 text-white" :
                  i === step ? "bg-[#0070F0] text-white scale-110 shadow-md" :
                  "bg-slate-200 text-slate-500"
                }`}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === step ? "text-[#0070F0]" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 rounded ${i < step ? "bg-green-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            {(() => { const S = STEPS[step]; return <S.icon className="w-5 h-5 text-[#0070F0]" />; })()}
            {STEPS[step].label}
          </h2>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
          )}

          {steps[step]}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {!isFirst && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 h-12 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50 transition flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            )}
            {!isLast ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex-1 h-12 bg-[#0070F0] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={saving}
                className="flex-1 h-12 bg-[#0070F0] hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <>Finish & Go to Dashboard <ArrowRight className="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Step {step + 1} of {STEPS.length} · You can update this anytime from your profile
        </p>
      </div>
    </div>
  );
}
