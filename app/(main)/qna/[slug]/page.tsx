"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ThumbsUp, MessageSquare, Eye, Share2, Flag, ChevronRight,
  GraduationCap, ArrowLeft
} from "lucide-react";
import {
  QNA_QUESTIONS, QNA_CONTRIBUTORS, QNA_SPONSORED
} from "@/lib/constants/qna";

function RightSidebar({ onAsk }: { onAsk: () => void }) {
  const [askOpen, setAskOpen] = useState(false);
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <p className="text-sm font-bold text-slate-900 mb-3">Have a Question in mind?</p>
        <button onClick={onAsk} className="w-full py-2.5 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all">Ask a Question</button>
      </div>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Other contributors you may like</h3>
        <div className="space-y-3">
          {QNA_CONTRIBUTORS.slice(0, 5).map(c => (
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
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Sponsored Links</h3>
        <div className="space-y-3">
          {QNA_SPONSORED.map(s => (
            <div key={s.id} className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 rounded-xl transition-colors p-1">
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
  );
}

export default function QuestionDetailPage() {
  const params = useParams<{ slug: string }>();
  const question = QNA_QUESTIONS.find(q => q.slug === params.slug);
  if (!question) notFound();

  const author = QNA_CONTRIBUTORS.find(c => c.id === question.authorId);
  const [liked, setLiked] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const relatedQuestions = QNA_QUESTIONS
    .filter(q => q.slug !== question.slug && (q.category === question.category || q.country === question.country))
    .slice(0, 4);

  const submitAnswer = () => {
    if (!answerText.trim()) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setAnswerText(""); }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3">
          <Link href="/qna" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#1D4ED8] transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to QnA
          </Link>
          <span className="text-slate-300">›</span>
          <p className="text-xs text-slate-500 truncate">
            <Link href="/" className="hover:text-[#1D4ED8]">Home</Link>
            <span className="mx-1.5">›</span>
            <Link href="/qna" className="hover:text-[#1D4ED8]">QnA</Link>
            <span className="mx-1.5">›</span>
            <span className="text-slate-700 font-medium truncate">{question.title.slice(0, 50)}...</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">

          {/* Main Content */}
          <div className="space-y-5">

            {/* Question card */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Link href={`/qna/contributor/${question.authorId}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 ring-2 ring-blue-100 shadow">
                      {author && <Image src={author.avatar} alt={author.name} width={48} height={48} unoptimized className="object-cover w-full h-full" />}
                    </div>
                  </Link>
                  <div>
                    <Link href={`/qna/contributor/${question.authorId}`} className="text-sm font-bold text-slate-900 hover:text-[#1D4ED8] transition-colors">{author?.name}</Link>
                    <p className="text-xs text-slate-400">{question.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 px-2.5 py-1 rounded-full">{question.answersCount} Answers Available</span>
                  <button className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors"><Flag className="w-3 h-3" /> Report</button>
                </div>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 mb-4 leading-snug">{question.title}</h1>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {question.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-blue-50 text-[#1D4ED8] rounded-full font-medium">{tag}</span>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl p-5 mb-5 border border-slate-100">
                {question.body.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i} className="text-sm text-slate-700 leading-relaxed mb-3 last:mb-0">{para}</p>
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-5 text-sm text-slate-500">
                  <button onClick={() => setLiked(v => !v)} className={`flex items-center gap-1.5 font-medium transition-colors ${liked ? "text-[#1D4ED8]" : "hover:text-[#1D4ED8]"}`}>
                    <ThumbsUp className={`w-4 h-4 ${liked ? "fill-[#1D4ED8]" : ""}`} />
                    {(question.likes + (liked ? 1 : 0)).toLocaleString()}
                  </button>
                  <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" />{question.comments}</span>
                  <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{question.views.toLocaleString()}</span>
                </div>
                <button className="flex items-center gap-1.5 text-sm text-slate-600 font-medium hover:text-[#1D4ED8] transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Answers */}
            {question.answers.length > 0 && (
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#1D4ED8]" />
                  {question.answersCount} Answers
                </h2>
                <div className="space-y-4">
                  {question.answers.map(answer => {
                    const answerer = QNA_CONTRIBUTORS.find(c => c.id === answer.contributorId);
                    return (
                      <div key={answer.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                        <div className="flex items-start gap-4">
                          <Link href={`/qna/contributor/${answer.contributorId}`}>
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-blue-50 shrink-0">
                              {answerer && <Image src={answerer.avatar} alt={answerer.name} width={40} height={40} unoptimized className="object-cover w-full h-full" />}
                            </div>
                          </Link>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Link href={`/qna/contributor/${answer.contributorId}`} className="text-sm font-bold text-slate-900 hover:text-[#1D4ED8] transition-colors">{answerer?.name}</Link>
                              <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">{answerer?.role}</span>
                              <span className="text-xs text-slate-400 ml-auto">{answer.date}</span>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed mb-3">{answer.text}</p>
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#1D4ED8] font-medium transition-colors">
                                <ThumbsUp className="w-3.5 h-3.5" /> {answer.likes.toLocaleString()} Helpful
                              </button>
                              <button className="text-xs text-slate-400 hover:text-red-500 font-medium transition-colors">Report</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Write Answer */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#1D4ED8]" /> Write Your Answer
              </h2>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-3">✅</div>
                  <p className="font-bold text-slate-900">Answer submitted! Thank you for contributing.</p>
                </div>
              ) : (
                <>
                  <textarea value={answerText} onChange={e => setAnswerText(e.target.value.slice(0, 500))}
                    placeholder="Share your knowledge and experience to help fellow students..."
                    rows={5}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 resize-none outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition mb-2" />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">{answerText.length}/500</p>
                    <button onClick={submitAnswer} disabled={!answerText.trim()}
                      className="px-8 py-2.5 bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all">
                      Submit Answer
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Related Questions */}
            {relatedQuestions.length > 0 && (
              <div>
                <h2 className="text-base font-extrabold text-slate-900 mb-4">Related Questions</h2>
                <div className="space-y-3">
                  {relatedQuestions.map(rq => {
                    const rAuthor = QNA_CONTRIBUTORS.find(c => c.id === rq.authorId);
                    return (
                      <Link key={rq.id} href={`/qna/${rq.slug}`}
                        className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 shadow-sm p-4 hover:border-[#1D4ED8] hover:shadow-md transition-all group">
                        <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0">
                          {rAuthor && <Image src={rAuthor.avatar} alt={rAuthor.name} width={36} height={36} unoptimized className="object-cover w-full h-full" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-[#1D4ED8] transition-colors line-clamp-1">{rq.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{rq.answersCount} answers · {rq.views.toLocaleString()} views</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#1D4ED8] transition-colors shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-[57px]">
              <RightSidebar onAsk={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
