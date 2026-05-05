import { Search, Plus, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function HelpCenterPage() {
  return (
    <div className="bg-slate-50 min-h-screen -m-6 md:-m-8 p-8 md:p-12">
      
      {/* Top Search Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-12 text-center max-w-[1000px] mx-auto mb-16" style={{ borderColor: '#EAECF0' }}>
        <h1 className="text-[32px] font-bold text-[#101828] mb-2">
          <span className="text-[#0070F0]">Hey there!</span> How can we help you today?
        </h1>
        <p className="text-[14px] text-[#475467] mb-8">Know about different courses and programs according to your preferences</p>
        
        <div className="max-w-[700px] mx-auto flex gap-4">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search by name, ID or any related keyword" 
              className="w-full h-[52px] pl-4 pr-4 border rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" 
              style={{ borderColor: '#D0D5DD' }} 
            />
          </div>
          <button className="h-[52px] px-8 bg-[#0070F0] text-white rounded-xl text-[15px] font-bold hover:bg-blue-600 transition shadow-sm flex items-center gap-2">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      {/* Discover More */}
      <div className="max-w-[800px] mx-auto text-center mb-16">
        <h2 className="text-[28px] font-bold text-[#101828] mb-2">Discover <span className="text-[#0070F0]">More</span></h2>
        <p className="text-[15px] text-[#475467] mb-8">You can also choose an option to process further!</p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button className="px-5 py-2.5 bg-[#0B1A2D] text-white rounded-full text-[13px] font-semibold">About Unifinders</button>
          <button className="px-5 py-2.5 bg-white border text-[#475467] rounded-full text-[13px] font-medium hover:bg-slate-50 transition" style={{ borderColor: '#EAECF0' }}>Getting Started</button>
          <button className="px-5 py-2.5 bg-white border text-[#475467] rounded-full text-[13px] font-medium hover:bg-slate-50 transition" style={{ borderColor: '#EAECF0' }}>Finding Best Course</button>
          <button className="px-5 py-2.5 bg-white border text-[#475467] rounded-full text-[13px] font-medium hover:bg-slate-50 transition" style={{ borderColor: '#EAECF0' }}>Finding Best Universities</button>
          <button className="px-5 py-2.5 bg-white border text-[#475467] rounded-full text-[13px] font-medium hover:bg-slate-50 transition" style={{ borderColor: '#EAECF0' }}>Managing Account</button>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white border rounded-xl p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition shadow-sm" style={{ borderColor: '#EAECF0' }}>
              <h3 className="text-[15px] font-bold text-[#101828]">What is Unifinder's Scholarship?</h3>
              <Plus className="w-5 h-5 text-[#0070F0]" />
            </div>
          ))}
        </div>
      </div>

      {/* Get in Touch */}
      <div className="max-w-[800px] mx-auto text-center pb-12">
        <h2 className="text-[24px] font-bold text-[#101828] mb-1">Didn't find what you were looking for?</h2>
        <h2 className="text-[24px] font-bold text-[#0070F0] mb-12">Get in Touch!</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-2xl p-10 flex flex-col items-center shadow-sm" style={{ borderColor: '#EAECF0' }}>
            <div className="w-12 h-12 rounded-full border-2 border-[#E0E7FF] text-[#0070F0] flex items-center justify-center mb-4 bg-[#EEF2FF]">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-bold text-[#101828] mb-4 tracking-wide uppercase">EMAIL</h3>
            <Link href="mailto:support@unifinders.com" className="text-[#0070F0] text-[14px] font-semibold underline mb-1 hover:text-blue-700">Clink here</Link>
            <p className="text-[14px] text-[#475467]">to send us an email</p>
          </div>

          <div className="bg-white border rounded-2xl p-10 flex flex-col items-center shadow-sm" style={{ borderColor: '#EAECF0' }}>
            <div className="w-12 h-12 rounded-full border-2 border-[#E0E7FF] text-[#0070F0] flex items-center justify-center mb-4 bg-[#EEF2FF]">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-[16px] font-bold text-[#101828] mb-4 tracking-wide uppercase">PHONE</h3>
            <p className="text-[14px] text-[#475467] mb-2">Give us a call in</p>
            <p className="text-[14px] text-[#475467] mb-1">Call/Whatsapp <a href="tel:+97798011332" className="text-[#0070F0] underline font-semibold">(+977) 980-11332</a></p>
            <p className="text-[14px] text-[#475467]">Tel No <a href="tel:+977015901332" className="text-[#0070F0] underline font-semibold">(+977) 01-5901332</a></p>
          </div>
        </div>
      </div>

    </div>
  );
}
