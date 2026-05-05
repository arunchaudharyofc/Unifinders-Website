import { Calendar, TrendingUp, TrendingDown } from "lucide-react";

export default function ReportsPage() {
  const activities = [1, 2, 3].map(id => ({
    id,
    dateBox: { month: "Jan", day: id === 1 ? "01" : id === 2 ? "15" : "25", year: "2024" },
    name: "Alfredo Carder",
    action: "Added an application",
    time: "10:23 am",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
  }));

  return (
    <div className="w-full">

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column - Stats */}
        <div className="flex-[2] min-w-0">
          
          {/* Top Bar */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-11 px-4 border border-[#D0D5DD] rounded-xl bg-white flex items-center gap-2 cursor-pointer shadow-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-[14px] font-medium text-[#344054]">Jan 2024</span>
              <span className="text-slate-400 text-xs ml-1">▼</span>
            </div>
            <span className="text-slate-400">—</span>
            <div className="h-11 px-4 border border-[#D0D5DD] rounded-xl bg-white flex items-center gap-2 cursor-pointer shadow-sm">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="text-[14px] font-medium text-[#344054]">Feb 2024</span>
              <span className="text-slate-400 text-xs ml-1">▼</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Stat Card 1 */}
            <div className="bg-white border border-[#EAECF0] rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <h3 className="text-[16px] font-bold text-[#101828] mb-4">Total Applications</h3>
              <div className="text-[40px] font-bold text-[#0B1A2D] leading-none mb-2">10</div>
              <div className="flex items-center gap-1 text-[#16A34A] text-[13px] font-bold">
                <TrendingUp className="w-4 h-4" /> 40%
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[60%] opacity-20">
                 {/* Decorative simple SVG curve for green sparkline */}
                 <svg viewBox="0 0 100 50" className="w-full h-full text-green-500 fill-none stroke-current" strokeWidth="3">
                   <path d="M0 40 Q 25 10, 50 30 T 100 10" />
                 </svg>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white border border-[#EAECF0] rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <h3 className="text-[16px] font-bold text-[#101828] mb-4">Appointment Rate</h3>
              <div className="text-[40px] font-bold text-[#0B1A2D] leading-none mb-2">1,200</div>
              <div className="flex items-center gap-1 text-[#DC2626] text-[13px] font-bold">
                <TrendingDown className="w-4 h-4" /> 10%
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[60%] opacity-20">
                 {/* Decorative simple SVG curve for red sparkline */}
                 <svg viewBox="0 0 100 50" className="w-full h-full text-red-500 fill-none stroke-current" strokeWidth="3">
                   <path d="M0 10 Q 25 40, 50 20 T 100 30" />
                 </svg>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white border border-[#EAECF0] rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <h3 className="text-[16px] font-bold text-[#101828] mb-4">Chat Time</h3>
              <div className="text-[40px] font-bold text-[#0B1A2D] leading-none mb-2">316 <span className="text-[16px] font-medium text-slate-500">min</span></div>
              <div className="flex items-center gap-1 text-[#16A34A] text-[13px] font-bold">
                <TrendingUp className="w-4 h-4" /> 40%
              </div>
              <div className="absolute bottom-0 right-0 w-[60%] h-[60%] opacity-20">
                 <svg viewBox="0 0 100 50" className="w-full h-full text-green-500 fill-none stroke-current" strokeWidth="3">
                   <path d="M0 40 Q 25 10, 50 30 T 100 10" />
                 </svg>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column - Recent Activities */}
        <div className="w-full lg:w-[400px] shrink-0">
          <h2 className="text-[18px] font-bold text-[#101828] mb-6">Recent Activities</h2>
          
          <div className="space-y-4">
            {activities.map(act => (
              <div key={act.id} className="bg-white border border-[#EAECF0] rounded-2xl p-4 flex gap-4 shadow-sm hover:shadow-md transition">
                {/* Date Box */}
                <div className="w-[60px] h-[72px] bg-[#0070F0] rounded-xl flex flex-col items-center justify-center text-white shrink-0 shadow-sm">
                  <span className="text-[12px] font-medium opacity-90">{act.dateBox.month}</span>
                  <span className="text-[20px] font-bold leading-none my-0.5">{act.dateBox.day}</span>
                  <span className="text-[11px] opacity-90">{act.dateBox.year}</span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <img src={act.avatar} className="w-6 h-6 rounded-full object-cover" />
                      <h4 className="text-[14px] font-bold text-[#101828]">{act.name}</h4>
                    </div>
                    <span className="text-[11px] text-slate-400 whitespace-nowrap">{act.time}</span>
                  </div>
                  <p className="text-[13px] text-[#475467]">{act.action}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
