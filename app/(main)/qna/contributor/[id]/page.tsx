"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ThumbsUp, MessageSquare, Eye, Share2, Flag, ChevronRight,
  UserPlus, MessageCircle, ArrowLeft
} from "lucide-react";
import {
  QNA_CONTRIBUTORS, QNA_QUESTIONS, QNA_SPONSORED
} from "@/lib/constants/qna";

export default function ContributorProfilePage() {
  const params = useParams<{ id: string }>();
  const contributor = QNA_CONTRIBUTORS.find(c => c.id === params.id);
  if (!contributor) notFound();

  const [following, setFollowing] = useState(false);
  const contributorQuestions = QNA_QUESTIONS.filter(q => q.authorId === contributor.id);
  const otherContributors = QNA_CONTRIBUTORS.filter(c => c.id !== contributor.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Profile Hero Banner */}
      <div className="bg-[#0C1A3E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white/30"
              style={{ width: 200 + i * 120, height: 200 + i * 120, top: "50%", left: "-100px", transform: "translateY(-50%)" }} />
          ))}
        </div>
        {/* Nav breadcrumb */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-5 pb-0 flex items-center gap-2">
          <Link href="/qna" className="flex items-center gap-1.5 text-xs text-blue-300 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to QnA
          </Link>
        </div>

        {/* Profile info */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar + meta */}
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-white/20 shadow-xl shrink-0">
                <Image src={contributor.avatar} alt={contributor.name} width={112} height={112} unoptimized className="object-cover w-full h-full" />
              </div>
              <div>
                {/* Badge pills */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs bg-blue-500/30 text-blue-200 px-2.5 py-1 rounded-full font-medium border border-blue-400/30">
                    All filter
                  </span>
                  <span className="text-xs bg-white/10 text-blue-100 px-2.5 py-1 rounded-full font-medium border border-white/20">
                    PAN Get Best Counselor
                  </span>
                  <span className="text-xs bg-white/10 text-blue-100 px-2.5 py-1 rounded-full font-medium border border-white/20">
                    8175 member
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white">{contributor.name}</h1>
                <p className="text-blue-300 text-sm font-medium mt-0.5">{contributor.role}</p>
                {/* Stats row */}
                <div className="flex items-center gap-6 mt-3">
                  {[
                    { label: "Total Answers", value: `${(contributor.totalAnswers / 1000).toFixed(1)}K` },
                    { label: "Followers", value: `${(contributor.followers / 1000).toFixed(1)}K` },
                    { label: "Following", value: `${(contributor.following / 1000).toFixed(1)}K` },
                  ].map(stat => (
                    <div key={stat.label} className="text-center">
                      <p className="text-lg font-extrabold text-white">{stat.value}</p>
                      <p className="text-[11px] text-blue-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="md:ml-auto flex items-center gap-3 shrink-0">
              <button onClick={() => setFollowing(v => !v)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${following ? "bg-white text-[#1D4ED8] hover:bg-blue-50" : "bg-[#1D4ED8] hover:bg-blue-600 text-white"}`}>
                <UserPlus className="w-4 h-4" /> {following ? "Following" : "Follow"}
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all">
                <MessageCircle className="w-4 h-4" /> Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">

          {/* Questions Feed */}
          <div className="space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 mb-4">
              Questions by {contributor.name}
              <span className="ml-2 text-sm text-slate-400 font-medium">({contributorQuestions.length} total)</span>
            </h2>
            {contributorQuestions.length > 0 ? (
              contributorQuestions.map(q => {
                const [liked, setLiked] = useState(false);
                return (
                  <div key={q.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-all">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow">
                          <Image src={contributor.avatar} alt={contributor.name} width={40} height={40} unoptimized className="object-cover w-full h-full" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{contributor.name}</p>
                          <p className="text-[11px] text-slate-400">{q.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 px-2.5 py-1 rounded-full">{q.answersCount} Answers Available</span>
                        <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"><Flag className="w-3 h-3" /> Report</button>
                      </div>
                    </div>
                    <Link href={`/qna/${q.slug}`}>
                      <h3 className="text-sm font-bold text-slate-900 hover:text-[#1D4ED8] transition-colors leading-snug mb-2 cursor-pointer">{q.title}</h3>
                    </Link>
                    <p className="text-xs text-slate-600 leading-relaxed mb-1 line-clamp-2">{q.body.replace(/\n/g, " ")}</p>
                    <Link href={`/qna/${q.slug}`} className="text-xs font-semibold text-[#1D4ED8] hover:underline inline-flex items-center gap-0.5">
                      Read More <ChevronRight className="w-3 h-3" />
                    </Link>
                    <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <button onClick={() => setLiked(v => !v)} className={`flex items-center gap-1.5 font-medium transition-colors ${liked ? "text-[#1D4ED8]" : "hover:text-[#1D4ED8]"}`}>
                          <ThumbsUp className={`w-3.5 h-3.5 ${liked ? "fill-[#1D4ED8]" : ""}`} />
                          {(q.likes + (liked ? 1 : 0)).toLocaleString()}
                        </button>
                        <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" />{q.comments}</span>
                        <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{q.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-slate-500 hover:text-[#1D4ED8] flex items-center gap-1 font-medium">
                          <Share2 className="w-3.5 h-3.5" /> Share
                        </button>
                        <Link href={`/qna/${q.slug}`}
                          className="px-4 py-1.5 bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all">
                          Answer
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-bold text-slate-800 mb-1">No questions yet</h3>
                <p className="text-sm text-slate-500">This contributor hasn't posted any questions.</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-[57px] space-y-5">
              {/* Ask CTA */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <p className="text-sm font-bold text-slate-900 mb-3">Have a Question in mind?</p>
                <Link href="/qna" className="block w-full py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm text-center transition-all">
                  Ask a Question
                </Link>
              </div>
              {/* Other contributors */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Other contributors you may like</h3>
                <div className="space-y-3">
                  {otherContributors.map(c => (
                    <Link key={c.id} href={`/qna/contributor/${c.id}`} className="flex items-center gap-3 group">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0">
                        <Image src={c.avatar} alt={c.name} width={36} height={36} unoptimized className="object-cover w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors truncate">{c.name}</p>
                        <p className="text-[10px] text-slate-400">Students Helped: {c.studentsHelped.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              {/* Sponsored */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Sponsored Links</h3>
                <div className="space-y-3">
                  {QNA_SPONSORED.map(s => (
                    <div key={s.id} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 rounded-xl p-1 transition-colors">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <Image src={s.image} alt={s.title} width={80} height={56} unoptimized className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-slate-900 leading-tight line-clamp-2">{s.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{s.subtitle}</p>
                      </div>
                      <button className="shrink-0 px-2.5 py-1 bg-[#1D4ED8] text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition">Apply</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
