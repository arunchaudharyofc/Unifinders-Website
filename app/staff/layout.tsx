/**
 * STAFF PORTAL LAYOUT
 * -------------------
 * Sidebar navigation + main content area for staff members.
 * Protected by middleware.ts — unauthenticated users are redirected to /auth/login.
 *
 * IMPORTANT: This layout reads user info from middleware-set headers instead of
 * calling getUser() again. Calling getUser() in both middleware AND layout causes
 * Supabase to detect "token reuse" when a refresh happens, revoking the entire
 * session and logging the user out.
 */
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import StaffLayoutClient from "./StaffLayoutClient";

export const metadata = {
  title: "Staff Portal — Unifinders",
  description: "Unifinders internal staff portal for attendance, tasks, and team management.",
};

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  if (!user) redirect("/auth/login");

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
