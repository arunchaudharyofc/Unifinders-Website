"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Loader2, CheckCircle2, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Check your email</h1>
              <p className="text-slate-500 text-sm mb-2">
                We sent a password reset link to
              </p>
              <p className="text-[#1D4ED8] font-bold text-sm mb-6">{email}</p>
              <p className="text-slate-400 text-xs mb-8">
                Didn't receive it? Check your spam folder.<br />The link expires in 1 hour.
              </p>
              <Link href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#1D4ED8] hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <Link href="/auth/login" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-[#1D4ED8] transition mb-6">
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#1D4ED8]" />
                </div>
                <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Forgot password?</h1>
                <p className="text-slate-500 text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    autoComplete="email"
                    className="w-full h-11 px-4 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : "Send Reset Link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
