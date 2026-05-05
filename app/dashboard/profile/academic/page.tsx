"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, ChevronDown } from "lucide-react";

// ─── Field display helper ───
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-[#667085] mb-1">{label}</p>
      <p className="font-semibold text-[15px] text-[#101828] break-words">{value}</p>
    </div>
  );
}

const EDUCATION_DATA = [
  {
    level: "Secondary (10th Grade)",
    institute: "Himalayan Java School",
    country: "Nepal",
    schoolType: "Open",
    status: "Graduated",
    from: "10 January, 2014",
    to: "10 January, 2016",
    gradeScheme: "Percentage",
    gradeAchieved: "79.5%",
  },
  {
    level: "High School (11th - 12th Grade)",
    institute: "Himalayan Java School",
    country: "Nepal",
    schoolType: "Open",
    status: "Graduated",
    from: "10 January, 2014",
    to: "10 January, 2016",
    gradeScheme: "Percentage",
    gradeAchieved: "79.5%",
  },
  {
    level: "Undergraduate",
    institute: "Himalayan Java School",
    country: "Nepal",
    schoolType: "Open",
    status: "Graduated",
    from: "10 January, 2014",
    to: "10 January, 2016",
    gradeScheme: "Percentage",
    gradeAchieved: "79.5%",
  },
];

export default function AcademicQualificationPage() {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] mb-0.5">Academic Qualifications</h1>
          <p className="text-[13px] text-[#667085]">(Please provide complete details of your academic history and qualifications)</p>
        </div>
        <button 
          onClick={() => setAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl bg-white text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm shrink-0"
        >
          <Plus className="w-3.5 h-3.5 text-[#0070F0]" /> Add New
        </button>
      </div>

      {/* ─── Education Cards ─── */}
      {EDUCATION_DATA.map((edu, i) => (
        <div key={i} className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
          {/* Card Title Row */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-bold text-[#101828]">{edu.level}</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg transition">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-[#667085] hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
            <Field label="Institute Name" value={edu.institute} />
            <Field label="Country of Intitute" value={edu.country} />
            <Field label="School Type" value={edu.schoolType} />
            <Field label="Status" value={edu.status} />
            <Field label="Attended Institute from" value={edu.from} />
            <Field label="Attended Institute to" value={edu.to} />
            <Field label="Grading Scheme" value={edu.gradeScheme} />
            <Field label="Grade Achieved" value={edu.gradeAchieved} />
          </div>
        </div>
      ))}

      {/* ─── Add Education Summary Modal ─── */}
      {addOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[650px] max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
              <h2 className="text-[18px] font-bold text-[#101828]">Add Education Summary</h2>
              <button onClick={() => setAddOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
              
              {/* Level of Education & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Level of Education <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Country of Institute <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* School Type & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">School Type <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#344054]">
                      <input type="radio" name="schoolType" className="w-4 h-4 accent-[#0070F0]" /> Open
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#344054]">
                      <input type="radio" name="schoolType" className="w-4 h-4 accent-[#0070F0]" /> Regular
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Status <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#344054]">
                      <input type="radio" name="status" className="w-4 h-4 accent-[#0070F0]" /> Graduated
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[14px] text-[#344054]">
                      <input type="radio" name="status" className="w-4 h-4 accent-[#0070F0]" /> Pursuing
                    </label>
                  </div>
                </div>
              </div>

              {/* Name of Institute & Study Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Name of Institute <span className="text-red-500">*</span></label>
                  <input placeholder="Enter institute name" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0] placeholder-[#98A2B3]" />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Study Area <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Grade Scheme & Grade Achieved */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Grade Scheme <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select defaultValue="Percentage" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#101828] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Percentage</option>
                      <option>GPA</option>
                      <option>CGPA</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Grade Achieved <span className="text-red-500">*</span></label>
                  <input placeholder="Enter Percentage" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0] placeholder-[#98A2B3]" />
                </div>
              </div>

              {/* Attended From/To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Attended Institution From <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                        <option>Select month</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                        <option>Select year</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Attended Institution To <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                        <option>Select month</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                        <option>Select year</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                    </div>
                  </div>
                </div>
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
