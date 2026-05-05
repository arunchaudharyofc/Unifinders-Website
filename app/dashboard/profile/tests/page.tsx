"use client";

import { useState } from "react";
import { HelpCircle, Plus, X, ChevronDown } from "lucide-react";

// ─── Field display helper ───
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-[#667085] mb-1">{label}</p>
      <p className="font-semibold text-[15px] text-[#101828] break-words">{value}</p>
    </div>
  );
}

const TEST_LOGOS: Record<string, { label: string; color: string }> = {
  ielts: { label: "IELTS", color: "#D4382C" },
  pearson: { label: "Pearson", color: "#6B21A8" },
  toefl: { label: "TOEFL", color: "#333" },
  gmat: { label: "GMAT", color: "#1A1A1A" },
  gre: { label: "GRE", color: "#333" },
  sat: { label: "SAT", color: "#0070F0" },
  oet: { label: "OET", color: "#333" },
};

export default function TestsAndOthersPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] flex items-center gap-2 mb-0.5">
            Tests & Others <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
          </h1>
          <p className="text-[13px] text-[#667085]">(Please provide your test scores and results)</p>
        </div>
        <button 
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl bg-white text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#0070F0]" /> Add Test Score
        </button>
      </div>

      {/* ─── IELTS Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[22px] font-black text-[#D4382C] tracking-tight">IELTS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8 mb-6">
          <Field label="Examination Date" value="15 March, 2023" />
          <Field label="Result Date" value="28 March, 2023" />
          <Field label="Reading" value="7.0" />
          <Field label="Listening" value="7.5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-8">
          <Field label="Writing" value="6.5" />
          <Field label="Speaking" value="7.0" />
          <Field label="Overall Bandwidth" value="7.0" />
        </div>
      </div>

      {/* ─── GRE Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[20px] font-black text-[#333] tracking-tight">GRE</span>
        </div>
        
        <h3 className="text-[14px] font-bold text-[#101828] mb-3">Verbal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-6">
          <Field label="Score" value="160" />
          <Field label="Rank" value="85th percentile" />
        </div>
        
        <h3 className="text-[14px] font-bold text-[#101828] mb-3">Quantitative</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-6">
          <Field label="Score" value="165" />
          <Field label="Rank" value="90th percentile" />
        </div>
        
        <h3 className="text-[14px] font-bold text-[#101828] mb-3">Writing</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          <Field label="Score" value="4.5" />
          <Field label="Rank" value="80th percentile" />
        </div>
      </div>

      {/* ─── Add Test Score Modal ─── */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[650px] max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
              <h2 className="text-[18px] font-bold text-[#101828]">Add Test Score</h2>
              <button onClick={() => setAddOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Test Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(TEST_LOGOS).map(([key, test]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTest(key)}
                    className={`h-14 px-4 rounded-xl border-2 text-[15px] font-bold transition-all relative ${
                      selectedTest === key 
                        ? 'border-[#0070F0] bg-blue-50' 
                        : 'border-[#D0D5DD] bg-white hover:border-[#98A2B3]'
                    }`}
                    style={{ color: test.color }}
                  >
                    {test.label}
                    {selectedTest === key && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#0070F0] rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Examination Date <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Day", "Month", "Year"].map(p => (
                      <div key={p} className="relative">
                        <select className="w-full h-11 px-2 border border-[#D0D5DD] rounded-xl text-[13px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                          <option>{p}</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-3.5 text-[#667085] pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Result Date <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Day", "Month", "Year"].map(p => (
                      <div key={p} className="relative">
                        <select className="w-full h-11 px-2 border border-[#D0D5DD] rounded-xl text-[13px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                          <option>{p}</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-3.5 text-[#667085] pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Score Fields */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["Reading(R)", "Listening", "Reading", "Writing"].map(label => (
                  <div key={label}>
                    <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">{label} <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                        <option>Select</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Bandwidth */}
              <div>
                <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Overall Bandwidth <span className="text-red-500">*</span></label>
                <input placeholder="Your overall bandwidth" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0] placeholder-[#98A2B3]" />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-[#EAECF0] flex items-center justify-end gap-3 shrink-0 bg-white">
              <button onClick={() => setAddOpen(false)} className="px-5 py-2.5 border border-[#D0D5DD] rounded-xl text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition">
                Discard Changes
              </button>
              <button onClick={() => setAddOpen(false)} className="px-5 py-2.5 bg-[#0070F0] rounded-xl text-[13px] font-semibold text-white hover:bg-blue-600 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
