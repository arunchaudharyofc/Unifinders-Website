import { Search, MoreVertical, Paperclip, Send, Check } from "lucide-react";

export default function ChatsPage() {
  const contacts = [
    { name: "Alfredo Carder", role: "Sr. Counselor - Australia", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&fit=crop", online: true, active: true, badge: true, initial: null },
    { name: "Madelyn Aminoff", role: "Sr. Counselor - Australia", avatar: null, online: false, active: false, badge: false, initial: "MA" },
    { name: "Erin Botosh", role: "Sr. Counselor - Australia", avatar: null, online: false, active: false, badge: false, initial: "EB" },
  ];

  return (
    <div className="w-full flex flex-col" style={{ height: 'calc(100vh - 160px)' }}>
      <h1 className="text-[24px] font-bold text-[#101828] mb-6 shrink-0">My Chats</h1>

      <div className="flex flex-1 bg-white border border-[#EAECF0] rounded-2xl shadow-sm overflow-hidden min-h-0">
        
        {/* Left Sidebar */}
        <div className="w-[320px] border-r border-[#EAECF0] flex flex-col shrink-0">
          <div className="p-4 border-b border-[#EAECF0]">
            <h2 className="text-[18px] font-bold text-[#101828] mb-4">Messages</h2>
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input type="text" placeholder="Search" className="w-full h-10 pl-9 pr-4 border border-[#D0D5DD] rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" />
            </div>
            <div className="flex bg-[#F1F5F9] p-1 rounded-xl">
              <button className="flex-1 py-1.5 bg-white shadow-sm rounded-lg text-[13px] font-semibold text-[#101828] flex items-center justify-center gap-2">
                Pinned <span className="bg-[#0070F0] text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">3</span>
              </button>
              <button className="flex-1 py-1.5 rounded-lg text-[13px] font-medium text-[#475467] flex items-center justify-center gap-2">
                Others <span className="bg-[#0070F0] text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">5</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {contacts.map((c, i) => (
              <div key={i} className={`p-4 border-b border-[#EAECF0] cursor-pointer flex gap-3 ${c.active ? 'border-l-4 border-l-[#0070F0] bg-slate-50' : 'hover:bg-slate-50'}`}>
                <div className="relative shrink-0 mt-1">
                  {c.avatar ? (
                    <img src={c.avatar} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#0070F0] flex items-center justify-center text-white font-bold text-sm">{c.initial}</div>
                  )}
                  {c.badge && <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#0070F0] border-2 border-white rounded-full flex items-center justify-center"><Check className="w-2 h-2 text-white" strokeWidth={3}/></div>}
                  {c.online && !c.badge && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                  {!c.online && !c.badge && <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-white rounded-full"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-0.5">
                    <h4 className="text-[14px] font-bold text-[#101828] flex items-center gap-1 truncate">
                      {c.name} {c.badge && <Check className="w-3.5 h-3.5 text-[#0070F0]" strokeWidth={3}/>}
                    </h4>
                    <span className="text-[11px] text-slate-400 shrink-0">5min ago</span>
                  </div>
                  <p className="text-[12px] text-slate-500 mb-1">{c.role}</p>
                  <p className="text-[12px] text-[#475467] truncate">Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
          
          {/* Chat Header */}
          <div className="h-[72px] px-6 border-b border-[#EAECF0] bg-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={contacts[0].avatar!} className="w-10 h-10 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#0070F0] border-2 border-white rounded-full flex items-center justify-center"><Check className="w-2 h-2 text-white" strokeWidth={3}/></div>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#101828] flex items-center gap-2">
                  {contacts[0].name} <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[11px] font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</span>
                </h3>
                <p className="text-[13px] text-slate-500">{contacts[0].role}</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Incoming Message */}
            <div className="flex gap-3 max-w-[80%]">
              <img src={contacts[0].avatar!} className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
              <div>
                <div className="bg-white border border-[#EAECF0] rounded-2xl rounded-tl-sm p-4 text-[14px] text-[#475467] shadow-sm">
                  Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 ml-1">10:16am</div>
              </div>
            </div>

            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 border-t border-[#EAECF0]"></div>
              <span className="text-[12px] font-medium text-slate-400">Thursday</span>
              <div className="flex-1 border-t border-[#EAECF0]"></div>
            </div>

            {/* Incoming Message */}
            <div className="flex gap-3 max-w-[80%]">
              <img src={contacts[0].avatar!} className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
              <div>
                <div className="bg-white border border-[#EAECF0] rounded-2xl rounded-tl-sm p-4 text-[14px] text-[#475467] shadow-sm">
                  Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 ml-1">10:16am</div>
              </div>
            </div>

            {/* Incoming Message */}
            <div className="flex gap-3 max-w-[80%]">
              <img src={contacts[0].avatar!} className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
              <div>
                <div className="bg-white border border-[#EAECF0] rounded-2xl rounded-tl-sm p-4 text-[14px] text-[#475467] shadow-sm">
                  Hey Olivia, I've finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 ml-1">10:16am</div>
              </div>
            </div>

            {/* Outgoing Message */}
            <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
              <div>
                <div className="bg-[#0070F0] text-white rounded-2xl rounded-tr-sm p-4 text-[14px] shadow-sm">
                  Thanks Olivia! Almost there. I'll work on making those changes you suggested and will shoot it over.
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 mr-1 flex items-center justify-end gap-1">
                  10:16am <Check className="w-3.5 h-3.5 text-[#0070F0]" strokeWidth={3} />
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&fit=crop" className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
            </div>

            {/* Incoming File */}
            <div className="flex gap-3 max-w-[80%]">
              <img src={contacts[0].avatar!} className="w-8 h-8 rounded-full object-cover shrink-0 mt-1" />
              <div>
                <div className="bg-[#F1F5F9] border border-[#EAECF0] rounded-2xl rounded-tl-sm p-4 flex items-center gap-4 shadow-sm w-[240px]">
                   <div className="w-10 h-10 bg-white rounded flex items-center justify-center text-red-500 font-bold text-xs shadow-sm border border-slate-100">PDF</div>
                   <div>
                     <h5 className="text-[13px] font-bold text-[#101828] mb-0.5">Tech requirements.pdf</h5>
                     <p className="text-[11px] text-slate-500">1.2 MB</p>
                   </div>
                </div>
              </div>
            </div>

          </div>

          {/* Chat Input */}
          <div className="h-[80px] bg-white border-t border-[#EAECF0] flex items-center px-6 gap-4 shrink-0">
            <button className="text-slate-400 hover:text-slate-600"><span className="text-2xl">☺</span></button>
            <button className="text-slate-400 hover:text-slate-600"><Paperclip className="w-5 h-5" /></button>
            <input type="text" placeholder="Type a message" className="flex-1 h-10 text-[14px] focus:outline-none placeholder-slate-400" />
            <button className="h-10 px-6 bg-[#0070F0] text-white rounded-xl text-[14px] font-bold flex items-center gap-2 hover:bg-blue-600 transition shadow-sm">
              Send <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
