import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { X, Plus } from "lucide-react";

export default async function ComparePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="max-w-6xl mx-auto pb-16 pt-8">
      
      {/* Header and Tabs */}
      <div className="flex items-center justify-between mb-8 border-b border-[#EAECF0]">
        <div className="flex items-center gap-8">
          <button className="pb-4 font-semibold text-[#0070F0] border-b-2 border-[#0070F0]">Courses</button>
          <button className="pb-4 font-medium text-[#475467] hover:text-[#101828]">Universities</button>
        </div>
        
        <button className="mb-4 flex items-center gap-2 px-4 py-2 border border-[#D0D5DD] rounded-xl text-sm font-medium text-[#344054] hover:bg-slate-50 transition bg-white shadow-sm">
          <Plus className="w-4 h-4 text-[#0070F0]" /> Add new comparison
        </button>
      </div>

      {/* Compare Table */}
      <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0]">
          {/* Header 1 */}
          <div className="p-8 border-r border-[#EAECF0] flex flex-col justify-center">
            <h2 className="text-xl font-bold text-[#101828] mb-1">Compare Courses</h2>
            <p className="text-sm text-red-500 font-medium">*You can compare up to 3 Courses</p>
          </div>
          
          {/* Uni 1 */}
          <div className="p-6 border-r border-[#EAECF0] text-center relative">
            <button className="absolute top-4 right-4 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center z-10 hover:bg-red-700">
              <X className="w-4 h-4" />
            </button>
            <div className="w-full h-40 bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center"></div>
              {/* Logo Box */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-md font-bold text-xs text-[#0B1A2D]">
                THE UNIVERSITY OF ADELAIDE
              </div>
            </div>
            <h3 className="font-semibold text-[#101828]">The University of Adelaide</h3>
          </div>
          
          {/* Uni 2 */}
          <div className="p-6 text-center relative">
            <button className="absolute top-4 right-4 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center z-10 hover:bg-red-700">
              <X className="w-4 h-4" />
            </button>
            <div className="w-full h-40 bg-slate-200 rounded-xl mb-4 overflow-hidden relative">
               {/* Image Placeholder */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e67056058e1?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center"></div>
               {/* Logo Box */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-lg shadow-md font-bold text-xs text-white" style={{ backgroundColor: '#0B1A2D' }}>
                THE UNIVERSITY OF MELBOURNE
              </div>
            </div>
            <h3 className="font-semibold text-[#101828]">The University of Melbourne</h3>
          </div>
        </div>

        {/* Section: University Details */}
        <div className="w-full py-4 text-center font-bold text-white text-lg" style={{ backgroundColor: '#0070F0' }}>
          University Details
        </div>
        
        {/* Rows */}
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-slate-50/50">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">University Type</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">Public</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">Public</div>
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-white">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Estd</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">1909</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">1805</div>
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-slate-50/50">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Ranking</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">N/A</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">N/A</div>
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-white">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Courses</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">50 Courses</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">20 Courses</div>
        </div>

        {/* Section: Course Details */}
        <div className="w-full py-4 text-center font-bold text-white text-lg mt-0" style={{ backgroundColor: '#0070F0' }}>
          Course Details
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-white">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Course Name</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">Bachelor of Commerce</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">Bachelor of Commerce</div>
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-slate-50/50">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Course Level</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">Post Graduate</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">Under Graduate</div>
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-white">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Specialization</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">Algorithms and Data Structures</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">Business Studies</div>
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-slate-50/50">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Course Duration</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">24 Months</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">32 Months</div>
        </div>
        
        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-white">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">1st Year Tuition Fees</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">$17,500 - $18,500</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">$44,576 - $477,36</div>
        </div>

        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-slate-50/50">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Intake</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">
            <div className="flex flex-col gap-1 items-center">
              <span>Winter: January 2024</span>
              <span>Summer: May 2024</span>
              <span>Fall: September 2024</span>
            </div>
          </div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm flex items-center justify-center">
            <div className="flex flex-col gap-1 items-center">
              <span>Winter: February 2024</span>
              <span>Summer: July 2024</span>
            </div>
          </div>
        </div>

        {/* Section: Entry Requirements */}
        <div className="w-full py-4 text-center font-bold text-white text-lg mt-0" style={{ backgroundColor: '#0070F0' }}>
          Entry Requirements
        </div>

        <div className="grid grid-cols-3 border-b border-[#EAECF0] bg-white">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Application Fees</div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm">N/A</div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm">$100</div>
        </div>

        <div className="grid grid-cols-3 bg-slate-50/50">
          <div className="p-4 px-8 border-r border-[#EAECF0] font-medium text-[#475467] text-sm flex items-center">Intake <span className="text-xs text-slate-400 ml-1">(Exam Scores)</span></div>
          <div className="p-4 text-center border-r border-[#EAECF0] text-[#101828] font-medium text-sm flex items-center justify-center">
            IELTS 6.50
          </div>
          <div className="p-4 text-center text-[#101828] font-medium text-sm flex items-center justify-center">
            <div className="flex flex-col gap-1 items-center">
              <span>TOEFL 79.00</span>
              <span>IELTS 6.50</span>
              <span>PTE 58.00</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
