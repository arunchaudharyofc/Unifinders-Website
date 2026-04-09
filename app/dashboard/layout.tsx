/**
 * DASHBOARD LAYOUT
 * ----------------
 * Sidebar navigation + main content area.
 * Protected by proxy.ts middleware — unauthenticated users are redirected to /auth/login.
 * Fetches user from Supabase server-side on every render (no stale data).
 */
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, FileText, FolderOpen, Calendar,
  GraduationCap, LogOut, User, Bell, ChevronRight,
  ShieldAlert, BookOpen, Presentation, Bookmark, Building, Users
} from "lucide-react";
import { db } from "@/lib/db";

const NAV_ITEMS = [
  { label: "Overview",     href: "/dashboard",              icon: LayoutDashboard },
  { label: "Profile",      href: "/dashboard/profile",      icon: User },
  { label: "Applications", href: "/dashboard/applications", icon: FileText },
  { label: "Documents",    href: "/dashboard/documents",    icon: FolderOpen },
  { label: "Appointments", href: "/dashboard/appointments", icon: Calendar },
  { label: "Courses",      href: "/courses",                icon: GraduationCap },
];

const ADMIN_ITEMS = [
  { label: "Appointments",  href: "/dashboard/admin/appointments",  icon: Calendar },
  { label: "Students",      href: "/dashboard/admin/students",      icon: Users },
  { label: "Blog CMS",      href: "/dashboard/admin/blog",          icon: BookOpen },
  { label: "Events CMS",    href: "/dashboard/admin/events",        icon: Presentation },
  { label: "Scholarships",  href: "/dashboard/admin/scholarships",  icon: Bookmark },
  { label: "Courses",       href: "/dashboard/admin/courses",       icon: GraduationCap },
  { label: "Universities",  href: "/dashboard/admin/universities",  icon: Building },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) redirect("/auth/login");

  let profile = await db.profile.findUnique({
    where: { userId: user.id },
    select: { role: true }
  });

  // If new user (OAuth signup), create their initial Profile + Student rows
  if (!profile) {
    try {
      const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";
      
      await db.profile.create({
        data: {
          userId: user.id,
          role: "student", 
          fullName,
          avatar: user.user_metadata?.avatar_url || null,
        }
      });
      await db.student.create({
        data: {
          userId: user.id,
          email: user.email!,
          firstName: fullName.split(" ")[0] || "",
          lastName: fullName.split(" ").slice(1).join(" ") || "",
        }
      });

      profile = { role: "student" };
    } catch (e) {
      console.error("[Dashboard Setup Error]", e);
    }
  }

  const isAdmin = profile?.role === "admin";

  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-100 fixed h-full z-40">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/">
            <Image
              src="/images/logo.png" alt="Unifinders" width={120} height={32}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-[#0070F0] transition-colors text-sm font-medium group"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}

          {isAdmin && (
            <>
              <div className="pt-4 pb-1 pl-4 flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Admin</span>
              </div>
              {ADMIN_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-[#0070F0] transition-colors text-sm font-medium group"
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {item.label}
                  <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </>
          )}
        </nav>

        {/* User + Sign Out */}
        <div className="border-t border-slate-100 p-4 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{fullName}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <form action={signOut}>
            <button type="submit" className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400 hidden sm:block">Welcome back,</span>
            <span className="text-sm font-semibold text-slate-800">{fullName} 👋</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition" aria-label="Notifications">
              <Bell className="w-4 h-4" />
            </button>
            <Link href="/dashboard/profile" className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 transition" aria-label="Profile">
              <User className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
