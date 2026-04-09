"use client";

/**
 * DASHBOARD — DOCUMENTS PAGE (Client Component)
 * ──────────────────────────────────────────────
 * Shows document checklist + file upload for each document type.
 * Upload goes directly to Supabase Storage via signed URL from /api/documents.
 */

import { useState, useEffect, useRef } from "react";
import {
  FolderOpen, Upload, CheckCircle2, Clock, AlertCircle,
  Loader2, X, Eye, Trash2, FileText, ChevronDown, ChevronUp
} from "lucide-react";
import Link from "next/link";

const REQUIRED_DOCS = [
  { key: "passport",    label: "Passport (bio page)",         required: true,  accept: ".pdf,.jpg,.jpeg,.png" },
  { key: "transcript",  label: "Academic Transcript",         required: true,  accept: ".pdf" },
  { key: "marksheet",   label: "Marksheet (all years)",       required: true,  accept: ".pdf" },
  { key: "ielts",       label: "English Test Certificate",    required: true,  accept: ".pdf,.jpg,.jpeg,.png" },
  { key: "sop",         label: "Statement of Purpose (SOP)",  required: true,  accept: ".pdf,.doc,.docx" },
  { key: "lor1",        label: "Letter of Recommendation 1",  required: true,  accept: ".pdf" },
  { key: "lor2",        label: "Letter of Recommendation 2",  required: false, accept: ".pdf" },
  { key: "cv",          label: "CV / Resume",                 required: false, accept: ".pdf,.doc,.docx" },
  { key: "bank",        label: "Bank Statement (6 months)",   required: true,  accept: ".pdf" },
  { key: "sponsorship", label: "Sponsorship Letter",          required: false, accept: ".pdf" },
];

type DocRecord = {
  id: string;
  type: string;
  originalName: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  downloadUrl?: string;
  createdAt: string;
};

type UploadState = "idle" | "uploading" | "done" | "error";

export default function DocumentsPage() {
  const [docs, setDocs] = useState<DocRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadState, setUploadState] = useState<Record<string, UploadState>>({});
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadError, setUploadError] = useState<Record<string, string>>({});
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/documents");
      if (res.ok) {
        const d = await res.json();
        setDocs(d.data?.documents || d.documents || []);
      }
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchDocs(); }, []);

  const getDocByType = (key: string) => docs.find(d => d.type.toLowerCase() === key);

  const handleFileSelect = async (key: string, file: File) => {
    if (!file) return;

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError(prev => ({ ...prev, [key]: "File too large. Max 10MB." }));
      return;
    }

    setUploadState(prev => ({ ...prev, [key]: "uploading" }));
    setUploadError(prev => ({ ...prev, [key]: "" }));
    setUploadProgress(prev => ({ ...prev, [key]: 0 }));

    try {
      // Step 1: Get signed upload URL
      const initRes = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: key,
          originalName: file.name,
          mimeType: file.type,
          fileSize: file.size,
        }),
      });

      if (!initRes.ok) {
        const d = await initRes.json();
        throw new Error(d.error || "Failed to get upload URL");
      }

      const { uploadUrl, documentId } = await initRes.json();

      // Step 2: Upload directly to Supabase Storage
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Upload to storage failed");

      setUploadProgress(prev => ({ ...prev, [key]: 100 }));
      setUploadState(prev => ({ ...prev, [key]: "done" }));

      // Refresh doc list
      await fetchDocs();
    } catch (e: any) {
      setUploadState(prev => ({ ...prev, [key]: "error" }));
      setUploadError(prev => ({ ...prev, [key]: e.message || "Upload failed" }));
    }
  };

  const handleDelete = async (docId: string, key: string) => {
    if (!confirm("Remove this document?")) return;
    try {
      await fetch(`/api/documents/${docId}`, { method: "DELETE" });
      await fetchDocs();
      setUploadState(prev => ({ ...prev, [key]: "idle" }));
    } catch { }
  };

  const uploaded = REQUIRED_DOCS.filter(d => getDocByType(d.key)).length;
  const required = REQUIRED_DOCS.filter(d => d.required).length;
  const requiredUploaded = REQUIRED_DOCS.filter(d => d.required && getDocByType(d.key)).length;
  const progressPct = Math.round((requiredUploaded / required) * 100);

  const STATUS_BADGE: Record<string, { label: string; cls: string }> = {
    PENDING:  { label: "Under Review", cls: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
    VERIFIED: { label: "Verified ✓",   cls: "bg-green-50 text-green-700 border border-green-200" },
    REJECTED: { label: "Rejected",     cls: "bg-red-50 text-red-600 border border-red-200" },
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Documents</h1>
        <p className="text-slate-500 text-sm mt-0.5">Upload your study abroad documents</p>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-bold text-slate-800">Document Checklist</p>
            <p className="text-xs text-slate-400 mt-0.5">{requiredUploaded}/{required} required documents uploaded</p>
          </div>
          <span className={`text-sm font-extrabold ${progressPct === 100 ? "text-green-600" : "text-[#0070F0]"}`}>
            {progressPct}%
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressPct === 100 ? "bg-green-500" : "bg-[#0070F0]"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {progressPct === 100 && (
          <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> All required documents uploaded! Our team will review them.
          </p>
        )}
      </div>

      {/* Document List */}
      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-6">
        {loading ? (
          <div className="py-16 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {REQUIRED_DOCS.map(doc => {
              const uploaded = getDocByType(doc.key);
              const state = uploadState[doc.key] || "idle";
              const progress = uploadProgress[doc.key] || 0;
              const errMsg = uploadError[doc.key];
              const isExpanded = expandedKey === doc.key;
              const badge = uploaded ? STATUS_BADGE[uploaded.status] : null;

              return (
                <div key={doc.key}>
                  <div
                    className="flex items-center justify-between px-5 py-4 hover:bg-slate-50/70 transition cursor-pointer"
                    onClick={() => setExpandedKey(isExpanded ? null : doc.key)}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Status icon */}
                      {uploaded ? (
                        uploaded.status === "VERIFIED"
                          ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          : uploaded.status === "REJECTED"
                          ? <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                          : <Clock className="w-5 h-5 text-yellow-400 shrink-0" />
                      ) : state === "uploading"
                        ? <Loader2 className="w-5 h-5 text-[#0070F0] shrink-0 animate-spin" />
                        : doc.required
                        ? <AlertCircle className="w-5 h-5 text-red-300 shrink-0" />
                        : <FileText className="w-5 h-5 text-slate-300 shrink-0" />
                      }

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{doc.label}</p>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <p className="text-xs text-slate-400">{doc.required ? "Required" : "Optional"}</p>
                          {uploaded && badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.cls}`}>{badge.label}</span>
                          )}
                          {uploaded && (
                            <span className="text-[10px] text-slate-400">{uploaded.originalName}</span>
                          )}
                        </div>
                        {/* Upload progress bar */}
                        {state === "uploading" && (
                          <div className="w-40 h-1 bg-slate-100 rounded-full mt-1.5">
                            <div className="h-full bg-[#0070F0] rounded-full transition-all" style={{ width: `${progress}%` }} />
                          </div>
                        )}
                        {errMsg && <p className="text-xs text-red-500 mt-0.5">{errMsg}</p>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-3">
                      {uploaded ? (
                        <span className="text-xs text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">Uploaded</span>
                      ) : (
                        <span className="text-xs text-[#0070F0] font-semibold bg-blue-50 px-2.5 py-1 rounded-full">Upload</span>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </div>

                  {/* Expanded: Upload/Actions */}
                  {isExpanded && (
                    <div className="bg-slate-50 border-t border-slate-100 px-5 py-4">
                      {uploaded ? (
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-sm text-slate-600">
                            <span className="font-semibold">{uploaded.originalName}</span>
                            <span className="text-slate-400 ml-2">· Uploaded {new Date(uploaded.createdAt).toLocaleDateString()}</span>
                          </p>
                          <div className="flex gap-2 ml-auto">
                            {uploaded.downloadUrl && (
                              <a href={uploaded.downloadUrl} target="_blank" rel="noreferrer"
                                className="flex items-center gap-1.5 text-xs font-semibold text-[#0070F0] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">
                                <Eye className="w-3.5 h-3.5" /> View
                              </a>
                            )}
                            <button onClick={e => { e.stopPropagation(); handleDelete(uploaded.id, doc.key); }}
                              className="flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                            <button onClick={e => { e.stopPropagation(); fileRefs.current[doc.key]?.click(); }}
                              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg transition">
                              <Upload className="w-3.5 h-3.5" /> Replace
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div
                            className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-[#0070F0] hover:bg-blue-50/30 transition cursor-pointer group"
                            onClick={e => { e.stopPropagation(); fileRefs.current[doc.key]?.click(); }}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => {
                              e.preventDefault();
                              const file = e.dataTransfer.files?.[0];
                              if (file) handleFileSelect(doc.key, file);
                            }}
                          >
                            <Upload className="w-8 h-8 text-slate-300 group-hover:text-[#0070F0] mx-auto mb-2 transition" />
                            <p className="text-sm font-semibold text-slate-600 group-hover:text-[#0070F0]">
                              Click to upload or drag & drop
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              Accepts: {doc.accept.replace(/\./g, "").toUpperCase().replace(/,/g, ", ")} · Max 10MB
                            </p>
                          </div>
                          {state === "error" && errMsg && (
                            <p className="text-xs text-red-500 mt-2 text-center">{errMsg}</p>
                          )}
                        </div>
                      )}
                      {/* Hidden file input */}
                      <input
                        ref={el => { fileRefs.current[doc.key] = el; }}
                        type="file"
                        accept={doc.accept}
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(doc.key, file);
                          e.target.value = "";
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Help Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
        <FolderOpen className="w-8 h-8 text-[#0070F0] shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-slate-900 text-sm">Need help with your documents?</p>
          <p className="text-slate-600 text-xs mt-1">
            Our counselors review your SOP, LOR, and financial documents to ensure they meet university requirements.
          </p>
          <Link href="/appointment" className="inline-block mt-3 text-xs font-bold text-[#0070F0] hover:underline">
            Book document review →
          </Link>
        </div>
      </div>
    </div>
  );
}
