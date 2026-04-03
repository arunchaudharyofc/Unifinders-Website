"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle2, ChevronDown } from "lucide-react";

function LeftPanel() {
  return (
    <div className="hidden md:flex flex-col justify-between bg-[#1D4ED8] relative overflow-hidden w-[45%] shrink-0 p-8">
      <div className="absolute inset-0">
        <Image src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&q=60"
          alt="Study abroad" fill unoptimized className="object-cover opacity-20" />
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
        <h2 className="text-2xl font-extrabold text-white leading-snug mb-8">
          Want to study abroad?<br />Sign up with unifinders!
        </h2>
        {["Free counselling","Through application and visa guidance","Discover Scholarships","Complete Academic Support"].map(item => (
          <div key={item} className="flex items-center gap-3 mb-4">
            <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
            <span className="text-white text-sm font-semibold">{item}</span>
          </div>
        ))}
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-2xl">📚</span>
        </div>
      </div>
    </div>
  );
}

// OTP Input with auto-advance
function OTPInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) refs[idx - 1].current?.focus();
  };

  const handleChange = (idx: number, v: string) => {
    const digit = v.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[idx] = digit;
    onChange(next);
    if (digit && idx < 5) refs[idx + 1].current?.focus();
  };

  return (
    <div className="flex gap-3 justify-center my-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <input key={i} ref={refs[i]} type="text" inputMode="numeric" maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKey(i, e)}
          className={`w-12 h-14 text-center text-xl font-extrabold border-2 rounded-xl outline-none transition-all ${
            value[i] ? "border-[#1D4ED8] bg-blue-50 text-[#1D4ED8]" : "border-slate-200 bg-slate-50 text-slate-900"
          } focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100`} />
      ))}
    </div>
  );
}

type Step = "register" | "otp" | "success";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleFacebook = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: "facebook", options: { redirectTo: `${window.location.origin}/auth/callback` } });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: fullName, phone }, emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); } else { setStep("otp"); setResendCooldown(60); }
    setLoading(false);
  };

  const handleVerifyOTP = () => {
    const code = otp.join("");
    if (code.length < 6) { setError("Please enter all 6 digits."); return; }
    setStep("success");
    setTimeout(() => router.push("/dashboard"), 2000);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    supabase.auth.resend({ type: "signup", email });
  };

  if (step === "success") {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-sm w-full">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">Account Created! 🎉</h2>
        <p className="text-sm text-slate-500">Redirecting to your dashboard...</p>
      </div>
    );
  }

  if (step === "otp") {
    return (
      <div className="w-full max-w-[860px] rounded-2xl overflow-hidden shadow-2xl flex bg-white">
        <LeftPanel />
        <div className="flex-1 flex flex-col justify-center px-8 py-10">
          <div className="max-w-sm w-full mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#1D4ED8] flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
              </svg>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mb-2">OTP Verification!</h2>
            <p className="text-sm text-slate-500 mb-1">We have sent you a text message with 6-digit verification code to</p>
            <p className="text-sm font-bold text-[#1D4ED8]">{email}</p>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-2 mt-3 text-left">{error}</div>}
            <OTPInput value={otp} onChange={setOtp} />
            <p className="text-sm text-slate-500 mb-6">
              Didn&apos;t receive any code?{" "}
              <button onClick={handleResend} disabled={resendCooldown > 0}
                className="text-[#1D4ED8] font-bold hover:underline disabled:opacity-50">
                {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : "Resend OTP"}
              </button>
            </p>
            <button onClick={handleVerifyOTP}
              className="w-full h-11 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 mb-4">
              Verify Code
            </button>
            <p className="text-sm text-slate-500 mb-8">
              Having trouble with OTP?{" "}
              <Link href="/contact" className="text-[#1D4ED8] font-bold hover:underline">Get Help</Link>
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mb-1">
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            </div>
            <p className="text-xs text-slate-400">©2024, Unifinders Education Pvt. Ltd.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[860px] rounded-2xl overflow-hidden shadow-2xl flex bg-white">
      <LeftPanel />
      <div className="flex-1 flex flex-col justify-center px-8 py-8 overflow-y-auto">
        <div className="max-w-sm w-full mx-auto">
          <p className="text-xs font-bold text-[#1D4ED8] mb-1">Welcome to Unifinders!</p>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Create your account</h1>
          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">{error}</div>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
              <input type="text" required autoComplete="name" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Priya Sharma"
                className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address <span className="text-red-500">*</span></label>
              <input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
              <div className="flex h-11 border border-slate-300 rounded-lg overflow-hidden focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-blue-100 transition">
                <div className="flex items-center gap-1 px-3 bg-slate-50 border-r border-slate-300 text-sm text-slate-700 shrink-0">
                  <span>🇳🇵</span><span className="font-medium">+977</span><ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="flex-1 px-3 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} required autoComplete="new-password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full h-11 px-4 pr-10 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                  {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full h-11 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-1">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : "Create Account"}
            </button>
          </form>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-white text-xs text-slate-400">or</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={handleGoogle} disabled={loading}
              className="h-11 border border-slate-200 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button onClick={handleFacebook} disabled={loading}
              className="h-11 border border-slate-200 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-[#1D4ED8] font-bold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
