import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Calendar, Clock, MapPin, Share2, Plus, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function EventDetailsPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  return (
    <div className="bg-white -m-6 md:-m-8 min-h-screen">
      
      {/* Top Header */}
      <div className="h-16 bg-white border-b flex items-center px-8 sticky top-0 z-20" style={{ borderColor: '#EAECF0' }}>
        <Link href="/dashboard/events" className="flex items-center justify-center w-8 h-8 rounded-full border hover:bg-slate-50 transition mr-4" style={{ borderColor: '#EAECF0' }}>
          <ArrowLeft className="w-4 h-4 text-[#344054]" />
        </Link>
        <h1 className="text-[18px] font-bold text-[#101828]">Event Details</h1>
      </div>

      {/* Hero Image */}
      <div className="relative h-[300px] w-full bg-slate-200">
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop" className="w-full h-full object-cover" alt="Event" />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-[1100px] mx-auto w-full h-full relative">
          <div className="absolute bottom-8 left-8 bg-[#0070F0] text-white rounded-2xl w-24 h-28 flex flex-col items-center justify-center shadow-lg border-2 border-white/20">
            <span className="text-[40px] font-bold leading-none mb-1">15</span>
            <span className="text-[16px] font-medium opacity-90">Dec</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-[1100px] mx-auto px-8 py-12">
        
        {/* Header Info */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-[32px] font-bold text-[#101828] mb-6">Educate the World Conference</h1>
            <div className="flex items-center gap-8 text-[14px]">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-red-500" />
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[12px]">Date & Time</span>
                  <span className="font-bold text-[#101828]">15 Dec, 2024</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[12px]">Time</span>
                  <span className="font-bold text-[#101828]">12:00am to 3:00pm</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-500" />
                <div className="flex flex-col">
                  <span className="text-slate-500 text-[12px]">Location</span>
                  <span className="font-bold text-[#101828]">Harmony Seminar Hall</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="flex items-center gap-3">
              <span className="text-[14px] text-slate-500">Share:</span>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center">f</div>
                <div className="w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center">in</div>
                <div className="w-8 h-8 bg-blue-400 rounded-full text-white flex items-center justify-center">t</div>
                <div className="w-8 h-8 bg-pink-500 rounded-full text-white flex items-center justify-center">ig</div>
                <div className="w-8 h-8 bg-slate-500 rounded-full text-white flex items-center justify-center"><Share2 className="w-4 h-4" /></div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="h-11 px-6 border rounded-xl text-[14px] font-bold text-[#344054] hover:bg-slate-50 transition shadow-sm flex items-center gap-2" style={{ borderColor: '#D0D5DD' }}>
                <Calendar className="w-4 h-4 text-[#0070F0]" /> Add to Calender
              </button>
              <button className="h-11 px-8 bg-[#0070F0] text-white rounded-xl text-[14px] font-bold hover:bg-blue-600 transition shadow-sm flex items-center gap-2">
                Register Now <ArrowRight className="w-4 h-4 -rotate-45" />
              </button>
            </div>
          </div>
        </div>

        {/* Main 2 Column Grid */}
        <div className="flex gap-12 mb-16">
          <div className="flex-[2]">
            <h2 className="text-[20px] font-bold text-[#101828] mb-4">Description</h2>
            <div className="text-[15px] text-[#475467] leading-relaxed space-y-6">
              <p>Lorem ipsum dolor sit amet consectetur. Morbi vel a dui odio odio tristique. Turpis nunc accumsan nunc risus cursus diam tellus nunc. Non placerat quam in quis at dictum. Id diam nisi nulla lacus lacus risus. Nunc nunc aliquam in nulla nibh. Suspendisse consequat facilisi ut purus bibendum id aliquam. Porta a massa pellentesque blandit vel amet est. Donec non diam sed est senectus aliquet et. Massa velit at tincidunt purus urna amet vel. Amet interdum sit amet urna feugiat ullamcorper sit orci scelerisque. Arcu eu nisi id volutpat justo amet amet. Rhoncus at risus id molestie aliquet odio suscipit.</p>
              <p>Mattis vestibulum vitae suspendisse tortor sagittis turpis. Velit at ornare purus est pretium euismod est amet. Ac velit ac condimentum massa. Et potenti dui sagittis faucibus cras. Nibh tincidunt ut dignissim pellentesque convallis elit odio. Nibh amet ultrices leo lobortis ultrices laoreet. Volutpat curabitur elit pellentesque diam condimentum nisi aenean nulla aliquet. Quis mauris praesent venenatis diam vel.</p>
              <p>Nunc a sed blandit volutpat sed etiam scelerisque pharetra cras. Justo eget diam purus cursus nunc. Dui nulla aliquam non turpis dui est massa cras. Commodo tristique amet cursus ridiculus et interdum sociis lacus. Scelerisque fringilla laoreet facilisis duis odio. Morbi adipiscing cursus volutpat ipsum tempor.</p>
            </div>
          </div>

          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-[20px] font-bold text-[#101828] mb-4">Event Location</h2>
              <div className="rounded-xl overflow-hidden border bg-slate-100 h-[200px] relative mb-4" style={{ borderColor: '#EAECF0' }}>
                <img src="https://www.mapquestapi.com/staticmap/v5/map?key=G&center=40.7128,-74.0060&zoom=12&size=600,400" className="w-full h-full object-cover opacity-70" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#0070F0] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <MapPin className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-[16px] font-bold text-[#101828] mb-1">Harmony Seminar Hall</h3>
              <p className="text-[14px] text-slate-500">4517 Washington Ave. Manchester, Kentucky 39495</p>
            </div>
            
            <div>
              <h2 className="text-[20px] font-bold text-[#101828] mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {["Courses", "Visa Processing", "Study in UK", "Insurance", "Expenses", "Jobs", "Study Abroad"].map(tag => (
                  <span key={tag} className="px-4 py-1.5 border rounded-full text-[13px] text-[#344054] font-medium bg-white" style={{ borderColor: '#D0D5DD' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sponsors */}
        <div className="mb-20">
          <h2 className="text-[24px] font-bold text-[#101828] text-center mb-10">Thank you to our sponsors</h2>
          <div className="grid grid-cols-4 gap-x-8 gap-y-12 items-center opacity-80 mix-blend-multiply grayscale hover:grayscale-0 transition-all">
            {/* Fake sponsor logos */}
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
            <div className="h-12 bg-slate-200 rounded flex items-center justify-center text-xs font-bold text-slate-400">Sponsor Logo</div>
          </div>
        </div>

        {/* FAQ Area */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-[24px] font-bold text-center mb-8">Got Question? <span className="text-[#0070F0]">Find answers here.</span></h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="border rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition" style={{ borderColor: '#EAECF0' }}>
                <h3 className="text-[15px] font-bold text-[#101828]">What is Unifinder's Scholarship?</h3>
                <Plus className="w-5 h-5 text-[#0070F0]" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
