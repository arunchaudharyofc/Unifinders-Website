import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CountryGuideTabs from "./Tabs";

export default async function CountryGuideLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="bg-slate-50 -m-6 md:-m-8 min-h-screen">
      
      {/* Hero Banner */}
      <div className="relative h-[400px] w-full flex items-center px-12 md:px-20 overflow-hidden shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Australia Background" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-[40px] font-bold text-white mb-4 leading-tight">Study Guide to Australia</h1>
          <p className="text-[16px] text-slate-200 leading-relaxed mb-8">
            Explore everything you need to know about studying abroad in Australia/the UK/Canada, from intake dates and application processes to visa applications and best student cities!
          </p>
          <button className="h-12 px-8 bg-[#0070F0] text-white rounded-xl text-[15px] font-bold hover:bg-blue-600 transition shadow-lg">
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <CountryGuideTabs />

      {/* Main Content Area */}
      <div className="bg-white min-h-[500px]">
        {children}
      </div>

    </div>
  );
}
