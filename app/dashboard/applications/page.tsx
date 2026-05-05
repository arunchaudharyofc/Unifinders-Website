import { Search, ChevronDown, Plus, ArrowRight } from "lucide-react";

export default function ApplicationsPage() {
  const applications = [1, 2, 3, 4, 5].map((id) => ({
    id,
    appId: "A00125",
    uni: "University of Melbourne",
    course: "Master of Applied Information Texhnology",
    country: "United States",
    date: "21 Jan, 2024",
    status: "New"
  }));

  return (
    <div className="w-full">

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="text-[14px] font-medium text-[#344054] mb-2 block">Status</label>
          <div className="h-11 border border-[#D0D5DD] bg-white rounded-xl px-4 flex items-center justify-between cursor-pointer shadow-sm">
            <span className="text-[#101828] text-[14px]">All</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-[14px] font-medium text-[#344054] mb-2 block">Country</label>
          <div className="h-11 border border-[#D0D5DD] bg-white rounded-xl px-4 flex items-center justify-between cursor-pointer shadow-sm">
            <span className="text-[#101828] text-[14px]">All</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
        <div className="flex-[1.5]">
          <label className="text-[14px] font-medium text-[#344054] mb-2 block">Intake</label>
          <div className="h-11 border border-[#D0D5DD] bg-white rounded-xl px-4 flex items-center justify-between cursor-pointer shadow-sm">
            <span className="text-[#101828] text-[14px]">Feb 2024, May 2024, +1 More</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
        <div className="flex items-end">
          <button className="h-11 px-6 bg-[#0070F0] text-white rounded-xl text-[14px] font-bold flex items-center gap-2 hover:bg-blue-600 transition shadow-sm">
            <Plus className="w-4 h-4" /> Add new application
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-[#EAECF0] rounded-2xl shadow-sm overflow-hidden">
        
        {/* Search */}
        <div className="p-4 border-b border-[#EAECF0]">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search application by name, ID, or any related keywords" 
              className="w-full h-10 pl-9 pr-4 border border-[#EAECF0] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" 
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EAECF0] bg-slate-50">
                <th className="p-4 w-12"><input type="checkbox" className="w-4 h-4 rounded border-slate-300" /></th>
                <th className="p-4 text-[13px] font-medium text-[#475467] border-l border-[#EAECF0]">Application ID ↕</th>
                <th className="p-4 text-[13px] font-medium text-[#475467] border-l border-[#EAECF0]">University ↕</th>
                <th className="p-4 text-[13px] font-medium text-[#475467] border-l border-[#EAECF0]">Course Name ↕</th>
                <th className="p-4 text-[13px] font-medium text-[#475467] border-l border-[#EAECF0]">Country ↕</th>
                <th className="p-4 text-[13px] font-medium text-[#475467] border-l border-[#EAECF0]">Date ↕</th>
                <th className="p-4 text-[13px] font-medium text-[#475467] border-l border-[#EAECF0]">Offer Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => (
                <tr key={i} className="border-b border-[#EAECF0] hover:bg-slate-50 transition">
                  <td className="p-4"><input type="checkbox" className="w-4 h-4 rounded border-slate-300" /></td>
                  <td className="p-4"><span className="text-[#0070F0] text-[14px] font-medium underline cursor-pointer">{app.appId}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0B1A2D] rounded flex items-center justify-center p-1 shrink-0">
                        <span className="text-white text-[8px] font-bold leading-tight text-center">THE UNIVERSITY OF MELBOURNE</span>
                      </div>
                      <span className="text-[14px] font-medium text-[#101828]">{app.uni}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[14px] text-[#475467] max-w-[200px] truncate">{app.course}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-[14px] text-[#101828] font-medium">
                      <img src="https://flagcdn.com/w20/us.png" className="w-5 h-5 rounded-full object-cover" /> {app.country}
                    </div>
                  </td>
                  <td className="p-4 text-[14px] text-[#475467]">{app.date}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[12px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]"></span> {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-[#EAECF0]">
          <div className="text-[14px] text-[#344054] flex items-center gap-2">
            Displaying results: 
            <select className="border border-[#D0D5DD] rounded-lg px-2 py-1 text-[13px] bg-white outline-none">
              <option>10</option>
            </select>
            of 156 entries
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-[13px] font-medium text-[#344054] bg-white hover:bg-slate-50 flex items-center gap-1 shadow-sm transition"><ArrowRight className="w-4 h-4 rotate-180"/> Previous</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#344054] hover:bg-slate-50 transition">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-white bg-[#0070F0] shadow-sm">2</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#344054] hover:bg-slate-50 transition">3</button>
            <span className="text-slate-400 px-1">...</span>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg text-[13px] font-medium text-[#344054] hover:bg-slate-50 transition">20</button>
            <button className="px-3 py-2 border border-[#D0D5DD] rounded-lg text-[13px] font-medium text-[#344054] bg-white hover:bg-slate-50 flex items-center gap-1 shadow-sm transition">Next <ArrowRight className="w-4 h-4"/></button>
          </div>
        </div>

      </div>

    </div>
  );
}
