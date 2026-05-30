/**
 * STAFF PORTAL LAYOUT
 * -------------------
 * Sidebar navigation + main content area for staff members.
 * Protected by middleware — unauthenticated users are redirected to /auth/login.
 * Role check: only staff & admin users can access.
 */
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import StaffLayoutClient from "./StaffLayoutClient";

export const metadata = {
  title: "Staff Portal — Unifinders",
  description: "Unifinders internal staff portal for attendance, tasks, and team management.",
};

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  let user = null;
  let authError = null;

  try {
    const cookieStore = await cookies();
    const cookieNames = cookieStore.getAll().map(c => c.name);
    console.log("[StaffLayout Diagnostics] Present cookies:", cookieNames);
    
    const { data, error } = await supabase.auth.getUser();
    authError = error;
    user = data?.user;
    
    console.log("[StaffLayout Diagnostics] User retrieved:", user ? { id: user.id, email: user.email } : null);
    if (error) {
      console.error("[StaffLayout Diagnostics] getUser error:", error);
    }
  } catch (e) {
    console.error("[StaffLayout Diagnostics] Auth checking crashed:", e);
  }

  if (!user) {
    console.warn("[StaffLayout Diagnostics] No authenticated user found, redirecting to /auth/login. getUser error was:", authError);
    redirect("/auth/login");
  }

  let profile: { role: string; fullName: string; avatar: string | null } | null = null;

  try {
    profile = await db.profile.findUnique({
      where: { userId: user.id },
      select: { role: true, fullName: true, avatar: true },
    });

    // Only staff and admin can access this portal
    if (profile && profile.role !== "staff" && profile.role !== "admin") {
      redirect("/dashboard");
    }

    // Auto-create staff record if admin accessing for the first time
    if (profile && (profile.role === "staff" || profile.role === "admin")) {
      const existing = await db.staff.findUnique({ where: { userId: user.id } });
      if (!existing) {
        await db.staff.create({
          data: {
            userId: user.id,
            department: profile.role === "admin" ? "Management" : null,
          },
        });
      }
    }
  } catch {
    // DB unavailable — allow layout to render with defaults
    profile = { role: "staff", fullName: user.email?.split("@")[0] || "Staff", avatar: null };
  }

  const isAdmin = profile?.role === "admin";
  const userName = profile?.fullName || "Staff Member";
  const userAvatar = profile?.avatar || null;

  return (
    <StaffLayoutClient
      isAdmin={isAdmin}
      userName={userName}
      userAvatar={userAvatar}
      userEmail={user.email || ""}
    >
      {children}
    </StaffLayoutClient>
  );
}
