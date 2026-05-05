import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Search, ChevronDown, ArrowLeft, Bookmark, Repeat, Building, MapPin, GraduationCap, Check, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function UniversityDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="bg-slate-50 -m-6 md:-m-8 min-h-screen pb-12">
      
      {/* Top Header */}
      <div className="h-16 bg-white border-b flex items-center px-8 sticky top-0 z-20" style={{ borderColor: '#EAECF0' }}>
        <Link href="/dashboard/universities" className="flex items-center justify-center w-8 h-8 rounded-full border hover:bg-slate-50 transition mr-4" style={{ borderColor: '#EAECF0' }}>
          <ArrowLeft className="w-4 h-4 text-[#344054]" />
        </Link>
        <h1 className="text-[18px] font-bold text-[#101828]">University Details</h1>
      </div>

      {/* Hero Image area */}
      <div className="relative h-[300px] w-full">
        <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover" alt="University Campus" />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Floating Right Card */}
      <div className="max-w-[1200px] mx-auto px-8 relative -mt-32 z-10 flex items-start gap-8">
        
        {/* Left Content Area */}
        <div className="flex-1 mt-36 bg-transparent">
          <h1 className="text-[32px] font-bold text-[#101828] mb-6">The University of Melbourne</h1>
          
          {/* Feature Bullets */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-12">
            {[
              "Ten faculties", "Two theatres within Union House",
              "340 programs", "Acceptance rate is 70%-80%",
              "11 libraries", "Nine generalized three-year degrees",
              "38 cultural collections", "11 separate academic institutions",
              "Five research centers", "12 museums and galleries"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-2 text-[14px] text-[#344054]">
                <div className="w-4 h-4 mt-0.5 rounded-full bg-[#0070F0] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-white" />
                </div>
                {text}
              </div>
            ))}
          </div>

          <div className="flex items-start gap-8">
            {/* Sidebar Sticky Nav */}
            <div className="w-[240px] shrink-0 sticky top-24 space-y-1">
              <div className="bg-[#F1F5F9] rounded-xl p-1 flex mb-4 border" style={{ borderColor: '#EAECF0' }}>
                <button className="flex-1 py-1.5 bg-white shadow-sm rounded-lg text-[13px] font-bold text-[#101828]">Overview</button>
                <button className="flex-1 py-1.5 text-[13px] font-medium text-[#475467] hover:text-[#101828]">Courses</button>
              </div>
              <div className="flex flex-col text-[14px] font-medium">
                <button className="text-left px-4 py-3 rounded-lg bg-[#0070F0] text-white">University Highlights</button>
                <button className="text-left px-4 py-3 rounded-lg text-[#475467] hover:bg-slate-100 transition">Overview</button>
                <button className="text-left px-4 py-3 rounded-lg text-[#475467] hover:bg-slate-100 transition">Accommodation</button>
                <button className="text-left px-4 py-3 rounded-lg text-[#475467] hover:bg-slate-100 transition">Fees & Admissions Requirements</button>
                <button className="text-left px-4 py-3 rounded-lg text-[#475467] hover:bg-slate-100 transition">Campus & Contact</button>
              </div>
            </div>

            {/* Main scrollable content sections */}
            <div className="flex-1 space-y-12">
              
              {/* Highlights Section */}
              <section className="bg-white rounded-2xl border p-8 shadow-sm" style={{ borderColor: '#EAECF0' }}>
                <h3 className="text-[18px] font-bold text-[#101828] mb-6">University Highlights</h3>
                <div className="space-y-4">
                  {[
                    { label: "University Type", value: "Public", icon: Building },
                    { label: "Establishment", value: "1583", icon: Calendar },
                    { label: "International Students", value: "21840", icon: GraduationCap },
                    { label: "Male/Female Ratio", value: "1:1.3", icon: Check },
                    { label: "Facility/Student Ratio", value: "1:12", icon: Check },
                    { label: "Number of Campus", value: "1", icon: Building },
                    { label: "Average Tuition / year", value: "$45,125 - $48,500 (AUD)", icon: Check },
                    { label: "Average Living Cost", value: "$45,125 - $48,500 (AUD)", icon: Check },
                  ].map((item, i) => (
                    <div key={i} className="flex py-3 border-b last:border-0 items-center" style={{ borderColor: '#EAECF0' }}>
                      <div className="w-[200px] flex items-center gap-2 text-[#475467] text-[14px]">
                        <item.icon className="w-4 h-4 text-[#0070F0]" /> {item.label}
                      </div>
                      <div className="flex-1 text-[14px] font-semibold text-[#101828]">{item.value}</div>
                    </div>
                  ))}
                  <div className="flex py-3 items-center pt-2">
                    <div className="w-[200px] flex items-center gap-2 text-[#475467] text-[14px]">
                      <Calendar className="w-4 h-4 text-[#0070F0]" /> Intakes:
                    </div>
                    <div className="flex-1 text-[14px] font-semibold text-[#101828] flex items-center gap-4">
                      <span>Summer: <span className="bg-[#0070F0] text-white px-2 py-0.5 rounded-full text-xs ml-1">July,2024</span></span>
                      <span>Winter: <span className="bg-[#0070F0] text-white px-2 py-0.5 rounded-full text-xs ml-1">January,2025</span></span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Overview Section */}
              <section className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#101828]">Overview</h3>
                <p className="text-[14px] text-[#475467] leading-relaxed">
                  The University of Melbourne is a public research-based university in Melbourne, Australia. It is the second oldest university of Australia, established in 1853. The main Parkville campus is located in Parkville and three other campuses in metropolitan Melbourne at Burnley, Southbank and Werribee. The university is ranked first in Australia and ranks 41st globally. It has over 13,000 international students from more than 130 countries.
                </p>
                <div className="flex items-start gap-2 text-[14px] text-[#344054] mt-4 font-semibold">
                  <Check className="w-4 h-4 text-[#0070F0] mt-0.5 shrink-0" /> There are ten faculties:
                </div>
                <div className="grid grid-cols-2 gap-y-3 pl-6 mt-2">
                  {["Architecture, Building and Planning", "Arts", "Business and Economics", "Education", "Engineering and Information Technology", "Fine Arts and Music", "Law", "Medicine, Dentistry and Health Sciences", "Science", "Veterinary and Agricultural Sciences"].map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-[14px] text-[#475467]">
                      <Check className="w-4 h-4 text-[#0070F0] shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>

        </div>

        {/* Right Floating Card */}
        <div className="w-[380px] shrink-0 bg-white rounded-2xl shadow-lg border overflow-hidden relative top-0 flex flex-col" style={{ borderColor: '#EAECF0' }}>
          <div className="bg-[#0B1A2D] h-[160px] flex items-center justify-center relative p-6">
            <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded shadow-sm text-[12px] font-bold text-[#101828]">
              Rank: <span className="text-[#0070F0]">25</span>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/University_of_Melbourne_shield.svg/1200px-University_of_Melbourne_shield.svg.png" className="max-h-full filter invert opacity-90" />
          </div>
          <div className="p-6">
            <h2 className="text-[20px] font-bold text-[#101828] mb-4">The University of Melbourne</h2>
            <div className="space-y-3 mb-6 text-[14px] text-[#344054]">
              <div className="flex items-center gap-2"><Building className="w-4 h-4 text-[#0070F0]" /> Public University, Estd 1853</div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#0070F0]" /> Melbourne, Victoria, Australia</div>
              <div className="flex items-center gap-2"><GraduationCap className="w-4 h-4 text-[#0070F0]" /> 50 Courses</div>
            </div>
            
            <button className="w-full h-11 bg-[#0070F0] text-white rounded-xl text-[14px] font-bold hover:bg-blue-600 transition mb-3 shadow-sm">Apply Now</button>
            <button className="w-full h-11 border rounded-xl text-[14px] font-bold text-[#344054] hover:bg-slate-50 transition mb-6 shadow-sm" style={{ borderColor: '#D0D5DD' }}>Talk to our Experts for Free</button>
            
            <div className="bg-[#F8FAFC] rounded-xl p-4 flex flex-col items-center justify-center border" style={{ borderColor: '#EAECF0' }}>
               <div className="flex -space-x-2 mb-2">
                 {[1,2,3,4].map(n => (
                   <img key={n} src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                 ))}
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">+</div>
               </div>
               <p className="text-[12px] text-[#475467]">+10k users applied here</p>
               <a href="#" className="text-[13px] text-[#0070F0] font-semibold mt-2 flex items-center gap-1 hover:underline">Visit University Website <ArrowRight className="w-3 h-3 rotate-[-45deg]"/></a>
            </div>

            <div className="flex items-center gap-4 mt-6 border-t pt-4" style={{ borderColor: '#EAECF0' }}>
              <button className="flex-1 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#475467] hover:text-[#0070F0]"><Bookmark className="w-4 h-4" /> Add to Bookmark</button>
              <button className="flex-1 flex items-center justify-center gap-2 text-[13px] font-semibold text-[#475467] hover:text-[#0070F0]"><Repeat className="w-4 h-4" /> Add to Compare</button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
