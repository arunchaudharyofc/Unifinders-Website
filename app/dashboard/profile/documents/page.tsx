"use client";

import { useState } from "react";
import { HelpCircle, ChevronUp, ChevronDown, Trash2, Upload } from "lucide-react";

// ─── Document Section ───
function DocumentSection({ 
  title, 
  status, 
  defaultOpen, 
  children 
}: { 
  title: string; 
  status: "uploaded" | "required"; 
  defaultOpen?: boolean; 
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? false);
  
  return (
    <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
      <button 
        onClick={() => setOpen(!open)} 
        className="w-full p-5 sm:p-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-[15px] font-bold text-[#101828]">{title}</h3>
          {status === "uploaded" && (
            <span className="flex items-center gap-1 text-[12px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
              Uploaded
            </span>
          )}
          {status === "required" && (
            <span className="text-[12px] font-medium text-red-500 bg-red-50 px-2.5 py-1 rounded-full">
              Required!
            </span>
          )}
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-[#667085]" /> : <ChevronDown className="w-5 h-5 text-[#667085]" />}
      </button>
      
      {open && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-[#EAECF0] pt-5">
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Document Type Filter Pills ───
function DocFilter({ options, selected, onChange }: { options: string[]; selected: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
            selected === opt 
              ? 'bg-[#0070F0] text-white' 
              : 'bg-white border border-[#D0D5DD] text-[#344054] hover:border-[#98A2B3]'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function DocumentsPage() {
  const [docType, setDocType] = useState("Application");
  const DOC_TYPES = ["Application", "Education", "Tests", "Financial", "Travel", "Work Experience"];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* ─── Header ─── */}
      <div>
        <h1 className="text-[18px] font-bold text-[#101828] flex items-center gap-2 mb-1">
          Documents <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h1>
        <p className="text-[13px] text-[#667085] leading-relaxed max-w-3xl">
          Here, you can keep track of all the documents necessary for your applications. Check this page regularly to make sure you have uploaded all the required items! You can begin uploading right away - we support all common file formats.
        </p>
      </div>

      {/* ─── Document Type Filter ─── */}
      <DocFilter options={DOC_TYPES} selected={docType} onChange={setDocType} />

      {/* ─── CV / Resume — Uploaded ─── */}
      <DocumentSection title="CV / Resume" status="uploaded" defaultOpen={true}>
        <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-red-600">PDF</span>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[#101828]">Academic Transcipt.pdf</p>
              <p className="text-[12px] text-[#667085]">200 kb • Uploaded</p>
            </div>
          </div>
          <button className="w-8 h-8 flex items-center justify-center text-[#667085] hover:text-red-500 hover:bg-red-50 rounded-lg transition">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </DocumentSection>

      {/* ─── Personal Statement — Required, with upload zone ─── */}
      <DocumentSection title="Personal statement / Statement of purpose" status="required" defaultOpen={true}>
        <p className="text-[13px] text-[#667085] mb-5 leading-relaxed">
          The essay you write to show a university admission who you are and why you deserve to be considered. Make sure you write clearly about your aspirations and motivation for taking the course. PDF or word file only.
        </p>
        
        {/* Drag and Drop Zone */}
        <div className="border-2 border-dashed border-[#B2DDFF] rounded-xl p-8 flex flex-col items-center justify-center bg-[#F5FAFF] hover:bg-blue-50/60 transition cursor-pointer">
          <Upload className="w-8 h-8 text-[#0070F0] mb-3" />
          <p className="text-[14px] text-[#344054]">
            Drag & Drop your file. <span className="text-[#0070F0] font-semibold underline">Click to add.</span>
          </p>
          <p className="text-[12px] text-[#667085] mt-2 text-center">
            PDF, JPG, JPEG, PNG less than 5MB.<br />
            Ensure your document are in good condition and readable.
          </p>
        </div>
      </DocumentSection>

      {/* ─── Letter of Recommendation — Required, collapsed ─── */}
      <DocumentSection title="Letter of recommendation" status="required">
        <div className="border-2 border-dashed border-[#B2DDFF] rounded-xl p-8 flex flex-col items-center justify-center bg-[#F5FAFF] hover:bg-blue-50/60 transition cursor-pointer">
          <Upload className="w-8 h-8 text-[#0070F0] mb-3" />
          <p className="text-[14px] text-[#344054]">
            Drag & Drop your file. <span className="text-[#0070F0] font-semibold underline">Click to add.</span>
          </p>
          <p className="text-[12px] text-[#667085] mt-2 text-center">
            PDF, JPG, JPEG, PNG less than 5MB.
          </p>
        </div>
      </DocumentSection>

      {/* ─── Consent Form — Required, collapsed ─── */}
      <DocumentSection title="Consent Form" status="required">
        <div className="border-2 border-dashed border-[#B2DDFF] rounded-xl p-8 flex flex-col items-center justify-center bg-[#F5FAFF] hover:bg-blue-50/60 transition cursor-pointer">
          <Upload className="w-8 h-8 text-[#0070F0] mb-3" />
          <p className="text-[14px] text-[#344054]">
            Drag & Drop your file. <span className="text-[#0070F0] font-semibold underline">Click to add.</span>
          </p>
          <p className="text-[12px] text-[#667085] mt-2 text-center">
            PDF, JPG, JPEG, PNG less than 5MB.
          </p>
        </div>
      </DocumentSection>

    </div>
  );
}
