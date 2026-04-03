/**
 * ============================================================================
 * SERVICES SECTION COMPONENT
 * ============================================================================
 *
 * Three differentiated service cards that visually overlap the bottom of hero.
 * Each card highlights a core Unifinders service with unique icon + color.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * @updated     2026-04-01  — Real service data, animations, hover lift
 * ============================================================================
 */
import { GraduationCap, Award, Globe2 } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  {
    id: "counselling",
    icon: GraduationCap,
    iconBg: "bg-blue-50",
    iconColor: "text-[#0070F0]",
    borderAccent: "border-t-[3px] border-t-[#0070F0]",
    title: "Expert Counselling",
    description:
      "One-on-one sessions with certified education advisors who guide you through country selection, course matching, and application strategy across 140+ universities.",
    cta: { text: "Book Free Session", href: "/appointment" },
    delay: "delay-100",
  },
  {
    id: "scholarships",
    icon: Award,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    borderAccent: "border-t-[3px] border-t-amber-400",
    title: "Scholarship Finder",
    description:
      "Unlock ₹7 Cr+ in scholarship opportunities. Our AI matches your academic profile to scholarships at partner institutions and helps you craft a winning application.",
    cta: { text: "Explore Scholarships", href: "/scholarships" },
    delay: "delay-200",
  },
  {
    id: "visa",
    icon: Globe2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderAccent: "border-t-[3px] border-t-emerald-500",
    title: "Visa & Admission Tracking",
    description:
      "Real-time dashboard to track your university application, document submissions, and student visa processing — from offer letter to departure, end-to-end.",
    cta: { text: "Track Your Application", href: "/dashboard" },
    delay: "delay-300",
  },
] as const;

export default function ServicesSection() {
  return (
    <section id="services" aria-label="Our Services" className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cards Grid — negative margin pulls them up over the hero wave */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 -mt-8 relative z-30">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.id}
                className={`bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl p-8 transition-all duration-300 hover:-translate-y-1.5 group ${service.borderAccent} animate-fade-up ${service.delay}`}
              >
                {/* Icon */}
                <div className={`w-13 h-13 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  style={{ width: "52px", height: "52px" }}
                >
                  <Icon className={`${service.iconColor} w-6 h-6`} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA */}
                <Link
                  href={service.cta.href}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0070F0] hover:underline"
                >
                  {service.cta.text}
                  <span className="group-hover:translate-x-1 inline-block transition-transform">→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

