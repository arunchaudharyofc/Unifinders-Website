/**
 * DASHBOARD — DOCUMENTS PAGE
 * Upload and manage study-abroad documents.
 */
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FolderOpen, Upload, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const REQUIRED_DOCS = [
  { key: "passport",       label: "Passport (bio page)",          required: true },
  { key: "transcript",     label: "Academic Transcript",          required: true },
  { key: "marksheet",      label: "Marksheet (all years)",        required: true },
  { key: "ielts",          label: "English Test Certificate",     required: true },
  { key: "sop",            label: "Statement of Purpose (SOP)",   required: true },
  { key: "lor1",           label: "Letter of Recommendation 1",  required: true },
  { key: "lor2",           label: "Letter of Recommendation 2",  required: false },
  { key: "cv",             label: "CV / Resume",                  required: false },
  { key: "bank",           label: "Bank Statement (6 months)",    required: true },
  { key: "sponsorship",    label: "Sponsorship Letter",           required: false },
];

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  let uploadedDocs: string[] = [];
  try {
    const student = await db.student.findUnique({ where: { userId: user.id } });
    if (student) {
      const docs = await db.document.findMany({
        where: { studentId: student.id, deletedAt: null },
        select: { type: true },
      });
      uploadedDocs = docs.map((d: any) => d.type?.toLowerCase() || "");
    }
  } catch { /* empty */ }

  const uploaded = REQUIRED_DOCS.filter(d => uploadedDocs.includes(d.key)).length;
  const total    = REQUIRED_DOCS.filter(d => d.required).length;

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Documents</h1>
          <p className="text-slate-500 text-sm mt-0.5">Upload and manage your study abroad documents</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-slate-700">Document Checklist</p>
          <span className="text-sm font-bold text-[#0070F0]">{uploaded}/{total} required docs</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#0070F0] rounded-full transition-all" style={{ width: `${(uploaded / total) * 100}%` }} />
        </div>
      </div>

      {/* Document List */}
      <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50 overflow-hidden">
        {REQUIRED_DOCS.map(doc => {
          const isUploaded = uploadedDocs.includes(doc.key);
          return (
            <div key={doc.key} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition">
              <div className="flex items-center gap-3">
                {isUploaded
                  ? <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  : doc.required
                    ? <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    : <Clock className="w-5 h-5 text-slate-300 flex-shrink-0" />
                }
                <div>
                  <p className="text-sm font-medium text-slate-800">{doc.label}</p>
                  <p className="text-xs text-slate-400">{doc.required ? "Required" : "Optional"}</p>
                </div>
              </div>
              {isUploaded ? (
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full">Uploaded</span>
              ) : (
                <Link
                  href="/appointment"
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0070F0] bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition"
                >
                  <Upload className="w-3 h-3" /> Upload
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Help Banner */}
      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
        <FolderOpen className="w-8 h-8 text-[#0070F0] flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-900 text-sm">Need help with your documents?</p>
          <p className="text-slate-600 text-xs mt-1">Our counselors can review your SOP, LOR, and financial documents to ensure they meet university requirements.</p>
          <Link href="/appointment" className="inline-block mt-3 text-xs font-bold text-[#0070F0] hover:underline">Book document review →</Link>
        </div>
      </div>
    </div>
  );
}
