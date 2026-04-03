/**
 * NAVBAR — Scroll-aware glassmorphism with mega-menu dropdowns
 * Fixed height 72px. Transparent at top → frosted glass on scroll.
 * Layout: [Logo | Browse by country] ... [Nav Links] ... [Book Appointment | Login]
 *
 * Features:
 * - Browse by Country dropdown with flags
 * - Our Courses dropdown with test prep icons
 * - Mobile hamburger with expandable sections
 * - Smooth glassmorphism on scroll
 *
 * @updated  2026-04-01  — Full dropdown menus, linked pages
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, User, ChevronDown, Menu, X, ChevronRight, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, COUNTRY_LINKS, COURSE_DROPDOWN, MEGA_MENU_DATA } from "@/lib/constants/landing";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [hoveredCountryKey, setHoveredCountryKey] = useState<string>("australia");
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCountryOpen, setMobileCountryOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);

  const countryRef = useRef<HTMLDivElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);

  // Detect scroll position for glassmorphism transition
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
        setCountryOpen(false);
      }
      if (coursesRef.current && !coursesRef.current.contains(e.target as Node)) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdowns on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCountryOpen(false);
        setCoursesOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav
      id="main-nav"
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
          : "bg-white border-b border-slate-100"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-4">

          {/* ── Left: Logo + Browse by country ── */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="shrink-0" aria-label="Unifinders Home">
              <Image
                src="/images/logo.png"
                alt="Unifinders"
                width={160}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Browse by Country — with dropdown */}
            <div ref={countryRef} className="relative hidden lg:block">
              <button
                onClick={() => { setCountryOpen(!countryOpen); setCoursesOpen(false); }}
                className={cn(
                  "flex items-center gap-1.5 h-10 px-4 text-[13px] font-medium text-slate-800 bg-white border rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap shrink-0",
                  countryOpen ? "border-[#0070F0] bg-blue-50" : "border-[#0070F0]"
                )}
                aria-label="Browse by country"
                aria-expanded={countryOpen}
                aria-haspopup="true"
              >
                <Globe className="w-4 h-4 text-[#0070F0] shrink-0" />
                Browse by country
                <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200", countryOpen && "rotate-180")} />
              </button>

              {/* Country Mega-Dropdown */}
              <div
                className={cn(
                  "absolute top-[calc(100%+8px)] left-0 w-[1140px] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-200 origin-top-left flex h-[620px] bg-transparent",
                  countryOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                )}
              >
                {/* Wrapper to hold the background color so we can have rounded corners for the whole thing */}
                <div className="flex w-full h-full bg-[#f4f7fa] rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                  
                  {/* Left Sidebar (Countries) */}
                  <div className="w-[200px] p-3 overflow-y-auto space-y-1 z-10">
                    {Object.entries(MEGA_MENU_DATA).map(([key, data]) => {
                      const isActive = hoveredCountryKey === key;
                      return (
                        <Link
                          href={data.href}
                          key={key}
                          onMouseEnter={() => setHoveredCountryKey(key)}
                          onClick={() => setCountryOpen(false)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200",
                            isActive ? "bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]" : "hover:bg-black/5"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl shadow-sm rounded-full bg-white leading-none flex items-center justify-center w-6 h-6">{data.flag}</span>
                            <span className={cn("text-[13px] font-medium tracking-tight", isActive ? "text-[#0070F0]" : "text-slate-600")}>{data.name}</span>
                          </div>
                          {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#0070F0]" />}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Middle Content */}
                  <div className="flex-1 p-8 bg-white overflow-y-auto w-[620px]">
                    <div className="grid grid-cols-2 gap-x-8">
                      {/* Column 1: Why & Live */}
                      <div className="space-y-8">
                        {/* Why Section */}
                        {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.why && (
                          <div>
                            <h3 className="text-[14px] font-bold text-[#1e293b] mb-4 flex items-center gap-1.5 cursor-pointer hover:text-[#0070F0] transition-colors w-fit">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.why.title} <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                            </h3>
                            <ul className="space-y-2.5">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.why.links.map((link, i) => (
                                <li key={i}>
                                  <Link href={link.href} onClick={() => setCountryOpen(false)} className="text-[12px] font-medium text-[#64748b] hover:text-[#0070F0] transition-colors">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* Live Section */}
                        {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.live && (
                          <div>
                            <h3 className="text-[14px] font-bold text-[#1e293b] mb-4 flex items-center gap-1.5 cursor-pointer hover:text-[#0070F0] transition-colors w-fit">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.live.title} <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                            </h3>
                            <ul className="space-y-2.5">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.live.links.map((link, i) => (
                                <li key={i}>
                                  <Link href={link.href} onClick={() => setCountryOpen(false)} className="text-[12px] font-medium text-[#64748b] hover:text-[#0070F0] transition-colors">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Column 2: Work & Study */}
                      <div className="space-y-8">
                        {/* Work Section */}
                        {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.work && (
                          <div>
                            <h3 className="text-[14px] font-bold text-[#1e293b] mb-4 flex items-center gap-1.5 cursor-pointer hover:text-[#0070F0] transition-colors w-fit">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.work.title} <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                            </h3>
                            <ul className="space-y-2.5">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.work.links.map((link, i) => (
                                <li key={i}>
                                  <Link href={link.href} onClick={() => setCountryOpen(false)} className="text-[12px] font-medium text-[#64748b] hover:text-[#0070F0] transition-colors">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {/* Study Section */}
                        {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.study && (
                          <div>
                            <h3 className="text-[14px] font-bold text-[#1e293b] mb-4 flex items-center gap-1.5 cursor-pointer hover:text-[#0070F0] transition-colors w-fit">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.study.title} <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                            </h3>
                            <ul className="space-y-2.5">
                              {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sections.study.links.map((link, i) => (
                                <li key={i}>
                                  <Link href={link.href} onClick={() => setCountryOpen(false)} className="text-[12px] font-medium text-[#64748b] hover:text-[#0070F0] transition-colors">
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Banner */}
                  <div className="w-[320px] bg-[#292929] relative overflow-hidden flex flex-col pt-8 px-6 shrink-0">
                    {/* Background Girl Image */}
                    <Image 
                      src={MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sidebar.image} 
                      alt="" 
                      width={320} 
                      height={620} 
                      className="absolute bottom-0 right-0 h-[85%] w-auto object-contain z-0 object-right-bottom opacity-90 scale-110 origin-bottom-right" 
                    />
                    
                    <div className="relative z-10 w-full">
                      <h3 className="text-[22px] font-bold tracking-tight leading-[1.1] mb-6">
                         <span className="text-white block">{MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sidebar.title.split(' with ')[0]} with</span>
                         <span className="text-[#3b82f6] text-[28px]">Best <br/>Placements</span>
                      </h3>
                      
                      <div className="space-y-3 relative z-20 max-w-[170px]">
                        {MEGA_MENU_DATA[hoveredCountryKey as keyof typeof MEGA_MENU_DATA].sidebar.stats.map((stat, i) => (
                          <div key={i} className="bg-[#0047AB] rounded-lg p-3 shadow-md relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#0047AB] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 w-full mb-1">
                              <span className="text-2xl font-bold text-white leading-none tracking-tight">{stat.value.split(' ')[0]}</span>
                              {stat.value.split(' ')[1] && <span className="text-[14px] font-bold text-white leading-none ml-1">{stat.value.split(' ')[1]}</span>}
                            </div>
                            <p className="text-[9px] font-bold text-white uppercase mt-1 relative z-10 tracking-widest">{stat.label}</p>
                            {stat.subLabel && <p className="text-[9px] text-[#e2e8f0] font-medium leading-tight mt-0.5 relative z-10 max-w-[130px]">{stat.subLabel}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ── Center: Nav Links ── */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 flex-1 justify-center">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative" ref={link.hasDropdown ? coursesRef : undefined}>
                {link.hasDropdown ? (
                  <button
                    onClick={() => { setCoursesOpen(!coursesOpen); setCountryOpen(false); }}
                    className="flex items-center gap-0.5 text-[14px] font-medium text-slate-700 hover:text-[#0070F0] transition-colors whitespace-nowrap relative group"
                    aria-expanded={coursesOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown className={cn("w-4 h-4 text-slate-400 ml-0.5 transition-transform duration-200", coursesOpen && "rotate-180 text-[#0070F0]")} />
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0070F0] rounded-full group-hover:w-full transition-all duration-300" />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-0.5 text-[14px] font-medium text-slate-700 hover:text-[#0070F0] transition-colors whitespace-nowrap relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0070F0] rounded-full group-hover:w-full transition-all duration-300" />
                  </Link>
                )}

                {/* Courses Mega-dropdown */}
                {link.hasDropdown && (
                  <div
                    className={cn(
                      "absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-200 origin-top",
                      coursesOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                    )}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Test Preparation Courses</p>
                        <Link
                          href="/courses"
                          onClick={() => setCoursesOpen(false)}
                          className="text-xs font-semibold text-[#0070F0] hover:underline"
                        >
                          View All →
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        {COURSE_DROPDOWN.map((course) => (
                          <Link
                            key={course.href}
                            href={course.href}
                            onClick={() => setCoursesOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-blue-50 transition-colors group/item"
                          >
                            <Image
                              src={course.icon}
                              alt={course.label}
                              width={32}
                              height={32}
                              className="w-8 h-8 object-contain rounded-lg"
                            />
                            <span className="text-sm font-medium text-slate-700 group-hover/item:text-[#0070F0] transition-colors">
                              {course.label}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Right: CTAs ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              href="/appointment"
              className="h-10 px-4 flex items-center text-[13px] font-semibold text-[#0070F0] border border-[#0070F0]/40 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Book an Appointment
            </Link>
            <Link
              href="/auth/login"
              className="h-10 px-5 flex items-center gap-2 text-[13px] font-semibold text-white bg-[#0070F0] rounded-lg hover:bg-blue-600 transition-colors shadow-sm whitespace-nowrap"
            >
              <User className="w-4 h-4 shrink-0" />
              Login
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={cn(
          "lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[700px] py-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          {/* Browse by Country — mobile accordion */}
          <div>
            <button
              onClick={() => setMobileCountryOpen(!mobileCountryOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0070F0]" />
                Browse by country
              </span>
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", mobileCountryOpen && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all duration-200", mobileCountryOpen ? "max-h-[400px] mt-1" : "max-h-0")}>
              <div className="pl-4 space-y-0.5">
                {COUNTRY_LINKS.map((country) => (
                  <Link
                    key={country.href}
                    href={country.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-[#0070F0] rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>{country.flag}</span>
                    {country.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Our Courses — mobile accordion */}
          <div>
            <button
              onClick={() => setMobileCoursesOpen(!mobileCoursesOpen)}
              className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Our Courses
              <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform duration-200", mobileCoursesOpen && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all duration-200", mobileCoursesOpen ? "max-h-[400px] mt-1" : "max-h-0")}>
              <div className="pl-4 space-y-0.5">
                {COURSE_DROPDOWN.map((course) => (
                  <Link
                    key={course.href}
                    href={course.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-[#0070F0] rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <Image src={course.icon} alt="" width={20} height={20} className="w-5 h-5 object-contain" />
                    {course.label}
                  </Link>
                ))}
                <Link
                  href="/courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm font-semibold text-[#0070F0] hover:underline"
                >
                  View All Courses →
                </Link>
              </div>
            </div>
          </div>

          {/* Other nav links */}
          {NAV_LINKS.filter(l => !l.hasDropdown).map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-[#0070F0] rounded-lg hover:bg-slate-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
            <Link
              href="/appointment"
              className="h-10 flex items-center justify-center text-sm font-semibold text-[#0070F0] border border-[#0070F0] rounded-lg hover:bg-blue-50 transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              href="/auth/login"
              className="h-10 flex items-center justify-center gap-2 text-sm font-semibold text-white bg-[#0070F0] rounded-lg hover:bg-blue-600 transition-colors"
            >
              <User className="w-4 h-4" /> Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
