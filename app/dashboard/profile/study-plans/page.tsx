"use client";

import { useState } from "react";
import { Edit2, HelpCircle, X, ChevronDown } from "lucide-react";

// ─── Field display helper ───
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-[13px] font-medium text-[#667085] mb-1">{label}</p>
      <p className="font-semibold text-[15px] text-[#101828] break-words">{value}</p>
    </div>
  );
}

// ─── Pill Selector ───
function PillGroup({ options, selected, onToggle }: { options: string[]; selected: string[]; onToggle: (opt: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`px-4 py-2 rounded-full border text-[13px] font-medium transition-all relative ${
              active 
                ? 'border-[#0070F0] bg-blue-50 text-[#0070F0]' 
                : 'border-[#D0D5DD] bg-white text-[#344054] hover:border-[#98A2B3]'
            }`}
          >
            {opt}
            {active && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#0070F0] rounded-full flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

const STUDY_LEVELS = ["Undergraduate", "Post Graduate", "Research", "Undergraduate Diploma", "Postgraduate Diploma", "Undergraduate Certificate", "Graduate Certificate"];
const INTAKES = ["December - March", "April - July", "August - November"];
const DESTINATIONS = ["Australia", "Canada", "Germany", "United States", "India", "United Kingdom", "New Zealand", "Others"];
const BUDGETS = ["Below 20,000 USD", "25,000 - 50,000 USD", "50,000 - 100,000 USD", "Above 100,000 USD"];

export default function StudyPlansPage() {
  const [editOpen, setEditOpen] = useState(false);
  const [studyLevels, setStudyLevels] = useState(["Undergraduate", "Post Graduate"]);
  const [intakes, setIntakes] = useState(["April - July"]);
  const [destinations, setDestinations] = useState(["Australia"]);
  const [budget, setBudget] = useState(["Below 20,000 USD"]);

  const toggleItem = (arr: string[], setArr: (v: string[]) => void, item: string) => {
    setArr(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[18px] font-bold text-[#101828] mb-0.5">Study Plans</h1>
          <p className="text-[13px] text-[#667085]">(Please provide complete details of your listed contents.)</p>
        </div>
        <button 
          onClick={() => setEditOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl bg-white text-[13px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm shrink-0"
        >
          <Edit2 className="w-3.5 h-3.5 text-[#0070F0]" /> Edit Details
        </button>
      </div>

      {/* ─── Study Aspirations Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Study Aspirations <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
          <Field label="Study Level Sought" value="Undergraduate, Postgraduate, Masters, Postgraduate Diploma" />
          <Field label="Intake" value="Apr - Jul" />
          <Field label="Desired Specialization" value="Computer Science" />
        </div>
      </div>

      {/* ─── Desired Destinations Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Desired Destinations <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <div className="space-y-6">
          <Field label="Desired Destination" value="Australia, Canada, USA" />
          <div>
            <p className="text-[13px] font-medium text-[#667085] mb-1">Why these Destination</p>
            <p className="text-[14px] text-[#344054] leading-relaxed">
              Potter ipsum wand elf parchment wingardium. Broken essence shack weasley duel fire-whisky thieves charm bathroom erumpent. Time-turner spell headless thestral fire-whisky twin keeper crimson i&apos;d. Prophecies spectacles order soul disciplinary padma to seek wool pumpkin.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Study Budget Card ─── */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm p-5 sm:p-8">
        <h2 className="text-[16px] font-bold text-[#101828] flex items-center gap-2 mb-6">
          Study Budget <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
        </h2>
        <Field label="Budget" value="$25,000-$50,000 USD" />
      </div>

      {/* ─── Edit Study Plans Modal ─── */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#101828]/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[700px] max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#EAECF0] flex items-center justify-between shrink-0">
              <h2 className="text-[18px] font-bold text-[#101828]">Edit Study Plans</h2>
              <button onClick={() => setEditOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#667085] hover:bg-slate-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-8">
              
              {/* Study Aspirations Section */}
              <div>
                <h3 className="text-[15px] font-bold text-[#101828] flex items-center gap-2 mb-4">
                  Study Aspirations <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="text-[13px] font-semibold text-[#101828] mb-2 block">Study level sought</label>
                    <PillGroup options={STUDY_LEVELS} selected={studyLevels} onToggle={(o) => toggleItem(studyLevels, setStudyLevels, o)} />
                  </div>
                  
                  <div>
                    <label className="text-[13px] font-semibold text-[#101828] mb-2 block">Intake</label>
                    <PillGroup options={INTAKES} selected={intakes} onToggle={(o) => toggleItem(intakes, setIntakes, o)} />
                  </div>
                  
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
              </div>

              {/* Desired Destinations Section */}
              <div>
                <h3 className="text-[15px] font-bold text-[#101828] flex items-center gap-2 mb-4">
                  Desired Destinations <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
                </h3>
                
                <div className="space-y-5">
                  <PillGroup options={DESTINATIONS} selected={destinations} onToggle={(o) => toggleItem(destinations, setDestinations, o)} />
                  
                  <div>
                    <label className="text-[13px] font-semibold text-[#101828] mb-1.5 block">Why these destinations?</label>
                    <textarea 
                      placeholder="Type your reasons here so that we can better understand and guide you accordingly."
                      className="w-full h-32 p-3 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0] resize-none placeholder-[#98A2B3]"
                    />
                  </div>
                </div>
              </div>

              {/* Study Budget Section */}
              <div>
                <h3 className="text-[15px] font-bold text-[#101828] flex items-center gap-2 mb-4">
                  Study Budget <HelpCircle className="w-4 h-4 text-[#98A2B3]" />
                </h3>
                <PillGroup options={BUDGETS} selected={budget} onToggle={(o) => toggleItem(budget, setBudget, o)} />
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
