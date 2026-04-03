/**
 * ============================================================================
 * VISA CALCULATOR SECTION
 * ============================================================================
 * "Step wise guide to our Visa Calculator" — interactive step selector
 * with step detail cards on the right.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * ============================================================================
 */
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { VISA_STEPS } from "@/lib/constants/landing";
import Link from "next/link";
import NextImage from "next/image";

export default function VisaCalculatorSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = VISA_STEPS[activeStep];

  return (
    <section id="visa-calculator" aria-label="Visa Calculator" className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Step wise guide to our
            <br />
            <span className="text-[#0070F0]">Visa Calculator</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto">
            Our app connects to all the most popular universities.
            <br />
            Your academic applications are validated by our team and send to universities.
          </p>
        </div>

        {/* Steps + Detail Card */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto items-center">
          {/* Left: Step List */}
          <div className="space-y-2">
            {VISA_STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveStep(i)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-left transition-all duration-200 ${
                  i === activeStep
                    ? "bg-white shadow-lg border border-slate-100 text-slate-900 font-bold"
                    : "text-slate-400 hover:text-slate-600 font-medium"
                }`}
              >
                {s.label}
                {i === activeStep && (
                  <ArrowRight className="w-5 h-5 text-slate-400" />
                )}
              </button>
            ))}
          </div>

          {/* Right: Detail Card */}
          <div className="relative">
            {/* Decorative circle */}
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-blue-100/30 rounded-full -z-10" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 md:p-10 relative z-10">
              {/* Visa Gauge Image */}
              <div className="mb-5">
                <NextImage
                  src="/images/visa-gauge.png"
                  alt="Visa score representation"
                  width={250}
                  height={200}
                  className="w-full h-40 object-contain max-w-[250px]"
                />
              </div>

              <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-500 text-base leading-relaxed">
                {step.description}
              </p>
            </div>

            {/* Decorative cross pattern — outside card, bottom-right */}
            <div className="absolute -bottom-12 -right-12 grid grid-cols-5 gap-3 opacity-15 -z-10">
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} className="text-[#0070F0] text-sm font-bold select-none">+</span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/visa-calculator"
            className="inline-flex items-center gap-2 h-14 px-10 bg-[#0070F0] text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 group text-base"
          >
            Try Visa Calculator today!
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
