import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Phone, Mail, User, Edit2 } from "lucide-react";
import ProfileTabs from "./Tabs";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const fullName = user.user_metadata?.full_name || "Rajan Maharjan";
  const email = user.email || "riyamaharjan45@gmail.com";

  return (
    <div className="flex flex-col lg:flex-row bg-[#F8FAFC] -mx-6 -my-6 md:-mx-8 md:-my-8" style={{ minHeight: 'calc(100vh - 80px)' }}>
      
      {/* ─── Profile Left Sidebar ─── */}
      <div className="shrink-0 bg-white border-b lg:border-b-0 lg:border-r border-[#EAECF0] flex flex-col items-center pt-10 px-6 pb-8 w-full lg:w-[300px]">
        
        {/* Avatar */}
        <div className="relative mb-3">
          <div className="rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-200" style={{ width: '120px', height: '120px' }}>
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
          <button 
            className="absolute bottom-1 right-1 w-7 h-7 text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm bg-[#0070F0] hover:bg-blue-600 transition"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <h2 className="text-lg font-bold text-[#101828] mb-6">{fullName}</h2>

        {/* Info List */}
        <div className="w-full space-y-3.5 mb-8">
          <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
            <Phone className="w-[18px] h-[18px] text-[#0070F0] shrink-0" /> (+977) 9841-5689789
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
            <Mail className="w-[18px] h-[18px] text-[#0070F0] shrink-0" /> {email}
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
            <div className="w-[18px] h-[18px] flex items-center justify-center border-2 rounded font-bold text-[8px] text-[#0070F0] border-[#0070F0] shrink-0">UN</div> 
            Unmarried
          </div>
          <div className="flex items-center gap-3 text-[14px] text-[#475467] font-medium">
            <User className="w-[18px] h-[18px] text-[#0070F0] shrink-0" /> Male
          </div>
        </div>

        {/* Progress Box */}
        <div className="w-full rounded-2xl p-5 text-center text-white overflow-hidden bg-[#0B1A2D]">
          <h3 className="font-bold text-base mb-4">Complete your profile</h3>
          
          <div className="relative mx-auto mb-4" style={{ width: '110px', height: '110px' }}>
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0070F0" strokeWidth="10" strokeDasharray="251" strokeDashoffset="226" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">10%</span>
              <span className="text-[10px] text-slate-300 font-medium">Completed</span>
            </div>
          </div>
          
          <p className="text-[12px] text-slate-300 leading-relaxed text-left">
            Complete your profile information to fully experience the possibilities of our portal - personalised search results, perfect matches, recommendations and more!
          </p>
        </div>
      </div>

      {/* ─── Main Content Area ─── */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Navigation Tabs */}
        <ProfileTabs />
        
        {/* Tab Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </div>
      
    </div>
  );
}
