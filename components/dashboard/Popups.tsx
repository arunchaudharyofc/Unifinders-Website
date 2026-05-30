"use client";
// Force cache invalidation


import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, X, ArrowRight, Settings, LayoutDashboard, Clock, FileText, Download, LogOut, Calendar } from "lucide-react";
import Link from "next/link";

// ── Shared Hook ──────────────────────────────────────────────────────────────
export function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// ── Dropdown Wrappers ────────────────────────────────────────────────────────

export function CountryGuideDropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)}>{children}</div>
      {open && (
        <div className="absolute top-full mt-2 left-0 w-[240px] bg-white rounded-xl shadow-lg border border-slate-100 p-2 z-50">
          <div className="flex flex-col py-2">
            <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-[14px] font-medium text-[#1E293B] w-full text-left transition-colors">
              <img src="https://flagcdn.com/w40/au.png" alt="Australia" className="w-5 h-5 rounded-full object-cover shadow-sm" /> Study in Australia
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-[14px] font-medium text-[#1E293B] w-full text-left transition-colors">
              <img src="https://flagcdn.com/w40/ca.png" alt="Canada" className="w-5 h-5 rounded-full object-cover shadow-sm" /> Study in Canada
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-[14px] font-medium text-[#1E293B] w-full text-left transition-colors">
              <img src="https://flagcdn.com/w40/us.png" alt="United States" className="w-5 h-5 rounded-full object-cover shadow-sm" /> Study in United States
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-[14px] font-medium text-[#1E293B] w-full text-left transition-colors">
              <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-5 h-5 rounded-full object-cover shadow-sm" /> Study in India
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-[14px] font-medium text-[#1E293B] w-full text-left transition-colors">
              <img src="https://flagcdn.com/w40/gb.png" alt="United Kingdom" className="w-5 h-5 rounded-full object-cover shadow-sm" /> Study in United Kingdom
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function NotificationDropdown({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)}>{children}</div>
      {open && (
        <div className="absolute top-full mt-2 right-0 w-[400px] bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Notifications</h3>
            <button className="text-sm text-slate-500 hover:text-[#0070F0]">Mark all as read</button>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {/* Notification Item */}
            <div className="p-4 py-5 border-b border-slate-100 hover:bg-slate-50 flex gap-4 transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0 relative mt-1">
                <span className="text-[#475467] font-semibold text-sm">PB</span>
                <div className="absolute top-0.5 right-0 w-3 h-3 bg-[#0070F0] rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-bold text-[#101828] mb-1.5">Phoenix Baker</h4>
                <p className="text-[13px] text-[#475467] leading-relaxed mb-4">Well done on uploading CV for UI Designer.pdf under Application section. Our Relationships team will review and validate this for you!</p>
                <div className="flex items-center justify-between">
                  <button className="text-[13px] font-medium text-[#0070F0] flex items-center gap-1.5 hover:underline">Go to Profile <ArrowRight className="w-3.5 h-3.5" /></button>
                  <span className="text-[12px] text-[#98A2B3]">23 Feb, 2024 • 07:25 pm</span>
                </div>
              </div>
            </div>
            
            {/* Notification Item */}
            <div className="p-4 py-5 border-b border-slate-100 hover:bg-slate-50 flex gap-4 transition-colors">
              <div className="w-11 h-11 rounded-full bg-[#F1F5F9] flex items-center justify-center shrink-0 relative mt-1">
                <span className="text-[#475467] font-semibold text-sm">EF</span>
                <div className="absolute top-0.5 right-0 w-3 h-3 bg-[#0070F0] rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h4 className="text-[15px] font-bold text-[#101828] mb-1.5">Emerson Franci</h4>
                <p className="text-[13px] text-[#475467] leading-relaxed mb-4">Well done on uploading CV for UI Designer.pdf under Application section. Our Relationships team will review and validate this for you!</p>
                <div className="flex items-center justify-between">
                  <button className="text-[13px] font-medium text-[#0070F0] flex items-center gap-1.5 hover:underline">Go to Profile <ArrowRight className="w-3.5 h-3.5" /></button>
                  <span className="text-[12px] text-[#98A2B3]">23 Feb, 2024 • 07:25 pm</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-slate-100 text-center bg-slate-50">
             <button className="text-sm font-medium text-slate-700 hover:text-[#0070F0] flex items-center justify-center gap-1 w-full">See All Notifications <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MyAccountDropdown({
  children,
  fullName,
  initials,
  email,
  userId,
}: {
  children: React.ReactNode;
  fullName?: string;
  initials?: string;
  email?: string;
  userId?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const displayName = fullName || "User";
  const displayInitials = initials || displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const shortId = userId ? userId.slice(0, 10).toUpperCase() : "—";

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)}>{children}</div>
      {open && (
        <div className="absolute top-full mt-2 right-0 w-[280px] bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
          <div className="p-4 flex items-center gap-3 border-b border-slate-100 bg-slate-50/60">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0070F0] to-[#0055CC] text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
              {displayInitials}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-sm truncate">{displayName}</h4>
              {email && <p className="text-[11px] text-slate-400 truncate mt-0.5">{email}</p>}
              <div className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mt-1 font-mono font-semibold inline-block border border-blue-100">ID: {shortId}</div>
            </div>
          </div>

          <div className="py-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-[#0B1A2D]">
              <LayoutDashboard className="w-5 h-5 text-slate-400" /> My Dashboard
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-[#0B1A2D]">
              <Settings className="w-5 h-5 text-slate-400" /> Account Settings
            </Link>
            <Link href="/dashboard/programs" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-[#0B1A2D]">
              <Clock className="w-5 h-5 text-slate-400" /> Search History
            </Link>
            <Link href="/dashboard/applications" className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-[#0B1A2D]">
              <FileText className="w-5 h-5 text-slate-400" /> Application Status
            </Link>
            <button className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 text-sm font-medium text-[#0B1A2D] w-full text-left border-b border-slate-100 pb-4">
              <Download className="w-5 h-5 text-slate-400" /> Download App
            </button>
            <div className="pt-2">
              <a href="/auth/logout" className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm font-medium text-red-600 w-full text-left">
                <LogOut className="w-5 h-5 text-red-500" /> Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Custom Search Dropdowns ─────────────────────────────────────────────────

export function CustomCountryDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  
  const options = [
    { id: 'all', label: 'All', icon: null },
    { id: 'au', label: 'Australia', icon: 'https://flagcdn.com/w40/au.png' },
    { id: 'ca', label: 'Canada', icon: 'https://flagcdn.com/w40/ca.png' },
    { id: 'us', label: 'United States', icon: 'https://flagcdn.com/w40/us.png' },
  ];

  const toggleSelection = (id: string) => {
    if (id === 'all') return setSelected([]);
    if (selected.includes(id)) setSelected(selected.filter(s => s !== id));
    else setSelected([...selected, id]);
  };

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block text-sm font-medium text-[#475467] mb-2 text-left">Destination Country</label>
      <div 
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl text-sm bg-white flex items-center justify-between cursor-pointer"
      >
        <span className={selected.length === 0 ? "text-slate-400" : "text-slate-900 font-medium"}>
          {selected.length === 0 ? "Select" : `${selected.length} Selected`}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-600" />
      </div>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-full min-w-[240px] bg-white rounded-xl shadow-xl border border-[#EAECF0] z-50 overflow-hidden flex flex-col">
          <div className="p-4 pb-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input type="text" className="w-full h-10 pl-9 pr-3 border border-[#0070F0] rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0070F0]" />
            </div>
          </div>
          
          <div className="max-h-[220px] overflow-y-auto p-2 pt-0">
            {options.map(opt => {
              const isSelected = selected.includes(opt.id) || (opt.id === 'all' && selected.length === 0);
              return (
                <div 
                  key={opt.id} 
                  onClick={() => toggleSelection(opt.id)}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#0070F0] border-[#0070F0]' : 'border-[#D0D5DD] bg-white'}`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                  {opt.icon && <img src={opt.icon} alt={opt.label} className="w-5 h-5 rounded-full object-cover shadow-sm shrink-0" />}
                  <span className="text-[14px] font-medium text-[#101828]">{opt.label}</span>
                </div>
              );
            })}
          </div>
          
          <div className="p-4 border-t border-[#EAECF0] flex items-center gap-3 bg-white">
             <button onClick={() => setSelected([])} className="flex-1 h-10 bg-[#F2F4F7] hover:bg-slate-200 rounded-lg text-[14px] font-semibold text-[#344054] transition">Reset All</button>
             <button onClick={() => setOpen(false)} className="flex-1 h-10 bg-[#0070F0] hover:bg-blue-600 rounded-lg text-[14px] font-semibold text-white transition shadow-sm">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function CustomIntakeDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));
  
  const options = [
    { id: 'apr', label: 'Apr 2024' },
    { id: 'may', label: 'May 2024' },
    { id: 'jun', label: 'Jun 2024' },
    { id: 'jul', label: 'Jul 2024' },
  ];

  const toggleSelection = (id: string) => {
    if (selected.includes(id)) setSelected(selected.filter(s => s !== id));
    else setSelected([...selected, id]);
  };

  return (
    <div className="w-full relative" ref={ref}>
      <label className="block text-sm font-medium text-[#475467] mb-2 text-left">Intakes</label>
      <div 
        onClick={() => setOpen(!open)}
        className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl text-sm bg-white flex items-center justify-between cursor-pointer"
      >
        <span className={selected.length === 0 ? "text-slate-400" : "text-slate-900 font-medium"}>
          {selected.length === 0 ? "Select" : `${selected.length} Selected`}
        </span>
        <ChevronDown className="w-4 h-4 text-slate-600" />
      </div>

      {open && (
        <div className="absolute top-full mt-2 left-0 w-full min-w-[240px] bg-white rounded-xl shadow-xl border border-[#EAECF0] z-50 overflow-hidden flex flex-col">
          <div className="p-4 pb-2 font-semibold text-[14px] text-[#101828]">
            Apr - Jul 2024
          </div>
          
          <div className="max-h-[220px] overflow-y-auto p-2 pt-0">
            {options.map(opt => {
              const isSelected = selected.includes(opt.id);
              return (
                <div 
                  key={opt.id} 
                  onClick={() => toggleSelection(opt.id)}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className={`w-5 h-5 rounded-[4px] border flex items-center justify-center shrink-0 ${isSelected ? 'bg-[#0070F0] border-[#0070F0]' : 'border-[#D0D5DD] bg-white'}`}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                  <span className="text-[14px] font-medium text-[#101828]">{opt.label}</span>
                </div>
              );
            })}
          </div>
          
          <div className="p-4 border-t border-[#EAECF0] flex items-center gap-3 bg-white">
             <button onClick={() => setSelected([])} className="flex-1 h-10 bg-[#F2F4F7] hover:bg-slate-200 rounded-lg text-[14px] font-semibold text-[#344054] transition">Reset All</button>
             <button onClick={() => setOpen(false)} className="flex-1 h-10 bg-[#0070F0] hover:bg-blue-600 rounded-lg text-[14px] font-semibold text-white transition shadow-sm">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Modals ──────────────────────────────────────────────────────────────────

export function AppointmentModal({ open, onClose }: { open: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [showCongrats, setShowCongrats] = useState(false);
  
  // Step 1 State
  const [mode, setMode] = useState<"virtual" | "physical">("virtual");
  
  // Step 2 State
  const [platform, setPlatform] = useState<"meet" | "zoom" | "whatsapp" | "email">("meet");
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "evening" | "night">("morning");
  const [timeSlot, setTimeSlot] = useState<string>("6:00 - 7:00 am");

  if (!open) return null;

  if (showCongrats) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-white w-full max-w-[480px] rounded-2xl shadow-2xl p-6 md:p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          
          <div className="flex justify-center mb-6 relative z-10">
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/clapping-hands-5645532-4706592.png" alt="Clapping Hands" className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-md" onError={(e) => { e.currentTarget.src = 'https://fonts.gstatic.com/s/e/notoemoji/latest/1f44f/512.gif' }} />
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#EF4444] tracking-tight mb-3">!! CONGRATULATION !!</h2>
          <p className="text-[#101828] font-medium text-[14px] md:text-[15px] mb-8">You have successfully booked appointment</p>
          
          <button onClick={() => { setShowCongrats(false); onClose(); }} className="w-full h-[52px] bg-[#0070F0] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition shadow-sm">
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-[540px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-[#EAECF0] flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0B1A2D]">Book an Appointment</h2>
            <p className="text-sm text-[#475467] mt-1">
              {step === 1 ? "Guidance a click away!" : "How would you like to book your appointment"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
          {step === 1 && (
            <div className="space-y-4">
              <div 
                onClick={() => setMode("virtual")} 
                className={`p-4 border-2 rounded-xl flex gap-4 cursor-pointer relative transition-all ${mode === "virtual" ? "border-[#0070F0]" : "border-[#EAECF0] hover:border-[#0070F0]/30"}`}
              >
                {mode === "virtual" && <div className="absolute top-4 right-4 w-5 h-5 bg-[#0070F0] rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                <div className="mt-1 flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0070F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                </div>
                <div className="pr-8">
                  <h4 className="font-bold text-[#0B1A2D] text-[16px] mb-1">Virtual</h4>
                  <p className="text-[14px] text-[#475467]">Platform of your choice, google meet, Zoom, WhatsApp or email</p>
                </div>
              </div>

              <div 
                onClick={() => setMode("physical")} 
                className={`p-4 border-2 rounded-xl flex gap-4 cursor-pointer relative transition-all ${mode === "physical" ? "border-[#0070F0]" : "border-[#EAECF0] hover:border-[#0070F0]/30"}`}
              >
                {mode === "physical" && <div className="absolute top-4 right-4 w-5 h-5 bg-[#0070F0] rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                <div className="mt-1 flex-shrink-0">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0070F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div className="pr-8">
                  <h4 className="font-bold text-[#0B1A2D] text-[16px] mb-1">Physical</h4>
                  <p className="text-[14px] text-[#475467]">Location of your convenience, at your selected date and time</p>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-6">
                
                {/* Platform Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button onClick={() => setPlatform("meet")} className={`h-12 border-2 rounded-xl flex items-center justify-center gap-2 font-semibold text-[14px] transition-all relative ${platform === "meet" ? "border-[#0070F0] text-[#0B1A2D]" : "border-[#EAECF0] text-[#101828] hover:bg-slate-50"}`}>
                    {platform === "meet" && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/512px-Google_Meet_icon_%282020%29.svg.png" className="w-5 h-5" alt="Meet" /> Google Meet
                  </button>
                  <button onClick={() => setPlatform("zoom")} className={`h-12 border-2 rounded-xl flex items-center justify-center gap-2 font-semibold text-[14px] transition-all relative ${platform === "zoom" ? "border-[#0070F0] text-[#0B1A2D]" : "border-[#EAECF0] text-[#101828] hover:bg-slate-50"}`}>
                    {platform === "zoom" && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpT-U5L31x354YfA6k21XgY46kP9rQ_9Z6hA&s" className="w-5 h-5" alt="Zoom" /> Zoom
                  </button>
                  <button onClick={() => setPlatform("whatsapp")} className={`h-12 border-2 rounded-xl flex items-center justify-center gap-2 font-semibold text-[14px] transition-all relative ${platform === "whatsapp" ? "border-[#0070F0] text-[#0B1A2D]" : "border-[#EAECF0] text-[#101828] hover:bg-slate-50"}`}>
                    {platform === "whatsapp" && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" className="w-5 h-5" alt="WhatsApp" /> WhatsApp
                  </button>
                  <button onClick={() => setPlatform("email")} className={`h-12 border-2 rounded-xl flex items-center justify-center gap-2 font-semibold text-[14px] transition-all relative ${platform === "email" ? "border-[#0070F0] text-[#0B1A2D]" : "border-[#EAECF0] text-[#101828] hover:bg-slate-50"}`}>
                    {platform === "email" && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png" className="w-5 h-5" alt="Email" /> Email
                  </button>
                </div>

                <div className="h-px w-full bg-[#EAECF0] my-2"></div>

                {/* Time of Day Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button onClick={() => setTimeOfDay("morning")} className={`h-16 sm:h-[88px] border-2 rounded-xl flex sm:flex-col items-center justify-center gap-2 sm:gap-1.5 transition-all relative ${timeOfDay === "morning" ? "border-[#0070F0]" : "border-[#EAECF0] hover:bg-slate-50"}`}>
                    {timeOfDay === "morning" && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0070F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path><path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"></path></svg>
                    <span className="font-semibold text-[#101828] text-[15px]">Morning</span>
                  </button>
                  <button onClick={() => setTimeOfDay("evening")} className={`h-16 sm:h-[88px] border-2 rounded-xl flex sm:flex-col items-center justify-center gap-2 sm:gap-1.5 transition-all relative ${timeOfDay === "evening" ? "border-[#0070F0]" : "border-[#EAECF0] hover:bg-slate-50"}`}>
                    {timeOfDay === "evening" && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0070F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>
                    <span className="font-semibold text-[#101828] text-[15px]">Evening</span>
                  </button>
                  <button onClick={() => setTimeOfDay("night")} className={`h-16 sm:h-[88px] border-2 rounded-xl flex sm:flex-col items-center justify-center gap-2 sm:gap-1.5 transition-all relative ${timeOfDay === "night" ? "border-[#0070F0]" : "border-[#EAECF0] hover:bg-slate-50"}`}>
                    {timeOfDay === "night" && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0070F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
                    <span className="font-semibold text-[#101828] text-[15px]">Night</span>
                  </button>
                </div>

                {/* Specific Time Slots */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["6:00 - 7:00 am", "7:00 - 8:00 am", "8:00 - 9:00 am", "9:00 - 10:00 am", "10:00 - 11:00 am", "11:00 - 12:00 pm"].map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setTimeSlot(slot)} 
                      className={`h-11 border-2 rounded-xl text-[13px] font-semibold transition-all relative flex items-center justify-center ${timeSlot === slot ? "border-[#0070F0] text-[#0B1A2D]" : "border-[#EAECF0] text-[#344054] hover:bg-slate-50"}`}
                    >
                      {timeSlot === slot && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#0070F0] text-white rounded-full flex items-center justify-center"><Check className="w-3 h-3" /></div>}
                      {slot}
                    </button>
                  ))}
                </div>

             </div>
          )}
        </div>
        
        <div className="p-6 pt-2 flex items-center gap-4 bg-white rounded-b-2xl border-t border-[#EAECF0]">
          <button onClick={onClose} className="flex-1 h-[48px] bg-[#F1F5F9] rounded-xl text-[15px] font-bold text-[#0B1A2D] hover:bg-slate-200 transition">Cancel</button>
          <button 
            onClick={() => { if(step === 1) setStep(2); else setShowCongrats(true); }} 
            className="flex-1 h-[48px] bg-[#0070F0] text-white rounded-xl text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition shadow-sm"
          >
            {step === 1 ? 'Next' : 'Book an Appointment'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
