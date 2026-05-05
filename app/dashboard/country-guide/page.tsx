import { Play, Globe, Heart, Star, Briefcase, ChevronRight, Check, MapPin, ArrowRight, Plus } from "lucide-react";

export default function CountryGuideOverviewPage() {
  return (
    <div className="w-full">
      
      {/* About Section */}
      <div className="max-w-[1000px] mx-auto py-16 px-8">
        <h2 className="text-[24px] font-bold text-[#101828] mb-6">About <span className="text-[#0070F0]">Australia</span></h2>
        <div className="text-[15px] text-[#475467] leading-relaxed space-y-4 mb-12">
          <p>Australia is a representative democracy where voters elect candidates to carry out the business of government on their behalf.</p>
          <p>All Australian citizens over the age of 18 must vote in elections.</p>
          <p>The Australian Constitution of 1901 established a federal system of government, based on the British (Westminster) tradition of government. Powers are distributed between a national government (the Commonwealth) and the six states (New South Wales, Queensland, South Australia, Tasmania, Victoria and Western Australia). The Australian Capital Territory and the Northern Territory have self-government arrangements.</p>
          <p>Australia's elected national government is answerable to the Parliament for its actions. The Prime Minister leads a Cabinet of ministers, who are responsible for decisions made by their department.</p>
        </div>
        <div className="relative rounded-3xl overflow-hidden h-[400px]">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Students" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#0070F0] hover:scale-105 transition shadow-lg">
              <Play className="w-6 h-6 ml-1" fill="currentColor" />
            </button>
          </div>
        </div>
      </div>

      {/* Why Study in Australia Section */}
      <div className="bg-[#F8FAFC] py-20 px-8">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-[24px] font-bold text-[#101828] mb-8">Why study in <span className="text-[#0070F0]">Australia?</span></h2>
            
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAECF0]">
                <Globe className="w-6 h-6 text-[#0070F0] mb-4" />
                <h3 className="text-[15px] font-bold text-[#101828] mb-2">Global Community</h3>
                <p className="text-[13px] text-[#475467] leading-relaxed">Seven of the 43 institutions are within the top 100 worldwide.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAECF0] translate-y-12">
                <Heart className="w-6 h-6 text-[#0070F0] mb-4" />
                <h3 className="text-[15px] font-bold text-[#101828] mb-2">Quality of Life</h3>
                <p className="text-[13px] text-[#475467] leading-relaxed">Australia is the heart of adventure and can be a traveller's dream.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAECF0]">
                <Star className="w-6 h-6 text-[#0070F0] mb-4" />
                <h3 className="text-[15px] font-bold text-[#101828] mb-2">Student Satisfaction</h3>
                <p className="text-[13px] text-[#475467] leading-relaxed">Approximately 87% of international students reported being satisfied.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAECF0] translate-y-12">
                <Briefcase className="w-6 h-6 text-[#0070F0] mb-4" />
                <h3 className="text-[15px] font-bold text-[#101828] mb-2">Employability</h3>
                <p className="text-[13px] text-[#475467] leading-relaxed">Australian graduates are recognized by employers worldwide.</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative hidden md:block">
            <div className="w-[400px] h-[400px] rounded-full overflow-hidden ml-auto">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Student smiling" />
            </div>
            {/* Background decorative shapes can go here */}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-[1100px] mx-auto py-20 px-8 text-center">
        <h2 className="text-[28px] font-bold text-[#101828] mb-16">Why Choose <span className="text-[#0070F0]">Us?</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { icon: "🏛️", title: "1:1 Guidance & Support", desc: "Get personalized counseling from our experts to find the perfect course and university for your career goals." },
            { icon: "💻", title: "Best online test preparation", desc: "Access premium resources and coaching for IELTS, TOEFL, PTE, and other essential English proficiency exams." },
            { icon: "🎓", title: "Scholarship Assistance", desc: "Discover and apply for exclusive scholarships and financial aid to help fund your international education." },
            { icon: "✈️", title: "Hustle free Visa Process", desc: "Navigate the complex visa application process smoothly with our step-by-step guidance and documentation support." },
            { icon: "📄", title: "Easy Documentation", desc: "Receive comprehensive help with SOPs, LORs, and all necessary university application documents." },
            { icon: "💰", title: "Financial Guidance", desc: "Plan your education budget effectively with our expert advice on education loans and living expenses." },
            { icon: "🔍", title: "Explore your Options", desc: "Browse thousands of programs across top study destinations to make an informed decision about your future." },
            { icon: "✅", title: "Guaranteed Admission", desc: "Maximize your chances of acceptance with our proven application strategies and university partnerships." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl mb-4">{item.icon}</div>
              <h3 className="text-[15px] font-bold text-[#101828] mb-2">{item.title}</h3>
              <p className="text-[13px] text-[#475467]">{item.desc}</p>
            </div>
          ))}
        </div>
        <button className="h-12 px-8 bg-[#0070F0] text-white rounded-full text-[15px] font-bold hover:bg-blue-600 transition shadow-sm mx-auto flex items-center gap-2">
          Get your free counselling session today! <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Popular Places */}
      <div className="max-w-[1000px] mx-auto py-16 px-8 text-center">
        <h2 className="text-[28px] font-bold text-[#101828] mb-8">Popular Places to Study in <span className="text-[#0070F0]">Australia</span></h2>
        
        <div className="flex bg-[#F1F5F9] p-1 rounded-xl mx-auto w-full max-w-2xl mb-12" style={{ borderColor: '#EAECF0' }}>
          {["Melbourne", "Sydney", "Brisbane", "Adelaide", "Perth"].map((city, i) => (
            <button key={city} className={`flex-1 py-2 text-[14px] font-semibold rounded-lg transition ${i === 0 ? 'bg-white shadow-sm text-[#0070F0]' : 'text-[#475467] hover:text-[#101828]'}`}>
              {city}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 text-left">
          <div className="flex-1 space-y-6">
            <h3 className="text-[24px] font-bold text-[#101828]">Melbourne</h3>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0070F0] text-white flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3"/></div>
              <p className="text-[14px] text-[#475467]">Cultural epitome, packed with activities and a great place for exploration.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0070F0] text-white flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3"/></div>
              <p className="text-[14px] text-[#475467]">Headquarters to big corporations and a significant part of the Australian economy. Great place for students to find employment.</p>
            </div>
            <button className="h-11 px-6 bg-[#0070F0] text-white rounded-lg text-[14px] font-bold hover:bg-blue-600 transition shadow-sm flex items-center gap-2 mt-4">
              Find Universities in Melbourne <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 h-[260px] rounded-2xl overflow-hidden shadow-sm">
            <img src="https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Melbourne" />
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-[#F8FAFC] py-20 px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-[28px] font-bold text-[#101828] mb-12">Success Stories from Students in <span className="text-[#0070F0]">Australia</span></h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 text-left">
            {[
              { text: "Reliable and trustworthy. They have earned my trust and loyalty. This company has consistently demonstrated reliability and trustworthiness.", name: "Jane Cooper", uni: "University of Melbourne" },
              { text: "Outstanding customer support! They went above and beyond to help me resolve my issue. I felt valued as a customer, and their commitment to ensuring my satisfaction left a lasting impression.", name: "Kristin Watson", uni: "University of Melbourne" },
              { text: "Prompt delivery and top-notch quality. Impressed with the speed and accuracy. The efficiency and speed at which they delivered the product were impressive.", name: "Devon Lane", uni: "University of Melbourne" },
              { text: "This team knows their stuff. I'm grateful for their guidance. The expertise and knowledge demonstrated by this team were invaluable to me.", name: "Guy Hawkins", uni: "University of Melbourne" },
              { text: "Efficient and professional. I will definitely use their services again. The professionalism of this team made the entire process effortless and stress-free.", name: "Brooklyn Simmons", uni: "University of Melbourne" },
              { text: "An absolute pleasure to work with. They made the process seamless. Working with this team was a seamless and enjoyable experience.", name: "Courtney Henry", uni: "University of Melbourne" },
              { text: "Highly recommended! This product exceeded my expectations in every way. It has become an essential part of my daily life, and I'm grateful for the positive impact it has had on me.", name: "Kathryn Murphy", uni: "University of Melbourne" },
              { text: "A game-changer for my business. Thank you for your expertise! The guidance and strategies provided by this team have transformed my business into a thriving success.", name: "Arlene McCoy", uni: "University of Melbourne" },
              { text: "Exceptional service! I couldn't be happier with the results. The team went above and beyond to meet my needs and deliver outstanding outcomes.", name: "Ronald Richards", uni: "University of Melbourne" }
            ].map((story, i) => (
              <div key={i} className="break-inside-avoid bg-white p-6 rounded-2xl shadow-sm border" style={{ borderColor: '#EAECF0' }}>
                <div className="text-[40px] text-[#0070F0] leading-none mb-2 opacity-20 font-serif">"</div>
                <p className="text-[14px] text-[#475467] leading-relaxed mb-6">{story.text}</p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-[14px] font-bold text-[#101828]">{story.name}</h4>
                    <p className="text-[12px] text-slate-500">{story.uni}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Area */}
      <div className="max-w-3xl mx-auto py-20 px-8 flex gap-12 items-center">
        <div className="flex-1">
          <h2 className="text-[28px] font-bold mb-8">Got Question? <span className="text-[#0070F0]">Find answers here.</span></h2>
          <div className="space-y-4">
            {[
              "What are the eligibility requirements to study in Australia?",
              "How much does it cost to study in Australia for international students?",
              "Can I work while studying in Australia?",
              "What is the process to apply for a student visa (Subclass 500)?",
              "Does Unifinders provide scholarship assistance for Australian universities?",
            ].map((q, n) => (
              <div key={n} className="border rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition shadow-sm bg-white" style={{ borderColor: '#EAECF0' }}>
                <h3 className="text-[15px] font-bold text-[#101828]">{q}</h3>
                <Plus className="w-5 h-5 text-[#0070F0] shrink-0 ml-4" />
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:block w-[300px] shrink-0">
          <div className="w-full h-[300px] bg-gradient-to-br from-[#F0F6FE] to-[#E0F2FE] rounded-full flex items-center justify-center text-6xl font-bold text-[#0070F0]/20">?</div>
        </div>
      </div>

    </div>
  );
}
