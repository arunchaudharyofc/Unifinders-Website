"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, CheckCircle2, ChevronDown, Mail, ArrowRight, AlertCircle } from "lucide-react";

function LeftPanel() {
  return (
    <div className="hidden md:flex flex-col justify-between bg-[#1D4ED8] relative overflow-hidden w-[45%] shrink-0 p-8">
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
        <h2 className="text-2xl font-extrabold text-white leading-snug mb-8">
          Want to study abroad?<br />Sign up with unifinders!
        </h2>
        {["Free counselling", "Application and visa guidance", "Discover Scholarships", "Complete Academic Support"].map(item => (
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

type Step = "register" | "otp_sent" | "success";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();

  const [step, setStep] = useState<Step>("register");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  /* ── Google OAuth ── */
  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  /* ── Facebook OAuth ── */
  const handleFacebook = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  /* ── Email + Password Register ── */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!firstName.trim() || !lastName.trim()) { setError("First and last name are required."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (!agreedToTerms) { setError("Please agree to the Terms & Conditions and Privacy Policy."); return; }

    setLoading(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      if (signUpError.status === 429 || signUpError.message.toLowerCase().includes("rate limit") || signUpError.message.toLowerCase().includes("email rate")) {
        setError("Too many signup attempts. Please wait a few minutes and try again, or use Google to sign up instantly.");
      } else if (signUpError.message.toLowerCase().includes("already registered") || signUpError.message.toLowerCase().includes("already been registered")) {
        setError("This email is already registered. Please log in instead.");
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    /**
     * DUPLICATE EMAIL DETECTION:
     * Supabase signUp returns a fake user with identities=[] when the email exists
     * but email confirmation is enabled. We detect this to show a proper error.
     */
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError("An account with this email already exists. Please log in or use 'Forgot Password' to recover your account.");
      setLoading(false);
      return;
    }

    // Email confirmation required → show OTP screen
    if (data.user && !data.session) {
      setStep("otp_sent");
      setResendCooldown(60);
    } else if (data.session) {
      // Auto-confirmed → congratulations then onboarding
      setStep("success");
    }
    setLoading(false);
  };

  /* ── Resend OTP ── */
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      if (error.status === 429) {
        setError("Too many attempts. Please wait a few minutes before trying again.");
      } else {
        setError(error.message);
      }
    } else {
      setResendCooldown(60);
    }
    setLoading(false);
  };

  /* ── OTP Verification ── */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;
    setLoading(true);
    setError(null);

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "signup",
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    // Verification successful — show congratulations
    setStep("success");
    setLoading(false);
  };

  /* ── OTP Input Handler ── */
  const handleOtpInput = (index: number, value: string) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));
    // Auto-focus next input
    if (value && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    setOtp(pastedData);
    // Focus last filled input or the next empty one
    const nextIndex = Math.min(pastedData.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  /* ── OTP Verification Screen ── */
  if (step === "otp_sent") {
    return (
      <div className="w-full max-w-[860px] rounded-2xl overflow-hidden shadow-2xl flex bg-white">
        <LeftPanel />
        <div className="flex-1 flex flex-col justify-center px-10 py-12">
          <div className="max-w-sm w-full mx-auto">
            <h2 className="text-[28px] font-extrabold text-[#101828] mb-2">OTP Verification</h2>
            <p className="text-[15px] text-[#475467] mb-8">
              Enter the 6-digit code sent to <span className="font-semibold text-[#101828]">{email}</span>
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-6 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div className="flex justify-between gap-3" onPaste={handleOtpPaste}>
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-[#D0D5DD] focus:border-[#0070F0] focus:ring-2 focus:ring-blue-100 outline-none transition"
                    value={otp[i] || ""}
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-[14px] text-[#475467]">
                  Didn't receive the OTP?{" "}
                  {resendCooldown > 0 ? (
                    <span className="text-slate-400">Resend in {resendCooldown}s</span>
                  ) : (
                    <button type="button" onClick={handleResendOtp} disabled={loading}
                      className="text-[#0070F0] font-semibold hover:underline disabled:opacity-50">
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full h-12 bg-[#0070F0] hover:bg-blue-600 text-white font-bold rounded-xl text-[15px] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : "Verify & Continue"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Or check your email for a{" "}
              <span className="font-semibold text-[#101828]">verification link</span>{" "}
              to sign in directly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Congratulations Screen ── */
  if (step === "success") {
    return (
      <div className="w-full max-w-[600px] bg-white rounded-3xl shadow-2xl p-12 text-center relative overflow-hidden">
        {/* Confetti animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 60}%`,
                width: `${6 + Math.random() * 10}px`,
                height: `${6 + Math.random() * 10}px`,
                backgroundColor: ['#FFD700', '#FF6B35', '#1D4ED8', '#10B981', '#F59E0B', '#EF4444'][i % 6],
                transform: `rotate(${Math.random() * 360}deg)`,
                borderRadius: i % 3 === 0 ? '50%' : '0',
                opacity: 0.6,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="text-[80px] mb-6 leading-none relative z-10">👏</div>

        <h2 className="text-[28px] font-extrabold text-[#E02424] mb-2 relative z-10">
          Congratulation! You are all set!
        </h2>
        <p className="text-[15px] font-medium text-[#101828] mb-4 relative z-10">
          Enjoy your experience
        </p>

        <p className="text-[14px] text-[#475467] max-w-sm mx-auto mb-10 relative z-10 leading-relaxed">
          Hope you have an awesome experience. We're super excited to help you through your journey abroad.
        </p>

        <button
          onClick={() => router.push("/onboarding")}
          className="h-12 px-8 bg-[#0070F0] hover:bg-blue-600 text-white font-bold rounded-xl text-[15px] transition-all inline-flex items-center gap-2 relative z-10 shadow-lg hover:shadow-xl"
        >
          Proceed to Onboarding <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  /* ── Registration Form (matches Figma) ── */
  return (
    <div className="w-full max-w-[860px] rounded-2xl overflow-hidden shadow-2xl flex bg-white">
      <LeftPanel />
      <div className="flex-1 flex flex-col justify-center px-8 py-8 overflow-y-auto">
        <div className="max-w-sm w-full mx-auto">
          <p className="text-xs font-bold text-[#1D4ED8] mb-1">Welcome to Unifinders!</p>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Create your Account</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4 leading-relaxed flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                {error}
                {error.includes("already exists") && (
                  <div className="mt-2 flex gap-3">
                    <Link href="/auth/login" className="text-[#1D4ED8] font-bold hover:underline">Log in →</Link>
                    <Link href="/auth/forgot-password" className="text-[#1D4ED8] font-bold hover:underline">Forgot password?</Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Auth */}
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

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-white text-xs text-slate-400">or</span></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* First + Last Name (side by side per Figma) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}
                  placeholder="Enter first name" autoComplete="given-name"
                  className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)}
                  placeholder="Enter last name" autoComplete="family-name"
                  className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address <span className="text-red-500">*</span></label>
              <input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
              <div className="flex h-11 border border-slate-300 rounded-lg overflow-hidden focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-blue-100 transition">
                <div className="flex items-center gap-1 px-3 bg-slate-50 border-r border-slate-300 text-sm text-slate-700 shrink-0">
                  <span>🇳🇵</span><span className="font-medium">+977</span><ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="flex-1 px-3 text-sm text-slate-900 placeholder-slate-400 outline-none bg-transparent" />
              </div>
            </div>

            {/* Password + Confirm Password (side by side per Figma) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required autoComplete="new-password"
                    value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full h-11 px-4 pr-10 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                    {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} required autoComplete="new-password"
                    value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full h-11 px-4 pr-10 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                    {showConfirmPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={e => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#1D4ED8] focus:ring-blue-100"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 leading-relaxed">
                I agree to{" "}
                <Link href="/terms" className="text-[#1D4ED8] font-semibold hover:underline">Terms & Condition</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#1D4ED8] font-semibold hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-11 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-1">
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Creating account...</> : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an Account?{" "}
            <Link href="/auth/login" className="text-[#1D4ED8] font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
