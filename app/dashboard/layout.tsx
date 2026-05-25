/**
 * DASHBOARD LAYOUT
 * ----------------
 * Sidebar navigation + main content area.
 * Protected by proxy.ts middleware — unauthenticated users are redirected to /auth/login.
 * Fetches user from Supabase server-side on every render (no stale data).
 */
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { createModuleLogger } from "@/lib/logger";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

const log = createModuleLogger("Dashboard");

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) redirect("/auth/login");

  let profile: { role: string } | null = null;

  try {
    profile = await db.profile.findUnique({
      where: { userId: user.id },
      select: { role: true }
    });

    // If new user (OAuth signup), create their initial Profile + Student rows
    if (!profile) {
      const fullNameVal = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";
      
      await db.profile.create({
        data: {
          userId: user.id,
          role: "student", 
          fullName: fullNameVal,
          avatar: user.user_metadata?.avatar_url || null,
        }
      });
      await db.student.create({
        data: {
          userId: user.id,
          email: user.email!,
          firstName: fullNameVal.split(" ")[0] || "",
          lastName: fullNameVal.split(" ").slice(1).join(" ") || "",
        }
      });

      profile = { role: "student" };
    }

    // Staff users should use the Staff Portal, not the student dashboard
    if (profile.role === "staff") {
      redirect("/staff");
    }
  } catch (e) {
    console.warn("DB unavailable for dashboard profile lookup, defaulting to student role. Please check if your IP is allowlisted in Supabase.");
    // Dashboard still loads — just without admin features if DB is down
    profile = { role: "student" };
  }

  const isAdmin = profile?.role === "admin";

  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Student";
  const initials = fullName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar isAdmin={isAdmin} />

      <div className="flex-1 md:ml-64 flex flex-col bg-[#F8FAFC]">
        <Header fullName={fullName} initials={initials} email={user.email!} />

        <main className="flex-1 overflow-x-hidden p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
