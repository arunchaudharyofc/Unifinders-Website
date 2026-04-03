/**
 * Shared page header banner with title and breadcrumb
 */
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export default function PageHeader({ title, highlight, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50/40 to-white pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-10 right-10 grid grid-cols-5 gap-3 opacity-10">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="text-[#0070F0] text-sm font-bold">+</span>
        ))}
      </div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-100/20 rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1 text-sm text-slate-500">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[#0070F0] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {title}{" "}
          {highlight && <span className="text-[#0070F0]">{highlight}</span>}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-slate-500 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
