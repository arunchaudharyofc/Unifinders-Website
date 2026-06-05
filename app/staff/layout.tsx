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
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import StaffLayoutClient from "./StaffLayoutClient";

export const metadata = {
  title: "Staff Portal — Unifinders",
  description: "Unifinders internal staff portal for attendance, tasks, and team management.",
};

export default async function StaffLayout({ children }: { children: React.ReactNode }) {
  // Read user info from middleware-set headers (avoids double getUser() call)
  const headerStore = await headers();
  const userId = headerStore.get("x-supabase-user-id");
  const userEmail = headerStore.get("x-supabase-user-email") || "";

  // Middleware should have redirected if not authenticated, but guard anyway
  if (!userId) redirect("/auth/login");

  let profile: { role: string; fullName: string; avatar: string | null } | null = null;

  try {
    profile = await db.profile.findUnique({
      where: { userId },
      select: { role: true, fullName: true, avatar: true },
    });

    // Only staff and admin can access this portal
    if (profile && profile.role !== "staff" && profile.role !== "admin") {
      redirect("/dashboard");
    }

    // Auto-create staff record if admin accessing for the first time
    if (profile && (profile.role === "staff" || profile.role === "admin")) {
      const existing = await db.staff.findUnique({ where: { userId } });
      if (!existing) {
        await db.staff.create({
          data: {
            userId,
            department: profile.role === "admin" ? "Management" : null,
          },
        });
      }
    }
  } catch {
    // DB unavailable — allow layout to render with defaults
    profile = { role: "staff", fullName: userEmail.split("@")[0] || "Staff", avatar: null };
  }

  const isAdmin = profile?.role === "admin";
  const userName = profile?.fullName || "Staff Member";
  const userAvatar = profile?.avatar || null;

  return (
    <StaffLayoutClient
      isAdmin={isAdmin}
      userName={userName}
      userAvatar={userAvatar}
      userEmail={userEmail}
    >
      {children}
    </StaffLayoutClient>
  );
}
