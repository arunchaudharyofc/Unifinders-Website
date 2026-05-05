import { Search, ChevronDown, Check } from "lucide-react";

export default function CountryGuideAccommodationsPage() {
  const accommodations = [1, 2, 3, 4].map((id) => ({
    id,
    name: "AXO Islington, London",
    location: "Holloway Rd, London",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop",
    amenities: ["Bike Storage", "bills included", "laundry facility"],
    tags: ["5 Room options", "Instant Booking", "3 Offers"],
    price: "£270/week"
  }));

  return (
    <div className="max-w-[1200px] mx-auto py-12 px-8 flex gap-8 items-start">
      
      {/* Left Column */}
      <div className="flex-[2] min-w-0">
        <h2 className="text-[24px] font-bold text-[#101828] mb-2">We help for Accomodation</h2>
        <p className="text-[14px] text-[#475467] leading-relaxed mb-8">
          Our counselors will give you valuable advice on the accommodation types' to suit your needs and budget and help you with all related formalities.
        </p>

        {/* Search Box */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm mb-8" style={{ borderColor: '#EAECF0' }}>
          <h3 className="text-[16px] font-bold text-[#101828] mb-4">Search Housing</h3>
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
            <input type="text" placeholder="Search by college, city or country" className="w-full h-11 pl-9 pr-4 border rounded-xl text-[14px] focus:outline-none focus:border-[#0070F0]" style={{ borderColor: '#D0D5DD' }} />
          </div>
          <div className="flex items-center gap-3">
            {["Sort", "Price", "Move in Month", "Room Type"].map(filter => (
              <button key={filter} className="h-10 px-3 border rounded-lg text-[13px] font-medium text-[#344054] bg-white flex items-center gap-2 hover:bg-slate-50 transition" style={{ borderColor: '#D0D5DD' }}>
                {filter} <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <h3 className="text-[15px] font-bold text-[#101828] mb-4">Showing 531 options in london</h3>
        <div className="space-y-6 mb-8">
          {accommodations.map((acc) => (
            <div key={acc.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm flex" style={{ borderColor: '#EAECF0' }}>
              <div className="w-[280px] shrink-0 h-[220px]">
                <img src={acc.image} className="w-full h-full object-cover" alt="Room" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-[18px] font-bold text-[#101828] mb-1">{acc.name}</h4>
                <p className="text-[13px] text-slate-500 mb-4">{acc.location}</p>
                
                <div className="flex items-center gap-4 text-[12px] text-slate-600 mb-3">
                  {acc.amenities.map(am => (
                    <span key={am} className="flex items-center gap-1"><Check className="w-3 h-3 text-slate-400" /> {am}</span>
                  ))}
                </div>

                <div className="flex items-center gap-2 mb-auto">
                  {acc.tags.map((tag, i) => (
                    <span key={tag} className={`px-2 py-1 rounded text-[11px] font-medium ${i===1 ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 border-t pt-4" style={{ borderColor: '#EAECF0' }}>
                  <div className="text-[13px] text-slate-500">From <span className="text-[18px] font-bold text-[#101828]">{acc.price}</span></div>
                  <button className="h-10 px-8 bg-[#E62E5C] text-white rounded-lg text-[14px] font-bold hover:bg-[#c8224b] transition shadow-sm">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mb-12">
           <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border bg-white text-slate-400" style={{ borderColor: '#EAECF0' }}>&lt;</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#E62E5C] text-white font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50">2</button>
            <span className="text-slate-400 px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50">89</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border bg-white text-slate-600 hover:bg-slate-50" style={{ borderColor: '#EAECF0' }}>&gt;</button>
          </div>
        </div>

        {/* Footer Badges */}
        <div className="flex items-center justify-between border-t pt-8 text-[12px] font-medium text-slate-600" style={{ borderColor: '#EAECF0' }}>
          <div className="flex items-center gap-1 border px-3 py-1.5 rounded-full" style={{ borderColor: '#EAECF0' }}><span className="text-green-500">🛏️</span> 1M+ Beds</div>
          <div className="flex items-center gap-1 border px-3 py-1.5 rounded-full" style={{ borderColor: '#EAECF0' }}><Check className="w-3 h-3 text-green-500"/> Verified Properties</div>
          <div className="flex items-center gap-1 border px-3 py-1.5 rounded-full" style={{ borderColor: '#EAECF0' }}><span className="text-green-500">🏷️</span> Price Match Guarantee</div>
          <div className="flex items-center gap-1 border px-3 py-1.5 rounded-full" style={{ borderColor: '#EAECF0' }}><span className="text-green-500">🎧</span> 24/7 Assistance</div>
        </div>

      </div>

      {/* Right Column */}
      <div className="w-[320px] shrink-0 space-y-6">
        
        {/* Countries we offer */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: '#EAECF0' }}>
          <h3 className="text-[18px] font-bold text-[#101828] mb-6">Countries we offer</h3>
          <div className="space-y-5">
            {[
              { flag: "🇦🇺", name: "Study in Australia" },
              { flag: "🇨🇦", name: "Study in Canada" },
              { flag: "🇺🇸", name: "Study in United States" },
              { flag: "🇮🇳", name: "Study in India" },
              { flag: "🇬🇧", name: "Study in United Kingdom" }
            ].map(c => (
              <div key={c.name} className="flex items-center gap-3 text-[14px] text-[#344054] font-medium cursor-pointer hover:text-[#0070F0]">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-sm shadow-sm">{c.flag}</div>
                {c.name}
              </div>
            ))}
          </div>
        </div>

        {/* Popular tags */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm" style={{ borderColor: '#EAECF0' }}>
          <h3 className="text-[18px] font-bold text-[#101828] mb-6">Popular tags</h3>
          <div className="flex flex-wrap gap-2">
            {["Courses", "Visa Processing", "Study in UK", "Insurance", "Expenses", "Jobs", "Study Abroad"].map(tag => (
              <span key={tag} className="px-3 py-1.5 border rounded-full text-[13px] text-[#344054] font-medium bg-white hover:bg-slate-50 cursor-pointer transition" style={{ borderColor: '#D0D5DD' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
