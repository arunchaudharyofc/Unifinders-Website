"use client";
import { useState } from "react";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button 
      onClick={onChange}
      className={`w-11 h-6 rounded-full flex items-center p-1 transition-colors ${checked ? 'bg-[#0070F0]' : 'bg-slate-200'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function SegmentedControl({ options, value, onChange }: { options: string[], value: string, onChange: (val: string) => void }) {
  return (
    <div className="flex bg-[#F1F5F9] p-1 rounded-xl" style={{ border: '1px solid #EAECF0' }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`px-4 py-1.5 text-[14px] font-medium rounded-lg transition-all ${value === opt ? 'bg-white shadow-sm text-[#101828]' : 'text-[#475467] hover:text-[#101828]'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default function SettingsNotificationsPage() {
  const [mentions, setMentions] = useState(true);
  const [replies, setReplies] = useState(true);
  const [taskAssigned, setTaskAssigned] = useState("Email");
  const [taskOverdue, setTaskOverdue] = useState("In-app");
  const [taskStatus, setTaskStatus] = useState("Email");
  
  const [reminder, setReminder] = useState("All reminders");

  const [daily, setDaily] = useState("Email");
  const [weekly, setWeekly] = useState("Email");
  const [monthly, setMonthly] = useState("Email");
  const [quarterly, setQuarterly] = useState("Email");

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#EAECF0] overflow-hidden" style={{ borderColor: '#EAECF0', borderRadius: '1rem' }}>
      
      {/* Header */}
      <div className="p-6 border-b border-[#EAECF0] bg-white" style={{ borderColor: '#EAECF0' }}>
        <h2 className="text-[18px] font-bold text-[#101828] mb-1.5">Notification Settings</h2>
        <p className="text-[14px] text-[#475467]">Change the notifications based upon your preferences.</p>
      </div>

      <div className="divide-y divide-[#EAECF0]">
        
        {/* General Notifications */}
        <div className="p-8 flex gap-8">
          <div className="w-[300px] shrink-0">
            <h3 className="text-[15px] font-bold text-[#101828] mb-2">General notifications</h3>
            <p className="text-[14px] text-[#475467] leading-relaxed">Select when you'll be notified when the following changes occur.</p>
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#101828]">I'm mentioned in a message</span>
              <Toggle checked={mentions} onChange={() => setMentions(!mentions)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#101828]">Someone replies to any message</span>
              <Toggle checked={replies} onChange={() => setReplies(!replies)} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[14px] font-medium text-[#101828]">I'm assigned a task</span>
              <SegmentedControl options={['None', 'In-app', 'Email']} value={taskAssigned} onChange={setTaskAssigned} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[14px] font-medium text-[#101828]">A task is overdue</span>
              <SegmentedControl options={['None', 'In-app', 'Email']} value={taskOverdue} onChange={setTaskOverdue} />
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[14px] font-medium text-[#101828]">A task status is updated</span>
              <SegmentedControl options={['None', 'In-app', 'Email']} value={taskStatus} onChange={setTaskStatus} />
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="p-8 flex gap-8">
          <div className="w-[300px] shrink-0">
            <h3 className="text-[15px] font-bold text-[#101828] mb-2">Reminders</h3>
            <p className="text-[14px] text-[#475467] leading-relaxed">There are notifications to remind you of updates and requirements that you might have missed.</p>
          </div>
          <div className="flex-1 space-y-4 pt-1">
            {['Do not notify me', 'Important reminders only', 'All reminders'].map(opt => (
              <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${reminder === opt ? 'border-[#0070F0]' : 'border-slate-300 group-hover:border-[#0070F0]'}`}>
                  {reminder === opt && <div className="w-2 h-2 rounded-full bg-[#0070F0]"></div>}
                </div>
                <span className="text-[14px] font-medium text-[#101828]">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Summary notifications */}
        <div className="p-8 flex gap-8">
          <div className="w-[300px] shrink-0">
            <h3 className="text-[15px] font-bold text-[#101828] mb-2">Summary notifications</h3>
            <p className="text-[14px] text-[#475467] leading-relaxed">Select when you'll be notified when the following summaries or report are ready.</p>
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#101828]">Daily Summary</span>
              <SegmentedControl options={['None', 'In-app', 'Email']} value={daily} onChange={setDaily} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#101828]">Weekly Summary</span>
              <SegmentedControl options={['None', 'In-app', 'Email']} value={weekly} onChange={setWeekly} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#101828]">Monthly Summary</span>
              <SegmentedControl options={['None', 'In-app', 'Email']} value={monthly} onChange={setMonthly} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-medium text-[#101828]">Quarterly Summary</span>
              <SegmentedControl options={['None', 'In-app', 'Email']} value={quarterly} onChange={setQuarterly} />
            </div>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-[#EAECF0] flex justify-end gap-4 bg-white" style={{ borderColor: '#EAECF0' }}>
        <button className="px-6 py-2.5 border border-[#D0D5DD] rounded-xl text-[14px] font-semibold text-[#344054] hover:bg-slate-50 transition shadow-sm bg-white">
          Discard Changes
        </button>
        <button className="px-6 py-2.5 bg-[#0070F0] text-white rounded-xl text-[14px] font-semibold hover:bg-blue-600 transition shadow-sm">
          Save Changes
        </button>
      </div>

    </div>
  );
}
