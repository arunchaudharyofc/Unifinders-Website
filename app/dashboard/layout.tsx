/**
 * DASHBOARD LAYOUT
 * ----------------
 * Sidebar navigation + main content area.
 * Protected by middleware.ts — unauthenticated users are redirected to /auth/login.
 *
 * Reads user info from middleware-set headers to avoid double getUser() calls
 * (which cause Supabase token reuse revocation on Vercel).
 */
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createModuleLogger } from "@/lib/logger";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

const log = createModuleLogger("Dashboard");

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Read user info from middleware-set headers (avoids double getUser() call)
  const headerStore = await headers();
  const userId = headerStore.get("x-supabase-user-id");
  const userEmail = headerStore.get("x-supabase-user-email") || "";

  // Middleware should have redirected if not authenticated, but guard anyway
  if (!userId) redirect("/auth/login");

  // For new OAuth users we need user_metadata, so we still call getUser() here.
  // This is safe because the middleware has already refreshed the token and
  // forwarded the fresh cookies via the serialized cookie header.
  let fullName = userEmail.split("@")[0] || "Student";
  let avatarUrl: string | null = null;

  // Try to get user metadata from Supabase for OAuth users
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      fullName = data.user.user_metadata?.full_name || userEmail.split("@")[0] || "Student";
      avatarUrl = data.user.user_metadata?.avatar_url || null;
    }
  } catch {
    // Fallback to email-based name
  }

  let profile: { role: string } | null = null;

  try {
    profile = await db.profile.findUnique({
      where: { userId },
      select: { role: true }
    });

    // If new user (OAuth signup), create their initial Profile + Student rows
    if (!profile) {
      await db.profile.create({
        data: {
          userId,
          role: "student", 
          fullName,
          avatar: avatarUrl,
        }
      });
      await db.student.create({
        data: {
          userId,
          email: userEmail,
          firstName: fullName.split(" ")[0] || "",
          lastName: fullName.split(" ").slice(1).join(" ") || "",
        }
      });

      profile = { role: "student" };
    }

  } catch (e) {
    console.warn("DB unavailable for dashboard profile lookup, defaulting to student role.");
    // Dashboard still loads — just without admin features if DB is down
    profile = { role: "student" };
  }

  // Staff users should use the Staff Portal, not the student dashboard
  // NOTE: redirect() must be outside try/catch because it works by throwing an error
  if (profile.role === "staff") {
    redirect("/staff");
  }

  const isAdmin = profile?.role === "admin";

  const initials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar isAdmin={isAdmin} />

      <div className="flex-1 md:ml-64 flex flex-col bg-[#F8FAFC]">
        <Header fullName={fullName} initials={initials} email={userEmail} userId={userId} />

        <main className="flex-1 overflow-x-hidden p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
