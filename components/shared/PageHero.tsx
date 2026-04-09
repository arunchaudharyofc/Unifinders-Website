/**
 * PageHero — Shared hero banner used across all listing pages
 * (Events, Blog, QnA, Scholarships, Appointment, Search, etc.)
 *
 * Matches the dark blue gradient design from /courses exactly.
 * Usage:
 *   <PageHero
 *     breadcrumb={[{ label: "Events", href: "/events" }]}
 *     title="Upcoming" titleHighlight="Events"
 *     subtitle="Join our education fairs, workshops and masterclasses."
 *   />
 */
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  breadcrumb: BreadcrumbItem[];
  /** Plain text before the highlighted word */
  title: string;
  /** Blue-highlighted word(s) */
  titleHighlight: string;
  /** Optional text after the highlight */
  titleSuffix?: string;
  subtitle?: string;
  /** Optional right-side stat badge */
  stat?: { value: string; label: string };
}

export default function PageHero({
  breadcrumb,
  title,
  titleHighlight,
  titleSuffix,
  subtitle,
  stat,
  children,
}: PageHeroProps & { children?: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#0C1A3E] to-[#1D4ED8] pt-28 pb-14 px-6 relative overflow-hidden">
      {/* Decorative concentric circles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/30"
            style={{
              width: 200 + i * 150,
              height: 200 + i * 150,
              top: "50%",
              right: "-100px",
              transform: "translateY(-50%)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <p className="text-xs text-blue-300 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          {breadcrumb.map((item, i) => (
            <span key={i}>
              <span className="mx-1.5">›</span>
              {item.href ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-blue-100">{item.label}</span>
              )}
            </span>
          ))}
        </p>

        {/* Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {title}{" "}
              <span className="text-blue-400">{titleHighlight}</span>
              {titleSuffix && <span>{" "}{titleSuffix}</span>}
            </h1>
            {subtitle && (
              <p className="text-blue-200 max-w-xl text-base leading-relaxed">
                {subtitle}
              </p>
            )}
            
            {/* Custom Content (like Search bars) injected below subtitle */}
            {children && (
              <div className="mt-8">
                {children}
              </div>
            )}
          </div>

          {/* Optional stat badge */}
          {stat && (
            <div className="shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center hidden sm:block">
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-blue-200 text-sm mt-1">{stat.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
