"use client";
import { useState } from "react";
import { Download, Trash2 } from "lucide-react";

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

export default function SettingsBackupPage() {
  const [googleSync, setGoogleSync] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#EAECF0] overflow-hidden" style={{ borderColor: '#EAECF0', borderRadius: '1rem' }}>
      
      {/* Header */}
      <div className="p-6 border-b border-[#EAECF0] bg-white" style={{ borderColor: '#EAECF0' }}>
        <h2 className="text-[18px] font-bold text-[#101828] mb-1.5">Backup</h2>
        <p className="text-[14px] text-[#475467]">Change the backup options based upon your preferences.</p>
      </div>

      <div className="divide-y divide-[#EAECF0]">
        
        {/* Google Account */}
        <div className="p-8 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-white rounded-full shadow-sm border flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#101828] mb-0.5">example@email.com</h3>
              <p className="text-[14px] text-[#475467]">Backup your data to your connected google account</p>
            </div>
          </div>
          <Toggle checked={googleSync} onChange={() => setGoogleSync(!googleSync)} />
        </div>

        {/* Download Backup */}
        <div className="p-8 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#101828] mb-0.5">Download backup</h3>
            <p className="text-[14px] text-[#475467]">Download your backup data</p>
          </div>
          <button className="h-10 px-4 border border-[#D0D5DD] bg-white rounded-xl text-[14px] font-medium text-[#344054] flex items-center gap-2 hover:bg-slate-50 transition shadow-sm">
            <Download className="w-4 h-4 text-[#0070F0]" /> Download Backup
          </button>
        </div>

        {/* Delete Account */}
        <div className="p-8 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#101828] mb-0.5">Delete Account</h3>
            <p className="text-[14px] text-[#475467]">All your data will be deleted immediately</p>
          </div>
          <button className="h-10 px-4 bg-[#D92D20] text-white rounded-xl text-[14px] font-medium flex items-center gap-2 hover:bg-red-700 transition shadow-sm">
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
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
