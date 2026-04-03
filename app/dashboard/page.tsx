/**
 * DASHBOARD OVERVIEW PAGE
 * -----------------------
 * Shows: Profile completion %, active applications, upcoming appointments,
 * recent documents, and a quick action bar.
 * All data fetched server-side (SSR) via Supabase + Prisma.
 */
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  FileText, FolderOpen, Calendar, ArrowRight,
  CheckCircle2, Clock, AlertCircle, Sparkles
} from "lucide-react";

// ── Quick Stat Card ────────────────────────────────────────────────────────
function StatCard({
  icon: Icon, label, value, color, href,
}: {
  icon: React.ElementType; label: string; value: string | number;
  color: string; href: string;
}) {
  return (
    <Link href={href} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow group">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0070F0] group-hover:translate-x-1 transition-all" />
    </Link>
  );
}

// ── Profile Completion Bar ─────────────────────────────────────────────────
function ProfileCompletion({ pct }: { pct: number }) {
  const color = pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-yellow-500" : "bg-red-400";
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-slate-900 text-sm">Profile Completion</p>
          <p className="text-xs text-slate-400">Complete your profile to get matched with universities</p>
        </div>
        <span className={`text-lg font-bold ${pct >= 80 ? "text-green-600" : pct >= 50 ? "text-yellow-600" : "text-red-500"}`}>{pct}%</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      {pct < 80 && (
        <Link href="/onboarding" className="mt-3 inline-flex items-center gap-1 text-xs text-[#0070F0] font-semibold hover:underline">
          <Sparkles className="w-3 h-3" /> Complete now to unlock personalized matches
        </Link>
      )}
    </div>
  );
}

// ── App Status Badge ───────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; cls: string; Icon: React.ElementType }> = {
    PREPARING:   { label: "Preparing",   cls: "bg-slate-100 text-slate-600",   Icon: Clock },
    SUBMITTED:   { label: "Submitted",   cls: "bg-blue-100 text-blue-700",     Icon: Clock },
    CONDITIONAL_OFFER: { label: "Offer!", cls: "bg-green-100 text-green-700",  Icon: CheckCircle2 },
    REJECTED:    { label: "Rejected",    cls: "bg-red-100 text-red-700",       Icon: AlertCircle },
  };
  const s = map[status] || { label: status, cls: "bg-slate-100 text-slate-600", Icon: Clock };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${s.cls}`}>
      <s.Icon className="w-3 h-3" /> {s.label}
    </span>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // Fetch student data with related counts
  let student = null;
  let applications: any[] = [];
  let documents: any[] = [];
  let profilePct = 10; // base = email is confirmed

  try {
    student = await db.student.findUnique({
      where: { userId: user.id },
    });

    if (student) {
      // Profile completion scoring
      const fields = [
        student.firstName, student.lastName, student.phone,
        student.educationLevel, student.englishTest,
        student.preferredCountries?.length > 0,
        student.preferredLevel, student.targetIntake,
      ];
      const filled = fields.filter(Boolean).length;
      profilePct = Math.round((filled / fields.length) * 90) + 10;

      applications = await db.application.findMany({
        where: { studentId: student.id },
        include: { university: { select: { name: true, country: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      documents = await db.document.findMany({
        where: { studentId: student.id, deletedAt: null },
        orderBy: { createdAt: "desc" },
        take: 4,
      });
    }
  } catch {
    // DB not yet seeded — show empty state gracefully
  }

  const fullName = user.user_metadata?.full_name || "Student";

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-0.5">Your study abroad journey at a glance</p>
      </div>

      {/* Profile completion */}
      <ProfileCompletion pct={profilePct} />

      {/* Stats row */}
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={FileText}  label="Applications" value={applications.length || 0}
          color="bg-blue-50 text-blue-600"   href="/dashboard/applications" />
        <StatCard icon={FolderOpen} label="Documents"    value={documents.length || 0}
          color="bg-violet-50 text-violet-600" href="/dashboard/documents" />
        <StatCard icon={Calendar}  label="Appointments" value={0}
          color="bg-green-50 text-green-600" href="/dashboard/appointments" />
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Recent Applications</h2>
          <Link href="/dashboard/applications" className="text-xs text-[#0070F0] font-semibold hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {applications.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-500 text-sm font-medium">No applications yet</p>
            <p className="text-slate-400 text-xs mt-1">Start exploring universities to apply</p>
            <Link href="/courses" className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#0070F0] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
              Explore Universities
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {applications.map((app: any) => (
              <div key={app.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{app.university?.name}</p>
                  <p className="text-xs text-slate-400">{app.university?.country} · {app.intake}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[#0070F0] to-blue-700 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="font-bold text-lg">Ready to find your perfect university?</p>
          <p className="text-blue-100 text-sm">Book a free 1-on-1 session with a Unifinders counselor</p>
        </div>
        <Link
          href="/appointment"
          className="px-5 py-2.5 bg-white text-[#0070F0] font-bold rounded-xl text-sm hover:bg-blue-50 transition flex-shrink-0"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
