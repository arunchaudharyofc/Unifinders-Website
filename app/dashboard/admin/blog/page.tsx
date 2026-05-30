"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, FileText,
  Eye, Calendar, Tag, Globe, Lock, Archive, Sparkles, Bold, Italic,
  List, Link, Image as ImageIcon, AlignLeft, X, Loader2, Save
} from "lucide-react";

type Post = {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  viewCount: number;
  publishedAt?: string | null;
  createdAt: string;
  excerpt?: string | null;
};

const STATUS_META: Record<string, { bg: string; text: string; border: string; icon: React.ElementType; label: string }> = {
  PUBLISHED: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: Globe, label: "Published" },
  DRAFT:     { bg: "bg-slate-100",  text: "text-slate-600",   border: "border-slate-200",   icon: Lock,  label: "Draft" },
  ARCHIVED:  { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   icon: Archive, label: "Archived" },
};

const CATEGORIES = [
  "Study Abroad", "Visa Guide", "Scholarship", "Country Guide",
  "University Guide", "Career", "Test Prep", "Student Life", "News",
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "", slug: "", category: "Study Abroad", status: "DRAFT",
    excerpt: "", content: "",
  });
  const titleRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openCreate = () => {
    setEditPost(null);
    setForm({ title: "", slug: "", category: "Study Abroad", status: "DRAFT", excerpt: "", content: "" });
    setShowEditor(true);
    setTimeout(() => titleRef.current?.focus(), 100);
  };

  const openEdit = (post: Post) => {
    setEditPost(post);
    setForm({
      title: post.title, slug: post.slug, category: post.category,
      status: post.status, excerpt: post.excerpt || "", content: "",
    });
    setShowEditor(true);
  };

  const slugify = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleTitleChange = (val: string) => {
    setForm((f) => ({ ...f, title: val, slug: f.slug || slugify(val) }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      const res = await fetch(editPost ? `/api/admin/blog/${editPost.id}` : "/api/admin/blog", {
        method: editPost ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setShowEditor(false);
        fetchPosts();
      }
    } catch { } finally { setSaving(false); }
  };

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      if (res.ok) fetchPosts();
    } catch { }
  };

  const filtered = posts.filter((p) => {
    if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1A2D] via-[#162d52] to-[#0d3470] rounded-2xl p-8 shadow-xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 30%, #818cf8 0%, transparent 40%)" }} />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-400/20">Content Management</span>
            <h1 className="text-3xl font-black text-white mt-2">Blog CMS</h1>
            <p className="text-sm text-blue-200/80 mt-1 font-medium">{posts.length} articles · {posts.filter(p => p.status === "PUBLISHED").length} published</p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2.5 px-5 py-3 bg-white hover:bg-indigo-50 text-[#0B1A2D] rounded-xl text-sm font-bold transition shadow-lg cursor-pointer w-fit shrink-0 group"
          >
            <Plus className="w-4 h-4 text-indigo-600 group-hover:scale-110 transition-transform" />
            Create Post
          </button>
        </div>
      </div>

      {/* Stat Pills */}
      <div className="flex flex-wrap gap-3">
        {["ALL", "PUBLISHED", "DRAFT", "ARCHIVED"].map((s) => {
          const count = s === "ALL" ? posts.length : posts.filter(p => p.status === s).length;
          const meta = STATUS_META[s] || { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200", icon: FileText, label: "All" };
          const StatusIcon = meta.icon;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition border cursor-pointer ${statusFilter === s ? "bg-[#0B1A2D] text-white border-transparent shadow" : `bg-white ${meta.text} ${meta.border} hover:shadow-sm`}`}
            >
              {s !== "ALL" && <StatusIcon className="w-3.5 h-3.5" />}
              {s === "ALL" ? "All Posts" : meta.label}
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${statusFilter === s ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>
            </button>
          );
        })}
        <div className="ml-auto relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text" placeholder="Search posts..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition w-52"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="h-48 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-blue-100 border-t-[#0070F0] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-500">No posts found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting filters or create a new post.</p>
            <button onClick={openCreate} className="mt-4 px-4 py-2 bg-[#0070F0] text-white text-sm font-bold rounded-xl hover:bg-blue-600 transition inline-flex items-center gap-2">
              <Plus className="w-4 h-4" /> Create First Post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="p-4 pl-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Title</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Views</th>
                  <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                  <th className="p-4 pr-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((post) => {
                  const m = STATUS_META[post.status] || STATUS_META.DRAFT;
                  const StatusIcon = m.icon;
                  return (
                    <tr key={post.id} className="hover:bg-slate-50/40 transition-colors group">
                      <td className="p-4 pl-6">
                        <p className="font-bold text-sm text-slate-800 group-hover:text-blue-600 transition">{post.title}</p>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">/{post.slug}</p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black border ${m.bg} ${m.text} ${m.border}`}>
                          <StatusIcon className="w-3 h-3" /> {m.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{post.category}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-slate-500">
                          <Eye className="w-3.5 h-3.5" />
                          <span className="text-xs font-bold">{post.viewCount.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs text-slate-400">
                          {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEdit(post)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition cursor-pointer">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deletePost(post.id, post.title)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Create / Edit Post Modal ── */}
      {showEditor && (
        <div className="fixed inset-0 bg-slate-900/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowEditor(false)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0B1A2D] to-[#1a2e50] p-5 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{editPost ? "Edit Post" : "Create New Post"}</h2>
                <p className="text-xs text-blue-200 mt-0.5">{editPost ? `Editing: ${editPost.title}` : "Write and publish a new blog article"}</p>
              </div>
              <button onClick={() => setShowEditor(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-5">

                {/* Title */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Post Title *</label>
                  <input
                    ref={titleRef}
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Top 10 Universities for Computer Science in Australia"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono shrink-0">/blog/</span>
                    <input
                      type="text"
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                      placeholder="auto-generated-from-title"
                      className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    />
                  </div>
                </div>

                {/* Category + Status Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-400 outline-none transition"
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:border-blue-400 outline-none transition"
                    >
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Publish Now</option>
                      <option value="ARCHIVED">Archive</option>
                    </select>
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Excerpt / Summary</label>
                  <textarea
                    rows={2}
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    placeholder="Short description shown in listing pages (SEO meta description)..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-xs font-black text-slate-600 uppercase tracking-widest mb-1.5">Content *</label>
                  {/* Toolbar */}
                  <div className="flex items-center gap-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-t-xl border-b-0">
                    {[Bold, Italic, List, Link, ImageIcon, AlignLeft].map((Icon, i) => (
                      <button key={i} type="button" className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 transition">
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    ))}
                    <span className="ml-2 text-[10px] text-slate-400 font-semibold">Markdown supported</span>
                  </div>
                  <textarea
                    required
                    rows={10}
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    placeholder="Write your article content here. Markdown formatting is supported..."
                    className="w-full px-4 py-3 border border-slate-200 rounded-b-xl text-sm font-mono resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition leading-relaxed"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/60 shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {form.status === "PUBLISHED" ? "This will be published immediately" : "Saved as draft — not visible to public"}
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setShowEditor(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="px-5 py-2 bg-gradient-to-r from-[#0070F0] to-[#0055CC] text-white font-bold rounded-xl text-sm transition disabled:opacity-60 flex items-center gap-2 shadow-sm"
                  >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? "Saving..." : editPost ? "Update Post" : form.status === "PUBLISHED" ? "Publish" : "Save Draft"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
