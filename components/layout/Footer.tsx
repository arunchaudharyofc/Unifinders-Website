/**
 * FOOTER COMPONENT — Pixel-perfect Figma match
 *
 * Layout (top → bottom):
 *   1. Logo + "Get end-to-end support..." | "Connect with Us" + 4 social circles
 *   2. HR divider
 *   3. Contact row: Location | Contact Us | Email Us (icon + bold label + text)
 *   4. HR divider
 *   5. 4 link columns + "Become a Contributor" card
 *   6. Dark copyright bar
 */
"use client";

import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";
import { FOOTER_DATA } from "@/lib/constants/landing";
import Link from "next/link";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z"/>
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ElementType> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedinIcon,
  Twitter: XIcon,
  TikTok: TikTokIcon,
};

export default function Footer() {
  return (
    <footer id="footer" role="contentinfo" className="bg-[#F8FAFC] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Row 1: Logo + tagline | Social links ── */}
        <div className="py-10 flex flex-col sm:flex-row justify-between items-start sm:items-start gap-8">
          {/* Logo + tagline */}
          <div>
            <img
              src="/images/logo.png"
              alt="Unifinders Education Pvt. Ltd."
              className="h-12 w-auto object-contain mb-3"
            />
            <p className="text-[14px] text-slate-500 max-w-[260px] leading-snug">
              {FOOTER_DATA.tagline}
            </p>
          </div>

          {/* Connect with Us */}
          <div className="text-right">
            <p className="text-[14px] font-semibold text-slate-800 mb-4">Connect with Us</p>
            <div className="flex gap-3 justify-end">
              {FOOTER_DATA.socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                const brandStyles: Record<string, string> = {
                  Facebook: "bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#166fe5] hover:border-[#166fe5]",
                  Instagram: "bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] text-white border-transparent hover:opacity-90",
                  Linkedin:  "bg-[#0A66C2] text-white border-[#0A66C2] hover:bg-[#004182] hover:border-[#004182]",
                  TikTok:    "bg-[#010101] text-white border-[#010101] hover:bg-[#333] hover:border-[#333]",
                };
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${brandStyles[social.icon] ?? "bg-white text-slate-600 border-slate-300 hover:text-[#0070F0] hover:border-[#0070F0]"}`}
                    aria-label={`Follow on ${social.platform}`}
                  >
                    {Icon && <Icon className="w-[18px] h-[18px]" />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* ── Row 2: Contact Info (3 columns) ── */}
        <div className="py-10 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0070F0] flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-[15px] mb-1">Location</p>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {FOOTER_DATA.contact.location}
              </p>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0070F0] flex items-center justify-center shrink-0 mt-0.5">
              <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-[15px] mb-1">Contact Us</p>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {FOOTER_DATA.contact.phone}
              </p>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {FOOTER_DATA.contact.tel}
              </p>
            </div>
          </div>

          {/* Email Us */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#0070F0] flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-bold text-slate-900 text-[15px] mb-1">Email Us</p>
              <p className="text-[14px] text-slate-500 leading-relaxed">
                {FOOTER_DATA.contact.email}
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* ── Row 3: Link Columns + Contributor Card ── */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
          {FOOTER_DATA.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-bold text-[14px] text-slate-900 mb-5">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-slate-500 hover:text-[#0070F0] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Become a Contributor card */}
          <div className="col-span-2 md:col-span-1 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-[18px] font-extrabold text-slate-900 leading-snug mb-2">
              Become a{" "}
              <span className="text-[#0070F0]">Contributor</span>
            </h3>
            <p className="text-[13px] text-slate-500 mb-5 leading-relaxed">
              {FOOTER_DATA.contributor.description}
            </p>
            <Link
              href={FOOTER_DATA.contributor.cta.href}
              className="block w-full py-3 bg-[#0070F0] text-white font-semibold rounded-xl text-center text-sm hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
            >
              {FOOTER_DATA.contributor.cta.text}
            </Link>
          </div>
        </div>

      </div>

      {/* ── Dark copyright bar ── */}
      <div className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-20 sm:pb-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-slate-400">{FOOTER_DATA.copyright}</p>
          <button
            onClick={() => window?.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            Back to Top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
