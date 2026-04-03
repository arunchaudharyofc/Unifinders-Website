"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Share2, Star, X, ChevronLeft, ChevronRight, Clock, BookOpen } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants/blogs";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

/* ────────────────────────────────────────────── */
/* Feedback / Review Modal                         */
/* ────────────────────────────────────────────── */
function FeedbackModal({ open, onClose, author }: { open: boolean; onClose: () => void; author: typeof BLOG_POSTS[0]["author"] }) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (!email || !feedback || selectedStar === 0) return;
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); onClose(); setEmail(""); setFeedback(""); setSelectedStar(0); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Send feedback to the author</h2>
            <p className="text-sm text-slate-500 mt-0.5">Leave a rating and review for</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Author info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-slate-200 shrink-0">
              <Image src={author.avatar} alt={author.name} width={56} height={56} unoptimized className="object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900">{author.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-slate-700">{author.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {author.badges.map(b => (
                  <span key={b} className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded-full">{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Star rating */}
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-3">How would you rate {author.name.split(" ")[0]}&apos;s article?</p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(i => (
                <button
                  key={i}
                  onMouseEnter={() => setHoveredStar(i)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setSelectedStar(i)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      i <= (hoveredStar || selectedStar)
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100" />

          {/* Feedback form */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-900">Let writer know about your thoughts</p>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">E-mail <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="Enter your email here"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1.5">Tell us about your view on the article <span className="text-red-500">*</span></label>
              <textarea
                rows={4}
                maxLength={300}
                placeholder="Enter your feedback here"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#1D4ED8] focus:ring-2 focus:ring-blue-100 transition resize-none"
              />
              <p className="text-xs text-slate-400 text-right mt-1">{feedback.length}/300</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="p-6 pt-0">
          {submitted ? (
            <div className="w-full py-3 bg-green-500 text-white font-bold rounded-xl text-sm text-center">
              ✓ Thank you for your feedback!
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* Social Share Bar                                */
/* ────────────────────────────────────────────── */
function ShareBar({ title }: { title: string }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const shares = [
    { label: "Facebook", color: "#1877F2", icon: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { label: "Twitter",  color: "#000000", icon: "𝕏", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { label: "LinkedIn", color: "#0A66C2", icon: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "WhatsApp", color: "#25D366", icon: "W", href: `https://wa.me/?text=${encodeURIComponent(title + " " + url)}` },
  ];
  return (
    <div className="flex items-center gap-2">
      <Share2 className="w-4 h-4 text-slate-400" />
      <span className="text-sm text-slate-500 font-medium">Share:</span>
      {shares.map(s => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-110"
          style={{ backgroundColor: s.color }}
          title={s.label}
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────── */
/* Blog Detail Page                                */
/* ────────────────────────────────────────────── */
export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === params.slug);
  if (!post) notFound();

  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const related = BLOG_POSTS.filter(p => p.slug !== post.slug && (p.category === post.category || p.country === post.country)).slice(0, 3);
  const relatedScrollRef = useRef<HTMLDivElement>(null);

  const scrollRelated = (dir: "left" | "right") => {
    if (relatedScrollRef.current) {
      relatedScrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <p className="text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1D4ED8] transition-colors">Home</Link>
          <span className="mx-1.5">›</span>
          <Link href="/blog" className="hover:text-[#1D4ED8] transition-colors">Blogs</Link>
          <span className="mx-1.5">›</span>
          <span className="text-slate-700 font-medium line-clamp-1">{post.title}</span>
        </p>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">

        {/* Article Header */}
        <header className="pt-8 pb-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs bg-blue-50 text-[#1D4ED8] font-bold px-3 py-1 rounded-full border border-blue-100">{post.category}</span>
            {post.country && (
              <span className="text-xs bg-slate-100 text-slate-600 font-medium px-3 py-1 rounded-full">{post.country}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-100 shrink-0">
                <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} unoptimized className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{post.author.name}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime} min read</span>
                </div>
              </div>
            </div>
            {/* Share */}
            <ShareBar title={post.title} />
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative h-64 md:h-[420px] rounded-2xl overflow-hidden shadow-xl mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none mb-10">
          {post.content.map((section, i) => {
            if (section.type === "paragraph") return (
              <p key={i} className="text-slate-700 text-[15px] leading-relaxed mb-5">{section.content}</p>
            );
            if (section.type === "heading") return (
              <h2 key={i} className="text-xl md:text-2xl font-extrabold text-slate-900 mt-10 mb-4 pb-2 border-b border-slate-100">{section.content}</h2>
            );
            if (section.type === "subheading") return (
              <h3 key={i} className="text-lg font-bold text-slate-800 mt-6 mb-3">{section.content}</h3>
            );
            if (section.type === "list") return (
              <ul key={i} className="space-y-2 mb-5 ml-2">
                {section.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-[#1D4ED8] rounded-full" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            );
            if (section.type === "quote") return (
              <blockquote key={i} className="border-l-4 border-[#1D4ED8] pl-5 py-3 my-6 bg-blue-50 rounded-r-xl">
                <p className="text-slate-700 text-sm leading-relaxed italic font-medium">{section.content}</p>
              </blockquote>
            );
            return null;
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pt-6 border-t border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Tags:</span>
          {post.tags.map(tag => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-[#1D4ED8] text-slate-600 font-medium px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-200 transition-all">
              #{tag}
            </Link>
          ))}
        </div>

        {/* Author Bio + Feedback */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-blue-50 shrink-0">
              <Image src={post.author.avatar} alt={post.author.name} width={64} height={64} unoptimized className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{post.author.name}</h3>
                  <p className="text-slate-500 text-sm">{post.author.role}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(post.author.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">{post.author.rating}</span>
                  </div>
                </div>
                <button
                  onClick={() => setFeedbackOpen(true)}
                  className="px-5 py-2 border-2 border-[#1D4ED8] text-[#1D4ED8] font-semibold text-sm rounded-xl hover:bg-blue-50 transition-all"
                >
                  Send Feedback
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {post.author.badges.map(b => (
                  <span key={b} className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2.5 py-1 rounded-full">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inline CTA */}
        <div className="bg-gradient-to-r from-[#0C1A3E] to-[#1D4ED8] rounded-2xl p-8 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="absolute rounded-full border border-white" style={{ width: 200 + i * 100, height: 200 + i * 100, top: "50%", right: "-50px", transform: "translateY(-50%)" }} />
            ))}
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-extrabold text-white mb-1">Are you interested in</h3>
            <h3 className="text-xl font-extrabold text-blue-200 mb-2">Studying Abroad?</h3>
            <p className="text-blue-100 text-sm">Getting you the right program. Apply and start planning your adventure.</p>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-2 shrink-0">
            <div className="flex items-center gap-3 mb-3">
              {["🇺🇸", "🇨🇦", "🇬🇧", "🇦🇺"].map(flag => (
                <div key={flag} className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-xl backdrop-blur">{flag}</div>
              ))}
            </div>
            <Link href="/appointment"
              className="px-8 py-2.5 bg-white hover:bg-slate-50 text-[#1D4ED8] font-bold rounded-xl text-sm shadow-lg transition-all"
            >
              Get Started →
            </Link>
            <div className="flex items-center gap-2 text-blue-200 text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>120+ Partner Universities</span>
            </div>
          </div>
        </div>

        {/* Check out the whole article */}
        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex-1 py-3 border-2 border-[#1D4ED8] text-[#1D4ED8] font-bold rounded-xl text-sm hover:bg-blue-50 transition-all text-center"
          >
            Rate this Article
          </button>
          <Link href="/appointment"
            className="flex-1 py-3 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold rounded-xl text-sm text-center transition-all"
          >
            Book Free Consultation →
          </Link>
        </div>

        {/* Related Blogs */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-slate-900">Related blogs</h2>
              <div className="flex items-center gap-2">
                <button onClick={() => scrollRelated("left")} className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => scrollRelated("right")} className="w-9 h-9 border border-slate-200 rounded-xl flex items-center justify-center hover:border-[#1D4ED8] hover:text-[#1D4ED8] transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div ref={relatedScrollRef} className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
              {related.map(p => (
                <div key={p.id} className="min-w-[280px] max-w-[280px] bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all group shrink-0">
                  <Link href={`/blog/${p.slug}`} className="block relative h-40 bg-slate-100">
                    <Image src={p.image} alt={p.title} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  <div className="p-4">
                    <div className="text-xs text-slate-400 mb-1">{p.date} · <span className="text-slate-600 font-medium">{p.author.name}</span></div>
                    <Link href={`/blog/${p.slug}`}>
                      <h3 className="font-bold text-sm text-slate-900 mb-2 line-clamp-2 group-hover:text-[#1D4ED8] transition-colors">{p.title}</h3>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">{p.excerpt}</p>
                    <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#1D4ED8]">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} author={post.author} />
    </div>
  );
}
