/**
 * DASHBOARD — APPLICATIONS PAGE
 * Lists student's university applications with status tracking.
 */
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, Plus, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  PREPARING:         { label: "Preparing",       color: "bg-slate-100 text-slate-600",     icon: Clock },
  SUBMITTED:         { label: "Submitted",        color: "bg-blue-100 text-blue-700",       icon: Clock },
  UNDER_REVIEW:      { label: "Under Review",     color: "bg-yellow-100 text-yellow-700",   icon: Clock },
  CONDITIONAL_OFFER: { label: "Conditional Offer",color: "bg-orange-100 text-orange-700",  icon: CheckCircle2 },
  UNCONDITIONAL_OFFER: { label: "Offer Received!",color: "bg-green-100 text-green-700",    icon: CheckCircle2 },
  REJECTED:          { label: "Rejected",         color: "bg-red-100 text-red-600",         icon: AlertCircle },
  ENROLLED:          { label: "Enrolled ✓",       color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PREPARING;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
      <cfg.icon className="w-3 h-3" /> {cfg.label}
    </span>
  );
}

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  let applications: any[] = [];
  try {
    const student = await db.student.findUnique({ where: { userId: user.id } });
    if (student) {
      applications = await db.application.findMany({
        where: { studentId: student.id },
        include: { university: { select: { name: true, country: true, logoUrl: true } } },
        orderBy: { createdAt: "desc" },
      });
    }
  } catch { /* DB empty — show empty state */ }

  const steps = ["PREPARING", "SUBMITTED", "UNDER_REVIEW", "CONDITIONAL_OFFER", "UNCONDITIONAL_OFFER", "ENROLLED"];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Applications</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track all your university applications in one place</p>
        </div>
        <Link href="/appointment" className="flex items-center gap-2 px-4 py-2 bg-[#0070F0] text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" /> Add Application
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 py-20 text-center">
          <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-slate-900 mb-2">No applications yet</h2>
          <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
            Start exploring universities to submit your first application. Our counselors will guide you.
          </p>
          <Link href="/study" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0070F0] text-white font-semibold rounded-xl hover:bg-blue-700 transition text-sm">
            Explore Destinations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app: any) => {
            const currentIdx = steps.indexOf(app.status);
            return (
              <div key={app.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900">{app.university?.name}</h3>
                    <p className="text-sm text-slate-500">{app.program} · {app.university?.country} · {app.intake}</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
                {/* Progress Steps */}
                <div className="flex items-center gap-1">
                  {steps.slice(0, 5).map((s, i) => (
                    <div key={s} className="flex items-center flex-1">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${i <= currentIdx ? "bg-[#0070F0]" : "bg-slate-200"}`} />
                      {i < 4 && <div className={`flex-1 h-0.5 ${i < currentIdx ? "bg-[#0070F0]" : "bg-slate-200"}`} />}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Preparing</span><span>Submitted</span><span>Review</span><span>Offer</span><span>Enrolled</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
