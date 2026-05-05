import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Search, ChevronDown, MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const events = [
    { id: 1, title: "Inflammation & Immune Regulation", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop" },
    { id: 2, title: "iPSC models", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop" },
    { id: 3, title: "Anatomical Tracing of Circuit Con...", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop" },
    { id: 4, title: "Aging & Progression", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=600&auto=format&fit=crop" },
    { id: 5, title: "GWAS Functional Validation", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=600&auto=format&fit=crop" },
    { id: 6, title: "Anatomical Tracing of Circuit Con...", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop" },
    { id: 7, title: "ASAP Collaborative Meeting", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=600&auto=format&fit=crop" },
    { id: 8, title: "Mitochondrial Pathways", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=600&auto=format&fit=crop" },
    { id: 9, title: "GWAS Functional Validation", date: "15 Dec", time: "12:00am to 3:00pm", location: "Harmony Seminar Hall", image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <div className="w-full">
      
      {/* Top Filter Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl border w-[280px]" style={{ borderColor: '#EAECF0' }}>
          <button className="flex-1 py-2 bg-white rounded-lg shadow-sm text-[14px] font-semibold text-[#101828]">Upcoming</button>
          <button className="flex-1 py-2 rounded-lg text-[14px] font-medium text-[#475467] hover:text-[#101828] transition">Past</button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-[300px]">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input type="text" placeholder="Search for events" className="w-full h-10 pl-9 pr-4 border rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" style={{ borderColor: '#D0D5DD' }} />
          </div>
          <div className="h-10 px-4 border rounded-xl flex items-center justify-between bg-white cursor-pointer w-[140px]" style={{ borderColor: '#D0D5DD' }}>
            <span className="text-[14px] text-[#344054] font-medium flex items-center gap-2">Sort by</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {events.map((ev, index) => (
          <div key={index} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col" style={{ borderColor: '#EAECF0' }}>
            
            <div className="h-[200px] relative shrink-0">
              <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-4 left-4 bg-[#0070F0] text-white rounded-xl w-14 h-16 flex flex-col items-center justify-center shadow-md border-2 border-white/20">
                <span className="text-[20px] font-bold leading-none mb-1">{ev.date.split(' ')[0]}</span>
                <span className="text-[12px] font-medium opacity-90">{ev.date.split(' ')[1]}</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-[16px] font-bold text-[#101828] mb-1 truncate">{ev.title}</h3>
              <p className="text-[13px] text-slate-500 mb-6 truncate">Our app connects to all the most popular univ...</p>
              
              <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 mb-6 mt-auto">
                <Clock className="w-4 h-4 text-[#0070F0]" />
                <div className="flex flex-col text-[13px]">
                  <span className="text-slate-500">Time</span>
                  <span className="font-semibold text-[#101828]">{ev.time}</span>
                </div>
                
                <MapPin className="w-4 h-4 text-[#0070F0]" />
                <div className="flex flex-col text-[13px]">
                  <span className="text-slate-500">Location</span>
                  <span className="font-semibold text-[#101828]">{ev.location}</span>
                </div>
              </div>

              <Link href={`/dashboard/events/${ev.id}`} className="text-[#344054] text-[14px] font-semibold flex items-center gap-2 hover:text-[#0070F0] transition pt-4 border-t" style={{ borderColor: '#EAECF0' }}>
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-4 flex items-center justify-between border-t" style={{ borderColor: '#EAECF0' }}>
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
