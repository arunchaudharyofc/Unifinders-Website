"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { ArrowRight, ArrowLeft, CheckCircle2, Search, Check, ChevronDown, Loader2 } from "lucide-react";

const STEPS = ["startup", "education", "english", "course", "destination", "personal"] as const;
type Step = typeof STEPS[number];

type OnboardingData = {
  currentStatus: "graduated" | "studying" | "";
  educationCountry: string;
  educationLevel: string;
  degree: string;
  gradingScheme: string;
  grade: string;
  englishTest: string;
  examDate: string;
  resultDate: string;
  applyingLevel: string;
  coursesOfInterest: string[];
  startYear: string;
  startIntake: string;
  targetCountries: string[];
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobile: string;
  termsAgreed: boolean;
};

function LeftPanel() {
  return (
    <div className="hidden md:flex flex-col justify-between bg-[#1D4ED8] relative overflow-hidden w-[45%] shrink-0 p-10">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=60"
          alt="Study abroad" fill unoptimized className="object-cover opacity-20" loading="eager" />
      </div>
      <div className="relative z-10">
        <div className="mb-12 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#1D4ED8] font-extrabold text-xs">U</span>
          </div>
          <div>
            <p className="text-white font-extrabold text-sm leading-none">unifinders</p>
            <p className="text-blue-200 text-[9px]">Education Pvt. Ltd.</p>
          </div>
        </div>
        <h2 className="text-[32px] font-extrabold text-white leading-[1.1] mb-10">
          Want to study abroad?<br />Sign up with unifinders!
        </h2>
        {["Free counselling", "Through application and visa guidance", "Discover Scholarships", "Complete Academic Support"].map(item => (
          <div key={item} className="flex items-center gap-4 mb-5">
            <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-white text-[15px] font-semibold">{item}</span>
          </div>
        ))}
      </div>
      <div className="relative z-10 opacity-30 mix-blend-overlay pointer-events-none">
        <div className="w-40 h-40 border-8 border-white rounded-full absolute -bottom-10 -right-10" />
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<OnboardingData>({
    currentStatus: "",
    educationCountry: "", educationLevel: "", degree: "", gradingScheme: "", grade: "",
    englishTest: "", examDate: "", resultDate: "",
    applyingLevel: "", coursesOfInterest: [],
    startYear: "", startIntake: "", targetCountries: [],
    firstName: "", middleName: "", lastName: "", email: "", mobile: "", termsAgreed: false,
  });

  // Pre-fill email and name from auth if available
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setForm(f => ({
          ...f,
          email: user.email || "",
          firstName: user.user_metadata?.full_name?.split(" ")[0] || "",
          lastName: user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "",
        }));
      }
    });
  }, [supabase]);

  const step = STEPS[stepIndex];
  const next = () => setStepIndex(s => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStepIndex(s => Math.max(s - 1, 0));

  const set = (k: keyof OnboardingData, v: any) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in to continue.");

      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: user.id, email: user.email }),
      });

      const responseData = await res.json().catch(() => null);

      if (!res.ok) {
        const errorMsg = responseData?.error || responseData?.message || "Something went wrong. Please try again.";
        throw new Error(errorMsg);
      }

      router.push("/dashboard");
    } catch (e: any) {
      console.error("[Onboarding] Submit error:", e);
      setError(e.message || "Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full h-11 px-4 rounded-xl border border-[#D0D5DD] text-[14px] text-[#101828] placeholder-[#98A2B3] outline-none focus:border-[#0070F0] focus:ring-2 focus:ring-blue-100 transition";
  const labelClasses = "block text-[14px] font-semibold text-[#344054] mb-2";

  /* --- Render Step 0: Startup --- */
  if (step === "startup") {
    return (
      <div className="w-full max-w-[640px] bg-white rounded-2xl p-12 text-center shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-[28px] font-bold text-[#101828] mb-2">Hey {form.firstName || "there"} 👋</h1>
        <h2 className="text-[32px] font-extrabold text-[#101828] mb-6">Welcome to Unifinders!</h2>
        <p className="text-[15px] text-[#475467] leading-relaxed max-w-lg mx-auto mb-10">
          We are happy to assist you to study at your dream destination. Before getting into your dashboard, please provide us your details. So that we can provide you the options based on your requirement.
        </p>

        <div className="grid grid-cols-2 gap-6 mb-12 max-w-md mx-auto">
          <button
            onClick={() => set("currentStatus", "graduated")}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 relative ${form.currentStatus === "graduated" ? "border-[#1D4ED8] bg-blue-50/50 shadow-md scale-[1.02]" : "border-[#EAECF0] hover:border-[#1D4ED8]/30"}`}
          >
            {form.currentStatus === "graduated" && (
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#1D4ED8] text-white rounded-full flex items-center justify-center"><Check className="w-4 h-4" /></div>
            )}
            <div className="text-4xl">🎓</div>
            <span className={`text-[15px] font-bold ${form.currentStatus === "graduated" ? "text-[#1D4ED8]" : "text-[#101828]"}`}>I'm Graduated</span>
          </button>
          <button
            onClick={() => set("currentStatus", "studying")}
            className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 relative ${form.currentStatus === "studying" ? "border-[#1D4ED8] bg-blue-50/50 shadow-md scale-[1.02]" : "border-[#EAECF0] hover:border-[#1D4ED8]/30"}`}
          >
            {form.currentStatus === "studying" && (
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#1D4ED8] text-white rounded-full flex items-center justify-center"><Check className="w-4 h-4" /></div>
            )}
            <div className="text-4xl">📖</div>
            <span className={`text-[15px] font-bold ${form.currentStatus === "studying" ? "text-[#1D4ED8]" : "text-[#101828]"}`}>I'm Studying</span>
          </button>
        </div>

        <button
          onClick={next}
          disabled={!form.currentStatus}
          className="h-12 px-10 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-[15px] transition-all inline-flex items-center gap-2 disabled:opacity-50 shadow-sm"
        >
          Continue to Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  /* --- Render Main Layout for Steps 1-5 --- */
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-[960px] bg-white rounded-2xl overflow-hidden shadow-2xl flex">
        <LeftPanel />
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-8 sm:p-10">
            {error && (
              <div className="bg-red-50 text-red-700 text-sm p-4 rounded-xl mb-6">{error}</div>
            )}

            {/* Step 1: Education */}
            {step === "education" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8 border-b border-[#EAECF0] pb-6">
                  <h2 className="text-[20px] font-bold text-[#101828] mb-2">Education</h2>
                  <p className="text-[14px] text-[#475467]">We'd like to learn more about your education background so that, we can suggest the best universities or colleges for you.</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className={labelClasses}>Country of Education</label>
                    <div className="relative">
                      <select className={`${inputClasses} appearance-none cursor-pointer`} value={form.educationCountry} onChange={e => set("educationCountry", e.target.value)}>
                        <option value="">Select</option>
                        <option>Nepal</option><option>India</option><option>Australia</option><option>USA</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#667085] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Level of Education</label>
                    <input className={inputClasses} placeholder="Example: Undergraduate" value={form.educationLevel} onChange={e => set("educationLevel", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClasses}>Degree</label>
                    <input className={inputClasses} placeholder="Example: Bachelors in Information Management" value={form.degree} onChange={e => set("degree", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClasses}>Grading Scheme</label>
                      <div className="relative">
                        <select className={`${inputClasses} appearance-none cursor-pointer`} value={form.gradingScheme} onChange={e => set("gradingScheme", e.target.value)}>
                          <option value="">Select</option>
                          <option>CGPA (4.0 Scale)</option><option>Percentage (%)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#667085] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className={labelClasses}>Your Grade</label>
                      <input className={inputClasses} placeholder="Example: 3.4" value={form.grade} onChange={e => set("grade", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: English Profession Test */}
            {step === "english" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8 border-b border-[#EAECF0] pb-6">
                  <h2 className="text-[20px] font-bold text-[#101828] mb-2">English Profession Test</h2>
                  <p className="text-[14px] text-[#475467]">We'd like to learn more about your education background so that, we can suggest the best universities or colleges for you.</p>
                </div>
                
                <h3 className="text-[16px] font-bold text-[#101828] mb-4">English Profession Test you have done</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {["IELTS", "GMAT", "GRE", "OET", "Pearson", "SAT", "TOEFL"].map(t => (
                    <button key={t} onClick={() => set("englishTest", t)} className={`h-[72px] rounded-xl border flex items-center justify-center relative transition-all ${form.englishTest === t ? "border-[#0070F0] bg-blue-50/20" : "border-[#EAECF0] hover:border-[#0070F0]/30 bg-white"}`}>
                      {form.englishTest === t && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                      <span className="font-bold text-[#101828] text-lg">{t}</span>
                    </button>
                  ))}
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer mb-8">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${form.englishTest === "Not done yet" ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD] bg-white"}`}>
                    {form.englishTest === "Not done yet" && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={form.englishTest === "Not done yet"} onChange={() => set("englishTest", "Not done yet")} />
                  <span className="text-[14px] text-[#344054] font-medium">Not done yet</span>
                </label>

                {form.englishTest && form.englishTest !== "Not done yet" && (
                  <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#EAECF0]">
                    <h4 className="text-[16px] font-bold text-[#101828] mb-4">{form.englishTest}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClasses}>Examination Date</label>
                        <input type="date" className={inputClasses} value={form.examDate} onChange={e => set("examDate", e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClasses}>Result Date</label>
                        <input type="date" className={inputClasses} value={form.resultDate} onChange={e => set("resultDate", e.target.value)} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Course of Interest */}
            {step === "course" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8 border-b border-[#EAECF0] pb-6">
                  <h2 className="text-[20px] font-bold text-[#101828] mb-2">Course of Interest</h2>
                  <p className="text-[14px] text-[#475467]">We'd like to learn more about your education background so that, we can suggest the best universities or colleges for you.</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-[16px] font-bold text-[#101828] mb-4">For which level you are applying for</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Bachelor's", "Master's", "Post Graduation", "Diploma", "12th Degree"].map(lvl => (
                      <button key={lvl} onClick={() => set("applyingLevel", lvl)} className={`px-5 py-2.5 rounded-xl border text-[14px] font-medium transition-all relative ${form.applyingLevel === lvl ? "border-[#0070F0] text-[#0070F0]" : "border-[#EAECF0] text-[#344054] hover:bg-slate-50"}`}>
                        {form.applyingLevel === lvl && <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>}
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[16px] font-bold text-[#101828] mb-4 flex items-center gap-2">Course of Interest <span className="text-[#98A2B3] text-[13px] font-normal">(Choose upto 3 Courses)</span></h3>
                  <div className="relative mb-5">
                    <Search className="w-5 h-5 text-[#98A2B3] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search course" className={`${inputClasses} pl-11`} />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {["Computer Science", "Data Science and Data Analytics", "Management Information System", "Engineering", "Nursing", "12th Degree"].map(crs => {
                      const selected = form.coursesOfInterest.includes(crs);
                      return (
                        <button key={crs} onClick={() => {
                          if (selected) set("coursesOfInterest", form.coursesOfInterest.filter(c => c !== crs));
                          else if (form.coursesOfInterest.length < 3) set("coursesOfInterest", [...form.coursesOfInterest, crs]);
                        }} className={`px-5 py-2.5 rounded-xl border text-[14px] font-medium transition-all relative ${selected ? "border-[#0070F0] text-[#0070F0]" : "border-[#EAECF0] text-[#344054] hover:bg-slate-50"}`}>
                          {selected && <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>}
                          {crs}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Destination */}
            {step === "destination" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-8 border-b border-[#EAECF0] pb-6">
                  <h2 className="text-[20px] font-bold text-[#101828] mb-2">Destination</h2>
                  <p className="text-[14px] text-[#475467]">We'd like to learn more about your education background so that, we can suggest the best universities or colleges for you.</p>
                </div>

                <div className="space-y-8">
                  {/* Start Year */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#101828] mb-4">When are you planning to start studying</h3>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {["2024", "2025", "2026", "2027"].map(y => (
                        <button key={y} onClick={() => set("startYear", y)} className={`h-11 rounded-xl border text-[14px] font-medium transition-all relative ${form.startYear === y ? "border-[#0070F0] text-[#0070F0]" : "border-[#EAECF0] text-[#344054] hover:bg-slate-50"}`}>
                          {form.startYear === y && <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>}
                          {y}
                        </button>
                      ))}
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${form.startYear === "Not decided yet" ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD] bg-white"}`}>
                        {form.startYear === "Not decided yet" && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={form.startYear === "Not decided yet"} onChange={() => set("startYear", "Not decided yet")} />
                      <span className="text-[14px] text-[#344054] font-medium">Not decided yet</span>
                    </label>
                  </div>

                  {/* Intake */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#101828] mb-4">Intake you planning to start studying</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: "Jan - Apr", sub: "Spring" }, { label: "May - Aug", sub: "Summer" },
                        { label: "Aug - Nov", sub: "Fall" }, { label: "Dec - Feb", sub: "Winter" }
                      ].map(i => (
                        <button key={i.label} onClick={() => set("startIntake", i.label)} className={`px-4 h-12 rounded-xl border flex items-center justify-between transition-all relative ${form.startIntake === i.label ? "border-[#0070F0] text-[#0070F0]" : "border-[#EAECF0] text-[#101828] hover:bg-slate-50"}`}>
                          {form.startIntake === i.label && <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>}
                          <span className="font-bold text-[14px]">{i.label}</span>
                          <span className="text-[13px] text-[#98A2B3]">{i.sub}</span>
                        </button>
                      ))}
                    </div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${form.startIntake === "Not decided yet" ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD] bg-white"}`}>
                        {form.startIntake === "Not decided yet" && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <input type="checkbox" className="hidden" checked={form.startIntake === "Not decided yet"} onChange={() => set("startIntake", "Not decided yet")} />
                      <span className="text-[14px] text-[#344054] font-medium">Not decided yet</span>
                    </label>
                  </div>

                  {/* Country */}
                  <div>
                    <h3 className="text-[16px] font-bold text-[#101828] mb-4">Country you would like to Study</h3>
                    <div className="flex gap-3">
                      {[
                        { name: "Australia", flag: "🇦🇺" }, { name: "Canada", flag: "🇨🇦" }, { name: "United States", flag: "🇺🇸" }
                      ].map(c => {
                        const selected = form.targetCountries.includes(c.name);
                        return (
                          <button key={c.name} onClick={() => {
                            if (selected) set("targetCountries", form.targetCountries.filter(tc => tc !== c.name));
                            else set("targetCountries", [...form.targetCountries, c.name]);
                          }} className={`px-4 h-12 rounded-xl border flex items-center gap-2 transition-all relative ${selected ? "border-[#0070F0]" : "border-[#EAECF0] hover:bg-slate-50"}`}>
                            {selected && <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-2.5 h-2.5" /></div>}
                            <span className="text-lg">{c.flag}</span>
                            <span className="font-semibold text-[14px] text-[#101828]">{c.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Personal Information */}
            {step === "personal" && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="mb-6 border-b border-[#EAECF0] pb-6">
                  <h2 className="text-[18px] font-bold text-[#059669] mb-1">Final Step!</h2>
                  <h3 className="text-[20px] font-bold text-[#101828] mb-1">Personal Information</h3>
                  <p className="text-[14px] text-[#475467]">We are almost there!</p>
                </div>

                <div className="bg-[#FFF4ED] border border-[#F97316] rounded-xl p-4 flex gap-3 mb-8">
                  <div className="w-5 h-5 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">i</div>
                  <p className="text-[#C2410C] text-[14px] font-medium leading-relaxed">
                    Make sure that all the information provided are correct and fill out those that are not available.
                  </p>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className={labelClasses}>First Name</label>
                      <input className={inputClasses} value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="John" />
                    </div>
                    <div>
                      <label className={labelClasses}>Middle Name</label>
                      <input className={inputClasses} value={form.middleName} onChange={e => set("middleName", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClasses}>Last Name</label>
                      <input className={inputClasses} value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Smith" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Email address</label>
                    <input type="email" className={inputClasses} value={form.email} onChange={e => set("email", e.target.value)} placeholder="johnsmith015@gmail.com" />
                  </div>

                  <div>
                    <label className={labelClasses}>Mobile Number</label>
                    <div className="flex h-11 border border-[#D0D5DD] rounded-xl overflow-hidden focus-within:border-[#0070F0] focus-within:ring-2 focus-within:ring-blue-100 transition">
                      <div className="flex items-center gap-1 px-3 bg-slate-50 border-r border-[#D0D5DD] text-[14px] text-[#344054] shrink-0">
                        <span>🇳🇵</span><span className="font-medium">+977</span><ChevronDown className="w-4 h-4 text-[#667085]" />
                      </div>
                      <input type="tel" value={form.mobile} onChange={e => set("mobile", e.target.value)}
                        placeholder="Mobile number"
                        className="flex-1 px-3 text-[14px] text-[#101828] placeholder-[#98A2B3] outline-none bg-transparent" />
                    </div>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer mt-6 pt-6 border-t border-[#EAECF0]">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${form.termsAgreed ? "bg-[#0070F0] border-[#0070F0]" : "border-[#D0D5DD] bg-white"}`}>
                      {form.termsAgreed && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <input type="checkbox" className="hidden" checked={form.termsAgreed} onChange={() => set("termsAgreed", !form.termsAgreed)} />
                    <span className="text-[14px] text-[#344054]">
                      I've read and I agree to all Unifinder's <a href="#" className="text-[#0070F0] hover:underline font-medium">Terms</a> and <a href="#" className="text-[#0070F0] hover:underline font-medium">Privacy Policies</a>
                    </span>
                  </label>
                </div>
              </div>
            )}

          </div>
          
          {/* Bottom Navigation */}
          <div className="p-6 sm:px-10 sm:py-6 border-t border-[#EAECF0] bg-white flex items-center justify-between shrink-0 mt-auto">
            <button onClick={back} className="flex items-center gap-2 text-[15px] font-bold text-[#344054] hover:text-[#101828] transition px-4 py-2 rounded-lg hover:bg-slate-50">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            {step !== "personal" ? (
              <button onClick={next} className="h-11 px-6 bg-[#0070F0] hover:bg-blue-600 text-white font-bold rounded-xl text-[15px] transition-all flex items-center gap-2 shadow-sm">
                Continue to Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={loading || !form.termsAgreed}
                className="h-11 px-6 bg-[#0070F0] hover:bg-blue-600 text-white font-bold rounded-xl text-[15px] transition-all flex items-center gap-2 shadow-sm disabled:opacity-60"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : <>Submit & Create Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
