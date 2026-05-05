import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Search, ChevronDown, Bookmark, MapPin, Building, GraduationCap, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function FindUniversityPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const universities = [
    {
      id: "canberra",
      name: "University of Canberra",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/University_of_Melbourne_shield.svg/1200px-University_of_Melbourne_shield.svg.png",
      rank: 25,
      type: "Public",
      location: "Australia, Melbourne",
      established: "1924",
      courses: "45",
      intakes: ["Jan", "May", "Sept"]
    },
    {
      id: "melbourne",
      name: "University of Melbourne",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/University_of_Melbourne_shield.svg/1200px-University_of_Melbourne_shield.svg.png",
      rank: 11,
      type: "Public",
      location: "Australia, Melbourne",
      established: "1853",
      courses: "50",
      intakes: ["Jan", "May", "Sept"]
    },
    {
      id: "sydney",
      name: "University of Sydney",
      image: "https://images.unsplash.com/photo-1525926472898-acbfcb5064db?q=80&w=600&auto=format&fit=crop",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/University_of_Melbourne_shield.svg/1200px-University_of_Melbourne_shield.svg.png",
      rank: 33,
      type: "Public",
      location: "Australia, Sydney",
      established: "1850",
      courses: "65",
      intakes: ["Jan", "May", "Sept"]
    }
  ];

  return (
    <div className="w-full">
      
      {/* Hero Banner Area */}
      <div className="bg-white rounded-2xl p-10 text-center border shadow-sm mb-12" style={{ borderColor: '#EAECF0' }}>
        <h1 className="text-[28px] font-bold text-[#101828] mb-2">Find your Dream <span className="text-[#0070F0]">University & Courses</span></h1>
        <p className="text-[14px] text-[#475467] mb-8">Know about different courses and programs according to your preferences</p>
        
        <div className="flex items-end gap-4 max-w-4xl mx-auto text-left">
          <div className="flex-1">
            <label className="block text-[13px] font-medium text-[#475467] mb-2">Search Programs</label>
            <input type="text" placeholder="Search programs" className="w-full h-11 px-4 border rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" style={{ borderColor: '#D0D5DD' }} />
          </div>
          <div className="w-[200px]">
            <label className="block text-[13px] font-medium text-[#475467] mb-2">Destination Country</label>
            <div className="h-11 px-4 border rounded-xl flex items-center justify-between bg-white cursor-pointer" style={{ borderColor: '#D0D5DD' }}>
              <span className="text-[14px] text-[#98A2B3]">Select</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
          <div className="w-[200px]">
            <label className="block text-[13px] font-medium text-[#475467] mb-2">Intakes</label>
            <div className="h-11 px-4 border rounded-xl flex items-center justify-between bg-white cursor-pointer" style={{ borderColor: '#D0D5DD' }}>
              <span className="text-[14px] text-[#98A2B3]">Select</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>
          </div>
          <button className="h-11 px-6 bg-[#0070F0] text-white rounded-xl text-[14px] font-medium flex items-center gap-2 hover:bg-blue-600 transition shadow-sm shrink-0">
            <Search className="w-4 h-4" /> Search
          </button>
        </div>
      </div>

      {/* Recommended Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-bold text-[#101828]">Recommended Universities</h2>
        <button className="text-[14px] font-semibold text-[#344054] flex items-center gap-1 hover:text-[#0070F0]">View all <ArrowRight className="w-4 h-4"/></button>
      </div>
      <p className="text-[14px] text-[#475467] mb-8 max-w-3xl">According to the form you filled, these Universities are recommended for you based on stream, Educational level, and Entry requirements from university itself.</p>

      {/* University Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((uni, index) => (
          <div key={index} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col" style={{ borderColor: '#EAECF0' }}>
            
            {/* Header Image */}
            <div className="h-[180px] relative shrink-0">
              <img src={uni.image} alt={uni.name} className="w-full h-full object-cover" />
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-400 hover:text-slate-600">
                <Bookmark className="w-4 h-4" />
              </button>
              <div className="absolute -bottom-8 left-6 w-[100px] h-16 bg-[#0B1A2D] rounded-xl flex items-center justify-center p-2 shadow-sm border-2 border-white">
                <img src={uni.logo} className="max-h-full max-w-full object-contain filter invert opacity-90" />
              </div>
              <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow-sm text-[12px] font-bold text-[#101828]">
                Rank: <span className="text-[#0070F0]">{uni.rank}</span>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 pt-12 flex-1 flex flex-col">
              <h3 className="text-[18px] font-bold text-[#101828] mb-6">{uni.name}</h3>
              
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-4 mb-6">
                <Building className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <div className="flex flex-col text-[13px]">
                  <span className="text-slate-500">Institute Type</span>
                  <span className="font-semibold text-[#101828]">{uni.type}</span>
                </div>
                
                <MapPin className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <div className="flex flex-col text-[13px]">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-[#101828]">{uni.location}</span>
                </div>
                
                <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <div className="flex flex-col text-[13px]">
                  <span className="text-slate-500">Establishment</span>
                  <span className="font-semibold text-[#101828]">{uni.established}</span>
                </div>

                <GraduationCap className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <div className="flex flex-col text-[13px]">
                  <span className="text-slate-500">Courses</span>
                  <span className="font-semibold text-[#101828]">{uni.courses}</span>
                </div>

                <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <div className="flex flex-col text-[13px]">
                  <span className="text-slate-500 mb-1">Intakes</span>
                  <div className="flex gap-2">
                    {uni.intakes.map(intake => (
                      <span key={intake} className="px-2 py-0.5 bg-[#0070F0] text-white rounded-full text-[11px] font-medium">{intake}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t" style={{ borderColor: '#EAECF0' }}>
                <Link href={`/dashboard/universities/${uni.id}`} className="text-[#344054] text-[14px] font-semibold flex items-center gap-2 hover:text-[#0070F0] transition">
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
