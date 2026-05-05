import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight, Info, Search, ChevronDown, Bookmark,
  GraduationCap, Building2, FileText, MapPin, Calendar, BookOpen
} from "lucide-react";
import { CustomCountryDropdown, CustomIntakeDropdown } from "@/components/dashboard/Popups";

// ── Dashboard Components ──────────────────────────────────────────────────

function ProfileBanner({ pct }: { pct: number }) {
  return (
    <div className="rounded-xl p-8 relative text-white flex flex-col md:flex-row gap-8 shadow-sm overflow-hidden mt-6" style={{ backgroundColor: '#0B1A2D' }}>
      {/* Progress Bar Top Line */}
      <div className="absolute top-0 left-0 w-full px-8 pt-4">
         <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: '#3B82F6' }} />
         </div>
      </div>

      <div className="flex flex-col items-center justify-center shrink-0 w-32 pt-4">
        <h2 className="text-5xl font-bold">{pct}%</h2>
        <p className="text-sm text-slate-400 mt-1 text-center leading-tight">of your profile<br/>is complete</p>
      </div>
      
      <div className="flex-1 border-l border-white/10 pl-8 pt-4 pb-2 flex flex-col justify-center">
        <h3 className="text-xl font-bold mb-2">Complete your profile to apply abroad</h3>
        <p className="text-sm text-slate-300 mb-6 max-w-xl">
          Standout from the crowd, customize your profile according to your preference and get more filtered recommendations.
        </p>
        
        <div className="flex items-center justify-between w-full">
          <Link href="/dashboard/profile" className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: '#0070F0' }}>
            Complete my profile <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition">
            <Info className="w-4 h-4" /> Why is this important?
          </button>
        </div>
      </div>
    </div>
  );
}

function SearchCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-10 shadow-sm text-center mt-6">
      <h3 className="text-[28px] font-bold text-[#0B1A2D] mb-3">
        Find your Dream <span style={{ color: '#0070F0' }}>University & Courses</span>
      </h3>
      <p className="text-slate-500 text-base mb-10">
        Know about different courses and programs according to your preferences
      </p>
      
      {/* 
        Using inline styles for CSS Grid to guarantee exact layout proportions 
        and bypass any Tailwind dev server cache issues.
      */}
      <div 
        className="w-full text-left"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 220px 220px 140px', 
          gap: '1rem', 
          alignItems: 'end' 
        }}
      >
        <div className="w-full">
          <label className="block text-sm font-medium text-[#475467] mb-2">Search University & Course</label>
          <input 
            type="text" 
            placeholder="Search universtiry, colleges, courses and more" 
            className="w-full h-12 px-4 border border-[#D0D5DD] rounded-xl text-sm focus:outline-none focus:border-blue-500 placeholder-slate-400"
          />
        </div>
        <CustomCountryDropdown />
        <CustomIntakeDropdown />
        <div className="w-full">
          <button className="w-full h-12 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition shadow-sm" style={{ backgroundColor: '#0070F0' }}>
            <Search className="w-5 h-5" /> Search
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, title, linkText, href, colorClass, iconBgClass }: any) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex flex-col h-full">
      <div className="flex items-start gap-4 mb-8">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${iconBgClass}`}>
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
        <h3 className="font-bold text-slate-900 text-lg leading-tight mt-1">{title}</h3>
      </div>
      <div className="mt-auto pt-4 border-t border-slate-50">
        <Link href={href} className={`text-sm font-medium flex items-center justify-between group ${colorClass}`}>
          {linkText} <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </Link>
      </div>
    </div>
  );
}

function StatsRow({ stats }: { stats: { recommendedPrograms: number; shortlistedUniversities: number; totalApplications: number } }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <StatCard 
        icon={GraduationCap} title="Course Recommendation" linkText={`${stats.recommendedPrograms} Courses Recommended for you`} href="/dashboard/programs"
        colorClass="text-blue-600" iconBgClass="bg-blue-50"
      />
      <StatCard 
        icon={Building2} title="Shortlisted University" linkText={`${stats.shortlistedUniversities} Universities shortlisted`} href="/dashboard/bookmarks"
        colorClass="text-purple-600" iconBgClass="bg-purple-50"
      />
      <StatCard 
        icon={FileText} title="Total Applications" linkText={`${stats.totalApplications} Applications`} href="/dashboard/applications"
        colorClass="text-emerald-600" iconBgClass="bg-emerald-50"
      />
    </div>
  );
}

function UniCard({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm flex flex-col">
      {/* Cover Image */}
      <div className="h-40 bg-slate-200 relative w-full overflow-hidden">
        <img src={data.coverImageUrl || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&auto=format&fit=crop"} alt={data.name} className="w-full h-full object-cover" />
        <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow z-20">
          <Bookmark className="w-4 h-4 text-slate-400" />
        </button>
        <div className="absolute w-20 h-12 bg-white rounded shadow-sm border border-slate-100 flex items-center justify-center p-2 z-20" style={{ bottom: '-1.5rem', left: '1rem' }}>
          {data.logoUrl ? (
            <img src={data.logoUrl} alt="" className="max-h-full max-w-full object-contain" />
          ) : (
            <div className="text-[8px] font-bold text-center leading-tight" style={{ color: '#4A148C' }}>{data.name.toUpperCase()}</div>
          )}
        </div>
        {data.ranking && (
          <div className="absolute bottom-2 right-2 bg-white px-2 py-0.5 rounded text-xs font-bold shadow-sm z-20" style={{ color: '#0070F0' }}>
            Rank: {data.ranking}
          </div>
        )}
      </div>
      
      {/* Details */}
      <div className="p-5 pt-10 flex-1 flex flex-col relative z-10 bg-white">
        <h4 className="font-bold text-slate-900 text-lg mb-4">{data.name}</h4>
        
        <div className="space-y-3 mb-6">
          <div className="grid items-start text-sm" style={{ gridTemplateColumns: '130px 1fr' }}>
            <span className="flex items-center gap-2 text-slate-500"><Building2 className="w-4 h-4"/> Institute Type</span>
            <span className="font-medium text-slate-900">{data.type || "Public"}</span>
          </div>
          <div className="grid items-start text-sm" style={{ gridTemplateColumns: '130px 1fr' }}>
            <span className="flex items-center gap-2 text-slate-500"><MapPin className="w-4 h-4"/> Location</span>
            <span className="font-medium text-slate-900">{data.country}{data.city ? `, ${data.city}` : ''}</span>
          </div>
          <div className="grid items-start text-sm" style={{ gridTemplateColumns: '130px 1fr' }}>
            <span className="flex items-center gap-2 text-slate-500"><Bookmark className="w-4 h-4"/> Establishment</span>
            <span className="font-medium text-slate-900">{data.established || "N/A"}</span>
          </div>
          <div className="grid items-start text-sm" style={{ gridTemplateColumns: '130px 1fr' }}>
            <span className="flex items-center gap-2 text-slate-500"><BookOpen className="w-4 h-4"/> Courses</span>
            <span className="font-medium text-slate-900">{data.courses ?? 0}</span>
          </div>
          <div className="grid items-start text-sm" style={{ gridTemplateColumns: '130px 1fr' }}>
            <span className="flex items-center gap-2 text-slate-500"><Calendar className="w-4 h-4"/> Intakes</span>
            <div className="flex flex-wrap gap-1.5">
              {(data.intakes ?? []).map((intake: string) => (
                <span key={intake} className="text-white text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#0070F0' }}>
                  {intake}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-2 border-t border-slate-50">
          <Link href={`/dashboard/universities/${data.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-blue-600 transition">
            View Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  // ── Fetch real data from DB ──
  let profilePct = 10;
  let stats = { recommendedPrograms: 0, shortlistedUniversities: 0, totalApplications: 0 };
  let recommendedUniversities: any[] = [];

  try {
    const student = await db.student.findUnique({
      where: { userId: user.id },
      include: {
        applications: { where: { deletedAt: null }, select: { id: true } },
      },
    });

    if (student) {
      // Calculate profile completion from real fields
      const fields = [
        student.firstName, student.lastName, student.phone,
        student.dateOfBirth, student.gender, student.nationality,
        student.educationLevel, student.institutionName,
        student.englishTest, student.englishScore,
        student.preferredCountries?.length > 0,
        student.preferredLevel, student.preferredField,
        student.targetIntake, student.city,
      ];
      const filled = fields.filter(Boolean).length;
      profilePct = Math.round((filled / fields.length) * 90) + 10;

      // Count bookmarks
      const bookmarkCount = await db.bookmark.count({
        where: { userId: user.id, entityType: "university" },
      }).catch(() => 0);

      stats = {
        recommendedPrograms: 0,
        shortlistedUniversities: bookmarkCount,
        totalApplications: student.applications.length,
      };

      // Get recommended universities based on preferred countries
      const preferredCountries = student.preferredCountries ?? [];
      recommendedUniversities = await db.university.findMany({
        where: {
          isActive: true,
          deletedAt: null,
          ...(preferredCountries.length > 0 ? { country: { in: preferredCountries } } : {}),
        },
        select: {
          id: true, name: true, country: true, city: true, type: true,
          ranking: true, established: true, coverImageUrl: true, logoUrl: true,
          intakes: true, tuitionRangeMin: true, tuitionRangeMax: true,
          _count: { select: { programs: true } },
        },
        orderBy: [{ ranking: { sort: "asc", nulls: "last" } }],
        take: 6,
      });

      // If no results from preferred countries, get top-ranked globally
      if (recommendedUniversities.length === 0) {
        recommendedUniversities = await db.university.findMany({
          where: { isActive: true, deletedAt: null },
          select: {
            id: true, name: true, country: true, city: true, type: true,
            ranking: true, established: true, coverImageUrl: true, logoUrl: true,
            intakes: true, tuitionRangeMin: true, tuitionRangeMax: true,
            _count: { select: { programs: true } },
          },
          orderBy: [{ ranking: { sort: "asc", nulls: "last" } }],
          take: 6,
        });
      }

      // Update stats with program count
      stats.recommendedPrograms = recommendedUniversities.reduce(
        (sum, u) => sum + (u._count?.programs ?? 0), 0
      );
    }
  } catch (e) {
    console.error("[Dashboard] Failed to fetch data:", e);
  }

  const fullName = user.user_metadata?.full_name || "Student";

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Welcome Heading */}
      <div>
        <h1 className="text-[28px] font-bold text-slate-900 flex items-center gap-2">
          Hey! {fullName} <span className="text-3xl">👋</span>
        </h1>
      </div>

      <ProfileBanner pct={profilePct} />
      
      <SearchCard />
      
      <StatsRow stats={stats} />

      {/* Recommended Universities */}
      <div>
        <div className="flex items-end justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Recommended Universities</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl">
              According to the form you filled, these Universities are recommended for you based on stream, Educational level, and Entry requirements from university itself.
            </p>
          </div>
          <Link href="/dashboard/universities" className="text-sm font-medium text-slate-600 hover:text-[#0070F0] flex items-center gap-1 shrink-0">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {recommendedUniversities.length > 0 ? (
            recommendedUniversities.map((uni: any) => (
              <UniCard key={uni.id} data={{
                ...uni,
                courses: uni._count?.programs ?? 0,
              }} />
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-white rounded-2xl border border-slate-100">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h4 className="font-bold text-slate-700 text-lg mb-2">No Universities Yet</h4>
              <p className="text-slate-500 text-sm mb-4">Complete your profile to get personalized recommendations.</p>
              <Link href="/dashboard/profile" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white" style={{ backgroundColor: '#0070F0' }}>
                Complete Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
