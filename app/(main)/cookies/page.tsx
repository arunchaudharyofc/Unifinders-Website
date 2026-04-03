import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy — Unifinders Education Pvt. Ltd.",
  description: "Learn how Unifinders uses cookies and similar tracking technologies on our platform.",
};

const COOKIE_TYPES = [
  {
    name: "Essential Cookies",
    required: true,
    color: "bg-green-100 text-green-700",
    examples: ["Authentication tokens", "Session management", "CSRF protection", "Load balancing"],
    desc: "These cookies are strictly necessary for the platform to function. They cannot be disabled as the platform would not work without them.",
  },
  {
    name: "Analytics Cookies",
    required: false,
    color: "bg-blue-100 text-blue-700",
    examples: ["Google Analytics", "Page view tracking", "User journey mapping", "Error reporting"],
    desc: "Help us understand how visitors interact with our platform so we can improve the user experience. All data is anonymized.",
  },
  {
    name: "Preference Cookies",
    required: false,
    color: "bg-purple-100 text-purple-700",
    examples: ["Language settings", "Theme preferences", "Search history", "Saved filters"],
    desc: "Remember your settings and preferences so you don't have to reconfigure them every visit.",
  },
  {
    name: "Marketing Cookies",
    required: false,
    color: "bg-orange-100 text-orange-700",
    examples: ["Facebook Pixel", "Google Ads", "Retargeting campaigns", "Conversion tracking"],
    desc: "Used to deliver relevant advertisements on external platforms. You can opt out without affecting core functionality.",
  },
];

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-br from-[#0C1A3E] to-[#1D4ED8] pt-28 pb-14 px-4 text-center">
        <nav className="text-xs text-blue-300 mb-4 flex items-center justify-center gap-1.5">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" /><span className="text-blue-100">Cookie Policy</span>
        </nav>
        <h1 className="text-4xl font-extrabold text-white mb-3">Cookie Policy</h1>
        <p className="text-blue-200 text-sm">Last updated: January 1, 2024</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-14 pb-20">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10">
          <p className="text-sm text-slate-700 leading-relaxed">
            This Cookie Policy explains how <strong>Unifinders Education Pvt. Ltd.</strong> uses cookies and similar tracking technologies on <strong>myunifinders.com</strong>. By using our platform, you consent to our use of cookies as described below.
          </p>
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 mb-3">What Are Cookies?</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-10">
          Cookies are small text files placed on your device when you visit a website. They help websites remember information about your visit, making it easier to revisit the site and making the site more useful to you. Cookies can be &quot;session&quot; cookies (deleted when you close your browser) or &quot;persistent&quot; cookies (stored for a set period).
        </p>

        <h2 className="text-xl font-extrabold text-slate-900 mb-6">Types of Cookies We Use</h2>
        <div className="space-y-6 mb-12">
          {COOKIE_TYPES.map(ct => (
            <div key={ct.name} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-slate-900">{ct.name}</h3>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${ct.color}`}>
                  {ct.required ? "Required" : "Optional"}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{ct.desc}</p>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {ct.examples.map(ex => (
                    <span key={ex} className="text-xs bg-slate-50 text-slate-600 px-3 py-1 rounded-full border border-slate-200">{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-extrabold text-slate-900 mb-3">Managing Cookies</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          You can control and manage cookies through your browser settings. Most browsers allow you to refuse cookies, delete existing cookies, and receive alerts when new cookies are set. Note that disabling certain cookies may affect the functionality of our platform.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed mb-10">
          To opt out of Google Analytics tracking, visit <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="text-[#1D4ED8] font-semibold hover:underline">Google Analytics Opt-out</a>. To opt out of interest-based advertising, visit <a href="https://www.youronlinechoices.com" target="_blank" rel="noreferrer" className="text-[#1D4ED8] font-semibold hover:underline">Your Online Choices</a>.
        </p>

        <h2 className="text-xl font-extrabold text-slate-900 mb-3">Changes to This Policy</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-10">
          We may update this Cookie Policy periodically to reflect changes in technology, law, or our business practices. We encourage you to review this page regularly. Significant changes will be communicated via email to registered users.
        </p>

        <h2 className="text-xl font-extrabold text-slate-900 mb-3">Contact</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Questions about our cookie use? Contact us at <a href="mailto:privacy@myunifinders.com" className="text-[#1D4ED8] font-semibold hover:underline">privacy@myunifinders.com</a>
        </p>

        <div className="mt-12 flex gap-4 flex-wrap">
          <Link href="/privacy" className="text-sm font-semibold text-[#1D4ED8] hover:underline">Privacy Policy →</Link>
          <Link href="/terms" className="text-sm font-semibold text-[#1D4ED8] hover:underline">Terms of Service →</Link>
        </div>
      </div>
    </div>
  );
}
