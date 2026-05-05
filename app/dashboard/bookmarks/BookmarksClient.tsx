"use client";
import { useState } from "react";
import { Search, ChevronDown, Bookmark, Building, Calendar, DollarSign, FileText, GraduationCap, ArrowRight, LayoutGrid, List, Repeat, MapPin, Clock } from "lucide-react";

export default function BookmarksClient() {
  const [activeTab, setActiveTab] = useState("Courses");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const courses = [1, 2, 3].map(id => ({
    id,
    title: "Master of Technology Entrepreneurship & Innovation (MTEI)",
    institute: "University of Melbourne",
    duration: "24 Months",
    fee: "$10.5K (AUD)",
    exam: "IELTS(6.50)",
    level: "Post Graduate",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    rank: 25
  }));

  const universities = [1, 2, 3].map(id => ({
    id,
    title: "University of Melbourne",
    type: "Public",
    location: "Australia, Melbourne",
    established: "1924",
    courses: "45",
    intakes: ["Jan", "May", "Sept"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    rank: 25
  }));

  const scholarships = [1, 2, 3].map(id => ({
    id,
    title: "American University Emerging Global Leader Scholarship",
    institute: "University of Melbourne",
    level: "Masters/Certificate",
    studyIn: "Australia, USA, Canada, UK",
    courseStarts: "September 2024",
    deadline: "15 May, 2024 (Annual)",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
  }));

  return (
    <div className="w-full">
      <h1 className="text-[24px] font-bold text-[#101828] mb-6">My Bookmarks</h1>

      {/* Top Controls */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, ID, or any related keywords" 
            className="w-full h-11 pl-11 pr-4 bg-white border rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0] shadow-sm" 
            style={{ borderColor: '#EAECF0' }} 
          />
        </div>
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl border" style={{ borderColor: '#EAECF0' }}>
          <button 
            onClick={() => setViewMode("grid")}
            className={`w-10 flex items-center justify-center rounded-lg transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#101828]' : 'text-slate-400'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`w-10 flex items-center justify-center rounded-lg transition ${viewMode === 'list' ? 'bg-white shadow-sm text-[#101828]' : 'text-slate-400'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        <div className="h-11 px-4 bg-white border rounded-xl flex items-center justify-between cursor-pointer w-[140px] shadow-sm" style={{ borderColor: '#EAECF0' }}>
          <div className="flex items-center gap-2 text-[14px] text-[#344054] font-medium">
            <span className="text-slate-400 rotate-90">⇄</span> Sort by
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b mb-8" style={{ borderColor: '#EAECF0' }}>
        {["Courses", "Universities", "Scholarships"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 text-[14px] font-semibold border-b-2 transition ${
              activeTab === tab 
                ? 'border-[#0070F0] text-[#0070F0]' 
                : 'border-transparent text-[#475467] hover:text-[#101828]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 lg:grid-cols-3 gap-6" : "space-y-4"}>
        
        {/* COURSES TAB */}
        {activeTab === "Courses" && courses.map((item, idx) => (
          <div key={idx} className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex ${viewMode === "grid" ? "flex-col" : "flex-row"}`} style={{ borderColor: '#EAECF0' }}>
            {/* Header Image */}
            <div className={`${viewMode === "grid" ? "h-[180px] w-full" : "w-[240px] shrink-0"} relative`}>
              <img src={item.image} className="w-full h-full object-cover" />
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0070F0]">
                <Bookmark className="w-4 h-4" fill="currentColor" />
              </button>
              <div className="absolute -bottom-8 left-6 w-[100px] h-16 bg-[#0B1A2D] rounded-xl flex items-center justify-center p-2 shadow-sm border-2 border-white z-10">
                <img src={item.logo} className="max-h-full max-w-full object-contain filter invert opacity-90" />
              </div>
              <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow-sm text-[12px] font-bold text-[#101828]">
                Rank: <span className="text-[#0070F0]">{item.rank}</span>
              </div>
            </div>

            {/* Details */}
            <div className={`p-6 ${viewMode === "grid" ? "pt-12" : "flex-1 pt-6"}`}>
              <h3 className="text-[16px] font-bold text-[#101828] mb-6 leading-tight">{item.title}</h3>
              
              <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-3 mb-6">
                <Building className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Institute</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{item.institute}</span>
                
                <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Duration</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{item.duration}</span>
                
                <DollarSign className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">1st year Tuition Fee</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{item.fee}</span>

                <FileText className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Exam</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{item.exam}</span>

                <GraduationCap className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Level of Study</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{item.level}</span>
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="flex-[0.6] h-11 border rounded-xl text-[14px] font-bold text-[#344054] hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2" style={{ borderColor: '#D0D5DD' }}>
                  <Repeat className="w-4 h-4" /> Compare
                </button>
                <button className="flex-1 h-11 bg-[#0070F0] text-white rounded-xl text-[14px] font-bold hover:bg-blue-600 transition shadow-sm">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* UNIVERSITIES TAB */}
        {activeTab === "Universities" && universities.map((uni, idx) => (
          <div key={idx} className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex ${viewMode === "grid" ? "flex-col" : "flex-row"}`} style={{ borderColor: '#EAECF0' }}>
            <div className={`${viewMode === "grid" ? "h-[180px] w-full" : "w-[240px] shrink-0"} relative`}>
              <img src={uni.image} className="w-full h-full object-cover" />
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0070F0]">
                <Bookmark className="w-4 h-4" fill="currentColor" />
              </button>
              <div className="absolute -bottom-8 left-6 w-[100px] h-16 bg-[#0B1A2D] rounded-xl flex items-center justify-center p-2 shadow-sm border-2 border-white z-10">
                <img src={uni.logo} className="max-h-full max-w-full object-contain filter invert opacity-90" />
              </div>
              <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded shadow-sm text-[12px] font-bold text-[#101828]">
                Rank: <span className="text-[#0070F0]">{uni.rank}</span>
              </div>
            </div>

            <div className={`p-6 ${viewMode === "grid" ? "pt-12" : "flex-1 pt-6"}`}>
              <h3 className="text-[18px] font-bold text-[#101828] mb-6">{uni.title}</h3>
              
              <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-3 mb-6">
                <Building className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Institute Type</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{uni.type}</span>
                
                <MapPin className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Location</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{uni.location}</span>
                
                <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Establishment</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{uni.established}</span>

                <GraduationCap className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Courses</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{uni.courses}</span>

                <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Intakes</span>
                <div className="flex gap-1 justify-end">
                  {uni.intakes.map(intake => (
                    <span key={intake} className="px-2 py-0.5 bg-[#0070F0] text-white rounded-full text-[11px] font-medium">{intake}</span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="flex-[0.6] h-11 border rounded-xl text-[14px] font-bold text-[#344054] hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2" style={{ borderColor: '#D0D5DD' }}>
                  <Repeat className="w-4 h-4" /> Compare
                </button>
                <button className="flex-1 h-11 bg-[#0070F0] text-white rounded-xl text-[14px] font-bold hover:bg-blue-600 transition shadow-sm">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* SCHOLARSHIPS TAB */}
        {activeTab === "Scholarships" && scholarships.map((sch, idx) => (
          <div key={idx} className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex ${viewMode === "grid" ? "flex-col" : "flex-row"}`} style={{ borderColor: '#EAECF0' }}>
            <div className={`${viewMode === "grid" ? "h-[180px] w-full" : "w-[240px] shrink-0"} relative bg-[#0B1A2D] flex items-center justify-center`}>
              <img src={sch.logo} className="w-[120px] filter invert opacity-90" />
              <button className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-[#0070F0]">
                <Bookmark className="w-4 h-4" fill="currentColor" />
              </button>
            </div>

            <div className={`p-6 ${viewMode === "grid" ? "pt-6" : "flex-1 pt-6"}`}>
              <h3 className="text-[16px] font-bold text-[#101828] mb-6 leading-tight">{sch.title}</h3>
              
              <div className="grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-3 mb-6">
                <Building className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Institute</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right max-w-[120px]">{sch.institute}</span>
                
                <GraduationCap className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Level of Study</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{sch.level}</span>
                
                <MapPin className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Study in</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right max-w-[120px]">{sch.studyIn}</span>

                <Calendar className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Course Starts</span>
                <span className="font-semibold text-[#101828] text-[13px] text-right">{sch.courseStarts}</span>

                <Clock className="w-4 h-4 text-[#0070F0] mt-0.5" />
                <span className="text-slate-500 text-[13px]">Deadline</span>
                <div className="flex justify-end">
                  <span className="px-3 py-1 bg-[#0070F0] text-white rounded-full text-[12px] font-semibold">{sch.deadline}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <button className="flex-[0.6] h-11 border rounded-xl text-[14px] font-bold text-[#344054] hover:bg-slate-50 transition shadow-sm flex items-center justify-center gap-2" style={{ borderColor: '#D0D5DD' }}>
                  <Repeat className="w-4 h-4" /> Compare
                </button>
                <button className="flex-1 h-11 bg-[#0070F0] text-white rounded-xl text-[14px] font-bold hover:bg-blue-600 transition shadow-sm">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Pagination */}
      <div className="mt-8 p-4 flex items-center justify-between border-t bg-white/50 rounded-xl" style={{ borderColor: '#EAECF0' }}>
        <div className="text-[14px] text-[#344054] flex items-center gap-2">
          Displaying results: 
          <select className="border rounded-lg px-2 py-1.5 text-[13px] bg-white outline-none focus:border-[#0070F0]" style={{ borderColor: '#D0D5DD' }}>
            <option>10</option>
          </select>
          of 156 entries
        </div>
        <div className="flex items-center gap-1">
          <button className="px-3 py-2 border rounded-lg text-[13px] font-medium text-[#344054] bg-white hover:bg-slate-50 flex items-center gap-1 shadow-sm transition" style={{ borderColor: '#D0D5DD' }}><ArrowRight className="w-4 h-4 rotate-180"/> Previous</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#344054] hover:bg-slate-50 transition">1</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-white bg-[#0070F0] shadow-sm">2</button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#344054] hover:bg-slate-50 transition">3</button>
          <span className="text-slate-400 px-1">...</span>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#344054] hover:bg-slate-50 transition">20</button>
          <button className="px-3 py-2 border rounded-lg text-[13px] font-medium text-[#344054] bg-white hover:bg-slate-50 flex items-center gap-1 shadow-sm transition" style={{ borderColor: '#D0D5DD' }}>Next <ArrowRight className="w-4 h-4"/></button>
        </div>
      </div>

    </div>
  );
}
