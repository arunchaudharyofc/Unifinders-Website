import { Eye } from "lucide-react";

export default function SettingsPasswordPage() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#EAECF0] overflow-hidden">
      
      {/* Header */}
      <div className="p-6 border-b border-[#EAECF0]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-1.5">Password</h2>
        <p className="text-[14px] text-[#475467]">To change your password, Kindly enter your current password. Then create a new password.</p>
      </div>

      {/* Form */}
      <div className="p-8 pb-4 space-y-8">
        
        {/* Current Password */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="w-full md:w-[280px] shrink-0 font-bold text-[#101828] text-[15px]">Current Password</label>
          <div className="flex-1 relative">
            <input 
              type="password" 
              defaultValue="***********" 
              className="w-full h-[52px] px-4 border border-[#D0D5DD] rounded-xl text-[15px] focus:outline-none focus:border-[#0070F0] text-[#101828]" 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="w-full md:w-[280px] shrink-0 font-bold text-[#101828] text-[15px]">New Password</label>
          <div className="flex-1 relative">
            <input 
              type="password" 
              placeholder="Enter new password" 
              className="w-full h-[52px] px-4 border border-[#D0D5DD] rounded-xl text-[15px] focus:outline-none focus:border-[#0070F0] placeholder-slate-400" 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <label className="w-full md:w-[280px] shrink-0 font-bold text-[#101828] text-[15px]">Confirm New Password</label>
          <div className="flex-1 relative">
            <input 
              type="password" 
              placeholder="Confirm new password" 
              className="w-full h-[52px] px-4 border border-[#D0D5DD] rounded-xl text-[15px] focus:outline-none focus:border-[#0070F0] placeholder-slate-400" 
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-[#EAECF0] flex justify-end gap-4 mt-4">
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
