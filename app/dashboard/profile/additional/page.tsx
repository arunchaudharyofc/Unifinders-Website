"use client";

import { useState } from "react";
import { Edit2, HelpCircle } from "lucide-react";

// ─── Field display helper ───
function Field({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-[#667085] mb-1">{label}</p>
      <p className={`font-semibold text-[15px] break-words ${isLink ? 'text-[#0070F0]' : 'text-[#101828]'}`}>{value}</p>
    </div>
  );
}

export default function AdditionalInformationPage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] mb-0.5">Additional Informations</h1>
          <p className="text-[13px] text-[#667085]">(Please provide complete details of your listed contents.)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl bg-white text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm shrink-0">
          <Edit2 className="w-3.5 h-3.5 text-[#0070F0]" /> Edit Details
        </button>
      </div>

      {/* ─── Study Plan Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Study Plan <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Level applying" value="Postgraduate" />
          <Field label="Course of Interest" value="Computer Science" />
          <Field label="Desired Specialization" value="Frontend Developer" />
          <Field label="Desired Specialization" value="Frontend Developer" />
          <Field label="Country of Interest" value="Australia" />
          <Field label="Preferred year of Admission" value="2024, 2025, 2026" />
        </div>
      </div>

      {/* ─── Travel Permission Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Travel Permission <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Refused by any country" value="No" />
          <Field label="Have valid study/work permit from any country" value="No" />
        </div>
      </div>

      {/* ─── Visa Type Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Visa Type <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Visa Type" value="Single" />
          <Field label="Name" value="Ram Charan Yadav" />
          <Field label="Country" value="Nepal" />
          <Field label="Date of Birth" value="1998-05-25" />
          <Field label="Contact" value="+977 981-5689789" />
          <Field label="Email Address" value="example@domain.com" isLink />
          <Field label="Passport Number" value="PA0045668" />
          <Field label="Address" value="Maitidevi, Kathmandu, Nepal" />
        </div>
      </div>

    </div>
  );
}
