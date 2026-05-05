"use client";

import { useState } from "react";
import { Edit2, HelpCircle, Plus, X, ChevronDown } from "lucide-react";

// ─── Field display helper ───
function Field({ label, value, isLink }: { label: string; value: string; isLink?: boolean }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-[#667085] mb-1">{label}</p>
      <p className={`font-semibold text-[15px] break-words ${isLink ? 'text-[#0070F0]' : 'text-[#101828]'}`}>{value}</p>
    </div>
  );
}

export default function ProfilePersonalDetailsPage() {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] mb-0.5">Personal Details</h1>
          <p className="text-[13px] text-[#667085]">(You can select multiple choices based upon the tests you have done)</p>
        </div>
        <button 
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl bg-white text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm shrink-0"
        >
          <Edit2 className="w-3.5 h-3.5 text-[#0070F0]" /> Edit Details
        </button>
      </div>

      {/* ─── Personal Information Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Personal Information <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Name" value="Riya Maharjan" />
          <Field label="Gender" value="Female" />
          <Field label="Email Address" value="riyamaharjan12@gmail.com" isLink />
          <Field label="Contact" value="+977 9841 568 464" />
          <Field label="Country of Citizenship" value="Nepal" />
          <Field label="Date of Birth" value="21 May, 1995" />
          <Field label="Martial Status" value="Single" />
        </div>
      </div>

      {/* ─── Address Details Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Address Details <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Country" value="Nepal" />
          <Field label="State" value="N/A" />
          <Field label="City" value="N/A" />
          <Field label="Address" value="N/A" />
          <Field label="Postal Code" value="N/A" />
        </div>
      </div>

      {/* ─── Parent Details Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Parent Details <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8 mb-6">
          <Field label="Guardian Type" value="Primary" />
          <Field label="Name" value="Ram Maharjan" />
          <Field label="Relationship to Student" value="Father" />
          <Field label="Parent address as the student?" value="Yes" />
          <Field label="Parent's Contact" value="+977 9841 565 898" />
          <Field label="Parent's Email Address" value="N/A" />
        </div>

        <button className="flex items-center gap-2 text-[14px] font-semibold text-[#344054] hover:text-[#0070F0] transition">
          <div className="w-5 h-5 rounded-full bg-[#0070F0] text-white flex items-center justify-center">
            <Plus className="w-3 h-3" strokeWidth={3} />
          </div>
          Add Guardian
        </button>
      </div>

      {/* ─── Edit Personal Details Modal ─── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[650px] max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
              <h2 className="text-[18px] font-bold text-[#101828]">Edit Personal Details</h2>
              <button onClick={() => setEditOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              
              <h3 className="text-[15px] font-bold text-[#101828] flex items-center gap-2">
                Personal Informations <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
              </h3>

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">First Name <span className="text-red-500">*</span></label>
                  <input defaultValue="Riya" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Middle Name</label>
                  <input className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Last Name <span className="text-red-500">*</span></label>
                  <input defaultValue="Maharjan" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
                </div>
              </div>

              {/* Email & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Email <span className="text-red-500">*</span></label>
                  <input defaultValue="riyamaharjan12@gmail.com" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Contact <span className="text-red-500">*</span></label>
                  <div className="flex">
                    <div className="h-11 px-3 border border-[#D0D5DD] border-r-0 rounded-l-xl flex items-center gap-1 bg-slate-50 text-[13px] text-[#344054] shrink-0">
                      NP +977 ▾
                    </div>
                    <input className="flex-1 h-11 px-3 border border-[#D0D5DD] rounded-r-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
                  </div>
                </div>
              </div>

              {/* Country, DOB, Martial */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Country of Citizenship <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Please choose a country</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Date of Birth <span className="text-red-500">*</span></label>
                  <input type="date" className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] focus:outline-none focus:border-[#0070F0]" />
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Martial Status <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Gender & Martial Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Gender <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Prefer not to say</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Martial Status <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                      <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Desired Specialization */}
              <div>
                <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Desired specialization</label>
                <div className="relative">
                  <select className="w-full h-11 px-3 border border-[#D0D5DD] rounded-xl text-[14px] text-[#667085] appearance-none bg-white focus:outline-none focus:border-[#0070F0]">
                    <option>Select desired specialization</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-[#667085] pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-[#EAECF0] flex items-center justify-end gap-3 shrink-0 bg-white">
              <button onClick={() => setEditOpen(false)} className="px-5 py-2.5 border border-[#D0D5DD] rounded-xl text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition">
                Discard Changes
              </button>
              <button onClick={() => setEditOpen(false)} className="px-5 py-2.5 bg-[#0070F0] rounded-xl text-[13px] font-semibold text-white hover:bg-blue-600 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
