/**
 * ============================================================================
 * BLOG SECTION
 * ============================================================================
 * "Read Our Blogs" — 3-column card grid with image, metadata, and excerpt.
 *
 * @maintainer  Unifinders Dev Team
 * @created     2026-03-31
 * ============================================================================
 */
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants/landing";
import Link from "next/link";
import NextImage from "next/image";

export default function BlogSection({ blogs }: { blogs?: any }) {
  const displayBlogs = blogs || BLOG_POSTS;

  return (
    <section id="blogs" aria-label="Blog posts" className="py-20 md:py-28 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight text-center mb-14">
          Read <span className="text-[#0070F0]">Our Blogs</span>
        </h2>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {displayBlogs.map((post: any) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group animate-fade-up"
            >
              {/* Image */}
              <div className="relative h-[250px] overflow-hidden">
                <NextImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.author}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-[#0070F0] transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <button className="w-12 h-12 rounded-xl border border-blue-200 bg-white flex items-center justify-center hover:bg-blue-50 transition-colors text-[#0070F0]" aria-label="Previous blog posts">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <Link
            href="/blog"
            className="h-12 px-8 flex items-center text-sm font-semibold text-[#0070F0] border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors"
          >
            View all Blogs
          </Link>
          <button className="w-12 h-12 rounded-xl border border-blue-200 bg-white flex items-center justify-center hover:bg-blue-50 transition-colors text-[#0070F0]" aria-label="Next blog posts">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
